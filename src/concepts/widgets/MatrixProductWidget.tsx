/**
 * Konzept-Widget `matrix-product`.
 *
 * DIE EINE EINSICHT: Das Produkt AB ist kein neues Rechenspiel, sondern eine
 * Abkürzung: es tut in einem Schritt, was B und danach A in zweien tun. Und
 * weil die Reihenfolge der beiden Schritte zählt, ist AB ≠ BA.
 *
 * FARBROLLEN: blau = das transformierte Gitter (Lib-Vorgabe für „Bild unter
 * der aktuellen Matrix"); rot = der mitlaufende Testvektor x; orange = die
 * Endlage, die die andere Reihenfolge ergäbe.
 *
 * PROVENIENZ: Matrizen (Scherung B, Streckung A) aus dem Vorgängerwidget
 * (Stand 2026-08-18); Schrittfolge über den Lib-`Stepper`, weicher Übergang
 * über `transitionMs` der Lib-`TransformCanvas`. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L2/verify-qa-l2.mjs,
 * 2026-08-20), B = [[1, s], [0, 1]], A = [[k, 0], [0, 1]], x = (1, 1):
 *   k = 1,5, s = 0,8: Bx = (1,8; 1), A(Bx) = (2,7; 1) = (AB)x,
 *                     AB = [[1,5; 1,2], [0, 1]], BA = [[1,5; 0,8], [0, 1]];
 *   k = 0,6, s = −1,2: Bx = (−0,2; 1), A(Bx) = (−0,12; 1) = (AB)x,
 *                     AB = [[0,6; −0,72], [0, 1]], BA = [[0,6; −1,2], [0, 1]].
 * In beiden Fällen gilt det(AB) = det A · det B (1,5000 bzw. 0,6000) und
 * AB ≠ BA.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  Slider,
  Stepper,
  TransformCanvas,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  fmtDe,
  type Mat2,
} from "../../lib";

const IDENT: Mat2 = [
  [1, 0],
  [0, 1],
];
const X: [number, number] = [1, 1];

/** Deutsche Dezimalzahl fuer MathJax: Komma als {,}, echtes Minus als -. */
const tex = (v: number) => fmtDe(v, 2).replace("−", "-").replace(",", "{,}");

const mal = (P: Mat2, Q: Mat2): Mat2 => [
  [P[0][0] * Q[0][0] + P[0][1] * Q[1][0], P[0][0] * Q[0][1] + P[0][1] * Q[1][1]],
  [P[1][0] * Q[0][0] + P[1][1] * Q[1][0], P[1][0] * Q[0][1] + P[1][1] * Q[1][1]],
];
const anwenden = (P: Mat2, v: [number, number]): [number, number] => [
  P[0][0] * v[0] + P[0][1] * v[1],
  P[1][0] * v[0] + P[1][1] * v[1],
];

export function CompositionWidget() {
  const [s, setS] = useState(0.8);
  const [k, setK] = useState(1.5);
  const [schritt, setSchritt] = useState(0);
  const [zuerstB, setZuerstB] = useState(true);

  const B: Mat2 = [
    [1, s],
    [0, 1],
  ];
  const A: Mat2 = [
    [k, 0],
    [0, 1],
  ];
  const erste = zuerstB ? B : A;
  const produkt = zuerstB ? mal(A, B) : mal(B, A);
  const andere = zuerstB ? mal(B, A) : mal(A, B);
  const aktuell: Mat2 = schritt === 0 ? IDENT : schritt === 1 ? erste : produkt;

  const xJetzt = anwenden(aktuell, X);
  const xAndere = anwenden(andere, X);
  // Verglichen werden die MATRIZEN, nicht nur die Bilder des Testvektors x:
  // AB = [[k, ks], [0, 1]] und BA = [[k, s], [0, 1]] unterscheiden sich einzig
  // im Eintrag (1,2), also ist AB = BA genau dann, wenn ks = s ist (s = 0 oder
  // k = 1). Gleiche Bilder von x allein wären kein Beleg für AB = BA.
  const gleich =
    Math.max(
      ...([0, 1] as const).flatMap((i) => ([0, 1] as const).map((j) => Math.abs(produkt[i][j] - andere[i][j]))),
    ) < 1e-9;

  const narration =
    schritt === 0
      ? "Ausgangslage: das Gitter ist unberührt."
      : schritt === 1
        ? zuerstB
          ? "Schritt 1: B schert das Gitter."
          : "Schritt 1: A streckt das Gitter waagerecht."
        : zuerstB
          ? "Schritt 2: A streckt das schon gescherte Gitter – dasselbe leistet AB in einem Zug."
          : "Schritt 2: B schert das schon gestreckte Gitter – dasselbe leistet BA in einem Zug.";

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Gehen wir die beiden Schritte durch und tauschen wir dann ihre Reihenfolge.</Aufgabe>
      <TransformCanvas
        matrix={aktuell}
        size={280}
        worldHalf={3.2}
        xLabel="x₁"
        yLabel="x₂"
        transitionMs={250}
        vectors={[
          { v: xJetzt, color: FMM_COLORS.rot, label: "x" },
          ...(schritt === 2 && !gleich
            ? [{ v: xAndere, color: FMM_COLORS.orange, label: "andere Reihenfolge" }]
            : []),
        ]}
        ariaLabel={`Das Gitter nach ${schritt} von 2 Schritten; der Testvektor x liegt bei (${fmtDe(xJetzt[0], 2)}; ${fmtDe(xJetzt[1], 2)}).`}
      />
      <div className="my-1 flex flex-wrap gap-1 text-xs">
        <button
          type="button"
          aria-pressed={zuerstB}
          className={zuerstB ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setZuerstB(true)}
        >
          erst B, dann A
        </button>
        <button
          type="button"
          aria-pressed={!zuerstB}
          className={!zuerstB ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setZuerstB(false)}
        >
          erst A, dann B
        </button>
      </div>
      <Stepper step={schritt} setStep={setSchritt} max={2} narration={narration} />
      <Slider label="Scherung s (B)" value={s} onChange={setS} min={-1.5} max={1.5} step={0.05} />
      <Slider label="Streckung k (A)" value={k} onChange={setK} min={0.3} max={2} step={0.05} />
      <Verdikt kind={schritt === 2 ? (gleich ? "warn" : "fail") : "neutral"}>
        {schritt < 2 ? (
          <>
            {schritt === 0 ? "Beide Schritte stehen noch aus." : "Noch fehlt ein Schritt."} Das
            Produkt fasst beide zusammen: der Eintrag in Zeile i,
            Spalte j ist das Skalarprodukt von Zeile i der linken mit Spalte j der rechten Matrix.
          </>
        ) : (
          <>
            <M>
              {zuerstB
                ? `\\bA\\bB = \\begin{pmatrix} ${tex(k)} & ${tex(k * s)} \\\\ 0 & 1 \\end{pmatrix}`
                : `\\bB\\bA = \\begin{pmatrix} ${tex(k)} & ${tex(s)} \\\\ 0 & 1 \\end{pmatrix}`}
            </M>{" "}
            schafft beide Schritte auf einmal. {gleich
              ? "Hier fallen beide Reihenfolgen zusammen: Die Produkte unterscheiden sich nur im Eintrag (1,2), ks gegen s – und bei s = 0 oder k = 1 ist ks = s."
              : `Die andere Reihenfolge landet dagegen bei (${fmtDe(xAndere[0], 2)}; ${fmtDe(xAndere[1], 2)}) statt (${fmtDe(xJetzt[0], 2)}; ${fmtDe(xJetzt[1], 2)}); im Eintrag (1,2) steht ks = ${fmtDe(k * s, 2)} gegen s = ${fmtDe(s, 2)}, also AB ≠ BA. Die Determinante stört das nicht, sie ist in beiden Fällen ${fmtDe(k, 2)}.`}
          </>
        )}
      </Verdikt>
    </div>
  );
}
