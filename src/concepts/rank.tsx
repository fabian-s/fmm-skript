/** Konzept-Tooltip: Rang: Anzahl wirklich verschiedener Richtungen. */
import { useState } from "react";
import { ConceptLink, M, MatrixInput, registerConcept } from "../lib";

function RankWidget() {
  const [m, setM] = useState<number[][]>([
    [1, 2],
    [2, 4],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const allZero = m.flat().every((v) => v === 0);
  const rank = allZero ? 0 : Math.abs(det) < 1e-9 ? 1 : 2;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={m} onChange={setM} step={1} />
        </span>
        <div className="font-mono text-xs">
          <div>det = {det.toFixed(2)}</div>
          <div>Rang = {rank}</div>
        </div>
      </div>
      <p className="mt-1 text-xs opacity-80">
        {rank === 2
          ? "Die beiden Spalten zeigen in verschiedene Richtungen: voller Rang."
          : rank === 1
            ? "Eine Spalte ist ein Vielfaches der anderen: nur eine unabhängige Richtung."
            : "Die Nullmatrix hat überhaupt keine unabhängigen Spalten."}
      </p>
    </div>
  );
}

registerConcept({
  id: "rank",
  title: "Rang",
  body: (
    <>
      <p>
        Der <em>Rang</em> (rank) einer{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> zählt, wie viele ihrer
        Zeilen (gleichwertig: Spalten){" "}
        <ConceptLink id="linear-independence">linear unabhängig</ConceptLink>{" "}
        voneinander sind. Bemerkenswerterweise liefern Zeilen-Zählung und
        Spalten-Zählung immer dieselbe Zahl. Wir können den Rang lesen als
        „wie viele wirklich verschiedene Richtungen die Spalten beisteuern".
      </p>
      <p>
        Kleines Beispiel: In{" "}
        <M>{"\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}"}</M> ist die
        zweite Spalte das Doppelte der ersten, es gibt also nur eine
        unabhängige Richtung und der Rang ist <M>{"1"}</M>. Ändern wir die{" "}
        <M>{"4"}</M> in eine <M>{"5"}</M>, werden die Spalten unabhängig:
        Rang <M>{"2"}</M>.
      </p>
      <p>
        Eine <M>{"n \\times n"}</M>-Matrix mit dem größtmöglichen Rang{" "}
        <M>{"n"}</M> hat <em>vollen Rang</em>; das ist eine der gleichwertigen
        Arten zu sagen, dass die Matrix <em>regulär</em> (nichtsingulär) ist.
      </p>
      <RankWidget />
    </>
  ),
});
