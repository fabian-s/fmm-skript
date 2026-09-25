#!/usr/bin/env node
/**
 * REV29 — S138BiasVarianz.tsx (BiasVarianzExplorer), §13.8.
 *
 * Der Widget-Header führte die ganze Ergebnistabelle (Bias^2, Varianz, MSE für
 * sechs K) als „verifiziert (s154.mjs)"; dieses Skript gab es nicht, gedeckt
 * war allein sigma^2 K/n bei K = 12.
 *
 * UNABHÄNGIGER RECHENWEG: Entwurfsstellen und Rauschvektoren müssen bitgleich
 * sein (sonst prüfte man eine andere Simulation), die SCHÄTZUNG läuft anders:
 * Das Widget bildet B^T B und zerlegt per Cholesky. Hier steht ein
 * HOUSEHOLDER-QR direkt auf B, die B-Splines werden REKURSIV ausgewertet, und
 * Bias^2/Varianz/MSE werden zusätzlich ANALYTISCH aus der Hutmatrix
 * H = Q Q^T gegengerechnet (Bias = (H - I) f, mittlere Varianz = sigma^2
 * spur(H)/n) — zwei voneinander unabhängige Wege zu denselben Zahlen.
 */
import assert from "node:assert/strict";

const nahe = (a, b, eps, was) => assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} != ${b} (eps ${eps})`);

function mulberry32(seed) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const A0 = 0;
const B_END = 2 * Math.PI;
const N = 100;
const SIGMA = 0.3;
const R = 200;
const Q = 3;
const K_MIN = 4;
const K_MAX = 40;
const f = (x) => Math.sin(3 * x);

/* ---------- Entwurfsstellen und Rauschen (identischer Strom) ---------- */
const rngX = mulberry32(20250813);
const xs = Array.from({ length: N }, () => A0 + (B_END - A0) * rngX()).sort((p, q) => p - q);
const fx = xs.map(f);
const rngE = mulberry32(77002);
const eps = [];
for (let r = 0; r < R; r++) {
  const row = new Float64Array(N);
  for (let i = 0; i < N; i += 2) {
    const u1 = Math.max(rngE(), 1e-12);
    const u2 = rngE();
    const rad = Math.sqrt(-2 * Math.log(u1));
    row[i] = rad * Math.cos(2 * Math.PI * u2);
    if (i + 1 < N) row[i + 1] = rad * Math.sin(2 * Math.PI * u2);
  }
  eps.push(row);
}
{
  // Die Rauschvektoren sind standardnormal: Mittel ~ 0, Streuung ~ 1.
  const alle = eps.flatMap((r) => Array.from(r));
  const m = alle.reduce((s, v) => s + v, 0) / alle.length;
  const sd = Math.sqrt(alle.reduce((s, v) => s + (v - m) ** 2, 0) / (alle.length - 1));
  assert.ok(Math.abs(m) < 0.01, `Rauschmittel ${m}`);
  assert.ok(Math.abs(sd - 1) < 0.01, `Rauschstreuung ${sd}`);
}

/* ---------- Basis: rekursive Cox-de-Boor-Auswertung ---------- */
function knotenVektor(K) {
  const m = K - Q - 1;
  const t = [];
  for (let i = 0; i <= Q; i++) t.push(A0);
  for (let i = 1; i <= m; i++) t.push(A0 + (i * (B_END - A0)) / (m + 1));
  for (let i = 0; i <= Q; i++) t.push(B_END);
  return t;
}
function Brek(t, k, q, x) {
  if (q === 0) return t[k] <= x && x < t[k + 1] ? 1 : 0;
  const d1 = t[k + q] - t[k];
  const d2 = t[k + q + 1] - t[k + 1];
  return (
    (d1 > 0 ? ((x - t[k]) / d1) * Brek(t, k, q - 1, x) : 0) +
    (d2 > 0 ? ((t[k + q + 1] - x) / d2) * Brek(t, k + 1, q - 1, x) : 0)
  );
}
function basis(t, K, x) {
  const y = x >= t[t.length - 1] ? t[t.length - 1] - 1e-12 : x;
  return Array.from({ length: K }, (_, k) => Brek(t, k, Q, y));
}

/* ---------- Householder-QR: Q (dünn) und Rücksubstitution ---------- */
function qr(B) {
  const n = B.length;
  const m = B[0].length;
  const Rm = B.map((r) => r.slice());
  const vs = [];
  for (let j = 0; j < m; j++) {
    let norm = 0;
    for (let i = j; i < n; i++) norm += Rm[i][j] * Rm[i][j];
    norm = Math.sqrt(norm);
    if (norm < 1e-13) return null;
    const alpha = Rm[j][j] > 0 ? -norm : norm;
    const v = new Float64Array(n);
    v[j] = Rm[j][j] - alpha;
    for (let i = j + 1; i < n; i++) v[i] = Rm[i][j];
    const vv = v.reduce((s, x) => s + x * x, 0);
    vs.push({ v, vv });
    if (vv === 0) continue;
    for (let c = j; c < m; c++) {
      let s = 0;
      for (let i = j; i < n; i++) s += v[i] * Rm[i][c];
      s = (2 * s) / vv;
      for (let i = j; i < n; i++) Rm[i][c] -= s * v[i];
    }
  }
  const anwenden = (y) => {
    const b = Float64Array.from(y);
    for (let j = 0; j < m; j++) {
      const { v, vv } = vs[j];
      if (vv === 0) continue;
      let s = 0;
      for (let i = j; i < n; i++) s += v[i] * b[i];
      s = (2 * s) / vv;
      for (let i = j; i < n; i++) b[i] -= s * v[i];
    }
    return b;
  };
  const loese = (y) => {
    const b = anwenden(y);
    const a = new Float64Array(m);
    for (let i = m - 1; i >= 0; i--) {
      let s = b[i];
      for (let k = i + 1; k < m; k++) s -= Rm[i][k] * a[k];
      a[i] = s / Rm[i][i];
    }
    return a;
  };
  return { loese, m, n };
}

function lauf(K) {
  const t = knotenVektor(K);
  const Bm = xs.map((x) => basis(t, K, x));
  const z = qr(Bm);
  if (!z) return null;
  const summe = new Float64Array(N);
  const summeQuad = new Float64Array(N);
  const summeFehler = new Float64Array(N);
  for (let r = 0; r < R; r++) {
    const y = Float64Array.from(fx, (v, i) => v + SIGMA * eps[r][i]);
    const a = z.loese(y);
    for (let i = 0; i < N; i++) {
      let v = 0;
      for (let k = 0; k < K; k++) v += a[k] * Bm[i][k];
      summe[i] += v;
      summeQuad[i] += v * v;
      summeFehler[i] += (v - fx[i]) ** 2;
    }
  }
  let bias2 = 0;
  let varianz = 0;
  let mse = 0;
  for (let i = 0; i < N; i++) {
    const mit = summe[i] / R;
    bias2 += ((mit - fx[i]) ** 2) / N;
    varianz += (summeQuad[i] / R - mit * mit) / N;
    mse += summeFehler[i] / R / N;
  }
  // Analytischer Gegenweg: Hutmatrix-Spalten aus e_i, Bias aus rauschfreien Daten.
  const spur = (() => {
    let s = 0;
    for (let i = 0; i < N; i++) {
      const e = new Float64Array(N);
      e[i] = 1;
      const a = z.loese(e);
      let hii = 0;
      for (let k = 0; k < K; k++) hii += a[k] * Bm[i][k];
      s += hii;
    }
    return s;
  })();
  const a0 = z.loese(Float64Array.from(fx));
  let bias2Exakt = 0;
  for (let i = 0; i < N; i++) {
    let v = 0;
    for (let k = 0; k < K; k++) v += a0[k] * Bm[i][k];
    bias2Exakt += ((v - fx[i]) ** 2) / N;
  }
  return { K, bias2, varianz, mse, spur, bias2Exakt };
}

/* ---------- 1. Die sechs Header-Zeilen ---------- */
const TABELLE = [
  // K, Bias^2, Varianz (MC), Theorie sigma^2 K/n, MSE
  [5, 0.4103, 0.0044, 0.0045, 0.4147],
  [8, 0.0344, 0.0071, 0.0072, 0.0415],
  [9, 0.1174, 0.008, 0.0081, 0.1254],
  [12, 0.0013, 0.0107, 0.0108, 0.012],
  [15, 0.0001, 0.0135, 0.0135, 0.0136],
  [40, 0.0001, 0.0358, 0.036, 0.036],
];
for (const [K, bias2, varianz, theorie, mse] of TABELLE) {
  const l = lauf(K);
  assert.ok(l, `K = ${K}: kein Fit`);
  nahe(l.bias2, bias2, 5e-5, `Bias^2 bei K=${K}`);
  nahe(l.varianz, varianz, 5e-5, `MC-Varianz bei K=${K}`);
  nahe(l.mse, mse, 5e-5, `MSE bei K=${K}`);
  nahe((SIGMA * SIGMA * K) / N, theorie, 5e-5, `Theoriewert sigma^2 K/n bei K=${K}`);
  // Spur der Hutmatrix ist exakt K, deshalb ist die Theorieformel keine Näherung.
  nahe(l.spur, K, 1e-8, `Spur der Hutmatrix bei K=${K}`);
  // Der analytisch aus rauschfreien Daten gerechnete Bias trifft den simulierten.
  nahe(l.bias2Exakt, l.bias2, 2e-4, `Bias^2 analytisch gegen simuliert bei K=${K}`);
  // Zerlegung MSE = Bias^2 + Varianz (bis auf den 1/R-Bias der MC-Varianz).
  nahe(l.mse, l.bias2 + l.varianz, 3e-4, `Zerlegung bei K=${K}`);
}

/* ---------- 2. Das Minimum liegt bei K = 12, das Plateau ist 12..14 ---------- */
{
  const alle = [];
  for (let K = K_MIN; K <= K_MAX; K++) {
    const l = lauf(K);
    assert.ok(l, `K = ${K} fällt aus`);
    alle.push(l);
  }
  const bestes = alle.reduce((a, b) => (b.mse < a.mse ? b : a));
  assert.equal(bestes.K, 12, `MSE-Minimum bei K = ${bestes.K}, nicht 12`);
  const plateau = alle.filter((l) => l.mse <= 1.1 * bestes.mse).map((l) => l.K);
  assert.deepEqual(plateau, [12, 13, 14], `Zehn-Prozent-Plateau: ${plateau.join(", ")}`);
  // Bias fällt, Varianz steigt — das ist die Aussage des Abschnitts.
  assert.ok(alle[0].bias2 > 100 * bestes.bias2, "der Bias fällt nicht deutlich");
  for (let i = 1; i < alle.length; i++) {
    assert.ok(alle[i].varianz > alle[i - 1].varianz, `Varianz nicht monoton bei K=${alle[i].K}`);
  }
  // Der Anteil der Varianz am MSE im Minimum: die „Ein-Neuntel"-Beobachtung.
  const anteilBias = bestes.bias2 / bestes.mse;
  assert.ok(anteilBias > 0.09 && anteilBias < 0.13, `Bias-Anteil im Minimum ${anteilBias}`);
}

console.log("S138BiasVarianz: Tabelle, Spur(H) = K, Zerlegung und Minimum bei K = 12 bestätigt.");
