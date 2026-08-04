/**
 * Widgets für §7.2 „Kondition des Kleinste-Quadrate-Problems".
 * SVG-/Berechnungscode adaptiert aus der internen Heath-Kap.-3-App
 * (interactive/heath-ch3, S33Sensitivity.tsx) — nur Code, Beschriftungen
 * und Erklärtexte neu auf Deutsch; Farben = FMM-Palette.
 *
 * Farbcode, konsistent mit den Herleitungen im Fließtext:
 *   b (Daten) rot · proj_col(A) b bzw. ŷ = Ax̂ grün · Residuum r violett ·
 *   Störungen Δb, E blau · κ₂(A) orange · Δx̂ neutral (im Text ungefärbt).
 */
import { useState } from "react";
import { ConceptLink, LabeledTransformCanvas, M, MD, Slider, sigmaMax } from "../../../lib";

const COL = {
  b: "#D55E00", // fmmred
  bPert: "#e59a66", // helleres Rot (gestörtes b)
  y: "#009E73", // fmmgreen (Projektion)
  yPert: "#5cc3a5", // helleres Grün
  r: "#9E57D5", // fmmpurple (Residuum)
  pert: "#0072B2", // fmmblue (Störung Δb / E)
  kappa: "#E69F00", // fmmorange (κ₂(A), wie \corange im Text)
  dx: "#64748b", // neutral (Δx̂ trägt im Text keine Farbe)
  neutral: "#64748b", // slate-500
};

/** Polygonzug-Punkte für einen Kreisbogen in SVG-Koordinaten; Winkel im
 *  Bogenmaß, gegen den Uhrzeigersinn ab +x bei gespiegelter (y-nach-unten)
 *  Bildschirmachse. */
function arcPts(cx: number, cy: number, r: number, a1: number, a2: number): string {
  const n = 24;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const a = a1 + ((a2 - a1) * i) / n;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy - r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

/** Pfeil in rohen SVG-Koordinaten mit optionaler Strichelung und Beschriftung. */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  dash,
  width = 2.2,
  label,
  lx,
  ly,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dash?: string;
  width?: number;
  label?: string;
  lx?: number;
  ly?: number;
}) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hs = 9;
  const p1x = x2 - hs * Math.cos(ang - 0.42);
  const p1y = y2 - hs * Math.sin(ang - 0.42);
  const p2x = x2 - hs * Math.cos(ang + 0.42);
  const p2y = y2 - hs * Math.sin(ang + 0.42);
  const bx = x2 - 0.6 * hs * Math.cos(ang);
  const by = y2 - 0.6 * hs * Math.sin(ang);
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeDasharray={dash} />
      <polygon
        points={`${x2},${y2} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`}
        fill={color}
      />
      {label && (
        <text x={lx} y={ly} fill={color} fontSize={13} fontStyle="italic" fontWeight={600}>
          {label}
        </text>
      )}
    </g>
  );
}

/** Statische Darstellung der KQ-Geometrie: b ragt aus col(A) heraus,
 *  ŷ = Ax̂ ist sein „Schatten" in der Ebene, r verbindet beide senkrecht. */
export function FigKQGeometrie() {
  // Ebene (Parallelogramm in Pseudo-Perspektive), O = Fußpunkt, Y = Spitze von ŷ, B = Spitze von b
  const O: [number, number] = [140, 225];
  const Y: [number, number] = [320, 255];
  const B: [number, number] = [320, 85];
  return (
    <svg
      viewBox="0 0 480 320"
      className="mx-auto block max-w-full"
      width={480}
      height={320}
      role="img"
      aria-label="Der Vektor b ragt aus der Ebene col(A) heraus; seine Orthogonalprojektion ŷ = Ax̂ liegt in der Ebene, das Residuum r verbindet beide im rechten Winkel, und θ ist der Winkel zwischen b und ŷ."
    >
      {/* der Spaltenraum col(A), als schräg liegendes Parallelogramm */}
      <polygon points="18,248 342,302 442,232 118,178" fill="#0ea5e9" fillOpacity={0.1} stroke="#94a3b8" strokeWidth={1} />
      <text x={46} y={250} fill={COL.neutral} fontSize={13} fontStyle="italic">
        col(A)
      </text>
      {/* ŷ = Ax̂ in der Ebene */}
      <Arrow x1={O[0]} y1={O[1]} x2={Y[0]} y2={Y[1]} color={COL.y} label="ŷ = Ax̂" lx={252} ly={283} />
      {/* b verlässt die Ebene */}
      <Arrow x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} color={COL.b} label="b" lx={212} ly={152} />
      {/* Residuum r = b − Ax̂, orthogonal zur Ebene */}
      <Arrow x1={Y[0]} y1={Y[1]} x2={B[0]} y2={B[1]} color={COL.r} dash="5 4" label="r = b − Ax̂" lx={330} ly={168} />
      {/* rechter Winkel am Fuß des Residuums (perspektivisch verzerrt) */}
      <polyline points="320,243 308.2,241.1 308.2,253.1" fill="none" stroke={COL.neutral} strokeWidth={1.2} />
      {/* Winkel θ zwischen ŷ und b */}
      <polyline points={arcPts(O[0], O[1], 34, -0.165, 0.661)} fill="none" stroke="#475569" strokeWidth={1.4} />
      <text x={184} y={216} fill="#475569" fontSize={13} fontStyle="italic">
        θ
      </text>
    </svg>
  );
}

const fmt = (v: number): string => {
  if (v === 0) return "0";
  const a = Math.abs(v);
  return a >= 0.01 && a < 10000 ? v.toPrecision(4) : v.toExponential(2);
};

function Readout({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 py-0.5 last:border-b-0 dark:border-slate-700">
      <span style={color ? { color } : undefined}>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

/**
 * Interaktive Version der KQ-Geometrie im einfachsten nichttrivialen Fall:
 * m = 2, n = 1, A = (1, 0)ᵀ, also col(A) = horizontale Achse und
 * κ₂(A) = 1 — die gesamte Empfindlichkeit stammt aus dem Winkel θ.
 */
export function WinkelWidget() {
  const [thetaDeg, setThetaDeg] = useState(30);
  const [delta, setDelta] = useState(0.15);
  const [phiDeg, setPhiDeg] = useState(0);

  const th = (thetaDeg * Math.PI) / 180;
  const ph = (phiDeg * Math.PI) / 180;
  const b: [number, number] = [Math.cos(th), Math.sin(th)]; // ‖b‖ = 1
  const bp: [number, number] = [b[0] + delta * Math.cos(ph), b[1] + delta * Math.sin(ph)];
  const x = b[0]; // 1-D-KQ-Lösung: x̂ = A⁺b = b₁
  const dx = bp[0] - b[0];
  const observed = Math.abs(dx) / Math.abs(x);
  const bound = delta / Math.cos(th); // κ₂(A) = 1, ‖b‖ = 1

  // Welt → Bildschirm
  const S = 200;
  const X0 = -0.3;
  const Y1 = 1.25;
  const W = 370;
  const H = 320;
  const sx = (wx: number) => (wx - X0) * S;
  const sy = (wy: number) => (Y1 - wy) * S;

  return (
    <div className="flex flex-wrap items-start gap-5">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600">
        {/* blasse vertikale Achse */}
        <line x1={sx(0)} y1={sy(Y1)} x2={sx(0)} y2={sy(-0.35)} stroke="#e2e8f0" />
        {/* col(A) = horizontale Achse */}
        <line x1={sx(X0)} y1={sy(0)} x2={sx(1.55)} y2={sy(0)} stroke="#0284c7" strokeWidth={2.5} />
        <text x={sx(1.53)} y={sy(0) - 8} textAnchor="end" fill="#0284c7" fontSize={12} fontStyle="italic">
          col(A)
        </text>
        {/* θ-Bogen */}
        <polyline points={arcPts(sx(0), sy(0), 44, 0, th)} fill="none" stroke="#475569" strokeWidth={1.4} />
        <text x={sx(0) + 58 * Math.cos(th / 2) - 4} y={sy(0) - 58 * Math.sin(th / 2) + 4} fill="#475569" fontSize={13} fontStyle="italic">
          θ
        </text>
        {/* Residuum */}
        <Arrow x1={sx(b[0])} y1={sy(0)} x2={sx(b[0])} y2={sy(b[1])} color={COL.r} dash="5 4" label="r" lx={sx(b[0]) + 6} ly={sy(b[1] / 2)} />
        {/* Datenvektor und seine Störung */}
        <Arrow x1={sx(0)} y1={sy(0)} x2={sx(b[0])} y2={sy(b[1])} color={COL.b} label="b" lx={sx(b[0] / 2) - 16} ly={sy(b[1] / 2) - 6} />
        <Arrow x1={sx(0)} y1={sy(0)} x2={sx(bp[0])} y2={sy(bp[1])} color={COL.bPert} dash="4 3" label="b′" lx={sx(bp[0]) + 6} ly={sy(bp[1]) - 6} />
        <Arrow x1={sx(b[0])} y1={sy(b[1])} x2={sx(bp[0])} y2={sy(bp[1])} color={COL.pert} width={1.8} label="Δb" lx={sx((b[0] + bp[0]) / 2) + 7} ly={sy((b[1] + bp[1]) / 2)} />
        {/* Projektionen */}
        <Arrow x1={sx(0)} y1={sy(0)} x2={sx(b[0])} y2={sy(0)} color={COL.y} label="ŷ" lx={sx(b[0]) - 18} ly={sy(0) + 16} />
        <Arrow x1={sx(0)} y1={sy(-0.05)} x2={sx(bp[0])} y2={sy(-0.05)} color={COL.yPert} dash="4 3" width={1.8} label="ŷ′" lx={sx(bp[0]) + 6} ly={sy(-0.05) + 4} />
        {/* Δx̂-Klammer */}
        {Math.abs(dx) > 1e-4 && (
          <g>
            <line x1={sx(b[0])} y1={sy(-0.11)} x2={sx(bp[0])} y2={sy(-0.11)} stroke={COL.dx} strokeWidth={3.5} />
            <text x={sx((b[0] + bp[0]) / 2) - 10} y={sy(-0.11) + 16} fill={COL.dx} fontSize={12} fontStyle="italic" fontWeight={600}>
              Δx̂
            </text>
          </g>
        )}
      </svg>
      <div className="min-w-[16rem] grow basis-64 text-sm">
        <Slider label="Winkel θ (°)" value={thetaDeg} onChange={setThetaDeg} min={5} max={75} step={1} fmt={(v) => v.toFixed(0) + "°"} />
        <Slider label="‖Δb‖₂" value={delta} onChange={setDelta} min={0} max={0.25} step={0.005} />
        <Slider label="Richtung φ von Δb (°)" value={phiDeg} onChange={setPhiDeg} min={0} max={360} step={1} fmt={(v) => v.toFixed(0) + "°"} />
        <div className="mt-3 rounded bg-slate-100 p-2 dark:bg-slate-800">
          <Readout label="cos θ (= ‖ŷ‖₂/‖b‖₂)" value={fmt(Math.cos(th))} />
          <Readout label="‖r‖₂ = sin θ" value={fmt(Math.sin(th))} color={COL.r} />
          <Readout label="Lösung x̂ = cos θ" value={fmt(x)} />
          <Readout label="Δx̂" value={fmt(dx)} />
          <Readout label="beobachtet: |Δx̂| / |x̂|" value={fmt(observed)} />
          <Readout label="Schranke: (1/cos θ)·‖Δb‖₂/‖b‖₂" value={fmt(bound)} />
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Wegen <M>{"\\kappa_2(\\bA) = 1"}</M> reduziert sich die Schranke aus
          Satz 7.2.3 hier auf{" "}
          <M>{"\\left\\|\\Delta\\bb\\right\\|_2 / \\cos(\\theta)"}</M>.
          Angenommen wird sie für <M>{"\\Delta\\bb"}</M> parallel zu{" "}
          <M>{"\\col(\\bA)"}</M> (φ = 0°); ein Δb senkrecht dazu (φ = 90°)
          lässt <M>{"\\wh{x}"}</M> dagegen völlig unverändert.
        </p>
      </div>
    </div>
  );
}

/**
 * κ₂(A) als Nähe zum Rangdefekt: zwei Einheitsspalten im Winkel α.
 * Für α → 0 werden die Spalten linear abhängig, das Bild des Einheitskreises
 * kollabiert zu einer Nadel, und κ₂(A) → ∞.
 */
export function FastRangdefektWidget() {
  const [alphaDeg, setAlphaDeg] = useState(40);
  const a = (alphaDeg * Math.PI) / 180;
  const m: [[number, number], [number, number]] = [
    [1, Math.cos(a)],
    [0, Math.sin(a)],
  ];
  const s1 = sigmaMax(m);
  const s2 = Math.sin(a) / s1; // σ₁σ₂ = |det| = sin α
  return (
    <div className="flex flex-wrap items-start gap-5">
      <LabeledTransformCanvas
        matrix={m}
        vectors={[
          { v: [1, 0], color: COL.b, label: "a₁" },
          { v: [Math.cos(a), Math.sin(a)], color: COL.y, label: "a₂" },
        ]}
        showGrid={false}
        showUnitCircle
        size={270}
        worldHalf={1.6}
      />
      <div className="min-w-[16rem] grow basis-64 text-sm">
        <Slider label="Spaltenwinkel α (°)" value={alphaDeg} onChange={setAlphaDeg} min={3} max={90} step={1} fmt={(v) => v.toFixed(0) + "°"} />
        <div className="mt-3 rounded bg-slate-100 p-2 dark:bg-slate-800">
          <Readout label="σ₁ = ‖A‖₂ (längste Ellipsenachse)" value={fmt(s1)} />
          <Readout label="σ₂ = 1/‖A⁺‖₂ (kürzeste Achse)" value={fmt(s2)} />
          <Readout label="κ₂(A) = σ₁/σ₂" value={fmt(s1 / s2)} />
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Die Matrix <M>{"\\bA = (\\ba_1 \\;\\, \\ba_2)"}</M> hat zwei
          Einheitsspalten im Winkel α zueinander; die Kurve zeigt das Bild des
          Einheitskreises unter <M>{"\\bx \\mapsto \\bA\\bx"}</M>. Verkleinern
          wir α, werden die Spalten fast{" "}
          <ConceptLink id="linear-independence">linear abhängig</ConceptLink>:
          Die Ellipse plättet sich zu einem Strich (σ₂ → 0) und κ₂(A) explodiert.
          Bei α = 0 ist die Matrix exakt rangdefekt — nach Definition 7.2.1 dann
          κ(A) = ∞.
        </p>
      </div>
    </div>
  );
}

/**
 * Konditions-Quadrierung als Experiment: A = [[1,1],[ε,−ε],[0,0]],
 * E = [[0,0],[0,0],[−ε,ε]], b = (1, 0, b₃)ᵀ. Alle Größen kommen aus
 * geschlossenen Formeln, die in Gleitkommaarithmetik stabil bleiben
 * (naives Aufstellen von AᵀA würde 1+ε² für ε = 10⁻⁸ zu 1 runden und das
 * System exakt singulär machen).
 */
export function KonditionsQuadrierungLab() {
  const [logEps, setLogEps] = useState(-4);
  const [b3, setB3] = useState(0.5);
  const eps = Math.pow(10, logEps);

  // KQ-Lösung mit A:   x₁+x₂ = b₁ = 1,  x₁−x₂ = b₂/ε = 0
  const xs: [number, number] = [0.5, 0.5];
  // KQ-Lösung mit A+E: x₁+x₂ = 1,       x₁−x₂ = −b₃/(2ε)
  const d = -b3 / (2 * eps);
  const xh: [number, number] = [(1 + d) / 2, (1 - d) / 2];

  const dxNorm = Math.hypot(xh[0] - xs[0], xh[1] - xs[1]);
  const xNorm = Math.hypot(xs[0], xs[1]);
  const observed = dxNorm / xNorm;

  const cond = 1 / eps;
  const tanTheta = b3; // r = (0, 0, b₃)ᵀ, ŷ = Ax̂ = (1, 0, 0)ᵀ
  const bound = (cond * cond * tanTheta + cond) * eps; // = b₃/ε + 1
  const squaredTermDominates = b3 / eps > 1;

  return (
    <div className="text-sm">
      <div className="flex flex-wrap items-start gap-5">
        <div className="min-w-[16rem] grow basis-64">
          <Slider label="log₁₀ ε" value={logEps} onChange={setLogEps} min={-8} max={-1} step={0.5} fmt={(v) => v.toFixed(1)} />
          <Slider label="b₃ (dritte Komponente von b)" value={b3} onChange={setB3} min={0} max={1} step={0.001} fmt={(v) => v.toFixed(3)} />
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setB3(eps)}
            >
              guter Fit: b₃ = ε
            </button>
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setB3(1)}
            >
              schlechter Fit: b₃ = 1
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Die dritte Zeile von <M>{"\\bA"}</M> ist null, also landet{" "}
            <M>{"b_3"}</M> vollständig im Residuum:{" "}
            <M>{"\\cpurp{\\br} = (0, 0, b_3)^\\top"}</M> und{" "}
            <M>{"\\tan(\\theta) = b_3"}</M>. Für ε in der Nähe von{" "}
            <M>{"\\sqrt{\\eps_{\\text{mach}}}"}</M> (
            <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>)
            ist eine relative Störung der Größe ε ohnehin durch unvermeidbare{" "}
            <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink>{" "}
            gegeben — dieses Szenario ist also keineswegs exotisch.
          </p>
        </div>
        <div className="min-w-[18rem] grow basis-72 rounded bg-slate-100 p-2 dark:bg-slate-800">
          <Readout label="κ₂(A) = 1/ε" value={fmt(cond)} color={COL.kappa} />
          <Readout label="κ₂(A)²" value={fmt(cond * cond)} color={COL.kappa} />
          <Readout label="rel. Störung ‖E‖₂/‖A‖₂ = ε" value={fmt(eps)} color={COL.pert} />
          <Readout label="tan θ = b₃" value={fmt(tanTheta)} color={COL.r} />
          <Readout label="Schranke (κ₂² tan θ + κ₂)·ε" value={fmt(bound)} />
          <Readout label="beobachtet ‖Δx̂‖₂/‖x̂‖₂" value={fmt(observed)} />
          <div className="mt-1 pt-1 font-mono text-xs">
            x̂&nbsp;&nbsp;= ({fmt(xs[0])}, {fmt(xs[1])})<br />
            x̂′&nbsp;= ({fmt(xh[0])}, {fmt(xh[1])})
          </div>
        </div>
      </div>
      <p className="mt-3">
        {squaredTermDominates ? (
          <>
            <strong>Regime der quadrierten Kondition:</strong> Der Term{" "}
            <M>{"\\kappa_2(\\bA)^2 \\tan(\\theta) \\cdot \\eps = b_3/\\eps"}</M>{" "}
            dominiert die Schranke — das Residuum ist groß genug, dass der
            Fehler in <M>{"\\wh{\\bx}"}</M> ungefähr mit dem{" "}
            <em>Quadrat</em> der Konditionszahl verstärkt wird.
          </>
        ) : (
          <>
            <strong>Gutmütiges Regime:</strong> Das Residuum ist so klein, dass{" "}
            <M>{"\\kappa_2(\\bA)^2 \\tan(\\theta) \\cdot \\eps = b_3/\\eps \\le 1"}</M>{" "}
            unter dem Term erster Ordnung{" "}
            <M>{"\\kappa_2(\\bA) \\cdot \\eps = 1"}</M> bleibt: Der
            Quadrierungseffekt ist unterdrückt, und der Fehler verhält sich wie
            κ₂(A) mal Störung.
          </>
        )}
      </p>
      <MD>{"\\frac{\\|\\Delta\\wh{\\bx}\\|_2}{\\|\\wh{\\bx}\\|_2} = \\frac{b_3}{2\\eps} \\qquad \\text{(exakt für diese Problemfamilie)}"}</MD>
    </div>
  );
}
