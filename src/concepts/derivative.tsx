/** Konzept-Tooltip: Ableitung, Auffrischung über Sekantensteigungen. */
import { useState } from "react";
import { ConceptLink, M, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function SecantWidget() {
  const [h, setH] = useState(1.2);
  const a = 1;
  const fa = a * a;
  const slope = ((a + h) * (a + h) - fa) / h; // = 2 + h for f(x) = x^2
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Sekante durch <M>{"(1, 1)"}</M> und <M>{"(1+h,\\,(1+h)^2)"}</M> auf{" "}
        <M>{"f(x) = x^2"}</M>. Verkleinern wir <M>{"h"}</M>, pendelt sich die
        Sekantensteigung <M>{"\\tfrac{f(1+h)-f(1)}{h}"}</M> bei{" "}
        <M>{"f'(1) = 2"}</M> ein.
      </p>
      <Slider label="h" value={h} onChange={setH} min={0.05} max={1.5} step={0.01} />
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[
          { f: (x) => x * x },
          { f: (x) => fa + slope * (x - a), color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-0.5, 2.8]}
        yDomain={[-0.5, 7]}
        width={280}
        height={200}
        markers={[
          { x: a, y: fa, color: "#dc2626" },
          { x: a + h, y: (a + h) * (a + h), color: "#dc2626" },
        ]}
      />
      <p className="mt-1 font-mono text-xs">Sekantensteigung = {slope.toFixed(3)}</p>
    </div>
  );
}

registerConcept({
  id: "derivative",
  title: "Ableitung",
  body: (
    <>
      <p>
        Die Ableitung <M>{"f'(a)"}</M> misst, wie schnell sich eine Funktion
        an der einzelnen Stelle <M>{"x = a"}</M> ändert: sie ist die
        Steigung des Graphen <em>genau dort</em>. Um sie zu fassen, berechnen
        wir die Steigung der Geraden durch zwei nahe Punkte des Graphen,{" "}
        <M>{"\\tfrac{f(a+h) - f(a)}{h}"}</M>, und lassen dann den zweiten
        Punkt auf den ersten zuwandern (<M>{"h \\to 0"}</M>). Für{" "}
        <M>{"f(x) = x^2"}</M> an der Stelle <M>{"a = 1"}</M> ergibt das{" "}
        <M>{"f'(1) = 2"}</M>: Nahe <M>{"x = 1"}</M> hebt ein winziges
        Anheben von <M>{"x"}</M> den Wert <M>{"f(x)"}</M> um ungefähr das
        Doppelte davon an.
      </p>
      <p>
        Das ist der Schlüssel zu gekrümmten Problemen: Weil die Ableitung die
        Steigung der <ConceptLink id="tangent-line">Tangente</ConceptLink>{" "}
        liefert, sieht jede glatte Kurve wie eine Gerade aus, wenn wir nur
        nah genug herangehen; ein komplizierter nichtlinearer
        Zusammenhang lässt sich also lokal durch einen einfachen linearen
        ersetzen.
      </p>
      <SecantWidget />
    </>
  ),
});
