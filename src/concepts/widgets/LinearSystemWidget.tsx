/** Einsicht: Lage zweier Geraden kodiert genau eine, keine oder unendlich viele Lösungen. Farben: blau/rot Gleichungen, grün Schnitt. Provenienz: neu. Zahlen: keine festen Verdiktzahlen (2026-08-19). */
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
import { useState } from "react";
export function ZweiGeradenFigur() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-1);
  const det = 2 * b - 3 * a;
  const parallel = Math.abs(det) < 0.03;
  const same = parallel && Math.abs(a - 2) < 0.03 && Math.abs(b - 3) < 0.03;
  const y1 = (x: number) => (5 - 2 * x) / 3;
  const y2 = (x: number) => (1 - a * x) / b;
  const x = parallel ? 0 : (3 - 5 * b) / det;
  const y = y1(x);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verändern wir die zweite Gerade und erzeugen wir die drei Lösungstypen.</Aufgabe>
      <Plot
        series={[
          { f: y1, label: "2x + 3y = 5", color: FMM_COLORS.blau },
          { f: y2, label: "ax + by = 1", color: FMM_COLORS.rot },
        ]}
        xDomain={[-2, 4]}
        yDomain={[-3, 3]}
        xLabel="x"
        yLabel="y"
        readout
        markers={!parallel ? [{ x, y, color: FMM_COLORS.gruen, label: "Lösung" }] : []}
        ariaLabel="Zwei Gleichungsgeraden"
      />
      <Slider label="Koeffizient a" value={a} onChange={setA} min={-1} max={3} step={0.05} />
      <Slider label="Koeffizient b" value={b} onChange={setB} min={-3} max={3} step={0.05} />
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
