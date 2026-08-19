import { useState } from "react";
import type { ReactNode } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";

/**
 * §12.2: Konvexitäts-Test (Eigenbau).
 *
 * DIE EINE EINSICHT: Ein einziges Punktepaar, dessen Verbindungsstrecke
 * heraushängt, widerlegt die Konvexität — während noch so viele gelungene
 * Proben sie nicht beweisen (Definition 12.2.1, Bemerkung 12.2.2).
 *
 * Vier Mengen im R^2 stehen zur Wahl (Kreisscheibe, Kreisring, Dreieck als
 * Schnitt dreier Halbräume, Unterseite der Parabel z2 <= z1^2). Beide Punkte
 * sind ziehbar (Muster 2); die vier Regler sind der Doppelpfad und stellen
 * dieselben Koordinaten ein. Das Widget zeichnet die Strecke
 * {lambda x + (1-lambda) y} und meldet, ob sie die Menge verlässt.
 *
 * Ersetzt die Folienbilder convex-set.png / nonconvex-set.png
 * (12-konvexitaet.Rmd Z. 167–172).
 *
 * FARBROLLEN (Kapitel 12): Menge blau, Verbindungsstrecke und gewählte Punkte
 * grün, das Stück außerhalb der Menge rot, Extrempunkte orange, Hinweise ohne
 * Rolle neutralgrau.
 *
 * PROVENIENZ: Eigenbau; Ziehen über `useDrag`, Achsen/Zahlformat/Farben aus
 * `src/lib/widgets/util.ts`.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-12-konvexitaet/
 * check-s122-mengen.mjs, 2026-08-19): Kreisring 0,8 ≤ ‖z‖ ≤ 1,2 mit
 * x = (1,1; 0) und y = (0; 1,1) liegt für λ zwischen 0,380 und 0,620 im Loch,
 * der Mittelpunkt hat die Norm 1,1/√2 = 0,7778 < 0,8; die Parabelmenge mit
 * x = (−1; 1) und y = (1; 1) liegt für JEDES λ in (0, 1) außerhalb. Über je
 * 200 000 geseedete Zufallspaare aus der Menge verlässt die Strecke bei
 * Kreisscheibe und Dreieck kein einziges Mal die Menge, beim Ring in 60,5 %
 * und bei der Parabelunterseite in 12,9 % der Fälle. Die Startlage
 * x = (1,1; 0), y = (0,85; 0,75) liegt ganz im Ring: sie besteht die Probe,
 * ohne etwas zu beweisen.
 */

const BLAU = FMM_COLORS.blau; // die Menge selbst
const GRUEN = FMM_COLORS.gruen; // Verbindungsstrecke, gewählte Punkte
const ROT = FMM_COLORS.rot; // Stück der Strecke außerhalb der Menge
const ORANGE = FMM_COLORS.orange; // Extrempunkte
const NEUTRAL = FMM_COLORS.grau; // Hinweise ohne Farbrolle im Kapitel-Farbcode

const HALB = 1.4;
const SIZE = 300;
const PAD_L = 30;
const PAD_B = 30;
const PAD_R = 10;
const VB_W = PAD_L + SIZE + PAD_R;
const VB_H = SIZE + PAD_B;

const punktText = (p: Punkt) => `(${fmtDe(p[0])}; ${fmtDe(p[1])})`;

type Punkt = [number, number];

type Menge = {
  id: string;
  name: string;
  formel: string;
  /** Liegt z in der Menge? */
  drin: (z: Punkt) => boolean;
  /** ist die Menge konvex? (per node geprüft, s. Kopfkommentar) */
  konvex: boolean;
  /** blaue Fläche im Pixelraum */
  flaeche: (px: (x: number) => number, py: (y: number) => number) => ReactNode;
  /** Extrempunkte, soweit es endlich viele sind */
  extrem?: Punkt[];
  paar: [Punkt, Punkt];
  paarName: string;
};

/* ------------------------------------------------------------- die Mengen */

const kreisPfad = (px: (x: number) => number, py: (y: number) => number, r: number) => {
  const cx = px(0);
  const cy = py(0);
  const rp = px(r) - px(0);
  return `M${cx + rp},${cy} A${rp},${rp} 0 1 0 ${cx - rp},${cy} A${rp},${rp} 0 1 0 ${cx + rp},${cy} Z`;
};

const MENGEN: Menge[] = [
  {
    id: "scheibe",
    name: "Kreisscheibe",
    formel: "{ z : ‖z‖ ≤ 1,2 }",
    drin: (z) => Math.hypot(z[0], z[1]) <= 1.2 + 1e-12,
    konvex: true,
    flaeche: (px, py) => (
      <path
        d={kreisPfad(px, py, 1.2)}
        fill={BLAU}
        fillOpacity={0.16}
        stroke={BLAU}
        strokeWidth={1.4}
      />
    ),
    paar: [
      [-1, 0.5],
      [0.9, -0.6],
    ],
    paarName: "Testpaar setzen",
  },
  {
    id: "ring",
    name: "Kreisring",
    formel: "{ z : 0,8 ≤ ‖z‖ ≤ 1,2 }",
    drin: (z) => {
      const n = Math.hypot(z[0], z[1]);
      return n >= 0.8 - 1e-12 && n <= 1.2 + 1e-12;
    },
    konvex: false,
    flaeche: (px, py) => (
      <path
        d={`${kreisPfad(px, py, 1.2)} ${kreisPfad(px, py, 0.8)}`}
        fillRule="evenodd"
        fill={BLAU}
        fillOpacity={0.16}
        stroke={BLAU}
        strokeWidth={1.4}
      />
    ),
    paar: [
      [1.1, 0],
      [0, 1.1],
    ],
    paarName: "Gegenbeispiel setzen",
  },
  {
    id: "dreieck",
    name: "Dreieck",
    formel: "{ z : z₁ ≥ 0, z₂ ≥ 0, z₁ + z₂ ≤ 1 }",
    drin: (z) => z[0] >= -1e-12 && z[1] >= -1e-12 && z[0] + z[1] <= 1 + 1e-12,
    konvex: true,
    flaeche: (px, py) => (
      <polygon
        points={`${px(0)},${py(0)} ${px(1)},${py(0)} ${px(0)},${py(1)}`}
        fill={BLAU}
        fillOpacity={0.16}
        stroke={BLAU}
        strokeWidth={1.4}
      />
    ),
    extrem: [
      [0, 0],
      [1, 0],
      [0, 1],
    ],
    paar: [
      [0.05, 0.05],
      [0.8, 0.15],
    ],
    paarName: "Testpaar setzen",
  },
  {
    id: "parabel",
    name: "Parabelunterseite",
    formel: "{ z : z₂ ≤ z₁² }",
    drin: (z) => z[1] <= z[0] * z[0] + 1e-12,
    konvex: false,
    flaeche: (px, py) => {
      const n = 80;
      const oben: string[] = [];
      for (let i = 0; i <= n; i++) {
        const x = -HALB + (2 * HALB * i) / n;
        oben.push(`${px(x).toFixed(1)},${py(Math.min(x * x, HALB)).toFixed(1)}`);
      }
      return (
        <polygon
          points={`${oben.join(" ")} ${px(HALB)},${py(-HALB)} ${px(-HALB)},${py(-HALB)}`}
          fill={BLAU}
          fillOpacity={0.16}
          stroke={BLAU}
          strokeWidth={1.4}
        />
      );
    },
    paar: [
      [-1, 1],
      [1, 1],
    ],
    paarName: "Gegenbeispiel setzen",
  },
];

/* ------------------------------------------------------- Streckenanalyse */

type Befund = {
  /** Anteil der abgetasteten lambda-Werte außerhalb der Menge */
  anteil: number;
  /** kleinstes und größtes verletzendes lambda, per Bisektion nachgeschärft */
  von: number;
  bis: number;
  /** Stücke der Strecke, jeweils mit Angabe drin/außen */
  stuecke: { drin: boolean; a: number; b: number }[];
};

/**
 * Tastet die Strecke z(lambda) = lambda*x + (1-lambda)*y ab und fasst
 * gleichartige Nachbarn zu Stücken zusammen. Die Ränder der Verletzung
 * werden anschließend per Bisektion auf drei Nachkommastellen geschärft.
 */
function analysiere(menge: Menge, x: Punkt, y: Punkt, n = 600): Befund {
  const z = (l: number): Punkt => [l * x[0] + (1 - l) * y[0], l * x[1] + (1 - l) * y[1]];
  const flags: boolean[] = [];
  for (let i = 0; i <= n; i++) flags.push(menge.drin(z(i / n)));

  const stuecke: { drin: boolean; a: number; b: number }[] = [];
  let start = 0;
  for (let i = 1; i <= n; i++) {
    if (flags[i] !== flags[i - 1]) {
      stuecke.push({ drin: flags[start], a: start / n, b: (i - 0.5) / n });
      start = i;
    }
  }
  stuecke.push({ drin: flags[start], a: start / n, b: 1 });

  const draussen = flags.filter((f) => !f).length;
  if (draussen === 0) return { anteil: 0, von: NaN, bis: NaN, stuecke };

  // Rand schärfen: zwischen dem letzten Innen- und dem ersten Außenpunkt
  const grenze = (a: number, b: number) => {
    let lo = a;
    let hi = b;
    for (let k = 0; k < 40; k++) {
      const m = (lo + hi) / 2;
      if (menge.drin(z(m)) === menge.drin(z(a))) lo = m;
      else hi = m;
    }
    return (lo + hi) / 2;
  };
  const erst = flags.indexOf(false);
  const letzt = flags.lastIndexOf(false);
  const von = erst === 0 ? 0 : grenze((erst - 1) / n, erst / n);
  const bis = letzt === n ? 1 : grenze((letzt + 1) / n, letzt / n);
  return { anteil: draussen / (n + 1), von, bis, stuecke };
}

/* ------------------------------------------------------------- Komponente */

export function KonvexTest() {
  // Startlage: der Kreisring mit einem Paar, das die Probe BESTEHT — die
  // Auflösung (das Gegenbeispiel) liegt hinter dem Knopf, nicht im Default.
  const [mengeId, setMengeId] = useState(MENGEN[1].id);
  const [x, setX] = useState<Punkt>([1.1, 0]);
  const [y, setY] = useState<Punkt>([0.85, 0.75]);

  const menge = MENGEN.find((m) => m.id === mengeId) ?? MENGEN[0];

  const px = (v: number) => PAD_L + ((v + HALB) / (2 * HALB)) * SIZE;
  const py = (v: number) => SIZE - ((v + HALB) / (2 * HALB)) * SIZE;

  const zieh = useDrag<"x" | "y">({
    feld: { x0: PAD_L, y0: 0, w: SIZE, h: SIZE },
    welt: { x0: -HALB, x1: HALB, y0: -HALB, y1: HALB },
    snap: 0.05,
    clamp: ([a, b]) => [clamp(a, -HALB, HALB), clamp(b, -HALB, HALB)],
    greifPosition: (id) => (id === "x" ? x : y),
    onDrag: (p, id) => (id === "x" ? setX(p) : setY(p)),
  });

  const xDrin = menge.drin(x);
  const yDrin = menge.drin(y);
  const beideDrin = xDrin && yDrin;
  const befund = analysiere(menge, x, y);

  const mengenWahl = (id: string) => {
    const m = MENGEN.find((k) => k.id === id) ?? MENGEN[0];
    setMengeId(id);
    setX(m.paar[0]);
    setY(m.paar[1]);
  };

  const gleich = x[0] === y[0] && x[1] === y[1];
  const zAt = (l: number): Punkt => [l * x[0] + (1 - l) * y[0], l * x[1] + (1 - l) * y[1]];
  const mitte = zAt(0.5);

  const koordinate = (
    label: string,
    wert: number,
    setzen: (v: number) => void,
    farbe: string,
  ) => (
    <Slider
      label={label}
      value={wert}
      onChange={(v) => setzen(Math.round(v * 20) / 20)}
      min={-HALB}
      max={HALB}
      step={0.05}
      accent={farbe}
      fmt={(v) => fmtDe(v)}
    />
  );

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir x und y so, dass die grüne Strecke die blaue Menge verlässt.
      </Aufgabe>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {MENGEN.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={m.id === mengeId}
            className={m.id === mengeId ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => mengenWahl(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 grow basis-[300px]">
          <svg
            width={VB_W}
            height={VB_H}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="max-w-full h-auto rounded"
            role="img"
            aria-label={`Die Menge ${menge.name} mit zwei Punkten x und y; die Verbindungsstrecke ${
              !beideDrin ? "wird nicht geprüft" : befund.anteil > 0 ? "verlässt die Menge" : "bleibt in der Menge"
            }.`}
            {...zieh.svgProps}
          >
            <defs>
              <clipPath id="s122-clip">
                <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
              </clipPath>
            </defs>
            <rect
              x={0.5}
              y={0.5}
              width={VB_W - 1}
              height={VB_H - 1}
              rx={4}
              fill="var(--w-bg, #ffffff)"
              stroke="var(--w-border, #cbd5e1)"
            />
            {niceTicks(-HALB, HALB).map((t) => (
              <g key={`y${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + SIZE}
                  y1={py(t)}
                  y2={py(t)}
                  stroke={t === 0 ? "var(--w-grid-strong, #cbd5e1)" : "var(--w-grid, #e2e8f0)"}
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text
                  x={PAD_L - 4}
                  y={py(t) + 3}
                  textAnchor="end"
                  fill="var(--w-muted, #64748b)"
                  fontSize={10}
                >
                  {fmtTick(t, 0.5)}
                </text>
              </g>
            ))}
            {niceTicks(-HALB, HALB).map((t) => (
              <g key={`x${t}`}>
                <line
                  y1={0}
                  y2={SIZE}
                  x1={px(t)}
                  x2={px(t)}
                  stroke={t === 0 ? "var(--w-grid-strong, #cbd5e1)" : "var(--w-grid, #e2e8f0)"}
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text
                  x={px(t)}
                  y={SIZE + 12}
                  textAnchor="middle"
                  fill="var(--w-muted, #64748b)"
                  fontSize={10}
                >
                  {fmtTick(t, 0.5)}
                </text>
              </g>
            ))}
            <g clipPath="url(#s122-clip)">
              {menge.flaeche(px, py)}
              {befund.stuecke.map((s, i) => {
                const a = zAt(s.a);
                const b = zAt(s.b);
                return (
                  <line
                    key={i}
                    x1={px(a[0])}
                    y1={py(a[1])}
                    x2={px(b[0])}
                    y2={py(b[1])}
                    stroke={beideDrin ? (s.drin ? GRUEN : ROT) : NEUTRAL}
                    strokeWidth={beideDrin && !s.drin ? 3 : 2.2}
                  />
                );
              })}
              {(menge.extrem ?? []).map((e, i) => (
                <circle key={`e${i}`} cx={px(e[0])} cy={py(e[1])} r={4} fill={ORANGE} />
              ))}
              <DragHandle
                x={px(x[0])}
                y={py(x[1])}
                r={5}
                farbe={GRUEN}
                fuellung={xDrin ? GRUEN : "var(--w-bg, #ffffff)"}
                aktiv={zieh.dragging === "x"}
                label="x"
                {...zieh.handleProps("x")}
              />
              <DragHandle
                x={px(y[0])}
                y={py(y[1])}
                r={5}
                farbe={GRUEN}
                fuellung={yDrin ? GRUEN : "var(--w-bg, #ffffff)"}
                aktiv={zieh.dragging === "y"}
                label="y"
                {...zieh.handleProps("y")}
              />
            </g>
            <text x={PAD_L + 4} y={12} fill="var(--w-muted, #64748b)" fontSize={10}>
              z₂ ↑
            </text>
            <text
              x={PAD_L + SIZE / 2}
              y={SIZE + 26}
              textAnchor="middle"
              fill="var(--w-muted, #64748b)"
              fontSize={10}
            >
              z₁ →
            </text>
          </svg>
        </div>

        <div className="min-w-[15rem] grow basis-[15rem] space-y-1 text-sm">
          <button
            type="button"
            className={W_BUTTON}
            onClick={() => {
              setX(menge.paar[0]);
              setY(menge.paar[1]);
            }}
          >
            {menge.paarName}
          </button>
          {koordinate("x₁", x[0], (v) => setX([v, x[1]]), GRUEN)}
          {koordinate("x₂", x[1], (v) => setX([x[0], v]), GRUEN)}
          {koordinate("y₁", y[0], (v) => setY([v, y[1]]), GRUEN)}
          {koordinate("y₂", y[1], (v) => setY([y[0], v]), GRUEN)}
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3 align-top">Menge</td>
                <td className="font-mono text-xs" style={{ color: BLAU }}>
                  {menge.formel}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">x</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {punktText(x)} {xDrin ? "∈ 𝒳" : "∉ 𝒳"}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">y</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {punktText(y)} {yDrin ? "∈ 𝒳" : "∉ 𝒳"}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">Mittelpunkt</td>
                <td className="font-mono text-xs">
                  {punktText(mitte)} {menge.drin(mitte) ? "∈ 𝒳" : "∉ 𝒳"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {!beideDrin ? (
        <Verdikt kind="neutral" titel="Voraussetzung nicht erfüllt.">
          {!xDrin && !yDrin
            ? "Beide Punkte liegen"
            : !xDrin
              ? "Der Punkt x liegt"
              : "Der Punkt y liegt"}{" "}
          außerhalb der Menge. Definition 12.2.1 verlangt x, y ∈ 𝒳 und sagt über andere Paare
          nichts; ein Herausragen widerlegt hier also nichts. Ziehen wir den Punkt zurück, oder
          greifen wir zum vorbereiteten Paar.
        </Verdikt>
      ) : gleich ? (
        <Verdikt kind="neutral" titel="Beide Punkte fallen zusammen.">
          Die Strecke schrumpft zu einem Punkt. Für x = y ist λ·x + (1−λ)·y = x, die Bedingung
          aus Definition 12.2.1 also erfüllt, ohne dass wir etwas über die Menge erfahren. Ziehen
          wir y an eine andere Stelle.
        </Verdikt>
      ) : befund.anteil > 0 ? (
        <Verdikt kind="fail" titel="Geschafft: die Strecke verlässt die Menge.">
          Für λ echt zwischen {fmtDe(befund.von, 3)} und {fmtDe(befund.bis, 3)} liegt
          z(λ) = λ·x + (1−λ)·y außerhalb, das sind {fmtDe(100 * befund.anteil, 1)} % der
          abgetasteten Strecke. Damit ist die Bedingung aus Definition 12.2.1 verletzt, und
          dieses eine Paar entscheidet die Frage: {menge.name} ist nicht konvex.
        </Verdikt>
      ) : (
        <Verdikt kind="warn" titel="Dieses Paar besteht die Probe.">
          Für alle abgetasteten λ bleibt z(λ) = λ·x + (1−λ)·y in der Menge. Entschieden ist damit
          nichts, denn Definition 12.2.1 fordert <em>alle</em> Paare. Genau darin liegt die
          Asymmetrie aus Bemerkung 12.2.2: Widerlegen kostet ein Beispiel, Beweisen eine Rechnung
          über alle Paare. Ziehen wir x und y weiter auseinander.
        </Verdikt>
      )}
      <p className="max-w-prose text-xs text-slate-500 dark:text-slate-400">
        Der Kreisring vertritt hier die Einheitssphäre aus dem Selbsttest: Eine Kurve ohne Dicke
        lässt sich nicht treffen, und für das Argument zählt ohnehin nur das Loch in der Mitte.
      </p>
    </div>
  );
}
