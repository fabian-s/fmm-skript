#!/usr/bin/env node
/**
 * REV29 — src/chapters/03-matrix-spur-norm/widgets/S32NormBallWidget.tsx.
 *
 * Neu ist die Volumenzeile unter der Raumtafel; sie trägt die Schätzfrage nach
 * dem Verhältnis Würfel/Oktaeder. Geprüft wird die geschlossene Form
 * V_p = 8·Γ(1+1/p)³/Γ(1+3/p) gegen eine unabhängige Gitterintegration über
 * {x : ‖x‖_p ≤ 1} — zwei völlig verschiedene Rechenwege.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(
  join(repo, "src/chapters/03-matrix-spur-norm/widgets/S32NormBallWidget.tsx"),
  "utf8",
);

/* ------------------------------------------ geschlossene Form (wie im Widget) */

function lnGamma(z) {
  const g = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  let x = g[0];
  for (let i = 1; i < 9; i++) x += g[i] / (z - 1 + i);
  const t = z - 1 + 7.5;
  return 0.5 * Math.log(2 * Math.PI) + (z - 0.5) * Math.log(t) - t + Math.log(x);
}
const volumen = (p) =>
  !Number.isFinite(p) ? 8 : 8 * Math.exp(3 * lnGamma(1 + 1 / p) - lnGamma(1 + 3 / p));

// Die Gammafunktion selbst gegen bekannte Werte (widerlegbar).
assert.ok(Math.abs(Math.exp(lnGamma(1)) - 1) < 1e-12);
assert.ok(Math.abs(Math.exp(lnGamma(4)) - 6) < 1e-10);
assert.ok(Math.abs(Math.exp(lnGamma(0.5)) - Math.sqrt(Math.PI)) < 1e-12);

/* ------------------------------------- unabhängig: Gitterintegration im R³ */

function volumenGitter(p, n = 240) {
  const h = 2 / n;
  let zellen = 0;
  for (let i = 0; i < n; i++) {
    const a = -1 + (i + 0.5) * h;
    for (let j = 0; j < n; j++) {
      const b = -1 + (j + 0.5) * h;
      for (let k = 0; k < n; k++) {
        const c = -1 + (k + 0.5) * h;
        const norm = !Number.isFinite(p)
          ? Math.max(Math.abs(a), Math.abs(b), Math.abs(c))
          : (Math.abs(a) ** p + Math.abs(b) ** p + Math.abs(c) ** p) ** (1 / p);
        if (norm <= 1) zellen += 1;
      }
    }
  }
  return zellen * h ** 3;
}

for (const [p, erwartet] of [[1, 4 / 3], [2, (4 * Math.PI) / 3], [Infinity, 8]]) {
  assert.ok(Math.abs(volumen(p) - erwartet) < 1e-9, `V_${p} = ${volumen(p)}`);
  const gitter = volumenGitter(p, 200);
  assert.ok(Math.abs(gitter - erwartet) < 0.02, `Gitter V_${p} = ${gitter}`);
}
// Zwei nicht-kanonische p, damit die Formel selbst und nicht nur drei Konstanten geprüft ist.
for (const p of [1.5, 3, 4]) {
  const gitter = volumenGitter(p, 200);
  assert.ok(Math.abs(volumen(p) - gitter) < 0.02, `p = ${p}: ${volumen(p)} vs. ${gitter}`);
}

// Die Antwort der Schätzfrage: Würfel / Oktaeder = 6 = 3!.
const verhaeltnis = volumen(Infinity) / volumen(1);
assert.ok(Math.abs(verhaeltnis - 6) < 1e-9, `Verhältnis ${verhaeltnis}`);
assert.ok(Math.abs(verhaeltnis - 2) > 1, "Option 2-mal waere nicht widerlegt");
assert.ok(Math.abs(verhaeltnis - 20) > 1, "Option 20-mal waere nicht widerlegt");
// Die angezeigten Rundungen (zwei Nachkommastellen).
assert.equal(volumen(1).toFixed(2), "1.33");
assert.equal(volumen(2).toFixed(2), "4.19");
assert.equal(volumen(Infinity).toFixed(2), "8.00");

/* ---------------------------------------------- p-Normen des Startzustands */

const pNorm2d = (x, y, p) =>
  !Number.isFinite(p)
    ? Math.max(Math.abs(x), Math.abs(y))
    : (Math.abs(x) ** p + Math.abs(y) ** p) ** (1 / p);

for (const [x, y, werte] of [
  [-1.2, 0.9, [2.1, 1.5, 1.2]],
  [-1.6, 1.2, [2.8, 2.0, 1.6]],
]) {
  const got = [pNorm2d(x, y, 1), pNorm2d(x, y, 2), pNorm2d(x, y, Infinity)];
  got.forEach((v, i) => assert.ok(Math.abs(v - werte[i]) < 1e-9, `‖(${x},${y})‖ = ${v}`));
}
// p = 0,5 verletzt die Dreiecksungleichung.
assert.equal(pNorm2d(1, 1, 0.5), 4);
assert.ok(pNorm2d(1, 1, 0.5) > pNorm2d(1, 0, 0.5) + pNorm2d(0, 1, 0.5));

/* --------------------------------- Steilheitsabbruch gilt jetzt für jedes p */

assert.ok(
  !/pEff > 1 \? \(Math\.max/.test(src),
  "der Steilheitsabbruch ist wieder auf p > 1 beschränkt",
);
// Für p = 0,5 muss das Kriterium überhaupt greifen (sonst zerfällt die Fläche).
const steil = (a, b, p) => {
  const r = 1 - Math.abs(a) ** p - Math.abs(b) ** p;
  if (!(r > 0)) return null;
  const z = r ** (1 / p);
  return (Math.max(Math.abs(a), Math.abs(b)) / z) ** (p - 1);
};
assert.ok(steil(0.02, 0.02, 0.5) > 3, "die Spitze über der z-Achse wird nicht abgeschnitten");
assert.ok(steil(0.4, 0.1, 0.5) < 3, "die Flanke wird fälschlich abgeschnitten");
assert.ok(steil(0.98, 0.0, 4) > 3, "der Äquator wird für p > 1 nicht mehr abgeschnitten");

console.log("REV29 03-matrix-spur-norm-S32NormBall: ok");
