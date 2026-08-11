/**
 * Lokale Begleitkomponente für Abschnitt 2.4 (aus der TSX-Fassung von S24
 * portiert, MDX-Migration 2026-08-11; Rendering unverändert).
 *
 * Selbsttest im details/summary-Muster: Die Aussage steht offen da, die
 * Lösung klappt auf Klick auf. Das ist kein wahr/falsch-Quiz mit Buttons und
 * deshalb nicht als ::::quiz-Direktive abbildbar.
 */
import { type ReactNode } from "react";

/** Aufklappbare Selbsttest-Frage: erst selbst entscheiden, dann Lösung ansehen. */
export function SelfTest({ nr, frage, children }: { nr: number; frage: ReactNode; children: ReactNode }) {
  return (
    <details className="my-2 max-w-prose rounded-md border border-slate-300 dark:border-slate-600">
      <summary className="cursor-pointer select-none px-3 py-2">
        <span className="font-semibold">Frage {nr}.</span> {frage}{" "}
        <span className="text-sm text-slate-500 dark:text-slate-400">(Lösung aufklappen)</span>
      </summary>
      <div className="space-y-2 border-t border-slate-200 px-3 py-2 dark:border-slate-700">
        {children}
      </div>
    </details>
  );
}
