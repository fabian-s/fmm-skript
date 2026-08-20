import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  fmtDe,
  niceTicks,
  fmtTick,
  Slider,
  Stepper,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
} from "../../../lib";

/**
 * §13.1 — DIE EINE EINSICHT: Die Bisektion halbiert die Klammer in jedem
 * Schritt, deshalb ist ihre Schrittzahl nach Satz 13.1.8 exakt vorhersagbar —
 * und ebenso, dass sie bei mehreren Nullstellen im Startintervall nicht sagen
 * kann, welche sie findet: das entscheidet schon der erste Mittelpunkt.
 *
 * Widget-CODE (Rahmenrechnung mkRahmen/Achsen/fnPfad, Stepper-Knoepfe,
 * Intervalltabelle) portiert aus heath-ch5-6/src/sections/widgets/S55Widgets.tsx
 * (BisectionWidget, Ex57Table). SAEMTLICHE Texte, Beispielfunktionen,
 * Farbgebung und Statuszweige sind neu und gehoeren zu diesem Skript.
 *
 * Farbrollen nach dem Kapitel-13-Code: Klammer [a, b] und Iterierte blau,
 * Nullstelle gruen, der gerade gepruefte Mittelpunkt orange; der Graph von f
 * traegt das im Kapitel freie Violett.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen, 2026-08-19;
 * aeltere Pruefung check-math-s131.mjs bestaetigt):
 * - f(x) = x^2 - 2 auf [1, 2]: eps = 1e-3 -> 10 Schritte, 1e-4 -> 14,
 *   1e-6 -> 20, 1e-8 -> 27, 1e-10 -> 34; die Vorhersage ceil(log2((b-a)/eps))
 *   trifft in allen fuenf Faellen exakt. Bei eps = 1e-6 hat das Endintervall
 *   die Laenge 9,5367e-7 = 2^-20, seine Mitte 1,414213657 liegt 9,501e-8
 *   neben sqrt(2).
 * - Eine zusaetzliche Dezimalstelle kostet 1/log10(2) = 3,3219 Schritte.
 * - f(x) = x^3 - 3x + 1 hat DREI Nullstellen (-1,879385 / 0,347296 /
 *   1,532089); aus [-2, 2] laeuft die Bisektion in 22 Schritten gegen die
 *   linke, denn f(0) = 1 hat dasselbe Vorzeichen wie f(2) = 3.
 */

const BLAU = FMM_COLORS.blau;
const GRUEN = FMM_COLORS.gruen;
const ORANGE = FMM_COLORS.orange;
const VIOLETT = FMM_COLORS.violett;
const ACHSE = "#64748b";

interface Aufgabe {
  id: string;
  label: string;
  f: (x: number) => number;
  a0: number;
  b0: number;
  xd: [number, number];
  yd: [number, number];
  /** alle Nullstellen im Startintervall, auf zwoelf Stellen vorgerechnet */
  nullstellen: number[];
}

const AUFGABEN: Aufgabe[] = [
  {
    id: "wurzel",
    label: "x² − 2 auf [1, 2]",
    f: (x) => x * x - 2,
    a0: 1,
    b0: 2,
    xd: [0.9, 2.1],
    yd: [-1.4, 2.4],
    nullstellen: [Math.SQRT2],
  },
  {
    id: "kubisch",
    label: "x³ − 3x + 1 auf [−2, 2]",
    f: (x) => x * x * x - 3 * x + 1,
    a0: -2,
    b0: 2,
    xd: [-2.2, 2.2],
    yd: [-3.4, 3.4],
    nullstellen: [-1.879385241572, 0.347296355334, 1.532088886238],
  },
];

const W = 430;
const H = 250;
const PAD = { l: 40, r: 12, t: 10, b: 26 };

const fmt = (v: number, d = 6) => fmtDe(v, d);

const HOCH: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻",
};

/** wissenschaftliche Notation mit deutschem Komma und echten Hochzahlen */
function fmtE(v: number): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return "∞";
  if (v === 0) return "0";
  const [mant, ex] = v.toExponential(2).split("e");
  const hoch = String(Number(ex))
    .split("")
    .map((c) => HOCH[c] ?? c)
    .join("");
  return `${mant.replace(".", ",")}·10${hoch}`;
}

interface Zeile {
  a: number;
  b: number;
  /** Mittelpunkt, der in diesem Schritt geprueft wird (undefined in der letzten Zeile) */
  m: number | null;
}

/** Kompletter Intervall-Verlauf bis zur Toleranz, hoechstens 60 Schritte. */
function verlauf(auf: Aufgabe, tol: number): Zeile[] {
  let a = auf.a0;
  let b = auf.b0;
  const zeilen: Zeile[] = [];
  while (b - a > tol && zeilen.length < 60) {
    const m = a + (b - a) / 2;
    zeilen.push({ a, b, m });
    if (Math.sign(auf.f(a)) === Math.sign(auf.f(m))) a = m;
    else b = m;
  }
  zeilen.push({ a, b, m: null });
  return zeilen;
}

export function BisektionStepper() {
  const [id, setId] = useState("wurzel");
  const [exp, setExp] = useState(6);
  const [k, setK] = useState(0);

  const auf = AUFGABEN.find((a) => a.id === id) ?? AUFGABEN[0];
  const tol = Math.pow(10, -exp);
  const zeilen = useMemo(() => verlauf(auf, tol), [auf, tol]);

  const idx = Math.min(k, zeilen.length - 1);
  const { a, b, m } = zeilen[idx];
  const fertig = m === null;
  const gleichesVorzeichen = m === null ? false : Math.sign(auf.f(a)) === Math.sign(auf.f(m));

  const px = (x: number) =>
    PAD.l + ((x - auf.xd[0]) / (auf.xd[1] - auf.xd[0])) * (W - PAD.l - PAD.r);
  const py = (y: number) =>
    PAD.t + ((auf.yd[1] - y) / (auf.yd[1] - auf.yd[0])) * (H - PAD.t - PAD.b);

  /** Graph von f als Pfad, mit Stiftheber ausserhalb des Fensters. */
  let kurve = "";
  {
    const n = 360;
    let stift = false;
    for (let i = 0; i <= n; i++) {
      const x = auf.xd[0] + ((auf.xd[1] - auf.xd[0]) * i) / n;
      const y = auf.f(x);
      if (!Number.isFinite(y) || y < auf.yd[0] || y > auf.yd[1]) {
        stift = false;
        continue;
      }
      kurve += `${stift ? "L" : "M"}${px(x).toFixed(1)} ${py(y).toFixed(1)}`;
      stift = true;
    }
  }

  // Achsen-Ticks samt Schrittweite: fmtTick braucht sie, sonst stehen
  // Gleitkommareste wie 1,5999999999999999 an der Achse.
  const xTicks = niceTicks(auf.xd[0], auf.xd[1]);
  const yTicks = niceTicks(auf.yd[0], auf.yd[1]);
  const xStep = xTicks.length > 1 ? xTicks[1] - xTicks[0] : 1;
  const yStep = yTicks.length > 1 ? yTicks[1] - yTicks[0] : 1;

  const schritteVorhergesagt = Math.ceil(Math.log2((auf.b0 - auf.a0) / tol));
  const mitte = a + (b - a) / 2;
  const naechste = auf.nullstellen.reduce(
    (best, r) => (Math.abs(r - mitte) < Math.abs(best - mitte) ? r : best),
    auf.nullstellen[0],
  );

  let art: "neutral" | "ok" | "warn" = "neutral";
  let titel = `Klammer nach ${idx} ${idx === 1 ? "Halbierung" : "Halbierungen"}`;
  let status: string;
  if (fertig) {
    art = "ok";
    titel = "am Ziel";
    status =
      `Fertig nach ${zeilen.length - 1} Halbierungen. Satz 13.1.8 hatte ` +
      `⌈log₂((b − a)/ε)⌉ = ${schritteVorhergesagt} vorhergesagt, und das ist keine Schätzung, ` +
      `sondern die exakte Zahl. Zurück geben wir die Mitte ${fmt(mitte)} des Endintervalls, dessen ` +
      `Länge ${fmtE(b - a)} unter ε = ${fmtE(tol)} liegt. Garantiert ist damit ein Fehler von ` +
      `höchstens ${fmtE((b - a) / 2)}; tatsächlich sind es ${fmtE(Math.abs(mitte - naechste))} bis zur ` +
      `Nullstelle ${fmt(naechste)}.`;
  } else if (auf.id === "kubisch" && idx === 0) {
    art = "warn";
    titel = "drei Nullstellen, eine Klammer";
    status =
      `Das Startintervall [−2, 2] enthält drei Nullstellen: −1,879385, 0,347296 und 1,532089. ` +
      `Der Vorzeichenwechsel zwischen f(−2) = −1 und f(2) = 3 sagt nur, dass mindestens eine ` +
      `darin liegt. Welche das Verfahren findet, entscheidet der erste Test: Weil f(0) = 1 ` +
      `dasselbe Vorzeichen hat wie f(2), verwerfen wir die rechte Hälfte samt zwei Nullstellen ` +
      `und laufen gegen die linke.`;
  } else {
    const mm = m as number;
    status =
      `Die Vorzeichenprobe an der Stelle m = ${fmt(mm)} entscheidet Schritt ${idx + 1}. Dort ist ` +
      `f(m) = ${fmt(auf.f(mm))}, am linken Rand f(a) = ${fmt(auf.f(a))}: ` +
      `${gleichesVorzeichen ? "kein Wechsel zwischen a und m, der Wechsel muss also rechts von m sitzen" : "zwischen a und m liegt der Wechsel"}. ` +
      `Wir werfen die ${gleichesVorzeichen ? "linke" : "rechte"} Hälfte weg und setzen ` +
      `${gleichesVorzeichen ? "a ← m" : "b ← m"}. Übrig bleibt eine Klammer der Länge ` +
      `${fmtE((b - a) / 2)}, und wo immer die Nullstelle darin steckt, von deren Mitte ist sie ` +
      `höchstens ${fmtE((b - a) / 4)} entfernt.`;
  }

  const knopf = (aktiv: boolean) => (aktiv ? W_BUTTON_AKTIV : W_BUTTON);

  const tabelle = zeilen.slice(0, idx + 1);

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir den Schrittregler durch und vergleichen die gebrauchte Zahl der Halbierungen
        mit der Vorhersage von Satz 13.1.8.
      </Aufgabe>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-400">
        Violett der Graph von f, blau die aktuelle Klammer [a, b] auf der x-Achse, orange der
        Mittelpunkt m, den dieser Schritt prüft, grün die Nullstellen. Ein Schritt ist genau ein
        Durchlauf der Schleife aus Algorithmus 13.1.7.
      </p>
      <div className="flex flex-wrap gap-2">
        {AUFGABEN.map((x) => (
          <button
            key={x.id}
            type="button"
            className={knopf(x.id === id)}
            onClick={() => {
              setId(x.id);
              setK(0);
            }}
          >
            f(x) = {x.label}
          </button>
        ))}
      </div>
      <Slider
        label="Toleranz ε"
        value={exp}
        onChange={(v) => {
          setExp(Math.round(v));
          setK(0);
        }}
        min={1}
        max={10}
        step={1}
        fmt={(v) => `10^−${Math.round(v)}`}
      />
      <Stepper
        step={idx}
        setStep={setK}
        max={zeilen.length - 1}
        narration={
          fertig
            ? `Endintervall [${fmt(a, 8)}; ${fmt(b, 8)}]`
            : `Prüfpunkt m = ${fmt(m as number, 6)}`
        }
      />

      <div className="flex flex-wrap items-start gap-4">
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Der Graph von f mit der Klammer [a, b] nach ${idx} Halbierungen und dem gerade geprüften Mittelpunkt.`}
          className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <rect
            x={PAD.l}
            y={PAD.t}
            width={W - PAD.l - PAD.r}
            height={H - PAD.t - PAD.b}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth={0.8}
          />
          {xTicks.map((t) => (
            <g key={`x${t}`}>
              <line x1={px(t)} x2={px(t)} y1={H - PAD.b} y2={H - PAD.b + 3} stroke={ACHSE} />
              <text
                x={px(t)}
                y={H - PAD.b + 14}
                textAnchor="middle"
                fontSize={9}
                fill={ACHSE}
              >
                {fmtTick(t, xStep)}
              </text>
            </g>
          ))}
          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line x1={PAD.l - 3} x2={PAD.l} y1={py(t)} y2={py(t)} stroke={ACHSE} />
              <text x={PAD.l - 5} y={py(t) + 3} textAnchor="end" fontSize={9} fill={ACHSE}>
                {fmtTick(t, yStep)}
              </text>
            </g>
          ))}
          <line
            x1={PAD.l}
            x2={W - PAD.r}
            y1={py(0)}
            y2={py(0)}
            stroke={ACHSE}
            strokeWidth={1}
          />
          <text x={W - PAD.r - 4} y={py(0) - 5} textAnchor="end" fontSize={10} fill={ACHSE}>
            x
          </text>
          <text x={PAD.l + 3} y={PAD.t + 10} fontSize={10} fill={ACHSE}>
            f(x)
          </text>
          <path d={kurve} fill="none" stroke={VIOLETT} strokeWidth={1.8} />
          {auf.nullstellen.map((r) => (
            <circle
              key={r}
              cx={px(r)}
              cy={py(0)}
              r={4.5}
              fill="none"
              stroke={GRUEN}
              strokeWidth={2}
            />
          ))}
          <line
            x1={px(a)}
            x2={px(b)}
            y1={py(0)}
            y2={py(0)}
            stroke={BLAU}
            strokeWidth={5}
            opacity={0.55}
          />
          {[a, b].map((t, i) => (
            <g key={`e${i}`}>
              <line
                x1={px(t)}
                x2={px(t)}
                y1={py(0)}
                y2={py(auf.f(t))}
                stroke={BLAU}
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <circle cx={px(t)} cy={py(auf.f(t))} r={3.5} fill={BLAU} />
              <text x={px(t)} y={py(0) + 16} textAnchor="middle" fontSize={11} fill={BLAU}>
                {i === 0 ? "a" : "b"}
              </text>
            </g>
          ))}
          {m !== null && (
            <g>
              <line
                x1={px(m)}
                x2={px(m)}
                y1={py(0)}
                y2={py(auf.f(m))}
                stroke={ORANGE}
                strokeWidth={1.4}
              />
              <circle cx={px(m)} cy={py(auf.f(m))} r={4} fill={ORANGE} />
              <text x={px(m)} y={py(0) - 8} textAnchor="middle" fontSize={11} fill={ORANGE}>
                m
              </text>
            </g>
          )}
        </svg>

        <div className="min-w-56 grow">
          <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">
            Intervall-Verlauf (jede Zeile ein Schritt)
          </p>
          <div className="max-h-56 overflow-y-auto rounded border border-slate-300 dark:border-slate-600">
            <table className="w-full text-right font-mono text-xs">
              <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">
                <tr className="text-slate-600 dark:text-slate-300">
                  <th className="px-2 py-1">k</th>
                  <th className="px-2 py-1">a</th>
                  <th className="px-2 py-1">b</th>
                  <th className="px-2 py-1">b − a</th>
                </tr>
              </thead>
              <tbody>
                {tabelle.map((z, i) => (
                  <tr key={i} className={i === tabelle.length - 1 ? "font-semibold" : ""}>
                    <td className="px-2 py-0.5">{i}</td>
                    <td className="px-2 py-0.5">{fmt(z.a)}</td>
                    <td className="px-2 py-0.5">{fmt(z.b)}</td>
                    <td className="px-2 py-0.5">{fmtE(z.b - z.a)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Verdikt kind={art} titel={titel}>
        {status}
      </Verdikt>
    </div>
  );
}
