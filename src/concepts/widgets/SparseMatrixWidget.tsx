/**
 * Konzept-Widget `sparse-matrix`.
 *
 * DIE EINE EINSICHT: Dünnbesetztheit ist keine Eigenschaft der Zahlen, sondern
 * des Musters. Bei fester Bandbreite wächst der Speicher linear in n, während
 * die dichte Ablage quadratisch wächst — dieselbe Matrix, zwei Größenordnungen.
 *
 * FARBROLLEN: blau = Nichtnull-Einträge, die wirklich gespeichert werden;
 * die Nullen bleiben in der Hintergrundfarbe der Tafel.
 *
 * PROVENIENZ: Spy-Plot aus der Vorfassung (Stand 2026-08-20); Kopfzeile,
 * Themenrahmen, Anordnung Regler-unter-Grafik und der Speichervergleich im
 * Verdikt sind neu.
 *
 * Es ist ein Besetzungsmuster, kein Koordinatenbild: die Achsen wären Zeilen-
 * und Spaltenindex, und die stehen bereits als Rasterposition da. Ticks mit
 * Zahlen hätten hier nichts zu beschriften, deshalb bleibt die Tafel achsenlos.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * für n = 12 hat eine Bandmatrix der Bandbreite b genau n(2b+1) − b(b+1)
 * Nichtnull-Einträge, also 12 / 34 / 54 / 72 / 88 / 102 für b = 0 … 5 gegenüber
 * 144 Zahlen bei dichter Ablage. b = 1 (Tridiagonal) speichert damit 34 statt
 * 144 Zahlen.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, W_MUTED, fmtInt } from "../../lib";

const N = 12;
const ZELLE = 14;
const B = N * ZELLE + 2;

export function SpyWidget() {
  const [band, setBand] = useState(1);

  const zellen: { i: number; j: number; nz: boolean }[] = [];
  let anzahl = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const nz = Math.abs(i - j) <= band;
      if (nz) anzahl++;
      zellen.push({ i, j, nz });
    }
  }
  const dicht = N * N;
  const anteil = Math.round((100 * anzahl) / dicht);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Verändern wir die Bandbreite und vergleichen die beiden Speicherzahlen.</Aufgabe>
      <svg
        viewBox={`0 0 ${B} ${B}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={`Besetzungsmuster einer 12 mal 12 Bandmatrix mit Bandbreite ${band}: ${anzahl} von ${dicht} Einträgen sind ungleich null.`}
      >
        <rect
          x={0.5}
          y={0.5}
          width={B - 1}
          height={B - 1}
          rx={3}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {zellen.map(({ i, j, nz }) =>
          nz ? (
            <rect
              key={`${i}-${j}`}
              x={1 + j * ZELLE}
              y={1 + i * ZELLE}
              width={ZELLE - 1}
              height={ZELLE - 1}
              fill={FMM_COLORS.blau}
            />
          ) : null,
        )}
      </svg>
      <Slider
        label="Bandbreite b"
        value={band}
        onChange={setBand}
        min={0}
        max={5}
        step={1}
        fmt={(v) => v.toFixed(0)}
        accent={FMM_COLORS.blau}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> gespeicherte Nichtnull-Einträge; die
        übrigen Felder sind Nullen, die niemand ablegt.
      </p>
      <Verdikt kind={anteil <= 30 ? "ok" : "neutral"}>
        {band === 0 ? (
          <>
            Bandbreite 0 lässt nur die Diagonale übrig: {fmtInt(anzahl)} statt {fmtInt(dicht)}{" "}
            Zahlen, also {anteil} % der dichten Ablage.
          </>
        ) : band === 1 ? (
          <>
            Bandbreite 1 ergibt eine Tridiagonalmatrix: {fmtInt(anzahl)} statt {fmtInt(dicht)}{" "}
            Zahlen ({anteil} %). Allgemein sind es n(2b+1) − b(b+1) Einträge; bei festgehaltenem b
            und wachsendem n ist das O(nb) statt O(n²).
          </>
        ) : (
          <>
            Bei Bandbreite {band} brauchen wir {fmtInt(anzahl)} statt {fmtInt(dicht)} Speicherplätze
            ({anteil} %). O(nb) gilt für festgehaltenes b; kommt b in die Größenordnung von n,
            zählt wieder die exakte Zahl n(2b+1) − b(b+1) ≈ n².
          </>
        )}
      </Verdikt>
    </div>
  );
}
