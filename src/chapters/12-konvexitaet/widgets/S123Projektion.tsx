import { useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { niceTicks } from "../../../lib";

/**
 * §12.3: Projektion auf eine konvexe Menge (Eigenbau).
 *
 * Zur Wahl stehen eine Kreisscheibe und ein Dreieck. Der Punkt x lässt sich
 * mit der Maus ziehen; das Widget zeichnet den nächstgelegenen Punkt der
 * Menge, die Abstandsstrecke, den Kreis mit Radius d um x und die Stützgerade
 * durch die Projektion senkrecht zu x − x̂.
 *
 * Ersetzt die Folienbilder projektionstheorem-intuition.pdf und
 * projektionstheorem.pdf (12-konvexitaet.Rmd Z. 359 bzw. 383).
 *
 * Aufbau (Achsenraster aus niceTicks, Umrechnung Bildschirm → Welt, Rasterung
 * auf 0,05, deutsches Zahlformat) wie im Schwester-Widget
 * 12-konvexitaet/widgets/S122KonvexTest.tsx; Mengen, Projektionsrechnung,
 * Statuszweige und sämtliche Texte sind für diesen Abschnitt neu.
 *
 * Farbcode Kapitel 12: Menge blau, Projektion und Abstandsstrecke orange
 * (ausgezeichneter Punkt), Testpunkte der Menge grün.
 *
 * Per node nachgerechnet (Scratchpad check-proj-s123.mjs): über je 200000
 * Zufallslagen ist <x − x̂, y − x̂> ≤ 0 für alle y der Menge (größter Wert
 * exakt 0), und kein Punkt der Menge unterbietet den Abstand d. Beispiel im
 * Text: x = (1,6; 1,2) hat ‖x‖ = 2, Projektion (0,8; 0,6), d = 1.
 */

const BLAU = "#0072B2"; // die konvexe Menge
const GRUEN = "#009E73"; // Vergleichspunkte in der Menge
const ORANGE = "#E69F00"; // Projektion, Abstand
const GRAU = "#64748b";

const HALB = 2.2;
const SIZE = 300;
const PAD_L = 30;
const PAD_B = 18;
const PAD_R = 10;

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

type Punkt = [number, number];

const punktText = (p: Punkt) => `(${fmt(p[0])}; ${fmt(p[1])})`;
const sub = (a: Punkt, b: Punkt): Punkt => [a[0] - b[0], a[1] - b[1]];
const dot = (a: Punkt, b: Punkt) => a[0] * b[0] + a[1] * b[1];
const laenge = (a: Punkt) => Math.hypot(a[0], a[1]);

const DREIECK: Punkt[] = [
  [-1, -0.8],
  [1.2, -0.6],
  [0.1, 1.2],
];

/** Projektion auf die Strecke von a nach b. */
function aufStrecke(x: Punkt, a: Punkt, b: Punkt): Punkt {
  const ab = sub(b, a);
  const t = Math.min(1, Math.max(0, dot(sub(x, a), ab) / dot(ab, ab)));
  return [a[0] + t * ab[0], a[1] + t * ab[1]];
}

function imDreieck(x: Punkt): boolean {
  let pos = 0;
  let neg = 0;
  for (let i = 0; i < 3; i++) {
    const a = DREIECK[i];
    const b = DREIECK[(i + 1) % 3];
    const c = (b[0] - a[0]) * (x[1] - a[1]) - (b[1] - a[1]) * (x[0] - a[0]);
    if (c > 1e-12) pos++;
    if (c < -1e-12) neg++;
  }
  return !(pos && neg);
}

type Menge = {
  id: string;
  name: string;
  formel: string;
  drin: (z: Punkt) => boolean;
  projektion: (z: Punkt) => Punkt;
  /** Randpunkte für die Winkelprobe */
  rand: Punkt[];
  flaeche: (px: (x: number) => number, py: (y: number) => number) => ReactNode;
  extrem?: Punkt[];
  aussen: Punkt;
  innen: Punkt;
};

const kreisRand: Punkt[] = Array.from({ length: 720 }, (_, i) => {
  const t = (2 * Math.PI * i) / 720;
  return [Math.cos(t), Math.sin(t)] as Punkt;
});

const dreieckRand: Punkt[] = Array.from({ length: 3 }, (_, i) => i).flatMap((i) => {
  const a = DREIECK[i];
  const b = DREIECK[(i + 1) % 3];
  return Array.from({ length: 240 }, (_, k) => {
    const t = k / 240;
    return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])] as Punkt;
  });
});

const MENGEN: Menge[] = [
  {
    id: "scheibe",
    name: "Kreisscheibe",
    formel: "{ z : ‖z‖ ≤ 1 }",
    drin: (z) => laenge(z) <= 1 + 1e-12,
    projektion: (z) => {
      const n = laenge(z);
      return n <= 1 + 1e-12 ? z : [z[0] / n, z[1] / n];
    },
    rand: kreisRand,
    flaeche: (px, py) => {
      const cx = px(0);
      const cy = py(0);
      const r = px(1) - px(0);
      return <circle cx={cx} cy={cy} r={r} fill={BLAU} fillOpacity={0.16} stroke={BLAU} strokeWidth={1.4} />;
    },
    aussen: [1.6, 1.2],
    innen: [0.3, -0.35],
  },
  {
    id: "dreieck",
    name: "Dreieck",
    formel: "conv{ (−1; −0,8), (1,2; −0,6), (0,1; 1,2) }",
    drin: imDreieck,
    projektion: (z) => {
      if (imDreieck(z)) return z;
      let best: Punkt = DREIECK[0];
      let bd = Infinity;
      for (let i = 0; i < 3; i++) {
        const p = aufStrecke(z, DREIECK[i], DREIECK[(i + 1) % 3]);
        const d = laenge(sub(z, p));
        if (d < bd) {
          bd = d;
          best = p;
        }
      }
      return best;
    },
    rand: dreieckRand,
    flaeche: (px, py) => (
      <polygon
        points={DREIECK.map((p) => `${px(p[0])},${py(p[1])}`).join(" ")}
        fill={BLAU}
        fillOpacity={0.16}
        stroke={BLAU}
        strokeWidth={1.4}
      />
    ),
    extrem: DREIECK,
    aussen: [1.8, 0.9],
    innen: [0.1, -0.1],
  },
];

export function ProjektionsWidget() {
  const [mengeId, setMengeId] = useState(MENGEN[0].id);
  const [x, setX] = useState<Punkt>(MENGEN[0].aussen);
  const [zieht, setZieht] = useState(false);

  const menge = MENGEN.find((m) => m.id === mengeId) ?? MENGEN[0];

  const px = (v: number) => PAD_L + ((v + HALB) / (2 * HALB)) * SIZE;
  const py = (v: number) => SIZE - ((v + HALB) / (2 * HALB)) * SIZE;

  const setzen = (e: ReactPointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = (e.clientX - r.left) * ((PAD_L + SIZE + PAD_R) / r.width);
    const sy = (e.clientY - r.top) * ((SIZE + PAD_B) / r.height);
    const wx = -HALB + ((sx - PAD_L) / SIZE) * 2 * HALB;
    const wy = -HALB + ((SIZE - sy) / SIZE) * 2 * HALB;
    const klemm = (v: number) => Math.min(HALB, Math.max(-HALB, v));
    setX([Math.round(klemm(wx) * 20) / 20, Math.round(klemm(wy) * 20) / 20]);
  };

  const mengeWaehlen = (id: string) => {
    const m = MENGEN.find((k) => k.id === id) ?? MENGEN[0];
    setMengeId(id);
    setX(m.aussen);
  };

  const drin = menge.drin(x);
  const xh = menge.projektion(x);
  const diff = sub(x, xh);
  const d = laenge(diff);

  // Winkelprobe: <x - xhat, y - xhat> über alle Randpunkte y der Menge
  let groesstesSkalar = -Infinity;
  for (const y of menge.rand) groesstesSkalar = Math.max(groesstesSkalar, dot(diff, sub(y, xh)));
  // kleinster Abstand unter denselben Randpunkten, als Gegenprobe zur Minimalität
  let bestRand = Infinity;
  for (const y of menge.rand) bestRand = Math.min(bestRand, laenge(sub(x, y)));

  // Stützgerade durch xhat senkrecht zu x - xhat (nur definiert, solange d > 0)
  const richtung: Punkt | null = d > 1e-9 ? [-diff[1] / d, diff[0] / d] : null;
  const L = 2 * HALB;

  const status: { farbe: string; kopf: string; text: string } = drin
    ? {
        farbe: GRUEN,
        kopf: "x liegt schon in der Menge",
        text: `Dann ist x selbst der nächstgelegene Punkt, also x̂ = x und d = 0. Die Stützgerade lassen wir hier weg: Die Richtung x − x̂ ist der Nullvektor und gibt keine Senkrechte her. Ziehen wir x nach außen.`,
      }
    : {
        farbe: ORANGE,
        kopf: "x̂ ist der eindeutige nächste Punkt",
        text: `Der Kreis mit Radius d = ${fmt(
          d,
          3,
        )} um x berührt die Menge genau in x̂ und schneidet sie sonst nirgends; unter ${
          menge.rand.length
        } abgetasteten Randpunkten unterbietet keiner diesen Abstand (kleinster gefundener Wert ${fmt(
          bestRand,
          3,
        )}). Die gestrichelte Gerade durch x̂ steht senkrecht auf x − x̂, und die ganze Menge liegt auf ihrer abgewandten Seite: Für jeden Punkt y der Menge ist ⟨x − x̂, y − x̂⟩ ≤ 0, das größte abgetastete Skalarprodukt beträgt ${fmt(
          groesstesSkalar,
          3,
        )}.`,
      };

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Ziehen wir den Punkt x über die Zeichenfläche und beobachten wir den orangen Punkt x̂: den
        Punkt der blauen Menge mit dem kleinsten Abstand zu x. Die Koordinaten rasten auf Schritte
        von 0,05 ein.
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {MENGEN.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`rounded border px-3 py-1 ${
              m.id === mengeId
                ? "border-sky-600 bg-sky-50 dark:bg-sky-900/40"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => mengeWaehlen(m.id)}
          >
            {m.name}
          </button>
        ))}
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setX(menge.aussen)}
        >
          x nach außen
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setX(menge.innen)}
        >
          x hinein
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            z₂ ↑
          </div>
          <svg
            width={PAD_L + SIZE + PAD_R}
            height={SIZE + PAD_B}
            className="cursor-crosshair rounded border border-slate-300 bg-white dark:border-slate-600"
            style={{ touchAction: "none" }}
            onPointerDown={(e) => {
              setZieht(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              setzen(e);
            }}
            onPointerMove={(e) => {
              if (zieht) setzen(e);
            }}
            onPointerUp={() => setZieht(false)}
            onPointerLeave={() => setZieht(false)}
          >
            <defs>
              <clipPath id="s123-proj-clip">
                <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
              </clipPath>
            </defs>
            {niceTicks(-HALB, HALB).map((t) => (
              <g key={`y${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + SIZE}
                  y1={py(t)}
                  y2={py(t)}
                  stroke="#e2e8f0"
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill={GRAU} fontSize={10}>
                  {fmt(t, Number.isInteger(t) ? 0 : 1)}
                </text>
              </g>
            ))}
            {niceTicks(-HALB, HALB).map((t) => (
              <g key={`x${t}`}>
                <line
                  y1={0}
                  y2={SIZE}
                  x1={px(t)}
                  x2={px(t)}
                  stroke="#e2e8f0"
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text x={px(t)} y={SIZE + 12} textAnchor="middle" fill={GRAU} fontSize={10}>
                  {fmt(t, Number.isInteger(t) ? 0 : 1)}
                </text>
              </g>
            ))}
            <g clipPath="url(#s123-proj-clip)">
              {menge.flaeche(px, py)}
              {(menge.extrem ?? []).map((e, i) => (
                <circle key={`e${i}`} cx={px(e[0])} cy={py(e[1])} r={3.5} fill={BLAU} />
              ))}
              {!drin && (
                <>
                  <circle
                    cx={px(x[0])}
                    cy={py(x[1])}
                    r={px(d) - px(0)}
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth={1}
                    strokeDasharray="2 4"
                    opacity={0.8}
                  />
                  {richtung && (
                    <line
                      x1={px(xh[0] - L * richtung[0])}
                      y1={py(xh[1] - L * richtung[1])}
                      x2={px(xh[0] + L * richtung[0])}
                      y2={py(xh[1] + L * richtung[1])}
                      stroke={GRAU}
                      strokeWidth={1.2}
                      strokeDasharray="6 4"
                    />
                  )}
                  <line
                    x1={px(x[0])}
                    y1={py(x[1])}
                    x2={px(xh[0])}
                    y2={py(xh[1])}
                    stroke={ORANGE}
                    strokeWidth={2.2}
                  />
                </>
              )}
              <circle cx={px(xh[0])} cy={py(xh[1])} r={5.5} fill={ORANGE} />
              <text x={px(xh[0]) + 8} y={py(xh[1]) + 14} fill={ORANGE} fontSize={12}>
                x̂
              </text>
              <circle cx={px(x[0])} cy={py(x[1])} r={5} fill="#ffffff" stroke="#1e293b" strokeWidth={2} />
              <text x={px(x[0]) + 8} y={py(x[1]) - 7} fill="#1e293b" fontSize={12}>
                x
              </text>
            </g>
          </svg>
          <div className="mt-0.5 text-center text-[11px]" style={{ width: PAD_L + SIZE }}>
            z₁ →
          </div>
        </div>

        <div className="min-w-[15rem] grow space-y-2 text-sm">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3 align-top">Menge</td>
                <td className="font-mono text-xs" style={{ color: BLAU }}>
                  {menge.formel}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">x</td>
                <td className="font-mono text-xs">
                  {punktText(x)} {drin ? "∈ 𝒳" : "∉ 𝒳"}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">x̂</td>
                <td className="font-mono text-xs" style={{ color: ORANGE }}>
                  {punktText(xh)}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">d = ‖x − x̂‖</td>
                <td className="font-mono text-xs" style={{ color: ORANGE }}>
                  {fmt(d, 3)}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">max ⟨x − x̂, y − x̂⟩</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {fmt(groesstesSkalar, 3)}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="font-semibold" style={{ color: status.farbe }}>
            {status.kopf}
          </p>
          <p className="max-w-prose">{status.text}</p>
        </div>
      </div>
      <p className="max-w-prose text-xs text-slate-500 dark:text-slate-400">
        Das Maximum in der letzten Zeile läuft über die abgetasteten Randpunkte y der Menge. Weil
        y ↦ ⟨x − x̂, y − x̂⟩ linear ist, wird es ohnehin am Rand angenommen; für das Dreieck
        genügten sogar die drei Ecken. Der Wert bleibt bei jeder Lage von x kleiner oder gleich
        null, und er ist genau dann null, wenn y auf der gestrichelten Stützgeraden liegt.
      </p>
    </div>
  );
}
