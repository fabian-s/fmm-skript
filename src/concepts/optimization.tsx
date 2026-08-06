/** Konzept-Tooltip: Optimierung: Minimieren/Maximieren einer Zielfunktion. */
import { useState } from "react";
import { ConceptLink, M, Plot, registerConcept, Slider } from "../lib";

const L = (t: number) => (t * t - 1) * (t * t - 1) + 0.3 * t;

function OptimizationWidget() {
  const [theta, setTheta] = useState(1.6);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Parameter θ" value={theta} onChange={setTheta} min={-1.8} max={1.8} />
      <div className="mb-1 text-xs">
        Schieben wir <M>{"\\theta"}</M> so, dass <M>{"L(\\theta)"}</M>{" "}
        möglichst klein wird. Aktueller Wert:{" "}
        <M>{`L(${theta.toFixed(2)}) = ${L(theta).toFixed(2)}`}</M>.
        Vorsicht: die flache Falle bei <M>{"\\theta \\approx 1"}</M>; der
        beste Punkt liegt links.
      </div>
      <Plot
        series={[{ f: L }]}
        xDomain={[-2, 2]}
        yDomain={[-1, 3]}
        width={280}
        height={180}
        markers={[{ x: theta, y: L(theta), label: "L(θ)" }]}
      />
    </div>
  );
}

registerConcept({
  id: "optimization",
  title: "Optimierung",
  body: (
    <>
      <p>
        Optimierung heißt: Wir suchen die Eingabewerte, die eine{" "}
        <ConceptLink id="function">Funktion</ConceptLink> so klein (oder so
        groß) wie möglich machen. Im maschinellen Lernen ist diese Funktion
        die <ConceptLink id="objective-function">Zielfunktion</ConceptLink>{" "}
        <M>{"L(\\btheta)"}</M>, und die Eingaben sind die Modellparameter{" "}
        <M>{"\\btheta"}</M>. „Ein Modell trainieren“ bedeutet also nichts
        anderes, als{" "}
        <M>{"\\min_{\\btheta} L(\\btheta)"}</M> zu lösen. Alle Parameterwerte
        durchzuprobieren ist aussichtslos; praktische Algorithmen machen
        stattdessen wiederholt kleine Schritte bergab, und der{" "}
        <ConceptLink id="gradient">Gradient</ConceptLink> (aufgebaut aus
        Ableitungen) verrät ihnen, in welcher Richtung es bergab geht.
        Deshalb spielt das Differenzieren hier eine so große Rolle.
      </p>
      <OptimizationWidget />
    </>
  ),
});
