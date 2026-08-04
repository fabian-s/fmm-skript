/** Concept tooltip: function (input→output assignment, f: R^D → R notation). */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

function FunctionWidget() {
  const [x, setX] = useState(1.2);
  const y = x * x;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Eingabe x" value={x} onChange={setX} min={-2} max={2} />
      <div className="mb-1 text-xs">
        Jede Eingabe liefert genau eine Ausgabe: <M>{"f(x) = x^2"}</M>, also{" "}
        <M>{`f(${x.toFixed(2)}) = ${y.toFixed(2)}`}</M>.
      </div>
      <Plot
        series={[{ f: (t) => t * t }]}
        xDomain={[-2.2, 2.2]}
        yDomain={[-1, 4.5]}
        width={280}
        height={180}
        markers={[{ x, y, label: "f(x)" }]}
      />
    </div>
  );
}

registerConcept({
  id: "function",
  title: "Funktion",
  body: (
    <>
      <p>
        Eine <em>Funktion</em> ist eine Vorschrift, die jeder zulässigen
        Eingabe genau eine Ausgabe zuordnet — stellen wir sie uns als
        verlässliche Maschine vor: gleiche Eingabe rein, gleiche Ausgabe raus,
        jedes Mal. Die Notation <M>{"f: \\R^D \\to \\R"}</M> sagt: Die Eingaben
        sind <ConceptLink id="vector">Vektoren</ConceptLink> <M>{"\\bx"}</M>{" "}
        mit <M>{"D"}</M> reellen Einträgen, und jede Ausgabe{" "}
        <M>{"f(\\bx)"}</M> ist eine einzelne reelle Zahl. Die Menge der
        zulässigen Eingaben und die Menge, in der die Ausgaben leben, sind{" "}
        <ConceptLink id="domain-codomain">
          Definitions- und Wertebereich
        </ConceptLink>{" "}
        der Funktion.
      </p>
      <p>
        Der einfachste Fall ist <M>{"D = 1"}</M>: zum Beispiel{" "}
        <M>{"f: \\R \\to \\R"}</M> mit
      </p>
      <MD>{"f(x) = x^2, \\qquad f(3) = 9 ."}</MD>
      <p>
        Im maschinellen Lernen sind die Eingaben typischerweise Datenpunkte,
        und die Funktion verknüpft sie mit Zielgrößen oder Scores.
      </p>
      <FunctionWidget />
    </>
  ),
});
