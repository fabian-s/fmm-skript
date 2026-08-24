/**
 * Konzept-Widget `matrix-vector-product`.
 *
 * DIE EINE EINSICHT: Ax ist die gewichtete Summe der Spalten von A.
 * FARBROLLEN: rot = x₁a₁, grün = x₂a₂, blau = ihre Summe Ax.
 * PROVENIENZ: Neuaufbau auf `LabeledTransformCanvas`; alle Texte sind neu.
 * VERIFIZIERTE ZAHLEN: `scripts/verify/QA-L2/verify-qa-l2.mjs`, 2026-08-20, bestätigt
 * für A = [[1, 2], [3, 4]] und x = (2; 1): Ax = (4; 10).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, LabeledTransformCanvas, Slider, Verdikt, fmtDe } from "../../lib";

const A: [[number, number], [number, number]] = [[1, 2], [3, 4]];

export function ProductWidget() {
  const [x1, setX1] = useState(2);
  const [x2, setX2] = useState(1);
  const erster: [number, number] = [x1, 3 * x1];
  const zweiter: [number, number] = [2 * x2, 4 * x2];
  const ax: [number, number] = [erster[0] + zweiter[0], erster[1] + zweiter[1]];
  const leer = Math.abs(x1) < 1e-9 && Math.abs(x2) < 1e-9;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verändern wir beide Gewichte und verfolgen die Pfeilkette.</Aufgabe>
      <LabeledTransformCanvas
        matrix={A}
        size={260}
        worldHalf={12}
        xLabel="Ergebnis 1"
        yLabel="Ergebnis 2"
        readout
        vectors={[
          { v: erster, color: FMM_COLORS.rot, label: "x₁a₁" },
          { v: zweiter, color: FMM_COLORS.gruen, label: "x₂a₂" },
          { v: ax, color: FMM_COLORS.blau, label: "Ax" },
        ]}
        ariaLabel={`Die gewichteten Spalten summieren sich zu Ax = (${fmtDe(ax[0], 1)}; ${fmtDe(ax[1], 1)}).`}
      />
      <Slider label="x₁" value={x1} onChange={setX1} min={-3} max={3} step={0.1} accent={FMM_COLORS.rot} />
      <Slider label="x₂" value={x2} onChange={setX2} min={-3} max={3} step={0.1} accent={FMM_COLORS.gruen} />
      <Verdikt kind={leer ? "warn" : "ok"}>
        {leer
          ? "Beide Gewichte sind null; deshalb verschwinden beide Spaltenbeiträge und Ax ist der Nullvektor."
          : `x₁a₁ = (${fmtDe(erster[0], 1)}; ${fmtDe(erster[1], 1)}) und x₂a₂ = (${fmtDe(zweiter[0], 1)}; ${fmtDe(zweiter[1], 1)}). Ihre Pfeilsumme ist Ax = (${fmtDe(ax[0], 1)}; ${fmtDe(ax[1], 1)}).`}
      </Verdikt>
    </div>
  );
}
