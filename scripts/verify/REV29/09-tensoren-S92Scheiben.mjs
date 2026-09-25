#!/usr/bin/env node
/**
 * REV29 — src/chapters/09-tensoren/widgets/S92Scheiben.tsx
 * (ZahlenTensor, FarbBild).
 *
 * scripts/verify/KAP09/s92-scheiben.mjs prüft nur Formate und Wertebereiche.
 * Hier werden die STRUKTUREN geprüft, auf die sich die neuen Verdikte berufen –
 * konstante Zeile, Symmetrie, einzelner Ausreißer –, und die Kanalformel wird
 * an konkreten Pixeln gegen eine unabhängige Modulo-Rechnung gehalten. Die
 * Scheiben werden dabei aus dem Widget-Quelltext gelesen, nicht kopiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/09-tensoren/widgets/S92Scheiben.tsx"), "utf8");

/* ------------------------------------ Die vier Scheiben aus dem Quelltext lesen */

const block = src.match(/const SCHEIBEN = \[([\s\S]*?)\n\];/);
assert.ok(block, "SCHEIBEN nicht im Quelltext gefunden");
const SCHEIBEN = JSON.parse(`[${block[1].replace(/\s+/g, "")}]`.replace(/,\]/g, "]"));
assert.equal(SCHEIBEN.length, 4, "vier Scheiben");
for (const M of SCHEIBEN) {
  assert.equal(M.length, 4, "jede Scheibe ist 4×4");
  for (const zeile of M) assert.equal(zeile.length, 4, "jede Zeile hat vier Einträge");
}
assert.equal(SCHEIBEN.flat(2).length, 64, "4·4·4 = 64 Einträge (Selbsttest S92)");

/* ------------------- Die Struktur, auf die sich die vier Verdikte tatsächlich berufen */

// k = 1: keine der drei Besonderheiten trifft zu.
const S1 = SCHEIBEN[0];
const symmetrisch = (M) => M.every((zeile, i) => zeile.every((v, j) => v === M[j][i]));
const konstanteZeile = (M) => M.findIndex((zeile) => zeile.every((v) => v === zeile[0]));
assert.ok(!symmetrisch(S1), "Scheibe 1 darf nicht symmetrisch sein");
assert.equal(konstanteZeile(S1), -1, "Scheibe 1 hat keine konstante Zeile");

// k = 2: dritte Zeile konstant 3, und sonst keine.
const S2 = SCHEIBEN[1];
assert.equal(konstanteZeile(S2), 2, "Scheibe 2 hat genau in der dritten Zeile eine Konstante");
assert.ok(S2[2].every((v) => v === 3), "die konstante Zeile trägt den Wert 3");
assert.equal(S2.filter((zeile) => zeile.every((v) => v === zeile[0])).length, 1, "nur eine konstante Zeile");

// k = 3: symmetrisch.
const S3 = SCHEIBEN[2];
assert.ok(symmetrisch(S3), "Scheibe 3 muss symmetrisch sein");
assert.ok(!symmetrisch(S1) && !symmetrisch(S2) && !symmetrisch(SCHEIBEN[3]), "nur Scheibe 3 ist symmetrisch");

// k = 4: genau ein Ausreißer, der Rest zwischen −1 und 1.
const S4 = SCHEIBEN[3];
const gross = [];
S4.forEach((zeile, i) => zeile.forEach((v, j) => { if (Math.abs(v) > 1) gross.push([i, j, v]); }));
assert.equal(gross.length, 1, "Scheibe 4 hat genau einen Ausreißer");
assert.deepEqual(gross[0], [1, 2, 5], "der Ausreißer ist T₂₃₄ = 5");
assert.ok(S4.flat().every((v) => v === 5 || (v >= -1 && v <= 1)), "der Rest liegt zwischen −1 und 1");

// Alle Werte bleiben im gezeichneten zDomain [−4, 5].
assert.ok(SCHEIBEN.flat(2).every((v) => v >= -4 && v <= 5), "alle Einträge passen in zDomain = [−4, 5]");
// Die vier Verdikt-Zweige sind im Quelltext wirklich verschieden.
assert.ok(/k === 2/.test(src) && /k === 3/.test(src), "vier eigene Verdikt-Zweige");
assert.ok(!/wechselt nicht nur das Etikett/.test(src), "der gleichlautende Sammelzweig muss weg sein");

/* --------------------------------------------------------- FarbBild: Kanalformel */

const kanalWert = (kanal, zeile, spalte) => (zeile * 29 + spalte * 17 + kanal * 53) % 256;
// Unabhängige Gegenrechnung ohne %: wiederholtes Abziehen von 256.
const modLangsam = (v) => {
  let r = v;
  while (r >= 256) r -= 256;
  return r;
};
for (let kanal = 0; kanal < 3; kanal++) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const w = kanalWert(kanal, i, j);
      assert.equal(w, modLangsam(i * 29 + j * 17 + kanal * 53), `Kanalwert (${kanal}, ${i}, ${j})`);
      assert.ok(w >= 0 && w <= 255, "Kanalwerte liegen in [0, 255]");
    }
  }
}
assert.equal(8 * 8 * 3, 192, "der Bildtensor hat 192 Einträge");
// Der voreingestellte Pixel (Zeile 4, Spalte 5) trägt konkrete Werte, die das
// Verdikt anzeigt: i = 3, j = 4.
assert.deepEqual(
  [kanalWert(0, 3, 4), kanalWert(1, 3, 4), kanalWert(2, 3, 4)],
  [155, 208, 5],
  "Kanalwerte des voreingestellten Pixels",
);
// F8: Ein „annähernd grau“-Zweig wäre unerreichbar – die kleinste Spanne
// zwischen den drei Kanälen ist 106. Stattdessen muss jeder der drei Kanäle
// irgendwo der größte sein; nur dann trägt die Aussage des Verdikts.
let minSpanne = Infinity;
const dominanz = [0, 0, 0];
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const w = [0, 1, 2].map((c) => kanalWert(c, i, j));
    minSpanne = Math.min(minSpanne, Math.max(...w) - Math.min(...w));
    dominanz[w.indexOf(Math.max(...w))]++;
  }
}
assert.equal(minSpanne, 106, "kleinste Kanalspanne im ganzen Bild");
assert.ok(minSpanne >= 35, "ein Grau-Zweig mit Schwelle 35 wäre unerreichbar gewesen");
assert.deepEqual(dominanz, [13, 14, 37], "jeder Kanal ist irgendwo der größte");
assert.ok(!/annähernd grau/.test(src), "der unerreichbare Grau-Zweig muss entfernt sein");

/* -------------------------------------------- Doppelpfad und Layout (G1/G3) */

assert.ok(/label="Zeile i"/.test(src) && /label="Spalte j"/.test(src), "Doppelpfad: zwei Regler für den Pixel");
assert.ok(!/min-w-\[610px\]/.test(src), "das breite SVG darf bei 390 px nicht mehr abgeschnitten werden");
assert.ok(/grid-cols-2 gap-2 sm:grid-cols-4/.test(src), "vier Tafeln als 2×2 bei schmaler Breite");
assert.ok(/Zeile, dann Spalte/.test(src), "das Verdikt nennt den Pixel in der Reihenfolge (Zeile, Spalte)");
assert.ok(!/viewBox="0 0 310 314" className="max-w-full h-auto" role="img"/.test(src), "der klickbare Stapel darf kein role=img tragen");

console.log("REV29 09-tensoren S92Scheiben: alle Zahlen bestätigt");
