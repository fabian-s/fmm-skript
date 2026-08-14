import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../lib";

export function OhmWidget() {
  const [R, setR] = useState(2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Spannung gegen Stromstärke an einem Widerstand: immer eine Gerade
        durch den Ursprung, mit Steigung <M>{"R"}</M>.
      </p>
      <Slider label="R (Ohm)" value={R} onChange={setR} min={0.5} max={5} step={0.1} />
      <LabeledPlot
        xLabel="Stromstärke i (A)"
        yLabel="Spannung V (V)"
        tickClass="text-slate-300"
        series={[{ f: (i) => R * i }]}
        xDomain={[0, 2]}
        yDomain={[0, 10.5]}
        width={280}
        height={180}
      />
    </div>
  );
}
