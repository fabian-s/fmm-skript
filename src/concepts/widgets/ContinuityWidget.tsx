/**
 * Konzept-Widget für `continuity` UND `continuous-function`
 * (Dublettenauflösung D6, 2026-08-19; das frühere ContinuousFunctionWidget
 * ist entfallen).
 *
 * DIE EINE EINSICHT: Stetigkeit ist keine Aussage über den Graphen im Großen,
 * sondern über das Zusammenschrumpfen: verkleinern wir das Eingabefenster um
 * x = 1, so geht die Ausgabespanne bei c = 0 gegen null — bei jedem anderen c
 * bleibt sie bei |c| stehen, egal wie klein das Fenster wird.
 *
 * FARBROLLEN: blau = der linke Ast (und der ganze Graph bei c = 0);
 * rot = der um c verschobene rechte Ast, also der Sprung; orange = das
 * Eingabefenster [1 − δ, 1 + δ] und die daraus entstehende Ausgabespanne.
 *
 * PROVENIENZ: Sprungfunktion und Plot-Aufbau aus dem Vorgängerwidget
 * ContinuityWidget (Stand 2026-08-18), Fenster-Idee aus dem entfallenen
 * ContinuousFunctionWidget; Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-20; zusätzlich der Spannen-Test), f(x) = 0,5x² links, 0,5x² + c rechts,
 * Ausgabespanne auf [1 − δ, 1 + δ] (20 001 Proben):
 *   c = 0:    δ = 1 → 2,000; 0,5 → 1,000; 0,2 → 0,400; 0,05 → 0,100; 0,01 → 0,020
 *   c = 0,5:  δ = 1 → 2,500; 0,5 → 1,500; 0,2 → 0,900; 0,05 → 0,600; 0,01 → 0,520
 *   c = 1:    δ = 1 → 3,000; 0,5 → 2,000; 0,2 → 1,400; 0,05 → 1,100; 0,01 → 1,020
 *   c = −0,8: δ = 0,05 → 0,800; 0,01 → 0,800
 * Die Spanne strebt also gegen |c|. Die geschlossene Formel, die das Widget
 * rechnet (max(0,5; 0,5(1+δ)²+c) − min(0,5(1−δ)²; 0,5+c)), stimmt mit der
 * Abtastung bis auf 5,0e−5 überein (das ist die Rasterweite).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";

export function JumpWidget() {
  const [c, setC] = useState(0.8);
  const [delta, setDelta] = useState(0.6);

  const links = (x: number) => (x < 1 ? 0.5 * x * x : NaN);
  const rechts = (x: number) => (x >= 1 ? 0.5 * x * x + c : NaN);

  const oben = Math.max(0.5, 0.5 * (1 + delta) ** 2 + c);
  const unten = Math.min(0.5 * (1 - delta) ** 2, 0.5 + c);
  const spanne = oben - unten;
  const stetig = Math.abs(c) < 1e-9;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Verkleinern wir das Fenster δ um x = 1 und beobachten wir, was aus der Ausgabespanne wird.
      </Aufgabe>
      <Slider label="Sprunghöhe c" value={c} onChange={setC} min={-1.5} max={1.5} step={0.05} accent={FMM_COLORS.rot} />
      <Slider label="Fensterbreite δ" value={delta} onChange={setDelta} min={0.02} max={1} step={0.01} accent={FMM_COLORS.orange} />
      <Plot
        series={[
          { f: links, color: FMM_COLORS.blau, label: "f(x) für x < 1" },
          { f: rechts, color: FMM_COLORS.rot, label: "f(x) für x ≥ 1" },
        ]}
        xDomain={[-2, 2.2]}
        yDomain={[-1.7, 4.2]}
        width={330}
        height={210}
        xLabel="x"
        yLabel="f(x)"
        vlines={[
          { at: 1 - delta, color: FMM_COLORS.orange, dash: [4, 3] },
          { at: 1 + delta, color: FMM_COLORS.orange, dash: [4, 3] },
        ]}
        hlines={[
          { at: unten, color: FMM_COLORS.orange, dash: [4, 3] },
          { at: oben, color: FMM_COLORS.orange, dash: [4, 3], label: "Ausgabespanne" },
        ]}
        points={[
          { x: 1, y: 0.5, color: FMM_COLORS.blau },
          { x: 1, y: 0.5 + c, color: FMM_COLORS.rot },
        ]}
        ariaLabel={`Graph mit Sprunghöhe ${fmtDe(c, 2)} bei x gleich 1; im Fenster der Breite ${fmtDe(2 * delta, 2)} beträgt die Ausgabespanne ${fmtDe(spanne, 3)}.`}
      />
      <Verdikt kind={stetig ? "ok" : "fail"}>
        Eingabefenster {fmtDe(2 * delta, 2)} breit, Ausgabespanne {fmtDe(spanne, 3)}.{" "}
        {stetig
          ? "Beide schrumpfen gemeinsam gegen null: genau das verlangt die Definition der Stetigkeit in x = 1."
          : `Schieben wir δ weiter nach unten, bleibt die Spanne bei ${fmtDe(Math.abs(c), 2)} = |c| hängen. Keine noch so kleine Eingabeumgebung erzwingt eine kleine Ausgabeänderung, also ist f in x = 1 unstetig.`}
      </Verdikt>
    </div>
  );
}
