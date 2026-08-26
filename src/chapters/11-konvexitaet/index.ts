import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S111Body from "./S111.mdx";
import S112Body from "./S112.mdx";
import S113Body from "./S113.mdx";
import S114Body from "./S114.mdx";
import S115Body from "./S115.mdx";

const chapter: ChapterModule = {
  sections: [
    { id: "11.1", key: "konvexkombinationen", title: "Konvexkombinationen und konvexe Hülle", C: mdxSection(S111Body) },
    { id: "11.2", key: "konvexe-mengen", title: "Konvexe Mengen", C: mdxSection(S112Body) },
    { id: "11.3", key: "projektion-konvexe-funktionen", title: "Projektion und konvexe Funktionen", C: mdxSection(S113Body) },
    { id: "11.4", key: "eigenschaften", title: "Eigenschaften konvexer Funktionen", C: mdxSection(S114Body) },
    { id: "11.5", key: "konvexe-optimierung", title: "Konvexe Optimierung und Zusammenfassung", C: mdxSection(S115Body) },
  ],
};
export default chapter;
