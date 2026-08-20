import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, fmtDe } from "../../lib";

/** EINSICHT: ρ entscheidet über Wachstum der Iterationsnorm. FARBEN: blau Iterierte, rot Start. PROVENIENZ: neu. VERIFIZIERT: verify/FB/verify-numbers.mjs, 2026-08-20 (‖x_k‖=s^k‖x₀‖). */
export function PowerSpiralWidget() {
  const [s, setS] = useState(0.85);
  const [th, setTh] = useState(0.55);
  // G = s * Rotation(th): Eigenwerte s e^{+-i th}, also rho(G) = s exakt.
  const K = 16;
  const pts: [number, number][] = [];
  let x = 1;
  let y = 0.4;
  for (let k = 0; k <= K; k++) {
    pts.push([x, y]);
    const nx = s * (Math.cos(th) * x - Math.sin(th) * y);
    const ny = s * (Math.sin(th) * x + Math.cos(th) * y);
    x = nx;
    y = ny;
  }
  // Fensterausschnitt so, dass jede Iterierte hineinpasst (nichts wird abgeschnitten)
  let h = 1.2;
  for (const [px, py] of pts) h = Math.max(h, Math.abs(px), Math.abs(py));
  h *= 1.15;
  const W = 260;
  const cx = W / 2;
  const S = W / (2 * h);
  const X = (v: number) => cx + v * S;
  const Y = (v: number) => cx - v * S;
  const nLast = Math.hypot(...pts[K]);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Bewegen wir s über die Schwelle 1 und vergleichen die Normkurve.</Aufgabe><div className="flex flex-wrap gap-x-6">
        <div className="w-44">
          <Slider label="Skalierung s = ρ(G)" value={s} onChange={setS} min={0.6} max={1.1} step={0.01} />
        </div>
        <div className="w-44">
          <Slider label="Drehwinkel θ" value={th} onChange={setTh} min={0} max={1.5} step={0.05} />
        </div>
      </div>
      <svg
        viewBox={`0 0 ${W} ${W}`}
        className="max-w-full h-auto rounded border"
        role="img" aria-label="Spirale einer Matrixiteration"
      >
        <line x1={0} y1={cx} x2={W} y2={cx} stroke="#94a3b8" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={W} stroke="#94a3b8" strokeWidth={1} />
        <text x={W - 6} y={cx - 5} fontSize={10} fill="#64748b" textAnchor="end">
          x₁
        </text>
        <text x={cx + 5} y={11} fontSize={10} fill="#64748b">
          x₂
        </text>
        <text x={X(h / 1.15)} y={cx + 12} fontSize={9} fill="#64748b" textAnchor="middle">
          {(h / 1.15).toFixed(1)}
        </text>
        <polyline
          points={pts.map(([px, py]) => `${X(px)},${Y(py)}`).join(" ")}
          fill="none"
          stroke={FMM_COLORS.blau}
          strokeWidth={1.2}
          opacity={0.6}
        />
        {pts.map(([px, py], k) => (
          <circle
            key={k}
            cx={X(px)}
            cy={Y(py)}
            r={k === 0 ? 4 : 2.6}
            fill={k === 0 ? FMM_COLORS.rot : FMM_COLORS.blau}
          />
        ))}
      </svg>
      <svg viewBox="0 0 260 54" className="max-w-full h-auto" role="img" aria-label="Normen der Iterierten">{pts.map(([px, py], k) => <circle key={k} cx={8 + 15 * k} cy={46 - 38 * Math.min(1, Math.hypot(px, py) / 1.5)} r="2.5" fill={FMM_COLORS.gruen} />)}</svg>
      <Verdikt kind={s < 1 ? "ok" : s > 1 ? "warn" : "neutral"}>ρ(G) = {fmtDe(s)}; nach 16 Schritten ist ‖x₁₆‖ = {fmtDe(nLast, 3)}. {s < 1 ? "Die Normen fallen." : s > 1 ? "Die Normen wachsen." : "Die Normen bleiben konstant."}</Verdikt>
    </div>
  );
}
