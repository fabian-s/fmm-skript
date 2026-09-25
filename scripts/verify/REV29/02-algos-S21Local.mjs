#!/usr/bin/env node
/**
 * REV29 — src/chapters/02-algos/widgets/S21Local.tsx (RSelbsttest).
 *
 * Das Widget behauptet vier R-Ausgaben. Drei davon sind reine
 * IEEE-Doppelpräzision und in JS identisch reproduzierbar; die vierte ist
 * R-spezifisch (R summiert mit einem Korrekturschritt), dort prüfen wir die
 * behauptete Größenordnung 2^18 gegen den Maschinenzahlabstand bei 10^21.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/02-algos/widgets/S21Local.tsx"), "utf8");

/** Die im Widget angezeigten Ausgaben, direkt aus der Quelle gelesen. */
const ausgaben = [...src.matchAll(/ausgabe: "([^"]+)"/g)].map((m) => m[1]);
assert.equal(ausgaben.length, 4, "vier R-Ausdrücke erwartet");
assert.deepEqual(ausgaben, ["0", "-2.775558e-17", "FALSE", "-262144"]);

/* ------------------------------------------- 1) 1.0 - 1.0 ist exakt null */

assert.equal(1.0 - 1.0, 0);
assert.ok(Object.is(1.0 - 1.0, 0), "Vorzeichen der Null");

/* ------------------------------- 2) 1.0 - 0.9 - 0.1 = -2,775558e-17 */

const zwei = 1.0 - 0.9 - 0.1;
assert.notEqual(zwei, 0, "der Ausdruck wäre in exakter Arithmetik null");
assert.equal(zwei.toExponential(6), "-2.775558e-17");
// Größenordnung der Maschinengenauigkeit: |zwei| ist ein kleines Vielfaches von 2^-52.
assert.ok(Math.abs(zwei) < 1e-15 && Math.abs(zwei) > 1e-17);
assert.equal(Math.abs(zwei) / 2 ** -52, 0.125, "das Ergebnis ist 2^-55");

/* ---------------------------------------- 3) 100 * 0.58 == 58 ist FALSE */

assert.notEqual(100 * 0.58, 58);
assert.equal((100 * 0.58).toFixed(18), "57.999999999999992895");

/* -------------------- 4) sum(x) - sum(rev(x)) für x = seq(1, 2e16, len = 1e5) */

const n = 1e5;
const x = Array.from({ length: n }, (_, i) => 1 + (i * (2e16 - 1)) / (n - 1));
const vorwaerts = x.reduce((s, v) => s + v, 0);
const rueckwaerts = [...x].reverse().reduce((s, v) => s + v, 0);
// Diese naive Schleife liefert in JS 0 — genau das, was der Header offen sagt:
// R zählt hier anders (die Summation läuft mit einem Korrekturschritt).
assert.equal(vorwaerts - rueckwaerts, 0, "naive JS-Summation ist hier symmetrisch");
// Nachgewiesen wird deshalb die Größenordnung des R-Ergebnisses: bei
// Zwischensummen um 10^21 ist der Maschinenzahlabstand 131072 = 2^17, das
// R-Ergebnis −262144 = −2^18 also genau zwei solche Schritte.
const ulp = (v) => 2 ** (Math.floor(Math.log2(Math.abs(v))) - 52);
assert.ok(vorwaerts > 9e20 && vorwaerts < 1.1e21, `Zwischensumme ${vorwaerts}`);
const abstand = ulp(vorwaerts);
assert.equal(abstand, 2 ** 17, `ULP bei 10^21 ist ${abstand}, erwartet 2^17 = 131072`);
assert.equal(2 ** 17, 131072);
assert.equal(2 ** 18, 262144);
assert.equal(Math.abs(-262144) / abstand, 2, "R-Ergebnis ist nicht zwei ULP groß");
// Und der Abstand ist wirklich der Sprung zur nächsten Maschinenzahl:
assert.equal(vorwaerts + abstand / 4, vorwaerts, "ein Viertel-ULP verschwindet");
assert.notEqual(vorwaerts + abstand, vorwaerts);

console.log("REV29 02-algos-S21Local: ok");
