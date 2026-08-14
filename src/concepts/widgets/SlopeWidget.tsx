import { useState } from "react";
import { Plot, Slider } from "../../lib";

export function SlopeWidget() {
  const [a, setA] = useState(1.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Steigung a" value={a} onChange={setA} min={-3} max={3} step={0.1} />
      <Plot
        series={[{ f: (x) => a * x }]}
        xDomain={[-2, 2]}
        yDomain={[-3, 3]}
        width={280}
        height={180}
        markers={[
          { x: 0, y: 0, color: "#475569" },
          { x: 1, y: 0, color: "#475569", label: "1 nach rechts" },
          { x: 1, y: a, label: `${a.toFixed(1)} nach oben` },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Ein Schritt nach rechts bringt uns {a.toFixed(1)} nach oben: Steigung a = {a.toFixed(1)}.
      </p>
    </div>
  );
}
