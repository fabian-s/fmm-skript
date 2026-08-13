import { useState } from "react";
import { Slider, niceTicks } from "../../../lib";

/**
 * §11.2: Die Kettenregel als Produkt zweier Raten.
 *
 * Rechenkern (Regler für x, Pipeline-Kästen für innere und äußere Funktion,
 * Readouts der beiden Faktoren und ihres Produkts, Tangente im Plot,
 * Gegenprobe per Differenzenquotient) portiert aus
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S51.tsx
 * (ChainRuleWidget); die SVG-Tafel mit eigenen Achsen, Ticks und Clip-Bereich
 * folgt dem Muster von 10-ableitungen-1/widgets/S101Sekante.tsx. Menü und
 * Statuslogik sind neu; die Texte wurden im Review 11.2 Satz für Satz gegen
 * die Quelldatei gelegt und aus Satz 11.2.8 heraus neu formuliert.
 *
 * Farben nach dem Kapitel-11-Code: Funktion und Funktionswerte blau,
 * Ableitungsterme und Linearisierung grün.
 *
 * Deterministisch: drei fest verdrahtete Verkettungen, kein Zufall.
 */

const BLAU = "#0072B2"; // Funktion, Funktionswerte
const GRUEN = "#009E73"; // Ableitungsterme, Tangente
const ACHSE = "#64748b";
const GITTER = "#cbd5e1";

const sigma = (t: number) => 1 / (1 + Math.exp(-t));

interface Verkettung {
  id: string;
  label: string;
  /** innere Funktion */
  f: (x: number) => number;
  fp: (x: number) => number;
  /** äußere Funktion, ausgewertet an u = f(x) */
  g: (u: number) => number;
  gp: (u: number) => number;
  fTex: string;
  gTex: string;
  /** Tafelausschnitt */
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  /** Reglerbereich: so gewählt, dass der Punkt (x, h(x)) im Bild bleibt */
  xs0: number;
  xs1: number;
  start: number;
}

const VERKETTUNGEN: Verkettung[] = [
  {
    id: "potenz",
    label: "h(x) = (2x + 1)⁴",
    f: (x) => 2 * x + 1,
    fp: () => 2,
    g: (u) => u ** 4,
    gp: (u) => 4 * u ** 3,
    fTex: "f(x) = 2x + 1",
    gTex: "g(u) = u⁴",
    x0: -1.6,
    x1: 0.6,
    y0: -1.2,
    y1: 8.5,
    xs0: -1.3,
    xs1: 0.3,
    start: 0.3,
  },
  {
    id: "wurzel",
    label: "h(x) = √(x²)",
    f: (x) => x * x,
    fp: (x) => 2 * x,
    g: (u) => Math.sqrt(u),
    gp: (u) => 1 / (2 * Math.sqrt(u)),
    fTex: "f(x) = x²",
    gTex: "g(u) = √u",
    x0: -1.6,
    x1: 1.6,
    y0: -0.5,
    y1: 2.2,
    xs0: -1.5,
    xs1: 1.5,
    start: 0.6,
  },
  {
    id: "logistisch",
    label: "h(x) = σ(3x − 1)",
    f: (x) => 3 * x - 1,
    fp: () => 3,
    g: sigma,
    gp: (u) => sigma(u) * (1 - sigma(u)),
    fTex: "f(x) = 3x − 1",
    gTex: "g(u) = σ(u) = 1/(1 + e^(−u))",
    x0: -1.6,
    x1: 1.8,
    y0: -0.2,
    y1: 1.25,
    xs0: -1.5,
    xs1: 1.7,
    start: 0.3,
  },
];

const W = 340;
const H = 230;
const PAD_L = 36;
const PAD_B = 18;
const N_SAMPLES = 320;
const EPS = 1e-6;

/** Deutsche Dezimalzahl; unterscheidet undefiniert (NaN) von unendlich. */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  return (Number(s) === 0 ? Math.abs(Number(s)).toFixed(d) : s)
    .replace(".", ",")
    .replace(/^-/, "−");
}

export function KettenregelWidget() {
  const [wahlId, setWahlId] = useState("potenz");
  const [x, setX] = useState(0.3);

  const wahl = VERKETTUNGEN.find((v) => v.id === wahlId) ?? VERKETTUNGEN[0];
  const { f, fp, g, gp } = wahl;

  const h = (t: number) => g(f(t));
  const u = f(x);
  const hx = h(x);
  const innere = fp(x);
  const aeussere = gp(u);
  const kette = aeussere * innere;
  const numerisch = (h(x + EPS) - h(x - EPS)) / (2 * EPS);
  const brauchbar = Number.isFinite(kette);

  const px = (t: number) => PAD_L + ((t - wahl.x0) / (wahl.x1 - wahl.x0)) * W;
  const py = (v: number) => ((wahl.y1 - v) / (wahl.y1 - wahl.y0)) * H;

  const kurvenPfad = (() => {
    const teile: string[] = [];
    for (let i = 0; i <= N_SAMPLES; i++) {
      const t = wahl.x0 + ((wahl.x1 - wahl.x0) * i) / N_SAMPLES;
      const v = h(t);
      teile.push(`${i === 0 ? "M" : "L"}${px(t).toFixed(1)},${py(v).toFixed(1)}`);
    }
    return teile.join(" ");
  })();

  const tangente = brauchbar
    ? {
        x1: px(wahl.x0),
        y1: py(hx + kette * (wahl.x0 - x)),
        x2: px(wahl.x1),
        y2: py(hx + kette * (wahl.x1 - x)),
      }
    : null;

  let status: string;
  if (!brauchbar) {
    status =
      `An der Stelle x = ${fmt(x, 2)} ist f(x) = ${fmt(u, 2)}, und dort ist die äußere Funktion ` +
      `g(u) = √u gar nicht differenzierbar: g′(u) = 1/(2√u) wächst über jede Grenze. Die Kettenregel ` +
      `verlangt Differenzierbarkeit von g an der Stelle u = f(x), also greift sie hier nicht. Die ` +
      `verkettete Funktion h(x) = |x| hat an dieser Stelle den Knick aus Abschnitt 10.1, das Produkt ` +
      `aus ∞ und 0 ist keine Zahl. Die Gegenprobe meldet trotzdem eine Zahl: Der zentrale ` +
      `Differenzenquotient mittelt über beide Seiten des Knicks und liefert 0. Eine numerische ` +
      `Ableitung merkt von selbst nicht, dass es gar keine gibt.`;
  } else if (wahl.id === "wurzel") {
    status =
      `Zwei Faktoren, die beide aus dem Ruder laufen, und trotzdem ein zahmes Produkt: die äußere Rate ` +
      `g′(f(x)) = 1/(2|x|) = ${fmt(aeussere, 3)} wächst zum Nullpunkt hin unbeschränkt, die innere Rate ` +
      `f′(x) = 2x = ${fmt(innere, 3)} schrumpft dorthin gegen null. Ihr Produkt ist für jedes x ≠ 0 ` +
      `exakt ${fmt(kette, 0)}, also das Vorzeichen von x, wie es sich für die Ableitung von |x| gehört.`;
  } else if (wahl.id === "logistisch") {
    status =
      `Die äußere Rate ist hier σ′(u) = σ(u)(1 − σ(u)) = ${fmt(aeussere, 4)}: Sie ist am größten, wo ` +
      `σ den Wert 0,5 annimmt, und wird an beiden Enden winzig. Die innere Rate bleibt konstant bei ` +
      `${fmt(innere, 0)}. Das Produkt ${fmt(kette, 4)} ist die Steigung der grünen Tangente. Dieselbe ` +
      `Rechnung steckt im Gradienten der logistischen Regression weiter unten.`;
  } else {
    status =
      `Beide Stationen sind an dieser Stelle lineare Abbildungen mit je einer Zahl als Faktor: die ` +
      `innere mit f′(x) = ${fmt(innere, 2)}, die äußere mit g′(f(x)) = ${fmt(aeussere, 3)}. Satz 11.2.8 ` +
      `schaltet die beiden hintereinander, und für Multiplikationen mit Zahlen heißt das schlicht ` +
      `multiplizieren: h′(x) = ${fmt(kette, 3)}. Die Gegenprobe kommt ohne die Kettenregel aus und ` +
      `landet auf mehreren Stellen beim selben Wert.`;
  }

  const knopf = (aktiv: boolean) =>
    `rounded border px-2 py-1 text-sm ${
      aktiv
        ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
        : "border-slate-300 dark:border-slate-600"
    }`;

  const kasten = "rounded border border-slate-400 px-3 py-2 text-center text-sm dark:border-slate-500";

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Die Kästen zeigen den Weg von x über den Zwischenwert f(x) zum Endwert h(x) = g(f(x)). Blau
        sind die Funktionswerte, grün die beiden Ableitungen und die Tangente an h an der gewählten
        Stelle. Der letzte Readout rechnet die Ableitung ohne die Kettenregel nach, über einen
        zentralen Differenzenquotienten mit Schrittweite 10⁻⁶.
      </p>

      <div className="flex flex-wrap gap-2">
        {VERKETTUNGEN.map((v) => (
          <button
            key={v.id}
            type="button"
            className={knopf(v.id === wahlId)}
            onClick={() => {
              setWahlId(v.id);
              setX(v.start);
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <Slider
        label="x"
        value={x}
        onChange={(v) => setX(Math.round(v * 20) / 20)}
        min={wahl.xs0}
        max={wahl.xs1}
        step={0.05}
        fmt={(v) => fmt(v, 2)}
      />

      <div className="my-2 flex flex-wrap items-center gap-2">
        <div className={kasten}>
          x = <span className="font-mono">{fmt(x, 2)}</span>
        </div>
        <div className="text-sm">→ {wahl.fTex} →</div>
        <div className={kasten} style={{ color: BLAU }}>
          f(x) = <span className="font-mono">{fmt(u, 3)}</span>
        </div>
        <div className="text-sm">→ {wahl.gTex} →</div>
        <div className={kasten} style={{ color: BLAU }}>
          h(x) = <span className="font-mono">{fmt(hx, 3)}</span>
        </div>
      </div>

      <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
        <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
          h(x) ↑
        </div>
        <svg
          width={PAD_L + W + 8}
          height={H + PAD_B}
          className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <defs>
            <clipPath id="s112-kette-clip">
              <rect x={PAD_L} y={0} width={W} height={H} />
            </clipPath>
          </defs>
          {niceTicks(wahl.y0, wahl.y1).map((t) => (
            <g key={`y${t}`}>
              <line
                x1={PAD_L}
                x2={PAD_L + W}
                y1={py(t)}
                y2={py(t)}
                stroke={t === 0 ? ACHSE : GITTER}
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill={ACHSE} fontSize={10}>
                {fmt(t, Math.abs(t) >= 1 || t === 0 ? 0 : 1)}
              </text>
            </g>
          ))}
          {niceTicks(wahl.x0, wahl.x1).map((t) => (
            <g key={`x${t}`}>
              <line
                y1={0}
                y2={H}
                x1={px(t)}
                x2={px(t)}
                stroke={t === 0 ? ACHSE : GITTER}
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text x={px(t)} y={H + 12} textAnchor="middle" fill={ACHSE} fontSize={10}>
                {fmt(t, Math.abs(t) >= 1 || t === 0 ? 0 : 1)}
              </text>
            </g>
          ))}
          <g clipPath="url(#s112-kette-clip)">
            {tangente && (
              <line
                x1={tangente.x1}
                y1={tangente.y1}
                x2={tangente.x2}
                y2={tangente.y2}
                stroke={GRUEN}
                strokeWidth={2.4}
              />
            )}
            <path d={kurvenPfad} fill="none" stroke={BLAU} strokeWidth={2.4} />
            <line
              x1={px(x)}
              y1={py(hx)}
              x2={px(x)}
              y2={py(wahl.y0)}
              stroke={ACHSE}
              strokeWidth={0.8}
              strokeDasharray="2 3"
            />
            <circle cx={px(x)} cy={py(hx)} r={4.5} fill={BLAU} />
          </g>
        </svg>
        <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
          x →
        </div>
      </div>

      <div className="max-w-prose font-mono text-sm">
        <div style={{ color: GRUEN }}>innere Rate f′(x) = {fmt(innere, 4)}</div>
        <div style={{ color: GRUEN }}>äußere Rate g′(f(x)) = {fmt(aeussere, 4)}</div>
        <div style={{ color: GRUEN }}>
          Kettenregel h′(x) = g′(f(x)) · f′(x) = {fmt(kette, 4)}
        </div>
        <div>Gegenprobe (h(x+ε) − h(x−ε))/(2ε) = {fmt(numerisch, 4)}</div>
      </div>

      <p className="max-w-prose text-sm">{status}</p>
    </div>
  );
}
