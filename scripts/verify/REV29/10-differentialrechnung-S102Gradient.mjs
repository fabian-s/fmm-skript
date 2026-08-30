#!/usr/bin/env node
/**
 * REV29 — src/chapters/10-differentialrechnung/widgets/S102Gradient.tsx
 * (Gradientenfeld, RichtungsWidget, AbstiegStepper).
 *
 * Prüft die Zahlen aus Header, Presets und Verdikten sowie die beiden im
 * Review beanstandeten Stellen: die Senkrechte zum Gradienten im Kompass
 * (CRITICAL) und die Erreichbarkeit des Grenzfalls rho = 1.
 *
 * Unabhängige Rechenwege:
 *   - Gradienten gegen zentrale Differenzenquotienten (eps = 1e-5) statt gegen
 *     die im Widget hinterlegten Formeln;
 *   - Eigenwerte von A über die charakteristische Gleichung, alpha* zusätzlich
 *     durch einen Rasterlauf über rho;
 *   - die Kompass-Geometrie wird aus dem TSX-Quelltext GELESEN (die vier
 *     Koordinatenausdrücke des <line>-Elements) und als Vektor gegen den
 *     Gradienten getestet: das Skalarprodukt muss null sein.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const datei = "src/chapters/10-differentialrechnung/widgets/S102Gradient.tsx";
const src = readFileSync(join(repo, datei), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* --------------------------------------------------- die beiden Skalarfelder */

const f2 = (a, b) => a * a + 3 * a * b + 2 * b * b;
const g2 = (a, b) => a * Math.exp(-a * a - b * b);

/** Gradient rein numerisch, ohne die Formeln des Widgets. */
function gradNum(f, a, b, h = 1e-5) {
  return [(f(a + h, b) - f(a - h, b)) / (2 * h), (f(a, b + h) - f(a, b - h)) / (2 * h)];
}

// Header: f(1,1) = 6, ∇f(1,1) = (5, 7), ‖∇f(1,1)‖ = √74.
nah(f2(1, 1), 6, 1e-12, "f(1,1)");
const gf11 = gradNum(f2, 1, 1);
nah(gf11[0], 5, 1e-6, "∂f/∂x₁ (1,1)");
nah(gf11[1], 7, 1e-6, "∂f/∂x₂ (1,1)");
nah(Math.hypot(5, 7), 8.602325, 1e-6, "‖∇f(1,1)‖");

// f zerfällt in (x₁+x₂)(x₁+2x₂) — Gegenprobe auf einem Gitter.
for (let i = -20; i <= 20; i++) {
  for (let j = -20; j <= 20; j++) {
    const [a, b] = [i / 10, j / 10];
    nah(f2(a, b), (a + b) * (a + 2 * b), 1e-12, `Faktorisierung in (${a}; ${b})`);
  }
}

// Preset „fast flach": ∇f(−0,6; 0,4) = (0; −0,2).
const gflach = gradNum(f2, -0.6, 0.4);
nah(gflach[0], 0, 1e-6, "∂f/∂x₁ (−0,6; 0,4)");
nah(gflach[1], -0.2, 1e-6, "∂f/∂x₂ (−0,6; 0,4)");

// Hesse (2 3; 3 4): Spur 6, det −1, Eigenwerte über die p-q-Formel.
const spurH = 2 + 4;
const detH = 2 * 4 - 3 * 3;
nah(spurH, 6, 0, "Spur H");
nah(detH, -1, 0, "det H");
const wurzelH = Math.sqrt((spurH / 2) ** 2 - detH);
nah(spurH / 2 - wurzelH, -0.162278, 1e-6, "kleiner Eigenwert von H");
nah(spurH / 2 + wurzelH, 6.162278, 1e-6, "großer Eigenwert von H");

/* ---------------------------------- Preset „Maximum" der zweiten Funktion */

// Das Maximum von g liegt bei x₁ = 1/√2; dort verschwindet der Gradient.
const gMax = gradNum(g2, Math.SQRT1_2, 0);
assert.ok(Math.hypot(...gMax) < 1e-9, `∇g(1/√2; 0) muss verschwinden, ist aber ${Math.hypot(...gMax)}`);
nah(g2(Math.SQRT1_2, 0), 0.428882, 1e-6, "g im Maximum");
// Der alte Preset 0,70 lag daneben: dort ist ‖∇g‖ = 0,01225 > 1e-9, das Widget
// hätte also die reguläre Aussage geliefert.
nah(Math.hypot(...gradNum(g2, 0.7, 0)), 0.012253, 1e-6, "‖∇g(0,70; 0)‖ am alten Preset");
assert.ok(
  Math.hypot(...gradNum(g2, 0.7, 0)) > 1e-9,
  "Gegenprobe: der alte Preset trifft den kritischen Punkt nicht",
);
// Und das 0,05-Raster des Reglers trifft 1/√2 nicht.
assert.ok(
  Math.abs(Math.round(Math.SQRT1_2 * 20) / 20 - Math.SQRT1_2) > 1e-3,
  "1/√2 darf nicht auf dem 0,05-Raster liegen (sonst wäre der Preset überflüssig)",
);

// Preset „Flanke": ∇g(0,6; 0,5) = (0,152138; −0,326011).
const gflanke = gradNum(g2, 0.6, 0.5);
nah(gflanke[0], 0.152138, 1e-6, "∂g/∂x₁ (0,6; 0,5)");
nah(gflanke[1], -0.326011, 1e-6, "∂g/∂x₂ (0,6; 0,5)");

// Der dritte Verdikt-Zweig („fast flach") braucht die relative Schwelle
// 0,05·gmax; sie muss den Preset treffen und den steilen Punkt verfehlen.
function gmax(f) {
  let m = 0;
  for (let i = 0; i <= 80; i++)
    for (let j = 0; j <= 80; j++) m = Math.max(m, Math.hypot(...gradNum(f, -2 + i / 20, -2 + j / 20)));
  return m;
}
const gmaxF = gmax(f2);
nah(gmaxF, 17.20465, 1e-4, "größter Gradientenbetrag von f auf dem Ausschnitt");
assert.ok(Math.hypot(...gflach) < 0.05 * gmaxF, "Preset fast flach muss in den dritten Zweig fallen");
assert.ok(Math.hypot(...gf11) > 0.05 * gmaxF, "Preset steil muss regulär bleiben");

/* ------------------------------------------- Kompass: die Senkrechte zu ∇f */

// Die vier Koordinatenausdrücke des <line>-Elements aus dem Quelltext ziehen.
const block = src.match(
  /Tangente an die Höhenlinie[\s\S]*?<line\s+x1=\{([^}]*)\}\s+y1=\{([^}]*)\}\s+x2=\{([^}]*)\}\s+y2=\{([^}]*)\}/,
);
assert.ok(block, "Die <line> der Nulllinie wurde im Quelltext nicht gefunden");
const [x1A, y1A, x2A, y2A] = block.slice(1, 5);
assert.notEqual(y1A.trim(), y2A.trim(), "y1 und y2 der Nulllinie dürfen nicht identisch sein");

const auswerten = (ausdruck, g, norm) =>
  // eslint-disable-next-line no-new-func
  Function("K_MITTE", "K_R", "g", "norm", `return (${ausdruck});`)(117, 89, g, norm);

for (const g of [
  [5, 7],
  [0, -0.2],
  [-3, 1],
  [2, 0],
]) {
  const norm = Math.hypot(g[0], g[1]);
  const p1 = [auswerten(x1A, g, norm), auswerten(y1A, g, norm)];
  const p2 = [auswerten(x2A, g, norm), auswerten(y2A, g, norm)];
  const linie = [p2[0] - p1[0], p2[1] - p1[1]];
  // Der Gradientenpfeil in denselben Bildkoordinaten (Z. 754-755).
  const pfeil = [89 * (g[0] / norm), -89 * (g[1] / norm)];
  const skalar = linie[0] * pfeil[0] + linie[1] * pfeil[1];
  assert.ok(
    Math.abs(skalar) < 1e-9 * 89 * 89,
    `Nulllinie und Gradient müssen senkrecht stehen (∇f = ${g}), Skalarprodukt ${skalar}`,
  );
  nah(Math.hypot(...linie), 2 * 89, 1e-9, `Die Nulllinie muss ein Durchmesser sein (∇f = ${g})`);
  // Sie muss außerdem durch den Mittelpunkt laufen.
  nah((p1[0] + p2[0]) / 2, 117, 1e-9, `Mittelpunkt x (∇f = ${g})`);
  nah((p1[1] + p2[1]) / 2, 117, 1e-9, `Mittelpunkt y (∇f = ${g})`);
}

// cos 60° = 0,5: die Lösung der Schätzfrage und der zahlfrage in S102.mdx.
nah(Math.cos(Math.PI / 3), 0.5, 1e-15, "cos 60°");
for (const g of [
  [5, 7],
  [0.152138, -0.326011],
]) {
  const norm = Math.hypot(g[0], g[1]);
  const phiG = Math.atan2(g[1], g[0]);
  const d = [Math.cos(phiG + Math.PI / 3), Math.sin(phiG + Math.PI / 3)];
  nah((g[0] * d[0] + g[1] * d[1]) / norm, 0.5, 1e-12, `Richtungsableitung 60° neben ∇f = ${g}`);
}

/* -------------------------------------------------- Abstieg: A, rho, alpha* */

const A = [
  [2, 1],
  [1, 3],
];
const spurA = A[0][0] + A[1][1];
const detA = A[0][0] * A[1][1] - A[0][1] * A[1][0];
nah(spurA, 5, 0, "Spur A");
nah(detA, 5, 0, "det A");
const wurzelA = Math.sqrt((spurA / 2) ** 2 - detA);
const lmax = spurA / 2 + wurzelA;
const lmin = spurA / 2 - wurzelA;
nah(lmax, 3.618034, 1e-6, "λ_max");
nah(lmin, 1.381966, 1e-6, "λ_min");
// Gegenprobe: die Eigenwerte lösen die charakteristische Gleichung.
for (const l of [lmax, lmin]) nah(l * l - spurA * l + detA, 0, 1e-12, `charakteristische Gleichung für ${l}`);

const rho = (a) => Math.max(Math.abs(1 - a * lmax), Math.abs(1 - a * lmin));
const alphaOpt = 2 / (lmin + lmax);
nah(alphaOpt, 0.4, 1e-15, "α* = 2/(λ_min+λ_max)");
nah(rho(alphaOpt), Math.sqrt(5) / 5, 1e-12, "ρ(α*)");
nah(rho(alphaOpt) ** 2, 0.2, 1e-12, "ρ(α*)²");
// Rasterlauf als unabhängige Bestätigung des Minimums.
let besteA = 0.05;
for (let i = 5; i <= 90; i++) if (rho(i / 100) < rho(besteA)) besteA = i / 100;
nah(besteA, 0.4, 1e-12, "numerisches Minimum von ρ auf dem 0,01-Raster");

const alphaGrenz = 2 / lmax;
nah(alphaGrenz, 0.552786, 1e-6, "α = 2/λ_max");
nah(rho(alphaGrenz), 1, 1e-12, "ρ am Grenzfall");
// Der Grenzfall liegt NICHT auf dem 0,01-Raster des Reglers — genau deshalb
// braucht das Widget dafür einen Knopf.
nah(rho(0.55), 0.98992, 1e-4, "ρ(0,55)");
nah(rho(0.56), 1.02610, 1e-4, "ρ(0,56)");
for (let i = 5; i <= 70; i++) {
  assert.ok(
    Math.abs(rho(i / 100) - 1) > 0.001,
    `kein Rasterwert darf ρ ≈ 1 treffen, α = ${i / 100} tut es aber`,
  );
}
// Die drei Zustände des neuen Verdikts sind erreichbar und disjunkt.
assert.ok(rho(0.4) < 0.98, "α = 0,40 muss im regulären Zweig liegen");
assert.ok(rho(0.55) > 0.98 && rho(0.55) < 1.02, "α = 0,55 muss im Zweig nahe am Grenzfall liegen");
assert.ok(rho(0.7) > 1.02, "α = 0,70 muss im Divergenzzweig liegen");

/* --------------------------------------------------------- die Abstiegsbahn */

const verlust = (t) => 0.5 * (t[0] * (A[0][0] * t[0] + A[0][1] * t[1]) + t[1] * (A[1][0] * t[0] + A[1][1] * t[1]));
const schritt = (t, a) => [
  t[0] - a * (A[0][0] * t[0] + A[0][1] * t[1]),
  t[1] - a * (A[1][0] * t[0] + A[1][1] * t[1]),
];
const start = [1.8, -1.2];
nah(verlust(start), 3.24, 1e-12, "L(θ⁽⁰⁾)");

let t = start;
for (let k = 1; k <= 12; k++) {
  const vorher = verlust(t);
  t = schritt(t, alphaOpt);
  nah(verlust(t) / vorher, 0.2, 1e-9, `Verhältnis L⁽${k}⁾/L⁽${k - 1}⁾ bei α*`);
  if (k === 5) assert.ok(verlust(t) < 3.24 / 1000, "nach 5 Schritten muss L unter L⁽⁰⁾/1000 liegen");
  if (k === 5) nah(verlust(t), 1.037e-3, 1e-6, "L nach 5 Schritten");
  if (k === 12) nah(verlust(t), 1.33e-8, 1e-10, "L nach 12 Schritten");
}
// α = 0,7 lässt die Iteration davonlaufen (Verdikt-Zweig fail): Der Abstand
// zum Minimum wächst asymptotisch genau mit dem Faktor ρ(0,7).
let t7 = start;
let vorNorm = Math.hypot(...t7);
for (let k = 1; k <= 12; k++) {
  t7 = schritt(t7, 0.7);
  const jetztNorm = Math.hypot(...t7);
  if (k >= 6) nah(jetztNorm / vorNorm, rho(0.7), 1e-3, `Wachstumsfaktor in Schritt ${k} bei α = 0,7`);
  vorNorm = jetztNorm;
}
assert.ok(Math.hypot(...t7) > 10, "bei α = 0,7 muss die Iteration nach 12 Schritten weit draußen sein");
nah(rho(0.7), 1.532624, 1e-6, "ρ(0,7)");

console.log(`REV29 ${datei}: Gradienten, Kompass-Geometrie und Abstiegsraten geprüft.`);
