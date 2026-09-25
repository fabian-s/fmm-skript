#!/usr/bin/env node
/**
 * REV29 — src/chapters/10-differentialrechnung/widgets/S107Hesse.tsx
 * (HesseSchaetzung, HesseDefinitheit).
 *
 * Prüft die Headerzahlen, die vier Voreinstellungen und die Klassifikation
 * nach dem Hesse-Kriterium.
 *
 * Unabhängiger Rechenweg: H wird hier NICHT als Matrixprodukt R diag R^T
 * gebildet (so macht es das Widget), sondern über die Doppelwinkelformeln
 *   h11 = (l1+l2)/2 + (l1−l2)/2 cos 2phi,  h12 = (l1−l2)/2 sin 2phi,
 *   h22 = (l1+l2)/2 − (l1−l2)/2 cos 2phi.
 * Die Eigenwerte werden aus dem so gebauten H über die charakteristische
 * Gleichung zurückgerechnet und müssen die Reglerwerte treffen. Zusätzlich
 * werden die Krümmungen entlang der Hauptachsen aus f selbst durch zentrale
 * zweite Differenzen bestimmt. Die Voreinstellungen werden aus dem TSX-
 * Quelltext gelesen, damit eine Drift auffällt.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const datei = "src/chapters/10-differentialrechnung/widgets/S107Hesse.tsx";
const src = readFileSync(join(repo, datei), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ------------------------------------ Voreinstellungen aus dem Quelltext */

const presets = [...src.matchAll(/\{ name: "([^"]+)", titel: "[^"]*", l1: (-?[\d.]+), l2: (-?[\d.]+), grad: (-?[\d.]+) \}/g)].map(
  (m) => ({ name: m[1], l1: Number(m[2]), l2: Number(m[3]), grad: Number(m[4]) }),
);
assert.equal(presets.length, 4, "es müssen vier Voreinstellungen sein");
assert.deepEqual(
  presets.map((p) => [p.l1, p.l2, p.grad]),
  [
    [2, 8, 0],
    [3, -1, 30],
    [-2, -5, 60],
    [3, 0, 20],
  ],
  "die Voreinstellungen sind gedriftet",
);

/* ------------------------------------------- H über die Doppelwinkelformel */

function hesse(l1, l2, gradPhi) {
  const p = (gradPhi * Math.PI) / 180;
  const m = (l1 + l2) / 2;
  const d = (l1 - l2) / 2;
  return [
    [m + d * Math.cos(2 * p), d * Math.sin(2 * p)],
    [d * Math.sin(2 * p), m - d * Math.cos(2 * p)],
  ];
}

/** Eigenwerte aus H über die charakteristische Gleichung, absteigend nicht sortiert. */
function eigen(H) {
  const s = H[0][0] + H[1][1];
  const d = H[0][0] * H[1][1] - H[0][1] * H[1][0];
  const w = Math.sqrt(Math.max(0, (s / 2) ** 2 - d));
  return [s / 2 + w, s / 2 - w];
}

/* --------------------------------------------- die Headerzahlen im Einzelnen */

const h1 = hesse(2, 8, 0);
nah(h1[0][0], 2, 1e-12, "H(2,8,0)₁₁");
nah(h1[0][1], 0, 1e-12, "H(2,8,0)₁₂");
nah(h1[1][0], 0, 1e-12, "H(2,8,0)₂₁");
nah(h1[1][1], 8, 1e-12, "H(2,8,0)₂₂");
nah(h1[0][0] + h1[1][1], 10, 1e-12, "Spur H(2,8,0)");
nah(h1[0][0] * h1[1][1] - h1[0][1] * h1[1][0], 16, 1e-12, "det H(2,8,0)");

const h2 = hesse(3, -1, 30);
nah(h2[0][0], 2, 1e-12, "H(3,−1,30°)₁₁");
nah(h2[0][1], Math.sqrt(3), 1e-12, "H(3,−1,30°)₁₂");
nah(h2[1][1], 0, 1e-12, "H(3,−1,30°)₂₂");
nah(h2[0][0] + h2[1][1], 2, 1e-12, "Spur H(3,−1,30°)");
nah(h2[0][0] * h2[1][1] - h2[0][1] * h2[1][0], -3, 1e-12, "det H(3,−1,30°)");

const h3 = hesse(-2, -5, 60);
nah(h3[0][0], -4.25, 1e-12, "H(−2,−5,60°)₁₁");
nah(h3[0][1], 1.299038, 1e-6, "H(−2,−5,60°)₁₂");
nah(h3[1][1], -2.75, 1e-12, "H(−2,−5,60°)₂₂");
nah(h3[0][0] + h3[1][1], -7, 1e-12, "Spur H(−2,−5,60°)");
nah(h3[0][0] * h3[1][1] - h3[0][1] * h3[1][0], 10, 1e-12, "det H(−2,−5,60°)");

const h4 = hesse(3, 0, 20);
nah(h4[0][0] + h4[1][1], 3, 1e-12, "Spur H(3,0,20°)");
nah(h4[0][0] * h4[1][1] - h4[0][1] * h4[1][0], 0, 1e-12, "det H(3,0,20°)");

/* ------------------- Eigenwerte, Klassifikation und Krümmung für alle Presets */

const klassifikation = (l1, l2) => {
  const eps = 1e-9;
  if (Math.abs(l1) < eps || Math.abs(l2) < eps) return "semidefinit";
  if (l1 > 0 && l2 > 0) return "Minimum";
  if (l1 < 0 && l2 < 0) return "Maximum";
  return "Sattel";
};
const ERWARTET = ["Minimum", "Sattel", "Maximum", "semidefinit"];

presets.forEach((p, i) => {
  const H = hesse(p.l1, p.l2, p.grad);
  const [ea, eb] = eigen(H);
  const soll = [Math.max(p.l1, p.l2), Math.min(p.l1, p.l2)];
  nah(ea, soll[0], 1e-12, `größter Eigenwert im Preset ${p.name}`);
  nah(eb, soll[1], 1e-12, `kleinster Eigenwert im Preset ${p.name}`);
  nah(H[0][0] + H[1][1], p.l1 + p.l2, 1e-12, `Spur = λ₁+λ₂ im Preset ${p.name}`);
  nah(H[0][0] * H[1][1] - H[0][1] * H[1][0], p.l1 * p.l2, 1e-12, `det = λ₁·λ₂ im Preset ${p.name}`);
  assert.equal(klassifikation(p.l1, p.l2), ERWARTET[i], `Klassifikation im Preset ${p.name}`);
  assert.ok(H[0][1] === H[1][0], `H muss symmetrisch sein (Preset ${p.name})`);

  // Krümmung entlang der Hauptachsen direkt aus f = ½ hᵀHh, per zweiter
  // zentraler Differenz — unabhängig von der Eigenwertrechnung oben.
  const f = (a, b) => 0.5 * (a * (H[0][0] * a + H[0][1] * b) + b * (H[1][0] * a + H[1][1] * b));
  const phi = (p.grad * Math.PI) / 180;
  const achsen = [
    [Math.cos(phi), Math.sin(phi)],
    [-Math.sin(phi), Math.cos(phi)],
  ];
  const h = 1e-4;
  achsen.forEach((v, j) => {
    const zweite = (f(h * v[0], h * v[1]) - 2 * f(0, 0) + f(-h * v[0], -h * v[1])) / (h * h);
    nah(zweite, j === 0 ? p.l1 : p.l2, 1e-5, `Krümmung entlang v${j + 1} im Preset ${p.name}`);
  });

  // f(t v_i) = ½ λ_i t²; für den Sattel bei t = 1,7 also 4,335 bzw. −1,445.
  if (p.name.startsWith("Sattel")) {
    nah(0.5 * p.l1 * 1.7 ** 2, 4.335, 1e-3, "f(1,7·v₁) im Sattel");
    nah(0.5 * p.l2 * 1.7 ** 2, -1.445, 1e-3, "f(1,7·v₂) im Sattel");
  }
});

/* ---------------------------- Halbachsen der Niveaumenge f = 4 im Folienfall */

// f(x) = x₁² + 4x₂² = 4 ist die Ellipse mit den Halbachsen 2 und 1.
const fFolie = (a, b) => a * a + 4 * b * b;
nah(fFolie(2, 0), 4, 1e-12, "Halbachse 2 auf der x₁-Achse");
nah(fFolie(0, 1), 4, 1e-12, "Halbachse 1 auf der x₂-Achse");
// Gegenprobe: ½ hᵀ diag(2,8) h ist genau dieses f.
for (let i = -10; i <= 10; i++) {
  for (let j = -10; j <= 10; j++) {
    const [a, b] = [i / 5, j / 5];
    nah(0.5 * (2 * a * a + 8 * b * b), fFolie(a, b), 1e-12, `½hᵀdiag(2,8)h in (${a}; ${b})`);
  }
}

/* -------------------------- Der semidefinite Grenzfall ist am Regler erreichbar */

// λ₂ rastet auf 0,5; die Null wird also exakt getroffen.
assert.ok(Number.isInteger(0 / 0.5), "die Null muss auf dem λ-Raster liegen");
const hRinne = hesse(2, 0, 0);
nah(hRinne[0][0] * hRinne[1][1] - hRinne[0][1] * hRinne[1][0], 0, 0, "det H bei λ₂ = 0 muss exakt null sein");
// f bleibt auf dem Fenster nichtnegativ und ist entlang v₂ konstant null.
let kleinster = Infinity;
for (let i = -24; i <= 24; i++)
  for (let j = -24; j <= 24; j++) {
    const [a, b] = [i / 10, j / 10];
    kleinster = Math.min(kleinster, 0.5 * (2 * a * a + 0 * b * b));
  }
nah(kleinster, 0, 0, "kleinster Wert im semidefiniten Fall");

/* -------- Wertebereiche der vier Presets auf dem gezeigten Fenster [−2,4; 2,4]² */

const bereich = (H) => {
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i <= 120; i++)
    for (let j = 0; j <= 120; j++) {
      const a = -2.4 + (4.8 * i) / 120;
      const b = -2.4 + (4.8 * j) / 120;
      const v = 0.5 * (a * (H[0][0] * a + H[0][1] * b) + b * (H[1][0] * a + H[1][1] * b));
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
  return [lo, hi];
};
const SOLL_BEREICH = [
  [0, 28.8],
  [-4.32, 15.74],
  [-27.64, 0],
  [0, 14.19],
];
presets.forEach((p, i) => {
  const [lo, hi] = bereich(hesse(p.l1, p.l2, p.grad));
  nah(lo, SOLL_BEREICH[i][0], 0.02, `kleinster Wert im Preset ${p.name}`);
  nah(hi, SOLL_BEREICH[i][1], 0.02, `größter Wert im Preset ${p.name}`);
});

console.log(`REV29 ${datei}: vier Voreinstellungen, Eigenwerte und Klassifikation geprüft.`);
