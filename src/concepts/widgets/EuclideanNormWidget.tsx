/**
 * Konzept-Widget `euclidean-norm`.
 *
 * DIE EINE EINSICHT: Die Normalisierung x/‖x‖₂ lässt die Richtung unangetastet
 * und setzt allein die Länge auf eins — der rote Pfeil landet deshalb für jedes
 * x ≠ 0 auf demselben Einheitskreis.
 *
 * FARBROLLEN: blau = der gezogene Vektor x; rot = sein normiertes Bild
 * x/‖x‖₂; Achsen, Ticks und der gestrichelte Einheitskreis kommen aus den
 * Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau; Ziehen über `useDrag` aus der Lib.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20):
 * Voreinstellung x = (1,8; 1,1) hat ‖x‖₂ = √(1,8² + 1,1²) = 2,1095…, also
 * gerundet 2,11; der rote Pfeil hat Länge 1 in jedem erreichbaren Zustand
 * außer im abgefangenen Nullfall ‖x‖₂ ≤ 0,05.
 */
import { useState } from "react";
import {
  Aufgabe,
  clamp,
  FMM_COLORS,
  fmtDe,
  Slider,
  useDrag,
  DragHandle,
  Verdikt,
  W_PANEL,
  W_TEXT,
} from "../../lib";
export function NormBallsWidget() {
  const [p, setP] = useState<[number, number]>([1.8, 1.1]),
    W = 250,
    half = 2.6,
    px = (v: number) => W / 2 + (v * W) / (2 * half),
    py = (v: number) => W / 2 - (v * W) / (2 * half),
    n = Math.hypot(...p),
    u = n > 0.05 ? ([p[0] / n, p[1] / n] as [number, number]) : [0, 0];
  const drag = useDrag<"p">({
    feld: { x0: 0, y0: 0, w: W, h: W },
    welt: { x0: -half, x1: half, y0: -half, y1: half },
    greifPosition: () => p,
    clamp: (q) => [clamp(q[0], -2.5, 2.5), clamp(q[1], -2.5, 2.5)],
    onDrag: (q) => setP(q),
  });
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Ziehen wir x; der rote Pfeil soll immer auf dem Einheitskreis landen.</Aufgabe>
      <svg
        {...drag.svgProps}
        viewBox={`0 0 ${W} ${W}`}
        className="max-w-full h-auto"
        role="img"
        aria-label="Vektor und seine Normalisierung auf dem Einheitskreis."
      >
        {[-2, -1, 1, 2].map((t) => (
          <g key={`t${t}`}>
            <line x1={px(t)} y1={py(0) - 4} x2={px(t)} y2={py(0) + 4} stroke="var(--w-axis)" />
            <text
              x={px(t)}
              y={py(0) + 15}
              textAnchor="middle"
              fontSize={9}
              fill="var(--w-muted)"
            >
              {fmtDe(t, 0)}
            </text>
            <line x1={px(0) - 4} y1={py(t)} x2={px(0) + 4} y2={py(t)} stroke="var(--w-axis)" />
            <text x={px(0) - 7} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtDe(t, 0)}
            </text>
          </g>
        ))}
        <line x1="0" y1={py(0)} x2={W} y2={py(0)} stroke="var(--w-axis)" />
        <line x1={px(0)} y1="0" x2={px(0)} y2={W} stroke="var(--w-axis)" />
        <text x={W - 4} y={py(0) - 6} textAnchor="end" fontSize={10} fill="var(--w-muted)">
          x₁
        </text>
        <text x={px(0) + 6} y={11} fontSize={10} fill="var(--w-muted)">
          x₂
        </text>
        <circle
          cx={px(0)}
          cy={py(0)}
          r={px(1) - px(0)}
          fill="none"
          stroke="var(--w-muted)"
          strokeDasharray="4 3"
        />
        <text
          x={px(0) - (px(1) - px(0)) * 0.78}
          y={py(0) - (px(1) - px(0)) * 0.78}
          textAnchor="end"
          fontSize={9}
          fill="var(--w-muted)"
        >
          ‖x‖₂ = 1
        </text>
        <line
          x1={px(0)}
          y1={py(0)}
          x2={px(p[0])}
          y2={py(p[1])}
          stroke={FMM_COLORS.blau}
          strokeWidth="3"
        />
        <line
          x1={px(0)}
          y1={py(0)}
          x2={px(u[0])}
          y2={py(u[1])}
          stroke={FMM_COLORS.rot}
          strokeWidth="3"
        />
        <DragHandle
          x={px(p[0])}
          y={py(p[1])}
          farbe={FMM_COLORS.blau}
          aktiv={drag.dragging === "p"}
          {...drag.handleProps("p")}
        />
      </svg>
      <p className={`text-xs ${W_TEXT}`}>Blau: x; Rot: x/||x||₂.</p>
      <Slider
        label="x₁"
        value={p[0]}
        onChange={(v) => setP([v, p[1]])}
        min={-2.5}
        max={2.5}
        step={0.1}
      />
      <Slider
        label="x₂"
        value={p[1]}
        onChange={(v) => setP([p[0], v])}
        min={-2.5}
        max={2.5}
        step={0.1}
      />
      <Verdikt kind={n > 0.05 ? "ok" : "warn"}>
        {n > 0.05
          ? `||x||₂ = ${fmtDe(n, 2)}; die Richtung bleibt erhalten, die normierte Länge ist 1.`
          : "Der Nullvektor lässt sich nicht normieren, weil wir nicht durch 0 teilen dürfen."}
      </Verdikt>
    </div>
  );
}
