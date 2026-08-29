#!/usr/bin/env node
/**
 * REV29 — die übrigen angefassten Widgets aus Kapitel 10:
 *   src/chapters/10-differentialrechnung/widgets/S101Sekante.tsx,
 *   .../S103Jacobi.tsx, .../S103Backprop.tsx, .../S104Anstupsen.tsx.
 *
 * Bis zu diesem Lauf trugen alle vier nur eine „historische Notiz" ohne
 * Prüfskript; die Zahlen aus ihren Headern und Verdikten stehen jetzt hier.
 *
 * Unabhängige Rechenwege:
 *   - Reste und Ableitungen gegen zentrale Differenzenquotienten statt gegen
 *     die im Widget hinterlegten Formeln;
 *   - der Backprop-Gradient zusätzlich Eintrag für Eintrag durch Störung der
 *     Gewichte (das ist genau NICHT die Kette, die das Widget vorführt);
 *   - die Jacobi-Determinante über das gemessene Flächenverhältnis kleiner
 *     Fenster.
 */
import assert from "node:assert/strict";

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ═════════════════════════════════════════════════════════ S101Sekante */

const KURVEN = {
  quadrat: (x) => x * x,
  kubisch: (x) => (x * x * x) / 3 - x + 1,
  betrag: (x) => Math.abs(x),
};
const ABLEITUNG = { quadrat: (x) => 2 * x, kubisch: (x) => x * x - 1, betrag: (x) => Math.sign(x) };
/** Restterm der Linearisierung: r(h) = f(x+h) − f(x) − f′(x)h. */
const rest = (id, x, h) => KURVEN[id](x + h) - KURVEN[id](x) - ABLEITUNG[id](x) * h;

// f(x) = x²: r(h) = h² exakt, auf dem ganzen Reglerraster.
for (let xi = -24; xi <= 24; xi++)
  for (let hi = 1; hi <= 60; hi++) {
    const x = xi / 10;
    const h = hi / 100;
    nah(rest("quadrat", x, h), h * h, 1e-12, `r(h) bei x², x = ${x}, h = ${h}`);
  }
// Sekante 1,8 gegen Tangente 1,2 bei x = h = 0,6.
nah((KURVEN.quadrat(1.2) - KURVEN.quadrat(0.6)) / 0.6, 1.8, 1e-12, "Sekantensteigung bei x = h = 0,6");
nah(ABLEITUNG.quadrat(0.6), 1.2, 1e-12, "Tangentensteigung bei x = 0,6");
nah(rest("quadrat", 0.6, 0.6), 0.36, 1e-12, "r(0,6) bei x²");
nah(rest("quadrat", 0.6, 0.3), 0.09, 1e-12, "r(0,3) bei x²");
nah(rest("quadrat", 0.6, 0.15), 0.0225, 1e-12, "r(0,15) bei x²");
nah(rest("quadrat", 0.6, 0.6) / rest("quadrat", 0.6, 0.3), 4, 1e-12, "Faktor beim Halbieren, x²");

// f(x) = x³/3 − x + 1: r(h) = h²(x + h/3) exakt.
for (let xi = -24; xi <= 24; xi++)
  for (let hi = 1; hi <= 60; hi += 7) {
    const x = xi / 10;
    const h = hi / 100;
    nah(rest("kubisch", x, h), h * h * (x + h / 3), 1e-12, `r(h) kubisch, x = ${x}, h = ${h}`);
  }
nah(rest("kubisch", 0.6, 0.6), 0.288, 1e-12, "r(0,6) bei der kubischen Kurve");
nah(rest("kubisch", 0.6, 0.6) / rest("kubisch", 0.6, 0.3), 4.571429, 1e-6, "Faktor beim Halbieren, kubisch");
// r verschwindet genau bei x = −h/3, für h = 0,6 also bei x = −0,2. Der Regler
// rastet auf 0,05 und trifft diese Stelle exakt.
nah(rest("kubisch", -0.2, 0.6), 0, 1e-15, "r verschwindet bei x = −h/3");
assert.equal(Math.round(-0.2 * 20) / 20, -0.2, "x = −0,2 muss auf dem 0,05-Raster liegen");
// Genau dort greift der gefixte Zusatz nicht mehr: r(h/2) ist dann NICHT null,
// r(h) aber schon, und der Faktor wäre 0 gewesen.
nah(rest("kubisch", -0.2, 0.3), -0.009, 1e-12, "r(h/2) an der Ausnahmestelle");
assert.ok(
  Math.abs(rest("kubisch", -0.2, 0.6)) <= 1e-14 && Math.abs(rest("kubisch", -0.2, 0.3)) > 1e-14,
  "genau hier darf der Faktor-Zusatz nicht mehr erscheinen",
);

// f(x) = |x|: bei x = 0,6 ist r(h) = 0 für h ≤ 0,6, links des Knicks misst die
// Sekante etwas anderes als die Ableitung.
for (const h of [0.1, 0.3, 0.6]) nah(rest("betrag", 0.6, h), 0, 1e-15, `r(h) bei |x|, x = 0,6, h = ${h}`);
nah((KURVEN.betrag(-0.2 + 0.6) - KURVEN.betrag(-0.2)) / 0.6, 1 / 3, 1e-12, "Sekante über den Knick");
nah(rest("betrag", -0.2, 0.6), 0.8, 1e-12, "r(h) mit Knick im Fenster");
// Das Abtastraster der Tafel ist gerade: der Knick wird exakt getroffen.
assert.equal(240 % 2, 0, "N_SAMPLES muss gerade sein");

/* ═════════════════════════════════════════════════════════ S103Jacobi */

const ABB = {
  linear: { f: ([a, b]) => [1.5 * a + 0.5 * b, 0.3 * a + 1.2 * b], x0: [0.8, 0.6] },
  quadrat: { f: ([a, b]) => [a * a - b * b, 2 * a * b], x0: [1, 0.5] },
  wirbel: {
    f: ([a, b]) => {
      const w = 0.6 * Math.hypot(a, b);
      return [a * Math.cos(w) - b * Math.sin(w), a * Math.sin(w) + b * Math.cos(w)];
    },
    x0: [1.2, 0.6],
  },
};
/** Jacobimatrix rein numerisch. */
function jacobi(f, p, h = 1e-6) {
  const s = (i, d) => {
    const q = [...p];
    q[i] += d;
    return f(q);
  };
  const c0 = s(0, h);
  const c0m = s(0, -h);
  const c1 = s(1, h);
  const c1m = s(1, -h);
  return [
    [(c0[0] - c0m[0]) / (2 * h), (c1[0] - c1m[0]) / (2 * h)],
    [(c0[1] - c0m[1]) / (2 * h), (c1[1] - c1m[1]) / (2 * h)],
  ];
}
const det = (J) => J[0][0] * J[1][1] - J[0][1] * J[1][0];

nah(det(jacobi(ABB.linear.f, ABB.linear.x0)), 1.65, 1e-8, "det J der linearen Abbildung");
nah(det(jacobi(ABB.quadrat.f, ABB.quadrat.x0)), 5, 1e-6, "det J beim Quadrieren an (1; 0,5)");
// Der Wirbel ist flächentreu: det J = 1 an JEDER Stelle.
for (let i = -12; i <= 12; i += 3)
  for (let j = -12; j <= 12; j += 3) {
    const p = [i / 5, j / 5];
    if (Math.hypot(...p) < 0.2) continue;
    nah(det(jacobi(ABB.wirbel.f, p)), 1, 1e-6, `det J des Wirbels in (${p})`);
  }
// Flächenverhältnis kleiner Fenster als unabhängige Messung von |det J|.
function flaechenverhaeltnis(f, x0, h, n = 400) {
  // Bild des Fensterrandes als feiner Polygonzug, Fläche über die Schuhbandformel.
  const rand = [];
  for (let k = 0; k < n; k++) {
    const t = (4 * k) / n; // 0 … 4, einmal um das Quadrat herum
    const seite = Math.floor(t);
    const u = t - seite;
    const p =
      seite === 0
        ? [x0[0] - h + 2 * h * u, x0[1] - h]
        : seite === 1
          ? [x0[0] + h, x0[1] - h + 2 * h * u]
          : seite === 2
            ? [x0[0] + h - 2 * h * u, x0[1] + h]
            : [x0[0] - h, x0[1] + h - 2 * h * u];
    rand.push(f(p));
  }
  let s = 0;
  for (let k = 0; k < rand.length; k++) {
    const a = rand[k];
    const b = rand[(k + 1) % rand.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s / 2) / (4 * h * h);
}
nah(flaechenverhaeltnis(ABB.linear.f, ABB.linear.x0, 0.4), 1.65, 1e-9, "Flächenverhältnis linear, h = 0,4");
nah(flaechenverhaeltnis(ABB.linear.f, ABB.linear.x0, 0.05), 1.65, 1e-9, "Flächenverhältnis linear, h = 0,05");
nah(flaechenverhaeltnis(ABB.quadrat.f, ABB.quadrat.x0, 0.01), 5, 1e-3, "Flächenverhältnis Quadrieren, h = 0,01");
// Bei h = 0,3 steht dort noch 5,24, bei h = 0,15 nur noch 5,06 — der
// Flächenfaktor gilt erst im Grenzwert.
nah(flaechenverhaeltnis(ABB.quadrat.f, ABB.quadrat.x0, 0.3), 5.24, 5e-3, "Flächenverhältnis Quadrieren, h = 0,3");
nah(flaechenverhaeltnis(ABB.quadrat.f, ABB.quadrat.x0, 0.15), 5.06, 5e-3, "Flächenverhältnis Quadrieren, h = 0,15");
// Der Wirbel ist flächentreu für JEDES h.
for (const h of [0.1, 0.2, 0.4])
  nah(flaechenverhaeltnis(ABB.wirbel.f, ABB.wirbel.x0, h), 1, 2e-4, `Flächenverhältnis Wirbel, h = ${h}`);

// Restterm des Quadrierens: exakt ‖h‖², halbe Kantenlänge also Faktor 4.
function maxRest(f, x0, h) {
  const J = jacobi(f, x0);
  const f0 = f(x0);
  let m = 0;
  for (const [a, b] of [
    [-h, -h],
    [h, -h],
    [h, h],
    [-h, h],
  ]) {
    const echt = f([x0[0] + a, x0[1] + b]);
    const lin = [f0[0] + J[0][0] * a + J[0][1] * b, f0[1] + J[1][0] * a + J[1][1] * b];
    m = Math.max(m, Math.hypot(echt[0] - lin[0], echt[1] - lin[1]));
  }
  return m;
}
nah(maxRest(ABB.quadrat.f, ABB.quadrat.x0, 0.3), 0.18, 1e-4, "max‖r‖ beim Quadrieren, h = 0,3");
nah(maxRest(ABB.quadrat.f, ABB.quadrat.x0, 0.15), 0.045, 1e-4, "max‖r‖ beim Quadrieren, h = 0,15");
nah(
  maxRest(ABB.quadrat.f, ABB.quadrat.x0, 0.3) / maxRest(ABB.quadrat.f, ABB.quadrat.x0, 0.15),
  4,
  1e-3,
  "Faktor beim Halbieren (Lösung der Schätzfrage)",
);
// Die lineare Abbildung ist ihre eigene Linearisierung. Mit der NUMERISCHEN
// Jacobimatrix bleibt nur deren Differenzenfehler stehen …
for (const h of [0.05, 0.2, 0.4])
  assert.ok(
    maxRest(ABB.linear.f, ABB.linear.x0, h) < 1e-9,
    `Restterm linear bei h = ${h}: ${maxRest(ABB.linear.f, ABB.linear.x0, h)}`,
  );
// … und mit der abgelesenen Koeffizientenmatrix verschwindet er ganz.
{
  const A = [
    [1.5, 0.5],
    [0.3, 1.2],
  ];
  const x0 = ABB.linear.x0;
  const f0 = ABB.linear.f(x0);
  for (const h of [0.05, 0.2, 0.4])
    for (const [a, b] of [
      [-h, -h],
      [h, -h],
      [h, h],
      [-h, h],
    ]) {
      const echt = ABB.linear.f([x0[0] + a, x0[1] + b]);
      const lin = [f0[0] + A[0][0] * a + A[0][1] * b, f0[1] + A[1][0] * a + A[1][1] * b];
      assert.ok(
        Math.hypot(echt[0] - lin[0], echt[1] - lin[1]) < 1e-15,
        `Restterm der linearen Abbildung muss exakt null sein (h = ${h})`,
      );
    }
  nah(A[0][0] * A[1][1] - A[0][1] * A[1][0], 1.65, 1e-15, "det A der linearen Abbildung");
}

/* ═════════════════════════════════════════════════════════ S103Backprop */

const W1 = [
  [1, -1],
  [0.5, 1],
];
const W2 = [2, -1];
const X2 = 2;
const ZIEL = 1;
const relu = (t) => Math.max(0, t);

function netz(x1, w1 = W1, w2 = W2) {
  const x = [x1, X2];
  const a = [w1[0][0] * x[0] + w1[0][1] * x[1], w1[1][0] * x[0] + w1[1][1] * x[1]];
  const z = a.map(relu);
  const yh = w2[0] * z[0] + w2[1] * z[1];
  return { a, z, yh, L: 0.5 * (yh - ZIEL) ** 2 };
}

const n1 = netz(1);
nah(n1.a[0], -1, 1e-15, "a₁[1] bei x₁ = 1");
nah(n1.a[1], 2.5, 1e-15, "a₁[2] bei x₁ = 1");
nah(n1.z[0], 0, 0, "z₁[1] bei x₁ = 1");
nah(n1.z[1], 2.5, 1e-15, "z₁[2] bei x₁ = 1");
nah(n1.yh, -2.5, 1e-15, "ŷ bei x₁ = 1");
nah(n1.L, 6.125, 1e-15, "L bei x₁ = 1");

// Die Parametergradienten rein durch Störung der Gewichte — das umgeht die
// Rückwärtskette des Widgets vollständig.
const eps = 1e-6;
const gW2 = [0, 1].map((k) => {
  const p = [...W2];
  const m = [...W2];
  p[k] += eps;
  m[k] -= eps;
  return (netz(1, W1, p).L - netz(1, W1, m).L) / (2 * eps);
});
nah(gW2[0], 0, 1e-9, "∂L/∂W₂[1]");
nah(gW2[1], -8.75, 1e-8, "∂L/∂W₂[2]");
const gW1 = [0, 1].map((i) =>
  [0, 1].map((j) => {
    const p = W1.map((z) => [...z]);
    const m = W1.map((z) => [...z]);
    p[i][j] += eps;
    m[i][j] -= eps;
    return (netz(1, p).L - netz(1, m).L) / (2 * eps);
  }),
);
nah(gW1[0][0], 0, 1e-9, "∂L/∂W₁[1][1]");
nah(gW1[0][1], 0, 1e-9, "∂L/∂W₁[1][2]");
nah(gW1[1][0], 3.5, 1e-8, "∂L/∂W₁[2][1]");
nah(gW1[1][1], 7, 1e-8, "∂L/∂W₁[2][2]");
// Der Knick liegt bei x₁ = 2 (dort ist a₁[1] = x₁ − 2 = 0) und ist auf dem
// 0,05-Raster des Reglers exakt erreichbar.
nah(netz(2).a[0], 0, 1e-15, "a₁[1] bei x₁ = 2");
assert.equal(Math.round(2 * 20) / 20, 2, "x₁ = 2 muss auf dem Raster liegen");

/* ═════════════════════════════════════════════════════════ S104Anstupsen */

const A_VEK = [1, -2];
const B_VEK = [2, 1, 3];
const A_MAT = [
  [1, 0, -2],
  [3, 1, 0],
];
const START_X = [
  [1, 0, 2],
  [-1, 2, 1],
];
const FN = {
  axb: {
    f: (X) => A_VEK.reduce((s, ai, i) => s + ai * B_VEK.reduce((t, bj, j) => t + X[i][j] * bj, 0), 0),
    grad: () => A_VEK.map((ai) => B_VEK.map((bj) => ai * bj)),
  },
  frob: { f: (X) => X.flat().reduce((s, v) => s + v * v, 0), grad: (X) => X.map((z) => z.map((v) => 2 * v)) },
  spur: {
    f: (X) => A_MAT.flat().reduce((s, v, k) => s + v * X.flat()[k], 0),
    grad: () => A_MAT.map((z) => [...z]),
  },
};

nah(FN.axb.f(START_X), 2, 1e-15, "aᵀXb an der Startmatrix");
nah(FN.frob.f(START_X), 11, 1e-15, "‖X‖_F² an der Startmatrix");
nah(FN.spur.f(START_X), -4, 1e-15, "tr(AᵀX) an der Startmatrix");
assert.deepEqual(FN.axb.grad(START_X), [
  [2, 1, 3],
  [-4, -2, -6],
]);
assert.deepEqual(FN.frob.grad(START_X), [
  [2, 0, 4],
  [-2, 4, 2],
]);

// Gradientenmatrizen gegen zentrale Differenzen (eps = 1e−4, wie im Widget).
const H_EPS = 1e-4;
for (const [name, fn] of Object.entries(FN)) {
  const G = fn.grad(START_X);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 3; j++) {
      const p = START_X.map((z) => [...z]);
      const m = START_X.map((z) => [...z]);
      p[i][j] += H_EPS;
      m[i][j] -= H_EPS;
      nah((fn.f(p) - fn.f(m)) / (2 * H_EPS), G[i][j], 1e-9, `∂${name}/∂x_${i + 1}${j + 1}`);
    }
}

// Restterm eines Stupses am Eintrag (2,3): null bzw. exakt h².
for (const h of [0.4, 0.2, 0.05]) {
  const gestoert = START_X.map((z) => [...z]);
  gestoert[1][2] += h;
  for (const name of ["axb", "spur"]) {
    const r = FN[name].f(gestoert) - FN[name].f(START_X) - FN[name].grad(START_X)[1][2] * h;
    assert.ok(Math.abs(r) < 1e-14, `${name} muss bei h = ${h} exakt sein (r = ${r})`);
  }
  const rf = FN.frob.f(gestoert) - FN.frob.f(START_X) - FN.frob.grad(START_X)[1][2] * h;
  nah(rf, h * h, 1e-14, `Restterm von ‖X‖_F² bei h = ${h}`);
}
// Der neue Verdikt-Zweig gegen Auslöschung: die Eingabe ist auf [−20; 20]
// begrenzt, und dort bleibt der Differenzenquotient tragfähig.
{
  const gross = [
    [20, 20, 20],
    [-20, 20, 20],
  ];
  const G = FN.frob.grad(gross);
  const p = gross.map((z) => [...z]);
  const m = gross.map((z) => [...z]);
  p[1][2] += H_EPS;
  m[1][2] -= H_EPS;
  nah((FN.frob.f(p) - FN.frob.f(m)) / (2 * H_EPS), G[1][2], 1e-6, "Differenzenquotient am Rand des Eingabebereichs");
}

console.log("REV29 S101Sekante/S103Jacobi/S103Backprop/S104Anstupsen: Header- und Verdiktzahlen geprüft.");
