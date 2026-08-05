import type { ChapterModule } from "../index";
import { S31 } from "./S31";
import { S32 } from "./S32";
import { S33 } from "./S33";
import { S34 } from "./S34";
import { S35 } from "./S35";
import { S36 } from "./S36";

const chapter: ChapterModule = {
  sections: [
    { id: "3.1", title: "Die Spur einer Matrix", C: S31 },
    { id: "3.2", title: "Matrixnormen: Definition und Beispiele", C: S32 },
    { id: "3.3", title: "Operatornormen", C: S33 },
    { id: "3.4", title: "Schattennormen", C: S34 },
    { id: "3.5", title: "Eigenschaften von Matrixnormen", C: S35 },
    { id: "3.6", title: "Zusammenfassung", C: S36 },
  ],
};
export default chapter;
