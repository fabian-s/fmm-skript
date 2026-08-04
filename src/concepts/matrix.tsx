import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "matrix",
  title: "Matrix",
  body: (
    <>
      <p>
        Eine Matrix ist eine rechteckige Tabelle von Zahlen mit <M>{"m"}</M>{" "}
        Zeilen und <M>{"n"}</M> Spalten — wir nennen sie eine{" "}
        <M>{"m \\times n"}</M>-Matrix. Der Eintrag in Zeile <M>{"i"}</M> und
        Spalte <M>{"j"}</M> heißt <M>{"a_{ij}"}</M>; ein einzelnes Symbol wie{" "}
        <M>{"\\bA"}</M> packt also ein ganzes Zahlengitter in ein Objekt. Zum
        Beispiel ist
      </p>
      <MD>{"\\bA = \\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}"}</MD>
      <p>
        eine <M>{"2 \\times 2"}</M>-Matrix mit <M>{"a_{11} = 2"}</M>,{" "}
        <M>{"a_{12} = 1"}</M>, <M>{"a_{21} = 5"}</M> und <M>{"a_{22} = 3"}</M>.
        In einem Gleichungssystem <M>{"\\bA\\bx = \\bb"}</M> speichert die
        Matrix alle Koeffizienten der Gleichungen auf einmal: Zeile{" "}
        <M>{"i"}</M> enthält die Koeffizienten von Gleichung <M>{"i"}</M>, und
        jede Spalte lässt sich selbst als{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> lesen. Dieser
        Buchführungs-Trick erlaubt uns, über „das System“ als ein einziges
        Objekt zu sprechen, statt mit <M>{"m"}</M> einzelnen Gleichungen zu
        jonglieren.
      </p>
    </>
  ),
});
