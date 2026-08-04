import { useState } from "react";
import { ConceptLink, M, MD, MatrixInput, registerConcept } from "../lib";

function fmt(x: number): string {
  return Math.abs(x - Math.round(x)) < 1e-10 ? String(Math.round(x)) : x.toFixed(2);
}

function TraceWidget() {
  const [m, setM] = useState<number[][]>([
    [3, 1],
    [1, 3],
  ]);
  const [[a, b], [c, d]] = m;
  const tr = a + d;
  const det = a * d - b * c;
  const disc = tr * tr - 4 * det;
  let eigs: string;
  let sum: string;
  let prod: string;
  if (disc >= 0) {
    const s = Math.sqrt(disc);
    const l1 = (tr + s) / 2;
    const l2 = (tr - s) / 2;
    eigs = `λ₁ = ${fmt(l1)}, λ₂ = ${fmt(l2)}`;
    sum = fmt(l1 + l2);
    prod = fmt(l1 * l2);
  } else {
    const re = tr / 2;
    const im = Math.sqrt(-disc) / 2;
    eigs = `λ₁,₂ = ${fmt(re)} ± ${fmt(im)}i (komplexes Paar)`;
    sum = fmt(2 * re);
    prod = fmt(re * re + im * im);
  }
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-xs">
          <M>{"\\bA ="}</M>
        </span>
        <MatrixInput value={m} onChange={setM} step={1} />
      </div>
      <div className="my-1 font-mono text-xs leading-5">
        tr(A) = {fmt(a)} + {fmt(d)} = {fmt(tr)} · det(A) = {fmt(det)}
        <br />
        {eigs}
        <br />
        λ₁ + λ₂ = {sum} = tr(A) · λ₁ · λ₂ = {prod} = det(A)
      </div>
      <p className="mt-1 text-xs opacity-80">
        Ändern wir die Einträge: Die Eigenwerte springen umher — sie können
        sogar zu einem{" "}
        <ConceptLink id="complex-numbers">komplex</ConceptLink> konjugierten
        Paar werden — aber ihre Summe ist immer die Spur und ihr Produkt die
        Determinante.
      </p>
    </div>
  );
}

registerConcept({
  id: "trace",
  title: "Spur",
  body: (
    <>
      <p>
        Die <em>Spur</em> (engl. <em>trace</em>) einer quadratischen{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> ist einfach die Summe
        ihrer Diagonaleinträge:
      </p>
      <MD>{"\\tr(\\bA) = \\sum_{i=1}^{n} a_{ii}."}</MD>
      <p>
        Für{" "}
        <M>{"\\bA = \\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}"}</M>{" "}
        ist sie <M>{"3 + 3 = 6"}</M> — die Einträge abseits der Diagonale
        ignorieren wir komplett. Obwohl sie so billig zu berechnen ist, steckt
        in der Spur etwas Tiefes: Sie ist gleich der Summe aller{" "}
        <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink>{" "}
        (mit Vielfachheit gezählt), so wie die{" "}
        <ConceptLink id="determinant">Determinante</ConceptLink> gleich ihrem
        Produkt ist. Hier sind die Eigenwerte <M>{"4"}</M> und <M>{"2"}</M>:
        tatsächlich <M>{"4 + 2 = 6"}</M> und <M>{"4 \\cdot 2 = 8"}</M>.
      </p>
      <p>
        Beide Tatsachen folgen aus dem charakteristischen Polynom, das für
        eine <M>{"2 \\times 2"}</M>-Matrix{" "}
        <M>{"\\lambda^2 - \\tr(\\bA)\\,\\lambda + \\det(\\bA)"}</M>{" "}
        lautet. Weil eine Ähnlichkeitstransformation die Eigenwerte erhält,
        erhält sie auch Spur und Determinante — das macht die beiden zu
        praktischen Invarianten, um Rechnungen zu prüfen: Hat eine angeblich
        ähnliche Matrix eine andere Spur, ist etwas schiefgelaufen.
      </p>
      <TraceWidget />
    </>
  ),
});
