import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, fmtTick, niceTicks, Slider, Verdikt } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §13.6: Konvergenz des vollstaendigen (eingespannten) kubischen
 * Spline-Interpolanten am Buckel f(x) = exp(-40 (x - 2/5)^2).
 *
 * Eigenbau (kein portierter Code). Der Spline wird hier in JS geloest:
 * Momentengleichungen M_i = s''(x_i) als tridiagonales System, Thomas-
 * Algorithmus, eingespannte Randbedingung s'(0) = f'(0), s'(1) = f'(1) —
 * genau der Randabschluss, fuer den die Konstante 5/384 gilt. Alle
 * angezeigten Fehlerwerte sind EIGENE Rechnungen dieses Widgets.
 *
 * Farbrollen nach dem Kapitel-15-Code: Knoten orange, Interpolant s gruen,
 * Fehler und Schranke rot; die wahre Funktion f traegt das im Kapitel freie
 * Violett (Rolle steht in der Widget-Einleitung).
 *
 * Verifiziert (scripts/verify/R6/spline-buckel.mjs, 2026-08-27),
 * C = 5/384, max|f^(4)| = 12 * 40^2 = 19200:
 *   3 Knoten  h = 0,5       Schranke 15,625      Fehler 0,4423233
 *   5 Knoten  h = 0,25      Schranke 0,97656     Fehler 0,3244323  Faktor 1,36
 *   9 Knoten  h = 0,125     Schranke 0,061035    Fehler 0,0238954  Faktor 13,58
 *  17 Knoten  h = 0,0625    Schranke 0,0038147   Fehler 0,00110657 Faktor 21,59
 *  33 Knoten  h = 0,03125   Schranke 0,00023842  Fehler 5,1615e-5  Faktor 21,44
 *  65 Knoten  h = 0,015625  Schranke 1,4901e-5   Fehler 3,0523e-6  Faktor 16,91
 * Die Werte sind ab 4001 Abtastpunkten auf vier Stellen stabil; das Widget
 * nimmt 8001.
 */

const { gruen: GRUEN, orange: ORANGE, rot: ROT, violett: VIOLETT, grau: ACHSE, hellgrau: RAHMEN } = FMM_COLORS;

const KNOTENZAHLEN = [3, 5, 9, 17, 33, 65];
const C_SPLINE = 5 / 384;
/** Buckelschaerfe; f^(4) hat sein Maximum 12 alpha^2 in der Spitze x = 2/5. */
const ALPHA = 40;
const MITTE = 2 / 5;
const M4 = 12 * ALPHA * ALPHA;
const ABTASTUNG = 8001;

const f = (x: number) => Math.exp(-ALPHA * (x - MITTE) * (x - MITTE));
const fStrich = (x: number) => -2 * ALPHA * (x - MITTE) * f(x);

interface Spline {
  xs: number[];
  ys: number[];
  hs: number[];
  M: number[];
}

/**
 * Vollstaendiger (eingespannter) kubischer Spline durch (xs, ys):
 * tridiagonales System fuer M_i = s''(x_i). Die beiden Randzeilen kodieren
 * s'(x_0) = f'(x_0) und s'(x_n) = f'(x_n).
 */
function eingespannterSpline(xs: number[], ys: number[]): Spline {
  const n = xs.length - 1;
  const hs: number[] = [];
  for (let i = 0; i < n; i++) hs.push(xs[i + 1] - xs[i]);
  const m = n + 1;
  const unter = new Array<number>(m).fill(0);
  const diag = new Array<number>(m).fill(0);
  const ober = new Array<number>(m).fill(0);
  const rechts = new Array<number>(m).fill(0);
  for (let i = 1; i < n; i++) {
    unter[i] = hs[i - 1];
    diag[i] = 2 * (hs[i - 1] + hs[i]);
    ober[i] = hs[i];
    rechts[i] =
      6 * ((ys[i + 1] - ys[i]) / hs[i] - (ys[i] - ys[i - 1]) / hs[i - 1]);
  }
  diag[0] = 2 * hs[0];
  ober[0] = hs[0];
  rechts[0] = 6 * ((ys[1] - ys[0]) / hs[0] - fStrich(xs[0]));
  unter[n] = hs[n - 1];
  diag[n] = 2 * hs[n - 1];
  rechts[n] = 6 * (fStrich(xs[n]) - (ys[n] - ys[n - 1]) / hs[n - 1]);
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
  const M = new Array<number>(m);
  M[m - 1] = cr[m - 1];
  for (let k = m - 2; k >= 0; k--) M[k] = cr[k] - co[k] * M[k + 1];
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
  /** groesster Wert des Interpolanten (die "erreichte" Buckelhoehe) */
  hoehe: number;
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
  const sp = eingespannterSpline(xs, ys);
  let fehler = 0;
  let argmax = 0;
  let hoehe = -Infinity;
  for (let k = 0; k < ABTASTUNG; k++) {
    const x = k / (ABTASTUNG - 1);
    const wert = auswerten(sp, x);
    if (wert > hoehe) hoehe = wert;
    const e = Math.abs(f(x) - wert);
    if (e > fehler) {
      fehler = e;
      argmax = x;
    }
  }
  const h = 1 / n;
  return { knoten, h, schranke: C_SPLINE * Math.pow(h, 4) * M4, fehler, argmax, hoehe, sp };
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

export function SplineKonvergenz({ zeigeFaktor = true }: { zeigeFaktor?: boolean } = {}) {
  const [idx, setIdx] = useState(1);

  const zeilen = useMemo(() => KNOTENZAHLEN.map(rechne), []);
  const zeile = zeilen[idx];
  const vorher = idx > 0 ? zeilen[idx - 1] : null;

  const px = (x: number) => PAD.l + x * (W - PAD.l - PAD.r);
  // Bei 65 Knoten liegen die Punkte 5,7 px auseinander; r = 3 waere ein Strich.
  const knotenRadius = zeile.knoten > 33 ? 1.5 : zeile.knoten > 17 ? 2.2 : 3;
  const pyKurve = (y: number) =>
    PAD.t + ((1.1 - y) / 1.3) * (H_KURVE - PAD.t - PAD.b);

  // 1200 Stuetzstellen: bei 65 Knoten liegen sonst nur ~6 Punkte je
  // Teilintervall und der Fehlerbauch wird als Alias gezeichnet.
  const pfad = (g: (x: number) => number, py: (y: number) => number) => {
    let d = "";
    for (let i = 0; i <= 1200; i++) {
      const x = i / 1200;
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

  // Konvergenzpanel: log10 von Fehler und Schranke ueber allen Gittern
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
      `${ref("satz:approximationsfehler-kubischer-splines")} erlaubt damit einen Fehler von bis zu C·h⁴·M₄ = ${fmtE(zeile.schranke)}; gemessen ` +
      `haben wir ${fmtE(zeile.fehler)} an der Stelle x = ${fmt(zeile.argmax, 4)}, also ` +
      `${fmt(verhaeltnis * 100, 1)} % der Schranke. Mit nur drei Knoten geht die Spitze des Buckels ` +
      `komplett verloren: Der Spline kommt über ${fmt(zeile.hoehe, 2)} nicht hinaus, während f auf 1 steigt. ` +
      `Schieben wir den Regler nach rechts, um die Gitterweite zu halbieren.`;
  } else {
    const lage =
      Math.abs(faktor - 16) <= 1.2
        ? "Wir liegen schon dicht daran"
        : faktor > 16
          ? "Auf diesem Gitter liegen wir darüber"
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
            className="max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600"
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
                  {fmtTick(t, 0.2)}
                </text>
              </g>
            ))}
            {[0, 0.5, 1].map((t) => (
              <g key={`y${t}`}>
                <line x1={PAD.l - 3} x2={PAD.l} y1={pyKurve(t)} y2={pyKurve(t)} stroke={ACHSE} />
                <text x={PAD.l - 5} y={pyKurve(t) + 3} textAnchor="end" fontSize={9} fill={ACHSE}>
                  {fmtTick(t, 0.5)}
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
              <circle key={x} cx={px(x)} cy={pyKurve(zeile.sp.ys[i])} r={knotenRadius} fill={ORANGE} />
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
            className="mt-2 max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600"
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
                  {fmtTick(t, 0.2)}
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
              <circle key={`k${x}`} cx={px(x)} cy={pyFehler(0)} r={knotenRadius * 0.75} fill={ORANGE} />
            ))}
            <text x={PAD.l + 4} y={PAD.t + 11} fontSize={10} fill={ROT}>
              f − s
            </text>
          </svg>
        </div>

        <div className="min-w-0 grow space-y-2">
          <svg
            viewBox={`0 0 ${WK} ${HK}`}
            width={WK}
            height={HK}
            className="max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600"
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
                  {zeigeFaktor ? <th className="px-2 py-1">Faktor</th> : null}
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
                    {zeigeFaktor ? (
                      <td className="px-2 py-0.5">
                        {i === 0 ? "–" : fmt(zeilen[i - 1].fehler / z.fehler, 2)}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {zeigeFaktor ? (
        <Verdikt kind={idx === 0 ? "neutral" : "ok"}>{status}</Verdikt>
      ) : (
        <Verdikt kind="neutral">
          {`${zeile.knoten} Knoten, h = ${fmtH(zeile.h)}: Schranke ${fmtE(zeile.schranke)}, gemessener Fehler ${fmtE(zeile.fehler)}; ausgeschöpft ist die Schranke zu ${fmt(verhaeltnis * 100, 1)} %. Der größte Fehler sitzt bei x = ${fmt(zeile.argmax, 4)}.`}
        </Verdikt>
      )}
    </div>
  );
}
