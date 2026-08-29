#!/usr/bin/env node
/**
 * REV29 — die Zahlenclaims der Kapitel-3-Widgets
 * S31SpurWidget, S32VecNormWidget, S33OperatornormWidget, S34SchattenWidget
 * und S35Aequivalenz. Alle fünf trugen bisher nur „historische Notiz"-Header.
 *
 * Unabhängiger Rechenweg: Singulärwerte kommen hier aus einer Abtastung des
 * Einheitskreises (σ₁ = max ‖Ax‖, σ₂ = min ‖Ax‖) und aus der geschlossenen
 * Formel; beide werden gegeneinander gehalten. Eigenwerte werden zusätzlich
 * durch Einsetzen in das charakteristische Polynom geprüft.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const lies = (p) => readFileSync(join(repo, p), "utf8");
const nah = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

/* -------------------------------------------------------------- Werkzeuge */

const matMul = (a, b) => [
  [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
  [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
];
function sv(m) {
  const p = m[0][0] ** 2 + m[1][0] ** 2;
  const q = m[0][0] * m[0][1] + m[1][0] * m[1][1];
  const r = m[0][1] ** 2 + m[1][1] ** 2;
  const halb = (p + r) / 2;
  const d = Math.hypot((p - r) / 2, q);
  return [Math.sqrt(Math.max(halb + d, 0)), Math.sqrt(Math.max(halb - d, 0))];
}
/** Unabhängig: Extrema von ‖Ax‖ über den Einheitskreis. */
function svAbtastung(m, n = 400000) {
  let lo = Infinity;
  let hi = 0;
  for (let i = 0; i < n; i++) {
    const t = (2 * Math.PI * i) / n;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const v = Math.hypot(m[0][0] * c + m[0][1] * s, m[1][0] * c + m[1][1] * s);
    if (v > hi) hi = v;
    if (v < lo) lo = v;
  }
  return [hi, lo];
}
const drehung = (grad) => {
  const t = (grad * Math.PI) / 180;
  return [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]];
};
const frob = (m) => Math.hypot(m[0][0], m[0][1], m[1][0], m[1][1]);
const summennorm = (m) => m.flat().reduce((a, x) => a + Math.abs(x), 0);
const maxnorm = (m) => Math.max(...m.flat().map(Math.abs));

/* ------------------------------------------------- S31: Spur und Eigenwerte */

function eigen(m) {
  const tr = m[0][0] + m[1][1];
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const disc = tr * tr - 4 * det;
  return disc >= 0
    ? { real: true, l1: (tr + Math.sqrt(disc)) / 2, l2: (tr - Math.sqrt(disc)) / 2, tr, det, disc }
    : { real: false, re: tr / 2, im: Math.sqrt(-disc) / 2, tr, det, disc };
}
for (const [m, erwartet] of [
  [[[2, -1], [0, 3]], [3, 2]],
  [[[2, 1], [1, 3]], [3.618034, 1.381966]],
  [[[2, 1], [0, 2]], [2, 2]],
]) {
  const e = eigen(m);
  assert.ok(e.real);
  nah(Math.max(e.l1, e.l2), erwartet[0], 1e-6);
  nah(Math.min(e.l1, e.l2), erwartet[1], 1e-6);
  // charakteristisches Polynom: λ² − tr·λ + det = 0
  for (const l of [e.l1, e.l2]) nah(l * l - e.tr * l + e.det, 0, 1e-9);
  // Satz: Spur = Summe der Eigenwerte
  nah(e.l1 + e.l2, m[0][0] + m[1][1], 1e-12);
}
// Drehung um 90°: rein imaginäres Paar ±i, Spur 0.
const dreh90 = eigen([[0, -1], [1, 0]]);
assert.equal(dreh90.real, false);
nah(dreh90.re, 0, 1e-15);
nah(dreh90.im, 1, 1e-15);
nah(2 * dreh90.re, 0, 1e-15);

// Drei-Zustands-Regel: die Diskriminante der KONTROLLIERTEN Einträge trifft die
// Entartung exakt, die Toleranz auf den Eigenwerten wäre nicht nötig gewesen.
const disc = (m) => (m[0][0] - m[1][1]) ** 2 + 4 * m[0][1] * m[1][0];
assert.equal(disc([[2, 1], [0, 2]]), 0);
assert.notEqual(disc([[2, 1], [0, 3]]), 0);
// Die neue Zwischenklasse ist erreichbar und liegt zwischen den beiden anderen.
const fastEntartet = [[2, 0.001], [0.001, 2.0005]];
assert.ok(disc(fastEntartet) > 0);
const skala = fastEntartet.flat().reduce((a, v) => a + v * v, 0);
assert.ok(disc(fastEntartet) < 1e-3 * skala, "fast entartete Matrix fällt nicht in den neuen Zweig");
const s31 = lies("src/chapters/03-matrix-spur-norm/widgets/S31SpurWidget.tsx");
assert.ok(/fastDoppelt/.test(s31), "Zweig fast-zusammengefallen fehlt");
assert.ok(!/Math\.abs\(e\.l1 - e\.l2\) < 1e-9/.test(s31), "Toleranz auf abgeleiteten Eigenwerten zurück");

/* --------------------------------------------- S32: Vektorisierungsnormen */

const A1 = [[1, 0], [0, 1]];
const A2 = [[0, 1], [1, 0]];
const A3 = [[Math.SQRT2, 0], [0, 0]];
for (const A of [A1, A2, A3]) nah(frob(A), Math.SQRT2, 1e-12);
assert.deepEqual([summennorm(A1), summennorm(A2)], [2, 2]);
nah(summennorm(A3), Math.SQRT2, 1e-12);
assert.deepEqual([maxnorm(A1), maxnorm(A2)], [1, 1]);
nah(maxnorm(A3), Math.SQRT2, 1e-12);
const B = [[1, -2], [3, 4]];
nah(frob(B), Math.sqrt(30), 1e-12);
nah(frob(B), 5.477226, 1e-6);
assert.equal(summennorm(B), 10);
assert.equal(maxnorm(B), 4);

/* ------------------------------------------------- S33: Operatornormen */

const norm1 = (A) => Math.max(Math.abs(A[0][0]) + Math.abs(A[1][0]), Math.abs(A[0][1]) + Math.abs(A[1][1]));
const normInf = (A) => Math.max(Math.abs(A[0][0]) + Math.abs(A[0][1]), Math.abs(A[1][0]) + Math.abs(A[1][1]));

const P1 = [[2, 1], [0, 1]];
const [p1s1, p1s2] = sv(P1);
nah(p1s1, 2.288246, 1e-6);
nah(p1s2, 0.874032, 1e-6);
nah(p1s1 / p1s2, 2.618034, 1e-6);
assert.equal(norm1(P1), 2);
assert.equal(normInf(P1), 3);
const [aHi, aLo] = svAbtastung(P1);
nah(aHi, p1s1, 1e-6);
nah(aLo, p1s2, 1e-6);

const P2 = [[0.6, -0.8], [0.8, 0.6]];
nah(sv(P2)[0], 1, 1e-12);
nah(sv(P2)[1], 1, 1e-12);
nah(norm1(P2), 1.4, 1e-12);
nah(normInf(P2), 1.4, 1e-12);
nah(frob(P2), Math.SQRT2, 1e-12);

const P3 = [[20, 10], [0, 10]];
nah(sv(P3)[0], 10 * p1s1, 1e-9);
nah(sv(P3)[1], 10 * p1s2, 1e-9);
nah(sv(P3)[0], 22.882456, 1e-5);

const P4 = [[1, 2], [0.5, 1]];
assert.equal(P4[0][0] * P4[1][1] - P4[0][1] * P4[1][0], 0, "Preset singulaer ist nicht exakt singulaer");
nah(sv(P4)[0], 2.5, 1e-12);
nah(sv(P4)[1], 0, 1e-12);
assert.equal(norm1(P4), 3);
assert.equal(normInf(P4), 3);

// Die neue Zwischenklasse: σ₂ winzig, aber nicht null.
const schlecht = [[1, 2], [0.5, 1.004]];
const [q1, q2] = sv(schlecht);
assert.notEqual(schlecht[0][0] * schlecht[1][1] - schlecht[0][1] * schlecht[1][0], 0);
assert.ok(q2 / q1 > 0 && q2 / q1 < 0.02, `σ₂/σ₁ = ${q2 / q1}`);
const s33 = lies("src/chapters/03-matrix-spur-norm/widgets/S33OperatornormWidget.tsx");
assert.ok(/schlechtKonditioniert/.test(s33), "Zweig schlecht-konditioniert fehlt");
assert.ok(!/const singulaer = smin < 1e-9/.test(s33), "Toleranz auf abgeleitetem σ₂ zurück");

/* ------------------------------------- S34: unitäre Invarianz messen */

const basis = sv(P1);
let abwSchatten = 0;
let abwElement = 0;
for (let g = 0; g <= 360; g++) {
  const C = matMul(drehung(g), P1);
  const [c1, c2] = sv(C);
  abwSchatten = Math.max(
    abwSchatten,
    Math.abs(c1 - basis[0]),
    Math.abs(c2 - basis[1]),
    Math.abs(c1 + c2 - (basis[0] + basis[1])),
    Math.abs(frob(C) - frob(P1)),
  );
  abwElement = Math.max(
    abwElement,
    Math.abs(summennorm(C) - summennorm(P1)),
    Math.abs(maxnorm(C) - maxnorm(P1)),
  );
}
assert.ok(abwSchatten < 1e-14, `Schattennormen wandern um ${abwSchatten}`);
assert.ok(abwElement > 0.5, `elementweise Normen bleiben mit ${abwElement} zu ruhig`);
nah(frob(P1), Math.sqrt(6), 1e-12);
nah(frob(P1), 2.44949, 1e-5);
nah(basis[0] + basis[1], Math.sqrt(10), 1e-9);
nah(basis[0] + basis[1], 3.162278, 1e-6);
const bei45 = matMul(drehung(45), P1);
nah(summennorm(bei45), 4.242641, 1e-6);
nah(maxnorm(bei45), 1.414214, 1e-6);
nah(Math.abs(summennorm(bei45) - summennorm(P1)), 0.242641, 1e-6);
// Bei 0/90/180/270 stehen die elementweisen Normen nur zufällig still.
for (const g of [0, 90, 180, 270]) {
  const C = matMul(drehung(g), P1);
  nah(summennorm(C), 4, 1e-12);
  nah(maxnorm(C), 2, 1e-12);
}
// Die Orthogonalmatrix-Voreinstellung: beide Singulärwerte 1.
nah(sv(P2)[0] - sv(P2)[1], 0, 1e-12);

/* ------------------------------------------ S35: Äquivalenzkonstanten */

const quotient = (s1, s2) => Math.hypot(s1, s2) / Math.max(s1, s2);
nah(quotient(1.6, 0.8), 1.118034, 1e-6);
nah(Math.hypot(1.6, 0.8), 1.788854, 1e-6);
nah(quotient(1, 0), 1, 1e-12);
nah(quotient(1, 1), Math.SQRT2, 1e-12);
// Der Quotient verlässt [1, √2] nie – über ein feines Raster geprüft.
for (let a = 0.05; a <= 2; a += 0.05) {
  for (let b = 0; b <= a + 1e-12; b += 0.05) {
    const q = quotient(a, b);
    assert.ok(q >= 1 - 1e-12 && q <= Math.SQRT2 + 1e-12, `q(${a},${b}) = ${q}`);
  }
}
// Bemerkung 3.5.3: B = diag(1,2; 0) hat ‖B‖₂ = ‖B‖_F = 1,2.
nah(sv([[1.2, 0], [0, 0]])[0], 1.2, 1e-12);
nah(frob([[1.2, 0], [0, 0]]), 1.2, 1e-12);
// Die Randbeschriftungen nehmen die Pointe nicht mehr vorweg.
const s35 = lies("src/chapters/03-matrix-spur-norm/widgets/S35Aequivalenz.tsx");
// Die Randbeschriftungen im gerenderten SVG sind jetzt neutral („σ₁ = σ₂",
// „σ₂ = 0"); die alten Deutungen kommen nur noch im Kommentar vor.
const s35Text = s35.replace(/\/\*[\s\S]*?\*\//g, "");
assert.ok(!/rechte Schranke scharf/.test(s35Text), "vorwegnehmende Randbeschriftung ist zurück");
assert.ok(!/linke Schranke scharf/.test(s35Text), "vorwegnehmende Randbeschriftung ist zurück");

console.log("REV29 03-matrix-spur-norm-normen: ok");
