import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  LabeledPlot,
  Schaetzfrage,
  Slider,
  Verdikt,
  fmtDe,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §10.8: Die EINE Einsicht — eine höhere Ordnung senkt den Fehler nahe am
 * Entwicklungspunkt drastisch (bei x = 0,5 je Ordnung um mehr als das
 * Vierfache), weit draußen dagegen NICHT monoton. Taylorpolynome von e^x um
 * den Entwicklungspunkt 0, Ordnung per Regler.
 *
 * Rechenkern (Ordnungsregler, Auswertung des Taylorpolynoms, Plot aus Funktion
 * und Polynom, Readout des größten Fehlers im Fenster) portiert aus
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S51.tsx
 * (TaylorOrderWidget). Dort steht sin + cos, hier steht e^x, weil die Folien
 * (11-ableitungen-II, Z. 509-562) genau diese drei ggplot-Tafeln zeigen;
 * Fenster und Achsenausschnitt sind aus deren R-Code übernommen
 * (x von -3 bis 3, ylim von -5 bis 20). Sämtliche Texte sind neu geschrieben.
 *
 * Farben nach dem Kapitel-11-Code: Funktion blau, Taylorpolynom grün,
 * Fehler rot.
 *
 * Nachgerechnet (node, rev-s114-a/d.mjs): e^0,5 = 1,648721; die Polynome
 * T_1/T_2/T_3 liefern bei x = 0,5 die Werte 1,5 / 1,625 / 1,645833 und damit
 * die Fehler 0,148721 / 0,023721 / 0,002888 aus Beispiel 10.8.6.
 *
 * Nachgerechnet (historische Prüfung, Skript nicht mehr vorhanden,
 * 2026-08-19): Die Fehlerquotienten bei x = 0,5 sind 4,362 (T_0 -> T_1),
 * 6,270 (T_1 -> T_2), 8,214 (T_2 -> T_3) und 10,177 (T_3 -> T_4) — daher die
 * Schätzfrage mit der Antwort „Faktor 8". Größter Fehler auf [-1, 1] bzw.
 * [-3, 3]: 0,7183/16,09 (k=1), 0,2183/11,59 (k=2), 0,0516/7,086 (k=3),
 * 0,00995/3,711 (k=4). Am linken Rand ist der Fehler nicht monoton: bei
 * x = -3 steht 0,950 (k=0), 2,050 (k=1), 2,450 (k=2), 2,050 (k=3).
 *
 * Der Faustwert |x|/(k+1) für den Fehlerquotienten trägt nur nahe am
 * Entwicklungspunkt: Auf dem Reglerraster wächst der Fehler beim Ordnungsschritt
 * für k = 1 ab x <= -1,60 und für k = 2 ab x <= -2,60 sogar (k = 1, x = -3:
 * 0,950 -> 2,050). Der Statustext verzweigt deshalb.
 * R4-Nachprüfung: check-r4-claims.mjs, 2026-08-20.
 */

const BLAU = FMM_COLORS.blau; // Funktion und Funktionswerte
const GRUEN = FMM_COLORS.gruen; // Taylorpolynom
const ROT = FMM_COLORS.rot; // Fehler

const X_MIN = -3;
const X_MAX = 3;
const Y_MIN = -5;
const Y_MAX = 20;

const fmt = (v: number, d = 4) => fmtDe(v, d);

/** T_k(x) für f = exp um den Entwicklungspunkt 0. */
function taylorExp(k: number): (x: number) => number {
  return (x: number) => {
    let summe = 0;
    let fakultaet = 1;
    for (let j = 0; j <= k; j++) {
      if (j > 0) fakultaet *= j;
      summe += x ** j / fakultaet;
    }
    return summe;
  };
}

/** Größter Abstand zwischen exp und T_k auf [a, b]. */
function maxFehler(k: number, a: number, b: number): number {
  const T = taylorExp(k);
  let m = 0;
  for (let i = 0; i <= 400; i++) {
    const x = a + ((b - a) * i) / 400;
    m = Math.max(m, Math.abs(Math.exp(x) - T(x)));
  }
  return m;
}

export function TaylorOrdnungWidget() {
  const [k, setK] = useState(1);
  const [x, setX] = useState(0.5);

  const T = taylorExp(k);
  const fx = Math.exp(x);
  const tx = T(x);
  const fehler = Math.abs(fx - tx);
  const fehlerDavor = k > 0 ? Math.abs(fx - taylorExp(k - 1)(x)) : NaN;
  const gewinn = fehler > 0 ? fehlerDavor / fehler : NaN;

  const maxNah = maxFehler(k, -1, 1);
  const maxWeit = maxFehler(k, X_MIN, X_MAX);

  let art: "neutral" | "ok" | "warn" = "neutral";
  let status: string;
  if (k === 0) {
    art = "neutral";
    status =
      `Die Ordnung 0 ist der Extremfall: T₀ ist die konstante Funktion 1, also der Funktionswert im ` +
      `Entwicklungspunkt selbst. Sie trifft e^x nur in x = 0 und sagt über die Steigung nichts aus. ` +
      `Ein Schritt am Ordnungsregler bringt die Tangente ins Spiel.`;
  } else if (Math.abs(x) < 1e-9) {
    art = "neutral";
    status =
      `Im Entwicklungspunkt selbst stimmen alle Ordnungen überein: T_k(0) = 1 = e⁰, der Fehler ist null. ` +
      `Interessant wird es erst daneben, verschieben wir also den Regler für die Auswertungsstelle.`;
  } else if (fehler < 1e-14) {
    art = "ok";
    status =
      `Bei dieser Ordnung ist der Abstand an der Stelle x = ${fmt(x, 2)} unter die Rechengenauigkeit ` +
      `gefallen; die Tafel zeigt zwei Kurven, die Maschine sieht nur noch eine. Weiter draußen, etwa ` +
      `bei x = 3, bleibt trotzdem ein Fehler von ${fmt(maxWeit, 5)} stehen.`;
  } else {
    const nahDran = fehler < 0.01;
    const faust = Math.abs(x) / (k + 1);
    const quotient = 1 / gewinn;
    const gewachsen = quotient > 1;
    const trifft = Math.abs(quotient - faust) <= 0.25 * faust;
    art = gewachsen ? "warn" : "ok";
    const bilanz = gewachsen
      ? `der Schritt auf die Ordnung ${k} hat ihn also nicht gedrückt, sondern auf das ` +
        `${fmt(quotient, 3)}-fache wachsen lassen`
      : `der Schritt auf die Ordnung ${k} hat ihn also auf ein ${fmt(quotient, 3)}-faches gedrückt`;
    const faustSatz = trifft
      ? `Das passt zum Faustwert |x|/(k+1) = ${fmt(faust, 3)}.`
      : `Der Faustwert |x|/(k+1) = ${fmt(faust, 3)} trifft das nicht: Er beschreibt das Verhalten ` +
        `für kleine |x|, hier sind wir dafür zu weit vom Entwicklungspunkt entfernt.`;
    status =
      `Bei x = ${fmt(x, 2)} lässt T_${k} den Fehler ${fmt(fehler, 5)} übrig, die Ordnung davor ` +
      `${fmt(fehlerDavor, 5)}; ${bilanz}. ${faustSatz} ` +
      `${nahDran ? "Auf dieser Skala liegen blaue und grüne Kurve schon aufeinander." : "Blau und Grün trennen sich hier noch sichtbar."} ` +
      `Die Herkunft des Faktors steht im Beweis zu ${ref("satz:taylorentwicklung-i")}: Das Restglied ist ` +
      `e^ξ·x^(k+1)/(k+1)! mit einem ξ zwischen 0 und x. Solange |x| klein gegen k+1 ist, ` +
      `schrumpft es mit jeder Ordnung, sonst gewinnt zunächst die Potenz. Bei |x| ≤ 1 bleibt ` +
      `der größte Fehler hier bei höchstens ${fmt(maxNah, 4)}, auf dem ganzen Fenster liegt er ` +
      `bei ${fmt(maxWeit, 3)}.`;
  }

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir die Ordnung k von 1 aufwärts und lesen den Fehler erst bei x = 0,5 ab, dann
        bei x = −3.
      </Aufgabe>
      <Slider
        label="k (Ordnung)"
        value={k}
        onChange={(v) => setK(Math.round(v))}
        min={0}
        max={8}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <Slider
        label="x (Auswertungsstelle)"
        value={x}
        onChange={(v) => setX(Math.round(v * 20) / 20)}
        min={X_MIN}
        max={X_MAX}
        step={0.05}
        fmt={(v) => fmt(v, 2)}
      />

      <LabeledPlot
        xLabel="x"
        yLabel="y"
        series={[
          { f: Math.exp, color: BLAU, label: "f(x) = e^x" },
          { f: T, color: GRUEN, dash: [6, 4], label: `T_${k}` },
        ]}
        ariaLabel={`Die Exponentialfunktion in Blau und ihr Taylorpolynom der Ordnung ${k} in Grün; an der Stelle x = ${fmt(x, 2)} beträgt der Abstand ${fmt(fehler, 5)}.`}
        readout
        markers={[
          { x, y: fx, color: BLAU },
          { x, y: tx, color: GRUEN },
        ]}
        xDomain={[X_MIN, X_MAX]}
        yDomain={[Y_MIN, Y_MAX]}
      />

      <div className="max-w-prose font-mono text-sm">
        <div style={{ color: BLAU }}>f(x) = e^x = {fmt(fx, 5)}</div>
        <div style={{ color: GRUEN }}>
          T_{k}(x) = {fmt(tx, 5)}
        </div>
        <div style={{ color: ROT }}>
          |f(x) − T_{k}(x)| = {fmt(fehler, 5)}
        </div>
        <div style={{ color: ROT }}>
          größter Fehler auf [−1, 1] = {fmt(maxNah, 5)}, auf [−3, 3] = {fmt(maxWeit, 3)}
        </div>
      </div>

      <Verdikt kind={art}>{status}</Verdikt>
    </div>
  );
}

/**
 * Der Abschnitts-Baustein: erst tippen, dann schieben. Verifizierter Wert des
 * Quotienten bei x = 0,5: 8,214 (check-s114.mjs, 2026-08-19).
 */
export function TaylorOrdnungSchaetzung() {
  return (
    <Schaetzfrage
      frage="An der Stelle x = 0,5: Um welchen Faktor ist T₃ genauer als T₂?"
      variante="auswahl"
      loesung="acht"
      optionen={[
        { id: "zwei", text: "Faktor 2" },
        { id: "fuenf", text: "Faktor 5" },
        { id: "acht", text: "Faktor 8" },
      ]}
      verdeckt={
        <p className="max-w-prose text-sm">
          Gemessen sind es 8,2: Der Fehler fällt von 0,023721 auf 0,002888. Der Faustwert dahinter
          ist |x|/(k+1) = 0,5/3 = 0,167, also ein Sechstel, und dass es etwas besser läuft, liegt
          am Restglied aus {ref("satz:taylorentwicklung-i")}, in dem zusätzlich e^ξ mit ξ zwischen 0 und x steht.
        </p>
      }
    >
      <TaylorOrdnungWidget />
    </Schaetzfrage>
  );
}
