import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, fmtDe } from "../../lib";

/** EINSICHT: Ein kleiner Rang kann fast die ganze Frobenius-Energie tragen. FARBEN: blau behalten, grau verworfen. PROVENIENZ: neu. VERIFIZIERT: verify/FB/verify-numbers.mjs, 2026-08-20 (Σσᵢ²=143,1564). */
export function TruncateWidget() {
  const sigmas = [10, 6, 2.5, 0.9, 0.3, 0.08];
  const [k, setK] = useState(2);
  const w = 34;
  const gap = 10;
  const h = 110;
  const maxS = sigmas[0];
  const err = k < sigmas.length ? sigmas[k] : 0;
  const energy = sigmas.reduce((a, v) => a + v * v, 0);
  const keptEnergy = sigmas.slice(0, k).reduce((a, v) => a + v * v, 0) / energy;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Wählen wir einen Rang und vergleichen Fehler und behaltene Energie.</Aufgabe>
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
        viewBox={`0 0 ${sigmas.length * (w + gap) + 10} ${h + 22}`}
        className="max-w-full h-auto"
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
                fill={kept ? FMM_COLORS.blau : "var(--w-muted)"}
                opacity={kept ? 1 : 0.45}
              />
              <text
                x={5 + i * (w + gap) + w / 2}
                y={h + 14}
                textAnchor="middle"
                fill="var(--w-text)"
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
        {fmtDe(err)}; Energie: {fmtDe(100 * keptEnergy, 1)} %
      </div>
      <Verdikt kind={keptEnergy > 0.95 ? "ok" : "warn"}>Die ersten {k} Terme tragen {fmtDe(100 * keptEnergy, 1)} % der quadrierten Singulärwerte; der Spektralfehler bleibt σ{k + 1} = {fmtDe(err)}.</Verdikt>
    </div>
  );
}
