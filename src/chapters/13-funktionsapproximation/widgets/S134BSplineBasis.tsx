/**
 * F1 — DIE EINE EINSICHT: B-Splines haben lokalen Träger und bilden trotzdem
 * an jeder inneren Stelle eine Partition der Eins.
 * FARBROLLEN: ausgewählte Basisfunktion orange, übrige und Summenkurve neutral.
 * PROVENIENZ: BasisExplorer aus heath-ch7/S743 portiert; offener Knotenvektor
 * und Texte für Bemerkung 13.4.9 neu gefasst.
 * VERIFIZIERTE ZAHLEN: Für q=0,1,2,3 stimmen Knotenlänge m+2q+1 und Zahl
 * m+q; die maximale Summenabweichung auf [0,5) ist ≤4,4e-16. Im Inneren eines
 * Gitterintervalls sind genau q+1 Funktionen ungleich null, auf einem inneren
 * Knoten q, an x = 0 genau eine.
 * Geprüft mit verify-hdr.mjs, 2026-08-20, und mit
 * scripts/verify/REV29/13-funktionsapproximation-S134BSplineBasis.mjs, 2026-08-29.
 */
import { useMemo, useState } from "react";
import { Aufgabe, LabeledPlot, M, Slider, Verdikt } from "../../../lib";
import {
  NEUTRAL,
  ORANGE,
  bsplRand,
  fmt,
  knotenvektor,
} from "./S134BSpline";
import { ref } from "../../numbers.generated";

/**
 * B-Spline-Basis zum Gitter 0, 1, ..., 5 mit Gradregler (§13.4).
 *
 * Portiert aus /workspace/interactive/interactive/heath-ch7/src/sections/S743.tsx
 * (BasisExplorer): uebernommen sind der Aufbau der Serienliste mit einer
 * hervorgehobenen und abgeblendeten uebrigen Kurven, die Summenkurve als
 * eigene Serie, das Abschneiden knapp vor dem rechten Rand und die
 * Sondenauswertung. Die Knotenfolge ist der KORRIGIERTE offene Knotenvektor
 * aus Bemerkung 13.4.9 (das Buch arbeitet mit einer unendlichen Knotenkette),
 * saemtliche Texte sind neu.
 *
 * Nachgerechnet (node, scripts/verify/HDR/verify-hdr.mjs, 2026-08-20):
 * Laenge des Knotenvektors m + 2q + 1,
 * Anzahl Basisfunktionen m + q; die Summe aller B_k weicht auf [0, 5) fuer
 * q = 0, 1, 2, 3 um hoechstens 4,4e-16 von 1 ab; der numerisch bestimmte
 * Traeger stimmt bei jedem k mit [tau_k, tau_{k+q+1}] ueberein.
 */

const GITTER = [0, 1, 2, 3, 4, 5];
const RECHTER_RAND = 5;
/**
 * Der Regler endet knapp VOR xi_m. Die Indikatorfunktion vom Grad 0 ist rechts
 * halboffen; genau an xi_m wären alle B_k null, und `bsplRand` würde still von
 * links auswerten — das Widget zeigte dann gleichzeitig „Funktionswert 0" und
 * „Summe 1". Diesen entarteten Randpunkt klemmen wir weg, statt ihn stumm zu
 * überspielen.
 */
const X_MAX = 4.95;

export function BSplineBasis() {
  const [qRoh, setQ] = useState(3);
  const [kRoh, setK] = useState(4);
  const [xStern, setXStern] = useState(2.4);
  const [zeigeSumme, setZeigeSumme] = useState(true);

  const q = Math.round(qRoh);
  const tau = useMemo(() => knotenvektor(GITTER, q), [q]);
  const K = tau.length - q - 1;
  const k = Math.min(Math.round(kRoh), K);

  const serien = useMemo(() => {
    const s = Array.from({ length: K }, (_, j) => ({
      f: (x: number) => bsplRand(tau, j, q, x, RECHTER_RAND),
      color: j === k - 1 ? ORANGE : NEUTRAL,
    }));
    if (zeigeSumme) {
      s.push({
        f: (x: number) => {
          let acc = 0;
          for (let j = 0; j < K; j++) acc += bsplRand(tau, j, q, x, RECHTER_RAND);
          return acc;
        },
        color: NEUTRAL,
        dash: [6, 4],
      } as (typeof s)[number]);
    }
    return s;
  }, [tau, q, K, k, zeigeSumme]);

  const xProbe = Math.min(xStern, X_MAX);
  const wert = bsplRand(tau, k - 1, q, xProbe, RECHTER_RAND);
  let summe = 0;
  for (let j = 0; j < K; j++) summe += bsplRand(tau, j, q, xProbe, RECHTER_RAND);
  let aktiv = 0;
  for (let j = 0; j < K; j++) {
    if (bsplRand(tau, j, q, xProbe, RECHTER_RAND) > 1e-12) aktiv++;
  }

  // Zustandsklassen: der Regler rastet auf 0,05, innere Knoten liegen auf
  // ganzen Zahlen, also ist „auf einem Knoten" über den kontrollierten
  // Parameter exakt entscheidbar (keine Toleranz auf einem Float).
  const raster = Math.round(xProbe * 20);
  const aufKnoten = raster % 20 === 0;
  const lage: "grad0" | "linkerRand" | "knoten" | "innen" =
    q === 0 ? "grad0" : raster === 0 ? "linkerRand" : aufKnoten ? "knoten" : "innen";
  const erklaerung =
    lage === "grad0"
      ? "Bei q = 0 ist jede Basisfunktion die Indikatorfunktion genau eines Gitterintervalls. An jeder Stelle ist deshalb genau eine von ihnen ungleich null, und die Summe ist trivialerweise eins – um den Preis, dass die Basis an jedem Knoten springt."
      : lage === "linkerRand"
        ? `Am linken Rand fallen q + 1 = ${q + 1} Knoten zusammen. Dort ist nur die erste Basisfunktion ungleich null, und zwar gleich eins: Deshalb interpoliert eine B-Spline-Darstellung den Randwert exakt.`
        : lage === "knoten"
          ? `x* sitzt auf dem inneren Knoten ${fmt(xProbe, 0)}. Der Träger ist rechts halboffen, eine der Funktionen endet hier also gerade; es tragen ${aktiv} statt der ${q + 1} des Intervallinneren.`
          : `x* liegt im Inneren eines Gitterintervalls. Genau ${q + 1} Funktionen sind dort ungleich null, alle übrigen ${K - (q + 1)} verschwinden – das ist der lokale Träger.`;

  return (
    <div className="my-2">
      <Aufgabe>Wählen wir Grad, Basisfunktion und Stelle und zählen dann, wie viele Funktionen dort ungleich null sind.</Aufgabe>

      <div className="mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2">
        <Slider label="Grad q" value={qRoh} onChange={setQ} min={0} max={3} step={1} fmt={(v) => `${Math.round(v)}`} />
        <Slider
          label="hervorgehoben k"
          value={k}
          onChange={setK}
          min={1}
          max={K}
          step={1}
          fmt={(v) => `${Math.round(v)}`}
        />
        <Slider
          label="Stelle x*"
          value={xStern}
          onChange={setXStern}
          min={0}
          max={X_MAX}
          step={0.05}
          fmt={(v) => fmt(v, 2)}
        />
        <label className="my-1 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={zeigeSumme}
            onChange={(e) => setZeigeSumme(e.target.checked)}
          />
          <span>Summe aller Basisfunktionen zeigen</span>
        </label>
      </div>

      <div className="mb-2 text-sm">
        <p>
          <M>{`m + 2q + 1 = ${GITTER.length - 1 + 2 * q + 1}`}</M> Knoten:{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            ({tau.map((t) => fmt(t, 0)).join("; ")})
          </span>
        </p>
        <p>
          daraus <M>{`m + q = ${K}`}</M> Basisfunktionen vom Grad{" "}
          <M>{`q = ${q}`}</M>.
        </p>
      </div>

      <LabeledPlot
        xLabel="x"
        yLabel=""
        series={serien}
        markers={[
          ...tau.map((t) => ({ x: t, y: 0, color: ORANGE })),
          { x: xStern, y: wert, color: ORANGE },
        ]}
        xDomain={[-0.2, 5.2]}
        yDomain={[0, 1.12]}
        width={480}
        height={230}
      />

      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: NEUTRAL }}>
        <span className="inline-flex items-center gap-1.5">
          <svg width={28} height={8} viewBox="0 0 28 8" className="h-2 w-7 shrink-0" aria-hidden="true">
            <line x1={1} y1={4} x2={27} y2={4} stroke={ORANGE} strokeWidth={2.4} />
          </svg>
          <span style={{ color: ORANGE }}>hervorgehobene Funktion B_k</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width={28} height={8} viewBox="0 0 28 8" className="h-2 w-7 shrink-0" aria-hidden="true">
            <line x1={1} y1={4} x2={27} y2={4} stroke={NEUTRAL} strokeWidth={1.6} />
          </svg>
          übrige Basisfunktionen
        </span>
        {zeigeSumme ? (
          <span className="inline-flex items-center gap-1.5">
            <svg width={28} height={8} viewBox="0 0 28 8" className="h-2 w-7 shrink-0" aria-hidden="true">
              <line x1={1} y1={4} x2={27} y2={4} stroke={NEUTRAL} strokeWidth={1.6} strokeDasharray="6 4" />
            </svg>
            Summe aller B_k
          </span>
        ) : null}
      </p>

      <div className="mt-2 text-sm">
        <p>
          Träger der hervorgehobenen Funktion:{" "}
          <M>{`[\\tau_{${k}}, \\tau_{${k + q + 1}}] = [${fmt(tau[k - 1], 0)}, ${fmt(
            tau[k + q],
            0,
          )}]`}</M>
          , also{" "}
          {tau[k + q] - tau[k - 1] === 1
            ? "ein Gitterintervall"
            : `${fmt(tau[k + q] - tau[k - 1], 0)} Gitterintervalle`}
          .
        </p>
        <p className="mt-1">
          An der Stelle <M>{`x^* = ${fmt(xStern, 2)}`}</M>:{" "}
          <M>{`B_{${k}}^{(${q})}(x^*) = `}</M>
          <span className="font-mono" style={{ color: ORANGE }}>
            {fmt(wert, 4)}
          </span>
          , Summe aller <span className="font-mono">{fmt(summe, 4)}</span>, davon{" "}
          <span className="font-mono">{aktiv}</span> von {K}{" "}
          {aktiv === 1 ? "Funktion" : "Funktionen"} ungleich null.
        </p>
        <Verdikt
          kind={lage === "innen" ? "ok" : "neutral"}
          titel={
            lage === "grad0"
              ? "Grad null:"
              : lage === "linkerRand"
                ? "Linker Rand:"
                : lage === "knoten"
                  ? "Auf einem Knoten:"
                  : "Im Intervallinneren:"
          }
        >
          {erklaerung} Die Summe bleibt in allen vier Lagen eins, wie{" "}
          {ref("bemerkung:warum-die-knotenfolge-so-lang-sein-muss")} es über die
          Länge der Knotenfolge vorhersagt.
        </Verdikt>
      </div>
    </div>
  );
}
