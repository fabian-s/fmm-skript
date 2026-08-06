import { ConceptLink, M, registerConcept } from "../lib";

registerConcept({
  id: "vector-space",
  title: "Vektorraum",
  body: (
    <>
      <p>
        Ein <em>Vektorraum</em> (engl. <em>vector space</em>) ist eine
        Sammlung von <ConceptLink id="vector">Vektoren</ConceptLink>, die
        unter den beiden Grundoperationen <em>abgeschlossen</em> ist: Addieren
        wir zwei ihrer Mitglieder oder skalieren wir ein Mitglied mit einem{" "}
        <ConceptLink id="scalar">Skalar</ConceptLink>, landen wir immer wieder
        in der Sammlung. Welche{" "}
        <ConceptLink id="linear-combination">Linearkombinationen</ConceptLink>{" "}
        wir auch bilden, dem Raum entkommen wir nie.
      </p>
      <p>
        Das Standardbeispiel ist{" "}
        <ConceptLink id="real-coordinate-space">
          <M>{"\\R^n"}</M>
        </ConceptLink>
        : Addieren wir zwei Listen von <M>{"n"}</M> Zahlen Eintrag für
        Eintrag, oder multiplizieren wir jeden Eintrag mit <M>{"5"}</M>,
        bekommen wir wieder eine Liste von <M>{"n"}</M> Zahlen. Ein kleineres
        Beispiel ist eine Gerade durch den Ursprung in der Ebene, etwa alle
        Vielfachen von <M>{"(1, 2)"}</M>: Summen und Skalierungen solcher
        Vielfachen sind wieder Vielfache von <M>{"(1,2)"}</M>. Eine Gerade,
        die den Ursprung verfehlt, ist dagegen <em>kein</em> Vektorraum:
        verdoppeln wir einen ihrer Punkte, verlassen wir die Gerade.
      </p>
      <p>
        Jeder Vektorraum hat eine{" "}
        <ConceptLink id="dimension">Dimension</ConceptLink>, die Anzahl der
        unabhängigen Richtungen, die er enthält; „endlichdimensional“ heißt
        einfach, dass diese Anzahl endlich ist, wie bei <M>{"\\R^n"}</M>.
      </p>
    </>
  ),
});
