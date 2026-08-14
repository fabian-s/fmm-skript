/** Konzept-Tooltip: Stetigkeit, keine Sprünge, Grenzwert gleich Funktionswert. */
import { useState } from "react";
import { M, Slider } from "../../lib";
import { LabeledPlot } from "../../lib";

export function JumpWidget() {
  const [c, setC] = useState(1);
  const left = (x: number) => (x < 1 ? 0.5 * x * x : NaN);
  const right = (x: number) => (x >= 1 ? 0.5 * x * x + c : NaN);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Verschieben wir die Sprunghöhe <M>{"c"}</M>. Der Ast für{" "}
        <M>{"x \\ge 1"}</M> ist um <M>{"c"}</M> nach oben verschoben; die
        Funktion ist also genau dann stetig in <M>{"x = 1"}</M>, wenn{" "}
        <M>{"c = 0"}</M> ist und die beiden Punkte verschmelzen.
      </p>
      <Slider label="c" value={c} onChange={setC} min={-1.5} max={1.5} step={0.05} />
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[{ f: left }, { f: right }]}
        xDomain={[-2, 2.2]}
        yDomain={[-1.7, 4.2]}
        width={280}
        height={200}
        markers={[
          { x: 1, y: 0.5, color: "#0284c7", label: "linksseitiger Grenzwert" },
          { x: 1, y: 0.5 + c, color: "#dc2626", label: "f(1)" },
        ]}
      />
      <p className="mt-1 font-mono text-xs">
        linksseitiger Grenzwert = 0.500&ensp;f(1) = {(0.5 + c).toFixed(3)}&ensp;
        {Math.abs(c) < 0.026 ? "→ stetig" : "→ Sprung!"}
      </p>
    </div>
  );
}
