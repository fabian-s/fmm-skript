/**
 * F1 — DIE EINE EINSICHT: B-Splines haben lokalen Träger und bilden trotzdem
 * an jeder inneren Stelle eine Partition der Eins.
 * FARBROLLEN: ausgewählte Basisfunktion orange, übrige und Summenkurve neutral.
 * PROVENIENZ: BasisExplorer aus heath-ch7/S743 portiert; offener Knotenvektor
 * und Texte für Bemerkung 14.4.9 neu gefasst.
 * VERIFIZIERTE ZAHLEN: Für q=0,1,2,3 stimmen Knotenlänge m+2q+1 und Zahl
 * m+q; die maximale Summenabweichung auf [0,5) ist ≤4,4e-16.
 * Geprüft mit verify-hdr.mjs, 2026-08-20.
 */
import { useMemo, useState } from "react";
import { Aufgabe, LabeledPlot, M, Slider, Verdikt } from "../../../lib";
import { CoxDeBoorSchritt } from "./S144CoxDeBoor";
import {
  NEUTRAL,
  ORANGE,
  bsplRand,
  fmt,
  knotenvektor,
} from "./S144BSpline";

/**
 * B-Spline-Basis zum Gitter 0, 1, ..., 5 mit Gradregler (§14.4).
 *
 * Portiert aus /workspace/interactive/interactive/heath-ch7/src/sections/S743.tsx
 * (BasisExplorer): uebernommen sind der Aufbau der Serienliste mit einer
 * hervorgehobenen und abgeblendeten uebrigen Kurven, die Summenkurve als
 * eigene Serie, das Abschneiden knapp vor dem rechten Rand und die
 * Sondenauswertung. Die Knotenfolge ist der KORRIGIERTE offene Knotenvektor
 * aus Bemerkung 14.4.9 (das Buch arbeitet mit einer unendlichen Knotenkette),
 * saemtliche Texte sind neu.
 *
 * Nachgerechnet (node, verify-14-funktionsapproximation/verify-values.mjs,
 * 2026-08-19; detailliert 2026-08-13): Laenge des Knotenvektors m + 2q + 1,
 * Anzahl Basisfunktionen m + q; die Summe aller B_k weicht auf [0, 5) fuer
 * q = 0, 1, 2, 3 um hoechstens 4,4e-16 von 1 ab; der numerisch bestimmte
 * Traeger stimmt bei jedem k mit [tau_k, tau_{k+q+1}] ueberein.
 */

const GITTER = [0, 1, 2, 3, 4, 5];
const RECHTER_RAND = 5;

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

  const wert = bsplRand(tau, k - 1, q, xStern, RECHTER_RAND);
  let summe = 0;
  for (let j = 0; j < K; j++) summe += bsplRand(tau, j, q, xStern, RECHTER_RAND);
  let aktiv = 0;
  for (let j = 0; j < K; j++) {
    if (bsplRand(tau, j, q, xStern, RECHTER_RAND) > 1e-12) aktiv++;
  }

  return (
    <div className="my-2">
      <Aufgabe>Wählen wir Grad, Basisfunktion und Stelle; vergleichen wir dann ihren Träger mit dem Rekursionsschritt darunter.</Aufgabe>

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
          max={5}
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
          <span className="font-mono">{aktiv}</span> von {K} Funktionen ungleich
          null.
        </p>
        <Verdikt kind={Math.abs(summe - 1) < 1e-10 ? "ok" : "warn"}>
          Der Träger von <M>{`B_{${k}}^{(${q})}`}</M> ist genau <M>{`[\\tau_${k},\\tau_{${k + q + 1}}]`}</M>; an x* sind {aktiv} Funktionen aktiv. Ihre Summe ist {fmt(summe, 4)}, wie Bemerkung 14.4.9 vorhersagt.
        </Verdikt>
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-medium">Rekursionsschritt an einer Stelle</summary>
        <CoxDeBoorSchritt />
      </details>
    </div>
  );
}
