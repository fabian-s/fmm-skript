#!/usr/bin/env node
/**
 * REV29 — src/chapters/08-la-misc/widgets/S81QR.tsx (QrIterationsDemo).
 *
 * Unabhängiger Rechenweg: Das Widget zerlegt mit Gram-Schmidt. Hier wird
 * dieselbe Iteration mit einer HOUSEHOLDER-QR gefahren; beide müssen dieselbe
 * Nebendiagonalenfolge liefern. Die Eigenwerte kommen aus dem charakteristischen
 * Polynom. Alle Sollwerte sind hartkodiert.
 *
 * Kernbefund des Reviews: Mit KMAX = 20 war der Erfolgszweig |a₂₁| < 1e−9 für
 * die Voreinstellung unerreichbar; hier wird der erste Schritt bestimmt, an dem
 * er greift, und gegen den neuen KMAX geprüft.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/08-la-misc/widgets/S81QR.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const mm = (X, Y) => [
  [X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]],
  [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]],
];

/** QR einer 2×2-Matrix über eine Householder-Spiegelung (nicht Gram-Schmidt). */
function qrHouseholder(M) {
  const a = [M[0][0], M[1][0]];
  const n = Math.hypot(a[0], a[1]);
  if (n < 1e-300) return { Q: [[1, 0], [0, 1]], R: M.map((r) => r.slice()) };
  const alpha = a[0] >= 0 ? -n : n;
  const v = [a[0] - alpha, a[1]];
  const vv = v[0] * v[0] + v[1] * v[1];
  const H = vv < 1e-300
    ? [[1, 0], [0, 1]]
    : [
        [1 - (2 * v[0] * v[0]) / vv, -(2 * v[0] * v[1]) / vv],
        [-(2 * v[1] * v[0]) / vv, 1 - (2 * v[1] * v[1]) / vv],
      ];
  // H A = R', H ist symmetrisch und orthogonal, also A = H R'.
  let R = mm(H, M);
  // Vorzeichen so drehen, dass die Diagonale von R positiv ist: A = (H S)(S R').
  const S = [[R[0][0] < 0 ? -1 : 1, 0], [0, R[1][1] < 0 ? -1 : 1]];
  R = mm(S, R);
  const Q = mm(H, S);
  return { Q, R };
}

/** Ein QR-Schritt: A ← R Q. */
function iteriere(A0, K) {
  let A = A0.map((r) => r.slice());
  const off = [Math.abs(A[1][0])];
  const diag = [[A[0][0], A[1][1]]];
  for (let k = 1; k <= K; k++) {
    const { Q, R } = qrHouseholder(A);
    A = mm(R, Q);
    off.push(Math.abs(A[1][0]));
    diag.push([A[0][0], A[1][1]]);
  }
  return { off, diag, A };
}

const ew = (M) => {
  const tr = M[0][0] + M[1][1];
  const de = M[0][0] * M[1][1] - M[0][1] * M[1][0];
  const d = tr * tr - 4 * de;
  return d < 0 ? null : [(tr + Math.sqrt(d)) / 2, (tr - Math.sqrt(d)) / 2];
};

/* ----------------------------------------- symmetrisches Beispiel (Voreinstellung) */

const SYM = [[5, -2], [-2, 8]];
assert.deepEqual(ew(SYM), [9, 4], "Eigenwerte des symmetrischen Beispiels");
nah(4 / 9, 0.4444444, 1e-6, "Rate des symmetrischen Beispiels");

const symLauf = iteriere(SYM, 60);
nah(symLauf.diag[60][0], 9, 1e-10, "Diagonale läuft auf λ₁ = 9");
nah(symLauf.diag[60][1], 4, 1e-10, "Diagonale läuft auf λ₂ = 4");
// Der Abfall folgt der Rate: |a₂₁|⁽ᵏ⁺¹⁾/|a₂₁|⁽ᵏ⁾ → 4/9.
nah(symLauf.off[41] / symLauf.off[40], 4 / 9, 1e-6, "Schrumpffaktor trifft die Rate");

const ersterErfolg = symLauf.off.findIndex((v) => v < 1e-9);
assert.equal(ersterErfolg, 29, "der Erfolgszweig greift beim symmetrischen Beispiel ab k = 29");
assert.ok(symLauf.off[20] > 1e-9, "mit 20 Schritten war der Erfolgszweig unerreichbar");
nah(symLauf.off[20], 9.044e-7, 1e-9, "|a₂₁| nach 20 Schritten");

// Der KMAX im Widget muss über dem ersten Erfolgsschritt liegen.
const kmax = Number(src.match(/const KMAX = (\d+);/)[1]);
assert.ok(
  kmax >= ersterErfolg,
  `KMAX = ${kmax} reicht nicht bis zum Erfolgszweig bei k = ${ersterErfolg}`,
);
assert.ok(symLauf.off[kmax] < 1e-9, "bei KMAX muss die Nebendiagonale unter der Schwelle liegen");

/* --------------------------------------------------- unsymmetrisches Beispiel */

const UNSYM = [[2, 3], [1, 4]];
assert.deepEqual(ew(UNSYM), [5, 1], "Eigenwerte des unsymmetrischen Beispiels");
nah(1 / 5, 0.2, 1e-15, "Rate des unsymmetrischen Beispiels");
const unsymLauf = iteriere(UNSYM, kmax);
assert.ok(unsymLauf.off.findIndex((v) => v < 1e-9) <= kmax, "auch unsymmetrisch wird der Erfolgszweig erreicht");
nah(unsymLauf.diag[kmax][0], 5, 1e-10, "Diagonale oben: 5");
nah(unsymLauf.diag[kmax][1], 1, 1e-10, "Diagonale unten: 1");
assert.ok(Math.abs(unsymLauf.A[0][1]) > 0.5, "der Eintrag rechts oben bleibt stehen (nur dreieckig)");

/* ----------------------------------------------- Drehung: komplexe Eigenwerte */

const DREH = [[0, -1], [1, 0]];
assert.equal(ew(DREH), null, "die Drehung hat komplexe Eigenwerte");
const drehLauf = iteriere(DREH, 10);
for (const v of drehLauf.off) nah(v, 1, 1e-12, "bei der Drehung bleibt |a₂₁| = 1");

/* ------------------------------------------------- toter Code und Header (F7/F1) */

assert.ok(!/check-widgets\.mjs/.test(src), "der Header darf kein nicht existierendes Skript zitieren");
assert.ok(!/\{\/\*\s*<button/.test(src), "auskommentierter Knopf-Block muss entfernt sein");

console.log("REV29 08-la-misc S81QR: alle Zahlen bestätigt");
