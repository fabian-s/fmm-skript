/** Einsicht: Der Gradient steht auf der Höhenlinie senkrecht und misst Richtungsableitungen. Farben: blau = Höhenlinien, rot = Gradient, orange = Punkt. Provenienz: Eigenbau. Zahlen: ∇φ=(2x₁,4x₂), D_uφ=∇φᵀu, verify-konzepte-C6/gradient.mjs (2026-08-19). */
import { useState } from "react";
import { Aufgabe, DragHandle, FMM_COLORS, Slider, useDrag, Verdikt, fmtDe } from "../../lib";
export function GradientWidget() {
  const [p, setP] = useState<[number, number]>([0.9, 0.6]);
  const [theta, setTheta] = useState(0.7);
  const S = 60,
    px = (x: number) => 130 + x * S,
    py = (y: number) => 130 - y * S;
  const g: [number, number] = [2 * p[0], 4 * p[1]],
    u: [number, number] = [Math.cos(theta), Math.sin(theta)],
    d = g[0] * u[0] + g[1] * u[1];
  const drag = useDrag<"p">({
    feld: { x0: 10, y0: 10, w: 240, h: 240 },
    welt: { x0: -2, x1: 2, y0: -2, y1: 2 },
    clamp: ([x, y]) => [Math.max(-1.5, Math.min(1.5, x)), Math.max(-1.2, Math.min(1.2, y))],
    onDrag: (q) => setP(q),
    greifPosition: () => p,
  });
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Ziehen wir den Punkt und drehen wir die Richtung u.</Aufgabe>
      <svg
        viewBox="0 0 260 260"
        className="max-w-full h-auto"
        role="img"
        aria-label="Höhenlinien und Gradient am gewählten Punkt."
        {...drag.svgProps}
      >
        {[0.5, 1, 2, 3].map((v) => (
          <ellipse
            key={v}
            cx="130"
            cy="130"
            rx={Math.sqrt(v) * S}
            ry={Math.sqrt(v / 2) * S}
            fill="none"
            stroke={FMM_COLORS.blau}
            opacity=".55"
          />
        ))}
        <line x1="10" y1="130" x2="250" y2="130" stroke="var(--w-axis)" />
        <line x1="130" y1="10" x2="130" y2="250" stroke="var(--w-axis)" />
        <line
          x1={px(p[0])}
          y1={py(p[1])}
          x2={px(p[0] + 0.15 * g[0])}
          y2={py(p[1] + 0.15 * g[1])}
          stroke={FMM_COLORS.rot}
          strokeWidth="3"
        />
        <line
          x1={px(p[0])}
          y1={py(p[1])}
          x2={px(p[0] + 0.7 * u[0])}
          y2={py(p[1] + 0.7 * u[1])}
          stroke={FMM_COLORS.gruen}
          strokeDasharray="4 3"
        />
        <DragHandle
          x={px(p[0])}
          y={py(p[1])}
          farbe={FMM_COLORS.orange}
          {...drag.handleProps("p")}
        />
      </svg>
      <Slider
        label="x₁"
        value={p[0]}
        onChange={(x) => setP([x, p[1]])}
        min={-1.5}
        max={1.5}
        step={0.05}
      />
      <Slider
        label="x₂"
        value={p[1]}
        onChange={(y) => setP([p[0], y])}
        min={-1.2}
        max={1.2}
        step={0.05}
      />
      <Slider label="Richtung θ" value={theta} onChange={setTheta} min={0} max={6.28} step={0.02} />
      <Verdikt kind={Math.abs(d) < 0.08 ? "ok" : "neutral"}>
        D<sub>u</sub>φ = {fmtDe(d, 2)}.{" "}
        {Math.abs(d) < 0.08
          ? "Die grüne Richtung ist tangential; dort ändert sich φ lokal nicht."
          : "Die rote Gradientrichtung liefert den stärksten Anstieg."}
      </Verdikt>
    </div>
  );
}
