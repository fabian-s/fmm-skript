/**
 * Kapitel- und Abschnittsregistry lesen — die EINE Stelle, an der die
 * Metadaten aus src/chapters/index.ts und src/chapters/<kap>/index.ts per
 * Regex gezogen werden. Vorher stand dasselbe Muster in gen-toc.mjs und
 * mdx-to-latex.mjs je einmal; mit dem Sektions-Feld `key` wäre es ein
 * drittes Mal dazugekommen (gen-numbers.mjs). Alle drei lesen jetzt hier.
 *
 * Erwartete Form je Sektion (Reihenfolge der Felder ist fest):
 *   { id: "12.5", key: "beschraenkt", title: "…", C: mdxSection(S125Body) }
 * `key` ist der stabile Abschnittsschlüssel (für @sec:optim/beschraenkt);
 * `id` ist die ALTE Nummer und bleibt als Alias — die Nummer selbst kommt
 * aus der Position im Array.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Kapitelschlüssel = Verzeichnisname ohne Nummernpräfix: "12-optim" → "optim". */
export function chapterKey(chapterId) {
  return chapterId.replace(/^\d+-/, "");
}

/** Kapitel in Registry-Reihenfolge: { id, key, num, title }. */
export function readChapters(root) {
  const src = readFileSync(join(root, "src", "chapters", "index.ts"), "utf8");
  const re = /\{\s*id:\s*"([^"]+)",\s*num:\s*(\d+),\s*title:\s*"((?:[^"\\]|\\.)*)"/g;
  const out = [...src.matchAll(re)].map((m) => ({
    id: m[1],
    key: chapterKey(m[1]),
    num: Number(m[2]),
    title: JSON.parse(`"${m[3]}"`),
  }));
  if (!out.length) throw new Error("keine Kapitel in src/chapters/index.ts gefunden");
  return out;
}

/**
 * Abschnitte eines Kapitels in Array-Reihenfolge:
 *   { id, key, title, file, num }   (num = "<Kapitelnummer>.<Position+1>")
 * `file` ist der MDX-Dateiname aus dem Import (z. B. "S125.mdx").
 */
export function readSections(root, chapter) {
  const ch = typeof chapter === "string" ? { id: chapter, num: null } : chapter;
  const file = join(root, "src", "chapters", ch.id, "index.ts");
  const src = readFileSync(file, "utf8");
  const imports = new Map(
    [...src.matchAll(/^import\s+(\w+)\s+from\s+"\.\/([^"]+\.mdx)";/gm)].map((m) => [m[1], m[2]])
  );
  const re =
    /id:\s*"([^"]+)"\s*,\s*(?:key:\s*"([^"]+)"\s*,\s*)?title:\s*"((?:[^"\\]|\\.)*)"\s*,\s*C:\s*mdxSection\(\s*(\w+)\s*\)/g;
  const sections = [...src.matchAll(re)].map((m, i) => ({
    id: m[1],
    key: m[2] ?? null,
    title: JSON.parse(`"${m[3]}"`),
    file: imports.get(m[4]) ?? null,
    num: ch.num != null ? `${ch.num}.${i + 1}` : m[1],
  }));
  // Dieselbe Zusicherung wie bisher: jeder Abschnitt hat genau eine
  // Komponente. Weicht das ab, hat das Muster oben einen Eintrag verpasst,
  // und Navigation, PDF und Nummerntabelle wären still unvollständig.
  const expected = (src.match(/(^|[\s{])C:\s/g) ?? []).length;
  if (sections.length !== expected)
    throw new Error(`${ch.id}/index.ts: ${sections.length} Abschnitte erkannt, ${expected} erwartet`);
  for (const s of sections)
    if (!s.file) throw new Error(`${ch.id}/index.ts: kein MDX-Import für Abschnitt ${s.id}`);
  const keys = new Set();
  for (const s of sections) {
    if (!s.key) continue;
    if (!/^[a-z0-9][a-z0-9-]*$/.test(s.key))
      throw new Error(`${ch.id}/index.ts: Abschnitts-key „${s.key}" — erlaubt sind a-z, 0-9, -`);
    if (keys.has(s.key)) throw new Error(`${ch.id}/index.ts: Abschnitts-key „${s.key}" ist doppelt`);
    keys.add(s.key);
  }
  return sections;
}
