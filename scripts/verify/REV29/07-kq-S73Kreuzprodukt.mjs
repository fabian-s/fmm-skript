#!/usr/bin/env node
/**
 * REV29 — src/chapters/07-kq/widgets/S73KreuzproduktWidget.tsx.
 *
 * Unabhängiger Rechenweg: Die Kollapsschwelle steht im Widget als Konstante
 * 2^(−26,5). Hier wird sie NICHT von dort übernommen, sondern durch eine
 * Bisektion in k über die echte IEEE-Addition fl(1 + ε²) neu bestimmt; erst
 * danach wird sie mit dem hartkodierten Sollwert und mit der Konstante des
 * Widgets verglichen. Zusätzlich werden die Verdikt-Schwellen in ULP geprüft.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/07-kq/widgets/S73KreuzproduktWidget.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const ULP = Math.pow(2, -52);
/** Der gespeicherte kleine Eigenwert von fl(AᵀA): fl(1 + ε²) − 1. */
const gap = (k) => {
  const e = Math.pow(10, -k);
  return 1 + e * e - 1;
};

/* -------------------------------------- Bisektion: ab welchem k kollabiert es? */

let lo = 4;
let hi = 10;
assert.notEqual(gap(lo), 0, "bei k = 4 darf noch nichts kollabiert sein");
assert.equal(gap(hi), 0, "bei k = 10 muss der Kollaps eingetreten sein");
for (let i = 0; i < 200; i++) {
  const m = (lo + hi) / 2;
  if (gap(m) === 0) hi = m;
  else lo = m;
}
nah(hi, 7.977295, 1e-6, "Kollapsschwelle k aus der Bisektion");
nah(hi, -Math.log10(Math.pow(2, -26.5)), 1e-9, "Kollapsschwelle gegen 2^(−26,5)");
nah(Math.pow(10, -hi), 1.0537e-8, 1e-11, "Kollapsschwelle in ε");

// Die Konstante im Widget muss dieselbe Schwelle liefern.
assert.ok(/const COLLAPSE_EPS = Math\.pow\(2, -26\.5\);/.test(src), "COLLAPSE_EPS fehlt im Widget");

/* --------------------------------------------- Die drei Verdikt-Zustände in ULP */

assert.equal(gap(7) / ULP, 45, "bei k = 7 sind es 45 ULP, nicht eines");
assert.equal(gap(7.5) / ULP, 5, "bei k = 7,5 sind es 5 ULP");
assert.equal(gap(7.9) / ULP, 1, "bei k = 7,9 ist es genau ein ULP");
assert.equal(gap(7.98), 0, "ab k = 7,98 ist der Eigenwert exakt null");

// Der Titel »Ein einziges ULP« darf nur im Bereich gap ≤ 3 ULP stehen.
assert.ok(/gap <= 3 \* ULP \?/.test(src), "die Schwelle des ULP-Zweigs muss 3 ULP sein");
assert.ok(!/gap < 1e-14 \?/.test(src), "die alte 1e−14-Schwelle darf nicht zurückkehren");
for (let k = 4; k <= 10.0001; k += 0.1) {
  const g = gap(Number(k.toFixed(1)));
  if (g !== 0 && g <= 3 * ULP) {
    assert.ok(
      Math.round(g / ULP) <= 3,
      `im ULP-Zweig darf hoechstens 3 ULP stehen, bei k = ${k.toFixed(1)} sind es ${g / ULP}`,
    );
  }
}

/* ------------------------------------------------- Konditionszahl im Startzustand */

const condExact = (k) => {
  const e = Math.pow(10, -k);
  return (2 + e * e) / (e * e);
};
nah(condExact(6), 2.000000000001e12, 1e3, "κ(AᵀA) = κ(A)² bei k = 6");
nah(Math.sqrt(condExact(6)), 1.4142136e6, 1, "κ(A) bei k = 6");

/* -------------------------- Die Schätzfrage-Lösung ist die Bisektionsschwelle */

const loesung = src.match(/loesung=\{COLLAPSE_K\}/);
assert.ok(loesung, "die Schätzfrage muss auf COLLAPSE_K zeigen");
const toleranz = src.match(/toleranz=\{([\d.]+)\}/);
assert.ok(toleranz, "Toleranz der Schätzfrage nicht gefunden");
assert.ok(
  Math.abs(8 - hi) <= Number(toleranz[1]),
  "die im Selbsttest S73 abgefragte Antwort k = 8 muss innerhalb der Toleranz liegen",
);

console.log("REV29 07-kq S73Kreuzprodukt: alle Zahlen bestätigt");
