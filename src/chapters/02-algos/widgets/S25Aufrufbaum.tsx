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
 *
 * DIE EINE EINSICHT: Der Teilbaum unter fib_rek(3) steht zweimal im Baum von
 * fib_rek(5) — die Rekursion vergisst alles, was sie schon gerechnet hat.
 * Muster 11 (bewusst kein Widget): der Baum hat keine interessante
 * Parameterrichtung; wer ihn für andere n sehen will, findet ihn im Stepper
 * in Abschnitt 2.2.
 *
 * FARBROLLEN: rot markiert die doppelt ausgeführte Teilrechnung (Kapitelrolle
 * „das Teure", s. S21Demos.tsx).
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen,
 * 2026-08-19): Der Baum von fib_rek(5) hat T(5) = 15 Knoten; F_5 und F_4
 * kommen je einmal vor, F_3 zweimal, F_2 dreimal, F_1 fünfmal, F_0 dreimal
 * (1 + 1 + 2 + 3 + 5 + 3 = 15).
 */
import { FMM_COLORS } from "../../../lib";

const ROT = { color: FMM_COLORS.rot, fontWeight: 600 } as const;

export function S25Aufrufbaum() {
  return (
    <pre
      className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-xs leading-relaxed dark:bg-slate-900/60"
      role="img"
      aria-label="Aufrufbaum von fib_rek(5) mit 15 Knoten; der Teilbaum fib_rek(3) taucht zweimal auf und ist beide Male rot markiert."
    >
      {"fib_rek(5)\n├── fib_rek(4)\n│   ├── "}
      <span style={ROT}>{"fib_rek(3)"}</span>
      {"          ← 1. Berechnung von F(3)\n│   │   ├── fib_rek(2)\n│   │   │   ├── fib_rek(1)\n│   │   │   └── fib_rek(0)\n│   │   └── fib_rek(1)\n│   └── fib_rek(2)\n│       ├── fib_rek(1)\n│       └── fib_rek(0)\n└── "}
      <span style={ROT}>{"fib_rek(3)"}</span>
      {"              ← 2. Berechnung: komplett doppelte Arbeit\n    ├── fib_rek(2)\n    │   ├── fib_rek(1)\n    │   └── fib_rek(0)\n    └── fib_rek(1)"}
    </pre>
  );
}
