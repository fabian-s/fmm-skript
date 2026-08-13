import { useState } from "react";
import { Slider, niceTicks } from "../../../lib";

/**
 * §12.1: Konvexkombinations-Explorer (Eigenbau).
 *
 * Ersetzt die beiden Folienbilder konvexkombinationen-2.png (Liniensegment)
 * und convex-hull.png (Dreieck als konvexe Hülle) der Folien 12-konvexitaet.
 * Gezeigt wird das Folienbeispiel Z. 136-155: die Ecken
 * x1 = (0,0), x2 = (2,0), x3 = (1,2) und alle Konvexkombinationen
 * x = w1 x1 + w2 x2 + w3 x3.
 *
 * Die drei Regler geben unnormierte Gewichte; das Widget teilt durch ihre
 * Summe und erfüllt so die Nebenbedingung sum w_i = 1. Steht die Summe auf
 * null, ist die Normierung nicht definiert (kein Punkt, eigener Statustext).
 *
 * Hilfskonstruktion: y ist die Mischung von x2 und x3, und x liegt auf der
 * Strecke von x1 nach y. Damit ist das Dreieck sichtbar die Vereinigung
 * aller solchen Strecken.
 *
 * Farbcode Kapitel 12: konvexe Menge blau, Konvexkombination und
 * Verbindungsstrecken grün, Extrempunkte orange, Verletzungen/undefinierte
 * Fälle rot.
 *
 * Per node nachgerechnet (check-math-s121.mjs): Schwerpunkt (1; 2/3);
 * w = (1/2, 1/4, 1/4) gibt (0,75; 0,5); w = (1/2, 1/2, 0) gibt (1; 0);
 * w = (1/4, 1/4, 1/2) gibt (1; 1); Dreiecksfläche 2, und die Gewichte sind
 * die Flächenanteile der drei Teildreiecke (Probe mit w = (0,2; 0,3; 0,5)).
 */

const GRUEN = "#009E73"; // Konvexkombination, Verbindungsstrecken
const BLAU = "#0072B2"; // die konvexe Menge selbst
const ORANGE = "#E69F00"; // Extrempunkte (die drei Ecken)
const ROT = "#D55E00"; // nicht definierter Fall

type P2 = [number, number];

const ECKEN: P2[] = [
  [0, 0],
  [2, 0],
  [1, 2],
];
const NAMEN = ["x₁", "x₂", "x₃"];

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const LO = -0.5;
const HI = 2.5;
const SIZE = 320;
const PAD_L = 34;
const PAD_B = 18;
const PAD_R = 12;

const px = (x: number) => PAD_L + ((x - LO) / (HI - LO)) * SIZE;
const py = (y: number) => SIZE - ((y - LO) / (HI - LO)) * SIZE;

/** Fläche eines Dreiecks über die Determinantenformel. */
function flaeche(p: P2, q: P2, r: P2): number {
  return Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (r[0] - p[0]) * (q[1] - p[1])) / 2;
}

const VOREINSTELLUNGEN: { name: string; w: [number, number, number] }[] = [
  { name: "Schwerpunkt", w: [0.5, 0.5, 0.5] },
  { name: "Ecke x₃", w: [0, 0, 1] },
  { name: "Mitte von x₁ und x₂", w: [0.5, 0.5, 0] },
  { name: "innerer Punkt (0,75; 0,5)", w: [0.5, 0.25, 0.25] },
  { name: "alle Regler auf null", w: [0, 0, 0] },
];

export function KonvexkombinationsExplorer() {
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(0.5);
  const [w3, setW3] = useState(0.5);

  const roh: [number, number, number] = [w1, w2, w3];
  const summe = w1 + w2 + w3;
  const definiert = summe > 1e-12;
  const w: [number, number, number] = definiert
    ? [w1 / summe, w2 / summe, w3 / summe]
    : [NaN, NaN, NaN];

  const x: P2 = definiert
    ? [
        w[0] * ECKEN[0][0] + w[1] * ECKEN[1][0] + w[2] * ECKEN[2][0],
        w[0] * ECKEN[0][1] + w[1] * ECKEN[1][1] + w[2] * ECKEN[2][1],
      ]
    : [NaN, NaN];

  // Zwischenpunkt y: Mischung von x2 und x3, danach liegt x auf der Strecke
  // von x1 nach y. Bei w2 = w3 = 0 gibt es kein y, dann ist x die Ecke x1.
  const rest = definiert ? w[1] + w[2] : 0;
  const yPunkt: P2 | null =
    definiert && rest > 1e-12
      ? [
          (w[1] * ECKEN[1][0] + w[2] * ECKEN[2][0]) / rest,
          (w[1] * ECKEN[1][1] + w[2] * ECKEN[2][1]) / rest,
        ]
      : null;

  const gesamt = flaeche(ECKEN[0], ECKEN[1], ECKEN[2]);
  const anteile: number[] = definiert
    ? [
        flaeche(x, ECKEN[1], ECKEN[2]) / gesamt,
        flaeche(ECKEN[0], x, ECKEN[2]) / gesamt,
        flaeche(ECKEN[0], ECKEN[1], x) / gesamt,
      ]
    : [NaN, NaN, NaN];

  const eps = 1e-9;
  const nullen = definiert ? w.filter((v) => v < eps).length : -1;
  const lage = !definiert ? "undefiniert" : nullen >= 2 ? "ecke" : nullen === 1 ? "kante" : "innen";
  const istSchwerpunkt =
    definiert && w.every((v) => Math.abs(v - 1 / 3) < 1e-9);

  const eckIndex = definiert ? w.findIndex((v) => v > 1 - eps) : -1;
  const freieKante = definiert && nullen === 1 ? w.findIndex((v) => v < eps) : -1;

  const status: { titel: string; farbe: string; text: string } =
    lage === "undefiniert"
      ? {
          titel: "Summe null, Normierung nicht definiert",
          farbe: ROT,
          text: "Alle drei Regler stehen auf null. Wir müssten durch die Summe 0 teilen, und das ergibt keine Zahl, auch keine unendlich große. Die Bedingung w₁ + w₂ + w₃ = 1 lässt sich hier nicht erfüllen, also zeichnen wir keinen Punkt. Jede andere Reglerstellung ist zulässig, denn durch eine positive Summe dürfen wir immer teilen.",
        }
      : lage === "ecke"
        ? {
            titel: `Ecke ${NAMEN[eckIndex]}, ein Extrempunkt`,
            farbe: ORANGE,
            text: `Ein Gewicht trägt alles, die beiden anderen sind null. So und nur so erreichen wir die Ecke ${NAMEN[eckIndex]}: Sobald ein zweites Gewicht positiv wird, wandert der Punkt von der Ecke weg. Das ist die Extrempunkt-Eigenschaft aus Definition 12.1.7.`,
          }
        : lage === "kante"
          ? {
              titel: `auf der Kante gegenüber von ${NAMEN[freieKante]}`,
              farbe: GRUEN,
              text: `Ein Gewicht steht auf null, die Kombination läuft also nur noch über zwei Ecken. Die Menge aller solchen Punkte ist genau das Liniensegment zwischen ihnen, und wir sehen den Rand der konvexen Hülle. Der Punkt bleibt eine Konvexkombination aller drei Ecken, nur mit einem Gewicht 0.`,
            }
          : {
              titel: istSchwerpunkt ? "Schwerpunkt (1; 2/3)" : "im Inneren des Dreiecks",
              farbe: GRUEN,
              text: istSchwerpunkt
                ? "Alle drei Gewichte sind gleich 1/3, und heraus kommt der Schwerpunkt (1; 2/3) aus dem Folienbeispiel. Er liegt im Inneren, denn kein Gewicht ist null."
                : "Alle drei Gewichte sind positiv, der Punkt liegt im Inneren des Dreiecks. Die grüne Hilfsstrecke zeigt, wie er entsteht: Erst mischen wir x₂ und x₃ zu y, dann mischen wir x₁ mit y.",
            };

  const ticks = niceTicks(LO, HI);

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Wir stellen drei Gewichte ein und sehen die zugehörige Konvexkombination der drei
        Ecken. Die Regler geben unnormierte Werte; das Widget teilt sie durch ihre Summe,
        damit w₁ + w₂ + w₃ = 1 gilt. Orange sind die Ecken x₁ = (0; 0), x₂ = (2; 0) und
        x₃ = (1; 2), blau ihre konvexe Hülle, grün der kombinierte Punkt.
      </p>
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
          label={`Regler ${i + 1} (Ecke ${NAMEN[i]})`}
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
            2. Koordinate ↑
          </div>
          <svg
            width={PAD_L + SIZE + PAD_R}
            height={SIZE + PAD_B}
            className="rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            {ticks.map((t) => (
              <g key={`t${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + SIZE}
                  y1={py(t)}
                  y2={py(t)}
                  stroke="#e2e8f0"
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
                  {fmt(t, 1)}
                </text>
                <line
                  y1={0}
                  y2={SIZE}
                  x1={px(t)}
                  x2={px(t)}
                  stroke="#e2e8f0"
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text x={px(t)} y={SIZE + 13} textAnchor="middle" fill="#64748b" fontSize={10}>
                  {fmt(t, 1)}
                </text>
              </g>
            ))}
            <polygon
              points={ECKEN.map((p) => `${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`).join(" ")}
              fill={BLAU}
              fillOpacity={0.12}
              stroke={BLAU}
              strokeWidth={1.8}
            />
            {yPunkt && (
              <>
                <line
                  x1={px(ECKEN[0][0])}
                  y1={py(ECKEN[0][1])}
                  x2={px(yPunkt[0])}
                  y2={py(yPunkt[1])}
                  stroke={GRUEN}
                  strokeWidth={1.6}
                  strokeDasharray="5 4"
                />
                <circle cx={px(yPunkt[0])} cy={py(yPunkt[1])} r={3} fill={GRUEN} opacity={0.75} />
                <text
                  x={px(yPunkt[0]) + 7}
                  y={py(yPunkt[1]) - 5}
                  fill={GRUEN}
                  fontSize={11}
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                >
                  y
                </text>
              </>
            )}
            {ECKEN.map((p, i) => (
              <g key={NAMEN[i]}>
                <circle cx={px(p[0])} cy={py(p[1])} r={5} fill={ORANGE} />
                <text
                  x={px(p[0]) + (i === 1 ? 9 : i === 0 ? -14 : 0)}
                  y={py(p[1]) + (i === 2 ? -10 : 16)}
                  textAnchor="middle"
                  fill={ORANGE}
                  fontSize={12}
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                >
                  {NAMEN[i]}
                </text>
              </g>
            ))}
            {definiert && (
              <g>
                <circle
                  cx={px(x[0])}
                  cy={py(x[1])}
                  r={7}
                  fill="none"
                  stroke={GRUEN}
                  strokeWidth={2.2}
                />
                <circle cx={px(x[0])} cy={py(x[1])} r={3} fill={GRUEN} />
              </g>
            )}
          </svg>
          <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
            1. Koordinate →
          </div>
        </div>
        <div className="max-w-prose grow space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
          <p>
            Reglersumme <span className="font-mono">{fmt(summe)}</span>, daraus die normierten
            Gewichte{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              w = ({fmt(w[0])}; {fmt(w[1])}; {fmt(w[2])})
            </span>{" "}
            mit Summe <span className="font-mono">{definiert ? fmt(w[0] + w[1] + w[2]) : "–"}</span>
          </p>
          <p>
            Kombination{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              x = ({fmt(x[0])}; {fmt(x[1])})
            </span>
            {yPunkt && (
              <>
                , Zwischenpunkt{" "}
                <span className="font-mono" style={{ color: GRUEN }}>
                  y = ({fmt(yPunkt[0])}; {fmt(yPunkt[1])})
                </span>
              </>
            )}
          </p>
          <p>
            <span className="font-semibold" style={{ color: status.farbe }}>
              {status.titel}.
            </span>{" "}
            {status.text}
          </p>
          {definiert && (
            <p>
              Flächenprobe: Der Punkt zerlegt das Dreieck (Fläche {fmt(gesamt, 0)}) in drei
              Teildreiecke mit den Anteilen{" "}
              <span className="font-mono">
                {fmt(anteile[0])}; {fmt(anteile[1])}; {fmt(anteile[2])}
              </span>
              . Das Teildreieck, in dem die Ecke xᵢ fehlt, hat gerade den Anteil wᵢ.
            </p>
          )}
        </div>
      </div>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-300">
        Drei Dinge lassen sich hier ablesen. Erstens verlässt der grüne Punkt das Dreieck nie:
        Die Regler lassen keine negativen Gewichte zu, und genau diese Nichtnegativität hält den
        Punkt drinnen. Zweitens entsteht jede Kante, sobald
        ein Gewicht null wird: Übrig bleibt die Konvexkombination zweier Ecken, also ihr
        Liniensegment. Drittens erklärt die gestrichelte Hilfsstrecke, warum das Dreieck
        vollständig überstrichen wird. Wir mischen erst x₂ und x₃ zu y, dann x₁ mit y, und
        während y die gegenüberliegende Kante durchläuft, fegt die Strecke von x₁ nach y das
        ganze Dreieck aus.
      </p>
    </div>
  );
}
