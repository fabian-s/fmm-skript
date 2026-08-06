import { useMemo, useRef, useState } from "react";
import { M, Slider } from "../../../lib";

/**
 * Widgets für §4.2 „Kondition":
 *  - KehrwertWidget: f(x) = 1/x mit Reglern für x und Störung ε; relativer
 *    Input- vs. Outputfehler live, Blow-up für ε → −x.
 *  - SummenKonditionWidget: f(x) = x₁ + x₂; Punkt in der Ebene ziehen,
 *    Readout κ_rel = √2·‖x‖₂/|x₁+x₂|, farbcodierte Karte mit Blow-up
 *    an der Antidiagonalen.
 *
 * Farbcode konsistent zum Fließtext: Störung/Inputfehler rot, Outputfehler
 * grün, Verstärkungsfaktor bzw. Konditionszahl orange, Ausgangspunkt blau.
 */

const COL = {
  x: "#0072B2", // fmmblue: ungestörter Input / Punkt
  pert: "#D55E00", // fmmred: Störung ε, relativer Inputfehler
  out: "#009E73", // fmmgreen: Outputfehler
  amp: "#E69F00", // fmmorange: Verstärkung / Konditionszahl
  neutral: "#64748b", // slate-500: lesbar auf hell und dunkel
};

const fmt = (v: number): string => {
  if (Number.isNaN(v)) return "–"; // undefinierter Quotient (z. B. ε = 0), NICHT ∞
  if (!Number.isFinite(v)) return "∞";
  const a = Math.abs(v);
  if (a === 0) return "0";
  return a >= 0.01 && a < 10000 ? v.toPrecision(3) : v.toExponential(2);
};

const fmtPct = (v: number): string => (Number.isFinite(v) ? (100 * v).toFixed(1) + " %" : "–");

function Readout({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 py-0.5 last:border-b-0 dark:border-slate-700">
      <span style={color ? { color } : undefined}>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

/** f(x) = 1/x: relativer Input- vs. Outputfehler unter einer Störung ε. */
export function KehrwertWidget() {
  const [x, setX] = useState(0.6);
  const [eps, setEps] = useState(-0.45);

  const xt = x + eps;
  const valid = xt > 0.001;
  const fx = 1 / x;
  const fxt = valid ? 1 / xt : NaN;
  const relIn = Math.abs(eps) / x;
  const relOut = valid ? Math.abs(fxt - fx) / fx : NaN; // = |ε| / |x + ε|
  const amp = valid && relIn > 0 ? relOut / relIn : NaN; // = x / |x + ε|

  // Welt → Bildschirm
  const W = 400;
  const H = 300;
  const L = 46;
  const R = 12;
  const T = 12;
  const B = 30;
  const XMAX = 3.4;
  const YMAX = 10;
  const sx = (wx: number) => L + ((W - L - R) * wx) / XMAX;
  const sy = (wy: number) => T + (H - T - B) * (1 - Math.min(wy, YMAX) / YMAX);

  const curve = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 180; i++) {
      const t = 1 / YMAX + (3.35 - 1 / YMAX) * (i / 180);
      pts.push(`${sx(t).toFixed(1)},${sy(1 / t).toFixed(1)}`);
    }
    return pts.join(" ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fxC = Math.min(fx, YMAX);
  const fxtC = valid ? Math.min(fxt, YMAX) : YMAX;

  return (
    <div className="flex flex-wrap items-start gap-5 text-sm">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        role="img"
        aria-label="Graph von f(x) = 1/x mit dem Punkt x, dem gestörten Punkt x plus epsilon und den zugehörigen Fehlerintervallen auf beiden Achsen."
      >
        {/* Achsen */}
        <line x1={L} y1={sy(0)} x2={W - R} y2={sy(0)} stroke={COL.neutral} strokeWidth={1.2} />
        <line x1={sx(0)} y1={T} x2={sx(0)} y2={sy(0)} stroke={COL.neutral} strokeWidth={1.2} />
        {[1, 2, 3].map((t) => (
          <g key={`xt${t}`}>
            <line x1={sx(t)} y1={sy(0)} x2={sx(t)} y2={sy(0) + 4} stroke={COL.neutral} />
            <text x={sx(t)} y={sy(0) + 16} textAnchor="middle" fill={COL.neutral} fontSize={11}>
              {t}
            </text>
          </g>
        ))}
        {[2, 4, 6, 8, 10].map((t) => (
          <g key={`yt${t}`}>
            <line x1={sx(0) - 4} y1={sy(t)} x2={sx(0)} y2={sy(t)} stroke={COL.neutral} />
            <text x={sx(0) - 7} y={sy(t) + 4} textAnchor="end" fill={COL.neutral} fontSize={11}>
              {t}
            </text>
          </g>
        ))}
        <text x={W - R - 2} y={sy(0) - 6} textAnchor="end" fill={COL.neutral} fontSize={12} fontStyle="italic">
          x
        </text>
        <text x={sx(0) + 8} y={T + 12} fill={COL.neutral} fontSize={12} fontStyle="italic">
          f(x) = 1/x
        </text>
        {/* Graph */}
        <polyline points={curve} fill="none" stroke={COL.neutral} strokeWidth={1.8} />

        {/* Inputfehler-Intervall auf der x-Achse */}
        <line
          x1={sx(Math.min(x, Math.max(xt, 0)))}
          y1={sy(0)}
          x2={sx(Math.max(x, xt))}
          y2={sy(0)}
          stroke={COL.pert}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <text x={sx((x + Math.max(xt, 0)) / 2)} y={sy(0) + 16} textAnchor="middle" fill={COL.pert} fontSize={12} fontStyle="italic" fontWeight={600}>
          ε
        </text>

        {/* Outputfehler-Intervall auf der y-Achse */}
        {valid && (
          <line x1={sx(0)} y1={sy(fxC)} x2={sx(0)} y2={sy(fxtC)} stroke={COL.out} strokeWidth={5} strokeLinecap="round" />
        )}

        {/* Hilfslinien und Punkte: ungestört (blau) */}
        <polyline
          points={`${sx(x)},${sy(0)} ${sx(x)},${sy(fxC)} ${sx(0)},${sy(fxC)}`}
          fill="none"
          stroke={COL.x}
          strokeWidth={1.3}
          strokeDasharray="4 3"
        />
        <circle cx={sx(x)} cy={sy(fxC)} r={4.5} fill={COL.x} />
        <text x={sx(x) + 7} y={sy(fxC) - 7} fill={COL.x} fontSize={12} fontStyle="italic" fontWeight={600}>
          (x, f(x))
        </text>
        {/* gestört (rot) */}
        {valid && (
          <g>
            <polyline
              points={`${sx(xt)},${sy(0)} ${sx(xt)},${sy(fxtC)} ${sx(0)},${sy(fxtC)}`}
              fill="none"
              stroke={COL.pert}
              strokeWidth={1.3}
              strokeDasharray="4 3"
            />
            <circle cx={sx(xt)} cy={sy(fxtC)} r={4.5} fill={COL.pert} />
            {fxt > YMAX && (
              <text x={sx(xt) + 7} y={sy(fxtC) + 12} fill={COL.pert} fontSize={11}>
                f(x̃) &gt; 10, außerhalb des Bildes
              </text>
            )}
          </g>
        )}
      </svg>
      <div className="min-w-[16rem] grow basis-64">
        <Slider label="Input x" value={x} onChange={setX} min={0.1} max={2.8} step={0.01} />
        <Slider label="Störung ε" value={eps} onChange={setEps} min={-0.55} max={0.55} step={0.005} />
        <div className="mt-3 rounded bg-slate-100 p-2 dark:bg-slate-800">
          <Readout label="x̃ = x + ε" value={fmt(xt)} />
          <Readout label="f(x) = 1/x" value={fmt(fx)} color={COL.x} />
          <Readout label="f(x̃) = 1/x̃" value={valid ? fmt(fxt) : "–"} />
          <Readout label="rel. Inputfehler |ε|/|x|" value={fmtPct(relIn)} color={COL.pert} />
          <Readout label="rel. Outputfehler |f(x̃)−f(x)|/|f(x)|" value={fmtPct(relOut)} color={COL.out} />
          <Readout label="Verstärkung: Output-/Inputfehler" value={fmt(amp)} color={COL.amp} />
        </div>
        {!valid ? (
          <p className="mt-2 text-xs font-semibold" style={{ color: COL.pert }}>
            x̃ = x + ε ≤ 0: Die Störung hat uns über die Polstelle geschoben; das Ergebnis hat
            nicht einmal mehr das richtige Vorzeichen.
          </p>
        ) : (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {!(amp >= 1.5) ? ( // NaN (ε = 0) fällt in den Normalzweig
              <>
                Solange |ε| klein gegenüber x ist, liegt die Verstärkung nahe 1: Der Kehrwert
                gibt relative Fehler fast unverändert weiter (κ<sub>rel</sub> = 1).
              </>
            ) : (
              <>
                Schieben wir ε in Richtung −x, rückt x̃ an die Polstelle: Das grüne
                Output-Intervall wächst explosiv, obwohl das rote Input-Intervall klein bleibt.
              </>
            )}
          </p>
        )}
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Beide Fehlerquotienten hängen nur vom Verhältnis ε/x ab. Das Widget mit{" "}
          <M>{"x \\approx 1"}</M> zeigt also exakt dasselbe Verhalten wie Beispiel 4.2.1 mit{" "}
          <M>{"x = 10^{-17}"}</M>.
        </p>
      </div>
    </div>
  );
}

/** Farbrampe: κ = 1 (fast weiß) → orange → rot (κ ≥ 100). */
function ramp(t: number): string {
  const a: [number, number, number] = [255, 250, 240];
  const b: [number, number, number] = [230, 159, 0];
  const c: [number, number, number] = [213, 94, 0];
  const mix = (u: [number, number, number], v: [number, number, number], s: number) =>
    [0, 1, 2].map((i) => Math.round(u[i] + (v[i] - u[i]) * s));
  const rgb = t < 0.5 ? mix(a, b, t * 2) : mix(b, c, (t - 0.5) * 2);
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

/** f(x) = x₁ + x₂: κ_rel = √2·‖x‖₂/|x₁+x₂| als Karte über der Ebene. */
export function SummenKonditionWidget() {
  const [px, setPx] = useState(1.2);
  const [py, setPy] = useState(-0.85);
  const dragRef = useRef(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const HALF = 2;
  const W = 340;
  const H = 340;
  const sx = (wx: number) => ((wx + HALF) / (2 * HALF)) * W;
  const sy = (wy: number) => ((HALF - wy) / (2 * HALF)) * H;

  const cells = useMemo(() => {
    const n = 48;
    const cw = (2 * HALF) / n;
    const size = W / n;
    const out: { x: number; y: number; c: string }[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const wx = -HALF + (i + 0.5) * cw;
        const wy = -HALF + (j + 0.5) * cw;
        const s = Math.abs(wx + wy);
        const k = s < 1e-12 ? Infinity : (Math.SQRT2 * Math.hypot(wx, wy)) / s;
        const t = Number.isFinite(k) ? Math.min(1, Math.max(0, Math.log10(Math.max(k, 1)) / 2)) : 1;
        out.push({ x: sx(-HALF + i * cw), y: sy(-HALF + (j + 1) * cw), c: ramp(t) });
      }
    }
    return { size, out };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summe = px + py;
  const nrm = Math.hypot(px, py);
  const kappa = Math.abs(summe) < 1e-12 ? Infinity : (Math.SQRT2 * nrm) / Math.abs(summe);

  const clamp = (v: number) => Math.max(-HALF, Math.min(HALF, v));
  const toWorld = (e: React.PointerEvent<SVGSVGElement>): [number, number] => {
    const r = svgRef.current!.getBoundingClientRect();
    const wx = ((e.clientX - r.left) / r.width) * 2 * HALF - HALF;
    const wy = HALF - ((e.clientY - r.top) / r.height) * 2 * HALF;
    return [clamp(wx), clamp(wy)];
  };

  const status =
    !Number.isFinite(kappa) ? (
      <>
        <strong style={{ color: COL.pert }}>Schlecht gestellt:</strong> Auf der Antidiagonalen ist{" "}
        x₁ + x₂ = 0, der relative Outputfehler ist also nicht einmal definiert, κ<sub>rel</sub> = ∞.
      </>
    ) : kappa < 3 ? (
      <>
        <strong style={{ color: COL.out }}>Gut konditioniert:</strong> Relative Inputfehler werden
        höchstens um den Faktor {fmt(kappa)} verstärkt.
      </>
    ) : kappa < 50 ? (
      <>
        <strong style={{ color: COL.amp }}>Mäßig konditioniert:</strong> Fehler können bereits um
        den Faktor {fmt(kappa)} wachsen; wir verlieren bis zu {Math.ceil(Math.log10(kappa))}{" "}
        Dezimalstellen.
      </>
    ) : (
      <>
        <strong style={{ color: COL.pert }}>Schlecht konditioniert:</strong> Nahe der
        Antidiagonalen löschen sich x₁ und x₂ fast aus: Winzige relative Inputfehler zerstören
        das Ergebnis.
      </>
    );

  return (
    <div className="flex flex-wrap items-start gap-5 text-sm">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="max-w-full cursor-crosshair rounded border border-slate-300 bg-white dark:border-slate-600"
        style={{ touchAction: "none" }}
        role="img"
        aria-label="Karte der relativen Konditionszahl der Summe x1 plus x2 über der Ebene; entlang der Antidiagonalen x2 gleich minus x1 explodiert sie. Ein Punkt lässt sich mit der Maus ziehen."
        onPointerDown={(e) => {
          dragRef.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          const [wx, wy] = toWorld(e);
          setPx(wx);
          setPy(wy);
        }}
        onPointerMove={(e) => {
          if (!dragRef.current) return;
          const [wx, wy] = toWorld(e);
          setPx(wx);
          setPy(wy);
        }}
        onPointerUp={() => {
          dragRef.current = false;
        }}
      >
        {/* Farbkarte */}
        {cells.out.map((c, i) => (
          <rect key={i} x={c.x} y={c.y} width={cells.size + 0.5} height={cells.size + 0.5} fill={c.c} shapeRendering="crispEdges" />
        ))}
        {/* Achsen */}
        <line x1={sx(-HALF)} y1={sy(0)} x2={sx(HALF)} y2={sy(0)} stroke={COL.neutral} strokeWidth={1} strokeOpacity={0.6} />
        <line x1={sx(0)} y1={sy(-HALF)} x2={sx(0)} y2={sy(HALF)} stroke={COL.neutral} strokeWidth={1} strokeOpacity={0.6} />
        <text x={sx(HALF) - 16} y={sy(0) - 5} fill={COL.neutral} fontSize={12} fontStyle="italic">
          x₁
        </text>
        <text x={sx(0) + 5} y={sy(HALF) + 14} fill={COL.neutral} fontSize={12} fontStyle="italic">
          x₂
        </text>
        {/* Antidiagonale (κ = ∞) und Diagonale (κ = 1) */}
        <line x1={sx(-HALF)} y1={sy(HALF)} x2={sx(HALF)} y2={sy(-HALF)} stroke={COL.pert} strokeWidth={1.6} strokeDasharray="6 4" />
        <text x={sx(-1.9)} y={sy(1.55)} fill={COL.pert} fontSize={11} fontWeight={600}>
          x₁ + x₂ = 0
        </text>
        <line x1={sx(-HALF)} y1={sy(-HALF)} x2={sx(HALF)} y2={sy(HALF)} stroke={COL.out} strokeWidth={1.4} strokeDasharray="3 4" />
        <text x={sx(1.35)} y={sy(1.7)} fill={COL.out} fontSize={11} fontWeight={600}>
          κ = 1
        </text>
        {/* Zugpunkt */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(px)} y2={sy(py)} stroke={COL.x} strokeWidth={1.5} strokeDasharray="2 3" />
        <circle cx={sx(px)} cy={sy(py)} r={8} fill={COL.x} stroke="#ffffff" strokeWidth={2} style={{ cursor: "grab" }} />
      </svg>
      <div className="min-w-[16rem] grow basis-64">
        <div className="rounded bg-slate-100 p-2 dark:bg-slate-800">
          <Readout label="x = (x₁, x₂)" value={`(${fmt(px)}, ${fmt(py)})`} color={COL.x} />
          <Readout label="f(x) = x₁ + x₂" value={fmt(summe)} />
          <Readout label="‖x‖₂" value={fmt(nrm)} />
          <Readout label="κ_abs = √2" value="1.41" />
          <Readout label="κ_rel = √2·‖x‖₂/|x₁+x₂|" value={fmt(kappa)} color={COL.amp} />
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{status}</p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Ziehen wir den Punkt durch die Ebene: Die Farbe zeigt{" "}
          <M>{"\\kappa_{rel}"}</M> (hell: nahe 1, dunkel: ≥ 100). Entlang der roten Antidiagonalen
          heben sich x₁ und x₂ gegenseitig auf – dieselbe Auslöschung, die uns in Kapitel 2
          begegnet ist. Auf der grünen Diagonalen x₂ = x₁ ist die Summe dagegen maximal gutmütig:{" "}
          <M>{"\\kappa_{rel} = 1"}</M>. Da κ<sub>rel</sub> nur von der <em>Richtung</em> von x
          abhängt, ist die Karte entlang jedes Strahls durch den Ursprung einfarbig.
        </p>
      </div>
    </div>
  );
}
