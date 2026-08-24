import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Schaetzfrage,
  Slider,
  Verdikt,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";
import { W_BUTTON, W_BUTTON_AKTIV, W_MUTED } from "../../../lib/widgets/surface";

/**
 * §10.1: Von der Sekante zur Tangente, mit dem Restterm als eigener Größe.
 *
 * EINE EINSICHT: Der Abstand zwischen Sekanten- und Tangentensteigung IST der
 * relative Fehler |r(h)|/|h|; er geht mit h gegen null, und zwar bei den
 * gekrümmten Beispielen linear in h — halbe Schrittweite, ein Viertel
 * Restterm.
 *
 * Rechenkern (x- und h-Slider, Sekanten- und Tangentensteigung, Auswertung
 * beider Geraden, Anzeige des Abstands) portiert aus
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S51.tsx
 * (SecantTangentWidget); die SVG-Tafel mit eigenen Achsen, Ticks und
 * Clip-Bereich folgt dem Muster von 08-la-misc/widgets/S83Richardson.tsx.
 * Sämtliche Texte, Beschriftungen und Verdikte sind neu geschrieben.
 *
 * FARBROLLEN (Kapitel 10): Funktion und Funktionswerte blau, lineare
 * Approximation grün, Restterm rot. Die Sekante bekommt Violett — dieselbe
 * Rolle wie in S102/S103: das Objekt, das der Leser selbst verstellt. Orange
 * gehört den Gradient- und Jacobi-Objekten der Folgeabschnitte.
 *
 * Alles ist deterministisch: drei fest verdrahtete Funktionen, kein Zufall.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen:
 *   f(x) = x²: r(h) = h² exakt (auf einem 61×200-Raster bis 1,7e-15), also
 *     |r(h)|/|h| = |h|; bei x = 0,6 und h = 0,6 ist die rechte Sekante 1,8,
 *     die Tangente 1,2, r(h) = 0,36; bei h = 0,3 ist r = 0,09, bei h = 0,15
 *     ist r = 0,0225 — Halbieren von h drittelt drei Viertel weg (Faktor 4,0).
 *   f(x) = x³/3 − x + 1: r(h) = h²(x + h/3) exakt (bis 1,8e-15); bei x = 0,6,
 *     h = 0,6 ist r = 0,288 und der Faktor beim Halbieren 4,4 (nicht exakt 4,
 *     weil r nicht rein quadratisch ist); r verschwindet genau bei x = −h/3,
 *     für h = 0,6 also bei x = −0,2.
 *   f(x) = |x|: bei x = 0,6 ist r(h) = 0 für alle h ≤ 0,6 (f ist dort selbst
 *     eine Gerade); bei x = −0,2 und h = 0,6 liegt der Knick im Fenster, die
 *     rechte Sekante misst 0,3333 statt −1, und r(h) = 0,8.
 */

const BLAU = FMM_COLORS.blau; // Funktion, Funktionswerte
const GRUEN = FMM_COLORS.gruen; // lineare Approximation, Ableitung
const ROT = FMM_COLORS.rot; // Restterm
const VIOLETT = FMM_COLORS.violett; // Sekanten und die gewählte Stelle

interface Kurve {
  id: string;
  label: string;
  /** Funktionswert */
  f: (x: number) => number;
  /** Ableitung; NaN an den Stellen, an denen f nicht differenzierbar ist */
  fp: (x: number) => number;
  y0: number;
  y1: number;
}

const KURVEN: Kurve[] = [
  {
    id: "quadrat",
    label: "f(x) = x²",
    f: (x) => x * x,
    fp: (x) => 2 * x,
    y0: -1.2,
    y1: 6.2,
  },
  {
    id: "kubisch",
    label: "f(x) = x³/3 − x + 1",
    f: (x) => (x * x * x) / 3 - x + 1,
    fp: (x) => x * x - 1,
    y0: -2.2,
    y1: 4.2,
  },
  {
    id: "betrag",
    label: "f(x) = |x|",
    f: (x) => Math.abs(x),
    fp: (x) => (x === 0 ? NaN : Math.sign(x)),
    y0: -0.9,
    y1: 3.3,
  },
];

const X0 = -2.4;
const X1 = 2.4;
const W = 340;
const H = 250;
const PAD_L = 34;
const PAD_T = 6;
const PAD_B = 18;
const PAD_R = 8;
const N_SAMPLES = 240; // gerade Zahl: der Knick bei x = 0 wird exakt getroffen
const H_MIN = 0.01;

const fmt = (v: number, d = 3) => fmtDe(v, d);

function SekanteTafel({ aufgeloest }: { aufgeloest: boolean }) {
  const [kurveId, setKurveId] = useState("quadrat");
  const [x, setX] = useState(0.6);
  const [h, setH] = useState(0.6);

  const kurve = KURVEN.find((k) => k.id === kurveId) ?? KURVEN[0];
  const { f, fp } = kurve;

  const fx = f(x);
  const fxh = f(x + h);
  const fxmh = f(x - h);
  const steigungRechts = (fxh - fx) / h;
  const steigungLinks = (fx - fxmh) / h;
  const ableitung = fp(x);
  const differenzierbar = Number.isFinite(ableitung);
  const rest = differenzierbar ? fxh - fx - ableitung * h : NaN;
  const relativ = Math.abs(rest) / Math.abs(h);
  const restHalb = differenzierbar ? f(x + h / 2) - fx - (ableitung * h) / 2 : NaN;

  const px = (t: number) => PAD_L + ((t - X0) / (X1 - X0)) * W;
  const py = (y: number) => PAD_T + ((kurve.y1 - y) / (kurve.y1 - kurve.y0)) * H;

  // Die ganze Tafel ist der Griff; gezogen wird nur die x-Koordinate (die
  // Stelle liegt per Konstruktion auf der Kurve). Doppelpfad: der x-Regler.
  const zieh = useDrag<"x">({
    feld: { x0: PAD_L, y0: PAD_T, w: W, h: H },
    welt: { x0: X0, x1: X1, y0: kurve.y0, y1: kurve.y1 },
    snap: 0.05,
    clamp: ([a, b]) => [clamp(a, -1.5, 1.5), b],
    onDrag: ([a]) => setX(a),
  });

  const kurvenPfad = (() => {
    const teile: string[] = [];
    for (let i = 0; i <= N_SAMPLES; i++) {
      const t = X0 + ((X1 - X0) * i) / N_SAMPLES;
      teile.push(`${i === 0 ? "M" : "L"}${px(t).toFixed(1)},${py(f(t)).toFixed(1)}`);
    }
    return teile.join(" ");
  })();

  /** Gerade durch (a, fa) mit gegebener Steigung, über die ganze Tafel gezogen. */
  const gerade = (a: number, fa: number, m: number) => ({
    x1: px(X0),
    y1: py(fa + m * (X0 - a)),
    x2: px(X1),
    y2: py(fa + m * (X1 - a)),
  });

  const sekRechts = gerade(x, fx, steigungRechts);
  const sekLinks = gerade(x, fx, steigungLinks);
  const tangente = differenzierbar ? gerade(x, fx, ableitung) : null;
  const tangenteBeiXh = differenzierbar ? fx + ableitung * h : NaN;

  const knickDazwischen = kurve.id === "betrag" && x !== 0 && Math.abs(x) < h;
  // Welche der beiden Sekanten über den Knick hinwegläuft, hängt am Vorzeichen
  // von x: bei x > 0 die linke, bei x < 0 die rechte. Wir fragen den Live-Wert.
  const linkeLaeuftDrueber = Math.abs(steigungLinks - ableitung) > 1e-12;

  const art = !differenzierbar
    ? "knick"
    : knickDazwischen
      ? "knick-im-fenster"
      : Math.abs(rest) < 1e-12 && kurve.id === "betrag"
        ? "lokal-gerade"
        : Math.abs(rest) < 1e-12
          ? "zufaellig-null"
          : "regulaer";

  const verdikt: Record<string, { kind: "neutral" | "ok" | "warn" | "fail"; text: string }> = {
    knick: {
      kind: "fail",
      text:
        `An der Stelle x = ${fmt(x, 2)} stoßen zwei Geradenstücke aufeinander: von links kommen wir mit ` +
        `der Steigung ${fmt(steigungLinks, 2)} an, nach rechts geht es mit ${fmt(steigungRechts, 2)} weiter. ` +
        `Die beiden Sekanten laufen für h → 0 gegen verschiedene Geraden, eine eindeutige Tangente gibt es ` +
        `nicht, und der Grenzwert aus Definition 10.1.1 existiert nicht.`,
    },
    "knick-im-fenster": {
      kind: "warn",
      text:
        `f ist in x = ${fmt(x, 2)} differenzierbar mit f′(x) = ${fmt(ableitung, 2)}, aber der Knick bei 0 liegt ` +
        `noch zwischen x − h und x + h. Die ${linkeLaeuftDrueber ? "linke" : "rechte"} Sekante läuft über ihn ` +
        `hinweg und misst ${fmt(linkeLaeuftDrueber ? steigungLinks : steigungRechts, 2)} statt ` +
        `${fmt(ableitung, 2)}. Schieben wir h unter ${fmt(Math.abs(x), 2)}, sieht sie nur noch das glatte ` +
        `Stück: lineare Approximation ist eine rein lokale Aussage.`,
    },
    "lokal-gerade": {
      kind: "ok",
      text:
        `Hier ist f in einer ganzen Umgebung von x = ${fmt(x, 2)} selbst eine Gerade. Der Restterm ist deshalb ` +
        `exakt null, die grüne Approximation trifft f auf diesem Stück nicht nur näherungsweise, sondern genau.`,
    },
    "zufaellig-null": {
      // Beim kubischen Beispiel ist r(h) = h²(x + h/3): bei x = −h/3 hebt sich der
      // Rest zufällig auf, obwohl f dort gekrümmt ist (per node bestätigt).
      kind: "warn",
      text:
        `Der Restterm ist hier zufällig null, obwohl f gekrümmt ist: Für f(x) = x³/3 − x + 1 gilt ` +
        `r(h) = h²(x + h/3), und das verschwindet genau bei x = −h/3 = ${fmt(-h / 3, 2)}. Sekante und ` +
        `Tangente haben deshalb dieselbe Steigung. Ein Schritt am x- oder h-Regler zerstört die Balance ` +
        `wieder: Kleinheit des Restes ist eine Aussage über h → 0, keine über einzelne h.`,
    },
    regulaer: {
      kind: "neutral",
      text:
        `Die rechte Sekante hat die Steigung ${fmt(steigungRechts, 4)}, die Tangente ${fmt(ableitung, 4)}. ` +
        `Ihr Abstand ${fmt(Math.abs(steigungRechts - ableitung), 4)} ist genau der relative Fehler ` +
        `|r(h)|/|h|, denn r(h)/h ist die Differenz der beiden Steigungen. Nach Satz 10.1.3(2) wandert ` +
        `dieser Wert für h → 0 gegen null, und die violette Sekante legt sich auf die grüne Tangente.`,
    },
  };
  const v = verdikt[art];

  const ticksY = niceTicks(kurve.y0, kurve.y1, 5);
  const ticksX = niceTicks(X0, X1, 5);
  const stepY = ticksY.length > 1 ? Math.abs(ticksY[1] - ticksY[0]) : undefined;
  const stepX = ticksX.length > 1 ? Math.abs(ticksX[1] - ticksX[0]) : undefined;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {KURVEN.map((k) => (
          <button
            key={k.id}
            type="button"
            aria-pressed={k.id === kurveId}
            className={k.id === kurveId ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setKurveId(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>
      <Aufgabe>
        Ziehen wir die Stelle x über die Kurve und schieben h nach unten, bis der rote Balken
        verschwindet.
      </Aufgabe>

      <svg
        viewBox={`0 0 ${PAD_L + W + PAD_R} ${PAD_T + H + PAD_B}`}
        width={PAD_L + W + PAD_R}
        height={PAD_T + H + PAD_B}
        className="h-auto max-w-full select-none rounded"
        role="img"
        aria-label={`${kurve.label} mit den beiden Sekanten durch x = ${fmt(x, 2)} und den Nachbarstellen x ± ${fmt(h, 2)}, der Tangente und dem Restterm über x + h.`}
        {...zieh.svgProps}
        {...zieh.surfaceProps("x")}
        style={{
          border: "1px solid var(--w-border, #cbd5e1)",
          background: "var(--w-bg, #ffffff)",
          ...zieh.svgProps.style,
          ...zieh.surfaceProps("x").style,
        }}
      >
        <defs>
          <clipPath id="s101-clip">
            <rect x={PAD_L} y={PAD_T} width={W} height={H} />
          </clipPath>
        </defs>
        {ticksY.map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={PAD_L + W}
              y1={py(t)}
              y2={py(t)}
              stroke={t === 0 ? "var(--w-axis, #64748b)" : "var(--w-grid, #e2e8f0)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="var(--w-muted, #64748b)" fontSize={10}>
              {fmtTick(t, stepY)}
            </text>
          </g>
        ))}
        {ticksX.map((t) => (
          <g key={`x${t}`}>
            <line
              y1={PAD_T}
              y2={PAD_T + H}
              x1={px(t)}
              x2={px(t)}
              stroke={t === 0 ? "var(--w-axis, #64748b)" : "var(--w-grid, #e2e8f0)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={px(t)} y={PAD_T + H + 13} textAnchor="middle" fill="var(--w-muted, #64748b)" fontSize={10}>
              {fmtTick(t, stepX)}
            </text>
          </g>
        ))}
        <g clipPath="url(#s101-clip)">
          <line
            x1={sekLinks.x1}
            y1={sekLinks.y1}
            x2={sekLinks.x2}
            y2={sekLinks.y2}
            stroke={VIOLETT}
            strokeWidth={1.6}
            strokeDasharray="5 4"
            opacity={0.85}
          />
          <line
            x1={sekRechts.x1}
            y1={sekRechts.y1}
            x2={sekRechts.x2}
            y2={sekRechts.y2}
            stroke={VIOLETT}
            strokeWidth={2}
          />
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
          {differenzierbar && Math.abs(py(fxh) - py(tangenteBeiXh)) > 1.5 && (
            <g>
              <line
                x1={px(x + h)}
                y1={py(tangenteBeiXh)}
                x2={px(x + h)}
                y2={py(fxh)}
                stroke={ROT}
                strokeWidth={3}
              />
              <text
                x={px(x + h) + 6}
                y={(py(fxh) + py(tangenteBeiXh)) / 2 + 3}
                fill={ROT}
                fontSize={11}
                stroke="var(--w-bg, #ffffff)"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                r(h)
              </text>
            </g>
          )}
          <line
            x1={px(x)}
            y1={py(fx)}
            x2={px(x)}
            y2={py(0)}
            stroke="var(--w-axis, #64748b)"
            strokeWidth={0.8}
            strokeDasharray="2 3"
          />
          <line
            x1={px(x + h)}
            y1={py(fxh)}
            x2={px(x + h)}
            y2={py(0)}
            stroke="var(--w-axis, #64748b)"
            strokeWidth={0.8}
            strokeDasharray="2 3"
          />
          <circle cx={px(x - h)} cy={py(fxmh)} r={3.5} fill="none" stroke={VIOLETT} strokeWidth={1.6} />
          <circle cx={px(x + h)} cy={py(fxh)} r={4} fill={VIOLETT} />
          <circle cx={px(x)} cy={py(fx)} r={4.5} fill={BLAU} />
          <text x={px(x) - 3} y={py(0) + 12} fill="var(--w-muted, #64748b)" fontSize={10}>
            x
          </text>
          <text x={px(x + h) - 8} y={py(0) + 12} fill="var(--w-muted, #64748b)" fontSize={10}>
            x+h
          </text>
        </g>
      </svg>

      <div className={`flex flex-wrap gap-x-5 gap-y-1 text-xs ${W_MUTED}`}>
        <span style={{ color: BLAU }}>▬&nbsp;f</span>
        <span style={{ color: VIOLETT }}>▬&nbsp;Sekanten durch x ± h</span>
        <span style={{ color: GRUEN }}>▬&nbsp;lineare Approximation</span>
        <span style={{ color: ROT }}>▬&nbsp;Restterm r(h)</span>
      </div>

      <Slider
        label="x (Stelle)"
        value={x}
        onChange={(t) => setX(Math.round(t * 20) / 20)}
        min={-1.5}
        max={1.5}
        step={0.05}
        accent={VIOLETT}
        fmt={(t) => fmt(t, 2)}
      />
      <Slider
        label="h (Schrittweite)"
        value={h}
        onChange={(t) => setH(Math.round(t * 100) / 100)}
        min={H_MIN}
        max={0.9}
        step={0.01}
        accent={ROT}
        fmt={(t) => fmt(t, 2)}
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={W_BUTTON}
          disabled={h <= H_MIN + 1e-9}
          onClick={() => setH(Math.max(H_MIN, Math.round((h / 2) * 100) / 100))}
        >
          h halbieren
        </button>
      </div>

      <div className="max-w-prose font-mono text-sm">
        <div style={{ color: VIOLETT }}>
          Differenzenquotient rechts (f(x+h) − f(x))/h = {fmt(steigungRechts, 4)}
        </div>
        <div style={{ color: VIOLETT }}>
          Differenzenquotient links (f(x) − f(x−h))/h = {fmt(steigungLinks, 4)}
        </div>
        <div style={{ color: GRUEN }}>Ableitung f′(x) = {fmt(ableitung, 4)}</div>
        <div style={{ color: ROT }}>
          Restterm r(h) = f(x+h) − f(x) − f′(x)h = {fmt(rest, 5)}
        </div>
        <div style={{ color: ROT }}>relativer Fehler |r(h)|/|h| = {fmt(relativ, 5)}</div>
      </div>

      <Verdikt kind={v.kind}>{v.text}</Verdikt>

      {aufgeloest && differenzierbar && (
        <p className={`text-xs ${W_MUTED}`}>
          Bei halber Schrittweite stünde dort r(h/2) ={" "}
          <span className="font-mono">{fmt(restHalb, 6)}</span>
          {Math.abs(restHalb) > 1e-14 && (
            <>
              , also der Faktor{" "}
              <span className="font-mono">{fmt(Math.abs(rest / restHalb), 2)}</span>
            </>
          )}
          .
        </p>
      )}
    </div>
  );
}

export function SekanteTangenteWidget() {
  return (
    <Schaetzfrage
      variante="auswahl"
      frage={
        <>
          Wir halbieren gleich die Schrittweite h. Was passiert dabei mit dem roten Restterm
          r(h)?
        </>
      }
      optionen={[
        { id: "halb", text: "halb so groß" },
        { id: "viertel", text: "ein Viertel so groß" },
        { id: "gleich", text: "bleibt gleich" },
      ]}
      loesung="viertel"
      verdeckt={
        <p className="text-sm">
          Bei f(x) = x² ist r(h) = h² exakt, also fällt der Restterm auf ein Viertel und der
          relative Fehler |r(h)|/|h| auf die Hälfte. Genau diese beiden Größen unterscheidet
          Definition 10.1.5: klein werden muss der Quotient, nicht der Restterm allein.
        </p>
      }
    >
      {({ aufgeloest }) => <SekanteTafel aufgeloest={aufgeloest} />}
    </Schaetzfrage>
  );
}
