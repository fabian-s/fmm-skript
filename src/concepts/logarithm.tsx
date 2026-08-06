/** Concept-Tooltip: Logarithmus (Umkehrung des Potenzierens, Basen, Basiswechsel). */
import { M, MD, Plot, registerConcept } from "../lib";

function LogPlot() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Plot
        series={[
          { f: (x) => (x > 0 ? Math.log2(x) : NaN), color: "#dc2626" },
          { f: (x) => (x > 0 ? Math.log(x) : NaN), color: "#0284c7" },
          { f: (x) => (x > 0 ? Math.log10(x) : NaN), color: "#16a34a" },
        ]}
        xDomain={[0, 8]}
        yDomain={[-3, 3.3]}
        width={280}
        height={180}
      />
      <p className="mt-1 text-xs text-slate-300">
        <span className="text-red-400">log₂ x</span>,{" "}
        <span className="text-sky-400">ln x</span>,{" "}
        <span className="text-green-400">log₁₀ x</span>: alle drei schneiden
        die Null bei x = 1, alle wachsen unbeschränkt, aber immer langsamer,
        und jede ist ein konstantes Vielfaches der anderen.
      </p>
    </div>
  );
}

registerConcept({
  id: "logarithm",
  title: "Logarithmus",
  body: (
    <>
      <p>
        Der Logarithmus macht das Potenzieren rückgängig:{" "}
        <M>{"\\log_b(x)"}</M> beantwortet die Frage „<M>{"b"}</M> hoch was
        ergibt <M>{"x"}</M>?“ Also <M>{"\\log_2(8) = 3"}</M>, weil{" "}
        <M>{"2^3 = 8"}</M>. Die gebräuchlichsten Basen sind <M>{"2"}</M>{" "}
        (Bits, Informationstheorie), <M>{"10"}</M> und die Eulersche Zahl{" "}
        <M>{"e \\approx 2{,}718"}</M>, deren Logarithmus wir <M>{"\\ln"}</M>{" "}
        schreiben. Alle Logarithmen sind zueinander proportional. Das sagt
        die Basiswechsel-Regel, mit der wir auch <M>{"\\log_2"}</M>{" "}
        differenzieren können:
      </p>
      <MD>
        {"\\log_2(x) = \\frac{\\ln x}{\\ln 2} \\qquad \\Longrightarrow \\qquad \\frac{\\mathrm{d}}{\\mathrm{d}x} \\log_2(x) = \\frac{1}{x \\ln 2} ."}
      </MD>
      <p>
        Seine wichtigste algebraische Superkraft: er verwandelt Produkte in
        Summen, <M>{"\\log(ab) = \\log(a) + \\log(b)"}</M> – der Grund, warum
        Log-Likelihoods und Entropien (etwa Ausdrücke der Form{" "}
        <M>{"x \\log_2 x"}</M>) so angenehm zu differenzieren sind. Vorsicht:{" "}
        <M>{"\\log_b(x)"}</M> ist nur für <M>{"x > 0"}</M> definiert, und er
        wächst sehr langsam: eine Verdopplung von <M>{"x"}</M> erhöht{" "}
        <M>{"\\log_2(x)"}</M> nur um eine Einheit.
      </p>
      <LogPlot />
    </>
  ),
});
