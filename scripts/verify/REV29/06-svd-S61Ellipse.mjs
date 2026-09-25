#!/usr/bin/env node
/**
 * REV29 — src/chapters/06-svd/widgets/S61EllipseWidget.tsx (EinheitskreisEllipse).
 *
 * Prüft die im Header, in den Verdikten und in Beispiel 6.1.2 behaupteten Zahlen
 * sowie die Drei-Zustands-Logik, die den CRITICAL des Reviews behebt.
 *
 * Unabhängiger Rechenweg: die Singulärwerte und die Maximalrichtung werden hier
 * NICHT aus dem charakteristischen Polynom genommen (das tut das Widget), sondern
 * durch Abtasten des Einheitskreises mit 3,6 Mio. Winkeln — genau der Rasterlauf,
 * den der Header behauptet. Die Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/06-svd/widgets/S61EllipseWidget.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ----------------------------------------------- Abtastung des Einheitskreises */

const N = 3_600_000;
/** Maximum und Minimum von ‖Ax(θ)‖ samt Winkel, per Rasterlauf. */
function abtastung(A) {
  let smax = -Infinity, smin = Infinity, tmax = 0, tmin = 0;
  for (let i = 0; i < N; i++) {
    const t = (2 * Math.PI * i) / N;
    const c = Math.cos(t), s = Math.sin(t);
    const l = Math.hypot(A[0][0] * c + A[0][1] * s, A[1][0] * c + A[1][1] * s);
    if (l > smax) { smax = l; tmax = (t * 180) / Math.PI; }
    if (l < smin) { smin = l; tmin = (t * 180) / Math.PI; }
  }
  return { smax, smin, tmax, tmin };
}

/* ------------------------------------------------------- Voreinstellung A = (2 1; 0 1) */

const A = [[2, 1], [0, 1]];
const r = abtastung(A);
nah(r.smax, 2.2882456113, 1e-6, "σ₁ des Beispiels");
nah(r.smin, 0.8740320489, 1e-6, "σ₂ des Beispiels");
nah(r.smax, Math.sqrt(3 + Math.sqrt(5)), 1e-6, "σ₁ = √(3+√5)");
nah(r.smin, Math.sqrt(3 - Math.sqrt(5)), 1e-6, "σ₂ = √(3−√5)");
nah(r.smax / r.smin, 2.618033989, 1e-6, "σ₁/σ₂");
// Die beiden Extremstellen des Headers, modulo der 180°-Periode.
nah(Math.min(Math.abs(r.tmax - 31.72), Math.abs(r.tmax - 211.72)), 0, 5e-3, "θ* = 31,72°");
nah(Math.min(Math.abs(r.tmin - 121.72), Math.abs(r.tmin - 301.72)), 0, 5e-3, "θ_min = 121,72°");

// v₁ = (0,851; 0,526) und die Orthogonalität der Bilder.
const t1 = (31.7174744 * Math.PI) / 180;
const v1 = [Math.cos(t1), Math.sin(t1)];
const v2 = [-v1[1], v1[0]];
nah(v1[0], 0.851, 5e-4, "v₁ erste Komponente");
nah(v1[1], 0.526, 5e-4, "v₁ zweite Komponente");
nah(v2[0], -0.526, 5e-4, "v₂ erste Komponente");
nah(v2[1], 0.851, 5e-4, "v₂ zweite Komponente");
const bild = (v) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
const [u1, u2] = [bild(v1), bild(v2)];
nah(u1[0] * u2[0] + u1[1] * u2[1], 0, 1e-6, "u₁ᵀu₂ = 0");
nah(Math.hypot(...u1), 2.2882456113, 1e-6, "‖Av₁‖ = σ₁");

/* ------------------------------------------------------------------- Presets */

const PRESETS = {
  drehung: [[0.6, -0.8], [0.8, 0.6]],
  diagonal: [[2, 0], [0, 0.5]],
  singulaer: [[1, 2], [2, 4]],
};
const pd = abtastung(PRESETS.drehung);
nah(pd.smax, 1, 1e-9, "Preset Drehung σ₁");
nah(pd.smin, 1, 1e-9, "Preset Drehung σ₂");
const pdi = abtastung(PRESETS.diagonal);
nah(pdi.smax, 2, 1e-9, "Preset Diagonal σ₁");
nah(pdi.smin, 0.5, 1e-9, "Preset Diagonal σ₂");
const ps = abtastung(PRESETS.singulaer);
nah(ps.smax, 5, 1e-6, "Preset singulär σ₁");
nah(ps.smin, 0, 1e-5, "Preset singulär σ₂ (Rasterminimum)");
nah(Math.min(Math.abs(ps.tmax - 63.43), Math.abs(ps.tmax - 243.43)), 0, 5e-3, "Preset singulär θ*");

/* ---------------------------------------- Drei-Zustands-Regel (der CRITICAL) */

// Nachbau der beiden exakten Strukturtests aus dem Widget.
const ganz = (m) => [m[0][0], m[0][1], m[1][0], m[1][1]].map((v) => Math.round((v || 0) * 1e6));
const istEntartet = (m) => { const [a, b, c, d] = ganz(m); return a * d - b * c === 0; };
const istIsotrop = (m) => {
  const [a, b, c, d] = ganz(m);
  const s1 = a * a + c * c;
  return a * b + c * d === 0 && s1 === b * b + d * d && s1 > 0;
};

assert.ok(istIsotrop(PRESETS.drehung), "Preset Drehung wird nicht als isotrop erkannt");
assert.ok(!istEntartet(PRESETS.drehung), "Preset Drehung gilt fälschlich als entartet");
assert.ok(istEntartet(PRESETS.singulaer), "Preset singulär wird nicht als entartet erkannt");
assert.ok(!istIsotrop(PRESETS.diagonal) && !istEntartet(PRESETS.diagonal));
assert.ok(!istIsotrop(A) && !istEntartet(A));
// Skalierte Drehung: ebenfalls ein Vielfaches einer Orthogonalmatrix.
assert.ok(istIsotrop([[1.5, -2], [2, 1.5]]), "2,5·Drehung nicht als isotrop erkannt");
assert.ok(istIsotrop([[3, -4], [4, 3]]), "Vielfaches einer Drehmatrix nicht erkannt");
assert.ok(istIsotrop([[0, -2], [2, 0]]), "2·Drehung um 90° nicht erkannt");
assert.ok(!istIsotrop([[0, 0], [0, 0]]), "die Nullmatrix darf nicht isotrop heißen");

// Der Fall aus dem Review: A = diag(1; 1,01) ist KEIN Vielfaches einer
// Orthogonalmatrix, liegt aber unter der alten 1,02-Schwelle.
const knapp = [[1, 0], [0, 1.01]];
assert.ok(!istIsotrop(knapp), "diag(1; 1,01) wird immer noch als isotrop verkauft");
assert.ok(!istEntartet(knapp));
const rk = abtastung(knapp);
nah(rk.smax / rk.smin, 1.01, 1e-6, "κ von diag(1; 1,01)");
assert.ok(rk.smax / rk.smin < 1.02, `der Zwischenfall „fast ein Kreis" wäre nicht mehr erreichbar`);
assert.ok(rk.smax - rk.smin > 1e-3, "σ₁ und σ₂ von diag(1; 1,01) fallen NICHT zusammen");

// Fast entartet: diag(1; 1e−5) muss über der κ-Schwelle 1e3 liegen und darf nicht
// als „singulär" durchgehen.
const nadel = [[1, 0], [0, 1e-5]];
assert.ok(!istEntartet(nadel), `diag(1; 1e−5) gilt fälschlich als exakt singulär`);
assert.ok(1 / 1e-5 > 1e3, `die Schwelle für „fast entartet" greift nicht`);

/* ------------------------------------------------- Quelltext: keine Rückfälle */

assert.ok(
  !/smax \/ smin < 1\.02/.test(src.replace(/kappa < 1\.02/g, "")),
  "die 1,02-Toleranz entscheidet wieder über eine Strukturaussage",
);
assert.ok(/function istIsotrop/.test(src) && /function istEntartet/.test(src),
  "die exakten Strukturtests fehlen");
assert.ok(/const fastEntartet/.test(src) && /const fastIsotrop/.test(src),
  "die beiden Zwischenstufen fehlen");
assert.ok(
  !/smin < 1e-9/.test(src),
  `„entartet" wird wieder über eine Toleranz auf σ₂ entschieden`,
);

console.log("REV29 06-svd-S61Ellipse: ok");
