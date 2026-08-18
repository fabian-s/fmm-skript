import { useEffect, useRef, useState } from "react";
import { chapters, type ChapterEntry } from "../chapters";
import { tocSections } from "../chapters/toc.generated";

/**
 * Inhaltsverzeichnis am linken Rand: alle Kapitel untereinander, die
 * Abschnitte des aktuellen Kapitels aufgeklappt, aktuelles Kapitel und
 * aktueller Abschnitt hervorgehoben.
 *
 * Die Abschnittstitel kommen aus toc.generated.ts und nicht aus den
 * Kapitelmodulen — sonst zöge die Navigation beim ersten Rendern sämtliche
 * MDX-Bodies aller Kapitel nach und das Code-Splitting wäre wirkungslos.
 *
 * Auf schmalen Fenstern liegt dieselbe Liste als Schublade über der Seite
 * (`open`), auf breiten steht sie fest in der linken Spalte.
 */
/** Ab dieser Breite steht die Navigation fest — dasselbe Maß wie Tailwinds `lg:`. */
const DESKTOP = "(min-width: 64rem)";

export function Sidebar({
  current,
  activeSection,
  open,
  onClose,
}: {
  current: ChapterEntry;
  activeSection: string | null;
  open: boolean;
  onClose: () => void;
}) {
  // Fremde Kapitel lassen sich aufklappen, ohne sie zu öffnen.
  const [unfolded, setUnfolded] = useState<string[]>([]);
  // Breite Fenster zeigen die Liste dauerhaft, schmale nur als Schublade.
  const [breit, setBreit] = useState(() => window.matchMedia(DESKTOP).matches);
  const scroller = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const folge = () => setBreit(mq.matches);
    mq.addEventListener("change", folge);
    return () => mq.removeEventListener("change", folge);
  }, []);

  // Den markierten Eintrag im Blick behalten — aber nur die Liste scrollen,
  // nie die Seite: scrollIntoView() würde beides bewegen.
  useEffect(() => {
    const box = scroller.current;
    const el = activeRef.current;
    if (!box || !el) return;
    const top = el.offsetTop - box.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < box.scrollTop + 8) box.scrollTop = top - 8;
    else if (bottom > box.scrollTop + box.clientHeight - 8)
      box.scrollTop = bottom - box.clientHeight + 8;
  }, [activeSection, current.id]);

  const item = (c: ChapterEntry) => {
    const here = c.id === current.id;
    const sections = tocSections[c.id] ?? [];
    const showSections = here || unfolded.includes(c.id);
    return (
      <li key={c.id}>
        <div className="flex items-stretch gap-1">
          <a
            href={`?k=${c.id}`}
            aria-current={here ? "page" : undefined}
            className={
              "flex min-w-0 flex-1 gap-2 rounded px-2 py-1.5 text-sm leading-snug " +
              (here
                ? "bg-sky-100 font-semibold text-sky-900 shadow-[inset_2px_0_0] shadow-sky-600 dark:bg-sky-950/60 dark:text-sky-100 dark:shadow-sky-400"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100")
            }
          >
            <span
              className={
                "tabular-nums " + (here ? "" : "text-slate-400 dark:text-slate-500")
              }
            >
              {c.num}
            </span>
            <span className="min-w-0">{c.title}</span>
          </a>
          {sections.length > 1 && !here && (
            <button
              type="button"
              onClick={() =>
                setUnfolded((u) =>
                  u.includes(c.id) ? u.filter((x) => x !== c.id) : [...u, c.id]
                )
              }
              aria-expanded={showSections}
              aria-label={`Abschnitte von ${c.title} ${showSections ? "einklappen" : "aufklappen"}`}
              className="rounded px-1.5 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                <path
                  d={showSections ? "M2 4.5 6 8.5 10 4.5" : "M4.5 2 8.5 6 4.5 10"}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {showSections && sections.length > 0 && (
          <ul className="my-1 ml-3.5 flex flex-col border-l border-slate-300 pl-2 dark:border-slate-700">
            {sections.map((s) => {
              const activeHere = here && s.id === activeSection;
              return (
                <li key={s.id}>
                  <a
                    ref={activeHere ? activeRef : undefined}
                    href={here ? `#sec-${s.id}` : `?k=${c.id}#sec-${s.id}`}
                    onClick={onClose}
                    aria-current={activeHere ? "location" : undefined}
                    className={
                      "flex gap-2 rounded px-2 py-1 text-[13px] leading-snug " +
                      (activeHere
                        ? "bg-sky-50 font-semibold text-sky-800 dark:bg-sky-950/40 dark:text-sky-200"
                        : "text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100")
                    }
                  >
                    <span className="tabular-nums opacity-70">{s.id}</span>
                    <span className="min-w-0">{s.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  const zu = !breit && !open;

  return (
    <>
      {/* Abdunkelung hinter der Schublade — nur schmale Fenster */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        id="kapitelnavigation"
        // Die geschlossene Schublade steht nur per translate-x außerhalb des
        // Bildes — ohne `inert` blieben ihre Links im Tab-Lauf und für
        // Screenreader erreichbar, obwohl die Navigation „zu" ist.
        {...(zu ? ({ inert: "", "aria-hidden": true } as Record<string, unknown>) : {})}
        className={
          "fixed inset-y-0 left-0 z-40 flex w-[17.5rem] flex-col border-r border-slate-300 " +
          "bg-slate-50 transition-transform duration-200 dark:border-slate-800 dark:bg-slate-950 " +
          "lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex items-start gap-2 border-b border-slate-200 px-4 py-4 dark:border-slate-800">
          <a href="?" className="min-w-0 flex-1 no-underline">
            <span className="block font-display text-[15px] font-semibold">FMM · Skript</span>
            <span className="mt-0.5 block text-[11.5px] leading-tight text-slate-500 dark:text-slate-400">
              Fortgeschrittene mathematische Methoden in der Statistik · LMU München
            </span>
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Navigation schließen"
            className="-mr-1 rounded p-1 text-slate-500 hover:bg-slate-200 lg:hidden dark:hover:bg-slate-800"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain px-2 py-3 font-display">
          <nav aria-label="Inhaltsverzeichnis">
            <ul className="flex flex-col gap-0.5">{chapters.map(item)}</ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
