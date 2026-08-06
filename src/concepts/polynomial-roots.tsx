/** Konzept-Tooltip: Nullstellen von Polynomen: Fundamentalsatz der Algebra. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function RootsWidget() {
  const [c, setC] = useState(-1);
  const real = c <= 0;
  const r = Math.sqrt(Math.abs(c));
  const marks = real
    ? [
        { x: -r, y: 0, color: "#dc2626", label: r === 0 ? "doppelte Nullstelle" : "−√(−c)" },
        ...(r > 0 ? [{ x: r, y: 0, color: "#dc2626", label: "√(−c)" }] : []),
      ]
    : [];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="c" value={c} onChange={setC} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <div className="my-1 font-mono text-xs">
        {real
          ? c === 0
            ? "Nullstellen: x = 0 (Vielfachheit 2)"
            : `Nullstellen: x = ±${r.toFixed(2)} (beide reell)`
          : `Nullstellen: x = ±${r.toFixed(2)}i (komplexes Paar, Graph berührt die Achse nie)`}
      </div>
      <LabeledPlot
        xLabel="x"
        yLabel="p(x)"
        tickClass="text-slate-300"
        series={[{ f: (x) => x * x + c, color: "#0284c7" }]}
        markers={marks}
        xDomain={[-3, 3]}
        yDomain={[-2.5, 4]}
        width={280}
        height={190}
      />
      <p className="mt-1 text-xs opacity-80">
        Schieben wir <M>{"c"}</M> nach oben: Die beiden reellen Nullstellen von{" "}
        <M>{"p(x) = x^2 + c"}</M> verschmelzen bei <M>{"c = 0"}</M> zu einer
        doppelten Nullstelle und verlassen dann die reelle Achse ganz. Sie
        verschwinden aber nicht, sondern wandern als Paar{" "}
        <M>{"\\pm i\\sqrt{c}"}</M> in die komplexe Ebene, die Anzahl bleibt
        zwei.
      </p>
    </div>
  );
}

registerConcept({
  id: "polynomial-roots",
  title: "Nullstellen von Polynomen",
  body: (
    <>
      <p>
        Eine <em>Nullstelle</em> (engl. <em>root</em>) eines Polynoms{" "}
        <M>{"p"}</M> ist eine Zahl <M>{"x"}</M> mit <M>{"p(x) = 0"}</M>. Der{" "}
        <em>Fundamentalsatz der Algebra</em> sagt: Ein Polynom vom Grad{" "}
        <M>{"n"}</M> hat <em>genau</em> <M>{"n"}</M> Nullstellen, sofern wir
        sie in den{" "}
        <ConceptLink id="complex-numbers">komplexen Zahlen</ConceptLink> zählen
        und mehrfache Nullstellen mit ihrer <em>Vielfachheit</em> mitzählen.
        Gleichwertig formuliert: <M>{"p"}</M> zerfällt vollständig in
        Linearfaktoren:
      </p>
      <MD>{"p(x) = c\\,(x - r_1)(x - r_2) \\cdots (x - r_n)."}</MD>
      <p>
        Kleines Beispiel:{" "}
        <M>{"x^3 - 6x^2 + 11x - 6 = (x-1)(x-2)(x-3)"}</M> hat die drei
        Nullstellen <M>{"1, 2, 3"}</M>; dagegen hat{" "}
        <M>{"(x-2)^2 = x^2 - 4x + 4"}</M> die einzige Nullstelle <M>{"2"}</M>{" "}
        mit Vielfachheit zwei, und <M>{"x^2 + 1"}</M> hat gar keine reelle
        Nullstelle, sondern das komplexe Paar <M>{"\\pm i"}</M>. Sind alle
        Koeffizienten reell, treten komplexe Nullstellen stets in konjugierten
        Paaren <M>{"a \\pm bi"}</M> auf.
      </p>
      <p>
        Diese Abzählung garantiert, dass jede <M>{"n \\times n"}</M>-
        <ConceptLink id="matrix">Matrix</ConceptLink> genau <M>{"n"}</M>{" "}
        Eigenwerte besitzt (mit Vielfachheiten gezählt): Sie sind die
        Nullstellen ihres charakteristischen Polynoms vom Grad <M>{"n"}</M>.
      </p>
      <RootsWidget />
    </>
  ),
});
