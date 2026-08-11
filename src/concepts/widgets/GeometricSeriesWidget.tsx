import { useState } from "react";
import { Slider } from "../../lib";

/** Partial sums S_n of sum r^k for adjustable ratio r, with the limit 1/(1-r). */
export function GeometricSumWidget() {
  const [r, setR] = useState(0.5);
  const W = 280;
  const H = 150;
  const N = 16;
  const sums: number[] = [];
  let s = 0;
  for (let k = 0; k < N; k++) {
    s += Math.pow(r, k);
    sums.push(s);
  }
  const target = 1 / (1 - r);
  const lo = Math.min(0, ...sums, target) - 0.3;
  const hi = Math.max(1, ...sums, target) + 0.3;
  const xOf = (n: number) => 12 + (n / (N - 1)) * (W - 24);
  const yOf = (v: number) => H - 10 - ((v - lo) / (hi - lo)) * (H - 20);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Quotient r"
        value={r}
        onChange={setR}
        min={-0.9}
        max={0.9}
        step={0.05}
        fmt={(v) => v.toFixed(2)}
      />
      <svg width={W} height={H} className="rounded bg-white">
        <line
          x1={0}
          y1={yOf(target)}
          x2={W}
          y2={yOf(target)}
          stroke="#dc2626"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {sums.map((v, n) => (
          <circle key={n} cx={xOf(n)} cy={yOf(v)} r={3.5} fill="#0284c7" />
        ))}
      </svg>
      <p className="mt-1 font-mono text-xs text-slate-300">
        S_n = 1 + r + … + r^n → 1/(1−r) = {target.toFixed(3)} (rote Linie)
      </p>
    </div>
  );
}
