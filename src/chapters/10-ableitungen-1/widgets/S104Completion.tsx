import { useMemo, useState } from "react";
import { LabeledPlot, Slider } from "../../../lib";

/**
 * §10.4, Anwendung: Matrix Completion auf einer 2x3-Matrix mit vier
 * beobachteten Einträgen. Der alternierende Gradientenabstieg benutzt genau
 * die beiden Gradienten aus Satz 10.4.12.
 *
 * Kein Zufall im Render: Start-U und Start-V sind fest eingebettet, und die
 * gesamte Bahn wird bei jedem Render deterministisch aus diesen Startwerten
 * nachgerechnet.
 *
 * Nachgerechnet (node, check-completion-s104.mjs):
 * - beide Gradienten stimmen auf 1e-9 mit zentralen Differenzen überein;
 * - k = 1, alpha = 0,05: L fällt von 18,84 auf 1,7e-4 nach 20 Schritten und
 *   auf 3e-30 nach 300; die Rekonstruktion trifft die beobachteten Einträge
 *   und sagt y13 = 2,5 sowie y22 = 2,4 voraus (die exakte Rang-1-Antwort:
 *   y13 = 2·(5/4), y22 = 3·(4/5));
 * - k = 2, alpha = 0,05: L fällt ebenfalls auf ~0, die Vorhersagen liegen
 *   dann aber bei y13 = 1,583 und y22 = 0,909, hängen also am Start;
 * - alpha = 0,15 pendelt (L bleibt bei ~1,11), ab alpha = 0,3 laufen die
 *   Einträge davon und L wird nach 14 Schritten NaN.
 */

const BLAU = "#0072B2"; // beobachtete Werte
const GRUEN = "#009E73"; // Vorhersagen für die Lücken
const ROT = "#D55E00"; // Residuen
const ORANGE = "#E69F00"; // Gradienten

type Mat = number[][];

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const Y: Mat = [
  [5, 3, 0],
  [4, 0, 2],
];
const P: Mat = [
  [1, 1, 0],
  [1, 0, 1],
];

const START: Record<number, { U: Mat; V: Mat }> = {
  1: { U: [[0.9], [0.5]], V: [[1.1], [0.4], [0.7]] },
  2: {
    U: [
      [0.9, -0.3],
      [0.5, 0.8],
    ],
    V: [
      [1.1, 0.2],
      [0.4, -0.6],
      [0.7, 0.5],
    ],
  },
};

const MAX_SCHRITTE = 200;

function transp(A: Mat): Mat {
  return A[0].map((_, j) => A.map((zeile) => zeile[j]));
}

function mul(A: Mat, B: Mat): Mat {
  return A.map((zeile) => B[0].map((_, j) => zeile.reduce((s, v, k) => s + v * B[k][j], 0)));
}

/** Elementweises (Hadamard-)Produkt. */
function hadamard(A: Mat, B: Mat): Mat {
  return A.map((zeile, i) => zeile.map((v, j) => v * B[i][j]));
}

function residuum(U: Mat, V: Mat): Mat {
  const S = mul(U, transp(V));
  return hadamard(
    P,
    Y.map((zeile, i) => zeile.map((v, j) => v - S[i][j])),
  );
}

function verlust(U: Mat, V: Mat): number {
  return 0.5 * residuum(U, V).flat().reduce((s, v) => s + v * v, 0);
}

function schrittWeiter(U: Mat, V: Mat, alpha: number): { U: Mat; V: Mat } {
  const R = residuum(U, V);
  const gU = mul(R, V).map((zeile) => zeile.map((v) => -v));
  const gV = mul(transp(R), U).map((zeile) => zeile.map((v) => -v));
  return {
    U: U.map((zeile, i) => zeile.map((v, j) => v - alpha * gU[i][j])),
    V: V.map((zeile, i) => zeile.map((v, j) => v - alpha * gV[i][j])),
  };
}

function Tafel({
  titel,
  A,
  spalten,
  farbe,
  zelle,
  stellen = 2,
}: {
  titel: string;
  A: Mat;
  spalten: number;
  farbe: string;
  zelle?: (i: number, j: number, v: number) => { text: string; farbe: string };
  stellen?: number;
}) {
  return (
    <div>
      <p className="mb-1 text-xs" style={{ color: farbe }}>
        {titel}
      </p>
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${spalten}, 3.5rem)` }}>
        {A.map((zeile, i) =>
          zeile.map((v, j) => {
            const z = zelle ? zelle(i, j, v) : { text: fmt(v, stellen), farbe: "" };
            return (
              <span
                key={`${i}-${j}`}
                className="rounded border border-slate-300 px-1 py-0.5 text-center font-mono text-xs dark:border-slate-600"
                style={z.farbe ? { color: z.farbe } : undefined}
              >
                {z.text}
              </span>
            );
          }),
        )}
      </div>
    </div>
  );
}

export function MatrixCompletionDemo() {
  const [k, setK] = useState(1);
  const [alpha, setAlpha] = useState(0.05);
  const [schritt, setSchritt] = useState(0);

  const bahn = useMemo(() => {
    let U = START[k].U.map((zeile) => [...zeile]);
    let V = START[k].V.map((zeile) => [...zeile]);
    const punkte: { U: Mat; V: Mat; L: number }[] = [{ U, V, L: verlust(U, V) }];
    for (let s = 0; s < MAX_SCHRITTE; s++) {
      const naechst = schrittWeiter(U, V, alpha);
      U = naechst.U;
      V = naechst.V;
      punkte.push({ U, V, L: verlust(U, V) });
    }
    return punkte;
  }, [k, alpha]);

  const jetzt = bahn[schritt];
  const S = mul(jetzt.U, transp(jetzt.V));
  const R = residuum(jetzt.U, jetzt.V);
  const gU = mul(R, jetzt.V).map((zeile) => zeile.map((v) => -v));
  const gV = mul(transp(R), jetzt.U).map((zeile) => zeile.map((v) => -v));

  // Bei vielen Schritten nur jeden n-ten Punkt zeichnen, sonst verschmieren die
  // 4-px-Marker zu einem Balken; der letzte Punkt ist immer dabei.
  const stride = Math.max(1, Math.ceil((schritt + 1) / 40));
  const logL = bahn
    .slice(0, schritt + 1)
    .map((p, t) => ({ x: t, y: Math.log10(Math.max(p.L, 1e-12)) }))
    .filter((p, t) => t % stride === 0 || t === schritt)
    .filter((p) => Number.isFinite(p.y));
  const yWerte = logL.map((p) => p.y);
  const yMin = yWerte.length ? Math.min(...yWerte) : -1;
  const yMax = yWerte.length ? Math.max(...yWerte) : 2;
  const yDomain: [number, number] =
    yMax - yMin < 1 ? [yMin - 0.5, yMin + 1.5] : [yMin - 0.3, yMax + 0.3];

  const explodiert = !Number.isFinite(jetzt.L);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-xs" style={{ color: "#64748b" }}>
          Rang k:
        </span>
        {[1, 2].map((kk) => (
          <button
            key={kk}
            type="button"
            className={`rounded border px-3 py-1 text-sm ${
              kk === k
                ? "border-slate-500 bg-slate-100 font-semibold dark:bg-slate-700"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => {
              setK(kk);
              setSchritt(0);
            }}
          >
            k = {kk}
          </button>
        ))}
      </div>
      <Slider
        label="α (Lernrate)"
        value={alpha}
        onChange={(v) => {
          setAlpha(Math.round(v * 1000) / 1000);
          setSchritt(0);
        }}
        min={0.01}
        max={0.3}
        step={0.005}
        fmt={(v) => fmt(v, 3)}
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setSchritt((s) => Math.min(MAX_SCHRITTE, s + 1))}
          disabled={schritt >= MAX_SCHRITTE}
        >
          ein Schritt →
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setSchritt((s) => Math.min(MAX_SCHRITTE, s + 10))}
          disabled={schritt >= MAX_SCHRITTE}
        >
          zehn Schritte →→
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setSchritt(0)}
        >
          zurücksetzen
        </button>
        <span className="font-mono">t = {schritt}</span>
        <span className="font-mono" style={{ color: explodiert ? ROT : BLAU }}>
          L = {fmt(jetzt.L, 6)}
        </span>
      </div>
      <div className="flex flex-wrap gap-6">
        <Tafel
          titel="Y auf Ω (Lücken: ?)"
          A={Y}
          spalten={3}
          farbe={BLAU}
          zelle={(i, j, v) =>
            P[i][j] === 1 ? { text: fmt(v, 1), farbe: BLAU } : { text: "?", farbe: "#64748b" }
          }
        />
        <Tafel
          titel="UVᵀ (Lücken grün: die Vorhersagen)"
          A={S}
          spalten={3}
          farbe={GRUEN}
          zelle={(i, j, v) => ({ text: fmt(v, 3), farbe: P[i][j] === 1 ? BLAU : GRUEN })}
        />
        <Tafel titel="PΩ ⊙ (Y − UVᵀ)" A={R} spalten={3} farbe={ROT} zelle={(_i, _j, v) => ({ text: fmt(v, 3), farbe: ROT })} />
      </div>
      <div className="flex flex-wrap gap-6">
        <Tafel titel="∂L/∂U" A={gU} spalten={k} farbe={ORANGE} zelle={(_i, _j, v) => ({ text: fmt(v, 3), farbe: ORANGE })} />
        <Tafel titel="∂L/∂V" A={gV} spalten={k} farbe={ORANGE} zelle={(_i, _j, v) => ({ text: fmt(v, 3), farbe: ORANGE })} />
        <LabeledPlot
          xLabel="t (Schritt)"
          yLabel="log₁₀ L"
          series={[]}
          markers={logL.map((p) => ({ x: p.x, y: p.y, color: BLAU }))}
          xDomain={[0, Math.max(10, schritt)]}
          yDomain={yDomain}
          width={260}
          height={200}
        />
      </div>
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        {explodiert ? (
          <p style={{ color: ROT }}>
            Bei dieser Lernrate wachsen die Einträge von U und V über jede Grenze, das Produkt der
            Überläufe ist keine Zahl mehr und L wird undefiniert. Zurücksetzen und α kleiner
            wählen.
          </p>
        ) : (
          <p>
            Nach {schritt} Schritten beträgt der Verlust{" "}
            <span className="font-mono">{fmt(jetzt.L, 6)}</span>. Die roten Residuen sind genau die
            Abweichungen auf den beobachteten Plätzen; auf den beiden Lücken steht dort null, weil
            PΩ sie ausblendet. Die orangen Gradienten sind die Bausteine des nächsten Schritts.
          </p>
        )}
        <p>
          Mit k = 1 ist die Antwort eindeutig: Die drei Beobachtungen in der linken oberen Ecke
          legen die Verhältnisse fest, und die vierte fixiert den Rest. Der Grenzwert ist{" "}
          <span className="font-mono" style={{ color: GRUEN }}>
            y₁₃ = 2,5
          </span>{" "}
          und{" "}
          <span className="font-mono" style={{ color: GRUEN }}>
            y₂₂ = 2,4
          </span>
          . Mit k = 2 stehen zehn Parameter vier Beobachtungen gegenüber: Der Verlust fällt bei
          kleiner Lernrate genauso auf null, die Vorhersagen für die Lücken hängen aber am
          Startpunkt und landen hier bei rund 1,58 und 0,91. Mehr Rang heißt also nicht bessere
          Rekonstruktion.
        </p>
      </div>
    </div>
  );
}
