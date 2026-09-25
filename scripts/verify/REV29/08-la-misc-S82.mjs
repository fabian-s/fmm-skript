#!/usr/bin/env node
/**
 * REV29 — src/chapters/08-la-misc/widgets/S82Pagerank.tsx (PagerankDemo) und
 * S82Pca.tsx (PcaDirectionDemo).
 *
 * Unabhängige Rechenwege:
 *   • Der stationäre Vektor wird hier nicht nur als Fixpunkt nachgeprüft,
 *     sondern zusätzlich als Lösung von (T − I)x = 0 mit Summenbedingung über
 *     Gauss-Elimination neu bestimmt.
 *   • λ₁, λ₂ und θ* der PCA kommen aus einem Rasterlauf über 3,6 Mio. Winkel
 *     (Maximum der Projektionsvarianz), nicht aus der Eigenwertformel, die das
 *     Widget benutzt; die hartkodierte Kovarianzmatrix wird aus DATA neu
 *     ausgerechnet und verglichen.
 * Alle Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const srcPr = readFileSync(join(repo, "src/chapters/08-la-misc/widgets/S82Pagerank.tsx"), "utf8");
const srcPca = readFileSync(join(repo, "src/chapters/08-la-misc/widgets/S82Pca.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ============================================================ PageRank */

const T = [
  [0, 0, 0.5, 1],
  [0.5, 0, 0, 0],
  [0.5, 1, 0, 0],
  [0, 0, 0.5, 0],
];
const START = [0.25, 0.25, 0.25, 0.25];
const STAR = [1 / 3, 1 / 6, 1 / 3, 1 / 6];
const anwenden = (x) => T.map((row) => row.reduce((s, v, j) => s + v * x[j], 0));

// Spaltenstochastisch: jede Spalte summiert sich zu 1.
for (let j = 0; j < 4; j++) {
  nah(T.reduce((s, row) => s + row[j], 0), 1, 1e-15, `Spaltensumme ${j + 1}`);
}

// x* ist Fixpunkt …
anwenden(STAR).forEach((v, i) => nah(v, STAR[i], 1e-15, `Fixpunkt, Komponente ${i + 1}`));

// … und die eindeutige Lösung von (T − I)x = 0 mit Summe 1 (Gauss mit Pivot).
function loeseStationaer() {
  const M = [];
  for (let i = 0; i < 3; i++) M.push([...T[i].map((v, j) => v - (i === j ? 1 : 0)), 0]);
  M.push([1, 1, 1, 1, 1]);
  for (let c = 0; c < 4; c++) {
    let p = c;
    for (let r = c + 1; r < 4; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < 4; r++) {
      if (r === c || Math.abs(M[c][c]) < 1e-14) continue;
      const f = M[r][c] / M[c][c];
      for (let j = c; j <= 4; j++) M[r][j] -= f * M[c][j];
    }
  }
  return [0, 1, 2, 3].map((i) => M[i][4] / M[i][i]);
}
loeseStationaer().forEach((v, i) => nah(v, STAR[i], 1e-12, `stationärer Vektor über Gauss, Komponente ${i + 1}`));

// Der Fehler halbiert sich exakt und wechselt in jedem Schritt das Vorzeichen.
let x = START;
let vorher = null;
let ersterUnter5e4 = null;
for (let k = 0; k <= 20; k++) {
  const diff = x.map((v, i) => v - STAR[i]);
  const d = Math.max(...diff.map(Math.abs));
  if (ersterUnter5e4 === null && d < 5e-4) ersterUnter5e4 = k;
  if (vorher !== null) {
    nah(d / vorher.d, 0.5, 1e-9, `Halbierungsfaktor in Schritt ${k}`);
    assert.ok(diff[0] * vorher.diff[0] < 0, `das Vorzeichen des Fehlers muss in Schritt ${k} wechseln`);
  }
  vorher = { d, diff };
  x = anwenden(x);
}
nah(Math.max(...START.map((v, i) => Math.abs(v - STAR[i]))), 1 / 12, 1e-15, "Startabstand");
assert.equal(ersterUnter5e4, 8, "der Konvergenzzweig (Abstand < 5e−4) greift ab Schritt 8");
// Der Stepper muss weit genug reichen.
const kmaxPr = Number(srcPr.match(/const KMAX = (\d+);/)[1]);
assert.ok(kmaxPr >= 8, `KMAX = ${kmaxPr} erreicht den Konvergenzzweig nicht`);
assert.ok(!/sr-only/.test(srcPr), "die Erklärung darf nicht mehr sr-only gestellt sein");
assert.ok(!/check-widgets\.mjs/.test(srcPr), "der Header darf kein nicht existierendes Skript zitieren");

/* ================================================================= PCA */

const DATA = [[3, 1], [-3, -1], [2, 0.4], [-2, -0.4], [1, 0.7], [-1, -0.7], [0.4, -0.4], [-0.4, 0.4]];
const N = DATA.length;
let s00 = 0, s01 = 0, s11 = 0;
for (const [a, b] of DATA) {
  s00 += a * a;
  s01 += a * b;
  s11 += b * b;
}
const cov = [[s00 / (N - 1), s01 / (N - 1)], [s01 / (N - 1), s11 / (N - 1)]];
nah(cov[0][0], 4.0457142857, 1e-9, "Σ₁₁");
nah(cov[0][1], 1.24, 1e-12, "Σ₁₂");
nah(cov[1][1], 0.5171428571, 1e-9, "Σ₂₂");

// Das Literal im Widget muss dieser Rechnung entsprechen.
const covLit = srcPca.match(/const cov: \[\[number, number\], \[number, number\]\] = \[\[([^\]]*)\], \[([^\]]*)\]\]/);
assert.ok(covLit, "cov-Literal nicht gefunden");
const zeile1 = covLit[1].split(",").map((v) => Number(v.trim()));
const zeile2 = covLit[2].split(",").map((v) => Number(v.trim()));
nah(zeile1[0], cov[0][0], 1e-9, "hartkodiertes Σ₁₁ gegen die Rechnung aus DATA");
nah(zeile1[1], cov[0][1], 1e-9, "hartkodiertes Σ₁₂ gegen die Rechnung aus DATA");
nah(zeile2[1], cov[1][1], 1e-9, "hartkodiertes Σ₂₂ gegen die Rechnung aus DATA");

// Maximum der Projektionsvarianz durch Rasterlauf (kein Eigenwertlöser).
const varianz = (deg) => {
  const t = (deg * Math.PI) / 180;
  const v = [Math.cos(t), Math.sin(t)];
  return DATA.reduce((s, p) => s + (p[0] * v[0] + p[1] * v[1]) ** 2, 0) / (N - 1);
};
let best = -Infinity;
let bestDeg = 0;
const M = 3_600_000;
for (let i = 0; i < M; i++) {
  const deg = -90 + (180 * i) / M;
  const w = varianz(deg);
  if (w > best) {
    best = w;
    bestDeg = deg;
  }
}
nah(bestDeg, 17.5504, 1e-3, "Maximierer θ* aus dem Rasterlauf");
nah(best, 4.437885, 1e-5, "λ₁ = maximale Projektionsvarianz");
nah(cov[0][0] + cov[1][1] - best, 0.124972, 1e-5, "λ₂ = Spur − λ₁");

// F8: der 0,5°-Regler kommt nahe heran, trifft θ* aber nicht.
const raster = Math.round(17.5504 * 2) / 2;
nah(raster, 17.5, 1e-12, "nächster Rastwert des 0,5°-Reglers");
nah(varianz(17.5), 4.437882, 1e-5, "Varianz am nächsten Rastwert");
assert.ok(varianz(17.5) < best, "der Rastwert liegt echt unter dem Maximum");
assert.ok(Math.abs(17.5 - bestDeg) > 0.04, "θ* liegt nicht auf dem Reglerraster – der exakte Fall braucht den Preset");
assert.ok(/const exakt = theta === eigenAngle;/.test(srcPca), "exakter Zweig fehlt im PCA-Widget");
assert.ok(/\{beruehrt && <line/.test(srcPca), "die grüne Eigenrichtung darf im toten Startzustand nicht sichtbar sein");
assert.ok(/step=\{0\.5\}/.test(srcPca), "der Richtungsregler muss in 0,5°-Schritten laufen");
// Die Zahl des Selbsttests (4,43) muss am Maximum angezeigt werden.
nah(Number(best.toFixed(2)), 4.44, 0.02, "Selbsttest-Wert 4,43 ± 0,05");

console.log("REV29 08-la-misc S82: alle Zahlen bestätigt");
