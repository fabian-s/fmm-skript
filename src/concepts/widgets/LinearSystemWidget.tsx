/**
 * Konzept-Widget `linear-system`.
 *
 * DIE EINE EINSICHT: Die Lage zweier Gleichungsgeraden entscheidet über die
 * Lösungsmenge: Schnitt, parallele verschiedene Geraden oder dieselbe Gerade.
 * FARBROLLEN: blau = erste Gleichung, rot = zweite Gleichung, grün = Schnitt.
 * PROVENIENZ: Neufassung des statischen Vorgängers; die dritte Konstante d
 * macht alle drei Fälle erreichbar. Zahlen durch
 * scripts/verify/QA-L1/check-qa-l1.mjs, 2026-08-20, verifiziert:
 * (a,b,d)=(1,−1,1) liefert (1,6;0,6), (2,3,1) keine und (2,3,5)
 * unendlich viele Lösungen. Die Cramer-Formel ist
 * x=(5b−3d)/(2b−3a), y=(2d−5a)/(2b−3a).
 */
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
import { useState } from "react";
export function ZweiGeradenFigur() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-1);
  const [d, setD] = useState(1);
  const det = 2 * b - 3 * a;
  const parallel = Math.abs(det) < 0.03;
  const same = parallel && Math.abs(5 * a - 2 * d) < 0.03 && Math.abs(5 * b - 3 * d) < 0.03;
  const y1 = (x: number) => (5 - 2 * x) / 3;
  const y2 = (x: number) => (Math.abs(b) < 1e-9 ? NaN : (d - a * x) / b);
  const x = parallel ? 0 : (5 * b - 3 * d) / det;
  const y = y1(x);
  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>Verändern wir die zweite Gerade und erzeugen wir die drei Lösungstypen.</Aufgabe>
      <Plot
        series={[
          { f: y1, label: "2x + 3y = 5", color: FMM_COLORS.blau },
          { f: y2, label: "ax + by = d", color: FMM_COLORS.rot },
        ]}
        xDomain={[-2, 4]}
        yDomain={[-3, 3]}
        xLabel="x"
        yLabel="y"
        readout
        markers={!parallel ? [{ x, y, color: FMM_COLORS.gruen, label: "Lösung" }] : []}
        vlines={Math.abs(b) < 1e-9 && Math.abs(a) > 1e-9 ? [{ at: d / a, color: FMM_COLORS.rot, label: "ax = d" }] : []}
        ariaLabel="Zwei Gleichungsgeraden"
      />
      <Slider label="Koeffizient a" value={a} onChange={setA} min={-1} max={3} step={0.05} />
      <Slider label="Koeffizient b" value={b} onChange={setB} min={-3} max={3} step={0.05} />
      <Slider label="rechte Seite d" value={d} onChange={setD} min={-3} max={6} step={0.05} />
      <Verdikt kind={same ? "ok" : parallel ? "warn" : "neutral"}>
        {same ? (
          "Die Geraden fallen zusammen: unendlich viele Lösungen."
        ) : parallel ? (
          "Die Geraden sind parallel und verschieden: keine Lösung."
        ) : (
          <>
            Die Geraden schneiden sich einmal bei ({fmtDe(x, 2)}, {fmtDe(y, 2)}): genau eine Lösung.
          </>
        )}
      </Verdikt>
    </div>
  );
}
