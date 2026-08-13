import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S141Body from "./S141.mdx";
import S142Body from "./S142.mdx";
import S143Body from "./S143.mdx";
import S144Body from "./S144.mdx";
import S145Body from "./S145.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "14.1",
      title: "Approximation, Interpolation, Glättung",
      C: mdxSection(S141Body),
    },
    {
      id: "14.2",
      title: "Interpolation durch Basisdarstellung",
      C: mdxSection(S142Body),
    },
    {
      id: "14.3",
      title: "Polynominterpolation",
      C: mdxSection(S143Body),
    },
    {
      id: "14.4",
      title: "Splines und B-Splines",
      C: mdxSection(S144Body),
    },
    { id: "14.5", title: "Zusammenfassung", C: mdxSection(S145Body) },
  ],
};
export default chapter;
