import { useState } from "react";
import { ConceptLink, LabeledTransformCanvas, M, MD, registerConcept, Slider } from "../lib";

/** Drehen–Strecken–Drehen live: A = U diag(σ1,σ2) Vᵀ als Bild des Einheitskreises. */
function SvdWidget() {
  const [theta, setTheta] = useState(0.5);
  const [s1, setS1] = useState(1.8);
  const [s2, setS2] = useState(0.6);
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  // A = R(theta) · diag(s1, s2)  (V = I; eine Drehung im Kreis ist unsichtbar)
  const A: [[number, number], [number, number]] = [
    [c * s1, -s * s2],
    [s * s1, c * s2],
  ];
  const worldHalf = Math.max(2.2, s1 * 1.15);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Drehung θ (U)" value={theta} onChange={setTheta} min={0} max={3.14} />
      <Slider label="σ₁" value={s1} onChange={setS1} min={0.1} max={2.5} />
      <Slider label="σ₂" value={s2} onChange={setS2} min={0} max={2.5} />
      <LabeledTransformCanvas
        matrix={A}
        tickClass="text-slate-300"
        size={260}
        worldHalf={worldHalf}
        showGrid={false}
        showUnitCircle={true}
      />
      <p className="mt-1 text-xs opacity-80">
        Der gestrichelte Einheitskreis wird von <M>{"\\bA = \\bU\\bSigma\\bV^\\top"}</M> auf eine
        Ellipse mit Halbachsen <M>{"\\sigma_1, \\sigma_2"}</M> abgebildet; <M>{"\\bU"}</M> dreht
        die Ellipse um <M>{"\\theta"}</M>. Die erste Drehung <M>{"\\bV^\\top"}</M> sehen wir hier
        nicht; sie dreht nur den Kreis in sich selbst. Für <M>{"\\sigma_2 \\to 0"}</M> kollabiert
        die Ellipse zu einer Strecke: <M>{"\\bA"}</M> verliert Rang.
      </p>
    </div>
  );
}

registerConcept({
  id: "singular-value-decomposition",
  title: "Singulärwertzerlegung (SVD)",
  body: (
    <>
      <p>
        Die <em>Singulärwertzerlegung</em> (singular value decomposition, SVD) zerlegt eine
        beliebige <ConceptLink id="matrix">Matrix</ConceptLink> in „Drehen–Strecken–Drehen":
        Für jedes <M>{"\\bA \\in \\R^{m \\times n}"}</M> existieren{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrizen</ConceptLink>{" "}
        <M>{"\\bU \\in \\R^{m \\times m}"}</M>, <M>{"\\bV \\in \\R^{n \\times n}"}</M> und eine{" "}
        „<ConceptLink id="diagonal-matrix">Diagonalmatrix</ConceptLink>"{" "}
        <M>{"\\bSigma \\in \\R^{m \\times n}"}</M> mit
      </p>
      <MD>
        {"\\bA = \\bU\\bSigma\\bV^\\top, \\qquad \\bSigma = \\diag(\\sigma_1, \\ldots, \\sigma_{\\min(m,n)}), \\quad \\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge 0."}
      </MD>
      <p>
        Die <em>Singulärwerte</em> <M>{"\\sigma_i"}</M> sind die Wurzeln der{" "}
        <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> von{" "}
        <M>{"\\bA^\\top\\bA"}</M>; die Anzahl der Singulärwerte ungleich Null ist genau der{" "}
        <ConceptLink id="rank">Rang</ConceptLink> <M>{"r"}</M> von <M>{"\\bA"}</M>. Lassen wir
        die Nullanteile weg, bleibt die <em>reduzierte SVD</em>{" "}
        <M>{"\\bA = \\bU_r\\bSigma_r\\bV_r^\\top"}</M> mit <M>{"\\bSigma_r \\in \\R^{r \\times r}"}</M>{" "}
        regulär, die Grundlage für die Pseudoinverse <M>{"\\bA\\pinv"}</M>.
      </p>
      <p>
        Anschaulich bildet <M>{"\\bA"}</M> die Einheitskugel auf ein Ellipsoid mit Halbachsen{" "}
        <M>{"\\sigma_1, \\ldots, \\sigma_r"}</M> ab. Deshalb ist{" "}
        <M>{"\\|\\bA\\|_2 = \\sigma_{\\max}"}</M> und{" "}
        <M>{"\\corange{\\kappa_2(\\bA)} = \\sigma_{\\max}/\\sigma_{\\min}"}</M> die{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink>: Eine fast singuläre
        Matrix hat ein winziges <M>{"\\sigma_{\\min}"}</M> und ein nadelförmiges Ellipsoid.
      </p>
      <SvdWidget />
    </>
  ),
});
