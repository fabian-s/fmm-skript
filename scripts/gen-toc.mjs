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
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const chaptersDir = join(root, "src", "chapters");
const out = join(chaptersDir, "toc.generated.ts");

// Reihenfolge der Kapitel: die der Registry, nicht die des Dateisystems.
const registry = readFileSync(join(chaptersDir, "index.ts"), "utf8");
const chapterIds = [...registry.matchAll(/^\s*id:\s*"([^"]+)",\s*$/gm)].map((m) => m[1]);
if (chapterIds.length === 0) {
  throw new Error("gen-toc: keine Kapitel-IDs in src/chapters/index.ts gefunden");
}

const dirs = new Set(
  readdirSync(chaptersDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
);

const entries = chapterIds.map((id) => {
  if (!dirs.has(id)) throw new Error(`gen-toc: Kapitelverzeichnis src/chapters/${id} fehlt`);
  const src = readFileSync(join(chaptersDir, id, "index.ts"), "utf8");
  const sections = [...src.matchAll(/id:\s*"([^"]+)"\s*,\s*title:\s*"((?:[^"\\]|\\.)*)"/g)].map(
    (m) => ({ id: m[1], title: m[2] })
  );
  // Jede Sektion hat genau eine Komponente — Abweichung heißt: das Muster
  // oben hat einen Eintrag verpasst, und die Navigation wäre unvollständig.
  const components = (src.match(/(^|[\s{])C:\s/g) ?? []).length;
  if (sections.length !== components) {
    throw new Error(
      `gen-toc: ${id}/index.ts — ${sections.length} Abschnitte erkannt, ${components} erwartet`
    );
  }
  return [id, sections];
});

const body = entries
  .map(
    ([id, sections]) =>
      `  ${JSON.stringify(id)}: [\n` +
      sections
        .map((s) => `    { id: ${JSON.stringify(s.id)}, title: ${JSON.stringify(s.title)} },`)
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
