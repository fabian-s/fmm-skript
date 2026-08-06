/** Konzept-Tooltip: binomischer Lehrsatz, Ausmultiplizieren von (x+h)^n (vgl. MML Bsp. 5.2, Gl. (5.5c)). */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let j = 1; j <= k; j++) r = (r * (n - k + j)) / j;
  return Math.round(r);
}

function expansion(n: number): string {
  const terms: string[] = [];
  for (let i = 0; i <= n; i++) {
    const c = choose(n, i);
    const coef = c === 1 ? "" : `${c}\\,`;
    const xPow = n - i === 0 ? "" : n - i === 1 ? "x" : `x^{${n - i}}`;
    const hPow = i === 0 ? "" : i === 1 ? "h" : `h^{${i}}`;
    terms.push(`${coef}${xPow}${hPow}` || "1");
  }
  return `(x+h)^{${n}} = ${terms.join(" + ")}`;
}

function ExpansionWidget() {
  const [n, setN] = useState(3);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Exponent n" value={n} onChange={setN} min={1} max={7} step={1} />
      <MD>{expansion(n)}</MD>
      <p className="mt-1 text-xs text-slate-300">
        Nur der zweite Term ist linear in h; nach Abziehen von xⁿ und Teilen
        durch h überlebt er allein den Grenzübergang h → 0 und liefert die
        Ableitung n·xⁿ⁻¹.
      </p>
    </div>
  );
}

registerConcept({
  id: "binomial-theorem",
  title: "Binomischer Lehrsatz",
  body: (
    <>
      <p>
        Der <em>binomische Lehrsatz</em> (binomial theorem) ist das allgemeine
        Rezept, um die Potenz einer Summe auszumultiplizieren. Die ersten Fälle
        kennen wir aus der Schule:{" "}
        <M>{"(x+h)^2 = x^2 + 2xh + h^2"}</M>. Für jede natürliche Zahl{" "}
        <M>{"n"}</M> gilt
      </p>
      <MD>{"(x+h)^n = \\sum_{i=0}^{n} \\binom{n}{i}\\, x^{n-i} h^{i},"}</MD>
      <p>
        eine Summe (in{" "}
        <ConceptLink id="summation-notation">Summenschreibweise</ConceptLink>)
        über alle Arten, den Exponenten auf <M>{"x"}</M> und <M>{"h"}</M> zu
        verteilen; der{" "}
        <ConceptLink id="binomial-coefficient">Binomialkoeffizient</ConceptLink>{" "}
        <M>{"\\binom{n}{i}"}</M> zählt dabei, wie viele der <M>{"2^n"}</M>{" "}
        rohen Produktterme zum Term <M>{"x^{n-i} h^i"}</M> zusammenfallen. Das
        Ergebnis ist ein{" "}
        <ConceptLink id="polynomial">Polynom</ConceptLink> in <M>{"h"}</M>.
        Genau das nutzt die Rechnung aus (vgl. MML Gl. (5.5c)): das
        Ausmultiplizieren von <M>{"(x+h)^n"}</M> erlaubt, den
        Differenzenquotienten von <M>{"f(x) = x^n"}</M> Term für Term zu
        vereinfachen.
      </p>
      <ExpansionWidget />
    </>
  ),
});
