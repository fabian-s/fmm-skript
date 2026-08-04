import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

/**
 * Rigid motions: apply a rotation (or reflection) Q to the grid, the unit
 * circle, and a test vector; the printed norms confirm ||Qv|| = ||v||.
 */
function OrthogonalMatrixWidget() {
  const [deg, setDeg] = useState(30);
  const [reflect, setReflect] = useState(false);
  const th = (deg * Math.PI) / 180;
  const c = Math.cos(th);
  const s = Math.sin(th);
  const Q: [[number, number], [number, number]] = reflect
    ? [
        [c, s],
        [s, -c],
      ]
    : [
        [c, -s],
        [s, c],
      ];
  const v: [number, number] = [2, 1];
  const Qv: [number, number] = [Q[0][0] * v[0] + Q[0][1] * v[1], Q[1][0] * v[0] + Q[1][1] * v[1]];
  const nv = Math.hypot(v[0], v[1]);
  const nQv = Math.hypot(Qv[0], Qv[1]);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Winkel θ (°)" value={deg} onChange={setDeg} min={0} max={360} step={1} fmt={(x) => x.toFixed(0)} />
      <label className="mb-1 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={reflect} onChange={(e) => setReflect(e.target.checked)} />
        Q als Spiegelung statt als Drehung
      </label>
      <p className="my-1 font-mono text-xs">
        ‖v‖₂ = {nv.toFixed(3)}{"   "}‖Qv‖₂ = {nQv.toFixed(3)} — immer gleich
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={Q}
        size={280}
        vectors={[
          { v: v, color: "#38bdf8", label: "v" },
          { v: Qv, color: "#f472b6", label: "Qv" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Das Bild des Einheitskreises unter Q ist wieder der Einheitskreis,
        und das transformierte Gitter behält seine quadratischen Zellen: Q
        bewegt alles starr, ohne irgendetwas zu strecken.
      </p>
    </div>
  );
}

registerConcept({
  id: "orthogonal-matrix",
  title: "Orthogonale Matrix",
  body: (
    <>
      <p>
        Eine quadratische Matrix <M>{"\\bQ"}</M> heißt <em>orthogonal</em>{" "}
        (engl. <em>orthogonal matrix</em>), wenn ihre Spalten eine{" "}
        <ConceptLink id="orthonormal-basis">Orthonormalbasis</ConceptLink>{" "}
        bilden — paarweise senkrechte Einheitsvektoren. Mit der{" "}
        <ConceptLink id="transpose">Transposition</ConceptLink> geschrieben,
        passt diese Bedingung in eine einzige Gleichung:
      </p>
      <MD>{"\\bQ^T \\bQ = \\bI, \\qquad \\text{also} \\qquad \\bQ^{-1} = \\bQ^T ."}</MD>
      <p>
        Die <ConceptLink id="matrix-inverse">Inverse</ConceptLink> bekommen
        wir also geschenkt — nichts zu lösen, wir vertauschen einfach Zeilen
        und Spalten von <M>{"\\bQ"}</M>. Geometrisch sind orthogonale
        Matrizen die starren Bewegungen:{" "}
        <ConceptLink id="rotation-matrix">Drehungen</ConceptLink> und{" "}
        <ConceptLink id="reflection">Spiegelungen</ConceptLink>, die Vektoren
        bewegen, ohne irgendetwas zu strecken oder zu stauchen. Insbesondere
        bleibt die <ConceptLink id="euclidean-norm">2-Norm</ConceptLink>{" "}
        unangetastet:
      </p>
      <MD>{"\\|\\bQ\\bv\\|_2^2 = (\\bQ\\bv)^T (\\bQ\\bv) = \\bv^T \\bQ^T \\bQ \\bv = \\bv^T \\bv = \\|\\bv\\|_2^2 ."}</MD>
      <p>
        Diese Invarianz ist der Motor hinter den QR-basierten
        Kleinste-Quadrate-Algorithmen (vgl. Heath §3.5): Multiplizieren wir
        das Residuum mit orthogonalen Matrizen, formen wir das Problem in
        ein leichtes Dreieckssystem um, <em>ohne die minimierte Größe zu
        verändern</em>.
      </p>
      <OrthogonalMatrixWidget />
    </>
  ),
});
