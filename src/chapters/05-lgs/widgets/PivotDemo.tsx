import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, M, Slider, Verdikt } from "../../../lib";

/**
 * Kleine-Pivots-Demo für §5.3 (Pivotierung): dasselbe 2×2-System wird in
 * echter IEEE-Doppelgenauigkeit einmal ohne und einmal mit Zeilentausch
 * gelöst; der Regler steuert die Pivotgröße ε. Rechenweg aus dem
 * SmallPivotLab der privaten heath-ch2-App portiert (nur Code; alle Texte
 * Einsicht: Ein kleiner Pivot verstärkt Rundungsfehler, Zeilentausch verhindert das.
 * Farbrollen: Pivot/Fehler rot, stabile Lösung grün, sonst neutral.
 * Provenienz: Rechenweg aus heath-ch2 (nur Code), sichtbare Texte neu.
 * Zahlen: Kosten-/Float64-Grenzen in verify-05-lgs/verify.mjs, 2026-08-19.
 */

const { rot: RED, gruen: GREEN } = FMM_COLORS;

function fmt(v: number): string {
  if (Number.isNaN(v)) return "NaN";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  if (v === 0) return "0";
  const a = Math.abs(v);
  if (a >= 1e5 || a < 1e-3) return v.toExponential(1).replace("-", "−").replace(".", ",");
  return fmtDe(Number(v.toPrecision(4)), 4);
}

export function PivotVergleich() {
  const [e, setE] = useState(-8);
  const eps = Math.pow(10, e);

  // ohne Zeilentausch: Pivot ε, Multiplikator 1/ε, alles ehrlich in float64
  const m = 1 / eps;
  const u22 = 1 - m;
  const b1 = 1 + eps;
  const b2 = 2;
  const x2n = (b2 - m * b1) / u22;
  const x1n = (b1 - x2n) / eps;

  // mit Zeilentausch: Pivot 1, Multiplikator ε
  const x2p = (b1 - eps * b2) / (1 - eps);
  const x1p = b2 - x2p;

  const errN = Math.abs(x1n - 1) + Math.abs(x2n - 1);
  const errP = Math.abs(x1p - 1) + Math.abs(x2p - 1);
  const absorbed = u22 === -m;

  const row = (name: string, x1: number, x2: number, err: number) => (
    <tr>
      <td className="pr-3">{name}</td>
      <td className="pr-3 text-right font-mono tabular-nums">{fmt(x1)}</td>
      <td className="pr-3 text-right font-mono tabular-nums">{fmt(x2)}</td>
      <td
        className="text-right font-mono tabular-nums"
        style={!(err < 1e-4) ? { color: RED, fontWeight: 600 } : { color: GREEN }}
      >
        {err === 0 ? "0" : err.toExponential(2).replace(".", ",")}
      </td>
    </tr>
  );

  return (
    <div className="text-sm">
      <Aufgabe>Schieben wir ε nach unten und vergleichen die beiden Fehlerzeilen.</Aufgabe>
      <p className="mb-2">
        Testsystem ist{" "}
        <M>{"\\begin{pmatrix} \\cred{\\epsilon} & 1 \\\\ 1 & 1 \\end{pmatrix} \\bx = \\begin{pmatrix} 1+\\epsilon \\\\ 2 \\end{pmatrix}"}</M>{" "}
        mit der Lösung <M>{"\\bx = (1, 1)^\\top"}</M>, die wir von Hand ablesen können. Beide
        Tabellenzeilen rechnen denselben Weg in float64 nach
        (<M>{"\\eps_{\\text{mach}} \\approx 2{,}2 \\cdot 10^{-16}"}</M>), einmal mit{" "}
        <M>{"\\cred{\\epsilon}"}</M> als Pivot und Multiplikator <M>{"1/\\epsilon"}</M>, einmal
        nach Zeilentausch mit Pivot 1 und Multiplikator <M>{"\\epsilon"}</M>. Jede Abweichung
        von 1 in der Tabelle ist also reiner Rundungsfehler.
      </p>
      <Slider
        label="log₁₀ ε"
        value={e}
        onChange={setE}
        min={-18}
        max={-1}
        step={1}
        fmt={(v) => `ε = 1e${v}`}
      />
      <table className="mt-2">
        <thead>
          <tr className="text-left text-xs" style={{ color: "#64748b" }}>
            <th className="pr-3 font-medium">Strategie</th>
            <th className="pr-3 text-right font-medium">x₁</th>
            <th className="pr-3 text-right font-medium">x₂</th>
            <th className="text-right font-medium">Fehler (1-Norm)</th>
          </tr>
        </thead>
        <tbody>
          {row("ohne Zeilentausch (Pivot ε)", x1n, x2n, errN)}
          {row("mit Zeilentausch (Pivot 1)", x1p, x2p, errP)}
        </tbody>
      </table>
      <Verdikt kind={absorbed ? "fail" : errN < 1e-4 ? "ok" : "warn"} className="mt-2">
        Gerechnet wird dabei <M>{"u_{22} = \\text{fl}(1 - 1/\\epsilon) ="}</M>{" "}
        <span className="font-mono">{fmt(u22)}</span>
        {absorbed ? (
          <span className="ml-1">
            , exakt −1/ε: Die Subtraktion hat die 1 restlos geschluckt. In der Zerlegung steckt
            der Eintrag a₂₂ = 1 damit gar nicht mehr, und L·U reproduziert A nicht.
          </span>
        ) : (
          <span className="ml-1">
            . Der Eintrag a₂₂ = 1 hat die Subtraktion überstanden, ganz oder in Teilen:
            Im schlechteren Lösungseintrag stimmen noch rund{" "}
            {Math.max(0, Math.round(-Math.log10(Math.max(errN, 1e-17))))} Stellen.
          </span>
        )}
      </Verdikt>
    </div>
  );
}
