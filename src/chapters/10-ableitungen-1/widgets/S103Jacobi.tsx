import { useMemo, useState, type ReactNode, type SVGProps } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  Schaetzfrage,
  Slider,
  Verdikt,
  clamp,
  fmtDe as fmt,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";
import { W_BUTTON, W_BUTTON_AKTIV, W_MUTED } from "../../../lib/widgets/surface";

/**
 * §10.3: zwei Widgets zur Jacobimatrix.
 *
 * 1. JacobiFormWidget — EINE EINSICHT: Ein- und Ausgabedimension allein
 *    entscheiden, welche Gestalt das Ableitungsobjekt hat (Zahl, Zeile,
 *    Spalte, volle Matrix).
 *    Code-Vorlage ist JacobianShapeWidget aus
 *    /workspace/interactive/interactive/mml-ch5-1/src/sections/S53.tsx
 *    (Raster aus <M>-Zellen, zwei Regler); alle Texte neu geschrieben.
 *
 * 2. LinearisierungsWidget — EINE EINSICHT: Die Jacobimatrix ersetzt das
 *    krumme Bild einer kleinen Umgebung durch ein Parallelogramm, und der
 *    Fehler dieser Ersetzung faellt QUADRATISCH: halbe Kantenlaenge, ein
 *    Viertel Restterm. Aufbau nach den Folienbildern
 *    slides/resources/jacobian-viz-claude-trigwaves.png und
 *    jacobian-viz-linear.png (deren R-Quellen dort daneben liegen): links das
 *    regulaere Gitter ueber dem ganzen Definitionsbereich mit dem gezogenen
 *    Fenster um x0, rechts das verbogene Bild DESSELBEN Gitters, darin das
 *    krumme Bild des Fensters und das Parallelogramm der Linearisierung.
 *    Die dritte Tafel ist die Lupe, in der der Restterm sichtbar wird.
 *    Uebernommen sind nur Konstruktionsidee und Parameter der Folienbilder
 *    (Trigwelle, A = (1,5 0,5; 0,3 1,2)); Code und Texte sind neu.
 *
 * FARBROLLEN (Kapitel 10, wie in S101/S102/S104):
 *   grau    — das unverzerrte Urbildgitter, ohne eigene mathematische Rolle
 *   blau    — alles, was f erzeugt: Bildgitter, krummes Bild des Fensters, f(x0)
 *   gruen   — die Linearisierung f(x0) + J_f(x0) h (Parallelogramm)
 *   rot     — der Restterm r(h) (die vier Verbindungsstrecken, alle r-Zahlen)
 *   orange  — Jacobi-Objekte: die Spalten von J als Pfeile, die Matrixeintraege
 *   violett — das vom Leser gewaehlte Fenster: Quadrat und Punkt x0
 *             (dieselbe Rolle wie die frei gewaehlte Richtung d in S102)
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-10-ableitungen-1/
 * check-s103-jacobi.mjs, 2026-08-19). Alle vier Voreinstellungen: die
 * analytische Jacobimatrix trifft die zentralen Differenzen auf 1,5e-10.
 *   Trigwelle, x0 = (1,2; 0,6): f(x0) = (1,6660; 0,9377),
 *     J = (1 0,36236; -0,73739 1), det J = 1,26720;
 *     h = 0,4: Flaechenverhaeltnis 1,2148, max||r|| = 0,20518;
 *     h = 0,2: 1,2533 bzw. 0,049316 — Faktor 4,16;
 *     h = 0,01: Verhaeltnis 1,26717, also det J.
 *   linear A = (1,5 0,5; 0,3 1,2), x0 = (0,8; 0,6): J = A, det J = 1,65,
 *     Flaechenverhaeltnis exakt 1,65 fuer JEDES h, max||r|| = 4,4e-16
 *     (Maschinengenauigkeit, also exakt null).
 *   Quadrieren, x0 = (1; 0,5): J = (2 -1; 1 2), det J = 5;
 *     h = 0,3: Verhaeltnis 5,24, max||r|| = 0,18 = ||h||^2 exakt;
 *     h = 0,15: 5,06 bzw. 0,045 — Faktor exakt 4.
 *   Wirbel (Drehung um 0,6*r), x0 = (1,2; 0,6): J = (0,005742 -1,06451;
 *     0,935083 0,800254), det J = 1 auf 1e-15 und Flaechenverhaeltnis exakt
 *     1,000000 fuer jedes h — die Abbildung ist flaechentreu;
 *     h = 0,4: max||r|| = 0,22564, h = 0,2: 0,056081 — Faktor 4,02.
 */

const GRAU = FMM_COLORS.grau; // Urbildgitter
const BLAU = FMM_COLORS.blau; // f und seine Bilder
const GRUEN = FMM_COLORS.gruen; // Linearisierung
const ROT = FMM_COLORS.rot; // Restterm
const ORANGE = FMM_COLORS.orange; // Jacobi-Objekte
const VIOLETT = FMM_COLORS.violett; // gewaehltes Fenster um x0

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

  const art = m === 1 && n === 1 ? "zahl" : m === 1 ? "zeile" : n === 1 ? "spalte" : "matrix";
  const befund: Record<string, ReactNode> = {
    zahl: "Zeile und Spalte schrumpfen auf ein einziges Feld: Wir sind zurück bei Definition 10.1.1, dem Grenzwert des Differenzenquotienten.",
    zeile:
      "Nur eine Ausgabe, also nur eine Zeile. Damit steht hier Definition 10.2.1, der Gradient, als Sonderfall der Jacobimatrix.",
    spalte:
      "Nur eine Eingabe, also nur eine Spalte. So sieht die Ableitung einer Kurve nach ihrem Parameter aus, m Steigungen übereinander.",
    matrix:
      "Beide Regler größer als eins: das volle Rechteck aus Definition 10.3.1, zeilenweise gelesen m Gradienten.",
  };

  return (
    <div className="space-y-3">
      <Aufgabe>
        Stellen wir n und m ein und lesen ab, welche Gestalt das Ableitungsobjekt annimmt.
      </Aufgabe>
      <div className="overflow-x-auto">
        <div
          className="inline-grid gap-1"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, auto))` }}
        >
          {zellen}
        </div>
      </div>
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
      <Verdikt kind={art === "matrix" ? "neutral" : "ok"}>
        <M>{`\\boldsymbol{J}_{f}(\\boldsymbol{x}) \\in \\mathbb{R}^{${m} \\times ${n}}`}</M>.{" "}
        {befund[art]}
      </Verdikt>
    </div>
  );
}

/* ============================== Widget 2: lokale Linearisierung in der Ebene */

type P2 = [number, number];
type Mat2 = [[number, number], [number, number]];

interface Abbildung {
  id: string;
  /** didaktischer Name, nicht die Formel */
  name: string;
  titel: string;
  f: (x: P2) => P2;
  J: (x: P2) => Mat2;
  tex: string;
  /** Definitionsbereich (quadratisch) */
  halb: number;
  x0: P2;
  h: number;
  linear: boolean;
}

const ABBILDUNGEN: Abbildung[] = [
  {
    id: "trig",
    name: "Wellen",
    titel: "krumm, aber lokal fast linear",
    f: ([a, b]) => [a + 0.5 * Math.sin(2 * b), b + 0.5 * Math.sin(2 * a)],
    J: ([a, b]) => [
      [1, Math.cos(2 * b)],
      [Math.cos(2 * a), 1],
    ],
    tex: "f(\\boldsymbol{x}) = \\bigl(x_1 + \\tfrac12\\sin(2x_2),\\; x_2 + \\tfrac12\\sin(2x_1)\\bigr)^\\top",
    halb: Math.PI,
    x0: [1.2, 0.6],
    h: 0.4,
    linear: false,
  },
  {
    id: "linear",
    name: "linear",
    titel: "J ist überall dieselbe Matrix, der Restterm exakt null",
    f: ([a, b]) => [1.5 * a + 0.5 * b, 0.3 * a + 1.2 * b],
    J: () => [
      [1.5, 0.5],
      [0.3, 1.2],
    ],
    tex: "f(\\boldsymbol{x}) = \\boldsymbol{A}\\boldsymbol{x}, \\quad \\boldsymbol{A} = \\begin{pmatrix} 1{,}5 & 0{,}5 \\\\ 0{,}3 & 1{,}2 \\end{pmatrix}",
    halb: 2.4,
    x0: [0.8, 0.6],
    h: 0.4,
    linear: true,
  },
  {
    id: "quadrat",
    name: "Quadrieren",
    titel: "Beispiel 10.3.7: Winkel verdoppeln, Radius quadrieren",
    f: ([a, b]) => [a * a - b * b, 2 * a * b],
    J: ([a, b]) => [
      [2 * a, -2 * b],
      [2 * b, 2 * a],
    ],
    tex: "f(\\boldsymbol{x}) = (x_1^2 - x_2^2,\\; 2x_1x_2)^\\top",
    halb: 1.6,
    x0: [1, 0.5],
    h: 0.3,
    linear: false,
  },
  {
    id: "wirbel",
    name: "Wirbel",
    titel: "flächentreu: det J = 1 an jeder Stelle",
    f: ([a, b]) => {
      const w = 0.6 * Math.hypot(a, b);
      return [a * Math.cos(w) - b * Math.sin(w), a * Math.sin(w) + b * Math.cos(w)];
    },
    J: ([a, b]) => {
      const r = Math.hypot(a, b);
      if (r < 1e-9) {
        return [
          [1, 0],
          [0, 1],
        ];
      }
      const w = 0.6 * r;
      const u = a * Math.cos(w) - b * Math.sin(w);
      const v = a * Math.sin(w) + b * Math.cos(w);
      const A = 0.6 / r;
      return [
        [Math.cos(w) - A * a * v, -Math.sin(w) - A * b * v],
        [Math.sin(w) + A * a * u, Math.cos(w) + A * b * u],
      ];
    },
    tex: "f(\\boldsymbol{x}) = \\boldsymbol{R}\\bigl(\\tfrac{3}{5}\\left\\|\\boldsymbol{x}\\right\\|\\bigr)\\,\\boldsymbol{x}",
    halb: 2.6,
    x0: [1.2, 0.6],
    h: 0.4,
    linear: false,
  },
];

const LINIEN = 15; // Gitterlinien je Richtung
const PROBEN = 40; // Stuetzstellen je Gitterlinie
const RAND_PROBEN = 28; // Stuetzstellen je Quadratkante
const H_MIN = 0.025;
const H_MAX = 0.8;

type Fenster = { x0: number; x1: number; y0: number; y1: number };

/** quadratisches Fenster um alle uebergebenen Punkte, mit Rand */
function fensterUm(punkte: P2[], faktor = 1.08): Fenster {
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
  if (!Number.isFinite(ax)) return { x0: -1, x1: 1, y0: -1, y1: 1 };
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const halb = Math.max((bx - ax) / 2, (by - ay) / 2, 1e-6) * faktor;
  return { x0: mx - halb, x1: mx + halb, y0: my - halb, y1: my + halb };
}

const PAD_L = 28;
const PAD_B = 16;
const PAD_R = 8;
const PAD_T = 14;

/**
 * Eine Tafel: quadratische Zeichenflaeche mit Achsenraster, alles im viewBox.
 * `griff` macht die ganze Flaeche zum Ziehgriff (Landkarten-Muster aus
 * useDrag); der Aufrufer zeichnet ueber die Render-Prop.
 */
function Tafel({
  id,
  titel,
  size,
  fenster,
  ariaLabel,
  griff,
  children,
}: {
  id: string;
  titel: ReactNode;
  size: number;
  fenster: Fenster;
  ariaLabel: string;
  griff?: { svgProps: SVGProps<SVGSVGElement>; surfaceProps: SVGProps<SVGSVGElement> };
  children: (px: (x: number) => number, py: (y: number) => number) => ReactNode;
}) {
  const { x0, x1, y0, y1 } = fenster;
  const px = (x: number) => PAD_L + ((x - x0) / (x1 - x0)) * size;
  const py = (y: number) => PAD_T + size - ((y - y0) / (y1 - y0)) * size;
  const ticksX = niceTicks(x0, x1, 4);
  const ticksY = niceTicks(y0, y1, 4);
  const stepX = ticksX.length > 1 ? Math.abs(ticksX[1] - ticksX[0]) : undefined;
  const stepY = ticksY.length > 1 ? Math.abs(ticksY[1] - ticksY[0]) : undefined;
  return (
    <div className="min-w-0 grow basis-56">
      <svg
        viewBox={`0 0 ${PAD_L + size + PAD_R} ${PAD_T + size + PAD_B}`}
        width={PAD_L + size + PAD_R}
        height={PAD_T + size + PAD_B}
        className="h-auto max-w-full select-none rounded"
        role="img"
        aria-label={ariaLabel}
        {...(griff?.svgProps ?? {})}
        {...(griff?.surfaceProps ?? {})}
        style={{
          border: "1px solid var(--w-border, #cbd5e1)",
          background: "var(--w-bg, #ffffff)",
          ...(griff?.svgProps?.style ?? {}),
          ...(griff?.surfaceProps?.style ?? {}),
        }}
      >
        <defs>
          <clipPath id={`${id}-clip`}>
            <rect x={PAD_L} y={PAD_T} width={size} height={size} />
          </clipPath>
          <marker id={`${id}-spitze`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} />
          </marker>
        </defs>
        <text x={PAD_L} y={10} fontSize={10} fill="var(--w-text, #334155)">
          {titel}
        </text>
        {ticksY.map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={PAD_L + size}
              y1={py(t)}
              y2={py(t)}
              stroke="var(--w-grid, #e2e8f0)"
              strokeWidth={0.7}
            />
            <text
              x={PAD_L - 4}
              y={py(t) + 3}
              textAnchor="end"
              fill="var(--w-muted, #64748b)"
              fontSize={9}
            >
              {fmtTick(t, stepY)}
            </text>
          </g>
        ))}
        {ticksX.map((t) => (
          <g key={`x${t}`}>
            <line
              y1={PAD_T}
              y2={PAD_T + size}
              x1={px(t)}
              x2={px(t)}
              stroke="var(--w-grid, #e2e8f0)"
              strokeWidth={0.7}
            />
            <text
              x={px(t)}
              y={PAD_T + size + 12}
              textAnchor="middle"
              fill="var(--w-muted, #64748b)"
              fontSize={9}
            >
              {fmtTick(t, stepX)}
            </text>
          </g>
        ))}
        <g clipPath={`url(#${id}-clip)`}>{children(px, py)}</g>
      </svg>
    </div>
  );
}

const polygon = (
  pts: P2[],
  px: (x: number) => number,
  py: (y: number) => number,
): string => pts.map(([x, y]) => `${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(" ");

/** Die Kernrechnung: Gitter, Fensterrand, Linearisierung, Restterm, Flaechen. */
function rechne(abb: Abbildung, x0: P2, h: number) {
  const { f, J } = abb;
  const Jm = J(x0);
  const fx0 = f(x0);
  const det = Jm[0][0] * Jm[1][1] - Jm[0][1] * Jm[1][0];
  const lin = (hv: P2): P2 => [
    fx0[0] + Jm[0][0] * hv[0] + Jm[0][1] * hv[1],
    fx0[1] + Jm[1][0] * hv[0] + Jm[1][1] * hv[1],
  ];

  // Das regulaere Gitter ueber dem ganzen Definitionsbereich und sein Bild.
  const urbildGitter: P2[][] = [];
  const bildGitter: P2[][] = [];
  const a = abb.halb;
  for (let k = 0; k < LINIEN; k++) {
    const s = -a + (2 * a * k) / (LINIEN - 1);
    const waag: P2[] = [];
    const senk: P2[] = [];
    const waagB: P2[] = [];
    const senkB: P2[] = [];
    for (let i = 0; i < PROBEN; i++) {
      const t = -a + (2 * a * i) / (PROBEN - 1);
      waag.push([t, s]);
      senk.push([s, t]);
      waagB.push(f([t, s]));
      senkB.push(f([s, t]));
    }
    urbildGitter.push(waag, senk);
    bildGitter.push(waagB, senkB);
  }

  // Rand des Fensters [x0 - h, x0 + h]^2, sein krummes Bild und die
  // Linearisierung desselben Randes (ein Parallelogramm).
  const ecken: P2[] = [
    [-h, -h],
    [h, -h],
    [h, h],
    [-h, h],
  ];
  const rand: P2[] = [];
  const randBild: P2[] = [];
  const randLin: P2[] = [];
  for (let e = 0; e < 4; e++) {
    const [ax, ay] = ecken[e];
    const [bx, by] = ecken[(e + 1) % 4];
    for (let i = 0; i < RAND_PROBEN; i++) {
      const t = i / RAND_PROBEN;
      const hv: P2 = [ax + t * (bx - ax), ay + t * (by - ay)];
      rand.push([x0[0] + hv[0], x0[1] + hv[1]]);
      randBild.push(f([x0[0] + hv[0], x0[1] + hv[1]]));
      randLin.push(lin(hv));
    }
  }

  // Restterm in den vier Ecken (dort ist ||h|| am groessten).
  const eckenPaare = ecken.map((hv) => {
    const echt = f([x0[0] + hv[0], x0[1] + hv[1]]);
    const naeh = lin(hv);
    return { echt, naeh, d: Math.hypot(echt[0] - naeh[0], echt[1] - naeh[1]) };
  });
  const maxRest = Math.max(...eckenPaare.map((e) => e.d));

  // Flaecheninhalt des krummen Bildes (Gauss-Formel auf dem gesampelten Rand).
  let flaeche = 0;
  for (let i = 0; i < randBild.length; i++) {
    const [ax, ay] = randBild[i];
    const [bx, by] = randBild[(i + 1) % randBild.length];
    flaeche += ax * by - bx * ay;
  }
  flaeche = Math.abs(flaeche) / 2;
  const quadrat = 4 * h * h;

  // Restterm bei halber Kantenlaenge — fuer den Faktor in der Aufloesung.
  const halbRest = Math.max(
    ...ecken.map((hv0) => {
      const hv: P2 = [hv0[0] / 2, hv0[1] / 2];
      const echt = f([x0[0] + hv[0], x0[1] + hv[1]]);
      const naeh = lin(hv);
      return Math.hypot(echt[0] - naeh[0], echt[1] - naeh[1]);
    }),
  );

  return {
    Jm,
    fx0,
    det,
    urbildGitter,
    bildGitter,
    rand,
    randBild,
    randLin,
    eckenPaare,
    maxRest,
    halbRest,
    flaeche,
    quadrat,
  };
}

function LinearisierungsTafeln({ aufgeloest }: { aufgeloest: boolean }) {
  const [wahl, setWahl] = useState(0);
  const abb = ABBILDUNGEN[wahl];
  const [x0, setX0] = useState<P2>(abb.x0);
  const [h, setH] = useState(abb.h);

  const wechsle = (i: number) => {
    setWahl(i);
    setX0(ABBILDUNGEN[i].x0);
    setH(ABBILDUNGEN[i].h);
  };

  const a = abb.halb;
  const rand = a - H_MIN;
  const zieh = useDrag<"x0">({
    feld: { x0: PAD_L, y0: PAD_T, w: 210, h: 210 },
    welt: { x0: -a, x1: a, y0: -a, y1: a },
    clamp: ([x, y]) => [clamp(x, -rand, rand), clamp(y, -rand, rand)],
    snap: 0.05,
    onDrag: (p) => setX0(p),
  });

  const d = useMemo(() => rechne(abb, x0, h), [abb, x0, h]);

  const fensterUrbild: Fenster = { x0: -a, x1: a, y0: -a, y1: a };
  const fensterBild = useMemo(
    () => fensterUm(d.bildGitter.flat()),
    [d.bildGitter],
  );
  const fensterLupe = useMemo(
    () => fensterUm([...d.randBild, ...d.randLin], 1.25),
    [d.randBild, d.randLin],
  );

  const verhaeltnis = d.quadrat > 0 ? d.flaeche / d.quadrat : NaN;
  const normH = h * Math.SQRT2;
  const restQuotient = d.maxRest / (normH * normH);
  const faktor = d.halbRest > 1e-14 ? d.maxRest / d.halbRest : NaN;

  /* --------------------------------------------------------- Zeichnungen */

  const gitterLinien = (
    linien: P2[][],
    farbe: string,
    px: (x: number) => number,
    py: (y: number) => number,
    key: string,
  ) =>
    linien.map((linie, i) => (
      <polyline
        key={`${key}${i}`}
        points={polygon(linie, px, py)}
        fill="none"
        stroke={farbe}
        strokeWidth={0.7}
        opacity={0.55}
      />
    ));

  const pfeilSpalte = (
    k: 0 | 1,
    px: (x: number) => number,
    py: (y: number) => number,
    id: string,
  ) => {
    const ziel: P2 = [
      d.fx0[0] + h * d.Jm[0][k],
      d.fx0[1] + h * d.Jm[1][k],
    ];
    return (
      <g key={`sp${k}`}>
        <line
          x1={px(d.fx0[0])}
          y1={py(d.fx0[1])}
          x2={px(ziel[0])}
          y2={py(ziel[1])}
          stroke={ORANGE}
          strokeWidth={2}
          markerEnd={`url(#${id}-spitze)`}
        />
        <text
          x={px(ziel[0]) + 5}
          y={py(ziel[1]) - 4}
          fill={ORANGE}
          fontSize={10}
          stroke="var(--w-bg, #ffffff)"
          strokeWidth={2.5}
          paintOrder="stroke"
        >
          {k === 0 ? "h·Je₁" : "h·Je₂"}
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {ABBILDUNGEN.map((v, i) => (
          <button
            key={v.id}
            type="button"
            title={v.titel}
            aria-pressed={i === wahl}
            className={i === wahl ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => wechsle(i)}
          >
            {v.name}
          </button>
        ))}
      </div>
      <p className="text-sm">
        <M>{abb.tex}</M>
      </p>
      <Aufgabe>
        Ziehen wir das violette Fenster über die Ebene und verkleinern es mit dem h-Regler.
      </Aufgabe>

      <div className="flex flex-wrap gap-3">
        <Tafel
          id="s103-urbild"
          titel="Urbild: Gitter und Fenster um x₀"
          size={210}
          fenster={fensterUrbild}
          ariaLabel={`Regelmäßiges Gitter über dem Definitionsbereich mit einem quadratischen Fenster der halben Kantenlänge ${fmt(h)} um den Punkt x₀ = (${fmt(x0[0])}; ${fmt(x0[1])}).`}
          griff={{ svgProps: zieh.svgProps, surfaceProps: zieh.surfaceProps("x0") }}
        >
          {(px, py) => (
            <>
              {gitterLinien(d.urbildGitter, GRAU, px, py, "u")}
              <polygon
                points={polygon(d.rand, px, py)}
                fill={VIOLETT}
                fillOpacity={0.12}
                stroke={VIOLETT}
                strokeWidth={1.8}
              />
              <circle cx={px(x0[0])} cy={py(x0[1])} r={3.5} fill={VIOLETT} />
              <text
                x={px(x0[0]) + 6}
                y={py(x0[1]) - 6}
                fill={VIOLETT}
                fontSize={11}
                stroke="var(--w-bg, #ffffff)"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                x₀
              </text>
            </>
          )}
        </Tafel>

        <Tafel
          id="s103-bild"
          titel="Bild: f(Gitter) und f(Fenster)"
          size={210}
          fenster={fensterBild}
          ariaLabel="Dasselbe Gitter nach Anwendung von f: die Linien sind verbogen, das Bild des Fensters ist blau hervorgehoben."
        >
          {(px, py) => (
            <>
              {gitterLinien(d.bildGitter, BLAU, px, py, "b")}
              <polygon
                points={polygon(d.randBild, px, py)}
                fill={BLAU}
                fillOpacity={0.16}
                stroke={BLAU}
                strokeWidth={1.8}
              />
              <circle cx={px(d.fx0[0])} cy={py(d.fx0[1])} r={3.5} fill={BLAU} />
              <text
                x={px(d.fx0[0]) + 6}
                y={py(d.fx0[1]) - 6}
                fill={BLAU}
                fontSize={11}
                stroke="var(--w-bg, #ffffff)"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                f(x₀)
              </text>
            </>
          )}
        </Tafel>

        <Tafel
          id="s103-lupe"
          titel="Lupe: Bild gegen Parallelogramm"
          size={186}
          fenster={fensterLupe}
          ariaLabel={`Vergrößerter Ausschnitt um f(x₀): das krumme Bild des Fensters und das Parallelogramm der Linearisierung, deren größter Abstand ${fmt(d.maxRest, 4)} beträgt.`}
        >
          {(px, py) => (
            <>
              <polygon
                points={polygon(d.randLin, px, py)}
                fill={GRUEN}
                fillOpacity={0.12}
                stroke={GRUEN}
                strokeWidth={2}
              />
              <polygon
                points={polygon(d.randBild, px, py)}
                fill="none"
                stroke={BLAU}
                strokeWidth={2}
              />
              {d.eckenPaare.map((e, i) => (
                <line
                  key={`r${i}`}
                  x1={px(e.naeh[0])}
                  y1={py(e.naeh[1])}
                  x2={px(e.echt[0])}
                  y2={py(e.echt[1])}
                  stroke={ROT}
                  strokeWidth={2.4}
                />
              ))}
              {pfeilSpalte(0, px, py, "s103-lupe")}
              {pfeilSpalte(1, px, py, "s103-lupe")}
              <circle cx={px(d.fx0[0])} cy={py(d.fx0[1])} r={3} fill={BLAU} />
            </>
          )}
        </Tafel>
      </div>

      <div className={`flex flex-wrap gap-x-5 gap-y-1 text-xs ${W_MUTED}`}>
        <span style={{ color: GRAU }}>▬&nbsp;Urbildgitter</span>
        <span style={{ color: VIOLETT }}>▬&nbsp;Fenster um x₀</span>
        <span style={{ color: BLAU }}>▬&nbsp;Bild unter f</span>
        <span style={{ color: GRUEN }}>▬&nbsp;Linearisierung f(x₀) + J h</span>
        <span style={{ color: ROT }}>▬&nbsp;Restterm r(h)</span>
        <span style={{ color: ORANGE }}>▬&nbsp;Spalten von J</span>
      </div>

      <Slider
        label="x₀ Komponente 1"
        value={x0[0]}
        onChange={(v) => setX0([Math.round(v * 20) / 20, x0[1]])}
        min={-rand}
        max={rand}
        step={0.05}
        accent={VIOLETT}
        fmt={(v) => fmt(v)}
      />
      <Slider
        label="x₀ Komponente 2"
        value={x0[1]}
        onChange={(v) => setX0([x0[0], Math.round(v * 20) / 20])}
        min={-rand}
        max={rand}
        step={0.05}
        accent={VIOLETT}
        fmt={(v) => fmt(v)}
      />
      <Slider
        label="halbe Kante h"
        value={h}
        onChange={(v) => setH(Math.round(v * 1000) / 1000)}
        min={H_MIN}
        max={H_MAX}
        step={0.005}
        accent={ROT}
        fmt={(v) => fmt(v, 3)}
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={W_BUTTON}
          disabled={h <= H_MIN + 1e-9}
          onClick={() => setH(Math.max(H_MIN, Math.round((h / 2) * 1000) / 1000))}
        >
          h halbieren
        </button>
        <button type="button" className={W_BUTTON} onClick={() => wechsle(wahl)}>
          zurücksetzen
        </button>
      </div>

      <div className="overflow-x-auto">
        <M>{`\\boldsymbol{J}_f(\\boldsymbol{x}_0) = \\begin{pmatrix} ${fmt(d.Jm[0][0], 3)} & ${fmt(d.Jm[0][1], 3)} \\\\ ${fmt(d.Jm[1][0], 3)} & ${fmt(d.Jm[1][1], 3)} \\end{pmatrix}, \\quad \\det \\boldsymbol{J}_f(\\boldsymbol{x}_0) = ${fmt(d.det, 3)}`}</M>
      </div>

      <Verdikt kind={abb.linear ? "ok" : restQuotient < 1e-9 ? "ok" : "neutral"}>
        {abb.linear ? (
          <>
            Die Abbildung ist linear, also ist sie ihre eigene Linearisierung: Der Restterm
            bleibt bei jedem h exakt null (angezeigt{" "}
            <span className="font-mono" style={{ color: ROT }}>
              {fmt(d.maxRest, 6)}
            </span>
            , das ist Maschinenrauschen), blaues Bild und grünes Parallelogramm liegen
            übereinander, und das Flächenverhältnis ist{" "}
            <span className="font-mono">{fmt(verhaeltnis, 4)}</span> ={" "}
            <span className="font-mono" style={{ color: ORANGE }}>
              |det J| = {fmt(Math.abs(d.det), 4)}
            </span>{" "}
            , nicht nur im Grenzwert, sondern exakt. Genau das sagt Korollar 10.3.6.
          </>
        ) : (
          <>
            Größter Abstand zwischen Bild und Parallelogramm in den vier Ecken:{" "}
            <span className="font-mono" style={{ color: ROT }}>
              ‖r(h)‖ = {fmt(d.maxRest, 5)}
            </span>{" "}
            bei <span className="font-mono">‖h‖ = {fmt(normH, 3)}</span>, also{" "}
            <span className="font-mono" style={{ color: ROT }}>
              ‖r(h)‖/‖h‖² = {fmt(restQuotient, 3)}
            </span>
            . Der Quotient bleibt beim Verkleinern von h beschränkt; (10.3.1) verlangt nur,
            dass ‖r(h)‖/‖h‖ verschwindet, und das ist hier{" "}
            <span className="font-mono">{fmt(d.maxRest / normH, 4)}</span>. Das Bild des
            Fensters hat die Fläche <span className="font-mono">{fmt(d.flaeche, 4)}</span>, das
            Fenster selbst <span className="font-mono">{fmt(d.quadrat, 4)}</span>; ihr
            Verhältnis <span className="font-mono">{fmt(verhaeltnis, 4)}</span> läuft für
            kleines h gegen{" "}
            <span className="font-mono" style={{ color: ORANGE }}>
              |det J| = {fmt(Math.abs(d.det), 4)}
            </span>{" "}
            (Bemerkung 10.3.8).
            {abb.id === "wirbel" && (
              <>
                {" "}
                Hier ist det J überall genau 1: Der Wirbel verschiebt Fläche, ohne sie zu
                verändern.
              </>
            )}
          </>
        )}
      </Verdikt>

      {aufgeloest && (
        <p className={`text-xs ${W_MUTED}`}>
          Zum Vergleichen: bei halber Kante wäre ‖r(h/2)‖ ={" "}
          <span className="font-mono">{fmt(d.halbRest, 6)}</span>
          {Number.isFinite(faktor) && (
            <>
              , das ist der Faktor <span className="font-mono">{fmt(faktor, 2)}</span>
            </>
          )}
          .
        </p>
      )}
    </div>
  );
}

export function LinearisierungsWidget() {
  return (
    <Schaetzfrage
      variante="auswahl"
      frage={
        <>
          Wir halbieren gleich die Kantenlänge des Fensters. Um welchen Faktor schrumpft dabei
          der rote Restterm?
        </>
      }
      optionen={[
        { id: "2", text: "Faktor 2" },
        { id: "4", text: "Faktor 4" },
        { id: "8", text: "Faktor 8" },
      ]}
      loesung="4"
      verdeckt={
        <p className="text-sm">
          Der Restterm fällt wie <M>{"\\left\\|\\boldsymbol{h}\\right\\|^2"}</M>, halbe
          Kantenlänge kostet ihn also drei Viertel seiner Länge. Die Zeile unter dem Verdikt
          nennt den gemessenen Faktor; der Knopf „h halbieren“ führt ihn vor.
        </p>
      }
    >
      {({ aufgeloest }) => <LinearisierungsTafeln aufgeloest={aufgeloest} />}
    </Schaetzfrage>
  );
}
