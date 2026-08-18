import { ConceptFlow, type FlowEdge, type FlowNode } from "../../../lib";

/**
 * Konzeptkarte für Teil 2 (Analysis & Optimierung), übernommen aus der
 * Konzeptkarte des Vorlesungs-Repos: von der Fréchet-Ableitung bis zu den
 * KKT-Bedingungen, eingefärbt nach dem Kapitel, in dem ein Begriff eingeführt
 * wird. Steht am Anfang von Kapitel 10 als Vorschau — beim ersten Lesen
 * reicht der Gesamteindruck, am Ende von Kapitel 13 lohnt der zweite Blick.
 */

const nodes: FlowNode[] = [
  { id: "frechet", label: ["Fréchet-Ableitung"], x: 380, y: 36, group: "k10" },
  { id: "grad", label: ["Gradient"], x: 235, y: 126, w: 130, group: "k10" },
  { id: "jac", label: ["Jacobi-Matrix"], x: 540, y: 126, w: 140, group: "k10" },
  { id: "hesse", label: ["Hesse-Matrix"], x: 330, y: 218, w: 140, group: "k11" },
  {
    id: "kqmk",
    label: ["KQ per Matrixkalkül"],
    kicker: "→ Kap. 7",
    x: 585,
    y: 224,
    w: 175,
    group: "k11",
    href: "?k=07-kq",
    name: "Kleinste Quadrate per Matrixkalkül (Normalengleichungen, Kap. 7)",
  },
  { id: "taylor", label: ["Taylor-Approximation"], x: 110, y: 314, w: 180, group: "k11" },
  { id: "konvf", label: ["Konvexe Funktion"], x: 400, y: 314, w: 160, group: "k12", href: "?k=12-konvexitaet" },
  { id: "konvm", label: ["Konvexe Menge"], x: 640, y: 314, w: 150, group: "k12", href: "?k=12-konvexitaet" },
  {
    id: "newton",
    label: ["Newton & Quasi-Newton"],
    x: 110,
    y: 420,
    w: 195,
    group: "k13",
    href: "?k=13-optim",
  },
  { id: "strikt", label: ["Strikte Konvexität"], x: 350, y: 412, w: 160, group: "k13", href: "?k=13-optim" },
  { id: "subgrad", label: ["Subgradient"], x: 580, y: 412, w: 130, group: "k13", href: "?k=13-optim" },
  { id: "stark", label: ["Starke Konvexität"], x: 350, y: 500, w: 160, group: "k13", href: "?k=13-optim" },
  { id: "kkt", label: ["Lagrange / KKT"], x: 610, y: 500, w: 150, group: "k13", href: "?k=13-optim" },
  {
    id: "gd",
    label: ["Gradientenabstieg", "+ Line Search"],
    x: 150,
    y: 590,
    w: 175,
    group: "k13",
    href: "?k=13-optim",
  },
  { id: "momsgd", label: ["Momentum & SGD"], x: 150, y: 690, w: 165, group: "k13", href: "?k=13-optim" },
];

const edges: FlowEdge[] = [
  { from: "frechet", to: "grad" },
  { from: "frechet", to: "jac" },
  { from: "grad", to: "hesse" },
  { from: "grad", to: "kqmk" },
  { from: "hesse", to: "taylor" },
  { from: "hesse", to: "konvf" },
  { from: "taylor", to: "newton" },
  { from: "hesse", to: "newton" },
  { from: "konvf", to: "strikt" },
  { from: "konvf", to: "subgrad" },
  { from: "strikt", to: "stark" },
  { from: "konvf", to: "gd" },
  { from: "stark", to: "gd" },
  { from: "grad", to: "gd" },
  { from: "gd", to: "momsgd" },
  { from: "konvm", to: "kkt" },
  { from: "konvf", to: "kkt" },
  { from: "subgrad", to: "kkt" },
];

export function TeilZweiKarte() {
  return (
    <ConceptFlow
      ariaLabel="Konzeptkarte von Teil 2: von der Fréchet-Ableitung über Gradient, Hesse-Matrix, Taylor und Konvexität zu den Optimierungsverfahren."
      nodes={nodes}
      edges={edges}
      groups={[
        { key: "k10", label: "Kap. 10 · Differentialrechnung I", color: "#0f7490" },
        { key: "k11", label: "Kap. 11 · Differentialrechnung II", color: "#7c5cd6" },
        { key: "k12", label: "Kap. 12 · Konvexität", color: "#c2620b" },
        { key: "k13", label: "Kap. 13 · Gleichungen & Optimierung", color: "#c2417c" },
      ]}
      openLabel="Kapitel öffnen"
    />
  );
}
