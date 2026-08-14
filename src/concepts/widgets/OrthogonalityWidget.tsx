import { useState } from "react";
import { LabeledTransformCanvas, Slider } from "../../lib";

/**
 * Pythagoras detector: rotate v and compare ||u||² + ||v||² with ||u+v||².
 * The two agree exactly when u^T v = 0.
 */
export function PythagorasWidget() {
  const [deg, setDeg] = useState(60);
  const u: [number, number] = [2, 1];
  const th = (deg * Math.PI) / 180;
  const v: [number, number] = [1.5 * Math.cos(th), 1.5 * Math.sin(th)];
  const sum: [number, number] = [u[0] + v[0], u[1] + v[1]];
  const dot = u[0] * v[0] + u[1] * v[1];
  const nu2 = u[0] * u[0] + u[1] * u[1];
  const nv2 = v[0] * v[0] + v[1] * v[1];
  const ns2 = sum[0] * sum[0] + sum[1] * sum[1];
  const ortho = Math.abs(dot) < 0.08;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung von v (°)" value={deg} onChange={setDeg} min={0} max={360} step={1} fmt={(x) => x.toFixed(0)} />
      <p className={`my-1 font-mono text-xs ${ortho ? "text-emerald-300" : ""}`}>
        uᵀv = {dot.toFixed(2)}
        {ortho ? "  → orthogonal!" : ""}
      </p>
      <p className="my-1 font-mono text-xs">
        ‖u‖² + ‖v‖² = {nu2.toFixed(2)} + {nv2.toFixed(2)} = {(nu2 + nv2).toFixed(2)}
        {"   "}vs.{"   "}‖u+v‖² = {ns2.toFixed(2)}
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
        worldHalf={4}
        vectors={[
          { v: u, color: "#38bdf8", label: "u" },
          { v: v, color: "#f472b6", label: "v" },
          { v: sum, color: "#e2e8f0", label: "u+v" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Die beiden Zahlen oben stimmen genau dann überein, wenn uᵀv = 0:
        Pythagoras gilt nur im rechten Winkel.
      </p>
    </div>
  );
}
