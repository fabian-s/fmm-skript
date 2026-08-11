import { useState } from "react";
import { ConceptLink, M, MatrixInput } from "../../lib";

function fmt(x: number): string {
  return Math.abs(x - Math.round(x)) < 1e-10 ? String(Math.round(x)) : x.toFixed(2);
}

export function TraceWidget() {
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
        Ändern wir die Einträge: Die Eigenwerte springen umher (sie können
        sogar zu einem{" "}
        <ConceptLink id="complex-numbers">komplex</ConceptLink> konjugierten
        Paar werden), aber ihre Summe ist immer die Spur und ihr Produkt die
        Determinante.
      </p>
    </div>
  );
}
