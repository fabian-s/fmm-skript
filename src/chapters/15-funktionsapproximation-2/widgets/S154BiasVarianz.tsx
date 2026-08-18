import { useMemo, useState } from "react";

/**
 * §15.4: Bias-Varianz-Zerlegung eines Regressionssplines, per seeded
 * Monte-Carlo-Simulation.
 *
 * Eigenbau, kein portierter Code. Setup wie auf der Folie: f(x) = sin(3x)
 * auf [0, 2pi], n = 100 Entwurfsstellen, sigma = 0,3. ALLE angezeigten Zahlen
 * rechnet dieses Widget selbst; die Tabellenwerte der Folie (Bias^2 0,42 usw.)
 * stammen aus resources/bias-variance-example.R und werden NICHT uebernommen.
 *
 * Zufall ausschliesslich seeded (mulberry32 + Box-Muller, feste Seeds):
 * die Entwurfsstellen werden einmal gezogen und bleiben ueber alle
 * Wiederholungen fest, die R = 200 Rauschvektoren ebenfalls. Kein
 * Math.random im Render.
 *
 * Rechenkern: kubische B-Spline-Basis (Cox-de-Boor, offener Knotenvektor mit
 * K + 4 Knoten), Normalengleichungen ueber Cholesky. Bias^2, Varianz und MSE
 * werden an den n Entwurfsstellen gemittelt; genau dafuer sagt Satz 15.4.4
 * den exakten Wert sigma^2 K / n voraus.
 *
 * Farbrollen nach dem Kapitel-15-Code: Daten blau, Schaetzer gruen, Knoten
 * orange, Bias rot; die wahre Funktion f traegt das im Kapitel freie Violett,
 * der MSE als Summe der beiden Anteile ein neutrales Grau.
 *
 * Nachgerechnet (node, check-s154-final.mjs): Spur der Hutmatrix ist fuer
 * alle K exakt K (auf acht Stellen), und die MC-Varianz trifft sigma^2 K/n:
 *   K =  5: Bias^2 0,4103  Var 0,0044 (Theorie 0,0045)  MSE 0,4147
 *   K =  8: Bias^2 0,0344  Var 0,0071 (Theorie 0,0072)  MSE 0,0415
 *   K =  9: Bias^2 0,1174  Var 0,0080 (Theorie 0,0081)  MSE 0,1254
 *   K = 12: Bias^2 0,0013  Var 0,0107 (Theorie 0,0108)  MSE 0,0120  (Minimum)
 *   K = 15: Bias^2 0,0001  Var 0,0135 (Theorie 0,0135)  MSE 0,0136
 *   K = 40: Bias^2 0,0001  Var 0,0358 (Theorie 0,0360)  MSE 0,0360
 *
 * Nachgeprueft im Review 15.4: Bias^2 + Varianz = MSE auf 2e-16 in jeder
 * Zeile; ueber [0, 2pi] statt ueber die Entwurfsstellen gemittelt betraegt
 * die Varianz bei K = 40 dagegen 3,91 (am rechten Rand punktweise 135,7),
 * und ab K = 30 laufen einzelne Probenkurven dort aus dem Bildausschnitt.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ORANGE = "#E69F00";
const ROT = "#D55E00";
const VIOLETT = "#9E57D5";
const GRAU = "#475569";
const ACHSE = "#64748b";
const RAHMEN = "#cbd5e1";

const A = 0;
const B_END = 2 * Math.PI;
const N = 100;
const SIGMA = 0.3;
const R = 200;
const Q = 3;
const K_MIN = 4;
const K_MAX = 40;
const PROBEN = 12;
/** halbe Höhe des linken Bildausschnitts */
const Y_MAX = 2.2;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (x: number) => Math.sin(3 * x);

/** Offener Knotenvektor: q+1 Randknoten, K-q-1 innere, q+1 Randknoten. */
function knotenVektor(K: number): number[] {
  const m = K - Q - 1;
  const t: number[] = [];
  for (let i = 0; i <= Q; i++) t.push(A);
  for (let i = 1; i <= m; i++) t.push(A + (i * (B_END - A)) / (m + 1));
  for (let i = 0; i <= Q; i++) t.push(B_END);
  return t;
}

/** Werte aller K kubischen B-Splines an der Stelle x (Cox-de-Boor). */
function basis(t: number[], K: number, x: number): number[] {
  const nk = t.length;
  let prev = new Array<number>(nk - 1).fill(0);
  for (let i = 0; i < nk - 1; i++) if (t[i] <= x && x < t[i + 1]) prev[i] = 1;
  if (x >= t[nk - 1]) {
    for (let i = nk - 2; i >= 0; i--) {
      if (t[i] < t[i + 1]) {
        prev[i] = 1;
        break;
      }
    }
  }
  for (let q = 1; q <= Q; q++) {
    const cur = new Array<number>(nk - 1 - q).fill(0);
    for (let i = 0; i < cur.length; i++) {
      let v = 0;
      const d1 = t[i + q] - t[i];
      if (d1 > 0) v += ((x - t[i]) / d1) * prev[i];
      const d2 = t[i + q + 1] - t[i + 1];
      if (d2 > 0) v += ((t[i + q + 1] - x) / d2) * prev[i + 1];
      cur[i] = v;
    }
    prev = cur;
  }
  return prev.slice(0, K);
}

function cholesky(M: Float64Array[], K: number): Float64Array[] | null {
  const L = Array.from({ length: K }, () => new Float64Array(K));
  for (let i = 0; i < K; i++) {
    for (let j = 0; j <= i; j++) {
      let s = M[i][j];
      for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k];
      if (i === j) {
        if (s <= 0) return null;
        L[i][i] = Math.sqrt(s);
      } else L[i][j] = s / L[j][j];
    }
  }
  return L;
}

function cholSolve(L: Float64Array[], K: number, rhs: Float64Array): Float64Array {
  const y = new Float64Array(K);
  for (let i = 0; i < K; i++) {
    let s = rhs[i];
    for (let k = 0; k < i; k++) s -= L[i][k] * y[k];
    y[i] = s / L[i][i];
  }
  const x = new Float64Array(K);
  for (let i = K - 1; i >= 0; i--) {
    let s = y[i];
    for (let k = i + 1; k < K; k++) s -= L[k][i] * x[k];
    x[i] = s / L[i][i];
  }
  return x;
}

interface Lauf {
  K: number;
  bias2: number;
  varianz: number;
  mse: number;
  knoten: number[];
  /** Koeffizienten der ersten PROBEN Wiederholungen */
  proben: Float64Array[];
  /** ueber alle R Wiederholungen gemittelte Koeffizienten */
  mittel: Float64Array;
}

interface Daten {
  xs: number[];
  y0: number[];
  laeufe: Lauf[];
  besteK: number;
  maxMse: number;
}

function simuliere(): Daten {
  const rngX = mulberry32(20250813);
  const xs = Array.from({ length: N }, () => A + (B_END - A) * rngX()).sort(
    (p, q) => p - q,
  );
  const fx = xs.map(f);

  const rngE = mulberry32(77002);
  const eps: Float64Array[] = [];
  for (let r = 0; r < R; r++) {
    const row = new Float64Array(N);
    for (let i = 0; i < N; i += 2) {
      const u1 = Math.max(rngE(), 1e-12);
      const u2 = rngE();
      const rad = Math.sqrt(-2 * Math.log(u1));
      row[i] = rad * Math.cos(2 * Math.PI * u2);
      if (i + 1 < N) row[i + 1] = rad * Math.sin(2 * Math.PI * u2);
    }
    eps.push(row);
  }
  const y0 = fx.map((v, i) => v + SIGMA * eps[0][i]);

  const laeufe: Lauf[] = [];
  for (let K = K_MIN; K <= K_MAX; K++) {
    const t = knotenVektor(K);
    const Bm = xs.map((x) => basis(t, K, x));
    const M = Array.from({ length: K }, () => new Float64Array(K));
    for (let i = 0; i < N; i++) {
      for (let a = 0; a < K; a++) {
        const ba = Bm[i][a];
        if (ba === 0) continue;
        for (let b = 0; b < K; b++) M[a][b] += ba * Bm[i][b];
      }
    }
    const L = cholesky(M, K);
    if (!L) continue;

    const summe = new Float64Array(N);
    const summeQuad = new Float64Array(N);
    const summeFehler = new Float64Array(N);
    const mittel = new Float64Array(K);
    const proben: Float64Array[] = [];
    for (let r = 0; r < R; r++) {
      const rhs = new Float64Array(K);
      for (let i = 0; i < N; i++) {
        const yi = fx[i] + SIGMA * eps[r][i];
        for (let a = 0; a < K; a++) rhs[a] += Bm[i][a] * yi;
      }
      const a = cholSolve(L, K, rhs);
      for (let k = 0; k < K; k++) mittel[k] += a[k] / R;
      if (r < PROBEN) proben.push(a);
      for (let i = 0; i < N; i++) {
        let v = 0;
        for (let k = 0; k < K; k++) v += a[k] * Bm[i][k];
        summe[i] += v;
        summeQuad[i] += v * v;
        summeFehler[i] += (v - fx[i]) * (v - fx[i]);
      }
    }
    let bias2 = 0;
    let varianz = 0;
    let mse = 0;
    for (let i = 0; i < N; i++) {
      const mit = summe[i] / R;
      bias2 += (mit - fx[i]) * (mit - fx[i]) / N;
      varianz += (summeQuad[i] / R - mit * mit) / N;
      mse += summeFehler[i] / R / N;
    }
    laeufe.push({
      K,
      bias2,
      varianz,
      mse,
      knoten: t.slice(Q + 1, t.length - Q - 1),
      proben,
      mittel,
    });
  }
  const besteK = laeufe.reduce((a, b) => (b.mse < a.mse ? b : a)).K;
  const maxMse = laeufe.reduce((a, b) => Math.max(a, b.mse), 0);
  return { xs, y0, laeufe, besteK, maxMse };
}

function fmt(v: number, d = 4): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  return v.toFixed(d).replace(".", ",").replace(/^-/, "−");
}

const W_A = 430;
const H_A = 225;
const PAD_A = { l: 34, r: 10, t: 10, b: 26 };
const W_B = 300;
const H_B = 118;
const W_C = 300;
const H_C = 186;
const PAD_C = { l: 46, r: 10, t: 10, b: 30 };

export function BiasVarianzExplorer() {
  const [K, setK] = useState(12);
  const daten = useMemo(simuliere, []);
  const lauf = daten.laeufe.find((l) => l.K === K) ?? daten.laeufe[0];

  const kurven = useMemo(() => {
    const t = knotenVektor(lauf.K);
    const G = 241;
    const gx = Array.from({ length: G }, (_, i) => A + ((B_END - A) * i) / (G - 1));
    const Bg = gx.map((x) => basis(t, lauf.K, x));
    const werte = (a: Float64Array) =>
      Bg.map((b) => {
        let v = 0;
        for (let k = 0; k < lauf.K; k++) v += a[k] * b[k];
        return v;
      });
    const proben = lauf.proben.map(werte);
    let ausbruch = 0;
    for (const ys of proben) for (const v of ys) ausbruch = Math.max(ausbruch, Math.abs(v));
    return {
      gx,
      proben,
      mittel: werte(lauf.mittel),
      ausbruch,
    };
  }, [lauf]);

  const px = (x: number) =>
    PAD_A.l + ((x - A) / (B_END - A)) * (W_A - PAD_A.l - PAD_A.r);
  const py = (y: number) =>
    PAD_A.t + ((Y_MAX - y) / (2 * Y_MAX)) * (H_A - PAD_A.t - PAD_A.b);
  const pfad = (ys: number[]) =>
    kurven.gx
      .map((x, i) => `${i === 0 ? "M" : "L"}${px(x).toFixed(1)} ${py(ys[i]).toFixed(1)}`)
      .join("");

  // rechte Tafel: log10-Verlauf ueber K
  const werteC = daten.laeufe.flatMap((l) => [
    Math.max(l.bias2, 1e-6),
    Math.max(l.varianz, 1e-6),
    Math.max(l.mse, 1e-6),
  ]);
  const loMin = Math.floor(Math.log10(Math.min(...werteC)));
  const loMax = Math.ceil(Math.log10(Math.max(...werteC)));
  const cx = (k: number) =>
    PAD_C.l + ((k - K_MIN) / (K_MAX - K_MIN)) * (W_C - PAD_C.l - PAD_C.r);
  const cy = (v: number) =>
    PAD_C.t +
    ((loMax - Math.log10(Math.max(v, 1e-6))) / (loMax - loMin)) *
      (H_C - PAD_C.t - PAD_C.b);
  const linie = (auswahl: (l: Lauf) => number) =>
    daten.laeufe
      .map((l, i) => `${i === 0 ? "M" : "L"}${cx(l.K).toFixed(1)} ${cy(auswahl(l)).toFixed(1)}`)
      .join("");

  const anteilBias = lauf.mse > 0 ? lauf.bias2 / lauf.mse : Number.NaN;
  const anteilVar = lauf.mse > 0 ? lauf.varianz / lauf.mse : Number.NaN;
  const theorieVar = (SIGMA * SIGMA * lauf.K) / N;
  const bestes = daten.laeufe.find((l) => l.K === daten.besteK) ?? lauf;
  const vielfaches = bestes.mse > 0 ? lauf.mse / bestes.mse : Number.NaN;

  const balken = (breite: number) => Math.max(0, Math.min(1, breite));
  const skalaB = lauf.mse > 0 ? lauf.mse : 1;
  const bx = 96;
  const bw = W_B - bx - 8;

  const plateau = daten.laeufe.filter((l) => l.mse <= 1.1 * bestes.mse).map((l) => l.K);
  const lueckenlos = plateau.every((k, i) => i === 0 || k === plateau[i - 1] + 1);
  const plateauText =
    plateau.length === 1
      ? `K = ${plateau[0]}`
      : lueckenlos
        ? `K = ${plateau[0]} bis ${plateau[plateau.length - 1]}`
        : `K = ${plateau.join(", ")}`;
  const varAbgleich =
    `Für die gemittelte Varianz sagt Satz 15.4.4 exakt σ²K/n = ${fmt(theorieVar)} voraus; ` +
    `unsere ${R} Wiederholungen schätzen ${fmt(lauf.varianz)}.`;
  const randHinweis =
    kurven.ausbruch > Y_MAX
      ? ` Die einzelnen Kurven verlassen dabei den Bildausschnitt (Spitze bei ` +
        `${fmt(kurven.ausbruch, 1)}, abgeschnitten bei ${fmt(Y_MAX, 1)}): Wo kaum Daten liegen, ` +
        `explodiert die punktweise Varianz aus Bemerkung 15.4.5.`
      : "";

  let status: string;
  if (!(vielfaches > 1.1)) {
    const kopf =
      lauf.K === daten.besteK
        ? `Bei K = ${lauf.K} ist der MSE unserer Simulation am kleinsten: ${fmt(lauf.mse)}.`
        : `K = ${lauf.K} liegt im flachen Bereich um das Minimum: MSE ${fmt(lauf.mse)}, das ` +
          `${fmt(vielfaches, 2)}-fache des besten Werts bei K = ${daten.besteK}.`;
    status =
      `${kopf} Vom MSE trägt der Bias hier nur noch ${fmt(anteilBias * 100, 1)} %, die Varianz ` +
      `${fmt(anteilVar * 100, 1)} %. Das Optimum liegt also nicht dort, wo beide Anteile gleich ` +
      `groß sind, sondern dort, wo eine weitere Verfeinerung mehr Varianz kostet als sie an Bias ` +
      `spart.${lauf.K === daten.besteK ? " Das liegt hier zufällig nahe beim Ein-Neuntel-Verhältnis des Proxy-Modells aus Bemerkung 15.4.7; allgemein erzwingt die Theorie diesen Anteil nicht." : ""} ` +
      `Innerhalb von zehn Prozent gleichwertig sind ${plateauText}. ${varAbgleich}`;
  } else if (lauf.K < daten.besteK && anteilBias > 0.5) {
    status =
      `K = ${lauf.K}: Der Bias trägt ${fmt(anteilBias * 100, 1)} % des MSE. Die zwölf Kurven links ` +
      `liegen dicht beieinander und weichen alle in dieselbe Richtung ab: Der Spline ist zu starr ` +
      `für f(x) = sin(3x). Das ist Unteranpassung. Der MSE ist das ${fmt(vielfaches, 1)}-fache des ` +
      `Minimums bei K = ${daten.besteK}. ${varAbgleich}`;
  } else if (lauf.K < daten.besteK) {
    status =
      `K = ${lauf.K}: Der Bias ist schon klein, aber noch nicht klein genug. Er trägt ` +
      `${fmt(anteilBias * 100, 1)} % des MSE, und der liegt beim ${fmt(vielfaches, 2)}-fachen des ` +
      `Minimums bei K = ${daten.besteK}. Links vom Optimum spart jede zusätzliche Basisfunktion ` +
      `noch mehr an Bias, als sie an Varianz kostet. ${varAbgleich}`;
  } else {
    status =
      `K = ${lauf.K}: Die Varianz trägt ${fmt(anteilVar * 100, 1)} % des MSE. Die zwölf Kurven links ` +
      `fächern auf, jede folgt ihrem eigenen Rauschen, während die dicke Mittelwertkurve über alle ` +
      `${R} Wiederholungen weiter auf f liegt. ` +
      `${vielfaches >= 2 ? "Das ist deutliche Überanpassung" : "Hier beginnt die Überanpassung"}: ` +
      `Der MSE ist das ${fmt(vielfaches, 1)}-fache des Minimums bei K = ${daten.besteK}.${randHinweis} ` +
      `${varAbgleich}`;
  }

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Setup wie auf der Folie: f(x) = sin(3x) auf [0, 2π] in Violett, n = 100 feste
        Stellen, σ = 0,3. Blau die Daten einer einzelnen Ziehung, orange die inneren Knoten,
        grün die Schätzer der ersten zwölf Wiederholungen; die dicke grüne Kurve ist der
        Mittelwert über alle {R}. Der Ausschnitt reicht von −2,2 bis 2,2; ab K = 30 laufen
        einzelne Kurven darüber hinaus, zuerst am rechten Rand. Alle Zahlen rechnet dieses Widget
        selbst; die Zufallszahlen stammen aus einem festen Startwert, es ist also bei jedem
        Aufruf dieselbe Simulation.
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
        <span className="w-10 shrink-0 font-mono text-xs">{lauf.K}</span>
      </label>

      <div className="flex flex-wrap gap-4">
        <svg
          width={W_A}
          height={H_A}
          viewBox={`0 0 ${W_A} ${H_A}`}
          className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <clipPath id="s154-clip">
            <rect
              x={PAD_A.l}
              y={PAD_A.t}
              width={W_A - PAD_A.l - PAD_A.r}
              height={H_A - PAD_A.t - PAD_A.b}
            />
          </clipPath>
          <rect
            x={PAD_A.l}
            y={PAD_A.t}
            width={W_A - PAD_A.l - PAD_A.r}
            height={H_A - PAD_A.t - PAD_A.b}
            fill="none"
            stroke={RAHMEN}
            strokeWidth={0.8}
          />
          {[
            { v: 0, s: "0" },
            { v: Math.PI, s: "π" },
            { v: B_END, s: "2π" },
          ].map((t) => (
            <g key={t.s}>
              <line
                x1={px(t.v)}
                x2={px(t.v)}
                y1={H_A - PAD_A.b}
                y2={H_A - PAD_A.b + 3}
                stroke={ACHSE}
              />
              <text
                x={px(t.v)}
                y={H_A - PAD_A.b + 14}
                textAnchor="middle"
                fontSize={9}
                fill={ACHSE}
              >
                {t.s}
              </text>
            </g>
          ))}
          {[-2, -1, 0, 1, 2].map((t) => (
            <g key={`y${t}`}>
              <line x1={PAD_A.l - 3} x2={PAD_A.l} y1={py(t)} y2={py(t)} stroke={ACHSE} />
              <text x={PAD_A.l - 5} y={py(t) + 3} textAnchor="end" fontSize={9} fill={ACHSE}>
                {String(t).replace("-", "−")}
              </text>
            </g>
          ))}
          <line
            x1={PAD_A.l}
            x2={W_A - PAD_A.r}
            y1={py(0)}
            y2={py(0)}
            stroke={ACHSE}
            strokeWidth={0.8}
          />
          <text x={W_A - PAD_A.r - 4} y={H_A - PAD_A.b + 14} textAnchor="end" fontSize={9} fill={ACHSE}>
            x
          </text>
          <g clipPath="url(#s154-clip)">
            {daten.xs.map((x, i) => (
              <circle key={`d${i}`} cx={px(x)} cy={py(daten.y0[i])} r={1.7} fill={BLAU} opacity={0.75} />
            ))}
            {kurven.proben.map((ys, i) => (
              <path key={`p${i}`} d={pfad(ys)} fill="none" stroke={GRUEN} strokeWidth={0.9} opacity={0.4} />
            ))}
            <path d={pfad(kurven.mittel)} fill="none" stroke={GRUEN} strokeWidth={2.4} />
            <path
              d={kurven.gx
                .map((x, i) => `${i === 0 ? "M" : "L"}${px(x).toFixed(1)} ${py(f(kurven.gx[i])).toFixed(1)}`)
                .join("")}
              fill="none"
              stroke={VIOLETT}
              strokeWidth={2}
              strokeDasharray="6 3"
            />
          </g>
          {lauf.knoten.map((k) => (
            <line
              key={`k${k}`}
              x1={px(k)}
              x2={px(k)}
              y1={H_A - PAD_A.b - 6}
              y2={H_A - PAD_A.b}
              stroke={ORANGE}
              strokeWidth={1.6}
            />
          ))}
          <text x={PAD_A.l + 4} y={PAD_A.t + 11} fontSize={10} fill={VIOLETT}>
            f
          </text>
          <text x={PAD_A.l + 16} y={PAD_A.t + 11} fontSize={10} fill={GRUEN}>
            Schätzer
          </text>
        </svg>

        <div className="grow space-y-2">
          <svg
            width={W_B}
            height={H_B}
            viewBox={`0 0 ${W_B} ${H_B}`}
            className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <text x={8} y={16} fontSize={10} fill={ACHSE}>
              Anteile am MSE bei K = {lauf.K}
            </text>
            <g>
              <text x={bx - 6} y={42} textAnchor="end" fontSize={10} fill={ROT}>
                Bias²
              </text>
              <rect x={bx} y={32} width={bw * balken(lauf.bias2 / skalaB)} height={13} fill={ROT} />
              <text x={bx + 4} y={42} fontSize={9} fill={GRAU}>
                {fmt(lauf.bias2)}
              </text>
            </g>
            <g>
              <text x={bx - 6} y={68} textAnchor="end" fontSize={10} fill={GRUEN}>
                Varianz
              </text>
              <rect x={bx} y={58} width={bw * balken(lauf.varianz / skalaB)} height={13} fill={GRUEN} />
              <text x={bx + 4} y={68} fontSize={9} fill={GRAU}>
                {fmt(lauf.varianz)}
              </text>
            </g>
            <g>
              <text x={bx - 6} y={94} textAnchor="end" fontSize={10} fill={GRAU}>
                MSE
              </text>
              <rect x={bx} y={84} width={bw * balken(lauf.bias2 / skalaB)} height={13} fill={ROT} />
              <rect
                x={bx + bw * balken(lauf.bias2 / skalaB)}
                y={84}
                width={bw * balken(lauf.varianz / skalaB)}
                height={13}
                fill={GRUEN}
              />
              <text x={bx + 4} y={94} fontSize={9} fill="#ffffff">
                {fmt(lauf.mse)}
              </text>
            </g>
            <text x={8} y={H_B - 5} fontSize={8.5} fill={ACHSE}>
              Der MSE-Balken ist immer voll ausgezogen; die Zahlen sind absolut.
            </text>
          </svg>

          <svg
            width={W_C}
            height={H_C}
            viewBox={`0 0 ${W_C} ${H_C}`}
            className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <rect
              x={PAD_C.l}
              y={PAD_C.t}
              width={W_C - PAD_C.l - PAD_C.r}
              height={H_C - PAD_C.t - PAD_C.b}
              fill="none"
              stroke={RAHMEN}
              strokeWidth={0.8}
            />
            {Array.from({ length: loMax - loMin + 1 }, (_, i) => loMin + i).map((l) => (
              <g key={`g${l}`}>
                <line x1={PAD_C.l} x2={W_C - PAD_C.r} y1={cy(Math.pow(10, l))} y2={cy(Math.pow(10, l))} stroke={RAHMEN} />
                <text x={PAD_C.l - 5} y={cy(Math.pow(10, l)) + 3} textAnchor="end" fontSize={8} fill={ACHSE}>
                  10{l < 0 ? "⁻" : ""}
                  {String(Math.abs(l))
                    .split("")
                    .map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(c)])
                    .join("")}
                </text>
              </g>
            ))}
            {[K_MIN, 10, 20, 30, K_MAX].map((k) => (
              <text key={`x${k}`} x={cx(k)} y={H_C - PAD_C.b + 13} textAnchor="middle" fontSize={9} fill={ACHSE}>
                {k}
              </text>
            ))}
            <text x={(PAD_C.l + W_C - PAD_C.r) / 2} y={H_C - 4} textAnchor="middle" fontSize={9} fill={ACHSE}>
              Basisfunktionen K
            </text>
            <line
              x1={cx(lauf.K)}
              x2={cx(lauf.K)}
              y1={PAD_C.t}
              y2={H_C - PAD_C.b}
              stroke={ACHSE}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <path d={linie((l) => l.bias2)} fill="none" stroke={ROT} strokeWidth={1.6} />
            <path d={linie((l) => l.varianz)} fill="none" stroke={GRUEN} strokeWidth={1.6} />
            <path d={linie((l) => l.mse)} fill="none" stroke={GRAU} strokeWidth={2} />
            <circle cx={cx(daten.besteK)} cy={cy(bestes.mse)} r={4} fill="none" stroke={GRAU} strokeWidth={1.8} />
            <text x={PAD_C.l + 5} y={PAD_C.t + 11} fontSize={8.5} fill={GRAU}>
              MSE (grau) = Bias² (rot) + Varianz (grün)
            </text>
          </svg>
        </div>
      </div>

      <p className="max-w-prose text-sm text-slate-700 dark:text-slate-300">{status}</p>
    </div>
  );
}
