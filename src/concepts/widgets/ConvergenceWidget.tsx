/** Konzept-Tooltip: Konvergenz, Werte pendeln sich bei einem Grenzwert ein. */
import { useState } from "react";
import { Slider } from "../../lib";

/**
 * Dots of a_n = 1 + (-0.75)^n with an adjustable tolerance band around the
 * limit 1: shrink the band and watch that only finitely many dots miss it.
 */
export function ToleranceBandWidget() {
  const [eps, setEps] = useState(0.3);
  const W = 280;
  const H = 150;
  const N = 24;
  const L = 1;
  const yMin = 0;
  const yMax = 2;
  const xOf = (n: number) => 12 + ((n - 1) / (N - 1)) * (W - 24);
  const yOf = (v: number) => H - 10 - ((v - yMin) / (yMax - yMin)) * (H - 20);
  const dots = Array.from({ length: N }, (_, i) => {
    const n = i + 1;
    const a = L + Math.pow(-0.75, n);
    return { n, a, inside: Math.abs(a - L) < eps };
  });
  const nOutside = dots.filter((d) => !d.inside).length;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Toleranz ε"
        value={eps}
        onChange={setEps}
        min={0.05}
        max={0.6}
        step={0.01}
        fmt={(v) => v.toFixed(2)}
      />
      <svg width={W} height={H} className="rounded bg-white">
        <rect
          x={0}
          y={yOf(L + eps)}
          width={W}
          height={yOf(L - eps) - yOf(L + eps)}
          fill="#bbf7d0"
        />
        <line
          x1={0}
          y1={yOf(L)}
          x2={W}
          y2={yOf(L)}
          stroke="#16a34a"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {dots.map((d) => (
          <circle
            key={d.n}
            cx={xOf(d.n)}
            cy={yOf(d.a)}
            r={3.5}
            fill={d.inside ? "#16a34a" : "#ea580c"}
          />
        ))}
      </svg>
      <p className="mt-1 text-xs text-slate-300">
        a<sub>n</sub> = 1 + (−0.75)<sup>n</sup> konvergiert gegen 1
        (gestrichelte Linie). Egal wie schmal wir das grüne Band machen: Nur
        die ersten paar Punkte (orange: {nOutside}) liegen außerhalb. Alle
        späteren bleiben endgültig darin.
      </p>
    </div>
  );
}
