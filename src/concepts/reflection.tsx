import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

function ReflectionWidget() {
  const [deg, setDeg] = useState(30);
  const th = (deg * Math.PI) / 180;
  const c2 = Math.cos(2 * th);
  const s2 = Math.sin(2 * th);
  // Beispielpunkt und sein Spiegelbild
  const a: [number, number] = [2, 1];
  const Ha: [number, number] = [c2 * a[0] + s2 * a[1], s2 * a[0] - c2 * a[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Winkel der Spiegelachse (Grad)" value={deg} onChange={setDeg} min={0} max={180} step={1} />
      <div className="my-1 font-mono text-xs">
        H a = ({Ha[0].toFixed(2)}, {Ha[1].toFixed(2)})ᵀ, det H = −1
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [c2, s2],
          [s2, -c2],
        ]}
        vectors={[
          { v: [2.6 * Math.cos(th), 2.6 * Math.sin(th)], color: "#64748b", label: "Spiegelachse" },
          { v: a, color: "#dc2626", label: "a" },
          { v: Ha, color: "#16a34a", label: "H a" },
        ]}
        size={240}
        worldHalf={3}
      />
      <p className="mt-1 text-xs opacity-80">
        Der grüne Pfeil ist das Spiegelbild des roten an der grauen Achse.
        Zweimal spiegeln bringt jeden Punkt an seinen Ausgangsort zurück:{" "}
        <M>{"\\bH^2 = \\bI"}</M>.
      </p>
    </div>
  );
}

registerConcept({
  id: "reflection",
  title: "Spiegelung",
  body: (
    <>
      <p>
        Eine <em>Spiegelung</em> (reflection) ist die{" "}
        <ConceptLink id="linear-transformation">lineare Abbildung</ConceptLink>
        , die jeden Punkt an einer festen Geraden durch den Ursprung spiegelt
        (in höheren Dimensionen: an einer Ebene oder{" "}
        <ConceptLink id="hyperplane">Hyperebene</ConceptLink>). Spiegeln
        ändert weder Längen noch Winkel, ihre{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> ist also eine{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrix</ConceptLink>;
        anders als eine <ConceptLink id="rotation-matrix">Drehung</ConceptLink>{" "}
        kehrt sie aber die Orientierung um; das zeigt sich an der{" "}
        <ConceptLink id="determinant">Determinante</ConceptLink> <M>{"-1"}</M>.
      </p>
      <p>
        In der Ebene hat die Spiegelung an der Geraden mit Winkel{" "}
        <M>{"\\theta"}</M> die Matrix
      </p>
      <MD>{"\\bH = \\begin{pmatrix} \\cos 2\\theta & \\sin 2\\theta \\\\ \\sin 2\\theta & -\\cos 2\\theta \\end{pmatrix},"}</MD>
      <p>
        z.&thinsp;B. liefert <M>{"\\theta = 45^\\circ"}</M> die Abbildung, die
        die beiden Koordinaten vertauscht: <M>{"(2,1)^T \\mapsto (1,2)^T"}</M>.
        Dieselbe Spiegelung zweimal ausgeführt hebt sich auf, also{" "}
        <M>{"\\bH^{-1} = \\bH"}</M>.
      </p>
      <p>
        Diese Geometrie ist der Kern der Householder-Transformationen (vgl.
        Heath §3.5.1): Eine geschickt gewählte Spiegelung wirft einen beliebig
        vorgegebenen Vektor auf eine Koordinatenachse und löscht dabei alle
        seine übrigen Einträge auf einen Schlag.
      </p>
      <ReflectionWidget />
    </>
  ),
});
