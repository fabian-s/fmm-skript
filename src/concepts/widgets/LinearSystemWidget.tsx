import { M, Plot } from "../../lib";

export function ZweiGeradenFigur() {
  // statische Abbildung ZUM SYSTEM AUS DEM TEXT: 2x + 3y = 5 und x - y = 1,
  // also y = (5 - 2x)/3 bzw. y = x - 1; Schnittpunkt (8/5, 3/5).
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Plot
        series={[
          { f: (x) => (5 - 2 * x) / 3, color: "#0284c7" },
          { f: (x) => x - 1, color: "#dc2626" },
        ]}
        xDomain={[-2, 4]}
        yDomain={[-3, 3]}
        width={280}
        height={200}
        markers={[{ x: 1.6, y: 0.6, color: "#16a34a", label: "Lösung" }]}
      />
      <p className="mt-1 text-xs">
        Jede der beiden Gleichungen beschreibt eine Gerade:{" "}
        <span style={{ color: "#0284c7" }}>2x + 3y = 5</span> und{" "}
        <span style={{ color: "#dc2626" }}>x − y = 1</span>. Die Lösung des Systems ist ihr
        Schnittpunkt <M>{"(x, y) = (8/5,\\, 3/5)"}</M>.
      </p>
    </div>
  );
}
