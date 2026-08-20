/**
 * QA-L3-Nachprüfung: `verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 * Konzept-Widget `rate-of-convergence` (Gruppe C, KEEP + Politur 2026-08-19).
 *
 * DIE EINE EINSICHT: Lineare Konvergenz kauft pro Schritt eine feste Zahl
 * neuer Stellen, quadratische verdoppelt die Stellenzahl — im Halblog-Bild ist
 * das eine Gerade gegen einen Sturz, und der Unterschied entscheidet über
 * Dutzende von Iterationen.
 *
 * FARBROLLEN: rot = lineare Folge (Faktor C je Schritt); blau = quadratische
 * Folge; graue Linie = Maschinengenauigkeit 10⁻¹⁶ als Boden, unter dem keine
 * Iteration mehr etwas verbessert.
 *
 * PROVENIENZ: Halblog-Idee, Startfehler 10⁻¹ und der Genauigkeitsboden aus der
 * Vorfassung; Legende und Achsen kommen jetzt aus `Plot` v2, neu sind die
 * Aufgabenzeile und das Verdikt mit den Schrittzahlen. Der erklärende Absatz
 * (samt Verweis auf die Maschinengenauigkeit) steht in
 * rate-of-convergence.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/AUDIT-C/check-linear-ls-rate.mjs,
 * 2026-08-20): Start e₀ = 10⁻¹. Linear mit C = 0,1 → 1,000 Stellen je Schritt,
 * 15 Schritte bis 10⁻¹⁶; C = 0,5 → 0,301 Stellen, 50 Schritte; C = 0,9 →
 * 0,046 Stellen, 328 Schritte. Quadratisch: log₁₀e_k = −2^k, also
 * −1, −2, −4, −8, −16 — vier Schritte bis 10⁻¹⁶.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe, fmtInt } from "../../lib";

const E0 = 0.1;
const BODEN = -16; // doppelte Genauigkeit: ~16 korrekte Stellen

export function RateWidget() {
  const [c, setC] = useState(0.5);
  const linLog = (k: number) => Math.log10(E0) + k * Math.log10(c);
  const quadLog = (k: number) => Math.pow(2, k) * Math.log10(E0);
  const marken: { x: number; y: number; color: string; r: number }[] = [];
  for (let k = 0; k <= 8; k++) {
    if (linLog(k) >= BODEN) marken.push({ x: k, y: linLog(k), color: FMM_COLORS.rot, r: 3 });
    if (quadLog(k) >= BODEN) marken.push({ x: k, y: quadLog(k), color: FMM_COLORS.blau, r: 3 });
  }
  const stellenProSchritt = -Math.log10(c);
  const schritteLinear = Math.ceil((BODEN - Math.log10(E0)) / Math.log10(c));
  const schritteQuadratisch = Math.ceil(Math.log2(-BODEN / -Math.log10(E0)));

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verstellen wir den linearen Faktor C und zählen die Schritte bis zum Boden.</Aufgabe>
      <Plot
        xLabel="Iteration k"
        yLabel="log₁₀ Fehler"
        xDomain={[0, 8]}
        yDomain={[BODEN, 0]}
        width={320}
        height={220}
        readout
        ariaLabel={`Halblog-Vergleich: lineare Konvergenz mit Faktor ${fmtDe(c, 2)} braucht ${fmtInt(schritteLinear)} Schritte, quadratische ${fmtInt(schritteQuadratisch)}.`}
        series={[
          { f: linLog, color: FMM_COLORS.rot, label: "linear" },
          { f: quadLog, color: FMM_COLORS.blau, label: "quadratisch" },
        ]}
        hlines={[{ at: BODEN, color: FMM_COLORS.grau, dash: [5, 4], label: "Maschinengenauigkeit" }]}
        points={marken}
      />
      <Slider label="linearer Faktor C" value={c} onChange={setC} min={0.05} max={0.95} step={0.05} accent={FMM_COLORS.rot} />
      <Verdikt kind={c <= 0.2 ? "ok" : c >= 0.8 ? "warn" : "neutral"}>
        {c <= 0.2 ? (
          <>Mit C = {fmtDe(c, 2)} gewinnt die lineare Folge {fmtDe(stellenProSchritt, 2)} Stellen pro Schritt und erreicht den Boden nach {fmtInt(schritteLinear)} Schritten.</>
        ) : c >= 0.8 ? (
          <>Mit C = {fmtDe(c, 2)} gewinnt die lineare Folge nur {fmtDe(stellenProSchritt, 2)} Stellen pro Schritt und braucht {fmtInt(schritteLinear)} Schritte. Hier wird der Vorteil der quadratischen Folge besonders deutlich.</>
        ) : (
          <>Mit C = {fmtDe(c, 2)} gewinnt die lineare Folge {fmtDe(stellenProSchritt, 2)} Stellen pro Schritt und braucht {fmtInt(schritteLinear)} Schritte; die quadratische Folge erreicht den Boden nach {fmtInt(schritteQuadratisch)} Schritten.</>
        )}
      </Verdikt>
    </div>
  );
}
