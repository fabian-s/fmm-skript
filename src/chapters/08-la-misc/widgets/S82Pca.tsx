import { useState } from "react";
import { Aufgabe, DragHandle, FMM_COLORS, Slider, Verdikt, fmtDe, useDrag } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * Einsicht: Die erste Hauptkomponente ist die Richtung mit maximaler
 * Projektionsvarianz, also der erste Eigenvektor der Kovarianzmatrix.
 * Farbrollen Kapitel 8: aktuelle Richtung blau, Maximierer/Eigenvektor grün,
 * Projektionen grau, Rest zur Richtung rot.
 * Provenienz: Eigenbau. Die Daten sind fest eingebettet.
 *
 * PRÜFSTATUS: scripts/verify/REV29/08-la-misc-S82.mjs (2026-08-29), Teil von
 * `npm run verify:numbers`. Das Skript rechnet die Kovarianzmatrix aus DATA neu
 * aus und vergleicht sie mit dem hier hartkodierten Literal, bestimmt λ₁, λ₂ und
 * θ* durch Abtasten der Projektionsvarianz über 3,6 Mio. Winkel (also ohne die
 * Eigenwertformel des Widgets) und belegt: λ₁ = 4,437885, λ₂ = 0,124972,
 * θ* = 17,5504°, und der 0,5°-Regler kommt mit θ = 17,5° auf 4,437882 – nahe,
 * aber nicht gleich. Der exakte Fall ist deshalb nur über den Preset-Knopf
 * erreichbar und hat einen eigenen Verdikt-Zweig.
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
const varianz = (v: Vec) => DATA.reduce((s, x) => s + (x[0] * v[0] + x[1] * v[1]) ** 2, 0) / (N - 1);

export function PcaDirectionDemo() {
  const [theta, setTheta] = useState(0);
  // Das Ziel wird erst gezeigt, wenn der Leser selbst gedreht hat – sonst ist
  // die Frage des Kastens im toten Startbild schon beantwortet.
  const [beruehrt, setBeruehrt] = useState(false);
  const dreh = (x: number) => { setTheta(x); setBeruehrt(true); };
  const v = vec(theta);
  const variance = varianz(v);
  const dir = useDrag<"v">({
    feld: { x0: 18, y0: 12, w: 264, h: 226 }, welt: { x0: -4, x1: 4, y0: -3.4, y1: 3.4 },
    greifPosition: () => [v[0] * 3, v[1] * 3],
    clamp: ([x, y]) => { const n = Math.hypot(x, y); return n < 1e-8 ? [3, 0] : [3 * x / n, 3 * y / n]; },
    onDrag: ([x, y]) => dreh(Math.atan2(y, x) * 180 / Math.PI),
  });
  // Drei Zustände am kontrollierten Parameter: exakt (nur über den Preset-Knopf,
  // denn θ* = 17,5504° liegt auf keinem 0,5°-Rastwert), fast, sonst.
  const exakt = theta === eigenAngle;
  const fast = !exakt && Math.abs(Math.sin((theta - eigenAngle) * Math.PI / 180)) < .035;
  const eg = eigenAngle * Math.PI / 180;
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
      {beruehrt && <line x1={px(-3 * Math.cos(eg))} y1={py(-3 * Math.sin(eg))} x2={px(3 * Math.cos(eg))} y2={py(3 * Math.sin(eg))} stroke={FMM_COLORS.gruen} strokeDasharray="5 4" />}
      <text x="300" y="38" fill="var(--w-text)" fontSize="12">Varianz</text>
      <rect x="302" y="48" width="28" height="160" fill="var(--w-grid)" rx="3" />
      <rect x="302" y={208 - 160 * variance / lambda1} width="28" height={160 * variance / lambda1} fill={FMM_COLORS.blau} rx="3" />
      {/* Marke für das Maximum λ₁: sonst ist am Balken nicht abzulesen, wo „voll" ist */}
      <line x1="298" x2="334" y1="48" y2="48" stroke={FMM_COLORS.gruen} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="336" y="46" fill={FMM_COLORS.gruen} fontSize="10">λ₁</text>
      <text x="316" y="224" textAnchor="middle" fill="var(--w-text)" fontSize="11">{fmtDe(variance, 2)}</text>
    </svg>
    <Slider label="Richtung θ" value={theta} onChange={dreh} min={-180} max={180} step={0.5} unit="°" accent={FMM_COLORS.blau} />
    <button
      type="button"
      aria-pressed={exakt}
      disabled={!beruehrt}
      className="rounded border border-slate-400 px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40"
      onClick={() => setTheta(eigenAngle)}
    >
      genau auf die Eigenrichtung springen
    </button>
    <Verdikt kind={exakt ? "ok" : fast ? "ok" : "neutral"}>
      {exakt
        ? <>Bei θ = {fmtDe(theta, 4)}° liegt das Maximum: Die Projektionsvarianz ist hier gleich λ₁ = {fmtDe(lambda1, 3)}, und die Richtung ist v₁ von Σ. Die senkrechte Richtung trägt den Rest, λ₂ = {fmtDe(lambda2, 3)}, wie in {ref("sec:svd/motivation")}.</>
        : fast
          ? <>Bei θ = {fmtDe(theta, 1)}° sind wir praktisch am Maximum: {fmtDe(variance, 3)} gegen λ₁ = {fmtDe(lambda1, 3)}. Der Maximierer θ* = {fmtDe(eigenAngle, 2)}° liegt auf keinem Reglerrastwert – exakt treffen wir ihn nur mit dem Knopf darunter.</>
          : <>Bei θ = {fmtDe(theta, 1)}° beträgt die Projektionsvarianz {fmtDe(variance, 3)}. {beruehrt ? "Drehen wir zur grün gestrichelten Richtung: Dort maximiert der Rayleigh-Quotient vᵀΣv die Varianz." : "Suchen wir die Richtung, in der die blauen Projektionen am weitesten auseinanderliegen – dort wird vᵀΣv am größten."}</>}
    </Verdikt>
  </div>;
}
