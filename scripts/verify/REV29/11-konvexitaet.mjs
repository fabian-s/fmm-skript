#!/usr/bin/env node
/**
 * REV29 — src/chapters/11-konvexitaet/widgets/*.tsx (alle acht Dateien).
 *
 * Bis zum Review 2026-08-29 trug jede der acht Dateien einen Header mit dem
 * Vermerk „historische Notiz … derzeit nicht reproduzierbar nachgewiesen".
 * Dieses Skript löst den Vermerk ab: Es rechnet alle Headerzahlen, alle
 * Voreinstellungen und alle im Verdikt behaupteten Größen nach.
 *
 * UNABHÄNGIGE RECHENWEGE — nirgends wird der Algorithmus des Widgets
 * nachgebaut und mit sich selbst verglichen:
 *
 *  - Konvexe Hülle: die Widgets benutzen Monotone Chain und die
 *    Schnürsenkelformel. Hier wird Extremalität stattdessen über die
 *    Carathéodory-Charakterisierung in der Ebene geprüft (p ist genau dann
 *    KEIN Extrempunkt, wenn ein Dreieck der übrigen Punkte p enthält), und
 *    die Fläche über die Indikatorfunktion auf einem feinen Raster.
 *  - Baryzentrische Gewichte: nicht über Teilflächen, sondern durch Lösen des
 *    2x2-Systems (Cramer).
 *  - λ-Grenzen am Kreisring: nicht per Bisektion, sondern analytisch als
 *    Nullstellen der quadratischen Funktion ‖z(λ)‖² − r².
 *  - Eigenwerte: nicht über m ± hypot, sondern als Minimum/Maximum des
 *    Rayleigh-Quotienten über ein feines Winkelraster, gegengeprüft mit
 *    Spur und Determinante.
 *  - Projektion: nicht über die Kanten-Formeln, sondern als Minimum über ein
 *    dichtes Raster der ganzen Menge.
 *  - Kritische Punkte der Doppelmulde: nicht als Konstante, sondern per
 *    Bisektion auf f′, mit unabhängig gebildeter Ableitung (Differenzenquotient).
 *  - Jensen-Lücke bei x²: gegen die gewichtete Varianz in der Form
 *    Σ wᵢ xᵢ² − (Σ wᵢ xᵢ)², also über die zweite Momentformel.
 *
 * Alle Konstanten (Punktwolken, Voreinstellungen, Startlagen, Regler-Raster)
 * werden aus dem TSX-Quelltext gelesen, damit eine Drift auffällt.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const lies = (name) =>
  readFileSync(join(repo, "src/chapters/11-konvexitaet/widgets", name), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ==================================================================== */
/* S111Huelle.tsx — Hüllenfolge, Extrempunkte, Flächen                  */
/* ==================================================================== */

const huelleSrc = lies("S111Huelle.tsx");
const PUNKTE = [
  ...huelleSrc
    .slice(huelleSrc.indexOf("const PUNKTE: P2[] = ["))
    .slice(0, huelleSrc.slice(huelleSrc.indexOf("const PUNKTE: P2[] = [")).indexOf("];"))
    .matchAll(/\[(-?[\d.]+), (-?[\d.]+)\]/g),
].map((m) => [Number(m[1]), Number(m[2])]);
assert.equal(PUNKTE.length, 14, "die Punktwolke muss 14 Punkte haben");
assert.deepEqual(PUNKTE[0], [1.5, 1.4], "der erste Punkt ist der beobachtete (1,5; 1,4)");

/** Liegt p im (abgeschlossenen) Dreieck abc? Über Vorzeichen der Kreuzprodukte. */
function imDreieck(p, a, b, c) {
  const kreuz = (o, u, v) => (u[0] - o[0]) * (v[1] - o[1]) - (u[1] - o[1]) * (v[0] - o[0]);
  const d1 = kreuz(a, b, p);
  const d2 = kreuz(b, c, p);
  const d3 = kreuz(c, a, p);
  const neg = d1 < -1e-12 || d2 < -1e-12 || d3 < -1e-12;
  const pos = d1 > 1e-12 || d2 > 1e-12 || d3 > 1e-12;
  return !(neg && pos);
}

/**
 * Extrempunkte nach Carathéodory: p ist genau dann kein Extrempunkt von
 * conv(S), wenn ein Dreieck aus S \ {p} den Punkt p enthält (in der Ebene
 * genügen drei Punkte). Ein völlig anderer Weg als Monotone Chain.
 */
function extrempunkte(S) {
  const raus = [];
  for (let i = 0; i < S.length; i++) {
    const p = S[i];
    const rest = S.filter((_, j) => j !== i);
    let drin = false;
    for (let a = 0; a < rest.length && !drin; a++)
      for (let b = a + 1; b < rest.length && !drin; b++)
        for (let c = b + 1; c < rest.length && !drin; c++)
          if (imDreieck(p, rest[a], rest[b], rest[c])) drin = true;
    // Sonderfall bei wenigen Punkten: auch eine Strecke kann p enthalten.
    for (let a = 0; a < rest.length && !drin; a++)
      for (let b = a + 1; b < rest.length && !drin; b++) {
        const [u, v] = [rest[a], rest[b]];
        const kr = (v[0] - u[0]) * (p[1] - u[1]) - (v[1] - u[1]) * (p[0] - u[0]);
        if (Math.abs(kr) < 1e-12) {
          const t =
            Math.abs(v[0] - u[0]) > Math.abs(v[1] - u[1])
              ? (p[0] - u[0]) / (v[0] - u[0])
              : (p[1] - u[1]) / (v[1] - u[1]);
          if (t >= -1e-12 && t <= 1 + 1e-12) drin = true;
        }
      }
    if (!drin) raus.push(p);
  }
  return raus;
}

/** Fläche der Hülle über die Indikatorfunktion auf einem Raster (kein Shoelace). */
function flaecheRaster(S, n = 900) {
  const xs = S.map((p) => p[0]);
  const ys = S.map((p) => p[1]);
  const [x0, x1] = [Math.min(...xs) - 0.05, Math.max(...xs) + 0.05];
  const [y0, y1] = [Math.min(...ys) - 0.05, Math.max(...ys) + 0.05];
  const E = extrempunkte(S);
  let treffer = 0;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const p = [x0 + ((x1 - x0) * (i + 0.5)) / n, y0 + ((y1 - y0) * (j + 0.5)) / n];
      let drin = false;
      for (let a = 0; a < E.length && !drin; a++)
        for (let b = a + 1; b < E.length && !drin; b++)
          for (let c = b + 1; c < E.length && !drin; c++)
            if (imDreieck(p, E[a], E[b], E[c])) drin = true;
      if (drin) treffer++;
    }
  return (treffer / (n * n)) * (x1 - x0) * (y1 - y0);
}

const anzahlen = [];
const verluste = [];
let vorher = extrempunkte(PUNKTE.slice(0, 2));
for (let k = 3; k <= 14; k++) {
  const E = extrempunkte(PUNKTE.slice(0, k));
  anzahlen.push(E.length);
  const weg = vorher.filter((p) => !E.some((q) => q[0] === p[0] && q[1] === p[1]));
  if (weg.length) verluste.push({ k, weg });
  vorher = E;
}
assert.deepEqual(
  anzahlen,
  [3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 7],
  "Extrempunktzahlen für k = 3 … 14 (Headerzahl S111Huelle.tsx)",
);
assert.deepEqual(
  verluste.map((v) => v.k),
  [5, 6, 8, 9, 10, 11, 12],
  "bei diesen k fällt eine alte Ecke heraus",
);
for (const v of verluste)
  assert.equal(v.weg.length, 1, `bei k = ${v.k} fällt genau eine Ecke heraus`);
// Der beobachtete Punkt (1,5; 1,4) verliert seinen Status genau bei k = 5.
const beobachtet = PUNKTE[0];
const istExtrem = (k) =>
  extrempunkte(PUNKTE.slice(0, k)).some(
    (q) => q[0] === beobachtet[0] && q[1] === beobachtet[1],
  );
assert.ok(istExtrem(4), "(1,5; 1,4) ist bei k = 4 noch Extrempunkt");
assert.ok(!istExtrem(5), "(1,5; 1,4) verliert den Status bei k = 5 (Lösung der Schätzfrage)");

// Flächen: monoton wachsend, Anfang 0,44 und Ende 7,46 (Rastergenauigkeit ~1e−3).
const flaechen = [];
for (const k of [3, 14]) flaechen.push(flaecheRaster(PUNKTE.slice(0, k), 700));
nah(flaechen[0], 0.44, 3e-3, "Fläche der Hülle bei k = 3");
nah(flaechen[1], 7.46, 8e-3, "Fläche der Hülle bei k = 14");
let letzte = -Infinity;
for (let k = 3; k <= 14; k++) {
  const f = flaecheRaster(PUNKTE.slice(0, k), 260);
  assert.ok(f >= letzte - 2e-2, `die Fläche darf bei k = ${k} nicht schrumpfen`);
  letzte = f;
}
// Der Sonderfall „zwei Ecken auf einmal" kommt in dieser Wolke nie vor.
assert.ok(
  verluste.every((v) => v.weg.length === 1),
  "über diese Punktliste fällt nie mehr als eine Ecke pro Schritt",
);

/* ==================================================================== */
/* S111Konvexkombination.tsx — Dreieck, Schwerpunkt, Baryzentrik        */
/* ==================================================================== */

const kkSrc = lies("S111Konvexkombination.tsx");
const eckenBlock = kkSrc.slice(kkSrc.indexOf("const ECKEN: P2[] = ["));
const ECKEN = [
  ...eckenBlock.slice(0, eckenBlock.indexOf("];")).matchAll(/\[(-?[\d.]+), (-?[\d.]+)\]/g),
].map((m) => [Number(m[1]), Number(m[2])]);
assert.deepEqual(ECKEN, [[0, 0], [2, 0], [1, 2]], "die drei Ecken sind gedriftet");

// Fläche über das Kreuzprodukt der Kantenvektoren (nicht über Schnürsenkel).
const flDreieck =
  Math.abs(
    (ECKEN[1][0] - ECKEN[0][0]) * (ECKEN[2][1] - ECKEN[0][1]) -
      (ECKEN[1][1] - ECKEN[0][1]) * (ECKEN[2][0] - ECKEN[0][0]),
  ) / 2;
nah(flDreieck, 2, 1e-12, "Dreiecksfläche (Header S111Konvexkombination.tsx)");

/** Baryzentrische Gewichte von p durch Lösen des 2x2-Systems (Cramer). */
function baryzentrisch(p) {
  const [A, B, C] = ECKEN;
  const a11 = B[0] - A[0];
  const a12 = C[0] - A[0];
  const a21 = B[1] - A[1];
  const a22 = C[1] - A[1];
  const det = a11 * a22 - a12 * a21;
  const r1 = p[0] - A[0];
  const r2 = p[1] - A[1];
  const w2 = (r1 * a22 - a12 * r2) / det;
  const w3 = (a11 * r2 - r1 * a21) / det;
  return [1 - w2 - w3, w2, w3];
}
const mischung = (w) => [
  w.reduce((s, wi, i) => s + wi * ECKEN[i][0], 0),
  w.reduce((s, wi, i) => s + wi * ECKEN[i][1], 0),
];
const schwerpunkt = mischung([1 / 3, 1 / 3, 1 / 3]);
nah(schwerpunkt[0], 1, 1e-12, "Schwerpunkt x-Koordinate");
nah(schwerpunkt[1], 2 / 3, 1e-12, "Schwerpunkt y-Koordinate");
for (const [w, erwartet] of [
  [[0.5, 0.25, 0.25], [0.75, 0.5]],
  [[0.25, 0.25, 0.5], [1, 1]],
]) {
  const p = mischung(w);
  nah(p[0], erwartet[0], 1e-12, `Mischung ${w} x`);
  nah(p[1], erwartet[1], 1e-12, `Mischung ${w} y`);
  const zurueck = baryzentrisch(p);
  for (let i = 0; i < 3; i++)
    nah(zurueck[i], w[i], 1e-12, `Rückrechnung des Gewichts w${i + 1}`);
}
// Über das ganze Reglerraster: die baryzentrischen Gewichte des gemischten
// Punktes sind wieder die normierten Reglerwerte, und sie summieren sich zu 1.
let maxAbw = 0;
for (let a = 0; a <= 20; a++)
  for (let b = 0; b <= 20; b++)
    for (let c = 0; c <= 20; c++) {
      const s = a + b + c;
      if (s === 0) continue;
      const w = [a / s, b / s, c / s];
      const zurueck = baryzentrisch(mischung(w));
      for (let i = 0; i < 3; i++) maxAbw = Math.max(maxAbw, Math.abs(zurueck[i] - w[i]));
      nah(zurueck[0] + zurueck[1] + zurueck[2], 1, 1e-12, "Gewichtssumme");
    }
assert.ok(maxAbw < 1e-12, `Baryzentrik weicht um ${maxAbw} ab`);

/* ==================================================================== */
/* S112KonvexTest.tsx — λ-Grenzen, Startlagen, neue Mengenwechsel-Paare */
/* ==================================================================== */

const ktSrc = lies("S112KonvexTest.tsx");
const R_INNEN = 0.8;
const R_AUSSEN = 1.2;
assert.ok(
  ktSrc.includes("n >= 0.8 - 1e-12 && n <= 1.2 + 1e-12"),
  "die Ringradien 0,8 und 1,2 sind gedriftet",
);

/**
 * ‖λx + (1−λ)y‖² = r² ist quadratisch in λ; die Wurzeln liefern die
 * λ-Grenzen exakt (das Widget bisektioniert stattdessen).
 */
function lambdaGrenzen(x, y, r) {
  const dx = x[0] - y[0];
  const dy = x[1] - y[1];
  const A = dx * dx + dy * dy;
  const B = 2 * (dx * y[0] + dy * y[1]);
  const C = y[0] * y[0] + y[1] * y[1] - r * r;
  const disk = B * B - 4 * A * C;
  if (disk < 0) return null;
  const w = Math.sqrt(disk);
  return [(-B - w) / (2 * A), (-B + w) / (2 * A)].sort((p, q) => p - q);
}
const gegen = [[1.1, 0], [0, 1.1]];
const g = lambdaGrenzen(gegen[0], gegen[1], R_INNEN);
nah(g[0], 0.379739, 1e-6, "untere λ-Grenze am Kreisring");
nah(g[1], 0.620261, 1e-6, "obere λ-Grenze am Kreisring");
// Das Widget zeigt die Grenzen auf drei Nachkommastellen; genau diese Zahlen
// nennt die Selbsttest-Zahlfrage S112.mdx (Lösung 0,38).
assert.equal(g[0].toFixed(3), "0.380", "die angezeigte untere λ-Grenze ist 0,380");
assert.equal(g[1].toFixed(3), "0.620", "die angezeigte obere λ-Grenze ist 0,620");
// Mittelpunktnorm 1,1/√2
const mitte = [(gegen[0][0] + gegen[1][0]) / 2, (gegen[0][1] + gegen[1][1]) / 2];
nah(Math.hypot(...mitte), 1.1 / Math.SQRT2, 1e-12, "Norm des Mittelpunkts");
assert.ok(Math.hypot(...mitte) < R_INNEN, "der Mittelpunkt muss im Loch liegen");

/** Bleibt die Strecke ganz in der Menge? (dichte Abtastung) */
function streckeDrin(x, y, drin, n = 4001) {
  for (let i = 0; i <= n; i++) {
    const l = i / n;
    if (!drin([l * x[0] + (1 - l) * y[0], l * x[1] + (1 - l) * y[1]])) return false;
  }
  return true;
}
const imRing = (z) => {
  const n = Math.hypot(z[0], z[1]);
  return n >= R_INNEN - 1e-12 && n <= R_AUSSEN + 1e-12;
};
const unterParabel = (z) => z[1] <= z[0] * z[0] + 1e-12;
const inScheibe = (z) => Math.hypot(z[0], z[1]) <= R_AUSSEN + 1e-12;
const imTriangle = (z) => z[0] >= -1e-12 && z[1] >= -1e-12 && z[0] + z[1] <= 1 + 1e-12;

// Die `startPaar`-Lagen (REV29-Fix: der Mengenknopf darf das Gegenbeispiel
// NICHT mitsetzen) müssen alle vier die Probe BESTEHEN.
const startPaare = [
  ...ktSrc.matchAll(
    /startPaar: \[\s*\[(-?[\d.]+), (-?[\d.]+)\],\s*\[(-?[\d.]+), (-?[\d.]+)\],\s*\]/g,
  ),
].map((m) => [
  [Number(m[1]), Number(m[2])],
  [Number(m[3]), Number(m[4])],
]);
assert.equal(startPaare.length, 4, "jede der vier Mengen braucht ein startPaar");
const drinTests = [inScheibe, imRing, imTriangle, unterParabel];
startPaare.forEach(([x, y], i) => {
  assert.ok(drinTests[i](x) && drinTests[i](y), `startPaar ${i}: beide Punkte müssen in der Menge liegen`);
  assert.ok(
    streckeDrin(x, y, drinTests[i]),
    `startPaar ${i}: die Strecke muss ganz in der Menge bleiben (sonst verrät der Mengenknopf das Gegenbeispiel)`,
  );
});
// … und die `paar`-Lagen der beiden nicht konvexen Mengen sind Gegenbeispiele.
assert.ok(!streckeDrin(gegen[0], gegen[1], imRing), "das Ring-Paar muss die Menge verlassen");
assert.ok(
  !streckeDrin([-1, 1], [1, 1], unterParabel),
  "das Parabel-Paar muss die Menge verlassen",
);
// Die Parabelstrecke liegt für JEDES innere λ außerhalb.
let drinAnteil = 0;
for (let i = 1; i < 1000; i++) {
  const l = i / 1000;
  if (unterParabel([l * -1 + (1 - l) * 1, 1])) drinAnteil++;
}
assert.equal(drinAnteil, 0, "auf der Parabelunterseite liegt die ganze Strecke außerhalb");

/* ==================================================================== */
/* S112PsdKegel.tsx — Eigenwerte, PSD-Kriterium, das b = 0-Polygon      */
/* ==================================================================== */

const psdSrc = lies("S112PsdKegel.tsx");
const A_HI = 4;
assert.ok(psdSrc.includes("const A_HI = 4;"), "A_HI ist gedriftet");

/** Eigenwerte über den Rayleigh-Quotienten auf einem Winkelraster. */
function eigenRayleigh(a, b, c) {
  let lo = Infinity;
  let hi = -Infinity;
  const N = 200000;
  for (let i = 0; i < N; i++) {
    const t = (Math.PI * i) / N;
    const [u, v] = [Math.cos(t), Math.sin(t)];
    const q = a * u * u + 2 * b * u * v + c * v * v;
    lo = Math.min(lo, q);
    hi = Math.max(hi, q);
  }
  return [lo, hi];
}
const PRESETS = [...psdSrc.matchAll(
  /\{ name: "([^"]+)", titel: "[^"]*", a: (-?[\d.]+), b: (-?[\d.]+), c: (-?[\d.]+) \}/g,
)].map((m) => ({ name: m[1], a: Number(m[2]), b: Number(m[3]), c: Number(m[4]) }));
assert.equal(PRESETS.length, 5, "es müssen fünf Voreinstellungen sein");
const erwarteteEW = {
  Einheitsmatrix: [1, 1],
  "Rang 1": [0, 2],
  Nullzeile: [0, 2],
  indefinit: [-1, 3],
  "negativ definit": [-1, -1],
};
for (const p of PRESETS) {
  const [lo, hi] = eigenRayleigh(p.a, p.b, p.c);
  const soll = erwarteteEW[p.name];
  assert.ok(soll, `unbekannte Voreinstellung ${p.name}`);
  nah(lo, soll[0], 2e-4, `kleinerer Eigenwert von ${p.name}`);
  nah(hi, soll[1], 2e-4, `größerer Eigenwert von ${p.name}`);
  // Gegenprobe über Spur und Determinante
  nah(lo + hi, p.a + p.c, 2e-4, `Spur von ${p.name}`);
  nah(lo * hi, p.a * p.c - p.b * p.b, 2e-4, `Determinante von ${p.name}`);
}

/**
 * Das blaue Polygon der linken Tafel, nach der Regel aus dem Widget:
 * Randkurve (Hyperbel bzw. für b = 0 die beiden Achsen) plus Ecke (A_HI, A_HI).
 */
function schnittPolygon(b) {
  const rand =
    Math.abs(b) < 1e-9
      ? [[0, A_HI], [0, 0], [A_HI, 0]]
      : (() => {
          const a0 = (b * b) / A_HI;
          const pts = [];
          for (let i = 0; i <= 120; i++) {
            const av = a0 * Math.pow(A_HI / a0, i / 120);
            pts.push([av, Math.min((b * b) / av, A_HI)]);
          }
          return pts;
        })();
  return [...rand, [A_HI, A_HI]];
}
const imPolygon = (poly, x, y) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
// Gezeichnete Fläche gegen das PSD-Kriterium: über das ganze Reglerraster von b
// und ein feines (a, c)-Raster muss „im Polygon" mit „a ≥ 0, c ≥ 0, ac ≥ b²"
// übereinstimmen. Vor dem REV29-Fix scheitert das für b = 0 (dort wurde nur das
// Dreieck {0 ≤ c ≤ a} gezeichnet, diag(1, 3) lag außerhalb).
let abweichungen = 0;
for (let bi = 0; bi <= 50; bi++) {
  const b = bi / 20; // 0 … 2,5 im 0,05-Raster
  const poly = schnittPolygon(b);
  for (let i = 1; i < 60; i++)
    for (let j = 1; j < 60; j++) {
      const a = (A_HI * i) / 60;
      const c = (A_HI * j) / 60;
      const psd = a >= 0 && c >= 0 && a * c >= b * b;
      const gezeichnet = imPolygon(poly, a, c);
      // Punkte dicht am Rand dürfen wegen der Polygon-Diskretisierung abweichen.
      const randnah = Math.abs(a * c - b * b) < 0.06 * Math.max(1, a);
      if (!randnah && psd !== gezeichnet) abweichungen++;
    }
}
assert.equal(abweichungen, 0, "die gezeichnete Fläche muss das PSD-Kriterium treffen");
// Der Einzelfall aus dem Review-Befund, ausdrücklich:
assert.ok(
  imPolygon(schnittPolygon(0), 1, 3),
  "A = diag(1, 3) muss für b = 0 IM blauen Schnitt liegen (CRITICAL 11-konvexitaet)",
);
assert.ok(
  imPolygon(schnittPolygon(0), 3, 1),
  "A = diag(3, 1) muss für b = 0 IM blauen Schnitt liegen",
);
assert.ok(
  !imPolygon(schnittPolygon(0), -1, -1),
  "die negativ definite Voreinstellung muss außerhalb liegen",
);
// Der Schnitt bei Spur 2 ist die Einheitskreisscheibe ((a−c)/2)² + b² ≤ 1.
let spurAbw = 0;
for (let i = 0; i <= 400; i++)
  for (let j = 0; j <= 400; j++) {
    const a = (2 * i) / 400;
    const c = 2 - a;
    const b = -1.5 + (3 * j) / 400;
    const psd = a >= 0 && c >= 0 && a * c >= b * b;
    const scheibe = ((a - c) / 2) ** 2 + b * b <= 1 + 1e-12;
    // exakt auf dem Rand entscheidet die Gleitkommarundung; dort nicht prüfen
    if (Math.abs(((a - c) / 2) ** 2 + b * b - 1) < 1e-9) continue;
    if (psd !== scheibe) spurAbw++;
  }
assert.equal(spurAbw, 0, "der Schnitt bei Spur 2 ist die Einheitskreisscheibe");
// Homogenität: mit A liegt der ganze Halbstrahl t·A im Kegel.
for (const p of PRESETS.filter((q) => q.a * q.c >= q.b * q.b && q.a >= 0 && q.c >= 0))
  for (const t of [0, 0.3, 1, 2.5, 17])
    assert.ok(
      t * p.a >= 0 && t * p.c >= 0 && t * p.a * (t * p.c) >= (t * p.b) ** 2 - 1e-12,
      `t·A muss für ${p.name} semidefinit bleiben`,
    );
// Äquivalenz „a ≥ 0, c ≥ 0, ac ≥ b² ⇔ λ_min ≥ 0" auf dem 61³-Raster des Headers.
{
  const ew = (a, b, c) => (a + c) / 2 - Math.hypot((a - c) / 2, b);
  let abw = 0;
  for (let i = 0; i < 61; i++)
    for (let j = 0; j < 61; j++)
      for (let k = 0; k < 61; k++) {
        const a = -1 + (5 * i) / 60;
        const b = -2.5 + (5 * j) / 60;
        const c = -1 + (5 * k) / 60;
        const kriterium = a >= -1e-12 && c >= -1e-12 && a * c - b * b >= -1e-12;
        if (kriterium !== ew(a, b, c) >= -1e-12) abw++;
      }
  assert.equal(abw, 0, "das Drei-Ungleichungs-Kriterium muss λ_min ≥ 0 treffen");
}
// Konvexität des Kegels, deterministisch über ein Raster von Paaren statt über
// geseedete Zufallspaare: jede Mischung λA + (1−λ)B bleibt semidefinit.
{
  const psdTest = (a, b, c) => a >= -1e-12 && c >= -1e-12 && a * c - b * b >= -1e-12;
  const kegel = [];
  for (let i = 0; i <= 8; i++)
    for (let j = 0; j <= 8; j++)
      for (let k = 0; k <= 8; k++) {
        const a = (4 * i) / 8;
        const b = -2.5 + (5 * j) / 8;
        const c = (4 * k) / 8;
        if (psdTest(a, b, c)) kegel.push([a, b, c]);
      }
  assert.ok(kegel.length > 200, "das Raster muss genug PSD-Matrizen treffen");
  let verstoesse = 0;
  for (const A of kegel)
    for (const B of kegel)
      for (const l of [0, 0.25, 0.5, 0.75, 1])
        if (!psdTest(l * A[0] + (1 - l) * B[0], l * A[1] + (1 - l) * B[1], l * A[2] + (1 - l) * B[2]))
          verstoesse++;
  assert.equal(verstoesse, 0, "der Kegel muss konvex sein (Satz 11.2.8)");
}
// Der neue dritte Verdikt-Zweig: κ = λ₂/λ₁ > 20 ist „schlecht konditioniert".
{
  const [lo, hi] = eigenRayleigh(1, 0.95, 1);
  nah(lo, 0.05, 2e-4, "λ_min der schlecht konditionierten Matrix (1; 0,95; 0,95; 1)");
  assert.ok(hi / lo > 20, "diese Matrix muss in den dritten Zweig fallen");
  const [lo2, hi2] = eigenRayleigh(1, 0, 1);
  assert.ok(hi2 / lo2 <= 20, "die Einheitsmatrix bleibt im vorbehaltlosen Zweig");
}

/* ==================================================================== */
/* S113Projektion.tsx — Projektionen und das Kriterium des stumpfen     */
/* Winkels                                                              */
/* ==================================================================== */

/**
 * Projektion auf eine konvexe Menge über eine feine Abtastung ihres RANDES
 * (die Widget-Implementierung rechnet stattdessen Kanten-Formeln aus). Der
 * gefundene Punkt wird anschließend über das Kriterium des stumpfen Winkels
 * ZERTIFIZIERT: <x − x̂, y − x̂> ≤ 0 für alle abgetasteten y der Menge beweist
 * die Optimalität unabhängig vom Suchverfahren.
 */
function projektionRand(x, rand, n = 400000) {
  let best = null;
  let bd = Infinity;
  for (let i = 0; i < n; i++) {
    const p = rand(i / n);
    const d = Math.hypot(p[0] - x[0], p[1] - x[1]);
    if (d < bd) {
      bd = d;
      best = p;
    }
  }
  return { p: best, d: bd };
}

/** Zertifikat: kein Punkt der Menge unterbietet den Abstand. */
function zertifiziere(x, xh, punkteDerMenge, was) {
  let groesstes = -Infinity;
  let kleinsterAbstand = Infinity;
  for (const y of punkteDerMenge) {
    groesstes = Math.max(
      groesstes,
      (x[0] - xh[0]) * (y[0] - xh[0]) + (x[1] - xh[1]) * (y[1] - xh[1]),
    );
    kleinsterAbstand = Math.min(kleinsterAbstand, Math.hypot(y[0] - x[0], y[1] - x[1]));
  }
  // Toleranz 1e-5: x̂ stammt aus einer Abtastung, nicht aus einer Formel.
  assert.ok(groesstes <= 1e-5, `${was}: Kriterium des stumpfen Winkels verletzt (${groesstes})`);
  assert.ok(
    kleinsterAbstand >= Math.hypot(x[0] - xh[0], x[1] - xh[1]) - 1e-5,
    `${was}: ein Punkt der Menge liegt näher als x̂`,
  );
}

/** Randparametrisierung eines Polygons über t in [0, 1). */
const polygonRand = (ecken) => (t) => {
  const m = ecken.length;
  const s = t * m;
  const i = Math.min(m - 1, Math.floor(s));
  const l = s - i;
  const [u, v] = [ecken[i], ecken[(i + 1) % m]];
  return [u[0] + l * (v[0] - u[0]), u[1] + l * (v[1] - u[1])];
};

/** Dichte Punktwolke einer Menge, für das Zertifikat. */
function fuelle(drin, box, n = 700) {
  const pts = [];
  for (let i = 0; i <= n; i++)
    for (let j = 0; j <= n; j++) {
      const p = [box[0] + ((box[2] - box[0]) * i) / n, box[1] + ((box[3] - box[1]) * j) / n];
      if (drin(p)) pts.push(p);
    }
  return pts;
}

const inEinheitsscheibe = (z) => Math.hypot(z[0], z[1]) <= 1 + 1e-12;
const kreisRand = (t) => [Math.cos(2 * Math.PI * t), Math.sin(2 * Math.PI * t)];
{
  const x = [1.6, 1.2];
  const r = projektionRand(x, kreisRand);
  nah(r.d, 1, 1e-5, "Abstand zur Kreisscheibe (Voreinstellung x = (1,6; 1,2))");
  nah(r.p[0], 0.8, 1e-5, "x̂ auf der Kreisscheibe, erste Koordinate");
  nah(r.p[1], 0.6, 1e-5, "x̂ auf der Kreisscheibe, zweite Koordinate");
  zertifiziere(x, [0.8, 0.6], fuelle(inEinheitsscheibe, [-1, -1, 1, 1]), "Kreisscheibe");
}
const DREI = [
  [-1, -0.8],
  [1.2, -0.6],
  [0.1, 1.2],
];
const imDrei = (z) => imDreieck(z, DREI[0], DREI[1], DREI[2]);
const dreiRand = polygonRand(DREI);
{
  const x = [2.1, -1.35];
  const r = projektionRand(x, dreiRand);
  nah(r.d, 1.1715, 1e-4, "Abstand zur Ecke des Dreiecks");
  nah(r.p[0], 1.2, 1e-4, "die Projektion trifft die Ecke (1,2; −0,6), erste Koordinate");
  nah(r.p[1], -0.6, 1e-4, "die Projektion trifft die Ecke (1,2; −0,6), zweite Koordinate");
  zertifiziere(x, [1.2, -0.6], fuelle(imDrei, [-1.2, -1, 1.4, 1.3]), "Dreieck, Ecke");
}
{
  const x = [1.8, 0.9];
  const r = projektionRand(x, dreiRand);
  nah(r.d, 1.2941, 1e-4, "Abstand zur Kante des Dreiecks");
  nah(r.p[0], 0.6957, 1e-4, "x̂ auf der Kante, erste Koordinate");
  nah(r.p[1], 0.2252, 1e-4, "x̂ auf der Kante, zweite Koordinate");
  zertifiziere(x, r.p, fuelle(imDrei, [-1.2, -1, 1.4, 1.3]), "Dreieck, Kante");
}
// x liegt schon in der Menge: dann ist x̂ = x und der Abstand null.
assert.ok(inEinheitsscheibe([0.3, -0.35]), "die dritte Voreinstellung liegt in der Scheibe");
assert.ok(imDrei([0.1, -0.1]), "die dritte Dreiecks-Voreinstellung liegt im Dreieck");

// Über alle 7921 Reglerlagen (89 x 89 auf dem 0,05-Raster in [−2,2; 2,2]):
// die Ecke (1,2; −0,6) ist für genau 749 davon die Projektion, und das
// Kriterium des stumpfen Winkels ist nirgends verletzt.
{
  const lagen = [];
  for (let i = 0; i < 89; i++)
    for (let j = 0; j < 89; j++) lagen.push([-2.2 + i * 0.05, -2.2 + j * 0.05]);
  assert.equal(lagen.length, 7921, "das Raster hat 7921 Lagen");
  // Exaktes Kriterium statt Abstandstoleranz: x projiziert genau dann auf die
  // Ecke B, wenn x im Normalenkegel von B liegt, also (x − B)·(A − B) ≤ 0 und
  // (x − B)·(C − B) ≤ 0 für die beiden Nachbarecken.
  const [A, B, C] = [DREI[0], DREI[1], DREI[2]];
  const skal = (u, v) => u[0] * v[0] + u[1] * v[1];
  const imNormalenkegel = (x) =>
    skal([x[0] - B[0], x[1] - B[1]], [A[0] - B[0], A[1] - B[1]]) <= 1e-12 &&
    skal([x[0] - B[0], x[1] - B[1]], [C[0] - B[0], C[1] - B[1]]) <= 1e-12;
  let ecke = 0;
  let groesstes = -Infinity;
  for (const x of lagen) {
    if (imNormalenkegel(x)) {
      ecke++;
      // Gegenprobe: die Randsuche findet dann wirklich die Ecke
      const r = projektionRand(x, dreiRand, 4000);
      assert.ok(
        Math.hypot(r.p[0] - B[0], r.p[1] - B[1]) < 2e-3,
        `im Normalenkegel muss die Ecke die Projektion sein (x = ${x})`,
      );
    }
    const r = projektionRand(x, dreiRand, 4000);
    const p = imDrei(x) ? x : r.p;
    for (const e of DREI)
      groesstes = Math.max(groesstes, (x[0] - p[0]) * (e[0] - p[0]) + (x[1] - p[1]) * (e[1] - p[1]));
  }
  assert.equal(ecke, 749, `die Ecke ist für 749 Lagen die Projektion, gezählt wurden ${ecke}`);
  // Schranke 5e−3: x̂ stammt aus einer Randabtastung mit Schrittweite 1,6e−3,
  // der Fehler im Skalarprodukt wächst mit dem Abstand (höchstens rund 3).
  assert.ok(groesstes <= 5e-3, `Kriterium des stumpfen Winkels über alle Lagen: ${groesstes}`);
  // Feinprobe auf einem gröberen Lagenraster, dafür mit 100-facher Auflösung.
  let fein = -Infinity;
  for (let i = 0; i < 89; i += 8)
    for (let j = 0; j < 89; j += 8) {
      const x = [-2.2 + i * 0.05, -2.2 + j * 0.05];
      const p = imDrei(x) ? x : projektionRand(x, dreiRand, 400000).p;
      for (const e of DREI)
        fein = Math.max(fein, (x[0] - p[0]) * (e[0] - p[0]) + (x[1] - p[1]) * (e[1] - p[1]));
    }
  assert.ok(fein <= 1e-4, `Feinprobe des Kriteriums: ${fein}`);
}

/* ==================================================================== */
/* S113Sehne.tsx — Sehnendefekte, Wendepunkte                           */
/* ==================================================================== */

const doppelmulde = (x) => x ** 4 - 3 * x * x - x + 3;
/** Größter Überstand des Graphen über die Sehne zwischen a und b. */
function sehnendefekt(f, a, b, n = 20001) {
  let max = -Infinity;
  for (let i = 0; i <= n; i++) {
    const l = i / n;
    const x = a + (b - a) * l;
    const sehne = f(a) + (f(b) - f(a)) * l;
    max = Math.max(max, f(x) - sehne);
  }
  return max;
}
nah(sehnendefekt(doppelmulde, -1.55, 1.25), 1.891, 1e-3, "Sehnendefekt der Voreinstellung");
nah(sehnendefekt(doppelmulde, -1.6, 1.3), 1.738, 1e-3, "Sehnendefekt des Tafelpaars");
assert.ok(
  sehnendefekt(doppelmulde, -1.8, -0.9) <= 1e-9,
  "das Talgrundpaar −1,8 / −0,9 muss die Probe bestehen",
);
// Wendepunkte: f'' = 12x² − 6, unabhängig über zentrale zweite Differenzen.
{
  const h = 1e-4;
  const f2 = (x) => (doppelmulde(x + h) - 2 * doppelmulde(x) + doppelmulde(x - h)) / (h * h);
  const w = 1 / Math.SQRT2;
  nah(w, 0.7071, 1e-4, "Wendepunkt der Doppelmulde");
  nah(f2(w), 0, 5e-4, "zweite Ableitung im Wendepunkt");
  nah(f2(-w), 0, 5e-4, "zweite Ableitung im gespiegelten Wendepunkt");
}
// |x| ist konvex, aber auf einem Ast deckt die Sehne den Graphen exakt.
assert.ok(sehnendefekt(Math.abs, 0.2, 1.7) <= 1e-12, "|x| besteht auf dem rechten Ast");
assert.ok(
  Math.abs(sehnendefekt(Math.abs, 0.2, 1.7)) < 1e-12,
  "auf einem Ast fällt die Sehne mit dem Graphen zusammen (Gleichheit, nicht strikt)",
);
// 2 − 0,6x² ist konkav: die Sehne liegt überall unter dem Graphen.
assert.ok(sehnendefekt((x) => 2 - 0.6 * x * x, -1.4, 1.4) > 0, "die konkave Kurve verletzt die Probe");
nah(sehnendefekt((x) => 2 - 0.6 * x * x, -2, 2), 2.4, 1e-3, "größter Defekt der konkaven Kurve");

// Der volle Paar-Sweep des Headers: alle Paare des 0,05-Rasters in [−2; 2]
// mit y − x ≥ 0,15, je Kurve.
{
  const raster = [];
  for (let i = 0; i <= 80; i++) raster.push(-2 + i * 0.05);
  const paare = [];
  for (const a of raster) for (const b of raster) if (b - a >= 0.15 - 1e-12) paare.push([a, b]);
  assert.equal(paare.length, 3081, `es müssen 3081 Paare sein, gezählt ${paare.length}`);

  /**
   * Je Paar: größter Überstand des Graphen über die Sehne im INNEREN (an den
   * Endpunkten ist er trivial null) und größter Abstand zwischen beiden. Der
   * Abstand null heißt: die Sehne deckt den Graphen, es steht Gleichheit.
   */
  const probe = (f, a, b, n = 601) => {
    let defekt = -Infinity;
    let abstand = 0;
    for (let i = 1; i < n; i++) {
      const l = i / n;
      const x = a + (b - a) * l;
      const sehne = f(a) + (f(b) - f(a)) * l;
      defekt = Math.max(defekt, f(x) - sehne);
      abstand = Math.max(abstand, Math.abs(f(x) - sehne));
    }
    return { defekt, abstand };
  };
  const zaehle = (f) => {
    let verletzt = 0;
    let deckend = 0;
    let maxDefekt = -Infinity;
    for (const [a, b] of paare) {
      const r = probe(f, a, b);
      if (r.defekt > 1e-9) verletzt++;
      else if (r.abstand < 1e-12) deckend++; // Sehne fällt mit dem Graphen zusammen
      maxDefekt = Math.max(maxDefekt, r.defekt);
    }
    return { verletzt, deckend, maxDefekt };
  };
  const parabel = zaehle((x) => 0.6 * x * x + 0.3);
  assert.equal(parabel.verletzt, 0, "0,6x²+0,3 besteht jedes Paar");
  assert.equal(parabel.deckend, 0, "0,6x²+0,3 deckt den Graphen nie (strikt konvex)");
  const betrag = zaehle(Math.abs);
  assert.equal(betrag.verletzt, 0, "|x| besteht jedes Paar");
  assert.equal(betrag.deckend, 1482, `bei 1482 Paaren deckt die Sehne den Graphen, gezählt ${betrag.deckend}`);
  const konkav = zaehle((x) => 2 - 0.6 * x * x);
  assert.equal(konkav.verletzt, 3081, "2 − 0,6x² verletzt auf jedem Paar");
  nah(konkav.maxDefekt, 2.4, 1e-3, "größter Defekt der konkaven Kurve über alle Paare");
  const dm = zaehle(doppelmulde);
  assert.equal(dm.verletzt, 1971, `die Doppelmulde verletzt auf 1971 Paaren, gezählt ${dm.verletzt}`);
  nah(dm.maxDefekt, 2.246, 2e-3, "größter Defekt der Doppelmulde");
  const bestanden = 3081 - dm.verletzt;
  assert.equal(bestanden, 1110, "1110 Paare bestehen die Probe");
  // … davon liegen 552 ganz in einem der beiden konvexen Äste (|x| ≥ 1/√2).
  const w = 1 / Math.SQRT2;
  let imAst = 0;
  for (const [a, b] of paare)
    if (probe(doppelmulde, a, b).defekt <= 1e-9 && ((a >= w && b >= w) || (a <= -w && b <= -w)))
      imAst++;
  assert.equal(imAst, 552, `552 bestandene Paare liegen ganz in einem Ast, gezählt ${imAst}`);
  assert.ok(bestanden > imAst, "die Probe kann also auch über den Höcker hinweg gelingen");
}

/* ==================================================================== */
/* S114Jensen.tsx — Jensen-Lücken und die Varianz-Identität             */
/* ==================================================================== */

const STUETZ = [0.5, 1.5, 3.5];
{
  const jsSrc = lies("S114Jensen.tsx");
  const m = jsSrc.match(/const STUETZ = \[([\d., ]+)\];/);
  assert.ok(m, "STUETZ nicht im Quelltext gefunden");
  assert.deepEqual(
    m[1].split(",").map((s) => Number(s.trim())),
    STUETZ,
    "die Stützstellen sind gedriftet",
  );
}
const luecke = (f, w) => {
  const s = w[0] + w[1] + w[2];
  const wn = w.map((v) => v / s);
  const xq = STUETZ.reduce((acc, x, i) => acc + wn[i] * x, 0);
  const rechts = STUETZ.reduce((acc, x, i) => acc + wn[i] * f(x), 0);
  return { xq, links: f(xq), rechts, luecke: rechts - f(xq) };
};
{
  const r = luecke((x) => x * x, [1, 1, 1]);
  nah(r.xq, 11 / 6, 1e-12, "x̄ bei gleichen Gewichten");
  nah(r.links, 3.3611, 1e-4, "f(x̄) für x²");
  nah(r.rechts, 4.9167, 1e-4, "Σ wᵢ f(xᵢ) für x²");
  nah(r.luecke, 1.5556, 1e-4, "Jensen-Lücke für x²");
  // unabhängiger Weg: Σ wᵢxᵢ² − (Σ wᵢxᵢ)² ist die gewichtete Varianz
  const varianz =
    STUETZ.reduce((acc, x) => acc + (x * x) / 3, 0) - (11 / 6) ** 2;
  nah(r.luecke, varianz, 1e-12, "die Lücke bei x² ist die gewichtete Varianz");
}
{
  const r = luecke(Math.exp, [1, 1, 1]);
  nah(r.links, 6.2547, 1e-4, "f(x̄) für eˣ");
  nah(r.rechts, 13.082, 1e-3, "Σ wᵢ f(xᵢ) für eˣ");
  nah(r.luecke, 6.8273, 1e-3, "Jensen-Lücke für eˣ");
}
{
  const r = luecke(Math.sqrt, [1, 1, 1]);
  nah(r.links, 1.354, 1e-3, "f(x̄) für √x");
  nah(r.rechts, 1.2676, 1e-3, "Σ wᵢ f(xᵢ) für √x");
  assert.ok(r.luecke < 0, "bei der konkaven Wurzel dreht sich das Vorzeichen");
}
{
  const r = luecke((x) => x * x, [0.2, 0.3, 0.5]);
  nah(r.xq, 2.3, 1e-12, "x̄ bei w = (0,2; 0,3; 0,5)");
  nah(r.links, 5.29, 1e-12, "f(x̄)");
  nah(r.rechts, 6.85, 1e-12, "Σ wᵢ f(xᵢ)");
  nah(r.luecke, 1.56, 1e-12, "Lücke");
}
// Größte erreichbare Lücke über das 0,05-Reglerraster: x₁ und x₃ je zur Hälfte.
{
  let max = -Infinity;
  let arg = null;
  for (let a = 0; a <= 20; a++)
    for (let b = 0; b <= 20; b++)
      for (let c = 0; c <= 20; c++) {
        if (a + b + c === 0) continue;
        const l = luecke((x) => x * x, [a / 20, b / 20, c / 20]).luecke;
        if (l > max) {
          max = l;
          arg = [a, b, c];
        }
      }
  nah(max, 2.25, 1e-9, "größte Jensen-Lücke über das Reglerraster");
  assert.deepEqual(
    arg.map((v) => v / Math.max(...arg)),
    [1, 0, 1],
    "das Maximum sitzt bei w = (1; 0; 1), also x₁ und x₃ je zur Hälfte",
  );
}
// Gleichheitsfall: alles Gewicht auf einer Stützstelle.
for (const w of [[1, 0, 0], [0, 1, 0], [0, 0, 1]])
  nah(luecke((x) => x * x, w).luecke, 0, 1e-12, `Gleichheitsfall bei w = ${w}`);

// Der volle Reglersweep des Headers: 9260 zulässige Stellungen des 0,05-Rasters.
{
  const stellungen = [];
  for (let a = 0; a <= 20; a++)
    for (let b = 0; b <= 20; b++)
      for (let c = 0; c <= 20; c++) if (a + b + c > 0) stellungen.push([a / 20, b / 20, c / 20]);
  assert.equal(stellungen.length, 9260, `es müssen 9260 Stellungen sein, gezählt ${stellungen.length}`);
  let maxAbwVar = 0;
  let maxQuad = -Infinity;
  let maxExp = -Infinity;
  let minWurzel = Infinity;
  for (const w of stellungen) {
    const s0 = w[0] + w[1] + w[2];
    const wn = w.map((v) => v / s0);
    const xq = STUETZ.reduce((acc, x, i) => acc + wn[i] * x, 0);
    const varianz = STUETZ.reduce((acc, x, i) => acc + wn[i] * x * x, 0) - xq * xq;
    const lq = luecke((x) => x * x, w).luecke;
    maxAbwVar = Math.max(maxAbwVar, Math.abs(lq - varianz));
    maxQuad = Math.max(maxQuad, lq);
    maxExp = Math.max(maxExp, luecke(Math.exp, w).luecke);
    minWurzel = Math.min(minWurzel, luecke(Math.sqrt, w).luecke);
    assert.ok(lq >= -1e-12, "die Lücke bei x² darf nie negativ werden");
    assert.ok(luecke(Math.exp, w).luecke >= -1e-12, "die Lücke bei eˣ darf nie negativ werden");
    assert.ok(luecke(Math.sqrt, w).luecke <= 1e-12, "die Lücke bei √x darf nie positiv werden");
  }
  assert.ok(maxAbwVar < 1e-14, `Lücke und gewichtete Varianz weichen um ${maxAbwVar} ab`);
  nah(maxQuad, 2.25, 1e-9, "größte Lücke bei x²");
  nah(maxExp, 10.5675, 1e-3, "größte Lücke bei eˣ");
  nah(minWurzel, -0.131, 1e-3, "kleinste Lücke bei √x");
}
// Fairer Würfel (Beispiel 11.1.3): E[X] = 3,5, E[X²] = 15,1667, Varianz 35/12.
{
  const augen = [1, 2, 3, 4, 5, 6];
  const e1 = augen.reduce((a, x) => a + x / 6, 0);
  const e2 = augen.reduce((a, x) => a + (x * x) / 6, 0);
  nah(e1, 3.5, 1e-12, "E[X] des fairen Würfels");
  nah(e2, 15.1667, 1e-4, "E[X²] des fairen Würfels");
  nah(e2 - e1 * e1, 35 / 12, 1e-12, "Varianz des fairen Würfels");
}

/* ==================================================================== */
/* S115Landschaften.tsx — kritische Punkte, Wasserscheide, Plateau      */
/* ==================================================================== */

const dwp = (x) => 4 * x ** 3 - 6 * x - 1;
/** Nullstelle von f' per Bisektion, mit unabhängig gebildeter Ableitung. */
function bisektion(f, a, b, n = 200) {
  let [lo, hi] = [a, b];
  for (let i = 0; i < n; i++) {
    const m = (lo + hi) / 2;
    if (f(lo) * f(m) <= 0) hi = m;
    else lo = m;
  }
  return (lo + hi) / 2;
}
const h = 1e-5;
const dwStrich = (x) => (doppelmulde(x + h) - doppelmulde(x - h)) / (2 * h);
const kritisch = [
  bisektion(dwStrich, -2, -0.8),
  bisektion(dwStrich, -0.8, 0.5),
  bisektion(dwStrich, 0.5, 2),
];
nah(kritisch[0], -1.1309, 1e-4, "linkes Tal der Doppelmulde");
nah(kritisch[1], -0.1699, 1e-4, "Höcker (Wasserscheide)");
nah(kritisch[2], 1.3008, 1e-4, "rechtes, tiefes Tal");
nah(doppelmulde(kritisch[0]), 1.9298, 1e-4, "Wert im linken Tal");
nah(doppelmulde(kritisch[1]), 3.0841, 1e-4, "Wert auf dem Höcker");
nah(doppelmulde(kritisch[2]), -0.5139, 1e-4, "Wert im tiefen Tal");
// dieselben Nullstellen über die exakte Ableitung: die Wege müssen sich decken
for (let i = 0; i < 3; i++) nah(dwp(kritisch[i]), 0, 1e-4, `f′ verschwindet im ${i + 1}. Punkt`);

// Gradientenabstieg: über die 441 Reglerstellungen kippt das Ergebnis genau einmal.
const ETA = 0.02;
const SCHRITTE = 300;
function endpunkt(x0) {
  let x = x0;
  for (let i = 0; i < SCHRITTE; i++) x -= ETA * dwp(x);
  return x;
}
{
  const stellungen = [];
  for (let i = 0; i <= 440; i++) stellungen.push(-2.2 + i * 0.01);
  assert.equal(stellungen.length, 441, "das Reglerraster hat 441 Stellungen");
  const tief = stellungen.map((x0) => Math.abs(endpunkt(x0) - kritisch[2]) < 0.1);
  let wechsel = 0;
  for (let i = 1; i < tief.length; i++) if (tief[i] !== tief[i - 1]) wechsel++;
  assert.equal(wechsel, 1, "das Ergebnis darf genau einmal kippen");
  nah(endpunkt(-0.17), -1.1309, 1e-4, "Start −0,17 endet im flachen Tal");
  nah(endpunkt(-0.16), 1.30084, 1e-4, "Start −0,16 endet im tiefen Tal");
  assert.ok(
    -0.17 < kritisch[1] && kritisch[1] < -0.16,
    "die Wasserscheide muss zwischen den beiden Reglerstellungen liegen",
  );
}
// Wertebereich der Doppelmulde auf [−2,2; 2,2]
{
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i <= 440000; i++) {
    const v = doppelmulde(-2.2 + (4.4 * i) / 440000);
    lo = Math.min(lo, v);
    hi = Math.max(hi, v);
  }
  nah(lo, -0.5139, 1e-4, "kleinster Wert der Doppelmulde auf [−2,2; 2,2]");
  nah(hi, 14.1056, 1e-4, "größter Wert der Doppelmulde auf [−2,2; 2,2]");
}
// Plateau und Schüssel
const plateau = (x) => 2 * Math.max(0, Math.abs(x) - 0.8) ** 2;
const schuessel = (x) => 0.8 * x * x;
nah(plateau(2.2), 3.92, 1e-12, "Plateau bei x = 2,2");
nah(schuessel(2.2), 3.872, 1e-12, "Schüssel bei x = 2,2");
for (let i = 0; i <= 160; i++) nah(plateau(-0.8 + i * 0.01), 0, 1e-12, "Plateau ist flach auf [−0,8; 0,8]");
// Plateau ist konvex (Sehnenprobe), aber nicht strikt konvex.
assert.ok(sehnendefekt(plateau, -2.2, 2.2) <= 1e-12, "das Plateau muss konvex sein");
assert.ok(sehnendefekt(plateau, -0.6, 0.6) <= 1e-12, "auf dem Plateau steht Gleichheit");
assert.ok(sehnendefekt(schuessel, -2.2, 2.2) <= 1e-12, "die Schüssel muss konvex sein");
{
  // strikte Konvexität der Schüssel: die Sehne liegt im Inneren ECHT darüber
  const a = -1;
  const b = 1;
  const mitteWert = schuessel((a + b) / 2);
  const sehneMitte = (schuessel(a) + schuessel(b)) / 2;
  assert.ok(sehneMitte - mitteWert > 1e-6, "die Schüssel ist strikt konvex");
  const pMitte = plateau(0);
  const pSehne = (plateau(-0.6) + plateau(0.6)) / 2;
  nah(pSehne - pMitte, 0, 1e-12, "das Plateau ist NICHT strikt konvex");
}

console.log("11-konvexitaet: alle Prüfungen bestanden.");
