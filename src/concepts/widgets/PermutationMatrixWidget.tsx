/**
 * Konzept-Widget `permutation-matrix`.
 *
 * DIE EINE EINSICHT: Eine Permutationsmatrix rechnet nicht, sie räumt um. Die
 * Einträge des Bildvektors sind immer dieselben Zahlen — nur an anderen
 * Plätzen. Und eine der sechs Matrizen räumt gar nichts um: die Einheitsmatrix.
 *
 * FARBROLLEN: blau = die Einsen, also die Plätze, auf die umgeordnet wird;
 * neutral = die Nullen. Das Verdikt trägt die Rückmeldefarbe, keine Rollenfarbe.
 *
 * PROVENIENZ: die sechs Permutationen und der Testvektor aus der Vorfassung
 * (Stand 2026-08-20); die Fallunterscheidung Identität/echte Umordnung im
 * Verdikt und die Nennung des Bildvektors sind neu.
 *
 * Das Widget zeigt Matrizen und einen Vektor als Formel, kein Koordinatenbild;
 * Achsen mit Ticks gibt es hier nichts zu beschriften.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * mit x = (5 | 7 | 9) liefern die sechs Permutationen die Bilder (5,7,9),
 * (5,9,7), (7,5,9), (7,9,5), (9,5,7), (9,7,5) — genau eine davon, P1, ist die
 * Identität und lässt die Reihenfolge unverändert; alle sechs sind orthogonal
 * (PᵀP = I nachgerechnet), und jedes Bild ist eine Umordnung derselben drei
 * Zahlen.
 */
import { useState } from "react";
import { Aufgabe, MD, Verdikt, W_BUTTON, W_BUTTON_AKTIV } from "../../lib";

const PERMS: number[][] = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];
const X = [5, 7, 9];

export function PermWidget() {
  const [k, setK] = useState(3);
  const p = PERMS[k]; // Zeile i von P ist der Einheits-Zeilenvektor mit der 1 in Spalte p[i]
  const zeilen = p
    .map((pi) => [0, 1, 2].map((j) => (j === pi ? "1" : "0")).join(" & "))
    .join(" \\\\ ");
  const Px = p.map((pi) => X[pi]);
  const identitaet = p.every((pi, i) => pi === i);
  const feste = p.filter((pi, i) => pi === i).length;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Wählen wir eine der sechs möglichen Umordnungen.</Aufgabe>
      <div className="flex flex-wrap gap-1" role="group" aria-label="Permutation wählen">
        {PERMS.map((_, i) => (
          <button
            type="button"
            key={i}
            aria-pressed={k === i}
            onClick={() => setK(i)}
            className={k === i ? W_BUTTON_AKTIV : W_BUTTON}
          >
            P{i + 1}
          </button>
        ))}
      </div>
      <MD>
        {`\\bP = \\begin{pmatrix} ${zeilen} \\end{pmatrix}, \\qquad ` +
          `\\bP \\begin{pmatrix} 5 \\\\ 7 \\\\ 9 \\end{pmatrix} = ` +
          `\\begin{pmatrix} ${Px.join(" \\\\ ")} \\end{pmatrix}`}
      </MD>
      <Verdikt kind={identitaet ? "neutral" : "ok"}>
        {identitaet ? (
          <>
            P1 ist die Einheitsmatrix: das Bild ist wieder (5, 7, 9). Auch das Nichtstun ist eine
            Permutation – und sie ist der Grund, warum ein Algorithmus ohne Zeilentausch trotzdem
            ein P protokollieren kann.
          </>
        ) : (
          <>
            P{k + 1} schiebt (5, 7, 9) auf ({Px.join(", ")}):{" "}
            {feste === 0
              ? "kein einziger Eintrag bleibt auf seinem Platz"
              : `${feste} Eintrag bleibt auf seinem Platz, die übrigen tauschen`}
            . Die Werte selbst sind unverändert – deshalb ändert P keine Längen und ist orthogonal,
            mit P⁻¹ = Pᵀ.
          </>
        )}
      </Verdikt>
    </div>
  );
}
