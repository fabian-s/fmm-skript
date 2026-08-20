/**
 * Konzept-Widget `differentiability` (Gruppe C, KEEP + Politur 2026-08-19).
 *
 * DIE EINE EINSICHT: Glattheit ist eine Leiter, und man sieht die Stufe erst
 * an den Ableitungen: |x| knickt schon im Graphen, x·|x| sieht glatt aus und
 * knickt erst in der ersten Ableitung, sin springt nirgends.
 *
 * FARBROLLEN: blau = f; rot (gestrichelt) = f′; orange (gepunktet) = f″. Eine
 * Lücke in einer Kurve heißt: dort existiert diese Ableitung nicht.
 *
 * PROVENIENZ: Presets und Beispielfunktionen aus der Vorfassung; neu sind
 * `aria-pressed` auf den Knöpfen (W_BUTTON aus surface.ts), die dritte Kurve
 * f″, Legende und Achsen aus `Plot` v2 sowie das Verdikt statt der
 * Spoiler-Notiz über der Grafik.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-19): d/dx x|x| = 2|x|; die zweite Ableitung von x·|x| ist +2 für
 * x > 0 und −2 für x < 0 und existiert bei 0 nicht. Für sin gilt bei x = 1:
 * f = 0,841471, f′ = 0,540302, f″ = −0,841471.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Verdikt, W_BUTTON, W_BUTTON_AKTIV } from "../../lib";

const LUECKE = 0.02;

type Beispiel = {
  name: string;
  klasse: string;
  f: (x: number) => number;
  df: (x: number) => number;
  d2f: (x: number) => number;
  yDomain: [number, number];
  urteil: string;
  art: "warn" | "ok";
};

const BEISPIELE: Beispiel[] = [
  {
    name: "|x|",
    klasse: "C⁰, aber nicht C¹",
    f: (x) => Math.abs(x),
    df: (x) => (Math.abs(x) < LUECKE ? NaN : Math.sign(x)),
    d2f: (x) => (Math.abs(x) < LUECKE ? NaN : 0),
    yDomain: [-2.2, 2.2],
    urteil:
      "Der Graph selbst hat bei 0 eine Ecke: die Steigung springt von −1 auf +1, ein Grenzwert des Differenzenquotienten existiert dort nicht. Stetig ist f trotzdem, also C⁰ und nicht mehr.",
    art: "warn",
  },
  {
    name: "x·|x|",
    klasse: "C¹, aber nicht C²",
    f: (x) => x * Math.abs(x),
    df: (x) => 2 * Math.abs(x),
    d2f: (x) => (Math.abs(x) < LUECKE ? NaN : 2 * Math.sign(x)),
    yDomain: [-4.4, 4.4],
    urteil:
      "Hier ist der Knick eine Etage höher versteckt: f′(x) = 2|x| existiert überall und ist stetig, aber sie hat selbst eine Ecke bei 0, also springt f″ von −2 auf +2. Das ist genau die Stufe C¹ ohne C².",
    art: "warn",
  },
  {
    name: "sin(x)",
    klasse: "C∞",
    f: (x) => Math.sin(x),
    df: (x) => Math.cos(x),
    d2f: (x) => -Math.sin(x),
    yDomain: [-1.6, 1.6],
    urteil:
      "Keine der Kurven reißt ab: jede Ableitung existiert und ist wieder stetig. Nur solche Funktionen darf ein Taylor-Argument beliebig oft ableiten.",
    art: "ok",
  },
];

export function SmoothnessWidget() {
  const [idx, setIdx] = useState(0);
  const bsp = BEISPIELE[idx];

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Vergleichen wir die drei Beispiele und achten darauf, welche Kurve zuerst reißt.</Aufgabe>
      <div className="my-1 flex flex-wrap gap-1">
        {BEISPIELE.map((e, i) => (
          <button
            key={e.name}
            type="button"
            aria-pressed={i === idx}
            className={`${i === idx ? W_BUTTON_AKTIV : W_BUTTON} font-mono text-xs`}
            onClick={() => setIdx(i)}
          >
            f(x) = {e.name}
          </button>
        ))}
      </div>
      <Plot
        xLabel="x"
        yLabel="f, f′, f″"
        xDomain={[-2, 2]}
        yDomain={bsp.yDomain}
        width={320}
        height={230}
        readout
        ariaLabel={`f(x) = ${bsp.name} mit erster und zweiter Ableitung; Glattheitsklasse ${bsp.klasse}.`}
        series={[
          { f: bsp.f, color: FMM_COLORS.blau, label: "f" },
          { f: bsp.df, color: FMM_COLORS.rot, dash: [5, 4], label: "f′" },
          { f: bsp.d2f, color: FMM_COLORS.orange, dash: [2, 3], label: "f″" },
        ]}
      />
      <Verdikt kind={bsp.art} titel={bsp.klasse}>
        {bsp.urteil}
      </Verdikt>
    </div>
  );
}
