import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S61Body from "./S61.mdx";
import S62Body from "./S62.mdx";
import S63Body from "./S63.mdx";
import S64Body from "./S64.mdx";
import S65Body from "./S65.mdx";

const chapter: ChapterModule = {
  sections: [
    { id: "6.1", title: "Motivation", C: mdxSection(S61Body) },
    {
      id: "6.2",
      title: "Singulärwerte und Singulärvektoren",
      C: mdxSection(S62Body),
    },
    {
      id: "6.3",
      title: "Reduzierte SVD und Pseudoinverse",
      C: mdxSection(S63Body),
    },
    { id: "6.4", title: "Anwendungen", C: mdxSection(S64Body) },
    { id: "6.5", title: "Zusammenfassung", C: mdxSection(S65Body) },
  ],
};
export default chapter;
