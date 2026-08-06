import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import SLabBody from "./SLab.mdx";

const chapter: ChapterModule = {
  sections: [{ id: "99.1", title: "MDX-Syntaxlabor", C: mdxSection(SLabBody) }],
};
export default chapter;
