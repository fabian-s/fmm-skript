import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S51Body from "./S51.mdx";
import S52Body from "./S52.mdx";
import S53Body from "./S53.mdx";
import S54Body from "./S54.mdx";
import S55Body from "./S55.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "5.1", key: "grundlagen",
      title: "Numerische lineare Algebra: Grundlagen",
      C: mdxSection(S51Body),
    },
    { id: "5.2", key: "lgs", title: "Lineare Gleichungssysteme", C: mdxSection(S52Body) },
    { id: "5.3", key: "lu", title: "Die LU-Zerlegung", C: mdxSection(S53Body) },
    { id: "5.4", key: "cholesky", title: "Die Cholesky-Zerlegung", C: mdxSection(S54Body) },
    { id: "5.5", key: "zusammenfassung", title: "Zusammenfassung", C: mdxSection(S55Body) },
  ],
};
export default chapter;
