import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Plot,
  Schaetzfrage,
  Slider,
  Verdikt,
  fmtDe,
} from "../../../lib";

/**
 * §12.5: Optimierungslandschaften (ersetzt resources/konvexitaet-convex-surfaces.pdf).
 *
 * DIE EINE EINSICHT (Landschaften): Konvex, strikt konvex und nicht konvex
 * unterscheiden sich genau darin, wie die Menge der Minimalstellen aussieht —
 * ein Intervall, ein Punkt, oder mehrere getrennte Täler.
 *
 * DIE EINE EINSICHT (AbstiegsBecken): Bei einer nicht-konvexen Landschaft
 * entscheidet allein der Startwert, in welchem Tal der Abstieg endet, und die
 * Grenze zwischen den Einzugsgebieten ist ein einzelner Punkt — am Ergebnis
 * selbst ist sie nicht abzulesen, denn beide Täler erfüllen jedes
 * Abbruchkriterium.
 *
 * Portierter Rechen-/Zeichencode aus
 * /workspace/heath-upload/heath-ch5-6/src/sections/S61.tsx
 * (DoubleWellFigure, DescentBasinWidget): Doppelmulde x^4 - 3x^2 - x + 3,
 * Gradientenabstieg mit eta = 0,02 und 300 Schritten, dieselbe Auswahl der
 * gezeigten Iterierten. Saemtliche Texte, Farben, Panels und Statuszweige sind
 * neu geschrieben; die beiden konvexen Landschaften (Plateau, Schuessel) gibt
 * es dort nicht.
 *
 * FARBROLLEN (Kapitel 12): blau der Funktionsgraph, gruen der Startpunkt und
 * der getippte Wert, orange das globale Minimum, rot das nur lokale Minimum;
 * die Zwischenstationen der Iteration bleiben neutral grau.
 *
 * Kein Zufall: alle Zustaende haengen allein am Startwert-Regler.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-12-konvexitaet/
 * check-s125-landschaften.mjs, 2026-08-19; zuvor check-math-s125.mjs):
 *   Doppelmulde f(x) = x^4 - 3x^2 - x + 3, f'(x) = 4x^3 - 6x - 1.
 *   kritische Punkte  -1,1309 (f = 1,9298; f'' = 9,35)
 *                     -0,1699 (f = 3,0841; f'' = -5,65, Hoecker)
 *                      1,3008 (f = -0,5139; f'' = 14,31)
 *   Wertebereich auf [-2,2; 2,2]: [-0,5139; 14,1056].
 *   Gradientenabstieg eta = 0,02, 300 Schritte: Startwerte bis -0,17 landen
 *   bei -1,13090, ab -0,16 bei 1,30084 (Regler-Raster 0,01, die
 *   Wasserscheide -0,1699 liegt genau dazwischen), und ueber alle 441
 *   Reglerstellungen kippt das Ergebnis genau EINMAL.
 *   Plateau 2*max(0,|x|-0,8)^2: f = 0 auf [-0,8; 0,8], f(2,2) = 3,92,
 *   Sehnendefekt ueber 200000 geseedete Zufallspaare hoechstens 0 (also
 *   konvex), nicht strikt konvex. Schuessel 0,8x^2: f(2,2) = 3,872.
 */

const BLAU = FMM_COLORS.blau; // Funktionsgraph
const GRUEN = FMM_COLORS.gruen; // Startpunkt, getippter Wert
const ORANGE = FMM_COLORS.orange; // globales Minimum
const ROT = FMM_COLORS.rot; // nur lokales Minimum
const GRAU = FMM_COLORS.hellgrau; // Zwischenstationen der Iteration

/* ---------------------------------------------------------------- */
/* Die drei Landschaften                                             */
/* ---------------------------------------------------------------- */

/** konvex mit Plateau: quadratische Hinge, flach auf [-0,8; 0,8]. */
const plateau = (x: number): number => {
  const t = Math.max(0, Math.abs(x) - 0.8);
  return 2 * t * t;
};

/** strikt konvex: die Schuessel. */
const schuessel = (x: number): number => 0.8 * x * x;

/** nicht konvex: Doppelmulde (Rechenkern aus heath-ch5-6/S61.tsx). */
const dw = (x: number) => x ** 4 - 3 * x * x - x + 3;
const dwp = (x: number) => 4 * x ** 3 - 6 * x - 1;

const DW_LOK = { x: -1.1309, f: 1.9298 };
const DW_GLOB = { x: 1.3008, f: -0.5139 };
const DW_HOECKER = -0.1699;

const X_LO = -2.2;
const X_HI = 2.2;

function Punkt({ farbe, text }: { farbe: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: farbe }}
        aria-hidden="true"
      />
      {text}
    </span>
  );
}

export function Landschaften() {
  const panels: {
    key: string;
    titel: string;
    f: (x: number) => number;
    yDomain: [number, number];
    markers: { x: number; y: number; color: string }[];
    text: string;
  }[] = [
    {
      key: "plateau",
      titel: "konvex, aber nicht strikt",
      f: plateau,
      yDomain: [-0.4, 4.4],
      markers: [
        { x: -0.8, y: 0, color: ORANGE },
        { x: 0, y: 0, color: ORANGE },
        { x: 0.8, y: 0, color: ORANGE },
      ],
      text: "Auf dem ganzen Stück von −0,8 bis 0,8 steht derselbe kleinste Wert 0. Jeder dieser Punkte ist ein globales Minimum, eindeutig ist keiner. Die Minimalstellen bilden hier ein Intervall, also selbst wieder eine konvexe Menge.",
    },
    {
      key: "schuessel",
      titel: "strikt konvex",
      f: schuessel,
      yDomain: [-0.4, 4.4],
      markers: [{ x: 0, y: 0, color: ORANGE }],
      text: "Kein gerades Stück, keine flache Stelle: Die Schüssel hat genau eine tiefste Stelle. Wer irgendwo bergab läuft, kann nur dort ankommen.",
    },
    {
      key: "doppelmulde",
      titel: "nicht konvex",
      f: dw,
      yDomain: [-1.5, 14.8],
      markers: [
        { x: DW_LOK.x, y: DW_LOK.f, color: ROT },
        { x: DW_GLOB.x, y: DW_GLOB.f, color: ORANGE },
      ],
      text: "Zwei Täler, zwei kritische Punkte mit positiver Krümmung. Das linke Tal bei −1,13 ist ein lokales Minimum mit Wert 1,93, das rechte bei 1,30 das globale mit −0,51. Von innen sehen beide gleich aus.",
    },
  ];

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm text-slate-500 dark:text-slate-400">
        Drei Landschaften über demselben Bereich von −2,2 bis 2,2. Blau ist der Graph, orange
        markiert ein globales Minimum, rot ein Minimum, das nur lokal ist. Die beiden linken
        Tafeln teilen sich eine Werteachse, die rechte reicht bis 14,8; verglichen wird die Form,
        nicht die Höhe.
      </p>
      <div className="flex flex-wrap gap-5">
        {panels.map((p) => (
          <div key={p.key} className="min-w-0 basis-[19rem]">
            <p className="mb-1 text-sm font-medium">{p.titel}</p>
            <Plot
              xLabel="x"
              yLabel="f(x)"
              series={[{ f: p.f, color: BLAU }]}
              markers={p.markers}
              xDomain={[X_LO, X_HI]}
              yDomain={p.yDomain}
              width={250}
              height={170}
              ariaLabel={`Landschaft: ${p.titel}.`}
            />
            <p className="mt-1 max-w-[19rem] text-sm">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Abstiegsbecken auf der Doppelmulde                                 */
/* ---------------------------------------------------------------- */

const ETA = 0.02;
const SCHRITTE = 300;
/** dieselbe Auswahl gezeigter Iterierter wie in der Vorlage */
const GEZEIGT = [0, 1, 2, 3, 4, 5, 6, 8, 10, 13, 17, 22, 30, 40, 60, 100, 200, 300];

/** Gradientenabstieg von x0 aus; liefert die ganze Bahn. */
function abstieg(x0: number): number[] {
  const bahn = [x0];
  let xk = x0;
  for (let i = 0; i < SCHRITTE; i++) {
    xk -= ETA * dwp(xk);
    bahn.push(xk);
  }
  return bahn;
}

/** Landet der Lauf von x0 aus im tiefen Tal? */
function imTiefenTal(x0: number): boolean {
  const b = abstieg(x0);
  return Math.abs(b[b.length - 1] - DW_GLOB.x) < 0.1;
}

export function AbstiegsBecken({
  tipp,
  zeigeWasserscheide = false,
}: {
  /** Schätzung des Lesers, als grüne Senkrechte eingezeichnet */
  tipp?: number;
  /** erst nach dem Auflösen: die Wasserscheide mit ihrer Zahl */
  zeigeWasserscheide?: boolean;
}) {
  const [x0, setX0] = useState(-0.4);

  const bahn = abstieg(x0);
  let bisRuhe = SCHRITTE;
  for (let i = 0; i < SCHRITTE; i++) {
    if (Math.abs(dwp(bahn[i])) < 1e-4) {
      bisRuhe = i;
      break;
    }
  }
  const xEnde = bahn[bahn.length - 1];
  const global = Math.abs(xEnde - DW_GLOB.x) < 0.1;
  // Nur dort melden, wo EIN Reglerschritt das Tal wirklich wechselt.
  const nahAmHoecker =
    (x0 + 0.01 <= X_HI && imTiefenTal(x0 + 0.01) !== global) ||
    (x0 - 0.01 >= X_LO && imTiefenTal(x0 - 0.01) !== global);

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir den Startpunkt Schritt für Schritt nach rechts, bis der Abstieg das Tal
        wechselt.
      </Aufgabe>
      <Slider
        label="Startpunkt x₀"
        value={x0}
        onChange={setX0}
        min={X_LO}
        max={X_HI}
        step={0.01}
        accent={GRUEN}
      />
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 grow basis-[320px]">
          <Plot
            xLabel="x"
            yLabel="f(x)"
            series={[{ f: dw, color: BLAU }]}
            markers={[
              ...GEZEIGT.slice(1).map((k) => ({ x: bahn[k], y: dw(bahn[k]), color: GRAU })),
              { x: DW_LOK.x, y: DW_LOK.f, color: ROT },
              { x: DW_GLOB.x, y: DW_GLOB.f, color: ORANGE },
              { x: x0, y: dw(x0), color: GRUEN },
            ]}
            vlines={[
              ...(tipp !== undefined ? [{ at: tipp, color: GRUEN, dash: [5, 4], label: "Tipp" }] : []),
              ...(zeigeWasserscheide
                ? [{ at: DW_HOECKER, color: ORANGE, dash: [3, 3], label: "Wasserscheide" }]
                : []),
            ]}
            xDomain={[X_LO, X_HI]}
            yDomain={[-1.5, 14.8]}
            width={380}
            height={240}
            ariaLabel={`Die Doppelmulde mit dem Gradientenabstieg ab x0 = ${fmtDe(x0)}; die Folge endet ${global ? "im tiefen Tal rechts" : "im flachen Tal links"}.`}
          />
        </div>
        <div className="min-w-[15rem] grow basis-[15rem] space-y-2 text-sm">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3">Start x₀</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {fmtDe(x0)}
                </td>
              </tr>
              <tr>
                <td className="pr-3">nach 300 Schritten</td>
                <td className="font-mono text-xs">{fmtDe(xEnde, 4)}</td>
              </tr>
              <tr>
                <td className="pr-3">Funktionswert dort</td>
                <td className="font-mono text-xs">{fmtDe(dw(xEnde), 4)}</td>
              </tr>
              <tr>
                <td className="pr-3">Schritte bis |f′| &lt; 10⁻⁴</td>
                <td className="font-mono text-xs">{bisRuhe < SCHRITTE ? bisRuhe : "über 300"}</td>
              </tr>
            </tbody>
          </table>
          <p className="max-w-prose text-xs text-slate-500 dark:text-slate-400">
            <Punkt farbe={GRUEN} text="Startpunkt" />,{" "}
            <Punkt farbe={GRAU} text="Zwischenstationen" />,{" "}
            <Punkt farbe={ORANGE} text="globales Minimum" />,{" "}
            <Punkt farbe={ROT} text="lokales Minimum" />. Die Iteration ist
            xₖ₊₁ = xₖ − η f′(xₖ) mit η = 0,02 und 300 Schritten.
          </p>
        </div>
      </div>
      {global ? (
        <Verdikt kind="ok" titel="Im tiefen Tal gelandet.">
          Der Startpunkt liegt rechts der Wasserscheide, und das Verfahren läuft in das globale
          Minimum bei {fmtDe(DW_GLOB.x)} mit dem Wert {fmtDe(DW_GLOB.f)}.
          {nahAmHoecker
            ? " Ein einziger Schritt des Reglers nach links kippt das Ergebnis in das andere Tal, obwohl sich am Startwert kaum etwas ändert."
            : ""}
        </Verdikt>
      ) : (
        <Verdikt kind="fail" titel="Im flachen Tal hängengeblieben.">
          Der Startpunkt liegt links der Wasserscheide. Das Verfahren kommt bei{" "}
          {fmtDe(DW_LOK.x)} zur Ruhe, dort ist der Wert {fmtDe(DW_LOK.f)} und damit um{" "}
          {fmtDe(DW_LOK.f - DW_GLOB.f)} zu hoch. Die Ableitung verschwindet trotzdem, das
          Abbruchkriterium meldet Erfolg. Satz 12.5.1 greift hier nicht, denn die Landschaft ist
          nicht konvex.
          {nahAmHoecker
            ? " Ein einziger Schritt des Reglers nach rechts kippt das Ergebnis in das andere Tal, obwohl sich am Startwert kaum etwas ändert."
            : ""}
        </Verdikt>
      )}
    </div>
  );
}

/** Der Abschnitts-Baustein: erst tippen, dann schieben. */
export function AbstiegsBeckenSchaetzung() {
  return (
    <Schaetzfrage
      frage="Die Doppelmulde hat zwei Täler. An welcher Stelle liegt die Wasserscheide, ab der ein Start rechts davon im tiefen Tal endet?"
      variante="bereich"
      min={X_LO}
      max={X_HI}
      schritt={0.01}
      loesung={DW_HOECKER}
      toleranz={0.15}
      einheit="x₀"
      verdeckt={
        <p className="max-w-prose text-sm">
          Die Wasserscheide ist der Höcker zwischen den beiden Tälern, das lokale Maximum bei
          −0,1699. Über das ganze Reglerraster kippt das Ergebnis genau einmal, nämlich zwischen
          −0,17 und −0,16.
        </p>
      }
    >
      {({ aufgeloest, guess }) => (
        <AbstiegsBecken
          tipp={typeof guess === "number" ? guess : undefined}
          zeigeWasserscheide={aufgeloest}
        />
      )}
    </Schaetzfrage>
  );
}
