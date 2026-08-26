/**
 * Widgets für §7.2 „Kondition des Kleinste-Quadrate-Problems".
 *
 * DIE EINE EINSICHT je Widget:
 *   FigKQGeometrie – b ragt aus col(A) heraus, ŷ ist sein Schatten in der
 *     Ebene, und das Residuum verbindet beide im rechten Winkel; die zweite
 *     Tafel zeigt dieselbe Konfiguration drehbar im Raum (D7).
 *   WinkelWidget – Die Schranke aus Satz 7.2.3 wird genau dann angenommen,
 *     wenn Δb parallel zu col(A) liegt; senkrecht dazu passiert gar nichts.
 *   FastRangdefektWidget – κ₂(A) misst die Nähe zum Rangdefekt: hier ist es
 *     exakt cot(α/2) im Winkel α zwischen den beiden Spalten.
 *   KonditionsQuadrierungLab – Der Normalengleichungsweg zahlt immer κ², das
 *     Problem selbst nur bei großem Residuum (Satz 7.2.4).
 *
 * FARBROLLEN Kapitel 7 (durchgehend):
 *   b (Daten) rot · ŷ = Ax̂ bzw. proj_col(A) b grün · Residuum r violett ·
 *   Störungen Δb, E blau · κ₂(A) orange · Δx̂ und Achsen neutral grau.
 *   Die gestörten Größen b′ und ŷ′ tragen dieselbe Rolle wie ihre
 *   ungestörten Partner, nur aufgehellt.
 *
 * PROVENIENZ: SVG-/Berechnungsgerüst aus der internen App
 * interactive/heath-ch3 (S33Sensitivity.tsx) portiert; Ziehgriffe, 3D-Tafel,
 * Verdikte und sämtliche Texte sind für dieses Skript neu geschrieben.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen:
 *   3D-Konfiguration: col(A) = span{(1,0,0,45)ᵀ, (0,1,−0,35)ᵀ},
 *   b = (0,75; 0,9; 1,35)ᵀ ⇒ x̂ = (1,200849; 0,549340),
 *   ŷ = (1,200849; 0,549340; 0,348113), r = (−0,450849; 0,350660; 1,001887);
 *   a₁ᵀr = 1,7e−16 und a₂ᵀr = 5,6e−17 (Orthogonalität), ‖b‖ = 1,787456,
 *   ‖ŷ‖ = 1,365648, ‖r‖ = 1,153258, Pythagoras-Rest 2,2e−16, θ = 40,180°.
 *   WinkelWidget: beobachtet/Schranke = |cos φ| exakt, unabhängig von θ und
 *   ‖Δb‖ (geprüft für θ ∈ {30°, 60°, 75°}, φ ∈ {0°, 45°, 90°, 180°}:
 *   100 %, 70,7 %, 0 %, 100 %).
 *   FastRangdefekt: κ₂(A) = cot(α/2) exakt (Gegenprobe über die Eigenwerte
 *   von AᵀA); α = 12° ⇒ σ₁ = 1,40647, σ₂ = 0,14783, κ₂ = 9,5144 (0,98
 *   Dezimalstellen); α = 3° ⇒ κ₂ = 38,1885 (1,58 Stellen); α = 90° ⇒ κ₂ = 1.
 *   Konditionsquadrierung: ‖Δx̂‖/‖x̂‖ = b₃/(2ε) exakt (2,500000e3 bei
 *   ε = 10⁻⁴, b₃ = 0,5), Schranke (κ²tanθ + κ)·ε = b₃/ε + 1.
 */
import { useMemo, useState } from "react";
import {
  Aufgabe,
  ConceptLink,
  DragHandle,
  FMM_COLORS,
  LabeledTransformCanvas,
  M,
  MD,
  Slider,
  Surface3D,
  Verdikt,
  ViewControls,
  clamp,
  fmtDe,
  sigmaMax,
  useDrag,
} from "../../../lib";
import type { Sicht3D, Vec3 } from "../../../lib";
import { ref } from "../../numbers.generated";

const COL = {
  b: FMM_COLORS.rot,
  bPert: FMM_COLORS.rot,
  y: FMM_COLORS.gruen,
  yPert: FMM_COLORS.gruen,
  r: FMM_COLORS.violett,
  pert: FMM_COLORS.blau,
  kappa: FMM_COLORS.orange,
  neutral: FMM_COLORS.grau,
};

/** Deutsche Dezimalzahl für MathJax-Literale. */
const mathDe = (v: number, d = 2) => fmtDe(v, d).replace(",", "{,}").replace("−", "-");

/** Polygonzug-Punkte für einen Kreisbogen in SVG-Koordinaten. */
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

/* ------------------------------------------------------------------ */
/* Die KQ-Geometrie: statische Tafel + drehbare 3D-Fassung (D7)        */
/* ------------------------------------------------------------------ */

/** col(A) = span{a₁, a₂} als leicht gekippte Ebene, dazu b, ŷ und r. */
const A1: Vec3 = [1, 0, 0.45];
const A2: Vec3 = [0, 1, -0.35];
const B3: Vec3 = [0.75, 0.9, 1.35];
const YH: Vec3 = [1.200849, 0.54934, 0.348113];
const norm3 = (v: Vec3): Vec3 => {
  const n = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / n, v[1] / n, v[2] / n];
};

export function FigKQGeometrie() {
  // Ebene (Parallelogramm in Pseudo-Perspektive), O = Fußpunkt, Y = Spitze von ŷ, B = Spitze von b
  const O: [number, number] = [140, 225];
  const Y: [number, number] = [320, 255];
  const B: [number, number] = [320, 85];

  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 62, elevation: 24 });

  const ebenen = useMemo(
    () => [
      {
        p0: [0, 0, 0] as Vec3,
        u: norm3(A1),
        v: norm3(A2),
        su: 1.3,
        sv: 1.3,
        color: COL.neutral,
        opacity: 0.26,
      },
    ],
    [],
  );
  // b und r enden beide in derselben Spitze; würden beide Pfeile dort
  // beschriftet, lägen die Labels übereinander. b bekommt deshalb seine
  // Beschriftung als Punkt auf halber Strecke.
  const pfeile = useMemo(
    () => [
      { from: [0, 0, 0] as Vec3, to: YH, color: COL.y, label: "ŷ", onTop: true },
      { from: [0, 0, 0] as Vec3, to: B3, color: COL.b, onTop: true },
      { from: YH, to: B3, color: COL.r, label: "r", onTop: true },
    ],
    [],
  );
  const punkte = useMemo(
    () => [
      { p: [0, 0, 0] as Vec3, color: COL.neutral, r: 3, onTop: true },
      { p: [0.55 * B3[0], 0.55 * B3[1], 0.55 * B3[2]] as Vec3, color: COL.b, r: 0.01, label: "b", onTop: true },
      { p: [1.1 * norm3(A2)[0], 1.1 * norm3(A2)[1], 1.1 * norm3(A2)[2]] as Vec3, color: COL.neutral, r: 0.01, label: "col(A)", onTop: true },
    ],
    [],
  );
  // Die beiden Spalten als Richtungen der Ebene, damit „col(A)" ablesbar wird.
  const kurven = useMemo(
    () => [
      { pts: [[0, 0, 0], A1] as Vec3[], color: COL.neutral, width: 1.4, dash: "4 3", onTop: true },
      { pts: [[0, 0, 0], A2] as Vec3[], color: COL.neutral, width: 1.4, dash: "4 3", onTop: true },
    ],
    [],
  );

  const flach = sicht.elevation < 12;
  const steil = sicht.elevation > 62;

  return (
    <div className="my-3">
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <svg
          viewBox="0 0 480 320"
          className="h-auto w-full max-w-full"
          width={480}
          height={320}
          role="img"
          aria-label="Der Vektor b ragt aus der Ebene col(A) heraus; seine Orthogonalprojektion ŷ = Ax̂ liegt in der Ebene, das Residuum r verbindet beide im rechten Winkel, und θ ist der Winkel zwischen b und ŷ."
        >
          {/* der Spaltenraum col(A), als schräg liegendes Parallelogramm */}
          <polygon
            points="18,248 342,302 442,232 118,178"
            fill={FMM_COLORS.blau}
            fillOpacity={0.1}
            stroke="var(--w-axis)"
            strokeWidth={1}
          />
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
          <polyline points={arcPts(O[0], O[1], 34, -0.165, 0.661)} fill="none" stroke="var(--w-text)" strokeWidth={1.4} />
          <text x={184} y={216} fill="var(--w-text)" fontSize={13} fontStyle="italic">
            θ
          </text>
        </svg>
        <div>
          <Surface3D
            size={300}
            xDomain={[-1.2, 1.2]}
            yDomain={[-1.2, 1.2]}
            zDomain={[-0.7, 1.42]}
            planes={ebenen}
            arrows={pfeile}
            points={punkte}
            curves={kurven}
            labels={{ x: "e₁", y: "e₂" }}
            ticks={false}
            azimuth={sicht.azimuth}
            elevation={sicht.elevation}
            onViewChange={setSicht}
            ariaLabel="Dieselbe Konfiguration im Raum: die graue Ebene col(A), der rote Vektor b darüber, seine grüne Projektion in der Ebene und das violette Residuum dazwischen."
          />
          <div className="mt-1 max-w-[300px]">
            <ViewControls value={sicht} onChange={setSicht} />
          </div>
        </div>
      </div>
      <Aufgabe>
        Drehen wir die rechte Tafel, bis wir die graue Ebene von der Kante her sehen – die linke
        Abbildung ist genau eine solche Ansicht.
      </Aufgabe>
      {flach ? (
        <Verdikt kind="ok" titel="Blick von der Kante:">
          Aus dieser Richtung schauen wir fast in der Ebene <M>{"\\col(\\bA)"}</M> und sehen genau
          das Bild links: <M>{"\\cgreen{\\wh{\\by}}"}</M> liegt flach, <M>{"\\cpurp{\\br}"}</M>{" "}
          steht senkrecht darauf. Genau diese Ansicht macht {ref("satz:kq-loesung-als-projektion")} anschaulich.
        </Verdikt>
      ) : steil ? (
        <Verdikt kind="warn" titel="Blick von oben:">
          Von hier oben schrumpft das Residuum zum Punkt, obwohl es die ganze Zeit dieselbe Länge
          hat: Die Draufsicht projiziert es weg, und <M>{"\\bb"}</M> und{" "}
          <M>{"\\cgreen{\\wh{\\by}}"}</M> fallen scheinbar zusammen. Ein flacherer Blickwinkel
          zeigt wieder, was wirklich passiert.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral" titel="Schräge Ansicht:">
          Rot ist <M>{"\\bb"}</M>, grün seine Projektion{" "}
          <M>{"\\cgreen{\\wh{\\by}} = \\bA\\wh{\\bx}"}</M> in der grauen Ebene, violett das
          Residuum <M>{"\\cpurp{\\br} = \\bb - \\bA\\wh{\\bx}"}</M>. Die gestrichelten Strecken
          sind die beiden Spalten von <M>{"\\bA"}</M>, die die Ebene aufspannen.
        </Verdikt>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Readout({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 py-0.5 last:border-b-0 dark:border-slate-700">
      <span style={color ? { color } : undefined}>{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  );
}

/**
 * Interaktive Version der KQ-Geometrie im einfachsten nichttrivialen Fall:
 * m = 2, n = 1, A = (1, 0)ᵀ, also col(A) = horizontale Achse und
 * κ₂(A) = 1; die gesamte Empfindlichkeit stammt aus dem Winkel θ.
 */
const WW = 370;
const WH = 320;
const WS = 200;
const WX0 = -0.3;
const WY1 = 1.25;
const wsx = (wx: number) => (wx - WX0) * WS;
const wsy = (wy: number) => (WY1 - wy) * WS;

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
  const anteil = bound > 1e-12 ? observed / bound : 0; // = |cos φ|, exakt

  /** Die Spitze von Δb ist ziehbar; Länge und Richtung folgen daraus. */
  const zieh = useDrag<"db">({
    feld: { x0: 0, y0: 0, w: WW, h: WH },
    welt: { x0: WX0, x1: WX0 + WW / WS, y0: WY1 - WH / WS, y1: WY1 },
    onDrag: ([px, py]) => {
      const dxv = px - b[0];
      const dyv = py - b[1];
      const len = Math.hypot(dxv, dyv);
      setDelta(clamp(len, 0, 0.25));
      if (len > 1e-4) {
        const g = (Math.atan2(dyv, dxv) * 180) / Math.PI;
        setPhiDeg(Math.round((g + 360) % 360));
      }
    },
  });

  return (
    <div>
      <Aufgabe>
        Ziehen wir die Spitze von <M>{"\\cblue{\\Delta\\bb}"}</M> einmal rund um{" "}
        <M>{"\\bb"}</M> herum (oder drehen den Regler φ) und beobachten die Klammer{" "}
        <M>{"\\Delta\\wh{x}"}</M> unter der Achse.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-5">
        <svg
          viewBox={`0 0 ${WW} ${WH}`}
          width={WW}
          height={WH}
          className="h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
          role="img"
          aria-label={`Der Datenvektor b im Winkel ${fmtDe(thetaDeg, 0)} Grad über col(A) und seine Störung in Richtung ${fmtDe(phiDeg, 0)} Grad; die beobachtete relative Änderung der Lösung schöpft ${fmtDe(100 * anteil, 0)} Prozent der Schranke aus.`}
          {...zieh.svgProps}
        >
          {/* blasse vertikale Achse */}
          <line x1={wsx(0)} y1={wsy(WY1)} x2={wsx(0)} y2={wsy(-0.35)} stroke="var(--w-grid)" />
          {/* col(A) = horizontale Achse */}
          <line x1={wsx(WX0)} y1={wsy(0)} x2={wsx(1.55)} y2={wsy(0)} stroke={COL.neutral} strokeWidth={2.5} />
          <text x={wsx(1.53)} y={wsy(0) - 8} textAnchor="end" fill={COL.neutral} fontSize={12} fontStyle="italic">
            col(A)
          </text>
          {/* θ-Bogen */}
          <polyline points={arcPts(wsx(0), wsy(0), 44, 0, th)} fill="none" stroke="var(--w-text)" strokeWidth={1.4} />
          <text
            x={wsx(0) + 58 * Math.cos(th / 2) - 4}
            y={wsy(0) - 58 * Math.sin(th / 2) + 4}
            fill="var(--w-text)"
            fontSize={13}
            fontStyle="italic"
          >
            θ
          </text>
          {/* Residuum */}
          <Arrow x1={wsx(b[0])} y1={wsy(0)} x2={wsx(b[0])} y2={wsy(b[1])} color={COL.r} dash="5 4" label="r" lx={wsx(b[0]) + 6} ly={wsy(b[1] / 2)} />
          {/* Datenvektor und seine Störung */}
          <Arrow x1={wsx(0)} y1={wsy(0)} x2={wsx(b[0])} y2={wsy(b[1])} color={COL.b} label="b" lx={wsx(b[0] / 2) - 16} ly={wsy(b[1] / 2) - 6} />
          <Arrow x1={wsx(0)} y1={wsy(0)} x2={wsx(bp[0])} y2={wsy(bp[1])} color={COL.bPert} dash="4 3" label="b′" lx={wsx(bp[0]) + 6} ly={wsy(bp[1]) - 6} />
          <Arrow
            x1={wsx(b[0])}
            y1={wsy(b[1])}
            x2={wsx(bp[0])}
            y2={wsy(bp[1])}
            color={COL.pert}
            width={1.8}
            label="Δb"
            lx={wsx((b[0] + bp[0]) / 2) + 7}
            ly={wsy((b[1] + bp[1]) / 2)}
          />
          {/* Projektionen */}
          <Arrow x1={wsx(0)} y1={wsy(0)} x2={wsx(b[0])} y2={wsy(0)} color={COL.y} label="ŷ" lx={wsx(b[0]) - 18} ly={wsy(0) + 16} />
          <Arrow x1={wsx(0)} y1={wsy(-0.05)} x2={wsx(bp[0])} y2={wsy(-0.05)} color={COL.yPert} dash="4 3" width={1.8} label="ŷ′" lx={wsx(bp[0]) + 6} ly={wsy(-0.05) + 4} />
          {/* Δx̂-Klammer */}
          {Math.abs(dx) > 1e-4 && (
            <g>
              <line x1={wsx(b[0])} y1={wsy(-0.11)} x2={wsx(bp[0])} y2={wsy(-0.11)} stroke={COL.neutral} strokeWidth={3.5} />
              <text
                x={wsx((b[0] + bp[0]) / 2) - 10}
                y={wsy(-0.11) + 16}
                fill={COL.neutral}
                fontSize={12}
                fontStyle="italic"
                fontWeight={600}
              >
                Δx̂
              </text>
            </g>
          )}
          <DragHandle
            x={wsx(bp[0])}
            y={wsy(bp[1])}
            r={5}
            farbe={COL.pert}
            aktiv={zieh.dragging === "db"}
            {...zieh.handleProps("db")}
          />
        </svg>
        <div className="min-w-[16rem] grow basis-64 text-sm">
          <Slider label="Winkel θ (°)" value={thetaDeg} onChange={setThetaDeg} min={5} max={75} step={1} fmt={(v) => fmtDe(v, 0) + "°"} />
          <Slider label="‖Δb‖₂" value={delta} onChange={setDelta} min={0} max={0.25} step={0.005} accent={COL.pert} fmt={(v) => fmtDe(v, 3)} />
          <Slider
            label="Richtung φ von Δb (°)"
            value={phiDeg}
            onChange={setPhiDeg}
            min={0}
            max={360}
            step={1}
            accent={COL.pert}
            fmt={(v) => fmtDe(v, 0) + "°"}
          />
          <div className="mt-3 rounded bg-slate-100 p-2 dark:bg-slate-800">
            <Readout label="cos θ (= ‖ŷ‖₂/‖b‖₂)" value={fmtDe(Math.cos(th), 4)} color={COL.y} />
            <Readout label="‖r‖₂ = sin θ" value={fmtDe(Math.sin(th), 4)} color={COL.r} />
            <Readout label="Lösung x̂ = cos θ" value={fmtDe(x, 4)} />
            <Readout label="Δx̂" value={fmtDe(dx, 4)} />
            <Readout label="beobachtet: |Δx̂| / |x̂|" value={fmtDe(observed, 4)} />
            <Readout label="Schranke: (1/cos θ)·‖Δb‖₂/‖b‖₂" value={fmtDe(bound, 4)} color={COL.kappa} />
          </div>
        </div>
      </div>
      {delta < 1e-6 ? (
        <Verdikt kind="neutral" className="mt-2" titel="Keine Störung:">
          Mit <M>{"\\left\\|\\cblue{\\Delta\\bb}\\right\\|_2 = 0"}</M> passiert nichts. Ziehen wir
          die blaue Spitze los, oder schieben wir den mittleren Regler auf.
        </Verdikt>
      ) : anteil > 0.98 ? (
        <Verdikt kind="warn" className="mt-2" titel="Die Schranke ist scharf:">
          <M>{"\\cblue{\\Delta\\bb}"}</M> zeigt (bis aufs Vorzeichen) längs{" "}
          <M>{"\\col(\\bA)"}</M>, und die beobachtete relative Änderung{" "}
          <span className="font-mono">{fmtDe(observed, 4)}</span> erreicht die Schranke aus {ref("satz:satz-7-2-3")} praktisch: <span className="font-mono">{fmtDe(bound, 4)}</span>. Wegen{" "}
          <M>{"\\corange{\\kappa_2(\\bA)} = 1"}</M> steckt der ganze Verstärkungsfaktor im Winkel,{" "}
          <M>{`1/\\cos(\\theta) = ${mathDe(1 / Math.cos(th), 2)}`}</M>.
        </Verdikt>
      ) : anteil < 0.02 ? (
        <Verdikt kind="ok" className="mt-2" titel="Die Störung läuft ins Leere:">
          <M>{"\\cblue{\\Delta\\bb}"}</M> steht senkrecht auf <M>{"\\col(\\bA)"}</M> und ändert
          nur das Residuum, nicht die Lösung: <M>{"\\Delta\\wh{x}"}</M> ={" "}
          <span className="font-mono">{fmtDe(dx, 4)}</span>. Die Schranke aus {ref("satz:satz-7-2-3")} erlaubt
          hier <span className="font-mono">{fmtDe(bound, 4)}</span>, ausgeschöpft wird davon
          nichts – obere Schranken sind eben Schranken.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral" className="mt-2" titel="Dazwischen:">
          Beobachtet <span className="font-mono">{fmtDe(observed, 4)}</span> gegen die Schranke{" "}
          <span className="font-mono">{fmtDe(bound, 4)}</span>, also{" "}
          <span className="font-mono">{fmtDe(100 * anteil, 0)} %</span>. Nur der Anteil von{" "}
          <M>{"\\cblue{\\Delta\\bb}"}</M> längs <M>{"\\col(\\bA)"}</M> zählt, und der ist gerade{" "}
          <M>{`\\left|\\cos(\\varphi)\\right| = ${mathDe(anteil, 2)}`}</M> der ganzen Störung.
        </Verdikt>
      )}
    </div>
  );
}

/**
 * κ₂(A) als Nähe zum Rangdefekt: zwei Einheitsspalten im Winkel α.
 * Für α → 0 werden die Spalten linear abhängig, das Bild des Einheitskreises
 * kollabiert zu einer Nadel, und κ₂(A) → ∞.
 */
export function FastRangdefektWidget() {
  const [alphaDeg, setAlphaDeg] = useState(12);
  const a = (alphaDeg * Math.PI) / 180;
  const m: [[number, number], [number, number]] = [
    [1, Math.cos(a)],
    [0, Math.sin(a)],
  ];
  const s1 = sigmaMax(m);
  const s2 = Math.sin(a) / s1; // σ₁σ₂ = |det| = sin α
  const kappa = s1 / s2;
  const stellen = Math.log10(kappa);
  return (
    <div>
      <Aufgabe>
        Schieben wir den Winkel α zwischen den beiden Spalten nach unten und sehen zu, wie das
        Bild des Einheitskreises zur Nadel wird.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-5">
        <LabeledTransformCanvas
          matrix={m}
          vectors={[
            { v: [1, 0], color: COL.b, label: "a₁" },
            { v: [Math.cos(a), Math.sin(a)], color: COL.y, label: "a₂" },
          ]}
          showGrid={false}
          showUnitCircle
          size={250}
          worldHalf={1.6}
          transitionMs={200}
          ariaLabel={`Zwei Einheitsspalten im Winkel ${fmtDe(alphaDeg, 0)} Grad und das dazu gehörende Bild des Einheitskreises, eine Ellipse mit Achsenverhältnis ${fmtDe(kappa, 1)}.`}
        />
        <div className="min-w-[16rem] grow basis-64 text-sm">
          <Slider
            label="Spaltenwinkel α (°)"
            value={alphaDeg}
            onChange={setAlphaDeg}
            min={3}
            max={90}
            step={1}
            fmt={(v) => fmtDe(v, 0) + "°"}
          />
          <div className="mt-3 rounded bg-slate-100 p-2 dark:bg-slate-800">
            <Readout label="σ₁ = ‖A‖₂ (längste Ellipsenachse)" value={fmtDe(s1, 4)} />
            <Readout label="σ₂ = 1/‖A⁺‖₂ (kürzeste Achse)" value={fmtDe(s2, 4)} />
            <Readout label="κ₂(A) = σ₁/σ₂" value={fmtDe(kappa, 3)} color={COL.kappa} />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <M>{"\\bA = (\\ba_1 \\;\\, \\ba_2)"}</M> hat zwei Einheitsspalten im Winkel α; die
            Kurve ist das Bild des Einheitskreises unter{" "}
            <M>{"\\bx \\mapsto \\bA\\bx"}</M>.
          </p>
        </div>
      </div>
      {alphaDeg <= 6 ? (
        <Verdikt kind="fail" className="mt-2" titel="Fast rangdefekt:">
          <M>{"\\corange{\\kappa_2(\\bA)}"}</M> = <span className="font-mono">{fmtDe(kappa, 2)}</span>{" "}
          (für diese Familie exakt <M>{"\\cot(\\alpha/2)"}</M>), das kostet rund{" "}
          <span className="font-mono">{fmtDe(stellen, 1)}</span> Dezimalstellen. Die Spalten sind
          fast <ConceptLink id="linear-independence">linear abhängig</ConceptLink>, die Ellipse
          eine Nadel. Bei α = 0 ist <M>{"\\bA"}</M> exakt rangdefekt, und {ref("definition:definition-7-2-1")} setzt{" "}
          <M>{"\\kappa(\\bA) = \\infty"}</M>.
        </Verdikt>
      ) : alphaDeg >= 85 ? (
        <Verdikt kind="ok" className="mt-2" titel="Bestmöglich konditioniert:">
          Bei senkrechten Spalten ist <M>{"\\corange{\\kappa_2(\\bA)}"}</M> ={" "}
          <span className="font-mono">{fmtDe(kappa, 3)}</span>, das Bild des Einheitskreises also
          wieder (fast) ein Kreis. Kleiner als 1 kann eine Konditionszahl nicht werden.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral" className="mt-2">
          <M>{"\\corange{\\kappa_2(\\bA)}"}</M> = <span className="font-mono">{fmtDe(kappa, 2)}</span>{" "}
          = <M>{"\\sigma_1/\\sigma_2"}</M>: Im ungünstigsten Fall verlieren wir dadurch{" "}
          <span className="font-mono">{fmtDe(stellen, 1)}</span> Dezimalstellen. Halbieren wir α,
          verdoppelt sich κ₂ ungefähr – der Weg in den Rangdefekt ist steil.
        </Verdikt>
      )}
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
  const quadriert = b3 / eps > 1;
  const exp = (v: number) => (v === 0 ? "0" : v.toExponential(2).replace(".", ",").replace("-", "−"));

  return (
    <div className="text-sm">
      <Aufgabe>
        Stellen wir ε ein und schalten mit den beiden Knöpfen zwischen kleinem und großem Residuum
        um; die beiden unteren Zeilen der Tafel sind der Vergleich.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-5">
        <div className="min-w-[16rem] grow basis-64">
          <Slider label="log₁₀ ε" value={logEps} onChange={setLogEps} min={-8} max={-1} step={0.5} fmt={(v) => fmtDe(v, 1)} />
          <Slider label="b₃ (dritte Komponente von b)" value={b3} onChange={setB3} min={0} max={1} step={0.001} fmt={(v) => fmtDe(v, 3)} />
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={!quadriert}
              className="rounded border border-slate-400 px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setB3(eps)}
            >
              kleines Residuum: b₃ = ε
            </button>
            <button
              type="button"
              aria-pressed={quadriert}
              className="rounded border border-slate-400 px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setB3(1)}
            >
              großes Residuum: b₃ = 1
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Die dritte Zeile von <M>{"\\bA"}</M> ist null, also landet <M>{"b_3"}</M> vollständig
            im Residuum: <M>{"\\cpurp{\\br} = (0, 0, b_3)^\\top"}</M> und{" "}
            <M>{"\\tan(\\theta) = b_3"}</M>. Für ε nahe{" "}
            <M>{"\\sqrt{\\eps_{\\text{mach}}}"}</M> (
            <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>) ist eine relative
            Störung dieser Größe ohnehin durch unvermeidbare{" "}
            <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> gegeben.
          </p>
        </div>
        <div className="min-w-[18rem] grow basis-72 rounded bg-slate-100 p-2 dark:bg-slate-800">
          <Readout label="κ₂(A) = 1/ε" value={exp(cond)} color={COL.kappa} />
          <Readout label="κ₂(A)²" value={exp(cond * cond)} color={COL.kappa} />
          <Readout label="rel. Störung ‖E‖₂/‖A‖₂ = ε" value={exp(eps)} color={COL.pert} />
          <Readout label="tan θ = b₃" value={exp(tanTheta)} color={COL.r} />
          <Readout label="Schranke (κ₂² tan θ + κ₂)·ε" value={exp(bound)} />
          <Readout label="beobachtet ‖Δx̂‖₂/‖x̂‖₂" value={exp(observed)} />
          <div className="mt-1 pt-1 font-mono text-xs">
            x̂&nbsp;&nbsp;= ({fmtDe(xs[0], 3)}; {fmtDe(xs[1], 3)})<br />
            x̂′&nbsp;= ({exp(xh[0])}; {exp(xh[1])})
          </div>
        </div>
      </div>
      {quadriert ? (
        <Verdikt kind="warn" className="mt-3" titel="Regime der quadrierten Kondition:">
          Mit <M>{`b_3 = ${mathDe(b3, 3)}`}</M> ist{" "}
          <M>{"\\corange{\\kappa_2(\\bA)}^2 \\tan(\\theta)\\,\\eps = b_3/\\eps"}</M> ={" "}
          <span className="font-mono">{exp(b3 / eps)}</span> und dominiert die Schranke aus {ref("satz:stoerung-der-designmatrix-erste-ordnung")}. Beobachtet wird <span className="font-mono">{exp(observed)}</span>, also{" "}
          <M>{"b_3/(2\\eps)"}</M>: Der Fehler in <M>{"\\wh{\\bx}"}</M> wächst mit dem{" "}
          <em>Quadrat</em> der Konditionszahl. Das liegt am Problem, nicht am Rechenweg.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" className="mt-3" titel="Gutmütiges Regime:">
          Das Residuum ist so klein, dass{" "}
          <M>{"\\corange{\\kappa_2(\\bA)}^2 \\tan(\\theta)\\,\\eps = b_3/\\eps"}</M> ={" "}
          <span className="font-mono">{exp(b3 / eps)}</span> unter dem Term erster Ordnung{" "}
          <M>{"\\corange{\\kappa_2(\\bA)}\\,\\eps = 1"}</M> bleibt. Der Quadrierungseffekt aus
          {ref("satz:stoerung-der-designmatrix-erste-ordnung")} ist unterdrückt, das Problem reagiert nur mit{" "}
          <M>{"\\corange{\\kappa_2(\\bA)}"}</M>. Ausgerechnet dieser gutartige Fall wird uns in{" "}
          <a className="underline" href="#sec-7.3">
            {ref("sec:kq/normalengleichungen")}
          </a>{" "}
          ärgern: Der Weg über die Normalengleichungen zahlt das Quadrat trotzdem.
        </Verdikt>
      )}
      <MD>{"\\frac{\\|\\Delta\\wh{\\bx}\\|_2}{\\|\\wh{\\bx}\\|_2} = \\frac{b_3}{2\\eps} \\qquad \\text{(exakt für diese Problemfamilie)}"}</MD>
    </div>
  );
}
