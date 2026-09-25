#!/usr/bin/env node
/**
 * REV29 — die drei Stepper aus src/chapters/05-lgs/widgets/
 * (RueckSubStepper, LUStepper, CholeskyStepper) und PivotDemo.
 *
 * Ersetzt den Header-Verweis auf das nie existierende
 * `verify-05-lgs/verify.mjs`. Geprüft werden die Standardbeispiele aller drei
 * Stepper, die Operationszählung des Rückwärtseinsetzens und der komplette
 * Fehlerverlauf der Pivot-Demo über den Regler.
 *
 * Unabhängiger Rechenweg: Die Lösungen werden hier NICHT durch Nachbau der
 * Widget-Schleifen bestimmt, sondern über die Cramersche Regel (Determinanten,
 * ganzzahlig) bzw. durch Einsetzen in A x = b; die Zerlegungen prüfen wir durch
 * Ausmultiplizieren gegen A. Alle Sollwerte stehen hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const lies = (p) => readFileSync(join(repo, p), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const det3 = (M) =>
  M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
  M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
  M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

/** Lösung eines 3×3-Systems über die Cramersche Regel. */
function cramer(A, b) {
  const d = det3(A);
  assert.ok(d !== 0, "die Testmatrix ist singulär");
  return [0, 1, 2].map((k) => det3(A.map((row, i) => row.map((v, j) => (j === k ? b[i] : v)))) / d);
}

/* --------------------------------- RueckSubStepper: U x = c, x = (2; 1; 2) */

const U = [[2, 1, -1], [0, 3, 2], [0, 0, 2]];
const c = [3, 7, 4];
const xSoll = cramer(U, c);
assert.deepEqual(xSoll.map((v) => Math.round(v * 1e12) / 1e12), [2, 1, 2], "x ≠ (2; 1; 2)");
// Probe durch Einsetzen.
for (let i = 0; i < 3; i++) {
  nah(U[i].reduce((s, v, j) => s + v * xSoll[j], 0), c[i], 1e-12, `Zeile ${i + 1} von U x = c`);
}
// „drei Divisionen" und „9 Operationen": eine Division je Zeile, dazu je
// Multiplikation und Subtraktion für jeden bereits bekannten Summanden.
let divisionen = 0, operationen = 0;
for (let i = 2; i >= 0; i--) {
  divisionen += 1;
  operationen += 1 + 2 * (2 - i);
}
assert.equal(divisionen, 3, "das 3×3-System braucht nicht drei Divisionen");
assert.equal(operationen, 9, "die Operationszählung ergibt nicht 9");
// … und n² ist die richtige Größenordnung: für n = 3 sind 9 = n².
assert.equal(operationen, 3 ** 2, "9 ist nicht n² für n = 3");

// Der Startzustand zeigt nicht mehr den Leerfall.
const rueck = lies("src/chapters/05-lgs/widgets/RueckSubStepper.tsx");
assert.ok(/useState\(1\); \/\/ wie viele Komponenten/.test(rueck), "der Stepper startet wieder bei t = 0");
assert.ok(/const winzigesPivot/.test(rueck), "der mittlere Pivot-Zustand fehlt");

/* ------------------------------------------------ LUStepper: A = L U, A x = b */

const A = [[2, 1, -1], [4, -6, 0], [-2, 7, 2]];
const b = [5, -2, 9];
const LSoll = [[1, 0, 0], [2, 1, 0], [-1, -1, 1]];
const USoll = [[2, 1, -1], [0, -8, 2], [0, 0, 3]];
// Ausmultiplizieren: L·U muss A exakt reproduzieren (ganzzahlig).
for (let i = 0; i < 3; i++)
  for (let j = 0; j < 3; j++) {
    let p = 0;
    for (let k = 0; k < 3; k++) p += LSoll[i][k] * USoll[k][j];
    assert.equal(p, A[i][j], `L·U weicht bei (${i + 1}, ${j + 1}) von A ab`);
  }
const ySoll = [5, -12, 2];
for (let i = 0; i < 3; i++) {
  assert.equal(LSoll[i].reduce((s, v, j) => s + v * ySoll[j], 0), b[i], `L y = b verletzt in Zeile ${i + 1}`);
}
const xLU = cramer(A, b);
nah(xLU[0], 2, 1e-12, "x₁ des LU-Beispiels");
nah(xLU[1], 5 / 3, 1e-12, "x₂ des LU-Beispiels");
nah(xLU[2], 2 / 3, 1e-12, "x₃ des LU-Beispiels");
assert.equal(det3(A), -48, "det A des LU-Beispiels");

/* ------------------------------- CholeskyStepper: A = L Lᵀ mit L = (2 0 0; 1 3 0; −1 1 2) */

const ACh = [[4, 2, -2], [2, 10, 2], [-2, 2, 6]];
const LCh = [[2, 0, 0], [1, 3, 0], [-1, 1, 2]];
for (let i = 0; i < 3; i++)
  for (let j = 0; j < 3; j++) {
    let p = 0;
    for (let k = 0; k < 3; k++) p += LCh[i][k] * LCh[j][k];
    assert.equal(p, ACh[i][j], `L Lᵀ weicht bei (${i + 1}, ${j + 1}) von A ab`);
  }
// Und A ist wirklich SPD: alle führenden Hauptminoren positiv (Sylvester).
assert.ok(ACh[0][0] > 0 && ACh[0][0] * ACh[1][1] - ACh[0][1] * ACh[1][0] > 0 && det3(ACh) > 0,
  "die Standardmatrix ist gar nicht SPD");
const chol = lies("src/chapters/05-lgs/widgets/CholeskyStepper.tsx");
assert.ok(/useState\(1\);/.test(chol), "der Cholesky-Stepper startet wieder bei t = 0");
assert.ok(/s === 0$|s === 0\s/m.test(chol), "der semidefinite Randfall s = 0 hat keinen eigenen Zweig");
assert.ok(!/className="hidden my-2 flex/.test(chol), "der tote Knopfblock ist zurück");
assert.ok(!/durch die sechs Einträge/.test(chol), "die Aufgabenzeile nennt die 6 wieder fest");

/* ------------------------------------------------ PivotDemo: echtes float64 */

/** Das 2×2-Testsystem, einmal ohne und einmal mit Zeilentausch. */
function pivot(e) {
  const eps = Math.pow(10, e);
  const m = 1 / eps, u22 = 1 - m, b1 = 1 + eps, b2 = 2;
  const x2n = (b2 - m * b1) / u22, x1n = (b1 - x2n) / eps;
  const x2p = (b1 - eps * b2) / (1 - eps), x1p = b2 - x2p;
  return {
    ohne: Math.abs(x1n - 1) + Math.abs(x2n - 1),
    mit: Math.abs(x1p - 1) + Math.abs(x2p - 1),
    x1n,
    verschluckt: u22 === -m,
  };
}
// Der Fehlerverlauf über den Regler (Reviewzahlen, hartkodiert).
for (const [e, soll] of [[-1, 8.9e-16], [-4, 1.1e-13], [-8, 6.1e-9], [-12, 1.3e-4], [-15, 1.1e-1], [-17, 1.0]]) {
  const r = pivot(e);
  assert.ok(Math.abs(r.ohne / soll - 1) < 0.1, `ε = 1e${e}: Fehler ohne Tausch ${r.ohne}, erwartet ${soll}`);
  assert.ok(r.mit < 1e-15, `ε = 1e${e}: der Zeilentausch ist nicht mehr harmlos (${r.mit})`);
}
// Der Startzustand des Widgets muss den Unterschied ZEIGEN.
nah(pivot(-15).x1n, 0.8881784197001251, 1e-15, "x₁ ohne Tausch bei ε = 1e−15");
assert.ok(pivot(-15).ohne > 0.1, "bei ε = 1e−15 ist der Fehler nicht sichtbar");
assert.ok(pivot(-8).ohne < 1e-8, "bei ε = 1e−8 wäre der alte Startzustand doch aussagekräftig");
// Die vollständige Auslöschung ist eine echte Gleitkomma-Aussage, keine Toleranz.
assert.ok(!pivot(-15).verschluckt && pivot(-16).verschluckt, "die Auslöschungsgrenze liegt nicht bei ε = 1e−16");
const piv = lies("src/chapters/05-lgs/widgets/PivotDemo.tsx");
assert.ok(/useState\(-15\)/.test(piv), "die Pivot-Demo startet wieder bei ε = 1e−8");
assert.ok(/u22 === -m/.test(piv), "der exakte Auslöschungstest ist verschwunden");

/* ----------------------------------------- keine toten Skriptpfade mehr */

for (const datei of [
  "src/chapters/05-lgs/widgets/RueckSubStepper.tsx",
  "src/chapters/05-lgs/widgets/LUStepper.tsx",
  "src/chapters/05-lgs/widgets/CholeskyStepper.tsx",
  "src/chapters/05-lgs/widgets/PivotDemo.tsx",
  "src/chapters/05-lgs/widgets/LUKosten.tsx",
  "src/chapters/05-lgs/widgets/SpdRichtung.tsx",
  "src/chapters/05-lgs/widgets/CholeskySampler.tsx",
  "src/chapters/05-lgs/widgets/S52Hilbert.tsx",
]) {
  assert.ok(!/verify-05-lgs\/verify\.mjs/.test(lies(datei)), `${datei} zitiert wieder den toten Pfad`);
}

console.log("REV29 05-lgs-Stepper: ok");
