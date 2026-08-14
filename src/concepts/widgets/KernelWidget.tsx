import { useState } from "react";
import { Slider, TransformCanvas } from "../../lib";

const KER_ANGLE = Math.atan2(-1, 2); // kernel direction of A = [[1,2],[0.5,1]]

export function KernelWidget() {
  const [th, setTh] = useState(0.8);
  const v: [number, number] = [1.5 * Math.cos(th), 1.5 * Math.sin(th)];
  // A v for A = [[1,2],[0.5,1]] (rank 1, kernel = span{(2,-1)})
  const Av: [number, number] = [v[0] + 2 * v[1], 0.5 * v[0] + v[1]];
  const inKernel = Math.abs(Math.sin(th - KER_ANGLE)) < 0.03;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung von v" value={th} onChange={setTh} min={-Math.PI / 2} max={Math.PI / 2} />
      <TransformCanvas
        matrix={[
          [1, 2],
          [0.5, 1],
        ]}
        showGrid={false}
        size={260}
        worldHalf={3}
        vectors={[
          { v, color: "#dc2626", label: "v" },
          { v: Av, color: "#0284c7", label: "Av" },
        ]}
      />
      <p className="mt-1 text-xs">
        {inKernel
          ? "v zeigt entlang (2, −1): Av = 0, v liegt im Kern."
          : "Av ≠ 0, dieses v liegt also nicht im Kern. Richten wir v entlang (2, −1) aus, verschwindet Av."}
      </p>
    </div>
  );
}
