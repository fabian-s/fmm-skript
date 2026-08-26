/**
 * Konzept-Widget `rank-nullity-theorem`.
 *
 * DIE EINE EINSICHT: Der Rangsatz ist eine Bilanz mit fester Summe. Die n
 * Eingangsdimensionen verteilen sich restlos auf „überlebt" und
 * „plattgedrückt"; wächst der eine Posten, schrumpft der andere um genau so
 * viel.
 *
 * FARBROLLEN: blau = überlebende Dimensionen (Rang, also das Bild); violett =
 * plattgedrückte Dimensionen (Kern). Die Beschriftungen tragen dieselben
 * Farben wie die Balken, die sie benennen.
 *
 * PROVENIENZ: Balkenbild aus der Vorfassung (Stand 2026-08-19); responsives
 * viewBox, Themenfarben, Achsenlose Bilanzbeschriftung und das
 * zustandsabhängige Verdikt sind neu.
 *
 * KORREKTUR 2026-08-26 (Konzept-Audit): Der Regler ging bis r = 3 und zeigte
 * damit einen für A: ℝ³ → ℝ² unmöglichen Zustand, den erst das Verdikt
 * zurücknahm. Er endet jetzt bei r = m = 2; die Schranke rg(A) ≤ min(m, n)
 * steht sichtbar in der Figur.
 *
 * Es ist ein Bilanzdiagramm, kein Koordinatenbild: die einzige Größe ist die
 * Anzahl der Dimensionen, und die steht als Zahl an jedem Balkenblock. Achsen
 * mit Ticks hätten hier nichts zu beschriften.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * Für die Beispielmatrix A = [[1, 0, 1], [0, 1, 1]] sind die ersten beiden
 * Spalten unabhängig und die dritte ist ihre Summe, also rg(A) = 2; der Vektor
 * (1 | 1 | −1) liegt im Kern (A·(1,1,−1)ᵀ = 0), also dim Kern(A) = 1, und
 * 2 + 1 = 3 = n geht auf.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, W_MUTED } from "../../lib";

const N = 3; // Eingangsdimension n
const M = 2; // Zieldimension m; rg(A) <= min(m, n) = 2
const B = 300;
const H = 78;
const RAND = 10;
const SEG = (B - 2 * RAND) / N;

export function DimensionBudgetWidget() {
  const [r, setR] = useState(2);
  const kern = N - r;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verschieben wir den Rang und sehen zu, wie der Kern die Bilanz auffüllt.</Aufgabe>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={`Dimensionsbudget: von drei Eingangsdimensionen überleben ${r}, ${kern} werden auf null gedrückt.`}
      >
        <rect
          x={0.5}
          y={0.5}
          width={B - 1}
          height={H - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        <text x={RAND} y={16} fill="var(--w-text)" fontSize={11}>
          A: ℝ³ → ℝ², n = {N}
        </text>
        <text x={B - RAND} y={16} fill="var(--w-muted)" fontSize={10} textAnchor="end">
          rg(A) ≤ min(m, n) = {M}
        </text>
        {Array.from({ length: N }, (_, i) => (
          <rect
            key={i}
            x={RAND + i * SEG}
            y={24}
            width={SEG - 4}
            height={26}
            rx={3}
            fill={i < r ? FMM_COLORS.blau : FMM_COLORS.violett}
          />
        ))}
        <text x={RAND} y={68} fill={FMM_COLORS.blau} fontSize={11}>
          überleben: rg(A) = {r}
        </text>
        <text x={B - RAND} y={68} fill={FMM_COLORS.violett} fontSize={11} textAnchor="end">
          plattgedrückt: dim Kern = {kern}
        </text>
      </svg>
      <Slider
        label="Rang r"
        value={r}
        onChange={(v) => setR(Math.round(v))}
        min={0}
        max={M}
        step={1}
        fmt={(v) => v.toFixed(0)}
        accent={FMM_COLORS.blau}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Bild ·{" "}
        <span style={{ color: FMM_COLORS.violett }}>▮</span> Kern
      </p>
      <Verdikt kind={r === 2 ? "ok" : "neutral"}>
        {r === 0 ? (
          <>
            r = 0: die Abbildung drückt alle drei Dimensionen auf null, der Kern ist der ganze ℝ³
            und das Bild nur der Nullpunkt. 0 + 3 = 3 – die Bilanz geht auch im Extremfall auf.
          </>
        ) : r === 2 ? (
          <>
            r = 2 ist der größtmögliche Rang hier und zugleich der wahre Wert unserer
            Beispielmatrix A = ((1, 0, 1), (0, 1, 1)): die dritte Spalte ist die Summe der ersten
            beiden, der Kern wird von (1 | 1 | −1)ᵀ aufgespannt. 2 + 1 = 3 = n.
          </>
        ) : (
          <>
            r = {r}: dann müsste der Kern {kern} Dimensionen haben, damit {r} + {kern} = 3 bleibt.
            Nur ist das nicht die Bilanz unserer Beispielmatrix – deren Rang ist 2, weil ihre ersten
            beiden Spalten unabhängig sind.
          </>
        )}
      </Verdikt>
    </div>
  );
}
