// R5 numerical checks for the chapter-14/15 widget verdicts, 2026-08-20.
const near = (actual, expected, tolerance, label) => {
  if (Math.abs(actual - expected) > tolerance) throw new Error(`${label}: ${actual} != ${expected}`);
};

// §14.1: the common perturbation vanishes at all six interpolation knots.
for (let i = 0; i <= 5; i++) near(0.06 * Math.sin(5 * Math.PI * (i / 5)), 0, 1e-14, "S141 knot");
// §15.1: J(g_t) = ∫(g_t'')².  Die Simpson-Integration folgt bewusst der
// Widget-Implementierung, die rechte Seite ist die dort behauptete Formel.
const sZwei = (x) => (x <= 1 ? -3 * x : -3 * (2 - x));
const gZwei = (x, t) => (1 - t) * sZwei(x) - 2 * t;
const simpson = (f, a, b, n = 2000) => {
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  for (let i = 1; i < n; i += 1) sum += (i % 2 ? 4 : 2) * f(a + i * h);
  return (sum * h) / 3;
};
for (const t of [-1, -0.5, 0, 0.5, 1]) {
  const numerischesJ = simpson((x) => gZwei(x, t) ** 2, 0, 1) + simpson((x) => gZwei(x, t) ** 2, 1, 2);
  near(numerischesJ, 6 + 2 * t ** 2, 1e-9, "S151 energy");
}
near(5 / 384 * (2 * Math.PI) ** 4 * 0.25 ** 4, 0.079272, 1e-6, "S152 bound");
near(10 ** 10 * 8 / 1e9, 80, 1e-12, "S155 GB");
near(0.09 * 12 / 100, 0.0108, 1e-12, "S154 variance theory");
console.log("R5 chapter 13 numerical claims: OK");
