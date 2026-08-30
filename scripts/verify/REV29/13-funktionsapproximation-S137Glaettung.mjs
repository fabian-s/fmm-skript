#!/usr/bin/env node
/**
 * REV29 — S137Glaettung.tsx (SplineGlaettung), §13.7.
 *
 * Der Widget-Header führte eine Wertetabelle (RSS, sigma-Dach, RMS für
 * K = 4, 10, 11, 20, 40) und eine Zweigabdeckung („2 / 10 / 16 / 9 Zustände")
 * als verifiziert und verwies auf zwei Skripte (s153.mjs,
 * check-s153-widget.mjs), die es im Repo nicht gibt.
 *
 * UNABHÄNGIGER RECHENWEG: Der Datensatz muss bitgleich reproduziert werden
 * (derselbe mulberry32-Strom, sonst prüfte man einen anderen Datensatz), die
 * SCHÄTZUNG dagegen läuft hier anders: Das Widget wertet die B-Spline-Basis
 * über eine absteigende Cox-de-Boor-Tafel aus und löst die
 * Normalengleichungen B^T B a = B^T y per Cholesky. Hier steht eine REKURSIVE
 * Cox-de-Boor-Auswertung und ein HOUSEHOLDER-QR direkt auf der Designmatrix
 * (ohne B^T B je zu bilden); das Integral von (f-Dach - f)^2 wird nicht per
 * Simpson, sondern per 5-Punkt-Gauss-Legendre auf 200 Teilintervallen
 * genommen. Beide Wege müssen dieselben Zahlen liefern.
 */
import assert from "node:assert/strict";

const nahe = (a, b, eps, was) => assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} != ${b} (eps ${eps})`);

/* ---------- Datensatz (identischer Zufallsstrom wie im Widget) ---------- */
function mulberry32(seed) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const N = 50;
const SIGMA = 0.3;
const XMAX = 2 * Math.PI;
const SEED = 15032026;
const GRAD = 3;
const Y_FENSTER = 2.6;
const fWahr = (x) => Math.sin(x) + 0.5 * Math.sin(2 * x);

function zieheDaten() {
  const r = mulberry32(SEED);
  const xs = [];
  for (let i = 0; i < N; i++) xs.push(r() * XMAX);
  xs.sort((a, b) => a - b);
  const eps = [];
  while (eps.length < N) {
    const u1 = Math.max(r(), 1e-12);
    const u2 = r();
    const rad = SIGMA * Math.sqrt(-2 * Math.log(u1));
    eps.push(rad * Math.cos(2 * Math.PI * u2));
    if (eps.length < N) eps.push(rad * Math.sin(2 * Math.PI * u2));
  }
  const mittel = eps.reduce((a, b) => a + b, 0) / N;
  const sdEps = Math.sqrt(eps.reduce((a, b) => a + (b - mittel) ** 2, 0) / (N - 1));
  return { xs, ys: xs.map((x, i) => fWahr(x) + eps[i]), sdEps };
}
const { xs, ys, sdEps } = zieheDaten();
assert.equal(xs.length, N);
nahe(sdEps, 0.2662, 5e-5, "empirische sd der gezogenen Fehler");
nahe(xs[0], 0.05, 5e-3, "erster Datenpunkt");
nahe(xs[N - 1], 6.26, 5e-3, "letzter Datenpunkt");

/* ---------- Knoten auf den Quantilen (Typ 7) ---------- */
function quantil(sortiert, p) {
  const h = (sortiert.length - 1) * p;
  const lo = Math.floor(h);
  const hi = Math.min(lo + 1, sortiert.length - 1);
  return sortiert[lo] + (h - lo) * (sortiert[hi] - sortiert[lo]);
}
function knoten(K) {
  const m = K - GRAD;
  const t = [];
  for (let i = 0; i <= GRAD; i++) t.push(0);
  for (let i = 1; i <= m - 1; i++) t.push(quantil(xs, i / m));
  for (let i = 0; i <= GRAD; i++) t.push(XMAX);
  return t;
}

/* ---------- REKURSIVE Cox-de-Boor-Auswertung ---------- */
function Brek(t, k, q, x) {
  if (q === 0) return t[k] <= x && x < t[k + 1] ? 1 : 0;
  const d1 = t[k + q] - t[k];
  const d2 = t[k + q + 1] - t[k + 1];
  return (
    (d1 > 0 ? ((x - t[k]) / d1) * Brek(t, k, q - 1, x) : 0) +
    (d2 > 0 ? ((t[k + q + 1] - x) / d2) * Brek(t, k + 1, q - 1, x) : 0)
  );
}
/** Wie im Widget: rechts geschlossen auswerten (letztes nichtleeres Intervall). */
function basis(t, K, x) {
  const xx = Math.min(Math.max(x, t[0]), t[t.length - 1]);
  const y = xx >= t[t.length - 1] ? t[t.length - 1] - 1e-12 : xx;
  return Array.from({ length: K }, (_, k) => Brek(t, k, GRAD, y));
}

/* ---------- Partition der Eins und Nichtnegativität ---------- */
{
  let maxAbw = 0;
  let minWert = Infinity;
  for (const K of [4, 7, 11, 20, 40]) {
    const t = knoten(K);
    for (let i = 0; i <= 400; i++) {
      const x = (i / 400) * XMAX;
      const b = basis(t, K, x);
      maxAbw = Math.max(maxAbw, Math.abs(b.reduce((s, v) => s + v, 0) - 1));
      minWert = Math.min(minWert, Math.min(...b));
    }
  }
  assert.ok(maxAbw < 1e-14, `Partition der Eins verletzt: ${maxAbw}`);
  assert.ok(minWert >= 0, `negative Basiswerte: ${minWert}`);
}

/* ---------- Householder-QR auf der Designmatrix ---------- */
function kqQR(B, y) {
  const n = B.length;
  const m = B[0].length;
  const R = B.map((r) => r.slice());
  const b = y.slice();
  for (let j = 0; j < m; j++) {
    let norm = 0;
    for (let i = j; i < n; i++) norm += R[i][j] * R[i][j];
    norm = Math.sqrt(norm);
    if (norm < 1e-13) return null;
    const alpha = R[j][j] > 0 ? -norm : norm;
    const v = new Array(n).fill(0);
    v[j] = R[j][j] - alpha;
    for (let i = j + 1; i < n; i++) v[i] = R[i][j];
    const vv = v.reduce((s, x) => s + x * x, 0);
    if (vv === 0) continue;
    for (let c = j; c < m; c++) {
      let s = 0;
      for (let i = j; i < n; i++) s += v[i] * R[i][c];
      s = (2 * s) / vv;
      for (let i = j; i < n; i++) R[i][c] -= s * v[i];
    }
    let s = 0;
    for (let i = j; i < n; i++) s += v[i] * b[i];
    s = (2 * s) / vv;
    for (let i = j; i < n; i++) b[i] -= s * v[i];
  }
  const a = new Array(m).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    let s = b[i];
    for (let k = i + 1; k < m; k++) s -= R[i][k] * a[k];
    a[i] = s / R[i][i];
  }
  return a;
}

/* ---------- Gauss-Legendre (5 Punkte) statt Simpson ---------- */
const GL_X = [
  -0.906179845938664, -0.5384693101056831, 0, 0.5384693101056831, 0.906179845938664,
];
const GL_W = [
  0.23692688505618908, 0.47862867049936647, 0.5688888888888889, 0.47862867049936647,
  0.23692688505618908,
];

function fit(K) {
  const t = knoten(K);
  const B = xs.map((x) => basis(t, K, x));
  const a = kqQR(B, ys);
  if (!a) return null;
  const wert = (x) => basis(t, K, x).reduce((s, v, k) => s + v * a[k], 0);
  let rss = 0;
  for (let i = 0; i < N; i++) rss += (ys[i] - wert(xs[i])) ** 2;
  const teil = 200;
  const h = XMAX / teil;
  let integral = 0;
  for (let s = 0; s < teil; s++) {
    const mitte = (s + 0.5) * h;
    for (let g = 0; g < 5; g++) {
      const x = mitte + (GL_X[g] * h) / 2;
      integral += ((GL_W[g] * h) / 2) * (wert(x) - fWahr(x)) ** 2;
    }
  }
  // Extrema auf demselben Raster wie das Widget, damit Fensterlauf und
  // max |f-Dach - f| vergleichbar bleiben.
  let maxAbw = 0;
  let argMax = 0;
  let minWert = Infinity;
  let maxWert = -Infinity;
  for (let i = 0; i <= 2000; i++) {
    const x = (i / 2000) * XMAX;
    const v = wert(x);
    const d = Math.abs(v - fWahr(x));
    if (d > maxAbw) {
      maxAbw = d;
      argMax = x;
    }
    minWert = Math.min(minWert, v);
    maxWert = Math.max(maxWert, v);
  }
  return {
    K,
    rss,
    sigmaHut: Math.sqrt(rss / (N - K)),
    rms: Math.sqrt(integral / XMAX),
    maxAbw,
    argMax,
    minWert,
    maxWert,
    innere: t.length - 2 * (GRAD + 1),
  };
}

/* ---------- 1. Die fünf Header-Zeilen ---------- */
const TABELLE = [
  // K, RSS, sigmaHut, RMS, maxAbw
  [4, 6.421, 0.374, 0.2471, 0.467],
  [10, 3.084, 0.278, 0.0864, 0.532],
  [11, 3.151, 0.284, 0.0724, null],
  [20, 2.46, 0.286, 0.2692, 2.223],
  [40, 0.557, 0.236, 1.9078, 8.574],
];
for (const [K, rss, sig, rms, maxAbw] of TABELLE) {
  const f = fit(K);
  assert.ok(f, `K = ${K}: kein Fit`);
  nahe(f.rss, rss, 5e-4, `RSS bei K=${K}`);
  nahe(f.sigmaHut, sig, 5e-4, `sigma-Dach bei K=${K}`);
  nahe(f.rms, rms, 5e-4, `RMS |f-Dach - f| bei K=${K}`);
  if (maxAbw !== null) nahe(f.maxAbw, maxAbw, 1e-3, `max |f-Dach - f| bei K=${K}`);
}

/* ---------- 2. K = 11 ist im Reglerbereich der beste RMS ---------- */
{
  const alle = [];
  for (let K = 4; K <= 40; K++) alle.push(fit(K));
  assert.ok(alle.every(Boolean), "ein K im Reglerbereich liefert keinen Fit (Singulär-Zweig feuert doch)");
  const bester = alle.reduce((a, b) => (b.rms < a.rms ? b : a));
  assert.equal(bester.K, 11, `bester RMS bei K = ${bester.K}, nicht 11`);
  // Die RSS zeigt in die falsche Richtung: sie fällt über den Reglerbereich
  // hinweg deutlich, während der Abstand zum wahren f gerade davonläuft.
  // (Streng monoton ist sie nicht, weil die Quantilknoten mit K wandern und
  // die Ansatzräume deshalb nicht ineinander liegen.)
  assert.ok(alle[alle.length - 1].rss < 0.2 * alle[0].rss, "RSS fällt über den Reglerbereich nicht deutlich");
  assert.ok(alle[alle.length - 1].rms > 5 * bester.rms, "RMS läuft bei großem K nicht davon");

  /* ---------- 3. Zweigabdeckung der vier Statustexte ---------- */
  const zweig = (f) => {
    if (f.K <= 5) return "starr";
    if (f.maxWert > Y_FENSTER || f.minWert < -Y_FENSTER) return "fenster";
    if (f.rms > 0.18) return "ausschlag";
    return "passend";
  };
  const zaehler = { starr: 0, fenster: 0, ausschlag: 0, passend: 0 };
  for (const f of alle) zaehler[zweig(f)]++;
  assert.equal(alle.length, 37, "der Regler hat nicht 37 Zustände");
  assert.deepEqual(
    zaehler,
    { starr: 2, fenster: 9, ausschlag: 16, passend: 10 },
    `Zweigverteilung: ${JSON.stringify(zaehler)}`,
  );
  // Jeder beworbene Preset landet im gemeinten Zweig.
  assert.equal(zweig(fit(4)), "starr");
  assert.equal(zweig(fit(11)), "passend");
  assert.equal(zweig(fit(40)), "fenster");
}

console.log("S137Glaettung: Wertetabelle, bester RMS bei K = 11 und Zweigabdeckung 2/9/16/10 bestätigt.");
