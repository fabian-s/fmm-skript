import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/** Ziffernbild der Auslöschung: gemeinsame führende Ziffern heben sich weg. */
function DigitWidget() {
  const [k, setK] = useState(4);
  const a = 1.23456789;
  const b = a * (1 - Math.pow(10, -k)); // teilt ~k führende Ziffern mit a
  const d = a - b;
  const sa = a.toFixed(10);
  const sb = b.toFixed(10);
  let p = 0;
  while (p < sa.length && sa[p] === sb[p]) p++;
  const factor = Math.abs(a / d);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="gemeinsame Ziffern k"
        value={k}
        onChange={setK}
        min={1}
        max={8}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div className="font-mono text-xs leading-5">
        <div>
          a &nbsp;= <span className="text-red-400 line-through">{sa.slice(0, p)}</span>
          <span className="text-emerald-400">{sa.slice(p)}</span>
        </div>
        <div>
          b &nbsp;= <span className="text-red-400 line-through">{sb.slice(0, p)}</span>
          <span className="text-emerald-400">{sb.slice(p)}</span>
        </div>
        <div>
          a−b = {d.toExponential(3)} &nbsp;&nbsp;(Verstärkungsfaktor ≈ {factor.toExponential(1)})
        </div>
      </div>
      <p className="mt-1 text-xs opacity-80">
        Die durchgestrichenen führenden Ziffern sind in <M>{"a"}</M> und <M>{"b"}</M> identisch
        und heben sich bei der Subtraktion exakt weg — nur der grüne Rest trägt Information.
        Tragen <M>{"a"}</M> und <M>{"b"}</M> je einen relativen Rundungsfehler{" "}
        <M>{"\\approx \\eps_{\\text{mach}}"}</M>, dann trägt <M>{"a - b"}</M> ungefähr den{" "}
        <M>{"|a| / |a - b| \\approx 10^{k}"}</M>-fachen relativen Fehler.
      </p>
    </div>
  );
}

registerConcept({
  id: "cancellation",
  title: "Auslöschung",
  body: (
    <>
      <p>
        <em>Auslöschung</em> (catastrophic cancellation) passiert, wenn wir zwei fast gleich
        große <ConceptLink id="floating-point">Gleitkommazahlen</ConceptLink> voneinander
        abziehen: Ihre gemeinsamen führenden Ziffern heben sich exakt weg, und übrig bleiben
        nur die hinteren Ziffern — genau die, die von früheren{" "}
        <ConceptLink id="rounding-error">Rundungsfehlern</ConceptLink> verseucht sind. Die
        Subtraktion selbst ist dabei exakt; sie <em>erzeugt</em> keinen Fehler, sondern{" "}
        <em>verstärkt</em> die schon vorhandenen: Der relative Fehler wächst ungefähr um den
        Faktor
      </p>
      <MD>{"\\frac{|a|}{|a - b|} \\gg 1 \\qquad \\text{für } a \\approx b."}</MD>
      <p>
        Stimmen <M>{"a"}</M> und <M>{"b"}</M> in <M>{"k"}</M> führenden Ziffern überein,
        verlieren wir etwa <M>{"k"}</M> der rund 16 signifikanten Dezimalstellen, die uns die{" "}
        <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink> lässt.
        Klassisches Beispiel aus den Folien: Die Varianz-„Formel"{" "}
        <M>{"\\tfrac{1}{n}\\sum_i x_i^2 - \\bar{x}^2"}</M> subtrahiert für Daten um{" "}
        <M>{"10^9"}</M> zwei Zahlen der Größe <M>{"10^{18}"}</M> — das Ergebnis kann sogar
        negativ werden.
      </p>
      <p>
        Die Kur ist nie „genauer rechnen", sondern <em>umformen</em>, sodass keine fast
        gleichen Zahlen subtrahiert werden. In diesem Kapitel: Beim Householder-Vektor{" "}
        <M>{"v_1 = a_1 - \\alpha"}</M> wählen wir das Vorzeichen{" "}
        <M>{"\\alpha = -\\sign(a_1)\\,\\|\\ba\\|_2"}</M>, damit aus der gefährlichen
        Subtraktion eine harmlose Addition gleicher Vorzeichen wird.
      </p>
      <DigitWidget />
    </>
  ),
});
