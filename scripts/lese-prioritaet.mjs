/**
 * Lese-Priorität der Begriffe (`.wichtig`/`.hilfreich`, siehe KONVENTIONEN.md).
 *
 *   node scripts/lese-prioritaet.mjs liste  07-kq/S72.mdx        Links einer Datei, nummeriert
 *   node scripts/lese-prioritaet.mjs setze  07-kq/S72.mdx a.tsv  Bewertungen schreiben
 *   node scripts/lese-prioritaet.mjs pruefe [07-kq]              Zählung und prüfbare Regeln
 *   node scripts/lese-prioritaet.mjs zeichen [07-kq]             alle `!` mit ihrem Satz
 *
 * TSV je Zeile: Nummer, Tab, `!`, `?` oder `-`, optional Tab und Begründung. `setze` ändert
 * nur die Klassen und verlangt, dass jede Nummer der Datei genau einmal vorkommt. `pruefe`
 * endet mit Status 1, wenn eine Regel verletzt ist. Inhaltliche Regeln bleiben beim Menschen.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CHAPTERS = resolve(dirname(fileURLToPath(import.meta.url)), "../src/chapters");
const LINK = /:(k|d)\[([^\]]*)\]\{#([^\s}]+)((?:\s+\.[\w-]+)*)\}/g;
const SIGN = { wichtig: "!", hilfreich: "?" };
const CLASS = { "!": " .wichtig", "?": " .hilfreich", "-": "" };
/** Dasselbe Konzept unter zwei IDs zählt für „ein `!` pro Datei" als eines. */
const SAME = {
  "eigenschaften-konditionszahl-einer-matrix": "condition-number",
  kernel: "null-space",
};

/** Abschnitte, die Vorwissen auflisten oder abfragen: dort keine Zeichen. */
const PREREQ = /Vorkenntnisse|Was wir mitbringen|Was wir brauchen|Woran wir anknüpfen|Was von hier an gebraucht|Selbsttest: Reicht/;

const lineAt = (text, offset) => text.slice(0, offset).split("\n").length;

/** Je Zeile: Liegt sie in einer Vertiefung, in einer Vorkenntnis-Liste? */
function regions(text) {
  const stack = [];
  let prereqHeading = 0;
  return text.split("\n").map((line) => {
    const md = line.match(/^(#{1,6})\s+(.*)/);
    const raw = line.match(/^\s*<h([1-6])\b[^>]*>(.*)/);
    if (md || raw) {
      const level = md ? md[1].length : +raw[1];
      if (PREREQ.test(md ? md[2] : raw[2])) prereqHeading = level;
      else if (prereqHeading && level <= prereqHeading) prereqHeading = 0;
    }
    const fence = line.match(/^\s*(:{3,})\s*([a-zA-Zäöü-]*)(.*)$/);
    if (fence) {
      if (fence[2]) stack.push({ colons: fence[1].length, name: fence[2], rest: fence[3] });
      else {
        const at = stack.map((f) => f.colons).lastIndexOf(fence[1].length);
        if (at >= 0) stack.length = at;
      }
    }
    return {
      vertiefung: stack.some((f) => f.name === "vertiefung"),
      prereq: prereqHeading > 0 || stack.some((f) => PREREQ.test(f.rest)),
    };
  });
}

function links(text) {
  const reg = regions(text);
  return [...text.matchAll(LINK)].map((m, i) => {
    const line = lineAt(text, m.index);
    const cls = m[4].trim().replace(/^\./, "");
    const end = m.index + m[0].length;
    return {
      n: i + 1,
      kind: m[1],
      label: m[2].replace(/\s+/g, " "),
      id: m[3],
      cls,
      sign: SIGN[cls] ?? "-",
      line,
      start: m.index,
      end,
      midWord: /^[\p{L}\p{N}-]/u.test(text.slice(end, end + 1)),
      ...reg[line - 1],
    };
  });
}

function fail(msg) {
  console.error(msg);
  process.exit(2);
}

/** Der Satz um einen Link, mit Links als Klartext. */
function sentence(text, l) {
  const prose = (s) => s.replace(LINK, (_, __, label) => label).replace(/\s+/g, " ").trim();
  const before = text.slice(Math.max(0, l.start - 500), l.start).split(/(?<=[.:;!?])\s+|\n\n/).pop();
  const after = text.slice(l.end, l.end + 500).split(/(?<=[.:;!?])\s+|\n\n/)[0];
  return `${prose(before)} [[${l.label}]]${prose(after)}`;
}

function chapterFiles(only) {
  const dirs = readdirSync(CHAPTERS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && (!only || d.name === only))
    .map((d) => d.name)
    .sort();
  if (only && !dirs.length) fail(`Kein Kapitel ${only}`);
  return dirs.flatMap((d) =>
    readdirSync(join(CHAPTERS, d))
      .filter((f) => f.endsWith(".mdx"))
      .sort()
      .map((f) => ({ chapter: d, rel: `${d}/${f}`, path: join(CHAPTERS, d, f) }))
  );
}

function liste(rel) {
  const path = join(CHAPTERS, rel);
  if (!existsSync(path)) fail(`Keine Datei ${rel}`);
  for (const l of links(readFileSync(path, "utf8"))) {
    const flags = [l.vertiefung && "Vertiefung", l.prereq && "Vorkenntnisse", l.midWord && "mitten-im-Wort"]
      .filter(Boolean)
      .join(",");
    console.log([l.n, `Z.${l.line}`, l.sign, `:${l.kind}`, l.id, l.label, flags].join("\t"));
  }
}

function setze(rel, tsv) {
  const path = join(CHAPTERS, rel);
  const text = readFileSync(path, "utf8");
  const all = links(text);
  const want = new Map();
  for (const row of readFileSync(tsv, "utf8").split("\n")) {
    if (!row.trim() || row.startsWith("#")) continue;
    const [n, sign] = row.split("\t");
    if (!/^\d+$/.test(n) || !(sign in CLASS)) fail(`Zeile nicht lesbar: ${row}`);
    if (want.has(+n)) fail(`Nummer ${n} doppelt`);
    want.set(+n, sign);
  }
  const missing = all.filter((l) => !want.has(l.n)).map((l) => l.n);
  const extra = [...want.keys()].filter((n) => n < 1 || n > all.length);
  if (missing.length || extra.length) fail(`${rel}: fehlen ${missing}; unbekannt ${extra}`);
  let i = 0;
  const out = text.replace(LINK, (_, kind, label, id) => `:${kind}[${label}]{#${id}${CLASS[want.get(++i)]}}`);
  writeFileSync(path, out);
  console.log(`${rel}: ${all.length} Links gesetzt`);
}

function pruefe(only) {
  const totals = new Map();
  const problems = [];
  for (const { chapter, rel, path } of chapterFiles(only)) {
    const text = readFileSync(path, "utf8");
    const seen = new Map();
    const t = totals.get(chapter) ?? { n: 0, "!": 0, "?": 0, "-": 0 };
    for (const l of links(text)) {
      t.n++;
      t[l.sign]++;
      const at = `${rel}:${l.line} ${l.id}`;
      if (l.sign === "-") continue;
      if (l.midWord) problems.push(`${at}: bewertet mitten im Wort`);
      if (l.prereq) problems.push(`${at}: Zeichen in einer Vorkenntnis-Liste`);
      if (l.sign !== "!") continue;
      if (l.vertiefung) problems.push(`${at}: \`!\` in einer Vertiefung`);
      const key = SAME[l.id] ?? l.id;
      if (seen.has(key)) problems.push(`${at}: zweites \`!\` für dieses Konzept (zuerst Z.${seen.get(key)})`);
      else seen.set(key, l.line);
    }
    totals.set(chapter, t);
  }
  for (const [c, t] of totals) {
    const pct = (k) => `${Math.round((100 * t[k]) / (t.n || 1))}%`;
    console.log(`${c}\t${t.n} Links\t! ${t["!"]} (${pct("!")})\t? ${t["?"]} (${pct("?")})\tohne ${t["-"]} (${pct("-")})`);
  }
  if (problems.length) {
    console.log(`\n${problems.length} Regelverstöße:\n${problems.join("\n")}`);
    process.exit(1);
  }
  console.log("\nKeine Regelverstöße.");
}

function zeichen(only) {
  for (const { rel, path } of chapterFiles(only)) {
    const text = readFileSync(path, "utf8");
    for (const l of links(text)) if (l.sign === "!") console.log(`${rel}:${l.line}\t${l.id}\t${sentence(text, l)}`);
  }
}

const [cmd, a, b] = process.argv.slice(2);
if (cmd === "liste" && a) liste(a);
else if (cmd === "setze" && a && b) setze(a, b);
else if (cmd === "pruefe") pruefe(a);
else if (cmd === "zeichen") zeichen(a);
else fail("Aufruf: liste <Kap/Datei> | setze <Kap/Datei> <tsv> | pruefe [Kap] | zeichen [Kap]");
