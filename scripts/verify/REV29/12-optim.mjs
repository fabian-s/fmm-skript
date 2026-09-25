#!/usr/bin/env node
/**
 * REV29 — src/chapters/12-optim/widgets/*.tsx (alle vierzehn Dateien).
 *
 * Bis zum Review 2026-08-29 trug jede der vierzehn Dateien einen Header mit
 * dem Vermerk „historische Notiz … derzeit nicht reproduzierbar nachgewiesen".
 * Dieses Skript löst den Vermerk ab: Es rechnet die Headerzahlen, die
 * Voreinstellungen, die Verdikt-Schwellen und die in der MDX-Prosa genannten
 * Größen nach.
 *
 * UNABHÄNGIGE RECHENWEGE — die Widget-Formeln werden nirgends mit sich selbst
 * verglichen:
 *  - Bisektionsschritte: nicht ⌈log₂((b−a)/ε)⌉ gegen sich selbst, sondern die
 *    tatsächlich durchgeführte Halbierung gegen die Formel.
 *  - arctan-Schwelle: nicht als Konstante, sondern als Nullstelle von
 *    arctan(ξ)(1+ξ²) − 2ξ per Bisektion; zusätzlich über das beobachtete
 *    Umschlagen zwischen Konvergenz und Divergenz eingeklemmt.
 *  - Spektralnorm ρ = ‖I − γA‖₂: nicht über eine Formel je System, sondern als
 *    Maximum von ‖(I−γA)v‖ über ein feines Richtungsraster, gegengeprüft mit
 *    der Wurzel des größten Eigenwerts von MᵀM.
 *  - Newton-Schrittzahlen: über den ERSTEN Index mit Fehler < 1e−10 (genau die
 *    Definition, die das Verdikt seit REV29 benutzt).
 *  - Nelder-Mead: eigene Implementierung der vier Züge nach der Standardregel,
 *    unabhängig von der des Widgets, mit demselben Startsimplex aus dem TSX.
 *  - Canyon/Momentum: Schrittzahlen durch tatsächliches Iterieren, Rate
 *    zusätzlich analytisch über die Faktoren (1 − γλ) bzw. die Eigenwerte der
 *    2x2-Momentum-Matrix.
 *  - Armijo: alle Reglerzustände des Rasters durchgespielt.
 *  - Ridge/Lasso und Landkarte: Schwellen per Bisektion und über ein Raster.
 *
 * Konstanten werden, wo sie driften könnten, aus dem TSX-Quelltext gelesen.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const lies = (name) => readFileSync(join(repo, "src/chapters/12-optim/widgets", name), "utf8");
const liesMdx = (name) => readFileSync(join(repo, "src/chapters/12-optim", name), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/** Nullstelle von g auf [a, b] per Bisektion. */
function bisektion(g, a, b, n = 200) {
  let [lo, hi] = [a, b];
  for (let i = 0; i < n; i++) {
    const m = (lo + hi) / 2;
    if (g(lo) * g(m) <= 0) hi = m;
    else lo = m;
  }
  return (lo + hi) / 2;
}

/* ==================================================================== */
/* S121Bisektion.tsx                                                     */
/* ==================================================================== */

/** Tatsächlich durchgeführte Bisektion; liefert Schrittzahl und Endintervall. */
function bisektionsLauf(f, a0, b0, eps) {
  let [a, b] = [a0, b0];
  let k = 0;
  while (b - a >= eps) {
    const m = (a + b) / 2;
    if (f(a) * f(m) <= 0) b = m;
    else a = m;
    k++;
  }
  return { k, a, b, mitte: (a + b) / 2 };
}
{
  const f = (x) => x * x - 2;
  const erwartet = { 1e-3: 10, 1e-4: 14, 1e-6: 20, 1e-8: 27, 1e-10: 34 };
  for (const [eps, soll] of Object.entries(erwartet)) {
    const r = bisektionsLauf(f, 1, 2, Number(eps));
    assert.equal(r.k, soll, `Bisektion auf [1,2] mit ε = ${eps} braucht ${soll} Schritte`);
    // Gegenprobe mit der Formel des Satzes
    assert.equal(r.k, Math.ceil(Math.log2(1 / Number(eps))), `Formel und Lauf müssen für ε = ${eps} übereinstimmen`);
  }
  const r6 = bisektionsLauf(f, 1, 2, 1e-6);
  nah(r6.b - r6.a, Math.pow(2, -20), 1e-15, "Länge des Endintervalls bei ε = 1e−6");
  nah(r6.mitte, 1.414213657, 1e-8, "Mitte des Endintervalls");
  nah(Math.abs(r6.mitte - Math.SQRT2), 9.501e-8, 1e-10, "Abstand der Mitte zu √2");
  nah(1 / Math.log10(2), 3.3219, 1e-4, "Schritte je zusätzlicher Dezimalstelle");
}
{
  // Das kubische Beispiel: drei Nullstellen, die Bisektion findet die linke.
  const g = (x) => x ** 3 - 3 * x + 1;
  const ns = [
    bisektion(g, -2.5, -1.5),
    bisektion(g, 0, 1),
    bisektion(g, 1, 2),
  ];
  nah(ns[0], -1.879385, 1e-6, "linke Nullstelle des kubischen Beispiels");
  nah(ns[1], 0.347296, 1e-6, "mittlere Nullstelle");
  nah(ns[2], 1.532089, 1e-6, "rechte Nullstelle");
  assert.ok(g(0) > 0 && g(2) > 0, "f(0) und f(2) tragen dasselbe Vorzeichen");
  const r = bisektionsLauf(g, -2, 2, 1e-6);
  nah(r.mitte, ns[0], 1e-5, "die Bisektion landet auf der linken Nullstelle");
  assert.equal(r.k, 22, `aus [−2, 2] braucht sie 22 Schritte, gezählt ${r.k}`);
}

/* ==================================================================== */
/* S121Newton.tsx — Schrittzahlen, arctan-Schwelle, K_MAX               */
/* ==================================================================== */

const newtonSrc = lies("S121Newton.tsx");
const K_MAX = Number(newtonSrc.match(/const K_MAX = (\d+);/)[1]);
assert.equal(K_MAX, 12, "K_MAX muss 12 sein, sonst ist der Fall x⁽⁰⁾ = 1,05 nicht vorführbar");

function newtonBahn(f, df, x0, K = K_MAX) {
  const xs = [x0];
  for (let i = 0; i < K; i++) {
    const x = xs[xs.length - 1];
    const d = df(x);
    if (!Number.isFinite(d) || Math.abs(d) < 1e-13) break;
    const nx = x - f(x) / d;
    xs.push(nx);
    if (!Number.isFinite(nx) || Math.abs(nx) > 1e12) break;
  }
  return xs;
}
/** Erster Schritt mit Fehler < 1e−10 — die Definition des Verdikts seit REV29. */
const ankunft = (bahn, ziel) => bahn.findIndex((v) => Math.abs(v - ziel) < 1e-10);

{
  const f = (x) => x * x - 2;
  const df = (x) => 2 * x;
  const b = newtonBahn(f, df, 3);
  const fehler = b.map((v) => Math.abs(v - Math.SQRT2));
  const soll = [1.59, 4.19e-1, 4.79e-2, 7.85e-4, 2.18e-7];
  soll.forEach((s, i) => nah(fehler[i], s, 5e-3 * Math.max(s, 1e-6), `Fehler ${i} ab x⁽⁰⁾ = 3`));
  assert.equal(ankunft(b, Math.SQRT2), 5, "ab x⁽⁰⁾ = 3 kommt Newton in 5 Schritten an");
  // quadratische Konvergenz: e_{k+1}/e_k² → f″/(2f′) = 1/(2√2)
  const q = fehler[3] / fehler[2] ** 2;
  nah(q, 1 / (2 * Math.SQRT2), 2e-2, "Quotient e_{k+1}/e_k² läuft gegen 0,3536");
  // Der Lauf ab x⁽⁰⁾ = 1 aus dem Header
  const b1 = newtonBahn(f, df, 1);
  const soll1 = [1, 1.5, 1.4166666667, 1.4142156863, 1.4142135624];
  soll1.forEach((s, i) => nah(b1[i], s, 1e-9, `Iterierte ${i} ab x⁽⁰⁾ = 1`));
}
{
  const g = (x) => x ** 3 - 3 * x + 1;
  const dg = (x) => 3 * x * x - 3;
  const N = [-1.879385241572, 0.347296355334, 1.532088886238];
  const naechste = (z) => N.reduce((a, c) => (Math.abs(c - z) < Math.abs(a - z) ? c : a));
  for (const [x0, sollAnkunft] of [
    [-2, 4],
    [0, 4],
    [2, 5],
    [1.05, 8],
  ]) {
    const b = newtonBahn(g, dg, x0);
    const ziel = naechste(b[b.length - 1]);
    const a = ankunft(b, ziel);
    assert.equal(a, sollAnkunft, `ab x⁽⁰⁾ = ${x0} kommt Newton in ${sollAnkunft} Schritten an, gezählt ${a}`);
    assert.ok(a <= K_MAX, `der Regler muss bis dorthin reichen (K_MAX = ${K_MAX})`);
  }
  const b = newtonBahn(g, dg, 1.05);
  nah(dg(1.05), 0.3075, 1e-9, "f′(1,05)");
  nah(b[1], 4.277236, 1e-6, "erster Schritt ab 1,05");
  // Der beworbene Vergleich „doppelt so viele Schritte"
  assert.equal(ankunft(b, naechste(b[b.length - 1])), 2 * 4, "1,05 kostet doppelt so viele Schritte wie −2");
}
{
  // arctan-Schwelle als Nullstelle von arctan(ξ)(1+ξ²) − 2ξ
  const h = (t) => Math.atan(t) * (1 + t * t) - 2 * t;
  const schwelle = bisektion(h, 1, 2);
  nah(schwelle, 1.3917452, 1e-6, "arctan-Schwelle");
  const imSrc = Number(newtonSrc.match(/const ARCTAN_SCHWELLE = ([\d.]+);/)[1]);
  nah(imSrc, schwelle, 1e-6, "die Konstante im Quelltext");
  // Gegenprobe über das beobachtete Verhalten: unterhalb konvergiert Newton,
  // oberhalb wachsen die Beträge.
  const at = Math.atan;
  const dat = (x) => 1 / (1 + x * x);
  const konvergiert = (x0) => {
    const b = newtonBahn(at, dat, x0, 60);
    return Math.abs(b[b.length - 1]) < 1e-6;
  };
  assert.ok(konvergiert(schwelle - 0.01), "knapp unter der Schwelle konvergiert Newton");
  assert.ok(!konvergiert(schwelle + 0.01), "knapp darüber nicht mehr");
  const folge = newtonBahn(at, dat, 1.5, 6);
  const sollFolge = [1.5, -1.69408, 2.321127, -5.114088, 32.295684, -1575.32];
  sollFolge.forEach((s, i) => nah(folge[i], s, 1e-2, `Divergenzfolge ab 1,5, Glied ${i}`));
}

/* ==================================================================== */
/* S121Fixpunkt.tsx — Spektralnormen der drei Systeme                    */
/* ==================================================================== */

/** ρ = ‖M‖₂ als Maximum über ein Richtungsraster (kein Formelabgleich). */
function spektralnormRaster(M, n = 200000) {
  let max = 0;
  for (let i = 0; i < n; i++) {
    const t = (Math.PI * i) / n;
    const v = [Math.cos(t), Math.sin(t)];
    const w = [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];
    max = Math.max(max, Math.hypot(w[0], w[1]));
  }
  return max;
}
const rhoVon = (A, g) =>
  spektralnormRaster([
    [1 - g * A[0][0], -g * A[0][1]],
    [-g * A[1][0], 1 - g * A[1][1]],
  ]);
{
  const A1 = [[4, 1], [1, 3]];
  // Eigenwerte über die charakteristische Gleichung
  const sp = 7;
  const det = 11;
  const l1 = (sp - Math.sqrt(sp * sp - 4 * det)) / 2;
  const l2 = (sp + Math.sqrt(sp * sp - 4 * det)) / 2;
  nah(l2, 4.618034, 1e-6, "größter Eigenwert von (4 1; 1 3)");
  nah(l1, 2.381966, 1e-6, "kleinster Eigenwert");
  nah(rhoVon(A1, 0.25), 0.4045, 1e-4, "ρ(0,25) für das erste System");
  nah(rhoVon(A1, 2 / 7), Math.sqrt(5) / 7, 1e-4, "ρ im Optimum γ = 2/7");
  nah(Math.sqrt(5) / 7, 0.3194, 1e-4, "√5/7");
  nah(2 / l2, 0.4331, 1e-4, "Divergenzschwelle 2/λ_max");
  // γ* = 2/(λ_min + λ_max) ist das Optimum
  nah(2 / (l1 + l2), 2 / 7, 1e-9, "γ* = 2/(λ_min + λ_max) = 2/7");
}
{
  const A2 = [[1, -2], [2, 1]];
  // ρ(γ) = sqrt((1−γ)² + 4γ²), Minimum bei γ = 0,2
  const rho = (g) => Math.sqrt((1 - g) ** 2 + 4 * g * g);
  for (const g of [0.05, 0.2, 0.35]) nah(rhoVon(A2, g), rho(g), 1e-4, `ρ(${g}) für die Drehung`);
  let best = Infinity;
  let arg = 0;
  for (let i = 0; i <= 10000; i++) {
    const g = i / 10000;
    if (rho(g) < best) {
      best = rho(g);
      arg = g;
    }
  }
  nah(arg, 0.2, 1e-3, "das Optimum der Drehung liegt bei γ = 0,2");
  nah(best, 2 / Math.sqrt(5), 1e-6, "ρ_min = 2/√5");
  nah(2 / Math.sqrt(5), 0.8944, 1e-4, "2/√5");
  nah(bisektion((g) => rho(g) - 1, 0.2, 1), 0.4, 1e-6, "Divergenz ab γ = 0,4");
}
{
  const A3 = [[1, 0], [0, 10]];
  const rho = (g) => Math.max(Math.abs(1 - g), Math.abs(1 - 10 * g));
  for (const g of [0.1, 2 / 11, 0.25]) nah(rhoVon(A3, g), rho(g), 1e-4, `ρ(${g}) für diag(1, 10)`);
  nah(rho(0.25), 1.5, 1e-9, "ρ(0,25) = 1,5, die Iteration divergiert also");
  nah(rho(2 / 11), 9 / 11, 1e-9, "bestes ρ = 9/11");
  nah(2 / 11, 0.1818, 1e-4, "γ* = 2/11");
  nah(bisektion((g) => rho(g) - 1, 0.15, 0.5), 0.2, 1e-6, "Divergenz ab γ = 0,2");
  // Die Lösung der Schätzfrage in S121.mdx ist genau diese 0,2.
  const mdx = liesMdx("S121.mdx");
  assert.ok(mdx.includes("loesung={0.2}"), "die Schätzfrage sucht 0,2");
}

/* ==================================================================== */
/* S122Sattel.tsx — Faktoren, Bahn, γ = 0,5                              */
/* ==================================================================== */

const sattelSrc = lies("S122Sattel.tsx");
{
  const gammaMax = Number(sattelSrc.match(/label="γ \(Schrittweite\)"[\s\S]*?max=\{([\d.]+)\}/)[1]);
  assert.equal(gammaMax, 0.5, "der γ-Regler muss bis 0,5 reichen, sonst ist der Headerfall unerreichbar");
  const SCHRITTE = Number(sattelSrc.match(/const SCHRITTE = (\d+);/)[1]);
  assert.equal(SCHRITTE, 8, "SCHRITTE ist 8");
  // f(x, y) = x² − y², Gradient über zentrale Differenzen statt analytisch
  const f = (x, y) => x * x - y * y;
  const h = 1e-5;
  const gradNum = (x, y) => [
    (f(x + h, y) - f(x - h, y)) / (2 * h),
    (f(x, y + h) - f(x, y - h)) / (2 * h),
  ];
  const g = gradNum(1.7, -0.9);
  nah(g[0], 3.4, 1e-6, "∂f/∂x in (1,7; −0,9)");
  nah(g[1], 1.8, 1e-6, "∂f/∂y in (1,7; −0,9)");
  const lauf = (x0, y0, gamma, n) => {
    let [x, y] = [x0, y0];
    for (let i = 0; i < n; i++) {
      const gg = gradNum(x, y);
      x -= gamma * gg[0];
      y -= gamma * gg[1];
    }
    return [x, y];
  };
  nah(Math.abs(1 - 2 * 0.25), 0.5, 1e-12, "x-Faktor bei γ = 0,25");
  nah(1 + 2 * 0.25, 1.5, 1e-12, "y-Faktor bei γ = 0,25");
  const e = lauf(1.5, 0.4, 0.25, SCHRITTE);
  nah(e[0], 5.8594e-3, 1e-6, "erste Komponente nach acht Schritten");
  nah(e[1], 10.2516, 1e-3, "zweite Komponente nach acht Schritten");
  const eStrahl = lauf(1.5, 0, 0.25, 20);
  nah(eStrahl[0], 1.431e-6, 1e-8, "auf dem Strahl y = 0 nach zwanzig Schritten");
  nah(eStrahl[1], 0, 1e-12, "y bleibt exakt null");
  // γ = 0,5: der x-Faktor ist exakt null, ein Schritt genügt
  nah(Math.abs(1 - 2 * 0.5), 0, 1e-15, "x-Faktor bei γ = 0,5 ist exakt null");
  nah(1 + 2 * 0.5, 2, 1e-12, "y-Faktor bei γ = 0,5");
  const eins = lauf(1.5, 0, 0.5, 1);
  nah(eins[0], 0, 1e-9, "ein einziger Schritt räumt die x-Richtung ab");
  nah(Math.abs(1 - 2 * 0.45), 0.1, 1e-12, "x-Faktor bei γ = 0,45");
  const e45 = lauf(1.5, 0.4, 0.45, SCHRITTE);
  nah(e45[1], 67.93, 1e-2, "zweite Komponente bei γ = 0,45");
  // Der Preset-Name darf die Antwort der Schätzfrage nicht mehr verraten.
  assert.ok(
    !sattelSrc.includes('name: "Startstrahl y = 0"'),
    "der Preset-Name „Startstrahl y = 0“ verriet die Lösung der Schätzfrage",
  );
}

/* ==================================================================== */
/* S123NelderMead.tsx — Zugzähler, unabhängig nachgespielt               */
/* ==================================================================== */

{
  const f = (p) => (1 - p[0]) ** 2 + 5 * (p[1] - p[0] * p[0]) ** 2;
  const src = lies("S123NelderMead.tsx");
  const starts = [...src.matchAll(/\[\s*\[(-?[\d.]+), (-?[\d.]+)\],\s*\[(-?[\d.]+), (-?[\d.]+)\],\s*\[(-?[\d.]+), (-?[\d.]+)\],?\s*\]/g)]
    .map((m) => [
      [Number(m[1]), Number(m[2])],
      [Number(m[3]), Number(m[4])],
      [Number(m[5]), Number(m[6])],
    ]);
  assert.ok(starts.length >= 2, "die beiden Startsimplizes müssen im Quelltext stehen");

  /** Standard-Nelder-Mead mit α=1, γ=2, ρ=1/2, σ=1/2. */
  function nelderMead(start, schritte) {
    let s = start.map((p) => [p[0], p[1]]);
    const zug = { reflexion: 0, expansion: 0, kontraktion: 0, schrumpfen: 0 };
    let ersterSchrumpf = null;
    let ersteUnterMillionstel = null;
    for (let k = 1; k <= schritte; k++) {
      s.sort((a, b) => f(a) - f(b));
      const [best, mid, wor] = s;
      const c = [(best[0] + mid[0]) / 2, (best[1] + mid[1]) / 2];
      const refl = [2 * c[0] - wor[0], 2 * c[1] - wor[1]];
      const fr = f(refl);
      if (fr < f(best)) {
        const exp = [3 * c[0] - 2 * wor[0], 3 * c[1] - 2 * wor[1]];
        if (f(exp) < fr) {
          s[2] = exp;
          zug.expansion++;
        } else {
          s[2] = refl;
          zug.reflexion++;
        }
      } else if (fr < f(mid)) {
        s[2] = refl;
        zug.reflexion++;
      } else {
        const aussen = [(c[0] + refl[0]) / 2, (c[1] + refl[1]) / 2];
        const innen = [(c[0] + wor[0]) / 2, (c[1] + wor[1]) / 2];
        const kand = fr < f(wor) ? aussen : innen;
        if (f(kand) < Math.min(fr, f(wor))) {
          s[2] = kand;
          zug.kontraktion++;
        } else {
          s = [best, [(best[0] + mid[0]) / 2, (best[1] + mid[1]) / 2], [(best[0] + wor[0]) / 2, (best[1] + wor[1]) / 2]];
          zug.schrumpfen++;
          if (ersterSchrumpf === null) ersterSchrumpf = k;
        }
      }
      const bestWert = Math.min(...s.map(f));
      if (ersteUnterMillionstel === null && bestWert < 1e-6) ersteUnterMillionstel = k;
    }
    s.sort((a, b) => f(a) - f(b));
    return { zug, ersterSchrumpf, ersteUnterMillionstel, best: f(s[0]) };
  }

  const r1 = nelderMead(starts[0], 40);
  assert.deepEqual(
    [r1.zug.reflexion, r1.zug.expansion, r1.zug.kontraktion, r1.zug.schrumpfen],
    [13, 4, 23, 0],
    `Zugzähler nach 40 Schritten: ${JSON.stringify(r1.zug)}`,
  );
  assert.equal(r1.ersteUnterMillionstel, 40, "genau bei Schritt 40 fällt der beste Wert unter 1e−6");
  nah(r1.best, 6.483e-7, 1e-9, "bester Wert nach 40 Schritten");
  assert.ok(
    r1.zug.kontraktion > r1.zug.reflexion && r1.zug.kontraktion > r1.zug.expansion,
    "die Kontraktion ist der häufigste Zug (Lösung der Schätzfrage)",
  );
  const r2 = nelderMead(starts[1], 40);
  assert.equal(r2.ersterSchrumpf, 4, `der zweite Start schrumpft erstmals in Schritt 4, gemessen ${r2.ersterSchrumpf}`);
}

/* ==================================================================== */
/* S123GdStepper.tsx — die fünf Fälle des Faktors 1 − γL                 */
/* ==================================================================== */

{
  const gdSrc = lies("S123GdStepper.tsx");
  // Die abgeleiteten Schwellen dürfen nicht mehr in der Ablesetafel stehen.
  // Die Ablesezeile (nicht der Header) darf die abgeleiteten Schwellen nicht
  // mehr nennen; sie sind die Lösung der Schätzfrage.
  assert.ok(
    !gdSrc.includes("L = f″ = 2, also 1/L"),
    "die Ablesezeile verriet 2/L = 1 und damit die Lösung der Schätzfrage",
  );
  assert.ok(gdSrc.includes("L = f″ = 2</p>"), "die Ablesezeile nennt weiterhin L");
  const f = (x) => (x - 2) ** 2 + 1;
  const df = (x) => 2 * x - 4;
  // L über den zentralen zweiten Differenzenquotienten statt als Konstante
  const h = 1e-4;
  const Lnum = (f(1 + h) - 2 * f(1) + f(1 - h)) / (h * h);
  nah(Lnum, 2, 1e-6, "L = f″, numerisch bestätigt");
  const L = 2;
  const lauf = (gamma, x0, n) => {
    const xs = [x0];
    for (let i = 0; i < n; i++) xs.push(xs[xs.length - 1] - gamma * df(xs[xs.length - 1]));
    return xs;
  };
  const xs = lauf(0.6, 4.5, 5);
  const soll = [4.5, 1.5, 2.1, 1.98, 2.004, 1.9992];
  soll.forEach((s, i) => nah(xs[i], s, 1e-9, `Iterierte ${i} bei γ = 0,6`));
  const fehler = xs.map((v) => v - 2);
  [2.5, -0.5, 0.1, -0.02, 0.004, -0.0008].forEach((s, i) =>
    nah(fehler[i], s, 1e-9, `Fehler ${i} bei γ = 0,6`),
  );
  const faktoren = { 0.2: 0.6, 0.4: 0.2, 0.5: 0, 0.6: -0.2, 0.9: -0.8, 1.0: -1, 1.1: -1.2 };
  for (const [g, s] of Object.entries(faktoren)) nah(1 - Number(g) * L, s, 1e-9, `Faktor bei γ = ${g}`);
  // Die fünf Fälle sind alle auf dem 0,05-Raster erreichbar.
  const raster = [];
  for (let i = 1; i <= 24; i++) raster.push(i * 0.05);
  const klassen = new Set(
    raster.map((g) => {
      const fak = 1 - g * L;
      if (Math.abs(fak) < 1e-12) return "exakt";
      if (Math.abs(fak - -1) < 1e-12) return "pendelt";
      if (fak > 0) return "einseitig";
      return Math.abs(fak) < 1 ? "springt" : "divergiert";
    }),
  );
  assert.equal(klassen.size, 5, `alle fünf Fälle müssen erreichbar sein, gefunden ${[...klassen]}`);
  assert.ok(raster.some((g) => Math.abs(g - 1 / L) < 1e-12), "γ = 1/L liegt auf dem Raster");
  assert.ok(raster.some((g) => Math.abs(g - 2 / L) < 1e-12), "γ = 2/L liegt auf dem Raster");
}

/* ==================================================================== */
/* S123Canyon.tsx — Schrittzahlen im Canyon                              */
/* ==================================================================== */

/**
 * Gradientenabstiet auf der Quadrik f(x) = ½(x₁² + κx₂²) ab dem Startpunkt des
 * Widgets; gezählt werden die Schritte, bis f auf ein Millionstel gefallen ist.
 * Die Iteration wird hier über den Gradienten selbst geführt (numerisch aus f),
 * nicht über die im Widget vorgerechneten Faktoren.
 */
const CANYON_START = (() => {
  const src = lies("S123Canyon.tsx");
  const m = src.match(/const START: V2 = \[(-?[\d.]+), (-?[\d.]+)\];/);
  assert.ok(m, "START nicht im Quelltext gefunden");
  return [Number(m[1]), Number(m[2])];
})();
assert.deepEqual(CANYON_START, [5, 1], "der Startpunkt des Canyon-Widgets ist gedriftet");

function canyonSchritte(kappa, anteil, max = 5000) {
  const L = kappa;
  const gamma = (anteil * 2) / L;
  const f = (p) => 0.5 * (p[0] * p[0] + kappa * p[1] * p[1]);
  const h = 1e-6;
  const grad = (p) => [
    (f([p[0] + h, p[1]]) - f([p[0] - h, p[1]])) / (2 * h),
    (f([p[0], p[1] + h]) - f([p[0], p[1] - h])) / (2 * h),
  ];
  let x = [...CANYON_START];
  const f0 = f(x);
  for (let k = 1; k <= max; k++) {
    const g = grad(x);
    x = [x[0] - gamma * g[0], x[1] - gamma * g[1]];
    const v = f(x);
    if (!Number.isFinite(v)) return null;
    if (v <= 1e-6 * f0) return k;
  }
  return null;
}
{
  // γ = 0,9·(2/L) — die Voreinstellungen „Zickzack" und „Schlucht"
  for (const [k, soll] of [[10, 35], [25, 88], [100, 336]])
    assert.equal(canyonSchritte(k, 0.9), soll, `κ = ${k} bei γ = 0,9·2/L braucht ${soll} Schritte`);
  // γ = 1/L, also Anteil 0,5
  for (const [k, soll] of [[1, 1], [10, 64], [100, 608]])
    assert.equal(canyonSchritte(k, 0.5), soll, `κ = ${k} bei γ = 1/L braucht ${soll} Schritte`);
  // Analytische Gegenprobe bei γ = 1/L: der erste Schritt annulliert x₂ exakt,
  // danach fällt f je Schritt auf das (1 − μ/L)²-fache.
  for (const k of [10, 100]) {
    nah((1 - 1 / k) ** 2, k === 10 ? 0.81 : 0.9801, 1e-9, `Rate je Schritt bei κ = ${k}`);
    const rate = (1 - 1 / k) ** 2;
    const f0 = 0.5 * (25 + k);
    // nach dem ersten Schritt: x = ((1−1/k)·5, 0)
    const f1 = 0.5 * (25 * (1 - 1 / k) ** 2);
    const n = 1 + Math.ceil(Math.log((1e-6 * f0) / f1) / Math.log(rate));
    assert.equal(n, canyonSchritte(k, 0.5), `analytische Schrittzahl für κ = ${k}`);
  }
  // Der Aufwand wächst ungefähr proportional zu κ.
  const q = canyonSchritte(100, 0.9) / canyonSchritte(10, 0.9);
  assert.ok(q > 8 && q < 12, `Aufwand wächst proportional zu κ (Quotient ${q})`);
  // x₂-Faktoren bei κ = 10
  for (const [g, s] of [[0.15, -0.5], [0.18, -0.8], [0.2, -1], [0.21, -1.1]])
    nah(1 - g * 10, s, 1e-9, `x₂-Faktor bei γ = ${g}`);
  // Die Schätzfrage in S123.mdx sucht genau die 336.
  assert.ok(liesMdx("S123.mdx").includes("loesung={336}"), "die Schätzfrage sucht 336");
}

/* ==================================================================== */
/* S123Armijo.tsx — φ-Werte und die Höchstzahl der Halbierungen          */
/* ==================================================================== */

{
  const f = (p) => 0.5 * p[0] * p[0] + 2.5 * p[1] * p[1];
  const grad = (p) => [p[0], 5 * p[1]];
  const phiVon = (x) => {
    const g = grad(x);
    const d = [-g[0], -g[1]];
    return {
      phi: (t) => f([x[0] + t * d[0], x[1] + t * d[1]]),
      steigung: g[0] * d[0] + g[1] * d[1],
      d,
    };
  };
  const x = [5, 1];
  const { phi, steigung } = phiVon(x);
  nah(steigung, -50, 1e-12, "φ′(0) in x = (5; 1)");
  nah(phi(0), 15, 1e-12, "φ(0)");
  nah(phi(1), 40, 1e-12, "φ(1)");
  nah(phi(0.5), 8.75, 1e-12, "φ(0,5)");
  // exakter Minimierer über eine goldene Suche statt über die Formel
  let [lo, hi] = [0, 2];
  for (let i = 0; i < 200; i++) {
    const m1 = lo + (hi - lo) / 3;
    const m2 = hi - (hi - lo) / 3;
    if (phi(m1) < phi(m2)) hi = m2;
    else lo = m1;
  }
  nah((lo + hi) / 2, 1 / 3, 1e-6, "exakter Minimierer γ* = 1/3");
  nah(phi(1 / 3), 20 / 3, 1e-9, "φ(γ*)");
  // Armijo-Rückwärtssuche
  const armijo = (x0, c, rho) => {
    const { phi: p, steigung: s } = phiVon(x0);
    if (Math.abs(s) < 1e-12) return 0;
    let t = 1;
    let n = 0;
    while (p(t) > p(0) + c * t * s && n < 200) {
      t *= rho;
      n++;
    }
    return n;
  };
  assert.equal(armijo([5, 1], 1e-4, 0.5), 1, "mit c = 1e−4 und ρ = 0,5 genügt eine Halbierung");
  assert.equal(armijo([5, 1], 0.3, 0.5), 2, "mit c = 0,3 sind zwei Halbierungen nötig");
  nah(phi(0.25), 7.1875, 1e-12, "φ(0,25)");
  // Höchstzahl über das ganze Reglerraster
  let max = -1;
  let argmax = null;
  for (let i = -24; i <= 24; i++)
    for (let j = -8; j <= 8; j++)
      for (let ci = 1; ci <= 10; ci++)
        for (let ri = 1; ri <= 9; ri++) {
          const n = armijo([i * 0.25, j * 0.25], ci * 0.05, ri * 0.1);
          if (n > max) {
            max = n;
            argmax = [i * 0.25, j * 0.25, ci * 0.05, ri * 0.1];
          }
        }
  assert.equal(max, 16, `Höchstzahl der Verkleinerungen ist 16, gemessen ${max} bei ${argmax}`);
  assert.deepEqual(argmax.slice(2), [0.5, 0.9], "das Maximum sitzt bei c = 0,5 und ρ = 0,9");
}

/* ==================================================================== */
/* S124Newton.tsx — Newton für die Optimierung                           */
/* ==================================================================== */

{
  const f = (x) => x - 2 * Math.log(x);
  const schritt = (x) => (x * (4 - x)) / 2; // x − f′/f″ für f = x − 2 ln x
  // Gegenprobe: der Schritt über numerische Ableitungen
  const h = 1e-5;
  const d1 = (x) => (f(x + h) - f(x - h)) / (2 * h);
  const d2 = (x) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
  for (const x of [1, 1.5, 3, 4.5]) nah(x - d1(x) / d2(x), schritt(x), 3e-3, `Newton-Schritt in ${x}`);
  let x = 1;
  const bahn = [x];
  for (let i = 0; i < 5; i++) {
    x = schritt(x);
    bahn.push(x);
  }
  [1, 1.5, 1.875, 1.9921875, 1.99996948, 2].forEach((s, i) =>
    nah(bahn[i], s, 1e-7, `Iterierte ${i} ab x⁽⁰⁾ = 1`),
  );
  const e = bahn.map((v) => Math.abs(v - 2));
  nah(e[2] / e[1] ** 2, 0.5, 1e-9, "Quotient e_{k+1}/e_k² ist konstant 0,5");
  assert.ok(schritt(4.5) < 0, "ab x⁽⁰⁾ = 4,5 verlässt der erste Schritt den Definitionsbereich");
  nah(schritt(4.5), -1.125, 1e-12, "der erste Schritt landet bei −1,125");
  assert.ok(schritt(4) <= 0, "auch ab 4 wird der Schritt nicht positiv");
}
{
  const g = (x) => x ** 4 / 4 - x ** 3 / 3 - x * x + 2;
  const g1 = (x) => x ** 3 - x * x - 2 * x;
  const g2 = (x) => 3 * x * x - 2 * x - 2;
  nah(g(-1), 1.5833, 1e-4, "f(−1)");
  nah(g(0), 2, 1e-12, "f(0)");
  nah(g(2), -0.6667, 1e-4, "f(2)");
  nah(bisektion(g2, -1.5, 0), -0.5486, 1e-4, "erster Wendepunkt");
  nah(bisektion(g2, 0.5, 2), 1.2153, 1e-4, "zweiter Wendepunkt");
  nah(g1(0.5), -1.125, 1e-12, "f′(0,5)");
  nah(g2(0.5), -2.25, 1e-12, "f″(0,5)");
  nah(0.5 - g1(0.5) / g2(0.5), 0, 1e-12, "0,5 landet in EINEM Schritt exakt auf dem lokalen Maximum 0");
  nah(g2(1.2), -0.08, 1e-12, "f″(1,2)");
  nah(1.2 - g1(1.2) / g2(1.2), -25.2, 1e-9, "der erste Schritt ab 1,2 springt nach −25,2");
  const laufe = (x0, n = 60) => {
    let x = x0;
    for (let i = 0; i < n; i++) {
      const d = g2(x);
      if (Math.abs(d) < 1e-13) break;
      const nx = x - g1(x) / d;
      if (!Number.isFinite(nx)) break;
      x = nx;
    }
    return x;
  };
  nah(laufe(-2), -1, 1e-9, "ab −2 landet Newton im lokalen Minimum −1");
  nah(laufe(2.5), 2, 1e-9, "ab 2,5 im globalen Minimum 2");
  nah(laufe(1.2), -1, 1e-9, "ab 1,2 im LOKALEN Minimum −1");
}

/* ==================================================================== */
/* S124Bfgs.tsx — Sekantenbedingung und exakte Schrittweiten             */
/* ==================================================================== */

{
  const H = [[1, 0], [0, 5]];
  const f = (p) => 0.5 * p[0] * p[0] + 2.5 * p[1] * p[1];
  const grad = (p) => [p[0], 5 * p[1]];
  const mul = (M, v) => [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];
  const bfgs = (alphaExakt) => {
    let B = [[1, 0], [0, 1]];
    let x = [5, 1];
    const werte = [f(x)];
    let maxResiduum = 0;
    const alphas = [];
    for (let k = 0; k < 8; k++) {
      const g = grad(x);
      const d = mul(B, g).map((v) => -v);
      let a = 1;
      if (alphaExakt) {
        const Hd = mul(H, d);
        a = -(g[0] * d[0] + g[1] * d[1]) / (d[0] * Hd[0] + d[1] * Hd[1]);
      }
      alphas.push(a);
      const xn = [x[0] + a * d[0], x[1] + a * d[1]];
      const s = [xn[0] - x[0], xn[1] - x[1]];
      const gn = grad(xn);
      const y = [gn[0] - g[0], gn[1] - g[1]];
      const sy = s[0] * y[0] + s[1] * y[1];
      if (Math.abs(sy) > 1e-14) {
        const By = mul(B, y);
        const yBy = y[0] * By[0] + y[1] * By[1];
        const neu = [[0, 0], [0, 0]];
        for (let i = 0; i < 2; i++)
          for (let j = 0; j < 2; j++)
            neu[i][j] =
              B[i][j] +
              ((sy + yBy) * s[i] * s[j]) / (sy * sy) -
              (By[i] * s[j] + s[i] * By[j]) / sy;
        B = neu;
        const Bn = mul(B, y);
        maxResiduum = Math.max(maxResiduum, Math.hypot(Bn[0] - s[0], Bn[1] - s[1]));
      }
      x = xn;
      werte.push(f(x));
    }
    return { werte, B, maxResiduum, alphas, x };
  };
  const einheit = bfgs(false);
  nah(einheit.werte[0], 15, 1e-12, "f(x⁽⁰⁾)");
  nah(einheit.werte[1], 40, 1e-12, "f springt im ersten Schritt auf 40");
  nah(einheit.werte[2], 2.963, 1e-3, "danach fällt f auf 2,963");
  assert.ok(einheit.maxResiduum < 1e-12, `Sekantenbedingung, Residuum ${einheit.maxResiduum}`);
  const exakt = bfgs(true);
  nah(exakt.alphas[0], 1 / 3, 1e-9, "α₀ bei exakter Liniensuche");
  nah(exakt.alphas[1], 0.6, 1e-9, "α₁ bei exakter Liniensuche");
  nah(exakt.werte[2], 0, 1e-12, "nach zwei Schritten steht die Iteration im Minimum");
  // B₂ = H^{-1} = diag(1; 0,2)
  const Binv = [[1, 0], [0, 0.2]];
  const bfgs2 = (() => {
    // dieselbe Rechnung, aber nach genau zwei Schritten abgebrochen
    let B = [[1, 0], [0, 1]];
    let x = [5, 1];
    for (let k = 0; k < 2; k++) {
      const g = grad(x);
      const d = mul(B, g).map((v) => -v);
      const Hd = mul(H, d);
      const a = -(g[0] * d[0] + g[1] * d[1]) / (d[0] * Hd[0] + d[1] * Hd[1]);
      const xn = [x[0] + a * d[0], x[1] + a * d[1]];
      const s = [xn[0] - x[0], xn[1] - x[1]];
      const gn = grad(xn);
      const y = [gn[0] - g[0], gn[1] - g[1]];
      const sy = s[0] * y[0] + s[1] * y[1];
      const By = mul(B, y);
      const yBy = y[0] * By[0] + y[1] * By[1];
      const neu = [[0, 0], [0, 0]];
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++)
          neu[i][j] =
            B[i][j] + ((sy + yBy) * s[i] * s[j]) / (sy * sy) - (By[i] * s[j] + s[i] * By[j]) / sy;
      B = neu;
      x = xn;
    }
    return B;
  })();
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++)
      nah(bfgs2[i][j], Binv[i][j], 1e-9, `B₂[${i}][${j}] muss H⁻¹ treffen`);
}

/* ==================================================================== */
/* S124Momentum.tsx — die vier κ-Paare, PRUEFE                           */
/* ==================================================================== */

const momentumSrc = lies("S124Momentum.tsx");
{
  const PRUEFE = Number(momentumSrc.match(/const PRUEFE = (\d+);/)[1]);
  assert.ok(PRUEFE >= 608, `PRUEFE muss mindestens 608 sein, sonst ist die Zahl 608 unsichtbar (ist ${PRUEFE})`);
  const m = momentumSrc.match(/const START: V2 = \[(-?[\d.]+), (-?[\d.]+)\];/);
  assert.ok(m, "START nicht im Quelltext gefunden");
  const START = [Number(m[1]), Number(m[2])];
  assert.deepEqual(START, [5, 1], "der Startpunkt des Momentum-Widgets ist gedriftet");
  const schritte = (kappa, alpha, max = PRUEFE) => {
    const L = kappa;
    const gamma = 1 / L;
    // Gradient numerisch aus f, nicht aus der im Widget vorgerechneten Formel
    const f = (p) => 0.5 * (p[0] * p[0] + kappa * p[1] * p[1]);
    const h = 1e-7;
    const grad = (p) => [
      (f([p[0] + h, p[1]]) - f([p[0] - h, p[1]])) / (2 * h),
      (f([p[0], p[1] + h]) - f([p[0], p[1] - h])) / (2 * h),
    ];
    let x = [...START];
    let v = [0, 0];
    const f0 = f(x);
    for (let k = 1; k <= max; k++) {
      const g = grad(x);
      v = [alpha * v[0] - gamma * g[0], alpha * v[1] - gamma * g[1]];
      x = [x[0] + v[0], x[1] + v[1]];
      if (!Number.isFinite(x[0]) || !Number.isFinite(x[1])) return null;
      if (f(x) <= 1e-6 * f0) return k;
    }
    return null;
  };
  for (const [kappa, ohne, mit] of [
    [5, 31, 106],
    [10, 64, 103],
    [25, 161, 103],
    [100, 608, 121],
  ]) {
    assert.equal(schritte(kappa, 0), ohne, `κ = ${kappa} ohne Momentum: ${ohne} Schritte`);
    assert.equal(schritte(kappa, 0.9), mit, `κ = ${kappa} mit Momentum: ${mit} Schritte`);
  }
  // Bei κ = 5 schadet der Schwung — das ist die Lösung der Schätzfrage.
  assert.ok(schritte(5, 0.9) > schritte(5, 0), "bei κ = 5 kostet Momentum Schritte");
  assert.ok(schritte(100, 0.9) < schritte(100, 0), "bei κ = 100 spart es Schritte");
  // Schweizer „ss" darf nicht in lesersichtbarem Text stehen.
  for (const wort of ["grössere", "schiessen", "Grössenordnungen"])
    assert.ok(!momentumSrc.includes(wort), `„${wort}" gehört nicht in den Verdikttext`);
  // Stabilitätsgrenzen 2 und 2(1 + α)
  nah(2 * (1 + 0.9), 3.8, 1e-12, "Momentum-Grenze 2(1 + α)");
}

/* ==================================================================== */
/* S125Lagrange.tsx — Multiplikatoren in den drei Modi                   */
/* ==================================================================== */

{
  const f = (x, y) => x * x + y * y;
  // Auf der Geraden y = 1 − x: Minimum per goldener Suche statt per Formel
  let [lo, hi] = [-1, 2];
  for (let i = 0; i < 200; i++) {
    const m1 = lo + (hi - lo) / 3;
    const m2 = hi - (hi - lo) / 3;
    if (f(m1, 1 - m1) < f(m2, 1 - m2)) hi = m2;
    else lo = m1;
  }
  const t = (lo + hi) / 2;
  nah(t, 0.5, 1e-6, "auf der Geraden ist f minimal bei t = 0,5");
  nah(f(t, 1 - t), 0.5, 1e-6, "mit f = 0,5");
  // Kreuzprodukt von ∇f = (2t, 2(1−t)) mit (1, 1) ist 4t − 2
  const kreuz = (tt) => 2 * tt * 1 - 2 * (1 - tt) * 1;
  nah(kreuz(0.5), 0, 1e-12, "das Kreuzprodukt verschwindet bei t = 0,5");
  nah(kreuz(1.2), 2.8, 1e-12, "bei t = 1,2 beträgt es 2,80");
  assert.equal(bisektion(kreuz, -1, 2).toFixed(6), (0.5).toFixed(6), "und nur dort");
  // Multiplikatoren: λ = −1 (eq), μ = +1 (ge), μ = −1 (le)
  const gf = [2 * 0.5, 2 * 0.5];
  nah(-gf[0] / 1, -1, 1e-12, "λ* = −1 im Gleichungsmodus");
  nah(-gf[0] / -1, 1, 1e-12, "μ = +1 im ≥-Modus, die Ungleichung bindet");
  nah(-gf[0] / 1, -1, 1e-12, "μ = −1 im ≤-Modus, kein KKT-Punkt");
  // Der Verdikt-Zweig muss den ≤-Modus als Warnung führen (E3/D1).
  const lagrangeSrc = lies("S125Lagrange.tsx");
  assert.ok(
    lagrangeSrc.includes("parallel, aber μ < 0: kein KKT-Punkt"),
    "im ≤-Modus darf kein grünes Häkchen zu „kein KKT-Punkt“ stehen",
  );
  assert.ok(lagrangeSrc.includes("const kkt ="), "die Verdikt-Art muss aus dem Modus abgeleitet werden");
}

/* ==================================================================== */
/* S125RidgeLasso.tsx — Eckenschwelle und Aktivitätsgrenzen              */
/* ==================================================================== */

{
  const rlSrc = lies("S125RidgeLasso.tsx");
  const A = [[2, 0.6], [0.6, 1]];
  const M = [1.6, 0.9];
  const ziel = (p) => {
    const d = [p[0] - M[0], p[1] - M[1]];
    return A[0][0] * d[0] * d[0] + 2 * A[0][1] * d[0] * d[1] + A[1][1] * d[1] * d[1];
  };
  /** Minimum über den Rand der Raute ‖β‖₁ ≤ c (feine Abtastung). */
  const lassoLoesung = (c, n = 400000) => {
    let best = null;
    let bw = Infinity;
    for (let i = 0; i < n; i++) {
      const s = (4 * c * i) / n;
      let p;
      const q = s / c;
      if (q < 1) p = [c - s, s];
      else if (q < 2) p = [-(s - c), 2 * c - s];
      else if (q < 3) p = [-(3 * c - s), -(s - 2 * c)];
      else p = [s - 3 * c, -(4 * c - s)];
      const w = ziel(p);
      if (w < bw) {
        bw = w;
        best = p;
      }
    }
    // liegt der KQ-Punkt schon drin, ist er die Lösung
    if (Math.abs(M[0]) + Math.abs(M[1]) <= c) return { p: M, aktiv: false };
    return { p: best, aktiv: true };
  };
  const inEcke = (c) => {
    const r = lassoLoesung(c);
    return r.aktiv && Math.abs(r.p[1]) < 1e-3;
  };
  assert.ok(inEcke(1.3), "bei r = 1,30 sitzt die Lasso-Lösung in der Ecke");
  assert.ok(!inEcke(1.35), "bei r = 1,35 nicht mehr");
  // Schwelle einklemmen
  let [lo, hi] = [1.3, 1.4];
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    if (inEcke(m)) lo = m;
    else hi = m;
  }
  nah((lo + hi) / 2, 1.342857, 2e-3, "Eckenschwelle des Lasso");
  // Aktivitätsgrenzen: ‖m‖₂ und ‖m‖₁
  nah(Math.hypot(M[0], M[1]), 1.835756, 1e-6, "Ridge-Bedingung inaktiv ab ‖m‖₂");
  nah(Math.abs(M[0]) + Math.abs(M[1]), 2.5, 1e-12, "Lasso-Bedingung inaktiv ab ‖m‖₁");
  // Genau dazwischen liegt das Fenster, in dem NUR das Lasso bindet — dafür
  // gibt es seit REV29 einen eigenen Verdikt-Zweig.
  const fenster = [];
  for (let c = 1.85; c <= 2.45 + 1e-9; c += 0.05) fenster.push(Number(c.toFixed(2)));
  assert.equal(fenster.length, 13, `13 Reglerstellungen im Zwischenfenster, gezählt ${fenster.length}`);
  for (const c of fenster) {
    assert.ok(Math.hypot(M[0], M[1]) <= c, `bei r = ${c} ist die Ridge-Bedingung inaktiv`);
    assert.ok(Math.abs(M[0]) + Math.abs(M[1]) > c, `bei r = ${c} bindet das Lasso noch`);
  }
  assert.ok(
    rlSrc.includes("nur noch das Lasso-Budget bindet"),
    "für dieses Fenster braucht es einen eigenen Verdikt-Zweig",
  );
  assert.ok(
    !rlSrc.includes("Die Ecke bleibt optimal bis r ="),
    "der Schlusssatz des Verdikts verriet die Lösung der Schätzfrage",
  );
  // c = 1: Ridge (0,8891; 0,4578), Lasso exakt (1; 0)
  const l1 = lassoLoesung(1);
  nah(l1.p[0], 1, 1e-4, "Lasso-Lösung bei r = 1, erste Koordinate");
  nah(l1.p[1], 0, 1e-4, "Lasso-Lösung bei r = 1, zweite Koordinate");
  nah(ziel(l1.p), 2.178, 1e-3, "Zielwert der Lasso-Lösung bei r = 1");
  // Ridge über den Kreisrand
  let bestR = null;
  let bw = Infinity;
  for (let i = 0; i < 400000; i++) {
    const t = (2 * Math.PI * i) / 400000;
    const p = [Math.cos(t), Math.sin(t)];
    const w = ziel(p);
    if (w < bw) {
      bw = w;
      bestR = p;
    }
  }
  nah(bestR[0], 0.8891, 1e-3, "Ridge-Lösung bei r = 1, erste Koordinate");
  nah(bestR[1], 0.4578, 1e-3, "Ridge-Lösung bei r = 1, zweite Koordinate");
  nah(bw, 1.5837, 1e-3, "Zielwert der Ridge-Lösung bei r = 1");
}

/* ==================================================================== */
/* S126Landkarte.tsx — genau drei Grenzwerte                             */
/* ==================================================================== */

{
  const f = (x1, x2) => Math.log(1 + (x1 * x1 + Math.sin(3 * x2)) ** 2) + 0.1 * (x1 * x1 + x2 * x2);
  const grad = (x1, x2) => {
    const u = x1 * x1 + Math.sin(3 * x2);
    const d = (2 * u) / (1 + u * u);
    return [d * 2 * x1 + 0.2 * x1, d * 3 * Math.cos(3 * x2) + 0.2 * x2];
  };
  // Gegenprobe des Gradienten über zentrale Differenzen
  const h = 1e-6;
  for (const p of [[0.7, -0.4], [-1, 1], [1.2, 0.9]]) {
    const g = grad(p[0], p[1]);
    nah((f(p[0] + h, p[1]) - f(p[0] - h, p[1])) / (2 * h), g[0], 1e-5, `∂f/∂x₁ in ${p}`);
    nah((f(p[0], p[1] + h) - f(p[0], p[1] - h)) / (2 * h), g[1], 1e-5, `∂f/∂x₂ in ${p}`);
  }
  const laufe = (start) => {
    let p = [start[0], start[1]];
    let maxKoord = Math.max(Math.abs(p[0]), Math.abs(p[1]));
    for (let k = 0; k < 3000; k++) {
      const g = grad(p[0], p[1]);
      p = [p[0] - 0.05 * g[0], p[1] - 0.05 * g[1]];
      maxKoord = Math.max(maxKoord, Math.abs(p[0]), Math.abs(p[1]));
    }
    return { ende: p, f: f(p[0], p[1]), maxKoord };
  };
  const a = laufe([-1, -0.5]);
  nah(a.f, 0, 1e-9, "der erste Start endet im globalen Minimum");
  nah(a.ende[0], 0, 1e-6, "…bei x₁ = 0");
  nah(a.ende[1], 0, 1e-6, "…bei x₂ = 0");
  const b = laufe([-1, 1]);
  nah(b.ende[1], 1.0357, 1e-3, "der zweite Start endet in der oberen Mulde");
  nah(b.f, 0.108456, 1e-5, "…mit f = 0,108456");
  const c = laufe([-0.5, -1]);
  nah(c.ende[1], -1.0357, 1e-3, "der dritte Start endet in der unteren Mulde");
  nah(c.f, 0.108456, 1e-5, "…mit f = 0,108456");
  // 81x81-Raster: genau drei Grenzwerte, Pfad bleibt im Fenster
  const grenzwerte = new Set();
  let groesste = 0;
  for (let i = 0; i < 81; i++)
    for (let j = 0; j < 81; j++) {
      const r = laufe([-1.6 + (3.2 * i) / 80, -1.6 + (3.2 * j) / 80]);
      // „bis auf das Vorzeichen der Null" — −0,000 und 0,000 sind derselbe Grenzwert
      grenzwerte.add((r.ende[1] + 0).toFixed(3).replace("-0.000", "0.000"));
      groesste = Math.max(groesste, r.maxKoord);
    }
  assert.equal(grenzwerte.size, 3, `genau drei Grenzwerte, gefunden ${[...grenzwerte].join(" ")}`);
  assert.ok(groesste <= 1.6 + 1e-9, `der Pfad verlässt das Fenster nie (größte Koordinate ${groesste})`);
  nah(groesste, 1.036, 0.6, "größte erreichte Koordinate");
  // Der Landkarten-Gradient ist der KORRIGIERTE (d = 2u/(1+u²)).
  const src = lies("S126Landkarte.tsx");
  assert.ok(src.includes("(2 * u) / (1 + u * u)"), "der korrigierte Gradient muss im Quelltext stehen");
  assert.ok(src.includes("x₁ →"), "die Karte braucht Achsenbeschriftungen (B3)");
}

console.log("12-optim: alle Prüfungen bestanden.");
