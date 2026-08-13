import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S131Body from "./S131.mdx";
import S132Body from "./S132.mdx";
import S133Body from "./S133.mdx";
import S134Body from "./S134.mdx";
import S135Body from "./S135.mdx";
import S136Body from "./S136.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "13.1",
      title: "Nichtlineare Gleichungen",
      C: mdxSection(S131Body),
    },
    {
      id: "13.2",
      title: "Optimalität und Sattelpunkte",
      C: mdxSection(S132Body),
    },
    {
      id: "13.3",
      title: "Nelder-Mead und Gradientenabstieg",
      C: mdxSection(S133Body),
    },
    {
      id: "13.4",
      title: "Newton, Quasi-Newton und SGD",
      C: mdxSection(S134Body),
    },
    {
      id: "13.5",
      title: "Beschränkte Optimierung",
      C: mdxSection(S135Body),
    },
    {
      id: "13.6",
      title: "Optimierung in R und Zusammenfassung",
      C: mdxSection(S136Body),
    },
  ],
};
export default chapter;
