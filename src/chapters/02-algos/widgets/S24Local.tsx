/**
 * F1 — DIE EINE EINSICHT: Die Lösung eines Selbsttests folgt erst auf die
 * eigene Entscheidung.
 * FARBROLLEN: Slate-Töne strukturieren die Oberfläche; sie tragen keine
 * mathematische Bedeutung.
 * PROVENIENZ: Eigene, aus der TSX-Fassung von S24 portierte MDX-Hilfskomponente.
 * VERIFIZIERTE ZAHLEN: keine numerischen Claims in Caption oder Verdikt.
 */
/**
 * Lokale Begleitkomponente für Abschnitt 2.4 (aus der TSX-Fassung von S24
 * portiert, MDX-Migration 2026-08-11; Rendering unverändert).
 *
 * Selbsttest im details/summary-Muster: Die Aussage steht offen da, die
 * Lösung klappt auf Klick auf. Das ist kein wahr/falsch-Quiz mit Buttons und
 * deshalb nicht als ::::quiz-Direktive abbildbar.
 */
import { type ReactNode } from "react";
import { W_MUTED, W_PANEL } from "../../../lib";

/** Aufklappbare Selbsttest-Frage: erst selbst entscheiden, dann Lösung ansehen. */
export function SelfTest({ nr, frage, children }: { nr: number; frage: ReactNode; children: ReactNode }) {
  return (
    <details className={`my-2 max-w-prose ${W_PANEL}`}>
      <summary className="cursor-pointer select-none px-3 py-2">
        <span className="font-semibold">Frage {nr}.</span> {frage}{" "}
        <span className={`text-sm ${W_MUTED}`}>(Lösung aufklappen)</span>
      </summary>
      <div className="space-y-2 border-t border-slate-200 px-3 py-2 dark:border-slate-700 [.w-dark_&]:border-slate-600">
        {children}
      </div>
    </details>
  );
}
