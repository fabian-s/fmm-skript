import { useState } from "react";
import { MatrixInput } from "../../../lib";

/**
 * Kronecker-Rechner für Skript §9.3.
 *
 * Zwei editierbare Faktoren (A stets 2×2, B bis 3×3), daneben das
 * Kroneckerprodukt in Blockdarstellung: je Block der Skalar des äußeren
 * Faktors, darin die Kopie des inneren Faktors. Ein Knopf vertauscht die
 * Reihenfolge und führt damit die Nicht-Kommutativität vor, ein zweiter
 * transponiert beide Faktoren und prüft live, ob das Ergebnis mit der
 * Transponierten des Produkts übereinstimmt.
 *
 * Eigenbau (Aufbau, Rechenkern und alle Texte). Farben wie im Kapitel:
 * A blau, B grün, Produkteinträge orange; die Farbe hängt am Objekt, nicht
 * an der Rolle, deshalb bleibt A auch dann blau, wenn es hinten steht.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ORANGE = "#E69F00";
const GRAU = "#64748b";

function fmt(v: number): string {
  if (!Number.isFinite(v)) return Number.isNaN(v) ? "n. d." : v > 0 ? "∞" : "−∞";
  const gerundet = Math.round(v * 100) / 100;
  const s = Number.isInteger(gerundet) ? String(gerundet) : gerundet.toFixed(2);
  return s.replace("-", "−").replace(".", ",");
}

type Mat = number[][];

const transponiert = (M: Mat): Mat => M[0].map((_, j) => M.map((r) => r[j]));

/** Kroneckerprodukt: d_{(i1-1)p+j1, (i2-1)q+j2} = a_{i1,i2} b_{j1,j2}. */
function kron(A: Mat, B: Mat): Mat {
  const m = A.length;
  const n = A[0].length;
  const p = B.length;
  const q = B[0].length;
  const D: Mat = Array.from({ length: m * p }, () => Array(n * q).fill(0));
  for (let i1 = 0; i1 < m; i1++)
    for (let i2 = 0; i2 < n; i2++)
      for (let j1 = 0; j1 < p; j1++)
        for (let j2 = 0; j2 < q; j2++) D[i1 * p + j1][i2 * q + j2] = A[i1][i2] * B[j1][j2];
  return D;
}

const maxAbw = (X: Mat, Y: Mat): number =>
  Math.max(...X.flatMap((r, i) => r.map((v, j) => Math.abs(v - Y[i][j]))));

const A_START: Mat = [
  [1, 0],
  [2, 5],
];
const B_START: Mat = [
  [3, 0, 0],
  [0, 2, 0],
  [-1, 0, -1],
];

/** Ein Block des Produkts: Skalar des äußeren Faktors, darin der innere Faktor. */
function Block({
  skalar,
  name,
  aussen,
  innen,
  werte,
}: {
  skalar: number;
  name: string;
  aussen: string;
  innen: string;
  werte: Mat;
}) {
  return (
    <div
      className="rounded px-1.5 py-1"
      style={{ backgroundColor: `${innen}1f`, border: `1px solid ${innen}55` }}
    >
      <div className="mb-0.5 font-mono text-[10px]" style={{ color: aussen }}>
        {name} = {fmt(skalar)}
      </div>
      <div
        className="inline-grid gap-x-2 font-mono text-xs"
        style={{ gridTemplateColumns: `repeat(${werte[0].length}, minmax(1.6rem, auto))` }}
      >
        {werte.flatMap((zeile, i) =>
          zeile.map((v, j) => (
            <span key={`${i}-${j}`} className="text-right" style={{ color: ORANGE }}>
              {fmt(v)}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export function KroneckerRechner() {
  const [A, setA] = useState<Mat>(A_START);
  const [B, setB] = useState<Mat>(B_START);
  const [zeilenB, setZeilenB] = useState(3);
  const [spaltenB, setSpaltenB] = useState(3);
  const [aErst, setAErst] = useState(true);
  const [transp, setTransp] = useState(false);

  /** B auf p×q bringen, vorhandene Einträge behalten. */
  const groesseB = (p: number, q: number) => {
    setB(
      Array.from({ length: p }, (_, i) =>
        Array.from({ length: q }, (_, j) => (i < B.length && j < B[0].length ? B[i][j] : 0))
      )
    );
    setZeilenB(p);
    setSpaltenB(q);
  };

  const AT = transponiert(A);
  const BT = transponiert(B);
  const fA = transp ? AT : A;
  const fB = transp ? BT : B;

  const aussen = aErst ? fA : fB;
  const innen = aErst ? fB : fA;
  const farbeAussen = aErst ? BLAU : GRUEN;
  const farbeInnen = aErst ? GRUEN : BLAU;
  /** Eintragsname des äußeren Faktors; nach dem Transponieren mit ᵀ, denn dort steht a^T_{i1i2} = a_{i2i1}. */
  const buchstabeAussen = `${aErst ? "a" : "b"}${transp ? "ᵀ" : ""}`;

  const ergebnis = kron(aussen, innen);
  const vertauscht = kron(innen, aussen);
  const gleich = maxAbw(ergebnis, vertauscht) === 0;

  /** Probe zur Transponierten: A^T ⊗ B^T gegen (A ⊗ B)^T, in derselben Reihenfolge. */
  const ohneT = aErst ? kron(A, B) : kron(B, A);
  const mitT = aErst ? kron(AT, BT) : kron(BT, AT);
  const probe = maxAbw(mitT, transponiert(ohneT));

  const titel = aErst
    ? `A${transp ? "ᵀ" : ""} ⊗ B${transp ? "ᵀ" : ""}`
    : `B${transp ? "ᵀ" : ""} ⊗ A${transp ? "ᵀ" : ""}`;
  /** Namen für die Probe, in der aktuell gezeigten Reihenfolge. */
  const probeLinks = aErst ? "Aᵀ ⊗ Bᵀ" : "Bᵀ ⊗ Aᵀ";
  const probeRechts = aErst ? "(A ⊗ B)ᵀ" : "(B ⊗ A)ᵀ";

  return (
    <div>
      <p className="text-sm">
        Ändern wir die Einträge der beiden Faktoren und sehen wir zu, wie sich das
        Kroneckerprodukt umbaut. Jeder Block ist eine mit einem Eintrag des äußeren Faktors
        skalierte Kopie des inneren Faktors; der Skalar steht klein über seinem Block.
        Voreingestellt sind die beiden Matrizen aus Beispiel 9.3.14.
      </p>

      <div className="my-3 flex flex-wrap items-start gap-6">
        <div>
          <div className="mb-1 font-mono text-xs" style={{ color: BLAU }}>
            A ∈ ℝ<sup>2×2</sup>
          </div>
          <MatrixInput value={A} onChange={setA} step={1} />
        </div>
        <div>
          <div className="mb-1 font-mono text-xs" style={{ color: GRUEN }}>
            B ∈ ℝ<sup>{`${zeilenB}×${spaltenB}`}</sup>
          </div>
          <MatrixInput value={B} onChange={setB} step={1} />
          <div className="mt-1 flex flex-wrap gap-1 text-xs">
            {[
              [2, 2],
              [2, 3],
              [3, 2],
              [3, 3],
            ].map(([p, q]) => (
              <button
                key={`${p}-${q}`}
                type="button"
                className="rounded border border-slate-400 px-2 py-0.5"
                style={
                  p === zeilenB && q === spaltenB
                    ? { borderColor: GRUEN, color: GRUEN }
                    : undefined
                }
                onClick={() => groesseB(p, q)}
              >
                {p}×{q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="my-3 flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1"
          onClick={() => setAErst(!aErst)}
        >
          {aErst ? "B ⊗ A zeigen" : "A ⊗ B zeigen"}
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1"
          onClick={() => setTransp(!transp)}
        >
          {transp ? "ohne Transponieren" : "beide Faktoren transponieren"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="mb-1 font-mono text-xs" style={{ color: GRAU }}>
          {titel} ∈ ℝ<sup>{`${ergebnis.length}×${ergebnis[0].length}`}</sup>
        </div>
        <div
          className="inline-grid gap-1.5 rounded border-x-2 border-slate-500 px-2 py-1.5"
          style={{
            gridTemplateColumns: `repeat(${aussen[0].length}, auto)`,
            backgroundColor: "#ffffff",
          }}
        >
          {aussen.flatMap((zeile, i1) =>
            zeile.map((s, i2) => (
              <Block
                key={`${i1}-${i2}`}
                skalar={s}
                name={`${buchstabeAussen}${i1 + 1}${i2 + 1}`}
                aussen={farbeAussen}
                innen={farbeInnen}
                werte={innen.map((r) => r.map((b) => s * b))}
              />
            ))
          )}
        </div>
      </div>

      <p className="mt-3 text-sm" style={{ color: GRAU }}>
        Zustand: A ist 2×2, B ist {zeilenB}×{spaltenB}, gezeigt ist {titel} mit{" "}
        {ergebnis.length}×{ergebnis[0].length} = {ergebnis.length * ergebnis[0].length}{" "}
        Einträgen. Vergleich mit der umgekehrten Reihenfolge:{" "}
        {gleich
          ? "beide Produkte stimmen hier ausnahmsweise überein."
          : "die beiden Produkte unterscheiden sich, die Einträge stehen an anderen Stellen."}
      </p>

      <p className="mt-1 text-sm" style={{ color: GRAU }}>
        Probe zur Transponierten: {probeLinks} und {probeRechts} weichen in keinem Eintrag um
        mehr als {fmt(probe)} voneinander ab. Transponieren zieht also in beide Faktoren hinein,
        ohne deren Reihenfolge zu vertauschen.
      </p>

      <p className="mt-1 text-xs" style={{ color: GRAU }}>
        Farben: Einträge von A blau, Einträge von B grün, Einträge des Produkts orange. Die
        Farbe hängt an der Matrix, nicht an ihrer Position, deshalb wandert nach dem Umschalten
        das Grün nach außen.
      </p>
    </div>
  );
}
