import { useState } from "react";
import { Slider, niceTicks } from "../../../lib";

/**
 * §12.4: Jensen-Ungleichung zum Schieben (Eigenbau, kein Portat).
 *
 * Drei feste Stützstellen x1 = 0,5, x2 = 1,5, x3 = 3,5 bekommen je einen
 * Gewichtsregler. Das Widget normiert die Regler auf Summe 1 und zeichnet
 * die beiden Seiten der Jensen-Ungleichung als zwei Markierungen über
 * derselben Stelle xquer = sum w_i x_i:
 *
 *   orange: f(xquer)          (Funktionswert der Mischung, auf der Kurve)
 *   grün:   sum w_i f(x_i)    (Mischung der Funktionswerte, im Dreieck)
 *
 * Farbcode Kapitel 12: konvexe Menge/Funktion blau, Konvexkombinationen
 * grün, ausgezeichnete Punkte orange, verletzte Ungleichung rot (tritt bei
 * der konkaven Gegenprobe sqrt(x) auf).
 *
 * Kein Zufall im Render, alle Zustände sind aus den drei Reglern bestimmt.
 *
 * Per node nachgerechnet (check-math-s124.mjs), gleiche Gewichte 1/3:
 * xquer = 11/6 = 1,8333; x^2: 3,3611 gegen 4,9167 (Lücke 1,5556 = gewichtete
 * Varianz der Stützstellen); e^x: 6,2547 gegen 13,0820; sqrt(x): 1,3540
 * gegen 1,2676, also umgekehrtes Vorzeichen. Für w = (0,2; 0,3; 0,5):
 * xquer = 2,3, x^2: 5,29 gegen 6,85 (Lücke 1,56 = Varianz).
 */

const BLAU = "#0072B2"; // die konvexe Funktion und ihr Epigraph
const GRUEN = "#009E73"; // Konvexkombinationen (Sehnenzug, gemischter Wert)
const ORANGE = "#E69F00"; // ausgezeichneter Punkt: f der Mischung
const ROT = "#D55E00"; // verletzte Ungleichung (konkave Gegenprobe)

type Fkt = {
  key: string;
  label: string;
  f: (x: number) => number;
  konvex: boolean;
  yMax: number;
};

const FUNKTIONEN: Fkt[] = [
  { key: "quad", label: "f(x) = x²", f: (x) => x * x, konvex: true, yMax: 14 },
  { key: "exp", label: "f(x) = eˣ", f: (x) => Math.exp(x), konvex: true, yMax: 36 },
  { key: "wurzel", label: "f(x) = √x  (konkav)", f: (x) => Math.sqrt(x), konvex: false, yMax: 2.2 },
];

const STUETZ = [0.5, 1.5, 3.5];
const NAMEN = ["x₁", "x₂", "x₃"];

const X_LO = 0;
const X_HI = 4.2;
const W = 340;
const H = 240;
const PAD_L = 40;
const PAD_B = 22;
const PAD_T = 10;
const PAD_R = 12;

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const VOREINSTELLUNGEN: { name: string; w: [number, number, number] }[] = [
  { name: "gleiche Gewichte", w: [1, 1, 1] },
  { name: "w = (0,2; 0,3; 0,5)", w: [0.2, 0.3, 0.5] },
  { name: "nur x₂", w: [0, 1, 0] },
  { name: "x₁ und x₃ je zur Hälfte", w: [1, 0, 1] },
  { name: "alle Regler auf null", w: [0, 0, 0] },
];

export function JensenExplorer() {
  const [fi, setFi] = useState(0);
  const [w1, setW1] = useState(1);
  const [w2, setW2] = useState(1);
  const [w3, setW3] = useState(1);

  const fkt = FUNKTIONEN[fi];
  const roh: [number, number, number] = [w1, w2, w3];
  const summe = w1 + w2 + w3;
  const definiert = summe > 1e-12;
  const w: number[] = definiert ? roh.map((v) => v / summe) : [NaN, NaN, NaN];

  const xquer = definiert ? STUETZ.reduce((s, x, i) => s + w[i] * x, 0) : NaN;
  const links = definiert ? fkt.f(xquer) : NaN; // f(sum w_i x_i)
  const rechts = definiert ? STUETZ.reduce((s, x, i) => s + w[i] * fkt.f(x), 0) : NaN;
  const luecke = rechts - links;
  const varianz = definiert ? STUETZ.reduce((s, x, i) => s + w[i] * (x - xquer) ** 2, 0) : NaN;

  const yMax = fkt.yMax;
  const px = (x: number) => PAD_L + ((x - X_LO) / (X_HI - X_LO)) * W;
  const py = (y: number) => PAD_T + H - (y / yMax) * H;

  // Kurve
  const N = 160;
  const kurve: string = Array.from({ length: N + 1 }, (_, k) => {
    const x = X_LO + ((X_HI - X_LO) * k) / N;
    return `${px(x).toFixed(1)},${py(Math.min(fkt.f(x), yMax * 1.2)).toFixed(1)}`;
  }).join(" ");

  // Dreieck (konvexe Hülle) der drei Graphenpunkte
  const dreieck = STUETZ.map((x) => `${px(x).toFixed(1)},${py(fkt.f(x)).toFixed(1)}`).join(" ");

  const nurEiner = definiert && w.some((v) => v > 1 - 1e-9);
  const ticksX = niceTicks(X_LO, X_HI);
  const ticksY = niceTicks(0, yMax);

  const status: { titel: string; farbe: string; text: string } = !definiert
    ? {
        titel: "Summe null, keine Gewichte",
        farbe: ROT,
        text: "Alle drei Regler stehen auf null. Die Nebenbedingung w₁ + w₂ + w₃ = 1 lässt sich so nicht erfüllen, und wir müssten durch null teilen. Wir zeichnen deshalb keine Markierung. Jede andere Stellung ist zulässig, denn durch eine positive Summe dürfen wir immer teilen.",
      }
    : nurEiner
      ? {
          titel: "Gleichheit: das ganze Gewicht liegt auf einer Stützstelle",
          farbe: ORANGE,
          text: "Ein Gewicht ist 1, die beiden anderen sind 0. Dann steht auf beiden Seiten derselbe Wert, die Ungleichung ist mit Gleichheit erfüllt. Das ist der eine Gleichheitsfall, den wir hier einstellen können; der andere wäre eine affine Funktion, für die Jensen in beide Richtungen gilt, und keine der drei Auswahlmöglichkeiten ist affin.",
        }
      : fkt.konvex
        ? {
            titel: "Jensen: der grüne Punkt liegt über dem orangen",
            farbe: GRUEN,
            text: `Erst mischen, dann auswerten gibt ${fmt(links)}; erst auswerten, dann mischen gibt ${fmt(rechts)}. Die Lücke ${fmt(luecke)} ist der Abstand zwischen dem Sehnenzug und der Kurve. Der grüne Punkt liegt im Dreieck der drei Graphenpunkte, und dieses Dreieck gehört zum Epigraphen, weil f konvex ist.`,
          }
        : {
            titel: "Konkave Gegenprobe: die Ungleichung dreht sich um",
            farbe: ROT,
            text: `Für die konkave Wurzel liegt der Sehnenzug unter der Kurve: ${fmt(rechts)} ist kleiner als ${fmt(links)}. Das ist kein Widerspruch zum Satz, sondern seine Spiegelung: −√x ist konvex, für diese Funktion gilt die Jensen-Ungleichung, und Multiplikation mit −1 dreht das Zeichen um.`,
          };

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Wir mischen drei Stützstellen x₁ = 0,5, x₂ = 1,5 und x₃ = 3,5 mit einstellbaren
        Gewichten. Die Regler geben unnormierte Werte, das Widget teilt durch ihre Summe.
        Orange steht f an der gemischten Stelle, grün die Mischung der Funktionswerte. Bei
        konvexem f liegt orange nie über grün.
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {FUNKTIONEN.map((v, i) => (
          <button
            key={v.key}
            type="button"
            className={`rounded border px-3 py-1 ${
              i === fi
                ? "border-slate-500 bg-slate-100 font-medium dark:border-slate-400 dark:bg-slate-700"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => setFi(i)}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {VOREINSTELLUNGEN.map((v) => (
          <button
            key={v.name}
            type="button"
            className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            onClick={() => {
              setW1(v.w[0]);
              setW2(v.w[1]);
              setW3(v.w[2]);
            }}
          >
            {v.name}
          </button>
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <Slider
          key={i}
          label={`Gewicht ${NAMEN[i]} = ${fmt(STUETZ[i], 1)}`}
          value={roh[i]}
          onChange={(v) => [setW1, setW2, setW3][i](Math.round(v * 20) / 20)}
          min={0}
          max={1}
          step={0.05}
          fmt={(v) => fmt(v, 2)}
        />
      ))}
      <div className="flex flex-wrap gap-4">
        <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            f(x) ↑
          </div>
          <svg
            width={PAD_L + W + PAD_R}
            height={PAD_T + H + PAD_B}
            className="rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            {ticksY.map((t) => (
              <g key={`y${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + W}
                  y1={py(t)}
                  y2={py(t)}
                  stroke="#e2e8f0"
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
                  {fmt(t, Number.isInteger(t) ? 0 : 1)}
                </text>
              </g>
            ))}
            {ticksX.map((t) => (
              <g key={`x${t}`}>
                <line
                  y1={PAD_T}
                  y2={PAD_T + H}
                  x1={px(t)}
                  x2={px(t)}
                  stroke="#e2e8f0"
                  strokeWidth={0.6}
                />
                <text
                  x={px(t)}
                  y={PAD_T + H + 13}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize={10}
                >
                  {fmt(t, Number.isInteger(t) ? 0 : 1)}
                </text>
              </g>
            ))}
            {/* Dreieck der Graphenpunkte: alle Konvexkombinationen der drei Werte */}
            <polygon points={dreieck} fill={GRUEN} fillOpacity={0.12} stroke={GRUEN} strokeWidth={1} />
            {/* die Funktion selbst */}
            <polyline points={kurve} fill="none" stroke={BLAU} strokeWidth={2} />
            {STUETZ.map((x, i) => (
              <circle key={i} cx={px(x)} cy={py(fkt.f(x))} r={3.5} fill={BLAU} />
            ))}
            {definiert && (
              <g>
                <line
                  x1={px(xquer)}
                  x2={px(xquer)}
                  y1={py(Math.min(links, rechts))}
                  y2={py(Math.max(links, rechts))}
                  stroke={fkt.konvex ? GRUEN : ROT}
                  strokeWidth={2}
                  strokeDasharray="4 3"
                />
                <line
                  x1={px(xquer)}
                  x2={px(xquer)}
                  y1={py(0)}
                  y2={py(Math.min(links, rechts))}
                  stroke="#94a3b8"
                  strokeWidth={0.8}
                  strokeDasharray="2 3"
                />
                <circle cx={px(xquer)} cy={py(rechts)} r={5} fill={GRUEN} />
                <circle cx={px(xquer)} cy={py(links)} r={5} fill={ORANGE} />
                <text x={px(xquer) + 8} y={py(rechts) - 4} fill={GRUEN} fontSize={11}>
                  Σ wᵢ f(xᵢ) = {fmt(rechts)}
                </text>
                <text x={px(xquer) + 8} y={py(links) + 13} fill={ORANGE} fontSize={11}>
                  f(Σ wᵢ xᵢ) = {fmt(links)}
                </text>
              </g>
            )}
          </svg>
          <div className="mt-0.5 text-right text-[11px]" style={{ width: PAD_L + W }}>
            x →
          </div>
        </div>
        <div className="min-w-[15rem] grow space-y-2 text-sm">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3">normierte Gewichte</td>
                <td className="font-mono">
                  ({fmt(w[0])}; {fmt(w[1])}; {fmt(w[2])})
                </td>
              </tr>
              <tr>
                <td className="pr-3">gemischte Stelle Σ wᵢ xᵢ</td>
                <td className="font-mono">{fmt(xquer)}</td>
              </tr>
              <tr>
                <td className="pr-3" style={{ color: ORANGE }}>
                  f(Σ wᵢ xᵢ)
                </td>
                <td className="font-mono">{fmt(links)}</td>
              </tr>
              <tr>
                <td className="pr-3" style={{ color: GRUEN }}>
                  Σ wᵢ f(xᵢ)
                </td>
                <td className="font-mono">{fmt(rechts)}</td>
              </tr>
              <tr>
                <td className="pr-3">Differenz</td>
                <td className="font-mono">{fmt(luecke)}</td>
              </tr>
            </tbody>
          </table>
          <p className="max-w-prose">
            <span className="font-medium" style={{ color: status.farbe }}>
              {status.titel}.
            </span>{" "}
            {status.text}
          </p>
          {fkt.key === "quad" && definiert && (
            <p className="max-w-prose">
              Bei f(x) = x² hat die Differenz einen Namen: Sie ist genau die gewichtete Varianz
              der Stützstellen, hier {fmt(varianz)}. Deshalb ist die Varianz nie negativ.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
