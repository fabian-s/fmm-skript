import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../lib";

export function JumpBreaksIvtWidget() {
  const [c, setC] = useState(0);
  // f(x) = x^2/2 - 1 für x < 1, plus ein Sprung der Höhe c für x >= 1
  const left = (x: number) => (x < 1 ? 0.5 * x * x - 1 : NaN);
  const right = (x: number) => (x >= 1 ? 0.5 * x * x - 1 + c : NaN);
  const hasRoot = c <= 0.5 + 1e-12;
  const root = hasRoot ? Math.sqrt(2 * (1 - c)) : NaN;
  const markers = [
    { x: 0, y: -1, color: "#0284c7", label: "f(0) < 0" },
    { x: 2, y: 1 + c, color: "#0284c7", label: "f(2) > 0" },
    ...(hasRoot ? [{ x: root, y: 0, color: "#dc2626", label: "Nullstelle" }] : []),
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Die Randpunkte schließen die Null immer ein: <M>{"f(0) = -1 < 0"}</M>{" "}
        und <M>{"f(2) = " + (1 + c).toFixed(2) + " > 0"}</M>. Ziehen wir an der
        Sprunghöhe <M>{"c"}</M> bei <M>{"x = 1"}</M> und beobachten, was mit
        der Nullstelle passiert.
      </p>
      <Slider label="Sprung c" value={c} onChange={setC} min={0} max={1.2} step={0.05} />
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[{ f: left }, { f: right }]}
        xDomain={[-0.2, 2.2]}
        yDomain={[-1.6, 2.6]}
        width={280}
        height={200}
        markers={markers}
      />
      <p className="mt-1 font-mono text-xs">
        {hasRoot
          ? `stetig genug: Nullstelle bei x = ${root.toFixed(3)}`
          : "c > 0.5: der Graph SPRINGT über die Null: Vorzeichenwechsel, aber keine Nullstelle!"}
      </p>
    </div>
  );
}
