#!/usr/bin/env node
/**
 * REV29 — src/chapters/08-la-misc/widgets/S81Potenz.tsx (PotenzmethodenStepper).
 *
 * Unabhängiger Rechenweg: Eigenwerte und Eigenvektoren werden hier aus dem
 * charakteristischen Polynom von A bestimmt und mit den im Widget hartkodierten
 * V1/V2 verglichen; die Rate 4/9 wird zusätzlich an der wirklich gelaufenen
 * Iteration gemessen (Quotient aufeinanderfolgender Winkelreste), nicht aus
 * λ₂/λ₁ abgelesen. Alle Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/08-la-misc/widgets/S81Potenz.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const A = [[5, -2], [-2, 8]];
const mul = (x) => [A[0][0] * x[0] + A[0][1] * x[1], A[1][0] * x[0] + A[1][1] * x[1]];
const norm = (x) => {
  const n = Math.hypot(x[0], x[1]);
  return [x[0] / n, x[1] / n];
};

/* --------------------------------- Eigenwerte aus dem charakteristischen Polynom */

const tr = A[0][0] + A[1][1];
const de = A[0][0] * A[1][1] - A[0][1] * A[1][0];
const w = Math.sqrt(tr * tr - 4 * de);
const lambda1 = (tr + w) / 2;
const lambda2 = (tr - w) / 2;
nah(lambda1, 9, 1e-12, "λ₁");
nah(lambda2, 4, 1e-12, "λ₂");
nah(lambda2 / lambda1, 4 / 9, 1e-15, "Rate |λ₂/λ₁|");

// Die im Widget hartkodierten Eigenvektoren müssen wirklich Eigenvektoren sein.
const V1 = [-1 / Math.sqrt(5), 2 / Math.sqrt(5)];
const V2 = [2 / Math.sqrt(5), 1 / Math.sqrt(5)];
assert.ok(/const V1: Vec = \[-1 \/ Math\.sqrt\(5\), 2 \/ Math\.sqrt\(5\)\]/.test(src), "V1 im Widget");
assert.ok(/const V2: Vec = \[2 \/ Math\.sqrt\(5\), 1 \/ Math\.sqrt\(5\)\]/.test(src), "V2 im Widget");
for (const [v, l, name] of [[V1, lambda1, "v₁"], [V2, lambda2, "v₂"]]) {
  const Av = mul(v);
  nah(Av[0] - l * v[0], 0, 1e-14, `A ${name} = λ ${name}, erste Komponente`);
  nah(Av[1] - l * v[1], 0, 1e-14, `A ${name} = λ ${name}, zweite Komponente`);
  nah(Math.hypot(v[0], v[1]), 1, 1e-15, `${name} ist normiert`);
}
nah(V1[0] * V2[0] + V1[1] * V2[1], 0, 1e-16, "v₁ ⟂ v₂ (A ist symmetrisch)");

/* ------------------------------ Die Rate wird an der Iteration selbst gemessen */

const KMAX = 18;
const start = [Math.cos((33 * Math.PI) / 180), Math.sin((33 * Math.PI) / 180)];
const sin = (v) => Math.abs(v[0] * V1[1] - v[1] * V1[0]);
let x = start;
let prev = sin(x);
const quotienten = [];
for (let k = 1; k <= KMAX; k++) {
  x = norm(mul(x));
  const s = sin(x);
  quotienten.push(s / prev);
  prev = s;
}
nah(quotienten[0], 0.9754, 1e-4, "Quotient im ersten Schritt (noch weit von der Rate)");
assert.ok(
  Math.abs(quotienten[0] - 4 / 9) > 0.4,
  "im ersten Schritt darf das Verdikt nicht von Annäherung an die Rate sprechen",
);
nah(quotienten[KMAX - 1], 4 / 9, 1e-6, "Quotient im letzten Schritt trifft die Rate");
nah(x[0] * mul(x)[0] + x[1] * mul(x)[1], 9, 1e-9, "Rayleigh-Quotient bei k = 18");

/* -------------------- F8: der Ausnahmefall ist NUR über die Presets erreichbar */

let minC1 = Infinity;
let argMin = null;
for (let t = -180; t <= 180; t++) {
  const v = [Math.cos((t * Math.PI) / 180), Math.sin((t * Math.PI) / 180)];
  const c = Math.abs(v[0] * V1[0] + v[1] * V1[1]);
  if (c < minC1) {
    minC1 = c;
    argMin = t;
  }
}
nah(minC1, 0.0075912, 1e-6, "kleinstes |c₁| über den 1°-Regler");
assert.equal(argMin, 27, "der reglernächste Winkel an v₂");
assert.ok(minC1 > 1e-8, "die Schwelle 1e−8 darf über den Regler nicht erreichbar sein");
// … über den Preset-Knopf dagegen exakt.
const thetaV2 = (Math.atan2(V2[1], V2[0]) * 180) / Math.PI;
nah(thetaV2, 26.565051, 1e-6, "Winkel des Presets „Versagensfall v₂“");
const xv2 = [Math.cos((thetaV2 * Math.PI) / 180), Math.sin((thetaV2 * Math.PI) / 180)];
assert.ok(Math.abs(xv2[0] * V1[0] + xv2[1] * V1[1]) < 1e-8, "der Preset trifft den Ausnahmefall exakt");
// Der neue mittlere Zweig („fast auf v₂“) ist über den Regler erreichbar.
assert.ok(minC1 < 0.02, "der Zweig „fast auf v₂“ (|c₁| < 0,02) muss über den Regler erreichbar sein");
assert.ok(/const knappDaneben = /.test(src), "der Zwischenzweig fehlt im Widget");
assert.ok(!/Ausnahmfall/.test(src), "Tippfehler „Ausnahmfall“ darf nicht zurückkehren");

console.log("REV29 08-la-misc S81Potenz: alle Zahlen bestätigt");
