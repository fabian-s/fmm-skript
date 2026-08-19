import { W_MUTED } from "../../../lib";
import { FMM_COLORS } from "../../../lib";

/**
 * §11.1: Die EINE Einsicht — differenzierbar ⟹ stetig, aber nicht umgekehrt;
 * der Ring zwischen den beiden Bereichen ist nicht leer.
 *
 * Dies ist bewusst KEIN Explorable, sondern eine statische Tafel (Muster 11
 * aus design-patterns.md, „don't build a widget"): Es gibt keine stetige Größe
 * zu verstellen, alle drei instruktiven Zustände passen nebeneinander ins Bild,
 * und ein Umschalter hätte nur verdeckt, was ohnehin gleichzeitig sichtbar sein
 * soll. Die frühere Knopfversion (drei Fälle nacheinander) ist damit abgelöst;
 * die Interaktivität dieses Abschnitts steckt jetzt im Zoom-Widget
 * `S111Zoom.tsx`. Die Fallunterscheidung trägt der Fließtext.
 *
 * Eigenbau, kein portierter Code. Nichts zu rechnen: drei fest verdrahtete
 * Beispielfunktionen an der Stelle 0, keine Auswertung, kein Zufall, kein
 * Zeitverhalten. Die einzigen Zahlen im Bild sind die einseitigen
 * Differenzenquotienten ±1 von |x| aus Beispiel 11.1.3, nachgerechnet in
 * scratchpad/verify-11-ableitungen-2/check-s111.mjs (2026-08-19): für h = 0,5,
 * 0,01 und 10⁻⁸ steht rechts exakt +1 und links exakt −1.
 *
 * Farbrollen Kapitel 11 (= Kapitel 10): Blau steht für die Funktion und ihre
 * Werte, und Stetigkeit ist eine Aussage über Funktionswerte; Grün steht für
 * den Ableitungsterm, und Differenzierbarkeit ist die Existenz genau dieses
 * Terms.
 */

const BLAU = FMM_COLORS.blau; // Stetigkeit (Aussage über Funktionswerte)
const GRUEN = FMM_COLORS.gruen; // Differenzierbarkeit (Existenz des Ableitungsterms)

interface Fall {
  id: string;
  marke: string;
  /** Position im Mengendiagramm */
  x: number;
  y: number;
  farbe: string;
  /** Graph im kleinen Vorschaufenster, Weltkoordinaten [-1, 1] */
  kurve: (t: number) => number;
  /** Sprungstelle: getrennt gezeichnete Äste */
  sprung?: boolean;
  bildTitel: string;
}

const FAELLE: Fall[] = [
  {
    id: "quadrat",
    marke: "x²",
    x: 148,
    y: 106,
    farbe: GRUEN,
    kurve: (t) => t * t,
    bildTitel: "f(x) = x²",
  },
  {
    id: "betrag",
    marke: "|x|",
    x: 344,
    y: 106,
    farbe: BLAU,
    kurve: (t) => Math.abs(t),
    bildTitel: "f(x) = |x|",
  },
  {
    id: "sprung",
    marke: "H",
    x: 215,
    y: 206,
    farbe: FMM_COLORS.grau,
    kurve: (t) => (t >= 0 ? 1 : 0),
    sprung: true,
    bildTitel: "H(x) = 1 für x ≥ 0, sonst 0",
  },
];

/** Kleines Vorschaufenster: der Graph auf [−1, 1] mit Achsenkreuz. */
function Vorschau({ fall }: { fall: Fall }) {
  const S = 92;
  const px = (t: number) => 6 + ((t + 1) / 2) * (S - 12);
  const py = (v: number) => S - 10 - ((v + 0.35) / 1.7) * (S - 20);
  const ast = (a: number, b: number) => {
    const teile: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = a + ((b - a) * i) / 40;
      teile.push(`${i === 0 ? "M" : "L"}${px(t).toFixed(1)},${py(fall.kurve(t)).toFixed(1)}`);
    }
    return teile.join(" ");
  };
  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${S} ${S}`}
        width={S}
        height={S}
        role="img"
        aria-label={`Der Graph von ${fall.bildTitel} in der Nähe von null.`}
        className="h-auto max-w-full rounded border"
        style={{ background: "var(--w-bg)", borderColor: "var(--w-border)" }}
      >
        <line x1={px(-1)} x2={px(1)} y1={py(0)} y2={py(0)} stroke="var(--w-axis)" strokeWidth={0.8} />
        <line x1={px(0)} x2={px(0)} y1={6} y2={S - 6} stroke="var(--w-axis)" strokeWidth={0.8} />
        {fall.sprung ? (
          <>
            <path d={ast(-1, -0.02)} fill="none" stroke={BLAU} strokeWidth={2.2} />
            <path d={ast(0.02, 1)} fill="none" stroke={BLAU} strokeWidth={2.2} />
            <circle cx={px(0)} cy={py(0)} r={2.6} fill="var(--w-bg)" stroke={BLAU} strokeWidth={1.4} />
            <circle cx={px(0)} cy={py(1)} r={2.6} fill={BLAU} />
          </>
        ) : (
          <path d={ast(-1, 1)} fill="none" stroke={BLAU} strokeWidth={2.2} />
        )}
      </svg>
      <figcaption className={`mt-0.5 text-center text-[11px] ${W_MUTED}`}>{fall.bildTitel}</figcaption>
    </figure>
  );
}

export function MerkregelDiagramm() {
  return (
    <div className="space-y-3">
      <div className="rounded p-2" style={{ background: "var(--w-bg)" }}>
        <svg
          viewBox="0 0 440 252"
          role="img"
          aria-label="Mengendiagramm an der Stelle null: der Bereich der differenzierbaren Funktionen liegt vollständig im Bereich der stetigen; x Quadrat liegt innen, der Betrag im Ring dazwischen, die Sprungfunktion außerhalb."
          className="mx-auto block h-auto w-full max-w-[440px]"
        >
          <text x="12" y="18" fontSize="12" fill="var(--w-muted)">
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
          <text x="320" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill={BLAU}>
            stetig
          </text>
          <text x="148" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill={GRUEN}>
            differenzierbar
          </text>

          {FAELLE.map((f) => (
            <g key={f.id}>
              <circle
                cx={f.x}
                cy={f.y}
                r={17}
                fill="var(--w-bg)"
                stroke={f.farbe}
                strokeWidth={2.2}
              />
              <text
                x={f.x}
                y={f.y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight={700}
                fill="var(--w-text)"
              >
                {f.marke}
              </text>
            </g>
          ))}

          <text x="215" y="246" textAnchor="middle" fontSize="12" fill="var(--w-muted)">
            weder stetig noch differenzierbar
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {FAELLE.map((f) => (
          <Vorschau key={f.id} fall={f} />
        ))}
      </div>
    </div>
  );
}
