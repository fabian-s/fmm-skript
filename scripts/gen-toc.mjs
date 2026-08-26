#!/usr/bin/env node
/**
 * Erzeugt src/chapters/toc.generated.ts: Abschnittsnummern und -titel ALLER
 * Kapitel für die Seitenleiste.
 *
 * Warum generiert? Die Navigation soll das komplette Inhaltsverzeichnis
 * zeigen, ohne dafür jedes Kapitelmodul zu laden — genau das würde aber
 * passieren, wenn sie `chapters/<k>/index.ts` importierte: dort hängen die
 * MDX-Bodies dran, das Code-Splitting wäre dahin. Diese Datei enthält
 * deshalb nur die Metadaten, ohne Komponenten.
 *
 * Läuft automatisch vor `npm run dev` und `npm run build`; das Ergebnis ist
 * eingecheckt, damit ein blankes `vite build` ebenfalls funktioniert.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readChapters, readSections } from "./lib/registry.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const chaptersDir = join(root, "src", "chapters");
const out = join(chaptersDir, "toc.generated.ts");

// Reihenfolge der Kapitel: die der Registry, nicht die des Dateisystems.
// Das Regex-Lesen der index.ts-Dateien liegt in scripts/lib/registry.mjs
// (gemeinsam mit gen-numbers.mjs und dem PDF-Export).
const entries = readChapters(root).map((ch) => {
  if (!existsSync(join(chaptersDir, ch.id))) throw new Error(`gen-toc: Kapitelverzeichnis src/chapters/${ch.id} fehlt`);
  const sections = readSections(root, ch).map((s) => {
    if (!s.key) throw new Error(`gen-toc: ${ch.id}/index.ts — Abschnitt ${s.id} hat keinen key`);
    // Die Nummer kommt aus der POSITION; die alte id bleibt nur als Alias.
    return { id: s.num, key: s.key, title: s.title };
  });
  return [ch.id, sections];
});

const body = entries
  .map(
    ([id, sections]) =>
      `  ${JSON.stringify(id)}: [\n` +
      sections
        .map((s) => `    { id: ${JSON.stringify(s.id)}, key: ${JSON.stringify(s.key)}, title: ${JSON.stringify(s.title)} },`)
        .join("\n") +
      "\n  ],"
  )
  .join("\n");

writeFileSync(
  out,
  `/* GENERIERT von scripts/gen-toc.mjs — nicht von Hand bearbeiten.
 * Neu erzeugen: npm run gen:toc (läuft auch vor dev und build).
 */
export interface TocSection {
  /** Abschnittsnummer, z. B. "3.4" — zugleich Anker-ID (#sec-3.4). */
  id: string;
  /** stabiler Abschnittsschlüssel, z. B. "schattennormen" — Zweitanker #sec-<key>, @sec:<kap>/<key> */
  key: string;
  title: string;
}

/** Abschnitte je Kapitel-ID, in Reihenfolge der Registry. */
export const tocSections: Record<string, TocSection[]> = {
${body}
};
`
);

const total = entries.reduce((n, [, s]) => n + s.length, 0);
console.log(`gen-toc: ${entries.length} Kapitel, ${total} Abschnitte → src/chapters/toc.generated.ts`);
