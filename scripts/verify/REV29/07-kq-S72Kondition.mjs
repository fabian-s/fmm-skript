#!/usr/bin/env node
/**
 * REV29 — src/chapters/07-kq/widgets/S72Kondition.tsx
 * (FigKQGeometrie, WinkelWidget, FastRangdefektWidget, KonditionsQuadrierungLab).
 *
 * Unabhängige Rechenwege:
 *   • Die KQ-Größen der 3D-Tafel kommen hier aus einer Gram-Schmidt-QR-Zerlegung
 *     mit Rückwärtseinsetzen, nicht aus den im Widget hartkodierten Literalen.
 *   • κ₂(A) des Rangdefekt-Widgets wird aus den Eigenwerten von AᵀA gezogen
 *     (charakteristisches Polynom), nicht aus der Formel cot(α/2), die das
 *     Widget im Verdikt behauptet – beide müssen übereinstimmen.
 *   • Das Konditions-Labor wird gegen die exakte Lösungsformel der
 *     Problemfamilie geprüft, zusätzlich gegen die Reglerraster.
 * Alle Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/07-kq/widgets/S72Kondition.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
const nrm = (u) => Math.sqrt(dot(u, u));

/* ------------------------------------------- FigKQGeometrie: KQ über QR */

const A1 = [1, 0, 0.45];
const A2 = [0, 1, -0.35];
const B = [0.75, 0.9, 1.35];

const q1 = A1.map((x) => x / nrm(A1));
const rest = A2.map((x, i) => x - dot(A2, q1) * q1[i]);
const q2 = rest.map((x) => x / nrm(rest));
const R = [[dot(q1, A1), dot(q1, A2)], [0, dot(q2, A2)]];
const c = [dot(q1, B), dot(q2, B)];
const x2 = c[1] / R[1][1];
const x1 = (c[0] - R[0][1] * x2) / R[0][0];
const yh = [0, 1, 2].map((i) => x1 * A1[i] + x2 * A2[i]);
const r = B.map((v, i) => v - yh[i]);

nah(x1, 1.200849, 1e-6, "x̂₁");
nah(x2, 0.549340, 1e-6, "x̂₂");
nah(yh[2], 0.348113, 1e-6, "ŷ₃");
nah(r[0], -0.450849, 1e-6, "r₁");
nah(r[1], 0.350660, 1e-6, "r₂");
nah(r[2], 1.001887, 1e-6, "r₃");
nah(dot(A1, r), 0, 1e-12, "a₁ᵀr (Orthogonalität)");
nah(dot(A2, r), 0, 1e-12, "a₂ᵀr (Orthogonalität)");
nah(nrm(B), 1.787456, 1e-6, "‖b‖");
nah(nrm(yh), 1.365648, 1e-6, "‖ŷ‖");
nah(nrm(r), 1.153258, 1e-6, "‖r‖");
nah(nrm(B) ** 2 - nrm(yh) ** 2 - nrm(r) ** 2, 0, 1e-12, "Pythagoras-Rest");
nah((Math.acos(nrm(yh) / nrm(B)) * 180) / Math.PI, 40.180, 1e-3, "θ");

// Das im Widget hartkodierte YH muss zu dieser Rechnung passen.
const yhLit = src.match(/const YH: Vec3 = \[([^\]]*)\]/);
assert.ok(yhLit, "YH nicht im Quelltext gefunden");
yhLit[1].split(",").map((s) => Number(s.trim())).forEach((v, i) => {
  nah(v, yh[i], 1e-6, `hartkodiertes YH[${i}] gegen die QR-Rechnung`);
});

/* ------------------------------------------------ WinkelWidget: Anteil = |cos φ| */

/** Beobachtete relative Änderung und Schranke im 1-D-Modell A = (1,0)ᵀ. */
function winkelfall(thetaDeg, phiDeg, delta) {
  const th = (thetaDeg * Math.PI) / 180;
  const ph = (phiDeg * Math.PI) / 180;
  const bv = [Math.cos(th), Math.sin(th)];
  const bp = [bv[0] + delta * Math.cos(ph), bv[1] + delta * Math.sin(ph)];
  const observed = Math.abs(bp[0] - bv[0]) / Math.abs(bv[0]);
  const bound = delta / Math.cos(th);
  return { observed, bound, anteil: observed / bound, dx: bp[0] - bv[0] };
}

for (const th of [30, 60, 75]) {
  for (const [phi, soll] of [[0, 1], [45, Math.SQRT1_2], [90, 0], [180, 1]]) {
    const f = winkelfall(th, phi, 0.15);
    nah(f.anteil, soll, 1e-9, `ausgeschöpfter Anteil bei θ = ${th}°, φ = ${phi}°`);
  }
}
// Die beiden exakten Zustände der Drei-Zustands-Regel sind über den 1°-Regler
// erreichbar und liefern wirklich Gleichheit bzw. exakt null.
for (const phi of [0, 180, 360]) {
  const f = winkelfall(30, phi, 0.15);
  nah(f.observed, f.bound, 1e-15, `Gleichheit in der Schranke bei φ = ${phi}°`);
}
for (const phi of [90, 270]) {
  const f = winkelfall(30, phi, 0.15);
  assert.equal(f.dx, 0, `Δx̂ muss bei φ = ${phi}° exakt null sein, ist aber ${f.dx}`);
}
// Der Grenzfall des Reviews: φ = 89° ist NICHT null, das Verdikt darf dort
// nicht von Orthogonalität sprechen.
nah(winkelfall(30, 89, 0.15).anteil, 0.0174524, 1e-6, "ausgeschöpfter Anteil bei φ = 89°");

/* ----------------------------------- FastRangdefektWidget: κ₂ über die Eigenwerte */

/** σ₁, σ₂, κ₂ aus den Eigenwerten von AᵀA für zwei Einheitsspalten im Winkel α. */
function kappaUeberEigenwerte(alphaDeg) {
  const a = (alphaDeg * Math.PI) / 180;
  const M = [[1, Math.cos(a)], [0, Math.sin(a)]];
  const g11 = M[0][0] ** 2 + M[1][0] ** 2;
  const g12 = M[0][0] * M[0][1] + M[1][0] * M[1][1];
  const g22 = M[0][1] ** 2 + M[1][1] ** 2;
  const tr = g11 + g22;
  const de = g11 * g22 - g12 * g12;
  const w = Math.sqrt(tr * tr - 4 * de);
  return { s1: Math.sqrt((tr + w) / 2), s2: Math.sqrt((tr - w) / 2), k: Math.sqrt((tr + w) / (tr - w)) };
}

for (const alpha of [3, 12, 30, 60, 85, 89, 90]) {
  const k = kappaUeberEigenwerte(alpha);
  nah(k.k, 1 / Math.tan((alpha * Math.PI) / 360), 1e-9, `κ₂ = cot(α/2) bei α = ${alpha}°`);
}
const k12 = kappaUeberEigenwerte(12);
nah(k12.s1, 1.40647, 1e-5, "σ₁ bei α = 12°");
nah(k12.s2, 0.14783, 1e-5, "σ₂ bei α = 12°");
nah(k12.k, 9.5144, 1e-4, "κ₂ bei α = 12° (Selbsttest S72)");
nah(Math.log10(k12.k), 0.978, 1e-3, "verlorene Dezimalstellen bei α = 12°");
nah(kappaUeberEigenwerte(3).k, 38.1885, 1e-4, "κ₂ bei α = 3° (Reglerminimum)");
nah(kappaUeberEigenwerte(90).k, 1, 1e-12, "κ₂ bei α = 90° (exakt orthogonale Spalten)");
// Der Grenzfall des Reviews: bei 85° ist κ₂ NICHT 1.
nah(kappaUeberEigenwerte(85).k, 1.09131, 1e-5, "κ₂ bei α = 85°");
assert.ok(kappaUeberEigenwerte(85).k > 1.05, "alpha = 85 Grad darf nicht als senkrecht verkauft werden");

/* ------------------------------- KonditionsQuadrierungLab: exakte Lösungsformel */

/** ‖Δx̂‖₂/‖x̂‖₂ für A = [[1,1],[ε,−ε],[0,0]], Störung E, b = (1,0,b₃)ᵀ. */
function quadrierung(eps, b3) {
  const xs = [0.5, 0.5];
  const d = -b3 / (2 * eps);
  const xh = [(1 + d) / 2, (1 - d) / 2];
  const dx = Math.hypot(xh[0] - xs[0], xh[1] - xs[1]);
  return dx / Math.hypot(xs[0], xs[1]);
}

for (const [le, lb] of [[-4, -1], [-4, 0], [-6, -3], [-2, -0.5]]) {
  const eps = Math.pow(10, le);
  const b3 = Math.pow(10, lb);
  nah(quadrierung(eps, b3), b3 / (2 * eps), 1e-6 * (b3 / (2 * eps)), `‖Δx̂‖/‖x̂‖ = b₃/(2ε) bei ε = 1e${le}, b₃ = 1e${lb}`);
}
// Voreinstellung des Widgets nach dem Fix: ε = 10⁻⁴, b₃ = 10⁻¹.
nah(quadrierung(1e-4, 1e-1), 500, 1e-9, "beobachtete Änderung in der Voreinstellung");
// Schranke (κ² tan θ + κ)·ε = b₃/ε + 1.
const schranke = (eps, b3) => ((1 / eps) ** 2 * b3 + 1 / eps) * eps;
nah(schranke(1e-4, 1e-1), 1e3 + 1, 1e-6, "Schranke in der Voreinstellung");
// Der Preset »kleines Residuum« muss ECHT unter dem Term erster Ordnung landen.
for (const le of [-8, -4.5, -1]) {
  const eps = Math.pow(10, le);
  const b3 = Math.pow(10, Math.max(-9, le - 1));
  assert.ok(b3 / eps < 1, `Preset b₃ = ε/10 muss b₃/ε < 1 liefern, liefert aber ${b3 / eps}`);
}
assert.ok(
  /setLogB3\(clamp\(logEps - 1, -9, 0\)\)/.test(src),
  "der Preset »kleines Residuum« muss b3 = eps/10 setzen, nicht b3 = eps",
);
assert.ok(/const grenzfall =/.test(src), "der Gleichheitsfall b₃ = ε braucht einen eigenen Zweig");
assert.ok(/const laengsExakt = phiDeg % 180 === 0;/.test(src), "exakter Längs-Zweig fehlt");
assert.ok(/const senkrechtExakt = phiDeg % 180 === 90;/.test(src), "exakter Senkrecht-Zweig fehlt");
assert.ok(/alphaDeg === 90 \?/.test(src), "exakter Zweig α = 90° fehlt");

console.log("REV29 07-kq S72Kondition: alle Zahlen bestätigt");
