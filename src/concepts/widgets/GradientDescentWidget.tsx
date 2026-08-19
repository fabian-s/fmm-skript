/**
 * Einsicht: Die Schrittweite bestimmt, ob der vollständige Gradientenpfad
 * zum Minimum läuft, oszilliert oder wächst. Farben: blau Loss, rot aktuelle
 * Iterierte, orange Pfad. Provenienz: neu für Plot/Stepper v2. Zahlen: die
 * Faktoren 1−2γ wurden mit verify-konzepte-C4/gradient-descent.mjs (2026-08-19) geprüft.
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
  const factor = Math.abs(1 - 2 * gamma);
  const verdict = factor < 1 ? "Die Beträge der Iterierten schrumpfen; der Pfad nähert sich dem Minimum bei 0." : factor === 1 ? "Die Iterierten werden nicht kleiner. Diese Schrittweite konvergiert nicht." : "Die Beträge wachsen. Der nächste Schritt entfernt sich weiter vom Minimum.";
  return <div className="mt-2 rounded bg-slate-700/60 p-2">
    <Aufgabe>Wählen wir eine Schrittweite und verfolgen wir den Pfad Schritt für Schritt.</Aufgabe>
    <Plot series={[{ f: loss, label: "L(θ)", color: FMM_COLORS.blau }]} xDomain={[-3, 3]} yDomain={[0, 7]} xLabel="θ" yLabel="L(θ)" readout ariaLabel="Quadratische Zielfunktion mit Gradientenpfad" polylines={[{ pts: path.map((x) => [x, loss(x)] as [number, number]), color: FMM_COLORS.orange, label: "Pfad" }]} markers={path.map((x, i) => ({ x, y: loss(x), color: i === step ? FMM_COLORS.rot : FMM_COLORS.orange, r: i === step ? 4 : 2.5 }))} />
    <Slider label="Schrittweite γ" value={gamma} onChange={(v) => { setGamma(v); setStep(0); }} min={0.05} max={1.15} step={0.05} accent={FMM_COLORS.orange} />
    <Stepper step={step} setStep={setStep} max={12} narration={<>θ<sub>{step}</sub> = {fmtDe(theta, 3)}</>} />
    <Verdikt kind={factor < 1 ? "ok" : "warn"}>{verdict}</Verdikt>
  </div>;
}
