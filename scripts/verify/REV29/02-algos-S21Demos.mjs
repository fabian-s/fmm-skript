#!/usr/bin/env node
/**
 * REV29 — src/chapters/02-algos/widgets/S21Demos.tsx (AusloeschungWidget).
 *
 * Prüft den GESAMTEN erreichbaren Zustandsraum des Reglers (k = 0 … K_MAX) und
 * nicht nur die Headertabelle: genau dort saß der CRITICAL des Reviews
 * (zweistufige Varianz ab k = 16 kaputt, Header und Selbsttest behaupteten
 * „für jedes k exakt 22,5").
 *
 * Unabhängiger Rechenweg: der wahre Wert der Varianz wird exakt in BigInt-
 * Bruchrechnung bestimmt (kein Gleitkomma), die Gleitkommawerte des Widgets
 * werden dagegen gehalten. K_MAX und der Startwert werden aus der TSX-Quelle
 * gelesen, damit die Abdeckung nicht still auseinanderläuft.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/02-algos/widgets/S21Demos.tsx"), "utf8");

/* ---------------------------------------------------------------- Quelle */

const K_MAX = Number(/const K_MAX = (\d+);/.exec(src)?.[1]);
assert.ok(Number.isInteger(K_MAX) && K_MAX > 0, "K_MAX nicht aus S21Demos.tsx lesbar");
assert.equal(K_MAX, 20);

const START_K = Number(/const \[k, setK\] = useState\((\d+)\)/.exec(src)?.[1]);
assert.equal(START_K, 7, "Startwert k soll 7 sein (tote Anfangsfigur zeigt die Spannung)");

// Der Verdikt-Fallbaum muss den Zusammenbruch der zweistufigen Rechnung kennen.
assert.ok(
  /if \(zweistufig !== 22\.5\)/.test(src),
  "Verdikt-Zweig für die zusammengebrochene zweistufige Rechnung fehlt",
);

/* -------------------------------------------- exakter Referenzwert (BigInt) */

/** Varianz von {4,7,13,16} + c exakt: die Verschiebung c kürzt sich heraus. */
function varianzExakt() {
  const roh = [4n, 7n, 13n, 16n];
  const n = BigInt(roh.length);
  const summe = roh.reduce((a, b) => a + b, 0n); // 40
  // Zähler von (1/n) Σ (x_i − x̄)² mit x̄ = summe/n, alles über n² erweitert:
  const zaehler = roh.reduce((a, x) => a + (n * x - summe) ** 2n, 0n);
  const nenner = n ** 3n;
  return { zaehler, nenner };
}
const { zaehler, nenner } = varianzExakt();
// 22,5 als exakter Bruch: zaehler/nenner === 45/2
assert.equal(zaehler * 2n, nenner * 45n, "exakte Varianz ist nicht 22,5");
// Gegenprobe, dass die Rechnung überhaupt scheitern kann:
assert.notEqual(zaehler * 2n, nenner * 44n);

/* ------------------------------------------------- Gleitkomma wie im Widget */

const mittel = (a) => a.reduce((s, v) => s + v, 0) / a.length;

function zustand(k) {
  const c = 10 ** k;
  const daten = [4, 7, 13, 16].map((v) => v + c);
  const mw = mittel(daten);
  const zweistufig = mittel(daten.map((v) => (v - mw) ** 2));
  const mittelQuadrate = mittel(daten.map((v) => v * v));
  const formel = mittelQuadrate - mw * mw;
  const x = 10 ** k;
  const y = -(10 ** k);
  return { zweistufig, formel, links: x + y + 1, rechts: x + (y + 1) };
}

/** Erwartete Gleitkommawerte, aus dem Header von S21Demos.tsx übernommen. */
const ERWARTET_FORMEL = new Map([
  [8, 22], [9, -128], [10, 16384], [11, 0], [12, 0], [13, 17179869184],
  [14, 0], [15, 0], [16, 0], [18, 0], [19, 0], [20, 0],
]);
const ERWARTET_ZWEISTUFIG = new Map([[16, 20], [17, 128], [18, 0], [19, 0], [20, 0]]);

for (let k = 0; k <= K_MAX; k++) {
  const { zweistufig, formel, links, rechts } = zustand(k);

  // Verschiebungsformel: bis k = 7 exakt, danach kaputt.
  if (k <= 7) assert.equal(formel, 22.5, `Verschiebungsformel bei k=${k}`);
  else assert.notEqual(formel, 22.5, `Verschiebungsformel bei k=${k} unerwartet exakt`);
  if (ERWARTET_FORMEL.has(k)) assert.equal(formel, ERWARTET_FORMEL.get(k), `formel bei k=${k}`);

  // Zweistufige Rechnung: bis k = 15 exakt, ab k = 16 selbst kaputt (der CRITICAL).
  if (k <= 15) assert.equal(zweistufig, 22.5, `zweistufig bei k=${k}`);
  else assert.notEqual(zweistufig, 22.5, `zweistufig bei k=${k} unerwartet exakt`);
  if (ERWARTET_ZWEISTUFIG.has(k))
    assert.equal(zweistufig, ERWARTET_ZWEISTUFIG.get(k), `zweistufig bei k=${k}`);

  // Assoziativität: Bruch bei k = 16, nicht früher.
  assert.equal(links, 1, `linke Klammerung bei k=${k}`);
  assert.equal(rechts, k <= 15 ? 1 : 0, `rechte Klammerung bei k=${k}`);
}

// Die Selbsttestfrage in S21.mdx nennt 16 als ersten abweichenden Exponenten.
const mdx = readFileSync(join(repo, "src/chapters/02-algos/S21.mdx"), "utf8");
assert.ok(/loesung=16 toleranz=0/.test(mdx), "zahlfrage-Lösung 16 nicht mehr im MDX");
assert.ok(
  !/für jedes \$k\$ exakt \$22\{,\}5\$/.test(mdx),
  "widerlegte Behauptung 'für jedes k exakt 22,5' steht wieder im MDX",
);

/* ------------------------------------------------------ ULP an der Stelle */

const ulp = (v) => 2 ** (Math.floor(Math.log2(Math.abs(v))) - 52);
assert.equal(ulp(1e18), 128);
assert.equal(ulp(1e16), 2);
assert.equal(ulp(1e15), 0.125);
assert.equal(ulp(1e30), 2 ** 47);

console.log("REV29 02-algos-S21Demos: ok");
