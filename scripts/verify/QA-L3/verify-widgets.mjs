import assert from "node:assert/strict";

const close = (actual, expected, tolerance = 1e-10) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
const factorial = (n) => Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
const sinTaylor = (x, n) => {
  let term = x;
  let sum = x;
  for (let k = 1; 2 * k + 1 <= n; k += 1) {
    term *= (-x * x) / (2 * k * (2 * k + 1));
    sum += term;
  }
  return sum;
};

for (const theta of [0, 0.5, Math.PI / 2]) {
  const b = [Math.cos(theta), Math.sin(theta)];
  const P = [[b[0] ** 2, b[0] * b[1]], [b[0] * b[1], b[1] ** 2]];
  const x = [2, 1.4];
  const px = [P[0][0] * x[0] + P[0][1] * x[1], P[1][0] * x[0] + P[1][1] * x[1]];
  close(P[0][0] * px[0] + P[0][1] * px[1], px[0]);
  close(P[1][0] * px[0] + P[1][1] * px[1], px[1]);
  close((x[0] - px[0]) * b[0] + (x[1] - px[1]) * b[1], 0);
}
close(Math.hypot(1.5, 2), 2.5);
close(2 * Math.abs(Math.sin(0.05)), 0.0999583385, 1e-8);
assert.equal(1 * 4 - 2 * 2, 0);
assert.equal(1 * 5 - 2 * 2, 1);
close(Math.cos(Math.PI / 2), 0);
close(Math.sin(Math.PI / 2), 1);
close(2 * Math.cos(Math.PI / 3) ** 2 + Math.cos(Math.PI / 3) * Math.sin(Math.PI / 3) + Math.sin(Math.PI / 3) ** 2, 1.6830127019, 1e-8);
close((3 + Math.sqrt(5)) / 2, 2.6180339887, 1e-8);
close((3 - Math.sqrt(5)) / 2, 0.3819660113, 1e-8);
const alpha = 0.5, beta = 0.8, s1 = 1.8, s2 = 0.6;
const ca = Math.cos(alpha), sa = Math.sin(alpha), cb = Math.cos(beta), sb = Math.sin(beta);
const sv = [[s1 * ca, s1 * sa], [-s2 * sa, s2 * ca]];
const A = [[cb * sv[0][0] - sb * sv[1][0], cb * sv[0][1] - sb * sv[1][1]], [sb * sv[0][0] + cb * sv[1][0], sb * sv[0][1] + cb * sv[1][1]]];
close(A[0][0], 1.3069030841, 1e-8);
close(A[1][1], 0.9859044898, 1e-8);
close(A[0][0] * A[1][1] - A[0][1] * A[1][0], s1 * s2, 1e-10);
for (const x of [0, 4, 99, 110]) assert.ok(x / (1 + x) < 1);
close(99 / 100, 0.99);
close(Math.cos(0), 1);
close(Math.sin(0), 0);
for (const h of [1, 0.5, 0.1]) close(((1 + h) ** 2 - 1) / h, 2 + h);
for (const w of [1.6, 0.8, 0.4, 0.2, 0.1, 0.05]) {
  const area = (n = 2000) => {
    const dx = w / n;
    let sum = 0;
    for (let i = 0; i < n; i += 1) sum += w * dx;
    return sum;
  };
  close(area(), w ** 2, 1e-10);
}
for (const n of [1, 3, 5]) for (const t of [0.5, 1, 2]) {
  const remainder = Math.abs(Math.sin(t) - sinTaylor(t, n));
  const bound = Math.abs(t) ** (n + 1) / factorial(n + 1);
  assert.ok(remainder <= bound + 1e-12);
}
close(Math.abs(sinTaylor(Math.PI, 1)), Math.PI);
close(Math.abs(sinTaylor(Math.PI, 13)), 2.114256755e-5, 1e-9);
for (const rate of [0.1, 0.5, 0.9]) assert.ok(Math.ceil((-16 - Math.log10(0.1)) / Math.log10(rate)) > 0);
assert.equal(Math.ceil(Math.log2(16)), 4);
console.log("QA-L3 widget numerical assertions passed.");
