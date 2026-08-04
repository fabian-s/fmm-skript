import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider, TransformCanvas } from "../lib";

function ShearUndoWidget() {
  const [s, setS] = useState(1);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Scherung s" value={s} onChange={setS} min={-2} max={2} step={0.05} />
      <div className="flex flex-wrap gap-2">
        <div>
          <TransformCanvas
            matrix={[[1, s], [0, 1]]}
            vectors={[{ v: [1, 1], color: "#dc2626", label: "Ax" }]}
            size={170}
            worldHalf={2.5}
          />
          <p className="text-center text-xs">
            <M>{"\\bA"}</M> (Scherung)
          </p>
        </div>
        <div>
          <TransformCanvas
            matrix={[[1, -s], [0, 1]]}
            vectors={[{ v: [1, 1], color: "#16a34a", label: "A⁻¹x" }]}
            size={170}
            worldHalf={2.5}
          />
          <p className="text-center text-xs">
            <M>{"\\bA^{-1}"}</M> (schert zurück)
          </p>
        </div>
      </div>
      <p className="mt-1 text-xs">
        Die Inverse der Scherung <M>{"\\bA = \\begin{pmatrix} 1 & s \\\\ 0 & 1 \\end{pmatrix}"}</M>{" "}
        ist die entgegengesetzte Scherung <M>{"\\begin{pmatrix} 1 & -s \\\\ 0 & 1 \\end{pmatrix}"}</M>:
        Wenden wir beide nacheinander an, bleibt jeder Punkt, wo er war.
      </p>
    </div>
  );
}

registerConcept({
  id: "inverse-matrix",
  title: "Inverse Matrix",
  body: (
    <>
      <p>
        Die <em>Inverse</em> einer quadratischen{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M> ist die
        Matrix <M>{"\\bA^{-1}"}</M>, die sie rückgängig macht: Multiplizieren
        wir die beiden (in beliebiger Reihenfolge, per{" "}
        <ConceptLink id="matrix-product">Matrixprodukt</ConceptLink>), ergibt
        sich die{" "}
        <ConceptLink id="identity-matrix">Einheitsmatrix</ConceptLink>,
      </p>
      <MD>{"\\bA\\bA^{-1} = \\bA^{-1}\\bA = \\bI."}</MD>
      <p>
        Fassen wir <M>{"\\bA"}</M> als{" "}
        <ConceptLink id="linear-map">lineare Abbildung</ConceptLink> auf, die{" "}
        <M>{"\\bx"}</M> auf <M>{"\\bA\\bx"}</M> schickt, dann ist die Inverse
        die Abbildung, die jede Ausgabe zu ihrer Eingabe zurückschickt — genau
        deshalb läuft das Lösen des{" "}
        <ConceptLink id="linear-system">linearen Gleichungssystems</ConceptLink>{" "}
        <M>{"\\bA\\bx = \\bb"}</M> auf{" "}
        <M>{"\\bx = \\bA^{-1}\\bb"}</M> hinaus. Nicht jede Matrix hat eine
        Inverse: Sie existiert genau dann, wenn die Determinante ungleich null
        ist. Ein kleines Beispiel:
      </p>
      <MD>
        {"\\bA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\qquad \\bA^{-1} = \\frac{1}{1\\cdot 4 - 2 \\cdot 3}\\begin{pmatrix} 4 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 \\\\ \\tfrac{3}{2} & -\\tfrac{1}{2} \\end{pmatrix}."}
      </MD>
      <ShearUndoWidget />
    </>
  ),
});
