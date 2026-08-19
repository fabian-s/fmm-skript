import { useMemo, useState } from "react";
import { Aufgabe, DragHandle, FMM_COLORS, Slider, Verdikt, fmtDe, useDrag } from "../../../lib";

/**
 * Einsicht: Die erste Hauptkomponente ist die Richtung mit maximaler
 * Projektionsvarianz, also der erste Eigenvektor der Kovarianzmatrix.
 * Farbrollen Kapitel 8: aktuelle Richtung blau, Maximierer/Eigenvektor grün,
 * Projektionen grau, Rest zur Richtung rot.
 * Provenienz: Eigenbau. Die Daten sind fest eingebettet; Kovarianz, Eigenwerte
 * und Winkel sind in scratchpad/verify-08-la-misc/check-widgets.mjs am
 * 2026-08-19 verifiziert.
 */

type Vec = [number, number];
const DATA: Vec[] = [[3, 1], [-3, -1], [2, .4], [-2, -.4], [1, .7], [-1, -.7], [.4, -.4], [-.4, .4]];
const N = DATA.length;
const cov: [[number, number], [number, number]] = [[4.0457142857, 1.24], [1.24, .5171428571]];
const eigenAngle = .5 * Math.atan2(2 * cov[0][1], cov[0][0] - cov[1][1]) * 180 / Math.PI;
const lambda1 = (cov[0][0] + cov[1][1] + Math.hypot(cov[0][0] - cov[1][1], 2 * cov[0][1])) / 2;
const lambda2 = (cov[0][0] + cov[1][1] - Math.hypot(cov[0][0] - cov[1][1], 2 * cov[0][1])) / 2;
const W = 360; const H = 260; const OX = 150; const OY = 125; const SCALE = 33;
const px = (x: number) => OX + SCALE * x; const py = (y: number) => OY - SCALE * y;
const vec = (theta: number): Vec => [Math.cos(theta * Math.PI / 180), Math.sin(theta * Math.PI / 180)];
const project = (x: Vec, v: Vec): Vec => { const d = x[0] * v[0] + x[1] * v[1]; return [d * v[0], d * v[1]]; };

export function PcaDirectionDemo() {
  const [theta, setTheta] = useState(0);
  const v = vec(theta);
  const variance = useMemo(() => DATA.reduce((s, x) => s + (x[0] * v[0] + x[1] * v[1]) ** 2, 0) / (N - 1), [theta, v]);
  const dir = useDrag<"v">({
    feld: { x0: 18, y0: 12, w: 264, h: 226 }, welt: { x0: -4, x1: 4, y0: -3.4, y1: 3.4 },
    greifPosition: () => [v[0] * 3, v[1] * 3],
    clamp: ([x, y]) => { const n = Math.hypot(x, y); return n < 1e-8 ? [3, 0] : [3 * x / n, 3 * y / n]; },
    onDrag: ([x, y]) => setTheta(Math.atan2(y, x) * 180 / Math.PI),
  });
  const max = Math.abs(Math.sin((theta - eigenAngle) * Math.PI / 180)) < .035;
  return <div className="space-y-2">
    <Aufgabe>Ziehen wir die blaue Richtung auf dem Kreis und vergleichen wir die Länge der Projektionen.</Aufgabe>
    <svg viewBox={`0 0 ${W} ${H}`} className="max-w-full h-auto" role="img" aria-label={`PCA-Punktwolke mit Richtung ${fmtDe(theta, 1)} Grad und Projektionsvarianz ${fmtDe(variance, 3)}.`} {...dir.svgProps}>
      <rect x="18" y="12" width="264" height="226" fill="var(--w-bg)" stroke="var(--w-border)" rx="4" />
      <line x1="18" x2="282" y1={OY} y2={OY} stroke="var(--w-axis)" /><line x1={OX} x2={OX} y1="12" y2="238" stroke="var(--w-axis)" />
      <circle cx={OX} cy={OY} r={3 * SCALE} fill="none" stroke="var(--w-grid-strong)" strokeDasharray="4 3" />
      {DATA.map((x, i) => { const p = project(x, v); return <g key={i}><line x1={px(x[0])} y1={py(x[1])} x2={px(p[0])} y2={py(p[1])} stroke={FMM_COLORS.rot} strokeOpacity=".45" /><circle cx={px(x[0])} cy={py(x[1])} r="4" fill={FMM_COLORS.grau} /><circle cx={px(p[0])} cy={py(p[1])} r="3" fill={FMM_COLORS.blau} /></g>; })}
      <line x1={px(-3 * v[0])} y1={py(-3 * v[1])} x2={px(3 * v[0])} y2={py(3 * v[1])} stroke={FMM_COLORS.blau} strokeWidth="2.5" />
      <line x1={OX} y1={OY} x2={px(3 * v[0])} y2={py(3 * v[1])} stroke={FMM_COLORS.blau} strokeWidth="3" />
      <DragHandle x={px(3 * v[0])} y={py(3 * v[1])} farbe={FMM_COLORS.blau} aktiv={dir.dragging === "v"} {...dir.handleProps("v")} />
      <line x1={px(-3 * Math.cos(eigenAngle * Math.PI / 180))} y1={py(-3 * Math.sin(eigenAngle * Math.PI / 180))} x2={px(3 * Math.cos(eigenAngle * Math.PI / 180))} y2={py(3 * Math.sin(eigenAngle * Math.PI / 180))} stroke={FMM_COLORS.gruen} strokeDasharray="5 4" />
      <text x="300" y="38" fill="var(--w-text)" fontSize="12">Varianz</text><rect x="302" y="48" width="28" height="160" fill="var(--w-grid)" rx="3" /><rect x="302" y={208 - 160 * variance / lambda1} width="28" height={160 * variance / lambda1} fill={FMM_COLORS.blau} rx="3" /><text x="316" y="224" textAnchor="middle" fill="var(--w-text)" fontSize="11">{fmtDe(variance, 2)}</text>
    </svg>
    <Slider label="Richtung θ" value={theta} onChange={(x) => setTheta(x)} min={-180} max={180} step={1} unit="°" accent={FMM_COLORS.blau} />
    <Verdikt kind={max ? "ok" : "neutral"}>{max ? <>Bei θ = {fmtDe(theta, 1)}° liegt das Maximum mit Varianz {fmtDe(variance, 3)}: Das ist v₁ von Σ. Die grün gestrichelte Richtung gehört zu λ₁ = {fmtDe(lambda1, 3)}; λ₂ = {fmtDe(lambda2, 3)} gehört zur senkrechten Richtung, wie in Abschnitt 6.1.</> : <>Bei θ = {fmtDe(theta, 1)}° beträgt die Projektionsvarianz {fmtDe(variance, 3)}. Drehen wir zur grün gestrichelten Richtung: Dort maximiert der Rayleigh-Quotient vᵀΣv die Varianz.</>}</Verdikt>
  </div>;
}
