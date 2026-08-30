#!/usr/bin/env node
/**
 * REV29 — src/chapters/07-kq/widgets/S71Local.tsx
 * (RegressionWidget, ProjektionWidget).
 *
 * Prüft die im Header, in den Verdikten und in der Schätzfrage behaupteten
 * Zahlen sowie die Drei-Zustands-Logik des Projektionsverdikts.
 *
 * Unabhängiger Rechenweg: Das Widget benutzt die geschlossene Formel der
 * einfachen linearen Regression. Hier werden stattdessen die
 * Normalengleichungen als 2×2-System aufgestellt und mit Gauss-Elimination
 * (Spaltenpivot) gelöst; das Optimum wird zusätzlich durch einen Rasterlauf
 * über 350 × 161 Reglerstellungen bestätigt. Die Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/07-kq/widgets/S71Local.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ------------------------------------------------ Daten aus dem Widget-Quelltext */

/** Liest ein Zahlenarray `const NAME = [...]` aus der TSX-Datei. */
function zahlenArray(name) {
  const treffer = src.match(new RegExp(`const ${name} = \\[([^\\]]*)\\]`));
  assert.ok(treffer, `${name} nicht im Quelltext gefunden`);
  return treffer[1].split(",").map((s) => Number(s.trim()));
}

const X = zahlenArray("REG_X");
const Y = zahlenArray("REG_Y");
assert.equal(X.length, 12, "REG_X muss zwölf Punkte haben");
assert.equal(Y.length, 12, "REG_Y muss zwölf Punkte haben");

/* --------------------------------------- KQ-Lösung über die Normalengleichungen */

/** AᵀA β = Aᵀy für A = (1 | x), gelöst mit Gauss-Elimination und Spaltenpivot. */
function kqUeberNormalengleichungen(x, y) {
  const n = x.length;
  let s11 = n, s12 = 0, s22 = 0, r1 = 0, r2 = 0;
  for (let i = 0; i < n; i++) {
    s12 += x[i];
    s22 += x[i] * x[i];
    r1 += y[i];
    r2 += x[i] * y[i];
  }
  const M = [[s11, s12, r1], [s12, s22, r2]];
  if (Math.abs(M[1][0]) > Math.abs(M[0][0])) [M[0], M[1]] = [M[1], M[0]];
  const f = M[1][0] / M[0][0];
  for (let j = 0; j < 3; j++) M[1][j] -= f * M[0][j];
  const b1 = M[1][2] / M[1][1];
  const b0 = (M[0][2] - M[0][1] * b1) / M[0][0];
  return [b0, b1];
}

const ssr = (b0, b1) => X.reduce((s, xi, i) => s + (Y[i] - b0 - b1 * xi) ** 2, 0);

const [b0, b1] = kqUeberNormalengleichungen(X, Y);
nah(b0, 36.686075, 1e-5, "β̂₀");
nah(b1, 4.415469, 1e-5, "β̂₁");
nah(ssr(b0, b1), 714.1240, 1e-3, "SSR(β̂)");

// Orthogonalität des optimalen Residuums (Normalengleichungen, beide Zeilen).
const sumR = X.reduce((s, xi, i) => s + (Y[i] - b0 - b1 * xi), 0);
const sumXR = X.reduce((s, xi, i) => s + xi * (Y[i] - b0 - b1 * xi), 0);
nah(sumR, 0, 1e-9, "Σ rᵢ");
nah(sumXR, 0, 1e-7, "Σ xᵢ rᵢ");

// Startzustand des Widgets: sichtbare Residuen, rund 18-faches Optimum.
nah(ssr(120, 3.6), 12814.16, 1e-2, "SSR im Startzustand (120; 3,6)");
nah(ssr(120, 3.6) / ssr(b0, b1), 17.9439, 1e-3, "Aufschlagfaktor im Startzustand");

// Griffhöhen der KQ-Geraden an den beiden Ziehstellen x = 40 und x = 110.
nah(b0 + b1 * 40, 213.3048, 1e-3, "Griffhöhe bei x = 40");
nah(b0 + b1 * 110, 522.3876, 1e-3, "Griffhöhe bei x = 110");

/* ---------------------- F8: der Zweig »Das ist die KQ-Gerade«  ist erreichbar */

// Rasterlauf über die Reglerstellungen (β₀ ganzzahlig, β₁ in Schritten 0,05).
let best = Infinity;
let bestPaar = null;
for (let i = -100; i <= 250; i++) {
  for (let k = 0; k <= 160; k++) {
    const q = ssr(i, k * 0.05);
    if (q < best) {
      best = q;
      bestPaar = [i, k * 0.05];
    }
  }
}
assert.deepEqual(bestPaar, [38, 4.4], "bestes über die Regler erreichbares Paar");
nah(best, 716.56, 1e-2, "SSR am besten Rasterpunkt");
const ueberschuss = best / ssr(b0, b1) - 1;
nah(ueberschuss, 0.003411, 1e-5, "Aufschlag am besten Rasterpunkt");
assert.ok(
  ueberschuss <= 0.005,
  `Der Zweig »Das ist die KQ-Gerade« (Schwelle 0,5 %) muss über die Regler erreichbar sein, ist es aber nur mit ${ueberschuss}`,
);

/* ------------------------------------------------- Projektionswidget: a, b, x* */

const a = [3, 1];
const b = [1, 2];
const restNorm2 = (x) => (b[0] - a[0] * x) ** 2 + (b[1] - a[1] * x) ** 2;
const atr = (x) => a[0] * (b[0] - a[0] * x) + a[1] * (b[1] - a[1] * x);
const winkel = (x) => {
  const r = [b[0] - a[0] * x, b[1] - a[1] * x];
  const c = atr(x) / (Math.hypot(a[0], a[1]) * Math.hypot(r[0], r[1]));
  return (Math.acos(Math.min(1, Math.max(-1, c))) * 180) / Math.PI;
};

// Minimum durch Rasterlauf über genau die Reglerrastwerte (Schritt 0,01).
let xStern = 0;
let minWert = Infinity;
for (let i = 0; i <= 120; i++) {
  const x = i / 100;
  if (restNorm2(x) < minWert) {
    minWert = restNorm2(x);
    xStern = x;
  }
}
nah(xStern, 0.5, 1e-12, "Minimierer x* (Rasterlauf über die Reglerwerte)");
nah(minWert, 2.5, 1e-12, "‖r‖²(x*)");
nah(atr(0.5), 0, 1e-15, "aᵀr bei x = 1/2");
nah(winkel(0.5), 90, 1e-9, "Winkel(a, r) bei x = 1/2");
nah(restNorm2(0.1), 4.1, 1e-12, "‖r‖² im Startzustand x = 0,1");
nah(winkel(0.1), 51.3402, 1e-3, "Winkel im Startzustand");

// Das Nahband des Verdikts: |x − 1/2| ≤ 0,05 entspricht 84,29°…95,71°.
nah(winkel(0.45), 84.2894, 1e-3, "Winkel am unteren Rand des Nahbands");
nah(winkel(0.55), 95.7106, 1e-3, "Winkel am oberen Rand des Nahbands");

/* ---------------------------------- Drei-Zustands-Regel im Quelltext verankert */

assert.ok(/const X_STERN = 0\.5;/.test(src), "X_STERN = 0.5 fehlt im Widget");
assert.ok(/const NAH = 0\.05;/.test(src), "NAH = 0.05 fehlt im Widget");
assert.ok(/const exakt = x === X_STERN;/.test(src), "exakter Zweig fehlt im Widget");
assert.ok(/const perp = nahe;/.test(src), "Marker und Verdikt müssen dieselbe Schwelle teilen");
// Der Rand des Nahbands muss trotz Gleitkomma-Raster wirklich dazugehören.
assert.ok(Math.abs(0.45 - 0.5) <= 0.05 + 1e-9, "x = 0,45 liegt im Nahband");
assert.ok(!(Math.abs(0.44 - 0.5) <= 0.05 + 1e-9), "x = 0,44 liegt außerhalb");
assert.ok(
  !/Math\.abs\(angDeg - 90\) < 2/.test(src),
  "der alte, vom Verdikt abweichende Marker-Schwellwert darf nicht zurückkehren",
);

console.log("REV29 07-kq S71Local: alle Zahlen bestätigt");
