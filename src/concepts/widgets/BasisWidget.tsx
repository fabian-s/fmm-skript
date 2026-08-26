/**
 * Konzept-Widget `basis` (Gruppe C, POLISH 2026-08-19; Redesign 2026-08-26).
 *
 * DIE EINE EINSICHT: Die Monome 1, t, t² sind Koordinatenachsen im Raum der
 * quadratischen Polynome. Wer die Koordinaten der Zielkurve übernimmt, trifft
 * sie exakt; wer einen Baustein weglässt, sieht am Differenzpolynom sofort,
 * welcher fehlt – und dass genau dieses eine Tripel die Kurve erzeugt.
 *
 * FARBROLLEN: blau = unsere Linearkombination f; grau (dick, gestrichelt) =
 * Zielkurve g; orange/violett/grün (dünn, gestrichelt) = die drei
 * Basisfunktionen 1, t, t², jeweils mit ihrem Koeffizienten skaliert.
 *
 * PROVENIENZ: Ersetzt die Fassung vom 2026-08-19, deren Aufgabe das exakte
 * Treffen der Zielkurve mit drei Reglern war (Suchaufgabe statt Einsicht,
 * Audit 2026-08-26). Neu: kuratierte Zustände als Knöpfe (direkte Zerlegung
 * statt Suche) und ein Verdikt, das das Differenzpolynom ausweist statt eines
 * abgetasteten Maximalabstands. Legende und Achsen kommen aus `Plot` v2.
 *
 * VERIFIZIERTE ZAHLEN (nachgerechnet 2026-08-26; Zielpolynom
 * g(t) = 0,6 + 0,9t − 0,5t²):
 *   Startzustand (1; 0,5; −0,8):  Δ = (0,4; −0,4; −0,3), d(t) = 0,4 − 0,4t − 0,3t²
 *   „ohne t²-Baustein“ (0,6; 0,9; 0):   Δ = (0; 0; 0,5),   d(t) = 0,5t²
 *   „ohne konstanten Baustein“ (0; 0,9; −0,5): Δ = (−0,6; 0; 0), d(t) = −0,6
 *   „Zielkurve“ (0,6; 0,9; −0,5): Δ = (0; 0; 0), d ist die Nullfunktion.
 * Wertebereich der Zielkurve auf [−2, 2]: −3,200 bis 1,005 (Scheitel t = 0,9).
 * Der Vergleich läuft über die auf eine Nachkommastelle gerundeten Werte; die
 * Regler laufen in Schritten von 0,1, die Gleichheit ist also exakt und nicht
 * über eine Toleranz erschlichen.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Plot,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  fmtDe,
} from "../../lib";

const ZIEL: [number, number, number] = [0.6, 0.9, -0.5];
const zielF = (t: number) => ZIEL[0] + ZIEL[1] * t + ZIEL[2] * t * t;

/** Auf das Raster der Regler (0,1) runden – danach ist Gleichheit exakt. */
const r1 = (x: number) => Math.round(x * 10) / 10;

const NAMEN = ["konstante Baustein", "Baustein t", "Baustein t²"];

const ZUSTAENDE: { id: string; name: string; c: [number, number, number] }[] = [
  { id: "start", name: "Startzustand", c: [1, 0.5, -0.8] },
  { id: "ziel", name: "Koordinaten der Zielkurve", c: [0.6, 0.9, -0.5] },
  { id: "ohne-t2", name: "ohne t²", c: [0.6, 0.9, 0] },
  { id: "ohne-1", name: "ohne Konstante", c: [0, 0.9, -0.5] },
];

export function BasisFunctionWidget() {
  const [c1, setC1] = useState(1);
  const [c2, setC2] = useState(0.5);
  const [c3, setC3] = useState(-0.8);

  const c: [number, number, number] = [r1(c1), r1(c2), r1(c3)];
  const d: [number, number, number] = [
    r1(c[0] - ZIEL[0]),
    r1(c[1] - ZIEL[1]),
    r1(c[2] - ZIEL[2]),
  ];
  const abweichend = [0, 1, 2].filter((i) => d[i] !== 0);
  const getroffen = abweichend.length === 0;

  const setzeZustand = (z: [number, number, number]) => {
    setC1(z[0]);
    setC2(z[1]);
    setC3(z[2]);
  };
  const istAktiv = (z: [number, number, number]) =>
    r1(z[0]) === c[0] && r1(z[1]) === c[1] && r1(z[2]) === c[2];

  /** d(t) = Δ₁ + Δ₂·t + Δ₃·t² als lesbare Formel, ohne Nullterme. */
  const dFormel = getroffen
    ? "0"
    : d
        .map((x, i) => (x === 0 ? "" : `${fmtDe(x, 1)}${["", "·t", "·t²"][i]}`))
        .filter((s) => s !== "")
        .join(" + ")
        .replace(/\+ −/g, "− ");

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Übernehmen wir die Koordinaten der Zielkurve – oder lassen wir gezielt einen Baustein weg
        und lesen wir das Differenzpolynom ab.
      </Aufgabe>
      <Plot
        xLabel="t"
        yLabel="f(t)"
        xDomain={[-2, 2]}
        yDomain={[-4, 4]}
        width={320}
        height={250}
        readout
        ariaLabel={`Die Linearkombination ${fmtDe(c[0], 1)} + ${fmtDe(c[1], 1)}·t + ${fmtDe(c[2], 1)}·t² und die Zielkurve; das Differenzpolynom lautet d(t) = ${dFormel}.`}
        series={[
          { f: zielF, color: FMM_COLORS.grau, dash: [7, 4], label: "Zielkurve g" },
          { f: () => c[0], color: FMM_COLORS.orange, dash: [3, 3], label: "c₁·1" },
          { f: (t) => c[1] * t, color: FMM_COLORS.violett, dash: [3, 3], label: "c₂·t" },
          { f: (t) => c[2] * t * t, color: FMM_COLORS.gruen, dash: [3, 3], label: "c₃·t²" },
          {
            f: (t) => c[0] + c[1] * t + c[2] * t * t,
            color: FMM_COLORS.blau,
            label: "f = c₁·1 + c₂·t + c₃·t²",
          },
        ]}
      />
      <div className="my-1 flex flex-wrap gap-1">
        {ZUSTAENDE.map((z) => (
          <button
            key={z.id}
            type="button"
            aria-pressed={istAktiv(z.c)}
            className={`${istAktiv(z.c) ? W_BUTTON_AKTIV : W_BUTTON} text-xs`}
            onClick={() => setzeZustand(z.c)}
          >
            {z.name}
          </button>
        ))}
      </div>
      <Slider label="c₁ (mal 1)" value={c1} onChange={setC1} min={-2} max={2} step={0.1} accent={FMM_COLORS.orange} />
      <Slider label="c₂ (mal t)" value={c2} onChange={setC2} min={-2} max={2} step={0.1} accent={FMM_COLORS.violett} />
      <Slider label="c₃ (mal t²)" value={c3} onChange={setC3} min={-2} max={2} step={0.1} accent={FMM_COLORS.gruen} />
      <p className={`mt-1 font-mono text-xs ${W_MUTED}`}>
        f(t) = {fmtDe(c[0], 1)} + {fmtDe(c[1], 1)}·t + {fmtDe(c[2], 1)}·t² · g(t) = 0,6 + 0,9·t −
        0,5·t²
      </p>
      <Verdikt kind={getroffen ? "ok" : "neutral"}>
        {getroffen ? (
          <>
            Getroffen: die Zielkurve hat die Koordinaten (0,6; 0,9; −0,5). Das Differenzpolynom
            d(t) = f(t) − g(t) ist die Nullfunktion, und weil die drei Monome linear unabhängig
            sind, gibt es kein zweites Tripel mit dieser Eigenschaft.
          </>
        ) : (
          <>
            d(t) = f(t) − g(t) = {dFormel}, also nicht die Nullfunktion: f ist eine andere Kurve.{" "}
            {abweichend.length === 1
              ? `Nur der ${NAMEN[abweichend[0]]} ist um ${fmtDe(Math.abs(d[abweichend[0]]), 1)} daneben – genau dieser eine Baustein trennt f von g.`
              : `${abweichend.length === 2 ? "Zwei" : "Alle drei"} Koordinaten weichen ab; jede einzelne von ihnen würde schon eine andere Kurve erzeugen.`}
          </>
        )}
      </Verdikt>
    </div>
  );
}
