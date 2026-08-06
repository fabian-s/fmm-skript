import { ConceptLink, M, MD, registerConcept } from "../lib";

/** Statisches Nullmuster-Diagramm: obere vs. untere Dreiecksmatrix, 5x5. */
function TriPattern({ lower, caption }: { lower: boolean; caption: string }) {
  const n = 5;
  const cells = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const nonzero = lower ? j <= i : j >= i;
      cells.push(
        <div
          key={`${i}-${j}`}
          className={`flex h-6 w-6 items-center justify-center rounded-sm font-mono text-[10px] ${
            nonzero ? "bg-sky-600/80 text-white" : "bg-slate-600/40 text-slate-400"
          }`}
        >
          {nonzero ? "\u2217" : "0"}
        </div>
      );
    }
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="inline-grid gap-0.5 rounded border-x-2 border-slate-500 p-1"
        style={{ gridTemplateColumns: `repeat(${n}, 1.5rem)` }}
      >
        {cells}
      </div>
      <span className="text-xs text-slate-300">{caption}</span>
    </div>
  );
}

registerConcept({
  id: "triangular-matrix",
  title: "Dreiecksmatrix",
  body: (
    <>
      <p>
        Eine quadratische <ConceptLink id="matrix">Matrix</ConceptLink> heißt{" "}
        <em>Dreiecksmatrix</em> (engl. <em>triangular matrix</em>), wenn alles
        auf einer Seite ihrer Hauptdiagonale null ist. Stehen die Nullen
        unterhalb der Diagonale, ist die Matrix eine <em>obere</em>{" "}
        Dreiecksmatrix; stehen sie oberhalb, eine <em>untere</em>:
      </p>
      <MD>
        {"\\bU = \\begin{bmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 5 \\\\ 0 & 0 & 6 \\end{bmatrix}, \\qquad \\bL = \\begin{bmatrix} 2 & 0 & 0 \\\\ 7 & 4 & 0 \\\\ 1 & 5 & 6 \\end{bmatrix}."}
      </MD>
      <p>
        Warum die numerische lineare Algebra von dieser Form besessen ist: Ein
        lineares Gleichungssystem mit Dreiecksmatrix ist fast schon gelöst. In{" "}
        <M>{"\\bU\\bx = \\bb"}</M> lautet die letzte Gleichung{" "}
        <M>{"6\\,x_3 = b_3"}</M> (eine Gleichung, eine Unbekannte), und jede
        Gleichung darüber bringt nur eine neue Unbekannte hinzu. Das ganze
        System entwirrt sich also durch{" "}
        <ConceptLink id="triangular-solve">Einsetzen</ConceptLink>, ganz ohne
        Tricks. Genau deshalb stecken Algorithmen wie das{" "}
        <ConceptLink id="gaussian-elimination">Gaußsche Eliminationsverfahren</ConceptLink>{" "}
        und die <ConceptLink id="lu-decomposition">LU-Zerlegung</ConceptLink>{" "}
        ihre ganze Arbeit darin, Dreiecksform zu <em>erreichen</em>, und
        deshalb konstruiert das QR-Verfahren (vgl. Heath §3.5) eine{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrix</ConceptLink>{" "}
        <M>{"\\bQ"}</M> gerade so, dass{" "}
        <M>{"\\bQ^T \\bA"}</M> obere Dreiecksform bekommt.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-6 rounded bg-slate-700/60 p-3">
        <TriPattern lower={false} caption="obere Dreiecksmatrix" />
        <TriPattern lower={true} caption="untere Dreiecksmatrix" />
      </div>
      <p className="mt-1 text-xs opacity-80">
        Nullmuster einer 5&times;5-Dreiecksmatrix: &lowast; markiert Einträge,
        die beliebig sein dürfen (auch null), die grauen Zellen müssen null
        sein.
      </p>
    </>
  ),
});
