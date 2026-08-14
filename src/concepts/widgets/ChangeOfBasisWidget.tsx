/** Widget zum Konzept-Tooltip „Basiswechsel": derselbe Pfeil, neue Koordinaten. */
import { useState } from "react";
import { Slider, TransformCanvas } from "../../lib";

export function BasisWidget() {
  const [th, setTh] = useState(0.5);
  const b1: [number, number] = [Math.cos(th), Math.sin(th)];
  const b2: [number, number] = [-Math.sin(th), Math.cos(th)];
  const x: [number, number] = [2, 1];
  // Koordinaten von x bzgl. der gedrehten Basis (Basis ist hier orthonormal)
  const c1 = x[0] * b1[0] + x[1] * b1[1];
  const c2 = x[0] * b2[0] + x[1] * b2[1];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Basis drehen: θ" value={th} onChange={setTh} min={0} max={1.5} />
      <TransformCanvas
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={260}
        worldHalf={2.6}
        vectors={[
          { v: x, color: "#dc2626", label: "x" },
          { v: b1, color: "#0284c7", label: "b1" },
          { v: b2, color: "#16a34a", label: "b2" },
        ]}
      />
      <p className="mt-1 text-xs">
        Derselbe Pfeil <span className="font-mono">x</span>, neue Koordinaten:{" "}
        <span className="font-mono">
          ({c1.toFixed(2)}, {c2.toFixed(2)})
        </span>{" "}
        statt <span className="font-mono">(2, 1)</span>.
      </p>
    </div>
  );
}
