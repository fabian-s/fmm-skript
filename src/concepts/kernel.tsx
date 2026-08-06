/** Concept tooltip: Kern / Nullraum. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider, TransformCanvas } from "../lib";

const KER_ANGLE = Math.atan2(-1, 2); // kernel direction of A = [[1,2],[0.5,1]]

function KernelWidget() {
  const [th, setTh] = useState(0.8);
  const v: [number, number] = [1.5 * Math.cos(th), 1.5 * Math.sin(th)];
  // A v for A = [[1,2],[0.5,1]] (rank 1, kernel = span{(2,-1)})
  const Av: [number, number] = [v[0] + 2 * v[1], 0.5 * v[0] + v[1]];
  const inKernel = Math.abs(Math.sin(th - KER_ANGLE)) < 0.03;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung von v" value={th} onChange={setTh} min={-Math.PI / 2} max={Math.PI / 2} />
      <TransformCanvas
        matrix={[
          [1, 2],
          [0.5, 1],
        ]}
        showGrid={false}
        size={260}
        worldHalf={3}
        vectors={[
          { v, color: "#dc2626", label: "v" },
          { v: Av, color: "#0284c7", label: "Av" },
        ]}
      />
      <p className="mt-1 text-xs">
        {inKernel
          ? "v zeigt entlang (2, −1): Av = 0, v liegt im Kern."
          : "Av ≠ 0, dieses v liegt also nicht im Kern. Richten wir v entlang (2, −1) aus, verschwindet Av."}
      </p>
    </div>
  );
}

registerConcept({
  id: "kernel",
  title: "Kern / Nullraum",
  body: (
    <>
      <p>
        Der <em>Kern</em> (engl. kernel, auch <em>Nullraum</em>, null space) einer{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M> ist die
        Menge aller <ConceptLink id="vector">Vektoren</ConceptLink>, die die{" "}
        <ConceptLink id="linear-map">Abbildung</ConceptLink>{" "}
        <M>{"\\bx \\mapsto \\bA\\bx"}</M> auf null zusammendrückt:
      </p>
      <MD>{"\\ker(\\bA) = \\{ \\bx : \\bA\\bx = \\mathbf{0} \\},"}</MD>
      <p>
        also die Lösungsmenge des homogenen{" "}
        <ConceptLink id="linear-system">linearen Gleichungssystems</ConceptLink>{" "}
        <M>{"\\bA\\bx = \\mathbf{0}"}</M>. Der Kern ist immer ein{" "}
        <ConceptLink id="subspace">Unterraum</ConceptLink>, und seine Größe
        steht im Tausch mit dem <ConceptLink id="image">Bild</ConceptLink>:
        nach dem{" "}
        <ConceptLink id="rank-nullity-theorem">Rangsatz</ConceptLink> gilt{" "}
        <M>{"\\dim\\ker(\\bA) = n - \\operatorname{rk}(\\bA)"}</M>. Eine
        invertierbare Matrix hat also nur den Kern <M>{"\\{\\mathbf{0}\\}"}</M>.
        Kerne sind auch der Motor hinter Eigenräumen:{" "}
        <M>{"\\bA\\bx = \\lambda\\bx"}</M> lässt sich umstellen zu{" "}
        <M>{"(\\bA - \\lambda\\bI)\\bx = \\mathbf{0}"}</M>, der Eigenraum ist
        also genau{" "}
        <M>{"E_\\lambda = \\ker(\\bA - \\lambda\\bI)"}</M>. Unten hat{" "}
        <M>{"\\bA = \\begin{pmatrix} 1 & 2 \\\\ 0.5 & 1 \\end{pmatrix}"}</M>{" "}
        Rang 1. Finden wir die Richtung, die <M>{"\\bA"}</M> auslöscht:
      </p>
      <KernelWidget />
    </>
  ),
});
