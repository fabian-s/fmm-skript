/**
 * DIE EINE EINSICHT: Newton-Schritte minimieren das lokale quadratische Modell;
 * nahe dem Minimum quadriert sich der Fehler in jedem Schritt, weiter weg kann
 * derselbe Schritt weit hinausspringen. FARBROLLEN: blau = f, rot =
 * lokales Modell, orange = Iterierte. PROVENIENZ: neu.
 * VERIFIZIERTE ZAHLEN: `scripts/verify/QA-L2/verify-qa-l2.mjs`, 2026-08-20, prüft
 * x₀ = 2,5 und die Folge 1,72; 1,259340; 1,049741; 1,002320; 1,000005 sowie f(1) = 0,25.
 *
 * FEHLERQUOTIENT (nachgerechnet 2026-08-26, Taschenrechner-Kontrolle):
 * Newton auf f' = x³ − 1 mit Nullstelle r = 1 erfüllt
 * e_{k+1} = (f'''(ξ)/(2 f''(r))) e_k², hier f''' = 6x, f''(1) = 3, also
 * e_{k+1}/e_k² → 6/(2·3) = 1. Für x₀ = 2,5 (node, 2026-08-26):
 *   xₖ = 2,5; 1,72; 1,25934018; 1,04974072; 1,00231968; 1,00000536; 1,00000000
 *   eₖ = 1,5; 7,200e−1; 2,5934e−1; 4,9741e−2; 2,3197e−3; 5,3643e−6; 2,8776e−11
 *   eₖ/eₖ₋₁² = 0,3200; 0,5003; 0,7396; 0,9376; 0,9969; 1,0000 → 1.
 * SONDERFALL x₀ = 1 (über den Regler exakt erreichbar): die Folge steht sofort
 * still, eₖ = 0, und der Quotient wäre 0/0 – die Spalte zeigt dann „–“.
 * RANDFALL: x₀ ≤ 0,34 wirft den ersten Schritt aus dem gezeigten Fenster
 * (x₀ = 0,3: f'(0,3) = −0,973, f''(0,3) = 0,27, x₁ = 0,3 + 3,6037 = 3,9037,
 * xDomain endet bei 3). Das ist kein Zeichenfehler, sondern der flache
 * Krümmungsnenner — das Verdikt sagt das explizit.
 */
import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Stepper, Verdikt, fmtDe } from "../../lib";
const f = (x: number) => x ** 4 / 4 - x + 1,
  fp = (x: number) => x ** 3 - 1,
  fpp = (x: number) => 3 * x * x;
function run(x0: number, n: number) {
  const a = [x0];
  for (let i = 0; i < n; i++) {
    const x = a[i];
    if (Math.abs(fpp(x)) < 1e-5) break;
    a.push(x - fp(x) / fpp(x));
  }
  return a;
}
export function NewtonWidget() {
  const [x0, setX0] = useState(2.5);
  const [k, setK] = useState(0);
  const xs = useMemo(() => run(x0, 6), [x0]);
  const x = xs[Math.min(k, xs.length - 1)];
  const q = (t: number) => f(x) + fp(x) * (t - x) + 0.5 * fpp(x) * (t - x) ** 2;
  // Drei Zustände: Schritt außerhalb des gezeichneten Fensters, nahe am Minimum
  // (dort greift die quadratische Konvergenz sichtbar) und alles dazwischen.
  // Die Iteration bleibt für x₀ > 0 positiv (x_{k+1} = (2x³+1)/(3x²) > 0), nach
  // links kann sie das Fenster also nicht verlassen — nur nach rechts.
  const ausserhalb = x > 3;
  // x₀ = 1 ist über den Regler (Schritt 0,05) erreichbar; der Vergleich läuft über eine
  // Toleranz, weil der Regler seinen Wert nicht bitgenau auf 1 liefern muss.
  const exakt = Math.abs(x0 - 1) < 1e-9;
  const nah = !ausserhalb && !exakt && k > 0 && Math.abs(x - 1) < 0.01;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Wählen wir einen Startpunkt und gehen wir die Newton-Schritte vor und zurück: Wohin
        führt der erste Schritt bei x₀ = 0,3?
      </Aufgabe>
      <Plot
        series={[
          { f, color: FMM_COLORS.blau, label: "f" },
          { f: q, color: FMM_COLORS.rot, dash: [5, 4], label: "lokales Modell" },
        ]}
        xDomain={[-0.5, 3]}
        yDomain={[-1, 9]}
        xLabel="x"
        yLabel="f(x)"
        readout
        markers={[{ x, y: f(x), color: FMM_COLORS.orange, label: "xₖ" }]}
        polylines={[
          {
            pts: xs.map((z) => [z, f(z)] as [number, number]),
            color: FMM_COLORS.orange,
            dash: [3, 2],
            label: "Folge",
          },
        ]}
      />
      <Slider
        label="Startpunkt x₀"
        value={x0}
        onChange={(v) => {
          setX0(v);
          setK(0);
        }}
        min={0.3}
        max={3}
        step={0.05}
        accent={FMM_COLORS.orange}
      />
      <Stepper
        step={k}
        setStep={setK}
        max={Math.min(6, xs.length - 1)}
        narration={`x${"₀₁₂₃₄₅₆₇₈₉"[k] ?? `_${k}`} = ${fmtDe(x, 4)}`}
      />
      <div className="my-1 overflow-x-auto text-xs">
        <table>
          <thead>
            <tr style={{ color: "var(--w-muted)" }}>
              <th className="pr-3 text-left">k</th>
              <th className="text-left">xₖ</th>
              <th className="pl-3 text-left">eₖ=|xₖ−1|</th>
              <th className="pl-3 text-left">eₖ/eₖ₋₁²</th>
            </tr>
          </thead>
          <tbody>
            {xs.slice(0, k + 1).map((z, i) => (
              <tr key={i}>
                <td className="pr-3">{i}</td>
                <td>{fmtDe(z, 5)}</td>
                <td className="pl-3">{fmtDe(Math.abs(z - 1), 5)}</td>
                <td className="pl-3">
                  {i === 0 || Math.abs(xs[i - 1] - 1) < 1e-12
                    ? "–"
                    : fmtDe(Math.abs(z - 1) / (xs[i - 1] - 1) ** 2, 3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Verdikt kind={ausserhalb ? "warn" : exakt || nah ? "ok" : "neutral"}>
        {exakt
          ? `Hier ist f'(x) = 0 schon erfüllt: x = 1 ist der gesuchte kritische Punkt, der Newton-Schritt −f'(x)/f''(x) ist null, die Folge steht still.`
          : ausserhalb
            ? `Dieser Schritt springt aus dem Ausschnitt: x = ${fmtDe(x, 3)} liegt rechts von 3. Bei kleinem x ist die Krümmung f''(x) = 3x² winzig und der Schritt −f'(x)/f''(x) entsprechend groß – Newton ist nur lokal zahm.`
            : nah
              ? `Quadratische Konvergenz: eₖ/eₖ₋₁² pendelt sich bei etwa 1 ein (nachgerechneter Grenzwert f'''(1)/(2f''(1)) = 1), die Zahl der richtigen Stellen verdoppelt sich also pro Schritt.`
              : k === 0
                ? `Startpunkt x₀ = ${fmtDe(x, 2)}. Rot das quadratische Modell in diesem Punkt: dieselbe Höhe, Steigung und Krümmung wie f. Der nächste Schritt springt in dessen Minimum.`
                : `Das lokale quadratische Modell (rot) bestimmt den nächsten Kandidaten; eₖ/eₖ₋₁² ist noch weit von 1 entfernt – so weit vom Minimum ist die Parabel eben keine gute Kopie von f.`}
      </Verdikt>
    </div>
  );
}
