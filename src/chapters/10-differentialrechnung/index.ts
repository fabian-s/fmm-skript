import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S101Body from "./S101.mdx";
import S102Body from "./S102.mdx";
import S103Body from "./S103.mdx";
import S104Body from "./S104.mdx";
import S105Body from "./S105.mdx";
import S106Body from "./S106.mdx";
import S107Body from "./S107.mdx";
import S108Body from "./S108.mdx";
import S109Body from "./S109.mdx";

const chapter: ChapterModule = {
  sections: [
    { id: "10.1", key: "linearisierung", title: "Ableitung als lineare Approximation", C: mdxSection(S101Body) },
    { id: "10.2", key: "gradient", title: "Der Gradient: Vektor zu Skalar", C: mdxSection(S102Body) },
    { id: "10.3", key: "jacobi", title: "Die Jacobimatrix: Vektor zu Vektor", C: mdxSection(S103Body) },
    { id: "10.4", key: "matrixableitungen", title: "Ableitungen mit Matrizen", C: mdxSection(S104Body) },
    { id: "10.5", key: "stetigkeit", title: "Stetigkeit und Linearität", C: mdxSection(S105Body) },
    { id: "10.6", key: "produkt-kettenregel", title: "Produkt- und Kettenregel", C: mdxSection(S106Body) },
    { id: "10.7", key: "hoehere-ableitungen", title: "Ableitungen höheren Grades", C: mdxSection(S107Body) },
    { id: "10.8", key: "taylor", title: "Taylorapproximation", C: mdxSection(S108Body) },
    { id: "10.9", key: "zusammenfassung", title: "Zusammenfassung", C: mdxSection(S109Body) },
  ],
};
export default chapter;
