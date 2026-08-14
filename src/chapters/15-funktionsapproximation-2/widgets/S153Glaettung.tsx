import { useMemo, useState } from "react";

/**
 * §15.3: Glaettung mit einer kubischen B-Spline-Basis, Regler fuer K.
 *
 * Eigenbau (kein portierter Code). Der Datensatz folgt dem SETUP der Folie
 * (n = 50, x gleichverteilt auf [0, 2pi], f(x) = sin x + 0,5 sin 2x,
 * sigma = 0,3), ist aber eine EIGENE Realisierung mit seeded PRNG
 * (mulberry32 + Box-Muller, Seed 15032026). Die R-Zahlen der Folie
 * (set.seed(42)) werden weder reproduziert noch behauptet; alle angezeigten
 * Werte rechnet dieses Widget selbst.
 *
 * Rechenweg: kubische B-Spline-Basis ueber Cox-de-Boor mit offenem
 * Knotenvektor, innere Knoten auf den Quantilen der x_i (wie
 * splines::bs(x, df = K, intercept = TRUE)), KQ-Fit ueber die
 * Normalengleichungen B^T B a = B^T y mit Cholesky-Zerlegung.
 *
 * Farbrollen nach dem Kapitel-15-Code: Daten blau, Schaetzer fhat gruen,
 * Basis und Knoten orange, Residuen rot; die wahre Funktion f traegt das im
 * Kapitel freie Violett (Rolle steht in der Widget-Einleitung).
 *
 * Nachgerechnet (node, check-s153*.mjs), identischer Rechenkern:
 *   K =  4  RSS 6,421  sigmahat 0,374  RMS|fhat-f| 0,2471  max 0,467
 *   K = 10  RSS 3,084  sigmahat 0,278  RMS 0,0864  max 0,532
 *   K = 11  RSS 3,151  sigmahat 0,284  RMS 0,0724 (bester Wert im Bereich)
 *   K = 20  RSS 2,460  sigmahat 0,286  RMS 0,2692  max 2,223
 *   K = 40  RSS 0,557  sigmahat 0,236  RMS 1,9078  max 8,574
 *   Basis: max |sum_k N_k(x) - 1| = 4,4e-16, keine negativen Werte.
 *   Empirische sd der gezogenen Fehler: 0,2662 (wahres sigma = 0,3).
 * Alle 37 Reglerzustaende durchgespielt (check-s153-widget.mjs): die vier
 * Statuszweige sind mit 2 / 10 / 16 / 9 Zustaenden alle erreichbar; der
 * Singulaer-Zweig ist reiner Rechenschutz und feuert bei Quantilknoten im
 * Bereich K = 4..40 nie.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ORANGE = "#E69F00";
const ROT = "#D55E00";
const VIOLETT = "#9E57D5";
const ACHSE = "#64748b";
const RAHMEN = "#cbd5e1";

const N = 50;
const SIGMA = 0.3;
const XMAX = 2 * Math.PI;
const SEED = 15032026;
const GRAD = 3;
const K_MIN = 4;
const K_MAX = 40;
const Y_FENSTER = 2.6;

const fWahr = (x: number) => Math.sin(x) + 0.5 * Math.sin(2 * x);

/** mulberry32: kleiner, deterministischer PRNG. Kein Math.random im Render. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function zieheDaten(): { xs: number[]; ys: number[]; sdEps: number } {
  const r = mulberry32(SEED);
  const xs: number[] = [];
  for (let i = 0; i < N; i++) xs.push(r() * XMAX);
  xs.sort((a, b) => a - b);
  const eps: number[] = [];
  while (eps.length < N) {
    const u1 = Math.max(r(), 1e-12);
    const u2 = r();
    const rad = SIGMA * Math.sqrt(-2 * Math.log(u1));
    eps.push(rad * Math.cos(2 * Math.PI * u2));
    if (eps.length < N) eps.push(rad * Math.sin(2 * Math.PI * u2));
  }
  const mittel = eps.reduce((a, b) => a + b, 0) / N;
  const sdEps = Math.sqrt(
    eps.reduce((a, b) => a + (b - mittel) * (b - mittel), 0) / (N - 1),
  );
  return { xs, ys: xs.map((x, i) => fWahr(x) + eps[i]), sdEps };
}

const DATEN = zieheDaten();

/** Quantil vom Typ 7 einer aufsteigend sortierten Stichprobe. */
function quantil(sortiert: number[], p: number): number {
  const h = (sortiert.length - 1) * p;
  const lo = Math.floor(h);
  const hi = Math.min(lo + 1, sortiert.length - 1);
  return sortiert[lo] + (h - lo) * (sortiert[hi] - sortiert[lo]);
}

/** Offener Knotenvektor: Raender (GRAD+1)-fach, innere Knoten auf Quantilen. */
function knotenvektor(K: number, xs: number[]): number[] {
  const m = K - GRAD;
  const t: number[] = [];
  for (let i = 0; i <= GRAD; i++) t.push(0);
  for (let i = 1; i <= m - 1; i++) t.push(quantil(xs, i / m));
  for (let i = 0; i <= GRAD; i++) t.push(XMAX);
  return t;
}

/** Cox-de-Boor: die K kubischen B-Spline-Basisfunktionen an der Stelle x. */
function basis(t: number[], K: number, x: number): number[] {
  const anz = t.length - 1;
  const links = t[0];
  const rechts = t[anz];
  const xx = Math.min(Math.max(x, links), rechts);
  let stufe = new Array<number>(anz).fill(0);
  for (let i = 0; i < anz; i++) if (t[i] <= xx && xx < t[i + 1]) stufe[i] = 1;
  if (xx >= rechts) {
    for (let i = anz - 1; i >= 0; i--) {
      if (t[i] < t[i + 1]) {
        stufe[i] = 1;
        break;
      }
    }
  }
  for (let q = 1; q <= GRAD; q++) {
    const naechste = new Array<number>(anz - q).fill(0);
    for (let i = 0; i < anz - q; i++) {
      let s = 0;
      const d1 = t[i + q] - t[i];
      if (d1 > 0) s += ((xx - t[i]) / d1) * stufe[i];
      const d2 = t[i + q + 1] - t[i + 1];
      if (d2 > 0) s += ((t[i + q + 1] - xx) / d2) * stufe[i + 1];
      naechste[i] = s;
    }
    stufe = naechste;
  }
  return stufe.slice(0, K);
}

interface Fit {
  K: number;
  t: number[];
  a: number[] | null;
  rss: number;
  sigmaHut: number;
  rms: number;
  maxAbw: number;
  argMax: number;
  minWert: number;
  maxWert: number;
}

function rechne(K: number): Fit {
  const { xs, ys } = DATEN;
  const t = knotenvektor(K, xs);
  const G: number[][] = Array.from({ length: K }, () => new Array<number>(K).fill(0));
  const c = new Array<number>(K).fill(0);
  for (let i = 0; i < N; i++) {
    const b = basis(t, K, xs[i]);
    for (let j = 0; j < K; j++) {
      if (b[j] === 0) continue;
      c[j] += b[j] * ys[i];
      for (let k = j; k < K; k++) G[j][k] += b[j] * b[k];
    }
  }
  for (let j = 0; j < K; j++) for (let k = 0; k < j; k++) G[j][k] = G[k][j];

  // Cholesky-Zerlegung der Normalengleichungsmatrix
  const L: number[][] = Array.from({ length: K }, () => new Array<number>(K).fill(0));
  for (let j = 0; j < K; j++) {
    let s = G[j][j];
    for (let k = 0; k < j; k++) s -= L[j][k] * L[j][k];
    if (!(s > 1e-12)) {
      return {
        K, t, a: null, rss: Number.NaN, sigmaHut: Number.NaN,
        rms: Number.NaN, maxAbw: Number.NaN, argMax: Number.NaN,
        minWert: Number.NaN, maxWert: Number.NaN,
      };
    }
    L[j][j] = Math.sqrt(s);
    for (let i = j + 1; i < K; i++) {
      let u = G[i][j];
      for (let k = 0; k < j; k++) u -= L[i][k] * L[j][k];
      L[i][j] = u / L[j][j];
    }
  }
  const z = new Array<number>(K).fill(0);
  for (let i = 0; i < K; i++) {
    let s = c[i];
    for (let k = 0; k < i; k++) s -= L[i][k] * z[k];
    z[i] = s / L[i][i];
  }
  const a = new Array<number>(K).fill(0);
  for (let i = K - 1; i >= 0; i--) {
    let s = z[i];
    for (let k = i + 1; k < K; k++) s -= L[k][i] * a[k];
    a[i] = s / L[i][i];
  }

  const wert = (x: number) => basis(t, K, x).reduce((s, b, k) => s + b * a[k], 0);
  let rss = 0;
  for (let i = 0; i < N; i++) {
    const e = ys[i] - wert(xs[i]);
    rss += e * e;
  }
  const M = 2000;
  let quad = 0;
  let maxAbw = 0;
  let argMax = 0;
  let minWert = Infinity;
  let maxWert = -Infinity;
  for (let i = 0; i <= M; i++) {
    const x = (i / M) * XMAX;
    const v = wert(x);
    const d = v - fWahr(x);
    if (Math.abs(d) > maxAbw) {
      maxAbw = Math.abs(d);
      argMax = x;
    }
    const w = i === 0 || i === M ? 1 : i % 2 === 1 ? 4 : 2;
    quad += w * d * d;
    minWert = Math.min(minWert, v);
    maxWert = Math.max(maxWert, v);
  }
  quad *= (XMAX / M) / 3 / XMAX;
  return {
    K, t, a, rss,
    sigmaHut: N > K ? Math.sqrt(rss / (N - K)) : Number.NaN,
    rms: Math.sqrt(quad), maxAbw, argMax, minWert, maxWert,
  };
}

function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  return v.toFixed(d).replace(".", ",").replace(/^-/, "−");
}

const W = 470;
const H = 250;
const H_BASIS = 110;
const PAD = { l: 40, r: 12, t: 12, b: 26 };

export function SplineGlaettung() {
  const [K, setK] = useState(10);
  const fit = useMemo(() => rechne(K), [K]);
  const { xs, ys, sdEps } = DATEN;

  const px = (x: number) => PAD.l + (x / XMAX) * (W - PAD.l - PAD.r);
  const py = (y: number) =>
    PAD.t + ((Y_FENSTER - y) / (2 * Y_FENSTER)) * (H - PAD.t - PAD.b);
  const pyBasis = (y: number) =>
    4 + (1.08 - y) * (H_BASIS - 4 - 18) / 1.16;

  const wert = useMemo(() => {
    if (!fit.a) return null;
    const a = fit.a;
    return (x: number) => basis(fit.t, fit.K, x).reduce((s, b, k) => s + b * a[k], 0);
  }, [fit]);

  const kurve = useMemo(() => {
    if (!wert) return "";
    // dasselbe Raster wie in rechne(): so passen Bild und Readout zusammen
    let d = "";
    let auf = false;
    for (let i = 0; i <= 2000; i++) {
      const x = (i / 2000) * XMAX;
      const y = wert(x);
      if (!Number.isFinite(y) || y > Y_FENSTER || y < -Y_FENSTER) {
        auf = false;
        continue;
      }
      d += `${auf ? "L" : "M"}${px(x).toFixed(1)} ${py(y).toFixed(1)}`;
      auf = true;
    }
    return d;
  }, [wert]);

  const wahr = useMemo(() => {
    let d = "";
    for (let i = 0; i <= 600; i++) {
      const x = (i / 600) * XMAX;
      d += `${i === 0 ? "M" : "L"}${px(x).toFixed(1)} ${py(fWahr(x)).toFixed(1)}`;
    }
    return d;
  }, []);

  const innere = fit.t.slice(GRAD + 1, fit.t.length - GRAD - 1);
  const verlaesstFenster =
    !!fit.a && (fit.maxWert > Y_FENSTER || fit.minWert < -Y_FENSTER);

  let status: string;
  if (!fit.a) {
    status =
      `Bei K = ${K} ist BᵀB nicht mehr positiv definit: Die Basis ist auf diesen ` +
      `50 Datenpunkten linear abhängig, die Normalengleichungen haben also keine ` +
      `eindeutige Lösung. Schieben wir den Regler zurück.`;
  } else if (K <= 5) {
    const raum =
      K === 4
        ? "ist genau der Raum der kubischen Polynome, innere Knoten gibt es keine"
        : `lässt mit ${innere.length} innerem Knoten kaum mehr zu`;
    status =
      `K = ${K} ${raum}. Die Kurve ist zu starr für f und verfehlt die Extrema systematisch: ` +
      `im quadratischen Mittel um ${fmt(fit.rms)}, an der schlimmsten Stelle x = ` +
      `${fmt(fit.argMax, 2)} um ${fmt(fit.maxAbw, 2)}. Auch die Residuen sind entsprechend groß, ` +
      `RSS = ${fmt(fit.rss, 2)} und damit σ̂ = ${fmt(fit.sigmaHut)} statt der wahren 0,3. Was hier ` +
      `übrig bleibt, ist kein Rauschen, sondern nicht erklärte Struktur.`;
  } else if (verlaesstFenster) {
    status =
      `K = ${K} bei n = 50 Datenpunkten: Der Fit hat nur noch ${N - K} Freiheitsgrade übrig. ` +
      `Die Residuenquadratsumme ist mit ${fmt(fit.rss, 2)} klein, die geschätzte Kurve läuft aber ` +
      `bis ${fmt(fit.maxWert, 1)} nach oben und ${fmt(fit.minWert, 1)} nach unten und verlässt damit ` +
      `das Bild; wo sie draußen ist, bricht der grüne Zug ab. Vom wahren f ist sie im quadratischen ` +
      `Mittel ${fmt(fit.rms)} entfernt, an der schlimmsten Stelle x = ${fmt(fit.argMax, 2)} um ` +
      `${fmt(fit.maxAbw, 2)}. Das ist Überanpassung in Reinform: Die Kurve jagt einzelne Punkte, ` +
      `und zwischen zwei eng benachbarten x-Werten mit verschiedenem Rauschen muss sie steil werden.`;
  } else if (fit.rms > 0.18) {
    status =
      `K = ${K}: Zwischen den Datenpunkten schlägt die Kurve aus. Die Residuenquadratsumme ist auf ` +
      `${fmt(fit.rss, 2)} gefallen, der Abstand zum wahren f dagegen auf ${fmt(fit.rms)} gestiegen ` +
      `(größte Abweichung ${fmt(fit.maxAbw, 2)} bei x = ${fmt(fit.argMax, 2)}). Die Anpassung an die ` +
      `Daten wird also besser, die Schätzung von f schlechter. Nur den ersten der beiden Werte ` +
      `könnten wir an echten Daten überhaupt ausrechnen.`;
  } else {
    status =
      `K = ${K} mit ${innere.length} inneren Knoten: Die Kurve folgt f, ohne den einzelnen Punkten ` +
      `nachzulaufen. Der Abstand zum wahren f beträgt im quadratischen Mittel ${fmt(fit.rms)}. ` +
      `Aus der Residuenquadratsumme ${fmt(fit.rss, 2)} auf ${N - K} Freiheitsgraden schätzen wir ` +
      `σ̂ = ${fmt(fit.sigmaHut)}; die tatsächliche Streuung der gezogenen Fehler liegt bei ` +
      `${fmt(sdEps)}, das wahre σ bei 0,3. Der Fit erklärt also gerade so viel, wie sich erklären lässt.`;
  }

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Blau sind die 50 Datenpunkte, violett die wahre Funktion f(x) = sin(x) + 0,5·sin(2x), grün
        der Kleinste-Quadrate-Fit f̂ in der kubischen B-Spline-Basis, orange die Basisfunktionen und
        ihre Knoten, rot die Residuen. Die Daten sind eine eigene Ziehung mit festem Startwert
        (n = 50, σ = 0,3), keine Kopie der R-Grafik der Folie; alle Zahlen rechnet das Widget selbst.
      </p>

      <label className="my-1 flex items-center gap-3 text-sm">
        <span className="w-40 shrink-0 text-right">Basisfunktionen K</span>
        <input
          type="range"
          className="grow accent-sky-600"
          min={K_MIN}
          max={K_MAX}
          step={1}
          value={K}
          onChange={(e) => setK(Number(e.target.value))}
        />
        <span className="w-32 shrink-0 font-mono text-xs">
          {K} ({innere.length} innere Knoten)
        </span>
      </label>

      <div className="flex flex-wrap gap-4">
        <div>
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <rect
              x={PAD.l}
              y={PAD.t}
              width={W - PAD.l - PAD.r}
              height={H - PAD.t - PAD.b}
              fill="none"
              stroke={RAHMEN}
              strokeWidth={0.8}
            />
            {[0, 1, 2, 3, 4, 5, 6].map((t) => (
              <g key={`x${t}`}>
                <line x1={px(t)} x2={px(t)} y1={H - PAD.b} y2={H - PAD.b + 3} stroke={ACHSE} />
                <text
                  x={px(t)}
                  y={H - PAD.b + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill={ACHSE}
                >
                  {t}
                </text>
              </g>
            ))}
            {[-2, -1, 0, 1, 2].map((t) => (
              <g key={`y${t}`}>
                <line x1={PAD.l - 3} x2={PAD.l} y1={py(t)} y2={py(t)} stroke={ACHSE} />
                <text x={PAD.l - 5} y={py(t) + 3} textAnchor="end" fontSize={9} fill={ACHSE}>
                  {String(t).replace("-", "−")}
                </text>
              </g>
            ))}
            <line x1={PAD.l} x2={W - PAD.r} y1={py(0)} y2={py(0)} stroke={ACHSE} strokeWidth={1} />
            <text x={W - PAD.r - 4} y={py(0) - 5} textAnchor="end" fontSize={10} fill={ACHSE}>
              x
            </text>

            {wert &&
              xs.map((x, i) => {
                const yh = wert(x);
                if (!Number.isFinite(yh)) return null;
                const yhClip = Math.min(Math.max(yh, -Y_FENSTER), Y_FENSTER);
                return (
                  <line
                    key={`r${i}`}
                    x1={px(x)}
                    x2={px(x)}
                    y1={py(ys[i])}
                    y2={py(yhClip)}
                    stroke={ROT}
                    strokeWidth={1}
                  />
                );
              })}

            <path d={wahr} fill="none" stroke={VIOLETT} strokeWidth={2} strokeDasharray="6 3" />
            <path d={kurve} fill="none" stroke={GRUEN} strokeWidth={2.2} />
            {xs.map((x, i) => (
              <circle key={`d${i}`} cx={px(x)} cy={py(ys[i])} r={2.6} fill={BLAU} />
            ))}
            {innere.map((t, i) => (
              <line
                key={`k${i}`}
                x1={px(t)}
                x2={px(t)}
                y1={H - PAD.b}
                y2={H - PAD.b - 7}
                stroke={ORANGE}
                strokeWidth={1.6}
              />
            ))}
            <text x={PAD.l + 4} y={PAD.t + 11} fontSize={10} fill={VIOLETT}>
              f
            </text>
            <text x={PAD.l + 14} y={PAD.t + 11} fontSize={10} fill={GRUEN}>
              f̂
            </text>
          </svg>

          <svg
            width={W}
            height={H_BASIS}
            viewBox={`0 0 ${W} ${H_BASIS}`}
            className="mt-2 max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={pyBasis(0)}
              y2={pyBasis(0)}
              stroke={ACHSE}
              strokeWidth={1}
            />
            {Array.from({ length: K }, (_, k) => {
              let d = "";
              for (let i = 0; i <= 300; i++) {
                const x = (i / 300) * XMAX;
                const v = basis(fit.t, K, x)[k];
                d += `${i === 0 ? "M" : "L"}${px(x).toFixed(1)} ${pyBasis(v).toFixed(1)}`;
              }
              return <path key={`b${k}`} d={d} fill="none" stroke={ORANGE} strokeWidth={1.1} opacity={0.85} />;
            })}
            {innere.map((t, i) => (
              <line
                key={`bk${i}`}
                x1={px(t)}
                x2={px(t)}
                y1={pyBasis(0)}
                y2={pyBasis(0) + 6}
                stroke={ORANGE}
                strokeWidth={1.6}
              />
            ))}
            <text x={PAD.l + 4} y={H_BASIS - 3} fontSize={10} fill={ORANGE}>
              die {K} Basisfunktionen und ihre inneren Knoten
            </text>
          </svg>
        </div>

        <div className="grow space-y-2">
          <div className="overflow-x-auto rounded border border-slate-300 dark:border-slate-600">
            <table className="w-full text-right font-mono text-xs">
              <tbody>
                <tr>
                  <td className="px-2 py-1 text-left">Basisfunktionen K</td>
                  <td className="px-2 py-1">{K}</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 text-left">innere Knoten</td>
                  <td className="px-2 py-1">{innere.length}</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 text-left">Freiheitsgrade n − K</td>
                  <td className="px-2 py-1">{N - K}</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 text-left">RSS</td>
                  <td className="px-2 py-1">{fmt(fit.rss, 3)}</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 text-left">σ̂ = √(RSS/(n−K))</td>
                  <td className="px-2 py-1">{fmt(fit.sigmaHut)}</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 text-left">‖f̂ − f‖ im Mittel</td>
                  <td className="px-2 py-1">{fmt(fit.rms, 4)}</td>
                </tr>
                <tr>
                  <td className="px-2 py-1 text-left">max |f̂ − f|</td>
                  <td className="px-2 py-1">{fmt(fit.maxAbw, 3)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="max-w-prose text-xs text-slate-600 dark:text-slate-400">
            Die beiden unteren Zeilen sind an echten Daten nicht ausrechenbar: Sie brauchen f, und f
            ist gerade das Unbekannte. Ausrechenbar ist allein die RSS, und die zeigt in die falsche
            Richtung, sobald K groß wird. Der größte Abstand sitzt bei kleinem K meist an einem der
            beiden Ränder, wo die Schätzung die wenigsten Daten hinter sich hat: Der erste Datenpunkt
            liegt bei x = 0,05, der letzte bei x = 6,26.
          </p>
        </div>
      </div>

      <p className="max-w-prose text-sm text-slate-700 dark:text-slate-300">{status}</p>
    </div>
  );
}
