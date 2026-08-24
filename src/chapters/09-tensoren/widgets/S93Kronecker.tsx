import { useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixDisplay, Verdikt } from "../../../lib";

/**
 * Einsicht: B^T ⊗ A ist keine Schreibvariante, sondern seine A-Blöcke sorgen
 * dafür, dass es auf die spaltenweise gestapelten Spalten von X wirkt. Die
 * Vertauschung der Faktoren ändert die Anordnung, nicht aber das Format.
 * Farbrollen: A blau, B^T grün, skalierte A-Blöcke orange, Umordnung rot.
 * Provenienz: Eigenbau nach Definition 9.3.12 und Satz 9.5.3.
 * Per node verifiziert: 2×2-Blockform, P(A⊗B)P^T=B⊗A und Beispielwerte in
 * scripts/verify/KAP09/kronecker-vektorisierung.mjs (2026-08-20).
 */
type Mat = number[][];

const { blau, gruen, orange, rot } = FMM_COLORS;
const PRESETS: { name: string; A: Mat; B: Mat }[] = [
  { name: "Vektorisierung", A: [[1, 2], [0, 1]], B: [[1, 1], [0, 2]] },
  { name: "Diagonale Faktoren", A: [[2, 0], [0, -1]], B: [[3, 0], [0, 4]] },
  { name: "Gemischte Vorzeichen", A: [[1, -1], [2, 0]], B: [[0, 1], [1, 1]] },
];

const transpose = (M: Mat): Mat => M[0].map((_, j) => M.map((row) => row[j]));
const kron = (A: Mat, B: Mat): Mat => A.flatMap((aRow) => B.map((bRow) => aRow.flatMap((a) => bRow.map((b) => a * b))));

function BlockMatrix({ factor, block }: { factor: Mat; block: Mat }) {
  const n = block.length;
  const cell = 30;
  return (
    <svg viewBox={`0 0 ${n * cell + 8} ${n * cell + 8}`} width={n * cell + 8} height={n * cell + 8}
      className="max-w-full h-auto" role="img" aria-label="Kroneckerprodukt als vier farbige Blöcke">
      {block.map((row, i) => row.map((entry, j) => {
        const x = 4 + j * cell;
        const y = 4 + i * cell;
        const blockRow = Math.floor(i / 2);
        const blockCol = Math.floor(j / 2);
        const alpha = Math.min(0.58, 0.12 + Math.abs(factor[blockRow][blockCol]) * 0.12);
        return <g key={`${i}-${j}`}>
          <rect x={x} y={y} width={cell} height={cell} fill={orange} fillOpacity={alpha} stroke="var(--w-border)" />
          <text x={x + cell / 2} y={y + 19} textAnchor="middle" fill="var(--w-text)" fontSize="10">{entry}</text>
        </g>;
      }))}
      <path d={`M${4 + 2 * cell} 4V${4 + n * cell}M4 ${4 + 2 * cell}H${4 + n * cell}`} stroke={rot} strokeWidth="1.5" />
    </svg>
  );
}

export function KroneckerRechner() {
  const [preset, setPreset] = useState(0);
  const [vertauscht, setVertauscht] = useState(false);
  const { A, B } = PRESETS[preset];
  const erster = vertauscht ? A : transpose(B);
  const zweiter = vertauscht ? transpose(B) : A;
  const K = kron(erster, zweiter);
  const name = vertauscht ? "A ⊗ Bᵀ" : "Bᵀ ⊗ A";

  return <div className="rounded p-3" style={{ backgroundColor: "var(--w-bg)" }}>
    <Aufgabe>Wählen wir Faktoren und vertauschen wir die Kronecker-Reihenfolge. Welche Blockmatrix wirkt auf vec(X)?</Aufgabe>
    <div className="my-3 flex flex-wrap items-start gap-4">
      <div><div className="text-sm" style={{ color: blau }}>A</div><MatrixDisplay value={A} /></div>
      <div><div className="text-sm" style={{ color: gruen }}>Bᵀ</div><MatrixDisplay value={transpose(B)} /></div>
      <div>
        <div className="text-sm" style={{ color: orange }}>{name}: vier Blöcke</div>
        <BlockMatrix factor={erster} block={K} />
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {PRESETS.map((entry, index) => <button key={entry.name} type="button" aria-pressed={preset === index}
        onClick={() => setPreset(index)} className="rounded border px-2 py-1 text-sm"
        style={{ borderColor: preset === index ? orange : "var(--w-border)" }}>{entry.name}</button>)}
      <button type="button" aria-pressed={vertauscht} onClick={() => setVertauscht((value) => !value)}
        className="rounded border px-2 py-1 text-sm" style={{ borderColor: vertauscht ? rot : "var(--w-border)" }}>
        {vertauscht ? "Bᵀ ⊗ A zeigen" : "A ⊗ Bᵀ zeigen"}
      </button>
    </div>
    <Verdikt kind={vertauscht ? "warn" : "ok"}>
      {vertauscht
        ? "A ⊗ Bᵀ hat ebenfalls das Format 4 × 4, ordnet die vier Produkte aber anders an. Für quadratische Faktoren ist es zu Bᵀ ⊗ A permutationsähnlich, nicht gleich."
        : "Jeder grüne Eintrag von Bᵀ skaliert einen ganzen blauen A-Block. Daher bildet Bᵀ ⊗ A die gestapelten Spalten von X genau zu vec(AXB) ab, wie Satz 9.5.3 behauptet."}
    </Verdikt>
  </div>;
}
