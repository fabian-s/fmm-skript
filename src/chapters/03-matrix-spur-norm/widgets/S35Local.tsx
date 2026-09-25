/**
 * F1 — DIE EINE EINSICHT: Eine sichtbar bleibende Frage und eine getrennte
 * Lösung machen Selbstkontrolle möglich.
 * FARBROLLEN: Slate-Töne sind Oberfläche, ohne mathematische Codierung.
 * PROVENIENZ: Eigene, aus S35 portierte MDX-Hilfskomponente.
 * VERIFIZIERTE ZAHLEN: keine mathematischen Zahlen in Caption oder Verdikt.
 */
/**
 * Lokale Begleitkomponente für Abschnitt 3.5 (aus der TSX-Fassung von S35
 * portiert, MDX-Migration 2026-08-11; Markup, Klassen und Rendering
 * unverändert).
 *
 * Der Selbsttest folgt dem details/summary-Muster (Frage sichtbar, Lösung
 * klappt auf) und ist kein wahr/falsch-Quiz mit Buttons; er lässt sich
 * deshalb nicht auf die ::::quiz-Direktive abbilden. Der TSX-Name „Frage"
 * gehört der MDX-Autorenschicht, die Komponente heißt hier wie im
 * Migrations-Piloten 01-intro „SelbsttestFrage".
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
