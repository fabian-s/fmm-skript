/** Concept-Tooltip: Newton-Verfahren — Optimierung über lokale quadratische Modelle. */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept } from "../lib";

const f = (x: number) => (x * x * x * x) / 4 - x + 1;
const f1 = (x: number) => x * x * x - 1;
const f2 = (x: number) => 3 * x * x;

function NewtonWidget() {
  const [x, setX] = useState(2.5);
  const quad = (t: number) => f(x) + f1(x) * (t - x) + 0.5 * f2(x) * (t - x) * (t - x);
  const step = () => setX((cur) => cur - f1(cur) / f2(cur));
  const reset = () => setX(2.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 flex items-center gap-2">
        <button
          onClick={step}
          className="rounded bg-sky-600 px-2 py-0.5 text-xs text-white hover:bg-sky-500"
        >
          Newton-Schritt
        </button>
        <button
          onClick={reset}
          className="rounded bg-slate-500 px-2 py-0.5 text-xs text-white hover:bg-slate-400"
        >
          zurücksetzen
        </button>
        <span className="text-xs">
          <M>{`x = ${x.toFixed(4)}`}</M>
        </span>
      </div>
      <div className="mb-1 text-xs">
        Blau: <M>{"f(x) = \\tfrac{1}{4}x^4 - x + 1"}</M> (Minimum bei{" "}
        <M>{"x = 1"}</M>). Gestrichelt: die Parabel, die am roten Punkt Wert,
        Steigung und Krümmung teilt. Jeder Schritt springt zum tiefsten Punkt
        der Parabel — beobachten wir, wie wenige Schritte nötig sind.
      </div>
      <Plot
        series={[{ f }, { f: quad, color: "#dc2626", dash: [5, 4] }]}
        xDomain={[-0.5, 3]}
        yDomain={[-1, 9]}
        width={280}
        height={190}
        markers={[{ x, y: f(x), label: "x" }]}
      />
    </div>
  );
}

registerConcept({
  id: "newtons-method",
  title: "Newton-Verfahren",
  body: (
    <>
      <p>
        Das Newton-Verfahren ist ein{" "}
        <ConceptLink id="optimization">Optimierungs</ConceptLink>-Algorithmus,
        der die Krümmung ausnutzt: Statt wie das{" "}
        <ConceptLink id="gradient-descent">Gradientenverfahren</ConceptLink>{" "}
        nur bergab zu laufen, ersetzt es die Zielfunktion nahe dem aktuellen
        Punkt durch die Parabel mit demselben Wert, derselben Steigung und
        derselben Krümmung (das Taylor-Polynom zweiter Ordnung, vgl. MML §5.1)
        und springt direkt zum Minimum dieser Parabel. In einer Variablen
        löst der Sprung die Frage, wo die Steigung des Modells Null wird, und
        liefert das Update
      </p>
      <MD>{"x_{t+1} = x_t - \\frac{f'(x_t)}{f''(x_t)} ."}</MD>
      <p>
        Für eine Funktion vieler Parameter wird aus der ersten Ableitung der{" "}
        <ConceptLink id="gradient">Gradient</ConceptLink> und aus der zweiten
        Ableitung die{" "}
        <ConceptLink id="hessian-matrix">Hesse-Matrix</ConceptLink>{" "}
        <M>{"\\bH"}</M>; das Update multipliziert den Gradienten also mit der{" "}
        <ConceptLink id="matrix-inverse">Inversen</ConceptLink> der
        Hesse-Matrix:{" "}
        <M>{"\\btheta_{t+1} = \\btheta_t - \\bH^{-1} \\nabla f(\\btheta_t)^\\top"}</M>.
        Das ist der klassische Grund, warum sich zweite Ableitungen lohnen
        (vgl. MML §5.7): Nahe einem Minimum ist das quadratische Modell
        ausgezeichnet, und das Newton-Verfahren braucht typischerweise weit
        weniger Schritte als das Gradientenverfahren.
      </p>
      <NewtonWidget />
    </>
  ),
});
