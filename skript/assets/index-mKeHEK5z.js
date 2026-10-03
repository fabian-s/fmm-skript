import{j as e,C as x,M as i,b as w,Q as C,i as D,E,g as Ie,r as y,A as O,s as X,k as fe,F as W,V as P,n as we,d as Y,S as q,G as Q,Z as ke,h as Ge,L as Ce,P as je,o as F,z as Ve,e as ze,f as Se,m as V}from"./index-BGJgxqST.js";import{I as K,E as ge}from"./Interaktiv-Bbglsg7Y.js";function Ae(r){const n={a:"a",em:"em",h3:"h3",li:"li",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Ab hier geht es um ",e.jsx(n.em,{children:"numerische lineare Algebra"}),`: Wie berechnen wir die
Objekte und Operationen der linearen Algebra auf dem Rechner schnell und
verlässlich? Auf dem Programm stehen numerische Methoden für`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"die Matrizenrechnung (Addition, Multiplikation),"}),`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"linear-system",children:"lineare Gleichungssysteme"}),` (der Kern dieses Kapitels,
ab `,e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"}),"),"]}),`
`,e.jsxs(n.li,{children:["Kleinste-Quadrate-Probleme (",e.jsx(n.a,{href:"?k=07-kq",children:"Kapitel 7"}),"),"]}),`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"eigenvalue-eigenvector",children:"Eigenwertprobleme"})," und mehr."]}),`
`]}),`
`,e.jsx(n.p,{children:`Bei jeder Methode achten wir auf zwei Gütekriterien: auf die Kondition
(wie stark verstärken sich kleine Fehler?) und auf die Komplexität (wie
wächst der Aufwand mit der Problemgröße?).`}),`
`,e.jsx(n.h3,{children:"Was wir mitbringen"}),`
`,e.jsx(n.p,{children:"Aus den bisherigen Kapiteln brauchen wir"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["den Algorithmus-Begriff (",e.jsx(n.a,{href:"?k=02-algos#sec-2.1",children:"Abschnitt 2.1"}),`), insbesondere
`,e.jsx(n.em,{children:"direkte Methoden"}),` (endlich viele Schritte, exakte Lösung in exakter
Arithmetik), und die Komplexitätsanalyse mit `,e.jsx(x,{id:"env:landau-symbole",children:"Landau-Symbolen"}),`
(`,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),"),"]}),`
`,e.jsxs(n.li,{children:["die Kondition von Problemen (",e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`) und die Stabilität
von Algorithmen (`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Abschnitt 4.3"}),"),"]}),`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"env:matrixnorm",children:"Matrixnormen"})," (",e.jsx(n.a,{href:"?k=03-matrix-spur-norm#sec-3.2",children:"Abschnitt 3.2"}),`) und Orthogonalmatrizen
mit ihrer perfekten Kondition `,e.jsx(i,{children:"\\corange{\\kappa_2(\\bQ)} = 1"}),`
(`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),")."]}),`
`]}),`
`,e.jsxs(n.p,{children:[`Dazu kommt Grundwissen aus der Linearen Algebra I: das Lösen linearer
Gleichungssysteme mit grundlegenden Methoden,
`,e.jsx(x,{id:"triangular-matrix",children:"Dreiecksmatrizen"}),`,
`,e.jsx(x,{id:"symmetric-matrix",children:"symmetrische"}),` und
`,e.jsx(x,{id:"positive-definite",children:"positiv definite Matrizen"}),` sowie die
`,e.jsx(x,{id:"matrix-inverse",children:"Matrixinverse"}),`. Über Letztere lernen wir in diesem
Kapitel vor allem eines: dass wir sie numerisch `,e.jsx(n.em,{children:"nicht"})," berechnen."]}),`
`,e.jsx(n.h3,{children:"Matrizenrechnung"}),`
`,e.jsxs(n.p,{children:[`Die algorithmische Berechnung der Grundoperationen folgt für gewöhnlich
direkt den mathematischen Formeln. Für die Addition von
`,e.jsx(i,{children:"\\bA, \\bB \\in \\R^{n \\times m}"})," heißt das"]}),`
`,e.jsx(w,{children:`\\bA + \\bB = \\begin{pmatrix}
a_{11} + b_{11} & \\cdots & a_{1m} + b_{1m} \\\\
\\vdots          &        & \\vdots          \\\\
a_{n1} + b_{n1} & \\cdots & a_{nm} + b_{nm}
\\end{pmatrix},`}),`
`,e.jsxs(n.p,{children:["und für die ",e.jsx(x,{id:"matrix-multiplication",children:"Matrixmultiplikation"}),` von
`,e.jsx(i,{children:"\\bA \\in \\R^{n \\times m}"})," mit ",e.jsx(i,{children:"\\bB \\in \\R^{m \\times k}"})]}),`
`,e.jsx(w,{children:`\\bA\\bB = \\begin{pmatrix}
\\sum_{i = 1}^m a_{1i} b_{i1} & \\cdots & \\sum_{i = 1}^m a_{1i} b_{ik} \\\\
\\vdots                       &        & \\vdots                       \\\\
\\sum_{i = 1}^m a_{ni} b_{i1} & \\cdots & \\sum_{i = 1}^m a_{ni} b_{ik}
\\end{pmatrix}.`}),`
`,e.jsxs(n.p,{children:["Jeder Eintrag des Produkts ist also ein ",e.jsx(x,{id:"dot-product",children:"Skalarprodukt"}),`
einer Zeile von `,e.jsx(i,{children:"\\bA"})," mit einer Spalte von ",e.jsx(i,{children:"\\bB"}),"."]}),`
`,e.jsxs(n.p,{children:[`Wie gut diese Operationen konditioniert sind, untersuchen wir in der Übung
mit dem Handwerkszeug aus `,e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`. Ihre Komplexität können
wir sofort bestimmen, indem wir Operationen zählen wie in
`,e.jsx(n.a,{href:"?k=02-algos#sec-2.3",children:"Abschnitt 2.3"}),"."]}),`
`,e.jsxs(n.p,{children:["Was ist die algorithmische Komplexität der ",e.jsx(n.em,{children:"Addition"}),` von
`,e.jsx(i,{children:"\\bA, \\bB \\in \\R^{n \\times m}"}),"? Zur Auswahl stehen ",e.jsx(i,{children:"O(nm)"}),", ",e.jsx(i,{children:"O(n + m)"}),` und
`,e.jsx(i,{children:"O(n^2 m^2)"}),"."]}),`
`,e.jsxs(C,{children:[e.jsxs(D,{wahr:!0,children:[e.jsxs(n.p,{children:["Die Addition gelingt in ",e.jsx(i,{children:"O(nm)"}),` Operationen, und schneller geht es
größenordnungsmäßig auch nicht.`]}),e.jsxs(n.p,{children:["Das Ergebnis hat ",e.jsx(i,{children:"nm"}),` Einträge, und jeder Eintrag kostet genau eine
Addition `,e.jsx(i,{children:"a_{ij} + b_{ij}"}),": zusammen ",e.jsx(i,{children:"nm"})," Additionen, also ",e.jsx(i,{children:"O(nm)"}),`. Weniger
geht nicht, denn schon das Hinschreiben der `,e.jsx(i,{children:"nm"}),` Ergebniseinträge braucht
`,e.jsx(i,{children:"nm"})," Schritte."]})]}),e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Addition gelingt sogar in ",e.jsx(i,{children:"O(n + m)"})," Operationen."]}),e.jsxs(n.p,{children:[e.jsx(i,{children:"n + m"})," ist viel kleiner als ",e.jsx(i,{children:"nm"})," (für ",e.jsx(i,{children:"n = m = 100"})," etwa ",e.jsx(i,{children:"200"}),` gegen
`,e.jsx(i,{children:"10\\,000"}),"). Ein Algorithmus mit nur ",e.jsx(i,{children:"O(n+m)"}),` Schritten könnte nicht einmal
alle Ergebniseinträge schreiben.`]})]}),e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Der Aufwand wächst wie ",e.jsx(i,{children:"n^2 m^2"}),", weil jeder Eintrag von ",e.jsx(i,{children:"\\bA"}),` mit jedem
Eintrag von `,e.jsx(i,{children:"\\bB"})," verrechnet werden muss."]}),e.jsxs(n.p,{children:["Addiert wird nur ",e.jsx(n.em,{children:"paarweise"})," an gleicher Position ",e.jsx(i,{children:"(i,j)"}),`; Einträge an
verschiedenen Positionen treffen nie aufeinander. Als obere Schranke wäre `,e.jsx(i,{children:"O(n^2m^2)"}),` formal korrekt
(Landau-Symbole erlauben Überschätzung, `,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),`), beschreibt das
Wachstum aber grob falsch: Die scharfe Ordnung ist `,e.jsx(i,{children:"nm"}),"."]})]})]}),`
`,e.jsxs(n.p,{children:["Und die ",e.jsx(n.em,{children:"Multiplikation"})," von ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times m}"}),` mit
`,e.jsx(i,{children:"\\bB \\in \\R^{m \\times k}"}),"? Zur Auswahl stehen ",e.jsx(i,{children:"O(nk)"}),", ",e.jsx(i,{children:"O(nmk)"}),` und
`,e.jsx(i,{children:"O(nm + k)"}),"."]}),`
`,e.jsxs(C,{children:[e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Multiplikation kostet ",e.jsx(i,{children:"O(nk)"})," Operationen, denn das Produkt hat ",e.jsx(i,{children:"nk"}),`
Einträge.`]}),e.jsxs(n.p,{children:[e.jsx(i,{children:"nk"}),` zählt nur die Ergebniseinträge. Jeder einzelne ist aber ein
Skalarprodukt der Länge `,e.jsx(i,{children:"m"})," und kostet selbst ",e.jsx(i,{children:"m"}),` Multiplikationen und
`,e.jsx(i,{children:"m - 1"})," Additionen; der Faktor ",e.jsx(i,{children:"m"})," fehlt."]})]}),e.jsxs(D,{wahr:!0,children:[e.jsxs(n.p,{children:["Die Multiplikation nach der Produktformel kostet ",e.jsx(i,{children:"O(nmk)"})," Operationen."]}),e.jsxs(n.p,{children:["Für jede der ",e.jsx(i,{children:"n \\cdot k"})," Kombinationen aus Zeile und Spalte fallen ",e.jsx(i,{children:"m"}),`
Multiplikationen und `,e.jsx(i,{children:"m - 1"}),` Additionen an, insgesamt also
`,e.jsx(i,{children:"nk\\,(2m - 1) = O(nmk)"}),` Operationen. Für quadratische Matrizen
(`,e.jsx(i,{children:"n = m = k"}),") ist das der bekannte ",e.jsx(i,{children:"O(n^3)"}),"-Aufwand."]})]}),e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Es reichen ",e.jsx(i,{children:"O(nm + k)"})," Operationen."]}),e.jsxs(n.p,{children:["Für ",e.jsx(i,{children:"n = m = k"})," wüchse ",e.jsx(i,{children:"nm + k = n^2 + n"}),` nur quadratisch, die Produktformel
braucht aber kubischen Aufwand `,e.jsx(i,{children:"n^3"}),"."]})]})]}),`
`,e.jsx(n.h3,{children:"Geht Matrixmultiplikation schneller?"}),`
`,e.jsxs(n.p,{children:["Für quadratische Matrizen ",e.jsx(i,{children:"\\bA, \\bB \\in \\R^{n \\times n}"}),` gibt es
Algorithmen mit besserer Komplexität als `,e.jsx(i,{children:"O(n^3)"}),`. Der erste stammt von
Strassen (1969): Er zerlegt beide Matrizen in vier Blöcke und kommt mit
sieben statt acht Blockmultiplikationen aus. Rekursiv angewandt kostet das
`,e.jsx(i,{children:"O\\bigl(n^{\\log_2 7}\\bigr)"})," Operationen, also etwa ",e.jsx(i,{children:"O(n^{2{,}8})"}),`, denn
`,e.jsx(i,{children:"\\log_2 7 \\approx 2{,}807"}),`. Der aktuelle Rekord liegt bei etwa
`,e.jsx(i,{children:"O(n^{2{,}37})"}),` (Alman et al., 2024). 2022 hat DeepMinds AlphaTensor per
Reinforcement Learning bisher unbekannte Multiplikationsschemata für kleine
Matrixformate gefunden.`]}),`
`,e.jsx(E,{kind:"Bemerkung",label:"5.1.1 (Warum wir trotzdem mit O(nmk) rechnen)",id:"env-warum-wir-trotzdem-mit-o-nmk-rechnen",children:e.jsxs(n.p,{children:[`Die Landau-Notation versteckt konstante Faktoren, und bei den schnellen
Multiplikationsalgorithmen sind diese Konstanten meist so groß, dass sich die
bessere Ordnung erst bei riesigen Matrizen auszahlen würde. In der Praxis
werden die Verfahren deshalb kaum verwendet. Wir rechnen der Einfachheit
halber immer mit `,e.jsx(i,{children:"O(nmk)"})," für die Multiplikation und ",e.jsx(i,{children:"O(nm)"}),` für die
Addition.`]})}),`
`,e.jsxs(n.p,{children:["Ab ",e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"}),` geht es um das wichtigste Problem der numerischen linearen
Algebra: das Lösen von `,e.jsx(i,{children:"\\bA\\bx = \\bb"}),"."]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.1 (Einstieg in lineare Gleichungssysteme); zur
Komplexitätsanalyse Heath §1.1.`})})]})}function Te(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Ae,{...r})}):Ae(r)}function z(r){if(Number.isNaN(r))return"NaN";if(!Number.isFinite(r))return r>0?"∞":"−∞";let n=Math.round(r*1e3)/1e3;return Object.is(n,-0)&&(n=0),Ie(n,3)}const He=["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉"],M=r=>He[r]??String(r);function U({m:r,cellClass:n,cellStyle:t,label:b}){const d=r.map((a,u)=>`Zeile ${u+1}: ${a.map(s=>s===null?"offen":z(s)).join(", ")}`).join("; ");return e.jsx("div",{role:"img","aria-label":`${b?`${b}, `:""}${r.length} mal ${r[0].length}. ${d}`,className:"inline-grid gap-px self-start rounded border-x-2 border-slate-500 px-1.5 py-1",style:{gridTemplateColumns:`repeat(${r[0].length}, minmax(2.3rem, auto))`},children:r.map((a,u)=>a.map((s,h)=>e.jsx("div",{className:`rounded px-1 py-0.5 text-center font-mono text-xs ${s===null?"text-slate-400":""} ${(n==null?void 0:n(u,h))??""}`,style:t==null?void 0:t(u,h),children:s===null?"·":z(s)},`${u}-${h}`)))})}function I({label:r,children:n}){return e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("span",{className:"text-xs font-medium",style:{color:"var(--w-muted)"},children:r}),n]})}function ve(r,n){const t=r.length,b=new Array(t).fill(null),d=[];for(let a=t-1;a>=0;a--){if(Math.abs(r[a][a])<1e-12)return{x:b,lines:d,failRow:a,failExakt:r[a][a]===0,failPivot:r[a][a]};let u=n[a],s="";for(let h=a+1;h<t;h++)u-=r[a][h]*b[h],s+=` − (${z(r[a][h])})·(${z(b[h])})`;b[a]=u/r[a][a],d.push(`x${M(a+1)} = (${z(n[a])}${s}) / (${z(r[a][a])}) = ${z(b[a])}`)}return{x:b,lines:d,failRow:-1,failExakt:!1,failPivot:NaN}}const{blau:ye,gruen:le,rot:Le}=W;function Je(){const[r,n]=y.useState([[2,1,-1],[0,3,2],[0,0,2]]),[t,b]=y.useState([[3],[7],[4]]),[d,a]=y.useState(1),u=3,s=t.map(g=>g[0]),h=y.useMemo(()=>ve(r,s),[r,t]),l=h.lines.length,c=Math.min(d,l),o=u-c,p=o-1,N=r.map((g,A)=>[...g,s[A]]),_=(g,A)=>A===u?"ml-1 border-l border-slate-400 pl-1":"",j=(g,A)=>{if(g>=o)return{background:le+"26"};if(g===p&&c<l)return A===g?{background:Le+"33",fontWeight:600}:{background:ye+"26"}},f=Math.max(...r.flat().map(g=>Math.abs(g)),1e-30),S=Math.min(...r.map((g,A)=>Math.abs(g[A]))),m=h.failRow<0&&S/f<.001,v=h.x.map((g,A)=>[A>=o?g:null]),Z=(g,A)=>g>=o?{color:le,fontWeight:600}:void 0;return e.jsxs("div",{children:[e.jsx(O,{children:"Schieben wir den Regler bis zur letzten Zeile und verfolgen die Divisionen."}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["U =",e.jsx(X,{value:r,onChange:g=>{n(g.map((A,te)=>A.map((ee,ne)=>ne<te?0:ee))),a(1)}})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["c =",e.jsx(X,{value:t,onChange:g=>{b(g),a(1)}})]})]}),e.jsx(fe,{step:c,setStep:a,max:l,narration:`${c} von ${u} Komponenten bekannt`}),e.jsxs("p",{className:"my-1 text-xs",style:{color:"var(--w-muted)"},children:["Farben: ",e.jsx("span",{style:{color:Le,fontWeight:600},children:"rot"})," das Pivot, durch das geteilt wird, ",e.jsx("span",{style:{color:ye,fontWeight:600},children:"blau"})," die Zeile, die gerade an der Reihe ist, ",e.jsx("span",{style:{color:le,fontWeight:600},children:"grün"})," die fertigen Komponenten."]}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-5",children:[e.jsx(I,{label:"U | c",children:e.jsx(U,{m:N,cellClass:_,cellStyle:j,label:"erweiterte Matrix U senkrecht c"})}),e.jsx(I,{label:"x",children:e.jsx(U,{m:v,cellStyle:Z,label:"Lösungsvektor x"})}),e.jsxs("div",{className:"grow",children:[c>0&&e.jsx("div",{className:"rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800",children:h.lines.slice(0,c).map(g=>e.jsx("div",{children:g},g))}),h.failRow>=0&&c>=l&&(h.failExakt?e.jsxs(P,{kind:"fail",className:"mt-2",children:["Schritt ",h.failRow+1," bleibt stecken: Das Diagonalelement dieser Zeile ist exakt 0, und Formel (",we("eq:gauss-elimination-mit-partieller"),") verlangt, genau dadurch zu teilen. Bei einer Dreiecksmatrix entscheidet allein die Diagonale über die Invertierbarkeit; mit einer Null dort verliert das System seine eindeutige Lösung."]}):e.jsxs(P,{kind:"fail",className:"mt-2",children:["Schritt ",h.failRow+1," bleibt stecken: Das Diagonalelement dieser Zeile ist mit ",z(h.failPivot)," zwar nicht null, aber so winzig, dass die Division jeden Rundungsfehler der Zeile um den Kehrwert aufbläst. Rechnerisch ist das System noch eindeutig lösbar, numerisch ist die Lösung wertlos – genau davor warnt die Pivot-Demo weiter unten."]})),h.failRow<0&&c===l&&l>0&&m&&e.jsxs(P,{kind:"warn",className:"mt-2",children:["Alle Komponenten stehen, aber das kleinste Pivot ist mit ",z(S)," winzig gegen die übrigen Einträge: Die Division dadurch multipliziert jeden Rundungsfehler der Zeile mit rund ",z(f/S),'. Zwischen „null" und „winzig" liegt genau der Unterschied, um den es in ',Y("sec:lgs/lu")," geht."]}),h.failRow<0&&c===l&&l>0&&!m&&e.jsxs(P,{kind:"ok",className:"mt-2",children:["Alle Komponenten stehen. Formel (",we("eq:gauss-elimination-mit-partieller"),") benötigt hier ",h.lines.length," Divisionen, eine je Zeile; allgemein summieren sich Multiplikationen, Subtraktionen und Divisionen zu n² Operationen, also O(n²)."]}),h.failRow<0&&c>0&&c<l&&e.jsx(P,{kind:"neutral",className:"mt-2",children:c===1?"Die letzte Zeile enthält nur eine Unbekannte: eine Division genügt, und die erste Komponente steht (grün).":`Zeile ${p+1} ist an der Reihe (blau): Die ${c} bereits bekannten Komponenten werden eingesetzt, es bleibt eine Gleichung in einer Unbekannten, und die Division durch das rote Pivot löst sie.`})]})]})]})}const de=2220446049250313e-31;function _e(r,n){const t=r.map(s=>s.slice()),b=n.map(s=>s.slice()),d=t.length,a=b[0].length;for(let s=0;s<d;s++){let h=s;for(let l=s+1;l<d;l++)Math.abs(t[l][s])>Math.abs(t[h][s])&&(h=l);[t[s],t[h]]=[t[h],t[s]],[b[s],b[h]]=[b[h],b[s]];for(let l=s+1;l<d;l++){const c=t[l][s]/t[s][s];t[l][s]=0;for(let o=s+1;o<d;o++)t[l][o]-=c*t[s][o];for(let o=0;o<a;o++)b[l][o]-=c*b[s][o]}}const u=Array.from({length:d},()=>Array(a).fill(0));for(let s=d-1;s>=0;s--)for(let h=0;h<a;h++){let l=b[s][h];for(let c=s+1;c<d;c++)l-=t[s][c]*u[c][h];u[s][h]=l/t[s][s]}return u}function Xe(r){const n=Array.from({length:r},(l,c)=>Array.from({length:r},(o,p)=>1/(c+p+1))),t=n.map(l=>[l.reduce((c,o)=>c+o,0)]),b=Array.from({length:r},(l,c)=>Array.from({length:r},(o,p)=>+(c===p))),d=_e(n,t).map(l=>l[0]),a=_e(n,b),u=a.map(l=>l.reduce((c,o,p)=>c+o*t[p][0],0)),s=l=>Math.max(...l.map(c=>Math.abs(c-1))),h=l=>Math.max(...l.map(c=>c.reduce((o,p)=>o+Math.abs(p),0)));return{kappa:h(n)*h(a),direct:s(d),viaInverse:s(u)}}function Qe(r){const n="⁰¹²³⁴⁵⁶⁷⁸⁹";return(r<0?"⁻":"")+String(Math.abs(r)).split("").map(t=>n[Number(t)]).join("")}function pe(r){if(r===0)return"0";const n=Math.floor(Math.log10(Math.abs(r)));return`${(r/10**n).toFixed(2).replace(".",",")} · 10${Qe(n)}`}function ae({label:r,value:n,color:t}){return e.jsxs("div",{className:"rounded border border-slate-200 p-3 dark:border-slate-700",children:[e.jsx("div",{className:"text-xs",style:{color:"var(--w-muted)"},children:r}),e.jsx("div",{className:"font-mono text-lg tabular-nums",style:{color:t},children:pe(n)})]})}function Ye(){const[r,n]=y.useState(11),t=y.useMemo(()=>Xe(r),[r]),b=t.viaInverse/t.direct,d=t.kappa*de>1e-4;return e.jsxs("div",{children:[e.jsx(O,{children:"Verkleinern wir die Ordnung und beobachten, ab wann Rundungsfehler die beiden Rechenwege sichtbar trennen."}),e.jsx(q,{label:"Ordnung n",value:r,onChange:n,min:2,max:11,step:1,marks:[2,5,8,11]}),e.jsxs("div",{className:"my-3 grid gap-2 sm:grid-cols-3",children:[e.jsx(ae,{label:"κ∞(Hₙ)",value:t.kappa}),e.jsx(ae,{label:"relativer Fehler, direkt",value:t.direct,color:W.gruen}),e.jsx(ae,{label:"relativer Fehler, über Inverse",value:t.viaInverse,color:W.rot})]}),e.jsx(P,{kind:d?"warn":"neutral",children:d?`Ab hier überschreitet κ∞ · ε den Wert 10⁻⁴ (aktuell ${pe(t.kappa*de)}): Von den rund 16 Dezimalstellen doppelter Genauigkeit bleiben höchstens vier. Die Matrix ist in dieser Arithmetik stark empfindlich, und der Inversenweg hat hier den ${b.toFixed(1).replace(".",",")}-fachen relativen Fehler des direkten Lösens.`:`κ∞ · ε liegt bei ${pe(t.kappa*de)}, also weit unter 10⁻⁴: Beide Fehler sind noch klein. Der Inversenweg gewinnt aber keine Genauigkeit; einzelne Rundungseffekte lassen das Fehlerverhältnis nicht monoton wachsen.`})]})}function Me(r){const n={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h3,{children:"Problemstellung"}),`
`,e.jsxs(n.p,{children:["Gesucht ist die Lösung ",e.jsx(i,{children:"\\bx"}),` eines
`,e.jsx(x,{id:"linear-system",children:"linearen Gleichungssystems"})," (LGS)"]}),`
`,e.jsx(w,{children:"\\bA \\bx = \\bb ."}),`
`,e.jsxs(n.p,{children:["Ob Kleinste-Quadrate-Schätzer (",e.jsx(n.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),`) oder gemischtes Modell: In
der Statistik steht am Ende fast immer ein solches System.`]}),`
`,e.jsxs(n.p,{children:[`Sinnvoll gestellt ist die Aufgabe nur, wenn es genau eine Lösung gibt. Wir
nehmen deshalb in diesem Kapitel an, dass `,e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"}),`
quadratisch und `,e.jsx(x,{id:"matrix-inverse",children:"invertierbar"}),` ist. Die Lösung lässt sich
dann als `,e.jsx(i,{children:"\\bx = \\bA^{-1}\\bb"}),` schreiben. Diese Formel ist allerdings eine
Schreibweise, kein Rechenweg.`]}),`
`,e.jsxs(E,{kind:"Bemerkung",label:"5.2.1 (Für ein LGS keine explizite Inverse bilden)",id:"env-fuer-ein-lgs-keine-explizite-inverse",children:[e.jsxs(n.p,{children:["Wer nur ",e.jsx(i,{children:"\\bA\\bx=\\bb"}),` lösen will, bildet die Inverse nicht explizit, sondern
`,e.jsx(n.strong,{children:"löst das System direkt"}),". Wo immer in einer Formel ",e.jsx(i,{children:"\\bA^{-1}\\bb"}),` steht,
lösen wir in der Implementierung das LGS `,e.jsx(i,{children:"\\bA\\bx = \\bb"}),`. Zwei Gründe
sprechen gegen den Umweg über `,e.jsx(i,{children:"\\bA^{-1}"}),":"]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Aufwand:"})," ",e.jsx(i,{children:"\\bA^{-1}"})," explizit auszurechnen heißt, die ",e.jsx(i,{children:"n"}),` Systeme
`,e.jsx(i,{children:"\\bA \\bz_j = \\be_j"})," für alle Einheitsvektoren ",e.jsx(i,{children:"\\be_j"}),` zu lösen und danach
noch das Produkt `,e.jsx(i,{children:"\\bA^{-1}\\bb"})," zu bilden: ",e.jsx(i,{children:"n"}),` Lösungen statt einer. Die
Größenordnung (`,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),`) bleibt dabei die einer einzigen
Elimination, weil sich deren teure Vorarbeit für alle `,e.jsx(i,{children:"n"}),` rechten Seiten
wiederverwenden lässt; in der versteckten Konstanten kostet der Umweg aber
ein Mehrfaches.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Genauigkeit:"}),` Bei einer schlecht konditionierten Matrix können die
zusätzlichen Rundungen der Inversenbildung und des anschließenden
Matrix-Vektor-Produkts den Fehler deutlich vergrößern. Einen
Genauigkeitsvorteil bringt der Umweg für eine einzelne rechte Seite nicht.
Gauß-Elimination `,e.jsx(n.em,{children:"mit partieller Pivotierung"}),` ist in der Praxis meist
`,e.jsx(x,{id:"env:vorwaerts-und-rueckwaertsstabilitaet",children:"rückwärtsstabil"}),`. Wie genau die Lösung überhaupt sein kann, begrenzt in
beiden Fällen die `,e.jsx(x,{id:"env:eigenschaften-konditionszahl-einer-matrix",children:"Konditionszahl"})," ",e.jsx(i,{children:"\\corange{\\kappa(\\bA)}"}),`
(`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"})," und ",e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]}),`
`]}),e.jsx(n.p,{children:"Legitim ist eine explizite Inverse, wenn sie selbst das gesuchte Objekt ist."})]}),`
`,e.jsxs(E,{kind:"Beispiel",label:"5.2.2 (Hilbert-Matrix: Inverse gegen direktes Lösen)",id:"env-hilbert-matrix-inverse-vs-loesen",children:[e.jsxs(n.p,{children:["Die Hilbert-Matrix ",e.jsx(i,{children:"\\bH_n"})," mit Einträgen ",e.jsx(i,{children:"h_{ij} = 1/(i+j-1)"}),` ist schon für
kleine `,e.jsx(i,{children:"n"})," sehr schlecht konditioniert; für ",e.jsx(i,{children:"n = 11"}),` ist
`,e.jsx(i,{children:"\\corange{\\kappa_2(\\bH_{11})} \\approx 5 \\cdot 10^{14}"}),`. Wir wählen die exakte Lösung
`,e.jsx(i,{children:"\\bx = (1,\\ldots,1)^\\top"}),", berechnen ",e.jsx(i,{children:"\\bb = \\bH_n\\bx"}),` und lösen in R direkt
mit `,e.jsx(n.code,{children:"solve(A, b)"})," und über die Inverse mit ",e.jsx(n.code,{children:"solve(A) %*% b"}),":"]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-r",children:`n <- 11 # Hilbert-Matrix
A <- outer(1:n, 1:n,
           function(i, j) 1 / (i + j - 1))
x <- rep(1, n)
b <- A %*% x

range((solve(A) %*% b) - x) # Fehler über Inverse
range(solve(A, b) - x)      # Fehler direkte Lösung
`})}),e.jsxs(n.p,{children:["Für ",e.jsx(i,{children:"n=11"}),` haben wir beide Wege mit derselben einfachen Gauß-Elimination
mit partieller Pivotierung in JavaScript nachgerechnet. Beim direkten Lösen
ist der relative Fehler
`,e.jsx(i,{children:"\\|\\widehat{\\bx}-\\bx\\|_\\infty/\\|\\bx\\|_\\infty \\approx 9{,}66\\cdot 10^{-3}"}),`,
über die explizite Inverse etwa `,e.jsx(i,{children:"3{,}73\\cdot 10^{-1}"}),": rund ",e.jsx(i,{children:"38{,}6"}),`-mal
ungenauer. Die genauen Werte hängen von Algorithmus, Reihenfolge der
Operationen und Gleitkommaarithmetik ab (R rechnet mit LAPACK und kann andere
Zahlen liefern); allgemeine Fehlerschranken sind sie nicht.`]})]}),`
`,e.jsxs(K,{title:"Kondition und Rechenweg",children:[e.jsx(n.p,{children:"Ab welcher Ordnung trennen die Rundungsfehler die beiden Rechenwege sichtbar?"}),e.jsx(Ye,{}),e.jsxs(n.p,{children:["Ab ",e.jsx(i,{children:"n = 9"})," übersteigt ",e.jsx(i,{children:"\\kappa_\\infty(\\bH_n) \\cdot \\eps"})," den Wert ",e.jsx(i,{children:"10^{-4}"}),`:
Von den rund 16 Dezimalstellen doppelter Genauigkeit bleiben dann höchstens
vier. Die Kondition bestimmt, wie empfindlich beide Rechenwege sind; genauer
als das direkte Lösen ist der Inversenweg bei keiner Ordnung.`]})]}),`
`,e.jsx(n.h3,{children:"Gauß-Elimination und Rückwärtssubstitution"}),`
`,e.jsxs(n.p,{children:[`Direkt lösen wir mit dem
`,e.jsx(x,{id:"gaussian-elimination",children:"Gauß'schen Eliminationsverfahren"}),` aus der linearen
Algebra. Es besteht aus zwei Phasen:`]}),`
`,e.jsx(E,{kind:"Algorithmus",label:"5.2.3 (Gauß-Elimination mit partieller Pivotierung)",id:"env-gauss-elimination-mit-partieller",children:e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Wähle in Eliminationsschritt ",e.jsx(i,{children:"k"})," unter den Zeilen ",e.jsx(i,{children:"k,\\ldots,n"}),` einen
Eintrag mit maximalem Betrag in Spalte `,e.jsx(i,{children:"k"}),` und tausche seine Zeile nach oben.
Eliminiere anschließend die Einträge darunter. So entsteht aus
`,e.jsx(i,{children:"(\\bA \\mid \\bb)"})," eine Zeilenstufenform ",e.jsx(i,{children:"(\\bU \\mid \\bc)"}),` mit oberer
`,e.jsx(x,{id:"triangular-matrix",children:"Dreiecksmatrix"})," ",e.jsx(i,{children:"\\bU"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Löse das gestaffelte System"}),`
`,e.jsx(w,{children:`\\begin{array}{ccccccccc}
u_{11} x_1 & + & u_{12} x_2 & + & \\dots  & + & u_{1n} x_n & = & c_1    \\\\
           &   & u_{22} x_2 & + & \\dots  & + & u_{2n} x_n & = & c_2    \\\\
           &   &            &   & \\ddots &   & \\vdots     &   & \\vdots \\\\
           &   &            &   &        &   & u_{nn} x_n & = & c_n
\\end{array}`}),`
`,e.jsxs(n.p,{children:["durch ",e.jsx(n.em,{children:"Rückwärtssubstitution"})," (backward substitution):"]}),`
`,e.jsx(Q,{tag:"5.2.1",id:"eq-gauss-elimination-mit-partieller",children:"x_{n} = c_n / u_{nn}, \\quad x_{i} = \\biggl(c_{i} - \\sum_{j = i + 1}^n u_{ij} x_j\\biggr) / u_{ii} \\quad (i \\le n - 1)."}),`
`]}),`
`]})}),`
`,e.jsxs(n.p,{children:["Die letzte Gleichung des gestaffelten Systems enthält nur noch ",e.jsx(i,{children:"x_n"}),` und
verrät diesen Wert sofort. Danach arbeiten wir uns Zeile für Zeile nach
oben. Im Farbcode dieses Kapitels: Ist Zeile `,e.jsx(i,{children:"i"}),` an der Reihe (blau), sind
die Komponenten aus den Zeilen darunter schon bekannt (grün). Die Zeile
setzt sie ein und teilt zum Schluss durch ihr Diagonalelement, das Pivot
(rot):`]}),`
`,e.jsx(w,{children:"\\cblue{x_i} = \\Bigl(c_i - \\sum_{j = i + 1}^n u_{ij} \\, \\cgreen{x_j}\\Bigr) \\Big/ \\cred{u_{ii}} ."}),`
`,e.jsxs(n.p,{children:[`Mit partieller Pivotierung garantiert die Invertierbarkeit in jedem Schritt
ein von null verschiedenes Pivot. `,e.jsx(n.em,{children:"Ohne"}),` Zeilentausch reicht sie nicht, ein
Nullpivot kann trotzdem auftreten
(`,e.jsx(n.a,{href:"#env-invertierbar-aber-keine-lu-zerlegung",children:"Beispiel 5.3.5"}),`). Auch ein sehr kleines
Pivot ist in Gleitkommaarithmetik gefährlich; deshalb wählen wir den
betragsgrößten Eintrag (mehr dazu in `,e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"}),")."]}),`
`,e.jsxs(K,{title:"Rückwärtseinsetzen Schritt für Schritt",children:[e.jsxs(n.p,{children:["Die Formel ",e.jsx(n.a,{href:"#eq-gauss-elimination-mit-partieller",children:"(5.2.1)"}),` bestimmt die Komponenten von
unten nach oben. Zählen wir dabei die Divisionen.`]}),e.jsx(Je,{}),e.jsxs(n.p,{children:["Und was kostet die zweite Phase für ein ",e.jsx(i,{children:"n \\times n"}),`-System
(`,e.jsx(x,{id:"big-o-notation",children:"Landau-Notation"}),": ",e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),")?"]}),e.jsxs(C,{children:[e.jsxs(ke,{loesung:3,toleranz:0,children:[e.jsx(n.p,{children:"Wie viele Divisionen hat das voreingestellte Rückwärtseinsetzen im Widget?"}),e.jsx(n.p,{children:"Eine pro Diagonalzeile, also drei."})]}),e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Rückwärtssubstitution für ein ",e.jsx(i,{children:"n \\times n"}),"-System hat die Komplexität ",e.jsx(i,{children:"O(1)"}),"."]}),e.jsxs(n.p,{children:["Konstanter Aufwand ist unmöglich: Schon um jeden Eintrag von ",e.jsx(i,{children:"\\bU"}),` einmal
anzufassen, braucht es mit `,e.jsx(i,{children:"n"})," wachsende Arbeit."]})]}),e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Rückwärtssubstitution für ein ",e.jsx(i,{children:"n \\times n"}),"-System hat die Komplexität ",e.jsx(i,{children:"O(n)"}),", denn sie besteht aus ",e.jsx(i,{children:"n"})," Schritten."]}),e.jsxs(n.p,{children:[`Die Schrittzahl stimmt, aber die Schritte sind nicht konstant teuer:
Schritt `,e.jsx(i,{children:"i"})," setzt die ",e.jsx(i,{children:"n - i"}),` schon bekannten Komponenten ein, im
ungünstigsten Fall also `,e.jsx(i,{children:"n - 1"})," Stück."]})]}),e.jsxs(D,{wahr:!0,children:[e.jsxs(n.p,{children:["Die Rückwärtssubstitution für ein ",e.jsx(i,{children:"n \\times n"}),"-System hat die Komplexität ",e.jsx(i,{children:"O(n^2)"}),"."]}),e.jsxs(n.p,{children:["Es sind ",e.jsx(i,{children:"n"})," Schritte, und Schritt ",e.jsx(i,{children:"i"}),` kostet nach Formel
`,e.jsx(n.a,{href:"#eq-gauss-elimination-mit-partieller",children:"(5.2.1)"})," je ",e.jsx(i,{children:"n - i"}),` Multiplikationen und ebenso
viele Subtraktionen, dazu eine Division. Aufsummiert sind das
`,e.jsx(i,{children:"n(n-1)/2 \\approx n^2/2"})," Multiplikationen und insgesamt genau ",e.jsx(i,{children:"n^2"}),`
Rechenoperationen, also `,e.jsx(i,{children:"O(n^2)"}),"."]})]}),e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Rückwärtssubstitution für ein ",e.jsx(i,{children:"n \\times n"}),"-System hat die Komplexität ",e.jsx(i,{children:"O(n^3)"}),"."]}),e.jsxs(n.p,{children:["Das überschätzt den Aufwand um einen Faktor ",e.jsx(i,{children:"n"}),". (Formal enthält ",e.jsx(i,{children:"O(n^3)"}),`
auch alle `,e.jsx(i,{children:"O(n^2)"}),`-Algorithmen, gemeint ist hier aber die Größenordnung des
tatsächlichen Aufwands.) Bei `,e.jsx(i,{children:"O(n^3)"}),` liegt erst die Eliminationsphase, wie
wir in `,e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"})," sehen werden."]})]})]})]}),`
`,e.jsx(n.h3,{children:"Warum Matrixzerlegungen?"}),`
`,e.jsxs(n.p,{children:[`Die Gauß-Elimination löst unser LGS. In den nächsten Abschnitten
organisieren wir sie als `,e.jsx(n.em,{children:"Matrixzerlegung"}),` (matrix decomposition) neu. Die
Grundidee ist „Teile und herrsche" für Matrizen:
Statt direkt mit `,e.jsx(i,{children:"\\bA"})," zu arbeiten, schreiben wir ",e.jsx(i,{children:"\\bA = \\bB\\bC"}),` mit
„einfachen" Faktoren `,e.jsx(i,{children:"\\bB"})," und ",e.jsx(i,{children:"\\bC"}),"."]}),`
`,e.jsxs(n.p,{children:[`Eine Analogie ist die Primfaktorzerlegung. Es gilt
`,e.jsx(i,{children:"84 = 2^2 \\cdot 3 \\cdot 7"}),`, und wer diese Zerlegung kennt, rechnet
leichter weiter:`]}),`
`,e.jsx(w,{children:"84 \\cdot 126 = (2^2 \\cdot 3 \\cdot 7) \\cdot (2 \\cdot 3^2 \\cdot 7) = 2^3 \\cdot 3^3 \\cdot 7^2 ."}),`
`,e.jsx(n.p,{children:`Multiplizieren wird zum Addieren von Exponenten. Für Matrizen suchen wir
entsprechend Faktoren, mit denen sich leicht rechnen lässt. Drei Familien
haben sich als „einfach" bewährt:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"triangular-matrix",children:"Dreiecksmatrizen"}),`: Ein Dreieckssystem lösen wir
per Vorwärts- bzw. Rückwärtssubstitution in `,e.jsx(i,{children:"O(n^2)"})," statt ",e.jsx(i,{children:"O(n^3)"}),`,
wie eben gesehen.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"orthogonal-matrix",children:"Orthogonale Matrizen"}),`: Sie verstärken Störungen in
der `,e.jsx(i,{children:"2"}),"-Norm nicht und sind wegen ",e.jsx(i,{children:"\\bQ^{-1} = \\bQ^\\top"}),` trivial zu
invertieren.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"diagonal-matrix",children:"Diagonalmatrizen"}),`: Invertieren, Multiplizieren und
Potenzieren laufen elementweise auf der Diagonalen.`]}),`
`]}),`
`,e.jsx(n.p,{children:"Was bringt uns eine Zerlegung?"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mehrere LGS mit derselben Matrix effizient lösen."}),` Die Zerlegung
rechnen wir einmal; danach braucht jedes weitere System
`,e.jsx(i,{children:"\\bA\\bx = \\bb_i"}),` nur noch die schnellen Dreiecks- oder
Diagonallösungen. In der Statistik ist das der Normalfall, etwa wenn
dieselbe Modellmatrix auf viele Zielvariablen trifft.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Numerische Stabilität verbessern."}),` Wer die Arbeit in gut
konditionierte Teilschritte zerlegt, etwa über orthogonale Faktoren,
vermeidet unnötige Fehlerverstärkung (`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Abschnitt 4.3"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Struktur und Eigenschaften von ",e.jsx(i,{children:"\\bA"})," erkennen."]}),` An den Faktoren
lässt sich ablesen, ob `,e.jsx(i,{children:"\\bA"}),` (fast) singulär oder
`,e.jsx(x,{id:"positive-definite",children:"positiv definit"}),` ist; solche Diagnosen fallen
bei der Zerlegung nebenbei ab.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grundlage für weitere Algorithmen."}),` Auf Zerlegungen bauen viele
Verfahren auf, von der QR-Zerlegung für das KQ-Problem
(`,e.jsx(n.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),`) bis zur Spektralzerlegung und der
`,e.jsx(x,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"})," (",e.jsx(n.em,{children:"SVD"}),`,
`,e.jsx(n.a,{href:"?k=06-svd",children:"Kapitel 6"}),")."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Den Anfang macht in ",e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"}),` die LU-Zerlegung, die Gauß-Elimination in
Matrixform.`]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.1–2.2 (Problemstellung und Lösbarkeit) sowie §2.4.2
(Dreieckssysteme und Rückwärtssubstitution).`})})]})}function en(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Me,{...r})}):Me(r)}const{rot:ce,blau:T,gruen:H}=W,nn={init:"Startzustand",mult:"Multiplikatoren bestimmen",apply:"Zeilen abziehen",fail:"Abbruch: kein brauchbares Pivot",done:"Zerlegung fertig"};function rn(r){if(r===0)return"0";const n=Math.floor(Math.log10(Math.abs(r)));return`${z(r/10**n)} · 10^${n}`}function sn(r){return r.map(n=>[...n])}function tn(r,n){const t=r.length,b=r.map(l=>[...l]),d=[...n],a=r.map((l,c)=>r.map((o,p)=>c===p?1:c<p?0:null)),u=[],s=(l,c,o,p)=>u.push({phase:l,k:c,W:b.map(N=>[...N]),bw:[...d],L:sn(a),Lk:o,lines:p});s("init",-1,null,[]);for(let l=0;l<t-1;l++){const c=b[l][l];if(Math.abs(c)<1e-12)return s("fail",l,null,[`m${M(l+1)}${M(l+1)} = 0  ⇒  Abbruch in Spalte ${l+1}`]),u;const o=[],p=r.map((j,f)=>r.map((S,m)=>f===m?1:0)),N=[];for(let j=l+1;j<t;j++)o[j]=b[j][l]/c,p[j][l]=-o[j],a[j][l]=o[j],N.push(`l${M(j+1)}${M(l+1)} = m${M(j+1)}${M(l+1)}/m${M(l+1)}${M(l+1)} = ${z(b[j][l])}/${z(c)} = ${z(o[j])}`);s("mult",l,p,N);const _=[];for(let j=l+1;j<t;j++){for(let f=l;f<t;f++)b[j][f]-=o[j]*b[l][f];b[j][l]=0,d[j]-=o[j]*d[l],_.push(`Zeile ${j+1} ← Zeile ${j+1} − (${z(o[j])}) · Zeile ${l+1}   (ebenso b${M(j+1)} ← b${M(j+1)} − (${z(o[j])}) · b${M(l+1)})`)}s("apply",l,p,_)}const{lines:h}=ve(b,d);return s("done",-1,null,h),u}function ln(){const[r,n]=y.useState([[2,1,-1],[4,-6,0],[-2,7,2]]),[t,b]=y.useState([[5],[-2],[9]]),[d,a]=y.useState(0),u=y.useMemo(()=>tn(r,t.map(m=>m[0])),[r,t]),s=u[Math.min(d,u.length-1)],h=r.length,l=u.length-1,c=s.W.map((m,v)=>[...m,s.bw[v]]),o=(m,v)=>v===h?"ml-1 border-l border-slate-400 pl-1":"",p=(m,v)=>{if(s.phase==="mult"){if(m===s.k&&v===s.k)return{background:ce+"33",fontWeight:600};if(v===s.k&&m>s.k)return{background:T+"26"}}if(s.phase==="apply"){if(v===s.k&&m>s.k)return{background:H+"26",fontWeight:600};if(m>s.k&&v>=s.k)return{background:T+"1a"}}if(s.phase==="fail"&&m===s.k&&v===s.k)return{background:ce+"33",fontWeight:600}},N=(m,v)=>s.phase==="mult"&&v===s.k&&m>s.k?{color:H,fontWeight:600}:void 0,_=(m,v)=>v===s.k&&m>s.k?{color:T,fontWeight:600}:void 0,j=y.useMemo(()=>s.phase==="done"?ve(s.W,s.bw):null,[s]),f=y.useMemo(()=>{if(s.phase!=="done")return null;let m=0;for(let v=0;v<h;v++)for(let Z=0;Z<h;Z++){let g=0;for(let A=0;A<h;A++)g+=(s.L[v][A]??0)*(A<=Z?s.W[A][Z]:0);m=Math.max(m,Math.abs(g-r[v][Z]))}return m},[s,r,h]),S={init:e.jsxs(e.Fragment,{children:["Startzustand. Rechts vom Strich steht die rechte Seite, die jede Zeilenoperation mitmacht. Von ",e.jsx("span",{className:"font-mono",children:"L"})," kennen wir bisher nur das Gerüst aus Einsen und Nullen; auf den Punkten darunter landen gleich die Multiplikatoren, einer pro eliminiertem Eintrag."]}),mult:e.jsxs(e.Fragment,{children:["Spalte ",s.k+1,", erste Hälfte. Auf der Diagonalen sitzt das Pivot (",e.jsx("span",{style:{color:ce,fontWeight:600},children:"rot"}),"); darunter stehen die Einträge, die weg sollen (",e.jsx("span",{style:{color:T,fontWeight:600},children:"blau"}),"). Jeder von ihnen geteilt durch das Pivot ergibt seinen Multiplikator, und den notieren wir uns an derselben Stelle in ",e.jsx("span",{className:"font-mono",children:"L"})," ","(",e.jsx("span",{style:{color:H,fontWeight:600},children:"grün"}),"). In"," ",e.jsxs("span",{className:"font-mono",children:["L",M(s.k+1)]})," steht derselbe Wert negativ, denn diese Matrix zieht ab, was ",e.jsx("span",{className:"font-mono",children:"L"})," aufbewahrt."]}),apply:e.jsxs(e.Fragment,{children:["Zweite Hälfte: Von jeder Zeile unterhalb des Pivots ziehen wir die mit ihrem Multiplikator skalierte Pivotzeile ab. In Spalte ",s.k+1," liefert das die gewünschte Null (",e.jsx("span",{style:{color:H,fontWeight:600},children:"grün"}),"), weiter rechts neue Werte in der Zeile und in der rechten Seite (",e.jsx("span",{style:{color:T,fontWeight:600},children:"blau"}),"). Die Zeilen oberhalb des Pivots bleiben, wie sie sind."]}),fail:s.phase==="fail"&&s.W[s.k][s.k]!==0?e.jsxs(e.Fragment,{children:["Auf dem Pivotplatz steht mit ",z(s.W[s.k][s.k])," keine Null, aber ein so winziger Wert, dass die Multiplikatoren riesig würden und die Elimination hier abbricht. Das ist der numerische, nicht der algebraische Fall: Ohne Zeilentausch bläst die Division jeden Rundungsfehler auf – die Pivot-Demo unten führt es vor."]}):e.jsxs(e.Fragment,{children:["Auf dem Pivotplatz steht eine Null. Ein Multiplikator wäre hier nur mit einer Division durch null zu haben, also endet die Elimination an dieser Stelle. Invertierbar darf die Matrix dabei durchaus sein (",Y("beispiel:invertierbar-aber-keine-lu-zerlegung"),"); wer weiterrechnen will, tauscht zuerst Zeilen."]}),done:e.jsxs(e.Fragment,{children:["Unterhalb der Diagonalen ist nichts mehr übrig: Die Arbeitsmatrix ist das gesuchte"," ",e.jsx("span",{className:"font-mono",children:"U"}),". Dieselben Operationen haben aus"," ",e.jsx("span",{className:"font-mono",children:"b"})," den Vektor ",e.jsx("span",{className:"font-mono",children:"y"})," ","gemacht, den auch die Vorwärtssubstitution mit"," ",e.jsx("span",{className:"font-mono",children:"L"})," geliefert hätte. Bleibt der letzte Schritt: rückwärts durch ",e.jsx("span",{className:"font-mono",children:"Ux = y"}),"."]})};return e.jsxs("div",{children:[e.jsx(O,{children:"Schieben wir durch die Phasen und vergleichen jede neue Null mit dem Eintrag in L."}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["A =",e.jsx(X,{value:r,onChange:m=>{n(m),a(0)},step:1})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["b =",e.jsx(X,{value:t,onChange:m=>{b(m),a(0)},step:1})]})]}),e.jsx(fe,{step:Math.min(d,l),setStep:a,max:l,narration:nn[s.phase]}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-5",children:[e.jsx(I,{label:s.phase==="done"?"U | y  (fertig)":"Arbeitsmatrix | b",children:e.jsx(U,{m:c,cellClass:o,cellStyle:p})}),s.Lk&&s.phase==="mult"&&e.jsx(I,{label:`L${M(s.k+1)} (Eliminationsmatrix)`,children:e.jsx(U,{m:s.Lk,cellStyle:_})}),e.jsx(I,{label:"L (Multiplikatoren)",children:e.jsx(U,{m:s.L,cellStyle:N})})]}),e.jsx(P,{kind:s.phase==="fail"?"fail":s.phase==="done"?"ok":"neutral",children:S[s.phase]}),s.lines.length>0&&e.jsx("div",{className:"mt-2 rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800",children:s.lines.map(m=>e.jsx("div",{children:m},m))}),s.phase==="done"&&j&&e.jsx(P,{kind:j.failRow>=0?"fail":"ok",className:"mt-2",children:j.failRow>=0?j.failExakt?e.jsxs(e.Fragment,{children:["In Zeile ",j.failRow+1," von ",e.jsx("span",{className:"font-mono",children:"U"})," steht eine exakte Null auf der Diagonalen. Dividieren lässt sich dort nicht, und das liegt nicht am Verfahren: Diese Matrix ist singulär."]}):e.jsxs(e.Fragment,{children:["In Zeile ",j.failRow+1," von ",e.jsx("span",{className:"font-mono",children:"U"})," steht mit"," ",z(j.failPivot)," zwar keine Null, aber ein winziges Diagonalelement. Algebraisch ist die Matrix damit regulär, numerisch aber so nah an der Singularität, dass die Rückwärtssubstitution abbricht."]}):e.jsxs(e.Fragment,{children:["Lösung:"," ",e.jsxs("span",{className:"font-mono",style:{color:H,fontWeight:600},children:["x = (",j.x.map(m=>z(m)).join("; "),")"]}),". Probe der Zerlegung: max |A − L·U| ="," ",e.jsx("span",{className:"font-mono",children:rn(f??0)}),"."]})})]})}const{rot:dn,gruen:an}=W;function he(r){if(Number.isNaN(r))return"NaN";if(!Number.isFinite(r))return r>0?"∞":"−∞";if(r===0)return"0";const n=Math.abs(r);return n>=1e5||n<.001?r.toExponential(1).replace("-","−").replace(".",","):Ie(Number(r.toPrecision(4)),4)}function cn(){const[r,n]=y.useState(-15),t=Math.pow(10,r),b=1/t,d=1-b,a=1+t,u=2,s=(u-b*a)/d,h=(a-s)/t,l=(a-t*u)/(1-t),c=u-l,o=Math.abs(h-1)+Math.abs(s-1),p=Math.abs(c-1)+Math.abs(l-1),N=d===-b,_=(j,f,S,m)=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:j}),e.jsx("td",{className:"pr-3 text-right font-mono tabular-nums",children:he(f)}),e.jsx("td",{className:"pr-3 text-right font-mono tabular-nums",children:he(S)}),e.jsxs("td",{className:"text-right font-mono tabular-nums",style:m<1e-4?{color:an}:{color:dn,fontWeight:600},children:[e.jsx("span",{"aria-hidden":"true",children:m<1e-4?"✓ ":"✗ "}),m===0?"0":m.toExponential(2).replace(".",",")]})]});return e.jsxs("div",{className:"text-sm",children:[e.jsx(O,{children:"Schieben wir ε nach unten und vergleichen die beiden Fehlerzeilen."}),e.jsxs("p",{className:"mb-2",children:["Testsystem ist"," ",e.jsx(i,{children:"\\begin{pmatrix} \\cred{\\epsilon} & 1 \\\\ 1 & 1 \\end{pmatrix} \\bx = \\begin{pmatrix} 1+\\epsilon \\\\ 2 \\end{pmatrix}"})," ","mit der Lösung ",e.jsx(i,{children:"\\bx = (1, 1)^\\top"}),", die wir von Hand ablesen können. Beide Tabellenzeilen rechnen denselben Weg in float64 nach (",e.jsx(i,{children:"\\eps_{\\text{mach}} \\approx 2{,}2 \\cdot 10^{-16}"}),"), einmal mit"," ",e.jsx(i,{children:"\\cred{\\epsilon}"})," als Pivot und Multiplikator ",e.jsx(i,{children:"1/\\epsilon"}),", einmal nach Zeilentausch mit Pivot 1 und Multiplikator ",e.jsx(i,{children:"\\epsilon"}),". Jede Abweichung von 1 in der Tabelle ist also reiner Rundungsfehler."]}),e.jsx(q,{label:"log₁₀ ε",value:r,onChange:n,min:-18,max:-1,step:1,fmt:j=>`ε = 1e${j}`}),e.jsxs("table",{className:"mt-2",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-left text-xs",style:{color:"var(--w-muted)"},children:[e.jsx("th",{className:"pr-3 font-medium",children:"Strategie"}),e.jsx("th",{className:"pr-3 text-right font-medium",children:"x₁"}),e.jsx("th",{className:"pr-3 text-right font-medium",children:"x₂"}),e.jsx("th",{className:"text-right font-medium",children:"Fehler (1-Norm)"})]})}),e.jsxs("tbody",{children:[_("ohne Zeilentausch (Pivot ε)",h,s,o),_("mit Zeilentausch (Pivot 1)",c,l,p)]})]}),e.jsxs(P,{kind:N?"fail":o<1e-4?"ok":"warn",className:"mt-2",children:["Gerechnet wird dabei ",e.jsx(i,{children:"u_{22} = \\text{fl}(1 - 1/\\epsilon) ="})," ",e.jsx("span",{className:"font-mono",children:he(d)}),N?e.jsx("span",{className:"ml-1",children:", exakt −1/ε: Die Subtraktion hat die 1 restlos geschluckt. In der Zerlegung steckt der Eintrag a₂₂ = 1 damit gar nicht mehr, und L·U reproduziert A nicht."}):e.jsxs("span",{className:"ml-1",children:[". Der Eintrag a₂₂ = 1 hat die Subtraktion überstanden, ganz oder in Teilen: Im schlechteren Lösungseintrag stimmen noch rund"," ",Math.max(0,Math.round(-Math.log10(Math.max(o,1e-17))))," Stellen."]})]})]})}const{gruen:oe,rot:xe}=W,ue=500,ie=(r,n)=>r*r*r/3+n*r*r,re=(r,n)=>n*(r*r*r/3+r*r);function De(r){if(!Number.isFinite(r))return"∞";if(r>=1e5){const n=Math.floor(Math.log10(r)),t=r/Math.pow(10,n);return e.jsxs(e.Fragment,{children:[t.toFixed(1).replace(".",",")," · 10",e.jsx("sup",{children:n})]})}return Math.round(r).toLocaleString("de-DE")}function hn(){const[r,n]=y.useState(100),[t,b]=y.useState(50),d=ie(r,t),a=re(r,t),u=a/d,{series:s,yDomain:h}=y.useMemo(()=>{const l=[{f:p=>p>=1?Math.log10(ie(r,p)):NaN,color:oe},{f:p=>p>=1?Math.log10(re(r,p)):NaN,color:xe}],c=Math.log10(ie(r,1)),o=Math.log10(re(r,ue));return{series:l,yDomain:[c-.4,o+.3]}},[r]);return e.jsx(Ge,{frage:"Bei wie vielen rechten Seiten lohnt sich das einmalige Zerlegen?",loesung:2,toleranz:.5,min:1,max:10,schritt:1,start:5,verdeckt:e.jsx("div",{className:"max-w-prose text-sm",children:e.jsxs("p",{children:["Gleichsetzen der beiden Kosten: ",e.jsx("span",{className:"font-mono",children:"n³/3 + J·n² = J·(n³/3 + n²)"}),", also ",e.jsx("span",{className:"font-mono",children:"n³/3 = J·n³/3"})," und damit"," ",e.jsx("span",{className:"font-mono",children:"J = 1"})," als Gleichstand. Schon die zweite rechte Seite bezahlt die Zerlegung nur einmal statt zweimal – ab ",e.jsx("span",{className:"font-mono",children:"J = 2"})," ","ist die gespeicherte Zerlegung strikt billiger."]})}),children:e.jsxs("div",{className:"text-sm",children:[e.jsx(O,{children:"Vergleichen wir die beiden Kostenkurven bei verschiedenen Werten von J."}),e.jsxs("div",{className:"max-w-md",children:[e.jsx(q,{label:"n",value:r,onChange:l=>n(Math.round(l)),min:10,max:1e3,step:10,fmt:l=>String(l)}),e.jsx(q,{label:"J",value:t,onChange:l=>b(Math.round(l)),min:1,max:ue,step:1,fmt:l=>String(l)})]}),e.jsxs("div",{className:"mt-2 flex flex-wrap items-start gap-6",children:[e.jsx(Ce,{xLabel:"J (rechte Seiten)",yLabel:"log₁₀ Multiplikationen",series:s,xDomain:[1,Math.max(10,Math.min(ue,2*t))],yDomain:h,width:360,height:240,markers:[{x:t,y:Math.log10(ie(r,t)),color:oe},{x:t,y:Math.log10(re(r,t)),color:xe}]}),e.jsxs("div",{className:"max-w-xs space-y-1",children:[e.jsxs("p",{className:"font-mono text-xs",children:["n = ",r,", J = ",t]}),e.jsxs("p",{className:"font-mono text-xs",style:{color:oe},children:["zerlegen + substituieren: ",De(d)]}),e.jsxs("p",{className:"font-mono text-xs",style:{color:xe},children:["jedes Mal neu: ",De(a)]}),e.jsxs("p",{className:"font-mono text-xs",children:["Ersparnisfaktor: ",u.toFixed(1).replace(".",","),"×"]}),t===1?e.jsx(P,{kind:"neutral",titel:"Gleichstand.",children:"Bei einer einzigen rechten Seite rechnen beide Strategien dasselbe: n³/3 + n² gegen 1 · (n³/3 + n²). Die Zerlegung zu speichern kostet nichts und bringt nichts."}):t<=5?e.jsxs(P,{kind:"ok",titel:"Amortisiert.",children:["Ab der zweiten rechten Seite fällt der teure Anteil n³/3 nur noch einmal an statt J-mal; bei J = ",t," ist das der Faktor ",u.toFixed(1).replace(".",","),"×. Die Zerlegung hat sich also schon bezahlt gemacht."]}):t>=r?e.jsxs(P,{kind:"ok",titel:"Die Ersparnis läuft in ihre Schranke.",children:["Für J ≫ n dominiert in beiden Kosten der J-Anteil: Der Faktor strebt gegen (n³/3 + n²)/n² ≈ n/3 ="," ",(r/3).toFixed(1).replace(".",",")," und steht bei J = ",t," schon bei"," ",u.toFixed(1).replace(".",","),"×. Mehr als rund n/3 ist nicht zu holen."]}):e.jsxs(P,{kind:"ok",titel:"Deutlich billiger.",children:["Bei J = ",t," spart die gespeicherte Zerlegung den Faktor"," ",u.toFixed(1).replace(".",","),"×, weil die Elimination J-mal statt einmal bezahlt würde. Mit wachsendem J läuft dieser Faktor gegen n/3 ="," ",(r/3).toFixed(1).replace(".",","),"."]})]})]})]})})}function Ee(r){const n={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h3,{children:"Elimination als Zerlegung"}),`
`,e.jsxs(n.p,{children:["Die Gauß-Elimination aus ",e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"})," verwandelt ",e.jsx(i,{children:"(\\bA \\mid \\bb)"}),` durch
Zeilenoperationen in ein gestaffeltes System. Dabei zerlegt sie auch die
Matrix selbst. Alles, was wir dabei tun, halten zwei Faktoren fest:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bL"})," (",e.jsx(n.em,{children:"lower"}),") speichert sämtliche Eliminationsschritte,"]}),`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bU"})," (",e.jsx(n.em,{children:"upper"}),") ist die entstehende obere ",e.jsx(x,{id:"triangular-matrix",children:"Dreiecksmatrix"}),"."]}),`
`]}),`
`,e.jsxs(E,{kind:"Definition",label:"5.3.1 (LU-Zerlegung)",id:"env-lu-zerlegung",children:[e.jsx(n.p,{children:"Eine Darstellung"}),e.jsx(w,{children:"\\bA = \\bL\\bU"}),e.jsxs(n.p,{children:["von ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," mit einer unteren Dreiecksmatrix ",e.jsx(i,{children:"\\bL"}),` mit
Einsen auf der Diagonalen und einer oberen Dreiecksmatrix `,e.jsx(i,{children:"\\bU"}),` heißt
`,e.jsx(n.em,{children:"LU-Zerlegung"})," (LU decomposition) von ",e.jsx(i,{children:"\\bA"}),"."]})]}),`
`,e.jsxs(n.p,{children:["Sobald wir ",e.jsx(i,{children:"\\bA = \\bL\\bU"}),` einmal berechnet haben, lösen wir
`,e.jsx(i,{children:"\\bA\\bx = \\bb_i"})," für ",e.jsx(n.em,{children:"jedes"})," ",e.jsx(i,{children:"\\bb_i"}),` über zwei Dreieckssysteme, jedes für
nur `,e.jsx(i,{children:"O(n^2)"})," Operationen (",e.jsx(n.a,{href:"#env-loesen-von-ax-b-mit-der-lu-zerlegung",children:"Algorithmus 5.3.6"}),")."]}),`
`,e.jsx(n.h3,{children:"Eliminationsmatrizen"}),`
`,e.jsxs(n.p,{children:[`Wie sehen die Faktoren aus? Die Elimination arbeitet sich von links nach
rechts durch die Spalten und entfernt alle Einträge unter der Diagonalen.
Nennen wir das aktuelle System `,e.jsx(i,{children:"(\\bM \\mid \\br)"}),". Die ",e.jsx(i,{children:"k"}),`-te Spalte räumen wir, indem wir von
links mit der `,e.jsx(n.em,{children:"Eliminationsmatrix"})," ",e.jsx(i,{children:"\\bL_k"})," multiplizieren:"]}),`
`,e.jsx(Q,{tag:"5.3.1",id:"eq-eq-5-3-1",children:`\\bL_k = \\begin{pmatrix}
1 &        &                     &   &        &   \\\\
  & \\ddots &                     &   &        &   \\\\
  &        & 1                   &   &        &   \\\\
  &        & \\cblue{-l_{(k+1)k}} & 1 &        &   \\\\
  &        & \\vdots              &   & \\ddots &   \\\\
  &        & \\cblue{-l_{nk}}     &   &        & 1
\\end{pmatrix}
\\qquad \\text{mit} \\qquad
\\cblue{l_{ik}} = \\frac{m_{ik}}{\\cred{m_{kk}}} .`}),`
`,e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bL_k"})," ist eine Einheitsmatrix mit Zusatzeinträgen in Spalte ",e.jsx(i,{children:"k"}),`. Das
Produkt `,e.jsx(i,{children:"\\bL_k \\bM"})," zieht für jedes ",e.jsx(i,{children:"i > k"})," von Zeile ",e.jsx(i,{children:"i"}),` das
`,e.jsx(i,{children:"\\cblue{l_{ik}}"}),"-fache der Pivotzeile ",e.jsx(i,{children:"k"}),` ab und erzeugt so die Nullen unter
dem Pivot `,e.jsx(i,{children:"\\cred{m_{kk}}"}),". Nach ",e.jsx(i,{children:"n - 1"}),` solchen Schritten sind alle Spalten
abgeräumt.`]}),`
`,e.jsxs(n.p,{children:["Jeder Schritt lässt sich rückgängig machen: ",e.jsx(i,{children:"\\bL_k^{-1}"}),` addiert die
abgezogenen Vielfachen wieder und ist deshalb dieselbe Matrix mit
umgekehrten Vorzeichen unterhalb der Diagonalen. Als Produkt unterer
Dreiecksmatrizen ist dann auch `,e.jsx(i,{children:"\\bL = \\bL_1^{-1} \\cdots \\bL_{n-1}^{-1}"}),` eine
untere Dreiecksmatrix, und zwar eine besonders einfache:`]}),`
`,e.jsxs(E,{kind:"Satz",label:"5.3.2 (Die Gauß-Elimination liefert eine LU-Zerlegung)",id:"env-die-gauss-elimination-liefert-eine-lu",children:[e.jsxs(n.p,{children:["Läuft die Gauß-Elimination für ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"}),` ohne Nullpivot
durch, so ist`]}),e.jsx(w,{children:"\\bU = \\bL_{n-1} \\cdots \\bL_1 \\bA"}),e.jsxs(n.p,{children:["eine obere Dreiecksmatrix, und es gilt ",e.jsx(i,{children:"\\bA = \\bL\\bU"})," mit"]}),e.jsx(Q,{tag:"5.3.2",id:"eq-die-gauss-elimination-liefert-eine-lu",children:`\\bL = \\bL_1^{-1} \\cdots \\bL_{n-1}^{-1} =
\\begin{pmatrix}
1               &                 &        &                     &   \\\\
\\cgreen{l_{21}} & 1               &        &                     &   \\\\
\\cgreen{l_{31}} & \\cgreen{l_{32}} & 1      &                     &   \\\\
\\vdots          &                 & \\ddots & \\ddots              &   \\\\
\\cgreen{l_{n1}} & \\cdots          & \\cdots & \\cgreen{l_{n(n-1)}} & 1
\\end{pmatrix} .`}),e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bL"}),` sammelt also unter der Diagonalen unverändert die Multiplikatoren
`,e.jsx(i,{children:"\\cgreen{l_{ik}}"})," der Elimination."]})]}),`
`,e.jsxs(ge,{title:"Beweis der Produktformel für L",children:[e.jsxs(n.p,{children:["Der Beweis rechnet mit einer kompakten Schreibweise für ",e.jsx(i,{children:"\\bL_k"}),`;
entscheidend ist, dass sich das Produkt der Inversen ohne Mischterme
ausmultiplizieren lässt.`]}),e.jsxs(je,{children:[e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"\\bl_k \\be_k^\\top"})," ist die Matrix, die in Spalte ",e.jsx(i,{children:"k"})," unterhalb der Diagonalen die Einträge ",e.jsx(i,{children:"l_{ik}"})," trägt und sonst nur Nullen; abgezogen von ",e.jsx(i,{children:"\\bI"})," ergibt das die Gestalt aus ",e.jsx(n.a,{href:"#eq-eq-5-3-1",children:"(5.3.1)"})]}),children:e.jsxs(n.p,{children:["Wir schreiben ",e.jsx(i,{children:"\\bL_k"})," kompakt als ",e.jsx(i,{children:"\\bL_k = \\bI - \\bl_k \\be_k^\\top"}),`, wobei
`,e.jsx(i,{children:"\\be_k"})," der ",e.jsx(i,{children:"k"}),`-te Einheitsvektor ist und
`,e.jsx(i,{children:"\\bl_k = (0, \\dots, 0, \\cblue{l_{(k+1)k}}, \\dots, \\cblue{l_{nk}})^\\top"}),` die
Multiplikatoren der `,e.jsx(i,{children:"k"}),"-ten Spalte sammelt; die ersten ",e.jsx(i,{children:"k"}),` Komponenten von
`,e.jsx(i,{children:"\\bl_k"})," sind null."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["Ausmultiplizieren: ",e.jsx(i,{children:"(\\bI - \\bl_k \\be_k^\\top)(\\bI + \\bl_k \\be_k^\\top) = \\bI - \\bl_k (\\be_k^\\top \\bl_k) \\be_k^\\top = \\bI"}),", denn ",e.jsx(i,{children:"\\be_k^\\top \\bl_k"})," ist die ",e.jsx(i,{children:"k"}),"-te Komponente von ",e.jsx(i,{children:"\\bl_k"}),", und die ist null"]}),children:e.jsxs(n.p,{children:["Es gilt ",e.jsx(i,{children:"\\bL_k^{-1} = \\bI + \\bl_k \\be_k^\\top"}),"."]})}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Beim Ausmultiplizieren verschwinden alle gemischten Terme: Sie enthalten Faktoren der Form ",e.jsx(i,{children:"\\be_j^\\top \\bl_k"})," mit ",e.jsx(i,{children:"j < k"}),", und die ",e.jsx(i,{children:"j"}),"-te Komponente von ",e.jsx(i,{children:"\\bl_k"})," ist für ",e.jsx(i,{children:"j \\le k"})," null"]}),children:[e.jsx(n.p,{children:"Für das Produkt der Inversen gilt"}),e.jsx(w,{children:`\\bL
= (\\bI + \\bl_1 \\be_1^\\top) \\cdots (\\bI + \\bl_{n-1} \\be_{n-1}^\\top)
= \\bI + \\sum_{k=1}^{n-1} \\bl_k \\be_k^\\top ,`}),e.jsxs(n.p,{children:["und die rechte Seite ist die Matrix aus ",e.jsx(n.a,{href:"#eq-die-gauss-elimination-liefert-eine-lu",children:"(5.3.2)"}),`: Einsen auf der
Diagonalen, darunter die Multiplikatoren, jeder an seinem Platz.`]})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["wir multiplizieren von links nacheinander mit ",e.jsx(i,{children:"\\bL_{n-1}^{-1}, \\dots, \\bL_1^{-1}"}),"; diese Inversen existieren nach Schritt 2"]}),children:e.jsxs(n.p,{children:["Insbesondere ist ",e.jsx(i,{children:"\\bL"}),` als Summe der Einheitsmatrix und von Beiträgen
unterhalb der Diagonalen eine untere Dreiecksmatrix mit Einsen auf der
Diagonalen. Auflösen von `,e.jsx(i,{children:"\\bU = \\bL_{n-1} \\cdots \\bL_1 \\bA"})," nach ",e.jsx(i,{children:"\\bA"}),`
ergibt schließlich `,e.jsx(i,{children:"\\bA = \\bL_1^{-1} \\cdots \\bL_{n-1}^{-1} \\bU = \\bL\\bU"}),"."]})})]})]}),`
`,e.jsxs(n.p,{children:[`Bei der klassischen Elimination treffen die Eliminationsmatrizen auch die
rechte Seite: Aus `,e.jsx(i,{children:"\\bb"})," wird ",e.jsx(i,{children:"\\bc = \\bL_{n-1} \\cdots \\bL_1 \\bb"}),`, das
gestaffelte Endsystem ist `,e.jsx(i,{children:"(\\bU \\mid \\bc)"}),". Mit gespeichertem ",e.jsx(i,{children:"\\bL"}),` können
wir uns das sparen, denn die Vorwärtssubstitution `,e.jsx(i,{children:"\\bL\\by = \\bb"}),` liefert
später denselben Vektor, `,e.jsx(i,{children:"\\by = \\bL^{-1}\\bb = \\bc"}),"."]}),`
`,e.jsx(n.h3,{children:"Ein vollständiges Beispiel"}),`
`,e.jsxs(n.p,{children:[`Wir rechnen im Farbcode des Kapitels: Pivots rot, Multiplikatoren blau,
fertige `,e.jsx(i,{children:"\\bL"}),"-Einträge grün."]}),`
`,e.jsxs(E,{kind:"Beispiel",label:"5.3.3 (LU-Zerlegung einer 3×3-Matrix)",id:"env-lu-zerlegung-einer-3-3-matrix",children:[e.jsx(n.p,{children:"Sei"}),e.jsx(w,{children:"\\bA = \\begin{pmatrix} 2 & 1 & -1 \\\\ 4 & -6 & 0 \\\\ -2 & 7 & 2 \\end{pmatrix} ."}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Schritt 1:"})," Spalte 1 räumen. Das Pivot ist ",e.jsx(i,{children:"\\cred{m_{11}} = \\cred{2}"}),`,
die Multiplikatoren nach Formel `,e.jsx(n.a,{href:"#eq-eq-5-3-1",children:"(5.3.1)"})," sind"]}),e.jsx(w,{children:`\\cblue{l_{21}} = \\frac{4}{\\cred{2}} = \\cblue{2} ,
\\qquad
\\cblue{l_{31}} = \\frac{-2}{\\cred{2}} = \\cblue{-1} .`}),e.jsx(n.p,{children:"Damit ist"}),e.jsx(w,{children:`\\bL_1 = \\begin{pmatrix} 1 & 0 & 0 \\\\ \\cblue{-2} & 1 & 0 \\\\ \\cblue{1} & 0 & 1 \\end{pmatrix},
\\qquad
\\bL_1 \\bA = \\begin{pmatrix} 2 & 1 & -1 \\\\ 0 & -8 & 2 \\\\ 0 & 8 & 1 \\end{pmatrix} .`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Schritt 2:"})," Spalte 2 räumen. Das Pivot ist jetzt ",e.jsx(i,{children:"\\cred{-8}"}),", und mit"]}),e.jsx(w,{children:`\\cblue{l_{32}} = \\frac{8}{\\cred{-8}} = \\cblue{-1} ,
\\qquad
\\bL_2 = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & \\cblue{1} & 1 \\end{pmatrix}`}),e.jsx(n.p,{children:"erreichen wir die Dreiecksform:"}),e.jsx(w,{children:"\\bL_2 \\bL_1 \\bA = \\begin{pmatrix} 2 & 1 & -1 \\\\ 0 & -8 & 2 \\\\ 0 & 0 & 3 \\end{pmatrix} = \\bU ."}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Ergebnis:"}),` Die Multiplikatoren wandern mit ihrem ursprünglichen
Vorzeichen nach `,e.jsx(i,{children:"\\bL"}),":"]}),e.jsx(w,{children:`\\bL = \\bL_1^{-1} \\bL_2^{-1}
= \\begin{pmatrix} 1 & 0 & 0 \\\\ \\cgreen{2} & 1 & 0 \\\\ \\cgreen{-1} & \\cgreen{-1} & 1 \\end{pmatrix},
\\qquad
\\bU = \\begin{pmatrix} 2 & 1 & -1 \\\\ 0 & -8 & 2 \\\\ 0 & 0 & 3 \\end{pmatrix} .`}),e.jsxs(n.p,{children:["Die Probe ",e.jsx(i,{children:"\\bL\\bU = \\bA"})," geht auf."]})]}),`
`,e.jsx(n.h3,{children:"Wann existiert die Zerlegung?"}),`
`,e.jsxs(n.p,{children:["In jedem Schritt teilen wir durch das Pivot ",e.jsx(i,{children:"\\cred{m_{kk}}"}),`. Steht dort
eine Null, bricht die Elimination ab, auch wenn `,e.jsx(i,{children:"\\bA"}),`
`,e.jsx(x,{id:"matrix-inverse",children:"invertierbar"})," ist."]}),`
`,e.jsxs(E,{kind:"Satz",label:"5.3.4 (Existenz der LU-Zerlegung)",id:"env-existenz-der-lu-zerlegung",children:[e.jsxs(n.p,{children:["Sei ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," invertierbar. Dann gilt:"]}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Die LU-Zerlegung ",e.jsx(i,{children:"\\bA = \\bL\\bU"})," aus ",e.jsx(x,{id:"env:lu-zerlegung",href:"#env-lu-zerlegung",children:"Definition 5.3.1"}),` existiert genau
dann, wenn die Gauß-Elimination an `,e.jsx(i,{children:"\\bA"}),` ohne Nullpivot durchläuft. In
diesem Fall ist sie eindeutig.`]}),`
`,e.jsxs(n.li,{children:["Es gibt stets eine ",e.jsx(x,{id:"permutation-matrix",children:"Permutationsmatrix"})," ",e.jsx(i,{children:"\\bP"}),`
(sie vertauscht Zeilen), sodass die Elimination an `,e.jsx(i,{children:"\\bP\\bA"}),` ohne
Nullpivot durchläuft; es gilt dann `,e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),"."]}),`
`]})]}),`
`,e.jsxs(n.p,{children:["Die Richtung „kein Nullpivot ",e.jsx(i,{children:"\\Rightarrow"}),` Zerlegung existiert" ist
`,e.jsx(x,{id:"env:die-gauss-elimination-liefert-eine-lu",href:"#env-die-gauss-elimination-liefert-eine-lu",children:"Satz 5.3.2"}),`; auf die übrigen Beweisteile verzichten wir. Ein
Beispiel zeigt, dass die Bedingung in Teil 1 nötig ist:`]}),`
`,e.jsxs(E,{kind:"Beispiel",label:"5.3.5 (Invertierbar, aber keine LU-Zerlegung)",id:"env-invertierbar-aber-keine-lu-zerlegung",children:[e.jsx(n.p,{children:"Die Vertauschungsmatrix"}),e.jsx(w,{children:"\\bA = \\begin{pmatrix} \\cred{0} & 1 \\\\ 1 & 0 \\end{pmatrix}"}),e.jsxs(n.p,{children:["ist invertierbar (",e.jsx(i,{children:"\\det \\bA = -1"}),`). Trotzdem scheitert die Elimination
sofort, denn das erste Pivot ist `,e.jsx(i,{children:"\\cred{m_{11}} = \\cred{0}"}),`. Auch keine
andere Konstruktion hilft: Der Ansatz`]}),e.jsx(w,{children:`\\bL\\bU
= \\begin{pmatrix} 1 & 0 \\\\ l & 1 \\end{pmatrix}
  \\begin{pmatrix} u_{11} & u_{12} \\\\ 0 & u_{22} \\end{pmatrix}
= \\begin{pmatrix} u_{11} & u_{12} \\\\ l\\, u_{11} & l\\, u_{12} + u_{22} \\end{pmatrix}`}),e.jsxs(n.p,{children:["erzwingt ",e.jsx(i,{children:"u_{11} = 0"}),` aus dem Eintrag links oben und zugleich
`,e.jsx(i,{children:"l\\, u_{11} = 1"})," aus dem Eintrag links unten: ein Widerspruch."]}),e.jsxs(n.p,{children:["Ein Zeilentausch löst das Problem dagegen sofort auf, denn mit ",e.jsx(i,{children:"\\bP = \\bA"}),`
ist `,e.jsx(i,{children:"\\bP\\bA = \\bI = \\bI \\cdot \\bI"})," eine (triviale) LU-Zerlegung."]})]}),`
`,e.jsx(n.h3,{children:"Lösen mit der LU-Zerlegung"}),`
`,e.jsxs(n.p,{children:["Mit ",e.jsx(i,{children:"\\bA = \\bL\\bU"})," und ",e.jsx(i,{children:"\\by = \\bU\\bx"})," zerfällt ",e.jsx(i,{children:"\\bA\\bx = \\bb"}),` in zwei
gestaffelte Systeme,`]}),`
`,e.jsx(w,{children:"\\bL\\,\\underbrace{\\bU\\bx}_{=\\,\\by} = \\bb ,"}),`
`,e.jsxs(n.p,{children:["die wir per ",e.jsx(x,{id:"triangular-solve",children:"Vorwärts- und Rückwärtssubstitution"}),`
(forward/backward substitution) lösen:`]}),`
`,e.jsx(E,{kind:"Algorithmus",label:"5.3.6 (Lösen von Ax = b mit der LU-Zerlegung)",id:"env-loesen-von-ax-b-mit-der-lu-zerlegung",children:e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Vorwärtssubstitution:"})," Löse ",e.jsx(i,{children:"\\bL\\by = \\bb"})," von oben nach unten,"]}),`
`,e.jsx(w,{children:`\\cgreen{y_i} = b_i - \\sum_{j=1}^{i-1} l_{ij}\\, \\cgreen{y_j}
\\qquad (i = 1, \\dots, n) ;`}),`
`,e.jsxs(n.p,{children:["eine Division ist nicht nötig, denn auf der Diagonalen von ",e.jsx(i,{children:"\\bL"}),` stehen
Einsen.`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Rückwärtssubstitution:"})," Löse ",e.jsx(i,{children:"\\bU\\bx = \\by"}),` von unten nach oben wie in
Formel `,e.jsx(n.a,{href:"#eq-gauss-elimination-mit-partieller",children:"(5.2.1)"}),","]}),`
`,e.jsx(w,{children:`\\cgreen{x_i} = \\Bigl(y_i - \\sum_{j=i+1}^{n} u_{ij}\\, \\cgreen{x_j}\\Bigr) \\Big/ \\cred{u_{ii}}
\\qquad (i = n, \\dots, 1) .`}),`
`]}),`
`]})}),`
`,e.jsxs(E,{kind:"Beispiel",label:"5.3.7 (Fortsetzung: Lösen mit der Zerlegung)",id:"env-fortsetzung-loesen-mit-der-zerlegung",children:[e.jsxs(n.p,{children:["Wir nehmen ",e.jsx(i,{children:"\\bL"})," und ",e.jsx(i,{children:"\\bU"})," aus ",e.jsx(n.a,{href:"#env-lu-zerlegung-einer-3-3-matrix",children:"Beispiel 5.3.3"})," und lösen ",e.jsx(i,{children:"\\bA\\bx = \\bb"}),` für
`,e.jsx(i,{children:"\\bb = (5, -2, 9)^\\top"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Schritt 1: Vorwärtssubstitution"})," für ",e.jsx(i,{children:"\\bL\\by = \\bb"}),":"]}),e.jsx(w,{children:`\\begin{pmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ -1 & -1 & 1 \\end{pmatrix}
\\begin{pmatrix} y_1 \\\\ y_2 \\\\ y_3 \\end{pmatrix}
= \\begin{pmatrix} 5 \\\\ -2 \\\\ 9 \\end{pmatrix}
\\quad\\Longrightarrow\\quad
\\begin{aligned}
y_1 &= \\cgreen{5} , \\\\
y_2 &= -2 - 2 \\cdot \\cgreen{5} = \\cgreen{-12} , \\\\
y_3 &= 9 - (-1) \\cdot \\cgreen{5} - (-1) \\cdot (\\cgreen{-12}) = 9 + 5 - 12 = \\cgreen{2} .
\\end{aligned}`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Schritt 2: Rückwärtssubstitution"})," für ",e.jsx(i,{children:"\\bU\\bx = \\by"}),` mit
`,e.jsx(i,{children:"\\by = (5, -12, 2)^\\top"}),`; die Divisoren sind die Diagonalelemente
`,e.jsx(i,{children:"\\cred{u_{ii}}"}),":"]}),e.jsx(w,{children:`\\begin{aligned}
x_3 &= 2 / \\cred{3} = \\cgreen{\\tfrac{2}{3}} , \\\\
x_2 &= \\bigl(-12 - 2 \\cdot \\cgreen{\\tfrac{2}{3}}\\bigr) / (\\cred{-8}) = \\cgreen{\\tfrac{5}{3}} , \\\\
x_1 &= \\bigl(5 - 1 \\cdot \\cgreen{\\tfrac{5}{3}} - (-1) \\cdot \\cgreen{\\tfrac{2}{3}}\\bigr) / \\cred{2} = \\cgreen{2} .
\\end{aligned}`}),e.jsxs(n.p,{children:["Die Lösung ist ",e.jsx(i,{children:"\\bx = \\bigl(2, \\tfrac{5}{3}, \\tfrac{2}{3}\\bigr)^\\top"}),`; die
Probe `,e.jsx(i,{children:"\\bA\\bx = \\bb"})," geht auf."]})]}),`
`,e.jsxs(K,{title:"LU-Zerlegung Schritt für Schritt",children:[e.jsx(n.p,{children:"Welche Einträge speichert die LU-Zerlegung zusätzlich zur Arbeitsmatrix?"}),e.jsx(ln,{}),e.jsxs(n.p,{children:[`Zu jeder neuen Null der Arbeitsmatrix erscheint an derselben Position in
`,e.jsx(i,{children:"\\bL"}),` der Multiplikator, der sie erzeugt hat. Was von der Arbeitsmatrix
übrig bleibt, ist `,e.jsx(i,{children:"\\bU"}),"."]})]}),`
`,e.jsx(n.h3,{children:"Pivotierung"}),`
`,e.jsxs(n.p,{children:["Tritt ein Pivot ",e.jsx(i,{children:"\\cred{m_{kk}} = 0"}),` auf wie in
`,e.jsx(n.a,{href:"#env-invertierbar-aber-keine-lu-zerlegung",children:"Beispiel 5.3.5"}),`, tauschen wir die Pivotzeile
gegen eine Zeile weiter unten, in deren `,e.jsx(i,{children:"k"}),`-ter Spalte keine Null steht; bei
invertierbarem `,e.jsx(i,{children:"\\bA"}),` gibt es so eine Zeile immer. Dieses Umsortieren heißt
`,e.jsx(n.em,{children:"Pivotierung"}),` (pivoting). Alle Vertauschungen sammeln wir in einer
`,e.jsx(x,{id:"permutation-matrix",children:"Permutationsmatrix"})," ",e.jsx(i,{children:"\\bP"}),` und erhalten die
pivotierte Zerlegung `,e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),` aus
`,e.jsx(x,{id:"env:existenz-der-lu-zerlegung",href:"#env-existenz-der-lu-zerlegung",children:"Satz 5.3.4"}),". Zum Lösen von ",e.jsx(i,{children:"\\bA\\bx = \\bb"}),` substituieren
wir entlang `,e.jsx(i,{children:"\\bL\\bU\\bx = \\bP\\bb"}),`: Die rechte Seite wird mitvertauscht, sonst
ändert sich nichts.`]}),`
`,e.jsxs(n.p,{children:["Auch ein sehr kleines Pivot ",e.jsx(i,{children:"\\cred{m_{kk}} \\approx 0"}),` ist gefährlich: Die
Multiplikatoren `,e.jsx(i,{children:"l_{ik} = m_{ik}/\\cred{m_{kk}}"}),` werden riesig, beim Abziehen
der aufgeblähten Pivotzeile gehen die ursprünglichen Einträge der Matrix in
Rundungsfehlern unter, und der Eliminationsschritt wird instabil
(`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Abschnitt 4.3"}),`). Der Tausch zum betragsgrößten Pivot der Spalte
(`,e.jsx(n.em,{children:"partielle Pivotierung"}),`) hält alle Multiplikatoren im Betrag bei
höchstens 1 und macht die Elimination in der Praxis stabil.
Numerikbibliotheken pivotieren deshalb grundsätzlich, auch wenn kein Pivot
exakt null ist.`]}),`
`,e.jsxs(K,{title:"Kleine Pivots, große Fehler",children:[e.jsx(n.p,{children:"Was verändert der Zeilentausch am Rundungsfehler eines kleinen Pivots?"}),e.jsx(cn,{}),e.jsxs(n.p,{children:["Ohne Zeilentausch wächst der Fehler mit jedem Zehnerschritt von ",e.jsx(i,{children:"\\epsilon"}),` mit:
Bei `,e.jsx(i,{children:"\\epsilon = 10^{-12}"}),` stimmen nur noch vier Nachkommastellen, und ab
`,e.jsx(i,{children:"\\epsilon \\approx 10^{-16}"})," geht der Eintrag ",e.jsx(i,{children:"a_{22}"}),` in der Subtraktion
`,e.jsx(i,{children:"1 - 1/\\epsilon"}),` vollständig unter; die berechnete Zerlegung gehört dann zu
einer anderen Matrix. Die Zeile mit Zeilentausch bleibt über den ganzen
Reglerbereich bei Maschinengenauigkeit. Am Problem ändert der Tausch nichts,
nur am Rechenweg.`]})]}),`
`,e.jsx(n.h3,{children:"Komplexität"}),`
`,e.jsxs(n.p,{children:["Was kostet die Zerlegung? Zuerst ein einzelner Schritt: Im ",e.jsx(i,{children:"k"}),`-ten Schritt
multiplizieren wir das aktuelle System mit `,e.jsx(i,{children:"\\bL_k"}),", und die ersten ",e.jsx(i,{children:"k - 1"}),`
Spalten der Arbeitsmatrix haben ihre Nullen unter der Diagonalen bereits
(`,e.jsx(x,{id:"big-o-notation",children:"Landau-Notation"}),": ",e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),")."]}),`
`,e.jsxs(C,{children:[e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Für den ",e.jsx(i,{children:"k"}),"-ten Schritt müssen wir das volle Matrixprodukt ",e.jsx(i,{children:"\\bL_k \\bM"}),`
ausrechnen; er kostet also `,e.jsx(i,{children:"O(n^3)"})," Operationen."]}),e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bL_k"}),` wird nicht als volle Matrix multipliziert. Es unterscheidet sich
von der Einheitsmatrix nur in Spalte `,e.jsx(i,{children:"k"}),`; das Produkt zieht nur von den
Zeilen `,e.jsx(i,{children:"k+1, \\dots, n"})," je ein Vielfaches der Pivotzeile ab."]})]}),e.jsxs(D,{wahr:!0,children:[e.jsxs(n.p,{children:["Im ",e.jsx(i,{children:"k"}),`-ten Schritt ändern sich nur die Einträge im rechten unteren
`,e.jsx(i,{children:"(n-k) \\times (n-k)"}),`-Block (und die rechte Seite); der Aufwand ist
`,e.jsx(i,{children:"O((n-k)^2)"}),"."]}),e.jsxs(n.p,{children:["Betroffen sind die Zeilen ",e.jsx(i,{children:"k+1, \\dots, n"}),"; links von Spalte ",e.jsx(i,{children:"k"}),` stehen dort
schon Nullen, und die bleiben null. In Spalte `,e.jsx(i,{children:"k"}),` entsteht die neue Null,
neu berechnet werden die Spalten `,e.jsx(i,{children:"k+1, \\dots, n"}),` und der Eintrag der
rechten Seite: `,e.jsx(i,{children:"n-k"})," Zeilen mit je ",e.jsx(i,{children:"n-k+1"}),` Aktualisierungen, zusammen
`,e.jsx(i,{children:"(n-k)(n-k+1)"})," Rechenschritte, also ",e.jsx(i,{children:"O((n-k)^2)"}),"."]})]}),e.jsxs(D,{wahr:!0,children:[e.jsxs(n.p,{children:[e.jsx(i,{children:"O(n^2)"})," ist eine korrekte obere Schranke für den Aufwand des ",e.jsx(i,{children:"k"}),`-ten
Schritts.`]}),e.jsxs(n.p,{children:["Wegen ",e.jsx(i,{children:"(n-k)^2 \\le n^2"}),` stimmt das; die Schranke ist nur nicht scharf, denn
späte Schritte sind viel billiger. Für die Gesamtkosten macht das keinen
Unterschied: Beide Abschätzungen liefern aufsummiert `,e.jsx(i,{children:"O(n^3)"}),"."]})]}),e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Schritte werden mit wachsendem ",e.jsx(i,{children:"k"})," teurer; der ",e.jsx(i,{children:"k"}),`-te Schritt kostet
`,e.jsx(i,{children:"O(k^3)"})," Operationen."]}),e.jsxs(n.p,{children:[`Umgekehrt: Der aktive Block schrumpft von Schritt zu Schritt. Der erste
Schritt ist mit etwa `,e.jsx(i,{children:"n^2"}),` Aktualisierungen der teuerste; der letzte
bearbeitet nur noch die unterste Zeile, also eine neue Null, einen
aktualisierten Eintrag und die rechte Seite.`]})]})]}),`
`,e.jsxs(E,{kind:"Satz",label:"5.3.8 (Komplexität der LU-Zerlegung)",id:"env-komplexitaet-der-lu-zerlegung",children:[e.jsxs(n.p,{children:["Für invertierbares ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," gilt:"]}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Die Berechnung der LU-Zerlegung kostet ",e.jsx(i,{children:"O(n^3)"})," Operationen."]}),`
`,e.jsxs(n.li,{children:["Vorwärts- und Rückwärtssubstitution kosten je ",e.jsx(i,{children:"O(n^2)"}),"."]}),`
`,e.jsxs(n.li,{children:["Das Lösen von ",e.jsx(i,{children:"J"})," Systemen ",e.jsx(i,{children:"\\bA\\bx = \\bb_j"}),", ",e.jsx(i,{children:"j = 1, \\dots, J"}),`, mit
derselben Matrix kostet insgesamt `,e.jsx(i,{children:"O(n^3 + J n^2)"}),"."]}),`
`]})]}),`
`,e.jsxs(n.p,{children:[`Teil 1 folgt durch Aufsummieren der Schrittkosten aus dem Quiz, mit
`,e.jsx(i,{children:"j = n - k"}),":"]}),`
`,e.jsx(w,{children:`\\sum_{k=1}^{n-1} O\\bigl((n-k)^2\\bigr)
= O\\Bigl(\\sum_{j=1}^{n-1} j^2\\Bigr)
= O(n^3) .`}),`
`,e.jsxs(n.p,{children:["Die Quadratsumme ist ",e.jsx(i,{children:"\\frac{(n-1)n(2n-1)}{6} \\approx \\frac{n^3}{3}"}),`; rund so
viele Multiplikationen kostet die Zerlegung. Teil 2 haben wir in `,e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"}),`
gezählt, ein Substitutionspaar braucht rund `,e.jsx(i,{children:"n^2"}),` Multiplikationen. Teil 3
beruht darauf, dass `,e.jsx(i,{children:"\\bL"})," und ",e.jsx(i,{children:"\\bU"})," nur von ",e.jsx(i,{children:"\\bA"}),` abhängen und nicht von
`,e.jsx(i,{children:"\\bb"}),`: Die teure Elimination fällt einmal an, für jede weitere rechte Seite
bleiben die beiden Substitutionen. Demselben Muster folgt die QR-Zerlegung
für Kleinste-Quadrate-Probleme (`,e.jsx(n.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),")."]}),`
`,e.jsxs(K,{title:"Einmal zerlegen oder jedes Mal neu?",children:[e.jsxs(n.p,{children:["Dieselbe Matrix, ",e.jsx(i,{children:"J"})," rechte Seiten, Kosten ",e.jsx(i,{children:"n^3/3"})," je Zerlegung und ",e.jsx(i,{children:"n^2"}),` je
Substitutionspaar: Wie viel spart die gespeicherte Zerlegung gegenüber dem
Neuansatz?`]}),e.jsx(hn,{}),e.jsxs(n.p,{children:["Bei ",e.jsx(i,{children:"n = 100"})," und ",e.jsx(i,{children:"J = 50"}),` rechten Seiten kostet der Neuansatz rund das
Zwanzigfache: Die Zerlegung wird fünfzigmal statt einmal gerechnet, während
die Substitutionen mit ihren `,e.jsx(i,{children:"n^2"}),` kaum ins Gewicht fallen. Mit wachsendem
`,e.jsx(i,{children:"J"})," läuft der Ersparnisfaktor gegen rund ",e.jsx(i,{children:"n/3"}),"."]}),e.jsx(C,{children:e.jsxs(ke,{loesung:2,toleranz:0,children:[e.jsx(n.p,{children:"Ab wie vielen rechten Seiten ist die gespeicherte LU-Zerlegung im Kosten-Widget günstiger?"}),e.jsx(n.p,{children:"Ab der zweiten rechten Seite fällt die Zerlegung nur einmal an."})]})})]}),`
`,e.jsxs(E,{kind:"Bemerkung",label:"5.3.9 (Struktur ausnutzen)",id:"env-struktur-ausnutzen",children:[e.jsxs(n.p,{children:["Die Laufzeit lässt sich weiter drücken, wenn ",e.jsx(i,{children:"\\bA"}),` besondere Eigenschaften
erfüllt, zum Beispiel:`]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"symmetric-matrix",children:"symmetrisch"}),": ",e.jsx(i,{children:"\\bA = \\bA^\\top"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"positive-definite",children:"positiv definit"}),": ",e.jsx(i,{children:"\\bx^\\top \\bA \\bx > 0"}),` für alle
`,e.jsx(i,{children:"\\bx \\neq \\bnull"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Bandeigenschaft:"})," ",e.jsx(i,{children:"a_{ij} = 0"})," für alle ",e.jsx(i,{children:"|i - j| > \\beta"}),`, das heißt,
außerhalb eines Bandes der Breite `,e.jsx(i,{children:"\\beta"}),` um die Diagonale stehen nur
Nullen;`]}),`
`,e.jsxs(n.li,{children:[e.jsx(x,{id:"sparse-matrix",children:"dünn besetzt"})," (",e.jsx(n.em,{children:"sparse"}),"): ",e.jsx(i,{children:"a_{ij} = 0"}),` für die
allermeisten `,e.jsx(i,{children:"(i, j)"}),"."]}),`
`]}),e.jsxs(n.p,{children:[`Für symmetrische, positiv definite Matrizen halbiert etwa die
Cholesky-Zerlegung des nächsten Abschnitts (`,e.jsx(n.a,{href:"#sec-5.4",children:"Abschnitt 5.4"}),`) den
Aufwand. Für all diese Fälle gibt es ausgereifte Implementierungen, die
wir selten selbst schreiben.`]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.4 (Gauß-Elimination, LU-Zerlegung, Pivotierung) und
§2.5 (Spezialstrukturen).`})})]})}function on(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Ee,{...r})}):Ee(r)}const{blau:Ne,gruen:Pe,rot:Ze}=W;function xn(r){if(r===0)return"0";const n=Math.floor(Math.log10(Math.abs(r)));return`${z(r/10**n)} · 10^${n}`}function un(r){const n=r.length,t=r.map(()=>new Array(n).fill(0)),b=[];for(let d=0;d<n;d++){let a=r[d][d],u="";for(let s=0;s<d;s++)a-=t[d][s]*t[d][s],u+=` − (${z(t[d][s])})²`;if(!(a>1e-12)){b.push({i:d,j:d,line:`l${M(d+1)}${M(d+1)} = √(${z(r[d][d])}${u}) = √(${z(a)})  ✗`,value:NaN});const s=a<0?`Unter der Wurzel steht ${z(a)} < 0: Die eingegebene Matrix ist nicht einmal positiv semidefinit, eine Cholesky-Zerlegung existiert nicht.`:a===0?`Unter der Wurzel steht exakt 0: Die Matrix ist nicht positiv definit. Ob sie wenigstens positiv semidefinit ist, entscheidet dieser Schritt nicht: (0 1; 1 0) etwa bricht genauso ab und ist indefinit. Das reelle l${M(d+1)}${M(d+1)} = 0 gäbe es zwar, doch die nächste Spalte müsste durch null teilen – genau die Lücke, die die pivotierte Cholesky-Variante schließt.`:`Unter der Wurzel steht ${z(a)}: positiv, aber so winzig, dass die folgende Division jeden Rundungsfehler aufbläst. Numerisch ist die Matrix von einer semidefiniten nicht mehr zu unterscheiden.`;return{steps:b,fail:{msg:s}}}t[d][d]=Math.sqrt(a),b.push({i:d,j:d,line:`l${M(d+1)}${M(d+1)} = √(${z(r[d][d])}${u}) = ${z(t[d][d])}`,value:t[d][d]});for(let s=d+1;s<n;s++){let h=r[s][d],l="";for(let o=0;o<d;o++)h-=t[s][o]*t[d][o],l+=` − (${z(t[s][o])})·(${z(t[d][o])})`;const c=h/t[d][d];t[s][d]=c,b.push({i:s,j:d,line:`l${M(s+1)}${M(d+1)} = (${z(r[s][d])}${l}) / ${z(t[d][d])} = ${z(c)}`,value:c})}}return{steps:b,fail:null}}function bn(){const[r,n]=y.useState([[4,2,-2],[2,10,2],[-2,2,6]]),[t,b]=y.useState(1),d=y.useMemo(()=>un(r),[r]),a=d.steps.length,u=Math.min(t,a),s=r.length,h=u<a?d.steps[u]:null,l=d.fail!==null&&u===a,c=d.fail===null&&u===a,o=r.map((f,S)=>r.map((m,v)=>v>S?0:null)),p=r.map(()=>new Array(s).fill(!1));for(let f=0;f<u;f++){const S=d.steps[f];Number.isNaN(S.value)||(o[S.i][S.j]=S.value,p[S.i][S.j]=!0)}const N=(f,S)=>h&&f===h.i&&S===h.j?{background:Ze+"33",fontWeight:600}:void 0,_=(f,S)=>{if(h&&f===h.i&&S===h.j)return{background:Ne+"33"};if(p[f][S])return{color:Pe,fontWeight:600}},j=y.useMemo(()=>{if(!c)return null;const f=(m,v)=>v>m?0:o[m][v]??0;let S=0;for(let m=0;m<s;m++)for(let v=0;v<s;v++){let Z=0;for(let g=0;g<s;g++)Z+=f(m,g)*f(v,g);S=Math.max(S,Math.abs(Z-r[m][v]))}return S},[c,r,u]);return e.jsxs("div",{children:[e.jsxs(O,{children:["Schieben wir durch alle ",a," Einträge von L und probieren danach eine nicht-SPD-Matrix."]}),e.jsxs("p",{className:"text-xs",style:{color:"var(--w-muted)"},children:["Farben: ",e.jsx("span",{style:{color:Ze,fontWeight:600},children:"rot"})," der verglichene Eintrag von A, ",e.jsx("span",{style:{color:Ne,fontWeight:600},children:"blau"})," der gesuchte Eintrag von L, ",e.jsx("span",{style:{color:Pe,fontWeight:600},children:"grün"})," die fertigen Einträge."]}),e.jsxs("p",{className:"sr-only",children:["Bauen wir ",e.jsx("span",{className:"font-mono",children:"L"})," per Koeffizientenvergleich auf, spaltenweise von links oben nach rechts unten; jeder Schritt löst eine Gleichung nach genau einer neuen Unbekannten auf. Die Matrix lässt sich editieren (wir symmetrisieren die Eingabe automatisch). Setzen wir etwa a₁₁ auf −1, sehen wir, wie die Zerlegung an einer nicht positiv definiten Matrix scheitert."]}),e.jsx("div",{className:"my-3 flex flex-wrap items-center gap-4",children:e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["A =",e.jsx(X,{value:r,onChange:f=>{n(f.map((S,m)=>S.map((v,Z)=>{var g;return(v+(((g=f[Z])==null?void 0:g[m])??v))/2}))),b(1)}})]})}),e.jsx(fe,{step:u,setStep:b,max:a,narration:`${u} von ${a} Einträgen berechnet`}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-5",children:[e.jsx(I,{label:"A (symmetrisch)",children:e.jsx(U,{m:r,cellStyle:N,label:"Matrix A"})}),e.jsx(I,{label:"L (untere Dreiecksmatrix)",children:e.jsx(U,{m:o,cellStyle:_,label:"untere Dreiecksmatrix L"})}),e.jsxs("div",{className:"grow",children:[u>0&&e.jsx("div",{className:"rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800",children:d.steps.slice(0,u).map(f=>e.jsx("div",{children:f.line},f.line))}),l&&d.fail&&e.jsxs(P,{kind:"fail",className:"mt-2",children:[d.fail.msg," ",Y("satz:cholesky-zerlegung")," ist hier nicht anwendbar."]}),c&&j!==null&&e.jsxs(P,{kind:"ok",className:"mt-2",children:["Fertig: alle ",a," Gleichungen des Koeffizientenvergleichs sind abgearbeitet, jede enthielt genau eine neue Unbekannte. Probe: max |A − L·Lᵀ| ="," ",e.jsx("span",{className:"font-mono",children:xn(j)}),"."]})]})]})]})}const J=W.gruen,B=W.grau;function mn(r){if(r===0)return"0";const n=Math.floor(Math.log10(Math.abs(r)));return`${z(r/10**n)} · 10^${n}`}const be=(()=>{const r=Ve(20260810),n=[];for(let t=0;t<200;t++){const b=Math.max(r(),1e-12),d=r(),a=Math.sqrt(-2*Math.log(b));n.push([a*Math.cos(2*Math.PI*d),a*Math.sin(2*Math.PI*d)])}return n})(),Re=72,Fe=Array.from({length:Re+1},(r,n)=>{const t=2*Math.PI*n/Re;return[2*Math.cos(t),2*Math.sin(t)]}),me=r=>r.toFixed(2).replace(".",",");function jn(){const[r,n]=y.useState(1),[t,b]=y.useState(1),[d,a]=y.useState(.7),u=r*r,s=d*r*t,h=t*t,l=Math.sqrt(u),c=s/l,o=Math.sqrt(Math.max(0,h-c*c)),p=y.useMemo(()=>be.map(([k,R])=>[l*k,c*k+o*R]),[l,c,o]),N=y.useMemo(()=>Fe.map(([k,R])=>[l*k,c*k+o*R]),[l,c,o]),_=y.useMemo(()=>{let k=2;for(const[R,G]of[...be,...p,...N])k=Math.max(k,Math.abs(R),Math.abs(G));return Math.max(3,Math.ceil(k+.2))},[p,N]),j=340,f=340,S=34,m=28,v=10,Z=10,g=k=>S+(k+_)/(2*_)*(j-S-Z),A=k=>f-m-(k+_)/(2*_)*(f-v-m),te=_<=5?1:2,ee=[];for(let k=-_;k<=_;k+=te)ee.push(k);const ne=k=>k.map(([R,G],Oe)=>`${Oe===0?"M":"L"}${g(R).toFixed(1)},${A(G).toFixed(1)}`).join(" "),qe=Math.max(Math.abs(l*l-u),Math.abs(l*c-s),Math.abs(c*c+o*o-h)),Ke=(k,R)=>R<=k?{color:J,fontWeight:600}:void 0;return e.jsxs("div",{children:[e.jsx(O,{children:"Schieben wir ρ Richtung ±1 und beobachten, wie die grüne Wolke schmal wird."}),e.jsxs("p",{className:"text-xs",style:{color:"var(--w-muted)"},children:["Legende: ",e.jsx("span",{style:{color:B,fontWeight:600},children:"grau"})," die feste Wolke z ~ N(0, I₂) samt Referenzkreis vom Radius 2,"," ",e.jsx("span",{style:{color:J,fontWeight:600},children:"grün"})," ihr Bild y = Lz samt Bildellipse."]}),e.jsxs("p",{className:"sr-only",children:["Wir halten 200 Punkte ",e.jsx("span",{className:"font-mono",children:"z"})," aus der Standardnormalverteilung N(0, I₂) fest (grau, runde Wolke) und schauen, was die Abbildung ",e.jsx("span",{className:"font-mono",children:"y = Lz"})," daraus macht (",e.jsx("span",{style:{color:J,fontWeight:600},children:"grün"}),"): Aus den Reglern entstehen Σ und ihr Cholesky-Faktor L, und L verformt die runde Wolke in die korrelierte. Die grüne Ellipse ist das Bild des grauen Kreises mit Radius 2. Schieben wir ρ Richtung ±1, kollabiert die Wolke fast auf eine Gerade."]}),e.jsx(q,{label:"σ₁",value:r,onChange:n,min:.4,max:2,step:.05,fmt:me}),e.jsx(q,{label:"σ₂",value:t,onChange:b,min:.4,max:2,step:.05,fmt:me}),e.jsx(q,{label:"ρ",value:d,onChange:a,min:-.95,max:.95,step:.05,fmt:me}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-5",children:[e.jsxs("svg",{width:j,height:f,viewBox:`0 0 ${j} ${f}`,className:"max-w-full h-auto rounded",style:{border:"1px solid var(--w-border)"},role:"img","aria-label":"Punktwolke z (grau) und ihr Bild y = Lz (grün)",children:[e.jsx("rect",{x:0,y:0,width:j,height:f,fill:"var(--w-bg)"}),e.jsx("line",{x1:g(-_),y1:A(0),x2:g(_),y2:A(0),stroke:"var(--w-grid-strong)",strokeWidth:1}),e.jsx("line",{x1:g(0),y1:A(-_),x2:g(0),y2:A(_),stroke:"var(--w-grid-strong)",strokeWidth:1}),ee.map(k=>e.jsxs("g",{children:[e.jsx("line",{x1:g(k),y1:A(0)-3,x2:g(k),y2:A(0)+3,stroke:B,strokeWidth:1}),k!==0&&e.jsx("text",{x:g(k),y:f-m+14,fontSize:10,fill:B,textAnchor:"middle",children:String(k).replace("-","−")}),e.jsx("line",{x1:g(0)-3,y1:A(k),x2:g(0)+3,y2:A(k),stroke:B,strokeWidth:1}),k!==0&&e.jsx("text",{x:S-6,y:A(k)+3,fontSize:10,fill:B,textAnchor:"end",children:String(k).replace("-","−")})]},k)),e.jsx("text",{x:j-Z-2,y:A(0)-6,fontSize:11,fill:B,textAnchor:"end",children:"y₁"}),e.jsx("text",{x:g(0)+8,y:v+10,fontSize:11,fill:B,children:"y₂"}),e.jsx("path",{d:ne(Fe),fill:"none",stroke:B,strokeWidth:1,strokeDasharray:"3 4"}),be.map(([k,R],G)=>e.jsx("circle",{cx:g(k),cy:A(R),r:2,fill:B,fillOpacity:.45},`z${G}`)),e.jsx("path",{d:ne(N),fill:"none",stroke:J,strokeWidth:1.5,strokeDasharray:"5 3"}),p.map(([k,R],G)=>e.jsx("circle",{cx:g(k),cy:A(R),r:2,fill:J,fillOpacity:.7},`y${G}`))]}),e.jsxs("div",{className:"min-w-56 grow text-sm",children:[e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsx(I,{label:"Σ (aus den Reglern)",children:e.jsx(U,{m:[[u,s],[s,h]],label:"Kovarianzmatrix Sigma"})}),e.jsx(I,{label:"L = chol(Σ)",children:e.jsx(U,{m:[[l,0],[c,o]],cellStyle:Ke,label:"Cholesky-Faktor L"})})]}),e.jsxs("div",{className:"mt-3 rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800",children:["L₁₁ = σ₁ = ",z(l),e.jsx("br",{}),"L₂₁ = ρσ₂ = ",z(c),e.jsx("br",{}),"L₂₂ = σ₂·√(1 − ρ²) = ",z(o),e.jsx("br",{}),"Probe: max |LLᵀ − Σ| = ",mn(qe)]}),e.jsx(P,{kind:Math.abs(d)>.9?"warn":Math.abs(d)<.1?"neutral":"ok",className:"mt-2",children:Math.abs(d)>.9?"L₂₂ wird klein; die Kovarianz ist fast singulär.":Math.abs(d)<.1?"Die Wolke bleibt fast rund: die Korrelation ist nahe null.":`L erzeugt die sichtbare Scherung und ${Y("satz:kovarianz-unter-dem-cholesky-faktor")} garantiert die Kovarianz Σ.`})]})]})]})}const{blau:se}=W,We=320,L=160,$=110;function gn(){const[r,n]=y.useState(20),[t,b]=y.useState("nicht"),d=r*Math.PI/180,a=[Math.cos(d),Math.sin(d)],u=t==="spd"?[[2,0],[0,1]]:[[1,0],[0,-1]],s=y.useMemo(()=>a[0]*(u[0][0]*a[0]+u[0][1]*a[1])+a[1]*(u[1][0]*a[0]+u[1][1]*a[1]),[a,u]),h=L+$*a[0],l=L-$*a[1],c=t==="nicht"&&Math.round(r)%90===45,o=!c&&s<0;return e.jsxs("div",{children:[e.jsx(O,{children:"Wählen wir „nicht SPD“ und drehen den Einheitsvektor bis die quadratische Form nicht mehr positiv ist."}),e.jsxs("div",{className:"my-2 flex flex-wrap gap-2",role:"group","aria-label":"Matrixfamilie",children:[e.jsx("button",{type:"button","aria-pressed":t==="spd",onClick:()=>b("spd"),className:t==="spd"?ze:Se,children:"SPD: diag(2, 1)"}),e.jsx("button",{type:"button","aria-pressed":t==="nicht",onClick:()=>b("nicht"),className:t==="nicht"?ze:Se,children:"nicht SPD: diag(1, −1)"})]}),e.jsxs("svg",{viewBox:`0 0 ${We} ${We}`,className:"max-w-full h-auto",role:"img","aria-label":`Einheitsvektor bei ${r} Grad, quadratische Form ${s.toFixed(2)}`,children:[e.jsx("circle",{cx:L,cy:L,r:$,fill:"none",stroke:"var(--w-grid-strong)"}),e.jsx("line",{x1:30,y1:L,x2:290,y2:L,stroke:"var(--w-axis)"}),e.jsx("line",{x1:L,y1:30,x2:L,y2:290,stroke:"var(--w-axis)"}),[-1,1].map(p=>e.jsxs("g",{children:[e.jsx("line",{x1:L+p*$,y1:L-4,x2:L+p*$,y2:L+4,stroke:"var(--w-axis)"}),e.jsx("line",{x1:L-4,y1:L-p*$,x2:L+4,y2:L-p*$,stroke:"var(--w-axis)"}),e.jsx("text",{x:L+p*$,y:L+16,textAnchor:"middle",fontSize:10,fill:"var(--w-muted)",children:p===1?"1":"−1"}),e.jsx("text",{x:L-8,y:L-p*$+4,textAnchor:"end",fontSize:10,fill:"var(--w-muted)",children:p===1?"1":"−1"})]},p)),e.jsx("text",{x:286,y:L-8,textAnchor:"end",fontSize:11,fontStyle:"italic",fill:"var(--w-muted)",children:"x₁"}),e.jsx("text",{x:L+6,y:38,fontSize:11,fontStyle:"italic",fill:"var(--w-muted)",children:"x₂"}),e.jsx("line",{x1:L,y1:L,x2:h,y2:l,stroke:se,strokeWidth:4}),e.jsx("circle",{cx:h,cy:l,r:8,fill:se}),e.jsx("text",{x:h+12*a[0],y:l-12*a[1]+4,textAnchor:"middle",fill:se,fontSize:13,fontWeight:600,children:"x"}),e.jsxs("text",{x:18,y:26,fill:"var(--w-muted)",fontSize:12,children:["xᵀAx = ",s.toFixed(3).replace(".",",")]})]}),e.jsx(q,{label:"Richtung θ",value:r,onChange:n,min:0,max:360,step:1,unit:"°",accent:se}),e.jsx(P,{kind:t==="spd"?"ok":o?"fail":"warn",children:t==="spd"?`Für jede dargestellte Richtung bleibt xᵀAx positiv. Das bestätigt nur diese Matrixfamilie; ${Y("satz:cholesky-zerlegung")} darf angewendet werden.`:o?"Aufgabe geschafft: Diese Richtung liefert xᵀAx < 0 und widerlegt positive Definitheit.":c?"Genau auf der Nullrichtung: xᵀAx = 0 bei x ≠ 0. Auch das widerlegt positive Definitheit, denn die Definition verlangt echt größer null. Für eine positiv semidefinite Matrix wäre genau dieser Grenzfall erlaubt.":"Diese Richtung besteht den Test, beweist aber nichts: SPD verlangt die Ungleichung für alle Richtungen."})]})}function Be(r){const n={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Die ",e.jsx(x,{id:"env:lu-zerlegung",children:"LU-Zerlegung"})," (",e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"}),`) funktioniert, notfalls mit Pivotierung, für
jede invertierbare Matrix. Viele Matrizen der Statistik haben aber mehr
Struktur: Sie sind `,e.jsx(x,{id:"symmetric-matrix",children:"symmetrisch"}),`, und ihre
`,e.jsx(x,{id:"quadratic-form",children:"quadratische Form"}),` ist strikt positiv. Für sie gibt es
eine maßgeschneiderte Zerlegung, die mit halbem Aufwand auskommt und ohne
Pivotierung stabil bleibt: die Cholesky-Zerlegung.`]}),`
`,e.jsx(n.h3,{children:"SPD-Matrizen"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"SPD"}),"-Matrizen sind ",e.jsx(n.strong,{children:"s"}),"ymmetrisch und ",e.jsx(n.strong,{children:"p"}),"ositiv ",e.jsx(n.strong,{children:"d"}),"efinit."]}),`
`,e.jsxs(E,{kind:"Definition",label:"5.4.1 (SPD-Matrix)",id:"env-spd-matrix",children:[e.jsxs(n.p,{children:["Eine Matrix ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," heißt ",e.jsx(n.em,{children:"SPD"}),", wenn"]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bA = \\bA^\\top"})," gilt (",e.jsx(i,{children:"\\bA"})," also symmetrisch ist) und"]}),`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bx^\\top \\bA \\bx > 0"})," für alle ",e.jsx(i,{children:"\\bx \\in \\R^n"})," mit ",e.jsx(i,{children:"\\bx \\neq \\bnull"}),`
gilt (`,e.jsx(i,{children:"\\bA"})," also ",e.jsx(n.em,{children:"positiv definit"})," ist)."]}),`
`]})]}),`
`,e.jsxs(n.p,{children:[`Verlangen wir statt der strikten Ungleichung nur
`,e.jsx(i,{children:"\\bx^\\top \\bA \\bx \\geq 0"})," für alle ",e.jsx(i,{children:"\\bx \\in \\R^n"}),`, heißt ein symmetrisches
`,e.jsx(i,{children:"\\bA"})," ",e.jsx(n.em,{children:"positiv semidefinit"}),` (PSD); den Nullvektor müssen wir dann nicht mehr
ausnehmen. Der Unterschied wirkt klein, entscheidet aber später darüber, ob
die Cholesky-Zerlegung ohne Zusatztricks durchläuft.`]}),`
`,e.jsxs(K,{title:"Welche Richtung widerlegt positive Definitheit?",children:[e.jsx(n.p,{children:`Eine einzelne Richtung kann positive Definitheit widerlegen, aber nie
beweisen. Suchen wir eine Richtung, die den Gegenbeweis liefert.`}),e.jsx(gn,{}),e.jsxs(n.p,{children:["Bei ",e.jsx(i,{children:"\\operatorname{diag}(1, -1)"})," ist ",e.jsx(i,{children:"\\bx^\\top\\bA\\bx"}),` strikt zwischen
`,e.jsx(i,{children:"45^\\circ"})," und ",e.jsx(i,{children:"135^\\circ"})," sowie zwischen ",e.jsx(i,{children:"225^\\circ"})," und ",e.jsx(i,{children:"315^\\circ"}),`
negativ und bei `,e.jsx(i,{children:"45^\\circ"}),", ",e.jsx(i,{children:"135^\\circ"}),", ",e.jsx(i,{children:"225^\\circ"})," und ",e.jsx(i,{children:"315^\\circ"}),` genau
null; jede dieser Richtungen widerlegt positive Definitheit. Bei
`,e.jsx(i,{children:"\\operatorname{diag}(2, 1)"})," bleibt der Wert in jeder Richtung positiv."]})]}),`
`,e.jsx(n.h3,{children:"SPD- und PSD-Matrizen in Statistik und ML"}),`
`,e.jsx(n.p,{children:`In Statistik und maschinellem Lernen treten SPD- und PSD-Matrizen vor allem
in drei Familien auf:`}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(x,{id:"covariance-matrix",children:"Kovarianzmatrizen"})}),`
`,e.jsx(i,{children:"\\bSigma = \\E[(\\bx - \\bmu)(\\bx - \\bmu)^\\top]"}),` sind stets positiv
semidefinit, denn für jeden festen Vektor `,e.jsx(i,{children:"\\ba"}),` ist
`,e.jsx(i,{children:"\\ba^\\top \\bSigma \\ba = \\var(\\ba^\\top \\bx) \\geq 0"}),` eine Varianz. SPD ist
`,e.jsx(i,{children:"\\bSigma"})," genau dann, wenn keine Linearkombination ",e.jsx(i,{children:"\\ba^\\top \\bx"}),` mit
`,e.jsx(i,{children:"\\ba \\neq \\bnull"}),` fast sicher konstant ist, die Verteilung also nicht
auf einer Hyperebene liegt. Kovarianzmatrizen parametrisieren
multivariate Normalverteilungen `,e.jsx(i,{children:"\\Ncal_p(\\bmu, \\bSigma)"}),` und stehen im
Zentrum der Hauptkomponentenanalyse (PCA).`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Gram-Matrizen"})," ",e.jsx(i,{children:"\\bK = \\bX^\\top \\bX"}),`, etwa für eine Designmatrix
`,e.jsx(i,{children:"\\bX"}),` in der Regression: Sie bilden die linke Seite der
`,e.jsx(x,{id:"normal-equations",children:"Normalgleichungen"}),`
`,e.jsx(i,{children:"\\bX^\\top \\bX \\bbeta = \\bX^\\top \\by"}),` für
`,e.jsx(n.em,{children:"Kleinste-Quadrate"}),"-Probleme (",e.jsx(n.a,{href:"?k=07-kq#sec-7.3",children:"Abschnitt 7.3"}),`). SPD ist
`,e.jsx(i,{children:"\\bK"})," genau dann, wenn ",e.jsx(i,{children:"\\bX"}),` vollen Spaltenrang hat; sonst bleibt nur
positive Semidefinitheit. Auch Kernel-Matrizen in Support Vector
Machines, Gauß-Prozessen und der nichtparametrischen Glättung gehören
in diese Familie.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(x,{id:"hessian-matrix",children:"Hesse-Matrizen"})}),`
`,e.jsx(i,{children:"\\bH = \\bigl[\\tfrac{\\partial^2}{\\partial x_i \\partial x_j} f(\\bx)\\bigr]_{i,j}"}),`:
In der Optimierung
charakterisieren sie `,e.jsx(x,{id:"convexity",children:"Konvexität"}),` und bilden die Grundlage
des `,e.jsx(x,{id:"newtons-method",children:"Newton-Verfahrens"}),` und anderer Optimierer zweiter
Ordnung. Ihr statistisches Gegenstück ist die Fisher-Information
`,e.jsx(i,{children:"\\E\\bigl[-\\tfrac{\\partial^2}{\\partial \\theta_i \\partial \\theta_j} \\log L(\\btheta)\\bigr]_{i,j}"}),`
der Log-`,e.jsx(x,{id:"likelihood",children:"Likelihood"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"Warum lohnt sich diese Klasse für die Numerik? SPD-Matrizen garantieren:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Existenz und, bei positiver Diagonale von ",e.jsx(i,{children:"\\bL"}),`, Eindeutigkeit der
Cholesky-Zerlegung (`,e.jsx(x,{id:"env:cholesky-zerlegung",href:"#env-cholesky-zerlegung",children:"Satz 5.4.2"}),"),"]}),`
`,e.jsxs(n.li,{children:["ihre numerische Stabilität (im Sinne von ",e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Abschnitt 4.3"}),`) auch ohne
Pivotierung,`]}),`
`,e.jsxs(n.li,{children:["lauter positive ",e.jsx(x,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),`, also vollen
`,e.jsx(x,{id:"rank",children:"Rang"})," und Invertierbarkeit."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Der Zerlegungssatz"}),`
`,e.jsxs(n.p,{children:[`Bei einer symmetrischen Matrix steckt die gesamte Information schon in
einer Dreieckshälfte. Für SPD-Matrizen können wir die Faktoren `,e.jsx(i,{children:"\\bL"}),` und
`,e.jsx(i,{children:"\\bU"})," der LU-Zerlegung so wählen, dass ",e.jsx(i,{children:"\\bU = \\bL^\\top"}),` gilt: Die Symmetrie
von `,e.jsx(i,{children:"\\bA"})," vererbt sich an die Zerlegung."]}),`
`,e.jsxs(E,{kind:"Satz",label:"5.4.2 (Cholesky-Zerlegung)",id:"env-cholesky-zerlegung",children:[e.jsxs(n.p,{children:["Jede SPD-Matrix ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," lässt sich zerlegen als"]}),e.jsx(Q,{tag:"5.4.1",id:"eq-cholesky-zerlegung",children:"\\bA = \\bL \\bL^\\top ,"}),e.jsxs(n.p,{children:["wobei ",e.jsx(i,{children:"\\bL"})," eine untere ",e.jsx(x,{id:"triangular-matrix",children:"Dreiecksmatrix"}),` mit
positiven Diagonaleinträgen `,e.jsx(i,{children:"l_{ii} > 0"})," ist. Diese Zerlegung ist eindeutig."]})]}),`
`,e.jsxs(n.p,{children:["Statt zweier Faktoren speichern wir nur noch ",e.jsx(i,{children:"\\bL"}),`, und auch die Rechnung
halbiert sich: Die Cholesky-Zerlegung kommt mit rund `,e.jsx(i,{children:"n^3/6"}),`
Multiplikationen aus, die LU-Zerlegung derselben Matrix braucht rund
`,e.jsx(i,{children:"n^3/3"})," (",e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"}),"). An der Größenordnung ",e.jsx(i,{children:"O(n^3)"}),` ändert das nichts, an der
Rechenzeit sehr wohl. Die Normierung `,e.jsx(i,{children:"l_{ii} > 0"}),` braucht es für die
Eindeutigkeit: Ohne sie dürften wir in einer beliebigen Spalte von `,e.jsx(i,{children:"\\bL"}),`
alle Vorzeichen umdrehen, ohne `,e.jsx(i,{children:"\\bL\\bL^\\top"})," zu verändern."]}),`
`,e.jsxs(ge,{title:"Induktionsbeweis der Cholesky-Zerlegung",children:[e.jsxs(n.p,{children:["Der Beweis ist eine Induktion über die Dimension ",e.jsx(i,{children:"n"}),` und liefert nebenbei
ein Rezept, wie sich `,e.jsx(i,{children:"\\bL"})," Spalte für Spalte berechnen lässt."]}),e.jsxs(je,{children:[e.jsx(F,{why:e.jsxs(e.Fragment,{children:["mit dem Testvektor ",e.jsx(i,{children:"x = 1 \\neq 0"})," liefert die Definitheit ",e.jsx(i,{children:"x\\,a\\,x = a > 0"}),"; die Wurzel existiert also"]}),children:e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Induktionsanfang"})," ",e.jsx(i,{children:"n = 1"}),": Hier ist ",e.jsx(i,{children:"\\bA = (a)"})," mit ",e.jsx(i,{children:"a \\in \\R"}),`, und aus
der Definitheit folgt `,e.jsx(i,{children:"a > 0"}),". Also leistet ",e.jsx(i,{children:"\\bL = (\\sqrt{a})"}),` das
Verlangte, denn `,e.jsx(i,{children:"\\bL\\bL^\\top = (\\sqrt{a})^2 = a"}),"."]})}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"a = \\be_1^\\top \\bA \\be_1 > 0"}),", weil ",e.jsx(i,{children:"\\bA"})," positiv definit und ",e.jsx(i,{children:"\\be_1 \\neq \\bnull"})," ist"]}),children:[e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Induktionsschritt"})," ",e.jsx(i,{children:"n > 1"}),`: Die Behauptung gelte für
`,e.jsx(i,{children:"(n-1) \\times (n-1)"}),"-Matrizen. Wir zerlegen ",e.jsx(i,{children:"\\bA"})," in Blöcke,"]}),e.jsx(w,{children:`\\bA = \\begin{pmatrix} a & \\bc^\\top \\\\ \\bc & \\bB \\end{pmatrix},
\\qquad a \\in \\R, \\quad \\bc \\in \\R^{n-1}, \\quad \\bB \\in \\R^{(n-1) \\times (n-1)},`}),e.jsxs(n.p,{children:["und halten fest, dass ",e.jsx(i,{children:"a > 0"})," gilt."]})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"\\bB"})," ist als Diagonalblock der symmetrischen Matrix ",e.jsx(i,{children:"\\bA"})," selbst symmetrisch, und ",e.jsx(i,{children:"(\\bl\\bl^\\top)^\\top = \\bl\\bl^\\top"})]}),children:e.jsxs(n.p,{children:["Wir setzen ",e.jsx(i,{children:"\\bl = \\bc / \\sqrt{a}"}),` und betrachten die
`,e.jsx(i,{children:"(n-1) \\times (n-1)"}),"-Matrix ",e.jsx(i,{children:"\\bB - \\bl\\bl^\\top = \\bB - \\bc\\bc^\\top\\!/a"}),`.
Sie ist symmetrisch.`]})}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["blockweises Ausmultiplizieren; in der ersten Komponente kürzt sich ",e.jsx(i,{children:"a"})," heraus, es bleibt ",e.jsx(i,{children:"-\\bc^\\top\\bx + \\bc^\\top\\bx = 0"})]}),children:[e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bB - \\bl\\bl^\\top"}),` ist auch positiv definit. Zu beliebigem
`,e.jsx(i,{children:"\\bx \\in \\R^{n-1}"})," mit ",e.jsx(i,{children:"\\bx \\neq \\bnull"})," wählen wir den Testvektor"]}),e.jsx(w,{children:"\\by = \\begin{pmatrix} -\\tfrac{\\bc^\\top\\bx}{a} \\\\ \\bx \\end{pmatrix} \\in \\R^n"}),e.jsx(n.p,{children:"und rechnen zuerst"}),e.jsx(w,{children:`\\bA\\by
= \\begin{pmatrix}
a \\cdot \\bigl(-\\tfrac{\\bc^\\top\\bx}{a}\\bigr) + \\bc^\\top\\bx \\\\
\\bc \\cdot \\bigl(-\\tfrac{\\bc^\\top\\bx}{a}\\bigr) + \\bB\\bx
\\end{pmatrix}
= \\begin{pmatrix} 0 \\\\ \\bigl(\\bB - \\tfrac{\\bc\\bc^\\top}{a}\\bigr)\\bx \\end{pmatrix}.`})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["im Produkt ",e.jsx(i,{children:"\\by^\\top (\\bA\\by)"})," trifft die erste Komponente von ",e.jsx(i,{children:"\\by"})," auf die ",e.jsx(i,{children:"0"}),", übrig bleibt genau ",e.jsx(i,{children:"\\bx^\\top(\\bB - \\bc\\bc^\\top/a)\\bx"}),"; und ",e.jsx(i,{children:"\\by^\\top \\bA \\by > 0"}),", weil ",e.jsx(i,{children:"\\bA"})," SPD ist und ",e.jsx(i,{children:"\\by \\neq \\bnull"})," (schon der untere Block ",e.jsx(i,{children:"\\bx"})," ist es)"]}),children:[e.jsx(n.p,{children:"Damit folgt"}),e.jsx(w,{children:`\\bx^\\top \\Bigl(\\bB - \\tfrac{\\bc\\bc^\\top}{a}\\Bigr) \\bx
= \\by^\\top \\bA \\by > 0 .`})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"\\sqrt{a}\\,\\bl = \\bc"})," nach Definition von ",e.jsx(i,{children:"\\bl"}),", und ",e.jsx(i,{children:"\\bl\\bl^\\top + \\wt{\\bL}\\wt{\\bL}^\\top = \\bl\\bl^\\top + (\\bB - \\bl\\bl^\\top) = \\bB"})]}),children:[e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bB - \\bl\\bl^\\top"})," ist also eine SPD-Matrix der Dimension ",e.jsx(i,{children:"n - 1"}),`, und
nach Induktionsvoraussetzung existiert eine untere Dreiecksmatrix
`,e.jsx(i,{children:"\\wt{\\bL}"})," mit ",e.jsx(i,{children:"\\bB - \\bl\\bl^\\top = \\wt{\\bL}\\wt{\\bL}^\\top"}),". Wir setzen"]}),e.jsx(w,{children:"\\bL = \\begin{pmatrix} \\sqrt{a} & \\bnull^\\top \\\\ \\bl & \\wt{\\bL} \\end{pmatrix}"}),e.jsx(n.p,{children:"und prüfen blockweise nach:"}),e.jsx(w,{children:`\\bL\\bL^\\top
= \\begin{pmatrix}
a & \\sqrt{a}\\,\\bl^\\top \\\\
\\sqrt{a}\\,\\bl & \\bl\\bl^\\top + \\wt{\\bL}\\wt{\\bL}^\\top
\\end{pmatrix}
= \\begin{pmatrix} a & \\bc^\\top \\\\ \\bc & \\bB \\end{pmatrix}
= \\bA .`})]})]}),e.jsxs(n.p,{children:["Auf der Diagonalen von ",e.jsx(i,{children:"\\bL"}),` steht in jedem Schritt eine Wurzel, also eine
positive Zahl. Eindeutig ist die Zerlegung ebenfalls: Der Vergleich der
ersten Spalte von `,e.jsx(i,{children:"\\bL\\bL^\\top = \\bA"})," erzwingt ",e.jsx(i,{children:"l_{11} = \\sqrt{a}"}),` (wegen
`,e.jsx(i,{children:"l_{11} > 0"}),") und ",e.jsx(i,{children:"\\bl = \\bc/\\sqrt{a}"}),", und ",e.jsx(i,{children:"\\wt{\\bL}"}),` ist nach
Induktionsvoraussetzung eindeutig.`]})]}),`
`,e.jsx(n.h3,{children:"Cholesky von Hand: Koeffizientenvergleich"}),`
`,e.jsxs(n.p,{children:["Wie kommen wir konkret an ",e.jsx(i,{children:"\\bL"}),`? Für kleine Matrizen genügt ein
Koeffizientenvergleich.`]}),`
`,e.jsxs(E,{kind:"Beispiel",label:"5.4.3 (Cholesky-Zerlegung einer 2×2-Matrix)",id:"env-cholesky-zerlegung-einer-2-2-matrix",children:[e.jsxs(n.p,{children:[`Wir berechnen die Cholesky-Zerlegung von
`,e.jsx(i,{children:"\\bA = \\begin{pmatrix} 4 & 2 \\\\ 2 & 3 \\end{pmatrix}"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Ansatz:"})," ",e.jsx(i,{children:"\\bA = \\bL\\bL^\\top"}),` mit
`,e.jsx(i,{children:"\\bL = \\begin{pmatrix} l_{11} & 0 \\\\ l_{21} & l_{22} \\end{pmatrix}"}),"."]}),e.jsx(n.p,{children:e.jsx(n.strong,{children:"Ausmultiplizieren:"})}),e.jsx(w,{children:`\\bL\\bL^\\top
= \\begin{pmatrix} l_{11} & 0 \\\\ l_{21} & l_{22} \\end{pmatrix}
\\begin{pmatrix} l_{11} & l_{21} \\\\ 0 & l_{22} \\end{pmatrix}
= \\begin{pmatrix}
l_{11}^2 & l_{11} l_{21} \\\\
l_{11} l_{21} & l_{21}^2 + l_{22}^2
\\end{pmatrix}
\\overset{!}{=} \\begin{pmatrix} \\cred{4} & \\cred{2} \\\\ \\cred{2} & \\cred{3} \\end{pmatrix}.`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Koeffizientenvergleich"}),`, von links oben nach rechts unten (der jeweils
verglichene Eintrag von `,e.jsx(i,{children:"\\bA"})," rot, fertig berechnete Einträge von ",e.jsx(i,{children:"\\bL"}),`
grün):`]}),e.jsx(w,{children:`\\begin{aligned}
l_{11}^2 &= \\cred{4} & &\\implies & l_{11} &= \\cgreen{2}, \\\\
l_{11}\\, l_{21} &= \\cred{2} & &\\implies & l_{21} &= 2/2 = \\cgreen{1}, \\\\
l_{21}^2 + l_{22}^2 &= \\cred{3} & &\\implies & l_{22} &= \\sqrt{3 - 1} = \\cgreen{\\sqrt{2}} .
\\end{aligned}`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Ergebnis:"}),`
`,e.jsx(i,{children:"\\bL = \\begin{pmatrix} \\cgreen{2} & 0 \\\\ \\cgreen{1} & \\cgreen{\\sqrt{2}} \\end{pmatrix}"}),`,
und die Probe bestätigt
`,e.jsx(i,{children:"\\bL\\bL^\\top = \\begin{pmatrix} 4 & 2 \\\\ 2 & 3 \\end{pmatrix} = \\bA"}),"."]})]}),`
`,e.jsxs(n.p,{children:[`Jede Gleichung enthielt genau eine neue Unbekannte; in dieser Reihenfolge
löst sich das System Schritt für Schritt auf. Dass unter der Wurzel
mit `,e.jsx(i,{children:"3 - 1 = 2 > 0"}),` etwas Positives stand, garantiert
`,e.jsx(x,{id:"env:cholesky-zerlegung",href:"#env-cholesky-zerlegung",children:"Satz 5.4.2"}),` für jede SPD-Matrix: Die Radikanden sind die
Quadrate der positiven Diagonaleinträge von `,e.jsx(i,{children:"\\bL"}),"."]}),`
`,e.jsxs(n.p,{children:["Für allgemeines ",e.jsx(i,{children:"n"}),` funktioniert derselbe Vergleich. Der Eintrag
`,e.jsx(i,{children:"(i,j)"})," von ",e.jsx(i,{children:"\\bL\\bL^\\top"}),` ist
`,e.jsx(i,{children:"\\sum_{k=1}^{n} l_{ik} l_{jk}"}),", und weil ",e.jsx(i,{children:"\\bL"}),` untere Dreiecksmatrix ist,
brechen die Summen früh ab. Wir lösen Spalte für Spalte auf, jeweils nach
dem einzigen noch unbekannten Eintrag:`]}),`
`,e.jsx(Q,{tag:"5.4.2",id:"eq-eq-5-4-2",children:`l_{jj} = \\sqrt{a_{jj} - \\sum_{k=1}^{j-1} l_{jk}^2} ,
\\qquad
l_{ij} = \\frac{1}{l_{jj}} \\Bigl( a_{ij} - \\sum_{k=1}^{j-1} l_{ik} l_{jk} \\Bigr)
\\quad (i > j) .`}),`
`,e.jsxs(K,{title:"Cholesky-Zerlegung Schritt für Schritt",children:[e.jsxs(n.p,{children:["Ab ",e.jsx(i,{children:"3 \\times 3"}),` entsteht pro Eintrag ein Rechenschritt. In welcher Reihenfolge
füllt sich `,e.jsx(i,{children:"\\bL"}),"?"]}),e.jsx(bn,{}),e.jsxs(n.p,{children:[`Auf jeden Diagonaleintrag (Wurzel) folgen die Einträge darunter (Division
durch ihn), Spalte für Spalte. Bei einer nicht positiv definiten Matrix
steht irgendwann eine Zahl `,e.jsx(i,{children:"\\leq 0"}),` unter der Wurzel, und die Rechnung
bricht ab.`]})]}),`
`,e.jsx(n.h3,{children:"Anwendung: korrelierte Zufallsvektoren simulieren"}),`
`,e.jsxs(n.p,{children:[`Zufallszahlengeneratoren liefern unabhängige Standardnormalvariablen, also
Vektoren `,e.jsx(i,{children:"\\bx"})," mit ",e.jsx(i,{children:"\\E[\\bx] = \\bnull"})," und ",e.jsx(i,{children:"\\var(\\bx) = \\bI_d"}),`. Gebraucht
werden in der Statistik aber meist `,e.jsx(n.em,{children:"korrelierte"}),` Ziehungen mit vorgegebener
Kovarianzmatrix `,e.jsx(i,{children:"\\bSigma"}),`. Der Cholesky-Faktor liefert sie: Als lineare
Abbildung verformt er unkorreliertes Rauschen in die gewünschte
Abhängigkeitsstruktur.`]}),`
`,e.jsxs(E,{kind:"Satz",label:"5.4.4 (Kovarianz unter dem Cholesky-Faktor)",id:"env-kovarianz-unter-dem-cholesky-faktor",children:[e.jsxs(n.p,{children:["Sei ",e.jsx(i,{children:"\\bx \\in \\R^d"})," ein Zufallsvektor mit ",e.jsx(i,{children:"\\E[\\bx] = \\bnull"}),` und
`,e.jsx(i,{children:"\\var(\\bx) = \\bI_d"}),", und sei ",e.jsx(i,{children:"\\bSigma \\in \\R^{d \\times d}"}),` SPD mit
Cholesky-Zerlegung `,e.jsx(i,{children:"\\bSigma = \\bL\\bL^\\top"}),". Dann hat ",e.jsx(i,{children:"\\by = \\bL\\bx"}),` den
Erwartungswert `,e.jsx(i,{children:"\\bnull"})," und die Kovarianzmatrix"]}),e.jsx(w,{children:"\\var(\\by) = \\bSigma ."})]}),`
`,e.jsx(je,{children:e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["der ",e.jsx(x,{id:"expected-value",children:"Erwartungswert"})," ist linear und ",e.jsx(i,{children:"\\bL"})," eine feste, nicht zufällige Matrix, darf also aus ihm herausgezogen werden; für zentrierte Vektoren ist ",e.jsx(i,{children:"\\var(\\by) = \\E[\\by\\by^\\top]"}),", insbesondere ",e.jsx(i,{children:"\\E[\\bx\\bx^\\top] = \\var(\\bx) = \\bI_d"}),"; zuletzt die Zerlegung ",e.jsx(n.a,{href:"#eq-cholesky-zerlegung",children:"(5.4.1)"})]}),children:[e.jsxs(n.p,{children:["Wegen ",e.jsx(i,{children:"\\E[\\by] = \\bL\\,\\E[\\bx] = \\bnull"})," ist ",e.jsx(i,{children:"\\var(\\by) = \\E[\\by\\by^\\top]"}),`, und
damit`]}),e.jsx(w,{children:`\\var(\\by)
= \\E\\bigl[\\bL\\bx\\bx^\\top\\bL^\\top\\bigr]
= \\bL\\, \\E\\bigl[\\bx\\bx^\\top\\bigr]\\, \\bL^\\top
= \\bL\\, \\bI_d\\, \\bL^\\top
= \\bSigma .`})]})}),`
`,e.jsxs(E,{kind:"Bemerkung",label:"5.4.5 (Ziehen aus der multivariaten Normalverteilung)",id:"env-ziehen-aus-der-multivariaten",children:[e.jsxs(n.p,{children:["So simulieren wir aus ",e.jsx(i,{children:"\\Ncal(\\bmu, \\bSigma)"}),`: Wir erzeugen
`,e.jsx(i,{children:"\\bz \\sim \\Ncal(\\bnull, \\bI_d)"})," aus ",e.jsx(i,{children:"d"}),` unabhängigen
Standardnormalvariablen, berechnen den Cholesky-Faktor `,e.jsx(i,{children:"\\bL"}),` von
`,e.jsx(i,{children:"\\bSigma"})," und geben ",e.jsx(i,{children:"\\bmu + \\bL\\bz"}),` zurück. Als lineare Transformation
eines normalverteilten Vektors ist `,e.jsx(i,{children:"\\bmu + \\bL\\bz"}),` wieder normalverteilt,
nach `,e.jsx(x,{id:"env:kovarianz-unter-dem-cholesky-faktor",href:"#env-kovarianz-unter-dem-cholesky-faktor",children:"Satz 5.4.4"})," mit Erwartungswert ",e.jsx(i,{children:"\\bmu"}),` und
Kovarianz `,e.jsx(i,{children:"\\bSigma"}),`. Die Zerlegung rechnen wir nur einmal; jede weitere
Ziehung kostet ein Matrix-Vektor-Produkt.`]}),e.jsxs(n.p,{children:["In R liefert ",e.jsx(n.code,{children:"chol()"})," den ",e.jsx(n.em,{children:"oberen"})," Faktor ",e.jsx(i,{children:"\\bR = \\bL^\\top"}),` mit
`,e.jsx(i,{children:"\\bSigma = \\bR^\\top\\bR"}),"; den unteren erhalten wir mit ",e.jsx(n.code,{children:"t(chol(Sigma))"}),":"]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-r",children:`set.seed(7)
Sigma <- matrix(c(1,   0.9,
                  0.9, 1), 2, 2)
L <- t(chol(Sigma))  # chol() liefert die obere Dreiecksmatrix
x <- matrix(rnorm(2 * 1000), nrow = 2)
y <- L %*% x
round(cov(t(y)), 2)  # empirische Kovarianz, nahe bei Sigma
`})})]}),`
`,e.jsxs(K,{title:"Wie L eine runde Punktwolke verformt",children:[e.jsxs(n.p,{children:["Welche Veränderung der Wolke erwarten wir, wenn ",e.jsx(i,{children:"|\\rho|"})," fast eins wird?"]}),e.jsxs(n.p,{children:["Im zweidimensionalen Fall lässt sich ",e.jsx(x,{id:"env:kovarianz-unter-dem-cholesky-faktor",href:"#env-kovarianz-unter-dem-cholesky-faktor",children:"Satz 5.4.4"}),` direkt ansehen. Aus
`,e.jsx(i,{children:"\\sigma_1"}),", ",e.jsx(i,{children:"\\sigma_2"})," und der Korrelation ",e.jsx(i,{children:"\\rho"})," bauen wir"]}),e.jsx(w,{children:"\\bSigma = \\begin{pmatrix} \\sigma_1^2 & \\rho\\,\\sigma_1\\sigma_2 \\\\ \\rho\\,\\sigma_1\\sigma_2 & \\sigma_2^2 \\end{pmatrix},"}),e.jsxs(n.p,{children:["und ",e.jsx(n.a,{href:"#eq-eq-5-4-2",children:"(5.4.2)"})," liefert den Cholesky-Faktor in geschlossener Form:"]}),e.jsx(w,{children:"\\bL = \\begin{pmatrix} \\cgreen{\\sigma_1} & 0 \\\\ \\cgreen{\\rho\\,\\sigma_2} & \\cgreen{\\sigma_2\\sqrt{1 - \\rho^2}} \\end{pmatrix} ."}),e.jsx(jn,{}),e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bL"})," streckt die erste Koordinate mit ",e.jsx(i,{children:"\\cgreen{\\sigma_1}"}),` und mischt der
zweiten über `,e.jsx(i,{children:"\\cgreen{\\rho\\,\\sigma_2}"}),` einen Anteil davon bei: Aus der runden
Wolke wird eine gestreckte, für `,e.jsx(i,{children:"\\rho \\neq 0"})," geneigte Ellipse. Läuft ",e.jsx(i,{children:"|\\rho|"}),`
gegen eins, geht der Eintrag
`,e.jsx(i,{children:"\\cgreen{\\sigma_2\\sqrt{1 - \\rho^2}}"}),` gegen null, die Wolke fällt auf eine
Gerade zusammen und `,e.jsx(i,{children:"\\bSigma"})," wird singulär."]})]}),`
`,e.jsxs(ge,{title:"Cholesky mit Pivotierung: semidefinite und rangdefiziente Matrizen",children:[e.jsxs(n.p,{children:["Was passiert, wenn ",e.jsx(i,{children:"\\bA"})," nur positiv ",e.jsx(n.em,{children:"semi"}),`definit ist (also
`,e.jsx(i,{children:"\\bx^\\top \\bA \\bx \\geq 0"})," statt ",e.jsx(i,{children:"> 0"}),"), etwa weil ",e.jsx(i,{children:"\\bA"}),` singulär ist? Oder
wenn `,e.jsx(i,{children:"\\bA"}),` zwar SPD, aber so
schlecht konditioniert (`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`) ist, dass Rundungsfehler
den Unterschied verwischen? Dann läuft der Koeffizientenvergleich
irgendwann auf eine Wurzel aus null oder sogar aus einer negativen Zahl,
und die gewohnte Rechnung bricht ab. Abhilfe schafft wie bei der LU-Zerlegung die
Pivotierung. Diesmal vertauschen wir Zeilen `,e.jsx(n.em,{children:"und"}),` Spalten symmetrisch
(`,e.jsx(n.em,{children:"complete pivoting"}),"), damit die Symmetrie erhalten bleibt:"]}),e.jsx(w,{children:"\\bP^\\top \\bA \\bP = \\bL \\bL^\\top"}),e.jsxs(n.p,{children:["mit einer ",e.jsx(x,{id:"permutation-matrix",children:"Permutationsmatrix"})," ",e.jsx(i,{children:"\\bP"}),`. Diese
Variante hat drei nützliche Eigenschaften:`]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rang-aufdeckend:"})," Nullspalten in ",e.jsx(i,{children:"\\bL"}),` zeigen direkt den Rangabfall
von `,e.jsx(i,{children:"\\bA"})," an; die Zerlegung bestimmt nebenbei den Rang der Matrix."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Stabil:"}),` Auch für semidefinite Matrizen bleibt die pivotierte
Cholesky-Zerlegung numerisch stabil
(`,e.jsx(n.a,{href:"https://eprints.maths.manchester.ac.uk/1193/1/high90c.pdf",children:"Higham, 1990"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Praktisch relevant"}),` in Statistik und ML: für Kernel-Matrizen
(Gauß-Prozesse, SVMs), für niedrig-rangige approximative Zerlegungen
mit Aufwand `,e.jsx(i,{children:"O(k^2 n)"})," statt ",e.jsx(i,{children:"O(n^3)"})," bei Abbruch nach ",e.jsx(i,{children:"k"}),` Spalten,
und für Gram-Matrizen `,e.jsx(i,{children:"\\bX^\\top\\bX"})," im Fall ",e.jsx(i,{children:"p > n"}),` (mehr Merkmale als
Beobachtungen), die zwangsläufig singulär sind.`]}),`
`]})]}),`
`,e.jsx(n.h3,{children:"Selbsttest"}),`
`,e.jsxs(C,{children:[e.jsxs(ke,{loesung:.436,toleranz:.01,children:[e.jsxs(n.p,{children:["Welchen Wert zeigt der Sampler für ",e.jsx(i,{children:"L_{22}"}),`, wenn wir
`,e.jsx(i,{children:"\\sigma_1 = \\sigma_2 = 1"})," und ",e.jsx(i,{children:"\\rho = 0{,}9"})," einstellen?"]}),e.jsxs(n.p,{children:[e.jsx(i,{children:"L_{22} = \\sigma_2\\sqrt{1 - \\rho^2} = \\sqrt{0{,}19} \\approx 0{,}436"}),"."]})]}),e.jsxs(D,{wahr:!0,children:[e.jsxs(n.p,{children:[`Bricht der Cholesky-Stepper mit einer exakten Null unter der Wurzel ab, kann
`,e.jsx(i,{children:"\\bA"})," trotzdem positiv semidefinit sein."]}),e.jsxs(n.p,{children:["Semidefinit verlangt nur ",e.jsx(i,{children:"\\bx^\\top\\bA\\bx \\geq 0"}),`; dieser Randfall liefert
`,e.jsx(i,{children:"l_{jj} = 0"}),", und erst die nächste Spalte scheitert an der Division."]})]}),e.jsxs(D,{wahr:!1,children:[e.jsx(n.p,{children:`Eine symmetrische Matrix ist positiv definit, sobald alle ihre Einträge
positiv sind oder ihre Determinante positiv ist.`}),e.jsxs(n.p,{children:["Beides reicht nicht. ",e.jsx(i,{children:"\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}"}),` hat nur
positive Einträge, aber `,e.jsx(i,{children:"\\bx = (1, -1)^\\top"})," liefert ",e.jsx(i,{children:"\\bx^\\top\\bA\\bx = -2"}),`;
`,e.jsx(i,{children:"-\\bI_2"})," hat Determinante ",e.jsx(i,{children:"1"})," und ",e.jsx(i,{children:"\\bx^\\top(-\\bI_2)\\bx < 0"}),` für jedes
`,e.jsx(i,{children:"\\bx \\neq \\bnull"}),". Für symmetrisches ",e.jsx(i,{children:"\\bA"}),` ist positive Definitheit
gleichwertig dazu, dass alle Eigenwerte positiv sind; `,e.jsx(i,{children:"\\det \\bA > 0"}),` ist
dafür nur notwendig.`]})]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.5 (spezielle lineare Systeme, insbesondere
symmetrische und positiv definite Matrizen).`})})]})}function pn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Be,{...r})}):Be(r)}function $e(r){const n={a:"a",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Beide Zerlegungen dieses Kapitels lösen ",e.jsx(i,{children:"\\bA\\bx = \\bb"}),` nach demselben
Plan: einmal zerlegen, dann pro rechter Seite zwei
`,e.jsx(x,{id:"triangular-solve",children:"Dreieckssysteme"}),` substituieren. Sie unterscheiden
sich in Voraussetzungen, Aufwand und Stabilität (`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Abschnitt 4.3"}),")."]}),`
`,e.jsx(n.h3,{children:"LU und Cholesky im Vergleich"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{}),e.jsx(n.th,{children:"LU-Zerlegung"}),e.jsx(n.th,{children:"Cholesky-Zerlegung"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Zerlegung"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"})}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bL\\bL^\\top"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"geeignet für"}),e.jsx(n.td,{children:"jede invertierbare Matrix"}),e.jsx(n.td,{children:"SPD-Matrizen"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Pivotierung"}),e.jsx(n.td,{children:"für die Stabilität nötig"}),e.jsx(n.td,{children:"nicht nötig"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Aufwand"}),e.jsxs(n.td,{children:["rund ",e.jsx(i,{children:"n^3/3"})," Multiplikationen"]}),e.jsxs(n.td,{children:["rund ",e.jsx(i,{children:"n^3/6"}),", also halb so viel"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"scheitert"}),e.jsx(n.td,{children:"ohne Pivotierung an Nullpivots; kleine Pivots machen sie instabil"}),e.jsx(n.td,{children:"in exakter Arithmetik bei nicht-SPD-Matrizen; numerisch eventuell nahe der Semidefinitheitsgrenze"})]})]})]}),`
`,e.jsxs(n.p,{children:["Die Stabilität der ",e.jsx(x,{id:"env:lu-zerlegung",children:"LU-Zerlegung"})," entscheidet sich am Pivot (",e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"}),`).
Partielle Pivotierung hält alle Multiplikatoren im Betrag bei höchstens 1;
ein Stabilitätsbeweis ist das nicht, aber in der Praxis gilt die pivotierte
LU-Zerlegung als stabil
(`,e.jsx(n.a,{href:"https://nhigham.com/2020/07/14/what-is-the-growth-factor-for-gaussian-elimination/",children:"Higham, 2020"}),`).
Auch ein stabiler Algorithmus liefert nur eine Näherung, deren relativer
Fehler in der Größenordnung `,e.jsx(i,{children:"\\corange{\\kappa(\\bA)} \\cdot \\eps"}),` liegen kann,
mit der `,e.jsx(x,{id:"env:eigenschaften-konditionszahl-einer-matrix",children:"Konditionszahl"})," ",e.jsx(i,{children:"\\corange{\\kappa(\\bA)}"}),`
(`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),", ",e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`) und der
`,e.jsx(x,{id:"machine-epsilon",children:"Maschinengenauigkeit"})," ",e.jsx(i,{children:"\\eps"}),". Ist ",e.jsx(i,{children:"\\bA"}),` schlecht
konditioniert, liegt das am Problem, nicht am Algorithmus.`]}),`
`,e.jsxs(n.p,{children:[`Die Cholesky-Zerlegung braucht für eine SPD-Matrix keine Pivotierung und ist
`,e.jsx(x,{id:"env:vorwaerts-und-rueckwaertsstabilitaet",children:"rückwärtsstabil"}),`. In exakter Arithmetik läuft sie für jede SPD-Matrix durch
und bricht für jede symmetrische, nicht positiv definite Matrix ab. In
Gleitkommaarithmetik kann eine Matrix nahe der Grenze zur Semidefinitheit
wegen Daten- oder Rundungsfehlern als nicht positiv definit erscheinen. Ein
Abbruch ist deshalb ein nützlicher Diagnosehinweis: Entweder ist `,e.jsx(i,{children:"\\bA"}),` nicht
SPD, oder `,e.jsx(i,{children:"\\bA"})," liegt numerisch an dieser Grenze. Für nur ",e.jsx(n.em,{children:"semi"}),`definite
Matrizen gibt es die pivotierte Variante `,e.jsx(i,{children:"\\bP^\\top \\bA \\bP = \\bL\\bL^\\top"}),`
(`,e.jsx(n.a,{href:"#sec-5.4",children:"Abschnitt 5.4"}),")."]}),`
`,e.jsx(n.h3,{children:"Was wir mitnehmen"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Für ein LGS keine explizite Inverse bilden."}),` Wo in einer Formel
`,e.jsx(i,{children:"\\bA^{-1}\\bb"}),` steht, lösen wir in der Implementierung direkt das LGS
`,e.jsx(i,{children:"\\bA\\bx = \\bb"})," (",e.jsx(n.a,{href:"#env-fuer-ein-lgs-keine-explizite-inverse",children:"Bemerkung 5.2.1"}),")."]}),`
`,e.jsxs(n.li,{children:["Die ",e.jsx(n.strong,{children:"LU-Zerlegung"})," ",e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),` ist die Gauß-Elimination in
Matrixform: einmal zerlegen für `,e.jsx(i,{children:"O(n^3)"}),`, danach kostet jede weitere
rechte Seite nur noch `,e.jsx(i,{children:"O(n^2)"}),"."]}),`
`,e.jsxs(n.li,{children:["Die ",e.jsx(n.strong,{children:"Cholesky-Zerlegung"})," ",e.jsx(i,{children:"\\bA = \\bL\\bL^\\top"}),` nutzt Symmetrie und
Definitheit aus, halbiert den Aufwand und dient auch zum Simulieren
korrelierter Zufallsvektoren (`,e.jsx(n.a,{href:"#sec-5.4",children:"Abschnitt 5.4"}),`). Kovarianz- und
Gram-Matrizen sind stets positiv semidefinit und bei vollem Rang SPD,
Hesse-Matrizen nur unter Krümmungsannahmen.`]}),`
`]}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.a,{href:"?k=06-svd",children:"Kapitel 6"}),` folgt die
`,e.jsx(x,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` (SVD), die für
beliebige, auch nicht quadratische Matrizen funktioniert.`]}),`
`,e.jsx(n.h3,{children:"Selbsttest"}),`
`,e.jsxs(C,{children:[e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Um ",e.jsx(i,{children:"\\bA\\bx = \\bb"}),` numerisch zu lösen, berechnen wir am besten zuerst
`,e.jsx(i,{children:"\\bA^{-1}"})," und bilden dann das Produkt ",e.jsx(i,{children:"\\bA^{-1}\\bb"}),"."]}),e.jsxs(n.p,{children:["Das explizite Invertieren löst versteckt ",e.jsx(i,{children:"n"}),` Gleichungssysteme statt
einem. Die Größenordnung `,e.jsx(i,{children:"O(n^3)"})," bleibt, weil eine Zerlegung für alle ",e.jsx(i,{children:"n"}),`
rechten Seiten reicht, aber der Umweg kostet ein Mehrfaches an Rechenzeit
und bringt zusätzliche Rundungsfehler
(`,e.jsx(n.a,{href:"#env-fuer-ein-lgs-keine-explizite-inverse",children:"Bemerkung 5.2.1"}),")."]})]}),e.jsxs(D,{wahr:!0,children:[e.jsxs(n.p,{children:["Liegt ",e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),` einmal vor, kostet jede weitere rechte Seite
`,e.jsx(i,{children:"\\bb"})," nur noch ",e.jsx(i,{children:"O(n^2)"})," Operationen."]}),e.jsxs(n.p,{children:[`Pro rechter Seite fallen eine Vorwärts- und eine Rückwärtssubstitution
an, zusammen rund `,e.jsx(i,{children:"n^2"})," Multiplikationen (",e.jsx(x,{id:"env:komplexitaet-der-lu-zerlegung",href:"#env-komplexitaet-der-lu-zerlegung",children:"Satz 5.3.8"}),`); die teure
Zerlegung hängt nicht von `,e.jsx(i,{children:"\\bb"})," ab."]})]}),e.jsxs(D,{wahr:!1,children:[e.jsxs(n.p,{children:["Jede invertierbare Matrix ",e.jsx(i,{children:"\\bA"})," besitzt eine Zerlegung ",e.jsx(i,{children:"\\bA = \\bL\\bU"}),"."]}),e.jsxs(n.p,{children:[`Schon die Vertauschungsmatrix
`,e.jsx(i,{children:"\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}"}),` startet mit dem Pivot
`,e.jsx(i,{children:"\\cred{0}"})," und hat keine LU-Zerlegung (",e.jsx(n.a,{href:"#env-invertierbar-aber-keine-lu-zerlegung",children:"Beispiel 5.3.5"}),`). Mit
Zeilenvertauschungen existiert aber immer `,e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),`
(`,e.jsx(x,{id:"env:existenz-der-lu-zerlegung",href:"#env-existenz-der-lu-zerlegung",children:"Satz 5.3.4"}),`). Pivotierung brauchen wir, sobald ein
Pivot null oder nahe null ist, auch bei invertierbarem `,e.jsx(i,{children:"\\bA"}),"."]})]}),e.jsxs(D,{wahr:!0,children:[e.jsxs(n.p,{children:["Eine einzige Richtung ",e.jsx(i,{children:"\\bx \\neq \\bnull"})," mit ",e.jsx(i,{children:"\\bx^\\top\\bA\\bx \\leq 0"}),` widerlegt,
dass `,e.jsx(i,{children:"\\bA"})," positiv definit ist."]}),e.jsxs(n.p,{children:[e.jsx(x,{id:"env:spd-matrix",href:"#env-spd-matrix",children:"Definition 5.4.1"})," verlangt strikte Positivität für ",e.jsx(n.em,{children:"alle"}),` von null
verschiedenen Richtungen; ein Gegenbeispiel genügt daher zum Widerlegen.
Umgekehrt beweist keine endliche Liste bestandener Richtungen die
Definitheit.`]})]}),e.jsxs(D,{wahr:!0,children:[e.jsx(n.p,{children:`Für eine SPD-Matrix ist die Cholesky-Zerlegung etwa doppelt so schnell
wie die LU-Zerlegung und kommt ohne Pivotierung aus.`}),e.jsxs(n.p,{children:["Wegen ",e.jsx(i,{children:"\\bU = \\bL^\\top"}),` muss nur ein Faktor berechnet und gespeichert
werden, rund `,e.jsx(i,{children:"n^3/6"})," statt ",e.jsx(i,{children:"n^3/3"}),` Multiplikationen; und die positive
Definitheit garantiert positive Pivots, sodass kein Tauschen nötig ist
(`,e.jsx(n.a,{href:"#sec-5.4",children:"Abschnitt 5.4"}),")."]})]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.4 (LU-Zerlegung, Pivotierung, Stabilität) und §2.5
(SPD-Systeme und Cholesky).`})})]})}function fn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx($e,{...r})}):$e(r)}function Ue(r){const n={em:"em",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsx(n.p,{children:`Wer den Stoff dieses Kapitels an weiteren Aufgaben üben möchte, findet sie in
den Lehrbüchern der Vorlesung. Die Tabellen listen passende Aufgaben, die
lohnendsten zuerst. Deutsche Übersetzungen der Aufgabenstellungen und
ausführliche Musterlösungen stehen auf der Kurs-Webseite.`}),`
`,e.jsxs(n.p,{children:[`Die Sterne schätzen ein, wie viel eine Aufgabe für diese Vorlesung bringt.
`,e.jsx(i,{children:"\\bigstar\\bigstar\\bigstar"})," heißt ",e.jsx(n.em,{children:"empfohlen"}),`: zentraler Kursstoff, nah an
Klausuraufgaben. `,e.jsx(i,{children:"\\bigstar\\bigstar"})," heißt ",e.jsx(n.em,{children:"lohnend"}),`: Kursstoff, aber ein
Randthema oder ein anderer Aufgabentyp als in der Klausur. `,e.jsx(i,{children:"\\bigstar"}),` heißt
`,e.jsx(n.em,{children:"Vertiefung"}),`: geht größtenteils über den Kursstoff hinaus oder wiederholt nur
Grundlagen. Der Aufwand ist grob geschätzt, für eine Bearbeitung ohne Blick in
die Lösung.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Empfohlen"})," (",e.jsx(i,{children:"\\bigstar\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Aufgabe"}),e.jsx(n.th,{children:"Thema"}),e.jsx(n.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Exercise 2.17"}),e.jsx(n.td,{children:"LU-Zerlegung einer singulären Tridiagonalmatrix"}),e.jsx(n.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Exercise 2.13"}),e.jsx(n.td,{children:"Blockweise Vorwärtssubstitution"}),e.jsx(n.td,{children:"mittel, ca. 15 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Schaback/Wendland Aufgabe 2.3"}),e.jsx(n.td,{children:"LU-Zerlegung einer um Zeile und Spalte erweiterten Matrix"}),e.jsx(n.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Exercise 2.38"}),e.jsx(n.td,{children:"Cholesky-Zerlegung einer wachsenden Matrix"}),e.jsx(n.td,{children:"mittel, ca. 30 Min."})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Lohnend"})," (",e.jsx(i,{children:"\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Aufgabe"}),e.jsx(n.th,{children:"Thema"}),e.jsx(n.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Exercise 2.5"}),e.jsx(n.td,{children:"Inverse einer unteren Dreiecksmatrix"}),e.jsx(n.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Exercise 2.10"}),e.jsx(n.td,{children:"Permutationsmatrizen – Transponierte statt Inverser, Zerlegung in Vertauschungen"}),e.jsx(n.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Exercise 2.34"}),e.jsx(n.td,{children:"Positiv definite Matrizen – Invertierbarkeit und Inverse"}),e.jsx(n.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Schaback/Wendland Aufgabe 2.6"}),e.jsxs(n.td,{children:["Cholesky ohne Wurzeln – die ",e.jsx(i,{children:"\\bL \\bD \\bL^T"}),"-Zerlegung"]}),e.jsx(n.td,{children:"mittel, ca. 30 Min."})]})]})]}),`
`,e.jsxs(n.p,{children:["Bücher: Heath: ",e.jsx(n.em,{children:"Scientific Computing"})," (2. Aufl.); Schaback/Wendland: ",e.jsx(n.em,{children:"Numerische Mathematik"})," (5. Aufl.)."]})]})}function kn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Ue,{...r})}):Ue(r)}const zn={sections:[{id:"5.1",key:"grundlagen",title:"Numerische lineare Algebra: Grundlagen",C:V(Te)},{id:"5.2",key:"lgs",title:"Lineare Gleichungssysteme",C:V(en)},{id:"5.3",key:"lu",title:"Die LU-Zerlegung",C:V(on)},{id:"5.4",key:"cholesky",title:"Die Cholesky-Zerlegung",C:V(pn)},{id:"5.5",key:"zusammenfassung",title:"Zusammenfassung",C:V(fn)},{id:"5.6",key:"uebungen",title:"Übungsempfehlungen",C:V(kn)}]};export{zn as default};
