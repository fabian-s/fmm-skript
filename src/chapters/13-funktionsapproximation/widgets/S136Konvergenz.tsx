import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, niceTicks, Slider, Verdikt } from "../../../lib";

/**
 * §13.6: Konvergenz des natuerlichen kubischen Spline-Interpolanten.
 *
 * Eigenbau (kein portierter Code). Der Spline wird hier in JS geloest:
 * Momentengleichungen M_i = s''(x_i) als tridiagonales System, Thomas-
 * Algorithmus, natuerliche Randbedingung M_0 = M_n = 0. Alle angezeigten
 * Fehlerwerte sind EIGENE Rechnungen dieses Widgets, keine Uebernahme der
 * R-Ausgaben der Folientabelle.
 *
 * Farbrollen nach dem Kapitel-15-Code: Knoten orange, Interpolant s gruen,
 * Fehler und Schranke rot; die wahre Funktion f traegt das im Kapitel freie
 * Violett (Rolle steht in der Widget-Einleitung).
 *
 * Verifiziert (node, verify-13-funktionsapproximation/s152.mjs, 2026-08-19), f(x) = sin(2 pi x) auf [0, 1],
 * C = 5/384, max|f^(4)| = (2 pi)^4 = 1558,5455:
 *   5 Knoten  h = 0,25     Schranke 0,0793     Fehler 0,020017
 *   9 Knoten  h = 0,125    Schranke 0,00495    Fehler 0,0010661   Faktor 18,78
 *  17 Knoten  h = 0,0625   Schranke 0,000310   Fehler 0,000063121 Faktor 16,89
 *  33 Knoten  h = 0,03125  Schranke 0,0000194  Fehler 0,0000038893 Faktor 16,23
 * Die Werte sind ab 4001 Abtastpunkten stabil; das Widget nimmt 8001.
 * R5-Nachprüfung: scripts/verify/R5/verify-r5-claims.mjs, 2026-08-20.
 */

const { gruen: GRUEN, orange: ORANGE, rot: ROT, violett: VIOLETT, grau: ACHSE, hellgrau: RAHMEN } = FMM_COLORS;

const KNOTENZAHLEN = [5, 9, 17, 33];
const C_SPLINE = 5 / 384;
const M4 = Math.pow(2 * Math.PI, 4);
const ABTASTUNG = 8001;

const f = (x: number) => Math.sin(2 * Math.PI * x);

interface Spline {
  xs: number[];
  ys: number[];
  hs: number[];
  M: number[];
}

/** Natuerlicher kubischer Spline durch (xs, ys): tridiagonales System fuer M_i = s''(x_i). */
function natuerlicherSpline(xs: number[], ys: number[]): Spline {
  const n = xs.length - 1;
  const hs: number[] = [];
  for (let i = 0; i < n; i++) hs.push(xs[i + 1] - xs[i]);
  const M = new Array<number>(n + 1).fill(0);
  if (n >= 2) {
    const m = n - 1;
    const unter: number[] = [];
    const diag: number[] = [];
    const ober: number[] = [];
    const rechts: number[] = [];
    for (let k = 0; k < m; k++) {
      const i = k + 1;
      unter.push(hs[i - 1]);
      diag.push(2 * (hs[i - 1] + hs[i]));
      ober.push(hs[i]);
      rechts.push(
        6 * ((ys[i + 1] - ys[i]) / hs[i] - (ys[i] - ys[i - 1]) / hs[i - 1]),
      );
    }
    // Thomas-Algorithmus (LU einer Tridiagonalmatrix ohne Pivotierung,
    // zulaessig wegen strikter Diagonaldominanz)
    const co = new Array<number>(m);
    const cr = new Array<number>(m);
    co[0] = ober[0] / diag[0];
    cr[0] = rechts[0] / diag[0];
    for (let k = 1; k < m; k++) {
      const nenner = diag[k] - unter[k] * co[k - 1];
      co[k] = ober[k] / nenner;
      cr[k] = (rechts[k] - unter[k] * cr[k - 1]) / nenner;
    }
    const loesung = new Array<number>(m);
    loesung[m - 1] = cr[m - 1];
    for (let k = m - 2; k >= 0; k--) loesung[k] = cr[k] - co[k] * loesung[k + 1];
    for (let k = 0; k < m; k++) M[k + 1] = loesung[k];
  }
  return { xs, ys, hs, M };
}

function auswerten(sp: Spline, x: number): number {
  const { xs, ys, hs, M } = sp;
  const n = xs.length - 1;
  let i = 0;
  if (x <= xs[0]) i = 0;
  else if (x >= xs[n]) i = n - 1;
  else {
    let lo = 0;
    let hi = n;
    while (hi - lo > 1) {
      const mitte = (lo + hi) >> 1;
      if (x < xs[mitte]) hi = mitte;
      else lo = mitte;
    }
    i = lo;
  }
  const h = hs[i];
  const A = xs[i + 1] - x;
  const B = x - xs[i];
  return (
    (M[i] * A * A * A) / (6 * h) +
    (M[i + 1] * B * B * B) / (6 * h) +
    (ys[i] / h - (M[i] * h) / 6) * A +
    (ys[i + 1] / h - (M[i + 1] * h) / 6) * B
  );
}

interface Zeile {
  knoten: number;
  h: number;
  schranke: number;
  fehler: number;
  /** Stelle des groessten Fehlers */
  argmax: number;
  sp: Spline;
}

function rechne(knoten: number): Zeile {
  const n = knoten - 1;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= n; i++) {
    const x = i / n;
    xs.push(x);
    ys.push(f(x));
  }
  const sp = natuerlicherSpline(xs, ys);
  let fehler = 0;
  let argmax = 0;
  for (let k = 0; k < ABTASTUNG; k++) {
    const x = k / (ABTASTUNG - 1);
    const e = Math.abs(f(x) - auswerten(sp, x));
    if (e > fehler) {
      fehler = e;
      argmax = x;
    }
  }
  const h = 1 / n;
  return { knoten, h, schranke: C_SPLINE * Math.pow(h, 4) * M4, fehler, argmax, sp };
}

const HOCH: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻",
};

function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  return v.toFixed(d).replace(".", ",").replace(/^-/, "−");
}

/** Gitterweite ohne Nachkomma-Nullen: 0,25 statt 0,25000. */
function fmtH(v: number): string {
  return v.toFixed(5).replace(/0+$/, "").replace(/\.$/, "").replace(".", ",");
}

/** Wissenschaftliche Notation mit deutschem Komma und echten Hochzahlen. */
function fmtE(v: number): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return "∞";
  if (v === 0) return "0";
  const [mant, ex] = v.toExponential(2).split("e");
  const hoch = String(Number(ex))
    .split("")
    .map((c) => HOCH[c] ?? c)
    .join("");
  return `${mant.replace(".", ",")}·10${hoch}`;
}

const W = 420;
const H_KURVE = 205;
const H_FEHLER = 150;
const PAD = { l: 46, r: 12, t: 12, b: 26 };

export function SplineKonvergenz() {
  const [idx, setIdx] = useState(1);

  const zeilen = useMemo(() => KNOTENZAHLEN.map(rechne), []);
  const zeile = zeilen[idx];
  const vorher = idx > 0 ? zeilen[idx - 1] : null;

  const px = (x: number) => PAD.l + x * (W - PAD.l - PAD.r);
  const pyKurve = (y: number) =>
    PAD.t + ((1.25 - y) / 2.5) * (H_KURVE - PAD.t - PAD.b);

  const pfad = (g: (x: number) => number, py: (y: number) => number) => {
    let d = "";
    for (let i = 0; i <= 400; i++) {
      const x = i / 400;
      const y = g(x);
      if (!Number.isFinite(y)) continue;
      d += `${i === 0 ? "M" : "L"}${px(x).toFixed(1)} ${py(y).toFixed(1)}`;
    }
    return d;
  };

  // Fehlerpanel: symmetrische Skala um die aktuelle Fehlerspitze
  const skala = zeile.fehler > 0 ? zeile.fehler * 1.25 : 1;
  const pyFehler = (e: number) =>
    PAD.t + ((skala - e) / (2 * skala)) * (H_FEHLER - PAD.t - PAD.b);

  // Konvergenzpanel: log10 von Fehler und Schranke ueber den vier Gittern
  const WK = 300;
  const HK = 190;
  const PK = { l: 44, r: 12, t: 12, b: 30 };
  const logs = zeilen.flatMap((z) => [Math.log10(z.fehler), Math.log10(z.schranke)]);
  const loMin = Math.floor(Math.min(...logs)) - 0.3;
  const loMax = Math.ceil(Math.max(...logs)) + 0.3;
  const kx = (i: number) => PK.l + (i / (KNOTENZAHLEN.length - 1)) * (WK - PK.l - PK.r);
  const ky = (l: number) => PK.t + ((loMax - l) / (loMax - loMin)) * (HK - PK.t - PK.b);
  const linie = (werte: number[]) =>
    werte.map((v, i) => `${i === 0 ? "M" : "L"}${kx(i).toFixed(1)} ${ky(Math.log10(v)).toFixed(1)}`).join("");

  const verhaeltnis = zeile.fehler / zeile.schranke;
  const faktor = vorher ? vorher.fehler / zeile.fehler : Number.NaN;

  let status: string;
  if (!vorher) {
    status =
      `Das gröbste Gitter hat ${zeile.knoten} Knoten, also die Gitterweite h = ${fmtH(zeile.h)}. ` +
      `Satz 13.6.2 erlaubt damit einen Fehler von bis zu C·h⁴·M₄ = ${fmtE(zeile.schranke)}; gemessen ` +
      `haben wir ${fmtE(zeile.fehler)} an der Stelle x = ${fmt(zeile.argmax, 4)}, also ` +
      `${fmt(verhaeltnis * 100, 1)} % der Schranke. Schon hier liegt der Spline sichtbar nah an f, ` +
      `und die Abweichung ist im oberen Bild kaum vom Strich zu unterscheiden. Schieben wir den ` +
      `Regler nach rechts, um die Gitterweite zu halbieren.`;
  } else {
    const lage =
      Math.abs(faktor - 16) <= 1.2
        ? "Wir liegen schon dicht daran"
        : faktor > 16
          ? "Auf diesem noch groben Gitter liegen wir darüber"
          : "Auf diesem Gitter liegen wir darunter";
    status =
      `${zeile.knoten} Knoten, h = ${fmtH(zeile.h)}: Der gemessene Fehler fällt von ` +
      `${fmtE(vorher.fehler)} auf ${fmtE(zeile.fehler)}, also auf das ` +
      `${fmt(1 / faktor, 4)}-fache. Das ist ein Faktor ${fmt(faktor, 2)}. Der Exponent vier ` +
      `verspricht 2⁴ = 16: ${lage}. Die Schranke selbst fällt exakt auf ein Sechzehntel, von ` +
      `${fmtE(vorher.schranke)} auf ${fmtE(zeile.schranke)}; ausgeschöpft ist sie zu ` +
      `${fmt(verhaeltnis * 100, 1)} %. Der größte Fehler sitzt jetzt bei x = ${fmt(zeile.argmax, 4)}.`;
  }

  return (
    <div className="space-y-3">
      <Aufgabe>Wählen wir ein Gitter und vergleichen die beiden aufeinanderfolgenden Fehler.</Aufgabe>

      <Slider label="Knoten" min={0} max={KNOTENZAHLEN.length - 1} step={1} value={idx} onChange={setIdx} fmt={(v) => `${KNOTENZAHLEN[v]} (h = ${fmtH(zeilen[v].h)})`} accent={ORANGE} />

      <div className="flex flex-wrap gap-4">
        <div>
          <svg
            width={W}
            viewBox={`0 0 ${W} ${H_KURVE}`}
            className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <rect
              x={PAD.l}
              y={PAD.t}
              width={W - PAD.l - PAD.r}
              height={H_KURVE - PAD.t - PAD.b}
              fill="none"
              stroke={RAHMEN}
              strokeWidth={0.8}
            />
            {niceTicks(0, 1).map((t) => (
              <g key={`x${t}`}>
                <line
                  x1={px(t)}
                  x2={px(t)}
                  y1={H_KURVE - PAD.b}
                  y2={H_KURVE - PAD.b + 3}
                  stroke={ACHSE}
                />
                <text
                  x={px(t)}
                  y={H_KURVE - PAD.b + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill={ACHSE}
                >
                  {String(t).replace(".", ",")}
                </text>
              </g>
            ))}
            {[-1, 0, 1].map((t) => (
              <g key={`y${t}`}>
                <line x1={PAD.l - 3} x2={PAD.l} y1={pyKurve(t)} y2={pyKurve(t)} stroke={ACHSE} />
                <text x={PAD.l - 5} y={pyKurve(t) + 3} textAnchor="end" fontSize={9} fill={ACHSE}>
                  {String(t).replace("-", "−")}
                </text>
              </g>
            ))}
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={pyKurve(0)}
              y2={pyKurve(0)}
              stroke={ACHSE}
              strokeWidth={1}
            />
            <text x={W - PAD.r - 4} y={pyKurve(0) - 5} textAnchor="end" fontSize={10} fill={ACHSE}>
              x
            </text>
            <path d={pfad(f, pyKurve)} fill="none" stroke={VIOLETT} strokeWidth={2.4} />
            <path
              d={pfad((x) => auswerten(zeile.sp, x), pyKurve)}
              fill="none"
              stroke={GRUEN}
              strokeWidth={1.6}
              strokeDasharray="5 3"
            />
            {zeile.sp.xs.map((x, i) => (
              <circle key={x} cx={px(x)} cy={pyKurve(zeile.sp.ys[i])} r={3} fill={ORANGE} />
            ))}
            <text x={PAD.l + 4} y={PAD.t + 11} fontSize={10} fill={VIOLETT}>
              f
            </text>
            <text x={PAD.l + 16} y={PAD.t + 11} fontSize={10} fill={GRUEN}>
              s
            </text>
          </svg>

          <svg
            width={W}
            viewBox={`0 0 ${W} ${H_FEHLER}`}
            className="mt-2 max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <rect
              x={PAD.l}
              y={PAD.t}
              width={W - PAD.l - PAD.r}
              height={H_FEHLER - PAD.t - PAD.b}
              fill="none"
              stroke={RAHMEN}
              strokeWidth={0.8}
            />
            {niceTicks(0, 1).map((t) => (
              <g key={`ex${t}`}>
                <line
                  x1={px(t)}
                  x2={px(t)}
                  y1={H_FEHLER - PAD.b}
                  y2={H_FEHLER - PAD.b + 3}
                  stroke={ACHSE}
                />
                <text
                  x={px(t)}
                  y={H_FEHLER - PAD.b + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill={ACHSE}
                >
                  {String(t).replace(".", ",")}
                </text>
              </g>
            ))}
            {[-zeile.fehler, 0, zeile.fehler].map((t, i) => (
              <g key={`ey${i}`}>
                <line x1={PAD.l - 3} x2={PAD.l} y1={pyFehler(t)} y2={pyFehler(t)} stroke={ACHSE} />
                <text x={PAD.l - 5} y={pyFehler(t) + 3} textAnchor="end" fontSize={8} fill={ACHSE}>
                  {i === 1 ? "0" : (i === 0 ? "−" : "") + fmtE(zeile.fehler)}
                </text>
              </g>
            ))}
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={pyFehler(0)}
              y2={pyFehler(0)}
              stroke={ACHSE}
              strokeWidth={1}
            />
            <path
              d={pfad((x) => f(x) - auswerten(zeile.sp, x), pyFehler)}
              fill="none"
              stroke={ROT}
              strokeWidth={1.8}
            />
            {zeile.sp.xs.map((x) => (
              <circle key={`k${x}`} cx={px(x)} cy={pyFehler(0)} r={2.2} fill={ORANGE} />
            ))}
            <text x={PAD.l + 4} y={PAD.t + 11} fontSize={10} fill={ROT}>
              f − s
            </text>
          </svg>
        </div>

        <div className="min-w-0 grow space-y-2">
          <svg
            viewBox={`0 0 ${WK} ${HK}`}
            className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <rect
              x={PK.l}
              y={PK.t}
              width={WK - PK.l - PK.r}
              height={HK - PK.t - PK.b}
              fill="none"
              stroke={RAHMEN}
              strokeWidth={0.8}
            />
            {Array.from(
              { length: Math.floor(loMax) - Math.ceil(loMin) + 1 },
              (_, i) => Math.ceil(loMin) + i,
            ).map((l) => (
              <g key={`l${l}`}>
                <line x1={PK.l - 3} x2={WK - PK.r} y1={ky(l)} y2={ky(l)} stroke={RAHMEN} />
                <text x={PK.l - 5} y={ky(l) + 3} textAnchor="end" fontSize={8} fill={ACHSE}>
                  {fmtE(Math.pow(10, l))}
                </text>
              </g>
            ))}
            {KNOTENZAHLEN.map((k, i) => (
              <text key={`t${k}`} x={kx(i)} y={HK - PK.b + 14} textAnchor="middle" fontSize={9} fill={ACHSE}>
                {k}
              </text>
            ))}
            <text x={WK / 2} y={HK - 4} textAnchor="middle" fontSize={9} fill={ACHSE}>
              Knotenzahl
            </text>
            <path d={linie(zeilen.map((z) => z.schranke))} fill="none" stroke={ROT} strokeWidth={1.6} strokeDasharray="5 3" />
            <path d={linie(zeilen.map((z) => z.fehler))} fill="none" stroke={ROT} strokeWidth={2} />
            {zeilen.map((z, i) => (
              <g key={`p${z.knoten}`}>
                <circle cx={kx(i)} cy={ky(Math.log10(z.schranke))} r={i === idx ? 4 : 2.5} fill="white" stroke={ROT} strokeWidth={1.6} />
                <circle cx={kx(i)} cy={ky(Math.log10(z.fehler))} r={i === idx ? 4 : 2.5} fill={ROT} />
              </g>
            ))}
            <text x={PK.l + 6} y={PK.t + 11} fontSize={9} fill={ROT}>
              Schranke (gestrichelt), Fehler (voll)
            </text>
          </svg>

          <div className="overflow-x-auto rounded border border-slate-300 dark:border-slate-600">
            <table className="w-full text-right font-mono text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr className="text-slate-600 dark:text-slate-300">
                  <th className="px-2 py-1">Knoten</th>
                  <th className="px-2 py-1">h</th>
                  <th className="px-2 py-1">Schranke</th>
                  <th className="px-2 py-1">Fehler</th>
                  <th className="px-2 py-1">Faktor</th>
                </tr>
              </thead>
              <tbody>
                {zeilen.map((z, i) => (
                  <tr
                    key={z.knoten}
                    className={i === idx ? "font-semibold text-slate-900 dark:text-slate-100" : ""}
                  >
                    <td className="px-2 py-0.5">{z.knoten}</td>
                    <td className="px-2 py-0.5">{fmtH(z.h)}</td>
                    <td className="px-2 py-0.5">{fmtE(z.schranke)}</td>
                    <td className="px-2 py-0.5">{fmtE(z.fehler)}</td>
                    <td className="px-2 py-0.5">
                      {i === 0 ? "–" : fmt(zeilen[i - 1].fehler / z.fehler, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Verdikt kind={idx === 0 ? "neutral" : "ok"}>{status}</Verdikt>
    </div>
  );
}
