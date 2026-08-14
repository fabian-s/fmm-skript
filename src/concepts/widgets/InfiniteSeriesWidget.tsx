import { useState } from "react";
import { Slider } from "../../lib";

/** Balken, der sich in Richtung 2 füllt, während sich die Partialsummen 1 + 1/2 + 1/4 + … ansammeln. */
export function PartialSumBar() {
  const [n, setN] = useState(3);
  const terms = Array.from({ length: n }, (_, k) => Math.pow(0.5, k));
  const partial = terms.reduce((s, t) => s + t, 0);
  const W = 280;
  const H = 34;
  const scale = W / 2; // Zielwert 2 füllt den ganzen Balken
  let xPos = 0;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Summanden n"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={1}
        max={12}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <svg width={W} height={H} className="rounded bg-white">
        {terms.map((t, k) => {
          const x = xPos;
          xPos += t * scale;
          return (
            <rect
              key={k}
              x={x}
              y={6}
              width={Math.max(t * scale - 1, 0.5)}
              height={H - 12}
              fill={k % 2 === 0 ? "#0284c7" : "#38bdf8"}
            />
          );
        })}
        <line x1={W - 1} y1={0} x2={W - 1} y2={H} stroke="#dc2626" strokeWidth={2} />
      </svg>
      <div className="mt-1 font-mono text-xs">
        S_{n} = {partial.toFixed(4)} → 2 (rote Linie)
      </div>
    </div>
  );
}
