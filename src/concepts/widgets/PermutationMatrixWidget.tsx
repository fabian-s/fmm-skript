/**
 * Konzept-Figur `permutation-matrix` (STATIC 2026-08-26).
 *
 * DIE EINE EINSICHT: Eine Permutationsmatrix rechnet nicht, sie räumt um. Zeile
 * i holt genau den Eintrag, in dessen Spalte ihre 1 steht; die Werte selbst
 * bleiben unangetastet. Und weil die transponierte Matrix dieselbe Zuordnung
 * rückwärts liest, ist P⁻¹ = Pᵀ.
 *
 * WARUM STATISCH: Die Vorfassung bot sechs Buttons für die sechs Permutationen
 * von drei Einträgen. Alle sechs zeigen dasselbe: eine Umordnung. Die Einsicht
 * steht schon im ersten Bild vollständig da (Rubrik §3), und der lehrreiche
 * Kontrast ist nicht „noch eine Permutation", sondern P gegen Pᵀ. Deshalb zwei
 * kuratierte Fälle nebeneinander statt sechs Wiederholungen.
 *
 * FARBROLLEN: blau = die Einsen, also die Zuordnung Zeile → geholter Eintrag;
 * die Nullen und die Klammern bleiben in den Theme-Farben.
 *
 * PROVENIENZ: Permutation P4 = (1, 2, 0) und der Testvektor (5 | 7 | 9) aus der
 * Vorfassung; Beschriftung, Pfeile und der Pᵀ-Fall sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20,
 * Abschnitt „PermutationMatrix"): P4 = (1, 2, 0) bildet (5, 7, 9) auf (7, 9, 5)
 * ab, und PᵀP = I gilt für alle sechs Permutationen; daraus folgt der zweite
 * Fall Pᵀ(7, 9, 5) = (5, 7, 9). Nachgerechnet (2026-08-26): Pᵀ hat die Zeilen
 * (0 0 1 | 1 0 0 | 0 1 0), also holt Zeile 1 den dritten, Zeile 2 den ersten
 * und Zeile 3 den zweiten Eintrag von (7, 9, 5).
 */
import { Aufgabe, FMM_COLORS, MD, Verdikt, W_MUTED, W_PANEL } from "../../lib";

/** Zeile i hat ihre 1 in Spalte P_ZEILEN[i] (0-basiert). */
const P_ZEILEN = [1, 2, 0];
/** Pᵀ: Zeile i hat ihre 1 in Spalte PT_ZEILEN[i]; das ist die Umkehrpermutation. */
const PT_ZEILEN = [2, 0, 1];
const X = [5, 7, 9];
const PX = P_ZEILEN.map((j) => X[j]); // (7 | 9 | 5)

const TIEF = "₁₂₃";
const B = 300;
const H = 122;
const ZELLE = 22;
const GX = 34;
const GY = 30;

interface PanelProps {
  titel: string;
  /** Zeile i holt Eintrag zeilen[i] des Eingangsvektors. */
  zeilen: number[];
  /** Name der Matrix in den Zeilenbeschriftungen, z. B. „Px". */
  bild: string;
  /** Buchstabe des Eingangsvektors, z. B. „x". */
  quelle: string;
  werte: number[];
  formel: string;
  ariaLabel: string;
}

function Panel({ titel, zeilen, bild, quelle, werte, formel, ariaLabel }: PanelProps) {
  const cy = (i: number) => GY + i * ZELLE + ZELLE / 2;
  const cx = (j: number) => GX + j * ZELLE + ZELLE / 2;
  const markerId = `perm-spitze-${quelle}`;

  return (
    <div className="min-w-0">
      <svg
        viewBox={`0 0 ${B} ${H}`}
        width={B}
        height={H}
        className="h-auto w-full max-w-full"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <marker id={markerId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0L6,3L0,6z" fill="var(--w-axis)" />
          </marker>
        </defs>
        <rect
          x={0.5}
          y={0.5}
          width={B - 1}
          height={H - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        <text x={10} y={16} fontSize={11} fill="var(--w-text)">
          {titel}
        </text>
        {/* Spaltenköpfe: welcher Eintrag steht in dieser Spalte? */}
        {[0, 1, 2].map((j) => (
          <text
            key={`kopf${j}`}
            x={cx(j)}
            y={GY - 4}
            textAnchor="middle"
            fontSize={10}
            fill="var(--w-muted)"
          >
            {quelle}
            {TIEF[j]}
          </text>
        ))}
        {/* Klammern */}
        <path
          d={`M${GX - 4},${GY} h-5 v${3 * ZELLE} h5`}
          fill="none"
          stroke="var(--w-axis)"
          strokeWidth={1.2}
        />
        <path
          d={`M${GX + 3 * ZELLE + 4},${GY} h5 v${3 * ZELLE} h-5`}
          fill="none"
          stroke="var(--w-axis)"
          strokeWidth={1.2}
        />
        {[0, 1, 2].map((i) =>
          [0, 1, 2].map((j) => {
            const eins = zeilen[i] === j;
            return (
              <g key={`z${i}s${j}`}>
                {eins && (
                  <rect
                    x={GX + j * ZELLE + 2}
                    y={GY + i * ZELLE + 2}
                    width={ZELLE - 4}
                    height={ZELLE - 4}
                    rx={3}
                    fill={FMM_COLORS.blau}
                    opacity={0.85}
                  />
                )}
                <text
                  x={cx(j)}
                  y={cy(i) + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fill={eins ? "#ffffff" : "var(--w-muted)"}
                >
                  {eins ? 1 : 0}
                </text>
              </g>
            );
          }),
        )}
        {/* Zeile i holt Eintrag zeilen[i] */}
        {[0, 1, 2].map((i) => (
          <g key={`pfeil${i}`}>
            <line
              x1={GX + 3 * ZELLE + 12}
              y1={cy(i)}
              x2={GX + 3 * ZELLE + 30}
              y2={cy(i)}
              stroke="var(--w-axis)"
              strokeWidth={1.2}
              markerEnd={`url(#${markerId})`}
            />
            <text x={GX + 3 * ZELLE + 36} y={cy(i) + 4} fontSize={11} fill="var(--w-text)">
              ({bild}){TIEF[i]} = {quelle}
              {TIEF[zeilen[i]]} = {werte[zeilen[i]]}
            </text>
          </g>
        ))}
        <text x={10} y={H - 8} fontSize={10} fill="var(--w-muted)">
          Jede Zeile holt den Eintrag aus der Spalte ihrer 1.
        </text>
      </svg>
      <MD>{formel}</MD>
    </div>
  );
}

export function PermFigur() {
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Vergleichen wir, welchen Eintrag jede Zeile holt: links bei P, rechts bei Pᵀ.
      </Aufgabe>
      <div className="grid min-w-0 gap-3">
        <Panel
          titel="P ordnet um"
          zeilen={P_ZEILEN}
          bild="Px"
          quelle="x"
          werte={X}
          formel={
            `\\bP \\begin{pmatrix} 5 \\\\ 7 \\\\ 9 \\end{pmatrix} = ` +
            `\\begin{pmatrix} 7 \\\\ 9 \\\\ 5 \\end{pmatrix}`
          }
          ariaLabel={
            "Die Matrix P hat ihre Einsen in Zeile 1 Spalte 2, Zeile 2 Spalte 3 und Zeile 3 " +
            "Spalte 1. Angewendet auf (5, 7, 9) liefert sie (7, 9, 5)."
          }
        />
        <Panel
          titel="Pᵀ macht es rückgängig"
          zeilen={PT_ZEILEN}
          bild="Pᵀy"
          quelle="y"
          werte={PX}
          formel={
            `\\bP^\\top \\begin{pmatrix} 7 \\\\ 9 \\\\ 5 \\end{pmatrix} = ` +
            `\\begin{pmatrix} 5 \\\\ 7 \\\\ 9 \\end{pmatrix}`
          }
          ariaLabel={
            "Die transponierte Matrix hat ihre Einsen in Zeile 1 Spalte 3, Zeile 2 Spalte 1 und " +
            "Zeile 3 Spalte 2. Angewendet auf y = (7, 9, 5) liefert sie wieder (5, 7, 9)."
          }
        />
      </div>
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> die Einsen von P bzw. Pᵀ; sie legen fest,
        welcher Eintrag an welche Position wandert. y = Px ist das Ergebnis der linken Rechnung.
      </p>
      <Verdikt kind="neutral">
        Beide Bildvektoren enthalten dieselben drei Zahlen, nur an anderen Plätzen: P ändert keinen
        einzigen Wert. Die Einsen von Pᵀ stehen gespiegelt zu denen von P, und deshalb holt Pᵀ genau
        die Einträge zurück an ihren alten Platz. Rechnerisch ist das PᵀP = I, also P⁻¹ = Pᵀ.
      </Verdikt>
    </div>
  );
}
