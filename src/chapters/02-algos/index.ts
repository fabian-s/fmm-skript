import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S21Body from "./S21.mdx";
import S22Body from "./S22.mdx";
import S23Body from "./S23.mdx";
import S24Body from "./S24.mdx";
import S25Body from "./S25.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "2.1", key: "probleme-algorithmen",
      title: "Numerische Probleme und Algorithmen",
      C: mdxSection(S21Body),
    },
    {
      id: "2.2", key: "fibonacci",
      title: "Algorithmen konkret: Fibonacci und Verwandte",
      C: mdxSection(S22Body),
    },
    { id: "2.3", key: "aufwand", title: "Aufwand und Komplexität", C: mdxSection(S23Body) },
    {
      id: "2.4", key: "landau",
      title: "Landau-Symbole und Rechenregeln",
      C: mdxSection(S24Body),
    },
    {
      id: "2.5", key: "fibonacci-komplexitaet",
      title: "Fibonacci: Komplexitätsanalyse",
      C: mdxSection(S25Body),
    },
  ],
};
export default chapter;
