import type { ReactNode } from "react";

/**
 * Begleit-Widgets für Abschnitt 1.1 (aus der TSX-Fassung von S11 portiert,
 * MDX-Migration 2026-08-10; Rendering unverändert).
 */

/** Selbsttest-Frage mit aufklappbarer Lösung. */
export function SelbsttestFrage({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <li className="space-y-1">
      <div>{q}</div>
      <details className="rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40">
        <summary className="cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300">
          Lösung anzeigen
        </summary>
        <div className="pt-1.5">{children}</div>
      </details>
    </li>
  );
}

/** Konzeptionelle SVG-Landkarte der drei Themenblöcke. */
export function KursLandkarte() {
  const box = (x: number, color: string, title: string[], lines: string[]) => (
    <g>
      <rect
        x={x}
        y={28}
        width={224}
        height={150}
        rx={12}
        fill={color}
        fillOpacity={0.1}
        stroke={color}
        strokeWidth={2}
      />
      {title.map((t, i) => (
        <text
          key={t}
          x={x + 112}
          y={56 + i * 20}
          textAnchor="middle"
          fontSize={15}
          fontWeight={700}
          fill={color}
        >
          {t}
        </text>
      ))}
      {lines.map((l, i) => (
        <text
          key={l}
          x={x + 112}
          y={106 + i * 22}
          textAnchor="middle"
          fontSize={12.5}
          fill="currentColor"
        >
          {l}
        </text>
      ))}
    </g>
  );
  const arrow = (x1: number, x2: number) => (
    <g stroke="currentColor" strokeWidth={2} opacity={0.55}>
      <line x1={x1} y1={103} x2={x2 - 9} y2={103} />
      <path
        d={`M ${x2 - 10} 96 L ${x2} 103 L ${x2 - 10} 110 Z`}
        fill="currentColor"
        stroke="none"
      />
    </g>
  );
  return (
    <div className="text-slate-700 dark:text-slate-200">
      <svg
        viewBox="0 0 760 200"
        role="img"
        aria-label="Landkarte der drei Kursblöcke"
        className="w-full max-w-2xl"
      >
        {box(8, "#0072B2", ["Numerische", "Lineare Algebra"], [
          "Kondition & Komplexität",
          "Zerlegungen: LR, QR, SVD",
          "KQ-Probleme Ax ≈ b",
        ])}
        {box(268, "#009E73", ["Analysis &", "Optimierung"], [
          "Matrix-Kalkül: ∇L(W)",
          "Gradientenverfahren, Newton",
          "Training von ML-Modellen",
        ])}
        {box(528, "#E69F00", ["Funktions-", "approximation"], [
          "Taylor-Reihen",
          "Splines & Basisfunktionen",
          "Interpolieren & Glätten",
        ])}
        {arrow(232, 268)}
        {arrow(492, 528)}
      </svg>
    </div>
  );
}
