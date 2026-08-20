/**
 * Konzept-Widget für `convexity` UND `convex-function` (Dublettenauflösung D6,
 * 2026-08-19; das frühere ConvexFunctionWidget ist entfallen — es prüfte nur
 * den Mittelpunkt und meldete für die Doppelmulde fälschlich „konvex").
 *
 * DIE EINE EINSICHT: Konvexität ist eine Aussage über JEDES Punktepaar. Ein
 * einziges Paar, dessen Sehne unter den Graphen taucht, widerlegt sie; ein
 * bestehendes Paar beweist dagegen gar nichts.
 *
 * FARBROLLEN: blau = Graph von f; grün = Sehne, solange sie über dem Graphen
 * bleibt; rot = Sehne und Fläche dort, wo der Graph über die Sehne steigt
 * (die Verletzung); die Endpunktgriffe tragen die Farbe der Sehne.
 *
 * PROVENIENZ: Der Rechenkern (Verletzungsflächen als Polygonzüge, ziehbare
 * Endpunkte auf dem Graphen, Kurvenauswahl) ist die kompakte Fassung von
 * src/chapters/12-konvexitaet/widgets/S123Sehne.tsx (SehnenSVG/SehnenTest);
 * das Ziehen läuft über `useDrag` aus der Lib. Alle Texte sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O0/check-o0.mjs, 2026-08-20
 * unabhängig nachgerechnet; Erstprüfung 2026-08-19), je Kurve über alle 3081
 * Paare des 0,05-Rasters mit b − a ≥ 0,15:
 *   0,6x² + 0,3   → 0 Verletzungen, nie Gleichheit (strikt konvex)
 *   |x|           → 0 Verletzungen, bei 1482 Paaren fällt die Sehne mit dem
 *                   Graphen zusammen (konvex, nicht strikt)
 *   2 − 0,6x²     → alle 3081 Paare verletzen, höchstens um 2,4000 (konkav)
 *   x⁴ − 3x² − x + 3 → 1971 Paare verletzen (höchstens um 2,2464), 1110
 *                   bestehen; die Probe kann also auch über den Höcker hinweg
 *                   gelingen, ohne dass f konvex wäre.
 * Voreinstellungen: Parabel a = −1,2 / b = 1,5 besteht (max. Abstand Sehne
 * über Graph 1,0935); |x| mit a = −1,6 / b = −0,4 liegt exakt auf der Sehne;
 * Konkavfall a = −1,4 / b = 1,4 verletzt um 1,1760; Doppelmulde a = −1,55 /
 * b = 1,25 verletzt um 1,8912. Wendepunkte der Doppelmulde bei ±0,7071.
 */
import { useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_PANEL,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../lib";

const BLAU = FMM_COLORS.blau;
const GRUEN = FMM_COLORS.gruen;
const ROT = FMM_COLORS.rot;

type Kurve = {
  id: string;
  name: string;
  formel: string;
  f: (x: number) => number;
  yBereich: [number, number];
  start: [number, number];
};

const KURVEN: Kurve[] = [
  {
    id: "parabel",
    name: "strikt konvex",
    formel: "f(x) = 0,6x² + 0,3",
    f: (x) => 0.6 * x * x + 0.3,
    yBereich: [-0.4, 3.2],
    start: [-1.2, 1.5],
  },
  {
    id: "betrag",
    name: "konvex, nicht strikt",
    formel: "f(x) = |x|",
    f: (x) => Math.abs(x),
    yBereich: [-0.4, 2.4],
    start: [-1.6, -0.4],
  },
  {
    id: "doppelmulde",
    name: "nicht konvex",
    formel: "f(x) = x⁴ − 3x² − x + 3",
    f: (x) => x ** 4 - 3 * x * x - x + 3,
    yBereich: [-1, 9.6],
    start: [-1.55, 1.25],
  },
  {
    id: "konkav",
    name: "konkav",
    formel: "f(x) = 2 − 0,6x²",
    f: (x) => 2 - 0.6 * x * x,
    yBereich: [-1, 2.6],
    start: [-1.4, 1.4],
  },
];

const B = 340;
const H = 215;
const PAD_L = 30;
const PAD_R = 8;
const PAD_T = 20;
const PAD_B = 26;

export function ChordWidget() {
  const [kurveId, setKurveId] = useState(KURVEN[0].id);
  const kurve = KURVEN.find((k) => k.id === kurveId) ?? KURVEN[0];
  const [a, setA] = useState(KURVEN[0].start[0]);
  const [b, setB] = useState(KURVEN[0].start[1]);
  const { f, yBereich } = kurve;

  const px = (x: number) => PAD_L + ((x + 2) / 4) * (B - PAD_L - PAD_R);
  const py = (y: number) =>
    PAD_T + (1 - (y - yBereich[0]) / (yBereich[1] - yBereich[0])) * (H - PAD_T - PAD_B);

  const zieh = useDrag<"a" | "b">({
    feld: { x0: PAD_L, y0: PAD_T, w: B - PAD_L - PAD_R, h: H - PAD_T - PAD_B },
    welt: { x0: -2, x1: 2, y0: yBereich[0], y1: yBereich[1] },
    clamp: ([x, y], id) => [id === "a" ? clamp(x, -2, b - 0.15) : clamp(x, a + 0.15, 2), y],
    greifPosition: (id) => (id === "a" ? [a, f(a)] : [b, f(b)]),
    onDrag: ([x], id) => (id === "a" ? setA(x) : setB(x)),
  });

  const waehlen = (id: string) => {
    const k = KURVEN.find((c) => c.id === id) ?? KURVEN[0];
    setKurveId(id);
    setA(k.start[0]);
    setB(k.start[1]);
  };

  const fa = f(a);
  const fb = f(b);
  const sehne = (x: number) => fa + ((fb - fa) * (x - a)) / (b - a);

  // Kurve und Verletzungsflächen
  const stuetzen = Array.from({ length: 201 }, (_, i) => -2 + (4 * i) / 200);
  const kurvenzug = stuetzen.map((x) => `${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`).join(" ");

  const flecken: string[] = [];
  let lauf: { x: number; fx: number; sx: number }[] = [];
  let maxUeber = 0;
  let maxAbs = 0;
  const schliessen = () => {
    if (lauf.length > 1) {
      flecken.push(
        lauf.map((p) => `${px(p.x).toFixed(1)},${py(p.fx).toFixed(1)}`).join(" ") +
          " " +
          [...lauf].reverse().map((p) => `${px(p.x).toFixed(1)},${py(p.sx).toFixed(1)}`).join(" "),
      );
    }
    lauf = [];
  };
  for (let i = 0; i <= 300; i++) {
    const x = a + ((b - a) * i) / 300;
    const fx = f(x);
    const sx = sehne(x);
    maxUeber = Math.max(maxUeber, fx - sx);
    maxAbs = Math.max(maxAbs, Math.abs(fx - sx));
    if (fx > sx + 1e-9) lauf.push({ x, fx, sx });
    else schliessen();
  }
  schliessen();

  const verletzt = maxUeber > 1e-9;
  const aufDerSehne = maxAbs < 1e-12;

  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Ziehen wir die beiden Endpunkte über den Graphen und suchen wir eine Sehne, die
        unterschritten wird.
      </Aufgabe>
      <div className="my-1 flex flex-wrap gap-1 text-xs">
        {KURVEN.map((k) => (
          <button
            key={k.id}
            type="button"
            aria-pressed={k.id === kurveId}
            className={k.id === kurveId ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => waehlen(k.id)}
          >
            {k.name}
          </button>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        width={B}
        height={H}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={`Der Graph von ${kurve.formel} mit der Sehne zwischen x = ${fmtDe(a, 2)} und x = ${fmtDe(b, 2)}; die Sehne wird ${verletzt ? "unterschritten" : "nicht unterschritten"}.`}
        {...zieh.svgProps}
      >
        <rect
          x={0.5}
          y={0.5}
          width={B - 1}
          height={H - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {(() => {
          const ticks = niceTicks(yBereich[0], yBereich[1], 4);
          const schritt = ticks.length > 1 ? ticks[1] - ticks[0] : undefined;
          return ticks.map((t) => (
            <g key={`y${t}`}>
              <line
                x1={PAD_L}
                x2={B - PAD_R}
                y1={py(t)}
                y2={py(t)}
                stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
                {fmtTick(t, schritt)}
              </text>
            </g>
          ));
        })()}
        {[-2, -1, 0, 1, 2].map((t) => (
          <g key={`x${t}`}>
            <line
              x1={px(t)}
              x2={px(t)}
              y1={PAD_T}
              y2={H - PAD_B}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={px(t)} y={H - PAD_B + 12} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, 1)}
            </text>
          </g>
        ))}
        <text x={(B + PAD_L) / 2} y={H - 3} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
          x
        </text>
        <text x={PAD_L} y={PAD_T - 8} fontSize={9} fill="var(--w-muted)">
          f(x)
        </text>

        {flecken.map((pts, i) => (
          <polygon key={i} points={pts} fill={ROT} fillOpacity={0.3} />
        ))}
        <polyline points={kurvenzug} fill="none" stroke={BLAU} strokeWidth={1.8} />
        <line
          x1={px(a)}
          y1={py(fa)}
          x2={px(b)}
          y2={py(fb)}
          stroke={verletzt ? ROT : GRUEN}
          strokeWidth={1.8}
        />
        <DragHandle
          x={px(a)}
          y={py(fa)}
          r={4}
          farbe={verletzt ? ROT : GRUEN}
          aktiv={zieh.dragging === "a"}
          {...zieh.handleProps("a")}
        />
        <DragHandle
          x={px(b)}
          y={py(fb)}
          r={4}
          farbe={verletzt ? ROT : GRUEN}
          aktiv={zieh.dragging === "b"}
          {...zieh.handleProps("b")}
        />
      </svg>
      <Slider label="linker Punkt" value={a} onChange={(v) => setA(Math.min(v, b - 0.15))} min={-2} max={2} step={0.05} accent={GRUEN} />
      <Slider label="rechter Punkt" value={b} onChange={(v) => setB(Math.max(v, a + 0.15))} min={-2} max={2} step={0.05} accent={GRUEN} />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        <span style={{ color: BLAU }}>▮</span> {kurve.formel} ·{" "}
        <span style={{ color: verletzt ? ROT : GRUEN }}>▮</span> Sehne
      </p>
      <Verdikt kind={verletzt ? "fail" : aufDerSehne ? "warn" : "ok"}>
        {verletzt ? (
          <>
            Der Graph steigt hier um bis zu {fmtDe(maxUeber, 3)} über die Sehne. Ein einziges
            solches Paar genügt: die Ungleichung der Definition scheitert, f ist nicht konvex.
          </>
        ) : aufDerSehne ? (
          <>
            Sehne und Graph fallen auf der ganzen Strecke zusammen. Die Ungleichung gilt, aber
            mit Gleichheit – auf einem geraden Stück ist f konvex, aber nicht strikt konvex.
          </>
        ) : (
          <>
            Die Sehne bleibt um bis zu {fmtDe(maxAbs, 3)} über dem Graphen, dieses Paar besteht
            die Probe. Bewiesen ist damit nichts: die Definition verlangt sie für alle Paare, und
            genau ein Gegenbeispiel würde reichen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
