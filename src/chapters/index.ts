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
  deck?: string[]; // zugehörige Foliensätze in fmm-lmu/slides, z. B. ["07-kq"]
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
    deck: ["01-intro"],
    load: () => import("./01-intro"),
  },
  {
    id: "02-algos",
    num: 2,
    title: "Algorithmen & Komplexität",
    deck: ["02-algos"],
    load: () => import("./02-algos"),
  },
  {
    id: "03-matrix-spur-norm",
    num: 3,
    title: "Spur & Matrixnormen",
    deck: ["03-matrix-spur-norm"],
    load: () => import("./03-matrix-spur-norm"),
  },
  {
    id: "04-fehler",
    num: 4,
    title: "Fehler, Kondition & Stabilität",
    deck: ["04-fehler"],
    load: () => import("./04-fehler"),
  },
  {
    id: "05-lgs",
    num: 5,
    title: "Lineare Gleichungssysteme",
    deck: ["05-lgs"],
    load: () => import("./05-lgs"),
  },
  {
    id: "06-svd",
    num: 6,
    title: "Die Singulärwertzerlegung",
    deck: ["06-svd"],
    load: () => import("./06-svd"),
  },
  {
    id: "07-kq",
    num: 7,
    title: "Kleinste Quadrate",
    deck: ["07-kq"],
    load: () => import("./07-kq"),
  },
  {
    id: "08-la-misc",
    num: 8,
    title: "Numerische Lineare Algebra: Iteration & Zufall",
    deck: ["08-la-misc"],
    load: () => import("./08-la-misc"),
  },
  {
    id: "09-tensoren",
    num: 9,
    title: "Tensoren & Tensorprodukte",
    deck: ["09-tensoren"],
    load: () => import("./09-tensoren"),
  },
  {
    id: "10-differentialrechnung",
    num: 10,
    title: "Differentialrechnung",
    deck: ["10-ableitungen-I", "11-ableitungen-II"],
    load: () => import("./10-differentialrechnung"),
  },
  {
    id: "11-konvexitaet",
    num: 11,
    title: "Konvexität",
    deck: ["12-konvexitaet"],
    load: () => import("./11-konvexitaet"),
  },
  {
    id: "12-optim",
    num: 12,
    title: "Nichtlineare Gleichungen & Optimierung",
    deck: ["13-optim-I", "14-optim-II"],
    load: () => import("./12-optim"),
  },
  {
    id: "13-funktionsapproximation",
    num: 13,
    title: "Funktionsapproximation",
    deck: ["15-funktionsapproximation-I", "16-funktionsapproximation-II"],
    load: () => import("./13-funktionsapproximation"),
  },
];

/** Alte Kapitel-IDs (vor der Zusammenlegung 2026-08) -> neue, fuer verlinkte URLs. */
export const chapterAliases: Record<string, string> = {
  "10-ableitungen-1": "10-differentialrechnung",
  "11-ableitungen-2": "10-differentialrechnung",
  "12-konvexitaet": "11-konvexitaet",
  "13-optim": "12-optim",
  "14-funktionsapproximation": "13-funktionsapproximation",
  "15-funktionsapproximation-2": "13-funktionsapproximation",
};

/** Alte Abschnittsanker (#sec-K.k) der zusammengelegten Kapitel -> neue. */
export function sectionAlias(oldChapterId: string, sec: string): string {
  const m = /^(\d+)\.(\d+)$/.exec(sec);
  if (!m) return sec;
  const K = Number(m[1]);
  const k = Number(m[2]);
  switch (oldChapterId) {
    case "10-ableitungen-1": return K === 10 && k === 5 ? "10.9" : sec;
    case "11-ableitungen-2": return K === 11 ? (k === 5 ? "10.9" : `10.${k + 4}`) : sec;
    case "12-konvexitaet": return K === 12 ? `11.${k}` : sec;
    case "13-optim": return K === 13 ? `12.${k}` : sec;
    case "14-funktionsapproximation": return K === 14 && k === 5 ? "13.9" : K === 14 ? `13.${k}` : sec;
    case "15-funktionsapproximation-2": return K === 15 ? (k === 5 ? "13.9" : `13.${k + 4}`) : sec;
    default: return sec;
  }
}
