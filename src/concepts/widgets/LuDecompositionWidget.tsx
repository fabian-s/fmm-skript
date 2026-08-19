/**
 * Konzept-Widget `lu-decomposition`.
 *
 * DIE EINE EINSICHT: L und U fallen nicht vom Himmel — in L steht genau der
 * Multiplikator, mit dem die Elimination die Null erzeugt hat, und in U das,
 * was danach übrig bleibt. Ist der Pivot null, gibt es nichts zu teilen, und
 * die Zerlegung existiert erst nach einem Zeilentausch.
 *
 * FARBROLLEN: orange = der Multiplikator l₂₁, der zugleich der eliminierende
 * Faktor in der Rechnung ist; rot = der Pivot, wenn er verschwindet.
 *
 * PROVENIENZ: Rechenkern aus dem Vorgängerwidget (Stand 2026-08-18); die
 * private `MatDisplay`-Kopie ist durch die Lib-`MatrixDisplay` ersetzt.
 * Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C1/check-gruppeE.mjs,
 * 2026-08-19), Voreinstellung A = [[2, 1], [4, 5]]:
 *   l₂₁ = 4/2 = 2, L = [[1, 0], [2, 1]], U = [[2, 1], [0, 3]],
 *   LU = [[2, 1], [4, 5]] = A exakt, det A = 6 = u₁₁·u₂₂.
 * Das ist dieselbe Zerlegung, die auf der Konzeptseite steht.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixDisplay, MatrixInput, Verdikt, fmtDe } from "../../lib";

export function LuWidget() {
  const [m, setM] = useState<number[][]>([
    [2, 1],
    [4, 5],
  ]);
  const pivot = m[0][0];
  const pivotOk = Math.abs(pivot) > 1e-9;
  const l21 = pivotOk ? m[1][0] / pivot : 0;
  const L = [
    [1, 0],
    [l21, 1],
  ];
  const U = [
    [m[0][0], m[0][1]],
    [0, m[1][1] - l21 * m[0][1]],
  ];
  const u22 = U[1][1];

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Setzen wir den Eintrag links oben auf 0 und schauen wir, was die Elimination dann tut.</Aufgabe>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <MatrixInput value={m} onChange={setM} step={1} />
        {pivotOk && (
          <>
            <span className="font-mono text-xs">=</span>
            <MatrixDisplay value={L} />
            <MatrixDisplay value={U} />
          </>
        )}
      </div>
      <Verdikt kind={pivotOk ? (Math.abs(u22) < 1e-9 ? "warn" : "ok") : "fail"}>
        {!pivotOk ? (
          <>
            Der Pivot links oben ist null. Der Multiplikator wäre eine Division durch null, also
            gibt es kein A = LU. Erst ein Zeilentausch macht die Zerlegung möglich, und aus der
            Identität wird PA = LU.
          </>
        ) : (
          <>
            Die Elimination zieht das{" "}
            <span style={{ color: FMM_COLORS.orange }}>{fmtDe(l21, 2)}</span>-fache der ersten
            Zeile von der zweiten ab. Genau dieser Multiplikator steht links unten in L, das
            Ergebnis in U, und LU gibt A wieder her.{" "}
            {Math.abs(u22) < 1e-9
              ? "Nur ist u₂₂ jetzt null: die Zerlegung existiert, aber A ist singulär (det A = u₁₁·u₂₂ = 0)."
              : `Nebenbei fällt die Determinante ab: det A = u₁₁·u₂₂ = ${fmtDe(U[0][0] * u22, 2)}.`}
          </>
        )}
      </Verdikt>
    </div>
  );
}
