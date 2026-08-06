import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

/**
 * Test mit zweiten Ableitungen in 2D: Schnitte von q(x, y) = ax² + by² entlang
 * beider Achsen. Schüssel (Minimum) genau dann, wenn beide Krümmungen positiv
 * sind = Hesse-Matrix positiv definit.
 */
function HessianWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-0.5);
  const verdict =
    a > 0 && b > 0
      ? "beide Schnitte krümmen sich nach oben: eine Schüssel. Hesse-Matrix positiv definit, (0,0) ist ein Minimum"
      : a < 0 && b < 0
        ? "beide Schnitte krümmen sich nach unten: eine Kuppel, (0,0) ist ein Maximum"
        : "ein Schnitt krümmt sich nach oben, einer nach unten (oder ist flach): ein Sattel, kein Minimum in (0,0)";
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="a (Krümmung in x)" value={a} onChange={setA} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="b (Krümmung in y)" value={b} onChange={setB} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        H = [[{(2 * a).toFixed(1)}, 0.0], [0.0, {(2 * b).toFixed(1)}]]
      </p>
      <LabeledPlot
        xLabel="t"
        yLabel="Schnitt durch q"
        tickClass="text-slate-300"
        series={[
          { f: (t) => a * t * t, color: "#38bdf8", label: "q(t, 0)" },
          { f: (t) => b * t * t, color: "#f472b6", dash: [5, 4], label: "q(0, t)" },
        ]}
        xDomain={[-2, 2]}
        yDomain={[-4, 4]}
        width={280}
        height={180}
      />
      <p className="mt-1 text-xs text-slate-300">
        Schnitte von q(x, y) = ax² + by² durch den kritischen Punkt: blau
        entlang der x-Achse, gestrichelt rosa entlang der y-Achse. {verdict}.
      </p>
    </div>
  );
}

registerConcept({
  id: "hessian-matrix",
  title: "Hesse-Matrix",
  body: (
    <>
      <p>
        Die <em>Hesse-Matrix</em> (engl. <em>Hessian</em>) einer Funktion{" "}
        <M>{"\\phi: \\R^n \\to \\R"}</M> ist die{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> aller zweiten{" "}
        <ConceptLink id="partial-derivative">partiellen Ableitungen</ConceptLink>,
      </p>
      <MD>
        {"\\bH_{\\phi}(\\bx) = \\left[ \\frac{\\partial^2 \\phi(\\bx)}{\\partial x_i \\, \\partial x_j} \\right]_{i,j=1}^{n},"}
      </MD>
      <p>
        das mehrdimensionale Gegenstück zur zweiten Ableitung{" "}
        <M>{"f''(x)"}</M> (für glattes <M>{"\\phi"}</M> ist sie automatisch{" "}
        <ConceptLink id="symmetric-matrix">symmetrisch</ConceptLink>, weil die
        Reihenfolge der Ableitungen keine Rolle spielt). Sie misst die Krümmung
        in alle Richtungen gleichzeitig und verallgemeinert damit den Test mit
        der zweiten Ableitung aus der Schule: Dort, wo der{" "}
        <ConceptLink id="gradient">Gradient</ConceptLink> verschwindet, hat{" "}
        <M>{"\\phi"}</M> ein lokales Minimum, wenn die Hesse-Matrix{" "}
        <ConceptLink id="positive-definite">positiv definit</ConceptLink> ist;
        sie krümmt sich dann in jede Richtung nach oben, wie eine Schüssel. Für
        die Kleinste-Quadrate-Zielfunktion ergibt sich als Hesse-Matrix die
        konstante Matrix <M>{"2\\bA^T\\bA"}</M>; ihre positive Definitheit ist
        genau das, was garantiert, dass die Lösung der Normalengleichungen
        wirklich ein Minimum ist und kein Sattelpunkt.
      </p>
      <HessianWidget />
    </>
  ),
});
