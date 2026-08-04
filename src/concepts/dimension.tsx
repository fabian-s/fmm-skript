import { ConceptLink, M, registerConcept } from "../lib";

registerConcept({
  id: "dimension",
  title: "Dimension",
  body: (
    <>
      <p>
        Die <em>Dimension</em> eines{" "}
        <ConceptLink id="vector-space">Vektorraums</ConceptLink> ist die
        Anzahl unabhängiger Richtungen darin — gleichbedeutend: wie viele{" "}
        <ConceptLink id="linear-independence">linear unabhängige</ConceptLink>{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink> wir brauchen, damit
        jedes Element des Raums eine{" "}
        <ConceptLink id="linear-combination">Linearkombination</ConceptLink>{" "}
        davon ist. Sie ist die Anzahl der Koordinaten, die es braucht, um
        einen Punkt festzunageln.
      </p>
      <p>
        Vertraute Fälle: Eine Gerade durch den Ursprung hat Dimension{" "}
        <M>{"1"}</M> (eine Zahl sagt, wo auf ihr wir stehen), eine Ebene hat
        Dimension <M>{"2"}</M>, und{" "}
        <ConceptLink id="real-coordinate-space">
          <M>{"\\R^n"}</M>
        </ConceptLink>{" "}
        hat Dimension <M>{"n"}</M> — zum Beispiel erzeugen die beiden
        Vektoren <M>{"(1,0)"}</M> und <M>{"(0,1)"}</M> die ganze Ebene, und
        kein einzelner Vektor schafft das allein.
      </p>
      <p>
        Ein Raum ist <em>endlichdimensional</em>, wenn diese Anzahl eine
        endliche Zahl <M>{"n"}</M> ist. Dieser Zusatz ist wichtig:
        Funktionenräume etwa brauchen unendlich viele unabhängige
        „Richtungen“, und Matrizen können nur Abbildungen zwischen
        endlichdimensionalen Räumen darstellen.
      </p>
    </>
  ),
});
