/// <reference types="mdx" />

// Nur der Modultyp. ACHTUNG: `tsc --noEmit` prüft damit den INHALT einer
// .mdx-Datei NICHT — im Programm liegt bloß diese Deklaration. Die
// inhaltliche Absicherung leisten die Regeln in mdx/remark-fmm.mjs
// (unbekannte Komponente, freier Ausdruck, kaputte Struktur = Buildfehler)
// und mdx/fixtures.test.mjs.

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
  export const title: string | undefined;
}
