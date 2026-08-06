/**
 * Fixture-Tests der Autorensyntax.
 *
 * Jede ABGELEHNTE Form hier existiert, weil die erste Fassung des Plugins an
 * genau dieser Stelle grün durchkompiliert und dabei still Inhalt verloren
 * oder verfälscht hat. Der Test pinnt das Verhalten über MDX-/remark-Updates
 * hinweg fest: `node mdx/fixtures.test.mjs`.
 */
import { compile } from "@mdx-js/mdx";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import remarkFmm from "./remark-fmm.mjs";

const PATH = "/x/src/chapters/xx/S.mdx";

async function build(src) {
  return String(
    await compile(
      { value: src, path: PATH },
      { remarkPlugins: [remarkMath, remarkDirective, [remarkFmm, { root: "/x" }]], jsx: true }
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
  proof: [`::::beweis\n\n:::schritt\nSchritt eins.\n\n::why[weil $a>0$]\n:::\n\n::::`, `<PStep why={`],
  "proof without qed": [`::::beweis{ohne-qed}\n\n:::schritt\nEins.\n:::\n\n::::`, `qed={false}`],
  quiz: [`::::quiz\n\n:::frage{wahr}\nAussage.\n\nErklärung.\n:::\n\n::::`, `wahr={true}`],
  "quiz false": [`::::quiz\n\n:::frage{falsch}\nAussage.\n\nErklärung.\n:::\n\n::::`, `wahr={false}`],
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
  "imported widget": [`import { W } from "./widgets/W";\n\n<W />`, `<W />`],
  "locally declared component": [
    `export const W = () => <b>x</b>;\n\n<W />`,
    `<W />`,
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
  "image inside why": [
    `::::beweis\n\n:::schritt\nEins.\n\n::why[vor ![alt](x.png) nach]\n:::\n\n::::`,
    `unterstützt keinen Knoten`,
  ],
};

let pass = 0;
const failures = [];

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

const total = Object.keys(ACCEPT).length + Object.keys(REJECT).length;
console.log(`${pass}/${total} fixtures passed`);
failures.forEach((f) => console.log("  FAIL " + f));
process.exit(failures.length ? 1 : 0);
