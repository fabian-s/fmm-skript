import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

const L = (t: number) => (t * t - 1) * (t * t - 1) + 0.3 * t;

export function OptimizationWidget() {
  const [theta, setTheta] = useState(1.6);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Parameter θ" value={theta} onChange={setTheta} min={-1.8} max={1.8} />
      <div className="mb-1 text-xs">
        Schieben wir <M>{"\\theta"}</M> so, dass <M>{"L(\\theta)"}</M>{" "}
        möglichst klein wird. Aktueller Wert:{" "}
        <M>{`L(${theta.toFixed(2)}) = ${L(theta).toFixed(2)}`}</M>.
        Vorsicht: die flache Falle bei <M>{"\\theta \\approx 1"}</M>; der
        beste Punkt liegt links.
      </div>
      <Plot
        series={[{ f: L }]}
        xDomain={[-2, 2]}
        yDomain={[-1, 3]}
        width={280}
        height={180}
        markers={[{ x: theta, y: L(theta), label: "L(θ)" }]}
      />
    </div>
  );
}
