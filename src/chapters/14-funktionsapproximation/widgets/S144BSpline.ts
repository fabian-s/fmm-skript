/**
 * Numerischer Kern der B-Spline-Widgets von §14.4.
 *
 * Der Rechenkern (Cox-de-Boor-Rekursion, ihre beiden Ableitungsformen und der
 * Gauss-Loeser mit Spaltenpivotierung) ist CODE aus
 * /workspace/interactive/interactive/heath-ch7/src/sections/S743.tsx
 * (bsp, bspD1, bspD2, solveLinear) bzw. S74.tsx, hierher gezogen, damit die
 * drei Widgets denselben Kern benutzen. Neu ist `knotenvektor`: die Folien
 * geben die erweiterte Knotenfolge fehlerhaft an (Bemerkung 14.4.9), hier
 * steht der korrekte offene Knotenvektor mit m + 2q + 1 Knoten.
 *
 * Alle Zahlen der Widgets entstehen zur Laufzeit aus diesen Funktionen;
 * fest verdrahtet sind nur Gitter und Daten.
 */

import { FMM_COLORS, fmtDe } from "../../../lib";

/** Farbcode Kapitel 14. */
export const BLAU = FMM_COLORS.blau; // Daten, Stuetzpunkte
export const GRUEN = FMM_COLORS.gruen; // Interpolant
export const ORANGE = FMM_COLORS.orange; // Basisfunktionen, Knoten
export const ROT = FMM_COLORS.rot; // Problemzonen
export const VIOLETT = FMM_COLORS.violett; // im Kapitel sonst unbelegt
export const NEUTRAL = FMM_COLORS.grau; // hell und dunkel lesbar

/** Deutsche Zahlformatierung; undefinierte Werte von unendlichen trennen. */
export const fmt = fmtDe;

/**
 * Offener Knotenvektor zum Gitter xi = (xi_0, ..., xi_m) und Grad q:
 * die Randknoten (q+1)-fach, die inneren einfach. Laenge m + 2q + 1,
 * daraus m + q Basisfunktionen vom Grad q.
 */
export function knotenvektor(xi: number[], q: number): number[] {
  const m = xi.length - 1;
  const tau: number[] = [];
  for (let i = 0; i <= q; i++) tau.push(xi[0]);
  for (let i = 1; i <= m - 1; i++) tau.push(xi[i]);
  for (let i = 0; i <= q; i++) tau.push(xi[m]);
  return tau;
}

/**
 * B_k^{(q)}(x) nach Cox-de-Boor; k ist 0-basiert (im Text 1-basiert).
 * Nenner null bedeutet mehrfacher Knoten, der Summand entfaellt dann.
 */
export function bspl(tau: number[], k: number, q: number, x: number): number {
  if (q === 0) return tau[k] <= x && x < tau[k + 1] ? 1 : 0;
  let links = 0;
  let rechts = 0;
  const d1 = tau[k + q] - tau[k];
  const d2 = tau[k + q + 1] - tau[k + 1];
  if (d1 > 0) links = ((x - tau[k]) / d1) * bspl(tau, k, q - 1, x);
  if (d2 > 0) rechts = ((tau[k + q + 1] - x) / d2) * bspl(tau, k + 1, q - 1, x);
  return links + rechts;
}

/** Erste Ableitung von B_k^{(q)}, gueltig fuer q >= 1. */
export function bsplD1(tau: number[], k: number, q: number, x: number): number {
  const d1 = tau[k + q] - tau[k];
  const d2 = tau[k + q + 1] - tau[k + 1];
  const a = d1 > 0 ? (q / d1) * bspl(tau, k, q - 1, x) : 0;
  const b = d2 > 0 ? (q / d2) * bspl(tau, k + 1, q - 1, x) : 0;
  return a - b;
}

/** Zweite Ableitung von B_k^{(q)}, gueltig fuer q >= 2. */
export function bsplD2(tau: number[], k: number, q: number, x: number): number {
  const d1 = tau[k + q] - tau[k];
  const d2 = tau[k + q + 1] - tau[k + 1];
  const a = d1 > 0 ? (q / d1) * bsplD1(tau, k, q - 1, x) : 0;
  const b = d2 > 0 ? (q / d2) * bsplD1(tau, k + 1, q - 1, x) : 0;
  return a - b;
}

/**
 * Auswertung knapp innerhalb des rechten Randes: die Indikatorfunktion des
 * Grades 0 ist rechts halboffen, am Punkt xi_m waeren sonst alle B_k null.
 */
export function bsplRand(
  tau: number[],
  k: number,
  q: number,
  x: number,
  rechterRand: number,
): number {
  return bspl(tau, k, q, Math.min(x, rechterRand - 1e-9));
}

/** Gauss-Elimination mit Spaltenpivotierung; null bei singulaerer Matrix. */
export function loeseLGS(Ain: number[][], bin: number[]): number[] | null {
  const n = bin.length;
  const A = Ain.map((r) => r.slice());
  const b = bin.slice();
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
    }
    if (Math.abs(A[p][k]) < 1e-13) return null;
    [A[k], A[p]] = [A[p], A[k]];
    [b[k], b[p]] = [b[p], b[k]];
    for (let i = k + 1; i < n; i++) {
      const f = A[i][k] / A[k][k];
      for (let j = k; j < n; j++) A[i][j] -= f * A[k][j];
      b[i] -= f * b[k];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = b[i];
    for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j];
    x[i] = s / A[i][i];
  }
  return x;
}
