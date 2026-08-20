/**
 * Insight: values can approach an upper bound without attaining it. Colors: blue function, red upper bound.
 * Provenance: original. f(x)=x/(1+x)<1 and f(99)=0,99 verified in `scripts/verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function SupWidget() {
  const [x, setX] = useState(4);
  const y = x / (1 + x);
  const hit = y > 0.99;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Schieben wir x nach rechts: kommen wir über 0,99, ohne die obere Schranke zu berühren?
      </Aufgabe>
      <Plot
        series={[{ f: (t) => t / (1 + t), color: FMM_COLORS.blau, label: "f(x)" }]}
        xDomain={[0, 110]}
        yDomain={[0, 1.15]}
        xLabel="x"
        yLabel="f(x)"
        readout
        markers={[{ x, y, color: FMM_COLORS.blau, label: "aktuell" }]}
        hlines={[{ at: 1, color: FMM_COLORS.rot, dash: [6, 4], label: "obere Schranke" }]}
      />
      <Slider
        label="x"
        value={x}
        onChange={setX}
        min={0}
        max={110}
        step={0.5}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={hit ? "ok" : "neutral"}>
        {hit ? (
          <>
            f({fmtDe(x, 1)}) = {fmtDe(y, 3)} liegt über 0,99 und bleibt dennoch unter 1.
          </>
        ) : (
          <>
            f({fmtDe(x, 1)}) = {fmtDe(y, 3)}. Wir brauchen ein größeres x für 0,99.
          </>
        )}
      </Verdikt>
    </div>
  );
}
