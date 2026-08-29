import { useMemo, useState, type ReactNode, type SVGProps } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Plot,
  Schaetzfrage,
  Slider,
  Stepper,
  Surface3D,
  Verdikt,
  ViewControls,
  clamp,
  fmtDe as fmt,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";
import type { Series, Sicht3D, Vec3 } from "../../../lib";
import { W_BUTTON, W_BUTTON_AKTIV, W_MUTED } from "../../../lib/widgets/surface";
import { num, ref } from "../../numbers.generated";

/**
 * §10.2: zwei Widgets zum Gradienten.
 *
 * 1. Gradientenfeld — EINE EINSICHT: Der Gradient steht senkrecht auf der
 *    Höhenlinie (Bemerkung 10.2.5). Zwei Tafeln zeigen denselben Zustand
 *    (Muster 3): die Höhenlinientafel (tot lesbare Hauptdarstellung, alle
 *    Zahlen stehen in ihrem Verdikt) und daneben dieselbe Funktion als Fläche
 *    mit Tangentialebene und demselben Gradientpfeil auf dem Boden
 *    (Surface3D, D7). Ersetzt die Folienbilder gradient4 und
 *    gradient_quadratic_example.
 * 1b. RichtungsWidget — EINE EINSICHT: Über allen Richtungen ist die
 *    Richtungsableitung ∇f(x)d = ‖∇f(x)‖·cos θ, in Polarkoordinaten also ein
 *    Kreis durch den Mittelpunkt: maximal in Gradientenrichtung, null längs
 *    der Höhenlinie, dazwischen der cos-Anteil (Satz 10.2.4). Der Kompass ist
 *    die Aufspaltung von `Gradientenfeld` aus dem Survey (das eine Widget trug
 *    vorher beide Einsichten); d wird im Bild gezogen, der φ-Regler ist der
 *    Doppelpfad, und der Schnitt f(x + t·d) daneben zeigt dieselbe Zahl als
 *    Steigung der grünen Geraden bei t = 0.
 * 2. AbstiegStepper — EINE EINSICHT: Über Konvergenz des Gradientenabstiegs
 *    auf einer quadratischen Funktion entscheidet allein
 *    ρ(α) = maxᵢ|1 − αλᵢ|; sie wird bei α = 2/(λ_min + λ_max) minimal, weil
 *    dort beide Eigenrichtungen gleich schnell schrumpfen.
 *
 * Der Höhenlinien-Code (Marching Squares) und der Panel-Aufbau folgen dem
 * Muster von 08-la-misc/widgets/S83Richardson.tsx; die Idee, ein skalares Feld
 * mit Punkt und angehefteten Pfeilen zu zeigen, stammt aus FieldCanvas in
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S52.tsx (dort eine
 * Canvas-Heatmap). Alle Texte neu. Der 3D-Anbau folgt dem Referenzaufrufer
 * 10-differentialrechnung/widgets/S107Hesse.tsx.
 *
 * FARBROLLEN (Kapitel 10):
 *   blau    — Funktion, Höhenlinien, Funktionswerte, Fläche
 *   grün    — lineare Approximation (Tangentialebene, Tangente im Schnitt)
 *   rot     — Restterm
 *   orange  — Gradient (Pfeil, Zahlen, Rate ρ)
 *   violett — die frei gewählte Richtung d bzw. der gewählte Punkt
 *
 * PRÜFSTATUS (scripts/verify/REV29/10-differentialrechnung-S102Gradient.mjs,
 * 2026-08-29): alle Gradienten gegen zentrale Differenzen geprüft, dazu die
 * Senkrechte des Kompasses (aus dem Quelltext gelesen und gegen den Gradienten
 * getestet) und die Erreichbarkeit des Grenzfalls ρ = 1:
 *   f(x) = x₁² + 3x₁x₂ + 2x₂², ∇f = (2x₁+3x₂, 3x₁+4x₂);
 *     f(1,1) = 6, ∇f(1,1) = (5, 7), ‖∇f(1,1)‖ = √74 = 8,602325;
 *     f(x) = (x₁+x₂)(x₁+2x₂) auf einem 41×41-Gitter bis 7,1e-15;
 *     Hesse (2 3; 3 4): Spur 6, det −1, Eigenwerte −0,162278 und 6,162278
 *     (Sattel); ∇f(−0,6; 0,4) = (0; −0,2).
 *   g(x) = x₁·exp(−x₁²−x₂²): ∇g(0,7071; 0) = 0, g = 0,428882 (Maximum);
 *     ∇g(0,6; 0,5) = (0,152138; −0,326011).
 *   Richtung 60° neben dem Gradienten: ∇f·d/‖∇f‖ = 0,5 auf acht Stellen,
 *     an allen drei geprüften Stellen (das ist cos 60°).
 *   A = (2 1; 1 3): Spur 5, det 5, λ = 3,618034 und 1,381966;
 *     α* = 0,4 = 2/(λ_min+λ_max) mit ρ = 0,447214 = √5/5 und ρ² = 0,2
 *     (numerisches Minimum von ρ über das 0,01-Raster von 0,05 bis 0,90
 *     ebenfalls bei α = 0,4000);
 *     α = 2/λ_max = 0,552786 gibt ρ = 1; dieser Wert liegt NICHT auf dem
 *     0,01-Raster des Reglers (ρ(0,55) = 0,9899, ρ(0,56) = 1,0261) und ist
 *     deshalb nur über den Knopf „Grenzfall" erreichbar;
 *     L(θ⁽⁰⁾) = 3,24 bei θ⁽⁰⁾ = (1,8; −1,2); bei α* ist das Verhältnis
 *     L(θ⁽ᵗ⁺¹⁾)/L(θ⁽ᵗ⁾) in jedem Schritt exakt 0,2, nach 5 Schritten ist L
 *     unter L⁽⁰⁾/1000 (1,037e−3), nach 12 Schritten 1,33e−8.
 */

const BLAU = FMM_COLORS.blau;
const GRUEN = FMM_COLORS.gruen;
const ROT = FMM_COLORS.rot;
const ORANGE = FMM_COLORS.orange;
const VIOLETT = FMM_COLORS.violett;

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
function sup(k: number): string {
  return String(k)
    .split("")
    .map((z) => SUP[Number(z)])
    .join("");
}

/* ------------------------------------------------------------- Höhenlinien */

/**
 * Marching Squares: für jedes Niveau ein SVG-Pfad aus lauter kurzen
 * Teilstrecken. Das Wertegitter wird einmal berechnet und für alle Niveaus
 * wiederverwendet.
 */
function konturPfade(
  f: (x1: number, x2: number) => number,
  niveaus: number[],
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  px: (x: number) => number,
  py: (y: number) => number,
  n = 72,
): string[] {
  const gitter: number[][] = [];
  for (let i = 0; i <= n; i++) {
    const zeile: number[] = [];
    for (let j = 0; j <= n; j++) {
      zeile.push(f(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * j) / n));
    }
    gitter.push(zeile);
  }
  const wx = (i: number) => x0 + ((x1 - x0) * i) / n;
  const wy = (j: number) => y0 + ((y1 - y0) * j) / n;

  return niveaus.map((niveau) => {
    let d = "";
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const v = [gitter[i][j], gitter[i + 1][j], gitter[i + 1][j + 1], gitter[i][j + 1]];
        const ex = [wx(i), wx(i + 1), wx(i + 1), wx(i)];
        const ey = [wy(j), wy(j), wy(j + 1), wy(j + 1)];
        const treffer: [number, number][] = [];
        for (let k = 0; k < 4; k++) {
          const l = (k + 1) % 4;
          const a = v[k] - niveau;
          const b = v[l] - niveau;
          if ((a < 0 && b >= 0) || (a >= 0 && b < 0)) {
            const t = a / (a - b);
            treffer.push([ex[k] + t * (ex[l] - ex[k]), ey[k] + t * (ey[l] - ey[k])]);
          }
        }
        const strecke = (p: [number, number], q: [number, number]) =>
          `M${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}L${px(q[0]).toFixed(1)},${py(q[1]).toFixed(1)}`;
        if (treffer.length === 2) d += strecke(treffer[0], treffer[1]);
        else if (treffer.length === 4) {
          // Sattelzelle: zwei Zweige, hier gegenüberliegend verbunden
          d += strecke(treffer[0], treffer[1]) + strecke(treffer[2], treffer[3]);
        }
      }
    }
    return d;
  });
}

/* --------------------------------------------------- gemeinsames Feldpanel */

const SIZE = 244;
const PAD_L = 28;
const PAD_T = 14;
const PAD_B = 16;
const PAD_R = 8;

interface Pfeil {
  von: [number, number];
  nach: [number, number];
  farbe: string;
  marker: string;
  beschriftung?: string;
}

function FeldPanel({
  id,
  titel,
  f,
  niveaus,
  hervor,
  fenster,
  punkte,
  pfeile,
  gerade,
  pfad,
  minimum,
  ariaLabel,
  griff,
}: {
  id: string;
  titel: ReactNode;
  f: (x1: number, x2: number) => number;
  niveaus: number[];
  hervor?: number;
  fenster: [number, number, number, number];
  punkte: { p: [number, number]; farbe: string; r: number; deckkraft?: number }[];
  pfeile: Pfeil[];
  gerade?: { p: [number, number]; richtung: [number, number]; farbe: string };
  pfad?: [number, number][];
  minimum?: [number, number];
  ariaLabel: string;
  griff?: { svgProps: SVGProps<SVGSVGElement>; surfaceProps: SVGProps<SVGSVGElement> };
}) {
  const [x0, x1, y0, y1] = fenster;
  // als useMemo, damit die Höhenlinien nicht bei jedem Render neu entstehen
  const px = useMemo(() => (x: number) => PAD_L + ((x - x0) / (x1 - x0)) * SIZE, [x0, x1]);
  const py = useMemo(
    () => (y: number) => PAD_T + SIZE - ((y - y0) / (y1 - y0)) * SIZE,
    [y0, y1],
  );

  const pfade = useMemo(
    () => konturPfade(f, niveaus, x0, x1, y0, y1, px, py),
    [f, niveaus, x0, x1, y0, y1, px, py],
  );
  const hervorPfad = useMemo(
    () => (hervor === undefined ? "" : konturPfade(f, [hervor], x0, x1, y0, y1, px, py)[0]),
    [f, hervor, x0, x1, y0, y1, px, py],
  );

  // Gerade durch p in Richtung r, bis zum Fensterrand verlängert
  let geradeEnden: [number, number, number, number] | null = null;
  if (gerade) {
    const [gx, gy] = gerade.p;
    const [rx, ry] = gerade.richtung;
    const ts: number[] = [];
    if (Math.abs(rx) > 1e-9) ts.push((x0 - gx) / rx, (x1 - gx) / rx);
    if (Math.abs(ry) > 1e-9) ts.push((y0 - gy) / ry, (y1 - gy) / ry);
    const tmin = Math.max(...ts.filter((t) => t < 0), -1e6);
    const tmax = Math.min(...ts.filter((t) => t > 0), 1e6);
    if (Number.isFinite(tmin) && Number.isFinite(tmax)) {
      geradeEnden = [gx + tmin * rx, gy + tmin * ry, gx + tmax * rx, gy + tmax * ry];
    }
  }

  const ticksX = niceTicks(x0, x1, 4);
  const ticksY = niceTicks(y0, y1, 4);
  const stepX = ticksX.length > 1 ? Math.abs(ticksX[1] - ticksX[0]) : undefined;
  const stepY = ticksY.length > 1 ? Math.abs(ticksY[1] - ticksY[0]) : undefined;

  return (
    <div className="min-w-0 grow basis-60">
      <svg
        viewBox={`0 0 ${PAD_L + SIZE + PAD_R} ${PAD_T + SIZE + PAD_B}`}
        width={PAD_L + SIZE + PAD_R}
        height={PAD_T + SIZE + PAD_B}
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
            <rect x={PAD_L} y={PAD_T} width={SIZE} height={SIZE} />
          </clipPath>
          <marker id={`${id}-pfeil-o`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} />
          </marker>
          <marker id={`${id}-pfeil-v`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 z" fill={VIOLETT} />
          </marker>
        </defs>
        <text x={PAD_L} y={10} fontSize={10} fill="var(--w-text, #334155)">
          {titel}
        </text>
        {ticksY.map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={PAD_L + SIZE}
              y1={py(t)}
              y2={py(t)}
              stroke="var(--w-grid, #e2e8f0)"
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="var(--w-muted, #64748b)" fontSize={9}>
              {fmtTick(t, stepY)}
            </text>
          </g>
        ))}
        {ticksX.map((t) => (
          <g key={`x${t}`}>
            <line
              y1={PAD_T}
              y2={PAD_T + SIZE}
              x1={px(t)}
              x2={px(t)}
              stroke="var(--w-grid, #e2e8f0)"
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={px(t)} y={PAD_T + SIZE + 12} textAnchor="middle" fill="var(--w-muted, #64748b)" fontSize={9}>
              {fmtTick(t, stepX)}
            </text>
          </g>
        ))}
        <g clipPath={`url(#${id}-clip)`}>
          {pfade.map((d, i) => (
            // Kräftig genug, dass die Höhenlinien auch auf 390 px tragen.
            <path key={i} d={d} stroke={BLAU} strokeWidth={1.1} opacity={0.55} fill="none" />
          ))}
          {hervorPfad && <path d={hervorPfad} stroke={BLAU} strokeWidth={2.2} fill="none" />}
          {geradeEnden && (
            <line
              x1={px(geradeEnden[0])}
              y1={py(geradeEnden[1])}
              x2={px(geradeEnden[2])}
              y2={py(geradeEnden[3])}
              stroke={gerade!.farbe}
              strokeWidth={1.2}
              strokeDasharray="5 4"
            />
          )}
          {pfad && pfad.length > 1 && (
            <polyline
              points={pfad.map((p) => `${px(p[0])},${py(p[1])}`).join(" ")}
              fill="none"
              stroke={BLAU}
              strokeWidth={1.5}
              opacity={0.7}
            />
          )}
          {minimum && (
            <>
              <circle cx={px(minimum[0])} cy={py(minimum[1])} r={6} fill="none" stroke={GRUEN} strokeWidth={2} />
              <circle cx={px(minimum[0])} cy={py(minimum[1])} r={2.5} fill={GRUEN} />
            </>
          )}
          {pfeile.map((a, i) => (
            <g key={i}>
              <line
                x1={px(a.von[0])}
                y1={py(a.von[1])}
                x2={px(a.nach[0])}
                y2={py(a.nach[1])}
                stroke={a.farbe}
                strokeWidth={2.4}
                markerEnd={`url(#${a.marker})`}
              />
              {a.beschriftung && (
                <text
                  x={px(a.nach[0]) + 6}
                  y={py(a.nach[1]) - 5}
                  fill={a.farbe}
                  fontSize={11}
                  stroke="var(--w-bg, #ffffff)"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                >
                  {a.beschriftung}
                </text>
              )}
            </g>
          ))}
          {punkte.map((q, i) => (
            <circle
              key={i}
              cx={px(q.p[0])}
              cy={py(q.p[1])}
              r={q.r}
              fill={q.farbe}
              opacity={q.deckkraft ?? 1}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------- Widget 1: Gradientenfeld */

const f2 = (x1: number, x2: number) => x1 * x1 + 3 * x1 * x2 + 2 * x2 * x2;
const grad2 = (x1: number, x2: number): [number, number] => [2 * x1 + 3 * x2, 3 * x1 + 4 * x2];
/** zweite, nicht quadratische Testfunktion: g(x) = x1 * exp(-x1^2 - x2^2) */
const g2 = (x1: number, x2: number) => x1 * Math.exp(-x1 * x1 - x2 * x2);
const gradG = (x1: number, x2: number): [number, number] => {
  const e = Math.exp(-x1 * x1 - x2 * x2);
  return [e * (1 - 2 * x1 * x1), -2 * x1 * x2 * e];
};

const FENSTER: [number, number, number, number] = [-2, 2, -2, 2];
/** halbe Kantenlänge des Tangentialebenen-Stücks in der x₁-x₂-Ebene */
const SPANNE = 0.7;

/**
 * Der Richtungsregler rastet auf ganze Grad, die Gradientenrichtung liegt aber
 * fast nie darauf. Ein exakter Vergleich (|∇f(x)d − ‖∇f(x)‖| < 1e-6) wäre
 * deshalb nie erfüllt, auch nicht nach einem Klick auf „d in
 * Gradientenrichtung": bei x = (1,1) fehlen 2,8e-4. Wir vergleichen darum den
 * WINKEL: bis zu einer halben Rasterbreite Abweichung gilt die Richtung als
 * getroffen, und das schlägt sich in cos/sin dieser Schranke nieder.
 */
const RASTER = (0.6 * Math.PI) / 180;
const COS_RASTER = Math.cos(RASTER); // 0,99995
const SIN_RASTER = Math.sin(RASTER); // 0,01047

/** größter Gradientenbetrag im gezeigten Ausschnitt, auf festem Gitter bestimmt */
function maxNorm(grad: (a: number, b: number) => [number, number]): number {
  let m = 0;
  for (let i = 0; i <= 80; i++) {
    for (let j = 0; j <= 80; j++) {
      const gg = grad(-2 + i / 20, -2 + j / 20);
      m = Math.max(m, Math.hypot(gg[0], gg[1]));
    }
  }
  return m;
}

interface Feld {
  kurz: string;
  name: string;
  f: (a: number, b: number) => number;
  grad: (a: number, b: number) => [number, number];
  niveaus: number[];
  start: [number, number];
  gmax: number;
  /** didaktisch ausgewählte Stellen (Muster 5) */
  stellen: { name: string; p: [number, number] }[];
}

const FELDER: Feld[] = [
  {
    kurz: "quadratisch",
    name: "f(x) = x₁² + 3x₁x₂ + 2x₂²",
    f: f2,
    grad: grad2,
    niveaus: [-0.4, 0, 0.5, 1, 2, 4, 6, 9, 12, 16, 20],
    start: [1, 1],
    gmax: maxNorm(grad2),
    stellen: [
      { name: "steil", p: [1, 1] },
      { name: "Sattel", p: [0, 0] },
      { name: "fast flach", p: [-0.6, 0.4] },
    ],
  },
  {
    kurz: "wellig",
    name: "g(x) = x₁·exp(−x₁² − x₂²)",
    f: g2,
    grad: gradG,
    niveaus: [-0.4, -0.3, -0.2, -0.1, -0.03, 0.03, 0.1, 0.2, 0.3, 0.4],
    start: [0.6, 0.5],
    gmax: maxNorm(gradG),
    stellen: [
      { name: "Flanke", p: [0.6, 0.5] },
      // Das Maximum von g liegt bei x₁ = 1/√2 = 0,70710678 und damit ZWISCHEN
      // zwei Rastwerten des 0,05-Reglers; nur dieser Knopf trifft es exakt.
      { name: "Maximum", p: [Math.SQRT1_2, 0] },
      { name: "Außenbereich", p: [1.6, 1.2] },
    ],
  },
];

function Gradientenfeldtafeln() {
  const [modus, setModus] = useState(0);
  const [x1, setX1] = useState(FELDER[0].start[0]);
  const [x2, setX2] = useState(FELDER[0].start[1]);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 26 });

  const feld = FELDER[modus];
  const wert = feld.f(x1, x2);
  const g = feld.grad(x1, x2);
  const norm = Math.hypot(g[0], g[1]);

  const zieh = useDrag<"x">({
    feld: { x0: PAD_L, y0: PAD_T, w: SIZE, h: SIZE },
    welt: { x0: FENSTER[0], x1: FENSTER[1], y0: FENSTER[2], y1: FENSTER[3] },
    clamp: ([a, b]) => [clamp(a, FENSTER[0], FENSTER[1]), clamp(b, FENSTER[2], FENSTER[3])],
    snap: 0.05,
    onDrag: ([a, b]) => {
      setX1(a);
      setX2(b);
    },
  });

  // Pfeillänge: 0,25 bis 1,1 Einheiten, proportional zu ‖∇f(x)‖ und auf den
  // größten Gradientenbetrag des Ausschnitts normiert. Der Zahlenwert steht
  // im Verdikt, der Pfeil zeigt Richtung und Größenverhältnis.
  const laenge = 0.25 + 0.85 * Math.min(1, norm / feld.gmax);
  const hatGradient = norm > 1e-9;
  /**
   * Dritter Zustand zwischen „Gradient null" und „regulär": Der Gradient ist
   * noch da, aber klein gegen sein Maximum auf dem Ausschnitt. Die Schwelle ist
   * relativ, damit sie für beide Funktionen dasselbe bedeutet.
   */
  const fastFlach = hatGradient && norm < 0.05 * feld.gmax;
  const gPfeil: [number, number] = hatGradient
    ? [x1 + (laenge * g[0]) / norm, x2 + (laenge * g[1]) / norm]
    : [x1, x2];
  // Ohne Gradient gibt es keine eindeutige Tangente an die Höhenlinie:
  // dann bleiben Pfeil und Gerade weg.
  const tangente: [number, number] = hatGradient ? [-g[1] / norm, g[0] / norm] : [1, 0];

  /* ------------------------------------------- verlinkte 3D-Tafel (D7) */
  const fFlaeche = useMemo(() => (a: number, b: number) => feld.f(a, b), [feld]);
  const [zLo, zHi] = useMemo((): [number, number] => {
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i <= 40; i++)
      for (let j = 0; j <= 40; j++) {
        const v = feld.f(
          FENSTER[0] + (i * (FENSTER[1] - FENSTER[0])) / 40,
          FENSTER[2] + (j * (FENSTER[3] - FENSTER[2])) / 40,
        );
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
      }
    const rand = 0.06 * (hi - lo || 1);
    return [lo - rand, hi + rand];
  }, [feld]);

  const flaeche = useMemo(
    () => ({ f: fFlaeche, nx: 30, ny: 30, color: BLAU, opacity: 0.82, wire: true }),
    [fFlaeche],
  );
  const punkte3d = useMemo(
    () => [{ p: [x1, x2, wert] as Vec3, color: VIOLETT, r: 4, label: "x", onTop: true }],
    [x1, x2, wert],
  );
  // Der Gradient ist ein Vektor der EBENE: er liegt auf dem Boden der Tafel,
  // genau wie in der Höhenlinientafel links. `onTop`, weil die Fläche den
  // Boden sonst aus jeder Blickrichtung von oben verdeckt.
  const pfeile3d = useMemo(() => {
    if (!hatGradient) return [];
    return [
      {
        from: [x1, x2, zLo] as Vec3,
        to: [x1 + (laenge * g[0]) / norm, x2 + (laenge * g[1]) / norm, zLo] as Vec3,
        color: ORANGE,
        label: "∇f(x)ᵀ",
        onTop: true,
      },
    ];
  }, [x1, x2, zLo, g, norm, laenge, hatGradient]);
  // Tangentialebene: Spannvektoren NICHT normieren. Normiert wird das Stück an
  // steilen Stellen zu einer fast senkrechten Scherbe und verschwindet hinter
  // der Fläche. Mit u = (1, 0, ∂f/∂x₁) und v = (0, 1, ∂f/∂x₂) liegt über einem
  // festen Quadrat der halben Kantenlänge SPANNE genau das Stück
  // Tangentialebene, das dort auch die lineare Näherung (10.2.2) beschreibt.
  const ebenen3d = useMemo(
    () => [
      {
        p0: [x1, x2, wert] as Vec3,
        u: [1, 0, g[0]] as Vec3,
        v: [0, 1, g[1]] as Vec3,
        su: SPANNE,
        sv: SPANNE,
        color: GRUEN,
        opacity: 0.6,
      },
    ],
    [x1, x2, wert, g],
  );
  const niveaus3d = useMemo(() => feld.niveaus, [feld]);

  const wechsle = (i: number) => {
    setModus(i);
    setX1(FELDER[i].start[0]);
    setX2(FELDER[i].start[1]);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {FELDER.map((v, i) => (
          <button
            key={v.kurz}
            type="button"
            aria-pressed={i === modus}
            className={i === modus ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => wechsle(i)}
          >
            {v.name}
          </button>
        ))}
      </div>
      <Aufgabe>
        Ziehen wir den Punkt über das Feld und achten darauf, wie der orange Pfeil zur blau
        gestrichelten Tangente an die Höhenlinie steht.
      </Aufgabe>

      <div className="flex flex-wrap gap-3">
        <FeldPanel
          id="s102-feld"
          titel="Höhenlinien und Gradient"
          f={feld.f}
          niveaus={feld.niveaus}
          hervor={wert}
          fenster={FENSTER}
          punkte={[{ p: [x1, x2], farbe: VIOLETT, r: 4.5 }]}
          ariaLabel={`Höhenlinien von ${feld.name} mit dem Gradientpfeil im Punkt (${fmt(x1)}; ${fmt(x2)}).`}
          griff={{ svgProps: zieh.svgProps, surfaceProps: zieh.surfaceProps("x") }}
          pfeile={
            hatGradient
              ? [
                  {
                    von: [x1, x2] as [number, number],
                    nach: gPfeil,
                    farbe: ORANGE,
                    marker: "s102-feld-pfeil-o",
                    beschriftung: "∇f(x)ᵀ",
                  },
                ]
              : []
          }
          gerade={hatGradient ? { p: [x1, x2], richtung: tangente, farbe: BLAU } : undefined}
        />
        <div className="min-w-0 grow basis-60">
          <Surface3D
            size={272}
            xDomain={[FENSTER[0], FENSTER[1]]}
            yDomain={[FENSTER[2], FENSTER[3]]}
            zDomain={[zLo, zHi]}
            surface={flaeche}
            contours={niveaus3d}
            contourColor={BLAU}
            points={punkte3d}
            arrows={pfeile3d}
            planes={ebenen3d}
            dropLines
            labels={{ x: "x₁", y: "x₂", z: "f" }}
            azimuth={sicht.azimuth}
            elevation={sicht.elevation}
            onViewChange={setSicht}
            ariaLabel="Dieselbe Funktion als Fläche über der Ebene, mit der grünen Tangentialebene im gewählten Punkt und dem Gradientpfeil auf dem Boden."
          />
          <div className="mt-1 max-w-[272px]">
            <ViewControls value={sicht} onChange={setSicht} />
          </div>
        </div>
      </div>

      <div className={`flex flex-wrap gap-x-5 gap-y-1 text-xs ${W_MUTED}`}>
        <span style={{ color: BLAU }}>▬&nbsp;Höhenlinien, Fläche, Tangente an die Höhenlinie</span>
        <span style={{ color: GRUEN }}>▬&nbsp;Tangentialebene ({num("eq:richtungsableitung")})</span>
        <span style={{ color: ORANGE }}>▬&nbsp;Gradient</span>
        <span style={{ color: VIOLETT }}>▬&nbsp;gewählter Punkt</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className={`text-xs ${W_MUTED}`}>Stellen:</span>
        {feld.stellen.map((s) => (
          <button
            key={s.name}
            type="button"
            aria-pressed={x1 === s.p[0] && x2 === s.p[1]}
            className={x1 === s.p[0] && x2 === s.p[1] ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => {
              setX1(s.p[0]);
              setX2(s.p[1]);
            }}
          >
            {s.name}
          </button>
        ))}
        <button type="button" className={W_BUTTON} onClick={() => wechsle(modus)}>
          zurücksetzen
        </button>
      </div>
      <Slider label="x₁" value={x1} onChange={(v) => setX1(Math.round(v * 20) / 20)} min={-2} max={2} step={0.05} accent={VIOLETT} fmt={(v) => fmt(v)} />
      <Slider label="x₂" value={x2} onChange={(v) => setX2(Math.round(v * 20) / 20)} min={-2} max={2} step={0.05} accent={VIOLETT} fmt={(v) => fmt(v)} />

      <Verdikt kind={hatGradient && !fastFlach ? "neutral" : "warn"}>
        <span className="font-mono">
          x = ({fmt(x1)}; {fmt(x2)}), f(x) = {fmt(wert, 3)}
        </span>
        , Gradient{" "}
        <span className="font-mono" style={{ color: ORANGE }}>
          ∇f(x) = ({fmt(g[0], 3)}; {fmt(g[1], 3)}) ∈ ℝ¹ˣ²
        </span>{" "}
        mit ‖∇f(x)‖₂ = <span className="font-mono">{fmt(norm, 3)}</span>.{" "}
        {hatGradient && !fastFlach
          ? `Der orange Pfeil steht senkrecht auf der blau gestrichelten Tangente an die Höhenlinie, so wie ${ref("bemerkung:der-gradient-steht-senkrecht-auf-der")} es verlangt, und er wird lang, wo die Höhenlinien dicht liegen. In der Fläche daneben ist ${fmt(norm, 3)} die größte Steigung, die die grüne Tangentialebene überhaupt hat.`
          : hatGradient
            ? `Der Gradient ist hier sehr klein gegen sein Maximum auf dem Ausschnitt: Seine Richtung ist noch definiert, und der orange Pfeil steht weiter senkrecht auf der Tangente an die Höhenlinie (${ref("bemerkung:der-gradient-steht-senkrecht-auf-der")}), aber sie ist numerisch heikel – schon eine kleine Änderung an x dreht sie deutlich. Die Höhenlinien liegen hier weit auseinander, die Fläche ist fast waagerecht. Ein Stück weiter, und der Gradient verschwindet ganz.`
            : "Hier verschwindet der Gradient. Dann zeichnet sich keine Richtung mehr aus, und die Höhenlinie durch den Punkt ist keine glatte Kurve: solche Stellen sind die Kandidaten für Extremwerte und Sattelpunkte. Bei der quadratischen Funktion ist der Nullpunkt ein Sattel, denn f zerfällt in (x₁ + x₂)(x₁ + 2x₂), und die Höhenlinie zum Niveau 0 besteht aus diesen beiden sich kreuzenden Geraden."}
      </Verdikt>
    </div>
  );
}

export function Gradientenfeld() {
  return <Gradientenfeldtafeln />;
}

/* ------------------------- Widget 1b: Richtungsableitung (Kompass + Schnitt) */

const KOMPASS = 210;
const K_RAND = 12;
const K_MITTE = K_RAND + KOMPASS / 2;
const K_R = KOMPASS / 2 - 16; // Radius des Richtungskreises in SVG-Einheiten

/**
 * Der Richtungskompass. Eine Richtung d ist ein Punkt auf dem Einheitskreis,
 * also ziehen wir sie dort auch an: der Zug im Bild setzt den Winkel, der
 * Regler darunter ist der Doppelpfad.
 */
function RichtungsTafeln() {
  const [stelle, setStelle] = useState(0);
  const [phi, setPhi] = useState(0);

  const feld = FELDER[0]; // die quadratische Funktion aus Beispiel 10.2.6
  const [x1, x2] = feld.stellen[stelle].p;
  const wert = feld.f(x1, x2);
  const g = feld.grad(x1, x2);
  const norm = Math.hypot(g[0], g[1]);
  const hatGradient = norm > 1e-9;
  const rad = (phi * Math.PI) / 180;
  const d: [number, number] = [Math.cos(rad), Math.sin(rad)];
  const richtungsAbleitung = g[0] * d[0] + g[1] * d[1];
  const gradWinkel = hatGradient ? ((Math.atan2(g[1], g[0]) * 180) / Math.PI + 360) % 360 : NaN;
  const anteil = hatGradient ? richtungsAbleitung / norm : NaN;
  const winkelZuG = hatGradient
    ? (Math.acos(clamp(anteil, -1, 1)) * 180) / Math.PI
    : NaN;

  const zieh = useDrag<"d">({
    feld: { x0: K_RAND, y0: K_RAND, w: KOMPASS, h: KOMPASS },
    welt: { x0: -1.2, x1: 1.2, y0: -1.2, y1: 1.2 },
    onDrag: ([a, b]) => {
      if (Math.hypot(a, b) < 1e-6) return;
      setPhi(((Math.atan2(b, a) * 180) / Math.PI + 360) % 360);
    },
  });

  /** Polarkurve der Richtungsableitung: r(θ) = ‖∇f(x)‖·cos(θ − θ_g). */
  const lobus = (vorzeichen: 1 | -1) => {
    if (!hatGradient) return "";
    const tg = Math.atan2(g[1], g[0]);
    const punkte: string[] = [];
    for (let k = 0; k <= 120; k++) {
      const t = tg - Math.PI / 2 + (Math.PI * k) / 120 + (vorzeichen === 1 ? 0 : Math.PI);
      const v = Math.cos(t - tg) * vorzeichen;
      const r = K_R * Math.max(0, v);
      punkte.push(`${(K_MITTE + r * Math.cos(t)).toFixed(1)},${(K_MITTE - r * Math.sin(t)).toFixed(1)}`);
    }
    return punkte.join(" ");
  };

  const strahl = (t: number) => feld.f(x1 + t * d[0], x2 + t * d[1]);
  const linear = (t: number) => wert + t * richtungsAbleitung;
  const rest = strahl(0.5) - linear(0.5);
  const yWerte = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]
    .map(strahl)
    .concat([linear(-1), linear(1)]);
  const spanne = Math.max(...yWerte) - Math.min(...yWerte);
  const randY = Math.max(0.1, 0.15 * spanne);
  const serien: Series[] = [
    { f: strahl, color: BLAU, label: "f(x + t·d)" },
    { f: linear, color: GRUEN, dash: [6, 4], label: "f(x) + t·∇f(x)d" },
  ];

  const art = !hatGradient
    ? "kritisch"
    : richtungsAbleitung >= norm * COS_RASTER
      ? "steilster-anstieg"
      : richtungsAbleitung <= -norm * COS_RASTER
        ? "steilster-abstieg"
        : Math.abs(richtungsAbleitung) <= norm * SIN_RASTER
          ? "hoehenlinie"
          : "dazwischen";

  const dx = K_MITTE + K_R * Math.cos(rad);
  const dy = K_MITTE - K_R * Math.sin(rad);
  const gx = hatGradient ? K_MITTE + K_R * (g[0] / norm) : K_MITTE;
  const gy = hatGradient ? K_MITTE - K_R * (g[1] / norm) : K_MITTE;
  // Der Punkt auf der Polarkurve: so weit vom Mittelpunkt, wie ∇f(x)d im
  // Verhältnis zum Maximum ‖∇f(x)‖ trägt.
  const px = K_MITTE + K_R * Math.max(0, anteil) * Math.cos(rad);
  const py = K_MITTE - K_R * Math.max(0, anteil) * Math.sin(rad);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className={`text-xs ${W_MUTED}`}>Stelle x:</span>
        {feld.stellen.map((s, i) => (
          <button
            key={s.name}
            type="button"
            aria-pressed={i === stelle}
            className={i === stelle ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setStelle(i)}
          >
            {s.name} ({fmt(s.p[0], 1)}; {fmt(s.p[1], 1)})
          </button>
        ))}
      </div>
      <Aufgabe>
        Ziehen wir die violette Richtung d im Kompass herum und lesen ab, wo die
        Richtungsableitung ihr Maximum erreicht und wo sie verschwindet.
      </Aufgabe>

      <div className="flex flex-wrap gap-3">
        <div className="min-w-0 grow basis-56">
          <svg
            viewBox={`0 0 ${KOMPASS + 2 * K_RAND} ${KOMPASS + 2 * K_RAND}`}
            width={KOMPASS + 2 * K_RAND}
            height={KOMPASS + 2 * K_RAND}
            className="h-auto max-w-full select-none rounded"
            role="img"
            aria-label={`Kompass der Richtungen um den Punkt (${fmt(x1)}; ${fmt(x2)}); die gewählte Richtung liegt bei ${fmt(phi, 0)} Grad und erreicht ${fmt(100 * anteil, 0)} Prozent des maximalen Anstiegs.`}
            {...zieh.svgProps}
            {...zieh.surfaceProps("d")}
            style={{
              border: "1px solid var(--w-border, #cbd5e1)",
              background: "var(--w-bg, #ffffff)",
              ...zieh.svgProps.style,
              ...zieh.surfaceProps("d").style,
            }}
          >
            <defs>
              <marker id="s102-k-o" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} />
              </marker>
              <marker id="s102-k-v" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 z" fill={VIOLETT} />
              </marker>
            </defs>
            <circle
              cx={K_MITTE}
              cy={K_MITTE}
              r={K_R}
              fill="none"
              stroke="var(--w-grid, #e2e8f0)"
              strokeWidth={1}
            />
            {/*
              Radiale Skala: Der Abstand vom Mittelpunkt trägt eine
              quantitative Aussage, also bekommt er einen Halbring bei
              ‖∇f‖/2 und eine Beschriftung am Rand.
            */}
            <circle
              cx={K_MITTE}
              cy={K_MITTE}
              r={K_R / 2}
              fill="none"
              stroke="var(--w-grid, #e2e8f0)"
              strokeWidth={0.8}
              strokeDasharray="3 4"
            />
            <text x={K_MITTE + 3} y={K_MITTE - K_R / 2 - 3} fill="var(--w-muted, #64748b)" fontSize={9}>
              ½‖∇f(x)‖₂
            </text>
            <text x={K_MITTE + 3} y={K_MITTE - K_R - 3} fill="var(--w-muted, #64748b)" fontSize={9}>
              ‖∇f(x)‖₂ = {fmt(norm, 2)}
            </text>
            {hatGradient && (
              <>
                {/*
                  Tangente an die Höhenlinie: die beiden Richtungen mit
                  ∇f(x)d = 0, also ±(−g₂; g₁)/‖∇f‖. Umgerechnet mit derselben
                  Abbildung wie der Gradientenpfeil (Z. 754-755): x wächst nach
                  rechts, y nach unten.
                */}
                <line
                  x1={K_MITTE + K_R * (g[1] / norm)}
                  y1={K_MITTE + K_R * (g[0] / norm)}
                  x2={K_MITTE - K_R * (g[1] / norm)}
                  y2={K_MITTE - K_R * (g[0] / norm)}
                  stroke={BLAU}
                  strokeWidth={1.2}
                  strokeDasharray="5 4"
                />
                <polyline points={lobus(1)} fill={BLAU} fillOpacity={0.1} stroke={BLAU} strokeWidth={1.6} />
                <polyline points={lobus(-1)} fill="none" stroke={BLAU} strokeWidth={1.2} strokeDasharray="4 3" />
                <line
                  x1={K_MITTE}
                  y1={K_MITTE}
                  x2={gx}
                  y2={gy}
                  stroke={ORANGE}
                  strokeWidth={2.4}
                  markerEnd="url(#s102-k-o)"
                />
                <text
                  x={gx + 8}
                  y={gy - 6}
                  fill={ORANGE}
                  fontSize={11}
                  stroke="var(--w-bg, #ffffff)"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                >
                  ∇f(x)ᵀ
                </text>
              </>
            )}
            <line
              x1={K_MITTE}
              y1={K_MITTE}
              x2={dx}
              y2={dy}
              stroke={VIOLETT}
              strokeWidth={2.4}
              markerEnd="url(#s102-k-v)"
            />
            <text
              x={dx + 8}
              y={dy + 12}
              fill={VIOLETT}
              fontSize={11}
              stroke="var(--w-bg, #ffffff)"
              strokeWidth={2.5}
              paintOrder="stroke"
            >
              d
            </text>
            {hatGradient && anteil > 0 && <circle cx={px} cy={py} r={4} fill={BLAU} />}
            <circle cx={K_MITTE} cy={K_MITTE} r={3} fill={VIOLETT} />
            <text x={K_RAND} y={K_RAND + 2} fontSize={10} fill="var(--w-text, #334155)">
              Kompass: ∇f(x)d über allen Richtungen
            </text>
          </svg>
        </div>
        <div className="min-w-0 grow basis-60">
          <Plot
            xLabel="t"
            yLabel="f(x + t·d)"
            series={serien}
            markers={[{ x: 0, y: wert, color: VIOLETT }]}
            xDomain={[-1, 1]}
            yDomain={[Math.min(...yWerte) - randY, Math.max(...yWerte) + randY]}
            width={300}
            height={234}
            readout
            ariaLabel="Die Funktion entlang des Strahls durch den Punkt in Richtung d, dazu ihre lineare Näherung."
          />
        </div>
      </div>

      <div className={`flex flex-wrap gap-x-5 gap-y-1 text-xs ${W_MUTED}`}>
        <span style={{ color: BLAU }}>▬&nbsp;∇f(x)d über den Richtungen, f entlang des Strahls</span>
        <span style={{ color: GRUEN }}>▬&nbsp;lineare Näherung ({num("eq:richtungsableitung")})</span>
        <span style={{ color: ORANGE }}>▬&nbsp;Gradient</span>
        <span style={{ color: VIOLETT }}>▬&nbsp;Richtung d</span>
      </div>

      <Slider
        label="φ (Richtung d)"
        value={phi}
        onChange={(v) => setPhi(Math.round(v))}
        min={0}
        max={359}
        step={1}
        accent={VIOLETT}
        fmt={(v) => `${fmt(v, 1)}°`}
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className={W_BUTTON}
          disabled={!hatGradient}
          onClick={() => {
            // EXAKT setzen, nicht auf ganze Grad runden: sonst zeigt das Verdikt
            // 50,7 % statt cos 60° = 50,0 % (bei x = (1,1) ist der Gradientwinkel
            // 54,46°, gerundet fehlen 0,46°). Der Regler rastet weiter auf ganze Grad.
            setPhi(gradWinkel);
          }}
        >
          d in Gradientenrichtung
        </button>
        <button
          type="button"
          className={W_BUTTON}
          disabled={!hatGradient}
          onClick={() => setPhi((gradWinkel + 60) % 360)}
        >
          d 60° daneben
        </button>
        <button
          type="button"
          className={W_BUTTON}
          disabled={!hatGradient}
          onClick={() => setPhi((gradWinkel + 90) % 360)}
        >
          d längs der Höhenlinie
        </button>
      </div>

      <Verdikt
        kind={art === "kritisch" ? "warn" : art === "steilster-anstieg" ? "ok" : "neutral"}
      >
        <span className="font-mono" style={{ color: ORANGE }}>
          ∇f(x) = ({fmt(g[0], 3)}; {fmt(g[1], 3)})
        </span>
        , ‖∇f(x)‖₂ = <span className="font-mono">{fmt(norm, 3)}</span>; Richtung{" "}
        <span className="font-mono" style={{ color: VIOLETT }}>
          d = ({fmt(d[0], 3)}; {fmt(d[1], 3)})
        </span>
        , Richtungsableitung{" "}
        <span className="font-mono" style={{ color: VIOLETT }}>
          ∇f(x)d = {fmt(richtungsAbleitung, 3)}
        </span>
        , das sind <span className="font-mono">{fmt(100 * anteil, 1)} %</span> des Maximums.
        Restterm bei t = 0,5:{" "}
        <span className="font-mono" style={{ color: ROT }}>
          {fmt(rest, 4)}
        </span>
        .{" "}
        {art === "kritisch" &&
          "Hier verschwindet der Gradient, und dann ist jede Richtung gleich gut: die Richtungsableitung ist in alle Richtungen null. Der Kompass hat keine ausgezeichnete Achse mehr."}
        {art === "steilster-anstieg" &&
          `Das ist die Richtung des stärksten Anstiegs: ∇f(x)d erreicht ‖∇f(x)‖₂ = ${fmt(norm, 3)}, genau wie ${ref("satz:richtung-des-staerksten-anstiegs")} es behauptet. Der blaue Punkt sitzt am weitesten außen.`}
        {art === "steilster-abstieg" &&
          `Das ist die Richtung des stärksten Abstiegs, die Gegenrichtung zum Gradienten: ∇f(x)d erreicht −‖∇f(x)‖₂ = ${fmt(-norm, 3)}. Genau diese Richtung nimmt ${ref("algorithmus:gradient-gradientenabstieg")}.`}
        {art === "hoehenlinie" &&
          "Diese Richtung läuft längs der Höhenlinie: die Richtungsableitung ist null, in erster Ordnung ändert sich f hier also nicht. Rechts liegt die grüne Gerade waagerecht, und im Kompass liegt d auf der blau gestrichelten Nulllinie."}
        {art === "dazwischen" &&
          `Zwischen d und dem Gradienten liegt ein Winkel von ${fmt(winkelZuG, 1)}°. Nach ${ref("satz:richtung-des-staerksten-anstiegs")} ist ∇f(x)d = ‖∇f(x)‖₂·cos dieses Winkels, und genau dieser cos-Anteil steht oben als Prozentzahl. Die blaue Kurve im Kompass ist der Kreis, den r(θ) = ‖∇f(x)‖·cos θ beschreibt.`}
      </Verdikt>
    </div>
  );
}

export function RichtungsWidget() {
  return (
    <Schaetzfrage
      variante="bereich"
      min={0}
      max={100}
      schritt={1}
      start={70}
      einheit="%"
      fmt={(v) => fmt(v, 0)}
      toleranz={8}
      loesung={50}
      frage={
        <>
          Eine Richtung d, die 60° neben dem Gradienten liegt: Wie viel Prozent des maximal
          möglichen Anstiegs erreicht sie?
        </>
      }
      verdeckt={
        <p className="text-sm">
          Der Knopf „d 60° daneben“ stellt genau diese Richtung ein: An beiden Stellen mit
          Gradient zeigt das Verdikt dann 50,0 %. Das ist cos 60°, denn nach {ref("satz:richtung-des-staerksten-anstiegs")} ist
          ∇f(x)d = ‖∇f(x)‖₂·cos∡(∇f(x)ᵀ, d). Im Sattel gibt es keine Gradientenrichtung, und
          dann ist die Richtungsableitung in jede Richtung null.
        </p>
      }
    >
      <RichtungsTafeln />
    </Schaetzfrage>
  );
}

/* ------------------------------------------- Widget 2: Gradientenabstieg */

const AMAT: [[number, number], [number, number]] = [
  [2, 1],
  [1, 3],
];
const LMAX = (5 + Math.sqrt(5)) / 2; // ≈ 3,618
const LMIN = (5 - Math.sqrt(5)) / 2; // ≈ 1,382
const ALPHA_OPT = 2 / (LMIN + LMAX); // = 0,4
const ALPHA_GRENZ = 2 / LMAX; // ≈ 0,5528
const START: [number, number] = [1.8, -1.2];
const KMAX = 12;
const NIVEAUS_L = [0.05, 0.2, 0.5, 1, 2, 3.24, 5, 8, 12, 17];

/** L(theta) = 1/2 theta^T A theta */
const verlust = (t1: number, t2: number) =>
  0.5 * (t1 * (AMAT[0][0] * t1 + AMAT[0][1] * t2) + t2 * (AMAT[1][0] * t1 + AMAT[1][1] * t2));
/** Gradient als ZEILE; transponiert ist es die Spalte A*theta. */
const gradL = (t1: number, t2: number): [number, number] => [
  AMAT[0][0] * t1 + AMAT[0][1] * t2,
  AMAT[1][0] * t1 + AMAT[1][1] * t2,
];

function rhoVon(alpha: number): number {
  return Math.max(Math.abs(1 - alpha * LMAX), Math.abs(1 - alpha * LMIN));
}

function AbstiegTafeln({ aufgeloest }: { aufgeloest: boolean }) {
  const [alpha, setAlpha] = useState(0.25);
  const [k, setK] = useState(3);

  const bahn = useMemo(() => {
    const out: [number, number][] = [START];
    let t = START;
    for (let i = 0; i < KMAX; i++) {
      const gg = gradL(t[0], t[1]);
      t = [t[0] - alpha * gg[0], t[1] - alpha * gg[1]];
      out.push(t);
    }
    return out;
  }, [alpha]);

  const jetzt = bahn[k];
  const g = gradL(jetzt[0], jetzt[1]);
  const L = verlust(jetzt[0], jetzt[1]);
  const vorher = k > 0 ? verlust(bahn[k - 1][0], bahn[k - 1][1]) : NaN;
  const quotient = k > 0 ? L / vorher : NaN;
  const rho = rhoVon(alpha);
  const naechster: [number, number] = [jetzt[0] - alpha * g[0], jetzt[1] - alpha * g[1]];

  const { marker, yDomain } = useMemo(() => {
    const lg = (v: number) => (v > 0 ? Math.log10(v) : NaN);
    const marker = bahn
      .slice(0, k + 1)
      .map((p, i) => ({ x: i, y: lg(verlust(p[0], p[1])), color: BLAU }))
      .filter((m) => Number.isFinite(m.y));
    const alle = bahn.map((p) => lg(verlust(p[0], p[1]))).filter((v) => Number.isFinite(v));
    const lo = Math.max(-14, Math.min(...alle) - 0.5);
    const hi = Math.max(...alle) + 0.5;
    return { marker, yDomain: [lo, hi] as [number, number] };
  }, [bahn, k]);

  const fenster: [number, number, number, number] = [-2.4, 2.4, -2.4, 2.4];
  const imBild = (p: [number, number]) =>
    p[0] >= fenster[0] && p[0] <= fenster[1] && p[1] >= fenster[2] && p[1] <= fenster[3];

  const rhoSerien: Series[] = [
    { f: (a) => Math.abs(1 - a * LMAX), color: ORANGE, dash: [5, 3], label: "|1 − αλ_max|" },
    { f: (a) => Math.abs(1 - a * LMIN), color: BLAU, dash: [2, 3], label: "|1 − αλ_min|" },
    { f: rhoVon, color: ROT, label: "ρ(α) = max" },
  ];

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir α, bis der Verlust so schnell wie möglich fällt, und laufen dann mit dem
        Schrittregler die Bahn ab.
      </Aufgabe>
      <div className="flex flex-wrap gap-3">
        <FeldPanel
          id="s102-abstieg"
          titel="Höhenlinien von L und die Iterierten"
          f={verlust}
          niveaus={NIVEAUS_L}
          fenster={fenster}
          minimum={[0, 0]}
          pfad={bahn.slice(0, k + 1)}
          ariaLabel={`Höhenlinien der quadratischen Verlustfunktion mit den ersten ${k} Schritten des Gradientenabstiegs bei Lernrate ${fmt(alpha)}.`}
          punkte={bahn.slice(0, k + 1).map((p, i) => ({
            p,
            farbe: BLAU,
            r: i === k ? 4.5 : 2.5,
            deckkraft: i === k ? 1 : 0.55,
          }))}
          pfeile={
            k < KMAX && imBild(jetzt)
              ? [{ von: jetzt, nach: naechster, farbe: ORANGE, marker: "s102-abstieg-pfeil-o" }]
              : []
          }
        />
        <div className="min-w-0 grow basis-60">
          <Plot
            xLabel="t (Schritt)"
            yLabel="log₁₀ L(θ⁽ᵗ⁾)"
            series={[]}
            markers={marker}
            xDomain={[0, KMAX]}
            yDomain={yDomain}
            width={300}
            height={258}
            ariaLabel="Der Verlust je Schritt auf logarithmischer Skala."
          />
        </div>
        {aufgeloest && (
          <div className="min-w-0 grow basis-60">
            <Plot
              xLabel="α"
              yLabel="Schrumpffaktor"
              series={rhoSerien}
              markers={[{ x: alpha, y: rho, color: ROT }]}
              hlines={[{ at: 1, color: FMM_COLORS.grau, dash: [4, 4] }]}
              vlines={[{ at: alpha, color: VIOLETT, dash: [3, 3] }]}
              xDomain={[0.05, 0.7]}
              yDomain={[0, 1.6]}
              width={300}
              height={258}
              readout
              ariaLabel="Der Schrumpffaktor beider Eigenrichtungen als Funktion der Lernrate; ihr Maximum ist die Rate rho."
            />
          </div>
        )}
      </div>
      <Slider
        label="α (Lernrate)"
        value={alpha}
        onChange={(v) => setAlpha(Math.round(v * 100) / 100)}
        min={0.05}
        max={0.7}
        step={0.01}
        accent={ORANGE}
        fmt={(v) => fmt(v)}
      />
      {/*
        Der Grenzfall ρ = 1 liegt bei α = 2/λ_max = 0,552786 und damit zwischen
        zwei Rastwerten des Reglers (ρ(0,55) = 0,990, ρ(0,56) = 1,026). Er ist
        deshalb nur über diesen Knopf exakt einstellbar – der kontrollierte
        Parameter, an dem das Verdikt den entarteten Fall erkennt.
      */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={alpha === ALPHA_GRENZ ? W_BUTTON_AKTIV : W_BUTTON}
          aria-pressed={alpha === ALPHA_GRENZ}
          onClick={() => setAlpha(ALPHA_GRENZ)}
        >
          Grenzfall α = 2/λ_max
        </button>
      </div>
      <Stepper
        step={k}
        setStep={setK}
        max={KMAX}
        narration={
          <>
            θ⁽{sup(k)}⁾ = ({fmt(jetzt[0], 3)}; {fmt(jetzt[1], 3)}), L = {fmt(L, 5)}
          </>
        }
      />
      <Verdikt
        kind={
          alpha === ALPHA_GRENZ || (rho > 0.98 && rho < 1.02) ? "warn" : rho < 1 ? "ok" : "fail"
        }
      >
        <span className="font-mono" style={{ color: ORANGE }}>
          ∇L(θ⁽{sup(k)}⁾) = ({fmt(g[0], 3)}; {fmt(g[1], 3)}) ∈ ℝ¹ˣ²
        </span>
        , Schritt{" "}
        <span className="font-mono">
          −α∇L(θ⁽{sup(k)}⁾)ᵀ = ({fmt(-alpha * g[0], 3)}; {fmt(-alpha * g[1], 3)})ᵀ
        </span>
        . Verlust <span className="font-mono">L = {fmt(L, 5)}</span>, Verhältnis zum Vorschritt{" "}
        <span className="font-mono">{fmt(quotient, 3)}</span>, Schranke{" "}
        <span className="font-mono" style={{ color: ROT }}>
          ρ² = {fmt(rho * rho, 3)}
        </span>
        .{" "}
        {alpha === ALPHA_GRENZ
          ? `ρ = 1 exakt: das ist der Grenzfall α = 2/λ_max = ${fmt(ALPHA_GRENZ, 3)}, den nur der Knopf trifft – auf dem 0,01-Raster des Reglers liegt er zwischen zwei Rastwerten. Die Schritte springen längs der Eigenrichtung zu λ_max zwischen zwei Punkten hin und her, ohne kleiner zu werden.`
          : rho > 0.98 && rho < 1.02
            ? `ρ = ${fmt(rho, 3)}: die Iteration ist nur noch knapp auf der ${rho < 1 ? "guten" : "falschen"} Seite des Grenzfalls α = 2/λ_max = ${fmt(ALPHA_GRENZ, 3)}. Der Verlust ${rho < 1 ? "fällt zwar noch, aber so langsam, dass zwölf Schritte kaum etwas ausrichten" : "wächst bereits, wenn auch langsam"}.`
            : rho < 1
              ? `ρ = ${fmt(rho, 3)} < 1: die Iteration läuft ins Minimum, der Verlust fällt je Schritt höchstens auf das ${fmt(rho * rho, 3)}-fache.${
                  aufgeloest
                    ? Math.abs(alpha - ALPHA_OPT) < 0.005
                      ? " Das ist die beste Wahl: bei α = 0,40 schrumpfen beide Eigenrichtungen mit demselben Faktor √5/5 = 0,447, und kein anderes α macht das Maximum der beiden kleiner."
                      : ` Ein Stück näher an α = ${fmt(ALPHA_OPT)} ginge es schneller.`
                    : ""
                }`
              : `ρ = ${fmt(rho, 3)} > 1: die Schritte schießen über das Minimum hinaus und werden immer größer, die Iteration läuft davon. ${ref("satz:gradient-der-quadratischen-form")} liefert dabei weiter den richtigen Gradienten, nur die Schrittweite ist zu groß.`}
      </Verdikt>
    </div>
  );
}

export function AbstiegStepper() {
  return (
    <Schaetzfrage
      variante="bereich"
      min={0.05}
      max={0.7}
      schritt={0.01}
      start={0.25}
      loesung={ALPHA_OPT}
      toleranz={0.05}
      einheit="α"
      fmt={(v) => fmt(v, 2)}
      frage={
        <>
          Bei welcher Lernrate α schrumpfen beide Eigenrichtungen von A gleich schnell, der
          Verlust also am zügigsten?
        </>
      }
      verdeckt={
        <p className="text-sm">
          Die dritte Tafel zeigt jetzt, warum: |1 − αλ| fällt für die kleine Eigenrichtung
          langsam und für die große schnell, ρ(α) ist das Maximum der beiden. Links vom
          Schnittpunkt bremst λ_min, rechts davon λ_max; das Minimum liegt genau dort, wo sich
          die beiden Kurven treffen.
        </p>
      }
    >
      {({ aufgeloest }) => <AbstiegTafeln aufgeloest={aufgeloest} />}
    </Schaetzfrage>
  );
}
