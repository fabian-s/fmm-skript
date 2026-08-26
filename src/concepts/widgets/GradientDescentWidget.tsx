/**
 * Einsicht: Die Schrittweite bestimmt, ob der vollständige Gradientenpfad
 * zum Minimum läuft, oszilliert oder wächst. Farben: blau Loss, rot aktuelle
 * Iterierte, orange Pfad. Provenienz: neu für Plot/Stepper v2. Zahlen: die
 * Faktoren 1−2γ wurden mit scripts/verify/QA-L0/verify-qa-l0.mjs (2026-08-20) geprüft.
 *
 * RECHNUNG: Für L(θ) = θ² ist L'(θ) = 2θ, der Schritt also
 *   θ_{t+1} = θ_t − γ·2θ_t = (1 − 2γ) θ_t,  d. h.  θ_k = (1 − 2γ)^k · θ_0
 * mit θ_0 = 2,4. Der Regler läuft von γ = 0,05 bis γ = 1,15 in Schritten von
 * 0,05; damit sind alle fünf Fallklassen von r := 1 − 2γ erreichbar:
 *   γ = 0,05 → r = 0,90   (0 < r < 1: monoton, Vorzeichen bleibt)
 *   γ = 0,50 → r = 0      (ein Schritt landet exakt auf dem Minimum)
 *   γ = 0,75 → r = −0,50  (−1 < r < 0: Vorzeichen wechselt, Beträge schrumpfen)
 *   γ = 1,00 → r = −1     (Sprung zwischen ±2,4, keine Konvergenz)
 *   γ = 1,15 → r = −1,30  (r < −1: Vorzeichen wechselt, Beträge wachsen)
 * Die Stabilitätsgrenze |1 − 2γ| < 1 ist hier also 0 < γ < 1 – sie gehört zu
 * dieser Zielfunktion, nicht zum Verfahren allgemein.
 */
import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Stepper, Verdikt, fmtDe } from "../../lib";

const loss = (x: number) => x * x;
function pathFor(gamma: number, k: number) {
  const out = [2.4];
  for (let i = 0; i < k; i += 1) out.push(out[i] * (1 - 2 * gamma));
  return out;
}
export function GradientDescentWidget() {
  const [gamma, setGamma] = useState(0.15);
  const [step, setStep] = useState(0);
  const path = useMemo(() => pathFor(gamma, step), [gamma, step]);
  const theta = path[path.length - 1];
  const r = 1 - 2 * gamma; // Update-Faktor: θ_{t+1} = (1 − 2γ) θ_t
  const factor = Math.abs(r);
  const rText = fmtDe(r, 2);
  // 1e-9: Fließkommaschutz für die Reglerwerte γ = 0,5 und γ = 1.
  const nullFaktor = factor < 1e-9;
  const grenze = Math.abs(factor - 1) < 1e-9;
  const verdict = nullFaktor
    ? "Update-Faktor 1 − 2γ = 0: Ein einziger Schritt landet exakt im Minimum – ein Glücksfall von γ = 0,5 bei genau dieser Zielfunktion."
    : grenze
      ? "Update-Faktor 1 − 2γ = −1: θ springt zwischen +2,4 und −2,4 und wird nie kleiner. Bei γ = 1 liegt für L(θ) = θ² die Stabilitätsgrenze."
      : r > 0 && factor < 1
        ? `Update-Faktor 1 − 2γ = ${rText} > 0: Jede Iterierte behält ihr Vorzeichen und schrumpft um diesen Faktor – der Pfad läuft monoton ins Minimum bei 0.`
        : r < 0 && factor < 1
          ? `Update-Faktor 1 − 2γ = ${rText} < 0: θ wechselt bei jedem Schritt das Vorzeichen, springt also über das Minimum – wegen |1 − 2γ| < 1 schrumpfen die Beträge trotzdem.`
          : `Update-Faktor 1 − 2γ = ${rText}, dem Betrag nach größer als 1: θ wechselt das Vorzeichen und wird dabei größer. Für γ > 1 divergiert das Verfahren auf dieser Zielfunktion.`;
  // Der Ausschnitt wächst mit dem Pfad (gedeckelt bei ±6), damit auch die
  // ersten divergierenden Schritte sichtbar bleiben; y füllt die Parabel aus.
  const xHalf = Math.min(6, Math.max(3, 1.15 * Math.max(...path.map(Math.abs))));
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Wählen wir eine Schrittweite und verfolgen wir den Pfad Schritt für Schritt.
      </Aufgabe>
      <Plot
        series={[{ f: loss, label: "L(θ)", color: FMM_COLORS.blau }]}
        xDomain={[-xHalf, xHalf]}
        yDomain={[0, xHalf * xHalf]}
        xLabel="θ"
        yLabel="L(θ)"
        readout
        ariaLabel="Quadratische Zielfunktion mit Gradientenpfad"
        polylines={[
          {
            pts: path.map((x) => [x, loss(x)] as [number, number]),
            color: FMM_COLORS.orange,
            label: "Pfad",
          },
        ]}
        markers={path.map((x, i) => ({
          x,
          y: loss(x),
          color: i === step ? FMM_COLORS.rot : FMM_COLORS.orange,
          r: i === step ? 4 : 2.5,
        }))}
      />
      <Slider
        label="Schrittweite γ"
        value={gamma}
        onChange={(v) => {
          setGamma(v);
          setStep(0);
        }}
        min={0.05}
        max={1.15}
        step={0.05}
        accent={FMM_COLORS.orange}
      />
      <Stepper
        step={step}
        setStep={setStep}
        max={12}
        narration={
          <>
            θ<sub>{step}</sub> = {fmtDe(theta, 3)}
          </>
        }
      />
      <Verdikt kind={factor < 1 - 1e-9 ? "ok" : grenze ? "warn" : "fail"}>{verdict}</Verdikt>
    </div>
  );
}
