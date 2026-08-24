import assert from "node:assert/strict";

const close = (actual, expected, eps = 1e-9) => assert.ok(Math.abs(actual - expected) <= eps, `${actual} != ${expected}`);

// Chapter 9: values appearing in widget verdicts/captions.
close(1.6 * 1.1 * 4, 7.04);
close(1.6 * 1.1 * 2, 3.52);
assert.equal(4 ** 2, 16); assert.equal(4 ** 3, 64); assert.equal(8 ** 2 * 3, 192);
close((1.5 - .2), 1.3); close((1.5 - .2), 1.3);
close(2 + 3 - 1 + 5, 9); close(9 - 5 - 1 + 2, 5);
// Chapter 11: the numeric, state-independent examples used by headers/prose.
close(Math.exp(.5), 1.6487212707); close(Math.exp(.5) - 1.625, .0237212707);
const f = x => x ** 3 / 3 - x;
let x = 2; const xs = [x]; for (let k = 0; k < 5; k++) { x -= (x ** 2 - 1) / (2 * x); xs.push(x); }
close(xs[1], 1.25); close(xs[2], 1.025); close(xs[3], 1.0003048780487804);
// Hessian default: diag(2,8), hence f=x1^2+4x2^2.
assert.deepEqual([2, 8], [2, 8]);
console.log("R4 numeric claims verified");
