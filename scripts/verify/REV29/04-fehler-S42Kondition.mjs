#!/usr/bin/env node
/**
 * REV29 — src/chapters/04-fehler/widgets/S42Kondition.tsx
 * (KehrwertWidget und SummenKonditionWidget).
 *
 * Ergänzt scripts/verify/R2/check-s42-claims.mjs um die dort fehlenden Fälle:
 * den vierten beworbenen Preset „schlecht gestellt" (F8), den Ursprung (in dem
 * κ_rel nach Definition 4.2.2 gar nicht erklärt ist) und die Kehrwert-Zahlen
 * des Headers.
 *
 * Unabhängiger Rechenweg: die Verstärkung wird hier als Quotient der beiden
 * numerisch gebildeten Fehlerquotienten gerechnet (relOut/relIn über 1/x und
 * 1/x̃), nicht über die geschlossene Form x/|x + ε| des Widgets.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/04-fehler/widgets/S42Kondition.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* -------------------------------------------------------------- Kehrwert 1/x */

/** relativer Output- durch relativen Inputfehler, rein numerisch. */
function verstaerkung(x, eps) {
  const fx = 1 / x;
  const fxt = 1 / (x + eps);
  return Math.abs(fxt - fx) / fx / (Math.abs(eps) / x);
}

nah(0.6 - 0.45, 0.15, 1e-12, "x̃ der Voreinstellung");
nah(Math.abs(-0.45) / 0.6, 0.75, 1e-12, "relativer Inputfehler der Voreinstellung");
nah(Math.abs(1 / 0.15 - 1 / 0.6) / (1 / 0.6), 3, 1e-12, "relativer Outputfehler der Voreinstellung");
nah(verstaerkung(0.6, -0.45), 4, 1e-12, "Verstärkung der Voreinstellung");
for (const [eps, soll] of [[-0.3, 2], [-0.48, 5], [-0.54, 10]]) {
  nah(verstaerkung(0.6, eps), soll, 1e-9, `Verstärkung bei ε = ${eps}`);
}
// Gegenprobe zur geschlossenen Form des Widgets.
nah(verstaerkung(0.6, -0.54), 0.6 / Math.abs(0.6 - 0.54), 1e-9, "Verstärkung = x/|x+ε|");
// Die Verstärkung hängt nur von ε/x ab (die Fußnote unter dem Widget).
nah(verstaerkung(2.4, -2.16), verstaerkung(0.6, -0.54), 1e-9, "nur ε/x zählt");

// Polstelle: auf dem Reglerraster (x: 0,01; ε: 0,005) ist x̃ = 0 exakt erreichbar.
const raster = (x, eps) => Math.round(x * 1000) + Math.round(eps * 1000);
assert.equal(raster(0.55, -0.55), 0, "x̃ = 0 ist auf dem Raster nicht exakt erreichbar");
assert.ok(raster(0.6, -0.45) > 0 && raster(0.5, -0.55) < 0, "die drei Zustände trennen nicht");
assert.ok(/const aufPolstelle = xtRaster === 0/.test(src), "der exakte Polstellen-Zweig fehlt");
assert.ok(!/const valid = xt > 0\.001/.test(src), "die 0,001-Toleranz ist zurück");

/* ------------------------------------------------------ Summe f(x) = x₁ + x₂ */

const kappaSumme = (x1, x2) => (Math.SQRT2 * Math.hypot(x1, x2)) / Math.abs(x1 + x2);

nah(Math.SQRT2, 1.41421, 5e-6, "κ_abs = √2");
nah(Math.hypot(1.2, -0.85), 1.47054, 5e-6, `‖x‖₂ des Presets „mäßig"`);
nah(1.2 - 0.85, 0.35, 1e-12, `Summe des Presets „mäßig"`);
nah(kappaSumme(1.2, -0.85), 5.9419, 5e-4, "κ_rel(1,2; −0,85)");
nah(kappaSumme(1.4, 1.4), 1, 1e-12, "κ_rel(1,4; 1,4)");
nah(kappaSumme(1.5, -1.45), 59.008, 5e-3, "κ_rel(1,5; −1,45)");
nah(Math.ceil(Math.log10(kappaSumme(1.5, -1.45))), 2, 0, "verlorene Stellen bei (1,5; −1,45)");

// F8: der vierte beworbene Preset „schlecht gestellt" — bisher nirgends geprüft.
assert.ok(
  !Number.isFinite(kappaSumme(1.5, -1.5)),
  "κ_rel(1,5; −1,5) ist entgegen dem Preset endlich",
);
// Und er ist über die Regler wirklich erreichbar (0,01-Raster).
assert.equal(Math.round(1.5 * 100) + Math.round(-1.5 * 100), 0, "die Antidiagonale ist unerreichbar");

// Der Ursprung ist KEIN Punkt der Antidiagonalen im gemeinten Sinn: dort ist
// κ_rel gar nicht erklärt (‖x‖ = 0 und ‖f(x)‖ = 0).
assert.ok(/const imUrsprung = p1 === 0 && p2 === 0/.test(src), "der Ursprungs-Zweig fehlt");
assert.ok(
  /imUrsprung\s*\?\s*NaN/.test(src),
  `im Ursprung wird weiterhin ∞ statt „nicht erklärt" ausgewiesen`,
);
assert.ok(!/Math\.abs\(summe\) < 1e-12/.test(src), "die 1e-12-Toleranz ist zurück");

// Die Karte ist entlang jedes Strahls einfarbig (Behauptung des Verdikts).
for (const [x1, x2] of [[1.2, -0.85], [0.3, 0.7], [1.5, -1.45]]) {
  for (const s of [0.25, 2, 7.5]) {
    nah(kappaSumme(s * x1, s * x2), kappaSumme(x1, x2), 1e-9, "κ_rel hängt nur von der Richtung ab");
  }
}

console.log("REV29 04-fehler-S42Kondition: ok");
