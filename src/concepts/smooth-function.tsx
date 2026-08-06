/** Konzept-Tooltip: glatte (C-unendlich) Funktionen. */
import { ConceptLink, M, Plot, registerConcept } from "../lib";

registerConcept({
  id: "smooth-function",
  title: "Glatte Funktion (C^∞)",
  body: (
    <>
      <p>
        Eine <ConceptLink id="function">Funktion</ConceptLink> heißt{" "}
        <em>glatt</em> (smooth), geschrieben <M>{"f \\in C^{\\infty}"}</M>,
        wenn wir sie so oft ableiten können, wie wir wollen:{" "}
        <M>{"f', f'', f''', \\dots"}</M> existieren alle, und jede dieser
        Ableitungen ist{" "}
        <ConceptLink id="continuity">stetig</ConceptLink>. Anschaulich: Der
        Graph hat weder Knicke noch Sprünge, und die Graphen aller
        Ableitungen auch nicht.
      </p>
      <p>
        Allgemeiner bezeichnet <M>{"C^k"}</M> die Funktionen, die mindestens{" "}
        <M>{"k"}</M>-mal{" "}
        <ConceptLink id="differentiability">differenzierbar</ConceptLink> sind
        mit stetiger <M>{"k"}</M>-ter Ableitung; <M>{"C^{\\infty}"}</M> heißt
        „liegt in <M>{"C^k"}</M> für jedes <M>{"k"}</M>&ldquo;. Polynome,{" "}
        <M>{"e^x"}</M>, <M>{"\\sin"}</M> und <M>{"\\cos"}</M> sind alle glatt.
        Ein Gegenbeispiel ist <M>{"f(x) = |x|"}</M>: Wegen des Knicks bei{" "}
        <M>{"x = 0"}</M> existiert <M>{"f'(0)"}</M> gar nicht; es
        scheitert also schon an der ersten Ableitung.
      </p>
      <p>
        Glattheit brauchen wir für Taylor-Reihen: Um eine hinzuschreiben,
        benötigen wir <em>alle</em> Ableitungen <M>{"f^{(k)}(x_0)"}</M>, die
        Definition setzt also <M>{"f \\in C^{\\infty}"}</M> voraus.
      </p>
      <div className="mt-2 rounded bg-slate-700/60 p-2">
        <Plot
          series={[
            { f: (x) => 0.5 * x * x, color: "#0284c7", label: "glatt" },
            { f: (x) => Math.abs(x), color: "#dc2626", dash: [5, 4], label: "Knick" },
          ]}
          xDomain={[-2, 2]}
          yDomain={[-0.5, 2.2]}
          width={280}
          height={170}
        />
        <div className="mt-1 text-xs">
          Blau: <M>{"x^2/2"}</M> (glatt). Rot gestrichelt: <M>{"|x|"}</M>.{" "}
          Der Knick bei 0 lässt schon die erste Ableitung scheitern.
        </div>
      </div>
    </>
  ),
});
