import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

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

function NormWidget() {
  const [x1, setX1] = useState(1.8);
  const [x2, setX2] = useState(1.1);
  const size = 260;
  const half = 2.6;
  const px = (x: number) => size / 2 + (x * size) / (2 * half);
  const py = (y: number) => size / 2 - (y * size) / (2 * half);
  const n = Math.hypot(x1, x2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x₁" value={x1} onChange={setX1} min={-2.5} max={2.5} />
      <Slider label="x₂" value={x2} onChange={setX2} min={-2.5} max={2.5} />
      <svg
        width={size}
        height={size}
        className="rounded border border-slate-300 bg-white"
      >
        <line x1={0} y1={py(0)} x2={size} y2={py(0)} stroke="#94a3b8" />
        <line x1={px(0)} y1={0} x2={px(0)} y2={size} stroke="#94a3b8" />
        <circle
          cx={px(0)}
          cy={py(0)}
          r={size / (2 * half)}
          fill="none"
          stroke="#64748b"
          strokeDasharray="4 3"
        />
        {n > 0.05 && (
          <ArrowG
            cx={px(0)}
            cy={py(0)}
            x2={px(x1 / n)}
            y2={py(x2 / n)}
            color="#dc2626"
            label="x/‖x‖"
          />
        )}
        <ArrowG cx={px(0)} cy={py(0)} x2={px(x1)} y2={py(x2)} color="#0284c7" label="x" />
      </svg>
      <p className="mt-1 text-xs">
        ‖x‖ = {n.toFixed(2)}. Teilen wir durch die Norm, landet x auf dem
        gestrichelten Einheitskreis (rot); die Richtung bleibt dabei
        unverändert.
      </p>
    </div>
  );
}

registerConcept({
  id: "norm",
  title: "Norm",
  body: (
    <>
      <p>
        Die <em>Norm</em> <M>{"\\|\\bx\\|"}</M> misst die Länge eines{" "}
        <ConceptLink id="vector">Vektors</ConceptLink>. Die
        Standard-Variante (die euklidische Norm) zieht die Wurzel aus dem{" "}
        <ConceptLink id="dot-product">Skalarprodukt</ConceptLink> des Vektors
        mit sich selbst, also Pythagoras in beliebig vielen Dimensionen:
      </p>
      <MD>
        {"\\|\\bx\\| = \\sqrt{\\bx^{\\top}\\bx} = \\sqrt{x_1^2 + \\cdots + x_n^2}, \\qquad \\left\\| \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} \\right\\| = \\sqrt{9 + 16} = 5."}
      </MD>
      <p>
        Drei Regeln charakterisieren eine Norm: Sie ist positiv, außer wenn{" "}
        <M>{"\\bx"}</M> der Nullvektor ist; Skalierung gehorcht{" "}
        <M>{"\\|\\alpha\\bx\\| = |\\alpha| \\|\\bx\\|"}</M>; und Umwege lohnen
        sich nie (
        <M>{"\\|\\bx+\\by\\| \\leq \\|\\bx\\| + \\|\\by\\|"}</M>
        ). Teilen wir einen Vektor (ungleich Null) durch seine Norm,{" "}
        <em>normieren</em> wir ihn auf Länge <M>{"1"}</M>. So lässt sich zum
        Beispiel der PageRank-Eigenvektor auf einen eindeutigen
        Repräsentanten mit <M>{"\\|\\bx^*\\| = 1"}</M> festlegen (vgl. MML
        §4.2).
      </p>
      <NormWidget />
    </>
  ),
});
