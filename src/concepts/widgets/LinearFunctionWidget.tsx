import { useState } from "react";
import { Plot, Slider } from "../../lib";

export function LinearWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="a (Steigung)" value={a} onChange={setA} min={-3} max={3} step={0.1} />
      <Slider label="b (Achsenabschnitt)" value={b} onChange={setB} min={-2} max={2} step={0.1} />
      <Plot
        series={[{ f: (x) => a * x + b, color: "#0284c7" }]}
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={280}
        height={190}
        markers={[{ x: 0, y: b, label: "b" }]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Verändern wir a und b: Die Steigung kippt die Gerade, der
        Achsenabschnitt schiebt sie nach oben und unten.
      </p>
    </div>
  );
}
