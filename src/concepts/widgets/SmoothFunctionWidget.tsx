/** Widget zum Konzept-Tooltip „Glatte Funktion": x²/2 (glatt) gegen |x| (Knick). */
import { Plot } from "../../lib";

export function SmoothPlot() {
  return (
    <Plot
      series={[
        { f: (x) => 0.5 * x * x, color: "#0284c7", label: "glatt" },
        { f: (x) => Math.abs(x), color: "#dc2626", dash: [5, 4], label: "Knick" },
      ]}
      xDomain={[-2, 2]}
      yDomain={[-0.5, 2.2]}
      width={280}
      height={170}
    />
  );
}
