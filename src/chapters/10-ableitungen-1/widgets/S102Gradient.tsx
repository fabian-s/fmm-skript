import { useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import { LabeledPlot, Slider, niceTicks } from "../../../lib";
import type { Series } from "../../../lib";

/**
 * §10.2: zwei Widgets zum Gradienten.
 *
 * 1. Gradientenfeld: Höhenlinien von f(x) = x1^2 + 3 x1 x2 + 2 x2^2 mit dem
 *    orangen Gradientenpfeil an einem verschiebbaren Punkt, dazu eine frei
 *    wählbare Richtung und der Schnitt von f entlang des zugehörigen Strahls.
 *    Ersetzt die Folienbilder gradient4 und gradient_quadratic_example.
 * 2. AbstiegStepper: Gradientenabstieg auf L(theta) = 1/2 theta^T A theta mit
 *    A = (2 1; 1 3). Diese Matrix ist symmetrisch positiv definit (Spur 5,
 *    Determinante 5, Eigenwerte (5 ± sqrt 5)/2), L also strikt konvex. Die
 *    Beispielfunktion f oben hat dagegen einen Sattel und taugt nicht als
 *    Testfall für ein Abstiegsverfahren.
 *
 * Panel-Aufbau (SVG mit eigenen Achsen, Ticks aus niceTicks) wie in den
 * Kapitel-8-Widgets, z. B. widgets/S83Richardson.tsx. Die Idee, ein skalares
 * Feld mit Punkt und angehefteten Pfeilen zu zeigen, stammt aus FieldCanvas in
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S52.tsx; dort ist
 * es eine Canvas-Heatmap, hier sind es SVG-Höhenlinien. Alle Texte neu.
 *
 * Alle Zahlen per node nachgerechnet: grad f = (2x1 + 3x2, 3x1 + 4x2),
 * f(1,1) = 6 mit grad f(1,1) = (5,7) und ||grad f|| = sqrt(74) = 8,6023;
 * Hessematrix von f ist (2 3; 3 4) mit Determinante −1 (Sattel);
 * rho(alpha) = max_i |1 − alpha*lambda_i|, alpha* = 0,4 mit rho = sqrt(5)/5,
 * Divergenz ab alpha = 2/lambda_max = 0,5528.
 */

const BLAU = "#0072B2"; // Funktion, Höhenlinien
const GRUEN = "#009E73"; // lineare Approximation
const ROT = "#D55E00"; // Restterm
const ORANGE = "#E69F00"; // Gradient
const VIOLETT = "#9E57D5"; // frei gewählte Richtung

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

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

const SIZE = 288;
const PAD_L = 30;
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
  f,
  niveaus,
  hervor,
  fenster,
  punkte,
  pfeile,
  gerade,
  pfad,
  minimum,
  onPick,
}: {
  id: string;
  f: (x1: number, x2: number) => number;
  niveaus: number[];
  hervor?: number;
  fenster: [number, number, number, number];
  punkte: { p: [number, number]; farbe: string; r: number; deckkraft?: number }[];
  pfeile: Pfeil[];
  gerade?: { p: [number, number]; richtung: [number, number]; farbe: string };
  pfad?: [number, number][];
  minimum?: [number, number];
  onPick?: (p: [number, number]) => void;
}) {
  const [x0, x1, y0, y1] = fenster;
  // als useMemo, damit die Höhenlinien nicht bei jedem Render neu entstehen
  const px = useMemo(() => (x: number) => PAD_L + ((x - x0) / (x1 - x0)) * SIZE, [x0, x1]);
  const py = useMemo(() => (y: number) => SIZE - ((y - y0) / (y1 - y0)) * SIZE, [y0, y1]);

  const pfade = useMemo(
    () => konturPfade(f, niveaus, x0, x1, y0, y1, px, py),
    [f, niveaus, x0, x1, y0, y1, px, py],
  );
  const hervorPfad = useMemo(
    () => (hervor === undefined ? "" : konturPfade(f, [hervor], x0, x1, y0, y1, px, py)[0]),
    [f, hervor, x0, x1, y0, y1, px, py],
  );

  const greifen = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!onPick) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sx = (e.clientX - r.left) * ((PAD_L + SIZE + PAD_R) / r.width);
    const sy = (e.clientY - r.top) * ((SIZE + PAD_B) / r.height);
    const wx = x0 + ((sx - PAD_L) / SIZE) * (x1 - x0);
    const wy = y0 + ((SIZE - sy) / SIZE) * (y1 - y0);
    const klemm = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    onPick([
      Math.round(klemm(wx, x0, x1) * 20) / 20,
      Math.round(klemm(wy, y0, y1) * 20) / 20,
    ]);
  };

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

  return (
    <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        x₂ ↑
      </div>
      <svg
        width={PAD_L + SIZE + PAD_R}
        height={SIZE + PAD_B}
        className={`rounded border border-slate-300 bg-white dark:border-slate-600 ${
          onPick ? "cursor-crosshair" : ""
        }`}
        onPointerDown={greifen}
        onPointerMove={(e) => {
          if (e.buttons === 1) greifen(e);
        }}
      >
        <defs>
          <clipPath id={`${id}-clip`}>
            <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <marker id={`${id}-pfeil-o`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} />
          </marker>
          <marker id={`${id}-pfeil-v`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 z" fill={VIOLETT} />
          </marker>
        </defs>
        {niceTicks(y0, y1).map((t) => (
          <g key={`y${t}`}>
            <line x1={PAD_L} x2={PAD_L + SIZE} y1={py(t)} y2={py(t)} stroke="#e2e8f0" strokeWidth={t === 0 ? 1.2 : 0.6} />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
              {fmt(t, Math.abs(t) >= 1 || t === 0 ? 0 : 1)}
            </text>
          </g>
        ))}
        {niceTicks(x0, x1).map((t) => (
          <g key={`x${t}`}>
            <line y1={0} y2={SIZE} x1={px(t)} x2={px(t)} stroke="#e2e8f0" strokeWidth={t === 0 ? 1.2 : 0.6} />
            <text x={px(t)} y={SIZE + 12} textAnchor="middle" fill="#64748b" fontSize={10}>
              {fmt(t, Math.abs(t) >= 1 || t === 0 ? 0 : 1)}
            </text>
          </g>
        ))}
        <g clipPath={`url(#${id}-clip)`}>
          {pfade.map((d, i) => (
            <path key={i} d={d} stroke={BLAU} strokeWidth={0.9} opacity={0.35} fill="none" />
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
                  stroke="#ffffff"
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
      <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
        x₁ →
      </div>
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

const FELDER = [
  {
    kurz: "quadratisch",
    name: "f(x) = x₁² + 3x₁x₂ + 2x₂²",
    f: f2,
    grad: grad2,
    niveaus: [-0.4, 0, 0.5, 1, 2, 4, 6, 9, 12, 16, 20],
    start: [1, 1] as [number, number],
    gmax: maxNorm(grad2),
  },
  {
    kurz: "wellig",
    name: "g(x) = x₁·exp(−x₁² − x₂²)",
    f: g2,
    grad: gradG,
    niveaus: [-0.4, -0.3, -0.2, -0.1, -0.03, 0.03, 0.1, 0.2, 0.3, 0.4],
    start: [0.6, 0.5] as [number, number],
    gmax: maxNorm(gradG),
  },
];

export function Gradientenfeld() {
  const [modus, setModus] = useState(0);
  const [x1, setX1] = useState(FELDER[0].start[0]);
  const [x2, setX2] = useState(FELDER[0].start[1]);
  const [phi, setPhi] = useState(0);

  const feld = FELDER[modus];
  const wert = feld.f(x1, x2);
  const g = feld.grad(x1, x2);
  const norm = Math.hypot(g[0], g[1]);
  const rad = (phi * Math.PI) / 180;
  const d: [number, number] = [Math.cos(rad), Math.sin(rad)];
  const richtungsAbleitung = g[0] * d[0] + g[1] * d[1];
  const gradWinkel = norm > 1e-9 ? ((Math.atan2(g[1], g[0]) * 180) / Math.PI + 360) % 360 : NaN;

  // Pfeillänge: 0,25 bis 1,1 Einheiten, proportional zu ‖∇f(x)‖ und auf den
  // größten Gradientenbetrag des Ausschnitts normiert. Der Zahlenwert steht
  // im Readout, der Pfeil zeigt Richtung und Größenverhältnis.
  const laenge = 0.25 + 0.85 * Math.min(1, norm / feld.gmax);
  const hatGradient = norm > 1e-9;
  const gPfeil: [number, number] = hatGradient
    ? [x1 + (laenge * g[0]) / norm, x2 + (laenge * g[1]) / norm]
    : [x1, x2];
  const dPfeil: [number, number] = [x1 + 0.6 * d[0], x2 + 0.6 * d[1]];
  // Ohne Gradient gibt es weder eine ausgezeichnete Richtung noch eine
  // eindeutige Tangente an die Höhenlinie: dann bleiben Pfeil und Gerade weg.
  const tangente: [number, number] = hatGradient ? [-g[1] / norm, g[0] / norm] : [1, 0];

  const strahl = (t: number) => feld.f(x1 + t * d[0], x2 + t * d[1]);
  const linear = (t: number) => wert + t * richtungsAbleitung;
  const rest = strahl(0.5) - linear(0.5);
  const yWerte = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]
    .map(strahl)
    .concat([linear(-1), linear(1)]);
  const spanne = Math.max(...yWerte) - Math.min(...yWerte);
  const rand = Math.max(0.1, 0.15 * spanne);
  const yLo = Math.min(...yWerte) - rand;
  const yHi = Math.max(...yWerte) + rand;

  const serien: Series[] = [
    { f: strahl, color: BLAU },
    { f: linear, color: GRUEN, dash: [6, 4] },
  ];

  const wechsle = (i: number) => {
    setModus(i);
    setX1(FELDER[i].start[0]);
    setX2(FELDER[i].start[1]);
    setPhi(0);
  };

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Die blauen Kurven sind Höhenlinien von {feld.name}, die dicke Linie gehört zum Niveau
        des aktuellen Punktes. Der orange Pfeil ist der Gradient, als Spalte ∇f(x)ᵀ an den
        Punkt geheftet. Seine Länge wächst mit ‖∇f(x)‖, bleibt aber zwischen 0,25 und 1,1
        Einheiten: so ist er auch an flachen Stellen sichtbar und läuft an steilen nicht aus
        dem Bild. Den Zahlenwert lesen wir unten ab. Die blau gestrichelte Gerade ist die
        Tangente an die Höhenlinie, und zwischen ihr und dem Pfeil steht an jeder Stelle ein
        rechter Winkel. Den Punkt setzen wir mit den Schiebereglern oder per Klick ins Feld,
        die violette Richtung d mit dem dritten Regler.
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {FELDER.map((v, i) => (
          <button
            key={v.kurz}
            type="button"
            className={`rounded border px-3 py-1 ${
              i === modus
                ? "border-sky-600 bg-sky-50 font-semibold dark:bg-sky-900/40"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => wechsle(i)}
          >
            {v.name}
          </button>
        ))}
      </div>
      <Slider label="x₁" value={x1} onChange={(v) => setX1(Math.round(v * 20) / 20)} min={-2} max={2} step={0.05} fmt={(v) => fmt(v)} />
      <Slider label="x₂" value={x2} onChange={(v) => setX2(Math.round(v * 20) / 20)} min={-2} max={2} step={0.05} fmt={(v) => fmt(v)} />
      <Slider label="φ (Richtung d)" value={phi} onChange={(v) => setPhi(Math.round(v))} min={0} max={359} step={1} fmt={(v) => `${fmt(v, 0)}°`} />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setPhi(Math.round(gradWinkel))}
          disabled={!Number.isFinite(gradWinkel)}
        >
          d in Gradientenrichtung
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => wechsle(modus)}
        >
          zurücksetzen
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <FeldPanel
          id="s102-feld"
          f={feld.f}
          niveaus={feld.niveaus}
          hervor={wert}
          fenster={FENSTER}
          punkte={[{ p: [x1, x2], farbe: "#0f172a", r: 4.5 }]}
          pfeile={[
            { von: [x1, x2], nach: dPfeil, farbe: VIOLETT, marker: "s102-feld-pfeil-v", beschriftung: "d" },
            ...(hatGradient
              ? [
                  {
                    von: [x1, x2] as [number, number],
                    nach: gPfeil,
                    farbe: ORANGE,
                    marker: "s102-feld-pfeil-o",
                    beschriftung: "∇f(x)ᵀ",
                  },
                ]
              : []),
          ]}
          gerade={hatGradient ? { p: [x1, x2], richtung: tangente, farbe: BLAU } : undefined}
          onPick={([a, b]) => {
            setX1(a);
            setX2(b);
          }}
        />
        <div>
          <LabeledPlot
            xLabel="t"
            yLabel="f(x + t·d)"
            series={serien}
            markers={[{ x: 0, y: wert, color: "#0f172a" }]}
            xDomain={[-1, 1]}
            yDomain={[yLo, yHi]}
            width={288}
            height={288}
          />
          <p className="mt-1 max-w-[320px] text-xs text-slate-600 dark:text-slate-300">
            Blau: die Funktion entlang des Strahls x + t·d. Grün gestrichelt: die lineare
            Näherung f(x) + t·∇f(x)d aus Gleichung (10.2.2). Bei t = 0 berühren sich beide,
            daneben klafft der Restterm.
          </p>
        </div>
      </div>
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p>
          <span className="font-mono">
            x = ({fmt(x1)}; {fmt(x2)}), f(x) = {fmt(wert, 3)}
          </span>
          , Gradient{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            ∇f(x) = ({fmt(g[0], 3)}; {fmt(g[1], 3)})
          </span>{" "}
          mit ‖∇f(x)‖ = <span className="font-mono">{fmt(norm, 3)}</span>
        </p>
        <p>
          Richtung{" "}
          <span className="font-mono" style={{ color: VIOLETT }}>
            d = ({fmt(d[0], 3)}; {fmt(d[1], 3)})
          </span>
          , Richtungsableitung <span className="font-mono">∇f(x)d = {fmt(richtungsAbleitung, 3)}</span>,
          Maximum <span className="font-mono">{fmt(norm, 3)}</span> bei φ ={" "}
          <span className="font-mono">{Number.isFinite(gradWinkel) ? `${fmt(gradWinkel, 1)}°` : "–"}</span>
        </p>
        <p>
          Restterm bei t = 0,5:{" "}
          <span className="font-mono" style={{ color: ROT }}>
            f(x + 0,5d) − [f(x) + 0,5·∇f(x)d] = {fmt(rest, 4)}
          </span>
        </p>
        <p>
          {norm < 1e-9
            ? "Hier verschwindet der Gradient. Dann zeichnet sich keine Richtung mehr aus, und die Höhenlinie durch den Punkt ist keine glatte Kurve mehr: solche Stellen sind die Kandidaten für Extremwerte und Sattelpunkte."
            : richtungsAbleitung >= norm * COS_RASTER
              ? `Diese Richtung ist bis auf die 1°-Rasterung des Reglers die des stärksten Anstiegs: ∇f(x)d erreicht ‖∇f(x)‖ = ${fmt(norm, 3)}, wie Satz 10.2.4 es verlangt.`
              : richtungsAbleitung <= -norm * COS_RASTER
                ? `Diese Richtung ist die des stärksten Abstiegs, die Gegenrichtung zum Gradienten: ∇f(x)d erreicht −‖∇f(x)‖ = ${fmt(-norm, 3)}.`
                : Math.abs(richtungsAbleitung) <= norm * SIN_RASTER
                  ? "Diese Richtung läuft längs der Höhenlinie: die Richtungsableitung ist bis auf die Rasterung des Reglers null, in erster Ordnung ändert sich f hier also nicht."
                  : `In dieser Richtung ändert sich f mit der Rate ${fmt(richtungsAbleitung, 3)}, also dem ${fmt(richtungsAbleitung / norm, 3)}-fachen des Maximums ‖∇f(x)‖.`}
        </p>
      </div>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-300">
        {modus === 0
          ? "Zwei Stellen lohnen sich bei der quadratischen Funktion. Auf den Geraden x₂ = −x₁ und x₂ = −x₁/2 ist f(x) = 0, denn f zerfällt in das Produkt (x₁ + x₂)(x₁ + 2x₂); die Höhenlinie zum Niveau 0 besteht genau aus diesen beiden Geraden, die sich im Nullpunkt kreuzen. Dort ist der Gradient der Nullvektor, und der Nullpunkt ist ein Sattel: in der einen Richtung steigt f, in der anderen fällt es."
          : "Die welligen Höhenlinien zeigen dasselbe Bild wie im quadratischen Fall, nur krummlinig: der Gradient steht überall senkrecht auf der Höhenlinie und wird flach, wo die Linien weit auseinanderliegen. In (0,707; 0) und (−0,707; 0) verschwindet er ganz, dort liegen der größte und der kleinste Wert von g."}
      </p>
    </div>
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

export function AbstiegStepper() {
  const [alpha, setAlpha] = useState(0.4);
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

  const { serien, marker, yDomain } = useMemo(() => {
    const L0 = verlust(START[0], START[1]);
    const lg = (v: number) => (v > 0 ? Math.log10(v) : NaN);
    const schranke = (x: number) => Math.log10(L0) + 2 * x * Math.log10(rho);
    const marker = bahn
      .slice(0, k + 1)
      .map((p, i) => ({ x: i, y: lg(verlust(p[0], p[1])), color: BLAU }))
      .filter((m) => Number.isFinite(m.y));
    const alle = bahn.map((p) => lg(verlust(p[0], p[1]))).filter((v) => Number.isFinite(v));
    const grenzen = [...alle, schranke(0), schranke(KMAX)].filter((v) => Number.isFinite(v));
    const lo = Math.max(-14, Math.min(...grenzen) - 0.5);
    const hi = Math.max(...grenzen) + 0.5;
    const serien: Series[] = [{ f: schranke, color: VIOLETT, dash: [7, 4] }];
    return { serien, marker, yDomain: [lo, hi] as [number, number] };
  }, [bahn, rho, k]);

  const fenster: [number, number, number, number] = [-2.4, 2.4, -2.4, 2.4];
  const imBild = (p: [number, number]) =>
    p[0] >= fenster[0] && p[0] <= fenster[1] && p[1] >= fenster[2] && p[1] <= fenster[3];

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Hier läuft Algorithmus 10.2.10 auf L(θ) = ½θᵀAθ mit A = (2 1; 1 3). Diese Matrix ist
        symmetrisch positiv definit, L also strikt konvex mit dem einzigen Minimum θ = 0 (grüner
        Kreis). Nach Satz 10.2.8 ist ∇L(θ) = θᵀA, transponiert also Aθ, und der orange Pfeil
        zeigt den nächsten Schritt −α∇L(θ)ᵀ. Rechts stehen die Verluste (blau) auf
        logarithmischer Skala, dazu violett gestrichelt die Schranke ρ²ᵗ·L(θ⁽⁰⁾) mit
        ρ = maxᵢ|1 − αλᵢ|. Die blauen Punkte liegen auf oder unter dieser Geraden. Bei der
        optimalen Lernrate α = 0,40 liegen sie genau darauf, denn dort schrumpfen beide
        Eigenrichtungen mit demselben Faktor.
      </p>
      <Slider
        label="α (Lernrate)"
        value={alpha}
        onChange={(v) => setAlpha(Math.round(v * 100) / 100)}
        min={0.05}
        max={0.7}
        step={0.01}
        fmt={(v) => fmt(v)}
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setK((v) => Math.max(0, v - 1))}
          disabled={k === 0}
        >
          ← Schritt zurück
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setK((v) => Math.min(KMAX, v + 1))}
          disabled={k === KMAX}
        >
          Schritt vorwärts →
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setK(0)}
        >
          zurücksetzen
        </button>
        <span className="font-mono">t = {k}</span>
      </div>
      <div className="flex flex-wrap gap-4">
        <FeldPanel
          id="s102-abstieg"
          f={verlust}
          niveaus={NIVEAUS_L}
          fenster={fenster}
          minimum={[0, 0]}
          pfad={bahn.slice(0, k + 1)}
          punkte={bahn.slice(0, k + 1).map((p, i) => ({
            p,
            farbe: BLAU,
            r: i === k ? 4.5 : 2.5,
            deckkraft: i === k ? 1 : 0.55,
          }))}
          pfeile={
            k < KMAX && imBild(jetzt)
              ? [
                  {
                    von: jetzt,
                    nach: naechster,
                    farbe: ORANGE,
                    marker: "s102-abstieg-pfeil-o",
                  },
                ]
              : []
          }
        />
        <LabeledPlot
          xLabel="t (Schritt)"
          yLabel="log₁₀ L(θ⁽ᵗ⁾)"
          series={serien}
          markers={marker}
          xDomain={[0, KMAX]}
          yDomain={yDomain}
          width={288}
          height={288}
        />
      </div>
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p>
          <span className="font-mono">
            θ⁽{sup(k)}⁾ = ({fmt(jetzt[0], 3)}; {fmt(jetzt[1], 3)})
          </span>
          , Verlust <span className="font-mono">L = {fmt(L, 4)}</span>, Verhältnis zum Vorschritt{" "}
          <span className="font-mono">{fmt(quotient, 3)}</span> (Schranke ρ² ={" "}
          <span className="font-mono" style={{ color: VIOLETT }}>
            {fmt(rho * rho, 3)}
          </span>
          )
        </p>
        <p>
          <span className="font-mono" style={{ color: ORANGE }}>
            ∇L(θ⁽{sup(k)}⁾) = ({fmt(g[0], 3)}; {fmt(g[1], 3)}) ∈ ℝ¹ˣ²
          </span>
          , Schritt{" "}
          <span className="font-mono">
            −α∇L(θ⁽{sup(k)}⁾)ᵀ = ({fmt(-alpha * g[0], 3)}; {fmt(-alpha * g[1], 3)})ᵀ
          </span>
        </p>
        <p>
          {rho < 0.999
            ? `ρ = ${fmt(rho, 3)} < 1: die Iteration läuft ins Minimum, der Verlust fällt je Schritt höchstens auf das ${fmt(rho * rho, 3)}-fache.`
            : rho <= 1.001
              ? "ρ ≈ 1: der Grenzfall α = 2/λ_max. Die Schritte springen zwischen zwei Punkten hin und her, ohne kleiner zu werden."
              : `ρ = ${fmt(rho, 3)} > 1: die Schritte schießen über das Minimum hinaus und werden immer größer, die Iteration läuft davon.`}
        </p>
      </div>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-300">
        Drei Marken lohnen sich. α = {fmt(ALPHA_OPT)} = 2/(λ_min + λ_max) ist hier optimal,
        beide Eigenrichtungen schrumpfen dann gleich schnell auf das{" "}
        {fmt(Math.sqrt(5) / 5, 3)}-fache. Unterhalb von 1/λ_max = {fmt(1 / LMAX, 3)} nähern
        sich die Iterierten ohne Überschwingen, dafür langsamer. Und ab α ={" "}
        {fmt(ALPHA_GRENZ, 3)} = 2/λ_max ist ρ ≥ 1, dann kommt die Iteration nicht mehr voran
        oder läuft ganz davon. Für die Beispielfunktion f aus diesem Abschnitt gäbe es kein
        brauchbares α: Ihre Hesse-Matrix hat den negativen Eigenwert{" "}
        {fmt(3 - Math.sqrt(10), 3)}, und entlang dieser Eigenrichtung wächst der Abstand zum
        Sattel bei jeder Lernrate.
      </p>
    </div>
  );
}
