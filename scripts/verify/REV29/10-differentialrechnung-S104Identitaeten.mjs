#!/usr/bin/env node
/**
 * REV29 — src/chapters/10-differentialrechnung/widgets/S104Identitaeten.tsx
 * (IdentitaetenSkalarMatrix).
 *
 * Prüft die drei Identitäten aus Satz 10.4.4 über den ganzen Reglerbereich
 * gegen zentrale Differenzenquotienten und belegt die Schwellen der neuen
 * Drei-Zustands-Logik (exakt singulär / schlecht konditioniert / regulär).
 *
 * Unabhängiger Rechenweg: Die numerische Spalte kennt keine der Formeln — sie
 * wertet F an x ± 1e−5 aus. Die Sollwerte für det F kommen zusätzlich aus der
 * geschlossenen Form (2x² bzw. 1).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const datei = "src/chapters/10-differentialrechnung/widgets/S104Identitaeten.tsx";
const src = readFileSync(join(repo, datei), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const EPS = 1e-5;
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const spur = (A) => A[0][0] + A[1][1];
const inv2 = (A) => {
  const d = det2(A);
  return [
    [A[1][1] / d, -A[0][1] / d],
    [-A[1][0] / d, A[0][0] / d],
  ];
};
const mul = (A, B) => A.map((z, i) => B[0].map((_, j) => z.reduce((s, v, k) => s + v * B[k][j], 0)));
const dSkalar = (f, x) => (f(x + EPS) - f(x - EPS)) / (2 * EPS);
const dMatrix = (F, x) => {
  const r = F(x + EPS);
  const l = F(x - EPS);
  return r.map((z, i) => z.map((v, j) => (v - l[i][j]) / (2 * EPS)));
};

const BEISPIELE = [
  {
    name: "diag(x, 2x)",
    F: (x) => [
      [x, 0],
      [0, 2 * x],
    ],
    Fp: () => [
      [1, 0],
      [0, 2],
    ],
    det: (x) => 2 * x * x,
    xMin: -2,
    xMax: 2,
    singulaerBei: [0],
  },
  {
    name: "(x 1; x² 3x)",
    F: (x) => [
      [x, 1],
      [x * x, 3 * x],
    ],
    Fp: (x) => [
      [1, 0],
      [2 * x, 3],
    ],
    det: (x) => 2 * x * x,
    xMin: -2,
    xMax: 2,
    singulaerBei: [0],
  },
  {
    name: "Drehmatrix",
    F: (x) => [
      [Math.cos(x), -Math.sin(x)],
      [Math.sin(x), Math.cos(x)],
    ],
    Fp: (x) => [
      [-Math.sin(x), -Math.cos(x)],
      [Math.cos(x), -Math.sin(x)],
    ],
    det: () => 1,
    xMin: -3,
    xMax: 3,
    singulaerBei: [],
  },
];

/* -------------------- die Beispiele stimmen mit dem Quelltext überein */

for (const b of BEISPIELE) {
  assert.ok(src.includes(`name: "${b.name}"`), `Beispiel ${b.name} fehlt im Widget`);
}
assert.equal(
  (src.match(/singulaerBei: \[0\]/g) ?? []).length,
  2,
  "genau zwei Beispiele haben eine Nullstelle der Determinante",
);
assert.ok(src.includes("singulaerBei: []"), "die Drehmatrix darf keine Nullstelle führen");
// Die Erkennung des exakten Falls läuft über den Reglerwert, nicht über det.
assert.ok(
  src.includes("bsp.singulaerBei.some((s) => x === s)"),
  "der exakte Fall muss über den kontrollierten Parameter erkannt werden",
);

/* ------------------ die drei Identitäten über den ganzen Reglerbereich */

const schranken = {};
for (const b of BEISPIELE) {
  let maxSpur = 0;
  let maxDet = 0;
  let maxInv = 0;
  for (let x = b.xMin; x <= b.xMax + 1e-12; x += 0.1) {
    const F = b.F(x);
    const Fp = b.Fp(x);
    const d = det2(F);
    // det F stimmt mit der geschlossenen Form überein.
    nah(d, b.det(x), 1e-12, `det F bei ${b.name}, x = ${x.toFixed(2)}`);
    // (1) Spur: d/dx tr F = tr F'.
    maxSpur = Math.max(maxSpur, Math.abs(dSkalar((t) => spur(b.F(t)), x) - spur(Fp)));
    // Die Ableitungsmatrix selbst muss den Differenzenquotienten treffen.
    const dn = dMatrix(b.F, x);
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) nah(dn[i][j], Fp[i][j], 1e-8, `F'(${x.toFixed(2)})[${i}][${j}] bei ${b.name}`);
    if (Math.abs(d) < 0.05) continue; // Auslöschungsbereich, siehe unten
    // (2) Jacobi-Formel: d/dx det F = det F · tr(F⁻¹ F').
    maxDet = Math.max(maxDet, Math.abs(dSkalar((t) => det2(b.F(t)), x) - d * spur(mul(inv2(F), Fp))));
    // (3) Ableitung der Inversen: −F⁻¹ F' F⁻¹.
    const invNum = dMatrix((t) => inv2(b.F(t)), x);
    const invFormel = mul(mul(inv2(F), Fp), inv2(F)).map((z) => z.map((v) => -v));
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) maxInv = Math.max(maxInv, Math.abs(invNum[i][j] - invFormel[i][j]));
  }
  schranken[b.name] = { maxSpur, maxDet, maxInv };
  assert.ok(maxSpur < 1e-9, `Spur-Identität bei ${b.name}: größte Abweichung ${maxSpur}`);
  assert.ok(maxDet < 1e-9, `Jacobi-Formel bei ${b.name}: größte Abweichung ${maxDet}`);
  assert.ok(maxInv < 1e-6, `Inversenformel bei ${b.name}: größte Abweichung ${maxInv}`);
}
// Die Drehmatrix ist der exakte Sonderfall: det F ≡ 1, also tr(F⁻¹F′) = 0.
for (let x = -3; x <= 3; x += 0.25) {
  const F = BEISPIELE[2].F(x);
  nah(det2(F), 1, 1e-12, `det der Drehmatrix bei x = ${x.toFixed(2)}`);
  nah(spur(mul(inv2(F), BEISPIELE[2].Fp(x))), 0, 1e-12, `tr(F⁻¹F′) der Drehmatrix bei x = ${x.toFixed(2)}`);
}

/* ------------------------------- Die drei Zustände sind sauber getrennt */

// Exakt singulär: nur bei x = 0, und der Reglerwert 0 liegt auf dem 0,01-Raster.
assert.equal(Math.round(0 * 100) / 100, 0, "die Null muss auf dem x-Raster liegen");
for (const b of BEISPIELE.slice(0, 2)) nah(det2(b.F(0)), 0, 0, `det F(0) bei ${b.name}`);
// Schlecht konditioniert: |det F| < 0,05 ⇔ |x| < 0,158 …
for (const x of [0.01, 0.05, 0.1, 0.15]) {
  assert.ok(Math.abs(det2(BEISPIELE[0].F(x))) < 0.05, `x = ${x} muss als schlecht konditioniert gelten`);
  assert.ok(det2(BEISPIELE[0].F(x)) !== 0, `x = ${x} darf nicht als exakt singulär gelten`);
}
// … und ab |x| = 0,2 ist der Punkt regulär.
for (const x of [0.2, 0.5, 1, 2]) {
  assert.ok(Math.abs(det2(BEISPIELE[0].F(x))) >= 0.05, `x = ${x} muss regulär sein`);
}
// Die Drehmatrix erreicht den entarteten Fall nie.
for (let x = -3; x <= 3; x += 0.01) {
  assert.ok(Math.abs(det2(BEISPIELE[2].F(x))) >= 0.05, "die Drehmatrix darf nie entarten");
}

// Nahe der Nullstelle bricht die numerische Probe tatsächlich ein — das ist die
// Aussage des neuen Verdikt-Zweigs, hier belegt statt behauptet.
{
  const b = BEISPIELE[0];
  const x = 0.01;
  const invNum = dMatrix((t) => inv2(b.F(t)), x);
  const invFormel = mul(mul(inv2(b.F(x)), b.Fp(x)), inv2(b.F(x))).map((z) => z.map((v) => -v));
  let schlimmster = 0;
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++) schlimmster = Math.max(schlimmster, Math.abs(invNum[i][j] - invFormel[i][j]));
  assert.ok(schlimmster > 1e-4, `bei x = 0,01 muss die numerische Probe sichtbar einbrechen (${schlimmster})`);
}

console.log(`REV29 ${datei}: drei Identitäten und die Drei-Zustands-Logik geprüft.`);
