import { useState } from "react";
import { M, Slider } from "../../lib";

const XSTAR = 1;
const f = (x: number) => (x * x * x * x) / 4 + (x * x * x) / 3 - x * x;
const FSTAR = f(XSTAR); // = -5/12: lokales (nicht globales) Minimum

export function NeighborhoodWidget() {
  const [eps, setEps] = useState(0.6);
  const W = 280;
  const H = 190;
  const x0 = -2.8;
  const x1 = 2.0;
  const y0 = -3.1;
  const y1 = 3.1;
  const X = (x: number) => ((x - x0) / (x1 - x0)) * W;
  const Y = (y: number) => H - ((y - y0) / (y1 - y0)) * H;
  const lo = Math.max(x0, XSTAR - eps);
  const hi = Math.min(x1, XSTAR + eps);
  // gilt f(x) >= f(x*) auf der ganzen Umgebung?
  let holds = true;
  for (let i = 0; i <= 400; i++) {
    const x = lo + ((hi - lo) * i) / 400;
    if (f(x) < FSTAR - 1e-9) {
      holds = false;
      break;
    }
  }
  const curve: string[] = [];
  for (let i = 0; i <= 300; i++) {
    const x = x0 + ((x1 - x0) * i) / 300;
    curve.push(`${X(x)},${Y(Math.max(y0, Math.min(y1, f(x))))}`);
  }
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Radius ε" value={eps} onChange={setEps} min={0.1} max={2.4} step={0.05} />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="max-w-full rounded border border-slate-500 bg-white"
      >
        <rect
          x={X(lo)}
          y={0}
          width={X(hi) - X(lo)}
          height={H}
          fill={holds ? "#059669" : "#dc2626"}
          opacity={0.15}
        />
        <line x1={0} y1={Y(0)} x2={W} y2={Y(0)} stroke="#94a3b8" strokeWidth={1} />
        <line x1={X(0)} y1={0} x2={X(0)} y2={H} stroke="#94a3b8" strokeWidth={1} />
        {[-2, -1, 1, 2].map((v) => (
          <text key={v} x={X(v)} y={Y(0) + 11} fontSize={9} fill="#64748b" textAnchor="middle">
            {v}
          </text>
        ))}
        <line
          x1={0}
          y1={Y(FSTAR)}
          x2={W}
          y2={Y(FSTAR)}
          stroke="#64748b"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <polyline points={curve.join(" ")} fill="none" stroke="#0284c7" strokeWidth={2} />
        <circle cx={X(XSTAR)} cy={Y(FSTAR)} r={4} fill="#dc2626" />
        <text x={X(XSTAR) + 6} y={Y(FSTAR) + 12} fontSize={10} fill="#dc2626">
          x*
        </text>
      </svg>
      <p className="mt-1 text-xs">
        Schattiert: die Umgebung <M>{"(x^* - \\varepsilon,\\; x^* + \\varepsilon)"}</M> der
        lokalen Minimalstelle <M>{"x^* = 1"}</M> von <M>{"f(x) = x^4/4 + x^3/3 - x^2"}</M>.{" "}
        {holds
          ? "Hier gilt f(x) ≥ f(x*) überall in der Umgebung. Die Bedingung für ein lokales Minimum ist erfüllt."
          : "Zu groß: Die Umgebung erreicht jetzt Punkte mit f(x) < f(x*) (links vom Hügel), dieses ε funktioniert also nicht, ein kleineres aber schon."}
      </p>
    </div>
  );
}
