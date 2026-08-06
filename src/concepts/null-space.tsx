import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

function NullSpaceWidget() {
  const [deg, setDeg] = useState(60);
  const th = (deg * Math.PI) / 180;
  const v: [number, number] = [1.5 * Math.cos(th), 1.5 * Math.sin(th)];
  // A = [[1,1],[1,1]], null space = span{(1,-1)}
  const Av: [number, number] = [v[0] + v[1], v[0] + v[1]];
  const nearNull = Math.abs(v[0] + v[1]) < 0.15;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Richtung von v (Grad)" value={deg} onChange={setDeg} min={0} max={360} step={1} />
      <div className="my-1 font-mono text-xs">
        A v = ({Av[0].toFixed(2)}, {Av[1].toFixed(2)})ᵀ{nearNull ? ": v liegt (fast) im Nullraum!" : ""}
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 1],
          [1, 1],
        ]}
        vectors={[
          { v: [2.1, -2.1], color: "#64748b", label: "Nullrichtung" },
          { v, color: "#dc2626", label: "v" },
          { v: Av, color: "#0284c7", label: "A v" },
        ]}
        size={240}
        worldHalf={3.2}
      />
      <p className="mt-1 text-xs opacity-80">
        Hier drückt <M>{"\\bA = \\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}"}</M>{" "}
        das ganze Gitter auf eine einzige Gerade zusammen. Drehen wir den
        roten Eingabevektor, bis er entlang der grauen Richtung zeigt (135°
        oder 315°): Sein Bild kollabiert in den Ursprung.
      </p>
    </div>
  );
}

registerConcept({
  id: "null-space",
  title: "Nullraum (Kern)",
  body: (
    <>
      <p>
        Der <em>Nullraum</em> (auch <em>Kern</em>, engl. <em>null space</em>{" "}
        oder <em>kernel</em>) einer{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink>{" "}
        <M>{"\\bA"}</M> ist die Menge aller Vektoren, die{" "}
        <M>{"\\bA"}</M> auf den Nullvektor schickt, in{" "}
        <ConceptLink id="set-builder-notation">Mengenschreibweise</ConceptLink>:
      </p>
      <MD>{"\\operatorname{null}(\\bA) = \\{\\, \\bz : \\bA\\bz = \\bzero \\,\\}."}</MD>
      <p>
        Er ist immer ein{" "}
        <ConceptLink id="subspace">Unterraum</ConceptLink>: Der Nullvektor
        liegt darin, und Summen und Vielfache von Lösungen von{" "}
        <M>{"\\bA\\bz = \\bzero"}</M> lösen die Gleichung ebenfalls. Ein
        Mini-Beispiel: Für{" "}
        <M>{"\\bA = \\begin{pmatrix}1 & 1\\\\ 1 & 1\\end{pmatrix}"}</M>{" "}
        erfüllt der Vektor <M>{"\\bz = (1,-1)^T"}</M> die Gleichung{" "}
        <M>{"\\bA\\bz = \\bzero"}</M>, und der Nullraum ist genau der{" "}
        <ConceptLink id="span">Spann</ConceptLink> dieses einen Vektors. Ganz
        allgemein addieren sich die{" "}
        <ConceptLink id="dimension">Dimensionen</ConceptLink> auf:{" "}
        <ConceptLink id="rank">Rang</ConceptLink>
        <M>{"(\\bA)"}</M> + dim null
        <M>{"(\\bA) = n"}</M>, die Anzahl der Spalten.
      </p>
      <p>
        Eine zentrale Tatsache (vgl. Heath §3.4.5): Das{" "}
        <ConceptLink id="orthogonal-complement">orthogonale Komplement</ConceptLink>{" "}
        von span<M>{"(\\bA)"}</M> ist der Nullraum von{" "}
        <M>{"\\bA^T"}</M>. Warum? Ein Vektor steht genau dann senkrecht auf
        allen Spalten von <M>{"\\bA"}</M>, wenn{" "}
        <M>{"\\bA^T"}</M> ihn auf Null abbildet.
      </p>
      <NullSpaceWidget />
    </>
  ),
});
