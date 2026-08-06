/** Concept tooltip: lineare Funktion f(x) = ax + b. */
import { useState } from "react";
import { ConceptLink, M, Plot, registerConcept, Slider } from "../lib";

function LinearWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="a (Steigung)" value={a} onChange={setA} min={-3} max={3} step={0.1} />
      <Slider label="b (Achsenabschnitt)" value={b} onChange={setB} min={-2} max={2} step={0.1} />
      <Plot
        series={[{ f: (x) => a * x + b, color: "#0284c7" }]}
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={280}
        height={190}
        markers={[{ x: 0, y: b, label: "b" }]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Verändern wir a und b: Die Steigung kippt die Gerade, der
        Achsenabschnitt schiebt sie nach oben und unten.
      </p>
    </div>
  );
}

registerConcept({
  id: "linear-function",
  title: "Lineare Funktion",
  body: (
    <>
      <p>
        Eine lineare Funktion ist eine{" "}
        <ConceptLink id="function">Funktion</ConceptLink> der Form{" "}
        <M>{"f(x) = ax + b"}</M>; ihr Graph ist eine Gerade mit{" "}
        <ConceptLink id="slope">Steigung</ConceptLink> <M>{"a"}</M> und Wert{" "}
        <M>{"b"}</M> an der Stelle <M>{"x = 0"}</M>. Ihr Markenzeichen: Jeder
        Schritt um eine Einheit in <M>{"x"}</M> ändert <M>{"f(x)"}</M> um{" "}
        <em>denselben</em> Betrag <M>{"a"}</M>, egal wo wir stehen. Für eine
        lineare Funktion ist der Differenzenquotient{" "}
        <M>{"\\frac{f(x+h)-f(x)}{h}"}</M> deshalb gleich <M>{"a"}</M> für jedes{" "}
        <M>{"x"}</M> und jedes <M>{"h"}</M>: mittlere Steigung und momentane
        Steigung fallen zusammen. Für eine gekrümmte Funktion stimmt das nicht
        mehr, und genau darum ist der Differenzenquotient nur eine{" "}
        <em>mittlere</em> Steigung: Um die Steigung in einem einzelnen Punkt zu
        definieren, brauchen wir einen{" "}
        <ConceptLink id="limit">Grenzwert</ConceptLink>.
      </p>
      <LinearWidget />
    </>
  ),
});
