import { useState } from "react";
import { ConceptLink, M, MD, MatrixInput, registerConcept } from "../lib";
import { LabeledTransformCanvas, sigmaMax } from "../lib";

function DetWidget() {
  const [m, setM] = useState<number[][]>([
    [3, 1],
    [2, 2],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const mat: [[number, number], [number, number]] = [
    [m[0][0], m[0][1]],
    [m[1][0], m[1][1]],
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex items-center gap-3">
        {/* tooltip panel text is near-white; inputs keep a white bg, so restore dark text */}
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={m} onChange={setM} step={0.5} />
        </span>
        <div className="font-mono text-xs">
          <div>det = {det.toFixed(2)}</div>
          <div>Flächenfaktor = {Math.abs(det).toFixed(2)}</div>
        </div>
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={mat}
        size={260}
        worldHalf={Math.max(3.2, 1.2 * sigmaMax(mat))}
      />
      <p className="mt-1 text-xs opacity-80">
        {Math.abs(det) < 1e-9
          ? "det = 0: das Gitter kollabiert auf eine Gerade, die Matrix ist singulär."
          : "Die Fläche jeder Gitterzelle wird um den Faktor |det| skaliert; ein negatives det kehrt zusätzlich die Orientierung um."}
      </p>
    </div>
  );
}

registerConcept({
  id: "determinant",
  title: "Determinante",
  body: (
    <>
      <p>
        Die <em>Determinante</em> <M>{"\\det(\\bA)"}</M> ist eine einzelne
        Zahl, berechnet aus den Einträgen einer quadratischen{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink>, die zusammenfasst, ob
        die Matrix den Raum „plattdrückt“. Für eine <M>{"2 \\times 2"}</M>
        -Matrix ist sie ein einfaches Kreuzmuster von Produkten:
      </p>
      <MD>
        {"\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc, \\qquad \\det \\begin{pmatrix} 3 & 1 \\\\ 2 & 2 \\end{pmatrix} = 3 \\cdot 2 - 1 \\cdot 2 = 4."}
      </MD>
      <p>
        Geometrisch: Fassen wir die Matrix als{" "}
        <ConceptLink id="linear-transformation">lineare Abbildung</ConceptLink>{" "}
        der Ebene auf, dann ist <M>{"|\\det(\\bA)|"}</M> der Faktor, um den
        sie Flächen skaliert (Volumina in 3D). Determinante null heißt: Die
        Abbildung quetscht die Ebene auf eine Gerade; keine Fläche
        überlebt, und die Matrix ist <em>singulär</em>. Deshalb ist der Test{" "}
        <M>{"\\det(\\bA) \\neq 0"}</M> gleichwertig dazu, dass die Matrix
        eine <ConceptLink id="matrix-inverse">Inverse</ConceptLink> besitzt.
      </p>
      <p className="text-xs opacity-80">
        Ändern wir die Matrix und beobachten wir das Bild des
        Einheitsquadrats: Machen wir etwa eine Spalte zum Vielfachen der
        anderen.
      </p>
      <DetWidget />
    </>
  ),
});
