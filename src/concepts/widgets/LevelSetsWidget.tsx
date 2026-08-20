/**
 * Konzept-Widget `level-sets`.
 *
 * DIE EINE EINSICHT: Der Gradient steht in JEDEM Punkt senkrecht auf seiner
 * Höhenlinie — auch dann, wenn die Höhenlinien keine Kreise mehr sind, der Pfeil
 * also nicht mehr radial zeigt.
 *
 * FARBROLLEN: blau = die betrachtete Höhenlinie φ = 0,5 (die übrigen grau);
 * rot = der Gradient ∇φ; grün = die Tangente an die Höhenlinie. Achsen, Ticks
 * und Beschriftungen aus den Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau; Ziehen über `useDrag` aus der Lib (der Punkt
 * bleibt dabei per Winkelparametrisierung auf der Höhenlinie).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   φ(x) = (x₁² + λx₂²)/2, ∇φ = (x₁, λx₂). Der parametrisierte Punkt
 *   (√(2L)·cos θ, √(2L/λ)·sin θ) liegt für λ ∈ {0,4; 1; 1,55; 2,5} und 32 Winkel
 *   exakt auf φ = L = 0,5, und ∇φᵀt = 0 für die Tangente t = (−∂₂φ, ∂₁φ).
 *   Voreinstellung λ = 1,8: die Höhenlinien sind echte Ellipsen, der Gradient
 *   zeigt dort NICHT radial — genau der Fall, um den es geht.
 */
import { useState } from "react";
import {
  Aufgabe,
  clamp,
  DragHandle,
  FMM_COLORS,
  fmtDe,
  Slider,
  useDrag,
  Verdikt,
  W_PANEL,
  W_TEXT,
} from "../../lib";

const W = 280;
const L = 0.5;

export function LevelSetWidget() {
  const [lam, setLam] = useState(1.8);
  const [th, setTh] = useState(0.9);
  const S = W / 5.2;
  const cx = W / 2;
  const cy = W / 2;
  const X = (x: number) => cx + x * S;
  const Y = (y: number) => cy - y * S;
  const ax = Math.sqrt(2 * L);
  const ay = Math.sqrt((2 * L) / lam);
  const p: [number, number] = [ax * Math.cos(th), ay * Math.sin(th)];
  const g: [number, number] = [p[0], lam * p[1]];
  const ng = Math.hypot(...g);
  const u: [number, number] = [(g[0] / ng) * 0.7, (g[1] / ng) * 0.7];
  const t: [number, number] = [-u[1] * 1.15, u[0] * 1.15];
  // Winkel zwischen Ortsvektor und Gradient: 0 nur, wenn die Linien Kreise sind.
  const nr = Math.hypot(...p);
  const cosRad = (p[0] * g[0] + p[1] * g[1]) / (nr * ng);
  const radial = Math.abs(cosRad) > 0.999;
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
    clamp: (q) => [clamp(q[0], -Math.PI, 2 * Math.PI), 0],
    onDrag: (q) => setTh(q[0]),
  });
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Ziehen wir den Punkt auf der blauen Höhenlinie und vergleichen wir Pfeil und Tangente.
      </Aufgabe>
      <svg
        {...drag.svgProps}
        viewBox={`0 0 ${W} ${W}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Höhenlinien von φ mit dem Gradienten und der Tangente am Punkt zum Winkel ${fmtDe(th, 2)}.`}
      >
        {[-1, 1].map((v) => (
          <g key={`t${v}`}>
            <line x1={X(v)} y1={Y(0) - 4} x2={X(v)} y2={Y(0) + 4} stroke="var(--w-axis)" />
            <text x={X(v)} y={Y(0) + 14} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
              {fmtDe(v, 0)}
            </text>
            <line x1={X(0) - 4} y1={Y(v)} x2={X(0) + 4} y2={Y(v)} stroke="var(--w-axis)" />
            <text x={X(0) - 6} y={Y(v) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtDe(v, 0)}
            </text>
          </g>
        ))}
        <line x1="4" y1={Y(0)} x2={W - 4} y2={Y(0)} stroke="var(--w-axis)" />
        <line x1={X(0)} y1="4" x2={X(0)} y2={W - 4} stroke="var(--w-axis)" />
        <text x={W - 4} y={Y(0) - 6} textAnchor="end" fontSize={10} fill="var(--w-muted)">
          x₁
        </text>
        <text x={X(0) + 6} y={13} fontSize={10} fill="var(--w-muted)">
          x₂
        </text>
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
        <text x={X(-ax) - 4} y={Y(0) - 9} textAnchor="end" fontSize={9} fill={FMM_COLORS.blau}>
          φ = 0,5
        </text>
        <line
          x1={X(p[0] - t[0])}
          y1={Y(p[1] - t[1])}
          x2={X(p[0] + t[0])}
          y2={Y(p[1] + t[1])}
          stroke={FMM_COLORS.gruen}
          strokeWidth="2"
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
        <text
          x={X(p[0] + 1.1 * u[0])}
          y={Y(p[1] + 1.1 * u[1]) + 3}
          fontSize={10}
          fill={FMM_COLORS.rot}
        >
          ∇φ
        </text>
        <DragHandle
          x={X(p[0])}
          y={Y(p[1])}
          farbe={FMM_COLORS.blau}
          aktiv={drag.dragging === "p"}
          {...drag.handleProps("p")}
        />
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        φ(x) = (x₁² + λx₂²)/2 · Blau: die Höhenlinie φ = 0,5; Grün: ihre Tangente; Rot: ∇φ.
      </p>
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
        {radial ? (
          <>
            Bei λ = {fmtDe(lam, 2)} sind die Höhenlinien hier Kreise (bzw. der Punkt liegt auf
            einer Hauptachse), und der Gradient zeigt radial nach außen. Verstellen wir λ, dann
            kippt der Pfeil aus der radialen Richtung heraus — senkrecht auf der grünen Tangente
            bleibt er trotzdem.
          </>
        ) : (
          <>
            ∇φ = ({fmtDe(g[0], 2)}; {fmtDe(g[1], 2)}) steht mit ‖∇φ‖ = {fmtDe(ng, 2)} senkrecht
            auf der grünen Tangente, obwohl er hier {fmtDe((Math.acos(Math.abs(cosRad)) * 180) / Math.PI, 0)}
            ° von der radialen Richtung abweicht. Senkrecht zur Höhenlinie heißt eben nicht
            „vom Ursprung weg“.
          </>
        )}
      </Verdikt>
    </div>
  );
}
