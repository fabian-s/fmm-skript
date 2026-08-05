import type { ChapterModule } from "../index";
import { S41 } from "./S41";
import { S42 } from "./S42";
import { S43 } from "./S43";
import { S44 } from "./S44";

const chapter: ChapterModule = {
  sections: [
    { id: "4.1", title: "Fehlermaße und Fehlerzerlegung", C: S41 },
    { id: "4.2", title: "Kondition", C: S42 },
    { id: "4.3", title: "Stabilität von Algorithmen", C: S43 },
    { id: "4.4", title: "Zusammenfassung", C: S44 },
  ],
};
export default chapter;
