import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas, sigmaMax } from "../lib";

/** Adjustable 2x2 map: grid lines stay straight and evenly spaced, origin fixed. */
function LinearMapWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);
  const [c, setC] = useState(0);
  const [d, setD] = useState(1);
  const mat: [[number, number], [number, number]] = [
    [a, b],
    [c, d],
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="a" value={a} onChange={setA} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="b" value={b} onChange={setB} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="c" value={c} onChange={setC} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="d" value={d} onChange={setD} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 text-center text-sm">
        <M>
          {`\\bA = \\begin{bmatrix} ${a.toFixed(1)} & ${b.toFixed(1)} \\\\ ${c.toFixed(
            1
          )} & ${d.toFixed(1)} \\end{bmatrix}, \\quad \\det(\\bA) = ${(a * d - b * c).toFixed(2)}`}
        </M>
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={mat}
        vectors={[
          { v: [1, 0], color: "#38bdf8", label: "e₁" },
          { v: [0, 1], color: "#f472b6", label: "e₂" },
        ]}
        size={280}
        worldHalf={Math.max(3.2, 1.2 * sigmaMax(mat))}
      />
      <p className="mt-1 text-xs text-slate-300">
        Wie auch immer wir die vier Zahlen wählen: Das Gitter bleibt ein Gitter
        aus geraden, gleichmäßig verteilten Linien, und der Ursprung bewegt
        sich nie: der Fingerabdruck einer linearen Abbildung.
      </p>
    </div>
  );
}

registerConcept({
  id: "linear-transformation",
  title: "Lineare Transformation",
  body: (
    <>
      <p>
        Eine lineare Transformation ist eine Vorschrift <M>{"\\bL"}</M>, die
        Eingabe-<ConceptLink id="vector">Vektoren</ConceptLink> in
        Ausgabe-Vektoren verwandelt und dabei die beiden Grundoperationen für
        Vektoren respektiert: Sie bildet eine Summe auf die Summe der Bilder
        ab, und eine skalierte Eingabe auf das Bild mal denselben{" "}
        <ConceptLink id="scalar">Skalar</ConceptLink>,
      </p>
      <MD>
        {"\\bL(\\bu + \\bv) = \\bL\\bu + \\bL\\bv, \\qquad \\bL(c\\,\\bu) = c\\,\\bL\\bu."}
      </MD>
      <p>
        Intuitiv: Verdoppeln wir die Ursache, verdoppelt sich die Wirkung, und
        Wirkungen kombinierter Ursachen addieren sich einfach: keine
        Wechselwirkungen, keine Verschiebungen. Genau deshalb ist eine
        Gleichung <M>{"\\bL\\bu = \\boldsymbol{f}"}</M>, die Ursachen <M>{"\\bu"}</M>{" "}
        mit Wirkungen <M>{"\\boldsymbol{f}"}</M> verknüpft, so gut handhabbar. Sind Ein-
        und Ausgaben Listen endlich vieler Zahlen, lässt sich jede lineare
        Transformation als <ConceptLink id="matrix">Matrix</ConceptLink>{" "}
        schreiben, und ihre Anwendung ist ein{" "}
        <ConceptLink id="matrix-vector-product">Matrix-Vektor-Produkt</ConceptLink>.
        Spielen wir mit der Abbildung unten: Sie kann die Ebene drehen,
        strecken und scheren, aber niemals verbiegen.
      </p>
      <LinearMapWidget />
    </>
  ),
});
