/**
 * Fixture-Tests der Autorensyntax.
 *
 * Jede ABGELEHNTE Form hier existiert, weil die erste Fassung des Plugins an
 * genau dieser Stelle grün durchkompiliert und dabei still Inhalt verloren
 * oder verfälscht hat. Der Test pinnt das Verhalten über MDX-/remark-Updates
 * hinweg fest: `node mdx/fixtures.test.mjs`.
 */
import { compile } from "@mdx-js/mdx";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import remarkFmm from "./remark-fmm.mjs";
import { remarkChain } from "./plugins.mjs";
import {
  diffInventories,
  inventoryFromMdx,
  inventoryFromTsx,
} from "./inventory.mjs";
import {
  assertStaticConceptTitle,
  assertUniqueConceptIds,
  typecheckMdxSources,
} from "./typecheck.mjs";

const PATH = "/x/src/chapters/xx/S.mdx";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function build(src) {
  return String(
    await compile(
      { value: src, path: PATH },
      { remarkPlugins: remarkChain("/x"), jsx: true }
    )
  );
}

/** akzeptierte Formen: kompilieren, und der Output muss `expect` enthalten */
const ACCEPT = {
  "inline math": [`Text mit $\\|\\bA\\|_2$ drin.`, `<M>{"\\\\|\\\\bA\\\\|_2"}</M>`],
  "display math": [`$$\n\\bA = \\bU\\bSigma\n$$`, `<MD>`],
  "numbered equation": [`$$ {#eq-2.3}\n\\bA = \\bU\n$$`, `<Eq tag="2.3">`],
  environment: [`:::satz[2.4 (Cauchy-Schwarz)]\nInhalt.\n:::`, `<EnvBlock kind="Satz" label="2.4 (Cauchy-Schwarz)">`],
  "concept link": [`Hier ist :k[die Spur]{#trace} erklärt.`, `<ConceptLink id="trace">`],
  vertiefung: [`:::vertiefung[Mehr dazu]\nInhalt.\n:::`, `<ExpandedReading title="Mehr dazu">`],
  interaktiv: [`:::interaktiv[Zum Schieben]\nInhalt.\n:::`, `<Interaktiv title="Zum Schieben">`],
  "english interactive": [`:::interactive[Drag it]\nText.\n:::`, `<Interaktiv title="Drag it">`],
  proof: [`::::beweis\n\n:::schritt\nSchritt eins.\n\n::why[weil $a>0$]\n:::\n\n::::`, `<PStep why={`],
  "proof without qed": [`::::beweis{ohne-qed}\n\n:::schritt\nEins.\n:::\n\n::::`, `qed={false}`],
  quiz: [`::::quiz\n\n:::frage{wahr}\nAussage.\n\nErklärung.\n:::\n\n::::`, `wahr={true}`],
  "quiz false": [`::::quiz\n\n:::frage{falsch}\nAussage.\n\nErklärung.\n:::\n\n::::`, `wahr={false}`],
  "numeric quiz (German)": [
    `::::quiz\n\n:::zahlfrage{loesung=0.433 toleranz=0.01 einheit="Sekunden"}\nWie groß ist der Wert?\n\nDas Widget zeigt 0,433 Sekunden.\n:::\n\n::::`,
    `<Zahlfrage loesung={0.433} toleranz={0.01} einheit="Sekunden">`,
  ],
  "numeric quiz (German comma, unicode minus)": [
    `::::quiz\n\n:::zahlfrage{loesung="−0,433" toleranz="0,01"}\nWie groß?\n\nErklärung.\n:::\n\n::::`,
    `<Zahlfrage loesung={-0.433} toleranz={0.01}>`,
  ],
  "numeric quiz (English alias)": [
    `::::quiz\n\n:::numquestion{answer=1.5 tol=0.1}\nWhat is the value?\n\nExplanation.\n:::\n\n::::`,
    `<Zahlfrage loesung={1.5} toleranz={0.1}>`,
  ],
  "numbered heading gets id": [`### 2.2.1 Titel\n`, `id="sec-2.2.1"`],
  // ohne Nummer KEINE id — sonst kollidieren die vier „Selbsttest"-
  // Überschriften allein in Kapitel 3 auf id="selbsttest"
  "unnumbered heading gets NO id": [
    `### Selbsttest\n`,
    `<_components.h3>{"Selbsttest"}</_components.h3>`,
  ],
  quelle: [`::quelle[Folien 02-algos, S. 4]`, `text-sm text-slate-500`],
  "escaped braces are literal": [`Die Menge \\{1,2,3\\} im Text.`, `{1,2,3}`],
  "mdx comment allowed": [`{/* Notiz an mich */}\n\nText.`, `Text.`],
  "escaped dollar in inline code": ["`\\$HOME`", "$HOME"],
  "fence character and length tracked": [
    "````text\n\\$HOME\n~~~\n````",
    "$HOME",
  ],
  "imported widget": [`import { W } from "./widgets/W";\n\n<W />`, `<W />`],
  "locally declared component": [
    `export const W = () => <b>x</b>;\n\n<W />`,
    `<W />`,
  ],
  "english proof directives": [
    `::::proof\n\n:::step\nEins.\n\n::why[weil]\n:::\n\n::::`,
    `<PStep why={`,
  ],
  "english quiz directives": [
    `::::quiz\n\n:::question{true}\nA.\n\nB.\n:::\n\n::::`,
    `wahr={true}`,
  ],
  "english environment and deepdive": [
    `:::corollary[3.2]\nText.\n:::`,
    `<EnvBlock kind="Corollary" label="3.2">`,
  ],
  "english concept link": [`See :c[the trace]{#trace} here.`, `<ConceptLink id="trace">`],
  "english deepdive and source": [
    `::source[Slides 4, p. 12]\n\n:::deepdive[More]\nText.\n:::`,
    `<ExpandedReading title="More">`,
  ],
  "english algorithm environment": [
    `:::algorithm[2.1 (Gauss)]\nText.\n:::`,
    `<EnvBlock kind="Algorithm" label="2.1 (Gauss)">`,
  ],
  "english no-qed flag": [
    `::::proof{no-qed}\n\n:::step\nEins.\n:::\n\n::::`,
    `qed={false}`,
  ],
  // Council 2 (Codex): ein \$ im FLIESSTEXT ist gewöhnliches Markdown und
  // darf nicht scheitern — die Regel gilt nur innerhalb von Formeln.
  "escaped dollar in prose is fine": [`Der Preis ist \\$5 heute.`, `$5`],
  "fenced code keeps indentation": ["```text\nfib(5)\n  |-- fib(4)\n```", `|-- fib(4)`],
  "display math may contain an escaped dollar": [
    `$$\n\\text{Kosten in \\$}\n$$`,
    `<MD>`,
  ],
  "no layout wrapper is emitted": [`Nur Text.`, `Nur Text.`],
};

/** abgelehnte Formen: MÜSSEN scheitern, Meldung muss `expect` enthalten */
const REJECT = {
  "free expression eats text": [`Die Menge {1,2,3} im Text.`, `geschweifte Klammern`],
  "escaped dollar destroys math": [`Vor $a \\$ b$ nach.`, `maskiertes Dollarzeichen`],
  "flag with value": [`::::quiz\n\n:::frage{wahr=false}\nA.\n\nB.\n:::\n\n::::`, `Flag`],
  "unclosed environment": [`:::satz[1.2]\nInhalt ohne Ende.\n`, `nicht geschlossen`],
  "unknown environment": [`:::sazt[1.2]\nInhalt.\n:::`, `unbekannte Direktive`],
  "environment without label": [`:::satz\nInhalt.\n:::`, `braucht ein Label`],
  "concept link without id": [`Hier ist :k[die Spur] erklärt.`, `Concept-ID`],
  "step outside proof": [`:::schritt\nEins.\n:::`, `nur direkt in ::::beweis`],
  "why outside step": [`::why[verwaist]`, `nur direkt in :::schritt`],
  "two why blocks": [
    `::::beweis\n\n:::schritt\nEins.\n\n::why[erstes]\n\n::why[zweites]\n:::\n\n::::`,
    `höchstens ein`,
  ],
  "prose inside quiz": [`::::quiz\n\nEinleitung.\n\n:::frage{wahr}\nA.\n\nB.\n:::\n\n::::`, `nur :::frage`],
  "prose inside proof": [`::::beweis\n\nEinleitung.\n\n:::schritt\nEins.\n:::\n\n::::`, `nur :::schritt`],
  "frage without flag": [`::::quiz\n\n:::frage\nA.\n\nB.\n:::\n\n::::`, `genau eines von`],
  "numeric question without solution": [
    `::::quiz\n\n:::zahlfrage{toleranz=0.1}\nA.\n\nB.\n:::\n\n::::`,
    `loesung`,
  ],
  "numeric question without tolerance": [
    `::::quiz\n\n:::zahlfrage{loesung=1}\nA.\n\nB.\n:::\n\n::::`,
    `toleranz`,
  ],
  "numeric question negative tolerance": [
    `::::quiz\n\n:::zahlfrage{loesung=1 toleranz=-0.1}\nA.\n\nB.\n:::\n\n::::`,
    `nichtnegative`,
  ],
  "unknown attribute": [`:::satz[1.2]{foo=bar}\nInhalt.\n:::`, `kein erlaubtes Attribut`],
  "bad equation meta": [`$$ {#eq_2.3}\n\\bA\n$$`, `unverständliche Angabe`],
  "garbage equation meta": [`$$ garbage\n\\bA\n$$`, `unverständliche Angabe`],
  "duplicate equation tag": [
    `$$ {#eq-2.3}\n\\bA\n$$\n\n$$ {#eq-2.3}\n\\bB\n$$`,
    `doppelt vergeben`,
  ],
  "duplicate heading id": [`### 2.2.1 Eins\n\n### 2.2.1 Zwei\n`, `doppelt`],
  "unimported component": [`<Widget />`, `nicht importiert`],
  "lowercase component": [`<widget />`, `kein bekanntes HTML-Element`],
  "component hidden in expression": [`{true && <Widget />}`, `geschweifte Klammern`],
  "expression disguised as comment": [
    `{/* harmlose Notiz */ 7 /* Ende */}`,
    `geschweifte Klammern`,
  ],
  "reserved math component": [`export const M = () => null;\n\n$x+1$`, `reserviert`],
  "empty question": [
    `::::quiz\n\n:::frage{wahr}\n\n:::\n\n::::`,
    `ist leer`,
  ],
  "question without explanation": [
    `::::quiz\n\n:::frage{wahr}\nNur eine Aussage.\n:::\n\n::::`,
    `Erklärungsblock`,
  ],
  // Council 2026-08-06 (Claude-Leg): jede dieser Formen kompilierte vorher
  // GRÜN und verlor oder verfälschte dabei still Inhalt.
  "math in a directive label": [`:::satz[2.4 ($\\bA$ regulär)]\nText.\n:::`, `Label`],
  "equal-colon nesting leaves a stray fence": [
    `:::beweis\n\n:::schritt\nx\n:::\n\n:::`,
    `Zaun-Zeile`,
  ],
  "stray backtick must not disable the dollar guard": [
    "Ein \` einzelner Backtick.\n\nVor $a \\$ b$ nach.",
    `maskiertes Dollarzeichen`,
  ],
  // Council 2 (Claude-Leg): jede dieser Formen kompilierte grün und war falsch.
  "pre in mdx loses indentation": [
    `<pre>\nfib(5)\n  |-- fib(4)\n</pre>`,
    `<pre> im MDX`,
  ],
  "same-paragraph backtick cannot disable the dollar guard": [
    "Ein \` Backtick und $a \\$ b$ danach.",
    `maskiertes Dollarzeichen`,
  ],
  "list-indented corrupt math": [
    `- Punkt\n\n    Formel $a \\$ b$ hier.`,
    `maskiertes Dollarzeichen`,
  ],
  "image inside why": [
    `::::beweis\n\n:::schritt\nEins.\n\n::why[vor ![alt](x.png) nach]\n:::\n\n::::`,
    `unterstützt keinen Knoten`,
  ],
};

/** Gate-Fixtures: true = exakt gleich, false = der Gate muss ablehnen. */
const INVENTORY = {
  "prose in expression container": [
    `export default () => <p>{"Inhalt der überleben muss."}</p>`,
    `Inhalt der überleben muss.`,
    true,
  ],
  "complete prose loss": [
    `export default () => <p>{"GANZER ABSATZ VERLOREN"}</p>`,
    `{/* nur Kommentar */}`,
    false,
  ],
  "hoisted old quiz": [
    `const QUIZ = [{ statement: <>Aussage.</>, wahr: true, expl: <>Erklärung.</> }];
     function QuizWidget() { return <div />; }
     export default () => <><p>Vorher</p><QuizWidget /><p>Nachher</p></>`,
    `Vorher

::::quiz

:::frage{wahr}
Aussage.

Erklärung.
:::

::::

Nachher`,
    true,
  ],
  "changed quiz truth and prose": [
    `const QUIZ = [{ statement: <>Original.</>, wahr: true, expl: <>Begründung.</> }];
     function QuizWidget() { return <div />; }
     export default () => <QuizWidget />`,
    `::::quiz

:::frage{falsch}
Ersetzt.

Andere Erklärung.
:::

::::`,
    false,
  ],
  "widget props changed": [
    `export default () => <Widget mode="correct" data={[1, 2, 3]} />`,
    `import { Widget } from "./Widget";

<Widget mode="corrupt" data={null} />`,
    false,
  ],
  "proof prop changed": [
    `export default () => <Proof qed={false}><PStep><p>Schritt.</p></PStep></Proof>`,
    `::::beweis

:::schritt
Schritt.
:::

::::`,
    false,
  ],
  "math reordered": [
    `export default () => <><M>{"first"}</M><M>{"second"}</M></>`,
    `$second$ dann $first$`,
    false,
  ],
  "math moved out of theorem": [
    `export default () => <EnvBlock kind="Satz" label="1"><M>{"x"}</M></EnvBlock>`,
    `:::satz[1]
Text.
:::

$x$`,
    false,
  ],
  // Gemini (Council 2026-08-06): Weißraum ENTFERNEN statt normalisieren hätte
  // zusammengelaufene Wörter durchgelassen — genau der Fehler, den eine
  // schludrige Konvertierung produziert.
  "run-together words are caught": [
    `export default () => <p>{"Das Ende. Deshalb gilt"}</p>`,
    `Das Ende.Deshalb gilt`,
    false,
  ],
  // ...und die Gegenprobe: reine Quelltext-Einrückung und `{" "}` dürfen
  // KEINEN Fehlalarm erzeugen (Blockgrenzen + JSX-Leerzeichensemantik).
  "jsx explicit space is not a difference": [
    `export default () => <p>Vor{" "}<em>kursiv</em> nach.</p>`,
    `Vor *kursiv* nach.`,
    true,
  ],
  "TeX whitespace remains harmless": [
    `export default () => <MD>{"a + b"}</MD>`,
    `$$
a   +
b
$$`,
    true,
  ],
};

const TYPE_REJECT = {
  "missing local JSX component": [
    `export const W = () => <Missing />;\n\n<W />`,
    "Missing",
  ],
  "missing member component": [
    `export const Widgets = {};\n\n<Widgets.Missing />`,
    "Missing",
  ],
  "undefined prop expression": [
    `export const W = props => <b>{props.count}</b>;\n\n<W count={notDefined} />`,
    "notDefined",
  ],
};

/* ------------------------------------------------------------------ */
/* Automatische Nummerierung (mdx/numbers.mjs, scripts/gen-numbers.mjs) */
/* ------------------------------------------------------------------ */

/** Testtabelle statt src/chapters/numbers.generated.json */
const NUMBERS = {
  version: 1,
  chapters: { optim: { id: "12-optim", num: 12, title: "Optimierung" }, svd: { id: "06-svd", num: 6, title: "SVD" } },
  sections: {
    "optim/beschraenkt": { num: "12.5", chapter: "12-optim", key: "beschraenkt", title: "Beschränkt", anchor: "sec-12.5" },
    "svd/motivation": { num: "6.1", chapter: "06-svd", key: "motivation", title: "Motivation", anchor: "sec-6.1" },
  },
  envs: {
    kkt: { num: "12.5.7", kind: "Satz", directive: "satz", name: "KKT-Bedingungen", label: "12.5.7 (KKT-Bedingungen)", chapter: "12-optim", section: "12.5", anchor: "env-kkt", legacy: false },
    "bsp-a": { num: "6.1.2", kind: "Beispiel", directive: "beispiel", name: null, label: "6.1.2", chapter: "06-svd", section: "6.1", anchor: "env-bsp-a", legacy: false },
    "12.5.1": { num: "12.5.1", kind: "Definition", directive: "definition", name: "Alt", label: "12.5.1 (Alt)", chapter: "12-optim", section: "12.5", anchor: null, legacy: true },
  },
  eqs: { "kkt-stat": { num: "12.5.3", chapter: "12-optim", section: "12.5", anchor: "eq-kkt-stat", legacy: false } },
  subs: { "lagrange-idee": { num: "12.5.1", chapter: "12-optim", section: "12.5", anchor: "sec-lagrange-idee", legacy: false } },
};
const NPATH = "/x/src/chapters/12-optim/S125.mdx";
async function buildN(src, filePath = NPATH) {
  return String(
    await compile({ value: src, path: filePath }, { remarkPlugins: remarkChain("/x", { numbers: NUMBERS }), jsx: true })
  );
}

/** akzeptierte Nummern-Formen: [Quelle, erwarteter Output, (optional) Dateipfad] */
const NUM_ACCEPT = {
  "env with id gets number and anchor": [
    `:::satz[#kkt (KKT-Bedingungen)]\nInhalt.\n:::`,
    `<EnvBlock kind="Satz" label="12.5.7 (KKT-Bedingungen)" id="env-kkt">`,
  ],
  "env with id, no name": [`:::beispiel[#bsp-a]\nInhalt.\n:::`, `label="6.1.2" id="env-bsp-a"`, "/x/src/chapters/06-svd/S61.mdx"],
  "env explicitly unnumbered": [`:::bemerkung[(Konvention)]\nInhalt.\n:::`, `<EnvBlock kind="Bemerkung" label="Konvention">`],
  "legacy and id labels mixed in one file": [
    `:::definition[12.5.1 (Alt)]\nA.\n:::\n\n:::satz[#kkt (KKT-Bedingungen)]\nB.\n:::`,
    `label="12.5.1 (Alt)"`,
  ],
  "legacy env has NO anchor": [`:::definition[12.5.1 (Alt)]\nA.\n:::`, `<EnvBlock kind="Definition" label="12.5.1 (Alt)">`],
  "equation with id": [`$$ {#eq-kkt-stat}\nx\n$$`, `<Eq tag="12.5.3" id="eq-kkt-stat">`],
  "legacy equation unchanged": [`$$ {#eq-12.5.9}\nx\n$$`, `<Eq tag="12.5.9">`],
  "heading with :id gets number and anchor": [`### Die Idee :id[lagrange-idee]\n`, `id="sec-lagrange-idee"`],
  "heading with :id renders number text": [`### Die Idee :id[lagrange-idee]\n`, `12.5.1 `],
  "@satz same chapter": [`Nach @satz:kkt gilt.`, `<_components.a href="#env-kkt">{"Satz 12.5.7"}</_components.a>`],
  "@theorem (english) on a Satz": [`See @theorem:kkt.`, `{"Satz 12.5.7"}`],
  "@beispiel cross-chapter": [`Siehe @beispiel:bsp-a.`, `href="?k=06-svd#env-bsp-a">{"Beispiel 6.1.2"}`],
  "@eq": [`Aus @eq:kkt-stat folgt.`, `href="#eq-kkt-stat">{"(12.5.3)"}`],
  "@num only number": [`Beispiele @num:bsp-a bis @num:kkt.`, `{"6.1.2"}`],
  "@ref picks kind": [`Siehe @ref:bsp-a.`, `{"Beispiel 6.1.2"}`],
  "@sec within chapter": [`In @sec:beschraenkt steht.`, `href="#sec-12.5">{"Abschnitt 12.5"}`],
  "@sec cross-chapter": [`In @sec:svd/motivation steht.`, `href="?k=06-svd#sec-6.1">{"Abschnitt 6.1"}`],
  "@sec on subheading": [`In @sec:lagrange-idee steht.`, `href="#sec-lagrange-idee">{"Abschnitt 12.5.1"}`],
  "@kap": [`In @kap:svd steht.`, `href="?k=06-svd">{"Kapitel 6"}`],
  "@sec from concept (no chapter) uses ?k=": [`In @sec:optim/beschraenkt.`, `href="?k=12-optim#sec-12.5"`, "/x/src/concepts/kkt.mdx"],
  "ref at sentence end keeps the period": [`Siehe @satz:kkt.`, `{"Satz 12.5.7"}</_components.a>{"."}`],
  "ref inside ::why label": [
    `::::beweis\n\n:::schritt\nEins.\n\n::why[nach @satz:kkt und @eq:kkt-stat]\n:::\n\n::::`,
    `href={"#env-kkt"}>{"Satz 12.5.7"}`,
  ],
  "escaped \\@ is literal": [`Schreibe \\@satz:kkt für einen Verweis.`, `{"Schreibe @satz:kkt für einen Verweis."}`],
  "ref inside table cell": [`| a | b |\n|---|---|\n| @satz:kkt | x |`, `{"Satz 12.5.7"}`],
};

/** abgelehnte Nummern-Formen */
const NUM_REJECT = {
  "unknown ref": [`Nach @satz:nope gilt.`, `unbekannter Verweis`],
  "kind mismatch": [`Nach @definition:kkt gilt.`, `ist ein Satz`],
  "@eq on an env id": [`Nach @eq:kkt gilt.`, `unbekannter Verweis @eq:kkt`],
  "unknown env id": [`:::satz[#nope]\nInhalt.\n:::`, `Nummerntabelle`],
  "unknown eq id": [`$$ {#eq-nope}\nx\n$$`, `Nummerntabelle`],
  "unknown heading id": [`### Titel :id[nope]\n`, `Nummerntabelle`],
  "invalid env id": [`:::satz[#Kkt_x]\nInhalt.\n:::`, `Nummerntabelle`],
  "duplicate eq id in file": [`$$ {#eq-kkt-stat}\nx\n$$\n\n$$ {#eq-kkt-stat}\ny\n$$`, `doppelt`],
  "duplicate heading id in file": [`### A :id[lagrange-idee]\n\n### B :id[lagrange-idee]\n`, `doppelt`],
  "ref inside a link": [`Siehe [@satz:kkt](#sec-12.5).`, `innerhalb eines Links`],
  ":id outside a heading": [`Text :id[x] hier.`, `nur am Ende einer Überschrift`],
  ":id not at the end": [`### A :id[lagrange-idee] B\n`, `am ENDE`],
  "heading with number AND id": [`### 2.5.1 Titel :id[lagrange-idee]\n`, `Nummer UND`],
  "ref inside env label": [`:::satz[#kkt (nach @eq:kkt-stat)]\nInhalt.\n:::`, `@-Verweise`],
  "@sec unknown in chapter": [`In @sec:motivation steht.`, `unbekannter Verweis @sec:motivation`],
  "@sec bare key from concept": [`In @sec:beschraenkt.`, `unbekannter Verweis @sec:beschraenkt`, "/x/src/concepts/kkt.mdx"],
};

let pass = 0;
const failures = [];

for (const [name, [src, expect, filePath]] of Object.entries(NUM_ACCEPT)) {
  try {
    const out = await buildN(src, filePath);
    if (out.includes(expect)) pass++;
    else failures.push(`NUM_ACCEPT ${name}: compiled but missing ${JSON.stringify(expect)}`);
  } catch (e) {
    failures.push(`NUM_ACCEPT ${name}: threw — ${String(e.message).split("\n")[0]}`);
  }
}
for (const [name, [src, expect, filePath]] of Object.entries(NUM_REJECT)) {
  let out = null;
  try {
    out = await buildN(src, filePath);
  } catch (e) {
    const msg = String(e.message);
    if (msg.includes(expect)) pass++;
    else failures.push(`NUM_REJECT ${name}: wrong message — ${msg.split("\n")[0]}`);
    continue;
  }
  failures.push(`NUM_REJECT ${name}: compiled GREEN but must fail (${out.length} chars)`);
}

// Zählpass: Handnummern belegen, IDs füllen die Lücken in Dokumentreihenfolge;
// doppelte IDs über Dateigrenzen hinweg sind ein Fehler.
{
  const { scanFile, assignNumbers, buildTable } = await import("../scripts/gen-numbers.mjs");
  const { items } = scanFile(
    `:::definition[12.5.1 (Alt)]\nA.\n:::\n\n:::satz[#a]\nB.\n:::\n\n:::bemerkung[12.5.3]\nC.\n:::\n\n:::satz[#b (N)]\nD.\n:::\n\n` +
      `$$ {#eq-x}\n1\n$$\n\n$$ {#eq-12.5.1}\n2\n$$\n\n### 12.5.1 Alt\n\n### Neu :id[h]\n`,
    "S.mdx"
  );
  const errors = [];
  const nums = Object.fromEntries(assignNumbers(items, "12.5", "S.mdx", errors, []).map((it) => [`${it.ns}:${it.id ?? it.num}`, it.num]));
  const want = { "envs:12.5.1": "12.5.1", "envs:a": "12.5.2", "envs:12.5.3": "12.5.3", "envs:b": "12.5.4", "eqs:x": "12.5.2", "eqs:12.5.1": "12.5.1", "subs:12.5.1": "12.5.1", "subs:h": "12.5.2" };
  if (!errors.length && JSON.stringify(nums) === JSON.stringify(want)) pass++;
  else failures.push(`GEN counter: ${JSON.stringify(nums)} ${errors.join("; ")}`);

  const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = await import("node:fs");
  const os = await import("node:os");
  const tmp = mkdtempSync(path.join(os.tmpdir(), "fmm-numbers-"));
  try {
    mkdirSync(path.join(tmp, "src/chapters/01-a"), { recursive: true });
    writeFileSync(path.join(tmp, "src/chapters/index.ts"), `{ id: "01-a", num: 1, title: "A" }`);
    writeFileSync(
      path.join(tmp, "src/chapters/01-a/index.ts"),
      `import S11Body from "./S11.mdx";\nimport S12Body from "./S12.mdx";\n` +
        `{ id: "1.1", key: "eins", title: "Eins", C: mdxSection(S11Body) },\n{ id: "1.2", key: "zwei", title: "Zwei", C: mdxSection(S12Body) },`
    );
    writeFileSync(path.join(tmp, "src/chapters/01-a/S11.mdx"), `:::satz[#dup]\nA.\n:::\n`);
    writeFileSync(path.join(tmp, "src/chapters/01-a/S12.mdx"), `:::satz[#dup]\nB.\n:::\n\n### X :id[zwei]\n`);
    const { errors: e2, table } = buildTable(tmp);
    if (e2.some((m) => m.includes("schon vergeben")) && e2.some((m) => m.includes("kollidiert")) && table.envs.dup?.num === "1.1.1") pass++;
    else failures.push(`GEN duplicate id across files: ${e2.join(" | ") || "kein Fehler"}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

for (const [name, [src, expect]] of Object.entries(ACCEPT)) {
  try {
    const out = await build(src);
    if (out.includes(expect)) pass++;
    else failures.push(`ACCEPT ${name}: compiled but missing ${JSON.stringify(expect)}`);
  } catch (e) {
    failures.push(`ACCEPT ${name}: threw — ${String(e.message).split("\n")[0]}`);
  }
}

for (const [name, [src, expect]] of Object.entries(REJECT)) {
  let out = null;
  try {
    out = await build(src);
  } catch (e) {
    const msg = String(e.message);
    if (msg.includes(expect)) pass++;
    else failures.push(`REJECT ${name}: wrong message — ${msg.split("\n")[0]}`);
    continue;
  }
  failures.push(`REJECT ${name}: compiled GREEN but must fail (${out.length} chars)`);
}

for (const [name, [tsx, mdx, equal]] of Object.entries(INVENTORY)) {
  try {
    const oldInventory = inventoryFromTsx(tsx);
    const newInventory = await inventoryFromMdx(mdx, PATH, "/x");
    const isEqual = diffInventories(oldInventory, newInventory).length === 0;
    if (isEqual === equal) pass++;
    else failures.push(`INVENTORY ${name}: ${isEqual ? "unerwartet gleich" : "unerwartet verschieden"}`);
  } catch (e) {
    failures.push(`INVENTORY ${name}: warf Fehler — ${String(e.message).split("\n")[0]}`);
  }
}

const typeEntries = Object.entries(TYPE_REJECT).map(([name, [source]]) => ({
  name,
  source,
  path: path.join(ROOT, "src/chapters", `fixture-${name.replace(/\s+/g, "-")}.mdx`),
}));
try {
  const diagnostics = await typecheckMdxSources(typeEntries);
  for (const entry of typeEntries) {
    const expect = TYPE_REJECT[entry.name][1];
    const own = diagnostics.filter((d) => d.file.includes(`fixture-${entry.name.replace(/\s+/g, "-")}`));
    if (own.some((d) => d.message.includes(expect))) pass++;
    else failures.push(`TYPE ${entry.name}: erwarteter Fehler ${JSON.stringify(expect)} fehlt`);
  }
} catch (e) {
  failures.push(`TYPE-FIXTURES: warfen Fehler — ${String(e.message).split("\n")[0]}`);
}

try {
  const withTitle = await build(`export const title = "Titel";\n\nText.`);
  assertStaticConceptTitle(withTitle, "konzept.mdx");
  pass++;
} catch (e) {
  failures.push(`CONCEPT title accepted: ${String(e.message).split("\n")[0]}`);
}
try {
  assertStaticConceptTitle(await build(`Nur Text.`), "ohne-titel.mdx");
  failures.push(`CONCEPT missing title: wurde akzeptiert`);
} catch (e) {
  if (String(e.message).includes("exportiert keinen Titel")) pass++;
  else failures.push(`CONCEPT missing title: falscher Fehler — ${String(e.message).split("\n")[0]}`);
}
try {
  assertUniqueConceptIds([
    { id: "spur", file: "src/concepts/anders-benannt.tsx" },
    { id: "spur", file: "src/concepts/spur.mdx" },
  ]);
  failures.push(`CONCEPT duplicate id: wurde akzeptiert`);
} catch (e) {
  if (String(e.message).includes("doppelt")) pass++;
  else failures.push(`CONCEPT duplicate id: falscher Fehler — ${String(e.message).split("\n")[0]}`);
}

try {
  const quizSource = await readFile(path.join(ROOT, "src/lib/Quiz.tsx"), "utf8");
  const adapterSource = await readFile(path.join(ROOT, "src/mdx/adapters.tsx"), "utf8");
  if (!quizSource.includes('<span id={labelId}') && quizSource.includes('<div id={labelId}')) pass++;
  else failures.push("DOM Frage: Aussage steckt weiterhin in einem span");
  if (adapterSource.includes("concept-body") && adapterSource.includes("[&_h3]") && adapterSource.includes("[&_table]")) pass++;
  else failures.push("DOM ConceptBody: Dunkelkontext-, h3- oder Tabellenregel fehlt");
} catch (e) {
  failures.push(`DOM-FIXTURES: ${String(e.message).split("\n")[0]}`);
}

const total =
  Object.keys(ACCEPT).length +
  Object.keys(REJECT).length +
  Object.keys(NUM_ACCEPT).length +
  Object.keys(NUM_REJECT).length +
  2 +
  Object.keys(INVENTORY).length +
  Object.keys(TYPE_REJECT).length +
  5;
console.log(`${pass}/${total} fixtures passed`);
failures.forEach((f) => console.log("  FAIL " + f));
process.exit(failures.length ? 1 : 0);
