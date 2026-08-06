import { useState } from "react";
import { ConceptLink, M, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas, maxAbsCoord } from "../lib";

function IndependenceWidget() {
  const [bx, setBx] = useState(-1);
  const [by, setBy] = useState(1.5);
  // fixed first vector a = (2, 1); pair is dependent iff the parallelogram
  // they span has zero area, i.e. 2*by - 1*bx = 0.
  const cross = 2 * by - 1 * bx;
  const dependent = Math.abs(cross) < 0.05;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="b, 1. Eintrag" value={bx} onChange={setBx} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="b, 2. Eintrag" value={by} onChange={setBy} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        b = ({bx.toFixed(1)}, {by.toFixed(1)}) · Parallelogrammfläche |2·{by.toFixed(1)} − 1·
        {bx.toFixed(1)}| = {Math.abs(cross).toFixed(2)}
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        vectors={[
          { v: [2, 1], color: "#0284c7", label: "a" },
          { v: [bx, by], color: "#dc2626", label: "b" },
        ]}
        showUnitCircle={false}
        size={260}
        worldHalf={Math.max(3.2, 1.35 * maxAbsCoord([2, 1], [bx, by]))}
      />
      <p className={"mt-1 text-xs " + (dependent ? "text-red-400" : "text-emerald-400")}>
        {dependent
          ? "b liegt auf derselben Ursprungsgeraden wie a: das Paar ist linear ABHÄNGIG."
          : "b zeigt weg von der Geraden durch a: das Paar ist linear unabhängig."}
      </p>
    </div>
  );
}

registerConcept({
  id: "linear-independence",
  title: "Lineare Unabhängigkeit",
  body: (
    <>
      <p>
        Eine Sammlung von <ConceptLink id="vector">Vektoren</ConceptLink> ist{" "}
        <em>linear unabhängig</em>, wenn keiner von ihnen überflüssig ist:
        kein Vektor der Sammlung lässt sich als{" "}
        <ConceptLink id="linear-combination">Linearkombination</ConceptLink>{" "}
        der übrigen schreiben. Lässt sich ein Vektor doch aus den anderen
        bauen, heißt die Sammlung linear <em>abhängig</em>.
      </p>
      <p>
        In der Ebene ist das leicht vorstellbar: Zwei Vektoren sind genau dann
        abhängig, wenn sie auf einer gemeinsamen Ursprungsgeraden liegen. Zum
        Beispiel ist <M>{"(2, 4)"}</M> einfach <M>{"2 \\cdot (1, 2)"}</M>, das
        Paar <M>{"(1,2), (2,4)"}</M> ist also abhängig, während{" "}
        <M>{"(1,2)"}</M> und <M>{"(3,1)"}</M> in wirklich verschiedene
        Richtungen zeigen und unabhängig sind. Unabhängige Vektoren steuern je
        eine neue Richtung bei; auf genau dieser Zählidee bauen die Begriffe{" "}
        <ConceptLink id="rank">Rang</ConceptLink> und{" "}
        <ConceptLink id="dimension">Dimension</ConceptLink> auf.
      </p>
      <p className="text-xs opacity-80">
        Bewegen wir die Regler: In dem Moment, in dem <M>{"b"}</M> auf der
        Geraden durch <M>{"a"}</M> landet, ist die Unabhängigkeit verloren.
      </p>
      <IndependenceWidget />
    </>
  ),
});
