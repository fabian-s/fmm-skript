/** Concept tooltip: Grenzwert (die Notation h -> 0 beim Differenzenquotienten). */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

function LimitWidget() {
  const [h, setH] = useState(1.2);
  // difference quotient of x^2 at x0 = 1: ((1+h)^2 - 1)/h = 2 + h, undefined at h = 0
  const g = (t: number) => (Math.abs(t) < 1e-9 ? NaN : ((1 + t) * (1 + t) - 1) / t);
  const hEff = Math.abs(h) < 0.01 ? 0.01 : h;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="h" value={h} onChange={setH} min={-1.5} max={1.5} step={0.01} />
      <Plot
        series={[{ f: g, color: "#0284c7" }]}
        xDomain={[-1.6, 1.6]}
        yDomain={[0, 4]}
        width={280}
        height={190}
        markers={[
          { x: hEff, y: g(hEff), label: `g(h) = ${g(hEff).toFixed(2)}` },
          { x: 0, y: 2, color: "#16a34a", label: "Grenzwert 2" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        g(h) = ((1+h)² − 1)/h ist bei h = 0 nicht definiert — schieben wir h
        aber gegen 0, nähert sich der Wert 2 an. Der Grenzwert für h → 0 ist
        also 2.
      </p>
    </div>
  );
}

registerConcept({
  id: "limit",
  title: "Grenzwert",
  body: (
    <>
      <p>
        Die Grenzwert-Notation (limit) <M>{"\\lim_{h \\to 0} g(h) = L"}</M>{" "}
        fragt: Auf welchen Wert steuert <M>{"g(h)"}</M> zu, wenn wir{" "}
        <M>{"h"}</M> beliebig klein machen (ohne jemals genau 0 zu erreichen)?
        Entscheidend: <M>{"g"}</M> muss <em>an</em> der Stelle{" "}
        <M>{"h = 0"}</M> gar nicht definiert sein — nur das Verhalten in der
        Nähe zählt. Genau das rettet den Differenzenquotienten (vgl. MML
        Definition 5.2): Direktes Einsetzen von <M>{"h = 0"}</M> ergäbe das
        sinnlose <M>{"0/0"}</M>, aber der Grenzwert der Werte für schrumpfendes{" "}
        <M>{"h"}</M> kann trotzdem existieren. Konkret für{" "}
        <M>{"f(x) = x^2"}</M> an der Stelle <M>{"x_0 = 1"}</M>:
      </p>
      <MD>{"\\frac{(1+h)^2 - 1}{h} = \\frac{2h + h^2}{h} = 2 + h \\;\\xrightarrow{\\;h \\to 0\\;}\\; 2."}</MD>
      <p>
        Formal ist das dieselbe Idee wie die{" "}
        <ConceptLink id="convergence">Konvergenz</ConceptLink> einer{" "}
        <ConceptLink id="sequence">Folge</ConceptLink>: Auf <em>jedem</em> Weg,
        auf dem wir <M>{"h"}</M> gegen 0 schrumpfen lassen (etwa{" "}
        <M>{"h = 0.1, 0.01, 0.001, \\dots"}</M> oder von der negativen Seite),
        müssen sich die Werte <M>{"g(h)"}</M> derselben Zahl <M>{"L"}</M>{" "}
        annähern; liefern verschiedene Wege verschiedene Werte, existiert der
        Grenzwert nicht.
      </p>
      <LimitWidget />
    </>
  ),
});
