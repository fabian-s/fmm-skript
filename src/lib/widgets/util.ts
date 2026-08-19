/**
 * Gemeinsame Hilfen für alle Widgets (Kapitel- und Konzeptschicht).
 *
 * - FMM_COLORS: die Okabe-Ito-basierte Kurspalette, identisch zu den
 *   Mathe-Makros \cbblue/\cbgreen/\cbred/\cborange/\cbpurp (src/fmm-macros.ts).
 *   Eine Farbe = eine mathematische Rolle; die Rollen legt jedes Kapitel im
 *   Widget-Header fest.
 * - fmtDe: deutsche Dezimalzahl mit echtem Minus, „–" für NaN, „∞" für ±∞.
 * - mulberry32 / useSeed: geseedeter Zufall (nie nacktes Math.random).
 * - niceTicks / sigmaMax / maxAbsCoord: Achsen- und Fensterhelfer
 *   (aus Axes.tsx hierher gezogen; Axes.tsx re-exportiert sie).
 */
import { useCallback, useState } from "react";

export const FMM_COLORS = {
  blau: "#0072B2",
  gruen: "#009E73",
  rot: "#D55E00",
  orange: "#E69F00",
  violett: "#9E57D5",
  grau: "#6b7280",
  hellgrau: "#cbd5e1",
} as const;

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
export function fmtDe(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

/** Ganzzahl mit deutschem Tausenderpunkt. */
export function fmtInt(v: number): string {
  if (!Number.isFinite(v)) return fmtDe(v, 0);
  return Math.round(v).toLocaleString("de-DE").replace(/^-/, "−");
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Deterministischer Zufallsgenerator (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standardnormalverteilte Zufallszahl (Box–Muller) aus einem mulberry32-Generator. */
export function randn(rng: () => number): number {
  const u = Math.max(rng(), 1e-12);
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Seed im State + „neue Stichprobe"-Funktion; der Default-Seed ist kuratiert. */
export function useSeed(initial = 1): { seed: number; neueStichprobe: () => void; setSeed: (s: number) => void } {
  const [seed, setSeed] = useState(initial);
  const neueStichprobe = useCallback(() => setSeed((s) => s + 1), []);
  return { seed, neueStichprobe, setSeed };
}

/** „Schöne" Tick-Positionen, die [a, b] überdecken. */
export function niceTicks(a: number, b: number, target = 5): number[] {
  if (!(b > a)) return [];
  const raw = (b - a) / target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = mag * (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10);
  const ticks: number[] = [];
  for (let t = Math.ceil(a / step) * step; t <= b + step * 1e-6; t += step) {
    ticks.push(Math.abs(t) < step * 1e-6 ? 0 : t);
  }
  return ticks;
}

/** Tick-Beschriftung im deutschen Format. */
export function fmtTick(t: number): string {
  const a = Math.abs(t);
  if (a >= 100 || Number.isInteger(t)) return fmtInt(t);
  const s = a >= 10 ? t.toFixed(0) : a >= 1 ? t.toFixed(1).replace(/\.0$/, "") : t.toFixed(2).replace(/0$/, "");
  return s.replace(".", ",").replace(/^-/, "−");
}

/** Größter Singulärwert einer 2x2-Matrix (wie weit der Einheitskreis gestreckt wird). */
export function sigmaMax(m: [[number, number], [number, number]]): number {
  const [[a, b], [c, d]] = m;
  const T = a * a + b * b + c * c + d * d;
  const det = a * d - b * c;
  return Math.sqrt((T + Math.sqrt(Math.max(0, T * T - 4 * det * det))) / 2);
}

/** Größte |Koordinate| über eine Liste von 2-Vektoren. */
export function maxAbsCoord(...vs: [number, number][]): number {
  let m = 0;
  for (const [x, y] of vs) m = Math.max(m, Math.abs(x), Math.abs(y));
  return m;
}
