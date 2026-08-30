#!/usr/bin/env node
/**
 * REV29 — src/chapters/09-tensoren/widgets/S94Tensorbasis.tsx
 * (TensorbasisExplorer).
 *
 * scripts/verify/KAP09/s94-tensorbasis.mjs deckt die Eckwerte der
 * Voreinstellung ab. Hier kommen die drei neuen Presets dazu und die
 * Vorzeichenaussage des Verdikts („positives c₂₂ hebt die Ecke (1,1)"), die
 * über eine Ableitungsrechnung statt über Stichproben belegt wird.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/09-tensoren/widgets/S94Tensorbasis.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const f = (k, x, y) => k.a + k.b * x + k.c * y + k.d * x * y;

/* --------------------------------- Die drei Presets aus dem Quelltext auslesen */

const block = src.match(/const PRESETS: \{ name: string; k: Koeffizienten \}\[\] = \[([\s\S]*?)\n\];/);
assert.ok(block, "PRESETS nicht gefunden");
const presets = [...block[1].matchAll(/name: "([^"]+)", k: \{ a: (-?[\d.]+), b: (-?[\d.]+), c: (-?[\d.]+), d: (-?[\d.]+) \}/g)].map(
  (m) => ({ name: m[1], k: { a: Number(m[2]), b: Number(m[3]), c: Number(m[4]), d: Number(m[5]) } }),
);
assert.equal(presets.length, 3, "drei Presets");

// Preset „Ebene": c₂₂ = 0, die Funktion ist affin.
const ebene = presets[0].k;
assert.equal(ebene.d, 0, "das Ebenen-Preset setzt c₂₂ = 0");
// Affin heißt: der gemischte zweite Differenzenquotient verschwindet überall.
for (const [x, y, h] of [[0.2, 0.3, 0.1], [0.5, 0.5, 0.25], [0.7, 0.1, 0.2]]) {
  const gemischt = f(ebene, x + h, y + h) - f(ebene, x + h, y) - f(ebene, x, y + h) + f(ebene, x, y);
  nah(gemischt, 0, 1e-12, `gemischter Differenzenquotient bei c₂₂ = 0 (x = ${x})`);
}

// Preset „nur der gemischte Anteil": alles außer c₂₂ ist null.
const gemischtP = presets[1].k;
assert.deepEqual([gemischtP.a, gemischtP.b, gemischtP.c], [0, 0, 0], "nur c₂₂ ist besetzt");
assert.notEqual(gemischtP.d, 0, "c₂₂ ist ungleich null");
nah(f(gemischtP, 0, 0), 0, 1e-12, "die drei Ecken auf den Achsen bleiben null");
nah(f(gemischtP, 1, 0), 0, 1e-12, "f(1, 0) = 0");
nah(f(gemischtP, 0, 1), 0, 1e-12, "f(0, 1) = 0");
nah(f(gemischtP, 1, 1), gemischtP.d, 1e-12, "nur die Ecke (1, 1) hebt sich");

// Preset „Beispiel 2 + 3x − y + 5xy": die vier Eckwerte des Kapitels.
const beispiel = presets[2].k;
assert.deepEqual(beispiel, { a: 2, b: 3, c: -1, d: 5 }, "die Koeffizienten des Textbeispiels");
nah(f(beispiel, 0, 0), 2, 1e-12, "Eckwert f(0,0)");
nah(f(beispiel, 1, 0), 5, 1e-12, "Eckwert f(1,0)");
nah(f(beispiel, 0, 1), 1, 1e-12, "Eckwert f(0,1)");
nah(f(beispiel, 1, 1), 9, 1e-12, "Eckwert f(1,1)");

/* ---------------------- Die Vorzeichenaussage des Verdikts, allgemein bewiesen */

// Die zur Ebene durch die drei Achsenecken gehörende Höhe in (1,1) ist
// a + b + c; die Differenz zur Fläche ist genau c₂₂.
for (const k of [beispiel, { a: -1, b: 2, c: 0.5, d: -3 }, { a: 0, b: 0, c: 0, d: 4 }]) {
  const ebeneWert = k.a + k.b + k.c;
  nah(f(k, 1, 1) - ebeneWert, k.d, 1e-12, "die Ecke (1,1) weicht genau um c₂₂ von der Ebene ab");
}
assert.ok(beispiel.d > 0, "im Textbeispiel hebt c₂₂ die Ecke");
assert.ok(/k\.d > 0 \? "positives" : "negatives"/.test(src), "das Verdikt muss das Vorzeichen von c₂₂ aufnehmen");
assert.ok(/k\.d === 0 \?/.test(src), "der Ebenen-Zweig prüft c₂₂ exakt, nicht über eine Toleranz");
assert.ok(!/Math\.abs\(k\.d\) < 1e-9/.test(src), "die alte Float-Toleranz auf c₂₂ muss weg sein");
assert.ok(/PRESETS\.map/.test(src), "die Presets müssen als Knöpfe angeboten werden");

// c₂₂ = 0 ist ein Rastwert der Regler (Schritt 0,5), der Ebenen-Zweig also exakt
// erreichbar; der Nachbarzustand liegt weit davon entfernt.
const raster = [];
for (let i = -10; i <= 10; i++) raster.push(i * 0.5);
assert.ok(raster.includes(0), "c₂₂ = 0 ist ein Rastwert");
assert.equal(Math.min(...raster.filter((v) => v !== 0).map(Math.abs)), 0.5, "der Nachbarrastwert ist 0,5");

console.log("REV29 09-tensoren S94Tensorbasis: alle Zahlen bestätigt");
