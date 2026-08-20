/**
 * Konzept-Widget `intermediate-value-theorem` (Gruppe C, KEEP + Politur
 * 2026-08-19).
 *
 * DIE EINE EINSICHT: Der Vorzeichenwechsel allein garantiert keine Nullstelle
 * — er tut es nur, weil eine stetige Funktion die Lücke zwischen linkem und
 * rechtem Wert durchlaufen muss. Ein Sprung, der die Null überspringt, hebelt
 * die Bisektion aus.
 *
 * FARBROLLEN: blau = die beiden Äste des Graphen; grau (gestrichelt) = der
 * Sprung bei x = 1 als senkrechte Lücke; rot = Nullstelle, solange es eine
 * gibt.
 *
 * PROVENIENZ: Sprungregler und Funktionsdefinition aus der Vorfassung; neu
 * sind die gezeichnete Sprunglücke, das Verdikt und die Aufgabenzeile. Die
 * erklärende Einleitung steht jetzt in intermediate-value-theorem.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C5/check-alle.mjs,
 * 2026-08-19): f(x) = x²/2 − 1 für x < 1, plus Sprung c ab x = 1. Es gilt
 * immer f(0) = −1 und f(2) = 1 + c > 0; der linke Grenzwert bei x = 1 ist
 * −0,5. Nullstelle x* = √(2(1 − c)) existiert genau für c ≤ 0,5; c = 0 →
 * x* = 1,414214, c = 0,3 → 1,183216, c = 0,5 → 1,000000, c = 0,7 und c = 1,2
 * → keine.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";

export function JumpBreaksIvtWidget() {
  const [c, setC] = useState(0.7);
  const links = (x: number) => (x < 1 ? 0.5 * x * x - 1 : NaN);
  const rechts = (x: number) => (x >= 1 ? 0.5 * x * x - 1 + c : NaN);
  const hatNullstelle = c <= 0.5 + 1e-12;
  const wurzel = hatNullstelle ? Math.sqrt(2 * (1 - c)) : NaN;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Ziehen wir die Sprunghöhe c hoch und verfolgen die rote Nullstelle.</Aufgabe>
      <Plot
        xLabel="x"
        yLabel="f(x)"
        xDomain={[-0.2, 2.2]}
        yDomain={[-1.6, 2.6]}
        width={320}
        height={220}
        readout
        ariaLabel={`Graph mit Sprunghöhe ${fmtDe(c, 2)} bei x gleich 1; ${hatNullstelle ? `Nullstelle bei ${fmtDe(wurzel, 3)}` : "keine Nullstelle"}.`}
        series={[
          { f: links, color: FMM_COLORS.blau, label: "f" },
          { f: rechts, color: FMM_COLORS.blau },
        ]}
        polylines={c > 0.001 ? [{ pts: [[1, -0.5], [1, -0.5 + c]], color: FMM_COLORS.grau, dash: [4, 3], label: "Sprung c" }] : []}
        points={[
          { x: 0, y: -1, color: FMM_COLORS.blau, r: 3.5, label: "f(0) < 0" },
          { x: 2, y: 1 + c, color: FMM_COLORS.blau, r: 3.5, label: "f(2) > 0" },
          ...(hatNullstelle ? [{ x: wurzel, y: 0, color: FMM_COLORS.rot, r: 4, label: "x*" }] : []),
        ]}
      />
      <Slider label="Sprung c" value={c} onChange={setC} min={0} max={1.2} step={0.05} accent={FMM_COLORS.grau} />
      <Verdikt kind={hatNullstelle ? "ok" : "fail"}>
        {hatNullstelle ? (
          <>
            Die Lücke bei x = 1 reicht von −0,5 bis {fmtDe(-0.5 + c, 2)} und liegt damit noch
            unter der Null: der Graph muss die Achse kreuzen, hier bei x* = {fmtDe(wurzel, 3)}.
            Der Vorzeichenwechsel schließt eine Lösung ein, genau wie die Bisektion es braucht.
          </>
        ) : (
          <>
            Jetzt springt der Graph von −0,5 auf {fmtDe(-0.5 + c, 2)}, also über die Null hinweg.
            Die Vorzeichen an den Rändern wechseln weiterhin, eine Nullstelle gibt es trotzdem
            nicht: ohne Stetigkeit ist der Zwischenwertsatz nicht anwendbar, und die Bisektion
            hätte nichts einzuschließen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
