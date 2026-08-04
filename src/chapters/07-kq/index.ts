import type { ChapterModule } from "../index";
import { S71 } from "./S71";
import { S72 } from "./S72";
import { S73 } from "./S73";
import { S74 } from "./S74";
import { S75 } from "./S75";
import { S76 } from "./S76";

const chapter: ChapterModule = {
  sections: [
    { id: "7.1", title: "Kleinste Quadrate: Problem und Motivation", C: S71 },
    { id: "7.2", title: "Kondition des Kleinste-Quadrate-Problems", C: S72 },
    { id: "7.3", title: "Normalengleichungen und Cholesky-Zerlegung", C: S73 },
    { id: "7.4", title: "QR-Zerlegung und Gram-Schmidt-Verfahren", C: S74 },
    { id: "7.5", title: "Konstruktion von Q: Givens-Rotationen und Householder-Spiegelungen", C: S75 },
    { id: "7.6", title: "Pseudoinverse, SVD-Lösung und Methodenvergleich", C: S76 },
  ],
};
export default chapter;
