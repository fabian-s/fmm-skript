import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  fmtDe,
  fmtTick,
  niceTicks,
} from "../../../lib";

/**
 * §11.2: Die EINE Einsicht — die Kettenregel ist das Produkt zweier Raten, und
 * dieses Produkt kann zahm bleiben, obwohl beide Faktoren aus dem Ruder laufen.
 *
 * Rechenkern (Regler für x, Pipeline-Kästen für innere und äußere Funktion,
 * Readouts der beiden Faktoren und ihres Produkts, Tangente im Plot,
 * Gegenprobe per Differenzenquotient) portiert aus
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S51.tsx
 * (ChainRuleWidget); die SVG-Tafel mit eigenen Achsen, Ticks und Clip-Bereich
 * folgt dem Muster von 10-ableitungen-1/widgets/S101Sekante.tsx. Menü und
 * Verdiktlogik sind neu; die Texte wurden im Review 11.2 Satz für Satz gegen
 * die Quelldatei gelegt und aus Satz 11.2.8 heraus neu formuliert.
 *
 * Farbrollen Kapitel 11 (= Kapitel 10): Funktion und Funktionswerte blau,
 * Ableitungsterme und Tangente grün. Rot (Restterm) und Orange
 * (Ableitungsobjekte) kommen hier nicht vor.
 *
 * Deterministisch: drei fest verdrahtete Verkettungen, kein Zufall.
 *
 * Verifizierte Zahlen (scratchpad/verify-11-ableitungen-2/check-s112.mjs,
 * 2026-08-19), jeweils an der Startstelle der Voreinstellung und gegen einen
 * zentralen Differenzenquotienten mit ε = 10⁻⁶ geprüft:
 *   (2x+1)⁴ bei x = 0,3: f(x) = 1,6, h(x) = 6,5536, f′ = 2,
 *     g′(f(x)) = 16,384, Produkt 32,768 (Abweichung 8·10⁻¹⁰);
 *   √(x²) bei x = 0,6: f′ = 1,2, g′ = 0,8333, Produkt exakt 1 — und für
 *     jedes x ≠ 0 exakt sign(x) (auf 12 Stellen für x = ±0,05 … ±1,5);
 *   σ(3x−1) bei x = 0,3: f(x) = −0,1, h(x) = 0,475021, f′ = 3,
 *     g′(f(x)) = 0,249376, Produkt 0,748128 (Abweichung 1,4·10⁻¹¹).
 * Bei x = 0 ist g′(0) = 1/(2·0) unendlich, während der zentrale
 * Differenzenquotient von |x| in 0 den Wert 0 meldet — eine numerische
 * Ableitung merkt von selbst nicht, dass es gar keine gibt.
 */

const BLAU = FMM_COLORS.blau; // Funktion, Funktionswerte
const GRUEN = FMM_COLORS.gruen; // Ableitungsterme, Tangente

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
const PAD_R = 8;
const N_SAMPLES = 320;
const EPS = 1e-6;

const fmt = (v: number, d = 3) => fmtDe(v, d);

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

  const yTicks = niceTicks(wahl.y0, wahl.y1);
  const xTicks = niceTicks(wahl.x0, wahl.x1);
  const dY = yTicks.length > 1 ? yTicks[1] - yTicks[0] : undefined;
  const dX = xTicks.length > 1 ? xTicks[1] - xTicks[0] : undefined;

  let art: "neutral" | "ok" | "warn" = "neutral";
  let verdikt: string;
  if (!brauchbar) {
    art = "warn";
    verdikt =
      `Hier greift Satz 11.2.8 nicht: An der Stelle x = ${fmt(x, 2)} ist f(x) = ${fmt(u, 2)}, und die ` +
      `äußere Funktion g(u) = √u ist in u = 0 nicht differenzierbar, denn g′(u) = 1/(2√u) wächst über ` +
      `jede Grenze. Die verkettete Funktion h(x) = |x| trägt an dieser Stelle den Knick aus ` +
      `Abschnitt 10.1, und das Produkt aus ∞ und 0 ist keine Zahl. Die Gegenprobe meldet trotzdem ` +
      `einen Wert: Der zentrale Differenzenquotient mittelt über beide Seiten des Knicks und liefert 0. ` +
      `Eine numerische Ableitung merkt von selbst nicht, dass es gar keine gibt.`;
  } else if (wahl.id === "wurzel") {
    art = "ok";
    verdikt =
      `Zwei Faktoren, die beide aus dem Ruder laufen, und trotzdem ein zahmes Produkt: die äußere Rate ` +
      `g′(f(x)) = 1/(2|x|) = ${fmt(aeussere, 3)} wächst zum Nullpunkt hin unbeschränkt, die innere Rate ` +
      `f′(x) = 2x = ${fmt(innere, 3)} schrumpft dorthin gegen null. Ihr Produkt ist für jedes x ≠ 0 ` +
      `exakt ${fmt(kette, 0)}, also das Vorzeichen von x, wie es sich für die Ableitung von |x| gehört.`;
  } else if (wahl.id === "logistisch") {
    art = "ok";
    verdikt =
      `Die äußere Rate ist hier σ′(u) = σ(u)(1 − σ(u)) = ${fmt(aeussere, 4)}: Sie ist am größten, wo ` +
      `σ den Wert 0,5 annimmt, und wird an beiden Enden winzig. Die innere Rate bleibt konstant bei ` +
      `${fmt(innere, 0)}. Ihr Produkt ${fmt(kette, 4)} ist nach Satz 11.2.8 die Steigung der grünen ` +
      `Tangente. Dieselbe Rechnung steckt im Gradienten der logistischen Regression weiter unten.`;
  } else {
    art = "ok";
    verdikt =
      `Beide Stationen sind an dieser Stelle lineare Abbildungen mit je einer Zahl als Faktor: die ` +
      `innere mit f′(x) = ${fmt(innere, 2)}, die äußere mit g′(f(x)) = ${fmt(aeussere, 3)}. Satz 11.2.8 ` +
      `schaltet die beiden hintereinander, und für Multiplikationen mit Zahlen heißt das schlicht ` +
      `multiplizieren: h′(x) = ${fmt(kette, 3)}. Die Gegenprobe kommt ohne die Kettenregel aus und ` +
      `landet auf mehreren Stellen beim selben Wert.`;
  }

  const kasten =
    "rounded border border-slate-400 px-3 py-2 text-center text-sm dark:border-slate-500 [.w-dark_&]:border-slate-500";

  return (
    <div className="space-y-3">
      <Aufgabe>
        Wählen wir eine Verkettung, schieben x und vergleichen das Produkt der beiden Raten mit der
        Gegenprobe darunter.
      </Aufgabe>

      <div className="flex flex-wrap gap-2">
        {VERKETTUNGEN.map((v) => {
          const aktiv = v.id === wahlId;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={aktiv}
              className={aktiv ? W_BUTTON_AKTIV : W_BUTTON}
              onClick={() => {
                setWahlId(v.id);
                setX(v.start);
              }}
            >
              {v.label}
            </button>
          );
        })}
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

      <div className={`select-none text-[10px] ${W_MUTED}`}>
        <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
          h(x) ↑
        </div>
        <svg
          viewBox={`0 0 ${PAD_L + W + PAD_R} ${H + PAD_B}`}
          width={PAD_L + W + PAD_R}
          height={H + PAD_B}
          role="img"
          aria-label={`Der Graph von ${wahl.label} in Blau mit der grünen Tangente an der Stelle x = ${fmt(x, 2)}.`}
          className="h-auto max-w-full rounded border"
          style={{ background: "var(--w-bg)", borderColor: "var(--w-border)" }}
        >
          <defs>
            <clipPath id="s112-kette-clip">
              <rect x={PAD_L} y={0} width={W} height={H} />
            </clipPath>
          </defs>
          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line
                x1={PAD_L}
                x2={PAD_L + W}
                y1={py(t)}
                y2={py(t)}
                stroke={t === 0 ? "var(--w-axis)" : "var(--w-grid)"}
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="var(--w-text)" fontSize={10}>
                {fmtTick(t, dY)}
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <g key={`x${t}`}>
              <line
                y1={0}
                y2={H}
                x1={px(t)}
                x2={px(t)}
                stroke={t === 0 ? "var(--w-axis)" : "var(--w-grid)"}
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text x={px(t)} y={H + 12} textAnchor="middle" fill="var(--w-text)" fontSize={10}>
                {fmtTick(t, dX)}
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
              stroke="var(--w-axis)"
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

      <Verdikt kind={art}>{verdikt}</Verdikt>
    </div>
  );
}
