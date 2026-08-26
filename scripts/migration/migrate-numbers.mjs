#!/usr/bin/env node
/**
 * migrate-numbers — EINMALIGE Migration der Handnummern in src/chapters/** /*.mdx
 * auf die ID-Syntax (AP5/AP6 der Studie reviews/nummerierung-machbarkeit-2026-08-26.md).
 * Bleibt als Dokumentation im Repo; ein zweiter Lauf auf migrierten Dateien
 * findet nichts mehr zu tun (alle Muster setzen Handnummern voraus).
 *
 *   node scripts/migration/migrate-numbers.mjs [--dry] [--report <json>] [--csv <datei>]
 *
 * Ablauf:
 *   1. ALT-Tabelle aus src/chapters/numbers.generated.json (alle Einträge legacy).
 *   2. IDs ableiten (deterministisch):
 *        Env mit Beiname      → slug(Beiname); Kollision → <abschnitts-key>-<slug>
 *        Env ohne Beiname     → <direktive>-<K>-<k>-<n>
 *        Gleichung in benanntem Env → <env-id> (-2, -3 … bei mehreren), sonst eq-<K>-<k>-<n>
 *        Unterüberschrift     → slug(Titel); Kollision (oder = Abschnitts-key) → <abschnitts-key>-<slug>
 *      Mapping als CSV (alt,typ,id,datei).
 *   3. Umschreiben je Datei: alle Ersetzungen sammeln, prüfen, dann EIN Write.
 *      Labels, Gleichungs-Tags, Unterüberschriften, Links ([Abschnitt K.k](#sec-K.k),
 *      [Kapitel N](?k=…)), Env-Verweise (Art gegen Tabelle geprüft), Plural-Ketten,
 *      Gleichungsverweise (($K.k.n$), (K.k.n), Gleichung …), nackte „Abschnitt K.k".
 *      Was nicht eindeutig maschinell geht, landet im Report (Handfälle) und bleibt stehen.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { ENV_KIND, envFamily } from "../../mdx/numbers.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const argv = process.argv.slice(2);
const dry = argv.includes("--dry");
const opt = (k) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : null);
const reportFile = opt("--report");
const csvFile = opt("--csv") ?? join(root, "reviews", "nummerierung-id-mapping.csv");

const table = JSON.parse(readFileSync(join(root, "src", "chapters", "numbers.generated.json"), "utf8"));

/* ------------------------------------------------------------------ */
/* Hilfen                                                              */
/* ------------------------------------------------------------------ */

const NUM3 = "\\d+\\.\\d+\\.\\d+";
const NUM2 = "\\d+\\.\\d+";

export function slug(text, max = 40) {
  let s = String(text)
    .replace(/\$[^$]*\$/g, " ")
    .replace(/[ÄÀÁÂ]/g, "Ae")
    .replace(/[ÖÒÓÔ]/g, "Oe")
    .replace(/[ÜÙÚÛ]/g, "Ue")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  if (s.length > max) {
    const cut = s.slice(0, max + 1);
    const at = cut.lastIndexOf("-");
    s = (at > 12 ? cut.slice(0, at) : s.slice(0, max)).replace(/-+$/, "");
  }
  if (!s || /^\d+$/.test(s)) s = null;
  return s;
}

const secByNum = new Map(); // "12.5" → { key, chapter, kapKey, full:"optim/beschraenkt" }
const kapKeyById = new Map(); // "12-optim" → "optim"
for (const [key, ch] of Object.entries(table.chapters)) kapKeyById.set(ch.id, key);
for (const [full, s] of Object.entries(table.sections))
  secByNum.set(s.num, { key: s.key, chapter: s.chapter, kapKey: kapKeyById.get(s.chapter), full });
const kapByNum = new Map(Object.entries(table.chapters).map(([key, ch]) => [String(ch.num), { key, id: ch.id }]));
const sectionKeys = new Set(Object.values(table.sections).map((s) => s.key));

const numOf = (num) => num.split(".").join("-");
const numPrefix = (num) => num.split(".").slice(0, 2).join(".");
const sectionKey = (num) => secByNum.get(numPrefix(num))?.key ?? "x";

/* ------------------------------------------------------------------ */
/* 1./2. ALT-Tabelle und ID-Ableitung                                  */
/* ------------------------------------------------------------------ */

for (const [k, v] of [...Object.entries(table.envs), ...Object.entries(table.eqs), ...Object.entries(table.subs)])
  if (!v.legacy) throw new Error(`Eintrag ${k} ist schon migriert (legacy=false) — Skript ist einmalig`);

const envId = new Map(); // num → id
const eqId = new Map();
const subId = new Map();

function assignUnique(items, first, onCollide) {
  // items: [{num, ...}]; first(item) → Wunsch-ID; onCollide(item) → Ersatz-ID
  const want = new Map();
  for (const it of items) {
    const id = first(it);
    if (!want.has(id)) want.set(id, []);
    want.get(id).push(it);
  }
  const out = new Map();
  const taken = new Set();
  for (const [id, group] of want) {
    if (group.length === 1 && !onCollide.reserved?.has(id)) {
      out.set(group[0].num, id);
      taken.add(id);
      continue;
    }
    for (const it of group) {
      let alt = onCollide(it, id, group);
      let n = 2;
      let cand = alt;
      while (taken.has(cand) || want.has(cand) && cand !== id || onCollide.reserved?.has(cand)) cand = `${alt}-${n++}`;
      out.set(it.num, cand);
      taken.add(cand);
    }
  }
  return out;
}

// Envs
{
  const items = Object.values(table.envs);
  const first = (e) => (e.name ? slug(e.name) : null) ?? `${e.directive}-${numOf(e.num)}`;
  // Kollision über Abschnitte hinweg → Abschnitts-key davor; im selben
  // Abschnitt (Definition + Beispiel „Givens-Rotation") → Art dahinter.
  const collide = (e, id, group) => {
    if (!e.name) return id;
    const secs = new Set(group.map((g) => sectionKey(g.num)));
    return secs.size > 1 ? `${sectionKey(e.num)}-${slug(e.name)}` : `${slug(e.name)}-${e.directive}`;
  };
  collide.reserved = new Set(Object.keys(table.chapters)); // @num:svd soll nicht heimlich ein Env treffen
  for (const [num, id] of assignUnique(items, first, collide)) envId.set(num, id);
}

// Unterüberschriften
{
  const items = Object.values(table.subs);
  const first = (s) => slug(s.title) ?? `sub-${numOf(s.num)}`;
  const collide = (s) => `${sectionKey(s.num)}-${slug(s.title) ?? "sub"}`;
  collide.reserved = new Set([...sectionKeys, ...Object.keys(table.chapters)]);
  for (const [num, id] of assignUnique(items, first, collide)) subId.set(num, id);
}

// Gleichungen: umschließendes Env (Zeilen-Scan) → ID des Envs, sonst eq-K-k-n
const eqHost = new Map(); // eq num → env num
for (const file of new Set(Object.values(table.eqs).map((e) => e.file))) {
  const lines = readFileSync(join(root, file), "utf8").split("\n");
  const stack = []; // { colons, envNum|null }
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) return;
    const open = /^\s*(:{3,})([a-z]+)(?:\[(.*)\])?/.exec(line);
    const close = /^\s*(:{3,})\s*$/.exec(line);
    if (open) {
      const m = /^(\d+(?:\.\d+)+)/.exec(open[3] ?? "");
      stack.push({ colons: open[1].length, envNum: ENV_KIND[open[2]] && m ? m[1] : null });
      return;
    }
    if (close) {
      while (stack.length && stack[stack.length - 1].colons > close[1].length) stack.pop();
      if (stack.length && stack[stack.length - 1].colons === close[1].length) stack.pop();
      return;
    }
    const eq = /^\s*\$\$\s*\{#eq-(\d+(?:\.\d+)+)\}/.exec(line);
    if (eq) {
      const host = [...stack].reverse().find((s) => s.envNum);
      if (host) eqHost.set(eq[1], host.envNum);
    }
  });
}
{
  const items = Object.values(table.eqs);
  const first = (q) => {
    const host = eqHost.get(q.num);
    const env = host && table.envs[host];
    return env?.name ? envId.get(host) : `eq-${numOf(q.num)}`;
  };
  const collide = (q, id) => id; // → id-2, id-3 …
  for (const [num, id] of assignUnique(items, first, collide)) eqId.set(num, id);
}

// CSV
{
  const rows = [["alt", "typ", "id", "datei"]];
  for (const e of Object.values(table.envs)) rows.push([e.num, e.directive, envId.get(e.num), e.file]);
  for (const q of Object.values(table.eqs)) rows.push([q.num, "eq", eqId.get(q.num), q.file]);
  for (const s of Object.values(table.subs)) rows.push([s.num, "sub", subId.get(s.num), s.file]);
  rows.sort((a, b) => (a[3] === b[3] ? 0 : a[3] < b[3] ? -1 : 1));
  const csv = rows.map((r) => r.map((c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";
  if (!dry) {
    mkdirSync(dirname(csvFile), { recursive: true });
    writeFileSync(csvFile, csv);
  }
  const ids = [...envId.values(), ...eqId.values(), ...subId.values()];
  for (const id of ids) if (!/^[a-z0-9][a-z0-9-]*$/.test(id) || /^\d+$/.test(id)) throw new Error(`ungültige ID ${id}`);
  const dup = (m) => [...m.values()].filter((v, i, a) => a.indexOf(v) !== i);
  if (dup(envId).length || dup(eqId).length || dup(subId).length)
    throw new Error(`doppelte IDs: ${[...dup(envId), ...dup(eqId), ...dup(subId)].join(", ")}`);
  console.log(`IDs: ${envId.size} Envs, ${eqId.size} Gleichungen, ${subId.size} Unterüberschriften → ${relative(root, csvFile)}`);
}

/* ------------------------------------------------------------------ */
/* 3. Umschreiben                                                      */
/* ------------------------------------------------------------------ */

const KINDS_SG = "Satz|Theorem|Definition|Lemma|Korollar|Beispiel|Bemerkung|Algorithmus";
const KINDS_PL = "Sätze|Sätzen|Definitionen|Lemmata|Korollare|Beispiele|Beispielen|Bemerkungen|Algorithmen";
const WORD_FAMILY = {
  Satz: "satz", Theorem: "satz", Sätze: "satz", Sätzen: "satz",
  Definition: "definition", Definitionen: "definition",
  Lemma: "lemma", Lemmata: "lemma",
  Korollar: "korollar", Korollare: "korollar",
  Beispiel: "beispiel", Beispiele: "beispiel", Beispielen: "beispiel",
  Bemerkung: "bemerkung", Bemerkungen: "bemerkung",
  Algorithmus: "algorithmus", Algorithmen: "algorithmus",
};

const counts = {};
const count = (k) => (counts[k] = (counts[k] ?? 0) + 1);
const hand = []; // { file, line, kind, text, note }
const mismatch = [];

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith(".mdx")) yield p;
  }
}

/** Abschnitts-Verweis für Nummer K.k aus Datei im Kapitel chapterId. */
function secRef(num, chapterId, numOnly) {
  const s = secByNum.get(num);
  if (!s) return null;
  if (numOnly) return `@num:${s.full}`;
  return s.chapter === chapterId ? `@sec:${s.key}` : `@sec:${s.full}`;
}

function envRef(word, num) {
  const env = table.envs[num];
  if (!env) return { error: `kein Env ${num}` };
  if (envFamily(env.kind) !== WORD_FAMILY[word]) return { error: `Text „${word} ${num}", Label ist ${env.kind} ${env.num}` };
  if (/^(Satz|Theorem|Definition|Lemma|Korollar|Beispiel|Bemerkung|Algorithmus)$/.test(word) && env.kind !== word)
    return { error: `Text „${word}", gerendert würde „${env.kind}"` };
  return { ref: `@${env.directive}:${envId.get(num)}`, numRef: `@num:${envId.get(num)}` };
}

function migrateFile(file) {
  const rel = relative(root, file);
  const chapterId = /src[\\/]chapters[\\/]([^\\/]+)/.exec(file)[1];
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  let inFence = false;
  let inMath = false;
  const out = lines.map((line, i) => {
    const where = { file: rel, line: i + 1 };
    const H = (kind, text, note) => hand.push({ ...where, kind, text, note });
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;

    // --- Env-Label / andere Direktiven-Labels ------------------------
    let m;
    if ((m = /^(\s*:{3,}\s*)([a-z]+)\[(.*)\](\s*)$/.exec(line))) {
      const [, pre, name, label, post] = m;
      if (ENV_KIND[name]) {
        const lm = /^(\d+(?:\.\d+)+)(\s*\(.+\))?$/.exec(label.trim());
        if (lm) {
          const id = envId.get(lm[1]);
          if (!id) throw new Error(`${rel}:${i + 1}: Label ${lm[1]} nicht in Tabelle`);
          count("A label");
          return `${pre}${name}[#${id}${lm[2] ?? ""}]${post}`;
        }
        if (/\d+\.\d+\.\d+/.test(label)) H("label", line.trim(), "Env-Label mit Nummer in Sonderform");
        return line;
      }
      if (/\d+\.\d+(\.\d+)?/.test(label)) H("label", line.trim(), "Nummer im Label einer Nicht-Env-Direktive (Verweise dort verboten)");
      return line;
    }

    // --- Display-Mathe --------------------------------------------------
    if ((m = /^(\s*\$\$\s*)\{#eq-(\d+(?:\.\d+)+)\}(.*)$/.exec(line))) {
      inMath = !inMath;
      const id = eqId.get(m[2]);
      if (!id) throw new Error(`${rel}:${i + 1}: Gleichung ${m[2]} nicht in Tabelle`);
      count("B eq-tag");
      return `${m[1]}{#eq-${id}}${m[3]}`;
    }
    if (/^\s*\$\$/.test(line)) {
      inMath = !inMath;
      return line;
    }
    if (inMath) {
      if (/\d+\.\d+\.\d+/.test(line) && /\\text/.test(line)) H("math", line.trim(), "Nummer in \\text{} innerhalb Mathe");
      return line;
    }

    // --- Unterüberschrift ------------------------------------------------
    if ((m = /^(#{2,5})\s+(\d+\.\d+\.\d+)\s+(.*?)\s*$/.exec(line))) {
      const id = subId.get(m[2]);
      if (!id) throw new Error(`${rel}:${i + 1}: Überschrift ${m[2]} nicht in Tabelle`);
      count("F heading");
      return `${m[1]} ${m[3]} :id[${id}]`;
    }
    if (/^#{1,5}\s/.test(line) && /\d+\.\d+\.\d+/.test(line)) H("heading", line.trim(), "Überschrift mit Nummer im Text");

    // --- Prosa ----------------------------------------------------------
    const ph = [];
    const keep = (s) => {
      ph.push(s);
      return `\u0000${ph.length - 1}\u0000`;
    };
    let t = line;
    // Inline-Code schützen
    t = t.replace(/`[^`]*`/g, keep);
    // ($K.k.n$) → @eq:
    t = t.replace(new RegExp(`\\(\\$(${NUM3})\\$\\)`, "g"), (all, num) => {
      const id = eqId.get(num);
      if (!id) {
        H("eq", all, "keine Gleichung mit dieser Nummer");
        return keep(all);
      }
      count("D1 ($x$)");
      return `@eq:${id}`;
    });
    // Inline-Mathe schützen
    t = t.replace(/\$[^$\n]+\$/g, (all) => {
      if (/\d+\.\d+\.\d+/.test(all)) H("math", all, "Nummer in Inline-Mathe");
      return keep(all);
    });
    // Links
    t = t.replace(/\[([^\[\]]*)\]\(([^)\s]*)\)/g, (all, text, url) => {
      const u = /^(?:\?k=([\w-]+))?(?:#sec-(\d+\.\d+(?:\.\d+)?))?$/.exec(url);
      if (!u || (!u[1] && !u[2])) {
        // Sonderanker (<h3 id="sec-7.1-geometrie">), externe Links: bleiben
        if (/\d/.test(text)) H("link", all, "Link auf Sonderanker/extern mit Nummer im Text (bleibt)");
        return keep(all);
      }
      const [, kap, sec] = u;
      if (!/\d/.test(text)) return keep(all); // sprechender Linktext, bleibt
      const tt = text.trim();
      let mm;
      if (sec && (mm = new RegExp(`^Abschnitt (${NUM2})$`).exec(tt))) {
        if (mm[1] !== sec) {
          H("link", all, "Linktext ≠ Ziel");
          return keep(all);
        }
        const r = secRef(sec, chapterId, false);
        if (!r) {
          H("link", all, "Abschnitt unbekannt");
          return keep(all);
        }
        count("E1/E2 [Abschnitt K.k]");
        return r;
      }
      if (sec && (mm = new RegExp(`^Abschnitt (${NUM3})$`).exec(tt))) {
        const id = subId.get(mm[1]);
        if (mm[1] !== sec || !id) {
          H("link", all, "Unterabschnitt-Link");
          return keep(all);
        }
        count("E5 [Abschnitt K.k.n]");
        return `@sec:${id}`;
      }
      if (sec && (mm = new RegExp(`^(Abschnitte|Abschnitten) (${NUM2})$`).exec(tt)) && mm[2] === sec) {
        const r = secRef(sec, chapterId, true);
        if (!r) {
          H("link", all, "Abschnitt unbekannt");
          return keep(all);
        }
        count("E1/E2 [Abschnitte K.k]");
        return `${mm[1]} ${r}`;
      }
      if (sec && new RegExp(`^${NUM2}$`).test(tt) && tt === sec) {
        const r = secRef(sec, chapterId, true);
        if (!r) {
          H("link", all, "Abschnitt unbekannt");
          return keep(all);
        }
        count("E1/E2 [K.k]");
        return r;
      }
      if (!sec && kap && (mm = /^Kapitel (\d+)$/.exec(tt))) {
        const k = kapByNum.get(mm[1]);
        if (!k || k.id !== kap) {
          H("link", all, "Kapitel ≠ Ziel");
          return keep(all);
        }
        count("E3 [Kapitel N]");
        return `@kap:${k.key}`;
      }
      if (sec && kap && (mm = /^Kapitel (\d+)$/.exec(tt))) {
        const k = kapByNum.get(mm[1]);
        if (k && k.id === kap && sec === `${mm[1]}.1`) {
          count("E3 [Kapitel N](…#sec-N.1)");
          return `@kap:${k.key}`;
        }
        H("link", all, "Kapitel-Link mit Abschnittsziel ≠ N.1 (Deep-Link bleibt)");
        return keep(all);
      }
      if (!sec && kap && /^\d+$/.test(tt)) {
        const k = kapByNum.get(tt);
        if (!k || k.id !== kap) {
          H("link", all, "Kapitel ≠ Ziel");
          return keep(all);
        }
        count("E3 [N](?k=)");
        return `@num:${k.key}`;
      }
      if ((mm = new RegExp(`^(${KINDS_SG}) (${NUM3})$`).exec(tt))) {
        const r = envRef(mm[1], mm[2]);
        if (r.error) {
          H("link", all, r.error);
          return keep(all);
        }
        count("C3 [Env-Verweis](link)");
        return r.ref;
      }
      H("link", all, "Linktext mit Nummer, unbekannte Form");
      return keep(all);
    });
    // Plural-Ketten: Sätze 7.1.5 und 7.1.7 / Beispiele 9.2.7 bis 9.2.9
    t = t.replace(
      new RegExp(`\\b(${KINDS_PL})(\\s+)(${NUM3}(?:(?:\\s*,\\s*|\\s+(?:und|bis|oder|sowie)\\s+)${NUM3})*)\\b`, "g"),
      (all, word, sp, chain) => {
        const nums = chain.match(new RegExp(NUM3, "g"));
        const refs = nums.map((n) => envRef(word, n));
        const bad = refs.find((r) => r.error);
        if (bad) {
          H("plural", all, bad.error);
          return all;
        }
        let k = 0;
        count("C2 Plural");
        return `${word}${sp}${chain.replace(new RegExp(NUM3, "g"), () => refs[k++].numRef)}`;
      }
    );
    // Env-Verweis Singular
    t = t.replace(new RegExp(`\\b(${KINDS_SG})\\s+(${NUM3})\\b`, "g"), (all, word, num) => {
      const r = envRef(word, num);
      if (r.error) {
        (r.error.startsWith("Text") ? mismatch : hand).push({ ...where, kind: "env", text: all, note: r.error });
        return all;
      }
      count("C1 Env-Verweis");
      return r.ref;
    });
    // Gleichung (K.k.n) Klartext / Gleichung K.k.n
    t = t.replace(new RegExp(`\\((${NUM3})\\)`, "g"), (all, num) => {
      const id = eqId.get(num);
      if (!id) {
        H("eq", all, "Klartext-Klammer ohne Gleichung");
        return all;
      }
      count("D2 (K.k.n)");
      H("eq-auto", all, `→ @eq:${id} (Klartextform, bitte Sichtkontrolle)`);
      return `@eq:${id}`;
    });
    t = t.replace(new RegExp(`\\b(Gleichung(?:en)?)\\s+(${NUM3})\\b`, "g"), (all, word, num) => {
      const id = eqId.get(num);
      if (!id || table.envs[id]) {
        H("eq", all, id ? `@num:${id} wäre mehrdeutig (Env gleicher ID)` : "keine Gleichung");
        return all;
      }
      count("D3 Gleichung K.k.n");
      return `${word} @num:${id}`;
    });
    // nackte Abschnitte
    t = t.replace(
      new RegExp(`\\b(Abschnitte|Abschnitten)(\\s+)(${NUM2}(?:(?:\\s*,\\s*|\\s+(?:und|bis|oder|sowie)\\s+)${NUM2})*)\\b(?!\\.\\d)`, "g"),
      (all, word, sp, chain) => {
        const nums = chain.match(new RegExp(NUM2, "g"));
        const refs = nums.map((n) => secRef(n, chapterId, true));
        if (refs.some((r) => !r)) {
          H("sec", all, "Abschnitt unbekannt");
          return all;
        }
        let k = 0;
        count("E4 Abschnitte nackt");
        return `${word}${sp}${chain.replace(new RegExp(NUM2, "g"), () => refs[k++])}`;
      }
    );
    t = t.replace(new RegExp(`\\bAbschnitt\\s+(${NUM3}|${NUM2})\\b`, "g"), (all, num) => {
      if (num.split(".").length === 3) {
        const id = subId.get(num);
        if (!id) {
          H("sec", all, "Unterabschnitt unbekannt");
          return all;
        }
        count("E4 Abschnitt K.k.n nackt");
        return `@sec:${id}`;
      }
      const r = secRef(num, chapterId, false);
      if (!r) {
        H("sec", all, "Abschnitt unbekannt");
        return all;
      }
      count("E4 Abschnitt nackt");
      return r;
    });
    // Nachkontrolle: Verweis direkt gefolgt von [ { - oder Wortzeichen?
    for (const mm of t.matchAll(/@[a-z]+:[a-z0-9/-]+(?:-\d+)?([\[{])/g)) H("ref-follow", mm[0], "Verweis direkt von [ oder { gefolgt");
    // Reste
    t = t.replace(/\u0000(\d+)\u0000/g, (_, k) => ph[k]);
    const rest = t.replace(/`[^`]*`/g, "").replace(/\$[^$\n]+\$/g, "");
    for (const mm of rest.matchAll(new RegExp(`\\b(?:${KINDS_SG}|${KINDS_PL})\\s+${NUM3}\\b|\\(\\$?${NUM3}\\$?\\)|\\bGleichung\\s+\\$?${NUM3}|\\bAbschnitte?n?\\s+${NUM2}\\b|\\[[^\\]]*\\d[^\\]]*\\]\\((?:\\?k=|#sec-)`, "g")))
      if (!hand.some((h) => h.file === rel && h.line === i + 1 && mm[0].includes(h.text.slice(0, 8)))) H("rest", mm[0], "übrig geblieben");
    return t;
  });
  if (inFence || inMath) throw new Error(`${rel}: unbalancierte Fence/Mathe-Blöcke`);
  const result = out.join("\n");
  if (result !== src && !dry) writeFileSync(file, result);
  return result !== src;
}

let changed = 0;
for (const file of walk(join(root, "src", "chapters"))) if (migrateFile(file)) changed++;

console.log(`${dry ? "(dry) " : ""}${changed} Dateien geändert`);
for (const [k, n] of Object.entries(counts).sort()) console.log(`  ${k.padEnd(32)} ${n}`);
console.log(`Art-Mismatches: ${mismatch.length}`);
for (const h of mismatch) console.log(`  ${h.file}:${h.line}  ${h.text}  — ${h.note}`);
console.log(`Handfälle: ${hand.length}`);
for (const h of hand) console.log(`  ${h.file}:${h.line}  [${h.kind}] ${h.text}  — ${h.note}`);
if (reportFile) writeFileSync(reportFile, JSON.stringify({ counts, mismatch, hand, envId: [...envId], eqId: [...eqId], subId: [...subId] }, null, 1));
