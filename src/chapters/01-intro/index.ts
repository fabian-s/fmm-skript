import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S11Body from "./S11.mdx";

const chapter: ChapterModule = {
  sections: [
    { id: "1.1", title: "Worum geht es in diesem Kurs?", C: mdxSection(S11Body) },
  ],
};
export default chapter;
