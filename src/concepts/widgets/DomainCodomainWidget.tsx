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
 *
 * FEHLERKORREKTUREN 2026-08-26 (Konzept-Pop-up-Audit, Shard 7):
 *  - Die Zuordnungen waren nur per Zeiger erreichbar (`onPointerEnter` ohne
 *    Tastaturpfad). Jede Eingabe, jede Ausgabe und die −1 haben jetzt ein
 *    fokussierbares Ziel (`role="button"`, `tabIndex`, `aria-pressed`,
 *    Enter/Leertaste) mit sichtbarem Fokusrahmen.
 *  - Die Legende sagte „liegt im Zielbereich, aber außerhalb davon“ und
 *    behauptete damit das Gegenteil des Gemeinten; jetzt „außerhalb des Bildes“.
 *  - Das `<svg>` trug `role="img"`; dessen Nachfahren gelten als rein
 *    darstellend, die neuen `role="button"`-Ziele wären für Screenreader
 *    unsichtbar geblieben. Jetzt `role="group"` wie im MatrixMultiplicationWidget.
 *
 * GEOMETRIE DER ZIELFLÄCHEN (nachgerechnet): Eingaben 34 × 28 um (58; y) liegen
 * mit allen vier Ecken in der Definitionsbereichs-Ellipse, denn für die äußerste
 * Ecke (41; 31) ist ((41−65)/45)² + ((31−85)/65)² = 0,284 + 0,690 = 0,975 < 1.
 * Das Ziel der −1 ist 28 × 28 um (250; 86); seine äußerste Ecke (264; 100) liegt
 * mit ((264−215)/52)² + ((100−85)/68)² = 0,888 + 0,049 = 0,937 < 1 innerhalb des
 * Zielbereichs und mit x = 236 > 207 + 26 = 233 vollständig außerhalb des Bildes.
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

/**
 * Fokussierbares Ziel über einer Beschriftung: liefert denselben Zustand per
 * Zeiger, per Tabulator (Fokus) und per Enter/Leertaste. Der gestrichelte
 * Rahmen macht das gewählte Ziel auch ohne Zeiger sichtbar.
 */
function Ziel({
  x,
  y,
  breite,
  hoehe,
  wert,
  beschriftung,
  aktiv,
  setzen,
}: {
  x: number;
  y: number;
  breite: number;
  hoehe: number;
  wert: string;
  beschriftung: string;
  aktiv: boolean;
  setzen: (w: string | null) => void;
}) {
  return (
    <rect
      x={x - breite / 2}
      y={y - hoehe / 2}
      width={breite}
      height={hoehe}
      rx={4}
      fill="transparent"
      stroke={aktiv ? FMM_COLORS.orange : "transparent"}
      strokeWidth={1.5}
      strokeDasharray="3 2"
      role="button"
      tabIndex={0}
      aria-pressed={aktiv}
      aria-label={beschriftung}
      style={{ cursor: "pointer" }}
      onPointerEnter={() => setzen(wert)}
      onPointerLeave={() => setzen(null)}
      onFocus={() => setzen(wert)}
      onBlur={() => setzen(null)}
      onClick={() => setzen(wert)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setzen(wert);
        }
      }}
    />
  );
}

export function MappingDiagram() {
  const [heiss, setHeiss] = useState<string | null>(null);
  const aktiv = (wert: string) => heiss === wert;
  const getroffen = heiss !== null && heiss !== "−1";
  const anzahl = heiss ? EINTRAEGE.filter((e) => e.wert === heiss).length : 0;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Wählen wir eine Eingabe oder eine Ausgabe – mit Zeiger oder Tabulator – und verfolgen
        wir ihre Pfeile.
      </Aufgabe>
      <svg
        viewBox="0 0 280 175"
        className="max-w-full h-auto"
        role="group"
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
        >
          −1
        </text>
        {/* Zeige- und Tastaturziele zuletzt, damit sie über den Beschriftungen
            liegen; die Rahmen zeigen den Fokus. */}
        {EINTRAEGE.map((e) => (
          <Ziel
            key={`ziel-${e.label}`}
            x={58}
            y={e.y}
            breite={34}
            hoehe={28}
            wert={e.wert}
            beschriftung={`Eingabe ${e.label} mit Bild ${e.wert}`}
            aktiv={aktiv(e.wert)}
            setzen={setHeiss}
          />
        ))}
        {WERTE.map((w) => (
          <Ziel
            key={`ziel-wert-${w.wert}`}
            x={207}
            y={w.y - 4}
            breite={30}
            hoehe={28}
            wert={w.wert}
            beschriftung={`Ausgabe ${w.wert} im Bild`}
            aktiv={aktiv(w.wert)}
            setzen={setHeiss}
          />
        ))}
        <Ziel
          x={250}
          y={86}
          breite={28}
          hoehe={28}
          wert="−1"
          beschriftung="Element −1 des Zielbereichs"
          aktiv={aktiv("−1")}
          setzen={setHeiss}
        />
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: Definitionsbereich; Rot: das tatsächlich getroffene Bild; die −1 liegt im
        Zielbereich, aber außerhalb des Bildes.
      </p>
      <Verdikt kind={heiss === "−1" ? "warn" : "neutral"}>
        {heiss === "−1" ? (
          <>
            Auf die −1 zeigt kein einziger Pfeil. Sie gehört zum Zielbereich ℝ, aber nicht zum
            Bild von x² – genau deshalb sind die beiden Mengen verschieden.
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
            Drei Eingaben, aber nur zwei verschiedene Bildwerte. Wählen wir die −1, um ein
            Element zu sehen, das zum Zielbereich, aber nicht zum Bild gehört.
          </>
        )}
      </Verdikt>
    </div>
  );
}
