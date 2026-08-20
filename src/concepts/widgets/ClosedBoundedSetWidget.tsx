/** Einsicht: Ein fehlender Randpunkt kann ein Minimum verhindern. Farben: Blau = Graph, Rot = Randpunkt. Provenienz: neu; keine Zahlenclaims (2026-08-20, FA). */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Verdikt, W_BUTTON, W_BUTTON_AKTIV, W_PANEL, W_TEXT } from "../../lib";
export function EndpointWidget() {
  const [closed, setClosed] = useState(true),
    W = 280,
    H = 170,
    X = (x: number) => 35 + x * 200,
    Y = (y: number) => 145 - y * 120,
    a = closed ? 0.2 : 0;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Schalten wir den linken Randpunkt ein und aus.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label="Graph von f(x)=x mit enthaltenem oder fehlendem linken Randpunkt."
      >
        <line x1="0" y1={Y(0)} x2={W} y2={Y(0)} stroke="var(--w-axis)" />
        <line x1={X(0)} y1="0" x2={X(0)} y2={H} stroke="var(--w-axis)" />
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
          fill={closed ? FMM_COLORS.rot : "var(--w-bg)"}
          stroke={FMM_COLORS.rot}
          strokeWidth="3"
          style={{ transition: "all 250ms ease-in-out" }}
        />
        <circle cx={X(1)} cy={Y(1)} r="5" fill={FMM_COLORS.blau} />
      </svg>
      <p className={`text-xs ${W_TEXT}`}>Rot: linker Randpunkt.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          className={closed ? W_BUTTON_AKTIV : W_BUTTON}
          aria-pressed={closed}
          onClick={() => setClosed(true)}
        >
          abgeschlossen [0,2; 1]
        </button>
        <button
          className={!closed ? W_BUTTON_AKTIV : W_BUTTON}
          aria-pressed={!closed}
          onClick={() => setClosed(false)}
        >
          offen (0; 1]
        </button>
      </div>
      <Verdikt kind={closed ? "ok" : "warn"}>
        {closed
          ? "Der Randpunkt gehört zur Menge: f nimmt ihr Minimum an."
          : "Die Werte nähern sich 0, aber kein Punkt erreicht sie; ein Minimierer fehlt."}
      </Verdikt>
    </div>
  );
}
