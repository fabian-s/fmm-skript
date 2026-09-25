#!/usr/bin/env node
/**
 * REV29 — src/chapters/07-kq/widgets/S75Local.tsx
 * (GivensWidget, HouseholderWidget, AusloeschungWidget).
 *
 * Unabhängige Rechenwege:
 *   • Givens: G wird hier explizit als Matrix aufgebaut und auf a angewandt,
 *     statt r, c, s nur einzeln nachzurechnen; zusätzlich wird GᵀG = I geprüft.
 *   • Householder: H = I − 2vvᵀ/(vᵀv) wird als volle 2×2-Matrix gebildet und
 *     auf a angewandt; das Widget interpoliert stattdessen a − t·v(vᵀa/vᵀv).
 *     Beide Wege müssen bei t = 2 denselben Punkt liefern.
 *   • Auslöschung: die t-stellige Arithmetik wird nachgebaut, die Sollwerte
 *     stammen aus der stabilen Umformung 1 − √(1+δ²) = −δ²/(1+√(1+δ²)).
 * Alle Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/07-kq/widgets/S75Local.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];

/* ---------------------------------------------------- GivensWidget: G als Matrix */

function givens(a) {
  const r = Math.hypot(a[0], a[1]);
  if (r < 1e-15) return { r, c: 1, s: 0, Ga: [0, 0] };
  const c = a[0] / r;
  const s = a[1] / r;
  const G = [[c, s], [-s, c]];
  return { r, c, s, Ga: [G[0][0] * a[0] + G[0][1] * a[1], G[1][0] * a[0] + G[1][1] * a[1]], G };
}

const g1 = givens([4, 3]);
nah(g1.r, 5, 1e-15, "r bei a = (4,3)");
nah(g1.c, 0.8, 1e-15, "c bei a = (4,3)");
nah(g1.s, 0.6, 1e-15, "s bei a = (4,3) – Selbsttest S75");
nah(g1.Ga[0], 5, 1e-15, "Ga₁ bei a = (4,3)");
nah(g1.Ga[1], 0, 1e-15, "Ga₂ bei a = (4,3)");
nah(g1.c ** 2 + g1.s ** 2, 1, 1e-15, "c² + s² = 1");
const g2 = givens([-3, 4]);
nah(g2.c, -0.6, 1e-15, "c bei a = (−3,4)");
nah(g2.s, 0.8, 1e-15, "s bei a = (−3,4)");
nah(g2.Ga[0], 5, 1e-15, "Ga₁ bei a = (−3,4)");
nah(g2.Ga[1], 0, 1e-15, "Ga₂ bei a = (−3,4)");
nah((36.86989764584402 * Math.PI) / 180, Math.atan2(3, 4), 1e-12, "θ = 36,870° bei a = (4,3)");
// Der Entartungsfall a = 0 ist über den Regler (Schritt 0,1) exakt erreichbar.
assert.equal(givens([0, 0]).r, 0, "a = 0 muss exakt r = 0 liefern");
assert.ok(givens([0.1, 0]).r > 1e-9, "der nächste Reglerzustand ist deutlich von 0 getrennt");

/* ------------------------------- HouseholderWidget: H als volle Spiegelmatrix */

const deg = 130;
const rr = 2;
const a = [rr * Math.cos((deg * Math.PI) / 180), rr * Math.sin((deg * Math.PI) / 180)];
const alpha = +rr;
const v = [a[0] - alpha, a[1]];
const c = dot(v, a) / dot(v, v);
nah(2 * c, 1, 1e-12, "2 vᵀa/vᵀv = 1 (der Grund für die Zwei in H)");
const w = (t) => [a[0] - t * c * v[0], a[1] - t * c * v[1]];

nah(Math.hypot(...w(0)), 2, 1e-12, "‖w(0)‖ = ‖a‖");
nah(Math.hypot(...w(1)), 0.845237, 1e-6, "‖w(1)‖ (Projektion verkürzt)");
nah(dot(v, w(1)), 0, 1e-12, "vᵀw(1) = 0: w(1) liegt auf der Spiegelgeraden");
nah(Math.hypot(...w(2)), 2, 1e-12, "‖w(2)‖ = ‖a‖ (Länge zurück)");
nah(Math.hypot(w(2)[0] - alpha, w(2)[1]), 0, 1e-14, "‖Ha − αe₁‖");

// Gegenprobe über die volle Matrix H = I − 2vvᵀ/(vᵀv).
const vv = dot(v, v);
const H = [
  [1 - (2 * v[0] * v[0]) / vv, -(2 * v[0] * v[1]) / vv],
  [-(2 * v[1] * v[0]) / vv, 1 - (2 * v[1] * v[1]) / vv],
];
const Ha = [H[0][0] * a[0] + H[0][1] * a[1], H[1][0] * a[0] + H[1][1] * a[1]];
nah(Ha[0], w(2)[0], 1e-14, "H·a gegen w(2), erste Komponente");
nah(Ha[1], w(2)[1], 1e-14, "H·a gegen w(2), zweite Komponente");
nah(H[0][0] * H[0][0] + H[1][0] * H[1][0], 1, 1e-14, "H ist orthogonal");

// Die Grenzfälle des Reviews: bei t = 0,95 bzw. 1,95 gilt die exakte Aussage NICHT.
assert.ok(Math.abs(dot(v, w(0.95))) > 1e-3, "bei t = 0,95 liegt w nicht auf der Spiegelgeraden");
assert.ok(Math.abs(Math.hypot(...w(1.95)) - 2) > 1e-3, "bei t = 1,95 ist die Länge nicht zurück");
nah(dot(v, w(0.95)), 0.3287, 1e-3, "vᵀw bei t = 0,95");
nah(Math.hypot(...w(1.95)), 1.9184, 1e-3, "‖w‖ bei t = 1,95");

/* ------------------------------------ AusloeschungWidget: t-stellige Arithmetik */

const rnd = (x, t) => parseFloat(x.toPrecision(t));
function ausloeschung(logd, t) {
  const delta = Math.pow(10, logd);
  const nrm = rnd(Math.sqrt(rnd(1 + rnd(delta * delta, t), t)), t);
  const exakt = Math.hypot(1, delta);
  const v1Schlecht = rnd(1 - nrm, t);
  const v1Gut = rnd(1 + nrm, t);
  const v1SchlechtExakt = (-delta * delta) / (1 + exakt); // stabile Umformung
  const v1GutExakt = 1 + exakt;
  const haFehler = (v1, alphaExakt) => {
    const q = v1 * v1 + delta * delta;
    if (q === 0) return NaN;
    const va = v1 + delta * delta;
    return Math.hypot(1 - ((2 * va) / q) * v1 - alphaExakt, delta - ((2 * va) / q) * delta);
  };
  const ziffern = (comp, ex) => {
    const rel = Math.abs(comp - ex) / Math.abs(ex);
    return rel === 0 ? t : Math.max(0, Math.min(t, -Math.log10(rel)));
  };
  return {
    v1Schlecht,
    v1Gut,
    zifSchlecht: ziffern(v1Schlecht, v1SchlechtExakt),
    zifGut: ziffern(v1Gut, v1GutExakt),
    fehlerSchlecht: haFehler(v1Schlecht, exakt),
    fehlerGut: haFehler(v1Gut, -exakt),
  };
}

const a1 = ausloeschung(-3, 4);
assert.equal(a1.v1Schlecht, 0, "δ = 10⁻³, t = 4: die ungünstige Wahl löscht v₁ vollständig aus");
nah(a1.v1Gut, 2, 1e-12, "δ = 10⁻³, t = 4: die sichere Wahl liefert v₁ = 2,000");
nah(a1.zifSchlecht, 0, 1e-9, "0 korrekte Ziffern bei der ungünstigen Wahl");
nah(a1.zifGut, 4, 1e-9, "alle 4 Ziffern bei der sicheren Wahl");
nah(a1.fehlerSchlecht, 1.0e-3, 1e-6, "‖Ha − αe₁‖ bei der ungünstigen Wahl");
nah(a1.fehlerGut, 2.5e-10, 1e-12, "‖Ha − αe₁‖ bei der sicheren Wahl");

const a2 = ausloeschung(-1, 4);
nah(a2.zifSchlecht, 2.6031, 1e-3, "δ = 10⁻¹, t = 4: korrekte Ziffern, ungünstige Wahl");
nah(a2.zifGut, 4, 1e-9, "δ = 10⁻¹, t = 4: korrekte Ziffern, sichere Wahl");
nah(a2.fehlerSchlecht, 2.4938e-4, 1e-7, "δ = 10⁻¹, t = 4: Fehler der ungünstigen Wahl");
nah(a2.fehlerGut, 6.2034e-7, 1e-10, "δ = 10⁻¹, t = 4: Fehler der sicheren Wahl");

// Ab welchem δ wird v₁ exakt zu null gerundet? (Reglerraster 0,5 in log δ.)
for (const [t, soll] of [[4, -1.5], [6, -2.5], [8, -3.5]]) {
  let ersteNull = null;
  for (let l = -0.5; l >= -5.0001; l -= 0.5) {
    const l2 = Number(l.toFixed(1));
    if (ausloeschung(l2, t) .v1Schlecht === 0) {
      ersteNull = l2;
      break;
    }
  }
  assert.equal(ersteNull, soll, `v₁ wird bei t = ${t} ab log δ = ${soll} exakt null`);
}

/* ------------------------------------------- Fixes im Quelltext verankert (F6) */

assert.ok(
  /<line x1=\{size \/ 2\} y1=\{0\} x2=\{size \/ 2\} y2=\{size\}/.test(src),
  "die x₂-Achse muss senkrecht gezeichnet sein, nicht als Diagonale",
);
assert.ok(/\) : t === 1 \?/.test(src), "exakter Zweig t = 1 fehlt");
assert.ok(/Math\.abs\(t - 1\) <= 0\.05 \+ 1e-9/.test(src), "der Rand des Nahbands muss den Rastwert 0,95 einschließen");
assert.ok(Math.abs(0.95 - 1) <= 0.05 + 1e-9, "t = 0,95 liegt im Nahband");
assert.ok(/\) : t === 2 \?/.test(src), "exakter Zweig t = 2 fehlt");
assert.ok(/\{t === 2 && arrow\(refl, FARBEN\.refl\)\}/.test(src), "der Ha-Pfeil darf nur bei t = 2 erscheinen");

console.log("REV29 07-kq S75Local: alle Zahlen bestätigt");
