/**
 * Konzept-Figur `ohms-law` (Gruppe C, DEMOTE 2026-08-19).
 *
 * DIE EINE EINSICHT: V = i·R ist eine Ursprungsgerade, und der Widerstand ist
 * nichts als ihre Steigung — der doppelte Widerstand ist die doppelt so steile
 * Gerade.
 *
 * WARUM STATISCH: Der frühere Regler für R hat nur die Steigung einer Geraden
 * verstellt; dieselbe Aussage steht als Zweifach-Figur vollständig da
 * (explorable-widgets: „interactivity isn't always needed"). Die eine
 * interessante Beobachtung — Verdopplung der Steigung — ist so ohne Klick
 * sichtbar.
 * PROVENIENZ: Zweifach-Vergleich aus der Vorfassung; als statische Figur neu
 * gesetzt, weil keine zusätzliche Interaktion eine weitere Einsicht erzeugt.
 *
 * FARBROLLEN: blau = R = 2 Ω; orange = R = 4 Ω; graue Punkte = abgelesene
 * Spannung bei i = 1,5 A.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-L2/verify-qa-l2.mjs,
 * 2026-08-20): bei i = 1,5 A ist V = 3,0 V (R = 2 Ω) bzw. V = 6,0 V
 * (R = 4 Ω); das Verhältnis der Steigungen ist exakt 2.
 */
import { Aufgabe, FMM_COLORS, Plot, Verdikt } from "../../lib";

export function OhmWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Vergleichen wir die beiden Steigungen bei derselben Stromstärke.</Aufgabe>
      <Plot
        xLabel="Stromstärke i (A)"
        yLabel="Spannung V (V)"
        xDomain={[0, 2]}
        yDomain={[0, 9]}
        width={320}
        height={200}
        ariaLabel="Zwei Ursprungsgeraden: V = 2i und V = 4i; bei i = 1,5 A liegen die Spannungen bei 3 V und 6 V."
        series={[
          { f: (i) => 2 * i, color: FMM_COLORS.blau, label: "R = 2 Ω" },
          { f: (i) => 4 * i, color: FMM_COLORS.orange, label: "R = 4 Ω" },
        ]}
        points={[
          { x: 1.5, y: 3, color: FMM_COLORS.blau, r: 3.5, label: "3 V" },
          { x: 1.5, y: 6, color: FMM_COLORS.orange, r: 3.5, label: "6 V" },
        ]}
        vlines={[{ at: 1.5, color: FMM_COLORS.grau, dash: [4, 4] }]}
      />
      <Verdikt kind="neutral">
        Bei i = 1,5 A liefert R = 2 Ω die Spannung 3 V und R = 4 Ω die Spannung 6 V. Der doppelte
        Widerstand verdoppelt also die Steigung der Ursprungsgeraden.
      </Verdikt>
    </div>
  );
}
