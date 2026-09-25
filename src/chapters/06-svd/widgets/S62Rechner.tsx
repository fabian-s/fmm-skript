import { useState, type ReactNode } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MatrixInput,
  Stepper,
  Verdikt,
  W_BUTTON,
  fmtDe,
} from "../../../lib";
import { EllipseImRaum } from "./S62Raum";
import { num, ref } from "../../numbers.generated";

/**
 * DIE EINE EINSICHT: Der Weg AᵀA → charakteristisches Polynom → Eigenwerte →
 * Singulärwerte → v → u ist an jeder 3×2-Matrix derselbe; die Vorzeichenwahl
 * bei den v_i ändert U und V, nicht aber A = UΣVᵀ (Bemerkung 6.2.10).
 *
 * FARBROLLEN (Kapitel 6): orange = Singulärwerte σ, blau = rechte
 * Singulärvektoren v, grün = linke Singulärvektoren u, grau = Nebenrechnung
 * und Proben. Rot bleibt Rest- und Fehlertermen vorbehalten.
 *
 * PROVENIENZ: Der 2×2-Eigenlöser (Winkelformel für symmetrische Matrizen)
 * stammt aus der privaten mml-ch4-App (widgets/svdMath.ts: svd2x2); Aufbau,
 * Schrittsteuerung (lib-`Stepper`) und sämtliche Texte sind neu.
 *
 * PRÜFSTATUS (scripts/verify/REV29/06-svd-Widgets.mjs, 2026-08-29) für die Voreinstellung A = (1 2; 2 1; 1 0):
 *   AᵀA = (6 4; 4 5), Spur 11, det 14; λ₁ = 9,531, λ₂ = 1,469;
 *   σ₁ = 3,087, σ₂ = 1,212, σ₁/σ₂ = 2,547;
 *   v₁ = (−0,750; −0,662), v₂ = (0,662; −0,750);
 *   Av₁ = (−2,073; −2,161; −0,750), u₁ = (−0,672; −0,700; −0,243),
 *   u₂ = (−0,691; 0,474; 0,546); u₁ᵀu₂ = 0 und ‖u_i‖ = 1 auf 1e−12 genau;
 *   max |UΣVᵀ − A| = 2,2e−16.
 * Der Text von Beispiel 6.2.9 rechnet mit gerundeten v_i weiter und schreibt
 * deshalb −2,074 statt −2,073; das Widget rechnet mit voller Genauigkeit.
 */

const BLUE = FMM_COLORS.blau;
const GREEN = FMM_COLORS.gruen;
const ORANGE = FMM_COLORS.orange;
const GREY = FMM_COLORS.grau;

/** 3 Dezimalen, deutsches Komma (fmtDe aus der lib). */
const fmt = (v: number) => fmtDe(v, 3);

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

  // Selbstkontrolle: A aus den Faktoren zurückrechnen, größte Abweichung merken
  let rest = 0;
  for (let i = 0; i < A.length; i++)
    for (let j = 0; j < 2; j++) {
      let val = 0;
      for (let k = 0; k < 2; k++) {
        const uk = u[k];
        if (uk) val += sig[k] * uk[i] * v[k][j];
      }
      rest = Math.max(rest, Math.abs(val - (A[i][j] || 0)));
    }

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
              {fmtKurz(spur)}λ{det === 0 ? "" : ` ${det < 0 ? "−" : "+"} ${fmtKurz(Math.abs(det))}`}
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
              className={W_BUTTON}
              onClick={() => flip(0)}
            >
              Vorzeichen von v₁ umdrehen
            </button>
            <button
              type="button"
              className={W_BUTTON}
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
      <Aufgabe>
        Gehen wir die sechs Schritte durch und tragen wir danach eine eigene Matrix ein, etwa
        eine mit zwei gleichen Spalten.
      </Aufgabe>
      <div className="my-3 flex flex-wrap items-center gap-3 text-sm">
        <span>A =</span>
        <MatrixInput value={A} onChange={setA} step={1} />
      </div>
      <Stepper
        step={shown}
        setStep={setT}
        min={1}
        max={maxT}
        narration={schritte[shown - 1]?.titel}
      />
      <div className="space-y-3">
        {schritte.slice(0, shown).map((s) => (
          <div key={s.titel} className="rounded border border-slate-300 p-2 dark:border-slate-600">
            <div className="text-sm font-semibold">{s.titel}</div>
            {s.inhalt}
          </div>
        ))}
      </div>

      {shown >= maxT ? (
        rang === 0 ? (
          <Verdikt kind="warn" titel="Nullmatrix:">
            Beide Singulärwerte sind null, es gibt keine Bildrichtung und keine linken
            Singulärvektoren. Die Formel u_i = Av_i/σ_i aus ({num("eq:rechte-und-linke-singulaervektoren")}) ist hier nicht anwendbar.
          </Verdikt>
        ) : rang === 1 ? (
          <Verdikt kind="warn" titel="Rang 1:">
            σ₂ = {fmt(sig[1])} verschwindet, die Spalten von A sind linear abhängig. Nach{" "}
            {ref("satz:charakterisierung-der-fundamentalen")} ist v₂ eine Basis des Kerns, und u₂ liefert die Formel nicht mehr; erst
            die volle Zerlegung ergänzt eine passende Richtung. Der Rang ist {rang}.
          </Verdikt>
        ) : (
          <Verdikt kind="ok" titel="Probe bestanden:">
            Beide Vorzeichenwahlen sind gleich richtig: Dreht sich v_i, so dreht sich nach
            ({num("eq:rechte-und-linke-singulaervektoren")}) auch u_i, und A = UΣVᵀ bleibt unverändert ({ref("bemerkung:singulaervektoren-sind-nicht-eindeutig")}). Der größte
            Abstand zwischen der zurückgerechneten Matrix σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ und A beträgt hier{" "}
            {rest.toExponential(1).replace(".", ",").replace("-", "−")}, also nichts als
            Rundung. Die Proben bestätigen außerdem {ref("satz:orthogonalitaet-der-singulaervektoren")}: u₁ᵀu₂ = {fmt(dot(u1 ?? [], u2 ?? []))}.
          </Verdikt>
        )
      ) : null}

      <EllipseImRaum A={A} v={v} u={u} sig={sig} />
    </div>
  );
}
