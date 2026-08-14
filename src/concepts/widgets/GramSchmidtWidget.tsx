import { useState } from "react";
import { Slider } from "../../lib";

function ArrowG({
  x2,
  y2,
  cx,
  cy,
  color,
  label,
}: {
  x2: number;
  y2: number;
  cx: number;
  cy: number;
  color: string;
  label?: string;
}) {
  const ang = Math.atan2(y2 - cy, x2 - cx);
  const hx = (a: number) => x2 - 9 * Math.cos(ang + a);
  const hy = (a: number) => y2 - 9 * Math.sin(ang + a);
  return (
    <g stroke={color} fill={color}>
      <line x1={cx} y1={cy} x2={x2} y2={y2} strokeWidth={2.2} />
      <polygon
        points={`${x2},${y2} ${hx(-0.4)},${hy(-0.4)} ${hx(0.4)},${hy(0.4)}`}
        stroke="none"
      />
      {label && (
        <text x={x2 + 5} y={y2 - 5} stroke="none" fontSize={12}>
          {label}
        </text>
      )}
    </g>
  );
}

export function GsWidget() {
  const [phi, setPhi] = useState(1.1);
  const size = 260;
  const half = 2.6;
  const px = (x: number) => size / 2 + (x * size) / (2 * half);
  const py = (y: number) => size / 2 - (y * size) / (2 * half);
  const v1: [number, number] = [2.0, 0.6];
  const v2: [number, number] = [1.8 * Math.cos(phi), 1.8 * Math.sin(phi)];
  const t = (v2[0] * v1[0] + v2[1] * v1[1]) / (v1[0] * v1[0] + v1[1] * v1[1]);
  const p: [number, number] = [t * v1[0], t * v1[1]]; // Projektion von v2 auf v1
  const u2: [number, number] = [v2[0] - p[0], v2[1] - p[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung von v₂" value={phi} onChange={setPhi} min={0} max={6.28} />
      <svg
        width={size}
        height={size}
        className="rounded border border-slate-300 bg-white"
      >
        <line x1={0} y1={py(0)} x2={size} y2={py(0)} stroke="#94a3b8" />
        <line x1={px(0)} y1={0} x2={px(0)} y2={size} stroke="#94a3b8" />
        {/* Fußpunkt der Projektion und die abgezogene Komponente */}
        <line
          x1={px(v2[0])}
          y1={py(v2[1])}
          x2={px(p[0])}
          y2={py(p[1])}
          stroke="#94a3b8"
          strokeDasharray="4 3"
        />
        <ArrowG cx={px(0)} cy={py(0)} x2={px(v1[0])} y2={py(v1[1])} color="#0284c7" label="v₁" />
        <ArrowG cx={px(0)} cy={py(0)} x2={px(v2[0])} y2={py(v2[1])} color="#64748b" label="v₂" />
        <ArrowG cx={px(0)} cy={py(0)} x2={px(p[0])} y2={py(p[1])} color="#f59e0b" label="proj" />
        <ArrowG cx={px(0)} cy={py(0)} x2={px(u2[0])} y2={py(u2[1])} color="#dc2626" label="u₂" />
      </svg>
      <p className="mt-1 text-xs">
        u₂ = v₂ − proj (orange) ist das, was von v₂ übrig bleibt, wenn wir
        seinen „Schatten“ entlang v₁ entfernen; nach Konstruktion gilt
        u₂ ⊥ v₁, egal in welche Richtung v₂ zeigt.
      </p>
    </div>
  );
}
