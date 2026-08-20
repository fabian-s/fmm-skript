/**
 * Konzept-Widget `tangent-line` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: „Lokal linear" ist keine Redensart, sondern eine
 * quadratisch schrumpfende Zahl: halbiert man die Fensterbreite, viertelt sich
 * der größte Abstand zwischen Kurve und Tangente.
 *
 * FARBROLLEN: blau = f(x) = x²; rot (gestrichelt) = Tangente y = 2x − 1;
 * roter Punkt = Berührpunkt (1, 1).
 *
 * PROVENIENZ: Zoom-Regler aus der Vorfassung; neu sind der Abweichungs-Readout
 * (max |f − Tangente| im Fenster), das Verdikt und die Aufgabenzeile. Die
 * Auflösung („wird ununterscheidbar") steht jetzt in tangent-line.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C5/check-alle.mjs,
 * 2026-08-19): mit halber Fensterbreite w ist max|x² − (2x − 1)| = w² exakt;
 * gemessen w = 1,6 → 2,560; w = 0,8 → 0,640; w = 0,4 → 0,160; w = 0,2 →
 * 0,040; w = 0,1 → 0,010; w = 0,05 → 0,0025. Bezogen auf die Fensterhöhe
 * 4,4·w sinkt der Abstand von 36,4 % (Zoom 1×) auf 1,1 % (Zoom 32×).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";

const A = 1;

export function ZoomWidget() {
  const [zoom, setZoom] = useState(0);
  const w = 1.6 / Math.pow(2, zoom); // halbe Breite des Sichtfensters
  const maxAbstand = w * w; // max |x² − (2x − 1)| = (x − 1)² am Fensterrand
  const anteil = maxAbstand / (4.4 * w); // Abstand relativ zur Fensterhöhe

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Zoomen wir in den Berührpunkt hinein und beobachten den Abstand der beiden Kurven.</Aufgabe>
      <Plot
        xLabel="x"
        yLabel="y"
        xDomain={[A - w, A + w]}
        yDomain={[1 - 2.2 * w, 1 + 2.2 * w]}
        width={320}
        height={210}
        readout
        ariaLabel={`Parabel und Tangente im Fenster der halben Breite ${fmtDe(w, 3)}; größter Abstand ${fmtDe(maxAbstand, 4)}.`}
        series={[
          { f: (x) => x * x, color: FMM_COLORS.blau, label: "f(x) = x²" },
          { f: (x) => 2 * x - 1, color: FMM_COLORS.rot, dash: [5, 4], label: "Tangente 2x − 1" },
        ]}
        points={[{ x: 1, y: 1, color: FMM_COLORS.rot, r: 3.5 }]}
      />
      <Slider
        label="Zoom"
        value={zoom}
        onChange={setZoom}
        min={0}
        max={5}
        step={0.1}
        fmt={(v) => `${fmtDe(Math.pow(2, v), 1)}×`}
      />
      <Verdikt kind={anteil < 0.03 ? "ok" : "neutral"}>
        Im Fenster der halben Breite {fmtDe(w, 3)} liegen Kurve und Tangente höchstens{" "}
        {fmtDe(maxAbstand, 4)} auseinander, also {fmtDe(100 * anteil, 1)} % der Fensterhöhe. Der
        Abstand ist genau (x − 1)²: mit jeder Halbierung der Breite viertelt er sich, während das
        Fenster nur halb so hoch wird.
      </Verdikt>
    </div>
  );
}
