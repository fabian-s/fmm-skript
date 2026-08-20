/**
 * Konzept-Widget `optimization`.
 *
 * DIE EINE EINSICHT: Ein bisher bester Versuch ist noch kein globales Minimum.
 * FARBROLLEN: blau = Zielfunktion, rot = aktueller Versuch, grün = bester Fund.
 * PROVENIENZ: Neu; Schätzfrage aus der gemeinsamen Widget-Lib.
 * VERIFIZIERTE ZAHLEN: `scripts/verify/QA-L2/verify-qa-l2.mjs`, 2026-08-20, bestätigt
 * das globale Minimum L(−1,035558) = −0,305428 auf [−1,8; 1,8].
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Schaetzfrage, Slider, Verdikt, fmtDe } from "../../lib";

const loss = (x: number) => (x * x - 1) ** 2 + 0.3 * x;

export function OptimizationWidget() {
  const [theta, setTheta] = useState(1.6);
  const [best, setBest] = useState({ x: 1.6, y: loss(1.6) });

  const choose = (x: number) => {
    setTheta(x);
    const y = loss(x);
    if (y < best.y) setBest({ x, y });
  };
  const links = theta < 0;
  const verbessert = best.x === theta;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Finden wir durch Verschieben einen möglichst kleinen Funktionswert.</Aufgabe>
      <Schaetzfrage frage="Wo vermuten wir das globale Minimum?" loesung={-1.04} toleranz={0.2} min={-1.8} max={1.8} schritt={0.05}>
        <Plot
          series={[{ f: loss, label: "L(θ)", color: FMM_COLORS.blau }]}
          xDomain={[-2, 2]}
          yDomain={[-1, 3]}
          xLabel="θ"
          yLabel="L(θ)"
          readout
          markers={[
            { x: theta, y: loss(theta), color: FMM_COLORS.rot, label: "Versuch" },
            { x: best.x, y: best.y, color: FMM_COLORS.gruen, label: "bisher bester" },
          ]}
          ariaLabel="Zielfunktion mit aktuellem und bestem Versuch."
        />
      </Schaetzfrage>
      <Slider label="Parameter θ" value={theta} onChange={choose} min={-1.8} max={1.8} step={0.01} accent={FMM_COLORS.rot} />
      <Verdikt kind={links ? (verbessert ? "ok" : "warn") : "neutral"}>
        {links
          ? verbessert
            ? `Dieser linke Versuch verbessert den bisherigen Rekord auf L(${fmtDe(best.x, 2)}) = ${fmtDe(best.y, 3)}. Ob er global ist, entscheiden wir erst durch den Vergleich mit allen anderen Werten.`
            : `Links liegt der bisher beste Fund bei L(${fmtDe(best.x, 2)}) = ${fmtDe(best.y, 3)}; der aktuelle Versuch ist höher. Ein lokaler Blick genügt also nicht.`
          : `Rechts finden wir zwar einen niedrigen Wert, aber der bisher beste Fund liegt bei θ = ${fmtDe(best.x, 2)}. Die Suche muss beide Mulden vergleichen.`}
      </Verdikt>
    </div>
  );
}
