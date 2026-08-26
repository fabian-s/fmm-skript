import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S71Body from "./S71.mdx";
import S72Body from "./S72.mdx";
import S73Body from "./S73.mdx";
import S74Body from "./S74.mdx";
import S75Body from "./S75.mdx";
import S76Body from "./S76.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "7.1", key: "problem",
      title: "Kleinste Quadrate: Problem und Motivation",
      C: mdxSection(S71Body),
    },
    {
      id: "7.2", key: "kondition",
      title: "Kondition des Kleinste-Quadrate-Problems",
      C: mdxSection(S72Body),
    },
    {
      id: "7.3", key: "normalengleichungen",
      title: "Normalengleichungen und Cholesky-Zerlegung",
      C: mdxSection(S73Body),
    },
    {
      id: "7.4", key: "qr",
      title: "QR-Zerlegung und Gram-Schmidt-Verfahren",
      C: mdxSection(S74Body),
    },
    {
      id: "7.5", key: "givens-householder",
      title:
        "Konstruktion von Q: Givens-Rotationen und Householder-Spiegelungen",
      C: mdxSection(S75Body),
    },
    {
      id: "7.6", key: "pseudoinverse",
      title: "Pseudoinverse, SVD-Lösung und Methodenvergleich",
      C: mdxSection(S76Body),
    },
  ],
};
export default chapter;
