import{j as e,C as j,M as i,a as f,E as D,Q as G,i as M,g as Ne,r as S,A as O,q as J,k as ue,F as B,V as F,z as je,S as q,G as X,Z as Pe,b as ie,h as We,L as Ue,P as ne,n as R,y as Ie,m as V}from"./index-GbyLwDE5.js";import{E as C,I as K}from"./Interaktiv-DHZUUTxv.js";function pe(r){const n={a:"a",em:"em",h3:"h3",li:"li",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Ab hier geht es um ",e.jsx(n.em,{children:"numerische lineare Algebra"}),`. Sie fragt, wie sich die
Objekte und Operationen der linearen Algebra auf dem Rechner tatsächlich
berechnen lassen, und zwar schnell und verlässlich. Auf dem Programm stehen
numerische Methoden für`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"die Matrizenrechnung (Addition, Multiplikation),"}),`
`,e.jsxs(n.li,{children:[e.jsx(j,{id:"linear-system",children:"lineare Gleichungssysteme"}),` (der Kern dieses Kapitels,
ab `,e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"}),"),"]}),`
`,e.jsxs(n.li,{children:["Kleinste-Quadrate-Probleme (",e.jsx(n.a,{href:"?k=07-kq",children:"Kapitel 7"}),"),"]}),`
`,e.jsxs(n.li,{children:[e.jsx(j,{id:"eigenvalue-eigenvector",children:"Eigenwertprobleme"})," und mehr."]}),`
`]}),`
`,e.jsxs(n.p,{children:[`Dabei achten wir bei jeder Methode auf dieselben zwei Gütekriterien, die wir
in den letzten Kapiteln aufgebaut haben: auf die
`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Kondition"}),` (wie stark verstärken sich kleine Fehler?)
und auf die `,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Komplexität"}),` (wie wächst der Aufwand mit
der Problemgröße?).`]}),`
`,e.jsx(n.h3,{children:"Was wir mitbringen"}),`
`,e.jsx(n.p,{children:"Dieses Kapitel führt die Fäden der bisherigen Kapitel zusammen. Wir brauchen:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["aus Kapitel 2 den ",e.jsx(n.a,{href:"?k=02-algos#sec-2.1",children:"Algorithmus-Begriff"}),`, insbesondere
`,e.jsx(n.em,{children:"direkte Methoden"}),` (endlich viele Schritte, exakte Lösung in exakter
Arithmetik) und die `,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Komplexitätsanalyse"}),` mit
Landau-Symbolen,`]}),`
`,e.jsxs(n.li,{children:["aus Kapitel 4 die ",e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Kondition"}),` von Problemen und die
`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Stabilität"})," von Algorithmen,"]}),`
`,e.jsxs(n.li,{children:["aus Kapitel 3 die ",e.jsx(n.a,{href:"?k=03-matrix-spur-norm#sec-3.2",children:"Matrixnormen"}),` und die
`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Orthogonalmatrizen"}),` mit ihrer perfekten
Kondition `,e.jsx(i,{children:"\\corange{\\kappa_2(\\bQ)} = 1"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:[`Dazu kommt Grundwissen aus der Linearen Algebra I: das Lösen linearer
Gleichungssysteme mit grundlegenden Methoden,
`,e.jsx(j,{id:"triangular-matrix",children:"Dreiecksmatrizen"}),`,
`,e.jsx(j,{id:"symmetric-matrix",children:"symmetrische"}),` und
`,e.jsx(j,{id:"positive-definite",children:"positiv definite Matrizen"}),` sowie die
`,e.jsx(j,{id:"matrix-inverse",children:"Matrixinverse"}),`. Über Letztere lernen wir in diesem
Kapitel vor allem eines: dass wir sie numerisch `,e.jsx(n.em,{children:"nicht"})," berechnen."]}),`
`,e.jsx(n.h3,{children:"Matrizenrechnung"}),`
`,e.jsxs(n.p,{children:[`Beginnen wir mit den Grundoperationen. Ihre algorithmische Berechnung folgt
für gewöhnlich direkt den mathematischen Formeln. Für die Addition von
`,e.jsx(i,{children:"\\bA, \\bB \\in \\R^{n \\times m}"})," heißt das"]}),`
`,e.jsx(f,{children:`\\bA + \\bB = \\begin{pmatrix}
a_{11} + b_{11} & \\cdots & a_{1m} + b_{1m} \\\\
\\vdots          &        & \\vdots          \\\\
a_{n1} + b_{n1} & \\cdots & a_{nm} + b_{nm}
\\end{pmatrix},`}),`
`,e.jsxs(n.p,{children:["und für die ",e.jsx(j,{id:"matrix-multiplication",children:"Matrixmultiplikation"}),` von
`,e.jsx(i,{children:"\\bA \\in \\R^{n \\times m}"})," mit ",e.jsx(i,{children:"\\bB \\in \\R^{m \\times k}"})]}),`
`,e.jsx(f,{children:`\\bA\\bB = \\begin{pmatrix}
\\sum_{i = 1}^m a_{1i} b_{i1} & \\cdots & \\sum_{i = 1}^m a_{1i} b_{ik} \\\\
\\vdots                       &        & \\vdots                       \\\\
\\sum_{i = 1}^m a_{ni} b_{i1} & \\cdots & \\sum_{i = 1}^m a_{ni} b_{ik}
\\end{pmatrix}.`}),`
`,e.jsxs(n.p,{children:["Jeder Eintrag des Produkts ist also ein ",e.jsx(j,{id:"dot-product",children:"Skalarprodukt"}),`
einer Zeile von `,e.jsx(i,{children:"\\bA"})," mit einer Spalte von ",e.jsx(i,{children:"\\bB"}),"."]}),`
`,e.jsx(D,{kind:"Bemerkung",label:"5.1.1 (Kondition der Grundoperationen)",id:"env-kondition-der-grundoperationen",children:e.jsxs(n.p,{children:[`Wie gut oder schlecht Matrixaddition und -multiplikation konditioniert sind,
untersuchen wir in der Übung. Das Handwerkszeug dafür steht in
`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Kapitel 4"}),"."]})}),`
`,e.jsxs(n.p,{children:[`Die Komplexität der beiden Formeln können wir dagegen sofort bestimmen,
indem wir Operationen zählen wie in `,e.jsx(n.a,{href:"?k=02-algos#sec-2.3",children:"Kapitel 2"}),`.
Prüfen wir uns zuerst selbst.`]}),`
`,e.jsxs(n.p,{children:["Was ist die algorithmische Komplexität der ",e.jsx(n.em,{children:"Addition"}),` von
`,e.jsx(i,{children:"\\bA, \\bB \\in \\R^{n \\times m}"}),"? Zur Auswahl stehen ",e.jsx(i,{children:"O(nm)"}),", ",e.jsx(i,{children:"O(n + m)"}),` und
`,e.jsx(i,{children:"O(n^2 m^2)"}),"."]}),`
`,e.jsxs(G,{children:[e.jsxs(M,{wahr:!0,children:[e.jsxs(n.p,{children:["Die Addition gelingt in ",e.jsx(i,{children:"O(nm)"}),` Operationen, und schneller geht es
größenordnungsmäßig auch nicht.`]}),e.jsxs(n.p,{children:["Das Ergebnis hat ",e.jsx(i,{children:"nm"}),` Einträge, und jeder Eintrag kostet genau eine
Addition `,e.jsx(i,{children:"a_{ij} + b_{ij}"}),": zusammen ",e.jsx(i,{children:"nm"})," Additionen, also ",e.jsx(i,{children:"O(nm)"}),`. Weniger
ist nicht drin, denn allein das Hinschreiben der `,e.jsx(i,{children:"nm"}),` Ergebniseinträge
braucht schon `,e.jsx(i,{children:"nm"})," Schritte."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Addition gelingt sogar in ",e.jsx(i,{children:"O(n + m)"})," Operationen."]}),e.jsxs(n.p,{children:[e.jsx(i,{children:"n + m"})," ist viel kleiner als ",e.jsx(i,{children:"nm"})," (für ",e.jsx(i,{children:"n = m = 100"})," etwa ",e.jsx(i,{children:"200"}),` gegen
`,e.jsx(i,{children:"10\\,000"}),"). Ein Algorithmus mit nur ",e.jsx(i,{children:"O(n+m)"}),` Schritten könnte nicht einmal
alle Ergebniseinträge schreiben.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Der Aufwand wächst wie ",e.jsx(i,{children:"n^2 m^2"}),", weil jeder Eintrag von ",e.jsx(i,{children:"\\bA"}),` mit jedem
Eintrag von `,e.jsx(i,{children:"\\bB"})," verrechnet werden muss."]}),e.jsxs(n.p,{children:["Die Begründung stimmt nicht: Addiert wird nur ",e.jsx(n.em,{children:"paarweise"}),` an gleicher
Position `,e.jsx(i,{children:"(i,j)"}),`, kein Eintrag trifft je einen anderen. Als reine obere
Schranke wäre `,e.jsx(i,{children:"O(n^2m^2)"}),` zwar formal korrekt (Landau-Symbole schließen
Überschätzung nicht aus, vgl. `,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Kapitel 2"}),`), aber als
Beschreibung des Wachstums grob falsch; die scharfe Ordnung ist `,e.jsx(i,{children:"nm"}),"."]})]})]}),`
`,e.jsxs(n.p,{children:["Und die ",e.jsx(n.em,{children:"Multiplikation"})," von ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times m}"}),` mit
`,e.jsx(i,{children:"\\bB \\in \\R^{m \\times k}"}),"? Zur Auswahl stehen ",e.jsx(i,{children:"O(nk)"}),", ",e.jsx(i,{children:"O(nmk)"}),` und
`,e.jsx(i,{children:"O(nm + k)"}),"."]}),`
`,e.jsxs(G,{children:[e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Multiplikation kostet ",e.jsx(i,{children:"O(nk)"})," Operationen, denn das Produkt hat ",e.jsx(i,{children:"nk"}),`
Einträge.`]}),e.jsxs(n.p,{children:[e.jsx(i,{children:"nk"}),` zählt nur die Ergebniseinträge. Jeder einzelne ist aber ein
Skalarprodukt der Länge `,e.jsx(i,{children:"m"})," und kostet selbst ",e.jsx(i,{children:"m"}),` Multiplikationen und
`,e.jsx(i,{children:"m - 1"})," Additionen; der Faktor ",e.jsx(i,{children:"m"})," fehlt."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(n.p,{children:["Die Multiplikation nach der Produktformel kostet ",e.jsx(i,{children:"O(nmk)"})," Operationen."]}),e.jsxs(n.p,{children:["Für jede der ",e.jsx(i,{children:"n \\cdot k"})," Kombinationen aus Zeile und Spalte fallen ",e.jsx(i,{children:"m"}),`
Multiplikationen und `,e.jsx(i,{children:"m - 1"}),` Additionen an, insgesamt also
`,e.jsx(i,{children:"nk\\,(2m - 1) = O(nmk)"}),` Operationen. Für quadratische Matrizen
(`,e.jsx(i,{children:"n = m = k"}),") ist das der bekannte ",e.jsx(i,{children:"O(n^3)"}),"-Aufwand."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Es reichen ",e.jsx(i,{children:"O(nm + k)"})," Operationen."]}),e.jsxs(n.p,{children:["Für ",e.jsx(i,{children:"n = m = k"})," wüchse ",e.jsx(i,{children:"nm + k = n^2 + n"}),` nur quadratisch, die Produktformel
braucht aber kubischen Aufwand `,e.jsx(i,{children:"n^3"}),". Die Summe ",e.jsx(i,{children:"nm + k"}),` unterschätzt den
Aufwand also drastisch, sobald die Dimensionen wachsen.`]})]})]}),`
`,e.jsxs(C,{title:"Schnellere Matrixmultiplikation",children:[e.jsx(n.h3,{children:"Geht Matrixmultiplikation schneller?"}),e.jsxs(n.p,{children:[`Erstaunlicherweise ja, zumindest auf dem Papier. Für das Produkt zweier
quadratischer Matrizen `,e.jsx(i,{children:"\\bA, \\bB \\in \\R^{n \\times n}"}),` gibt es Algorithmen
mit besserer Komplexität als `,e.jsx(i,{children:"O(n^3)"}),`. Der erste stammt von Strassen (1969):
Er zerlegt beide Matrizen in vier Blöcke und kommt mit sieben statt acht
Blockmultiplikationen aus. Rekursiv angewandt kostet das
`,e.jsx(i,{children:"O\\bigl(n^{\\log_2 7}\\bigr)"})," Operationen, also etwa ",e.jsx(i,{children:"O(n^{2{,}8})"}),`, denn
`,e.jsx(i,{children:"\\log_2 7 \\approx 2{,}807"}),`. Seither wurde der Exponent in kleinen Schritten
weiter gedrückt; der aktuelle Rekord liegt bei etwa `,e.jsx(i,{children:"O(n^{2{,}37})"}),`
(Alman et al., 2024), und wesentlich Besseres ist bislang nicht bekannt.
Die Suche nach neuen Multiplikationsschemata geht weiter. 2022 hat etwa
DeepMinds AlphaTensor per Reinforcement Learning bisher unbekannte
Varianten für kleine Matrixformate gefunden.`]}),e.jsx(D,{kind:"Bemerkung",label:"5.1.2 (Warum wir trotzdem mit O(nmk) rechnen)",id:"env-warum-wir-trotzdem-mit-o-nmk-rechnen",children:e.jsxs(n.p,{children:[`Die Landau-Notation versteckt konstante Faktoren, und bei den schnellen
Multiplikationsalgorithmen sind diese Konstanten meist so groß, dass sich
die bessere Ordnung erst bei riesigen Matrizen auszahlen würde. In der
Praxis werden die Verfahren deshalb kaum verwendet. Wir rechnen in diesem
Skript der Einfachheit halber immer mit `,e.jsx(i,{children:"O(nmk)"}),` für die Multiplikation
und `,e.jsx(i,{children:"O(nm)"})," für die Addition."]})})]}),`
`,e.jsxs(n.p,{children:["Damit ist der Rahmen gesteckt. Ab dem ",e.jsx(n.a,{href:"#sec-5.2",children:"nächsten Abschnitt"}),` wenden
wir uns dem wichtigsten Problem der numerischen linearen Algebra zu: dem
Lösen von `,e.jsx(i,{children:"\\bA\\bx = \\bb"}),"."]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.1 (der Einstieg in Heath Kap. 2, das lineare
Gleichungssysteme behandelt); zur Komplexitätsanalyse Heath §1.1.`})})]})}function qe(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(pe,{...r})}):pe(r)}function z(r){if(Number.isNaN(r))return"NaN";if(!Number.isFinite(r))return r>0?"∞":"−∞";let n=Math.round(r*1e3)/1e3;return Object.is(n,-0)&&(n=0),Ne(n,3)}const Ke=["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉"],_=r=>Ke[r]??String(r);function W({m:r,cellClass:n,cellStyle:t}){return e.jsx("div",{className:"inline-grid gap-px self-start rounded border-x-2 border-slate-500 px-1.5 py-1",style:{gridTemplateColumns:`repeat(${r[0].length}, minmax(2.3rem, auto))`},children:r.map((x,d)=>x.map((a,u)=>e.jsx("div",{className:`rounded px-1 py-0.5 text-center font-mono text-xs ${a===null?"text-slate-400":""} ${(n==null?void 0:n(d,u))??""}`,style:t==null?void 0:t(d,u),children:a===null?"·":z(a)},`${d}-${u}`)))})}function U({label:r,children:n}){return e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("span",{className:"text-xs font-medium",style:{color:"var(--w-muted)"},children:r}),n]})}function be(r,n){const t=r.length,x=new Array(t).fill(null),d=[];for(let a=t-1;a>=0;a--){if(Math.abs(r[a][a])<1e-12)return{x,lines:d,failRow:a};let u=n[a],s="";for(let b=a+1;b<t;b++)u-=r[a][b]*x[b],s+=` − (${z(r[a][b])})·(${z(x[b])})`;x[a]=u/r[a][a],d.push(`x${_(a+1)} = (${z(n[a])}${s}) / (${z(r[a][a])}) = ${z(x[a])}`)}return{x,lines:d,failRow:-1}}const{blau:Oe,gruen:ke,rot:$e}=B;function Ge(){const[r,n]=S.useState([[2,1,-1],[0,3,2],[0,0,2]]),[t,x]=S.useState([[3],[7],[4]]),[d,a]=S.useState(0),u=3,s=t.map(c=>c[0]),b=S.useMemo(()=>be(r,s),[r,t]),l=b.lines.length,h=Math.min(d,l),o=u-h,v=o-1,E=r.map((c,g)=>[...c,s[g]]),L=(c,g)=>g===u?"ml-1 border-l border-slate-400 pl-1":"",m=(c,g)=>{if(c>=o)return{background:ke+"26"};if(c===v&&h<l)return g===c?{background:$e+"33",fontWeight:600}:{background:Oe+"26"}},p=b.x.map((c,g)=>[g>=o?c:null]),w=(c,g)=>c>=o?{color:ke,fontWeight:600}:void 0;return e.jsxs("div",{children:[e.jsx(O,{children:"Schieben wir den Regler bis zur letzten Zeile und verfolgen die Divisionen."}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["U =",e.jsx(J,{value:r,onChange:c=>{n(c.map((g,N)=>g.map((A,y)=>y<N?0:A))),a(0)}})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["c =",e.jsx(J,{value:t,onChange:c=>{x(c),a(0)}})]})]}),e.jsx(ue,{step:h,setStep:a,max:l,narration:`${h} von ${u} Komponenten bekannt`}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-5",children:[e.jsx(U,{label:"U | c",children:e.jsx(W,{m:E,cellClass:L,cellStyle:m})}),e.jsx(U,{label:"x",children:e.jsx(W,{m:p,cellStyle:w})}),e.jsxs("div",{className:"grow",children:[h>0&&e.jsx("div",{className:"rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800",children:b.lines.slice(0,h).map(c=>e.jsx("div",{children:c},c))}),b.failRow>=0&&h>=l&&e.jsxs(F,{kind:"fail",className:"mt-2",children:["Schritt ",b.failRow+1," bleibt stecken: Das Diagonalelement dieser Zeile ist 0, und Formel (",je("eq:gauss-elimination-mit-partieller"),") verlangt, genau dadurch zu teilen. Bei einer Dreiecksmatrix entscheidet allein die Diagonale über die Invertierbarkeit; mit einer Null dort verliert das System seine eindeutige Lösung."]}),b.failRow<0&&h===l&&l>0&&e.jsxs(F,{kind:"ok",className:"mt-2",children:["Alle Komponenten stehen. Formel (",je("eq:gauss-elimination-mit-partieller"),") benötigt hier drei Divisionen; allgemein summieren sich Multiplikationen, Subtraktionen und Divisionen zu n² Operationen, also O(n²)."]})]})]})]})}function fe(r,n){const t=r.map(s=>s.slice()),x=n.map(s=>s.slice()),d=t.length,a=x[0].length;for(let s=0;s<d;s++){let b=s;for(let l=s+1;l<d;l++)Math.abs(t[l][s])>Math.abs(t[b][s])&&(b=l);[t[s],t[b]]=[t[b],t[s]],[x[s],x[b]]=[x[b],x[s]];for(let l=s+1;l<d;l++){const h=t[l][s]/t[s][s];t[l][s]=0;for(let o=s+1;o<d;o++)t[l][o]-=h*t[s][o];for(let o=0;o<a;o++)x[l][o]-=h*x[s][o]}}const u=Array.from({length:d},()=>Array(a).fill(0));for(let s=d-1;s>=0;s--)for(let b=0;b<a;b++){let l=x[s][b];for(let h=s+1;h<d;h++)l-=t[s][h]*u[h][b];u[s][b]=l/t[s][s]}return u}function Ce(r){const n=Array.from({length:r},(l,h)=>Array.from({length:r},(o,v)=>1/(h+v+1))),t=n.map(l=>[l.reduce((h,o)=>h+o,0)]),x=Array.from({length:r},(l,h)=>Array.from({length:r},(o,v)=>+(h===v))),d=fe(n,t).map(l=>l[0]),a=fe(n,x),u=a.map(l=>l.reduce((h,o,v)=>h+o*t[v][0],0)),s=l=>Math.max(...l.map(h=>Math.abs(h-1))),b=l=>Math.max(...l.map(h=>h.reduce((o,v)=>o+Math.abs(v),0)));return{kappa:b(n)*b(a),direct:s(d),viaInverse:s(u)}}function Ve(r){return r.toExponential(2).replace(".",",").replace("e+","e").replace("e-","e−")}function re({label:r,value:n,color:t}){return e.jsxs("div",{className:"rounded border border-slate-200 p-3 dark:border-slate-700",children:[e.jsx("div",{className:"text-xs",style:{color:"var(--w-muted)"},children:r}),e.jsx("div",{className:"font-mono text-lg tabular-nums",style:{color:t},children:Ve(n)})]})}function Te(){const[r,n]=S.useState(11),t=S.useMemo(()=>Ce(r),[r]),x=t.viaInverse/t.direct;return e.jsxs("div",{children:[e.jsx(O,{children:"Verkleinern wir die Ordnung und beobachten, ab wann Rundungsfehler die beiden Rechenwege sichtbar trennen."}),e.jsx(q,{label:"Ordnung n",value:r,onChange:n,min:2,max:11,step:1,marks:[2,5,8,11]}),e.jsxs("div",{className:"my-3 grid gap-2 sm:grid-cols-3",children:[e.jsx(re,{label:"κ∞(Hₙ)",value:t.kappa}),e.jsx(re,{label:"relativer Fehler, direkt",value:t.direct,color:B.gruen}),e.jsx(re,{label:"relativer Fehler, über Inverse",value:t.viaInverse,color:B.rot})]}),e.jsx(F,{kind:r>=9?"warn":"neutral",children:r>=9?`Die Matrix ist in dieser Arithmetik stark empfindlich. Der Inversenweg hat hier den ${x.toFixed(1).replace(".",",")}-fachen relativen Fehler des direkten Lösens.`:"Beide Fehler sind noch klein. Der Inversenweg gewinnt aber keine Genauigkeit; einzelne Rundungseffekte lassen das Fehlerverhältnis nicht monoton wachsen."})]})}function ve(r){const n={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h3,{children:"Problemstellung"}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.a,{href:"#sec-5.1",children:"Abschnitt 5.1"}),` haben wir gezählt, was Matrixaddition und
Matrixmultiplikation kosten. Jetzt setzen wir diese Bausteine zu der Aufgabe
zusammen, die in der Statistik ständig auftritt: Wir beschäftigen uns mit der
Lösung eines `,e.jsx(j,{id:"linear-system",children:"linearen Gleichungssystems"}),` (LGS). Gesucht
ist also der Vektor `,e.jsx(i,{children:"\\bx"})," mit"]}),`
`,e.jsx(f,{children:"\\bA \\bx = \\bb ."}),`
`,e.jsxs(n.p,{children:["Ob Kleinste-Quadrate-Schätzer (",e.jsx(n.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),`) oder
gemischtes Modell: am Ende steht fast immer ein solches System.`]}),`
`,e.jsxs(n.p,{children:[`Die Aufgabe ist nur dann sinnvoll gestellt, wenn es genau eine Lösung gibt.
Wir nehmen deshalb in diesem Kapitel an, dass `,e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"}),`
quadratisch und `,e.jsx(j,{id:"matrix-inverse",children:"invertierbar"}),` ist. Auf dem Papier ist
damit alles erledigt: Die Lösung lässt sich als `,e.jsx(i,{children:"\\bx = \\bA^{-1}\\bb"}),`
schreiben. Vorsicht: Diese Formel ist eine Schreibweise, kein Rechenweg.`]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"5.2.1 (Für ein LGS keine explizite Inverse bilden)",id:"env-fuer-ein-lgs-keine-explizite-inverse",children:[e.jsxs(n.p,{children:["Wer nur ",e.jsx(i,{children:"\\bA\\bx=\\bb"})," lösen will, sollte die Inverse nicht explizit bilden:"]}),e.jsx(n.p,{children:e.jsx(n.strong,{children:"Löse das System direkt."})}),e.jsxs(n.p,{children:["Warum ist die Formel ",e.jsx(i,{children:"\\bx = \\bA^{-1}\\bb"})," als Algorithmus so schlecht?"]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Aufwand:"})," ",e.jsx(i,{children:"\\bA^{-1}"})," explizit auszurechnen heißt, die ",e.jsx(i,{children:"n"}),` Systeme
`,e.jsx(i,{children:"\\bA \\bz_j = \\be_j"})," für alle Einheitsvektoren ",e.jsx(i,{children:"\\be_j"}),` zu lösen und
anschließend noch das Produkt `,e.jsx(i,{children:"\\bA^{-1}\\bb"})," zu bilden. Wer nur ",e.jsx(i,{children:"\\bx"}),`
braucht, erledigt also `,e.jsx(i,{children:"n"}),` Lösungen statt einer. In der
`,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Größenordnung"}),` bleibt das zwar beim Aufwand einer
einzigen Elimination, weil sich deren teure Vorarbeit für alle `,e.jsx(i,{children:"n"}),` rechten
Seiten wiederverwenden lässt; in der versteckten Konstanten kostet der
Umweg aber ein Mehrfaches.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Genauigkeit:"}),` Das explizite Invertieren muss nicht in jedem Fall scheitern.
Bei einer schlecht konditionierten Matrix können die zusätzlichen Rundungen
der Inversenbildung und des anschließenden Matrix-Vektor-Produkts den Fehler
aber deutlich vergrößern. Für eine einzelne rechte Seite gibt es keinen
Genauigkeitsvorteil.
Gauß-Elimination `,e.jsx(n.em,{children:"mit partieller Pivotierung"}),` ist in der Praxis meist
rückwärtsstabil und vermeidet diesen Umweg. Wie genau die Lösung sein kann,
begrenzt in beiden Fällen die Konditionszahl `,e.jsx(i,{children:"\\corange{\\kappa(\\bA)}"}),`
(`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),` und
`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]}),`
`]}),e.jsxs(n.p,{children:[`Explizite Inversen haben legitime Anwendungen, wenn die Inverse selbst das gesuchte
Objekt ist. Die Warnung bezieht sich auf das unnötige Bilden von `,e.jsx(i,{children:"\\bA^{-1}"}),` zum Lösen
eines Systems.`]}),e.jsxs(n.p,{children:["Wo immer in einer Formel ",e.jsx(i,{children:"\\bA^{-1}\\bb"}),` steht, lösen wir in der
Implementierung stattdessen das LGS `,e.jsx(i,{children:"\\bA\\bx = \\bb"}),"."]})]}),`
`,e.jsx(C,{title:"Ein empfindliches Zahlenbeispiel zur expliziten Inversen",children:e.jsxs(D,{kind:"Beispiel",label:"5.2.2 (Hilbert-Matrix: Inverse gegen direktes Lösen)",id:"env-hilbert-matrix-inverse-vs-loesen",children:[e.jsxs(n.p,{children:["Betrachten wir die Hilbert-Matrix ",e.jsx(i,{children:"\\bH_n"}),` mit Einträgen
`,e.jsx(i,{children:"h_{ij} = 1/(i+j-1)"}),` und wählen die exakte Lösung
`,e.jsx(i,{children:"\\bx = (1,\\ldots,1)^\\top"}),". Dann ist ",e.jsx(i,{children:"\\bb = \\bH_n\\bx"})," bekannt."]}),e.jsxs(n.p,{children:["Für ",e.jsx(i,{children:"n=11"}),` haben wir beide Wege in JavaScript mit derselben einfachen
Gauß-Elimination mit partieller Pivotierung nachgerechnet. Beim direkten
Lösen erhalten wir den relativen Fehler
`,e.jsx(i,{children:`\\|\\widehat{\\bx}-\\bx\\|_\\infty/\\|\\bx\\|_\\infty
\\approx 9{,}66\\cdot 10^{-3}`}),`. Bilden wir zuerst die explizite Inverse, steigt
er auf etwa `,e.jsx(i,{children:"3{,}73\\cdot 10^{-1}"}),`. Der Umweg ist in dieser Rechnung also
rund `,e.jsx(i,{children:"38{,}6"}),`-mal ungenauer. Die konkreten Werte hängen von Algorithmus,
Reihenfolge der Operationen und Gleitkommaarithmetik ab. Sie sind keine
allgemeinen Fehlerschranken. In dieser Rechnung fügt das explizite
Invertieren einen empfindlichen Rechenweg hinzu.`]}),e.jsxs(n.p,{children:["Der R-Code des Beispiels verwendet ",e.jsx(n.code,{children:"solve(A, b)"}),` zum direkten Lösen und
`,e.jsx(n.code,{children:"solve(A) %*% b"})," für den Umweg über die Inverse:"]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-r",children:`n <- 11 # Hilbert-Matrix
A <- outer(1:n, 1:n,
           function(i, j) 1 / (i + j - 1))
x <- rep(1, n)
b <- A %*% x

range((solve(A) %*% b) - x) # Fehler über Inverse
range(solve(A, b) - x)      # Fehler direkte Lösung
`})}),e.jsxs(K,{title:"Kondition und Rechenweg",children:[e.jsx(Te,{}),e.jsx(n.p,{children:`Der Regler zeigt dieselbe Rechnung für mehrere Ordnungen. Die
Konditionszahl erklärt die grundsätzliche Empfindlichkeit; der Vergleich der
beiden Fehler isoliert den zusätzlichen Preis des Inversenwegs in der hier
verwendeten Arithmetik.`})]})]})}),`
`,e.jsx(n.h3,{children:"Gauß-Elimination und Rückwärtssubstitution"}),`
`,e.jsxs(n.p,{children:[`Wie lösen wir stattdessen? Wir erinnern uns an das
`,e.jsx(j,{id:"gaussian-elimination",children:"Gauß'sche Eliminationsverfahren"}),` aus der linearen
Algebra. Es besteht aus zwei Phasen:`]}),`
`,e.jsx(D,{kind:"Algorithmus",label:"5.2.3 (Gauß-Elimination mit partieller Pivotierung)",id:"env-gauss-elimination-mit-partieller",children:e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Wähle in Eliminationsschritt ",e.jsx(i,{children:"k"})," unter den Zeilen ",e.jsx(i,{children:"k,\\ldots,n"}),` einen
Eintrag mit maximalem Betrag in Spalte `,e.jsx(i,{children:"k"}),` und tausche seine Zeile nach oben.
Eliminiere anschließend die Einträge darunter. So entsteht aus
`,e.jsx(i,{children:"(\\bA \\mid \\bb)"})," eine Zeilenstufenform ",e.jsx(i,{children:"(\\bU \\mid \\bc)"}),` mit oberer
`,e.jsx(j,{id:"triangular-matrix",children:"Dreiecksmatrix"})," ",e.jsx(i,{children:"\\bU"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Löse das gestaffelte System"}),`
`,e.jsx(f,{children:`\\begin{array}{ccccccccc}
u_{11} x_1 & + & u_{12} x_2 & + & \\dots  & + & u_{1n} x_n & = & c_1    \\\\
           &   & u_{22} x_2 & + & \\dots  & + & u_{2n} x_n & = & c_2    \\\\
           &   &            &   & \\ddots &   & \\vdots     &   & \\vdots \\\\
           &   &            &   &        &   & u_{nn} x_n & = & c_n
\\end{array}`}),`
`,e.jsxs(n.p,{children:["durch ",e.jsx(n.em,{children:"Rückwärtssubstitution"})," (backward substitution):"]}),`
`,e.jsx(X,{tag:"5.2.1",id:"eq-gauss-elimination-mit-partieller",children:"x_{n} = c_n / u_{nn}, \\quad x_{i} = \\biggl(c_{i} - \\sum_{j = i + 1}^n u_{ij} x_j\\biggr) / u_{ii} \\quad (i \\le n - 1)."}),`
`]}),`
`]})}),`
`,e.jsxs(n.p,{children:["Die letzte Gleichung des gestaffelten Systems enthält nur noch ",e.jsx(i,{children:"x_n"}),` und
verrät diesen Wert sofort. Danach arbeiten wir uns Zeile für Zeile nach
oben. Im Farbcode dieses Kapitels: Ist Zeile `,e.jsx(i,{children:"i"}),` an der Reihe (blau), sind
die Komponenten aus den Zeilen darunter schon bekannt (grün). Die Zeile
setzt sie ein und teilt zum Schluss durch ihr Diagonalelement, das Pivot
(rot):`]}),`
`,e.jsx(f,{children:"\\cblue{x_i} = \\Bigl(c_i - \\sum_{j = i + 1}^n u_{ij} \\, \\cgreen{x_j}\\Bigr) \\Big/ \\cred{u_{ii}} ."}),`
`,e.jsxs(n.p,{children:[`Mit partieller Pivotierung garantiert die Invertierbarkeit in jedem Schritt ein
von null verschiedenes Pivot; `,e.jsx(n.em,{children:"ohne"}),` Zeilentausch reicht sie nicht, denn ein
Nullpivot kann trotzdem auftreten (`,e.jsx(n.a,{href:"#env-invertierbar-aber-keine-lu-zerlegung",children:"Beispiel 5.3.6"}),`).
Auch ein sehr kleines Pivot ist in Gleitkommaarithmetik gefährlich – deshalb wählen
wir den größten verfügbaren Betrag.`]}),`
`,e.jsxs(K,{title:"Rückwärtseinsetzen Schritt für Schritt",children:[e.jsxs(n.p,{children:["Die Formel ",e.jsx(n.a,{href:"#eq-gauss-elimination-mit-partieller",children:"(5.2.1)"}),` bestimmt die Komponenten von unten nach oben. Wie viele
Divisionen braucht das voreingestellte 3×3-System?`]}),e.jsx(Ge,{}),e.jsxs(n.p,{children:[`Wie teuer ist die zweite Phase? Prüfen wir die vier Antwortmöglichkeiten
einzeln (`,e.jsx(j,{id:"big-o-notation",children:"Landau-Notation"}),` zur Erinnerung in
`,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),")."]}),e.jsxs(G,{children:[e.jsxs(Pe,{loesung:3,toleranz:0,children:[e.jsx(n.p,{children:"Wie viele Divisionen hat das voreingestellte Rückwärtseinsetzen im Widget?"}),e.jsx(n.p,{children:"Eine pro Diagonalzeile, also drei."})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Rückwärtssubstitution für ein ",e.jsx(i,{children:"n \\times n"}),"-System hat die Komplexität ",e.jsx(i,{children:"O(1)"}),"."]}),e.jsxs(n.p,{children:["Konstanter Aufwand ist unmöglich: Schon um jeden Eintrag von ",e.jsx(i,{children:"\\bU"}),` einmal
anzufassen, braucht es mit `,e.jsx(i,{children:"n"})," wachsende Arbeit."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Rückwärtssubstitution für ein ",e.jsx(i,{children:"n \\times n"}),"-System hat die Komplexität ",e.jsx(i,{children:"O(n)"}),", denn sie besteht aus ",e.jsx(i,{children:"n"})," Schritten."]}),e.jsxs(n.p,{children:[`Die Schrittzahl stimmt, aber die Schritte sind nicht konstant teuer:
Schritt `,e.jsx(i,{children:"i"})," setzt die ",e.jsx(i,{children:"n - i"}),` schon bekannten Komponenten ein, im
ungünstigsten Fall also `,e.jsx(i,{children:"n - 1"})," Stück."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(n.p,{children:["Die Rückwärtssubstitution für ein ",e.jsx(i,{children:"n \\times n"}),"-System hat die Komplexität ",e.jsx(i,{children:"O(n^2)"}),"."]}),e.jsxs(n.p,{children:["Es sind ",e.jsx(i,{children:"n"})," Schritte, und Schritt ",e.jsx(i,{children:"i"})," kostet nach Formel ",e.jsx(n.a,{href:"#eq-gauss-elimination-mit-partieller",children:"(5.2.1)"}),` je
`,e.jsx(i,{children:"n - i"}),` Multiplikationen und ebenso viele Subtraktionen, dazu eine Division;
im ungünstigsten Fall sind das `,e.jsx(i,{children:"n - 1"}),` Multiplikationen pro Schritt.
Aufsummiert ergibt das `,e.jsx(i,{children:"n(n-1)/2 \\approx n^2/2"}),` Multiplikationen und
insgesamt genau `,e.jsx(i,{children:"n^2"})," Rechenoperationen: die Größenordnung ist ",e.jsx(i,{children:"O(n^2)"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Rückwärtssubstitution für ein ",e.jsx(i,{children:"n \\times n"}),"-System hat die Komplexität ",e.jsx(i,{children:"O(n^3)"}),"."]}),e.jsxs(n.p,{children:["Das überschätzt den Aufwand um einen Faktor ",e.jsx(i,{children:"n"}),". (Formal enthält ",e.jsx(i,{children:"O(n^3)"}),`
zwar auch alle `,e.jsx(i,{children:"O(n^2)"}),`-Algorithmen, gemeint ist hier aber die
Größenordnung des tatsächlichen Aufwands, und die ist `,e.jsx(i,{children:"n^2"}),".) Bei ",e.jsx(i,{children:"O(n^3)"}),`
liegt erst die Eliminationsphase selbst, wie wir in
`,e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"})," sehen werden."]})]})]})]}),`
`,e.jsx(n.h3,{children:"Warum Matrixzerlegungen?"}),`
`,e.jsxs(n.p,{children:[`Die Gauß-Elimination löst unser LGS. In den nächsten Abschnitten
organisieren wir sie neu, nämlich als `,e.jsx(n.em,{children:"Matrixzerlegung"}),` (matrix
decomposition). Die Grundidee ist „Teile und herrsche" für Matrizen:
Statt direkt mit `,e.jsx(i,{children:"\\bA"})," zu arbeiten, schreiben wir ",e.jsx(i,{children:"\\bA = \\bB\\bC"}),` mit
„einfachen" Faktoren `,e.jsx(i,{children:"\\bB"})," und ",e.jsx(i,{children:"\\bC"}),"."]}),`
`,e.jsxs(n.p,{children:[`Eine Analogie aus der Zahlenwelt ist die Primfaktorzerlegung. Es gilt
`,e.jsx(i,{children:"84 = 2^2 \\cdot 3 \\cdot 7"}),`, und wer diese Zerlegung einmal kennt, rechnet
bequemer weiter:`]}),`
`,e.jsx(f,{children:"84 \\cdot 126 = (2^2 \\cdot 3 \\cdot 7) \\cdot (2 \\cdot 3^2 \\cdot 7) = 2^3 \\cdot 3^3 \\cdot 7^2 ."}),`
`,e.jsx(n.p,{children:`Die Faktoren machen die Struktur der Zahl sichtbar, und Multiplizieren
schrumpft zum Addieren von Exponenten. Dasselbe wollen wir für Matrizen:
Faktoren finden, an denen sich billig rechnen lässt. Drei Familien haben
sich als „einfach" bewährt:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(j,{id:"triangular-matrix",children:"Dreiecksmatrizen"}),`: Ein Dreieckssystem lösen wir
per Vorwärts- bzw. Rückwärtssubstitution in `,e.jsx(i,{children:"O(n^2)"})," statt ",e.jsx(i,{children:"O(n^3)"}),`,
wie eben gesehen.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(j,{id:"orthogonal-matrix",children:"Orthogonale Matrizen"}),`: Sie verstärken Störungen in der
`,e.jsx(i,{children:"2"}),`-Norm nicht und sind trivial zu invertieren wegen
`,e.jsx(i,{children:"\\bQ^{-1} = \\bQ^\\top"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(j,{id:"diagonal-matrix",children:"Diagonalmatrizen"}),`: Invertieren, Multiplizieren und
Potenzieren laufen elementweise auf der Diagonalen, alle Operationen
sind trivial.`]}),`
`]}),`
`,e.jsx(n.p,{children:"Was bringt uns eine Zerlegung konkret? Vier Dinge:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mehrere LGS mit derselben Matrix effizient lösen."}),` Die Zerlegung
bezahlen wir einmal; danach kostet jedes weitere System
`,e.jsx(i,{children:"\\bA\\bx = \\bb_i"}),` mit neuer rechter Seite nur noch die billigen
Dreiecks- oder Diagonallösungen. In der Statistik ist das der
Normalfall, etwa wenn dieselbe Modellmatrix auf viele Zielvariablen
trifft.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Numerische Stabilität verbessern."}),` Wer die Arbeit in gut
konditionierte Teilschritte zerlegt, etwa über orthogonale Faktoren,
vermeidet unnötige Fehlerverstärkung
(`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Abschnitt 4.3"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Struktur und Eigenschaften von ",e.jsx(i,{children:"\\bA"})," erkennen."]}),` An den Faktoren
lässt sich ablesen, ob `,e.jsx(i,{children:"\\bA"}),` (fast) singulär oder
`,e.jsx(j,{id:"positive-definite",children:"positiv definit"}),` ist; solche Diagnosen fallen
bei der Zerlegung gratis mit ab.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grundlage für weitere Algorithmen."}),` Auf Zerlegungen bauen viele
Verfahren auf, von der QR-Zerlegung für das KQ-Problem
(`,e.jsx(n.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),`) bis zur Spektralzerlegung und der
`,e.jsx(j,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"})," (",e.jsx(n.em,{children:"SVD"}),`), die
uns in einem späteren Kapitel begegnet.`]}),`
`]}),`
`,e.jsxs(n.p,{children:[`Den Anfang macht im nächsten Abschnitt die
`,e.jsx(n.a,{href:"#sec-5.3",children:"LU-Zerlegung"}),`: Sie ist nichts anderes als die Gauß-Elimination,
klug verbucht.`]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.1–2.2 (Problemstellung und Lösbarkeit) sowie §2.4.2
(Dreieckssysteme und Rückwärtssubstitution).`})})]})}function He(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(ve,{...r})}):ve(r)}const{rot:se,blau:T,gruen:H}=B;function Je(r){return r.map(n=>[...n])}function Xe(r,n){const t=r.length,x=r.map(l=>[...l]),d=[...n],a=r.map((l,h)=>r.map((o,v)=>h===v?1:h<v?0:null)),u=[],s=(l,h,o,v)=>u.push({phase:l,k:h,W:x.map(E=>[...E]),bw:[...d],L:Je(a),Lk:o,lines:v});s("init",-1,null,[]);for(let l=0;l<t-1;l++){const h=x[l][l];if(Math.abs(h)<1e-12)return s("fail",l,null,[`m${_(l+1)}${_(l+1)} = 0  ⇒  Abbruch in Spalte ${l+1}`]),u;const o=[],v=r.map((m,p)=>r.map((w,c)=>p===c?1:0)),E=[];for(let m=l+1;m<t;m++)o[m]=x[m][l]/h,v[m][l]=-o[m],a[m][l]=o[m],E.push(`l${_(m+1)}${_(l+1)} = m${_(m+1)}${_(l+1)}/m${_(l+1)}${_(l+1)} = ${z(x[m][l])}/${z(h)} = ${z(o[m])}`);s("mult",l,v,E);const L=[];for(let m=l+1;m<t;m++){for(let p=l;p<t;p++)x[m][p]-=o[m]*x[l][p];x[m][l]=0,d[m]-=o[m]*d[l],L.push(`Zeile ${m+1} ← Zeile ${m+1} − (${z(o[m])}) · Zeile ${l+1}   (ebenso b${_(m+1)} ← b${_(m+1)} − (${z(o[m])}) · b${_(l+1)})`)}s("apply",l,v,L)}const{lines:b}=be(x,d);return s("done",-1,null,b),u}function Qe(){const[r,n]=S.useState([[2,1,-1],[4,-6,0],[-2,7,2]]),[t,x]=S.useState([[5],[-2],[9]]),[d,a]=S.useState(0),u=S.useMemo(()=>Xe(r,t.map(c=>c[0])),[r,t]),s=u[Math.min(d,u.length-1)],b=r.length,l=u.length-1,h=s.W.map((c,g)=>[...c,s.bw[g]]),o=(c,g)=>g===b?"ml-1 border-l border-slate-400 pl-1":"",v=(c,g)=>{if(s.phase==="mult"){if(c===s.k&&g===s.k)return{background:se+"33",fontWeight:600};if(g===s.k&&c>s.k)return{background:T+"26"}}if(s.phase==="apply"){if(g===s.k&&c>s.k)return{background:H+"26",fontWeight:600};if(c>s.k&&g>=s.k)return{background:T+"1a"}}if(s.phase==="fail"&&c===s.k&&g===s.k)return{background:se+"33",fontWeight:600}},E=(c,g)=>s.phase==="mult"&&g===s.k&&c>s.k?{color:H,fontWeight:600}:void 0,L=(c,g)=>g===s.k&&c>s.k?{color:T,fontWeight:600}:void 0,m=S.useMemo(()=>s.phase==="done"?be(s.W,s.bw):null,[s]),p=S.useMemo(()=>{if(s.phase!=="done")return null;let c=0;for(let g=0;g<b;g++)for(let N=0;N<b;N++){let A=0;for(let y=0;y<b;y++)A+=(s.L[g][y]??0)*(y<=N?s.W[y][N]:0);c=Math.max(c,Math.abs(A-r[g][N]))}return c},[s,r,b]),w={init:e.jsxs(e.Fragment,{children:["Startzustand. Rechts vom Strich steht die rechte Seite, die jede Zeilenoperation mitmacht. Von ",e.jsx("span",{className:"font-mono",children:"L"})," kennen wir bisher nur das Gerüst aus Einsen und Nullen; auf den Punkten darunter landen gleich die Multiplikatoren, einer pro eliminiertem Eintrag."]}),mult:e.jsxs(e.Fragment,{children:["Spalte ",s.k+1,", erste Hälfte. Auf der Diagonalen sitzt das Pivot (",e.jsx("span",{style:{color:se,fontWeight:600},children:"rot"}),"); darunter stehen die Einträge, die weg sollen (",e.jsx("span",{style:{color:T,fontWeight:600},children:"blau"}),"). Jeder von ihnen geteilt durch das Pivot ergibt seinen Multiplikator, und den notieren wir uns an derselben Stelle in ",e.jsx("span",{className:"font-mono",children:"L"})," ","(",e.jsx("span",{style:{color:H,fontWeight:600},children:"grün"}),"). In"," ",e.jsxs("span",{className:"font-mono",children:["L",_(s.k+1)]})," steht derselbe Wert negativ, denn diese Matrix zieht ab, was ",e.jsx("span",{className:"font-mono",children:"L"})," aufbewahrt."]}),apply:e.jsxs(e.Fragment,{children:["Zweite Hälfte: Von jeder Zeile unterhalb des Pivots ziehen wir die mit ihrem Multiplikator skalierte Pivotzeile ab. In Spalte ",s.k+1," liefert das die gewünschte Null (",e.jsx("span",{style:{color:H,fontWeight:600},children:"grün"}),"), weiter rechts neue Werte in der Zeile und in der rechten Seite (",e.jsx("span",{style:{color:T,fontWeight:600},children:"blau"}),"). Die Zeilen oberhalb des Pivots bleiben, wie sie sind."]}),fail:e.jsxs(e.Fragment,{children:["Auf dem Pivotplatz steht eine Null. Ein Multiplikator wäre hier nur mit einer Division durch null zu haben, also endet die Elimination an dieser Stelle. Invertierbar darf die Matrix dabei durchaus sein (",ie("beispiel:invertierbar-aber-keine-lu-zerlegung"),"); wer weiterrechnen will, tauscht zuerst Zeilen."]}),done:e.jsxs(e.Fragment,{children:["Unterhalb der Diagonalen ist nichts mehr übrig: Die Arbeitsmatrix ist das gesuchte"," ",e.jsx("span",{className:"font-mono",children:"U"}),". Dieselben Operationen haben aus"," ",e.jsx("span",{className:"font-mono",children:"b"})," den Vektor ",e.jsx("span",{className:"font-mono",children:"y"})," ","gemacht, den auch die Vorwärtssubstitution mit"," ",e.jsx("span",{className:"font-mono",children:"L"})," geliefert hätte. Bleibt der letzte Schritt: rückwärts durch ",e.jsx("span",{className:"font-mono",children:"Ux = y"}),"."]})};return e.jsxs("div",{children:[e.jsx(O,{children:"Schieben wir durch die Phasen und vergleichen jede neue Null mit dem Eintrag in L."}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["A =",e.jsx(J,{value:r,onChange:c=>{n(c),a(0)},step:1})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["b =",e.jsx(J,{value:t,onChange:c=>{x(c),a(0)},step:1})]})]}),e.jsx(ue,{step:Math.min(d,l),setStep:a,max:l,narration:`Phase ${Math.min(d,l)+1} von ${l+1}`}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-5",children:[e.jsx(U,{label:s.phase==="done"?"U | y  (fertig)":"Arbeitsmatrix | b",children:e.jsx(W,{m:h,cellClass:o,cellStyle:v})}),s.Lk&&s.phase==="mult"&&e.jsx(U,{label:`L${_(s.k+1)} (Eliminationsmatrix)`,children:e.jsx(W,{m:s.Lk,cellStyle:L})}),e.jsx(U,{label:"L (Multiplikatoren)",children:e.jsx(W,{m:s.L,cellStyle:E})})]}),e.jsx(F,{kind:s.phase==="fail"?"fail":s.phase==="done"?"ok":"neutral",children:w[s.phase]}),s.lines.length>0&&e.jsx("div",{className:"mt-2 rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800",children:s.lines.map(c=>e.jsx("div",{children:c},c))}),s.phase==="done"&&m&&e.jsx(F,{kind:m.failRow>=0?"fail":"ok",className:"mt-2",children:m.failRow>=0?e.jsxs(e.Fragment,{children:["In Zeile ",m.failRow+1," von ",e.jsx("span",{className:"font-mono",children:"U"})," steht eine Null auf der Diagonalen. Dividieren lässt sich dort nicht, und das liegt nicht am Verfahren: Diese Matrix ist singulär."]}):e.jsxs(e.Fragment,{children:["Lösung:"," ",e.jsxs("span",{className:"font-mono",style:{color:H,fontWeight:600},children:["x = (",m.x.map(c=>z(c)).join("; "),")"]}),". Probe der Zerlegung: max |A − L·U| ="," ",e.jsx("span",{className:"font-mono",children:z(p??0)}),"."]})})]})}const{rot:Ye,gruen:en}=B;function te(r){if(Number.isNaN(r))return"NaN";if(!Number.isFinite(r))return r>0?"∞":"−∞";if(r===0)return"0";const n=Math.abs(r);return n>=1e5||n<.001?r.toExponential(1).replace("-","−").replace(".",","):Ne(Number(r.toPrecision(4)),4)}function nn(){const[r,n]=S.useState(-8),t=Math.pow(10,r),x=1/t,d=1-x,a=1+t,u=2,s=(u-x*a)/d,b=(a-s)/t,l=(a-t*u)/(1-t),h=u-l,o=Math.abs(b-1)+Math.abs(s-1),v=Math.abs(h-1)+Math.abs(l-1),E=d===-x,L=(m,p,w,c)=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:m}),e.jsx("td",{className:"pr-3 text-right font-mono tabular-nums",children:te(p)}),e.jsx("td",{className:"pr-3 text-right font-mono tabular-nums",children:te(w)}),e.jsx("td",{className:"text-right font-mono tabular-nums",style:c<1e-4?{color:en}:{color:Ye,fontWeight:600},children:c===0?"0":c.toExponential(2).replace(".",",")})]});return e.jsxs("div",{className:"text-sm",children:[e.jsx(O,{children:"Schieben wir ε nach unten und vergleichen die beiden Fehlerzeilen."}),e.jsxs("p",{className:"mb-2",children:["Testsystem ist"," ",e.jsx(i,{children:"\\begin{pmatrix} \\cred{\\epsilon} & 1 \\\\ 1 & 1 \\end{pmatrix} \\bx = \\begin{pmatrix} 1+\\epsilon \\\\ 2 \\end{pmatrix}"})," ","mit der Lösung ",e.jsx(i,{children:"\\bx = (1, 1)^\\top"}),", die wir von Hand ablesen können. Beide Tabellenzeilen rechnen denselben Weg in float64 nach (",e.jsx(i,{children:"\\eps_{\\text{mach}} \\approx 2{,}2 \\cdot 10^{-16}"}),"), einmal mit"," ",e.jsx(i,{children:"\\cred{\\epsilon}"})," als Pivot und Multiplikator ",e.jsx(i,{children:"1/\\epsilon"}),", einmal nach Zeilentausch mit Pivot 1 und Multiplikator ",e.jsx(i,{children:"\\epsilon"}),". Jede Abweichung von 1 in der Tabelle ist also reiner Rundungsfehler."]}),e.jsx(q,{label:"log₁₀ ε",value:r,onChange:n,min:-18,max:-1,step:1,fmt:m=>`ε = 1e${m}`}),e.jsxs("table",{className:"mt-2",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-left text-xs",style:{color:"var(--w-muted)"},children:[e.jsx("th",{className:"pr-3 font-medium",children:"Strategie"}),e.jsx("th",{className:"pr-3 text-right font-medium",children:"x₁"}),e.jsx("th",{className:"pr-3 text-right font-medium",children:"x₂"}),e.jsx("th",{className:"text-right font-medium",children:"Fehler (1-Norm)"})]})}),e.jsxs("tbody",{children:[L("ohne Zeilentausch (Pivot ε)",b,s,o),L("mit Zeilentausch (Pivot 1)",h,l,v)]})]}),e.jsxs(F,{kind:E?"fail":o<1e-4?"ok":"warn",className:"mt-2",children:["Gerechnet wird dabei ",e.jsx(i,{children:"u_{22} = \\text{fl}(1 - 1/\\epsilon) ="})," ",e.jsx("span",{className:"font-mono",children:te(d)}),E?e.jsx("span",{className:"ml-1",children:", exakt −1/ε: Die Subtraktion hat die 1 restlos geschluckt. In der Zerlegung steckt der Eintrag a₂₂ = 1 damit gar nicht mehr, und L·U reproduziert A nicht."}):e.jsxs("span",{className:"ml-1",children:[". Der Eintrag a₂₂ = 1 hat die Subtraktion überstanden, ganz oder in Teilen: Im schlechteren Lösungseintrag stimmen noch rund"," ",Math.max(0,Math.round(-Math.log10(Math.max(o,1e-17))))," Stellen."]})]})]})}const{gruen:le,rot:de}=B,ae=500,Q=(r,n)=>r*r*r/3+n*r*r,Y=(r,n)=>n*(r*r*r/3+r*r);function we(r){if(!Number.isFinite(r))return"∞";if(r>=1e5){const n=Math.floor(Math.log10(r)),t=r/Math.pow(10,n);return e.jsxs(e.Fragment,{children:[t.toFixed(1).replace(".",",")," · 10",e.jsx("sup",{children:n})]})}return Math.round(r).toLocaleString("de-DE")}function rn(){const[r,n]=S.useState(100),[t,x]=S.useState(50),d=Q(r,t),a=Y(r,t),u=a/d,{series:s,yDomain:b}=S.useMemo(()=>{const l=[{f:v=>v>=1?Math.log10(Q(r,v)):NaN,color:le},{f:v=>v>=1?Math.log10(Y(r,v)):NaN,color:de}],h=Math.log10(Q(r,1)),o=Math.log10(Y(r,ae));return{series:l,yDomain:[h-.4,o+.3]}},[r]);return e.jsx(We,{frage:"Bei wie vielen rechten Seiten lohnt sich das einmalige Zerlegen?",loesung:2,toleranz:.5,min:1,max:10,schritt:1,children:e.jsxs("div",{className:"text-sm",children:[e.jsx(O,{children:"Vergleichen wir die beiden Kostenkurven bei verschiedenen Werten von J."}),e.jsxs("div",{className:"max-w-md",children:[e.jsx(q,{label:"n",value:r,onChange:l=>n(Math.round(l)),min:10,max:1e3,step:10,fmt:l=>String(l)}),e.jsx(q,{label:"J",value:t,onChange:l=>x(Math.round(l)),min:1,max:ae,step:1,fmt:l=>String(l)})]}),e.jsxs("div",{className:"mt-2 flex flex-wrap items-start gap-6",children:[e.jsx(Ue,{xLabel:"J (rechte Seiten)",yLabel:"log₁₀ Multiplikationen",series:s,xDomain:[1,ae],yDomain:b,width:360,height:240,markers:[{x:t,y:Math.log10(Q(r,t)),color:le},{x:t,y:Math.log10(Y(r,t)),color:de}]}),e.jsxs("div",{className:"max-w-xs space-y-1",children:[e.jsxs("p",{className:"font-mono text-xs",children:["n = ",r,", J = ",t]}),e.jsxs("p",{className:"font-mono text-xs",style:{color:le},children:["zerlegen + substituieren: ",we(d)]}),e.jsxs("p",{className:"font-mono text-xs",style:{color:de},children:["jedes Mal neu: ",we(a)]}),e.jsxs("p",{className:"font-mono text-xs",children:["Ersparnisfaktor: ",u.toFixed(1).replace(".",","),"×"]}),e.jsxs(F,{kind:"neutral",children:["Bei J = ",t," beträgt die Ersparnis aktuell ",u.toFixed(1).replace(".",","),"×; die Auflösung ordnet den Schwellenwert ein."]})]})]})]})})}function ze(r){const n={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h3,{children:"Elimination als Zerlegung"}),`
`,e.jsxs(n.p,{children:["Die Gauß-Elimination aus ",e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"})," verwandelt ",e.jsx(i,{children:"(\\bA \\mid \\bb)"}),`
durch Zeilenoperationen in ein gestaffeltes System. In diesem Abschnitt
wechseln wir den Blickwinkel: Die Elimination rechnet nicht nur ein konkretes
System um, sie zerlegt die Matrix selbst. Alles, was wir dabei tun, lässt
sich in zwei Faktoren verbuchen:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bL"})," (",e.jsx(n.em,{children:"lower"}),") speichert sämtliche Eliminationsschritte,"]}),`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bU"})," (",e.jsx(n.em,{children:"upper"}),") ist die entstehende obere ",e.jsx(j,{id:"triangular-matrix",children:"Dreiecksmatrix"}),"."]}),`
`]}),`
`,e.jsxs(D,{kind:"Definition",label:"5.3.1 (LU-Zerlegung)",id:"env-lu-zerlegung",children:[e.jsx(n.p,{children:"Eine Darstellung"}),e.jsx(f,{children:"\\bA = \\bL\\bU"}),e.jsxs(n.p,{children:["von ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," mit einer unteren Dreiecksmatrix ",e.jsx(i,{children:"\\bL"}),` mit
Einsen auf der Diagonalen und einer oberen Dreiecksmatrix `,e.jsx(i,{children:"\\bU"}),` heißt
`,e.jsx(n.em,{children:"LU-Zerlegung"})," (LU decomposition) von ",e.jsx(i,{children:"\\bA"}),"."]})]}),`
`,e.jsxs(n.p,{children:["Warum lohnt sich diese Buchführung? Sobald wir ",e.jsx(i,{children:"\\bA = \\bL\\bU"}),` einmal
berechnet haben, können wir `,e.jsx(i,{children:"\\bA\\bx = \\bb_i"})," für ",e.jsx(n.em,{children:"jedes"})," ",e.jsx(i,{children:"\\bb_i"}),` billig
lösen, denn beide Faktoren sind Dreiecksmatrizen:`]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"5.3.2 (Merkregel: ein LGS, zwei Dreieckssysteme)",id:"env-merkregel-ein-lgs-zwei-dreieckssysteme",children:[e.jsx(n.p,{children:"Aus der Zerlegung wird ein zweistufiger Lösungsweg:"}),e.jsx(f,{children:`\\bA\\bx = \\bb
\\quad\\Longrightarrow\\quad
\\bL\\,\\underbrace{\\bU\\bx}_{=\\,\\by} = \\bb ,`}),e.jsx(n.p,{children:"wir lösen also nacheinander zwei gestaffelte Systeme:"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bL\\by = \\bb"})," durch ",e.jsx(j,{id:"triangular-solve",children:"Vorwärtssubstitution"}),`
(forward substitution), von oben nach unten;`]}),`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bU\\bx = \\by"}),` durch Rückwärtssubstitution
(`,e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"}),"), von unten nach oben."]}),`
`]}),e.jsxs(n.p,{children:["Beide Teilschritte kosten nur ",e.jsx(i,{children:"O(n^2)"})," Operationen."]})]}),`
`,e.jsx(n.h3,{children:"Eliminationsmatrizen"}),`
`,e.jsxs(n.p,{children:[`Wie sehen die Faktoren aus? Wir gehen die Elimination noch einmal durch,
diesmal in Matrixsprache. Von links nach rechts arbeiten wir uns durch die
Spalten und entfernen alle Einträge unter der Diagonalen. Nennen wir das
aktuelle System `,e.jsx(i,{children:"(\\bM \\mid \\br)"}),". Die ",e.jsx(i,{children:"k"}),`-te Spalte räumen wir, indem wir von
links mit der `,e.jsx(n.em,{children:"Eliminationsmatrix"})," ",e.jsx(i,{children:"\\bL_k"})," multiplizieren:"]}),`
`,e.jsx(X,{tag:"5.3.1",id:"eq-eq-5-3-1",children:`\\bL_k = \\begin{pmatrix}
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
abgeräumt; ein `,e.jsx(i,{children:"n"}),"-ter Schritt wäre arbeitslos, denn unterhalb von ",e.jsx(i,{children:"m_{nn}"}),`
steht kein Eintrag mehr (`,e.jsx(i,{children:"\\bL_n"})," wäre schlicht die Einheitsmatrix)."]}),`
`,e.jsxs(D,{kind:"Satz",label:"5.3.3 (Die Gauß-Elimination liefert eine LU-Zerlegung)",id:"env-die-gauss-elimination-liefert-eine-lu",children:[e.jsxs(n.p,{children:["Läuft die Gauß-Elimination für ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"}),` ohne Nullpivot
durch, so ist`]}),e.jsx(f,{children:"\\bU = \\bL_{n-1} \\cdots \\bL_1 \\bA"}),e.jsxs(n.p,{children:["eine obere Dreiecksmatrix, und es gilt ",e.jsx(i,{children:"\\bA = \\bL\\bU"})," mit"]}),e.jsx(X,{tag:"5.3.2",id:"eq-die-gauss-elimination-liefert-eine-lu",children:`\\bL = \\bL_1^{-1} \\cdots \\bL_{n-1}^{-1} =
\\begin{pmatrix}
1               &                 &        &                     &   \\\\
\\cgreen{l_{21}} & 1               &        &                     &   \\\\
\\cgreen{l_{31}} & \\cgreen{l_{32}} & 1      &                     &   \\\\
\\vdots          &                 & \\ddots & \\ddots              &   \\\\
\\cgreen{l_{n1}} & \\cdots          & \\cdots & \\cgreen{l_{n(n-1)}} & 1
\\end{pmatrix} .`}),e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bL"}),` ist also eine untere Dreiecksmatrix mit Einsen auf der Diagonalen, und
unter der Diagonalen stehen unverändert die Multiplikatoren
`,e.jsx(i,{children:"\\cgreen{l_{ik}}"})," aus der Elimination."]})]}),`
`,e.jsxs(C,{title:"Die Eliminationsmatrizen sauber zusammenrechnen",children:[e.jsxs(n.p,{children:["Der Beweis rechnet mit einer kompakten Schreibweise für ",e.jsx(i,{children:"\\bL_k"}),`; die
eigentliche Arbeit steckt darin, dass sich die Inversen ohne jede
Nebenwirkung aufeinanderstapeln.`]}),e.jsxs(ne,{children:[e.jsx(R,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"\\bl_k \\be_k^\\top"})," ist die Matrix, die in Spalte ",e.jsx(i,{children:"k"})," unterhalb der Diagonalen die Einträge ",e.jsx(i,{children:"l_{ik}"})," trägt und sonst nur Nullen; abgezogen von ",e.jsx(i,{children:"\\bI"})," ergibt das die Gestalt aus ",e.jsx(n.a,{href:"#eq-eq-5-3-1",children:"(5.3.1)"})]}),children:e.jsxs(n.p,{children:["Wir schreiben ",e.jsx(i,{children:"\\bL_k"})," kompakt als ",e.jsx(i,{children:"\\bL_k = \\bI - \\bl_k \\be_k^\\top"}),`, wobei
`,e.jsx(i,{children:"\\be_k"})," der ",e.jsx(i,{children:"k"}),`-te Einheitsvektor ist und
`,e.jsx(i,{children:"\\bl_k = (0, \\dots, 0, \\cblue{l_{(k+1)k}}, \\dots, \\cblue{l_{nk}})^\\top"}),` die
Multiplikatoren der `,e.jsx(i,{children:"k"}),"-ten Spalte sammelt; die ersten ",e.jsx(i,{children:"k"}),` Komponenten von
`,e.jsx(i,{children:"\\bl_k"})," sind null."]})}),e.jsx(R,{why:e.jsxs(e.Fragment,{children:["Ausmultiplizieren: ",e.jsx(i,{children:"(\\bI - \\bl_k \\be_k^\\top)(\\bI + \\bl_k \\be_k^\\top) = \\bI - \\bl_k (\\be_k^\\top \\bl_k) \\be_k^\\top = \\bI"}),", denn ",e.jsx(i,{children:"\\be_k^\\top \\bl_k"})," ist die ",e.jsx(i,{children:"k"}),"-te Komponente von ",e.jsx(i,{children:"\\bl_k"}),", und die ist null"]}),children:e.jsxs(n.p,{children:["Es gilt ",e.jsx(i,{children:"\\bL_k^{-1} = \\bI + \\bl_k \\be_k^\\top"}),`: Die Inverse macht die
Zeilenoperationen rückgängig, indem sie die abgezogenen Vielfachen wieder
addiert. Nur die Vorzeichen der Multiplikatoren kippen.`]})}),e.jsxs(R,{why:e.jsxs(e.Fragment,{children:["Beim Ausmultiplizieren verschwinden alle gemischten Terme: Sie enthalten Faktoren der Form ",e.jsx(i,{children:"\\be_j^\\top \\bl_k"})," mit ",e.jsx(i,{children:"j < k"}),", und die ",e.jsx(i,{children:"j"}),"-te Komponente von ",e.jsx(i,{children:"\\bl_k"})," ist für ",e.jsx(i,{children:"j \\le k"})," null"]}),children:[e.jsx(n.p,{children:"Für das Produkt der Inversen gilt"}),e.jsx(f,{children:`\\bL
= (\\bI + \\bl_1 \\be_1^\\top) \\cdots (\\bI + \\bl_{n-1} \\be_{n-1}^\\top)
= \\bI + \\sum_{k=1}^{n-1} \\bl_k \\be_k^\\top ,`}),e.jsxs(n.p,{children:["und die rechte Seite ist die Matrix aus ",e.jsx(n.a,{href:"#eq-die-gauss-elimination-liefert-eine-lu",children:"(5.3.2)"}),`: Einsen auf der
Diagonalen, darunter die Multiplikatoren, jeder an seinem Platz.`]})]}),e.jsx(R,{why:e.jsxs(e.Fragment,{children:["wir multiplizieren von links nacheinander mit ",e.jsx(i,{children:"\\bL_{n-1}^{-1}, \\dots, \\bL_1^{-1}"}),"; diese Inversen existieren nach Schritt 2"]}),children:e.jsxs(n.p,{children:["Insbesondere ist ",e.jsx(i,{children:"\\bL"}),` als Summe der Einheitsmatrix und von Beiträgen
unterhalb der Diagonalen eine untere Dreiecksmatrix mit Einsen auf der
Diagonalen. Auflösen von `,e.jsx(i,{children:"\\bU = \\bL_{n-1} \\cdots \\bL_1 \\bA"})," nach ",e.jsx(i,{children:"\\bA"}),`
ergibt schließlich `,e.jsx(i,{children:"\\bA = \\bL_1^{-1} \\cdots \\bL_{n-1}^{-1} \\bU = \\bL\\bU"}),"."]})})]})]}),`
`,e.jsxs(n.p,{children:[`Die Eliminationsmatrizen treffen bei der klassischen Elimination auch die rechte
Seite: Aus `,e.jsx(i,{children:"\\bb"})," wird ",e.jsx(i,{children:"\\bc = \\bL_{n-1} \\cdots \\bL_1 \\bb"}),`, das gestaffelte
Endsystem ist `,e.jsx(i,{children:"(\\bU \\mid \\bc)"}),". Mit gespeichertem ",e.jsx(i,{children:"\\bL"}),` dürfen wir uns
dieses Mitschleppen sparen, denn die Vorwärtssubstitution `,e.jsx(i,{children:"\\bL\\by = \\bb"}),`
liefert später denselben Vektor: `,e.jsx(i,{children:"\\by = \\bL^{-1}\\bb = \\bc"}),"."]}),`
`,e.jsx(n.h3,{children:"Ein vollständiges Beispiel"}),`
`,e.jsxs(n.p,{children:[`Rechnen wir das einmal komplett durch, im Farbcode dieses Kapitels: Pivots
rot, Multiplikatoren blau, fertige `,e.jsx(i,{children:"\\bL"}),"-Einträge grün."]}),`
`,e.jsxs(D,{kind:"Beispiel",label:"5.3.4 (LU-Zerlegung einer 3×3-Matrix)",id:"env-lu-zerlegung-einer-3-3-matrix",children:[e.jsx(n.p,{children:"Sei"}),e.jsx(f,{children:"\\bA = \\begin{pmatrix} 2 & 1 & -1 \\\\ 4 & -6 & 0 \\\\ -2 & 7 & 2 \\end{pmatrix} ."}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Schritt 1:"})," Spalte 1 räumen. Das Pivot ist ",e.jsx(i,{children:"\\cred{m_{11}} = \\cred{2}"}),`,
die Multiplikatoren nach Formel `,e.jsx(n.a,{href:"#eq-eq-5-3-1",children:"(5.3.1)"})," sind"]}),e.jsx(f,{children:`\\cblue{l_{21}} = \\frac{4}{\\cred{2}} = \\cblue{2} ,
\\qquad
\\cblue{l_{31}} = \\frac{-2}{\\cred{2}} = \\cblue{-1} .`}),e.jsx(n.p,{children:"Damit ist"}),e.jsx(f,{children:`\\bL_1 = \\begin{pmatrix} 1 & 0 & 0 \\\\ \\cblue{-2} & 1 & 0 \\\\ \\cblue{1} & 0 & 1 \\end{pmatrix},
\\qquad
\\bL_1 \\bA = \\begin{pmatrix} 2 & 1 & -1 \\\\ 0 & -8 & 2 \\\\ 0 & 8 & 1 \\end{pmatrix} .`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Schritt 2:"})," Spalte 2 räumen. Das Pivot ist jetzt ",e.jsx(i,{children:"\\cred{-8}"}),", und mit"]}),e.jsx(f,{children:`\\cblue{l_{32}} = \\frac{8}{\\cred{-8}} = \\cblue{-1} ,
\\qquad
\\bL_2 = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & \\cblue{1} & 1 \\end{pmatrix}`}),e.jsx(n.p,{children:"erreichen wir die Dreiecksform:"}),e.jsx(f,{children:"\\bL_2 \\bL_1 \\bA = \\begin{pmatrix} 2 & 1 & -1 \\\\ 0 & -8 & 2 \\\\ 0 & 0 & 3 \\end{pmatrix} = \\bU ."}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Ergebnis:"}),` Die Multiplikatoren wandern mit ihrem ursprünglichen
Vorzeichen nach `,e.jsx(i,{children:"\\bL"}),":"]}),e.jsx(f,{children:`\\bL = \\bL_1^{-1} \\bL_2^{-1}
= \\begin{pmatrix} 1 & 0 & 0 \\\\ \\cgreen{2} & 1 & 0 \\\\ \\cgreen{-1} & \\cgreen{-1} & 1 \\end{pmatrix},
\\qquad
\\bU = \\begin{pmatrix} 2 & 1 & -1 \\\\ 0 & -8 & 2 \\\\ 0 & 0 & 3 \\end{pmatrix} .`}),e.jsxs(n.p,{children:["Die Probe ",e.jsx(i,{children:"\\bL\\bU = \\bA"})," geht auf (nachrechnen!)."]})]}),`
`,e.jsx(n.h3,{children:"Wann existiert die Zerlegung?"}),`
`,e.jsxs(n.p,{children:[`Die Konstruktion hat eine Schwachstelle: In jedem Schritt teilen wir durch
das Pivot `,e.jsx(i,{children:"\\cred{m_{kk}}"}),`. Steht dort eine Null, bricht die Elimination ab,
und zwar auch dann, wenn `,e.jsx(i,{children:"\\bA"})," ",e.jsx(j,{id:"matrix-inverse",children:"invertierbar"}),` ist.
Invertierbarkeit allein garantiert also noch keine LU-Zerlegung; sie
garantiert nur, dass sich das Problem durch Zeilentausch beheben lässt.`]}),`
`,e.jsxs(D,{kind:"Satz",label:"5.3.5 (Existenz der LU-Zerlegung)",id:"env-existenz-der-lu-zerlegung",children:[e.jsxs(n.p,{children:["Sei ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," invertierbar. Dann gilt:"]}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Die LU-Zerlegung ",e.jsx(i,{children:"\\bA = \\bL\\bU"})," aus ",e.jsx(n.a,{href:"#env-lu-zerlegung",children:"Definition 5.3.1"}),` existiert genau
dann, wenn die Gauß-Elimination an `,e.jsx(i,{children:"\\bA"}),` ohne Nullpivot durchläuft. In
diesem Fall ist sie eindeutig.`]}),`
`,e.jsxs(n.li,{children:["Es gibt stets eine ",e.jsx(j,{id:"permutation-matrix",children:"Permutationsmatrix"})," ",e.jsx(i,{children:"\\bP"}),`
(sie vertauscht Zeilen), sodass die Elimination an `,e.jsx(i,{children:"\\bP\\bA"}),` ohne
Nullpivot durchläuft; es gilt dann `,e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),"."]}),`
`]})]}),`
`,e.jsxs(n.p,{children:["Die Richtung „kein Nullpivot ",e.jsx(i,{children:"\\Rightarrow"}),` Zerlegung existiert" ist
`,e.jsx(n.a,{href:"#env-die-gauss-elimination-liefert-eine-lu",children:"Satz 5.3.3"}),`; auf die übrigen Beweisteile verzichten wir. Wichtiger ist ein
Warnbeispiel, das zeigt, dass die Bedingung in Teil 1 keine leere
Vorsichtsmaßnahme ist:`]}),`
`,e.jsxs(D,{kind:"Beispiel",label:"5.3.6 (Invertierbar, aber keine LU-Zerlegung)",id:"env-invertierbar-aber-keine-lu-zerlegung",children:[e.jsx(n.p,{children:"Die Vertauschungsmatrix"}),e.jsx(f,{children:"\\bA = \\begin{pmatrix} \\cred{0} & 1 \\\\ 1 & 0 \\end{pmatrix}"}),e.jsxs(n.p,{children:["ist invertierbar (",e.jsx(i,{children:"\\det \\bA = -1"}),`). Trotzdem scheitert die Elimination
sofort, denn das erste Pivot ist `,e.jsx(i,{children:"\\cred{m_{11}} = \\cred{0}"}),`. Auch keine
andere Konstruktion hilft: Der Ansatz`]}),e.jsx(f,{children:`\\bL\\bU
= \\begin{pmatrix} 1 & 0 \\\\ l & 1 \\end{pmatrix}
  \\begin{pmatrix} u_{11} & u_{12} \\\\ 0 & u_{22} \\end{pmatrix}
= \\begin{pmatrix} u_{11} & u_{12} \\\\ l\\, u_{11} & l\\, u_{12} + u_{22} \\end{pmatrix}`}),e.jsxs(n.p,{children:["erzwingt ",e.jsx(i,{children:"u_{11} = 0"}),` aus dem Eintrag links oben und zugleich
`,e.jsx(i,{children:"l\\, u_{11} = 1"})," aus dem Eintrag links unten: ein Widerspruch."]}),e.jsxs(n.p,{children:["Ein Zeilentausch löst das Problem dagegen sofort auf, denn mit ",e.jsx(i,{children:"\\bP = \\bA"}),`
ist `,e.jsx(i,{children:"\\bP\\bA = \\bI = \\bI \\cdot \\bI"}),` eine (zugegeben langweilige)
LU-Zerlegung.`]})]}),`
`,e.jsx(n.h3,{children:"Lösen mit der LU-Zerlegung"}),`
`,e.jsxs(n.p,{children:["Angenommen, wir haben eine Faktorisierung ",e.jsx(i,{children:"\\bA = \\bL\\bU"}),` gefunden. Die
Merkregel aus `,e.jsx(n.a,{href:"#env-merkregel-ein-lgs-zwei-dreieckssysteme",children:"Bemerkung 5.3.2"})," wird jetzt zum Algorithmus:"]}),`
`,e.jsx(D,{kind:"Algorithmus",label:"5.3.7 (Lösen von Ax = b mit der LU-Zerlegung)",id:"env-loesen-von-ax-b-mit-der-lu-zerlegung",children:e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Vorwärtssubstitution:"})," Löse ",e.jsx(i,{children:"\\bL\\by = \\bb"})," von oben nach unten,"]}),`
`,e.jsx(f,{children:`\\cgreen{y_i} = b_i - \\sum_{j=1}^{i-1} l_{ij}\\, \\cgreen{y_j}
\\qquad (i = 1, \\dots, n) ;`}),`
`,e.jsxs(n.p,{children:["eine Division ist nicht nötig, denn auf der Diagonalen von ",e.jsx(i,{children:"\\bL"}),` stehen
Einsen.`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Rückwärtssubstitution:"})," Löse ",e.jsx(i,{children:"\\bU\\bx = \\by"}),` von unten nach oben wie in
Formel `,e.jsx(n.a,{href:"#eq-gauss-elimination-mit-partieller",children:"(5.2.1)"}),","]}),`
`,e.jsx(f,{children:`\\cgreen{x_i} = \\Bigl(y_i - \\sum_{j=i+1}^{n} u_{ij}\\, \\cgreen{x_j}\\Bigr) \\Big/ \\cred{u_{ii}}
\\qquad (i = n, \\dots, 1) .`}),`
`]}),`
`]})}),`
`,e.jsxs(D,{kind:"Beispiel",label:"5.3.8 (Fortsetzung: Lösen mit der Zerlegung)",id:"env-fortsetzung-loesen-mit-der-zerlegung",children:[e.jsxs(n.p,{children:["Wir nehmen ",e.jsx(i,{children:"\\bL"})," und ",e.jsx(i,{children:"\\bU"})," aus ",e.jsx(n.a,{href:"#env-lu-zerlegung-einer-3-3-matrix",children:"Beispiel 5.3.4"})," und lösen ",e.jsx(i,{children:"\\bA\\bx = \\bb"}),` für
`,e.jsx(i,{children:"\\bb = (5, -2, 9)^\\top"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Schritt 1: Vorwärtssubstitution"})," für ",e.jsx(i,{children:"\\bL\\by = \\bb"}),":"]}),e.jsx(f,{children:`\\begin{pmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ -1 & -1 & 1 \\end{pmatrix}
\\begin{pmatrix} y_1 \\\\ y_2 \\\\ y_3 \\end{pmatrix}
= \\begin{pmatrix} 5 \\\\ -2 \\\\ 9 \\end{pmatrix}
\\quad\\Longrightarrow\\quad
\\begin{aligned}
y_1 &= \\cgreen{5} , \\\\
y_2 &= -2 - 2 \\cdot \\cgreen{5} = \\cgreen{-12} , \\\\
y_3 &= 9 - (-1) \\cdot \\cgreen{5} - (-1) \\cdot (\\cgreen{-12}) = 9 + 5 - 12 = \\cgreen{2} .
\\end{aligned}`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Schritt 2: Rückwärtssubstitution"})," für ",e.jsx(i,{children:"\\bU\\bx = \\by"}),` mit
`,e.jsx(i,{children:"\\by = (5, -12, 2)^\\top"}),`; die Divisoren sind die Diagonalelemente
`,e.jsx(i,{children:"\\cred{u_{ii}}"}),":"]}),e.jsx(f,{children:`\\begin{aligned}
x_3 &= 2 / \\cred{3} = \\cgreen{\\tfrac{2}{3}} , \\\\
x_2 &= \\bigl(-12 - 2 \\cdot \\cgreen{\\tfrac{2}{3}}\\bigr) / (\\cred{-8}) = \\cgreen{\\tfrac{5}{3}} , \\\\
x_1 &= \\bigl(5 - 1 \\cdot \\cgreen{\\tfrac{5}{3}} - (-1) \\cdot \\cgreen{\\tfrac{2}{3}}\\bigr) / \\cred{2} = \\cgreen{2} .
\\end{aligned}`}),e.jsxs(n.p,{children:["Die Lösung ist ",e.jsx(i,{children:"\\bx = \\bigl(2, \\tfrac{5}{3}, \\tfrac{2}{3}\\bigr)^\\top"}),`; die
Probe `,e.jsx(i,{children:"\\bA\\bx = \\bb"})," geht auf."]})]}),`
`,e.jsxs(K,{title:"LU-Zerlegung Schritt für Schritt",children:[e.jsx(n.p,{children:"Welche Einträge speichert die LU-Zerlegung zusätzlich zur Arbeitsmatrix?"}),e.jsx(Qe,{}),e.jsxs(n.p,{children:["Wie das Widget zeigt, werden die Multiplikatoren der Elimination in ",e.jsx(i,{children:"\\bL"}),`
gespeichert, während die Arbeitsmatrix zu `,e.jsx(i,{children:"\\bU"})," wird."]})]}),`
`,e.jsx(n.h3,{children:"Pivotierung"}),`
`,e.jsxs(n.p,{children:["Was tun, wenn ein Pivot ",e.jsx(i,{children:"\\cred{m_{kk}} = 0"}),` auftritt, wie in
`,e.jsx(n.a,{href:"#env-invertierbar-aber-keine-lu-zerlegung",children:"Beispiel 5.3.6"}),`? Wir tauschen die Pivotzeile gegen eine Zeile weiter unten,
in deren `,e.jsx(i,{children:"k"}),"-ter Spalte keine Null steht; bei invertierbarem ",e.jsx(i,{children:"\\bA"}),` gibt es
so eine Zeile immer. Dieses Umsortieren heißt `,e.jsx(n.em,{children:"Pivotierung"}),` (pivoting).
Buchhalterisch sammeln wir alle Vertauschungen in einer
`,e.jsx(j,{id:"permutation-matrix",children:"Permutationsmatrix"})," ",e.jsx(i,{children:"\\bP"}),` und erhalten die
pivotierte Zerlegung `,e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"})," aus ",e.jsx(n.a,{href:"#env-existenz-der-lu-zerlegung",children:"Satz 5.3.5"}),`. Zum Lösen von
`,e.jsx(i,{children:"\\bA\\bx = \\bb"})," substituieren wir dann entlang ",e.jsx(i,{children:"\\bL\\bU\\bx = \\bP\\bb"}),`: Die
rechte Seite wird mitvertauscht, sonst ändert sich nichts.`]}),`
`,e.jsxs(n.p,{children:[`Pivotierung ist aber mehr als eine Notfallmaßnahme für exakte Nullen. Auch
ein sehr kleines Pivot `,e.jsx(i,{children:"\\cred{m_{kk}} \\approx 0"}),` ist gefährlich: Die
Multiplikatoren `,e.jsx(i,{children:"l_{ik} = m_{ik}/\\cred{m_{kk}}"}),` werden dann riesig, beim
Abziehen der aufgeblähten Pivotzeile gehen die ursprünglichen Einträge der
Matrix in Rundungsfehlern unter, und der Eliminationsschritt wird
`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"instabil"}),`. Der Tausch zum betragsgrößten Pivot der
Spalte (`,e.jsx(n.em,{children:"partielle Pivotierung"}),`) hält alle Multiplikatoren im Betrag bei
höchstens 1 und macht die Elimination in der Praxis stabil.
Numerikbibliotheken pivotieren deshalb grundsätzlich, auch wenn kein Pivot
exakt null ist.`]}),`
`,e.jsxs(K,{title:"Kleine Pivots, große Fehler",children:[e.jsx(n.p,{children:"Was verändert der Zeilentausch am Rundungsfehler eines kleinen Pivots?"}),e.jsx(nn,{}),e.jsxs(n.p,{children:["Ohne Zeilentausch wächst der Fehler mit jedem Zehnerschritt von ",e.jsx(i,{children:"\\epsilon"}),` mit:
Bei `,e.jsx(i,{children:"\\epsilon = 10^{-12}"}),` stimmen nur noch vier Nachkommastellen, und ab
`,e.jsx(i,{children:"\\epsilon \\approx 10^{-16}"})," schluckt die Subtraktion ",e.jsx(i,{children:"1 - 1/\\epsilon"}),` den Eintrag
`,e.jsx(i,{children:"a_{22}"}),` vollständig – die berechnete Zerlegung gehört dann zu einer anderen
Matrix. Die Zeile mit Zeilentausch bleibt über den ganzen Reglerbereich bei
Maschinengenauigkeit. Am Problem ändert der Tausch nichts, nur am Rechenweg.`]})]}),`
`,e.jsx(n.h3,{children:"Komplexität"}),`
`,e.jsxs(n.p,{children:[`Was kostet die Zerlegung? Zählen wir zuerst einen einzelnen Schritt nach.
Im `,e.jsx(i,{children:"k"}),"-ten Schritt multiplizieren wir das aktuelle System mit ",e.jsx(i,{children:"\\bL_k"}),`; die
ersten `,e.jsx(i,{children:"k - 1"}),` Spalten der Arbeitsmatrix haben ihre Nullen unter der
Diagonalen bereits. Vor dem Nachrechnen ein Selbsttest
(`,e.jsx(j,{id:"big-o-notation",children:"Landau-Notation"}),` zur Erinnerung in
`,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),"):"]}),`
`,e.jsxs(G,{children:[e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Für den ",e.jsx(i,{children:"k"}),"-ten Schritt müssen wir das volle Matrixprodukt ",e.jsx(i,{children:"\\bL_k \\bM"}),`
ausrechnen; er kostet also `,e.jsx(i,{children:"O(n^3)"})," Operationen."]}),e.jsxs(n.p,{children:["Niemand multipliziert ",e.jsx(i,{children:"\\bL_k"})," wirklich aus. ",e.jsx(i,{children:"\\bL_k"}),` unterscheidet sich von
der Einheitsmatrix nur in Spalte `,e.jsx(i,{children:"k"}),`: Das Produkt zieht lediglich von den
Zeilen `,e.jsx(i,{children:"k+1, \\dots, n"}),` je ein Vielfaches der Pivotzeile ab; alle anderen
Zeilen bleiben unverändert stehen.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(n.p,{children:["Im ",e.jsx(i,{children:"k"}),`-ten Schritt ändern sich nur die Einträge im rechten unteren
`,e.jsx(i,{children:"(n-k) \\times (n-k)"}),`-Block (und die rechte Seite); der Aufwand ist
`,e.jsx(i,{children:"O((n-k)^2)"}),"."]}),e.jsxs(n.p,{children:["Betroffen sind die Zeilen ",e.jsx(i,{children:"k+1, \\dots, n"}),"; links von Spalte ",e.jsx(i,{children:"k"}),` stehen dort
schon Nullen, und die bleiben null. In Spalte `,e.jsx(i,{children:"k"}),` entsteht die neue Null,
neu ausgerechnet werden die Spalten `,e.jsx(i,{children:"k+1, \\dots, n"}),` und der Eintrag der
rechten Seite. Das sind `,e.jsx(i,{children:"n-k"})," Zeilen mit je ",e.jsx(i,{children:"n-k+1"}),` Aktualisierungen, in
der Summe `,e.jsx(i,{children:"(n-k)(n-k+1)"})," Rechenschritte, also ",e.jsx(i,{children:"O((n-k)^2)"}),"."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(n.p,{children:[e.jsx(i,{children:"O(n^2)"})," ist eine korrekte obere Schranke für den Aufwand des ",e.jsx(i,{children:"k"}),`-ten
Schritts.`]}),e.jsxs(n.p,{children:["Wegen ",e.jsx(i,{children:"(n-k)^2 \\le n^2"}),` stimmt das; die Schranke ist nur nicht scharf, denn
späte Schritte sind viel billiger. Für die Gesamtkosten macht das keinen
Unterschied: Beide Abschätzungen liefern aufsummiert `,e.jsx(i,{children:"O(n^3)"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Die Schritte werden mit wachsendem ",e.jsx(i,{children:"k"})," teurer; der ",e.jsx(i,{children:"k"}),`-te Schritt kostet
`,e.jsx(i,{children:"O(k^3)"})," Operationen."]}),e.jsxs(n.p,{children:[`Umgekehrt: Der aktive Block schrumpft von Schritt zu Schritt. Der erste
Schritt ist mit etwa `,e.jsx(i,{children:"n^2"}),` Aktualisierungen der teuerste; der letzte
bearbeitet nur noch die unterste Zeile, also eine neue Null, einen
aktualisierten Eintrag und die rechte Seite.`]})]})]}),`
`,e.jsxs(D,{kind:"Satz",label:"5.3.9 (Komplexität der LU-Zerlegung)",id:"env-komplexitaet-der-lu-zerlegung",children:[e.jsxs(n.p,{children:["Für invertierbares ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," gilt:"]}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Die Berechnung der LU-Zerlegung kostet ",e.jsx(i,{children:"O(n^3)"})," Operationen."]}),`
`,e.jsxs(n.li,{children:["Vorwärts- und Rückwärtssubstitution kosten je ",e.jsx(i,{children:"O(n^2)"}),"."]}),`
`,e.jsxs(n.li,{children:["Das Lösen von ",e.jsx(i,{children:"J"})," Systemen ",e.jsx(i,{children:"\\bA\\bx = \\bb_j"}),", ",e.jsx(i,{children:"j = 1, \\dots, J"}),`, mit
derselben Matrix kostet insgesamt `,e.jsx(i,{children:"O(n^3 + J n^2)"}),"."]}),`
`]})]}),`
`,e.jsxs(n.p,{children:["Teil 3 lebt davon, dass ",e.jsx(i,{children:"\\bL"})," und ",e.jsx(i,{children:"\\bU"})," nur von ",e.jsx(i,{children:"\\bA"}),` abhängen und nicht von
`,e.jsx(i,{children:"\\bb"}),`: Die teure Elimination fällt kein zweites Mal an, für jede weitere
rechte Seite bleiben nur die beiden billigen Substitutionen. Dieses Muster
trägt weit über die LU-Zerlegung hinaus – auch die QR-Zerlegung für
Kleinste-Quadrate-Probleme (`,e.jsx(n.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),") folgt ihm."]}),`
`,e.jsxs(C,{title:"Herleitung der Aufwandsordnung und exakte Kosten",children:[e.jsx(ne,{children:e.jsxs(R,{why:e.jsxs(e.Fragment,{children:["Substitution ",e.jsx(i,{children:"j = n - k"}),"; die Quadratsumme ist ",e.jsx(i,{children:"\\sum_{j=1}^{n-1} j^2 = \\frac{(n-1)n(2n-1)}{6} \\approx \\frac{n^3}{3}"})]}),children:[e.jsxs(n.p,{children:["Der ",e.jsx(i,{children:"k"}),"-te Eliminationsschritt kostet ",e.jsx(i,{children:"O((n-k)^2)"}),` Operationen, aufsummiert
über die `,e.jsx(i,{children:"n - 1"})," Schritte also"]}),e.jsx(f,{children:`\\sum_{k=1}^{n-1} O\\bigl((n-k)^2\\bigr)
= O\\Bigl(\\sum_{j=1}^{n-1} j^2\\Bigr)
= O(n^3) .`}),e.jsxs(n.p,{children:["Die ",e.jsx(i,{children:"O(n^2)"})," eines Substitutionspaars haben wir in ",e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"})," gezählt; für ",e.jsx(i,{children:"J"}),`
rechte Seiten kommen sie `,e.jsx(i,{children:"J"}),"-mal zur einmaligen Zerlegung hinzu."]})]})}),e.jsxs(n.p,{children:["Wer die Multiplikationen exakt zählt, findet rund ",e.jsx(i,{children:"n^3/3"}),` für die Zerlegung
und rund `,e.jsx(i,{children:"n^2"}),` für ein Substitutionspaar. Mit diesen Konstanten rechnet das
folgende Widget:`]}),e.jsxs(K,{title:"Einmal zerlegen oder jedes Mal neu?",children:[e.jsx(n.p,{children:"Ab wann überwiegt der einmalige Aufwand der Zerlegung nicht mehr?"}),e.jsx(rn,{}),e.jsxs(n.p,{children:["Bei ",e.jsx(i,{children:"n = 100"})," und ",e.jsx(i,{children:"J = 50"}),` rechten Seiten kostet der Neuansatz rund das
Zwanzigfache: Die Zerlegung wird fünfzigmal statt einmal bezahlt, während die
Substitutionen mit ihren `,e.jsx(i,{children:"n^2"}),` kaum ins Gewicht fallen. Schon ab der zweiten
rechten Seite liegt die gespeicherte Zerlegung vorn.`]}),e.jsx(G,{children:e.jsxs(Pe,{loesung:2,toleranz:0,children:[e.jsx(n.p,{children:"Ab wie vielen rechten Seiten ist die gespeicherte LU-Zerlegung im Kosten-Widget günstiger?"}),e.jsx(n.p,{children:"Ab der zweiten rechten Seite fällt die Zerlegung nur einmal an."})]})})]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"5.3.10 (Struktur ausnutzen)",id:"env-struktur-ausnutzen",children:[e.jsxs(n.p,{children:["Die Laufzeit lässt sich weiter drücken, wenn ",e.jsx(i,{children:"\\bA"}),` besondere Eigenschaften
erfüllt, zum Beispiel:`]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(j,{id:"symmetric-matrix",children:"symmetrisch"}),": ",e.jsx(i,{children:"\\bA = \\bA^\\top"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(j,{id:"positive-definite",children:"positiv definit"}),": ",e.jsx(i,{children:"\\bx^\\top \\bA \\bx > 0"}),` für alle
`,e.jsx(i,{children:"\\bx \\neq \\bnull"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Bandeigenschaft:"})," ",e.jsx(i,{children:"a_{ij} = 0"})," für alle ",e.jsx(i,{children:"|i - j| > \\beta"}),`, das heißt,
außerhalb eines Bandes der Breite `,e.jsx(i,{children:"\\beta"}),` um die Diagonale stehen nur
Nullen;`]}),`
`,e.jsxs(n.li,{children:[e.jsx(j,{id:"sparse-matrix",children:"dünn besetzt"})," (",e.jsx(n.em,{children:"sparse"}),"): ",e.jsx(i,{children:"a_{ij} = 0"}),` für die
allermeisten `,e.jsx(i,{children:"(i, j)"}),"."]}),`
`]}),e.jsxs(n.p,{children:[`Für symmetrische, positiv definite Matrizen halbiert etwa die
Cholesky-Zerlegung des nächsten Abschnitts (`,e.jsx(n.a,{href:"#sec-5.4",children:"Abschnitt 5.4"}),`) den
Aufwand. Für all diese Fälle existieren hervorragende, über Jahrzehnte
gereifte Implementierungen; man schreibt solche Algorithmen selten selbst.`]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.4 (Gauß-Elimination, LU-Zerlegung, Pivotierung) und
§2.5 (Spezialstrukturen).`})})]})}function sn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(ze,{...r})}):ze(r)}const{blau:Se,gruen:Ae,rot:Le}=B;function tn(r){const n=r.length,t=r.map(()=>new Array(n).fill(0)),x=[];for(let d=0;d<n;d++){let a=r[d][d],u="";for(let s=0;s<d;s++)a-=t[d][s]*t[d][s],u+=` − (${z(t[d][s])})²`;if(!(a>1e-12))return x.push({i:d,j:d,line:`l${_(d+1)}${_(d+1)} = √(${z(r[d][d])}${u}) = √(${z(a)})  ✗`,value:NaN}),{steps:x,fail:{msg:`Unter der Wurzel steht ${z(a)} ≤ 0: die eingegebene Matrix ist nicht positiv definit, eine Cholesky-Zerlegung existiert nicht.`}};t[d][d]=Math.sqrt(a),x.push({i:d,j:d,line:`l${_(d+1)}${_(d+1)} = √(${z(r[d][d])}${u}) = ${z(t[d][d])}`,value:t[d][d]});for(let s=d+1;s<n;s++){let b=r[s][d],l="";for(let o=0;o<d;o++)b-=t[s][o]*t[d][o],l+=` − (${z(t[s][o])})·(${z(t[d][o])})`;const h=b/t[d][d];t[s][d]=h,x.push({i:s,j:d,line:`l${_(s+1)}${_(d+1)} = (${z(r[s][d])}${l}) / ${z(t[d][d])} = ${z(h)}`,value:h})}}return{steps:x,fail:null}}function ln(){const[r,n]=S.useState([[4,2,-2],[2,10,2],[-2,2,6]]),[t,x]=S.useState(0),d=S.useMemo(()=>tn(r),[r]),a=d.steps.length,u=Math.min(t,a),s=r.length,b=u<a?d.steps[u]:null,l=d.fail!==null&&u===a,h=d.fail===null&&u===a,o=r.map((p,w)=>r.map((c,g)=>g>w?0:null)),v=r.map(()=>new Array(s).fill(!1));for(let p=0;p<u;p++){const w=d.steps[p];Number.isNaN(w.value)||(o[w.i][w.j]=w.value,v[w.i][w.j]=!0)}const E=(p,w)=>b&&p===b.i&&w===b.j?{background:Le+"33",fontWeight:600}:void 0,L=(p,w)=>{if(b&&p===b.i&&w===b.j)return{background:Se+"33"};if(v[p][w])return{color:Ae,fontWeight:600}},m=S.useMemo(()=>{if(!h)return null;const p=(c,g)=>g>c?0:o[c][g]??0;let w=0;for(let c=0;c<s;c++)for(let g=0;g<s;g++){let N=0;for(let A=0;A<s;A++)N+=p(c,A)*p(g,A);w=Math.max(w,Math.abs(N-r[c][g]))}return w},[h,r,u]);return e.jsxs("div",{children:[e.jsx(O,{children:"Schieben wir durch die sechs Einträge von L und probieren danach eine nicht-SPD-Matrix."}),e.jsxs("p",{className:"sr-only",children:["Bauen wir ",e.jsx("span",{className:"font-mono",children:"L"})," per Koeffizientenvergleich auf, spaltenweise von links oben nach rechts unten. In jedem Schritt vergleichen wir den"," ",e.jsx("span",{style:{color:Le,fontWeight:600},children:"rot markierten Eintrag von A"})," mit dem entsprechenden Eintrag von ",e.jsx("span",{className:"font-mono",children:"LLᵀ"})," und lösen nach dem ",e.jsx("span",{style:{color:Se,fontWeight:600},children:"blau markierten Eintrag von L"})," ","auf; fertige Einträge erscheinen"," ",e.jsx("span",{style:{color:Ae,fontWeight:600},children:"grün"}),". Die Matrix lässt sich editieren (wir symmetrisieren die Eingabe automatisch). Setzen wir etwa a₁₁ auf −1, sehen wir, wie die Zerlegung an einer nicht positiv definiten Matrix scheitert."]}),e.jsx("div",{className:"my-3 flex flex-wrap items-center gap-4",children:e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:["A =",e.jsx(J,{value:r,onChange:p=>{n(p.map((w,c)=>w.map((g,N)=>{var A;return(g+(((A=p[N])==null?void 0:A[c])??g))/2}))),x(0)}})]})}),e.jsx(ue,{step:u,setStep:x,max:a,narration:`${u} von ${a} Einträgen berechnet`}),e.jsxs("div",{className:"hidden my-2 flex flex-wrap items-center gap-2",children:[e.jsx("button",{type:"button",className:"rounded border border-slate-400 px-3 py-1 text-sm disabled:opacity-40",onClick:()=>x(p=>Math.max(0,p-1)),disabled:u===0,children:"◀ zurück"}),e.jsx("button",{type:"button",className:"rounded border border-slate-400 bg-slate-100 px-3 py-1 text-sm font-medium disabled:opacity-40 dark:bg-slate-800",onClick:()=>x(p=>Math.min(a,p+1)),disabled:u>=a,children:"nächster Eintrag ▶"}),e.jsx("button",{type:"button",className:"rounded border border-slate-400 px-3 py-1 text-sm",onClick:()=>x(0),children:"zurücksetzen"}),e.jsxs("span",{className:"text-sm",style:{color:"var(--w-muted)"},children:[u," von ",a," Einträgen berechnet"]})]}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-5",children:[e.jsx(U,{label:"A (symmetrisch)",children:e.jsx(W,{m:r,cellStyle:E})}),e.jsx(U,{label:"L (untere Dreiecksmatrix)",children:e.jsx(W,{m:o,cellStyle:L})}),e.jsxs("div",{className:"grow",children:[u>0&&e.jsx("div",{className:"rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800",children:d.steps.slice(0,u).map(p=>e.jsx("div",{children:p.line},p.line))}),l&&d.fail&&e.jsxs(F,{kind:"fail",className:"mt-2",children:[d.fail.msg," ",ie("satz:cholesky-zerlegung")," ist hier nicht anwendbar."]}),h&&m!==null&&e.jsxs(F,{kind:"ok",className:"mt-2",children:["Fertig: alle ",a," Gleichungen des Koeffizientenvergleichs sind abgearbeitet, jede enthielt genau eine neue Unbekannte. Probe: max |A − L·Lᵀ| ="," ",e.jsx("span",{className:"font-mono",children:z(m)}),"."]})]})]})]})}const ee=B.gruen,I=B.grau,ce=(()=>{const r=Ie(20260810),n=[];for(let t=0;t<200;t++){const x=Math.max(r(),1e-12),d=r(),a=Math.sqrt(-2*Math.log(x));n.push([a*Math.cos(2*Math.PI*d),a*Math.sin(2*Math.PI*d)])}return n})(),ye=72,_e=Array.from({length:ye+1},(r,n)=>{const t=2*Math.PI*n/ye;return[2*Math.cos(t),2*Math.sin(t)]}),he=r=>r.toFixed(2).replace(".",",");function dn(){const[r,n]=S.useState(1),[t,x]=S.useState(1),[d,a]=S.useState(.7),u=r*r,s=d*r*t,b=t*t,l=r,h=d*t,o=t*Math.sqrt(1-d*d),v=S.useMemo(()=>ce.map(([k,P])=>[l*k,h*k+o*P]),[l,h,o]),E=S.useMemo(()=>_e.map(([k,P])=>[l*k,h*k+o*P]),[l,h,o]),L=S.useMemo(()=>{let k=2;for(const[P,$]of[...ce,...v,...E])k=Math.max(k,Math.abs(P),Math.abs($));return Math.max(3,Math.ceil(k+.2))},[v,E]),m=340,p=340,w=34,c=28,g=10,N=10,A=k=>w+(k+L)/(2*L)*(m-w-N),y=k=>p-c-(k+L)/(2*L)*(p-g-c),Ze=L<=5?1:2,me=[];for(let k=-L;k<=L;k+=Ze)me.push(k);const ge=k=>k.map(([P,$],Be)=>`${Be===0?"M":"L"}${A(P).toFixed(1)},${y($).toFixed(1)}`).join(" "),Re=Math.max(Math.abs(l*l-u),Math.abs(l*h-s),Math.abs(h*h+o*o-b)),Fe=(k,P)=>P<=k?{color:ee,fontWeight:600}:void 0;return e.jsxs("div",{children:[e.jsx(O,{children:"Schieben wir ρ Richtung ±1 und beobachten, wie die grüne Wolke schmal wird."}),e.jsxs("p",{className:"sr-only",children:["Wir halten 200 Punkte ",e.jsx("span",{className:"font-mono",children:"z"})," aus der Standardnormalverteilung N(0, I₂) fest (grau, runde Wolke) und schauen, was die Abbildung ",e.jsx("span",{className:"font-mono",children:"y = Lz"})," daraus macht (",e.jsx("span",{style:{color:ee,fontWeight:600},children:"grün"}),"): Aus den Reglern entstehen Σ und ihr Cholesky-Faktor L, und L verformt die runde Wolke in die korrelierte. Die grüne Ellipse ist das Bild des grauen Kreises mit Radius 2. Schieben wir ρ Richtung ±1, kollabiert die Wolke fast auf eine Gerade."]}),e.jsx(q,{label:"σ₁",value:r,onChange:n,min:.4,max:2,step:.05,fmt:he}),e.jsx(q,{label:"σ₂",value:t,onChange:x,min:.4,max:2,step:.05,fmt:he}),e.jsx(q,{label:"ρ",value:d,onChange:a,min:-.95,max:.95,step:.05,fmt:he}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-5",children:[e.jsxs("svg",{width:m,height:p,viewBox:`0 0 ${m} ${p}`,className:"max-w-full rounded bg-white",style:{border:"1px solid var(--w-border)"},role:"img","aria-label":"Punktwolke z (grau) und ihr Bild y = Lz (grün)",children:[e.jsx("line",{x1:A(-L),y1:y(0),x2:A(L),y2:y(0),stroke:"var(--w-grid-strong)",strokeWidth:1}),e.jsx("line",{x1:A(0),y1:y(-L),x2:A(0),y2:y(L),stroke:"var(--w-grid-strong)",strokeWidth:1}),me.map(k=>e.jsxs("g",{children:[e.jsx("line",{x1:A(k),y1:y(0)-3,x2:A(k),y2:y(0)+3,stroke:I,strokeWidth:1}),k!==0&&e.jsx("text",{x:A(k),y:p-c+14,fontSize:10,fill:I,textAnchor:"middle",children:String(k).replace("-","−")}),e.jsx("line",{x1:A(0)-3,y1:y(k),x2:A(0)+3,y2:y(k),stroke:I,strokeWidth:1}),k!==0&&e.jsx("text",{x:w-6,y:y(k)+3,fontSize:10,fill:I,textAnchor:"end",children:String(k).replace("-","−")})]},k)),e.jsx("text",{x:m-N-2,y:y(0)-6,fontSize:11,fill:I,textAnchor:"end",children:"y₁"}),e.jsx("text",{x:A(0)+8,y:g+10,fontSize:11,fill:I,children:"y₂"}),e.jsx("path",{d:ge(_e),fill:"none",stroke:I,strokeWidth:1,strokeDasharray:"3 4"}),ce.map(([k,P],$)=>e.jsx("circle",{cx:A(k),cy:y(P),r:2,fill:I,fillOpacity:.45},`z${$}`)),e.jsx("path",{d:ge(E),fill:"none",stroke:ee,strokeWidth:1.5,strokeDasharray:"5 3"}),v.map(([k,P],$)=>e.jsx("circle",{cx:A(k),cy:y(P),r:2,fill:ee,fillOpacity:.7},`y${$}`))]}),e.jsxs("div",{className:"min-w-56 grow text-sm",children:[e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsx(U,{label:"Σ (aus den Reglern)",children:e.jsx(W,{m:[[u,s],[s,b]]})}),e.jsx(U,{label:"L = chol(Σ)",children:e.jsx(W,{m:[[l,0],[h,o]],cellStyle:Fe})})]}),e.jsxs("div",{className:"mt-3 rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800",children:["L₁₁ = σ₁ = ",z(l),e.jsx("br",{}),"L₂₁ = ρσ₂ = ",z(h),e.jsx("br",{}),"L₂₂ = σ₂·√(1 − ρ²) = ",z(o),e.jsx("br",{}),"Probe: max |LLᵀ − Σ| = ",z(Re)]}),e.jsx(F,{kind:Math.abs(d)>.9?"warn":Math.abs(d)<.1?"neutral":"ok",className:"mt-2",children:Math.abs(d)>.9?"L₂₂ wird klein; die Kovarianz ist fast singulär.":Math.abs(d)<.1?"Die Wolke bleibt fast rund: die Korrelation ist nahe null.":`L erzeugt die sichtbare Scherung und ${ie("satz:kovarianz-unter-dem-cholesky-faktor")} garantiert die Kovarianz Σ.`})]})]})]})}const{blau:oe,gruen:an,rot:cn}=B,De=320,Z=160,xe=110;function hn(){const[r,n]=S.useState(45),[t,x]=S.useState("nicht"),d=r*Math.PI/180,a=[Math.cos(d),Math.sin(d)],u=t==="spd"?[[2,0],[0,1]]:[[1,0],[0,-1]],s=S.useMemo(()=>a[0]*(u[0][0]*a[0]+u[0][1]*a[1])+a[1]*(u[1][0]*a[0]+u[1][1]*a[1]),[a,u]),b=Z+xe*a[0],l=Z-xe*a[1],h=s<=1e-9;return e.jsxs("div",{children:[e.jsx(O,{children:"Wählen wir „nicht SPD“ und drehen den Einheitsvektor bis die quadratische Form nicht mehr positiv ist."}),e.jsxs("div",{className:"my-2 flex flex-wrap gap-2",role:"group","aria-label":"Matrixfamilie",children:[e.jsx("button",{type:"button","aria-pressed":t==="spd",onClick:()=>x("spd"),className:"rounded px-3 py-1 text-sm",style:{background:t==="spd"?an:"var(--w-bg)",color:t==="spd"?"white":"var(--w-text)"},children:"SPD: diag(2, 1)"}),e.jsx("button",{type:"button","aria-pressed":t==="nicht",onClick:()=>x("nicht"),className:"rounded px-3 py-1 text-sm",style:{background:t==="nicht"?cn:"var(--w-bg)",color:t==="nicht"?"white":"var(--w-text)"},children:"nicht SPD: diag(1, −1)"})]}),e.jsxs("svg",{viewBox:`0 0 ${De} ${De}`,className:"max-w-full h-auto",role:"img","aria-label":`Einheitsvektor bei ${r} Grad, quadratische Form ${s.toFixed(2)}`,children:[e.jsx("circle",{cx:Z,cy:Z,r:xe,fill:"none",stroke:"var(--w-grid-strong)"}),e.jsx("line",{x1:30,y1:Z,x2:290,y2:Z,stroke:"var(--w-axis)"}),e.jsx("line",{x1:Z,y1:30,x2:Z,y2:290,stroke:"var(--w-axis)"}),e.jsx("line",{x1:Z,y1:Z,x2:b,y2:l,stroke:oe,strokeWidth:4}),e.jsx("circle",{cx:b,cy:l,r:8,fill:oe}),e.jsx("text",{x:Z+8,y:Z-8,fill:"var(--w-text)",fontSize:13,children:"x"}),e.jsxs("text",{x:18,y:26,fill:"var(--w-muted)",fontSize:12,children:["xᵀAx = ",s.toFixed(3).replace(".",",")]})]}),e.jsx(q,{label:"Richtung θ",value:r,onChange:n,min:0,max:360,step:1,unit:"°",accent:oe}),e.jsx(F,{kind:t==="spd"?"ok":h?"fail":"warn",children:t==="spd"?`Für jede dargestellte Richtung bleibt xᵀAx positiv. Das bestätigt nur diese Matrixfamilie; ${ie("satz:cholesky-zerlegung")} darf angewendet werden.`:h?"Aufgabe geschafft: Diese Richtung liefert xᵀAx ≤ 0 und widerlegt positive Definitheit.":"Diese Richtung besteht den Test, beweist aber nichts: SPD verlangt die Ungleichung für alle Richtungen."})]})}function Me(r){const n={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Die ",e.jsx(n.a,{href:"#sec-5.3",children:"LU-Zerlegung"}),` funktioniert, notfalls mit Pivotierung, für
jede invertierbare Matrix. Viele Matrizen, die uns in der Statistik
begegnen, haben aber deutlich mehr Struktur: Sie sind
`,e.jsx(j,{id:"symmetric-matrix",children:"symmetrisch"}),`, und ihre
`,e.jsx(j,{id:"quadratic-form",children:"quadratische Form"}),` ist strikt positiv. Es lohnt sich,
diese Struktur auszunutzen. Für solche Matrizen gibt es eine
maßgeschneiderte Zerlegung, die mit halbem Aufwand auskommt und ganz ohne
Pivotierung stabil bleibt: die Cholesky-Zerlegung.`]}),`
`,e.jsx(n.h3,{children:"SPD-Matrizen"}),`
`,e.jsxs(n.p,{children:[`Der entscheidende Spezialfall trägt eine Abkürzung im Namen:
`,e.jsx(n.strong,{children:"SPD"}),"-Matrizen sind ",e.jsx(n.strong,{children:"s"}),"ymmetrisch und ",e.jsx(n.strong,{children:"p"}),"ositiv ",e.jsx(n.strong,{children:"d"}),"efinit."]}),`
`,e.jsxs(D,{kind:"Definition",label:"5.4.1 (SPD-Matrix)",id:"env-spd-matrix",children:[e.jsxs(n.p,{children:["Eine Matrix ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," heißt ",e.jsx(n.em,{children:"SPD"}),", wenn"]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bA = \\bA^\\top"})," gilt (",e.jsx(i,{children:"\\bA"})," also symmetrisch ist) und"]}),`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"\\bx^\\top \\bA \\bx > 0"})," für alle ",e.jsx(i,{children:"\\bx \\in \\R^n"})," mit ",e.jsx(i,{children:"\\bx \\neq \\bnull"}),`
gilt (`,e.jsx(i,{children:"\\bA"})," also ",e.jsx(n.em,{children:"positiv definit"})," ist)."]}),`
`]})]}),`
`,e.jsxs(n.p,{children:[`Verlangen wir statt der strikten Ungleichung nur
`,e.jsx(i,{children:"\\bx^\\top \\bA \\bx \\geq 0"}),", und zwar für alle ",e.jsx(i,{children:"\\bx \\in \\R^n"}),", heißt ",e.jsx(i,{children:"\\bA"}),`
`,e.jsx(n.em,{children:"positiv semidefinit"}),`. Den Nullvektor müssen wir dabei nicht mehr
ausnehmen, denn `,e.jsx(i,{children:"\\bnull^\\top \\bA \\bnull = 0"}),` erfüllt die Bedingung
ohnehin. Der Unterschied zur Definitheit wirkt klein, entscheidet aber
später darüber, ob die Cholesky-Zerlegung ohne Zusatztricks durchläuft.`]}),`
`,e.jsxs(K,{title:"Welche Richtung widerlegt positive Definitheit?",children:[e.jsx(n.p,{children:`Eine Richtung kann positive Definitheit widerlegen, aber niemals allein
beweisen. Finden wir im folgenden Test die Richtung, die den Gegenbeweis
liefert.`}),e.jsx(hn,{}),e.jsxs(n.p,{children:[`Wie das Widget zeigt, genügt bei einer nicht-SPD-Matrix ein Vektor mit
`,e.jsx(i,{children:"\\bx^\\top\\bA\\bx \\leq 0"}),`. Für SPD muss die strikte Ungleichung dagegen für
alle Richtungen gelten.`]})]}),`
`,e.jsxs(n.p,{children:[`Das Paradebeispiel liefert die Statistik selbst: Jede
`,e.jsx(j,{id:"covariance-matrix",children:"Kovarianzmatrix"})," ",e.jsx(i,{children:"\\bSigma = \\var(\\bx)"}),` ist
symmetrisch und positiv semidefinit, denn für jeden festen Vektor
`,e.jsx(i,{children:"\\ba \\neq \\bnull"})," ist ",e.jsx(i,{children:"\\ba^\\top \\bSigma \\ba = \\var(\\ba^\\top \\bx) \\geq 0"}),`,
eine Varianz. SPD ist `,e.jsx(i,{children:"\\bSigma"}),` genau dann, wenn keine nichttriviale
Linearkombination `,e.jsx(i,{children:"\\ba^\\top \\bx"})," mit ",e.jsx(i,{children:"\\ba \\neq \\bnull"}),` fast sicher
konstant ist, die Verteilung also nicht auf einer Hyperebene
zusammenfällt.`]}),`
`,e.jsx(n.h3,{children:"SPD-Matrizen in Statistik und ML"}),`
`,e.jsx(n.p,{children:`Wo immer in Statistik und maschinellem Lernen gerechnet wird, tauchen
SPD-Matrizen auf. Drei große Familien:`}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Kovarianzmatrizen"})," ",e.jsx(i,{children:"\\bSigma = \\E[(\\bx - \\bmu)(\\bx - \\bmu)^\\top]"}),`:
Sie parametrisieren multivariate Normalverteilungen
`,e.jsx(i,{children:"\\Ncal_p(\\bmu, \\bSigma)"}),` und stehen im Zentrum der
Hauptkomponentenanalyse (PCA).`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Gram-Matrizen"})," ",e.jsx(i,{children:"\\bK = \\bX^\\top \\bX"}),`, etwa für eine Designmatrix
`,e.jsx(i,{children:"\\bX"}),` in der Regression: Sie bilden die linke Seite der
`,e.jsx(j,{id:"normal-equations",children:"Normalgleichungen"}),`
`,e.jsx(i,{children:"\\bX^\\top \\bX \\bbeta = \\bX^\\top \\by"}),` für
`,e.jsx(n.em,{children:"Kleinste-Quadrate"}),"-Probleme (",e.jsx(n.a,{href:"?k=07-kq#sec-7.3",children:"Kapitel 7"}),`). SPD ist
`,e.jsx(i,{children:"\\bK"})," genau dann, wenn ",e.jsx(i,{children:"\\bX"}),` vollen Spaltenrang hat; sonst bleibt nur
positive Semidefinitheit. Auch Kernel-Matrizen in Support Vector
Machines, Gauß-Prozessen und der nichtparametrischen Glättung gehören
in diese Familie.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hesse-Matrizen"}),`
`,e.jsx(i,{children:"\\bH = \\bigl[\\tfrac{\\partial^2}{\\partial x_i \\partial x_j} f(\\bx)\\bigr]_{i,j}"}),`
(`,e.jsx(j,{id:"hessian-matrix",children:"Hesse-Matrix"}),`): In der Optimierung
charakterisieren sie `,e.jsx(j,{id:"convexity",children:"Konvexität"}),` und treiben das
`,e.jsx(j,{id:"newtons-method",children:"Newton-Verfahren"}),` und andere Optimierer zweiter
Ordnung an. Ihr statistisches Gegenstück ist die Fisher-Information
`,e.jsx(i,{children:"\\E\\bigl[-\\tfrac{\\partial^2}{\\partial \\theta_i \\partial \\theta_j} \\log L(\\btheta)\\bigr]_{i,j}"}),`
der Log-`,e.jsx(j,{id:"likelihood",children:"Likelihood"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"Warum lohnt sich diese Klasse für die Numerik? SPD-Matrizen garantieren:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Existenz der Cholesky-Zerlegung (",e.jsx(n.a,{href:"#env-cholesky-zerlegung",children:"Satz 5.4.2"}),` unten); legen wir die
Diagonale von `,e.jsx(i,{children:"\\bL"}),` auf positive Werte fest, ist die Zerlegung sogar
eindeutig.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Numerische Stabilität"})," ganz ohne Pivotierung."]}),`
`,e.jsxs(n.li,{children:["Alle ",e.jsx(j,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` sind positiv, insbesondere
hat `,e.jsx(i,{children:"\\bA"})," vollen ",e.jsx(j,{id:"rank",children:"Rang"})," und ist invertierbar."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Der Zerlegungssatz"}),`
`,e.jsxs(n.p,{children:[`Bei einer symmetrischen Matrix steckt die gesamte Information schon in
einer Dreieckshälfte. Es wäre verschwenderisch, wenn die Zerlegung das
ignorieren würde. Tatsächlich können wir für SPD-Matrizen die Faktoren
`,e.jsx(i,{children:"\\bL"})," und ",e.jsx(i,{children:"\\bU"})," der LU-Zerlegung so wählen, dass ",e.jsx(i,{children:"\\bU = \\bL^\\top"}),` gilt:
Die Symmetrie von `,e.jsx(i,{children:"\\bA"})," vererbt sich an die Zerlegung."]}),`
`,e.jsxs(D,{kind:"Satz",label:"5.4.2 (Cholesky-Zerlegung)",id:"env-cholesky-zerlegung",children:[e.jsxs(n.p,{children:["Jede SPD-Matrix ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times n}"})," lässt sich zerlegen als"]}),e.jsx(X,{tag:"5.4.1",id:"eq-cholesky-zerlegung",children:"\\bA = \\bL \\bL^\\top ,"}),e.jsxs(n.p,{children:["wobei ",e.jsx(i,{children:"\\bL"})," eine untere ",e.jsx(j,{id:"triangular-matrix",children:"Dreiecksmatrix"})," ist."]})]}),`
`,e.jsxs(n.p,{children:["Statt zweier verschiedener Faktoren speichern wir nur noch ",e.jsx(i,{children:"\\bL"}),`, und auch
die Rechnung halbiert sich: Die Cholesky-Zerlegung kommt mit rund `,e.jsx(i,{children:"n^3/6"}),`
Multiplikationen aus, die volle LU-Zerlegung derselben Matrix braucht rund
`,e.jsx(i,{children:"n^3/3"})," (",e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"}),"). An der Größenordnung ",e.jsx(i,{children:"O(n^3)"}),` ändert
das nichts (`,e.jsx(n.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),`), an der Rechenzeit sehr
wohl.`]}),`
`,e.jsxs(C,{title:"Warum die Zerlegung immer existiert: der Induktionsbeweis",children:[e.jsxs(n.p,{children:["Der Beweis ist eine Induktion über die Dimension ",e.jsx(i,{children:"n"}),` und liefert
nebenbei gleich ein Rezept, wie sich `,e.jsx(i,{children:"\\bL"}),` Spalte für Spalte berechnen
lässt.`]}),e.jsxs(ne,{children:[e.jsx(R,{why:e.jsxs(e.Fragment,{children:["mit dem Testvektor ",e.jsx(i,{children:"x = 1 \\neq 0"})," liefert die Definitheit ",e.jsx(i,{children:"x\\,a\\,x = a > 0"}),"; die Wurzel existiert also"]}),children:e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Induktionsanfang"})," ",e.jsx(i,{children:"n = 1"}),": Hier ist ",e.jsx(i,{children:"\\bA = (a)"})," mit ",e.jsx(i,{children:"a \\in \\R"}),`, und aus
der Definitheit folgt `,e.jsx(i,{children:"a > 0"}),". Also leistet ",e.jsx(i,{children:"\\bL = (\\sqrt{a})"}),` das
Verlangte, denn `,e.jsx(i,{children:"\\bL\\bL^\\top = (\\sqrt{a})^2 = a"}),"."]})}),e.jsxs(R,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"a = \\be_1^\\top \\bA \\be_1 > 0"}),", weil ",e.jsx(i,{children:"\\bA"})," positiv definit und ",e.jsx(i,{children:"\\be_1 \\neq \\bnull"})," ist"]}),children:[e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Induktionsschritt"})," ",e.jsx(i,{children:"n > 1"}),`: Die Behauptung gelte für
`,e.jsx(i,{children:"(n-1) \\times (n-1)"}),"-Matrizen. Wir zerlegen ",e.jsx(i,{children:"\\bA"})," in Blöcke,"]}),e.jsx(f,{children:`\\bA = \\begin{pmatrix} a & \\bc^\\top \\\\ \\bc & \\bB \\end{pmatrix},
\\qquad a \\in \\R, \\quad \\bc \\in \\R^{n-1}, \\quad \\bB \\in \\R^{(n-1) \\times (n-1)},`}),e.jsxs(n.p,{children:["und halten fest, dass ",e.jsx(i,{children:"a > 0"})," gilt."]})]}),e.jsx(R,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"\\bB"})," ist als Diagonalblock der symmetrischen Matrix ",e.jsx(i,{children:"\\bA"})," selbst symmetrisch, und ",e.jsx(i,{children:"(\\bl\\bl^\\top)^\\top = \\bl\\bl^\\top"})]}),children:e.jsxs(n.p,{children:["Wir setzen ",e.jsx(i,{children:"\\bl = \\bc / \\sqrt{a}"}),` und betrachten die
`,e.jsx(i,{children:"(n-1) \\times (n-1)"}),"-Matrix ",e.jsx(i,{children:"\\bB - \\bl\\bl^\\top = \\bB - \\bc\\bc^\\top\\!/a"}),`.
Sie ist symmetrisch.`]})}),e.jsxs(R,{why:e.jsxs(e.Fragment,{children:["blockweises Ausmultiplizieren; in der ersten Komponente kürzt sich ",e.jsx(i,{children:"a"})," heraus, es bleibt ",e.jsx(i,{children:"-\\bc^\\top\\bx + \\bc^\\top\\bx = 0"})]}),children:[e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bB - \\bl\\bl^\\top"}),` ist auch positiv definit. Zu beliebigem
`,e.jsx(i,{children:"\\bx \\in \\R^{n-1}"})," mit ",e.jsx(i,{children:"\\bx \\neq \\bnull"})," wählen wir den Testvektor"]}),e.jsx(f,{children:"\\by = \\begin{pmatrix} -\\tfrac{\\bc^\\top\\bx}{a} \\\\ \\bx \\end{pmatrix} \\in \\R^n"}),e.jsx(n.p,{children:"und rechnen zuerst"}),e.jsx(f,{children:`\\bA\\by
= \\begin{pmatrix}
a \\cdot \\bigl(-\\tfrac{\\bc^\\top\\bx}{a}\\bigr) + \\bc^\\top\\bx \\\\
\\bc \\cdot \\bigl(-\\tfrac{\\bc^\\top\\bx}{a}\\bigr) + \\bB\\bx
\\end{pmatrix}
= \\begin{pmatrix} 0 \\\\ \\bigl(\\bB - \\tfrac{\\bc\\bc^\\top}{a}\\bigr)\\bx \\end{pmatrix}.`})]}),e.jsxs(R,{why:e.jsxs(e.Fragment,{children:["im Produkt ",e.jsx(i,{children:"\\by^\\top (\\bA\\by)"})," trifft die erste Komponente von ",e.jsx(i,{children:"\\by"})," auf die ",e.jsx(i,{children:"0"}),", übrig bleibt genau ",e.jsx(i,{children:"\\bx^\\top(\\bB - \\bc\\bc^\\top/a)\\bx"}),"; und ",e.jsx(i,{children:"\\by^\\top \\bA \\by > 0"}),", weil ",e.jsx(i,{children:"\\bA"})," SPD ist und ",e.jsx(i,{children:"\\by \\neq \\bnull"})," (schon der untere Block ",e.jsx(i,{children:"\\bx"})," ist es)"]}),children:[e.jsx(n.p,{children:"Damit folgt"}),e.jsx(f,{children:`\\bx^\\top \\Bigl(\\bB - \\tfrac{\\bc\\bc^\\top}{a}\\Bigr) \\bx
= \\by^\\top \\bA \\by > 0 .`})]}),e.jsxs(R,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"\\sqrt{a}\\,\\bl = \\bc"})," nach Definition von ",e.jsx(i,{children:"\\bl"}),", und ",e.jsx(i,{children:"\\bl\\bl^\\top + \\wt{\\bL}\\wt{\\bL}^\\top = \\bl\\bl^\\top + (\\bB - \\bl\\bl^\\top) = \\bB"})]}),children:[e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bB - \\bl\\bl^\\top"})," ist also eine SPD-Matrix der Dimension ",e.jsx(i,{children:"n - 1"}),`, und
nach Induktionsvoraussetzung existiert eine untere Dreiecksmatrix
`,e.jsx(i,{children:"\\wt{\\bL}"})," mit ",e.jsx(i,{children:"\\bB - \\bl\\bl^\\top = \\wt{\\bL}\\wt{\\bL}^\\top"}),". Wir setzen"]}),e.jsx(f,{children:"\\bL = \\begin{pmatrix} \\sqrt{a} & \\bnull^\\top \\\\ \\bl & \\wt{\\bL} \\end{pmatrix}"}),e.jsx(n.p,{children:"und prüfen blockweise nach:"}),e.jsx(f,{children:`\\bL\\bL^\\top
= \\begin{pmatrix}
a & \\sqrt{a}\\,\\bl^\\top \\\\
\\sqrt{a}\\,\\bl & \\bl\\bl^\\top + \\wt{\\bL}\\wt{\\bL}^\\top
\\end{pmatrix}
= \\begin{pmatrix} a & \\bc^\\top \\\\ \\bc & \\bB \\end{pmatrix}
= \\bA .`})]})]}),e.jsxs(n.p,{children:[`Achten wir zum Schluss auf den Quantor: Die strikte Ungleichung
`,e.jsx(i,{children:"\\bx^\\top (\\bB - \\bl\\bl^\\top) \\bx > 0"}),` gilt natürlich nur für
`,e.jsx(i,{children:"\\bx \\neq \\bnull"}),"; deshalb haben wir ihn überall mitgeführt."]})]}),`
`,e.jsxs(n.p,{children:["Die Konstruktion liefert ein ",e.jsx(i,{children:"\\bL"}),` mit lauter positiven Diagonaleinträgen,
denn auf der Diagonalen steht in jedem Schritt eine Wurzel. Mit dieser
Normierung ist die Zerlegung dann auch eindeutig: Ohne sie dürften wir in
einer beliebigen Spalte von `,e.jsx(i,{children:"\\bL"}),` alle Vorzeichen umdrehen, ohne
`,e.jsx(i,{children:"\\bL\\bL^\\top"})," zu verändern."]}),`
`,e.jsx(n.h3,{children:"Cholesky von Hand: Koeffizientenvergleich"}),`
`,e.jsxs(n.p,{children:["Wie kommen wir konkret an ",e.jsx(i,{children:"\\bL"}),`? Für kleine Matrizen genügt ein
Koeffizientenvergleich: Wir multiplizieren den Ansatz `,e.jsx(i,{children:"\\bL\\bL^\\top"}),` aus
und vergleichen Eintrag für Eintrag mit `,e.jsx(i,{children:"\\bA"}),"."]}),`
`,e.jsxs(D,{kind:"Beispiel",label:"5.4.3 (Cholesky-Zerlegung einer 2×2-Matrix)",id:"env-cholesky-zerlegung-einer-2-2-matrix",children:[e.jsxs(n.p,{children:[`Wir berechnen die Cholesky-Zerlegung von
`,e.jsx(i,{children:"\\bA = \\begin{pmatrix} 4 & 2 \\\\ 2 & 3 \\end{pmatrix}"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Ansatz:"})," ",e.jsx(i,{children:"\\bA = \\bL\\bL^\\top"}),` mit
`,e.jsx(i,{children:"\\bL = \\begin{pmatrix} l_{11} & 0 \\\\ l_{21} & l_{22} \\end{pmatrix}"}),"."]}),e.jsx(n.p,{children:e.jsx(n.strong,{children:"Ausmultiplizieren:"})}),e.jsx(f,{children:`\\bL\\bL^\\top
= \\begin{pmatrix} l_{11} & 0 \\\\ l_{21} & l_{22} \\end{pmatrix}
\\begin{pmatrix} l_{11} & l_{21} \\\\ 0 & l_{22} \\end{pmatrix}
= \\begin{pmatrix}
l_{11}^2 & l_{11} l_{21} \\\\
l_{11} l_{21} & l_{21}^2 + l_{22}^2
\\end{pmatrix}
\\overset{!}{=} \\begin{pmatrix} \\cred{4} & \\cred{2} \\\\ \\cred{2} & \\cred{3} \\end{pmatrix}.`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Koeffizientenvergleich"}),`, von links oben nach rechts unten (der jeweils
verglichene Eintrag von `,e.jsx(i,{children:"\\bA"})," rot, fertig berechnete Einträge von ",e.jsx(i,{children:"\\bL"}),`
grün):`]}),e.jsx(f,{children:`\\begin{aligned}
l_{11}^2 &= \\cred{4} & &\\implies & l_{11} &= \\cgreen{2}, \\\\
l_{11}\\, l_{21} &= \\cred{2} & &\\implies & l_{21} &= 2/2 = \\cgreen{1}, \\\\
l_{21}^2 + l_{22}^2 &= \\cred{3} & &\\implies & l_{22} &= \\sqrt{3 - 1} = \\cgreen{\\sqrt{2}} .
\\end{aligned}`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Ergebnis:"}),`
`,e.jsx(i,{children:"\\bL = \\begin{pmatrix} \\cgreen{2} & 0 \\\\ \\cgreen{1} & \\cgreen{\\sqrt{2}} \\end{pmatrix}"}),`,
und die Probe bestätigt
`,e.jsx(i,{children:"\\bL\\bL^\\top = \\begin{pmatrix} 4 & 2 \\\\ 2 & 3 \\end{pmatrix} = \\bA"}),"."]})]}),`
`,e.jsxs(n.p,{children:[`Jede Gleichung enthielt genau eine neue Unbekannte; in dieser Reihenfolge
löst sich das System also von selbst auf. Und dass unter der Wurzel mit
`,e.jsx(i,{children:"3 - 1 = 2 > 0"}),` etwas Positives stand, war kein Glück: Der Beweis von
`,e.jsx(n.a,{href:"#env-cholesky-zerlegung",children:"Satz 5.4.2"})," zeigt, dass das für SPD-Matrizen immer so ausgeht."]}),`
`,e.jsxs(n.p,{children:["Für allgemeines ",e.jsx(i,{children:"n"}),` liefert derselbe Vergleich das Rezept, das der Beweis
schon angedeutet hat. Der Eintrag `,e.jsx(i,{children:"(i,j)"})," von ",e.jsx(i,{children:"\\bL\\bL^\\top"}),` ist
`,e.jsx(i,{children:"\\sum_{k=1}^{n} l_{ik} l_{jk}"}),", und weil ",e.jsx(i,{children:"\\bL"}),` untere Dreiecksmatrix ist,
brechen die Summen früh ab. Wir lösen Spalte für Spalte auf, jeweils nach
dem einzigen noch unbekannten Eintrag:`]}),`
`,e.jsx(X,{tag:"5.4.2",id:"eq-eq-5-4-2",children:`l_{jj} = \\sqrt{a_{jj} - \\sum_{k=1}^{j-1} l_{jk}^2} ,
\\qquad
l_{ij} = \\frac{1}{l_{jj}} \\Bigl( a_{ij} - \\sum_{k=1}^{j-1} l_{ik} l_{jk} \\Bigr)
\\quad (i > j) .`}),`
`,e.jsx(n.p,{children:`Auf der Diagonalen steht also eine Wurzel, darunter eine Division durch
den zuletzt berechneten Diagonaleintrag.`}),`
`,e.jsxs(K,{title:"Cholesky-Zerlegung Schritt für Schritt",children:[e.jsxs(n.p,{children:["Ab ",e.jsx(i,{children:"3 \\times 3"}),` entsteht pro Eintrag ein Rechenschritt. In welcher Reihenfolge
füllt sich `,e.jsx(i,{children:"\\bL"}),"?"]}),e.jsx(ln,{}),e.jsx(n.p,{children:`Der Stepper macht die spaltenweise Reihenfolge sichtbar: Auf einen
Diagonaleintrag folgen die Einträge darunter.`})]}),`
`,e.jsx(n.h3,{children:"Anwendung: korrelierte Zufallsvektoren simulieren"}),`
`,e.jsxs(n.p,{children:[`Zufallszahlengeneratoren liefern uns unabhängige Standardnormalvariablen,
also Vektoren `,e.jsx(i,{children:"\\bx"})," mit ",e.jsx(i,{children:"\\E[\\bx] = \\bnull"})," und ",e.jsx(i,{children:"\\var(\\bx) = \\bI_d"}),`.
Gebraucht werden in der Statistik aber meist `,e.jsx(n.em,{children:"korrelierte"}),` Ziehungen mit
vorgegebener Kovarianzmatrix `,e.jsx(i,{children:"\\bSigma"}),`. Der Cholesky-Faktor schlägt die
Brücke: Als lineare Abbildung verformt er unkorreliertes Rauschen in genau
die gewünschte Abhängigkeitsstruktur. Nachrechnen lässt sich das mit zwei
Eigenschaften des `,e.jsx(j,{id:"expected-value",children:"Erwartungswerts"}),`: Er ist linear, und
konstante Matrizen dürfen wir aus ihm herausziehen.`]}),`
`,e.jsxs(D,{kind:"Satz",label:"5.4.4 (Kovarianz unter dem Cholesky-Faktor)",id:"env-kovarianz-unter-dem-cholesky-faktor",children:[e.jsxs(n.p,{children:["Sei ",e.jsx(i,{children:"\\bx \\in \\R^d"})," ein Zufallsvektor mit ",e.jsx(i,{children:"\\E[\\bx] = \\bnull"}),` und
`,e.jsx(i,{children:"\\var(\\bx) = \\bI_d"}),", und sei ",e.jsx(i,{children:"\\bSigma \\in \\R^{d \\times d}"}),` SPD mit
Cholesky-Zerlegung `,e.jsx(i,{children:"\\bSigma = \\bL\\bL^\\top"}),". Dann hat ",e.jsx(i,{children:"\\by = \\bL\\bx"}),` den
Erwartungswert `,e.jsx(i,{children:"\\bnull"})," und die Kovarianzmatrix"]}),e.jsx(f,{children:"\\var(\\by) = \\bSigma ."})]}),`
`,e.jsx(ne,{children:e.jsxs(R,{why:e.jsxs(e.Fragment,{children:["der Erwartungswert ist linear und ",e.jsx(i,{children:"\\bL"})," eine feste, nicht zufällige Matrix, darf also aus ihm herausgezogen werden; für zentrierte Vektoren ist ",e.jsx(i,{children:"\\var(\\by) = \\E[\\by\\by^\\top]"}),", insbesondere ",e.jsx(i,{children:"\\E[\\bx\\bx^\\top] = \\var(\\bx) = \\bI_d"}),"; zuletzt die Zerlegung ",e.jsx(n.a,{href:"#eq-cholesky-zerlegung",children:"(5.4.1)"})]}),children:[e.jsxs(n.p,{children:["Wegen ",e.jsx(i,{children:"\\E[\\by] = \\bL\\,\\E[\\bx] = \\bnull"})," ist ",e.jsx(i,{children:"\\var(\\by) = \\E[\\by\\by^\\top]"}),`, und
damit`]}),e.jsx(f,{children:`\\var(\\by)
= \\E\\bigl[\\bL\\bx\\bx^\\top\\bL^\\top\\bigr]
= \\bL\\, \\E\\bigl[\\bx\\bx^\\top\\bigr]\\, \\bL^\\top
= \\bL\\, \\bI_d\\, \\bL^\\top
= \\bSigma .`})]})}),`
`,e.jsx(D,{kind:"Bemerkung",label:"5.4.5 (Ziehen aus der multivariaten Normalverteilung)",id:"env-ziehen-aus-der-multivariaten",children:e.jsxs(n.p,{children:["So simulieren wir aus ",e.jsx(i,{children:"\\Ncal(\\bmu, \\bSigma)"}),`: Wir erzeugen
`,e.jsx(i,{children:"\\bz \\sim \\Ncal(\\bnull, \\bI_d)"})," aus ",e.jsx(i,{children:"d"}),` unabhängigen
Standardnormalvariablen, berechnen einmal den Cholesky-Faktor `,e.jsx(i,{children:"\\bL"}),` von
`,e.jsx(i,{children:"\\bSigma"})," und geben ",e.jsx(i,{children:"\\bmu + \\bL\\bz"}),` zurück. Als lineare Transformation
eines normalverteilten Vektors ist `,e.jsx(i,{children:"\\bmu + \\bL\\bz"}),` wieder normalverteilt,
nach `,e.jsx(n.a,{href:"#env-kovarianz-unter-dem-cholesky-faktor",children:"Satz 5.4.4"})," mit Erwartungswert ",e.jsx(i,{children:"\\bmu"})," und Kovarianz ",e.jsx(i,{children:"\\bSigma"}),`. Die
Zerlegung bezahlen wir dabei nur einmal; jede weitere Ziehung kostet nur
noch ein Matrix-Vektor-Produkt.`]})}),`
`,e.jsxs(K,{title:"Wie L eine runde Punktwolke verformt",children:[e.jsxs(n.p,{children:["Welche Veränderung der Wolke erwarten wir, wenn ",e.jsx(i,{children:"|\\rho|"})," fast eins wird?"]}),e.jsxs(n.p,{children:["Im zweidimensionalen Fall lässt sich ",e.jsx(n.a,{href:"#env-kovarianz-unter-dem-cholesky-faktor",children:"Satz 5.4.4"}),` direkt ansehen. Aus
`,e.jsx(i,{children:"\\sigma_1"}),", ",e.jsx(i,{children:"\\sigma_2"})," und der Korrelation ",e.jsx(i,{children:"\\rho"})," bauen wir"]}),e.jsx(f,{children:"\\bSigma = \\begin{pmatrix} \\sigma_1^2 & \\rho\\,\\sigma_1\\sigma_2 \\\\ \\rho\\,\\sigma_1\\sigma_2 & \\sigma_2^2 \\end{pmatrix},"}),e.jsxs(n.p,{children:["und ",e.jsx(n.a,{href:"#eq-eq-5-4-2",children:"(5.4.2)"})," liefert den Cholesky-Faktor in geschlossener Form:"]}),e.jsx(f,{children:"\\bL = \\begin{pmatrix} \\cgreen{\\sigma_1} & 0 \\\\ \\cgreen{\\rho\\,\\sigma_2} & \\cgreen{\\sigma_2\\sqrt{1 - \\rho^2}} \\end{pmatrix} ."}),e.jsx(dn,{}),e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bL"})," streckt die erste Koordinate mit ",e.jsx(i,{children:"\\cgreen{\\sigma_1}"}),` und mischt der
zweiten über `,e.jsx(i,{children:"\\cgreen{\\rho\\,\\sigma_2}"}),` einen Anteil davon bei: Aus der runden
Wolke wird eine gestreckte, für `,e.jsx(i,{children:"\\rho \\neq 0"})," geneigte Ellipse. Läuft ",e.jsx(i,{children:"|\\rho|"}),`
gegen eins, geht der Eintrag
`,e.jsx(i,{children:"\\cgreen{\\sigma_2\\sqrt{1 - \\rho^2}}"}),` gegen null, die Wolke fällt auf eine
Gerade zusammen und `,e.jsx(i,{children:"\\bSigma"})," wird singulär."]})]}),`
`,e.jsxs(C,{title:"Cholesky mit Pivotierung: semidefinite und rangdefiziente Matrizen",children:[e.jsxs(n.p,{children:["Was passiert, wenn ",e.jsx(i,{children:"\\bA"})," nur positiv ",e.jsx(n.em,{children:"semi"}),`definit ist (also
`,e.jsx(i,{children:"\\bx^\\top \\bA \\bx \\geq 0"})," statt ",e.jsx(i,{children:"> 0"}),"), etwa weil ",e.jsx(i,{children:"\\bA"}),` singulär ist? Oder
wenn `,e.jsx(i,{children:"\\bA"}),` zwar SPD, aber so
`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"schlecht konditioniert"}),` ist, dass Rundungsfehler
den Unterschied verwischen? Dann läuft der Koeffizientenvergleich
irgendwann auf eine Wurzel aus null oder sogar aus einer negativen Zahl,
und die gewohnte Rechnung bricht zusammen. Die Rettung kennen wir sinngemäß schon von der LU-Zerlegung:
Pivotierung. Diesmal vertauschen wir Zeilen `,e.jsx(n.em,{children:"und"}),` Spalten symmetrisch
(`,e.jsx(n.em,{children:"complete pivoting"}),"), damit die Symmetrie erhalten bleibt:"]}),e.jsx(f,{children:"\\bP^\\top \\bA \\bP = \\bL \\bL^\\top"}),e.jsxs(n.p,{children:["mit einer ",e.jsx(j,{id:"permutation-matrix",children:"Permutationsmatrix"})," ",e.jsx(i,{children:"\\bP"}),`. Diese
Variante hat bemerkenswerte Eigenschaften:`]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rang-aufdeckend:"})," Nullspalten in ",e.jsx(i,{children:"\\bL"}),` zeigen direkt den Rangabfall
von `,e.jsx(i,{children:"\\bA"})," an; die Zerlegung bestimmt also nebenbei den Rang der Matrix."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Stabil:"}),` Auch für semidefinite Matrizen bleibt die pivotierte
Cholesky-Zerlegung numerisch stabil
(`,e.jsx(n.a,{href:"https://eprints.maths.manchester.ac.uk/1193/1/high90c.pdf",children:"Higham, 1990"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Praktisch relevant"}),` in Statistik und ML: für Kernel-Matrizen
(Gauß-Prozesse, SVMs), für niedrig-rangige approximative Zerlegungen
mit Aufwand `,e.jsx(i,{children:"O(k^2 n)"})," statt ",e.jsx(i,{children:"O(n^3)"})," bei Abbruch nach ",e.jsx(i,{children:"k"}),` Spalten,
und für Gram-Matrizen `,e.jsx(i,{children:"\\bX^\\top\\bX"})," im Fall ",e.jsx(i,{children:"p > n"}),` (mehr Merkmale als
Beobachtungen), die zwangsläufig singulär sind.`]}),`
`]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.5 (spezielle lineare Systeme, insbesondere
symmetrische und positiv definite Matrizen).`})})]})}function on(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Me,{...r})}):Me(r)}function Ee(r){const n={a:"a",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:[`Zum Abschluss stellen wir die beiden Zerlegungen dieses Kapitels
nebeneinander. Beide lösen `,e.jsx(i,{children:"\\bA\\bx = \\bb"}),` nach demselben Plan: einmal
zerlegen, dann pro rechter Seite zwei
`,e.jsx(j,{id:"triangular-solve",children:"Dreieckssysteme"}),` substituieren. Die Unterschiede
liegen in den Voraussetzungen, im Aufwand und in der
`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.3",children:"Stabilität"}),"."]}),`
`,e.jsx(n.h3,{children:"LU und Cholesky im Vergleich"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{}),e.jsx(n.th,{children:e.jsx(n.a,{href:"#sec-5.3",children:"LU-Zerlegung"})}),e.jsx(n.th,{children:e.jsx(n.a,{href:"#sec-5.4",children:"Cholesky-Zerlegung"})})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Zerlegung"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"})}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bL\\bL^\\top"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"geeignet für"}),e.jsx(n.td,{children:"jede invertierbare Matrix"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"#sec-5.4",children:"SPD-Matrizen"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Pivotierung"}),e.jsx(n.td,{children:"für die Stabilität nötig"}),e.jsx(n.td,{children:"nicht nötig"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Aufwand"}),e.jsxs(n.td,{children:["rund ",e.jsx(i,{children:"n^3/3"})," Multiplikationen"]}),e.jsxs(n.td,{children:["rund ",e.jsx(i,{children:"n^3/6"}),", also halb so viel"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"scheitert"}),e.jsx(n.td,{children:"ohne Pivotierung an Nullpivots; kleine Pivots machen sie instabil"}),e.jsx(n.td,{children:"in exakter Arithmetik bei nicht-SPD-Matrizen; numerisch eventuell nahe der Semidefinitheitsgrenze"})]})]})]}),`
`,e.jsxs(n.p,{children:["Die Stabilität der LU-Zerlegung entscheidet sich am Pivot (",e.jsx(n.a,{href:"#sec-5.3",children:"Abschnitt 5.3"}),`):
Partielle Pivotierung hält alle Multiplikatoren im Betrag bei höchstens 1.
Ein Stabilitätsbeweis ist das nicht, aber in der Praxis gilt die pivotierte
LU-Zerlegung als stabil
(`,e.jsx(n.a,{href:"https://nhigham.com/2020/07/14/what-is-the-growth-factor-for-gaussian-elimination/",children:"Higham, 2020"}),`).
Perfekte Genauigkeit bekommen wir auch damit nicht: Selbst ein stabiler
Algorithmus liefert nur eine Näherung, deren relativer Fehler in der
Größenordnung `,e.jsx(i,{children:"\\corange{\\kappa(\\bA)} \\cdot \\eps"}),` liegen kann, mit der
`,e.jsx(n.a,{href:"?k=04-fehler#sec-4.2",children:"Konditionszahl"})," ",e.jsx(i,{children:"\\corange{\\kappa(\\bA)}"}),` aus
`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),` und der
`,e.jsx(j,{id:"machine-epsilon",children:"Maschinengenauigkeit"})," ",e.jsx(i,{children:"\\eps"}),". Ist ",e.jsx(i,{children:"\\bA"}),` schlecht
konditioniert, liegt das am Problem, nicht am Algorithmus.`]}),`
`,e.jsxs(n.p,{children:[`Die Cholesky-Zerlegung braucht für eine SPD-Matrix keine Pivotierung und ist
rückwärtsstabil. In exakter Arithmetik läuft sie für jede SPD-Matrix durch und
scheitert für Matrizen, die nicht positiv definit sind. In Gleitkommaarithmetik kann
eine Matrix nahe der Grenze zur Semidefinitheit wegen Daten- oder Rundungsfehlern als
nicht positiv definit erscheinen. Ein Abbruch ist daher ein Diagnosehinweis, aber
kein Beweis dafür, dass allein eine große Konditionszahl die Ursache war. Für nur
`,e.jsx(n.em,{children:"semi"}),`definite Matrizen springt die pivotierte
Variante `,e.jsx(i,{children:"\\bP^\\top \\bA \\bP = \\bL\\bL^\\top"}),` ein
(`,e.jsx(n.a,{href:"#sec-5.4",children:"Abschnitt 5.4"}),")."]}),`
`,e.jsx(n.h3,{children:"Was wir mitnehmen"}),`
`,e.jsx(n.p,{children:"Drei Botschaften bleiben:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Für ein LGS keine explizite Inverse bilden."})," Wo in einer Formel ",e.jsx(i,{children:"\\bA^{-1}\\bb"}),`
steht, lösen wir in der Implementierung direkt das LGS `,e.jsx(i,{children:"\\bA\\bx = \\bb"}),`
(`,e.jsx(n.a,{href:"#env-fuer-ein-lgs-keine-explizite-inverse",children:"Bemerkung 5.2.1"})," in ",e.jsx(n.a,{href:"#sec-5.2",children:"Abschnitt 5.2"}),")."]}),`
`,e.jsxs(n.li,{children:["Die ",e.jsx(n.strong,{children:"LU-Zerlegung"})," ",e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),` ist die Gauß-Elimination in
Matrixform: einmal zerlegen für `,e.jsx(i,{children:"O(n^3)"}),`, danach kostet jede weitere
rechte Seite nur noch `,e.jsx(i,{children:"O(n^2)"}),"."]}),`
`,e.jsxs(n.li,{children:["Die ",e.jsx(n.strong,{children:"Cholesky-Zerlegung"})," ",e.jsx(i,{children:"\\bA = \\bL\\bL^\\top"}),` nutzt Symmetrie und
Definitheit aus, halbiert den Aufwand und liefert nebenbei das Werkzeug,
mit dem wir korrelierte Zufallsvektoren simulieren
(`,e.jsx(n.a,{href:"#sec-5.4",children:"Abschnitt 5.4"}),`). Kovarianz- und Gram-Matrizen tragen diese Struktur von
Haus aus, Hesse-Matrizen nur unter zusätzlichen Krümmungsannahmen.`]}),`
`]}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.a,{href:"?k=06-svd",children:"Kapitel 6"}),` lernen wir mit der
`,e.jsx(j,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` (SVD) die
vielseitigste aller Matrixzerlegungen kennen; sie funktioniert für
beliebige, auch nicht quadratische Matrizen.`]}),`
`,e.jsx(n.h3,{children:"Selbsttest"}),`
`,e.jsx(n.p,{children:"Prüfen wir die Kernaussagen des Kapitels."}),`
`,e.jsxs(G,{children:[e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Um ",e.jsx(i,{children:"\\bA\\bx = \\bb"}),` numerisch zu lösen, berechnen wir am besten zuerst
`,e.jsx(i,{children:"\\bA^{-1}"})," und bilden dann das Produkt ",e.jsx(i,{children:"\\bA^{-1}\\bb"}),"."]}),e.jsxs(n.p,{children:["Das explizite Invertieren löst versteckt ",e.jsx(i,{children:"n"}),` Gleichungssysteme statt
einem. Die Größenordnung `,e.jsx(i,{children:"O(n^3)"}),` bleibt dabei zwar erhalten, weil eine
Zerlegung für alle `,e.jsx(i,{children:"n"}),` rechten Seiten reicht, doch der Umweg kostet ein
Mehrfaches an Rechenzeit und stapelt zusätzliche Rundungsfehler auf. Wir
lösen stattdessen direkt das LGS (`,e.jsx(n.a,{href:"#env-fuer-ein-lgs-keine-explizite-inverse",children:"Bemerkung 5.2.1"}),")."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(n.p,{children:["Liegt ",e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),` einmal vor, kostet jede weitere rechte Seite
`,e.jsx(i,{children:"\\bb"})," nur noch ",e.jsx(i,{children:"O(n^2)"})," Operationen."]}),e.jsxs(n.p,{children:[`Pro rechter Seite fallen eine Vorwärts- und eine Rückwärtssubstitution
an, zusammen rund `,e.jsx(i,{children:"n^2"})," Multiplikationen (",e.jsx(n.a,{href:"#env-komplexitaet-der-lu-zerlegung",children:"Satz 5.3.9"}),`); die teure
Zerlegung hängt nicht von `,e.jsx(i,{children:"\\bb"})," ab."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(n.p,{children:["Jede invertierbare Matrix ",e.jsx(i,{children:"\\bA"})," besitzt eine Zerlegung ",e.jsx(i,{children:"\\bA = \\bL\\bU"}),"."]}),e.jsxs(n.p,{children:[`Schon die Vertauschungsmatrix
`,e.jsx(i,{children:"\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}"}),` startet mit dem Pivot
`,e.jsx(i,{children:"\\cred{0}"})," und hat keine LU-Zerlegung (",e.jsx(n.a,{href:"#env-invertierbar-aber-keine-lu-zerlegung",children:"Beispiel 5.3.6"}),`). Mit
Zeilenvertauschungen existiert aber immer `,e.jsx(i,{children:"\\bP\\bA = \\bL\\bU"}),`
(`,e.jsx(n.a,{href:"#env-existenz-der-lu-zerlegung",children:"Satz 5.3.5"}),")."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(n.p,{children:["Eine einzige Richtung ",e.jsx(i,{children:"\\bx \\neq \\bnull"})," mit ",e.jsx(i,{children:"\\bx^\\top\\bA\\bx \\leq 0"}),` widerlegt,
dass `,e.jsx(i,{children:"\\bA"})," positiv definit ist."]}),e.jsxs(n.p,{children:[e.jsx(n.a,{href:"#env-spd-matrix",children:"Definition 5.4.1"})," verlangt strikte Positivität für ",e.jsx(n.em,{children:"alle"}),` von null
verschiedenen Richtungen; ein Gegenbeispiel genügt daher zum Widerlegen.
Umgekehrt beweist keine noch so lange Liste bestandener Richtungen die
Definitheit.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsx(n.p,{children:`Für eine SPD-Matrix ist die Cholesky-Zerlegung etwa doppelt so schnell
wie die LU-Zerlegung und kommt ohne Pivotierung aus.`}),e.jsxs(n.p,{children:["Wegen ",e.jsx(i,{children:"\\bU = \\bL^\\top"}),` muss nur ein Faktor berechnet und gespeichert
werden, rund `,e.jsx(i,{children:"n^3/6"})," statt ",e.jsx(i,{children:"n^3/3"}),` Multiplikationen; und die positive
Definitheit garantiert positive Pivots, sodass kein Tauschen nötig ist
(`,e.jsx(n.a,{href:"#sec-5.4",children:"Abschnitt 5.4"}),")."]})]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §2.4 (LU-Zerlegung, Pivotierung, Stabilität) und §2.5
(SPD-Systeme und Cholesky).`})})]})}function xn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Ee,{...r})}):Ee(r)}const mn={sections:[{id:"5.1",key:"grundlagen",title:"Numerische lineare Algebra: Grundlagen",C:V(qe)},{id:"5.2",key:"lgs",title:"Lineare Gleichungssysteme",C:V(He)},{id:"5.3",key:"lu",title:"Die LU-Zerlegung",C:V(sn)},{id:"5.4",key:"cholesky",title:"Die Cholesky-Zerlegung",C:V(on)},{id:"5.5",key:"zusammenfassung",title:"Zusammenfassung",C:V(xn)}]};export{mn as default};
