import { useState } from "react";
import { Aufgabe, MD, Verdikt, W_BUTTON, W_BUTTON_AKTIV } from "../../lib";

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
      <Aufgabe>Wählen wir eine der sechs möglichen Umordnungen.</Aufgabe>
      <div className="flex flex-wrap gap-1" role="group" aria-label="Permutation wählen">{PERMS.map((_, i) => <button type="button" key={i} aria-pressed={k === i} onClick={() => setK(i)} className={k === i ? W_BUTTON_AKTIV : W_BUTTON}>P{i + 1}</button>)}</div>
      <MD>{`\\bP = \\begin{pmatrix} ${rows} \\end{pmatrix}, \\qquad \\bP \\begin{pmatrix} 5 \\\\ 7 \\\\ 9 \\end{pmatrix} = \\begin{pmatrix} ${Px.join(" \\\\ ")} \\end{pmatrix}`}</MD>
      <Verdikt>Die Einträge bleiben 5, 7 und 9; P{k + 1} verändert ausschließlich ihre Reihenfolge.</Verdikt>
    </div>
  );
}
