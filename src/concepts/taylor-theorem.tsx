/** Konzept-Tooltip: Satz von Taylor: lokale Polynom-Näherung mit kontrolliertem Restglied. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function TaylorWidget() {
  const [order, setOrder] = useState(1);
  const approx = (x: number) => {
    let s = x;
    if (order >= 3) s -= (x * x * x) / 6;
    if (order >= 5) s += (x * x * x * x * x) / 120;
    return s;
  };
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Taylor-Polynome von <M>{"\\sin t"}</M> um <M>{"t = 0"}</M>{" "}
        (gestrichelt). Jeder zusätzliche Term vergrößert den Bereich, in dem
        sich das Polynom an die Kurve schmiegt; nahe <M>{"0"}</M> ist sogar
        die Gerade <M>{"p_1(t) = t"}</M> hervorragend.
      </p>
      <Slider
        label="Ordnung"
        value={order}
        onChange={setOrder}
        min={1}
        max={5}
        step={2}
        fmt={(v) => v.toFixed(0)}
      />
      <LabeledPlot
        xLabel="t"
        yLabel="f(t)"
        tickClass="text-slate-300"
        series={[
          { f: (t) => Math.sin(t) },
          { f: approx, color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-4, 4]}
        yDomain={[-2, 2]}
        width={280}
        height={180}
      />
    </div>
  );
}

registerConcept({
  id: "taylor-theorem",
  title: "Satz von Taylor",
  body: (
    <>
      <p>
        Der Satz von Taylor (Taylor&rsquo;s theorem) besagt: Eine glatte
        Funktion lässt sich in der Nähe eines Punktes allein aus ihren{" "}
        <ConceptLink id="derivative">Ableitungen</ConceptLink> an diesem
        Punkt rekonstruieren. Die Version erster Ordnung ist das Arbeitspferd
        der Numerik:
      </p>
      <MD>{"x(t) = x(0) + t\\,x'(0) + O(t^2) \\quad \\text{für } t \\to 0,"}</MD>
      <p>
        d.&thinsp;h. die Funktion ist gleich ihrer{" "}
        <ConceptLink id="tangent-line">Tangente</ConceptLink> bei{" "}
        <M>{"t = 0"}</M> plus einem Restglied der Größenordnung{" "}
        <ConceptLink id="big-o-notation">
          <M>{"O(t^2)"}</M>
        </ConceptLink>
        : es schrumpft garantiert wie <M>{"t^2"}</M> und ist für
        kleines <M>{"t"}</M> gegenüber dem <M>{"t"}</M>-Term vernachlässigbar.
        Weitere Terme{" "}
        <M>{"\\tfrac{t^2}{2} x''(0), \\tfrac{t^3}{6} x'''(0), \\dots"}</M>{" "}
        verbessern die Näherung und drücken das Restglied auf noch höhere
        Potenzen von <M>{"t"}</M>.
      </p>
      <p>
        Ein kleiner Check mit <M>{"\\sin t"}</M>: Der Satz liefert{" "}
        <M>{"\\sin t = t + O(t^3)"}</M>, und tatsächlich ist{" "}
        <M>{"\\sin(0.1) = 0.0998\\ldots"}</M>, also nur{" "}
        <M>{"2 \\times 10^{-4}"}</M> von <M>{"t = 0.1"}</M> entfernt.
        Sensitivitätsanalysen nutzen genau das aus: Um zu sehen, wie eine
        Lösung auf eine kleine Störung der Größe <M>{"t"}</M> reagiert,
        behalten wir den linearen Term und stecken alles Übrige in{" "}
        <M>{"O(t^2)"}</M>.
      </p>
      <TaylorWidget />
    </>
  ),
});
