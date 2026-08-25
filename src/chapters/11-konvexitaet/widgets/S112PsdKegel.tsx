import { useMemo, useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  Slider,
  Surface3D,
  Verdikt,
  ViewControls,
  W_BUTTON,
  W_BUTTON_AKTIV,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";
import type { Ebene3D, Kurve3D, Punkt3D, Sicht3D, Vec3 } from "../../../lib";

/**
 * §11.2: Der Kegel der positiv semidefiniten 2x2-Matrizen (Eigenbau, neu).
 *
 * DIE EINE EINSICHT: Positive Semidefinitheit ist eine Bedingung an drei
 * Zahlen — a >= 0, c >= 0 und ac >= b^2 — und die Menge, die sie beschreiben,
 * ist ein Kegel mit gekrümmtem Rand: Halbstrahlen bleiben darin, und mit je
 * zwei Matrizen auch ihre Verbindungsstrecke (Satz 11.2.8).
 *
 * Betrachtet wird die symmetrische Matrix A = [[a, b], [b, c]]. Die linke
 * Tafel ist die tot lesbare Hauptdarstellung: der Schnitt des Kegels bei
 * FESTEM b, also die Menge {(a, c) : a >= 0, c >= 0, ac >= b^2} in der
 * (a, c)-Ebene, begrenzt von der Hyperbel c = b^2/a. Der Punkt (a, c) ist
 * ziehbar (Muster 2), die drei Regler sind der Doppelpfad. Rechts steht
 * dieselbe Menge im Raum der drei Zahlen (D7), aber in gedrehten Koordinaten
 * u = (a - c)/2, b und s = (a + c)/2: wegen s^2 - u^2 = ac ist die Bedingung
 * dort s >= sqrt(u^2 + b^2), 𝒫₂ also ein KREISKEGEL. Die graue Scheibe ist die
 * Ebene b = const, die die linke Tafel zeigt, die blaue Kurve darin dieselbe
 * Hyperbel; der gestrichelte Kreis ist der Schnitt bei Spur 2, der grüne
 * Strahl der Halbstrahl t·A. Alle Zahlen stehen im Verdikt der 2D-Tafel.
 *
 * FARBROLLEN (Kapitel 11): die konvexe Menge (Kegel, Schnitt, Randfläche)
 * blau, die aktuelle Matrix als ausgezeichneter Punkt orange, die Verletzung
 * der Bedingung rot, der Strahl t·A als Menge von Konvexkombinations-Verwandten
 * grün.
 *
 * PROVENIENZ: Eigenbau für dieses Skript; Ziehen über `useDrag`, 3D über
 * `Surface3D` (Referenz-Aufrufer 10-differentialrechnung/widgets/S107Hesse.tsx).
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen: Eigenwerte der fünf Voreinstellungen
 * (Spur je 2 bzw. −2): Einheitsmatrix (1; 1), Rang 1 mit b = 1 (0; 2),
 * indefinit mit b = 2 (−1; 3), Nullzeile a = 2, c = 0 (0; 2), negativ definit
 * (−1; −1). Die Äquivalenz „a ≥ 0, c ≥ 0, ac ≥ b² ⇔ λ_min ≥ 0" wurde auf
 * einem 61³-Raster über [−1; 4] × [−2,5; 2,5] × [−1; 4] ohne Abweichung
 * bestätigt. Über 200 000 geseedete PSD-Paare bleibt sowohl t·A (t ≥ 0) als
 * auch jede Mischung λA + (1−λ)B semidefinit — 200 000 von 200 000.
 * Zusatzprobe: der Schnitt bei Spur 2 ist exakt die Einheitskreisscheibe
 * ((a−c)/2)² + b² ≤ 1 (641 601 Proben, 0 Abweichungen).
 */

const BLAU = FMM_COLORS.blau; // der Kegel und sein Schnitt
const ORANGE = FMM_COLORS.orange; // die aktuelle Matrix A
const ROT = FMM_COLORS.rot; // Verletzung der Bedingung
const GRUEN = FMM_COLORS.gruen; // der Strahl t·A

const A_LO = -1;
const A_HI = 4;
const B_HI = 2.5;
const SIZE = 300;
const PAD_L = 32;
const PAD_B = 30;
const PAD_R = 12;
const VB_W = PAD_L + SIZE + PAD_R;
const VB_H = SIZE + PAD_B;

const px = (v: number) => PAD_L + ((v - A_LO) / (A_HI - A_LO)) * SIZE;
const py = (v: number) => SIZE - ((v - A_LO) / (A_HI - A_LO)) * SIZE;

/** Eigenwerte der symmetrischen 2x2-Matrix [[a, b], [b, c]], aufsteigend. */
function eigenwerte(a: number, b: number, c: number): [number, number] {
  const m = (a + c) / 2;
  const r = Math.hypot((a - c) / 2, b);
  return [m - r, m + r];
}

type Vor = { name: string; titel: string; a: number; b: number; c: number };
const VOREINSTELLUNGEN: Vor[] = [
  { name: "Einheitsmatrix", titel: "positiv definit, im Inneren", a: 1, b: 0, c: 1 },
  { name: "Rang 1", titel: "semidefinit, auf dem Rand", a: 1, b: 1, c: 1 },
  { name: "Nullzeile", titel: "semidefinit, auf der Kante c = 0", a: 2, b: 0, c: 0 },
  { name: "indefinit", titel: "b zu groß, außerhalb", a: 1, b: 2, c: 1 },
  { name: "negativ definit", titel: "der gespiegelte Kegel", a: -1, b: 0, c: -1 },
];

export function PsdKegel() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [c, setC] = useState(1);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 18 });

  const [l1, l2] = eigenwerte(a, b, c);
  const det = a * c - b * b;
  const spur = a + c;
  const eps = 1e-9;
  const psd = a >= -eps && c >= -eps && det >= -eps;
  const art =
    Math.abs(a) < eps && Math.abs(b) < eps && Math.abs(c) < eps
      ? "null"
      : l1 > eps
        ? "definit"
        : psd
          ? "semidefinit"
          : l2 <= eps
            ? "negativ"
            : "indefinit";

  const farbeA = psd ? ORANGE : ROT;

  /* ----------------------------------------- 2D-Tafel: Schnitt bei festem b */

  const zieh = useDrag<"A">({
    feld: { x0: PAD_L, y0: 0, w: SIZE, h: SIZE },
    welt: { x0: A_LO, x1: A_HI, y0: A_LO, y1: A_HI },
    snap: 0.05,
    clamp: ([u, v]) => [clamp(u, A_LO, A_HI), clamp(v, A_LO, A_HI)],
    greifPosition: () => [a, c],
    onDrag: ([u, v]) => {
      setA(u);
      setC(v);
    },
  });

  /** Rand des Schnitts: c = b²/a, abgetastet von a₀ = b²/A_HI bis A_HI. */
  const randPunkte = useMemo(() => {
    const a0 = Math.max((b * b) / A_HI, 1e-6);
    const pts: [number, number][] = [];
    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      const av = a0 * Math.pow(A_HI / a0, t); // logarithmisch, die Hyperbel läuft steil
      pts.push([av, Math.min((b * b) / av, A_HI)]);
    }
    return pts;
  }, [b]);

  const schnittPolygon = `${randPunkte
    .map(([u, v]) => `${px(u).toFixed(1)},${py(v).toFixed(1)}`)
    .join(" ")} ${px(A_HI).toFixed(1)},${py(A_HI).toFixed(1)}`;

  const ticks = niceTicks(A_LO, A_HI);
  const tickStep = ticks.length > 1 ? ticks[1] - ticks[0] : undefined;

  /* ------------------------------------------------ 3D-Tafel: der Kegel (D7) */

  // Gedrehte Koordinaten: u = (a - c)/2 waagerecht, b waagerecht, s = (a + c)/2
  // senkrecht. Wegen s^2 - u^2 = ac ist die Bedingung ac >= b^2 zusammen mit
  // a, c >= 0 gleichwertig zu s >= sqrt(u^2 + b^2): 𝒫₂ ist in diesen Koordinaten
  // ein KREISKEGEL, und der Schnitt bei fester Spur ist eine Kreisscheibe.
  const U_HI = 2.5;
  const S_LO = -1.5;
  const S_HI = 4;
  const flaeche = useMemo(
    () => ({
      f: (u: number, v: number) => Math.min(Math.hypot(u, v), S_HI),
      xDomain: [-U_HI, U_HI] as [number, number],
      yDomain: [-U_HI, U_HI] as [number, number],
      nx: 34,
      ny: 34,
      color: BLAU,
      opacity: 0.8,
      wire: true,
    }),
    [],
  );
  const u = (a - c) / 2;
  const sHalb = (a + c) / 2;
  const punkte3d = useMemo<Punkt3D[]>(
    () => [{ p: [u, b, sHalb] as Vec3, color: farbeA, r: 4.5, label: "A", onTop: true }],
    [u, b, sHalb, farbeA],
  );
  // die Ebene b = const: genau der Schnitt, den die linke Tafel zeigt
  const ebenen3d = useMemo<Ebene3D[]>(
    () => [
      {
        p0: [0, b, (S_LO + S_HI) / 2] as Vec3,
        u: [1, 0, 0] as Vec3,
        v: [0, 0, 1] as Vec3,
        su: U_HI,
        sv: (S_HI - S_LO) / 2,
        color: FMM_COLORS.grau,
        opacity: 0.14,
      },
    ],
    [b],
  );
  const kurven3d = useMemo<Kurve3D[]>(() => {
    // Rand des Schnitts bei festem b: s = sqrt(u^2 + b^2), dieselbe Hyperbel
    // wie in der linken Tafel, nur in den gedrehten Koordinaten
    const hyperbel: Vec3[] = [];
    for (let i = 0; i <= 80; i++) {
      const uu = -U_HI + (2 * U_HI * i) / 80;
      hyperbel.push([uu, b, Math.min(Math.hypot(uu, b), S_HI)]);
    }
    // Schnitt bei Spur 2: der Einheitskreis u^2 + b^2 = 1 in der Ebene s = 1
    const spurKreis: Vec3[] = [];
    for (let i = 0; i <= 72; i++) {
      const t = (2 * Math.PI * i) / 72;
      spurKreis.push([Math.cos(t), Math.sin(t), 1]);
    }
    // der Halbstrahl t·A, solange er im gezeigten Quader bleibt
    const grenzen = [
      Math.abs(u) > 1e-9 ? U_HI / Math.abs(u) : Infinity,
      Math.abs(b) > 1e-9 ? U_HI / Math.abs(b) : Infinity,
      sHalb > 1e-9 ? S_HI / sHalb : sHalb < -1e-9 ? S_LO / sHalb : Infinity,
    ];
    const tMax = Math.min(...grenzen, 6);
    const strahl: Vec3[] = [
      [0, 0, 0],
      [tMax * u, tMax * b, tMax * sHalb],
    ];
    return [
      { pts: hyperbel, color: BLAU, width: 2, onTop: true },
      { pts: spurKreis, color: FMM_COLORS.grau, dash: "4 3", width: 1.4, onTop: true },
      { pts: strahl, color: GRUEN, dash: "5 4", width: 1.6, onTop: true },
    ];
  }, [u, b, sHalb]);

  const setzePreset = (v: Vor) => {
    setA(v.a);
    setB(v.b);
    setC(v.c);
  };
  const istAktiv = (v: Vor) =>
    Math.abs(a - v.a) < 1e-9 && Math.abs(b - v.b) < 1e-9 && Math.abs(c - v.c) < 1e-9;

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir den orangen Punkt (a, c) über die Ebene und schieben wir b, bis die Bedingung
        ac ≥ b² kippt.
      </Aufgabe>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {VOREINSTELLUNGEN.map((v) => (
          <button
            key={v.name}
            type="button"
            title={v.titel}
            aria-pressed={istAktiv(v)}
            className={istAktiv(v) ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setzePreset(v)}
          >
            {v.name}
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
            aria-label={`Schnitt des Kegels bei b = ${fmtDe(b)}: die Menge aller (a, c) mit a·c ≥ b². Die aktuelle Matrix liegt ${psd ? "darin" : "außerhalb"}.`}
            {...zieh.svgProps}
          >
            <rect
              x={0.5}
              y={0.5}
              width={VB_W - 1}
              height={VB_H - 1}
              rx={4}
              fill="var(--w-bg, #ffffff)"
              stroke="var(--w-border, #cbd5e1)"
            />
            <defs>
              <clipPath id="s122-psd-clip">
                <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
              </clipPath>
            </defs>
            {ticks.map((t) => (
              <g key={`t${t}`}>
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
                  {fmtTick(t, tickStep)}
                </text>
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
                  y={SIZE + 13}
                  textAnchor="middle"
                  fill="var(--w-muted, #64748b)"
                  fontSize={10}
                >
                  {fmtTick(t, tickStep)}
                </text>
              </g>
            ))}
            <g clipPath="url(#s122-psd-clip)">
              <polygon points={schnittPolygon} fill={BLAU} fillOpacity={0.16} />
              <polyline
                points={randPunkte.map(([u, v]) => `${px(u).toFixed(1)},${py(v).toFixed(1)}`).join(" ")}
                fill="none"
                stroke={BLAU}
                strokeWidth={1.8}
              />
              <DragHandle
                x={px(a)}
                y={py(c)}
                r={5}
                farbe={farbeA}
                aktiv={zieh.dragging === "A"}
                label="(a, c)"
                {...zieh.handleProps("A")}
              />
            </g>
            <text x={PAD_L + 4} y={12} fill="var(--w-muted, #64748b)" fontSize={10}>
              c ↑
            </text>
            <text
              x={PAD_L + SIZE / 2}
              y={SIZE + 27}
              textAnchor="middle"
              fill="var(--w-muted, #64748b)"
              fontSize={10}
            >
              a →
            </text>
          </svg>
          <p className="mt-1 max-w-prose text-xs text-slate-500 dark:text-slate-400">
            Der Schnitt des Kegels bei festem b: blau die zulässigen Paare (a, c), begrenzt von
            der Hyperbel c = b²/a. Für b = 0 füllt er den ganzen Viertelraum, mit wachsendem |b|
            zieht er sich zusammen.
          </p>
        </div>

        <div className="shrink-0">
          <Surface3D
            size={280}
            xDomain={[-U_HI, U_HI]}
            yDomain={[-U_HI, U_HI]}
            zDomain={[S_LO, S_HI]}
            surface={flaeche}
            points={punkte3d}
            curves={kurven3d}
            planes={ebenen3d}
            dropLines
            labels={{ x: "½(a−c)", y: "b", z: "½(a+c)" }}
            azimuth={sicht.azimuth}
            elevation={sicht.elevation}
            onViewChange={setSicht}
            ariaLabel={`Der Kegel der positiv semidefiniten 2x2-Matrizen als Kreiskegel in den gedrehten Koordinaten (a−c)/2, b und (a+c)/2; die aktuelle Matrix liegt ${psd ? "im Kegel" : "außerhalb"}.`}
          />
          <div className="mt-1 max-w-[280px]">
            <ViewControls value={sicht} onChange={setSicht} />
          </div>
          <p className="mt-1 max-w-[280px] text-xs text-slate-500 dark:text-slate-400">
            Dieselbe Menge in gedrehten Koordinaten: waagerecht ½(a−c) und b, senkrecht die
            halbe Spur ½(a+c). Darin ist 𝒫₂ ein Kreiskegel, denn ac ≥ b² heißt hier
            (a+c)/2 ≥ √(((a−c)/2)² + b²). Blau der Rand, grau gestrichelt sein Schnitt bei
            Spur 2, die graue Scheibe die Ebene b = {fmtDe(b)} mit der Hyperbel der linken Tafel,
            grün der Halbstrahl t·A. Ziehen dreht die Ansicht.
          </p>
        </div>

        <div className="min-w-[15rem] grow basis-[15rem] space-y-1 text-sm">
          <Slider label="a" value={a} onChange={(v) => setA(Math.round(v * 20) / 20)} min={A_LO} max={A_HI} step={0.05} accent={ORANGE} />
          <Slider label="b" value={b} onChange={(v) => setB(Math.round(v * 20) / 20)} min={-B_HI} max={B_HI} step={0.05} accent={ORANGE} />
          <Slider label="c" value={c} onChange={(v) => setC(Math.round(v * 20) / 20)} min={A_LO} max={A_HI} step={0.05} accent={ORANGE} />
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3">A</td>
                <td className="font-mono text-xs" style={{ color: farbeA }}>
                  ({fmtDe(a)} {fmtDe(b)}; {fmtDe(b)} {fmtDe(c)})
                </td>
              </tr>
              <tr>
                <td className="pr-3">Spur a + c</td>
                <td className="font-mono text-xs">{fmtDe(spur)}</td>
              </tr>
              <tr>
                <td className="pr-3">det = ac − b²</td>
                <td className="font-mono text-xs">{fmtDe(det)}</td>
              </tr>
              <tr>
                <td className="pr-3">Eigenwerte</td>
                <td className="font-mono text-xs" style={{ color: farbeA }}>
                  {fmtDe(l1)}; {fmtDe(l2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {art === "definit" ? (
        <Verdikt kind="ok" titel="Positiv definit.">
          Beide Eigenwerte sind positiv, also ist xᵀAx {">"} 0 für jedes x ≠ 0 und A erst recht
          semidefinit im Sinne von Definition 11.2.7. Der Punkt liegt im Inneren des blauen
          Schnitts, und mit ihm der ganze Halbstrahl t·A für t ≥ 0: Alle drei Bedingungen sind
          homogen, Skalieren ändert an keiner etwas.
        </Verdikt>
      ) : art === "semidefinit" ? (
        <Verdikt kind="warn" titel="Semidefinit, aber nicht definit: A liegt auf dem Rand.">
          Der kleinere Eigenwert ist {fmtDe(l1)} und die Determinante ac − b² = {fmtDe(det)}. Es
          gibt also ein x ≠ 0 mit xᵀAx = 0, und A ist nicht invertierbar. Genau diese Matrizen
          fehlen der positiv definiten Menge; sie sind der Rand des Kegels und der Fall, an dem
          das Cholesky-Verfahren scheitert (Bemerkung 11.2.9).
        </Verdikt>
      ) : art === "indefinit" ? (
        <Verdikt kind="fail" titel="Indefinit: A gehört nicht zu 𝒫₂.">
          Die Eigenwerte {fmtDe(l1)} und {fmtDe(l2)} haben verschiedene Vorzeichen, die Bedingung
          aus Definition 11.2.7 ist verletzt. In der linken Tafel liegt der Punkt unter der
          Hyperbel: ac = {fmtDe(a * c)} ist kleiner als b² = {fmtDe(b * b)}. Der Kegel ist
          trotzdem konvex; Satz 11.2.8 verbietet nur, dass eine Mischung zweier semidefiniter
          Matrizen hier landet.
        </Verdikt>
      ) : art === "negativ" ? (
        <Verdikt kind="fail" titel="Negativ semidefinit: der gespiegelte Kegel.">
          Beide Eigenwerte sind höchstens null, also ist −A semidefinit und A gehört nicht zu
          𝒫₂. Im Raum rechts liegt der Punkt im gespiegelten Kegel −𝒫₂; die beiden Kegel berühren
          sich nur in der Nullmatrix. Eine Mischung aus einer Matrix hier und einer aus 𝒫₂ kann
          jeden der drei Fälle treffen, denn konvex ist nur jeder Kegel für sich.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral" titel="Die Nullmatrix.">
          Alle drei Zahlen sind null. Dann ist xᵀAx = 0 für jedes x, die Bedingung aus
          Definition 11.2.7 ist mit Gleichheit erfüllt, und A liegt in 𝒫₂, und zwar als Spitze
          des Kegels, in der sich alle Halbstrahlen treffen.
        </Verdikt>
      )}
    </div>
  );
}
