import { useState } from "react";
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
  useDrag,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §3.5.1: Wie scharf sind die Äquivalenzkonstanten aus Beispiel 3.5.2?
 *
 * DIE EINE EINSICHT: Die Kette ‖A‖₂ ≤ ‖A‖_F ≤ √min(m,n)·‖A‖₂ lässt sich nicht
 * verbessern. Beide Enden werden angenommen, und zwar an geometrisch
 * ablesbaren Stellen: links bei Rang 1 (σ₂ = 0), rechts bei σ₁ = σ₂, also bei
 * Vielfachen der Einheitsmatrix. Alles dazwischen liegt echt dazwischen.
 *
 * FARBROLLEN (Kapitel-3-Tabelle): rot = σ₁ und die aus ihm gebaute
 * Spektralnorm ‖A‖₂, blau = die Frobenius-Norm (wie in §3.2) und σ₂, grau =
 * Achsen, zulässiger Bereich und die beiden Schranken. Orange und Violett
 * bleiben hier unbelegt.
 *
 * INTERAKTION: Der Punkt (σ₁, σ₂) wird im Bild gezogen (Doppelpfad: die beiden
 * Regler auf derselben Zustandsquelle). Weil alle drei Normen nur von den
 * Singulärwerten abhängen, genügt A = diag(σ₁, σ₂); jede andere 2×2-Matrix
 * mit denselben Singulärwerten liefert dieselben drei Zahlen (Satz 3.4.7).
 *
 * PROVENIENZ: Neubau 2026-08-19 (die „Fehlende Widgets"-Liste des
 * Kapitel-Surveys, Punkt 1).
 *
 * PRÜFSTATUS (scripts/verify/REV29/03-matrix-spur-norm-normen.mjs,
 * 2026-08-29): Für A = diag(σ₁, σ₂) ist ‖A‖₂ = σ₁,
 * ‖A‖_F = √(σ₁²+σ₂²) und ‖A‖_* = σ₁+σ₂. Der Quotient ‖A‖_F/‖A‖₂ läuft von 1
 * (σ₂ = 0, Rang 1) bis √2 = 1,414214 (σ₁ = σ₂); die Voreinstellung
 * σ = (1,6; 0,8) liefert ‖A‖_F = 1,788854 und den Quotienten 1,118034.
 * Beispiel 3.5.2 mit m = n = 2 verlangt √min(m,n) = √2; die Schranke wird
 * also mit Gleichheit angenommen und ist nicht verbesserbar. Für die
 * Vergleichsmatrix B = diag(1,2; 0) aus Bemerkung 3.5.3 ist
 * ‖B‖₂ = ‖B‖_F = 1,2.
 */

const ROT = FMM_COLORS.rot; // sigma_1 und Spektralnorm
const BLAU = FMM_COLORS.blau; // sigma_2 und Frobenius-Norm
const GRAU = FMM_COLORS.grau; // Achsen, zulässiger Bereich, Schranken

const WURZEL2 = Math.SQRT2;
const B_NORM = 1.2; // ‖B‖₂ = ‖B‖_F für B = diag(1,2; 0) aus Bemerkung 3.5.3

const SIZE = 300;
const PAD_L = 34;
const PAD_B = 30;
const PAD_T = 14;
const PAD_R = 14;
const WELT = 2.6;
const FELD_W = SIZE - PAD_L - PAD_R;
const FELD_H = SIZE - PAD_T - PAD_B;
const px = (s: number) => PAD_L + (s / WELT) * FELD_W;
const py = (s: number) => SIZE - PAD_B - (s / WELT) * FELD_H;

const VOREINSTELLUNGEN: { name: string; titel: string; s: [number, number] }[] = [
  { name: "Rang 1", titel: "σ₂ = 0: die linke Schranke wird angenommen", s: [1.2, 0] },
  { name: "Vielfaches von I₂", titel: "σ₁ = σ₂: die rechte Schranke wird angenommen", s: [1.2, 1.2] },
  { name: "dazwischen", titel: "beide Ungleichungen sind echt", s: [1.6, 0.8] },
];

export function S35AequivalenzWidget() {
  const [s1, setS1] = useState(1.6);
  const [s2, setS2] = useState(0.8);

  const spektral = s1;
  const frob = Math.hypot(s1, s2);
  const nuklear = s1 + s2;
  const quotient = spektral > 1e-9 ? frob / spektral : 1;

  const setzeS1 = (v: number) => {
    const neu = clamp(v, 0.2, WELT);
    setS1(neu);
    if (s2 > neu) setS2(neu);
  };
  const setzeS2 = (v: number) => setS2(clamp(v, 0, s1));

  const zieh = useDrag<"s">({
    feld: { x0: PAD_L, y0: PAD_T, w: FELD_W, h: FELD_H },
    welt: { x0: 0, x1: WELT, y0: 0, y1: WELT },
    clamp: ([a, b]) => {
      const na = clamp(a, 0.2, WELT);
      return [na, clamp(b, 0, na)];
    },
    greifPosition: () => [s1, s2],
    onDrag: ([a, b]) => {
      setS1(Math.round(a * 20) / 20);
      setS2(Math.round(b * 20) / 20);
    },
  });

  const aufDiagonale = Math.abs(s1 - s2) < 1e-6;
  const rangEins = s2 < 1e-6;
  const ordnungKippt = spektral < B_NORM && frob > B_NORM;

  // Balken für den Quotienten auf der Skala [1, √2]
  const BAL_W = 240;
  const balken = ((quotient - 1) / (WURZEL2 - 1)) * BAL_W;

  return (
    <div className="space-y-3 text-sm">
      <Aufgabe>
        Ziehen wir den Punkt <M>{"(\\sigma_1, \\sigma_2)"}</M> einmal auf die Winkelhalbierende und
        einmal hinunter auf die waagerechte Achse.
      </Aufgabe>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        <span style={{ color: GRAU }}>grau</span> der zulässige Bereich{" "}
        <M>{"\\sigma_1 \\ge \\sigma_2 \\ge 0"}</M> mit seinen beiden Rändern,{" "}
        <span style={{ color: ROT }}>rot</span> die Spektralnorm{" "}
        <M>{"\\left\\|\\bA\\right\\|_2 = \\sigma_1"}</M>,{" "}
        <span style={{ color: BLAU }}>blau</span> die Frobenius-Norm{" "}
        <M>{"\\left\\|\\bA\\right\\|_F"}</M>. Wir rechnen mit{" "}
        <M>{"\\bA = \\operatorname{diag}(\\sigma_1, \\sigma_2)"}</M>; jede andere Matrix mit
        denselben Singulärwerten liefert dieselben Zahlen.
      </p>
      <div className="flex flex-wrap gap-2">
        {VOREINSTELLUNGEN.map((v) => {
          const aktiv = Math.abs(v.s[0] - s1) < 1e-9 && Math.abs(v.s[1] - s2) < 1e-9;
          return (
            <button
              key={v.name}
              type="button"
              title={v.titel}
              aria-pressed={aktiv}
              className={`text-xs ${aktiv ? W_BUTTON_AKTIV : W_BUTTON}`}
              onClick={() => {
                setS1(v.s[0]);
                setS2(v.s[1]);
              }}
            >
              {v.name}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="max-w-full h-auto rounded"
            role="img"
            aria-label={`Die Singulärwerte als Punkt im zulässigen Keil; der Quotient aus Frobenius- und Spektralnorm beträgt ${fmtDe(quotient, 3)}.`}
            {...zieh.svgProps}
            style={{
              ...zieh.svgProps.style,
              background: "var(--w-bg)",
              border: "1px solid var(--w-border)",
            }}
          >
            {/* zulässiger Keil sigma_2 <= sigma_1 */}
            <polygon
              points={`${px(0)},${py(0)} ${px(WELT)},${py(0)} ${px(WELT)},${py(WELT)}`}
              fill={GRAU}
              fillOpacity={0.12}
            />
            <line x1={px(0)} y1={py(0)} x2={px(WELT)} y2={py(WELT)} stroke={GRAU} strokeWidth={1.6} />
            <line x1={px(0)} y1={py(0)} x2={px(WELT)} y2={py(0)} stroke="var(--w-axis)" strokeWidth={1.2} />
            <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(WELT)} stroke="var(--w-axis)" strokeWidth={1.2} />
            {[1, 2].map((t) => (
              <g key={`t${t}`}>
                <line x1={px(t)} y1={py(0)} x2={px(t)} y2={py(0) + 4} stroke="var(--w-axis)" />
                <text x={px(t)} y={py(0) + 15} fontSize={10} fill="var(--w-muted)" textAnchor="middle">
                  {t}
                </text>
                <line x1={px(0) - 4} y1={py(t)} x2={px(0)} y2={py(t)} stroke="var(--w-axis)" />
                <text x={px(0) - 7} y={py(t) + 3} fontSize={10} fill="var(--w-muted)" textAnchor="end">
                  {t}
                </text>
              </g>
            ))}
            <text x={px(WELT)} y={py(0) + 26} fontSize={11} fill="var(--w-muted)" textAnchor="end">
              σ₁
            </text>
            <text x={px(0) - 26} y={py(WELT) + 4} fontSize={11} fill="var(--w-muted)">
              σ₂
            </text>
            {/* Beschriftung der beiden Ränder: bewusst NEUTRAL. Die frühere
                Fassung („rechte Schranke scharf") nahm im Anfangsbild schon das
                Ergebnis vorweg, zu dem die Aufgabenzeile erst hinführen will;
                die Deutung übernimmt das Verdikt. */}
            <text
              x={px(WELT) - 4}
              y={py(WELT) + 14}
              fontSize={10}
              fill={GRAU}
              textAnchor="end"
              stroke="var(--w-bg)"
              strokeWidth={2.5}
              paintOrder="stroke"
            >
              σ₁ = σ₂
            </text>
            <text
              x={px(WELT) - 4}
              y={py(0) - 6}
              fontSize={10}
              fill={GRAU}
              textAnchor="end"
              stroke="var(--w-bg)"
              strokeWidth={2.5}
              paintOrder="stroke"
            >
              σ₂ = 0
            </text>
            {/* Lote auf die Achsen */}
            <line x1={px(s1)} y1={py(s2)} x2={px(s1)} y2={py(0)} stroke={ROT} strokeWidth={1} strokeDasharray="3 3" />
            <line x1={px(s1)} y1={py(s2)} x2={px(0)} y2={py(s2)} stroke={BLAU} strokeWidth={1} strokeDasharray="3 3" />
            {/* Kreisbogen vom Radius ‖A‖_F: alle Matrizen gleicher Frobenius-Norm */}
            {frob <= WELT && (
              <path
                d={`M ${px(frob)},${py(0)} A ${(frob / WELT) * FELD_W},${(frob / WELT) * FELD_H} 0 0 0 ${px(frob / WURZEL2)},${py(frob / WURZEL2)}`}
                fill="none"
                stroke={BLAU}
                strokeWidth={1.6}
              />
            )}
            <DragHandle
              x={px(s1)}
              y={py(s2)}
              r={5}
              farbe={ROT}
              aktiv={zieh.dragging === "s"}
              {...zieh.handleProps("s")}
            />
          </svg>
        </div>
        <div className="min-w-0 space-y-2">
          <Slider label="σ₁" value={s1} onChange={setzeS1} min={0.2} max={2.6} step={0.05} accent={ROT} />
          <Slider label="σ₂" value={s2} onChange={setzeS2} min={0} max={2.6} step={0.05} accent={BLAU} />
          <div className={`p-2 ${W_PANEL}`}>
            <div className="mb-1 flex justify-between gap-3">
              <span>
                <M>{"\\left\\|\\bA\\right\\|_F / \\left\\|\\bA\\right\\|_2"}</M>
              </span>
              <span className="font-mono tabular-nums">{fmtDe(quotient, 3)}</span>
            </div>
            <svg
              viewBox={`0 0 ${BAL_W} 30`}
              className="max-w-full h-auto"
              role="img"
              aria-label={`Der Quotient liegt bei ${fmtDe(quotient, 2)} auf der Skala von 1 bis Wurzel 2.`}
            >
              <rect x={0} y={4} width={BAL_W} height={12} fill="var(--w-grid)" rx={2} />
              <rect x={0} y={4} width={Math.max(1, balken)} height={12} fill={BLAU} rx={2} />
              <text x={0} y={27} fontSize={9} fill="var(--w-muted)">
                1
              </text>
              <text x={BAL_W} y={27} fontSize={9} fill="var(--w-muted)" textAnchor="end">
                √2 ≈ 1,414
              </text>
            </svg>
          </div>
          <div className="space-y-0.5 font-mono text-xs">
            <div style={{ color: ROT }}>‖A‖₂ = {fmtDe(spektral, 3)}</div>
            <div style={{ color: BLAU }}>‖A‖_F = {fmtDe(frob, 3)}</div>
            <div className={W_MUTED}>‖A‖⁎ = {fmtDe(nuklear, 3)} (Nuklearnorm)</div>
            <div className={W_MUTED}>√2 · ‖A‖₂ = {fmtDe(WURZEL2 * spektral, 3)}</div>
          </div>
        </div>
      </div>
      <Verdikt kind={aufDiagonale || rangEins ? "warn" : "ok"}>
        {rangEins ? (
          <>
            Hier ist <M>{"\\sigma_2 = 0"}</M>, die Matrix hat Rang 1, und die beiden Normen fallen
            zusammen: <M>{`\\left\\|\\bA\\right\\|_F = \\left\\|\\bA\\right\\|_2 = ${fmtDe(spektral, 3).replace(",", "{,}")}`}</M>
            . Die linke Ungleichung aus {ref("beispiel:explizite-aequivalenzkonstanten")} gilt also mit Gleichheit und lässt sich
            nicht verschärfen.
          </>
        ) : aufDiagonale ? (
          <>
            Beide Singulärwerte sind gleich, <M>{"\\bA"}</M> ist ein Vielfaches der Einheitsmatrix.
            Jetzt steht rechts Gleichheit:{" "}
            <M>{`\\left\\|\\bA\\right\\|_F = ${fmtDe(frob, 3).replace(",", "{,}")} = \\sqrt{2}\\,\\left\\|\\bA\\right\\|_2`}</M>
            . Die Konstante <M>{"\\sqrt{\\min(m,n)}"}</M> aus {ref("beispiel:explizite-aequivalenzkonstanten")} ist damit die
            kleinstmögliche.
          </>
        ) : (
          <>
            Der Quotient liegt bei {fmtDe(quotient, 3)}, also echt zwischen den beiden Schranken 1
            und <M>{"\\sqrt{2} \\approx 1{,}414"}</M> ({ref("beispiel:explizite-aequivalenzkonstanten")}). Je weiter der zweite
            Singulärwert zurückfällt, desto näher rücken Frobenius- und Spektralnorm zusammen.
            {ordnungKippt && (
              <>
                {" "}
                Nebenbei: Für die Vergleichsmatrix <M>{"\\bB"}</M> aus {ref("bemerkung:aequivalenz-ist-nicht-gleichheit")} ist{" "}
                <M>{"\\left\\|\\bB\\right\\|_2 = \\left\\|\\bB\\right\\|_F = 1{,}2"}</M>. Beim
                aktuellen <M>{"\\bA"}</M> ordnen die beiden Normen die zwei Matrizen also
                verschieden: In der Spektralnorm ist <M>{"\\bB"}</M> die größere, in der
                Frobenius-Norm <M>{"\\bA"}</M>.
              </>
            )}
          </>
        )}
      </Verdikt>
    </div>
  );
}
