/**
 * Konzept-Widget `inner-product-functions` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: Orthogonalität von Funktionen ist eine Flächenbilanz —
 * das Produkt p·q hat oberhalb und unterhalb der Achse exakt gleich viel
 * Fläche, und deshalb ist das Integral null.
 *
 * FARBROLLEN: grün = Produkt p·q über der Achse (positive Fläche); rot =
 * Produkt unter der Achse (negative Fläche); grau (gestrichelt) = die beiden
 * Faktoren p und q.
 *
 * PROVENIENZ: Polynomauswahl und Simpson-Regel aus der Vorfassung; neu sind
 * die gefüllten Flächen (`fill` in `Plot` v2), `aria-pressed` auf den Knöpfen,
 * die getrennt ausgewiesene positive und negative Fläche und das Verdikt.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV0/InnerProductFunctionsWidget.mjs,
 * 2026-08-20; Simpson mit 2000 Teilintervallen, exakte Werte in Klammern):
 * ⟨1,1⟩ = 2,000000 (2), ⟨t,t⟩ = 0,666667 (2/3), ⟨P₂,P₂⟩ = 0,400000 (2/5);
 * alle gemischten Paare sind 0. Die Teilflächen: ⟨1,t⟩ ± 0,500000,
 * ⟨1,P₂⟩ ± 0,384900, ⟨t,P₂⟩ ± 0,208333.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Verdikt, W_BUTTON, W_BUTTON_AKTIV, fmtDe } from "../../lib";

const POLYS = [
  { name: "1", f: (_t: number) => 1 },
  { name: "t", f: (t: number) => t },
  { name: "(3t²−1)/2", f: (t: number) => (3 * t * t - 1) / 2 },
];

/** Simpson-Regel auf [−1, 1] mit 200 Teilintervallen. */
function integriere(g: (t: number) => number): number {
  const n = 200;
  const h = 2 / n;
  let s = g(-1) + g(1);
  for (let i = 1; i < n; i++) s += (i % 2 === 0 ? 2 : 4) * g(-1 + i * h);
  return (s * h) / 3;
}

export function InnerProductWidget() {
  const [pi, setPi] = useState(0);
  const [qi, setQi] = useState(1);
  const p = POLYS[pi];
  const q = POLYS[qi];
  const produkt = (t: number) => p.f(t) * q.f(t);
  const ip = integriere(produkt);
  const positiv = integriere((t) => Math.max(produkt(t), 0));
  const negativ = -integriere((t) => Math.min(produkt(t), 0));
  const orthogonal = Math.abs(ip) < 1e-8;

  const auswahl = (label: string, gewaehlt: number, setzen: (i: number) => void) => (
    <div className="flex flex-wrap items-center gap-1">
      <span className="w-4 font-mono text-xs">{label}:</span>
      {POLYS.map((pol, i) => (
        <button
          key={pol.name}
          type="button"
          aria-pressed={i === gewaehlt}
          className={`${i === gewaehlt ? W_BUTTON_AKTIV : W_BUTTON} font-mono text-xs`}
          onClick={() => setzen(i)}
        >
          {pol.name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>Suchen wir ein Paar, bei dem sich grüne und rote Fläche genau aufheben.</Aufgabe>
      <Plot
        xLabel="t"
        yLabel="p·q"
        xDomain={[-1, 1]}
        yDomain={[-1.25, 1.25]}
        width={320}
        height={230}
        readout
        ariaLabel={`Produkt von ${p.name} und ${q.name}; positive Fläche ${fmtDe(positiv, 3)}, negative Fläche ${fmtDe(negativ, 3)}.`}
        series={[
          { f: p.f, color: FMM_COLORS.grau, dash: [3, 4], label: `p = ${p.name}` },
          { f: q.f, color: FMM_COLORS.grau, dash: [7, 3], label: `q = ${q.name}` },
          { f: (t) => (produkt(t) > 0 ? produkt(t) : NaN), color: FMM_COLORS.gruen, fill: true, label: "p·q über der Achse" },
          { f: (t) => (produkt(t) < 0 ? produkt(t) : NaN), color: FMM_COLORS.rot, fill: true, label: "p·q unter der Achse" },
        ]}
      />
      <div className="my-1 flex flex-col gap-1">
        {auswahl("p", pi, setPi)}
        {auswahl("q", qi, setQi)}
      </div>
      <Verdikt kind={orthogonal ? "ok" : "neutral"}>
        {orthogonal ? (
          <>
            Grün {fmtDe(positiv, 3)} gegen rot {fmtDe(negativ, 3)}: die Flächen heben sich auf,
            also ⟨p, q⟩ = 0. Die beiden Polynome sind orthogonal – der erste Schritt beim Aufbau
            orthogonaler Polynome (vgl. Heath §7.3.4).
          </>
        ) : (
          <>
            ⟨p, q⟩ = {fmtDe(ip, 3)} ≠ 0 (grün {fmtDe(positiv, 3)}, rot {fmtDe(negativ, 3)}). Bei
            p = q ist das Integral die quadrierte Länge der Funktion und kann gar nicht null sein.
          </>
        )}
      </Verdikt>
    </div>
  );
}
