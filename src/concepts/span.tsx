import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas, maxAbsCoord } from "../lib";

/**
 * Span-Demo: Die lineare Hülle eines Vektors ist die Gerade all seiner
 * Vielfachen; ein unabhängiger zweiter Vektor füllt die ganze Ebene.
 */
function SpanWidget() {
  const [t, setT] = useState(1.2);
  const [two, setTwo] = useState(false);
  const [c2, setC2] = useState(0.8);
  const v1: [number, number] = [2, 1];
  const v2: [number, number] = [-1, 1];
  const mix: [number, number] = two
    ? [t * v1[0] + c2 * v2[0], t * v1[1] + c2 * v2[1]]
    : [t * v1[0], t * v1[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <label className="mb-1 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={two} onChange={(e) => setTwo(e.target.checked)} />
        zweiten Vektor v₂ hinzufügen
      </label>
      <Slider label="c₁" value={t} onChange={setT} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      {two && (
        <Slider label="c₂" value={c2} onChange={setC2} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      )}
      <p className="my-1 font-mono text-xs">
        {two ? `c₁v₁ + c₂v₂` : `c₁v₁`} = ({mix[0].toFixed(1)}, {mix[1].toFixed(1)})
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showUnitCircle={false}
        vectors={[
          { v: v1, color: "#38bdf8", label: "v₁" },
          ...(two ? [{ v: v2, color: "#f472b6", label: "v₂" }] : []),
          { v: mix, color: "#facc15", label: two ? "c₁v₁+c₂v₂" : "c₁v₁" },
        ]}
        size={280}
        worldHalf={Math.max(3.2, 1.35 * maxAbsCoord(v1, v2, mix))}
      />
      <p className="mt-1 text-xs text-slate-300">
        Mit v₁ allein kann der gelbe Vektor nur auf einer Geraden durch den
        Ursprung entlanggleiten; diese Gerade ist span(v₁). Kommt v₂
        dazu, erreichen die beiden Regler jeden Punkt der Ebene:
        span(v₁, v₂) ist ganz ℝ².
      </p>
    </div>
  );
}

registerConcept({
  id: "span",
  title: "Lineare Hülle (Span)",
  body: (
    <>
      <p>
        Die <em>lineare Hülle</em> (span) einer Sammlung von{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink> ist die Menge{" "}
        <em>alles dessen, was wir aus ihnen bauen können</em>: durch{" "}
        <ConceptLink id="linear-combination">Linearkombinationen</ConceptLink>,
        also jedes mögliche Skalieren und Addieren. Für eine{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M> lässt
        sich die lineare Hülle ihrer Spalten in{" "}
        <ConceptLink id="set-builder-notation">Mengenschreibweise</ConceptLink>{" "}
        schreiben als
      </p>
      <MD>
        {"\\operatorname{span}(\\bA) = \\{ \\bA\\bx : \\bx \\in \\R^n \\},"}
      </MD>
      <p>
        die Menge aller{" "}
        <ConceptLink id="matrix-vector-product">Produkte</ConceptLink>{" "}
        <M>{"\\bA\\bx"}</M>, wenn <M>{"\\bx"}</M> ganz{" "}
        <ConceptLink id="real-coordinate-space">
          <M>{"\\R^n"}</M>
        </ConceptLink>{" "}
        durchläuft. Geometrisch ist eine lineare Hülle immer „flach&ldquo; und
        enthält immer den Ursprung: Ein Vektor ungleich Null spannt eine
        Gerade auf, zwei{" "}
        <ConceptLink id="linear-independence">unabhängige</ConceptLink>{" "}
        Vektoren eine Ebene, und so weiter. „<M>{"\\bb"}</M> liegt in{" "}
        <M>{"\\operatorname{span}(\\bA)"}</M>&ldquo; heißt genau: Das
        Gleichungssystem <M>{"\\bA\\bx = \\bb"}</M> hat eine Lösung (vgl.
        Heath §2.1).
      </p>
      <SpanWidget />
    </>
  ),
});
