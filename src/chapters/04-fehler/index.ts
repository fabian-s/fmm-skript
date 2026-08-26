import type { ChapterModule } from "../index";
import { mdxSection } from "../../mdx/adapters";
import S41Body from "./S41.mdx";
import S42Body from "./S42.mdx";
import S43Body from "./S43.mdx";
import S44Body from "./S44.mdx";

const chapter: ChapterModule = {
  sections: [
    {
      id: "4.1", key: "fehlermasse",
      title: "Fehlermaße und Fehlerzerlegung",
      C: mdxSection(S41Body),
    },
    { id: "4.2", key: "kondition", title: "Kondition", C: mdxSection(S42Body) },
    { id: "4.3", key: "stabilitaet", title: "Stabilität von Algorithmen", C: mdxSection(S43Body) },
    { id: "4.4", key: "zusammenfassung", title: "Zusammenfassung", C: mdxSection(S44Body) },
  ],
};
export default chapter;
