#!/usr/bin/env node
/**
 * REV29 — S133Monombasis.tsx (VandermondeKondition), §13.3.
 *
 * Der Widget-Header behauptete eine Prüfung durch verify-hdr.mjs sowie durch
 * zwei nicht mehr existierende Skripte (check-s143.mjs / check3-s143.mjs).
 * Keine davon rechnet Konditionszahlen. Dieses Skript holt das nach.
 *
 * UNABHÄNGIGER RECHENWEG: Das Widget schätzt kappa_2 = ||B||_2 * ||B^{-1}||_2
 * über eine Potenzmethode auf B^T B und eine explizit per Gauss-Elimination
 * berechnete Inverse. Hier steht stattdessen eine einseitige Jacobi-SVD
 * (Spaltenpaare werden orthogonalisiert, die Spaltennormen sind danach die
 * Singulärwerte), und kappa_2 = sigma_max / sigma_min. Weder Inverse noch
 * Potenziteration kommen vor; ein Fehler in einem der beiden Wege fällt auf.
 *
 * Geprüft werden die im Header dokumentierten Werte für n = 5, 10, 15, 20 in
 * allen drei Basen sowie die drei Spaltenwinkel bei n = 10.
 */
import assert from "node:assert/strict";

/* ---------- Basismatrizen (wie im Widget definiert) ---------- */
const stellen = (n, a, b) =>
  Array.from({ length: n }, (_, i) => (n === 1 ? (a + b) / 2 : a + ((b - a) * i) / (n - 1)));

function chebT(k, t) {
  if (k === 0) return 1;
  let a = 1;
  let b = t;
  for (let i = 1; i < k; i++) {
    const c = 2 * t * b - a;
    a = b;
    b = c;
  }
  return b;
}

function basisMatrix(id, n) {
  if (id === "monom01") return stellen(n, 0, 1).map((x) => Array.from({ length: n }, (_, j) => x ** j));
  if (id === "monom11") return stellen(n, -1, 1).map((x) => Array.from({ length: n }, (_, j) => x ** j));
  return stellen(n, -1, 1).map((x) => Array.from({ length: n }, (_, j) => chebT(j, x)));
}

/* ---------- Einseitige Jacobi-SVD: Singulärwerte ohne Inverse ---------- */
function singulaerwerte(A) {
  const n = A.length;
  const m = A[0].length;
  // Spalten als Vektoren
  const U = Array.from({ length: m }, (_, j) => A.map((r) => r[j]));
  const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
  for (let sweep = 0; sweep < 60; sweep++) {
    let aus = 0;
    for (let p = 0; p < m - 1; p++) {
      for (let q = p + 1; q < m; q++) {
        const app = dot(U[p], U[p]);
        const aqq = dot(U[q], U[q]);
        const apq = dot(U[p], U[q]);
        if (app === 0 || aqq === 0) continue;
        const off = Math.abs(apq) / Math.sqrt(app * aqq);
        if (!(off > 1e-17)) continue;
        aus = Math.max(aus, off);
        // Jacobi-Rotation, die die beiden Spalten orthogonalisiert
        const zeta = (aqq - app) / (2 * apq);
        const t = Math.sign(zeta || 1) / (Math.abs(zeta) + Math.sqrt(1 + zeta * zeta));
        const c = 1 / Math.sqrt(1 + t * t);
        const s = c * t;
        for (let i = 0; i < n; i++) {
          const up = U[p][i];
          const uq = U[q][i];
          U[p][i] = c * up - s * uq;
          U[q][i] = s * up + c * uq;
        }
      }
    }
    if (aus < 1e-16) break;
  }
  return U.map((u) => Math.hypot(...u)).sort((a, b) => b - a);
}

const kappa2 = (id, n) => {
  const s = singulaerwerte(basisMatrix(id, n));
  return s[0] / s[s.length - 1];
};

/* ---------- 1. Konditionszahlen gegen die Header-Tabelle ---------- */
// n : [Monome auf [0,1], Monome auf [-1,1], Chebyshev]
const HEADER = {
  5: [6.86e2, 2.35e1, 2.22],
  10: [1.52e7, 4.63e3, 1.46e1],
  15: [4.03e11, 1.1e6, 2.26e2],
  20: [1.09e16, 2.72e8, 4.85e3],
};
const IDS = ["monom01", "monom11", "cheb"];

for (const [nStr, erwartet] of Object.entries(HEADER)) {
  const n = Number(nStr);
  erwartet.forEach((soll, i) => {
    const ist = kappa2(IDS[i], n);
    // Bis kappa ~ 1e12 auf drei Stellen; darüber frisst die doppelte
    // Genauigkeit selbst Stellen weg, dort nur die Größenordnung.
    const rel = Math.abs(ist - soll) / soll;
    const schranke = soll < 1e12 ? 0.01 : 0.35;
    assert.ok(
      rel < schranke,
      `kappa_2(${IDS[i]}, n=${n}): ${ist.toExponential(3)} gegen Header ${soll.toExponential(3)} (rel. ${rel.toFixed(3)})`,
    );
  });
}

/* ---------- 2. Die Aussagen, die das Verdikt trägt ---------- */
// (a) Beide Monombasen wachsen exponentiell, Chebyshev deutlich langsamer.
for (const id of IDS) {
  for (let n = 3; n < 20; n++) {
    assert.ok(kappa2(id, n + 1) > kappa2(id, n), `${id}: kappa_2 nicht monoton bei n=${n}`);
  }
}
// (b) Die Reihenfolge der drei Basen ist bei jedem n dieselbe.
for (let n = 4; n <= 20; n++) {
  const [a, b, c] = IDS.map((id) => kappa2(id, n));
  assert.ok(a > b && b > c, `Reihenfolge der Basen kippt bei n=${n}: ${a} ${b} ${c}`);
}
// (c) Die Verdikt-Schwelle „16 Stellen aufgebraucht" wird von den Monomen auf
//     [0,1] im Reglerbereich erreicht, von Chebyshev nirgends.
const stellenVerlust = (id, n) => Math.min(16, Math.log10(kappa2(id, n)));
assert.ok(stellenVerlust("monom01", 20) >= 15.5, "Monome [0,1] erreichen bei n=20 die 16 Stellen nicht");
assert.ok(stellenVerlust("cheb", 20) < 6, "Chebyshev verliert bei n=20 mehr als 6 Stellen");
assert.ok(stellenVerlust("monom01", 15) >= 6 && stellenVerlust("monom01", 15) < 15.5, "mittlere Klasse bei n=15 nicht getroffen");

/* ---------- 3. Spaltenwinkel bei n = 10 (Monome auf [0,1]) ---------- */
function winkel(n, j) {
  const B = basisMatrix("monom01", n);
  const u = B.map((r) => r[j]);
  const v = B.map((r) => r[j + 1]);
  const cos = u.reduce((s, x, i) => s + x * v[i], 0) / (Math.hypot(...u) * Math.hypot(...v));
  return (Math.acos(Math.min(1, cos)) * 180) / Math.PI;
}
for (const [j, soll] of [[0, 32.55], [4, 5.47], [8, 2.72]]) {
  const ist = winkel(10, j);
  assert.ok(Math.abs(ist - soll) < 0.01, `Winkel (b_${j + 1}, b_${j + 2}) bei n=10: ${ist.toFixed(2)}° gegen ${soll}°`);
}
// Benachbarte Spalten rücken mit wachsendem Index enger zusammen.
for (let j = 0; j < 8; j++) {
  assert.ok(winkel(10, j) > winkel(10, j + 1), `Winkelfolge nicht fallend bei j=${j}`);
}

console.log("S133Monombasis: kappa_2 (Jacobi-SVD) und Spaltenwinkel bestätigt.");
