#!/usr/bin/env node
/**
 * REV29 — src/chapters/05-lgs/widgets/S52Hilbert.tsx (HilbertInverseVergleich).
 *
 * Ersetzt den „Node-Scratchpad"-Nachweis des Headers durch ein committetes
 * Skript: κ∞(Hₙ) und die beiden relativen Fehler über den ganzen Reglerbereich
 * n = 2, …, 11, plus die Schwelle κ∞ · ε > 10⁻⁴ des Verdikts.
 *
 * Unabhängiger Rechenweg: κ∞ wird zusätzlich EXAKT bestimmt — die Inverse der
 * Hilbert-Matrix hat eine geschlossene Binomialformel, die hier in BigInt
 * ausgewertet wird. Die Gleitkommarechnung des Widgets muss diesen exakten Wert
 * auf besser als 1 % treffen; die Fehlerwerte selbst stehen hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/05-lgs/widgets/S52Hilbert.tsx"), "utf8");

const EPS = 2.220446049250313e-16;
const relNah = (a, b, tol, was) =>
  assert.ok(Math.abs(a / b - 1) <= tol, `${was}: ${a} weicht relativ um ${Math.abs(a / b - 1)} von ${b} ab`);

/* --------------------------- Gauß mit Spaltenpivotisierung (wie im Widget) */

function solve(A0, B0) {
  const A = A0.map((r) => r.slice());
  const B = B0.map((r) => r.slice());
  const n = A.length, m = B[0].length;
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
    [A[k], A[p]] = [A[p], A[k]];
    [B[k], B[p]] = [B[p], B[k]];
    for (let i = k + 1; i < n; i++) {
      const q = A[i][k] / A[k][k];
      A[i][k] = 0;
      for (let j = k + 1; j < n; j++) A[i][j] -= q * A[k][j];
      for (let j = 0; j < m; j++) B[i][j] -= q * B[k][j];
    }
  }
  const X = Array.from({ length: n }, () => Array(m).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let c = 0; c < m; c++) {
      let s = B[i][c];
      for (let j = i + 1; j < n; j++) s -= A[i][j] * X[j][c];
      X[i][c] = s / A[i][i];
    }
  return X;
}

const normInf = (M) => Math.max(...M.map((r) => r.reduce((s, v) => s + Math.abs(v), 0)));

function befund(n) {
  const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => 1 / (i + j + 1)));
  const b = A.map((r) => [r.reduce((s, v) => s + v, 0)]);
  const I = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
  const direkt = solve(A, b).map((r) => r[0]);
  const inv = solve(A, I);
  const ueberInverse = inv.map((r) => r.reduce((s, v, j) => s + v * b[j][0], 0));
  const fehler = (x) => Math.max(...x.map((v) => Math.abs(v - 1)));
  return { kappa: normInf(A) * normInf(inv), direkt: fehler(direkt), ueberInverse: fehler(ueberInverse) };
}

/* ------------------------ exakte Gegenprobe: (Hₙ⁻¹)_{ij} in geschlossener Form */

function binom(n, k) {
  if (k < 0 || k > n) return 0n;
  let r = 1n;
  for (let i = 0n; i < BigInt(k); i++) r = (r * (BigInt(n) - i)) / (i + 1n);
  return r;
}
/** ‖Hₙ⁻¹‖∞ exakt (ganzzahlige Einträge). */
function normInfInverseExakt(n) {
  let best = 0n;
  for (let i = 1; i <= n; i++) {
    let s = 0n;
    for (let j = 1; j <= n; j++) {
      const v = BigInt(i + j - 1) * binom(n + i - 1, n - j) * binom(n + j - 1, n - i) * binom(i + j - 2, i - 1) ** 2n;
      s += v; // Beträge: das Vorzeichen (−1)^{i+j} fällt beim Betrag weg
    }
    if (s > best) best = s;
  }
  return Number(best);
}
const harmonisch = (n) => Array.from({ length: n }, (_, j) => 1 / (j + 1)).reduce((a, b) => a + b, 0);

/* ---------------------------------------------------------------- Prüfungen */

// Die exakte Konditionszahl bestätigt die Gleitkommarechnung des Widgets.
for (const n of [2, 5, 8, 11]) {
  const exakt = harmonisch(n) * normInfInverseExakt(n);
  relNah(befund(n).kappa, exakt, 0.01, `κ∞(H${n}) gegen den exakten Wert`);
}
// Der exakte Wert selbst, hartkodiert (widerlegbar).
relNah(harmonisch(5) * normInfInverseExakt(5), 943656, 1e-9, "exaktes κ∞(H₅)");
relNah(harmonisch(11) * normInfInverseExakt(11), 1.2337023576e15, 1e-9, "exaktes κ∞(H₁₁)");

// Die Zahlen des Headers und des Fließtexts S52.mdx:66-72.
const n11 = befund(11);
relNah(n11.kappa, 1.230618630778665e15, 1e-6, "κ∞(H₁₁) des Widgets");
relNah(n11.direkt, 9.658807364938404e-3, 1e-6, "Fehler beim direkten Lösen, n = 11");
relNah(n11.ueberInverse, 3.7310791015625e-1, 1e-6, "Fehler über die Inverse, n = 11");
assert.ok(
  n11.ueberInverse > 30 * n11.direkt,
  `der Inversenweg ist nur um Faktor ${n11.ueberInverse / n11.direkt} schlechter`,
);

// Der ganze Reglerbereich: κ∞ wächst monoton, und beide Fehler bleiben endlich.
let vorher = 0;
for (let n = 2; n <= 11; n++) {
  const r = befund(n);
  assert.ok(r.kappa > vorher, `κ∞ wächst bei n = ${n} nicht`);
  vorher = r.kappa;
  assert.ok(Number.isFinite(r.direkt) && Number.isFinite(r.ueberInverse), `n = ${n}: Fehler nicht endlich`);
  assert.ok(r.ueberInverse >= r.direkt - 1e-18, `n = ${n}: der Inversenweg ist genauer als das direkte Lösen`);
}

// Das Verdikt schaltet bei κ∞ · ε > 10⁻⁴ um — und das ist genau ab n = 9 der Fall.
for (let n = 2; n <= 11; n++) {
  const warn = befund(n).kappa * EPS > 1e-4;
  assert.equal(warn, n >= 9, `die Schwelle κ∞ · ε > 1e−4 greift bei n = ${n} nicht wie beschrieben`);
}
assert.ok(/result\.kappa \* EPS > 1e-4/.test(src), "die begründete Schwelle steht nicht mehr im Widget");
assert.ok(!/n >= 9 \? "warn"/.test(src), "die unbegründete Schwelle n ≥ 9 ist zurück");
// E5: keine „2,70e1"-Schreibweise mehr.
assert.ok(!/toExponential\(2\)/.test(src), "sci() schreibt wieder in e-Notation");

console.log("REV29 05-lgs-S52Hilbert: ok");
