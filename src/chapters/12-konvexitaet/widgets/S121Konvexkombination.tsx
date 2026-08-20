import { useState } from "react";
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
 * §12.1: Konvexkombinations-Explorer (Eigenbau).
 *
 * DIE EINE EINSICHT: Die Konvexkombinationen dreier Ecken füllen genau das
 * Dreieck, und die Gewichte sind dabei nicht abstrakt, sondern ablesbar — jedes
 * Gewicht ist der Flächenanteil des gegenüberliegenden Teildreiecks.
 *
 * Ersetzt konvexkombinationen-2.png (Folien 12-konvexitaet, Z. 113) und
 * bebildert das Dreiecksbeispiel Z. 136–155, zu dem die Folien keine Grafik
 * haben: die Ecken x1 = (0,0), x2 = (2,0), x3 = (1,2).
 *
 * BEDIENUNG: Das mathematische Objekt ist der Punkt, nicht der Regler — er
 * wird deshalb gezogen (Muster 2), die baryzentrischen Gewichte laufen mit.
 * Die drei Regler sind der Doppelpfad und geben unnormierte Werte; das Widget
 * teilt durch ihre Summe. Steht die Summe auf null, ist die Normierung nicht
 * definiert (eigener Verdikt-Zweig).
 *
 * FARBROLLEN (Kapitel 12): konvexe Menge blau, Konvexkombination und
 * Verbindungsstrecken grün, Extrempunkte (die drei Ecken) orange,
 * undefinierter Fall rot.
 *
 * PROVENIENZ: Eigenbau; Ziehen über `useDrag`, Farben/Zahlformat aus
 * `src/lib/widgets/util.ts`.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen: Dreiecksfläche 2; Schwerpunkt (1; 2/3)
 * mit w = (1/3; 1/3; 1/3); w = (1/2; 1/4; 1/4) gibt (0,75; 0,5);
 * w = (1/4; 1/4; 1/2) gibt (1; 1). Baryzentrische Gewichte und Flächenanteile
 * stimmen auf 5,6e−17 überein; über ein 401×401-Raster summieren sich die drei
 * Teilflächen für jeden Punkt im Dreieck auf die Gesamtfläche (Abweichung
 * ≤ 2,2e−16).
 */

const GRUEN = FMM_COLORS.gruen; // Konvexkombination, Verbindungsstrecken
const BLAU = FMM_COLORS.blau; // die konvexe Menge selbst
const ORANGE = FMM_COLORS.orange; // Extrempunkte (die drei Ecken)
const ROT = FMM_COLORS.rot; // nicht definierter Fall

type P2 = [number, number];

const ECKEN: P2[] = [
  [0, 0],
  [2, 0],
  [1, 2],
];
const NAMEN = ["x₁", "x₂", "x₃"];

const LO = -0.5;
const HI = 2.5;
const SIZE = 300;
const PAD_L = 34;
const PAD_B = 30;
const PAD_R = 12;
const VB_W = PAD_L + SIZE + PAD_R;
const VB_H = SIZE + PAD_B;

const px = (x: number) => PAD_L + ((x - LO) / (HI - LO)) * SIZE;
const py = (y: number) => SIZE - ((y - LO) / (HI - LO)) * SIZE;

/** Fläche eines Dreiecks über die Determinantenformel. */
function flaeche(p: P2, q: P2, r: P2): number {
  return Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (r[0] - p[0]) * (q[1] - p[1])) / 2;
}

/** Baryzentrische Gewichte eines Punktes; im Dreieck sind alle drei ≥ 0. */
function bary(x: P2): [number, number, number] {
  const [[x1, y1], [x2, y2], [x3, y3]] = ECKEN;
  const det = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
  const w2 = ((x[0] - x1) * (y3 - y1) - (x3 - x1) * (x[1] - y1)) / det;
  const w3 = ((x2 - x1) * (x[1] - y1) - (x[0] - x1) * (y2 - y1)) / det;
  return [1 - w2 - w3, w2, w3];
}

const VOREINSTELLUNGEN: { name: string; titel: string; w: [number, number, number] }[] = [
  { name: "Schwerpunkt", titel: "alle Gewichte 1/3", w: [1, 1, 1] },
  { name: "Ecke x₃", titel: "ein Gewicht trägt alles", w: [0, 0, 1] },
  { name: "Kante x₁x₂", titel: "ein Gewicht steht auf null", w: [0.5, 0.5, 0] },
  { name: "innerer Punkt", titel: "w = (1/2; 1/4; 1/4)", w: [0.5, 0.25, 0.25] },
  { name: "alle Regler null", titel: "Normierung nicht definiert", w: [0, 0, 0] },
];

export function KonvexkombinationsExplorer() {
  const [roh, setRoh] = useState<[number, number, number]>([1, 1, 1]);

  const summe = roh[0] + roh[1] + roh[2];
  const definiert = summe > 1e-12;
  const w: [number, number, number] = definiert
    ? [roh[0] / summe, roh[1] / summe, roh[2] / summe]
    : [NaN, NaN, NaN];

  const x: P2 = definiert
    ? [
        w[0] * ECKEN[0][0] + w[1] * ECKEN[1][0] + w[2] * ECKEN[2][0],
        w[0] * ECKEN[0][1] + w[1] * ECKEN[1][1] + w[2] * ECKEN[2][1],
      ]
    : [NaN, NaN];

  // Ziehen: der Punkt ist das Objekt, die Gewichte laufen mit. Negative
  // Gewichte werden auf null gesetzt und der Rest renormiert; damit bleibt der
  // Punkt beim Ziehen im Dreieck und degenerierte Zustände sind unerreichbar.
  const zieh = useDrag<"x">({
    feld: { x0: PAD_L, y0: 0, w: SIZE, h: SIZE },
    welt: { x0: LO, x1: HI, y0: LO, y1: HI },
    greifPosition: () => (definiert ? x : ECKEN[0]),
    onDrag: (p) => {
      const b = bary(p).map((v) => Math.max(0, v)) as [number, number, number];
      const s = b[0] + b[1] + b[2];
      setRoh(s > 1e-12 ? [b[0] / s, b[1] / s, b[2] / s] : [1, 1, 1]);
    },
  });

  // Zwischenpunkt y: Mischung von x2 und x3; danach liegt x auf der Strecke
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
  const istSchwerpunkt = definiert && w.every((v) => Math.abs(v - 1 / 3) < 5e-3);
  const eckIndex = definiert ? w.findIndex((v) => v > 1 - eps) : -1;
  const freieKante = definiert && nullen === 1 ? w.findIndex((v) => v < eps) : -1;

  const ticks = niceTicks(LO, HI);
  const tickStep = ticks.length > 1 ? ticks[1] - ticks[0] : undefined;
  const setzePreset = (v: [number, number, number]) => setRoh([v[0], v[1], v[2]]);
  const istAktiv = (v: [number, number, number]) =>
    roh.every((r, i) => Math.abs(r - v[i]) < 1e-9);

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir den grünen Punkt durch das Dreieck und lesen wir ab, wie sich die drei
        Gewichte dabei verhalten.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 grow basis-[300px]">
          <svg
            width={VB_W}
            height={VB_H}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="max-w-full h-auto rounded"
            role="img"
            aria-label={
              definiert
                ? `Dreieck mit den Ecken x1, x2, x3 und der Konvexkombination bei (${fmtDe(x[0])}; ${fmtDe(x[1])}).`
                : "Dreieck mit den Ecken x1, x2, x3; die Gewichtssumme ist null, es wird kein Punkt gezeichnet."
            }
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
            {ticks.map((t) => (
              <g key={`t${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + SIZE}
                  y1={py(t)}
                  y2={py(t)}
                  stroke="var(--w-grid, #e2e8f0)"
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
                  stroke="var(--w-grid, #e2e8f0)"
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
            <polygon
              points={ECKEN.map((p) => `${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`).join(" ")}
              fill={BLAU}
              fillOpacity={0.12}
              stroke={BLAU}
              strokeWidth={1.8}
            />
            {definiert && (
              <>
                <polygon
                  points={`${px(x[0]).toFixed(1)},${py(x[1]).toFixed(1)} ${px(ECKEN[1][0])},${py(ECKEN[1][1])} ${px(ECKEN[2][0])},${py(ECKEN[2][1])}`}
                  fill={GRUEN}
                  fillOpacity={0.14}
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
                    <circle
                      cx={px(yPunkt[0])}
                      cy={py(yPunkt[1])}
                      r={3}
                      fill={GRUEN}
                      opacity={0.75}
                    />
                    <text
                      x={px(yPunkt[0]) + 7}
                      y={py(yPunkt[1]) - 5}
                      fill={GRUEN}
                      fontSize={11}
                      stroke="var(--w-bg, #ffffff)"
                      strokeWidth={2.5}
                      paintOrder="stroke"
                    >
                      y
                    </text>
                  </>
                )}
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
                  stroke="var(--w-bg, #ffffff)"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                >
                  {NAMEN[i]}
                </text>
              </g>
            ))}
            {definiert && (
              <DragHandle
                x={px(x[0])}
                y={py(x[1])}
                r={5}
                farbe={GRUEN}
                strichbreite={2.4}
                aktiv={zieh.dragging === "x"}
                label="x"
                {...zieh.handleProps("x")}
              />
            )}
          </svg>
        </div>
        <div className="min-w-[15rem] grow basis-[15rem] space-y-2 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            {VOREINSTELLUNGEN.map((v) => (
              <button
                key={v.name}
                type="button"
                title={v.titel}
                aria-pressed={istAktiv(v.w)}
                className={istAktiv(v.w) ? W_BUTTON_AKTIV : W_BUTTON}
                onClick={() => setzePreset(v.w)}
              >
                {v.name}
              </button>
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <Slider
              key={i}
              label={`Regler ${NAMEN[i]}`}
              value={roh[i]}
              onChange={(v) =>
                setRoh((r) => {
                  const n: [number, number, number] = [r[0], r[1], r[2]];
                  n[i] = clamp(v, 0, 1);
                  return n;
                })
              }
              min={0}
              max={1}
              step={0.01}
              accent={GRUEN}
              fmt={(v) => fmtDe(v, 2)}
            />
          ))}
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3">Reglersumme</td>
                <td className="font-mono text-xs">{fmtDe(summe)}</td>
              </tr>
              <tr>
                <td className="pr-3">normierte Gewichte</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  ({fmtDe(w[0])}; {fmtDe(w[1])}; {fmtDe(w[2])})
                </td>
              </tr>
              <tr>
                <td className="pr-3">Kombination x</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  ({fmtDe(x[0])}; {fmtDe(x[1])})
                </td>
              </tr>
              <tr>
                <td className="pr-3">Flächenanteile</td>
                <td className="font-mono text-xs">
                  {fmtDe(anteile[0])}; {fmtDe(anteile[1])}; {fmtDe(anteile[2])}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {lage === "undefiniert" ? (
        <Verdikt kind="fail" titel="Summe null, Normierung nicht definiert.">
          Alle drei Regler stehen auf null. Wir müssten durch die Summe 0 teilen, und das ergibt
          keine Zahl, auch keine unendlich große. Die Bedingung w₁ + w₂ + w₃ = 1 aus
          Definition 12.1.1 lässt sich hier nicht erfüllen, also zeichnen wir keinen Punkt. Jede
          andere Reglerstellung ist zulässig, denn durch eine positive Summe dürfen wir immer
          teilen.
        </Verdikt>
      ) : lage === "ecke" ? (
        <Verdikt kind="warn" titel={`Ecke ${NAMEN[eckIndex]}, ein Extrempunkt.`}>
          Ein Gewicht trägt alles, die beiden anderen sind null. So und nur so erreichen wir die
          Ecke {NAMEN[eckIndex]}: Sobald ein zweites Gewicht positiv wird, wandert der Punkt von
          der Ecke weg. Das ist die Extrempunkt-Eigenschaft aus Definition 12.1.7. Der
          Flächenanteil der Ecke ist 1, die beiden anderen Teildreiecke sind entartet.
        </Verdikt>
      ) : lage === "kante" ? (
        <Verdikt kind="ok" titel={`Auf der Kante gegenüber von ${NAMEN[freieKante]}.`}>
          Ein Gewicht steht auf null, die Kombination läuft also nur noch über zwei Ecken. Die
          Menge aller solchen Punkte ist nach Satz 12.1.4 genau das Liniensegment zwischen ihnen,
          und wir sehen den Rand der konvexen Hülle. Der Punkt bleibt eine Konvexkombination
          aller drei Ecken, nur mit einem Gewicht 0.
        </Verdikt>
      ) : (
        <Verdikt
          kind="ok"
          titel={istSchwerpunkt ? "Nahe am Schwerpunkt (1; 2/3)." : "Im Inneren des Dreiecks."}
        >
          Alle drei Gewichte sind positiv, der Punkt liegt im Inneren (Bemerkung 12.1.11). Die
          gestrichelte Hilfsstrecke zeigt, wie er entsteht: erst x₂ und x₃ zu y mischen, dann x₁
          mit y. Jedes Gewicht wᵢ ist zugleich der Flächenanteil des Teildreiecks, in dem die
          Ecke xᵢ fehlt; hier {fmtDe(w[0])} gegen {fmtDe(anteile[0])} für x₁.
          {istSchwerpunkt
            ? " Bei gleichen Gewichten sind alle drei Teilflächen gleich groß, jede also ein Drittel der Gesamtfläche 2."
            : ""}
        </Verdikt>
      )}
    </div>
  );
}
