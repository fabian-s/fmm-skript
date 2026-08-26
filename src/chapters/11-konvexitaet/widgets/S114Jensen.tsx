import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
} from "../../../lib";
import { num, ref } from "../../numbers.generated";

/**
 * §11.4: Jensen-Ungleichung zum Schieben (Eigenbau, kein Portat).
 *
 * DIE EINE EINSICHT: Erst mischen und dann auswerten gibt bei konvexem f nie
 * mehr als erst auswerten und dann mischen — und für f(x) = x² ist die Lücke
 * genau die gewichtete Varianz der Stützstellen (Satz 11.4.6, Beispiel 11.4.8).
 *
 * Drei feste Stützstellen x1 = 0,5, x2 = 1,5, x3 = 3,5 bekommen je einen
 * Gewichtsregler. Das Widget normiert die Regler auf Summe 1 und zeichnet die
 * beiden Seiten von (11.4.1) als zwei Markierungen über derselben Stelle
 * x̄ = Σ w_i x_i:
 *
 *   orange: f(x̄)            (Funktionswert der Mischung, auf der Kurve)
 *   grün:   Σ w_i f(x_i)    (Mischung der Funktionswerte, im Dreieck)
 *
 * FARBROLLEN (Kapitel 11): konvexe Funktion und ihr Epigraph blau,
 * Konvexkombinationen grün (Sehnenzug, gemischter Wert), ausgezeichneter Punkt
 * f(x̄) orange, umgekehrte Ungleichung rot (konkave Gegenprobe √x).
 *
 * Kein Zufall im Render, alle Zustände sind aus den drei Reglern bestimmt.
 *
 * PROVENIENZ: Eigenbau; Farben, Zahlformat und Achsen aus
 * `src/lib/widgets/util.ts`.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen: gleiche Gewichte geben x̄ = 11/6 =
 * 1,8333; x²: 3,3611 gegen 4,9167 (Lücke 1,5556 = gewichtete Varianz);
 * eˣ: 6,2547 gegen 13,0820 (Lücke 6,8273); √x: 1,3540 gegen 1,2676, also
 * umgekehrtes Vorzeichen (Lücke −0,0864). Für w = (0,2; 0,3; 0,5): x̄ = 2,3,
 * x²: 5,29 gegen 6,85 (Lücke 1,56 = Varianz). Über alle 9260 Reglerstellungen
 * des 0,05-Rasters stimmt bei x² die Lücke bis auf 4,6e−15 mit der gewichteten
 * Varianz überein; die Lücke bleibt bei x² und eˣ stets ≥ 0 (höchstens 2,25
 * bzw. 10,5675) und bei √x stets ≤ 0 (mindestens −0,1310). Fairer Würfel
 * (Beispiel 11.1.3): E[X] = 3,5, E[X²] = 15,1667, Varianz 35/12 = 2,9167.
 */

const BLAU = FMM_COLORS.blau; // die konvexe Funktion und ihr Epigraph
const GRUEN = FMM_COLORS.gruen; // Konvexkombinationen (Sehnenzug, gemischter Wert)
const ORANGE = FMM_COLORS.orange; // ausgezeichneter Punkt: f der Mischung
const ROT = FMM_COLORS.rot; // verletzte Ungleichung (konkave Gegenprobe)

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
const W = 320;
const H = 220;
const PAD_L = 40;
const PAD_B = 32;
const PAD_T = 10;
const PAD_R = 12;
const VB_W = PAD_L + W + PAD_R;
const VB_H = PAD_T + H + PAD_B;

const VOREINSTELLUNGEN: { name: string; titel: string; w: [number, number, number] }[] = [
  { name: "gleiche Gewichte", titel: "je 1/3", w: [1, 1, 1] },
  { name: "w = (0,2; 0,3; 0,5)", titel: "ungleiche Gewichte", w: [0.2, 0.3, 0.5] },
  { name: "nur x₂", titel: "Gleichheitsfall", w: [0, 1, 0] },
  { name: "x₁ und x₃ je zur Hälfte", titel: "größte Lücke", w: [1, 0, 1] },
  { name: "alle Regler null", titel: "Normierung nicht definiert", w: [0, 0, 0] },
];

export function JensenExplorer() {
  const [fi, setFi] = useState(0);
  const [roh, setRoh] = useState<[number, number, number]>([1, 1, 1]);

  const fkt = FUNKTIONEN[fi];
  const summe = roh[0] + roh[1] + roh[2];
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
  const istAktiv = (v: [number, number, number]) => roh.every((r, i) => Math.abs(r - v[i]) < 1e-9);

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir das Gewicht auf eine einzige Stützstelle und beobachten wir, was mit dem
        Abstand der beiden Markierungen geschieht.
      </Aufgabe>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {FUNKTIONEN.map((v, i) => (
          <button
            key={v.key}
            type="button"
            aria-pressed={i === fi}
            className={i === fi ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setFi(i)}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 grow basis-[320px]">
          <svg
            width={VB_W}
            height={VB_H}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="max-w-full h-auto rounded"
            role="img"
            aria-label={
              definiert
                ? `Der Graph von ${fkt.label} mit dem Sehnendreieck der drei Stützstellen; beide Seiten der Jensen-Ungleichung stehen über x = ${fmtDe(xquer)}.`
                : `Der Graph von ${fkt.label}; die Gewichtssumme ist null, es wird keine Markierung gezeichnet.`
            }
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
            {ticksY.map((t) => (
              <g key={`y${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + W}
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
                  {fmtTick(t)}
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
                  stroke="var(--w-grid, #e2e8f0)"
                  strokeWidth={0.6}
                />
                <text
                  x={px(t)}
                  y={PAD_T + H + 13}
                  textAnchor="middle"
                  fill="var(--w-muted, #64748b)"
                  fontSize={10}
                >
                  {fmtTick(t, 1)}
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
                  stroke="var(--w-muted, #94a3b8)"
                  strokeWidth={0.8}
                  strokeDasharray="2 3"
                />
                <circle cx={px(xquer)} cy={py(rechts)} r={5} fill={GRUEN} />
                <circle cx={px(xquer)} cy={py(links)} r={5} fill={ORANGE} />
                <text
                  x={px(xquer) + 8}
                  y={py(rechts) - 4}
                  fill={GRUEN}
                  fontSize={11}
                  stroke="var(--w-bg, #ffffff)"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                >
                  Σ wᵢ f(xᵢ) = {fmtDe(rechts)}
                </text>
                <text
                  x={px(xquer) + 8}
                  y={py(links) + 13}
                  fill={ORANGE}
                  fontSize={11}
                  stroke="var(--w-bg, #ffffff)"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                >
                  f(Σ wᵢ xᵢ) = {fmtDe(links)}
                </text>
              </g>
            )}
            <text x={PAD_L} y={9} fill="var(--w-muted, #64748b)" fontSize={10}>
              f(x) ↑
            </text>
            <text
              x={PAD_L + W / 2}
              y={PAD_T + H + 27}
              textAnchor="middle"
              fill="var(--w-muted, #64748b)"
              fontSize={10}
            >
              x →
            </text>
          </svg>
        </div>
        <div className="min-w-[15rem] grow basis-[15rem] space-y-1 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            {VOREINSTELLUNGEN.map((v) => (
              <button
                key={v.name}
                type="button"
                title={v.titel}
                aria-pressed={istAktiv(v.w)}
                className={istAktiv(v.w) ? W_BUTTON_AKTIV : W_BUTTON}
                onClick={() => setRoh([v.w[0], v.w[1], v.w[2]])}
              >
                {v.name}
              </button>
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <Slider
              key={i}
              label={`Gewicht ${NAMEN[i]} = ${fmtDe(STUETZ[i], 1)}`}
              value={roh[i]}
              onChange={(v) =>
                setRoh((r) => {
                  const n: [number, number, number] = [r[0], r[1], r[2]];
                  n[i] = clamp(Math.round(v * 20) / 20, 0, 1);
                  return n;
                })
              }
              min={0}
              max={1}
              step={0.05}
              accent={GRUEN}
            />
          ))}
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3">normierte Gewichte</td>
                <td className="font-mono text-xs">
                  ({fmtDe(w[0])}; {fmtDe(w[1])}; {fmtDe(w[2])})
                </td>
              </tr>
              <tr>
                <td className="pr-3">gemischte Stelle Σ wᵢ xᵢ</td>
                <td className="font-mono text-xs">{fmtDe(xquer)}</td>
              </tr>
              <tr>
                <td className="pr-3" style={{ color: ORANGE }}>
                  f(Σ wᵢ xᵢ)
                </td>
                <td className="font-mono text-xs">{fmtDe(links)}</td>
              </tr>
              <tr>
                <td className="pr-3" style={{ color: GRUEN }}>
                  Σ wᵢ f(xᵢ)
                </td>
                <td className="font-mono text-xs">{fmtDe(rechts)}</td>
              </tr>
              <tr>
                <td className="pr-3">Differenz</td>
                <td className="font-mono text-xs">{fmtDe(luecke)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {!definiert ? (
        <Verdikt kind="fail" titel="Summe null, keine Gewichte.">
          Alle drei Regler stehen auf null. Die Nebenbedingung w₁ + w₂ + w₃ = 1 aus
          {ref("satz:jensen-ungleichung")} lässt sich so nicht erfüllen, und wir müssten durch null teilen. Wir
          zeichnen deshalb keine Markierung. Jede andere Stellung ist zulässig, denn durch eine
          positive Summe dürfen wir immer teilen.
        </Verdikt>
      ) : nurEiner ? (
        <Verdikt kind="warn" titel="Gleichheit: das ganze Gewicht liegt auf einer Stützstelle.">
          Ein Gewicht ist 1, die beiden anderen sind 0. Dann steht auf beiden Seiten von
          ({num("eq:jensen-ungleichung")}) derselbe Wert {fmtDe(links)}, die Ungleichung ist mit Gleichheit erfüllt. Das
          ist der eine Gleichheitsfall, den wir hier einstellen können; der andere wäre eine
          affine Funktion, für die Jensen in beide Richtungen gilt, und keine der drei
          Auswahlmöglichkeiten ist affin.
        </Verdikt>
      ) : fkt.konvex ? (
        <Verdikt kind="ok" titel="Jensen: der grüne Punkt liegt über dem orangen.">
          Erst mischen, dann auswerten gibt {fmtDe(links)}; erst auswerten, dann mischen gibt{" "}
          {fmtDe(rechts)}. Die Lücke {fmtDe(luecke)} ist der Abstand zwischen dem Sehnenzug und
          der Kurve, genau wie ({num("eq:jensen-ungleichung")}) es verlangt. Der grüne Punkt liegt im Dreieck der drei
          Graphenpunkte, und dieses Dreieck gehört zum Epigraphen, weil f konvex ist.
          {fkt.key === "quad" && (
            <>
              {" "}
              Bei f(x) = x² hat die Lücke einen Namen: Sie ist die gewichtete Varianz der
              Stützstellen, hier {fmtDe(varianz)}, dieselbe Rechnung wie beim fairen Würfel aus
              {ref("beispiel:der-erwartungswert-ist-eine")}, wo E[X²] − E[X]² = 35/12 = {fmtDe(35 / 12)} herauskommt
              ({ref("beispiel:die-varianz-ist-nicht-negativ")}). Deshalb ist die Varianz nie negativ.
            </>
          )}
        </Verdikt>
      ) : (
        <Verdikt kind="fail" titel="Konkave Gegenprobe: die Ungleichung dreht sich um.">
          Für die konkave Wurzel liegt der Sehnenzug unter der Kurve: {fmtDe(rechts)} ist kleiner
          als {fmtDe(links)}, die Lücke also {fmtDe(luecke)}. Das ist kein Widerspruch zu
          {ref("satz:jensen-ungleichung")}, sondern seine Spiegelung ({ref("bemerkung:wie-wir-die-ungleichung-lesen")}): −√x ist konvex, für diese
          Funktion gilt ({num("eq:jensen-ungleichung")}), und Multiplikation mit −1 dreht das Zeichen um.
        </Verdikt>
      )}
    </div>
  );
}
