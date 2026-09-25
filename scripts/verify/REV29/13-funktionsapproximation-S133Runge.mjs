#!/usr/bin/env node
/**
 * REV29 — S133Runge.tsx (RungeExplorer) und die Prosa von §13.3.
 *
 * Der Widget-Kommentar verwies auf drei Skripte, die es im Repo nicht gibt
 * (verify-values.mjs, check-s143.mjs, check2-s143.mjs). Die Verdikt-Bedingung
 * ist bereits durch FIX-VERDACHT/check-s143-cheb.mjs gedeckt; hier stehen die
 * Zahlen der Fehlerreihe, die neue Schätzfrage („ab welchem n erstmals über
 * 1") und die im Text genannten Chebyshev-Werte im Reglerbereich.
 *
 * UNABHÄNGIGER RECHENWEG: Das Widget wertet den Interpolanten baryzentrisch
 * aus. Hier steht die NEWTON-Form über dividierte Differenzen; die Knoten
 * werden getrennt erzeugt und der Fehler auf demselben Raster gescannt.
 */
import assert from "node:assert/strict";

const f = (x) => 1 / (1 + 25 * x * x);
const aequi = (n) => Array.from({ length: n }, (_, i) => (n === 1 ? 0 : -1 + (2 * i) / (n - 1)));
const cheb = (n) => Array.from({ length: n }, (_, i) => Math.cos(((2 * i + 1) * Math.PI) / (2 * n)));

/** Interpolationspolynom in Newton-Darstellung (dividierte Differenzen). */
function newton(xs) {
  const c = xs.map(f);
  for (let k = 1; k < xs.length; k++) {
    for (let i = xs.length - 1; i >= k; i--) c[i] = (c[i] - c[i - 1]) / (xs[i] - xs[i - k]);
  }
  return (x) => {
    let v = c[xs.length - 1];
    for (let i = xs.length - 2; i >= 0; i--) v = v * (x - xs[i]) + c[i];
    return v;
  };
}

/** Größter Abstand auf demselben 2001-Punkt-Raster wie im Widget. */
function scan(xs) {
  const p = newton(xs);
  let fehler = 0;
  let ort = 0;
  for (let i = 0; i <= 2000; i++) {
    const x = -1 + i / 1000;
    const d = Math.abs(f(x) - p(x));
    if (d > fehler) {
      fehler = d;
      ort = x;
    }
  }
  return { fehler, ort };
}

const N_MIN = 3;
const N_MAX = 21;
const nahe = (a, b, eps, was) => assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} != ${b} (eps ${eps})`);

/* ---------- 1. Die Tabelle in @bemerkung:divergenz-schon-aber-nicht-monoton ---------- */
for (const [n, fehler, ort] of [[5, 0.44, 0.795], [10, 0.3, 0.927], [15, 7.2, 0.961], [20, 8.6, 0.973]]) {
  const s = scan(aequi(n));
  assert.ok(Math.abs(s.fehler - fehler) / fehler < 0.01, `äquidistanter Fehler bei n=${n}: ${s.fehler}`);
  nahe(Math.abs(s.ort), ort, 2e-3, `Ort des Maximums bei n=${n}`);
}
assert.ok(scan(aequi(5)).fehler > scan(aequi(10)).fehler, "die Folge ist bei n=5→10 doch monoton");

/* ---------- 2. Die Schätzfrage: erste Überschreitung von 1 ---------- */
{
  const reihe = [];
  for (let n = N_MIN; n <= N_MAX; n++) reihe.push({ n, e: scan(aequi(n)).fehler });
  const erste = reihe.find((r) => r.e > 1);
  assert.equal(erste.n, 9, `erste Überschreitung von 1 bei n = ${erste.n}`);
  nahe(erste.e, 1.045, 5e-3, "Fehler bei n = 9");
  // Vor n = 9 bleibt die ganze Reihe unter 1 — die Antwort ist eindeutig.
  for (const r of reihe.filter((r) => r.n < 9)) assert.ok(r.e < 1, `n = ${r.n} liegt schon über 1`);
  // Der Grund, warum das nur am Regler zu sehen ist: ungerade und gerade n
  // verhalten sich verschieden (bei geradem n liegt kein Knoten in der Mitte).
  for (let n = 9; n <= 19; n += 2) {
    const u = reihe.find((r) => r.n === n).e;
    const g = reihe.find((r) => r.n === n + 1).e;
    assert.ok(u > g, `ungerades n=${n} (${u}) sollte über geradem n=${n + 1} (${g}) liegen`);
  }
}

/* ---------- 3. Chebyshev im ERREICHBAREN Reglerbereich ---------- */
{
  for (const [n, soll] of [[15, 0.0466], [20, 0.0376], [21, 0.0153]]) {
    nahe(scan(cheb(n)).fehler, soll, 5e-4, `Chebyshev-Fehler bei n=${n}`);
  }
  // Bei n = 4, 6, 8 sind die äquidistanten Knoten tatsächlich besser.
  for (const n of [4, 6, 8]) {
    assert.ok(scan(cheb(n)).fehler > scan(aequi(n)).fehler, `Chebyshev ist bei n=${n} doch besser`);
  }
  // N_MAX = 21 ist erreichbar und der dort genannte Wert damit nachvollziehbar.
  assert.ok(N_MAX === 21 && scan(cheb(N_MAX)).fehler < 0.02);
}

console.log("S133Runge: Fehlertabelle, erste Überschreitung bei n = 9 und Chebyshev-Werte bestätigt.");
