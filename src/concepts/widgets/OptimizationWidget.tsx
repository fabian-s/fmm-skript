/** Einsicht: Ein niedriger lokaler Wert ist nicht automatisch der globale. Farben: blau Kurve, rot Versuch, grün Bestwert. Provenienz: neu. Zahlen: keine Verdiktzahl (2026-08-19). */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Schaetzfrage, Slider, Verdikt, fmtDe } from "../../lib";
const loss = (x: number) => (x * x - 1) ** 2 + 0.3 * x;
export function OptimizationWidget() {
  const [theta, setTheta] = useState(1.6);
  const [best, setBest] = useState({ x: 1.6, y: loss(1.6) });
  const choose = (x: number) => { setTheta(x); const y = loss(x); if (y < best.y) setBest({ x, y }); };
  return <div className="mt-2 rounded bg-slate-700/60 p-2"><Aufgabe>Finden wir durch Verschieben einen möglichst kleinen Funktionswert.</Aufgabe>
    <Schaetzfrage frage="Wo vermuten wir das globale Minimum?" loesung={-1.04} toleranz={0.2} min={-1.8} max={1.8} schritt={0.05}>
      <Plot series={[{ f: loss, label: "L(θ)", color: FMM_COLORS.blau }]} xDomain={[-2, 2]} yDomain={[-1, 3]} xLabel="θ" yLabel="L(θ)" readout markers={[{ x: theta, y: loss(theta), color: FMM_COLORS.rot, label: "Versuch" }, { x: best.x, y: best.y, color: FMM_COLORS.gruen, label: "bisher bester" }]} ariaLabel="Zielfunktion mit aktuellem und bestem Versuch" />
    </Schaetzfrage><Slider label="Parameter θ" value={theta} onChange={choose} min={-1.8} max={1.8} step={0.01} accent={FMM_COLORS.rot} />
    <Verdikt kind="neutral">Bester bisheriger Wert: L({fmtDe(best.x, 2)}) = {fmtDe(best.y, 3)}. Ein einzelner niedriger Punkt genügt noch nicht als globaler Nachweis.</Verdikt></div>;
}
