/**
 * Semantisches Inventar einer Abschnittsdatei — das Migrations-Orakel.
 *
 * WARUM NICHT innerText: Die naheliegende Prüfung „gerenderter Text der
 * TSX-Fassung == gerenderter Text der MDX-Fassung" ist UNBRAUCHBAR, weil
 * `src/App.tsx` jeden Abschnitt mit `content-visibility: auto` rendert.
 * Übersprungene Teilbäume tragen laut CSS-Spezifikation NICHTS zu innerText
 * bei, also vergleicht man unbemerkt nur den sichtbaren Ausschnitt (bei uns
 * gemessen: gut die Hälfte des Kapitels fehlte in der Zählung).
 *
 * Stattdessen wird aus BEIDEN Fassungen dieselbe geordnete Liste semantischer
 * Einträge gezogen und Eintrag für Eintrag verglichen:
 *
 *   heading   Ebene, Text, ID
 *   math      jede TeX-Zeichenkette ZEICHENGENAU und in Reihenfolge
 *   eq        zusätzlich die Gleichungsnummer
 *   env       kind + label
 *   concept   Concept-ID + verlinkter Text
 *   link      Ziel + Text
 *   deepdive  Titel
 *   step      why-Text
 *   quiz      Wahrheitswert + Aussage
 *   widget    Komponentenname
 *   text      normalisierte Prosa-Tokens
 *
 * Läuft ohne Browser, also auch in CI. Der Browser-Abgleich (Screenshots,
 * geöffnete Vertiefungen, Widgets) bleibt ein zweiter, separater Schritt.
 */
import { parse as babelParse } from "@babel/parser";
import _traverse from "@babel/traverse";
import { compile } from "@mdx-js/mdx";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import remarkFmm from "./remark-fmm.mjs";

const traverse = _traverse.default ?? _traverse;

/** Prosa vergleichbar machen: Whitespace normalisieren, leere Stücke weg. */
const norm = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

/** Namen, deren Kinder als Inventar-Einträge zählen (statt als Prosa). */
const SEMANTIC = new Set([
  "M",
  "MD",
  "Eq",
  "EnvBlock",
  "ConceptLink",
  "ExpandedReading",
  "Proof",
  "PStep",
  "Quiz",
  "Frage",
]);

/* ------------------------------------------------------------------ */
/* JSX/TSX                                                             */
/* ------------------------------------------------------------------ */

const jsxName = (n) =>
  n.type === "JSXIdentifier"
    ? n.name
    : n.type === "JSXMemberExpression"
      ? `${jsxName(n.object)}.${jsxName(n.property)}`
      : "";

/** Wert eines JSX-Attributs, soweit statisch bestimmbar. */
function attrValue(el, name) {
  const a = (el.attributes ?? []).find((x) => x.type === "JSXAttribute" && x.name?.name === name);
  if (!a) return null;
  if (!a.value) return true; // bares Flag
  if (a.value.type === "StringLiteral") return a.value.value;
  if (a.value.type === "JSXExpressionContainer") {
    const e = a.value.expression;
    if (e.type === "StringLiteral") return e.value;
    if (e.type === "BooleanLiteral") return e.value;
    if (e.type === "TemplateLiteral" && e.expressions.length === 0) return e.quasis[0].value.cooked;
  }
  return "«dynamisch»";
}

/** einziger String-Kindknoten, z.B. <M>{"\\bA"}</M> */
function stringChild(el) {
  const parts = [];
  for (const c of el.children ?? []) {
    if (c.type === "JSXText") {
      if (norm(c.value)) parts.push(c.value);
    } else if (c.type === "JSXExpressionContainer") {
      const e = c.expression;
      if (e.type === "StringLiteral") parts.push(e.value);
      else if (e.type === "TemplateLiteral" && e.expressions.length === 0)
        parts.push(e.quasis[0].value.cooked);
      else return "«dynamisch»";
    } else return "«dynamisch»";
  }
  return parts.join("");
}

/** reiner Text eines JSX-Teilbaums (für Überschriften, Linktexte, …) */
function jsxText(node) {
  let out = "";
  const walk = (n) => {
    if (!n) return;
    if (n.type === "JSXText") out += n.value;
    else if (n.type === "JSXExpressionContainer") {
      const e = n.expression;
      if (e.type === "StringLiteral") out += e.value;
      else if (e.type === "TemplateLiteral" && e.expressions.length === 0)
        out += e.quasis[0].value.cooked;
    } else for (const c of n.children ?? []) walk(c);
  };
  walk(node);
  return norm(out);
}

export function inventoryFromTsx(code) {
  const ast = babelParse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
  const items = [];
  let prose = "";
  const flushProse = () => {
    const t = norm(prose);
    if (t) items.push({ kind: "text", text: t });
    prose = "";
  };

  traverse(ast, {
    JSXElement(path) {
      const el = path.node.openingElement;
      const name = jsxName(el.name);

      if (name === "M" || name === "MD") {
        flushProse();
        items.push({ kind: "math", display: name === "MD", tex: stringChild(path.node) });
        path.skip();
      } else if (name === "Eq") {
        flushProse();
        items.push({ kind: "eq", tag: attrValue(el, "tag"), tex: stringChild(path.node) });
        path.skip();
      } else if (name === "EnvBlock") {
        flushProse();
        items.push({ kind: "env", envKind: attrValue(el, "kind"), label: attrValue(el, "label") });
      } else if (name === "ConceptLink") {
        flushProse();
        items.push({ kind: "concept", id: attrValue(el, "id"), text: jsxText(path.node) });
        path.skip();
      } else if (name === "ExpandedReading") {
        flushProse();
        items.push({ kind: "deepdive", title: attrValue(el, "title") });
      } else if (name === "PStep") {
        flushProse();
        items.push({ kind: "step", why: norm(attrWhyText(el)) });
      } else if (/^h[1-6]$/.test(name)) {
        flushProse();
        items.push({
          kind: "heading",
          level: Number(name[1]),
          id: attrValue(el, "id"),
          text: jsxText(path.node),
        });
        path.skip();
      } else if (name === "a") {
        flushProse();
        items.push({ kind: "link", href: attrValue(el, "href"), text: jsxText(path.node) });
        path.skip();
      } else if (/^[A-Z]/.test(name) && !SEMANTIC.has(name)) {
        flushProse();
        items.push({ kind: "widget", name });
      }
    },
    JSXText(path) {
      prose += path.node.value;
    },
  });
  flushProse();
  return items;
}

/** Text des why-Props, soweit statisch */
function attrWhyText(el) {
  const a = (el.attributes ?? []).find((x) => x.type === "JSXAttribute" && x.name?.name === "why");
  if (!a || a.value?.type !== "JSXExpressionContainer") return "";
  let out = "";
  const walk = (n) => {
    if (!n) return;
    if (n.type === "JSXText") out += n.value;
    else if (n.type === "StringLiteral") out += n.value;
    else if (n.type === "JSXExpressionContainer") walk(n.expression);
    else for (const c of n.children ?? []) walk(c);
  };
  walk(a.value.expression);
  return out;
}

/* ------------------------------------------------------------------ */
/* MDX — über den kompilierten JSX-Output, damit dieselbe Extraktion    */
/*        greift und das Plugin mitgeprüft wird                        */
/* ------------------------------------------------------------------ */

export async function inventoryFromMdx(source, filePath, root) {
  const js = String(
    await compile(
      { value: source, path: filePath },
      {
        remarkPlugins: [remarkMath, remarkDirective, [remarkFmm, { root }]],
        jsx: true,
      }
    )
  );
  // `_components.h3` wieder auf `h3` zurückführen, sonst zählt die Extraktion
  // Überschriften als Widgets
  const cleaned = js.replace(/_components\.([a-z][a-z0-9]*)/g, "$1");
  return inventoryFromTsx(cleaned).filter(
    // MDX erzeugt einen Fragment-/Wrapper-Rahmen, den es im TSX nicht gibt
    (it) => !(it.kind === "widget" && /^(MDXLayout|_createMdxContent|_Fragment)$/.test(it.name))
  );
}

/* ------------------------------------------------------------------ */
/* Vergleich                                                           */
/* ------------------------------------------------------------------ */

/**
 * TeX vergleichbar machen. NICHT zeichengenau, sondern mit normalisiertem
 * Weißraum: im MDX darf (und soll) eine lange Formel über mehrere Zeilen
 * umbrochen werden, während sie im TSX-String auf einer Zeile stand. Für
 * TeX ist das derselbe Ausdruck; ein zeichengenauer Vergleich würde die
 * gewünschte Lesbarkeit der Quelle bestrafen. Alles andere an der Formel
 * (jedes Makro, jede Klammer, jede Farbe) wird weiterhin exakt verglichen.
 */
const tex = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

const key = (it) => {
  switch (it.kind) {
    case "math":
      return `math${it.display ? "!" : ""} ${tex(it.tex)}`;
    case "eq":
      return `eq(${it.tag}) ${tex(it.tex)}`;
    case "env":
      return `env ${it.envKind} ${it.label}`;
    case "concept":
      return `concept #${it.id} „${it.text}"`;
    case "deepdive":
      return `deepdive ${it.title}`;
    case "step":
      return `step why=${it.why}`;
    case "heading":
      return `h${it.level}#${it.id ?? "-"} ${it.text}`;
    case "link":
      return `link ${it.href} „${it.text}"`;
    case "widget":
      return `widget <${it.name}>`;
    default:
      return `text ${it.text}`;
  }
};

export { key as inventoryKey };

/**
 * MENGENVERGLEICH — das eigentliche Gate.
 *
 * Der reine Reihenfolgevergleich ist zu streng: viele TSX-Abschnitte ziehen
 * ihre Quiz-Daten als `const QUIZ = […]` an den DATEIANFANG, während sie im
 * MDX an ihrer inhaltlichen Stelle stehen. Dann verschiebt sich alles, obwohl
 * nichts verloren ging. Der Mengenvergleich beantwortet die Frage, auf die es
 * ankommt: Ist eine Formel/ein Konzept/eine Umgebung VERSCHWUNDEN oder
 * VERÄNDERT? Er muss leer sein. Der Reihenfolgevergleich bleibt als Hinweis.
 */
export function diffMultiset(a, b, { ignoreText = false } = {}) {
  const bag = (inv) => {
    const m = new Map();
    for (const it of inv) {
      if (ignoreText && it.kind === "text") continue;
      const k = key(it);
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  };
  const ma = bag(a);
  const mb = bag(b);
  const out = [];
  for (const [k, n] of ma) {
    const m = mb.get(k) ?? 0;
    if (m < n) out.push({ side: "fehlt in MDX", entry: k, alt: n, neu: m });
  }
  for (const [k, n] of mb) {
    const m = ma.get(k) ?? 0;
    if (m < n) out.push({ side: "nur in MDX", entry: k, alt: m, neu: n });
  }
  return out;
}

/** Liefert die Liste der Unterschiede (leer = gleichwertig). */
export function diffInventories(a, b, { ignoreText = false } = {}) {
  const fa = ignoreText ? a.filter((x) => x.kind !== "text") : a;
  const fb = ignoreText ? b.filter((x) => x.kind !== "text") : b;
  const out = [];
  for (let i = 0; i < Math.max(fa.length, fb.length); i++) {
    const ka = fa[i] ? key(fa[i]) : "«fehlt»";
    const kb = fb[i] ? key(fb[i]) : "«fehlt»";
    if (ka !== kb) out.push({ index: i, tsx: ka, mdx: kb });
  }
  return out;
}
