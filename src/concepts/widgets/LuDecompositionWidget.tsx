/**
 * Konzept-Widget `lu-decomposition`.
 *
 * DIE EINE EINSICHT: L und U fallen nicht vom Himmel – in L steht genau der
 * Multiplikator, mit dem die Elimination die Null erzeugt hat, und in U das,
 * was danach übrig bleibt. Ist der Pivot null, gibt es nichts zu teilen: Der
 * Eliminationsschritt scheitert, und weiter geht es nur mit einem Zeilentausch.
 *
 * FARBROLLEN: orange = L und der Multiplikator l₂₁, der zugleich der
 * eliminierende Faktor in der Rechnung ist; blau = U, das Ergebnis der
 * Elimination.
 *
 * PROVENIENZ: Rechenkern aus dem Vorgängerwidget (Stand 2026-08-18); die
 * private `MatDisplay`-Kopie ist durch die Lib-`MatrixDisplay` ersetzt.
 * Texte neu geschrieben. Korrektur 2026-08-26 (Audit, CRITICAL): Das Verdikt
 * schloss aus jedem Nullpivot „also gibt es kein A = LU“. Das ist falsch,
 * sobald auch a₂₁ = 0 ist: Dann ist A bereits obere Dreiecksmatrix, also
 * A = I·A eine gültige LU-Zerlegung, und es ist gar nichts zu eliminieren.
 * Das Verdikt beurteilt jetzt den konkreten Eliminationsschritt.
 *
 * DREI ZUSTÄNDE DES PIVOTS (statt „Toleranz = Gleichheit“):
 *   a₁₁ = 0 exakt (die Eingabe erlaubt nur getippte Zahlen, die 0 ist also
 *     wirklich 0): kein Multiplikator; entweder ist nichts zu tun (a₂₁ = 0)
 *     oder es braucht einen Zeilentausch (a₂₁ ≠ 0).
 *   a₁₁ ≠ 0, aber |l₂₁| = |a₂₁/a₁₁| ≥ 20: rechnerisch geht es weiter, doch der
 *     Multiplikator ist riesig – genau der Fall, für den es Teilpivotisierung
 *     gibt. Das Verdikt sagt das ausdrücklich und nennt A nicht singulär.
 *   sonst: gewöhnlicher Schritt.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20;
 * Erstprüfung 2026-08-19), Voreinstellung A = [[2, 1], [4, 5]]:
 *   l₂₁ = 4/2 = 2, L = [[1, 0], [2, 1]], U = [[2, 1], [0, 3]],
 *   LU = [[2, 1], [4, 5]] = A exakt, det A = 6 = u₁₁·u₂₂.
 * Das ist dieselbe Zerlegung, die auf der Konzeptseite steht.
 * Nachgerechnet 2026-08-26 für die Randfälle:
 *   A = [[0, 1], [4, 5]]: a₁₁ = 0, a₂₁ = 4 ≠ 0. Ein A = LU mit unipotentem L
 *     gäbe a₁₁ = u₁₁ = 0 und a₂₁ = l₂₁·u₁₁ = 0 – Widerspruch. Nach dem Tausch
 *     PA = [[4, 5], [0, 1]] ist die Zerlegung trivial (L = I).
 *   A = [[0, 1], [0, 5]]: a₁₁ = a₂₁ = 0. A ist schon obere Dreiecksmatrix,
 *     L = I und U = A leisten A = LU; det A = 0·5 = 0.
 *   A = [[0,01, 1], [4, 5]]: l₂₁ = 400, u₂₂ = 5 − 400 = −395. Rechnerisch
 *     gültig, aber der Multiplikator ist groß – Warnzustand, nicht Fehler.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MatrixDisplay,
  MatrixInput,
  Verdikt,
  W_PANEL,
  W_TEXT,
  fmtDe,
} from "../../lib";

/** Ab hier gilt der Multiplikator als groß genug für eine Warnung. */
const L21_GROSS = 20;

export function LuWidget() {
  const [m, setM] = useState<number[][]>([
    [2, 1],
    [4, 5],
  ]);
  const pivot = m[0][0];
  const pivotOk = pivot !== 0;
  const ersteSpalteLeer = pivot === 0 && m[1][0] === 0;
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
  // Ohne Pivot ist l₂₁ = 0, also L = I und U = A: genau die Zerlegung, die im
  // Fall a₂₁ = 0 gilt. Deshalb dürfen L und U auch dann angezeigt werden.
  const zeigeLU = pivotOk || ersteSpalteLeer;
  const grosserMultiplikator = pivotOk && Math.abs(l21) >= L21_GROSS;
  const singulaer = zeigeLU && U[0][0] * u22 === 0;

  const art = !zeigeLU ? "fail" : grosserMultiplikator || singulaer ? "warn" : "ok";

  return (
    <div className={`mt-2 p-2 text-sm ${W_PANEL}`}>
      <Aufgabe>
        Setzen wir den Eintrag links oben auf 0 – einmal mit einer Zahl darunter, einmal mit
        einer 0 darunter.
      </Aufgabe>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1 font-mono text-xs">
          A =
          <MatrixInput value={m} onChange={setM} step={1} />
        </span>
        {zeigeLU && (
          <>
            <span
              className="inline-flex items-center gap-1 font-mono text-xs"
              style={{ color: FMM_COLORS.orange }}
            >
              L =
              <MatrixDisplay value={L} />
            </span>
            <span
              className="inline-flex items-center gap-1 font-mono text-xs"
              style={{ color: FMM_COLORS.blau }}
            >
              U =
              <MatrixDisplay value={U} />
            </span>
          </>
        )}
      </div>
      <p className={`mt-1 text-xs ${W_TEXT}`}>
        L trägt links unten den Multiplikator l₂₁, U das Ergebnis der Elimination.
      </p>
      <Verdikt kind={art}>
        {!pivotOk ? (
          ersteSpalteLeer ? (
            <>
              Der Pivot links oben ist null, darunter aber auch: Es gibt nichts zu eliminieren,
              A ist schon obere Dreiecksmatrix, und L = I, U = A leisten A = LU – mit
              det A = u₁₁·u₂₂ = 0.
            </>
          ) : (
            <>
              Der Pivot links oben ist null, a₂₁ = {fmtDe(m[1][0], 2)} aber nicht: Der
              Multiplikator wäre eine Division durch null, also lässt sich{" "}
              <em>dieser Eliminationsschritt ohne Pivoting nicht ausführen</em>. Ein Zeilentausch
              bringt a₂₁ nach oben, und die Rechnung geht weiter – aus A = LU wird dabei PA = LU.
            </>
          )
        ) : (
          <>
            Die Elimination zieht das{" "}
            <span style={{ color: FMM_COLORS.orange }}>{fmtDe(l21, 2)}</span>-fache der ersten
            Zeile von der zweiten ab. Genau dieser Multiplikator steht links unten in L, das
            Ergebnis in U, und LU gibt A wieder her.{" "}
            {u22 === 0
              ? "Nur ist u₂₂ jetzt null: die Zerlegung existiert, aber A ist singulär (det A = u₁₁·u₂₂ = 0)."
              : `Nebenbei fällt die Determinante ab: det A = u₁₁·u₂₂ = ${fmtDe(U[0][0] * u22, 2)}.`}{" "}
            {grosserMultiplikator &&
              `Achtung: Der Multiplikator ${fmtDe(l21, 2)} ist groß und verstärkt jeden Rundungsfehler der ersten Zeile – genau dafür tauscht die Teilpivotisierung auch bei nicht verschwindendem Pivot.`}
          </>
        )}
      </Verdikt>
    </div>
  );
}
