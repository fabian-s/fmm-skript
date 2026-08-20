import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt } from "../../lib";

export function DimensionBudgetWidget() {
  const n = 3;
  const [r, setR] = useState(2);
  const w = 280;
  const barH = 26;
  const seg = (w - 20) / n;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verschieben wir das Dimensionsbudget derselben Beispielmatrix A.</Aufgabe><Slider
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
            fill={i < r ? FMM_COLORS.blau : FMM_COLORS.violett}
          />
        ))}
        <text x={10} y={12} fill="#e2e8f0" fontSize={11}>
          A: ℝ³ → ℝ², n = {n}
        </text>
        <text x={10} y={60} fill="#38bdf8" fontSize={11}>
          überleben: rg = {r}
        </text>
        <text x={w - 10} y={60} fill="#f472b6" fontSize={11} textAnchor="end">
          plattgedrückt: dim Kern = {n - r}
        </text>
      </svg>
      <Verdikt>Für A = ((1, 0, 1), (0, 1, 1)) gilt tatsächlich Rang(A) = 2 und dim Ker(A) = 1; jedes gedachte Budget erfüllt Rang + Kerndimension = 3.</Verdikt>
    </div>
  );
}
