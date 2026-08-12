import { useState, type ReactNode } from "react";
import { MatrixInput } from "../../../lib";

/**
 * Singulärwert-Rechner für §6.2: die Rechnung des Abschnitts an einer
 * editierbaren 3×2-Matrix, Schritt für Schritt: AᵀA, charakteristisches
 * Polynom, Eigenwerte, Singulärwerte, rechte und linke Singulärvektoren.
 * Voreingestellt ist das Beispiel aus dem Text.
 *
 * Der 2×2-Eigenlöser (Winkelformel für symmetrische Matrizen) ist aus der
 * privaten mml-ch4-App portiert (widgets/svdMath.ts: svd2x2); Aufbau, alle
 * Beschriftungen und die Farbgebung sind neu und folgen dem Kapitel-Farbcode:
 * orange = Singulärwerte, blau = rechte, grün = linke Singulärvektoren.
 */

const BLUE = "#0072B2";
const GREEN = "#009E73";
const ORANGE = "#E69F00";
const GREY = "#64748b";

/** 3 Dezimalen, deutsches Komma, kein −0; NaN und ±∞ getrennt ausgewiesen. */
function fmt(v: number): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  let r = Math.round(v * 1000) / 1000;
  if (Object.is(r, -0)) r = 0;
  return r.toFixed(3).replace("-", "−").replace(".", ",");
}

/** ganze Zahlen ohne Nachkommastellen, sonst wie fmt (für Zwischenterme) */
function fmtKurz(v: number): string {
  if (!Number.isFinite(v)) return fmt(v);
  const r = Math.round(v * 1000) / 1000;
  return Number.isInteger(r) ? String(r).replace("-", "−") : fmt(r);
}

const vecStr = (v: number[]) => `(${v.map(fmt).join(", ")})`;

/** kleines Zahlenraster mit Klammerlinien */
function Mat({ m, color }: { m: number[][]; color?: string }) {
  return (
    <span
      className="inline-grid gap-px rounded border-x-2 border-slate-500 px-1.5 py-1 align-middle"
      style={{ gridTemplateColumns: `repeat(${m[0].length}, minmax(2.6rem, auto))`, color }}
    >
      {m.map((row, i) =>
        row.map((v, j) => (
          <span key={`${i}-${j}`} className="px-1 text-center font-mono text-xs">
            {fmtKurz(v)}
          </span>
        ))
      )}
    </span>
  );
}

function Zeile({ children }: { children: ReactNode }) {
  return <div className="my-1 flex flex-wrap items-center gap-2 text-sm">{children}</div>;
}

export function SingulaerwertRechner() {
  const [A, setA] = useState<number[][]>([
    [1, 2],
    [2, 1],
    [1, 0],
  ]);
  const [t, setT] = useState(1);
  // Vorzeichen der Singulärvektoren: voreingestellt wie im Beispiel des Texts
  const [sgn, setSgn] = useState<[number, number]>([-1, -1]);

  const col = (j: number) => A.map((r) => r[j] || 0);
  const dot = (x: number[], y: number[]) => x.reduce((s, xi, i) => s + xi * y[i], 0);
  const a1 = col(0);
  const a2 = col(1);
  const E = dot(a1, a1);
  const F = dot(a1, a2);
  const G = dot(a2, a2);
  const AtA = [
    [E, F],
    [F, G],
  ];
  const spur = E + G;
  const det = E * G - F * F;
  const disc = Math.max(spur * spur - 4 * det, 0);
  const wurzel = Math.sqrt(disc);
  const lam = [(spur + wurzel) / 2, Math.max((spur - wurzel) / 2, 0)];
  const sig = lam.map(Math.sqrt);
  const theta = 0.5 * Math.atan2(2 * F, E - G);
  const vBasis: number[][] = [
    [Math.cos(theta), Math.sin(theta)],
    [-Math.sin(theta), Math.cos(theta)],
  ];
  const v = vBasis.map((vi, i) => vi.map((x) => sgn[i] * x));
  const Av = v.map((vi) => A.map((r) => (r[0] || 0) * vi[0] + (r[1] || 0) * vi[1]));
  const u: (number[] | null)[] = Av.map((w, i) =>
    sig[i] > 1e-9 ? w.map((x) => x / sig[i]) : null
  );
  const u1 = u[0];
  const u2 = u[1];

  const rang = sig.filter((s) => s > 1e-9).length;
  const kappa = sig[1] > 1e-9 ? sig[0] / sig[1] : sig[0] > 1e-9 ? Infinity : NaN;

  const flip = (i: number) =>
    setSgn((s) => (i === 0 ? [-s[0], s[1]] : [s[0], -s[1]]) as [number, number]);

  const schritte: { titel: string; inhalt: ReactNode }[] = [
    {
      titel: "Schritt 1: die Matrix AᵀA aufstellen",
      inhalt: (
        <>
          <Zeile>
            <span>AᵀA =</span>
            <Mat m={AtA} />
            <span style={{ color: GREY }}>
              (Eintrag (i, j) ist das Skalarprodukt der i-ten mit der j-ten Spalte von A)
            </span>
          </Zeile>
          <p className="text-sm" style={{ color: GREY }}>
            Die Matrix ist symmetrisch, ihre Diagonale trägt die quadrierten Spaltenlängen.
          </p>
        </>
      ),
    },
    {
      titel: "Schritt 2: charakteristisches Polynom",
      inhalt: (
        <>
          <Zeile>
            <span className="font-mono text-xs">
              det(AᵀA − λI) = ({fmtKurz(E)} − λ)({fmtKurz(G)} − λ) − ({fmtKurz(F)})² = λ² −{" "}
              {fmtKurz(spur)}λ {det < 0 ? "−" : "+"} {fmtKurz(Math.abs(det))}
            </span>
          </Zeile>
          <p className="text-sm" style={{ color: GREY }}>
            Der Koeffizient bei λ ist die Spur, das absolute Glied die Determinante von AᵀA.
          </p>
        </>
      ),
    },
    {
      titel: "Schritt 3: Nullstellen, also die Eigenwerte",
      inhalt: (
        <>
          <Zeile>
            <span className="font-mono text-xs">
              λ₁,₂ = ({fmtKurz(spur)} ± √({fmtKurz(spur)}² − 4·{fmtKurz(det)})) / 2 = (
              {fmtKurz(spur)} ± √{fmtKurz(disc)}) / 2
            </span>
          </Zeile>
          <Zeile>
            <span className="font-mono text-xs">
              λ₁ = {fmt(lam[0])}, λ₂ = {fmt(lam[1])}
            </span>
            <span style={{ color: GREY }}>
              Probe: λ₁ + λ₂ = {fmt(lam[0] + lam[1])} = Spur, λ₁ · λ₂ = {fmt(lam[0] * lam[1])} =
              Determinante
            </span>
          </Zeile>
        </>
      ),
    },
    {
      titel: "Schritt 4: Wurzeln ziehen – die Singulärwerte",
      inhalt: (
        <>
          <Zeile>
            <span className="font-mono text-xs" style={{ color: ORANGE }}>
              σ₁ = √{fmt(lam[0])} = {fmt(sig[0])} &nbsp;&nbsp; σ₂ = √{fmt(lam[1])} ={" "}
              {fmt(sig[1])}
            </span>
          </Zeile>
          <p className="text-sm" style={{ color: GREY }}>
            σ₁ ist die größte Streckung, die A einem Einheitsvektor antun kann, σ₂ die
            kleinste. Ihr Verhältnis σ₁/σ₂ = {fmt(kappa)} misst, wie richtungsabhängig A wirkt.
            Von null verschiedene Singulärwerte: {rang}, das ist der Rang von A.
          </p>
        </>
      ),
    },
    {
      titel: "Schritt 5: rechte Singulärvektoren",
      inhalt: (
        <>
          <Zeile>
            <span className="font-mono text-xs" style={{ color: BLUE }}>
              v₁ = {vecStr(v[0])} &nbsp;&nbsp; v₂ = {vecStr(v[1])}
            </span>
          </Zeile>
          <Zeile>
            <span style={{ color: GREY }}>
              Probe: AᵀA v₁ − λ₁v₁ = {vecStr([
                AtA[0][0] * v[0][0] + AtA[0][1] * v[0][1] - lam[0] * v[0][0],
                AtA[1][0] * v[0][0] + AtA[1][1] * v[0][1] - lam[0] * v[0][1],
              ])}
              , v₁ᵀv₂ = {fmt(dot(v[0], v[1]))}, ‖v₁‖ = {fmt(Math.hypot(...v[0]))}
            </span>
          </Zeile>
          <div className="my-1 flex flex-wrap items-center gap-2 text-sm">
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-0.5 text-xs"
              onClick={() => flip(0)}
            >
              Vorzeichen von v₁ umdrehen
            </button>
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-0.5 text-xs"
              onClick={() => flip(1)}
            >
              Vorzeichen von v₂ umdrehen
            </button>
            <span style={{ color: GREY }}>
              Beide Wahlen sind gleich richtig; mit v_i dreht sich auch u_i um.
            </span>
          </div>
        </>
      ),
    },
    {
      titel: "Schritt 6: linke Singulärvektoren",
      inhalt: (
        <>
          {u.map((ui, i) => (
            <Zeile key={i}>
              <span className="font-mono text-xs">
                A v{i === 0 ? "₁" : "₂"} = {vecStr(Av[i])}, geteilt durch σ
                {i === 0 ? "₁" : "₂"} = {fmt(sig[i])}:
              </span>
              {ui ? (
                <span className="font-mono text-xs" style={{ color: GREEN }}>
                  u{i === 0 ? "₁" : "₂"} = {vecStr(ui)}
                </span>
              ) : (
                <span style={{ color: GREY }}>
                  σ{i === 0 ? "₁" : "₂"} = 0, hier liefert die Formel keinen Vektor; v
                  {i === 0 ? "₁" : "₂"} liegt im Kern von A.
                </span>
              )}
            </Zeile>
          ))}
          {u1 && u2 ? (
            <Zeile>
              <span style={{ color: GREY }}>
                Probe: u₁ᵀu₂ = {fmt(dot(u1, u2))}, ‖u₁‖ = {fmt(Math.hypot(...u1))}, ‖u₂‖ ={" "}
                {fmt(Math.hypot(...u2))}
              </span>
            </Zeile>
          ) : null}
        </>
      ),
    },
  ];

  const maxT = schritte.length;
  const shown = Math.min(t, maxT);

  return (
    <div>
      <p className="text-sm">
        Rechnen wir Singulärwerte und Singulärvektoren einer 3×2-Matrix von Hand nach,
        Schritt für Schritt. Voreingestellt ist die Matrix aus dem Beispiel des Abschnitts;
        jede andere Eingabe rechnet das Widget genauso durch. Interessant sind besonders
        Matrizen mit linear abhängigen Spalten, etwa beide Spalten gleich: dann fällt σ₂ auf
        null.
      </p>
      <div className="my-3 flex flex-wrap items-center gap-3 text-sm">
        <span>A =</span>
        <MatrixInput value={A} onChange={setA} step={1} />
      </div>
      <div className="my-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm disabled:opacity-40"
          onClick={() => setT((x) => Math.max(1, x - 1))}
          disabled={shown <= 1}
        >
          ◀ zurück
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 bg-slate-100 px-3 py-1 text-sm font-medium disabled:opacity-40 dark:bg-slate-800"
          onClick={() => setT((x) => Math.min(maxT, x + 1))}
          disabled={shown >= maxT}
        >
          nächster Schritt ▶
        </button>
        <span className="text-sm" style={{ color: GREY }}>
          Schritt {shown} von {maxT}
        </span>
      </div>
      <div className="space-y-3">
        {schritte.slice(0, shown).map((s) => (
          <div key={s.titel} className="rounded border border-slate-300 p-2 dark:border-slate-600">
            <div className="text-sm font-semibold">{s.titel}</div>
            {s.inhalt}
          </div>
        ))}
      </div>
    </div>
  );
}
