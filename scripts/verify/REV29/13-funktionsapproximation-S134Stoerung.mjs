#!/usr/bin/env node
/**
 * REV29 — S134Stoerung.tsx (StoerungVergleich), §13.4.
 *
 * Der Widget-Header führte die Beträge 1,000 / 2,320 / 0,037 und die
 * Koeffizientenreihe 1,732 / 0,464 / 0,124 / 0,031 / 0,010 als „verifiziert"
 * und verwies auf verify-hdr.mjs. Dort stand für dieses Widget nur eine
 * Nichtnull-Zählung und die Tautologie assert.equal(9,9). Dieses Skript
 * rechnet die Zahlen nach.
 *
 * UNABHÄNGIGER RECHENWEG: Das Widget baut eine B-Spline-Kollokationsmatrix
 * (Cox-de-Boor rekursiv, zweite Ableitung über die Ableitungsrekursion) und
 * löst sie mit Gauss-Elimination und Spaltenpivotierung; das Polynom wertet es
 * in Newton-Darstellung aus. Hier steht (1) der natürliche kubische Spline in
 * der klassischen MOMENTENFORM (tridiagonales System, Thomas-Algorithmus,
 * ganz ohne B-Splines) und (2) das Interpolationspolynom in BARYZENTRISCHER
 * Lagrange-Form. Erst danach wird die B-Spline-Darstellung mit einer
 * ITERATIVEN Cox-de-Boor-Auswertung und einem HOUSEHOLDER-QR aufgebaut; dass
 * sie punktweise mit der Momentenform übereinstimmt, ist die eigentliche
 * Kreuzprobe.
 */
import assert from "node:assert/strict";

const XS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const YS = [0.2, 0.9, 1.4, 1.6, 1.5, 1.2, 0.9, 0.7, 0.6];
const Q = 3;
const nahe = (a, b, eps, was) => assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} != ${b} (eps ${eps})`);

/* ---------- (1) Natürlicher kubischer Spline über Momente ---------- */
function momentenSpline(ys) {
  const n = XS.length;
  const h = 1; // äquidistantes Gitter 1..9
  // M_1 = M_n = 0, dazwischen: M_{i-1} + 4 M_i + M_{i+1} = 6 (y_{i+1} - 2 y_i + y_{i-1})
  const m = n - 2;
  const a = new Array(m).fill(1);
  const b = new Array(m).fill(4);
  const c = new Array(m).fill(1);
  const d = Array.from({ length: m }, (_, k) => 6 * (ys[k + 2] - 2 * ys[k + 1] + ys[k]));
  // Thomas-Algorithmus
  for (let i = 1; i < m; i++) {
    const w = a[i] / b[i - 1];
    b[i] -= w * c[i - 1];
    d[i] -= w * d[i - 1];
  }
  const M = new Array(n).fill(0);
  M[m] = d[m - 1] / b[m - 1];
  for (let i = m - 2; i >= 0; i--) M[i + 1] = (d[i] - c[i] * M[i + 2]) / b[i];
  return (x) => {
    let i = Math.min(n - 2, Math.max(0, Math.floor(x - XS[0])));
    const xl = XS[i];
    const xr = XS[i + 1];
    return (
      (M[i] * (xr - x) ** 3) / (6 * h) +
      (M[i + 1] * (x - xl) ** 3) / (6 * h) +
      ((ys[i] - (M[i] * h * h) / 6) * (xr - x)) / h +
      ((ys[i + 1] - (M[i + 1] * h * h) / 6) * (x - xl)) / h
    );
  };
}

/* ---------- (2) Interpolationspolynom, baryzentrisch ---------- */
function baryPolynom(ys) {
  const w = XS.map((xi, i) => 1 / XS.reduce((p, xj, j) => (i === j ? p : p * (xi - xj)), 1));
  return (x) => {
    for (let i = 0; i < XS.length; i++) if (Math.abs(x - XS[i]) < 1e-13) return ys[i];
    let za = 0;
    let ne = 0;
    for (let i = 0; i < XS.length; i++) {
      const q = w[i] / (x - XS[i]);
      za += q * ys[i];
      ne += q;
    }
    return za / ne;
  };
}

/* ---------- (3) B-Spline-Darstellung: iterativ + Householder-QR ---------- */
const TAU = [
  ...Array(Q + 1).fill(XS[0]),
  ...XS.slice(1, XS.length - 1),
  ...Array(Q + 1).fill(XS[XS.length - 1]),
];
const K = TAU.length - Q - 1;
assert.equal(TAU.length, XS.length - 1 + 2 * Q + 1, "Knotenzahl m + 2q + 1 stimmt nicht");
assert.equal(K, XS.length - 1 + Q, "Basiszahl m + q stimmt nicht");

/** Alle B_k^{(grad)} an der Stelle x, aufsteigend aufgebaut (nicht rekursiv). */
function bAlle(grad, x) {
  const nb = TAU.length - 1;
  let stufe = new Array(nb).fill(0);
  for (let i = 0; i < nb; i++) if (TAU[i] <= x && x < TAU[i + 1]) stufe[i] = 1;
  for (let q = 1; q <= grad; q++) {
    const naechste = new Array(nb - q).fill(0);
    for (let i = 0; i < nb - q; i++) {
      let s = 0;
      const d1 = TAU[i + q] - TAU[i];
      if (d1 > 0) s += ((x - TAU[i]) / d1) * stufe[i];
      const d2 = TAU[i + q + 1] - TAU[i + 1];
      if (d2 > 0) s += ((TAU[i + q + 1] - x) / d2) * stufe[i + 1];
      naechste[i] = s;
    }
    stufe = naechste;
  }
  return stufe;
}
const bWert = (k, x) => bAlle(Q, Math.min(x, XS[8] - 1e-9))[k];
/** Zweite Ableitung über die Ableitungsformel, angewandt auf die Stufe q-2. */
function bD2(k, x) {
  const xx = Math.min(x, XS[8] - 1e-9);
  const g = bAlle(Q - 2, xx);
  const teil = (i) => {
    const d1 = TAU[i + Q - 1] - TAU[i];
    const d2 = TAU[i + Q] - TAU[i + 1];
    return (
      (d1 > 0 ? ((Q - 1) / d1) * g[i] : 0) - (d2 > 0 ? ((Q - 1) / d2) * g[i + 1] : 0)
    );
  };
  const e1 = TAU[k + Q] - TAU[k];
  const e2 = TAU[k + Q + 1] - TAU[k + 1];
  return (e1 > 0 ? (Q / e1) * teil(k) : 0) - (e2 > 0 ? (Q / e2) * teil(k + 1) : 0);
}

const A = [
  Array.from({ length: K }, (_, k) => bD2(k, XS[0])),
  ...XS.map((x) => Array.from({ length: K }, (_, k) => bWert(k, x))),
  Array.from({ length: K }, (_, k) => bD2(k, XS[8])),
];

/** Quadratisches System über Householder-QR lösen (kein Gauss, kein Pivot). */
function loeseQR(Ain, bin) {
  const n = Ain.length;
  const m = Ain[0].length;
  const R = Ain.map((r) => r.slice());
  const b = bin.slice();
  for (let j = 0; j < m; j++) {
    let norm = 0;
    for (let i = j; i < n; i++) norm += R[i][j] * R[i][j];
    norm = Math.sqrt(norm);
    if (norm < 1e-14) throw new Error("QR: singuläre Spalte " + j);
    const alpha = R[j][j] > 0 ? -norm : norm;
    const v = new Array(n).fill(0);
    v[j] = R[j][j] - alpha;
    for (let i = j + 1; i < n; i++) v[i] = R[i][j];
    const vv = v.reduce((s, x) => s + x * x, 0);
    if (vv > 0) {
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
  }
  const x = new Array(m).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    let s = b[i];
    for (let k = i + 1; k < m; k++) s -= R[i][k] * x[k];
    x[i] = s / R[i][i];
  }
  return x;
}

const koeff = (ys) => loeseQR(A, [0, ...ys, 0]);
const bSpline = (ys) => {
  const a = koeff(ys);
  return (x) => a.reduce((s, ak, k) => s + ak * bWert(k, x), 0);
};

/* ---------- Kreuzprobe: beide Splinewege liefern dieselbe Funktion ---------- */
{
  const s1 = momentenSpline(YS);
  const s2 = bSpline(YS);
  let schlimmst = 0;
  for (let i = 0; i <= 800; i++) {
    const x = 1 + (8 * i) / 800;
    schlimmst = Math.max(schlimmst, Math.abs(s1(x) - s2(x)));
  }
  assert.ok(schlimmst < 1e-9, `Momentenform und B-Spline-Kollokation weichen um ${schlimmst} ab`);
  for (let i = 0; i < XS.length; i++) nahe(s1(XS[i]), YS[i], 1e-12, `Interpolation an x=${XS[i]}`);
}

/* ---------- Die Zahlen des Headers: j = 5, x = 4 (0-basiert), delta = 1 ---------- */
function kennzahlen(j, delta) {
  const gestoert = YS.map((v, i) => (i === j - 1 ? v + delta : v));
  const sVor = momentenSpline(YS);
  const sNach = momentenSpline(gestoert);
  const pVor = baryPolynom(YS);
  const pNach = baryPolynom(gestoert);
  let maxS = 0;
  let maxP = 0;
  let fernS = 0;
  let fernP = 0;
  for (let i = 0; i <= 400; i++) {
    const x = XS[0] + (8 * i) / 400;
    const ds = Math.abs(sNach(x) - sVor(x));
    const dp = Math.abs(pNach(x) - pVor(x));
    maxS = Math.max(maxS, ds);
    maxP = Math.max(maxP, dp);
    if (Math.abs(x - XS[j - 1]) > 2) {
      fernS = Math.max(fernS, ds);
      fernP = Math.max(fernP, dp);
    }
  }
  return { maxS, maxP, fernS, fernP };
}

{
  const { maxS, maxP, fernS, fernP } = kennzahlen(5, 1);
  nahe(maxS, 1.0, 5e-4, "max |Delta| Spline");
  nahe(maxP, 2.32, 5e-4, "max |Delta| Polynom");
  nahe(fernS, 0.037, 5e-4, "fern |Delta| Spline");
  nahe(fernP, 2.32, 5e-4, "fern |Delta| Polynom");
  assert.ok(fernP > 50 * fernS, "die Fernwirkung des Polynoms ist nicht um Größenordnungen größer");
}

/* ---------- Koeffizientenprofil: Spitze und Flanken ---------- */
{
  const dc = koeff(YS.map((v, i) => (i === 4 ? v + 1 : v))).map((v, i) => Math.abs(v - koeff(YS)[i]));
  const spitze = dc.indexOf(Math.max(...dc));
  const reihe = [dc[spitze], dc[spitze + 1], dc[spitze + 2], dc[spitze + 3], dc[spitze + 4]];
  const soll = [1.732, 0.464, 0.124, 0.031, 0.01];
  reihe.forEach((v, i) => nahe(v, soll[i], 6e-4, `Koeffizientenänderung Rang ${i}`));
  // Die Flanke fällt je Knotenabstand auf rund ein Viertel (Faktor 3,7 im Header).
  for (let i = 0; i + 1 < 4; i++) {
    const q = reihe[i] / reihe[i + 1];
    assert.ok(q > 3.2 && q < 4.3, `Flankenverhältnis ${q.toFixed(2)} außerhalb 3,2..4,3`);
  }
  // Das Profil ist symmetrisch um die Spitze (der Punkt sitzt in der Mitte).
  for (let d = 1; d <= 4; d++) nahe(dc[spitze - d], dc[spitze + d], 1e-9, `Symmetrie der Flanke im Abstand ${d}`);
  // Die beiden RANDkoeffizienten sind an die Randdaten gekoppelt (a_1 = y_1,
  // a_K = y_n beim offenen Knotenvektor) und bewegen sich daher gar nicht.
  nahe(dc[0], 0, 1e-12, "a_1 hängt nicht an y_1");
  nahe(dc[K - 1], 0, 1e-9, "a_K hängt nicht an y_n");
  // Dazwischen fällt die Flanke, bricht aber nicht ab.
  for (let i = 1; i <= K - 2; i++) assert.ok(dc[i] > 0, `innerer Koeffizient a_${i + 1} unverändert`);
  assert.equal(dc.filter((v) => v > 0.01).length, 9, "Zahl der spürbar geänderten Koeffizienten");
}

/* ---------- Besetzungsmuster: Band gegen voll ---------- */
{
  const zeilen = XS.map((x) => Array.from({ length: K }, (_, k) => bWert(k, x)));
  for (const z of zeilen) {
    assert.ok(z.filter((v) => Math.abs(v) > 1e-12).length <= Q + 1, "mehr als q+1 Nichtnullen je Kollokationszeile");
  }
  const vandermonde = XS.flatMap((x) => XS.map((_, s) => x ** s));
  assert.equal(vandermonde.length, 81);
  assert.equal(vandermonde.filter((v) => Math.abs(v) > 1e-12).length, 81, "die Vandermonde-Matrix ist nicht voll besetzt");
  const bandNichtnull = A.flat().filter((v) => Math.abs(v) > 1e-12).length;
  assert.ok(bandNichtnull < 0.4 * A.length * K, `Bandmatrix zu dicht besetzt: ${bandNichtnull} von ${A.length * K}`);
}

/* ---------- Randfälle, die das Verdikt erklären muss ---------- */
{
  for (const [j, delta] of [[1, -2], [9, 2], [1, 2], [9, -2]]) {
    const { fernS, fernP } = kennzahlen(j, delta);
    assert.ok(fernP <= 4 * fernS, `bei j=${j}, delta=${delta} ist die Fernwirkung doch klar getrennt`);
  }
  for (const j of [3, 4, 5, 6, 7]) {
    const { fernS, fernP } = kennzahlen(j, 1);
    assert.ok(fernP > 4 * fernS, `in der Mitte (j=${j}) trennt sich die Fernwirkung nicht`);
  }
}

console.log("S134Stoerung: Fernwirkung, Koeffizientenprofil und Besetzungsmuster bestätigt.");
