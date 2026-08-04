import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider, TransformCanvas } from "../lib";

function CompositionWidget() {
  const [s, setS] = useState(0.8);
  const [k, setK] = useState(1.5);
  // B = Scherung, A = horizontale Streckung; Produkt AB = [[k, k s], [0, 1]]
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Scherung s (B)" value={s} onChange={setS} min={-1.5} max={1.5} step={0.05} />
      <Slider label="Streckung k (A)" value={k} onChange={setK} min={0.3} max={2} step={0.05} />
      <TransformCanvas
        matrix={[[k, k * s], [0, 1]]}
        vectors={[{ v: [1, 1], color: "#dc2626", label: "ABx" }]}
        size={200}
        worldHalf={3}
      />
      <p className="mt-1 text-xs">
        Die einzelne Matrix{" "}
        <M>{"\\bA\\bB = \\begin{pmatrix} k & ks \\\\ 0 & 1 \\end{pmatrix}"}</M>{" "}
        führt beide Schritte auf einmal aus: erst die Scherung <M>{"\\bB"}</M>,
        dann die Streckung <M>{"\\bA"}</M>.
      </p>
    </div>
  );
}

registerConcept({
  id: "matrix-product",
  title: "Matrixprodukt",
  body: (
    <>
      <p>
        Das Produkt <M>{"\\bC = \\bA\\bB"}</M> zweier{" "}
        <ConceptLink id="matrix">Matrizen</ConceptLink> ist definiert, wenn{" "}
        <M>{"\\bA"}</M> genauso viele Spalten hat wie <M>{"\\bB"}</M> Zeilen;
        der Eintrag <M>{"c_{ij}"}</M> ist das{" "}
        <ConceptLink id="dot-product">Skalarprodukt</ConceptLink> der{" "}
        <M>{"i"}</M>-ten Zeile von <M>{"\\bA"}</M> mit der <M>{"j"}</M>-ten
        Spalte von <M>{"\\bB"}</M>. Ein kleines Beispiel:
      </p>
      <MD>
        {"\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 1\\cdot 0 + 2 \\cdot 1 & 1 \\cdot 1 + 2 \\cdot 0 \\\\ 3 \\cdot 0 + 4 \\cdot 1 & 3 \\cdot 1 + 4 \\cdot 0 \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ 4 & 3 \\end{pmatrix}."}
      </MD>
      <p>
        Die tiefere Bedeutung: Matrizen stellen{" "}
        <ConceptLink id="linear-map">lineare Abbildungen</ConceptLink> dar, und
        das Produkt steht für das Hintereinanderausführen —{" "}
        <M>{"\\bA\\bB"}</M> heißt „erst <M>{"\\bB"}</M> anwenden, dann{" "}
        <M>{"\\bA"}</M>“. Weil die Reihenfolge von Transformationen eine Rolle
        spielt, ist die Matrixmultiplikation <em>nicht</em> kommutativ: Im
        Allgemeinen gilt <M>{"\\bA\\bB \\neq \\bB\\bA"}</M>. Für die
        Determinante verhält sich das Produkt dagegen wunderbar:{" "}
        <M>{"\\det(\\bA\\bB) = \\det(\\bA)\\det(\\bB)"}</M>.
      </p>
      <CompositionWidget />
    </>
  ),
});
