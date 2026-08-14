/**
 * Lokale Begleitkomponente für Abschnitt 3.3 (aus der TSX-Fassung von S33
 * portiert, MDX-Migration 2026-08-11; Rendering unverändert).
 *
 * Der Selbsttest im details/summary-Muster ist kein wahr/falsch-Quiz mit
 * Buttons und lässt sich deshalb nicht auf die ::::quiz-Direktive abbilden.
 * Der TSX-Name „Frage" ist für die MDX-Autorenschicht reserviert; die
 * Komponente heißt hier wie im Migrations-Piloten 01-intro
 * „SelbsttestFrage", Markup und Klassen sind unverändert.
 */
import type { ReactNode } from "react";

/** Selbsttest-Frage mit aufklappbarer Lösung (Muster aus 01-intro/S11). */
export function SelbsttestFrage({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <li className="space-y-1">
      <div>{q}</div>
      <details className="rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40">
        <summary className="cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300">
          Lösung anzeigen
        </summary>
        <div className="pt-1.5">{children}</div>
      </details>
    </li>
  );
}
