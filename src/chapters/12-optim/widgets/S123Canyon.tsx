import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  fmtDe,
  Slider,
  Surface3D,
  Verdikt,
  ViewControls,
  W_BUTTON,
  W_BUTTON_AKTIV,
} from "../../../lib";
import type { Kurve3D, Punkt3D, Sicht3D, Vec3 } from "../../../lib";

/**
 * §12.3 — DIE EINE EINSICHT: Die Kondition κ = L/μ erzeugt den Zickzack. Die
 * Schrittweite ist an die STEILE Richtung gebunden, vorankommen muss der
 * Abstieg aber in der flachen — deshalb kostet jede zusätzliche Dezimalstelle
 * bei großem κ um ein Vielfaches mehr Schritte. Die Rate 1 − μ/L aus Satz
 * 12.3.15 ist dabei eine SCHRANKE, keine exakte Vorhersage (Beispiel 12.3.16).
 *
 * Widget-CODE (Ellipsen-Höhenlinien mit Achsenkreuz und Ticks, halblogarithmische
 * Fehlerkurve mit Zehnerpotenz-Beschriftung) portiert aus
 * heath-ch5-6/src/sections/widgets/S65Widgets.tsx (QuadContourPlane, FvalChart)
 * und S623Widgets.tsx (Ellipsen-Niveaus der HessianConditioningWidget).
 * SÄMTLICHE Texte, Regler, Statuszweige und Farben sind neu; anders als dort
 * läuft hier keine exakte Liniensuche, sondern die feste Schrittweite γ.
 *
 * Drei Tafeln, verlinkt (Muster 3): Höhenlinien mit der Bahn, halblogarithmische
 * Fehlerkurve und (D7) dieselbe Quadrik als Fläche mit derselben Bahn. Alle
 * Zahlen stehen im Verdikt und in der Ablesetafel, nicht in der 3D-Tafel.
 *
 * Farbrollen nach dem Kapitel-13-Code: Iterierte und Fehlerkurve blau, das
 * Minimum grün, Divergenzwarnungen rot. Die Schranke des Satzes ist keine
 * Größe des Farbcodes und bleibt neutral grau gestrichelt; ebenso die
 * Quadrik selbst (Höhenlinien und 3D-Fläche), damit die blaue Bahn auf ihr
 * sichtbar bleibt.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen und
 * s133b.mjs, 2026-08-19; ältere Prüfung check-math-s133.mjs bestätigt):
 *  - Schritte, bis f auf ein Millionstel des Startwerts gefallen ist, bei
 *    γ = 1/L: κ = 1 → 1, κ = 10 → 64, κ = 100 → 608; bei γ = 0,9·(2/L), also
 *    den Voreinstellungen „Zickzack" und „Schlucht": κ = 10 → 35, κ = 25 → 88,
 *    κ = 100 → 336. Der Aufwand wächst in beiden Fällen proportional zu κ.
 *  - Bei γ = 1/L annulliert der erste Schritt x₂ exakt; danach fällt f je
 *    Schritt auf das (1 − μ/L)²-fache: 0,8100 bei κ = 10, 0,9801 bei κ = 100,
 *    also SCHNELLER als die Schranke ρ = 1 − μ/L = 0,9000 bzw. 0,9900.
 *  - x₂-Faktoren bei κ = 10: γ = 0,15 → −0,500; 0,18 → −0,800; 0,20 = 2/L →
 *    −1,000; 0,21 → −1,100.
 *  - Schritte je Dezimalstelle in f (gemessen ab dem Start) bei γ = 1/L:
 *    κ = 10 → 10, κ = 25 → 20, κ = 100 → 35; bei γ = 0,9·2/L: 6 / 12 / 20.
 *  - Alle 2200 Reglerzustände des Rasters (κ ∈ {1, …, 100}, Anteil
 *    0,05 … 1,10) wurden auf die Verdikt-Zweige durchgespielt (s133c.mjs):
 *    Zickzack 891, monoton 891, divergent 200, Grenze 2/L 100, γ = 1/L 99,
 *    κ = 1 gerade 18, κ = 1 in einem Schritt 1. Die beiden Zweige „γ = 1/μ"
 *    und „beide Richtungen schießen über" feuern auf diesem Raster NIE; sie
 *    bleiben als Absicherung stehen und sind hier ausdrücklich als
 *    unerreichbar dokumentiert.
 */

const BLAU = FMM_COLORS.blau; // Iterierte, Fehlerkurve
const GRUEN = FMM_COLORS.gruen; // Minimum
const ROT = FMM_COLORS.rot; // Divergenz
const GRAU = FMM_COLORS.grau; // die Quadrik selbst (Flaeche, Hoehenlinien)
const ACHSE = "#64748b";
const HILFS = "#94a3b8";

type V2 = [number, number];

const fmt = (v: number, d = 3): string => {
  if (Math.abs(v) >= 1e5 && Number.isFinite(v)) {
    return v.toExponential(2).replace(".", ",").replace(/^-/, "−");
  }
  return fmtDe(v, d);
};

const K_SCHRITTE = 20;
const START: V2 = [5, 1];

const CW = 400;
const CH = 220;
const XMAX = 6.5;
const YMAX = 3.3;
const cpx = (x: number) => ((x + XMAX) / (2 * XMAX)) * CW;
const cpy = (y: number) => CH - ((y + YMAX) / (2 * YMAX)) * CH;
const clamp = (v: number) => Math.max(-40, Math.min(40, v));

const PW = 360;
const PH = 200;
const PL = 46;
const PB = 24;
const PT = 10;
const PR = 10;

/** Die drei Voreinstellungen SIND die Fallunterscheidung nach der Kondition. */
const VOREINSTELLUNGEN: { name: string; kappa: number; anteil: number }[] = [
  { name: "κ = 1: rund", kappa: 1, anteil: 0.5 },
  { name: "κ = 10: Zickzack", kappa: 10, anteil: 0.9 },
  { name: "κ = 100: Schlucht", kappa: 100, anteil: 0.9 },
];

/** Schritte, bis f auf ein Millionstel des Startwerts gefallen ist. */
function schritteBisMillionstel(kappa: number, gamma: number): number | null {
  let p: V2 = [...START] as V2;
  const f0 = 0.5 * (START[0] ** 2 + kappa * START[1] ** 2);
  for (let k = 1; k <= 5000; k++) {
    p = [p[0] * (1 - gamma), p[1] * (1 - gamma * kappa)];
    const v = 0.5 * (p[0] ** 2 + kappa * p[1] ** 2);
    if (!Number.isFinite(v)) return null;
    if (v <= 1e-6 * f0) return k;
  }
  return null;
}

export function CanyonWidget() {
  const [kappa, setKappa] = useState(10);
  const [anteil, setAnteil] = useState(0.9); // γ als Anteil von 2/L

  const mu = 1;
  const L = kappa; // H = diag(1, κ), also μ = 1 und L = κ
  const gamma = (anteil * 2) / L;
  const f = useMemo(() => ([a, b]: V2) => 0.5 * (a * a + kappa * b * b), [kappa]);

  const { pts, fv } = useMemo(() => {
    const p: V2[] = [START];
    const v: number[] = [0.5 * (START[0] ** 2 + kappa * START[1] ** 2)];
    for (let k = 0; k < K_SCHRITTE; k++) {
      const [a, b] = p[p.length - 1];
      const nx: V2 = [a - gamma * a, b - gamma * kappa * b];
      p.push(nx);
      v.push(0.5 * (nx[0] ** 2 + kappa * nx[1] ** 2));
    }
    return { pts: p, fv: v };
  }, [kappa, gamma]);

  const f0 = fv[0];
  const rho = 1 - mu / L;
  const schrankeRate = 1 - gamma * mu; // gilt für γ ≤ 1/L
  const schrankeGilt = gamma <= 1 / L + 1e-12;
  const beobachtet = fv[3] > 0 ? fv[4] / fv[3] : NaN;
  const faktor1 = 1 - gamma;
  const faktor2 = 1 - gamma * kappa;
  const bisMillionstel = useMemo(() => schritteBisMillionstel(kappa, gamma), [kappa, gamma]);

  // Höhenlinien: f = v ist die Ellipse x₁²/(2v) + x₂²/(2v/κ) = 1
  const niveaus = [0.06, 0.22, 0.5, 0.9].map((t) => t * f0);

  // halblogarithmische Fehlerkurve
  const logs = fv.map((v) => Math.log10(Math.max(v, 1e-16)));
  let oben = Math.ceil(Math.max(...logs));
  let unten = Math.floor(Math.min(...logs));
  if (oben - unten < 4) unten = oben - 4;
  unten = Math.max(unten, -16);
  const gx = (k: number) => PL + ((PW - PL - PR) * k) / K_SCHRITTE;
  const gy = (lv: number) =>
    PT + ((PH - PT - PB) * (oben - Math.max(Math.min(lv, oben), unten))) / (oben - unten);
  const yschritt = Math.max(1, Math.ceil((oben - unten) / 5));
  const yticks: number[] = [];
  for (let t = oben; t >= unten; t -= yschritt) yticks.push(t);
  const kticks = [0, 5, 10, 15, 20];

  const schrankeLog = fv.map((_, k) => Math.log10(Math.max(schrankeRate ** k * f0, 1e-16)));

  let art: "neutral" | "ok" | "warn" | "fail";
  let titel: string;
  let status: string;
  if (Math.abs(faktor2) > 1 + 1e-12) {
    art = "fail";
    titel = "γ über der Stabilitätsgrenze";
    status = `γ = ${fmt(gamma, 4)} liegt über 2/L = ${fmt(2 / L, 4)}: In der steilen Richtung wächst der Fehler je Schritt um den Faktor ${fmt(Math.abs(faktor2), 2)}, die Folge läuft aus dem Bild. Satz 12.3.15 verlangt γ ≤ 1/L und sagt hier nichts mehr.`;
  } else if (Math.abs(faktor2 + 1) < 1e-12) {
    art = "warn";
    titel = "γ = 2/L ist die Grenze";
    status =
      "In der steilen Richtung pendelt die Iteration zwischen zwei Werten, ohne kleiner zu werden. Die flache Richtung kommt zwar weiter voran, aber die Fehlerkurve läuft in eine waagerechte Gerade.";
  } else if (kappa === 1) {
    // Isotroper Fall: es gibt keine steile und keine flache Richtung.
    if (Math.abs(faktor2) < 1e-12) {
      art = "ok";
      titel = "κ = 1: nach einem Schritt fertig";
      status =
        "Die Höhenlinien sind Kreise, μ und L fallen zusammen, und der negative Gradient zeigt direkt auf das Minimum: Mit γ = 1/L ist das Verfahren nach einem einzigen Schritt am Ziel. Der Zickzack braucht zwei verschiedene Krümmungen; hier gibt es nur eine.";
    } else {
      art = "neutral";
      titel = "κ = 1: gerade Bahn";
      status = `Beide Komponenten tragen denselben Faktor ${fmt(faktor1, 3)}, die Iterierten laufen also auf der Geraden durch Startpunkt und Minimum${faktor1 < 0 ? " und springen dabei in jedem Schritt über das Minimum hinweg" : ""}. Ein Zickzack gibt es hier nicht.`;
    }
  } else if (Math.abs(faktor2) < 1e-12) {
    art = "ok";
    titel = "γ = 1/L trifft die steile Richtung exakt";
    status = `x₂ ist nach einem Schritt null. Danach fällt f in jedem Schritt auf das ${fmt(faktor1 ** 2, 4)}-fache, also SCHNELLER als die Schranke ρ = 1 − μ/L = ${fmt(rho, 4)} aus Satz 12.3.15. Genau das führt Beispiel 12.3.16 vor: Der Satz verspricht höchstens ρ pro Schritt, nicht genau ρ.`;
  } else if (Math.abs(faktor1) < 1e-12) {
    art = "warn";
    titel = "γ = 1/μ trifft die flache Richtung exakt";
    status = `x₁ ist nach einem Schritt null. In der steilen Richtung springt der Fehler dagegen mit dem Faktor ${fmt(faktor2, 3)} hin und her. Der Satz deckt diese Schrittweite nicht ab, sie liegt über 1/L.`;
  } else if (faktor1 < 0) {
    art = "neutral";
    titel = "beide Richtungen schießen über";
    status = `γ ist so groß, dass beide Richtungen über das Minimum hinausschießen: die flache mit dem Faktor ${fmt(faktor1, 3)}, die steile mit ${fmt(faktor2, 3)}. Konvergent bleibt es nur, weil beide Beträge unter 1 liegen.`;
  } else if (faktor2 < 0) {
    art = "neutral";
    titel = "Zickzack";
    status = `In der steilen Richtung wechselt der Fehler mit dem Faktor ${fmt(faktor2, 2)} das Vorzeichen, in der flachen schrumpft er nur mit ${fmt(faktor1, 3)}. Die Schrittweite ist an die steile Richtung gebunden, vorankommen müssen wir in der flachen, daher der Zickzack. Bis f auf ein Millionstel gefallen ist, dauert es ${bisMillionstel === null ? "hier länger als 5000" : bisMillionstel} Schritte.`;
  } else {
    art = "neutral";
    titel = "monotone Annäherung";
    status = `Beide Richtungen schrumpfen monoton (Faktoren ${fmt(faktor1, 3)} und ${fmt(faktor2, 3)}). Die flache Richtung bestimmt das Tempo, und je größer κ, desto näher liegt ihr Faktor an 1. Bis f auf ein Millionstel gefallen ist, dauert es ${bisMillionstel === null ? "hier länger als 5000" : bisMillionstel} Schritte.`;
  }

  /* --------------------------------------------- verlinkte 3D-Tafel (D7) */

  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 32, elevation: 22 });
  const YHALB = 1.6;
  const flaeche = useMemo(
    // Die Flaeche bleibt neutral grau: Blau gehoert in diesem Kapitel den
    // Iterierten, und eine blaue Bahn auf blauer Flaeche ist unsichtbar.
    () => ({ f: (a: number, b: number) => f([a, b]), nx: 32, ny: 26, color: GRAU, opacity: 0.8, wire: true }),
    [f],
  );
  const kurve3d = useMemo((): Kurve3D[] => {
    const q = pts
      .filter(([a, b]) => Math.abs(a) <= XMAX && Math.abs(b) <= YHALB)
      .map(([a, b]) => [a, b, f([a, b])] as Vec3);
    return q.length > 1 ? [{ pts: q, color: BLAU, width: 2, onTop: true }] : [];
  }, [pts, f]);
  const punkte3d = useMemo(
    (): Punkt3D[] => [{ p: [0, 0, 0] as Vec3, color: GRUEN, r: 4.5, label: "x*", onTop: true }],
    [],
  );

  const knopf = (aktiv: boolean) => (aktiv ? W_BUTTON_AKTIV : W_BUTTON);

  return (
    <div className="my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60">
      <Aufgabe>
        Schieben wir κ von 1 auf 100 und zählen, wie viele Schritte die Fehlerkurve für dieselbe
        Höhe braucht.
      </Aufgabe>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {VOREINSTELLUNGEN.map((v) => {
          const aktiv = kappa === v.kappa && Math.abs(anteil - v.anteil) < 1e-9;
          return (
            <button
              key={v.name}
              type="button"
              aria-pressed={aktiv}
              className={knopf(aktiv)}
              onClick={() => {
                setKappa(v.kappa);
                setAnteil(v.anteil);
              }}
            >
              {v.name}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex flex-col gap-3">
          <svg
            viewBox={`0 0 ${CW} ${CH}`}
            width={CW}
            height={CH}
            role="img"
            aria-label={`Höhenlinien der Quadrik mit κ = ${fmt(kappa, 1)} und der Bahn des Gradientenabstiegs über zwanzig Schritte.`}
            className="max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <line x1={0} y1={cpy(0)} x2={CW} y2={cpy(0)} stroke={HILFS} />
            <line x1={cpx(0)} y1={0} x2={cpx(0)} y2={CH} stroke={HILFS} />
            {[-6, -4, -2, 2, 4, 6].map((t) => (
              <text key={`x${t}`} x={cpx(t)} y={cpy(0) + 12} fontSize="9" fill={ACHSE} textAnchor="middle">
                {t}
              </text>
            ))}
            {[-3, -2, -1, 1, 2, 3].map((t) => (
              <text key={`y${t}`} x={cpx(0) - 5} y={cpy(t) + 3} fontSize="9" fill={ACHSE} textAnchor="end">
                {t}
              </text>
            ))}
            <text x={CW - 8} y={cpy(0) - 5} fontSize="10" fill={ACHSE} textAnchor="end">
              x₁
            </text>
            <text x={cpx(0) + 6} y={12} fontSize="10" fill={ACHSE}>
              x₂
            </text>
            {niveaus.map((v, i) => (
              <ellipse
                key={i}
                cx={cpx(0)}
                cy={cpy(0)}
                rx={(Math.sqrt(2 * v) / (2 * XMAX)) * CW}
                ry={(Math.sqrt((2 * v) / kappa) / (2 * YMAX)) * CH}
                fill="none"
                stroke={HILFS}
                strokeWidth={0.9}
              />
            ))}
            <polyline
              points={pts
                .filter((q) => Number.isFinite(q[0]) && Number.isFinite(q[1]))
                .map((q) => `${cpx(clamp(q[0])).toFixed(1)},${cpy(clamp(q[1])).toFixed(1)}`)
                .join(" ")}
              fill="none"
              stroke={BLAU}
              strokeWidth={1.5}
            />
            {pts.map((q, k) => (
              <circle
                key={k}
                cx={cpx(clamp(q[0]))}
                cy={cpy(clamp(q[1]))}
                r={k === 0 ? 4.5 : 2.4}
                fill={BLAU}
                opacity={k === 0 ? 1 : 0.85}
              />
            ))}
            <circle cx={cpx(0)} cy={cpy(0)} r={5} fill="none" stroke={GRUEN} strokeWidth={2} />
            <text x={cpx(0) + 8} y={cpy(0) - 8} fontSize="9" fill={GRUEN}>
              x*
            </text>
          </svg>

          <svg
            viewBox={`0 0 ${PW} ${PH}`}
            width={PW}
            height={PH}
            role="img"
            aria-label="Halblogarithmischer Verlauf des Funktionswerts über zwanzig Schritte, mit der Schranke des Satzes als gestrichelter Geraden."
            className="max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            {yticks.map((t) => (
              <g key={t}>
                <line x1={PL} y1={gy(t)} x2={PW - PR} y2={gy(t)} stroke="#e2e8f0" />
                <text x={PL - 4} y={gy(t) + 3} fontSize="9" fill={ACHSE} textAnchor="end">
                  10{t < 0 ? "⁻" : ""}
                  {String(Math.abs(t))
                    .split("")
                    .map((z) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(z)])
                    .join("")}
                </text>
              </g>
            ))}
            {kticks.map((k) => (
              <text key={k} x={gx(k)} y={PH - 6} fontSize="9" fill={ACHSE} textAnchor="middle">
                {k}
              </text>
            ))}
            {schrankeGilt && (
              <polyline
                points={schrankeLog.map((lv, k) => `${gx(k).toFixed(1)},${gy(lv).toFixed(1)}`).join(" ")}
                fill="none"
                stroke={ACHSE}
                strokeWidth={1.4}
                strokeDasharray="5 4"
              />
            )}
            <polyline
              points={logs.map((lv, k) => `${gx(k).toFixed(1)},${gy(lv).toFixed(1)}`).join(" ")}
              fill="none"
              stroke={BLAU}
              strokeWidth={1.6}
            />
            {logs.map((lv, k) => (
              <circle key={k} cx={gx(k)} cy={gy(lv)} r={2.4} fill={BLAU} />
            ))}
            <text x={PL + 4} y={PT + 9} fontSize="9" fill={ACHSE}>
              f(x⁽ᵏ⁾) − f(x*), logarithmisch
            </text>
            <text x={PW - PR} y={PH - 6} fontSize="9" fill={ACHSE} textAnchor="end">
              k
            </text>
          </svg>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <span style={{ color: BLAU }}>●</span> gemessener Verlauf ·{" "}
            {schrankeGilt ? (
              <>
                <span style={{ color: ACHSE }}>– –</span> Schranke (1 − γμ)<sup>k</sup> · f(x⁽⁰⁾)
              </>
            ) : (
              <span style={{ color: ROT }}>für γ &gt; 1/L gibt der Satz keine Schranke her</span>
            )}
          </p>
        </div>

        <div className="min-w-60 grow space-y-3">
          <div>
            <Surface3D
              size={280}
              xDomain={[-XMAX, XMAX]}
              yDomain={[-YHALB, YHALB]}
              surface={flaeche}
              points={punkte3d}
              curves={kurve3d}
              labels={{ x: "x₁", y: "x₂", z: "f" }}
              azimuth={sicht.azimuth}
              elevation={sicht.elevation}
              onViewChange={setSicht}
              ariaLabel={`Die Quadrik als Fläche über der Ebene; bei κ = ${fmt(kappa, 1)} ${kappa > 3 ? "ein enges Tal mit steilen Wänden" : "eine runde Schale"}.`}
            />
            <div className="mt-1 max-w-[280px]">
              <ViewControls value={sicht} onChange={setSicht} />
            </div>
            <p className="mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300">
              Dieselbe Funktion als Fläche, dieselbe Bahn: Je größer κ, desto enger das Tal und
              desto steiler die Wände, an denen die Iterierten hin und her prallen.
            </p>
          </div>
          <Slider
            label="Kondition κ = L/μ"
            value={kappa}
            onChange={(v) => setKappa(Math.round(v))}
            min={1}
            max={100}
            step={1}
            fmt={(v) => fmt(v, 0)}
          />
          <Slider
            label="γ als Anteil von 2/L"
            value={anteil}
            onChange={setAnteil}
            min={0.05}
            max={1.1}
            step={0.05}
          />
          <div className="space-y-1 font-mono text-xs">
            <p>
              f(x) = ½(x₁² + {fmt(kappa, 0)} x₂²), H = diag(1; {fmt(kappa, 0)}), μ = 1, L ={" "}
              {fmt(kappa, 0)}
            </p>
            <p>
              γ = {fmt(gamma, 4)} (1/L = {fmt(1 / L, 4)}, 2/L = {fmt(2 / L, 4)})
            </p>
            <p>
              Fehlerfaktoren: flach 1 − γμ = {fmt(faktor1, 3)}, steil 1 − γL = {fmt(faktor2, 3)}
            </p>
            <p>
              ρ = 1 − μ/L = {fmt(rho, 4)}; gemessener Quotient f⁽⁴⁾/f⁽³⁾ = {fmt(beobachtet, 4)}
            </p>
            <p>
              Schritte, bis f auf ein Millionstel gefallen ist:{" "}
              {bisMillionstel === null ? "über 5000 (oder nie)" : bisMillionstel}
            </p>
          </div>
        </div>
      </div>
      <Verdikt kind={art} titel={titel}>
        {status}
      </Verdikt>
    </div>
  );
}
