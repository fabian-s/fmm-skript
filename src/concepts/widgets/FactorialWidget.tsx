/** Widget zum Konzept-Tooltip „Fakultät": Wertetabelle k ↦ k!. */
const rows: [number, string][] = [
  [0, "1 (per Konvention)"],
  [1, "1"],
  [2, "2"],
  [3, "6"],
  [4, "24"],
  [5, "120"],
  [6, "720"],
];

export function FactorialTable() {
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
