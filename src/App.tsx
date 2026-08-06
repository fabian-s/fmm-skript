import { useEffect, useState } from "react";
import { TooltipProvider } from "./lib";
import { chapters, type ChapterModule } from "./chapters";

// side-effect imports: every concept module registers its tooltip
import.meta.glob("./concepts/*.tsx", { eager: true });
// MDX-Konzepte können sich nicht selbst registrieren — das erledigt dieses Modul
import "./mdx/concepts-mdx";

function currentChapterId(): string {
  return new URLSearchParams(window.location.search).get("k") ?? chapters[0].id;
}

export default function App() {
  const chapterId = currentChapterId();
  const entry = chapters.find((c) => c.id === chapterId) ?? chapters[0];
  const [mod, setMod] = useState<ChapterModule | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    entry
      .load()
      .then((m) => alive && setMod(m.default))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.id]);

  // Fragment-Navigation: der Browser scrollt beim Laden zu #sec-…, bevor
  // React die (lazy geladenen) Abschnitte eingefügt hat — nachholen.
  useEffect(() => {
    if (!mod) return;
    const h = window.location.hash;
    if (!h) return;
    document.getElementById(decodeURIComponent(h.slice(1)))?.scrollIntoView();
  }, [mod]);

  return (
    <TooltipProvider
      labels={{
        pin: "anheften (Fenster bleibt offen, an der Titelleiste verschiebbar)",
        close: "schließen",
        pinned: "angeheftet – an der Titelleiste verschiebbar, schließen mit × oder Esc",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-10 border-b border-slate-300 pb-6 dark:border-slate-700">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            LMU München · Institut für Statistik
          </p>
          <h1 className="mt-1 text-3xl font-bold">
            Fortgeschrittene mathematische Methoden in der Statistik
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Interaktives Begleit-Skript zur Vorlesung, Arbeitsstand (Entwurf).
          </p>
          <nav className="mt-4 flex flex-wrap gap-2 text-sm">
            {chapters.map((c) => (
              <a
                key={c.id}
                href={`?k=${c.id}`}
                className={
                  c.id === entry.id
                    ? "rounded bg-sky-600 px-2 py-1 font-medium text-white"
                    : "rounded bg-slate-200 px-2 py-1 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                }
              >
                {c.title}
              </a>
            ))}
          </nav>
          <p className="mt-3 rounded bg-sky-50 px-3 py-2 text-sm text-sky-900 dark:bg-sky-950/50 dark:text-sky-200">
            <strong>Bedienung:</strong> <span className="text-sky-600">gepunktet unterstrichene</span>{" "}
            Begriffe erklären sich beim Überfahren mit der Maus. Im Erklärfenster stehen wieder
            solche Begriffe, man kann sich also weiterhangeln. Ein <em>Klick</em> auf den Begriff
            (oder auf 📌 im Fenster) heftet das Fenster fest: es bleibt offen, lässt sich an der
            Titelleiste verschieben und stört das Scrollen nicht. Geschlossen wird mit ×, mit{" "}
            <kbd>Esc</kbd>, oder indem man daneben klickt. Gelbe
            &bdquo;Vertiefung&ldquo;-Boxen enthalten interaktive Widgets.
          </p>
        </header>
        <main>
          {failed && (
            <p className="italic text-red-600">Kapitel konnte nicht geladen werden.</p>
          )}
          {!mod && !failed && <p className="italic text-slate-500">Kapitel wird geladen …</p>}
          {mod?.sections.map(({ id, title, C }) => (
            <section
              key={id}
              id={`sec-${id}`}
              className="mb-14 [content-visibility:auto] [contain-intrinsic-size:auto_3000px]"
            >
              <h2 className="mb-4 text-2xl font-bold">
                {id} {title}
              </h2>
              <C />
            </section>
          ))}
        </main>
      </div>
    </TooltipProvider>
  );
}
