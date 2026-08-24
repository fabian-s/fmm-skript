import assert from "node:assert/strict";

const m = 10;
const n = 50;
const generalParams = (m * n * (m * n + 1)) / 2;
const separableParams = (m * (m + 1)) / 2 + (n * (n + 1)) / 2;
assert.equal(generalParams, 125250);
assert.equal(separableParams, 1330);
assert.equal((m * n) ** 2, 250000);
assert.equal(m ** 2 + n ** 2, 2600);
assert.ok(separableParams < generalParams);
console.log("S93 Kovarianz: Parameter- und Speicherzahlen stimmen.");
