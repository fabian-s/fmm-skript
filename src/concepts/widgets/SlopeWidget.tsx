/**
 * Insight: slope is signed vertical change per one horizontal unit. Colors: blue line, orange slope triangle.
 * Provenance: original; formula and shown values verified in `verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function SlopeWidget() {
  const [a, setA] = useState(1.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Verändern wir die Gerade und lesen wir das Steigungsdreieck für einen Schritt nach rechts.
      </Aufgabe>
      <Plot
        series={[{ f: (x) => a * x, color: FMM_COLORS.blau, label: "y=ax" }]}
        xDomain={[-2, 2]}
        yDomain={[-3, 3]}
        xLabel="x"
        yLabel="y"
        readout
        markers={[
          { x: 0, y: 0, label: "Start" },
          { x: 1, y: 0, color: FMM_COLORS.orange, label: "1 rechts" },
          { x: 1, y: a, color: FMM_COLORS.orange, label: "Anstieg" },
        ]}
        polylines={[
          {
            pts: [
              [0, 0],
              [1, 0],
              [1, a],
            ],
            color: FMM_COLORS.orange,
            dash: [3, 2],
            label: "Steigungsdreieck",
          },
        ]}
      />
      <Slider
        label="Steigung a"
        value={a}
        onChange={setA}
        min={-3}
        max={3}
        step={0.1}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={a === 0 ? "neutral" : "ok"}>
        {a === 0 ? (
          "Die Gerade ist flach."
        ) : (
          <>
            Ein Schritt nach rechts bedeutet {fmtDe(a, 1)} nach {a > 0 ? "oben" : "unten"}.
          </>
        )}
      </Verdikt>
    </div>
  );
}
