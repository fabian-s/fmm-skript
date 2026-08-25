import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Stepper, Verdikt } from "../../../lib";

/**
 * §12.3 — DIE EINE EINSICHT: Beim Gradientenabstieg auf einer Parabel
 * entscheidet allein der Faktor |1 − γf″| über alles. Unterhalb von 1/L nähern
 * sich die Iterierten von einer Seite, bei 1/L sitzt der erste Schritt exakt im
 * Minimum, zwischen 1/L und 2/L springen sie hin und her, bei 2/L pendeln sie
 * für immer, darüber laufen sie davon.
 *
 * Eigenbau zur Folie „Beispiel Gradientenabstieg: Schritt für Schritt"
 * (12-optim.Rmd Z. 484–499); nichts davon ist aus einer Buch-App portiert.
 * Der Zustand wird deterministisch aus der Schrittnummer gerechnet (Muster
 * S134Bfgs), der Verlauf ist deshalb scrubbar und rückwärts begehbar.
 *
 * Farbrollen nach dem Kapitel-13-Code: Iterierte blau, das Minimum grün, der
 * Schritt −γf′(x⁽ᵏ⁾) und die Tangente orange, Divergenzwarnung rot; der Graph
 * von f trägt das im Kapitel freie Violett (wie in S131Bisektion).
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen:
 *  - f(x) = (x − 2)² + 1, f″ ≡ 2 = L, also 1/L = 0,5 und 2/L = 1.
 *  - γ = 0,6 ab x⁽⁰⁾ = 4,5: 4,5 → 1,5 → 2,1 → 1,98 → 2,004 → 1,9992 mit den
 *    Fehlern 2,5 / −0,5 / 0,1 / −0,02 / 0,004 / −0,0008, Faktor also −0,2.
 *  - Faktoren 1 − 2γ für γ = 0,2 / 0,4 / 0,5 / 0,6 / 0,9 / 1,0 / 1,1:
 *    0,600 / 0,200 / 0,000 / −0,200 / −0,800 / −1,000 / −1,200.
 */

const BLAU = FMM_COLORS.blau; // Iterierte
const GRUEN = FMM_COLORS.gruen; // Minimum
const ORANGE = FMM_COLORS.orange; // Schritt und Tangente
const ROT = FMM_COLORS.rot; // Divergenzwarnung
const VIOLETT = FMM_COLORS.violett; // Graph von f
const ACHSE = "#64748b";

const f = (x: number) => (x - 2) ** 2 + 1;
const df = (x: number) => 2 * x - 4;
const L = 2; // f'' ≡ 2

const W = 430;
const H = 260;
const PAD_L = 34;
const PAD_B = 24;
const PAD_T = 8;
const PAD_R = 8;
const XMIN = -2.5;
const XMAX = 6.5;
const YMIN = 0;
const YMAX = 22;
const K_MAX = 12;

const px = (x: number) => PAD_L + ((x - XMIN) / (XMAX - XMIN)) * (W - PAD_L - PAD_R);
const py = (y: number) => H - PAD_B - ((y - YMIN) / (YMAX - YMIN)) * (H - PAD_B - PAD_T);
const clampX = (x: number) => Math.max(XMIN, Math.min(XMAX, x));
const clampY = (y: number) => Math.max(YMIN, Math.min(YMAX, y));

const fmt = (v: number, d = 4): string => {
  if (Math.abs(v) >= 1e5 && Number.isFinite(v)) {
    return v
      .toExponential(2)
      .replace(".", ",")
      .replace("e+", " · 10^")
      .replace("e-", " · 10^−")
      .replace(/^-/, "−");
  }
  return fmtDe(v, d);
};

export function GdStepper1D() {
  const [gamma, setGamma] = useState(0.6);
  const [x0, setX0] = useState(4.5);
  const [k, setK] = useState(0);

  // Die ganze Bahn wird deterministisch aus den Reglern und k gerechnet; es
  // gibt keinen versteckten Zustand, deshalb ist der Regler scrubbar.
  const bahn = useMemo(() => {
    const b: number[] = [x0];
    for (let i = 0; i < k; i++) {
      const x = b[b.length - 1];
      const next = x - gamma * df(x);
      b.push(Number.isFinite(next) ? next : next > 0 ? 1e308 : -1e308);
    }
    return b;
  }, [x0, gamma, k]);
  const x = bahn[bahn.length - 1];
  const faktor = 1 - gamma * L;

  const kurve = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 240; i++) {
      const xx = XMIN + ((XMAX - XMIN) * i) / 240;
      const yy = f(xx);
      if (yy <= YMAX) pts.push(`${px(xx).toFixed(1)},${py(yy).toFixed(1)}`);
    }
    return pts.join(" ");
  }, []);

  const xt = [-2, 0, 2, 4, 6];
  const yt = [5, 10, 15, 20];

  // Tangente im aktuellen Punkt, gezeichnet über eine feste x-Spanne
  const tangSpanne = 1.1;
  const tx1 = clampX(x - tangSpanne);
  const tx2 = clampX(x + tangSpanne);
  const tang = (t: number) => f(x) + df(x) * (t - x);

  const naechste = x - gamma * df(x);
  const imBild = Math.abs(x) < 1e6 && f(x) <= YMAX;

  const tabelle = bahn.map((v, i) => ({ i, v, g: df(v), fv: f(v), e: v - 2 })).slice(-7);

  const eps = 1e-9;
  let art: "ok" | "warn" | "fail" | "neutral";
  let titel: string;
  let status: string;
  if (Math.abs(gamma - 1 / L) < eps) {
    art = "ok";
    titel = "γ = 1/L trifft in einem Schritt";
    status =
      "Der Faktor 1 − γf″ ist genau null, der erste Schritt landet exakt im Minimum x* = 2. Bei einer Parabel ist das kein Zufall, sondern derselbe Schritt, den das Newton-Verfahren aus Algorithmus 12.4.1 macht: γ = 1/f″ ist die inverse Krümmung.";
  } else if (gamma < 1 / L) {
    art = "neutral";
    titel = "γ < 1/L: einseitige Annäherung";
    status = `Der Faktor 1 − γf″ = ${fmt(faktor, 2)} ist positiv. Der Fehler behält also sein Vorzeichen und schrumpft in jedem Schritt auf das ${fmt(faktor, 2)}-fache: Die Iterierten nähern sich von einer Seite, dafür langsam. Das ist der erste Fall von Bemerkung 12.3.7, und Satz 12.3.13 deckt genau diesen Bereich ab, denn er verlangt γ ≤ 1/L.`;
  } else if (gamma < 2 / L - eps) {
    art = "neutral";
    titel = "1/L < γ < 2/L: Überschießen, aber konvergent";
    status = `Der Faktor 1 − γf″ = ${fmt(faktor, 2)} ist negativ, die Iterierten springen also in jedem Schritt über das Minimum hinweg. Weil sein Betrag unter 1 liegt, wird der Sprung trotzdem kleiner. Das ist der dritte Fall von Bemerkung 12.3.7: Die Garantie von Satz 12.3.13 gilt hier nicht mehr, gut geht es trotzdem.`;
  } else if (Math.abs(gamma - 2 / L) < eps) {
    art = "warn";
    titel = "γ = 2/L ist die Grenze";
    status =
      "Der Fehler wechselt nur noch das Vorzeichen und behält seinen Betrag. Die Iteration pendelt für immer zwischen zwei Punkten, ohne je näher zu kommen. Beliebig oft in die richtige Richtung zu laufen genügt eben nicht, wenn die Schrittlänge nicht dazu passt.";
  } else {
    art = "fail";
    titel = "γ > 2/L: Divergenz";
    status = `Der Betrag des Faktors ist ${fmt(Math.abs(faktor), 2)} > 1, jeder Schritt vergrößert den Fehler. Die Folge läuft davon, obwohl jeder einzelne Schritt in die richtige Richtung startet und der Funktionswert am Startpunkt kleiner wird.`;
  }

  const narration =
    k === 0
      ? `Ausgangslage: x⁽⁰⁾ = ${fmt(x0, 2)}, Fehler ${fmt(x0 - 2, 4)}.`
      : `Schritt ${k}: x⁽${k}⁾ = ${fmt(x, 4)}, Fehler ${fmt(x - 2, 4)} = ${fmt(faktor, 2)} · (Fehler davor).`;

  return (
    <div className="my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60">
      <Aufgabe>
        Schieben wir γ nach oben, bis der Fehler in der Tabelle das Vorzeichen wechselt, und
        dann weiter, bis er wächst.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-4">
        <div className="inline-block">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            role="img"
            aria-label={`Der Graph von f(x) = (x − 2)² + 1 mit den ersten ${k} Iterierten des Gradientenabstiegs bei γ = ${fmt(gamma, 2)}.`}
            className="max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <line x1={PAD_L} y1={py(0)} x2={W - PAD_R} y2={py(0)} stroke={ACHSE} strokeWidth={1} />
            <line x1={px(0)} y1={PAD_T} x2={px(0)} y2={H - PAD_B} stroke={ACHSE} strokeWidth={1} />
            {xt.map((t) => (
              <g key={`x${t}`}>
                <line x1={px(t)} y1={py(0)} x2={px(t)} y2={py(0) + 4} stroke={ACHSE} />
                <text x={px(t)} y={py(0) + 15} fontSize="9" fill={ACHSE} textAnchor="middle">
                  {t}
                </text>
              </g>
            ))}
            {yt.map((t) => (
              <g key={`y${t}`}>
                <line x1={px(0) - 4} y1={py(t)} x2={px(0)} y2={py(t)} stroke={ACHSE} />
                <text x={px(0) - 6} y={py(t) + 3} fontSize="9" fill={ACHSE} textAnchor="end">
                  {t}
                </text>
              </g>
            ))}
            <text x={W - PAD_R} y={py(0) - 6} fontSize="10" fill={ACHSE} textAnchor="end">
              x
            </text>
            <text x={px(0) + 5} y={PAD_T + 9} fontSize="10" fill={ACHSE}>
              f(x)
            </text>

            <polyline points={kurve} fill="none" stroke={VIOLETT} strokeWidth={2} />

            {/* Minimum */}
            <circle cx={px(2)} cy={py(1)} r={5} fill="none" stroke={GRUEN} strokeWidth={2} />
            <text x={px(2)} y={py(1) + 20} fontSize="9" fill={GRUEN} textAnchor="middle">
              x* = 2
            </text>

            {/* Weg der Iterierten auf dem Graphen */}
            <polyline
              points={bahn
                .filter((v) => Number.isFinite(v))
                .map((v) => `${px(clampX(v)).toFixed(1)},${py(clampY(f(v))).toFixed(1)}`)
                .join(" ")}
              fill="none"
              stroke={BLAU}
              strokeWidth={1.2}
              strokeDasharray="4 3"
              opacity={0.8}
            />
            {bahn.map((v, i) =>
              Number.isFinite(v) ? (
                <circle
                  key={i}
                  cx={px(clampX(v))}
                  cy={py(clampY(f(v)))}
                  r={i === bahn.length - 1 ? 5 : 3}
                  fill={BLAU}
                  opacity={i === bahn.length - 1 ? 1 : 0.55}
                />
              ) : null,
            )}

            {imBild && (
              <>
                {/* Tangente: die Steigung, aus der der Schritt gebaut wird */}
                <line
                  x1={px(tx1)}
                  y1={py(clampY(tang(tx1)))}
                  x2={px(tx2)}
                  y2={py(clampY(tang(tx2)))}
                  stroke={ORANGE}
                  strokeWidth={1.6}
                />
                {/* Schritt −γ f'(x) auf der x-Achse */}
                <line
                  x1={px(clampX(x))}
                  y1={py(0)}
                  x2={px(clampX(naechste))}
                  y2={py(0)}
                  stroke={ORANGE}
                  strokeWidth={3}
                />
                <line
                  x1={px(clampX(x))}
                  y1={py(clampY(f(x)))}
                  x2={px(clampX(x))}
                  y2={py(0)}
                  stroke={BLAU}
                  strokeWidth={0.9}
                  strokeDasharray="2 3"
                />
                <text
                  x={px(clampX((x + naechste) / 2))}
                  y={py(0) - 6}
                  fontSize="9"
                  fill={ORANGE}
                  textAnchor="middle"
                >
                  −γ f′(x⁽ᵏ⁾)
                </text>
              </>
            )}
            {!imBild && (
              <text x={W / 2} y={H / 2} fontSize="11" fill={ROT} textAnchor="middle">
                x⁽ᵏ⁾ liegt außerhalb des Fensters
              </text>
            )}
          </svg>
        </div>

        <div className="min-w-60 grow">
          <Slider
            label="Schrittweite γ"
            value={gamma}
            onChange={setGamma}
            min={0.05}
            max={1.2}
            step={0.05}
            accent={ORANGE}
          />
          <Slider
            label="Startwert x⁽⁰⁾"
            value={x0}
            onChange={setX0}
            min={0.5}
            max={5}
            step={0.25}
            accent={BLAU}
          />
          <Stepper step={k} setStep={setK} max={K_MAX} narration={narration} />
          <div className="mt-2 font-mono text-xs">
            <p>f(x) = (x − 2)² + 1, f′(x) = 2x − 4, L = f″ = 2, also 1/L = 0,5 und 2/L = 1</p>
            <p>Fehlerfaktor 1 − γf″ = {fmt(faktor, 2)}</p>
            <table className="mt-1 w-full text-right">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400">
                  <th className="pr-2 text-left">k</th>
                  <th className="pr-2">x⁽ᵏ⁾</th>
                  <th className="pr-2">f′(x⁽ᵏ⁾)</th>
                  <th className="pr-2">f(x⁽ᵏ⁾)</th>
                  <th>x⁽ᵏ⁾ − 2</th>
                </tr>
              </thead>
              <tbody>
                {tabelle.map((z) => (
                  <tr key={z.i}>
                    <td className="pr-2 text-left">{z.i}</td>
                    <td className="pr-2">{fmt(z.v)}</td>
                    <td className="pr-2">{fmt(z.g)}</td>
                    <td className="pr-2">{fmt(z.fv)}</td>
                    <td>{fmt(z.e)}</td>
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
