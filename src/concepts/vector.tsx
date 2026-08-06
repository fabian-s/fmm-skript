import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "vector",
  title: "Vektor",
  body: (
    <>
      <p>
        Ein Vektor ist einfach eine geordnete Liste von Zahlen, meist als
        Spalte geschrieben. Eine Liste mit <M>{"n"}</M> Einträgen heißt{" "}
        <M>{"n"}</M>-Vektor und lebt in{" "}
        <ConceptLink id="real-coordinate-space">
          <M>{"\\R^n"}</M>
        </ConceptLink>
        . Zum Beispiel ist
      </p>
      <MD>{"\\bx = \\begin{bmatrix} 3 \\\\ -1 \\end{bmatrix}"}</MD>
      <p>
        ein 2-Vektor; wir können ihn uns als den Punkt <M>{"(3, -1)"}</M> in
        der Ebene vorstellen, oder als Pfeil vom Ursprung zu diesem Punkt. Die
        Reihenfolge zählt: <M>{"(3,-1)"}</M> und <M>{"(-1,3)"}</M> sind
        verschiedene Vektoren. Mit Vektoren bündeln wir mehrere
        zusammengehörige Größen zu einem Objekt: in{" "}
        <M>{"\\bL\\bu = \\boldsymbol{f}"}</M> werden alle „Ursachen“ zu einem
        Vektor <M>{"\\bu"}</M> und alle „Wirkungen“ zu einem Vektor{" "}
        <M>{"\\boldsymbol{f}"}</M>. Vektoren addieren wir Eintrag für Eintrag,
        und wir strecken einen Vektor, indem wir jeden Eintrag mit demselben{" "}
        <ConceptLink id="scalar">Skalar</ConceptLink> multiplizieren; ein
        Spaltenvektor ist außerdem genau eine <M>{"n \\times 1"}</M>-
        <ConceptLink id="matrix">Matrix</ConceptLink>.
      </p>
    </>
  ),
});
