/** Konzept-Tooltip: Summenzeichen (Sigma-Notation) und Indexverschiebung. */
import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "summation-notation",
  title: "Summenzeichen (Σ)",
  body: (
    <>
      <p>
        Das Symbol <M>{"\\sum"}</M> (großes Sigma) ist eine Kurzschreibweise
        für „addiere diese Terme auf&ldquo;. In <M>{"\\sum_{i=1}^{3} i^2"}</M>{" "}
        durchläuft der Zähler <M>{"i"}</M> die Werte <M>{"1, 2, 3"}</M>, und
        für jeden Wert addieren wir den Term <M>{"i^2"}</M>:
      </p>
      <MD>{"\\sum_{i=1}^{3} i^2 = 1^2 + 2^2 + 3^2 = 14."}</MD>
      <p>
        Welcher Buchstabe als Zähler dient, ist egal (<M>{"i"}</M>,{" "}
        <M>{"k"}</M>, <M>{"n"}</M> &mdash; alles in Ordnung), und der
        Startwert muss nicht <M>{"1"}</M> sein; Summen über
        Polynomkoeffizienten beginnen oft bei <M>{"i = 0"}</M>.
      </p>
      <p>
        Eine <em>Indexverschiebung</em> (index shift) schreibt dieselbe Summe
        mit einem anderen Zählbereich. Ist zum Beispiel der Term für{" "}
        <M>{"i = 0"}</M> zufällig Null, dürfen wir ihn einfach weglassen und
        bei <M>{"i = 1"}</M> starten. Allgemeiner macht die Substitution{" "}
        <M>{"j = i - 1"}</M> aus <M>{"\\sum_{i=1}^{n} a_i"}</M> die Summe{" "}
        <M>{"\\sum_{j=0}^{n-1} a_{j+1}"}</M> &mdash; es werden exakt dieselben
        Terme addiert, nur die Buchführung ändert sich. Ist die obere Grenze{" "}
        <M>{"\\infty"}</M>, hat die Summe unendlich viele Terme und wird zu
        einer{" "}
        <ConceptLink id="infinite-series">unendlichen Reihe</ConceptLink>.
      </p>
    </>
  ),
});
