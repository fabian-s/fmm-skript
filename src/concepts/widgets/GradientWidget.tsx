/**
 * Konzept-Widget `gradient`.
 *
 * DIE EINE EINSICHT: Der transponierte Gradient zeigt in die Richtung des
 * stärksten Anstiegs und steht damit senkrecht auf der Höhenlinie durch den
 * Punkt; jede andere Richtung u mit ‖u‖₂ = 1 hat die kleinere Steigung
 * D_uφ = ∇φ(x) u. Der Gradient ist hier wie im ganzen Skript ein Zeilenvektor
 * (Definition 10.2.1), u eine Spalte, das Produkt also eine Zahl.
 *
 * FARBROLLEN: blau = Höhenlinien von φ; rot = der Gradient ∇φ; grün = die
 * gewählte Richtung u; orange = der gezogene Punkt. Achsen, Ticks und
 * Beschriftungen aus den Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau; Ziehen über `useDrag` aus der Lib.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   φ(x) = x₁² + 2x₂², ∇φ = (2x₁, 4x₂) — numerisch gegen zentrale Differenzen
 *   an drei Punkten geprüft. Die Höhenlinie φ = v ist die Ellipse mit den
 *   Halbachsen √v und √(v/2); gezeichnet sind v ∈ {0,5; 1; 2; 3}.
 *   D_uφ = ∇φ(x) u verschwindet genau tangential (Kontrollrechnung bei
 *   x = (0,9; 0,6): θ = 2,498). u = (cos θ, sin θ) hat immer die Länge 1 —
 *   ohne diese Normierung gäbe es kein Maximum von D_uφ.
 *   RANDFÄLLE (2026-08-26, drei Zustände statt zwei): im Ursprung ist ∇φ EXAKT
 *   null, dann ist D_uφ = 0 für jedes θ. Ein sehr kurzer, aber von null
 *   verschiedener Gradient (‖∇φ‖ < 0,08) bekommt ein eigenes Verdikt und wird
 *   nicht als „∇φ = 0“ ausgegeben; beide werden nicht als „tangential“ gemeldet.
 */
import { useState } from "react";
import {
  Aufgabe,
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
const M = 26; // Rand fuer Ticks
const S = 56; // Pixel pro Welteinheit

export function GradientWidget() {
  const [p, setP] = useState<[number, number]>([0.9, 0.6]);
  const [theta, setTheta] = useState(0.7);
  const mid = (W - M) / 2 + M / 2;
  const px = (x: number) => mid + x * S;
  const py = (y: number) => mid - y * S;
  const g: [number, number] = [2 * p[0], 4 * p[1]];
  const ng = Math.hypot(...g);
  const u: [number, number] = [Math.cos(theta), Math.sin(theta)];
  const d = g[0] * u[0] + g[1] * u[1];
  // Exakt stationär ist nur der Ursprung: ∇φ(x) = (2x₁, 4x₂) verschwindet genau
  // für x = 0, und die Regler (Schrittweite 0,05) treffen die 0 exakt.
  const stationaer = p[0] === 0 && p[1] === 0;
  const fastStationaer = !stationaer && ng < 0.08;
  const tangential = !stationaer && !fastStationaer && Math.abs(d) < 0.08;
  const drag = useDrag<"p">({
    feld: { x0: mid - 1.9 * S, y0: mid - 1.9 * S, w: 3.8 * S, h: 3.8 * S },
    welt: { x0: -1.9, x1: 1.9, y0: -1.9, y1: 1.9 },
    clamp: ([x, y]) => [Math.max(-1.5, Math.min(1.5, x)), Math.max(-1.2, Math.min(1.2, y))],
    onDrag: (q) => setP(q),
    greifPosition: () => p,
  });
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Ziehen wir den Punkt und drehen wir die Richtung u (immer Länge 1): Bei welchem θ
        wird D<sub>u</sub>φ am größten?
      </Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${W}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Höhenlinien von φ mit dem Gradienten und der Richtung u am Punkt (${fmtDe(p[0], 2)}; ${fmtDe(p[1], 2)}).`}
        {...drag.svgProps}
      >
        <defs>
          <marker id="grad-spitze" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0L5,3L0,6z" fill={FMM_COLORS.rot} />
          </marker>
        </defs>
        {[-1, 1].map((t) => (
          <g key={`t${t}`}>
            <line x1={px(t)} y1={py(0) - 4} x2={px(t)} y2={py(0) + 4} stroke="var(--w-axis)" />
            <text x={px(t)} y={py(0) + 14} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
              {fmtDe(t, 0)}
            </text>
            <line x1={px(0) - 4} y1={py(t)} x2={px(0) + 4} y2={py(t)} stroke="var(--w-axis)" />
            <text x={px(0) - 6} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtDe(t, 0)}
            </text>
          </g>
        ))}
        <line x1={M} y1={py(0)} x2={W - 4} y2={py(0)} stroke="var(--w-axis)" />
        <line x1={px(0)} y1="4" x2={px(0)} y2={W - M} stroke="var(--w-axis)" />
        <text x={W - 4} y={py(0) - 6} textAnchor="end" fontSize={10} fill="var(--w-muted)">
          x₁
        </text>
        <text x={px(0) + 6} y={13} fontSize={10} fill="var(--w-muted)">
          x₂
        </text>
        {[0.5, 1, 2, 3].map((v) => (
          <g key={v}>
            <ellipse
              cx={px(0)}
              cy={py(0)}
              rx={Math.sqrt(v) * S}
              ry={Math.sqrt(v / 2) * S}
              fill="none"
              stroke={FMM_COLORS.blau}
              opacity=".55"
            />
            <text
              x={px(Math.sqrt(v))}
              y={py(0) - 5}
              textAnchor="middle"
              fontSize={8}
              fill={FMM_COLORS.blau}
            >
              {fmtDe(v, 1)}
            </text>
          </g>
        ))}
        <line
          x1={px(p[0])}
          y1={py(p[1])}
          x2={px(p[0] + 0.7 * u[0])}
          y2={py(p[1] + 0.7 * u[1])}
          stroke={FMM_COLORS.gruen}
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <text
          x={px(p[0] + 0.78 * u[0])}
          y={py(p[1] + 0.78 * u[1]) + 3}
          fontSize={10}
          fill={FMM_COLORS.gruen}
        >
          u
        </text>
        {!stationaer && (
          <line
            x1={px(p[0])}
            y1={py(p[1])}
            x2={px(p[0] + 0.15 * g[0])}
            y2={py(p[1] + 0.15 * g[1])}
            stroke={FMM_COLORS.rot}
            strokeWidth="3"
            markerEnd="url(#grad-spitze)"
          />
        )}
        <DragHandle
          x={px(p[0])}
          y={py(p[1])}
          farbe={FMM_COLORS.orange}
          aktiv={drag.dragging === "p"}
          {...drag.handleProps("p")}
        />
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        φ(x) = x₁² + 2x₂² · Blau: Höhenlinien (mit ihrem Wert); Rot: ∇φ(x)ᵀ; Grün: Richtung
        u mit ‖u‖₂ = 1; Orange: der gezogene Punkt.
      </p>
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
      <Verdikt kind={stationaer || fastStationaer ? "warn" : tangential ? "ok" : "neutral"}>
        {stationaer ? (
          <>
            Im Ursprung ist ∇φ exakt null, der Punkt ist stationär. Dann verschwindet
            D<sub>u</sub>φ für jede Richtung, und „steilster Anstieg“ ergibt keinen Sinn mehr.
          </>
        ) : fastStationaer ? (
          <>
            ‖∇φ‖ = {fmtDe(ng, 3)} ist winzig, aber nicht null: Es gibt weiterhin genau eine
            Richtung des steilsten Anstiegs, sie ist nur kaum von den anderen zu
            unterscheiden. Exakt null wird ∇φ allein im Ursprung.
          </>
        ) : tangential ? (
          <>
            D<sub>u</sub>φ = {fmtDe(d, 2)} ≈ 0: u liegt tangential zur Höhenlinie, entlang dieser
            Richtung ändert sich φ lokal nicht. Der rote Pfeil steht senkrecht darauf.
          </>
        ) : (
          <>
            D<sub>u</sub>φ = {fmtDe(d, 2)}. Unter allen Richtungen mit ‖u‖<sub>2</sub> = 1 ist
            ‖∇φ‖ = {fmtDe(ng, 2)} der größte Wert, erreicht nur in der roten
            Gradientrichtung.
          </>
        )}
      </Verdikt>
    </div>
  );
}
