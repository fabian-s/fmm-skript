/**
 * Der Aufrufbaum von fib_rek(5) als ASCII-Grafik mit zwei rot markierten
 * Doppelberechnungen.
 *
 * Warum eine eigene Komponente statt eines Codeblocks im MDX: Die Grafik
 * braucht farbige Teilstücke MITTEN im vorformatierten Text. Ein
 * Markdown-Codeblock kann das nicht, und die JSX-Variante `<pre>{"…"}</pre>`
 * ist im MDX bewusst verboten — geschweifte Klammern im Fließtext werden dort
 * als JavaScript ausgewertet und verschlucken still Text. Genau dafür ist der
 * Weg über eine importierte Komponente gedacht.
 */
const ROT = { color: "#D55E00", fontWeight: 600 } as const;

export function S25Aufrufbaum() {
  return (
    <pre className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-xs leading-relaxed dark:bg-slate-900/60">
      {"fib_rek(5)\n├── fib_rek(4)\n│   ├── "}
      <span style={ROT}>{"fib_rek(3)"}</span>
      {"          ← 1. Berechnung von F(3)\n│   │   ├── fib_rek(2)\n│   │   │   ├── fib_rek(1)\n│   │   │   └── fib_rek(0)\n│   │   └── fib_rek(1)\n│   └── fib_rek(2)\n│       ├── fib_rek(1)\n│       └── fib_rek(0)\n└── "}
      <span style={ROT}>{"fib_rek(3)"}</span>
      {"              ← 2. Berechnung: komplett doppelte Arbeit\n    ├── fib_rek(2)\n    │   ├── fib_rek(1)\n    │   └── fib_rek(0)\n    └── fib_rek(1)"}
    </pre>
  );
}
