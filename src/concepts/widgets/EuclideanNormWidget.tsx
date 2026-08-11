import { useState } from "react";
import { Slider } from "../../lib";

/**
 * Unit "circles" of the 1-, 2-, and ∞-norms as an SVG, with a movable point
 * whose three norm values are printed live.
 */
export function NormBallsWidget() {
  const [x1, setX1] = useState(0.9);
  const [x2, setX2] = useState(0.6);
  const n1 = Math.abs(x1) + Math.abs(x2);
  const n2 = Math.hypot(x1, x2);
  const nInf = Math.max(Math.abs(x1), Math.abs(x2));
  const size = 250;
  const half = 1.7; // world half-width
  const px = (w: number) => ((w + half) / (2 * half)) * size;
  const py = (w: number) => size - ((w + half) / (2 * half)) * size;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x₁" value={x1} onChange={setX1} min={-1.5} max={1.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="x₂" value={x2} onChange={setX2} min={-1.5} max={1.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        <span className="text-amber-300">‖x‖₁ = {n1.toFixed(2)}</span>{"  "}
        <span className="text-sky-300">‖x‖₂ = {n2.toFixed(2)}</span>{"  "}
        <span className="text-pink-300">‖x‖∞ = {nInf.toFixed(2)}</span>
      </p>
      <svg width={size} height={size} className="rounded bg-slate-800">
        {/* axes */}
        <line x1={0} y1={py(0)} x2={size} y2={py(0)} stroke="#64748b" strokeWidth={1} />
        <line x1={px(0)} y1={0} x2={px(0)} y2={size} stroke="#64748b" strokeWidth={1} />
        <text x={size - 14} y={py(0) - 4} fill="#cbd5e1" fontSize={11}>
          x₁
        </text>
        <text x={px(0) + 5} y={12} fill="#cbd5e1" fontSize={11}>
          x₂
        </text>
        {/* unit balls: all points with norm exactly 1 */}
        <polygon
          points={`${px(1)},${py(0)} ${px(0)},${py(1)} ${px(-1)},${py(0)} ${px(0)},${py(-1)}`}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={1.5}
        />
        <circle cx={px(0)} cy={py(0)} r={px(1) - px(0)} fill="none" stroke="#38bdf8" strokeWidth={1.5} />
        <rect
          x={px(-1)}
          y={py(1)}
          width={px(1) - px(-1)}
          height={py(-1) - py(1)}
          fill="none"
          stroke="#f472b6"
          strokeWidth={1.5}
        />
        {/* the point */}
        <line x1={px(0)} y1={py(0)} x2={px(x1)} y2={py(x2)} stroke="#e2e8f0" strokeWidth={1.5} />
        <circle cx={px(x1)} cy={py(x2)} r={4} fill="#e2e8f0" />
      </svg>
      <p className="mt-1 text-xs text-slate-300">
        Jede Kurve sammelt alle Punkte der „Länge 1" in einer Norm:
        Raute = 1-Norm, Kreis = 2-Norm, Quadrat = ∞-Norm. Bewegen wir den
        Punkt, sehen wir die drei Längen auseinanderlaufen (nur auf den Achsen
        stimmen sie überein).
      </p>
    </div>
  );
}
