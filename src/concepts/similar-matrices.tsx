import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "similar-matrices",
  title: "Ähnliche Matrizen",
  body: (
    <>
      <p>
        Zwei quadratische <ConceptLink id="matrix">Matrizen</ConceptLink>{" "}
        <M>{"\\bA"}</M> und <M>{"\\bB"}</M> heißen <em>ähnlich</em> (similar),
        wenn <M>{"\\bB = \\bP^{-1}\\bA\\bP"}</M> für eine{" "}
        <ConceptLink id="inverse-matrix">invertierbare Matrix</ConceptLink>{" "}
        <M>{"\\bP"}</M> gilt. Die Formel wirkt technisch, steckt aber voller
        Anschauung: <M>{"\\bA"}</M> und <M>{"\\bB"}</M> beschreiben{" "}
        <em>dieselbe</em>{" "}
        <ConceptLink id="linear-map">lineare Abbildung</ConceptLink>, nur in
        zwei verschiedenen Koordinatensystemen aufgeschrieben, und{" "}
        <M>{"\\bP"}</M> ist die{" "}
        <ConceptLink id="change-of-basis">Basiswechsel</ConceptLink>-Matrix,
        die zwischen beiden übersetzt.
      </p>
      <p>
        Weil sie eine Abbildung in zwei Verkleidungen sind, stimmen ähnliche
        Matrizen in allen Größen überein, die nicht vom Koordinatensystem
        abhängen: Sie haben dieselben Eigenwerte, dieselbe Determinante und
        Spur und denselben <ConceptLink id="rank">Rang</ConceptLink>. Ein
        kleines Beispiel:
      </p>
      <MD>
        {"\\bP^{-1}\\bA\\bP = \\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix} \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}"}
      </MD>
      <p>
        Hier stellt sich <M>{"\\bA"}</M> als ähnlich zu einer{" "}
        <ConceptLink id="diagonal-matrix">Diagonalmatrix</ConceptLink> heraus,
        und beide teilen die Eigenwerte <M>{"2"}</M> und <M>{"3"}</M>. Einen
        solchen diagonalen Partner zu finden ist genau das Ziel der
        Diagonalisierung (vgl. MML §4.4).
      </p>
    </>
  ),
});
