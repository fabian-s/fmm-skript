import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, M, Slider, Stepper, Verdikt, fmtDe as fmt } from "../../../lib";
import { W_MUTED } from "../../../lib/widgets/surface";

/**
 * §10.3: Backpropagation an einem winzigen Netz mit zwei Schichten.
 *
 * Code-Vorlage sind CompGraph und BackpropWidget aus
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S56.tsx: Knoten
 * als Kreise auf einer Kette, Operationskästen auf den Kanten, Vorwärtswerte
 * unter den Knoten, Adjungierte darüber, ein Ring um den aktiven Knoten,
 * Schrittsteuerung mit vor/zurück/Reset. Übernommen ist nur diese Mechanik;
 * Kette, Zahlen und sämtliche Texte sind neu und gehören zu diesem Abschnitt.
 *
 * Netz:  x = (x1, 2)^T  ->  a1 = W1 x  ->  z1 = max(0, a1)  ->  yhat = W2 z1
 *        ->  L = 1/2 (yhat - y)^2,   W1 = (1 -1; 0,5 1), W2 = (2 -1), y = 1.
 *
 * EINE EINSICHT: Rückwärts wird nie Matrix mal Matrix gerechnet, sondern
 * immer die aktuelle ZEILE mal die nächste Jacobimatrix — und die Kette für
 * W_1 endet bei J_{f_2}(z_1), nicht erst bei J_{f_1} (Bemerkung 10.3.11).
 *
 * FARBROLLEN (Kapitel 10): Vorwärtswerte blau (Funktionswerte),
 * Ableitungsobjekte/Adjungierte orange (wie Gradient und Jacobimatrix in
 * S102/S103). Rot (Restterm) und Gruen (Linearisierung) kommen hier nicht vor;
 * die Warnung an der Knickstelle traegt das <Verdikt kind="warn">.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen, bei x1 = 1:
 * a1 = (-1; 2,5), z1 = (0; 2,5), yhat = -2,5, L = 6,125, dL/dyhat = -3,5,
 * dL/dz1 = (-7, 3,5), dL/da1 = (0, 3,5), dL/dW2 = (0, -8,75),
 * dL/dW1 = (0 0; 3,5 7) - beide Parametergradienten stimmen mit zentralen
 * Differenzenquotienten (Schrittweite 1e-6) bis 4,9e-10 überein.
 */

const BLAU = FMM_COLORS.blau; // Vorwärtswerte
const ORANGE = FMM_COLORS.orange; // Ableitungsobjekte (Adjungierte)

const W1: [[number, number], [number, number]] = [
  [1, -1],
  [0.5, 1],
];
const W2: [number, number] = [2, -1];
const X2 = 2;
const ZIEL = 1;

const paar = (a: number, b: number) => `(${fmt(a)}; ${fmt(b)})`;

type Knoten = "x" | "a" | "z" | "y" | "L";

const POS: Record<Knoten, number> = { x: 40, a: 160, z: 280, y: 400, L: 520 };
const MITTE = 92;
const BESCHRIFTUNG: Record<Knoten, string> = {
  x: "x",
  a: "a₁",
  z: "z₁",
  y: "ŷ",
  L: "L",
};
const OPS: [Knoten, Knoten, string][] = [
  ["x", "a", "W₁ ·"],
  ["a", "z", "max(0, ·)"],
  ["z", "y", "W₂ ·"],
  ["y", "L", "½(· − y)²"],
];

function Graph({
  werte,
  adjungierte,
  aktiv,
}: {
  werte: Partial<Record<Knoten, string>>;
  adjungierte: Partial<Record<Knoten, string>>;
  aktiv: { knoten: Knoten; phase: "vorwaerts" | "rueckwaerts" } | null;
}) {
  const R = 19;
  return (
    <svg
      viewBox="0 0 560 190"
      className="h-auto w-full max-w-[560px] rounded"
      role="img"
      aria-label="Rechengraph des kleinen Netzes: Eingabe, erste Schicht, ReLU, zweite Schicht und Verlust; unter den Knoten die Vorwärtswerte, darüber die Adjungierten."
      style={{ border: "1px solid var(--w-border, #cbd5e1)", background: "var(--w-bg, #ffffff)" }}
    >
      <defs>
        <marker id="s103-bp-pfeil" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--w-axis, #64748b)" />
        </marker>
      </defs>
      {OPS.map(([a, b, label]) => {
        const x1 = POS[a] + R + 3;
        const x2 = POS[b] - R - 6;
        const cx = (POS[a] + POS[b]) / 2;
        return (
          <g key={label}>
            <line
              x1={x1}
              y1={MITTE}
              x2={x2}
              y2={MITTE}
              stroke="var(--w-axis, #64748b)"
              strokeWidth={1.5}
              markerEnd="url(#s103-bp-pfeil)"
            />
            <rect
              x={cx - 30}
              y={MITTE - 12}
              width={60}
              height={24}
              rx={4}
              fill="var(--w-grid, #e2e8f0)"
              stroke="var(--w-border, #94a3b8)"
              strokeWidth={1.1}
            />
            <text x={cx} y={MITTE + 5} fontSize={13} fill="var(--w-text, #334155)" textAnchor="middle">
              {label}
            </text>
          </g>
        );
      })}
      {(Object.keys(POS) as Knoten[]).map((k) => {
        const cx = POS[k];
        const ring = aktiv?.knoten === k;
        return (
          <g key={k}>
            {ring && (
              <circle
                cx={cx}
                cy={MITTE}
                r={R + 4}
                fill="none"
                stroke={aktiv?.phase === "rueckwaerts" ? ORANGE : BLAU}
                strokeWidth={2.5}
              />
            )}
            <circle cx={cx} cy={MITTE} r={R} fill="var(--w-grid, #f1f5f9)" stroke="var(--w-axis, #64748b)" strokeWidth={1.3} />
            <text
              x={cx}
              y={MITTE + 5}
              fontSize={16}
              fill="var(--w-text, #334155)"
              textAnchor="middle"
              fontStyle="italic"
            >
              {BESCHRIFTUNG[k]}
            </text>
            {werte[k] !== undefined && (
              <text
                x={cx}
                y={MITTE + R + 18}
                fontSize={12}
                fill={BLAU}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
              >
                {werte[k]}
              </text>
            )}
            {adjungierte[k] !== undefined && (
              <text
                x={cx}
                y={MITTE - R - 10}
                fontSize={12}
                fill={ORANGE}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
              >
                {adjungierte[k]}
              </text>
            )}
          </g>
        );
      })}
      <text x={8} y={16} fontSize={12} fill={ORANGE}>
        ∂L/∂(Knoten)
      </text>
      <text x={8} y={184} fontSize={12} fill={BLAU}>
        Werte
      </text>
    </svg>
  );
}

export function BackpropWidget() {
  const [x1, setX1] = useState(1);
  const [schritt, setSchritt] = useState(0);

  const v = useMemo(() => {
    const x: [number, number] = [x1, X2];
    const a: [number, number] = [
      W1[0][0] * x[0] + W1[0][1] * x[1],
      W1[1][0] * x[0] + W1[1][1] * x[1],
    ];
    const ind: [number, number] = [a[0] > 0 ? 1 : 0, a[1] > 0 ? 1 : 0];
    const z: [number, number] = [Math.max(0, a[0]), Math.max(0, a[1])];
    const yh = W2[0] * z[0] + W2[1] * z[1];
    const L = 0.5 * (yh - ZIEL) ** 2;
    const dy = yh - ZIEL;
    const dz: [number, number] = [dy * W2[0], dy * W2[1]];
    const da: [number, number] = [dz[0] * ind[0], dz[1] * ind[1]];
    const dW2: [number, number] = [dy * z[0], dy * z[1]];
    const dW1 = [
      [da[0] * x[0], da[0] * x[1]],
      [da[1] * x[0], da[1] * x[1]],
    ];
    const knick = Math.abs(a[0]) < 1e-12 || Math.abs(a[1]) < 1e-12;
    return { x, a, ind, z, yh, L, dy, dz, da, dW2, dW1, knick };
  }, [x1]);

  const schritte: { knoten: Knoten; phase: "vorwaerts" | "rueckwaerts"; tex: string }[] = [
    {
      knoten: "a",
      phase: "vorwaerts",
      tex: `\\boldsymbol{a}_1 = \\boldsymbol{W}_1\\boldsymbol{x} = (${fmt(v.a[0])};\\ ${fmt(v.a[1])})^\\top`,
    },
    {
      knoten: "z",
      phase: "vorwaerts",
      tex: `\\boldsymbol{z}_1 = \\max(\\boldsymbol{0}, \\boldsymbol{a}_1) = (${fmt(v.z[0])};\\ ${fmt(v.z[1])})^\\top`,
    },
    {
      knoten: "y",
      phase: "vorwaerts",
      tex: `\\hat{y} = \\boldsymbol{W}_2\\boldsymbol{z}_1 = ${fmt(v.yh)}`,
    },
    {
      knoten: "L",
      phase: "vorwaerts",
      tex: `L = \\tfrac12(\\hat{y} - y)^2 = \\tfrac12(${fmt(v.yh)} - ${fmt(ZIEL)})^2 = ${fmt(v.L)}`,
    },
    {
      knoten: "y",
      phase: "rueckwaerts",
      tex: `\\frac{\\partial L}{\\partial \\hat{y}} = \\hat{y} - y = ${fmt(v.dy)}`,
    },
    {
      knoten: "z",
      phase: "rueckwaerts",
      tex: `\\frac{\\partial L}{\\partial \\boldsymbol{z}_1} = \\frac{\\partial L}{\\partial \\hat{y}}\\,\\boldsymbol{W}_2 = (${fmt(v.dz[0])},\\ ${fmt(v.dz[1])})`,
    },
    {
      knoten: "z",
      phase: "rueckwaerts",
      tex: `\\frac{\\partial L}{\\partial \\boldsymbol{W}_2} = \\frac{\\partial L}{\\partial \\hat{y}}\\,\\boldsymbol{z}_1^\\top = (${fmt(v.dW2[0])},\\ ${fmt(v.dW2[1])})`,
    },
    {
      knoten: "a",
      phase: "rueckwaerts",
      tex: `\\frac{\\partial L}{\\partial \\boldsymbol{a}_1} = \\frac{\\partial L}{\\partial \\boldsymbol{z}_1}\\,\\operatorname{diag}(${v.ind[0]}, ${v.ind[1]}) = (${fmt(v.da[0])},\\ ${fmt(v.da[1])})`,
    },
    {
      knoten: "x",
      phase: "rueckwaerts",
      tex: `\\frac{\\partial L}{\\partial \\boldsymbol{W}_1} = \\left(\\frac{\\partial L}{\\partial \\boldsymbol{a}_1}\\right)^\\top \\boldsymbol{x}^\\top = \\begin{pmatrix} ${fmt(v.dW1[0][0])} & ${fmt(v.dW1[0][1])} \\\\ ${fmt(v.dW1[1][0])} & ${fmt(v.dW1[1][1])} \\end{pmatrix}`,
    },
  ];

  const werte: Partial<Record<Knoten, string>> = { x: paar(v.x[0], v.x[1]) };
  const adjungierte: Partial<Record<Knoten, string>> = {};
  const vorwaerts: [Knoten, string][] = [
    ["a", paar(v.a[0], v.a[1])],
    ["z", paar(v.z[0], v.z[1])],
    ["y", fmt(v.yh)],
    ["L", fmt(v.L)],
  ];
  vorwaerts.forEach(([k, s], i) => {
    if (schritt >= i + 1) werte[k] = s;
  });
  if (schritt >= 5) {
    adjungierte.L = "1";
    adjungierte.y = fmt(v.dy);
  }
  if (schritt >= 6) adjungierte.z = `(${fmt(v.dz[0])}, ${fmt(v.dz[1])})`;
  if (schritt >= 8) adjungierte.a = `(${fmt(v.da[0])}, ${fmt(v.da[1])})`;

  const aktuell = schritt > 0 ? schritte[schritt - 1] : null;
  const fertig = schritt >= schritte.length;
  const phasentext =
    schritt === 0
      ? "Noch ist nur die Eingabe gesetzt; der erste Klick wertet die erste Schicht aus."
      : schritt <= 4
        ? `Vorwärtslauf, Schritt ${schritt} von 4: eine Schicht weiter zur Vorhersage und zum Verlust.`
        : `Rückwärtslauf, Schritt ${schritt - 4} von 5: von L aus nach links, unterwegs fallen die beiden Parameter-Ableitungen ab.`;

  return (
    <div className="space-y-3">
      <Aufgabe>
        Laufen wir mit dem Schrittregler erst vorwärts durch das Netz und dann rückwärts
        zurück, und verschieben wir x₁ so, dass eine ReLU-Einheit umschaltet.
      </Aufgabe>
      <Graph
        werte={werte}
        adjungierte={adjungierte}
        aktiv={aktuell ? { knoten: aktuell.knoten, phase: aktuell.phase } : null}
      />
      <div className={`flex flex-wrap gap-x-5 gap-y-1 text-xs ${W_MUTED}`}>
        <span style={{ color: BLAU }}>▬&nbsp;Vorwärtswerte unter den Knoten</span>
        <span style={{ color: ORANGE }}>▬&nbsp;Adjungierte ∂L/∂(Knoten) darüber</span>
      </div>
      {aktuell && (
        <div className="overflow-x-auto rounded bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800 [.w-dark_&]:bg-slate-800">
          <M>{aktuell.tex}</M>
        </div>
      )}
      <Slider
        label="Eingabe x₁"
        value={x1}
        onChange={(v) => setX1(Math.round(v * 20) / 20)}
        min={-1}
        max={4}
        step={0.05}
        fmt={(v) => fmt(v)}
      />
      <Stepper step={schritt} setStep={setSchritt} max={schritte.length} narration={phasentext} />
      <Verdikt kind={v.knick ? "warn" : fertig ? "ok" : "neutral"}>
        {v.knick ? (
          <>
            Hier ist eine Komponente von <M>{"\\boldsymbol{a}_1"}</M> exakt null. Dort hat
            <M>{"\\ \\max(0, \\cdot)"}</M> einen Knick und ist nicht differenzierbar; die Anzeige
            benutzt die übliche Verabredung, die Ableitung dort auf null zu setzen. Beispiel
            10.3.12 sagt genau das: die Jacobimatrix einer ReLU-Schicht ist
            <M>{"\\ \\operatorname{diag}(\\mathbb{1}\\{a_i > 0\\})"}</M>, und auf der Kante
            ist die Wahl Konvention, nicht Mathematik.
          </>
        ) : fertig ? (
          <>
            Der ganze Rückwärtslauf steht da. Multipliziert wurde nie eine Matrix mit einer
            Matrix, sondern immer die aktuelle Zeile mit der nächsten Jacobimatrix, und das ist
            die Auswertungsreihenfolge aus Bemerkung 10.3.13. Und die Kette für{" "}
            <M>{"\\boldsymbol{W}_1"}</M> endet bei
            <M>{"\\ \\boldsymbol{J}_{f_2}(\\boldsymbol{z}_1) = \\boldsymbol{W}_2"}</M>; der
            letzte Faktor ist die Ableitung der ersten Schicht nach ihren eigenen Gewichten,
            nicht noch einmal <M>{"\\boldsymbol{W}_1"}</M> (Bemerkung 10.3.11).
          </>
        ) : schritt === 0 ? (
          <>
            Ausgangslage: nur die Eingabe <M>{`\\boldsymbol{x} = (${fmt(v.x[0])};\\ ${fmt(v.x[1])})^\\top`}</M>{" "}
            steht fest. Vorwärts entstehen erst die Werte, rückwärts danach die Ableitungen,
            beides in derselben Kette, aber in umgekehrter Richtung.
          </>
        ) : schritt <= 4 ? (
          <>
            Vorwärtslauf: Bisher sind nur Funktionswerte entstanden (blau). Der aktuelle
            Verlust wäre <M>{`L = ${fmt(v.L)}`}</M>; Ableitungen gibt es noch keine, denn die
            Kettenregel (10.3.2) beginnt am Ende der Kette.
          </>
        ) : (
          <>
            Rückwärtslauf, Schritt {schritt - 4} von 5: Die orangen Zeilen wandern von rechts
            nach links. Jede entsteht aus der vorigen durch Multiplikation mit einer
            Jacobimatrix, so wie es Satz 10.3.9 vorgibt; abgezweigt werden dabei
            <M>{"\\ \\partial L/\\partial \\boldsymbol{W}_2"}</M> und
            <M>{"\\ \\partial L/\\partial \\boldsymbol{W}_1"}</M>.
          </>
        )}
      </Verdikt>
    </div>
  );
}
