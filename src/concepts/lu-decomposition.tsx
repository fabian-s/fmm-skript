import { useState } from "react";
import { ConceptLink, M, MD, MatrixInput, registerConcept } from "../lib";

function MatDisplay({ m }: { m: number[][] }) {
  return (
    <div
      className="inline-grid gap-1 rounded border-x-2 border-slate-500 px-1.5 py-1 font-mono text-xs"
      style={{ gridTemplateColumns: `repeat(${m[0].length}, minmax(0, 3rem))` }}
    >
      {m.flat().map((v, i) => (
        <span key={i} className="text-center">
          {Number.isInteger(v) ? v : v.toFixed(2)}
        </span>
      ))}
    </div>
  );
}

function LuWidget() {
  const [m, setM] = useState<number[][]>([
    [2, 1],
    [4, 5],
  ]);
  const a = m[0][0];
  const pivotOk = Math.abs(a) > 1e-9;
  const l21 = pivotOk ? m[1][0] / a : 0;
  const L = [
    [1, 0],
    [l21, 1],
  ];
  const U = [
    [m[0][0], m[0][1]],
    [0, m[1][1] - l21 * m[0][1]],
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={m} onChange={setM} step={1} />
        </span>
        {pivotOk ? (
          <>
            <span className="font-mono text-xs">=</span>
            <MatDisplay m={L} />
            <MatDisplay m={U} />
          </>
        ) : (
          <span className="text-xs text-red-400">
            Null-Pivot oben links — erst die Zeilen tauschen (partielle
            Pivotisierung)
          </span>
        )}
      </div>
      <p className="mt-1 text-xs opacity-80">
        Links: unsere Matrix A. Rechts: ihre Faktoren L (untere Dreiecksmatrix
        mit Einsen auf der Diagonale, enthält den Multiplikator{" "}
        {pivotOk ? l21.toFixed(2) : "—"}) und U (obere Dreiecksmatrix).
        Multiplizieren wir sie zurück, erhalten wir LU = A.
      </p>
    </div>
  );
}

registerConcept({
  id: "lu-decomposition",
  title: "LU-Zerlegung",
  body: (
    <>
      <p>
        Die <em>LU-Zerlegung</em> (engl. <em>LU factorization</em>, auch{" "}
        <em>LR-Zerlegung</em>) ist{" "}
        <ConceptLink id="gaussian-elimination">Gauß-Elimination</ConceptLink>{" "}
        mit Buchführung: Wir merken uns jeden Multiplikator genau an der
        Stelle, an der er eine Null erzeugt hat. Die Multiplikatoren bilden
        eine untere{" "}
        <ConceptLink id="triangular-matrix">Dreiecksmatrix</ConceptLink>{" "}
        <M>{"\\bL"}</M> mit Einsen auf der Diagonale, das eliminierte Ergebnis
        ist eine obere Dreiecksmatrix <M>{"\\bU"}</M>, und ihr{" "}
        <ConceptLink id="matrix-multiplication">Produkt</ConceptLink> stellt
        die Ausgangsmatrix wieder her:
      </p>
      <MD>
        {"\\bA = \\bL\\bU, \\qquad \\begin{bmatrix} 2 & 1 \\\\ 4 & 5 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix} \\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix}."}
      </MD>
      <p>
        Was bringt das? Ist die Matrix einmal zerlegt, wird{" "}
        <M>{"\\bA\\bx = \\bb"}</M> zu <M>{"\\bL(\\bU\\bx) = \\bb"}</M> — zwei
        billige{" "}
        <ConceptLink id="triangular-solve">Substitutions-Durchläufe</ConceptLink>{" "}
        (erst <M>{"\\bL\\by = \\bb"}</M> vorwärts lösen, dann{" "}
        <M>{"\\bU\\bx = \\by"}</M> rückwärts). Die teure Zerlegung zahlen wir
        einmal und verwenden sie für jede neue rechte Seite wieder. Mit
        Zeilentauschen für die Stabilität wird die Identität zu{" "}
        <M>{"\\bP\\bA = \\bL\\bU"}</M> mit einer{" "}
        <ConceptLink id="permutation-matrix">Permutationsmatrix</ConceptLink>{" "}
        <M>{"\\bP"}</M>.
      </p>
      <p>
        Zwei Verwandte sind wichtig: Für{" "}
        <ConceptLink id="symmetric-matrix">symmetrische</ConceptLink>,{" "}
        <ConceptLink id="positive-definite">positiv definite</ConceptLink>{" "}
        Matrizen spezialisiert sich die Zerlegung zur{" "}
        <ConceptLink id="cholesky-factorization">Cholesky-Zerlegung</ConceptLink>{" "}
        <M>{"\\bA = \\bL\\bL^T"}</M>. Und das erweiterte Gleichungssystem der
        Kleinste-Quadrate-Rechnung (vgl. Heath §3.4.2) ist symmetrisch, aber{" "}
        <em>indefinit</em> — dafür braucht es eine symmetrisch-indefinite
        Variante oder die gewöhnliche LU-Zerlegung, die ihre Pivots frei
        wählen darf; genau diese Freiheit nutzt jene Methode aus.
      </p>
      <LuWidget />
    </>
  ),
});
