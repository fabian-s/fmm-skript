import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt } from "../../lib";

export function TensorStackWidget() {
  const [layer, setLayer] = useState(1);
  const k = Math.round(layer);
  const cell = 26;
  const off = 16; // Tiefenversatz pro Schicht
  const gridSize = 3 * cell;
  const w = gridSize + 2 * off + 20;
  const h = gridSize + 2 * off + 20;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Wählen wir eine Schicht und zeigen auf ihre Zellen.</Aufgabe><Slider label="Schicht k" value={layer} onChange={setLayer} min={1} max={3} step={1} />
      <svg
        viewBox={`0 0 ${w} ${h}`} className="max-w-full h-auto rounded border" role="img" aria-label={`Tensor mit hervorgehobener Schicht ${k}`}
      >
        {[3, 2, 1].map((l) => {
          const dx = 10 + (l - 1) * off;
          const dy = 10 + (3 - l) * off;
          const active = l === k;
          return (
            <g key={l}>
              {Array.from({ length: 3 }, (_, i) =>
                Array.from({ length: 3 }, (_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={dx + j * cell}
                    y={dy + i * cell}
                    width={cell - 2}
                    height={cell - 2}
                    rx={3}
                    fill={active ? FMM_COLORS.blau : "var(--w-grid)"}
                    stroke={active ? FMM_COLORS.blau : "var(--w-muted)"}
                    onPointerEnter={(e) => e.currentTarget.setAttribute("aria-label", `a_${i + 1},${j + 1},${l}`)}
                    opacity={active ? 0.95 : 0.8}
                  />
                ))
              )}
            </g>
          );
        })}
      </svg>
      <Verdikt>Die hervorgehobene Zelle in Schicht {k} trägt die drei Adressbestandteile (i, j, {k}).</Verdikt>
    </div>
  );
}
