import assert from "node:assert/strict";

// Cancellation: a=1.23456789, b=a(1-10^-k), so |a|/|a-b|=10^k.
for (let k = 1; k <= 8; k++) {
  const a = 1.23456789;
  assert.ok(Math.abs(Math.abs(a / (a - a * (1 - 10 ** -k))) - 10 ** k) / 10 ** k < 1e-8);
}
// Convergence: |a_n-1|=.75^n; N(eps)=floor(log(eps)/log(.75))+1.
for (const eps of [0.05, 0.3, 0.6]) {
  const N = Math.floor(Math.log(eps) / Math.log(.75)) + 1;
  assert.ok(.75 ** N < eps && .75 ** (N - 1) >= eps);
}
// Cauchy--Schwarz: |cos ω| reaches 1 exactly at 0 and π on [0,π].
assert.equal(Math.abs(Math.cos(0)), 1);
assert.equal(Math.abs(Math.cos(Math.PI)), 1);
console.log("FA number claims verified");
