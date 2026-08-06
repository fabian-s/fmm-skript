/**
 * Konzept-Tooltip: Sherman-Morrison-Formel: die Inverse (oder Zerlegung)
 * von A + u v^T aus der Inversen von A in O(n^2) Arbeit. Kanonische id;
 * der Trick hinter Broydens billigen Jacobi-Updates (vgl. Heath §5.6.3).
 */
import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "sherman-morrison-formula",
  title: "Sherman-Morrison-Formel",
  body: (
    <>
      <p>
        Angenommen, wir kennen die{" "}
        <ConceptLink id="matrix-inverse">Inverse</ConceptLink> von{" "}
        <M>{"\\bA"}</M> bereits, und dann ändert sich <M>{"\\bA"}</M> um einen
        Rang-1-Anteil, ein{" "}
        <ConceptLink id="outer-product">äußeres Produkt</ConceptLink>{" "}
        <M>{"\\bu\\bv^T"}</M>. Die Inverse komplett neu zu berechnen würde{" "}
        <M>{"\\mathcal{O}(n^3)"}</M> Arbeit kosten, aber die
        Sherman-Morrison-Formel flickt stattdessen die alte Inverse:
      </p>
      <MD>{
        "(\\bA + \\bu\\bv^T)^{-1} = \\bA^{-1} - \\frac{\\bA^{-1}\\bu\\,\\bv^T\\bA^{-1}}{1 + \\bv^T\\bA^{-1}\\bu},"
      }</MD>
      <p>
        gültig, solange der skalare Nenner{" "}
        <M>{"1 + \\bv^T\\bA^{-1}\\bu"}</M> nicht Null ist. Alles auf der
        rechten Seite besteht aus Matrix-Vektor-Produkten; die Formel
        anzuwenden (oder analog eine vorhandene{" "}
        <ConceptLink id="lu-decomposition">Zerlegung</ConceptLink> zu
        aktualisieren) kostet darum nur <M>{"\\mathcal{O}(n^2)"}</M>.
      </p>
      <p>
        Kleine Probe mit <M>{"\\bA = \\bI"}</M> (der{" "}
        <ConceptLink id="identity-matrix">Einheitsmatrix</ConceptLink>) und{" "}
        <M>{"\\bu = \\bv = (1, 0)^T"}</M>: Die Formel liefert
      </p>
      <MD>{
        "(\\bI + \\bu\\bu^T)^{-1} = \\bI - \\frac{\\bu\\bu^T}{2} = \\begin{bmatrix} \\tfrac{1}{2} & 0 \\\\ 0 & 1 \\end{bmatrix}, \\quad \\text{und tatsächlich } \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\end{bmatrix}^{-1} = \\begin{bmatrix} \\tfrac{1}{2} & 0 \\\\ 0 & 1 \\end{bmatrix}."
      }</MD>
      <p>
        Genau das macht Broydens Verfahren so billig: Jeder Schritt ändert die
        approximierte Jacobi-Matrix nur um einen Rang-1-Term, sodass die
        Zerlegung, mit der der nächste Schritt berechnet wird, in{" "}
        <M>{"\\mathcal{O}(n^2)"}</M> aktualisiert werden kann, statt für{" "}
        <M>{"\\mathcal{O}(n^3)"}</M> neu berechnet zu werden.
      </p>
    </>
  ),
});
