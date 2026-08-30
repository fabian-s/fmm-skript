#!/usr/bin/env node
/**
 * REV29 — S135Kruemmung.tsx (KruemmungsVergleich), §13.5.
 *
 * Der Header verwies auf ein Skript s151.mjs, das es im Repo nicht gibt.
 * R5/verify-r5-claims.mjs deckt J(g_t) = 6 + 2t^2 ab, aber ausdrücklich mit
 * der Simpson-Integration des Widgets; die übrigen Header-Aussagen (s ist C²,
 * natürlich, interpoliert; Kreuzterm exakt null) waren ungedeckt.
 *
 * UNABHÄNGIGER RECHENWEG: Hier wird nichts numerisch integriert. Der
 * natürliche kubische Spline durch (0,0), (1,1), (2,0) wird SYMBOLISCH über
 * seine beiden Stücke bestimmt (Momentenform), und alle Integrale von
 * Polynomen werden EXAKT über Stammfunktionen ausgewertet. Simpson kommt nur
 * als Gegenprobe vor.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const nahe = (a, b, eps, was) => assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} != ${b} (eps ${eps})`);

/* ---------- Der natürliche kubische Spline über Momente ---------- */
// Knoten 0, 1, 2 mit y = 0, 1, 0; M_0 = M_2 = 0, und
// M_0 + 4 M_1 + M_2 = 6 (y_2 - 2 y_1 + y_0) = -12  =>  M_1 = -3.
const M = [0, -3, 0];
const Y = [0, 1, 0];
/** Stück i auf [i, i+1] in der Momentenform, als Koeffizienten [a,b,c,d]. */
function stueck(i) {
  const xl = i;
  const xr = i + 1;
  // s(x) = M_i (xr-x)^3/6 + M_{i+1} (x-xl)^3/6 + (y_i - M_i/6)(xr-x) + (y_{i+1} - M_{i+1}/6)(x-xl)
  const p = [0, 0, 0, 0];
  const addPoly = (koef, poly) => poly.forEach((v, k) => (p[k] += koef * v));
  // (xr - x)^3 = xr^3 - 3 xr^2 x + 3 xr x^2 - x^3
  addPoly(M[i] / 6, [xr ** 3, -3 * xr ** 2, 3 * xr, -1]);
  // (x - xl)^3 = -xl^3 + 3 xl^2 x - 3 xl x^2 + x^3
  addPoly(M[i + 1] / 6, [-(xl ** 3), 3 * xl ** 2, -3 * xl, 1]);
  addPoly(Y[i] - M[i] / 6, [xr, -1, 0, 0]);
  addPoly(Y[i + 1] - M[i + 1] / 6, [-xl, 1, 0, 0]);
  return p;
}
const S = [stueck(0), stueck(1)];
const wert = (p, x) => p[0] + p[1] * x + p[2] * x * x + p[3] * x ** 3;
const d1 = (p, x) => p[1] + 2 * p[2] * x + 3 * p[3] * x * x;
const d2 = (p, x) => 2 * p[2] + 6 * p[3] * x;

/* ---------- 1. Interpolation, C² und natürlicher Randabschluss ---------- */
nahe(wert(S[0], 0), 0, 1e-12, "s(0)");
nahe(wert(S[0], 1), 1, 1e-12, "s(1) von links");
nahe(wert(S[1], 1), 1, 1e-12, "s(1) von rechts");
nahe(wert(S[1], 2), 0, 1e-12, "s(2)");
nahe(d1(S[0], 1), d1(S[1], 1), 1e-12, "s' stetig bei x = 1");
nahe(d2(S[0], 1), d2(S[1], 1), 1e-12, "s'' stetig bei x = 1");
nahe(d2(S[0], 0), 0, 1e-12, "natürlicher Rand links");
nahe(d2(S[1], 2), 0, 1e-12, "natürlicher Rand rechts");

/* ---------- 2. Exakte Integrale, keine Quadratur ---------- */
/** Exaktes Integral eines Polynoms (Koeffizientenliste) über [a, b]. */
const integral = (koef, a, b) =>
  koef.reduce((s, c, k) => s + (c * (b ** (k + 1) - a ** (k + 1))) / (k + 1), 0);
/** Produkt zweier Polynome. */
const mal = (u, v) => {
  const r = new Array(u.length + v.length - 1).fill(0);
  u.forEach((a, i) => v.forEach((b, j) => (r[i + j] += a * b)));
  return r;
};
const zweiteAbleitung = (p) => [2 * p[2], 6 * p[3]];
// s'' ist auf [0,1] die Gerade -3x und auf [1,2] die Gerade -3(2-x).
nahe(zweiteAbleitung(S[0])[0], 0, 1e-12, "s'' links: konstanter Anteil");
nahe(zweiteAbleitung(S[0])[1], -3, 1e-12, "s'' links: Steigung");
nahe(zweiteAbleitung(S[1])[0], -6, 1e-12, "s'' rechts: konstanter Anteil");
nahe(zweiteAbleitung(S[1])[1], 3, 1e-12, "s'' rechts: Steigung");

const Js =
  integral(mal(zweiteAbleitung(S[0]), zweiteAbleitung(S[0])), 0, 1) +
  integral(mal(zweiteAbleitung(S[1]), zweiteAbleitung(S[1])), 1, 2);
nahe(Js, 6, 1e-12, "J(s)");
// Die beiden Teilintegrale, die das Widget als Fußnote nennt.
nahe(integral(mal(zweiteAbleitung(S[0]), zweiteAbleitung(S[0])), 0, 1), 3, 1e-12, "Teilintegral links");
nahe(integral(mal(zweiteAbleitung(S[1]), zweiteAbleitung(S[1])), 1, 2), 3, 1e-12, "Teilintegral rechts");

// Die Parabel p(x) = x(2 - x) = 2x - x^2 interpoliert dieselben Punkte.
const P = [0, 2, -1, 0];
for (const [x, y] of [[0, 0], [1, 1], [2, 0]]) nahe(wert(P, x), y, 1e-12, `p(${x})`);
const pZwei = zweiteAbleitung(P);
const Jp = integral(mal(pZwei, pZwei), 0, 2);
nahe(Jp, 8, 1e-12, "J(p)");

// Kreuzterm ∫ s'' h'' dx mit h = p - s: EXAKT null (das trägt den Satz).
const hLinks = [pZwei[0] - zweiteAbleitung(S[0])[0], pZwei[1] - zweiteAbleitung(S[0])[1]];
const hRechts = [pZwei[0] - zweiteAbleitung(S[1])[0], pZwei[1] - zweiteAbleitung(S[1])[1]];
const kreuz =
  integral(mal(zweiteAbleitung(S[0]), hLinks), 0, 1) +
  integral(mal(zweiteAbleitung(S[1]), hRechts), 1, 2);
nahe(kreuz, 0, 1e-12, "Kreuzterm ∫ s'' h''");
const Jh = integral(mal(hLinks, hLinks), 0, 1) + integral(mal(hRechts, hRechts), 1, 2);
nahe(Jh, 2, 1e-12, "∫ (h'')²");

/* ---------- 3. J(g_t) = 6 + 2t² über den ganzen Reglerbereich ---------- */
// Der Regler laeuft in Promille von -1000 bis 2000 in Schritten von 50.
for (let promille = -1000; promille <= 2000; promille += 50) {
  const t = promille / 1000;
  const gL = zweiteAbleitung(S[0]).map((v, i) => v + t * hLinks[i]);
  const gR = zweiteAbleitung(S[1]).map((v, i) => v + t * hRechts[i]);
  const Jg = integral(mal(gL, gL), 0, 1) + integral(mal(gR, gR), 1, 2);
  nahe(Jg, 6 + 2 * t * t, 1e-12, `J(g_t) bei t = ${t}`);
  assert.ok(Jg >= Js - 1e-12, `J(g_t) unter J(s) bei t = ${t}`);
}
// Der exakt entartete Zustand muss ueber den KONTROLLIERTEN Parameter
// erreichbar sein: Reglergrenzen und Schrittweite aus der Quelle lesen und
// pruefen, dass t = 0 ein Rastwert und der EINZIGE Minimierer darunter ist.
{
  const quelle = readFileSync(
    new URL("../../../src/chapters/13-funktionsapproximation/widgets/S135Kruemmung.tsx", import.meta.url),
    "utf8",
  );
  const regler = /label="Mischung t" min=\{(-?\d+)\} max=\{(-?\d+)\} step=\{(\d+)\}/.exec(quelle);
  assert.ok(regler, "Reglerdefinition nicht in S135Kruemmung.tsx gefunden");
  const [min, max, step] = regler.slice(1).map(Number);
  const rastwerte = [];
  for (let v = min; v <= max; v += step) rastwerte.push(v);
  assert.ok(rastwerte.includes(0), "t = 0 liegt nicht auf dem Reglerraster");
  const minimierer = rastwerte.filter((v) => {
    const t = v / 1000;
    return 6 + 2 * t * t <= Math.min(...rastwerte.map((w) => 6 + 2 * (w / 1000) ** 2)) + 1e-15;
  });
  assert.deepEqual(minimierer, [0], `Minimierer auf dem Raster: ${minimierer.join(", ")}`);
}

console.log("S135Kruemmung: natürlicher Spline, J(s) = 6, J(p) = 8, Kreuzterm 0 und J(g_t) = 6 + 2t² exakt bestätigt.");
