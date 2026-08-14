import { Plot } from "../../lib";

export function LogPlot() {
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
