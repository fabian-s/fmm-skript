/**
 * DIE EINE EINSICHT: Newton-Schritte minimieren das lokale quadratische Modell
 * und werden nahe dem Minimum rasch genauer. FARBROLLEN: blau = f, rot =
 * lokales Modell, orange = Iterierte. PROVENIENZ: neu.
 * VERIFIZIERTE ZAHLEN: `scripts/verify/QA-L2/verify-qa-l2.mjs`, 2026-08-20, prüft
 * x₀ = 2,5 und die Folge 1,72; 1,259340; 1,049741; 1,002320; 1,000005 sowie f(1) = 0,25.
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
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Wählen wir einen Startpunkt und gehen wir die Newton-Schritte vor und zurück.
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
        narration={`x_${k} = ${fmtDe(x, 4)}`}
      />
      <div className="my-1 overflow-x-auto text-xs">
        <table>
          <tbody>
            {xs.slice(0, k + 1).map((z, i) => (
              <tr key={i}>
                <td className="pr-3">k={i}</td>
                <td>xₖ={fmtDe(z, 5)}</td>
                <td className="pl-3">|xₖ−1|={fmtDe(Math.abs(z - 1), 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Verdikt kind={Math.abs(x - 1) < 0.01 ? "ok" : "neutral"}>
        {Math.abs(x - 1) < 0.01
          ? "Nahe beim Minimum schrumpft der Fehler sehr schnell."
          : "Das lokale quadratische Modell bestimmt den nächsten Kandidaten."}
      </Verdikt>
    </div>
  );
}
