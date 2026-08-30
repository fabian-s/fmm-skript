#!/usr/bin/env node
/**
 * REV29 — src/chapters/04-fehler/widgets/S41Widgets.tsx
 * (FehlermassRechner und FehlerzerlegungExplorer).
 *
 * Prüft die Zahlen aus dem Widget-Header, aus den Verdikten und aus der
 * Konsolidierung in S41.mdx; an δ = 10 % ⇔ ‖Δ‖ = 0,5 hängt zusätzlich die
 * Zahlfrage S41.mdx:383.
 *
 * Unabhängiger Rechenweg: Die Reihe wird hier NICHT wie im Widget rekursiv
 * (term *= x/n) aufsummiert, sondern Glied für Glied als xⁿ/n! mit separat
 * berechneter Fakultät. Die Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/04-fehler/widgets/S41Widgets.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ------------------------------------------------- Beispiel 4.1.4 (Fehlermaße) */

const v = [3, 4];
const vt = [3.2, 4.3];
const delta_v = [vt[0] - v[0], vt[1] - v[1]];
const nd = Math.hypot(...delta_v);
const nv = Math.hypot(...v);
const nvt = Math.hypot(...vt);
const rel = nd / nv;

nah(delta_v[0], 0.2, 1e-12, "Δ₁");
nah(delta_v[1], 0.3, 1e-12, "Δ₂");
nah(nd, 0.36056, 5e-6, "‖Δ‖₂");
nah(nv, 5, 1e-12, "‖v‖₂");
nah(rel, 0.072111, 5e-7, "δ_v");
nah(100 * rel, 7.2111, 5e-5, "δ_v in Prozent");
nah(nvt, 5.36004, 5e-6, "‖ṽ‖₂");

// Lemma 4.1.3: ‖v‖(1−δ) ≤ ‖ṽ‖ ≤ ‖v‖(1+δ), Band [4,63944; 5,36056].
const unten = nv * (1 - rel);
const oben = nv * (1 + rel);
nah(unten, 4.63944, 5e-6, "untere Schranke");
nah(oben, 5.36056, 5e-6, "obere Schranke");
assert.ok(unten <= nvt && nvt <= oben, "‖ṽ‖ liegt nicht im Band von Lemma 4.1.3");
nah(oben - nvt, 0.00052, 5e-6, "Abstand zur oberen Schranke");
// Gegenprobe: die Dreiecksungleichung ist das Lemma, also muss ‖Δ‖ = ‖v‖·δ sein.
nah(nd, nv * rel, 1e-12, "‖Δ‖ = ‖v‖ · δ");

// Die Zahlfrage S41.mdx:383: δ = 10 % ⇔ ‖Δ‖ = 0,5, und δ = 1 % ⇔ ‖Δ‖ = 0,05.
nah(0.1 * nv, 0.5, 1e-12, "‖Δ‖ bei δ = 10 %");
nah(0.01 * nv, 0.05, 1e-12, "‖Δ‖ bei δ = 1 %");
// Widerlegbar: ein Punkt AUF dem gestrichelten Kreis hat genau diesen Abstand.
const aufKreis = [v[0] + 0.5 * Math.cos(1.1), v[1] + 0.5 * Math.sin(1.1)];
nah(Math.hypot(aufKreis[0] - v[0], aufKreis[1] - v[1]) / nv, 0.1, 1e-12, "δ auf dem Kreis");

/* ------------------------------------- Beispiel 4.1.6 (Fehlerzerlegung, e^π) */

const fakultaet = (n) => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
/** Abgebrochene Reihe, Glied für Glied als xⁿ/n! (nicht rekursiv wie im Widget). */
const reihe = (x, N) => { let s = 0; for (let n = 0; n <= N; n++) s += Math.pow(x, n) / fakultaet(n); return s; };

const zerlegung = (N, k) => {
  const xt = Number(Math.PI.toFixed(k));
  const fWahr = Math.exp(Math.PI);
  const fInput = Math.exp(xt);
  const fTilde = reihe(xt, N);
  return { algo: fTilde - fInput, folge: fInput - fWahr, gesamt: fTilde - fWahr };
};

const b416 = zerlegung(2, 0);
nah(b416.algo, -11.5855, 5e-5, "Algorithmusfehler (N = 2, k = 0)");
nah(b416.folge, -3.05516, 5e-6, "Folgefehler (N = 2, k = 0)");
nah(b416.gesamt, -14.6407, 5e-5, "Gesamtfehler (N = 2, k = 0)");
// Probe zu (4.1.1): die Zerlegung geht exakt auf.
nah(b416.algo + b416.folge - b416.gesamt, 0, 1e-9, "Probe zu (4.1.1)");
// … und das Verdikt behauptet „fast viermal so groß".
nah(Math.abs(b416.algo) / Math.abs(b416.folge), 3.7921, 5e-4, "Verhältnis bei N = 2");

// Dominanzwechsel bei k = 0 (Konsolidierung S41.mdx:334-338).
for (const N of [0, 1, 2, 3]) {
  const z = zerlegung(N, 0);
  assert.ok(
    Math.abs(z.algo) > 2 * Math.abs(z.folge),
    `N = ${N}: der Algorithmusfehler dominiert NICHT (Faktor ${Math.abs(z.algo) / Math.abs(z.folge)})`,
  );
}
for (const N of [4, 5]) {
  const q = Math.abs(zerlegung(N, 0).algo) / Math.abs(zerlegung(N, 0).folge);
  assert.ok(q <= 2 && q >= 0.5, `N = ${N}: die Anteile sind nicht vergleichbar (Faktor ${q})`);
}
for (const N of [6, 7, 8, 9, 10]) {
  const z = zerlegung(N, 0);
  assert.ok(
    Math.abs(z.folge) > 2 * Math.abs(z.algo),
    `N = ${N}: der Folgefehler dominiert NICHT`,
  );
}
nah(Math.abs(zerlegung(6, 0).algo) / Math.abs(zerlegung(6, 0).folge), 0.22, 5e-3, "Faktor bei N = 6");

// F8: Die Aufgabenzeile („beide Balken gleich lang") muss erreichbar sein.
const gleichauf = [];
for (let N = 0; N <= 10; N++) {
  for (let k = 0; k <= 6; k++) {
    const z = zerlegung(N, k);
    const q = Math.abs(z.algo) / Math.abs(z.folge);
    if (q > 0.9 && q < 1.1) gleichauf.push([N, k, q]);
  }
}
assert.ok(gleichauf.length > 0, `kein Reglerpaar erfüllt die Aufgabe „beide Balken gleich lang"`);
nah(zerlegung(6, 1).algo / zerlegung(6, 1).folge, 0.9137, 5e-4, "N = 6, k = 1");
nah(zerlegung(9, 2).algo / zerlegung(9, 2).folge, 0.9645, 5e-4, "N = 9, k = 2");

// Am Reglermaximum N = 10 mit k = 6 dominiert der Algorithmus — der Zweig, der
// seit REV29 nicht mehr „größeres N" empfiehlt.
assert.ok(
  Math.abs(zerlegung(10, 6).algo) > 2 * Math.abs(zerlegung(10, 6).folge),
  "N = 10, k = 6 ist kein Algorithmus-dominierter Zustand mehr",
);
assert.ok(/N === 10/.test(src), "der Sonderzweig für das Reglermaximum fehlt");

/* ------------------------------------------- Quelltext: keine Rückfälle */

assert.ok(
  /nv === 0 \?/.test(src),
  "der exakte Nullfall v = 0 wird nicht mehr eigens erkannt",
);
assert.ok(
  !/Auch \{ref\("lemma:fehlerschranken"\)\} sagt hier nichts mehr/.test(src),
  `die falsche Aussage „Lemma 4.1.3 sagt hier nichts mehr" ist zurück`,
);

console.log("REV29 04-fehler-S41Widgets: ok");
