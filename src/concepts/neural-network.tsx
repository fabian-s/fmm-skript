import { ConceptLink, M, MD, registerConcept } from "../lib";
import { NetworkDiagram } from "./widgets/NetworkDiagram";

registerConcept({
  id: "neural-network",
  title: "Neuronales Netz",
  body: (
    <>
      <p>
        Ein neuronales Netz ist ein flexibles Vorhersagemodell, das viele
        einfache <ConceptLink id="function">Funktionen</ConceptLink>{" "}
        („Schichten“, engl. <em>layers</em>) per{" "}
        <ConceptLink id="function-composition">Funktionskomposition</ConceptLink>{" "}
        übereinanderstapelt. Eine typische Schicht nimmt einen{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> <M>{"x^{(k-1)}"}</M>,
        multipliziert ihn mit einer Matrix von <em>Gewichten</em> (weights){" "}
        <M>{"A_{k-1}"}</M>, addiert einen <em>Bias</em>-Vektor{" "}
        <M>{"b_{k-1}"}</M> und schickt das Ergebnis durch eine einfache
        nichtlineare Funktion <M>{"\\sigma"}</M> (z.&nbsp;B. <M>{"\\tanh"}</M>):
      </p>
      <MD>{"x^{(k)} = \\sigma\\left(A_{k-1}\\, x^{(k-1)} + b_{k-1}\\right)"}</MD>
      <p>
        Das Netz zu „trainieren“ heißt, alle Gewichte und Biases so
        einzustellen, dass eine{" "}
        <ConceptLink id="objective-function">Zielfunktion</ConceptLink>{" "}
        (z.&nbsp;B. der mittlere Vorhersagefehler) möglichst klein wird, ein{" "}
        <ConceptLink id="optimization">Optimierungsproblem</ConceptLink>, das
        numerisch mit{" "}
        <ConceptLink id="gradient">Gradienten</ConceptLink> der Zielfunktion
        nach den Parametern gelöst wird. Ein bekanntes Beispiel sind{" "}
        <em>Auto-Encoder</em>: Netze, die darauf trainiert werden, eine
        Eingabe zu einem kurzen Code zu komprimieren und daraus wieder zu
        rekonstruieren (vgl. MML Kap. 7).
      </p>
      <NetworkDiagram />
    </>
  ),
});
