import { useState } from "react";
import { Slider } from "../../lib";

/** Abschneiden des Singulärwert-Spektrums: behaltene vs. verworfene σᵢ + Fehler σ_{k+1}. */
export function TruncateWidget() {
  const sigmas = [10, 6, 2.5, 0.9, 0.3, 0.08];
  const [k, setK] = useState(2);
  const w = 34;
  const gap = 10;
  const h = 110;
  const maxS = sigmas[0];
  const err = k < sigmas.length ? sigmas[k] : 0;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="Rang k"
        value={k}
        onChange={setK}
        min={1}
        max={6}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <svg
        width={sigmas.length * (w + gap) + 10}
        height={h + 22}
        role="img"
        aria-label="Singulärwert-Spektrum mit Abschneidegrenze"
      >
        {sigmas.map((s, i) => {
          const bh = Math.max(2, (s / maxS) * h);
          const kept = i < k;
          return (
            <g key={i}>
              <rect
                x={5 + i * (w + gap)}
                y={h - bh}
                width={w}
                height={bh}
                fill={kept ? "#0072B2" : "#64748b"}
                opacity={kept ? 1 : 0.45}
              />
              <text
                x={5 + i * (w + gap) + w / 2}
                y={h + 14}
                textAnchor="middle"
                className="fill-slate-300"
                fontSize={11}
              >
                σ{i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="font-mono text-xs">
        ‖A − A<sub>k</sub>‖₂ = σ<sub>{k + 1 <= sigmas.length ? k + 1 : "r+1"}</sub> ={" "}
        {err.toFixed(2)} &nbsp;&nbsp;(relativ: {(err / maxS).toExponential(1)})
      </div>
      <p className="mt-1 text-xs opacity-80">
        Blaue Singulärwerte behalten wir, graue setzen wir auf Null. Der Approximationsfehler
        ist immer der größte verworfene Singulärwert. Fällt das Spektrum schnell ab, kostet
        das Abschneiden fast nichts.
      </p>
    </div>
  );
}
