#!/usr/bin/env node
/**
 * REV29 — src/chapters/09-tensoren/widgets/S95Vektorisierung.tsx
 * (VektorisierungMatrixgleichung).
 *
 * Der Befund des Reviews war, dass das Widget nur einen erreichbaren
 * Verdikt-Zweig hatte: `stimmt` verglich zwei Rechenwege derselben Identität und
 * war deshalb immer wahr. Nach dem Fix bietet das Widget die falsche Reihenfolge
 * A ⊗_K Bᵀ als eigenen Knopf an. Dieses Skript weist beides nach:
 *   • die richtige Anordnung stimmt für alle geprüften Fälle (24 geseedete plus
 *     die drei Presets), und
 *   • die falsche Anordnung liefert für das Textbeispiel nachweislich einen
 *     ANDEREN Vektor – der fail-Zweig ist also erreichbar (F8).
 * Der Vergleich läuft über zwei strukturell verschiedene Wege: einmal vec(AXB)
 * aus dem Matrixprodukt, einmal (Bᵀ⊗A) vec(X) über die Kronecker-Indexformel.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/09-tensoren/widgets/S95Vektorisierung.tsx"), "utf8");

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const vec = (M) => M[0].flatMap((_, j) => M.map((row) => row[j]));
const column = (v) => v.map((e) => [e]);
function kron(A, B) {
  const p = A.length, q = A[0].length, r = B.length, s = B[0].length;
  const K = Array.from({ length: p * r }, () => new Array(q * s).fill(0));
  for (let i = 0; i < p; i++)
    for (let j = 0; j < q; j++)
      for (let k = 0; k < r; k++)
        for (let l = 0; l < s; l++) K[i * r + k][j * s + l] = A[i][j] * B[k][l];
  return K;
}
const rechts = (op, X) => vec(mul(op, column(vec(X))));
const gleich = (u, v) => u.every((e, i) => Math.abs(e - v[i]) < 1e-9);

/* ------------------------------------------------ Das Beispiel aus dem Text */

const A0 = [[1, 2], [0, 1]];
const X0 = [[1, 0], [2, 3]];
const B0 = [[1, 1], [0, 2]];
assert.deepEqual(vec(mul(mul(A0, X0), B0)), [5, 2, 17, 8], "vec(AXB) im Beispiel 9.5.4");
assert.deepEqual(rechts(kron(transpose(B0), A0), X0), [5, 2, 17, 8], "(Bᵀ⊗A) vec(X) im Beispiel");

// … und die falsche Reihenfolge liefert etwas anderes: der fail-Zweig ist erreichbar.
const falsch = rechts(kron(A0, transpose(B0)), X0);
assert.ok(!gleich(falsch, [5, 2, 17, 8]), `A ⊗ Bᵀ muss abweichen, liefert aber ${falsch}`);

/* -------------------------------------- Die drei Presets des Widgets im Test */

const presets = [
  { name: "Beispiel 9.5.4", A: A0, X: X0, B: B0 },
  { name: "B = I", A: A0, X: X0, B: [[1, 0], [0, 1]] },
  { name: "A = I", A: [[1, 0], [0, 1]], X: X0, B: B0 },
];
let abweichend = 0;
for (const { name, A, X, B } of presets) {
  const links = vec(mul(mul(A, X), B));
  assert.ok(gleich(links, rechts(kron(transpose(B), A), X)), `richtige Reihenfolge bei „${name}“`);
  if (!gleich(links, rechts(kron(A, transpose(B)), X))) abweichend++;
}
assert.ok(abweichend >= 1, "mindestens ein Preset muss die falsche Reihenfolge entlarven");

/* --------------------------------- 24 geseedete Fälle für die richtige Seite */

let seed = 20260829;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return Math.round((seed / 2147483648) * 8) - 4;
};
let falscheAbweichungen = 0;
for (let t = 0; t < 24; t++) {
  const A = [[rnd(), rnd()], [rnd(), rnd()]];
  const X = [[rnd(), rnd()], [rnd(), rnd()]];
  const B = [[rnd(), rnd()], [rnd(), rnd()]];
  const links = vec(mul(mul(A, X), B));
  assert.ok(gleich(links, rechts(kron(transpose(B), A), X)), `Fall ${t}: vec(AXB) = (Bᵀ⊗A) vec(X)`);
  if (!gleich(links, rechts(kron(A, transpose(B)), X))) falscheAbweichungen++;
}
assert.ok(
  falscheAbweichungen > 12,
  `die falsche Reihenfolge muss in der Mehrzahl der Fälle abweichen, tut es aber nur ${falscheAbweichungen}-mal`,
);

/* -------------------------------------------- Fixes im Quelltext verankert */

assert.ok(/const \[reihenfolge, setReihenfolge\]/.test(src), "die Reihenfolge muss wählbar sein");
assert.ok(/kron\(A, transpose\(B\)\)/.test(src), "der Knopf für die falsche Reihenfolge fehlt");
assert.ok(/BEISPIEL\.map/.test(src), "kuratierte Presets fehlen");
assert.ok(/C = A X B/.test(src), "C = AXB muss angezeigt werden");
assert.ok(!/Eine Matrixgleichung wird durch Vektorisierung/.test(src), "das rein dekorative SVG ist gestrichen");

console.log("REV29 09-tensoren S95Vektorisierung: alle Zahlen bestätigt");
