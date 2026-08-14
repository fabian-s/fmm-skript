import { useState } from "react";
import { LabeledTransformCanvas, Slider, maxAbsCoord } from "../../lib";

/** Mix c1*v1 + c2*v2 for two fixed 2-vectors and watch the result move. */
export function MixWidget() {
  const [c1, setC1] = useState(1);
  const [c2, setC2] = useState(0.5);
  const v1: [number, number] = [2, 1];
  const v2: [number, number] = [-1, 1];
  const mix: [number, number] = [c1 * v1[0] + c2 * v2[0], c1 * v1[1] + c2 * v2[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="c₁" value={c1} onChange={setC1} min={-1.5} max={1.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="c₂" value={c2} onChange={setC2} min={-1.5} max={1.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        c₁v₁ + c₂v₂ = {c1.toFixed(1)}·(2, 1) + {c2.toFixed(1)}·(−1, 1) = ({mix[0].toFixed(1)},{" "}
        {mix[1].toFixed(1)})
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showUnitCircle={false}
        vectors={[
          { v: v1, color: "#38bdf8", label: "v₁" },
          { v: v2, color: "#f472b6", label: "v₂" },
          { v: mix, color: "#facc15", label: "c₁v₁+c₂v₂" },
        ]}
        size={280}
        worldHalf={Math.max(3.2, 1.35 * maxAbsCoord(v1, v2, mix))}
      />
    </div>
  );
}
