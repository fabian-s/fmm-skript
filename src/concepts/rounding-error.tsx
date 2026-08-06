import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/** Katastrophale Auslöschung live: (1 - cos x)/x^2 in echter double precision. */
function CancellationWidget() {
  const [k, setK] = useState(4);
  const x = Math.pow(10, -k);
  const naive = (1 - Math.cos(x)) / (x * x);
  const s = Math.sin(x / 2);
  const stable = (2 * s * s) / (x * x);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="Exponent k"
        value={k}
        onChange={setK}
        min={1}
        max={9}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div className="font-mono text-xs leading-5">
        <div>x = 1e-{k}</div>
        <div>
          naiv&nbsp;&nbsp;(1 &minus; cos x)/x&sup2; ={" "}
          <span className={Math.abs(naive - 0.5) > 1e-4 ? "text-red-400" : "text-emerald-400"}>
            {naive.toPrecision(10)}
          </span>
        </div>
        <div>
          stabil&nbsp;2&thinsp;sin&sup2;(x/2)/x&sup2; ={" "}
          <span className="text-emerald-400">{stable.toPrecision(10)}</span>
        </div>
      </div>
      <p className="mt-1 text-xs opacity-80">
        Beide Formeln sind mathematisch identisch, mit Wert{" "}
        <M>{"\\to 1/2"}</M> für <M>{"x \\to 0"}</M>. Das hier sind die echten
        Double-Precision-Ergebnisse dieses Browsers, live berechnet: Bei{" "}
        <M>{"x = 10^{-8}"}</M> hat die naive Variante <M>{"\\cos x"}</M> exakt
        als 1 berechnet, und die Subtraktion liefert 0; jede korrekte Ziffer
        ist weg. Die stabile Variante subtrahiert nie fast gleich große Zahlen.
      </p>
    </div>
  );
}

registerConcept({
  id: "rounding-error",
  title: "Rundungsfehler",
  body: (
    <>
      <p>
        Weil ein Computer pro{" "}
        <ConceptLink id="floating-point">Gleitkommazahl</ConceptLink> nur etwa
        16 signifikante Ziffern speichert, ist das exakte Ergebnis einer
        Rechenoperation meistens nicht darstellbar und muss auf die nächste
        darstellbare Zahl gerundet werden. Jede Operation begeht darum einen{" "}
        <em>Rundungsfehler</em> (rounding error): einen relativen Fehler von
        höchstens etwa{" "}
        <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>,
      </p>
      <MD>
        {"\\frac{|\\operatorname{fl}(x \\circ y) - (x \\circ y)|}{|x \\circ y|} \\;\\le\\; \\varepsilon_{\\text{mach}} \\approx 2{,}2 \\times 10^{-16}."}
      </MD>
      <p>
        Einzeln sind diese Fehler mikroskopisch, und in einer langen Rechnung
        bleiben sie meist harmlos. Sichtbar werden sie klassischerweise durch{" "}
        <em>katastrophale Auslöschung</em> (catastrophic cancellation): Ziehen
        wir zwei fast gleich große Zahlen voneinander ab, heben sich ihre
        gemeinsamen führenden Ziffern weg, und was übrig bleibt, wird von den
        vorher begangenen Rundungsfehlern dominiert. In 6-stelliger Arithmetik
        ist <M>{"1{,}23457 - 1{,}23456 = 0{,}00001"}</M>: von sechs
        gespeicherten Ziffern überlebt nur eine einzige (ohnehin unsichere)
        Ziffer.
      </p>
      <p>
        Rundungsfehler ziehen eine harte Untergrenze für alle
        Genauigkeitsfragen ein: Jede Eingabematrix ist sowieso nur bis auf
        relative Störungen der Größenordnung{" "}
        <M>{"\\varepsilon_{\\text{mach}}"}</M> bekannt. Eine Störung dieser
        Größe ist also kein künstlicher Extremfall, sondern der Alltag;
        wie viel Schaden so eine Störung anrichten kann, misst genau die{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink>.
      </p>
      <CancellationWidget />
    </>
  ),
});
