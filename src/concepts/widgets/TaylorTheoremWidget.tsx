import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../lib";

export function TaylorWidget() {
  const [order, setOrder] = useState(1);
  const approx = (x: number) => {
    let s = x;
    if (order >= 3) s -= (x * x * x) / 6;
    if (order >= 5) s += (x * x * x * x * x) / 120;
    return s;
  };
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Taylor-Polynome von <M>{"\\sin t"}</M> um <M>{"t = 0"}</M>{" "}
        (gestrichelt). Jeder zusätzliche Term vergrößert den Bereich, in dem
        sich das Polynom an die Kurve schmiegt; nahe <M>{"0"}</M> ist sogar
        die Gerade <M>{"p_1(t) = t"}</M> hervorragend.
      </p>
      <Slider
        label="Ordnung"
        value={order}
        onChange={setOrder}
        min={1}
        max={5}
        step={2}
        fmt={(v) => v.toFixed(0)}
      />
      <LabeledPlot
        xLabel="t"
        yLabel="f(t)"
        tickClass="text-slate-300"
        series={[
          { f: (t) => Math.sin(t) },
          { f: approx, color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-4, 4]}
        yDomain={[-2, 2]}
        width={280}
        height={180}
      />
    </div>
  );
}
