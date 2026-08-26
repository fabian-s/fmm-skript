/**
 * §7.3: Informationsverlust beim Bilden von AᵀA.
 *
 * DIE EINE EINSICHT: Die Addition 1 + ε² fällt in IEEE-Doppelgenauigkeit
 * irgendwann auf 1 zurück – und genau in diesem Summanden steckte der ganze
 * Unterschied zwischen den Spalten von A. Aus einer Matrix mit vollem
 * Spaltenrang wird durch einen einzigen Rundungsschritt eine singuläre.
 *
 * Das Widget rechnet nicht nach, sondern rechnet: die kritische Addition
 * passiert wirklich in der Gleitkommaarithmetik des Browsers.
 *
 * FARBROLLEN Kapitel 7: Der Verdikt-Kasten trägt die Rückmeldungsfarben der
 * lib (ok/warn/fail); eigene Farben braucht dieses Widget nicht.
 *
 * PROVENIENZ: Berechnungsgerüst aus der internen App interactive/heath-ch3
 * portiert; sämtliche Texte für dieses Skript neu.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen:
 *   fl(1 + ε²) = 1 genau ab ε ≤ 2^−26,5 = 1,0537·10⁻⁸, also ab k = 7,9773
 *   (Bisektion in k über die echte IEEE-Addition: 7,977295 – Übereinstimmung
 *   mit 2^−26,5 auf vier Stellen). Bei k = 7 bleibt fl(1+ε²)−1 = 9,992·10⁻¹⁵,
 *   bei k = 7,9 noch 2,2204·10⁻¹⁶ (ein einziges ULP), ab k = 7,98 exakt 0.
 *   Exakt gilt κ(AᵀA) = κ(A)² = (2+ε²)/ε², bei k = 6 also 2,000·10¹² gegen
 *   κ(A) = 1,414·10⁶; die Eigenwerte der gespeicherten Matrix sind dort
 *   2,0000 und 1,0001·10⁻¹².
 *   Die früher kursierende Schwelle „k ≈ 7,9" ist zu klein (dort ist die
 *   Matrix noch regulär) – deshalb steht im Text k ≈ 8.
 */
import { useState } from "react";
import { Aufgabe, M, MD, Schaetzfrage, Slider, Verdikt } from "../../../lib";
import { ref } from "../../numbers.generated";

function fmt17(x: number): string {
  const s = x.toPrecision(17);
  return s.includes("e") ? s : s.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}

/** fl(1 + ε²) = 1 sobald ε² ≤ 2⁻⁵³, d. h. ε ≤ 2^(−26,5) ≈ 1,05·10⁻⁸. */
const COLLAPSE_EPS = Math.pow(2, -26.5);
const COLLAPSE_K = -Math.log10(COLLAPSE_EPS); // = 7,9773

function KreuzproduktTafel() {
  const [k, setK] = useState(6);
  const eps = Math.pow(10, -k);
  // diese Addition passiert in echter IEEE-Doppelgenauigkeit
  const d = 1 + eps * eps;
  const gap = d - 1; // gespeicherter kleiner Eigenwert von fl(AᵀA)
  const singular = gap === 0;
  const condExact = (2 + eps * eps) / (eps * eps); // exakt: κ(AᵀA) = κ(A)²

  return (
    <div className="text-sm">
      <MD>{"\\bA = \\begin{pmatrix} 1 & 1 \\\\ \\eps & 0 \\\\ 0 & \\eps \\end{pmatrix}"}</MD>
      <MD>{"\\bA^\\top\\bA = \\begin{pmatrix} 1 + \\eps^2 & 1 \\\\ 1 & 1 + \\eps^2 \\end{pmatrix}."}</MD>
      <Aufgabe>
        Schieben wir <M>{"k"}</M> nach oben und beobachten den gespeicherten Diagonaleintrag{" "}
        <M>{"\\operatorname{fl}(1 + \\eps^2)"}</M>.
      </Aufgabe>
      <Slider label="k (ε = 10⁻ᵏ)" value={k} onChange={setK} min={4} max={10} step={0.1} fmt={(v) => v.toFixed(1).replace(".", ",")} />
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
        <Verdikt kind="fail" titel="Rang 1 statt Rang 2:">
          <M>{"\\operatorname{fl}(1 + \\eps^2) = 1"}</M> – beide Spalten der gespeicherten Matrix
          sind jetzt identisch, ihr Rang ist 1, dabei hat <M>{"\\bA"}</M> selbst vollen
          Spaltenrang 2. Was die Spalten unterschied, steckte allein im Summanden{" "}
          <M>{"\\eps^2"}</M>, und genau den hat die Rundung ausgelöscht. Die Cholesky-Zerlegung
          aus {ref("algorithmus:cholesky-verfahren-fuer-das-kq-problem")} bricht hier ab.
        </Verdikt>
      ) : gap < 1e-14 ? (
        <Verdikt kind="warn" titel="Ein einziges ULP vom Kollaps entfernt:">
          Der kleinere Eigenwert der gespeicherten Matrix ist nur noch{" "}
          <span className="font-mono">{gap.toExponential(3)}</span>. Ein weiterer Schritt am
          Regler, und die Information über den Unterschied der Spalten ist ganz weg.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" titel="Noch regulär:">
          Vom Abstand zur Singularität bleibt der kleine Eigenwert{" "}
          <span className="font-mono">{gap.toExponential(3)}</span>. Die exakte Konditionszahl
          liegt bei <span className="font-mono">{condExact.toExponential(2)}</span> – das Quadrat
          von <M>{"\\kappa(\\bA)"}</M>, wie es {ref("bemerkung:stabilitaet-des-cholesky-verfahrens")} vorhersagt.
        </Verdikt>
      )}
    </div>
  );
}

export function S73KreuzproduktWidget() {
  return (
    <Schaetzfrage
      frage={
        <>
          Der Browser rechnet in IEEE-Doppelgenauigkeit,{" "}
          <M>{"\\eps_{\\text{mach}} = 2^{-52} \\approx 2{,}2 \\cdot 10^{-16}"}</M>. Ab welchem{" "}
          <M>{"k"}</M> speichert er <M>{"\\operatorname{fl}(1 + \\eps^2)"}</M> mit{" "}
          <M>{"\\eps = 10^{-k}"}</M> als glatte 1? Erst tippen, dann am Regler nachsehen.
        </>
      }
      loesung={COLLAPSE_K}
      toleranz={0.7}
      einheit="k"
      fmt={(v) => v.toFixed(1).replace(".", ",")}
      verdeckt={
        <Verdikt kind="neutral" titel="Auflösung:">
          Die Schwelle liegt bei <M>{"\\eps = 2^{-26{,}5} \\approx 1{,}05 \\cdot 10^{-8}"}</M>,
          also <M>{"k \\approx 8"}</M>: Sobald <M>{"\\eps^2"}</M> unter{" "}
          <M>{"\\eps_{\\text{mach}}"}</M> rutscht, geht es in der Addition unter. Als Faustregel:{" "}
          <M>{"\\eps"}</M> in der Größenordnung von <M>{"\\sqrt{\\eps_{\\text{mach}}}"}</M> reicht
          schon.
        </Verdikt>
      }
    >
      <KreuzproduktTafel />
    </Schaetzfrage>
  );
}
