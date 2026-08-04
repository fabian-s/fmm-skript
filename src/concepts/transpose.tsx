import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "transpose",
  title: "Transponierte",
  body: (
    <>
      <p>
        Die <em>Transponierte</em> (engl. <em>transpose</em>) einer{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M>,
        geschrieben <M>{"\\bA^T"}</M>, entsteht durch Spiegeln an der
        Hauptdiagonale: Zeilen werden zu Spalten und Spalten zu Zeilen, der
        Eintrag an Position <M>{"(i,j)"}</M> wandert also nach{" "}
        <M>{"(j,i)"}</M>.
      </p>
      <MD>{"\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}^{T} = \\begin{pmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{pmatrix}"}</MD>
      <p>
        Das hochgestellte <M>{"T"}</M> ist außerdem eine gängige Platzsparerei
        beim Aufschreiben von{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink>: Ein Vektor ist per
        Konvention eine <em>Spalte</em>, aber Spalten lassen sich im Fließtext
        schlecht setzen. Wir schreiben also die Zeile{" "}
        <M>{"\\begin{pmatrix} 8 & 13 \\end{pmatrix}^{T}"}</M> und das{" "}
        <M>{"T"}</M> sagt uns, dass wir sie aufstellen sollen:
      </p>
      <MD>{"\\bb = \\begin{pmatrix} 8 & 13 \\end{pmatrix}^{T} = \\begin{pmatrix} 8 \\\\ 13 \\end{pmatrix}."}</MD>
      <p>
        Zweimal Transponieren liefert wieder das Original:{" "}
        <M>{"(\\bA^T)^T = \\bA"}</M>.
      </p>
    </>
  ),
});
