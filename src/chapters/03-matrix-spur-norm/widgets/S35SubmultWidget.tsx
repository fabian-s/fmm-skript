/**
 * §3.5: Submultiplikativität ‖AB‖ ≤ ‖A‖·‖B‖ an zwei frei wählbaren Matrizen.
 *
 * DIE EINE EINSICHT: Die Schranke ist keine Selbstverständlichkeit, sondern
 * eine Zusatzeigenschaft. Operator- und Schattennormen erfüllen sie (Satz
 * 3.5.5), die Maximumsnorm reißt sie schon an der Einsermatrix (Beispiel
 * 3.5.6) – weil sie den größten Eintrag ansieht und nicht die Summe, aus der
 * ein Matrixprodukt besteht.
 *
 * FARBROLLEN (Kapitel-3-Tabelle): rot = die erste Matrix A, blau = die zweite
 * Matrix B, grün = das Produkt AB. Das sind exakt die Farben \cbred, \cblue
 * und \cgreen aus Definition 3.5.4 und Beispiel 3.5.6 im Fließtext.
 *
 * INTERAKTION: Zwei Matrixeingaben (die Präzision ist hier der Punkt, es geht
 * um Gegenbeispiele), die Normwahl als Knopfreihe (eine diskrete Wahl), ein
 * Balken für den Quotienten und ein geseedeter Würfelknopf.
 *
 * PROVENIENZ: Eigenbau (2026-08-05); neu sind der geseedete Zufall, der
 * Quotientenbalken, das Verdikt und die Schätzfrage.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-03-matrix-spur-norm/
 * check-kap03.mjs, 2026-08-19): Für die Einsermatrix A = B = (1 1; 1 1) ist
 * AB = (2 2; 2 2); Spektral-, Spalten-, Zeilensummen-, Frobenius- und
 * Nuklearnorm liefern alle den Quotienten genau 1 (Schranke scharf), die
 * Maximumsnorm dagegen 2 (Beispiel 3.5.6). Über die 40 Seeds des Würfelknopfs
 * bleibt der größte Quotient bei Spektralnorm 0,9997, Spaltensummennorm
 * 1,0000, Zeilensummennorm 1,0000, Frobenius 0,9729, Nuklearnorm 0,7800 –
 * nur die Maximumsnorm reißt aus (bis 1,8235). Die Reparatur aus Bemerkung
 * 3.5.7: ‖A‖_G = 2·‖A‖_M gibt für die Einsermatrix 2 und ‖A²‖_G = 4 ≤ 4.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  MatrixInput,
  Schaetzfrage,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  W_PANEL,
  fmtDe,
  mulberry32,
  useSeed,
} from "../../../lib";

type M2 = number[][];

const ROT = FMM_COLORS.rot; // A
const BLAU = FMM_COLORS.blau; // B
const GRUEN = FMM_COLORS.gruen; // AB
const GRAU = FMM_COLORS.grau;

function matmul(a: M2, b: M2): M2 {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}

/** Singulärwerte σ₁ ≥ σ₂ ≥ 0 einer 2×2-Matrix über die Eigenwerte von AᵀA. */
function singularValues(m: M2): [number, number] {
  const p = m[0][0] * m[0][0] + m[1][0] * m[1][0];
  const q = m[0][0] * m[0][1] + m[1][0] * m[1][1];
  const r = m[0][1] * m[0][1] + m[1][1] * m[1][1];
  const half = (p + r) / 2;
  const d = Math.hypot((p - r) / 2, q);
  return [Math.sqrt(Math.max(half + d, 0)), Math.sqrt(Math.max(half - d, 0))];
}

const NORMS: { key: string; label: string; art: "operator" | "schatten" | "elementweise"; fn: (m: M2) => number }[] = [
  { key: "spec", label: "Spektralnorm ‖·‖₂", art: "operator", fn: (m) => singularValues(m)[0] },
  {
    key: "one",
    label: "Spaltensummennorm ‖·‖₁",
    art: "operator",
    fn: (m) => Math.max(Math.abs(m[0][0]) + Math.abs(m[1][0]), Math.abs(m[0][1]) + Math.abs(m[1][1])),
  },
  {
    key: "inf",
    label: "Zeilensummennorm ‖·‖∞",
    art: "operator",
    fn: (m) => Math.max(Math.abs(m[0][0]) + Math.abs(m[0][1]), Math.abs(m[1][0]) + Math.abs(m[1][1])),
  },
  {
    key: "fro",
    label: "Frobenius-Norm ‖·‖F",
    art: "schatten",
    fn: (m) => Math.hypot(m[0][0], m[0][1], m[1][0], m[1][1]),
  },
  {
    key: "nuc",
    label: "Nuklearnorm ‖·‖⁎",
    art: "schatten",
    fn: (m) => singularValues(m)[0] + singularValues(m)[1],
  },
  {
    key: "max",
    label: "Maximumsnorm ‖·‖M",
    art: "elementweise",
    fn: (m) => Math.max(...m.flat().map(Math.abs)),
  },
];

function Readout({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div
      className="flex justify-between gap-4 py-0.5"
      style={{ borderBottom: "1px solid var(--w-border)" }}
    >
      <span style={color ? { color } : undefined}>{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  );
}

/** Kleine Anzeige einer 2×2-Matrix mit farbiger Klammer. */
function MatView({ m, color }: { m: M2; color: string }) {
  return (
    <div
      className="inline-grid grid-cols-2 gap-x-2 gap-y-0.5 rounded border-x-2 px-2 py-1 font-mono text-xs tabular-nums"
      style={{ borderColor: color }}
    >
      {m.flat().map((v, i) => (
        <span key={i} className="text-right">
          {fmtDe(v, 2)}
        </span>
      ))}
    </div>
  );
}

const EINSER: M2 = [
  [1, 1],
  [1, 1],
];

export function SubmultRechner({
  normKey,
  setNormKey,
}: {
  normKey: string;
  setNormKey: (k: string) => void;
}) {
  const [A, setA] = useState<M2>(EINSER.map((r) => [...r]));
  const [B, setB] = useState<M2>(EINSER.map((r) => [...r]));
  const { seed, neueStichprobe } = useSeed(1);
  const [gewuerfelt, setGewuerfelt] = useState(false);

  const norm = NORMS.find((n) => n.key === normKey) ?? NORMS[0];
  const AB = matmul(A, B);
  const nA = norm.fn(A);
  const nB = norm.fn(B);
  const nAB = norm.fn(AB);
  const rhs = nA * nB;
  const holds = nAB <= rhs * (1 + 1e-12);
  const scharf = holds && rhs > 0 && nAB >= rhs * (1 - 1e-9);
  const ratio = rhs > 0 ? nAB / rhs : nAB > 0 ? Infinity : 0;

  // Geseedeter Würfel: derselbe Knopfdruck liefert bei gleichem Seed dasselbe Paar.
  const wuerfeln = () => {
    const rng = mulberry32(seed * 7919);
    const r = () => Math.round((rng() * 4 - 2) * 10) / 10;
    setA([
      [r(), r()],
      [r(), r()],
    ]);
    setB([
      [r(), r()],
      [r(), r()],
    ]);
    setGewuerfelt(true);
    neueStichprobe();
  };

  const balkenBreite = Math.min(1, Number.isFinite(ratio) ? ratio / 2 : 1);

  return (
    <div className="space-y-3 text-sm">
      <Aufgabe>
        Wählen wir eine Norm und suchen wir ein Paar <M>{"\\bA, \\bB"}</M>, für das der Balken über
        die 1 hinausschießt.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-5">
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold italic" style={{ color: ROT }}>
              A =
            </span>
            <MatrixInput value={A} onChange={setA} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold italic" style={{ color: BLAU }}>
              B =
            </span>
            <MatrixInput value={B} onChange={setB} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold italic" style={{ color: GRUEN }}>
              AB =
            </span>
            <MatView m={AB} color={GRUEN} />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              className={`text-xs ${W_BUTTON}`}
              onClick={() => {
                setA(EINSER.map((r) => [...r]));
                setB(EINSER.map((r) => [...r]));
                setGewuerfelt(false);
              }}
            >
              Einsermatrix (Beispiel 3.5.6)
            </button>
            <button type="button" className={`text-xs ${W_BUTTON}`} onClick={wuerfeln}>
              andere Zufallsmatrizen
            </button>
          </div>
        </div>
        <div className="min-w-[16rem] grow basis-64">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {NORMS.map((n) => (
              <button
                key={n.key}
                type="button"
                aria-pressed={n.key === normKey}
                onClick={() => setNormKey(n.key)}
                className={`text-xs ${n.key === normKey ? W_BUTTON_AKTIV : W_BUTTON}`}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className={`p-2 ${W_PANEL}`}>
            <Readout label="‖A‖" value={fmtDe(nA, 3)} color={ROT} />
            <Readout label="‖B‖" value={fmtDe(nB, 3)} color={BLAU} />
            <Readout label="‖A‖ · ‖B‖" value={fmtDe(rhs, 3)} />
            <Readout label="‖AB‖" value={fmtDe(nAB, 3)} color={GRUEN} />
            <div className="pt-2">
              <div className="mb-1 flex justify-between gap-4">
                <span>Quotient ‖AB‖ / (‖A‖·‖B‖)</span>
                <span className="font-mono tabular-nums">{fmtDe(ratio, 3)}</span>
              </div>
              <svg
                viewBox="0 0 200 22"
                className="max-w-full h-auto"
                role="img"
                aria-label={`Quotient ${fmtDe(ratio, 2)}; die Schranke 1 liegt in der Mitte des Balkens.`}
              >
                <rect x={0} y={5} width={200} height={12} fill="var(--w-grid)" rx={2} />
                <rect
                  x={0}
                  y={5}
                  width={Math.max(1, 200 * balkenBreite)}
                  height={12}
                  fill={holds ? GRUEN : ROT}
                  rx={2}
                />
                <line x1={100} y1={1} x2={100} y2={21} stroke="var(--w-text)" strokeWidth={1.5} />
                <text x={103} y={20} fontSize={9} fill="var(--w-muted)">
                  1
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Verdikt kind={holds ? (scharf ? "warn" : "ok") : "fail"}>
        {!holds ? (
          <>
            Verletzt: <M>{"\\left\\|\\bA\\bB\\right\\| ="}</M> {fmtDe(nAB, 3)} {">"}{" "}
            {fmtDe(rhs, 3)} <M>{"= \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bB\\right\\|"}</M>. Die
            Maximumsnorm liest nur den größten Eintrag ab und übersieht, dass beim Matrixprodukt
            aufsummiert wird (Beispiel 3.5.6). Satz 3.5.5 gilt für Operatornormen, und diese Norm
            ist keine. Reparieren lässt sich der Defekt mit dem Faktor{" "}
            <M>{"\\sqrt{mn}"}</M> (Bemerkung 3.5.7).
          </>
        ) : scharf ? (
          <>
            Hier steht Gleichheit: <M>{"\\left\\|\\bA\\bB\\right\\| = \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bB\\right\\|"}</M>{" "}
            = {fmtDe(nAB, 3)}. Submultiplikativität verlangt „höchstens", nicht „echt kleiner"
            (Definition 3.5.4) – die Schranke aus Satz 3.5.5 ist also scharf und lässt sich nicht
            verbessern.
          </>
        ) : (
          <>
            Erfüllt, mit Luft: {fmtDe(nAB, 3)} ≤ {fmtDe(rhs, 3)}, der Quotient liegt bei{" "}
            {fmtDe(ratio, 3)}. Für {norm.art === "operator" ? "Operatornormen ist das Satz 3.5.5" : "die Schattennormen halten wir das Resultat in Abschnitt 3.5.2 ohne Beweis fest"}
            {gewuerfelt ? "; über die Zufallspaare dieses Widgets bleibt der Quotient in dieser Norm stets unter 1" : ""}. Wie viel Luft bleibt, hängt davon ab, wie gut die
            Streckrichtungen von <M>{"\\bA"}</M> und <M>{"\\bB"}</M> zusammenpassen.
          </>
        )}
      </Verdikt>
      <p className={`text-xs ${W_MUTED}`}>
        <span style={{ color: GRAU }}>Hinweis:</span> Der Würfelknopf zieht seine Zahlen aus einem
        geseedeten Generator, dasselbe Widget zeigt also bei jedem Leser dieselbe Folge von
        Beispielen.
      </p>
    </div>
  );
}

/**
 * Der Abschnitts-Baustein: erst tippen, dann rechnen. Beim Auflösen springt die
 * Normwahl auf die Maximumsnorm – der Fall, in dem die Schranke reißt.
 */
export function S35SubmultWidget() {
  const [normKey, setNormKey] = useState("spec");
  return (
    <Schaetzfrage
      frage="Gilt ‖AB‖ ≤ ‖A‖·‖B‖ für jede Matrixnorm, oder gibt es Normen, die diese Schranke reißen?"
      variante="auswahl"
      loesung="gegenbeispiel"
      optionen={[
        { id: "immer", text: "die Schranke gilt immer" },
        { id: "gegenbeispiel", text: "es gibt Normen, die sie reißen" },
      ]}
      verdeckt={
        <p className="max-w-prose text-sm">
          Die Normwahl steht jetzt auf der Maximumsnorm, die Matrizen sind die Einsermatrix aus
          Beispiel 3.5.6.
        </p>
      }
      onAufloesen={() => setNormKey("max")}
    >
      <SubmultRechner normKey={normKey} setNormKey={setNormKey} />
    </Schaetzfrage>
  );
}
