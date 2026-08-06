/** Concept tooltip: lineare Regression, Kurvenanpassung mit linearen Parametern. */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

const data: [number, number][] = [
  [-2, -1.4],
  [-1, -0.9],
  [0, 0.4],
  [1, 1.0],
  [2, 2.3],
];

function RegressionWidget() {
  const [a, setA] = useState(0.3);
  const [b, setB] = useState(1);
  const sse = data.reduce((s, [x, y]) => s + (y - (a * x + b)) ** 2, 0);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Steigung a" value={a} onChange={setA} min={-1} max={2} />
      <Slider label="Achsenabschnitt b" value={b} onChange={setB} min={-2} max={2} />
      <div className="mb-1 text-xs">
        Passen wir die Gerade <M>{"f(x) = a x + b"}</M> an die Punkte an.
        Summe der quadrierten Fehler: <M>{`${sse.toFixed(2)}`}</M>. Schaffen
        wir es unter 0.25?
      </div>
      <Plot
        series={[{ f: (x) => a * x + b }]}
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={280}
        height={200}
        markers={data.map(([x, y]) => ({ x, y }))}
      />
    </div>
  );
}

registerConcept({
  id: "linear-regression",
  title: "Lineare Regression",
  body: (
    <>
      <p>
        Lineare Regression ist Kurvenanpassung: Zu Datenpunkten{" "}
        <M>{"(x_i, y_i)"}</M> suchen wir die{" "}
        <ConceptLink id="function">Funktion</ConceptLink> aus einer einfachen
        Familie, die ihnen am nächsten kommt. Im vertrautesten Fall besteht die
        Familie aus allen Geraden,
      </p>
      <MD>{"f(x) = \\theta_0 + \\theta_1 x ,"}</MD>
      <p>
        und Anpassen heißt: Wir wählen den Achsenabschnitt <M>{"\\theta_0"}</M>{" "}
        und die <ConceptLink id="slope">Steigung</ConceptLink>{" "}
        <M>{"\\theta_1"}</M> so, dass sie eine{" "}
        <ConceptLink id="objective-function">Zielfunktion</ConceptLink>{" "}
        minimieren, etwa die Summe der quadrierten vertikalen Abstände,
        gleichbedeutend damit, die{" "}
        <ConceptLink id="likelihood">Likelihood</ConceptLink> der Daten unter
        einem Fehlermodell zu maximieren. „Linear" bezieht sich darauf, dass
        die Parameter <M>{"\\btheta"}</M> linear eingehen; dieselbe Maschinerie
        passt also auch Kurven wie{" "}
        <M>{"\\theta_0 + \\theta_1 x + \\theta_2 x^2"}</M> an.
      </p>
      <RegressionWidget />
    </>
  ),
});
