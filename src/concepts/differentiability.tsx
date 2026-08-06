/** Konzept-Tooltip: Differenzierbarkeit / Glattheitsklassen C^0, C^1, C^2. */
import { useState } from "react";
import { ConceptLink, M, registerConcept } from "../lib";
import { LabeledPlot } from "../lib";

const EXAMPLES = [
  {
    name: "|x|",
    cls: "C⁰, aber nicht C¹",
    f: (x: number) => Math.abs(x),
    df: (x: number) => (Math.abs(x) < 0.01 ? NaN : Math.sign(x)),
    yDomain: [-2.2, 2.2] as [number, number],
    note: "der Graph hat bei 0 einen Knick, und die Ableitung springt von −1 auf +1",
  },
  {
    name: "x·|x|",
    cls: "C¹, aber nicht C²",
    f: (x: number) => x * Math.abs(x),
    df: (x: number) => 2 * Math.abs(x),
    yDomain: [-4.4, 4.4] as [number, number],
    note: "der Graph sieht glatt aus, aber die Ableitung 2|x| hat selbst einen Knick bei 0",
  },
  {
    name: "sin(x)",
    cls: "C∞ (alle Ableitungen existieren)",
    f: (x: number) => Math.sin(x),
    df: (x: number) => Math.cos(x),
    yDomain: [-1.6, 1.6] as [number, number],
    note: "jede Ableitung existiert und ist stetig, glatter geht es nicht",
  },
];

function SmoothnessWidget() {
  const [idx, setIdx] = useState(0);
  const ex = EXAMPLES[idx];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 flex gap-1">
        {EXAMPLES.map((e, i) => (
          <button
            key={e.name}
            onClick={() => setIdx(i)}
            className={`rounded px-2 py-0.5 font-mono text-xs ${
              i === idx ? "bg-sky-600 text-white" : "bg-slate-600 text-slate-200"
            }`}
          >
            f(x) = {e.name}
          </button>
        ))}
      </div>
      <p className="mb-1 text-sm">
        <span className="text-sky-400">f</span> (durchgezogen) und die
        Ableitung <span className="text-red-400">f&prime;</span> (gestrichelt):{" "}
        {ex.note}.
      </p>
      <LabeledPlot
        xLabel="x"
        yLabel="f, f'"
        tickClass="text-slate-300"
        series={[
          { f: ex.f, color: "#0284c7" },
          { f: ex.df, color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-2, 2]}
        yDomain={ex.yDomain}
        width={280}
        height={200}
      />
      <p className="mt-1 font-mono text-xs">Glattheitsklasse: {ex.cls}</p>
    </div>
  );
}

registerConcept({
  id: "differentiability",
  title: "Differenzierbarkeit & Glattheitsklassen",
  body: (
    <>
      <p>
        Eine Funktion ist an einer Stelle <em>differenzierbar</em>, wenn sie
        dort eine wohldefinierte{" "}
        <ConceptLink id="derivative">Ableitung</ConceptLink> besitzt.
        Anschaulich: Die Kurve hat eine eindeutige{" "}
        <ConceptLink id="tangent-line">Tangente</ConceptLink> und keinen Knick
        oder keine Ecke. Differenzierbarkeit ist eine stärkere Eigenschaft
        als <ConceptLink id="continuity">Stetigkeit</ConceptLink>: Jede
        differenzierbare Funktion ist stetig, aber <M>{"f(x) = |x|"}</M> ist
        überall stetig und trotzdem bei <M>{"x = 0"}</M> nicht
        differenzierbar: dort hat ihr Graph eine Ecke.
      </p>
      <p>
        Daraus entsteht eine Leiter von <em>Glattheitsklassen</em>:{" "}
        <M>{"C^0"}</M> heißt bloß stetig, <M>{"C^1"}</M> heißt, die erste
        Ableitung existiert und ist selbst stetig, <M>{"C^2"}</M> verlangt
        dasselbe für die zweite Ableitung, und so weiter; jede Stufe
        verbietet eine weitere Art von Rauheit. Wenn wir von einem
        Interpolanten einen bestimmten Glattheitsgrad verlangen, fordern wir
        genau die Zugehörigkeit zu einer dieser Klassen; kubische Splines
        sind gerade so konstruiert, dass sie exakt <M>{"C^2"}</M> sind
        (vgl. Heath §7.1, §7.4).
      </p>
      <SmoothnessWidget />
    </>
  ),
});
