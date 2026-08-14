import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

/** f(x) = x/(1+x) klettert für immer Richtung 1, ohne sie zu erreichen: sup = 1, kein Maximum. */
export function SupWidget() {
  const [x, setX] = useState(4);
  const fx = x / (1 + x);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x" value={x} onChange={setX} min={0} max={40} step={0.5} />
      <div className="mb-1 text-xs">
        <M>{"f(x) = \\tfrac{x}{1+x}"}</M> an der Stelle{" "}
        <M>{`x = ${x.toFixed(1)}`}</M> liefert{" "}
        <M>{`f(x) = ${fx.toFixed(3)}`}</M>. Schieben wir <M>{"x"}</M>{" "}
        beliebig weit nach rechts: Der Wert kriecht auf die gestrichelte Linie{" "}
        <M>{"y = 1"}</M> zu, berührt sie aber nie. Also ist{" "}
        <M>{"\\sup_x f(x) = 1"}</M>, während <M>{"\\max_x f(x)"}</M> nicht
        existiert.
      </div>
      <Plot
        series={[
          { f: (t) => t / (1 + t) },
          { f: () => 1, color: "#dc2626", dash: [6, 4] },
        ]}
        xDomain={[0, 50]}
        yDomain={[0, 1.15]}
        width={280}
        height={160}
        markers={[{ x, y: fx, label: `f(${x.toFixed(0)})` }]}
      />
    </div>
  );
}
