/**
 * Widget für §3.5 „Eigenschaften von Matrixnormen":
 * Submultiplikativitäts-Check. Zwei editierbare 2×2-Matrizen A und B,
 * wählbare Matrixnorm; das Widget vergleicht ‖AB‖ mit ‖A‖·‖B‖.
 * Für Operator-, Schatten- und Frobenius-Norm gilt stets ‖AB‖ ≤ ‖A‖·‖B‖;
 * die Maximumsnorm kann die Ungleichung verletzen (Beispiel 3.5.6).
 *
 * Farbcode, konsistent mit dem Fließtext (FMM-Palette):
 * A rot · B blau · Produkt AB grün.
 */
import { useState } from "react";
import { M, MatrixInput } from "../../../lib";

type M2 = number[][];

const COL = {
  A: "#D55E00", // fmmred
  B: "#0072B2", // fmmblue
  AB: "#009E73", // fmmgreen
  neutral: "#64748b", // slate-500, lesbar in hell und dunkel
};

function matmul(a: M2, b: M2): M2 {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}

/** Singulärwerte σ₁ ≥ σ₂ ≥ 0 einer 2×2-Matrix über die Eigenwerte von AᵀA. */
function singularValues(m: M2): [number, number] {
  const p = m[0][0] * m[0][0] + m[1][0] * m[1][0]; // (AᵀA)₁₁
  const q = m[0][0] * m[0][1] + m[1][0] * m[1][1]; // (AᵀA)₁₂
  const r = m[0][1] * m[0][1] + m[1][1] * m[1][1]; // (AᵀA)₂₂
  const half = (p + r) / 2;
  const d = Math.sqrt(((p - r) / 2) * ((p - r) / 2) + q * q);
  return [Math.sqrt(Math.max(half + d, 0)), Math.sqrt(Math.max(half - d, 0))];
}

const NORMS: { key: string; label: string; fn: (m: M2) => number }[] = [
  { key: "spec", label: "Spektralnorm ‖·‖₂", fn: (m) => singularValues(m)[0] },
  {
    key: "one",
    label: "Spaltensummennorm ‖·‖₁",
    fn: (m) => Math.max(Math.abs(m[0][0]) + Math.abs(m[1][0]), Math.abs(m[0][1]) + Math.abs(m[1][1])),
  },
  {
    key: "inf",
    label: "Zeilensummennorm ‖·‖∞",
    fn: (m) => Math.max(Math.abs(m[0][0]) + Math.abs(m[0][1]), Math.abs(m[1][0]) + Math.abs(m[1][1])),
  },
  {
    key: "fro",
    label: "Frobenius-Norm ‖·‖F",
    fn: (m) => Math.hypot(m[0][0], m[0][1], m[1][0], m[1][1]),
  },
  {
    key: "nuc",
    label: "Nuklearnorm ‖·‖⁎",
    fn: (m) => singularValues(m)[0] + singularValues(m)[1],
  },
  { key: "max", label: "Maximumsnorm ‖·‖M", fn: (m) => Math.max(...m.flat().map(Math.abs)) },
];

const fmt = (v: number): string => {
  if (v === 0) return "0";
  const a = Math.abs(v);
  return a >= 0.001 && a < 10000 ? v.toPrecision(4) : v.toExponential(2);
};

function Readout({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 py-0.5 last:border-b-0 dark:border-slate-700">
      <span style={color ? { color } : undefined}>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

/** Kleine Anzeige einer 2×2-Matrix mit farbiger Klammer. */
function MatView({ m, color }: { m: M2; color: string }) {
  return (
    <div
      className="inline-grid grid-cols-2 gap-x-2 gap-y-0.5 rounded border-x-2 px-2 py-1 font-mono text-xs"
      style={{ borderColor: color }}
    >
      {m.flat().map((v, i) => (
        <span key={i} className="text-right">
          {fmt(v)}
        </span>
      ))}
    </div>
  );
}

export function S35SubmultWidget() {
  const [A, setA] = useState<M2>([
    [1, 1],
    [1, 1],
  ]);
  const [B, setB] = useState<M2>([
    [1, 1],
    [1, 1],
  ]);
  const [normKey, setNormKey] = useState("max");

  const norm = NORMS.find((n) => n.key === normKey) ?? NORMS[0];
  const AB = matmul(A, B);
  const nA = norm.fn(A);
  const nB = norm.fn(B);
  const nAB = norm.fn(AB);
  const rhs = nA * nB;
  const holds = nAB <= rhs * (1 + 1e-12);
  const ratio = rhs > 0 ? nAB / rhs : nAB > 0 ? Infinity : 0;

  const rand = () => {
    const r = () => Math.round((Math.random() * 4 - 2) * 10) / 10;
    setA([
      [r(), r()],
      [r(), r()],
    ]);
    setB([
      [r(), r()],
      [r(), r()],
    ]);
  };

  return (
    <div className="text-sm">
      <div className="flex flex-wrap items-start gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold italic" style={{ color: COL.A }}>
              A =
            </span>
            <MatrixInput value={A} onChange={setA} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold italic" style={{ color: COL.B }}>
              B =
            </span>
            <MatrixInput value={B} onChange={setB} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold italic" style={{ color: COL.AB }}>
              AB =
            </span>
            <MatView m={AB} color={COL.AB} />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => {
                setA([
                  [1, 1],
                  [1, 1],
                ]);
                setB([
                  [1, 1],
                  [1, 1],
                ]);
              }}
            >
              Gegenbeispiel: A = B = Einsermatrix
            </button>
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={rand}
            >
              Zufallsmatrizen
            </button>
          </div>
        </div>
        <div className="min-w-[16rem] grow basis-64">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {NORMS.map((n) => (
              <button
                key={n.key}
                type="button"
                onClick={() => setNormKey(n.key)}
                className={
                  "rounded border px-2 py-1 text-xs " +
                  (n.key === normKey
                    ? "border-slate-600 bg-slate-600 text-white dark:border-slate-300 dark:bg-slate-300 dark:text-slate-900"
                    : "border-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700")
                }
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="rounded bg-slate-100 p-2 dark:bg-slate-800">
            <Readout label="‖A‖" value={fmt(nA)} color={COL.A} />
            <Readout label="‖B‖" value={fmt(nB)} color={COL.B} />
            <Readout label="‖A‖ · ‖B‖" value={fmt(rhs)} />
            <Readout label="‖AB‖" value={fmt(nAB)} color={COL.AB} />
            <Readout label="Quotient ‖AB‖ / (‖A‖·‖B‖)" value={fmt(ratio)} />
          </div>
          <p
            className="mt-2 font-medium"
            style={{ color: holds ? COL.AB : COL.A }}
          >
            {holds
              ? "Submultiplikativität erfüllt: ‖AB‖ ≤ ‖A‖ · ‖B‖."
              : "Verletzt: ‖AB‖ > ‖A‖ · ‖B‖ — diese Norm ist nicht submultiplikativ!"}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Probieren wir es aus: Für Spektral-, Spaltensummen-, Zeilensummen-,
            Frobenius- und Nuklearnorm bleibt der Quotient bei jeder Wahl von{" "}
            <M>{"\\bA"}</M> und <M>{"\\bB"}</M> höchstens 1 — diese Normen sind
            submultiplikativ (Satz 3.5.5 bzw. die Bemerkung zu den
            Schatten-Normen). Nur die Maximumsnorm kann die
            Schranke reißen: Schon die Einsermatrix aus Beispiel 3.5.6 liefert
            den Quotienten 2. Interessant ist auch, <em>wie viel</em> Luft die
            Schranke lässt: Für viele Matrizenpaare ist ‖AB‖ deutlich kleiner
            als ‖A‖·‖B‖.
          </p>
        </div>
      </div>
    </div>
  );
}
