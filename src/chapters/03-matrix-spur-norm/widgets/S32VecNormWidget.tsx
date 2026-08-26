import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  MD,
  MatrixInput,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  fmtDe,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §3.2: Die drei Vektorisierungsnormen einer 2×2-Matrix.
 *
 * DIE EINE EINSICHT: Frobenius-, Summen- und Maximumsnorm hängen nur davon ab,
 * WELCHE Zahlen in der Matrix stehen, nicht davon, WO sie stehen. Der Knopf
 * „Einträge durchtauschen" macht das zur Handlung: dieselben drei Zahlen,
 * völlig andere Abbildung (Beispiel 3.2.6).
 *
 * FARBROLLEN (Kapitel-3-Tabelle): blau = Frobenius-Norm, orange = Summennorm,
 * violett = Maximumsnorm – identisch zu den Farben \cblue/\corange/\cpurp im
 * Fließtext von Beispiel 3.2.5, damit Formel und Rechnung dieselbe Farbe für
 * dieselbe Norm tragen. Grün, Rot und Grau sind hier nicht belegt.
 *
 * PROVENIENZ: Eigenbau (Vorfassung 2026-08-05); neu sind Voreinstellung,
 * Permutationsknopf und Verdikt.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen: A₁ = I, A₂ = Vertauschung und A₃ = diag(√2, 0)
 * haben alle ‖A‖_F = 1,414214 = √2; ihre Summennormen sind 2, 2 und 1,414214,
 * ihre Maximumsnormen 1, 1 und 1,414214. Die Beispielmatrix (1 −2; 3 4) hat
 * ‖·‖_F = 5,477226 = √30, ‖·‖_S = 10, ‖·‖_M = 4.
 */

/** Deutsche Dezimaldarstellung für MathJax-Strings: 1.25 -> "1{,}25". */
function de(v: number): string {
  const s = String(parseFloat(v.toFixed(4)));
  return s.replace(".", "{,}").replace(/^-/, "−");
}

const BLAU = FMM_COLORS.blau; // Frobenius-Norm
const ORANGE = FMM_COLORS.orange; // Summennorm
const VIOLETT = FMM_COLORS.violett; // Maximumsnorm

type Mat = number[][];

const PRESETS: { name: string; titel: string; m: Mat }[] = [
  { name: "A₁ (Identität)", titel: "lässt jeden Vektor unverändert", m: [[1, 0], [0, 1]] },
  { name: "A₂ (Vertauschung)", titel: "Spiegelung an der Winkelhalbierenden", m: [[0, 1], [1, 0]] },
  { name: "A₃ (√2-Streckung)", titel: "singulär: staucht die Ebene auf eine Gerade", m: [[Math.SQRT2, 0], [0, 0]] },
  { name: "Beispielmatrix", titel: "eine Matrix ohne besondere Struktur", m: [[1, -2], [3, 4]] },
];

const gleich = (a: Mat, b: Mat) => a.every((r, i) => r.every((x, j) => Math.abs(x - b[i][j]) < 1e-9));

export function S32VecNormWidget() {
  const [mat, setMat] = useState<Mat>(PRESETS[0].m.map((r) => [...r]));
  const [getauscht, setGetauscht] = useState(0);

  // vec(A) stapelt die SPALTEN: (a11, a21, a12, a22)
  const v = [mat[0][0], mat[1][0], mat[0][1], mat[1][1]];
  const frob = Math.hypot(...v);
  const sum = v.reduce((acc, x) => acc + Math.abs(x), 0);
  const max = Math.max(...v.map((x) => Math.abs(x)));

  const sqTerms = v.map((x) => `(${de(x)})^2`).join(" + ");
  const absTerms = v.map((x) => `\\left|${de(x)}\\right|`).join(" + ");
  const absList = v.map((x) => `\\left|${de(x)}\\right|`).join(",\\, ");
  const vecList = v.map((x) => de(x)).join(",\\, ");

  const setzen = (m: Mat) => {
    setMat(m.map((r) => [...r]));
    setGetauscht(0);
  };
  /** zyklische Verschiebung von vec(A): dieselben vier Zahlen, andere Matrix */
  const durchtauschen = () => {
    setMat([
      [mat[1][1], mat[1][0]],
      [mat[0][0], mat[0][1]],
    ]);
    setGetauscht((k) => k + 1);
  };

  const dieDrei = PRESETS.slice(0, 3).some((p) => gleich(p.m, mat));
  const singulaer = Math.abs(mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]) < 1e-9;

  return (
    <div className="space-y-2 text-sm">
      <Aufgabe>
        Klicken wir die drei Matrizen <M>{"\\bA_1, \\bA_2, \\bA_3"}</M> durch und tauschen wir danach
        die Einträge einer beliebigen Matrix durch.
      </Aufgabe>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((pr) => {
          const aktiv = gleich(pr.m, mat);
          return (
            <button
              key={pr.name}
              type="button"
              title={pr.titel}
              aria-pressed={aktiv}
              className={`text-xs ${aktiv ? W_BUTTON_AKTIV : W_BUTTON}`}
              onClick={() => setzen(pr.m)}
            >
              {pr.name}
            </button>
          );
        })}
        <button type="button" className={`text-xs ${W_BUTTON}`} onClick={durchtauschen}>
          Einträge durchtauschen
        </button>
      </div>
      <div className="my-2 flex flex-wrap items-center gap-3">
        <M>{"\\bA = "}</M>
        <MatrixInput value={mat} onChange={setzen} step={0.1} />
        <M>{`\\quimpl \\vec(\\bA) = (${vecList})^\\top`}</M>
      </div>
      <MD>{`\\cblue{\\left\\| \\bA \\right\\|_F} = \\left\\| \\vec(\\bA) \\right\\|_2 = \\sqrt{${sqTerms}} = \\cblue{${de(frob)}}`}</MD>
      <MD>{`\\corange{\\left\\| \\bA \\right\\|_S} = \\left\\| \\vec(\\bA) \\right\\|_1 = ${absTerms} = \\corange{${de(sum)}}`}</MD>
      <MD>{`\\cpurp{\\left\\| \\bA \\right\\|_M} = \\left\\| \\vec(\\bA) \\right\\|_\\infty = \\max\\left\\{ ${absList} \\right\\} = \\cpurp{${de(max)}}`}</MD>
      <p className={`text-xs ${W_MUTED}`}>
        <span style={{ color: BLAU }}>blau</span> Frobenius-Norm,{" "}
        <span style={{ color: ORANGE }}>orange</span> Summennorm,{" "}
        <span style={{ color: VIOLETT }}>violett</span> Maximumsnorm.
      </p>
      <Verdikt kind={getauscht > 0 ? "warn" : dieDrei ? "ok" : "neutral"}>
        {getauscht > 0 ? (
          <>
            Nach {getauscht === 1 ? "einem Tausch" : `${fmtDe(getauscht, 0)} Tauschvorgängen`} stehen
            dieselben vier Zahlen an anderen Plätzen. Alle drei Normen sind unverändert (
            {fmtDe(frob, 3)} / {fmtDe(sum, 3)} / {fmtDe(max, 3)}), die Determinante ist inzwischen{" "}
            {fmtDe(mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0], 3)}: Als Abbildung ist das eine
            andere Matrix, für die Vektorisierungsnormen dieselbe. Genau diese Blindheit führt in{" "}
            <a className="underline" href="#sec-3.3">
              {ref("sec:matrix-spur-norm/operatornormen")}
            </a>{" "}
            zu den Operatornormen.
          </>
        ) : dieDrei ? (
          <>
            Frobenius-Norm {fmtDe(frob, 3)} = √2, derselbe Wert wie für die beiden anderen
            Voreinstellungen aus {ref("beispiel:gleiche-frobenius-norm-voellig")}, obwohl <M>{"\\bA_1"}</M> nichts verändert,{" "}
            <M>{"\\bA_2"}</M> spiegelt und <M>{"\\bA_3"}</M> eine ganze Dimension vernichtet. Nur
            Summen- und Maximumsnorm trennen wenigstens <M>{"\\bA_3"}</M> von den beiden anderen,
            und auch das eher zufällig.
          </>
        ) : (
          <>
            Die drei Normen lesen dieselben vier Zahlen verschieden: {fmtDe(frob, 3)} (quadratisch
            gemittelt), {fmtDe(sum, 3)} (alles aufaddiert), {fmtDe(max, 3)} (nur der größte Betrag).
            {singulaer
              ? " Diese Matrix ist singulär, sie drückt die Ebene auf eine Gerade; keine der drei Zahlen verrät das."
              : " Wohin die Matrix Vektoren schickt, verrät keine der drei Zahlen."}
          </>
        )}
      </Verdikt>
    </div>
  );
}
