#!/usr/bin/env node
/**
 * REV29 — src/chapters/10-differentialrechnung/widgets/S108Newton.tsx
 * (NewtonSchaetzung, NewtonStepper).
 *
 * Ersetzt die in den Headern zitierten, im Repo nicht vorhandenen Skripte
 * rev-s114-c.mjs und check-s114.mjs.
 *
 * Unabhängiger Rechenweg: Gradient und Hesse-Matrix werden hier aus zentralen
 * Differenzen von f gewonnen (nicht aus den Formeln des Widgets), und das
 * 2x2-System H d = −∇f wird mit der Cramerschen Regel gelöst. Die Grenzwerte
 * (x* = 1 bzw. der Sattel −1) und der Quotient e_k/e_{k−1}² → 1/(2x*) kommen
 * aus der Theorie, nicht aus dem Lauf.
 */
import assert from "node:assert/strict";

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const f1 = (a, b) => a ** 3 / 3 - a + b * b / 2;
const f2 = (a, b) => 2 * a * a + 2 * a * b + 3 * b * b - 4 * a - 6 * b;

function gradNum(f, a, b, h = 1e-5) {
  return [(f(a + h, b) - f(a - h, b)) / (2 * h), (f(a, b + h) - f(a, b - h)) / (2 * h)];
}
function hessNum(f, a, b, h = 1e-4) {
  const gemischt =
    (f(a + h, b + h) - f(a + h, b - h) - f(a - h, b + h) + f(a - h, b - h)) / (4 * h * h);
  return [
    [(f(a + h, b) - 2 * f(a, b) + f(a - h, b)) / (h * h), gemischt],
    [gemischt, (f(a, b + h) - 2 * f(a, b) + f(a, b - h)) / (h * h)],
  ];
}

/** Ein Newton-Schritt; null, wenn die Hesse-Matrix singulär ist. */
function newtonSchritt(f, p, exakt) {
  const g = exakt ? exakt.grad(p[0], p[1]) : gradNum(f, p[0], p[1]);
  const H = exakt ? exakt.hess(p[0], p[1]) : hessNum(f, p[0], p[1]);
  const det = H[0][0] * H[1][1] - H[0][1] * H[1][0];
  if (Math.abs(det) < 1e-12) return null;
  // Cramer: d = −H⁻¹ g
  const d1 = (-g[0] * H[1][1] + g[1] * H[0][1]) / det;
  const d2 = (-g[1] * H[0][0] + g[0] * H[1][0]) / det;
  return [p[0] + d1, p[1] + d2];
}

/* ---------------------------- Der Lauf ab (2; 1,5), exakte Ableitungen */

const exakt1 = {
  grad: (a, b) => [a * a - 1, b],
  hess: (a, b) => [
    [2 * a, 0],
    [0, 1],
  ],
};
// Gegenprobe der exakten Ableitungen gegen die numerischen.
for (const [a, b] of [
  [2, 1.5],
  [1.25, 0],
  [-1.5, 0.4],
]) {
  const gn = gradNum(f1, a, b);
  nah(gn[0], exakt1.grad(a, b)[0], 1e-6, `∂f/∂x₁ in (${a}; ${b})`);
  nah(gn[1], exakt1.grad(a, b)[1], 1e-6, `∂f/∂x₂ in (${a}; ${b})`);
  const hn = hessNum(f1, a, b);
  nah(hn[0][0], 2 * a, 1e-4, `H₁₁ in (${a}; ${b})`);
  nah(hn[1][1], 1, 1e-4, `H₂₂ in (${a}; ${b})`);
  nah(hn[0][1], 0, 1e-5, `H₁₂ in (${a}; ${b})`);
}

let p = [2, 1.5];
const bahn = [p];
for (let k = 0; k < 8; k++) {
  p = newtonSchritt(f1, p, exakt1);
  assert.ok(p, "der Newton-Schritt darf hier nicht abbrechen");
  bahn.push(p);
}

// In x₂ ist f quadratisch: EIN Schritt genügt.
nah(bahn[1][1], 0, 1e-15, "x₂ nach einem Schritt");
// Die x₁-Folge des Headers.
nah(bahn[1][0], 1.25, 1e-15, "x₁ nach Schritt 1");
nah(bahn[2][0], 1.025, 1e-15, "x₁ nach Schritt 2");
nah(bahn[3][0], 1.0003048780487804, 1e-15, "x₁ nach Schritt 3");
nah(bahn[4][0], 1.0000000464611473, 1e-14, "x₁ nach Schritt 4");
// Gegenprobe: die eindimensionale Newton-Iteration x ← x − (x²−1)/(2x) liefert
// dieselben Zahlen (das ist das Heron-Verfahren für √1).
let heron = 2;
for (let k = 1; k <= 4; k++) {
  heron -= (heron * heron - 1) / (2 * heron);
  nah(bahn[k][0], heron, 1e-15, `Heron-Gegenprobe für Schritt ${k}`);
}

// Die Fehlerspalte misst den Abstand zum Ziel (1; 0).
const fehler = bahn.map((q) => Math.hypot(q[0] - 1, q[1] - 0));
nah(fehler[0], Math.hypot(1, 1.5), 1e-15, "e₀");
nah(fehler[0], 1.802776, 1e-6, "e₀ als Zahl");
nah(fehler[1], 0.25, 1e-15, "e₁");
nah(fehler[2], 0.025, 1e-15, "e₂");
nah(fehler[3], 3.048780487804e-4, 1e-15, "e₃");
nah(fehler[4], 4.64611e-8, 1e-12, "e₄");
assert.ok(fehler[5] < 1.5e-15, `e₅ muss unter 1,5e−15 liegen (ist ${fehler[5]})`);

// Die Schätzfrage: In welchem Schritt fällt der Abstand zum ersten Mal unter 1e−10?
let ersterSchritt = -1;
for (let k = 0; k < fehler.length; k++)
  if (fehler[k] < 1e-10) {
    ersterSchritt = k;
    break;
  }
assert.equal(ersterSchritt, 5, "die Lösung der Schätzfrage muss 5 sein");
assert.ok(fehler[4] > 1e-10, "in Schritt 4 muss der Fehler noch über 1e−10 liegen");

// Der Quotient e_k/e_{k−1}² strebt gegen 1/(2x*) = 0,5.
const quot = [1, 2, 3, 4].map((k) => fehler[k] / fehler[k - 1] ** 2);
nah(quot[0], 0.0769, 1e-4, "e₁/e₀²");
nah(quot[1], 0.4, 1e-9, "e₂/e₁²");
nah(quot[2], 0.4878, 1e-4, "e₃/e₂²");
nah(quot[3], 0.4998, 1e-4, "e₄/e₃²");
assert.ok(Math.abs(quot[3] - 0.5) < Math.abs(quot[1] - 0.5), "die Quotienten müssen gegen 0,5 streben");

/* ------------------------------- Start mit x₁ < 0 läuft in den Sattelpunkt */

let s = [-2, 1];
for (let k = 0; k < 12; k++) s = newtonSchritt(f1, s, exakt1);
nah(s[0], -1, 1e-12, "x₁ läuft gegen −1");
nah(s[1], 0, 1e-15, "x₂ läuft gegen 0");
// (−1; 0) ist ein Sattelpunkt: Hesse = diag(−2, 1), also indefinit.
const hSattel = exakt1.hess(-1, 0);
nah(hSattel[0][0] * hSattel[1][1] - hSattel[0][1] * hSattel[1][0], -2, 1e-15, "det H im Sattel");
assert.ok(hSattel[0][0] < 0 && hSattel[1][1] > 0, "die Hesse-Matrix im Sattel muss indefinit sein");
// Und (1; 0) ist tatsächlich das Minimum.
const hMin = exakt1.hess(1, 0);
assert.ok(hMin[0][0] > 0 && hMin[0][0] * hMin[1][1] - hMin[0][1] ** 2 > 0, "H im Minimum positiv definit");

/* --------------------------------- Start mit x₁ = 0: singuläre Hesse-Matrix */

// Der x₁-Regler rastet auf 0,25 und trifft die Null exakt.
assert.ok(Number.isInteger(0 / 0.25), "die Null muss auf dem x₁-Raster liegen");
assert.equal(newtonSchritt(f1, [0, 1], exakt1), null, "bei x₁ = 0 darf es keinen Newton-Schritt geben");
const hNull = exakt1.hess(0, 1);
nah(hNull[0][0] * hNull[1][1] - hNull[0][1] * hNull[1][0], 0, 0, "det H bei x₁ = 0 muss exakt null sein");

/* --------------------------------- Die Quadrik: ein einziger exakter Schritt */

const exakt2 = {
  grad: (a, b) => [4 * a + 2 * b - 4, 2 * a + 6 * b - 6],
  hess: () => [
    [4, 2],
    [2, 6],
  ],
};
for (const start of [
  [2, 1.5],
  [-2, -2],
  [0, 0],
  [1.25, -0.5],
]) {
  const q = newtonSchritt(f2, start, exakt2);
  nah(q[0], 0.6, 1e-12, `x₁ nach einem Schritt von (${start})`);
  nah(q[1], 0.8, 1e-12, `x₂ nach einem Schritt von (${start})`);
  const g = gradNum(f2, q[0], q[1]);
  assert.ok(Math.hypot(...g) < 1e-9, "der Gradient muss nach einem Schritt verschwinden");
}
nah(f2(0.6, 0.8), -3.6, 1e-12, "f im Minimum der Quadrik");
// Gegenprobe der Lösung: das lineare System 4x₁+2x₂ = 4, 2x₁+6x₂ = 6 hat die
// Lösung (0,6; 0,8) — hier über die Cramersche Regel, unabhängig vom Lauf.
const detQ = 4 * 6 - 2 * 2;
nah((4 * 6 - 2 * 6) / detQ, 0.6, 1e-15, "x₁ nach Cramer");
nah((4 * 6 - 4 * 2) / detQ, 0.8, 1e-15, "x₂ nach Cramer");

console.log("REV29 S108Newton: Iterierte, Fehlerordnung und die drei Sonderfälle geprüft.");
