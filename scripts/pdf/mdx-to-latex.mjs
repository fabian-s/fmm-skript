#!/usr/bin/env node
/**
 * mdx-to-latex.mjs — Druckfassung des Skripts.
 *
 * Liest dieselben MDX-Quellen wie die Web-App, wirft die interaktiven
 * Widgets weg und erzeugt ein LaTeX-Buch. Der Parser ist die kanonische
 * remark-Kette OHNE remark-fmm: remark-fmm bildet auf React-Komponenten
 * ab, hier brauchen wir die Direktiven roh.
 *
 * ENTWURFSPRINZIP (wie remark-fmm): lieber laut scheitern als still Inhalt
 * verlieren. Jeder unbekannte Knotentyp, jede unbekannte Direktive und jede
 * unbekannte Komponente landet im Bericht am Ende; --strict macht daraus
 * einen Abbruch.
 *
 *   node scripts/pdf/mdx-to-latex.mjs [--out build/pdf] [--strict]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkMdx from "remark-mdx";
import { Parser } from "acorn";
import acornJsx from "acorn-jsx";
import { readChapters, readSections } from "../lib/registry.mjs";
import {
  loadNumbers,
  parseEnvLabel,
  parseEqMeta,
  takeHeadingId,
  resolveRef,
  splitRefs,
  mergeRefDirectives,
} from "../../mdx/numbers.mjs";
import { visit } from "unist-util-visit";

const JsxParser = Parser.extend(acornJsx());
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const chaptersDir = join(root, "src", "chapters");

// Nummerntabelle (scripts/gen-numbers.mjs): dieselbe Quelle wie remark-fmm,
// damit Web und Druck garantiert dieselben Nummern zeigen.
const numbers = loadNumbers(root);
let currentChapterId = null;

const argv = process.argv.slice(2);
const outDir = resolve(root, argFlag("--out") ?? "build/pdf");
const strict = argv.includes("--strict");

function argFlag(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

/* =================================================================== */
/* Bericht                                                             */
/* =================================================================== */

const warnings = [];
const widgetNames = new Map();
let currentFile = "?";
const warn = (what, detail) => warnings.push(`${currentFile}: ${what}${detail ? ` — ${detail}` : ""}`);

/* =================================================================== */
/* LaTeX-Escaping                                                      */
/* =================================================================== */

const ESCAPES = {
  "\\": "\\textbackslash{}",
  "{": "\\{",
  "}": "\\}",
  $: "\\$",
  "&": "\\&",
  "#": "\\#",
  _: "\\_",
  "%": "\\%",
  "~": "\\textasciitilde{}",
  "^": "\\textasciicircum{}",
};

function esc(s) {
  return String(s)
    .replace(/[\\{}$&#_%~^]/g, (c) => ESCAPES[c])
    .replace(/\u00a0/g, "~")
    .replace(/\u2011/g, "\\mbox{-}") // non-breaking hyphen
    .replace(/\u2212/g, "\\textminus{}");
}

/**
 * Die Quellen oeffnen deutsche Zitate mit \u201e (U+201E) und schliessen sie mit
 * einem GERADEN ASCII-Anfuehrungszeichen. Im Browser sieht man davon kaum
 * etwas, im Satz ist es der falsche Glyph \u2014 und unter babel-german war es
 * bis zum shorthands=off in der Preambel sogar ein Textfresser.
 *
 * Der Zustand laeuft ueber Textknoten hinweg, weil ein Zitat regelmaessig
 * Mathematik enthaelt (\u201ef\u00fcr alle $\bx$" steht in drei Knoten).
 */
let quoteOpen = false;
const resetQuotes = () => {
  quoteOpen = false;
};

function escText(s) {
  let out = "";
  for (const ch of String(s)) {
    if (ch === "\u201e") {
      quoteOpen = true;
      out += ch;
    } else if (ch === '"' || ch === "\u201c") {
      out += quoteOpen ? "\u201c" : ch;
      quoteOpen = false;
    } else {
      out += ch;
    }
  }
  return esc(out);
}

/* =================================================================== */
/* Mathematik                                                          */
/* =================================================================== */

/**
 * MathJax erlaubt in $$…$$ ein blankes `\\` als Zeilenumbruch, LaTeX nicht:
 * dort braucht es eine Umgebung. Ohne diese Analyse stirbt der Lauf mit
 * "There's no line here to end" — oder, schlimmer, setzt die Formel falsch.
 */
function analyseDisplay(tex) {
  let depth = 0;
  let topBreak = false;
  let topAmp = false;
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i];
    if (c === "\\") {
      const m = /^\\(begin|end)\s*\{/.exec(tex.slice(i));
      if (m) {
        depth += m[1] === "begin" ? 1 : -1;
        i += m[0].length - 1;
        continue;
      }
      if (tex[i + 1] === "\\") {
        if (depth <= 0) topBreak = true;
        i++;
        continue;
      }
      i++; // sonstige Escape-Sequenz: naechstes Zeichen ueberspringen
      continue;
    }
    if (c === "&" && depth <= 0) topAmp = true;
  }
  return { topBreak, topAmp };
}

function displayBody(tex) {
  const body = tex.trim();
  const { topBreak, topAmp } = analyseDisplay(body);
  if (!topBreak) return body;
  const env = topAmp ? "aligned" : "gathered";
  return `\\begin{${env}}\n${body}\n\\end{${env}}`;
}

function displayMath(tex, tag, anchor = tag ? `eq-${tag}` : null) {
  const body = displayBody(tex);
  if (tag) {
    // Nummerierte Gleichungen bleiben ungeschrumpft: \fmmfit misst gegen
    // \linewidth und wuesste nichts von dem Platz, den die Nummer braucht.
    return `\\begin{equation}\\tag{${tag}}\\phantomsection\\label{${anchor}}\n${body}\n\\end{equation}`;
  }
  return `\\[\n\\fmmfit{${body}}\n\\]`;
}

/* =================================================================== */
/* JSX-Attributwerte ({<>…</>}) nach LaTeX                             */
/* =================================================================== */

function jsxSourceToLatex(src) {
  let ast;
  try {
    ast = JsxParser.parseExpressionAt(`(${src})`, 0, { ecmaVersion: 2022 });
  } catch {
    warn("JSX-Attribut nicht parsebar", src.slice(0, 60));
    return "";
  }
  return jsxNode(ast);
}

function jsxNode(n) {
  if (!n) return "";
  switch (n.type) {
    case "ParenthesizedExpression":
      return jsxNode(n.expression);
    case "JSXFragment":
      return n.children.map(jsxNode).join("");
    case "JSXText":
      return escText(n.value.replace(/\s+/g, " "));
    case "JSXExpressionContainer":
      return jsxNode(n.expression);
    case "JSXEmptyExpression":
      return "";
    case "Literal":
      return typeof n.value === "string" ? esc(n.value) : esc(String(n.value));
    case "TemplateLiteral":
      return n.quasis.map((q) => esc(q.value.cooked)).join("");
    case "JSXElement": {
      const name = jsxName(n.openingElement.name);
      const kids = () => n.children.map(jsxNode).join("");
      if (name === "M") return `$${rawString(n.children)}$`;
      if (name === "MD" || name === "Eq") return `\\[${rawString(n.children)}\\]`;
      if (name === "em" || name === "i") return `\\emph{${kids()}}`;
      if (name === "strong" || name === "b") return `\\textbf{${kids()}}`;
      if (name === "code") return `\\texttt{${kids()}}`;
      if (name === "br") return `\\newline{}`;
      if (name === "ConceptLink") return kids();
      if (["p", "div", "span", "small", "sub", "sup", "a"].includes(name)) {
        if (name === "sub") return `\\textsubscript{${kids()}}`;
        if (name === "sup") return `\\textsuperscript{${kids()}}`;
        return kids();
      }
      warn(`unbekannte Komponente in JSX-Attribut: <${name}>`);
      return kids();
    }
    default:
      warn(`unbekannter Ausdruck in JSX-Attribut: ${n.type}`);
      return "";
  }
}

function jsxName(node) {
  if (!node) return "";
  if (node.type === "JSXIdentifier") return node.name;
  if (node.type === "JSXMemberExpression") return `${jsxName(node.object)}.${node.property.name}`;
  return "";
}

/** Rohtext aus {"…"} — fuer <M>-Kinder, die woertliches TeX enthalten. */
function rawString(children) {
  for (const c of children ?? []) {
    if (c.type === "JSXExpressionContainer") {
      const e = c.expression;
      if (e.type === "Literal" && typeof e.value === "string") return e.value;
      if (e.type === "TemplateLiteral") return e.quasis.map((q) => q.value.cooked).join("");
    }
    if (c.type === "JSXText" && c.value.trim()) return c.value;
  }
  return "";
}

/* =================================================================== */
/* mdast -> LaTeX                                                      */
/* =================================================================== */

const ENV_STYLE = {
  definition: ["fmmblue", "Definition"],
  theorem: ["fmmblue", "Theorem"],
  lemma: ["fmmblue", "Lemma"],
  corollary: ["fmmblue", "Korollar"],
  satz: ["fmmblue", "Satz"],
  korollar: ["fmmblue", "Korollar"],
  example: ["fmmgreen", "Beispiel"],
  beispiel: ["fmmgreen", "Beispiel"],
  remark: ["fmmamber", "Bemerkung"],
  bemerkung: ["fmmamber", "Bemerkung"],
  algorithm: ["fmmviolet", "Algorithmus"],
  algorithmus: ["fmmviolet", "Algorithmus"],
};
const ALIAS = {
  proof: "beweis",
  step: "schritt",
  question: "frage",
  numquestion: "zahlfrage",
  deepdive: "vertiefung",
  interactive: "interaktiv",
  source: "quelle",
  c: "k",
};

/** Reine Textform eines Knotenbaums (fuer Labels und Ueberschriften). */
function plain(n) {
  if (!n) return "";
  if (n.type === "text" || n.type === "inlineCode") return n.value;
  if (n.type === "inlineMath") return n.value;
  if (Array.isArray(n)) return n.map(plain).join("");
  return (n.children ?? []).map(plain).join("");
}

/** Label aus :::satz[…] herausloesen (remark-directive legt es als 1. Absatz ab). */
function takeLabel(node) {
  const first = node.children?.[0];
  if (!first?.data?.directiveLabel) return null;
  node.children = node.children.slice(1);
  return plain(first).trim();
}

function inlineAll(nodes) {
  return (nodes ?? []).map(inline).join("");
}

/**
 * @-Verweise im Fliesstext (mdx/numbers.mjs): der Text kommt fertig aus der
 * Tabelle, das Ziel ist das \label der Umgebung/Gleichung/Ueberschrift.
 * Kapitel: \label{chap-<id>} (siehe Hauptlauf).
 */
function textWithRefs(value, raw) {
  const split = splitRefs(value, raw);
  if (!split) return escText(value);
  if (split.error) {
    warn("@-Verweis nicht zuordenbar", split.error);
    return escText(value);
  }
  return split.segments
    .map((seg) => {
      if (seg.text != null) return escText(seg.text);
      try {
        const r = resolveRef(numbers, seg.ref.type, seg.ref.id, { chapterId: currentChapterId });
        return `\\hyperref[${r.anchor}]{${esc(r.text)}}`;
      } catch (e) {
        warn("unbekannter @-Verweis", e.message);
        return esc(seg.raw);
      }
    })
    .join("");
}

function rawOf(n) {
  const a = n.position?.start?.offset;
  const b = n.position?.end?.offset;
  return a == null || b == null || !currentSource ? null : currentSource.slice(a, b);
}

function inline(n) {
  switch (n.type) {
    case "text":
      return textWithRefs(n.value, rawOf(n));
    case "inlineMath":
      return `$${n.value}$`;
    case "emphasis":
      return `\\emph{${inlineAll(n.children)}}`;
    case "strong":
      return `\\textbf{${inlineAll(n.children)}}`;
    case "delete":
      return inlineAll(n.children);
    case "inlineCode":
      return `\\texttt{${esc(n.value)}}`;
    case "break":
      return "\\newline{}\n";
    case "link":
      return link(n);
    case "textDirective":
      return textDirective(n);
    case "mdxTextExpression":
      return mdxExpression(n, false);
    case "mdxJsxTextElement":
      return jsxElement(n, false);
    case "image":
      warn("Bild uebersprungen", n.url);
      return "";
    case "footnoteReference":
      warn("Fussnotenreferenz uebersprungen");
      return "";
    default:
      warn(`unbekannter Inline-Knoten: ${n.type}`);
      return esc(plain(n));
  }
}

function link(n) {
  const text = inlineAll(n.children);
  const url = String(n.url ?? "");
  if (/^https?:/.test(url)) {
    return `\\href{${url.replace(/([%#\\])/g, "\\$1")}}{${text}}`;
  }
  // In-App-Links: "#sec-3.2", "?k=06-svd#sec-6.4", "?k=05-lgs"
  const hash = url.includes("#") ? url.slice(url.indexOf("#") + 1) : null;
  if (hash) return `\\hyperref[${hash}]{${text}}`;
  const chap = /^\?k=([\w-]+)$/.exec(url);
  if (chap) return `\\hyperref[chap-${chap[1]}]{${text}}`;
  warn("Link ohne verwertbares Ziel", url);
  return text;
}

function textDirective(n) {
  const name = ALIAS[n.name] ?? n.name;
  if (name === "k") return inlineAll(n.children); // Tooltip-Begriff: im Druck normaler Text
  warn(`unbekannte Inline-Direktive: :${n.name}`);
  return inlineAll(n.children);
}

function mdxExpression(n, flow) {
  const program = n.data?.estree;
  if (program?.body?.length === 0) return ""; // reiner Kommentar
  const body = program?.body?.[0];
  if (body?.type === "ExpressionStatement" && body.expression?.type === "Literal") {
    return esc(String(body.expression.value));
  }
  warn(`Ausdruck im ${flow ? "Block" : "Text"} uebersprungen`, String(n.value).slice(0, 50));
  return "";
}

/* ------------------------------------------------------------------ */
/* Bloecke                                                             */
/* ------------------------------------------------------------------ */

/**
 * Knoten, die im mdast als INLINE gelten. In <li>…</li> und <p>…</p> stehen
 * sie direkt unter dem JSX-Element, ohne dazwischenliegenden Absatz — sie
 * einzeln durch block() zu schicken zerrisse den Satz in Absaetze.
 */
const INLINE_TYPES = new Set([
  "text",
  "inlineMath",
  "emphasis",
  "strong",
  "delete",
  "inlineCode",
  "break",
  "link",
  "textDirective",
  "mdxTextExpression",
  "mdxJsxTextElement",
  "image",
  "footnoteReference",
]);

function blocks(nodes) {
  const out = [];
  let run = [];
  const flush = () => {
    if (!run.length) return;
    const s = inlineAll(run);
    if (s.trim()) out.push(s);
    run = [];
  };
  for (const n of nodes ?? []) {
    if (INLINE_TYPES.has(n.type)) {
      run.push(n);
      continue;
    }
    flush();
    const s = block(n);
    if (s !== null && String(s).trim() !== "") out.push(s);
  }
  flush();
  return out.join("\n\n");
}

function block(n) {
  switch (n.type) {
    case "paragraph":
      return inlineAll(n.children);
    case "heading":
      return heading(n);
    case "math": {
      const { tag, anchor } = eqTag(n);
      return displayMath(n.value, tag, anchor);
    }
    case "list":
      return list(n);
    case "code":
      return `\\begin{lstlisting}\n${n.value}\n\\end{lstlisting}`;
    case "blockquote":
      return `\\begin{quote}\n${blocks(n.children)}\n\\end{quote}`;
    case "thematicBreak":
      return "\\par\\vspace{4pt}\\hrule\\vspace{4pt}\\par";
    case "table":
      return table(n);
    case "containerDirective":
      return containerDirective(n);
    case "leafDirective":
      return leafDirective(n);
    case "mdxjsEsm":
      return ""; // Importe der Widgets — im Druck gegenstandslos
    case "mdxFlowExpression":
      return mdxExpression(n, true);
    case "mdxJsxFlowElement":
      return jsxElement(n, true);
    case "definition":
      return "";
    default:
      warn(`unbekannter Block-Knoten: ${n.type}`);
      return esc(plain(n));
  }
}

/** Gleichung: Handnummer direkt, ID-Nummer aus der Tabelle → { tag, anchor }. */
function eqTag(n) {
  const p = parseEqMeta(n.meta);
  if (!p) return { tag: null, anchor: null };
  if (p.error) {
    warn("unverstaendliche Gleichungsangabe", n.meta);
    return { tag: null, anchor: null };
  }
  if (p.legacy) return { tag: p.id, anchor: `eq-${p.id}` };
  const entry = numbers.eqs?.[p.id];
  if (!entry || entry.legacy) {
    warn("Gleichungs-ID nicht in der Nummerntabelle", p.id);
    return { tag: null, anchor: null };
  }
  return { tag: entry.num, anchor: entry.anchor };
}

/**
 * `explicitId` kommt von <h3 id="sec-7.1-geometrie">: die einzige
 * Sprungmarke im Skript, die nicht aus einer Abschnittsnummer entsteht.
 * Ohne sie bliebe genau ein Querverweis im PDF ins Leere zeigen.
 */
function heading(n, explicitId = null) {
  const level = n.depth >= 4 ? "subsubsection" : "subsection";
  // ID-Form `### Titel :id[slug]`: Nummer aus der Tabelle, \label{sec-slug}
  // (<h3 id="…">-JSX kommt ohne mdast-Typ herein: dort nur die Handnummer erkennen)
  const legacyNum = /^(\d+(?:\.\d+)*)\b/.exec(plain(n).trim());
  const h = n.type === "heading" ? takeHeadingId(n, plain) : legacyNum ? { legacy: legacyNum[1] } : {};
  if (h.error) warn("Ueberschrift", h.error);
  let num = h.legacy ?? null;
  const ids = [];
  if (h.id) {
    const entry = numbers.subs?.[h.id];
    if (!entry || entry.legacy) warn("Ueberschriften-ID nicht in der Nummerntabelle", h.id);
    else {
      num = entry.num;
      ids.push(entry.anchor);
      n.children = [{ type: "text", value: `${entry.num} ` }, ...(n.children ?? [])];
    }
  } else if (num) ids.push(`sec-${num}`);
  const body = inlineAll(n.children);
  if (explicitId && !ids.includes(explicitId)) ids.push(explicitId);
  const anchor = ids.length ? `\\phantomsection${ids.map((i) => `\\label{${i}}`).join("")}` : "";
  const toc = num ? `\\addcontentsline{toc}{subsection}{${body}}` : "";
  return `${anchor}\\${level}*{${body}}${toc}`;
}

function list(n) {
  const env = n.ordered ? "enumerate" : "itemize";
  const start = n.ordered && n.start && n.start !== 1 ? `[start=${n.start}]` : "";
  const items = (n.children ?? [])
    .map((li) => `\\item ${blocks(li.children).replace(/^\s+/, "")}`)
    .join("\n\n");
  return `\\begin{${env}}${start}\n${items}\n\\end{${env}}`;
}

/**
 * Grobe Schaetzung der GESETZTEN Zellenbreite. Die Quelllaenge taugt nicht:
 * `$\left\|\bA\right\|_F^2$` sind 24 Zeichen Quelltext und vier Zeichen Satz.
 */
function visualLen(s) {
  return String(s)
    .replace(/\\[a-zA-Z]+\s*/g, "x")
    .replace(/[{}$&\\]/g, "")
    .length;
}

/** Laengstes nicht umbrechbares Wort einer Zelle (in geschaetzten Zeichen). */
function longestWord(s) {
  return Math.max(
    0,
    ...String(s)
      .split(/\s+/)
      .map((w) => visualLen(w))
  );
}

/**
 * X-Spalten nach Inhaltsmenge gewichten; die Faktoren summieren zu ncol.
 *
 * Rein proportional reicht nicht: eine Spalte aus lauter "3.1" bekommt dann
 * zwar zu Recht wenig Platz, aber eine Spalte mit "Operatornormen" auch —
 * und ein Wort ohne Leerzeichen, das nicht in seine Spalte passt, LAEUFT IN
 * DIE NACHBARSPALTE ("Operatornormemaximale Streckung"). Jede Spalte bekommt
 * deshalb zuerst die Breite ihres laengsten Wortes, und erst der Rest wird
 * proportional zur Textmenge verteilt.
 */
const TABLE_WIDTH_PT = 408; // \linewidth im Satzspiegel
const CHAR_PT = 4.6; // grobe Mittelbreite bei \small

function weightedSpec(cells, ncol) {
  const bulk = Array.from({ length: ncol }, (_, i) =>
    Math.max(1, ...cells.map((r) => visualLen(r[i] ?? "")))
  );
  // Mindestbreite in Gewichtseinheiten (1 Einheit = TABLE_WIDTH_PT / ncol).
  const mins = Array.from({ length: ncol }, (_, i) => {
    const word = Math.max(1, ...cells.map((r) => longestWord(r[i] ?? "")));
    return (word * CHAR_PT * ncol) / TABLE_WIDTH_PT;
  });
  const minSum = mins.reduce((a, b) => a + b, 0);
  let w;
  if (minSum >= ncol) {
    // Selbst die laengsten Woerter passen zusammen nicht — dann eben
    // anteilig kuerzen; TeX bricht danach, was zu brechen ist.
    w = mins.map((m) => (m * ncol) / minSum);
  } else {
    const rest = ncol - minSum;
    const bulkSum = bulk.reduce((a, b) => a + b, 0);
    w = mins.map((m, i) => m + (bulk[i] / bulkSum) * rest);
  }
  return w.map((x) => `W{${x.toFixed(3)}}`).join(" ");
}

function table(n) {
  const rows = (n.children ?? []).map((r) => (r.children ?? []).map((c) => inlineAll(c.children)));
  if (!rows.length) return "";
  const ncol = Math.max(...rows.map((r) => r.length));
  const align = (n.align ?? []).map((a) => ({ left: "l", right: "r", center: "c" }[a] ?? "l"));
  const longest = Math.max(...rows.flat().map((c) => visualLen(c)));
  // Kurze Zellen: klassisches tabular (sonst zerrt tabularx die Spalten
  // auf Textbreite auseinander). Lange Zellen muessen umbrechen koennen.
  const wide = longest > 45;
  const spec = wide
    ? weightedSpec(rows, ncol)
    : Array.from({ length: ncol }, (_, i) => align[i] ?? "l").join(" ");
  const pad = (r) => [...r, ...Array(ncol - r.length).fill("")];
  const head = pad(rows[0]).map((c) => `\\textbf{${c}}`).join(" & ");
  const bodyRows = rows.slice(1).map((r) => pad(r).join(" & ")).join(" \\\\\n");
  const inner =
    `\\toprule\n${head} \\\\\n\\midrule\n${bodyRows}${bodyRows ? " \\\\\n" : ""}\\bottomrule`;
  const tbl = wide
    ? `\\begin{tabularx}{\\linewidth}{@{}${spec}@{}}\n${inner}\n\\end{tabularx}`
    : `\\begin{tabular}{@{}${spec}@{}}\n${inner}\n\\end{tabular}`;
  return `\\par\\medskip\\noindent{\\small\\setlength{\\tabcolsep}{5pt}\n${tbl}}\\par\\medskip`;
}

/* ------------------------------------------------------------------ */
/* Direktiven                                                          */
/* ------------------------------------------------------------------ */

function containerDirective(n) {
  const name = ALIAS[n.name] ?? n.name;
  const a = n.attributes ?? {};

  if (ENV_STYLE[name]) {
    const [color, kind] = ENV_STYLE[name];
    const raw = takeLabel(n) ?? a.label ?? "";
    const p = parseEnvLabel(raw);
    let label = raw;
    let anchor = "";
    if (p.form === "id") {
      const entry = numbers.envs?.[p.id];
      if (!entry || entry.legacy) warn("Env-ID nicht in der Nummerntabelle", p.id);
      else {
        label = entry.label;
        anchor = `[${entry.anchor}]`; // optionales Argument von fmmenv: \phantomsection\label
      }
    } else if (p.form === "unnumbered") label = p.name;
    return `\\begin{fmmenv}${anchor}{${color}}{${kind}}{${esc(label)}}\n${blocks(n.children)}\n\\end{fmmenv}`;
  }

  if (name === "vertiefung") {
    const title = takeLabel(n) ?? a.title ?? "";
    return `\\begin{fmmvertiefung}{${esc(title)}}\n${blocks(n.children)}\n\\end{fmmvertiefung}`;
  }

  if (name === "interaktiv") {
    const title = takeLabel(n) ?? a.title ?? "";
    return `\\begin{fmminteraktiv}{${esc(title)}}\n${blocks(n.children)}\n\\end{fmminteraktiv}`;
  }

  if (name === "beweis") {
    const noqed = "ohne-qed" in a || "no-qed" in a;
    const steps = (n.children ?? [])
      .filter((c) => c.type === "containerDirective" && (ALIAS[c.name] ?? c.name) === "schritt")
      .map(step)
      .join("\n\n");
    return `\\begin{fmmproof}[${noqed ? "noqed" : "qed"}]\n${steps}\n\\end{fmmproof}`;
  }

  if (name === "schritt") return step(n); // nur defensiv; normal via beweis

  if (name === "quiz") {
    const items = (n.children ?? [])
      .filter((c) => c.type === "containerDirective")
      .map(quizItem)
      .join("\n\n");
    return `\\begin{fmmquiz}\n${items}\n\\end{fmmquiz}`;
  }

  warn(`unbekannte Container-Direktive: :::${n.name}`);
  return blocks(n.children);
}

function step(n) {
  const why = (n.children ?? []).find(
    (c) => c.type === "leafDirective" && (ALIAS[c.name] ?? c.name) === "why"
  );
  const rest = (n.children ?? []).filter((c) => c !== why);
  const whyTex = why ? `\n\\fmmwhy{${inlineAll(why.children)}}` : "";
  return `\\item ${blocks(rest)}${whyTex}`;
}

function quizItem(n) {
  const name = ALIAS[n.name] ?? n.name;
  const a = n.attributes ?? {};
  const kids = (n.children ?? []).filter((c) => plain(c).trim() !== "" || c.type === "math");
  const statement = kids.length ? blocks([kids[0]]) : "";
  const explanation = kids.length > 1 ? blocks(kids.slice(1)) : "";

  if (name === "frage") {
    const wahr = "wahr" in a || "true" in a;
    const verdict = wahr ? "Wahr" : "Falsch";
    return `\\item ${statement}\n\\fmmantwort{${verdict}}\n${explanation}`;
  }
  if (name === "zahlfrage") {
    const num = String(a.loesung ?? "").trim();
    const unit = a.einheit ? ` ${esc(a.einheit)}` : "";
    return `\\item ${statement}\n\\fmmloesung{$${num.replace(/,/g, "{,}")}$${unit}}\n${explanation}`;
  }
  warn(`unbekannte Quiz-Direktive: :::${n.name}`);
  return `\\item ${blocks(n.children)}`;
}

function leafDirective(n) {
  const name = ALIAS[n.name] ?? n.name;
  if (name === "quelle") return `\\fmmquelle{${inlineAll(n.children)}}`;
  if (name === "why") return `\\fmmwhy{${inlineAll(n.children)}}`;
  warn(`unbekannte Leaf-Direktive: ::${n.name}`);
  return inlineAll(n.children);
}

/* ------------------------------------------------------------------ */
/* JSX-Elemente im Fliesstext                                          */
/* ------------------------------------------------------------------ */

const PASS_THROUGH = new Set(["div", "span", "section", "article", "figure", "p"]);
const HTML_INLINE = {
  em: "\\emph",
  i: "\\emph",
  strong: "\\textbf",
  b: "\\textbf",
  code: "\\texttt",
  sub: "\\textsubscript",
  sup: "\\textsuperscript",
  mark: "\\text",
};

function attrOf(n, name) {
  const a = (n.attributes ?? []).find((x) => x.type === "mdxJsxAttribute" && x.name === name);
  if (!a) return null;
  if (typeof a.value === "string") return { kind: "string", value: a.value };
  if (a.value?.type === "mdxJsxAttributeValueExpression")
    return { kind: "expr", value: a.value.value };
  return null;
}

function attrLatex(n, name) {
  const a = attrOf(n, name);
  if (!a) return null;
  return a.kind === "string" ? esc(a.value) : jsxSourceToLatex(a.value);
}

function jsxElement(n, flow) {
  const name = n.name;
  if (!name) return flow ? blocks(n.children) : inlineAll(n.children); // Fragment

  if (name === "M") return `$${jsxRawChild(n)}$`;
  if (name === "MD" || name === "Eq") return displayMath(jsxRawChild(n), null);

  if (HTML_INLINE[name]) return `${HTML_INLINE[name]}{${inlineAll(n.children)}}`;
  if (name === "br") return "\\newline{}\n";
  if (name === "hr") return "\\par\\vspace{4pt}\\hrule\\vspace{4pt}\\par";
  if (name === "a") {
    const href = attrOf(n, "href");
    return link({ url: href?.value ?? "", children: n.children });
  }

  if (/^h[1-6]$/.test(name)) {
    const depth = Number(name[1]);
    return heading({ depth, children: n.children }, attrOf(n, "id")?.value ?? null);
  }

  if (name === "ol" || name === "ul") return htmlList(n);
  if (name === "li") return blocks(n.children);
  if (name === "table") return htmlTable(n);

  if (name === "details") return detailsBlock(n);
  if (name === "summary") return ""; // vom umgebenden <details> behandelt

  if (name === "SelfTest") return blocks(n.children);
  if (name === "SelbsttestFrage") return selbsttestFrage(n);
  if (name === "Schaetzfrage") return schaetzfrage(n);

  if (PASS_THROUGH.has(name)) return flow ? blocks(n.children) : inlineAll(n.children);

  // Alles Uebrige ist ein interaktives Widget.
  if (/^[A-Z]/.test(name)) {
    widgetNames.set(name, (widgetNames.get(name) ?? 0) + 1);
    return `\\fmmwidget{${esc(humanWidget(name))}}`;
  }

  warn(`unbekanntes HTML-Element: <${name}>`);
  return flow ? blocks(n.children) : inlineAll(n.children);
}

function jsxRawChild(n) {
  for (const c of n.children ?? []) {
    if (c.type === "mdxTextExpression" || c.type === "mdxFlowExpression") {
      const b = c.data?.estree?.body?.[0];
      if (b?.type === "ExpressionStatement" && b.expression?.type === "Literal")
        return String(b.expression.value);
      if (b?.type === "ExpressionStatement" && b.expression?.type === "TemplateLiteral")
        return b.expression.quasis.map((q) => q.value.cooked).join("");
    }
    if (c.type === "text" && c.value.trim()) return c.value;
  }
  return "";
}

/** "SvdGeometrieExplorer" -> "Svd Geometrie Explorer" (lesbarer Platzhalter). */
function humanWidget(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim();
}

/**
 * MDX legt um Inline-JSX, das auf eigenen Zeilen steht, einen `paragraph`:
 * die <td> eines <tr> haengen deshalb nicht direkt am <tr>. Ohne dieses
 * Auspacken findet der Tabellenbau ZEILEN, aber keine ZELLEN — und erzeugt
 * still eine Tabelle ohne Spalten.
 */
function unwrapChildren(node) {
  const out = [];
  for (const c of node?.children ?? []) {
    if (c.type === "paragraph") out.push(...(c.children ?? []));
    else out.push(c);
  }
  return out;
}

const isJsx = (c) => c.type === "mdxJsxFlowElement" || c.type === "mdxJsxTextElement";

function htmlList(n) {
  const env = n.name === "ol" ? "enumerate" : "itemize";
  const items = unwrapChildren(n)
    .filter(isJsx)
    .map((c) => {
      // <li> und die Selbsttest-Komponenten sind hier gleichwertige Punkte.
      const body = c.name === "li" ? blocks(c.children) : block(c);
      return `\\item ${String(body).replace(/^\s+/, "")}`;
    })
    .join("\n\n");
  if (!items.trim()) return blocks(n.children);
  return `\\begin{${env}}\n${items}\n\\end{${env}}`;
}

function htmlTable(n) {
  const rows = [];
  const collect = (node) => {
    for (const c of unwrapChildren(node)) {
      if (!isJsx(c)) continue;
      if (c.name === "tr") rows.push(unwrapChildren(c).filter((x) => x.name === "td" || x.name === "th"));
      else collect(c);
    }
  };
  collect(n);
  if (!rows.length || rows.every((r) => r.length === 0)) {
    warn("HTML-Tabelle ohne erkennbare Zellen");
    return blocks(n.children);
  }
  const cells = rows.map((r) => r.map((c) => inlineAll(c.children)));
  const ncol = Math.max(...cells.map((r) => r.length));
  const longest = Math.max(...cells.flat().map((c) => visualLen(c)));
  const wide = longest > 45;
  const spec = wide
    ? weightedSpec(cells, ncol)
    : Array.from({ length: ncol }, () => "l").join(" ");
  const isHead = rows[0].every((c) => c.name === "th");
  const pad = (r) => [...r, ...Array(ncol - r.length).fill("")];
  const head = isHead ? pad(cells[0]).map((c) => `\\textbf{${c}}`).join(" & ") : null;
  const rest = (head ? cells.slice(1) : cells).map((r) => pad(r).join(" & ")).join(" \\\\\n");
  const inner =
    `\\toprule\n${head ? `${head} \\\\\n\\midrule\n` : ""}${rest}${rest ? " \\\\\n" : ""}\\bottomrule`;
  const tbl = wide
    ? `\\begin{tabularx}{\\linewidth}{@{}${spec}@{}}\n${inner}\n\\end{tabularx}`
    : `\\begin{tabular}{@{}${spec}@{}}\n${inner}\n\\end{tabular}`;
  return `\\par\\medskip\\noindent{\\small\\setlength{\\tabcolsep}{5pt}\n${tbl}}\\par\\medskip`;
}

function detailsBlock(n) {
  const summaryNode = (n.children ?? []).find((c) => c.name === "summary");
  const summary = summaryNode ? inlineAll(summaryNode.children) : "Lösung";
  const rest = (n.children ?? []).filter((c) => c !== summaryNode);
  return `\\fmmreveal{${summary}}\n${blocks(rest)}`;
}

function selbsttestFrage(n) {
  const q = attrLatex(n, "q") ?? "";
  return `\\textbf{${q}}\n\n${blocks(n.children)}`;
}

function schaetzfrage(n) {
  const frage = attrLatex(n, "frage") ?? "";
  const verdeckt = attrLatex(n, "verdeckt");
  const loesung = attrOf(n, "loesung");
  const einheit = attrOf(n, "einheit");
  const parts = [`\\textbf{\\sffamily Schätzfrage.} ${frage}`];
  // Kinder sind das Widget selbst — im Druck bleibt die Frage samt Antwort.
  const kids = blocks((n.children ?? []).filter((c) => !/^[A-Z]/.test(c.name ?? "")));
  if (kids.trim()) parts.push(kids);
  if (loesung) {
    const v = String(loesung.value).replace(/[{}]/g, "").trim().replace(/\./g, "{,}");
    const u = einheit ? ` ${esc(einheit.value)}` : "";
    parts.push(`\\fmmloesung{$${v}$${u}}`);
  }
  if (verdeckt) parts.push(verdeckt);
  return parts.join("\n\n");
}

/* =================================================================== */
/* Kapitel- und Abschnittsregistry: scripts/lib/registry.mjs               */
/* =================================================================== */

/* =================================================================== */
/* Hauptlauf                                                           */
/* =================================================================== */

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkMdx);

let currentSource = null;
function convertFile(path) {
  const src = readFileSync(path, "utf8");
  currentSource = src;
  const tree = processor.parse(src);
  for (const e of mergeRefDirectives(tree, visit)) warn("@-Verweis", e.message);
  resetQuotes();
  const out = blocks(tree.children);
  currentSource = null;
  return out;
}

const chapters = readChapters(root);
const body = [];
let sectionCount = 0;

for (const ch of chapters) {
  const sections = readSections(root, ch);
  currentChapterId = ch.id;
  body.push(`\n\n%% ================= Kapitel ${ch.num}: ${ch.title} =================`);
  body.push(`\\chapter{${esc(ch.title)}}`);
  body.push(`\\phantomsection\\label{chap-${ch.id}}`);
  for (const s of sections) {
    currentFile = `${ch.id}/${s.file}`;
    sectionCount++;
    // Nummer aus der Position (s.num), nicht aus der alten id
    const title = `${s.num} ${s.title}`;
    body.push(`\\phantomsection\\label{sec-${s.num}}`);
    body.push(`\\section*{${esc(title)}}`);
    body.push(`\\addcontentsline{toc}{section}{${esc(title)}}`);
    body.push(`\\markright{${esc(title)}}`);
    body.push(convertFile(join(chaptersDir, ch.id, s.file)));
  }
}

/* ---- Ausgabe ------------------------------------------------------ */

mkdirSync(outDir, { recursive: true });

// defs-fmm.tex liegt im Elternrepo (fmm-lmu); dieselbe Kopplung wie in
// scripts/gen-macros.mjs. Ohne die Datei ist kein Makro definiert.
const defsCandidates = [
  join(root, "..", "slides", "defs-fmm.tex"),
  join(root, "scripts", "pdf", "defs-fmm.tex"),
];
const defs = defsCandidates.find((p) => existsSync(p));
if (!defs) throw new Error(`defs-fmm.tex nicht gefunden (gesucht: ${defsCandidates.join(", ")})`);
writeFileSync(join(outDir, "defs-fmm.tex"), readFileSync(defs, "utf8"));
writeFileSync(
  join(outDir, "preamble.tex"),
  readFileSync(join(root, "scripts", "pdf", "preamble.tex"), "utf8")
);

const doc = `% GENERIERT von scripts/pdf/mdx-to-latex.mjs — nicht von Hand bearbeiten.
\\documentclass[11pt,a4paper,twoside,openright]{book}
\\input{preamble.tex}

\\begin{document}

\\begin{titlepage}
\\centering
\\vspace*{5cm}
{\\sffamily\\bfseries\\Huge Fortgeschrittene mathematische\\\\[4pt] Methoden in der Statistik\\par}
\\vspace{10pt}
{\\sffamily\\Large\\color{fmmslate} Skript zur Vorlesung\\par}
\\vspace{28pt}
{\\large Fabian Scheipl\\par}
\\vspace{6pt}
{\\color{fmmgray} Institut für Statistik, LMU München\\par}
\\vfill
{\\small\\color{fmmgray} Druckfassung ohne die interaktiven Elemente der Web-Ausgabe.\\par}
\\end{titlepage}

\\frontmatter
\\pagestyle{plain}
\\tableofcontents

\\mainmatter
\\pagestyle{fancy}
${body.join("\n\n")}

\\end{document}
`;

const texPath = join(outDir, "fmm-skript.tex");
writeFileSync(texPath, doc);

/* ---- Bericht ------------------------------------------------------ */

console.log(`Kapitel: ${chapters.length}, Abschnitte: ${sectionCount}`);
console.log(`geschrieben: ${texPath} (${(doc.length / 1024).toFixed(0)} kB)`);

if (widgetNames.size) {
  const total = [...widgetNames.values()].reduce((a, b) => a + b, 0);
  console.log(`Widgets als Platzhalter: ${total} Vorkommen, ${widgetNames.size} verschiedene`);
}

if (warnings.length) {
  const grouped = new Map();
  for (const w of warnings) {
    const key = w.replace(/ — .*/, "");
    grouped.set(key, (grouped.get(key) ?? 0) + 1);
  }
  console.log(`\nWarnungen (${warnings.length}):`);
  for (const [k, n] of [...grouped].sort((a, b) => b[1] - a[1]).slice(0, 40))
    console.log(`  ${n}x  ${k}`);
  if (strict) {
    console.error("\n--strict: Abbruch wegen Warnungen.");
    process.exit(1);
  }
} else {
  console.log("keine Warnungen.");
}
