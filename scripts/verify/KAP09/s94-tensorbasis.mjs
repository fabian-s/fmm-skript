import assert from "node:assert/strict";

const f = (x, y) => 2 + 3 * x - y + 5 * x * y;
const corners = [f(0, 0), f(1, 0), f(0, 1), f(1, 1)];
assert.deepEqual(corners, [2, 5, 1, 9]);
assert.equal(corners[3] - corners[1] - corners[2] + corners[0], 5);
console.log("S94 Tensorbasis: Eckwerte und gemischter Koeffizient stimmen.");
