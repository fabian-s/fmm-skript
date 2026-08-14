import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

export function SinCosExplorer() {
  const [x, setX] = useState(0);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x" value={x} onChange={setX} min={-6.3} max={6.3} step={0.05} />
      <Plot
        series={[
          { f: Math.sin, color: "#0284c7", label: "sin" },
          { f: Math.cos, color: "#ea580c", dash: [5, 4], label: "cos" },
        ]}
        markers={[
          { x, y: Math.sin(x), color: "#0284c7", label: `sin=${Math.sin(x).toFixed(2)}` },
          { x, y: Math.cos(x), color: "#ea580c", label: `cos=${Math.cos(x).toFixed(2)}` },
        ]}
        xDomain={[-6.5, 6.5]}
        yDomain={[-1.6, 1.6]}
        width={290}
        height={170}
      />
      <div className="mt-1 text-xs">
        Blau: <M>{"\\sin x"}</M>, orange gestrichelt: <M>{"\\cos x"}</M>. Die
        Steigung der blauen Kurve ist an jeder Stelle gleich dem orangen Wert
        dort: <M>{"(\\sin x)' = \\cos x"}</M>.
      </div>
    </div>
  );
}
