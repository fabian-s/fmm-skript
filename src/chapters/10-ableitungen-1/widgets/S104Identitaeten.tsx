import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * §10.4, erster Teil (Skalar zu Matrix): die drei Identitäten aus Satz 10.4.4
 * gegen numerische Ableitungen halten.
 *
 * Bauart übernommen aus IdentityWidget in
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S54.tsx: dort wird
 * eine Gradientenformel gegen einen zentralen Differenzenquotienten gestellt.
 * Übernommen ist nur dieses Rechenmuster (zentrale Differenz mit eps = 1e-5,
 * Formelwert daneben); Funktionsauswahl, Aufbau und sämtliche Texte sind neu.
 *
 * Nachgerechnet (node, check-math-s104.mjs): für F(x) = (x 1; x^2 3x) stimmen
 * alle drei Identitäten auf 1e-9 mit den zentralen Differenzen überein; für
 * F = diag(x, 2x) liefern beide Wege 4x; für die Drehmatrix ist det F = 1 und
 * damit tr(F^-1 F') = 0.
 */

const BLAU = "#0072B2"; // Funktion, Funktionswerte
const GRUEN = "#009E73"; // Vorhersage der Identität
const ROT = "#D55E00"; // Abweichung
const ORANGE = "#E69F00"; // Ableitungsobjekt dF/dx

type Mat = number[][];

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

function det2(A: Mat): number {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

function inv2(A: Mat): Mat {
  const d = det2(A);
  return [
    [A[1][1] / d, -A[0][1] / d],
    [-A[1][0] / d, A[0][0] / d],
  ];
}

function mul(A: Mat, B: Mat): Mat {
  return A.map((zeile) => B[0].map((_, j) => zeile.reduce((s, v, k) => s + v * B[k][j], 0)));
}

function spur(A: Mat): number {
  return A.reduce((s, zeile, i) => s + zeile[i], 0);
}

const EPS = 1e-5;

/** Zentrale Differenz einer skalaren Funktion. */
function dSkalar(f: (x: number) => number, x: number): number {
  return (f(x + EPS) - f(x - EPS)) / (2 * EPS);
}

/** Zentrale Differenz einer matrixwertigen Funktion, Eintrag für Eintrag. */
function dMatrix(F: (x: number) => Mat, x: number): Mat {
  const rechts = F(x + EPS);
  const links = F(x - EPS);
  return rechts.map((zeile, i) => zeile.map((v, j) => (v - links[i][j]) / (2 * EPS)));
}

interface Beispiel {
  name: string;
  tex: string;
  F: (x: number) => Mat;
  Fp: (x: number) => Mat;
  xMin: number;
  xMax: number;
  x0: number;
  hinweis: string;
}

const BEISPIELE: Beispiel[] = [
  {
    name: "diag(x, 2x)",
    tex: "F(x) = (x 0; 0 2x)",
    F: (x) => [
      [x, 0],
      [0, 2 * x],
    ],
    Fp: () => [
      [1, 0],
      [0, 2],
    ],
    xMin: -2,
    xMax: 2,
    x0: 1,
    hinweis:
      "Die Diagonalmatrix aus Beispiel 10.4.5: det F(x) = 2x², die Ableitung ist 4x. Bei x = 0 ist F singulär, dann sind F⁻¹ und die Formel für die Determinante nicht definiert.",
  },
  {
    name: "(x 1; x² 3x)",
    tex: "F(x) = (x 1; x² 3x)",
    F: (x) => [
      [x, 1],
      [x * x, 3 * x],
    ],
    Fp: (x) => [
      [1, 0],
      [2 * x, 3],
    ],
    xMin: -2,
    xMax: 2,
    x0: 1.3,
    hinweis:
      "Hier hängt jeder Eintrag anders von x ab, der rechte obere sogar gar nicht. det F(x) = 3x² − x² = 2x², also wieder 4x als Ableitung, diesmal aber über einen unübersichtlicheren Weg.",
  },
  {
    name: "Drehmatrix",
    tex: "F(x) = (cos x −sin x; sin x cos x)",
    F: (x) => [
      [Math.cos(x), -Math.sin(x)],
      [Math.sin(x), Math.cos(x)],
    ],
    Fp: (x) => [
      [-Math.sin(x), -Math.cos(x)],
      [Math.cos(x), -Math.sin(x)],
    ],
    xMin: -3,
    xMax: 3,
    x0: 0.6,
    hinweis:
      "Eine Drehung um den Winkel x hat stets det F(x) = 1. Die Determinante ist also konstant, ihre Ableitung null, und die Jacobi-Formel muss das über tr(F⁻¹ ∂F/∂x) = 0 abbilden.",
  },
];

function MatTafel({
  titel,
  A,
  farbe,
  stellen = 3,
}: {
  titel: string;
  A: Mat;
  farbe: string;
  stellen?: number;
}) {
  return (
    <div>
      <p className="mb-1 text-xs" style={{ color: farbe }}>
        {titel}
      </p>
      <div className="inline-grid grid-cols-2 gap-1">
        {A.map((zeile, i) =>
          zeile.map((v, j) => (
            <span
              key={`${i}-${j}`}
              className="w-16 rounded border border-slate-300 px-1 py-0.5 text-center font-mono text-xs dark:border-slate-600"
            >
              {fmt(v, stellen)}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

function Zeile({
  was,
  numerisch,
  formel,
}: {
  was: string;
  numerisch: number;
  formel: number;
}) {
  const abweichung = Math.abs(numerisch - formel);
  const passt = Number.isFinite(abweichung) && abweichung < 1e-4;
  return (
    <tr>
      <td className="py-1 pr-3">{was}</td>
      <td className="py-1 pr-3 text-right font-mono" style={{ color: BLAU }}>
        {fmt(numerisch, 4)}
      </td>
      <td className="py-1 pr-3 text-right font-mono" style={{ color: GRUEN }}>
        {fmt(formel, 4)}
      </td>
      <td className="py-1 text-right font-mono" style={{ color: passt ? GRUEN : ROT }}>
        {passt ? "✓" : fmt(abweichung, 4)}
      </td>
    </tr>
  );
}

export function IdentitaetenSkalarMatrix() {
  const [wahl, setWahl] = useState(0);
  const [x, setX] = useState(BEISPIELE[0].x0);
  const bsp = BEISPIELE[wahl];

  const F = bsp.F(x);
  const Fp = bsp.Fp(x);
  const d = det2(F);
  const singulaer = Math.abs(d) < 1e-8;

  // Spur
  const spurNum = dSkalar((t) => spur(bsp.F(t)), x);
  const spurFormel = spur(Fp);

  // Determinante
  const detNum = dSkalar((t) => det2(bsp.F(t)), x);
  const detFormel = singulaer ? NaN : d * spur(mul(inv2(F), Fp));

  // Inverse: größte Abweichung über alle vier Einträge
  const invNum = singulaer ? null : dMatrix((t) => inv2(bsp.F(t)), x);
  const invFormel = singulaer
    ? null
    : mul(mul(inv2(F), Fp), inv2(F)).map((zeile) => zeile.map((v) => -v));
  const invAbweichung =
    invNum && invFormel
      ? Math.max(...invNum.flat().map((v, i) => Math.abs(v - invFormel.flat()[i])))
      : NaN;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-xs" style={{ color: "#64748b" }}>
          F(x) wählen:
        </span>
        {BEISPIELE.map((b, i) => (
          <button
            key={b.name}
            type="button"
            className={`rounded border px-3 py-1 text-sm ${
              i === wahl
                ? "border-slate-500 bg-slate-100 font-semibold dark:bg-slate-700"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => {
              setWahl(i);
              setX(BEISPIELE[i].x0);
            }}
          >
            {b.name}
          </button>
        ))}
      </div>
      <p className="max-w-prose text-sm">
        <span className="font-mono">{bsp.tex}</span>. {bsp.hinweis}
      </p>
      <Slider
        label="x"
        value={x}
        onChange={(v) => setX(Math.round(v * 100) / 100)}
        min={bsp.xMin}
        max={bsp.xMax}
        step={0.01}
        fmt={(v) => fmt(v, 2)}
      />
      <div className="flex flex-wrap gap-6">
        <MatTafel titel="F(x)" A={F} farbe={BLAU} />
        <MatTafel titel="∂F(x)/∂x" A={Fp} farbe={ORANGE} />
      </div>
      <div className="overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr className="border-b border-slate-300 dark:border-slate-600">
              <th className="py-1 pr-3 text-left font-semibold">Identität</th>
              <th className="py-1 pr-3 text-right font-semibold">numerisch</th>
              <th className="py-1 pr-3 text-right font-semibold">Formel</th>
              <th className="py-1 text-right font-semibold">Abstand</th>
            </tr>
          </thead>
          <tbody>
            <Zeile was="∂ tr F(x) / ∂x = tr(∂F/∂x)" numerisch={spurNum} formel={spurFormel} />
            <Zeile
              was="∂ det F(x) / ∂x = det F · tr(F⁻¹ ∂F/∂x)"
              numerisch={detNum}
              formel={detFormel}
            />
          </tbody>
        </table>
      </div>
      {invNum && invFormel && (
        <>
          <div className="flex flex-wrap gap-6">
            <MatTafel titel="∂F(x)⁻¹/∂x, numerisch" A={invNum} farbe={BLAU} />
            <MatTafel titel="−F⁻¹ (∂F/∂x) F⁻¹" A={invFormel} farbe={GRUEN} />
          </div>
          <p className="text-sm">
            Größter Abstand zwischen den beiden Tafeln:{" "}
            <span
              className="font-mono"
              style={{ color: invAbweichung < 1e-4 ? GRUEN : ROT }}
            >
              {fmt(invAbweichung, 6)}
            </span>
            {invAbweichung >= 1e-4 && (
              <span style={{ color: ROT }}>
                {" "}
                Hier klaffen die Tafeln sichtbar auseinander, und daran ist nicht die Formel
                schuld: So nahe an der Nullstelle der Determinante wachsen die Einträge von
                F(x)⁻¹ wie 1/x, und bei so steilen Funktionen wird der Differenzenquotient
                selbst ungenau. Ab etwa |x| = 0,1 stimmen beide Tafeln wieder auf vier
                Nachkommastellen überein.
              </span>
            )}
          </p>
        </>
      )}
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p>
          <span className="font-mono">det F(x) = {fmt(d, 4)}</span>
          {singulaer ? (
            <>
              {". "}
              <span style={{ color: ROT }}>
                F(x) ist hier singulär. Die Determinantenformel und die Inversenformel setzen
                beide F(x)⁻¹ voraus und liefern deshalb keinen Wert; die Spur-Identität gilt
                dagegen weiter.
              </span>
            </>
          ) : (
            <>
              , tr(F⁻¹ ∂F/∂x) ={" "}
              <span className="font-mono">{fmt(spur(mul(inv2(F), Fp)), 4)}</span>. Beide Faktoren
              zusammen ergeben die Ableitung der Determinante.
            </>
          )}
        </p>
        <p>
          Die numerische Spalte kennt keine der Formeln: Wir werten F an{" "}
          <span className="font-mono">x ± 10⁻⁵</span> aus und bilden den zentralen
          Differenzenquotienten. Dass beide Spalten übereinstimmen, ist deshalb eine echte Probe
          und keine Umformung derselben Rechnung. Ein winziger Rest bleibt trotzdem: In der
          Spur- und der Determinantenzeile liegt er über den ganzen Schieberbereich unter
          10⁻⁹, meist um 10⁻¹¹. Das ist der Abbruchfehler des Differenzenquotienten, weit
          unter den angezeigten Stellen.
        </p>
      </div>
    </div>
  );
}
