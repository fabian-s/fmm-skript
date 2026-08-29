#!/usr/bin/env node
/**
 * REV29 — src/chapters/04-fehler/widgets/S42Lgs.tsx (LgsKonditionWidget).
 *
 * Prüft die Zahlen des Widget-Headers (σ_max, σ_min, κ₂ aller vier Presets, die
 * Voreinstellung samt Ausschöpfungsgrad, die ungünstigste Richtung 45,7° und
 * y = (41; −40) für x = (1; −1)); an κ₂ ≈ 82 hängt die Zahlfrage S44.mdx:117.
 *
 * Unabhängiger Rechenweg: Die Singulärwerte kommen hier NICHT aus der
 * geschlossenen Form über AᵀA (die das Widget benutzt), sondern aus einer
 * Abtastung von ‖Ax‖ über 360 000 Richtungen des Einheitskreises; A⁻¹ wird per
 * Gauß-Elimination mit Spaltenpivotisierung berechnet, nicht über die
 * Adjunktenformel. Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/04-fehler/widgets/S42Lgs.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const anwenden = (A, v) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];

/** σ_max und σ_min als Extrema von ‖Ax‖ über den Einheitskreis. */
function sigmaAbtastung(A) {
  let smax = 0, smin = Infinity;
  const N = 360000;
  for (let i = 0; i < N; i++) {
    const t = (2 * Math.PI * i) / N;
    const l = Math.hypot(...anwenden(A, [Math.cos(t), Math.sin(t)]));
    if (l > smax) smax = l;
    if (l < smin) smin = l;
  }
  return [smax, smin];
}

/** A⁻¹ per Gauß-Jordan mit Spaltenpivotisierung (nicht über die Adjunkte). */
function inverseGauss(A) {
  const m = [[A[0][0], A[0][1], 1, 0], [A[1][0], A[1][1], 0, 1]];
  if (Math.abs(m[1][0]) > Math.abs(m[0][0])) { const t = m[0]; m[0] = m[1]; m[1] = t; }
  const f = m[1][0] / m[0][0];
  for (let j = 0; j < 4; j++) m[1][j] -= f * m[0][j];
  for (let j = 3; j >= 0; j--) m[1][j] /= m[1][1];
  const g = m[0][1];
  for (let j = 0; j < 4; j++) m[0][j] -= g * m[1][j];
  for (let j = 3; j >= 0; j--) m[0][j] /= m[0][0];
  return [[m[0][2], m[0][3]], [m[1][2], m[1][3]]];
}

const PRESETS = {
  orth: [[Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6)], [Math.sin(Math.PI / 6), Math.cos(Math.PI / 6)]],
  mild: [[2, 0], [0, 0.8]],
  schlecht: [[1, 1], [1, 1.05]],
  fast: [[1, 1], [1, 1.005]],
};
const SOLL = {
  orth: { smax: 1, smin: 1, kappa: 1 },
  mild: { smax: 2, smin: 0.8, kappa: 2.5 },
  schlecht: { smax: 2.02531, smin: 0.024688, kappa: 82.0378 },
  fast: { smax: 2.0025, smin: 0.0024969, kappa: 802.004 },
};

for (const [id, A] of Object.entries(PRESETS)) {
  const [smax, smin] = sigmaAbtastung(A);
  const s = SOLL[id];
  nah(smax, s.smax, 5e-5, `${id}: σ_max`);
  nah(smin, s.smin, 5e-6, `${id}: σ_min`);
  nah(smax / smin, s.kappa, Math.max(5e-3, s.kappa * 1e-4), `${id}: κ₂`);

  // Der Header behauptet: das über 36 000 Richtungen gesuchte Maximum von
  // κ_rel(f, x) trifft κ₂(A) auf < 0,03 %, das Minimum ist 1.
  const Ainv = inverseGauss(A);
  let maxRel = 0, minRel = Infinity, besteRichtung = 0;
  for (let i = 0; i < 36000; i++) {
    const t = (2 * Math.PI * i) / 36000;
    const x = [Math.cos(t), Math.sin(t)];
    const y = anwenden(Ainv, x);
    const kRel = ((1 / smin) * Math.hypot(...x)) / Math.hypot(...y);
    if (kRel > maxRel) { maxRel = kRel; besteRichtung = (t * 180) / Math.PI; }
    minRel = Math.min(minRel, kRel);
  }
  assert.ok(
    Math.abs(maxRel / (smax / smin) - 1) < 3e-4,
    `${id}: das Maximum von κ_rel verfehlt κ₂ um ${(100 * Math.abs(maxRel / (smax / smin) - 1)).toFixed(4)} %`,
  );
  nah(minRel, 1, 1e-4, `${id}: das Minimum von κ_rel`);
  if (id === "schlecht") nah(besteRichtung % 180, 45.7, 5e-2, "ungünstigste Richtung");
}

/* ------------------------------------------------------------ Voreinstellung */

const A = PRESETS.schlecht;
const Ainv = inverseGauss(A);
const [smax, smin] = sigmaAbtastung(A);
const x = [2, 2.05];
const y = anwenden(Ainv, x);
nah(y[0], 1, 1e-9, "y₁ der Voreinstellung");
nah(y[1], 1, 1e-9, "y₂ der Voreinstellung");
const kappaRel = ((1 / smin) * Math.hypot(...x)) / Math.hypot(...y);
nah(kappaRel, 82.031, 5e-3, "κ_rel der Voreinstellung");
nah(100 * (kappaRel / (smax / smin)), 99.99, 5e-2, "Ausschöpfungsgrad in Prozent");

// Dieselbe Matrix, harmlose rechte Seite.
const xh = [1, -1];
const yh = anwenden(Ainv, xh);
nah(yh[0], 41, 1e-7, "y₁ für x = (1; −1)");
nah(yh[1], -40, 1e-7, "y₂ für x = (1; −1)");
nah(((1 / smin) * Math.hypot(...xh)) / Math.hypot(...yh), 1.00008, 5e-5, "κ_rel für x = (1; −1)");

/* ------------------------------------- der MAJOR: das „ok"-Verdikt greift nicht mehr zu früh */

// Preset „fast singulär" mit x = (1; −1): der Ausschöpfungsgrad ist winzig …
const Af = PRESETS.fast;
const Ainvf = inverseGauss(Af);
const [smaxF, sminF] = sigmaAbtastung(Af);
const yf = anwenden(Ainvf, xh);
const kRelF = ((1 / sminF) * Math.hypot(...xh)) / Math.hypot(...yf);
assert.ok(kRelF / (smaxF / sminF) < 0.15, "der Ausschöpfungsgrad ist nicht mehr klein");
// … aber die Verstärkung selbst ist harmlos, hier darf „ok" stehen.
assert.ok(kRelF < 3, `κ_rel = ${kRelF} ist entgegen der Erwartung groß`);

// Und ein Zustand mit kleinem Ausschöpfungsgrad UND großer Verstärkung muss
// erreichbar sein, sonst wäre der neue Zweig toter Code (F8).
let gefunden = null;
for (let i = 0; i < 3600 && !gefunden; i++) {
  const t = (2 * Math.PI * i) / 3600;
  const xx = [Math.round(300 * Math.cos(t)) / 100, Math.round(300 * Math.sin(t)) / 100];
  if (Math.hypot(...xx) < 0.3) continue;
  const yy = anwenden(Ainvf, xx);
  const kr = ((1 / sminF) * Math.hypot(...xx)) / Math.hypot(...yy);
  if (kr / (smaxF / sminF) < 0.15 && kr > 3) gefunden = { xx, kr };
}
assert.ok(gefunden, "kein x mit Ausschöpfung < 15 % und κ_rel > 3 erreichbar");
assert.ok(/anteil < 0\.15 && kappaRel < 3/.test(src), "der ok-Zweig hängt nicht an κ_rel");

console.log("REV29 04-fehler-S42Lgs: ok");
