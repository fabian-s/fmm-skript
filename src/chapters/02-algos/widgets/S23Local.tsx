import { useState, type ReactNode } from "react";

/**
 * Lokale Begleitkomponente für Abschnitt 2.3 (aus der TSX-Fassung von S23
 * portiert, MDX-Migration 2026-08-11; Rendering unverändert).
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
    <div className="my-4 max-w-prose rounded border border-slate-200 p-4 dark:border-slate-700">
      <div className="mb-3">{frage}</div>
      <div className="flex flex-col gap-2">
        {optionen.map((opt, i) => {
          const isChosen = chosen === i;
          const cls = isChosen
            ? i === richtig
              ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
              : "border-red-600 bg-red-50 dark:bg-red-950/40"
            : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800";
          return (
            <button
              key={i}
              type="button"
              className={`rounded border px-3 py-1.5 text-left text-sm ${cls}`}
              onClick={() => setChosen(i)}
            >
              <span className="mr-2 font-mono text-xs text-slate-500">
                {String.fromCharCode(97 + i)})
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <p
          className={`mt-3 text-sm font-medium ${
            correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
          }`}
        >
          {correct
            ? "Richtig!"
            : "Leider nein, noch einmal probieren oder die Lösung ansehen."}
        </p>
      )}
      <button
        type="button"
        className="mt-3 rounded bg-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "Lösung verbergen" : "Lösung anzeigen"}
      </button>
      {open && <div className="mt-3 space-y-2 text-sm">{loesung}</div>}
    </div>
  );
}
