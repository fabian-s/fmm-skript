/**
 * DIE EINE EINSICHT: Gewichte, Abstand und Breite bestimmen die sichtbare Gestalt einer Mischung.
 * FARBROLLEN: blau = Mischdichte; grün/rot = Komponenten. PROVENIENZ: Originalwidget;
 * das Verdikt zählt seit 2026-08-26 die Moden der Mischdichte nach, statt die
 * Faustregel „Abstand > 2σ und 0,15 < π₁ < 0,85“ als allgemeine
 * Trennbarkeitsgrenze auszugeben (Audit 2026-08-26).
 *
 * VERIFIZIERTE ZAHLEN (Gaußdichte normiert: node, scripts/verify/QA-L0/
 * verify-qa-l0.mjs, 2026-08-20; Modenzahlen nachgerechnet 2026-08-26, Zählung
 * gitterunabhängig für N = 600, 1200, 2400, 4800 Stützstellen auf [−6, 6]):
 *   π₁ = 0,5, σ = 0,7: eine Mode für Abstand ≤ 1,4, zwei ab Abstand 1,6.
 *     Das passt zur bekannten Grenze 2σ = 1,4 bei gleichen Gewichten.
 *   π₁ = 0,2, σ = 0,7: eine Mode noch bei Abstand 2,0, zwei erst ab 2,2 –
 *     ein ungleiches Gewicht verschiebt die Grenze also nach oben.
 *   Abstand 2,5 und σ = 0,7: zwei Moden für π₁ = 0,10 … 0,90, eine für
 *     π₁ = 0,05 und π₁ = 0,95. Die alte Regel nannte π₁ = 0,10 fälschlich
 *     „nicht getrennt“.
 *   Voreinstellung (π₁ = 0,5; Abstand 2,5; σ = 0,7): zwei Moden.
 */
import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_MUTED, fmtDe } from "../../lib";
const g = (x: number, m: number, s: number) =>
  Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));

/** Lokale Maxima auf einem festen Gitter über [−6, 6] auszählen. */
function modenZahl(f: (x: number) => number): number {
  const a = -6;
  const N = 1200;
  const st = 12 / N;
  let n = 0;
  let vor = f(a);
  let jetzt = f(a + st);
  for (let i = 2; i <= N; i++) {
    const nach = f(a + i * st);
    if (jetzt > vor && jetzt >= nach) n++;
    vor = jetzt;
    jetzt = nach;
  }
  return n;
}

export function MixtureWidget() {
  const [p, setP] = useState(0.5);
  const [gap, setGap] = useState(2.5);
  const [s, setS] = useState(0.7);
  const l = -gap / 2,
    r = gap / 2;
  const mix = useMemo(
    () => (x: number) => p * g(x, l, s) + (1 - p) * g(x, r, s),
    [p, l, r, s]
  );
  const moden = useMemo(() => modenZahl(mix), [mix]);
  const getrennt = moden >= 2;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verändern wir Gewicht, Abstand und Breite der beiden Komponenten.</Aufgabe>
      <Plot
        series={[
          {
            f: (x) => p * g(x, l, s),
            color: FMM_COLORS.gruen,
            dash: [5, 4],
            label: "Komponente 1",
          },
          {
            f: (x) => (1 - p) * g(x, r, s),
            color: FMM_COLORS.rot,
            dash: [5, 4],
            label: "Komponente 2",
          },
          { f: mix, color: FMM_COLORS.blau, label: "Mischdichte" },
        ]}
        xDomain={[-4, 4]}
        yDomain={[0, 1]}
        xLabel="x"
        yLabel="Dichte"
        readout
        ariaLabel={`Zwei Gaußkomponenten und ihre Mischdichte; die Mischdichte hat ${getrennt ? "zwei lokale Maxima" : "ein lokales Maximum"}.`}
      />
      <Slider
        label="Gewicht π₁"
        value={p}
        onChange={setP}
        min={0.05}
        max={0.95}
        step={0.01}
        accent={FMM_COLORS.gruen}
      />
      <Slider label="Abstand μ₂−μ₁" value={gap} onChange={setGap} min={0.4} max={4} step={0.1} />
      <Slider
        label="Breite σ (Standardabweichung)"
        value={s}
        onChange={setS}
        min={0.25}
        max={1.4}
        step={0.05}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        Die Zahl der Hügel wird als Zahl der lokalen Maxima der Mischdichte auf einem Gitter über
        [−6, 6] ausgezählt.
      </p>
      <Verdikt kind={getrennt ? "ok" : "neutral"}>
        {getrennt
          ? `Die Mischdichte hat hier zwei lokale Maxima: zwei getrennte Hügel. Abstand/σ = ${fmtDe(gap / s, 2)}.`
          : `Die Mischdichte hat hier nur ein lokales Maximum: ein einziger, womöglich schiefer Hügel. Abstand/σ = ${fmtDe(gap / s, 2)}.`}
      </Verdikt>
    </div>
  );
}
