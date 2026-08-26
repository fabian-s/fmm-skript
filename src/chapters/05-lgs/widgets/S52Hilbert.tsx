import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt } from "../../../lib";

/**
 * Einsicht: Bei Hilbert-Matrizen wächst die Kondition rasch; der Umweg über
 * die explizite Inverse kann den Lösungsfehler zusätzlich stark vergrößern.
 * Farbrollen: direktes Lösen grün, explizite Inverse rot, Kondition neutral.
 * Provenienz: neu für dieses Skript. Node-Scratchpad (2026-08-26), vollständiger
 * Reglerbereich n=2,...,11 mit derselben partiell pivotierten Gauß-Elimination
 * geprüft: n=11 ergibt κ∞=1.230618630778665e15, Fehler
 * 9.658807364938404e-3 bzw. 3.7310791015625e-1.
 */

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

function sci(value: number): string {
  return value.toExponential(2).replace(".", ",").replace("e+", "e").replace("e-", "e−");
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
  return <div>
    <Aufgabe>Verkleinern wir die Ordnung und beobachten, ab wann Rundungsfehler die beiden Rechenwege sichtbar trennen.</Aufgabe>
    <Slider label="Ordnung n" value={n} onChange={setN} min={2} max={11} step={1} marks={[2, 5, 8, 11]} />
    <div className="my-3 grid gap-2 sm:grid-cols-3">
      <Readout label="κ∞(Hₙ)" value={result.kappa} />
      <Readout label="relativer Fehler, direkt" value={result.direct} color={FMM_COLORS.gruen} />
      <Readout label="relativer Fehler, über Inverse" value={result.viaInverse} color={FMM_COLORS.rot} />
    </div>
    <Verdikt kind={n >= 9 ? "warn" : "neutral"}>
      {n >= 9
        ? `Die Matrix ist in dieser Arithmetik stark empfindlich. Der Inversenweg hat hier den ${ratio.toFixed(1).replace(".", ",")}-fachen relativen Fehler des direkten Lösens.`
        : "Beide Fehler sind noch klein. Der Inversenweg gewinnt aber keine Genauigkeit; einzelne Rundungseffekte lassen das Fehlerverhältnis nicht monoton wachsen."}
    </Verdikt>
  </div>;
}
