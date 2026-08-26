import { useMemo, useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  M,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  W_PANEL,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §4.2.3: Kondition des Gleichungslösens f(x) = A⁻¹x.
 *
 * DIE EINE EINSICHT: Ein kleiner Kreis plausibler rechter Seiten um x wird von
 * A⁻¹ zu einer Ellipse verzogen; wie lang deren große Achse gemessen an ‖A⁻¹x‖
 * ausfällt, ist κ_rel(f, x) — und κ(A) ist die Schranke, die genau für die
 * ungünstigen rechten Seiten angenommen wird (Satz 4.2.6, Bemerkung 4.2.7).
 *
 * FARBROLLEN §4.2 (Kapitel-Rollentabelle im Kopf von S41Widgets.tsx):
 *   blau   die ungestörte rechte Seite x
 *   rot    die Störung: Kreis plausibler Inputs, Bildellipse, Inputfehlerbalken
 *   grün   die Lösung y = A⁻¹x und der Outputfehlerbalken
 *   orange κ_rel(f, x) und die Schranke κ(A)
 *   grau   Achsen, Gitter, Nebentext
 *
 * INTERAKTION: x ist im linken Feld ziehbar (Hauptweg), zwei Regler setzen
 * dieselben Koordinaten genau (Doppelpfad); die vier Voreinstellungen für A
 * sind die Fallunterscheidung des Verdikts.
 *
 * PROVENIENZ: Eigenbau. Die Singulärwerte einer 2×2-Matrix kommen aus der
 * geschlossenen Form über A^T A (dasselbe Muster wie in `lib/widgets/util.ts`,
 * Funktion sigmaMax), hier für beide Werte ausgeschrieben.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen,
 * 2026-08-19), jeweils σ_max, σ_min und κ₂ = σ_max/σ_min:
 *   Drehung um 30°: 1, 1, κ₂ = 1.
 *   (2 0; 0 0,8): 2, 0,8, κ₂ = 2,5.
 *   (1 1; 1 1,05): 2,02531, 0,024688, κ₂ = 82,0378.
 *   (1 1; 1 1,005): 2,00250, 0,0024969, κ₂ = 802,004.
 *   Für alle vier stimmt das über 36 000 Richtungen gesuchte Maximum von
 *   κ_rel(f, x) mit κ₂(A) überein (Abweichung < 0,03 %), das Minimum ist 1.
 *   Voreinstellung A = (1 1; 1 1,05), x = (2; 2,05): y = A⁻¹x = (1; 1),
 *   κ_rel = 82,031, also 99,99 % der Schranke κ₂ = 82,038 — die ungünstigste
 *   Richtung liegt bei 45,7°. Für x = (1; −1) dagegen ist y = (41; −40) und
 *   κ_rel = 1,00008: dieselbe Matrix, harmlose rechte Seite.
 */

type Mat = [[number, number], [number, number]];

const COL = {
  x: FMM_COLORS.blau,
  pert: FMM_COLORS.rot,
  out: FMM_COLORS.gruen,
  amp: FMM_COLORS.orange,
};

/** Singulärwerte einer 2×2-Matrix (Eigenwerte von AᵀA, geschlossen). */
function singulaerwerte(A: Mat): [number, number] {
  const [[a, b], [c, d]] = A;
  const T = a * a + b * b + c * c + d * d;
  const det = a * d - b * c;
  const disc = Math.sqrt(Math.max(0, T * T - 4 * det * det));
  return [Math.sqrt((T + disc) / 2), Math.sqrt(Math.max(0, (T - disc) / 2))];
}

function inverse(A: Mat): Mat {
  const [[a, b], [c, d]] = A;
  const det = a * d - b * c;
  return [
    [d / det, -b / det],
    [-c / det, a / det],
  ];
}

const anwenden = (A: Mat, v: [number, number]): [number, number] => [
  A[0][0] * v[0] + A[0][1] * v[1],
  A[1][0] * v[0] + A[1][1] * v[1],
];

const PRESETS: { id: string; text: string; A: Mat }[] = [
  {
    id: "orth",
    text: "Drehung (κ = 1)",
    A: [
      [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6)],
      [Math.sin(Math.PI / 6), Math.cos(Math.PI / 6)],
    ],
  },
  { id: "mild", text: "mäßig gedehnt", A: [[2, 0], [0, 0.8]] },
  { id: "schlecht", text: "schlecht konditioniert", A: [[1, 1], [1, 1.05]] },
  { id: "fast", text: "fast singulär", A: [[1, 1], [1, 1.005]] },
];

const S = 300;
const PAD = 26;
const FW = S - PAD - 10;
const FH = S - PAD - 10;
const XR = 3.4; // festes Fenster der Inputebene

/** Nächstgrößere „schöne" Fenstergröße (1, 2, 5 · 10^k) — kein Zittern beim Ziehen. */
function nettesFenster(r: number): number {
  const m = Math.pow(10, Math.floor(Math.log10(Math.max(r, 1e-9))));
  const n = r / m;
  return m * (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10);
}

/** Achsenkreuz mit Ticks für ein Feld der Halbbreite `r`. */
function Achsen({ r, px, py, namen }: { r: number; px: (v: number) => number; py: (v: number) => number; namen: [string, string] }) {
  const ticks = niceTicks(-r, r, 4).filter((t) => Math.abs(t) > 1e-9);
  const step = ticks.length > 1 ? ticks[1] - ticks[0] : undefined;
  return (
    <g pointerEvents="none">
      <line x1={px(-r)} y1={py(0)} x2={px(r)} y2={py(0)} stroke="var(--w-axis)" strokeWidth={1.1} />
      <line x1={px(0)} y1={py(-r)} x2={px(0)} y2={py(r)} stroke="var(--w-axis)" strokeWidth={1.1} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="var(--w-axis)" />
          <text x={px(t)} y={py(0) + 14} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
            {fmtTick(t, step)}
          </text>
        </g>
      ))}
      <text x={px(r) - 2} y={py(0) - 6} textAnchor="end" fontSize={10} fontStyle="italic" fill="var(--w-muted)">
        {namen[0]}
      </text>
      <text x={px(0) + 5} y={py(r) + 11} fontSize={10} fontStyle="italic" fill="var(--w-muted)">
        {namen[1]}
      </text>
    </g>
  );
}

export function LgsKonditionWidget() {
  const [presetId, setPresetId] = useState("schlecht");
  const [x, setX] = useState<[number, number]>([2, 2.05]);
  const [delta, setDelta] = useState(0.05);

  const A = (PRESETS.find((p) => p.id === presetId) ?? PRESETS[2]).A;
  const Ainv = useMemo(() => inverse(A), [A]);
  const [sMax, sMin] = useMemo(() => singulaerwerte(A), [A]);
  const kappaA = sMax / sMin;

  const y = anwenden(Ainv, x);
  const nx = Math.hypot(x[0], x[1]);
  const ny = Math.hypot(y[0], y[1]);
  const kappaRel = nx > 1e-9 && ny > 1e-9 ? ((1 / sMin) * nx) / ny : NaN;
  const r = delta * nx; // Radius des Kreises plausibler rechter Seiten
  const relOut = Number.isFinite(kappaRel) ? kappaRel * delta : NaN;

  // Bild des Störkreises unter A⁻¹ (exakt, 72 Punkte)
  const ellipse = useMemo(() => {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 72; i++) {
      const t = (2 * Math.PI * i) / 72;
      pts.push(anwenden(Ainv, [x[0] + r * Math.cos(t), x[1] + r * Math.sin(t)]));
    }
    return pts;
  }, [Ainv, x, r]);

  const rOut = useMemo(() => {
    let m = ny;
    for (const [a, b] of ellipse) m = Math.max(m, Math.abs(a), Math.abs(b));
    return nettesFenster(Math.max(m * 1.15, 0.5));
  }, [ellipse, ny]);

  const pxIn = (v: number) => PAD + ((v + XR) / (2 * XR)) * FW;
  const pyIn = (v: number) => 10 + FH - ((v + XR) / (2 * XR)) * FH;
  const pxOut = (v: number) => PAD + ((v + rOut) / (2 * rOut)) * FW;
  const pyOut = (v: number) => 10 + FH - ((v + rOut) / (2 * rOut)) * FH;

  const zieh = useDrag<"x">({
    feld: { x0: PAD, y0: 10, w: FW, h: FH },
    welt: { x0: -XR, x1: XR, y0: -XR, y1: XR },
    clamp: ([a, b]) => {
      const n = Math.hypot(a, b);
      // Der Nullpunkt ist ausgeschlossen: dort ist der relative Fehler undefiniert.
      if (n < 0.3) return [(0.3 * a) / (n || 1), (0.3 * b) / (n || 1)];
      return [clamp(a, -3, 3), clamp(b, -3, 3)];
    },
    greifPosition: () => x,
    onDrag: (p) => setX([Math.round(p[0] * 100) / 100, Math.round(p[1] * 100) / 100]),
  });

  const anteil = Number.isFinite(kappaRel) ? kappaRel / kappaA : 0;
  const verdikt = !Number.isFinite(kappaRel) ? (
    <Verdikt kind="warn" titel="Nullpunkt.">
      Für <M>{"\\bx = \\bnull"}</M> ist auch <M>{"\\by = \\bnull"}</M>, und der relative
      Fehler ist auf beiden Seiten undefiniert: {ref("definition:konditionszahl")} verlangt{" "}
      <M>{"\\left\\| \\bx \\right\\| \\ne 0"}</M> und{" "}
      <M>{"\\left\\| f(\\bx) \\right\\| \\ne 0"}</M>. Schieben wir die Regler von
      null weg.
    </Verdikt>
  ) :
    kappaA < 1.05 ? (
      <Verdikt kind="ok" titel="Orthogonal: nichts wird verstärkt.">
        Hier ist <M>{"\\kappa(\\bA) = 1"}</M>, die Schranke aus {ref("satz:kondition-der-loesung-eines-lgs")} lässt also gar keine
        Verstärkung zu: Der rote Kreis wird zu einem Kreis derselben relativen Größe, egal wohin
        wir <M>{"\\bx"}</M> ziehen. Der relative Outputfehler bleibt bei {fmtDe(100 * relOut, 1)} %.
      </Verdikt>
    ) : anteil > 0.9 ? (
      <Verdikt kind="fail" titel="Die ungünstige rechte Seite.">
        <M>{"\\kappa_{rel}(f, \\bx)"}</M> = {fmtDe(kappaRel, 1)} schöpft{" "}
        {fmtDe(100 * anteil, 0)} % der Schranke <M>{"\\kappa(\\bA)"}</M> ={" "}
        {fmtDe(kappaA, 1)} aus. {ref("bemerkung:kondition-konditionszahl-einer-matrix")} sagt genau das: Die Schranke ist kein
        Pessimismus, sie wird für ungünstige rechte Seiten angenommen. Aus{" "}
        {fmtDe(100 * delta, 1)} % Inputfehler werden hier {fmtDe(100 * relOut, 0)} %
        Outputfehler.
      </Verdikt>
    ) : anteil < 0.15 ? (
      <Verdikt kind="ok" titel="Gutmütige rechte Seite.">
        Dieselbe Matrix, ein anderes <M>{"\\bx"}</M>: <M>{"\\kappa_{rel}(f, \\bx)"}</M> ={" "}
        {fmtDe(kappaRel, 2)} liegt weit unter <M>{"\\kappa(\\bA)"}</M> = {fmtDe(kappaA, 1)}. Nach
        {ref("satz:kondition-der-loesung-eines-lgs")} hängt die relative Kondition eben von <M>{"\\bx"}</M> ab; die Ellipse ist zwar
        lang, aber <M>{"\\left\\| \\bA^{-1}\\bx \\right\\|"}</M> ist hier ebenfalls groß, und der
        Quotient bleibt klein.
      </Verdikt>
    ) : (
      <Verdikt kind="warn" titel="Dazwischen.">
        <M>{"\\kappa_{rel}(f, \\bx)"}</M> = {fmtDe(kappaRel, 1)} ist{" "}
        {fmtDe(100 * anteil, 0)} % der Schranke <M>{"\\kappa(\\bA)"}</M> = {fmtDe(kappaA, 1)}.
        Ziehen wir <M>{"\\bx"}</M> weiter herum: Es gibt Richtungen, in denen der Quotient bis an
        die Schranke heranreicht, und andere, in denen er auf 1 fällt.
      </Verdikt>
    );

  // Beide Balken teilen sich denselben Maßstab (der größere füllt die Zeile),
  // sonst wäre die Verstärkung oberhalb von 100 % nicht mehr ablesbar.
  const balkenMax = Math.max(delta, Number.isFinite(relOut) ? relOut : 0, 1e-9);
  const balken = (wert: number, farbe: string) => (
    <div className="relative h-4 grow overflow-hidden rounded bg-slate-200/70 dark:bg-slate-800/70">
      <div
        className="absolute inset-y-0 left-0 rounded-sm"
        style={{
          backgroundColor: farbe,
          width: `${Math.max(1, Math.min(100, (100 * (Number.isFinite(wert) ? wert : 0)) / balkenMax))}%`,
        }}
      />
    </div>
  );

  return (
    <div className="my-3 space-y-3">
      <Aufgabe>
        Ziehen wir <M>{"\\bx"}</M> im linken Feld im Kreis herum und beobachten, wie sich die
        rote Ellipse rechts dabei streckt und staucht.
      </Aufgabe>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className={`mb-1 text-xs ${W_MUTED}`}>
            Inputebene: rechte Seite <M>{"\\bx"}</M> und die plausiblen Inputs
          </p>
          <svg
            viewBox={`0 0 ${S} ${S}`}
            className="max-w-full h-auto rounded border border-slate-300 dark:border-slate-600"
            role="img"
            aria-label={`Inputebene mit der rechten Seite x bei (${fmtDe(x[0], 2)}; ${fmtDe(x[1], 2)}) und einem roten Kreis der plausiblen Inputs.`}
            {...zieh.svgProps}
          >
            <rect x={0} y={0} width={S} height={S} fill="var(--w-bg)" />
            <Achsen r={XR} px={pxIn} py={pyIn} namen={["x₁", "x₂"]} />
            <circle
              cx={pxIn(x[0])}
              cy={pyIn(x[1])}
              r={(r / (2 * XR)) * FW}
              fill={COL.pert}
              fillOpacity={0.18}
              stroke={COL.pert}
              strokeWidth={1.4}
              pointerEvents="none"
            />
            <line x1={pxIn(0)} y1={pyIn(0)} x2={pxIn(x[0])} y2={pyIn(x[1])} stroke={COL.x} strokeWidth={1.6} pointerEvents="none" />
            <text x={pxIn(x[0]) + 10} y={pyIn(x[1]) - 8} fontSize={12} fontWeight={600} fill={COL.x} pointerEvents="none">
              x
            </text>
            <DragHandle x={pxIn(x[0])} y={pyIn(x[1])} r={2.5} strichbreite={1.5} farbe={COL.x} aktiv={zieh.dragging === "x"} {...zieh.handleProps("x")} />
          </svg>
        </div>

        <div>
          <p className={`mb-1 text-xs ${W_MUTED}`}>
            Lösungsebene: <M>{"\\by = \\bA^{-1}\\bx"}</M> und das Bild des Kreises
          </p>
          <svg
            viewBox={`0 0 ${S} ${S}`}
            className="max-w-full h-auto rounded border border-slate-300 dark:border-slate-600"
            role="img"
            aria-label={`Lösungsebene mit y gleich A hoch minus eins mal x bei (${fmtDe(y[0], 2)}; ${fmtDe(y[1], 2)}) und der Bildellipse des Störkreises.`}
          >
            <rect x={0} y={0} width={S} height={S} fill="var(--w-bg)" />
            <Achsen r={rOut} px={pxOut} py={pyOut} namen={["y₁", "y₂"]} />
            <polygon
              points={ellipse.map(([a, b]) => `${pxOut(a).toFixed(1)},${pyOut(b).toFixed(1)}`).join(" ")}
              fill={COL.pert}
              fillOpacity={0.18}
              stroke={COL.pert}
              strokeWidth={1.4}
            />
            <line x1={pxOut(0)} y1={pyOut(0)} x2={pxOut(y[0])} y2={pyOut(y[1])} stroke={COL.out} strokeWidth={1.6} />
            <circle cx={pxOut(y[0])} cy={pyOut(y[1])} r={4} fill={COL.out} />
            <text x={pxOut(y[0]) + 10} y={pyOut(y[1]) - 8} fontSize={12} fontWeight={600} fill={COL.out}>
              y
            </text>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={presetId === p.id ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={presetId === p.id}
            onClick={() => setPresetId(p.id)}
          >
            {p.text}
          </button>
        ))}
      </div>

      <Slider label="x₁" value={x[0]} onChange={(v) => setX([v, x[1]])} min={-3} max={3} step={0.01} accent={COL.x} />
      <Slider label="x₂" value={x[1]} onChange={(v) => setX([x[0], v])} min={-3} max={3} step={0.01} accent={COL.x} />
      <Slider
        label="rel. Inputfehler"
        value={delta}
        onChange={setDelta}
        min={0.005}
        max={0.1}
        step={0.005}
        accent={COL.pert}
        fmt={(v) => `${fmtDe(100 * v, 1)} %`}
      />

      <div className={`space-y-1 p-3 text-sm ${W_PANEL}`}>
        <div className="flex items-center gap-2">
          <span className="w-40 shrink-0 text-right text-xs" style={{ color: COL.pert }}>
            rel. Inputfehler
          </span>
          {balken(delta, COL.pert)}
          <span className="w-16 shrink-0 text-right font-mono text-xs">{fmtDe(100 * delta, 1)} %</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-40 shrink-0 text-right text-xs" style={{ color: COL.out }}>
            rel. Outputfehler
          </span>
          {balken(relOut, COL.out)}
          <span className="w-16 shrink-0 text-right font-mono text-xs">
            {Number.isFinite(relOut) ? `${fmtDe(100 * relOut, relOut > 1 ? 0 : 1)} %` : "–"}
          </span>
        </div>
        <div className="grid gap-x-6 gap-y-0.5 pt-1 font-mono text-xs sm:grid-cols-2">
          <span>
            A = ({fmtDe(A[0][0], 2)} {fmtDe(A[0][1], 2)}; {fmtDe(A[1][0], 2)} {fmtDe(A[1][1], 2)})
          </span>
          <span>
            σ_max = {fmtDe(sMax, 3)}, σ_min = {fmtDe(sMin, 4)}
          </span>
          <span style={{ color: COL.out }}>
            y = A⁻¹x = ({fmtDe(y[0], 2)}; {fmtDe(y[1], 2)})
          </span>
          <span style={{ color: COL.amp }}>
            κ_rel(f, x) = {fmtDe(kappaRel, 2)}
          </span>
          <span className="sm:col-span-2" style={{ color: COL.amp }}>
            Schranke κ(A) = σ_max/σ_min = {fmtDe(kappaA, 2)} · ausgeschöpft zu{" "}
            {fmtDe(100 * anteil, 0)} %
          </span>
        </div>
      </div>

      {verdikt}
    </div>
  );
}
