/**
 * Konzept-Widget `function-composition`.
 *
 * DIE EINE EINSICHT: Bei g∘f ist genau eine Zahl doppelt belegt — der
 * Zwischenwert f(x) ist zugleich Ausgabe von f und Eingabe von g. Der orange
 * Punkt steht deshalb in beiden Bildern über bzw. an derselben Zahl.
 *
 * FARBROLLEN: blau = f, grün = g, orange = der weitergereichte Zwischenwert.
 * Achsen, Ticks und Beschriftungen kommen aus den Theme-Variablen (--w-*).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O0/check-o0.mjs, 2026-08-20):
 * f(x)=x+1 bildet den Reglerbereich [−3; 3] auf [−2; 4] ab, deshalb läuft die
 * t-Achse des g-Bildes über [−2; 4] und nicht wie früher über [−3; 3] — sonst
 * verließ der orange Punkt ab x = 2,1 die Zeichenfläche. g(t)=t² erreicht auf
 * [−2; 4] höchstens 16, die y-Achse deckt [0; 16] ab.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const W = 130;
const H = 104;
const L = 20;
const R = 6;
const T = 18;
const B = 20;

type Tafel = {
  titel: string;
  f: (t: number) => number;
  tDom: [number, number];
  yDom: [number, number];
  tTicks: number[];
  yTicks: number[];
  farbe: string;
};

function Minitafel({
  tafel,
  tMark,
  yMark,
}: {
  tafel: Tafel;
  tMark: number;
  yMark: number;
}) {
  const { titel, f, tDom, yDom, tTicks, yTicks, farbe } = tafel;
  const X = (t: number) => L + ((t - tDom[0]) / (tDom[1] - tDom[0])) * (W - L - R);
  const Y = (v: number) => H - B - ((v - yDom[0]) / (yDom[1] - yDom[0])) * (H - T - B);
  const pts = Array.from({ length: 61 }, (_, i) => tDom[0] + (i * (tDom[1] - tDom[0])) / 60)
    .map((t) => `${X(t).toFixed(1)},${Y(f(t)).toFixed(1)}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="max-w-full h-auto"
      role="img"
      aria-label={`Graph von ${titel} mit dem markierten Wert ${fmtDe(tMark, 1)}.`}
    >
      {yTicks.map((v) => (
        <g key={`y${v}`}>
          <line
            x1={L}
            x2={W - R}
            y1={Y(v)}
            y2={Y(v)}
            stroke={v === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
            strokeWidth={v === 0 ? 1 : 0.6}
          />
          <text x={L - 3} y={Y(v) + 3} textAnchor="end" fontSize={7} fill="var(--w-muted)">
            {fmtDe(v, 0)}
          </text>
        </g>
      ))}
      {tTicks.map((t) => (
        <g key={`t${t}`}>
          <line
            x1={X(t)}
            x2={X(t)}
            y1={T}
            y2={H - B}
            stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
            strokeWidth={t === 0 ? 1 : 0.6}
          />
          <text x={X(t)} y={H - B + 9} textAnchor="middle" fontSize={7} fill="var(--w-muted)">
            {fmtDe(t, 0)}
          </text>
        </g>
      ))}
      <text x={W - R} y={H - 3} textAnchor="end" fontSize={7} fill="var(--w-muted)">
        t
      </text>
      <polyline points={pts} fill="none" stroke={farbe} strokeWidth="2" />
      <line
        x1={X(tMark)}
        y1={Y(yMark)}
        x2={X(tMark)}
        y2={H - B}
        stroke={FMM_COLORS.orange}
        strokeDasharray="2 2"
      />
      <circle cx={X(tMark)} cy={Y(yMark)} r="4" fill={FMM_COLORS.orange} />
      <text x={L} y={11} fill="var(--w-text)" fontSize="10">
        {titel}
      </text>
    </svg>
  );
}

export function CompositionPipeline() {
  const [x, setX] = useState(1);
  const fx = x + 1;
  const gfx = fx * fx;
  const tafelF: Tafel = {
    titel: "f(t) = t + 1",
    f: (t) => t + 1,
    tDom: [-3, 3],
    yDom: [-2, 4],
    tTicks: [-3, 0, 3],
    yTicks: [-2, 0, 2, 4],
    farbe: FMM_COLORS.blau,
  };
  const tafelG: Tafel = {
    titel: "g(t) = t²",
    f: (t) => t * t,
    tDom: [-2, 4],
    yDom: [0, 16],
    tTicks: [-2, 0, 2, 4],
    yTicks: [0, 8, 16],
    farbe: FMM_COLORS.gruen,
  };
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Verändern wir x und verfolgen wir den orange markierten Zwischenwert in beiden Bildern.
      </Aufgabe>
      <div className={`font-mono text-xs ${W_TEXT}`}>
        x = {fmtDe(x, 1)} → f(x) = {fmtDe(fx, 1)} → g(f(x)) = {fmtDe(gfx, 2)}
      </div>
      <div className="mt-1 grid grid-cols-2 gap-2">
        <Minitafel tafel={tafelF} tMark={x} yMark={fx} />
        <Minitafel tafel={tafelG} tMark={fx} yMark={gfx} />
      </div>
      <p className={`text-xs ${W_TEXT}`}>Blau: f; Grün: g; Orange: der weitergereichte Wert.</p>
      <Slider label="x" value={x} onChange={setX} min={-3} max={3} step={0.1} />
      <Verdikt kind={Math.abs(fx) < 0.05 ? "warn" : "neutral"}>
        {Math.abs(fx) < 0.05 ? (
          <>
            Hier ist der Zwischenwert f(x) = 0, und g bildet die 0 auf 0 ab. Die Kette liefert
            also 0, obwohl x selbst nicht null ist — die Verkettung sieht nur den Zwischenwert.
          </>
        ) : (
          <>
            f liefert {fmtDe(fx, 1)}; genau dieser Wert ist die Eingabe von g und führt zu{" "}
            {fmtDe(gfx, 2)}. Der orange Punkt steht im linken Bild auf der Höhe {fmtDe(fx, 1)}
            {" "}und im rechten Bild über der Stelle {fmtDe(fx, 1)}.
          </>
        )}
      </Verdikt>
    </div>
  );
}
