import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

/**
 * Eine symmetrische 2x2-Matrix wirkt als reine Streckung entlang zweier
 * senkrechter Achsen (ihrer Eigenvektor-Richtungen): der Einheitskreis
 * wird zu einer Ellipse, deren Achsen die Eigenrichtungen sind.
 */
function SymmetricWidget() {
  const [c, setC] = useState(1);
  const A: [[number, number], [number, number]] = [
    [2, c],
    [c, 1],
  ];
  // Eigenwerte von [[2,c],[c,1]]: (3 ± sqrt(1+4c²))/2
  const disc = Math.sqrt(1 + 4 * c * c);
  const l1 = (3 + disc) / 2;
  const l2 = (3 - disc) / 2;
  // Einheits-Eigenvektor zu λ: (c, λ-2), außer wenn c = 0
  const evec = (l: number): [number, number] => {
    if (Math.abs(c) < 1e-9) return l >= 1.5 ? [1, 0] : [0, 1];
    const n = Math.hypot(c, l - 2);
    return [c / n, (l - 2) / n];
  };
  const v1 = evec(l1);
  const v2 = evec(l2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Nebendiagonal-Eintrag c" value={c} onChange={setC} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        A = [[2, {c.toFixed(1)}], [{c.toFixed(1)}, 1]], Eigenwerte λ₁ ={" "}
        {l1.toFixed(2)}, λ₂ = {l2.toFixed(2)}; v₁ᵀv₂ = 0
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={A}
        showGrid={false}
        vectors={[
          { v: [l1 * v1[0], l1 * v1[1]], color: "#38bdf8", label: "λ₁v₁" },
          { v: [l2 * v2[0], l2 * v2[1]], color: "#f472b6", label: "λ₂v₂" },
        ]}
        size={280}
        worldHalf={Math.max(2.6, 1.25 * Math.abs(l1))}
      />
      <p className="mt-1 text-xs text-slate-300">
        Der gestrichelte Einheitskreis wird auf die durchgezogene Ellipse
        abgebildet. Ihre beiden Achsen (die Pfeile λ₁v₁ und λ₂v₂)
        bleiben für jedes c senkrecht zueinander: Eine symmetrische
        Matrix streckt (oder spiegelt) nur entlang zweier orthogonaler
        Richtungen.
      </p>
    </div>
  );
}

registerConcept({
  id: "symmetric-matrix",
  title: "Symmetrische Matrix",
  body: (
    <>
      <p>
        Eine quadratische <ConceptLink id="matrix">Matrix</ConceptLink> heißt{" "}
        <em>symmetrisch</em>, wenn sie gleich ihrer eigenen{" "}
        <ConceptLink id="transpose">Transponierten</ConceptLink> ist,{" "}
        <M>{"\\bA = \\bA^T"}</M>: die Einträge spiegeln sich an der
        Hauptdiagonale, <M>{"a_{ij} = a_{ji}"}</M>. Zum Beispiel:
      </p>
      <MD>
        {"\\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix} \\text{ ist symmetrisch,} \\qquad \\begin{bmatrix} 2 & 1 \\\\ 0 & 1 \\end{bmatrix} \\text{ nicht.}"}
      </MD>
      <p>
        Symmetrische Matrizen begegnen uns ständig:{" "}
        <M>{"\\bA^T \\bA"}</M> ist <em>immer</em> symmetrisch, egal wie{" "}
        <M>{"\\bA"}</M> aussieht, denn{" "}
        <M>{"(\\bA^T\\bA)^T = \\bA^T(\\bA^T)^T = \\bA^T\\bA"}</M>, und
        Symmetrie (<M>{"\\bP^T = \\bP"}</M>) ist die halbe Definition einer
        orthogonalen Projektionsmatrix (orthogonal projector). Geometrisch
        sind sie die „gutartigsten&ldquo; linearen Abbildungen: Eine
        symmetrische Matrix hat reelle{" "}
        <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> und
        paarweise{" "}
        <ConceptLink id="orthogonality">senkrechte</ConceptLink>{" "}
        Eigenvektor-Richtungen; sie wirkt also als reine Streckung
        entlang orthogonaler Achsen, ganz ohne Scherung.
      </p>
      <SymmetricWidget />
    </>
  ),
});
