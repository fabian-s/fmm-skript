/**
 * Konzept-Widget `matrix-multiplication`.
 *
 * DIE EINE EINSICHT: Jeder einzelne Eintrag des Produkts hat eine eigene
 * Herkunft — eine Zeile links, eine Spalte rechts. Wer auf eine Ergebniszelle
 * zeigt, sieht genau die beiden Streifen aufleuchten, aus denen sie entstanden
 * ist (Muster „Details auf Abruf").
 *
 * FARBROLLEN: blau = die beteiligte Zeile von A; grün = die beteiligte Spalte
 * von B; orange = die Ergebniszelle und ihre Summe. Alles andere bleibt neutral.
 *
 * PROVENIENZ: Rechenkern aus dem Vorgängerwidget (Stand 2026-08-18); die
 * Hervorhebung und die SVG-Tafel sind neu, die private `fmt`-Kopie ist durch
 * `fmtDe` aus der Lib ersetzt. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C1/check-gruppeE.mjs,
 * 2026-08-19), Voreinstellung A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]:
 *   c₁₁ = 1·5 + 2·7 = 19, c₁₂ = 1·6 + 2·8 = 22,
 *   c₂₁ = 3·5 + 4·7 = 43, c₂₂ = 3·6 + 4·8 = 50,
 * also C = [[19, 22], [43, 50]] — dieselbe Rechnung wie auf der Konzeptseite.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixInput, Verdikt, fmtDe } from "../../lib";

const ZW = 34; // Zellbreite
const ZH = 22; // Zellhöhe
const LUECKE = 26; // Platz für × und =
const BREITE = 3 * 2 * ZW + 2 * LUECKE;
const HOEHE = 2 * ZH + 18;

const zahl = (v: number) => (Number.isInteger(v) ? String(v).replace("-", "−") : fmtDe(v, 1));

function Gitter({
  x0,
  werte,
  hervor,
  farbe,
}: {
  x0: number;
  werte: number[][];
  /** { zeile } hebt eine Zeile hervor, { spalte } eine Spalte. */
  hervor?: { zeile?: number; spalte?: number };
  farbe: string;
}) {
  return (
    <g>
      {hervor?.zeile !== undefined && (
        <rect x={x0} y={9 + hervor.zeile * ZH} width={2 * ZW} height={ZH} fill={farbe} fillOpacity={0.25} />
      )}
      {hervor?.spalte !== undefined && (
        <rect x={x0 + hervor.spalte * ZW} y={9} width={ZW} height={2 * ZH} fill={farbe} fillOpacity={0.25} />
      )}
      <line x1={x0 + 1} y1={9} x2={x0 + 1} y2={9 + 2 * ZH} stroke="var(--w-border, #cbd5e1)" strokeWidth={1.5} />
      <line x1={x0 + 2 * ZW - 1} y1={9} x2={x0 + 2 * ZW - 1} y2={9 + 2 * ZH} stroke="var(--w-border, #cbd5e1)" strokeWidth={1.5} />
      {werte.map((zeile, i) =>
        zeile.map((v, j) => (
          <text
            key={`${i}-${j}`}
            x={x0 + j * ZW + ZW / 2}
            y={9 + i * ZH + ZH / 2 + 4}
            textAnchor="middle"
            fontSize={11}
            fill="var(--w-text, #0f172a)"
            className="font-mono"
          >
            {zahl(v)}
          </text>
        )),
      )}
    </g>
  );
}

export function ProductWidget() {
  const [A, setA] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ]);
  const [B, setB] = useState<number[][]>([
    [5, 6],
    [7, 8],
  ]);
  const [zelle, setZelle] = useState<[number, number]>([0, 0]);
  const [i, j] = zelle;

  const C = [0, 1].map((r) => [0, 1].map((c) => A[r][0] * B[0][c] + A[r][1] * B[1][c]));

  const xA = 0;
  const xB = 2 * ZW + LUECKE;
  const xC = 2 * (2 * ZW + LUECKE);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-xs">
      <Aufgabe>Zeigen wir auf eine Zelle des Ergebnisses, um ihre Herkunft zu sehen.</Aufgabe>
      <svg
        viewBox={`0 0 ${BREITE} ${HOEHE}`}
        width={BREITE}
        height={HOEHE}
        className="mt-1 h-auto max-w-full"
        role="group"
        aria-label={`Matrixprodukt; hervorgehoben ist Zeile ${i + 1} von A, Spalte ${j + 1} von B und der Eintrag ${zahl(C[i][j])}.`}
      >
        <Gitter x0={xA} werte={A} hervor={{ zeile: i }} farbe={FMM_COLORS.blau} />
        <text x={xA + 2 * ZW + LUECKE / 2} y={9 + ZH + 4} textAnchor="middle" fontSize={12} fill="var(--w-muted, #64748b)">
          ×
        </text>
        <Gitter x0={xB} werte={B} hervor={{ spalte: j }} farbe={FMM_COLORS.gruen} />
        <text x={xB + 2 * ZW + LUECKE / 2} y={9 + ZH + 4} textAnchor="middle" fontSize={12} fill="var(--w-muted, #64748b)">
          =
        </text>
        <Gitter x0={xC} werte={C} farbe={FMM_COLORS.orange} />
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={xC + c * ZW}
              y={9 + r * ZH}
              width={ZW}
              height={ZH}
              fill={r === i && c === j ? FMM_COLORS.orange : "transparent"}
              fillOpacity={r === i && c === j ? 0.25 : 0}
              stroke={r === i && c === j ? FMM_COLORS.orange : "transparent"}
              strokeWidth={1}
              role="button"
              tabIndex={0}
              aria-pressed={r === i && c === j}
              aria-label={`Eintrag in Zeile ${r + 1}, Spalte ${c + 1}`}
              style={{ cursor: "pointer" }}
              onPointerEnter={() => setZelle([r, c])}
              onFocus={() => setZelle([r, c])}
              onClick={() => setZelle([r, c])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setZelle([r, c]);
              }}
            />
          )),
        )}
      </svg>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <MatrixInput value={A} onChange={setA} step={1} />
        <span style={{ color: "var(--w-muted, #64748b)" }}>×</span>
        <MatrixInput value={B} onChange={setB} step={1} />
      </div>
      <Verdikt kind="neutral">
        Zeile {i + 1} von A trifft Spalte {j + 1} von B:{" "}
        <span style={{ color: FMM_COLORS.blau }}>{zahl(A[i][0])}</span>·
        <span style={{ color: FMM_COLORS.gruen }}>{zahl(B[0][j])}</span> +{" "}
        <span style={{ color: FMM_COLORS.blau }}>{zahl(A[i][1])}</span>·
        <span style={{ color: FMM_COLORS.gruen }}>{zahl(B[1][j])}</span> ={" "}
        <span style={{ color: FMM_COLORS.orange }}>{zahl(C[i][j])}</span>. Jeder der vier
        Einträge entsteht so, und keiner davon benutzt eine andere Zeile oder Spalte – deshalb
        müssen die Formate zusammenpassen.
      </Verdikt>
    </div>
  );
}
