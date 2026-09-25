#!/usr/bin/env node
/**
 * REV29 — src/chapters/10-differentialrechnung/widgets/S108Taylor1D.tsx und
 * .../S108Taylor2D.tsx (TaylorOrdnungWidget, Taylor2DWidget).
 *
 * Ersetzt die in den Headern zitierten, im Repo nicht vorhandenen Skripte
 * rev-s114-a/b/d/f.mjs und check-s114.mjs.
 *
 * Unabhängige Rechenwege:
 *   - Die Taylorpolynome von exp werden hier NICHT aus der Summenformel
 *     gebildet, sondern per Horner aus den Koeffizienten 1/j!, und zusätzlich
 *     gegen die Restgliedschranke |x|^(k+1)/(k+1)! · e^max(0,x) gehalten.
 *   - Für die 2D-Fälle werden Gradient und Hesse-Matrix aus zentralen
 *     Differenzen der Funktion selbst gewonnen, nicht aus den im Widget
 *     hinterlegten Ableitungsformeln; damit sind T₁ und T₂ unabhängig gebaut.
 */
import assert from "node:assert/strict";

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ══════════════════════════════════════ S108Taylor1D: exp um den Nullpunkt */

/** T_k per Horner aus den Koeffizienten 1/j!. */
function taylorExp(k) {
  const c = [];
  let f = 1;
  for (let j = 0; j <= k; j++) {
    if (j > 0) f *= j;
    c.push(1 / f);
  }
  return (x) => {
    let s = 0;
    for (let j = k; j >= 0; j--) s = s * x + c[j] * 1;
    // Horner über die Koeffizientenliste in aufsteigender Ordnung
    let t = 0;
    for (let j = k; j >= 0; j--) t = t * x + c[j];
    void s;
    return t;
  };
}

nah(Math.exp(0.5), 1.6487212707, 1e-9, "e^0,5");
nah(taylorExp(1)(0.5), 1.5, 1e-12, "T₁(0,5)");
nah(taylorExp(2)(0.5), 1.625, 1e-12, "T₂(0,5)");
nah(taylorExp(3)(0.5), 1.6458333333, 1e-9, "T₃(0,5)");

const fehler1D = (k, x) => Math.abs(Math.exp(x) - taylorExp(k)(x));
nah(fehler1D(1, 0.5), 0.148721, 1e-6, "Fehler von T₁ bei x = 0,5");
nah(fehler1D(2, 0.5), 0.0237213, 1e-6, "Fehler von T₂ bei x = 0,5");
nah(fehler1D(3, 0.5), 0.0028879, 1e-6, "Fehler von T₃ bei x = 0,5");

// Die Restgliedschranke aus Satz 10.8.x als unabhängige Kontrolle.
let fak = 1;
for (let k = 0; k <= 5; k++) {
  fak *= k + 1;
  const schranke = (0.5 ** (k + 1) / fak) * Math.exp(0.5);
  assert.ok(
    fehler1D(k, 0.5) <= schranke + 1e-15,
    `Fehler von T${k} bei x = 0,5 muss unter der Restgliedschranke ${schranke} liegen`,
  );
}

// Die Fehlerquotienten bei x = 0,5 — die Schätzfrage zielt auf 8.
const quot = (k) => fehler1D(k - 1, 0.5) / fehler1D(k, 0.5);
nah(quot(1), 4.362, 1e-3, "Quotient T₀ → T₁");
nah(quot(2), 6.270, 1e-3, "Quotient T₁ → T₂");
nah(quot(3), 8.214, 1e-3, "Quotient T₂ → T₃");
nah(quot(4), 10.177, 1e-3, "Quotient T₃ → T₄");
// Die Antwortoptionen sind 2 / 5 / 8; nur „8" liegt richtig.
assert.ok(Math.abs(quot(3) - 8) < Math.abs(quot(3) - 5), "Faktor 8 muss näher liegen als 5");
assert.ok(Math.abs(quot(3) - 8) < Math.abs(quot(3) - 2), "Faktor 8 muss näher liegen als 2");
// Das Verdikt zeigt den Kehrwert; beide Formen müssen zusammenpassen.
nah(1 / quot(3), 0.1217, 1e-4, "Kehrwert des Quotienten T₂ → T₃");

// Größter Fehler auf [−1, 1] bzw. [−3, 3].
function maxFehler(k, a, b) {
  let m = 0;
  for (let i = 0; i <= 4000; i++) m = Math.max(m, fehler1D(k, a + ((b - a) * i) / 4000));
  return m;
}
const SOLL_MAX = [
  [1, 0.7183, 16.09],
  [2, 0.2183, 11.59],
  [3, 0.0516, 7.086],
  [4, 0.00995, 3.711],
];
for (const [k, nahWert, weitWert] of SOLL_MAX) {
  nah(maxFehler(k, -1, 1), nahWert, 5e-4, `größter Fehler von T${k} auf [−1, 1]`);
  nah(maxFehler(k, -3, 3), weitWert, 5e-3, `größter Fehler von T${k} auf [−3, 3]`);
}

// Der linke Rand ist nicht monoton: bei x = −3 wächst der Fehler von T₀ auf T₁.
nah(fehler1D(0, -3), 0.9502, 1e-4, "Fehler von T₀ bei x = −3");
nah(fehler1D(1, -3), 2.0498, 1e-4, "Fehler von T₁ bei x = −3");
nah(fehler1D(2, -3), 2.4502, 1e-4, "Fehler von T₂ bei x = −3");
nah(fehler1D(3, -3), 2.0498, 1e-4, "Fehler von T₃ bei x = −3");
assert.ok(fehler1D(1, -3) > fehler1D(0, -3), "bei x = −3 muss der Fehler von T₀ auf T₁ wachsen");
// Ab welchem x kippt es? Der Header nennt x ≤ −1,60 (k = 1) und x ≤ −2,60 (k = 2).
const kippt = (k) => {
  for (let i = 0; i <= 60; i++) {
    const x = -i / 20;
    if (fehler1D(k, x) > fehler1D(k - 1, x)) return x;
  }
  return NaN;
};
nah(kippt(1), -1.6, 0.051, "Kippstelle für k = 1");
nah(kippt(2), -2.6, 0.051, "Kippstelle für k = 2");

/* ══════════════════════════════════════════════ S108Taylor2D: drei Funktionen */

const FN = {
  sincos: (a, b) => Math.sin(a) + Math.cos(b),
  glocke: (a, b) => Math.exp(-(a * a + b * b) / 2),
  quadrik: (a, b) => 2 * a * a + 2 * a * b + 3 * b * b - 4 * a - 6 * b,
};

/** Gradient und Hesse-Matrix rein numerisch. */
function ableitungen(f, a, b, h = 1e-4) {
  const g = [(f(a + h, b) - f(a - h, b)) / (2 * h), (f(a, b + h) - f(a, b - h)) / (2 * h)];
  const H = [
    [(f(a + h, b) - 2 * f(a, b) + f(a - h, b)) / (h * h), 0],
    [0, (f(a, b + h) - 2 * f(a, b) + f(a, b - h)) / (h * h)],
  ];
  H[0][1] = (f(a + h, b + h) - f(a + h, b - h) - f(a - h, b + h) + f(a - h, b - h)) / (4 * h * h);
  H[1][0] = H[0][1];
  return { g, H };
}

/** Größter Abstand zwischen f und T_ordnung auf dem Kreis mit Radius rad. */
function kreisFehler(f, x1, x2, ordnung, rad) {
  const { g, H } = ableitungen(f, x1, x2);
  const f0 = f(x1, x2);
  const T = (a, b) => {
    const h1 = a - x1;
    const h2 = b - x2;
    const linear = f0 + g[0] * h1 + g[1] * h2;
    if (ordnung === 1) return linear;
    return linear + 0.5 * (h1 * (H[0][0] * h1 + H[0][1] * h2) + h2 * (H[1][0] * h1 + H[1][1] * h2));
  };
  let m = 0;
  for (let i = 0; i < 720; i++) {
    const t = (2 * Math.PI * i) / 720;
    m = Math.max(m, Math.abs(f(x1 + rad * Math.cos(t), x2 + rad * Math.sin(t)) - T(x1 + rad * Math.cos(t), x2 + rad * Math.sin(t))));
  }
  return m;
}

const X1 = 0.75;
const X2 = -1.25;
const R = 0.8;

// Die numerischen Ableitungen müssen die analytischen des Widgets treffen.
const anaSincos = ableitungen(FN.sincos, X1, X2);
nah(anaSincos.g[0], Math.cos(X1), 1e-7, "∂/∂x₁ von sin+cos");
nah(anaSincos.g[1], -Math.sin(X2), 1e-7, "∂/∂x₂ von sin+cos");
nah(anaSincos.H[0][0], -Math.sin(X1), 1e-5, "H₁₁ von sin+cos");
nah(anaSincos.H[1][1], -Math.cos(X2), 1e-5, "H₂₂ von sin+cos");
nah(anaSincos.H[0][1], 0, 1e-6, "H₁₂ von sin+cos");
const anaQuad = ableitungen(FN.quadrik, X1, X2);
nah(anaQuad.H[0][0], 4, 1e-5, "H₁₁ der Quadrik");
nah(anaQuad.H[0][1], 2, 1e-5, "H₁₂ der Quadrik");
nah(anaQuad.H[1][1], 6, 1e-5, "H₂₂ der Quadrik");

// Die Quotienten in der Voreinstellung: 4,341 / 8,066 (sin+cos), 3,990 / 8,778
// (Glocke), exakt 4 für T₁ auf der Quadrik.
const q = (id, ordnung) => kreisFehler(FN[id], X1, X2, ordnung, R) / kreisFehler(FN[id], X1, X2, ordnung, R / 2);
nah(q("sincos", 1), 4.341, 5e-3, "T₁-Quotient bei sin+cos");
nah(q("sincos", 2), 8.066, 2e-2, "T₂-Quotient bei sin+cos");
nah(q("glocke", 1), 3.99, 1e-2, "T₁-Quotient bei der Glocke");
nah(q("glocke", 2), 8.778, 3e-2, "T₂-Quotient bei der Glocke");
nah(q("quadrik", 1), 4, 1e-4, "T₁-Quotient auf der Quadrik");
// Auf der Quadrik ist T₂ exakt. Mit den numerisch bestimmten Ableitungen
// bleibt nur der Rundungsfehler der Differenzenquotienten stehen …
assert.ok(
  kreisFehler(FN.quadrik, X1, X2, 2, R) < 1e-6,
  `auf der Quadrik muss der T₂-Fehler numerisch null sein (ist ${kreisFehler(FN.quadrik, X1, X2, 2, R)})`,
);
// … und mit den symbolisch abgelesenen Ableitungen verschwindet er ganz:
// f(x+h) = f(x) + ∇f(x)h + ½hᵀHh gilt für ein Polynom zweiten Grades exakt.
{
  const g = [4 * X1 + 2 * X2 - 4, 2 * X1 + 6 * X2 - 6];
  const H = [
    [4, 2],
    [2, 6],
  ];
  let m = 0;
  for (let i = 0; i < 720; i++) {
    const t = (2 * Math.PI * i) / 720;
    const h1 = R * Math.cos(t);
    const h2 = R * Math.sin(t);
    const T =
      FN.quadrik(X1, X2) +
      g[0] * h1 +
      g[1] * h2 +
      0.5 * (h1 * (H[0][0] * h1 + H[0][1] * h2) + h2 * (H[1][0] * h1 + H[1][1] * h2));
    m = Math.max(m, Math.abs(FN.quadrik(X1 + h1, X2 + h2) - T));
  }
  assert.ok(m < 1e-13, `T₂ muss auf der Quadrik exakt sein (größte Abweichung ${m})`);
}
// Die im Selbsttest genannten Einzelwerte des Readouts.
nah(kreisFehler(FN.sincos, X1, X2, 1, R), 0.2672, 2e-3, "größter T₁-Fehler auf dem Kreis r = 0,8");
nah(kreisFehler(FN.sincos, X1, X2, 1, R / 2), 0.0616, 5e-4, "größter T₁-Fehler auf dem halben Kreis");

// „Faustzahl 4" ist eine Faustzahl: Über den vollen Reglerbereich
// (x₁, x₂ ∈ [−2; 2] im Raster 0,05, r ∈ [0,1; 1,4] im Raster 0,05, beide nicht
// quadratischen Funktionen) läuft der Quotient wirklich von 2,70 bis 7,28 für
// T₁ und von 5,79 bis 15,98 für T₂ — deshalb der Sonderzweig im Verdikt.
// Ein Sweep über das (gröbere) 0,1-Raster darf diese Hülle nirgends verlassen.
const HUELLE = { 1: [2.69, 7.29], 2: [5.78, 15.99] };
for (const ordnung of [1, 2]) {
  const [lo, hi] = HUELLE[ordnung];
  for (const id of ["sincos", "glocke"]) {
    for (let ri = 1; ri <= 14; ri++) {
      const rad = ri * 0.1;
      for (let i = -20; i <= 20; i++) {
        for (let j = -20; j <= 20; j++) {
          const a = i / 10;
          const b = j / 10;
          const e2 = kreisFehler(FN[id], a, b, ordnung, rad / 2);
          if (e2 < 1e-11) continue;
          const wert = kreisFehler(FN[id], a, b, ordnung, rad) / e2;
          if (!Number.isFinite(wert)) continue;
          assert.ok(
            wert >= lo && wert <= hi,
            `T${ordnung}-Quotient ${wert} bei ${id} (${a}; ${b}), r = ${rad} verlässt die im Header genannte Spanne [${lo}; ${hi}]`,
          );
        }
      }
    }
  }
}
// Die vier Extremstellen des Headers werden auch wirklich angenommen.
const quotAn = (id, a, b, ordnung, rad) =>
  kreisFehler(FN[id], a, b, ordnung, rad) / kreisFehler(FN[id], a, b, ordnung, rad / 2);
nah(quotAn("glocke", -0.6, 1.8, 1, 1.4), 2.7, 0.02, "kleinster T₁-Quotient");
nah(quotAn("glocke", -1.85, -1.65, 2, 1.4), 5.79, 0.02, "kleinster T₂-Quotient");
nah(quotAn("glocke", 0, 0, 2, 0.1), 15.98, 0.05, "größter T₂-Quotient");
// Der im Header genannte Extremfall H ≈ 0 bei sin+cos.
nah(
  kreisFehler(FN.sincos, 0, 1.55, 1, 0.85) / kreisFehler(FN.sincos, 0, 1.55, 1, 0.425),
  7.28,
  0.02,
  "T₁-Quotient bei nahezu verschwindender Hesse-Matrix",
);

console.log("REV29 S108Taylor1D/S108Taylor2D: Ordnungen, Fehlerquotienten und Sonderfälle geprüft.");
