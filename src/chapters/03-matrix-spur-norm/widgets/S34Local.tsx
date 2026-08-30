/**
 * F1 — DIE EINE EINSICHT: Der Selbsttest fordert eine Entscheidung vor der
 * Lösung.
 * FARBROLLEN: Slate-Töne sind Oberfläche, ohne mathematische Codierung.
 * PROVENIENZ: Eigene, aus S34 portierte MDX-Hilfskomponente.
 * VERIFIZIERTE ZAHLEN: keine mathematischen Zahlen in Caption oder Verdikt.
 */
import type { ReactNode } from "react";

/**
 * Lokale Begleitkomponente für Abschnitt 3.4 (aus der TSX-Fassung von S34
 * portiert, MDX-Migration 2026-08-11; Rendering unverändert).
 *
 * Selbsttest im details/summary-Muster: Die Frage steht offen da, die Lösung
 * klappt auf Klick auf. Das ist kein wahr/falsch-Quiz mit Buttons und deshalb
 * nicht als ::::quiz-Direktive abbildbar. Der TSX-Name „Frage" ist in der
 * MDX-Autorenschicht reserviert, die Komponente heißt hier deshalb
 * SelbsttestFrage (wie im Migrations-Piloten 01-intro).
 */

/** Selbsttest-Frage mit aufklappbarer Lösung (Muster aus Kapitel 1). */
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
