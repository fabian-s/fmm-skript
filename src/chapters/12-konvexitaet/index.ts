import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S121Body from "./S121.mdx";
import S122Body from "./S122.mdx";
import S123Body from "./S123.mdx";
import S124Body from "./S124.mdx";
import S125Body from "./S125.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "12.1",
      title: "Konvexkombinationen und konvexe Hülle",
      C: mdxSection(S121Body),
    },
    { id: "12.2", title: "Konvexe Mengen", C: mdxSection(S122Body) },
    {
      id: "12.3",
      title: "Projektion und konvexe Funktionen",
      C: mdxSection(S123Body),
    },
    {
      id: "12.4",
      title: "Eigenschaften konvexer Funktionen",
      C: mdxSection(S124Body),
    },
    {
      id: "12.5",
      title: "Konvexe Optimierung und Zusammenfassung",
      C: mdxSection(S125Body),
    },
  ],
};
export default chapter;
