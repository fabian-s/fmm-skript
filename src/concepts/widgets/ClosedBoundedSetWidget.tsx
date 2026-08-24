/**
 * Konzept-Widget `closed-bounded-set`.
 *
 * DIE EINE EINSICHT: Ein einziger fehlender Randpunkt zerstört die
 * Existenzgarantie — die Werte nähern sich dem Infimum beliebig gut, aber kein
 * Punkt der Menge nimmt es an.
 *
 * FARBROLLEN: blau = der Graph von f(x) = x über dem Intervall; rot = der linke
 * Randpunkt, gefüllt wenn er zur Menge gehört, hohl wenn nicht. Achsen, Ticks
 * und Beschriftungen aus den Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN: keine Rechnung nötig — f(x) = x auf [0,2; 1] hat das
 * Minimum 0,2 am linken Rand, auf (0; 1] gibt es kein Minimum (Re-Audit QA-O0,
 * 2026-08-20).
 *
 * KORREKTUR 2026-08-20 (Re-Audit QA-O0): Die Achsen trugen keine Ticks; die
 * Knopfbeschriftungen nannten 0,2 und 1, im Bild war davon nichts zu sehen.
 */
import { useState } from "react";
import {
  Aufgabe,
  fmtDe,
  FMM_COLORS,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_PANEL,
  W_TEXT,
} from "../../lib";

const W = 300;
const H = 188;
const PAD_L = 34;
const PAD_B = 30;

export function EndpointWidget() {
  const [abgeschlossen, setAbgeschlossen] = useState(true);
  const X = (x: number) => PAD_L + x * (W - PAD_L - 14);
  const Y = (y: number) => H - PAD_B - y * (H - PAD_B - 30);
  const a = abgeschlossen ? 0.2 : 0;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Schalten wir den linken Randpunkt ein und aus.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Graph von f(x) = x mit ${abgeschlossen ? "enthaltenem" : "fehlendem"} linken Randpunkt.`}
      >
        {[0, 0.2, 0.5, 1].map((t) => (
          <g key={`x${t}`}>
            <line
              x1={X(t)}
              y1={26}
              x2={X(t)}
              y2={Y(0)}
              stroke={t === 0.2 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={0.6}
            />
            <text x={X(t)} y={Y(0) + 14} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
              {fmtDe(t, 1)}
            </text>
          </g>
        ))}
        {[0, 0.2, 0.5, 1].map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              y1={Y(t)}
              x2={W - 14}
              y2={Y(t)}
              stroke="var(--w-grid)"
              strokeWidth={0.6}
            />
            <text x={PAD_L - 5} y={Y(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtDe(t, 1)}
            </text>
          </g>
        ))}
        <line x1={PAD_L} y1={Y(0)} x2={W - 14} y2={Y(0)} stroke="var(--w-axis)" />
        <line x1={PAD_L} y1={26} x2={PAD_L} y2={Y(0)} stroke="var(--w-axis)" />
        <text x={W - 14} y={H - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x
        </text>
        <text x={2} y={16} fontSize={9} fill="var(--w-muted)">
          f(x)
        </text>
        <line
          x1={X(a)}
          y1={Y(a)}
          x2={X(1)}
          y2={Y(1)}
          stroke={FMM_COLORS.blau}
          strokeWidth="3"
          style={{ transition: "all 250ms ease-in-out" }}
        />
        <circle
          cx={X(a)}
          cy={Y(a)}
          r="6"
          fill={abgeschlossen ? FMM_COLORS.rot : "var(--w-bg)"}
          stroke={FMM_COLORS.rot}
          strokeWidth="3"
          style={{ transition: "all 250ms ease-in-out" }}
        />
        <circle cx={X(1)} cy={Y(1)} r="5" fill={FMM_COLORS.blau} />
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: f(x) = x; Rot: der linke Randpunkt — gefüllt heißt „gehört dazu“, hohl heißt
        „gehört nicht dazu“.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          className={abgeschlossen ? W_BUTTON_AKTIV : W_BUTTON}
          aria-pressed={abgeschlossen}
          onClick={() => setAbgeschlossen(true)}
        >
          abgeschlossen [0,2; 1]
        </button>
        <button
          type="button"
          className={!abgeschlossen ? W_BUTTON_AKTIV : W_BUTTON}
          aria-pressed={!abgeschlossen}
          onClick={() => setAbgeschlossen(false)}
        >
          offen (0; 1]
        </button>
      </div>
      <Verdikt kind={abgeschlossen ? "ok" : "warn"}>
        {abgeschlossen
          ? "Der Randpunkt 0,2 gehört zur Menge, also nimmt f dort seinen kleinsten Wert 0,2 wirklich an: das Minimum existiert."
          : "Zu jedem Punkt der Menge gibt es einen mit kleinerem Wert; das Infimum 0 wird beliebig gut angenähert, aber von keinem Punkt erreicht. Ein Minimierer fehlt."}
      </Verdikt>
    </div>
  );
}
