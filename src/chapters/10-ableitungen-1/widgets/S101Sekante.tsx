import { useState } from "react";
import { Slider, niceTicks } from "../../../lib";

/**
 * §10.1: Von der Sekante zur Tangente, mit dem Restterm als eigener Größe.
 *
 * Rechenkern (x- und h-Slider, Sekanten- und Tangentensteigung, Auswertung
 * beider Geraden, Anzeige des Abstands) portiert aus
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S51.tsx
 * (SecantTangentWidget); die SVG-Tafel mit eigenen Achsen, Ticks und
 * Clip-Bereich folgt dem Muster von
 * 08-la-misc/widgets/S83Richardson.tsx (EbenenPanel). Sämtliche Texte,
 * Beschriftungen und Statusmeldungen sind neu geschrieben.
 *
 * Farben nach dem Kapitel-10-Code: Funktion und Funktionswerte blau, lineare
 * Approximation grün, Restterm rot. Die Sekante bekommt Violett, weil sie im
 * Fließtext keine eigene Farbe trägt und Orange den Gradient- und
 * Jacobi-Objekten der Folgeabschnitte gehört.
 *
 * Alles ist deterministisch: drei fest verdrahtete Funktionen, kein Zufall.
 */

const BLAU = "#0072B2"; // Funktion, Funktionswerte
const GRUEN = "#009E73"; // lineare Approximation, Ableitung
const ROT = "#D55E00"; // Restterm
const VIOLETT = "#9E57D5"; // Sekanten
const ACHSE = "#64748b";
const GITTER = "#cbd5e1";

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
const PAD_B = 18;
const N_SAMPLES = 240; // gerade Zahl: der Knick bei x = 0 wird exakt getroffen

/** Deutsche Dezimalzahl; trennt undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  return (Number(s) === 0 ? Math.abs(Number(s)).toFixed(d) : s)
    .replace(".", ",")
    .replace(/^-/, "−");
}

export function SekanteTangenteWidget() {
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

  const px = (t: number) => PAD_L + ((t - X0) / (X1 - X0)) * W;
  const py = (y: number) => ((kurve.y1 - y) / (kurve.y1 - kurve.y0)) * H;

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

  let status: string;
  if (!differenzierbar) {
    status =
      `An der Stelle x = ${fmt(x, 2)} stoßen zwei Geradenstücke aufeinander: von links kommen wir mit ` +
      `der Steigung ${fmt(steigungLinks, 2)} an, nach rechts geht es mit ${fmt(steigungRechts, 2)} weiter. ` +
      `Die beiden Sekanten laufen für h → 0 gegen verschiedene Geraden, eine eindeutige Tangente gibt es ` +
      `nicht, und der Grenzwert aus Definition 10.1.1 existiert nicht.`;
  } else if (knickDazwischen) {
    status =
      `f ist in x = ${fmt(x, 2)} differenzierbar mit f′(x) = ${fmt(ableitung, 2)}, aber der Knick bei 0 liegt ` +
      `noch zwischen x − h und x + h. Die ${linkeLaeuftDrueber ? "linke" : "rechte"} Sekante läuft über ihn ` +
      `hinweg und misst ${fmt(linkeLaeuftDrueber ? steigungLinks : steigungRechts, 2)} statt ` +
      `${fmt(ableitung, 2)}. Schieben wir h unter ${fmt(Math.abs(x), 2)}, sieht sie nur noch das glatte ` +
      `Stück: lineare Approximation ist eine rein lokale Aussage.`;
  } else if (Math.abs(rest) < 1e-12 && kurve.id === "betrag") {
    status =
      `Hier ist f in einer ganzen Umgebung von x = ${fmt(x, 2)} selbst eine Gerade. Der Restterm ist deshalb ` +
      `exakt null, die grüne Approximation trifft f auf diesem Stück nicht nur näherungsweise, sondern genau.`;
  } else if (Math.abs(rest) < 1e-12) {
    // Beim kubischen Beispiel ist r(h) = h²(x + h/3): bei x = −h/3 hebt sich der
    // Rest zufällig auf, obwohl f dort gekrümmt ist (per node bestätigt).
    status =
      `Der Restterm ist hier zufällig null, obwohl f gekrümmt ist: Für f(x) = x³/3 − x + 1 gilt ` +
      `r(h) = h²(x + h/3), und das verschwindet genau bei x = −h/3 = ${fmt(-h / 3, 2)}. Sekante und ` +
      `Tangente haben deshalb dieselbe Steigung. Ein Schritt am x- oder h-Regler zerstört die Balance ` +
      `wieder: Kleinheit des Restes ist eine Aussage über h → 0, keine über einzelne h.`;
  } else {
    status =
      `Die rechte Sekante hat die Steigung ${fmt(steigungRechts, 4)}, die Tangente ${fmt(ableitung, 4)}. ` +
      `Ihr Abstand ${fmt(Math.abs(steigungRechts - ableitung), 4)} ist genau der relative Fehler ` +
      `|r(h)|/|h|, denn r(h)/h ist die Differenz der beiden Steigungen. Verkleinern wir h, so wandert ` +
      `dieser Wert gegen null, und die violette Sekante legt sich auf die grüne Tangente.`;
  }

  const knopf = (aktiv: boolean) =>
    `rounded border px-2 py-1 text-sm ${
      aktiv
        ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
        : "border-slate-300 dark:border-slate-600"
    }`;

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Wir wählen die Stelle x und die Schrittweite h. Blau ist die Funktion, violett sind die
        beiden Sekanten durch (x, f(x)) und die Nachbarpunkte bei x + h beziehungsweise x − h, grün
        die lineare Approximation. Der rote Balken über x + h ist der Restterm r(h): der Abstand
        zwischen dem wahren Funktionswert und dem, was die grüne Gerade vorhersagt.
      </p>
      <div className="flex flex-wrap gap-2">
        {KURVEN.map((k) => (
          <button
            key={k.id}
            type="button"
            className={knopf(k.id === kurveId)}
            onClick={() => setKurveId(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>
      <Slider
        label="x (Stelle)"
        value={x}
        onChange={(v) => setX(Math.round(v * 20) / 20)}
        min={-1.5}
        max={1.5}
        step={0.05}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider
        label="h (Schrittweite)"
        value={h}
        onChange={(v) => setH(Math.round(v * 100) / 100)}
        min={0.01}
        max={0.9}
        step={0.01}
        fmt={(v) => fmt(v, 2)}
      />

      <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
        <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
          y ↑
        </div>
        <svg
          width={PAD_L + W + 8}
          height={H + PAD_B}
          className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <defs>
            <clipPath id="s101-clip">
              <rect x={PAD_L} y={0} width={W} height={H} />
            </clipPath>
          </defs>
          {niceTicks(kurve.y0, kurve.y1).map((t) => (
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
          {niceTicks(X0, X1).map((t) => (
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
              stroke={ACHSE}
              strokeWidth={0.8}
              strokeDasharray="2 3"
            />
            <line
              x1={px(x + h)}
              y1={py(fxh)}
              x2={px(x + h)}
              y2={py(0)}
              stroke={ACHSE}
              strokeWidth={0.8}
              strokeDasharray="2 3"
            />
            <circle cx={px(x - h)} cy={py(fxmh)} r={3.5} fill="none" stroke={VIOLETT} strokeWidth={1.6} />
            <circle cx={px(x + h)} cy={py(fxh)} r={4} fill={VIOLETT} />
            <circle cx={px(x)} cy={py(fx)} r={4.5} fill={BLAU} />
            <text x={px(x) - 3} y={py(0) + 12} fill={ACHSE} fontSize={10}>
              x
            </text>
            <text x={px(x + h) - 8} y={py(0) + 12} fill={ACHSE} fontSize={10}>
              x+h
            </text>
          </g>
        </svg>
        <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
          x →
        </div>
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

      <p className="max-w-prose text-sm">{status}</p>
    </div>
  );
}
