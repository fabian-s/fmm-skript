import { useState, type ReactNode } from "react";
import { Aufgabe, DragHandle, FMM_COLORS, MatrixDisplay, Slider, useDrag, Verdikt, fmtDe } from "../../../lib";

/**
 * Einsicht: A = v wᵀ arbeitet in zwei Schritten: wᵀx misst x zu einer Zahl,
 * danach legt die Multiplikation mit v das Ergebnis Ax auf span(v). Genau
 * w⊥ wird im ersten Schritt zu null und ist daher der Kern.
 * Farbrollen: v und im(A) blau, w und ker(A) grün, x grau, Ax orange.
 * Provenienz: Eigenbau. Verifizierte Zahlen: Für v=(1,1), w=(1,0),
 * x=(1,3;0,3) ist A=((1,0),(1,0)), wᵀx=1,3 und Ax=(1,3;1,3);
 * für x=(0;1,2) gilt wᵀx=0 und Ax=0.
 * Siehe scripts/verify/KAP09/s93-rang-eins.mjs (2026-08-26).
 */
type Vektor2 = [number, number];
type Fall = "ausserhalb" | "kern";

const { blau: BLAU, gruen: GRUEN, orange: ORANGE, grau: GRAU } = FMM_COLORS;
const STANDARD_V: Vektor2 = [1, 1];
const STANDARD_W: Vektor2 = [1, 0];
const STANDARD_X: Vektor2 = [1.3, 0.3];
const px = (x: number) => 150 + 48 * x;
const py = (y: number) => 150 - 48 * y;
const begrenze = (wert: number) => Math.max(-2, Math.min(2, wert));
const norm = ([a, b]: Vektor2) => Math.hypot(a, b);
const matrix = (v: Vektor2, w: Vektor2) => [
  [v[0] * w[0], v[0] * w[1]],
  [v[1] * w[0], v[1] * w[1]],
];
const nahe = (a: Vektor2, b: Vektor2) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.03;

const insSichtfeld = ([a, b]: Vektor2, grenze = 1.82): [Vektor2, boolean] => {
  const faktor = Math.min(1, grenze / Math.max(Math.abs(a), Math.abs(b), Number.EPSILON));
  return [[faktor * a, faktor * b], faktor < 1];
};

const aufLaenge = ([a, b]: Vektor2, laenge: number): Vektor2 => {
  const n = Math.hypot(a, b);
  return n < 1e-12 ? [0, 0] : [laenge * a / n, laenge * b / n];
};

const presetX = (fall: Fall, w: Vektor2): Vektor2 => (
  fall === "kern" ? aufLaenge([-w[1], w[0]], 1.3) : aufLaenge(w, 1.3)
);

function Reglergruppe({
  titel,
  farbe,
  children,
}: {
  titel: string;
  farbe: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="min-w-0 rounded-md border border-slate-200 px-3 pb-2 dark:border-slate-700">
      <legend className="px-1 text-sm font-semibold" style={{ color: farbe }}>{titel}</legend>
      {children}
    </fieldset>
  );
}

function FaktorAnzeige({ v, w, A }: { v: Vektor2; w: Vektor2; A: number[][] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm" aria-label="Faktoren und aktuelle Rang-eins-Matrix">
      <div><span style={{ color: BLAU }}>v = </span><MatrixDisplay value={[[v[0]], [v[1]]]} /></div>
      <div><span style={{ color: GRUEN }}>w = </span><MatrixDisplay value={[[w[0]], [w[1]]]} /></div>
      <div><span>A = vwᵀ = </span><MatrixDisplay value={A} /></div>
    </div>
  );
}

export function RangEinsExplorer() {
  const [v, setV] = useState<Vektor2>(STANDARD_V);
  const [w, setW] = useState<Vektor2>(STANDARD_W);
  const [x, setX] = useState<Vektor2>(STANDARD_X);
  const zieh = useDrag<"x">({
    feld: { x0: 54, y0: 54, w: 192, h: 192 },
    welt: { x0: -2, x1: 2, y0: -2, y1: 2 },
    greifPosition: () => x,
    onDrag: (punkt) => setX(punkt),
    clamp: ([a, b]) => [begrenze(a), begrenze(b)],
  });

  const A = matrix(v, w);
  const skalar = w[0] * x[0] + w[1] * x[1];
  const Ax: Vektor2 = [v[0] * skalar, v[1] * skalar];
  const rangEins = norm(v) > 0.12 && norm(w) > 0.12;
  const kernTreffer = rangEins && Math.abs(skalar) < 0.08;
  const kernRichtung: Vektor2 = [-w[1], w[0]];
  const [AxImBild, AxAusserhalb] = insSichtfeld(Ax);
  const kernPreset = presetX("kern", w);
  const ausserhalbPreset = presetX("ausserhalb", w);
  const aktiverFall: Fall | null = nahe(x, kernPreset)
    ? "kern"
    : nahe(x, ausserhalbPreset) ? "ausserhalb" : null;

  const setzeFall = (fall: Fall) => {
    if (norm(w) > 0.12) setX(presetX(fall, w));
  };

  const reset = () => {
    setV(STANDARD_V);
    setW(STANDARD_W);
    setX(STANDARD_X);
  };

  return (
    <div className="space-y-3">
      <Aufgabe>Ziehen wir nur x: Zuerst lesen wir die Zahl wᵀx ab, dann das daraus entstehende Ax.</Aufgabe>

      <div className="mx-auto max-w-xl rounded-md border border-slate-200 bg-white/60 p-3 dark:border-slate-700 dark:bg-slate-900/30">
        <FaktorAnzeige v={v} w={w} A={A} />
        <div className="mt-3 grid gap-2 sm:grid-cols-2" aria-label="Die zwei Rechenschritte von A x">
          <div className="rounded-md border-l-4 border-emerald-600 bg-slate-50 p-2 dark:bg-slate-800/60">
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: GRUEN }}>1 · Messen</div>
            <div className="mt-1 font-mono text-sm tabular-nums">
              wᵀx = {fmtDe(w[0], 1)} · {fmtDe(x[0], 1)} + {fmtDe(w[1], 1)} · {fmtDe(x[1], 1)}
              <span className="ml-2 font-semibold" style={{ color: GRUEN }}>= {fmtDe(skalar, 2)}</span>
            </div>
          </div>
          <div className="rounded-md border-l-4 border-orange-500 bg-slate-50 p-2 dark:bg-slate-800/60">
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>2 · Auf v ablegen</div>
            <div className="mt-1 font-mono text-sm tabular-nums">
              Ax = {fmtDe(skalar, 2)} · v
              <span className="ml-2 font-semibold" style={{ color: ORANGE }}>= ({fmtDe(Ax[0], 2)}; {fmtDe(Ax[1], 2)})ᵀ</span>
            </div>
          </div>
        </div>
      </div>

      <svg
        viewBox="0 0 300 300"
        className="mx-auto block h-auto w-full max-w-[27rem] overflow-hidden"
        role="img"
        aria-label={kernTreffer
          ? "Der Eingabevektor x liegt im gestrichelten Kern; das Ergebnis A x ist der Nullvektor."
          : "Der Eingabevektor x wird auf einen Vektor A x entlang der blauen Bildgeraden abgebildet."}
        {...zieh.svgProps}
      >
        <line x1="54" y1="150" x2="246" y2="150" stroke="var(--w-axis)" />
        <line x1="150" y1="54" x2="150" y2="246" stroke="var(--w-axis)" />

        {norm(w) > 0.12 && (
          <line
            x1={px(-2 * kernRichtung[0] / norm(kernRichtung))}
            y1={py(-2 * kernRichtung[1] / norm(kernRichtung))}
            x2={px(2 * kernRichtung[0] / norm(kernRichtung))}
            y2={py(2 * kernRichtung[1] / norm(kernRichtung))}
            stroke={GRUEN}
            strokeDasharray="6 4"
            strokeWidth="2"
          />
        )}
        {norm(v) > 0.12 && (
          <line
            x1={px(-2 * v[0] / norm(v))}
            y1={py(-2 * v[1] / norm(v))}
            x2={px(2 * v[0] / norm(v))}
            y2={py(2 * v[1] / norm(v))}
            stroke={BLAU}
            strokeWidth="2.5"
          />
        )}

        <line x1="150" y1="150" x2={px(w[0])} y2={py(w[1])} stroke={GRUEN} strokeWidth="3" />
        <circle cx={px(w[0])} cy={py(w[1])} r="3.5" fill={GRUEN} />
        <line x1="150" y1="150" x2={px(v[0])} y2={py(v[1])} stroke={BLAU} strokeWidth="3" />
        <circle cx={px(v[0])} cy={py(v[1])} r="3.5" fill={BLAU} />
        <line x1="150" y1="150" x2={px(x[0])} y2={py(x[1])} stroke={GRAU} strokeWidth="2.5" />
        <line x1="150" y1="150" x2={px(AxImBild[0])} y2={py(AxImBild[1])} stroke={ORANGE} strokeWidth="4" />
        <circle cx={px(AxImBild[0])} cy={py(AxImBild[1])} r="3.5" fill={ORANGE} />

        <text x="158" y="69" fill={GRUEN} fontSize="10">ker A = w⊥</text>
        <text x="190" y="223" fill={BLAU} fontSize="10">im A = span(v)</text>
        <text x={px(w[0]) + 6} y={py(w[1]) + 13} fill={GRUEN} fontSize="11">w</text>
        <text x={px(v[0]) + 6} y={py(v[1]) - 6} fill={BLAU} fontSize="11">v</text>
        <text x={px(x[0]) + 6} y={py(x[1]) - 6} fill="var(--w-text)" fontSize="11">x</text>
        <text
          x={px(AxImBild[0]) + (AxImBild[0] > 1.4 ? -6 : 6)}
          y={py(AxImBild[1]) + (AxImBild[1] < -1.4 ? -7 : 13)}
          textAnchor={AxImBild[0] > 1.4 ? "end" : "start"}
          fill={ORANGE}
          fontSize="11"
        >
          {AxAusserhalb ? "Ax (außerhalb)" : "Ax"}
        </text>
        <DragHandle x={px(x[0])} y={py(x[1])} farbe={GRAU} aktiv={zieh.dragging === "x"} {...zieh.handleProps("x")} />
      </svg>

      <div className="mx-auto flex max-w-xl flex-wrap gap-2" role="group" aria-label="Beispielfälle für x">
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm aria-pressed:bg-slate-800 aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:aria-pressed:bg-slate-100 dark:aria-pressed:text-slate-900"
          aria-pressed={aktiverFall === "ausserhalb"}
          disabled={norm(w) <= 0.12}
          onClick={() => setzeFall("ausserhalb")}
        >
          x außerhalb des Kerns
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm aria-pressed:bg-slate-800 aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:aria-pressed:bg-slate-100 dark:aria-pressed:text-slate-900"
          aria-pressed={aktiverFall === "kern"}
          disabled={norm(w) <= 0.12}
          onClick={() => setzeFall("kern")}
        >
          x im Kern
        </button>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <Reglergruppe titel="Nur die Eingabe x verändern" farbe={GRAU}>
          <Slider label="x₁" value={x[0]} onChange={(wert) => setX([wert, x[1]])} min={-2} max={2} step={0.1} accent={GRAU} />
          <Slider label="x₂" value={x[1]} onChange={(wert) => setX([x[0], wert])} min={-2} max={2} step={0.1} accent={GRAU} />
        </Reglergruppe>
      </div>

      <Verdikt kind={!rangEins ? "warn" : kernTreffer ? "ok" : "neutral"}>
        {!rangEins
          ? "Mindestens einer der Faktoren ist der Nullvektor: A ist dann die Nullmatrix und keine Rang-1-Matrix."
          : kernTreffer
            ? `1. Messen: wᵀx = ${fmtDe(skalar, 2)}. 2. Auf v ablegen: Ax = 0 · v = 0. Genau deshalb gehört x zum Kern.`
            : `1. Messen: wᵀx = ${fmtDe(skalar, 2)}. 2. Auf v ablegen: Ax = ${fmtDe(skalar, 2)} · v = (${fmtDe(Ax[0], 2)}; ${fmtDe(Ax[1], 2)})ᵀ. Das Ergebnis liegt auf der blauen Bildgeraden span(v).`}
      </Verdikt>

      <details className="mx-auto max-w-xl rounded-md border border-slate-200 p-3 dark:border-slate-700">
        <summary className="cursor-pointer text-sm font-semibold">Optional: v und w selbst verändern</summary>
        <div className="mt-3 grid gap-3">
          <Reglergruppe titel="v dreht die Bildgerade" farbe={BLAU}>
            <Slider label="v₁" value={v[0]} onChange={(wert) => setV([wert, v[1]])} min={-2} max={2} step={0.1} accent={BLAU} />
            <Slider label="v₂" value={v[1]} onChange={(wert) => setV([v[0], wert])} min={-2} max={2} step={0.1} accent={BLAU} />
          </Reglergruppe>
          <Reglergruppe titel="w dreht den dazu senkrechten Kern" farbe={GRUEN}>
            <Slider label="w₁" value={w[0]} onChange={(wert) => setW([wert, w[1]])} min={-2} max={2} step={0.1} accent={GRUEN} />
            <Slider label="w₂" value={w[1]} onChange={(wert) => setW([w[0], wert])} min={-2} max={2} step={0.1} accent={GRUEN} />
          </Reglergruppe>
          <button type="button" className="w-fit rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-600" onClick={reset}>
            Ausgangslage wiederherstellen
          </button>
        </div>
      </details>
    </div>
  );
}
