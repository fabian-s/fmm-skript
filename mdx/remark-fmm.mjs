/**
 * remark-fmm — die Autorenschicht des Skripts: Markdown + remark-math +
 * remark-directive werden auf die BESTEHENDEN Komponenten aus src/lib
 * abgebildet. Die Bibliothek bleibt unverändert.
 *
 *   $\bA^\top\bA$              -> <M>{"\\bA^\\top\\bA"}</M>
 *   $$ … $$                    -> <MD>{"…"}</MD>
 *   $$ {#eq-2.3} … $$          -> <Eq tag="2.3">{"…"}</Eq>
 *   :::satz[2.4 (Cauchy)] …    -> <EnvBlock kind="Satz" label="2.4 (Cauchy)">
 *   :k[die Spur]{#trace}       -> <ConceptLink id="trace">die Spur</ConceptLink>
 *   :::vertiefung[Titel] …     -> <ExpandedReading title="Titel">
 *   ::::beweis / :::schritt    -> <Proof> / <PStep why={…}>
 *   ::why[…]                   -> das why-Prop des umgebenden :::schritt
 *   ::::quiz / :::frage{wahr}  -> <Quiz> / <Frage wahr>
 *   ::quelle[…]                -> kleine graue Quellenzeile
 *   ### 2.2.1 Titel            -> <h3 id="sec-2.2.1">
 *
 * ENTWURFSPRINZIP (nach externem Review 2026-08-06): Dieses Plugin ist ein
 * STRIKTER SYNTAX-COMPILER und sonst nichts. Es legt insbesondere KEIN
 * Layout-<div> um das Dokument — die Seitentypografie kommt aus einem
 * Adapter (src/mdx/SectionBody bzw. ConceptBody), weil derselbe MDX-Inhalt
 * einmal auf hellem Seitenkörper und einmal in einem immer dunklen,
 * schmalen Tooltip-Fenster landet.
 *
 * Zweites Prinzip: lieber laut scheitern als still etwas Falsches erzeugen.
 * Jede Regel unten existiert, weil die Vorgängerfassung an dieser Stelle
 * grün durchkompiliert und dabei Inhalt verloren oder verfälscht hat.
 */
import path from "node:path";
import { visit } from "unist-util-visit";
import { Parser } from "acorn";
import acornJsx from "acorn-jsx";

const JsxParser = Parser.extend(acornJsx());

/** erlaubte kind-Werte von <EnvBlock> (siehe src/lib/Math.tsx) */
const ENV = {
  definition: "Definition",
  theorem: "Theorem",
  satz: "Satz",
  lemma: "Lemma",
  korollar: "Korollar",
  example: "Example",
  beispiel: "Beispiel",
  remark: "Remark",
  bemerkung: "Bemerkung",
  algorithmus: "Algorithmus",
};

/** Komponenten, die das Plugin selbst aus src/lib holt */
const LIB = [
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
];

/** erlaubte Attribute je Direktive (alles andere ist ein Fehler) */
const ALLOWED_ATTRS = {
  k: ["id"],
  vertiefung: ["title"],
  beweis: ["ohne-qed"],
  schritt: [],
  why: [],
  quiz: [],
  frage: ["wahr", "falsch"],
  quelle: [],
};
for (const name of Object.keys(ENV)) ALLOWED_ATTRS[name] = ["label"];

/** Attribute, die als reine Flags geschrieben werden MÜSSEN */
const BARE_FLAGS = new Set(["wahr", "falsch", "ohne-qed"]);

/** im why-Prop unterstützte Inline-Knoten (alles andere scheitert) */
const WHY_OK = new Set([
  "text",
  "emphasis",
  "strong",
  "inlineCode",
  "inlineMath",
  "link",
  "textDirective",
  "paragraph",
]);

/** kleingeschriebene JSX-Namen, die als HTML durchgehen */
const HTML = new Set(
  ("a abbr b br code col colgroup dd div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i " +
    "img li ol p pre s small span strong sub sup table tbody td tfoot th thead tr u ul kbd " +
    "details summary blockquote caption mark time var samp").split(" ")
);

/* ------------------------------------------------------------------ */
/* estree-Helfer                                                       */
/* ------------------------------------------------------------------ */

const parse = (src) => JsxParser.parse(src, { ecmaVersion: 2022, sourceType: "module" });

/**
 * {"…"} bzw. {<>…</>} als MDX-Expression-Knoten. `fmmGenerated` markiert sie:
 * die Regel „keine freien Ausdrücke" unten prüft nur Autoren-Ausdrücke.
 */
const expression = (src, flow = false) => ({
  type: flow ? "mdxFlowExpression" : "mdxTextExpression",
  value: src,
  data: { estree: parse(src), fmmGenerated: true },
});

const attr = (name, value) => ({ type: "mdxJsxAttribute", name, value });

/** name={<>…</>} */
const attrExpr = (name, src) =>
  attr(name, { type: "mdxJsxAttributeValueExpression", value: src, data: { estree: parse(src) } });

/** Erzeugt ein JSX-Element und ÜBERNIMMT die Quellposition des Originals,
 *  damit Fehlermeldungen und Sourcemaps auf die MDX-Zeile zeigen. */
const el = (name, attributes, children, from, flow = true) => ({
  type: flow ? "mdxJsxFlowElement" : "mdxJsxTextElement",
  name,
  attributes,
  children,
  position: from?.position,
  data: { fmmGenerated: true },
});

/* ------------------------------------------------------------------ */
/* Inline-mdast -> JSX-Quelltext (nur für das why-Prop von <PStep>)     */
/* ------------------------------------------------------------------ */

function jsxAll(nodes, fail) {
  return (nodes ?? []).map((n) => jsxOne(n, fail)).join("");
}

function jsxOne(n, fail) {
  if (!WHY_OK.has(n.type))
    fail(n, `::why[…] unterstützt keinen Knoten vom Typ „${n.type}" — erlaubt sind Text, ` + `*kursiv*, **fett**, \`code\`, $Mathe$, Links und :k[…]{#id}`);
  switch (n.type) {
    case "text":
      return `{${JSON.stringify(n.value)}}`;
    case "paragraph":
      return jsxAll(n.children, fail);
    case "emphasis":
      return `<em>${jsxAll(n.children, fail)}</em>`;
    case "strong":
      return `<strong>${jsxAll(n.children, fail)}</strong>`;
    case "inlineCode":
      return `<code>{${JSON.stringify(n.value)}}</code>`;
    case "inlineMath":
      return `<M>{${JSON.stringify(n.value)}}</M>`;
    case "link":
      return `<a href={${JSON.stringify(n.url)}}>${jsxAll(n.children, fail)}</a>`;
    case "textDirective":
      if (n.name !== "k") fail(n, `im ::why[…] ist nur :k[…]{#id} als Direktive erlaubt`);
      if (!n.attributes?.id) fail(n, `:k[…] braucht eine Concept-ID`);
      return `<ConceptLink id={${JSON.stringify(n.attributes.id)}}>${jsxAll(
        n.children,
        fail
      )}</ConceptLink>`;
    default:
      return "";
  }
}

/* ------------------------------------------------------------------ */
/* Hilfen                                                              */
/* ------------------------------------------------------------------ */

/** Klartext eines Knotens (für Überschriften-IDs). */
function plain(node) {
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  if (node.type === "inlineMath") return "";
  return (node.children ?? []).map(plain).join("");
}

/**
 * Directive-Label: `:::satz[2.4 (Cauchy)]` legt einen ersten Absatz mit
 * data.directiveLabel ab. Zieht ihn heraus und liefert seinen Klartext.
 */
function takeLabel(node) {
  const first = node.children?.[0];
  if (first?.data?.directiveLabel) {
    node.children = node.children.slice(1);
    return plain(first);
  }
  return null;
}

const DIRECTIVE_TYPES = new Set(["containerDirective", "leafDirective", "textDirective"]);

/* ------------------------------------------------------------------ */
/* Das Plugin                                                          */
/* ------------------------------------------------------------------ */

export default function remarkFmm(options = {}) {
  const libRoot = path.resolve(options.root ?? process.cwd(), "src/lib");

  return (tree, file) => {
    const fail = (node, msg, rule = "remark-fmm") => file.fail(msg, node?.position, rule);
    const source = String(file.value ?? "");
    const lines = source.split("\n");

    /* ---- 0. Rohtext-Regeln ---------------------------------------- */

    // Ein maskiertes Dollarzeichen beendet die Formel BEVOR dieses Plugin sie
    // sieht: aus `$a \$ b$` wird <M>{"a \\"}</M> plus literales „b$ nach".
    // Der Build blieb dabei grün und die Mathematik war still zerstört.
    let inFence = false;
    lines.forEach((line, i) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      if (inFence) return;
      const col = line.indexOf("\\$");
      if (col >= 0)
        fail(
          { position: { start: { line: i + 1, column: col + 1 } } },
          `maskiertes Dollarzeichen „\\$" wird vom Markdown-Mathe-Parser NICHT als ` +
            `Zeichen gelesen, sondern beendet die Formel — die Mathematik wäre still ` +
            `zerstört. Nutze in TeX \\mathdollar oder \\text{\\textdollar}.`,
          "remark-fmm:dollar"
        );
    });

    /* ---- 1. Struktur prüfen, BEVOR irgendetwas umgebaut wird ------- */

    visit(tree, (node, index, parent) => {
      if (!DIRECTIVE_TYPES.has(node.type)) return;
      const name = node.name;
      const a = node.attributes ?? {};

      // unbekannte Namen zuerst: sonst laufen die Regeln unten ins Leere
      const known =
        (node.type === "textDirective" && name === "k") ||
        (node.type === "leafDirective" && (name === "quelle" || name === "why")) ||
        (node.type === "containerDirective" &&
          (ENV[name] || ["vertiefung", "beweis", "schritt", "quiz", "frage"].includes(name)));
      if (!known) {
        const sigil = node.type === "textDirective" ? ":" : node.type === "leafDirective" ? "::" : ":::";
        fail(node, `unbekannte Direktive ${sigil}${name}`, "remark-fmm:unknown-directive");
      }

      // Attribute: nur erlaubte, und Flags müssen bar sein
      for (const [key, value] of Object.entries(a)) {
        if (!(ALLOWED_ATTRS[name] ?? []).includes(key))
          fail(
            node,
            `„${key}" ist kein erlaubtes Attribut von ${name} — erlaubt: ` +
              `${(ALLOWED_ATTRS[name] ?? []).join(", ") || "(keine)"}`,
            "remark-fmm:unknown-attribute"
          );
        // `{wahr=false}` hat früher WAHR bedeutet, weil nur die Existenz des
        // Schlüssels geprüft wurde. Flags dürfen deshalb keinen Wert tragen.
        if (BARE_FLAGS.has(key) && value !== "" && value !== null && value !== undefined)
          fail(
            node,
            `„${key}" ist ein Flag und darf keinen Wert haben — schreibe {${key}}, nicht ` +
              `{${key}=${value}}`,
            "remark-fmm:flag-with-value"
          );
      }

      // Container müssen explizit geschlossen sein. Ein fehlendes ::: frisst
      // sonst still den Rest der Datei.
      if (node.type === "containerDirective") {
        const endLine = lines[(node.position?.end?.line ?? 0) - 1] ?? "";
        if (!/^\s*:{3,}\s*$/.test(endLine))
          fail(
            node,
            `:::${name} ist nicht geschlossen — der Block reicht bis zum Dateiende. ` +
              `Setze eine Zeile mit ${":".repeat(3)} (bzw. mehr Doppelpunkten als die inneren Blöcke).`,
            "remark-fmm:unclosed"
          );
      }

      // Verschachtelung
      const parentName = parent?.type === "containerDirective" ? parent.name : null;
      if (name === "schritt" && parentName !== "beweis")
        fail(node, `:::schritt darf nur direkt in ::::beweis stehen`, "remark-fmm:nesting");
      if (name === "frage" && parentName !== "quiz")
        fail(node, `:::frage darf nur direkt in ::::quiz stehen`, "remark-fmm:nesting");
      if (name === "why" && parentName !== "schritt")
        fail(node, `::why[…] darf nur direkt in :::schritt stehen`, "remark-fmm:nesting");

      if (name === "beweis")
        for (const c of node.children ?? [])
          if (!(c.type === "containerDirective" && c.name === "schritt"))
            fail(c, `::::beweis darf nur :::schritt-Blöcke enthalten`, "remark-fmm:nesting");
      if (name === "quiz")
        for (const c of node.children ?? [])
          if (!(c.type === "containerDirective" && c.name === "frage"))
            fail(
              c,
              `::::quiz darf nur :::frage-Blöcke enthalten — freier Text würde als ` +
                `Quizfrage gerendert`,
              "remark-fmm:nesting"
            );
      if (name === "schritt") {
        const whys = (node.children ?? []).filter(
          (c) => c.type === "leafDirective" && c.name === "why"
        );
        if (whys.length > 1)
          fail(whys[1], `:::schritt darf höchstens ein ::why[…] haben`, "remark-fmm:duplicate-why");
      }
      if (name === "frage") {
        const wahr = "wahr" in a;
        const falsch = "falsch" in a;
        if (wahr === falsch)
          fail(
            node,
            `:::frage braucht genau eines von {wahr} oder {falsch}`,
            "remark-fmm:frage-flag"
          );
      }
    });

    /* ---- 2. Direktiven umbauen ------------------------------------ */
    visit(tree, (node, index, parent) => {
      if (!DIRECTIVE_TYPES.has(node.type)) return;
      const a = node.attributes ?? {};
      const name = node.name;

      if (node.type === "textDirective") {
        if (!a.id)
          fail(node, `:k[…] braucht eine Concept-ID, z.B. :k[die Spur]{#trace}`, "remark-fmm:k-id");
        parent.children[index] = el("ConceptLink", [attr("id", a.id)], node.children, node, false);
        return;
      }

      if (node.type === "leafDirective" && name === "quelle") {
        parent.children[index] = el(
          "p",
          [attr("className", "text-sm text-slate-500 dark:text-slate-400")],
          node.children,
          node
        );
        return;
      }

      if (name === "why") return; // wird vom umgebenden :::schritt eingesammelt

      if (ENV[name]) {
        const label = takeLabel(node) ?? a.label;
        if (!label)
          fail(
            node,
            `:::${name} braucht ein Label, z.B. :::${name}[2.4 (Cauchy-Schwarz)]`,
            "remark-fmm:missing-label"
          );
        parent.children[index] = el(
          "EnvBlock",
          [attr("kind", ENV[name]), attr("label", label)],
          node.children,
          node
        );
        return;
      }

      if (name === "vertiefung") {
        const title = takeLabel(node) ?? a.title;
        if (!title)
          fail(node, `:::vertiefung braucht einen Titel in [ … ]`, "remark-fmm:missing-label");
        parent.children[index] = el(
          "ExpandedReading",
          [attr("title", title)],
          node.children,
          node
        );
        return;
      }

      if (name === "beweis") {
        const attrs = "ohne-qed" in a ? [attrExpr("qed", "false")] : [];
        parent.children[index] = el("Proof", attrs, node.children, node);
        return;
      }

      if (name === "schritt") {
        let why = null;
        node.children = node.children.filter((c) => {
          if (c.type === "leafDirective" && c.name === "why") {
            why = `<>${jsxAll(c.children, fail)}</>`;
            return false;
          }
          return true;
        });
        parent.children[index] = el(
          "PStep",
          why ? [attrExpr("why", why)] : [],
          node.children,
          node
        );
        return;
      }

      if (name === "quiz") {
        parent.children[index] = el("Quiz", [], node.children, node);
        return;
      }
      if (name === "frage") {
        parent.children[index] = el(
          "Frage",
          [attrExpr("wahr", String("wahr" in a))],
          node.children,
          node
        );
        return;
      }
    });

    /* ---- 3. Mathematik -------------------------------------------- */
    const eqTags = new Map();
    visit(tree, (node, index, parent) => {
      if (node.type === "inlineMath") {
        parent.children[index] = el(
          "M",
          [],
          [expression(JSON.stringify(node.value))],
          node,
          false
        );
        return;
      }
      if (node.type !== "math") return;
      const meta = (node.meta ?? "").trim();
      let tag = null;
      if (meta) {
        // genau EIN {#eq-…}-Token, sonst Fehler. Vorher wurde „$$ garbage" und
        // „$$ {#eq_2.3}" still zu einer unnummerierten Gleichung.
        const m = /^\{#eq-([^}\s]+)\}$/.exec(meta);
        if (!m)
          fail(
            node,
            `unverständliche Angabe hinter $$: „${meta}". Erlaubt ist genau ein ` +
              `{#eq-<nummer>}, z.B. $$ {#eq-2.3}`,
            "remark-fmm:eq-meta"
          );
        tag = m[1];
        if (eqTags.has(tag))
          fail(node, `Gleichungsnummer „${tag}" ist doppelt vergeben`, "remark-fmm:duplicate-eq");
        eqTags.set(tag, node.position);
      }
      parent.children[index] = tag
        ? el("Eq", [attr("tag", tag)], [expression(JSON.stringify(node.value), true)], node)
        : el("MD", [], [expression(JSON.stringify(node.value), true)], node);
    });

    /* ---- 4. Überschriften: IDs NUR aus der Nummerierung ------------ */
    // Frühere Fassung sluggte auch unnummerierte Überschriften; allein in
    // Kapitel 3 wären daraus vier gleiche id="selbsttest" geworden.
    const headingIds = new Map();
    visit(tree, "heading", (node, index, parent) => {
      const text = plain(node).trim();
      const num = /^(\d+(?:\.\d+)*)\b/.exec(text);
      const attrs = [];
      if (num) {
        const id = `sec-${num[1]}`;
        if (headingIds.has(id))
          fail(node, `Überschriften-ID „${id}" ist in dieser Datei doppelt`, "remark-fmm:duplicate-id");
        headingIds.set(id, node.position);
        attrs.push(attr("id", id));
      }
      parent.children[index] = el(`h${node.depth}`, attrs, node.children, node);
    });

    /* ---- 5. Keine freien Ausdrücke im Fließtext -------------------- */
    // `Die Menge {1,2,3}` kompilierte grün zum JS-Ausdruck (1,2,3) und
    // renderte „Die Menge 3" — stiller Textverlust. Ein Lint kann das nicht
    // zuverlässig von einem gewollten {x} unterscheiden, weil der Parser
    // denselben Knotentyp liefert. Also sind freie Ausdrücke schlicht nicht
    // Teil der Sprache; dynamisches JSX gehört in importierte Widgets.
    visit(tree, (node) => {
      if (node.type !== "mdxTextExpression" && node.type !== "mdxFlowExpression") return;
      if (node.data?.fmmGenerated) return;
      const v = String(node.value ?? "").trim();
      if (v.startsWith("/*") && v.endsWith("*/")) return; // MDX-Kommentar
      fail(
        node,
        `geschweifte Klammern im Fließtext werden als JavaScript ausgewertet und ` +
          `verschlucken den Text: aus {1,2,3} wird „3". Schreibe \\{ und \\} für ` +
          `Klammern, und lege alles Dynamische in ein importiertes Widget.`,
        "remark-fmm:free-expression"
      );
    });

    /* ---- 6. Komponenten: bindungsbewusste Prüfung ------------------ */
    const esm = tree.children.filter((c) => c.type === "mdxjsEsm");
    const body = tree.children.filter((c) => c.type !== "mdxjsEsm");

    // Alles, was im Modulkopf gebunden wird: Importe UND lokale Deklarationen
    // (const X = …, function X(), export const X = …). Die Vorgängerfassung
    // kannte nur Importe und wies lokale Komponenten fälschlich zurück.
    const bound = new Set();
    const declared = (d) => {
      if (!d) return;
      if (d.type === "VariableDeclaration") for (const v of d.declarations) bindPattern(v.id);
      else if (d.id?.name) bound.add(d.id.name);
    };
    const bindPattern = (p) => {
      if (!p) return;
      if (p.type === "Identifier") bound.add(p.name);
      else if (p.type === "ObjectPattern") for (const pr of p.properties) bindPattern(pr.value ?? pr.argument);
      else if (p.type === "ArrayPattern") for (const e of p.elements) bindPattern(e);
    };
    for (const node of esm)
      for (const st of node.data?.estree?.body ?? []) {
        if (st.type === "ImportDeclaration") for (const sp of st.specifiers) bound.add(sp.local.name);
        else if (st.type === "VariableDeclaration" || st.type === "FunctionDeclaration") declared(st);
        else if (st.type === "ExportNamedDeclaration") declared(st.declaration);
      }

    // Erstes Vorkommen je Name merken, damit die Fehlermeldung eine Zeile hat.
    const used = new Map();
    visit(tree, (n) => {
      if (n.type !== "mdxJsxFlowElement" && n.type !== "mdxJsxTextElement") return;
      if (!n.name) return; // Fragment <>…</>
      if (n.data?.fmmGenerated) return; // vom Plugin erzeugt
      if (!used.has(n.name)) used.set(n.name, n);
    });

    for (const [name, node] of used) {
      // <Foo.Bar/> bindet nur Foo
      const root = name.split(".")[0];
      if (/^[a-z]/.test(root)) {
        if (!HTML.has(root))
          fail(
            node,
            `<${name}> ist kein bekanntes HTML-Element. Komponenten müssen groß ` +
              `geschrieben werden, sonst erzeugt MDX still ein unbekanntes HTML-Tag.`,
            "remark-fmm:lowercase-component"
          );
        continue;
      }
      if (LIB.includes(root)) continue; // liefert das Plugin selbst
      if (!bound.has(root))
        fail(
          node,
          `<${name}> wird verwendet, ist aber nicht importiert — ergänze oben z.B. ` +
            `import { ${root} } from "./widgets/…";`,
          "remark-fmm:missing-import"
        );
    }

    // Bibliotheks-Namen, die der Autor selbst gebunden hat, nicht doppelt
    // importieren (und damit auch nicht überschreiben).
    const needed = LIB.filter((n) => !bound.has(n));
    let rel = path
      .relative(path.dirname(file.path ?? path.join(libRoot, "..", "x.mdx")), libRoot)
      .replace(/\\/g, "/");
    if (!rel.startsWith(".")) rel = `./${rel}`;
    const importSrc = `import { ${needed.join(", ")} } from ${JSON.stringify(rel)};`;

    /* ---- 7. Fragment statt Layout-Wrapper -------------------------- */
    // KEIN <div className="…"> mehr: die Typografie kommt aus dem Adapter,
    // weil derselbe Inhalt auf heller Seite und im dunklen Tooltip landet.
    tree.children = [
      ...(needed.length
        ? [{ type: "mdxjsEsm", value: importSrc, data: { estree: parse(importSrc) } }]
        : []),
      ...esm,
      ...body,
    ];

    if (typeof options.onFile === "function")
      options.onFile({ path: file.path, headingIds: [...headingIds.keys()], eqTags: [...eqTags.keys()] });
  };
}
