/** Konzept-Tooltip: Hyperebene, das n-dimensionale Gegenstück zu Gerade/Ebene. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function OneEquationWidget() {
  const [a1, setA1] = useState(1);
  const [a2, setA2] = useState(1);
  const [b, setB] = useState(1);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Die Lösungsmenge der einzelnen Gleichung{" "}
        <M>{"a_1 x_1 + a_2 x_2 = b"}</M> ist eine Gerade, eine
        Hyperebene im <M>{"\\R^2"}</M>. Verschieben wir die Koeffizienten,
        kippt und wandert die Gerade, aber sie bleibt immer eine
        Gerade.
      </p>
      <Slider label="a₁" value={a1} onChange={setA1} min={-3} max={3} step={0.1} />
      <Slider label="a₂" value={a2} onChange={setA2} min={0.3} max={3} step={0.1} />
      <Slider label="b" value={b} onChange={setB} min={-3} max={3} step={0.1} />
      <p className="my-1 text-center text-sm">
        <M>{`${a1.toFixed(1)}\\, x_1 ${a2 < 0 ? "-" : "+"} ${Math.abs(a2).toFixed(1)}\\, x_2 = ${b.toFixed(1)}`}</M>
      </p>
      <LabeledPlot
        xLabel="x₁"
        yLabel="x₂"
        tickClass="text-slate-300"
        series={[{ f: (x) => (b - a1 * x) / a2 }]}
        xDomain={[-4, 4]}
        yDomain={[-4, 4]}
        width={280}
        height={200}
      />
    </div>
  );
}

registerConcept({
  id: "hyperplane",
  title: "Hyperebene",
  body: (
    <>
      <p>
        Betrachten wir eine lineare Gleichung in zwei Unbekannten, etwa{" "}
        <M>{"x_1 + 2x_2 = 3"}</M>. Die Paare <M>{"(x_1, x_2)"}</M>, die sie
        erfüllen, bilden eine Gerade in der Ebene. Bei drei Unbekannten wird
        eine Gleichung wie <M>{"x_1 + x_2 + x_3 = 1"}</M> von einer ganzen
        flachen Punktschicht erfüllt – einer Ebene, die im Raum schwebt.
        Eine <em>Hyperebene</em> (hyperplane) ist dieselbe Idee, fortgesetzt in
        den{" "}
        <ConceptLink id="real-coordinate-space">
          <M>{"\\R^n"}</M>
        </ConceptLink>{" "}
        für beliebiges <M>{"n"}</M>: die Menge aller Punkte, die eine einzige
        lineare Gleichung erfüllen,
      </p>
      <MD>{"a_1 x_1 + a_2 x_2 + \\cdots + a_n x_n = b."}</MD>
      <p>
        Sie ist vollkommen flach und hat{" "}
        <ConceptLink id="dimension">Dimension</ConceptLink> <M>{"n-1"}</M>,
        eins weniger als der umgebende Raum, genauso wie eine Gerade
        (Dimension 1) in der Ebene (Dimension 2) liegt. Diese eine verlorene
        Dimension ist der „Preis“ einer Gleichung: Eine lineare Bedingung
        festzulegen kostet einen Freiheitsgrad. Deshalb steuert im
        geometrischen Bild eines linearen Gleichungssystems jede Gleichung eine
        Hyperebene bei, und die Lösungen des gesamten Systems sind genau die
        Punkte, in denen sich alle diese Hyperebenen schneiden.
      </p>
      <OneEquationWidget />
    </>
  ),
});
