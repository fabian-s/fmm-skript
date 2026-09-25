#!/usr/bin/env node
/**
 * REV29 — src/chapters/07-kq/widgets/S73NormerhaltungWidget.tsx.
 *
 * Unabhängiger Rechenweg: Die Längentreue wird hier nicht am einzelnen v
 * geprüft (das tut das Widget), sondern über die Definition MᵀM = I auf einem
 * Raster von Winkeln und zusätzlich an 200 zufälligen, aber geseedeten
 * Testvektoren. So wird der Unterschied zwischen »längentreu für dieses v«
 * (Zufallstreffer) und »orthogonal« belegt statt behauptet.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/07-kq/widgets/S73NormerhaltungWidget.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const app = (Q, x) => [Q[0][0] * x[0] + Q[0][1] * x[1], Q[1][0] * x[0] + Q[1][1] * x[1]];
const det = (Q) => Q[0][0] * Q[1][1] - Q[0][1] * Q[1][0];
/** max |MᵀM − I| als Maß für Orthogonalität. */
function orthFehler(Q) {
  const g = [
    [Q[0][0] ** 2 + Q[1][0] ** 2, Q[0][0] * Q[0][1] + Q[1][0] * Q[1][1]],
    [Q[0][0] * Q[0][1] + Q[1][0] * Q[1][1], Q[0][1] ** 2 + Q[1][1] ** 2],
  ];
  return Math.max(Math.abs(g[0][0] - 1), Math.abs(g[1][1] - 1), Math.abs(g[0][1]));
}

const drehung = (deg) => {
  const t = (deg * Math.PI) / 180;
  return [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]];
};
const spiegelung = (deg) => {
  const t = (2 * deg * Math.PI) / 180;
  return [[Math.cos(t), Math.sin(t)], [Math.sin(t), -Math.cos(t)]];
};
const scherung = (m) => [[1, 0], [m, 1]];

const v = [1.5, 1.0];
const nv = Math.hypot(v[0], v[1]);
nah(nv, 1.802776, 1e-6, "‖v‖₂");

/* --------------------------------------- Drehungen und Spiegelungen: orthogonal */

for (const deg of [0, 40, 90, 180]) {
  const Q = drehung(deg);
  nah(orthFehler(Q), 0, 1e-15, `Drehung um ${deg}° ist orthogonal`);
  nah(det(Q), 1, 1e-15, `det der Drehung um ${deg}°`);
  nah(Math.hypot(...app(Q, v)), 1.802775637732, 1e-12, `‖Qv‖₂ nach Drehung um ${deg}°`);
}
for (const deg of [0, 25, 45]) {
  const Q = spiegelung(deg);
  nah(orthFehler(Q), 0, 1e-15, `Spiegelung an ${deg}° ist orthogonal`);
  nah(det(Q), -1, 1e-15, `det der Spiegelung an ${deg}°`);
  nah(Math.hypot(...app(Q, v)), 1.802775637732, 1e-12, `‖Qv‖₂ nach Spiegelung an ${deg}°`);
}

/* ------------------------------------------------------- Scherung: die drei Fälle */

// m = 0 ist die Identität, der EINZIGE orthogonale Fall der Familie.
nah(orthFehler(scherung(0)), 0, 0, "M = I bei m = 0");
for (let i = -40; i <= 40; i++) {
  const m = i / 20;
  if (m === 0) continue;
  assert.ok(orthFehler(scherung(m)) > 1e-9, `Scherung mit m = ${m} darf nicht orthogonal sein`);
}

// m = −4/3 ist der Zufallstreffer: längentreu NUR für dieses v.
nah(Math.hypot(...app(scherung(-4 / 3), v)), nv, 1e-12, "‖Mv‖₂ beim Zufallstreffer m = −4/3");
assert.deepEqual(
  app(scherung(-4 / 3), v).map((x) => Number(x.toFixed(12))),
  [1.5, -1],
  "der Zufallstreffer spiegelt v an der x₁-Achse",
);
// … aber eben nicht für andere Vektoren: geseedeter Gegenbeweis.
let seed = 20260829;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};
let verletzt = 0;
for (let i = 0; i < 200; i++) {
  const u = [4 * rnd() - 2, 4 * rnd() - 2];
  const nu = Math.hypot(u[0], u[1]);
  if (nu < 1e-6) continue;
  if (Math.abs(Math.hypot(...app(scherung(-4 / 3), u)) - nu) > 1e-3) verletzt++;
}
assert.ok(verletzt > 150, `der Zufallstreffer darf nur für dieses v gelten, verletzt: ${verletzt}/200`);

// Die übrigen Reglerwerte verändern die Länge messbar.
nah(Math.hypot(...app(scherung(-1), v)), 1.581139, 1e-6, "‖Mv‖₂ bei m = −1");
nah(Math.hypot(...app(scherung(0.5), v)), 2.304886, 1e-6, "‖Mv‖₂ bei m = 0,5");
nah(Math.hypot(...app(scherung(1.2), v)), 3.176476, 1e-6, "‖Mv‖₂ bei m = 1,2 (Voreinstellung)");
nah(Math.hypot(...app(scherung(1.2), v)) / nv, 1.761992, 1e-6, "Streckfaktor bei m = 1,2");
nah(Math.hypot(...app(scherung(2), v)), 4.272002, 1e-6, "‖Mv‖₂ bei m = 2");
for (const m of [-2, -1, 0.5, 1.2, 2]) nah(det(scherung(m)), 1, 1e-15, `det M = 1 bei m = ${m}`);

/* ------------------------------- F8: m = −4/3 liegt nicht auf dem Reglerraster */

for (let i = -40; i <= 40; i++) {
  assert.notEqual(i / 20, -4 / 3, "−4/3 darf kein Reglerrastwert sein (Schritt 0,05)");
}
assert.ok(/onClick=\{\(\) => setMult\(-4 \/ 3\)\}/.test(src), "Preset-Knopf für m = −4/3 fehlt");
assert.ok(/const identitaet = modus === "scherung" && mult === 0;/.test(src), "eigener Zweig für m = 0 fehlt");

console.log("REV29 07-kq S73Normerhaltung: alle Zahlen bestätigt");
