import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S121Body from "./S121.mdx";
import S122Body from "./S122.mdx";
import S123Body from "./S123.mdx";
import S124Body from "./S124.mdx";
import S125Body from "./S125.mdx";
import S126Body from "./S126.mdx";

const chapter: ChapterModule = {
  sections: [
    { id: "12.1", title: "Nichtlineare Gleichungen", C: mdxSection(S121Body) },
    { id: "12.2", title: "Optimalität und Sattelpunkte", C: mdxSection(S122Body) },
    { id: "12.3", title: "Nelder-Mead und Gradientenabstieg", C: mdxSection(S123Body) },
    { id: "12.4", title: "Newton, Quasi-Newton und SGD", C: mdxSection(S124Body) },
    { id: "12.5", title: "Beschränkte Optimierung", C: mdxSection(S125Body) },
    { id: "12.6", title: "Optimierung in R und Zusammenfassung", C: mdxSection(S126Body) },
  ],
};
export default chapter;
