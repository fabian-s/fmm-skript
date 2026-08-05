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
  title: string; // nav + heading
  deck?: string; // corresponding slide deck, e.g. "07-kq"
  load: () => Promise<{ default: ChapterModule }>;
}

export const chapters: ChapterEntry[] = [
  {
    id: "01-intro",
    title: "Kap. 1 · Worum geht's?",
    deck: "01-intro",
    load: () => import("./01-intro"),
  },
  {
    id: "02-algos",
    title: "Kap. 2 · Algorithmen & Komplexität",
    deck: "02-algos",
    load: () => import("./02-algos"),
  },
  {
    id: "03-matrix-spur-norm",
    title: "Kap. 3 · Spur & Matrixnormen",
    deck: "03-matrix-spur-norm",
    load: () => import("./03-matrix-spur-norm"),
  },
  {
    id: "04-fehler",
    title: "Kap. 4 · Fehler, Kondition & Stabilität",
    deck: "04-fehler",
    load: () => import("./04-fehler"),
  },
  {
    id: "05-lgs",
    title: "Kap. 5 · Lineare Gleichungssysteme",
    deck: "05-lgs",
    load: () => import("./05-lgs"),
  },
  {
    id: "07-kq",
    title: "Kap. 7 · Kleinste Quadrate",
    deck: "07-kq",
    load: () => import("./07-kq"),
  },
  {
    id: "demo",
    title: "Makro- und Farb-Demo",
    deck: "07-kq",
    load: () => import("./demo"),
  },
];
