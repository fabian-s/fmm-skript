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
    id: "06-svd",
    title: "Kap. 6 · Die Singulärwertzerlegung",
    deck: "06-svd",
    load: () => import("./06-svd"),
  },
  {
    id: "07-kq",
    title: "Kap. 7 · Kleinste Quadrate",
    deck: "07-kq",
    load: () => import("./07-kq"),
  },
  {
    id: "08-la-misc",
    title: "Kap. 8 · Numerische LA: Iteration & Zufall",
    deck: "08-la-misc",
    load: () => import("./08-la-misc"),
  },
  {
    id: "09-tensoren",
    title: "Kap. 9 · Tensoren & Tensorprodukte",
    deck: "09-tensoren",
    load: () => import("./09-tensoren"),
  },
  {
    id: "10-ableitungen-1",
    title: "Kap. 10 · Differentialrechnung I",
    deck: "10-ableitungen-I",
    load: () => import("./10-ableitungen-1"),
  },
  {
    id: "11-ableitungen-2",
    title: "Kap. 11 · Differentialrechnung II",
    deck: "11-ableitungen-II",
    load: () => import("./11-ableitungen-2"),
  },
  {
    id: "12-konvexitaet",
    title: "Kap. 12 · Konvexität",
    deck: "12-konvexitaet",
    load: () => import("./12-konvexitaet"),
  },
  {
    id: "13-optim",
    title: "Kap. 13 · Nichtlineare Gleichungen & Optimierung",
    deck: "13-optim",
    load: () => import("./13-optim"),
  },
  {
    id: "mdx-lab",
    title: "MDX-Syntaxlabor",
    deck: "02-algos",
    load: () => import("./mdx-lab"),
  },
  {
    id: "demo",
    title: "Makro- und Farb-Demo",
    deck: "07-kq",
    load: () => import("./demo"),
  },
];
