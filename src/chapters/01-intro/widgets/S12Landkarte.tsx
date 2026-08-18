import { ConceptFlow, type FlowEdge, type FlowNode } from "../../../lib";
import { chapters } from "../../index";

/**
 * Kurskarte für Abschnitt 1.2: alle 15 Kapitel als Wirbelsäule von oben nach
 * unten (so liest man das Skript), Abhängigkeiten über Nachbarkapitel hinweg
 * als Bögen — Vorgriffe und Anker springen so ins Auge. Kanten und Teile
 * folgen der Konzeptkarte des Vorlesungs-Repos (conceptmap.qmd); die dortigen
 * Vorlesungen 13/14 bzw. 15/16 sind hier die Kapitel 13 bzw. 14/15.
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
  8: "Iteration & Zufall",
  9: "Tensoren & Tensorprodukte",
  10: "Differentialrechnung I",
  11: "Differentialrechnung II",
  12: "Konvexität",
  13: "Gleichungen & Optimierung",
  14: "Funktionsapproximation I",
  15: "Funktionsapproximation II",
};

const SPINE_X = 440;
const TOP = 128;
const STEP = 57;
// Extra-Luft vor Kapitel 10 und 14: dort beginnt ein neuer Teil.
const yOf = (num: number) => TOP + (num - 1) * STEP + (num >= 10 ? 18 : 0) + (num >= 14 ? 18 : 0);

const teil = (num: number) => (num <= 9 ? "teil1" : num <= 13 ? "teil2" : "teil3");

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
  { from: "LA", to: "14", side: "left" },
  // Lesereihenfolge (Kap. 14 setzt Teil 2 NICHT voraus — deshalb keine Kante 13→14)
  ...Array.from({ length: 12 }, (_, i) => ({ from: String(i + 1), to: String(i + 2) })),
  { from: "14", to: "15" },
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
  { from: "4", to: "13", side: "left" },
  { from: "11", to: "13", side: "right" },
  { from: "1", to: "14", side: "left" },
  { from: "7", to: "14", side: "left" },
  { from: "9", to: "14", side: "left" },
  { from: "7", to: "15", side: "left" },
  { from: "9", to: "15", side: "left" },
  { from: "12", to: "15", side: "right" },
];

export function KursKarte() {
  return (
    <ConceptFlow
      ariaLabel="Abhängigkeitskarte der 15 Kapitel: Lesereihenfolge von oben nach unten, Bögen zeigen, welche Kapitel über die Reihenfolge hinaus aufeinander aufbauen."
      nodes={[...vorwissen, ...kapitel]}
      edges={edges}
      groups={[
        { key: "vor", label: "Vorwissen", color: "#059669" },
        { key: "teil1", label: "Teil 1 · Numerische lineare Algebra (Kap. 1–9)", color: "#0f7490" },
        { key: "teil2", label: "Teil 2 · Analysis & Optimierung (Kap. 10–13)", color: "#c2620b" },
        { key: "teil3", label: "Teil 3 · Funktionsapproximation (Kap. 14–15)", color: "#7c3aed" },
      ]}
      openLabel="Kapitel öffnen"
    />
  );
}
