import { useState } from "react";
import { Aufgabe, FMM_COLORS, M, Slider, Verdikt } from "../../../lib";

/**
 * §14.3: Monombasis und die Kondition der Vandermonde-Matrix.
 *
 * Rechen- und SVG-CODE portiert aus der privaten Buch-App
 * heath-ch7/src/sections/S73.tsx (MonomialFigure, CondChart,
 * VandermondeCondWidget). Saemtliche Texte, Beschriftungen, Statuszeilen und
 * Zahlformate sind fuer dieses Skript NEU geschrieben (App-Prosa ist
 * buchadaptiert und im oeffentlichen Repo verboten); zusaetzlich eine dritte
 * Kurve (Chebyshev-Polynome als Basis) und die Winkel-Readouts, die es in
 * der Quelle nicht gibt.
 *
 * Verifiziert mit node (check-s143.mjs / check3-s143.mjs, 2026-08-13),
 * n aequidistante Stellen, kappa_2 ueber die explizit berechnete Inverse:
 *   n =  5: Monom [0,1] 6,86e2 | Monom [-1,1] 2,35e1 | Chebyshev 2,22
 *   n = 10: 1,52e7 | 4,63e3 | 1,46e1
 *   n = 15: 4,03e11 | 1,10e6 | 2,26e2
 *   n = 20: 1,09e16 | 2,72e8 | 4,85e3
 * Winkel benachbarter Monom-Spalten bei n = 10 auf [0,1]:
 *   (b_1, b_2) 32,55 Grad, (b_5, b_6) 5,47 Grad, (b_9, b_10) 2,72 Grad.
 *
 * Farbcode Kapitel 14: Basisfunktionen orange, Problemzonen rot.
 * R5-Nachprüfung: verify/R5/verify-r5-claims.mjs, 2026-08-20.
 */

const { orange: ORANGE, rot: ROT, grau: NEUTRAL } = FMM_COLORS;

/* ------------------------------------------------------------------ */
/* Numerik                                                             */
/* ------------------------------------------------------------------ */

/** Gauss-Elimination mit Spaltenpivotierung; null bei singulaerer Matrix. */
function loese(Ain: number[][], bin: number[]): number[] | null {
  const n = Ain.length;
  const A = Ain.map((row, i) => [...row, bin[i]]);
  for (let sp = 0; sp < n; sp++) {
    let piv = sp;
    for (let r = sp + 1; r < n; r++) {
      if (Math.abs(A[r][sp]) > Math.abs(A[piv][sp])) piv = r;
    }
    if (Math.abs(A[piv][sp]) < 1e-300) return null;
    if (piv !== sp) [A[piv], A[sp]] = [A[sp], A[piv]];
    for (let r = sp + 1; r < n; r++) {
      const m = A[r][sp] / A[sp][sp];
      for (let c = sp; c <= n; c++) A[r][c] -= m * A[sp][c];
    }
  }
  const x: number[] = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = A[r][n];
    for (let c = r + 1; c < n; c++) s -= A[r][c] * x[c];
    x[r] = s / A[r][r];
  }
  return x;
}

function inverse(A: number[][]): number[][] | null {
  const n = A.length;
  const spalten: number[][] = [];
  for (let j = 0; j < n; j++) {
    const e: number[] = new Array(n).fill(0);
    e[j] = 1;
    const x = loese(A, e);
    if (!x) return null;
    spalten.push(x);
  }
  return A.map((_row, i) => spalten.map((s) => s[i]));
}

/** Spektralnorm ueber die Potenzmethode auf A^T A. */
function spektralnorm(A: number[][]): number {
  const n = A.length;
  const m = A[0].length;
  let v: number[] = new Array(m).fill(1 / Math.sqrt(m));
  for (let it = 0; it < 400; it++) {
    const Av = A.map((r) => r.reduce((s, x, j) => s + x * v[j], 0));
    const w: number[] = new Array(m).fill(0);
    for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) w[j] += A[i][j] * Av[i];
    const nw = Math.hypot(...w);
    if (!Number.isFinite(nw) || nw === 0) break;
    const neu = w.map((x) => x / nw);
    const diff = Math.hypot(...neu.map((x, i) => x - v[i]));
    v = neu;
    if (diff < 1e-14) break;
  }
  const Av = A.map((r) => r.reduce((s, x, j) => s + x * v[j], 0));
  return Math.hypot(...Av);
}

const stellen = (n: number, a: number, b: number) =>
  Array.from({ length: n }, (_, i) => (n === 1 ? (a + b) / 2 : a + ((b - a) * i) / (n - 1)));

/** Chebyshev-Polynom T_k ueber die Drei-Term-Rekursion. */
function chebT(k: number, t: number): number {
  if (k === 0) return 1;
  let a = 1;
  let b = t;
  for (let i = 1; i < k; i++) {
    const c = 2 * t * b - a;
    a = b;
    b = c;
  }
  return b;
}

type BasisId = "monom01" | "monom11" | "cheb";

const BASEN: { id: BasisId; name: string; kurz: string; dash: string }[] = [
  { id: "monom01", name: "Monome auf [0, 1]", kurz: "Monome [0, 1]", dash: "" },
  { id: "monom11", name: "Monome auf [−1, 1]", kurz: "Monome [−1, 1]", dash: "7 4" },
  { id: "cheb", name: "Chebyshev-Polynome auf [−1, 1]", kurz: "Chebyshev", dash: "2 3" },
];

function basisMatrix(id: BasisId, n: number): number[][] {
  if (id === "monom01") {
    return stellen(n, 0, 1).map((x) => Array.from({ length: n }, (_, j) => x ** j));
  }
  if (id === "monom11") {
    return stellen(n, -1, 1).map((x) => Array.from({ length: n }, (_, j) => x ** j));
  }
  return stellen(n, -1, 1).map((x) => Array.from({ length: n }, (_, j) => chebT(j, x)));
}

function kappa2(id: BasisId, n: number): number {
  const B = basisMatrix(id, n);
  const Bi = inverse(B);
  if (!Bi) return Infinity;
  return spektralnorm(B) * spektralnorm(Bi);
}

const N_MIN = 2;
const N_MAX = 20;
const N_LISTE: number[] = [];
for (let n = N_MIN; n <= N_MAX; n++) N_LISTE.push(n);

const KAPPA: Record<BasisId, number[]> = {
  monom01: N_LISTE.map((n) => kappa2("monom01", n)),
  monom11: N_LISTE.map((n) => kappa2("monom11", n)),
  cheb: N_LISTE.map((n) => kappa2("cheb", n)),
};

/** Winkel (in Grad) zwischen zwei benachbarten Spalten der Monom-Matrix. */
function spaltenwinkel(n: number, j: number): number {
  const B = basisMatrix("monom01", n);
  const sp = (k: number) => B.map((r) => r[k]);
  const u = sp(j);
  const v = sp(j + 1);
  const zaehler = u.reduce((s, x, i) => s + x * v[i], 0);
  const nenner = Math.hypot(...u) * Math.hypot(...v);
  if (nenner === 0) return NaN;
  return (Math.acos(Math.min(1, zaehler / nenner)) * 180) / Math.PI;
}

/* ------------------------------------------------------------------ */
/* Zahlformate (deutsch; undefiniert von unendlich trennen)            */
/* ------------------------------------------------------------------ */

function fmtKappa(c: number): string {
  if (Number.isNaN(c)) return "undefiniert";
  if (!Number.isFinite(c)) return "∞";
  // Kleine Werte lesbar ausschreiben statt als 2,2 · 10^0.
  if (c < 100) return c.toFixed(c < 10 ? 2 : 1).replace(".", ",");
  let e = Math.floor(Math.log10(c));
  let m = c / 10 ** e;
  // Rundungsdrift: log10 kann bei exakten Zehnerpotenzen knapp darunter liegen.
  if (m >= 9.95) {
    m /= 10;
    e += 1;
  }
  return `${m.toFixed(1).replace(".", ",")} · 10^${e}`;
}

function fmt(v: number, d = 1): string {
  if (Number.isNaN(v)) return "undefiniert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  return v.toFixed(d).replace(".", ",").replace(/^-/, "−");
}

/* ------------------------------------------------------------------ */
/* Bild 1: die ersten acht Monome auf [0, 1]                            */
/* ------------------------------------------------------------------ */

export function MonombasisFigur() {
  const W = 440;
  const H = 280;
  const L = 46;
  const R = 16;
  const T = 12;
  const B = 36;
  const w = W - L - R;
  const h = H - T - B;
  const px = (t: number) => L + t * w;
  const py = (y: number) => T + (1 - y) * h;
  const kurven: string[] = [];
  for (let k = 0; k <= 7; k++) {
    const pts: string[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      pts.push(`${px(t).toFixed(1)},${py(t ** k).toFixed(1)}`);
    }
    kurven.push(pts.join(" "));
  }
  const marken: { text: string; t: number; k: number; dy: number }[] = [
    { text: "1", t: 0.42, k: 0, dy: 14 },
    { text: "x", t: 0.38, k: 1, dy: -6 },
    { text: "x²", t: 0.56, k: 2, dy: -6 },
    { text: "x³", t: 0.68, k: 3, dy: -6 },
    { text: "x⁷", t: 0.93, k: 7, dy: 14 },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="max-w-full h-auto"
      role="img"
      aria-label="Die ersten acht Monome auf dem Einheitsintervall"
    >
      <rect x={L} y={T} width={w} height={h} className="fill-none stroke-slate-400" />
      {[0, 0.5, 1].map((t) => (
        <g key={`x${t}`}>
          <line x1={px(t)} y1={py(0)} x2={px(t)} y2={py(0) + 4} className="stroke-slate-400" />
          <text
            x={px(t)}
            y={py(0) + 16}
            textAnchor="middle"
            fontSize={11}
            fill={NEUTRAL}
          >
            {fmt(t, 1)}
          </text>
        </g>
      ))}
      {[0, 0.5, 1].map((y) => (
        <g key={`y${y}`}>
          <line x1={L - 4} y1={py(y)} x2={L} y2={py(y)} className="stroke-slate-400" />
          <text x={L - 7} y={py(y) + 4} textAnchor="end" fontSize={11} fill={NEUTRAL}>
            {fmt(y, 1)}
          </text>
        </g>
      ))}
      {kurven.map((pts, k) => (
        <polyline
          key={k}
          points={pts}
          fill="none"
          stroke={ORANGE}
          strokeWidth={k === 0 ? 1.8 : 1.2}
        />
      ))}
      {marken.map(({ text, t, k, dy }) => (
        <text
          key={text}
          x={px(t)}
          y={py(t ** k) + dy}
          textAnchor="middle"
          fontSize={12}
          fill={ORANGE}
        >
          {text}
        </text>
      ))}
      <text x={L + w / 2} y={H - 3} textAnchor="middle" fontSize={11} fill={NEUTRAL}>
        x →
      </text>
      <text
        x={14}
        y={T + h / 2}
        textAnchor="middle"
        fontSize={11}
        fill={NEUTRAL}
        transform={`rotate(-90 14 ${T + h / 2})`}
      >
        φₖ(x) ↑
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Bild 2: Konditionszahl gegen n, halblogarithmisch                    */
/* ------------------------------------------------------------------ */

function KonditionsChart({ n, aktiv }: { n: number; aktiv: BasisId }) {
  const W = 460;
  const H = 250;
  const L = 52;
  const R = 14;
  const T = 14;
  const B = 40;
  const w = W - L - R;
  const h = H - T - B;
  const yMax = 18;
  const px = (nn: number) => L + ((nn - N_MIN) / (N_MAX - N_MIN)) * w;
  const py = (lg: number) => T + (1 - Math.min(Math.max(lg, 0), yMax) / yMax) * h;
  const linie = (werte: number[]) =>
    N_LISTE.map((nn, i) => {
      const lg = Number.isFinite(werte[i]) ? Math.log10(werte[i]) : yMax;
      return `${px(nn).toFixed(1)},${py(lg).toFixed(1)}`;
    }).join(" ");
  const idx = n - N_MIN;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="max-w-full h-auto"
      role="img"
      aria-label="Konditionszahl der Basismatrix gegen die Zahl der Stellen, logarithmische Achse"
    >
      <rect x={L} y={T} width={w} height={h} className="fill-none stroke-slate-400" />
      {[0, 4, 8, 12, 16].map((lg) => (
        <g key={lg}>
          <line
            x1={L}
            y1={py(lg)}
            x2={L + w}
            y2={py(lg)}
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeDasharray="2 3"
          />
          <text x={L - 6} y={py(lg) + 4} textAnchor="end" fontSize={10} fill={NEUTRAL}>
            {`10^${lg}`}
          </text>
        </g>
      ))}
      <line x1={L} y1={py(16)} x2={L + w} y2={py(16)} stroke={ROT} strokeDasharray="6 4" />
      <text x={L + w - 4} y={py(16) - 5} textAnchor="end" fontSize={10} fill={ROT}>
        1/ε ≈ 10^16: doppelte Genauigkeit aufgebraucht
      </text>
      {N_LISTE.filter((nn) => nn % 2 === 0).map((nn) => (
        <text key={nn} x={px(nn)} y={T + h + 15} textAnchor="middle" fontSize={10} fill={NEUTRAL}>
          {nn}
        </text>
      ))}
      <text x={L + w / 2} y={H - 4} textAnchor="middle" fontSize={11} fill={NEUTRAL}>
        n (Zahl der Stellen) →
      </text>
      <text
        x={14}
        y={T + h / 2}
        textAnchor="middle"
        fontSize={11}
        fill={NEUTRAL}
        transform={`rotate(-90 14 ${T + h / 2})`}
      >
        κ₂(B) ↑
      </text>
      {BASEN.map((b) => (
        <polyline
          key={b.id}
          points={linie(KAPPA[b.id])}
          fill="none"
          stroke={ORANGE}
          strokeWidth={b.id === aktiv ? 2.6 : 1.3}
          strokeDasharray={b.dash || undefined}
          opacity={b.id === aktiv ? 1 : 0.55}
        />
      ))}
      <line
        x1={px(n)}
        y1={T}
        x2={px(n)}
        y2={T + h}
        className="stroke-slate-400"
        strokeDasharray="3 3"
      />
      {BASEN.map((b) => {
        const v = KAPPA[b.id][idx];
        const lg = Number.isFinite(v) ? Math.log10(v) : yMax;
        return (
          <circle
            key={b.id}
            cx={px(n)}
            cy={py(lg)}
            r={b.id === aktiv ? 4.5 : 3}
            fill={ORANGE}
            opacity={b.id === aktiv ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Widget: Kondition der Basismatrix                                    */
/* ------------------------------------------------------------------ */

export function VandermondeKondition() {
  const [n, setN] = useState(10);
  const [aktiv, setAktiv] = useState<BasisId>("monom01");

  const idx = n - N_MIN;
  const k = KAPPA[aktiv][idx];
  const kMonom = KAPPA.monom01[idx];
  const verlorene = Number.isFinite(k) ? Math.min(16, Math.log10(k)) : 16;
  const winkelErst = spaltenwinkel(n, 0);
  const winkelLetzt = n >= 3 ? spaltenwinkel(n, n - 2) : NaN;
  const name = BASEN.find((b) => b.id === aktiv)!.name;

  const status =
    n < 3
      ? `Mit ${n} Stellen ist die Basismatrix winzig, und alle drei Systeme sind unbedenklich.`
      : verlorene >= 15.5
        ? `${name}: Bei ${n} Stellen frisst die Konditionszahl rechnerisch alle rund 16 Stellen, die doppelte Genauigkeit hergibt. Das gelöste System hat mit dem gemeinten nichts mehr zu tun.`
        : verlorene >= 6
          ? `${name}: Von den rund 16 sicheren Dezimalstellen sind bei ${n} Stellen etwa ${fmt(verlorene, 1)} in Gefahr, es bleiben ungefähr ${fmt(16 - verlorene, 1)} übrig. Das ist keine Kleinigkeit mehr.`
          : `${name}: Bei ${n} Stellen sind rund ${fmt(verlorene, 1)} der etwa 16 sicheren Dezimalstellen in Gefahr, das ist noch harmlos.`;

  return (
    <div className="my-2 text-sm">
      <Aufgabe>Vergleichen wir die drei Basen und erhöhen dann die Zahl der Stellen.</Aufgabe>
      <p className="mb-2">
        Zu <M>{"n"}</M> gleichmäßig verteilten Stellen bauen wir die
        <M>{"\\,n \\times n"}</M>-Basismatrix <M>{"\\bB"}</M> und schätzen ihre
        Konditionszahl <M>{"\\kappa_2(\\bB)"}</M> über die explizit berechnete
        Inverse. Drei Basissysteme desselben Ansatzraums stehen zur Wahl. Die
        senkrechte Achse ist logarithmisch: Beide Monom-Kurven sind ungefähr
        Geraden, ihre Konditionszahl wächst also exponentiell in <M>{"n"}</M>.
        Verschieben und Skalieren auf <M>{"[-1, 1]"}</M> drückt nur die
        Steigung, die Chebyshev-Polynome drücken sie noch einmal deutlich
        stärker.
      </p>

      <div className="mb-1 flex flex-wrap items-center gap-2">
        {BASEN.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setAktiv(b.id)}
            className={`rounded border px-2 py-1 ${
              aktiv === b.id
                ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
                : "border-slate-300 dark:border-slate-600"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      <Slider
        label="n (Zahl der Stellen)"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={N_MIN}
        max={N_MAX}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />

      <div className="my-2 grid gap-2 sm:grid-cols-3">
        {BASEN.map((b) => (
          <div
            key={b.id}
            className={`rounded p-2 ${
              aktiv === b.id ? "bg-slate-200 dark:bg-slate-700" : "bg-slate-100 dark:bg-slate-800"
            }`}
          >
            <p className="font-semibold" style={{ color: ORANGE }}>
              {b.kurz}
            </p>
            <p className="font-mono text-xs">κ₂ ≈ {fmtKappa(KAPPA[b.id][idx])}</p>
          </div>
        ))}
      </div>

      <KonditionsChart n={n} aktiv={aktiv} />

      <p className="mt-2 font-mono text-xs">
        n = {n}, Polynomgrad {n - 1}: κ₂ ≈ {fmtKappa(k)}
      </p>
      <Verdikt kind={aktiv === "monom01" && n >= 15 ? "warn" : "neutral"}>{status}</Verdikt>
      {n >= 3 ? (
        <p className="mt-1">
          {aktiv === "monom01"
            ? "Woher das kommt, zeigen die Spalten dieser Matrix direkt: "
            : "Woran die Monombasis krankt, zeigen ihre Spalten auf dem Einheitsintervall direkt: "}
          Die ersten beiden schließen einen Winkel von{" "}
          <span className="font-mono">{fmt(winkelErst, 1)}°</span> ein, die
          letzten beiden nur noch{" "}
          <span className="font-mono">{fmt(winkelLetzt, 1)}°</span>
          {winkelLetzt < 6
            ? ". So dicht beieinander sind sie kaum noch zu unterscheiden, und die Konditionszahl setzt dieser Ähnlichkeit eine Zahl entgegen."
            : ". Mit wachsendem n rücken sie weiter zusammen."}
          {aktiv === "monom01" ? (
            ""
          ) : (
            <>
              {" "}
              Sie steht bei diesem <M>{"n"}</M> bei κ₂ ≈ {fmtKappa(kMonom)},
              das gewählte System bei κ₂ ≈ {fmtKappa(k)}.
            </>
          )}
        </p>
      ) : (
        <p className="mt-1">
          Bei zwei Stellen hat die Monom-Matrix nur die Spalten{" "}
          <M>{"\\bb_1"}</M> und <M>{"\\bb_2"}</M>, und die schließen einen
          Winkel von <span className="font-mono">{fmt(winkelErst, 1)}°</span>{" "}
          ein. Erst mit mehr Stellen rücken benachbarte Spalten zusammen, und
          die Konditionszahl zieht an.
        </p>
      )}
      <p className="mt-1 text-xs" style={{ color: NEUTRAL }}>
        Die Werte sind Größenordnungen und hängen von der Norm und von der Lage
        der Stellen ab; jenseits von <M>{"\\kappa_2 \\approx 10^{16}"}</M> ist
        die Rechnung, die sie ausgibt, selbst schon vom Rundungsfehler
        gezeichnet.
      </p>
    </div>
  );
}
