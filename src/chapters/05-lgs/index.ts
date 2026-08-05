import type { ChapterModule } from "../index";
import { S51 } from "./S51";
import { S52 } from "./S52";
import { S53 } from "./S53";
import { S54 } from "./S54";
import { S55 } from "./S55";

const chapter: ChapterModule = {
  sections: [
    { id: "5.1", title: "Numerische lineare Algebra: Grundlagen", C: S51 },
    { id: "5.2", title: "Lineare Gleichungssysteme", C: S52 },
    { id: "5.3", title: "Die LU-Zerlegung", C: S53 },
    { id: "5.4", title: "Die Cholesky-Zerlegung", C: S54 },
    { id: "5.5", title: "Zusammenfassung", C: S55 },
  ],
};
export default chapter;
