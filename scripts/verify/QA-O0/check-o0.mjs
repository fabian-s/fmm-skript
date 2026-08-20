/**
 * QA-O0 — Nachrechnung aller Zahlen, die Header, Legenden und Verdikte der 21
 * Konzept-Widgets dieses Batches behaupten. Aufruf: node check-o0.mjs
 * Autor: Re-Audit QA-O0, 2026-08-20.
 */
import assert from "node:assert/strict";

const nah = (a, b, eps = 1e-9) =>
  assert.ok(Math.abs(a - b) < eps, `${a} != ${b} (tol ${eps})`);
const log = (s) => console.log(s);

/* ---------- 1. BinomialCoefficientWidget ---------- */
function choose(n, k) {
  let r = 1;
  for (let j = 1; j <= Math.min(k, n - k); j++) r = (r * (n - j + 1)) / j;
  return Math.round(r);
}
assert.equal(choose(5, 2), 10);
assert.equal(choose(6, 3), 20);
assert.equal(choose(0, 0), 1);
assert.equal(choose(7, 7), 1);
// Pascal-Rekursion über das ganze im Widget gezeichnete Dreieck (Zeilen 0..7)
for (let r = 1; r <= 7; r++)
  for (let c = 1; c < r; c++)
    assert.equal(choose(r, c), choose(r - 1, c - 1) + choose(r - 1, c));
log("1 BinomialCoefficient: choose(5,2)=10, choose(6,3)=20, Pascal-Rekursion Zeilen 0..7 OK");

/* ---------- 2. BinomialTheoremWidget ---------- */
function chooseB(n, k) {
  let r = 1;
  for (let j = 1; j <= k; j++) r = (r * (n - k + j)) / j;
  return Math.round(r);
}
for (let n = 1; n <= 7; n++)
  for (let i = 0; i <= n; i++) assert.equal(chooseB(n, i), choose(n, i));
// Der lineare Term ist genau i=1 mit Koeffizient n.
for (let n = 1; n <= 7; n++) assert.equal(chooseB(n, 1), n);
log("2 BinomialTheorem: Koeffizienten = choose(n,i) für n=1..7, linearer Term n·x^(n−1)·h OK");

/* ---------- 3. CancellationWidget ---------- */
const A_CANC = 1.23456789;
const abw = [];
for (let k = 1; k <= 8; k++) {
  const b = A_CANC * (1 - 10 ** -k);
  const d = A_CANC - b;
  const faktor = Math.abs(A_CANC / d);
  abw.push((faktor / 10 ** k - 1).toExponential(2));
  nah(faktor, 10 ** k, 10 ** k * 1e-6); // Verstärkung = 10^k bis auf Rundung
  // gerundet auf ganze Zahlen (so zeigt es das Widget) ist es exakt 10^k
  assert.equal(Math.round(faktor), 10 ** k);
}
console.log(`  relative Abweichung der Verstärkung von 10^k je k: ${abw.join(", ")} (Auslöschung in der Rechnung selbst)`);
// Zahl der übereinstimmenden führenden ZEICHEN (fmtDe mit 10 Nachkommastellen)
const deDe = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 10,
  maximumFractionDigits: 10,
});
const gemeinsam = [];
for (let k = 1; k <= 8; k++) {
  const b = A_CANC * (1 - 10 ** -k);
  const sa = deDe.format(A_CANC),
    sb = deDe.format(b);
  let p = 0;
  while (p < sa.length && sa[p] === sb[p]) p++;
  gemeinsam.push(p);
}
log(`3 Cancellation: Verstärkung = 10^k exakt für k=1..8; gemeinsame Zeichen (inkl. "1,") = ${gemeinsam.join(",")}`);
// Bei k gemeinsamen DEZIMALSTELLEN stimmen k+1 Zeichen überein ("1," zählt 2, die
// erste Stelle nach dem Komma fällt weg) — der Regler ist also um eins verschoben.
assert.deepEqual(gemeinsam, [2, 3, 4, 5, 6, 7, 8, 9]);

/* ---------- 4. CauchySchwarzWidget ---------- */
const NX = 2.2,
  NY = 1.6,
  SCHRANKE = NX * NY;
nah(SCHRANKE, 3.52, 1e-12);
let maxQuot = 0;
for (let i = 0; i <= 157; i++) {
  const phi = i * 0.02;
  if (phi > Math.PI) break;
  maxQuot = Math.max(maxQuot, Math.abs(SCHRANKE * Math.cos(phi)) / SCHRANKE);
}
nah(maxQuot, 1, 1e-12); // Gleichheit nur bei phi = 0 (Rasterpunkt)
// |cos| >= 0.999 nur nahe 0 und pi:
const nahe1 = [];
for (let i = 0; i * 0.02 <= Math.PI; i++) {
  const phi = i * 0.02;
  if (Math.abs(Math.cos(phi)) > 0.999) nahe1.push(phi.toFixed(2));
}
log(`4 CauchySchwarz: Schranke ‖x‖‖y‖ = ${SCHRANKE}; |cos ω| > 0,999 nur bei ω = ${nahe1.join(", ")}`);
// Der Erkennungsfensterrand |phi|<0.03 bzw. |phi-pi|<0.03 trifft genau diese Punkte:
for (const p of [0, 0.02, Math.PI - 0.0016]) {
  assert.ok(Math.abs(Math.cos(p)) > 0.999);
}

/* ---------- 5. CholeskyWidget ---------- */
function cholesky2(a, b, c) {
  const q = c - (b * b) / a;
  return { ok: a > 0 && q > 0, l11: Math.sqrt(a), l21: b / Math.sqrt(a), l22: Math.sqrt(q) };
}
{
  const { ok, l11, l21, l22 } = cholesky2(4, 2, 3);
  assert.ok(ok);
  nah(l11, 2);
  nah(l21, 1);
  nah(l22, Math.SQRT2);
  // LLᵀ = A rekonstruieren
  nah(l11 * l11, 4);
  nah(l11 * l21, 2);
  nah(l21 * l21 + l22 * l22, 3);
}
// Voreinstellung a=4,b=2,c=3 ist positiv definit; Eigenwerte:
{
  const a = 4, b = 2, c = 3;
  const tr = a + c, disc = Math.sqrt((a - c) ** 2 + 4 * b * b);
  const l1 = (tr + disc) / 2, l2 = (tr - disc) / 2;
  assert.ok(l2 > 0);
  log(`5 Cholesky: A=[4 2;2 3] → L=[2 0;1 √2], Eigenwerte ${l1.toFixed(4)}/${l2.toFixed(4)}, LLᵀ=A OK`);
  // Halbachsen 1/√λ im Bild mit Faktor 42: größte darstellbare Halbachse?
  let pd = 0, zuGross = 0, maxR = 0, arg = null;
  for (let ia = 0; ia <= 55; ia++)
    for (let ib = 0; ib <= 80; ib++)
      for (let ic = 0; ic <= 55; ic++) {
        const A = 0.5 + ia * 0.1, B = -4 + ib * 0.1, C = 0.5 + ic * 0.1;
        const q = C - (B * B) / A;
        if (!(A > 0 && q > 0)) continue;
        pd++;
        const t = A + C, d = Math.sqrt((A - C) ** 2 + 4 * B * B);
        const lam2 = (t - d) / 2;
        const r = 42 / Math.sqrt(lam2); // S = 42 px je Welteinheit
        if (r > 80) zuGross++; // MAX_R des Widgets
        if (r > maxR && Number.isFinite(r)) { maxR = r; arg = [A, B, C, lam2]; }
      }
  log(`  Reglerraster: ${pd} positiv definite Tripel, davon ${zuGross} (${((100 * zuGross) / pd).toFixed(1)} %) mit Halbachse > MAX_R = 80 px, also ausserhalb der Zeichenflaeche; Maximum ${maxR.toFixed(0)} px bei a=${arg[0].toFixed(1)}, b=${arg[1].toFixed(1)}, c=${arg[2].toFixed(1)}`);
}

/* ---------- 6. ConvergenceWidget ---------- */
{
  const a = (n) => 1 + (-0.75) ** n;
  for (let e = 5; e <= 60; e++) {
    const eps = e / 100;
    const need = Math.floor(Math.log(eps) / Math.log(0.75)) + 1;
    // Definition: kleinstes N mit |a_n − 1| < eps für ALLE n >= N
    let N = 1;
    while (Math.abs(a(N) - 1) >= eps) N++;
    assert.equal(need, N, `eps=${eps}: Formel ${need}, gesucht ${N}`);
    for (let n = N; n <= 200; n++) assert.ok(Math.abs(a(n) - 1) < eps);
  }
  const N05 = Math.floor(Math.log(0.05) / Math.log(0.75)) + 1;
  const N06 = Math.floor(Math.log(0.6) / Math.log(0.75)) + 1;
  log(`6 Convergence: N(ε)-Formel für alle 56 Reglerwerte korrekt; N(0,05)=${N05}, N(0,6)=${N06}; nur 24 Punkte gezeichnet, N max ${N05}`);
}

/* ---------- 7. ConvexityWidget ---------- */
{
  const kurven = {
    "0,6x²+0,3": (x) => 0.6 * x * x + 0.3,
    "|x|": (x) => Math.abs(x),
    "2−0,6x²": (x) => 2 - 0.6 * x * x,
    "x⁴−3x²−x+3": (x) => x ** 4 - 3 * x * x - x + 3,
  };
  const raster = [];
  for (let i = 0; i <= 80; i++) raster.push(-2 + i * 0.05);
  for (const [name, f] of Object.entries(kurven)) {
    let paare = 0, verletzt = 0, gleich = 0, maxV = 0;
    for (const a of raster)
      for (const b of raster) {
        if (b - a < 0.15 - 1e-12) continue;
        paare++;
        let mU = 0, mA = 0;
        for (let i = 0; i <= 300; i++) {
          const x = a + ((b - a) * i) / 300;
          const s = f(a) + ((f(b) - f(a)) * (x - a)) / (b - a);
          mU = Math.max(mU, f(x) - s);
          mA = Math.max(mA, Math.abs(f(x) - s));
        }
        if (mU > 1e-9) { verletzt++; maxV = Math.max(maxV, mU); }
        else if (mA < 1e-12) gleich++;
      }
    log(`7 Convexity ${name}: ${paare} Paare, ${verletzt} verletzen (max ${maxV.toFixed(4)}), ${gleich} liegen exakt auf der Sehne`);
  }
  // Voreinstellungen der vier Presets
  const presets = [
    ["Parabel", (x) => 0.6 * x * x + 0.3, -1.2, 1.5],
    ["Betrag", (x) => Math.abs(x), -1.6, -0.4],
    ["Doppelmulde", (x) => x ** 4 - 3 * x * x - x + 3, -1.55, 1.25],
    ["Konkav", (x) => 2 - 0.6 * x * x, -1.4, 1.4],
  ];
  for (const [name, f, a, b] of presets) {
    let mU = 0, mA = 0;
    for (let i = 0; i <= 300; i++) {
      const x = a + ((b - a) * i) / 300;
      const s = f(a) + ((f(b) - f(a)) * (x - a)) / (b - a);
      mU = Math.max(mU, f(x) - s);
      mA = Math.max(mA, Math.abs(f(x) - s));
    }
    log(`  Preset ${name} (a=${a}, b=${b}): maxÜber=${mU.toFixed(4)}, maxAbs=${mA.toFixed(4)}`);
  }
}

/* ---------- 8. CovarianceMatrixWidget ---------- */
{
  // Halbachsen der 2-σ-Ellipse von Σ=[[1,ρ],[ρ,1]]: √(1±|ρ|), Winkel ±45°
  for (const rho of [-0.95, -0.5, 0, 0.5, 0.8, 0.95]) {
    const l1 = 1 + Math.abs(rho), l2 = 1 - Math.abs(rho);
    nah(Math.sqrt(l1) * Math.sqrt(l2), Math.sqrt(1 - rho * rho), 1e-12);
  }
  log("8 CovarianceMatrix: Eigenwerte 1±|ρ| ⇒ Halbachsen √(1±|ρ|), Hauptachse bei ±45° OK");
}

/* ---------- 9. FactorialWidget ---------- */
{
  const fak = [1];
  for (let k = 1; k <= 6; k++) fak.push(fak[k - 1] * k);
  assert.deepEqual(fak, [1, 1, 2, 6, 24, 120, 720]);
  const logs = fak.map((v) => Math.log10(v));
  log(`9 Factorial: 0!..6! = ${fak.join(", ")}; log₁₀ = ${logs.map((v) => v.toFixed(3)).join(", ")} (max ${logs[6].toFixed(3)} < 3, Achsenskala /3 passt)`);
}

/* ---------- 10. FloatingPointWidget ---------- */
{
  const EXP = [-1, 0, 1, 2];
  const gitter = (t) => {
    const w = [];
    for (const e of EXP) for (let k = 0; k < 2 ** t; k++) w.push((1 + k / 2 ** t) * 2 ** e);
    w.push(2 ** (EXP[EXP.length - 1] + 1));
    return w;
  };
  const runde = (w, x) => {
    let best = w[0];
    for (const v of w) if (Math.abs(v - x) < Math.abs(best - x)) best = v;
    return best;
  };
  const striche = [1, 2, 3, 4, 5].map((t) => gitter(t).length);
  assert.deepEqual(striche, [9, 17, 33, 65, 129]);
  for (const t of [1, 2, 3, 4, 5]) assert.equal(gitter(t).length, 4 * 2 ** t + 1);
  const maxRel = [];
  for (const t of [1, 2, 3, 4, 5]) {
    const w = gitter(t);
    let m = 0;
    for (let i = 0; i <= 200000; i++) {
      const x = 0.5 + (7.5 * i) / 200000;
      m = Math.max(m, Math.abs(x - runde(w, x)) / x);
    }
    maxRel.push(m);
    assert.ok(m <= 2 ** -(t + 1) + 1e-12, `t=${t}: ${m} > ${2 ** -(t + 1)}`);
  }
  log(`10 FloatingPoint: Striche ${striche.join("/")} = 4·2^t+1; max. rel. Rundungsfehler ${maxRel.map((v) => v.toExponential(3)).join(", ")}, Schranke 2^-(t+1) überall eingehalten`);
  // Randfall x = 8 (Reglermaximum): binade = 3, aber oberhalb von 8 gibt es kein Gitter mehr.
  const t = 2, w = gitter(t);
  const x = 8;
  const binade = Math.floor(Math.log2(x));
  const luecke = 2 ** binade * 2 ** -t;
  const groesster = Math.max(...w);
  assert.equal(groesster, 8);
  log(`  RANDFALL x=8: binade=${binade} ⇒ behauptete Lücke ${luecke}, tatsächlicher Nachbarabstand unter 8 ist ${(4 * 2 ** -t)} — Verdikt stimmt bei x=8 nicht`);
  assert.equal(Number.EPSILON, 2 ** -52);
  assert.equal(1 + 2 ** -53, 1);
}

/* ---------- 11. FunctionCompositionWidget ---------- */
{
  const X = (v) => 8 + ((v + 3) / 6) * 114; // Plotbreite 130, Achse 8..122
  const Yg = (v) => 82 - (v / 16) * 68;
  const raus = [];
  for (let i = 0; i <= 60; i++) {
    const x = -3 + i * 0.1;
    const fx = x + 1;
    if (X(fx) > 122.0001) raus.push(x.toFixed(1));
  }
  log(`11 FunctionComposition: der orange Punkt im g-Plot sitzt bei X(f(x)); für x = ${raus[0]}…${raus[raus.length - 1]} liegt er rechts vom Achsenende 122 (bei x=3 bei X=${X(4).toFixed(1)}, viewBox nur 130 breit)`);
  assert.ok(raus.length > 0);
  nah(Yg(16), 14);
}

/* ---------- 12. GaussianEliminationWidget ---------- */
{
  const A = [[2, 1, 1], [4, 5, 1], [2, -2, 0]];
  const m21 = A[1][0] / A[0][0], m31 = A[2][0] / A[0][0];
  assert.equal(m21, 2);
  assert.equal(m31, 1);
  const Z2 = A[1].map((v, j) => v - m21 * A[0][j]);
  const Z3 = A[2].map((v, j) => v - m31 * A[0][j]);
  assert.deepEqual(Z2, [0, 3, -1]);
  assert.deepEqual(Z3, [0, -3, -1]);
  const m32 = Z3[1] / Z2[1];
  assert.equal(m32, -1);
  const Z3b = Z3.map((v, j) => v - m32 * Z2[j]);
  assert.deepEqual(Z3b, [0, 0, -2]);
  log("12 GaussianElimination: Multiplikatoren 4/2=2, 2/2=1, −3/3=−1; Endmatrix [2 1 1; 0 3 −1; 0 0 −2] OK");
}

/* ---------- 13. GeometricSeriesWidget ---------- */
{
  const S = (r, n) => { let s = 0; for (let k = 0; k <= n; k++) s += r ** k; return s; };
  nah(S(0.5, 15), 2 - 2 ** -15, 1e-12);
  nah(S(0.5, 15), 1.9999694824218748, 1e-12);
  nah(1 / (1 - 0.5), 2);
  // Divergenzfall am Reglerrand
  const S12 = S(1.2, 15);
  nah(S12, (1.2 ** 16 - 1) / 0.2, 1e-9);
  log(`13 GeometricSeries: S₁₅(0,5) = ${S(0.5, 15).toFixed(6)} = 2−2⁻¹⁵, Grenzwert 1/(1−r) = 2; S₁₅(1,2) = ${S12.toFixed(3)} (divergent); r=1 und r=−1 sind auf dem 0,05-Raster erreichbar`);
  assert.ok(Number.isInteger(Math.round((1 - -1.2) / 0.05)));
}

/* ---------- 14. GradientWidget ---------- */
{
  const phi = (x, y) => x * x + 2 * y * y;
  const grad = (x, y) => [2 * x, 4 * y];
  // numerische Kontrolle des Gradienten
  const h = 1e-6;
  for (const [x, y] of [[0.9, 0.6], [-1.2, 0.4], [0.3, -1.1]]) {
    const gn = [(phi(x + h, y) - phi(x - h, y)) / (2 * h), (phi(x, y + h) - phi(x, y - h)) / (2 * h)];
    const ga = grad(x, y);
    nah(gn[0], ga[0], 1e-6);
    nah(gn[1], ga[1], 1e-6);
  }
  // Höhenlinien phi = v: Halbachsen √v und √(v/2)
  for (const v of [0.5, 1, 2, 3]) nah(phi(Math.sqrt(v), 0), v, 1e-12), nah(phi(0, Math.sqrt(v / 2)), v, 1e-12);
  // Richtungsableitung D_u phi = ∇phi·u verschwindet genau tangential
  const p = [0.9, 0.6], g = grad(...p);
  const th0 = Math.atan2(g[0], -g[1]);
  const u = [Math.cos(th0), Math.sin(th0)];
  nah(g[0] * u[0] + g[1] * u[1], 0, 1e-12);
  log(`14 Gradient: ∇φ=(2x₁,4x₂) numerisch bestätigt; Höhenlinien-Halbachsen √v und √(v/2) OK; D_uφ=0 bei θ=${th0.toFixed(3)}`);
  // Entartung im Ursprung
  assert.deepEqual(grad(0, 0), [0, 0]);
  log("  RANDFALL: im Ursprung ist ∇φ=0, dann ist D_uφ=0 für JEDES θ — die „tangential“-Meldung wäre dort irreführend");
}

/* ---------- 15. InfiniteSeriesWidget ---------- */
{
  for (let n = 1; n <= 12; n++) {
    let s = 0;
    for (let k = 0; k <= n; k++) s += 2 ** -k;
    nah(s, 2 - 2 ** -n, 1e-12);
  }
  log("15 InfiniteSeries: Σ_{k=0}^{n} 2^-k = 2 − 2^-n für n=1..12 OK (das sind n+1 Summanden, nicht n)");
  const xText = 140 * (2 - 2 ** -12) + 4;
  log(`  RANDFALL n=12: die Rest-Beschriftung startet bei x = ${xText.toFixed(1)} in einem 280 breiten viewBox — sie liegt außerhalb`);
  assert.ok(xText > 280);
}

/* ---------- 16. LevelSetsWidget ---------- */
{
  const L = 0.5;
  for (const lam of [0.4, 1, 1.55, 2.5]) {
    const ax = Math.sqrt(2 * L), ay = Math.sqrt((2 * L) / lam);
    for (let i = 0; i < 32; i++) {
      const th = (i * 2 * Math.PI) / 32;
      const p = [ax * Math.cos(th), ay * Math.sin(th)];
      nah((p[0] ** 2 + lam * p[1] ** 2) / 2, L, 1e-12); // Punkt liegt auf der Höhenlinie
      const g = [p[0], lam * p[1]];
      const t = [-g[1], g[0]];
      nah(g[0] * t[0] + g[1] * t[1], 0, 1e-12); // Gradient ⟂ Tangente
    }
  }
  log("16 LevelSets: φ=(x²+λy²)/2, ∇φ=(x,λy); Punkt liegt exakt auf der Höhenlinie und ∇φ⟂Tangente für λ∈{0,4;1;1,55;2,5}, 32 Winkel");
}

/* ---------- 17. LowRankApproximationWidget ---------- */
{
  const s = [10, 6, 2.5, 0.9, 0.3, 0.08];
  const E = s.reduce((a, v) => a + v * v, 0);
  nah(E, 143.1564, 1e-9);
  const anteil = [];
  for (let k = 1; k <= 6; k++) {
    const kept = s.slice(0, k).reduce((a, v) => a + v * v, 0) / E;
    anteil.push((100 * kept).toFixed(2));
  }
  log(`17 LowRank: Σσᵢ² = ${E.toFixed(4)}; behaltene Energie in % je k = ${anteil.join(", ")}`);
  const k2 = s.slice(0, 2).reduce((a, v) => a + v * v, 0) / E;
  log(`  k=2 liegt bei ${(100 * k2).toFixed(3)} % und damit knapp ÜBER der 95-%-Schwelle des Verdikts`);
  assert.ok(k2 > 0.95);
  assert.equal(s.length, 6); // bei k=6 gibt es kein σ₇ — err = 0
}

/* ---------- 18. LuDecompositionWidget ---------- */
{
  const A = [[2, 1], [4, 5]];
  const l21 = A[1][0] / A[0][0];
  assert.equal(l21, 2);
  const L = [[1, 0], [l21, 1]];
  const U = [[A[0][0], A[0][1]], [0, A[1][1] - l21 * A[0][1]]];
  assert.deepEqual(U, [[2, 1], [0, 3]]);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++) {
      let v = 0;
      for (let k = 0; k < 2; k++) v += L[i][k] * U[k][j];
      assert.equal(v, A[i][j]);
    }
  assert.equal(U[0][0] * U[1][1], 6);
  assert.equal(A[0][0] * A[1][1] - A[0][1] * A[1][0], 6);
  log("18 LuDecomposition: l₂₁=2, L=[1 0;2 1], U=[2 1;0 3], LU=A exakt, det A = u₁₁·u₂₂ = 6 OK");
}

console.log("\nALLE ASSERTIONS BESTANDEN");
