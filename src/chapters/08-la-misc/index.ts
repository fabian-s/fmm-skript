import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S81Body from "./S81.mdx";
import S82Body from "./S82.mdx";
import S83Body from "./S83.mdx";
import S84Body from "./S84.mdx";
import S85Body from "./S85.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "8.1",
      title: "Eigenwertprobleme: Potenzmethode und QR-Iteration",
      C: mdxSection(S81Body),
    },
    {
      id: "8.2",
      title: "Anwendungen: PageRank, PCA und approximative SVD",
      C: mdxSection(S82Body),
    },
    {
      id: "8.3",
      title: "Iterative Löser für lineare Gleichungssysteme",
      C: mdxSection(S83Body),
    },
    {
      id: "8.4",
      title: "Probabilistische Methoden: Matrix-Sketching",
      C: mdxSection(S84Body),
    },
    { id: "8.5", title: "Zusammenfassung", C: mdxSection(S85Body) },
  ],
};
export default chapter;
