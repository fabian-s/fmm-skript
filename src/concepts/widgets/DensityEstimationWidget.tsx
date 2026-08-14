import { Plot } from "../../lib";

const gauss = (x: number, mu: number, s: number) =>
  Math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));

const data = [-1.9, -1.6, -1.4, -1.2, -1.1, -0.9, -0.6, 0.4, 0.7, 0.9, 1.2, 1.5, 1.9];

export function DensityWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Plot
        series={[{ f: (x) => 0.55 * gauss(x, -1.2, 0.45) + 0.45 * gauss(x, 1.1, 0.6) }]}
        xDomain={[-3, 3]}
        yDomain={[0, 0.65]}
        width={280}
        height={180}
        markers={data.map((x) => ({ x, y: 0.015, color: "#475569" }))}
      />
      <p className="mt-1 text-xs text-slate-300">
        Graue Punkte: beobachtete Datenpunkte. Blaue Kurve: eine geschätzte
        Dichte mit zwei Höckern, passend zu den zwei Clustern.
      </p>
    </div>
  );
}
