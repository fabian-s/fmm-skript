/**
 * Konzept-Widget `linear-least-squares` (Gruppe C, REWORK 2026-08-19).
 *
 * DIE EINE EINSICHT: Die Kleinste-Quadrate-Gerade ist nicht „die Gerade, die
 * gut aussieht", sondern die eine, die die Summe der quadrierten Reststrecken
 * minimiert — und von Hand kommt man ihr nahe, erreicht sie aber praktisch
 * nie.
 *
 * SPOILER-SPLIT: Die frühere Fassung zeichnete die KQ-Lösung von Anfang an
 * gestrichelt ein und nannte 1/6 im Text über der Grafik. Jetzt schätzt der
 * Leser die kleinstmögliche Quadratsumme zuerst (`Schaetzfrage`); Gerade und
 * Zielwert erscheinen erst beim Auflösen.
 *
 * FARBROLLEN: blau = unsere Gerade; rot = Residuen als senkrechte Strecken
 * (und die Datenpunkte, an denen sie hängen, in grau); grün (gestrichelt) =
 * die KQ-Gerade, sichtbar erst nach dem Auflösen.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C5/check-alle.mjs,
 * 2026-08-19): A = [[1,1],[1,2],[1,3]], b = (1,2,2); Normalengleichungen
 * AᵀA = [[3,6],[6,14]], Aᵀb = (5,11); Lösung x = (2/3, 1/2) = (0,666667;
 * 0,500000) mit SSR = 0,166667 = 1/6 und Residuen (−1/6, 1/3, −1/6). Eine
 * Rastersuche über [−1,2] × [−0,5;1,5] mit Schrittweite 0,005 findet als
 * Minimum 0,166675 bei (0,665; 0,500), ein besserer Wert existiert also nicht.
 * Der Startzustand (1,60; 0,05) hat die Residuen (−0,65; 0,30; 0,25) und
 * SSR = 0,575000; er ist so gewählt, dass alle drei Reststrecken sichtbar sind.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Schaetzfrage, Slider, Verdikt, fmtDe } from "../../lib";

const T = [1, 2, 3];
const Y = [1, 2, 2];
const KQ0 = 2 / 3;
const KQ1 = 1 / 2;
const KQ_SSR = 1 / 6;

function LsTafel({ aufgeloest }: { aufgeloest: boolean }) {
  const [c0, setC0] = useState(1.6);
  const [c1, setC1] = useState(0.05);
  const [bestes, setBestes] = useState(() => ssrVon(1.6, 0.05));

  function ssrVon(a: number, b: number) {
    return T.reduce((s, t, i) => s + (Y[i] - (a + b * t)) ** 2, 0);
  }
  const merken = (a: number, b: number) => setBestes((alt) => Math.min(alt, ssrVon(a, b)));

  const gerade = (t: number) => c0 + c1 * t;
  const residuen = T.map((t, i) => Y[i] - gerade(t));
  const ssr = residuen.reduce((s, r) => s + r * r, 0);
  const yAlle = [gerade(0), gerade(4), ...Y, 0, 3];
  const yDom: [number, number] = [Math.min(...yAlle) - 0.4, Math.max(...yAlle) + 0.4];

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Legen wir die Gerade so, dass die roten Strecken zusammen möglichst kurz werden.</Aufgabe>
      <Plot
        xLabel="t"
        yLabel="y"
        xDomain={[0, 4]}
        yDomain={yDom}
        width={320}
        height={220}
        ariaLabel={`Gerade mit Achsenabschnitt ${fmtDe(c0, 2)} und Steigung ${fmtDe(c1, 2)}; Quadratsumme ${fmtDe(ssr, 3)}.`}
        series={[
          { f: gerade, color: FMM_COLORS.blau, label: "unsere Gerade" },
          ...(aufgeloest
            ? [{ f: (t: number) => KQ0 + KQ1 * t, color: FMM_COLORS.gruen, dash: [5, 4], label: "KQ-Gerade" }]
            : []),
        ]}
        polylines={T.map((t, i) => ({
          pts: [[t, Y[i]], [t, gerade(t)]] as [number, number][],
          color: FMM_COLORS.rot,
        }))}
        points={T.map((t, i) => ({ x: t, y: Y[i], color: FMM_COLORS.grau, r: 4 }))}
      />
      <Slider
        label="Achsenabschnitt x₁"
        value={c0}
        onChange={(v) => { setC0(v); merken(v, c1); }}
        min={-1}
        max={2}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Slider
        label="Steigung x₂"
        value={c1}
        onChange={(v) => { setC1(v); merken(c0, v); }}
        min={-0.5}
        max={1.5}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={aufgeloest ? (ssr < KQ_SSR + 0.005 ? "ok" : "neutral") : "neutral"}>
        Residuen ({residuen.map((r) => fmtDe(r, 2)).join("; ")}), Quadratsumme {fmtDe(ssr, 3)};
        das Beste in diesem Durchgang war {fmtDe(bestes, 3)}.
        {aufgeloest && (
          <>
            {" "}
            Die grüne Gerade y = 2/3 + t/2 erreicht 1/6 = 0,167 und ist damit unschlagbar: sie löst
            die Normalengleichungen AᵀA x = Aᵀb mit AᵀA = [[3, 6], [6, 14]] und Aᵀb = (5, 11).
          </>
        )}
      </Verdikt>
    </div>
  );
}

export function LsFitWidget() {
  return (
    <Schaetzfrage
      frage="Wie klein wird die Quadratsumme der Residuen im besten Fall? Erst schätzen, dann von Hand versuchen."
      loesung={KQ_SSR}
      toleranz={0.05}
      fmt={(v) => fmtDe(v, 3)}
    >
      {({ aufgeloest }) => <LsTafel aufgeloest={aufgeloest} />}
    </Schaetzfrage>
  );
}
