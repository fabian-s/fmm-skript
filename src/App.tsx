import { TooltipProvider } from "./lib";
import { sections } from "./sections";

// side-effect imports: every concept module registers its tooltip
import.meta.glob("./concepts/*.tsx", { eager: true });

/**
 * TEMPLATE — replace the {{...}} placeholders when instantiating:
 *   {{KICKER}}        e.g. "Interactive textbook · course companion"
 *   {{TITLE}}         e.g. "Chapter 4 · Matrix Decompositions"
 *   {{ATTRIBUTION}}   full citation of the adapted source + link + the
 *                     independent-rewriting notice + "internal use only"
 */
export default function App() {
  return (
    <TooltipProvider>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-10 border-b border-slate-300 pb-6 dark:border-slate-700">
          <p className="text-sm uppercase tracking-wide text-slate-500">"LMU München · Institut für Statistik"</p>
          <h1 className="mt-1 text-3xl font-bold">"Fortgeschrittene mathematische Methoden in der Statistik"</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">"Begleitendes Skript zur Vorlesung (LMU München). Arbeitsstand — Machbarkeits-Demo."</p>
          <p className="mt-3 rounded bg-sky-50 px-3 py-2 text-sm text-sky-900 dark:bg-sky-950/50 dark:text-sky-200">
            <strong>Bedienung:</strong> <span className="text-sky-600">gepunktet unterstrichene</span>{" "}
            Begriffe erklären sich beim Überfahren mit der Maus (300&nbsp;ms). Nach einem Moment
            rastet der Tooltip ein (📌) — dann sind auch Begriffe <em>im</em> Tooltip
            überfahrbar (verschachtelte Tooltips). <kbd>Esc</kbd> schließt alles. Gelbe
            &bdquo;Vertiefung&ldquo;-Boxen enthalten interaktive Widgets.
          </p>
        </header>
        <main>
          {sections.map(({ id, title, C }) => (
            <section key={id} id={`sec-${id}`} className="mb-14 [content-visibility:auto] [contain-intrinsic-size:auto_3000px]">
              <h2 className="mb-4 text-2xl font-bold">
                {id} {title}
              </h2>
              <C />
            </section>
          ))}
          {sections.length === 0 && (
            <p className="italic text-slate-500">No sections registered yet.</p>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}
