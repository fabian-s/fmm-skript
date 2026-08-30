#!/usr/bin/env node
/**
 * REV29 — src/chapters/04-fehler/widgets/S43Widgets.tsx
 * (SgdLernratenDemo und KappaRechner).
 *
 * Schließt die Lücken, die scripts/verify/R2/check-s43-claims.mjs offen lässt:
 * den Pfad bei α = 0,72, den beworbenen Fall α = 0,5 (ρ = 0, ein Schritt) und
 * den Standardzustand des freien κ-Modus a = 2000, b = 1999.
 *
 * Unabhängiger Rechenweg: die Iterierten werden hier Schritt für Schritt aus
 * der Vorschrift θ − α·2θ gebildet (wie im Widget), die Sollwerte stammen aber
 * aus der geschlossenen Form θ₀(1−2α)^k und sind zusätzlich hartkodiert; keine
 * Assertion vergleicht einen Ausdruck mit sich selbst.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/04-fehler/widgets/S43Widgets.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ------------------------------------------------------------- SGD-Iteration */

const THETA0 = 2.5;
/** Iterierte Schritt für Schritt, rauschfrei — der Rechenweg des Widgets. */
function pfad(alpha, n) {
  const arr = [THETA0];
  let th = THETA0;
  for (let k = 0; k < n; k++) {
    th = th - alpha * (2 * th);
    arr.push(th);
  }
  return arr;
}

// Der im Header abgedruckte Pfad bei α = 0,72.
const SOLL072 = [2.5, -1.1, 0.484, -0.213, 0.094, -0.041, 0.018];
const p072 = pfad(0.72, 6);
for (let i = 0; i < SOLL072.length; i++) {
  nah(p072[i], SOLL072[i], 5e-4, `Pfad α = 0,72, Schritt ${i}`);
}
// Vorzeichenwechsel in jedem Schritt (das Verdikt „springt über das Minimum").
for (let i = 1; i < p072.length; i++) {
  assert.ok(p072[i] * p072[i - 1] < 0, `kein Vorzeichenwechsel in Schritt ${i}`);
}

// α = 0,5: ρ = 0, ein Schritt genügt — der Fall, der bis REV29 weder Preset noch
// Verdikt-Zweig hatte.
const p05 = pfad(0.5, 30);
assert.equal(p05[1], 0, `α = 0,5 landet nicht exakt im Minimum: ${p05[1]}`);
assert.ok(p05.slice(1).every((v) => v === 0), "nach dem ersten Schritt bewegt sich noch etwas");
nah(Math.abs(1 - 2 * 0.5), 0, 0, "ρ(0,5)");
assert.ok(/const einSchritt = alphaRaster === 50/.test(src), "der ρ = 0-Zweig fehlt");
assert.ok(/id: "einschritt"/.test(src), "der fünfte Preset α = 0,5 fehlt");
// Der α-Regler muss die beiden ausgezeichneten Werte auch treffen können.
const reglerAlpha = src.match(/label="Lernrate α"[\s\S]*?min=\{([\d.]+)\}[\s\S]*?step=\{([\d.]+)\}/);
assert.ok(reglerAlpha, "der α-Regler ist nicht mehr auffindbar");
const [minA, stepA] = [Number(reglerAlpha[1]), Number(reglerAlpha[2])];
for (const ziel of [0.5, 1]) {
  const n = (ziel - minA) / stepA;
  assert.ok(Math.abs(n - Math.round(n)) < 1e-9, `α = ${ziel} liegt nicht auf dem Reglerraster`);
}

// Grenzfall α = 1: rauschfrei bleibt |θ| bei 2,5 — der Wert, den das Verdikt
// seit REV29 nennt (vorher stand dort der VERRAUSCHTE Endwert).
const p1 = pfad(1, 30);
assert.ok(p1.every((v) => Math.abs(v) === 2.5), "die Amplitude bleibt nicht konstant");
nah(THETA0 * Math.abs(1 - 2 * 1) ** 30, 2.5, 1e-12, "θ₃₀ ohne Rauschen bei α = 1");
assert.ok(/const ohneRauschen = THETA0 \* rho \*\* /.test(src), "der rauschfreie Wert fehlt");
assert.ok(
  !/bleibt bei \{fmtDe\(Math\.abs\(letzte\), 2\)\}/.test(src),
  "das Grenzfall-Verdikt zeigt wieder den verrauschten Wert",
);

// Divergenz: θ₃₀ = 6,55 · 10³ bei α = 1,15.
nah(pfad(1.15, 30)[30], 6549.9891091248, 1e-6, "θ₃₀ bei α = 1,15");
nah(Math.abs(1 - 2 * 1.15), 1.3, 1e-12, "ρ(1,15)");
// … und die Abbruchschwelle |θ| > 10⁴ wird innerhalb von 30 Schritten gerissen.
const p115 = pfad(1.15, 40);
const ersterAusbruch = p115.findIndex((v) => Math.abs(v) > 1e4);
assert.ok(ersterAusbruch > 30, `der Plot wird schon nach ${ersterAusbruch} Schritten verlassen`);

/* --------------------------------------------------------------- κ-Rechner */

const kappa = (a, b) => (Math.SQRT2 * Math.hypot(a, b)) / Math.abs(a - b);

// Der Standardzustand des freien Modus (Header, bisher unbelegt).
nah(kappa(2000, 1999), 3999.0, 5e-4, "κ_rel(2000, 1999)");
nah(Math.log10(kappa(2000, 1999)), 3.602, 5e-4, "log₁₀ κ_rel(2000, 1999)");

// Der an c gekoppelte Modus, gegen unabhängig hingeschriebene Sollwerte.
for (const [k, sollKappa, sollLog] of [[2, 20001.000025, 4.301], [5, 2.0e10, 10.301], [8, 2.0e16, 16.301], [10, 2.0e20, 20.301]]) {
  // Wie im Widget wird der Nenner |a − b| = 1 ANALYTISCH gesetzt: in Doubles
  // wäre (c² + 1) − c² für großes c selbst schon ausgelöscht.
  const c2 = 10 ** (2 * k);
  const kap = Math.SQRT2 * Math.hypot(c2 + 1, c2);
  nah(kap / sollKappa, 1, 1e-9, `κ_rel bei k = ${k}`);
  nah(Math.log10(kap), sollLog, 5e-4, `log₁₀ κ_rel bei k = ${k}`);
}
// Die Aussage der Konsolidierung: bei c = 10⁸ sind es „gut 16" Stellen, nicht genau 16.
const verlust8 = Math.log10(Math.SQRT2 * Math.hypot(10 ** 16 + 1, 10 ** 16));
assert.ok(verlust8 > 16, `bei c = 10⁸ gehen nur ${verlust8} Stellen verloren`);
nah(verlust8, 16.301, 5e-4, "verlorene Stellen bei c = 10⁸");

// Beispiel 4.3.7 aus dem Header.
nah(16384 / 1.023151, 1.6014e4, 1, "beobachtete Verstärkung");

console.log("REV29 04-fehler-S43Widgets: ok");
