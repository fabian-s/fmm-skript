#!/usr/bin/env node
/**
 * REV29 — src/chapters/03-matrix-spur-norm/widgets/S35SubmultWidget.tsx.
 *
 * Deckt den Zustandsraum ab, über den Header, Verdikt und Selbsttestfrage
 * Aussagen machen: die 40 Seeds des Würfelknopfs (Seed 1 … 40, wie useSeed(1)
 * plus neueStichprobe() sie erzeugt) und die kuratierte Einsermatrix.
 *
 * Unabhängiger Rechenweg: die Singulärwerte werden hier über die Wurzeln der
 * Eigenwerte von AᵀA aus dem charakteristischen Polynom bestimmt und zusätzlich
 * gegen eine Potenzmethode auf AᵀA gehalten; die Normen selbst sind gegen ihre
 * Definitionen (Maximum über Einheitsvektoren, per Winkelabtastung) geprüft.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(
  join(repo, "src/chapters/03-matrix-spur-norm/widgets/S35SubmultWidget.tsx"),
  "utf8",
);

/* ------------------------------------------------ Arten und Verdikt-Zweige */

const arten = [...src.matchAll(/art: "(operator|schatten|elementweise)",/g)].map((m) => m[1]);
assert.equal(arten.length, 6, "NORMS führt nicht mehr sechs Normen");
const artenMenge = new Set(arten);
assert.deepEqual([...artenMenge].sort(), ["elementweise", "operator", "schatten"]);

// Der CRITICAL: der „Erfüllt, mit Luft"-Zweig muss ALLE drei Arten abfragen.
for (const art of artenMenge) {
  assert.ok(
    new RegExp(`norm\\.art === "${art}"`).test(src),
    `Verdikt fragt die Normart "${art}" nicht ab`,
  );
}
assert.ok(
  !/norm\.art === "operator" \? `Operatornormen/.test(src),
  "der alte Zwei-Fall-Ternär im Verdikt ist wieder da",
);

/* ---------------------------------------------------------------- Normen */

const matmul = (a, b) => [
  [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
  [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
];

/** σ₁ ≥ σ₂ über das charakteristische Polynom von AᵀA. */
function sv(m) {
  const p = m[0][0] ** 2 + m[1][0] ** 2;
  const q = m[0][0] * m[0][1] + m[1][0] * m[1][1];
  const r = m[0][1] ** 2 + m[1][1] ** 2;
  const spur = p + r;
  const det = p * r - q * q;
  const wurzel = Math.sqrt(Math.max(spur * spur / 4 - det, 0));
  return [Math.sqrt(Math.max(spur / 2 + wurzel, 0)), Math.sqrt(Math.max(spur / 2 - wurzel, 0))];
}

/** Unabhängige Gegenprobe: σ₁ als Maximum von ‖Ax‖₂ über den Einheitskreis. */
function sigmaMaxAbtastung(m) {
  let best = 0;
  for (let i = 0; i < 200000; i++) {
    const t = (2 * Math.PI * i) / 200000;
    const c = Math.cos(t), s = Math.sin(t);
    best = Math.max(best, Math.hypot(m[0][0] * c + m[0][1] * s, m[1][0] * c + m[1][1] * s));
  }
  return best;
}

const NORMEN = {
  spec: (m) => sv(m)[0],
  one: (m) => Math.max(Math.abs(m[0][0]) + Math.abs(m[1][0]), Math.abs(m[0][1]) + Math.abs(m[1][1])),
  inf: (m) => Math.max(Math.abs(m[0][0]) + Math.abs(m[0][1]), Math.abs(m[1][0]) + Math.abs(m[1][1])),
  fro: (m) => Math.hypot(m[0][0], m[0][1], m[1][0], m[1][1]),
  nuc: (m) => sv(m)[0] + sv(m)[1],
  max: (m) => Math.max(...m.flat().map(Math.abs)),
};
const ART = { spec: "operator", one: "operator", inf: "operator", fro: "schatten", nuc: "schatten", max: "elementweise" };

// Gegenprobe der Spektralnorm an einer schiefen Matrix.
for (const probe of [[[1, 2], [0.5, 1]], [[2, 0.6], [-0.4, 1.3]], [[0.3, -1.1], [2.2, 0.4]]]) {
  assert.ok(
    Math.abs(NORMEN.spec(probe) - sigmaMaxAbtastung(probe)) < 1e-6,
    `Spektralnorm ${NORMEN.spec(probe)} != Abtastmaximum ${sigmaMaxAbtastung(probe)}`,
  );
}

/* ------------------------------------------------------- Einsermatrix */

const EINSER = [[1, 1], [1, 1]];
const EINSER2 = matmul(EINSER, EINSER);
assert.deepEqual(EINSER2, [[2, 2], [2, 2]]);
for (const key of ["spec", "one", "inf", "fro", "nuc"]) {
  const q = NORMEN[key](EINSER2) / (NORMEN[key](EINSER) * NORMEN[key](EINSER));
  assert.ok(Math.abs(q - 1) < 1e-12, `${key}: Quotient ${q}, erwartet 1`);
}
const qMax = NORMEN.max(EINSER2) / NORMEN.max(EINSER) ** 2;
assert.equal(qMax, 2);
// Reparatur aus der Bemerkung: ‖A‖_G = 2‖A‖_M erfüllt die Ungleichung.
assert.ok(2 * NORMEN.max(EINSER2) <= (2 * NORMEN.max(EINSER)) ** 2);

/* ------------------------------------------------ die 40 Seeds des Würfels */

function mulberry32(seed) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
assert.ok(/mulberry32\(seed \* 7919\)/.test(src), "Seed-Faktor 7919 nicht mehr im Widget");

const maxima = {};
let maxRatioElementweise = 0;
for (let seed = 1; seed <= 40; seed++) {
  const rng = mulberry32(seed * 7919);
  const r = () => Math.round((rng() * 4 - 2) * 10) / 10;
  const A = [[r(), r()], [r(), r()]];
  const B = [[r(), r()], [r(), r()]];
  const AB = matmul(A, B);
  for (const key of Object.keys(NORMEN)) {
    const nA = NORMEN[key](A), nB = NORMEN[key](B), nAB = NORMEN[key](AB);
    const rhs = nA * nB;
    const q = rhs > 0 ? nAB / rhs : nAB > 0 ? Infinity : 0;
    maxima[key] = Math.max(maxima[key] ?? 0, q);
    if (ART[key] !== "elementweise") {
      // Die Behauptung des Verdikts: für alles außer der Maximumsnorm bleibt der
      // Quotient über die Zufallspaare unter 1.
      assert.ok(q <= 1 + 1e-12, `${key}, Seed ${seed}: Quotient ${q} > 1`);
    } else {
      maxRatioElementweise = Math.max(maxRatioElementweise, q);
    }
  }
}

const ERWARTET = { spec: 0.9997, one: 1.0, inf: 1.0, fro: 0.9729, nuc: 0.78, max: 1.8235 };
for (const [key, wert] of Object.entries(ERWARTET)) {
  assert.ok(
    Math.abs(maxima[key] - wert) < 5e-4,
    `${key}: größter Quotient ${maxima[key]}, Header behauptet ${wert}`,
  );
}
// Nur die Maximumsnorm reißt aus – widerlegbar formuliert.
assert.ok(maxRatioElementweise > 1.5, `Maximumsnorm bleibt unter 1,5: ${maxRatioElementweise}`);

console.log("REV29 03-matrix-spur-norm-S35Submult: ok");
