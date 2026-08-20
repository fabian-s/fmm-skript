/** Einsicht: Der Gradient steht in jedem Punkt senkrecht auf seiner Höhenlinie. Farben: Blau=Höhenlinie/Punkt, Rot=Gradient, Grün=Tangente. Provenienz: bestehende Formel, Drag neu; keine Zahlenclaims (2026-08-20, FA). */
import { useState } from "react";
import {
  Aufgabe,
  clamp,
  FMM_COLORS,
  Slider,
  useDrag,
  DragHandle,
  Verdikt,
  W_PANEL,
  W_TEXT,
} from "../../lib";

export function LevelSetWidget() {
  const [lam, setLam] = useState(1);
  const [th, setTh] = useState(0.9);
  const W = 260,
    S = W / 4.4,
    cx = W / 2,
    cy = W / 2,
    L = 0.5;
  const X = (x: number) => cx + x * S,
    Y = (y: number) => cy - y * S,
    ax = Math.sqrt(2 * L),
    ay = Math.sqrt((2 * L) / lam);
  const p: [number, number] = [ax * Math.cos(th), ay * Math.sin(th)],
    g: [number, number] = [p[0], lam * p[1]],
    ng = Math.hypot(...g);
  const u: [number, number] = [(g[0] / ng) * 0.55, (g[1] / ng) * 0.55],
    t: [number, number] = [-u[1], u[0]];
  const drag = useDrag<"p">({
    toWorld: (a, b, svg) => {
      if (!svg) return null;
      const r = svg.getBoundingClientRect();
      return [
        Math.atan2(
          -(((b - r.top) / r.height) * W - cy) / S / ay,
          (((a - r.left) / r.width) * W - cx) / S / ax,
        ),
        0,
      ];
    },
    greifPosition: () => [th, 0],
    clamp: (q) => [clamp(q[0], 0, 2 * Math.PI), 0],
    onDrag: (q) => setTh(q[0]),
  });
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Ziehen wir den Punkt auf der mittleren Höhenlinie und vergleichen wir Pfeil und Tangente.
      </Aufgabe>
      <svg
        {...drag.svgProps}
        viewBox={`0 0 ${W} ${W}`}
        className="max-w-full h-auto"
        role="img"
        aria-label="Höhenlinien mit Punkt, Gradient und Tangente."
      >
        <line x1="0" y1={cy} x2={W} y2={cy} stroke="var(--w-axis)" />
        <line x1={cx} y1="0" x2={cx} y2={W} stroke="var(--w-axis)" />
        {[0.2, 0.5, 0.9].map((q) => (
          <ellipse
            key={q}
            cx={cx}
            cy={cy}
            rx={Math.sqrt(2 * q) * S}
            ry={Math.sqrt((2 * q) / lam) * S}
            fill="none"
            stroke={q === L ? FMM_COLORS.blau : "var(--w-muted)"}
            strokeWidth={q === L ? 2 : 1}
          />
        ))}
        <line
          x1={X(p[0] - t[0])}
          y1={Y(p[1] - t[1])}
          x2={X(p[0] + t[0])}
          y2={Y(p[1] + t[1])}
          stroke={FMM_COLORS.gruen}
          strokeDasharray="4 3"
        />
        <line
          x1={X(p[0])}
          y1={Y(p[1])}
          x2={X(p[0] + u[0])}
          y2={Y(p[1] + u[1])}
          stroke={FMM_COLORS.rot}
          strokeWidth="3"
        />
        <DragHandle
          x={X(p[0])}
          y={Y(p[1])}
          farbe={FMM_COLORS.blau}
          aktiv={drag.dragging === "p"}
          {...drag.handleProps("p")}
        />
      </svg>
      <p className={`text-xs ${W_TEXT}`}>Blau: Höhenlinie; Grün: Tangente; Rot: Gradient.</p>
      <Slider label="Streckung λ" value={lam} onChange={setLam} min={0.4} max={2.5} step={0.05} />
      <Slider
        label="Punktposition θ"
        value={th}
        onChange={setTh}
        min={0}
        max={2 * Math.PI}
        step={0.02}
      />
      <Verdikt kind="ok">
        Der rote Gradient bleibt senkrecht zur grünen Tangente, unabhängig von λ und der
        Punktposition.
      </Verdikt>
    </div>
  );
}
