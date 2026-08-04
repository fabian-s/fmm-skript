import { useState } from "react";
import { ConceptLink, M, MD, MatrixInput, registerConcept } from "../lib";

function InverseWidget() {
  const [m, setM] = useState<number[][]>([
    [2, 1],
    [1, 1],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const singular = Math.abs(det) < 1e-9;
  const inv = singular
    ? null
    : [
        [m[1][1] / det, -m[0][1] / det],
        [-m[1][0] / det, m[0][0] / det],
      ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={m} onChange={setM} step={1} />
        </span>
        <span className="font-mono text-xs">det = {det.toFixed(2)}</span>
        {inv ? (
          <div
            className="inline-grid gap-1 rounded border-x-2 border-slate-500 px-1.5 py-1 font-mono text-xs"
            style={{ gridTemplateColumns: "repeat(2, minmax(0, 3.5rem))" }}
          >
            {inv.flat().map((v, i) => (
              <span key={i} className="text-center">
                {v.toFixed(2)}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs text-red-400">
            singulär — es gibt keine Inverse
          </span>
        )}
      </div>
      <p className="mt-1 text-xs opacity-80">
        Links: unsere Matrix. Rechts: ihre Inverse (falls sie existiert).
        Machen wir die zweite Zeile zu einem Vielfachen der ersten, dann
        verschwindet die Inverse.
      </p>
    </div>
  );
}

registerConcept({
  id: "matrix-inverse",
  title: "Inverse einer Matrix",
  body: (
    <>
      <p>
        Die <em>Inverse</em> einer quadratischen{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M> spielt
        dieselbe Rolle wie <M>{"1/a"}</M> für eine gewöhnliche Zahl: Sie ist
        die Matrix <M>{"\\bA^{-1}"}</M>, deren{" "}
        <ConceptLink id="matrix-multiplication">Produkt</ConceptLink> mit{" "}
        <M>{"\\bA"}</M> — in beliebiger Reihenfolge — die{" "}
        <ConceptLink id="identity-matrix">Einheitsmatrix</ConceptLink> ergibt:
      </p>
      <MD>{"\\bA \\bA^{-1} = \\bA^{-1} \\bA = \\bI."}</MD>
      <p>
        So wie wir <M>{"a x = b"}</M> durch Multiplikation mit <M>{"1/a"}</M>{" "}
        lösen, isoliert die Multiplikation eines Systems{" "}
        <M>{"\\bA\\bx = \\bb"}</M> mit <M>{"\\bA^{-1}"}</M> die Unbekannte:{" "}
        <M>{"\\bx = \\bA^{-1}\\bb"}</M>. Und so wie <M>{"a = 0"}</M> keinen
        Kehrwert hat, besitzt nicht jede Matrix eine Inverse — sie existiert
        genau dann, wenn die{" "}
        <ConceptLink id="determinant">Determinante</ConceptLink> ungleich Null
        ist, die Matrix also <em>regulär</em> (nicht singulär) ist.
      </p>
      <p>
        Konkrete Probe:{" "}
        <M>
          {"\\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}"}
        </M>
        , diese beiden Matrizen sind also zueinander invers.
      </p>
      <InverseWidget />
    </>
  ),
});
