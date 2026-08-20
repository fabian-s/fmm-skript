import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixDisplay, MatrixInput, Verdikt, fmtDe } from "../../../lib";

/**
 * Einsicht: vec(AXB)=(B^T⊗A)vec(X) macht aus einer Matrixgleichung ein
 * gewöhnliches lineares Gleichungssystem in vec(X), nicht bloß eine Notation.
 * Farbrollen: A blau, B grün, beide Ergebnisvektoren orange, LGS-Operator rot.
 * Provenienz: Eigenbau nach Satz 9.5.3, mit dem Beispiel 9.5.4 als Vorgabe.
 * Per node verifiziert: Gleichung für das Beispiel sowie 24 deterministische
 * mulberry32-Fälle in scripts/verify/KAP09/kronecker-vektorisierung.mjs (2026-08-20).
 */
type Mat = number[][];
const { blau, gruen, orange, rot } = FMM_COLORS;

const multiply = (A: Mat, B: Mat): Mat => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const transpose = (M: Mat): Mat => M[0].map((_, j) => M.map((row) => row[j]));
const kron = (A: Mat, B: Mat): Mat => A.flatMap((aRow) => B.map((bRow) => aRow.flatMap((a) => bRow.map((b) => a * b))));
const vec = (M: Mat) => M[0].flatMap((_, j) => M.map((row) => row[j]));
const column = (v: number[]): Mat => v.map((entry) => [entry]);

export function VektorisierungMatrixgleichung() {
  const [A, setA] = useState<Mat>([[1, 2], [0, 1]]);
  const [X, setX] = useState<Mat>([[1, 0], [2, 3]]);
  const [B, setB] = useState<Mat>([[1, 1], [0, 2]]);
  const [operatorVisible, setOperatorVisible] = useState(false);
  const AXB = useMemo(() => multiply(multiply(A, X), B), [A, X, B]);
  const operator = useMemo(() => kron(transpose(B), A), [A, B]);
  const left = vec(AXB);
  const right = vec(multiply(operator, column(vec(X))));
  const stimmt = left.every((entry, index) => Math.abs(entry - right[index]) < 1e-9);

  return <div className="rounded p-3" style={{ backgroundColor: "var(--w-bg)" }}>
    <Aufgabe>Ändern wir A, X oder B und prüfen wir die beiden orangefarbenen Vektoren Eintrag für Eintrag.</Aufgabe>
    <div className="my-2 text-xs"><span style={{ color: blau }}>A</span> wirkt links, <span style={{ color: gruen }}>B</span> rechts; <span style={{ color: orange }}>orange</span> markiert die zwei gleichen Ergebnisvektoren.</div>
    <div className="my-3 flex flex-wrap items-center gap-3">
      <div><div className="text-sm" style={{ color: orange }}>vec(AXB)</div><MatrixDisplay value={column(left)} /></div>
      <span aria-hidden="true" className="text-xl">=</span>
      <div><div className="text-sm" style={{ color: orange }}>(Bᵀ ⊗ A) vec(X)</div><MatrixDisplay value={column(right)} /></div>
      <svg viewBox="0 0 300 74" width="300" height="74" className="max-w-full h-auto" role="img"
        aria-label="Eine Matrixgleichung wird durch Vektorisierung in ein lineares Gleichungssystem überführt.">
        <rect x="8" y="18" width="112" height="38" rx="5" fill={orange} fillOpacity="0.18" stroke={orange} />
        <text x="64" y="42" textAnchor="middle" fill="var(--w-text)" fontSize="14">A X B = C</text>
        <path d="M128 37H174" stroke={rot} strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="182" y="18" width="110" height="38" rx="5" fill={rot} fillOpacity="0.12" stroke={rot} />
        <text x="237" y="42" textAnchor="middle" fill="var(--w-text)" fontSize="12">(Bᵀ⊗A) vec(X)</text>
        <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6z" fill={rot} /></marker></defs>
      </svg>
    </div>
    <div className="mt-3 flex flex-wrap items-start gap-4">
      <label><span className="block text-sm" style={{ color: blau }}>A</span><MatrixInput value={A} onChange={setA} step={1} min={-4} max={4} /></label>
      <label><span className="block text-sm">X (unbekannt)</span><MatrixInput value={X} onChange={setX} step={1} min={-4} max={4} /></label>
      <label><span className="block text-sm" style={{ color: gruen }}>B</span><MatrixInput value={B} onChange={setB} step={1} min={-4} max={4} /></label>
      <button type="button" className="rounded border px-2 py-1 text-sm" onClick={() => setOperatorVisible((visible) => !visible)}
        style={{ borderColor: rot }}>{operatorVisible ? "Operator verbergen" : "Operator Bᵀ ⊗ A zeigen"}</button>
      {operatorVisible && <div><div className="text-sm" style={{ color: rot }}>Bᵀ ⊗ A</div><MatrixDisplay value={operator} /></div>}
    </div>
    <Verdikt kind={stimmt ? "ok" : "fail"}>
      {stimmt
        ? `Die vier Einträge stimmen überein. Aus A X B = C wird damit das LGS (Bᵀ ⊗ A) vec(X) = vec(C) mit vier Unbekannten.`
        : `Die beiden Seiten weichen um ${fmtDe(Math.max(...left.map((entry, index) => Math.abs(entry - right[index]))), 4)} ab. Das wäre ein Gegenbeispiel zu Satz 9.5.3.`}
    </Verdikt>
  </div>;
}
