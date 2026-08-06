import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/**
 * Spielzeug-Zahlenstrahl für Gleitkommazahlen: alle darstellbaren Zahlen in
 * [1, 8] bei t Mantissenbits; der Abstand verdoppelt sich an jeder
 * Zweierpotenz.
 */
function FloatGapWidget() {
  const [t, setT] = useState(3);
  const W = 300;
  const H = 46;
  const x0 = 1;
  const x1 = 8;
  const toPx = (x: number) => ((x - x0) / (x1 - x0)) * (W - 20) + 10;
  const ticks: number[] = [];
  for (let e = 0; e < 3; e++) {
    const base = Math.pow(2, e); // Binade [2^e, 2^{e+1})
    const gap = base * Math.pow(2, -t);
    for (let x = base; x < 2 * base - 1e-12; x += gap) ticks.push(x);
  }
  ticks.push(8);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="Mantissenbits t"
        value={t}
        onChange={setT}
        min={2}
        max={5}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="rounded border border-slate-600 bg-slate-800"
      >
        <line x1={10} y1={26} x2={W - 10} y2={26} stroke="#94a3b8" strokeWidth={1} />
        {ticks.map((x, i) => (
          <line
            key={i}
            x1={toPx(x)}
            y1={18}
            x2={toPx(x)}
            y2={34}
            stroke="#38bdf8"
            strokeWidth={1}
          />
        ))}
        {[1, 2, 4, 8].map((x) => (
          <text
            key={x}
            x={toPx(x)}
            y={44}
            textAnchor="middle"
            fontSize={9}
            fill="#cbd5e1"
          >
            {x}
          </text>
        ))}
      </svg>
      <p className="mt-1 text-xs opacity-80">
        Alle darstellbaren Zahlen eines Spielzeug-Systems mit {t} Mantissenbits
        zwischen 1 und 8. Die Lücke direkt rechts von 1 ist{" "}
        <span className="font-mono">
          2<sup>&minus;{t}</sup> = {Math.pow(2, -t)}
        </span>
        ; genau diese Lücke ist <M>{"\\varepsilon_{\\text{mach}}"}</M>. Die
        Lücken verdoppeln sich an jeder Zweierpotenz, der <em>relative</em>{" "}
        Abstand bleibt also überall gleich.
      </p>
    </div>
  );
}

registerConcept({
  id: "machine-epsilon",
  title: "Maschinengenauigkeit (machine epsilon)",
  body: (
    <>
      <p>
        Computer speichern reelle Zahlen als{" "}
        <ConceptLink id="floating-point">Gleitkommazahlen</ConceptLink> mit
        einer festen Anzahl signifikanter Stellen. Zwischen zwei benachbarten
        darstellbaren Zahlen klafft also immer eine Lücke. Die{" "}
        <em>Maschinengenauigkeit</em> (engl. <em>machine epsilon</em>){" "}
        <M>{"\\varepsilon_{\\text{mach}}"}</M> ist die Größe dieser Lücke
        direkt neben der 1: der Abstand von <M>{"1"}</M> zur nächstgrößeren
        darstellbaren Zahl. Im üblichen Format mit doppelter Genauigkeit gilt
      </p>
      <MD>{"\\varepsilon_{\\text{mach}} = 2^{-52} \\approx 2{,}2 \\times 10^{-16},"}</MD>
      <p>
        also etwa 16 signifikante Dezimalstellen. Eine beliebige reelle Zahl{" "}
        <M>{"x"}</M> zu speichern heißt, sie auf den nächsten darstellbaren
        Wert zu runden. Das verursacht einen <em>relativen</em> Fehler von
        höchstens etwa <M>{"\\varepsilon_{\\text{mach}}"}</M>, die
        grundlegende Auflösungsgrenze hinter jedem{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink>.
        Konkrete Konsequenz: In doppelter Genauigkeit ergibt die Summe{" "}
        <M>{"1 + 10^{-17}"}</M> exakt <M>{"1"}</M>, denn das wahre Ergebnis
        liegt innerhalb der Lücke und wird wieder heruntergerundet.
      </p>
      <p>
        Die Größe{" "}
        <M>{"\\sqrt{\\varepsilon_{\\text{mach}}} \\approx 10^{-8}"}</M> taucht
        immer dann auf, wenn ein Effekt der Größe <M>{"\\varepsilon^2"}</M>{" "}
        gegen einen der Größe <M>{"\\varepsilon"}</M> abgewogen wird: Wählen
        wir <M>{"\\varepsilon"}</M> nahe{" "}
        <M>{"\\sqrt{\\varepsilon_{\\text{mach}}}"}</M>, fällt{" "}
        <M>{"\\varepsilon^2"}</M> gerade unter die Auflösung der Arithmetik.
        Genau nach diesem Prinzip wählt man z.&nbsp;B. Störungs- und
        Schrittweiten in numerischen Verfahren.
      </p>
      <FloatGapWidget />
    </>
  ),
});
