import { useMemo, useState, type ReactNode } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  LabeledPlot,
  M,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
} from "../../../lib";
import type { Series } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §2.4: Wachstums-Explorer — die gängigen Komplexitätsklassen auf linearer und
 * logarithmischer Skala, mit verstellbarem Vorfaktor c für die n²-Kurve.
 *
 * DIE EINE EINSICHT: Ein Vorfaktor verschiebt die Schwelle, an der die
 * schneller wachsende Klasse übernimmt, aber er dreht die Reihenfolge nie um.
 * Genau das besagt Lemma 2.4.4 (Regel 3) zusammen mit Beispiel 2.4.6.
 *
 * FARBROLLEN (Kapitel 2, s. S21Demos.tsx) — die Klassenrampe geht von billig
 * nach teuer und wird in §2.3 und §2.4 identisch verwendet:
 *   grün log n · blau n · grau n·log n · orange n² · violett n³ · rot 2ⁿ.
 * Rot ist damit im ganzen Kapitel „das Teuerste": die naive Rekursion in
 * §2.2/§2.5 und die Klasse O(2ⁿ) hier.
 *
 * PRÜFSTATUS (scripts/verify/REV29/02-algos-S24Wachstum.mjs, 2026-08-29):
 * kleinstes n, ab dem endgültig 2^n > c·n² gilt —
 *   c = 1 → 5 · c = 10 → 10 · c = 100 → 15 · c = 178 → 16 · c = 316 → 17 ·
 *   c = 1000 → 19.
 * Der Vorfaktor 1000 kostet die Exponentialfunktion also ganze 14 Schritte.
 * n³ > c·n² gilt genau für n > c (elementar).
 *
 * Provenienz: eigenständig implementiert. Der Skalenwechsel blendet seit
 * 2026-08-19 mit 300 ms über (zwei Tafeln übereinander), statt hart
 * umzuschalten; die Presets und das Verdikt sind ebenfalls neu.
 */

interface Klasse {
  key: string;
  label: string;
  color: string;
  f: (n: number, c: number) => number;
}

const KLASSEN: Klasse[] = [
  { key: "log", label: "log₂ n", color: FMM_COLORS.gruen, f: (n) => Math.log2(n) },
  { key: "lin", label: "n", color: FMM_COLORS.blau, f: (n) => n },
  { key: "nlogn", label: "n · log₂ n", color: FMM_COLORS.grau, f: (n) => n * Math.log2(n) },
  { key: "quad", label: "c · n²", color: FMM_COLORS.orange, f: (n, c) => c * n * n },
  { key: "kub", label: "n³", color: FMM_COLORS.violett, f: (n) => n * n * n },
  { key: "exp", label: "2ⁿ", color: FMM_COLORS.rot, f: (n) => Math.pow(2, n) },
];

const Y_CAP = 100000; // lineare Skala: y-Achse kappen, sonst plättet 2ⁿ alles

type Auswahl = Record<string, boolean>;

interface Preset {
  id: string;
  name: string;
  scale: "linear" | "log";
  nMax: number;
  cExp: number;
  an: string[];
}

const PRESETS: Preset[] = [
  {
    id: "polyexp",
    name: "polynomial gegen exponentiell",
    scale: "linear",
    nMax: 30,
    cExp: 0,
    an: ["lin", "quad", "exp"],
  },
  {
    id: "vorfaktor",
    name: "Vorfaktor gegen Ordnung",
    scale: "linear",
    nMax: 200,
    cExp: 2,
    an: ["quad", "kub"],
  },
  {
    id: "logskala",
    name: "log-Skala macht 2ⁿ zur Geraden",
    scale: "log",
    nMax: 60,
    cExp: 0,
    an: ["log", "lin", "quad", "exp"],
  },
];

const auswahlAus = (keys: string[]): Auswahl =>
  Object.fromEntries(KLASSEN.map((k) => [k.key, keys.includes(k.key)]));

/** Wert deutsch formatiert; große Werte als Mantisse · 10^Exponent. */
function fmtVal(v: number): ReactNode {
  if (!Number.isFinite(v)) return "∞";
  if (v >= 1e5) {
    const e = Math.floor(Math.log10(v));
    const m = v / Math.pow(10, e);
    return (
      <>
        {m.toFixed(1).replace(".", ",")}&thinsp;·&thinsp;10<sup>{e}</sup>
      </>
    );
  }
  if (v >= 100) return Math.round(v).toLocaleString("de-DE");
  // Ganzzahlige Werte ohne Nachkommastelle: sonst steht „30,0" neben „900".
  if (Number.isInteger(v)) return String(v).replace(".", ",");
  return v.toFixed(1).replace(".", ",");
}

/** Kleinstes n, ab dem endgültig 2^m > c·m² für alle m ≥ n gilt. */
function crossoverExpQuad(c: number): number {
  let last = 0;
  for (let n = 1; n <= 2000; n++) {
    if (Math.pow(2, n) <= c * n * n) last = n;
  }
  return last + 1;
}

export function S24WachstumWidget() {
  const [preset, setPreset] = useState(PRESETS[0].id);
  const [scale, setScale] = useState<"linear" | "log">(PRESETS[0].scale);
  const [nMax, setNMax] = useState(PRESETS[0].nMax);
  const [cExp, setCExp] = useState(PRESETS[0].cExp);
  const [enabled, setEnabled] = useState<Auswahl>(auswahlAus(PRESETS[0].an));

  const setzePreset = (p: Preset) => {
    setPreset(p.id);
    setScale(p.scale);
    setNMax(p.nMax);
    setCExp(p.cExp);
    setEnabled(auswahlAus(p.an));
  };

  const c = Math.round(Math.pow(10, cExp));
  const active = KLASSEN.filter((k) => enabled[k.key]);

  const { linSeries, logSeries, linDomain, logDomain, linLabel, capped } = useMemo(() => {
    const maxVal = Math.max(1, ...active.map((k) => k.f(nMax, c)));
    // Gekappt wird nur, wenn 2ⁿ mit im Bild ist; sonst würde die Kappung die
    // Schnittpunkte der polynomialen Klassen aus dem Bild schieben.
    const cap = enabled.exp ? Y_CAP : Infinity;
    const yMaxLin = Math.min(maxVal, cap);
    // Der Plot reserviert links nur wenig Platz für die Tick-Beschriftung;
    // sechsstellige Zahlen würden dort abgeschnitten. Deshalb rechnen wir die
    // lineare Achse ab 10 000 in Tausendern (die Tabelle bleibt absolut).
    const einheit = yMaxLin > 10000 ? 1000 : 1;
    return {
      linSeries: active.map(
        (k): Series => ({ f: (x) => (x >= 1 ? k.f(x, c) / einheit : NaN), color: k.color, label: k.label })
      ),
      logSeries: active.map(
        (k): Series => ({
          f: (x) => (x >= 1 ? Math.log10(Math.max(k.f(x, c), 1e-12)) : NaN),
          color: k.color,
          label: k.label,
        })
      ),
      linDomain: [0, (yMaxLin * 1.05) / einheit] as [number, number],
      logDomain: [-1, Math.max(Math.log10(maxVal) * 1.08, 1)] as [number, number],
      linLabel: einheit === 1000 ? "f(n) in Tausend" : "f(n)",
      capped: maxVal > cap,
    };
  }, [active, nMax, c, enabled.exp]);

  const nStar = useMemo(() => crossoverExpQuad(c), [c]);

  /* Verdikt: welches Paar von Klassen liegt gerade im Bild? */
  let verdikt: ReactNode;
  let art: "neutral" | "warn" = "neutral";
  if (enabled.exp && enabled.quad) {
    art = "warn";
    verdikt = (
      <>
        Mit dem Vorfaktor <M>{`c = ${c}`}</M> zieht <M>{"2^n"}</M> spätestens ab{" "}
        <M>{`n = ${nStar}`}</M> endgültig davon; davor können beide Kurven die Rollen
        mehrfach tauschen. Der Vorfaktor verschiebt die Schwelle also
        nur, und selbst <M>{"c = 1000"}</M> kostet die Exponentialfunktion bloß 14 Schritte
        (von <M>{"n = 5"}</M> auf <M>{"n = 19"}</M>). Nach {ref("beispiel:vereinfachung-eines-aufwandsausdrucks")} verschwindet jeder
        konstante Faktor in der Landau-Notation, deshalb ist <M>{"c \\cdot n^2 = O(n^2)"}</M>{" "}
        unabhängig von <M>{"c"}</M>.
      </>
    );
  } else if (enabled.kub && enabled.quad) {
    art = "warn";
    verdikt = (
      <>
        Hier stehen zwei polynomiale Klassen gegeneinander: <M>{"n^3 > c \\cdot n^2"}</M> gilt
        genau für <M>{`n > c = ${c}`}</M>. Auch hier entscheidet der Vorfaktor nur, <em>wo</em>{" "}
        die Kurven sich kreuzen, nicht <em>ob</em> ({ref("lemma:rechenregeln-fuer-landau-symbole")}, Regel 3, mit{" "}
        <M>{"n^2 = O(n^3)"}</M>).
      </>
    );
  } else if (active.length <= 1) {
    verdikt = (
      <>
        Mit einer einzigen Kurve lässt sich nichts vergleichen. Schalten wir mindestens zwei
        Klassen an; interessant sind Paare, bei denen der Vorfaktor die eine kurzzeitig nach
        oben schiebt.
      </>
    );
  } else {
    const teuerste = active[active.length - 1];
    verdikt = (
      <>
        Von den gewählten Klassen wächst <strong style={{ color: teuerste.color }}>
          {teuerste.label}
        </strong>{" "}
        am schnellsten und liegt bei <M>{`n = ${nMax}`}</M> bei{" "}
        {fmtVal(teuerste.f(nMax, c))} Operationen. Die Kette{" "}
        <M>{"\\log n,\\ n,\\ n\\log n,\\ n^2,\\ n^3,\\ 2^n"}</M> ist strikt: Jede Klasse ist
        klein-o der nächsten, jede Kurve wird also von jeder weiter rechts stehenden
        irgendwann endgültig überholt.
      </>
    );
  }

  return (
    <div className="space-y-3">
      <Aufgabe>
        Wählen wir ein Preset, schieben dann den Vorfaktor <M>{"c"}</M> nach oben und
        beobachten, wohin der Schnittpunkt wandert.
      </Aufgabe>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Presets">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={preset === p.id ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={preset === p.id}
            onClick={() => setzePreset(p)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]">
        {/* Zwei Tafeln übereinander; der Skalenwechsel blendet über (300 ms). */}
        <div className="grid min-w-0">
          {(
            [
              ["linear", linSeries, linDomain, linLabel],
              ["log", logSeries, logDomain, "log₁₀ f(n)"],
            ] as [string, Series[], [number, number], string][]
          ).map(([id, series, yDomain, yLabel]) => {
            const sichtbar = scale === id;
            return (
              <div
                key={id}
                aria-hidden={!sichtbar}
                className="min-w-0 transition-opacity duration-300 ease-in-out"
                style={{
                  gridArea: "1 / 1",
                  opacity: sichtbar ? 1 : 0,
                  pointerEvents: sichtbar ? undefined : "none",
                }}
              >
                <LabeledPlot
                  xLabel="n"
                  yLabel={yLabel}
                  series={series}
                  xDomain={[1, nMax]}
                  yDomain={yDomain}
                  width={360}
                  height={260}
                  ariaLabel={`Komplexitätsklassen auf ${id === "linear" ? "linearer" : "logarithmischer"} Skala, n bis ${nMax}.`}
                />
              </div>
            );
          })}
        </div>

        <div className="min-w-0 space-y-2 text-sm">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-600">
                <th className="py-1 text-left font-medium">Klasse</th>
                <th className="py-1 font-medium">f({nMax})</th>
              </tr>
            </thead>
            <tbody>
              {active.map((k) => (
                <tr key={k.key}>
                  <td className="py-0.5 text-left font-mono" style={{ color: k.color }}>
                    {k.label}
                  </td>
                  <td className="py-0.5 font-mono">{fmtVal(k.f(nMax, c))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {capped && scale === "linear" && (
            <p className={`text-xs ${W_MUTED}`}>
              Die lineare y-Achse ist bei <M>{"10^5"}</M> gekappt; die schnellsten Kurven
              verlassen den sichtbaren Bereich als fast senkrechte Wand. Auf der log-Skala
              werden sie wieder vergleichbar.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex overflow-hidden rounded-md border border-slate-300 dark:border-slate-600">
          {(["linear", "log"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScale(s)}
              aria-pressed={scale === s}
              className={`rounded-none border-0 ${scale === s ? W_BUTTON_AKTIV : W_BUTTON}`}
            >
              {s === "linear" ? "lineare Skala" : "log-Skala"}
            </button>
          ))}
        </div>
        <fieldset className="flex flex-wrap gap-3 border-0 p-0">
          <legend className="sr-only">Sichtbare Komplexitätsklassen</legend>
          {KLASSEN.map((k) => (
            <label key={k.key} className="flex cursor-pointer select-none items-center gap-1">
              <input
                type="checkbox"
                checked={enabled[k.key]}
                onChange={() => {
                  setEnabled((e) => ({ ...e, [k.key]: !e[k.key] }));
                  setPreset("");
                }}
              />
              <span className="font-mono" style={{ color: k.color }}>
                {k.label}
              </span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className="max-w-md">
        <Slider label="n bis" value={nMax} onChange={setNMax} min={10} max={200} step={5} fmt={(v) => String(v)} />
        <Slider
          label="Vorfaktor c"
          value={cExp}
          onChange={setCExp}
          min={0}
          max={3}
          step={0.25}
          accent={FMM_COLORS.orange}
          fmt={(v) => String(Math.round(Math.pow(10, v)))}
        />
      </div>

      <Verdikt kind={art}>{verdikt}</Verdikt>
    </div>
  );
}
