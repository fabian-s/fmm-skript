import { useState } from "react";

/**
 * §11.1: Die Merkregel „differenzierbar ⟹ stetig, aber nicht umgekehrt" als
 * Mengendiagramm an der festen Stelle x₀ = 0.
 *
 * Eigenbau, kein portierter Code: drei fest verdrahtete Beispielfunktionen,
 * die an der Stelle 0 in den drei möglichen Bereichen liegen. Kein Zufall,
 * kein Zeitverhalten, keine numerische Auswertung.
 *
 * Farben nach dem Kapitel-11-Code (identisch zu Kapitel 10): blau steht für
 * die Funktion und ihre Werte, und Stetigkeit ist eine Aussage über
 * Funktionswerte; grün steht für den Ableitungsterm, und Differenzierbarkeit
 * ist die Existenz genau dieses Terms.
 */

const BLAU = "#0072B2"; // Stetigkeit (Aussage über Funktionswerte)
const GRUEN = "#009E73"; // Differenzierbarkeit (Existenz des Ableitungsterms)
const NEUTRAL = "#64748b";
const TEXT = "#1e293b";

interface Fall {
  id: string;
  knopf: string;
  marke: string;
  x: number;
  y: number;
  farbe: string;
  status: string;
}

const FAELLE: Fall[] = [
  {
    id: "quadrat",
    knopf: "f(x) = x²",
    marke: "x²",
    x: 148,
    y: 106,
    farbe: GRUEN,
    status:
      "Wir stehen im grünen Bereich: x² ist in 0 differenzierbar mit f′(0) = 0. " +
      "Nach Satz 11.1.2 ist die Funktion dort dann auch stetig, und deshalb liegt " +
      "der grüne Bereich vollständig im blauen.",
  },
  {
    id: "betrag",
    knopf: "f(x) = |x|",
    marke: "|x|",
    x: 344,
    y: 106,
    farbe: BLAU,
    status:
      "Wir stehen im blauen Ring: |x| ist in 0 stetig, der Differenzenquotient strebt " +
      "aber von rechts gegen +1 und von links gegen −1 (Beispiel 11.1.3). Der Ring ist " +
      "nicht leer, und deshalb dürfen wir die Merkregel nicht umdrehen.",
  },
  {
    id: "sprung",
    knopf: "H(x) = 1 für x ≥ 0, sonst 0",
    marke: "H",
    x: 215,
    y: 200,
    farbe: NEUTRAL,
    status:
      "Wir stehen außerhalb: H springt in 0 von 0 auf 1 und ist dort nicht stetig. " +
      "Nach Satz 11.1.2 kann H in 0 damit auch nicht differenzierbar sein, denn sonst " +
      "müsste die Funktion dort stetig sein.",
  },
];

export function MerkregelDiagramm() {
  const [fallId, setFallId] = useState("betrag");
  const fall = FAELLE.find((f) => f.id === fallId) ?? FAELLE[0];

  const knopf = (aktiv: boolean) =>
    `rounded border px-2 py-1 text-sm ${
      aktiv
        ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
        : "border-slate-300 dark:border-slate-600"
    }`;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {FAELLE.map((f) => (
          <button
            key={f.id}
            type="button"
            className={knopf(f.id === fallId)}
            onClick={() => setFallId(f.id)}
          >
            {f.knopf}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded bg-white p-2">
        <svg viewBox="0 0 440 236" className="mx-auto block w-full max-w-[440px]">
          <rect x="0" y="0" width="440" height="236" fill="#ffffff" />

          <text x="12" y="18" fontSize="12" fill={NEUTRAL}>
            an der Stelle x₀ = 0
          </text>

          <ellipse
            cx="215"
            cy="100"
            rx="200"
            ry="82"
            fill={BLAU}
            fillOpacity="0.10"
            stroke={BLAU}
            strokeWidth="1.5"
          />
          <ellipse
            cx="148"
            cy="104"
            rx="116"
            ry="56"
            fill={GRUEN}
            fillOpacity="0.16"
            stroke={GRUEN}
            strokeWidth="1.5"
          />

          {/* Beide Beschriftungen liegen ganz INNERHALB ihres Bereichs: das
              Textrechteck um (320, 70) bzw. (148, 70) erfüllt für die blaue
              Ellipse (x-215)²/200² + (y-100)²/82² < 1, für die grüne
              (x-148)²/116² + (y-104)²/56² < 1; die Stelle x₀ = 0 steht einmal
              oben statt in beiden Beschriftungen. */}
          <text
            x="320"
            y="70"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill={BLAU}
          >
            stetig
          </text>
          <text
            x="148"
            y="70"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill={GRUEN}
          >
            differenzierbar
          </text>

          {FAELLE.map((f) => {
            const aktiv = f.id === fallId;
            return (
              <g key={f.id}>
                <circle
                  cx={f.x}
                  cy={f.y}
                  r={aktiv ? 17 : 14}
                  fill="#ffffff"
                  stroke={aktiv ? f.farbe : NEUTRAL}
                  strokeWidth={aktiv ? 2.5 : 1.2}
                />
                <text
                  x={f.x}
                  y={f.y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight={aktiv ? 700 : 400}
                  fill={aktiv ? TEXT : NEUTRAL}
                >
                  {f.marke}
                </text>
              </g>
            );
          })}

          <text x="215" y="230" textAnchor="middle" fontSize="12" fill={NEUTRAL}>
            weder stetig noch differenzierbar
          </text>
        </svg>
      </div>

      <p className="max-w-prose text-sm">{fall.status}</p>
    </div>
  );
}
