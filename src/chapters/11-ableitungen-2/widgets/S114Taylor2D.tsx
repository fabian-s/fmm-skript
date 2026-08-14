import { useMemo, useState, type ReactNode } from "react";
import { Slider, niceTicks } from "../../../lib";
import { gitter, hoehenlinie, niveaus, type Segment } from "./S114Kontur";

/**
 * §11.4: Taylorapproximation einer Funktion von zwei Variablen. Ersetzt die
 * taylor2d_*-Grafiken der Folien (11-ableitungen-II, Abschnitt
 * „Taylorapproximation für Vektor-zu-Skalar") durch eine eigene Tafel:
 * links die Höhenlinien von f und die des Taylorpolynoms übereinander,
 * rechts der Betrag des Fehlers als Schattierung.
 *
 * Eigenbau, kein portierter Code; die Höhenlinien kommen aus S114Kontur.ts.
 * Alles ist deterministisch: feste Funktionen, festes Gitter, kein Zufall.
 *
 * Farben nach dem Kapitel-11-Code: Funktion blau, Taylorpolynom grün,
 * Fehler rot, Ableitungsobjekte (Gradient, Hesse-Matrix, Entwicklungspunkt)
 * orange.
 *
 * Nachgerechnet (node, rev-s114-b/f.mjs): Gradienten und Hesse-Matrizen aller
 * drei Funktionen stimmen an mehreren Stellen bis auf 1e-5 mit zentralen
 * Differenzen überein. In der Voreinstellung (0,75; −1,25) mit r = 0,8 fällt der
 * größte Fehler auf dem Kreis beim Halbieren des Radius für T_1 auf ein 4,341-
 * (sin+cos), 3,990- (Glocke) bzw. exakt 4,000-faches (Quadrik) und für T_2 auf
 * ein 8,066- bzw. 8,778-faches; auf der Quadrik ist der T_2-Fehler 7,1e-15,
 * also numerisch null.
 *
 * ACHTUNG (Live-Zustand): Die Faustzahlen 4 und 8 gelten nur, solange der
 * jeweils führende Restterm nicht selbst verschwindet. Über den ganzen
 * Reglerbereich läuft der Quotient für T_1 von 2,70 bis 7,28 und für T_2 von
 * 5,79 bis 15,98 (Extremfälle: H ≈ 0 bei sin+cos in (0; 1,55), und im Zentrum
 * der Glocke verschwinden alle dritten Ableitungen). Der Statustext verzweigt
 * deshalb.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ROT = "#D55E00";
const ORANGE = "#E69F00";
const ACHSE = "#64748b";

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

function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  return (Number(s) === 0 ? Math.abs(Number(s)).toFixed(d) : s)
    .replace(".", ",")
    .replace(/^-/, "−");
}

const px = (t: number) => PAD_L + ((t - D[0]) / (D[1] - D[0])) * W;
const py = (t: number) => ((D[1] - t) / (D[1] - D[0])) * W;

/** Achsenbeschriftung mit deutschem Minuszeichen. */
function tick(t: number): string {
  return String(t).replace("-", "−");
}

function Tafel({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <div className="inline-block shrink-0 select-none text-[10px] text-slate-500">
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        {titel}
      </div>
      <svg
        width={PAD_L + W + 6}
        height={W + PAD_B}
        className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        {niceTicks(D[0], D[1]).map((t) => (
          <g key={`t${t}`}>
            <line x1={PAD_L} x2={PAD_L + W} y1={py(t)} y2={py(t)} stroke="#e2e8f0" strokeWidth={0.6} />
            <line y1={0} y2={W} x1={px(t)} x2={px(t)} stroke="#e2e8f0" strokeWidth={0.6} />
            <text x={PAD_L - 3} y={py(t) + 3} textAnchor="end" fill={ACHSE} fontSize={9}>
              {tick(t)}
            </text>
            <text x={px(t)} y={W + 11} textAnchor="middle" fill={ACHSE} fontSize={9}>
              {tick(t)}
            </text>
          </g>
        ))}
        <line x1={PAD_L} x2={PAD_L + W} y1={py(0)} y2={py(0)} stroke={ACHSE} strokeWidth={1} />
        <line y1={0} y2={W} x1={px(0)} x2={px(0)} stroke={ACHSE} strokeWidth={1} />
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

  const { linienF, linienT, fehlerGitter, maxFehlerFenster } = useMemo(() => {
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
    return { linienF: lF, linienT: lT, fehlerGitter: feld, maxFehlerFenster: maxE };
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

  let status: string;
  if (fn.quadratisch && ordnung === 2) {
    status =
      `Auf dieser Quadrik ist T₂ nicht bloß eine Näherung, sondern f selbst: Die Hesse-Matrix ist ` +
      `konstant, alle Ableitungen ab der dritten verschwinden, und das Restglied aus Korollar 11.4.9 ist ` +
      `null. Grüne und blaue Höhenlinien decken sich, die rechte Tafel bleibt weiß, und der gemessene ` +
      `Fehler von ${eR.toExponential(1).replace(".", ",")} auf dem Kreis ist reines Rundungsrauschen. ` +
      `Auf genau dieser Beobachtung beruht der eine exakte Newton-Schritt weiter unten.`;
  } else if (fn.quadratisch) {
    status =
      `Die Tangentialebene lässt hier den vollständigen quadratischen Anteil stehen: Der Fehler ist ` +
      `exakt ½h⊤H h mit konstantem H, deshalb steht beim Halbieren des Radius der Quotient ` +
      `${fmt(quotient, 2)} und nicht bloß „ungefähr 4". Ein Umschalten auf T₂ drückt ihn auf null.`;
  } else {
    const erwartet = ordnung === 1 ? 4 : 8;
    const passt = Number.isFinite(quotient) && Math.abs(quotient - erwartet) <= 0.25 * erwartet;
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
      `auf ein Viertel, der von T₂ wächst wie ‖h‖³ und fällt auf ein Achtel. Wer den Radius vergrößert, ` +
      `sieht den Unterschied zwischen den beiden Ordnungen deutlicher, und die rechte Tafel zeigt, dass ` +
      `der Fehler in alle Richtungen wächst, aber nicht in allen gleich schnell.`;
  }

  const knopf = (aktiv: boolean) =>
    `rounded border px-2 py-1 text-sm ${
      aktiv
        ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
        : "border-slate-300 dark:border-slate-600"
    }`;

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
      <p className="max-w-prose text-sm">
        Links liegen die Höhenlinien von f (blau) und die des Taylorpolynoms (grün gestrichelt) im
        selben Fenster und auf denselben Niveaus; rechts steht der Betrag des Fehlers, je dunkler
        desto größer. Der orange Punkt ist der Entwicklungspunkt, der orange Kreis der Radius, auf
        dem wir den Fehler messen.
      </p>
      <div className="flex flex-wrap gap-2">
        {FUNKTIONEN.map((k) => (
          <button key={k.id} type="button" className={knopf(k.id === fnId)} onClick={() => setFnId(k.id)}>
            {k.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={knopf(ordnung === 1)} onClick={() => setOrdnung(1)}>
          T₁ (Tangentialebene)
        </button>
        <button type="button" className={knopf(ordnung === 2)} onClick={() => setOrdnung(2)}>
          T₂ (Quadrik)
        </button>
      </div>
      <Slider
        label="x₁ (Entwicklungspunkt)"
        value={x1}
        onChange={(v) => setX1(Math.round(v * 20) / 20)}
        min={-2}
        max={2}
        step={0.05}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider
        label="x₂ (Entwicklungspunkt)"
        value={x2}
        onChange={(v) => setX2(Math.round(v * 20) / 20)}
        min={-2}
        max={2}
        step={0.05}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider
        label="r (Messradius)"
        value={r}
        onChange={(v) => setR(Math.round(v * 100) / 100)}
        min={0.1}
        max={1.4}
        step={0.05}
        fmt={(v) => fmt(v, 2)}
      />

      <div className="flex flex-wrap gap-4">
        <Tafel titel="Höhenlinien: f blau, T grün">
          <>
            <Linien segmente={linienF} farbe={BLAU} />
            <Linien segmente={linienT} farbe={GRUEN} gestrichelt />
            {marker}
          </>
        </Tafel>
        <Tafel titel="|f − T|, dunkel = groß">
          <>
            {!zeigeFehler && (
              <text x={PAD_L + W / 2} y={W / 2} textAnchor="middle" fill={ACHSE} fontSize={11}>
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
          H_f(x) = ({fmt(H[0][0], 3)}, {fmt(H[0][1], 3)}; {fmt(H[1][0], 3)}, {fmt(H[1][1], 3)}), det = {fmt(detH, 3)}
        </div>
        <div style={{ color: ROT }}>
          max |f − T| auf dem Kreis: r = {fmt(r, 2)} → {fmt(eR, 5)}, r/2 → {fmt(eHalb, 5)}, Quotient{" "}
          {Number.isNaN(quotient) ? "numerisch null" : fmt(quotient, 2)}
        </div>
        <div style={{ color: ROT }}>
          größter Fehler im ganzen Fenster = {fmt(maxFehlerFenster, 3)}
        </div>
      </div>

      <p className="max-w-prose text-sm">{status}</p>
    </div>
  );
}
