/** Concept tooltip: factorial k! (Taylor coefficients). */
import { M, MD, registerConcept } from "../lib";

const rows: [number, string][] = [
  [0, "1 (per Konvention)"],
  [1, "1"],
  [2, "2"],
  [3, "6"],
  [4, "24"],
  [5, "120"],
  [6, "720"],
];

function FactorialTable() {
  return (
    <div className="mt-2 overflow-x-auto rounded bg-slate-700/60 p-2">
      <table className="text-xs">
        <thead>
          <tr>
            <th className="pr-3 text-left font-semibold">k</th>
            {rows.map(([k]) => (
              <td key={k} className="px-2 text-center">
                {k}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="pr-3 text-left font-semibold">k!</th>
            {rows.map(([k, v]) => (
              <td key={k} className="px-2 text-center">
                {v}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="mt-1 text-slate-300">Fakultäten wachsen extrem schnell.</p>
    </div>
  );
}

registerConcept({
  id: "factorial",
  title: "Fakultät",
  body: (
    <>
      <p>
        Die <em>Fakultät</em> (engl. <em>factorial</em>) einer natürlichen
        Zahl <M>{"k"}</M>, geschrieben <M>{"k!"}</M>, ist das Produkt aller
        ganzen Zahlen von 1 bis <M>{"k"}</M>:
      </p>
      <MD>{"k! = 1 \\cdot 2 \\cdot 3 \\cdots k, \\qquad \\text{z.B. } 4! = 1 \\cdot 2 \\cdot 3 \\cdot 4 = 24."}</MD>
      <p>
        Per Konvention ist <M>{"0! = 1"}</M> (ein „leeres Produkt"), was die
        Formeln einheitlich hält. Aus der Kombinatorik kennen wir{" "}
        <M>{"k!"}</M> vielleicht als die Anzahl der Möglichkeiten,{" "}
        <M>{"k"}</M> Objekte anzuordnen. Hier taucht die Fakultät in
        Binomialkoeffizienten wie <M>{"\\frac{n!}{i!\\,(n-i)!}"}</M> auf (vgl.
        MML, Beispiel 5.2) und — am wichtigsten — als Nenner{" "}
        <M>{"\\frac{f^{(k)}(x_0)}{k!}"}</M> in Taylor-Polynomen: Das rasante
        Wachstum von <M>{"k!"}</M> zähmt die Terme höherer Ordnung, sodass die
        Reihe zur Ruhe kommen kann.
      </p>
      <FactorialTable />
    </>
  ),
});
