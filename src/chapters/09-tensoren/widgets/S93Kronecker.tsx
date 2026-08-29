import { useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixDisplay, Verdikt, W_BUTTON, W_BUTTON_AKTIV } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * Einsicht: B^T ⊗_K A ist keine Schreibvariante, sondern seine A-Blöcke sorgen
 * dafür, dass es auf die spaltenweise gestapelten Spalten von X wirkt. Die
 * Vertauschung der Faktoren ändert die Anordnung, nicht aber das Format.
 * Farbrollen: A blau, B^T grün, skalierte A-Blöcke orange, Umordnung rot.
 * Provenienz: Eigenbau nach Definition 9.3.12 und Satz 9.5.3.
 * Per node verifiziert: 2×2-Blockform, P(A⊗_KB)P^T=B⊗_KA und Beispielwerte in
 * scripts/verify/KAP09/kronecker-vektorisierung.mjs (2026-08-20); die drei
 * Presets als echte Fallunterscheidung (A = I, Bᵀ = I, beide voll besetzt) in
 * scripts/verify/REV29/09-tensoren-S93Kronecker.mjs (2026-08-29).
 */
type Mat = number[][];

const { blau, gruen, orange, rot } = FMM_COLORS;
/**
 * Die drei Presets sind eine Fallunterscheidung, keine drei Zahlenbeispiele:
 * mit A = I skaliert Bᵀ ganze Einheitsblöcke, mit B = I steht A zweimal auf der
 * Blockdiagonalen, und erst der dritte Fall mischt beides. Jeder Fall hat einen
 * eigenen Verdikt-Zweig.
 */
const PRESETS: { name: string; A: Mat; B: Mat }[] = [
  { name: "A = I", A: [[1, 0], [0, 1]], B: [[1, 1], [0, 2]] },
  { name: "B = I", A: [[1, 2], [0, 1]], B: [[1, 0], [0, 1]] },
  { name: "beide voll besetzt", A: [[1, 2], [0, 1]], B: [[1, 1], [0, 2]] },
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
  const name = vertauscht ? "A ⊗_K Bᵀ" : "Bᵀ ⊗_K A";

  return <div className="rounded p-3" style={{ backgroundColor: "var(--w-bg)" }}>
    <Aufgabe>
      Klicken wir die drei Faktorpaare durch und vertauschen wir die Reihenfolge: Wo landen
      die Einträge von Bᵀ, wo die Blöcke von A, und was genau ändert die Vertauschung?
    </Aufgabe>
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
        onClick={() => setPreset(index)} className={preset === index ? W_BUTTON_AKTIV : W_BUTTON}>{entry.name}</button>)}
      <button type="button" aria-pressed={vertauscht} onClick={() => setVertauscht((value) => !value)}
        className={vertauscht ? W_BUTTON_AKTIV : W_BUTTON}>
        {vertauscht ? "Bᵀ ⊗_K A zeigen" : "A ⊗_K Bᵀ zeigen"}
      </button>
    </div>
    <Verdikt kind={vertauscht ? "warn" : "ok"}>
      {vertauscht
        ? "A ⊗_K Bᵀ hat ebenfalls das Format 4 × 4, ordnet die vier Produkte aber anders an. Für quadratische Faktoren ist es zu Bᵀ ⊗_K A permutationsähnlich, nicht gleich."
        : preset === 0
          ? `Mit A = I ist jeder Block ein Vielfaches der Einheitsmatrix: Bᵀ ⊗_K I trägt die Einträge von Bᵀ als Skalare, jeder wirkt auf einen ganzen Zweierblock von vec(X). Das ist die Wirkung von B auf die Spalten, nichts weiter.`
          : preset === 1
            ? `Mit B = I ist Bᵀ = I, und A steht zweimal unverändert auf der Blockdiagonalen; alle übrigen Blöcke sind null. I ⊗_K A wendet also A getrennt auf jede Spalte von X an – die Spalten sprechen nicht miteinander.`
            : `Jeder grüne Eintrag von Bᵀ skaliert einen ganzen blauen A-Block. Erst wenn beide Faktoren voll besetzt sind, mischen sich Zeilen- und Spaltenwirkung, und Bᵀ ⊗_K A bildet die gestapelten Spalten von X genau zu vec(AXB) ab, wie ${ref("satz:vektorisierung-eines-matrixprodukts")} behauptet.`}
    </Verdikt>
  </div>;
}
