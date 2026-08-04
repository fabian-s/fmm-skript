/**
 * Konzept-Tooltip: Normalengleichungen (Stoff aus Heath §3.2).
 */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/**
 * Projection picture for a one-column A: slide the point x·a along span{a}
 * and watch the residual b − x·a become perpendicular exactly at the
 * normal-equations solution x = aᵀb / aᵀa.
 * World aspect is locked to pixel aspect so the right angle looks right.
 */
function ProjectionWidget() {
  const a: [number, number] = [2, 1];
  const b: [number, number] = [1, 2];
  const opt = (a[0] * b[0] + a[1] * b[1]) / (a[0] * a[0] + a[1] * a[1]); // 4/5
  const [x, setX] = useState(0.3);
  const p: [number, number] = [x * a[0], x * a[1]];
  const r: [number, number] = [b[0] - p[0], b[1] - p[1]];
  const aTr = a[0] * r[0] + a[1] * r[1];
  const rNorm = Math.hypot(r[0], r[1]);
  // world window (uniform scale S px/unit => angles are drawn true)
  const S = 60;
  const X0 = -0.9;
  const X1 = 3.7;
  const Y0 = -0.7;
  const Y1 = 2.5;
  const W = (X1 - X0) * S; // 264
  const H = (Y1 - Y0) * S; // 192
  const px = (v: number) => (v - X0) * S;
  const py = (v: number) => H - (v - Y0) * S;
  // small right-angle square at p, oriented along a and r (shown when ⊥)
  const na = Math.hypot(a[0], a[1]);
  const ua: [number, number] = [a[0] / na, a[1] / na];
  const ur: [number, number] = rNorm > 1e-9 ? [r[0] / rNorm, r[1] / rNorm] : [-ua[1], ua[0]];
  const q = 0.16;
  const showAngle = Math.abs(aTr) < 0.08;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Koeffizient x" value={x} onChange={setX} min={-0.3} max={1.6} step={0.01} />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="max-w-full rounded border border-slate-500 bg-white"
      >
        {/* axes */}
        <line x1={px(X0)} y1={py(0)} x2={px(X1)} y2={py(0)} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={px(0)} y1={py(Y0)} x2={px(0)} y2={py(Y1)} stroke="#cbd5e1" strokeWidth={1} />
        {/* span{a} line */}
        <line
          x1={px(-0.3 * a[0])}
          y1={py(-0.3 * a[1])}
          x2={px(1.8 * a[0])}
          y2={py(1.8 * a[1])}
          stroke="#94a3b8"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <text x={px(1.55 * a[0])} y={py(1.55 * a[1]) - 7} fontSize={10} fill="#64748b">
          span&#123;a&#125;
        </text>
        {/* right-angle marker */}
        {showAngle && (
          <polyline
            points={`${px(p[0] + q * ua[0])},${py(p[1] + q * ua[1])} ${px(p[0] + q * (ua[0] + ur[0]))},${py(p[1] + q * (ua[1] + ur[1]))} ${px(p[0] + q * ur[0])},${py(p[1] + q * ur[1])}`}
            fill="none"
            stroke="#059669"
            strokeWidth={1.5}
          />
        )}
        {/* vector b */}
        <line x1={px(0)} y1={py(0)} x2={px(b[0])} y2={py(b[1])} stroke="#0284c7" strokeWidth={2} />
        <circle cx={px(b[0])} cy={py(b[1])} r={3.5} fill="#0284c7" />
        <text x={px(b[0]) - 14} y={py(b[1]) - 4} fontSize={11} fill="#0284c7">
          b
        </text>
        {/* residual */}
        <line x1={px(p[0])} y1={py(p[1])} x2={px(b[0])} y2={py(b[1])} stroke="#dc2626" strokeWidth={2} />
        <text
          x={(px(p[0]) + px(b[0])) / 2 + 6}
          y={(py(p[1]) + py(b[1])) / 2}
          fontSize={11}
          fill="#dc2626"
        >
          r
        </text>
        {/* point x·a */}
        <circle cx={px(p[0])} cy={py(p[1])} r={3.5} fill="#f59e0b" />
        <text x={px(p[0]) + 5} y={py(p[1]) + 13} fontSize={11} fill="#b45309">
          x·a
        </text>
      </svg>
      <p className="mt-1 text-xs">
        <M>{`\\ba^{T}\\br = ${aTr.toFixed(2)}`}</M>,{" "}
        <M>{`\\|\\br\\|_2 = ${rNorm.toFixed(3)}`}</M>. Das Residuum ist genau
        dort am kürzesten, wo es senkrecht auf span&#123;<M>{"\\ba"}</M>&#125;
        steht, nämlich bei{" "}
        <M>{`x = \\ba^{T}\\bb / \\ba^{T}\\ba = ${opt.toFixed(1)}`}</M>{" "}
        — schieben wir den Regler dorthin, erscheint die grüne
        Rechte-Winkel-Markierung.
      </p>
    </div>
  );
}

registerConcept({
  id: "normal-equations",
  title: "Normalengleichungen",
  body: (
    <>
      <p>
        Wie lösen wir ein{" "}
        <ConceptLink id="linear-least-squares">lineares Kleinste-Quadrate-Problem</ConceptLink>{" "}
        eigentlich konkret? Die quadrierte Residuenlänge{" "}
        <M>{"\\phi(\\bx) = \\| \\bb - \\bA\\bx \\|_2^2"}</M>{" "}
        ist eine glatte Schüssel in <M>{"\\bx"}</M> — an ihrem Minimum muss
        also der <ConceptLink id="gradient">Gradient</ConceptLink>{" "}
        verschwinden. Wir berechnen{" "}
        <M>{"\\nabla \\phi(\\bx) = 2\\bA^{T}(\\bA\\bx - \\bb)"}</M>{" "}
        und setzen ihn auf Null; das liefert die{" "}
        <em>Normalengleichungen</em> (engl. <em>normal equations</em>):
      </p>
      <MD>
        {"\\bA^{T} \\bA \\, \\bx = \\bA^{T} \\bb,"}
      </MD>
      <p>
        ein quadratisches <M>{"n \\times n"}</M>-System, obwohl{" "}
        <M>{"\\bA"}</M> selbst hoch und schmal ist. Der Name kommt aus der
        Geometrie: Umgestellt zu{" "}
        <M>{"\\bA^{T}\\br = \\bzero"}</M> besagt das System, dass das Residuum{" "}
        <ConceptLink id="orthogonality">orthogonal</ConceptLink> („normal“) zu
        jeder Spalte von <M>{"\\bA"}</M> stehen muss — das beste{" "}
        <M>{"\\bA\\bx"}</M> ist der Fußpunkt des Lots von{" "}
        <M>{"\\bb"}</M> auf den <ConceptLink id="span">Spann</ConceptLink> der
        Spalten. Für das Beispiel einer Ausgleichsgeraden durch drei
        Datenpunkte (vgl. Heath Kap. 3) ergibt sich, mit den{" "}
        <ConceptLink id="transpose">transponierten</ConceptLink> Faktoren
        ausmultipliziert:
      </p>
      <MD>
        {"\\begin{bmatrix} 3 & 6 \\\\ 6 & 14 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 11 \\end{bmatrix} \\quad\\Rightarrow\\quad \\bx = \\begin{bmatrix} 2/3 \\\\ 1/2 \\end{bmatrix}."}
      </MD>
      <p>
        Die Matrix <M>{"\\bA^{T}\\bA"}</M> ist{" "}
        <ConceptLink id="symmetric-matrix">symmetrisch</ConceptLink> und{" "}
        <ConceptLink id="positive-definite">positiv definit</ConceptLink>,
        sobald die Spalten von <M>{"\\bA"}</M>{" "}
        <ConceptLink id="linear-independence">linear unabhängig</ConceptLink>{" "}
        sind — die{" "}
        <ConceptLink id="cholesky-factorization">Cholesky-Zerlegung</ConceptLink>{" "}
        löst das System dann effizient. Der Haken: Die{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink> von{" "}
        <M>{"\\bA^{T}\\bA"}</M> ist das <em>Quadrat</em> von{" "}
        <M>{"\\operatorname{cond}(\\bA)"}</M>. Das Aufstellen von{" "}
        <M>{"\\bA^{T}\\bA"}</M> kann{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> also
        kräftig verstärken — eine{" "}
        <ConceptLink id="qr-factorization">QR-Zerlegung</ConceptLink> von{" "}
        <M>{"\\bA"}</M> umgeht dieses Problem.
      </p>
      <ProjectionWidget />
    </>
  ),
});
