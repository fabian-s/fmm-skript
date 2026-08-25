import { Aufgabe, ConceptFlow, FMM_COLORS, type FlowEdge, type FlowNode } from "../../../lib";
import { chapters } from "../../index";

/**
 * Einsicht: Ein angeklicktes Kapitel macht seine unmittelbaren Voraussetzungen
 * und Folgen im Kursnetz sichtbar.
 * Farbrollen: Grau = Vorwissen, Blau = Teil 1, Orange = Teil 2, Violett =
 * Teil 3; die Farben gruppieren Kursabschnitte und sind keine Fehler- oder
 * Lösungsfarben aus Beispiel 1.1.1.
 * Provenienz: Kantenstruktur aus conceptmap.qmd des Kurs-Repos, Darstellung
 * mit der lokalen ConceptFlow-Komponente.
 * Verifizierte Zahlen: 13 Kapitel (Anzahl kommt aus der Registry
 * src/chapters/index.ts), 3 Vorwissensknoten und 30 Abhängigkeiten in der
 * Kantenliste unten; Stand nach der Kapitelzusammenlegung, 2026-08-25.
 */

// Kurztitel für die Kästen — der volle Titel steht in der Detailzeile.
const KURZ: Record<number, string> = {
  1: "Worum geht's?",
  2: "Algorithmen & Komplexität",
  3: "Spur & Matrixnormen",
  4: "Fehler, Kondition & Stabilität",
  5: "Lineare Gleichungssysteme",
  6: "Singulärwertzerlegung",
  7: "Kleinste Quadrate",
  8: "Numerische LA: Iteration & Zufall",
  9: "Tensoren & Tensorprodukte",
  10: "Differentialrechnung",
  11: "Konvexität",
  12: "Gleichungen & Optimierung",
  13: "Funktionsapproximation",
};

const SPINE_X = 440;
const TOP = 128;
const STEP = 57;
// Extra-Luft vor Kapitel 10 und 13: dort beginnt jeweils ein neuer Teil.
const yOf = (num: number) => TOP + (num - 1) * STEP + (num >= 10 ? 18 : 0) + (num >= 13 ? 18 : 0);

const teil = (num: number) => (num <= 9 ? "teil1" : num <= 12 ? "teil2" : "teil3");

const kapitel: FlowNode[] = chapters.map((c) => ({
  id: String(c.num),
  label: [KURZ[c.num]],
  badge: String(c.num),
  name: `Kap. ${c.num} · ${c.title}`,
  x: SPINE_X,
  y: yOf(c.num),
  w: 285,
  h: 38,
  group: teil(c.num),
  href: `?k=${c.id}`,
}));

const vorwissen: FlowNode[] = [
  { id: "LA", label: ["Lineare Algebra I"], x: 265, y: 40, w: 150, h: 34, group: "vor" },
  { id: "AN", label: ["Analysis I"], x: 440, y: 40, w: 130, h: 34, group: "vor" },
  { id: "R", label: ["R-Programmierung"], x: 620, y: 40, w: 155, h: 34, group: "vor" },
];

const edges: FlowEdge[] = [
  // Vorwissen
  { from: "LA", to: "1" },
  { from: "AN", to: "1" },
  { from: "R", to: "1" },
  { from: "AN", to: "10", side: "left" },
  { from: "LA", to: "13", side: "left" },
  // Lesereihenfolge (Kap. 13 setzt Teil 2 nicht voraus, deshalb keine Kante 12→13)
  ...Array.from({ length: 11 }, (_, i) => ({ from: String(i + 1), to: String(i + 2) })),
  // Vorgriffe innerhalb von Teil 1
  { from: "3", to: "5", side: "right" },
  { from: "3", to: "6", side: "right" },
  { from: "4", to: "7", side: "right" },
  { from: "5", to: "7", side: "right" },
  { from: "2", to: "8", side: "right" },
  { from: "6", to: "8", side: "right" },
  { from: "6", to: "9", side: "right" },
  // Anker über Teilgrenzen hinweg
  { from: "3", to: "10", side: "left" },
  { from: "4", to: "12", side: "left" },
  { from: "10", to: "12", side: "right" },
  { from: "11", to: "13", side: "right" },
  { from: "1", to: "13", side: "left" },
  { from: "7", to: "13", side: "left" },
  { from: "9", to: "13", side: "left" },
];

export function KursKarte() {
  return (
    <div>
      <Aufgabe>Tippen wir ein Kapitel an und verfolgen wir seine direkten Voraussetzungen und Folgen.</Aufgabe>
      <ConceptFlow
        ariaLabel="Abhängigkeitskarte der 13 Kapitel: Lesereihenfolge von oben nach unten, Bögen zeigen, welche Kapitel über die Reihenfolge hinaus aufeinander aufbauen."
        nodes={[...vorwissen, ...kapitel]}
        edges={edges}
        groups={[
          { key: "vor", label: "Vorwissen", color: FMM_COLORS.grau },
          { key: "teil1", label: "Teil 1 · Numerische lineare Algebra (Kap. 1–9)", color: FMM_COLORS.blau },
          { key: "teil2", label: "Teil 2 · Analysis & Optimierung (Kap. 10–12)", color: FMM_COLORS.orange },
          { key: "teil3", label: "Teil 3 · Funktionsapproximation (Kap. 13)", color: FMM_COLORS.violett },
        ]}
        openLabel="Kapitel öffnen"
      />
    </div>
  );
}
