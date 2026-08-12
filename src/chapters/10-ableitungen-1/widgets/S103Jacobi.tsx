import { useMemo, useState, type ReactNode } from "react";
import { M, Slider, niceTicks } from "../../../lib";

/**
 * §10.3: zwei Widgets zur Jacobimatrix.
 *
 * 1. JacobiFormWidget: Ein- und Ausgabedimension per Regler, dazu das
 *    passende Ableitungsobjekt als Raster der partiellen Ableitungen.
 *    Code-Vorlage ist JacobianShapeWidget aus
 *    /workspace/interactive/interactive/mml-ch5-1/src/sections/S53.tsx
 *    (Raster aus <M>-Zellen, zwei Regler, Statuszeile); alle Texte neu
 *    geschrieben, die Statuszeile nennt die Abschnitte dieses Kapitels.
 * 2. LinearisierungsWidget: nichtlineare Abbildung R^2 -> R^2, kleines
 *    Gitter um x0, im Bildpanel das krumme Bild unter f und daneben das
 *    Parallelogrammgitter der Linearisierung f(x0) + J_f(x0) h. Ersetzt die
 *    Folienbilder figure_slds/jacobian, jacobian-viz-linear.png und
 *    jacobian-viz-claude-trigwaves.png. Der Panel-Aufbau (eigene Achsen,
 *    Ticks aus niceTicks, weisser Canvas) folgt widgets/S102Gradient.tsx;
 *    die Idee der Flaechen-Anzeige stammt aus JacobianAreaWidget in derselben
 *    S53.tsx, dort mit TransformCanvas fuer eine rein lineare Abbildung.
 *
 * Alle Zahlen per node nachgerechnet (check-math-s103.mjs):
 * f(x) = (x1^2 - x2^2, 2 x1 x2) hat J = (2x1 -2x2; 2x2 2x1) mit
 * det J = 4(x1^2 + x2^2); in x0 = (1; 0,5) ist f(x0) = (0,75; 1),
 * J = (2 -1; 1 2), det = 5. Der Restterm ist dort exakt r(h) = f(h) mit
 * ||r(h)|| = ||h||^2 (ueber 20000 Zufallsvektoren bis auf 4,4e-16 bestaetigt).
 */

const BLAU = "#0072B2"; // Funktion und Funktionswerte
const GRUEN = "#009E73"; // lineare Approximation
const ROT = "#D55E00"; // Restterm
const ORANGE = "#E69F00"; // Jacobi-Objekte (Spaltenpfeile, Matrixeinträge)

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

/* ================================================== Widget 1: Form der Ableitung */

export function JacobiFormWidget() {
  const [n, setN] = useState(3);
  const [m, setM] = useState(2);

  const zellen = [];
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      zellen.push(
        <div
          key={`${i}-${j}`}
          className="border border-slate-300 bg-white px-2 py-1 text-center dark:border-slate-600 dark:bg-slate-800"
        >
          <M>{`\\tfrac{\\partial f_{${i}}}{\\partial x_{${j}}}`}</M>
        </div>,
      );
    }
  }

  const befund =
    m === 1 && n === 1
      ? "Zeile und Spalte schrumpfen auf ein einziges Feld: Wir sind zurück bei Definition 10.1.1, dem Grenzwert des Differenzenquotienten."
      : m === 1
        ? "Nur eine Ausgabe, also nur eine Zeile. Damit steht hier Definition 10.2.1, der Gradient, als Sonderfall der Jacobimatrix."
        : n === 1
          ? "Nur eine Eingabe, also nur eine Spalte. So sieht die Ableitung einer Kurve nach ihrem Parameter aus, m Steigungen übereinander."
          : "Beide Regler größer als eins: das volle Rechteck aus Definition 10.3.1, zeilenweise gelesen m Gradienten.";

  return (
    <div className="space-y-3">
      <Slider
        label="Eingabedimension n"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={1}
        max={4}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <Slider
        label="Ausgabedimension m"
        value={m}
        onChange={(v) => setM(Math.round(v))}
        min={1}
        max={4}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div className="overflow-x-auto">
        <div
          className="inline-grid gap-1"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, auto))` }}
        >
          {zellen}
        </div>
      </div>
      <p className="text-sm">
        <M>{`\\boldsymbol{J}_{f}(\\boldsymbol{x}) \\in \\mathbb{R}^{${m} \\times ${n}}`}</M>. {befund}
      </p>
    </div>
  );
}

/* ============================== Widget 2: lokale Linearisierung in der Ebene */

interface Abbildung {
  name: string;
  /** Abbildungsvorschrift */
  f: (x: [number, number]) => [number, number];
  /** Jacobimatrix, zeilenweise */
  J: (x: [number, number]) => [[number, number], [number, number]];
  /** TeX-Darstellung für die Statuszeile */
  tex: string;
  linear: boolean;
}

const ABBILDUNGEN: Abbildung[] = [
  {
    name: "Quadrieren",
    f: ([a, b]) => [a * a - b * b, 2 * a * b],
    J: ([a, b]) => [
      [2 * a, -2 * b],
      [2 * b, 2 * a],
    ],
    tex: "f(\\boldsymbol{x}) = (x_1^2 - x_2^2,\\; 2x_1x_2)^\\top",
    linear: false,
  },
  {
    name: "Wellen",
    f: ([a, b]) => [a + 0.5 * Math.sin(2 * b), b + 0.5 * Math.sin(2 * a)],
    J: ([a, b]) => [
      [1, Math.cos(2 * b)],
      [Math.cos(2 * a), 1],
    ],
    tex: "f(\\boldsymbol{x}) = (x_1 + \\tfrac12\\sin(2x_2),\\; x_2 + \\tfrac12\\sin(2x_1))^\\top",
    linear: false,
  },
  {
    name: "linear",
    f: ([a, b]) => [2 * a - b, a + 2 * b],
    J: () => [
      [2, -1],
      [1, 2],
    ],
    tex: "f(\\boldsymbol{x}) = \\boldsymbol{A}\\boldsymbol{x}, \\quad \\boldsymbol{A} = \\begin{pmatrix} 2 & -1 \\\\ 1 & 2 \\end{pmatrix}",
    linear: true,
  },
];

const SIZE = 250;
const PAD_L = 34;
const PAD_B = 18;
const PAD_R = 10;

/** quadratisches Fenster, das alle übergebenen Punkte mit Rand enthält */
function fensterUm(punkte: [number, number][]): [number, number, number, number] {
  let ax = Infinity;
  let bx = -Infinity;
  let ay = Infinity;
  let by = -Infinity;
  for (const [x, y] of punkte) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    ax = Math.min(ax, x);
    bx = Math.max(bx, x);
    ay = Math.min(ay, y);
    by = Math.max(by, y);
  }
  if (!Number.isFinite(ax)) return [-1, 1, -1, 1];
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const halb = Math.max(bx - ax, by - ay) / 2 || 1;
  const r = halb * 1.35;
  return [mx - r, mx + r, my - r, my + r];
}

function Panel({
  id,
  fenster,
  titel,
  children,
}: {
  id: string;
  fenster: [number, number, number, number];
  titel: string;
  children: (px: (x: number) => number, py: (y: number) => number) => ReactNode;
}) {
  const [x0, x1, y0, y1] = fenster;
  const px = (x: number) => PAD_L + ((x - x0) / (x1 - x0)) * SIZE;
  const py = (y: number) => SIZE - ((y - y0) / (y1 - y0)) * SIZE;
  const ticksX = niceTicks(x0, x1);
  const ticksY = niceTicks(y0, y1);
  /**
   * Nachkommastellen aus dem Tick-Abstand: bei Abstand 0,02 braucht die
   * Beschriftung zwei Stellen, sonst stünde viermal dieselbe Zahl da.
   */
  const nachkomma = (ticks: number[]) => {
    if (ticks.length < 2) return 2;
    const abstand = Math.abs(ticks[1] - ticks[0]);
    if (!(abstand > 0)) return 2;
    return Math.min(4, Math.max(0, Math.ceil(-Math.log10(abstand) + 0.1)));
  };
  const nkX = nachkomma(ticksX);
  const nkY = nachkomma(ticksY);
  return (
    <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        {titel}
      </div>
      <svg
        width={PAD_L + SIZE + PAD_R}
        height={SIZE + PAD_B}
        className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        <defs>
          <clipPath id={`${id}-clip`}>
            <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <marker
            id={`${id}-spitze`}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} />
          </marker>
        </defs>
        {ticksY.map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={PAD_L + SIZE}
              y1={py(t)}
              y2={py(t)}
              stroke="#e2e8f0"
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
              {fmt(t, nkY)}
            </text>
          </g>
        ))}
        {ticksX.map((t) => (
          <g key={`x${t}`}>
            <line
              y1={0}
              y2={SIZE}
              x1={px(t)}
              x2={px(t)}
              stroke="#e2e8f0"
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={px(t)} y={SIZE + 13} textAnchor="middle" fill="#64748b" fontSize={10}>
              {fmt(t, nkX)}
            </text>
          </g>
        ))}
        <g clipPath={`url(#${id}-clip)`}>{children(px, py)}</g>
      </svg>
    </div>
  );
}

const LINIEN = 5; // Gitterlinien je Richtung
const PROBEN = 24; // Stützstellen je Gitterlinie

export function LinearisierungsWidget() {
  const [wahl, setWahl] = useState(0);
  const [x01, setX01] = useState(1);
  const [x02, setX02] = useState(0.5);
  const [r, setR] = useState(0.4);

  const abb = ABBILDUNGEN[wahl];
  const x0: [number, number] = [x01, x02];

  const daten = useMemo(() => {
    const J = abb.J(x0);
    const fx0 = abb.f(x0);
    const det = J[0][0] * J[1][1] - J[0][1] * J[1][0];
    const lin = (h: [number, number]): [number, number] => [
      fx0[0] + J[0][0] * h[0] + J[0][1] * h[1],
      fx0[1] + J[1][0] * h[0] + J[1][1] * h[1],
    ];

    // Gitterlinien im Urbild und ihre beiden Bilder
    const urbild: [number, number][][] = [];
    const bild: [number, number][][] = [];
    const bildLin: [number, number][][] = [];
    for (let k = 0; k < LINIEN; k++) {
      const s = -r + (2 * r * k) / (LINIEN - 1);
      const waagerecht: [number, number][] = [];
      const senkrecht: [number, number][] = [];
      const wB: [number, number][] = [];
      const sB: [number, number][] = [];
      const wL: [number, number][] = [];
      const sL: [number, number][] = [];
      for (let i = 0; i < PROBEN; i++) {
        const t = -r + (2 * r * i) / (PROBEN - 1);
        const hw: [number, number] = [t, s];
        const hs: [number, number] = [s, t];
        waagerecht.push([x0[0] + hw[0], x0[1] + hw[1]]);
        senkrecht.push([x0[0] + hs[0], x0[1] + hs[1]]);
        wB.push(abb.f([x0[0] + hw[0], x0[1] + hw[1]]));
        sB.push(abb.f([x0[0] + hs[0], x0[1] + hs[1]]));
        wL.push(lin(hw));
        sL.push(lin(hs));
      }
      urbild.push(waagerecht, senkrecht);
      bild.push(wB, sB);
      bildLin.push(wL, sL);
    }

    // grösster relativer Fehler auf dem Gitterrand
    let maxRel = 0;
    let maxAbs = 0;
    const ecken: [number, number][] = [
      [r, r],
      [-r, r],
      [-r, -r],
      [r, -r],
    ];
    for (const h of ecken) {
      const echt = abb.f([x0[0] + h[0], x0[1] + h[1]]);
      const naeh = lin(h);
      const d = Math.hypot(echt[0] - naeh[0], echt[1] - naeh[1]);
      maxAbs = Math.max(maxAbs, d);
      maxRel = Math.max(maxRel, d / Math.hypot(h[0], h[1]));
    }

    // Flächen: Bild des kleinen Quadrats (Polygon aus den Randpunkten)
    const rand: [number, number][] = [];
    const kante = (a: [number, number], b: [number, number]) => {
      for (let i = 0; i < PROBEN - 1; i++) {
        const t = i / (PROBEN - 1);
        rand.push(
          abb.f([
            x0[0] + a[0] + t * (b[0] - a[0]),
            x0[1] + a[1] + t * (b[1] - a[1]),
          ]),
        );
      }
    };
    kante([-r, -r], [r, -r]);
    kante([r, -r], [r, r]);
    kante([r, r], [-r, r]);
    kante([-r, r], [-r, -r]);
    let flaeche = 0;
    for (let i = 0; i < rand.length; i++) {
      const [ax, ay] = rand[i];
      const [bx, by] = rand[(i + 1) % rand.length];
      flaeche += ax * by - bx * ay;
    }
    flaeche = Math.abs(flaeche) / 2;
    const quadrat = 4 * r * r;

    const eckenBild = ecken.map((h) => ({
      echt: abb.f([x0[0] + h[0], x0[1] + h[1]]),
      naeh: lin(h),
    }));

    return { J, fx0, det, urbild, bild, bildLin, maxRel, maxAbs, flaeche, quadrat, eckenBild };
  }, [abb, x01, x02, r]);

  const { J, fx0, det, urbild, bild, bildLin, maxRel, maxAbs, flaeche, quadrat, eckenBild } = daten;

  const fensterUrbild = fensterUm(urbild.flat());
  const fensterBild = fensterUm([...bild.flat(), ...bildLin.flat()]);

  const pfad = (
    linie: [number, number][],
    px: (x: number) => number,
    py: (y: number) => number,
  ) => linie.map(([x, y]) => `${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(" ");

  const flaechenFaktor = quadrat > 0 ? flaeche / quadrat : NaN;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span>Abbildung:</span>
        {ABBILDUNGEN.map((a, i) => (
          <button
            key={a.name}
            type="button"
            onClick={() => setWahl(i)}
            className={`rounded px-2 py-1 text-sm font-semibold ${
              i === wahl
                ? "bg-sky-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>
      <p className="text-sm">
        <M>{abb.tex}</M>
      </p>
      <Slider
        label="x₀ Komponente 1"
        value={x01}
        onChange={(v) => setX01(Math.round(v * 20) / 20)}
        min={-1.5}
        max={1.5}
        step={0.05}
        fmt={(v) => fmt(v)}
      />
      <Slider
        label="x₀ Komponente 2"
        value={x02}
        onChange={(v) => setX02(Math.round(v * 20) / 20)}
        min={-1.5}
        max={1.5}
        step={0.05}
        fmt={(v) => fmt(v)}
      />
      <Slider
        label="halbe Gitterweite r"
        value={r}
        onChange={(v) => setR(Math.round(v * 100) / 100)}
        min={0.05}
        max={0.8}
        step={0.01}
        fmt={(v) => fmt(v)}
      />

      <div className="flex flex-wrap gap-4">
        <Panel id="s103-urbild" fenster={fensterUrbild} titel="Urbild: Gitter um x₀">
          {(px, py) => (
            <>
              {urbild.map((linie, i) => (
                <polyline
                  key={i}
                  points={pfad(linie, px, py)}
                  fill="none"
                  stroke={BLAU}
                  strokeWidth={1}
                  opacity={0.55}
                />
              ))}
              <line
                x1={px(x0[0])}
                y1={py(x0[1])}
                x2={px(x0[0] + r)}
                y2={py(x0[1])}
                stroke={ORANGE}
                strokeWidth={2}
                markerEnd="url(#s103-urbild-spitze)"
              />
              <line
                x1={px(x0[0])}
                y1={py(x0[1])}
                x2={px(x0[0])}
                y2={py(x0[1] + r)}
                stroke={ORANGE}
                strokeWidth={2}
                markerEnd="url(#s103-urbild-spitze)"
              />
              <circle cx={px(x0[0])} cy={py(x0[1])} r={4} fill={BLAU} />
              <text
                x={px(x0[0]) + 7}
                y={py(x0[1]) - 7}
                fill={BLAU}
                fontSize={11}
                stroke="#ffffff"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                x₀
              </text>
            </>
          )}
        </Panel>

        <Panel id="s103-bild" fenster={fensterBild} titel="Bild: f(Gitter) und Linearisierung">
          {(px, py) => (
            <>
              {bildLin.map((linie, i) => (
                <polyline
                  key={`l${i}`}
                  points={pfad(linie, px, py)}
                  fill="none"
                  stroke={GRUEN}
                  strokeWidth={1.2}
                  opacity={0.8}
                />
              ))}
              {bild.map((linie, i) => (
                <polyline
                  key={`b${i}`}
                  points={pfad(linie, px, py)}
                  fill="none"
                  stroke={BLAU}
                  strokeWidth={1.2}
                  opacity={0.75}
                />
              ))}
              {eckenBild.map((e, i) => (
                <line
                  key={`r${i}`}
                  x1={px(e.naeh[0])}
                  y1={py(e.naeh[1])}
                  x2={px(e.echt[0])}
                  y2={py(e.echt[1])}
                  stroke={ROT}
                  strokeWidth={2.2}
                />
              ))}
              <line
                x1={px(fx0[0])}
                y1={py(fx0[1])}
                x2={px(fx0[0] + J[0][0] * r)}
                y2={py(fx0[1] + J[1][0] * r)}
                stroke={ORANGE}
                strokeWidth={2}
                markerEnd="url(#s103-bild-spitze)"
              />
              <line
                x1={px(fx0[0])}
                y1={py(fx0[1])}
                x2={px(fx0[0] + J[0][1] * r)}
                y2={py(fx0[1] + J[1][1] * r)}
                stroke={ORANGE}
                strokeWidth={2}
                markerEnd="url(#s103-bild-spitze)"
              />
              <circle cx={px(fx0[0])} cy={py(fx0[1])} r={4} fill={BLAU} />
              <text
                x={px(fx0[0]) + 7}
                y={py(fx0[1]) - 7}
                fill={BLAU}
                fontSize={11}
                stroke="#ffffff"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                f(x₀)
              </text>
            </>
          )}
        </Panel>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
        <span style={{ color: BLAU }}>■ Gitter und sein Bild unter f</span>
        <span style={{ color: GRUEN }}>■ Bild der Linearisierung f(x₀) + J h</span>
        <span style={{ color: ROT }}>■ Restterm r(h) in den vier Ecken</span>
        <span style={{ color: ORANGE }}>■ Bilder der halben Gitterachsen, also r · Spalten von J</span>
      </div>

      <div className="overflow-x-auto">
        <M>{`\\boldsymbol{J}_f(\\boldsymbol{x}_0) = \\begin{pmatrix} ${fmt(J[0][0])} & ${fmt(J[0][1])} \\\\ ${fmt(J[1][0])} & ${fmt(J[1][1])} \\end{pmatrix}, \\quad \\det = ${fmt(det)}`}</M>
      </div>

      <p className="text-sm">
        In den Ecken des Gitters ist der Restterm höchstens{" "}
        <span style={{ color: ROT }}>{fmt(maxAbs, 4)}</span> lang, gemessen an der Schrittweite also{" "}
        <span style={{ color: ROT }}>
          <M>{`\\left\\|r(\\boldsymbol{h})\\right\\| / \\left\\|\\boldsymbol{h}\\right\\| \\leq ${fmt(maxRel, 4)}`}</M>
        </span>
        .{" "}
        {abb.linear
          ? "Die Abbildung ist linear, deshalb bleibt der Restterm exakt null, ganz gleich wie groß wir r wählen: die grüne und die blaue Figur liegen übereinander."
          : "Die Definition verlangt nur, dass dieser Quotient mit r gegen null geht. Bei diesen beiden Abbildungen ist der Restterm quadratisch in ‖h‖, deshalb sehen wir mehr: Halbieren wir r, so fällt der Restterm auf etwa ein Viertel und der Quotient auf etwa die Hälfte."}
      </p>

      <p className="text-sm">
        Das Bild des kleinen Quadrats hat den Flächeninhalt{" "}
        <span style={{ color: BLAU }}>{fmt(flaeche, 4)}</span>, das Quadrat selbst{" "}
        {fmt(quadrat, 4)}. Ihr Verhältnis <span style={{ color: BLAU }}>{fmt(flaechenFaktor, 3)}</span>{" "}
        nähert sich für kleines r dem Wert{" "}
        <span style={{ color: ORANGE }}>
          <M>{`\\left|\\det \\boldsymbol{J}_f(\\boldsymbol{x}_0)\\right| = ${fmt(Math.abs(det), 3)}`}</M>
        </span>
        .
      </p>
    </div>
  );
}
