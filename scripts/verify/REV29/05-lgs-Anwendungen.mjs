#!/usr/bin/env node
/**
 * REV29 — LUKosten.tsx, SpdRichtung.tsx und CholeskySampler.tsx (§5.3/§5.4).
 *
 * Ersetzt den Header-Verweis auf das nie existierende `verify-05-lgs/verify.mjs`
 * für diese drei Widgets: die Kostenschwelle J = 2 samt der drei neuen
 * Verdikt-Regime, die Nullrichtungen der quadratischen Form und der
 * Cholesky-Faktor der Kovarianzmatrix (an L₂₂ hängt die neue Zahlfrage in
 * S54.mdx).
 *
 * Unabhängiger Rechenweg: die Kosten werden hier als Summe der einzelnen
 * Posten aufgeschrieben (nicht als fertige Formel), die quadratische Form über
 * das Additionstheorem cos(2θ) statt über das Skalarprodukt, und der
 * Cholesky-Faktor über die geschlossene Form σ₂√(1−ρ²) statt über die
 * Rekursion, die das Widget jetzt rechnet.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const lies = (p) => readFileSync(join(repo, p), "utf8");
const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ------------------------------------------------------------- LUKosten */

const kostenLU = (n, J) => (n * n * n) / 3 + J * n * n;
const kostenNeu = (n, J) => J * ((n * n * n) / 3 + n * n);

// Gegenprobe: dieselben Kosten Posten für Posten aufaddiert.
for (const n of [10, 100, 1000]) {
  for (const J of [1, 2, 7, 50, 500]) {
    let lu = (n * n * n) / 3;
    for (let j = 0; j < J; j++) lu += n * n;
    let neu = 0;
    for (let j = 0; j < J; j++) neu += (n * n * n) / 3 + n * n;
    nah(lu / kostenLU(n, J), 1, 1e-12, `Kosten LU (n = ${n}, J = ${J})`);
    nah(neu / kostenNeu(n, J), 1, 1e-12, `Kosten Neuansatz (n = ${n}, J = ${J})`);
  }
}

// Die Schwelle: J = 1 ist Gleichstand, ab J = 2 ist die Zerlegung strikt billiger.
for (const n of [10, 100, 1000]) {
  assert.equal(kostenLU(n, 1), kostenNeu(n, 1), `J = 1 ist bei n = ${n} kein Gleichstand`);
  assert.ok(kostenLU(n, 2) < kostenNeu(n, 2), `J = 2 ist bei n = ${n} nicht billiger`);
  // … und für J ≫ n läuft der Faktor gegen (n³/3 + n²)/n² = n/3 + 1.
  const grenze = ((n * n * n) / 3 + n * n) / (n * n);
  nah(grenze, n / 3 + 1, 1e-9, `Grenzfaktor bei n = ${n}`);
  const f = kostenNeu(n, 100000) / kostenLU(n, 100000);
  assert.ok(f < grenze && f > 0.98 * grenze, `der Faktor nähert sich bei n = ${n} nicht der Schranke`);
}
// Die Zahl der Konsolidierung: n = 100, J = 50 kostet rund das Zwanzigfache.
nah(kostenNeu(100, 50) / kostenLU(100, 50), 20.6, 0.05, "Ersparnisfaktor bei n = 100, J = 50");

const kosten = lies("src/chapters/05-lgs/widgets/LUKosten.tsx");
assert.ok(/J === 1 \?/.test(kosten), "das Verdikt hat wieder nur einen Zweig");
assert.ok(/xDomain=\{\[1, Math\.max\(10, Math\.min\(J_MAX, 2 \* J\)\)\]\}/.test(kosten),
  "das Plotfenster hängt nicht mehr an J");
assert.ok(/verdeckt=/.test(kosten), "die Schätzfrage hat keine Auflösung mehr");

/* ----------------------------------------------------------- SpdRichtung */

// diag(1, −1): q(θ) = cos²θ − sin²θ = cos(2θ); diag(2, 1): q = 1 + cos²θ ≥ 1.
const qNicht = (grad) => {
  const t = (grad * Math.PI) / 180;
  return Math.cos(t) ** 2 - Math.sin(t) ** 2;
};
const qSpd = (grad) => {
  const t = (grad * Math.PI) / 180;
  return 2 * Math.cos(t) ** 2 + Math.sin(t) ** 2;
};
for (const g of [0, 17, 45, 90, 180, 271, 360]) {
  nah(qNicht(g), Math.cos((2 * g * Math.PI) / 180), 1e-12, `q(${g}°) ≠ cos 2θ`);
}
// Der neue Startwert θ = 20° liegt im positiven Bereich (die Aufgabe ist offen).
nah(qNicht(20), 0.766044443, 1e-9, "q(20°)");
assert.ok(qNicht(20) > 0, "der Startzustand löst die Aufgabe schon");
// Die vier Nullrichtungen auf dem 1°-Raster.
const nullen = [];
for (let g = 0; g < 360; g++) if (g % 90 === 45) nullen.push(g);
assert.deepEqual(nullen, [45, 135, 225, 315], "die Nullrichtungen stimmen nicht");
for (const g of nullen) nah(qNicht(g), 0, 1e-15, `q(${g}°) ist nicht null`);
// … und q < 0 ist erreichbar (die eigentliche Aufgabe).
assert.ok(qNicht(90) < 0 && qNicht(46) < 0, "kein θ widerlegt positive Definitheit");
// Für die SPD-Familie bleibt q ≥ 1 über den ganzen Regler.
for (let g = 0; g <= 360; g++) assert.ok(qSpd(g) >= 1 - 1e-12, `q_spd(${g}°) < 1`);

const spd = lies("src/chapters/05-lgs/widgets/SpdRichtung.tsx");
assert.ok(/useState\(20\)/.test(spd), "SpdRichtung startet wieder bei θ = 45°");
assert.ok(/Math\.round\(theta\) % 90 === 45/.test(spd), "die Nullrichtung wird nicht exakt erkannt");
assert.ok(!/hit = q <= 1e-9/.test(spd), "die 1e−9-Toleranz ist zurück");

/* -------------------------------------------------------- CholeskySampler */

/** Der Faktor, wie ihn das Widget jetzt rechnet: Rekursion aus Σ. */
function cholAusSigma(s1, s2, rho) {
  const S11 = s1 * s1, S12 = rho * s1 * s2, S22 = s2 * s2;
  const L11 = Math.sqrt(S11);
  const L21 = S12 / L11;
  const L22 = Math.sqrt(Math.max(0, S22 - L21 * L21));
  return { S11, S12, S22, L11, L21, L22 };
}

let maxRest = 0, ungleichNull = 0, gesamt = 0;
for (let a = 40; a <= 200; a += 5) {
  for (let b = 40; b <= 200; b += 5) {
    for (let r = -95; r <= 95; r += 5) {
      const [s1, s2, rho] = [a / 100, b / 100, r / 100];
      const L = cholAusSigma(s1, s2, rho);
      // geschlossene Form als unabhängige Gegenprobe
      nah(L.L11, s1, 1e-12, "L₁₁ = σ₁");
      nah(L.L21, rho * s2, 1e-12, "L₂₁ = ρσ₂");
      nah(L.L22, s2 * Math.sqrt(1 - rho * rho), 1e-9, "L₂₂ = σ₂√(1 − ρ²)");
      const rest = Math.max(
        Math.abs(L.L11 * L.L11 - L.S11),
        Math.abs(L.L11 * L.L21 - L.S12),
        Math.abs(L.L21 * L.L21 + L.L22 * L.L22 - L.S22),
      );
      maxRest = Math.max(maxRest, rest);
      gesamt++;
      if (rest > 0) ungleichNull++;
    }
  }
}
assert.ok(maxRest < 1e-14, `die Probe reißt aus: ${maxRest}`);
// Die Probe ist jetzt eine echte Probe: über den Reglerbereich ist sie oft ≠ 0.
assert.ok(ungleichNull > gesamt / 10, `die Probe ist in ${ungleichNull} von ${gesamt} Fällen exakt 0 — wieder x − x?`);

// Die neue Zahlfrage in S54.mdx: σ₁ = σ₂ = 1, ρ = 0,9 ⇒ L₂₂ ≈ 0,436.
nah(cholAusSigma(1, 1, 0.9).L22, 0.4358898944, 1e-9, "L₂₂ bei ρ = 0,9");
nah(Number(cholAusSigma(1, 1, 0.9).L22.toFixed(3)), 0.436, 1e-12, "gerundete Anzeige von L₂₂");
// Der Grenzfall des Verdikts: |ρ| > 0,9 macht L₂₂ klein, aber nie null.
assert.ok(cholAusSigma(1, 1, 0.95).L22 > 0, "L₂₂ wird bei ρ = 0,95 exakt null");
assert.ok(cholAusSigma(1, 1, 0.95).L22 < 0.32, "L₂₂ wird bei ρ = 0,95 nicht klein");

const sampler = lies("src/chapters/05-lgs/widgets/CholeskySampler.tsx");
assert.ok(/const L11 = Math\.sqrt\(S11\)/.test(sampler), "L wird wieder direkt aus σ und ρ gesetzt");
assert.ok(/fmtExp\(residual\)/.test(sampler), "die Probe rundet wieder auf drei Nachkommastellen");

console.log("REV29 05-lgs-Anwendungen: ok");
