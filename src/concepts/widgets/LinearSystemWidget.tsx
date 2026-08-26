/**
 * Konzept-Widget `linear-system`.
 *
 * DIE EINE EINSICHT: Die Lage zweier Gleichungsgeraden entscheidet über die
 * Lösungsmenge: Schnitt, parallele verschiedene Geraden oder dieselbe Gerade.
 * FARBROLLEN: blau = erste Gleichung, rot = zweite Gleichung, grün = Schnitt.
 * PROVENIENZ: Neufassung des statischen Vorgängers; die dritte Konstante d
 * macht alle drei Fälle erreichbar. Zahlen durch
 * scripts/verify/QA-L1/check-qa-l1.mjs, 2026-08-20, verifiziert:
 * (a,b,d)=(1,−1,1) liefert (1,6;0,6), (2,3,1) keine und (2,3,5)
 * unendlich viele Lösungen. Die Cramer-Formel ist
 * x=(5b−3d)/(2b−3a), y=(2d−5a)/(2b−3a).
 *
 * DREI ZUSTÄNDE STATT ZWEI (Revision 2026-08-26): Vorher galt
 * |det| < 0,03 als „parallel, keine Lösung". Das verwechselt eine Toleranz mit
 * Gleichheit. Jetzt wird unterschieden zwischen
 *   (a) exakt entartet: det = 2b − 3a = 0,
 *   (b) nahezu parallel: det ≠ 0, aber der Schnittwinkel ist winzig,
 *   (c) regulär.
 * Fall (a) ist exakt erreichbar und braucht keine Toleranz: Die Regler rasten
 * auf Vielfachen von 0,05 ein, also liegt 2b auf dem 0,1-Raster und 3a auf dem
 * 0,15-Raster; det ist damit ein Vielfaches von 0,05 und entweder exakt 0 oder
 * betragsmäßig ≥ 0,05 (die Schranke 1e−9 fängt nur die Binärrundung ab).
 * Fall (b) ist real erreichbar, z. B. a = 1, b = 1,55, d = 1: det = 0,1,
 * sin∡ = 0,1/(√13·‖(1; 1,55)‖) = 0,1/(3,6056·1,8445) = 0,01504 (0,86°), und
 * der Schnittpunkt liegt bei x = (5·1,55 − 3)/0,1 = 47,5, y = (5 − 95)/3 = −30,
 * also weit außerhalb des gezeigten Fensters – die Geraden sehen parallel aus,
 * das System ist aber eindeutig lösbar (nur schlecht konditioniert).
 * Der Sonderfall a = b = 0 ist ebenfalls erreichbar; dann ist die zweite
 * Gleichung 0 = d gar keine Geradengleichung und bekommt ein eigenes Verdikt.
 */
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
import { useState } from "react";

const X_MIN = -2;
const X_MAX = 4;
const Y_MIN = -3;
const Y_MAX = 3;
/** Schwelle für „nahezu parallel": Sinus des Schnittwinkels unter 0,05 (≈ 2,9°). */
const SIN_NAH = 0.05;

export function ZweiGeradenFigur() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-1);
  const [d, setD] = useState(1);

  const det = 2 * b - 3 * a;
  // Zweite Gleichung ohne Unbekannte: 0·x + 0·y = d beschreibt keine Gerade.
  const keineGerade = Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9;
  const exaktParallel = !keineGerade && Math.abs(det) < 1e-9;
  // Bei det = 0 ist (a, b) ein Vielfaches t von (2, 3); t = (2a + 3b)/13.
  // Dieselbe Gerade liegt genau dann vor, wenn auch d = 5t gilt.
  const t = (2 * a + 3 * b) / 13;
  const dieselbe = exaktParallel && Math.abs(d - 5 * t) < 1e-9;
  // Sinus des Winkels zwischen den beiden Normalen (2, 3) und (a, b).
  const sinWinkel = keineGerade ? 0 : Math.abs(det) / (Math.sqrt(13) * Math.hypot(a, b));
  const nahParallel = !keineGerade && !exaktParallel && sinWinkel < SIN_NAH;
  const winkelGrad = (Math.asin(Math.min(1, sinWinkel)) * 180) / Math.PI;

  const y1 = (x: number) => (5 - 2 * x) / 3;
  const y2 = (x: number) => (Math.abs(b) < 1e-9 ? NaN : (d - a * x) / b);
  const eindeutig = !keineGerade && !exaktParallel;
  const x = eindeutig ? (5 * b - 3 * d) / det : NaN;
  const y = eindeutig ? y1(x) : NaN;
  const imBild = eindeutig && x >= X_MIN && x <= X_MAX && y >= Y_MIN && y <= Y_MAX;

  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>Verändern wir die zweite Gerade und erzeugen wir die drei Lösungstypen.</Aufgabe>
      <Plot
        series={[
          { f: y1, label: "2x + 3y = 5", color: FMM_COLORS.blau },
          { f: y2, label: "ax + by = d", color: FMM_COLORS.rot },
        ]}
        xDomain={[X_MIN, X_MAX]}
        yDomain={[Y_MIN, Y_MAX]}
        xLabel="x"
        yLabel="y"
        readout
        markers={imBild ? [{ x, y, color: FMM_COLORS.gruen, label: "Lösung" }] : []}
        vlines={Math.abs(b) < 1e-9 && Math.abs(a) > 1e-9 ? [{ at: d / a, color: FMM_COLORS.rot, label: "ax = d" }] : []}
        ariaLabel="Zwei Gleichungsgeraden"
      />
      <Slider label="Koeffizient a" value={a} onChange={setA} min={-1} max={3} step={0.05} />
      <Slider label="Koeffizient b" value={b} onChange={setB} min={-3} max={3} step={0.05} />
      <Slider label="rechte Seite d" value={d} onChange={setD} min={-3} max={6} step={0.05} />
      <Verdikt
        kind={
          keineGerade || exaktParallel
            ? dieselbe || (keineGerade && Math.abs(d) < 1e-9)
              ? "ok"
              : "warn"
            : nahParallel
              ? "warn"
              : "neutral"
        }
      >
        {keineGerade ? (
          Math.abs(d) < 1e-9 ? (
            <>
              Mit a = b = 0 lautet die zweite Gleichung 0 = 0, ist also immer erfüllt:
              Lösungsmenge ist die ganze blaue Gerade.
            </>
          ) : (
            <>
              Mit a = b = 0 lautet die zweite Gleichung 0 = {fmtDe(d, 2)}, ist also nie erfüllt:
              keine Lösung, und rot ist nichts zu sehen.
            </>
          )
        ) : dieselbe ? (
          <>
            det A = 2b − 3a = 0 <em>und</em> beide Gleichungen sind Vielfache voneinander: Die
            Geraden fallen zusammen, unendlich viele Lösungen.
          </>
        ) : exaktParallel ? (
          <>
            det A = 2b − 3a = 0, aber die rechten Seiten passen nicht zueinander: parallele,
            verschiedene Geraden, keine Lösung.
          </>
        ) : nahParallel ? (
          <>
            Hier täuscht das Bild: det A = {fmtDe(det, 2)} ist klein, aber nicht null – die
            Geraden schneiden sich unter {fmtDe(winkelGrad, 1)}° genau einmal, bei{" "}
            ({fmtDe(x, 2)}; {fmtDe(y, 2)}){imBild ? "" : ", weit außerhalb des Fensters"}. Das System
            ist eindeutig lösbar, aber schlecht konditioniert.
          </>
        ) : (
          <>
            det A = {fmtDe(det, 2)} ≠ 0: Die Geraden schneiden sich einmal bei ({fmtDe(x, 2)};{" "}
            {fmtDe(y, 2)}), das System hat genau eine Lösung.
          </>
        )}
      </Verdikt>
    </div>
  );
}
