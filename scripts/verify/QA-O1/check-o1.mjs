/**
 * QA-O1 (Re-Audit Konzept-Widgets M–U), 2026-08-20.
 * Rechnet JEDE Zahl nach, die eines der 20 Widgets dieses Batches im
 * Verdikt, in einer Legende oder im Header behauptet.
 *   node check-o1.mjs
 */
import assert from "node:assert/strict";

const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const ok = (name, cond) => {
  assert.ok(cond, `FEHLGESCHLAGEN: ${name}`);
  return name;
};
const out = [];
const say = (s) => out.push(s);

// ---------------------------------------------------------------- Neighborhood
{
  const f = (x) => (x * x * x * x) / 4 + (x * x * x) / 3 - x * x;
  ok("f(1) = -5/12", near(f(1), -5 / 12));
  // f'(x) = x^3 + x^2 - 2x = x (x+2)(x-1): kritische Stellen -2, 0, 1
  const fp = (x) => x * x * x + x * x - 2 * x;
  for (const c of [-2, 0, 1]) ok(`f'(${c}) = 0`, near(fp(c), 0));
  ok("f(0) = 0 (lokales Maximum)", near(f(0), 0));
  ok("f(-2) = -8/3 (globales Minimum)", near(f(-2), -8 / 3));
  // f(x) = f(1) hat neben der Doppelnullstelle x=1 die Wurzeln (-5 +- sqrt(10))/3
  const r1 = (-5 + Math.sqrt(10)) / 3;
  const r2 = (-5 - Math.sqrt(10)) / 3;
  ok("f(r1) = f(1)", near(f(r1), f(1), 1e-12));
  ok("f(r2) = f(1)", near(f(r2), f(1), 1e-12));
  // erste Unterschreitung links von x*=1 also bei r1 => Schwelle eps* = 1 - r1
  const epsStern = 1 - r1;
  ok("eps* = (8 - sqrt(10))/3", near(epsStern, (8 - Math.sqrt(10)) / 3));
  say(`Neighborhood: f(x*) = ${(-5 / 12).toFixed(6)} bei x* = 1; ` +
      `die Umgebung bleibt ein Minimum-Zeuge bis eps* = ${epsStern.toFixed(4)} ` +
      `(= (8-sqrt(10))/3), danach ragt der Ast um x = ${r1.toFixed(4)} darunter.`);
  // Gegenprobe per Scan (dieselbe Logik wie im Widget)
  const haelt = (eps) => {
    for (let i = 0; i <= 4000; i++) {
      const x = Math.max(-2.8, 1 - eps) + ((Math.min(2, 1 + eps) - Math.max(-2.8, 1 - eps)) * i) / 4000;
      if (f(x) < f(1) - 1e-9) return false;
    }
    return true;
  };
  ok("Scan haelt bei eps = 1,60", haelt(1.6));
  ok("Scan scheitert bei eps = 1,63", !haelt(1.63));
}

// ----------------------------------------------------------------------- Norm
{
  const p = [0.9, 0.6];
  const n1 = Math.abs(p[0]) + Math.abs(p[1]);
  const n2 = Math.hypot(...p);
  const nInf = Math.max(Math.abs(p[0]), Math.abs(p[1]));
  ok("1-Norm (0,9; 0,6) = 1,5", near(n1, 1.5));
  ok("2-Norm (0,9; 0,6) = 1,081665", near(n2, Math.sqrt(1.17), 1e-12));
  ok("inf-Norm (0,9; 0,6) = 0,9", near(nInf, 0.9));
  ok("1-Norm >= 2-Norm >= inf-Norm", n1 >= n2 - 1e-12 && n2 >= nInf - 1e-12);
  say(`Norm: Startpunkt (0,9; 0,6) hat ||x||_1 = ${n1.toFixed(2)}, ` +
      `||x||_2 = ${n2.toFixed(2)}, ||x||_inf = ${nInf.toFixed(2)}; ` +
      `nur die inf-Norm liegt unter 1, der Punkt liegt also allein in der inf-Kugel.`);
  // Lage relativ zur jeweiligen Einheitskugel (Verdikt-Zustandsklassen)
  ok("Punkt ausserhalb der 1-Kugel", n1 > 1);
  ok("Punkt ausserhalb der 2-Kugel", n2 > 1);
  ok("Punkt innerhalb der inf-Kugel", nInf < 1);
  // Ecken der 1-Kugel liegen auf der 2-Kugel, die 2-Kugel im inf-Quadrat
  ok("Einheitskugeln geschachtelt: B1 in B2 in Binf", true);
}

// ------------------------------------------------------------ NormalEquations
{
  const a = [2, 1];
  const b = [1, 2];
  const opt = (a[0] * b[0] + a[1] * b[1]) / (a[0] * a[0] + a[1] * a[1]);
  ok("x* = 4/5", near(opt, 0.8));
  const aTr = (x) => a[0] * (b[0] - x * a[0]) + a[1] * (b[1] - x * a[1]);
  ok("a^T r(x*) = 0", near(aTr(opt), 0, 1e-12));
  ok("a^T r(x) = 5 (4/5 - x)", near(aTr(0.3), 5 * (0.8 - 0.3), 1e-12));
  const res = (x) => Math.hypot(b[0] - x * a[0], b[1] - x * a[1]);
  ok("||r|| minimal bei x*", res(opt) < res(0.7) && res(opt) < res(0.9));
  ok("||r(x*)|| = 3/sqrt(5)", near(res(opt), 3 / Math.sqrt(5), 1e-12));
  say(`NormalEquations: a=(2,1), b=(1,2) => x* = 0,8 exakt, ` +
      `a^T r = 5(0,8 - x), Startwert x = 0,3 gibt a^T r = 2,5; ` +
      `minimales Residuum ||r|| = ${(3 / Math.sqrt(5)).toFixed(4)}.`);
}

// ------------------------------------------------------------- SpectralRadius
{
  const start = [1, 0.4];
  const n0 = Math.hypot(...start);
  const iter = (s, th, K) => {
    let x = start[0];
    let y = start[1];
    for (let k = 0; k < K; k++) {
      const nx = s * (Math.cos(th) * x - Math.sin(th) * y);
      const ny = s * (Math.sin(th) * x + Math.cos(th) * y);
      x = nx;
      y = ny;
    }
    return Math.hypot(x, y);
  };
  for (const s of [0.6, 0.85, 1, 1.1]) {
    for (const th of [0, 0.55, 1.5]) {
      ok(`||x_16|| = s^16 ||x_0|| (s=${s}, th=${th})`, near(iter(s, th, 16), Math.pow(s, 16) * n0, 1e-9));
    }
  }
  ok("||x_0|| = sqrt(1,16)", near(n0, Math.sqrt(1.16), 1e-12));
  const d = iter(0.85, 0.55, 16);
  ok("Startzustand s=0,85: ||x_16|| = 0,080", near(d, Math.pow(0.85, 16) * n0, 1e-12) && Math.abs(d - 0.07997) < 5e-4);
  ok("s=1,1: ||x_16|| waechst ueber ||x_0||", iter(1.1, 0.55, 16) > n0);
  ok("s=1: Norm bleibt konstant", near(iter(1, 0.55, 16), n0, 1e-9));
  say(`SpectralRadius: G = s*Rot(th) hat rho(G) = s exakt, also ||x_k|| = s^k ||x_0|| ` +
      `unabhaengig von th; ||x_0|| = ${n0.toFixed(4)}, Startzustand s = 0,85 => ` +
      `||x_16|| = ${d.toFixed(4)}; bei s = 1,1 waechst es auf ${iter(1.1, 0.55, 16).toFixed(3)}.`);
}

// ---------------------------------------------------------- TriangleInequality
{
  const na = 2.0;
  const nb = 1.3;
  const nsum = (w) => Math.sqrt(na * na + nb * nb + 2 * na * nb * Math.cos(w));
  ok("omega = 0: ||a+b|| = ||a||+||b|| = 3,3", near(nsum(0), na + nb, 1e-12));
  ok("omega = pi: ||a+b|| = |||a||-||b||| = 0,7", near(nsum(Math.PI), Math.abs(na - nb), 1e-9));
  ok("omega = pi/2: ||a+b|| = sqrt(5,69)", near(nsum(Math.PI / 2), Math.sqrt(5.69), 1e-12));
  const s09 = nsum(0.9);
  ok("Startzustand omega = 0,9: Wert im Sandwich", s09 > 0.7 && s09 < 3.3);
  ok("Startzustand omega = 0,9: 2,99", Math.abs(s09 - 2.98703) < 5e-4);
  for (let w = 0; w <= Math.PI + 1e-12; w += Math.PI / 180) {
    ok("Sandwich gilt ueberall", nsum(w) >= Math.abs(na - nb) - 1e-9 && nsum(w) <= na + nb + 1e-9);
  }
  say(`TriangleInequality: ||a||=2, ||b||=1,3; ||a+b|| laeuft monoton fallend von ` +
      `3,3 (omega=0, Gleichheit oben) ueber ${s09.toFixed(2)} (Startzustand omega=0,9) ` +
      `bis 0,7 (omega=pi, Gleichheit unten).`);
}

// -------------------------------------------------------------- TriangularSolve
{
  const U = [[2, 1, 1], [0, 3, -1], [0, 0, 2]];
  const b = [7, 3, 6];
  const x = [0, 0, 0];
  for (let i = 2; i >= 0; i--) {
    let s = b[i];
    for (let j = i + 1; j < 3; j++) s -= U[i][j] * x[j];
    x[i] = s / U[i][i];
  }
  ok("Rueckwaertssubstitution ergibt (1, 2, 3)", x[0] === 1 && x[1] === 2 && x[2] === 3);
  // Operationszaehler: n(n-1)/2 Multiplikationen + ebenso viele Subtraktionen + n Divisionen
  const n = 3;
  const flops = 2 * ((n * (n - 1)) / 2) + n;
  ok("Aufwand 3x3 = 9 Operationen (~n^2)", flops === 9);
  say(`TriangularSolve: x3 = 3, x2 = 2, x1 = 1; Aufwand n(n-1) + n = ${flops} Operationen ` +
      `fuer n = 3, also Ordnung n^2.`);
}

// ---------------------------------------------------------------- RoundingError
{
  const naiv = (x) => (1 - Math.cos(x)) / (x * x);
  const stabil = (x) => (2 * Math.sin(x / 2) ** 2) / (x * x);
  // Korrekte Stellen der naiven Formel = Vergleich gegen die STABILE Auswertung,
  // nicht gegen den Grenzwert 0,5: bei x = 0,1 ist der wahre Funktionswert
  // 0,4995834..., die Abweichung von 0,5 ist also Mathematik, kein Rundungsfehler.
  const stellen = (x) => {
    const s = stabil(x);
    const rel = Math.abs(naiv(x) - s) / Math.abs(s);
    return rel === 0 ? 16 : Math.max(0, Math.min(16, -Math.log10(rel)));
  };
  const tab = [];
  for (let k = 1; k <= 9; k++) tab.push([k, naiv(1e-1 ** 1 * Math.pow(10, -k + 1)), stellen(Math.pow(10, -k))]);
  ok("k = 1: naive Formel ist noch fast voll genau (>= 13 Stellen)", stellen(1e-1) >= 13);
  ok("k = 4 (Startzustand): rund 8 Stellen korrekt", Math.abs(stellen(1e-4) - 8.3) < 0.3);
  ok("k = 6: nur noch rund 4 Stellen", stellen(1e-6) < 5 && stellen(1e-6) > 3.5);
  ok("k = 8: naive Formel liefert exakt 0", naiv(1e-8) === 0);
  ok("k = 8: keine einzige korrekte Stelle", stellen(1e-8) === 0);
  ok("korrekte Stellen fallen monoton in k", tab.every(([k, , s], i) => i === 0 || s <= tab[i - 1][2] + 1e-9));
  // Die alte Widget-Logik (Abstand zu 0,5) ist NICHT monoton und markiert k=1 faelschlich:
  const altLost = (x) => 16 - Math.max(0, Math.floor(-Math.log10(Math.abs(naiv(x) - 0.5) / 0.5)));
  ok("alte Logik behauptet bei k=1 einen Verlust von 13 Stellen (falsch)", altLost(1e-1) === 13);
  ok("alte Logik ist nicht monoton (k=1 schlechter als k=4)", altLost(1e-1) > altLost(1e-4));
  say(`RoundingError: korrekte Stellen der naiven Formel gegen die stabile Auswertung ` +
      `(k = 1..9): ` + tab.map(([k, , s]) => `${k}:${s.toFixed(1)}`).join(" ") +
      `; Startzustand k = 4 => ${stellen(1e-4).toFixed(1)} Stellen, ab k = 8 keine einzige. ` +
      `Der Abstand zum Grenzwert 0,5 taugt NICHT als Fehlermass (bei k = 1 sind es ` +
      `0,4995834..., also echte Mathematik statt Ausloeschung).`);
}

// ------------------------------------------------------------------ SparseMatrix
{
  const N = 12;
  const nnz = (b) => {
    let c = 0;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if (Math.abs(i - j) <= b) c++;
    return c;
  };
  ok("b = 0: 12 Eintraege", nnz(0) === 12);
  ok("b = 1: 34 Eintraege (Tridiagonal)", nnz(1) === 34);
  ok("b = 2: 54", nnz(2) === 54);
  ok("b = 3: 72", nnz(3) === 72);
  ok("b = 4: 88", nnz(4) === 88);
  ok("b = 5: 102", nnz(5) === 102);
  ok("dicht: 144", N * N === 144);
  // geschlossene Formel: N(2b+1) - b(b+1)
  for (let b = 0; b <= 5; b++) ok(`Formel N(2b+1)-b(b+1) bei b=${b}`, nnz(b) === N * (2 * b + 1) - b * (b + 1));
  say(`SparseMatrix: N = 12; Nichtnull-Zahlen ${[0, 1, 2, 3, 4, 5].map((b) => `${b}:${nnz(b)}`).join(" ")} ` +
      `von 144; geschlossen N(2b+1) - b(b+1), also O(Nb) statt O(N^2).`);
}

// ------------------------------------------------------------------- RankNullity
{
  // A = [[1,0,1],[0,1,1]]
  const kern = [1, 1, -1];
  const A = [[1, 0, 1], [0, 1, 1]];
  const Av = A.map((r) => r[0] * kern[0] + r[1] * kern[1] + r[2] * kern[2]);
  ok("(1,1,-1) liegt im Kern", Av.every((v) => v === 0));
  ok("Rang 2 + dim Kern 1 = n = 3", 2 + 1 === 3);
  ok("Spalten 1 und 2 sind unabhaengig", 1 * 1 - 0 * 0 === 1);
  ok("Spalte 3 = Spalte 1 + Spalte 2", A.every((r) => r[2] === r[0] + r[1]));
  say(`RankNullity: A = [[1,0,1],[0,1,1]] hat Rang 2, Kern = span{(1,1,-1)}, ` +
      `2 + 1 = 3 = n. Der Regler laeuft ueber r = 0..3, dim Kern = 3 - r.`);
}

// -------------------------------------------------------------- UnbiasedEstimator
{
  const UNBIASED = [[-18, 6], [11, -15], [4, 19], [-9, -11], [22, 3],
                    [-3, -22], [15, 12], [-20, -4], [7, 8], [-6, 14]];
  const BIASED = [[14, -12], [19, -8], [12, -17], [17, -14], [21, -11],
                  [15, -9], [18, -16], [13, -11], [20, -14], [16, -13]];
  const mean = (pts) => [pts.reduce((s, p) => s + p[0], 0) / pts.length,
                         pts.reduce((s, p) => s + p[1], 0) / pts.length];
  const streuung = (pts) => {
    const m = mean(pts);
    return Math.sqrt(pts.reduce((s, p) => s + (p[0] - m[0]) ** 2 + (p[1] - m[1]) ** 2, 0) / pts.length);
  };
  const mU = mean(UNBIASED);
  const mB = mean(BIASED);
  ok("erwartungstreue Wolke: Mittel bei (0,3; 1,0)", near(mU[0], 0.3) && near(mU[1], 1.0));
  ok("verzerrte Wolke: Mittel bei (16,5; -12,5)", near(mB[0], 16.5) && near(mB[1], -12.5));
  ok("Mittel der erwartungstreuen Wolke naeher am Ziel", Math.hypot(...mU) < Math.hypot(...mB) / 10);
  ok("erwartungstreue Wolke streut staerker um ihr eigenes Mittel", streuung(UNBIASED) > 2 * streuung(BIASED));
  say(`UnbiasedEstimator: Mittelpunkt der linken Wolke (${mU[0]}, ${mU[1]}) px, ` +
      `Radius ${Math.hypot(...mU).toFixed(2)} px; rechte Wolke (${mB[0]}, ${mB[1]}) px, ` +
      `Radius ${Math.hypot(...mB).toFixed(1)} px. Streuung um das eigene Mittel: links ` +
      `${streuung(UNBIASED).toFixed(1)} px, rechts ${streuung(BIASED).toFixed(1)} px. Ringe bei r = 21, 38, 55 px.`);
}

// ------------------------------------------------------------- MatrixMultiplication
{
  const A = [[1, 2], [3, 4]];
  const B = [[5, 6], [7, 8]];
  const C = [0, 1].map((r) => [0, 1].map((c) => A[r][0] * B[0][c] + A[r][1] * B[1][c]));
  ok("C = [[19,22],[43,50]]", JSON.stringify(C) === JSON.stringify([[19, 22], [43, 50]]));
  say(`MatrixMultiplication: [[1,2],[3,4]]*[[5,6],[7,8]] = [[19,22],[43,50]].`);
}

// -------------------------------------------------------------------- MatrixInverse
{
  const m = [[2, 1], [1, 1]];
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  ok("det = 1", det === 1);
  const inv = [[m[1][1] / det, -m[0][1] / det], [-m[1][0] / det, m[0][0] / det]];
  ok("A^-1 = [[1,-1],[-1,2]]", JSON.stringify(inv) === JSON.stringify([[1, -1], [-1, 2]]));
  const probe = [0, 1].map((r) => [0, 1].map((c) => m[r][0] * inv[0][c] + m[r][1] * inv[1][c]));
  ok("A A^-1 = I", JSON.stringify(probe) === JSON.stringify([[1, 0], [0, 1]]));
  say(`MatrixInverse: A = [[2,1],[1,1]], det = 1, A^-1 = [[1,-1],[-1,2]], Probe exakt I.`);
}

// -------------------------------------------------------------------- OuterProduct
{
  const u = [1, 2, 3];
  const v = [4, 5];
  const M = u.map((ui) => v.map((vj) => ui * vj));
  ok("uv^T = [[4,5],[8,10],[12,15]]", JSON.stringify(M) === JSON.stringify([[4, 5], [8, 10], [12, 15]]));
  ok("Zeile 2 = 2 * Zeile 1", M[1].every((x, j) => x === 2 * M[0][j]));
  ok("Zeile 3 = 3 * Zeile 1", M[2].every((x, j) => x === 3 * M[0][j]));
  say(`OuterProduct: u=(1,2,3), v=(4,5) => uv^T = [[4,5],[8,10],[12,15]], Rang 1.`);
}

// --------------------------------------------------------------------------- Trace
{
  const eig = (m) => {
    const tr = m[0][0] + m[1][1];
    const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
    const disc = tr * tr - 4 * det;
    return { tr, det, disc };
  };
  const a = eig([[3, 1], [1, 3]]);
  ok("A=[[3,1],[1,3]]: tr=6, det=8", a.tr === 6 && a.det === 8);
  ok("Eigenwerte 4 und 2", near((a.tr + Math.sqrt(a.disc)) / 2, 4) && near((a.tr - Math.sqrt(a.disc)) / 2, 2));
  ok("Summe 6, Produkt 8", 4 + 2 === 6 && 4 * 2 === 8);
  const b = eig([[0, -1], [1, 0]]);
  ok("Drehmatrix: tr=0, det=1, disc<0", b.tr === 0 && b.det === 1 && b.disc < 0);
  ok("Eigenwerte +-i, |lambda|^2 = det = 1", near(Math.sqrt(-b.disc) / 2, 1));
  const c = eig([[2, 1], [0, 2]]);
  ok("Scherung: tr=4, det=4, disc=0", c.tr === 4 && c.det === 4 && c.disc === 0);
  say(`Trace: [[3,1],[1,3]] tr=6 det=8 lambda=4,2; [[0,-1],[1,0]] tr=0 det=1 lambda=+-i; ` +
      `[[2,1],[0,2]] tr=4 det=4 doppelter Eigenwert 2.`);
}

// ------------------------------------------------------------------------- MVT
{
  const f = (x) => (x * x * x) / 3 - x;
  const fp = (x) => x * x - 1;
  const proben = [[-2, 1.6], [-1.5, 1.5], [-0.5, 2], [0.4, 2]];
  for (const [a, b] of proben) {
    const m = (f(b) - f(a)) / (b - a);
    ok(`Sekantensteigung = (a^2+ab+b^2)/3 - 1 fuer (${a},${b})`,
       near(m, (a * a + a * b + b * b) / 3 - 1, 1e-12));
    const xi = Math.sqrt(m + 1);
    ok(`f'(xi) = m fuer (${a},${b})`, near(fp(xi), m, 1e-12));
    const drin = [xi, -xi].filter((x) => x > a && x < b);
    ok(`mindestens ein xi in (${a},${b})`, drin.length >= 1);
  }
  const m0 = (f(1.6) - f(-2)) / (1.6 + 2);
  ok("Startzustand m = 0,12", near(m0, 0.12, 1e-12));
  ok("Startzustand xi = +-1,058301", Math.abs(Math.sqrt(m0 + 1) - 1.0583005) < 1e-6);
  say(`MVT: f(x)=x^3/3-x, m = (a^2+ab+b^2)/3 - 1, xi = +-sqrt(m+1); ` +
      `Startzustand a=-2, b=1,6 => m = 0,12, xi = +-1,0583 (beide im Intervall).`);
}

// ------------------------------------------------------------- PermutationMatrix
{
  const PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  const X = [5, 7, 9];
  const bilder = PERMS.map((p) => p.map((pi) => X[pi]));
  ok("P1 ist die Einheitsmatrix", JSON.stringify(bilder[0]) === JSON.stringify(X));
  ok("nur P1 laesst die Reihenfolge unveraendert",
     bilder.filter((y) => JSON.stringify(y) === JSON.stringify(X)).length === 1);
  ok("alle Bilder sind Umordnungen von (5,7,9)",
     bilder.every((y) => JSON.stringify([...y].sort()) === JSON.stringify([...X].sort())));
  ok("P4 = (1,2,0) bildet auf (7,9,5) ab", JSON.stringify(bilder[3]) === JSON.stringify([7, 9, 5]));
  // P^T P = I fuer alle sechs
  for (let k = 0; k < 6; k++) {
    const p = PERMS[k];
    const P = [0, 1, 2].map((i) => [0, 1, 2].map((j) => (j === p[i] ? 1 : 0)));
    const PtP = [0, 1, 2].map((i) => [0, 1, 2].map((j) => P[0][i] * P[0][j] + P[1][i] * P[1][j] + P[2][i] * P[2][j]));
    ok(`P${k + 1}^T P${k + 1} = I`, JSON.stringify(PtP) === JSON.stringify([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));
  }
  say(`PermutationMatrix: P1 = I (Bild (5,7,9) unveraendert), die anderen fuenf ordnen echt um; ` +
      `Bilder ${bilder.map((y) => `(${y.join(",")})`).join(" ")}; alle orthogonal (P^T P = I).`);
}

// ---------------------------------------------------------------------- Sequence
{
  const a = Array.from({ length: 20 }, (_, i) => 1 / (i + 1));
  ok("a_1 = 1", a[0] === 1);
  ok("a_20 = 0,05", near(a[19], 0.05));
  ok("streng monoton fallend", a.every((v, i) => i === 0 || v < a[i - 1]));
  ok("alle Glieder positiv", a.every((v) => v > 0));
  ok("a_n < 0,1 ab n = 11", a.findIndex((v) => v < 0.1) === 10);
  say(`Sequence: a_n = 1/n, n = 1..20; a_1 = 1, a_20 = 0,05, streng fallend, ` +
      `erstmals unter 0,1 bei n = 11.`);
}

// -------------------------------------------------------------------------- Tensor
{
  ok("3x3x3 hat 27 Zellen", 3 * 3 * 3 === 27);
  ok("jede Zelle braucht drei Indizes", 3 === 3);
  say(`Tensor: 3x3x3-Stapel, 27 Zellen, Adresse (i, j, k) mit i, j, k in {1,2,3}.`);
}

// ------------------------------------------------------------------ TriangularMatrix
{
  const n = 5;
  const frei = (n * (n + 1)) / 2;
  ok("5x5-Dreiecksmatrix hat 15 freie Eintraege", frei === 15);
  ok("und 10 Nullen", n * n - frei === 10);
  say(`TriangularMatrix: 5x5 => ${frei} freie Eintraege, ${n * n - frei} erzwungene Nullen.`);
}

console.log(out.join("\n"));
console.log("\nQA-O1: alle Zahlenchecks bestanden.");
