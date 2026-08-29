#!/usr/bin/env node
/**
 * REV29 — S139Skalierung.tsx (SkalierungTensorGam), §13.9.
 *
 * Der Header verwies auf ein Skript s155.mjs, das es im Repo nicht gibt;
 * gedeckt war über R5 allein die Zeile 10^10 * 8 B = 80 GB. Hier stehen alle
 * Zeilen der Beispieltabelle, die neue Schätzfrage (K = 20, p = 8) und die
 * Zählformel des additiven Modells.
 *
 * UNABHÄNGIGER RECHENWEG: Das Widget rechnet K^p über Math.pow und formatiert
 * über eine Präfixtabelle. Hier läuft die Zählung über LOGARITHMEN
 * (p * log10(K)) und, wo es exakt sein muss, über BigInt-Potenzen; die
 * Speichergrößen werden per BigInt in Bytes gerechnet und erst am Ende
 * dezimal umgerechnet. Ein Überlauf oder ein Rundungsfehler in einem der
 * beiden Wege fällt damit auf.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const BYTE = 8n;
const nahe = (a, b, eps, was) => assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} != ${b} (eps ${eps})`);

/** Exakte Koeffizientenzahl K^p als BigInt. */
const koeffizienten = (K, p) => BigInt(K) ** BigInt(p);
/** Freie Parameter des zentrierten additiven Modells. */
const additiv = (K, p) => p * (K - 1) + 1;
/** Bytes -> GB (dezimale Präfixe, wie im Widget dokumentiert). */
const inGB = (bytes) => Number(bytes) / 1e9;

/* ---------- 1. Die Beispieltabelle in @beispiel:zehn-basisfunktionen-je-variable ---------- */
for (const [p, koeff, bytes] of [
  [1, 10n, 80n],
  [2, 100n, 800n],
  [3, 1000n, 8000n],
  [5, 100000n, 800000n],
  [10, 10000000000n, 80000000000n],
]) {
  assert.equal(koeffizienten(10, p), koeff, `K^p bei K=10, p=${p}`);
  assert.equal(koeffizienten(10, p) * BYTE, bytes, `Speicher bei K=10, p=${p}`);
  // Kreuzprobe: der Gleitkommaweg des Widgets (Math.pow) trifft die exakte
  // BigInt-Zahl noch ohne Rundungsverlust.
  assert.equal(Math.pow(10, p), Number(koeff), `Math.pow gegen BigInt bei p=${p}`);
}
nahe(inGB(koeffizienten(10, 10) * BYTE), 80, 1e-9, "80 GB bei K=10, p=10");
// Binär gerechnet sind das 74,5 GiB (steht so im Fließtext).
nahe(Number(koeffizienten(10, 10) * BYTE) / 2 ** 30, 74.506, 1e-3, "74,5 GiB");

/* ---------- 2. Die Schätzfrage: K = 20, p = 8 ---------- */
{
  const koeff = koeffizienten(20, 8);
  assert.equal(koeff, 25600000000n, "20^8");
  const gb = inGB(koeff * BYTE);
  nahe(gb, 204.8, 1e-9, "Speicher bei K=20, p=8");
  // Die Pointe der Frage: eine Variable weniger, dafür doppelt so fein
  // aufgelöst, kostet MEHR als die Tabellenzeile mit K = 10 und p = 10.
  assert.ok(koeff > koeffizienten(10, 10), "20^8 ist doch nicht größer als 10^10");
  nahe(gb / inGB(koeffizienten(10, 10) * BYTE), 2.56, 1e-9, "Verhältnis zur Tabellenzeile");
  // Die im Widget angezeigte Zahl rundet auf ganze GB (fmtSpeicher, >= 100).
  assert.equal(Math.round(gb), 205, "angezeigter GB-Wert");
  // Lösung und Toleranz der Schätzfrage werden aus der MDX-Quelle gelesen,
  // nicht behauptet: Der GB-Wert muss im Toleranzbereich liegen, die 80 GB
  // der Beispieltabelle aber ausserhalb — wer sie abschreibt, liegt daneben.
  const mdx = readFileSync(
    new URL("../../../src/chapters/13-funktionsapproximation/S139.mdx", import.meta.url),
    "utf8",
  );
  const frage = /frage="Schätzen wir den Speicherbedarf in GB[^"]*"\s*\n\s*loesung=\{([\d.]+)\}\s*\n\s*toleranz=\{([\d.]+)\}/.exec(mdx);
  assert.ok(frage, "Schätzfrage zum Speicherbedarf nicht in S139.mdx gefunden");
  const [loesung, toleranz] = [Number(frage[1]), Number(frage[2])];
  assert.ok(Math.abs(gb - loesung) <= toleranz, `Lösung ${loesung} passt nicht zu ${gb} GB`);
  assert.ok(
    Math.abs(inGB(koeffizienten(10, 10) * BYTE) - loesung) > toleranz,
    "die 80-GB-Tabellenzeile liegt im Toleranzbereich der Schätzfrage",
  );
}

/* ---------- 3. Additives Modell und Konvergenzrate ---------- */
{
  assert.equal(additiv(10, 10), 91, "freie Parameter additiv bei K=10, p=10");
  assert.equal(additiv(10, 10) * 8, 728, "Bytes additiv bei K=10, p=10");
  // Das additive Modell wächst linear in p, der Tensor exponentiell.
  for (let p = 2; p <= 10; p++) {
    assert.equal(additiv(10, p) - additiv(10, p - 1), 9, `additiv nicht linear bei p=${p}`);
    assert.equal(koeffizienten(10, p) / koeffizienten(10, p - 1), 10n, `Tensor nicht exponentiell bei p=${p}`);
  }
  // Rate 8/(8+p) und das Proxy-n, das das Widget daraus ableitet.
  for (const p of [1, 5, 8, 10]) {
    const rate = 8 / (8 + p);
    nahe(Math.pow(10, (8 + p) / 4), Math.pow(0.01, -1 / rate), 1e-6, `Proxy-n bei p=${p}`);
  }
  // Der Reglerbereich des Widgets: p = 1..10, K = 4..20 — die Verdikt-Klassen
  // (< 1 MB, < 1 GB, darüber) sind alle erreichbar.
  const klassen = new Set();
  for (let p = 1; p <= 10; p++) {
    for (let K = 4; K <= 20; K++) {
      const b = Number(koeffizienten(K, p) * BYTE);
      klassen.add(p === 1 || b < 1e6 ? "klein" : b < 1e9 ? "mittel" : "gross");
    }
  }
  assert.deepEqual([...klassen].sort(), ["gross", "klein", "mittel"], "nicht alle Verdikt-Klassen erreichbar");
}

console.log("S139Skalierung: Beispieltabelle, 204,8 GB bei K=20/p=8 und Zählformeln bestätigt.");
