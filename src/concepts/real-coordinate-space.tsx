/** Konzept-Tooltip: reeller Koordinatenraum R^n. */
import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "real-coordinate-space",
  title: "Reeller Koordinatenraum \u211d\u207f",
  body: (
    <>
      <p>
        Das Symbol <M>{"\\R^n"}</M> steht für die Menge <em>aller</em>{" "}
        geordneten Listen von <M>{"n"}</M> reellen Zahlen. Eine einzelne solche
        Liste ist ein <ConceptLink id="vector">Vektor</ConceptLink>: zum
        Beispiel <M>{"(2, -1) \\in \\R^2"}</M> oder{" "}
        <M>{"(3, 0,\\, 7{,}5) \\in \\R^3"}</M>. Die ersten beiden Fälle kennen
        wir aus der Schule: <M>{"\\R^2"}</M> ist die vertraute Koordinatenebene
        und <M>{"\\R^3"}</M> der dreidimensionale Raum, in dem jeder Punkt
        durch seine Koordinaten festgelegt ist.
      </p>
      <p>
        Für <M>{"n > 3"}</M> können wir keine Bilder mehr zeichnen, aber die
        Algebra funktioniert genau gleich: Ein Punkt des <M>{"\\R^5"}</M> ist
        einfach eine Liste aus fünf Zahlen, die eintragsweise addiert und
        skaliert wird. Die Anzahl <M>{"n"}</M> der Einträge ist die{" "}
        <ConceptLink id="dimension">Dimension</ConceptLink> des Raums. Lesen
        wir also irgendwo etwas wie
      </p>
      <MD>{"\\{\\bA\\bx : \\bx \\in \\R^n\\},"}</MD>
      <p>
        dann bedeutet die Formulierung &bdquo;<M>{"\\bx \\in \\R^n"}</M>
        &ldquo; schlicht: <M>{"\\bx"}</M> durchläuft jede mögliche Liste von{" "}
        <M>{"n"}</M> reellen Zahlen, ganz ohne Einschränkung.
      </p>
    </>
  ),
});
