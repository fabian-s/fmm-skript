import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

/**
 * Untervektorraum: Der Regler c zeigt, dass alle Vielfachen eines Vektors
 * eine Gerade durch den Ursprung nachzeichnen, einen 1-dimensionalen
 * Untervektorraum der Ebene. Ein fester Punkt abseits dieser Geraden
 * illustriert „liegt nicht im Untervektorraum".
 */
function SubspaceWidget() {
  const [c, setC] = useState(1.2);
  const v: [number, number] = [2, 1];
  const cv: [number, number] = [c * v[0], c * v[1]];
  const w: [number, number] = [-1, 1.8];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="c" value={c} onChange={setC} min={-1.5} max={1.5} step={0.1} fmt={(x) => x.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        c·v = ({cv[0].toFixed(1)}, {cv[1].toFixed(1)})
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        vectors={[
          { v: v, color: "#38bdf8", label: "v" },
          { v: cv, color: "#f472b6", label: "c·v" },
          { v: w, color: "#94a3b8", label: "w (nicht auf der Geraden)" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Jede Position, die der pinke Vektor erreichen kann, liegt auf einer
        Geraden durch den Ursprung: Diese Gerade ist ein Untervektorraum. Der
        graue Vektor w liegt nicht darauf; kein noch so geschicktes
        Skalieren von v wird ihn je erreichen.
      </p>
    </div>
  );
}

registerConcept({
  id: "subspace",
  title: "Untervektorraum",
  body: (
    <>
      <p>
        Ein <em>Untervektorraum</em> (subspace) ist ein flaches Stück eines{" "}
        <ConceptLink id="vector-space">Vektorraums</ConceptLink>, das durch
        den Ursprung geht und in sich abgeschlossen ist: Addieren wir zwei{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink> daraus oder skalieren
        wir einen, landen wir nie außerhalb. Formal ist eine Teilmenge{" "}
        <M>{"S"}</M> ein Untervektorraum, wenn
      </p>
      <MD>{"\\bu, \\bv \\in S \\;\\Rightarrow\\; \\bu + \\bv \\in S \\quad \\text{und} \\quad \\alpha \\bv \\in S \\text{ für jeden Skalar } \\alpha."}</MD>
      <p>
        In <M>{"\\R^3"}</M> sind die Untervektorräume genau: der Ursprung
        allein, Geraden durch den Ursprung, Ebenen durch den Ursprung und ganz{" "}
        <M>{"\\R^3"}</M>, jeder mit seiner eigenen{" "}
        <ConceptLink id="dimension">Dimension</ConceptLink>. Das für uns
        wichtigste Beispiel: Die{" "}
        <ConceptLink id="span">lineare Hülle</ConceptLink> der Spalten einer
        Matrix <M>{"\\bA"}</M>, also alle{" "}
        <ConceptLink id="linear-combination">Linearkombinationen</ConceptLink>{" "}
        <M>{"\\bA\\bx"}</M>, ist ein Untervektorraum. Die Methode der
        kleinsten Quadrate (vgl. Heath §3.1) sucht den Punkt dieses
        niedrigdimensionalen Untervektorraums, der einem Datenvektor{" "}
        <M>{"\\bb"}</M> am nächsten liegt – der typischerweise
        außerhalb liegt.
      </p>
      <SubspaceWidget />
    </>
  ),
});
