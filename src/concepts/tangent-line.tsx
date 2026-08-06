/** Konzept-Tooltip: Tangente: lokale lineare Näherung, mit Zoom. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function ZoomWidget() {
  const [zoom, setZoom] = useState(0);
  const a = 1;
  const w = 1.6 / Math.pow(2, zoom); // halbe Breite des Sichtfensters
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        <M>{"f(x) = x^2"}</M> (blau) und ihre Tangente{" "}
        <M>{"y = 2x - 1"}</M> im Punkt <M>{"(1,1)"}</M> (rot, gestrichelt).
        Zoomen wir hinein: Die Kurve wird von ihrer Tangente ununterscheidbar.
      </p>
      <Slider
        label="Zoom"
        value={zoom}
        onChange={setZoom}
        min={0}
        max={5}
        step={0.1}
        fmt={(v) => `${Math.pow(2, v).toFixed(1)}×`}
      />
      <LabeledPlot
        xLabel="x"
        yLabel="y"
        tickClass="text-slate-300"
        series={[
          { f: (x) => x * x },
          { f: (x) => 2 * x - 1, color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[a - w, a + w]}
        yDomain={[1 - 2.2 * w, 1 + 2.2 * w]}
        width={280}
        height={200}
        markers={[{ x: 1, y: 1, color: "#dc2626" }]}
      />
    </div>
  );
}

registerConcept({
  id: "tangent-line",
  title: "Tangente",
  body: (
    <>
      <p>
        Die Tangente an eine Kurve in einem Punkt ist die Gerade, die die
        Kurve dort berührt und exakt dieselbe Steigung hat wie die Kurve an
        dieser Stelle, nämlich die{" "}
        <ConceptLink id="derivative">Ableitung</ConceptLink>{" "}
        <M>{"f'(a)"}</M>. Ihre Gleichung lautet
      </p>
      <MD>{"y = f(a) + f'(a)\\,(x - a)."}</MD>
      <p>
        Für <M>{"f(x) = x^2"}</M> an der Stelle <M>{"a = 1"}</M> ist das{" "}
        <M>{"y = 1 + 2(x-1) = 2x - 1"}</M>. Was die Tangente so nützlich
        macht: Nahe <M>{"x = a"}</M> ist sie ein hervorragender Ersatz für
        die Kurve selbst: sie ist die <em>lokale lineare
        Näherung</em> (local linear approximation). Das ist der handfeste
        geometrische Grund, warum Methoden für lineare Probleme so weit
        tragen: Nahe genug an jedem interessanten Punkt verhält sich eine
        glatte nichtlineare Funktion wie ihre Tangente.
      </p>
      <ZoomWidget />
    </>
  ),
});
