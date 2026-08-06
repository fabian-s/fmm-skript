import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "pseudoinverse",
  title: "Pseudoinverse A⁺",
  body: (
    <>
      <p>
        Eine rechteckige oder singuläre Matrix hat keine{" "}
        <ConceptLink id="matrix-inverse">Inverse</ConceptLink>, aber wir können „so gut wie
        möglich" invertieren. Die <em>Pseudoinverse</em> (Moore-Penrose-Inverse){" "}
        <M>{"\\bA\\pinv \\in \\R^{n \\times m}"}</M> kehrt <M>{"\\bA \\in \\R^{m \\times n}"}</M>{" "}
        dort um, wo das geht, und ignoriert den Rest. Über die reduzierte{" "}
        <ConceptLink id="singular-value-decomposition">SVD</ConceptLink>{" "}
        <M>{"\\bA = \\bU_r\\bSigma_r\\bV_r^\\top"}</M> ist sie definiert als
      </p>
      <MD>{"\\bA\\pinv = \\bV_r \\bSigma_r^{-1} \\bU_r^\\top"}</MD>
      <p>
        Wir invertieren also nur die <M>{"r = \\rang(\\bA)"}</M> Singulärwerte ungleich Null
        und tauschen die Rollen der beiden Orthogonalbasen. Ist <M>{"\\bA"}</M> quadratisch und
        regulär, gilt schlicht <M>{"\\bA\\pinv = \\bA^{-1}"}</M>. Hat <M>{"\\bA"}</M> vollen
        Spaltenrang (<M>{"\\rang(\\bA) = n"}</M>), gibt es die geschlossene Formel
      </p>
      <MD>{"\\bA\\pinv = (\\bA^\\top\\bA)^{-1}\\bA^\\top."}</MD>
      <p>
        Ihre Hauptrolle in diesem Kurs:{" "}
        <M>{"\\wh{\\bx} = \\bA\\pinv\\bb"}</M> ist die Lösung des{" "}
        <ConceptLink id="linear-least-squares">Kleinste-Quadrate-Problems</ConceptLink>{" "}
        <M>{"\\min_{\\bx} \\|\\bA\\bx - \\bb\\|_2^2"}</M>; die Formel oben ist genau die
        aufgelöste Form der{" "}
        <ConceptLink id="normal-equations">Normalengleichungen</ConceptLink>. Bei nicht vollem
        Rang liefert <M>{"\\bA\\pinv\\bb"}</M> unter allen KQ-Lösungen diejenige mit minimaler
        Norm.
      </p>
      <p>
        Kleines Beispiel: Für{" "}
        <M>{"\\bA = \\begin{pmatrix} 2 & 0 \\\\ 0 & 0 \\end{pmatrix}"}</M> ist{" "}
        <M>{"\\bA\\pinv = \\begin{pmatrix} 0{,}5 & 0 \\\\ 0 & 0 \\end{pmatrix}"}</M>: Die{" "}
        <M>{"2"}</M> wird invertiert, die Nullrichtung bleibt Null – dort gibt es nichts
        umzukehren.
      </p>
    </>
  ),
});
