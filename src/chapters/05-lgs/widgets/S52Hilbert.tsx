import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt } from "../../../lib";

/**
 * Einsicht: Bei Hilbert-Matrizen wächst die Kondition rasch; der Umweg über
 * die explizite Inverse kann den Lösungsfehler zusätzlich stark vergrößern.
 * Farbrollen: direktes Lösen grün, explizite Inverse rot, Kondition neutral.
 * Provenienz: neu für dieses Skript.
 * Zahlen: vollständiger Reglerbereich n = 2, …, 11 in
 * scripts/verify/REV29/05-lgs-S52Hilbert.mjs, 2026-08-29 (unabhängige
 * Elimination ohne Pivotsuche plus exakte rationale Inverse als Gegenprobe);
 * n = 11 ergibt κ∞ = 1,2306 · 10¹⁵, Fehler 9,6588 · 10⁻³ bzw. 3,7311 · 10⁻¹.
 */

/** Maschinengenauigkeit doppelter Genauigkeit. */
const EPS = 2.220446049250313e-16;

type Matrix = number[][];

function solve(A0: Matrix, B0: Matrix): Matrix {
  const A = A0.map((row) => row.slice());
  const B = B0.map((row) => row.slice());
  const n = A.length;
  const m = B[0].length;
  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > Math.abs(A[pivot][k])) pivot = i;
    }
    [A[k], A[pivot]] = [A[pivot], A[k]];
    [B[k], B[pivot]] = [B[pivot], B[k]];
    for (let i = k + 1; i < n; i++) {
      const q = A[i][k] / A[k][k];
      A[i][k] = 0;
      for (let j = k + 1; j < n; j++) A[i][j] -= q * A[k][j];
      for (let j = 0; j < m; j++) B[i][j] -= q * B[k][j];
    }
  }
  const X = Array.from({ length: n }, () => Array(m).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let c = 0; c < m; c++) {
      let s = B[i][c];
      for (let j = i + 1; j < n; j++) s -= A[i][j] * X[j][c];
      X[i][c] = s / A[i][i];
    }
  }
  return X;
}

function hilbertEvidence(n: number) {
  const A = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => 1 / (i + j + 1))
  );
  const b = A.map((row) => [row.reduce((sum, value) => sum + value, 0)]);
  const I = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Number(i === j))
  );
  const direct = solve(A, b).map((row) => row[0]);
  const inverse = solve(A, I);
  const viaInverse = inverse.map((row) =>
    row.reduce((sum, value, j) => sum + value * b[j][0], 0)
  );
  const error = (x: number[]) => Math.max(...x.map((value) => Math.abs(value - 1)));
  const normInf = (M: Matrix) =>
    Math.max(...M.map((row) => row.reduce((sum, value) => sum + Math.abs(value), 0)));
  return {
    kappa: normInf(A) * normInf(inverse),
    direct: error(direct),
    viaInverse: error(viaInverse),
  };
}

/** Exponent als Unicode-Hochzahl: Widget-Text läuft nicht durch MathJax. */
function hoch(e: number): string {
  const z = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  return (e < 0 ? "⁻" : "") + String(Math.abs(e)).split("").map((d) => z[Number(d)]).join("");
}

/** Mantisse · 10^Exponent wie im übrigen Skript (E5), nicht „2,70e1". */
function sci(value: number): string {
  if (value === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(value)));
  const m = value / 10 ** e;
  return `${m.toFixed(2).replace(".", ",")} · 10${hoch(e)}`;
}

function Readout({ label, value, color }: { label: string; value: number; color?: string }) {
  return <div className="rounded border border-slate-200 p-3 dark:border-slate-700">
    <div className="text-xs" style={{ color: "var(--w-muted)" }}>{label}</div>
    <div className="font-mono text-lg tabular-nums" style={{ color }}>{sci(value)}</div>
  </div>;
}

export function HilbertInverseVergleich() {
  const [n, setN] = useState(11);
  const result = useMemo(() => hilbertEvidence(n), [n]);
  const ratio = result.viaInverse / result.direct;
  // Schwelle mit Grund statt „n ≥ 9": κ∞ · ε misst, wie viel von den 16 Stellen
  // doppelter Genauigkeit die Kondition schon aufgefressen hat.
  const empfindlich = result.kappa * EPS > 1e-4;
  return <div>
    <Aufgabe>Verkleinern wir die Ordnung und beobachten, ab wann Rundungsfehler die beiden Rechenwege sichtbar trennen.</Aufgabe>
    <Slider label="Ordnung n" value={n} onChange={setN} min={2} max={11} step={1} marks={[2, 5, 8, 11]} />
    <div className="my-3 grid gap-2 sm:grid-cols-3">
      <Readout label="κ∞(Hₙ)" value={result.kappa} />
      <Readout label="relativer Fehler, direkt" value={result.direct} color={FMM_COLORS.gruen} />
      <Readout label="relativer Fehler, über Inverse" value={result.viaInverse} color={FMM_COLORS.rot} />
    </div>
    <Verdikt kind={empfindlich ? "warn" : "neutral"}>
      {empfindlich
        ? `Ab hier überschreitet κ∞ · ε den Wert 10⁻⁴ (aktuell ${sci(result.kappa * EPS)}): Von den rund 16 Dezimalstellen doppelter Genauigkeit bleiben höchstens vier. Die Matrix ist in dieser Arithmetik stark empfindlich, und der Inversenweg hat hier den ${ratio.toFixed(1).replace(".", ",")}-fachen relativen Fehler des direkten Lösens.`
        : `κ∞ · ε liegt bei ${sci(result.kappa * EPS)}, also weit unter 10⁻⁴: Beide Fehler sind noch klein. Der Inversenweg gewinnt aber keine Genauigkeit; einzelne Rundungseffekte lassen das Fehlerverhältnis nicht monoton wachsen.`}
    </Verdikt>
  </div>;
}
