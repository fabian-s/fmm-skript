import { useMemo, useState } from "react";
import { LabeledPlot, MatrixInput } from "../../../lib";

/**
 * QR-Iterations-Demo für §8.1 (ersetzt die Folien-Abbildung
 * resources/qr_iteration_viz.pdf): A^(k-1) = Q^(k) R^(k), A^(k) = R^(k) Q^(k)
 * Schritt für Schritt, mit den Einträgen von A^(k), dem aufgesammelten
 * Produkt Q_k und dem Abfall der Nebendiagonalen auf logarithmischer Skala.
 *
 * Eigenbau (mml-ch4 hat keine QR-Iteration; CharPolyExplorer/EigenExplorer
 * rechnen nur mit dem charakteristischen Polynom). Farbcode wie im Kapitel:
 * grün = Grenzwerte auf der Diagonalen und Eigenvektoren, rot = Nebendiagonale
 * als Residuum, orange = Konvergenzrate.
 */

const BLUE = "#0072B2";
const GREEN = "#009E73";
const ORANGE = "#E69F00";
const RED = "#D55E00";
const GREY = "#64748b";

const KMAX = 20;

type Mat = number[][];

const mm = (X: Mat, Y: Mat): Mat => [
  [X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]],
  [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]],
];

/** QR-Zerlegung einer 2×2-Matrix per Gram-Schmidt, mit positiver Diagonale in R. */
function qr2(M: Mat): { Q: Mat; R: Mat } {
  const a1 = [M[0][0], M[1][0]];
  const a2 = [M[0][1], M[1][1]];
  const r11 = Math.hypot(a1[0], a1[1]);
  const q1 = r11 > 1e-14 ? [a1[0] / r11, a1[1] / r11] : [1, 0];
  const r12 = q1[0] * a2[0] + q1[1] * a2[1];
  const w = [a2[0] - r12 * q1[0], a2[1] - r12 * q1[1]];
  const r22 = Math.hypot(w[0], w[1]);
  const q2 = r22 > 1e-14 ? [w[0] / r22, w[1] / r22] : [-q1[1], q1[0]];
  return {
    Q: [
      [q1[0], q2[0]],
      [q1[1], q2[1]],
    ],
    R: [
      [r11, r12],
      [0, r22],
    ],
  };
}

type Stufe = { A: Mat; Q: Mat; R: Mat; Qacc: Mat };

function iterate(A0: Mat): Stufe[] {
  const out: Stufe[] = [];
  let A = A0.map((r) => [...r]);
  let Qacc: Mat = [
    [1, 0],
    [0, 1],
  ];
  out.push({ A, Q: Qacc, R: Qacc, Qacc });
  for (let k = 1; k <= KMAX; k++) {
    if (!A.every((r) => r.every((v) => Number.isFinite(v)))) break;
    const { Q, R } = qr2(A);
    A = mm(R, Q);
    Qacc = mm(Qacc, Q);
    out.push({ A, Q, R, Qacc });
  }
  return out;
}

/** 3 Nachkommastellen, deutsches Komma, kein −0; NaN und ±∞ getrennt. */
function fmt(v: number): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  let r = Math.round(v * 1000) / 1000;
  if (Object.is(r, -0)) r = 0;
  return r.toFixed(3).replace("-", "−").replace(".", ",");
}

/** Eigenwerte einer 2×2-Matrix; bei negativer Diskriminante komplex. */
function eigen2(M: Mat): { reell: boolean; l1: number; l2: number; im: number } {
  const sp = M[0][0] + M[1][1];
  const det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
  const disc = sp * sp - 4 * det;
  if (disc < 0) return { reell: false, l1: sp / 2, l2: sp / 2, im: Math.sqrt(-disc) / 2 };
  const w = Math.sqrt(disc);
  const a = (sp + w) / 2;
  const b = (sp - w) / 2;
  return Math.abs(a) >= Math.abs(b)
    ? { reell: true, l1: a, l2: b, im: 0 }
    : { reell: true, l1: b, l2: a, im: 0 };
}

/** kleines Zahlenraster mit Klammerlinien; farbe(i, j) färbt einzelne Einträge. */
function Mat2({ m, farbe }: { m: Mat; farbe?: (i: number, j: number) => string | undefined }) {
  return (
    <span className="inline-grid grid-cols-2 gap-px rounded border-x-2 border-slate-500 px-1.5 py-1 align-middle">
      {m.map((row, i) =>
        row.map((v, j) => (
          <span
            key={`${i}-${j}`}
            className="px-1 text-center font-mono text-xs"
            style={{ color: farbe?.(i, j) }}
          >
            {fmt(v)}
          </span>
        ))
      )}
    </span>
  );
}

export function QrIterationsDemo() {
  const [A0, setA0] = useState<Mat>([
    [5, -2],
    [-2, 8],
  ]);
  const [k, setK] = useState(0);

  const stufen = useMemo(() => iterate(A0), [A0]);
  const maxK = Math.max(0, stufen.length - 1);
  const kk = Math.min(k, maxK);
  const jetzt = stufen[kk];
  const ew = eigen2(A0);
  const rate = ew.reell && Math.abs(ew.l1) > 1e-12 ? Math.abs(ew.l2 / ew.l1) : NaN;

  const off = (s: Stufe) => Math.abs(s.A[1][0]);
  const offJetzt = off(jetzt);
  const offVor = kk > 0 ? off(stufen[kk - 1]) : NaN;
  const beobachtet = offVor > 0 ? offJetzt / offVor : NaN;
  /** Text für den Schrumpffaktor: vor dem ersten Schritt bzw. bei 0/0 gibt es keinen. */
  const rateText =
    kk === 0
      ? "erst ab k = 1"
      : !(offVor > 0)
        ? "nicht definiert, die Nebendiagonale war schon null"
        : fmt(beobachtet);
  const symmetrisch = Math.abs(A0[0][1] - A0[1][0]) < 1e-12;
  /** steht der betragsgrößere Eigenwert oben links? */
  const sortiert = Math.abs(jetzt.A[0][0]) >= Math.abs(jetzt.A[1][1]);
  const reihenfolge = sortiert
    ? "Sie stehen absteigend nach Betrag."
    : "Sie stehen hier aufsteigend nach Betrag: Eine Matrix in Dreiecksgestalt ist ein Fixpunkt der Iteration, umsortiert wird nichts.";

  const marker = useMemo(
    () =>
      stufen
        .map((s, i) => ({ x: i, y: Math.log10(off(s)), color: RED }))
        .filter((p) => Number.isFinite(p.y) && p.y > -17),
    [stufen]
  );
  const start = off(stufen[0]);
  const serie = useMemo(
    () =>
      Number.isFinite(rate) && rate > 0 && start > 0
        ? [
            {
              f: (x: number) => Math.log10(start) + x * Math.log10(rate),
              color: ORANGE,
              dash: [5, 4],
            },
          ]
        : [],
    [rate, start]
  );

  const setzen = (m: Mat) => {
    setA0(m);
    setK(0);
  };

  return (
    <div>
      <p className="text-sm">
        Ein Schritt der QR-Iteration zerlegt die aktuelle Matrix in Q und R und multipliziert
        die beiden in umgekehrter Reihenfolge wieder zusammen. Voreingestellt ist die
        Beispielmatrix des Abschnitts; jede andere 2×2-Eingabe rechnet das Widget genauso durch.
      </p>
      <div className="my-3 flex flex-wrap items-center gap-3 text-sm">
        <span>A =</span>
        <MatrixInput value={A0} onChange={setzen} step={1} />
        <button
          type="button"
          className="rounded border border-slate-400 px-2 py-0.5 text-xs"
          onClick={() =>
            setzen([
              [5, -2],
              [-2, 8],
            ])
          }
        >
          symmetrisches Beispiel
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 px-2 py-0.5 text-xs"
          onClick={() =>
            setzen([
              [2, 3],
              [1, 4],
            ])
          }
        >
          unsymmetrisch
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 px-2 py-0.5 text-xs"
          onClick={() =>
            setzen([
              [0, -1],
              [1, 0],
            ])
          }
        >
          Drehung um 90°
        </button>
      </div>
      <div className="my-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm disabled:opacity-40"
          onClick={() => setK((v) => Math.max(0, v - 1))}
          disabled={kk <= 0}
        >
          ◀ zurück
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 bg-slate-100 px-3 py-1 text-sm font-medium disabled:opacity-40 dark:bg-slate-800"
          onClick={() => setK((v) => Math.min(maxK, v + 1))}
          disabled={kk >= maxK}
        >
          nächster Schritt ▶
        </button>
        <span className="text-sm" style={{ color: GREY }}>
          Iteration k = {kk} von {maxK}
        </span>
      </div>

      <div className="my-2 flex flex-wrap items-start gap-6">
        <div className="space-y-2 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              A<sup>({kk})</sup> =
            </span>
            <Mat2 m={jetzt.A} farbe={(i, j) => (i === j ? GREEN : i > j ? RED : undefined)} />
          </div>
          {kk > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span>
                aus Q<sup>({kk})</sup> =
              </span>
              <Mat2 m={jetzt.Q} />
              <span>
                und R<sup>({kk})</sup> =
              </span>
              <Mat2 m={jetzt.R} />
            </div>
          ) : (
            <p style={{ color: GREY }}>Noch nicht iteriert: A⁽⁰⁾ ist die Ausgangsmatrix.</p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Q<sub>{kk}</sub> ={" "}
              {kk === 0 ? (
                "I, noch ist kein Faktor aufgesammelt:"
              ) : (
                <>
                  Q<sup>(1)</sup>⋯Q<sup>({kk})</sup> =
                </>
              )}
            </span>
            <Mat2 m={jetzt.Qacc} farbe={() => BLUE} />
          </div>
          <p style={{ color: GREY }}>
            Grün: die Diagonale, auf der die Eigenwerte erscheinen. Rot: der Eintrag unter der
            Diagonalen, der verschwinden soll. Blau: das aufgesammelte Produkt der
            Orthogonalmatrizen, dessen Spalten im symmetrischen Fall gegen die Eigenvektoren
            laufen.
          </p>
          <div>
            <span style={{ color: RED }}>|a₂₁| = {fmt(offJetzt)}</span>
            <span style={{ color: GREY }}> , Schrumpffaktor gegenüber dem Vorschritt: </span>
            <span style={{ color: ORANGE }}>{rateText}</span>
          </div>
          <div style={{ color: GREY }}>
            {ew.reell ? (
              <>
                exakte Eigenwerte: λ₁ = {fmt(ew.l1)}, λ₂ = {fmt(ew.l2)}; vorhergesagte Rate
                |λ₂/λ₁| = <span style={{ color: ORANGE }}>{fmt(rate)}</span>
              </>
            ) : (
              <>
                exakte Eigenwerte: {fmt(ew.l1)} ± {fmt(ew.im)}·i, also komplex und betragsgleich
              </>
            )}
          </div>
        </div>
        <div>
          <LabeledPlot
            xLabel="Iteration k"
            yLabel="log₁₀ |a₂₁|"
            series={serie}
            markers={marker}
            xDomain={[0, KMAX]}
            yDomain={[-16, 2]}
            width={300}
            height={200}
          />
          <p className="mt-1 max-w-[19rem] text-xs" style={{ color: GREY }}>
            Rote Punkte: der Betrag der Nebendiagonalen, logarithmisch aufgetragen. Die orange
            Gerade ist die Vorhersage aus der Rate |λ₂/λ₁|; eine Gerade im Log-Bild bedeutet
            lineare Konvergenz.
          </p>
        </div>
      </div>

      <p className="text-sm" style={{ color: GREY }}>
        {!ew.reell
          ? "Diese Matrix hat komplexe Eigenwerte gleichen Betrags. Eine reelle obere Dreiecksmatrix müsste die Eigenwerte auf der Diagonalen zeigen, also reelle Eigenwerte haben. Die Iteration kann deshalb nicht konvergieren: Q ist hier die Drehung selbst, R die Einheitsmatrix, und A⁽ᵏ⁾ bleibt stehen, wo es war."
          : Math.abs(rate - 1) < 1e-9
            ? "Beide Eigenwerte haben denselben Betrag. Die Rate ist 1, die Nebendiagonale schrumpft nicht mehr, und die Voraussetzung der Konvergenzaussage ist verletzt."
            : offJetzt < 1e-9
              ? symmetrisch
                ? `Die Nebendiagonale ist auf Rechengenauigkeit verschwunden: A⁽ᵏ⁾ ist diagonal, auf der Diagonalen stehen die Eigenwerte. ${reihenfolge} Weil A symmetrisch ist, sind die Spalten von Q_k jetzt Eigenvektoren, bis aufs Vorzeichen.`
                : `Die Nebendiagonale ist auf Rechengenauigkeit verschwunden: A⁽ᵏ⁾ ist obere Dreiecksmatrix mit den Eigenwerten auf der Diagonalen. ${reihenfolge} Der Eintrag rechts oben bleibt stehen, denn eine unsymmetrische Matrix wird nur dreieckig, nicht diagonal.`
              : "Der rote Eintrag schrumpft in jedem Schritt ungefähr um den Faktor |λ₂/λ₁|, die Diagonale wandert dabei auf die Eigenwerte zu. Klicken wir uns weiter, bis der Schrumpffaktor die vorhergesagte Rate trifft."}
      </p>
    </div>
  );
}
