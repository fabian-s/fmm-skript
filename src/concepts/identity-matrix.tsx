import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "identity-matrix",
  title: "Einheitsmatrix",
  body: (
    <>
      <p>
        Die <em>Einheitsmatrix</em> (identity matrix) <M>{"\\bI"}</M> ist die
        quadratische <ConceptLink id="matrix">Matrix</ConceptLink> mit Einsen
        auf der Hauptdiagonale und Nullen überall sonst:
      </p>
      <MD>{"\\bI = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix} \\quad (\\text{Fall } 3 \\times 3)."}</MD>
      <p>
        Sie ist das Gegenstück zur Zahl <M>{"1"}</M> in der Matrizenwelt:
        Multiplikation mit ihr ändert nichts. Für jeden{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> <M>{"\\bx"}</M> ist das{" "}
        <ConceptLink id="matrix-vector-product">Produkt</ConceptLink>{" "}
        <M>{"\\bI\\bx"}</M> einfach wieder <M>{"\\bx"}</M> (jede Zeile
        pickt genau einen Eintrag von <M>{"\\bx"}</M> unverändert heraus),
        und ebenso gilt{" "}
        <M>{"\\bA\\bI = \\bI\\bA = \\bA"}</M> bei der{" "}
        <ConceptLink id="matrix-multiplication">Matrixmultiplikation</ConceptLink>.
      </p>
      <p>
        Diese „Tu-nichts“-Rolle ist der Grund, warum sie in der Definition der{" "}
        <ConceptLink id="matrix-inverse">inversen Matrix</ConceptLink>{" "}
        auftaucht: Eine Matrix rückgängig zu machen heißt, durch Multiplikation
        wieder bei <M>{"\\bI"}</M> zu landen.
      </p>
    </>
  ),
});
