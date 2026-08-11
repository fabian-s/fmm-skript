/** Konzept-Tooltip: stetige Funktion (kleine Eingabeänderung, kleine Ausgabeänderung). */
import { useState } from "react";
import { M, Slider } from "../../lib";

export function JumpWidget() {
  const [x0, setX0] = useState(-0.6);
  const W = 280;
  const H = 150;
  const X = (x: number) => ((x + 2) / 4) * W;
  const Y = (y: number) => H - y * H;
  const cont = (x: number) => 0.5 + 0.3 * Math.sin(1.8 * x);
  const jump = (x: number) => (x < 0 ? 0.25 : 0.72);
  const contPts = Array.from({ length: 81 }, (_, i) => {
    const x = -2 + (4 * i) / 80;
    return `${X(x)},${Y(cont(x))}`;
  }).join(" ");
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Schieben wir <M>{"x_0"}</M>: der blaue Ausgabewert gleitet mit, aber
        der rote springt, sobald <M>{"x_0"}</M> die <M>{"0"}</M> überquert;
        die rote Funktion ist dort <em>nicht</em> stetig.
      </p>
      <Slider label="x₀" value={x0} onChange={setX0} min={-2} max={2} step={0.02} />
      <svg width={W} height={H} className="rounded bg-slate-900/60">
        <polyline points={contPts} fill="none" stroke="#60a5fa" strokeWidth={2} />
        <line x1={X(-2)} y1={Y(0.25)} x2={X(0)} y2={Y(0.25)} stroke="#f87171" strokeWidth={2} />
        <line x1={X(0)} y1={Y(0.72)} x2={X(2)} y2={Y(0.72)} stroke="#f87171" strokeWidth={2} />
        <circle cx={X(0)} cy={Y(0.25)} r={4} fill="#0f172a" stroke="#f87171" strokeWidth={2} />
        <circle cx={X(0)} cy={Y(0.72)} r={4} fill="#f87171" />
        <circle cx={X(x0)} cy={Y(cont(x0))} r={5} fill="#60a5fa" />
        <circle cx={X(x0)} cy={Y(jump(x0))} r={5} fill="#f87171" />
      </svg>
      <p className="mt-1 font-mono text-xs">
        blau f(x₀) = {cont(x0).toFixed(3)} &nbsp;|&nbsp; rot g(x₀) = {jump(x0).toFixed(2)}
      </p>
    </div>
  );
}
