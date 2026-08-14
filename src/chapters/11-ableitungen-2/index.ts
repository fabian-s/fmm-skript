import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S111Body from "./S111.mdx";
import S112Body from "./S112.mdx";
import S113Body from "./S113.mdx";
import S114Body from "./S114.mdx";
import S115Body from "./S115.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "11.1",
      title: "Stetigkeit und Linearität",
      C: mdxSection(S111Body),
    },
    {
      id: "11.2",
      title: "Produkt- und Kettenregel",
      C: mdxSection(S112Body),
    },
    {
      id: "11.3",
      title: "Ableitungen höheren Grades",
      C: mdxSection(S113Body),
    },
    {
      id: "11.4",
      title: "Taylorapproximation",
      C: mdxSection(S114Body),
    },
    { id: "11.5", title: "Zusammenfassung", C: mdxSection(S115Body) },
  ],
};
export default chapter;
