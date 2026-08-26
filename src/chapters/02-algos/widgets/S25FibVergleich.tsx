import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  LabeledPlot,
  Schaetzfrage,
  Slider,
  Verdikt,
  W_MUTED,
  W_PANEL,
} from "../../../lib";
import type { Series } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §2.5: Gezählte Schrittzahlen der naiven gegen die iterative
 * Fibonacci-Variante, verglichen mit den Landau-Vorhersagen, auf log-Skala.
 *
 * DIE EINE EINSICHT: Auf logarithmischer Skala wird exponentielles Wachstum
 * zur Geraden, und die Steigung verrät die Basis. Die gezählten Aufrufe liegen
 * auf der flacheren φ-Geraden, nicht auf der 2ⁿ-Geraden – die Schranke
 * O(2ⁿ) ist korrekt, aber nicht scharf (Satz 2.5.6, Bemerkung 2.5.7).
 *
 * Muster 1: Die scharfe Vorhersage c·φⁿ war früher eine Checkbox und der
 * Schlussabsatz stand offen darunter; seit 2026-08-19 ist beides die
 * Auflösung einer <Schaetzfrage> („auf welcher Geraden liegen die Punkte?").
 *
 * FARBROLLEN (Kapitel 2, s. S21Demos.tsx): rot = die teure Variante (naive
 * Rekursion, wie \cred im Text), blau = die günstige (Iteration, wie \cblue).
 * Punkte sind gezählte Werte, gestrichelte Linien sind Vorhersagen.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen,
 * 2026-08-19; T(n) = 1 + T(n−1) + T(n−2), T(0) = T(1) = 1, exakt per BigInt
 * gegengerechnet über T(n) = 2F(n+1) − 1):
 *   T(20) = 21 891 · T(30) = 2 692 537 · T(50) = 40 730 022 147 ·
 *   T(80) = 75 778 124 746 287 811 · T(100) = 1 146 295 688 027 634 168 201.
 *   Modellzeiten bei 10^9 Schritten/s: n = 30 → 2,7 ms, n = 50 → 41 s,
 *   n = 80 → 2,4 Jahre, n = 100 → 36 320 Jahre.
 *   Steigungen im log₁₀-Bild: log₁₀ 2 = 0,30103, log₁₀ φ = 0,208988,
 *   φ = 1,6180340. Die Iteration zählt 4n − 6 Operationen.
 *
 * Provenienz: eigenständig implementiert, kein Code aus den privaten
 * Buch-Apps.
 */

const PHI = (1 + Math.sqrt(5)) / 2;
const ROT = FMM_COLORS.rot; // naive Rekursion (wie \cred im Text)
const BLAU = FMM_COLORS.blau; // iterative Variante (wie \cblue im Text)
const N0 = 10; // Ankerpunkt für die Vorhersage-Konstanten

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
function sup(e: number): string {
  return String(e)
    .split("")
    .map((d) => SUP[Number(d)])
    .join("");
}

/** Zahl deutsch formatieren; ab 10⁶ wissenschaftlich. */
function fmtCount(x: number): string {
  if (x < 1e6) return Math.round(x).toLocaleString("de-DE");
  const e = Math.floor(Math.log10(x));
  const m = x / 10 ** e;
  return `${m.toFixed(1).replace(".", ",")} · 10${sup(e)}`;
}

/** Modell-Laufzeit bei 10⁹ Elementarschritten pro Sekunde. */
function fmtTime(ops: number): string {
  const s = ops / 1e9;
  if (s < 1e-6) return `${Math.max(1, Math.round(s * 1e9))} ns`;
  if (s < 1e-3) return `${Math.round(s * 1e6)} µs`;
  if (s < 1) return `${(s * 1e3).toFixed(1).replace(".", ",")} ms`;
  if (s < 120) return `${s.toFixed(1).replace(".", ",")} s`;
  if (s < 7200) return `${(s / 60).toFixed(0)} min`;
  if (s < 2 * 86400) return `${(s / 3600).toFixed(1).replace(".", ",")} h`;
  const years = s / 3.156e7;
  if (years < 1) return `${(s / 86400).toFixed(0)} Tage`;
  return `${fmtCount(Math.round(years))} Jahre`;
}

export function S25FibVergleichWidget() {
  const [nMax, setNMax] = useState(30);

  return (
    <Schaetzfrage
      variante="auswahl"
      frage="Die roten Punkte liegen auf einer Geraden. Auf welcher? Erst tippen, dann auflösen."
      optionen={[
        { id: "quad", text: "auf der von n²" },
        { id: "zwei", text: "auf der von 2ⁿ" },
        { id: "phi", text: "auf einer dazwischen" },
      ]}
      loesung="phi"
    >
      {({ aufgeloest }) => (
        <Tafel nMax={nMax} setNMax={setNMax} aufgeloest={aufgeloest} />
      )}
    </Schaetzfrage>
  );
}

function Tafel({
  nMax,
  setNMax,
  aufgeloest,
}: {
  nMax: number;
  setNMax: (v: number) => void;
  aufgeloest: boolean;
}) {
  const { T, markers, series, yMax } = useMemo(() => {
    // Exakte Aufrufzahl der naiven Rekursion: T(n) = 1 + T(n-1) + T(n-2).
    const T: number[] = [1, 1];
    for (let n = 2; n <= nMax; n++) T[n] = 1 + T[n - 1] + T[n - 2];
    // Gezählte Operationen der Iteration (n Initialisierungen + 3(n-2) Schleifenkosten).
    const itOps = (n: number) => 4 * n - 6;

    const L2 = Math.log10(2);
    const LPHI = Math.log10(PHI);
    // Vorhersage-Konstanten: Kurven bei n = N0 an die Zählungen anheften.
    const a2 = Math.log10(T[N0]) - N0 * L2; // log10(c) für c·2^n
    const aPhi = Math.log10(T[N0]) - N0 * LPHI; // log10(c) für c·φ^n
    const c1 = itOps(N0) / N0; // c für c·n

    const markers: { x: number; y: number; color: string }[] = [];
    const step = nMax > 40 ? 2 : 1;
    for (let n = nMax; n >= 2; n -= step) {
      markers.push({ x: n, y: Math.log10(T[n]), color: ROT });
      markers.push({ x: n, y: Math.log10(itOps(n)), color: BLAU });
    }

    const series: Series[] = [
      { f: (x) => a2 + x * L2, color: ROT, dash: [3, 4], label: "Schranke c · 2ⁿ" },
      ...(aufgeloest
        ? [
            {
              f: (x: number) => aPhi + x * LPHI,
              color: ROT,
              // lange Striche: die Geraden liegen unter den Punkten, kurze
              // Striche wären dort unsichtbar.
              dash: [12, 6],
              label: "scharf: c · φⁿ",
            },
          ]
        : []),
      {
        f: (x: number) => (x > 0 ? Math.log10(c1 * x) : NaN),
        color: BLAU,
        dash: [7, 4],
        label: "Vorhersage c · n",
      },
    ];

    const yMax = Math.max(a2 + nMax * L2, Math.log10(T[nMax])) + 0.5;
    return { T, markers, series, yMax };
  }, [nMax, aufgeloest]);

  const naive = T[nMax];
  const iter = 4 * nMax - 6;

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir <span className="font-mono">n</span> nach oben und vergleichen die roten
        Punkte mit der gestrichelten Geraden über ihnen.
      </Aufgabe>
      <LabeledPlot
        xLabel="n"
        yLabel="log₁₀(Schritte)"
        series={series}
        markers={markers}
        xDomain={[0, nMax + 1]}
        yDomain={[0, yMax]}
        width={440}
        height={300}
        ariaLabel={`Logarithmische Darstellung der gezählten Schrittzahlen bis n gleich ${nMax}; die roten Punkte der naiven Rekursion liegen auf einer Geraden unterhalb der gestrichelten 2-hoch-n-Geraden, die blauen Punkte der Iteration bleiben nahe der Grundlinie.`}
      />
      <Slider
        label="n (Größe)"
        value={nMax}
        onChange={(v) => setNMax(Math.round(v))}
        min={10}
        max={80}
        step={1}
        fmt={(v) => String(Math.round(v))}
      />
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        <span style={{ color: ROT }}>●</span> gezählte Aufrufe der naiven Rekursion &ensp;
        <span style={{ color: BLAU }}>●</span> gezählte Operationen der Iteration &ensp; gestrichelt:
        die Landau-Vorhersagen, bei <span className="font-mono">n = 10</span> an die Zählungen
        angeheftet.
      </p>
      <div className={`max-w-prose p-3 text-sm ${W_PANEL}`}>
        Bei <span className="font-mono">n = {nMax}</span>: naive Rekursion{" "}
        <span className="font-semibold" style={{ color: ROT }}>
          {fmtCount(naive)}
        </span>{" "}
        Aufrufe (Modellrechnung bei 10⁹ Schritten/s: ≈ {fmtTime(naive)}), iterative Variante{" "}
        <span className="font-semibold" style={{ color: BLAU }}>
          {fmtCount(iter)}
        </span>{" "}
        Operationen (≈ {fmtTime(iter)}).
      </div>
      {aufgeloest ? (
        <Verdikt kind="warn">
          Die roten Punkte liegen exakt auf einer Geraden, aber auf der flacheren mit Steigung{" "}
          <span className="font-mono">log₁₀ φ ≈ 0,209</span>, nicht auf der 2ⁿ-Geraden mit
          Steigung <span className="font-mono">log₁₀ 2 ≈ 0,301</span>. Die Schranke{" "}
          <span className="font-mono">O(2ⁿ)</span> aus {ref("satz:exponentielle-laufzeit-der-naiven")} ist also korrekt, aber nicht
          scharf; das tatsächliche Wachstum hat die Basis{" "}
          <span className="font-mono">φ ≈ 1,618</span> ({ref("bemerkung:wie-schlimm-ist-es-wirklich")}). Die blauen Punkte
          bleiben auf dieser Skala fast am Boden: Lineares Wachstum ist hier praktisch
          unsichtbar.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral">
          Beide Punktfolgen liegen sauber auf Geraden, die rote steigt deutlich steiler an. Sie
          verläuft aber sichtbar flacher als die gestrichelte Schranke darüber, und der Abstand
          zwischen beiden wächst mit <span className="font-mono">n</span>.
        </Verdikt>
      )}
    </div>
  );
}
