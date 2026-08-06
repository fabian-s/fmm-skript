/** Konzept-Tooltip: Differentialgleichung (beiläufige Erwähnung). */
import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "differential-equation",
  title: "Differentialgleichung",
  body: (
    <>
      <p>
        Eine Differentialgleichung ist eine Gleichung, deren Unbekannte keine
        Zahl ist, sondern eine ganze <em>Funktion</em>, und die diese
        Funktion mit ihrer eigenen{" "}
        <ConceptLink id="derivative">Ableitung</ConceptLink> verknüpft. Ein
        klassisches Beispiel ist
      </p>
      <MD>{"y'(t) = 0.03\\,y(t),"}</MD>
      <p>
        was besagt: Eine Größe wächst mit einer Rate von 3&nbsp;% ihres
        aktuellen Werts; das Rezept für Zinseszins auf dem Bankkonto
        oder das Wachstum einer Population. Viele Naturgesetze (Bewegung,
        Wärmefluss, Schwingungen) kommen in dieser Verpackung daher.
      </p>
      <p>
        Computer können mit unbekannten Funktionen aber nicht direkt rechnen.
        Ein Standardtrick: Wir verfolgen die Funktion nur an endlich vielen
        Punkten und ersetzen Ableitungen durch Differenzen benachbarter
        Werte. So wird aus der Differentialgleichung ein großes System
        gewöhnlicher algebraischer Gleichungen zwischen diesen Werten,
        sehr oft ein <em>lineares</em> System. Das ist ein Grund, warum das
        Lösen linearer Gleichungssysteme eine so zentrale Rechenaufgabe ist.
      </p>
    </>
  ),
});
