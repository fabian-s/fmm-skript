#!/usr/bin/env node
/**
 * REV29 — src/chapters/08-la-misc/widgets/S84Sketching.tsx (SketchingDemo).
 *
 * Unabhängige Rechenwege:
 *   • X und Y werden aus dem Widget-Quelltext gelesen; Abstand und Winkel
 *     werden hier neu gebildet und gegen die Header-Zahlen geprüft.
 *   • Die im Header behaupteten Standardabweichungen 9,97 % und 7,06 % sowie
 *     die Bandabdeckung 68,2 % kommen hier NICHT aus einer Simulation, sondern
 *     aus der exakten χ²-Verteilung: ‖Sz‖²/‖z‖² ist χ²_m/m-verteilt, also ist
 *     die relative Abstandsabweichung √(χ²_m/m) − 1 mit bekannten Momenten und
 *     bekannter Verteilungsfunktion. Beides ist ein anderer Rechenweg als der
 *     des Widgets (das zieht Zufallsmatrizen).
 * Alle Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/08-la-misc/widgets/S84Sketching.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const liesVektor = (name) => {
  const m = src.match(new RegExp(`const ${name}: number\\[\\] = \\[([\\s\\S]*?)\\];`));
  assert.ok(m, `${name} nicht im Quelltext gefunden`);
  return m[1].split(",").map((t) => t.trim()).filter((t) => t.length > 0).map(Number);
};

const X = liesVektor("X");
const Y = liesVektor("Y");
assert.equal(X.length, 200, "n = 200");
assert.equal(Y.length, 200, "y hat dieselbe Länge");

const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const D = X.map((v, i) => v - Y[i]);
nah(Math.sqrt(dot(D, D)), 5.6954, 1e-4, "‖x − y‖");
nah(
  (Math.acos(dot(X, Y) / (Math.sqrt(dot(X, X)) * Math.sqrt(dot(Y, Y)))) * 180) / Math.PI,
  41.714,
  1e-3,
  "∠(x, y) in Grad",
);

/* -------------------------------- Exakte χ²-Momente statt einer Simulation */

function lgamma(z) {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

/** Standardabweichung von √(χ²_m/m) − 1, also der relativen Abstandsabweichung. */
function sdRelativ(m) {
  const mittel = Math.sqrt(2 / m) * Math.exp(lgamma((m + 1) / 2) - lgamma(m / 2));
  return Math.sqrt(1 - mittel * mittel);
}
nah(100 * sdRelativ(50), 9.97, 0.01, "Standardabweichung bei m = 50");
nah(100 * sdRelativ(100), 7.06, 0.01, "Standardabweichung bei m = 100");
nah(100 / Math.sqrt(2 * 50), 10, 1e-12, "Faustregel 1/√(2m) bei m = 50");
nah(100 / Math.sqrt(2 * 100), 7.0711, 1e-4, "Faustregel 1/√(2m) bei m = 100");
// Die Faustregel ist wirklich eine Näherung der exakten Standardabweichung.
for (const m of [25, 50, 100]) {
  assert.ok(
    Math.abs(sdRelativ(m) - 1 / Math.sqrt(2 * m)) / sdRelativ(m) < 0.01,
    `Faustregel und exakte Standardabweichung müssen bei m = ${m} auf 1 % übereinstimmen`,
  );
}

/** Regularisierte untere unvollständige Gammafunktion. */
function gammap(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let sum = 1 / a;
    let term = sum;
    for (let n = 1; n < 10000; n++) {
      term *= x / (a + n);
      sum += term;
      if (Math.abs(term) < Math.abs(sum) * 1e-16) break;
    }
    return sum * Math.exp(-x + a * Math.log(x) - lgamma(a));
  }
  let b = x + 1 - a;
  let c = 1e300;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 10000; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c;
    if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-16) break;
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
}
const chi2cdf = (x, m) => gammap(m / 2, x / 2);
/** Anteil der Ziehungen im Band ±1/√(2m). */
const bandAnteil = (m) => {
  const b = 1 / Math.sqrt(2 * m);
  return chi2cdf(m * (1 + b) ** 2, m) - chi2cdf(m * (1 - b) ** 2, m);
};
nah(100 * bandAnteil(50), 68.2, 0.1, "Bandabdeckung bei m = 50 (Header: 68,2 %)");
nah(100 * bandAnteil(100), 68.2, 0.1, "Bandabdeckung bei m = 100");
// Gegenprobe: das doppelt so breite Band fängt deutlich mehr.
assert.ok(
  chi2cdf(50 * 1.2 ** 2, 50) - chi2cdf(50 * 0.8 ** 2, 50) > 0.9,
  "das doppelt so breite Band muss deutlich mehr als 68 % fangen",
);

/* --------------------------------------------- Fixes im Quelltext verankert */

assert.ok(
  /const \[zeigeFaustregel, setZeigeFaustregel\] = useState\(true\);/.test(src),
  "die Faustregel muss im Startzustand eingeblendet sein",
);
assert.ok(/ariaLabel=\{/.test(src), "der Plot braucht ein ariaLabel");
assert.ok(!/Skript nicht mehr vorhanden/.test(src), "der verstümmelte Header-Baustein muss weg sein");

console.log("REV29 08-la-misc S84Sketching: alle Zahlen bestätigt");
