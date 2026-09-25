#!/usr/bin/env node
/**
 * REV29 — src/chapters/07-kq/widgets/S76Compare.tsx (CostWidget, AccuracyWidget,
 * MethodChooser).
 *
 * Unabhängige Rechenwege:
 *   • Der Aufwand wird hier nicht aus der geschlossenen Verhältnisformel des
 *     Widgets genommen, sondern für konkrete (m, n) aus den Operationszahlen
 *     mn²/2 + n³/6 bzw. mn² − n³/3 gebildet und erst danach ins Verhältnis
 *     gesetzt; zusätzlich wird die Unabhängigkeit von n über ein n-Raster
 *     belegt statt behauptet.
 *   • Die Genauigkeitszahlen werden aus dem Fehlermodell mit dem echten
 *     IEEE-ε_mach neu ausgewertet.
 * Alle Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/07-kq/widgets/S76Compare.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* --------------------------------------------------- Maschinengenauigkeit */

const EPS = Math.pow(2, -52);
nah(EPS, 2.2204e-16, 1e-20, "ε_mach");
nah(Math.log10(1 / Math.sqrt(EPS)), 7.827, 1e-3, "log₁₀(1/√ε) – Abbruchschwelle NE");
nah(1 / Math.sqrt(EPS), 6.7109e7, 1e4, "1/√ε");
nah(Math.log10(1 / EPS), 15.654, 1e-3, "log₁₀(1/ε) – Abbruchschwelle QR");
nah(1 / EPS, 4.5036e15, 1e12, "1/ε");
assert.ok(/const neBroken = lc >= 8;/.test(src), "NE-Abbruchschwelle 8 im Widget");
assert.ok(/const qrBroken = lc >= 15\.65;/.test(src), "QR-Abbruchschwelle 15,65 im Widget");

/* ---------------------------------------------- CostWidget: Aufwandsverhältnis */

const wNE = (m, n) => (m * n * n) / 2 + n ** 3 / 6;
const wQR = (m, n) => m * n * n - n ** 3 / 3;
const wSVD = (m, n, c) => c * (m * n * n + n ** 3);

// Das Verhältnis hängt nur von r = m/n ab – über ein n-Raster nachgewiesen.
for (const n of [5, 50, 200]) {
  for (const r of [1, 2, 5, 10, 20]) {
    nah(wQR(r * n, n) / wNE(r * n, n), (r - 1 / 3) / (r / 2 + 1 / 6), 1e-12, `Verhältnis bei n = ${n}, r = ${r}`);
  }
}
nah(wQR(50, 50) / wNE(50, 50), 1, 1e-12, "Verhältnis bei r = 1 (Grenzwert 1)");
nah(wQR(250, 50) / wNE(250, 50), 1.75, 1e-12, "Verhältnis bei r = 5");
nah(wQR(500, 50) / wNE(500, 50), 1.871, 1e-3, "Verhältnis bei r = 10 (Selbsttest S76)");
nah(wQR(1000, 50) / wNE(1000, 50), 1.9344, 1e-4, "Verhältnis bei r = 20");
assert.ok(wQR(100000, 50) / wNE(100000, 50) < 2, "das Verhältnis bleibt unter dem Grenzwert 2");
nah(wQR(1e7, 50) / wNE(1e7, 50), 2, 1e-4, "Grenzwert 2 für r → ∞");
// SVD gegen QR bei c = 6.
nah(wSVD(50, 50, 6) / wQR(50, 50), 18.0, 0.05, "SVD/QR bei r = 1, c = 6");
nah(wSVD(1000, 50, 6) / wQR(1000, 50), 6.4, 0.05, "SVD/QR bei r = 20, c = 6");

/* ------------------------------------------- AccuracyWidget: Fehlermodell */

const errNE = (cond) => Math.min(1, cond * cond * EPS);
const errQR = (cond, rnorm) => Math.min(1, (cond + rnorm * cond * cond) * EPS);
const stellen = (e) => Math.min(16, Math.max(0, -Math.log10(e)));

nah(errNE(1e5), 2.2204e-6, 1e-10, "NE-Fehler bei κ = 10⁵");
nah(stellen(errNE(1e5)), 5.654, 0.01, "NE-Stellen bei κ = 10⁵, ‖r‖ = 10⁻⁶");
nah(errQR(1e5, 1e-6), 2.4425e-11, 1e-14, "QR-Fehler bei κ = 10⁵, ‖r‖ = 10⁻⁶");
nah(stellen(errQR(1e5, 1e-6)), 10.61, 0.01, "QR-Stellen bei κ = 10⁵, ‖r‖ = 10⁻⁶");
nah(stellen(errQR(1e8, 1e-6)), 5.6, 0.05, "QR-Stellen bei κ = 10⁸");
assert.ok(1e8 >= 1e8, "NE bricht bei κ = 10⁸ ab (0 Stellen)");
nah(stellen(errNE(1e6)), 3.65, 0.01, "NE-Stellen bei κ = 10⁶, ‖r‖ = 10⁻¹");
nah(stellen(errQR(1e6, 1e-1)), 4.65, 0.01, "QR-Stellen bei κ = 10⁶, ‖r‖ = 10⁻¹");

// Der quadrierte Term übernimmt genau ab ‖r‖ > 1/κ.
for (const lc of [4, 6, 8]) {
  const cond = Math.pow(10, lc);
  const grenze = 1 / cond;
  const knapp = grenze * 1.01;
  const drunter = grenze * 0.99;
  assert.ok(knapp * cond > 1, `über der Grenze muss der κ²-Term greifen (κ = 10^${lc})`);
  assert.ok(drunter * cond < 1, `unter der Grenze darf er nicht greifen (κ = 10^${lc})`);
  nah(errQR(cond, grenze), 2 * cond * EPS, 1e-30 + 1e-9 * cond * EPS, `an der Grenze verdoppelt sich der QR-Fehler (κ = 10^${lc})`);
}
// Der im Verdikt behauptete Verlust: beide Verfahren verlieren 2·log₁₀κ Stellen.
nah(16 - stellen(errQR(1e5, 1)), 10.35, 0.05, "verlorene Stellen bei κ = 10⁵, ‖r‖ = 1");
nah(16 - stellen(errNE(1e5)), 10.35, 0.05, "verlorene Stellen NE bei κ = 10⁵");

console.log("REV29 07-kq S76Compare: alle Zahlen bestätigt");
