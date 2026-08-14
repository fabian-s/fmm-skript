import { useState } from "react";
import { M, MD } from "../../lib";

const PERMS: number[][] = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];
const X = [5, 7, 9];

export function PermWidget() {
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
        <M>{"(5,7,9)^T"}</M> auf eine andere Weise um; kein Eintrag wird je
        verändert, nur verschoben.
      </p>
    </div>
  );
}
