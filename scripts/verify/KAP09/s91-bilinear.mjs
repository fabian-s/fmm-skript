import assert from "node:assert/strict";

const x = 3;
const y = 2;
assert.equal(x * y, 6);
assert.equal((2 * x) * y, 12);
assert.equal((2 * x) * (2 * y), 24);
assert.notEqual((2 * x) * (2 * y), 2 * x * y);
console.log("S91 Bilinearität: Skalierungszahlen stimmen.");
