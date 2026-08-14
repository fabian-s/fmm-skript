import { useState } from "react";
import { MatrixInput, Slider } from "../../../lib";

/**
 * §10.4, zweiter Teil (Matrix zu Skalar): einen Eintrag von X anstupsen und
 * sehen, wie f(X) reagiert.
 *
 * Der Rechenkern ist aus PokeAWidget in
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S54.tsx portiert:
 * dort wird ein Eintrag einer editierbaren Matrix gestört und die zentrale
 * Differenz gegen den Formelwert gestellt (perturb/fd-Muster, eps = 1e-4, dazu
 * die Gitteranzeige der Gradientenmatrix mit hervorgehobenem Eintrag).
 * Übernommen ist nur dieser Code; Funktionsauswahl, der h-Schieber mit der
 * Restterm-Zerlegung und sämtliche Texte sind neu.
 *
 * Nachgerechnet (node, check-math-s104.mjs): ∂(aᵀXb)/∂X = abᵀ,
 * ∂‖X‖_F²/∂X = 2X, ∂tr(AᵀX)/∂X = A, jeweils gegen zentrale Differenzen
 * bestätigt; ebenso D_X f(H) = tr((∂f/∂X)ᵀH) = aᵀHb.
 */

const BLAU = "#0072B2"; // Funktionswerte
const GRUEN = "#009E73"; // lineare Approximation
const ROT = "#D55E00"; // Restterm
const ORANGE = "#E69F00"; // Gradientenmatrix

type Mat = number[][];

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const A_VEK = [1, -2]; // a in R^2
const B_VEK = [2, 1, 3]; // b in R^3
const A_MAT: Mat = [
  [1, 0, -2],
  [3, 1, 0],
]; // A in R^{2x3}

interface Funktion {
  name: string;
  tex: string;
  f: (X: Mat) => number;
  grad: (X: Mat) => Mat;
  regel: string;
  restterm: string;
}

const FUNKTIONEN: Funktion[] = [
  {
    name: "aᵀXb",
    tex: "f(X) = aᵀXb   mit a = (1; −2), b = (2; 1; 3)",
    f: (X) => A_VEK.reduce((s, ai, i) => s + ai * B_VEK.reduce((t, bj, j) => t + X[i][j] * bj, 0), 0),
    grad: () => A_VEK.map((ai) => B_VEK.map((bj) => ai * bj)),
    regel: "∂f/∂X = abᵀ (Beispiel 10.4.9)",
    restterm:
      "f ist linear in X, der Restterm ist deshalb für jedes h exakt null: die grüne Vorhersage trifft die blaue Änderung auf allen Stellen.",
  },
  {
    name: "‖X‖_F²",
    tex: "f(X) = ‖X‖_F² = tr(XᵀX)",
    f: (X) => X.flat().reduce((s, v) => s + v * v, 0),
    grad: (X) => X.map((zeile) => zeile.map((v) => 2 * v)),
    regel: "∂f/∂X = 2X (Satz 10.4.10)",
    restterm:
      "Hier ist f quadratisch. Der Restterm ist exakt h²: Er fällt für kleine h schneller gegen null als h selbst und verschwindet im Grenzwert gegenüber dem grünen Term. Mehr verlangt Definition 10.1.5 auch nicht.",
  },
  {
    name: "tr(AᵀX)",
    tex: "f(X) = tr(AᵀX)   mit A = (1 0 −2; 3 1 0)",
    f: (X) => {
      const flach = X.flat();
      return A_MAT.flat().reduce((s, v, k) => s + v * flach[k], 0);
    },
    grad: () => A_MAT.map((zeile) => [...zeile]),
    regel: "∂f/∂X = A (Satz 10.4.10)",
    restterm:
      "Auch diese Funktion ist linear in X, der Restterm bleibt exakt null. Das Skalarprodukt tr(AᵀX) ist der Prototyp: Die Gradientenmatrix ist der Partner, mit dem X multipliziert wird.",
  },
];

const START_X: Mat = [
  [1, 0, 2],
  [-1, 2, 1],
];

export function AnstupsWidget() {
  const [wahl, setWahl] = useState(0);
  const [X, setX] = useState<Mat>(START_X.map((zeile) => [...zeile]));
  const [i, setI] = useState(1);
  const [j, setJ] = useState(3);
  const [h, setH] = useState(0.4);
  const fn = FUNKTIONEN[wahl];

  const G = fn.grad(X);
  const eintrag = G[i - 1][j - 1];
  const ij = `${i}${j}`;

  // Zentrale Differenz aus zwei Auswertungen von f an der gestörten Matrix.
  const eps = 1e-4;
  const gestoert = (s: number) => {
    const Z = X.map((zeile) => [...zeile]);
    Z[i - 1][j - 1] += s;
    return fn.f(Z);
  };
  const differenz = (gestoert(eps) - gestoert(-eps)) / (2 * eps);

  // Zerlegung der endlichen Änderung in linearen Teil und Restterm.
  const f0 = fn.f(X);
  const fH = gestoert(h);
  const aenderung = fH - f0;
  const linear = eintrag * h;
  const rest = aenderung - linear;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-xs" style={{ color: "#64748b" }}>
          f wählen:
        </span>
        {FUNKTIONEN.map((fk, k) => (
          <button
            key={fk.name}
            type="button"
            className={`rounded border px-3 py-1 text-sm ${
              k === wahl
                ? "border-slate-500 bg-slate-100 font-semibold dark:bg-slate-700"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => setWahl(k)}
          >
            {fk.name}
          </button>
        ))}
      </div>
      <p className="max-w-prose text-sm">
        <span className="font-mono">{fn.tex}</span>, ausgewertet an X ∈ ℝ²ˣ³.{" "}
        <span style={{ color: ORANGE }}>{fn.regel}</span>
      </p>
      <div className="flex flex-wrap items-start gap-6">
        <div>
          <p className="mb-1 text-xs" style={{ color: BLAU }}>
            X (editierbar)
          </p>
          <MatrixInput value={X} onChange={setX} />
        </div>
        <div>
          <p className="mb-1 text-xs" style={{ color: ORANGE }}>
            ∂f(X)/∂X, Eintrag ({i},{j}) hervorgehoben
          </p>
          <div className="inline-grid grid-cols-3 gap-1">
            {G.map((zeile, r) =>
              zeile.map((v, c) => (
                <span
                  key={`${r}-${c}`}
                  className="w-14 rounded border px-1 py-0.5 text-center font-mono text-xs"
                  style={
                    r === i - 1 && c === j - 1
                      ? { borderColor: ORANGE, borderWidth: 2, color: ORANGE, fontWeight: 600 }
                      : { borderColor: "#94a3b8" }
                  }
                >
                  {fmt(v, 2)}
                </span>
              )),
            )}
          </div>
        </div>
        <div className="min-w-56 grow">
          <Slider
            label="Zeile i"
            value={i}
            onChange={setI}
            min={1}
            max={2}
            step={1}
            fmt={(v) => v.toFixed(0)}
          />
          <Slider
            label="Spalte j"
            value={j}
            onChange={setJ}
            min={1}
            max={3}
            step={1}
            fmt={(v) => v.toFixed(0)}
          />
          <Slider
            label="Störung h"
            value={h}
            onChange={(v) => setH(Math.round(v * 100) / 100)}
            min={-1}
            max={1}
            step={0.01}
            fmt={(v) => fmt(v, 2)}
          />
        </div>
      </div>
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p>
          Zentraler Differenzenquotient von f nach{" "}
          <span className="font-mono">
            x<sub>{ij}</sub>
          </span>
          : <span className="font-mono">{fmt(differenz, 4)}</span>. Vorhersage aus der
          Gradientenmatrix:{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            {fmt(eintrag, 4)}
          </span>
          .
        </p>
        <p>
          Endliche Störung um{" "}
          <span className="font-mono">
            h = {fmt(h, 2)} in Richtung E<sub>{ij}</sub>
          </span>
          :
        </p>
        <p className="pl-4">
          <span className="font-mono" style={{ color: BLAU }}>
            f(X + h·E) − f(X) = {fmt(aenderung, 4)}
          </span>
          {" = "}
          <span className="font-mono" style={{ color: GRUEN }}>
            {fmt(linear, 4)}
          </span>
          {" + "}
          <span className="font-mono" style={{ color: ROT }}>
            {fmt(rest, 4)}
          </span>
        </p>
        <p>
          Grün ist der Ableitungsterm D<sub>X</sub>f(h·E) = h·[∂f/∂X]
          <sub>{ij}</sub>, rot der Restterm. {fn.restterm}
        </p>
      </div>
    </div>
  );
}
