const close = (actual, expected, tolerance = 1e-12) => {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${actual} is not within ${tolerance} of ${expected}`);
  }
};

// A = [[2, 1], [1, 2]] has the two unit eigen-directions (1,1)/√2 and
// (1,−1)/√2 with eigenvalues 3 and 1.
const A = [[2, 1], [1, 2]];
const mul = ([x, y]) => [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y];
for (const [v, lambda] of [[[Math.SQRT1_2, Math.SQRT1_2], 3], [[Math.SQRT1_2, -Math.SQRT1_2], 1]]) {
  const av = mul(v);
  close(av[0], lambda * v[0]);
  close(av[1], lambda * v[1]);
  close(v[0] * av[1] - v[1] * av[0], 0);
}

// (1,3) = (4/3)(2,1) + (5/3)(−1,1), the audited target task.
close((4 / 3) * 2 + (5 / 3) * -1, 1);
close((4 / 3) + (5 / 3), 3);

console.log("AUDIT-A verified: Eigenrichtungen λ=3,1; Ziel (1,3) ↔ (c₁,c₂)=(4/3,5/3).");
