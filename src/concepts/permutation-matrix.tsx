/** Konzept-Tooltip: Permutationsmatrix — Einheitsmatrix mit gemischten Zeilen. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept } from "../lib";

const PERMS: number[][] = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];
const X = [5, 7, 9];

function PermWidget() {
  const [k, setK] = useState(3);
  const p = PERMS[k]; // Zeile i von P ist der Einheits-Zeilenvektor mit der 1 in Spalte p[i]
  const rows = p
    .map((pi) => [0, 1, 2].map((j) => (j === pi ? "1" : "0")).join(" & "))
    .join(" \\\\ ");
  const Px = p.map((pi) => X[pi]);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <button
        className="rounded bg-slate-600 px-2 py-1 text-xs hover:bg-slate-500"
        onClick={() => setK((k + 1) % PERMS.length)}
      >
        nächste Permutation ({k + 1}/{PERMS.length})
      </button>
      <MD>{`\\bP = \\begin{pmatrix} ${rows} \\end{pmatrix}, \\qquad \\bP \\begin{pmatrix} 5 \\\\ 7 \\\\ 9 \\end{pmatrix} = \\begin{pmatrix} ${Px.join(" \\\\ ")} \\end{pmatrix}`}</MD>
      <p className="mt-1 text-xs opacity-80">
        Jede der sechs 3×3-Permutationsmatrizen ordnet die Einträge von{" "}
        <M>{"(5,7,9)^T"}</M> auf eine andere Weise um — kein Eintrag wird je
        verändert, nur verschoben.
      </p>
    </div>
  );
}

registerConcept({
  id: "permutation-matrix",
  title: "Permutationsmatrix",
  body: (
    <>
      <p>
        Eine <em>Permutationsmatrix</em> <M>{"\\bP"}</M> ist eine{" "}
        <ConceptLink id="identity-matrix">Einheitsmatrix</ConceptLink>, deren
        Zeilen (oder Spalten) durchgemischt wurden: Jede Zeile und jede Spalte
        enthält genau eine <M>{"1"}</M>, alle anderen Einträge sind{" "}
        <M>{"0"}</M>. Multiplikation mit ihr schiebt Daten umher, ohne einen
        einzigen Wert zu ändern — <M>{"\\bP\\bx"}</M> ordnet die Einträge eines
        Vektors um, und das{" "}
        <ConceptLink id="matrix-multiplication">Produkt</ConceptLink>{" "}
        <M>{"\\bA\\bP"}</M> ordnet die Spalten von <M>{"\\bA"}</M> um.
      </p>
      <p>
        Weil das Umsortieren von Einträgen keine Längen ändert, ist{" "}
        <M>{"\\bP"}</M> eine{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrix</ConceptLink>,
        und ihre <ConceptLink id="matrix-inverse">Inverse</ConceptLink> ist
        einfach ihre <ConceptLink id="transpose">Transponierte</ConceptLink>:
        Das Rückgängigmachen einer Mischung ist selbst wieder eine Mischung.
      </p>
      <p>
        Mit Permutationsmatrizen führen Algorithmen Buch über Zeilen- oder
        Spaltenvertauschungen: Die partielle Pivotsuche bei der{" "}
        <ConceptLink id="lu-decomposition">LU-Zerlegung</ConceptLink>{" "}
        protokolliert ihre Zeilentausche in einem <M>{"\\bP"}</M>, und die
        Spaltenpivotsuche der QR-Zerlegung hält ihre Spaltentausche im{" "}
        <M>{"\\bP"}</M> von <M>{"\\bQ^T \\bA \\bP"}</M> fest (vgl. Heath §3.5).
      </p>
      <PermWidget />
    </>
  ),
});
