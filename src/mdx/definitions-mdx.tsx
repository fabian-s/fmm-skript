/**
 * Registriert die Vorschaufenster für Begriffe und Sätze des Skripts.
 *
 * Die Module unter src/definitions/ erzeugt scripts/gen-definitions.mjs: je
 * eine Kopie des Rumpfs einer Definition, eines Satzes, Lemmas oder Korollars
 * mit ID-Label. Sie landen im selben Tooltip-Register wie die Vorwissens-
 * Konzepte, aber unter der ID `env:<label-id>` (eigener Namensraum) und mit
 * variant "course": `:d[Begriff]{#id}` wird grau unterstrichen, und das
 * Fenster zeigt unten einen Link an die Stelle, an der der Begriff steht.
 */
import type { ComponentType } from "react";
import { registerConcept } from "../lib";
import { ConceptBody } from "./adapters";

type Meta = {
  id: string;
  kind: string;
  num: string;
  name: string | null;
  chapter: string;
  section: string;
  anchor: string;
};
type DefinitionModule = { default: ComponentType; meta: Meta };

const modules = import.meta.glob("../definitions/*/*.mdx", { eager: true }) as Record<
  string,
  DefinitionModule
>;

/** Im selben Kapitel reicht der Anker (kein Neuladen), sonst ?k=<kapitel>#anker. */
function SourceLink({ meta }: { meta: Meta }) {
  const here = new URLSearchParams(window.location.search).get("k");
  const href = (here === meta.chapter ? "" : `?k=${meta.chapter}`) + `#${meta.anchor}`;
  return (
    <a href={href}>
      → {meta.kind} {meta.num} in Abschnitt {meta.section}
    </a>
  );
}

for (const mod of Object.values(modules)) {
  const { meta } = mod;
  const Body = mod.default;
  const label = `${meta.kind} ${meta.num}`;
  registerConcept({
    id: `env:${meta.id}`,
    title: meta.name ?? label,
    badge: meta.name ? label : undefined,
    variant: "course",
    body: (
      <ConceptBody>
        <Body />
      </ConceptBody>
    ),
    footer: <SourceLink meta={meta} />,
  });
}

export {};
