import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "scalar",
  title: "Skalar",
  body: (
    <>
      <p>
        Ein Skalar ist einfach eine einzelne gewöhnliche Zahl, etwa{" "}
        <M>{"7"}</M>, <M>{"-0{,}5"}</M> oder <M>{"\\gamma"}</M>. Das Wort gibt
        es nur zur Abgrenzung: Ein{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> ist eine ganze Liste von
        Zahlen und eine <ConceptLink id="matrix">Matrix</ConceptLink> ein
        ganzes Zahlenschema, ein Skalar dagegen ist eine Zahl für sich allein.
        Multiplizieren wir einen Vektor mit einem Skalar, wird jeder Eintrag
        mit dieser Zahl skaliert:
      </p>
      <MD>
        {"2 \\begin{bmatrix} 3 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ -2 \\end{bmatrix}"}
      </MD>
      <p>
        Gilt eine Aussage „für jeden Skalar <M>{"\\gamma"}</M>&ldquo;, dann
        gilt sie, egal welche reelle Zahl wir einsetzen —{" "}
        <M>{"\\gamma = 2"}</M>, <M>{"\\gamma = -0{,}01"}</M>, jede der
        unendlich vielen Möglichkeiten. Genau deshalb genügt ein einziger
        solcher freier Skalar, um unendlich viele Lösungen zu erzeugen.
      </p>
    </>
  ),
});
