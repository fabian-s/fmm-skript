import { ConceptFlow, FMM_COLORS, type FlowEdge, type FlowNode } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * Konzeptkarte für Kapitel 13 (Funktionsapproximation), übernommen aus der
 * Konzeptkarte des Vorlesungs-Repos. Grün markiert sind die Anker aus den
 * Kapiteln 1–9, auf denen das Kapitel aufsetzt; Tensorproduktbasis und
 * TP-Designmatrix aus Kapitel 9 sind hier zu einem Knoten zusammengefasst.
 * Einsicht: Das Kapitel besteht aus zwei verknüpften Strängen, Interpolation
 * (13.1–13.4) und Glättung samt Multivariatem (13.5–13.9).
 * Farbrollen: Anker grün, Abschnitte 13.1–13.4 orange, 13.5–13.9 violett.
 * Eigene Karte; keine numerischen Behauptungen (R5, 2026-08-20).
 */

const nodes: FlowNode[] = [
  {
    id: "span",
    label: ["Basis & Span"],
    kicker: "Kap. 1",
    x: 105,
    y: 44,
    w: 140,
    group: "anker",
    href: "?k=01-intro",
  },
  { id: "fraum", label: ["Funktionenräume"], x: 380, y: 40, w: 155, group: "fa1" },
  {
    id: "gs",
    label: ["Gram-Schmidt / QR"],
    kicker: "Kap. 7",
    x: 640,
    y: 44,
    w: 165,
    group: "anker",
    href: "?k=07-kq",
  },
  { id: "fbasis", label: ["Basen von", "Funktionenräumen"], x: 380, y: 142, w: 170, group: "fa1" },
  {
    id: "fapprox",
    label: ["Basisdarstellung", "f̂(x) = Σₖ aₖ φₖ(x)"],
    x: 380,
    y: 248,
    w: 175,
    group: "fa1",
  },
  {
    id: "kond",
    label: ["Kondition"],
    kicker: "Kap. 4",
    x: 230,
    y: 148,
    w: 120,
    group: "anker",
    href: "?k=04-fehler",
  },
  {
    id: "lgsn",
    label: ["Gleichungssysteme"],
    kicker: "Kap. 5",
    x: 105,
    y: 248,
    w: 165,
    group: "anker",
    href: "?k=05-lgs",
  },
  { id: "poly", label: ["Polynominterpolation"], x: 205, y: 352, w: 185, group: "fa1" },
  { id: "spline", label: ["Splines"], x: 520, y: 352, w: 110, group: "fa1" },
  { id: "runge", label: ["Runge-Phänomen"], x: 115, y: 445, w: 160, group: "fa1" },
  { id: "bspline", label: ["B-Splines"], x: 400, y: 445, w: 120, group: "fa1" },
  { id: "natspline", label: ["Natürliche kubische", "Splines"], x: 640, y: 450, w: 175, group: "fa1" },
  {
    id: "kq",
    label: ["Kleinste Quadrate"],
    kicker: "Kap. 7",
    x: 95,
    y: 545,
    w: 160,
    group: "anker",
    href: "?k=07-kq",
  },
  { id: "smooth", label: ["Glättung /", "Regressionssplines"], x: 290, y: 550, w: 175, group: "fa2" },
  {
    id: "tpk9",
    label: ["TP-Basis &", "TP-Designmatrix"],
    kicker: "Kap. 9",
    x: 480,
    y: 552,
    w: 160,
    group: "anker",
    href: "?k=09-tensoren",
  },
  { id: "kruemm", label: ["Krümmungsarmheit"], x: 655, y: 545, w: 170, group: "fa2" },
  { id: "biasvar", label: ["Bias-Varianz-", "Abwägung"], x: 130, y: 655, w: 145, group: "fa2" },
  { id: "gam", label: ["Additive Modelle", "(GAMs)"], x: 310, y: 655, w: 155, group: "fa2" },
  { id: "tps", label: ["Tensorprodukt-", "Splines"], x: 490, y: 655, w: 150, group: "fa2" },
  { id: "fluch", label: ["Fluch der Dimension"], x: 490, y: 748, w: 180, group: "fa2" },
];

const edges: FlowEdge[] = [
  { from: "span", to: "fbasis" },
  { from: "fraum", to: "fbasis" },
  { from: "gs", to: "fbasis" },
  { from: "fbasis", to: "fapprox" },
  { from: "fapprox", to: "poly" },
  { from: "fapprox", to: "spline" },
  { from: "lgsn", to: "poly" },
  { from: "kond", to: "poly" },
  { from: "poly", to: "runge" },
  { from: "spline", to: "bspline" },
  { from: "spline", to: "natspline" },
  { from: "natspline", to: "kruemm" },
  { from: "kq", to: "smooth" },
  { from: "bspline", to: "smooth" },
  { from: "smooth", to: "biasvar" },
  { from: "smooth", to: "gam" },
  { from: "bspline", to: "tps" },
  { from: "tpk9", to: "tps" },
  { from: "tps", to: "fluch" },
];

export function TeilDreiKarte() {
  return (
    <ConceptFlow
      ariaLabel={`Konzeptkarte von ${ref("kap:funktionsapproximation")}: von Basen und Funktionenräumen über Interpolation und Splines zu Glättung, Bias-Varianz-Abwägung und Tensorprodukt-Splines.`}
      nodes={nodes}
      edges={edges}
      groups={[
        { key: "anker", label: `Anker aus ${ref("kap:intro")}–9`, color: FMM_COLORS.gruen },
        { key: "fa1", label: "Interpolationsstrang", color: FMM_COLORS.orange },
        { key: "fa2", label: "Glättungsstrang und Multivariates", color: FMM_COLORS.violett },
      ]}
      openLabel="Kapitel öffnen"
    />
  );
}
