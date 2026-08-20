/**
 * Konzept-Widget `hyperplane` (Gruppe C, POLISH 2026-08-19).
 *
 * DIE EINE EINSICHT: Eine einzige lineare Gleichung schneidet immer eine
 * flache Schicht der Dimension n−1 aus dem Raum; der Koeffizientenvektor a
 * steht dabei senkrecht auf ihr und zeigt, wie weit sie vom Ursprung weg
 * liegt.
 *
 * FARBROLLEN: blau = Lösungsmenge (die Gerade); orange = Normalenvektor a vom
 * Lotfußpunkt aus; grauer Punkt = Lotfußpunkt, der nächste Punkt der Geraden
 * zum Ursprung.
 *
 * PROVENIENZ: Reglerdreiklang aus der Vorfassung, aber a₂ darf jetzt null
 * werden (die alte Untergrenze 0,3 versteckte genau den Sonderfall). Der
 * senkrechte Fall wird als `vlines` gezeichnet, der Normalenvektor als
 * Polygonzug; Achsen kommen aus `Plot` v2. Die Einleitung steht in
 * hyperplane.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C5/check-alle.mjs,
 * 2026-08-19): a = (1,1), b = 1 → ‖a‖ = 1,414214, Abstand zum Ursprung
 * 0,707107, Lotfußpunkt (0,5; 0,5), Steigung −1, Achsenabschnitt 1.
 * a = (1,0), b = 1,5 → senkrechte Gerade x₁ = 1,5, Abstand 1,5.
 * a = (−2; 0,5), b = 1 → ‖a‖ = 2,061553, Abstand 0,485071, Steigung 4,
 * Achsenabschnitt 2. a = (0,0) → keine Gerade (Abstand undefiniert).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";

/** Pfeilspitze als kurzer Polygonzug in Datenkoordinaten. */
function spitze(px: number, py: number, dx: number, dy: number): [number, number][] {
  const l = Math.hypot(dx, dy) || 1;
  const ux = dx / l;
  const uy = dy / l;
  const s = 0.28;
  return [
    [px - s * (ux + 0.5 * uy), py - s * (uy - 0.5 * ux)],
    [px, py],
    [px - s * (ux - 0.5 * uy), py - s * (uy + 0.5 * ux)],
  ];
}

export function OneEquationWidget() {
  const [a1, setA1] = useState(1);
  const [a2, setA2] = useState(1);
  const [b, setB] = useState(1);

  const norm = Math.hypot(a1, a2);
  const entartet = norm < 1e-9;
  const abstand = entartet ? NaN : Math.abs(b) / norm;
  // Lotfußpunkt: der Punkt der Geraden, der dem Ursprung am nächsten liegt.
  const fx = entartet ? 0 : (b * a1) / (norm * norm);
  const fy = entartet ? 0 : (b * a2) / (norm * norm);
  const pfeil: [number, number][] = entartet
    ? []
    : [[fx, fy], [fx + (1.2 * a1) / norm, fy + (1.2 * a2) / norm]];

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Drehen wir a₂ bis auf null und beobachten, was aus der Geraden wird.</Aufgabe>
      <Plot
        xLabel="x₁"
        yLabel="x₂"
        xDomain={[-4, 4]}
        yDomain={[-4, 4]}
        width={300}
        height={296}
        ariaLabel={`Lösungsmenge von ${fmtDe(a1, 1)} x₁ + ${fmtDe(a2, 1)} x₂ = ${fmtDe(b, 1)} mit Normalenvektor.`}
        series={Math.abs(a2) > 1e-9 ? [{ f: (x) => (b - a1 * x) / a2, color: FMM_COLORS.blau }] : []}
        vlines={Math.abs(a2) <= 1e-9 && Math.abs(a1) > 1e-9 ? [{ at: b / a1, color: FMM_COLORS.blau }] : []}
        polylines={
          entartet
            ? []
            : [
                { pts: pfeil, color: FMM_COLORS.orange },
                {
                  pts: spitze(pfeil[1][0], pfeil[1][1], a1 / norm, a2 / norm),
                  color: FMM_COLORS.orange,
                },
              ]
        }
        points={entartet ? [] : [{ x: fx, y: fy, color: FMM_COLORS.grau, r: 3.5 }]}
      />
      <Slider label="a₁" value={a1} onChange={setA1} min={-3} max={3} step={0.1} accent={FMM_COLORS.blau} />
      <Slider label="a₂" value={a2} onChange={setA2} min={-3} max={3} step={0.1} accent={FMM_COLORS.blau} />
      <Slider label="b" value={b} onChange={setB} min={-3} max={3} step={0.1} accent={FMM_COLORS.grau} />
      <Verdikt kind={entartet ? "fail" : "neutral"}>
        {entartet ? (
          <>
            Mit a = (0, 0) gibt es keine Hyperebene mehr: für b ≠ 0 erfüllt kein Punkt die
            Gleichung, für b = 0 erfüllen sie alle. Der Koeffizientenvektor muss ungleich null
            sein, sonst kostet die Gleichung keinen Freiheitsgrad.
          </>
        ) : Math.abs(a2) <= 1e-9 ? (
          <>
            Mit a₂ = 0 fehlt x₂ in der Gleichung: die Lösungsmenge ist die senkrechte Gerade
            x₁ = {fmtDe(b / a1, 2)}. Als Funktionsgraph lässt sie sich nicht schreiben, als
            Hyperebene sehr wohl – der Normalenvektor a zeigt weiter senkrecht auf sie, und der
            Abstand zum Ursprung ist |b|/‖a‖ = {fmtDe(abstand, 2)}.
          </>
        ) : (
          <>
            Die Lösungsmenge ist die Gerade mit Steigung {fmtDe(-a1 / a2, 2)}; der orange Pfeil ist
            der Koeffizientenvektor a, er steht senkrecht auf ihr. Der Ursprungsabstand ist
            |b|/‖a‖ = {fmtDe(abstand, 2)}, gemessen am grauen Lotfußpunkt. Eine Dimension bleibt
            übrig: im R² eine Gerade, im R³ eine Ebene.
          </>
        )}
      </Verdikt>
    </div>
  );
}
