import { useState } from "react";
import { ConceptLink, M, registerConcept, Slider } from "../lib";

const N = 12;

function SpyWidget() {
  const [band, setBand] = useState(1);
  const cell = 14;
  const cells: { i: number; j: number; nz: boolean }[] = [];
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const nz = Math.abs(i - j) <= band;
      if (nz) count++;
      cells.push({ i, j, nz });
    }
  }
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Bandbreite" value={band} onChange={setBand} min={0} max={5} step={1} />
      <div className="my-1 font-mono text-xs">
        Nichtnull-Einträge: {count} von {N * N} ({((100 * count) / (N * N)).toFixed(0)}%)
      </div>
      <svg
        width={N * cell + 2}
        height={N * cell + 2}
        className="rounded border border-slate-500 bg-white"
      >
        {cells.map(({ i, j, nz }) => (
          <rect
            key={`${i}-${j}`}
            x={1 + j * cell}
            y={1 + i * cell}
            width={cell - 1}
            height={cell - 1}
            fill={nz ? "#0284c7" : "#f1f5f9"}
          />
        ))}
      </svg>
      <p className="mt-1 text-xs opacity-80">
        Besetzungsmuster (spy plot) einer 12×12-Bandmatrix: blau =
        Nichtnull-Eintrag (Zeile i, Spalte j), grau = Null, die wir gar nicht
        erst speichern müssen. Bandbreite 1 ergibt eine{" "}
        <em>Tridiagonalmatrix</em> &mdash; nur {3 * N - 2} von {N * N}{" "}
        Einträgen können ungleich Null sein.
      </p>
    </div>
  );
}

registerConcept({
  id: "sparse-matrix",
  title: "Dünnbesetzte Matrix",
  body: (
    <>
      <p>
        Eine <ConceptLink id="matrix">Matrix</ConceptLink> heißt{" "}
        <em>dünnbesetzt</em> (sparse), wenn die allermeisten ihrer Einträge
        Null sind &mdash; so viele, dass es sich lohnt, nur die
        Nichtnull-Einträge zu speichern und mit ihnen zu rechnen. Eine
        tridiagonale <M>{"n \\times n"}</M>-Matrix etwa hat höchstens{" "}
        <M>{"3n - 2"}</M> Nichtnull-Einträge von <M>{"n^2"}</M> insgesamt: Für{" "}
        <M>{"n = 1000"}</M> sind das rund 3&thinsp;000 Zahlen statt einer
        Million.
      </p>
      <p>
        Die Nullen nützen uns aber nur, wenn ein Algorithmus sie auch Null{" "}
        <em>lässt</em>. Wenden wir eine Transformation unbedacht an, können
        aus Nullen Nichtnullen werden (sogenanntes <em>Fill-in</em>, bekannt
        aus der{" "}
        <ConceptLink id="lu-decomposition">LR-Zerlegung</ConceptLink>) &mdash;
        und die Ersparnis ist dahin. Deshalb bevorzugen wir für dünnbesetzte
        Kleinste-Quadrate-Probleme Givens-Rotationen, die gezielt einen
        einzelnen Eintrag auslöschen und das restliche Nullmuster in Ruhe
        lassen, gegenüber Householder-Spiegelungen, die ganze Spalten auf
        einmal verändern.
      </p>
      <SpyWidget />
    </>
  ),
});
