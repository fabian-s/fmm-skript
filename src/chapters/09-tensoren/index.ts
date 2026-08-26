import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S91Body from "./S91.mdx";
import S92Body from "./S92.mdx";
import S93Body from "./S93.mdx";
import S94Body from "./S94.mdx";
import S95Body from "./S95.mdx";

const chapter: ChapterModule = {
  sections: [
    { id: "9.1", key: "multilinear", title: "Multilineare Abbildungen", C: mdxSection(S91Body) },
    { id: "9.2", key: "tensoren", title: "Tensoren", C: mdxSection(S92Body) },
    { id: "9.3", key: "produkte", title: "Produkte von Tensoren", C: mdxSection(S93Body) },
    {
      id: "9.4", key: "tensorprodukt",
      title: "Tensorprodukt von Vektorräumen",
      C: mdxSection(S94Body),
    },
    { id: "9.5", key: "zusammenfassung", title: "Zusammenfassung", C: mdxSection(S95Body) },
  ],
};
export default chapter;
