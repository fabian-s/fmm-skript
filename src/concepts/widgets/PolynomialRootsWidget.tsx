/**
 * Konzept-Widget `polynomial-roots` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: Die Nullstellen verschwinden nie, sie verlassen nur die
 * reelle Achse. Der Graph zeigt bloß den reellen Schnitt; in der Gaußebene
 * bleiben es immer zwei Punkte.
 *
 * FARBROLLEN: blau = Parabel p(x) = x² + c; rot = die beiden Nullstellen in
 * beiden Tafeln (dieselbe Farbe, dieselben Punkte, Pattern 3: verlinkte
 * Darstellungen); grau = die Bahn, auf der die Nullstellen wandern.
 *
 * PROVENIENZ: Regler und Fallunterscheidung aus der Vorfassung; neu ist die
 * zweite Tafel (Gaußebene, eigenes SVG mit den Theme-Variablen --w-*), die
 * Aufgabenzeile und das Verdikt. Der Schlussabsatz ist nach
 * polynomial-roots.mdx gewandert.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C5/check-alle.mjs,
 * 2026-08-19): p(x) = x² + c hat für c = −2 die Nullstellen ±1,414214, für
 * c = −1 die Nullstellen ±1, für c = 0 eine doppelte bei 0, für c = 1 das Paar
 * ±1i und für c = 2 das Paar ±1,414214 i; der Scheitelwert ist stets p(0) = c.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_MUTED, fmtDe, fmtTick } from "../../lib";

const G = 210; // Kantenlänge der Gaußebene (Entwurfspixel)
const PAD = 26;

/** Gaußebene mit den beiden Nullstellen und ihrer Wanderbahn. */
function Gaussebene({ c }: { c: number }) {
  const r = Math.sqrt(Math.abs(c));
  const px = (re: number) => PAD + ((re + 2) / 4) * (G - 2 * PAD);
  const py = (im: number) => G - PAD - ((im + 2) / 4) * (G - 2 * PAD);
  const punkte: [number, number][] = c <= 0 ? [[-r, 0], [r, 0]] : [[0, -r], [0, r]];
  return (
    <svg
      viewBox={`0 0 ${G} ${G}`}
      width={G}
      height={G}
      className="h-auto max-w-full rounded"
      role="img"
      aria-label={`Gaußebene mit den beiden Nullstellen ${c <= 0 ? `bei ±${fmtDe(r, 2)} auf der reellen Achse` : `bei ±${fmtDe(r, 2)} i auf der imaginären Achse`}.`}
    >
      <rect x={0.5} y={0.5} width={G - 1} height={G - 1} rx={4} fill="var(--w-bg)" stroke="var(--w-border)" />
      {[-2, -1, 1, 2].map((t) => (
        <g key={t}>
          <line x1={px(t)} x2={px(t)} y1={PAD} y2={G - PAD} stroke="var(--w-grid)" strokeWidth={0.6} />
          <line x1={PAD} x2={G - PAD} y1={py(t)} y2={py(t)} stroke="var(--w-grid)" strokeWidth={0.6} />
          <text x={px(t)} y={py(0) + 11} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
            {fmtTick(t, 1)}
          </text>
          <text x={px(0) - 5} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
            {fmtTick(t, 1)}i
          </text>
        </g>
      ))}
      {/* Wanderbahn: reelle Achse und imaginäre Achse */}
      <line x1={px(-2)} x2={px(2)} y1={py(0)} y2={py(0)} stroke="var(--w-axis)" strokeWidth={1.4} />
      <line x1={px(0)} x2={px(0)} y1={py(-2)} y2={py(2)} stroke="var(--w-axis)" strokeWidth={1.4} />
      <text x={G - PAD} y={py(0) - 6} textAnchor="end" fontSize={10} fill="var(--w-muted)">
        Re
      </text>
      <text x={px(0) + 5} y={PAD + 4} fontSize={10} fill="var(--w-muted)">
        Im
      </text>
      {punkte.map(([re, im], i) => (
        <circle key={i} cx={px(re)} cy={py(im)} r={Math.abs(c) < 1e-9 ? 6 : 4.5} fill={FMM_COLORS.rot} />
      ))}
    </svg>
  );
}

export function RootsWidget() {
  const [c, setC] = useState(1);
  const r = Math.sqrt(Math.abs(c));
  const reell = c < 0;
  const doppelt = Math.abs(c) < 1e-9;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Schieben wir c von unten nach oben und verfolgen die roten Nullstellen in beiden Tafeln.</Aufgabe>
      <Plot
        xLabel="x"
        yLabel="p(x)"
        xDomain={[-3, 3]}
        yDomain={[-2.5, 4]}
        width={320}
        height={200}
        readout
        ariaLabel={`Parabel x² + c mit c = ${fmtDe(c, 1)}; ${reell ? "zwei reelle Nullstellen" : doppelt ? "eine doppelte Nullstelle" : "keine reelle Nullstelle"}.`}
        series={[{ f: (x) => x * x + c, color: FMM_COLORS.blau, label: "p(x) = x² + c" }]}
        points={reell || doppelt ? [{ x: -r, y: 0, color: FMM_COLORS.rot, r: 4 }, { x: r, y: 0, color: FMM_COLORS.rot, r: 4 }] : []}
      />
      <div className="mt-1 flex justify-center">
        <Gaussebene c={c} />
      </div>
      <p className={`mt-1 text-center text-xs ${W_MUTED}`}>Oben der reelle Graph, unten die Gaußebene.</p>
      <Slider label="c" value={c} onChange={setC} min={-2} max={2} step={0.1} accent={FMM_COLORS.blau} />
      <Verdikt kind={doppelt ? "warn" : "neutral"}>
        {reell ? (
          <>
            Zwei reelle Nullstellen bei ±{fmtDe(r, 2)}: der Graph schneidet die Achse zweimal, und
            in der Gaußebene liegen beide Punkte auf der reellen Achse.
          </>
        ) : doppelt ? (
          <>
            Bei c = 0 fallen beide Nullstellen im Ursprung zusammen: eine Nullstelle mit
            Vielfachheit zwei. Der Graph berührt die Achse, ohne sie zu schneiden.
          </>
        ) : (
          <>
            Der Graph berührt die Achse nicht mehr, die Nullstellen sind aber nur ausgewichen: das
            konjugierte Paar ±{fmtDe(r, 2)} i steht in der Gaußebene auf der imaginären Achse. Es
            bleiben zwei, wie es der Fundamentalsatz der Algebra für den Grad 2 verlangt.
          </>
        )}
      </Verdikt>
    </div>
  );
}
