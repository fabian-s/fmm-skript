/**
 * Konzept-Widget `hessian-matrix` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: Die Hesse-Matrix entscheidet über die GESTALT des
 * kritischen Punktes, und zwar richtungsweise: erst wenn sich JEDE Richtung
 * nach oben krümmt, liegt ein Minimum vor — schon eine flache Richtung
 * (a·b = 0) genügt, damit die Entscheidung kippt.
 *
 * FARBROLLEN: blau = Schnitt entlang x und die Höhenlinien positiver Niveaus;
 * violett (gestrichelt) = Schnitt entlang y; rot = Höhenlinien negativer
 * Niveaus; grau = das Nullniveau; violetter Punkt = der kritische Punkt (0,0)
 * in allen drei Tafeln (verlinkte Darstellungen, D7/Pattern 3).
 *
 * PROVENIENZ: Die beiden Achsenschnitte und der Dreiwege-Test stammen aus der
 * Vorfassung; neu sind der eigene Zweig für den entarteten Fall a·b = 0 (er
 * meldete früher fälschlich „Sattel"), das Höhenlinienbild und die verlinkte
 * 3D-Tafel (`Surface3D`, Bauart wie S107Hesse in Kapitel 10).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-19): für q(x,y) = a x² + b y² ist H = diag(2a, 2b) konstant, die
 * Eigenwerte sind 2a und 2b. Proben: (a,b) = (1; 0,6) → 2,000 / 1,200,
 * positiv definit; (−1; −0,6) → −2,000 / −1,200, negativ definit;
 * (1; −0,6) → 2,000 / −1,200, indefinit, det H = −2,400; (1; 0) → 2,000 / 0,
 * semidefinit; (0,9; 0,9) → 1,800 / 1,800.
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
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  fmtDe,
  fmtTick,
} from "../../lib";
import type { Sicht3D, Vec3 } from "../../lib";

const HALB = 2; // Fensterhalbbreite der Höhenlinientafel
const NIVEAUS = [-3, -1.5, -0.5, 0, 0.5, 1.5, 3];

const PRESETS = [
  { id: "schuessel", name: "Schüssel", a: 1, b: 0.6 },
  { id: "kuppel", name: "Kuppel", a: -1, b: -0.6 },
  { id: "sattel", name: "Sattel", a: 1, b: -0.6 },
  { id: "rinne", name: "Rinne", a: 1, b: 0 },
];

/** Höhenlinie q = L als Polygonzüge (zwei Äste y = ±√((L − a x²)/b)). */
function niveauPfade(a: number, b: number, L: number): [number, number][][] {
  const pfade: [number, number][][] = [];
  if (Math.abs(b) < 1e-9) {
    if (Math.abs(a) < 1e-9) return pfade;
    const q = L / a;
    if (q < 0) return pfade;
    const x = Math.sqrt(q);
    if (x <= HALB) {
      pfade.push([[x, -HALB], [x, HALB]]);
      if (x > 1e-9) pfade.push([[-x, -HALB], [-x, HALB]]);
    }
    return pfade;
  }
  for (const vorzeichen of [1, -1]) {
    let lauf: [number, number][] = [];
    for (let i = 0; i <= 400; i++) {
      const x = -HALB + (2 * HALB * i) / 400;
      const yq = (L - a * x * x) / b;
      if (yq >= 0) {
        const y = vorzeichen * Math.sqrt(yq);
        if (Math.abs(y) <= HALB) {
          lauf.push([x, y]);
          continue;
        }
      }
      if (lauf.length > 1) pfade.push(lauf);
      lauf = [];
    }
    if (lauf.length > 1) pfade.push(lauf);
  }
  return pfade;
}

const B2 = 300;
const H2 = 240;
const PAD_L = 30;
const PAD_R = 8;
const PAD_T = 8;
const PAD_B = 26;

/** Höhenlinienbild von q in der x-y-Ebene. */
function Hoehenlinien({ a, b }: { a: number; b: number }) {
  const px = (x: number) => PAD_L + ((x + HALB) / (2 * HALB)) * (B2 - PAD_L - PAD_R);
  const py = (y: number) => PAD_T + (1 - (y + HALB) / (2 * HALB)) * (H2 - PAD_T - PAD_B);
  const linien = NIVEAUS.flatMap((L) =>
    niveauPfade(a, b, L).map((pfad) => ({
      L,
      d: pfad.map(([x, y]) => `${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(" "),
    })),
  );
  return (
    <svg
      viewBox={`0 0 ${B2} ${H2}`}
      width={B2}
      height={H2}
      className="h-auto max-w-full rounded"
      role="img"
      aria-label="Höhenlinien der quadratischen Form um den kritischen Punkt im Ursprung."
    >
      <rect x={0.5} y={0.5} width={B2 - 1} height={H2 - 1} rx={4} fill="var(--w-bg)" stroke="var(--w-border)" />
      {[-2, -1, 0, 1, 2].map((t) => (
        <g key={t}>
          <line x1={px(t)} x2={px(t)} y1={PAD_T} y2={H2 - PAD_B} stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"} strokeWidth={t === 0 ? 1.2 : 0.6} />
          <line x1={PAD_L} x2={B2 - PAD_R} y1={py(t)} y2={py(t)} stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"} strokeWidth={t === 0 ? 1.2 : 0.6} />
          <text x={px(t)} y={H2 - PAD_B + 12} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
            {fmtTick(t, 1)}
          </text>
          <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
            {fmtTick(t, 1)}
          </text>
        </g>
      ))}
      {linien.map((linie, i) => (
        <polyline
          key={i}
          points={linie.d}
          fill="none"
          stroke={linie.L > 0 ? FMM_COLORS.blau : linie.L < 0 ? FMM_COLORS.rot : FMM_COLORS.grau}
          strokeWidth={linie.L === 0 ? 1.6 : 1.2}
          strokeDasharray={linie.L === 0 ? "4 3" : undefined}
        />
      ))}
      <circle cx={px(0)} cy={py(0)} r={4} fill={FMM_COLORS.violett} />
      <text x={B2 - PAD_R - 4} y={H2 - PAD_B - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
        x →
      </text>
      <text x={11} y={PAD_T + 8} fontSize={9} fill="var(--w-muted)">
        y
      </text>
    </svg>
  );
}

export function HessianWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.6);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 26 });

  const l1 = 2 * a;
  const l2 = 2 * b;
  const entartet = Math.abs(a) < 1e-9 || Math.abs(b) < 1e-9;
  const art = entartet
    ? "entartet"
    : l1 > 0 && l2 > 0
      ? "minimum"
      : l1 < 0 && l2 < 0
        ? "maximum"
        : "sattel";

  const f = useMemo(() => (x: number, y: number) => a * x * x + b * y * y, [a, b]);
  const flaeche = useMemo(() => ({ f, nx: 26, ny: 26, color: FMM_COLORS.blau, opacity: 0.85, wire: true }), [f]);
  const punkte3d = useMemo(
    () => [{ p: [0, 0, 0] as Vec3, color: FMM_COLORS.violett, r: 4, label: "(0,0)", onTop: true }],
    [],
  );
  // Extremwerte über dem Fenster: q ist in |x| und |y| monoton, also reichen
  // die Randpunkte (HALB, 0), (0, HALB) und die Ecke.
  const werte = [0, 4 * a, 4 * b, 4 * a + 4 * b];
  const zLo = Math.min(...werte) - 0.2;
  const zHi = Math.max(...werte) + 0.2;

  const setzePreset = (p: (typeof PRESETS)[number]) => {
    setA(p.a);
    setB(p.b);
  };

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verstellen wir die beiden Krümmungen und achten darauf, wann eine Richtung flach wird.</Aufgabe>
      <Plot
        xLabel="t"
        yLabel="Schnitt durch q"
        xDomain={[-2, 2]}
        yDomain={[-4, 4]}
        width={320}
        height={210}
        readout
        ariaLabel={`Achsenschnitte der quadratischen Form mit a = ${fmtDe(a, 1)} und b = ${fmtDe(b, 1)}.`}
        series={[
          { f: (t) => a * t * t, color: FMM_COLORS.blau, label: "q(t, 0)" },
          { f: (t) => b * t * t, color: FMM_COLORS.violett, dash: [5, 4], label: "q(0, t)" },
        ]}
      />
      <div className="my-1 flex flex-wrap gap-1">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={Math.abs(a - p.a) < 1e-9 && Math.abs(b - p.b) < 1e-9}
            className={`${Math.abs(a - p.a) < 1e-9 && Math.abs(b - p.b) < 1e-9 ? W_BUTTON_AKTIV : W_BUTTON} text-xs`}
            onClick={() => setzePreset(p)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <Slider label="a (Krümmung in x)" value={a} onChange={setA} min={-2} max={2} step={0.1} accent={FMM_COLORS.blau} />
      <Slider label="b (Krümmung in y)" value={b} onChange={setB} min={-2} max={2} step={0.1} accent={FMM_COLORS.violett} />
      <p className={`my-1 font-mono text-xs ${W_MUTED}`}>
        H = [[{fmtDe(l1, 1)}, 0], [0, {fmtDe(l2, 1)}]], Eigenwerte {fmtDe(l1, 1)} und {fmtDe(l2, 1)}
      </p>
      <div className="mt-2">
        <Hoehenlinien a={a} b={b} />
        <p className={`mt-1 text-xs ${W_MUTED}`}>
          Höhenlinien um den kritischen Punkt: <span style={{ color: FMM_COLORS.blau }}>▮</span> positive
          Niveaus · <span style={{ color: FMM_COLORS.rot }}>▮</span> negative Niveaus ·{" "}
          <span style={{ color: FMM_COLORS.grau }}>▮</span> Niveau 0.
        </p>
      </div>
      <div className="mt-2">
        <Surface3D
          size={280}
          xDomain={[-HALB, HALB]}
          yDomain={[-HALB, HALB]}
          zDomain={[zLo, zHi]}
          surface={flaeche}
          contours={NIVEAUS.filter((L) => L >= zLo && L <= zHi)}
          contourColor={FMM_COLORS.grau}
          points={punkte3d}
          labels={{ x: "x", y: "y", z: "q" }}
          azimuth={sicht.azimuth}
          elevation={sicht.elevation}
          onViewChange={setSicht}
          ariaLabel={`Dieselbe quadratische Form als Fläche über der x-y-Ebene; im aktuellen Zustand ${art === "minimum" ? "eine Schüssel" : art === "maximum" ? "eine Kuppel" : art === "sattel" ? "ein Sattel" : "eine Rinne"}.`}
        />
        <div className="mt-1">
          <ViewControls value={sicht} onChange={setSicht} />
        </div>
      </div>
      <Verdikt kind={art === "minimum" ? "ok" : art === "entartet" ? "warn" : "fail"}>
        {art === "minimum" ? (
          <>
            Beide Eigenwerte von H sind positiv ({fmtDe(l1, 1)} und {fmtDe(l2, 1)}): H ist positiv
            definit, jede Richtung krümmt sich nach oben, die Höhenlinien sind geschlossene
            Ellipsen um den Punkt. (0,0) ist ein Minimum.
          </>
        ) : art === "maximum" ? (
          <>
            Beide Eigenwerte sind negativ ({fmtDe(l1, 1)} und {fmtDe(l2, 1)}): H ist negativ
            definit, die Fläche ist eine Kuppel, und (0,0) ist ein Maximum.
          </>
        ) : art === "sattel" ? (
          <>
            Die Eigenwerte haben verschiedene Vorzeichen ({fmtDe(l1, 1)} und {fmtDe(l2, 1)}), H ist
            indefinit. Eine Richtung steigt, die andere fällt, die Höhenlinien werden zu Hyperbeln:
            ein Sattelpunkt, kein Extremum.
          </>
        ) : (
          <>
            Ein Eigenwert ist null ({fmtDe(l1, 1)} und {fmtDe(l2, 1)}), H ist nur semidefinit.
            Für dieses quadratische q heißt das: eine Rinne mit einer flachen Richtung, entlang
            der q konstant bleibt – eine ganze Gerade kritischer Punkte, kein isoliertes Extremum.
            Für beliebige Funktionen entscheidet Semidefinitheit dagegen gar nichts.
          </>
        )}
      </Verdikt>
    </div>
  );
}
