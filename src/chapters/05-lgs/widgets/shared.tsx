import type { CSSProperties, ReactNode } from "react";
import { fmtDe } from "../../../lib";

/**
 * Gemeinsame Bausteine der Kapitel-5-Stepper (LU, Rückwärtssubstitution,
 * Cholesky): Zahlformatierung, tiefgestellte Indexziffern, das Mono-Raster
 * für Matrizen, die Beschriftung darüber und der Rückwärtssubstitutions-
 * Tracer. Vorher lagen diese Hilfen in jedem Stepper als identische Kopie.
 *
 * Der Code stammt aus dem LUStepper der privaten heath-ch2-App (nur Code;
 * alle sichtbaren Texte des Kapitels sind neu geschrieben).
 */

/** Kompakte Zahlformatierung (3 Dezimalen, deutsches Komma, kein -0);
 *  NaN und ±∞ werden getrennt ausgewiesen. */
export function fmtNum(v: number): string {
  if (Number.isNaN(v)) return "NaN";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  let r = Math.round(v * 1000) / 1000;
  if (Object.is(r, -0)) r = 0;
  return fmtDe(r, 3);
}

const SUBS = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
/** Ziffer als Tiefstellung, für Indizes in den Protokollzeilen. */
export const sub = (i: number) => SUBS[i] ?? String(i);

/** Matrix als Mono-Zellen-Raster mit eckigen Klammerlinien; null = „noch offen". */
export function MatTable({
  m,
  cellClass,
  cellStyle,
  label,
}: {
  m: (number | null)[][];
  cellClass?: (i: number, j: number) => string;
  cellStyle?: (i: number, j: number) => CSSProperties | undefined;
  /** Name der Matrix; ohne ihn liest ein Screenreader nur eine Zahlenfolge. */
  label?: string;
}) {
  // Ein CSS-Grid aus <div>s hat für Screenreader keine Zeilenstruktur. Statt
  // ARIA-Grid-Rollen (die eine andere DOM-Schachtelung bräuchten) geben wir die
  // Matrix zeilenweise als Textalternative aus.
  const vorlesen = m
    .map((row, i) => `Zeile ${i + 1}: ${row.map((v) => (v === null ? "offen" : fmtNum(v))).join(", ")}`)
    .join("; ");
  return (
    <div
      role="img"
      aria-label={`${label ? `${label}, ` : ""}${m.length} mal ${m[0].length}. ${vorlesen}`}
      className="inline-grid gap-px self-start rounded border-x-2 border-slate-500 px-1.5 py-1"
      style={{ gridTemplateColumns: `repeat(${m[0].length}, minmax(2.3rem, auto))` }}
    >
      {m.map((row, i) =>
        row.map((v, j) => (
          <div
            key={`${i}-${j}`}
            className={`rounded px-1 py-0.5 text-center font-mono text-xs ${
              v === null ? "text-slate-400" : ""
            } ${cellClass?.(i, j) ?? ""}`}
            style={cellStyle?.(i, j)}
          >
            {v === null ? "·" : fmtNum(v)}
          </div>
        ))
      )}
    </div>
  );
}

export function WidgetLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium" style={{ color: "var(--w-muted)" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

/**
 * Rückwärtssubstitution auf ein oberes Dreieckssystem U x = rhs: Lösung, eine
 * druckbare Formelzeile pro Komponente und die Zeile, in der ein Null-Pivot
 * abbricht (-1 = keiner).
 */
export function backSub(U: number[][], rhs: number[]): {
  x: (number | null)[];
  lines: string[];
  failRow: number;
  /** true, wenn das Pivot der Fehlzeile exakt 0 ist (sonst: winzig, aber ≠ 0) */
  failExakt: boolean;
  /** das Pivot der Fehlzeile, für den Text des Verdikts */
  failPivot: number;
} {
  const n = U.length;
  const x: (number | null)[] = new Array(n).fill(null);
  const lines: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    // Drei Zustände: exakt null (Eingabewert), winzig (Division bläst den Fehler
    // auf) und regulär. Der Abbruch trifft beide entarteten Fälle, der Text
    // unterscheidet sie.
    if (Math.abs(U[i][i]) < 1e-12) {
      return { x, lines, failRow: i, failExakt: U[i][i] === 0, failPivot: U[i][i] };
    }
    let s = rhs[i];
    let terms = "";
    for (let j = i + 1; j < n; j++) {
      s -= U[i][j] * (x[j] as number);
      terms += ` − (${fmtNum(U[i][j])})·(${fmtNum(x[j] as number)})`;
    }
    x[i] = s / U[i][i];
    lines.push(
      `x${sub(i + 1)} = (${fmtNum(rhs[i])}${terms}) / (${fmtNum(U[i][i])}) = ${fmtNum(
        x[i] as number
      )}`
    );
  }
  return { x, lines, failRow: -1, failExakt: false, failPivot: NaN };
}
