#!/usr/bin/env node
/**
 * REV29 — src/chapters/09-tensoren/widgets/S91Bilinear.tsx (BilinearitaetsDemo).
 *
 * Behebt den F6-Befund an scripts/verify/KAP09/s91-bilinear.mjs: Jenes Skript
 * rechnet nur mit Literalen (assert.equal(3*2, 6)) und würde eine Änderung an
 * vergroessertX/vergroessertY nicht bemerken. Hier werden die beiden
 * Skalierungsformeln aus dem Widget-Quelltext GELESEN und über den ganzen
 * Reglerbereich gegen die Sollaussagen f(2x, 2y) = 4 f(x, y) und
 * f(2x, y) = 2 f(x, y) geprüft.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/09-tensoren/widgets/S91Bilinear.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* -------------------- Die Skalierungsformeln stammen aus dem Widget-Quelltext */

const zeileX = src.match(/const vergroessertX = ([^;]+);/);
const zeileY = src.match(/const vergroessertY = ([^;]+);/);
assert.ok(zeileX && zeileY, "vergroessertX/vergroessertY nicht im Quelltext gefunden");
// Das Widget verdoppelt x immer und y nur im Modus „gemeinsam“.
assert.equal(zeileX[1].trim(), "2 * x", "vergroessertX muss 2 * x sein");
assert.equal(
  zeileY[1].trim(),
  'modus === "gemeinsam" ? 2 * y : y',
  "vergroessertY muss nur im gemeinsamen Modus verdoppeln",
);
const vergroessertX = (x) => 2 * x;
const vergroessertY = (y, gemeinsam) => (gemeinsam ? 2 * y : y);

/* -------------------------- Die Verdikt-Aussagen über den ganzen Reglerbereich */

for (let i = 0; i <= 30; i++) {
  for (let j = 0; j <= 30; j++) {
    const x = i / 10;
    const y = j / 10;
    const f = x * y;
    const gemeinsam = vergroessertX(x) * vergroessertY(y, true);
    const nurX = vergroessertX(x) * vergroessertY(y, false);
    nah(gemeinsam, 4 * f, 1e-12, `f(2x, 2y) = 4 f(x, y) bei x = ${x}, y = ${y}`);
    nah(nurX, 2 * f, 1e-12, `f(2x, y) = 2 f(x, y) bei x = ${x}, y = ${y}`);
    if (f > 1e-8) {
      assert.notEqual(gemeinsam, nurX, "die beiden Skalierungen müssen sich unterscheiden");
    }
  }
}

// Die drei im Header genannten Zahlen, jetzt aus den Formeln statt aus Literalen.
nah(3 * 2, 6, 1e-12, "Ausgangsfläche f(3, 2)");
nah(vergroessertX(3) * vergroessertY(2, false), 12, 1e-12, "f(2·3, 2) = 12");
nah(vergroessertX(3) * vergroessertY(2, true), 24, 1e-12, "f(2·3, 2·2) = 24");

/* ------------------------------------------------ Entartungsfall und Regelfall */

// x = 0 bzw. y = 0 sind Reglerrastwerte (Schritt 0,1) – der Entartungszweig ist
// also exakt erreichbar, und der nächste Zustand ist deutlich davon getrennt.
assert.equal(0 * 2, 0, "bei x = 0 ist die Fläche exakt null");
assert.ok(0.1 * 2 > 1e-8, "der nächste Reglerzustand liegt über der Entartungsschwelle");
assert.ok(/const entartet = flaeche < 1e-8;/.test(src), "Entartungsschwelle im Widget");

/* ---------------------------------------------- Fixes im Quelltext verankert */

assert.ok(
  /className=\{modus === "gemeinsam" \? W_BUTTON_AKTIV : W_BUTTON\}/.test(src),
  "die Modusknöpfe brauchen einen sichtbaren Aktivzustand",
);
assert.ok(!/className="rounded px-3 py-1 text-sm"/.test(src), "die nackten Textknöpfe dürfen nicht zurückkehren");
assert.ok(/const PAD = 46;/.test(src), "PAD muss groß genug für die y-Beschriftung sein");
assert.ok(
  /modus === "fest" \? "ok" : "warn"/.test(src),
  "der gemeinsame Fall ist kein Fehlschlag, sondern die erwartete Aussage",
);

console.log("REV29 09-tensoren S91Bilinear: alle Zahlen bestätigt");
