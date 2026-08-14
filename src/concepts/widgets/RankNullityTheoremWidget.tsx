import { useState } from "react";
import { M, Slider } from "../../lib";

export function DimensionBudgetWidget() {
  const n = 4;
  const [r, setR] = useState(2);
  const w = 280;
  const barH = 26;
  const seg = (w - 20) / n;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Rang r"
        value={r}
        onChange={(v) => setR(Math.round(v))}
        min={0}
        max={n}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <svg width={w} height={70} className="rounded bg-slate-900/60">
        {Array.from({ length: n }, (_, i) => (
          <rect
            key={i}
            x={10 + i * seg}
            y={18}
            width={seg - 3}
            height={barH}
            rx={3}
            fill={i < r ? "#38bdf8" : "#f472b6"}
          />
        ))}
        <text x={10} y={12} fill="#e2e8f0" fontSize={11}>
          n = {n} Eingangsdimensionen
        </text>
        <text x={10} y={60} fill="#38bdf8" fontSize={11}>
          überleben: rg = {r}
        </text>
        <text x={w - 10} y={60} fill="#f472b6" fontSize={11} textAnchor="end">
          plattgedrückt: dim Kern = {n - r}
        </text>
      </svg>
      <p className="mt-1 text-xs opacity-80">
        Ein festes Budget von <M>{"n = 4"}</M> Eingangsdimensionen für eine
        Abbildung <M>{"\\R^4 \\to \\R^m"}</M>: Was der Rang gewinnt, verliert
        der Kern; die beiden summieren sich immer zu 4.
      </p>
    </div>
  );
}
