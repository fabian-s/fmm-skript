import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

function RotationWidget() {
  const [deg, setDeg] = useState(35);
  const th = (deg * Math.PI) / 180;
  const c = Math.cos(th);
  const s = Math.sin(th);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="θ (Grad)" value={deg} onChange={setDeg} min={-180} max={180} step={1} />
      <div className="my-1 font-mono text-xs">
        cos θ = {c.toFixed(3)}, sin θ = {s.toFixed(3)}
      </div>
      <MD>{`\\bQ = \\begin{pmatrix} ${c.toFixed(2)} & ${(-s).toFixed(2)} \\\\ ${s.toFixed(2)} & ${c.toFixed(2)} \\end{pmatrix}`}</MD>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [c, -s],
          [s, c],
        ]}
        vectors={[
          { v: [c, s], color: "#dc2626", label: "Q e₁" },
          { v: [-s, c], color: "#16a34a", label: "Q e₂" },
        ]}
        size={240}
        worldHalf={1.6}
      />
      <p className="mt-1 text-xs opacity-80">
        Der gestrichelte Einheitskreis landet exakt auf sich selbst: Drehen
        ändert keine einzige Länge, es dreht nur die ganze Ebene um θ.
      </p>
    </div>
  );
}

registerConcept({
  id: "rotation-matrix",
  title: "Drehmatrix",
  body: (
    <>
      <p>
        Eine <em>Drehmatrix</em> (rotation matrix) dreht jeden Punkt der Ebene
        um den Ursprung, und zwar um einen festen Winkel <M>{"\\theta"}</M>.
        Sie ist die <ConceptLink id="matrix">Matrix</ConceptLink> der{" "}
        <ConceptLink id="linear-transformation">linearen Abbildung</ConceptLink>{" "}
        „drehe um <M>{"\\theta"}</M>&ldquo;:
      </p>
      <MD>{"\\bQ = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}."}</MD>
      <p>
        Mit <M>{"\\theta = 90^\\circ"}</M> etwa wird <M>{"(1,0)^T"}</M> auf{" "}
        <M>{"(0,1)^T"}</M> geschickt: eine Vierteldrehung. Weil Drehen weder
        Längen noch Winkel ändert, ist <M>{"\\bQ"}</M> eine{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrix</ConceptLink>{" "}
        (ihre Spalten sind zueinander senkrechte Einheitsvektoren), und ihre{" "}
        <ConceptLink id="determinant">Determinante</ConceptLink> ist{" "}
        <M>{"+1"}</M>: Drehungen erhalten die Orientierung, anders als{" "}
        <ConceptLink id="reflection">Spiegelungen</ConceptLink>, deren
        Determinante <M>{"-1"}</M> ist.
      </p>
      <p>
        Drehungen, die gezielt jeweils einen Eintrag eines Vektors zu Null
        machen, heißen Givens-Rotationen und sind eines der wichtigsten
        Werkzeuge, um QR-Zerlegungen aufzubauen.
      </p>
      <RotationWidget />
    </>
  ),
});
