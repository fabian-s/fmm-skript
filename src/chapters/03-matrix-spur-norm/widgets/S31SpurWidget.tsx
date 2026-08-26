import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  MatrixInput,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  fmtDe,
  niceTicks,
  fmtTick,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §3.1: Spur = Summe der Eigenwerte, an der Eigenwertebene abgelesen.
 *
 * DIE EINE EINSICHT: Ändern wir einen Nebendiagonaleintrag, wandern die
 * Eigenwerte quer durch die komplexe Ebene, laufen zusammen, lösen sich vom
 * Boden ab; ihre Summe bleibt dabei auf den Zehntel genau die Spur, denn die
 * Spur liest nur die Diagonale ab (Satz 3.1.7).
 *
 * FARBROLLEN (Kapitel-3-Tabelle, in allen sechs Widgets gleich):
 *   grün    elementweise abgelesene Größen (Diagonale und Spur)
 *   blau    die Eigenwert-/Singulärwertwelt (λ₁, λ₂ und die Summenpfeile)
 *   grau    Achsen, Gitter, Nebentext
 *   (rot = das angefasste Objekt bzw. σ₁, orange = Summennorm/aufgeblähte
 *   Kugel, violett = Maximumsnorm; in diesem Widget nicht belegt.)
 *
 * INTERAKTION: Der Regler für den Nebendiagonaleintrag a₁₂ ist der
 * kontinuierliche Hauptweg (er lässt die Eigenwerte wandern, ohne die Spur zu
 * berühren), die Matrixeingabe der Präzisionsweg, die vier Voreinstellungen
 * sind die Fallunterscheidung des Verdikts.
 *
 * PROVENIENZ: Eigenbau; die geschlossene Eigenwertformel (Mitternachtsformel
 * am charakteristischen Polynom λ² − tr λ + det) stammt aus der Vorfassung
 * dieses Widgets (2026-08-05), Rahmen und Zeichnung sind neu.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen: Voreinstellungen (2 −1; 0 3): tr 5, det 6,
 * λ = 3 und 2; (2 1; 1 3): tr 5, det 5, λ = 3,618 und 1,382; (0 −1; 1 0):
 * tr 0, det 1, λ = ±i; (2 1; 0 2): tr 4, det 4, doppelter Eigenwert 2 mit
 * nur einer Eigenrichtung. In allen vier Fällen ist λ₁ + λ₂ − tr = 0 auf
 * Maschinengenauigkeit (Abweichung 0,00e+0).
 */

const GRUEN = FMM_COLORS.gruen; // Diagonale und Spur
const BLAU = FMM_COLORS.blau; // Eigenwerte

type Mat = number[][];

type Eigen =
  | { real: true; l1: number; l2: number; tr: number; det: number }
  | { real: false; re: number; im: number; tr: number; det: number };

/** Eigenwerte einer 2×2-Matrix in geschlossener Form (λ² − tr λ + det). */
function eigen2x2(m: Mat): Eigen {
  const tr = m[0][0] + m[1][1];
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const disc = tr * tr - 4 * det;
  if (disc >= 0) {
    const s = Math.sqrt(disc);
    return { real: true, l1: (tr + s) / 2, l2: (tr - s) / 2, tr, det };
  }
  return { real: false, re: tr / 2, im: Math.sqrt(-disc) / 2, tr, det };
}

const VOREINSTELLUNGEN: { name: string; titel: string; m: Mat }[] = [
  { name: "zwei reelle Eigenwerte", titel: "obere Dreiecksmatrix, λ = 3 und 2", m: [[2, -1], [0, 3]] },
  { name: "symmetrisch", titel: "λ = 3,618 und 1,382, beide reell", m: [[2, 1], [1, 3]] },
  { name: "Drehung um 90°", titel: "komplexes Paar λ = ±i", m: [[0, -1], [1, 0]] },
  { name: "defekt (Jordan)", titel: "doppelter Eigenwert 2, nur eine Eigenrichtung", m: [[2, 1], [0, 2]] },
];

const SIZE = 330;
const HOEHE = 210;
const PAD_L = 30;
const PAD_R = 12;
const PAD_T = 12;
const PAD_B = 30;
const FELD_W = SIZE - PAD_L - PAD_R;
const FELD_H = HOEHE - PAD_T - PAD_B;

export function S31SpurWidget() {
  const [m, setM] = useState<Mat>(VOREINSTELLUNGEN[0].m.map((r) => [...r]));
  const e = eigen2x2(m);
  const summe = e.real ? e.l1 + e.l2 : 2 * e.re;
  const re1 = e.real ? e.l1 : e.re;
  const re2 = e.real ? e.l2 : e.re;
  const im1 = e.real ? 0 : e.im;

  // Fenster: quadratischer Maßstab (die komplexe Ebene darf nicht verzerren),
  // waagerecht aber nur so breit wie nötig, sonst schrumpfen die Eigenwerte in
  // die Bildmitte, sobald die Spur groß wird.
  const reLo = Math.min(0, re1, re2, e.tr);
  const reHi = Math.max(0, re1, re2, e.tr);
  const breite = Math.max(4.5, 1.25 * (reHi - reLo), 4.3 * Math.abs(im1));
  const xlo = (reLo + reHi) / 2 - breite / 2;
  const sc = FELD_W / breite;
  const imHalb = FELD_H / (2 * sc);
  const px = (x: number) => PAD_L + (x - xlo) * sc;
  const py = (y: number) => PAD_T + FELD_H / 2 - y * sc;
  const ticks = niceTicks(xlo, xlo + breite, 6);
  const dTick = ticks.length > 1 ? ticks[1] - ticks[0] : undefined;
  const bandY = -imHalb * 0.62; // Höhe der Summenleiste unter der reellen Achse

  const doppelt = e.real && Math.abs(e.l1 - e.l2) < 1e-9;
  const defekt = doppelt && Math.abs(m[0][1]) + Math.abs(m[1][0]) > 1e-9;
  const art = !e.real ? "komplex" : defekt ? "defekt" : doppelt ? "doppelt" : "reell";
  const gestalt =
    art === "komplex"
      ? "ein konjugiertes Paar über und unter der reellen Achse"
      : art === "reell"
        ? "zwei getrennte Punkte auf der reellen Achse"
        : "ein doppelter Punkt auf der reellen Achse";

  const setEintrag = (i: number, j: number, v: number) => {
    const next = m.map((r) => [...r]);
    next[i][j] = v;
    setM(next);
  };

  const summenPfeil = (von: number, bis: number, key: string) => (
    <g key={key} stroke={BLAU} fill={BLAU}>
      <line x1={px(von)} y1={py(bandY)} x2={px(bis)} y2={py(bandY)} strokeWidth={2.4} />
      <line x1={px(von)} y1={py(bandY) - 4} x2={px(von)} y2={py(bandY) + 4} strokeWidth={1.4} />
    </g>
  );

  return (
    <div className="space-y-3 text-sm">
      <Aufgabe>
        Schieben wir <M>{"a_{12}"}</M> durch den ganzen Bereich und behalten wir dabei das Ende der
        blauen Summenleiste im Auge.
      </Aufgabe>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        Blau: die Eigenwerte in der komplexen Ebene und, als Leiste darunter, ihre Realteile
        aneinandergelegt. Grün: die Spur, also die Summe der beiden Diagonaleinträge.
      </p>
      <div className="flex flex-wrap gap-2">
        {VOREINSTELLUNGEN.map((v) => {
          const aktiv = v.m.every((r, i) => r.every((x, j) => x === m[i][j]));
          return (
            <button
              key={v.name}
              type="button"
              title={v.titel}
              aria-pressed={aktiv}
              className={`text-xs ${aktiv ? W_BUTTON_AKTIV : W_BUTTON}`}
              onClick={() => setM(v.m.map((r) => [...r]))}
            >
              {v.name}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <svg
            viewBox={`0 0 ${SIZE} ${HOEHE}`}
            className="max-w-full h-auto rounded"
            style={{ background: "var(--w-bg)", border: "1px solid var(--w-border)" }}
            role="img"
            aria-label={`Eigenwerte in der komplexen Ebene: ${gestalt}; die Summe der Realteile trifft die Spur ${fmtDe(e.tr, 2)}.`}
          >
            {/* Achsen */}
            <line
              x1={PAD_L}
              y1={py(0)}
              x2={SIZE - PAD_R}
              y2={py(0)}
              stroke="var(--w-axis)"
              strokeWidth={1.2}
            />
            <line
              x1={px(0)}
              y1={PAD_T}
              x2={px(0)}
              y2={HOEHE - PAD_B}
              stroke="var(--w-grid-strong)"
              strokeWidth={1}
            />
            {ticks.map((t) => (
              <g key={`t${t}`}>
                <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="var(--w-axis)" />
                {t !== 0 && (
                  <text
                    x={px(t)}
                    y={py(0) + 14}
                    fontSize={10}
                    fill="var(--w-muted)"
                    textAnchor="middle"
                  >
                    {fmtTick(t, dTick)}
                  </text>
                )}
              </g>
            ))}
            <text x={SIZE - PAD_R} y={py(0) - 6} fontSize={11} fill="var(--w-muted)" textAnchor="end">
              Re
            </text>
            <text x={px(0) + 5} y={PAD_T + 10} fontSize={11} fill="var(--w-muted)">
              Im
            </text>

            {/* Spur: grüne Marke auf der reellen Achse */}
            <line
              x1={px(e.tr)}
              y1={py(bandY) - 10}
              x2={px(e.tr)}
              y2={py(0) + 6}
              stroke={GRUEN}
              strokeWidth={2}
              strokeDasharray="4 3"
            />
            <text
              x={px(e.tr)}
              y={py(bandY) - 14}
              fontSize={11}
              fill={GRUEN}
              textAnchor="middle"
              stroke="var(--w-bg)"
              strokeWidth={2.5}
              paintOrder="stroke"
            >
              tr = {fmtDe(e.tr, 2)}
            </text>

            {/* Summenleiste: Realteile aneinandergelegt */}
            {summenPfeil(0, re1, "s1")}
            {summenPfeil(re1, re1 + re2, "s2")}
            <circle cx={px(summe)} cy={py(bandY)} r={3.5} fill={GRUEN} />

            {/* Lote von den Eigenwerten auf ihre Realteile */}
            {!e.real && (
              <line
                x1={px(re1)}
                y1={py(im1)}
                x2={px(re1)}
                y2={py(-im1)}
                stroke={BLAU}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            )}

            {/* Eigenwerte */}
            {(e.real
              ? [
                  { x: e.l1, y: 0, name: "λ₁" },
                  { x: e.l2, y: 0, name: "λ₂" },
                ]
              : [
                  { x: e.re, y: e.im, name: "λ₁" },
                  { x: e.re, y: -e.im, name: "λ₂" },
                ]
            ).map((p, i) => (
              <g key={`ew${i}`}>
                <circle cx={px(p.x)} cy={py(p.y)} r={5} fill={BLAU} />
                <text
                  x={px(p.x)}
                  y={py(p.y) - 9}
                  fontSize={11}
                  fill={BLAU}
                  textAnchor="middle"
                  stroke="var(--w-bg)"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                >
                  {p.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <M>{"\\bA ="}</M>
            <MatrixInput value={m} onChange={setM} step={0.5} />
          </div>
          <Slider
            label="a₁₂"
            value={m[0][1]}
            onChange={(v) => setEintrag(0, 1, v)}
            min={-4}
            max={4}
            step={0.1}
            accent={BLAU}
          />
          <Slider
            label="a₂₁"
            value={m[1][0]}
            onChange={(v) => setEintrag(1, 0, v)}
            min={-4}
            max={4}
            step={0.1}
            accent={BLAU}
          />
          <div className="space-y-0.5 font-mono text-xs">
            <div style={{ color: GRUEN }}>
              tr(A) = {fmtDe(m[0][0], 2)} + {fmtDe(m[1][1], 2)} = {fmtDe(e.tr, 2)}
            </div>
            <div style={{ color: BLAU }}>
              {e.real
                ? `λ₁ = ${fmtDe(e.l1, 3)},  λ₂ = ${fmtDe(e.l2, 3)}`
                : `λ₁,₂ = ${fmtDe(e.re, 3)} ± ${fmtDe(e.im, 3)} i`}
            </div>
            <div style={{ color: BLAU }}>λ₁ + λ₂ = {fmtDe(summe, 3)}</div>
            <div className={W_MUTED}>det(A) = {fmtDe(e.det, 3)}</div>
          </div>
        </div>
      </div>
      <Verdikt kind={art === "komplex" ? "warn" : "ok"} titel={`${gestalt}.`}>
        {art === "reell" && (
          <>
            Die beiden Realteile {fmtDe(re1, 2)} und {fmtDe(re2, 2)} ergeben aneinandergelegt genau{" "}
            {fmtDe(e.tr, 2)}, die Spur aus den Diagonaleinträgen. Genau das behauptet {ref("satz:spur-als-summe-der-eigenwerte")} –
            und die Nebendiagonale, die beide Eigenwerte verschiebt, taucht in der Spur nirgends
            auf.
          </>
        )}
        {art === "doppelt" && (
          <>
            Hier fallen beide Eigenwerte auf {fmtDe(re1, 2)} zusammen. {ref("satz:spur-als-summe-der-eigenwerte")} zählt sie mit
            ihrer algebraischen Vielfachheit, die Summe ist also {fmtDe(re1, 2)} + {fmtDe(re2, 2)} ={" "}
            {fmtDe(e.tr, 2)} = tr(A), nicht etwa {fmtDe(re1, 2)}.
          </>
        )}
        {art === "defekt" && (
          <>
            Doppelter Eigenwert {fmtDe(re1, 2)}, und wegen der Nebendiagonale gibt es zu ihm nur
            eine Eigenrichtung: Diese Matrix ist nicht diagonalisierbar. Der Beweis von {ref("satz:spur-als-summe-der-eigenwerte")}
            aus dem Skript greift hier nicht, die Aussage selbst gilt trotzdem, die Summe{" "}
            {fmtDe(re1, 2)} + {fmtDe(re2, 2)} = {fmtDe(e.tr, 2)} trifft die Spur.
          </>
        )}
        {!e.real && (
          <>
            Die Diskriminante ist negativ, die Eigenwerte {fmtDe(e.re, 2)} ± {fmtDe(e.im, 2)} i
            liegen also außerhalb der reellen Achse. In der Summenleiste zählt nur ihr Realteil
            zweimal {fmtDe(e.re, 2)}; die Imaginärteile heben sich weg, und die Spur bleibt reell
            bei {fmtDe(e.tr, 2)} ({ref("satz:spur-als-summe-der-eigenwerte")}).
          </>
        )}
      </Verdikt>
    </div>
  );
}
