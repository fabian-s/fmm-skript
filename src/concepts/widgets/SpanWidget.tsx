/**
 * QA-L3-Nachprüfung: `scripts/verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 * Konzept-Widget für `span` UND `subspace` (Dublettenauflösung D6,
 * 2026-08-19; das frühere SubspaceWidget ist entfallen).
 *
 * DIE EINE EINSICHT: Die lineare Hülle ist nicht eine Formel, sondern eine
 * erreichbare Menge — und die ist genau so groß, wie die Vektoren unabhängige
 * Richtungen liefern: eine Gerade durch den Ursprung, die ganze Ebene, sonst
 * nichts. Eine verschobene Gerade ist deshalb kein Untervektorraum.
 *
 * VARIANTEN: `variante="span"` bietet Gerade und Ebene an,
 * `variante="unterraum"` zusätzlich die verschobene Gerade als Gegenbeispiel.
 *
 * FARBROLLEN: blau = die aufspannenden Vektoren v₁, v₂; orange = die
 * erreichbare Menge (Gerade bzw. Fläche); violett = der gezogene Punkt c₁v₁+c₂v₂;
 * grau = der Testvektor w, der außerhalb liegen kann.
 *
 * PROVENIENZ: Vektor- und Reglerlayout aus den Vorgängerwidgets SpanWidget und
 * SubspaceWidget (Stand 2026-08-18); Ziehen, Achsen und Unterraumgeraden
 * kommen aus der Lib-`TransformCanvas`. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV2/SpanWidget.mjs,
 * 2026-08-20), v₁ = (2, 1), v₂ = (−1, 1), w = (−1; 1,8), Aufhängepunkt der
 * verschobenen Geraden p = (0; 1,5):
 *   det[v₁ v₂] = 3, also sind v₁, v₂ eine Basis des R²;
 *   w = 0,2667·v₁ + 1,5333·v₂ (Probe: (−1; 1,8) auf 1e−6 genau);
 *   Projektion von w auf span{v₁}: t = −0,0400, Abstand 2,0572 — w liegt also
 *   nicht auf der Geraden;
 *   die verschobene Gerade hat vom Ursprung den Abstand 1,3416 = |p×v₁|/‖v₁‖,
 *   enthält die 0 also nicht, und für A = (0; 1,5), B = (2; 2,5) auf ihr liegt
 *   A + B = (2; 4) nicht mehr darauf.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  fmtDe,
} from "../../lib";

const IDENT: [[number, number], [number, number]] = [
  [1, 0],
  [0, 1],
];
const V1: [number, number] = [2, 1];
const V2: [number, number] = [-1, 1];
const W: [number, number] = [-1, 1.8];
const P: [number, number] = [0, 1.5];
const HALB = 3.2;

type Modus = "gerade" | "ebene" | "verschoben";

export function SpanWidget({ variante = "span" }: { variante?: "span" | "unterraum" }) {
  const [modus, setModus] = useState<Modus>("gerade");
  // c₁ < 1, damit die Spitze von v₁ neben dem gezogenen Punkt sichtbar bleibt
  const [c1, setC1] = useState(0.6);
  const [c2, setC2] = useState(0.8);

  const modi: { id: Modus; name: string }[] =
    variante === "unterraum"
      ? [
          { id: "gerade", name: "Gerade durch 0" },
          { id: "ebene", name: "ganze Ebene" },
          { id: "verschoben", name: "verschobene Gerade" },
        ]
      : [
          { id: "gerade", name: "nur v₁" },
          { id: "ebene", name: "v₁ und v₂" },
        ];

  const punkt: [number, number] =
    modus === "ebene"
      ? [c1 * V1[0] + c2 * V2[0], c1 * V1[1] + c2 * V2[1]]
      : modus === "verschoben"
        ? [P[0] + c1 * V1[0], P[1] + c1 * V1[1]]
        : [c1 * V1[0], c1 * V1[1]];

  /** Ein frei gezogener Punkt wird auf die erreichbare Menge zurückgeholt. */
  const setzeAusPunkt = (v: [number, number]) => {
    if (modus === "ebene") {
      const det = V1[0] * V2[1] - V2[0] * V1[1];
      setC1((v[0] * V2[1] - V2[0] * v[1]) / det);
      setC2((V1[0] * v[1] - v[0] * V1[1]) / det);
    } else {
      const b = modus === "verschoben" ? [v[0] - P[0], v[1] - P[1]] : v;
      setC1((b[0] * V1[0] + b[1] * V1[1]) / (V1[0] ** 2 + V1[1] ** 2));
    }
  };

  const vektoren = [
    { v: V1, color: FMM_COLORS.blau, label: "v₁" },
    ...(modus === "ebene" ? [{ v: V2, color: FMM_COLORS.blau, label: "v₂" }] : []),
    { v: W, color: "var(--w-muted, #94a3b8)", label: "w" },
    { v: punkt, color: FMM_COLORS.violett, label: modus === "verschoben" ? "p + c₁v₁" : "c₁v₁ + c₂v₂", draggable: true },
  ];

  const wErreichbar = modus === "ebene";

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Ziehen wir den roten Punkt und versuchen wir, damit w zu treffen.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={IDENT}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        worldHalf={HALB}
        xLabel="x₁"
        yLabel="x₂"
        vectors={vektoren}
        onVectorChange={(_i, v) => setzeAusPunkt([v[0], v[1]])}
        lines={modus === "gerade" ? [{ dir: V1, color: FMM_COLORS.orange }] : []}
        overlay={(toPx) => {
          if (modus === "ebene") {
            const [x0, y1] = toPx(-HALB, HALB);
            const [x1, y0] = toPx(HALB, -HALB);
            return (
              <rect
                x={x0}
                y={y1}
                width={x1 - x0}
                height={y0 - y1}
                fill={FMM_COLORS.orange}
                fillOpacity={0.16}
                pointerEvents="none"
              />
            );
          }
          if (modus === "verschoben") {
            const t = HALB * 2;
            const [ax, ay] = toPx(P[0] - t * V1[0], P[1] - t * V1[1]);
            const [bx, by] = toPx(P[0] + t * V1[0], P[1] + t * V1[1]);
            return (
              <g pointerEvents="none">
                <line x1={ax} y1={ay} x2={bx} y2={by} stroke={FMM_COLORS.orange} strokeWidth={2} />
              </g>
            );
          }
          return null;
        }}
        ariaLabel={`Die erreichbare Menge ist ${modus === "ebene" ? "die ganze Ebene" : modus === "verschoben" ? "eine Gerade, die nicht durch den Ursprung geht" : "eine Gerade durch den Ursprung"}; der gezogene Punkt liegt bei (${fmtDe(punkt[0], 2)}; ${fmtDe(punkt[1], 2)}).`}
      />
      <div className="my-1 flex flex-wrap gap-1 text-xs">
        {modi.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={m.id === modus}
            className={m.id === modus ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setModus(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <Slider label="c₁" value={c1} onChange={setC1} min={-2.5} max={2.5} step={0.05} accent={FMM_COLORS.violett} />
      {modus === "ebene" && (
        <Slider label="c₂" value={c2} onChange={setC2} min={-2.5} max={2.5} step={0.05} accent={FMM_COLORS.violett} />
      )}
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> aufspannende Vektoren ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> erreichbare Menge ·{" "}
        <span style={{ color: FMM_COLORS.violett }}>▮</span> aktueller Punkt · grau: w = (−1; 1,8)
      </p>
      <Verdikt kind={modus === "verschoben" ? "fail" : wErreichbar ? "ok" : "warn"}>
        {modus === "gerade" ? (
          <>
            Erreichbar ist nur die Gerade aller Vielfachen von v₁. w liegt 2,06 daneben und
            bleibt unerreichbar, so weit wir c₁ auch drehen. Die Gerade geht durch den
            Ursprung und ist gegen Summen und Vielfache abgeschlossen: ein Untervektorraum der
            Dimension 1.
          </>
        ) : modus === "ebene" ? (
          <>
            Mit v₂ kommt eine zweite unabhängige Richtung dazu (det[v₁ v₂] = 3), und schon ist
            jeder Punkt erreichbar: w = 0,27·v₁ + 1,53·v₂. Die lineare Hülle ist der ganze R².
          </>
        ) : (
          <>
            Diese Gerade läuft am Ursprung vorbei (Abstand 1,34) und ist kein Untervektorraum:
            Für A = (0; 1,5) und B = (2; 2,5) darauf liegt A + B = (2; 4) schon nicht mehr darauf.
            Eine lineare Hülle enthält immer die Null.
          </>
        )}
      </Verdikt>
    </div>
  );
}
