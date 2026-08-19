import { useState } from "react";
import type { ReactNode } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";

/**
 * §12.3: Projektion auf eine konvexe Menge (Eigenbau).
 *
 * DIE EINE EINSICHT: Der nächstgelegene Punkt x̂ ist eindeutig, und die
 * Gerade durch x̂ senkrecht zu x − x̂ trennt x von der ganzen Menge — an einer
 * Ecke bleibt x̂ sogar stehen, während x weiterläuft (Satz 12.3.1, 12.3.3).
 *
 * Zur Wahl stehen eine Kreisscheibe und ein Dreieck. Der Punkt x ist ziehbar
 * (Muster 2), zwei Regler sind der Doppelpfad. Das Widget zeichnet den
 * nächstgelegenen Punkt der Menge, die Abstandsstrecke, den Kreis mit Radius d
 * um x und die Stützgerade durch die Projektion senkrecht zu x − x̂.
 *
 * Ersetzt die Folienbilder projektionstheorem-intuition.pdf und
 * projektionstheorem.pdf (12-konvexitaet.Rmd Z. 359 bzw. 383).
 *
 * FARBROLLEN (Kapitel 12): Menge blau, Projektion und Abstandsstrecke orange
 * (ausgezeichneter Punkt), Stützgerade und Vergleichszahlen neutralgrau. Grün
 * bleibt in diesem Kapitel den Konvexkombinationen vorbehalten und kommt hier
 * deshalb nicht vor.
 *
 * PROVENIENZ: Eigenbau; Ziehen über `useDrag`, Achsen/Zahlformat/Farben aus
 * `src/lib/widgets/util.ts`.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-12-konvexitaet/
 * check-s123-projektion.mjs, 2026-08-19): über alle 7921 mit dem 0,05-Raster
 * erreichbaren Lagen von x und je 3600 abgetastete Randpunkte bleibt
 * max ⟨x − x̂, y − x̂⟩ ≤ 1,4e−15 (rechnerisch null, angenommen in y = x̂) und
 * kein Randpunkt unterbietet d um mehr als 4,5e−16; von je 400 000
 * gleichverteilten Punkten der vollen Menge liegt keiner näher an x als x̂.
 * Voreinstellungen: Kreisscheibe x = (1,6; 1,2) hat x̂ = (0,8; 0,6) und d = 1;
 * Dreieck x = (1,8; 0,9) hat x̂ = (0,6957; 0,2252) und d = 1,2941; Dreieck
 * x = (2,1; −1,35) projiziert genau auf die Ecke (1,2; −0,6), d = 1,1715 —
 * 749 der 7921 Rasterlagen haben diese Ecke als Projektion.
 */

const BLAU = FMM_COLORS.blau; // die konvexe Menge
const ORANGE = FMM_COLORS.orange; // Projektion, Abstand
const GRAU = FMM_COLORS.grau; // Stützgerade, Vergleichswerte

const HALB = 2.2;
const SIZE = 300;
const PAD_L = 30;
const PAD_B = 30;
const PAD_R = 10;
const VB_W = PAD_L + SIZE + PAD_R;
const VB_H = SIZE + PAD_B;

type Punkt = [number, number];

const punktText = (p: Punkt) => `(${fmtDe(p[0])}; ${fmtDe(p[1])})`;
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
  /** Ecken, an denen die Projektion stehen bleiben kann */
  ecken?: Punkt[];
  vor: { name: string; x: Punkt }[];
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
      return (
        <circle cx={cx} cy={cy} r={r} fill={BLAU} fillOpacity={0.16} stroke={BLAU} strokeWidth={1.4} />
      );
    },
    vor: [
      { name: "x weit außen", x: [1.6, 1.2] },
      { name: "x nah am Rand", x: [1.05, 0.15] },
      { name: "x hinein", x: [0.3, -0.35] },
    ],
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
    ecken: DREIECK,
    vor: [
      { name: "x gegenüber einer Kante", x: [1.8, 0.9] },
      { name: "x hinter einer Ecke", x: [2.1, -1.35] },
      { name: "x hinein", x: [0.1, -0.1] },
    ],
  },
];

export function ProjektionsWidget() {
  const [mengeId, setMengeId] = useState(MENGEN[0].id);
  const [x, setX] = useState<Punkt>(MENGEN[0].vor[0].x);

  const menge = MENGEN.find((m) => m.id === mengeId) ?? MENGEN[0];

  const px = (v: number) => PAD_L + ((v + HALB) / (2 * HALB)) * SIZE;
  const py = (v: number) => SIZE - ((v + HALB) / (2 * HALB)) * SIZE;

  const zieh = useDrag<"x">({
    feld: { x0: PAD_L, y0: 0, w: SIZE, h: SIZE },
    welt: { x0: -HALB, x1: HALB, y0: -HALB, y1: HALB },
    snap: 0.05,
    clamp: ([u, v]) => [clamp(u, -HALB, HALB), clamp(v, -HALB, HALB)],
    greifPosition: () => x,
    onDrag: (p) => setX(p),
  });

  const mengeWaehlen = (id: string) => {
    const m = MENGEN.find((k) => k.id === id) ?? MENGEN[0];
    setMengeId(id);
    setX(m.vor[0].x);
  };

  const drin = menge.drin(x);
  const xh = menge.projektion(x);
  const diff = sub(x, xh);
  const d = laenge(diff);
  const aufEcke = (menge.ecken ?? []).some((e) => laenge(sub(e, xh)) < 1e-9);

  // Winkelprobe: <x - xhat, y - xhat> über alle Randpunkte y der Menge
  let groesstesSkalar = -Infinity;
  for (const y of menge.rand) groesstesSkalar = Math.max(groesstesSkalar, dot(diff, sub(y, xh)));
  // kleinster Abstand unter denselben Randpunkten, als Gegenprobe zur Minimalität
  let bestRand = Infinity;
  for (const y of menge.rand) bestRand = Math.min(bestRand, laenge(sub(x, y)));

  // Stützgerade durch xhat senkrecht zu x - xhat (nur definiert, solange d > 0)
  const richtung: Punkt | null = d > 1e-9 ? [-diff[1] / d, diff[0] / d] : null;
  const L = 2 * HALB;

  const ticks = niceTicks(-HALB, HALB);

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir x um die Menge herum und beobachten wir, wann x̂ mitwandert und wann es
        stehen bleibt.
      </Aufgabe>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {MENGEN.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={m.id === mengeId}
            className={m.id === mengeId ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => mengeWaehlen(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 grow basis-[300px]">
          <svg
            width={VB_W}
            height={VB_H}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="max-w-full h-auto rounded"
            role="img"
            aria-label={`Die Menge ${menge.name} und der Punkt x; die Projektion x̂ liegt ${
              drin ? "auf x selbst" : aufEcke ? "in einer Ecke" : "auf dem Rand"
            }.`}
            {...zieh.svgProps}
          >
            <rect
              x={0.5}
              y={0.5}
              width={VB_W - 1}
              height={VB_H - 1}
              rx={4}
              fill="var(--w-bg, #ffffff)"
              stroke="var(--w-border, #cbd5e1)"
            />
            <defs>
              <clipPath id="s123-proj-clip">
                <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
              </clipPath>
            </defs>
            {ticks.map((t) => (
              <g key={`y${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + SIZE}
                  y1={py(t)}
                  y2={py(t)}
                  stroke={t === 0 ? "var(--w-grid-strong, #cbd5e1)" : "var(--w-grid, #e2e8f0)"}
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text
                  x={PAD_L - 4}
                  y={py(t) + 3}
                  textAnchor="end"
                  fill="var(--w-muted, #64748b)"
                  fontSize={10}
                >
                  {fmtTick(t, 1)}
                </text>
                <line
                  y1={0}
                  y2={SIZE}
                  x1={px(t)}
                  x2={px(t)}
                  stroke={t === 0 ? "var(--w-grid-strong, #cbd5e1)" : "var(--w-grid, #e2e8f0)"}
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text
                  x={px(t)}
                  y={SIZE + 12}
                  textAnchor="middle"
                  fill="var(--w-muted, #64748b)"
                  fontSize={10}
                >
                  {fmtTick(t, 1)}
                </text>
              </g>
            ))}
            <g clipPath="url(#s123-proj-clip)">
              {menge.flaeche(px, py)}
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
              <text
                x={px(xh[0]) + 8}
                y={py(xh[1]) + 14}
                fill={ORANGE}
                fontSize={12}
                stroke="var(--w-bg, #ffffff)"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                x̂
              </text>
              <DragHandle
                x={px(x[0])}
                y={py(x[1])}
                r={5}
                farbe="var(--w-text, #1e293b)"
                aktiv={zieh.dragging === "x"}
                label="x"
                {...zieh.handleProps("x")}
              />
            </g>
            <text x={PAD_L + 4} y={12} fill="var(--w-muted, #64748b)" fontSize={10}>
              z₂ ↑
            </text>
            <text
              x={PAD_L + SIZE / 2}
              y={SIZE + 26}
              textAnchor="middle"
              fill="var(--w-muted, #64748b)"
              fontSize={10}
            >
              z₁ →
            </text>
          </svg>
        </div>

        <div className="min-w-[15rem] grow basis-[15rem] space-y-1 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            {menge.vor.map((v) => (
              <button
                key={v.name}
                type="button"
                aria-pressed={x[0] === v.x[0] && x[1] === v.x[1]}
                className={x[0] === v.x[0] && x[1] === v.x[1] ? W_BUTTON_AKTIV : W_BUTTON}
                onClick={() => setX(v.x)}
              >
                {v.name}
              </button>
            ))}
          </div>
          <Slider
            label="x₁"
            value={x[0]}
            onChange={(v) => setX([Math.round(v * 20) / 20, x[1]])}
            min={-HALB}
            max={HALB}
            step={0.05}
          />
          <Slider
            label="x₂"
            value={x[1]}
            onChange={(v) => setX([x[0], Math.round(v * 20) / 20])}
            min={-HALB}
            max={HALB}
            step={0.05}
          />
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
                  {fmtDe(d, 3)}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">max ⟨x − x̂, y − x̂⟩</td>
                <td className="font-mono text-xs">{fmtDe(groesstesSkalar, 3)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {drin ? (
        <Verdikt kind="neutral" titel="x liegt schon in der Menge.">
          Dann ist x selbst der nächstgelegene Punkt, also x̂ = x und d = 0. Die Stützgerade
          lassen wir hier weg: Die Richtung x − x̂ ist der Nullvektor und gibt keine Senkrechte
          her. Ziehen wir x nach außen.
        </Verdikt>
      ) : aufEcke ? (
        <Verdikt kind="warn" titel="x̂ steht in einer Ecke.">
          Der Abstand ist d = {fmtDe(d, 3)}. Solange x im Normalenkegel dieser Ecke bleibt, rührt
          sich x̂ nicht, obwohl x weiterläuft. Die Projektion ist eindeutig (Satz 12.3.1), aber
          keineswegs umkehrbar. Auch hier trennt die gestrichelte Gerade: Für jeden Punkt y der
          Menge ist ⟨x − x̂, y − x̂⟩ ≤ 0 (Satz 12.3.3), das größte abgetastete Skalarprodukt
          beträgt {fmtDe(groesstesSkalar, 3)}.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" titel="x̂ ist der eindeutige nächste Punkt.">
          Der Kreis mit Radius d = {fmtDe(d, 3)} um x berührt die Menge genau in x̂ und schneidet
          sie sonst nirgends; unter {menge.rand.length} abgetasteten Randpunkten unterbietet
          keiner diesen Abstand (kleinster gefundener Wert {fmtDe(bestRand, 3)}). Die gestrichelte
          Gerade durch x̂ steht senkrecht auf x − x̂, und die ganze Menge liegt auf ihrer
          abgewandten Seite: Für jeden Punkt y der Menge ist ⟨x − x̂, y − x̂⟩ ≤ 0 (Satz 12.3.3),
          das größte abgetastete Skalarprodukt beträgt {fmtDe(groesstesSkalar, 3)}.
        </Verdikt>
      )}
      <p className="max-w-prose text-xs text-slate-500 dark:text-slate-400">
        Das Maximum in der letzten Zeile läuft über die abgetasteten Randpunkte y der Menge. Weil
        y ↦ ⟨x − x̂, y − x̂⟩ linear ist, wird es ohnehin am Rand angenommen; für das Dreieck
        genügten sogar die drei Ecken. Der Wert bleibt bei jeder Lage von x kleiner oder gleich
        null, und er ist genau dann null, wenn y auf der gestrichelten Stützgeraden liegt.
      </p>
    </div>
  );
}
