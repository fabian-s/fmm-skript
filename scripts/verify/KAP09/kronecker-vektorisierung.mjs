import assert from "node:assert/strict";

const mulberry32 = (seed) => () => {
  let value = (seed += 0x6d2b79f5);
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
};

const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const kron = (A, B) => A.flatMap((aRow) => B.map((bRow) => aRow.flatMap((a) => bRow.map((b) => a * b))));
const vec = (M) => M[0].flatMap((_, j) => M.map((row) => row[j]));
const column = (v) => v.map((entry) => [entry]);
const assertMatrix = (actual, expected, label) => assert.deepEqual(actual, expected, label);

const A = [[1, 2], [0, 1]];
const X = [[1, 0], [2, 3]];
const B = [[1, 1], [0, 2]];
assertMatrix(vec(multiply(multiply(A, X), B)), [5, 2, 17, 8], "Beispiel 9.5.4: vec(AXB)");
assertMatrix(
  vec(multiply(kron(transpose(B), A), column(vec(X)))),
  [5, 2, 17, 8],
  "Beispiel 9.5.4: (B^T ⊗ A) vec(X)",
);
assert.equal(kron(transpose(B), A).flat().length, 16, "2×2-Faktoren erzeugen einen 4×4-Operator");

const random = mulberry32(20260820);
for (let trial = 0; trial < 24; trial += 1) {
  const matrix = () => Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => Math.floor(random() * 9) - 4));
  const leftA = matrix();
  const leftX = matrix();
  const rightB = matrix();
  assertMatrix(
    vec(multiply(multiply(leftA, leftX), rightB)),
    vec(multiply(kron(transpose(rightB), leftA), column(vec(leftX)))),
    `Vektorisierungsidentität, geseedeter Fall ${trial + 1}`,
  );
}

const P = [[1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 1]];
const Kleft = kron([[1, -1], [2, 3]], [[2, 1], [1, 1]]);
const Kright = kron([[2, 1], [1, 1]], [[1, -1], [2, 3]]);
assertMatrix(multiply(multiply(P, Kleft), transpose(P)), Kright, "A⊗B und B⊗A sind permutationsähnlich");

console.log("KAP09 Kronecker/Vektorisierung: Beispiel, 24 Seeds und Permutationsähnlichkeit geprüft.");
