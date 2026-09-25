/**
 * F1 — DIE EINE EINSICHT: Ein Selbsttest liefert erst nach einer eigenen Wahl
 * gezieltes Feedback.
 * FARBROLLEN: keine eigenen; die Rückmeldung läuft über <Verdikt kind="ok" /
 * "fail">, die Oberfläche über die Klassenketten aus surface.ts. Damit belegt
 * die Komponente insbesondere nicht Rot, das im Kapitel „das teure Verfahren"
 * bedeutet, mit einer zweiten Rolle.
 * PROVENIENZ: Eigene, aus der TSX-Fassung von S23 portierte MDX-Hilfskomponente.
 * VERIFIZIERTE ZAHLEN: keine numerischen Claims in Caption oder Verdikt.
 */
import { useState, type ReactNode } from "react";
import { Verdikt, W_BUTTON, W_BUTTON_AKTIV, W_MUTED, W_PANEL } from "../../../lib";

/**
 * Lokale Begleitkomponente für Abschnitt 2.3 (aus der TSX-Fassung von S23
 * portiert, MDX-Migration 2026-08-11).
 *
 * Selbsttest: Multiple-Choice mit Feedback pro Option und aufklappbarer
 * Lösung. Das ist kein wahr/falsch-Quiz und deshalb nicht als
 * ::::quiz-Direktive abbildbar.
 */
export function SelfTest({
  frage,
  optionen,
  richtig,
  loesung,
}: {
  frage: ReactNode;
  optionen: ReactNode[];
  richtig: number;
  loesung: ReactNode;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const answered = chosen !== null;
  const correct = answered && chosen === richtig;
  return (
    <div className={`my-4 max-w-prose p-4 ${W_PANEL}`}>
      <div className="mb-3">{frage}</div>
      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Antwortmöglichkeiten">
        {optionen.map((opt, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={chosen === i}
            className={`text-left ${chosen === i ? W_BUTTON_AKTIV : W_BUTTON}`}
            onClick={() => setChosen(i)}
          >
            <span className={`mr-2 font-mono text-xs ${W_MUTED}`}>
              {String.fromCharCode(97 + i)})
            </span>
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <div className="mt-3">
          <Verdikt kind={correct ? "ok" : "fail"}>
            {correct
              ? "Richtig."
              : "Leider nein, noch einmal probieren oder die Lösung ansehen."}
          </Verdikt>
        </div>
      )}
      <button
        type="button"
        className={`mt-3 text-xs ${W_BUTTON}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "Lösung verbergen" : "Lösung anzeigen"}
      </button>
      {open && <div className="mt-3 space-y-2 text-sm">{loesung}</div>}
    </div>
  );
}
