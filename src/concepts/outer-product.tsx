import { useState } from "react";
import { ConceptLink, M, MD, MatrixInput, registerConcept } from "../lib";

function OuterWidget() {
  const [u, setU] = useState<number[][]>([[1], [2], [3]]);
  const [v, setV] = useState<number[][]>([[4], [5]]);
  const rows = u
    .map((ur) => v.map((vr) => (ur[0] * vr[0]).toFixed(1).replace(/\.0$/, "")).join(" & "))
    .join(" \\\\ ");
  const allZero = u.every((r) => r[0] === 0) || v.every((r) => r[0] === 0);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex items-center gap-4">
        <div>
          <div className="mb-1 text-xs">u</div>
          <span className="text-slate-900 dark:text-slate-100">
            <MatrixInput value={u} onChange={setU} step={1} />
          </span>
        </div>
        <div>
          <div className="mb-1 text-xs">v</div>
          <span className="text-slate-900 dark:text-slate-100">
            <MatrixInput value={v} onChange={setV} step={1} />
          </span>
        </div>
      </div>
      <MD>{`\\bu\\bv^T = \\begin{pmatrix} ${rows} \\end{pmatrix}`}</MD>
      <p className="mt-1 text-xs opacity-80">
        {allZero
          ? "Mit einem Null-Faktor ist das äußere Produkt die Nullmatrix (Rang 0)."
          : "Jede Zeile ist ein Vielfaches von vᵀ und jede Spalte ein Vielfaches von u: Rang 1, egal welche Zahlen wir eintippen."}
      </p>
    </div>
  );
}

registerConcept({
  id: "outer-product",
  title: "Äußeres Produkt (outer product)",
  body: (
    <>
      <p>
        Das <em>äußere Produkt</em> (engl. <em>outer product</em>) zweier{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink>{" "}
        <M>{"\\bu \\in \\R^m"}</M> und{" "}
        <M>{"\\bv \\in \\R^n"}</M> ist das{" "}
        <ConceptLink id="matrix-multiplication">Matrixprodukt</ConceptLink>{" "}
        <M>{"\\bu\\bv^T"}</M>, Spalte mal Zeile. Das ergibt eine volle{" "}
        <M>{"m \\times n"}</M>-
        <ConceptLink id="matrix">Matrix</ConceptLink>, deren{" "}
        <M>{"(i,j)"}</M>-Eintrag <M>{"u_i v_j"}</M> ist. Vergleichen wir das
        mit dem{" "}
        <ConceptLink id="dot-product">Skalarprodukt</ConceptLink>{" "}
        <M>{"\\bu^T\\bv"}</M>: Dort steht Zeile mal Spalte, und alles
        kollabiert zu einer einzigen Zahl.
      </p>
      <p>Ein Mini-Beispiel:</p>
      <MD>{"\\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix} \\begin{pmatrix}4 & 5\\end{pmatrix} = \\begin{pmatrix}4 & 5\\\\ 8 & 10\\\\ 12 & 15\\end{pmatrix}."}</MD>
      <p>
        Jede Spalte von <M>{"\\bu\\bv^T"}</M> ist ein Vielfaches des einen
        Vektors <M>{"\\bu"}</M>; ein äußeres Produkt (ungleich Null) hat
        also immer <ConceptLink id="rank">Rang</ConceptLink> eins und ist
        damit die einfachste nichttriviale Matrix überhaupt. Genau deshalb
        schreibt die abgeschnittene Singulärwertzerlegung (truncated SVD){" "}
        <M>{"\\bA = \\sum_i \\sigma_i \\bu_i \\bv_i^T"}</M>: Sie zerlegt eine
        beliebige Matrix in eine Summe solcher Rang-1-Bausteine, geordnet
        nach Wichtigkeit.
      </p>
      <OuterWidget />
    </>
  ),
});
