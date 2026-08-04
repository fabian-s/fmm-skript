import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

function TwoLinesWidget() {
  const [m, setM] = useState(0.5);
  // line 1: x + y = 2  ->  y = 2 - x;  line 2: y = m x
  const denom = 1 + m;
  const hasSolution = Math.abs(denom) > 0.02;
  const xs = 2 / denom;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Steigung m" value={m} onChange={setM} min={-2} max={2} step={0.05} />
      <Plot
        series={[
          { f: (x) => 2 - x, color: "#0284c7" },
          { f: (x) => m * x, color: "#dc2626" },
        ]}
        xDomain={[-4, 4]}
        yDomain={[-4, 4]}
        width={280}
        height={200}
        markers={hasSolution ? [{ x: xs, y: m * xs, color: "#16a34a", label: "Lösung" }] : []}
      />
      <p className="mt-1 text-xs">
        Jede Gleichung ist eine Gerade; die Lösung des Systems{" "}
        <M>{"x + y = 2,\\; y = m x"}</M> ist ihr Schnittpunkt.{" "}
        {hasSolution
          ? "Hier schneiden sich die Geraden in genau einem Punkt."
          : "Bei m = −1 sind die Geraden parallel: Es gibt keine Lösung."}
      </p>
    </div>
  );
}

registerConcept({
  id: "linear-system",
  title: "Lineares Gleichungssystem",
  body: (
    <>
      <p>
        Ein lineares Gleichungssystem ist eine Sammlung von Gleichungen, in
        denen jede Unbekannte nur mit einer Zahl multipliziert und aufsummiert
        vorkommt — keine Quadrate, keine Produkte von Unbekannten, keine
        anderen nichtlinearen Terme. Zum Beispiel bilden{" "}
        <M>{"2x + 3y = 5"}</M> und <M>{"x - y = 1"}</M> zusammen ein System in
        den zwei Unbekannten <M>{"x, y"}</M>; eine Lösung ist jede Belegung der
        Unbekannten, die <em>alle</em> Gleichungen gleichzeitig erfüllt.
        Stapeln wir die Koeffizienten in eine{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M> und die
        Unbekannten in einen <ConceptLink id="vector">Vektor</ConceptLink>{" "}
        <M>{"\\bx"}</M>, schrumpft das ganze System auf eine Gleichung:
      </p>
      <MD>
        {"\\begin{pmatrix} 2 & 3 \\\\ 1 & -1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 1 \\end{pmatrix}, \\quad \\text{d.h.} \\quad \\bA\\bx = \\bb."}
      </MD>
      <p>
        Systeme lassen sich mechanisch mit dem{" "}
        <ConceptLink id="gaussian-elimination">Gauß-Verfahren</ConceptLink>{" "}
        lösen, und ob <M>{"\\bA\\bx = \\bb"}</M> genau eine Lösung hat,
        entscheidet die Determinante von <M>{"\\bA"}</M>: genau eine Lösung,
        wenn sie ungleich null ist.
      </p>
      <TwoLinesWidget />
    </>
  ),
});
