#!/usr/bin/env node
/**
 * REV29 — src/chapters/10-differentialrechnung/widgets/S106Kettenregel.tsx
 * (KettenregelWidget) und .../S106Logistik.tsx (LogistikWidget).
 *
 * Ersetzt den Verweis auf scripts/verify/R4/check-r4-claims.mjs, das von den
 * Zahlen dieser beiden Widgets nichts prüft.
 *
 * Unabhängiger Rechenweg: Die Kettenregel wird gegen einen zentralen
 * Differenzenquotienten der VERKETTETEN Funktion gehalten (das Produkt der
 * beiden Faktoren kommt also nicht in die Kontrollrechnung hinein); beim
 * logistischen Verlust wird der Gradient (yhat − y)·x ebenso gegen den
 * Differenzenquotienten von ell(beta) gestellt.
 */
import assert from "node:assert/strict";

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const sigma = (t) => 1 / (1 + Math.exp(-t));
const ableitungNum = (h, x, eps = 1e-6) => (h(x + eps) - h(x - eps)) / (2 * eps);

/* ═══════════════════════════════════════════════════ S106Kettenregel */

const VERKETTUNGEN = [
  { id: "potenz", f: (x) => 2 * x + 1, fp: () => 2, g: (u) => u ** 4, gp: (u) => 4 * u ** 3, start: 0.3 },
  { id: "wurzel", f: (x) => x * x, fp: (x) => 2 * x, g: (u) => Math.sqrt(u), gp: (u) => 1 / (2 * Math.sqrt(u)), start: 0.6 },
  { id: "logistisch", f: (x) => 3 * x - 1, fp: () => 3, g: sigma, gp: (u) => sigma(u) * (1 - sigma(u)), start: 0.3 },
];

// (2x+1)⁴ bei x = 0,3.
const potenz = VERKETTUNGEN[0];
nah(potenz.f(0.3), 1.6, 1e-15, "f(0,3) = 2·0,3+1");
nah(potenz.g(potenz.f(0.3)), 6.5536, 1e-12, "h(0,3) = 1,6⁴");
nah(potenz.fp(0.3), 2, 0, "f′(0,3)");
nah(potenz.gp(potenz.f(0.3)), 16.384, 1e-12, "g′(f(0,3)) = 4·1,6³");
nah(potenz.gp(potenz.f(0.3)) * potenz.fp(0.3), 32.768, 1e-12, "Produkt der beiden Faktoren");
// Das ist auch die Lösung der zahlfrage in S106.mdx.
nah(2 * 4 * 1.6 ** 3, 32.768, 1e-12, "2·4·1,6³");

// σ(3x−1) bei x = 0,3.
const log = VERKETTUNGEN[2];
nah(log.f(0.3), -0.1, 1e-15, "f(0,3) = 3·0,3−1");
nah(log.g(log.f(0.3)), 0.475021, 1e-6, "h(0,3) = σ(−0,1)");
nah(log.gp(log.f(0.3)), 0.249376, 1e-6, "g′(f(0,3))");
nah(log.gp(log.f(0.3)) * log.fp(0.3), 0.748128, 1e-6, "Produkt bei σ(3x−1)");

// Gegenprobe: das Produkt trifft überall den Differenzenquotienten von h.
for (const v of VERKETTUNGEN) {
  for (let i = -30; i <= 30; i++) {
    const x = i / 20;
    if (v.id === "wurzel" && Math.abs(x) < 0.05) continue; // dort ist h nicht differenzierbar
    const h = (t) => v.g(v.f(t));
    const kette = v.gp(v.f(x)) * v.fp(x);
    nah(kette, ableitungNum(h, x), 2e-6 * Math.max(1, Math.abs(kette)), `Kettenregel bei ${v.id}, x = ${x}`);
  }
}

// √(x²) = |x|: die beiden Faktoren laufen aus dem Ruder, das Produkt bleibt zahm.
const wurzel = VERKETTUNGEN[1];
nah(wurzel.fp(0.6), 1.2, 1e-15, "f′(0,6) = 2·0,6");
nah(wurzel.gp(wurzel.f(0.6)), 1 / 1.2, 1e-12, "g′(0,36) = 1/(2·0,6)");
for (const x of [0.05, 0.2, 0.6, 1.5, -0.05, -0.6, -1.5]) {
  nah(wurzel.gp(wurzel.f(x)) * wurzel.fp(x), Math.sign(x), 1e-12, `Produkt bei √(x²), x = ${x}`);
}
// Bei x = 0 ist g′ unendlich, f′ null — das Produkt ist keine Zahl.
assert.ok(!Number.isFinite(wurzel.gp(wurzel.f(0)) * wurzel.fp(0)), "bei x = 0 darf kein Wert herauskommen");
// Der zentrale Differenzenquotient meldet dort trotzdem 0 — genau der Punkt des Verdikts.
nah(ableitungNum((t) => Math.abs(t), 0), 0, 1e-15, "zentraler Quotient von |x| in 0");
// Und der Reglerwert 0 ist auf dem 0,05-Raster exakt erreichbar.
assert.ok(Number.isInteger(0 / 0.05), "die Null muss auf dem x-Raster liegen");

/* ═══════════════════════════════════════════════════════ S106Logistik */

// ell(beta) = −[y log yhat + (1−y) log(1−yhat)] mit yhat = sigma(beta x).
const verlust = (beta, x, y) => {
  const yhat = sigma(beta * x);
  return -(y * Math.log(yhat) + (1 - y) * Math.log(1 - yhat));
};
const gradFormel = (beta, x, y) => (sigma(beta * x) - y) * x;

for (const [beta, x, y] of [
  [0.5, 1.5, 1],
  [-1.2, 1.5, 1],
  [2, -0.8, 1],
  [0.5, 0, 1],
  [0.5, 1.5, 0],
  [-1.2, 1.5, 0],
  [2, -0.8, 0],
]) {
  const num = ableitungNum((b) => verlust(b, x, y), beta);
  nah(gradFormel(beta, x, y), num, 1e-9, `Gradient bei (β; x; y) = (${beta}; ${x}; ${y})`);
}

// Beispielwerte für y = 1 und x = 1,5.
nah(sigma(0.5 * 1.5), 0.6792, 1e-4, "ŷ bei β = 0,5");
nah(gradFormel(0.5, 1.5, 1), -0.4812, 1e-4, "Gradient bei β = 0,5");
nah(sigma(-1.5 * 1.5), 0.0953, 1e-4, "ŷ bei β = −1,5");
nah(gradFormel(-1.5, 1.5, 1), -1.3570, 1e-4, "Gradient bei β = −1,5");

// Die Schranke |∇ell| < |x|, weil |ŷ − y| < 1 ist.
for (let bi = -40; bi <= 40; bi++)
  for (let xi = -20; xi <= 20; xi++) {
    const beta = bi / 10;
    const x = xi / 10;
    if (x === 0) continue;
    for (const y of [0, 1])
      assert.ok(
        Math.abs(gradFormel(beta, x, y)) < Math.abs(x),
        `|∇ℓ| muss unter |x| bleiben (β = ${beta}, x = ${x}, y = ${y})`,
      );
  }

// x = 0: der Verlust ist konstant log 2, der Gradient null. Das ist die Lösung
// der zahlfrage in S106.mdx.
nah(Math.log(2), 0.693147, 1e-6, "log 2");
for (const beta of [-3, -1, 0, 0.7, 2.5]) {
  for (const y of [0, 1]) {
    nah(verlust(beta, 0, y), Math.log(2), 1e-15, `ℓ(β) bei x = 0, y = ${y}`);
    nah(gradFormel(beta, 0, y), 0, 0, `Gradient bei x = 0, y = ${y}`);
  }
}
// Der Reglerwert x = 0 ist auf dem 0,1-Raster exakt erreichbar.
assert.ok(Number.isInteger(0 / 0.1), "die Null muss auf dem x-Raster liegen");

console.log("REV29 S106Kettenregel/S106Logistik: Kettenregel und logistischer Gradient geprüft.");
