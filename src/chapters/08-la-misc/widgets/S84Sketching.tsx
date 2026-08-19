import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, LabeledPlot, Slider, Verdikt, fmtDe, mulberry32, randn, useSeed } from "../../../lib";
import type { Series } from "../../../lib";

/**
 * Einsicht: Eine einzelne Gauss-Skizze schwankt, und ihre typische
 * Distanzabweichung fällt nur mit 1/sqrt(2m).
 * Farbrollen Kapitel 8: Originaldaten grün, Skizze blau, Distanzfehler rot,
 * Winkelabweichung violett, Faustregel/Rate orange.
 * Provenienz: Eigenbau, keine portierte Prosa; Zufall über useSeed/mulberry32.
 *
 * Zwei FESTE Vektoren x, y aus R^200 (unten eingebettet, einmalig mit einem
 * LCG als Unif(0,1)-Stichprobe gezogen und auf drei Stellen gerundet) werden
 * mit einer Gauss-Sketchmatrix S in den R^m geschickt. Die Matrix kommt aus
 * einem seeded PRNG (mulberry32 + Box-Muller); im Render steckt KEIN
 * unseeded Zufall; der Knopf „neu ziehen" erhöht nur den Seed-Zähler.
 *
 * Die Zeilen von S werden EINMAL je Ziehung gezogen; der Slider m benutzt die
 * ersten m davon (Skalierung 1/sqrt(m)). Dadurch ist die Kurve im Plot EIN
 * Pfad und keine Folge unabhaengiger Experimente - das steht auch in der
 * Bildunterschrift.
 *
 * Alle Kennzahlen sind per node nachgerechnet: ||x - y|| = 5,6954,
 * Winkel(x, y) = 41,714 Grad. Fuer Gauss-Skizzen ist ||Sz||^2/||z||^2 exakt
 * chi^2_m/m-verteilt; die Standardabweichung der relativen Abstands-
 * Abweichung ist damit 9,97 % bei m = 50 und 7,06 % bei m = 100, also
 * praktisch die Faustregel 1/sqrt(2m) (10,00 % bzw. 7,07 %). Das Band
 * +-1/sqrt(2m) faengt rund 68 % der Ziehungen (4000 Ziehungen: 68,2 %).
 * Verifiziert in scratchpad/verify-08-la-misc/check-widgets.mjs, 2026-08-19.
 */

const { gruen: GREEN, blau: BLUE, rot: RED, orange: ORANGE, violett: PURPLE, grau: GREY } = FMM_COLORS;

const X: number[] = [
  0.791, 0.486, 0.999, 0.080, 0.216, 0.082, 0.885, 0.405, 0.088, 0.313,
  0.205, 0.645, 0.935, 0.517, 0.676, 0.980, 0.815, 0.153, 0.756, 0.113,
  0.523, 0.727, 0.617, 0.910, 0.538, 0.839, 0.051, 0.694, 0.918, 0.976,
  0.647, 0.451, 0.577, 0.949, 0.803, 0.468, 0.681, 0.113, 0.406, 0.166,
  0.075, 0.753, 0.261, 0.148, 0.979, 0.294, 0.600, 0.720, 0.384, 0.207,
  0.231, 0.412, 0.868, 0.762, 0.186, 0.248, 0.763, 0.021, 0.914, 0.799,
  0.905, 0.697, 0.366, 0.272, 0.388, 0.789, 0.554, 0.158, 0.059, 0.120,
  0.391, 0.194, 0.673, 0.173, 0.909, 0.670, 0.941, 0.866, 0.181, 0.337,
  0.905, 0.157, 0.515, 0.427, 0.346, 0.616, 0.759, 0.565, 0.192, 0.363,
  0.785, 0.573, 0.104, 0.996, 0.494, 0.449, 0.722, 0.426, 0.902, 0.012,
  0.248, 0.729, 0.155, 0.009, 0.337, 0.434, 0.533, 0.673, 0.491, 0.863,
  0.784, 0.011, 0.414, 0.432, 0.358, 0.340, 0.021, 0.047, 0.375, 0.826,
  0.068, 0.982, 0.404, 0.048, 0.598, 0.883, 0.371, 0.857, 0.655, 0.794,
  0.196, 0.034, 0.975, 0.331, 0.965, 0.524, 0.600, 0.414, 0.724, 0.256,
  0.626, 0.179, 0.227, 0.813, 0.529, 0.975, 0.212, 0.475, 0.783, 0.578,
  0.029, 0.388, 0.715, 0.014, 0.709, 0.894, 0.797, 0.637, 0.792, 0.263,
  0.843, 0.346, 0.492, 0.366, 0.796, 0.082, 0.042, 0.039, 0.075, 0.004,
  0.274, 0.161, 0.669, 0.975, 0.782, 0.706, 0.442, 0.246, 0.233, 0.295,
  0.353, 0.498, 0.667, 0.999, 0.534, 0.609, 0.847, 0.422, 0.441, 0.800,
  0.005, 0.324, 0.518, 0.047, 0.547, 0.294, 0.095, 0.904, 0.560, 0.248,
];

const Y: number[] = [
  0.452, 0.115, 0.180, 0.770, 0.274, 0.676, 0.172, 0.542, 0.926, 0.218,
  0.280, 0.405, 0.277, 0.862, 0.189, 0.795, 0.005, 0.934, 0.163, 0.586,
  0.596, 0.181, 0.710, 0.589, 0.492, 0.382, 0.821, 0.241, 0.082, 0.484,
  0.643, 0.233, 0.499, 0.668, 0.639, 0.105, 0.422, 0.974, 0.575, 0.064,
  0.331, 0.383, 0.916, 0.550, 0.931, 0.491, 0.448, 0.306, 0.684, 0.170,
  0.209, 0.978, 0.658, 0.855, 0.062, 0.496, 0.154, 0.347, 0.479, 0.775,
  0.798, 0.276, 0.374, 0.469, 0.062, 0.604, 0.054, 0.830, 0.422, 0.827,
  0.621, 0.907, 0.585, 0.746, 0.406, 0.617, 0.519, 0.970, 0.251, 0.451,
  0.206, 0.514, 0.738, 0.831, 0.349, 0.160, 0.667, 0.374, 0.471, 0.458,
  0.386, 0.600, 0.110, 0.499, 0.783, 0.819, 0.066, 0.879, 0.029, 0.249,
  0.911, 0.456, 0.394, 0.594, 0.196, 0.830, 0.717, 0.631, 0.073, 0.652,
  0.357, 0.539, 0.286, 0.180, 0.707, 0.019, 0.722, 0.704, 0.586, 0.444,
  0.990, 0.742, 0.113, 0.564, 0.714, 0.138, 0.858, 0.539, 0.513, 0.462,
  0.374, 0.305, 0.856, 0.351, 0.431, 0.542, 0.247, 0.670, 0.522, 0.760,
  0.452, 0.653, 0.479, 0.271, 0.714, 0.396, 0.274, 0.059, 0.156, 0.357,
  0.332, 0.815, 0.833, 0.746, 0.934, 0.653, 0.134, 0.941, 0.537, 0.274,
  0.484, 0.341, 0.099, 0.585, 0.549, 0.265, 0.722, 0.055, 0.401, 0.821,
  0.195, 0.311, 0.345, 0.857, 0.282, 0.737, 0.361, 0.406, 0.805, 0.104,
  0.358, 0.256, 0.872, 0.488, 0.702, 0.529, 0.823, 0.997, 0.723, 0.426,
  0.712, 0.060, 0.138, 0.517, 0.420, 0.313, 0.612, 0.218, 0.709, 0.331,
];

const N = X.length;
const MMAX = 100;
const SEED0 = 118;

function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

const NORM_X = Math.sqrt(dot(X, X));
const NORM_Y = Math.sqrt(dot(Y, Y));
const DIFF = X.map((v, i) => v - Y[i]);
const DIST = Math.sqrt(dot(DIFF, DIFF));
const WINKEL = Math.acos(dot(X, Y) / (NORM_X * NORM_Y));

interface Zeile {
  m: number;
  dist: number;
  winkel: number;
  distAbw: number; // relative Abweichung in Prozent
  winkelAbw: number;
}

/** Zieht MMAX Zeilen und wertet alle Praefixe m = 1, ..., MMAX aus. */
function ziehung(seed: number): Zeile[] {
  const g = mulberry32(seed);
  const out: Zeile[] = [];
  let sxx = 0;
  let syy = 0;
  let sxy = 0;
  let sdd = 0;
  for (let m = 1; m <= MMAX; m++) {
    let ax = 0;
    let ay = 0;
    for (let j = 0; j < N; j++) {
      const e = randn(g);
      ax += e * X[j];
      ay += e * Y[j];
    }
    sxx += ax * ax;
    syy += ay * ay;
    sxy += ax * ay;
    sdd += (ax - ay) * (ax - ay);
    const dist = Math.sqrt(sdd / m);
    const cos = Math.max(-1, Math.min(1, sxy / Math.sqrt(sxx * syy)));
    const winkel = Math.acos(cos);
    out.push({
      m,
      dist,
      winkel,
      distAbw: (dist / DIST - 1) * 100,
      winkelAbw: (winkel / WINKEL - 1) * 100,
    });
  }
  return out;
}

/** Deutsche Dezimalzahl; undefiniert (–) und unendlich (∞) bleiben getrennt. */
const fmt = fmtDe;

/** Vorzeichenbehaftete Prozentangabe, damit Stauchung und Streckung sichtbar sind. */
function fmtPct(v: number): string {
  if (!Number.isFinite(v)) return fmt(v);
  return (v > 0 ? "+" : "") + fmt(v, 2) + " %";
}

const grad = (rad: number) => (rad * 180) / Math.PI;

export function SketchingDemo() {
  const [m, setM] = useState(25);
  const [zeigeFaustregel, setZeigeFaustregel] = useState(false);
  const { seed, neueStichprobe, setSeed } = useSeed(SEED0);

  const zeilen = useMemo(() => ziehung(seed), [seed]);
  const jetzt = zeilen[m - 1];
  const band = 100 / Math.sqrt(2 * m);

  const { series, markers, yDomain } = useMemo(() => {
    const sichtbar = zeilen.filter((z) => z.m >= 2 && (z.m % 2 === 0 || z.m === m));
    const spanne = Math.max(
      20,
      ...sichtbar.map((z) => Math.min(60, Math.max(Math.abs(z.distAbw), Math.abs(z.winkelAbw))))
    );
    const hi = Math.min(60, spanne * 1.15);
    const markers = [
      ...sichtbar.map((z) => ({
        x: z.m,
        y: z.distAbw,
        color: RED,
        label: z.m === m ? `m = ${m}` : undefined,
      })),
      ...sichtbar.map((z) => ({ x: z.m, y: z.winkelAbw, color: PURPLE })),
    ];
    const series: Series[] = [
      ...(zeigeFaustregel ? [{ f: (v: number) => (v > 0 ? 100 / Math.sqrt(2 * v) : NaN), color: ORANGE, dash: [6, 4], label: "Faustregel" }, { f: (v: number) => (v > 0 ? -100 / Math.sqrt(2 * v) : NaN), color: ORANGE, dash: [6, 4] }] : []),
      { f: () => 0, color: GREY, label: "keine Abweichung" },
    ];
    return { series, markers, yDomain: [-hi, hi] as [number, number] };
  }, [zeilen, m, zeigeFaustregel]);

  return (
    <div className="space-y-3">
      <Aufgabe>Verändern wir m und ziehen wir mehrere Skizzen derselben beiden Vektoren.</Aufgabe>
      <Slider
        label="m (Zeilen von S)"
        value={m}
        onChange={(v) => setM(Math.round(v))}
        min={2}
        max={MMAX}
        step={1}
        fmt={(v) => String(Math.round(v))}
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={neueStichprobe}
        >
          neue Sketchmatrix ziehen
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setSeed(SEED0)}
          disabled={seed === SEED0}
        >
          zurücksetzen
        </button>
        <span className="font-mono">Seed {seed}</span>
        <button type="button" className="rounded border border-slate-300 px-3 py-1 dark:border-slate-600" aria-pressed={zeigeFaustregel} onClick={() => setZeigeFaustregel((v) => !v)}>{zeigeFaustregel ? "Faustregel ausblenden" : "Faustregel einblenden"}</button>
      </div>
      <LabeledPlot
        xLabel="m"
        yLabel="relative Abweichung in %"
        series={series}
        markers={markers}
        xDomain={[2, MMAX]}
        yDomain={yDomain}
        width={460}
        height={260}
      />
      <div className="max-w-prose space-y-1 text-sm">
        <p className="font-mono">
          n = {N}, m = {m}, Kompression {fmt(N / m, 1)}×
        </p>
        <p>
          Abstand{" "}
          <span className="font-mono" style={{ color: GREEN }}>
            ‖x − y‖ = {fmt(DIST, 4)}
          </span>{" "}
          gegen{" "}
          <span className="font-mono" style={{ color: BLUE }}>
            ‖Sx − Sy‖ = {fmt(jetzt.dist, 4)}
          </span>
          , Abweichung{" "}
          <span className="font-mono" style={{ color: RED }}>
            {fmtPct(jetzt.distAbw)}
          </span>
        </p>
        <p>
          Winkel{" "}
          <span className="font-mono" style={{ color: GREEN }}>
            ∠(x, y) = {fmt(grad(WINKEL), 2)}°
          </span>{" "}
          gegen{" "}
          <span className="font-mono" style={{ color: BLUE }}>
            ∠(Sx, Sy) = {fmt(grad(jetzt.winkel), 2)}°
          </span>
          , Abweichung{" "}
          <span className="font-mono" style={{ color: PURPLE }}>
            {fmtPct(jetzt.winkelAbw)}
          </span>
        </p>
      </div>
      <Verdikt kind={Math.abs(jetzt.distAbw) <= band ? "ok" : "warn"}>{zeigeFaustregel ? <>Die Distanzabweichung beträgt {fmtPct(jetzt.distAbw)}; das Band ±{fmt(band, 2)} % aus der Faustregel enthält diese Ziehung {Math.abs(jetzt.distAbw) <= band ? "noch" : "nicht"}. Satz 8.4.6 erklärt die verwandte Wurzelrate der Garantie.</> : <>Die aktuelle Distanzabweichung beträgt {fmtPct(jetzt.distAbw)}. Blenden wir die Faustregel ein, um sie mit der typischen Größenordnung zu vergleichen.</>}</Verdikt>
    </div>
  );
}
