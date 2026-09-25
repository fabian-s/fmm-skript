#!/usr/bin/env node
/**
 * REV29 — S134BSplineBasis.tsx und S134CoxDeBoor.tsx, §13.4.
 *
 * Beide Widgets haben in REV29 echte Zustandsklassen bekommen. Dieses Skript
 * prüft, dass die Klassen zutreffen und über die Regler erreichbar sind, und
 * dass der weggeklemmte rechte Randpunkt x* = xi_m der einzige entartete
 * Zustand war.
 *
 * UNABHÄNGIGER RECHENWEG: Die Widgets rekursieren je Index nach unten
 * (S134BSpline.ts, `bspl`). Hier wird stattdessen AUFSTEIGEND gerechnet, eine
 * Gradstufe nach der anderen über den ganzen Knotenvektor; auf einfachen
 * Knoten wird das zusätzlich gegen die geschlossene Darstellung über
 * DIVIDIERTE DIFFERENZEN abgeschnittener Potenzen gehalten,
 *   B_k^{(q)}(x) = (tau_{k+q+1} - tau_k) * [tau_k, ..., tau_{k+q+1}] (t - x)_+^q.
 * Der Reglerendwert X_MAX wird aus der Widget-Quelle gelesen, nicht behauptet.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const GITTER = [0, 1, 2, 3, 4, 5];
const nahe = (a, b, eps, was) => assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} != ${b} (eps ${eps})`);

function knotenvektor(xi, q) {
  const m = xi.length - 1;
  const t = [];
  for (let i = 0; i <= q; i++) t.push(xi[0]);
  for (let i = 1; i <= m - 1; i++) t.push(xi[i]);
  for (let i = 0; i <= q; i++) t.push(xi[m]);
  return t;
}

/**
 * Alle B_k^{(grad)} an der Stelle x, AUFSTEIGEND aufgebaut: eine Stufe pro
 * Grad über den ganzen Knotenvektor. Die Widgets rekursieren stattdessen je
 * Index nach unten (S134BSpline.ts, bspl).
 */
function bAlle(tau, grad, x) {
  const nb = tau.length - 1;
  let stufe = new Array(nb).fill(0);
  for (let i = 0; i < nb; i++) if (tau[i] <= x && x < tau[i + 1]) stufe[i] = 1;
  for (let q = 1; q <= grad; q++) {
    const naechste = new Array(nb - q).fill(0);
    for (let i = 0; i < nb - q; i++) {
      let s = 0;
      const d1 = tau[i + q] - tau[i];
      if (d1 > 0) s += ((x - tau[i]) / d1) * stufe[i];
      const d2 = tau[i + q + 1] - tau[i + 1];
      if (d2 > 0) s += ((tau[i + q + 1] - x) / d2) * stufe[i + 1];
      naechste[i] = s;
    }
    stufe = naechste;
  }
  return stufe;
}
const bDiv = (tau, k, q, x) => bAlle(tau, q, x)[k];

/* --- Zweitprobe auf EINFACHEN Knoten: dividierte Differenzen abgeschnittener
   Potenzen. Dort ist die geschlossene Darstellung gut konditioniert. --- */
const potenz = (t, x, q) => (t > x ? (t - x) ** q : 0);
function divDiff(tau, a, b, g) {
  if (a === b) return g(tau[a]);
  return (divDiff(tau, a + 1, b, g) - divDiff(tau, a, b - 1, g)) / (tau[b] - tau[a]);
}
function bTruncated(tau, k, q, x) {
  const lokal = tau.slice(k, k + q + 2);
  return (lokal[q + 1] - lokal[0]) * divDiff(lokal, 0, q + 1, (t) => potenz(t, x, q));
}
{
  // Auf dem einfachen Gitter 0..9 (CoxDeBoor-Knotenfolge) muessen beide Wege
  // uebereinstimmen — das ist die eigentliche Unabhaengigkeitsprobe.
  const simple = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let schlimmst = 0;
  for (let q = 1; q <= 3; q++) {
    for (let i = 1; i < 200; i++) {
      const x = (9 * i) / 200;
      for (let k = 0; k + q + 1 < simple.length; k++) {
        schlimmst = Math.max(schlimmst, Math.abs(bDiv(simple, k, q, x) - bTruncated(simple, k, q, x)));
      }
    }
  }
  assert.ok(schlimmst < 1e-12, `Rekursion und abgeschnittene Potenzen weichen um ${schlimmst} ab`);
}

/* ---------- 1. Partition der Eins und Trägerlänge ---------- */
for (let q = 1; q <= 3; q++) {
  const tau = knotenvektor(GITTER, q);
  const K = tau.length - q - 1;
  assert.equal(tau.length, GITTER.length - 1 + 2 * q + 1);
  assert.equal(K, GITTER.length - 1 + q);
  for (let i = 1; i < 40; i++) {
    const x = (5 * i) / 40;
    let s = 0;
    for (let k = 0; k < K; k++) s += bDiv(tau, k, q, x);
    nahe(s, 1, 2e-14, `Partition der Eins bei q=${q}, x=${x}`);
  }
}

/* ---------- 2. Die vier Lage-Klassen des Verdikts ---------- */
/** Zählt, wie viele Basisfunktionen an x ungleich null sind (Referenzwert). */
function aktivZaehlen(q, x) {
  const tau = knotenvektor(GITTER, q);
  const K = tau.length - q - 1;
  let n = 0;
  for (let k = 0; k < K; k++) if (bDiv(tau, k, q, x) > 1e-12) n++;
  return n;
}
for (let q = 1; q <= 3; q++) {
  // Im Inneren eines Gitterintervalls: genau q + 1 aktiv.
  for (const x of [0.5, 1.5, 2.5, 3.5, 4.5, 4.95]) {
    assert.equal(aktivZaehlen(q, x), q + 1, `Innenklasse verletzt bei q=${q}, x=${x}`);
  }
  // Auf einem inneren Knoten (Träger rechts halboffen): genau q aktiv.
  for (const x of [1, 2, 3, 4]) {
    assert.equal(aktivZaehlen(q, x), q, `Knotenklasse verletzt bei q=${q}, x=${x}`);
  }
  // Am linken Rand: genau eine Funktion, und die trägt den Wert eins.
  assert.equal(aktivZaehlen(q, 0), 1, `linke Randklasse verletzt bei q=${q}`);
  nahe(bDiv(knotenvektor(GITTER, q), 0, q, 0), 1, 1e-14, `B_1(0) bei q=${q}`);
}

/* ---------- 3. Der weggeklemmte Randpunkt ---------- */
{
  // Genau an xi_m = 5 ist JEDER halboffene Träger leer: die Summe wäre 0,
  // nicht 1. Deshalb endet der Regler bei 4,95 (REV29).
  const q = 3;
  const tau = knotenvektor(GITTER, q);
  const K = tau.length - q - 1;
  let s = 0;
  for (let k = 0; k < K; k++) s += bDiv(tau, k, q, 5);
  nahe(s, 0, 1e-9, "an xi_m ist die Summe doch nicht null");
  // Knapp davor gilt die Partition der Eins wieder.
  let s2 = 0;
  for (let k = 0; k < K; k++) s2 += bDiv(tau, k, q, 4.95);
  nahe(s2, 1, 2e-14, "knapp vor xi_m fehlt die Partition der Eins");
  // Der Reglerendwert wird aus der Quelle gelesen; er muss echt links von
  // xi_m liegen und ein Vielfaches der Rasterweite 0,05 sein.
  const quelle = readFileSync(
    new URL("../../../src/chapters/13-funktionsapproximation/widgets/S134BSplineBasis.tsx", import.meta.url),
    "utf8",
  );
  const xMax = Number(/const X_MAX = ([\d.]+);/.exec(quelle)?.[1]);
  assert.ok(Number.isFinite(xMax), "X_MAX nicht in der Quelle gefunden");
  assert.ok(xMax < GITTER[GITTER.length - 1], `Regler endet bei ${xMax}, also nicht vor xi_m`);
  nahe(Math.round(xMax / 0.05) * 0.05, xMax, 1e-12, "X_MAX liegt nicht auf dem Raster 0,05");
  let s3 = 0;
  for (let k = 0; k < K; k++) s3 += bDiv(tau, k, q, xMax);
  nahe(s3, 1, 2e-14, "am Reglerendwert fehlt die Partition der Eins");
}

/* ---------- 4. CoxDeBoor: die drei Zweige sind erreichbar ---------- */
{
  const TAU = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const K0 = 2;
  const rampeL = (q, x) => (x - TAU[K0]) / (TAU[K0 + q] - TAU[K0]);
  const rampeR = (q, x) => (TAU[K0 + q + 1] - x) / (TAU[K0 + q + 1] - TAU[K0 + 1]);
  for (let q = 1; q <= 3; q++) {
    const klassen = new Set();
    for (let s = 0; s <= (q + 1) / 0.05; s++) {
      const x = Math.min(TAU[K0] + s * 0.05, TAU[K0] + q + 1);
      const bL = bDiv(TAU, K0, q - 1, x);
      const bR = bDiv(TAU, K0 + 1, q - 1, x);
      const erg = bDiv(TAU, K0, q, x);
      // Die Rekursionsidentität selbst — der Kern des Widgets.
      nahe(erg, rampeL(q, x) * bL + rampeR(q, x) * bR, 1e-12, `Rekursion bei q=${q}, x=${x}`);
      assert.ok(rampeL(q, x) >= -1e-9 && rampeR(q, x) >= -1e-9, "Rampe negativ");
      klassen.add(erg <= 1e-12 ? "ausserhalb" : bL > 1e-12 && bR > 1e-12 ? "ueberlappung" : "einseitig");
    }
    assert.ok(klassen.has("ausserhalb"), `q=${q}: Zweig „außerhalb" unerreichbar`);
    assert.ok(klassen.has("einseitig"), `q=${q}: Zweig „einseitig" unerreichbar`);
    if (q >= 2) assert.ok(klassen.has("ueberlappung"), `q=${q}: Zweig „Überlappung" unerreichbar`);
  }
  // Bei q = 1 stoßen die beiden Nachbarn nur in einem Punkt aneinander; dort
  // gibt es keinen Überlappungsbereich, und das Verdikt sagt „einseitig".
  const bL1 = bDiv(TAU, K0, 0, 2.5);
  const bR1 = bDiv(TAU, K0 + 1, 0, 2.5);
  assert.ok(bL1 > 1e-12 && bR1 <= 1e-12, "bei q=1 tragen doch beide Nachbarn");
}

console.log("S134BSplineBasis/S134CoxDeBoor: Lageklassen, Partition der Eins und Zweigabdeckung bestätigt.");
