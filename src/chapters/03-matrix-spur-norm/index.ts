import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S31Body from "./S31.mdx";
import S32Body from "./S32.mdx";
import S33Body from "./S33.mdx";
import S34Body from "./S34.mdx";
import S35Body from "./S35.mdx";
import S36Body from "./S36.mdx";

const chapter: ChapterModule = {
  sections: [
    { id: "3.1", title: "Die Spur einer Matrix", C: mdxSection(S31Body) },
    {
      id: "3.2",
      title: "Matrixnormen: Definition und Beispiele",
      C: mdxSection(S32Body),
    },
    { id: "3.3", title: "Operatornormen", C: mdxSection(S33Body) },
    { id: "3.4", title: "Schattennormen", C: mdxSection(S34Body) },
    {
      id: "3.5",
      title: "Eigenschaften von Matrixnormen",
      C: mdxSection(S35Body),
    },
    { id: "3.6", title: "Zusammenfassung", C: mdxSection(S36Body) },
  ],
};
export default chapter;
