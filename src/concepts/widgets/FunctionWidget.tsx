import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

export function FunctionWidget() {
  const [x, setX] = useState(1.2);
  const y = x * x;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Eingabe x" value={x} onChange={setX} min={-2} max={2} />
      <div className="mb-1 text-xs">
        Jede Eingabe liefert genau eine Ausgabe: <M>{"f(x) = x^2"}</M>, also{" "}
        <M>{`f(${x.toFixed(2)}) = ${y.toFixed(2)}`}</M>.
      </div>
      <Plot
        series={[{ f: (t) => t * t }]}
        xDomain={[-2.2, 2.2]}
        yDomain={[-1, 4.5]}
        width={280}
        height={180}
        markers={[{ x, y, label: "f(x)" }]}
      />
    </div>
  );
}
