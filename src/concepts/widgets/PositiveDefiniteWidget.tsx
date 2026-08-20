/**
 * Konzept-Widget `positive-definite` (Gruppe C, KEEP + 3D-Anbau nach D7,
 * 2026-08-19).
 *
 * DIE EINE EINSICHT: Positive Definitheit ist eine Aussage über ALLE
 * Richtungen: erst wenn die quadratische Form auf dem ganzen Einheitskreis
 * über null bleibt, ist die Fläche eine Schüssel — und der kleinste Eigenwert
 * ist genau der tiefste Punkt dieser Kurve.
 *
 * FARBROLLEN: grün = q(θ) dort, wo die Form positiv ist; rot = die verletzenden
 * Richtungen (Kurvenstück unter null, rot gefüllt); grau = die Nulllinie und
 * die Nullebene in der 3D-Tafel; orange = der Einheitskreis, auf dem beide
 * Tafeln dieselbe Kurve zeigen (verlinkte Darstellungen, D7).
 *
 * PROVENIENZ: Die Kurve q(θ) = 2 + c·sin(2θ) und der λ_min-Test stammen aus
 * der Vorfassung; neu sind die hervorgehobene Nulllinie, die Markierung der
 * verletzenden Richtungen, das Verdikt und die 3D-Tafel (`Surface3D`, Bauart
 * wie S113Hesse in Kapitel 11).
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C5/check-alle.mjs,
 * 2026-08-19): für A = [[2, c], [c, 2]] gilt xᵀAx = 2 + c·sin(2θ) auf dem
 * Einheitskreis; Eigenwerte 2 ± c zu den Eigenvektoren (1,1)/√2 und
 * (1,−1)/√2. Numerisch über 20000 Richtungen: c = 0 → min q = 2,000;
 * c = 1 → 1,000 bei 135°; c = 2 → 0,000 bei 135°; c = 2,5 → −0,500 bei 135°;
 * c = −2,5 → −0,500 bei 45°.
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
} from "../../lib";
import type { Ebene3D, Kurve3D, Sicht3D, Vec3 } from "../../lib";

const HALB = 1.2;

export function PositiveDefiniteWidget() {
  const [c, setC] = useState(2.5);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 26 });

  const q = (th: number) => 2 + c * Math.sin(2 * th);
  const lmin = 2 - Math.abs(c);
  const lmax = 2 + Math.abs(c);
  const pd = lmin > 1e-9;
  const semidefinit = Math.abs(lmin) <= 1e-9;
  // Richtung des Minimums: sin(2θ) = −sign(c), also θ = 135° für c > 0.
  const thetaMin = c === 0 ? 0 : c > 0 ? (3 * Math.PI) / 4 : Math.PI / 4;

  const flaeche = useMemo(
    () => ({
      f: (x: number, y: number) => 2 * x * x + 2 * c * x * y + 2 * y * y,
      nx: 26,
      ny: 26,
      color: FMM_COLORS.blau,
      opacity: 0.8,
      wire: true,
    }),
    [c],
  );
  const kreis = useMemo<Kurve3D[]>(
    () => [
      {
        pts: Array.from({ length: 97 }, (_, i) => {
          const th = (2 * Math.PI * i) / 96;
          return [Math.cos(th), Math.sin(th), q(th)] as Vec3;
        }),
        color: FMM_COLORS.orange,
        width: 2.4,
        onTop: true,
      },
    ],
    [c],
  );
  // Wertebereich der Fläche über dem Fenster: Ecken (±H, ±H) liefern die Extreme.
  const eckHoch = 4 * HALB * HALB + 2 * Math.abs(c) * HALB * HALB;
  const eckTief = 4 * HALB * HALB - 2 * Math.abs(c) * HALB * HALB;
  const zDomain: [number, number] = [Math.min(0, eckTief) - 0.3, eckHoch + 0.3];
  const nullebene = useMemo<Ebene3D[]>(
    () => [{ p0: [0, 0, 0] as Vec3, u: [1, 0, 0] as Vec3, v: [0, 1, 0] as Vec3, su: HALB, sv: HALB, color: FMM_COLORS.grau, opacity: 0.22 }],
    [],
  );

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Drehen wir an der Nebendiagonalen, bis die Kurve die Nulllinie berührt.</Aufgabe>
      <Plot
        xLabel="Richtung θ (Bogenmaß)"
        yLabel="xᵀA x"
        xDomain={[0, 2 * Math.PI]}
        yDomain={[-2.5, 5.5]}
        width={320}
        height={210}
        readout
        ariaLabel={`Die quadratische Form über allen Richtungen mit c = ${fmtDe(c, 1)}; kleinster Wert ${fmtDe(lmin, 2)}.`}
        series={[
          { f: (th) => (q(th) > 0 ? q(th) : NaN), color: FMM_COLORS.gruen, label: "xᵀAx > 0" },
          { f: (th) => (q(th) <= 0 ? q(th) : NaN), color: FMM_COLORS.rot, fill: true, label: "xᵀAx ≤ 0" },
        ]}
        hlines={[{ at: 0, color: FMM_COLORS.grau, dash: [4, 3], label: "Nulllinie" }]}
        points={[{ x: thetaMin, y: lmin, color: pd ? FMM_COLORS.gruen : FMM_COLORS.rot, r: 4, label: "λ_min" }]}
      />
      <Slider label="Nebendiagonale c" value={c} onChange={setC} min={-3} max={3} step={0.1} accent={FMM_COLORS.orange} />
      <p className={`my-1 font-mono text-xs ${W_MUTED}`}>
        A = [[2, {fmtDe(c, 1)}], [{fmtDe(c, 1)}, 2]], Eigenwerte {fmtDe(lmin, 1)} und {fmtDe(lmax, 1)}
      </p>
      <div className="mt-2">
        <Surface3D
          size={280}
          xDomain={[-HALB, HALB]}
          yDomain={[-HALB, HALB]}
          zDomain={zDomain}
          surface={flaeche}
          curves={kreis}
          planes={nullebene}
          labels={{ x: "x₁", y: "x₂", z: "xᵀAx" }}
          azimuth={sicht.azimuth}
          elevation={sicht.elevation}
          onViewChange={setSicht}
          ariaLabel={`Die quadratische Form als Fläche; die orange Kurve ist ihr Wert auf dem Einheitskreis, die graue Ebene ist das Niveau null.`}
        />
        <div className="mt-1 max-w-[280px]">
          <ViewControls value={sicht} onChange={setSicht} />
        </div>
        <p className={`mt-1 max-w-[280px] text-xs ${W_MUTED}`}>
          Dieselbe Form als Fläche: die orange Kurve über dem Einheitskreis ist genau die Kurve
          oben, die graue Ebene ist das Niveau null.
        </p>
      </div>
      <Verdikt kind={pd ? "ok" : semidefinit ? "warn" : "fail"}>
        {pd ? (
          <>
            Der kleinste Wert über allen Richtungen ist {fmtDe(lmin, 2)} &gt; 0, und das ist
            zugleich der kleinste Eigenwert 2 − |c|. Die Form bleibt strikt über der Nulllinie: A
            ist positiv definit, die Fläche eine Schüssel.
          </>
        ) : semidefinit ? (
          <>
            Bei |c| = 2 berührt die Kurve die Nulllinie: λ_min = 0. In Richtung (1, −1)/√2 (bzw.
            (1,1)/√2 für negatives c) ist xᵀAx = 0, obwohl x ≠ 0. Damit ist A nur noch positiv
            semidefinit, und die Fläche hat eine flache Rinne.
          </>
        ) : (
          <>
            Bei θ = {fmtDe(thetaMin, 2)} fällt die Form auf {fmtDe(lmin, 2)} &lt; 0. Ein einziges
            solches x widerlegt die Definitheit, und der kleinste Eigenwert 2 − |c| zeigt es an,
            bevor man irgendeine Richtung ausprobiert.
          </>
        )}
      </Verdikt>
    </div>
  );
}
