import { useState } from "react";
import { M } from "../../../lib";

/**
 * Spur-Rechen-Widget: eine editierbare 2×2-Matrix, deren Spur (grüne
 * Diagonale) und Eigenwerte (blau) live berechnet werden. Zeigt Satz
 * „Spur = Summe der Eigenwerte" – auch im Fall komplexer Eigenwerte.
 * Eigenwerte in geschlossener Form über die Mitternachtsformel.
 */

const GREEN = "#009E73"; // Spur / Diagonale (\cgreen)
const BLUE = "#0072B2"; // Eigenwerte (\cblue)
const NEUTRAL = "#64748b"; // dark-mode-sichere Sekundärfarbe

function fmt(x: number, digits = 3): string {
  if (!Number.isFinite(x)) return "?";
  const r = Math.round(x * 10 ** digits) / 10 ** digits;
  const v = Object.is(r, -0) ? 0 : r;
  return String(v).replace("-", "−").replace(".", ",");
}

type Eigen =
  | { real: true; l1: number; l2: number; tr: number }
  | { real: false; re: number; im: number; tr: number };

function eigen2x2(m: number[][]): Eigen {
  const tr = m[0][0] + m[1][1];
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const disc = tr * tr - 4 * det;
  if (disc >= 0) {
    const s = Math.sqrt(disc);
    return { real: true, l1: (tr + s) / 2, l2: (tr - s) / 2, tr };
  }
  return { real: false, re: tr / 2, im: Math.sqrt(-disc) / 2, tr };
}

const PRESETS: { name: string; m: number[][] }[] = [
  { name: "Start", m: [[2, -1], [0, 3]] },
  { name: "Drehung um 90°", m: [[0, -1], [1, 0]] },
  { name: "symmetrisch", m: [[2, 1], [1, 3]] },
];

export function S31SpurWidget() {
  const [m, setM] = useState<number[][]>(PRESETS[0].m.map((r) => [...r]));
  const e = eigen2x2(m);
  const sum = e.real ? e.l1 + e.l2 : 2 * e.re;
  return (
    <div className="text-sm">
      <p className="mb-3">
        Ändern wir einzelne Einträge der Matrix und beobachten die Anzeige rechts: Die{" "}
        <span style={{ color: GREEN }} className="font-semibold">grünen</span> Diagonaleinträge
        bestimmen die Spur direkt; die{" "}
        <span style={{ color: BLUE }} className="font-semibold">blauen</span> Eigenwerte dagegen
        hängen von <em>allen</em> Einträgen ab und wandern beim Editieren wild umher; ihre Summe
        bleibt trotzdem in jedem Fall exakt die Spur (Satz 3.1.7). Die Voreinstellung „Drehung um
        90°" zeigt den Fall komplexer Eigenwerte: Sie treten als konjugiertes Paar{" "}
        <M>{"a \\pm b\\,i"}</M> auf, die Imaginärteile heben sich in der Summe weg.
      </p>
      <div className="mb-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => setM(p.m.map((r) => [...r]))}
            className="rounded border border-slate-300 px-2 py-0.5 text-xs hover:bg-slate-200/60 dark:border-slate-600 dark:hover:bg-slate-700/60"
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <M>{"\\bA ="}</M>
          <div
            className="inline-grid gap-1 rounded border-x-2 border-slate-500 px-1.5 py-1"
            style={{ gridTemplateColumns: "repeat(2, minmax(0, 4rem))" }}
          >
            {m.map((row, i) =>
              row.map((v, j) => (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  step={1}
                  value={v}
                  onChange={(ev) => {
                    const next = m.map((r) => [...r]);
                    next[i][j] = Number(ev.target.value);
                    setM(next);
                  }}
                  className="w-full rounded border px-1 py-0.5 text-center font-mono text-xs dark:bg-slate-800"
                  style={
                    i === j
                      ? { borderColor: GREEN, backgroundColor: "rgba(0, 158, 115, 0.12)" }
                      : { borderColor: "#94a3b8" }
                  }
                />
              ))
            )}
          </div>
        </div>
        <div className="space-y-1 font-mono text-xs sm:text-sm">
          <div style={{ color: GREEN }}>
            tr(A) = {fmt(m[0][0])} + {fmt(m[1][1])} = <strong>{fmt(e.tr)}</strong>
          </div>
          {e.real ? (
            <div style={{ color: BLUE }}>
              &lambda;<sub>1</sub> = {fmt(e.l1)}, &nbsp;&lambda;<sub>2</sub> = {fmt(e.l2)}
            </div>
          ) : (
            <div style={{ color: BLUE }}>
              &lambda;<sub>1,2</sub> = {fmt(e.re)} &plusmn; {fmt(e.im)}&thinsp;i{" "}
              <span style={{ color: NEUTRAL }}>(komplexes Paar)</span>
            </div>
          )}
          <div>
            <span style={{ color: BLUE }}>
              &lambda;<sub>1</sub> + &lambda;<sub>2</sub> = <strong>{fmt(sum)}</strong>
            </span>{" "}
            <span style={{ color: GREEN }}>= tr(A)</span> <span>&#10003;</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs" style={{ color: NEUTRAL }}>
        Die Eigenwerte einer 2&times;2-Matrix berechnet das Widget in geschlossener Form: Sie sind
        die Nullstellen des charakteristischen Polynoms
        &lambda;&sup2; &minus; tr(A)&thinsp;&lambda; + det(A), also
        &lambda; = (tr(A) &plusmn; &radic;(tr(A)&sup2; &minus; 4&thinsp;det(A)))&thinsp;/&thinsp;2.
        Schon an dieser Formel sieht man &lambda;<sub>1</sub> + &lambda;<sub>2</sub> = tr(A),
        weil sich die Wurzelterme wegheben.
      </p>
    </div>
  );
}
