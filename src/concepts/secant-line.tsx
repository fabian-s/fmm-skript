/** Konzept-Tooltip: Sekante (vgl. MML Definition 5.1 / Abbildung 5.3). */
import { useState } from "react";
import { ConceptLink, M, Plot, registerConcept, Slider } from "../lib";

function SecantWidget() {
  const [h, setH] = useState(1.5);
  const f = (x: number) => x * x;
  const x0 = 0.5;
  const slope = (f(x0 + h) - f(x0)) / h;
  const secant = (x: number) => f(x0) + slope * (x - x0);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="h (Abstand der beiden Punkte)" value={h} onChange={setH} min={0.1} max={2} step={0.05} />
      <Plot
        series={[
          { f, color: "#0284c7" },
          { f: secant, color: "#dc2626", dash: [6, 4] },
        ]}
        xDomain={[-0.5, 3]}
        yDomain={[-1, 7]}
        width={280}
        height={190}
        markers={[
          { x: x0, y: f(x0), label: "P" },
          { x: x0 + h, y: f(x0 + h), label: "Q" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Sekante (gestrichelt) durch P und Q auf der Parabel; ihre Steigung ist hier {slope.toFixed(2)}.
        Schieben wir h gegen 0, schmiegt sich die Gerade an die Kurve.
      </p>
    </div>
  );
}

registerConcept({
  id: "secant-line",
  title: "Sekante",
  body: (
    <>
      <p>
        Eine Sekante (secant line) ist schlicht eine Gerade durch{" "}
        <em>zwei</em> Punkte auf dem Graphen einer{" "}
        <ConceptLink id="function">Funktion</ConceptLink>. Sind die Punkte{" "}
        <M>{"(x_0, f(x_0))"}</M> und <M>{"(x_0 + h, f(x_0 + h))"}</M>, so ist
        die <ConceptLink id="slope">Steigung</ConceptLink> der Sekante
        &bdquo;Höhenzuwachs durch Schrittweite&ldquo;:{" "}
        <M>{"\\frac{f(x_0+h) - f(x_0)}{h}"}</M> &mdash; genau der
        Differenzenquotient (vgl. MML Def. 5.1). Zum Beispiel hat auf{" "}
        <M>{"f(x) = x^2"}</M> die Sekante durch die Punkte bei{" "}
        <M>{"x=1"}</M> und <M>{"x=2"}</M> die Steigung{" "}
        <M>{"(4-1)/(2-1) = 3"}</M>. Rücken die beiden Punkte zusammen (
        <M>{"h \\to 0"}</M>), wird aus der Sekante die{" "}
        <ConceptLink id="tangent-line">Tangente</ConceptLink> bei{" "}
        <M>{"x_0"}</M> &mdash; das ist die ganze Idee hinter der Ableitung.
      </p>
      <SecantWidget />
    </>
  ),
});
