import { useState } from "react";
import { M, Slider } from "../../../lib";

/**
 * Kleine-Pivots-Demo für §5.3 (Pivotierung): dasselbe 2×2-System wird in
 * echter IEEE-Doppelgenauigkeit einmal ohne und einmal mit Zeilentausch
 * gelöst; der Regler steuert die Pivotgröße ε. Rechenweg aus dem
 * SmallPivotLab der privaten heath-ch2-App portiert (nur Code; alle Texte
 * neu). Rot markiert das problematische Pivot (FMM-Palette).
 */

const RED = "#D55E00";
const GREEN = "#009E73";

function fmt(v: number): string {
  if (Number.isNaN(v)) return "NaN";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  if (v === 0) return "0";
  const a = Math.abs(v);
  if (a >= 1e5 || a < 1e-3) return v.toExponential(1).replace("-", "−").replace(".", ",");
  return String(Number(v.toPrecision(4))).replace("-", "−").replace(".", ",");
}

export function PivotVergleich() {
  const [e, setE] = useState(-8);
  const eps = Math.pow(10, e);

  // ohne Zeilentausch: Pivot ε, Multiplikator 1/ε — alles ehrlich in float64
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
      <p className="mb-2">
        Lösen wir{" "}
        <M>{"\\begin{pmatrix} \\cred{\\epsilon} & 1 \\\\ 1 & 1 \\end{pmatrix} \\bx = \\begin{pmatrix} 1+\\epsilon \\\\ 2 \\end{pmatrix}"}</M>{" "}
        (exakte Lösung <M>{"\\bx = (1, 1)^\\top"}</M>) in echter IEEE-Doppelgenauigkeit,
        also mit <M>{"\\eps_{\\text{mach}} \\approx 2{,}2 \\cdot 10^{-16}"}</M>. Ohne
        Zeilentausch ist <M>{"\\cred{\\epsilon}"}</M> das Pivot und der Multiplikator{" "}
        <M>{"1/\\epsilon"}</M> riesig; nach dem Tausch ist das Pivot 1 und der
        Multiplikator winzig.
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
      <p className="mt-2 text-xs">
        Gerechnet wird dabei <M>{"u_{22} = \\text{fl}(1 - 1/\\epsilon) ="}</M>{" "}
        <span className="font-mono">{fmt(u22)}</span>
        {absorbed ? (
          <span className="ml-1" style={{ color: RED, fontWeight: 600 }}>
            : Die 1 ist vollständig verschluckt, fl(1 − 1/ε) = −1/ε. Vom ursprünglichen
            Eintrag a₂₂ = 1 ist nichts mehr übrig, und dann gilt L·U ≠ A.
          </span>
        ) : (
          <span className="ml-1">
            : Von a₂₂ = 1 überleben noch einige Ziffern, der Schaden bleibt partiell (etwa{" "}
            {Math.max(0, Math.round(-Math.log10(Math.max(errN, 1e-17))))} korrekte Ziffern in
            der schlechteren Komponente).
          </span>
        )}
      </p>
      <p className="mt-1 text-xs" style={{ color: "#64748b" }}>
        Schieben wir ε nach unten: Ohne Pivotierung verlieren wir ungefähr so viele Ziffern,
        wie ε führende Nullen hat, und nahe der Maschinengenauigkeit kollabiert die Lösung
        komplett. Mit Zeilentausch bleibt die volle Genauigkeit über den ganzen Bereich
        erhalten.
      </p>
    </div>
  );
}
