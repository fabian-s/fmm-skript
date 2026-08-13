import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * §13.3: Backtracking-Liniensuche nach Armijo als Ersatz für die Folien-Grafik
 * resources/optim-armijo-viz.pdf (13-optim.Rmd Z. 633–657).
 *
 * Widget-CODE (die eindimensionale Schnitt-Tafel φ(γ) = f(x + γd) mit
 * dynamischem Wertebereich, Abtastung und Reglerblock) portiert aus
 * heath-ch5-6/src/sections/widgets/S65Widgets.tsx (LineSearchWidget).
 * SÄMTLICHE Texte, Farben und Statuszweige sind neu; anders als dort geht es
 * hier nicht um den exakten Minimierer, sondern um die Armijo-Bedingung und
 * die Halbierungsfolge γ = 1, ρ, ρ², …
 *
 * Farbrollen nach dem Kapitel-13-Code: der akzeptierte Schritt wird zur
 * nächsten Iterierten und ist blau, verworfene Probeschritte sind rot, die aus
 * dem Gradienten gebaute Tangente ist orange; der Graph von φ trägt das im
 * Kapitel freie Violett, die Armijo-Gerade als reine Abnahmeschranke bleibt
 * neutral grau.
 *
 * Nachgerechnet (node, check-math-s133.mjs / -s133b.mjs) für
 * f(x) = ½x₁² + 2,5x₂² in x = (5; 1): ∇f = (5; 5), d = (−5; −5),
 * ∇f(x)d = −50, φ(0) = 15, φ(1) = 40, φ(0,5) = 8,75, exakter Minimierer
 * γ* = 1/3 mit φ = 6,667. Mit c = 10⁻⁴ und ρ = 0,5 wird γ = 1 verworfen und
 * γ = 0,5 nach einer Halbierung akzeptiert; mit c = 0,3 sind zwei Halbierungen
 * nötig (γ = 0,25, φ = 7,1875).
 */

const BLAU = "#0072B2"; // akzeptierter Schritt
const ROT = "#D55E00"; // verworfene Probeschritte
const ORANGE = "#E69F00"; // Tangente, also die Gradienteninformation
const VIOLETT = "#9E57D5"; // Graph von φ
const ACHSE = "#64748b";
const HILFS = "#94a3b8";

type V2 = [number, number];

const KRUEMMUNG = 5; // f(x) = ½x₁² + (κ/2)x₂²
const f = ([a, b]: V2) => 0.5 * a * a + 0.5 * KRUEMMUNG * b * b;
const grad = ([a, b]: V2): V2 => [a, KRUEMMUNG * b];

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const W = 430;
const H = 250;
const PL = 46;
const PB = 26;
const PT = 10;
const PR = 12;
const GMAX = 1.2;

export function ArmijoWidget() {
  const [x1, setX1] = useState(5);
  const [x2, setX2] = useState(1);
  const [c, setC] = useState(0.2);
  const [rho, setRho] = useState(0.5);

  const x: V2 = [x1, x2];
  const g = grad(x);
  const d: V2 = [-g[0], -g[1]];
  const steigung = g[0] * d[0] + g[1] * d[1]; // ∇f(x)d = −‖∇f(x)‖² ≤ 0
  const phi = (t: number) => f([x[0] + t * d[0], x[1] + t * d[1]]);
  const phi0 = phi(0);
  const armijo = (t: number) => phi0 + c * t * steigung;
  const tangente = (t: number) => phi0 + t * steigung;

  // Backtracking: γ = 1, ρ, ρ², … bis die Armijo-Bedingung erfüllt ist.
  const MAX_VERSUCHE = 60;
  const versuche: number[] = [];
  let gam = 1;
  let n = 0;
  while (phi(gam) > armijo(gam) && n < MAX_VERSUCHE) {
    versuche.push(gam);
    gam *= rho;
    n++;
  }
  const akzeptiert = gam;
  const erfolgreich = phi(gam) <= armijo(gam);
  const folge =
    versuche.length <= 3
      ? [...versuche, akzeptiert].map((t) => fmt(t, 4)).join(" → ")
      : `${fmt(versuche[0], 4)} → ${fmt(versuche[1], 4)} → … → ${fmt(akzeptiert, 4)}`;

  const gg = g[0] * g[0] + g[1] * g[1];
  const gAg = g[0] * g[0] + KRUEMMUNG * g[1] * g[1];
  const gStern = gAg > 0 ? gg / gAg : NaN;

  const N = 160;
  const proben = Array.from({ length: N + 1 }, (_, i) => (GMAX * i) / N);
  const yhi = Math.max(...proben.map(phi), 1e-6) * 1.06;
  const ylo = -0.28 * yhi;
  const ax = (t: number) => PL + ((W - PL - PR) * t) / GMAX;
  const ay = (v: number) => PT + (H - PT - PB) * (1 - (v - ylo) / (yhi - ylo));
  const drin = (v: number) => v >= ylo && v <= yhi;
  const pfad = (fn: (t: number) => number) =>
    proben
      .filter((t) => drin(fn(t)))
      .map((t) => `${ax(t).toFixed(1)},${ay(fn(t)).toFixed(1)}`)
      .join(" ");

  let status: string;
  let statusFarbe = ACHSE;
  if (gg < 1e-12) {
    status =
      "Der Gradient verschwindet, es gibt keine Suchrichtung. Die Liniensuche hat hier nichts zu tun; die Abbruchkriterien haben längst gegriffen.";
    statusFarbe = ACHSE;
  } else if (!erfolgreich) {
    status = `Auch nach ${MAX_VERSUCHE} Verkleinerungen ist die Bedingung nicht erfüllt; hier bricht das Widget ab. Am Verfahren liegt das nicht, denn für hinreichend kleine γ ist die Bedingung stets erfüllbar.`;
    statusFarbe = ROT;
  } else if (n === 0) {
    status = `Der volle Schritt γ = 1 wird sofort angenommen: φ(1) = ${fmt(
      phi(1)
    )} liegt bereits unter der Schranke ${fmt(armijo(1))}.`;
    statusFarbe = BLAU;
  } else {
    status = `${
      n === 1 ? "Eine Verkleinerung genügt" : `${n} Verkleinerungen genügen`
    }: γ = ${fmt(akzeptiert, 4)} drückt den Funktionswert von ${fmt(phi0)} auf ${fmt(
      phi(akzeptiert)
    )}, gefordert war höchstens ${fmt(armijo(akzeptiert))}.`;
    statusFarbe = BLAU;
  }

  return (
    <div className="my-3 rounded bg-white p-3 dark:bg-slate-800/60">
      <div className="flex flex-wrap items-start gap-4">
        <div className="inline-block">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            className="max-w-full overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <line x1={PL} y1={ay(0)} x2={W - PR} y2={ay(0)} stroke={HILFS} />
            <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke={HILFS} />
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line x1={ax(t)} y1={ay(0)} x2={ax(t)} y2={ay(0) + 4} stroke={HILFS} />
                <text x={ax(t)} y={H - 8} fontSize="9" fill={ACHSE} textAnchor="middle">
                  {fmt(t, 2)}
                </text>
              </g>
            ))}
            <text x={W - PR} y={H - 8} fontSize="10" fill={ACHSE} textAnchor="end">
              γ
            </text>
            <text x={PL + 4} y={PT + 9} fontSize="10" fill={ACHSE}>
              φ(γ) = f(x + γd)
            </text>

            {/* Tangente: das Beste, was die erste Ordnung verspricht */}
            <polyline points={pfad(tangente)} fill="none" stroke={ORANGE} strokeWidth={1.5} />
            {/* Armijo-Gerade: die geforderte Abnahme */}
            <polyline
              points={pfad(armijo)}
              fill="none"
              stroke={ACHSE}
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            {/* der Schnitt selbst */}
            <polyline points={pfad(phi)} fill="none" stroke={VIOLETT} strokeWidth={2} />

            {versuche.slice(0, 12).map((t, i) => (
              <g key={i}>
                <circle cx={ax(t)} cy={ay(Math.min(phi(t), yhi))} r={4} fill={ROT} />
                <line
                  x1={ax(t)}
                  y1={ay(Math.min(phi(t), yhi))}
                  x2={ax(t)}
                  y2={ay(Math.max(armijo(t), ylo))}
                  stroke={ROT}
                  strokeWidth={1}
                  strokeDasharray="2 3"
                />
              </g>
            ))}
            {erfolgreich && gg >= 1e-12 && (
              <>
                <circle cx={ax(akzeptiert)} cy={ay(phi(akzeptiert))} r={5} fill={BLAU} />
                <text
                  x={ax(akzeptiert)}
                  y={ay(phi(akzeptiert)) - 9}
                  fontSize="10"
                  fill={BLAU}
                  textAnchor="middle"
                >
                  γ = {fmt(akzeptiert, 3)}
                </text>
              </>
            )}
            {Number.isFinite(gStern) && gStern <= GMAX && (
              <line
                x1={ax(gStern)}
                y1={PT}
                x2={ax(gStern)}
                y2={H - PB}
                stroke={HILFS}
                strokeDasharray="3 3"
              />
            )}
            <text x={W - PR} y={PT + 9} fontSize="9" fill={ORANGE} textAnchor="end">
              Tangente
            </text>
            <text x={W - PR} y={PT + 21} fontSize="9" fill={ACHSE} textAnchor="end">
              Armijo-Schranke
            </text>
          </svg>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Dünn gestrichelt senkrecht: der exakte Minimierer γ* der Liniensuche. Die
            Armijo-Bedingung verlangt ihn nicht, sie verlangt nur, unter der grauen Geraden zu
            bleiben.
          </p>
        </div>

        <div className="min-w-60 grow">
          <Slider label="x₁" value={x1} onChange={setX1} min={-6} max={6} step={0.25} />
          <Slider label="x₂" value={x2} onChange={setX2} min={-2} max={2} step={0.25} />
          <Slider label="Abstiegsanteil c" value={c} onChange={setC} min={0.05} max={0.5} step={0.05} />
          <Slider label="Verkleinerungsfaktor ρ" value={rho} onChange={setRho} min={0.1} max={0.9} step={0.1} />
          <div className="mt-2 space-y-1 font-mono text-xs">
            <p>
              x = ({fmt(x1, 2)}; {fmt(x2, 2)}), ∇f(x) = ({fmt(g[0], 2)}; {fmt(g[1], 2)}), d = −∇f(x)ᵀ
            </p>
            <p>
              φ(0) = {fmt(phi0)}, φ′(0) = ∇f(x)d = {fmt(steigung)} (negativ, sonst wäre d keine
              Abstiegsrichtung)
            </p>
            <p>
              geprüfte Schrittweiten: {folge}
              {versuche.length > 3 ? ` (${n} Verkleinerungen)` : ""}
            </p>
            <p>
              exakter Minimierer γ* = {fmt(gStern, 4)} mit φ(γ*) = {fmt(phi(gStern))}
            </p>
          </div>
          <p className="mt-2 text-sm font-semibold" style={{ color: statusFarbe }}>
            {status}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Der Regler für c steht bewusst weit über dem Praxiswert 10⁻⁴; nur so ist die
            graue Armijo-Gerade von der waagerechten Höhe φ(0) zu unterscheiden. In der
            Praxis liegt sie fast auf dieser Höhe, und die Bedingung heißt dann kaum mehr als
            „der Funktionswert muss wirklich sinken“. Je größer c, desto steiler die
            Forderung und desto mehr Verkleinerungen sind nötig.
          </p>
        </div>
      </div>
    </div>
  );
}
