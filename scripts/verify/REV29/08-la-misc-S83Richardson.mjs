#!/usr/bin/env node
/**
 * REV29 — src/chapters/08-la-misc/widgets/S83Richardson.tsx
 * (RichardsonStepper, RichardsonSchaetzfrage).
 *
 * Unabhängiger Rechenweg: λ_max und λ_min stehen im Widget als geschlossene
 * Ausdrücke (7 ± √5)/2. Hier werden sie stattdessen per Potenziteration auf A
 * bzw. auf 5·I − A bestimmt; erst dann werden γ* = 2/λ_max und ρ(γ) daraus
 * gebildet und mit den hartkodierten Sollwerten verglichen.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/08-la-misc/widgets/S83Richardson.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const A = [[4, 1], [1, 3]];
const RHS = [1, 2];
const XSTAR = [1 / 11, 7 / 11];
const mv = (x) => [A[0][0] * x[0] + A[0][1] * x[1], A[1][0] * x[0] + A[1][1] * x[1]];

// Die Lösung stimmt (Einsetzen, nicht Nachschlagen).
nah(mv(XSTAR)[0], RHS[0], 1e-15, "A x* = b, erste Zeile");
nah(mv(XSTAR)[1], RHS[1], 1e-15, "A x* = b, zweite Zeile");

/* --------------------------------- Eigenwerte per Potenziteration statt Formel */

function dominanterEigenwert(f, start) {
  let v = start;
  for (let i = 0; i < 500; i++) {
    const w = f(v);
    const n = Math.hypot(w[0], w[1]);
    v = [w[0] / n, w[1] / n];
  }
  const w = f(v);
  return v[0] * w[0] + v[1] * w[1];
}
const lmax = dominanterEigenwert(mv, [1, 0.3]);
const verschoben = (x) => [5 * x[0] - mv(x)[0], 5 * x[1] - mv(x)[1]];
const lmin = 5 - dominanterEigenwert(verschoben, [1, -0.3]);

nah(lmax, 4.61803398875, 1e-9, "λ_max");
nah(lmin, 2.38196601125, 1e-9, "λ_min");
nah(lmax, (7 + Math.sqrt(5)) / 2, 1e-12, "λ_max gegen den geschlossenen Ausdruck im Widget");
nah(lmin, (7 - Math.sqrt(5)) / 2, 1e-12, "λ_min gegen den geschlossenen Ausdruck im Widget");

const GAMMA_STERN = 2 / lmax;
nah(GAMMA_STERN, 0.4330847293, 1e-9, "Kippgrenze γ* = 2/λ_max (Lösung der Schätzfrage)");

const rho = (g) => Math.max(Math.abs(1 - g * lmax), Math.abs(1 - g * lmin));
nah(rho(0.25), 0.4045085, 1e-6, "ρ in der Voreinstellung γ = 0,25");
nah(rho(GAMMA_STERN), 1, 1e-12, "ρ(γ*) = 1 exakt");

/* ------------------ F8: der Grenzzweig ρ ≤ 1,001 auf dem 0,001er-Reglerraster */

const treffer = [];
for (let i = 50; i <= 550; i++) {
  const g = i / 1000;
  const r = rho(g);
  if (r >= 0.999 && r <= 1.001) treffer.push(g);
}
assert.ok(treffer.length > 0, "der Grenzzweig muss über den Regler erreichbar sein");
assert.deepEqual(treffer, [0.433], "genau γ = 0,433 landet im Grenzzweig");
// Mit dem alten 0,005er-Raster war er unerreichbar – das war der Befund.
const alteTreffer = [];
for (let i = 10; i <= 110; i++) {
  const r = rho(i / 200);
  if (r >= 0.999 && r <= 1.001) alteTreffer.push(i / 200);
}
assert.equal(alteTreffer.length, 0, "Gegenprobe: auf dem alten 0,005er-Raster war der Grenzzweig leer");
assert.ok(/step=\{0\.001\}/.test(src), "der γ-Regler muss in 0,001-Schritten laufen");
assert.ok(/Math\.round\(v \* 1000\) \/ 1000/.test(src), "die Rundung im onChange muss zum Raster passen");

/* -------------------------------------------- Fehlerfolge der Voreinstellung */

let x = [0, 0];
const errs = [];
for (let k = 0; k <= 6; k++) {
  errs.push(Math.hypot(x[0] - XSTAR[0], x[1] - XSTAR[1]));
  const r = [RHS[0] - mv(x)[0], RHS[1] - mv(x)[1]];
  x = [x[0] + 0.25 * r[0], x[1] + 0.25 * r[1]];
}
nah(errs[0], 0.642824, 1e-6, "Startfehler");
const quot = errs.slice(1).map((e, i) => e / errs[i]);
nah(quot[0], 0.3260, 1e-4, "Fehlerquotient im ersten Schritt");
nah(quot[1], 0.3882, 1e-4, "Fehlerquotient im zweiten Schritt");
nah(quot[5], 0.4045, 1e-4, "Fehlerquotient nähert sich ρ von unten");
for (const q of quot) assert.ok(q < rho(0.25) + 1e-9, "die Quotienten bleiben unter der Vorhersage ρ");

// Divergenz jenseits von γ*.
let y = [0, 0];
for (let k = 0; k < 12; k++) {
  const r = [RHS[0] - mv(y)[0], RHS[1] - mv(y)[1]];
  y = [y[0] + 0.55 * r[0], y[1] + 0.55 * r[1]];
}
assert.ok(Math.hypot(y[0] - XSTAR[0], y[1] - XSTAR[1]) > 10, "bei γ = 0,55 muss die Iteration davonlaufen");

/* ------------------------------------------- Schätzfrage löst jetzt wirklich auf */

assert.ok(!/verify-08-la-misc\/check-widgets\.mjs/.test(src), "der Header darf keinen toten Pfad zitieren");
assert.ok(/onAufloesen=\{\(\) => \{/.test(src), "die Schätzfrage muss beim Auflösen den Regler setzen");
assert.ok(/verdeckt=\{/.test(src), "die Schätzfrage braucht ein verdecktes Element");
assert.ok(/zeigeGrenze/.test(src), "die Grenze muss nach dem Auflösen im Widget markiert werden");
// G6: die Ebenen-Tafel muss bei 390 px mitskalieren statt über den Kasten zu ragen.
assert.ok(/viewBox=\{`0 0 \$\{PAD_L \+ SIZE \+ 6\} \$\{SIZE \+ PAD_B\}`\}/.test(src), "das Ebenen-SVG braucht eine viewBox");
assert.ok(/h-auto max-w-full rounded border border-slate-300/.test(src), "das Ebenen-SVG braucht max-w-full");

console.log("REV29 08-la-misc S83Richardson: alle Zahlen bestätigt");
