import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

/**
 * Rotate an orthonormal pair q1, q2 and read off the coordinates of a fixed
 * vector w by dot products — no linear system needed.
 */
function OrthonormalBasisWidget() {
  const [th, setTh] = useState(0.5);
  const q1: [number, number] = [Math.cos(th), Math.sin(th)];
  const q2: [number, number] = [-Math.sin(th), Math.cos(th)];
  const w: [number, number] = [2, 1];
  const c1 = w[0] * q1[0] + w[1] * q1[1];
  const c2 = w[0] * q2[0] + w[1] * q2[1];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Winkel θ"
        value={th}
        onChange={setTh}
        min={0}
        max={3.14}
        step={0.01}
        fmt={(v) => v.toFixed(2)}
      />
      <p className="my-1 font-mono text-xs">
        q₁ᵀq₂ = 0, ‖q₁‖ = ‖q₂‖ = 1; w = c₁q₁ + c₂q₂ mit c₁ = wᵀq₁ ={" "}
        {c1.toFixed(2)}, c₂ = wᵀq₂ = {c2.toFixed(2)}
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        vectors={[
          { v: q1, color: "#38bdf8", label: "q₁" },
          { v: q2, color: "#f472b6", label: "q₂" },
          { v: w, color: "#facc15", label: "w" },
        ]}
        size={280}
        worldHalf={2.6}
      />
      <p className="mt-1 text-xs text-slate-300">
        Wie auch immer wir das Paar drehen: q₁ und q₂ bleiben senkrechte
        Einheitsvektoren — und die Koordinaten des festen gelben Vektors w
        in dieser Basis sind einfach die beiden Skalarprodukte. Kein
        Gleichungssystem nötig.
      </p>
    </div>
  );
}

registerConcept({
  id: "orthonormal-basis",
  title: "Orthonormalbasis",
  body: (
    <>
      <p>
        Eine <em>Orthonormalbasis</em> (engl. <em>orthonormal basis</em>)
        eines <ConceptLink id="subspace">Unterraums</ConceptLink> ist eine{" "}
        <ConceptLink id="basis">Basis</ConceptLink>, deren Vektoren paarweise{" "}
        <ConceptLink id="orthogonality">orthogonal</ConceptLink> sind und
        alle die <ConceptLink id="euclidean-norm">Länge</ConceptLink> eins
        haben:
      </p>
      <MD>
        {"\\bq_i^T \\bq_j = \\begin{cases} 1 & i = j \\\\ 0 & i \\neq j \\end{cases}"}
      </MD>
      <p>
        Die Standardachsen des <M>{"\\R^2"}</M> sind das vertraute Beispiel —
        aber jede gedrehte Kopie davon funktioniert genauso gut. So eine
        Basis ist das bequemste Koordinatensystem überhaupt: Um einen Vektor{" "}
        <M>{"\\bw"}</M> darin auszudrücken, müssen wir nie ein
        Gleichungssystem lösen — der Koeffizient von jedem{" "}
        <M>{"\\bq_i"}</M> ist schlicht das{" "}
        <ConceptLink id="dot-product">Skalarprodukt</ConceptLink>{" "}
        <M>{"\\bq_i^T \\bw"}</M>. Stapeln wir orthonormale Vektoren als
        Spalten in eine Matrix <M>{"\\bQ"}</M>, packt das alle Bedingungen in{" "}
        <M>{"\\bQ^T \\bQ = \\bI"}</M>; ist <M>{"\\bQ"}</M> außerdem
        quadratisch, ist sie eine{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrix</ConceptLink>.
        Für die Kleinste-Quadrate-Methode macht eine Orthonormalbasis von{" "}
        <ConceptLink id="span">
          <M>{"\\operatorname{span}(\\bA)"}</M>
        </ConceptLink>{" "}
        den orthogonalen Projektor so einfach wie{" "}
        <M>{"\\bP = \\bQ\\bQ^T"}</M>.
      </p>
      <OrthonormalBasisWidget />
    </>
  ),
});
