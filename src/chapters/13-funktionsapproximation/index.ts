import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S131Body from "./S131.mdx";
import S132Body from "./S132.mdx";
import S133Body from "./S133.mdx";
import S134Body from "./S134.mdx";
import S135Body from "./S135.mdx";
import S136Body from "./S136.mdx";
import S137Body from "./S137.mdx";
import S138Body from "./S138.mdx";
import S139Body from "./S139.mdx";

const chapter: ChapterModule = {
  sections: [
    { id: "13.1", title: "Approximation, Interpolation, Glättung", C: mdxSection(S131Body) },
    { id: "13.2", title: "Interpolation durch Basisdarstellung", C: mdxSection(S132Body) },
    { id: "13.3", title: "Polynominterpolation", C: mdxSection(S133Body) },
    { id: "13.4", title: "Splines und B-Splines", C: mdxSection(S134Body) },
    { id: "13.5", title: "Minimale Krümmung", C: mdxSection(S135Body) },
    { id: "13.6", title: "Approximationsfehler", C: mdxSection(S136Body) },
    { id: "13.7", title: "Glättung und Regression", C: mdxSection(S137Body) },
    { id: "13.8", title: "Bias-Varianz und Modellwahl", C: mdxSection(S138Body) },
    { id: "13.9", title: "Multivariat und Zusammenfassung", C: mdxSection(S139Body) },
  ],
};
export default chapter;
