import { useEffect, useState } from "react";
import { TooltipProvider } from "./lib";
import { chapterAliases, chapterLabel, chapters, sectionAlias, type ChapterModule } from "./chapters";
import { tocSections } from "./chapters/toc.generated";
import { Sidebar } from "./ui/Sidebar";
import { useActiveSection } from "./ui/useActiveSection";

// side-effect imports: every concept module registers its tooltip
import.meta.glob("./concepts/*.tsx", { eager: true });
// MDX-Konzepte können sich nicht selbst registrieren — das erledigt dieses Modul
import "./mdx/concepts-mdx";

function currentChapterId(): string {
  const k = new URLSearchParams(window.location.search).get("k") ?? chapters[0].id;
  return chapterAliases[k] ?? k;
}

export default function App() {
  const chapterId = currentChapterId();
  const entry = chapters.find((c) => c.id === chapterId) ?? chapters[0];
  const [mod, setMod] = useState<ChapterModule | null>(null);
  const [failed, setFailed] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [hilfeOffen, setHilfeOffen] = useState(() => !localStorage.getItem("fmm.hilfe.zu"));

  const toc = tocSections[entry.id] ?? [];
  const activeSection = useActiveSection(
    toc.map((s) => s.id),
    mod !== null
  );

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

  useEffect(() => {
    document.title = `${chapterLabel(entry)} · FMM-Skript`;
  }, [entry]);

  // Fragment-Navigation: der Browser scrollt beim Laden zu #sec-…, bevor
  // React die (lazy geladenen) Abschnitte eingefügt hat — nachholen.
  useEffect(() => {
    if (!mod) return;
    let h = decodeURIComponent(window.location.hash.slice(1));
    if (!h) return;
    // Alte Deep-Links (?k=<alte ID>#sec-K.k) auf die neuen Anker umbiegen.
    const rawK = new URLSearchParams(window.location.search).get("k");
    if (rawK && chapterAliases[rawK] && h.startsWith("sec-")) {
      h = `sec-${sectionAlias(rawK, h.slice(4))}`;
      history.replaceState(null, "", `?k=${chapterAliases[rawK]}#${h}`);
    }
    document.getElementById(h)?.scrollIntoView();
  }, [mod]);

  // Schublade: Esc schließt, offene Schublade friert die Seite dahinter ein.
  useEffect(() => {
    if (!navOpen) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setNavOpen(false);
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const here = chapters.indexOf(entry);
  const prev = chapters[here - 1];
  const next = chapters[here + 1];
  const activeTitle = toc.find((s) => s.id === activeSection);

  return (
    <TooltipProvider
      labels={{
        pin: "anheften (Fenster bleibt offen, an der Titelleiste verschiebbar)",
        close: "schließen",
        pinned: "angeheftet – an der Titelleiste verschiebbar, schließen mit × oder Esc",
      }}
    >
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-sky-600 focus:px-3 focus:py-2 focus:text-white"
      >
        Zum Inhalt springen
      </a>

      <div className="lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]">
        <Sidebar
          current={entry}
          activeSection={activeSection}
          open={navOpen}
          onClose={() => setNavOpen(false)}
        />

        <div className="min-w-0">
          {/* Kopfleiste für schmale Fenster: Menüknopf und Standortanzeige */}
          <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-300 bg-white/95 px-3 py-2 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/95">
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              aria-label="Inhaltsverzeichnis öffnen"
              aria-controls="kapitelnavigation"
              aria-expanded={navOpen}
              className="rounded border border-slate-300 p-1.5 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M2 4h12M2 8h12M2 12h12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <p className="min-w-0 truncate text-sm">
              <span className="font-semibold">{chapterLabel(entry)}</span>
              {activeTitle && (
                <span className="text-slate-500 dark:text-slate-400">
                  {" · "}
                  {activeTitle.id} {activeTitle.title}
                </span>
              )}
            </p>
          </div>

          <main id="inhalt" className="mx-auto max-w-3xl px-5 py-8 lg:px-10 lg:py-12">
            <header className="mb-10 border-b border-slate-300 pb-6 dark:border-slate-700">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400">
                Kapitel {entry.num}
              </p>
              <h1 className="mt-1 text-[2.1rem] font-bold tracking-tight text-balance">
                {entry.title}
              </h1>
              <details
                className="mt-5 rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800/40"
                open={hilfeOffen}
                onToggle={(e) => {
                  const offen = (e.currentTarget as HTMLDetailsElement).open;
                  setHilfeOffen(offen);
                  if (offen) localStorage.removeItem("fmm.hilfe.zu");
                  else localStorage.setItem("fmm.hilfe.zu", "1");
                }}
              >
                <summary className="cursor-pointer font-medium text-slate-700 dark:text-slate-200">
                  Bedienung
                </summary>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  <span className="text-sky-600 dark:text-sky-400">Gepunktet unterstrichene</span>{" "}
                  Begriffe erklären sich beim Überfahren mit der Maus. Im Erklärfenster stehen
                  wieder solche Begriffe, man kann sich also weiterhangeln. Ein <em>Klick</em> auf
                  den Begriff (oder auf 📌 im Fenster) heftet das Fenster fest: es bleibt offen,
                  lässt sich an der Titelleiste verschieben und stört das Scrollen nicht.
                  Geschlossen wird mit ×, mit <kbd>Esc</kbd>, oder indem man daneben klickt. Gelbe
                  &bdquo;Vertiefung&ldquo;-Boxen enthalten interaktive Widgets.
                </p>
              </details>
            </header>

            {failed && (
              <p className="italic text-red-600">Kapitel konnte nicht geladen werden.</p>
            )}
            {!mod && !failed && <p className="italic text-slate-500">Kapitel wird geladen …</p>}
            {mod?.sections.map(({ id, title, C }) => (
              <section
                key={id}
                id={`sec-${id}`}
                className="mb-14 scroll-mt-20 [content-visibility:auto] [contain-intrinsic-size:auto_3000px] lg:scroll-mt-8"
              >
                <h2 className="group mb-4 text-2xl font-bold tracking-tight text-balance">
                  <span className="text-sky-700 tabular-nums dark:text-sky-400">{id}</span>{" "}
                  {title}
                  <a
                    href={`#sec-${id}`}
                    aria-label={`Link zu Abschnitt ${id}`}
                    className="ml-2 text-base font-normal text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 dark:text-slate-600"
                  >
                    #
                  </a>
                </h2>
                <C />
              </section>
            ))}

            {mod && (prev || next) && (
              <nav
                aria-label="Kapitelwechsel"
                className="mt-16 grid gap-3 border-t border-slate-300 pt-6 sm:grid-cols-2 dark:border-slate-700"
              >
                {[
                  { c: prev, dir: "Zurück", arrow: "←" },
                  { c: next, dir: "Weiter", arrow: "→" },
                ].map(({ c, dir, arrow }) =>
                  c ? (
                    <a
                      key={dir}
                      href={`?k=${c.id}`}
                      className={
                        "rounded-lg border border-slate-300 px-4 py-3 no-underline hover:border-sky-500 hover:bg-sky-50/50 dark:border-slate-700 dark:hover:border-sky-400 dark:hover:bg-slate-800 " +
                        (dir === "Weiter" ? "sm:col-start-2 sm:text-right" : "")
                      }
                    >
                      <span className="block text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {dir === "Zurück" ? `${arrow} ${dir}` : `${dir} ${arrow}`}
                      </span>
                      <span className="mt-0.5 block font-medium">{chapterLabel(c)}</span>
                    </a>
                  ) : null
                )}
              </nav>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
