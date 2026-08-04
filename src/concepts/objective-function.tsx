/** Konzept-Tooltip: Zielfunktion — die Größe, die beim Trainieren optimiert wird. */
import { ConceptLink, M, MD, Plot, registerConcept } from "../lib";

const data: [number, number][] = [
  [-2, -1.6],
  [-1, -0.8],
  [1, 1.1],
  [2, 2.4],
];

const mse = (a: number) =>
  data.reduce((s, [x, y]) => s + (y - a * x) * (y - a * x), 0) / data.length;

function ObjectiveWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 text-xs">
        Eine konkrete Zielfunktion: der mittlere quadratische Fehler{" "}
        <M>{"L(a)"}</M> der Geraden <M>{"y = a\\,x"}</M> auf vier
        Datenpunkten, als Funktion der Steigung <M>{"a"}</M>. Das Training
        wählt das <M>{"a"}</M> am Boden dieser Schüssel.
      </div>
      <Plot
        series={[{ f: mse }]}
        xDomain={[-0.5, 2.5]}
        yDomain={[-0.5, 6]}
        width={280}
        height={180}
        markers={[{ x: 0.99, y: mse(0.99), label: "bestes a" }]}
      />
    </div>
  );
}

registerConcept({
  id: "objective-function",
  title: "Zielfunktion (objective function)",
  body: (
    <>
      <p>
        Eine <em>Zielfunktion</em> (engl. <em>objective function</em>)
        verdichtet die Frage „Wie gut ist dieses Modell gerade?“ zu einer
        einzigen Zahl: Sie ist eine{" "}
        <ConceptLink id="function">Funktion</ConceptLink>{" "}
        <M>{"L(\\btheta)"}</M> der Modellparameter{" "}
        <M>{"\\btheta"}</M>, und Trainieren heißt, sie zu{" "}
        <ConceptLink id="optimization">optimieren</ConceptLink>. Misst die
        Zahl einen Fehler, minimieren wir sie (dann heißt sie oft
        Verlust- oder Kostenfunktion); misst sie, wie gut die Parameter die
        Daten erklären — etwa eine{" "}
        <ConceptLink id="likelihood">Likelihood</ConceptLink> —, maximieren
        wir sie. Ein Klassiker ist die quadratische Fehlerfunktion der{" "}
        <ConceptLink id="linear-regression">linearen Regression</ConceptLink>:
      </p>
      <MD>{"L(\\btheta) = \\sum_{i=1}^{n} \\left( y_i - f_{\\btheta}(x_i) \\right)^2 ."}</MD>
      <ObjectiveWidget />
    </>
  ),
});
