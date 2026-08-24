/**
 * F1 — DIE EINE EINSICHT: Selbsttests machen aus einer gelesenen Aussage eine
 * eigene Entscheidung; die aufklappbare Lösung trennt beides.
 * FARBROLLEN: Grün bestätigt eine richtige Wahl, Rot kennzeichnet eine falsche;
 * die übrigen Slate-Töne sind reine Oberfläche.
 * PROVENIENZ: Eigene, bei der MDX-Migration aus S11 portierte Hilfskomponente.
 * VERIFIZIERTE ZAHLEN: keine mathematischen Zahlen in Caption oder Verdikt.
 * Geprüft mit verify-hdr.mjs, 2026-08-20.
 */
import type { ReactNode } from "react";

/**
 * Begleit-Widgets für Abschnitt 1.1 (aus der TSX-Fassung von S11 portiert,
 * MDX-Migration 2026-08-10; Rendering unverändert).
 */

/** Selbsttest-Frage mit aufklappbarer Lösung. */
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

/** Konzeptionelle SVG-Landkarte der drei Themenblöcke. */
