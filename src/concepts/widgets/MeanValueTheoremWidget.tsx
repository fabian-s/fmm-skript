/**
 * Konzept-Widget `mean-value-theorem` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: Zu jeder Sekante gibt es im Inneren mindestens eine
 * Tangente mit derselben Steigung — wir dürfen die Endpunkte legen, wie wir
 * wollen, die parallele Tangente ist schon da.
 *
 * FARBROLLEN: blau = f(x) = x³/3 − x; rot = Sekante samt ihren beiden
 * ziehbaren Endpunkten; grün (gestrichelt) = die Tangente(n) in den Stellen ξ,
 * grüne Punkte = die zugehörigen Berührpunkte.
 *
 * PROVENIENZ: Funktion, Sekantensteigung und die geschlossene Formel
 * ξ = ±√(m + 1) aus der Vorfassung; das Ziehen läuft über `useDrag` aus der
 * Lib (Rezept wie in ConvexityWidget), Regler bleiben als Doppelpfad. Der
 * erklärende Absatz steht jetzt in mean-value-theorem.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node,
 * /tmp/claude-1000/-home-fabians-lehre-FMM-fmm-lmu/3a8ca427-1db0-42e8-8398-15672016f929/scratchpad/verify/REV1/MeanValueTheoremWidget.mjs,
 * 2026-08-20): für f(x) = x³/3 − x ist die Sekantensteigung
 * m = (a² + ab + b²)/3 − 1 (numerisch gegengerechnet) und f′(x) = x² − 1, also
 * ξ = ±√(m + 1). Startzustand a = −2, b = 1,6: m = 0,120000, ξ = ±1,058301.
 * Weitere Proben: a = −1,5 / b = 1,5 → m = −0,250000, ξ = ±0,866025;
 * a = −0,5 / b = 2 → m = 0,083333, nur ξ = 1,040833 liegt im Intervall;
 * a = 0,4 / b = 2 → m = 0,653333, ξ = 1,285820.
 */
import { useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_MUTED,
  clamp,
  fmtDe,
  fmtTick,
  useDrag,
} from "../../lib";

const B = 330;
const H = 220;
const PAD_L = 30;
const PAD_R = 8;
const PAD_T = 22;
const PAD_B = 26;
const X0 = -2.7;
const X1 = 2.7;
const Y0 = -3;
const Y1 = 3;
const MIN_ABSTAND = 0.3;

const f = (x: number) => (x * x * x) / 3 - x;

export function MvtWidget() {
  const [a, setA] = useState(-2);
  const [b, setB] = useState(1.6);

  const px = (x: number) => PAD_L + ((x - X0) / (X1 - X0)) * (B - PAD_L - PAD_R);
  const py = (y: number) => PAD_T + (1 - (y - Y0) / (Y1 - Y0)) * (H - PAD_T - PAD_B);

  const zieh = useDrag<"a" | "b">({
    feld: { x0: PAD_L, y0: PAD_T, w: B - PAD_L - PAD_R, h: H - PAD_T - PAD_B },
    welt: { x0: X0, x1: X1, y0: Y0, y1: Y1 },
    clamp: ([x, y], id) => [
      id === "a" ? clamp(x, -2.5, b - MIN_ABSTAND) : clamp(x, a + MIN_ABSTAND, 2.5),
      y,
    ],
    greifPosition: (id) => (id === "a" ? [a, f(a)] : [b, f(b)]),
    onDrag: ([x], id) => (id === "a" ? setA(x) : setB(x)),
  });

  const m = (f(b) - f(a)) / (b - a);
  const wurzel = Math.sqrt(Math.max(0, m + 1));
  const xis = [wurzel, -wurzel].filter((x, i) => (i === 0 || wurzel > 1e-9) && x > a + 1e-9 && x < b - 1e-9);
  const sekante = (x: number) => f(a) + m * (x - a);

  const kurve = Array.from({ length: 241 }, (_, i) => {
    const x = X0 + ((X1 - X0) * i) / 240;
    return `${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`;
  }).join(" ");

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Ziehen wir die roten Endpunkte über den Graphen und suchen eine Lage ohne parallele Tangente.</Aufgabe>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={`Sekante von ${fmtDe(a, 2)} nach ${fmtDe(b, 2)} mit Steigung ${fmtDe(m, 3)} und ${xis.length} paralleler Tangente(n).`}
        {...zieh.svgProps}
      >
        <rect x={0.5} y={0.5} width={B - 1} height={H - 1} rx={4} fill="var(--w-bg)" stroke="var(--w-border)" />
        {[-3, -2, -1, 0, 1, 2, 3].map((t) => (
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
              {fmtTick(t, 1)}
            </text>
          </g>
        ))}
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
        <text x={PAD_L - 4} y={12} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          f
        </text>
        <polyline points={kurve} fill="none" stroke={FMM_COLORS.blau} strokeWidth={1.8} />
        {xis.map((xi) => (
          <line
            key={`t${xi}`}
            x1={px(X0)}
            y1={py(f(xi) + m * (X0 - xi))}
            x2={px(X1)}
            y2={py(f(xi) + m * (X1 - xi))}
            stroke={FMM_COLORS.gruen}
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
        ))}
        <line x1={px(a)} y1={py(f(a))} x2={px(b)} y2={py(sekante(b))} stroke={FMM_COLORS.rot} strokeWidth={1.8} />
        {xis.map((xi) => (
          <circle key={`p${xi}`} cx={px(xi)} cy={py(f(xi))} r={3.5} fill={FMM_COLORS.gruen} />
        ))}
        <DragHandle x={px(a)} y={py(f(a))} r={4} farbe={FMM_COLORS.rot} aktiv={zieh.dragging === "a"} {...zieh.handleProps("a")} />
        <DragHandle x={px(b)} y={py(f(b))} r={4} farbe={FMM_COLORS.rot} aktiv={zieh.dragging === "b"} {...zieh.handleProps("b")} />
      </svg>
      <Slider label="a" value={a} onChange={(v) => setA(Math.min(v, b - MIN_ABSTAND))} min={-2.5} max={2.2} step={0.05} accent={FMM_COLORS.rot} />
      <Slider label="b" value={b} onChange={(v) => setB(Math.max(v, a + MIN_ABSTAND))} min={-2.2} max={2.5} step={0.05} accent={FMM_COLORS.rot} />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> f(x) = x³/3 − x ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Sekante ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> Tangente in ξ
      </p>
      <Verdikt kind="ok">
        Die Sekante hat Steigung m = {fmtDe(m, 3)}; dieselbe Steigung hat f′ an{" "}
        {xis.length === 1 ? "der Stelle" : "den Stellen"} ξ = {xis.map((x) => fmtDe(x, 3)).join(" und ")}
        , denn f′(x) = x² − 1 führt auf ξ = ±√(m + 1). Eine Lage ohne solche Stelle gibt es nicht:
        genau das behauptet der Mittelwertsatz, und wo ξ liegt, verrät er nicht.
      </Verdikt>
    </div>
  );
}
