import { useMemo, useState, type ReactNode } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  Schaetzfrage,
  Slider,
  Surface3D,
  Verdikt,
  ViewControls,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";
import type { Kurve3D, Punkt3D, Sicht3D, Vec3 } from "../../../lib";
import { gitter, hoehenlinie, niveaus, type Segment } from "./S114Kontur";

/**
 * §11.4: Die EINE Einsicht — halbieren wir den Radius um den Entwicklungspunkt,
 * so fällt der Fehler der Tangentialebene auf ein Viertel und der der Quadrik
 * auf ein Achtel, solange der jeweils führende Restterm nicht selbst
 * verschwindet.
 *
 * Ersetzt die taylor2d_*-Grafiken der Folien (11-ableitungen-II, Abschnitt
 * „Taylorapproximation für Vektor-zu-Skalar") durch drei verlinkte Tafeln
 * (Muster 3): links die Höhenlinien von f und die des Taylorpolynoms
 * übereinander (die tot lesbare Hauptdarstellung, alle Zahlen stehen im
 * Verdikt), in der Mitte dieselbe Funktion als Fläche über der Ebene
 * (`Surface3D`, D7) mit der Tangentialebene T₁ beziehungsweise dem
 * Tangentialparaboloid T₂ und den beiden Messringen, rechts der Betrag des
 * Fehlers als Schattierung. Der Entwicklungspunkt ist in allen drei Tafeln
 * derselbe und links direkt ziehbar (Doppelpfad: die beiden Regler darunter).
 *
 * Eigenbau, kein portierter Code; die Höhenlinien kommen aus S114Kontur.ts,
 * das Drag-Rezept aus `useDrag` (lib), die 3D-Tafel folgt dem Pilot
 * `S113Hesse.tsx`. Alles ist deterministisch: feste Funktionen, festes Gitter,
 * kein Zufall.
 *
 * Farbrollen Kapitel 11: Funktion blau, Taylorpolynom (Näherungsterm) grün,
 * Fehler rot, Ableitungsobjekte (Gradient, Hesse-Matrix, Entwicklungspunkt,
 * Messkreis) orange.
 *
 * Nachgerechnet (node, rev-s114-b/f.mjs): Gradienten und Hesse-Matrizen aller
 * drei Funktionen stimmen an mehreren Stellen bis auf 1e-5 mit zentralen
 * Differenzen überein.
 *
 * Nachgerechnet (scratchpad/verify-11-ableitungen-2/check-s114.mjs,
 * 2026-08-19): In der Voreinstellung (0,75; −1,25) mit r = 0,8 fällt der größte
 * Fehler auf dem Kreis beim Halbieren des Radius
 *   für T₁ auf ein 4,341- (sin+cos), 3,990- (Glocke) bzw. exakt 4,000-faches
 *   (Quadrik), für T₂ auf ein 8,066- bzw. 8,778-faches;
 * auf der Quadrik ist der T₂-Fehler 7,1e−15, also numerisch null. Gradient und
 * Hesse-Matrix treffen die zentralen Differenzen auf 8e−11 bzw. 2e−6.
 * Wertebereich auf dem gezeigten Fenster [−2,5; 2,5]²: −1,801 bis 2,000
 * (sin+cos), 0,002 bis 1,000 (Glocke), −3,597 bis 68,750 (Quadrik).
 *
 * ACHTUNG (Live-Zustand): Die Faustzahlen 4 und 8 gelten nur, solange der
 * jeweils führende Restterm nicht selbst verschwindet. Über den ganzen
 * Reglerbereich läuft der Quotient für T₁ von 2,70 bis 7,28 und für T₂ von
 * 5,79 bis 15,98 (Extremfälle: H ≈ 0 bei sin+cos in (0; 1,55), und im Zentrum
 * der Glocke verschwinden alle dritten Ableitungen). Das Verdikt verzweigt
 * deshalb.
 */

const BLAU = FMM_COLORS.blau; // f, Höhenlinien von f, Fläche
const GRUEN = FMM_COLORS.gruen; // Taylorpolynom T₁ bzw. T₂
const ROT = FMM_COLORS.rot; // Fehler
const ORANGE = FMM_COLORS.orange; // Entwicklungspunkt, Messkreis, Ableitungsobjekte

interface Funktion {
  id: string;
  label: string;
  f: (a: number, b: number) => number;
  grad: (a: number, b: number) => [number, number];
  hess: (a: number, b: number) => [[number, number], [number, number]];
  quadratisch: boolean;
}

const FUNKTIONEN: Funktion[] = [
  {
    id: "sincos",
    label: "sin(x₁) + cos(x₂)",
    f: (a, b) => Math.sin(a) + Math.cos(b),
    grad: (a, b) => [Math.cos(a), -Math.sin(b)],
    hess: (a, b) => [
      [-Math.sin(a), 0],
      [0, -Math.cos(b)],
    ],
    quadratisch: false,
  },
  {
    id: "glocke",
    label: "exp(−‖x‖²/2)",
    f: (a, b) => Math.exp(-(a * a + b * b) / 2),
    grad: (a, b) => {
      const e = Math.exp(-(a * a + b * b) / 2);
      return [-a * e, -b * e];
    },
    hess: (a, b) => {
      const e = Math.exp(-(a * a + b * b) / 2);
      return [
        [(a * a - 1) * e, a * b * e],
        [a * b * e, (b * b - 1) * e],
      ];
    },
    quadratisch: false,
  },
  {
    id: "quadrik",
    label: "2x₁² + 2x₁x₂ + 3x₂² − 4x₁ − 6x₂",
    f: (a, b) => 2 * a * a + 2 * a * b + 3 * b * b - 4 * a - 6 * b,
    grad: (a, b) => [4 * a + 2 * b - 4, 2 * a + 6 * b - 6],
    hess: () => [
      [4, 2],
      [2, 6],
    ],
    quadratisch: true,
  },
];

const D: [number, number] = [-2.5, 2.5];
const N_GITTER = 44;
const N_NIVEAUS = 8;
const N_FEHLER = 30;
const W = 230;
const PAD_L = 26;
const PAD_B = 16;
const PAD_R = 6;
/** Reglerbereich des Entwicklungspunktes; der Zug wird darauf geklemmt. */
const P_MIN = -2;
const P_MAX = 2;

const fmt = (v: number, d = 3) => fmtDe(v, d);

const px = (t: number) => PAD_L + ((t - D[0]) / (D[1] - D[0])) * W;
const py = (t: number) => ((D[1] - t) / (D[1] - D[0])) * W;

const TICKS = niceTicks(D[0], D[1]);
const D_TICK = TICKS.length > 1 ? TICKS[1] - TICKS[0] : undefined;

interface TafelProps {
  titel: string;
  ariaLabel: string;
  children: ReactNode;
  /** an das <svg> gespreadete Zusatz-Props (Zeigerbehandlung beim Ziehen) */
  svgProps?: Record<string, unknown>;
}

function Tafel({ titel, ariaLabel, children, svgProps }: TafelProps) {
  return (
    <div className={`select-none text-[10px] ${W_MUTED}`}>
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        {titel}
      </div>
      <svg
        viewBox={`0 0 ${PAD_L + W + PAD_R} ${W + PAD_B}`}
        width={PAD_L + W + PAD_R}
        height={W + PAD_B}
        role="img"
        aria-label={ariaLabel}
        {...svgProps}
        className="h-auto max-w-full rounded border"
        style={{ background: "var(--w-bg)", borderColor: "var(--w-border)" }}
      >
        {TICKS.map((t) => (
          <g key={`t${t}`}>
            <line x1={PAD_L} x2={PAD_L + W} y1={py(t)} y2={py(t)} stroke="var(--w-grid)" strokeWidth={0.6} />
            <line y1={0} y2={W} x1={px(t)} x2={px(t)} stroke="var(--w-grid)" strokeWidth={0.6} />
            <text x={PAD_L - 3} y={py(t) + 3} textAnchor="end" fill="var(--w-text)" fontSize={9}>
              {fmtTick(t, D_TICK)}
            </text>
            <text x={px(t)} y={W + 11} textAnchor="middle" fill="var(--w-text)" fontSize={9}>
              {fmtTick(t, D_TICK)}
            </text>
          </g>
        ))}
        <line x1={PAD_L} x2={PAD_L + W} y1={py(0)} y2={py(0)} stroke="var(--w-axis)" strokeWidth={1} />
        <line y1={0} y2={W} x1={px(0)} x2={px(0)} stroke="var(--w-axis)" strokeWidth={1} />
        {children}
      </svg>
    </div>
  );
}

/**
 * Alle Segmente einer Schar in EINEN Pfad schreiben: ein paar tausend
 * einzelne <line>-Knoten machen das Nachziehen der Regler spürbar zäh.
 */
function pfad(segmente: Segment[]): string {
  return segmente
    .map(
      (s) =>
        `M${px(s.x1).toFixed(1)},${py(s.y1).toFixed(1)}L${px(s.x2).toFixed(1)},${py(s.y2).toFixed(1)}`,
    )
    .join("");
}

function Linien({ segmente, farbe, gestrichelt }: { segmente: Segment[]; farbe: string; gestrichelt?: boolean }) {
  return (
    <path
      d={pfad(segmente)}
      fill="none"
      stroke={farbe}
      strokeWidth={1.4}
      strokeDasharray={gestrichelt ? "5 4" : undefined}
    />
  );
}

export function Taylor2DWidget() {
  const [fnId, setFnId] = useState("sincos");
  const [ordnung, setOrdnung] = useState(1);
  const [x1, setX1] = useState(0.75);
  const [x2, setX2] = useState(-1.25);
  const [r, setR] = useState(0.8);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 26 });

  const fn = FUNKTIONEN.find((k) => k.id === fnId) ?? FUNKTIONEN[0];

  const { f0, g, H } = useMemo(
    () => ({ f0: fn.f(x1, x2), g: fn.grad(x1, x2), H: fn.hess(x1, x2) }),
    [fn, x1, x2],
  );

  /** Taylorpolynom der gewählten Ordnung, ausgewertet an der Stelle (a, b). */
  const T = useMemo(() => {
    return (a: number, b: number) => {
      const h1 = a - x1;
      const h2 = b - x2;
      let wert = f0 + g[0] * h1 + g[1] * h2;
      if (ordnung === 2) {
        wert += 0.5 * (h1 * (H[0][0] * h1 + H[0][1] * h2) + h2 * (H[1][0] * h1 + H[1][1] * h2));
      }
      return wert;
    };
  }, [ordnung, x1, x2, f0, g, H]);

  const { linienF, linienT, fehlerGitter, maxFehlerFenster, fMin, fMax } = useMemo(() => {
    const gF = gitter(fn.f, D, D, N_GITTER);
    const gT = gitter(T, D, D, N_GITTER);
    const stufen = niveaus(gF.min, gF.max, N_NIVEAUS);
    const lF: Segment[] = [];
    const lT: Segment[] = [];
    for (const n of stufen) {
      lF.push(...hoehenlinie(gF, n));
      lT.push(...hoehenlinie(gT, n));
    }
    const feld: number[][] = [];
    let maxE = 0;
    for (let i = 0; i < N_FEHLER; i++) {
      const zeile: number[] = [];
      for (let j = 0; j < N_FEHLER; j++) {
        const a = D[0] + ((D[1] - D[0]) * (i + 0.5)) / N_FEHLER;
        const b = D[0] + ((D[1] - D[0]) * (j + 0.5)) / N_FEHLER;
        const e = Math.abs(fn.f(a, b) - T(a, b));
        zeile.push(e);
        if (e > maxE) maxE = e;
      }
      feld.push(zeile);
    }
    return {
      linienF: lF,
      linienT: lT,
      fehlerGitter: feld,
      maxFehlerFenster: maxE,
      fMin: gF.min,
      fMax: gF.max,
    };
  }, [fn, T]);

  /** Größter Abstand von f und T auf dem Kreis mit Radius rad um den Entwicklungspunkt. */
  const kreisFehler = (rad: number) => {
    let m = 0;
    for (let i = 0; i < 360; i++) {
      const t = (2 * Math.PI * i) / 360;
      const a = x1 + rad * Math.cos(t);
      const b = x2 + rad * Math.sin(t);
      m = Math.max(m, Math.abs(fn.f(a, b) - T(a, b)));
    }
    return m;
  };
  const eR = kreisFehler(r);
  const eHalb = kreisFehler(r / 2);
  const quotient = eHalb > 1e-13 ? eR / eHalb : NaN;
  const zeigeFehler = maxFehlerFenster > 1e-9;

  const detH = H[0][0] * H[1][1] - H[0][1] * H[1][0];
  const spurH = H[0][0] + H[1][1];
  const kruemmung =
    detH > 1e-9 && spurH > 0
      ? "positiv definit"
      : detH > 1e-9 && spurH < 0
        ? "negativ definit"
        : detH < -1e-9
          ? "indefinit"
          : "singulär";
  const konturForm =
    kruemmung === "positiv definit" || kruemmung === "negativ definit"
      ? "Ellipsen"
      : kruemmung === "indefinit"
        ? "Hyperbeln"
        : "Parallelen oder Parabeln";

  /* ------------------------------------------- Ziehen des Entwicklungspunkts */
  const zieh = useDrag<"p">({
    feld: { x0: PAD_L, y0: 0, w: W, h: W },
    welt: { x0: D[0], x1: D[1], y0: D[0], y1: D[1] },
    snap: 0.05,
    greifPosition: () => [x1, x2],
    clamp: ([a, b]) => [clamp(a, P_MIN, P_MAX), clamp(b, P_MIN, P_MAX)],
    onDrag: ([a, b]) => {
      setX1(a);
      setX2(b);
    },
  });

  /* --------------------------------------------- verlinkte 3D-Tafel (D7) */
  const [zLo, zHi] = useMemo((): [number, number] => {
    // Der Höhenbereich deckt f auf dem Fenster und die Näherung auf dem
    // Messkreis ab, damit beide Ringe im Bild bleiben.
    let lo = fMin;
    let hi = fMax;
    for (let i = 0; i < 60; i++) {
      const t = (2 * Math.PI * i) / 60;
      const v = T(x1 + r * Math.cos(t), x2 + r * Math.sin(t));
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
    return hi - lo < 1e-9 ? [lo - 1, hi + 1] : [lo, hi];
  }, [fMin, fMax, T, x1, x2, r]);

  const flaeche = useMemo(
    () => ({ f: fn.f, nx: 26, ny: 26, color: BLAU, opacity: 0.8, wire: true }),
    [fn],
  );
  const punkte3d = useMemo<Punkt3D[]>(
    () => [{ p: [x1, x2, f0] as Vec3, color: ORANGE, r: 4, label: "x", onTop: true }],
    [x1, x2, f0],
  );
  /** Ein Ring auf einer Fläche: derselbe Messkreis wie links, nur angehoben. */
  const ring = (h: (a: number, b: number) => number, rad: number): [number, number, number][] => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 72; i++) {
      const t = (2 * Math.PI * i) / 72;
      const a = x1 + rad * Math.cos(t);
      const b = x2 + rad * Math.sin(t);
      pts.push([a, b, h(a, b)]);
    }
    return pts;
  };
  const kurven3d = useMemo<Kurve3D[]>(() => {
    const raus: Kurve3D[] = [
      { pts: ring(fn.f, r) as Vec3[], color: BLAU, width: 2 },
      { pts: ring(T, r) as Vec3[], color: GRUEN, width: 2, dash: "5 4" },
    ];
    // Die Näherungsfläche selbst: für T₁ vier Kanten der Tangentialebene,
    // für T₂ zusätzlich innere Ringe, damit sich die Krümmung zeigt.
    const speichen = 4;
    for (let k = 0; k < speichen; k++) {
      const t = (Math.PI * k) / speichen;
      const a0 = x1 - 1.15 * r * Math.cos(t);
      const b0 = x2 - 1.15 * r * Math.sin(t);
      const a1 = x1 + 1.15 * r * Math.cos(t);
      const b1 = x2 + 1.15 * r * Math.sin(t);
      raus.push({
        pts: Array.from({ length: 21 }, (_, i): Vec3 => {
          const s = i / 20;
          const a = a0 + s * (a1 - a0);
          const b = b0 + s * (b1 - b0);
          return [a, b, T(a, b)];
        }),
        color: GRUEN,
        width: 1,
      });
    }
    if (ordnung === 2) raus.push({ pts: ring(T, r / 2) as Vec3[], color: GRUEN, width: 1 });
    return raus;
    // ring/T/fn hängen an denselben Zuständen wie T selbst
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, T, r, x1, x2, ordnung]);

  /* ------------------------------------------------------------- Verdikt */
  let art: "neutral" | "ok" | "warn" = "neutral";
  let status: string;
  if (fn.quadratisch && ordnung === 2) {
    art = "ok";
    status =
      `Auf dieser Quadrik ist T₂ nicht bloß eine Näherung, sondern f selbst: Die Hesse-Matrix ist ` +
      `konstant, alle Ableitungen ab der dritten verschwinden, und das Restglied aus Korollar 11.4.9 ist ` +
      `null. Grüne und blaue Höhenlinien decken sich, die rechte Tafel bleibt weiß, die beiden Ringe in ` +
      `der Raumtafel liegen aufeinander, und der gemessene Fehler von ` +
      `${eR.toExponential(1).replace(".", ",")} auf dem Kreis ist reines Rundungsrauschen. ` +
      `Auf genau dieser Beobachtung beruht der eine exakte Newton-Schritt weiter unten.`;
  } else if (fn.quadratisch) {
    art = "neutral";
    status =
      `Die Tangentialebene lässt hier den vollständigen quadratischen Anteil stehen: Der Fehler ist ` +
      `exakt ½h⊤H h mit konstantem H, deshalb steht beim Halbieren des Radius der Quotient ` +
      `${fmt(quotient, 2)} und nicht bloß „ungefähr 4". Ein Umschalten auf T₂ drückt ihn auf null.`;
  } else {
    const erwartet = ordnung === 1 ? 4 : 8;
    const passt = Number.isFinite(quotient) && Math.abs(quotient - erwartet) <= 0.25 * erwartet;
    art = passt ? "ok" : "warn";
    const abweichung = passt
      ? `Das ist die Größenordnung, die Korollar 11.4.9 nahelegt.`
      : quotient > erwartet
        ? `Das liegt deutlich über den ${erwartet}, die Korollar 11.4.9 nahelegt: An dieser Stelle ist ` +
          `der führende Restterm fast null, sodass schon die nächste Ordnung den Fehler bestimmt, und ` +
          `dann steht dort das Doppelte.`
        : `Das liegt unter den ${erwartet} aus Korollar 11.4.9, weil der Radius für die Aussage noch ` +
          `zu groß ist; sie beschreibt das Verhalten für kleine ‖h‖. Ein Stück am Radiusregler nach ` +
          `unten, und der Quotient rückt an den Vorhersagewert heran.`;
    status =
      `Am Entwicklungspunkt (${fmt(x1, 2)}; ${fmt(x2, 2)}) ist die Hesse-Matrix ${kruemmung}, die ` +
      `Höhenlinien von T₂ sind dort also ${konturForm}. Auf dem Kreis mit Radius ${fmt(r, 2)} weicht ` +
      `T${ordnung === 1 ? "₁" : "₂"} um höchstens ${fmt(eR, 4)} von f ab, auf dem halb so großen Kreis ` +
      `um ${fmt(eHalb, 5)}; das ist ein Quotient von ${fmt(quotient, 2)}. ${abweichung} ` +
      `Der Fehler von T₁ ist o(‖h‖) und wächst in aller Regel wie ‖h‖², beim Halbieren fällt er also ` +
      `auf ein Viertel, der von T₂ wächst wie ‖h‖³ und fällt auf ein Achtel. In der Raumtafel ist ` +
      `dieser Fehler der senkrechte Abstand zwischen dem blauen und dem grünen Ring.`;
  }

  const marker = (
    <g>
      <circle
        cx={px(x1)}
        cy={py(x2)}
        r={(r / (D[1] - D[0])) * W}
        fill="none"
        stroke={ORANGE}
        strokeWidth={1.2}
        strokeDasharray="4 3"
      />
      <circle cx={px(x1)} cy={py(x2)} r={4} fill={ORANGE} />
    </g>
  );

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir den orangen Entwicklungspunkt in der linken Tafel und halbieren danach den
        Messradius.
      </Aufgabe>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        Blau: f und seine Höhenlinien. Grün gestrichelt: die Höhenlinien des Taylorpolynoms, in der
        Raumtafel dessen Ebene beziehungsweise Paraboloid. Orange: der Entwicklungspunkt und der
        Kreis, auf dem wir messen. Rot: der Betrag des Fehlers.
      </p>

      <div className="flex flex-wrap gap-2">
        {FUNKTIONEN.map((k) => (
          <button
            key={k.id}
            type="button"
            aria-pressed={k.id === fnId}
            className={k.id === fnId ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setFnId(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={ordnung === 1}
          className={ordnung === 1 ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setOrdnung(1)}
        >
          T₁ (Tangentialebene)
        </button>
        <button
          type="button"
          aria-pressed={ordnung === 2}
          className={ordnung === 2 ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setOrdnung(2)}
        >
          T₂ (Quadrik)
        </button>
        <button
          type="button"
          className={W_BUTTON}
          onClick={() => setR((v) => Math.max(0.1, Math.round((v / 2) * 100) / 100))}
        >
          r halbieren
        </button>
      </div>
      <Slider
        label="x₁ (Entwicklungspunkt)"
        value={x1}
        onChange={(v) => setX1(Math.round(v * 20) / 20)}
        min={P_MIN}
        max={P_MAX}
        step={0.05}
        accent={ORANGE}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider
        label="x₂ (Entwicklungspunkt)"
        value={x2}
        onChange={(v) => setX2(Math.round(v * 20) / 20)}
        min={P_MIN}
        max={P_MAX}
        step={0.05}
        accent={ORANGE}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider
        label="r (Messradius)"
        value={r}
        onChange={(v) => setR(Math.round(v * 100) / 100)}
        min={0.1}
        max={1.4}
        step={0.05}
        accent={ORANGE}
        fmt={(v) => fmt(v, 2)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Tafel
          titel="Höhenlinien: f blau, T grün"
          ariaLabel={`Höhenlinien von f in Blau und des Taylorpolynoms der Ordnung ${ordnung} in Grün, mit dem Entwicklungspunkt bei (${fmt(x1, 2)}; ${fmt(x2, 2)}) und dem Messkreis vom Radius ${fmt(r, 2)}.`}
          svgProps={zieh.svgProps}
        >
          <>
            <Linien segmente={linienF} farbe={BLAU} />
            <Linien segmente={linienT} farbe={GRUEN} gestrichelt />
            {marker}
            <DragHandle
              x={px(x1)}
              y={py(x2)}
              farbe={ORANGE}
              aktiv={zieh.dragging === "p"}
              {...zieh.handleProps("p")}
            />
          </>
        </Tafel>

        <div>
          <Surface3D
            size={280}
            xDomain={D}
            yDomain={D}
            zDomain={[zLo, zHi]}
            surface={flaeche}
            points={punkte3d}
            curves={kurven3d}
            labels={{ x: "x₁", y: "x₂", z: "f" }}
            azimuth={sicht.azimuth}
            elevation={sicht.elevation}
            onViewChange={setSicht}
            ariaLabel={`Die Fläche von f über der x₁-x₂-Ebene, dazu ${ordnung === 1 ? "die Tangentialebene" : "das Tangentialparaboloid"} im Entwicklungspunkt und die beiden Messringe.`}
          />
          <div className="mt-1 max-w-[280px]">
            <ViewControls value={sicht} onChange={setSicht} />
          </div>
          <p className={`mt-1 max-w-[280px] text-xs ${W_MUTED}`}>
            Dieselbe Lage im Raum: blau die Fläche von f, grün{" "}
            {ordnung === 1 ? "die Tangentialebene T₁" : "das Tangentialparaboloid T₂"} im orangen
            Entwicklungspunkt. Der senkrechte Abstand der beiden Ringe ist der Fehler, den wir
            messen. Ziehen dreht die Ansicht.
          </p>
        </div>

        <Tafel
          titel="|f − T|, dunkel = groß"
          ariaLabel={`Der Betrag des Fehlers zwischen f und dem Taylorpolynom als Schattierung; der größte Wert im Fenster ist ${fmt(maxFehlerFenster, 3)}.`}
        >
          <>
            {!zeigeFehler && (
              <text x={PAD_L + W / 2} y={W / 2} textAnchor="middle" fill="var(--w-muted)" fontSize={11}>
                Fehler numerisch null
              </text>
            )}
            {zeigeFehler &&
              fehlerGitter.map((zeile, i) =>
                zeile.map((e, j) => {
                  const alpha = Math.min(1, e / maxFehlerFenster);
                  if (alpha < 0.02) return null;
                  const a0 = D[0] + ((D[1] - D[0]) * i) / N_FEHLER;
                  const b0 = D[0] + ((D[1] - D[0]) * (j + 1)) / N_FEHLER;
                  return (
                    <rect
                      key={`${i}-${j}`}
                      x={px(a0)}
                      y={py(b0)}
                      width={W / N_FEHLER + 0.6}
                      height={W / N_FEHLER + 0.6}
                      fill={ROT}
                      opacity={alpha}
                    />
                  );
                }),
              )}
            {marker}
          </>
        </Tafel>
      </div>

      <div className="max-w-prose font-mono text-sm">
        <div style={{ color: BLAU }}>
          f(x) = {fmt(f0, 4)} an der Stelle ({fmt(x1, 2)}; {fmt(x2, 2)})
        </div>
        <div style={{ color: ORANGE }}>
          ∇f(x) = ({fmt(g[0], 4)}, {fmt(g[1], 4)})
        </div>
        <div style={{ color: ORANGE }}>
          H_f(x) = ({fmt(H[0][0], 3)}, {fmt(H[0][1], 3)}; {fmt(H[1][0], 3)}, {fmt(H[1][1], 3)}), det ={" "}
          {fmt(detH, 3)}
        </div>
        <div style={{ color: ROT }}>
          max |f − T| auf dem Kreis: r = {fmt(r, 2)} → {fmt(eR, 5)}, r/2 → {fmt(eHalb, 5)}, Quotient{" "}
          {Number.isNaN(quotient) ? "numerisch null" : fmt(quotient, 2)}
        </div>
        <div style={{ color: ROT }}>
          größter Fehler im ganzen Fenster = {fmt(maxFehlerFenster, 3)}
        </div>
      </div>

      <Verdikt kind={art}>{status}</Verdikt>
    </div>
  );
}

/**
 * Der Abschnitts-Baustein: erst tippen, dann messen. Verifizierter Quotient in
 * der Voreinstellung: 4,341 für T₁ und 8,066 für T₂ (check-s114.mjs,
 * 2026-08-19).
 */
export function Taylor2DSchaetzung() {
  return (
    <Schaetzfrage
      frage="Wir halbieren den Messradius um den Entwicklungspunkt. Um welchen Faktor fällt der Fehler der Tangentialebene T₁?"
      variante="auswahl"
      loesung="vier"
      optionen={[
        { id: "zwei", text: "Faktor 2" },
        { id: "vier", text: "Faktor 4" },
        { id: "acht", text: "Faktor 8" },
      ]}
      verdeckt={
        <p className="max-w-prose text-sm">
          Gemessen sind es 4,34 in der Voreinstellung: Der Fehler fällt von 0,2672 auf 0,0616. Für
          T₂ steht an derselben Stelle 8,07. Der Grund steht in Korollar 11.4.9: Der Restterm von
          T₁ wächst wie ‖h‖², der von T₂ wie ‖h‖³.
        </p>
      }
    >
      <Taylor2DWidget />
    </Schaetzfrage>
  );
}
