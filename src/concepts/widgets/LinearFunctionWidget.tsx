/** Insight: slope changes rise per unit and intercept translates the line. Colors: blue line, orange slope triangle. Provenance: original; no fixed verdict numbers, 2026-08-19. */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function LinearWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Verändern wir Steigung und Achsenabschnitt und lesen wir den Einheitsanstieg ab.
      </Aufgabe>
      <Plot
        series={[{ f: (x) => a * x + b, color: FMM_COLORS.blau, label: "f(x)=ax+b" }]}
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        xLabel="x"
        yLabel="f(x)"
        readout
        markers={[
          { x: 0, y: b, label: "b" },
          { x: 1, y: b, color: FMM_COLORS.orange, label: "1 rechts" },
          { x: 1, y: a + b, color: FMM_COLORS.orange, label: "Anstieg" },
        ]}
        polylines={[
          {
            pts: [
              [0, b],
              [1, b],
              [1, a + b],
            ],
            color: FMM_COLORS.orange,
            dash: [3, 2],
            label: "Steigungsdreieck",
          },
        ]}
      />
      <Slider
        label="a (Steigung)"
        value={a}
        onChange={setA}
        min={-3}
        max={3}
        step={0.1}
        accent={FMM_COLORS.blau}
      />
      <Slider label="b (Abschnitt)" value={b} onChange={setB} min={-2} max={2} step={0.1} />
      <Verdikt kind="neutral">
        Ein Schritt nach rechts ändert den Wert um {fmtDe(a, 1)}; bei x = 0 liegt die Gerade bei{" "}
        {fmtDe(b, 1)}.
      </Verdikt>
    </div>
  );
}
