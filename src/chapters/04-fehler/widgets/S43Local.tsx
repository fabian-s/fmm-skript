/**
 * F1 — DIE EINE EINSICHT: Aufdecken nach einer eigenen Antwort macht den
 * Selbsttest zu einer überprüfbaren Entscheidung.
 * FARBROLLEN: Slate-Töne sind Oberfläche, ohne mathematische Codierung.
 * PROVENIENZ: Eigene, aus S43 portierte MDX-Hilfskomponente.
 * VERIFIZIERTE ZAHLEN: keine mathematischen Zahlen in Caption oder Verdikt.
 * Geprüft mit verify-hdr.mjs, 2026-08-20.
 */
/**
 * Lokale Hilfskomponente aus der TSX-Fassung von §4.3 (MDX-Migration
 * 2026-08-11; Rendering unverändert übernommen). Der ursprüngliche Name
 * „Frage" gehört der MDX-Autorenschicht und ist reserviert, deshalb heißt
 * die Komponente hier SelbsttestFrage (wie in 01-intro/widgets/S11Widgets).
 */
import { type ReactNode } from "react";

/** Selbsttest-Frage mit aufklappbarer Lösung (Muster aus 01-intro/S11.tsx). */
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
