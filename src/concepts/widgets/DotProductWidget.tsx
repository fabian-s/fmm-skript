import { useState } from "react";
import { Slider } from "../../lib";
import { LabeledTransformCanvas } from "../../lib";

/**
 * Rotate y around a fixed x and watch x^T y trace out ||x|| ||y|| cos(theta):
 * largest when aligned, zero at a right angle, negative when opposed.
 */
export function DotProductWidget() {
  const [deg, setDeg] = useState(35);
  const x: [number, number] = [2, 1];
  const th = (deg * Math.PI) / 180;
  const y: [number, number] = [2 * Math.cos(th), 2 * Math.sin(th)];
  const dot = x[0] * y[0] + x[1] * y[1];
  const nx = Math.hypot(x[0], x[1]);
  const ny = 2;
  const cos = dot / (nx * ny);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung von y (°)" value={deg} onChange={setDeg} min={0} max={360} step={1} fmt={(v) => v.toFixed(0)} />
      <p className="my-1 font-mono text-xs">
        xᵀy = {dot.toFixed(2)}{"   "}cos θ = {cos.toFixed(2)}
        {Math.abs(dot) < 0.1 ? "  → (fast) orthogonal!" : ""}
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        worldHalf={2.6}
        vectors={[
          { v: x, color: "#38bdf8", label: "x" },
          { v: y, color: "#f472b6", label: "y" },
        ]}
      />
    </div>
  );
}
