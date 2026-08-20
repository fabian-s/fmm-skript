/**
 * Konzept-Widget `domain-codomain`.
 *
 * DIE EINE EINSICHT: Der Zielbereich ist eine Deklaration, das Bild ist ein
 * Ergebnis. Bei f(x) = x² treffen zwei verschiedene Eingaben denselben Wert,
 * und −1 liegt im Zielbereich, wird aber von keiner Eingabe getroffen.
 *
 * FARBROLLEN: blau = Definitionsbereich; rot = das tatsächlich getroffene Bild;
 * orange = die gerade hervorgehobene Zuordnung. Rahmen, Pfeile und Text kommen
 * aus den Theme-Variablen (--w-axis / --w-text / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN: keine Rechnung — f(−2) = f(2) = 4 und f(0) = 0 sind die
 * Werte des Pfeildiagramms (Re-Audit QA-O0, 2026-08-20).
 *
 * FEHLERKORREKTUREN 2026-08-20 (Re-Audit QA-O0):
 *  - Die „−1“ stand bei (237; 90) und lag damit INNERHALB der Bild-Ellipse
 *    (Mittelpunkt 215, rx 26, ry 52) — die Figur behauptete also das Gegenteil
 *    des Verdikts. Sie sitzt jetzt außerhalb, in der Lücke zwischen Bild und
 *    Zielbereichsrand.
 *  - Die Hervorhebung verglich `hot` mit der PIXEL-Zielhöhe (String(target)),
 *    traf also nie; jetzt hängt sie am Bildwert, sodass beim Zeigen auf −2 auch
 *    2 und die gemeinsame 4 aufleuchten. Auch die Ausgaben sind Zeigeziele.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Verdikt, W_PANEL, W_TEXT } from "../../lib";

type Eintrag = { label: string; y: number; wert: string; zielY: number };

const EINTRAEGE: Eintrag[] = [
  { label: "−2", y: 45, wert: "4", zielY: 49 },
  { label: "0", y: 85, wert: "0", zielY: 129 },
  { label: "2", y: 125, wert: "4", zielY: 49 },
];

const WERTE = [
  { wert: "4", y: 49 },
  { wert: "0", y: 129 },
];

export function MappingDiagram() {
  const [heiss, setHeiss] = useState<string | null>(null);
  const aktiv = (wert: string) => heiss === wert;
  const getroffen = heiss !== null && heiss !== "−1";
  const anzahl = heiss ? EINTRAEGE.filter((e) => e.wert === heiss).length : 0;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Fahren wir über eine Eingabe oder eine Ausgabe und verfolgen wir ihre Pfeile.</Aufgabe>
      <svg
        viewBox="0 0 280 175"
        className="max-w-full h-auto"
        role="img"
        aria-label="Pfeildiagramm: drei Eingaben, ihre Bilder und ein Element des Zielbereichs außerhalb des Bildes."
      >
        <defs>
          <marker id="dc-spitze" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0L6,3L0,6z" fill="var(--w-axis)" />
          </marker>
          <marker
            id="dc-spitze-aktiv"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0L6,3L0,6z" fill={FMM_COLORS.orange} />
          </marker>
        </defs>
        <ellipse
          cx="65"
          cy="85"
          rx="45"
          ry="65"
          fill={FMM_COLORS.blau}
          opacity=".2"
          stroke={FMM_COLORS.blau}
        />
        <ellipse cx="215" cy="85" rx="52" ry="68" fill="none" stroke="var(--w-axis)" />
        <ellipse
          cx="207"
          cy="85"
          rx="26"
          ry="52"
          fill={FMM_COLORS.rot}
          opacity=".16"
          stroke={FMM_COLORS.rot}
        />
        <text x="15" y="16" fill="var(--w-text)" fontSize="11">
          Definitionsbereich
        </text>
        <text x="178" y="16" fill="var(--w-text)" fontSize="11">
          Zielbereich
        </text>
        <text x="199" y="168" fill={FMM_COLORS.rot} fontSize="11">
          Bild
        </text>
        {EINTRAEGE.map((e) => (
          <g
            key={e.label}
            onPointerEnter={() => setHeiss(e.wert)}
            onPointerLeave={() => setHeiss(null)}
            style={{ cursor: "pointer" }}
          >
            <line
              x1="80"
              y1={e.y}
              x2="182"
              y2={e.zielY}
              stroke={aktiv(e.wert) ? FMM_COLORS.orange : "var(--w-axis)"}
              strokeWidth={aktiv(e.wert) ? 3 : 1.3}
              markerEnd={aktiv(e.wert) ? "url(#dc-spitze-aktiv)" : "url(#dc-spitze)"}
            />
            <text
              x="58"
              y={e.y + 4}
              textAnchor="middle"
              fill={aktiv(e.wert) ? FMM_COLORS.orange : "var(--w-text)"}
              fontSize="13"
            >
              {e.label}
            </text>
          </g>
        ))}
        {WERTE.map((w) => (
          <text
            key={w.wert}
            x="207"
            y={w.y}
            textAnchor="middle"
            fill={aktiv(w.wert) ? FMM_COLORS.orange : "var(--w-text)"}
            fontSize="13"
            style={{ cursor: "pointer" }}
            onPointerEnter={() => setHeiss(w.wert)}
            onPointerLeave={() => setHeiss(null)}
          >
            {w.wert}
          </text>
        ))}
        <text
          x="252"
          y="90"
          textAnchor="middle"
          fill={aktiv("−1") ? FMM_COLORS.orange : "var(--w-muted)"}
          fontSize="13"
          style={{ cursor: "pointer" }}
          onPointerEnter={() => setHeiss("−1")}
          onPointerLeave={() => setHeiss(null)}
        >
          −1
        </text>
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: Definitionsbereich; Rot: das tatsächlich getroffene Bild; die −1 liegt im
        Zielbereich, aber außerhalb davon.
      </p>
      <Verdikt kind={heiss === "−1" ? "warn" : "neutral"}>
        {heiss === "−1" ? (
          <>
            Auf die −1 zeigt kein einziger Pfeil. Sie gehört zum Zielbereich ℝ, aber nicht zum
            Bild von x² — genau deshalb sind die beiden Mengen verschieden.
          </>
        ) : getroffen && anzahl > 1 ? (
          <>
            Zwei verschiedene Eingaben landen auf derselben {heiss}: das Bild zählt jeden Wert nur
            einmal, auch wenn er mehrfach getroffen wird.
          </>
        ) : getroffen ? (
          <>
            Die {heiss} wird von genau einer Eingabe getroffen und gehört damit zum Bild.
          </>
        ) : (
          <>
            Drei Eingaben, aber nur zwei verschiedene Bildwerte. Fahren wir über die −1, um ein
            Element zu sehen, das zum Zielbereich, aber nicht zum Bild gehört.
          </>
        )}
      </Verdikt>
    </div>
  );
}
