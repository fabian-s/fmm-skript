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
