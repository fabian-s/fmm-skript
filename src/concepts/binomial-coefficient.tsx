/** Konzept-Tooltip: Binomialkoeffizient „n über i" (vgl. MML Bsp. 5.2). */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let j = 1; j <= k; j++) r = (r * (n - k + j)) / j;
  return Math.round(r);
}

function ChooseWidget() {
  const [n, setN] = useState(5);
  const [kRaw, setKRaw] = useState(2);
  const k = Math.min(kRaw, n);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="n" value={n} onChange={setN} min={0} max={10} step={1} />
      <Slider label="i" value={kRaw} onChange={setKRaw} min={0} max={10} step={1} />
      <MD>{`\\binom{${n}}{${k}} = \\frac{${n}!}{${k}!\\,(${n - k})!} = ${choose(n, k)}`}</MD>
      <p className="mt-1 text-xs text-slate-300">
        {`Es gibt ${choose(n, k)} Möglichkeiten, ${k} Objekt${k === 1 ? "" : "e"} aus ${n} auszuwählen.`}
        {kRaw > n ? " (i ist bei n gedeckelt — wir können nicht mehr auswählen, als da ist.)" : ""}
      </p>
    </div>
  );
}

registerConcept({
  id: "binomial-coefficient",
  title: "Binomialkoeffizient",
  body: (
    <>
      <p>
        Der Binomialkoeffizient <M>{"\\binom{n}{i}"}</M> (gelesen &bdquo;n über
        i&ldquo;) zählt, auf wie viele Arten wir <M>{"i"}</M> Objekte aus{" "}
        <M>{"n"}</M> auswählen können, wenn die Reihenfolge keine Rolle spielt.
        Berechnet wird er aus{" "}
        <ConceptLink id="factorial">Fakultäten</ConceptLink>:
      </p>
      <MD>{"\\binom{n}{i} = \\frac{n!}{i!\\,(n-i)!}, \\qquad \\text{z.B. } \\binom{4}{2} = \\frac{24}{2 \\cdot 2} = 6."}</MD>
      <p>
        Aus der Einführungsstatistik kennen wir ihn als Zählfaktor der
        Binomialverteilung. Hier taucht er aus einem anderen Grund auf: wenn
        wir <M>{"(x+h)^n"}</M> über den{" "}
        <ConceptLink id="binomial-theorem">binomischen Lehrsatz</ConceptLink>{" "}
        ausmultiplizieren, zählt <M>{"\\binom{n}{i}"}</M>, wie viele der
        Produktterme genau <M>{"i"}</M> Faktoren <M>{"h"}</M> enthalten
        (vgl. MML Bsp. 5.2). Nützliche Spezialwerte:{" "}
        <M>{"\\binom{n}{0} = 1"}</M> und <M>{"\\binom{n}{1} = n"}</M> &mdash;
        letzterer liefert den Koeffizienten <M>{"n"}</M>, der in der Ableitung{" "}
        <M>{"n x^{n-1}"}</M> übrig bleibt.
      </p>
      <ChooseWidget />
    </>
  ),
});
