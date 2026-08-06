/** Concept tooltip: function composition g ∘ f. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/** Live pipeline x -> f(x) = x + 1 -> g(f(x)) = (x + 1)^2. */
function CompositionPipeline() {
  const [x, setX] = useState(1);
  const fx = x + 1;
  const gfx = fx * fx;
  const box = "rounded bg-white px-2 py-1 font-mono text-xs text-slate-800";
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x" value={x} onChange={setX} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
        <span className={box}>x = {x.toFixed(1)}</span>
        <span>
          –<M>{"f"}</M>→
        </span>
        <span className={box}>f(x) = {fx.toFixed(1)}</span>
        <span>
          –<M>{"g"}</M>→
        </span>
        <span className={box}>g(f(x)) = {gfx.toFixed(2)}</span>
      </div>
      <div className="mt-1 text-xs">
        Hier ist <M>{"f(x) = x + 1"}</M> und <M>{"g(y) = y^2"}</M>, also{" "}
        <M>{"(g \\circ f)(x) = (x + 1)^2"}</M>.
      </div>
    </div>
  );
}

registerConcept({
  id: "function-composition",
  title: "Komposition von Funktionen",
  body: (
    <>
      <p>
        Zwei <ConceptLink id="function">Funktionen</ConceptLink> zu{" "}
        <em>komponieren</em> (engl. <em>function composition</em>) heißt, sie
        nacheinander auszuführen: Erst wenden wir <M>{"f"}</M> auf{" "}
        <M>{"x"}</M> an, dann stecken wir das Ergebnis in <M>{"g"}</M>. Die
        Verkettung schreiben wir <M>{"g \\circ f"}</M> (lies: „g nach f"):
      </p>
      <MD>{"(g \\circ f)(x) = g(f(x)), \\qquad x \\mapsto f(x) \\mapsto g(f(x))."}</MD>
      <p>
        Die Reihenfolge zählt: <M>{"g \\circ f"}</M> und{" "}
        <M>{"f \\circ g"}</M> sind in der Regel verschiedene Funktionen. Damit
        die Kette Sinn ergibt, müssen die Ausgaben von <M>{"f"}</M> im{" "}
        <ConceptLink id="domain-codomain">Definitionsbereich</ConceptLink> von{" "}
        <M>{"g"}</M> liegen.
      </p>
      <p>
        Kleines Beispiel: Mit <M>{"f(x) = x + 1"}</M> und{" "}
        <M>{"g(y) = y^2"}</M> ist die Verkettung{" "}
        <M>{"(g \\circ f)(x) = (x + 1)^2"}</M>, bei <M>{"x = 2"}</M> also:{" "}
        <M>{"2 \\mapsto 3 \\mapsto 9"}</M>. Eine komplizierte Funktion als
        solche Kette einfacher Schritte zu erkennen ist genau das, was die
        Kettenregel beim Ableiten ausnutzt.
      </p>
      <CompositionPipeline />
    </>
  ),
});
