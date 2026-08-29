import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, mulberry32, Slider, Verdikt } from "../../../lib";
import { fmtNum, MatTable, WidgetLabel } from "./shared";
import { ref } from "../../numbers.generated";

/**
 * Cholesky-Sampler für §5.4: aus σ₁, σ₂ und ρ entsteht live die
 * Kovarianzmatrix Σ und ihr Cholesky-Faktor L. Eine FESTE Punktwolke
 * z ~ N(0, I₂) (grau) wird durch y = Lz in die korrelierte Wolke (grün)
 * verformt; die grüne Ellipse ist das Bild des grauen Kreises mit Radius 2.
 * Farbcode wie im Kapitel: grün = Ergebnis der Zerlegung bzw. ihr Bild.
 * Einsicht: L formt unabhängige Punkte zu einer Wolke mit Kovarianz Σ.
 * Farbrollen: Ergebnis/L und Bild grün, Referenzwolke neutral.
 * Provenienz: neu für dieses Skript. Zahlen: LLᵀ=Σ und L₂₂=σ₂√(1−ρ²) in
 * scripts/verify/REV29/05-lgs-Anwendungen.mjs, 2026-08-29.
 */

const GREEN = FMM_COLORS.gruen;
const GREY = FMM_COLORS.grau;

/** Residuen als Mantisse · 10^Exponent: auf drei Stellen gerundet steht dort immer 0,000. */
function fmtExp(v: number): string {
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v)));
  return `${fmtNum(v / 10 ** e)} · 10^${e}`;
}

/** 200 feste Standardnormal-Punkte (Box-Muller, fester Seed) */
const ZPTS: [number, number][] = (() => {
  const rnd = mulberry32(20260810);
  const pts: [number, number][] = [];
  for (let k = 0; k < 200; k++) {
    const u1 = Math.max(rnd(), 1e-12);
    const u2 = rnd();
    const r = Math.sqrt(-2 * Math.log(u1));
    pts.push([r * Math.cos(2 * Math.PI * u2), r * Math.sin(2 * Math.PI * u2)]);
  }
  return pts;
})();

const NCIRC = 72;
/** Kreis mit Radius 2, als Polygonzug */
const CIRC2: [number, number][] = Array.from({ length: NCIRC + 1 }, (_, k) => {
  const th = (2 * Math.PI * k) / NCIRC;
  return [2 * Math.cos(th), 2 * Math.sin(th)];
});

const fmtSlider = (v: number) => v.toFixed(2).replace(".", ",");

export function CholeskySampler() {
  const [s1, setS1] = useState(1);
  const [s2, setS2] = useState(1);
  const [rho, setRho] = useState(0.7);

  // Σ kommt aus den Reglern; L wird daraus per Koeffizientenvergleich
  // ZURÜCKGERECHNET (nicht aus σ₁, σ₂, ρ abgelesen). Nur so ist die Probe
  // max |LLᵀ − Σ| weiter unten wirklich eine Probe und kein x − x.
  const S11 = s1 * s1;
  const S12 = rho * s1 * s2;
  const S22 = s2 * s2;
  const L11 = Math.sqrt(S11);
  const L21 = S12 / L11;
  const L22 = Math.sqrt(Math.max(0, S22 - L21 * L21));

  const ys = useMemo(
    () => ZPTS.map(([z1, z2]): [number, number] => [L11 * z1, L21 * z1 + L22 * z2]),
    [L11, L21, L22]
  );
  const ell = useMemo(
    () => CIRC2.map(([c1, c2]): [number, number] => [L11 * c1, L21 * c1 + L22 * c2]),
    [L11, L21, L22]
  );

  // Weltbereich so wählen, dass ALLE gezeichneten Punkte im Canvas liegen
  const w = useMemo(() => {
    let m = 2;
    for (const [a, b] of [...ZPTS, ...ys, ...ell]) m = Math.max(m, Math.abs(a), Math.abs(b));
    return Math.max(3, Math.ceil(m + 0.2));
  }, [ys, ell]);

  const W = 340;
  const H = 340;
  const padL = 34;
  const padB = 28;
  const padT = 10;
  const padR = 10;
  const sx = (x: number) => padL + ((x + w) / (2 * w)) * (W - padL - padR);
  const sy = (y: number) => H - padB - ((y + w) / (2 * w)) * (H - padT - padB);
  const tickStep = w <= 5 ? 1 : 2;
  const ticks: number[] = [];
  for (let v = -w; v <= w; v += tickStep) ticks.push(v);

  const path = (pts: [number, number][]) =>
    pts.map(([a, b], k) => `${k === 0 ? "M" : "L"}${sx(a).toFixed(1)},${sy(b).toFixed(1)}`).join(" ");

  // Probe: L·Lᵀ soll Σ reproduzieren
  const residual = Math.max(
    Math.abs(L11 * L11 - S11),
    Math.abs(L11 * L21 - S12),
    Math.abs(L21 * L21 + L22 * L22 - S22)
  );

  const lStyle = (i: number, j: number) =>
    j <= i ? { color: GREEN, fontWeight: 600 } : undefined;

  return (
    <div>
      <Aufgabe>Schieben wir ρ Richtung ±1 und beobachten, wie die grüne Wolke schmal wird.</Aufgabe>
      <p className="text-xs" style={{ color: "var(--w-muted)" }}>
        Legende: <span style={{ color: GREY, fontWeight: 600 }}>grau</span> die feste Wolke
        z ~ N(0, I₂) samt Referenzkreis vom Radius 2,{" "}
        <span style={{ color: GREEN, fontWeight: 600 }}>grün</span> ihr Bild y = Lz samt
        Bildellipse.
      </p>
      <p className="sr-only">
        Wir halten 200 Punkte <span className="font-mono">z</span> aus der
        Standardnormalverteilung N(0, I₂) fest (grau, runde Wolke) und schauen, was die
        Abbildung <span className="font-mono">y = Lz</span> daraus macht (
        <span style={{ color: GREEN, fontWeight: 600 }}>grün</span>): Aus den Reglern
        entstehen Σ und ihr Cholesky-Faktor L, und L verformt die runde Wolke in die
        korrelierte. Die grüne Ellipse ist das Bild des grauen Kreises mit Radius 2.
        Schieben wir ρ Richtung ±1, kollabiert die Wolke fast auf eine Gerade.
      </p>
      <Slider label="σ₁" value={s1} onChange={setS1} min={0.4} max={2} step={0.05} fmt={fmtSlider} />
      <Slider label="σ₂" value={s2} onChange={setS2} min={0.4} max={2} step={0.05} fmt={fmtSlider} />
      <Slider label="ρ" value={rho} onChange={setRho} min={-0.95} max={0.95} step={0.05} fmt={fmtSlider} />
      <div className="my-3 flex flex-wrap items-start gap-5">
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="max-w-full h-auto rounded"
          style={{ border: "1px solid var(--w-border)" }}
          role="img"
          aria-label="Punktwolke z (grau) und ihr Bild y = Lz (grün)"
        >
          <rect x={0} y={0} width={W} height={H} fill="var(--w-bg)" />
          {/* Achsen durch den Ursprung */}
          <line x1={sx(-w)} y1={sy(0)} x2={sx(w)} y2={sy(0)} stroke="var(--w-grid-strong)" strokeWidth={1} />
          <line x1={sx(0)} y1={sy(-w)} x2={sx(0)} y2={sy(w)} stroke="var(--w-grid-strong)" strokeWidth={1} />
          {/* Ticks und Beschriftung */}
          {ticks.map((v) => (
            <g key={v}>
              <line x1={sx(v)} y1={sy(0) - 3} x2={sx(v)} y2={sy(0) + 3} stroke={GREY} strokeWidth={1} />
              {v !== 0 && (
                <text x={sx(v)} y={H - padB + 14} fontSize={10} fill={GREY} textAnchor="middle">
                  {String(v).replace("-", "−")}
                </text>
              )}
              <line x1={sx(0) - 3} y1={sy(v)} x2={sx(0) + 3} y2={sy(v)} stroke={GREY} strokeWidth={1} />
              {v !== 0 && (
                <text x={padL - 6} y={sy(v) + 3} fontSize={10} fill={GREY} textAnchor="end">
                  {String(v).replace("-", "−")}
                </text>
              )}
            </g>
          ))}
          <text x={W - padR - 2} y={sy(0) - 6} fontSize={11} fill={GREY} textAnchor="end">
            y₁
          </text>
          <text x={sx(0) + 8} y={padT + 10} fontSize={11} fill={GREY}>
            y₂
          </text>
          {/* grauer Referenzkreis (Radius 2) und graue Wolke z */}
          <path d={path(CIRC2)} fill="none" stroke={GREY} strokeWidth={1} strokeDasharray="3 4" />
          {ZPTS.map(([a, b], k) => (
            <circle key={`z${k}`} cx={sx(a)} cy={sy(b)} r={2} fill={GREY} fillOpacity={0.45} />
          ))}
          {/* grüne Ellipse (Bild des Kreises) und grüne Wolke y = Lz */}
          <path d={path(ell)} fill="none" stroke={GREEN} strokeWidth={1.5} strokeDasharray="5 3" />
          {ys.map(([a, b], k) => (
            <circle key={`y${k}`} cx={sx(a)} cy={sy(b)} r={2} fill={GREEN} fillOpacity={0.7} />
          ))}
        </svg>
        <div className="min-w-56 grow text-sm">
          <div className="flex flex-wrap items-start gap-5">
            <WidgetLabel label="Σ (aus den Reglern)">
              <MatTable
                m={[
                  [S11, S12],
                  [S12, S22],
                ]}
                label="Kovarianzmatrix Sigma"
              />
            </WidgetLabel>
            <WidgetLabel label="L = chol(Σ)">
              <MatTable
                m={[
                  [L11, 0],
                  [L21, L22],
                ]}
                cellStyle={lStyle}
                label="Cholesky-Faktor L"
              />
            </WidgetLabel>
          </div>
          <div className="mt-3 rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800">
            L₁₁ = σ₁ = {fmtNum(L11)}
            <br />
            L₂₁ = ρσ₂ = {fmtNum(L21)}
            <br />
            L₂₂ = σ₂·√(1 − ρ²) = {fmtNum(L22)}
            <br />
            Probe: max |LLᵀ − Σ| = {fmtExp(residual)}
          </div>
          <Verdikt kind={Math.abs(rho) > 0.9 ? "warn" : Math.abs(rho) < 0.1 ? "neutral" : "ok"} className="mt-2">{Math.abs(rho) > 0.9 ? "L₂₂ wird klein; die Kovarianz ist fast singulär." : Math.abs(rho) < 0.1 ? "Die Wolke bleibt fast rund: die Korrelation ist nahe null." : `L erzeugt die sichtbare Scherung und ${ref("satz:kovarianz-unter-dem-cholesky-faktor")} garantiert die Kovarianz Σ.`}</Verdikt>
        </div>
      </div>
    </div>
  );
}
