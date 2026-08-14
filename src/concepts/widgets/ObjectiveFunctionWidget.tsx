import { M, Plot } from "../../lib";

const data: [number, number][] = [
  [-2, -1.6],
  [-1, -0.8],
  [1, 1.1],
  [2, 2.4],
];

const mse = (a: number) =>
  data.reduce((s, [x, y]) => s + (y - a * x) * (y - a * x), 0) / data.length;

export function ObjectiveWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 text-xs">
        Eine konkrete Zielfunktion: der mittlere quadratische Fehler{" "}
        <M>{"L(a)"}</M> der Geraden <M>{"y = a\\,x"}</M> auf vier
        Datenpunkten, als Funktion der Steigung <M>{"a"}</M>. Das Training
        wählt das <M>{"a"}</M> am Boden dieser Schüssel.
      </div>
      <Plot
        series={[{ f: mse }]}
        xDomain={[-0.5, 2.5]}
        yDomain={[-0.5, 6]}
        width={280}
        height={180}
        markers={[{ x: 0.99, y: mse(0.99), label: "bestes a" }]}
      />
    </div>
  );
}
