/**
 * F1 — DIE EINE EINSICHT: Der Selbsttest hält die eigene Fehleranalyse von
 * der nachträglichen Musterlösung getrennt.
 * FARBROLLEN: Slate-Töne sind Oberfläche, ohne mathematische Codierung.
 * PROVENIENZ: Eigene, aus S42 portierte MDX-Hilfskomponente.
 * VERIFIZIERTE ZAHLEN: keine mathematischen Zahlen in Caption oder Verdikt.
 * Geprüft mit verify-hdr.mjs, 2026-08-20.
 */
import { type ReactNode } from "react";

/**
 * Lokale Hilfskomponente aus der TSX-Fassung von Abschnitt 4.2, unverändert
 * portiert (MDX-Migration 2026-08-11). Der Name bleibt „SelfTest", damit das
 * Migrations-Orakel denselben Widget-Eintrag sieht; das Rendering ist
 * zeichengleich zur alten S42.tsx.
 */

/** Aufklappbare Selbsttest-Frage: erst selbst überlegen, dann Lösung ansehen. */
export function SelfTest({ frage, children }: { frage: ReactNode; children: ReactNode }) {
  return (
    <details className="my-2 max-w-prose rounded-md border border-slate-300 dark:border-slate-600">
      <summary className="cursor-pointer select-none px-3 py-2">
        <span className="font-semibold">Selbsttest.</span> {frage}{" "}
        <span className="text-sm text-slate-500 dark:text-slate-400">(Lösung aufklappen)</span>
      </summary>
      <div className="space-y-2 border-t border-slate-200 px-3 py-2 dark:border-slate-700">
        {children}
      </div>
    </details>
  );
}
