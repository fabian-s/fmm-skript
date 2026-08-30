/**
 * F1 — DIE EINE EINSICHT: Selbsttests machen aus einer gelesenen Aussage eine
 * eigene Entscheidung; die aufklappbare Lösung trennt beides.
 * FARBROLLEN: keine; die Komponente trägt keine mathematische Farbcodierung,
 * sondern nur die neutralen Oberflächenklassen aus surface.ts.
 * PROVENIENZ: Eigene, bei der MDX-Migration aus S11 portierte Hilfskomponente.
 * VERIFIZIERTE ZAHLEN: keine numerischen Claims in Caption oder Verdikt.
 */
import type { ReactNode } from "react";
import { W_MUTED, W_PANEL } from "../../../lib";

/**
 * Begleit-Widgets für Abschnitt 1.1 (aus der TSX-Fassung von S11 portiert,
 * MDX-Migration 2026-08-10; Rendering unverändert).
 */

/** Selbsttest-Frage mit aufklappbarer Lösung. */
export function SelbsttestFrage({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <li className="space-y-1">
      <div>{q}</div>
      <details className={`px-3 py-1.5 text-sm ${W_PANEL}`}>
        <summary className={`cursor-pointer select-none font-medium ${W_MUTED}`}>
          Lösung anzeigen
        </summary>
        <div className="pt-1.5">{children}</div>
      </details>
    </li>
  );
}
