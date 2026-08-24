/**
 * Konzept-Widget `partial-derivative` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: Eine partielle Ableitung ist eine ganz gewöhnliche
 * Ableitung — nur eben die der Schnittkurve, die entsteht, wenn wir die andere
 * Variable einfrieren. Verschieben wir den Schnitt, ändert sich die Kurve und
 * mit ihr die Steigung.
 *
 * FARBROLLEN: blau = Schnittkurve x ↦ f(x, y₀); orange = die Tangente bei x₀,
 * ihre Steigung ist ∂f/∂x; violett = die Schnittgerade y = y₀ im
 * Höhenlinienbild und die Schnittebene in der 3D-Tafel; oranger Punkt = der
 * Auswertungspunkt in allen drei Tafeln (verlinkte Darstellungen, D7).
 *
 * PROVENIENZ: Schnittkurve und Tangente aus der Vorfassung; neu sind das
 * Höhenlinienbild mit der Schnittgeraden und die 3D-Tafel mit derselben
 * Schnittebene (`Surface3D`, Bauart wie S113Hesse in Kapitel 11). Der
 * erklärende Schlussabsatz steht jetzt in partial-derivative.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L2/verify-qa-l2.mjs,
 * 2026-08-20): für f(x,y) = x² + xy ist ∂f/∂x = 2x + y und ∂f/∂y = x, gegen
 * zentrale Differenzen gegengerechnet: (x₀,y₀) = (0,8; 1) → 2,600000;
 * (−1; 1) → −1,000000; (0,8; −2) → −0,400000; (0; 0) → 0. Der Funktionswert
 * im Startzustand ist f(0,8; 1) = 1,440000.
 */
import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Plot,
  Slider,
  Surface3D,
  Verdikt,
  ViewControls,
  W_MUTED,
  fmtDe,
  fmtTick,
} from "../../lib";
import type { Ebene3D, Kurve3D, Punkt3D, Sicht3D, Vec3 } from "../../lib";

const HALB = 2.5;
const NIVEAUS = [-4, -2, -1, 0, 1, 2, 4, 8];
const f = (x: number, y: number) => x * x + x * y;

const BK = 300;
const HK = 220;
const PAD_L = 30;
const PAD_R = 8;
const PAD_T = 8;
const PAD_B = 26;

/** Höhenlinien von f(x,y) = x² + xy plus die Schnittgerade y = y₀. */
function Hoehenlinien({ y0, x0 }: { y0: number; x0: number }) {
  const px = (x: number) => PAD_L + ((x + HALB) / (2 * HALB)) * (BK - PAD_L - PAD_R);
  const py = (y: number) => PAD_T + (1 - (y + HALB) / (2 * HALB)) * (HK - PAD_T - PAD_B);
  const pfade: { L: number; d: string }[] = [];
  for (const L of NIVEAUS) {
    let lauf: [number, number][] = [];
    for (let i = 0; i <= 400; i++) {
      const x = -HALB + (2 * HALB * i) / 400;
      const y = Math.abs(x) < 1e-6 ? NaN : (L - x * x) / x;
      if (Number.isFinite(y) && Math.abs(y) <= HALB) lauf.push([x, y]);
      else {
        if (lauf.length > 1) pfade.push({ L, d: lauf.map(([u, v]) => `${px(u).toFixed(1)},${py(v).toFixed(1)}`).join(" ") });
        lauf = [];
      }
    }
    if (lauf.length > 1) pfade.push({ L, d: lauf.map(([u, v]) => `${px(u).toFixed(1)},${py(v).toFixed(1)}`).join(" ") });
  }
  return (
    <svg
      viewBox={`0 0 ${BK} ${HK}`}
      width={BK}
      height={HK}
      className="h-auto max-w-full rounded"
      role="img"
      aria-label={`Höhenlinien von f mit der Schnittgeraden y = ${fmtDe(y0, 1)}.`}
    >
      <rect x={0.5} y={0.5} width={BK - 1} height={HK - 1} rx={4} fill="var(--w-bg)" stroke="var(--w-border)" />
      {[-2, -1, 0, 1, 2].map((t) => (
        <g key={t}>
          <line x1={px(t)} x2={px(t)} y1={PAD_T} y2={HK - PAD_B} stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"} strokeWidth={t === 0 ? 1.2 : 0.6} />
          <line x1={PAD_L} x2={BK - PAD_R} y1={py(t)} y2={py(t)} stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"} strokeWidth={t === 0 ? 1.2 : 0.6} />
          <text x={px(t)} y={HK - PAD_B + 12} textAnchor="middle" fontSize={9} fill="var(--w-muted)">{fmtTick(t, 1)}</text>
          <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">{fmtTick(t, 1)}</text>
        </g>
      ))}
      {pfade.map((p, i) => (
        <polyline key={i} points={p.d} fill="none" stroke={FMM_COLORS.grau} strokeWidth={1} />
      ))}
      <line x1={px(-HALB)} x2={px(HALB)} y1={py(y0)} y2={py(y0)} stroke={FMM_COLORS.violett} strokeWidth={2} />
      <circle cx={px(x0)} cy={py(y0)} r={4} fill={FMM_COLORS.orange} />
      <text x={BK - PAD_R - 4} y={PAD_T + 12} textAnchor="end" fontSize={9} fill="var(--w-muted)">y ↑ , x →</text>
    </svg>
  );
}

export function PartialDerivativeWidget() {
  const [y0, setY0] = useState(1);
  const [x0, setX0] = useState(0.8);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 26 });

  const g = (x: number) => f(x, y0);
  const steigung = 2 * x0 + y0;
  const steigt = steigung > 0.05;
  const faellt = steigung < -0.05;

  // Fläche in Grau, damit die blaue Schnittkurve darauf sichtbar bleibt.
  const flaeche = useMemo(() => ({ f, nx: 26, ny: 26, color: FMM_COLORS.grau, opacity: 0.75, wire: true }), []);
  const schnittkurve = useMemo<Kurve3D[]>(
    () => [
      {
        pts: Array.from({ length: 61 }, (_, i) => {
          const x = -HALB + (2 * HALB * i) / 60;
          return [x, y0, f(x, y0)] as Vec3;
        }),
        color: FMM_COLORS.blau,
        width: 2.4,
        onTop: true,
      },
    ],
    [y0],
  );
  const ebene = useMemo<Ebene3D[]>(
    () => [{ p0: [0, y0, 5.5] as Vec3, u: [1, 0, 0] as Vec3, v: [0, 0, 1] as Vec3, su: HALB, sv: 7.5, color: FMM_COLORS.violett, opacity: 0.16 }],
    [y0],
  );
  const punkte3d = useMemo<Punkt3D[]>(
    () => [{ p: [x0, y0, f(x0, y0)] as Vec3, color: FMM_COLORS.orange, r: 4, onTop: true }],
    [x0, y0],
  );

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verschieben wir das festgehaltene y und beobachten, wie sich Schnittkurve und Tangentensteigung ändern.</Aufgabe>
      <Plot
        xLabel="x"
        yLabel="f(x, y₀)"
        xDomain={[-2.5, 2.5]}
        yDomain={[-3, 8]}
        width={320}
        height={210}
        readout
        ariaLabel={`Schnittkurve bei y = ${fmtDe(y0, 1)} mit Tangente der Steigung ${fmtDe(steigung, 2)} bei x = ${fmtDe(x0, 1)}.`}
        series={[
          { f: g, color: FMM_COLORS.blau, label: "f(x, y₀)" },
          { f: (x) => g(x0) + steigung * (x - x0), color: FMM_COLORS.orange, dash: [5, 4], label: "Tangente" },
        ]}
        points={[{ x: x0, y: g(x0), color: FMM_COLORS.orange, r: 4 }]}
      />
      <Slider label="y festhalten bei" value={y0} onChange={setY0} min={-2} max={2} step={0.1} accent={FMM_COLORS.violett} />
      <Slider label="x₀" value={x0} onChange={setX0} min={-2} max={2} step={0.1} accent={FMM_COLORS.orange} />
      <div className="mt-2">
        <Hoehenlinien y0={y0} x0={x0} />
        <p className={`mt-1 text-xs ${W_MUTED}`}>
          Höhenlinien von f: die <span style={{ color: FMM_COLORS.violett }}>violette</span> Gerade
          ist der Schnitt y = y₀, auf dem die obere Kurve läuft.
        </p>
      </div>
      <div className="mt-2">
        <Surface3D
          size={280}
          xDomain={[-HALB, HALB]}
          yDomain={[-HALB, HALB]}
          zDomain={[-2, 13]}
          surface={flaeche}
          curves={schnittkurve}
          planes={ebene}
          points={punkte3d}
          labels={{ x: "x", y: "y", z: "f" }}
          azimuth={sicht.azimuth}
          elevation={sicht.elevation}
          onViewChange={setSicht}
          ariaLabel={`Die Fläche von f mit der Schnittebene y = ${fmtDe(y0, 1)} und der blauen Schnittkurve darauf.`}
        />
        <div className="mt-1 max-w-[280px]">
          <ViewControls value={sicht} onChange={setSicht} />
        </div>
      </div>
      <Verdikt kind={steigt ? "ok" : faellt ? "warn" : "neutral"}>
        {steigt
          ? `Bei (x₀, y₀) = (${fmtDe(x0, 1)}; ${fmtDe(y0, 1)}) steigt die Schnittkurve mit ${fmtDe(steigung, 2)}. Das ist ∂f/∂x = 2x + y an dieser Stelle.`
          : faellt
            ? `Bei (x₀, y₀) = (${fmtDe(x0, 1)}; ${fmtDe(y0, 1)}) fällt die Schnittkurve mit ${fmtDe(steigung, 2)}. Auch dieses Vorzeichen ist die partielle Ableitung ∂f/∂x.`
            : `Hier ist die Schnittkurve waagerecht: ∂f/∂x = ${fmtDe(steigung, 2)}. Das betrifft nur die x-Richtung; ∂f/∂y bleibt davon getrennt.`}
      </Verdikt>
    </div>
  );
}
