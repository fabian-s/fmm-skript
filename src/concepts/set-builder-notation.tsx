import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "set-builder-notation",
  title: "Beschreibende Mengenschreibweise",
  body: (
    <>
      <p>
        Die <em>beschreibende Mengenschreibweise</em> (set-builder notation)
        ist ein kompakter Weg, eine Menge durch eine Regel statt durch
        Aufzählen ihrer Elemente anzugeben. Das Muster{" "}
        <M>{"\\{ \\text{Ausdruck} : \\text{Bedingung} \\}"}</M> lesen wir als
        „die Menge aller Werte des Ausdrucks, während die Bedingung alle
        erlaubten Fälle durchläuft&ldquo;. Ein vertrautes Beispiel:
      </p>
      <MD>{"\\{ x^2 : x \\in \\R \\}"}</MD>
      <p>
        ist „die Menge aller Quadrate reeller Zahlen&ldquo;, also alle Zahlen{" "}
        <M>{"\\geq 0"}</M>. Den Doppelpunkt (manche Bücher schreiben einen
        senkrechten Strich <M>{"|"}</M>) sprechen wir als „mit&ldquo; oder
        „für die gilt&ldquo;. Also bedeutet
      </p>
      <MD>{"\\{ \\bA\\bx : \\bx \\in \\R^n \\}"}</MD>
      <p>
        : Nimm jeden möglichen{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> <M>{"\\bx"}</M> aus{" "}
        <ConceptLink id="real-coordinate-space">
          <M>{"\\R^n"}</M>
        </ConceptLink>
        , bilde jeweils das{" "}
        <ConceptLink id="matrix-vector-product">Produkt</ConceptLink>{" "}
        <M>{"\\bA\\bx"}</M> und sammle alle Ergebnisse in einer Menge. Das
        ist genau der <ConceptLink id="span">Spann</ConceptLink> der Spalten
        von <M>{"\\bA"}</M>.
      </p>
    </>
  ),
});
