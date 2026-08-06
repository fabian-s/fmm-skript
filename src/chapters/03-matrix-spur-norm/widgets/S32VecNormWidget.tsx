import { useState } from "react";
import { M, MatrixInput, MD } from "../../../lib";

/**
 * Live-Rechner für die drei Vektorisierungsnormen einer 2x2-Matrix:
 * Frobenius- (blau), Summen- (orange) und Maximumsnorm (violett), jeweils
 * mit vollständig ausgeschriebener, farbcodierter Rechnung.
 */

/** Deutsche Dezimaldarstellung für MathJax-Strings: 1.25 -> "1{,}25". */
function de(v: number): string {
  const s = String(parseFloat(v.toFixed(4)));
  return s.replace(".", "{,}");
}

const PRESETS: { name: string; m: number[][] }[] = [
  { name: "Beispielmatrix", m: [[1, -2], [3, 4]] },
  { name: "A₁ (Identität)", m: [[1, 0], [0, 1]] },
  { name: "A₂ (Vertauschung)", m: [[0, 1], [1, 0]] },
  { name: "A₃ (√2-Streckung)", m: [[1.4142, 0], [0, 0]] },
];

export function S32VecNormWidget() {
  const [mat, setMat] = useState<number[][]>(PRESETS[0].m);

  // vec(A) stapelt die SPALTEN: (a11, a21, a12, a22)
  const v = [mat[0][0], mat[1][0], mat[0][1], mat[1][1]];
  const frob = Math.sqrt(v.reduce((acc, x) => acc + x * x, 0));
  const sum = v.reduce((acc, x) => acc + Math.abs(x), 0);
  const max = Math.max(...v.map((x) => Math.abs(x)));

  const sqTerms = v.map((x) => `(${de(x)})^2`).join(" + ");
  const absTerms = v.map((x) => `\\left|${de(x)}\\right|`).join(" + ");
  const absList = v.map((x) => `\\left|${de(x)}\\right|`).join(",\\, ");
  const vecList = v.map((x) => de(x)).join(",\\, ");

  return (
    <div className="text-sm">
      <p className="mb-2">
        Ändern wir die Einträge von <M>{"\\bA"}</M> und beobachten wir, wie die drei
        Vektorisierungsnormen mitwandern. Besonders aufschlussreich sind die drei
        voreingestellten Matrizen aus Beispiel 3.2.6: Alle drei haben dieselbe
        Frobenius-Norm <M>{"\\sqrt{2} \\approx 1{,}414"}</M>, obwohl sie als Abbildungen völlig
        verschieden wirken.
      </p>
      <div className="mb-2 flex flex-wrap gap-2">
        {PRESETS.map((pr) => (
          <button
            key={pr.name}
            onClick={() => setMat(pr.m.map((r) => [...r]))}
            className="rounded border border-slate-400 px-2 py-0.5 text-xs hover:bg-slate-200 dark:border-slate-500 dark:hover:bg-slate-700"
          >
            {pr.name}
          </button>
        ))}
      </div>
      <div className="my-2 flex flex-wrap items-center gap-3">
        <M>{"\\bA = "}</M>
        <MatrixInput value={mat} onChange={setMat} step={0.1} />
        <M>{`\\quimpl \\vec(\\bA) = (${vecList})^\\top`}</M>
      </div>
      <MD>{`\\cblue{\\left\\| \\bA \\right\\|_F} = \\left\\| \\vec(\\bA) \\right\\|_2 = \\sqrt{${sqTerms}} = \\cblue{${de(frob)}}`}</MD>
      <MD>{`\\corange{\\left\\| \\bA \\right\\|_S} = \\left\\| \\vec(\\bA) \\right\\|_1 = ${absTerms} = \\corange{${de(sum)}}`}</MD>
      <MD>{`\\cpurp{\\left\\| \\bA \\right\\|_M} = \\left\\| \\vec(\\bA) \\right\\|_\\infty = \\max\\left\\{ ${absList} \\right\\} = \\cpurp{${de(max)}}`}</MD>
      <p className="mt-2 text-slate-500">
        Die Reihenfolge der Einträge spielt für alle drei Normen keine Rolle: Vertauschen wir
        zwei Einträge, ändert sich nichts. Als lineare Abbildung ist die Matrix nach dem
        Vertauschen aber im Allgemeinen eine völlig andere. (Die Voreinstellung{" "}
        <M>{"\\bA_3"}</M> verwendet den gerundeten Wert <M>{"1{,}4142 \\approx \\sqrt{2}"}</M>,
        die Ergebnisse weichen daher minimal von den exakten Werten ab.)
      </p>
    </div>
  );
}
