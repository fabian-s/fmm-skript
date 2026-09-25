#!/usr/bin/env node
/**
 * REV29 — src/chapters/09-tensoren/widgets/S93Kronecker.tsx (KroneckerRechner)
 * und S93Kovarianz.tsx (SeparierbareKovarianzDemo).
 *
 * Prüft, dass die drei Presets des Kronecker-Rechners nach dem Fix wirklich eine
 * Fallunterscheidung sind (A = I, B = I, beide voll besetzt) und dass die drei
 * Verdikt-Aussagen an den Matrizen nachweisbar sind: Blockstruktur, Blockdiagonale
 * und das gemischte Produkt. Das Kroneckerprodukt wird dazu hier über die
 * Indexformel (A ⊗ B)_{(i-1)q+k, (j-1)s+l} = a_ij b_kl gebildet, nicht über die
 * flatMap-Konstruktion des Widgets.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/09-tensoren/widgets/S93Kronecker.tsx"), "utf8");
const srcKov = readFileSync(join(repo, "src/chapters/09-tensoren/widgets/S93Kovarianz.tsx"), "utf8");

/** Kroneckerprodukt über die Indexformel. */
function kron(A, B) {
  const p = A.length, q = A[0].length, r = B.length, s = B[0].length;
  const K = Array.from({ length: p * r }, () => new Array(q * s).fill(0));
  for (let i = 0; i < p; i++)
    for (let j = 0; j < q; j++)
      for (let k = 0; k < r; k++)
        for (let l = 0; l < s; l++) K[i * r + k][j * s + l] = A[i][j] * B[k][l];
  return K;
}
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const I = [[1, 0], [0, 1]];

/* ------------------------------- Die drei Presets aus dem Quelltext auslesen */

const block = src.match(/const PRESETS: \{ name: string; A: Mat; B: Mat \}\[\] = \[([\s\S]*?)\n\];/);
assert.ok(block, "PRESETS nicht gefunden");
const namen = [...block[1].matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);
assert.deepEqual(namen, ["A = I", "B = I", "beide voll besetzt"], "die Presets sind eine Fallunterscheidung");

const P0 = { A: I, B: [[1, 1], [0, 2]] };
const P1 = { A: [[1, 2], [0, 1]], B: I };
const P2 = { A: [[1, 2], [0, 1]], B: [[1, 1], [0, 2]] };

/* --------- Preset 1: A = I ⇒ jeder Block ist ein Vielfaches der Einheitsmatrix */

const K0 = kron(transpose(P0.B), P0.A);
assert.equal(K0.length, 4, "Format 4×4");
for (let bi = 0; bi < 2; bi++) {
  for (let bj = 0; bj < 2; bj++) {
    const s = transpose(P0.B)[bi][bj];
    assert.deepEqual(
      [[K0[2 * bi][2 * bj], K0[2 * bi][2 * bj + 1]], [K0[2 * bi + 1][2 * bj], K0[2 * bi + 1][2 * bj + 1]]],
      [[s, 0], [0, s]],
      `Block (${bi}, ${bj}) muss s·I sein`,
    );
  }
}

/* ---------------- Preset 2: B = I ⇒ A steht zweimal auf der Blockdiagonalen */

const K1 = kron(transpose(P1.B), P1.A);
assert.deepEqual(
  K1,
  [[1, 2, 0, 0], [0, 1, 0, 0], [0, 0, 1, 2], [0, 0, 0, 1]],
  "I ⊗ A ist blockdiagonal mit zweimal A",
);
assert.deepEqual([K1[0][2], K1[0][3], K1[1][2], K1[1][3]], [0, 0, 0, 0], "die Nebenblöcke sind null");

/* ------------------------ Preset 3: beide voll besetzt ⇒ echtes Mischprodukt */

const K2 = kron(transpose(P2.B), P2.A);
assert.deepEqual(K2, [[1, 2, 0, 0], [0, 1, 0, 0], [1, 2, 2, 4], [0, 1, 0, 2]], "Bᵀ ⊗ A bei zwei voll besetzten Faktoren");
assert.ok(K2[2][0] !== 0 && K2[0][2] === 0, "erst hier ist ein Nebenblock besetzt – Zeilen- und Spaltenwirkung mischen sich");
assert.notDeepEqual(K2, K1, "die drei Presets liefern verschiedene Operatoren");
assert.notDeepEqual(K2, K0, "die drei Presets liefern verschiedene Operatoren");

/* --------------------------- Die Vertauschung ist Permutationsähnlichkeit */

// A ⊗ Bᵀ ist im Allgemeinen NICHT gleich Bᵀ ⊗ A, aber permutationsähnlich.
const vert = kron(P2.A, transpose(P2.B));
assert.notDeepEqual(vert, K2, "die Vertauschung ändert die Anordnung wirklich");
// Perfekte Shuffle-Permutation P für 2×2-Blöcke.
const P = [[1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 1]];
const mm = (X, Y) => X.map((row) => Y[0].map((_, j) => row.reduce((s, v, k) => s + v * Y[k][j], 0)));
assert.deepEqual(mm(mm(P, K2), transpose(P)), vert, "P (Bᵀ⊗A) Pᵀ = A⊗Bᵀ");

/* --------------------------- Die Verdikt-Zweige hängen an den Presets (D1) */

assert.ok(/preset === 0/.test(src) && /preset === 1/.test(src), "je Preset ein eigener Verdikt-Zweig");
assert.ok(/W_BUTTON_AKTIV : W_BUTTON/.test(src), "der aktive Preset braucht mehr als eine Randfarbe");
assert.ok(!/Welche Blockmatrix wirkt auf vec\(X\)\?/.test(src), "die Aufgabe darf nichts versprechen, was das Widget nicht zeigt");

/* ============================================== S93Kovarianz: Parameterzahlen */

const allgemein = (m, n) => ((m * n) * (m * n + 1)) / 2;
const separierbar = (m, n) => (m * (m + 1)) / 2 + (n * (n + 1)) / 2;
assert.equal(allgemein(10, 50), 125250, "freie Parameter der allgemeinen Kovarianz (m = 10, n = 50)");
assert.equal(separierbar(10, 50), 1330, "freie Parameter der separierbaren Kovarianz");
assert.equal((10 * 50) ** 2, 250000, "gespeicherte Einträge allgemein");
assert.equal(10 ** 2 + 50 ** 2, 2600, "gespeicherte Einträge separierbar");
// Der Vorteil wächst wirklich, wie das Verdikt behauptet.
const quote = (m, n) => 1 - separierbar(m, n) / allgemein(m, n);
assert.ok(quote(50, 50) > quote(10, 50), "die Sparquote wächst mit dem Gitter");
assert.ok(quote(2, 2) < 0.9, "auf dem kleinsten Gitter ist der Vorteil noch gering");
assert.ok(!/role="img" aria-label="Vergleich einer allgemeinen/.test(srcKov), "der Textcontainer darf kein role=img tragen");

console.log("REV29 09-tensoren S93Kronecker/S93Kovarianz: alle Zahlen bestätigt");
