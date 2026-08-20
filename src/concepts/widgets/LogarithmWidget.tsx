/**
 * Konzept-Widget `logarithm`.
 * DIE EINE EINSICHT: Die Basis ändert die vertikale Skala, nicht Nullpunkt
 * oder Monotonie des Logarithmus. FARBROLLEN: rot = log₂, blau = ln,
 * grün = log₁₀. PROVENIENZ: Originalwidget, um einen ablesbaren Punkt ergänzt.
 * Zahlen durch scratchpad/verify/QA-L1/check-qa-l1.mjs, 2026-08-20,
 * verifiziert: bei x=8 sind log₂(x)=3, ln(x)=2,079442 und log₁₀(x)=0,903090;
 * bei x=1 sind alle drei Werte 0.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function LogPlot() {
  const [x, setX] = useState(8);
  const log2 = Math.log2(x);
  const ln = Math.log(x);
  const log10 = Math.log10(x);
  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>Vergleichen wir die drei Basen am gemeinsamen Nullpunkt und für große x.</Aufgabe>
      <Plot
        series={[
          { f: (x) => (x > 0 ? Math.log2(x) : NaN), color: FMM_COLORS.rot, label: "log₂ x" },
          { f: (x) => (x > 0 ? Math.log(x) : NaN), color: FMM_COLORS.blau, label: "ln x" },
          { f: (x) => (x > 0 ? Math.log10(x) : NaN), color: FMM_COLORS.gruen, label: "log₁₀ x" },
        ]}
        xDomain={[0, 8]}
        yDomain={[-3, 3.3]}
        xLabel="x"
        yLabel="Logarithmus"
        readout
        markers={[
          { x: 1, y: 0, label: "gemeinsamer Nullpunkt" },
          { x, y: log2, color: FMM_COLORS.rot, label: "log₂" },
          { x, y: ln, color: FMM_COLORS.blau, label: "ln" },
          { x, y: log10, color: FMM_COLORS.gruen, label: "log₁₀" },
        ]}
      />
      <Slider label="Ablesestelle x" value={x} onChange={setX} min={0.2} max={8} step={0.1} accent={FMM_COLORS.blau} />
      <Verdikt kind={x < 1 ? "warn" : x === 1 ? "ok" : "neutral"}>
        {x < 1
          ? `Bei x = ${fmtDe(x, 1)} sind alle drei Logarithmen negativ: ${fmtDe(log2, 2)}, ${fmtDe(ln, 2)} und ${fmtDe(log10, 2)}.`
          : x === 1
            ? "Bei x = 1 treffen sich alle drei Kurven im gemeinsamen Nullpunkt."
            : `Bei x = ${fmtDe(x, 1)} sind alle drei Werte positiv: log₂ x = ${fmtDe(log2, 2)}, ln x = ${fmtDe(ln, 2)}, log₁₀ x = ${fmtDe(log10, 2)}. Die Basis streckt nur die y-Achse.`}
      </Verdikt>
    </div>
  );
}
