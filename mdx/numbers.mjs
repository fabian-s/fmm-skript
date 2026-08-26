/**
 * Nummerntabelle und Verweis-Syntax — der gemeinsame Kern der automatischen
 * Nummerierung. Wird von DREI Stellen benutzt, die alle dasselbe sehen müssen:
 *
 *   scripts/gen-numbers.mjs     zählt und schreibt src/chapters/numbers.generated.json
 *   mdx/remark-fmm.mjs          löst Labels und @-Verweise zur Compile-Zeit auf (Web)
 *   scripts/pdf/mdx-to-latex.mjs  dito für die Druckfassung
 *
 * Autorensyntax (parallel zur alten Handnummerierung, beides darf gemischt
 * vorkommen — die Migration ist stufenweise):
 *
 *   :::satz[#kkt (KKT-Bedingungen)]   ID-Label, Nummer kommt aus der Tabelle
 *   :::satz[12.5.7 (KKT-Bedingungen)] Handnummer (alt), wird als ID „12.5.7" registriert
 *   :::bemerkung[(Konvention …)]      explizit unnummeriert
 *   $$ {#eq-kkt-stationaritaet}       ID-Gleichung;  $$ {#eq-12.5.3} = Handnummer (alt)
 *   ### Titel :id[lagrange-idee]      nummerierte Unterüberschrift per ID
 *   ### 2.5.1 Titel                   Handnummer (alt)
 *
 *   @satz:kkt  @definition:x  @lemma:x  @korollar:x  @beispiel:x  @bemerkung:x  @algorithmus:x
 *   @eq:kkt-stationaritaet    → „(12.5.3)"        @num:kkt → „12.5.7" (nur die Nummer;
 *                               auch @num:optim/beschraenkt → „12.5", @num:svd → „6")
 *   @sec:optim/beschraenkt    → „Abschnitt 12.5"  @sec:beschraenkt (im selben Kapitel)
 *   @sec:lagrange-idee        → „Abschnitt 12.5.1" (Unterüberschrift)
 *   @kap:optim                → „Kapitel 12"      @ref:kkt → „Satz 12.5.7" (Art automatisch)
 *   \@satz:kkt                → wörtlich, kein Verweis
 *
 * Verweise gehen NUR auf ID-Labels. Ein Verweis auf eine Handnummer bleibt,
 * was er heute ist: Text. So ist jederzeit klar, welche Verweise schon
 * zählerfest sind.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

/* ------------------------------------------------------------------ */
/* Umgebungsarten                                                      */
/* ------------------------------------------------------------------ */

/** Direktivenname → angezeigte Art (identisch mit ENV in remark-fmm). */
export const ENV_KIND = {
  definition: "Definition",
  theorem: "Theorem",
  lemma: "Lemma",
  corollary: "Corollary",
  example: "Example",
  remark: "Remark",
  algorithm: "Algorithm",
  satz: "Satz",
  korollar: "Korollar",
  beispiel: "Beispiel",
  bemerkung: "Bemerkung",
  algorithmus: "Algorithmus",
};

/** Art → Familie: „@satz:" darf auf ein :::theorem zeigen, nicht auf eine Definition. */
const FAMILY = {
  Definition: "definition",
  Theorem: "satz",
  Satz: "satz",
  Lemma: "lemma",
  Corollary: "korollar",
  Korollar: "korollar",
  Example: "beispiel",
  Beispiel: "beispiel",
  Remark: "bemerkung",
  Bemerkung: "bemerkung",
  Algorithm: "algorithmus",
  Algorithmus: "algorithmus",
};
export const envFamily = (kind) => FAMILY[kind] ?? kind;

/* ------------------------------------------------------------------ */
/* Label-Formen                                                        */
/* ------------------------------------------------------------------ */

export const ID_RE = /^[a-z0-9][a-z0-9-]*$/;
export const LEGACY_NUM_RE = /^\d+(?:\.\d+)+$/;

export function isValidId(id) {
  return ID_RE.test(id) && !/^\d+$/.test(id);
}

/**
 * Env-Label zerlegen.
 *   "12.5.7 (Name)" / "12.5.7"  → { form: "legacy", num, name }
 *   "#kkt (Name)" / "#kkt"      → { form: "id", id, name }
 *   "(Name)"                    → { form: "unnumbered", name }
 *   alles andere                → { form: "free", text }  (alt: nummernloses Freitext-Label)
 */
export function parseEnvLabel(text) {
  const t = String(text ?? "").trim();
  let m;
  if ((m = /^(\d+(?:\.\d+)+)\s*(?:\((.+)\))?$/.exec(t)))
    return { form: "legacy", num: m[1], name: m[2]?.trim() ?? null };
  if ((m = /^#(\S+)\s*(?:\((.+)\))?$/.exec(t))) return { form: "id", id: m[1], name: m[2]?.trim() ?? null };
  if ((m = /^\((.+)\)$/.exec(t))) return { form: "unnumbered", name: m[1].trim() };
  return { form: "free", text: t };
}

/** Anzeige-Label wie bisher: "12.5.7 (Name)" bzw. "12.5.7". */
export function formatEnvLabel(num, name) {
  return name ? `${num} (${name})` : num;
}

/** `{#eq-…}` hinter $$ → { id, legacy } | null (kein Meta) | { error }. */
export function parseEqMeta(meta) {
  const t = String(meta ?? "").trim();
  if (!t) return null;
  const m = /^\{#eq-([^}\s]+)\}$/.exec(t);
  if (!m) return { error: `unverständliche Angabe hinter $$: „${t}". Erlaubt ist genau ein {#eq-<id>}, z.B. $$ {#eq-kkt} oder (alt) $$ {#eq-2.3}` };
  const id = m[1];
  if (LEGACY_NUM_RE.test(id)) return { id, legacy: true };
  if (!isValidId(id)) return { error: `Gleichungs-ID „${id}" — erlaubt sind a-z, 0-9, - (nicht rein numerisch)` };
  return { id, legacy: false };
}

/**
 * Überschrift analysieren (mdast heading, VOR dem Umbau):
 *   "### 2.5.1 Titel"        → { legacy: "2.5.1" }
 *   "### Titel :id[slug]"    → { id: "slug" }  (die Direktive wird aus den Kindern ENTFERNT)
 *   sonst                    → {}
 * `plain` liefert den Klartext eines Knotens (Aufrufer bringt seine Fassung mit).
 */
export function takeHeadingId(node, plain) {
  const kids = node.children ?? [];
  const idx = kids.findIndex((c) => c.type === "textDirective" && c.name === "id");
  if (idx >= 0) {
    const d = kids[idx];
    const id = plain(d).trim();
    if (d.attributes && Object.keys(d.attributes).length)
      return { error: `:id[…] in einer Überschrift trägt keine Attribute` };
    if (!isValidId(id)) return { error: `Überschriften-ID „${id}" — erlaubt sind a-z, 0-9, - (nicht rein numerisch)` };
    if (idx !== kids.length - 1) return { error: `:id[${id}] muss am ENDE der Überschrift stehen` };
    node.children = kids.slice(0, idx);
    // Leerzeichen vor der Direktive abschneiden
    const last = node.children[node.children.length - 1];
    if (last?.type === "text") last.value = last.value.replace(/\s+$/, "");
    const text = plain(node).trim();
    if (/^\d+(?:\.\d+)*\b/.test(text))
      return { error: `Überschrift „${text}" trägt Nummer UND :id[${id}] — eines von beiden` };
    return { id, position: d.position };
  }
  const text = plain(node).trim();
  const m = /^(\d+(?:\.\d+)*)\b/.exec(text);
  return m ? { legacy: m[1] } : {};
}

/* ------------------------------------------------------------------ */
/* Tabelle laden                                                       */
/* ------------------------------------------------------------------ */

export const TABLE_REL = path.join("src", "chapters", "numbers.generated.json");

export const EMPTY_TABLE = Object.freeze({
  version: 1,
  chapters: {},
  sections: {},
  envs: {},
  eqs: {},
  subs: {},
});

const cache = new Map(); // absPath → { mtimeMs, size, table }

/**
 * Tabelle synchron aus <root>/src/chapters/numbers.generated.json lesen,
 * gecacht per mtime — so bleibt der remarkChain(root)-Vertrag der vier
 * Konsumenten (vite, inventory, typecheck, fixtures) unverändert. Fehlt die
 * Datei (Fixtures mit Fantasie-root), ist die Tabelle leer: Handnummern
 * funktionieren dann weiterhin, ID-Labels melden „unbekannt".
 */
export function loadNumbers(root) {
  const file = path.resolve(root ?? process.cwd(), TABLE_REL);
  if (!existsSync(file)) return EMPTY_TABLE;
  const st = statSync(file);
  const hit = cache.get(file);
  if (hit && hit.mtimeMs === st.mtimeMs && hit.size === st.size) return hit.table;
  const table = JSON.parse(readFileSync(file, "utf8"));
  cache.set(file, { mtimeMs: st.mtimeMs, size: st.size, table });
  return table;
}

/** "…/src/chapters/12-optim/S125.mdx" → "12-optim"; Konzepte u. a. → null. */
export function chapterOfFile(filePath) {
  const m = /[\\/]src[\\/]chapters[\\/]([^\\/]+)[\\/]/.exec(String(filePath ?? ""));
  return m ? m[1] : null;
}

/* ------------------------------------------------------------------ */
/* @-Verweise                                                          */
/* ------------------------------------------------------------------ */

const REF_TYPES = [...Object.keys(ENV_KIND), "eq", "sec", "kap", "num", "ref"];
/** Ein Verweis-Token; das `\\?` davor fängt die Maskierung \@ ein. */
export const REF_RE = new RegExp(
  `(\\\\?)@(${REF_TYPES.join("|")}):([a-z0-9][a-z0-9-]*(?:/[a-z0-9][a-z0-9-]*)?)`,
  "g"
);

/**
 * remark-directive liest in „@satz:kkt" das „:kkt" als Text-Direktive. Der
 * Verweis muss also VOR jeder Direktivenprüfung wieder zusammengesetzt
 * werden: Textknoten „…@satz" + Direktive „:kkt" (+ folgender Text) → EIN
 * Textknoten „…@satz:kkt…". Die Position wird auf den Gesamtbereich
 * ausgedehnt, damit der Rohtext-Abgleich (Maskierung \@) weiter stimmt.
 * Rückgabe: Liste von Fehlern [{ node, message }].
 */
export function mergeRefDirectives(tree, visit) {
  const errors = [];
  const tail = new RegExp(`(\\\\?)@(${REF_TYPES.join("|")})$`);
  visit(tree, (node, index, parent) => {
    if (node.type !== "textDirective" || !parent || index == null) return;
    const prev = parent.children[index - 1];
    if (!prev || prev.type !== "text" || !tail.test(prev.value)) return;
    if ((node.children ?? []).length || Object.keys(node.attributes ?? {}).length) {
      errors.push({ node, message: `@-Verweis „@…:${node.name}" darf nicht direkt von [ oder { gefolgt werden` });
      return;
    }
    prev.value += `:${node.name}`;
    let end = node.position?.end;
    const next = parent.children[index + 1];
    let removed = 1;
    if (next?.type === "text") {
      prev.value += next.value;
      end = next.position?.end ?? end;
      removed = 2;
    }
    if (prev.position && end) prev.position = { start: prev.position.start, end };
    parent.children.splice(index, removed);
    return index; // denselben Index erneut prüfen (Kette @a:b … @c:d)
  });
  return errors;
}

const href = (ctxChapter, chapterId, hash) =>
  (ctxChapter === chapterId ? "" : `?k=${chapterId}`) + (hash ? `#${hash}` : "");

/**
 * Verweis auflösen. ctx = { chapterId } der Datei, in der er steht (null bei
 * Konzept-MDX: dann immer die ?k=-Form). Wirft Error mit Autorentext.
 */
export function resolveRef(table, type, id, ctx = {}, numOnly = false) {
  const cur = ctx.chapterId ?? null;
  const envKind = ENV_KIND[type];

  if (envKind || type === "ref" || type === "num") {
    const env = table.envs?.[id];
    if (env) {
      if (env.legacy) throw new Error(`@${type}:${id} zeigt auf eine HANDNUMMER — Verweise gehen nur auf ID-Labels (:::${env.directive}[#id …])`);
      if (envKind && envFamily(envKind) !== envFamily(env.kind))
        throw new Error(`@${type}:${id} — aber „${id}" ist ${env.kind === "Definition" ? "eine" : "ein"} ${env.kind} (${env.num}); schreibe @${env.directive}:${id}`);
      const text = type === "num" ? env.num : `${env.kind} ${env.num}`;
      return { text, href: href(cur, env.chapter, env.anchor), anchor: env.anchor, chapterId: env.chapter, target: "env", num: env.num };
    }
    if (envKind) throw new Error(`unbekannter Verweis @${type}:${id} — kein Env-Label mit dieser ID`);
    // @num / @ref auch auf Gleichungen und Unterüberschriften
    // @num / @ref auch auf Gleichungen, Unterüberschriften, Abschnitte (nur
    // in der Form <kap>/<key>) und Kapitel — „Abschnitte @num:optim/a und
    // @num:optim/b", „Kapitel @num:svd und @num:kq".
    const eq = table.eqs?.[id];
    const sub = table.subs?.[id];
    const sec = id.includes("/") ? table.sections?.[id] : null;
    const kap = id.includes("/") ? null : table.chapters?.[id];
    const hits = [eq && "Gleichung", sub && "Unterüberschrift", sec && "Abschnitt", kap && "Kapitel"].filter(Boolean);
    if (hits.length > 1) throw new Error(`@${type}:${id} ist mehrdeutig (${hits.join(" UND ")}) — nutze @eq:/@sec:/@kap:${id}`);
    if (eq) return resolveRef(table, "eq", id, ctx, type === "num");
    if (sub || sec) return resolveRef(table, "sec", id, ctx, type === "num");
    if (kap) {
      const r = resolveRef(table, "kap", id, ctx);
      return type === "num" ? { ...r, text: r.num } : r;
    }
    throw new Error(`unbekannter Verweis @${type}:${id}`);
  }

  if (type === "eq") {
    const eq = table.eqs?.[id];
    if (!eq) throw new Error(`unbekannter Verweis @eq:${id} — keine Gleichung $$ {#eq-${id}}`);
    if (eq.legacy) throw new Error(`@eq:${id} zeigt auf eine HANDNUMMER — Verweise gehen nur auf ID-Gleichungen`);
    const text = numOnly ? eq.num : `(${eq.num})`;
    return { text, href: href(cur, eq.chapter, eq.anchor), anchor: eq.anchor, chapterId: eq.chapter, target: "eq", num: eq.num };
  }

  if (type === "kap") {
    const ch = table.chapters?.[id];
    if (!ch) throw new Error(`unbekannter Verweis @kap:${id} — Kapitelschlüssel sind: ${Object.keys(table.chapters ?? {}).join(", ")}`);
    return { text: `Kapitel ${ch.num}`, href: `?k=${ch.id}`, anchor: `chap-${ch.id}`, chapterId: ch.id, target: "kap", num: String(ch.num) };
  }

  if (type === "sec") {
    let sec = null;
    if (id.includes("/")) sec = table.sections?.[id];
    else if (cur) {
      const ck = Object.entries(table.chapters ?? {}).find(([, c]) => c.id === cur)?.[0];
      if (ck) sec = table.sections?.[`${ck}/${id}`];
    }
    const sub = id.includes("/") ? null : table.subs?.[id];
    if (sec && sub) throw new Error(`@sec:${id} ist mehrdeutig: Abschnitt UND Unterüberschrift — schreibe @sec:<kap>/${id}`);
    if (sec) {
      const text = numOnly ? sec.num : `Abschnitt ${sec.num}`;
      return { text, href: href(cur, sec.chapter, sec.anchor), anchor: sec.anchor, chapterId: sec.chapter, target: "sec", num: sec.num };
    }
    if (sub) {
      if (sub.legacy) throw new Error(`@sec:${id} zeigt auf eine HANDNUMMER-Überschrift`);
      const text = numOnly ? sub.num : `Abschnitt ${sub.num}`;
      return { text, href: href(cur, sub.chapter, sub.anchor), anchor: sub.anchor, chapterId: sub.chapter, target: "sub", num: sub.num };
    }
    const hint = id.includes("/")
      ? ""
      : cur
        ? ` (im Kapitel ${cur}; kapitelübergreifend als @sec:<kap>/<key>)`
        : ` (außerhalb eines Kapitels immer @sec:<kap>/<key>)`;
    throw new Error(`unbekannter Verweis @sec:${id}${hint}`);
  }
  throw new Error(`unbekannte Verweisart @${type}:`);
}

/**
 * Textknoten-Wert in Segmente zerlegen: { text } | { ref: {type,id}, raw }.
 * `raw` ist der Quelltext des Knotens (für die Maskierung \@): der Parser hat
 * das \ schon entfernt, im Wert steht also „@satz:x" — ob es maskiert war,
 * sagt nur der Rohtext. Die k-te Fundstelle im Wert entspricht der k-ten im
 * Rohtext (Maskierung erzeugt und vernichtet keine @-Muster); stimmt die
 * Anzahl nicht überein, wird nicht geraten, sondern gemeldet.
 */
export function splitRefs(value, raw) {
  const inValue = [...String(value).matchAll(REF_RE)];
  if (!inValue.length) return null;
  const inRaw = raw != null ? [...String(raw).matchAll(REF_RE)] : null;
  if (inRaw && inRaw.length !== inValue.length)
    return { error: `@-Verweise im Text lassen sich dem Quelltext nicht zuordnen (${inValue.length} im Text, ${inRaw.length} in der Quelle) — Entities/Sonderschreibweisen um @… vermeiden` };
  const out = [];
  let pos = 0;
  let any = false;
  inValue.forEach((m, k) => {
    const escaped = inRaw ? inRaw[k][1] === "\\" : m[1] === "\\";
    const start = m.index;
    if (escaped) {
      // Wert enthält bereits das entmaskierte „@…": als Text belassen
      return;
    }
    if (start > pos) out.push({ text: value.slice(pos, start) });
    out.push({ ref: { type: m[2], id: m[3] }, raw: m[0] });
    pos = start + m[0].length;
    any = true;
  });
  if (!any) return null;
  if (pos < value.length) out.push({ text: value.slice(pos) });
  return { segments: out };
}
