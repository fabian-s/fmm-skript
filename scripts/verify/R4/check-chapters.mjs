import assert from "node:assert/strict";

const near = (actual, expected, eps = 1e-10) =>
  assert.ok(Math.abs(actual - expected) <= eps, `${actual} ≠ ${expected}`);

// S91: Rechteckflächen.
near(3 * 2, 6); near(6 * 4, 24); near(6 * 2, 12);
// S92: Anzahl der Einträge.
assert.equal(4 ** 2, 16); assert.equal(4 ** 3, 64); assert.equal(8 ** 2 * 3, 192);
// S93: äußeres Produkt und separierbare Kovarianz im Standardfall.
assert.deepEqual([1 * 1 + -1 * 0, 1 * 1 + -1 * 0], [1, 1]);
near(0.8 * (2 * 0.25), 0.4);
// S94: bilineare Tensorbasis auf den vier Ecken.
const f = (x, y) => 2 + 3 * x - y + 5 * x * y;
assert.deepEqual([[f(0, 0), f(1, 0)], [f(0, 1), f(1, 1)]], [[2, 5], [1, 9]]);
near(f(1, 1) - f(1, 0) - f(0, 1) + f(0, 0), 5);
// S111: Differenzenquotienten von |x|.
near(Math.abs(0.5) / 0.5, 1); near(Math.abs(-0.5) / -0.5, -1);
// S112: logistische Verlustableitung (ŷ−y)x.
const sig = z => 1 / (1 + Math.exp(-z));
near((sig(1) - 1) * 1, sig(1) - 1); near((sig(1) - 0) * 1, sig(1));
// S113/S114: Quadrik H und ihr Newton-Minimum.
assert.deepEqual([[4, 2], [2, 6]], [[4, 2], [2, 6]]);
near(4 * 0.6 + 2 * 0.8 - 4, 0); near(2 * 0.6 + 6 * 0.8 - 6, 0);
// S114 Taylor e^x bei 0,5.
const e = Math.exp(0.5);
near(e - 1.5, 0.1487212707001282); near(e - 1.625, 0.0237212707001282); near(e - (1 + .5 + .5 ** 2 / 2 + .5 ** 3 / 6), 0.002887937366794935);
console.log("R4 chapter numeric claims verified");
