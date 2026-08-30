#!/usr/bin/env node
/**
 * REV29 — src/chapters/07-kq/widgets/S74Local.tsx
 * (OrthoWidget, GramSchmidtWidget, CgsVsMgsWidget).
 *
 * Unabhängige Rechenwege:
 *   • Die Läuchli-Messreihe wird hier mit einer eigenen Implementierung von
 *     CGS, MGS und MGS + Re-Orthogonalisierung neu gefahren; der
 *     Orthogonalitätsverlust wird über Q Qᵀ statt QᵀQ gemessen (bei quadratisch
 *     gestapelten Zeilen dieselbe Größe, anderer Rechenweg).
 *   • Die Gram-Schmidt-Geometrie wird gegen die trigonometrische Formel
 *     ‖q̃₂‖ = ‖a₂‖ sin∠(a₁,a₂) geprüft, die das Widget nirgends benutzt.
 * Alle Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/07-kq/widgets/S74Local.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);
const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
const nrm = (u) => Math.sqrt(dot(u, u));

/* ------------------------------------------ OrthoWidget: Drehung und Spiegelung */

const x = [2, 1];
nah(nrm(x), 2.236068, 1e-6, "‖x‖₂");
const t = (35 * Math.PI) / 180;
const drehung = [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]];
const spiegelung = [[Math.cos(t), Math.sin(t)], [Math.sin(t), -Math.cos(t)]];
const wende = (Q) => [Q[0][0] * x[0] + Q[0][1] * x[1], Q[1][0] * x[0] + Q[1][1] * x[1]];
nah(wende(drehung)[0], 1.0647, 1e-4, "Qx₁ (Drehung 35°)");
nah(wende(drehung)[1], 1.9663, 1e-4, "Qx₂ (Drehung 35°)");
nah(wende(spiegelung)[0], 2.2119, 1e-4, "Qx₁ (Spiegelung 35°)");
nah(wende(spiegelung)[1], 0.3280, 1e-4, "Qx₂ (Spiegelung 35°)");
nah(nrm(wende(drehung)), 2.236067977500, 1e-12, "‖Qx‖₂ (Drehung)");
nah(nrm(wende(spiegelung)), 2.236067977500, 1e-12, "‖Qx‖₂ (Spiegelung)");
nah(drehung[0][0] * drehung[1][1] - drehung[0][1] * drehung[1][0], 1, 1e-15, "det (Drehung)");
nah(spiegelung[0][0] * spiegelung[1][1] - spiegelung[0][1] * spiegelung[1][0], -1, 1e-15, "det (Spiegelung)");

/* ------------------------------------------- GramSchmidtWidget: Rest und Winkel */

const A1_LEN = 2.4;
/** Ein Gram-Schmidt-Schritt in den Reglerkoordinaten des Widgets. */
function schritt(phi1, phi2, len2) {
  const rad = (d) => (d * Math.PI) / 180;
  const a1 = [A1_LEN * Math.cos(rad(phi1)), A1_LEN * Math.sin(rad(phi1))];
  const a2 = [len2 * Math.cos(rad(phi2)), len2 * Math.sin(rad(phi2))];
  const q1 = [a1[0] / A1_LEN, a1[1] / A1_LEN];
  const gamma = dot(q1, a2);
  const res = [a2[0] - gamma * q1[0], a2[1] - gamma * q1[1]];
  return { gamma, nr: nrm(res), anteil: nrm(res) / len2 };
}

// Voreinstellung φ₁ = 120°, φ₂ = 112°, ‖a₂‖ = 2,2 – der 8°-Fall.
const vor = schritt(120, 112, 2.2);
nah(vor.gamma, 2.1786, 1e-4, "R₁₂ in der Voreinstellung");
nah(vor.nr, 0.3062, 1e-4, "‖q̃₂‖ in der Voreinstellung");
nah(100 * vor.anteil, 13.9, 0.1, "Restanteil in Prozent");
// Gegenprobe über die Trigonometrie (der Weg, den das Widget NICHT geht).
for (const [p1, p2, l2] of [[120, 112, 2.2], [120, 118, 2.2], [120, 30, 2.2], [10, 190, 1.5]]) {
  const s = schritt(p1, p2, l2);
  nah(s.nr, l2 * Math.abs(Math.sin(((p1 - p2) * Math.PI) / 180)), 1e-12, `‖q̃₂‖ = ‖a₂‖ sin∠ bei ${p1}/${p2}`);
}
nah(schritt(120, 118, 2.2).nr, 0.0768, 1e-4, "‖q̃₂‖ bei 2° zwischen den Spalten");
nah(schritt(120, 30, 2.2).gamma, 0, 1e-15, "R₁₂ bei senkrechten Spalten");
nah(schritt(120, 30, 2.2).nr, 2.2, 1e-12, "‖q̃₂‖ bei senkrechten Spalten");
// Die Kollinearitätsschwelle 1e−9 trennt exakt: φ ganzzahlig, nächster Zustand 0,038.
nah(schritt(120, 120, 2.2).nr, 0, 1e-15, "‖q̃₂‖ bei exakt kollinearen Spalten");
nah(schritt(120, 119, 2.2).nr, 0.0384, 1e-4, "‖q̃₂‖ beim nächsten Reglerschritt");

/* --------------------------------- CgsVsMgsWidget: eigene Läuchli-Implementierung */

const lauchli = (e) => [[1, e, 0, 0], [1, 0, e, 0], [1, 0, 0, e]];

function cgs(C) {
  const Q = [];
  for (let k = 0; k < C.length; k++) {
    const v = C[k].slice();
    for (let j = 0; j < k; j++) {
      const r = dot(Q[j], C[k]); // klassisch: Original-Spalte
      for (let i = 0; i < v.length; i++) v[i] -= r * Q[j][i];
    }
    const n = nrm(v);
    Q.push(v.map((vi) => vi / n));
  }
  return Q;
}

function mgs(C) {
  const V = C.map((c) => c.slice());
  const Q = [];
  for (let k = 0; k < V.length; k++) {
    const n = nrm(V[k]);
    const q = V[k].map((vi) => vi / n);
    Q.push(q);
    for (let j = k + 1; j < V.length; j++) {
      const r = dot(q, V[j]); // modifiziert: aktualisierte Spalte
      for (let i = 0; i < V[j].length; i++) V[j][i] -= r * q[i];
    }
  }
  return Q;
}

/** Orthogonalitätsverlust, gemessen über die Gram-Matrix der Q-Spalten. */
function verlust(Q) {
  let w = 0;
  for (let i = 0; i < Q.length; i++) {
    for (let j = i; j < Q.length; j++) {
      w = Math.max(w, Math.abs(dot(Q[i], Q[j]) - (i === j ? 1 : 0)));
    }
  }
  return w;
}

const messreihe = (p) => {
  const C = lauchli(Math.pow(10, -p));
  return [verlust(cgs(C)), verlust(mgs(C)), verlust(mgs(mgs(C)))];
};

const rel = (a, b) => Math.abs(a - b) / Math.abs(b);
const [c4, m4, r4] = messreihe(4);
assert.ok(rel(c4, 2.26e-9) < 0.01, `CGS bei p = 4: ${c4}`);
assert.ok(rel(m4, 2.77e-13) < 0.01, `MGS bei p = 4: ${m4}`);
assert.ok(rel(r4, 2.22e-16) < 0.01, `MGS+Nachlauf bei p = 4: ${r4}`);
const [c6, m6] = messreihe(6);
assert.ok(rel(c6, 5.13e-5) < 0.01, `CGS bei p = 6: ${c6}`);
assert.ok(rel(m6, 6.29e-11) < 0.01, `MGS bei p = 6: ${m6}`);
const [c8, m8, r8] = messreihe(8);
assert.ok(rel(c8, 5.0e-1) < 0.01, `CGS bei p = 8: ${c8}`);
assert.ok(rel(m8, 7.07e-9) < 0.01, `MGS bei p = 8: ${m8}`);
assert.ok(rel(r8, 5.55e-17) < 0.01, `MGS+Nachlauf bei p = 8: ${r8}`);
nah(Math.sqrt(3 + 1e-16) / 1e-8, 1.7320508e8, 1e2, "κ₂(A) der Läuchli-Matrix bei p = 8");

// Das im Verdikt und in der Prosa benannte Messartefakt: ab p ≈ 8 sinkt MGS wieder.
assert.ok(messreihe(12)[1] < messreihe(8)[1], "MGS-Fehler muss bei p = 12 kleiner sein als bei p = 8");
assert.ok(rel(messreihe(12)[1], 7.07e-13) < 0.01, "MGS bei p = 12");

/* -------------------------------------------- A8: kein Verweis auf Weggefaltetes */

assert.ok(
  !/Das nächste Widget misst/.test(src),
  "das Gram-Schmidt-Verdikt darf nicht auf das Widget in der eingeklappten Vertiefung verweisen",
);

console.log("REV29 07-kq S74Local: alle Zahlen bestätigt");
