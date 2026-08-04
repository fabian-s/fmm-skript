import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/**
 * Contour plot of φ(x) = x₁² + 2x₂² with a movable point and its gradient
 * arrow — the arrow is perpendicular to the contour and points uphill.
 */
function GradientWidget() {
  const [a, setA] = useState(0.9);
  const [b, setB] = useState(0.6);
  const g: [number, number] = [2 * a, 4 * b];
  // world [-2,2]^2 mapped to a 240x240 viewBox with 10px padding
  const S = 60; // px per world unit
  const px = (x: number) => 130 + x * S;
  const py = (y: number) => 130 - y * S;
  const levels = [0.5, 1, 2, 3];
  const arrowScale = 0.15;
  const tip: [number, number] = [a + arrowScale * g[0], b + arrowScale * g[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x₁" value={a} onChange={setA} min={-1.5} max={1.5} step={0.05} />
      <Slider label="x₂" value={b} onChange={setB} min={-1.2} max={1.2} step={0.05} />
      <p className="my-1 font-mono text-xs">
        φ(x) = {(a * a + 2 * b * b).toFixed(2)}, ∇φ(x) = ({g[0].toFixed(2)},{" "}
        {g[1].toFixed(2)})ᵀ
      </p>
      <svg
        viewBox="0 0 260 260"
        width={260}
        height={260}
        className="rounded border border-slate-600 bg-white"
      >
        {/* axes */}
        <line x1={px(-2)} y1={py(0)} x2={px(2)} y2={py(0)} stroke="#94a3b8" />
        <line x1={px(0)} y1={py(-2)} x2={px(0)} y2={py(2)} stroke="#94a3b8" />
        <text x={px(1.8)} y={py(0) - 5} fontSize={11} fill="#475569">
          x₁
        </text>
        <text x={px(0) + 5} y={py(1.8)} fontSize={11} fill="#475569">
          x₂
        </text>
        {[-2, -1, 1, 2].map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="#94a3b8" />
            <text x={px(t) - 4} y={py(0) + 14} fontSize={9} fill="#64748b">
              {t}
            </text>
          </g>
        ))}
        {/* contours x² + 2y² = k are ellipses with semi-axes √k, √(k/2) */}
        {levels.map((k) => (
          <ellipse
            key={k}
            cx={px(0)}
            cy={py(0)}
            rx={Math.sqrt(k) * S}
            ry={Math.sqrt(k / 2) * S}
            fill="none"
            stroke="#7dd3fc"
            strokeWidth={1.5}
          />
        ))}
        {/* gradient arrow */}
        <defs>
          <marker
            id="grad-arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 z" fill="#dc2626" />
          </marker>
        </defs>
        <line
          x1={px(a)}
          y1={py(b)}
          x2={px(tip[0])}
          y2={py(tip[1])}
          stroke="#dc2626"
          strokeWidth={2.5}
          markerEnd="url(#grad-arrowhead)"
        />
        <circle cx={px(a)} cy={py(b)} r={4} fill="#f59e0b" />
      </svg>
      <p className="mt-1 text-xs text-slate-300">
        Die blauen Kurven sind Höhenlinien von φ(x) = x₁² + 2x₂² (Niveaus 0.5,
        1, 2, 3). Der rote Pfeil ∇φ = (2x₁, 4x₂)ᵀ kreuzt die Höhenlinie immer
        im rechten Winkel und zeigt zu höheren Werten; im Minimum in der Mitte
        schrumpft er auf null.
      </p>
    </div>
  );
}

registerConcept({
  id: "gradient",
  title: "Gradient",
  body: (
    <>
      <p>
        Die <ConceptLink id="derivative">Ableitung</ConceptLink>{" "}
        <M>{"f'(x)"}</M> einer Funktion in einer Variablen kennen wir. Für
        eine Funktion mehrerer Variablen, <M>{"\\phi: \\R^n \\to \\R"}</M>,
        übernimmt der <em>Gradient</em> diese Rolle: Er ist der{" "}
        <ConceptLink id="vector">Vektor</ConceptLink>, der alle{" "}
        <ConceptLink id="partial-derivative">
          partiellen Ableitungen
        </ConceptLink>{" "}
        einsammelt,
      </p>
      <MD>
        {"\\nabla \\phi(\\bx) = \\left( \\frac{\\partial \\phi(\\bx)}{\\partial x_1}, \\ldots, \\frac{\\partial \\phi(\\bx)}{\\partial x_n} \\right)^T ."}
      </MD>
      <p>
        Zum Beispiel hat <M>{"\\phi(\\bx) = x_1^2 + 2x_2^2"}</M> den
        Gradienten <M>{"\\nabla \\phi(\\bx) = (2x_1,\\, 4x_2)^T"}</M>.
        Geometrisch zeigt der Gradient in die Richtung des steilsten Anstiegs
        von <M>{"\\phi"}</M>, und seine Länge sagt, wie steil es dort bergauf
        geht. So wie <M>{"f'(x) = 0"}</M> am Boden eines eindimensionalen Tals
        gilt, kann ein glattes <M>{"\\phi"}</M> ein Minimum nur dort haben, wo{" "}
        <M>{"\\nabla \\phi(\\bx) = \\bzero"}</M> ist — jede
        Aufwärtsrichtung ist erloschen. Den Gradienten der Quadratsumme null
        zu setzen ist genau die Herleitung der Normalengleichungen.
      </p>
      <GradientWidget />
    </>
  ),
});
