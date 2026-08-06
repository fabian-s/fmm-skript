import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

/**
 * Split a vector b into its part along a 1-D subspace (span of u) and the
 * leftover part, which lands in the orthogonal complement of that line.
 */
function ComplementWidget() {
  const [b1, setB1] = useState(0.5);
  const [b2, setB2] = useState(2.0);
  const u: [number, number] = [2, 1];
  const uu = u[0] * u[0] + u[1] * u[1];
  const ub = u[0] * b1 + u[1] * b2;
  const proj: [number, number] = [(ub / uu) * u[0], (ub / uu) * u[1]];
  const perp: [number, number] = [b1 - proj[0], b2 - proj[1]];
  const check = perp[0] * u[0] + perp[1] * u[1];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="b₁" value={b1} onChange={setB1} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="b₂" value={b2} onChange={setB2} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        b = p + r,{"  "}p = ({proj[0].toFixed(2)}, {proj[1].toFixed(2)}),{"  "}r = ({perp[0].toFixed(2)},{" "}
        {perp[1].toFixed(2)}),{"  "}rᵀu = {check.toFixed(2)}
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
        worldHalf={3.4}
        vectors={[
          { v: u, color: "#38bdf8", label: "u (spannt S auf)" },
          { v: [b1, b2], color: "#e2e8f0", label: "b" },
          { v: proj, color: "#34d399", label: "p ∈ S" },
          { v: perp, color: "#f472b6", label: "r ∈ S⊥" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Egal, wie wir b verschieben: Der grüne Anteil liegt auf der blauen
        Geraden S, und der pinke Rest r steht senkrecht darauf (rᵀu = 0 bis
        auf Rundung); r lebt im orthogonalen Komplement S⊥.
      </p>
    </div>
  );
}

registerConcept({
  id: "orthogonal-complement",
  title: "Orthogonales Komplement",
  body: (
    <>
      <p>
        Das <em>orthogonale Komplement</em> (engl.{" "}
        <em>orthogonal complement</em>) eines{" "}
        <ConceptLink id="subspace">Unterraums</ConceptLink>{" "}
        <M>{"S \\subseteq \\R^n"}</M>, geschrieben <M>{"S^\\perp"}</M>,
        sammelt alle Vektoren ein, die{" "}
        <ConceptLink id="orthogonality">orthogonal</ConceptLink> zu{" "}
        <em>ganz</em> <M>{"S"}</M> stehen:
      </p>
      <MD>{"S^\\perp = \\left\\{ \\bv \\in \\R^n : \\bv^T \\bs = 0 \\text{ für alle } \\bs \\in S \\right\\} ."}</MD>
      <p>
        Ist <M>{"S"}</M> eine Ursprungsgerade in{" "}
        <M>{"\\R^2"}</M>, dann ist <M>{"S^\\perp"}</M> die dazu senkrechte
        Gerade; für eine Ebene in <M>{"\\R^3"}</M> ist es die Normalengerade,
        und die <ConceptLink id="dimension">Dimensionen</ConceptLink>{" "}
        addieren sich immer zu <M>{"n"}</M> auf. Der Gewinn ist eine
        eindeutige Zerlegung: Jeder Vektor spaltet sich auf als{" "}
        <M>{"\\bb = \\bp + \\br"}</M> mit <M>{"\\bp \\in S"}</M> und{" "}
        <M>{"\\br \\in S^\\perp"}</M>. Genau diese Aufspaltung berechnet die
        Kleinste-Quadrate-Methode: Der Projektor <M>{"\\bP"}</M> (vgl. Heath
        §3.2) erzeugt das Stück in{" "}
        <M>{"S = \\mathrm{span}(\\bA)"}</M>, sein Gegenstück{" "}
        <M>{"\\bI - \\bP"}</M> das Stück in <M>{"S^\\perp"}</M>, und das
        Residuum landet in{" "}
        <M>{"\\mathrm{span}(\\bA)^\\perp"}</M>, und das ist dieselbe Menge
        wie der <ConceptLink id="null-space">Nullraum</ConceptLink> von{" "}
        <M>{"\\bA^T"}</M>.
      </p>
      <ComplementWidget />
    </>
  ),
});
