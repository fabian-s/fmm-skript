import { useState } from "react";
import { M, MD, Slider } from "../../../lib";

/**
 * Informationsverlust beim Bilden von AᵀA: die Addition 1 + ε² wird hier
 * WIRKLICH in IEEE-Doppelgenauigkeit ausgeführt — das Widget ist das
 * Experiment. (Berechnungs-/SVG-Code recycelt aus der internen
 * heath-ch3-App; Texte eigenständig.)
 */

function fmt17(x: number): string {
  const s = x.toPrecision(17);
  return s.includes("e") ? s : s.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}

export function S73KreuzproduktWidget() {
  const [k, setK] = useState(6);
  const eps = Math.pow(10, -k);
  // diese Addition passiert in echter IEEE-Doppelgenauigkeit
  const d = 1 + eps * eps;
  const gap = d - 1; // gespeicherter kleiner Eigenwert von fl(AᵀA)
  const singular = gap === 0;
  const condExact = (2 + eps * eps) / (eps * eps); // exakt: κ(AᵀA) = κ(A)²
  // fl(1 + ε²) = 1 sobald ε² ≤ 2⁻⁵³, d. h. ε ≤ 2^(-26,5) ≈ 1,05·10⁻⁸ (k ≳ 7,98)
  const collapseEps = Math.pow(2, -26.5);
  return (
    <div className="text-sm">
      <p className="mb-2">
        Betrachten wir die Matrix mit vollem Spaltenrang
      </p>
      <MD>{"\\bA = \\begin{pmatrix} 1 & 1 \\\\ \\eps & 0 \\\\ 0 & \\eps \\end{pmatrix} \\quimpl \\bA^\\top\\bA = \\begin{pmatrix} 1 + \\eps^2 & 1 \\\\ 1 & 1 + \\eps^2 \\end{pmatrix}."}</MD>
      <p className="mb-2">
        Dieses Widget führt die kritische Addition <M>{"1 + \\eps^2"}</M> wirklich aus — der
        Browser rechnet in IEEE-Doppelgenauigkeit mit{" "}
        <M>{"\\eps_{\\text{mach}} = 2^{-52} \\approx 2{,}2 \\cdot 10^{-16}"}</M>. Verkleinere{" "}
        <M>{"\\eps"}</M> mit dem Regler. Faustregel: Sobald <M>{"\\eps"}</M> in die Größenordnung
        von <M>{"\\sqrt{\\eps_{\\text{mach}}} \\approx 1{,}5 \\cdot 10^{-8}"}</M> kommt, geht{" "}
        <M>{"\\eps^2"}</M> in der Addition unter; hier passiert das ab <M>{"k \\approx 8"}</M>{" "}
        — dann speichert der Rechner <M>{"\\operatorname{fl}(1 + \\eps^2) = 1"}</M>, und{" "}
        <M>{"\\operatorname{fl}(\\bA^\\top\\bA)"}</M> wird singulär.
      </p>
      <Slider label="k (ε = 10⁻ᵏ)" value={k} onChange={setK} min={4} max={10} step={0.1} fmt={(v) => v.toFixed(1)} />
      <MD>{`\\operatorname{fl}(\\bA^\\top\\bA) = \\begin{pmatrix} ${fmt17(d)} & 1 \\\\ 1 & ${fmt17(d)} \\end{pmatrix}`}</MD>
      <ul className="my-2 list-disc space-y-1 pl-5 font-mono text-xs">
        <li>ε = {eps.toExponential(2)}, ε² = {(eps * eps).toExponential(2)}</li>
        <li>gespeicherter Diagonaleintrag fl(1 + ε²) = {fmt17(d)}</li>
        <li>
          Eigenwerte der gespeicherten Matrix: {fmt17(d)} + 1 und {fmt17(d)} − 1 ={" "}
          {gap === 0 ? "0" : gap.toExponential(3)}
        </li>
        <li>exakt: κ(AᵀA) = κ(A)² ≈ {condExact.toExponential(2)}</li>
      </ul>
      {singular ? (
        <p className="font-semibold text-rose-600 dark:text-rose-400">
          fl(1 + ε²) = 1: Beide Spalten der gespeicherten Matrix sind jetzt identisch, ihr Rang
          ist 1 — dabei hat <M>{"\\bA"}</M> selbst vollen Spaltenrang 2. Was die Spalten
          unterschied, steckte allein im Summanden ε², und genau den hat die Rundung
          ausgelöscht.
        </p>
      ) : (
        <p className="text-emerald-700 dark:text-emerald-400">
          In Doppelgenauigkeit noch regulär — aber vom Abstand zur Singularität bleibt nur der
          winzige Eigenwert {gap.toExponential(3)}. Singulär wird die gespeicherte Matrix
          unterhalb von ε ≈ {collapseEps.toExponential(2)}.
        </p>
      )}
    </div>
  );
}
