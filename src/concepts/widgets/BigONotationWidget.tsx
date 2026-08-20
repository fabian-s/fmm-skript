/**
 * Konzept-Widget `big-o-notation` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: „O(t²)" ist keine Zauberformel, sondern eine Wette auf
 * eine Konstante: erst wenn C groß genug ist, liegt das Restglied im ganzen
 * Fenster unter C·t² — und für jedes zu kleine C zeigt das Bild genau, wo die
 * Schranke bricht.
 *
 * FARBROLLEN: blau = Restglied |e^t − (1 + t)|; rot (gestrichelt) = Hüllkurve
 * C·t²; roter Punkt = die Stelle der stärksten Verletzung.
 *
 * PROVENIENZ: Regler und Kurvenpaar aus der Vorfassung; neu sind Achsen und
 * Legende aus `Plot` v2, die Aufgabenzeile und das Verdikt mit der
 * Verletzungsstelle. Die erklärende Einleitung ist nach big-o-notation.mdx
 * gewandert.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-19): sup |e^t − (1+t)| / t² auf [−1,1] = e − 2 = 0,718282, am
 * rechten Rand t = 1 angenommen; der Grenzwert für t → 0 ist 1/2; bei t = −1
 * ist der Quotient 0,367879. Für C = 0,6 hält die Schranke bis t = 0,5236 und
 * bricht danach; für C < 0,5 bricht sie schon beliebig nahe an 0.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";

const rest = (t: number) => Math.abs(Math.exp(t) - (1 + t));

/** Stärkste Verletzung von |e^t − (1+t)| ≤ C t² auf [−1, 1]. */
function pruefe(C: number) {
  let schlimmste = { t: 0, ueber: 0 };
  let kleinstesT = Infinity;
  for (let i = 0; i <= 2000; i++) {
    const t = -1 + (2 * i) / 2000;
    const ueber = rest(t) - C * t * t;
    if (ueber > 1e-12) {
      if (ueber > schlimmste.ueber) schlimmste = { t, ueber };
      kleinstesT = Math.min(kleinstesT, Math.abs(t));
    }
  }
  return { ...schlimmste, kleinstesT };
}

export function RemainderWidget() {
  const [C, setC] = useState(0.5);
  const { t, ueber, kleinstesT } = pruefe(C);
  const haelt = ueber <= 1e-12;
  const nurAussen = !haelt && kleinstesT > 0.05;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Schieben wir C nach oben, bis die rote Hüllkurve das Restglied ganz einfängt.</Aufgabe>
      <Plot
        xLabel="t"
        yLabel="Größe"
        xDomain={[-1, 1]}
        yDomain={[0, 0.9]}
        width={320}
        height={210}
        readout
        ariaLabel={`Restglied und Hüllkurve mit C = ${fmtDe(C, 2)}; die Schranke ${haelt ? "hält im ganzen Fenster" : `bricht bei t = ${fmtDe(t, 2)}`}.`}
        series={[
          { f: rest, color: FMM_COLORS.blau, label: "|e^t − (1+t)|" },
          { f: (u) => C * u * u, color: FMM_COLORS.rot, dash: [5, 4], label: "C·t²" },
        ]}
        points={haelt ? [] : [{ x: t, y: rest(t), color: FMM_COLORS.rot, r: 4 }]}
      />
      <Slider label="C" value={C} onChange={setC} min={0} max={1.2} step={0.02} accent={FMM_COLORS.rot} />
      <Verdikt kind={haelt ? "ok" : "fail"}>
        {haelt ? (
          <>
            C = {fmtDe(C, 2)} reicht auf [−1, 1]: Das Restglied bleibt überall unter C·t².
            Der kleinste passende Wert ist C = e − 2 = 0,72; am rechten Rand t = 1 wird die
            Schranke knapp.
          </>
        ) : nurAussen ? (
          <>
            C = {fmtDe(C, 2)} reicht nicht auf [−1, 1]: Die erste Verletzung liegt bei
            |t| = {fmtDe(kleinstesT, 2)}, am stärksten ist sie bei t = {fmtDe(t, 2)} mit
            {fmtDe(ueber, 3)} über C·t². Für die O-Notation kann dieselbe Konstante dennoch in
            einem kleineren Fenster um null reichen.
          </>
        ) : (
          <>
            C = {fmtDe(C, 2)} reicht nicht auf [−1, 1] und ist sogar nahe null zu klein: bei
            t = {fmtDe(t, 2)} liegt das Restglied um {fmtDe(ueber, 3)} über C·t². Unter C = 0,5
            kann kein noch so kleines Fenster helfen, denn der Quotient strebt für t → 0 gegen 1/2.
          </>
        )}
      </Verdikt>
    </div>
  );
}
