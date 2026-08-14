import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S151Body from "./S151.mdx";
import S152Body from "./S152.mdx";
import S153Body from "./S153.mdx";
import S154Body from "./S154.mdx";
import S155Body from "./S155.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "15.1",
      title: "Minimale Krümmung",
      C: mdxSection(S151Body),
    },
    {
      id: "15.2",
      title: "Approximationsfehler",
      C: mdxSection(S152Body),
    },
    {
      id: "15.3",
      title: "Glättung und Regression",
      C: mdxSection(S153Body),
    },
    {
      id: "15.4",
      title: "Bias-Varianz und Modellwahl",
      C: mdxSection(S154Body),
    },
    {
      id: "15.5",
      title: "Multivariat und Zusammenfassung",
      C: mdxSection(S155Body),
    },
  ],
};
export default chapter;
