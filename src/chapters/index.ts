/**
 * Chapter registry. Each chapter is a lazily imported module (code
 * splitting: only the selected chapter's sections are downloaded) that
 * default-exports { sections: SectionEntry[] }.
 *
 * Chapter selection uses the ?k= query parameter (a full page load per
 * chapter — deliberately simple for a static site); the URL hash remains
 * free for in-page #sec-* anchors.
 */
import type { ComponentType } from "react";

export interface SectionEntry {
  id: string;
  title: string;
  C: ComponentType;
}

export interface ChapterModule {
  sections: SectionEntry[];
}

export interface ChapterEntry {
  id: string; // ?k= value, kebab-case
  /** Kapitelnummer für Navigation und Überschrift. */
  num: number;
  title: string; // Titel OHNE "Kap. N ·" — die Nummer setzt die Navigation
  deck?: string; // corresponding slide deck, e.g. "07-kq"
  load: () => Promise<{ default: ChapterModule }>;
}

/** Beschriftung für Fließtext und Seitentitel, z. B. "Kap. 3 · Spur & Matrixnormen". */
export function chapterLabel(c: ChapterEntry): string {
  return `Kap. ${c.num} \u00b7 ${c.title}`;
}

export const chapters: ChapterEntry[] = [
  {
    id: "01-intro",
    num: 1,
    title: "Worum geht's?",
    deck: "01-intro",
    load: () => import("./01-intro"),
  },
  {
    id: "02-algos",
    num: 2,
    title: "Algorithmen & Komplexität",
    deck: "02-algos",
    load: () => import("./02-algos"),
  },
  {
    id: "03-matrix-spur-norm",
    num: 3,
    title: "Spur & Matrixnormen",
    deck: "03-matrix-spur-norm",
    load: () => import("./03-matrix-spur-norm"),
  },
  {
    id: "04-fehler",
    num: 4,
    title: "Fehler, Kondition & Stabilität",
    deck: "04-fehler",
    load: () => import("./04-fehler"),
  },
  {
    id: "05-lgs",
    num: 5,
    title: "Lineare Gleichungssysteme",
    deck: "05-lgs",
    load: () => import("./05-lgs"),
  },
  {
    id: "06-svd",
    num: 6,
    title: "Die Singulärwertzerlegung",
    deck: "06-svd",
    load: () => import("./06-svd"),
  },
  {
    id: "07-kq",
    num: 7,
    title: "Kleinste Quadrate",
    deck: "07-kq",
    load: () => import("./07-kq"),
  },
  {
    id: "08-la-misc",
    num: 8,
    title: "Numerische LA: Iteration & Zufall",
    deck: "08-la-misc",
    load: () => import("./08-la-misc"),
  },
  {
    id: "09-tensoren",
    num: 9,
    title: "Tensoren & Tensorprodukte",
    deck: "09-tensoren",
    load: () => import("./09-tensoren"),
  },
  {
    id: "10-ableitungen-1",
    num: 10,
    title: "Differentialrechnung I",
    deck: "10-ableitungen-I",
    load: () => import("./10-ableitungen-1"),
  },
  {
    id: "11-ableitungen-2",
    num: 11,
    title: "Differentialrechnung II",
    deck: "11-ableitungen-II",
    load: () => import("./11-ableitungen-2"),
  },
  {
    id: "12-konvexitaet",
    num: 12,
    title: "Konvexität",
    deck: "12-konvexitaet",
    load: () => import("./12-konvexitaet"),
  },
  {
    id: "13-optim",
    num: 13,
    title: "Nichtlineare Gleichungen & Optimierung",
    deck: "13-optim",
    load: () => import("./13-optim"),
  },
  {
    id: "14-funktionsapproximation",
    num: 14,
    title: "Funktionsapproximation I",
    deck: "14-funktionsapproximation",
    load: () => import("./14-funktionsapproximation"),
  },
  {
    id: "15-funktionsapproximation-2",
    num: 15,
    title: "Funktionsapproximation II",
    deck: "15-funktionsapproximation-II",
    load: () => import("./15-funktionsapproximation-2"),
  },
];
