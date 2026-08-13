import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * §13.3: Gradientenabstieg mit FESTER Schrittweite auf der Quadrik
 * f(x) = ½(x₁² + κ x₂²) – die Zick-Zack-Folie „Konvergenz von Gradient
 * Descent“ (13-optim.Rmd Z. 575–592) samt der auskommentierten Kondition-Notiz
 * Z. 594–614.
 *
 * Widget-CODE (Ellipsen-Höhenlinien mit Achsenkreuz und Ticks, halblogarithmische
 * Fehlerkurve mit Zehnerpotenz-Beschriftung) portiert aus
 * heath-ch5-6/src/sections/widgets/S65Widgets.tsx (QuadContourPlane, FvalChart)
 * und S623Widgets.tsx (Ellipsen-Niveaus der HessianConditioningWidget).
 * SÄMTLICHE Texte, Regler, Statuszweige und Farben sind neu; anders als dort
 * läuft hier keine exakte Liniensuche, sondern die feste Schrittweite γ, um die
 * es in diesem Abschnitt geht.
 *
 * Farbrollen nach dem Kapitel-13-Code: Iterierte und Fehlerkurve blau, das
 * Minimum grün, Divergenzwarnungen rot. Die Schranke des Satzes ist keine
 * Größe des Farbcodes und bleibt deshalb neutral grau gestrichelt.
 *
 * Nachgerechnet (node, check-math-s133.mjs / -s133b.mjs) für κ = 10:
 * γ = 1/L annulliert x₂ in einem Schritt, danach fällt f exakt auf das
 * 0,81-fache je Schritt, schneller als die Schranke ρ = 1 − μ/L = 0,9.
 * x₂-Faktoren: γ = 0,15 → −0,5; 0,18 → −0,8; 0,2 = 2/L → −1; 0,21 → −1,1.
 * Die Schranke (1 − γμ)^k wurde für γ = 0,02/0,05/0,1 über 40 Schritte und für
 * 300 zufällige vierdimensionale SPD-Quadriken mit γ = 1/L bestätigt.
 */

const BLAU = "#0072B2"; // Iterierte, Fehlerkurve
const GRUEN = "#009E73"; // Minimum
const ROT = "#D55E00"; // Divergenz
const ACHSE = "#64748b";
const HILFS = "#94a3b8";

type V2 = [number, number];

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  if (Math.abs(v) >= 1e5) return v.toExponential(2).replace(".", ",").replace(/^-/, "−");
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

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

export function CanyonWidget() {
  const [kappa, setKappa] = useState(10);
  const [anteil, setAnteil] = useState(0.9); // γ als Anteil von 2/L

  const mu = 1;
  const L = kappa; // H = diag(1, κ), also μ = 1 und L = κ
  const gamma = (anteil * 2) / L;
  const f = ([a, b]: V2) => 0.5 * (a * a + kappa * b * b);

  const pts: V2[] = [START];
  const fv: number[] = [f(START)];
  for (let k = 0; k < K_SCHRITTE; k++) {
    const [a, b] = pts[pts.length - 1];
    const nx: V2 = [a - gamma * a, b - gamma * kappa * b];
    pts.push(nx);
    fv.push(f(nx));
  }

  const f0 = fv[0];
  const rho = 1 - mu / L;
  const schrankeRate = 1 - gamma * mu; // gilt für γ ≤ 1/L
  const schrankeGilt = gamma <= 1 / L + 1e-12;
  const beobachtet = fv[3] > 0 ? fv[4] / fv[3] : NaN;
  const faktor1 = 1 - gamma;
  const faktor2 = 1 - gamma * kappa;

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

  let status: string;
  let statusFarbe = ACHSE;
  if (Math.abs(faktor2) > 1 + 1e-12) {
    status = `γ = ${fmt(gamma, 3)} liegt über 2/L = ${fmt(
      2 / L,
      3
    )}: in der steilen Richtung wächst der Fehler um den Faktor ${fmt(
      Math.abs(faktor2),
      2
    )} je Schritt, die Folge läuft aus dem Bild.`;
    statusFarbe = ROT;
  } else if (Math.abs(faktor2 + 1) < 1e-12) {
    status =
      "γ = 2/L ist die Grenze: in der steilen Richtung pendelt die Iteration zwischen zwei Werten, ohne kleiner zu werden.";
    statusFarbe = ROT;
  } else if (Math.abs(faktor2) < 1e-12 && kappa === 1) {
    status =
      "Bei κ = 1 sind die Höhenlinien Kreise, μ und L fallen zusammen, und der negative Gradient zeigt direkt auf das Minimum: mit γ = 1/L ist das Verfahren nach einem einzigen Schritt fertig.";
    statusFarbe = GRUEN;
  } else if (Math.abs(faktor2) < 1e-12) {
    status = `γ = 1/L trifft die steile Richtung exakt: x₂ ist nach einem Schritt null, danach fällt f in jedem Schritt auf das ${fmt(
      faktor1 ** 2,
      3
    )}-fache, also schneller als die Schranke ρ = ${fmt(rho, 3)} des Satzes.`;
    statusFarbe = GRUEN;
  } else if (faktor2 < 0) {
    status = `Zick-Zack: in der steilen Richtung wechselt der Fehler mit Faktor ${fmt(
      faktor2,
      2
    )} das Vorzeichen, in der flachen Richtung schrumpft er nur mit ${fmt(
      faktor1,
      3
    )}. Die Schrittweite ist an die steile Richtung gebunden, vorankommen müssen wir in der flachen.`;
    statusFarbe = BLAU;
  } else {
    status = `Beide Richtungen schrumpfen monoton (Faktoren ${fmt(faktor1, 3)} und ${fmt(
      faktor2,
      3
    )}). Die flache Richtung bestimmt das Tempo, und je größer κ, desto näher liegt ihr Faktor an 1.`;
    statusFarbe = BLAU;
  }

  return (
    <div className="my-3 rounded bg-white p-3 dark:bg-slate-800/60">
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex flex-col gap-3">
          <svg
            viewBox={`0 0 ${CW} ${CH}`}
            width={CW}
            height={CH}
            className="max-w-full overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
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
            className="max-w-full overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
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

        <div className="min-w-60 grow">
          <Slider
            label="Krümmungsverhältnis κ = L/μ"
            value={kappa}
            onChange={setKappa}
            min={1}
            max={25}
            step={0.5}
          />
          <Slider
            label="Schrittweite γ als Anteil von 2/L"
            value={anteil}
            onChange={setAnteil}
            min={0.05}
            max={1.1}
            step={0.05}
          />
          <div className="mt-2 space-y-1 font-mono text-xs">
            <p>
              f(x) = ½(x₁² + {fmt(kappa, 1)} x₂²), H = diag(1; {fmt(kappa, 1)}), μ = 1, L ={" "}
              {fmt(kappa, 1)}
            </p>
            <p>
              γ = {fmt(gamma, 4)} (1/L = {fmt(1 / L, 4)}, 2/L = {fmt(2 / L, 4)})
            </p>
            <p>
              Fehlerfaktoren: flach 1 − γμ = {fmt(faktor1, 3)}, steil 1 − γL = {fmt(faktor2, 3)}
            </p>
            <p>
              ρ = 1 − μ/L = {fmt(rho, 3)}; gemessener Quotient f⁽⁴⁾/f⁽³⁾ = {fmt(beobachtet, 4)}
            </p>
          </div>
          <p className="mt-2 text-sm font-semibold" style={{ color: statusFarbe }}>
            {status}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Die Höhenlinien sind Ellipsen mit Achsenverhältnis √κ. Der Regler für γ ist in
            Vielfachen von 2/L geeicht, damit die drei Schwellen unabhängig von κ an
            derselben Stelle liegen: bei einem halben Anteil steht γ = 1/L, bei einem ganzen
            die Divergenzgrenze. Die gestrichelte Gerade in der unteren Tafel ist eine obere
            Schranke, keine Vorhersage; der gemessene Verlauf liegt darunter, und bei
            γ = 1/L um genau einen Faktor (1 − μ/L) je Schritt.
          </p>
        </div>
      </div>
    </div>
  );
}
