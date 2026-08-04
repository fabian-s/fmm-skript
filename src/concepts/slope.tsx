import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

function SlopeWidget() {
  const [a, setA] = useState(1.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Steigung a" value={a} onChange={setA} min={-3} max={3} step={0.1} />
      <Plot
        series={[{ f: (x) => a * x }]}
        xDomain={[-2, 2]}
        yDomain={[-3, 3]}
        width={280}
        height={180}
        markers={[
          { x: 0, y: 0, color: "#475569" },
          { x: 1, y: 0, color: "#475569", label: "1 nach rechts" },
          { x: 1, y: a, label: `${a.toFixed(1)} nach oben` },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Ein Schritt nach rechts bringt uns {a.toFixed(1)} nach oben: Steigung a = {a.toFixed(1)}.
      </p>
    </div>
  );
}

registerConcept({
  id: "slope",
  title: "Steigung einer Geraden",
  body: (
    <>
      <p>
        Die Steigung (slope) einer Geraden misst, wie steil sie ist:
        „Höhenzuwachs durch Schrittweite&ldquo;, also wie weit die Gerade pro
        Einheitsschritt nach rechts hinauf- (oder hinab-)geht. Durch zwei
        Punkte <M>{"(x_1, y_1)"}</M> und <M>{"(x_2, y_2)"}</M>:
      </p>
      <MD>
        {"a = \\frac{\\text{Höhenzuwachs}}{\\text{Schrittweite}} = \\frac{y_2 - y_1}{x_2 - x_1}"}
      </MD>
      <p>
        Eine <ConceptLink id="linear-function">lineare Funktion</ConceptLink>{" "}
        <M>{"y = ax + b"}</M> hat überall die Steigung <M>{"a"}</M>; Steigung{" "}
        <M>{"2"}</M> heißt 2 nach oben pro 1 nach rechts, negative Steigung
        heißt bergab, Steigung <M>{"0"}</M> heißt flach. Genau diese Idee
        überträgt der Differenzenquotient (vgl. MML Def. 5.1) auf Kurven: Er
        ist die Steigung einer{" "}
        <ConceptLink id="secant-line">Sekante</ConceptLink> durch zwei Punkte
        des Graphen, und lassen wir die beiden Punkte verschmelzen, erhalten
        wir die Steigung der{" "}
        <ConceptLink id="tangent-line">Tangente</ConceptLink>.
      </p>
      <SlopeWidget />
    </>
  ),
});
