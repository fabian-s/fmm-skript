import { useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixDisplay, Verdikt, fmtDe } from "../../../lib";

/**
 * Einsicht: Das Kroneckerprodukt ordnet dieselben Faktorprodukte blockweise an;
 * die Reihenfolge der Faktoren entscheidet über die Blockstruktur. Farbrollen:
 * A blau, B grün, Produkte orange. Provenienz: Eigenbau.
 * Per node verifiziert: Beispiel 9.3.14 liefert 6×6; (A⊗B)^T=A^T⊗B^T
 * (verify-09-tensoren/check-s93.mjs, 2026-08-19).
 */
const {blau:BLAU,gruen:GRUEN,orange:ORANGE,grau:GRAU}=FMM_COLORS; type Mat=number[][];
const PRESETS:{name:string;A:Mat;B:Mat}[]=[{name:"Beispiel 9.3.14",A:[[1,0],[2,5]],B:[[3,0,0],[0,2,0],[-1,0,-1]]},{name:"S ⊗ I",A:[[1,2],[3,4]],B:[[1,0],[0,1]]},{name:"I ⊗ S",A:[[1,0],[0,1]],B:[[1,2],[3,4]]},{name:"Diagonal",A:[[2,0],[0,-1]],B:[[3,0],[0,4]]}];
const kron=(A:Mat,B:Mat)=>A.flatMap(a=>B.map(b=>a.flatMap(x=>b.map(y=>x*y))));
export function KroneckerRechner(){const [p,setP]=useState(0);const [swap,setSwap]=useState(false);const q=PRESETS[p],A=swap?q.B:q.A,B=swap?q.A:q.B,D=kron(A,B);const other=kron(B,A);const gleich=JSON.stringify(D)===JSON.stringify(other);
 return <div><Aufgabe>Wählen wir einen Fall und vertauschen wir dann die Faktoren; verfolgen wir die Blöcke.</Aufgabe><div className="my-2 flex flex-wrap gap-2">{PRESETS.map((x,i)=><button type="button" key={x.name} aria-pressed={p===i} onClick={()=>setP(i)} className="rounded px-2 py-1 text-sm" style={{boxShadow:`inset 0 0 0 1px ${p===i?ORANGE:GRAU}`}}>{x.name}</button>)}<button type="button" aria-pressed={swap} onClick={()=>setSwap(!swap)} className="rounded px-2 py-1 text-sm" style={{boxShadow:`inset 0 0 0 1px ${swap?ORANGE:GRAU}`}}>A und B vertauschen</button></div><div className="flex flex-wrap gap-5 items-start"><div><span style={{color:BLAU}}>A</span><MatrixDisplay value={A}/></div><div><span style={{color:GRUEN}}>B</span><MatrixDisplay value={B}/></div><div className="transition-all duration-300"><span style={{color:ORANGE}}>{swap?"B ⊗ A":"A ⊗ B"}</span><MatrixDisplay value={D}/></div></div><Verdikt kind={gleich?"ok":"warn"}>{gleich ? "In diesem Spezialfall stimmen beide Anordnungen überein." : `Die Produkte haben jeweils ${D.length}×${D[0].length} Einträge, aber ihre Blockanordnung unterscheidet sich. Das ist Bemerkung 9.3.15; die Transpositionsregel bleibt eintragsweise exakt.`}</Verdikt></div>}
