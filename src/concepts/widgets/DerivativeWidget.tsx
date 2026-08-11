/** Konzept-Tooltip: Ableitung, Auffrischung über Sekantensteigungen. */
import { useState } from "react";
import { M, Slider } from "../../lib";
import { LabeledPlot } from "../../lib";

export function SecantWidget() {
  const [h, setH] = useState(1.2);
  const a = 1;
  const fa = a * a;
  const slope = ((a + h) * (a + h) - fa) / h; // = 2 + h for f(x) = x^2
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Sekante durch <M>{"(1, 1)"}</M> und <M>{"(1+h,\\,(1+h)^2)"}</M> auf{" "}
        <M>{"f(x) = x^2"}</M>. Verkleinern wir <M>{"h"}</M>, pendelt sich die
        Sekantensteigung <M>{"\\tfrac{f(1+h)-f(1)}{h}"}</M> bei{" "}
        <M>{"f'(1) = 2"}</M> ein.
      </p>
      <Slider label="h" value={h} onChange={setH} min={0.05} max={1.5} step={0.01} />
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[
          { f: (x) => x * x },
          { f: (x) => fa + slope * (x - a), color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-0.5, 2.8]}
        yDomain={[-0.5, 7]}
        width={280}
        height={200}
        markers={[
          { x: a, y: fa, color: "#dc2626" },
          { x: a + h, y: (a + h) * (a + h), color: "#dc2626" },
        ]}
      />
      <p className="mt-1 font-mono text-xs">Sekantensteigung = {slope.toFixed(3)}</p>
    </div>
  );
}
