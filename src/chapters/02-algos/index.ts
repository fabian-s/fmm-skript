import type { ChapterModule } from "../index";
import { S21 } from "./S21";
import { S22 } from "./S22";
import { S23 } from "./S23";
import { S24 } from "./S24";
import { S25 } from "./S25";

const chapter: ChapterModule = {
  sections: [
    { id: "2.1", title: "Numerische Probleme und Algorithmen", C: S21 },
    { id: "2.2", title: "Algorithmen konkret: Fibonacci und Verwandte", C: S22 },
    { id: "2.3", title: "Aufwand und Komplexität", C: S23 },
    { id: "2.4", title: "Landau-Symbole und Rechenregeln", C: S24 },
    { id: "2.5", title: "Fibonacci: Komplexitätsanalyse", C: S25 },
  ],
};
export default chapter;
