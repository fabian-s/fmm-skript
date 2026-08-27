import{r as q,o as qn,j as e,A as xe,M as n,f as U,W as Ne,d as te,p as Vn,F as V,g as l,q as fe,S as ie,V as me,b as v,C as a,E as g,a as t,P as H,n as p,Q as we,i as T,Z as ke,h as yn,u as Mn,s as pe,D as Nn,t as Wn,v as Rn,w as $n,T as In,L as Pn,e as rn,x as Qn,y as Kn,m as be}from"./index-GbyLwDE5.js";import{E as P,I as oe}from"./Interaktiv-DHZUUTxv.js";const Ee=V.gruen,ee=V.blau;function Ln(r){const i=r[0][0]+r[1][1],s=r[0][0]*r[1][1]-r[0][1]*r[1][0],m=i*i-4*s;if(m>=0){const h=Math.sqrt(m);return{real:!0,l1:(i+h)/2,l2:(i-h)/2,tr:i,det:s}}return{real:!1,re:i/2,im:Math.sqrt(-m)/2,tr:i,det:s}}const tn=[{name:"zwei reelle Eigenwerte",titel:"obere Dreiecksmatrix, λ = 3 und 2",m:[[2,-1],[0,3]]},{name:"symmetrisch",titel:"λ = 3,618 und 1,382, beide reell",m:[[2,1],[1,3]]},{name:"Drehung um 90°",titel:"komplexes Paar λ = ±i",m:[[0,-1],[1,0]]},{name:"defekt (Jordan)",titel:"doppelter Eigenwert 2, nur eine Eigenrichtung",m:[[2,1],[0,2]]}],Re=330,Ue=210,Xe=30,Je=12,$e=12,Dn=30,On=Re-Xe-Je,ln=Ue-$e-Dn;function Gn(){const[r,i]=q.useState(tn[0].m.map(x=>[...x])),s=Ln(r),m=s.real?s.l1+s.l2:2*s.re,h=s.real?s.l1:s.re,d=s.real?s.l2:s.re,b=s.real?0:s.im,j=Math.min(0,h,d,s.tr),_=Math.max(0,h,d,s.tr),F=Math.max(4.5,1.25*(_-j),4.3*Math.abs(b)),S=(j+_)/2-F/2,f=On/F,E=ln/(2*f),w=x=>Xe+(x-S)*f,u=x=>$e+ln/2-x*f,y=qn(S,S+F,6),c=y.length>1?y[1]-y[0]:void 0,A=-E*.62,I=s.real&&Math.abs(s.l1-s.l2)<1e-9,J=I&&Math.abs(r[0][1])+Math.abs(r[1][0])>1e-9,Q=s.real?J?"defekt":I?"doppelt":"reell":"komplex",z=Q==="komplex"?"ein konjugiertes Paar über und unter der reellen Achse":Q==="reell"?"zwei getrennte Punkte auf der reellen Achse":"ein doppelter Punkt auf der reellen Achse",o=(x,B,R)=>{const Z=r.map(Y=>[...Y]);Z[x][B]=R,i(Z)},k=(x,B,R)=>e.jsxs("g",{stroke:ee,fill:ee,children:[e.jsx("line",{x1:w(x),y1:u(A),x2:w(B),y2:u(A),strokeWidth:2.4}),e.jsx("line",{x1:w(x),y1:u(A)-4,x2:w(x),y2:u(A)+4,strokeWidth:1.4})]},R);return e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs(xe,{children:["Schieben wir ",e.jsx(n,{children:"a_{12}"})," durch den ganzen Bereich und behalten wir dabei das Ende der blauen Summenleiste im Auge."]}),e.jsx("p",{className:`max-w-prose text-xs ${U}`,children:"Blau: die Eigenwerte in der komplexen Ebene und, als Leiste darunter, ihre Realteile aneinandergelegt. Grün: die Spur, also die Summe der beiden Diagonaleinträge."}),e.jsx("div",{className:"flex flex-wrap gap-2",children:tn.map(x=>{const B=x.m.every((R,Z)=>R.every((Y,G)=>Y===r[Z][G]));return e.jsx("button",{type:"button",title:x.titel,"aria-pressed":B,className:`text-xs ${B?Ne:te}`,onClick:()=>i(x.m.map(R=>[...R])),children:x.name},x.name)})}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx("div",{className:"min-w-0",children:e.jsxs("svg",{viewBox:`0 0 ${Re} ${Ue}`,className:"max-w-full h-auto rounded",style:{background:"var(--w-bg)",border:"1px solid var(--w-border)"},role:"img","aria-label":`Eigenwerte in der komplexen Ebene: ${z}; die Summe der Realteile trifft die Spur ${l(s.tr,2)}.`,children:[e.jsx("line",{x1:Xe,y1:u(0),x2:Re-Je,y2:u(0),stroke:"var(--w-axis)",strokeWidth:1.2}),e.jsx("line",{x1:w(0),y1:$e,x2:w(0),y2:Ue-Dn,stroke:"var(--w-grid-strong)",strokeWidth:1}),y.map(x=>e.jsxs("g",{children:[e.jsx("line",{x1:w(x),y1:u(0)-3,x2:w(x),y2:u(0)+3,stroke:"var(--w-axis)"}),x!==0&&e.jsx("text",{x:w(x),y:u(0)+14,fontSize:10,fill:"var(--w-muted)",textAnchor:"middle",children:Vn(x,c)})]},`t${x}`)),e.jsx("text",{x:Re-Je,y:u(0)-6,fontSize:11,fill:"var(--w-muted)",textAnchor:"end",children:"Re"}),e.jsx("text",{x:w(0)+5,y:$e+10,fontSize:11,fill:"var(--w-muted)",children:"Im"}),e.jsx("line",{x1:w(s.tr),y1:u(A)-10,x2:w(s.tr),y2:u(0)+6,stroke:Ee,strokeWidth:2,strokeDasharray:"4 3"}),e.jsxs("text",{x:w(s.tr),y:u(A)-14,fontSize:11,fill:Ee,textAnchor:"middle",stroke:"var(--w-bg)",strokeWidth:2.5,paintOrder:"stroke",children:["tr = ",l(s.tr,2)]}),k(0,h,"s1"),k(h,h+d,"s2"),e.jsx("circle",{cx:w(m),cy:u(A),r:3.5,fill:Ee}),!s.real&&e.jsx("line",{x1:w(h),y1:u(b),x2:w(h),y2:u(-b),stroke:ee,strokeWidth:1,strokeDasharray:"3 3"}),(s.real?[{x:s.l1,y:0,name:"λ₁"},{x:s.l2,y:0,name:"λ₂"}]:[{x:s.re,y:s.im,name:"λ₁"},{x:s.re,y:-s.im,name:"λ₂"}]).map((x,B)=>e.jsxs("g",{children:[e.jsx("circle",{cx:w(x.x),cy:u(x.y),r:5,fill:ee}),e.jsx("text",{x:w(x.x),y:u(x.y)-9,fontSize:11,fill:ee,textAnchor:"middle",stroke:"var(--w-bg)",strokeWidth:2.5,paintOrder:"stroke",children:x.name})]},`ew${B}`))]})}),e.jsxs("div",{className:"min-w-0 space-y-2",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(n,{children:"\\bA ="}),e.jsx(fe,{value:r,onChange:i,step:.5})]}),e.jsx(ie,{label:"a₁₂",value:r[0][1],onChange:x=>o(0,1,x),min:-4,max:4,step:.1,accent:ee}),e.jsx(ie,{label:"a₂₁",value:r[1][0],onChange:x=>o(1,0,x),min:-4,max:4,step:.1,accent:ee}),e.jsxs("div",{className:"space-y-0.5 font-mono text-xs",children:[e.jsxs("div",{style:{color:Ee},children:["tr(A) = ",l(r[0][0],2)," + ",l(r[1][1],2)," = ",l(s.tr,2)]}),e.jsx("div",{style:{color:ee},children:s.real?`λ₁ = ${l(s.l1,3)},  λ₂ = ${l(s.l2,3)}`:`λ₁,₂ = ${l(s.re,3)} ± ${l(s.im,3)} i`}),e.jsxs("div",{style:{color:ee},children:["λ₁ + λ₂ = ",l(m,3)]}),e.jsxs("div",{className:U,children:["det(A) = ",l(s.det,3)]})]})]})]}),e.jsxs(me,{kind:Q==="komplex"?"warn":"ok",titel:`${z}.`,children:[Q==="reell"&&e.jsxs(e.Fragment,{children:["Die beiden Realteile ",l(h,2)," und ",l(d,2)," ergeben aneinandergelegt genau"," ",l(s.tr,2),", die Spur aus den Diagonaleinträgen. Genau das behauptet ",v("satz:spur-als-summe-der-eigenwerte")," – und die Nebendiagonale, die beide Eigenwerte verschiebt, taucht in der Spur nirgends auf."]}),Q==="doppelt"&&e.jsxs(e.Fragment,{children:["Hier fallen beide Eigenwerte auf ",l(h,2)," zusammen. ",v("satz:spur-als-summe-der-eigenwerte")," zählt sie mit ihrer algebraischen Vielfachheit, die Summe ist also ",l(h,2)," + ",l(d,2)," ="," ",l(s.tr,2)," = tr(A), nicht etwa ",l(h,2),"."]}),Q==="defekt"&&e.jsxs(e.Fragment,{children:["Doppelter Eigenwert ",l(h,2),", und wegen der Nebendiagonale gibt es zu ihm nur eine Eigenrichtung: Diese Matrix ist nicht diagonalisierbar. Der Beweis von ",v("satz:spur-als-summe-der-eigenwerte"),"aus dem Skript greift hier nicht, die Aussage selbst gilt trotzdem, die Summe"," ",l(h,2)," + ",l(d,2)," = ",l(s.tr,2)," trifft die Spur."]}),!s.real&&e.jsxs(e.Fragment,{children:["Die Diskriminante ist negativ, die Eigenwerte ",l(s.re,2)," ± ",l(s.im,2)," i liegen also außerhalb der reellen Achse. In der Summenleiste zählt nur ihr Realteil zweimal ",l(s.re,2),"; die Imaginärteile heben sich weg, und die Spur bleibt reell bei ",l(s.tr,2)," (",v("satz:spur-als-summe-der-eigenwerte"),")."]})]})]})}function an(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Mit diesem Kapitel beginnt der Numerik-Teil des Skripts in der linearen Algebra. Bevor wir
in den folgenden Kapiteln Gleichungssysteme zerlegen und lösen, brauchen wir ein
Handwerkszeug, das dort auf Schritt und Tritt auftaucht: Wir müssen
`,e.jsx(a,{id:"matrix",children:"Matrizen"})," ",e.jsx(i.em,{children:"messen"}),` können. Wie groß ist eine
Matrix? Wie stark verstärkt sie Fehler? Wann konvergiert ein iteratives Verfahren? Alle
diese Fragen verlangen, eine ganze Tabelle voller Zahlen zu einer einzigen aussagekräftigen
Kennzahl zu verdichten. Dieses Kapitel stellt die beiden wichtigsten solchen Kennzahlen
vor: die `,e.jsx(i.em,{children:"Spur"})," (dieser Abschnitt) und die ",e.jsx(i.em,{children:"Matrixnormen"}),` (Rest des
Kapitels). Beide begegnen uns in der Statistik ständig: Die Gesamtvarianz eines
Zufallsvektors ist zum Beispiel die Spur seiner
`,e.jsx(a,{id:"covariance-matrix",children:"Kovarianzmatrix"}),"."]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"3.1.1 (Verwendete Vorkenntnisse)",id:"env-spur-verwendete-vorkenntnisse",children:[e.jsx(i.p,{children:"Dieses Kapitel setzt voraus:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`aus der linearen Algebra: Matrixoperationen (Addition,
`,e.jsx(a,{id:"matrix-multiplication",children:"Multiplikation"}),`,
`,e.jsx(a,{id:"transpose",children:"Transposition"}),`),
`,e.jsx(a,{id:"eigenvalue-eigenvector",children:"Eigenwerte und Eigenvektoren"}),`,
`,e.jsx(a,{id:"orthogonality",children:"Orthogonalität"}),`,
`,e.jsx(a,{id:"dot-product",children:"Skalarprodukte"}),` sowie grundlegende
Vektornormen (`,e.jsx(a,{id:"euclidean-norm",children:"euklidische Norm"}),`
`,e.jsx(n,{children:"\\left\\| \\bx \\right\\|_2"})," und ",e.jsx(n,{children:"p"}),"-Normen),"]}),`
`,e.jsxs(i.li,{children:["aus der Analysis: ",e.jsx(a,{id:"limit",children:"Grenzwerte"}),` und
`,e.jsx(a,{id:"supremum",children:"Suprema"}),", Maximum und Minimum von Funktionen."]}),`
`]})]}),`
`,e.jsxs(i.h3,{id:"sec-definition-und-erste-beispiele",children:["3.1.1 ","Definition und erste Beispiele"]}),`
`,e.jsx(i.p,{children:`Die einfachste Art, eine quadratische Matrix zu einer Zahl zu verdichten, ist zugleich die
billigste: Wir addieren einfach die Diagonalelemente. Das klingt zunächst willkürlich.
Warum ausgerechnet die Diagonale? Die Antwort liefert dieser Abschnitt: Diese Summe ist
eine erstaunlich stabile Kenngröße der Matrix, die sich von Basiswechseln nicht
beeindrucken lässt und die Summe der Eigenwerte liefert, ohne dass wir auch nur einen
davon ausrechnen müssten.`}),`
`,e.jsxs(g,{kind:"Definition",label:"3.1.2 (Spur)",id:"env-spur",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Spur"})," (",e.jsx(i.em,{children:"trace"}),`) einer quadratischen Matrix
`,e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"})," ist die Summe ihrer Diagonalelemente:"]}),e.jsx(t,{children:"\\tr(\\bA) = \\sum_{i=1}^n \\cgreen{a_{ii}}."})]}),`
`,e.jsxs(i.p,{children:["Zwei Dinge halten wir gleich fest: Erstens ist die Spur ",e.jsx(i.em,{children:`nur für quadratische
Matrizen`}),` definiert, denn bei einer rechteckigen Matrix hat „die Diagonale" keine
sinnvolle Bedeutung. Zweitens ist die Spur eine `,e.jsx(i.em,{children:"skalare Invariante"}),` der Matrix:
Sie ändert sich nicht, wenn wir dieselbe lineare Abbildung in einer anderen
`,e.jsx(a,{id:"basis",children:"Basis"}),` darstellen (das ist die
Ähnlichkeitsinvarianz, die wir gleich in `,e.jsx(i.a,{href:"#env-eigenschaften-der-spur",children:"Satz 3.1.4"}),` beweisen). Nebenbei bemerkt ist die
Spur auch numerisch ein Schnäppchen: `,e.jsx(n,{children:"n - 1"}),` Additionen, keine einzige
Multiplikation.`]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.1.3",id:"env-beispiel-3-1-3",children:[e.jsxs(i.p,{children:["Für die ",e.jsx(a,{id:"identity-matrix",children:"Einheitsmatrix"}),` stehen auf der
Diagonale `,e.jsx(n,{children:"n"})," Einsen, also ",e.jsx(n,{children:"\\tr(\\bI_n) = n"}),`. Zwei konkrete
Rechnungen (die Diagonalelemente sind grün markiert):`]}),e.jsx(t,{children:"\\tr\\begin{pmatrix} \\cgreen{1} & 2 \\\\ 3 & \\cgreen{4} \\end{pmatrix} = \\cgreen{1} + \\cgreen{4} = 5, \\qquad \\tr\\begin{pmatrix} \\cgreen{2} & -1 & 0 \\\\ 0 & \\cgreen{3} & 5 \\\\ 1 & 0 & \\cgreen{-2} \\end{pmatrix} = \\cgreen{2} + \\cgreen{3} + (\\cgreen{-2}) = 3."}),e.jsxs(i.p,{children:["Alle Einträge abseits der Diagonale sind für die Spur unsichtbar; die ",e.jsx(n,{children:"5"}),` im
zweiten Beispiel könnte genauso gut `,e.jsx(n,{children:"5000"})," sein."]})]}),`
`,e.jsxs(i.h3,{id:"sec-rechenregeln-und-zyklische-vertauschung",children:["3.1.2 ","Rechenregeln und zyklische Vertauschung"]}),`
`,e.jsx(i.p,{children:`Der eigentliche Wert der Spur liegt in ihren Rechenregeln. Sie machen aus der harmlosen
Diagonalsumme ein Werkzeug, mit dem sich viele Matrixausdrücke drastisch vereinfachen
lassen.`}),`
`,e.jsxs(g,{kind:"Satz",label:"3.1.4 (Eigenschaften der Spur)",id:"env-eigenschaften-der-spur",children:[e.jsxs(i.p,{children:["Für Matrizen ",e.jsx(n,{children:"\\bA, \\bB \\in \\R^{n \\times n}"}),`, invertierbares
`,e.jsx(n,{children:"\\bP \\in \\R^{n \\times n}"})," und ",e.jsx(n,{children:"c \\in \\R"})," gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Additiv:"})," ",e.jsx(n,{children:"\\tr(\\bA + \\bB) = \\tr(\\bA) + \\tr(\\bB)"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Homogen:"})," ",e.jsx(n,{children:"\\tr(c\\bA) = c \\cdot \\tr(\\bA)"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Zyklisch:"})," ",e.jsx(n,{children:"\\tr(\\bA\\bB) = \\tr(\\bB\\bA)"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Ähnlichkeitsinvariant:"})," ",e.jsx(n,{children:"\\tr(\\bP\\bA\\bP^{-1}) = \\tr(\\bA)"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Transpositionsinvariant:"})," ",e.jsx(n,{children:"\\tr(\\bA^\\top) = \\tr(\\bA)"})]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Die Eigenschaften 1, 2 und 5 folgen direkt aus der Definition: Addition und Skalierung
wirken eintragsweise, also insbesondere auf jedes Diagonalelement einzeln, und das
`,e.jsx(a,{id:"transpose",children:"Transponieren"}),` spiegelt die Matrix an der
Diagonale, wobei die Diagonalelemente selbst bleiben, wo sie sind. Interessant sind die
Eigenschaften 3 und 4. Ihr ausführlicher Beweis ist für den weiteren Kurs nicht
erforderlich.`]}),`
`,e.jsx(P,{title:"Beweis der Spur-Rechenregeln",children:e.jsxs(H,{children:[e.jsxs(p,{why:e.jsxs(e.Fragment,{children:["Definition der Spur; der Diagonaleintrag ",e.jsx(n,{children:"(\\bA\\bB)_{ii}"})," ist das ",e.jsx(a,{id:"dot-product",children:"Skalarprodukt"})," aus ",e.jsx(n,{children:"i"}),"-ter Zeile von ",e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"i"}),"-ter Spalte von ",e.jsx(n,{children:"\\bB"})," (",e.jsx(a,{id:"matrix-multiplication",children:"Matrixprodukt"}),")"]}),children:[e.jsx(i.p,{children:"Zu Eigenschaft 3: Wir schreiben beide Seiten als Doppelsumme aus."}),e.jsx(t,{children:"\\tr(\\bA\\bB) = \\sum_{i=1}^n (\\bA\\bB)_{ii} = \\sum_{i=1}^n \\sum_{k=1}^n \\cred{a_{ik}}\\,\\cblue{b_{ki}}"})]}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["endliche Summen dürfen wir vertauschen, und die Faktoren ",e.jsx(n,{children:"\\cred{a_{ik}}"}),", ",e.jsx(n,{children:"\\cblue{b_{ki}}"})," sind Skalare, kommutieren also"]}),children:e.jsx(t,{children:"= \\sum_{k=1}^n \\sum_{i=1}^n \\cblue{b_{ki}}\\,\\cred{a_{ik}} = \\sum_{k=1}^n (\\bB\\bA)_{kk} = \\tr(\\bB\\bA)"})}),e.jsxs(p,{why:e.jsxs(e.Fragment,{children:["Eigenschaft 3, angewendet auf die beiden Faktoren ",e.jsx(n,{children:"\\bP\\bA"})," und ",e.jsx(n,{children:"\\bP^{-1}"}),"; dann ",e.jsx(n,{children:"\\bP^{-1}\\bP = \\bI"})," (",e.jsx(a,{id:"matrix-inverse",children:"Inverse"}),")"]}),children:[e.jsx(i.p,{children:"Eigenschaft 4 ist damit ein Einzeiler:"}),e.jsx(t,{children:"\\tr(\\bP\\bA\\bP^{-1}) = \\tr\\left((\\bP\\bA)\\,\\bP^{-1}\\right) = \\tr\\left(\\bP^{-1}(\\bP\\bA)\\right) = \\tr(\\bA)."})]})]})}),`
`,e.jsxs(i.p,{children:["Eigenschaft 3 ist die ",e.jsx(i.em,{children:"wichtigste"}),` Eigenschaft der Spur. Wenden wir sie auf ein
Produkt aus drei Matrizen an (mit den Faktorpaaren
`,e.jsx(n,{children:"\\bA \\cdot (\\bB\\bC)"})," bzw. ",e.jsx(n,{children:"(\\bA\\bB) \\cdot \\bC"}),`), erhalten wir
die `,e.jsx(i.em,{children:"zyklische Vertauschung"}),":"]}),`
`,e.jsx(t,{children:"\\tr(\\bA\\bB\\bC) = \\tr(\\bB\\bC\\bA) = \\tr(\\bC\\bA\\bB)."}),`
`,e.jsx(i.p,{children:`Wir dürfen die Faktoren unter der Spur also „im Kreis herumschieben", so als stünden
sie auf einem Karussell: Die Reihenfolge im Kreis bleibt erhalten, nur der Startpunkt
wandert.`}),`
`,e.jsx(g,{kind:"Bemerkung",label:"3.1.5 (Vorsicht: Was die Spur nicht kann)",id:"env-vorsicht-was-die-spur-nicht-kann",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Die Spur ist ",e.jsx(i.em,{children:"nicht"})," multiplikativ: ",e.jsx(n,{children:"\\tr(\\bA\\bB) = \\tr(\\bB\\bA)"}),`,
aber `,e.jsx(n,{children:"\\tr(\\bA\\bB) \\neq \\tr(\\bA) \\cdot \\tr(\\bB)"}),`! Kleinstes
Gegenbeispiel: `,e.jsx(n,{children:"\\bA = \\bB = \\bI_2"}),`, denn
`,e.jsx(n,{children:"\\tr(\\bI_2 \\bI_2) = \\tr(\\bI_2) = 2"}),`, aber
`,e.jsx(n,{children:"\\tr(\\bI_2) \\cdot \\tr(\\bI_2) = 4"}),"."]}),`
`,e.jsxs(i.li,{children:["Erlaubt sind nur ",e.jsx(i.em,{children:"zyklische"}),` Vertauschungen, keine beliebigen: Im Allgemeinen
ist `,e.jsx(n,{children:"\\tr(\\bA\\bB\\bC) \\neq \\tr(\\bA\\bC\\bB)"}),`, weil sich die Umordnung
`,e.jsx(n,{children:"\\bA\\bC\\bB"}),` nicht durch Weiterdrehen aus
`,e.jsx(n,{children:"\\bA\\bB\\bC"})," erzeugen lässt."]}),`
`]})}),`
`,e.jsx(P,{title:"Anwendung: Freiheitsgrade in der linearen Regression",children:e.jsxs(g,{kind:"Beispiel",label:"3.1.6 (Zyklische Vertauschung in der Statistik)",id:"env-zyklische-vertauschung-in-der-statistik",children:[e.jsxs(i.p,{children:[`Ein Vorgeschmack darauf, warum die zyklische Vertauschung in der Statistik ein
Dauerbrenner ist: In der
`,e.jsx(a,{id:"linear-regression",children:"linearen Regression"}),` mit Designmatrix
`,e.jsx(n,{children:"\\bX \\in \\R^{n \\times p}"}),` (voller Spaltenrang) erzeugt die „Hutmatrix"
`,e.jsx(n,{children:"\\bH = \\bX(\\bX^\\top\\bX)^{-1}\\bX^\\top \\in \\R^{n \\times n}"}),` die
gefitteten Werte `,e.jsx(n,{children:"\\wh{\\by} = \\bH\\by"}),`. Ihre Spur zählt die effektiven
Parameter des Modells. Die zyklische Vertauschung berechnet sie, ohne dass wir
einen einzigen Eintrag der `,e.jsx(n,{children:"n \\times n"}),"-Matrix ",e.jsx(n,{children:"\\bH"})," kennen müssen:"]}),e.jsx(t,{children:"\\tr(\\bH) = \\tr\\left(\\cred{\\bX}\\,\\cblue{(\\bX^\\top\\bX)^{-1}\\bX^\\top}\\right) = \\tr\\left(\\cblue{(\\bX^\\top\\bX)^{-1}\\bX^\\top}\\,\\cred{\\bX}\\right) = \\tr(\\bI_p) = p."}),e.jsxs(i.p,{children:["Im zweiten Schritt haben wir den Faktor ",e.jsx(n,{children:"\\cred{\\bX}"}),` einmal im Kreis nach
hinten geschoben; dann kürzt sich `,e.jsx(n,{children:"(\\bX^\\top\\bX)^{-1}\\,\\bX^\\top\\bX"}),` zur
`,e.jsx(n,{children:"p \\times p"}),"-Einheitsmatrix."]})]})}),`
`,e.jsxs(i.h3,{id:"sec-spur-und-eigenwerte",children:["3.1.3 ","Spur und Eigenwerte"]}),`
`,e.jsxs(i.p,{children:[`Warum ist ausgerechnet die Diagonalsumme so invariant? Das folgende Resultat liefert die
tiefere Erklärung: Die Spur ist in Wahrheit eine Kennzahl der
`,e.jsx(a,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` – und die hängen nur
von der linearen Abbildung ab, nicht von der Basis, in der wir sie aufschreiben.`]}),`
`,e.jsxs(g,{kind:"Satz",label:"3.1.7 (Spur als Summe der Eigenwerte)",id:"env-spur-als-summe-der-eigenwerte",children:[e.jsxs(i.p,{children:["Für eine Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` mit Eigenwerten
`,e.jsx(n,{children:"\\lambda_1, \\ldots, \\lambda_n"})," gilt"]}),e.jsx(t,{children:"\\tr(\\bA) = \\sum_{i=1}^n \\lambda_i."})]}),`
`,e.jsx(P,{title:"Beweisskizze für diagonalisierbare Matrizen",children:e.jsxs(H,{children:[e.jsxs(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bA"})," diagonalisierbar heißt gerade: Es gibt eine Basis aus Eigenvektoren (Spalten von ",e.jsx(n,{children:"\\bP"}),"), und in dieser Basis ist die Abbildung eine ",e.jsx(a,{id:"diagonal-matrix",children:"Diagonalmatrix"})," mit den Eigenwerten auf der Diagonale"]}),children:[e.jsxs(i.p,{children:["Wir führen den Beweis für ",e.jsx(i.em,{children:"diagonalisierbare"})," ",e.jsx(n,{children:"\\bA"}),". Sei dazu"]}),e.jsx(t,{children:"\\bA = \\bP\\bD\\bP^{-1} \\quad \\text{mit} \\quad \\bD = \\diag(\\cblue{\\lambda_1}, \\ldots, \\cblue{\\lambda_n})"}),e.jsxs(i.p,{children:["eine Diagonalisierung von ",e.jsx(n,{children:"\\bA"}),"."]})]}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Ähnlichkeitsinvarianz der Spur (",e.jsx(i.a,{href:"#env-eigenschaften-der-spur",children:"Satz 3.1.4"}),", Eigenschaft 4): ",e.jsx(a,{id:"similar-matrices",children:"ähnliche Matrizen"})," haben dieselbe Spur"]}),children:e.jsx(t,{children:"\\tr(\\bA) = \\tr\\left(\\bP\\bD\\bP^{-1}\\right) = \\tr(\\bD)"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Definition der Spur: Die Diagonalelemente von ",e.jsx(n,{children:"\\bD"})," sind genau die Eigenwerte"]}),children:e.jsx(t,{children:"\\tr(\\bD) = \\sum_{i=1}^n \\cblue{\\lambda_i}."})})]})}),`
`,e.jsxs(i.p,{children:[`Der Satz gilt auch für nicht diagonalisierbare Matrizen; der allgemeine Beweis läuft über
einen Koeffizientenvergleich im charakteristischen Polynom
`,e.jsx(n,{children:"\\det(\\bA - \\lambda\\bI)"}),`
(`,e.jsx(a,{id:"determinant",children:"Determinante"}),`) und ist hier nicht unser Thema.
Zwei Feinheiten sind trotzdem erwähnenswert: Die Eigenwerte zählen wir mit ihrer
algebraischen Vielfachheit, und sie dürfen
`,e.jsx(a,{id:"complex-numbers",children:"komplex"}),` sein (eine reelle Matrix kann
komplexe Eigenwerte haben). Die treten dann aber immer als konjugierte Paare
`,e.jsx(n,{children:"a \\pm b\\,i"}),` auf, deren Imaginärteile sich in der Summe wegheben: Die Spur
bleibt reell, wie es sich für eine Summe reeller Diagonalelemente gehört.`]}),`
`,e.jsxs(oe,{title:"Was macht ein Eintrag neben der Diagonale mit Eigenwerten und Spur?",children:[e.jsxs(i.p,{children:[`Wie belastbar diese Aussage ist, merken wir erst, wenn wir an der Matrix rütteln. Verändern
wir einen Eintrag `,e.jsx(i.em,{children:"außerhalb"}),` der Diagonale: Was macht das mit den beiden Eigenwerten, und
was mit ihrer Summe?`]}),e.jsx(Gn,{}),e.jsx(i.p,{children:`Die Eigenwerte reagieren empfindlich. Ein kleiner Nebendiagonaleintrag schiebt sie
auseinander, lässt sie zusammenfallen oder hebt sie ganz aus der reellen Achse heraus; die
Spur bemerkt davon nichts, weil sie nur die Diagonale abliest. Auch im komplexen Fall bleibt
die Bilanz stehen: Die beiden Eigenwerte sind dann konjugiert, ihre Imaginärteile heben sich
in der Summe weg, und übrig bleiben zwei gleiche Realteile, zusammen wieder die Spur.`})]}),`
`,e.jsxs(i.h3,{id:"sec-die-frobenius-norm",children:["3.1.4 ","Die Frobenius-Norm"]}),`
`,e.jsxs(i.p,{children:[`Die Spur verdichtet eine Matrix zu einer Zahl, aber als Maß für die „Größe" einer Matrix
taugt sie nicht: Sie ignoriert alle Einträge abseits der Diagonale, kann negativ werden
und ist für rechteckige Matrizen gar nicht definiert. Für ein echtes Größenmaß liegt eine
andere Idee nahe: Wir behandeln die `,e.jsx(n,{children:"m \\cdot n"}),` Einträge der Matrix wie einen
langen Vektor und nehmen dessen
`,e.jsx(a,{id:"euclidean-norm",children:"euklidische Norm"}),"."]}),`
`,e.jsxs(g,{kind:"Definition",label:"3.1.8 (Frobenius-Norm)",id:"env-frobenius-norm",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Frobenius-Norm"})," einer Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," ist"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_F := \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2}."})]}),`
`,e.jsx(g,{kind:"Bemerkung",label:"3.1.9",id:"env-bemerkung-3-1-9",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`Die Frobenius-Norm ist das exakte Analogon zur euklidischen Vektornorm: Quadrieren,
aufsummieren, Wurzel ziehen, nur eben über alle `,e.jsx(n,{children:"m \\cdot n"}),` Einträge. Sie
ist insbesondere auch für rechteckige Matrizen definiert.`]}),`
`,e.jsxs(i.li,{children:["In der Literatur heißt sie auch ",e.jsx(i.em,{children:"Hilbert-Schmidt-Norm"}),"."]}),`
`,e.jsxs(i.li,{children:['Sie misst so etwas wie die „Größe" der Matrix. Ob sie das ',e.jsx(i.em,{children:"richtige"}),` Maß für
unsere Zwecke ist, klären wir im
`,e.jsx(i.a,{href:"#sec-3.2",children:"nächsten Abschnitt"}),"."]}),`
`]})}),`
`,e.jsxs(i.p,{children:[`Das folgende Resultat verknüpft die beiden Begriffe dieses Abschnitts: Die Frobenius-Norm
lässt sich vollständig durch die Spur ausdrücken. Damit stehen ihr alle Rechenregeln aus
`,e.jsx(i.a,{href:"#env-eigenschaften-der-spur",children:"Satz 3.1.4"})," zur Verfügung, insbesondere die zyklische Vertauschung."]}),`
`,e.jsxs(g,{kind:"Satz",label:"3.1.10 (Frobenius-Norm über die Spur)",id:"env-frobenius-norm-ueber-die-spur",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," gilt"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2} = \\sqrt{\\tr(\\bA^\\top\\bA)}."})]}),`
`,e.jsxs(H,{children:[e.jsxs(p,{why:e.jsxs(e.Fragment,{children:["Eintrag ",e.jsx(n,{children:"(j, k)"})," von ",e.jsx(n,{children:"\\bA^\\top\\bA"})," ist das Skalarprodukt aus ",e.jsx(n,{children:"j"}),"-ter Zeile von ",e.jsx(n,{children:"\\bA^\\top"})," (also ",e.jsx(n,{children:"j"}),"-ter ",e.jsx(i.em,{children:"Spalte"})," von ",e.jsx(n,{children:"\\bA"}),") und ",e.jsx(n,{children:"k"}),"-ter Spalte von ",e.jsx(n,{children:"\\bA"}),"; auf der Diagonale (",e.jsx(n,{children:"j = k"}),", grün) steht also jede Spalte im Skalarprodukt mit sich selbst"]}),children:[e.jsxs(i.p,{children:["Wir berechnen ",e.jsx(n,{children:"\\bA^\\top\\bA \\in \\R^{n \\times n}"})," eintragsweise:"]}),e.jsx(t,{children:"\\bA^\\top\\bA = \\begin{pmatrix} \\cgreen{\\sum_{i=1}^m a_{i1}^2} & \\sum_{i=1}^m a_{i1}a_{i2} & \\cdots \\\\ \\sum_{i=1}^m a_{i2}a_{i1} & \\cgreen{\\sum_{i=1}^m a_{i2}^2} & \\cdots \\\\ \\vdots & \\vdots & \\ddots \\end{pmatrix}"})]}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["die Spur summiert die grünen Diagonalelemente; zusammen durchlaufen die beiden Summen alle ",e.jsx(n,{children:"m \\cdot n"})," Einträge von ",e.jsx(n,{children:"\\bA"})," genau einmal"]}),children:e.jsx(t,{children:"\\quimpl \\tr(\\bA^\\top\\bA) = \\sum_{j=1}^n \\cgreen{\\sum_{i=1}^m a_{ij}^2} = \\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Wurzel ziehen auf beiden Seiten; ",e.jsx(i.a,{href:"#env-frobenius-norm",children:"Definition 3.1.8"})]}),children:e.jsx(t,{children:"\\quimpl \\sqrt{\\tr(\\bA^\\top\\bA)} = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2} = \\left\\| \\bA \\right\\|_F."})})]}),`
`,e.jsxs(i.p,{children:[`Diese Spur-Darstellung ist mehr als eine Kuriosität: Sie macht die Frobenius-Norm in
Rechnungen handhabbar, in denen die Doppelsumme unhandlich wäre. Ob die Frobenius-Norm
allerdings das misst, was wir bei der Fehleranalyse wirklich brauchen (nämlich wie stark
eine Matrix Vektoren verzerren kann), ist eine andere Frage. Ihr gehen wir im
`,e.jsx(i.a,{href:"#sec-3.2",children:"nächsten Abschnitt"}),` nach, wo wir den Begriff
der Matrixnorm systematisch entwickeln.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(we,{children:[e.jsxs(T,{wahr:!1,children:[e.jsx(i.p,{children:`Die Spur einer Matrix ändert sich, wenn wir einen Eintrag außerhalb der Diagonale
verändern.`}),e.jsxs(i.p,{children:["Die Spur summiert ausschließlich die Diagonalelemente (",e.jsx(i.a,{href:"#env-spur",children:"Definition 3.1.2"}),`). Die Eigenwerte
ändern sich dabei sehr wohl, ihre Summe aber nicht.`]})]}),e.jsxs(T,{wahr:!0,children:[e.jsx(i.p,{children:"Eine reelle Matrix mit komplexen Eigenwerten hat trotzdem eine reelle Spur."}),e.jsxs(i.p,{children:["Komplexe Eigenwerte reeller Matrizen treten als konjugierte Paare ",e.jsx(n,{children:"a \\pm b\\,i"}),` auf. In der
Summe heben sich die Imaginärteile weg, und `,e.jsx(i.a,{href:"#env-spur-als-summe-der-eigenwerte",children:"Satz 3.1.7"}),` liefert eine reelle Zahl, wie es die
Diagonalsumme verlangt.`]})]}),e.jsxs(ke,{loesung:4,toleranz:.001,children:[e.jsx(i.p,{children:`Stellen wir im Spur-Widget die Voreinstellung „defekt (Jordan)" ein. Welchen Wert zeigt die
Summe der Eigenwerte?`}),e.jsxs(i.p,{children:["Vier. Die Voreinstellung ist ",e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 0 & 2 \\end{smallmatrix}\\bigr)"}),`
mit dem doppelten Eigenwert `,e.jsx(n,{children:"2"}),". ",e.jsx(i.a,{href:"#env-spur-als-summe-der-eigenwerte",children:"Satz 3.1.7"}),` zählt Eigenwerte mit ihrer algebraischen
Vielfachheit, die Summe ist also `,e.jsx(n,{children:"2 + 2 = 4 = \\tr(\\bA)"})," und nicht ",e.jsx(n,{children:"2"}),`. Die Matrix ist dabei
nicht einmal diagonalisierbar; der Beweis aus dem Skript greift hier nicht, die Aussage gilt
trotzdem.`]})]})]})}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:"Vertiefung: Heath §2; MML §4.1."})})]})}function Zn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(an,{...r})}):an(r)}const ae=V.blau,dn=V.orange,de=V.rot;function Ye(r,i,s){return Number.isFinite(s)?Math.pow(Math.pow(Math.abs(r),s)+Math.pow(Math.abs(i),s),1/s):Math.max(Math.abs(r),Math.abs(i))}function Ie(r,i,s=240){const m=[];for(let h=0;h<=s;h++){const d=2*Math.PI*h/s,b=Math.cos(d),j=Math.sin(d),_=i/Ye(b,j,r);m.push([_*b,_*j])}return m}const he=(r,i=2)=>r.toFixed(i).replace(".","{,}").replace(/^-/,"−"),ne=320,X=3.2,Fn=ne/(2*X),se=1.5,L=r=>ne/2+r*Fn,O=r=>ne/2-r*Fn;function Cn({volumenZeigen:r}){const[i,s]=q.useState(2),[m,h]=q.useState(!1),[d,b]=q.useState(-1.2),[j,_]=q.useState(.9),[F,S]=q.useState({azimuth:38,elevation:22}),f=m?1/0:i,E=Ye(d,j,f),w=m?"\\infty":Number.isInteger(i)?String(i):he(i),u=Mn({feld:{x0:0,y0:0,w:ne,h:ne},welt:{x0:-X,x1:X,y0:-X,y1:X},clamp:([k,x])=>[pe(k,-se,se),pe(x,-se,se)],greifPosition:()=>[d,j],onDrag:([k,x])=>{b(Math.round(k*20)/20),_(Math.round(x*20)/20)}}),y=Ie(f,1),c=Ie(f,E),A=k=>k.map(([x,B])=>`${L(x).toFixed(1)},${O(B).toFixed(1)}`).join(" "),I=q.useMemo(()=>({f:(k,x)=>{if(!Number.isFinite(f))return Math.max(Math.abs(k),Math.abs(x))<=1?1:NaN;const B=1-Math.abs(k)**f-Math.abs(x)**f;if(!(B>0))return NaN;const R=Math.pow(B,1/f);return(f>1?(Math.max(Math.abs(k),Math.abs(x))/R)**(f-1):0)<3?R:NaN},nx:30,ny:30,color:ae,opacity:.8,wire:!1}),[f]),J=q.useMemo(()=>{const k=Ie(f,1,160).map(([B,R])=>[B,R,0]),x=B=>{const R=[];for(let Z=0;Z<=80;Z++){const Y=Math.PI*Z/80,G=Math.cos(Y),le=Math.sin(Y),M=1/Ye(G,le,f);R.push(B?[M*G,0,M*le]:[0,M*G,M*le])}return R};return[{pts:k,color:ae,width:2,onTop:!0},{pts:x(!0),color:ae,width:1.4},{pts:x(!1),color:ae,width:1.4}]},[f]),Q=q.useMemo(()=>[{from:[0,0,0],to:[d,j,0],color:de,label:"x",onTop:!0}],[d,j]),z=!m&&i<1,o=m?"Würfel im Raum, Quadrat in der Ebene":i<1?"nach innen gebeulter Stern":Math.abs(i-1)<.03?"Oktaeder im Raum, Raute in der Ebene":Math.abs(i-2)<.03?"Kugel im Raum, Kreis in der Ebene":i<2?"zwischen Raute und Kreis":"zwischen Kreis und Quadrat";return e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs(xe,{children:["Ziehen wir ",e.jsx(n,{children:"\\bx"})," im Bild umher und schieben wir danach ",e.jsx(n,{children:"p"})," von 0,5 bis 6 durch."]}),e.jsxs("p",{className:`max-w-prose text-xs ${U}`,children:[e.jsx("span",{style:{color:ae},children:"blau"})," die Einheitskugel"," ",e.jsx(n,{children:"\\{\\bx : \\|\\bx\\|_p = 1\\}"}),","," ",e.jsx("span",{style:{color:dn},children:"orange gestrichelt"})," dieselbe Kugel, skaliert mit"," ",e.jsx(n,{children:"\\|\\bx\\|_p"}),", ",e.jsx("span",{style:{color:de},children:"rot"})," der Vektor"," ",e.jsx(n,{children:"\\bx"}),"."]}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsxs("svg",{viewBox:`0 0 ${ne} ${ne}`,width:ne,height:ne,className:"max-w-full h-auto rounded",role:"img","aria-label":`Einheitskugel der p-Norm in der Ebene, aktuell ein ${o}; der Vektor x hat die Norm ${l(E,2)}.`,...u.svgProps,style:{...u.svgProps.style,background:"var(--w-bg)",border:"1px solid var(--w-border)"},children:[e.jsx("defs",{children:e.jsx("marker",{id:"s32-ub-arrow",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse",children:e.jsx("path",{d:"M 0 0 L 10 5 L 0 10 z",fill:de})})}),e.jsx("line",{x1:L(-X),y1:O(0),x2:L(X),y2:O(0),stroke:"var(--w-axis)"}),e.jsx("line",{x1:L(0),y1:O(-X),x2:L(0),y2:O(X),stroke:"var(--w-axis)"}),[-3,-2,-1,1,2,3].map(k=>e.jsxs("g",{children:[e.jsx("line",{x1:L(k),y1:O(0)-3,x2:L(k),y2:O(0)+3,stroke:"var(--w-grid-strong)"}),e.jsx("line",{x1:L(0)-3,y1:O(k),x2:L(0)+3,y2:O(k),stroke:"var(--w-grid-strong)"}),k>0&&e.jsx("text",{x:L(k),y:O(0)+14,fontSize:"10",fill:"var(--w-muted)",textAnchor:"middle",children:k})]},`ubt${k}`)),e.jsx("text",{x:L(X)-16,y:O(0)-6,fontSize:"11",fill:"var(--w-muted)",fontStyle:"italic",children:"x₁"}),e.jsx("text",{x:L(0)+6,y:O(X)+12,fontSize:"11",fill:"var(--w-muted)",fontStyle:"italic",children:"x₂"}),e.jsx("polygon",{points:A(y),fill:"none",stroke:ae,strokeWidth:"2"}),E>1e-9&&e.jsx("polygon",{points:A(c),fill:"none",stroke:dn,strokeWidth:"1.6",strokeDasharray:"5 4"}),e.jsx("line",{x1:L(0),y1:O(0),x2:L(d),y2:O(j),stroke:de,strokeWidth:"2.2",markerEnd:"url(#s32-ub-arrow)"}),e.jsx(Nn,{x:L(d),y:O(j),r:5,farbe:de,aktiv:u.dragging==="x",...u.handleProps("x")})]}),e.jsxs("div",{className:"mt-2 space-y-1",children:[e.jsx(ie,{label:"p",value:i,onChange:s,min:.5,max:6,step:.05,disabled:m,accent:ae}),e.jsxs("label",{className:"my-1 flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:m,onChange:k=>h(k.target.checked),className:"accent-sky-600"}),e.jsxs("span",{children:[e.jsx(n,{children:"p = \\infty"})," verwenden"]})]}),e.jsx(ie,{label:"x₁",value:d,onChange:b,min:-se,max:se,step:.05,accent:de}),e.jsx(ie,{label:"x₂",value:j,onChange:_,min:-se,max:se,step:.05,accent:de})]})]}),e.jsxs("div",{className:"min-w-0 shrink-0",children:[e.jsx(Wn,{size:260,xDomain:[-1.3,1.3],yDomain:[-1.3,1.3],zDomain:[0,1],surface:I,curves:J,arrows:Q,labels:{x:"x₁",y:"x₂",z:"x₃"},azimuth:F.azimuth,elevation:F.elevation,onViewChange:S,ariaLabel:`Obere Hälfte der Einheitskugel im Raum für den aktuellen Exponenten: ${o}.`}),e.jsx("div",{className:"mt-1 max-w-[260px]",children:e.jsx(Rn,{value:F,onChange:S})}),e.jsxs("p",{className:`mt-1 max-w-[260px] text-xs ${U}`,children:["Dieselbe Einheitskugel im ",e.jsx(n,{children:"\\R^3"}),", obere Hälfte. Ihr Schnitt mit dem Boden ist genau die blaue Kurve links, der rote Pfeil derselbe Vektor. Ziehen dreht die Ansicht."]})]})]}),e.jsx(me,{kind:z?"fail":"ok",titel:`${o}.`,children:z?e.jsxs(e.Fragment,{children:["Für ",e.jsx(n,{children:"p < 1"}),' beult sich die „Kugel" nach innen, und mit der Konvexität fällt die Dreiecksungleichung: Hier ist'," ",e.jsx(n,{children:`\\left\\| \\be_1 + \\be_2 \\right\\|_{${he(i)}} = 2^{1/${he(i)}} = ${he(Math.pow(2,1/i))} > 2 = \\left\\| \\be_1 \\right\\|_{${he(i)}} + \\left\\| \\be_2 \\right\\|_{${he(i)}}`}),". Genau das fordert das dritte Normaxiom (für Matrizen steht es in ",v("definition:matrixnorm"),", für Vektoren lautet es wörtlich gleich); die ",e.jsx(n,{children:"\\,p"}),"-Normen sind deshalb nur für ",e.jsx(n,{children:"p \\ge 1"})," erklärt."]}):e.jsxs(e.Fragment,{children:[e.jsx(n,{children:`\\|\\bx\\|_{${w}} = ${he(E,3)}`}),": Um genau diesen Faktor aufgeblasen läuft die Einheitskugel durch die Spitze von ",e.jsx(n,{children:"\\bx"}),". Für ",e.jsx(n,{children:"p \\ge 1"})," ist sie konvex, und diese Konvexität ist das geometrische Gesicht der Dreiecksungleichung, also des dritten Normaxioms (",v("definition:matrixnorm"),").",r&&e.jsxs(e.Fragment,{children:[" ","Im ",e.jsx(n,{children:"\\R^3"})," haben die drei Standardkugeln die Volumina 4/3 ≈ 1,33 (Oktaeder), 4π/3 ≈ 4,19 (Kugel) und 8 (Würfel): Der Würfel ist genau 6-mal so voluminös wie das Oktaeder, im ",e.jsx(n,{children:"\\R^n"})," sogar ",e.jsx(n,{children:"n!"}),"-mal. So weit liegen dieselben drei Normen auseinander, sobald die Dimension wächst."]})]})})]})}function Tn(){return e.jsx(yn,{frage:"Im Raum ist die Einheitskugel der Maximumsnorm ein Würfel, die der Summennorm ein Oktaeder. Um welchen Faktor ist der Würfel voluminöser?",variante:"auswahl",loesung:"sechs",optionen:[{id:"zwei",text:"etwa 2-mal"},{id:"sechs",text:"etwa 6-mal"},{id:"zwanzig",text:"etwa 20-mal"}],children:({aufgeloest:r})=>e.jsx(Cn,{volumenZeigen:r})})}function ce(r){return String(parseFloat(r.toFixed(4))).replace(".","{,}").replace(/^-/,"−")}const Hn=V.blau,Un=V.orange,Xn=V.violett,Pe=[{name:"A₁ (Identität)",titel:"lässt jeden Vektor unverändert",m:[[1,0],[0,1]]},{name:"A₂ (Vertauschung)",titel:"Spiegelung an der Winkelhalbierenden",m:[[0,1],[1,0]]},{name:"A₃ (√2-Streckung)",titel:"singulär: staucht die Ebene auf eine Gerade",m:[[Math.SQRT2,0],[0,0]]},{name:"Beispielmatrix",titel:"eine Matrix ohne besondere Struktur",m:[[1,-2],[3,4]]}],hn=(r,i)=>r.every((s,m)=>s.every((h,d)=>Math.abs(h-i[m][d])<1e-9));function Jn(){const[r,i]=q.useState(Pe[0].m.map(c=>[...c])),[s,m]=q.useState(0),h=[r[0][0],r[1][0],r[0][1],r[1][1]],d=Math.hypot(...h),b=h.reduce((c,A)=>c+Math.abs(A),0),j=Math.max(...h.map(c=>Math.abs(c))),_=h.map(c=>`(${ce(c)})^2`).join(" + "),F=h.map(c=>`\\left|${ce(c)}\\right|`).join(" + "),S=h.map(c=>`\\left|${ce(c)}\\right|`).join(",\\, "),f=h.map(c=>ce(c)).join(",\\, "),E=c=>{i(c.map(A=>[...A])),m(0)},w=()=>{i([[r[1][1],r[1][0]],[r[0][0],r[0][1]]]),m(c=>c+1)},u=Pe.slice(0,3).some(c=>hn(c.m,r)),y=Math.abs(r[0][0]*r[1][1]-r[0][1]*r[1][0])<1e-9;return e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs(xe,{children:["Klicken wir die drei Matrizen ",e.jsx(n,{children:"\\bA_1, \\bA_2, \\bA_3"})," durch und tauschen wir danach die Einträge einer beliebigen Matrix durch."]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[Pe.map(c=>{const A=hn(c.m,r);return e.jsx("button",{type:"button",title:c.titel,"aria-pressed":A,className:`text-xs ${A?Ne:te}`,onClick:()=>E(c.m),children:c.name},c.name)}),e.jsx("button",{type:"button",className:`text-xs ${te}`,onClick:w,children:"Einträge durchtauschen"})]}),e.jsxs("div",{className:"my-2 flex flex-wrap items-center gap-3",children:[e.jsx(n,{children:"\\bA = "}),e.jsx(fe,{value:r,onChange:E,step:.1}),e.jsx(n,{children:`\\quimpl \\vec(\\bA) = (${f})^\\top`})]}),e.jsx(t,{children:`\\cblue{\\left\\| \\bA \\right\\|_F} = \\left\\| \\vec(\\bA) \\right\\|_2 = \\sqrt{${_}} = \\cblue{${ce(d)}}`}),e.jsx(t,{children:`\\corange{\\left\\| \\bA \\right\\|_S} = \\left\\| \\vec(\\bA) \\right\\|_1 = ${F} = \\corange{${ce(b)}}`}),e.jsx(t,{children:`\\cpurp{\\left\\| \\bA \\right\\|_M} = \\left\\| \\vec(\\bA) \\right\\|_\\infty = \\max\\left\\{ ${S} \\right\\} = \\cpurp{${ce(j)}}`}),e.jsxs("p",{className:`text-xs ${U}`,children:[e.jsx("span",{style:{color:Hn},children:"blau"})," Frobenius-Norm,"," ",e.jsx("span",{style:{color:Un},children:"orange"})," Summennorm,"," ",e.jsx("span",{style:{color:Xn},children:"violett"})," Maximumsnorm."]}),e.jsx(me,{kind:s>0?"warn":u?"ok":"neutral",children:s>0?e.jsxs(e.Fragment,{children:["Nach ",s===1?"einem Tausch":`${l(s,0)} Tauschvorgängen`," stehen dieselben vier Zahlen an anderen Plätzen. Alle drei Normen sind unverändert (",l(d,3)," / ",l(b,3)," / ",l(j,3),"), die Determinante ist inzwischen"," ",l(r[0][0]*r[1][1]-r[0][1]*r[1][0],3),": Als Abbildung ist das eine andere Matrix, für die Vektorisierungsnormen dieselbe. Genau diese Blindheit führt in"," ",e.jsx("a",{className:"underline",href:"#sec-3.3",children:v("sec:matrix-spur-norm/operatornormen")})," ","zu den Operatornormen."]}):u?e.jsxs(e.Fragment,{children:["Frobenius-Norm ",l(d,3)," = √2, derselbe Wert wie für die beiden anderen Voreinstellungen aus ",v("beispiel:gleiche-frobenius-norm-voellig"),", obwohl ",e.jsx(n,{children:"\\bA_1"})," nichts verändert,"," ",e.jsx(n,{children:"\\bA_2"})," spiegelt und ",e.jsx(n,{children:"\\bA_3"})," eine ganze Dimension vernichtet. Nur Summen- und Maximumsnorm trennen wenigstens ",e.jsx(n,{children:"\\bA_3"})," von den beiden anderen, und auch das eher zufällig."]}):e.jsxs(e.Fragment,{children:["Die drei Normen lesen dieselben vier Zahlen verschieden: ",l(d,3)," (quadratisch gemittelt), ",l(b,3)," (alles aufaddiert), ",l(j,3)," (nur der größte Betrag).",y?" Diese Matrix ist singulär, sie drückt die Ebene auf eine Gerade; keine der drei Zahlen verrät das.":" Wohin die Matrix Vektoren schickt, verrät keine der drei Zahlen."]})})]})}function cn(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-3.1",children:"Abschnitt 3.1"}),` haben wir mit der
Frobenius-Norm bereits eine erste Möglichkeit kennengelernt, die „Größe" einer Matrix in
einer einzigen Zahl zusammenzufassen. In diesem Abschnitt gehen wir das Thema
grundsätzlicher an: Wir legen axiomatisch fest, was eine Matrixnorm überhaupt ist,
konstruieren eine ganze Familie von Beispielen und entdecken dann, dass diese
naheliegenden Normen einen blinden Fleck haben. Das motiviert die Operatornormen des
`,e.jsx(i.a,{href:"#sec-3.3",children:"nächsten Abschnitts"}),"."]}),`
`,e.jsxs(i.h3,{id:"sec-warum-matrixnormen",children:["3.2.1 ","Warum Matrixnormen?"]}),`
`,e.jsxs(i.p,{children:["Für Vektoren sind ",e.jsx(a,{id:"norm",children:"Normen"}),` unser wichtigstes
Messinstrument: Sie machen aus einem Fehler`,e.jsx(i.em,{children:"vektor"})," eine Fehler",e.jsx(i.em,{children:"größe"}),`,
mit der wir rechnen und argumentieren können. Dasselbe brauchen wir für Matrizen, und
zwar aus vier konkreten Anlässen:`]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:'die „Größe" einer Matrix messen, analog zur Länge eines Vektors;'}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Fehler"}),` quantifizieren: Wie weit liegt eine mit
`,e.jsx(a,{id:"rounding-error",children:"Rundungsfehlern"}),` gespeicherte oder
näherungsweise berechnete Matrix von der exakten entfernt?`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Konvergenz"}),` von Algorithmen analysieren: Iterative Verfahren erzeugen Folgen
von Matrizen oder Vektoren, und die Aussage „`,e.jsx(n,{children:"\\bA_k \\to \\bA"}),`" braucht ein
Abstandsmaß (`,e.jsx(a,{id:"convergence",children:"Konvergenz"}),");"]}),`
`,e.jsxs(i.li,{children:["die ",e.jsx(i.em,{children:"Konditionierung"}),` von Problemen verstehen: Die
`,e.jsx(a,{id:"condition-number",children:"Konditionszahl"}),` einer Matrix wird
über Matrixnormen definiert.`]}),`
`]}),`
`,e.jsxs(i.p,{children:[`Frischen wir zunächst das Vorwissen auf. Für Vektoren kennen wir neben der
`,e.jsx(a,{id:"euclidean-norm",children:"euklidischen Norm"})," ",e.jsx(n,{children:"\\|\\bx\\|_2"})," die ganze Familie der ",e.jsx(n,{children:"p"}),`-Normen, und ihr
„Aussehen" lässt sich am besten über ihre Einheitskugeln
`,e.jsx(n,{children:"\\{\\bx : \\|\\bx\\|_p = 1\\}"})," vergleichen: Raute, Kreis, Quadrat."]}),`
`,e.jsxs(oe,{title:"Auffrischung: Was misst die Norm an der Einheitskugel?",children:[e.jsxs(i.p,{children:[`Bevor wir weiterlesen, lohnt ein Blick auf diese Formen, und zwar auf die Frage, was sie mit
der `,e.jsx(i.em,{children:"Zahl"})," ",e.jsx(n,{children:"\\|\\bx\\|_p"})," zu tun haben."]}),e.jsx(Tn,{}),e.jsxs(i.p,{children:[`Die Norm eines Vektors ist damit ablesbar geworden: Sie ist der Faktor, mit dem wir die
Einheitskugel aufblasen müssen, damit ihr Rand durch die Spitze von `,e.jsx(n,{children:"\\bx"}),` läuft. Für
`,e.jsx(n,{children:"p \\ge 1"}),` ist diese Kugel konvex, und die Konvexität ist nichts anderes als die
Dreiecksungleichung in geometrischer Gestalt.`]})]}),`
`,e.jsx(i.p,{children:`Diese Denkfigur nehmen wir mit: Auch bei Matrixnormen werden wir gleich fragen, welche
Menge eine Norm zur „Einheitskugel" erklärt.`}),`
`,e.jsxs(i.h3,{id:"sec-die-axiome",children:["3.2.2 ","Die Axiome"]}),`
`,e.jsx(i.p,{children:`Was macht eine Funktion auf Matrizen zu einer „Norm"? Dieselben drei Forderungen, die
wir schon von Vektornormen kennen:`}),`
`,e.jsxs(g,{kind:"Definition",label:"3.2.1 (Matrixnorm)",id:"env-matrixnorm",children:[e.jsxs(i.p,{children:["Eine Funktion ",e.jsx(n,{children:"\\|\\cdot\\| : \\R^{m \\times n} \\to [0, \\infty)"}),` heißt
`,e.jsx(i.em,{children:"Matrixnorm"}),", wenn für alle ",e.jsx(n,{children:"\\bA, \\bB \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"c \\in \\R"})," gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Definitheit"}),": ",e.jsx(n,{children:"\\|\\bA\\| = 0 \\iff \\bA = \\bnull"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"absolute Homogenität"}),": ",e.jsx(n,{children:"\\|c\\bA\\| = |c| \\cdot \\|\\bA\\|"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Dreiecksungleichung"}),": ",e.jsx(n,{children:"\\|\\bA + \\bB\\| \\le \\|\\bA\\| + \\|\\bB\\|"})]}),`
`]})]}),`
`,e.jsx(g,{kind:"Bemerkung",label:"3.2.2",id:"env-bemerkung-3-2-2",children:e.jsxs(i.p,{children:[`Das sind exakt die Axiome einer Vektornorm, und das ist kein Zufall: Die Menge
`,e.jsx(n,{children:"\\R^{m \\times n}"}),` ist ein
`,e.jsx(a,{id:"vector-space",children:"Vektorraum"}),` (der Dimension
`,e.jsx(n,{children:"mn"}),`), und eine Matrixnorm ist schlicht eine Norm auf diesem Raum.
Umgekehrt ist jede Vektornorm eine Matrixnorm auf dem Raum
`,e.jsx(n,{children:"\\R^{n \\times 1}"}),` der einspaltigen Matrizen. Was eine Matrixnorm über
diese Grundaxiome hinaus leisten `,e.jsx(i.em,{children:"sollte"}),` (etwa gut mit dem Matrixprodukt
zusammenzuspielen), untersuchen wir in
`,e.jsx(i.a,{href:"#sec-3.5",children:"Abschnitt 3.5"}),"."]})}),`
`,e.jsxs(i.h3,{id:"sec-matrixnormen-durch-vektorisierung",children:["3.2.3 ","Matrixnormen durch Vektorisierung"]}),`
`,e.jsx(i.p,{children:`Wie kommen wir am schnellsten an Matrixnormen? Mit einem einfachen Rezept: Wir rollen
die Matrix zu einem langen Vektor aus und wenden darauf eine Vektornorm an, die wir
schon kennen.`}),`
`,e.jsxs(g,{kind:"Definition",label:"3.2.3 (Vektorisierung)",id:"env-matrixnormen-vektorisierung",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Vektorisierung"})," einer Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),`
stapelt ihre Spalten zu einem Vektor der Länge `,e.jsx(n,{children:"mn"}),":"]}),e.jsx(t,{children:"\\vec(\\bA) = \\left(a_{11}, \\ldots, a_{m1},\\; a_{12}, \\ldots, a_{m2},\\; \\ldots,\\; a_{1n}, \\ldots, a_{mn}\\right)^\\top \\in \\R^{mn}."})]}),`
`,e.jsxs(i.p,{children:[`Dass dieses Rezept wirklich immer eine Matrixnorm liefert, ist einfach zu sehen: Die
Vektorisierung sortiert die Einträge ja nur um, und damit erbt
`,e.jsx(n,{children:"\\bA \\mapsto \\left\\| \\vec(\\bA) \\right\\|"})," alle drei Axiome von der Vektornorm."]}),`
`,e.jsxs(P,{title:"Warum jede Vektornorm auf diesem Weg eine Matrixnorm liefert",children:[e.jsxs(g,{kind:"Satz",label:"3.2.4",id:"env-satz-3-2-4",children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\|\\cdot\\|"})," eine Vektornorm auf ",e.jsx(n,{children:"\\R^{mn}"}),", so ist"]}),e.jsx(t,{children:"\\bA \\mapsto \\left\\| \\vec(\\bA) \\right\\|"}),e.jsxs(i.p,{children:["eine Matrixnorm auf ",e.jsx(n,{children:"\\R^{m \\times n}"}),"."]})]}),e.jsxs(H,{children:[e.jsxs(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\vec"})," sortiert die Einträge nur um: Jeder Eintrag von ",e.jsx(n,{children:"\\bA"})," landet an genau einer Position des langen Vektors, Addition und Skalarmultiplikation wirken eintragsweise"]}),children:[e.jsxs(i.p,{children:["Die Abbildung ",e.jsx(n,{children:"\\vec : \\R^{m \\times n} \\to \\R^{mn}"}),` ist
`,e.jsx(a,{id:"linear-map",children:"linear"})," und bijektiv:"]}),e.jsx(t,{children:"\\begin{gathered} \\vec(\\bA + \\bB) = \\vec(\\bA) + \\vec(\\bB), \\qquad \\vec(c\\bA) = c \\, \\vec(\\bA), \\\\ \\vec(\\bA) = \\bnull \\quequiv \\bA = \\bnull. \\end{gathered}"})]}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Definitheit der Vektornorm auf ",e.jsx(n,{children:"\\R^{mn}"}),", dann die letzte Äquivalenz aus dem vorigen Schritt"]}),children:e.jsx(t,{children:"\\left\\| \\vec(\\bA) \\right\\| = 0 \\quequiv \\vec(\\bA) = \\bnull \\quequiv \\bA = \\bnull."})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["erst Linearität von ",e.jsx(n,{children:"\\vec"}),", dann absolute Homogenität der Vektornorm"]}),children:e.jsx(t,{children:"\\left\\| \\vec(c\\bA) \\right\\| = \\left\\| c \\, \\vec(\\bA) \\right\\| = |c| \\cdot \\left\\| \\vec(\\bA) \\right\\|."})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["erst Additivität von ",e.jsx(n,{children:"\\vec"}),", dann Dreiecksungleichung der Vektornorm"]}),children:e.jsx(t,{children:"\\left\\| \\vec(\\bA + \\bB) \\right\\| = \\left\\| \\vec(\\bA) + \\vec(\\bB) \\right\\| \\le \\left\\| \\vec(\\bA) \\right\\| + \\left\\| \\vec(\\bB) \\right\\|."})})]})]}),`
`,e.jsx(i.p,{children:`Die drei wichtigsten Vertreter dieser Bauart entstehen aus den drei vertrauten
Vektornormen:`}),`
`,e.jsx(g,{kind:"Beispiel",label:"3.2.5 (Vektorisierungsnormen)",id:"env-vektorisierungsnormen",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Frobenius-Norm"})," (aus der ",e.jsx(n,{children:"2"}),"-Norm):"]}),`
`,e.jsx(t,{children:"\\cblue{\\left\\| \\bA \\right\\|_F} = \\left\\| \\vec(\\bA) \\right\\|_2 = \\sqrt{\\sum_{i,j} a_{ij}^2}"}),`
`,e.jsxs(i.p,{children:[`Das stimmt mit der Definition aus
`,e.jsx(i.a,{href:"#sec-3.1",children:"Abschnitt 3.1"}),` überein, wo wir außerdem
`,e.jsx(n,{children:"\\cblue{\\left\\| \\bA \\right\\|_F} = \\sqrt{\\tr(\\bA^\\top\\bA)}"}),`
gezeigt haben.`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Summennorm"})," (aus der ",e.jsx(n,{children:"1"}),"-Norm):"]}),`
`,e.jsx(t,{children:"\\corange{\\left\\| \\bA \\right\\|_S} = \\left\\| \\vec(\\bA) \\right\\|_1 = \\sum_{i,j} \\left| a_{ij} \\right|"}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Maximumsnorm"})," (aus der ",e.jsx(n,{children:"\\infty"}),"-Norm):"]}),`
`,e.jsx(t,{children:"\\cpurp{\\left\\| \\bA \\right\\|_M} = \\left\\| \\vec(\\bA) \\right\\|_\\infty = \\max_{i,j} \\left| a_{ij} \\right|"}),`
`]}),`
`]})}),`
`,e.jsxs(oe,{title:"Frobenius-, Summen- und Maximumsnorm: was sehen sie, was nicht?",children:[e.jsx(i.p,{children:`Diese drei Normen sind schnell hingeschrieben. Aber leisten sie auch, was wir von einem
Größenmaß erwarten? Prüfen wir das an einer Frage, die wir gleich brauchen werden: Können
zwei Matrizen, die als Abbildung nichts miteinander zu tun haben, in allen drei Normen
denselben Wert haben?`}),e.jsx(Jn,{}),e.jsx(i.p,{children:`Der Tauschknopf beantwortet die Frage: Verschieben wir die vier Einträge auf andere
Plätze, bleibt jede der drei Zahlen stehen, während aus der Identität etwa eine singuläre
Matrix wird. Alle drei Normen sehen nur die Multimenge der Einträge, nicht ihre Anordnung.`})]}),`
`,e.jsxs(i.h3,{id:"sec-was-elementweise-normen-nicht-sehen",children:["3.2.4 ","Was elementweise Normen nicht sehen"]}),`
`,e.jsxs(i.p,{children:[`Diese Vektorisierungsnormen sind billig zu berechnen und erfüllen alle Axiome. Trotzdem
haben sie einen konzeptionellen Haken: Sie behandeln die Matrix wie einen langen
Vektor; jede Umordnung der Einträge lässt die Norm unverändert. Eine Matrix ist aber
mehr als eine Tabelle von Zahlen: Sie repräsentiert die
`,e.jsx(a,{id:"linear-transformation",children:"lineare Abbildung"}),`
`,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx"}),`, und von dieser Abbildung wissen die elementweisen
Normen nichts. Ihnen fehlt damit auch eine direkte geometrische Interpretation: Was
genau `,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_F = 5"})," über die Wirkung von ",e.jsx(n,{children:"\\bA"}),`
auf Vektoren aussagt, bleibt unklar. Wie drastisch das schiefgehen kann, zeigt das
folgende Beispiel.`]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.2.6 (Gleiche Frobenius-Norm, völlig verschiedene Abbildungen)",id:"env-gleiche-frobenius-norm-voellig",children:[e.jsx(i.p,{children:"Betrachten wir die drei Matrizen"}),e.jsx(t,{children:"\\cred{\\bA_1} = \\cred{\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}}, \\qquad \\cblue{\\bA_2} = \\cblue{\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}}, \\qquad \\cgreen{\\bA_3} = \\cgreen{\\begin{pmatrix} \\sqrt{2} & 0 \\\\ 0 & 0 \\end{pmatrix}}."}),e.jsx(i.p,{children:"Ihre Frobenius-Normen rechnen wir direkt aus:"}),e.jsx(t,{children:"\\left\\| \\cred{\\bA_1} \\right\\|_F = \\sqrt{\\cred{1}^2 + 0^2 + 0^2 + \\cred{1}^2} = \\sqrt{2}, \\qquad \\left\\| \\cblue{\\bA_2} \\right\\|_F = \\sqrt{0^2 + \\cblue{1}^2 + \\cblue{1}^2 + 0^2} = \\sqrt{2},"}),e.jsx(t,{children:"\\left\\| \\cgreen{\\bA_3} \\right\\|_F = \\sqrt{\\left(\\cgreen{\\sqrt{2}}\\right)^2 + 0^2 + 0^2 + 0^2} = \\sqrt{2}."}),e.jsxs(i.p,{children:["Alle drei Matrizen haben also ",e.jsx(i.em,{children:"dieselbe"}),` Frobenius-Norm
`,e.jsx(n,{children:"\\sqrt{2}"}),`. Als Abbildungen könnten sie kaum unterschiedlicher sein.
Verfolgen wir den Vektor `,e.jsx(n,{children:"\\bx = (1, 0)^\\top"}),":"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cred{\\bA_1}\\bx = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\bx"}),`:
Die `,e.jsx(a,{id:"identity-matrix",children:"Identität"}),` lässt
`,e.jsx(i.em,{children:"jeden"})," Vektor unverändert."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cblue{\\bA_2}\\bx = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}"}),`: Die
`,e.jsx(a,{id:"permutation-matrix",children:"Permutationsmatrix"}),`
`,e.jsx(n,{children:"\\cblue{\\bA_2}"}),` vertauscht die beiden Koordinaten. Geometrisch ist das
eine `,e.jsx(a,{id:"reflection",children:"Spiegelung"}),` an der
Winkelhalbierenden `,e.jsx(n,{children:"x_2 = x_1"}),` (keine Drehung: es gilt
`,e.jsx(n,{children:"\\det \\cblue{\\bA_2} = -1"}),`, siehe
`,e.jsx(a,{id:"determinant",children:"Determinante"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cgreen{\\bA_3}\\bx = \\begin{pmatrix} \\sqrt{2} \\\\ 0 \\end{pmatrix}"}),`:
`,e.jsx(n,{children:"\\cgreen{\\bA_3}"}),` streckt die erste Koordinate um den Faktor
`,e.jsx(n,{children:"\\sqrt{2}"}),` und löscht die zweite komplett:
`,e.jsx(n,{children:"\\cgreen{\\bA_3}(0,1)^\\top = \\bnull"}),`. Diese Matrix ist singulär (nicht
`,e.jsx(a,{id:"matrix-inverse",children:"invertierbar"}),`); sie kollabiert die
ganze Ebene auf die `,e.jsx(n,{children:"x_1"}),"-Achse."]}),`
`]}),e.jsx(i.p,{children:`Zwei längentreue Abbildungen und eine, die eine ganze Dimension vernichtet – und die
Frobenius-Norm kann sie nicht auseinanderhalten.`})]}),`
`,e.jsx(i.p,{children:`Dasselbe Problem zeigt sich aus einer zweiten Richtung, wenn wir die Dimension wachsen
lassen:`}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.2.7 (Identität in wachsender Dimension)",id:"env-identitaet-in-wachsender-dimension",children:[e.jsxs(i.p,{children:["Für die Identitätsmatrix ",e.jsx(n,{children:"\\bI_n \\in \\R^{n \\times n}"})," (mit ",e.jsx(n,{children:"n"}),`
Einsen auf der Diagonale und sonst Nullen) liefern die drei Vektorisierungsnormen`]}),e.jsx(t,{children:"\\cblue{\\left\\| \\bI_n \\right\\|_F} = \\sqrt{\\underbrace{1 + \\cdots + 1}_{n}} = \\cblue{\\sqrt{n}}, \\qquad \\corange{\\left\\| \\bI_n \\right\\|_S} = \\corange{n}, \\qquad \\cpurp{\\left\\| \\bI_n \\right\\|_M} = \\cpurp{1}."}),e.jsxs(i.p,{children:["Die Abbildung ",e.jsx(n,{children:"\\bx \\mapsto \\bI_n\\bx = \\bx"}),` ändert überhaupt nichts,
trotzdem wachsen Frobenius- und Summennorm mit `,e.jsx(n,{children:"n"})," über alle Grenzen."]})]}),`
`,e.jsxs(i.p,{children:["Eine Norm, die die Matrix als ",e.jsx(i.em,{children:"Abbildung"}),` misst, sollte der Identität den Wert
`,e.jsx(n,{children:"1"}),` geben, unabhängig von der Dimension. Die Maximumsnorm trifft diesen Wert
hier zwar zufällig, bleibt aber genauso blind für das, was
`,e.jsx(n,{children:"\\bA"})," mit Vektoren ",e.jsx(i.em,{children:"tut"}),` (im
`,e.jsx(a,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"}),`
`,e.jsx(n,{children:"\\bA\\bx"}),"). Die Lösung sind ",e.jsx(i.em,{children:"Operatornormen"}),`, die die Transformation
`,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx"})," direkt vermessen: Wie stark kann ",e.jsx(n,{children:"\\bA"}),`
einen Vektor höchstens verlängern? Ihnen widmen wir den
`,e.jsx(i.a,{href:"#sec-3.3",children:"nächsten Abschnitt"}),"."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(we,{children:[e.jsxs(T,{wahr:!0,children:[e.jsx(i.p,{children:`Vertauschen wir zwei Einträge einer Matrix, so ändert sich keine der drei
Vektorisierungsnormen.`}),e.jsxs(i.p,{children:["Alle drei entstehen als Vektornorm von ",e.jsx(n,{children:"\\vec(\\bA)"}),", und die ",e.jsx(n,{children:"1"}),"-, ",e.jsx(n,{children:"2"}),`- und
`,e.jsx(n,{children:"\\infty"}),`-Norm eines Vektors hängen nicht von der Reihenfolge seiner Einträge ab. Genau
diese Blindheit führt in `,e.jsx(i.a,{href:"#sec-3.3",children:"Abschnitt 3.3"})," zu den Operatornormen."]})]}),e.jsxs(T,{wahr:!1,children:[e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"p"}),"-Normen sind für jedes ",e.jsx(n,{children:"p > 0"})," definiert."]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"p < 1"}),` ist die Dreiecksungleichung verletzt: Im Widget beult sich die Einheitskugel
nach innen, und für `,e.jsx(n,{children:"p = 0{,}5"}),` ist
`,e.jsx(n,{children:"\\left\\|\\be_1 + \\be_2\\right\\|_p = 4 > 2 = \\left\\|\\be_1\\right\\|_p + \\left\\|\\be_2\\right\\|_p"}),`.
Das dritte Normaxiom (für Matrizen: `,e.jsx(i.a,{href:"#env-matrixnorm",children:"Definition 3.2.1"}),") verlangt daher ",e.jsx(n,{children:"p \\ge 1"}),"."]})]}),e.jsxs(ke,{loesung:1.2,toleranz:.02,children:[e.jsxs(i.p,{children:["Setzen wir im Einheitskugel-Widget das Kästchen ",e.jsx(n,{children:"p = \\infty"}),` und die Regler auf
`,e.jsx(n,{children:"\\bx = (-1{,}2;\\, 0{,}9)"}),". Welchen Wert zeigt das Widget für ",e.jsx(n,{children:"\\|\\bx\\|_p"}),"?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"1{,}2"}),". Die Maximumsnorm nimmt den größten Betrag, hier ",e.jsx(n,{children:"|-1{,}2| = 1{,}2"}),`; die zweite
Koordinate spielt keine Rolle. Zum Vergleich: `,e.jsx(n,{children:"\\|\\bx\\|_2 = 1{,}5"}),` und
`,e.jsx(n,{children:"\\|\\bx\\|_1 = 2{,}1"}),`. Die skalierte Kugel ist entsprechend ein Quadrat der halben
Kantenlänge `,e.jsx(n,{children:"1{,}2"}),", dessen Rand genau durch die Pfeilspitze läuft."]})]})]})}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:"Vertiefung: Heath §2.3."})})]})}function Yn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(cn,{...r})}):cn(r)}const on=(r,i=3)=>l(r,i).replace(",","{,}"),ue=V.rot,ve=V.blau,_e=V.grau,ei=r=>[[r[0][0],r[0][1]],[r[1][0],r[1][1]]];function ni(r){const[[i,s],[m,h]]=r,d=i*i+s*s+m*m+h*h,b=i*h-s*m;return Math.sqrt(Math.max(0,(d-Math.sqrt(Math.max(0,d*d-4*b*b)))/2))}function ii(r){const[[i,s],[m,h]]=r,d=i*i+m*m,b=i*s+m*h,j=s*s+h*h;if(Math.abs(b)<1e-12)return d>=j?0:90;const _=d+j,F=d*j-b*b,S=(_+Math.sqrt(Math.max(0,_*_-4*F)))/2;return(Math.atan2(S-d,b)*180/Math.PI%360+360)%360}const Qe=r=>Math.max(Math.abs(r[0][0])+Math.abs(r[1][0]),Math.abs(r[0][1])+Math.abs(r[1][1])),Ke=r=>Math.max(Math.abs(r[0][0])+Math.abs(r[0][1]),Math.abs(r[1][0])+Math.abs(r[1][1])),xn=[{name:`${v("beispiel:visualisierung")}`,titel:"die Matrix aus dem Beispiel: σ₁ ≈ 2,29",m:[[2,1],[0,1]]},{name:"Drehung",titel:"alle Streckfaktoren sind 1",m:[[.6,-.8],[.8,.6]]},{name:"zehnfach",titel:"alle Einträge ×10: die Norm wächst mit",m:[[20,10],[0,10]]},{name:"singulär",titel:"die Ellipse entartet zur Strecke",m:[[1,2],[.5,1]]}],ri=(r,i)=>r.every((s,m)=>s.every((h,d)=>Math.abs(h-i[m][d])<1e-9));function si(){const[r,i]=q.useState(xn[0].m.map(o=>[...o])),[s,m]=q.useState(20),h=ei(r),d=$n(h),b=ni(h),j=ii(h),_=o=>o*Math.PI/180,F=o=>[Math.cos(_(o)),Math.sin(_(o))],S=o=>[h[0][0]*o[0]+h[0][1]*o[1],h[1][0]*o[0]+h[1][1]*o[1]],f=F(s),E=S(f),w=Math.hypot(E[0],E[1]),u=F(j),y=S(u),c=Math.max(2.4,1.25*d),A=o=>{if(!(d>1e-9))return null;const[k,x]=o(0,0),[B]=o(d,0),[R,Z]=o(y[0],y[1]);return e.jsxs("g",{children:[e.jsx("circle",{cx:k,cy:x,r:B-k,fill:"none",stroke:ue,strokeWidth:1.2,strokeDasharray:"3 4"}),e.jsx("circle",{cx:R,cy:Z,r:4,fill:"none",stroke:ue,strokeWidth:2})]})},I=b<1e-9,J=!I&&Math.abs(d-b)<1e-6,Q=d>1e-9&&w>=d*.995,z=I?"singulär":J?"isotrop":"generisch";return e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs(xe,{children:["Ziehen wir ",e.jsx(n,{children:"\\bx"})," auf dem Einheitskreis herum, bis der blaue Bildpfeil am längsten ist."]}),e.jsxs("p",{className:`max-w-prose text-xs ${U}`,children:[e.jsx("span",{style:{color:_e},children:"grau"})," der Einheitskreis mit dem Einheitsvektor"," ",e.jsx(n,{children:"\\bx"}),", ",e.jsx("span",{style:{color:ve},children:"blau"})," sein Bild"," ",e.jsx(n,{children:"\\bA\\bx"})," und die Bildellipse, ",e.jsx("span",{style:{color:ue},children:"rot"})," der Kreis vom Radius ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2"})," samt der Stelle, an der die Ellipse ihn berührt."]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:xn.map(o=>{const k=ri(o.m,r);return e.jsx("button",{type:"button",title:o.titel,"aria-pressed":k,className:`text-xs ${k?Ne:te}`,onClick:()=>i(o.m.map(x=>[...x])),children:o.name},o.name)})}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx("div",{className:"min-w-0",children:e.jsx(In,{matrix:h,showGrid:!1,showUnitCircle:!0,size:270,worldHalf:c,transitionMs:250,vectors:[{v:f,color:_e,label:"x",draggable:!0,dragConstraint:"unitCircle"},{v:E,color:ve,label:"Ax"}],lines:[{dir:u,color:ue,dash:[5,5],label:"x*"}],onVectorChange:(o,k)=>{if(o!==0)return;const x=Math.atan2(k[1],k[0])*180/Math.PI;m(Math.round((x%360+360)%360))},overlay:A,ariaLabel:`Einheitskreis und seine Bildellipse unter A; der aktuelle Streckfaktor ist ${l(w,2)}, das Maximum ${l(d,2)}.`})}),e.jsx("div",{className:"min-w-0",children:e.jsx(Pn,{xLabel:"Winkel von x (Grad)",yLabel:"‖Ax‖₂",width:300,height:230,xDomain:[0,360],yDomain:[0,Math.max(.2,d*1.25)],series:[{f:o=>{const k=S(F(o));return Math.hypot(k[0],k[1])},color:ve,label:"‖Ax‖₂"}],hlines:[{at:d,color:ue,dash:[4,4],label:"σ₁ = ‖A‖₂"},{at:b,color:_e,dash:[2,4],label:"σ₂"}],vlines:[{at:s,color:_e}],points:[{x:s,y:w,color:ve,r:4}],ariaLabel:"Streckfaktor als Funktion des Winkels; das Maximum ist die Operatornorm."})})]}),e.jsxs("div",{className:"flex flex-wrap items-end gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(n,{children:"\\bA ="}),e.jsx(fe,{value:r,onChange:i})]}),e.jsx("div",{className:"min-w-[14rem] grow",children:e.jsx(ie,{label:"Winkel von x",value:s,onChange:m,min:0,max:360,step:1,unit:"°",accent:_e,fmt:o=>`${Math.round(o)}`})})]}),e.jsxs("div",{className:`inline-block p-2 font-mono text-xs ${rn}`,children:[e.jsxs("div",{style:{color:ve},children:["‖Ax‖₂ = ",l(w,3)," (aktuelle Richtung)"]}),e.jsxs("div",{style:{color:ue},children:["‖A‖₂ = σ₁ = ",l(d,3)]}),e.jsxs("div",{children:["σ₂ = ",l(b,3)," (stärkste Stauchung)"]}),e.jsxs("div",{children:["‖A‖₁ = ",l(Qe(r),3)," · ‖A‖∞ = ",l(Ke(r),3)]})]}),e.jsx(me,{kind:Q?"ok":z==="singulär"?"warn":"neutral",children:z==="singulär"?e.jsxs(e.Fragment,{children:["Die Bildellipse ist zu einer Strecke entartet: ",e.jsx(n,{children:"\\sigma_2 = 0"}),", eine ganze Richtung wird auf den Nullpunkt gedrückt. Die Operatornorm merkt davon nichts, sie misst nur die stärkste Streckung ",e.jsx(n,{children:`\\left\\| \\bA \\right\\|_2 = ${on(d)}`})," ","(",v("satz:spektralnorm-und-spektralzerlegung"),"). Die Konditionszahl ",e.jsx(n,{children:"\\kappa_2(\\bA)"})," aus"," ",e.jsx("a",{className:"underline",href:"#sec-3.5",children:v("sec:matrix-spur-norm/eigenschaften")})," ","ist hier unendlich."]}):z==="isotrop"?e.jsxs(e.Fragment,{children:["Alle Streckfaktoren sind gleich ",l(d,3),": Die Kurve rechts ist eine Waagrechte, der Einheitskreis bleibt ein Kreis. Für die Drehung mit"," ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2 = 1"})," ist das ",v("bemerkung:operatornormen-eigenschaften-von-orthogonalmatrizen"),"; die Spalten- und Zeilensummennorm liegen mit ",l(Qe(r),2)," bzw."," ",l(Ke(r),2)," daneben, denn sie messen in einer anderen Geometrie (",v("satz:induzierte-p-normen"),")."]}):Q?e.jsxs(e.Fragment,{children:["Getroffen: In dieser Richtung nimmt der Streckfaktor sein Maximum"," ",l(d,3)," an, und genau dieses Maximum ist"," ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2"})," (",v("definition:operatornorm"),"). Die Ellipse berührt hier den roten Kreis, und ",e.jsx(n,{children:"\\bx"})," zeigt in Richtung des Eigenvektors von"," ",e.jsx(n,{children:"\\bA^\\top\\bA"})," zum größten Eigenwert"," ",e.jsx(n,{children:`\\lambda_1 = ${on(d*d)}`})," (",v("satz:spektralnorm-und-spektralzerlegung"),")."]}):e.jsxs(e.Fragment,{children:["In dieser Richtung streckt ",e.jsx(n,{children:"\\bA"})," um den Faktor ",l(w,3),", also"," ",l(100*w/d,0)," % des Maximums. Der Streckfaktor pendelt zwischen"," ",l(b,3)," und ",l(d,3),"; nur der obere dieser beiden Werte ist die Operatornorm (",v("definition:operatornorm"),"). Zum Vergleich: ‖A‖₁ = ",l(Qe(r),2)," und ‖A‖∞ = ",l(Ke(r),2)," lesen dieselbe Matrix in der 1- bzw.",e.jsx(n,{children:"\\,\\infty"}),"-Geometrie (",v("satz:induzierte-p-normen"),")."]})})]})}function mn({q:r,children:i}){return e.jsxs("li",{className:"space-y-1",children:[e.jsx("div",{children:r}),e.jsxs("details",{className:"rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300",children:"Lösung anzeigen"}),e.jsx("div",{className:"pt-1.5",children:i})]})]})}function bn(r){const i={a:"a",code:"code",em:"em",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Die elementweisen Matrixnormen aus ",e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),` haben einen blinden
Fleck: Sie behandeln die Matrix als bloße Zahlentabelle. Die Identitätsmatrix
`,e.jsx(a,{id:"identity-matrix",children:e.jsx(n,{children:"\\bI_n"})}),` etwa verändert
als Abbildung überhaupt nichts; trotzdem wächst ihre Frobenius-Norm
`,e.jsx(n,{children:"\\left\\| \\bI_n \\right\\|_F = \\sqrt{n}"}),` mit der Dimension. Was die
Matrix als `,e.jsx(a,{id:"linear-map",children:"lineare Abbildung"}),`
`,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx"})," ",e.jsx(i.em,{children:"tut"}),`, sehen diese Normen nicht. In
diesem Abschnitt bauen wir Normen, die genau das messen: Wie stark kann
`,e.jsx(n,{children:"\\bA"})," einen Vektor strecken?"]}),`
`,e.jsxs(i.h3,{id:"sec-definition-und-interpretation",children:["3.3.1 ","Definition und Interpretation"]}),`
`,e.jsxs(i.p,{children:["Die Idee: Wir schicken alle Vektoren ",e.jsx(n,{children:"\\bx \\neq \\bnull"}),` durch die
Abbildung und vergleichen die Länge des Bildes `,e.jsx(n,{children:"\\bA\\bx"}),` mit der Länge
des Urbildes `,e.jsx(n,{children:"\\bx"}),`, gemessen mit einer
`,e.jsx(a,{id:"norm",children:"Vektornorm"}),` unserer Wahl. Der größte
auftretende Streckfaktor ist die Norm der Matrix.`]}),`
`,e.jsxs(g,{kind:"Definition",label:"3.3.1 (Operatornorm)",id:"env-operatornorm",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\left\\| \\cdot \\right\\|_V"}),` eine Vektornorm. Die
`,e.jsx(i.em,{children:"Operatornorm"})," (auch: ",e.jsx(i.em,{children:"induzierte Norm"}),`) von
`,e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," ist"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_V := \\max_{\\bx \\neq \\bnull} \\frac{\\left\\| \\bA\\bx \\right\\|_V}{\\left\\| \\bx \\right\\|_V} = \\max_{\\left\\| \\bx \\right\\|_V = 1} \\left\\| \\bA\\bx \\right\\|_V."})]}),`
`,e.jsxs(i.p,{children:["Der ",e.jsx(i.em,{children:"Normquotient"}),`
`,e.jsx(n,{children:"s_{\\bA}(\\bx) = \\left\\| \\bA\\bx \\right\\|_V / \\left\\| \\bx \\right\\|_V"}),`
gibt an, um welchen Faktor `,e.jsx(n,{children:"\\bA"}),`
den Vektor `,e.jsx(n,{children:"\\bx"}),` streckt. Eine große Operatornorm bedeutet also: Es
gibt mindestens eine Richtung, in der `,e.jsx(n,{children:"\\bA"}),` stark streckt. Eine kleine
Operatornorm bedeutet: `,e.jsx(n,{children:"\\bA"}),` staucht jeden Vektor (oder lässt ihn
höchstens schwach wachsen). Die zweite Gleichheit in der Definition gilt, weil
der Normquotient skaleninvariant ist: Ersetzen wir `,e.jsx(n,{children:"\\bx"}),` durch
`,e.jsx(n,{children:"c\\,\\bx"})," mit ",e.jsx(n,{children:"c \\neq 0"}),", kürzt sich ",e.jsx(n,{children:"|c|"}),` heraus.
Wir dürfen uns deshalb auf Vektoren der Länge 1 beschränken.`]}),`
`,e.jsx(P,{title:"Zwei Normen, und warum wir das Maximum schreiben dürfen",children:e.jsx(g,{kind:"Bemerkung",label:"3.3.2",id:"env-bemerkung-3-3-2",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Genau genommen brauchen wir zwei Normen: eine auf ",e.jsx(n,{children:"\\R^n"}),` für
`,e.jsx(n,{children:"\\bx"})," und eine auf ",e.jsx(n,{children:"\\R^m"})," für ",e.jsx(n,{children:"\\bA\\bx"}),`. Wir
verwenden stets dieselbe Normfamilie in der jeweils passenden Dimension und
schreiben dafür dasselbe Symbol.`]}),`
`,e.jsxs(i.li,{children:[`Warum dürfen wir „max" statt „sup" schreiben? Die Funktion
`,e.jsx(n,{children:"\\bx \\mapsto \\left\\| \\bA\\bx \\right\\|_V"}),` ist
`,e.jsx(a,{id:"continuity",children:"stetig"}),`, und die
Einheitssphäre
`,e.jsx(n,{children:"\\{\\bx : \\left\\| \\bx \\right\\|_V = 1\\}"}),` ist eine
`,e.jsx(a,{id:"closed-bounded-set",children:"abgeschlossene und beschränkte Menge"}),"; das Maximum wird also tatsächlich angenommen."]}),`
`]})})}),`
`,e.jsxs(i.p,{children:[`Schauen wir uns das geometrisch an. In der euklidischen Norm (
`,e.jsx(n,{children:"p = 2"}),`) ist die Menge aller Einheitsvektoren der Einheitskreis. Sein
Bild unter einer `,e.jsx(n,{children:"2 \\times 2"}),`-Matrix ist eine Ellipse, und die
Operatornorm ist die längste Halbachse dieser Ellipse.`]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.3.3 (Visualisierung)",id:"env-visualisierung",children:[e.jsxs(i.p,{children:[`Betrachten wir
`,e.jsx(n,{children:"\\bA = \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix}"}),`. Wie wir in
`,e.jsx(i.a,{href:"#env-spektralnorm-und-spektralzerlegung",children:"Satz 3.3.7"}),` beweisen werden, ist
`,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\corange{\\lambda_{\\max}(\\bA^\\top\\bA)}}"}),`.
Rechnen wir nach:`]}),e.jsx(t,{children:"\\bA^\\top\\bA = \\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix} \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 4 & 2 \\\\ 2 & 2 \\end{pmatrix}."}),e.jsxs(i.p,{children:["Die ",e.jsx(a,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` sind die
Nullstellen des charakteristischen Polynoms
`,e.jsx(n,{children:"\\lambda^2 - 6\\lambda + 4"}),`, also
`,e.jsx(n,{children:"\\lambda_{1,2} = 3 \\pm \\sqrt{5}"}),", und damit"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\corange{3 + \\sqrt{5}}} \\approx 2{,}29."}),e.jsxs(i.p,{children:["In R können wir das direkt nachprüfen (",e.jsx(i.code,{children:"crossprod(A)"}),` berechnet
`,e.jsx(n,{children:"\\bA^\\top\\bA"}),"):"]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`A <- matrix(c(2, 1,
              0, 1), nrow = 2, byrow = TRUE)
AtA <- crossprod(A)   # t(A) %*% A
sqrt(eigen(AtA)$values)
#> [1] 2.288246 0.874032
`})}),e.jsxs(i.p,{children:[`Der größte Wert ist die Operatornorm: Kein Einheitsvektor wird um mehr als den
Faktor `,e.jsx(n,{children:"2{,}29"})," gestreckt. Der kleinere Wert ",e.jsx(n,{children:"0{,}874"}),` ist
die kürzeste Halbachse der Bildellipse, also die stärkste Stauchung. Dieselbe
Matrix begegnet uns in `,e.jsx(i.a,{href:"#env-beispiel-3-4-6",children:"Beispiel 3.4.6"})," (",e.jsx(i.a,{href:"#sec-3.4",children:"Abschnitt 3.4"}),`) wieder. Dort
berechnen wir ihre Schattennormen aus genau diesen Eigenwerten.`]})]}),`
`,e.jsxs(oe,{title:"Wie schwankt der Streckfaktor, wenn der Vektor um den Einheitskreis wandert?",children:[e.jsxs(i.p,{children:[`Gerechnet haben wir das Maximum damit, gesehen haben wir es nicht. Die Definition läuft über
`,e.jsx(i.em,{children:"alle"}),` Einheitsvektoren, ausprobieren können wir immer nur einen. Wie stark schwankt der
Streckfaktor `,e.jsx(n,{children:"\\left\\|\\bA\\bx\\right\\|_2"})," überhaupt, wenn ",e.jsx(n,{children:"\\bx"}),` einmal ganz um den
Einheitskreis wandert, und in welche Richtung muss `,e.jsx(n,{children:"\\bx"}),` zeigen, damit er sein Maximum
erreicht?`]}),e.jsx(si,{}),e.jsxs(i.p,{children:[`Der Streckfaktor pendelt zwischen den beiden Halbachsen der
Bildellipse hin und her, und er tut das zweimal pro Umlauf: Die Kurve rechts hat zwei
Hochpunkte, an denen die Ellipse den roten Kreis von innen berührt. Nur der obere Wert ist
die Operatornorm. Die Richtung `,e.jsx(n,{children:"\\bx^*"}),`, in der das passiert, ist keine der
Koordinatenachsen, sondern liegt schief im Raum; welche Richtung es genau ist, klärt
`,e.jsx(i.a,{href:"#env-spektralnorm-und-spektralzerlegung",children:"Satz 3.3.7"}),` weiter unten. Und die beiden Sonderfälle sind schnell durchgespielt: Bei der
Drehung ist die Kurve eine Waagrechte, jede Richtung ist Maximalrichtung; bei der singulären
Matrix fällt die Kurve irgendwo auf null, ohne dass das Maximum davon etwas merkt.`]})]}),`
`,e.jsxs(i.h3,{id:"sec-die-wichtigsten-operatornormen",children:["3.3.2 ","Die wichtigsten Operatornormen"]}),`
`,e.jsxs(i.p,{children:["Jede ",e.jsx(n,{children:"p"}),`-Norm
`,e.jsx(n,{children:"\\left\\| \\bv \\right\\|_p = \\left( \\sum_i |v_i|^p \\right)^{1/p}"}),`
induziert ihre eigene Operatornorm. Drei Fälle sind so wichtig, dass sie eigene
Namen tragen, und für zwei davon gibt es erfreulich einfache Formeln:`]}),`
`,e.jsxs(g,{kind:"Satz",label:"3.3.4 (Induzierte p-Normen)",id:"env-induzierte-p-normen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit Einträgen ",e.jsx(n,{children:"a_{ij}"}),`.
Dann gilt:`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Spektralnorm"})," (",e.jsx(n,{children:"p = 2"}),"):"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_2 = \\max_{\\left\\| \\bx \\right\\|_2 = 1} \\left\\| \\bA\\bx \\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Spaltensummennorm"})," (",e.jsx(n,{children:"p = 1"}),"):"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_1 = \\max_{\\left\\| \\bx \\right\\|_1 = 1} \\left\\| \\bA\\bx \\right\\|_1 = \\max_{1 \\leq j \\leq n} \\sum_{i=1}^m |a_{ij}|"}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zeilensummennorm"})," (",e.jsx(n,{children:"p = \\infty"}),"):"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_\\infty = \\max_{\\left\\| \\bx \\right\\|_\\infty = 1} \\left\\| \\bA\\bx \\right\\|_\\infty = \\max_{1 \\leq i \\leq m} \\sum_{j=1}^n |a_{ij}|"})]}),`
`,e.jsxs(i.p,{children:[`Die 1-Norm einer Matrix ist also einfach die größte betragsmäßige Spaltensumme,
die `,e.jsx(n,{children:"\\infty"}),`-Norm die größte betragsmäßige Zeilensumme. Beide lassen
sich ohne jede Eigenwertrechnung ablesen. Als Eselsbrücke: Die `,e.jsx(n,{children:"1"}),`
steht senkrecht wie eine Spalte, das Symbol `,e.jsx(n,{children:"\\infty"}),` liegt waagrecht
wie eine Zeile. Die Spektralnorm ist
teurer zu berechnen, dafür passt sie zur euklidischen Geometrie: Sie ist die
längste Halbachse der Bildellipse aus `,e.jsx(i.a,{href:"#env-visualisierung",children:"Beispiel 3.3.3"}),`. Ihre Formel beweisen wir
in `,e.jsx(i.a,{href:"#env-spektralnorm-und-spektralzerlegung",children:"Satz 3.3.7"}),`; für die Spaltensummennorm holen wir den Beweis in der folgenden
Vertiefung nach, der Fall `,e.jsx(n,{children:"p = \\infty"}),` verläuft völlig analog und ist
eine gute Übung.`]}),`
`,e.jsxs(P,{title:"Beweis der Spaltensummenformel",children:[e.jsxs("p",{className:"text-sm",children:["Wir zeigen ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_1 = \\max_j \\cgreen{c_j}"})," mit den Spaltensummen ",e.jsx(n,{children:"\\cgreen{c_j} := \\sum_{i=1}^m |a_{ij}|"}),". Die Farbe Grün verfolgt dabei die Spaltensummen durch die gesamte Rechnung."]}),e.jsxs(H,{children:[e.jsx(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"i"}),"-te Komponente von ",e.jsx(n,{children:"\\bA\\bx"})," ausschreiben; Dreiecksungleichung ",e.jsx(n,{children:"|u + v| \\leq |u| + |v|"})," im Betrag"]}),children:e.jsx(t,{children:"\\left\\| \\bA\\bx \\right\\|_1 = \\sum_{i=1}^m \\left| \\sum_{j=1}^n a_{ij} x_j \\right| \\leq \\sum_{i=1}^m \\sum_{j=1}^n |a_{ij}|\\,|x_j|"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Summationsreihenfolge tauschen (endliche Summen), dann ",e.jsx(n,{children:"\\sum_i |a_{ij}| = \\cgreen{c_j}"})," einsetzen"]}),children:e.jsx(t,{children:"\\sum_{i=1}^m \\sum_{j=1}^n |a_{ij}|\\,|x_j| = \\sum_{j=1}^n |x_j| \\sum_{i=1}^m |a_{ij}| = \\sum_{j=1}^n |x_j|\\,\\cgreen{c_j}"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["jede Spaltensumme durch die größte abschätzen; ",e.jsx(n,{children:"\\sum_j |x_j| = \\left\\| \\bx \\right\\|_1 = 1"})]}),children:e.jsx(t,{children:"\\sum_{j=1}^n |x_j|\\,\\cgreen{c_j} \\leq \\left( \\max_j \\cgreen{c_j} \\right) \\sum_{j=1}^n |x_j| = \\max_j \\cgreen{c_j}"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["die Schranke wird angenommen: Für den Einheitsvektor ",e.jsx(n,{children:"\\be_{j^*}"})," zur maximalen Spalte ",e.jsx(n,{children:"j^*"})," ist ",e.jsx(n,{children:"\\bA\\be_{j^*}"})," genau die ",e.jsx(n,{children:"j^*"}),"-te Spalte von ",e.jsx(n,{children:"\\bA"})]}),children:e.jsx(t,{children:"\\left\\| \\bA\\be_{j^*} \\right\\|_1 = \\sum_{i=1}^m |a_{ij^*}| = \\cgreen{c_{j^*}} = \\max_j \\cgreen{c_j}"})})]})]}),`
`,e.jsxs(i.h3,{id:"sec-einschub-orthogonalmatrizen",children:["3.3.3 ","Einschub: Orthogonalmatrizen"]}),`
`,e.jsxs(i.p,{children:[`Für den Beweis der Spektralnorm-Formel brauchen wir eine besondere Klasse von
Matrizen: solche, die Längen überhaupt nicht verändern. Sie werden uns im ganzen
Skript immer wieder begegnen, gerade `,e.jsx(i.em,{children:"weil"}),` sie Normen unangetastet
lassen.`]}),`
`,e.jsxs(g,{kind:"Definition",label:"3.3.5 (Orthogonalmatrix)",id:"env-operatornormen-orthogonalmatrix",children:[e.jsxs(i.p,{children:["Eine Matrix ",e.jsx(n,{children:"\\bQ \\in \\R^{n \\times n}"}),` heißt
`,e.jsx(i.em,{children:"Orthogonalmatrix"}),`, wenn ihre Spalten
`,e.jsx(a,{id:"orthonormal-basis",children:"orthonormale Vektoren"}),` sind,
also`]}),e.jsx(t,{children:"\\bQ^\\top\\bQ = \\bI."})]}),`
`,e.jsx(g,{kind:"Bemerkung",label:"3.3.6 (Eigenschaften von Orthogonalmatrizen)",id:"env-operatornormen-eigenschaften-von-orthogonalmatrizen",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Geometrisch beschreibt ",e.jsx(n,{children:"\\bQ"}),` eine
`,e.jsx(a,{id:"rotation-matrix",children:"Rotation"}),` und/oder
`,e.jsx(a,{id:"reflection",children:"Spiegelung"})," in ",e.jsx(n,{children:"\\R^n"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bQ"}),` erhält die
`,e.jsx(a,{id:"euclidean-norm",children:"euklidische Norm"}),`: Für alle
`,e.jsx(n,{children:"\\bx \\in \\R^n"})," gilt"]}),`
`,e.jsx(t,{children:"\\left\\| \\bQ\\bx \\right\\|_2 = \\sqrt{\\bx^\\top\\bQ^\\top\\bQ\\bx} = \\sqrt{\\bx^\\top\\bx} = \\left\\| \\bx \\right\\|_2."}),`
`,e.jsxs(i.p,{children:["Insbesondere ist ",e.jsx(n,{children:"\\left\\| \\bQ \\right\\|_2 = 1"}),`: Jeder
Normquotient ist exakt 1.`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bQ^{-1} = \\bQ^\\top"}),`. Die
`,e.jsx(a,{id:"matrix-inverse",children:"Inverse"}),` ist gratis: Statt
eines Gleichungssystems genügt Transponieren.`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Alle ",e.jsx(a,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` haben
Betrag 1: Aus `,e.jsx(n,{children:"\\bQ\\bx = \\lambda\\bx"}),` mit
`,e.jsx(n,{children:"\\bx \\neq \\bnull"}),` folgt
`,e.jsx(n,{children:"\\left\\| \\bx \\right\\|_2 = \\left\\| \\bQ\\bx \\right\\|_2 = |\\lambda| \\left\\| \\bx \\right\\|_2"}),`,
also `,e.jsx(n,{children:"|\\lambda| = 1"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bQ"})," ist auch ",e.jsx(n,{children:"\\bQ^{-1} = \\bQ^\\top"}),` orthogonal
(denn `,e.jsx(n,{children:"(\\bQ^\\top)^\\top\\bQ^\\top = \\bQ\\bQ^\\top = \\bI"}),`), hat
also ebenfalls Spektralnorm 1. Für die
`,e.jsx(a,{id:"condition-number",children:"Konditionszahl"}),` folgt
`,e.jsx(n,{children:"\\kappa_2(\\bQ) = \\left\\| \\bQ \\right\\|_2 \\left\\| \\bQ^{-1} \\right\\|_2 = 1"}),`:
Multiplikation mit `,e.jsx(n,{children:"\\bQ"})," oder ",e.jsx(n,{children:"\\bQ^{-1}"}),` verstärkt relative Störungen in der
`,e.jsx(n,{children:"2"}),`-Norm nicht. Stabil implementierte orthogonale Transformationen sind deshalb
ein Arbeitspferd der numerischen linearen Algebra
(mehr dazu bei der QR-Zerlegung in `,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Produkte bleiben orthogonal: Sind ",e.jsx(n,{children:"\\bQ_1, \\dots, \\bQ_k"}),`
orthogonal, dann auch `,e.jsx(n,{children:"\\bQ = \\bQ_1 \\cdots \\bQ_k"}),`. Warum? Weil
`,e.jsx(n,{children:"(\\bQ_1\\bQ_2)^\\top \\bQ_1\\bQ_2 = \\bQ_2^\\top \\bQ_1^\\top \\bQ_1 \\bQ_2 = \\bQ_2^\\top \\bQ_2 = \\bI"}),`
(`,e.jsx(a,{id:"transpose",children:"Transponierregeln"}),`), und dann
induktiv weiter.`]}),`
`]}),`
`]})}),`
`,e.jsxs(i.h3,{id:"sec-spektralnorm-und-spektralzerlegung",children:["3.3.4 ","Spektralnorm und Spektralzerlegung"]}),`
`,e.jsxs(i.p,{children:[`Jetzt können wir die Formel
`,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}),`
beweisen. Der Schlüssel: `,e.jsx(n,{children:"\\bA^\\top\\bA"}),` ist
`,e.jsx(a,{id:"symmetric-matrix",children:"symmetrisch"}),` und besitzt deshalb
eine Spektralzerlegung `,e.jsx(n,{children:"\\bA^\\top\\bA = \\bP\\bLambda\\bP^\\top"}),` mit
einer `,e.jsx(i.em,{children:"orthogonalen"})," Eigenvektormatrix ",e.jsx(n,{children:"\\bP"}),` – und genau die
Normerhaltung aus `,e.jsx(i.a,{href:"#env-operatornormen-eigenschaften-von-orthogonalmatrizen",children:"Bemerkung 3.3.6"}),` macht den Beweis kurz. Die Eigenwerte sind
dabei automatisch nichtnegativ, denn
`,e.jsx(n,{children:"\\bx^\\top\\bA^\\top\\bA\\bx = \\left\\| \\bA\\bx \\right\\|_2^2 \\geq 0"}),`
(`,e.jsx(n,{children:"\\bA^\\top\\bA"}),` ist
`,e.jsx(a,{id:"positive-definite",children:"positiv semidefinit"}),")."]}),`
`,e.jsxs(g,{kind:"Satz",label:"3.3.7 (Spektralnorm und Spektralzerlegung)",id:"env-spektralnorm-und-spektralzerlegung",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` mit
`,e.jsx(a,{id:"rank",children:"Rang"})," ",e.jsx(n,{children:"r"}),` und Spektralzerlegung
`,e.jsx(n,{children:"\\bA^\\top\\bA = \\bP\\bLambda\\bP^\\top"}),`, wobei
`,e.jsx(n,{children:"\\bLambda = \\diag(\\corange{\\lambda_1}, \\ldots, \\lambda_r, 0, \\ldots, 0)"}),`
mit `,e.jsx(n,{children:"\\corange{\\lambda_1} \\geq \\lambda_2 \\geq \\cdots \\geq \\lambda_r > 0"}),`.
Dann gilt`]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\corange{\\lambda_1}} = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}."})]}),`
`,e.jsx(P,{title:"Beweis der Spektralnormformel",children:e.jsxs(H,{children:[e.jsx(p,{why:e.jsx(e.Fragment,{children:"euklidische Norm als Skalarprodukt schreiben, dann die Spektralzerlegung einsetzen"}),children:e.jsx(t,{children:"\\left\\| \\bA\\bx \\right\\|_2^2 = \\bx^\\top\\bA^\\top\\bA\\,\\bx = \\bx^\\top\\bP\\bLambda\\bP^\\top\\bx"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bLambda = \\bLambda^{1/2}\\bLambda^{1/2}"})," mit ",e.jsx(n,{children:"\\bLambda^{1/2} = \\diag(\\sqrt{\\lambda_i})"})," aufspalten und die Faktoren den beiden Seiten zuschlagen, wieder eine quadrierte Norm"]}),children:e.jsx(t,{children:"\\bx^\\top\\bP\\bLambda\\bP^\\top\\bx = \\left( \\bLambda^{1/2}\\cbgreen{\\bP^\\top\\bx} \\right)^\\top \\left( \\bLambda^{1/2}\\cbgreen{\\bP^\\top\\bx} \\right) = \\left\\| \\bLambda^{1/2}\\,\\cbgreen{\\bP^\\top\\bx} \\right\\|_2^2"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Substitution ",e.jsx(n,{children:"\\cbgreen{\\by} = \\cbgreen{\\bP^\\top\\bx}"}),": Weil ",e.jsx(n,{children:"\\bP"})," orthogonal ist, gilt ",e.jsx(n,{children:"\\left\\| \\cbgreen{\\by} \\right\\|_2 = \\left\\| \\bx \\right\\|_2"})," (",e.jsx(i.a,{href:"#env-operatornormen-eigenschaften-von-orthogonalmatrizen",children:"Bemerkung 3.3.6"}),"), und ",e.jsx(n,{children:"\\bx \\mapsto \\bP^\\top\\bx"})," ist bijektiv; ",e.jsx(n,{children:"\\cbgreen{\\by}"})," durchläuft also die Einheitssphäre, wenn ",e.jsx(n,{children:"\\bx"})," dies tut"]}),children:e.jsx(t,{children:"\\max_{\\left\\| \\bx \\right\\|_2 = 1} \\left\\| \\bLambda^{1/2}\\,\\cbgreen{\\bP^\\top\\bx} \\right\\|_2^2 = \\max_{\\left\\| \\cbgreen{\\by} \\right\\|_2 = 1} \\left\\| \\bLambda^{1/2}\\,\\cbgreen{\\by} \\right\\|_2^2"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bLambda^{1/2}"})," ist diagonal; jeden Koeffizienten durch den größten Eigenwert ",e.jsx(n,{children:"\\corange{\\lambda_1}"})," abschätzen und ",e.jsx(n,{children:"\\sum_i y_i^2 = 1"})," benutzen"]}),children:e.jsx(t,{children:"\\left\\| \\bLambda^{1/2}\\,\\cbgreen{\\by} \\right\\|_2^2 = \\corange{\\lambda_1} y_1^2 + \\lambda_2 y_2^2 + \\cdots + \\lambda_r y_r^2 \\leq \\corange{\\lambda_1} \\left( y_1^2 + \\cdots + y_r^2 \\right) \\leq \\corange{\\lambda_1}"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["die Schranke wird angenommen: Für ",e.jsx(n,{children:"\\cbgreen{\\by} = \\be_1"})," (also ",e.jsx(n,{children:"\\bx = "})," erste Spalte von ",e.jsx(n,{children:"\\bP"}),", der Eigenvektor zu ",e.jsx(n,{children:"\\corange{\\lambda_1}"}),") gilt Gleichheit; Wurzel ziehen liefert die Behauptung"]}),children:e.jsx(t,{children:"\\left\\| \\bA \\right\\|_2^2 = \\max_{\\left\\| \\bx \\right\\|_2 = 1} \\left\\| \\bA\\bx \\right\\|_2^2 = \\corange{\\lambda_1}"})})]})}),`
`,e.jsxs(i.p,{children:["Die Interpretation: Der größte Eigenwert von ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` ist die
quadrierte maximale Streckung, und die Richtung der stärksten Streckung ist der
zugehörige Eigenvektor, im Widget oben die rot gestrichelte Richtung `,e.jsx(n,{children:"\\bx^*"}),`. Noch
intuitiver wird das über die Singulärwerte von `,e.jsx(n,{children:"\\bA"}),` und die
`,e.jsx(a,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),`;
dazu später mehr.`]}),`
`,e.jsxs(i.h3,{id:"sec-beispiele",children:["3.3.5 ","Beispiele"]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.3.8",id:"env-beispiel-3-3-8",children:[e.jsxs(i.p,{children:[`Berechnen wir alle drei Operatornormen von
`,e.jsx(n,{children:"\\bA = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Spaltensummennorm"}),` (Grün verfolgt die erste, Blau die zweite
Spalte):`]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_1 = \\max\\left\\{ \\cgreen{|2| + |0|},\\; \\cblue{|1| + |3|} \\right\\} = \\max\\{\\cgreen{2}, \\cblue{4}\\} = \\cblue{4}."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Zeilensummennorm"}),` (Rot verfolgt die erste, Violett die zweite
Zeile):`]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_\\infty = \\max\\left\\{ \\cred{|2| + |1|},\\; \\cpurp{|0| + |3|} \\right\\} = \\max\\{\\cred{3}, \\cpurp{3}\\} = 3."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Spektralnorm"})," (hier müssen wir rechnen):"]}),e.jsx(t,{children:"\\bA^\\top\\bA = \\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix} \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix} = \\begin{pmatrix} 4 & 2 \\\\ 2 & 10 \\end{pmatrix}."}),e.jsxs(i.p,{children:[`Das charakteristische Polynom ist
`,e.jsx(n,{children:"\\lambda^2 - 14\\lambda + 36"}),` (Spur 14, Determinante
`,e.jsx(n,{children:"4 \\cdot 10 - 2 \\cdot 2 = 36"}),`), mit Nullstellen
`,e.jsx(n,{children:"\\lambda_{1,2} = 7 \\pm \\sqrt{13}"}),". Also"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\corange{\\lambda_{\\max}(\\bA^\\top\\bA)}} = \\sqrt{\\corange{7 + \\sqrt{13}}} \\approx \\sqrt{10{,}61} \\approx 3{,}26."}),e.jsxs(i.p,{children:["Die drei Normen liefern verschiedene Werte (",e.jsx(n,{children:"4"}),`,
`,e.jsx(n,{children:"3{,}26"}),", ",e.jsx(n,{children:"3"}),`), denn sie messen die maximale Streckung ja auch
in verschiedenen Geometrien. Weit auseinander liegen können sie aber nie; mehr
dazu in `,e.jsx(i.a,{href:"#sec-3.5",children:"Abschnitt 3.5"}),"."]})]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.3.9 (Identitätsmatrix)",id:"env-identitaetsmatrix",children:[e.jsxs(i.p,{children:["Für die Identitätsmatrix ",e.jsx(n,{children:"\\bI_n"}),` gilt in jeder Operatornorm
`,e.jsx(n,{children:"\\left\\| \\bI_n\\bx \\right\\| / \\left\\| \\bx \\right\\| = 1"}),` für
alle `,e.jsx(n,{children:"\\bx \\neq \\bnull"}),", also"]}),e.jsx(t,{children:"\\left\\| \\bI_n \\right\\|_1 = \\left\\| \\bI_n \\right\\|_2 = \\left\\| \\bI_n \\right\\|_\\infty = 1. \\quad \\checkmark"}),e.jsxs(i.p,{children:[`Das ist genau das Verhalten, das wir uns eingangs gewünscht haben: Eine
Abbildung, die nichts verändert, bekommt Norm 1, unabhängig von der
Dimension. Der Schönheitsfehler der elementweisen Normen (
`,e.jsx(n,{children:"\\left\\| \\bI_n \\right\\|_F = \\sqrt{n}"}),") ist behoben."]})]}),`
`,e.jsx(i.h4,{children:"Selbsttest"}),`
`,e.jsxs("ul",{className:"max-w-prose list-none space-y-3 pl-0",children:[e.jsx(mn,{q:e.jsxs(e.Fragment,{children:["Berechnen wir ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_1"})," und ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_\\infty"})," für ",e.jsx(n,{children:"\\bA = \\begin{pmatrix} 1 & -2 \\\\ 3 & 4 \\end{pmatrix}"}),", ganz ohne Eigenwerte."]}),children:e.jsxs(i.p,{children:["Spaltensummen: ",e.jsx(n,{children:"|1| + |3| = 4"})," und ",e.jsx(n,{children:"|{-2}| + |4| = 6"}),`,
also `,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_1 = 6"}),`. Zeilensummen:
`,e.jsx(n,{children:"|1| + |{-2}| = 3"})," und ",e.jsx(n,{children:"|3| + |4| = 7"}),`, also
`,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_\\infty = 7"}),`. Vorsicht: Die Beträge
nicht vergessen, denn das Minuszeichen in `,e.jsx(n,{children:"-2"})," zählt positiv."]})}),e.jsx(mn,{q:e.jsxs(e.Fragment,{children:["Wahr oder falsch: Für jede Orthogonalmatrix ",e.jsx(n,{children:"\\bQ"})," gilt ",e.jsx(n,{children:"\\left\\| \\bQ \\right\\|_2 = 1"}),"."]}),children:e.jsxs(i.p,{children:[`Wahr. Wegen
`,e.jsx(n,{children:"\\left\\| \\bQ\\bx \\right\\|_2 = \\left\\| \\bx \\right\\|_2"}),`
(`,e.jsx(i.a,{href:"#env-operatornormen-eigenschaften-von-orthogonalmatrizen",children:"Bemerkung 3.3.6"}),`) ist jeder Normquotient gleich 1, also auch das
Maximum. Geometrisch: Eine Drehung oder Spiegelung streckt nichts, der
Einheitskreis bleibt ein Einheitskreis.`]})})]}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(we,{children:[e.jsxs(ke,{loesung:22.882,toleranz:.05,children:[e.jsxs(i.p,{children:[`Stellen wir im Operatornorm-Widget die Voreinstellung „zehnfach" ein, also
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 20 & 10 \\\\ 0 & 10 \\end{smallmatrix}\\bigr)"}),`. Welchen Wert
zeigt es für `,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2"}),"?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"22{,}882"}),", also genau das Zehnfache des Werts aus ",e.jsx(i.a,{href:"#env-visualisierung",children:"Beispiel 3.3.3"}),`. Das muss so sein:
Multiplizieren wir eine Matrix mit `,e.jsx(n,{children:"10"}),`, so wird jedes Bild zehnmal so lang, und die
absolute Homogenität aus `,e.jsx(i.a,{href:"#env-matrixnorm",children:"Definition 3.2.1"}),` liefert
`,e.jsx(n,{children:"\\left\\|10\\,\\bA\\right\\|_2 = 10 \\left\\|\\bA\\right\\|_2"}),`. Die Ellipse behält ihre Gestalt, die
Maximalrichtung `,e.jsx(n,{children:"\\bx^*"})," bleibt dieselbe, nur der Maßstab wächst."]})]}),e.jsxs(T,{wahr:!1,children:[e.jsxs(i.p,{children:['Bei der Voreinstellung „singulär" zeigt das Widget die Operatornorm ',e.jsx(n,{children:"0"}),`, weil eine Richtung
ganz platt gedrückt wird.`]}),e.jsxs(i.p,{children:["Die Operatornorm ist ein ",e.jsx(i.em,{children:"Maximum"}),` über Richtungen, kein Minimum. Die Bildellipse entartet
zu einer Strecke, ihre kurze Halbachse ist `,e.jsx(n,{children:"\\sigma_2 = 0"}),", die lange aber ",e.jsx(n,{children:"2{,}5"}),` – und nur
die ist `,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2"})," (",e.jsx(i.a,{href:"#env-operatornorm",children:"Definition 3.3.1"}),")."]})]})]})}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:"Vertiefung: Heath §2.3.2."})})]})}function ti(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(bn,{...r})}):bn(r)}function un({q:r,children:i}){return e.jsxs("li",{className:"space-y-1",children:[e.jsx("div",{children:r}),e.jsxs("details",{className:"rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300",children:"Lösung anzeigen"}),e.jsx("div",{className:"pt-1.5",children:i})]})]})}const ze=V.rot,ge=V.blau,gn=V.gruen,jn=V.grau;function pn(r,i){return[[r[0][0]*i[0][0]+r[0][1]*i[1][0],r[0][0]*i[0][1]+r[0][1]*i[1][1]],[r[1][0]*i[0][0]+r[1][1]*i[1][0],r[1][0]*i[0][1]+r[1][1]*i[1][1]]]}function fn(r){const i=r*Math.PI/180;return[[Math.cos(i),-Math.sin(i)],[Math.sin(i),Math.cos(i)]]}function Le(r){const i=r[0][0]*r[0][0]+r[1][0]*r[1][0],s=r[0][0]*r[0][1]+r[1][0]*r[1][1],m=r[0][1]*r[0][1]+r[1][1]*r[1][1],h=(i+m)/2,d=Math.sqrt(Math.max(0,h*h-(i*m-s*s))),b=Math.max(0,h+d),j=Math.max(0,h-d);let _;if(Math.abs(s)>1e-12){const f=Math.hypot(s,b-i);_=[s/f,(b-i)/f]}else _=i>=m?[1,0]:[0,1];const F=[-_[1],_[0]],S=f=>[r[0][0]*f[0]+r[0][1]*f[1],r[1][0]*f[0]+r[1][1]*f[1]];return{s1:Math.sqrt(b),s2:Math.sqrt(j),u1:S(_),u2:S(F)}}const kn=(r,i=3)=>l(r,i).replace(",","{,}");function wn(r){if(!(Math.abs(r)>0))return"0";const i=Math.floor(Math.log10(Math.abs(r))),s=r/10**i,m=String(i).replace("-","⁻").replace(/[0-9]/g,h=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(h)]);return`${l(s,1)} · 10${m}`}const Oe=r=>r.flat().reduce((i,s)=>i+Math.abs(s),0),Ge=r=>Math.max(...r.flat().map(Math.abs));function li(){const[r,i]=q.useState([[2,1],[0,1]]),[s,m]=q.useState(0),[h,d]=q.useState([0,0]),b=pn(fn(s),r),{s1:j,s2:_,u1:F,u2:S}=Le(b),f=j+_,E=Math.hypot(j,_),w=Math.sqrt(b[0][0]**2+b[0][1]**2+b[1][0]**2+b[1][1]**2),u=Le(r);let y=0,c=0;const[A,I]=h;for(let M=0;M<=60;M++){const K=A+(I-A)*M/60,$=pn(fn(K),r),C=Le($);y=Math.max(y,Math.abs(C.s1-u.s1),Math.abs(C.s2-u.s2),Math.abs(C.s1+C.s2-(u.s1+u.s2))),c=Math.max(c,Math.abs(Oe($)-Oe(r)),Math.abs(Ge($)-Ge(r)))}const J=M=>{m(M),d(([K,$])=>[Math.min(K,M),Math.max($,M)])},Q=M=>{i(M),d([s,s])},z=300,o=z/2,k=Math.max(1.6,j*1.2),x=(z/2-14)/k,B=(M,K)=>[o+M*x,o-K*x],R=120,Z=Array.from({length:R+1},(M,K)=>{const $=2*Math.PI*K/R,[C,Ae]=B(b[0][0]*Math.cos($)+b[0][1]*Math.sin($),b[1][0]*Math.cos($)+b[1][1]*Math.sin($));return`${K===0?"M":"L"}${C.toFixed(1)},${Ae.toFixed(1)}`}).join(" "),Y=(M,K)=>{const[$,C]=B(M[0],M[1]),Ae=Math.hypot($-o,C-o);if(Ae<4)return null;const De=($-o)/Ae,Fe=(C-o)/Ae,re=8;return e.jsxs("g",{stroke:K,fill:K,children:[e.jsx("line",{x1:o,y1:o,x2:$,y2:C,strokeWidth:2.5}),e.jsx("polygon",{points:`${$},${C} ${$-re*De+.45*re*Fe},${C-re*Fe-.45*re*De} ${$-re*De-.45*re*Fe},${C-re*Fe+.45*re*De}`})]})},G=(M,K,$)=>e.jsxs("div",{className:"flex items-baseline justify-between gap-3",children:[e.jsx("span",{children:M}),e.jsx("span",{className:"font-mono text-sm tabular-nums",style:$?{color:$}:void 0,children:K})]}),le=I-A;return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(xe,{children:["Drehen wir ",e.jsx(n,{children:"\\theta"})," einmal ganz durch und vergleichen wir, welche der Zahlen rechts sich mitbewegen."]}),e.jsxs("p",{className:`max-w-prose text-xs ${U}`,children:[e.jsx("span",{style:{color:jn},children:"grau"})," der Einheitskreis,"," ",e.jsx("span",{style:{color:ge},children:"blau"})," sein Bild unter ",e.jsx(n,{children:"\\bQ_\\theta\\bA"})," mit der Halbachse ",e.jsx(n,{children:"\\sigma_2"}),", ",e.jsx("span",{style:{color:ze},children:"rot"})," die lange Halbachse"," ",e.jsx(n,{children:"\\sigma_1"}),", ",e.jsx("span",{style:{color:gn},children:"grün"})," die elementweise gerechnete Kontrollzahl."]}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx("div",{className:"min-w-0",children:e.jsxs("svg",{viewBox:`0 0 ${z} ${z}`,className:"max-w-full h-auto rounded",style:{background:"var(--w-bg)",border:"1px solid var(--w-border)"},role:"img","aria-label":`Einheitskreis und seine Bildellipse unter Q A; die Halbachsen sind ${l(j,2)} und ${l(_,2)}.`,children:[e.jsx("line",{x1:0,y1:o,x2:z,y2:o,stroke:"var(--w-grid)"}),e.jsx("line",{x1:o,y1:0,x2:o,y2:z,stroke:"var(--w-grid)"}),e.jsx("circle",{cx:o,cy:o,r:x,fill:"none",stroke:jn,strokeDasharray:"5 4"}),e.jsx("path",{d:Z,fill:ge,fillOpacity:.1,stroke:ge,strokeWidth:1.5}),Y(F,ze),Y(S,ge),e.jsxs("text",{x:8,y:18,fontSize:12,fill:ze,children:["σ₁ ≈ ",l(j,2)]}),e.jsxs("text",{x:8,y:34,fontSize:12,fill:ge,children:["σ₂ ≈ ",l(_,2)]})]})}),e.jsxs("div",{className:"min-w-0 space-y-3 text-sm",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(n,{children:"\\bA ="}),e.jsx(fe,{value:r,onChange:Q})]}),e.jsx(ie,{label:"Drehung θ",value:s,onChange:J,min:0,max:360,step:1,unit:"°",accent:ze,fmt:M=>`${Math.round(M)}`}),e.jsxs("div",{children:[e.jsxs("div",{className:`mb-1 text-xs ${U}`,children:["Einträge von ",e.jsx(n,{children:"\\bQ_\\theta\\bA"})," (ändern sich mit θ):"]}),e.jsx("div",{className:"inline-grid grid-cols-2 gap-x-3 gap-y-0.5 rounded border-x-2 px-2 py-1 font-mono text-xs tabular-nums",style:{borderColor:"var(--w-border)"},children:b.flat().map((M,K)=>e.jsx("span",{className:"text-right",children:l(M,2)},K))})]}),e.jsxs("div",{className:"space-y-1 rounded p-2",style:{border:"1px solid var(--w-border)"},children:[G(e.jsx(n,{children:"\\cred{\\sigma_1}"}),l(j,3),ze),G(e.jsx(n,{children:"\\cblue{\\sigma_2}"}),l(_,3),ge),e.jsx("hr",{style:{borderColor:"var(--w-border)"}}),G(e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,1}"})," (Nuklearnorm)"]}),l(f,3)),G(e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,2}"})," (Frobenius)"]}),l(E,3)),G(e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{\\sqrt{\\textstyle\\sum_{i,j} (\\bQ_\\theta\\bA)_{ij}^2}}"})," ","(elementweise)"]}),l(w,3),gn),G(e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,\\infty}"})," (Spektralnorm)"]}),l(j,3)),e.jsx("hr",{style:{borderColor:"var(--w-border)"}}),G(e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\| \\bQ_\\theta\\bA \\right\\|_S"})," (Summennorm)"]}),l(Oe(b),3)),G(e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\| \\bQ_\\theta\\bA \\right\\|_M"})," (Maximumsnorm)"]}),l(Ge(b),3))]})]})]}),e.jsx(me,{kind:le<1?"neutral":"ok",children:le<1?e.jsxs(e.Fragment,{children:["Noch steht die Drehung still. Die Halbachsen der Ellipse sind"," ",e.jsx(n,{children:`\\sigma_1 = ${kn(j)}`})," und ",e.jsx(n,{children:`\\sigma_2 = ${kn(_)}`}),"; alle Schattennormen rechts sind aus diesen beiden Zahlen gebaut (",v("definition:schatten-p-norm"),")."]}):e.jsxs(e.Fragment,{children:["Über die durchfahrenen ",l(le,0),"° hinweg beträgt die größte Abweichung der Schattennormen ",wn(y)," – das ist Rundungsrauschen, keine Änderung: ",v("satz:unitaere-invarianz")," in Zahlen. Summen- und Maximumsnorm dagegen bewegen sich um bis zu ",l(c,3),". Und die grüne elementweise Summe trifft weiterhin die Frobenius-Norm auf"," ",wn(Math.abs(w-E))," ","genau, wie ",v("korollar:spezialfaelle-der-schatten-p-norm")," es verlangt."]})})]})}function An(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(i.p,{children:[`Wir kennen inzwischen zwei Rezepte für Matrixnormen. Die elementweisen Normen aus
`,e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),` behandeln die Matrix als
Zahlenhaufen und verlieren dabei jede Information über die Transformation, die sie
beschreibt. Die Operatornormen aus
`,e.jsx(i.a,{href:"#sec-3.3",children:"Abschnitt 3.3"}),` messen die Transformation
direkt, aber nur ihre `,e.jsx(i.em,{children:"stärkste"}),` Streckung. Eine Matrix streckt verschiedene
Richtungen jedoch verschieden stark, und diese vollständige Streckungsinformation
steckt in `,e.jsx(i.em,{children:"allen"}),`
`,e.jsx(a,{id:"eigenvalue-eigenvector",children:"Eigenwerten"}),` von
`,e.jsx(n,{children:"\\bA^\\top\\bA"}),`, nicht nur im größten. Die dritte Normfamilie dieses
Kapitels nutzt sie alle.`]}),`
`,e.jsxs(i.h3,{id:"sec-von-eigenwerten-zu-singulaerwerten",children:["3.4.1 ","Von Eigenwerten zu Singulärwerten"]}),`
`,e.jsxs(i.p,{children:[`Erinnern wir uns an den Satz über die Spektralnorm aus
`,e.jsx(i.a,{href:"#sec-3.3",children:"Abschnitt 3.3"}),`: Dort war
`,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}),`. Die
Matrix `,e.jsx(n,{children:"\\bA^\\top\\bA"}),` ist
`,e.jsx(a,{id:"symmetric-matrix",children:"symmetrisch"}),`, ihre Eigenwerte sind also
reell und sogar nie negativ, denn
`,e.jsx(n,{children:"\\bx^\\top\\bA^\\top\\bA\\bx = \\left\\| \\bA\\bx \\right\\|_2^2 \\geq 0"}),`
für alle `,e.jsx(n,{children:"\\bx"}),` (die Matrix ist
`,e.jsx(a,{id:"positive-definite",children:"positiv semidefinit"}),`). Wir dürfen
daher aus allen Eigenwerten die Wurzel ziehen:`]}),`
`,e.jsx(t,{children:"\\sigma_i := \\sqrt{\\lambda_i}, \\qquad \\lambda_1 \\geq \\lambda_2 \\geq \\cdots \\geq \\lambda_n \\geq 0 \\text{ Eigenwerte von } \\bA^\\top\\bA."}),`
`,e.jsxs(i.p,{children:["Diese Zahlen ",e.jsx(n,{children:"\\sigma_1 \\geq \\cdots \\geq \\sigma_n \\geq 0"}),` heißen die
`,e.jsx(i.em,{children:"Singulärwerte"})," (singular values) von ",e.jsx(n,{children:"\\bA"}),`. Geometrisch sind sie die
Halbachsenlängen der Ellipse, in die `,e.jsx(n,{children:"\\bA"}),` die Einheitssphäre abbildet:
`,e.jsx(n,{children:"\\sigma_1"}),` ist die stärkste Streckung (die Spektralnorm!),
`,e.jsx(n,{children:"\\sigma_n"}),` die schwächste. Systematisch entwickeln wir das später mit der
`,e.jsx(a,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),`;
hier genügt uns: Der Vektor `,e.jsx(n,{children:"(\\sigma_1, \\ldots, \\sigma_n)"}),` ist der
vollständige „Streckungs-Fingerabdruck" der Transformation. Auf diesen Vektor wenden
wir jetzt eine `,e.jsx(a,{id:"norm",children:"Vektornorm"})," an:"]}),`
`,e.jsxs(g,{kind:"Definition",label:"3.4.1 (Schatten-p-Norm)",id:"env-schatten-p-norm",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),`, und sei
`,e.jsx(n,{children:"\\blambda = (\\lambda_1, \\ldots, \\lambda_n)"}),` der Vektor der Eigenwerte
von `,e.jsx(n,{children:"\\bA^\\top\\bA"}),". Die ",e.jsx(i.em,{children:"Schatten-p-Norm"})," von ",e.jsx(n,{children:"\\bA"}),` ist
für `,e.jsx(n,{children:"1 \\leq p < \\infty"})]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_{S,p} := \\left\\| \\blambda^{1/2} \\right\\|_p = \\left( \\sum_{i=1}^n \\lambda_i^{p/2} \\right)^{1/p} = \\left( \\sum_{i=1}^n \\sigma_i^p \\right)^{1/p}"}),e.jsxs(i.p,{children:["und für ",e.jsx(n,{children:"p = \\infty"})]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_{S,\\infty} := \\max_{1 \\leq i \\leq n} \\sigma_i = \\sigma_1."})]}),`
`,e.jsx(g,{kind:"Bemerkung",label:"3.4.2",id:"env-bemerkung-3-4-2",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`Das Bauprinzip ist dasselbe wie bei der Vektorisierung in
`,e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),`: „Wende eine
Vektor-p-Norm an." Nur wenden wir sie nicht auf die rohen Einträge
`,e.jsx(n,{children:"\\vec(\\bA)"}),` an, sondern auf den Singulärwertvektor, also auf die
geometrische Wirkung der Matrix statt auf ihre Zahlen.`]}),`
`,e.jsxs(i.li,{children:["Der Fall ",e.jsx(n,{children:"p = \\infty"}),` fügt sich nahtlos ein: Wie bei Vektornormen ist
die Maximumsnorm der Grenzwert der `,e.jsx(n,{children:"p"}),`-Normen für
`,e.jsx(n,{children:"p \\to \\infty"}),"."]}),`
`,e.jsxs(i.li,{children:[`Schatten-p-Normen erfüllen tatsächlich alle drei Normaxiome aus
`,e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),`. Definitheit und
absolute Homogenität lassen sich direkt nachrechnen; die Dreiecksungleichung ist
überraschend knifflig, wir verzichten hier auf den Beweis.`]}),`
`]})}),`
`,e.jsxs(i.h3,{id:"sec-die-drei-wichtigen-spezialfaelle",children:["3.4.2 ","Die drei wichtigen Spezialfälle"]}),`
`,e.jsxs(i.p,{children:["Drei Werte von ",e.jsx(n,{children:"p"}),` liefern genau die Normen, die in der Praxis dominieren,
und zwei davon kennen wir schon. Der Schlüssel zum überraschendsten Fall ist die
Verbindung zwischen Frobenius-Norm und
`,e.jsx(i.a,{href:"#sec-3.1",children:"Spur"}),":"]}),`
`,e.jsxs(g,{kind:"Satz",label:"3.4.3 (Frobenius-Norm und Spur)",id:"env-frobenius-norm-und-spur",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` mit
`,e.jsx(a,{id:"rank",children:"Rang"})," ",e.jsx(n,{children:"r"}),` und Eigenwerten
`,e.jsx(n,{children:"\\lambda_1 \\geq \\cdots \\geq \\lambda_r > 0"}),` von
`,e.jsx(n,{children:"\\bA^\\top\\bA"})," (alle übrigen sind null) gilt"]}),e.jsx(t,{children:"\\cblue{\\left\\| \\bA \\right\\|_F^2} = \\cred{\\tr\\left(\\bA^\\top\\bA\\right)} = \\cgreen{\\sum_{i=1}^r \\lambda_i}."})]}),`
`,e.jsxs(H,{children:[e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Der Diagonaleintrag ",e.jsx(n,{children:"(\\bA^\\top\\bA)_{jj}"})," ist das Skalarprodukt der ",e.jsx(n,{children:"j"}),"-ten Spalte von ",e.jsx(n,{children:"\\bA"})," mit sich selbst, also ",e.jsx(n,{children:"\\sum_{i=1}^m a_{ij}^2"}),"; Aufsummieren über alle ",e.jsx(n,{children:"j"})," ergibt die Summe aller quadrierten Einträge, genau die quadrierte Frobenius-Norm aus ",e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"})]}),children:e.jsx(t,{children:"\\cred{\\tr\\left(\\bA^\\top\\bA\\right)} = \\sum_{j=1}^n \\left(\\bA^\\top\\bA\\right)_{jj} = \\sum_{j=1}^n \\sum_{i=1}^m a_{ij}^2 = \\cblue{\\left\\| \\bA \\right\\|_F^2}"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Spektralzerlegung ",e.jsx(n,{children:"\\bA^\\top\\bA = \\bP\\bLambda\\bP^\\top"})," mit ",e.jsx(a,{id:"orthogonal-matrix",children:"orthogonalem"})," ",e.jsx(n,{children:"\\bP"})," und ",e.jsx(n,{children:"\\bLambda = \\diag(\\lambda_1, \\ldots, \\lambda_r, 0, \\ldots, 0)"}),"; dann Zyklizität der Spur aus ",e.jsx(i.a,{href:"#sec-3.1",children:"Abschnitt 3.1"})," und ",e.jsx(n,{children:"\\bP^\\top\\bP = \\bI"})]}),children:e.jsx(t,{children:"\\cred{\\tr\\left(\\bA^\\top\\bA\\right)} = \\tr\\left(\\bP\\bLambda\\bP^\\top\\right) = \\tr\\left(\\bLambda\\bP^\\top\\bP\\right) = \\tr(\\bLambda) = \\cgreen{\\sum_{i=1}^r \\lambda_i}"})})]}),`
`,e.jsx(i.p,{children:"Damit fallen die Spezialfälle wie reife Früchte:"}),`
`,e.jsx(g,{kind:"Korollar",label:"3.4.4 (Spezialfälle der Schatten-p-Norm)",id:"env-spezialfaelle-der-schatten-p-norm",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"p = \\infty"}),`:
`,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_{S,\\infty} = \\sigma_1 = \\sqrt{\\lambda_{\\max}} = \\left\\| \\bA \\right\\|_2"}),`,
die `,e.jsx(i.strong,{children:"Spektralnorm"}),` aus
`,e.jsx(i.a,{href:"#sec-3.3",children:"Abschnitt 3.3"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"p = 2"}),`:
`,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_{S,2} = \\left(\\sum_{i} \\lambda_i\\right)^{1/2} = \\sqrt{\\tr\\left(\\bA^\\top\\bA\\right)} = \\left\\| \\bA \\right\\|_F"}),`,
die `,e.jsx(i.strong,{children:"Frobenius-Norm"})," (nach ",e.jsx(i.a,{href:"#env-frobenius-norm-und-spur",children:"Satz 3.4.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"p = 1"}),`:
`,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_{S,1} = \\sum_{i=1}^r \\sigma_i =: \\left\\| \\bA \\right\\|_*"}),`,
die `,e.jsx(i.em,{children:"Nuklearnorm"})," (nuclear norm), für uns neu."]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Der Fall ",e.jsx(n,{children:"p = 2"}),` ist eine echte Überraschung. Die Frobenius-Norm hatten wir
in `,e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),` als elementweise Norm
eingeführt, als Musterbeispiel einer Norm, die von der Transformation nichts weiß.
Jetzt stellt sich heraus: Sie ist zugleich eine Schatten-Norm, also vollständig durch
die Singulärwerte bestimmt. Sie weiß mehr über die Transformation, als ihre Definition
vermuten lässt. Das erklärt auch im Nachhinein das Beispiel aus `,e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),`, in dem
drei völlig verschiedene Transformationen dieselbe Frobenius-Norm hatten: Ihre
quadrierten Singulärwerte summierten sich jeweils zu `,e.jsx(n,{children:"2"}),"."]}),`
`,e.jsx(P,{title:"Nuklearnorm und Niedrigrang-Probleme",children:e.jsx(g,{kind:"Bemerkung",label:"3.4.5 (Nuklearnorm und Niedrigrang-Probleme)",id:"env-nuklearnorm-und-niedrigrang-probleme",children:e.jsxs(i.p,{children:[`Warum eine dritte Norm, wenn wir schon zwei haben? Der
`,e.jsx(a,{id:"rank",children:"Rang"})," von ",e.jsx(n,{children:"\\bA"}),` ist die Anzahl der
Singulärwerte `,e.jsx(n,{children:"\\sigma_i > 0"}),`. Rang-Minimierung ist ein kombinatorisch
schwieriges Problem; die Nuklearnorm `,e.jsx(n,{children:"\\sum_i \\sigma_i"}),` ist dagegen
konvex und wird klein, wenn viele Singulärwerte (nahezu) verschwinden. Sie dient
deshalb in Statistik und maschinellem Lernen als gutmütiger Ersatz für den Rang,
etwa bei der
`,e.jsx(a,{id:"low-rank-approximation",children:"Niedrigrang-Approximation"}),`
und beim Vervollständigen von Matrizen mit fehlenden Einträgen
(Empfehlungssysteme).`]})})}),`
`,e.jsxs(i.p,{children:[`Rechnen wir die drei Normen einmal konkret aus, und zwar für die Matrix, deren
Streckung wir in `,e.jsx(i.a,{href:"#sec-3.3",children:"Abschnitt 3.3"}),`
visualisiert haben.`]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.4.6",id:"env-beispiel-3-4-6",children:[e.jsxs(i.p,{children:[`Sei
`,e.jsx(n,{children:"\\bA = \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix}"}),`. Zuerst die
Eigenwerte von `,e.jsx(n,{children:"\\bA^\\top\\bA"}),":"]}),e.jsx(t,{children:"\\bA^\\top\\bA = \\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix}\\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 4 & 2 \\\\ 2 & 2 \\end{pmatrix},"}),e.jsx(t,{children:"\\det\\left(\\bA^\\top\\bA - \\lambda\\bI\\right) = (4 - \\lambda)(2 - \\lambda) - 4 = \\lambda^2 - 6\\lambda + 4 \\overset{!}{=} 0"}),e.jsx(t,{children:"\\quimpl \\cred{\\lambda_1} = 3 + \\sqrt{5} \\approx 5{,}236, \\qquad \\cblue{\\lambda_2} = 3 - \\sqrt{5} \\approx 0{,}764."}),e.jsx(i.p,{children:"Die Singulärwerte sind die Wurzeln daraus:"}),e.jsx(t,{children:"\\cred{\\sigma_1} = \\sqrt{3 + \\sqrt{5}} \\approx 2{,}288, \\qquad \\cblue{\\sigma_2} = \\sqrt{3 - \\sqrt{5}} \\approx 0{,}874."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Spektralnorm"})," (",e.jsx(n,{children:"p = \\infty"}),"): der größte Singulärwert,"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_{S,\\infty} = \\cred{\\sigma_1} \\approx 2{,}288."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Frobenius-Norm"})," (",e.jsx(n,{children:"p = 2"}),`): über die Singulärwerte und,
zur Probe, `,e.jsx(i.em,{children:"elementweise"}),`, beides muss
nach `,e.jsx(i.a,{href:"#env-spezialfaelle-der-schatten-p-norm",children:"Korollar 3.4.4"})," dasselbe ergeben:"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_{S,2} = \\sqrt{\\cred{\\lambda_1} + \\cblue{\\lambda_2}} = \\sqrt{6}, \\qquad \\cgreen{\\sqrt{2^2 + 1^2 + 0^2 + 1^2}} = \\sqrt{6} \\approx 2{,}449. \\quad \\checkmark"}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Nuklearnorm"})," (",e.jsx(n,{children:"p = 1"}),"): die Summe der Singulärwerte:"]}),e.jsx(t,{children:"\\left\\| \\bA \\right\\|_{S,1} = \\cred{\\sigma_1} + \\cblue{\\sigma_2} = \\sqrt{10} \\approx 3{,}162."}),e.jsx(i.p,{children:"In R genügt für die Singulärwerte ein Einzeiler:"}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`A <- matrix(c(2, 0, 1, 1), 2, 2)
sqrt(eigen(crossprod(A))$values)
#> [1] 2.288246 0.874032
`})})]}),`
`,e.jsxs(i.h3,{id:"sec-unitaere-invarianz",children:["3.4.3 ","Unitäre Invarianz"]}),`
`,e.jsxs(i.p,{children:[`Was macht die Schatten-Familie so besonders? Drehen wir eine Matrix (genauer:
multiplizieren wir sie mit einer
`,e.jsx(a,{id:"orthogonal-matrix",children:"Orthogonalmatrix"}),`), dann ändern
sich ihre Einträge komplett. Elementweise Normen wie Summen- oder Maximumsnorm ändern
sich mit. Die Streckungswirkung der Transformation bleibt aber dieselbe, nur die
Richtungen rotieren. Da Schattennormen ausschließlich von den Streckungsfaktoren
abhängen, dürfen sie sich nicht ändern – und das lässt sich beweisen:`]}),`
`,e.jsxs(g,{kind:"Satz",label:"3.4.7 (Unitäre Invarianz)",id:"env-unitaere-invarianz",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bP \\in \\R^{m \\times m}"})," und ",e.jsx(n,{children:"\\bQ \\in \\R^{n \\times n}"}),`
orthogonal. Dann gilt für alle `,e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` und alle
`,e.jsx(n,{children:"p \\in [1, \\infty]"}),":"]}),e.jsx(t,{children:"\\left\\| \\bP\\bA\\bQ \\right\\|_{S,p} = \\left\\| \\bA \\right\\|_{S,p}."})]}),`
`,e.jsx(P,{title:"Beweis der unitären Invarianz",children:e.jsxs(H,{children:[e.jsx(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(a,{id:"transpose",children:"Transponierregel"})," ",e.jsx(n,{children:"(\\bB\\bC)^\\top = \\bC^\\top\\bB^\\top"})," und Orthogonalität ",e.jsx(n,{children:"\\bP^\\top\\bP = \\bI"})]}),children:e.jsx(t,{children:"(\\bP\\bA\\bQ)^\\top(\\bP\\bA\\bQ) = \\bQ^\\top\\bA^\\top\\bP^\\top\\bP\\bA\\bQ = \\bQ^\\top\\left(\\bA^\\top\\bA\\right)\\bQ"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bQ^\\top = \\bQ^{-1}"}),", also ist ",e.jsx(n,{children:"\\bQ^\\top\\left(\\bA^\\top\\bA\\right)\\bQ"})," ",e.jsx(a,{id:"similar-matrices",children:"ähnlich"})," zu ",e.jsx(n,{children:"\\bA^\\top\\bA"}),", und ähnliche Matrizen haben dasselbe charakteristische Polynom: ",e.jsx(n,{children:"\\det\\left(\\bQ^\\top\\bM\\bQ - \\lambda\\bI\\right) = \\det\\left(\\bQ^\\top(\\bM - \\lambda\\bI)\\bQ\\right) = \\det(\\bM - \\lambda\\bI)"})]}),children:e.jsxs(i.p,{children:[e.jsx(n,{children:"(\\bP\\bA\\bQ)^\\top(\\bP\\bA\\bQ)"})," und ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` haben
dieselben Eigenwerte `,e.jsx(n,{children:"\\lambda_1, \\ldots, \\lambda_n"}),"."]})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Schatten-p-Normen hängen nach ",e.jsx(i.a,{href:"#env-schatten-p-norm",children:"Definition 3.4.1"})," nur vom Eigenwertvektor ",e.jsx(n,{children:"\\blambda"})," ab"]}),children:e.jsxs(i.p,{children:["Also haben ",e.jsx(n,{children:"\\bP\\bA\\bQ"})," und ",e.jsx(n,{children:"\\bA"}),` dieselben Singulärwerte
und damit dieselbe Schatten-p-Norm, für jedes `,e.jsx(n,{children:"p"})," gleichzeitig."]})})]})}),`
`,e.jsxs(i.p,{children:[`Eine bemerkenswerte Konsequenz für die Frobenius-Norm: Ihrer elementweisen Definition
sieht man die Invarianz
`,e.jsx(n,{children:"\\left\\| \\bP\\bA\\bQ \\right\\|_F = \\left\\| \\bA \\right\\|_F"}),`
überhaupt nicht an; erst der Umweg über `,e.jsx(i.a,{href:"#env-spezialfaelle-der-schatten-p-norm",children:"Korollar 3.4.4"}),` macht sie offensichtlich. Für
Summen- und Maximumsnorm gilt nichts dergleichen.`]}),`
`,e.jsx(P,{title:"Robert Schatten und Approximationsprobleme",children:e.jsx(g,{kind:"Bemerkung",label:"3.4.8 (Namensgeber und Anwendung)",id:"env-namensgeber-und-anwendung",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Benannt sind die Normen nach dem Mathematiker ",e.jsx(i.em,{children:"Robert Schatten"}),`
(1911–1977), der sie im Kontext unendlichdimensionaler Operatoren untersuchte.`]}),`
`,e.jsxs(i.li,{children:[`Die unitäre Invarianz macht Schattennormen zum Werkzeug der Wahl für
`,e.jsx(i.em,{children:"Approximationsprobleme"}),`: Wie gut eine Matrix eine andere approximiert,
sollte nicht davon abhängen, in welchem (orthogonalen) Koordinatensystem wir die
Daten aufschreiben. Messen wir Approximationsfehler in einer Schatten-Norm, ist
genau das garantiert. Darauf kommen wir bei der Niedrigrang-Approximation
zurück.`]}),`
`]})})}),`
`,e.jsxs(oe,{title:"Was überlebt eine Drehung? Schattennormen gegen elementweise Normen",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-unitaere-invarianz",children:"Satz 3.4.7"}),` ist damit bewiesen, aber noch nicht wirklich geglaubt. Eine Drehung schreibt ja
jeden einzelnen Eintrag der Matrix um. Welche der Zahlen, die wir aus einer Matrix ablesen
können, überstehen das unverändert, und welche wandern mit?`]}),e.jsx(li,{}),e.jsxs(i.p,{children:[`Die Antwort teilt unsere Normen sauber in zwei Lager. Ellipse, Halbachsen und alles, was
aus ihnen gebaut ist – Spektral-, Frobenius- und Nuklearnorm – stehen still, während die
Einträge von `,e.jsx(n,{children:"\\bQ_\\theta\\bA"}),` munter durchwechseln; die gemeldete Abweichung über den
durchfahrenen Drehbereich ist reines Rundungsrauschen in der Größenordnung
`,e.jsx(n,{children:"10^{-16}"}),`. Summen- und Maximumsnorm dagegen bewegen sich sichtbar mit. Sie sind eben
elementweise definiert, und die Einträge sind genau das, was eine Drehung ändert.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs("ul",{className:"max-w-prose list-disc space-y-3 pl-5",children:[e.jsx(un,{q:e.jsxs(e.Fragment,{children:["Sei ",e.jsx(n,{children:"\\bQ \\in \\R^{n \\times n}"})," orthogonal. Was sind die Singulärwerte von ",e.jsx(n,{children:"\\bQ"}),", und damit ihre Spektral-, Frobenius- und Nuklearnorm?"]}),children:e.jsxs(i.p,{children:["Wegen ",e.jsx(n,{children:"\\bQ^\\top\\bQ = \\bI"}),` sind alle Eigenwerte von
`,e.jsx(n,{children:"\\bQ^\\top\\bQ"})," gleich ",e.jsx(n,{children:"1"}),`, also
`,e.jsx(n,{children:"\\sigma_1 = \\cdots = \\sigma_n = 1"}),`. Damit ist
`,e.jsx(n,{children:"\\left\\| \\bQ \\right\\|_{S,\\infty} = 1"}),`,
`,e.jsx(n,{children:"\\left\\| \\bQ \\right\\|_{S,2} = \\sqrt{n}"}),` und
`,e.jsx(n,{children:"\\left\\| \\bQ \\right\\|_{S,1} = n"}),`. Das passt zu
`,e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),`: Auch dort war
`,e.jsx(n,{children:"\\left\\| \\bI_n \\right\\|_F = \\sqrt{n}"}),`; nur die Spektralnorm
honoriert, dass eine Orthogonalmatrix „nichts streckt".`]})}),e.jsx(un,{q:e.jsx(e.Fragment,{children:'Warum kann man die Nuklearnorm als „weiche" Version des Rangs auffassen?'}),children:e.jsxs(i.p,{children:["Der Rang ist die ",e.jsx(i.em,{children:"Anzahl"})," der Singulärwerte ",e.jsx(n,{children:"\\sigma_i > 0"}),`,
eine Zählgröße, die springt, sobald ein Singulärwert exakt null wird, und die
sich deshalb schlecht optimieren lässt. Die Nuklearnorm
`,e.jsx(n,{children:"\\sum_i \\sigma_i"}),` ersetzt das Zählen durch Summieren: Sie ist als Norm
konvex und wird genau dann klein, wenn viele Singulärwerte nahe null liegen,
also wenn die Matrix „fast niedrigen Rang" hat.`]})})]}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(we,{children:[e.jsxs(ke,{loesung:3.162,toleranz:.01,children:[e.jsxs(i.p,{children:["Drehen wir im Schattennorm-Widget den Regler von ",e.jsx(n,{children:"0^\\circ"})," auf ",e.jsx(n,{children:"90^\\circ"}),` (die Matrix
bleibt die aus `,e.jsx(i.a,{href:"#env-beispiel-3-4-6",children:"Beispiel 3.4.6"}),`). Welchen Wert zeigt es dann für die Nuklearnorm
`,e.jsx(n,{children:"\\left\\|\\bQ_\\theta\\bA\\right\\|_{S,1}"}),"?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"3{,}162 = \\sqrt{10} = \\sigma_1 + \\sigma_2"}),", denselben Wert wie bei ",e.jsx(n,{children:"0^\\circ"}),`. Alle vier
Einträge der Matrix sind unterwegs andere geworden, die Singulärwerte nicht: Das ist
`,e.jsx(i.a,{href:"#env-unitaere-invarianz",children:"Satz 3.4.7"})," an einer konkreten Zahl."]})]}),e.jsxs(T,{wahr:!1,children:[e.jsx(i.p,{children:"Weil die Drehung eine Isometrie ist, bleibt im Widget jede der angezeigten Normen konstant."}),e.jsxs(i.p,{children:[`Konstant bleiben nur die Schattennormen, die aus den Singulärwerten gebaut sind. Summen- und
Maximumsnorm lesen die Einträge ab und wandern mit; bei `,e.jsx(n,{children:"\\theta = 45^\\circ"}),` etwa steigt die
Summennorm von `,e.jsx(n,{children:"4{,}000"})," auf ",e.jsx(n,{children:"4{,}243"}),". ",e.jsx(i.a,{href:"#env-unitaere-invarianz",children:"Satz 3.4.7"}),` gilt für Schattennormen, nicht für alle
Matrixnormen.`]})]})]})}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: MML §4.5 (SVD-Bezug: dort werden die Singulärwerte, auf denen die
Schattennormen aufbauen, über die Singulärwertzerlegung systematisch entwickelt).`})})]})}function ai(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(An,{...r})}):An(r)}const Se=V.rot,je=V.blau,ye=V.grau,Be=Math.SQRT2,vn=1.2,Me=300,sn=34,En=30,Bn=14,di=14,W=2.6,en=Me-sn-di,nn=Me-Bn-En,N=r=>sn+r/W*en,D=r=>Me-En-r/W*nn,hi=[{name:"Rang 1",titel:"σ₂ = 0: die linke Schranke wird angenommen",s:[1.2,0]},{name:"Vielfaches von I₂",titel:"σ₁ = σ₂: die rechte Schranke wird angenommen",s:[1.2,1.2]},{name:"dazwischen",titel:"beide Ungleichungen sind echt",s:[1.6,.8]}];function ci(){const[r,i]=q.useState(1.6),[s,m]=q.useState(.8),h=r,d=Math.hypot(r,s),b=r+s,j=h>1e-9?d/h:1,_=c=>{const A=pe(c,.2,W);i(A),s>A&&m(A)},F=c=>m(pe(c,0,r)),S=Mn({feld:{x0:sn,y0:Bn,w:en,h:nn},welt:{x0:0,x1:W,y0:0,y1:W},clamp:([c,A])=>{const I=pe(c,.2,W);return[I,pe(A,0,I)]},greifPosition:()=>[r,s],onDrag:([c,A])=>{i(Math.round(c*20)/20),m(Math.round(A*20)/20)}}),f=Math.abs(r-s)<1e-6,E=s<1e-6,w=h<vn&&d>vn,u=240,y=(j-1)/(Be-1)*u;return e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs(xe,{children:["Ziehen wir den Punkt ",e.jsx(n,{children:"(\\sigma_1, \\sigma_2)"})," einmal auf die Winkelhalbierende und einmal hinunter auf die waagerechte Achse."]}),e.jsxs("p",{className:`max-w-prose text-xs ${U}`,children:[e.jsx("span",{style:{color:ye},children:"grau"})," der zulässige Bereich"," ",e.jsx(n,{children:"\\sigma_1 \\ge \\sigma_2 \\ge 0"})," mit seinen beiden Rändern,"," ",e.jsx("span",{style:{color:Se},children:"rot"})," die Spektralnorm"," ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\sigma_1"}),","," ",e.jsx("span",{style:{color:je},children:"blau"})," die Frobenius-Norm"," ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F"}),". Wir rechnen mit"," ",e.jsx(n,{children:"\\bA = \\operatorname{diag}(\\sigma_1, \\sigma_2)"}),"; jede andere Matrix mit denselben Singulärwerten liefert dieselben Zahlen."]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:hi.map(c=>{const A=Math.abs(c.s[0]-r)<1e-9&&Math.abs(c.s[1]-s)<1e-9;return e.jsx("button",{type:"button",title:c.titel,"aria-pressed":A,className:`text-xs ${A?Ne:te}`,onClick:()=>{i(c.s[0]),m(c.s[1])},children:c.name},c.name)})}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx("div",{className:"min-w-0",children:e.jsxs("svg",{viewBox:`0 0 ${Me} ${Me}`,className:"max-w-full h-auto rounded",role:"img","aria-label":`Die Singulärwerte als Punkt im zulässigen Keil; der Quotient aus Frobenius- und Spektralnorm beträgt ${l(j,3)}.`,...S.svgProps,style:{...S.svgProps.style,background:"var(--w-bg)",border:"1px solid var(--w-border)"},children:[e.jsx("polygon",{points:`${N(0)},${D(0)} ${N(W)},${D(0)} ${N(W)},${D(W)}`,fill:ye,fillOpacity:.12}),e.jsx("line",{x1:N(0),y1:D(0),x2:N(W),y2:D(W),stroke:ye,strokeWidth:1.6}),e.jsx("line",{x1:N(0),y1:D(0),x2:N(W),y2:D(0),stroke:"var(--w-axis)",strokeWidth:1.2}),e.jsx("line",{x1:N(0),y1:D(0),x2:N(0),y2:D(W),stroke:"var(--w-axis)",strokeWidth:1.2}),[1,2].map(c=>e.jsxs("g",{children:[e.jsx("line",{x1:N(c),y1:D(0),x2:N(c),y2:D(0)+4,stroke:"var(--w-axis)"}),e.jsx("text",{x:N(c),y:D(0)+15,fontSize:10,fill:"var(--w-muted)",textAnchor:"middle",children:c}),e.jsx("line",{x1:N(0)-4,y1:D(c),x2:N(0),y2:D(c),stroke:"var(--w-axis)"}),e.jsx("text",{x:N(0)-7,y:D(c)+3,fontSize:10,fill:"var(--w-muted)",textAnchor:"end",children:c})]},`t${c}`)),e.jsx("text",{x:N(W),y:D(0)+26,fontSize:11,fill:"var(--w-muted)",textAnchor:"end",children:"σ₁"}),e.jsx("text",{x:N(0)-26,y:D(W)+4,fontSize:11,fill:"var(--w-muted)",children:"σ₂"}),e.jsx("text",{x:N(W)-4,y:D(W)+14,fontSize:10,fill:ye,textAnchor:"end",stroke:"var(--w-bg)",strokeWidth:2.5,paintOrder:"stroke",children:"σ₁ = σ₂: rechte Schranke scharf"}),e.jsx("text",{x:N(W)-4,y:D(0)-6,fontSize:10,fill:ye,textAnchor:"end",stroke:"var(--w-bg)",strokeWidth:2.5,paintOrder:"stroke",children:"σ₂ = 0: linke Schranke scharf"}),e.jsx("line",{x1:N(r),y1:D(s),x2:N(r),y2:D(0),stroke:Se,strokeWidth:1,strokeDasharray:"3 3"}),e.jsx("line",{x1:N(r),y1:D(s),x2:N(0),y2:D(s),stroke:je,strokeWidth:1,strokeDasharray:"3 3"}),d<=W&&e.jsx("path",{d:`M ${N(d)},${D(0)} A ${d/W*en},${d/W*nn} 0 0 0 ${N(d/Be)},${D(d/Be)}`,fill:"none",stroke:je,strokeWidth:1.6}),e.jsx(Nn,{x:N(r),y:D(s),r:5,farbe:Se,aktiv:S.dragging==="s",...S.handleProps("s")})]})}),e.jsxs("div",{className:"min-w-0 space-y-2",children:[e.jsx(ie,{label:"σ₁",value:r,onChange:_,min:.2,max:2.6,step:.05,accent:Se}),e.jsx(ie,{label:"σ₂",value:s,onChange:F,min:0,max:2.6,step:.05,accent:je}),e.jsxs("div",{className:`p-2 ${rn}`,children:[e.jsxs("div",{className:"mb-1 flex justify-between gap-3",children:[e.jsx("span",{children:e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F / \\left\\|\\bA\\right\\|_2"})}),e.jsx("span",{className:"font-mono tabular-nums",children:l(j,3)})]}),e.jsxs("svg",{viewBox:`0 0 ${u} 30`,className:"max-w-full h-auto",role:"img","aria-label":`Der Quotient liegt bei ${l(j,2)} auf der Skala von 1 bis Wurzel 2.`,children:[e.jsx("rect",{x:0,y:4,width:u,height:12,fill:"var(--w-grid)",rx:2}),e.jsx("rect",{x:0,y:4,width:Math.max(1,y),height:12,fill:je,rx:2}),e.jsx("text",{x:0,y:27,fontSize:9,fill:"var(--w-muted)",children:"1"}),e.jsx("text",{x:u,y:27,fontSize:9,fill:"var(--w-muted)",textAnchor:"end",children:"√2 ≈ 1,414"})]})]}),e.jsxs("div",{className:"space-y-0.5 font-mono text-xs",children:[e.jsxs("div",{style:{color:Se},children:["‖A‖₂ = ",l(h,3)]}),e.jsxs("div",{style:{color:je},children:["‖A‖_F = ",l(d,3)]}),e.jsxs("div",{className:U,children:["‖A‖⁎ = ",l(b,3)," (Nuklearnorm)"]}),e.jsxs("div",{className:U,children:["√2 · ‖A‖₂ = ",l(Be*h,3)]})]})]})]}),e.jsx(me,{kind:f||E?"warn":"ok",children:E?e.jsxs(e.Fragment,{children:["Hier ist ",e.jsx(n,{children:"\\sigma_2 = 0"}),", die Matrix hat Rang 1, und die beiden Normen fallen zusammen: ",e.jsx(n,{children:`\\left\\|\\bA\\right\\|_F = \\left\\|\\bA\\right\\|_2 = ${l(h,3).replace(",","{,}")}`}),". Die linke Ungleichung aus ",v("beispiel:explizite-aequivalenzkonstanten")," gilt also mit Gleichheit und lässt sich nicht verschärfen."]}):f?e.jsxs(e.Fragment,{children:["Beide Singulärwerte sind gleich, ",e.jsx(n,{children:"\\bA"})," ist ein Vielfaches der Einheitsmatrix. Jetzt steht rechts Gleichheit:"," ",e.jsx(n,{children:`\\left\\|\\bA\\right\\|_F = ${l(d,3).replace(",","{,}")} = \\sqrt{2}\\,\\left\\|\\bA\\right\\|_2`}),". Die Konstante ",e.jsx(n,{children:"\\sqrt{\\min(m,n)}"})," aus ",v("beispiel:explizite-aequivalenzkonstanten")," ist damit die kleinstmögliche."]}):e.jsxs(e.Fragment,{children:["Der Quotient liegt bei ",l(j,3),", also echt zwischen den beiden Schranken 1 und ",e.jsx(n,{children:"\\sqrt{2} \\approx 1{,}414"})," (",v("beispiel:explizite-aequivalenzkonstanten"),"). Je weiter der zweite Singulärwert zurückfällt, desto näher rücken Frobenius- und Spektralnorm zusammen.",w&&e.jsxs(e.Fragment,{children:[" ","Nebenbei: Für die Vergleichsmatrix ",e.jsx(n,{children:"\\bB"})," aus ",v("bemerkung:aequivalenz-ist-nicht-gleichheit")," ist"," ",e.jsx(n,{children:"\\left\\|\\bB\\right\\|_2 = \\left\\|\\bB\\right\\|_F = 1{,}2"}),". Beim aktuellen ",e.jsx(n,{children:"\\bA"})," ordnen die beiden Normen die zwei Matrizen also verschieden: In der Spektralnorm ist ",e.jsx(n,{children:"\\bB"})," die größere, in der Frobenius-Norm ",e.jsx(n,{children:"\\bA"}),"."]})]})})]})}const Ze=V.rot,_n=V.blau,qe=V.gruen,oi=V.grau;function xi(r,i){return[[r[0][0]*i[0][0]+r[0][1]*i[1][0],r[0][0]*i[0][1]+r[0][1]*i[1][1]],[r[1][0]*i[0][0]+r[1][1]*i[1][0],r[1][0]*i[0][1]+r[1][1]*i[1][1]]]}function Ce(r){const i=r[0][0]*r[0][0]+r[1][0]*r[1][0],s=r[0][0]*r[0][1]+r[1][0]*r[1][1],m=r[0][1]*r[0][1]+r[1][1]*r[1][1],h=(i+m)/2,d=Math.hypot((i-m)/2,s);return[Math.sqrt(Math.max(h+d,0)),Math.sqrt(Math.max(h-d,0))]}const Te=[{key:"spec",label:"Spektralnorm ‖·‖₂",art:"operator",fn:r=>Ce(r)[0]},{key:"one",label:"Spaltensummennorm ‖·‖₁",art:"operator",fn:r=>Math.max(Math.abs(r[0][0])+Math.abs(r[1][0]),Math.abs(r[0][1])+Math.abs(r[1][1]))},{key:"inf",label:"Zeilensummennorm ‖·‖∞",art:"operator",fn:r=>Math.max(Math.abs(r[0][0])+Math.abs(r[0][1]),Math.abs(r[1][0])+Math.abs(r[1][1]))},{key:"fro",label:"Frobenius-Norm ‖·‖F",art:"schatten",fn:r=>Math.hypot(r[0][0],r[0][1],r[1][0],r[1][1])},{key:"nuc",label:"Nuklearnorm ‖·‖⁎",art:"schatten",fn:r=>Ce(r)[0]+Ce(r)[1]},{key:"max",label:"Maximumsnorm ‖·‖M",art:"elementweise",fn:r=>Math.max(...r.flat().map(Math.abs))}];function Ve({label:r,value:i,color:s}){return e.jsxs("div",{className:"flex justify-between gap-4 py-0.5",style:{borderBottom:"1px solid var(--w-border)"},children:[e.jsx("span",{style:s?{color:s}:void 0,children:r}),e.jsx("span",{className:"font-mono tabular-nums",children:i})]})}function mi({m:r,color:i}){return e.jsx("div",{className:"inline-grid grid-cols-2 gap-x-2 gap-y-0.5 rounded border-x-2 px-2 py-1 font-mono text-xs tabular-nums",style:{borderColor:i},children:r.flat().map((s,m)=>e.jsx("span",{className:"text-right",children:l(s,2)},m))})}const We=[[1,1],[1,1]];function bi({normKey:r,setNormKey:i}){const[s,m]=q.useState(We.map(z=>[...z])),[h,d]=q.useState(We.map(z=>[...z])),{seed:b,neueStichprobe:j}=Qn(1),[_,F]=q.useState(!1),S=Te.find(z=>z.key===r)??Te[0],f=xi(s,h),E=S.fn(s),w=S.fn(h),u=S.fn(f),y=E*w,c=u<=y*(1+1e-12),A=c&&y>0&&u>=y*(1-1e-9),I=y>0?u/y:u>0?1/0:0,J=()=>{const z=Kn(b*7919),o=()=>Math.round((z()*4-2)*10)/10;m([[o(),o()],[o(),o()]]),d([[o(),o()],[o(),o()]]),F(!0),j()},Q=Math.min(1,Number.isFinite(I)?I/2:1);return e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs(xe,{children:["Wählen wir eine Norm und suchen wir ein Paar ",e.jsx(n,{children:"\\bA, \\bB"}),", für das der Balken über die 1 hinausschießt."]}),e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsxs("div",{className:"min-w-0 space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold italic",style:{color:Ze},children:"A ="}),e.jsx(fe,{value:s,onChange:m})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold italic",style:{color:_n},children:"B ="}),e.jsx(fe,{value:h,onChange:d})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold italic",style:{color:qe},children:"AB ="}),e.jsx(mi,{m:f,color:qe})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 pt-1",children:[e.jsxs("button",{type:"button",className:`text-xs ${te}`,onClick:()=>{m(We.map(z=>[...z])),d(We.map(z=>[...z])),F(!1)},children:["Einsermatrix (",v("beispiel:die-maximumsnorm-ist-nicht"),")"]}),e.jsx("button",{type:"button",className:`text-xs ${te}`,onClick:J,children:"andere Zufallsmatrizen"})]})]}),e.jsxs("div",{className:"min-w-[16rem] grow basis-64",children:[e.jsx("div",{className:"mb-2 flex flex-wrap gap-1.5",children:Te.map(z=>e.jsx("button",{type:"button","aria-pressed":z.key===r,onClick:()=>i(z.key),className:`text-xs ${z.key===r?Ne:te}`,children:z.label},z.key))}),e.jsxs("div",{className:`p-2 ${rn}`,children:[e.jsx(Ve,{label:"‖A‖",value:l(E,3),color:Ze}),e.jsx(Ve,{label:"‖B‖",value:l(w,3),color:_n}),e.jsx(Ve,{label:"‖A‖ · ‖B‖",value:l(y,3)}),e.jsx(Ve,{label:"‖AB‖",value:l(u,3),color:qe}),e.jsxs("div",{className:"pt-2",children:[e.jsxs("div",{className:"mb-1 flex justify-between gap-4",children:[e.jsx("span",{children:"Quotient ‖AB‖ / (‖A‖·‖B‖)"}),e.jsx("span",{className:"font-mono tabular-nums",children:l(I,3)})]}),e.jsxs("svg",{viewBox:"0 0 200 26",className:"max-w-full h-auto",role:"img","aria-label":`Quotient ${l(I,2)}; die Schranke 1 liegt in der Mitte des Balkens.`,children:[e.jsx("rect",{x:0,y:5,width:200,height:12,fill:"var(--w-grid)",rx:2}),e.jsx("rect",{x:0,y:5,width:Math.max(1,200*Q),height:12,fill:c?qe:Ze,rx:2}),e.jsx("line",{x1:100,y1:1,x2:100,y2:25,stroke:"var(--w-text)",strokeWidth:1.5}),e.jsx("text",{x:103,y:20,fontSize:9,fill:"var(--w-muted)",children:"1"})]})]})]})]})]}),e.jsx(me,{kind:c?A?"warn":"ok":"fail",children:c?A?e.jsxs(e.Fragment,{children:["Hier steht Gleichheit: ",e.jsx(n,{children:"\\left\\|\\bA\\bB\\right\\| = \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bB\\right\\|"})," ","= ",l(u,3),'. Submultiplikativität verlangt „höchstens", nicht „echt kleiner" (',v("definition:submultiplikative-matrixnorm"),") – die Schranke aus ",v("satz:operatornormen-sind-submultiplikativ")," ist also scharf und lässt sich nicht verbessern."]}):e.jsxs(e.Fragment,{children:["Erfüllt, mit Luft: ",l(u,3)," ≤ ",l(y,3),", der Quotient liegt bei"," ",l(I,3),". Für ",S.art==="operator"?`Operatornormen ist das ${v("satz:operatornormen-sind-submultiplikativ")}`:`die Schattennormen halten wir das Resultat in ${v("sec:submultiplikativitaet")} ohne Beweis fest`,_?"; über die Zufallspaare dieses Widgets bleibt der Quotient in dieser Norm stets unter 1":"",". Wie viel Luft bleibt, hängt davon ab, wie gut die Streckrichtungen von ",e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bB"})," zusammenpassen."]}):e.jsxs(e.Fragment,{children:["Verletzt: ",e.jsx(n,{children:"\\left\\|\\bA\\bB\\right\\| ="})," ",l(u,3)," ",">"," ",l(y,3)," ",e.jsx(n,{children:"= \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bB\\right\\|"}),". Die Maximumsnorm liest nur den größten Eintrag ab und übersieht, dass beim Matrixprodukt aufsummiert wird (",v("beispiel:die-maximumsnorm-ist-nicht"),"). ",v("satz:operatornormen-sind-submultiplikativ")," gilt für Operatornormen, und diese Norm ist keine. Reparieren lässt sich der Defekt mit dem Faktor"," ",e.jsx(n,{children:"\\sqrt{mn}"})," (",v("bemerkung:reparatur-die-gesamtnorm"),")."]})}),e.jsxs("p",{className:`text-xs ${U}`,children:[e.jsx("span",{style:{color:oi},children:"Hinweis:"})," Der Würfelknopf zieht seine Zahlen aus einem geseedeten Generator, dasselbe Widget zeigt also bei jedem Leser dieselbe Folge von Beispielen."]})]})}function ui(){const[r,i]=q.useState("spec");return e.jsx(yn,{frage:"Gilt ‖AB‖ ≤ ‖A‖·‖B‖ für jede Matrixnorm, oder gibt es Normen, die diese Schranke reißen?",variante:"auswahl",loesung:"gegenbeispiel",optionen:[{id:"immer",text:"die Schranke gilt immer"},{id:"gegenbeispiel",text:"es gibt Normen, die sie reißen"}],verdeckt:e.jsxs("p",{className:"max-w-prose text-sm",children:["Die Normwahl steht jetzt auf der Maximumsnorm. Mit der Schaltfläche können wir die Einsermatrix aus ",v("beispiel:die-maximumsnorm-ist-nicht")," einstellen."]}),onAufloesen:()=>i("max"),children:e.jsx(bi,{normKey:r,setNormKey:i})})}function He({q:r,children:i}){return e.jsxs("li",{className:"space-y-1",children:[e.jsx("div",{children:r}),e.jsxs("details",{className:"rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300",children:"Lösung anzeigen"}),e.jsx("div",{className:"pt-1.5",children:i})]})]})}function zn(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In den Abschnitten ",e.jsx(i.a,{href:"#sec-3.2",children:"3.2"})," bis ",e.jsx(i.a,{href:"#sec-3.4",children:"3.4"}),` haben wir einen ganzen Zoo von
Matrixnormen kennengelernt: elementweise Normen wie die Frobenius- und die Maximumsnorm,
die Operatornormen und die Schatten-Normen. Drei Fragen drängen sich jetzt auf. Erstens:
Wie hängen all diese Normen zusammen? Kann dieselbe Matrix in einer Norm „klein" und in
einer anderen „riesig" sein? Zweitens: Wie verhalten sich Matrixnormen unter der
wichtigsten Matrixoperation überhaupt, der Multiplikation? Und drittens: Was haben wir
davon? Die Antworten auf die ersten beiden Fragen heißen `,e.jsx(i.em,{children:"Normenäquivalenz"}),`,
`,e.jsx(i.em,{children:"Submultiplikativität"})," und ",e.jsx(i.em,{children:"Verträglichkeit"}),`; die Antwort auf die dritte
führt uns zur `,e.jsx(a,{id:"condition-number",children:"Konditionszahl"}),` und zur
Fehleranalyse, also mitten hinein in die Numerik.`]}),`
`,e.jsxs(i.h3,{id:"sec-normenaequivalenz",children:["3.5.1 ","Normenäquivalenz"]}),`
`,e.jsxs(i.p,{children:["Beginnen wir mit der ersten Frage. Für ",e.jsx(a,{id:"norm",children:"Vektornormen"}),`
auf `,e.jsx(n,{children:"\\R^n"}),` gilt bekanntlich: Alle Normen sind äquivalent, d. h. je zwei Normen
schätzen sich gegenseitig bis auf konstante Faktoren ab. Weil Matrixnormen auf
`,e.jsx(n,{children:"\\R^{m \\times n}"}),` denselben Axiomen gehorchen (eine Matrix ist aus Sicht der
Normaxiome nur ein langer Vektor mit `,e.jsx(n,{children:"mn"}),` Einträgen), überträgt sich dieses
Resultat direkt:`]}),`
`,e.jsxs(g,{kind:"Satz",label:"3.5.1 (Alle Matrixnormen sind äquivalent)",id:"env-alle-matrixnormen-sind-aequivalent",children:[e.jsxs(i.p,{children:["Für je zwei Matrixnormen ",e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_a"}),` und
`,e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_b"})," auf ",e.jsx(n,{children:"\\R^{m \\times n}"}),` (bei festen
`,e.jsx(n,{children:"m, n"}),") existieren Konstanten ",e.jsx(n,{children:"c, C > 0"})," mit"]}),e.jsx(t,{children:"c\\left\\|\\bA\\right\\|_a \\le \\left\\|\\bA\\right\\|_b \\le C\\left\\|\\bA\\right\\|_a \\quad \\text{für alle } \\bA \\in \\R^{m \\times n}."})]}),`
`,e.jsxs(i.p,{children:[`Der Beweis läuft wie im Vektorfall über ein Kompaktheitsargument (jede Norm ist als
Funktion stetig und nimmt auf der Einheitssphäre einer Referenznorm ihr Minimum und
Maximum an); wir übernehmen das Resultat hier ohne Beweis. Interessanter für die Praxis
ist, `,e.jsx(i.em,{children:"wie groß"}),` die Konstanten für die konkreten Normen aus den letzten
Abschnitten ausfallen:`]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.5.2 (Explizite Äquivalenzkonstanten)",id:"env-explizite-aequivalenzkonstanten",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," gilt unter anderem:"]}),e.jsx(t,{children:"\\left\\|\\bA\\right\\|_2 \\le \\left\\|\\bA\\right\\|_F \\le \\sqrt{\\min(m,n)}\\, \\left\\|\\bA\\right\\|_2,"}),e.jsx(t,{children:"\\left\\|\\bA\\right\\|_F \\le \\left\\|\\bA\\right\\|_* \\le \\sqrt{\\min(m,n)}\\, \\left\\|\\bA\\right\\|_F,"}),e.jsx(t,{children:"\\tfrac{1}{\\sqrt{n}} \\left\\|\\bA\\right\\|_\\infty \\le \\left\\|\\bA\\right\\|_2 \\le \\sqrt{m}\\, \\left\\|\\bA\\right\\|_\\infty."}),e.jsxs(i.p,{children:["(",e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_\\infty"}),` ist hier die Zeilensummennorm aus
`,e.jsx(i.a,{href:"#sec-3.3",children:"Abschnitt 3.3"}),`, nicht zu verwechseln mit
der elementweisen Maximumsnorm `,e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_M"}),`.) Die Konstanten
hängen also nur über die Dimensionen `,e.jsx(n,{children:"m, n"}),` von der Matrix ab,
und sie wachsen mit der Dimension. Für sehr große Matrizen können zwei Normen also
durchaus um Größenordnungen auseinanderliegen.`]})]}),`
`,e.jsxs(P,{title:"Beweis der Kette zwischen Spektral- und Frobenius-Norm",children:[e.jsxs(i.p,{children:[`Die erste Kette können wir mit dem Schatten-Blick aus
`,e.jsx(i.a,{href:"#sec-3.4",children:"Abschnitt 3.4"}),` vollständig beweisen. Dort
haben wir gesehen: Sind `,e.jsx(n,{children:"\\lambda_1 \\ge \\cdots \\ge \\lambda_r > 0"}),` die
positiven `,e.jsx(a,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` von
`,e.jsx(n,{children:"\\bA^\\top\\bA"})," (mit ",e.jsx(n,{children:"r = \\rang(\\bA)"}),`), so ist
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\sqrt{\\cred{\\lambda_1}}"}),` und
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F = \\sqrt{\\cgreen{\\sum_{i=1}^r \\lambda_i}}"}),`. Wir
verfolgen `,e.jsx(n,{children:"\\cred{\\lambda_1}"})," rot und die Eigenwertsumme grün:"]}),e.jsxs(H,{children:[e.jsx(p,{why:e.jsxs(e.Fragment,{children:["alle ",e.jsx(n,{children:"\\lambda_i"})," sind positiv, die Summe ist also mindestens so groß wie ihr größter Summand ",e.jsx(n,{children:"\\cred{\\lambda_1}"})]}),children:e.jsx(t,{children:"\\left\\|\\bA\\right\\|_2^2 = \\cred{\\lambda_1} \\le \\cgreen{\\sum_{i=1}^r \\lambda_i} = \\left\\|\\bA\\right\\|_F^2"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["jeder der ",e.jsx(n,{children:"r"})," Summanden ist höchstens ",e.jsx(n,{children:"\\cred{\\lambda_1}"}),"; und der ",e.jsx(a,{id:"rank",children:"Rang"})," erfüllt ",e.jsx(n,{children:"r \\le \\min(m,n)"})]}),children:e.jsx(t,{children:"\\left\\|\\bA\\right\\|_F^2 = \\cgreen{\\sum_{i=1}^r \\lambda_i} \\le r \\cdot \\cred{\\lambda_1} \\le \\min(m,n) \\cdot \\cred{\\lambda_1} = \\min(m,n) \\cdot \\left\\|\\bA\\right\\|_2^2"})}),e.jsx(p,{why:e.jsx(e.Fragment,{children:"Wurzelziehen ist monoton, erhält also beide Ungleichungen"}),children:e.jsx(t,{children:"\\left\\|\\bA\\right\\|_2 \\le \\left\\|\\bA\\right\\|_F \\le \\sqrt{\\min(m,n)}\\, \\left\\|\\bA\\right\\|_2"})})]})]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"3.5.3 (Äquivalenz ist nicht Gleichheit)",id:"env-aequivalenz-ist-nicht-gleichheit",children:[e.jsxs(i.p,{children:[`Vorsicht: Äquivalenz heißt nur, dass keine Norm „unendlich viel größer" sein kann als
eine andere. Verschiedene Normen können Matrizen aber durchaus
`,e.jsx(i.em,{children:"unterschiedlich ordnen"}),". Betrachten wir"]}),e.jsx(t,{children:"\\bA = \\bI_2 = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}, \\qquad \\bB = \\begin{pmatrix} 1{,}2 & 0 \\\\ 0 & 0 \\end{pmatrix}."}),e.jsxs(i.p,{children:["In der Frobenius-Norm ist ",e.jsx(n,{children:"\\bA"}),` die größere Matrix:
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F = \\sqrt{2} \\approx 1{,}41 > 1{,}2 = \\left\\|\\bB\\right\\|_F"}),`.
In der Spektralnorm ist es umgekehrt:
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = 1 < 1{,}2 = \\left\\|\\bB\\right\\|_2"}),`. Beide
Antworten sind richtig, denn jede Norm misst eben etwas anderes: Die Frobenius-Norm
summiert die „Gesamtmasse" aller Einträge, die Spektralnorm die maximale Streckung.
Welche Norm die passende ist, entscheidet die Anwendung.`]})]}),`
`,e.jsxs(oe,{title:"Wie scharf sind die Äquivalenzkonstanten?",children:[e.jsxs(i.p,{children:["Eine Frage bleibt offen: Sind die Konstanten in ",e.jsx(i.a,{href:"#env-explizite-aequivalenzkonstanten",children:"Beispiel 3.5.2"}),` nur bequeme Abschätzungen,
oder lässt sich der Faktor `,e.jsx(n,{children:"\\sqrt{\\min(m,n)}"}),` noch drücken? Anders gefragt: Gibt es
Matrizen, für die eine der beiden Ungleichungen mit Gleichheit steht? Weil alle drei
beteiligten Normen nur von den Singulärwerten abhängen, können wir das für `,e.jsx(n,{children:"2 \\times 2"}),`
vollständig durchprobieren.`]}),e.jsx(ci,{}),e.jsxs(i.p,{children:[`Beide Enden der Kette werden angenommen, und zwar genau an den Rändern des zulässigen
Bereichs: unten, wenn der zweite Singulärwert verschwindet, oben, wenn beide gleich sind.
Dazwischen ist der Quotient echt kleiner als `,e.jsx(n,{children:"\\sqrt{2}"}),`. Verbessern lässt sich die
Konstante also nicht, und sie wird schlecht: Im `,e.jsx(n,{children:"\\R^{n \\times n}"}),` steht dort
`,e.jsx(n,{children:"\\sqrt{n}"}),", und für ",e.jsx(n,{children:"\\bA = \\bI_n"})," ist diese Schranke scharf."]})]}),`
`,e.jsxs(i.h3,{id:"sec-submultiplikativitaet",children:["3.5.2 ","Submultiplikativität"]}),`
`,e.jsxs(i.p,{children:[`Kommen wir zur zweiten Frage. Die Normaxiome aus
`,e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),` regeln per
Dreiecksungleichung, wie sich Normen unter `,e.jsx(i.em,{children:"Addition"}),` verhalten:
`,e.jsx(n,{children:"\\left\\|\\bA + \\bB\\right\\| \\le \\left\\|\\bA\\right\\| + \\left\\|\\bB\\right\\|"}),`.
Über das Matrix`,e.jsx(i.em,{children:"produkt"}),` sagen sie dagegen gar nichts. Für die Numerik ist das
Produkt aber die zentrale Operation: Algorithmen sind Ketten von
Matrixmultiplikationen, und wir wollen abschätzen können, wie stark so eine Kette
Fehler aufbläht. Normen, die das erlauben, bekommen einen eigenen Namen:`]}),`
`,e.jsxs(g,{kind:"Definition",label:"3.5.4 (Submultiplikative Matrixnorm)",id:"env-submultiplikative-matrixnorm",children:[e.jsxs(i.p,{children:["Eine Matrixnorm ",e.jsx(n,{children:"\\left\\|\\cdot\\right\\|"}),` heißt
`,e.jsx(i.em,{children:"submultiplikativ"}),`, wenn für alle Matrizen mit passenden Formaten (
`,e.jsx(n,{children:"\\cbred{\\bA} \\in \\R^{m \\times n}"}),", ",e.jsx(n,{children:"\\cblue{\\bB} \\in \\R^{n \\times p}"}),") gilt:"]}),e.jsx(t,{children:"\\left\\|\\cbred{\\bA}\\cblue{\\bB}\\right\\| \\le \\left\\|\\cbred{\\bA}\\right\\| \\cdot \\left\\|\\cblue{\\bB}\\right\\|."})]}),`
`,e.jsx(i.p,{children:"Die gute Nachricht: Die wichtigsten Normen aus diesem Kapitel haben diese Eigenschaft."}),`
`,e.jsx(g,{kind:"Satz",label:"3.5.5 (Operatornormen sind submultiplikativ)",id:"env-operatornormen-sind-submultiplikativ",children:e.jsxs(i.p,{children:["Jede Operatornorm (",e.jsx(i.a,{href:"#sec-3.3",children:"Abschnitt 3.3"}),`) ist
submultiplikativ.`]})}),`
`,e.jsx(i.p,{children:`Der Beweis ruht auf einer Ungleichung, die wir im Rest des Kapitels immer wieder
brauchen und deshalb eigens festhalten:`}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"3.5.6 (Die Operatornorm als Streckungsschranke)",id:"env-operatornorm-hilfsungleichung",children:[e.jsxs(i.p,{children:["Für jede Matrix ",e.jsx(n,{children:"\\bM"})," und jeden Vektor ",e.jsx(n,{children:"\\by"})," gilt"]}),e.jsx(t,{children:"\\left\\|\\bM\\by\\right\\|_V \\le \\left\\|\\bM\\right\\|_V \\cdot \\left\\|\\by\\right\\|_V."}),e.jsxs(i.p,{children:[`Die Operatornorm ist ja als Maximum des Quotienten
`,e.jsx(n,{children:"\\left\\|\\bM\\by\\right\\|_V / \\left\\|\\by\\right\\|_V"}),` definiert, also mindestens so
groß wie dieser Quotient an jeder einzelnen Stelle `,e.jsx(n,{children:"\\by \\ne \\bnull"}),`; für
`,e.jsx(n,{children:"\\by = \\bnull"})," stehen links und rechts null."]})]}),`
`,e.jsx(P,{title:"Beweis der Submultiplikativität von Operatornormen",children:e.jsxs(H,{children:[e.jsxs(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-operatornorm-hilfsungleichung",children:"Bemerkung 3.5.6"})," zweimal anwenden: erst auf ",e.jsx(n,{children:"\\cbred{\\bA}"})," mit dem Vektor ",e.jsx(n,{children:"\\cblue{\\bB}\\bx"}),", dann auf ",e.jsx(n,{children:"\\cblue{\\bB}"})," mit ",e.jsx(n,{children:"\\bx"}),", wobei ",e.jsx(n,{children:"\\left\\|\\bx\\right\\|_V = 1"})]}),children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bx"})," ein Vektor mit ",e.jsx(n,{children:"\\left\\|\\bx\\right\\|_V = 1"}),`.
Dann:`]}),e.jsx(t,{children:"\\left\\|(\\cbred{\\bA}\\cblue{\\bB})\\bx\\right\\|_V = \\left\\|\\cbred{\\bA}(\\cblue{\\bB}\\bx)\\right\\|_V \\le \\left\\|\\cbred{\\bA}\\right\\|_V \\left\\|\\cblue{\\bB}\\bx\\right\\|_V \\le \\left\\|\\cbred{\\bA}\\right\\|_V \\left\\|\\cblue{\\bB}\\right\\|_V."})]}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["die Operatornorm von ",e.jsx(n,{children:"\\cbred{\\bA}\\cblue{\\bB}"})," ist das Maximum der linken Seite über alle ",e.jsx(n,{children:"\\bx"})," mit ",e.jsx(n,{children:"\\left\\|\\bx\\right\\|_V = 1"}),"; die rechte Seite hängt nicht von ",e.jsx(n,{children:"\\bx"})," ab"]}),children:e.jsx(t,{children:"\\left\\|\\cbred{\\bA}\\cblue{\\bB}\\right\\|_V = \\max_{\\left\\|\\bx\\right\\|_V = 1} \\left\\|(\\cbred{\\bA}\\cblue{\\bB})\\bx\\right\\|_V \\le \\left\\|\\cbred{\\bA}\\right\\|_V \\cdot \\left\\|\\cblue{\\bB}\\right\\|_V"})})]})}),`
`,e.jsxs(i.p,{children:[`Auch alle Schatten-Normen aus
`,e.jsx(i.a,{href:"#sec-3.4",children:"Abschnitt 3.4"}),` (insbesondere die
Frobenius-Norm und die Nuklearnorm) sind submultiplikativ. Der Beweis braucht
Ungleichungen für Singulärwerte von Produkten, die wir hier nicht entwickeln; wir merken
uns das Resultat.`]}),`
`,e.jsxs(oe,{title:"Gilt ‖AB‖ ≤ ‖A‖·‖B‖ für jede Matrixnorm?",children:[e.jsx(i.p,{children:`Damit sind die Operator- und die Schattennormen versorgt. Bleibt die Frage, ob wir uns die
Ungleichung überhaupt merken müssen oder ob sie ohnehin für jede Matrixnorm gilt. Tippen wir
zuerst, bevor wir weiterlesen.`}),e.jsx(ui,{}),e.jsx(i.p,{children:`Es gibt sie, die Norm, die aus der Reihe tanzt, und es ist die elementweise Maximumsnorm.
Schon das einfachste Paar bringt sie zu Fall: die Einsermatrix mit sich selbst
multipliziert.`})]}),`
`,e.jsx(i.p,{children:"Rechnen wir diesen Fall von Hand nach."}),`
`,e.jsxs(g,{kind:"Beispiel",label:"3.5.7 (Die Maximumsnorm ist nicht submultiplikativ)",id:"env-die-maximumsnorm-ist-nicht",children:[e.jsxs(i.p,{children:[`Betrachten wir die Einsermatrix
`,e.jsx(n,{children:"\\cbred{\\bA} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}"}),` und ihr
Quadrat. Jeder Eintrag von `,e.jsx(n,{children:"\\cgreen{\\bA^2}"}),` ist ein Skalarprodukt aus einer
Zeile und einer Spalte voller Einsen:`]}),e.jsx(t,{children:"\\cgreen{\\bA^2} = \\begin{pmatrix} \\cred{1} \\cdot \\cred{1} + \\cred{1} \\cdot \\cred{1} & 1 \\cdot 1 + 1 \\cdot 1 \\\\ 1 \\cdot 1 + 1 \\cdot 1 & 1 \\cdot 1 + 1 \\cdot 1 \\end{pmatrix} = \\cgreen{\\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix}}."}),e.jsx(i.p,{children:"Damit ist"}),e.jsx(t,{children:"\\left\\|\\cgreen{\\bA^2}\\right\\|_M = 2 > 1 = 1 \\cdot 1 = \\left\\|\\cbred{\\bA}\\right\\|_M \\cdot \\left\\|\\cbred{\\bA}\\right\\|_M."}),e.jsxs(i.p,{children:[`Die Maximumsnorm „übersieht", dass bei der Matrixmultiplikation viele Produkte
`,e.jsx(i.em,{children:"aufsummiert"})," werden, denn sie schaut nur auf den größten einzelnen Eintrag."]})]}),`
`,e.jsx(g,{kind:"Bemerkung",label:"3.5.8 (Reparatur: die Gesamtnorm)",id:"env-reparatur-die-gesamtnorm",children:e.jsxs(i.p,{children:[`Der Defekt lässt sich durch einen dimensionsabhängigen Faktor beheben: Die
`,e.jsx(i.em,{children:"Gesamtnorm"})," ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_G := \\sqrt{mn}\\, \\left\\|\\bA\\right\\|_M"}),` ist
submultiplikativ. Der Nachweis ist eine gute Übung. Er benutzt genau die
Summenstruktur der Matrixmultiplikation, die die Maximumsnorm ignoriert. (Probe am
`,e.jsx(i.a,{href:"#env-die-maximumsnorm-ist-nicht",children:"Beispiel 3.5.7"})," mit ",e.jsx(n,{children:"m = n = 2"}),", also ",e.jsx(n,{children:"\\sqrt{mn} = 2"}),`:
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_G = 2 \\cdot 1 = 2"}),` und
`,e.jsx(n,{children:"\\left\\|\\bA^2\\right\\|_G = 2 \\cdot 2 = 4 \\le 4 = \\left\\|\\bA\\right\\|_G^2"}),`,
es passt.)`]})}),`
`,e.jsxs(i.p,{children:[`Warum ist Submultiplikativität so wertvoll? Drei Gründe. Erstens kontrolliert sie die
`,e.jsx(i.em,{children:"Fehlerfortpflanzung"}),`: Für eine Kette
`,e.jsx(n,{children:"\\bA_1 \\bA_2 \\cdots \\bA_k"}),` folgt durch wiederholtes Anwenden
`,e.jsx(n,{children:"\\left\\|\\bA_1 \\cdots \\bA_k\\right\\| \\le \\left\\|\\bA_1\\right\\| \\cdots \\left\\|\\bA_k\\right\\|"}),`;
die Normen der Faktoren deckeln die Norm des Produkts. Zweitens ermöglicht sie
`,e.jsx(a,{id:"convergence",children:"Konvergenz"}),`analysen iterativer Verfahren: Aus
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\| < 1"}),` folgt
`,e.jsx(n,{children:"\\left\\|\\bA^k\\right\\| \\le \\left\\|\\bA\\right\\|^k \\to 0"}),`, die Potenzen
einer „kontrahierenden" Matrix sterben also garantiert aus. Drittens verbindet sie
Normen mit dem `,e.jsx(a,{id:"spectral-radius",children:"Spektralradius"}),`: Man kann
zeigen, dass `,e.jsx(n,{children:"\\rho(\\bA) \\le \\left\\|\\bA\\right\\|"}),` für jede
submultiplikative Norm gilt: Jede solche Norm ist eine obere Schranke für die
betragsgrößten Eigenwerte.`]}),`
`,e.jsxs(i.h3,{id:"sec-vertraeglichkeit-von-normen",children:["3.5.3 ","Verträglichkeit von Normen"]}),`
`,e.jsxs(i.p,{children:[`Submultiplikativität vergleicht Matrixnormen mit Matrixnormen. Genauso oft brauchen wir
aber ein gemischtes Szenario: Eine Matrix wirkt auf einen `,e.jsx(i.em,{children:"Vektor"}),`, und wir
wollen `,e.jsx(n,{children:"\\left\\|\\bA\\bx\\right\\|"})," durch die Norm von ",e.jsx(n,{children:"\\bA"}),` und
die Norm von `,e.jsx(n,{children:"\\bx"})," abschätzen. Das führt auf folgenden Begriff:"]}),`
`,e.jsxs(g,{kind:"Definition",label:"3.5.9 (Verträgliche Norm)",id:"env-vertraegliche-norm",children:[e.jsxs(i.p,{children:["Eine Matrixnorm ",e.jsx(n,{children:"\\left\\|\\cdot\\right\\|"})," ist ",e.jsx(i.em,{children:"verträglich"}),`
(kompatibel) mit einer `,e.jsx(a,{id:"norm",children:"Vektornorm"}),`
`,e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_V"}),`, wenn für alle
`,e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," und ",e.jsx(n,{children:"\\bx \\in \\R^n"})," gilt:"]}),e.jsx(t,{children:"\\left\\|\\bA\\bx\\right\\|_V \\le \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bx\\right\\|_V."}),e.jsxs(i.p,{children:["(Dabei bezeichnet ",e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_V"}),` die Vektornorm gleichen Typs
auf `,e.jsx(n,{children:"\\R^n"})," und auf ",e.jsx(n,{children:"\\R^m"}),".)"]})]}),`
`,e.jsx(g,{kind:"Satz",label:"3.5.10 (Wichtige Verträglichkeiten)",id:"env-wichtige-vertraeglichkeiten",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`Jede submultiplikative Matrixnorm ist mit „sich selbst" verträglich, d. h. mit der
Vektornorm, die entsteht, wenn wir `,e.jsx(n,{children:"\\bx \\in \\R^n"}),` als
`,e.jsx(n,{children:"n \\times 1"}),"-Matrix lesen."]}),`
`,e.jsx(i.li,{children:"Jede Operatornorm ist mit der Vektornorm verträglich, die sie induziert."}),`
`,e.jsxs(i.li,{children:[`Die Frobenius-Norm ist mit der
`,e.jsx(a,{id:"euclidean-norm",children:"euklidischen Norm"}),` verträglich:
`,e.jsx(n,{children:"\\left\\|\\bA\\bx\\right\\|_2 \\le \\left\\|\\bA\\right\\|_F \\left\\|\\bx\\right\\|_2"}),"."]}),`
`]})}),`
`,e.jsx(P,{title:"Beweis der drei Verträglichkeiten",children:e.jsxs(H,{children:[e.jsxs(p,{why:e.jsxs(e.Fragment,{children:["Submultiplikativität (",e.jsx(i.a,{href:"#env-submultiplikative-matrixnorm",children:"Definition 3.5.4"}),"), angewendet auf das Matrixprodukt einer ",e.jsx(n,{children:"m \\times n"}),"- mit einer ",e.jsx(n,{children:"n \\times 1"}),"-Matrix"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu (1):"})," Lesen wir ",e.jsx(n,{children:"\\bx"})," als ",e.jsx(n,{children:"n \\times 1"}),`-Matrix, so
ist `,e.jsx(n,{children:"\\bA\\bx"}),` ein Matrixprodukt, und die Submultiplikativität liefert
direkt`]}),e.jsx(t,{children:"\\left\\|\\bA\\bx\\right\\| \\le \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bx\\right\\|."})]}),e.jsxs(p,{why:e.jsxs(e.Fragment,{children:["die Operatornorm ist als Maximum des Quotienten definiert, also ist sie mindestens so groß wie der Quotient an jeder einzelnen Stelle ",e.jsx(n,{children:"\\bx \\ne \\bnull"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu (2):"})," Das ist genau ",e.jsx(i.a,{href:"#env-operatornorm-hilfsungleichung",children:"Bemerkung 3.5.6"}),`: Für
`,e.jsx(n,{children:"\\bx \\ne \\bnull"})," gilt"]}),e.jsx(t,{children:"\\frac{\\left\\|\\bA\\bx\\right\\|_V}{\\left\\|\\bx\\right\\|_V} \\le \\max_{\\by \\ne \\bnull} \\frac{\\left\\|\\bA\\by\\right\\|_V}{\\left\\|\\by\\right\\|_V} = \\left\\|\\bA\\right\\|_V."})]}),e.jsxs(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(a,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"})," für jedes einzelne Skalarprodukt ",e.jsx(n,{children:"\\cred{\\ba_i}^\\top \\cblue{\\bx}"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu (3):"})," Schreiben wir ",e.jsx(n,{children:"\\bA"}),` zeilenweise mit Zeilenvektoren
`,e.jsx(n,{children:"\\cred{\\ba_1}^\\top, \\ldots, \\cred{\\ba_m}^\\top"}),". Die ",e.jsx(n,{children:"i"}),`-te
Komponente von `,e.jsx(n,{children:"\\bA\\cblue{\\bx}"}),` ist das Skalarprodukt
`,e.jsx(n,{children:"\\cred{\\ba_i}^\\top\\cblue{\\bx}"}),", also"]}),e.jsx(t,{children:"\\left\\|\\bA\\cblue{\\bx}\\right\\|_2^2 = \\sum_{i=1}^m \\left(\\cred{\\ba_i}^\\top\\cblue{\\bx}\\right)^2 \\le \\sum_{i=1}^m \\left\\|\\cred{\\ba_i}\\right\\|_2^2 \\left\\|\\cblue{\\bx}\\right\\|_2^2."})]}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["die Summe der quadrierten Zeilennormen ist genau die Summe aller quadrierten Einträge, also ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F^2"}),"; dann Wurzel ziehen"]}),children:e.jsx(t,{children:"\\left\\|\\bA\\cblue{\\bx}\\right\\|_2^2 \\le \\left(\\sum_{i=1}^m \\left\\|\\cred{\\ba_i}\\right\\|_2^2\\right) \\left\\|\\cblue{\\bx}\\right\\|_2^2 = \\left\\|\\bA\\right\\|_F^2 \\left\\|\\cblue{\\bx}\\right\\|_2^2"})})]})}),`
`,e.jsxs(i.p,{children:["Wozu das Ganze? Verträglichkeit ist das Werkzeug für ",e.jsx(i.em,{children:"Fehlerabschätzungen"}),`.
Steckt in einem Vektor ein Fehler `,e.jsx(n,{children:"\\be"}),` (etwa aus
`,e.jsx(a,{id:"rounding-error",children:"Rundungsfehlern"}),` früherer
Rechenschritte) und multiplizieren wir mit `,e.jsx(n,{children:"\\bA"}),`, dann garantiert
`,e.jsx(n,{children:"\\left\\|\\bA\\be\\right\\|_V \\le \\left\\|\\bA\\right\\| \\cdot \\left\\|\\be\\right\\|_V"}),`:
Ein kleiner Eingangsfehler bleibt nach der Multiplikation kontrolliert, denn die Matrixnorm
ist der Verstärkungsfaktor im schlimmsten Fall. Diese Denkfigur bauen wir jetzt zu
den zwei wichtigsten Anwendungen aus.`]}),`
`,e.jsxs(i.h3,{id:"sec-matrixnormen-und-konditionierung",children:["3.5.4 ","Matrixnormen und Konditionierung"]}),`
`,e.jsxs(i.p,{children:["Die ",e.jsx(a,{id:"condition-number",children:"Konditionszahl"}),` misst, wie stark ein Problem
relative Eingabefehler verstärkt. Für das Lösen
linearer `,e.jsx(a,{id:"linear-system",children:"Gleichungssysteme"}),`
`,e.jsx(n,{children:"\\bA\\bx = \\bb"}),` lässt sich dieser Verstärkungsfaktor direkt aus Matrixnormen
gewinnen. Das rechnen wir im Kapitel über lineare Gleichungssysteme nach, halten die
Definition aber schon hier fest:`]}),`
`,e.jsxs(g,{kind:"Definition",label:"3.5.11 (Konditionszahl einer Matrix)",id:"env-eigenschaften-konditionszahl-einer-matrix",children:[e.jsxs(i.p,{children:["Für eine ",e.jsx(a,{id:"matrix-inverse",children:"invertierbare"}),` Matrix
`,e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` und eine submultiplikative Matrixnorm
`,e.jsx(n,{children:"\\left\\|\\cdot\\right\\|"})," ist die ",e.jsx(i.em,{children:"Konditionszahl"})]}),e.jsx(t,{children:"\\kappa(\\bA) = \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bA^{-1}\\right\\|;"}),e.jsxs(i.p,{children:["für singuläre Matrizen setzen wir ",e.jsx(n,{children:"\\kappa(\\bA) = \\infty"}),`. Speziell für die
Spektralnorm ergibt sich die `,e.jsx(i.em,{children:"Spektralkondition"})]}),e.jsx(t,{children:"\\kappa_2(\\bA) = \\left\\|\\bA\\right\\|_2 \\cdot \\left\\|\\bA^{-1}\\right\\|_2 = \\frac{\\lambda_{\\max}(\\bA^\\top\\bA)^{1/2}}{\\lambda_{\\min}(\\bA^\\top\\bA)^{1/2}}."})]}),`
`,e.jsxs(i.p,{children:[`Diese Definition ist für jede submultiplikative Matrixnorm algebraisch sinnvoll.
Die geometrische Interpretation als Verhältnis von Streckungsfaktoren gilt jedoch
für `,e.jsx(i.em,{children:"induzierte Operatornormen"}),`. Bei anderen Normen kann auch die Normierung anders
aussehen: Beispielsweise ist `,e.jsx(n,{children:"\\kappa_F(\\bI_n)=n"}),", nicht ",e.jsx(n,{children:"1"}),"."]}),`
`,e.jsxs(i.p,{children:[`Die zweite Gleichheit rechnen wir hier nicht nach; mit der
`,e.jsx(a,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` fällt sie in
`,e.jsx(i.a,{href:"?k=06-svd",children:"Kapitel 6"}),` von selbst ab. Inhaltlich misst die Konditionszahl in der Spektralnorm das
`,e.jsx(i.em,{children:"Verhältnis der extremen Streckungsfaktoren"}),`: maximale Streckung durch
`,e.jsx(n,{children:"\\bA"}),` geteilt durch minimale Streckung, also den Quotienten aus größtem und
kleinstem Singulärwert. Für `,e.jsx(i.em,{children:"symmetrische"}),` Matrizen sind die Singulärwerte
gerade die Beträge der Eigenwerte; dort ist
`,e.jsx(n,{children:"\\kappa_2(\\bA) = \\max_i |\\lambda_i| \\,/\\, \\min_i |\\lambda_i|"}),"."]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"3.5.12 (Interpretation der Konditionszahl)",id:"env-interpretation-der-konditionszahl",children:[e.jsx(i.p,{children:"Für eine induzierte Operatornorm gilt:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\kappa(\\bA) \\approx 1"}),": gut konditioniert; ",e.jsx(n,{children:"\\bA"}),` streckt
alle Richtungen ungefähr gleich stark.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\kappa(\\bA) \\gg 1"}),`: schlecht konditioniert; manche Richtungen werden
enorm gestreckt, andere fast plattgedrückt.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\kappa(\\bA) = \\infty"}),": singulär."]}),`
`]}),e.jsxs(i.p,{children:[`Kleiner als 1 kann die Konditionszahl (in einer Operatornorm) nie werden: Wegen
`,e.jsx(n,{children:"\\left\\|\\bI\\right\\| = 1"})," und der Submultiplikativität gilt"]}),e.jsx(t,{children:"1 = \\left\\|\\bI\\right\\| = \\left\\|\\bA\\bA^{-1}\\right\\| \\le \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bA^{-1}\\right\\| = \\kappa(\\bA)."}),e.jsxs(i.p,{children:["Den Idealwert ",e.jsx(n,{children:"\\kappa_2 = 1"}),` erreichen zum Beispiel
`,e.jsx(a,{id:"orthogonal-matrix",children:"Orthogonalmatrizen"}),`: Sie lassen alle
euklidischen Längen unverändert (
`,e.jsx(i.a,{href:"#sec-3.3",children:"Abschnitt 3.3"}),`), strecken also jede
Richtung mit dem Faktor 1.`]})]}),`
`,e.jsxs(i.h3,{id:"sec-normen-in-der-fehleranalyse",children:["3.5.5 ","Normen in der Fehleranalyse"]}),`
`,e.jsxs(i.p,{children:[`Zum Abschluss zeigen wir an einem konkreten Resultat, wie Matrixnormen in der
Fehleranalyse arbeiten. Angenommen, wir lösen `,e.jsx(n,{children:"\\bA\\bx = \\bb"}),` numerisch und
erhalten (dank Rundungsfehlern) nicht die exakte Lösung, sondern eine Näherung
`,e.jsx(n,{children:"\\wt{\\bx}"}),". Die ",e.jsx(i.em,{children:"Rückwärts-Fehleranalyse"}),` (backward error analysis)
stellt die Frage geschickt um: Statt zu fragen, wie falsch `,e.jsx(n,{children:"\\wt{\\bx}"}),` ist
(Vorwärtsfehler), fragen wir: `,e.jsxs(i.em,{children:[`Für welches gestörte Problem ist
`,e.jsx(n,{children:"\\wt{\\bx}"})," die exakte Lösung?"]}),` Ist die nötige Störung winzig, hat der
Algorithmus sein Bestes getan; alles Weitere ist Sache der Kondition des Problems.`]}),`
`,e.jsxs(g,{kind:"Satz",label:"3.5.13 (Rückwärtsfehler beim linearen Gleichungssystem)",id:"env-rueckwaertsfehler-beim-linearen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\wt{\\bx} \\ne \\bnull"}),` eine Näherungslösung von
`,e.jsx(n,{children:"\\bA\\bx = \\bb"}),` mit Residuum
`,e.jsx(n,{children:"\\cbpurp{\\br} = \\bA\\wt{\\bx} - \\bb"}),". Dann löst ",e.jsx(n,{children:"\\wt{\\bx}"}),`
das gestörte System`]}),e.jsx(t,{children:"(\\bA + \\cblue{\\bDelta\\bA})\\,\\wt{\\bx} = \\bb \\qquad \\text{mit} \\qquad \\cblue{\\bDelta\\bA} = -\\frac{\\cbpurp{\\br}\\,\\wt{\\bx}^\\top}{\\left\\|\\wt{\\bx}\\right\\|_2^2}"}),e.jsx(i.p,{children:"exakt, und die relative Größe der Störung ist"}),e.jsx(t,{children:"\\frac{\\left\\|\\cblue{\\bDelta\\bA}\\right\\|_2}{\\left\\|\\bA\\right\\|_2} = \\frac{\\left\\|\\cbpurp{\\br}\\right\\|_2}{\\left\\|\\bA\\right\\|_2 \\cdot \\left\\|\\wt{\\bx}\\right\\|_2}."})]}),`
`,e.jsx(P,{title:"Beweis der Rückwärtsfehler-Formel",children:e.jsxs(H,{children:[e.jsx(p,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cbpurp{\\br}\\,\\wt{\\bx}^\\top"})," ist ein ",e.jsx(a,{id:"outer-product",children:"äußeres Produkt"}),"; multiplizieren wir es mit ",e.jsx(n,{children:"\\wt{\\bx}"}),", entsteht das Skalarprodukt ",e.jsx(n,{children:"\\wt{\\bx}^\\top\\wt{\\bx} = \\left\\|\\wt{\\bx}\\right\\|_2^2"}),", das sich gegen den Nenner kürzt"]}),children:e.jsx(t,{children:"\\cblue{\\bDelta\\bA}\\,\\wt{\\bx} = -\\frac{\\cbpurp{\\br}\\,(\\wt{\\bx}^\\top\\wt{\\bx})}{\\left\\|\\wt{\\bx}\\right\\|_2^2} = -\\cbpurp{\\br}"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["Definition des Residuums: ",e.jsx(n,{children:"\\bA\\wt{\\bx} = \\bb + \\cbpurp{\\br}"})]}),children:e.jsx(t,{children:"(\\bA + \\cblue{\\bDelta\\bA})\\,\\wt{\\bx} = \\bA\\wt{\\bx} - \\cbpurp{\\br} = \\bb + \\cbpurp{\\br} - \\cbpurp{\\br} = \\bb"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["für Rang-1-Matrizen gilt ",e.jsx(n,{children:"\\left\\|\\bu\\bv^\\top\\right\\|_2 = \\left\\|\\bu\\right\\|_2 \\left\\|\\bv\\right\\|_2"}),": wegen ",e.jsx(n,{children:"(\\bu\\bv^\\top)\\bx = (\\bv^\\top\\bx)\\,\\bu"})," wird ",e.jsx(n,{children:"\\left\\|(\\bu\\bv^\\top)\\bx\\right\\|_2 = |\\bv^\\top\\bx| \\left\\|\\bu\\right\\|_2"})," nach ",e.jsx(a,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz"})," maximal für ",e.jsx(n,{children:"\\bx = \\bv / \\left\\|\\bv\\right\\|_2"})]}),children:e.jsx(t,{children:"\\left\\|\\cblue{\\bDelta\\bA}\\right\\|_2 = \\frac{\\left\\|\\cbpurp{\\br}\\,\\wt{\\bx}^\\top\\right\\|_2}{\\left\\|\\wt{\\bx}\\right\\|_2^2} = \\frac{\\left\\|\\cbpurp{\\br}\\right\\|_2 \\left\\|\\wt{\\bx}\\right\\|_2}{\\left\\|\\wt{\\bx}\\right\\|_2^2} = \\frac{\\left\\|\\cbpurp{\\br}\\right\\|_2}{\\left\\|\\wt{\\bx}\\right\\|_2}"})}),e.jsx(p,{why:e.jsxs(e.Fragment,{children:["beide Seiten durch ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2"})," teilen"]}),children:e.jsx(t,{children:"\\frac{\\left\\|\\cblue{\\bDelta\\bA}\\right\\|_2}{\\left\\|\\bA\\right\\|_2} = \\frac{\\left\\|\\cbpurp{\\br}\\right\\|_2}{\\left\\|\\bA\\right\\|_2 \\cdot \\left\\|\\wt{\\bx}\\right\\|_2}"})})]})}),`
`,e.jsxs(i.p,{children:["Matrixnormen machen den Rückwärtsfehler damit ",e.jsx(i.em,{children:"berechenbar"}),`: Rechts stehen nur
Größen, die nach der Rechnung vorliegen, und ein kleines relatives Residuum bedeutet,
dass `,e.jsx(n,{children:"\\wt{\\bx}"}),` die exakte Lösung eines nur winzig gestörten Systems ist. Wie weit
`,e.jsx(n,{children:"\\wt{\\bx}"}),` dann von der wahren Lösung entfernt sein kann, entscheidet die
Konditionszahl aus `,e.jsx(i.a,{href:"#env-eigenschaften-konditionszahl-einer-matrix",children:"Definition 3.5.11"}),`. Als Faustregel
gilt: Vorwärtsfehler `,e.jsx(n,{children:"\\lesssim \\kappa(\\bA) \\times"})," Rückwärtsfehler."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs("ul",{className:"max-w-prose list-none space-y-4 pl-0",children:[e.jsx(He,{q:e.jsxs(e.Fragment,{children:["Gilt ",e.jsx(n,{children:"\\left\\|\\bA^2\\right\\| \\le \\left\\|\\bA\\right\\|^2"})," für ",e.jsx(i.em,{children:"jede"})," Matrixnorm?"]}),children:e.jsxs(i.p,{children:[`Nein, das gilt nur für submultiplikative Normen. Die Maximumsnorm liefert ein
Gegenbeispiel: Für die Einsermatrix aus `,e.jsx(i.a,{href:"#env-die-maximumsnorm-ist-nicht",children:"Beispiel 3.5.7"}),` ist
`,e.jsx(n,{children:"\\left\\|\\bA^2\\right\\|_M = 2 > 1 = \\left\\|\\bA\\right\\|_M^2"}),`.
Operator- und Schatten-Normen (also auch Spektral-, Frobenius- und Nuklearnorm)
erfüllen die Ungleichung dagegen immer.`]})}),e.jsx(He,{q:e.jsxs(e.Fragment,{children:["Sei ",e.jsx(n,{children:"\\bQ"})," eine Orthogonalmatrix. Was ist ",e.jsx(n,{children:"\\kappa_2(\\bQ)"}),"?"]}),children:e.jsxs(i.p,{children:[e.jsx(n,{children:"\\kappa_2(\\bQ) = 1"}),`. Wegen
`,e.jsx(n,{children:"\\left\\|\\bQ\\bx\\right\\|_2 = \\left\\|\\bx\\right\\|_2"}),` für alle
`,e.jsx(n,{children:"\\bx"})," ist ",e.jsx(n,{children:"\\left\\|\\bQ\\right\\|_2 = 1"}),`; und
`,e.jsx(n,{children:"\\bQ^{-1} = \\bQ^\\top"}),` ist selbst orthogonal, also auch
`,e.jsx(n,{children:"\\left\\|\\bQ^{-1}\\right\\|_2 = 1"}),`. Orthogonalmatrizen sind perfekt
konditioniert – ein Hauptgrund, warum numerische Verfahren so gerne mit ihnen
arbeiten.`]})}),e.jsx(He,{q:e.jsxs(e.Fragment,{children:["Für die Einheitsmatrix gilt ",e.jsx(n,{children:"\\left\\|\\bI_n\\right\\|_2 = 1"}),", aber ",e.jsx(n,{children:"\\left\\|\\bI_n\\right\\|_F = \\sqrt{n}"}),". Widerspricht das der Normenäquivalenz (",v("satz:alle-matrixnormen-sind-aequivalent"),")? Und was sagt uns das Beispiel über die Konstante ",e.jsx(n,{children:"\\sqrt{\\min(m,n)}"})," aus ",v("beispiel:explizite-aequivalenzkonstanten"),"?"]}),children:e.jsxs(i.p,{children:["Kein Widerspruch: ",e.jsx(i.a,{href:"#env-alle-matrixnormen-sind-aequivalent",children:"Satz 3.5.1"})," gilt bei ",e.jsx(i.em,{children:"festen"}),` Dimensionen, und die
Konstanten dürfen von `,e.jsx(n,{children:"m, n"}),` abhängen. Das Beispiel zeigt sogar, dass die
Konstante scharf ist: `,e.jsx(n,{children:"\\bI_n"}),` erfüllt
`,e.jsx(n,{children:"\\left\\|\\bI_n\\right\\|_F = \\sqrt{n} = \\sqrt{\\min(n,n)} \\cdot \\left\\|\\bI_n\\right\\|_2"}),`;
die obere Schranke aus `,e.jsx(i.a,{href:"#env-explizite-aequivalenzkonstanten",children:"Beispiel 3.5.2"}),` wird hier mit Gleichheit angenommen, besser
geht es also nicht.`]})})]}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(we,{children:[e.jsxs(ke,{loesung:1.414,toleranz:.005,children:[e.jsxs(i.p,{children:["Ziehen wir im Äquivalenz-Widget den Punkt auf die Winkelhalbierende ",e.jsx(n,{children:"\\sigma_1 = \\sigma_2"}),`.
Welchen Quotienten `,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F / \\left\\|\\bA\\right\\|_2"})," zeigt es dann?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\sqrt{2} \\approx 1{,}414"}),`, unabhängig davon, wie weit außen auf der Winkelhalbierenden
wir landen. Dort ist `,e.jsx(n,{children:"\\bA"}),` ein Vielfaches der Einheitsmatrix, und die rechte Ungleichung
aus `,e.jsx(i.a,{href:"#env-explizite-aequivalenzkonstanten",children:"Beispiel 3.5.2"}),` steht mit Gleichheit. Auf der waagerechten Achse dagegen ist der
Quotient `,e.jsx(n,{children:"1"}),"."]})]}),e.jsxs(ke,{loesung:2,toleranz:.001,children:[e.jsxs(i.p,{children:["Stellen wir im Submultiplikativitäts-Widget die Einsermatrix für ",e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bB"}),` ein und
wählen wir die Maximumsnorm. Welchen Quotienten
`,e.jsx(n,{children:"\\left\\|\\bA\\bB\\right\\| / (\\left\\|\\bA\\right\\| \\cdot \\left\\|\\bB\\right\\|)"})," zeigt der Balken?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"2"}),", also doppelt so viel wie erlaubt. Alle Einträge von ",e.jsx(n,{children:"\\bA\\bB"})," sind ",e.jsx(n,{children:"2"}),`, alle Einträge
von `,e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bB"})," sind ",e.jsx(n,{children:"1"}),": ",e.jsx(n,{children:"2 / (1 \\cdot 1) = 2"})," (",e.jsx(i.a,{href:"#env-die-maximumsnorm-ist-nicht",children:"Beispiel 3.5.7"}),`). Schalten wir bei
denselben Matrizen auf eine Operatornorm um, springt der Balken auf genau `,e.jsx(n,{children:"1"}),` – dort ist
die Schranke aus `,e.jsx(i.a,{href:"#env-operatornormen-sind-submultiplikativ",children:"Satz 3.5.5"})," scharf, aber eben nicht verletzt."]})]}),e.jsxs(T,{wahr:!1,children:[e.jsx(i.p,{children:`Der Würfelknopf des Widgets zeigt bei jedem Klick andere Zufallsmatrizen, also sieht jeder
Leser andere Beispiele.`}),e.jsxs(i.p,{children:[`Die Zahlen kommen aus einem geseedeten Generator. Die Folge der Beispiele ist für alle
Leser dieselbe, und über diese Folge bleibt der Quotient in jeder Operator- und
Schattennorm unter `,e.jsx(n,{children:"1"}),"; nur die Maximumsnorm schießt darüber hinaus."]})]})]})}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:"Vertiefung: Heath §2.3."})})]})}function gi(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(zn,{...r})}):zn(r)}function ji({q:r,children:i}){return e.jsxs("div",{className:"space-y-1",children:[e.jsx("div",{children:r}),e.jsxs("details",{className:"rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300",children:"Lösung anzeigen"}),e.jsx("div",{className:"space-y-2 pt-1.5",children:i})]})]})}function Sn(r){const i={a:"a",em:"em",h3:"h3",p:"p",strong:"strong",...r.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(i.p,{children:[`Fassen wir das Kapitel zusammen. Der rote Faden war die Frage, wie wir die „Größe" einer
Matrix messen, und zwar so, dass die Zahl etwas über die
`,e.jsx(a,{id:"linear-transformation",children:"lineare Abbildung"}),`
`,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx"}),` aussagt, nicht nur über die Einträge. Als Werkzeuge
haben wir die Spur als skalare Invariante und drei Familien von Matrixnormen
kennengelernt.`]}),`
`,e.jsx(i.h3,{children:"Die Konzepte im Überblick"}),`
`,e.jsx("div",{className:"max-w-prose overflow-x-auto",children:e.jsxs("table",{className:"text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-300 text-left dark:border-slate-600",children:[e.jsx("th",{className:"py-1 pr-6",children:"Konzept"}),e.jsx("th",{className:"py-1 pr-6",children:"Kernaussage"}),e.jsx("th",{className:"py-1",children:"Abschnitt"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Spur"}),e.jsxs("td",{className:"py-1 pr-6",children:[e.jsx(n,{children:"\\tr(\\bA) = \\sumin a_{ii}"}),"; linear, zyklisch (",e.jsx(n,{children:"\\tr(\\bA\\bB) = \\tr(\\bB\\bA)"}),") und damit ähnlichkeitsinvariant; gleich der Summe der ",e.jsx(a,{id:"eigenvalue-eigenvector",children:"Eigenwerte"})," (Koeffizient des charakteristischen Polynoms)"]}),e.jsx("td",{className:"py-1",children:e.jsx(i.a,{href:"#sec-3.1",children:"3.1"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Matrixnorm"}),e.jsxs("td",{className:"py-1 pr-6",children:["dieselben Axiome wie bei ",e.jsx(a,{id:"norm",children:"Vektornormen"}),": Definitheit, absolute Homogenität, Dreiecksungleichung"]}),e.jsx("td",{className:"py-1",children:e.jsx(i.a,{href:"#sec-3.2",children:"3.2"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"elementweise Normen"}),e.jsxs("td",{className:"py-1 pr-6",children:["Vektornorm auf ",e.jsx(n,{children:"\\vec(\\bA)"}),": ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F, \\left\\|\\bA\\right\\|_S, \\left\\|\\bA\\right\\|_M"}),"; billig, aber blind für die Transformation"]}),e.jsx("td",{className:"py-1",children:e.jsx(i.a,{href:"#sec-3.2",children:"3.2"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Operatornormen"}),e.jsxs("td",{className:"py-1 pr-6",children:["maximale Streckung ",e.jsx(n,{children:"\\max_{\\bx \\neq \\bnull} \\left\\|\\bA\\bx\\right\\|_V / \\left\\|\\bx\\right\\|_V"}),": Spaltensummennorm ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_1"}),", Spektralnorm ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2"}),", Zeilensummennorm ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_\\infty"})]}),e.jsx("td",{className:"py-1",children:e.jsx(i.a,{href:"#sec-3.3",children:"3.3"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Schatten-p-Normen"}),e.jsxs("td",{className:"py-1 pr-6",children:[e.jsx(n,{children:"p"}),"-Norm des Vektors der Wurzeln der Eigenwerte von ",e.jsx(n,{children:"\\bA^\\top\\bA"}),"; invariant unter ",e.jsx(a,{id:"orthogonal-matrix",children:"orthogonalen Transformationen"})]}),e.jsx("td",{className:"py-1",children:e.jsx(i.a,{href:"#sec-3.4",children:"3.4"})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-1 pr-6",children:"Eigenschaften"}),e.jsxs("td",{className:"py-1 pr-6",children:["Normäquivalenz, Submultiplikativität (",e.jsx(n,{children:"\\left\\|\\bA\\bB\\right\\| \\le \\left\\|\\bA\\right\\| \\left\\|\\bB\\right\\|"}),"), Verträglichkeit mit Vektornormen"]}),e.jsx("td",{className:"py-1",children:e.jsx(i.a,{href:"#sec-3.5",children:"3.5"})})]})]})]})}),`
`,e.jsxs(i.p,{children:[`Die drei Familien sind dabei kein loses Nebeneinander, sondern eng verwoben. Die
Frobenius-Norm gehört gleich zwei Familien an: Sie ist elementweise Norm (die
`,e.jsx(a,{id:"euclidean-norm",children:"euklidische Norm"}),` von
`,e.jsx(n,{children:"\\vec(\\bA)"}),") und zugleich die Schatten-Norm mit ",e.jsx(n,{children:"p = 2"}),`. Die
Brücke schlägt die Spur:
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F^2 = \\tr\\left(\\bA^\\top\\bA\\right)"}),`. Und die
Spektralnorm verbindet Operator- und Schatten-Welt: Sie ist die von der euklidischen
Norm induzierte Operatornorm `,e.jsx(i.em,{children:"und"}),` die Schatten-Norm mit
`,e.jsx(n,{children:"p = \\infty"}),`, berechenbar als
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\sqrt{\\lambda_{\\max}\\left(\\bA^\\top\\bA\\right)}"}),`,
der Anknüpfungspunkt zur
`,e.jsx(a,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),`,
die uns später noch ausführlich beschäftigen wird.`]}),`
`,e.jsxs(P,{title:"Was kostet die Berechnung der einzelnen Normen?",children:[e.jsx(i.p,{children:`Für die Praxis ist entscheidend, wie teuer die einzelnen Normen sind. Spalten- und
Zeilensummennorm sowie die Frobenius-Norm brauchen nur einen Durchlauf über alle
Einträge. Für die exakte Spektral- und Nuklearnorm verwenden dichte Standardverfahren
dagegen eine entsprechende Spektralzerlegung bzw. SVD. Benötigen wir nur eine
Approximation des größten Singulärwerts, können iterative oder randomisierte Verfahren
deutlich billiger sein.`}),e.jsx("div",{className:"max-w-prose overflow-x-auto",children:e.jsxs("table",{className:"text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-300 text-left dark:border-slate-600",children:[e.jsx("th",{className:"py-1 pr-6",children:"Norm"}),e.jsx("th",{className:"py-1 pr-6",children:"Aufwand"}),e.jsx("th",{className:"py-1",children:"Algorithmus"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"\\left\\|\\bA\\right\\|_1"})}),e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"O(mn)"})}),e.jsx("td",{className:"py-1",children:"Spaltensummen berechnen"})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"\\left\\|\\bA\\right\\|_\\infty"})}),e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"O(mn)"})}),e.jsx("td",{className:"py-1",children:"Zeilensummen berechnen"})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F"})}),e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"O(mn)"})}),e.jsx("td",{className:"py-1",children:"Quadratsumme aller Einträge"})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2"})}),e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"O\\left(\\min\\left(m^2 n, m n^2\\right)\\right)"})}),e.jsx("td",{className:"py-1",children:"größten Singulärwert berechnen (dicht: SVD; approximativ: Iteration)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"\\left\\|\\bA\\right\\|_*"})}),e.jsx("td",{className:"py-1 pr-6",children:e.jsx(n,{children:"O\\left(\\min\\left(m^2 n, m n^2\\right)\\right)"})}),e.jsx("td",{className:"py-1",children:"SVD, dann Singulärwerte summieren"})]})]})]})})]}),`
`,e.jsx(P,{title:"Ausblick: Normen als Regularisierer im maschinellen Lernen",children:e.jsxs(g,{kind:"Bemerkung",label:"3.6.1",id:"env-ausblick-normen-als-regularisierer",children:[e.jsxs(i.p,{children:[`Normen messen nicht nur Fehler: Im maschinellen Lernen steuern sie als Strafterme,
`,e.jsx(i.em,{children:"welche"}),` Lösung ein Schätzproblem liefert. Drei prominente Beispiele, alle
Varianten des `,e.jsx(a,{id:"linear-least-squares",children:"KQ-Problems"}),":"]}),e.jsx(t,{children:"\\text{Ridge: } \\min_{\\bx}\\, \\left\\|\\bA\\bx - \\bb\\right\\|_2^2 + \\lambda \\left\\|\\bx\\right\\|_2^2, \\qquad \\text{LASSO: } \\min_{\\bx}\\, \\left\\|\\bA\\bx - \\bb\\right\\|_2^2 + \\lambda \\left\\|\\bx\\right\\|_1,"}),e.jsx(t,{children:"\\text{Matrix Completion: } \\min_{\\bX}\\, \\left\\|\\bP_\\Omega(\\bX) - \\bP_\\Omega(\\bM)\\right\\|_F^2 + \\lambda \\left\\|\\bX\\right\\|_*."}),e.jsxs(i.p,{children:[`Verschiedene Normen erzwingen verschiedene Lösungseigenschaften: Die
`,e.jsx(n,{children:"2"}),"-Norm schrumpft alle Koeffizienten gleichmäßig, die ",e.jsx(n,{children:"1"}),`-Norm
setzt viele exakt auf null, und die Nuklearnorm aus
`,e.jsx(i.a,{href:"#sec-3.4",children:"Abschnitt 3.4"}),` begünstigt Lösungen mit
kleinem Rang (`,e.jsx(a,{id:"low-rank-approximation",children:"Niedrigrang-Approximation"}),")."]})]})}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(i.p,{children:[`Prüfen wir zum Abschluss, ob die Kernaussagen sitzen. Welche der folgenden Aussagen
über die Spur sind wahr (`,e.jsx(n,{children:"\\bA, \\bB \\in \\R^{n \\times n}"}),")?"]}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(we,{children:[e.jsxs(T,{wahr:!1,children:[e.jsx(i.p,{children:e.jsx(n,{children:"\\tr(\\bA\\bB) = \\tr(\\bA) \\cdot \\tr(\\bB)"})}),e.jsxs(i.p,{children:[`Die Spur ist mit dem Matrixprodukt nicht verträglich. Gegenbeispiel
`,e.jsx(n,{children:"\\bA = \\bB = \\bI_2"}),`: links steht
`,e.jsx(n,{children:"\\tr(\\bI_2) = 2"}),", rechts ",e.jsx(n,{children:"2 \\cdot 2 = 4"}),"."]})]}),e.jsxs(T,{wahr:!0,children:[e.jsx(i.p,{children:e.jsx(n,{children:"\\tr(\\bA\\bB) = \\tr(\\bB\\bA)"})}),e.jsxs(i.p,{children:[`Das ist die zyklische Eigenschaft aus
`,e.jsx(i.a,{href:"#sec-3.1",children:"Abschnitt 3.1"}),`, die wichtigste Rechenregel
der Spur.`]})]}),e.jsxs(T,{wahr:!1,children:[e.jsx(i.p,{children:e.jsx(n,{children:"\\tr(\\bA^\\top) = -\\tr(\\bA)"})}),e.jsxs(i.p,{children:[`Transponieren spiegelt an der Diagonale und lässt die Diagonaleinträge unverändert; es
gilt `,e.jsx(n,{children:"\\tr(\\bA^\\top) = \\tr(\\bA)"}),", ohne Vorzeichenwechsel."]})]}),e.jsxs(T,{wahr:!0,children:[e.jsx(i.p,{children:e.jsx(n,{children:"\\tr(\\bI_n) = n"})}),e.jsxs(i.p,{children:["Auf der Diagonale stehen ",e.jsx(n,{children:"n"})," Einsen, also ist die Summe ",e.jsx(n,{children:"n"}),"."]})]}),e.jsxs(T,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\bA"}),` invertierbar, so gilt
`,e.jsx(n,{children:"\\tr\\left(\\bA^{-1}\\right) = 1/\\tr(\\bA)"}),"."]}),e.jsxs(i.p,{children:["Gegenbeispiel ",e.jsx(n,{children:"\\bA = 2\\bI_2"}),`: dann ist
`,e.jsx(n,{children:"\\bA^{-1} = \\tfrac{1}{2}\\bI_2"}),`, also
`,e.jsx(n,{children:"\\tr\\left(\\bA^{-1}\\right) = 1"}),`, aber
`,e.jsx(n,{children:"1/\\tr(\\bA) = \\tfrac{1}{4}"}),"."]})]})]})}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(ji,{q:e.jsxs(e.Fragment,{children:["Berechnen wir für"," ",e.jsx(n,{children:"\\bA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 0 \\end{pmatrix}"})," die Spaltensummennorm ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_1"}),", die Zeilensummennorm"," ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_\\infty"})," und die Frobenius-Norm"," ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F"}),"."]}),children:[e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Spaltensummennorm:"}),` Die Beträge spaltenweise summieren; die
`,e.jsx(n,{children:"\\cred{\\text{erste Spalte}}"})," gewinnt:"]}),e.jsx(t,{children:"\\left\\|\\bA\\right\\|_1 = \\max\\left\\{ \\cred{|1| + |3|},\\; |2| + |0| \\right\\} = \\max\\{\\cred{4}, 2\\} = 4."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Zeilensummennorm:"}),` Die Beträge zeilenweise summieren; hier liefern
`,e.jsx(n,{children:"\\cblue{\\text{beide Zeilen}}"})," denselben Wert:"]}),e.jsx(t,{children:"\\left\\|\\bA\\right\\|_\\infty = \\max\\left\\{ \\cblue{|1| + |2|},\\; \\cblue{|3| + |0|} \\right\\} = \\max\\{\\cblue{3}, \\cblue{3}\\} = 3."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Frobenius-Norm:"})," Wurzel aus der Quadratsumme aller Einträge:"]}),e.jsx(t,{children:"\\left\\|\\bA\\right\\|_F = \\sqrt{1^2 + 2^2 + 3^2 + 0^2} = \\sqrt{14} \\approx 3{,}74."}),e.jsxs(i.p,{children:["Probe über die Spur (",e.jsx(i.a,{href:"#sec-3.2",children:"Abschnitt 3.2"}),`):
`,e.jsx(n,{children:"\\bA^\\top\\bA = \\begin{pmatrix} 10 & 2 \\\\ 2 & 4 \\end{pmatrix}"}),`, also
`,e.jsx(n,{children:"\\tr\\left(\\bA^\\top\\bA\\right) = 10 + 4 = 14 = \\left\\|\\bA\\right\\|_F^2"}),`.
`,e.jsx(n,{children:"\\checkmark"}),` Zum Vergleich: Die Spektralnorm ist
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\sqrt{\\lambda_{\\max}\\left(\\bA^\\top\\bA\\right)} = \\sqrt{7 + \\sqrt{13}} \\approx 3{,}26"}),`,
wie es sein muss kleiner als die Frobenius-Norm.`]})]})}),`
`,e.jsx(i.h3,{children:"Wie geht es weiter?"}),`
`,e.jsxs(i.p,{children:[`Warum der ganze Aufwand? Weil Matrixnormen das zentrale Messwerkzeug der
`,e.jsx(i.em,{children:"Fehleranalyse"}),` sind, mit der wir uns im nächsten Kapitel beschäftigen.
`,e.jsx(a,{id:"condition-number",children:"Konditionszahl"}),`, Rückwärtsfehler, Submultiplikativität und
Verträglichkeit aus `,e.jsx(i.a,{href:"#sec-3.5",children:"Abschnitt 3.5"}),` sind genau die Begriffe, mit denen wir dort
abschätzen, wie viel Vertrauen eine numerisch berechnete Lösung verdient.`]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:"Vertiefung: Heath §2.3; MML §4.1/4.5."})})]})}function pi(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Sn,{...r})}):Sn(r)}const wi={sections:[{id:"3.1",key:"spur",title:"Die Spur einer Matrix",C:be(Zn)},{id:"3.2",key:"matrixnormen",title:"Matrixnormen: Definition und Beispiele",C:be(Yn)},{id:"3.3",key:"operatornormen",title:"Operatornormen",C:be(ti)},{id:"3.4",key:"schattennormen",title:"Schattennormen",C:be(ai)},{id:"3.5",key:"eigenschaften",title:"Eigenschaften von Matrixnormen",C:be(gi)},{id:"3.6",key:"zusammenfassung",title:"Zusammenfassung",C:be(pi)}]};export{wi as default};
