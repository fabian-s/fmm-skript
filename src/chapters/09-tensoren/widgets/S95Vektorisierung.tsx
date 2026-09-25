import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixDisplay, MatrixInput, Verdikt, W_BUTTON, W_BUTTON_AKTIV, fmtDe } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * Einsicht: vec(AXB)=(B^T⊗_KA)vec(X) macht aus einer Matrixgleichung ein
 * gewöhnliches lineares Gleichungssystem in vec(X), nicht bloß eine Notation.
 * Farbrollen: A blau, B grün, beide Ergebnisvektoren orange, LGS-Operator rot.
 * Provenienz: Eigenbau nach Satz 9.5.3, mit dem Beispiel 9.5.4 als Vorgabe.
 * Per node verifiziert: Gleichung für das Beispiel sowie 24 deterministische
 * mulberry32-Fälle in scripts/verify/KAP09/kronecker-vektorisierung.mjs
 * (2026-08-20). Dass der zweite Knopf (A ⊗_K Bᵀ) wirklich einen anderen Vektor
 * liefert – der fail-Zweig also erreichbar ist – prüft
 * scripts/verify/REV29/09-tensoren-S95Vektorisierung.mjs (2026-08-29).
 */
type Mat = number[][];
const { blau, gruen, orange, rot } = FMM_COLORS;

const multiply = (A: Mat, B: Mat): Mat => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const transpose = (M: Mat): Mat => M[0].map((_, j) => M.map((row) => row[j]));
const kron = (A: Mat, B: Mat): Mat => A.flatMap((aRow) => B.map((bRow) => aRow.flatMap((a) => bRow.map((b) => a * b))));
const vec = (M: Mat) => M[0].flatMap((_, j) => M.map((row) => row[j]));
const column = (v: number[]): Mat => v.map((entry) => [entry]);

/** Die beiden Anordnungen, zwischen denen der Leser wählt. */
type Reihenfolge = "richtig" | "vertauscht";

const BEISPIEL: { name: string; A: Mat; X: Mat; B: Mat }[] = [
  { name: "Beispiel 9.5.4", A: [[1, 2], [0, 1]], X: [[1, 0], [2, 3]], B: [[1, 1], [0, 2]] },
  { name: "B = I", A: [[1, 2], [0, 1]], X: [[1, 0], [2, 3]], B: [[1, 0], [0, 1]] },
  { name: "A = I", A: [[1, 0], [0, 1]], X: [[1, 0], [2, 3]], B: [[1, 1], [0, 2]] },
];

export function VektorisierungMatrixgleichung() {
  const [A, setA] = useState<Mat>(BEISPIEL[0].A);
  const [X, setX] = useState<Mat>(BEISPIEL[0].X);
  const [B, setB] = useState<Mat>(BEISPIEL[0].B);
  const [reihenfolge, setReihenfolge] = useState<Reihenfolge>("richtig");
  const [operatorVisible, setOperatorVisible] = useState(false);
  const AXB = useMemo(() => multiply(multiply(A, X), B), [A, X, B]);
  // Der zweite Knopf baut BEWUSST den falschen Operator: nur so kann die
  // Prüfung „Eintrag für Eintrag" überhaupt scheitern (F6/F8).
  const operator = useMemo(
    () => (reihenfolge === "richtig" ? kron(transpose(B), A) : kron(A, transpose(B))),
    [A, B, reihenfolge],
  );
  const operatorName = reihenfolge === "richtig" ? "Bᵀ ⊗_K A" : "A ⊗_K Bᵀ";
  const left = vec(AXB);
  const right = vec(multiply(operator, column(vec(X))));
  const abweichung = Math.max(...left.map((entry, index) => Math.abs(entry - right[index])));
  const stimmt = abweichung < 1e-9;

  const setzeBeispiel = (index: number) => {
    setA(BEISPIEL[index].A);
    setX(BEISPIEL[index].X);
    setB(BEISPIEL[index].B);
  };

  return <div className="rounded p-3" style={{ backgroundColor: "var(--w-bg)" }}>
    <Aufgabe>
      Wählen wir die Reihenfolge der Kroneckerfaktoren und prüfen wir die beiden orangefarbenen
      Vektoren Eintrag für Eintrag: Nur eine der beiden Anordnungen liefert denselben Vektor.
    </Aufgabe>
    <div className="my-2 text-xs"><span style={{ color: blau }}>A</span> wirkt links, <span style={{ color: gruen }}>B</span> rechts; <span style={{ color: orange }}>orange</span> markiert die beiden zu vergleichenden Ergebnisvektoren.</div>
    <div className="my-3 flex flex-wrap items-center gap-3">
      <div><div className="text-sm">C = A X B</div><MatrixDisplay value={AXB} /></div>
      <div><div className="text-sm" style={{ color: orange }}>vec(C)</div><MatrixDisplay value={column(left)} /></div>
      <span aria-hidden="true" className="text-xl">{stimmt ? "=" : "≠"}</span>
      <div><div className="text-sm" style={{ color: orange }}>({operatorName}) vec(X)</div><MatrixDisplay value={column(right)} /></div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {BEISPIEL.map((eintrag, index) => (
        <button key={eintrag.name} type="button" className={W_BUTTON} onClick={() => setzeBeispiel(index)}>
          {eintrag.name}
        </button>
      ))}
      <button type="button" aria-pressed={reihenfolge === "richtig"} className={reihenfolge === "richtig" ? W_BUTTON_AKTIV : W_BUTTON} onClick={() => setReihenfolge("richtig")}>
        Bᵀ ⊗_K A
      </button>
      <button type="button" aria-pressed={reihenfolge === "vertauscht"} className={reihenfolge === "vertauscht" ? W_BUTTON_AKTIV : W_BUTTON} onClick={() => setReihenfolge("vertauscht")}>
        A ⊗_K Bᵀ
      </button>
    </div>
    <div className="mt-3 flex flex-wrap items-start gap-4">
      <label><span className="block text-sm" style={{ color: blau }}>A</span><MatrixInput value={A} onChange={setA} step={1} min={-4} max={4} /></label>
      <label><span className="block text-sm">X (unbekannt)</span><MatrixInput value={X} onChange={setX} step={1} min={-4} max={4} /></label>
      <label><span className="block text-sm" style={{ color: gruen }}>B</span><MatrixInput value={B} onChange={setB} step={1} min={-4} max={4} /></label>
      <button type="button" className={W_BUTTON} onClick={() => setOperatorVisible((visible) => !visible)}>
        {operatorVisible ? "Operator verbergen" : `Operator ${operatorName} zeigen`}
      </button>
      {operatorVisible && <div><div className="text-sm" style={{ color: rot }}>{operatorName}</div><MatrixDisplay value={operator} /></div>}
    </div>
    <Verdikt kind={reihenfolge === "richtig" ? "ok" : stimmt ? "neutral" : "fail"}>
      {reihenfolge === "richtig"
        ? `Die vier Einträge stimmen überein, und zwar für jede Wahl von A, X und B. Aus A X B = C wird damit das LGS (Bᵀ ⊗_K A) vec(X) = vec(C) mit vier Unbekannten.`
        : stimmt
          ? `Hier fallen beide Anordnungen zufällig zusammen – bei diesen speziellen Faktoren. Ein einzelner Treffer beweist nichts: Ändern wir A oder B, laufen die Vektoren auseinander.`
          : `Die beiden Seiten weichen um ${fmtDe(abweichung, 4)} ab. A ⊗_K Bᵀ ist also nicht der Operator aus ${ref("satz:vektorisierung-eines-matrixprodukts")}; auf die spaltenweise gestapelten Einträge wirkt nur Bᵀ ⊗_K A richtig.`}
    </Verdikt>
  </div>;
}
