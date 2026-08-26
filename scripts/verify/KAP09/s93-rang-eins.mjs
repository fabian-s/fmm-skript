import assert from "node:assert/strict";

const v = [1, 1];
const w = [1, 0];
const outer = (a, b) => a.map((ai) => b.map((bj) => ai * bj));
const multiply = (A, x) => A.map((zeile) => zeile.reduce((summe, eintrag, j) => summe + eintrag * x[j], 0));
const A = outer(v, w);

assert.deepEqual(A, [[1, 0], [1, 0]]);
assert.deepEqual(multiply(A, [1.3, 0.3]), [1.3, 1.3]);
assert.deepEqual(multiply(A, [0, 1.2]), [0, 0]);
assert.equal(w[0] * 0 + w[1] * 1.2, 0);
assert.equal(A[0][0] * A[1][1] - A[0][1] * A[1][0], 0);
console.log("KAP09 S93: zweistufige Abbildung, Kernpreset und Bildrichtung geprüft.");
