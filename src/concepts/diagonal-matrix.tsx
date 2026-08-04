import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

function DiagWidget() {
  const [d1, setD1] = useState(2);
  const [d2, setD2] = useState(0.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="d₁" value={d1} onChange={setD1} min={-3} max={3} step={0.1} />
      <Slider label="d₂" value={d2} onChange={setD2} min={-3} max={3} step={0.1} />
      <div className="my-1 font-mono text-xs">
        D = diag({d1.toFixed(1)}, {d2.toFixed(1)}) — e₁ wird um {d1.toFixed(1)} gestreckt, e₂ um {d2.toFixed(1)}
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [d1, 0],
          [0, d2],
        ]}
        vectors={[
          { v: [d1, 0], color: "#dc2626", label: "D e₁" },
          { v: [0, d2], color: "#16a34a", label: "D e₂" },
        ]}
        size={240}
        worldHalf={3.4}
      />
      <p className="mt-1 text-xs opacity-80">
        Eine Diagonalmatrix streckt jede Achse um ihren eigenen Faktor und
        mischt die Koordinaten nie — das Gitter bleibt rechteckig.
      </p>
    </div>
  );
}

registerConcept({
  id: "diagonal-matrix",
  title: "Diagonalmatrix",
  body: (
    <>
      <p>
        Eine <em>Diagonalmatrix</em> ist eine{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink>, deren einzige
        Nicht-Null-Einträge auf der Hauptdiagonalen sitzen, etwa{" "}
        <M>{"\\bD = \\begin{pmatrix}2 & 0\\\\ 0 & 0.5\\end{pmatrix}"}</M>.
        Multiplizieren wir einen Vektor damit, wird bloß jede Koordinate mit
        ihrem eigenen Faktor skaliert:{" "}
        <M>{"\\bD(x_1, x_2)^T = (2x_1,\\, 0.5\\,x_2)^T"}</M> — die
        Koordinaten kommen einander nie in die Quere. (Die{" "}
        <ConceptLink id="identity-matrix">Einheitsmatrix</ConceptLink> ist der
        Spezialfall mit lauter Einsen auf der Diagonalen; eine Diagonalmatrix
        ist gleichzeitig obere und untere{" "}
        <ConceptLink id="triangular-matrix">Dreiecksmatrix</ConceptLink>, und
        ihre{" "}
        <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> sind
        genau die Diagonaleinträge.)
      </p>
      <p>
        Diese Unabhängigkeit macht lineare Gleichungssysteme und
        Kleinste-Quadrate-Probleme mit Diagonalmatrizen trivial:{" "}
        <M>{"\\bD\\bx = \\bb"}</M> zerfällt in eine winzige Gleichung pro
        Zeile,
      </p>
      <MD>{"x_i = b_i / d_{ii} \\quad (d_{ii} \\neq 0),"}</MD>
      <p>
        also <M>{"n"}</M> unabhängige Divisionen. Die Matrix muss dafür nicht
        quadratisch sein: Das <M>{"\\bSigma"}</M> in der{" "}
        Singulärwertzerlegung (singular value decomposition, SVD) ist eine{" "}
        <M>{"m \\times n"}</M>-Diagonalmatrix, und der ganze Witz der SVD
        ist, dass sie ein allgemeines Kleinste-Quadrate-Problem auf diese
        einfache diagonale Form zurückführt — sogar ihre Pseudoinverse wird
        eintragsweise berechnet, durch Kehrwerte der
        Nicht-Null-Diagonaleinträge.
      </p>
      <DiagWidget />
    </>
  ),
});
