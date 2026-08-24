/**
 * Konzept-Widget `basis` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: Die Monome 1, t, t² sind Koordinatenachsen im Raum der
 * quadratischen Polynome — jede Zielkurve wird von genau EINEM Tripel
 * (c₁, c₂, c₃) getroffen, und wer daneben liegt, sieht sofort, welcher
 * Baustein noch fehlt.
 *
 * FARBROLLEN: blau = unsere Linearkombination f; grau (dick, gestrichelt) =
 * Zielkurve; orange/violett/grün (dünn, gestrichelt) = die drei
 * Basisfunktionen 1, t, t², jeweils mit ihrem Koeffizienten skaliert.
 *
 * PROVENIENZ: Ersetzt die alte Fassung (drei Regler + Legende, die `Plot` nie
 * gezeichnet hat). Legende und Achsen kommen jetzt aus `Plot` v2; neu sind die
 * Zielkurve, die Aufgabe und das Verdikt.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-19): Zielpolynom 0,6 + 0,9t − 0,5t²; Startzustand (1; 0,5; −0,8)
 * hat max|f − Ziel| = 1,600 auf [−2,2] (angenommen am rechten Rand t = 2);
 * Differenz d(t) = 0,4 − 0,4t − 0,3t². Wertebereich der Zielkurve auf [−2,2]:
 * −3,200 bis 1,005 (Scheitel bei t = 0,9).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_MUTED, fmtDe } from "../../lib";

const ZIEL: [number, number, number] = [0.6, 0.9, -0.5];
const zielF = (t: number) => ZIEL[0] + ZIEL[1] * t + ZIEL[2] * t * t;

/** Größter Abstand zwischen Kombination und Zielkurve auf [−2, 2]. */
function maxAbstand(c1: number, c2: number, c3: number): number {
  let m = 0;
  for (let i = 0; i <= 400; i++) {
    const t = -2 + (4 * i) / 400;
    m = Math.max(m, Math.abs(c1 + c2 * t + c3 * t * t - zielF(t)));
  }
  return m;
}

export function BasisFunctionWidget() {
  const [c1, setC1] = useState(1);
  const [c2, setC2] = useState(0.5);
  const [c3, setC3] = useState(-0.8);
  const abstand = maxAbstand(c1, c2, c3);
  const getroffen = abstand < 0.05;
  const nah = abstand < 0.35;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Stellen wir die drei Koordinaten so ein, dass unsere Kurve die graue Zielkurve trifft.
      </Aufgabe>
      <Plot
        xLabel="t"
        yLabel="f(t)"
        xDomain={[-2, 2]}
        yDomain={[-4, 4]}
        width={320}
        height={250}
        readout
        ariaLabel={`Die Linearkombination ${fmtDe(c1, 1)} + ${fmtDe(c2, 1)}·t + ${fmtDe(c3, 1)}·t² weicht von der Zielkurve um höchstens ${fmtDe(abstand, 2)} ab.`}
        series={[
          { f: zielF, color: FMM_COLORS.grau, dash: [7, 4], label: "Zielkurve" },
          { f: () => c1, color: FMM_COLORS.orange, dash: [3, 3], label: "c₁·1" },
          { f: (t) => c2 * t, color: FMM_COLORS.violett, dash: [3, 3], label: "c₂·t" },
          { f: (t) => c3 * t * t, color: FMM_COLORS.gruen, dash: [3, 3], label: "c₃·t²" },
          { f: (t) => c1 + c2 * t + c3 * t * t, color: FMM_COLORS.blau, label: "f = c₁·1 + c₂·t + c₃·t²" },
        ]}
      />
      <Slider label="c₁ (mal 1)" value={c1} onChange={setC1} min={-2} max={2} step={0.1} accent={FMM_COLORS.orange} />
      <Slider label="c₂ (mal t)" value={c2} onChange={setC2} min={-2} max={2} step={0.1} accent={FMM_COLORS.violett} />
      <Slider label="c₃ (mal t²)" value={c3} onChange={setC3} min={-2} max={2} step={0.1} accent={FMM_COLORS.gruen} />
      <p className={`mt-1 font-mono text-xs ${W_MUTED}`}>
        f(t) = {fmtDe(c1, 1)} + {fmtDe(c2, 1)}·t + {fmtDe(c3, 1)}·t²
      </p>
      <Verdikt kind={getroffen ? "ok" : nah ? "warn" : "neutral"}>
        {getroffen ? (
          <>
            Getroffen: die Zielkurve ist das Polynom mit den Koordinaten (0,6; 0,9; −0,5). Weil die
            drei Monome linear unabhängig sind, gibt es kein zweites Tripel, das dieselbe Kurve
            erzeugt.
          </>
        ) : (
          <>
            Größter Abstand zur Zielkurve: {fmtDe(abstand, 2)}. Solange er nicht null ist, ist es
            ein anderes Polynom – die Koordinaten sind noch nicht die der Zielkurve.
          </>
        )}
      </Verdikt>
    </div>
  );
}
