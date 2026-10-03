import{r as A,d as L,g as z,j as e,A as ee,T as on,F as E,S as ue,k as je,V as H,s as xn,L as Be,C as s,M as n,E as g,b as l,G as V,P as C,o as w,Q as O,Z as Pe,i as S,u as gn,D as bn,h as un,p as We,y as jn,N as mn,z as fn,m as U}from"./index-BGJgxqST.js";import{E as M,I as J}from"./Interaktiv-Bbglsg7Y.js";const T=[-1/Math.sqrt(5),2/Math.sqrt(5)],fe=[2/Math.sqrt(5),1/Math.sqrt(5)],kn=4/9,rn=18,ke=(r,i)=>r[0]*i[0]+r[1]*i[1],sn=r=>[5*r[0]-2*r[1],-2*r[0]+8*r[1]],pn=r=>{const i=Math.hypot(...r);return[r[0]/i,r[1]/i]},vn=r=>[Math.cos(r*Math.PI/180),Math.sin(r*Math.PI/180)],pe=r=>Math.atan2(r[1],r[0])*180/Math.PI;function zn(r){const i=[r];for(let t=1;t<=rn;t+=1)i.push(pn(sn(i[t-1])));return i}function wn(){const[r,i]=A.useState(33),[t,a]=A.useState(0),o=vn(r),c=A.useMemo(()=>zn(o),[r]),h=c[t],d=ke(o,T),x=ke(o,fe),b=Math.abs(h[0]*T[1]-h[1]*T[0]),k=t?Math.abs(c[t-1][0]*T[1]-c[t-1][1]*T[0]):NaN,m=ke(h,sn(h)),v=t&&k>1e-12?b/k:NaN,f=Math.abs(d)<1e-8,D=Math.abs(x)<1e-8,q=u=>{i(pe(u)),a(0)},_=!f&&Math.abs(d)<.02,p=f?`Der Start liegt exakt auf v₂. Sein v₁-Anteil ist null; A x⁽⁰⁾ = 4 x⁽⁰⁾, die normierte Iterierte bleibt für immer stehen, und beide Schätzungen liefern hartnäckig 4 statt 9. Das ist der Ausnahmefall aus ${L("bemerkung:wann-die-potenzmethode-versagt")}.`:D?`Der Start liegt bereits auf v₁. Die Normierung hebt die Streckung mit λ₁ = 9 auf; mehr Konvergenz ist nicht zu sehen. ${L("satz:konvergenz-der-potenzmethode")} ist sofort erfüllt.`:_?`Fast, aber nicht ganz auf v₂: c₁ = ${z(d,4)} ist winzig, aber ungleich null. ${L("satz:konvergenz-der-potenzmethode")} greift also – nur muss die Iteration diesen Anteil erst über viele Schritte aufblasen. Der Winkelrest steht bei ${z(b,4)}.`:t===0?`Noch sehen wir nur den Start. Sein von null verschiedener v₁-Anteil erfüllt die Voraussetzung von ${L("satz:konvergenz-der-potenzmethode")}.`:t<3?`Der Winkelrest beträgt ${z(b,4)}. Noch dominiert der v₂-Anteil, die beobachtete Rate ${z(v,3)} sagt deshalb wenig; ${L("satz:konvergenz-der-potenzmethode")} macht eine Aussage über das Langzeitverhalten. Der Rayleigh-Quotient ist ${z(m,4)}.`:`Der Winkelrest beträgt ${z(b,4)}; die beobachtete Rate ${z(v,3)} nähert sich der Rate |λ₂/λ₁| = ${z(kn,3)} aus ${L("satz:konvergenz-der-potenzmethode")}. Der Rayleigh-Quotient ist ${z(m,4)}.`;return e.jsxs("div",{className:"space-y-2",children:[e.jsx(ee,{children:"Ziehen wir den blauen Startvektor auf dem Kreis und verfolgen wir anschließend die Schritte."}),e.jsx(on,{matrix:[[1,0],[0,1]],size:300,worldHalf:1.3,showGrid:!1,vectors:[{v:T,color:E.gruen,label:"v₁"},{v:fe,color:E.grau,label:"v₂"},...c.slice(0,t+1).map((u,y)=>({v:u,color:E.blau,label:y===t?`x⁽${t}⁾`:void 0,draggable:y===0,dragConstraint:"unitCircle"}))],onVectorChange:(u,y)=>{u===2&&q(y)},ariaLabel:`Potenzmethode im Schritt ${t}; der blaue Vektor ist auf dem Einheitskreis ziehbar.`}),e.jsx(ue,{label:"Winkel von x⁽⁰⁾",value:r,onChange:u=>{i(u),a(0)},min:-180,max:180,step:1,unit:"°",accent:E.blau}),e.jsx("div",{className:"flex flex-wrap gap-2",children:[{text:"Beispiel aus dem Text",value:33},{text:"Versagensfall v₂",value:pe(fe)},{text:"Volltreffer v₁",value:pe(T)}].map(({text:u,value:y})=>e.jsx("button",{type:"button",className:"rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600",onClick:()=>{i(y),a(0)},children:u},u))}),e.jsx(je,{step:t,setStep:a,max:rn,narration:`x⁽${t}⁾ = (${z(h[0],3)}; ${z(h[1],3)}), c₁ = ${z(d,3)}, c₂ = ${z(x,3)}.`}),e.jsx(H,{kind:f?"warn":D?"ok":_?"warn":t>0&&b<=.1?"ok":"neutral",children:p})]})}const{blau:Sn,gruen:An,orange:ve,rot:ze,grau:ne}=E,tn=40,Ke=(r,i)=>[[r[0][0]*i[0][0]+r[0][1]*i[1][0],r[0][0]*i[0][1]+r[0][1]*i[1][1]],[r[1][0]*i[0][0]+r[1][1]*i[1][0],r[1][0]*i[0][1]+r[1][1]*i[1][1]]];function _n(r){const i=[r[0][0],r[1][0]],t=[r[0][1],r[1][1]],a=Math.hypot(i[0],i[1]),o=a>1e-14?[i[0]/a,i[1]/a]:[1,0],c=o[0]*t[0]+o[1]*t[1],h=[t[0]-c*o[0],t[1]-c*o[1]],d=Math.hypot(h[0],h[1]),x=d>1e-14?[h[0]/d,h[1]/d]:[-o[1],o[0]];return{Q:[[o[0],x[0]],[o[1],x[1]]],R:[[a,c],[0,d]]}}function Dn(r){const i=[];let t=r.map(o=>[...o]),a=[[1,0],[0,1]];i.push({A:t,Q:a,R:a,Qacc:a});for(let o=1;o<=tn&&t.every(d=>d.every(x=>Number.isFinite(x)));o++){const{Q:c,R:h}=_n(t);t=Ke(h,c),a=Ke(a,c),i.push({A:t,Q:c,R:h,Qacc:a})}return i}const $=r=>z(r,3);function yn(r){const i=r[0][0]+r[1][1],t=r[0][0]*r[1][1]-r[0][1]*r[1][0],a=i*i-4*t;if(a<0)return{reell:!1,l1:i/2,l2:i/2,im:Math.sqrt(-a)/2};const o=Math.sqrt(a),c=(i+o)/2,h=(i-o)/2;return Math.abs(c)>=Math.abs(h)?{reell:!0,l1:c,l2:h,im:0}:{reell:!0,l1:h,l2:c,im:0}}function ae({m:r,farbe:i}){return e.jsx("span",{className:"inline-grid grid-cols-2 gap-px rounded border-x-2 border-slate-500 px-1.5 py-1 align-middle",children:r.map((t,a)=>t.map((o,c)=>e.jsx("span",{className:"px-1 text-center font-mono text-xs",style:{color:i==null?void 0:i(a,c)},children:$(o)},`${a}-${c}`)))})}function En(){const[r,i]=A.useState([[5,-2],[-2,8]]),[t,a]=A.useState(0),o=A.useMemo(()=>Dn(r),[r]),c=Math.max(0,o.length-1),h=Math.min(t,c),d=o[h],x=yn(r),b=x.reell&&Math.abs(x.l1)>1e-12?Math.abs(x.l2/x.l1):NaN,k=I=>Math.abs(I.A[1][0]),m=k(d),v=h>0?k(o[h-1]):NaN,f=v>0?m/v:NaN,D=h===0?"erst ab k = 1":v>0?$(f):"nicht definiert, die Nebendiagonale war schon null",q=Math.abs(r[0][1]-r[1][0])<1e-12,p=Math.abs(d.A[0][0])>=Math.abs(d.A[1][1])?"Sie stehen absteigend nach Betrag.":"Sie stehen hier aufsteigend nach Betrag: Eine Matrix in Dreiecksgestalt ist ein Fixpunkt der Iteration, umsortiert wird nichts.",u=A.useMemo(()=>o.map((I,X)=>({x:X,y:Math.log10(k(I)),color:ze})).filter(I=>Number.isFinite(I.y)&&I.y>-17),[o]),y=k(o[0]),j=A.useMemo(()=>Number.isFinite(b)&&b>0&&y>0?[{f:I=>Math.log10(y)+I*Math.log10(b),color:ve,dash:[5,4]}]:[],[b,y]),N=I=>{i(I),a(0)};return e.jsxs("div",{children:[e.jsx(ee,{children:"Wählen wir eine Matrix und verfolgen wir, ob der rote Eintrag unter der Diagonale verschwindet."}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-3 text-sm",children:[e.jsx("span",{children:"A ="}),e.jsx(xn,{value:r,onChange:N,step:1}),e.jsx("button",{type:"button",className:"rounded border border-slate-400 px-2 py-0.5 text-xs",onClick:()=>N([[5,-2],[-2,8]]),children:"symmetrisches Beispiel"}),e.jsx("button",{type:"button",className:"rounded border border-slate-400 px-2 py-0.5 text-xs",onClick:()=>N([[2,3],[1,4]]),children:"unsymmetrisch"}),e.jsx("button",{type:"button",className:"rounded border border-slate-400 px-2 py-0.5 text-xs",onClick:()=>N([[0,-1],[1,0]]),children:"Drehung um 90°"})]}),e.jsx("div",{className:"my-2",children:e.jsx(je,{step:h,setStep:a,max:c,narration:"Ein QR-Schritt vertauscht RQ nach der Zerlegung A = QR."})}),e.jsxs("div",{className:"my-2 flex flex-wrap items-start gap-6",children:[e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{children:["A",e.jsxs("sup",{children:["(",h,")"]})," ="]}),e.jsx(ae,{m:d.A,farbe:(I,X)=>I===X?An:I>X?ze:void 0})]}),h>0?e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{children:["aus Q",e.jsxs("sup",{children:["(",h,")"]})," ="]}),e.jsx(ae,{m:d.Q}),e.jsxs("span",{children:["und R",e.jsxs("sup",{children:["(",h,")"]})," ="]}),e.jsx(ae,{m:d.R})]}):e.jsx("p",{style:{color:ne},children:"Noch nicht iteriert: A⁽⁰⁾ ist die Ausgangsmatrix."}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{children:["Q",e.jsx("sub",{children:h})," ="," ",h===0?"I, noch ist kein Faktor aufgesammelt:":e.jsxs(e.Fragment,{children:["Q",e.jsx("sup",{children:"(1)"}),"⋯Q",e.jsxs("sup",{children:["(",h,")"]})," ="]})]}),e.jsx(ae,{m:d.Qacc,farbe:()=>Sn})]}),e.jsx("p",{style:{color:ne},children:"Grün: die Diagonale, auf der die Eigenwerte erscheinen. Rot: der Eintrag unter der Diagonalen, der verschwinden soll. Blau: das aufgesammelte Produkt der Orthogonalmatrizen, dessen Spalten im symmetrischen Fall gegen die Eigenvektoren laufen."}),e.jsxs("div",{children:[e.jsxs("span",{style:{color:ze},children:["|a₂₁| = ",$(m)]}),e.jsx("span",{style:{color:ne},children:" , Schrumpffaktor gegenüber dem Vorschritt: "}),e.jsx("span",{style:{color:ve},children:D})]}),e.jsx("div",{style:{color:ne},children:x.reell?e.jsxs(e.Fragment,{children:["exakte Eigenwerte: λ₁ = ",$(x.l1),", λ₂ = ",$(x.l2),"; vorhergesagte Rate |λ₂/λ₁| = ",e.jsx("span",{style:{color:ve},children:$(b)})]}):e.jsxs(e.Fragment,{children:["exakte Eigenwerte: ",$(x.l1)," ± ",$(x.im),"·i, also komplex und betragsgleich"]})})]}),e.jsxs("div",{children:[e.jsx(Be,{xLabel:"Iteration k",yLabel:"log₁₀ |a₂₁|",series:j,markers:u,xDomain:[0,tn],yDomain:[-16,2],width:300,height:200,ariaLabel:"Betrag der Nebendiagonalen von A hoch k, logarithmisch über der Iterationszahl, mit der Theoriegeraden aus der Rate."}),e.jsx("p",{className:"mt-1 max-w-[19rem] text-xs",style:{color:ne},children:"Rote Punkte: der Betrag der Nebendiagonalen, logarithmisch aufgetragen. Die orange Gerade ist die Vorhersage aus der Rate |λ₂/λ₁|; eine Gerade im Log-Bild bedeutet lineare Konvergenz."})]})]}),e.jsx(H,{kind:!x.reell||Math.abs(b-1)<1e-9?"warn":m<1e-9?"ok":"neutral",children:x.reell?Math.abs(b-1)<1e-9?"Beide Eigenwerte haben denselben Betrag. Die Rate ist 1, die Nebendiagonale schrumpft nicht mehr, und die Voraussetzung der Konvergenzaussage ist verletzt.":m<1e-9?q?`Die Nebendiagonale ist auf Rechengenauigkeit verschwunden: A⁽ᵏ⁾ ist diagonal, auf der Diagonalen stehen die Eigenwerte. ${p} Weil A symmetrisch ist, sind die Spalten von Q_k jetzt Eigenvektoren, bis aufs Vorzeichen.`:`Die Nebendiagonale ist auf Rechengenauigkeit verschwunden: A⁽ᵏ⁾ ist obere Dreiecksmatrix mit den Eigenwerten auf der Diagonalen. ${p} Der Eintrag rechts oben bleibt stehen, denn eine unsymmetrische Matrix wird nur dreieckig, nicht diagonal.`:"Der rote Eintrag schrumpft in jedem Schritt ungefähr um den Faktor |λ₂/λ₁|, die Diagonale wandert dabei auf die Eigenwerte zu. Klicken wir uns weiter, bis der Schrumpffaktor die vorhergesagte Rate trifft.":"Diese Matrix hat komplexe Eigenwerte gleichen Betrags. Eine reelle obere Dreiecksmatrix müsste die Eigenwerte auf der Diagonalen zeigen, also reelle Eigenwerte haben. Die Iteration kann deshalb nicht konvergieren: Q ist hier die Drehung selbst, R die Einheitsmatrix, und A⁽ᵏ⁾ bleibt stehen, wo es war."})]})}function Ge(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Die numerische lineare Algebra ist ein großes Feld. Bisher haben wir vor
allem eine ihrer Kernideen genutzt, die `,e.jsx(i.em,{children:"Matrixzerlegung"}),`: LU, Cholesky, QR
und die SVD schreiben die Matrix als Produkt von Faktoren mit handlicher
Struktur und rechnen dann mit diesen Faktoren weiter. In diesem Kapitel
kommen zwei weitere Kernideen dazu:`]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Iterative Methoden"}),` erzeugen eine Folge von Näherungen und brechen ab,
sobald eine davon genau genug ist. Sie tauschen Genauigkeit gegen Laufzeit.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Probabilistische Methoden"}),` ersetzen ein großes Problem durch ein kleineres,
dessen Lösung der gesuchten mit hoher Wahrscheinlichkeit sehr nahe kommt.`]}),`
`]}),`
`,e.jsxs(i.p,{children:[`An beiden wird aktiv geforscht. Die iterative Idee behandeln wir am
Eigenwertproblem (dieser Abschnitt und `,e.jsx(i.a,{href:"#sec-8.2",children:"Abschnitt 8.2"}),`) und an linearen
Gleichungssystemen (`,e.jsx(i.a,{href:"#sec-8.3",children:"Abschnitt 8.3"}),`), die probabilistische in
`,e.jsx(i.a,{href:"#sec-8.4",children:"Abschnitt 8.4"}),"."]}),`
`,e.jsx(i.h3,{children:"Was wir mitbringen"}),`
`,e.jsx(i.p,{children:"Aus den bisherigen Kapiteln brauchen wir:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["die Komplexitätsanalyse mit der ",e.jsxs(s,{id:"big-o-notation",children:[e.jsx(n,{children:"O"}),"-Notation"]}),`
(`,e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),"),"]}),`
`,e.jsxs(i.li,{children:["Kondition und Stabilität (",e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),", ",e.jsx(i.a,{href:"?k=04-fehler#sec-4.3",children:"Abschnitt 4.3"}),"),"]}),`
`,e.jsxs(i.li,{children:[e.jsx(s,{id:"orthogonal-matrix",children:"Orthogonalmatrizen"}),`
(`,e.jsx(s,{id:"env:operatornormen-orthogonalmatrix",href:"?k=03-matrix-spur-norm#env-operatornormen-orthogonalmatrix",children:"Definition 3.3.5"}),`) und die Spektralnorm
`,e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_2"})," (",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),"),"]}),`
`,e.jsxs(i.li,{children:[`lineare Gleichungssysteme samt ihrer direkten Lösungsverfahren
(`,e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"}),") und die ",e.jsx(s,{id:"env:qr-zerlegung",children:"QR-Zerlegung"})," (",e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),")."]}),`
`]}),`
`,e.jsxs(i.p,{children:[`Aus der linearen Algebra kommen
`,e.jsx(s,{id:"eigenvalue-eigenvector",children:"Eigenwerte und Eigenvektoren"}),` und
`,e.jsx(s,{id:"similar-matrices",children:"Ähnlichkeitstransformationen"})," ",e.jsx(n,{children:"\\bB = \\bQ\\bA\\bQ^{-1}"}),`
dazu, aus der Analysis die `,e.jsx(s,{id:"convergence",children:"Konvergenz von Folgen"}),` und die
`,e.jsx(s,{id:"geometric-series",children:"geometrische Reihe"})," ",e.jsx(n,{children:"\\sum_{k \\geq 0} p^k = 1/(1-p)"}),`
für `,e.jsx(n,{children:"|p| < 1"}),`, in
`,e.jsx(i.a,{href:"#sec-8.4",children:"Abschnitt 8.4"})," außerdem Zufallsvektoren."]}),`
`,e.jsx(i.h3,{children:"Eigenwerte ohne charakteristisches Polynom"}),`
`,e.jsxs(i.p,{children:["Gesucht sind Paare aus Eigenwert und Eigenvektor, also ",e.jsx(n,{children:"\\lambda"}),` und
`,e.jsx(n,{children:"\\bv \\neq \\bnull"})," mit ",e.jsx(n,{children:"\\bA\\bv = \\lambda\\bv"}),`. Ein direktes Verfahren dafür
kennen wir aus der linearen Algebra: die Nullstellen des charakteristischen
Polynoms `,e.jsx(n,{children:"\\det(\\bA - \\lambda\\bI) = 0"}),`. Als Algorithmus taugt dieser Weg
allerdings wenig.`]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.1.1 (Warum das charakteristische Polynom kein Algorithmus ist)",id:"env-warum-das-charakteristische-polynom-kein",children:[e.jsxs(i.p,{children:["Für eine ",e.jsx(n,{children:"n \\times n"}),`-Matrix hat das
`,e.jsx(s,{id:"characteristic-polynomial",children:"charakteristische Polynom"})," den Grad ",e.jsx(n,{children:"n"}),`. Das bringt
drei Probleme mit sich:`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Ab ",e.jsx(n,{children:"n \\geq 5"}),` gibt es keine allgemeine Lösungsformel für
`,e.jsx(s,{id:"polynomial-roots",children:"Polynomnullstellen"}),` mehr. Wir müssten die Nullstellen
also ohnehin iterativ suchen und hätten nichts gewonnen.`]}),`
`,e.jsxs(i.li,{children:[`Der Umweg über die Koeffizienten ist numerisch instabil: Winzige Störungen
der Koeffizienten können die Nullstellen weit verschieben, das Problem ist
also schlecht konditioniert (`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]}),`
`,e.jsxs(i.li,{children:["Er ist teuer. Schon das Aufstellen der Koeffizienten kostet ",e.jsx(n,{children:"O(n^4)"}),` oder
mehr, während wir für eine ganze Matrixzerlegung mit `,e.jsx(n,{children:"O(n^3)"})," auskommen."]}),`
`]})]}),`
`,e.jsx(i.p,{children:`Auch die numerische lineare Algebra kennt direkte Eigenwertverfahren. In drei
Situationen iterieren wir trotzdem lieber:`}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["bei großen Matrizen (",e.jsx(n,{children:"n > 1000"}),"), wo ",e.jsx(n,{children:"O(n^3)"})," zu teuer wird,"]}),`
`,e.jsxs(i.li,{children:["bei ",e.jsx(s,{id:"sparse-matrix",children:"dünnbesetzten Matrizen"}),`, deren Struktur direkte
Verfahren zerstören, weil sie die Nullen mit Zwischenergebnissen auffüllen,`]}),`
`,e.jsxs(i.li,{children:[`wenn wir gar nicht alle Eigenwerte brauchen, sondern nur wenige, etwa die
`,e.jsx(n,{children:"k \\ll n"})," größten."]}),`
`]}),`
`,e.jsxs(i.p,{children:[`Iterative Verfahren kommen oft mit
`,e.jsx(s,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkten"}),` als einziger Operation an
`,e.jsx(n,{children:"\\bA"}),` aus und nutzen so die Dünnbesetztheit. Über die Abbruchbedingung
steuern wir außerdem, wie viel Genauigkeit wir gegen Laufzeit tauschen.`]}),`
`,e.jsx(i.h3,{children:"Die Potenzmethode"}),`
`,e.jsxs(i.p,{children:["Das einfachste iterative Verfahren ist die ",e.jsx(i.em,{children:"Potenzmethode"}),` (power iteration,
nach von Mises). Sie berechnet den betragsgrößten Eigenwert
`,e.jsx(n,{children:"\\cgreen{\\lambda_1}"})," und einen zugehörigen Eigenvektor ",e.jsx(n,{children:"\\cgreen{\\bv_1}"}),`,
vorausgesetzt, dieser Eigenwert ist betragsmäßig von den übrigen getrennt.
Die Idee: Wir wenden `,e.jsx(n,{children:"\\bA"})," immer wieder an und normieren nach jedem Schritt."]}),`
`,e.jsxs(g,{kind:"Algorithmus",label:"8.1.2 (Potenzmethode)",id:"env-potenzmethode",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` und ein Startvektor
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}} \\neq \\bnull"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`Normiere den Start:
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}} \\leftarrow \\cblue{\\bx^{(0)}}/\\left\\|\\cblue{\\bx^{(0)}}\\right\\|"}),"."]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"k = 1, 2, \\dots"}),":",`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\by = \\bA\\,\\cblue{\\bx^{(k-1)}}"}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cblue{\\lambda^{(k)}} = \\left\\|\\by\\right\\|"}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(k)}} = \\by / \\cblue{\\lambda^{(k)}}"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`Brich ab, sobald das Residuum
`,e.jsx(n,{children:"\\cred{\\left\\|\\bA\\,\\cblue{\\bx^{(k)}} - \\cblue{\\lambda^{(k)}}\\,\\cblue{\\bx^{(k)}}\\right\\|}"}),`
klein genug ist.`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Pro Schritt fällt genau ein Matrix-Vektor-Produkt an. Für eine volle Matrix
kostet das `,e.jsx(n,{children:"O(n^2)"}),`, für eine dünnbesetzte nur so viel, wie sie Einträge
ungleich null hat. `,e.jsx(n,{children:"\\bA"})," selbst wird weder zerlegt noch umgeformt."]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.1.3 (Zwei Schätzungen für den Eigenwert)",id:"env-zwei-schaetzungen-fuer-den-eigenwert",children:[e.jsxs(i.p,{children:["Ohne Normierung, also für die rohe Iteration ",e.jsx(n,{children:"\\bz^{(k)} = \\bA\\bz^{(k-1)}"}),`,
wächst die Länge in jedem Schritt um ungefähr den Faktor `,e.jsx(n,{children:"|\\lambda_1|"}),`, und
der Quotient `,e.jsx(n,{children:"\\left\\|\\bz^{(k)}\\right\\|/\\left\\|\\bz^{(k-1)}\\right\\|"}),` strebt
gegen `,e.jsx(n,{children:"|\\lambda_1|"}),". In ",e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"})," ist der Nenner gleich ",e.jsx(n,{children:"1"}),`,
weil `,e.jsx(n,{children:"\\cblue{\\bx^{(k-1)}}"}),` normiert ist; derselbe Streckfaktor heißt dort
`,e.jsx(n,{children:"\\cblue{\\lambda^{(k)}} = \\left\\|\\bA\\,\\cblue{\\bx^{(k-1)}}\\right\\|"}),`. Weil eine
Länge kein Vorzeichen hat, konvergiert er gegen `,e.jsx(n,{children:"|\\cgreen{\\lambda_1}|"}),"."]}),e.jsxs(i.p,{children:["Das Vorzeichen bringt der ",e.jsx(i.em,{children:"Rayleigh-Quotient"})," mit,"]}),e.jsx(l,{children:`\\cblue{\\rho^{(k)}} = \\frac{\\cblue{\\bx^{(k)}}^\\top \\bA\\, \\cblue{\\bx^{(k)}}}{\\cblue{\\bx^{(k)}}^\\top \\cblue{\\bx^{(k)}}}
= \\cblue{\\bx^{(k)}}^\\top \\bA\\, \\cblue{\\bx^{(k)}} ,`}),e.jsxs(i.p,{children:["wobei der Nenner wegen der Normierung gleich ",e.jsx(n,{children:"1"})," ist."]})]}),`
`,e.jsxs(i.p,{children:["Warum funktioniert das? Sei ",e.jsx(n,{children:"\\bA"}),` diagonalisierbar mit Eigenvektoren
`,e.jsx(n,{children:"\\bv_1, \\dots, \\bv_n"}),`, und der Start habe die Darstellung
`,e.jsx(n,{children:"\\bx^{(0)} = \\sum_{i=1}^n c_i\\bv_i"}),". Wegen ",e.jsx(n,{children:"\\bA\\bv_i = \\lambda_i\\bv_i"}),` ist
`,e.jsx(n,{children:"\\bA^k\\bv_i = \\lambda_i^k\\bv_i"}),`, also
`,e.jsx(n,{children:"\\bA^k\\bx^{(0)} = \\sum_{i=1}^n c_i\\lambda_i^k\\bv_i"}),`. Klammern wir den größten
Faktor aus:`]}),`
`,e.jsx(V,{tag:"8.1.1",id:"eq-eq-8-1-1",children:`\\bA^k \\bx^{(0)}
= \\cgreen{\\lambda_1}^k \\Biggl( c_1 \\cgreen{\\bv_1}
+ \\underbrace{\\sum_{i=2}^n c_i \\Bigl(\\corange{\\tfrac{\\lambda_i}{\\lambda_1}}\\Bigr)^k \\bv_i}_{=\\ \\cred{\\bs_k}} \\Biggr) .`}),`
`,e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"|\\cgreen{\\lambda_1}|"})," echt größer als alle übrigen ",e.jsx(n,{children:"|\\lambda_i|"}),`, so
dämpft jede Anwendung von `,e.jsx(n,{children:"\\bA"})," die ",e.jsx(n,{children:"i"}),`-te Komponente gegenüber der ersten um
den Faktor `,e.jsx(n,{children:"\\corange{|\\lambda_i/\\lambda_1|} < 1"}),". Der rote Rest ",e.jsx(n,{children:"\\cred{\\bs_k}"}),`
geht deshalb gegen null, und nach dem Normieren bleibt `,e.jsx(n,{children:"\\pm\\cgreen{\\bv_1}"}),`
übrig, sofern `,e.jsx(n,{children:"c_1 \\neq 0"})," ist."]}),`
`,e.jsxs(g,{kind:"Satz",label:"8.1.4 (Konvergenz der Potenzmethode)",id:"env-konvergenz-der-potenzmethode",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` diagonalisierbar mit einer Basis aus normierten
Eigenvektoren `,e.jsx(n,{children:"\\bv_1, \\dots, \\bv_n"}),` und Eigenwerten
`,e.jsx(n,{children:"|\\cgreen{\\lambda_1}| > |\\lambda_2| \\geq \\cdots \\geq |\\lambda_n|"}),`. Der
Startvektor habe die Darstellung `,e.jsx(n,{children:"\\bx^{(0)} = \\sum_{i=1}^n c_i \\bv_i"}),` mit
`,e.jsx(n,{children:"c_1 \\neq 0"}),". Dann gilt für die Iterierten aus ",e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"})]}),e.jsx(l,{children:`\\cblue{\\bx^{(k)}} = \\pm\\cgreen{\\bv_1} + \\cred{\\br_k}
\\quad\\text{mit}\\quad
\\left\\|\\cred{\\br_k}\\right\\| \\leq C \\left(\\corange{\\left|\\tfrac{\\lambda_2}{\\lambda_1}\\right|}\\right)^k
\\quad\\text{für alle hinreichend großen } k`}),e.jsxs(i.p,{children:["und einer von ",e.jsx(n,{children:"k"})," unabhängigen Konstanten ",e.jsx(n,{children:"C"}),`, sowie
`,e.jsx(n,{children:"\\cblue{\\lambda^{(k)}} \\to |\\cgreen{\\lambda_1}|"}),`. Für
`,e.jsx(n,{children:"\\cgreen{\\lambda_1} > 0"})," ist das Vorzeichen dabei für alle ",e.jsx(n,{children:"k"}),` dasselbe, für
`,e.jsx(n,{children:"\\cgreen{\\lambda_1} < 0"})," wechselt es in jedem Schritt."]})]}),`
`,e.jsx(M,{title:"Beweis der Konvergenz der Potenzmethode",children:e.jsxs(C,{children:[e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["Dreiecksungleichung und ",e.jsx(n,{children:"\\left\\|\\bv_i\\right\\| = 1"}),"; danach ",e.jsx(n,{children:"|\\lambda_i| \\leq |\\lambda_2|"})," für alle ",e.jsx(n,{children:"i \\geq 2"}),". Die Potenzen einer Zahl mit Betrag kleiner als ",e.jsx(n,{children:"1"})," bilden eine Nullfolge"]}),children:[e.jsxs(i.p,{children:["Wir gehen von ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"}),` aus. Das Ausklammern ist erlaubt, weil
`,e.jsx(n,{children:"|\\lambda_1| > |\\lambda_2| \\ge 0"})," und damit ",e.jsx(n,{children:"\\lambda_1 \\neq 0"}),` ist. Der rote
Restterm verschwindet mit einer geometrischen Rate:`]}),e.jsx(l,{children:`\\left\\|\\cred{\\bs_k}\\right\\|
\\leq \\sum_{i=2}^n |c_i| \\left(\\corange{\\left|\\tfrac{\\lambda_i}{\\lambda_1}\\right|}\\right)^k
\\leq \\Bigl(\\sum_{i=2}^n |c_i|\\Bigr) \\left(\\corange{\\left|\\tfrac{\\lambda_2}{\\lambda_1}\\right|}\\right)^k
\\longrightarrow 0 .`}),e.jsxs(i.p,{children:["Übrig bleibt in der Klammer von ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"})," nur ",e.jsx(n,{children:"c_1\\cgreen{\\bv_1}"}),"."]})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["für ",e.jsx(n,{children:"k = 1"})," ist das die Vorschrift selbst; und ist ",e.jsx(n,{children:"\\bx^{(k-1)}"})," das normierte ",e.jsx(n,{children:"\\bA^{k-1}\\bx^{(0)}"}),", so ist ",e.jsx(n,{children:"\\bA\\bx^{(k-1)}"})," ein positives Vielfaches von ",e.jsx(n,{children:"\\bA^{k}\\bx^{(0)}"}),", und Normieren löscht diesen Faktor wieder aus"]}),children:[e.jsxs(i.p,{children:["Die Normierung in ",e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"})," ändert an der ",e.jsx(i.em,{children:"Richtung"}),` nichts. Per
Induktion gilt`]}),e.jsx(l,{children:"\\cblue{\\bx^{(k)}} = \\frac{\\bA^k \\bx^{(0)}}{\\left\\|\\bA^k \\bx^{(0)}\\right\\|} ."})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["Normieren ist stetig, solange der Nenner nicht gegen null geht, und ",e.jsx(n,{children:"\\left\\|\\bw_k\\right\\| \\to |c_1| > 0"})]}),children:[e.jsxs(i.p,{children:["Einsetzen von ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"}),` liefert die Behauptung: Mit
`,e.jsx(n,{children:"\\bw_k = c_1\\cgreen{\\bv_1} + \\cred{\\bs_k}"})," ist"]}),e.jsx(l,{children:`\\cblue{\\bx^{(k)}}
= \\frac{\\cgreen{\\lambda_1}^k \\bw_k}{\\left|\\cgreen{\\lambda_1}\\right|^k \\left\\|\\bw_k\\right\\|}
= \\sign(\\cgreen{\\lambda_1})^k \\cdot \\frac{\\bw_k}{\\left\\|\\bw_k\\right\\|}
\\longrightarrow \\pm \\cgreen{\\bv_1} ,`}),e.jsxs(i.p,{children:["denn ",e.jsx(n,{children:"\\bw_k \\to c_1\\cgreen{\\bv_1}"})," und ",e.jsx(n,{children:"c_1 \\neq 0"}),`. Das verbleibende
Vorzeichen ist das von `,e.jsx(n,{children:"c_1"}),`, multipliziert mit
`,e.jsx(n,{children:"\\sign(\\cgreen{\\lambda_1})^k"}),". Weil der Fehler in ",e.jsx(n,{children:"\\bw_k"}),` nach dem
ersten Beweisschritt wie `,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}^k"}),` fällt, tut es der Fehler des
normierten Vektors ebenso. Für die Eigenwertschätzung folgt schließlich`]}),e.jsx(l,{children:`\\cblue{\\lambda^{(k)}} = \\left\\|\\bA\\,\\cblue{\\bx^{(k-1)}}\\right\\|
\\longrightarrow \\left\\|\\bA(\\pm\\cgreen{\\bv_1})\\right\\| = |\\cgreen{\\lambda_1}| .`})]})]})}),`
`,e.jsxs(g,{kind:"Beispiel",label:"8.1.5 (Potenzmethode an einer 2×2-Matrix)",id:"env-potenzmethode-an-einer-2-2-matrix",children:[e.jsx(i.p,{children:"Sei"}),e.jsx(l,{children:"\\bA = \\begin{pmatrix} 5 & -2 \\\\ -2 & 8 \\end{pmatrix} ."}),e.jsx(i.p,{children:"Das charakteristische Polynom ist"}),e.jsx(l,{children:`\\det(\\bA - \\lambda\\bI) = (5-\\lambda)(8-\\lambda) - 4 = \\lambda^2 - 13\\lambda + 36
= (\\lambda - 9)(\\lambda - 4) ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"\\cgreen{\\lambda_1} = 9"})," und ",e.jsx(n,{children:"\\lambda_2 = 4"}),`. Die Eigenvektoren lesen wir
aus `,e.jsx(n,{children:"(\\bA - \\lambda\\bI)\\bv = \\bnull"})," mit ",e.jsx(n,{children:"\\bv = (a, b)^\\top"}),` ab: Für
`,e.jsx(n,{children:"\\lambda = 9"})," heißt die erste Zeile ",e.jsx(n,{children:"-4a - 2b = 0"}),", also ",e.jsx(n,{children:"b = -2a"}),`; für
`,e.jsx(n,{children:"\\lambda = 4"})," heißt sie ",e.jsx(n,{children:"a - 2b = 0"}),", also ",e.jsx(n,{children:"a = 2b"}),". Normiert ergibt das"]}),e.jsx(l,{children:`\\cgreen{\\bv_1} = \\tfrac{1}{\\sqrt{5}}\\begin{pmatrix} -1 \\\\ 2 \\end{pmatrix}
\\approx \\begin{pmatrix} -0{,}447 \\\\ 0{,}894 \\end{pmatrix} ,
\\qquad
\\bv_2 = \\tfrac{1}{\\sqrt{5}}\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[`Die beiden stehen senkrecht aufeinander, wie es der
`,e.jsx(s,{id:"spectral-theorem",children:"Spektralsatz"}),` für symmetrische Matrizen verlangt. Die zu
erwartende Konvergenzrate ist `,e.jsx(n,{children:`\\corange{\\lambda_2/\\lambda_1} = 4/9 \\approx
\\corange{0{,}444}`}),"."]}),e.jsxs(i.p,{children:["Wir starten mit ",e.jsx(n,{children:"\\bx^{(0)} = (2;\\ 1{,}3)^\\top"}),`. Weil die Eigenvektoren eine
Orthonormalbasis bilden, sind die Koeffizienten der Basisdarstellung die
Skalarprodukte:`]}),e.jsx(l,{children:`c_1 = \\cgreen{\\bv_1}^\\top\\bx^{(0)} = \\frac{-2 + 2{,}6}{\\sqrt{5}} \\approx 0{,}268 ,
\\qquad
c_2 = \\bv_2^\\top\\bx^{(0)} = \\frac{4 + 1{,}3}{\\sqrt{5}} \\approx 2{,}370 .`}),e.jsxs(i.p,{children:["Der Start liegt also fast in Richtung ",e.jsx(n,{children:"\\bv_2"}),", und ",e.jsx(n,{children:"c_1"}),` ist knapp neunmal
kleiner als `,e.jsx(n,{children:"c_2"}),". Nach ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"}),` muss die Iteration diesen Rückstand erst
aufholen; das zeigen die ersten Schritte:`]}),e.jsx(l,{children:`\\begin{array}{c|c|c|c|c}
k & \\cblue{\\bx^{(k)}} & \\cblue{\\lambda^{(k)}} & \\cblue{\\rho^{(k)}} & \\cred{\\sin \\angle(\\bx^{(k)}, \\bv_1)} \\\\ \\hline
0 & (0{,}838;\\ 0{,}545) & \\text{–} & 4{,}063 & 0{,}994 \\\\
1 & (0{,}756;\\ 0{,}654) & 4{,}102 & 4{,}305 & 0{,}969 \\\\
2 & (0{,}554;\\ 0{,}833) & 4{,}468 & 5{,}236 & 0{,}868 \\\\
3 & (0{,}195;\\ 0{,}981) & 5{,}663 & 7{,}122 & 0{,}613 \\\\
4 & (-0{,}131;\\ 0{,}991) & 7{,}523 & 8{,}469 & 0{,}326 \\\\
5 & (-0{,}307;\\ 0{,}952) & 8{,}608 & 8{,}885 & 0{,}151 \\\\
6 & (-0{,}385;\\ 0{,}923) & 8{,}917 & 8{,}977 & 0{,}068 \\\\
8 & (-0{,}435;\\ 0{,}900) & 8{,}997 & 8{,}999 & 0{,}013 \\\\
10 & (-0{,}445;\\ 0{,}896) & 9{,}000 & 9{,}000 & 0{,}003
\\end{array}`}),e.jsxs(i.p,{children:[`Erst nach vier Schritten liegt die Iterierte im richtigen Quadranten; bis
dahin dominiert der `,e.jsx(n,{children:"\\bv_2"}),`-Anteil. Danach schrumpft der Winkelrest in jedem
Schritt auf ungefähr das `,e.jsx(n,{children:"\\corange{0{,}444}"}),`-Fache, wie
`,e.jsx(s,{id:"env:konvergenz-der-potenzmethode",href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"})," vorhersagt: ",e.jsx(n,{children:"0{,}151/0{,}326 \\approx 0{,}46"}),`
und `,e.jsx(n,{children:"0{,}068/0{,}151 \\approx 0{,}45"}),`. Beide Eigenwertschätzungen konvergieren
schneller als die Richtung. Ihr Fehler fällt pro Schritt auf ungefähr das
`,e.jsx(n,{children:"\\corange{(\\lambda_2/\\lambda_1)^2} \\approx 0{,}198"}),`-Fache, also mit dem
Quadrat der Rate.`]})]}),`
`,e.jsxs(M,{title:"Genauigkeit der beiden Schätzungen",children:[e.jsxs(i.p,{children:["Für ",e.jsx(s,{id:"symmetric-matrix",children:"symmetrische"})," ",e.jsx(n,{children:"\\bA"}),` ist der Rayleigh-Quotient die
bessere Wahl. Beide Schätzungen sind dort quadratische Ausdrücke im Winkel
zwischen `,e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"})," und ",e.jsx(n,{children:"\\cgreen{\\bv_1}"}),`, ihr Fehler fällt also mit
`,e.jsx(n,{children:"\\corange{(\\lambda_2/\\lambda_1)}^{2k}"}),` und damit doppelt so schnell wie der
Winkel selbst; der Rayleigh-Quotient liegt dabei um einen konstanten Faktor
näher dran. In `,e.jsx(i.a,{href:"#env-potenzmethode-an-einer-2-2-matrix",children:"Beispiel 8.1.5"}),` geht sein Fehler von
`,e.jsx(n,{children:"k = 8"})," auf ",e.jsx(n,{children:"k = 10"})," von ",e.jsx(n,{children:"-9{,}0 \\cdot 10^{-4}"})," auf ",e.jsx(n,{children:"-3{,}5 \\cdot 10^{-5}"}),`
zurück, der Fehler der Normschätzung von `,e.jsx(n,{children:"-3{,}3 \\cdot 10^{-3}"}),` auf
`,e.jsx(n,{children:"-1{,}3 \\cdot 10^{-4}"}),`: gleich schnell, aber asymptotisch um den Faktor
`,e.jsx(n,{children:"3{,}7"})," genauer. Ist ",e.jsx(n,{children:"\\bA"}),` nicht symmetrisch, stehen die Eigenvektoren nicht
mehr senkrecht aufeinander, und beide Schätzungen sind nur noch linear genau.`]}),e.jsxs(i.p,{children:["Auch ins Abbruchkriterium von ",e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"}),` gehört
`,e.jsx(n,{children:"\\cblue{\\rho^{(k)}}"}),", sobald ",e.jsx(n,{children:"\\cgreen{\\lambda_1}"}),` negativ sein kann. Für
`,e.jsx(n,{children:"\\cgreen{\\lambda_1} < 0"})," wechselt ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"}),` nämlich in jedem Schritt
das Vorzeichen, und das Residuum mit
`,e.jsx(n,{children:"\\cblue{\\lambda^{(k)}} = |\\cgreen{\\lambda_1}|"}),` bliebe bei ungefähr
`,e.jsx(n,{children:"2|\\cgreen{\\lambda_1}|"})," hängen, statt gegen null zu gehen."]})]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.1.6 (Wann die Potenzmethode versagt)",id:"env-wann-die-potenzmethode-versagt",children:[e.jsxs(i.p,{children:["Zwei Voraussetzungen von ",e.jsx(s,{id:"env:konvergenz-der-potenzmethode",href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),` können verletzt
sein. Dann liefert das Verfahren nicht `,e.jsx(n,{children:"\\cgreen{\\lambda_1}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bv_1}"}),"."]}),e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Kein Anteil in Richtung ",e.jsx(n,{children:"\\cgreen{\\bv_1}"}),"."]})," Ist ",e.jsx(n,{children:"c_1 = 0"}),`, so fehlt in
`,e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"}),` der grüne Term. Die Iteration läuft dann gegen die Eigenrichtung
mit dem betragsgrößten Eigenwert, der im Startvektor überhaupt vertreten ist.
Für symmetrisches `,e.jsx(n,{children:"\\bA"}),` sind die Eigenvektoren orthogonal, dort heißt
`,e.jsx(n,{children:"c_1 = \\cgreen{\\bv_1}^\\top\\bx^{(0)} = 0"}),` also: Der Startvektor steht senkrecht
auf dem gesuchten Eigenvektor. In der Praxis ist das selten ein Problem: Ein
zufällig gewählter Startvektor erfüllt
`,e.jsx(n,{children:"c_1 \\neq 0"})," mit Wahrscheinlichkeit ",e.jsx(n,{children:"1"}),`, und Rundungsfehler bringen beim
Rechnen ohnehin einen kleinen `,e.jsx(n,{children:"\\cgreen{\\bv_1}"}),`-Anteil hinein, den die Iteration
dann verstärkt.`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Kein separierter größter Eigenwert."})," Gilt ",e.jsx(n,{children:"|\\lambda_1| = |\\lambda_2|"}),` mit
`,e.jsx(n,{children:"\\lambda_2 \\neq \\lambda_1"}),", etwa bei ",e.jsx(n,{children:"\\lambda_2 = -\\lambda_1"}),` oder bei einem
komplexen Eigenwertpaar, so ist die Rate `,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|} = 1"}),`,
und die Iterierten laufen gegen keine feste Richtung mehr. Und
selbst wenn die beiden nur `,e.jsx(i.em,{children:"nahe"}),` beieinanderliegen, wird die Methode sehr
langsam. In beiden Fällen brauchen wir andere Verfahren.`]})]}),`
`,e.jsxs(J,{title:"Die Potenzmethode Schritt für Schritt",children:[e.jsx(i.p,{children:`Was geschieht, wenn der Start genau auf der zweiten Eigenrichtung liegt?
Ziehen wir den Startvektor auf dem Einheitskreis dorthin und vergleichen wir
mit anderen Starts.`}),e.jsx(wn,{}),e.jsxs(i.p,{children:["Auf ",e.jsx(n,{children:"\\bv_2"}),` gestartet, bleibt die normierte Iterierte für immer stehen; dieser
Ausnahmefall ist eine Nullmenge. Von jedem anderen Start aus schrumpft der
Winkelrest auf Dauer in jedem Schritt auf das
`,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"}),`-Fache. Die Rate hängt an der Matrix, nicht
am Start.`]})]}),`
`,e.jsx(O,{children:e.jsxs(Pe,{loesung:.4444444444,toleranz:.01,children:[e.jsx(i.p,{children:"Welche Rate zeigt der Potenzmethoden-Stepper für die Beispielmatrix langfristig an?"}),e.jsx(i.p,{children:"Der orange Wert nähert sich dem Verhältnis der beiden Eigenwertbeträge."})]})}),`
`,e.jsx(i.h3,{children:"Ähnliche Matrizen als Werkzeug"}),`
`,e.jsxs(i.p,{children:[`Die Potenzmethode liefert einen Eigenwert. Wollen wir alle, brauchen wir eine
andere Idee: Wir überführen `,e.jsx(n,{children:"\\bA"})," in eine Matrix ",e.jsx(n,{children:"\\bB"}),`, der wir die Eigenwerte
ansehen können, ohne sie dabei zu verändern. Das leisten
Ähnlichkeitstransformationen.`]}),`
`,e.jsxs(g,{kind:"Satz",label:"8.1.7 (Ähnliche Matrizen haben dieselben Eigenwerte)",id:"env-aehnliche-matrizen-haben-dieselben",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bB = \\bQ\\bA\\bQ^{-1}"})," mit invertierbarem ",e.jsx(n,{children:"\\bQ \\in \\R^{n \\times n}"}),`, also
`,e.jsx(n,{children:"\\bB"})," ",e.jsx(s,{id:"similar-matrices",children:"ähnlich"})," zu ",e.jsx(n,{children:"\\bA"}),". Dann gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bB"}),` haben dasselbe charakteristische Polynom, insbesondere
dieselben Eigenwerte mit denselben Vielfachheiten, dieselbe
`,e.jsx(s,{id:"determinant",children:"Determinante"})," und dieselbe ",e.jsx(s,{id:"trace",children:"Spur"}),"."]}),`
`,e.jsxs(i.li,{children:["Ist ",e.jsx(n,{children:"\\by"})," Eigenvektor von ",e.jsx(n,{children:"\\bB"})," zum Eigenwert ",e.jsx(n,{children:"\\lambda"}),`, so ist
`,e.jsx(n,{children:"\\bx = \\bQ^{-1}\\by"})," Eigenvektor von ",e.jsx(n,{children:"\\bA"})," zum selben Eigenwert."]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["Teil (2) folgt direkt aus der Definition von ",e.jsx(n,{children:"\\bB"}),". Aus ",e.jsx(n,{children:"\\bB\\by = \\lambda\\by"}),`
wird`]}),`
`,e.jsx(l,{children:`\\bQ\\bA\\bQ^{-1}\\by = \\lambda\\by
\\;\\implies\\;
\\bA\\bQ^{-1}\\by = \\lambda\\bQ^{-1}\\by
\\;\\implies\\;
\\bA\\bx = \\lambda\\bx ,`}),`
`,e.jsxs(i.p,{children:["wobei wir von links mit ",e.jsx(n,{children:"\\bQ^{-1}"}),` multipliziert haben. Dabei ist
`,e.jsx(n,{children:"\\bx = \\bQ^{-1}\\by \\neq \\bnull"}),", weil ",e.jsx(n,{children:"\\bQ^{-1}"}),` invertierbar ist und
`,e.jsx(n,{children:"\\by \\neq \\bnull"}),"."]}),`
`,e.jsx(M,{title:"Beweis von Teil 1 über das charakteristische Polynom",children:e.jsxs(C,{children:[e.jsxs(w,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bQ\\bA\\bQ^{-1} - \\lambda\\bQ\\bI\\bQ^{-1} = \\bQ(\\bA - \\lambda\\bI)\\bQ^{-1}"}),", und ",e.jsx(n,{children:"\\det(\\bQ)^{-1} = \\det(\\bQ^{-1})"})," ist wegen der Invertierbarkeit definiert"]}),children:[e.jsxs(i.p,{children:["Wir schieben ",e.jsx(n,{children:"\\bI = \\bQ\\bQ^{-1}"}),` in den zweiten Summanden und
verwenden die Multiplikativität der Determinante:`]}),e.jsx(l,{children:`\\det(\\bB - \\lambda\\bI)
= \\det\\bigl(\\bQ(\\bA - \\lambda\\bI)\\bQ^{-1}\\bigr)
= \\det(\\bQ)\\det(\\bA - \\lambda\\bI)\\det(\\bQ)^{-1}
= \\det(\\bA - \\lambda\\bI) .`}),e.jsx(i.p,{children:`Beide Matrizen haben also dasselbe charakteristische Polynom und damit
dieselben Eigenwerte samt Vielfachheiten.`})]}),e.jsx(w,{why:e.jsx(e.Fragment,{children:"alternativ über das charakteristische Polynom: Spur und Determinante sind bis aufs Vorzeichen zwei seiner Koeffizienten, und die stimmen nach Schritt 1 überein"}),children:e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\lambda = 0"})," liefert das ",e.jsx(n,{children:"\\det(\\bB) = \\det(\\bA)"}),`. Die Gleichheit der
Spuren steht schon in
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),`: Die Spur ist zyklisch, also
`,e.jsx(n,{children:"\\tr(\\bQ\\bA\\bQ^{-1}) = \\tr(\\bA\\bQ^{-1}\\bQ) = \\tr(\\bA)"}),"."]})})]})}),`
`,e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\bB"})," diagonal, stehen die Eigenwerte auf der Diagonalen."]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"8.1.8 (Diagonalisierung durch eine Orthogonalmatrix)",id:"env-diagonalisierung-durch-eine",children:[e.jsxs(i.p,{children:["Wir bleiben bei ",e.jsx(n,{children:"\\bA"})," aus ",e.jsx(i.a,{href:"#env-potenzmethode-an-einer-2-2-matrix",children:"Beispiel 8.1.5"})," und wählen"]}),e.jsx(l,{children:`\\bQ = \\frac{1}{\\sqrt{5}} \\begin{pmatrix} 2 & 1 \\\\ 1 & -2 \\end{pmatrix}
\\qquad\\text{mit}\\qquad
\\bQ^\\top\\bQ = \\bI .`}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bQ"})," ist orthogonal, also ist ",e.jsx(n,{children:"\\bQ^{-1} = \\bQ^\\top"}),` und die
Ähnlichkeitstransformation `,e.jsx(n,{children:"\\bB = \\bQ\\bA\\bQ^\\top"}),` kommt ohne Inversion aus.
Wir rechnen in zwei Etappen, zuerst`]}),e.jsx(l,{children:`\\bA\\bQ^\\top = \\frac{1}{\\sqrt{5}} \\begin{pmatrix} 5 & -2 \\\\ -2 & 8 \\end{pmatrix}
\\begin{pmatrix} 2 & 1 \\\\ 1 & -2 \\end{pmatrix}
= \\frac{1}{\\sqrt{5}} \\begin{pmatrix} 8 & 9 \\\\ 4 & -18 \\end{pmatrix} ,`}),e.jsxs(i.p,{children:["denn etwa der Eintrag links oben ist ",e.jsx(n,{children:"5 \\cdot 2 + (-2) \\cdot 1 = 8"}),". Dann"]}),e.jsx(l,{children:`\\bB = \\bQ\\bigl(\\bA\\bQ^\\top\\bigr)
= \\frac{1}{5} \\begin{pmatrix} 2 & 1 \\\\ 1 & -2 \\end{pmatrix}
\\begin{pmatrix} 8 & 9 \\\\ 4 & -18 \\end{pmatrix}
= \\frac{1}{5} \\begin{pmatrix} 20 & 0 \\\\ 0 & 45 \\end{pmatrix}
= \\begin{pmatrix} \\cgreen{4} & 0 \\\\ 0 & \\cgreen{9} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Die beiden Nullen entstehen, weil die Zeilen von ",e.jsx(n,{children:"\\bQ"}),` gerade die
Eigenvektoren von `,e.jsx(n,{children:"\\bA"}),` sind. Auf der Diagonalen stehen deshalb die Eigenwerte, und
sie stimmen mit den Nullstellen des charakteristischen Polynoms aus
`,e.jsx(i.a,{href:"#env-potenzmethode-an-einer-2-2-matrix",children:"Beispiel 8.1.5"})," überein."]}),e.jsxs(M,{title:"Reihenfolge der Eigenwerte und Rücktransformation",children:[e.jsxs(i.p,{children:["Dass ",e.jsx(n,{children:"(4, 9)"})," und nicht ",e.jsx(n,{children:"(9, 4)"}),` auf der Diagonalen steht, liegt an der
Spaltenwahl: Die erste Spalte von `,e.jsx(n,{children:"\\bQ^\\top"})," ist ",e.jsx(n,{children:"\\bv_2"}),`, die zweite
`,e.jsx(n,{children:"-\\cgreen{\\bv_1}"}),". Mit vertauschten Spalten stünde dort ",e.jsx(n,{children:"(9, 4)"}),`. Im übrigen
Kapitel sortieren wir wie bei der Potenzmethode absteigend,
`,e.jsx(n,{children:"\\cgreen{\\lambda_1} = 9 \\geq \\lambda_2 = 4"}),"."]}),e.jsxs(i.p,{children:["Auch ",e.jsx(s,{id:"env:aehnliche-matrizen-haben-dieselben",href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"}),`(2) lässt sich hier ablesen:
`,e.jsx(n,{children:"\\by = \\be_2"})," ist Eigenvektor von ",e.jsx(n,{children:"\\bB"})," zum Eigenwert ",e.jsx(n,{children:"9"}),`, und
`,e.jsx(n,{children:"\\bx = \\bQ^{-1}\\be_2 = \\bQ^\\top\\be_2 = \\tfrac{1}{\\sqrt{5}}(1, -2)^\\top = -\\cgreen{\\bv_1}"}),`
ist Eigenvektor von `,e.jsx(n,{children:"\\bA"})," zu demselben Eigenwert."]})]})]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.1.9 (Welche Zielgestalt, welches Verfahren)",id:"env-welche-zielgestalt-welches-verfahren",children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#env-diagonalisierung-durch-eine",children:"Beispiel 8.1.8"}),` kannten wir die Eigenvektoren schon und haben
`,e.jsx(n,{children:"\\bQ"})," daraus gebaut. Ein Algorithmus muss ein passendes ",e.jsx(n,{children:"\\bQ"}),` erst finden, und
zwar iterativ: Er erzeugt eine Folge `,e.jsx(n,{children:"\\bB^{(k)}"})," von zu ",e.jsx(n,{children:"\\bA"}),` ähnlichen
Matrizen, die einer Zielgestalt immer näher kommt. Die Verfahren unterscheiden
sich in der Zielgestalt:`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Die ",e.jsx(i.em,{children:"QR-Iteration"})," strebt eine obere ",e.jsx(s,{id:"triangular-matrix",children:"Dreiecksmatrix"}),`
an, die `,e.jsx(i.em,{children:"Schur-Zerlegung"}),`; auf ihrer Diagonalen stehen die Eigenwerte.
Analog gibt es LU- und Cholesky-Iterationen.`]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(i.em,{children:"Lanczos-Iteration"}),` strebt eine Tridiagonalmatrix an, also
`,e.jsx(n,{children:"b_{ij} = 0"})," für ",e.jsx(n,{children:"|i - j| > 1"}),`, und lässt sich auf die wichtigsten
Eigenwerte einschränken. Für große dünnbesetzte Matrizen ist sie deutlich
effizienter.`]}),`
`]}),e.jsxs(i.p,{children:[`In der Praxis kommen zu beiden noch Techniken hinzu, die sie stabil und
schnell genug machen: `,e.jsx(i.em,{children:"Shifted QR"})," und ",e.jsx(i.em,{children:"Implicitly Restarted Lanczos"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Die QR-Iteration"}),`
`,e.jsxs(i.p,{children:["Die QR-Iteration zerlegt die aktuelle Matrix in ",e.jsx(n,{children:"\\bQ\\bR"}),` und multipliziert
die beiden Faktoren in umgekehrter Reihenfolge wieder zusammen.`]}),`
`,e.jsxs(g,{kind:"Algorithmus",label:"8.1.10 (QR-Iteration)",id:"env-qr-iteration",children:[e.jsxs(i.p,{children:["Gegeben sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Starte mit ",e.jsx(n,{children:"\\bA^{(0)} = \\bA"}),"."]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"k = 1, 2, \\dots"}),":",`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Berechne die QR-Zerlegung ",e.jsx(n,{children:"\\bA^{(k-1)} = \\bQ^{(k)}\\bR^{(k)}"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),")."]}),`
`,e.jsxs(i.li,{children:[`Setze
`,e.jsx(n,{children:"\\cblue{\\bA^{(k)}} = \\bR^{(k)}\\bQ^{(k)}"}),"."]}),`
`]}),`
`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Der zweite Schritt sieht willkürlich aus, ist aber eine
Ähnlichkeitstransformation. Wegen
`,e.jsx(n,{children:"\\bR^{(k)} = (\\bQ^{(k)})^\\top\\bA^{(k-1)}"})," ist nämlich"]}),`
`,e.jsx(l,{children:"\\cblue{\\bA^{(k)}} = \\bR^{(k)}\\bQ^{(k)} = (\\bQ^{(k)})^\\top \\bA^{(k-1)} \\bQ^{(k)} ."}),`
`,e.jsxs(g,{kind:"Satz",label:"8.1.11 (Die Iterierten sind ähnlich zu A)",id:"env-die-iterierten-sind-aehnlich-zu-a",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bQ_k := \\bQ^{(1)}\\bQ^{(2)}\\cdots\\bQ^{(k)}"}),` gilt für die Iterierten aus
`,e.jsx(i.a,{href:"#env-qr-iteration",children:"Algorithmus 8.1.10"})]}),e.jsx(V,{tag:"8.1.2",id:"eq-die-iterierten-sind-aehnlich-zu-a",children:"\\cblue{\\bA^{(k)}} = \\bQ_k^\\top\\, \\bA\\, \\bQ_k ."}),e.jsxs(i.p,{children:["Insbesondere ist jedes ",e.jsx(n,{children:"\\cblue{\\bA^{(k)}}"})," ähnlich zu ",e.jsx(n,{children:"\\bA"}),` und hat nach
`,e.jsx(s,{id:"env:aehnliche-matrizen-haben-dieselben",href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"})," dieselben Eigenwerte."]})]}),`
`,e.jsx(i.p,{children:`Die Iteration verändert die Eigenwerte also nicht. Den Schlüssel zu ihrer
Konvergenz liefert der folgende Satz.`}),`
`,e.jsxs(g,{kind:"Satz",label:"8.1.12 (Die QR-Iteration zerlegt die Potenzen von A)",id:"env-die-qr-iteration-zerlegt-die-potenzen",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bQ_k := \\bQ^{(1)}\\bQ^{(2)}\\cdots\\bQ^{(k)}"}),` und
`,e.jsx(n,{children:"\\bR_k := \\bR^{(k)}\\bR^{(k-1)}\\cdots\\bR^{(1)}"})," gilt für alle ",e.jsx(n,{children:"k \\geq 1"})]}),e.jsx(V,{tag:"8.1.3",id:"eq-die-qr-iteration-zerlegt-die-potenzen",children:"\\bA^k = \\bQ_k \\bR_k ."}),e.jsxs(i.p,{children:[`Die Faktoren der QR-Iteration liefern also nebenbei die QR-Zerlegung der
`,e.jsx(n,{children:"k"}),"-ten Potenz von ",e.jsx(n,{children:"\\bA"}),"."]})]}),`
`,e.jsxs(M,{title:"Beweise der Ähnlichkeit und der Potenzzerlegung",children:[e.jsxs(i.p,{children:["Zu ",e.jsx(s,{id:"env:die-iterierten-sind-aehnlich-zu-a",href:"#env-die-iterierten-sind-aehnlich-zu-a",children:"Satz 8.1.11"}),":"]}),e.jsxs(C,{children:[e.jsx(w,{why:e.jsxs(e.Fragment,{children:["Produkte von Orthogonalmatrizen sind orthogonal: ",e.jsx(n,{children:"(\\bQ\\bP)^\\top(\\bQ\\bP) = \\bP^\\top\\bQ^\\top\\bQ\\bP = \\bP^\\top\\bP = \\bI"})]}),children:e.jsxs(i.p,{children:["Jedes ",e.jsx(n,{children:"\\bQ^{(j)}"})," ist orthogonal, also ist auch das Produkt ",e.jsx(n,{children:"\\bQ_k"}),`
orthogonal und es gilt `,e.jsx(n,{children:"\\bQ_k^{-1} = \\bQ_k^\\top"}),"."]})}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bQ_{k-1}\\bQ^{(k)} = \\bQ_k"})," nach Definition, und ",e.jsx(n,{children:"(\\bQ_{k-1}\\bQ^{(k)})^\\top = (\\bQ^{(k)})^\\top\\bQ_{k-1}^\\top"})]}),children:[e.jsxs(i.p,{children:["Die Behauptung folgt per Induktion. Für ",e.jsx(n,{children:"k = 1"}),` ist
`,e.jsx(n,{children:"\\bA^{(1)} = (\\bQ^{(1)})^\\top\\bA\\bQ^{(1)} = \\bQ_1^\\top\\bA\\bQ_1"}),`. Gilt sie für
`,e.jsx(n,{children:"k - 1"}),", so ist"]}),e.jsx(l,{children:`\\cblue{\\bA^{(k)}} = (\\bQ^{(k)})^\\top \\bA^{(k-1)} \\bQ^{(k)}
= (\\bQ^{(k)})^\\top \\bQ_{k-1}^\\top\\, \\bA\\, \\bQ_{k-1} \\bQ^{(k)}
= \\bQ_k^\\top\\, \\bA\\, \\bQ_k .`})]})]}),e.jsxs(i.p,{children:["Zu ",e.jsx(s,{id:"env:die-qr-iteration-zerlegt-die-potenzen",href:"#env-die-qr-iteration-zerlegt-die-potenzen",children:"Satz 8.1.12"}),":"]}),e.jsxs(C,{children:[e.jsx(w,{why:e.jsxs(e.Fragment,{children:["für ",e.jsx(n,{children:"k = 1"})," sind ",e.jsx(n,{children:"\\bQ_1 = \\bQ^{(1)}"})," und ",e.jsx(n,{children:"\\bR_1 = \\bR^{(1)}"})," genau die Faktoren des ersten Iterationsschritts"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Induktionsanfang"})," ",e.jsx(n,{children:"k = 1"}),`: Der erste Schritt zerlegt
`,e.jsx(n,{children:"\\bA = \\bA^{(0)} = \\bQ^{(1)}\\bR^{(1)} = \\bQ_1\\bR_1"}),"."]})}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["dieselbe Matrix ",e.jsx(n,{children:"\\bA^{(i)}"}),", einmal als Ergebnis von Schritt ",e.jsx(n,{children:"i"})," und einmal als Eingang von Schritt ",e.jsx(n,{children:"i+1"})," gelesen"]}),children:[e.jsxs(i.p,{children:["Die Rechenregel für den Induktionsschritt: Für jedes ",e.jsx(n,{children:"i"}),` ist
`,e.jsx(n,{children:"\\bA^{(i)} = \\bR^{(i)}\\bQ^{(i)}"})," nach ",e.jsx(i.a,{href:"#env-qr-iteration",children:"Algorithmus 8.1.10"}),` und
`,e.jsx(n,{children:"\\bA^{(i)} = \\bQ^{(i+1)}\\bR^{(i+1)}"}),` nach der Zerlegung im nächsten Schritt,
also`]}),e.jsx(l,{children:"\\bR^{(i)}\\bQ^{(i)} = \\bQ^{(i+1)}\\bR^{(i+1)} . \\qquad (\\star)"})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["in der zweiten Zeile ist ",e.jsx(n,{children:"\\bQ_k\\bR_k"})," ausgeschrieben; jede Anwendung von ",e.jsx(n,{children:"(\\star)"})," tauscht ein ",e.jsx(n,{children:"\\bR^{(i)}\\bQ^{(i)}"})," gegen ",e.jsx(n,{children:"\\bQ^{(i+1)}\\bR^{(i+1)}"})," und schiebt so ein weiteres ",e.jsx(n,{children:"\\bQ"})," nach vorn"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Induktionsschritt"})," ",e.jsx(n,{children:"k \\to k+1"}),`: Wir setzen die Induktionsvoraussetzung ein
und schieben dann `,e.jsx(n,{children:"k"}),"-mal ",e.jsx(n,{children:"(\\star)"})," von links nach rechts durch das Produkt."]}),e.jsx(l,{children:`\\begin{aligned}
\\bA^{k+1} &= \\bA\\,\\bA^k = \\bigl(\\bQ^{(1)}\\bR^{(1)}\\bigr)\\bigl(\\bQ_k\\bR_k\\bigr) \\\\
&= \\bQ^{(1)}\\underbrace{\\bigl(\\bR^{(1)}\\bQ^{(1)}\\bigr)}_{= \\,\\bQ^{(2)}\\bR^{(2)}}
   \\bQ^{(2)}\\cdots\\bQ^{(k)}\\,\\bR^{(k)}\\cdots\\bR^{(1)} \\\\
&= \\bQ^{(1)}\\bQ^{(2)}\\underbrace{\\bigl(\\bR^{(2)}\\bQ^{(2)}\\bigr)}_{= \\,\\bQ^{(3)}\\bR^{(3)}}
   \\bQ^{(3)}\\cdots\\bQ^{(k)}\\,\\bR^{(k)}\\cdots\\bR^{(1)} \\\\
&= \\cdots = \\bQ^{(1)}\\bQ^{(2)}\\cdots\\bQ^{(k+1)}\\,\\bR^{(k+1)}\\bR^{(k)}\\cdots\\bR^{(1)} \\\\
&= \\bQ_{k+1}\\bR_{k+1} .
\\end{aligned}`})]})]})]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.1.13 (Die QR-Iteration ist eine simultane Potenzmethode)",id:"env-die-qr-iteration-ist-eine-simultane",children:[e.jsxs(i.p,{children:["Bei der üblichen Normierung mit positiven Diagonaleinträgen in ",e.jsx(n,{children:"\\bR"}),` ist die
QR-Zerlegung gerade das `,e.jsx(s,{id:"gram-schmidt",children:"Gram-Schmidt-Verfahren"}),` auf den
Spalten. Nach `,e.jsx(i.a,{href:"#eq-die-qr-iteration-zerlegt-die-potenzen",children:"(8.1.3)"}),` sind die Spalten von
`,e.jsx(n,{children:"\\bQ_k"})," deshalb die orthonormalisierten Versionen von"]}),e.jsx(l,{children:"\\bA^k\\be_1, \\quad \\bA^k\\be_2, \\quad \\dots, \\quad \\bA^k\\be_n ."}),e.jsxs(i.p,{children:[`Jede einzelne dieser Spalten ist eine unnormierte Iterierte der Potenzmethode,
gestartet in einem Einheitsvektor. Die QR-Iteration ist also eine `,e.jsx(i.em,{children:"simultane"}),`
Potenzmethode auf allen `,e.jsx(n,{children:"n"}),` Einheitsvektoren zugleich, mit einer
Orthonormalisierung nach jedem Schritt. Ohne diese Orthonormalisierung
liefen alle `,e.jsx(n,{children:"n"})," Spalten gegen dieselbe Richtung ",e.jsx(n,{children:"\\cgreen{\\bv_1}"}),`, und die
übrigen Eigenrichtungen gingen verloren.`]})]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.1.14 (Wogegen die QR-Iteration konvergiert)",id:"env-wogegen-die-qr-iteration-konvergiert",children:[e.jsxs(i.p,{children:[`Die Konvergenz braucht Voraussetzungen. Ein Gegenbeispiel ist die Drehung um
`,e.jsx(n,{children:"90^\\circ"}),`,
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 0 & -1 \\\\ 1 & 0 \\end{smallmatrix}\\bigr)"}),`: Hier
ist `,e.jsx(n,{children:"\\bQ^{(1)} = \\bA"})," und ",e.jsx(n,{children:"\\bR^{(1)} = \\bI"}),", also ",e.jsx(n,{children:"\\bA^{(1)} = \\bA"}),`, und die
Iteration steht für immer still. Ihre Eigenwerte `,e.jsx(n,{children:"\\pm i"}),` sind komplex und
betragsgleich.`]}),e.jsx(i.p,{children:"Sind dagegen alle Eigenwerte reell und betragsmäßig getrennt,"}),e.jsx(l,{children:"|\\lambda_1| > |\\lambda_2| > \\cdots > |\\lambda_n| > 0 ,"}),e.jsxs(i.p,{children:["so konvergiert ",e.jsx(n,{children:"\\cblue{\\bA^{(k)}}"}),` gegen eine obere Dreiecksmatrix mit den
Eigenwerten auf der Diagonalen. Das ist die `,e.jsx(i.em,{children:"Schur-Zerlegung"})," von ",e.jsx(n,{children:"\\bA"}),`. Die
Einträge unterhalb der Diagonalen fallen dabei linear, der Eintrag an der
Stelle `,e.jsx(n,{children:"(i, j)"})," mit ",e.jsx(n,{children:"i > j"})," wie ",e.jsx(n,{children:"\\corange{|\\lambda_i/\\lambda_j|}^k"}),`; die
langsamste dieser Raten gehört zum engsten Paar benachbarter Eigenwerte.`]}),e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\bA"})," zusätzlich ",e.jsx(i.strong,{children:"symmetrisch"}),", so ist wegen ",e.jsx(i.a,{href:"#eq-die-iterierten-sind-aehnlich-zu-a",children:"(8.1.2)"}),` auch jedes
`,e.jsx(n,{children:"\\cblue{\\bA^{(k)}} = \\bQ_k^\\top\\bA\\bQ_k"}),` symmetrisch, und eine symmetrische
obere Dreiecksmatrix ist diagonal. In diesem Fall gilt außerdem
`,e.jsx(n,{children:"\\bA = \\cgreen{\\bV}\\bLambda\\cgreen{\\bV}^\\top"})," mit orthogonalem ",e.jsx(n,{children:"\\cgreen{\\bV}"}),`
aus Eigenvektoren, und mit `,e.jsx(n,{children:"\\bQ_k \\to \\cgreen{\\bV}"})," folgt"]}),e.jsx(l,{children:`\\bQ_k^\\top\\bA\\bQ_k \\longrightarrow \\cgreen{\\bV}^\\top\\bA\\cgreen{\\bV}
= \\cgreen{\\bV}^\\top\\cgreen{\\bV}\\bLambda\\cgreen{\\bV}^\\top\\cgreen{\\bV} = \\bLambda .`}),e.jsxs(i.p,{children:["Dass sich ",e.jsx(n,{children:"\\cgreen{\\bV}^\\top\\cgreen{\\bV}"}),` zweimal zur Einheitsmatrix kürzt,
braucht ein `,e.jsx(i.em,{children:"orthogonales"})," ",e.jsx(n,{children:"\\cgreen{\\bV}"}),`, und das liefert der
`,e.jsx(s,{id:"spectral-theorem",children:"Spektralsatz"})," nur für symmetrisches ",e.jsx(n,{children:"\\bA"}),`. Im
allgemeinen Fall konvergiert `,e.jsx(n,{children:"\\bQ_k"}),` gegen den Orthogonalfaktor der
Schur-Zerlegung; nur dessen erste Spalte ist ein Eigenvektor, die übrigen
rechnen wir aus der Dreiecksmatrix zurück.`]})]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"8.1.15 (QR-Iteration an der Beispielmatrix)",id:"env-qr-iteration-an-der-beispielmatrix",children:[e.jsxs(i.p,{children:["Wir nehmen wieder ",e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 5 & -2 \\\\ -2 & 8 \\end{smallmatrix}\\bigr)"}),`
und rechnen den ersten Schritt von Hand. Gram-Schmidt auf den Spalten
`,e.jsx(n,{children:"\\ba_1 = (5, -2)^\\top"})," und ",e.jsx(n,{children:"\\ba_2 = (-2, 8)^\\top"})," liefert"]}),e.jsx(l,{children:`r_{11} = \\left\\|\\ba_1\\right\\| = \\sqrt{29} , \\qquad
\\bq_1 = \\tfrac{1}{\\sqrt{29}}\\begin{pmatrix} 5 \\\\ -2 \\end{pmatrix} , \\qquad
r_{12} = \\bq_1^\\top\\ba_2 = \\frac{-10 - 16}{\\sqrt{29}} = \\frac{-26}{\\sqrt{29}} ,`}),e.jsxs(i.p,{children:[`und nach Abzug der Projektion bleibt
`,e.jsx(n,{children:"\\bw = \\ba_2 - r_{12}\\bq_1 = \\tfrac{36}{29}(2, 5)^\\top"}),` mit
`,e.jsx(n,{children:"r_{22} = \\left\\|\\bw\\right\\| = 36/\\sqrt{29}"}),". Zusammen also"]}),e.jsx(l,{children:`\\bQ^{(1)} = \\frac{1}{\\sqrt{29}}\\begin{pmatrix} 5 & 2 \\\\ -2 & 5 \\end{pmatrix} ,
\\qquad
\\bR^{(1)} = \\frac{1}{\\sqrt{29}}\\begin{pmatrix} 29 & -26 \\\\ 0 & 36 \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Probe: ",e.jsx(n,{children:"r_{11} r_{22} = \\sqrt{29} \\cdot 36/\\sqrt{29} = 36 = \\det(\\bA)"}),`.
Nun die Vertauschung:`]}),e.jsx(l,{children:`\\cblue{\\bA^{(1)}} = \\bR^{(1)}\\bQ^{(1)}
= \\frac{1}{29}\\begin{pmatrix} 29 & -26 \\\\ 0 & 36 \\end{pmatrix}
\\begin{pmatrix} 5 & 2 \\\\ -2 & 5 \\end{pmatrix}
= \\frac{1}{29}\\begin{pmatrix} 197 & -72 \\\\ -72 & 180 \\end{pmatrix}
\\approx \\begin{pmatrix} 6{,}793 & -2{,}483 \\\\ -2{,}483 & 6{,}207 \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Spur und Determinante sind unverändert ",e.jsx(n,{children:"13"})," und ",e.jsx(n,{children:"36"}),`, wie es
`,e.jsx(s,{id:"env:aehnliche-matrizen-haben-dieselben",href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"}),`(1) verlangt. Weiter iteriert ergibt
sich (die Matrizen bleiben symmetrisch, also genügen drei Einträge je Zeile):`]}),e.jsx(l,{children:`\\begin{array}{c|c|c|c|c}
k & \\cgreen{a^{(k)}_{11}} & \\cred{a^{(k)}_{21}} & \\cgreen{a^{(k)}_{22}} & \\corange{\\text{Schrumpffaktor}} \\\\ \\hline
0 & 5{,}000 & -2{,}000 & 8{,}000 & \\text{–} \\\\
1 & 6{,}793 & -2{,}483 & 6{,}207 & 1{,}241 \\\\
2 & 8{,}325 & -1{,}709 & 4{,}675 & 0{,}688 \\\\
3 & 8{,}850 & -0{,}852 & 4{,}150 & 0{,}498 \\\\
4 & 8{,}970 & -0{,}388 & 4{,}030 & 0{,}455 \\\\
5 & 8{,}994 & -0{,}173 & 4{,}006 & 0{,}447 \\\\
6 & 8{,}999 & -0{,}077 & 4{,}001 & 0{,}445 \\\\
9 & 9{,}000 & -0{,}007 & 4{,}000 & 0{,}444
\\end{array}`}),e.jsxs(i.p,{children:["Die Diagonale läuft auf ",e.jsx(n,{children:"(\\cgreen{9}, \\cgreen{4})"}),` zu, absteigend nach Betrag,
und der rote Eintrag unter der Diagonalen verschwindet. Sein Schrumpffaktor
nähert sich `,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|} = \\corange{0{,}444}"}),`, derselben
Rate wie bei der Potenzmethode; im ersten Schritt wächst der Eintrag sogar
noch, denn die Rate beschreibt nur das asymptotische Verhalten. Das
aufgesammelte Produkt `,e.jsx(n,{children:"\\bQ_9"})," hat die Spalten ",e.jsx(n,{children:"(0{,}448;\\ -0{,}894)^\\top"}),` und
`,e.jsx(n,{children:"(0{,}894;\\ 0{,}448)^\\top"}),", also bis auf Rundung ",e.jsx(n,{children:"-\\cgreen{\\bv_1}"}),` und
`,e.jsx(n,{children:"\\bv_2"}),". In ",e.jsx(i.a,{href:"#env-diagonalisierung-durch-eine",children:"Beispiel 8.1.8"}),` haben wir dieselbe
Diagonalisierung, dort mit vertauschter Reihenfolge, aus den bekannten
Eigenvektoren gebaut; die QR-Iteration findet sie selbst.`]})]}),`
`,e.jsxs(J,{title:"Die QR-Iteration zum Durchklicken",children:[e.jsxs(i.p,{children:["Links stehen die Einträge von ",e.jsx(n,{children:"\\bA^{(k)}"}),`, dazu die Faktoren des letzten
Schritts und das
aufgesammelte Produkt `,e.jsx(n,{children:"\\bQ_k"}),`; rechts fällt der Betrag der Nebendiagonalen auf
logarithmischer Skala, wo lineare Konvergenz als Gerade erscheint. Neben der
Beispielmatrix lohnen sich zwei weitere Eingaben: die unsymmetrische Matrix
`,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix} 2 & 3 \\\\ 1 & 4 \\end{smallmatrix}\\bigr)"}),` und die Drehung
aus `,e.jsx(i.a,{href:"#env-wogegen-die-qr-iteration-konvergiert",children:"Bemerkung 8.1.14"}),"."]}),e.jsx(En,{}),e.jsxs(i.p,{children:[`Die drei Eingaben zeigen die drei Fälle aus
`,e.jsx(i.a,{href:"#env-wogegen-die-qr-iteration-konvergiert",children:"Bemerkung 8.1.14"}),`: Getrennte Beträge und Symmetrie
führen auf eine Diagonalmatrix mit Eigenvektoren in `,e.jsx(n,{children:"\\bQ_k"}),`, getrennte Beträge
ohne Symmetrie nur auf eine Dreiecksmatrix, gleiche Beträge auf Stillstand. Was
die Iteration liefert, hängt an den Eigenschaften von `,e.jsx(n,{children:"\\bA"}),`, nicht an der Zahl
der Schritte.`]})]}),`
`,e.jsx(i.h3,{children:"Kondition und Aufwand"}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.1.16 (Kondition von Eigenwertproblemen)",id:"env-kondition-von-eigenwertproblemen",children:[e.jsxs(i.p,{children:["Wie gut ein Eigenwertproblem konditioniert ist (",e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`), hängt
stark von der Matrix ab.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Eigenwerte"})," sind gut konditioniert, wenn ",e.jsx(n,{children:"\\bA"}),` nahezu symmetrisch ist. Für
exakt symmetrische Matrizen verschiebt eine ebenfalls symmetrische Störung
`,e.jsx(n,{children:"\\bDelta"})," jeden Eigenwert um höchstens ",e.jsx(n,{children:"\\left\\|\\bDelta\\right\\|_2"}),`. Bei stark
unsymmetrischen Matrizen gibt es keine solche Schranke.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Eigenvektoren"}),` sind schlecht konditioniert, wenn Eigenwerte nahe
beieinanderliegen. Der Grenzfall macht klar, warum: Bei
`,e.jsx(n,{children:"\\lambda_i = \\lambda_j"}),` spannen die zugehörigen Eigenvektoren eine ganze
Ebene auf, in der jede Richtung gleich gut ist. Liegen die Eigenwerte nur
nahe beieinander, ist die Richtung fast beliebig, und eine kleine Störung
dreht sie weit.`]}),`
`]}),e.jsxs(i.p,{children:[`Dieselbe Nähe bremst auch beide Verfahren, denn die Rate
`,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"})," geht dann gegen ",e.jsx(n,{children:"1"}),`. Schlechte Kondition und
langsame Konvergenz haben hier dieselbe Ursache.`]})]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.1.17 (Aufwand)",id:"env-eigenwerte-aufwand",children:[e.jsxs(i.p,{children:["Ein Schritt von ",e.jsx(i.a,{href:"#env-qr-iteration",children:"Algorithmus 8.1.10"}),` zerlegt eine volle Matrix und
kostet `,e.jsx(n,{children:"O(n^3)"}),". Der praktische QR-Eigenwertalgorithmus reduziert ",e.jsx(n,{children:"\\bA"}),` deshalb
einmalig in `,e.jsx(n,{children:"O(n^3)"})," auf Hessenbergform; danach kostet ein QR-Sweep ",e.jsx(n,{children:"O(n^2)"}),`,
bei symmetrischen Matrizen (Tridiagonalform) sogar nur `,e.jsx(n,{children:"O(n)"}),`. Wie viele Sweeps
nötig sind, hängt von Shifts, Deflation und Eigenwertverteilung ab; oft sind es
wenige. Ein Schritt der Potenzmethode kostet dagegen nur ein
Matrix-Vektor-Produkt, liefert aber auch nur einen Eigenwert.`]}),e.jsxs(i.p,{children:[`Für große dünnbesetzte Matrizen sind iterative Verfahren wie die
Lanczos-Iteration (`,e.jsx(i.a,{href:"#env-welche-zielgestalt-welches-verfahren",children:"Bemerkung 8.1.9"}),`) und ihre
Varianten für die SVD noch schneller; sie kommen in `,e.jsx(i.a,{href:"#sec-8.2",children:"Abschnitt 8.2"})," wieder vor."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(O,{children:[e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bx^{(0)} = c\\,\\bv_1"})," mit ",e.jsx(n,{children:"c \\neq 0"})," versagt die Potenzmethode."]}),e.jsxs(i.p,{children:[`Im Gegenteil, das ist der günstigste Startvektor: Er hat
`,e.jsx(n,{children:"c_1 = c \\neq 0"}),`, und die Iteration ist bereits im ersten Schritt am Ziel, denn
`,e.jsx(n,{children:"\\bA\\bv_1 = \\lambda_1\\bv_1"})," ändert die Richtung nicht."]})]}),e.jsxs(S,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bx^{(0)} = c\\,\\bv_2"})," mit ",e.jsx(n,{children:"c \\neq 0"})," versagt die Potenzmethode."]}),e.jsxs(i.p,{children:["Hier ist ",e.jsx(n,{children:"c_1 = 0"}),", in ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"})," fehlt also der Term mit ",e.jsx(n,{children:"\\bv_1"}),`. Bei
symmetrischem `,e.jsx(n,{children:"\\bA"}),` heißt das anschaulich: Der Startvektor steht senkrecht auf
dem gesuchten Eigenvektor. Die Iterierte bleibt in Richtung `,e.jsx(n,{children:"\\bv_2"}),` stehen und
die Schätzung liefert `,e.jsx(n,{children:"\\lambda_2"})," statt ",e.jsx(n,{children:"\\lambda_1"})," (",e.jsx(i.a,{href:"#env-wann-die-potenzmethode-versagt",children:"Bemerkung 8.1.6"}),")."]})]}),e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bx^{(0)} = c\\,(\\bv_1 + \\bv_2)"})," mit ",e.jsx(n,{children:"c \\neq 0"})," versagt die Potenzmethode."]}),e.jsxs(i.p,{children:["Dieser Start hat ",e.jsx(n,{children:"c_1 = c \\neq 0"}),", damit ist die Voraussetzung von ",e.jsx(s,{id:"env:konvergenz-der-potenzmethode",href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),`
erfüllt. Die Methode konvergiert mit der üblichen Rate
`,e.jsx(n,{children:"|\\lambda_2/\\lambda_1|"}),"."]})]}),e.jsxs(S,{wahr:!0,children:[e.jsx(i.p,{children:"Ähnliche Matrizen haben dasselbe charakteristische Polynom."}),e.jsxs(i.p,{children:["Das ist ",e.jsx(s,{id:"env:aehnliche-matrizen-haben-dieselben",href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"}),`(1), denn
`,e.jsx(n,{children:"\\det(\\bQ(\\bA - \\lambda\\bI)\\bQ^{-1}) = \\det(\\bA - \\lambda\\bI)"}),`. Daraus folgen
gleiche Eigenwerte samt Vielfachheiten, Spur und Determinante. Die Eigen`,e.jsx(i.em,{children:"vektoren"}),` stimmen dagegen im Allgemeinen nicht
überein; sie gehen über `,e.jsx(n,{children:"\\bx = \\bQ^{-1}\\by"})," auseinander hervor."]})]}),e.jsxs(S,{wahr:!1,children:[e.jsx(i.p,{children:`Die QR-Iteration konvergiert für jede reelle Matrix gegen eine obere
Dreiecksmatrix.`}),e.jsxs(i.p,{children:["Die Drehung um ",e.jsx(n,{children:"90^\\circ"}),` mit den komplexen, betragsgleichen Eigenwerten
`,e.jsx(n,{children:"\\pm i"})," ist ein Gegenbeispiel: Dort ist ",e.jsx(n,{children:"\\bQ^{(1)} = \\bA"}),` und
`,e.jsx(n,{children:"\\bR^{(1)} = \\bI"}),", die Iteration bleibt also für immer bei ",e.jsx(n,{children:"\\bA"}),` stehen
(`,e.jsx(i.a,{href:"#env-wogegen-die-qr-iteration-konvergiert",children:"Bemerkung 8.1.14"}),`). Für die Konvergenz gegen
die Schur-Form brauchen wir reelle, betragsmäßig getrennte Eigenwerte.`]})]}),e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Schritt der Potenzmethode kostet ",e.jsx(n,{children:"O(n^3)"})," Operationen."]}),e.jsxs(i.p,{children:[`Ein Schritt besteht aus einem Matrix-Vektor-Produkt und einer Normierung, das
sind `,e.jsx(n,{children:"O(n^2)"}),` Operationen für eine volle Matrix und noch weniger für eine
dünnbesetzte. `,e.jsx(n,{children:"O(n^3)"}),` kostet dagegen jede einzelne QR-Iteration, weil dort in
jedem Schritt eine ganze Matrix zerlegt wird (`,e.jsx(i.a,{href:"#env-eigenwerte-aufwand",children:"Bemerkung 8.1.17"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §4.5 zu Potenzmethode, Ähnlichkeitstransformationen und
QR-Iteration.`})})]})}function Rn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ge,{...r})}):Ge(r)}const Mn=[[0,0,.5,1],[.5,0,0,0],[.5,1,0,0],[0,0,.5,0]],we=["a","b","c","d"],qn=[.25,.25,.25,.25],In=[1/3,1/6,1/3,1/6],{blau:Le,gruen:Se}=E,Ae=z,Fn=r=>Mn.map(i=>i.reduce((t,a,o)=>t+a*r[o],0)),ln=20;function Bn(){const r=[qn];for(let i=1;i<=ln;i++)r.push(Fn(r[i-1]));return r}const qe=[[70,50],[230,50],[230,150],[70,150]],Pn=[[0,1],[0,2],[1,2],[2,0],[2,3],[3,0]];function Qn([r,i]){const[t,a]=qe[r],[o,c]=qe[i],h=o-t,d=c-a,x=Math.hypot(h,d),b=h/x,k=d/x,m=22,v=t+b*m,f=a+k*m,D=o-b*m,q=c-k*m,_=(v+D)/2-k*14,p=(f+q)/2+b*14;return`M ${v} ${f} Q ${_} ${p} ${D} ${q}`}function Vn(){const[r,i]=A.useState(0),a=A.useMemo(Bn,[])[r],o=Math.max(...a.map((h,d)=>Math.abs(h-In[d]))),c=o<5e-4;return e.jsxs("div",{className:"my-2",children:[e.jsx(ee,{children:"Klicken wir uns Schritt für Schritt durch die Iteration (und einmal zurück) und vergleichen dabei die vier Scores."}),e.jsxs("p",{className:"mb-2 text-sm",children:["Spalte ",e.jsx(n,{children:"j"})," von ",e.jsx(n,{children:"\\bA"})," hält fest, wie Seite ",e.jsx(n,{children:"j"})," ihren Score weitergibt: zu gleichen Teilen an jede Seite, auf die sie zeigt. Weil jede Spalte sich zu ",e.jsx(n,{children:"1"})," summiert, bleibt die Gesamtsumme erhalten, und wir wenden ",e.jsx(n,{children:"\\bA"})," ohne Normieren an. Die Kreisfläche im Graphen und der Balken rechts zeigen beide den Score der jeweiligen Seite."]}),e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsxs("svg",{width:300,height:200,viewBox:"0 0 300 200",className:"h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600",role:"img","aria-label":`Das Vier-Seiten-Netz mit den Links a nach b, a nach c, b nach c, c nach a, c nach d und d nach a; die Kreisgröße ist der aktuelle Score, im Schritt ${r} sind das ${a.map((h,d)=>`${we[d]} = ${Ae(h)}`).join(", ")}.`,children:[e.jsx("defs",{children:e.jsx("marker",{id:"arrPR8",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:"var(--w-muted)"})})}),Pn.map((h,d)=>e.jsx("path",{d:Qn(h),fill:"none",stroke:"var(--w-muted)",strokeWidth:1.5,markerEnd:"url(#arrPR8)"},d)),qe.map(([h,d],x)=>{const b=10+40*a[x];return e.jsxs("g",{children:[e.jsx("circle",{cx:h,cy:d,r:b,fill:c?Se:Le,opacity:.75}),e.jsx("text",{x:h,y:d+4,fontSize:13,textAnchor:"middle",fill:"white",fontStyle:"italic",children:we[x]})]},x)})]}),e.jsxs("div",{className:"min-w-60 grow text-sm",children:[e.jsx(je,{step:r,setStep:i,max:ln,className:"mb-2",narration:"Ein Schritt ist ein Matrix-Vektor-Produkt x ↦ Ax; A⁰x ist die Gleichverteilung."}),a.map((h,d)=>e.jsxs("div",{className:"my-1 flex items-center gap-2",children:[e.jsxs("span",{className:"w-20 font-mono text-xs",children:["x_",we[d]," = ",Ae(h)]}),e.jsx("div",{className:"h-3 grow rounded bg-slate-200 dark:bg-slate-700",children:e.jsx("div",{className:"h-3 rounded transition-all duration-300",style:{width:`${100*h}%`,background:c?Se:Le}})})]},d)),e.jsxs(H,{kind:c?"ok":"neutral",children:["Iteration ",r,c?e.jsxs(e.Fragment,{children:[":"," ",e.jsx("span",{style:{color:Se,fontWeight:600},children:"Der Abstand zu x* ist unter 5 · 10⁻⁴ gefallen: auf vier Nachkommastellen erreicht ist x* = (1/3, 1/6, 1/3, 1/6), der auf Summe 1 normierte Eigenvektor von A zum Eigenwert 1. Auf a und c zeigen je zwei Links, auf b und d nur einer – deshalb der Faktor 2."})]}):e.jsxs(e.Fragment,{children:["; größter Abstand zu x*: ",Ae(o,4),". Er halbiert sich in jedem Schritt, und die Scores nähern sich x* nicht von einer Seite, sondern pendeln um ihre Grenzwerte."]})]})]})]})]})}const Qe=[[3,1],[-3,-1],[2,.4],[-2,-.4],[1,.7],[-1,-.7],[.4,-.4],[-.4,.4]],Nn=Qe.length,B=[[4.0457142857,1.24],[1.24,.5171428571]],ie=.5*Math.atan2(2*B[0][1],B[0][0]-B[1][1])*180/Math.PI,ce=(B[0][0]+B[1][1]+Math.hypot(B[0][0]-B[1][1],2*B[0][1]))/2,Wn=(B[0][0]+B[1][1]-Math.hypot(B[0][0]-B[1][1],2*B[0][1]))/2,Kn=360,Gn=260,se=150,te=125,Ve=33,W=r=>se+Ve*r,K=r=>te-Ve*r,Ln=r=>[Math.cos(r*Math.PI/180),Math.sin(r*Math.PI/180)],On=(r,i)=>{const t=r[0]*i[0]+r[1]*i[1];return[t*i[0],t*i[1]]},Zn=r=>Qe.reduce((i,t)=>i+(t[0]*r[0]+t[1]*r[1])**2,0)/(Nn-1);function Cn(){const[r,i]=A.useState(0),[t,a]=A.useState(!1),o=m=>{i(m),a(!0)},c=Ln(r),h=Zn(c),d=gn({feld:{x0:18,y0:12,w:264,h:226},welt:{x0:-4,x1:4,y0:-3.4,y1:3.4},greifPosition:()=>[c[0]*3,c[1]*3],clamp:([m,v])=>{const f=Math.hypot(m,v);return f<1e-8?[3,0]:[3*m/f,3*v/f]},onDrag:([m,v])=>o(Math.atan2(v,m)*180/Math.PI)}),x=r===ie,b=!x&&Math.abs(Math.sin((r-ie)*Math.PI/180))<.035,k=ie*Math.PI/180;return e.jsxs("div",{className:"space-y-2",children:[e.jsx(ee,{children:"Ziehen wir die blaue Richtung auf dem Kreis und vergleichen wir die Länge der Projektionen."}),e.jsxs("svg",{viewBox:`0 0 ${Kn} ${Gn}`,className:"max-w-full h-auto",role:"img","aria-label":`PCA-Punktwolke mit Richtung ${z(r,1)} Grad und Projektionsvarianz ${z(h,3)}.`,...d.svgProps,children:[e.jsx("rect",{x:"18",y:"12",width:"264",height:"226",fill:"var(--w-bg)",stroke:"var(--w-border)",rx:"4"}),e.jsx("line",{x1:"18",x2:"282",y1:te,y2:te,stroke:"var(--w-axis)"}),e.jsx("line",{x1:se,x2:se,y1:"12",y2:"238",stroke:"var(--w-axis)"}),e.jsx("circle",{cx:se,cy:te,r:3*Ve,fill:"none",stroke:"var(--w-grid-strong)",strokeDasharray:"4 3"}),Qe.map((m,v)=>{const f=On(m,c);return e.jsxs("g",{children:[e.jsx("line",{x1:W(m[0]),y1:K(m[1]),x2:W(f[0]),y2:K(f[1]),stroke:E.rot,strokeOpacity:".45"}),e.jsx("circle",{cx:W(m[0]),cy:K(m[1]),r:"4",fill:E.grau}),e.jsx("circle",{cx:W(f[0]),cy:K(f[1]),r:"3",fill:E.blau})]},v)}),e.jsx("line",{x1:W(-3*c[0]),y1:K(-3*c[1]),x2:W(3*c[0]),y2:K(3*c[1]),stroke:E.blau,strokeWidth:"2.5"}),e.jsx("line",{x1:se,y1:te,x2:W(3*c[0]),y2:K(3*c[1]),stroke:E.blau,strokeWidth:"3"}),e.jsx(bn,{x:W(3*c[0]),y:K(3*c[1]),farbe:E.blau,aktiv:d.dragging==="v",...d.handleProps("v")}),t&&e.jsx("line",{x1:W(-3*Math.cos(k)),y1:K(-3*Math.sin(k)),x2:W(3*Math.cos(k)),y2:K(3*Math.sin(k)),stroke:E.gruen,strokeDasharray:"5 4"}),e.jsx("text",{x:"300",y:"38",fill:"var(--w-text)",fontSize:"12",children:"Varianz"}),e.jsx("rect",{x:"302",y:"48",width:"28",height:"160",fill:"var(--w-grid)",rx:"3"}),e.jsx("rect",{x:"302",y:208-160*h/ce,width:"28",height:160*h/ce,fill:E.blau,rx:"3"}),e.jsx("line",{x1:"298",x2:"334",y1:"48",y2:"48",stroke:E.gruen,strokeWidth:"1.5",strokeDasharray:"4 3"}),e.jsx("text",{x:"336",y:"46",fill:E.gruen,fontSize:"10",children:"λ₁"}),e.jsx("text",{x:"316",y:"224",textAnchor:"middle",fill:"var(--w-text)",fontSize:"11",children:z(h,2)})]}),e.jsx(ue,{label:"Richtung θ",value:r,onChange:o,min:-180,max:180,step:.5,unit:"°",accent:E.blau}),e.jsx("button",{type:"button","aria-pressed":x,disabled:!t,className:"rounded border border-slate-400 px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40",onClick:()=>i(ie),children:"genau auf die Eigenrichtung springen"}),e.jsx(H,{kind:x||b?"ok":"neutral",children:x?e.jsxs(e.Fragment,{children:["Bei θ = ",z(r,4),"° liegt das Maximum: Die Projektionsvarianz ist hier gleich λ₁ = ",z(ce,3),", und die Richtung ist v₁ von Σ. Die senkrechte Richtung trägt den Rest, λ₂ = ",z(Wn,3),", wie in ",L("sec:svd/motivation"),"."]}):b?e.jsxs(e.Fragment,{children:["Bei θ = ",z(r,1),"° sind wir praktisch am Maximum: ",z(h,3)," gegen λ₁ = ",z(ce,3),". Der Maximierer θ* = ",z(ie,2),"° liegt auf keinem Reglerrastwert – exakt treffen wir ihn nur mit dem Knopf darunter."]}):e.jsxs(e.Fragment,{children:["Bei θ = ",z(r,1),"° beträgt die Projektionsvarianz ",z(h,3),". ",t?"Drehen wir zur grün gestrichelten Richtung: Dort maximiert der Rayleigh-Quotient vᵀΣv die Varianz.":"Suchen wir die Richtung, in der die blauen Projektionen am weitesten auseinanderliegen – dort wird vᵀΣv am größten."]})})]})}function Oe(r){const i={a:"a",code:"code",em:"em",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.p,{children:`Einige der größten Rechenprobleme der Praxis sind Eigenwertprobleme, für die
direkte Verfahren zu teuer sind. Drei Beispiele aus Suche, Statistik und
Bildverarbeitung.`}),`
`,e.jsx(i.h3,{children:"Google PageRank"}),`
`,e.jsxs(i.p,{children:["Das Problem: eine Rangordnung für ",e.jsx(n,{children:"n \\approx 10^{10}"}),` Webseiten. Das Modell:
Jede Seite `,e.jsx(n,{children:"i"})," bekommt einen Wichtigkeits-Score ",e.jsx(n,{children:"x_i"}),`, und wichtig ist, wer
von wichtigen Seiten verlinkt wird:`]}),`
`,e.jsx(l,{children:"x_i = \\sum_{j\\colon j \\to i} \\frac{x_j}{d_j} ,"}),`
`,e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"j \\to i"})," bedeutet, dass Seite ",e.jsx(n,{children:"j"})," auf Seite ",e.jsx(n,{children:"i"})," verlinkt, und ",e.jsx(n,{children:"d_j"}),`
die Anzahl der ausgehenden Links von `,e.jsx(n,{children:"j"}),` ist: Jede Seite vererbt ihren
Score gleichmäßig an alle Seiten, auf die sie zeigt. In Matrixform, mit
`,e.jsx(n,{children:"\\bA = \\bigl[\\tfrac{I(j \\to i)}{d_j}\\bigr]_{i,j}"}),", heißt das"]}),`
`,e.jsx(l,{children:"\\bx = \\bA\\bx ,"}),`
`,e.jsxs(i.p,{children:["ein ",e.jsx(s,{id:"eigenvalue-eigenvector",children:"Eigenwertproblem"})," zum Eigenwert ",e.jsx(n,{children:"1"}),"."]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.2.1 (Warum ausgerechnet der Eigenwert 1?)",id:"env-warum-ausgerechnet-der-eigenwert-1",children:[e.jsxs(i.p,{children:[`Hat jede Seite mindestens einen ausgehenden Link, so summiert sich jede
Spalte von `,e.jsx(n,{children:"\\bA"})," zu ",e.jsx(n,{children:"1"}),`: Eine Seite verteilt ihren ganzen Score und behält
nichts zurück. Solche Matrizen heißen `,e.jsx(i.em,{children:"spaltenstochastisch"}),`, und für sie ist
`,e.jsx(n,{children:"1"}),` der betragsgrößte Eigenwert; der zugehörige Eigenvektor lässt sich
nichtnegativ wählen und taugt damit erst als Score-Verteilung.`]}),e.jsxs(i.p,{children:["Für die Potenzmethode reicht das noch nicht: ",e.jsx(s,{id:"env:konvergenz-der-potenzmethode",href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),`
verlangt einen `,e.jsx(i.em,{children:"einfachen"}),` betragsgrößten Eigenwert, und das ist beim rohen
Web-Graphen aus zwei Gründen nicht gegeben. Seiten ohne ausgehende Links
liefern gar keine Spaltensumme `,e.jsx(n,{children:"1"}),`, und zerfällt das Netz in mehrere Teile, so
gehören zu jedem Teil eigene Eigenvektoren zum Eigenwert `,e.jsx(n,{children:"1"}),`. Leere Spalten
füllen wir deshalb gleichverteilt auf: Wer nirgendwohin verlinkt, gibt seinen
Score an alle weiter. Gegen die restlichen Eigenwerte vom Betrag `,e.jsx(n,{children:"1"}),` hilft ein
`,e.jsx(i.em,{children:"Dämpfungsfaktor"})," ",e.jsx(n,{children:"\\alpha"})," mit ",e.jsx(n,{children:"0 < \\alpha < 1"}),`, mit dem wir zu
`,e.jsx(n,{children:"\\alpha\\bA + \\tfrac{1-\\alpha}{n}\\bE"})," übergehen, wobei ",e.jsx(n,{children:"\\bE"}),` nur Einsen
enthält. Anschaulich springt ein zufälliger Surfer mit Wahrscheinlichkeit
`,e.jsx(n,{children:"1-\\alpha"}),` auf eine beliebige Seite, statt einem Link zu folgen. Die neue Matrix ist strikt
positiv, ihr Eigenwert `,e.jsx(n,{children:"1"}),` ist einfach, und alle übrigen Eigenwerte liegen
betragsmäßig bei höchstens `,e.jsx(n,{children:"\\alpha"}),`. Erst damit ist der PageRank-Vektor der
dominante Eigenvektor, und die Rate aus `,e.jsx(s,{id:"env:konvergenz-der-potenzmethode",href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),` ist
durch `,e.jsx(n,{children:"\\corange{\\alpha}"})," beschränkt."]})]}),`
`,e.jsx(M,{title:"Woher der Eigenwert 1 kommt",children:e.jsxs(i.p,{children:["Dass ",e.jsx(n,{children:"1"}),` der betragsgrößte Eigenwert einer spaltenstochastischen Matrix
ist, folgt aus zwei bekannten Tatsachen. `,e.jsx(n,{children:"\\bA^\\top"}),` hat lauter Zeilensummen
`,e.jsx(n,{children:"1"}),` und hält damit den Vektor aus lauter Einsen fest; Transponieren ändert das
charakteristische Polynom nicht, also ist `,e.jsx(n,{children:"1"})," auch Eigenwert von ",e.jsx(n,{children:"\\bA"}),`. Kein
Eigenwert liegt betragsmäßig darüber, denn die Spaltensummennorm
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),") ist ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_1 = 1"}),`, und der
`,e.jsx(s,{id:"spectral-radius",children:"Spektralradius"}),` bleibt unter jeder submultiplikativen
Norm (`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),`). Dass sich der zugehörige
Eigenvektor nichtnegativ wählen lässt, liefert die Perron-Frobenius-Theorie
für nichtnegative Matrizen.`]})}),`
`,e.jsxs(i.p,{children:["Warum iterativ? Dicht gespeichert hätte die Matrix ",e.jsx(n,{children:"10^{20}"}),` Einträge, und eine
Zerlegung würde `,e.jsx(n,{children:"O(n^3) = 10^{30}"})," Operationen kosten. Aber ",e.jsx(n,{children:"\\bA"}),` ist extrem
`,e.jsx(s,{id:"sparse-matrix",children:"dünn besetzt"}),": Eine typische Seite hat nur etwa ",e.jsx(n,{children:"10"}),`
ausgehende Links, der Speicherbedarf ist also `,e.jsx(n,{children:"O(n)"})," statt ",e.jsx(n,{children:"O(n^2)"}),`. Die
Potenziteration `,e.jsx(n,{children:"\\bx^{(k+1)} = \\bA\\bx^{(k)} / \\|\\bA\\bx^{(k)}\\|"}),` braucht
pro Schritt nur ein Matrix-Vektor-Produkt mit dieser dünnen Matrix, also
`,e.jsx(n,{children:"O(n)"})," Operationen, und rund ",e.jsx(n,{children:"50"}),` Iterationen reichen. Das passt zum
klassischen Dämpfungsfaktor `,e.jsx(n,{children:"\\alpha = 0{,}85"}),` aus
`,e.jsx(i.a,{href:"#env-warum-ausgerechnet-der-eigenwert-1",children:"Bemerkung 8.2.1"}),`, denn
`,e.jsx(n,{children:"\\corange{0{,}85}^{50} \\approx 3 \\cdot 10^{-4}"}),". Insgesamt ",e.jsx(n,{children:"O(n)"}),` statt
`,e.jsx(n,{children:"O(n^3)"}),": Erst das macht die Websuche in dieser Größe möglich."]}),`
`,e.jsxs(J,{title:"PageRank auf einem Vier-Seiten-Netz",children:[e.jsx(i.p,{children:`Welche Seite erhält langfristig den größten Score? Verfolgen wir die
Potenziteration auf dem kleinen Netz.`}),e.jsx(Vn,{}),e.jsxs(i.p,{children:["Auf ",e.jsx(n,{children:"a"})," und ",e.jsx(n,{children:"c"})," zeigen je zwei Links, auf ",e.jsx(n,{children:"b"})," und ",e.jsx(n,{children:"d"}),` nur einer, und dieses
Verhältnis findet die Iteration wieder. Der Score ist trotzdem keine Zählung
von Links, sondern ein Fixpunkt: Er hängt davon ab, wie viel die verweisenden
Seiten selbst wert sind.`]})]}),`
`,e.jsx(O,{children:e.jsxs(S,{wahr:!0,children:[e.jsx(i.p,{children:"Im PageRank-Widget bleibt die Summe der vier Scores bei jedem Schritt gleich."}),e.jsx(i.p,{children:"Die Linkmatrix ist spaltenstochastisch, daher erhält die Iteration die Summe."})]})}),`
`,e.jsx(i.h3,{children:"Hauptkomponentenanalyse (PCA)"}),`
`,e.jsxs(i.p,{children:[`Auch die Datenanalyse rechnet ständig Eigenwerte. Gegeben ist eine
mittelwert-zentrierte Datenmatrix `,e.jsx(n,{children:"\\bX \\in \\R^{n \\times p}"})," (",e.jsx(n,{children:"n"}),`
Beobachtungen, `,e.jsx(n,{children:"p"}),` Variablen); gesucht sind die Richtungen maximaler
Varianz, um die Daten auf wenige Dimensionen zu verdichten. Die Antwort
steckt in der `,e.jsx(s,{id:"covariance-matrix",children:"Kovarianzmatrix"}),":"]}),`
`,e.jsx(l,{children:"\\bSigma = \\frac{1}{n-1}\\,\\bX^\\top\\bX \\in \\R^{p \\times p} ."}),`
`,e.jsxs(i.p,{children:["Ihre Eigenvektoren sind die ",e.jsx(i.em,{children:"Hauptrichtungen"})," oder ",e.jsx(i.em,{children:"Loading-Vektoren"}),` in
`,e.jsx(n,{children:"\\R^p"}),`; die zugehörigen Eigenwerte geben an, wie viel Varianz jede Richtung
erklärt. Die eigentlichen Hauptkomponenten-`,e.jsx(i.em,{children:"Scores"}),` der Beobachtungen sind
`,e.jsx(n,{children:"\\bX\\bv_j"}),`. In der Praxis rechnen wir schneller direkt mit der
Singulärwertzerlegung von `,e.jsx(n,{children:"\\bX"})," (",e.jsx(i.a,{href:"?k=06-svd#sec-6.2",children:"Abschnitt 6.2"}),`), ohne
`,e.jsx(n,{children:"\\bX^\\top\\bX"}),` je zu bilden; warum das auch numerisch klüger ist, steht in
`,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),"."]}),`
`,e.jsxs(J,{title:"PCA: Welche Richtung erklärt am meisten?",children:[e.jsx(i.p,{children:`Wie sieht die Richtung maximaler Varianz in einer Punktwolke aus? Drehen wir
eine Projektionsrichtung durch die Daten.`}),e.jsx(Cn,{}),e.jsxs(i.p,{children:[`Die gesuchte Richtung ist keine Koordinatenachse, sondern die Lösung eines
Maximierungsproblems, und die liefert der erste Eigenvektor von `,e.jsx(n,{children:"\\bSigma"}),`. Sein
Eigenwert `,e.jsx(n,{children:"\\lambda_1"})," ist die dort erreichte Varianz, ",e.jsx(n,{children:"\\lambda_2"}),` die Varianz
senkrecht dazu.`]})]}),`
`,e.jsx(O,{children:e.jsxs(Pe,{loesung:4.43,toleranz:.05,children:[e.jsx(i.p,{children:`Stellen wir im PCA-Widget die blaue Richtung auf die grün gestrichelte Achse:
Wie groß ist die dort angezeigte maximale Projektionsvarianz ungefähr?`}),e.jsxs(i.p,{children:["Die Anzeige erreicht dort den ersten Eigenwert von ",e.jsx(n,{children:"\\bSigma"}),`, also ungefähr
`,e.jsx(n,{children:"4{,}43"}),". In jeder anderen Richtung ist ",e.jsx(n,{children:"\\bv^\\top\\bSigma\\bv"})," kleiner."]})]})}),`
`,e.jsx(g,{kind:"Bemerkung",label:"8.2.2 (Warum iterativ? Lanczos für große p)",id:"env-warum-iterativ-die-lanczos-abkuerzung",children:e.jsxs(i.p,{children:["Moderne Anwendungen haben ",e.jsx(n,{children:"p = 10^4"})," bis ",e.jsx(n,{children:"10^6"}),` Variablen (Gen-Expression,
Bildanalyse), gebraucht werden aber meist nur die `,e.jsx(n,{children:"k \\ll p"}),` größten
Eigenwerte. Gezielt diese approximiert die Lanczos-Iteration
(`,e.jsx(i.a,{href:"#env-welche-zielgestalt-welches-verfahren",children:"Bemerkung 8.1.9"}),`). Arbeitet sie direkt mit
`,e.jsx(n,{children:"\\bX"}),", kostet ein Matrix-Vektor-Paar ",e.jsx(n,{children:"O(\\operatorname{nnz}(\\bX))"}),`; hinzu kommen
Orthogonalisierung und eine Iterationszahl, die von Spektrallücken und
Toleranz abhängt, sodass sich kein pauschaler Beschleunigungsfaktor wie `,e.jsx(n,{children:"p/k"}),`
angeben lässt. `,e.jsx(n,{children:"\\bSigma"}),` selbst stellen wir dabei gar nicht erst auf: Bei
`,e.jsx(n,{children:"p = 100\\,000"})," hätte sie ",e.jsx(n,{children:"10^{10}"}),` Einträge, in doppelter Genauigkeit rund
`,e.jsx(n,{children:"80"})," Gigabyte. In R übernehmen das zum Beispiel ",e.jsx(i.code,{children:"irlba::irlba()"}),` (iterativ)
oder `,e.jsx(i.code,{children:"irlba::svdr()"})," (iterativ und probabilistisch, siehe ",e.jsx(i.a,{href:"#sec-8.4",children:"Abschnitt 8.4"}),")."]})}),`
`,e.jsx(i.h3,{children:"Approximative SVD in der Praxis"}),`
`,e.jsxs(i.p,{children:[`Wie groß der Unterschied ist, zeigt ein Experiment: eine
`,e.jsx(s,{id:"low-rank-approximation",children:"Rang-k-Approximation"}),` an einem Graustufen-Foto
(2500 × 3300 Pixel), einmal mit der vollen SVD und zweimal iterativ mit
`,e.jsx(i.code,{children:"irlba"}),":"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`library(irlba); suppressMessages(library(magick))
# "img" ist 2500 × 3300 px (grayscale)
img <- paste0(
  "https://upload.wikimedia.org/wikipedia/commons/7/7e/",
  "Bolzano_City_Image_-_Photo_by_Giovanni_Ussi_-_In_Black_and_White_19.jpg")
X <- (image_read(img) |>
        image_data(channels = "gray") |>
        as.numeric())[,,1]
r <- 50
microbenchmark::microbenchmark(
  svd_full   = svd(X),
  svd_irlba  = irlba::irlba(X, nv = r, nu = r),
  svd_random = irlba::svdr(X, k = r),
  times = 5)
`})}),`
`,e.jsxs(i.p,{children:["Die vollständige SVD berechnet alle ",e.jsx(n,{children:"2500"})," ",e.jsx(s,{id:"env:singulaerwerte",children:"Singulärwerte"}),", obwohl nur ",e.jsx(n,{children:"50"}),`
gebraucht werden. `,e.jsx(i.code,{children:"irlba"})," und ",e.jsx(i.code,{children:"svdr"}),` tasten die Matrix nur über
Matrix-Vektor-Produkte ab und arbeiten in einem Unterraum der Dimension
`,e.jsx(n,{children:"50"}),`; wie viel Rechenzeit das spart, misst der Vergleich oben. An Qualität
kostet das kaum etwas: `,e.jsx(i.code,{children:"irlba"}),` rechnet dieselbe Rang-50-Zerlegung bis auf eine
einstellbare Toleranz aus, während `,e.jsx(i.code,{children:"svdr"}),` bewusst etwas Genauigkeit gegen
Tempo tauscht. Zum Selbst-Ausprobieren: das Rang-k-Widget in
`,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),` und die
`,e.jsx(i.a,{href:"https://fabian-s.shinyapps.io/truncatedSVD-shiny/",children:"Shiny-App zur Bildkompression"}),"."]}),`
`,e.jsxs(M,{title:"Die Qualität der Rekonstruktionen messen",children:[e.jsx(i.p,{children:"Die drei Rang-50-Rekonstruktionen lassen sich direkt gegenüberstellen:"}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`r <- 50
X_r <- with(svd(X, nu = r, nv = r), u %*% diag(d[1:r]) %*% t(v))
X_irlba <- with(irlba::irlba(X, nu = r, nv = r), u %*% diag(d) %*% t(v))
X_svdr <- with(irlba::svdr(X, k = r), u %*% diag(d) %*% t(v))
norm(X - X_r, "F") / norm(X, "F")
c(norm(X_r - X_irlba, "F"), norm(X_r - X_svdr, "F")) / norm(X_r, "F")
`})}),e.jsxs(i.p,{children:[`Die beiden letzten Zeilen messen Verschiedenes. Die erste ist der relative
Frobenius-Fehler der exakten Rang-50-Approximation, also das Minimum aus
`,e.jsx(s,{id:"env:eckart-und-young-beste-approximation-von",href:"?k=06-svd#env-eckart-und-young-beste-approximation-von",children:"Satz 6.4.4"}),`. Die zweite misst den Abstand
der beiden iterativen Rekonstruktionen zu dieser exakten Lösung. Ist sie
deutlich kleiner als die erste, spielt der Zusatzfehler der Abkürzung neben
dem Approximationsfehler keine Rolle.`]})]}),`
`,e.jsx(i.h3,{children:"Die Verfahren im Vergleich"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Methode"}),e.jsx(i.th,{children:"Komplexität / Iteration"}),e.jsx(i.th,{children:"Anwendung"}),e.jsx(i.th,{children:"Output"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Potenzmethode"}),e.jsx(i.td,{children:e.jsx(n,{children:"O(\\operatorname{nnz}(\\bA))"})}),e.jsx(i.td,{children:"größter Eigenwert/-vektor"}),e.jsx(i.td,{children:"1 Eigenpaar"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"(shifted) QR"}),e.jsxs(i.td,{children:["einmalig ",e.jsx(n,{children:"O(n^3)"}),"; danach ",e.jsx(n,{children:"O(n^2)"})," je Hessenberg-Sweep"]}),e.jsx(i.td,{children:"alle Eigenwerte"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"n"})," Eigenwerte"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Lanczos"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"O(m\\operatorname{nnz}(\\bA)+nm^2)"})," für ",e.jsx(n,{children:"m"})," Schritte mit voller Reorthogonalisierung"]}),e.jsxs(i.td,{children:["wenige Extremal-Eigenwerte, ",e.jsx(i.em,{children:"sparse"})," ",e.jsx(n,{children:"\\bA"})]}),e.jsxs(i.td,{children:["bis zu ",e.jsx(n,{children:"m \\ll n"})," Eigenpaare"]})]})]})]}),`
`,e.jsxs(i.p,{children:["Dabei zählt ",e.jsx(n,{children:"\\operatorname{nnz}(\\cdot)"}),` die Nicht-Null-Einträge. Die
Potenzmethode konvergiert mit der Rate `,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"}),`, die
QR-Iteration mit Shifts oft quadratisch und am stabilsten, ohne Shifts nur
linear (`,e.jsx(i.a,{href:"#env-wogegen-die-qr-iteration-konvergiert",children:"Bemerkung 8.1.14"}),`). Als Faustregeln:
Für `,e.jsx(i.em,{children:"sparse"}),` Matrizen ist Lanczos deutlich überlegen; wer alle Eigenwerte
braucht und Speicher übrig hat, nimmt die (shifted) QR-Iteration; für wenige
Eigenpaare reichen Potenzmethode (eines) oder Lanczos (`,e.jsx(n,{children:"m \\ll n"}),")."]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §4.5 (iterative Eigenwertverfahren: Potenzmethode,
QR-Iteration, Lanczos); zur PCA-über-SVD-Verbindung noch einmal
`,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),"."]})})]})}function $n(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Oe,{...r})}):Oe(r)}const{gruen:ge,blau:Ze,rot:le,orange:_e}=E,oe=[[4,1],[1,3]],Ce=[1,2],Q=[1/11,7/11],dn=(7+Math.sqrt(5))/2,Tn=(7-Math.sqrt(5))/2,re=12,be=2/dn;function Hn(r){return[Ce[0]-(oe[0][0]*r[0]+oe[0][1]*r[1]),Ce[1]-(oe[1][0]*r[0]+oe[1][1]*r[1])]}function Xn(r){return Math.hypot(r[0]-Q[0],r[1]-Q[1])}function Un(r){return Math.max(Math.abs(1-r*dn),Math.abs(1-r*Tn))}const Jn="⁰¹²³⁴⁵⁶⁷⁸⁹";function De(r){return String(r).split("").map(i=>Jn[Number(i)]).join("")}const R=z,Z=30,$e=16,P=288;function Yn({punkte:r,naechster:i}){const t=i?[...r,Q,i]:[...r,Q],a=t.map(j=>j[0]),o=t.map(j=>j[1]),c=(Math.min(...a)+Math.max(...a))/2,h=(Math.min(...o)+Math.max(...o))/2,d=Math.max(Math.max(...a)-Math.min(...a),Math.max(...o)-Math.min(...o)),x=d*1.25>8,b=x?Q[0]:c,k=x?Q[1]:h,m=Math.min(8,Math.max(1.1,d*1.25)),v=b-m/2,f=b+m/2,D=k-m/2,q=k+m/2,_=j=>Z+(j-v)/(f-v)*P,p=j=>P-(j-D)/(q-D)*P,u=j=>j[0]>=v&&j[0]<=f&&j[1]>=D&&j[1]<=q,y=r.map(j=>`${_(j[0])},${p(j[1])}`).join(" ");return e.jsxs("div",{className:"min-w-0 shrink select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:Z},children:"x₂ ↑"}),e.jsxs("svg",{width:Z+P+6,height:P+$e,viewBox:`0 0 ${Z+P+6} ${P+$e}`,className:"h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600",role:"img","aria-label":`Der Weg der Iterierten in der x₁-x₂-Ebene; ${r.length} Punkte, der letzte bei (${R(r[r.length-1][0],3)}; ${R(r[r.length-1][1],3)}), die Lösung liegt bei (0,091; 0,636).`,children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:"s83-clip",children:e.jsx("rect",{x:Z,y:0,width:P,height:P})}),e.jsx("marker",{id:"s83-pfeil",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:le})})]}),We(D,q).map(j=>e.jsxs("g",{children:[e.jsx("line",{x1:Z,x2:Z+P,y1:p(j),y2:p(j),stroke:"var(--w-grid-strong)",strokeWidth:j===0?1.4:.6}),e.jsx("text",{x:Z-4,y:p(j)+3,textAnchor:"end",fill:"var(--w-muted)",fontSize:10,children:R(j,Math.abs(j)>=1?0:1)})]},`y${j}`)),We(v,f).map(j=>e.jsxs("g",{children:[e.jsx("line",{y1:0,y2:P,x1:_(j),x2:_(j),stroke:"var(--w-grid-strong)",strokeWidth:j===0?1.4:.6}),e.jsx("text",{x:_(j),y:P+12,textAnchor:"middle",fill:"var(--w-muted)",fontSize:10,children:R(j,Math.abs(j)>=1?0:1)})]},`x${j}`)),e.jsxs("g",{clipPath:"url(#s83-clip)",children:[r.length>1&&e.jsx("polyline",{points:y,fill:"none",stroke:Ze,strokeWidth:1.5,opacity:.75}),i&&u(r[r.length-1])&&e.jsx("line",{x1:_(r[r.length-1][0]),y1:p(r[r.length-1][1]),x2:_(i[0]),y2:p(i[1]),stroke:le,strokeWidth:2,markerEnd:"url(#s83-pfeil)"}),e.jsx("circle",{cx:_(Q[0]),cy:p(Q[1]),r:6,fill:"none",stroke:ge,strokeWidth:2}),e.jsx("circle",{cx:_(Q[0]),cy:p(Q[1]),r:2.5,fill:ge}),r.map((j,N)=>u(j)?e.jsx("circle",{cx:_(j[0]),cy:p(j[1]),r:N===r.length-1?4.5:2.5,fill:Ze,opacity:N===r.length-1?1:.55},N):null),e.jsx("text",{x:_(Q[0])+9,y:p(Q[1])-7,fill:ge,fontSize:11,children:"x"})]})]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:Z},children:"x₁ →"})]})}function ei({gamma:r,setGamma:i,zeigeGrenze:t=!1}={}){const[a,o]=A.useState(.25),c=r??a,h=i??o,[d,x]=A.useState(1),{schritte:b,rho:k}=A.useMemo(()=>{const p=[];let u=[0,0];for(let y=0;y<=re;y++){const j=Hn(u);p.push({x:u,r:j,err:Xn(u)}),u=[u[0]+c*j[0],u[1]+c*j[1]]}return{schritte:p,rho:Un(c)}},[c]),m=b[d],v=d>0?b[d-1]:null,f=v?m.err/v.err:NaN,{series:D,markers:q,yDomain:_}=A.useMemo(()=>{const p=b[0].err,u=F=>F>0?Math.log10(F):NaN,y=F=>{const he=Math.log10(p)+F*Math.log10(k);return Number.isFinite(he)?he:NaN},N=[...b.map(F=>u(F.err)).filter(F=>Number.isFinite(F)),y(0),y(re)].filter(F=>Number.isFinite(F)),I=Math.min(...N)-.4,X=Math.max(...N)+.4,cn=b.slice(0,d+1).map((F,he)=>({x:he,y:u(F.err),color:le})).filter(F=>Number.isFinite(F.y)),Ne=[{f:y,color:_e,dash:[7,4]}];return t&&Ne.push({f:()=>Math.log10(p),color:ge,dash:[3,3]}),{series:Ne,markers:cn,yDomain:[I,X]}},[b,k,d,t]);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(ee,{children:"Wählen wir eine Schrittweite, schätzen die Kippgrenze und verfolgen dann die Fehlerkurve."}),e.jsx(ue,{label:"γ (Schrittweite)",value:c,onChange:p=>h(Math.round(p*1e3)/1e3),min:.05,max:.55,step:.001,fmt:p=>R(p,3)}),t&&e.jsxs("p",{className:"text-xs",style:{color:_e},children:["Kippgrenze γ* = 2/λ",e.jsx("sub",{children:"max"})," = ",R(be,4),": Links davon fällt der Fehler, rechts davon wächst er. Die grün gestrichelte Waagerechte im Fehlerplot ist die Höhe, auf der er bei ρ = 1 stehen bliebe."]}),e.jsx(je,{step:d,setStep:x,max:re,narration:"Ein Schritt wendet die aktuelle Residuumskorrektur an."}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsx(Yn,{punkte:b.slice(0,d+1).map(p=>p.x),naechster:d<re?b[d+1].x:null}),e.jsx(Be,{xLabel:"k",yLabel:"log₁₀ ‖x⁽ᵏ⁾ − x‖",series:D,markers:q,xDomain:[0,re],yDomain:_,width:300,height:288,ariaLabel:`Fehler der Iterierten auf logarithmischer Skala über der Schrittzahl, mit der Theoriegeraden zur Rate ${R(k,3)}.`})]}),e.jsxs("div",{className:"max-w-prose space-y-1 text-sm",children:[e.jsxs("p",{children:[e.jsxs("span",{className:"font-mono",children:["x⁽",De(d),"⁾ = (",R(m.x[0],4),"; ",R(m.x[1],4),")"]}),", Residuum"," ",e.jsxs("span",{className:"font-mono",style:{color:le},children:["r⁽",De(d),"⁾ = (",R(m.r[0],4),"; ",R(m.r[1],4),")"]})]}),e.jsxs("p",{children:["Fehler"," ",e.jsxs("span",{className:"font-mono",style:{color:le},children:["‖x⁽",De(d),"⁾ − x‖ = ",R(m.err,4)]}),", Verhältnis zum Vorschritt"," ",e.jsx("span",{className:"font-mono",children:R(f,3)}),", Vorhersage"," ",e.jsxs("span",{className:"font-mono",style:{color:_e},children:["ρ = ",R(k,3)]})]}),e.jsx(H,{kind:k<.999?"ok":k<=1.001?"warn":"fail",children:k<.999?`ρ < 1: ${L("satz:konvergenz-der-korrekturiteration")} greift, und der Fehler fällt auf Dauer je Schritt auf etwa das ${R(k,2)}-fache.`:k<=1.001?"ρ ≈ 1: der Grenzfall. Die Schranke des Satzes verspricht nichts mehr, die Iterierten kommen kaum noch voran.":`ρ > 1: die Voraussetzung von ${L("satz:konvergenz-der-korrekturiteration")} ist verletzt, und hier läuft die Iteration tatsächlich davon (auf Dauer das ${R(k,2)}-fache je Schritt).`})]})]})}function ni(){const[r,i]=A.useState(.25),[t,a]=A.useState(!1);return e.jsx(un,{frage:"Ab welchem γ beginnt diese Richardson-Iteration zu divergieren?",loesung:be,toleranz:.02,einheit:"γ",min:.05,max:.55,schritt:.005,onAufloesen:()=>{i(be),a(!0)},verdeckt:e.jsxs(H,{kind:"neutral",titel:"Auflösung:",children:["Die Grenze ist γ* = 2/λ",e.jsx("sub",{children:"max"})," = ",R(be,4),": Genau dort ist ρ = |1 − γ λ",e.jsx("sub",{children:"max"}),"| = 1. Der Regler steht jetzt darauf, und die grün gestrichelte Waagerechte im Fehlerplot zeigt, wo der Fehler dann hängen bliebe. Ein Tausendstel weiter nach rechts, und die Iterierten laufen davon."]}),children:e.jsx(ei,{gamma:r,setGamma:i,zeigeGrenze:t})})}function Te(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Für ",e.jsx(s,{id:"linear-system",children:"lineare Gleichungssysteme"})," ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),` und für
`,e.jsx(s,{id:"env:kleinste-quadrate-problem-kq-problem",children:"Kleinste-Quadrate-Probleme"})," kennen wir bisher nur ",e.jsx(i.em,{children:"direkte"}),` Verfahren. Die
`,e.jsx(s,{id:"env:lu-zerlegung",children:"LU-Zerlegung"})," aus ",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"})," und die ",e.jsx(s,{id:"env:qr-zerlegung",children:"QR-Zerlegung"}),` aus
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),` zerlegen die Matrix einmal vollständig und
liefern danach die Lösung bis auf Rundungsfehler exakt. Das kostet eine feste
Operationszahl der Größenordnung `,e.jsx(n,{children:"n^3"}),`, unabhängig davon, wie genau wir die
Lösung brauchen.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Iterative Verfahren"}),` erzeugen dagegen eine Folge von Näherungen
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}, \\cblue{\\bx^{(1)}}, \\cblue{\\bx^{(2)}}, \\dots"}),`, die gegen die
Lösung `,e.jsx(n,{children:"\\cgreen{\\bx}"}),` strebt, und hören auf, sobald die erreichte Genauigkeit
genügt. Meist sind es
`,e.jsx(s,{id:"fixed-point-iteration",children:e.jsx(i.em,{children:"Fixpunktiterationen"})}),` (fixed point iterations):
Eine Vorschrift wird immer wieder auf ihr eigenes Ergebnis angewendet, und die
gesuchte Lösung ist der Punkt, den sie nicht mehr bewegt.`]}),`
`,e.jsx(i.h3,{children:"Residuum und Korrekturschritt"}),`
`,e.jsxs(i.p,{children:[`Um uns der Lösung schrittweise zu nähern, brauchen wir ein Maß dafür, wie gut
eine Näherung ist. Die Lösung `,e.jsx(n,{children:"\\cgreen{\\bx}"}),` kennen wir nicht, einsetzen
können wir die Näherung aber immer.`]}),`
`,e.jsxs(g,{kind:"Definition",label:"8.3.1 (Residuum)",id:"env-residuum",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),", ",e.jsx(n,{children:"\\bb \\in \\R^n"})," und ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}} \\in \\R^n"}),`
eine Näherung der Lösung von `,e.jsx(n,{children:"\\bA\\bx = \\bb"}),". Der Vektor"]}),e.jsx(l,{children:"\\cred{\\br^{(k)}} = \\bb - \\bA\\,\\cblue{\\bx^{(k)}}"}),e.jsxs(i.p,{children:["heißt ",e.jsx(i.em,{children:"Residuum"})," (residual) von ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Das Residuum misst, wie weit die Näherung davon entfernt ist, die Gleichung zu
erfüllen. Ist `,e.jsx(n,{children:"\\cred{\\br^{(k)}} = \\bnull"}),`, so gilt
`,e.jsx(n,{children:"\\bA\\cblue{\\bx^{(k)}} = \\bb"}),`, und wir haben die Lösung gefunden. Solange das
Residuum nicht verschwindet, korrigieren wir unsere Schätzung:`]}),`
`,e.jsx(l,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\underbrace{\\bC\\,\\cred{\\br^{(k)}}}_{\\text{Korrekturschritt}} ."}),`
`,e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bC \\in \\R^{n \\times n}"}),` legt fest, wie stark und in welche
Richtung wir korrigieren; sie ist der einzige Entwurfsspielraum des
Verfahrens.`]}),`
`,e.jsxs(i.p,{children:["Im einfachsten Fall ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"}),` lautet der Schritt
`,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\gamma\\,\\cred{\\br^{(k)}}"}),`: Wir gehen
ein Stück in Richtung des Residuums, wie bei einem
`,e.jsx(s,{id:"gradient-descent",children:"Gradientenabstieg"})," mit Schrittweite ",e.jsx(n,{children:"\\gamma"}),`. Mit zu
kleinen Schritten kommen wir kaum voran, zu große schießen über das Ziel
hinaus.`]}),`
`,e.jsx(M,{title:"Das Residuum als negativer Gradient",children:e.jsxs(g,{kind:"Bemerkung",label:"8.3.2 (Verwandtschaft mit dem Gradientenabstieg)",id:"env-verwandtschaft-mit-dem-gradientenabstieg",children:[e.jsxs(i.p,{children:["Die Analogie ist exakt, wenn ",e.jsx(n,{children:"\\bA"})," ",e.jsx(s,{id:"symmetric-matrix",children:"symmetrisch"}),` und
`,e.jsx(s,{id:"positive-definite",children:"positiv definit"}),` ist. Dann hat die
`,e.jsx(s,{id:"quadratic-form",children:"quadratische Form"})]}),e.jsx(l,{children:"f(\\bx) = \\tfrac{1}{2}\\bx^\\top\\bA\\bx - \\bb^\\top\\bx"}),e.jsxs(i.p,{children:["den ",e.jsx(s,{id:"gradient",children:"Gradienten"})," ",e.jsx(n,{children:"\\nabla f(\\bx) = \\bA\\bx - \\bb = -\\cred{\\br}"}),`, und
ihr Minimum liegt bei `,e.jsx(n,{children:"\\bA\\bx = \\bb"}),`. Das Residuum zeigt also in Richtung
des steilsten Abstiegs, und `,e.jsx(n,{children:"\\gamma"})," ist die Schrittweite."]})]})}),`
`,e.jsxs(i.p,{children:["Warum geben wir uns mit Näherungen zufrieden, wo doch ",e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"}),` exakte
Verfahren bereithält? Weil ein Iterationsschritt viel billiger ist als eine
ganze Zerlegung. Für sehr große und für `,e.jsx(s,{id:"sparse-matrix",children:"dünnbesetzte"}),`
Systeme, wie sie in der Statistik etwa bei Netzwerkdaten oder
Glättungsproblemen auftreten, sind iterative Verfahren deshalb oft um
Größenordnungen schneller.`]}),`
`,e.jsx(i.h3,{children:"Die Iteration und ihr Konvergenzsatz"}),`
`,e.jsxs(g,{kind:"Definition",label:"8.3.3 (Korrekturiteration)",id:"env-korrekturiteration",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),", ",e.jsx(n,{children:"\\bb \\in \\R^n"})," und ",e.jsx(n,{children:"\\bx"}),` die Lösung von
`,e.jsx(n,{children:"\\bA\\bx = \\bb"}),". Für einen beliebigen Startwert ",e.jsx(n,{children:"\\cblue{\\bx^{(0)}} \\in \\R^n"}),` und
eine Matrix `,e.jsx(n,{children:"\\bC \\in \\R^{n \\times n}"})," heißt"]}),e.jsx(V,{tag:"8.3.1",id:"eq-korrekturiteration",children:`\\cblue{\\bx^{(k)}} = \\cblue{\\bx^{(k-1)}} + \\bC\\bigl(\\bb - \\bA\\,\\cblue{\\bx^{(k-1)}}\\bigr) ,
\\qquad k = 1, 2, \\dots`}),e.jsxs(i.p,{children:["die von ",e.jsx(n,{children:"\\bC"})," erzeugte ",e.jsx(i.em,{children:"Korrekturiteration"}),"."]})]}),`
`,e.jsx(i.p,{children:"Multiplizieren wir die Klammer aus, so zeigt sich die Fixpunktstruktur."}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.3.4 (Fixpunktform)",id:"env-fixpunktform",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bB = \\bI_n - \\bC\\bA"})," ist ",e.jsx(i.a,{href:"#eq-korrekturiteration",children:"(8.3.1)"})," gleichwertig zu"]}),e.jsx(V,{tag:"8.3.2",id:"eq-fixpunktform",children:`\\cblue{\\bx^{(k)}} = \\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb ,
\\qquad k = 1, 2, \\dots`}),e.jsxs(i.p,{children:[`Jeder Schritt besteht also aus einer festen affinen Abbildung, angewandt auf das
Ergebnis des vorigen Schritts. Die Matrix `,e.jsx(n,{children:"\\bB"})," heißt ",e.jsx(i.em,{children:"Iterationsmatrix"}),`; sie
allein entscheidet, ob die Folge zusammenläuft.`]})]}),`
`,e.jsxs(i.p,{children:["Es braucht nur eine Bedingung an ",e.jsx(n,{children:"\\bB"}),"."]}),`
`,e.jsxs(g,{kind:"Satz",label:"8.3.5 (Konvergenz der Korrekturiteration)",id:"env-konvergenz-der-korrekturiteration",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cgreen{\\bx}"})," die eindeutige Lösung von ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),`. Gilt für die
`,e.jsx(s,{id:"matrix-norm",children:"Spektralnorm"})]}),e.jsx(l,{children:"\\corange{\\rho} := \\left\\|\\bI_n - \\bC\\bA\\right\\|_2 < 1 ,"}),e.jsxs(i.p,{children:["so folgt für alle ",e.jsx(n,{children:"k \\ge 1"})]}),e.jsx(V,{tag:"8.3.3",id:"eq-konvergenz-der-korrekturiteration",children:`\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\corange{\\rho}^{\\,k} \\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx}\\right\\|_2 .`}),e.jsxs(i.p,{children:["Insbesondere ist ",e.jsx(n,{children:"\\lim_{k \\to \\infty} \\cblue{\\bx^{(k)}} = \\cgreen{\\bx}"}),`, und
zwar für jeden Startwert.`]})]}),`
`,e.jsxs(i.p,{children:["Zur Notation: Das ",e.jsx(n,{children:"\\corange{\\rho}"})," hier ist die ",e.jsx(i.em,{children:"Konvergenzrate"}),` der
Iteration; mit dem Rayleigh-Quotienten `,e.jsx(n,{children:"\\cblue{\\rho^{(k)}}"}),` aus
`,e.jsx(i.a,{href:"#sec-8.1",children:"Abschnitt 8.1"})," hat es nur den Buchstaben gemeinsam."]}),`
`,e.jsxs(M,{title:"Beweis des Konvergenzsatzes und eine Folgerung",children:[e.jsxs(C,{children:[e.jsx(w,{why:e.jsxs(e.Fragment,{children:["Ausmultiplizieren von ",e.jsx(i.a,{href:"#eq-korrekturiteration",children:"(8.3.1)"}),": ",e.jsx(n,{children:"\\bx + \\bC(\\bb - \\bA\\bx) = (\\bI_n - \\bC\\bA)\\bx + \\bC\\bb"})]}),children:e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bB = \\bI_n - \\bC\\bA"})," ist ",e.jsx(n,{children:"\\left\\|\\bB\\right\\|_2 = \\corange{\\rho}"}),`, und
nach `,e.jsx(i.a,{href:"#eq-fixpunktform",children:"(8.3.2)"}),` lautet die Iteration
`,e.jsx(n,{children:"\\cblue{\\bx^{(k)}} = \\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb"}),"."]})}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{\\bx}"})," löst ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),", die Klammer ist also der Nullvektor"]}),children:[e.jsxs(i.p,{children:["Die Lösung ",e.jsx(n,{children:"\\cgreen{\\bx}"})," ist ein ",e.jsx(i.em,{children:"Fixpunkt"})," dieser Abbildung:"]}),e.jsx(l,{children:`\\bB\\,\\cgreen{\\bx} + \\bC\\bb
= (\\bI_n - \\bC\\bA)\\,\\cgreen{\\bx} + \\bC\\bb
= \\cgreen{\\bx} - \\bC\\underbrace{(\\bA\\,\\cgreen{\\bx} - \\bb)}_{=\\,\\bnull}
= \\cgreen{\\bx} .`})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["in Zeile 2 ersetzen wir ",e.jsx(n,{children:"\\cgreen{\\bx}"})," durch ",e.jsx(n,{children:"\\bB\\cgreen{\\bx} + \\bC\\bb"})," (Schritt 2), die Terme ",e.jsx(n,{children:"\\bC\\bb"})," heben sich weg; in der letzten Zeile nutzen wir die definierende Eigenschaft der ",e.jsx(s,{id:"env:operatornorm",children:"Operatornorm"}),", ",e.jsx(n,{children:"\\left\\|\\bB\\bv\\right\\|_2 \\le \\left\\|\\bB\\right\\|_2\\left\\|\\bv\\right\\|_2"})]}),children:[e.jsx(i.p,{children:`Damit lässt sich der Fehler nach einem Schritt abschätzen. Wir ziehen die
Fixpunktgleichung von der Iterationsvorschrift ab:`}),e.jsx(l,{children:`\\begin{aligned}
\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2
&= \\left\\|\\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb - \\cgreen{\\bx}\\right\\|_2 \\\\
&= \\left\\|\\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb - \\bigl(\\bB\\,\\cgreen{\\bx} + \\bC\\bb\\bigr)\\right\\|_2 \\\\
&= \\left\\|\\bB\\bigl(\\cblue{\\bx^{(k-1)}} - \\cgreen{\\bx}\\bigr)\\right\\|_2 \\\\
&\\le \\corange{\\rho} \\left\\|\\cblue{\\bx^{(k-1)}} - \\cgreen{\\bx}\\right\\|_2 .
\\end{aligned}`})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["formal eine Induktion über ",e.jsx(n,{children:"k"}),": Schritt 3 liefert den Induktionsschritt, der Fall ",e.jsx(n,{children:"k = 1"})," ist genau Schritt 3 selbst; ",e.jsx(n,{children:"\\corange{\\rho}^{\\,k} \\to 0"})," gilt für jedes ",e.jsx(n,{children:"\\corange{\\rho} \\in \\lbrack 0, 1)"})]}),children:[e.jsxs(i.p,{children:[`Jeder Schritt drückt den Fehler also auf höchstens das
`,e.jsx(n,{children:"\\corange{\\rho}"}),"-fache. Iterieren wir die Ungleichung, so erhalten wir"]}),e.jsx(l,{children:`\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\corange{\\rho} \\left\\|\\cblue{\\bx^{(k-1)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\corange{\\rho}^{\\,2} \\left\\|\\cblue{\\bx^{(k-2)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\cdots
\\le \\corange{\\rho}^{\\,k} \\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx}\\right\\|_2 ,`}),e.jsxs(i.p,{children:["und wegen ",e.jsx(n,{children:"\\corange{\\rho} < 1"})," geht die rechte Seite gegen null."]})]})]}),e.jsxs(i.p,{children:["Die Voraussetzung des Satzes ist stärker, als sie aussieht. Wäre ",e.jsx(n,{children:"\\bA"}),`
singulär, so gäbe es ein `,e.jsx(n,{children:"\\bv \\neq \\bnull"})," mit ",e.jsx(n,{children:"\\bA\\bv = \\bnull"}),`, also
`,e.jsx(n,{children:"(\\bI_n - \\bC\\bA)\\bv = \\bv"})," und damit ",e.jsx(n,{children:"\\corange{\\rho} \\ge 1"}),`. Aus
`,e.jsx(n,{children:"\\corange{\\rho} < 1"})," folgt somit von selbst, dass ",e.jsx(n,{children:"\\bA"}),` invertierbar ist und die
Lösung eindeutig.`]})]}),`
`,e.jsxs(i.p,{children:["Die Schranke ",e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"})," beschreibt ",e.jsx(s,{id:"rate-of-convergence",children:"lineare Konvergenz"}),`:
Der Fehler schrumpft pro Schritt auf einen festen Bruchteil, nicht um eine feste
Differenz. Auf logarithmischer Skala aufgetragen bleibt er damit unterhalb einer
Geraden mit Steigung `,e.jsx(n,{children:"\\log \\corange{\\rho}"}),"."]}),`
`,e.jsx(i.h3,{children:"Selbsttest: Was kostet ein Schritt?"}),`
`,e.jsxs(i.p,{children:["Wie teuer ist ein Schritt mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"}),`? Zur
`,e.jsx(s,{id:"big-o-notation",children:"Landau-Notation"})," siehe ",e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),"."]}),`
`,e.jsxs(O,{children:[e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"})," kostet ein Iterationsschritt ",e.jsx(n,{children:"O(1)"})," Operationen."]}),e.jsxs(i.p,{children:["Schon das Ergebnis hat ",e.jsx(n,{children:"n"}),` Komponenten, und jede muss geschrieben werden. Unter
`,e.jsx(n,{children:"O(n)"})," geht es also gar nicht."]})]}),e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"})," kostet ein Iterationsschritt ",e.jsx(n,{children:"O(n)"})," Operationen."]}),e.jsxs(i.p,{children:[`Das gilt nur für die billigen Teile. Der Schritt lautet ausgeschrieben
`,e.jsx(n,{children:"\\bx^{(k)} = \\bx^{(k-1)} - \\gamma\\bigl(\\bA\\bx^{(k-1)}\\bigr) + \\gamma\\bb"}),`: Das
Skalieren mit `,e.jsx(n,{children:"\\gamma"})," und die beiden Vektoradditionen kosten ",e.jsx(n,{children:"O(n)"}),`, das
`,e.jsx(s,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"})," ",e.jsx(n,{children:"\\bA\\bx^{(k-1)}"})," aber mehr."]})]}),e.jsxs(S,{wahr:!0,children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"})," kostet ein Iterationsschritt ",e.jsx(n,{children:"O(n^2)"})," Operationen."]}),e.jsxs(i.p,{children:["Der teuerste Posten ist das Matrix-Vektor-Produkt ",e.jsx(n,{children:"\\bA\\bx^{(k-1)}"}),": ",e.jsx(n,{children:"n"}),`
Komponenten mit je `,e.jsx(n,{children:"n"})," Multiplikationen und ",e.jsx(n,{children:"n-1"}),` Additionen, zusammen
`,e.jsx(n,{children:"O(n^2)"}),"; alles Übrige ist ",e.jsx(n,{children:"O(n)"}),". Ist ",e.jsx(n,{children:"\\bA"}),` dünnbesetzt, sinkt der Aufwand
auf `,e.jsx(n,{children:"O(\\operatorname{nnz}(\\bA))"}),", die Zahl der Einträge ungleich null."]})]}),e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"})," kostet ein Iterationsschritt ",e.jsx(n,{children:"O(n^3)"})," Operationen."]}),e.jsxs(i.p,{children:[`So teuer wäre es nur, wenn wir in jedem Schritt ein Produkt zweier voller
`,e.jsx(n,{children:"n \\times n"}),"-Matrizen bilden würden, etwa ",e.jsx(n,{children:"\\bC\\bA"})," für ein allgemeines ",e.jsx(n,{children:"\\bC"}),`.
Das ist nicht nötig: Wir wenden `,e.jsx(n,{children:"\\bA"}),` direkt auf den aktuellen Vektor an. Wäre ein Schritt so teuer wie eine LU-Zerlegung, hätte
das Verfahren keinen Zweck.`]})]})]}),`
`,e.jsx(i.h3,{children:"Wie viele Schritte bis zur Genauigkeit ε?"}),`
`,e.jsxs(i.p,{children:[e.jsx(s,{id:"env:konvergenz-der-korrekturiteration",href:"#env-konvergenz-der-korrekturiteration",children:"Satz 8.3.5"}),` verspricht einen geometrisch
fallenden Fehler. Wie oft müssen wir iterieren, bis eine vorgegebene Toleranz
`,e.jsx(n,{children:"\\eps"})," unterschritten ist?"]}),`
`,e.jsxs(O,{children:[e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\| \\le \\eps"}),` genügen
`,e.jsx(n,{children:"k = O(1)"})," Schritte."]}),e.jsxs(i.p,{children:["Eine feste Schrittzahl liefert eine feste Genauigkeit, mehr nicht. Wer ",e.jsx(n,{children:"\\eps"}),`
verkleinert, muss weiter iterieren.`]})]}),e.jsxs(S,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\| \\le \\eps"}),` genügen
`,e.jsx(n,{children:"k = O(\\log(1/\\eps))"})," Schritte."]}),e.jsxs(i.p,{children:[`Der Fehler fällt geometrisch, also braucht jede weitere Dezimalstelle
Genauigkeit gleich viele zusätzliche Schritte. Die Herleitung steht direkt im
Anschluss als `,e.jsx(s,{id:"env:zahl-der-iterationen",href:"#env-zahl-der-iterationen",children:"Korollar 8.3.6"}),"."]})]}),e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\| \\le \\eps"}),` brauchen wir
`,e.jsx(n,{children:"k = O(1/\\eps)"})," Schritte."]}),e.jsxs(i.p,{children:["Das wäre die Schrittzahl bei einem Fehler, der nur wie ",e.jsx(n,{children:"1/k"}),` fällt. Hier fällt
er wie `,e.jsx(n,{children:"\\corange{\\rho}^{\\,k}"}),`, und das ist ungleich schneller: Für
`,e.jsx(n,{children:"\\eps = 10^{-6}"}),` stünden hier eine Million Schritte statt der 15, die für das
System aus `,e.jsx(i.a,{href:"#env-richardson-iteration",children:"Beispiel 8.3.11"})," genügen."]})]}),e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\| \\le \\eps"}),` brauchen wir
`,e.jsx(n,{children:"k = O(1/\\eps^k)"})," Schritte."]}),e.jsxs(i.p,{children:["Das kann schon formal nicht stimmen, denn ",e.jsx(n,{children:"k"}),` steht auf beiden Seiten. Eine
Schranke für `,e.jsx(n,{children:"k"})," darf nur von ",e.jsx(n,{children:"\\eps"}),", ",e.jsx(n,{children:"\\corange{\\rho}"}),` und dem Startfehler
abhängen.`]})]})]}),`
`,e.jsxs(i.p,{children:[`Die Antwort folgt allein aus der Schranke
`,e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"}),"."]}),`
`,e.jsxs(g,{kind:"Korollar",label:"8.3.6 (Zahl der Iterationen)",id:"env-zahl-der-iterationen",children:[e.jsxs(i.p,{children:["Es gelte ",e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"})," mit ",e.jsx(n,{children:"\\corange{\\rho} \\in (0, 1)"}),`, und sei
`,e.jsx(n,{children:"\\cred{e_0} = \\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx}\\right\\|_2 > 0"}),` der
Startfehler. Für `,e.jsx(n,{children:"\\eps > 0"}),` ist
`,e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2 \\le \\eps"})," garantiert, sobald"]}),e.jsx(V,{tag:"8.3.4",id:"eq-zahl-der-iterationen",children:`k \\ge \\max\\left\\{0,\\left\\lceil
\\frac{\\log(\\cred{e_0}/\\eps)}{-\\log \\corange{\\rho}}
\\right\\rceil\\right\\}.`}),e.jsxs(i.p,{children:["Insbesondere ist ",e.jsx(n,{children:"k = O(\\log(1/\\eps))"}),"."]})]}),`
`,e.jsxs(C,{children:[e.jsxs(w,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"})," schätzt den Fehler nach oben ab: Wer die Schranke unter ",e.jsx(n,{children:"\\eps"})," drückt, drückt den Fehler mit; ",e.jsx(n,{children:"\\log"})," ist streng monoton wachsend, und ",e.jsx(n,{children:"\\log(\\eps/\\cred{e_0}) = -\\log(\\cred{e_0}/\\eps)"})]}),children:[e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"}),` genügt es,
`,e.jsx(n,{children:"\\corange{\\rho}^{\\,k}\\,\\cred{e_0} \\le \\eps"}),` zu erzwingen, also
`,e.jsx(n,{children:"\\corange{\\rho}^{\\,k} \\le \\eps/\\cred{e_0}"}),`. Beide Seiten sind positiv, wir
dürfen also `,e.jsx(s,{id:"logarithm",children:"logarithmieren"}),". Wegen ",e.jsx(n,{children:"0 < \\corange{\\rho} < 1"}),` ist
`,e.jsx(n,{children:"\\log \\corange{\\rho} < 0"}),`, und beim Teilen durch diese negative Zahl dreht sich
das Ungleichheitszeichen um:`]}),e.jsx(l,{children:`k \\log \\corange{\\rho} \\le \\log\\frac{\\eps}{\\cred{e_0}}
\\qquad\\Longleftrightarrow\\qquad
k \\ge \\frac{\\log(\\eps/\\cred{e_0})}{\\log \\corange{\\rho}}
= \\frac{\\log(\\cred{e_0}/\\eps)}{-\\log \\corange{\\rho}} .`})]}),e.jsx(w,{why:e.jsxs(e.Fragment,{children:["in der Landau-Notation zählt allein das Wachstum in ",e.jsx(n,{children:"\\eps"}),"; ",e.jsx(n,{children:"\\cred{e_0}"})," und ",e.jsx(n,{children:"\\corange{\\rho}"})," hängen nicht von ",e.jsx(n,{children:"\\eps"})," ab"]}),children:e.jsxs(i.p,{children:["Falls ",e.jsx(n,{children:"\\eps\\ge \\cred{e_0}"}),", genügt bereits ",e.jsx(n,{children:"k=0"}),`; andernfalls ist das kleinste
ganzzahlige `,e.jsx(n,{children:"k"})," die Aufrundung. Beides zusammen ergibt ",e.jsx(i.a,{href:"#eq-zahl-der-iterationen",children:"(8.3.4)"}),`. Wegen
`,e.jsx(n,{children:"\\log(\\cred{e_0}/\\eps) = \\log \\cred{e_0} + \\log(1/\\eps)"}),` hängt die Schrittzahl
von der geforderten Genauigkeit nur über `,e.jsx(n,{children:"\\log(1/\\eps)"}),` ab; der Startfehler und
der Faktor `,e.jsx(n,{children:"1/(-\\log \\corange{\\rho})"}),` sind Konstanten. Damit ist
`,e.jsx(n,{children:"k = O(\\log(1/\\eps))"}),"."]})})]}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(i.a,{href:"#env-richardson-iteration",children:"Beispiel 8.3.11"}),` weiter unten ist
`,e.jsx(n,{children:"\\corange{\\rho} \\approx \\corange{0{,}405}"}),` und
`,e.jsx(n,{children:"\\cred{e_0} \\approx \\cred{0{,}643}"}),"; ",e.jsx(i.a,{href:"#eq-zahl-der-iterationen",children:"(8.3.4)"}),` verlangt dann
`,e.jsx(n,{children:"8"})," Schritte für ",e.jsx(n,{children:"\\eps = 10^{-3}"}),", ",e.jsx(n,{children:"15"})," für ",e.jsx(n,{children:"\\eps = 10^{-6}"})," und ",e.jsx(n,{children:"23"}),` für
`,e.jsx(n,{children:"\\eps = 10^{-9}"}),`. Drei zusätzliche Dezimalstellen kosten also jedes Mal rund
sieben bis acht weitere Schritte zu je `,e.jsx(n,{children:"O(n^2)"}),"."]}),`
`,e.jsx(i.h3,{children:"Die Wahl von C"}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.3.7 (Zwei Anforderungen an C)",id:"env-zwei-anforderungen-an-c",children:[e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bC"})," soll gleichzeitig zwei Dinge leisten:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\corange{\\rho} = \\left\\|\\bI_n - \\bC\\bA\\right\\|_2 < 1"}),` soll möglichst klein
sein, damit wenige Schritte reichen. Optimal wäre `,e.jsx(n,{children:"\\bC \\approx \\bA^{-1}"}),"."]}),`
`,e.jsxs(i.li,{children:["Der Schritt ",e.jsx(i.a,{href:"#eq-fixpunktform",children:"(8.3.2)"}),` soll billig auszuwerten sein, also möglichst in
`,e.jsx(n,{children:"O(n^2)"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Die beiden Wünsche stehen gegeneinander. Mit ",e.jsx(n,{children:"\\bC = \\bA^{-1}"}),` wäre
`,e.jsx(n,{children:"\\corange{\\rho} = 0"}),`, und ein einziger Schritt träfe die Lösung exakt. Nur
müssten wir dafür `,e.jsx(n,{children:"\\bA^{-1}"}),` kennen, und das ist teurer als das
`,e.jsx(s,{id:"linear-system",children:"Gleichungssystem"}),` selbst. Brauchbare Wahlen sind deshalb
grobe, billige Näherungen der Inversen.`]})]}),`
`,e.jsxs(g,{kind:"Algorithmus",label:"8.3.8 (Drei klassische Wahlen von C)",id:"env-drei-klassische-wahlen-von-c",children:[e.jsxs(i.p,{children:["Für eine dichte Matrix kosten alle drei pro Schritt ",e.jsx(n,{children:"O(n^2)"}),`; Konvergenz
braucht jeweils zusätzliche Voraussetzungen.`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Richardson-Iteration:"})," ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"}),". Ist ",e.jsx(n,{children:"\\bA"}),` SPD, so garantiert
`,e.jsx(n,{children:"0<\\gamma<2/\\lambda_{\\max}(\\bA)"}),` Konvergenz. Für eine beliebige Matrix
existiert nicht notwendig ein geeignetes positives `,e.jsx(n,{children:"\\gamma"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Jacobi-Iteration:"}),`
`,e.jsx(n,{children:"\\bC = \\diag(\\bA_{11}, \\dots, \\bA_{nn})^{-1}"}),`, die Inverse der
`,e.jsx(s,{id:"diagonal-matrix",children:"Diagonalen"})," von ",e.jsx(n,{children:"\\bA"}),`. Dafür müssen alle
Diagonaleinträge von null verschieden sein. Die Korrektur teilt jede
Residuumskomponente durch das zugehörige Diagonalelement, zusätzlicher
Aufwand `,e.jsx(n,{children:"n"}),` Divisionen. Konvergenz gilt, wenn der
`,e.jsx(s,{id:"spectral-radius",children:"Spektralradius"})," der Iterationsmatrix kleiner als ",e.jsx(n,{children:"1"}),`
ist; strikte Diagonaldominanz ist eine
verbreitete hinreichende Bedingung.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Gauss-Seidel-Iteration:"})," ",e.jsx(n,{children:"\\bC^{-1}"}),` ist das untere
`,e.jsx(s,{id:"triangular-matrix",children:"Dreieck"})," von ",e.jsx(n,{children:"\\bA"}),`, also die Diagonale samt allem
darunter. Invertiert wird nichts: Die Korrektur
`,e.jsx(n,{children:"\\bd = \\bC\\,\\cred{\\br^{(k)}}"}),` ist die Lösung des Dreieckssystems
`,e.jsx(n,{children:"\\bC^{-1}\\bd = \\cred{\\br^{(k)}}"}),`, und die liefert die
`,e.jsx(s,{id:"triangular-solve",children:"Vorwärtssubstitution"})," in ",e.jsx(n,{children:"O(n^2)"}),` Operationen.
Auch hier müssen die Diagonaleinträge ungleich null sein. Konvergenz ist
eine zusätzliche Eigenschaft; für SPD-Matrizen ist sie garantiert.`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["Alle drei ersetzen ",e.jsx(n,{children:"\\bA"}),` durch eine Matrix, mit der sich Gleichungssysteme
leicht lösen lassen (ein Vielfaches der Einheitsmatrix, die Diagonale, das
untere Dreieck), und nehmen deren Inverse als `,e.jsx(n,{children:"\\bC"}),`. Wie gut das gelingt,
hängt von `,e.jsx(n,{children:"\\bA"})," ab."]}),`
`,e.jsx(M,{title:"Richardson, Jacobi und Gauss-Seidel im Vergleich",children:e.jsxs(g,{kind:"Beispiel",label:"8.3.9 (Die drei Wahlen an einem 2×2-System)",id:"env-die-drei-wahlen-an-einem-2-2-system",children:[e.jsx(i.p,{children:"Für"}),e.jsx(l,{children:"\\bA = \\begin{pmatrix} 4 & 1 \\\\ 1 & 3 \\end{pmatrix}"}),e.jsx(i.p,{children:"liefern die drei Rezepte die Iterationsmatrizen"}),e.jsx(l,{children:`\\begin{aligned}
\\text{Richardson } (\\gamma = 0{,}25):&\\quad
\\bI - \\gamma\\bA = \\begin{pmatrix} 0 & -0{,}25 \\\\ -0{,}25 & 0{,}25 \\end{pmatrix} ,
&& \\corange{\\rho} \\approx \\corange{0{,}405} , \\\\
\\text{Jacobi:}&\\quad
\\bI - \\bC\\bA = \\begin{pmatrix} 0 & -\\tfrac{1}{4} \\\\ -\\tfrac{1}{3} & 0 \\end{pmatrix} ,
&& \\corange{\\rho} = \\corange{\\tfrac{1}{3}} \\approx \\corange{0{,}333} , \\\\
\\text{Gauss-Seidel:}&\\quad
\\bI - \\bC\\bA = \\begin{pmatrix} 0 & -\\tfrac{1}{4} \\\\ 0 & \\tfrac{1}{12} \\end{pmatrix} ,
&& \\corange{\\rho} \\approx \\corange{0{,}264} .
\\end{aligned}`}),e.jsxs(i.p,{children:[`Alle drei konvergieren, und in dieser Reihenfolge immer schneller. Hier zahlt
sich aus, dass Jacobi mehr über `,e.jsx(n,{children:"\\bA"}),` weiß als Richardson und Gauss-Seidel mehr
als Jacobi. Als Regel taugt die Reihenfolge trotzdem nicht: Es gibt Matrizen,
für die Jacobi konvergiert und Gauss-Seidel nicht, und ebenso umgekehrt.`]}),e.jsxs(i.p,{children:["Dabei ist ",e.jsx(n,{children:"\\corange{\\rho}"})," die ",e.jsx(i.em,{children:"Norm"}),` der Iterationsmatrix,
und die ist nur ein hinreichendes Kriterium. Die Gauss-Seidel-Matrix hier hat
die `,e.jsx(s,{id:"eigenvalue-eigenvector",children:"Eigenwerte"})," ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"\\tfrac{1}{12}"}),`, ihr
`,e.jsx(s,{id:"spectral-radius",children:"Spektralradius"})," ist also ",e.jsx(n,{children:"0{,}083"}),`, und mit diesem Faktor
schrumpft der Fehler auf lange Sicht. Die Norm `,e.jsx(n,{children:"0{,}264"}),` ist die Garantie, die
schon ab dem ersten Schritt gilt.`]})]})}),`
`,e.jsx(g,{kind:"Bemerkung",label:"8.3.10 (Gesamtaufwand)",id:"env-gesamtaufwand",children:e.jsxs(i.p,{children:["Bei dichter Matrix kostet ein Schritt ",e.jsx(n,{children:"O(n^2)"}),`, und nach
`,e.jsx(s,{id:"env:zahl-der-iterationen",href:"#env-zahl-der-iterationen",children:"Korollar 8.3.6"})," reichen ",e.jsx(n,{children:"O(\\log(\\cred{e_0}/\\eps))"}),` Schritte.
Zusammen sind das `,e.jsx(n,{children:"O(n^2\\log(\\cred{e_0}/\\eps))"}),` Operationen für einen Fehler
unter `,e.jsx(n,{children:"\\eps"}),", gegenüber ",e.jsx(n,{children:"O(n^3)"}),` für eine LU- oder QR-Zerlegung. Das gilt
allerdings nur, solange `,e.jsx(n,{children:"\\corange{\\rho}\\le\\rho_0<1"}),` unabhängig von der
Problemgröße bleibt. Nähert sich `,e.jsx(n,{children:"\\corange{\\rho}"})," mit wachsendem ",e.jsx(n,{children:"n"})," der ",e.jsx(n,{children:"1"}),`,
so wächst auch die Iterationszahl; Präkonditionierung soll das
verhindern. Bei dünnbesetztem `,e.jsx(n,{children:"\\bA"}),` kostet ein Schritt nur
`,e.jsx(n,{children:"O(\\operatorname{nnz}(\\bA))"}),`; umgekehrt können auch direkte Löser bei Band-
oder anderer Struktur deutlich billiger als `,e.jsx(n,{children:"O(n^3)"})," sein."]})}),`
`,e.jsx(i.h3,{children:"Ein Beispiel Schritt für Schritt"}),`
`,e.jsxs(g,{kind:"Beispiel",label:"8.3.11 (Richardson-Iteration)",id:"env-richardson-iteration",children:[e.jsx(i.p,{children:"Gegeben seien"}),e.jsx(l,{children:`\\bA = \\begin{pmatrix} 4 & 1 \\\\ 1 & 3 \\end{pmatrix} , \\qquad
\\bb = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} ,
\\qquad\\text{also}\\qquad
\\cgreen{\\bx} = \\bA^{-1}\\bb = \\frac{1}{11}\\begin{pmatrix} 1 \\\\ 7 \\end{pmatrix}
\\approx \\begin{pmatrix} \\cgreen{0{,}091} \\\\ \\cgreen{0{,}636} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Wir iterieren mit ",e.jsx(n,{children:"\\gamma = 0{,}25"}),` und starten in
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}} = (0, 0)^\\top"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 1:"}),`
`,e.jsx(n,{children:"\\cred{\\br^{(0)}} = \\bb - \\bA\\cblue{\\bx^{(0)}} = (1, 2)^\\top"}),", also"]}),e.jsx(l,{children:`\\cblue{\\bx^{(1)}} = \\cblue{\\bx^{(0)}} + 0{,}25\\,\\cred{\\br^{(0)}}
= \\begin{pmatrix} \\cblue{0{,}25} \\\\ \\cblue{0{,}5} \\end{pmatrix} .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 2:"})," ",e.jsx(n,{children:"\\bA\\cblue{\\bx^{(1)}} = (1{,}5,\\; 1{,}75)^\\top"}),`,
`,e.jsx(n,{children:"\\cred{\\br^{(1)}} = (\\cred{-0{,}5},\\; \\cred{0{,}25})^\\top"}),", also"]}),e.jsx(l,{children:"\\cblue{\\bx^{(2)}} = \\begin{pmatrix} \\cblue{0{,}125} \\\\ \\cblue{0{,}563} \\end{pmatrix} ."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 3:"})," ",e.jsx(n,{children:"\\bA\\cblue{\\bx^{(2)}} = (1{,}063,\\; 1{,}813)^\\top"}),`,
`,e.jsx(n,{children:"\\cred{\\br^{(2)}} = (\\cred{-0{,}063},\\; \\cred{0{,}188})^\\top"}),", also"]}),e.jsx(l,{children:`\\cblue{\\bx^{(3)}} = \\begin{pmatrix} \\cblue{0{,}109} \\\\ \\cblue{0{,}609} \\end{pmatrix}
\\qquad\\Bigl(\\text{exakt } \\tfrac{1}{64}(7, 39)^\\top\\Bigr) .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 4:"})," ",e.jsx(n,{children:"\\bA\\cblue{\\bx^{(3)}} = (1{,}047,\\; 1{,}938)^\\top"}),`,
`,e.jsx(n,{children:"\\cred{\\br^{(3)}} = (\\cred{-0{,}047},\\; \\cred{0{,}063})^\\top"}),", also"]}),e.jsx(l,{children:`\\cblue{\\bx^{(4)}} = \\begin{pmatrix} \\cblue{0{,}098} \\\\ \\cblue{0{,}625} \\end{pmatrix}
\\qquad\\Bigl(\\text{exakt } \\tfrac{1}{256}(25, 160)^\\top\\Bigr) .`}),e.jsxs(i.p,{children:["Die Fehler ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2"})," lauten"]}),e.jsx(l,{children:`\\cred{0{,}643} \\;\\to\\; \\cred{0{,}210} \\;\\to\\; \\cred{0{,}081}
\\;\\to\\; \\cred{0{,}033} \\;\\to\\; \\cred{0{,}013} \\;\\to\\; \\cdots`}),e.jsxs(i.p,{children:[`Vergleich mit der Theorie: Die Iterationsmatrix
`,e.jsx(n,{children:"\\bI - \\gamma\\bA"}),` ist symmetrisch, ihre Norm also der größte Eigenwertbetrag.
Aus den Eigenwerten `,e.jsx(n,{children:"\\tfrac{1}{2}(7 \\pm \\sqrt{5}) \\approx 4{,}618"}),` und
`,e.jsx(n,{children:"2{,}382"})," von ",e.jsx(n,{children:"\\bA"})," werden die Eigenwerte ",e.jsx(n,{children:`1 - 0{,}25 \\cdot 4{,}618 =
-0{,}155`})," und ",e.jsx(n,{children:"1 - 0{,}25 \\cdot 2{,}382 = 0{,}405"}),", also"]}),e.jsx(l,{children:"\\corange{\\rho} = \\left\\|\\bI - \\gamma\\bA\\right\\|_2 \\approx \\corange{0{,}405} ."}),e.jsxs(i.p,{children:[`Der Fehler sollte demnach je Schritt etwa auf das
`,e.jsx(n,{children:"0{,}405"}),"-fache fallen, das heißt um den Faktor ",e.jsx(n,{children:"1/0{,}405 \\approx 2{,}5"}),`
sinken. Die beobachteten Quotienten `,e.jsx(n,{children:"0{,}33"}),", ",e.jsx(n,{children:"0{,}39"}),", ",e.jsx(n,{children:"0{,}40"}),", ",e.jsx(n,{children:"0{,}40"}),`
bestätigen das und nähern sich von unten der Vorhersage an.`]})]}),`
`,e.jsxs(J,{title:"Richardson Schritt für Schritt, mit einstellbarem γ",children:[e.jsx(i.p,{children:`Ab welcher Schrittweite divergiert diese Iteration? Schätzen wir die Grenze,
bevor wir den Verlauf ansehen.`}),e.jsx(ni,{}),e.jsxs(i.p,{children:[`Die Auflösung markiert die Grenze der Konvergenz: Darunter fällt der Fehler
nach `,e.jsx(s,{id:"env:konvergenz-der-korrekturiteration",href:"#env-konvergenz-der-korrekturiteration",children:"Satz 8.3.5"}),` geometrisch, darüber verfehlt die
Iterationsmatrix die Kontraktionsbedingung `,e.jsx(n,{children:"\\corange{\\rho} < 1"}),"."]})]}),`
`,e.jsx(O,{children:e.jsxs(S,{wahr:!0,children:[e.jsxs(i.p,{children:["Zeigt das Richardson-Widget für eine Schrittweite eine Rate ",e.jsx(n,{children:"\\rho>1"}),", dann erfüllt diese Wahl die Konvergenzvoraussetzung von ",e.jsx(s,{id:"env:konvergenz-der-korrekturiteration",href:"#env-konvergenz-der-korrekturiteration",children:"Satz 8.3.5"})," nicht."]}),e.jsxs(i.p,{children:["Die Kontraktionsschranke verlangt ",e.jsx(n,{children:"\\rho<1"}),"."]})]})}),`
`,e.jsx(i.h3,{children:"Einordnung"}),`
`,e.jsx(g,{kind:"Bemerkung",label:"8.3.12 (Was iterative Verfahren leisten)",id:"env-was-iterative-verfahren-leisten",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`Iterative Verfahren gibt es für lineare Gleichungssysteme, für
Eigenwertprobleme (`,e.jsx(i.a,{href:"#sec-8.1",children:"Abschnitt 8.1"}),`) und ebenso für
Kleinste-Quadrate-Probleme (`,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),")."]}),`
`,e.jsxs(i.li,{children:["In Sonderfällen sind sie ",e.jsx(i.em,{children:"exakt"}),". Mit ",e.jsx(n,{children:"\\bC = \\bA^{-1}"}),` etwa ist
`,e.jsx(n,{children:"\\corange{\\rho} = 0"}),`, und ein Schritt genügt; auch Verfahren vom Krylov-Typ
wie das der konjugierten Gradienten erreichen die Lösung in exakter
Arithmetik nach höchstens `,e.jsx(n,{children:"n"})," Schritten."]}),`
`,e.jsx(i.li,{children:`Meistens ergibt sich ein Kompromiss zwischen Laufzeit und Genauigkeit, und
die Iterationszahl ist der Regler dafür. Wo die Laufzeit wichtiger ist als die
letzte Stelle, sind Iterationen die Methode der Wahl.`}),`
`]})}),`
`,e.jsxs(M,{title:"Abbruch nach dem Residuum",children:[e.jsxs(i.p,{children:["Den Fehler ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|"}),` können wir nicht
messen, denn dazu müssten wir `,e.jsx(n,{children:"\\cgreen{\\bx}"}),` kennen. Abgebrochen wird deshalb nach dem
Residuum, das jederzeit verfügbar ist. Wegen
`,e.jsx(n,{children:"\\cblue{\\bx^{(k)}} - \\cgreen{\\bx} = -\\bA^{-1}\\cred{\\br^{(k)}}"})," gilt"]}),e.jsx(l,{children:`\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\left\\|\\bA^{-1}\\right\\|_2 \\left\\|\\cred{\\br^{(k)}}\\right\\|_2 ,`}),e.jsxs(i.p,{children:[`ein kleines Residuum garantiert also nur bei gut konditionierter Matrix einen
kleinen Fehler. Das ist dieselbe Warnung wie bei der
`,e.jsx(s,{id:"condition-number",children:"Konditionszahl"}),` in
`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),", diesmal als Abbruchkriterium."]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §10.9 (iterative Verfahren für lineare Gleichungssysteme,
inklusive Jacobi, Gauss-Seidel und konjugierten Gradienten); für die
Eigenwert-Iterationen aus `,e.jsx(i.a,{href:"#sec-8.1",children:"Abschnitt 8.1"})," siehe Heath §4.5."]})})]})}function ii(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Te,{...r})}):Te(r)}const{gruen:He,blau:Xe,rot:ye,orange:Ee,violett:Re,grau:ri}=E,Y=[.791,.486,.999,.08,.216,.082,.885,.405,.088,.313,.205,.645,.935,.517,.676,.98,.815,.153,.756,.113,.523,.727,.617,.91,.538,.839,.051,.694,.918,.976,.647,.451,.577,.949,.803,.468,.681,.113,.406,.166,.075,.753,.261,.148,.979,.294,.6,.72,.384,.207,.231,.412,.868,.762,.186,.248,.763,.021,.914,.799,.905,.697,.366,.272,.388,.789,.554,.158,.059,.12,.391,.194,.673,.173,.909,.67,.941,.866,.181,.337,.905,.157,.515,.427,.346,.616,.759,.565,.192,.363,.785,.573,.104,.996,.494,.449,.722,.426,.902,.012,.248,.729,.155,.009,.337,.434,.533,.673,.491,.863,.784,.011,.414,.432,.358,.34,.021,.047,.375,.826,.068,.982,.404,.048,.598,.883,.371,.857,.655,.794,.196,.034,.975,.331,.965,.524,.6,.414,.724,.256,.626,.179,.227,.813,.529,.975,.212,.475,.783,.578,.029,.388,.715,.014,.709,.894,.797,.637,.792,.263,.843,.346,.492,.366,.796,.082,.042,.039,.075,.004,.274,.161,.669,.975,.782,.706,.442,.246,.233,.295,.353,.498,.667,.999,.534,.609,.847,.422,.441,.8,.005,.324,.518,.047,.547,.294,.095,.904,.56,.248],de=[.452,.115,.18,.77,.274,.676,.172,.542,.926,.218,.28,.405,.277,.862,.189,.795,.005,.934,.163,.586,.596,.181,.71,.589,.492,.382,.821,.241,.082,.484,.643,.233,.499,.668,.639,.105,.422,.974,.575,.064,.331,.383,.916,.55,.931,.491,.448,.306,.684,.17,.209,.978,.658,.855,.062,.496,.154,.347,.479,.775,.798,.276,.374,.469,.062,.604,.054,.83,.422,.827,.621,.907,.585,.746,.406,.617,.519,.97,.251,.451,.206,.514,.738,.831,.349,.16,.667,.374,.471,.458,.386,.6,.11,.499,.783,.819,.066,.879,.029,.249,.911,.456,.394,.594,.196,.83,.717,.631,.073,.652,.357,.539,.286,.18,.707,.019,.722,.704,.586,.444,.99,.742,.113,.564,.714,.138,.858,.539,.513,.462,.374,.305,.856,.351,.431,.542,.247,.67,.522,.76,.452,.653,.479,.271,.714,.396,.274,.059,.156,.357,.332,.815,.833,.746,.934,.653,.134,.941,.537,.274,.484,.341,.099,.585,.549,.265,.722,.055,.401,.821,.195,.311,.345,.857,.282,.737,.361,.406,.805,.104,.358,.256,.872,.488,.702,.529,.823,.997,.723,.426,.712,.06,.138,.517,.42,.313,.612,.218,.709,.331],Ie=Y.length,Fe=100,Me=118;function me(r,i){let t=0;for(let a=0;a<r.length;a++)t+=r[a]*i[a];return t}const si=Math.sqrt(me(Y,Y)),ti=Math.sqrt(me(de,de)),Ue=Y.map((r,i)=>r-de[i]),hn=Math.sqrt(me(Ue,Ue)),an=Math.acos(me(Y,de)/(si*ti));function li(r){const i=fn(r),t=[];let a=0,o=0,c=0,h=0;for(let d=1;d<=Fe;d++){let x=0,b=0;for(let f=0;f<Ie;f++){const D=mn(i);x+=D*Y[f],b+=D*de[f]}a+=x*x,o+=b*b,c+=x*b,h+=(x-b)*(x-b);const k=Math.sqrt(h/d),m=Math.max(-1,Math.min(1,c/Math.sqrt(a*o))),v=Math.acos(m);t.push({m:d,dist:k,winkel:v,distAbw:(k/hn-1)*100,winkelAbw:(v/an-1)*100})}return t}const G=z;function xe(r){return Number.isFinite(r)?(r>0?"+":"")+G(r,2)+" %":G(r)}const Je=r=>r*180/Math.PI;function di(){const[r,i]=A.useState(25),[t,a]=A.useState(!0),{seed:o,neueStichprobe:c,setSeed:h}=jn(Me),d=A.useMemo(()=>li(o),[o]),x=d[r-1],b=100/Math.sqrt(2*r),{series:k,markers:m,yDomain:v}=A.useMemo(()=>{const f=d.filter(u=>u.m>=2&&(u.m%2===0||u.m===r)),D=Math.max(20,...f.map(u=>Math.min(60,Math.max(Math.abs(u.distAbw),Math.abs(u.winkelAbw))))),q=Math.min(60,D*1.15),_=[...f.map(u=>({x:u.m,y:u.distAbw,color:ye,label:u.m===r?`m = ${r}`:void 0})),...f.map(u=>({x:u.m,y:u.winkelAbw,color:Re}))];return{series:[...t?[{f:u=>u>0?100/Math.sqrt(2*u):NaN,color:Ee,dash:[6,4],label:"Faustregel"},{f:u=>u>0?-100/Math.sqrt(2*u):NaN,color:Ee,dash:[6,4]}]:[],{f:()=>0,color:ri,label:"keine Abweichung"}],markers:_,yDomain:[-q,q]}},[d,r,t]);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(ee,{children:"Verändern wir m und ziehen wir mehrere Skizzen derselben beiden Vektoren."}),e.jsx(ue,{label:"m (Zeilen von S)",value:r,onChange:f=>i(Math.round(f)),min:2,max:Fe,step:1,fmt:f=>String(Math.round(f))}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("button",{type:"button",className:"rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700",onClick:c,children:"neue Sketchmatrix ziehen"}),e.jsx("button",{type:"button",className:"rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700",onClick:()=>h(Me),disabled:o===Me,children:"zurücksetzen"}),e.jsxs("span",{className:"font-mono",children:["Seed ",o]}),e.jsx("button",{type:"button",className:"rounded border border-slate-300 px-3 py-1 dark:border-slate-600","aria-pressed":t,onClick:()=>a(f=>!f),children:t?"Faustregel ausblenden":"Faustregel einblenden"})]}),e.jsx(Be,{xLabel:"m",yLabel:"relative Abweichung in %",series:k,markers:m,xDomain:[2,Fe],yDomain:v,width:460,height:260,ariaLabel:`Relative Abweichung von Abstand (rot) und Winkel (violett) über der Skizzendimension m; bei m = ${r} beträgt sie ${G(x.distAbw,1)} Prozent beziehungsweise ${G(x.winkelAbw,1)} Prozent.`}),e.jsxs("p",{className:"text-xs",children:[e.jsx("span",{style:{color:ye},children:"■"})," Abstand ",e.jsx("span",{style:{color:Re},children:"■"})," ","Winkel ",t&&e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:Ee},children:"▪ ▪"})," Faustregel ±1/√(2m)"]})]}),e.jsxs("div",{className:"max-w-prose space-y-1 text-sm",children:[e.jsxs("p",{className:"font-mono",children:["n = ",Ie,", m = ",r,", Kompression ",G(Ie/r,1),"×"]}),e.jsxs("p",{children:["Abstand"," ",e.jsxs("span",{className:"font-mono",style:{color:He},children:["‖x − y‖ = ",G(hn,4)]})," ","gegen"," ",e.jsxs("span",{className:"font-mono",style:{color:Xe},children:["‖Sx − Sy‖ = ",G(x.dist,4)]}),", Abweichung"," ",e.jsx("span",{className:"font-mono",style:{color:ye},children:xe(x.distAbw)})]}),e.jsxs("p",{children:["Winkel"," ",e.jsxs("span",{className:"font-mono",style:{color:He},children:["∠(x, y) = ",G(Je(an),2),"°"]})," ","gegen"," ",e.jsxs("span",{className:"font-mono",style:{color:Xe},children:["∠(Sx, Sy) = ",G(Je(x.winkel),2),"°"]}),", Abweichung"," ",e.jsx("span",{className:"font-mono",style:{color:Re},children:xe(x.winkelAbw)})]})]}),e.jsx(H,{kind:Math.abs(x.distAbw)<=b?"ok":"warn",children:t?e.jsxs(e.Fragment,{children:["Die Distanzabweichung beträgt ",xe(x.distAbw),"; das Band ±",G(b,2)," % aus der Faustregel enthält diese Ziehung ",Math.abs(x.distAbw)<=b?"noch":"nicht",". ",L("satz:zufaellige-einbettung-eines-festen")," erklärt die verwandte Wurzelrate der Garantie."]}):e.jsxs(e.Fragment,{children:["Die aktuelle Distanzabweichung beträgt ",xe(x.distAbw),". Blenden wir die Faustregel ein, um sie mit der typischen Größenordnung zu vergleichen."]})})]})}function Ye(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Die iterativen Verfahren der Abschnitte ",e.jsx(i.a,{href:"#sec-8.1",children:"8.1"}),` und
`,e.jsx(i.a,{href:"#sec-8.3",children:"8.3"}),` sparen Laufzeit, indem sie früh abbrechen.
Dieser Abschnitt verkleinert stattdessen das Problem selbst.`]}),`
`,e.jsx(i.h3,{children:"Zufall mit Absicht"}),`
`,e.jsxs(i.p,{children:[`Oft sind Probleme so groß, dass wir Genauigkeit gern gegen bessere
Komplexität tauschen. Zunehmend geschieht das durch `,e.jsx(i.em,{children:"Randomisierung"}),`
(randomization): Statt sorgfältig auszuwählen, welchen Teil der Daten wir
wegwerfen, würfeln wir ihn aus.`]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.4.1 (Hauptidee der Randomisierung)",id:"env-hauptidee-der-randomisierung",children:[e.jsx(i.p,{children:`Wir ersetzen ein großes Problem durch ein zufällig erzeugtes, kleines
Problem, das höchstwahrscheinlich eine ähnliche Lösung hat.`}),e.jsxs(i.p,{children:[`„Höchstwahrscheinlich" heißt: Ein randomisiertes Verfahren darf
danebenliegen, und die Fehlerwahrscheinlichkeit `,e.jsx(n,{children:"\\delta"}),` ist ein Parameter,
den wir einstellen. Wir gewinnen Rechenzeit und gehen dafür ein kontrolliertes
Risiko ein.`]})]}),`
`,e.jsxs(i.p,{children:["Warum sollte das gutgehen? Wer eine Punktwolke im ",e.jsx(n,{children:"\\R^{10\\,000}"}),` auf ein paar
hundert Koordinaten reduziert, wirft weit über 90 % der Koordinaten weg. Dass
die Wolke danach noch dieselbe Form hat, liegt an einer Eigenart
hochdimensionaler Räume.`]}),`
`,e.jsx(i.h3,{children:"Fast orthogonale Zufallsvektoren"}),`
`,e.jsxs(i.p,{children:[`In der Ebene sind zwei zufällige Richtungen selten senkrecht: Der Winkel
zwischen ihnen ist gleichverteilt. Im `,e.jsx(n,{children:"\\R^n"})," mit großem ",e.jsx(n,{children:"n"}),` stehen zwei
zufällige Vektoren dagegen mit hoher Wahrscheinlichkeit fast senkrecht
aufeinander. Für unabhängige, standardnormalverteilte `,e.jsx(n,{children:"\\bs_1, \\bs_2 \\in \\R^n"}),`
hat der Kosinus des Winkels zwischen ihnen den Erwartungswert `,e.jsx(n,{children:"0"}),` und die
Varianz `,e.jsx(n,{children:"1/n"}),". Seine Streuung schrumpft also wie ",e.jsx(n,{children:"1/\\sqrt{n}"}),`: In hohen
Dimensionen drängt sich der Winkel um `,e.jsx(n,{children:"90^\\circ"}),` zusammen, zufällige Richtungen
sind praktisch `,e.jsx(s,{id:"orthogonality",children:"orthogonal"}),"."]}),`
`,e.jsxs(M,{title:"Fast-Orthogonalität zufälliger Vektoren",children:[e.jsxs(g,{kind:"Satz",label:"8.4.2 (Zufallsrichtungen stehen fast senkrecht aufeinander)",id:"env-zufallsrichtungen-stehen-fast-senkrecht",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bs_1, \\bs_2 \\in \\R^n"})," unabhängig und je ",e.jsx(n,{children:"\\Ncal(\\bnull, \\bI_n)"}),`-verteilt,
und sei `,e.jsx(n,{children:"\\theta"})," der Winkel zwischen ihnen. Dann gilt"]}),e.jsx(l,{children:"\\E[\\cos\\theta] = 0, \\qquad \\var[\\cos\\theta] = \\frac{1}{n},"}),e.jsxs(i.p,{children:["und für jedes ",e.jsx(n,{children:"t > 0"})," folgt"]}),e.jsx(l,{children:"\\Pr\\left(\\left|\\cos\\theta\\right| \\ge \\frac{t}{\\sqrt{n}}\\right) \\le \\frac{1}{t^2} ."})]}),e.jsxs(C,{children:[e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["der Winkel zwischen zwei Vektoren hängt nur von ihren Richtungen ab; ",e.jsx(n,{children:"\\bs_i = \\bnull"})," tritt mit Wahrscheinlichkeit ",e.jsx(n,{children:"0"})," ein und stört deshalb nicht"]}),children:[e.jsxs(i.p,{children:["Wir normieren beide Vektoren, ",e.jsx(n,{children:"\\bu = \\bs_1/\\left\\|\\bs_1\\right\\|"}),` und
`,e.jsx(n,{children:"\\bv = \\bs_2/\\left\\|\\bs_2\\right\\|"}),`, und schreiben den Kosinus als
`,e.jsx(s,{id:"dot-product",children:"Skalarprodukt"})]}),e.jsx(l,{children:"\\cos\\theta = \\bu^\\top\\bv ."})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bu"})," und ",e.jsx(n,{children:"-\\bu"})," sind gleich verteilt, also ist der Erwartungswert null; die Matrix ",e.jsx(n,{children:"\\E[\\bu\\bu^\\top]"})," ändert sich unter Drehungen nicht und ist deshalb ein Vielfaches der ",e.jsx(s,{id:"identity-matrix",children:"Einheitsmatrix"}),", und der Faktor folgt aus ",e.jsx(n,{children:"\\tr \\E[\\bu\\bu^\\top] = \\E\\left[\\left\\|\\bu\\right\\|^2\\right] = 1"})]}),children:[e.jsxs(i.p,{children:["Die Standardnormalverteilung ist drehinvariant, also ist ",e.jsx(n,{children:"\\bu"}),` gleichverteilt
auf der Einheitssphäre. Daraus folgt`]}),e.jsx(V,{tag:"8.4.1",id:"eq-eq-8-4-1",children:"\\E[\\bu] = \\bnull, \\qquad \\E\\left[\\bu\\bu^\\top\\right] = \\frac{1}{n}\\,\\bI_n ."})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-eq-8-4-1",children:"(8.4.1)"})," mit ",e.jsx(n,{children:"\\left(\\bu^\\top\\bv\\right)^2 = \\bv^\\top\\bu\\bu^\\top\\bv"}),"; ",e.jsx(n,{children:"\\left\\|\\bv\\right\\| = 1"})," nach Konstruktion"]}),children:[e.jsxs(i.p,{children:["Jetzt bedingen wir auf ",e.jsx(n,{children:"\\bv"})," und nutzen die Unabhängigkeit:"]}),e.jsx(l,{children:`\\E\\left[\\bu^\\top\\bv \\mid \\bv\\right] = \\E[\\bu]^\\top\\bv = 0,
\\qquad
\\E\\left[\\left(\\bu^\\top\\bv\\right)^2 \\mid \\bv\\right]
= \\bv^\\top\\E\\left[\\bu\\bu^\\top\\right]\\bv
= \\frac{\\left\\|\\bv\\right\\|^2}{n} = \\frac{1}{n} .`}),e.jsxs(i.p,{children:["Beide Werte hängen nicht mehr von ",e.jsx(n,{children:"\\bv"})," ab, gelten also auch unbedingt."]})]}),e.jsxs(w,{why:e.jsx(e.Fragment,{children:"Tschebyscheff ist die Markov-Ungleichung, angewandt auf die quadrierte Abweichung vom Erwartungswert"}),children:[e.jsxs(i.p,{children:["Wegen ",e.jsx(n,{children:"\\E[\\cos\\theta] = 0"})," ist ",e.jsx(n,{children:"\\var[\\cos\\theta] = \\E\\left[\\cos^2\\theta\\right] = 1/n"}),`,
und die Tschebyscheff-Ungleichung liefert`]}),e.jsx(l,{children:`\\Pr\\left(\\left|\\cos\\theta\\right| \\ge \\frac{t}{\\sqrt{n}}\\right)
\\le \\frac{\\var[\\cos\\theta]}{t^2/n} = \\frac{1}{t^2} .`})]})]}),e.jsxs(g,{kind:"Beispiel",label:"8.4.3 (Wie senkrecht ist fast senkrecht?)",id:"env-wie-senkrecht-ist-fast-senkrecht",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n = 10\\,000"})," ist ",e.jsx(n,{children:"\\var[\\cos\\theta] = 10^{-4}"}),`, die Standardabweichung
also `,e.jsx(n,{children:"0{,}01"}),". Mit ",e.jsx(n,{children:"t = 5"})," liefert ",e.jsx(s,{id:"env:zufallsrichtungen-stehen-fast-senkrecht",href:"#env-zufallsrichtungen-stehen-fast-senkrecht",children:"Satz 8.4.2"})]}),e.jsx(l,{children:"\\Pr\\left(\\left|\\cos\\theta\\right| \\ge 0{,}05\\right) \\le \\frac{1}{25} = 0{,}04 ,"}),e.jsxs(i.p,{children:["mit Wahrscheinlichkeit mindestens ",e.jsx(n,{children:"96\\,\\%"}),` liegt der Winkel also zwischen
`,e.jsx(n,{children:"87{,}1^\\circ"})," und ",e.jsx(n,{children:"92{,}9^\\circ"}),". Zum Vergleich: Für ",e.jsx(n,{children:"n = 100"}),` erlaubt
dieselbe Schranke noch `,e.jsx(n,{children:"\\left|\\cos\\theta\\right| \\le 0{,}5"}),`, also jeden Winkel
zwischen `,e.jsx(n,{children:"60^\\circ"})," und ",e.jsx(n,{children:"120^\\circ"}),". Die Aussage lebt von großem ",e.jsx(n,{children:"n"}),"."]})]})]}),`
`,e.jsxs(i.p,{children:["Ziehen wir ",e.jsx(n,{children:"m"}),` solcher Richtungen und schreiben sie als Zeilen in eine Matrix
`,e.jsx(n,{children:"\\bS"}),`, so stehen je zwei Zeilen fast senkrecht aufeinander. Ein
Orthonormalsystem sind sie deshalb nicht: Für eine Gauss-Zeile
`,e.jsx(n,{children:"\\bs_i \\sim \\Ncal(\\bnull, \\bI_n/m)"}),` ist
`,e.jsx(n,{children:"\\E\\left[\\left\\|\\bs_i\\right\\|^2\\right] = n/m"}),", bei ",e.jsx(n,{children:"n = 10\\,000"}),` und
`,e.jsx(n,{children:"m = 50"})," also ",e.jsx(n,{children:"200"}),". Die fast senkrechten Richtungen verdankt ",e.jsx(n,{children:"\\bS"}),` der hohen
Dimension, die passende Skalierung dem Faktor `,e.jsx(n,{children:"1/m"}),` in der Verteilung. Die Abbildung
`,e.jsx(n,{children:"\\bx \\mapsto \\bS\\bx"})," misst die Länge von ",e.jsx(n,{children:"\\bx"})," dann entlang ",e.jsx(n,{children:"m"}),` zufälliger,
fast senkrechter Achsen.`]}),`
`,e.jsxs(g,{kind:"Definition",label:"8.4.4 (Sketching-Matrix und Skizze)",id:"env-sketching-matrix-und-skizze",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"m < n"}),". Eine Zufallsmatrix ",e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"}),` heißt
`,e.jsx(i.em,{children:"Sketching-Matrix"})," (sketching matrix), und für ",e.jsx(n,{children:"\\bx \\in \\R^n"}),` heißt
`,e.jsx(n,{children:"\\cblue{\\bS\\bx} \\in \\R^m"})," die ",e.jsx(i.em,{children:"Skizze"})," (sketch) von ",e.jsx(n,{children:"\\bx"}),`. Gesucht sind
Verteilungen für `,e.jsx(n,{children:"\\bS"}),", unter denen mit hoher Wahrscheinlichkeit"]}),e.jsx(l,{children:`\\left\\|\\cblue{\\bS\\bx} - \\cblue{\\bS\\by}\\right\\|
\\approx \\left\\|\\cgreen{\\bx} - \\cgreen{\\by}\\right\\|
\\qquad\\text{und}\\qquad
\\angle\\left(\\cblue{\\bS\\bx}, \\cblue{\\bS\\by}\\right)
\\approx \\angle\\left(\\cgreen{\\bx}, \\cgreen{\\by}\\right)`}),e.jsxs(i.p,{children:[`gilt, die Skizze also Abstände und Winkel der Originaldaten erbt. Wie im
ganzen Kapitel ist `,e.jsx(n,{children:"\\left\\|\\cdot\\right\\|"}),` die
`,e.jsx(s,{id:"euclidean-norm",children:"euklidische Norm"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Häufig heißt ",e.jsx(n,{children:"\\bS"}),` eine zufällige „Projektion". Im strengen Sinn ist sie
keine: Eine `,e.jsx(s,{id:"projection",children:"Projektion"}),` bildet einen Raum in sich ab und ist
idempotent, `,e.jsx(n,{children:"\\bS"})," dagegen führt vom ",e.jsx(n,{children:"\\R^n"})," in den kleineren ",e.jsx(n,{children:"\\R^m"}),"."]}),`
`,e.jsx(i.h3,{children:"Ein Zahlenbeispiel"}),`
`,e.jsxs(g,{kind:"Beispiel",label:"8.4.5 (Sketching zweier Vektoren mit 10 000 Komponenten)",id:"env-sketching-zweier-vektoren-mit-10-000",children:[e.jsxs(i.p,{children:["Ziehen wir zwei beliebige Vektoren ",e.jsx(n,{children:"\\bx, \\by \\in \\R^{10\\,000}"}),` und eine
Gauss-Sketchmatrix mit `,e.jsx(n,{children:"m = 50"}),", also einen Faktor ",e.jsx(n,{children:"200"}),` kleiner. Ändern
sich Abstand und Winkel dabei eher um `,e.jsx(n,{children:"50\\,\\%"}),", um ",e.jsx(n,{children:"3\\,\\%"}),` oder um weniger als
`,e.jsx(n,{children:"0{,}1\\,\\%"}),"?"]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`set.seed(1312)
## Zwei beliebige n-dimensionale Vektoren
n <- 10000
x <- runif(n)
y <- runif(n)
# (m x n)-Matrix mit m << n und zufälligen Einträgen
m <- 50 # m << n !!
S <- rnorm(m * n, sd = sqrt(1 / m)) |> matrix(nrow = m, ncol = n)
Sx <- S %*% x
Sy <- S %*% y
## Distanzen ||x - y|| und ||Sx - Sy||
c(norm(x - y, "2"), norm(Sx - Sy, "2"))
## Winkel: cos(angle) = (x'y) / (||x|| ||y||)
angle <- function(x, y) (sum(x * y) / (norm(x, "2") * norm(y, "2"))) |> acos()
c(angle(x, y), angle(Sx, Sy))
`})}),e.jsxs(i.p,{children:["Die Einträge sind unabhängig ",e.jsx(n,{children:"\\Ncal(0, 1/m)"}),"-verteilt, eine Zeile ",e.jsx(n,{children:"\\bs_i"}),` hat
also die Kovarianzstruktur `,e.jsx(n,{children:"\\E\\left[\\bs_i\\bs_i^\\top\\right] = \\bI_n/m"}),`; diese
Bedingung brauchen wir gleich. Für diesen Seed weicht der Abstand um rund
`,e.jsx(n,{children:"3\\,\\%"})," ab, der Winkel um rund ",e.jsx(n,{children:"1\\,\\%"}),", obwohl ",e.jsx(n,{children:"99{,}5\\,\\%"}),` der
Dimensionen wegfallen.`]}),e.jsxs(i.p,{children:[`Das war eine gute Ziehung: Bei Gauss-Skizzen liegt die typische relative
Abweichung des Abstands bei `,e.jsx(n,{children:"1/\\sqrt{2m} = 10\\,\\%"}),`. Das Verfahren funktioniert,
aber einzelne Skizzen streuen erheblich.`]})]}),`
`,e.jsxs(J,{title:"Sketching mit verstellbarem m",children:[e.jsxs(i.p,{children:[`Wie weit kann eine einzelne Ziehung danebenliegen? Das Widget rechnet im
kleineren Format `,e.jsx(n,{children:"n = 200"})," statt ",e.jsx(n,{children:"10\\,000"}),", damit sich die Skizzendimension ",e.jsx(n,{children:"m"}),`
über den ganzen interessanten Bereich schieben lässt. Verändern wir `,e.jsx(n,{children:"m"}),` und
vergleichen wir mehrere Ziehungen.`]}),e.jsx(di,{}),e.jsxs(i.p,{children:["Die Streuung schrumpft wie ",e.jsx(n,{children:"1/\\sqrt{m}"}),", nicht wie ",e.jsx(n,{children:"1/m"}),`: Für die halbe
Abweichung brauchen wir die vierfache Zeilenzahl. Und weil einzelne Ziehungen
weit danebenliegen können, ist die Faustregel eine Aussage über die Verteilung,
keine Garantie für die eine Skizze, mit der wir gerade rechnen.`]})]}),`
`,e.jsx(O,{children:e.jsxs(Pe,{loesung:10,toleranz:.2,children:[e.jsxs(i.p,{children:["Wie groß ist im Sketching-Widget die eingeblendete Faustregel in Prozent bei ",e.jsx(n,{children:"m=50"}),"?"]}),e.jsxs(i.p,{children:["Nach dem Einblenden zeigt das orange Band ",e.jsx(n,{children:"1/\\sqrt{2m} = 10\\,\\%"}),"."]})]})}),`
`,e.jsx(i.h3,{children:"Der Einbettungssatz"}),`
`,e.jsx(i.p,{children:`Der folgende Satz macht das präzise. Sein Beweis braucht nur Erwartungswert,
Varianz und die Tschebyscheff-Ungleichung.`}),`
`,e.jsxs(g,{kind:"Satz",label:"8.4.6 (Zufällige Einbettung eines festen Vektors)",id:"env-zufaellige-einbettung-eines-festen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"}),` eine Zufallsmatrix, deren Zeilen
`,e.jsx(n,{children:"\\bs_1^\\top, \\dots, \\bs_m^\\top"})," unabhängig und identisch verteilt sind und"]}),e.jsx(V,{tag:"8.4.2",id:"eq-zufaellige-einbettung-eines-festen",children:"\\E\\left[\\bs_i\\bs_i^\\top\\right] = \\frac{1}{m}\\,\\bI_n"}),e.jsxs(i.p,{children:["erfüllen, sowie für ein ",e.jsx(n,{children:"K > 0"})]}),e.jsx(V,{tag:"8.4.3",id:"eq-zufaellige-einbettung-eines-festen-2",children:`\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right] \\le \\frac{K}{m^2}
\\qquad \\text{für alle } \\bv \\in \\R^n \\text{ mit } \\left\\|\\bv\\right\\| = 1 .`}),e.jsxs(i.p,{children:["Seien weiter ",e.jsx(n,{children:"\\bx \\in \\R^n"})," ",e.jsx(i.em,{children:"fest"})," und ",e.jsx(n,{children:"\\delta > 0"}),`. Dann gilt mit
Wahrscheinlichkeit mindestens `,e.jsx(n,{children:"1 - \\delta"})]}),e.jsx(V,{tag:"8.4.4",id:"eq-zufaellige-einbettung-eines-festen-3",children:`(1 - \\corange{\\eps})\\left\\|\\cgreen{\\bx}\\right\\|^2
\\le \\left\\|\\cblue{\\bS\\bx}\\right\\|^2
\\le (1 + \\corange{\\eps})\\left\\|\\cgreen{\\bx}\\right\\|^2 ,
\\qquad
\\corange{\\eps} = \\sqrt{\\frac{K}{\\delta m}} .`})]}),`
`,e.jsxs(M,{title:"Beweis des Einbettungssatzes",children:[e.jsxs(C,{children:[e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["mit ",e.jsx(n,{children:"\\bx"})," erfüllt auch ",e.jsx(n,{children:"\\bx/\\left\\|\\bx\\right\\|"})," die Voraussetzungen, und ",e.jsx(n,{children:"\\left\\|\\bS(\\bx/\\left\\|\\bx\\right\\|)\\right\\|^2 = \\left\\|\\bS\\bx\\right\\|^2/\\left\\|\\bx\\right\\|^2"})]}),children:[e.jsxs(i.p,{children:["Wir dürfen ",e.jsx(n,{children:"\\left\\|\\cgreen{\\bx}\\right\\| = 1"}),` annehmen. Beide Seiten von
`,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"})," sind homogen vom Grad ",e.jsx(n,{children:"2"})," in ",e.jsx(n,{children:"\\cgreen{\\bx}"}),`; für
`,e.jsx(n,{children:"\\cgreen{\\bx} \\neq \\bnull"}),` teilen wir die Ungleichung durch
`,e.jsx(n,{children:"\\left\\|\\cgreen{\\bx}\\right\\|^2"}),", und für ",e.jsx(n,{children:"\\cgreen{\\bx} = \\bnull"}),` ist nichts zu
zeigen. Zu beweisen bleibt`]}),e.jsx(l,{children:"\\Pr\\left(\\left| \\left\\|\\cblue{\\bS\\bx}\\right\\|^2 - 1 \\right| \\le \\corange{\\eps}\\right) \\ge 1 - \\delta ."})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left(\\bs_i^\\top\\bx\\right)^2 = \\bx^\\top\\bs_i\\bs_i^\\top\\bx"}),", dann die Linearität des ",e.jsx(s,{id:"expected-value",children:"Erwartungswerts"})," und Bedingung ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"})]}),children:[e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"i"}),"-te Komponente von ",e.jsx(n,{children:"\\bS\\bx"})," ist ",e.jsx(n,{children:"\\bs_i^\\top\\bx"}),", also"]}),e.jsx(l,{children:`\\left\\|\\cblue{\\bS\\bx}\\right\\|^2 = \\sum_{i=1}^m \\left(\\bs_i^\\top\\cgreen{\\bx}\\right)^2
\\qquad\\text{und}\\qquad
\\E\\left[\\left\\|\\cblue{\\bS\\bx}\\right\\|^2\\right]
= \\sum_{i=1}^m \\cgreen{\\bx}^\\top \\E\\left[\\bs_i\\bs_i^\\top\\right] \\cgreen{\\bx}
= m\\,\\cgreen{\\bx}^\\top \\frac{\\bI_n}{m} \\cgreen{\\bx}
= \\left\\|\\cgreen{\\bx}\\right\\|^2 = 1 .`}),e.jsx(i.p,{children:"Im Erwartungswert trifft die Skizze die Länge also exakt."})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\var[Z] = \\E\\left[Z^2\\right] - \\E[Z]^2 \\le \\E\\left[Z^2\\right]"})," mit ",e.jsx(n,{children:"Z = \\left(\\bs_i^\\top\\bx\\right)^2"}),", danach Bedingung ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"})," mit ",e.jsx(n,{children:"\\bv = \\bx"})]}),children:[e.jsx(i.p,{children:"Die Summanden sind unabhängig, also addieren sich die Varianzen:"}),e.jsx(l,{children:`\\var\\left[\\left\\|\\cblue{\\bS\\bx}\\right\\|^2\\right]
= \\sum_{i=1}^m \\var\\left[\\left(\\bs_i^\\top\\cgreen{\\bx}\\right)^2\\right]
\\le \\sum_{i=1}^m \\E\\left[\\left(\\bs_i^\\top\\cgreen{\\bx}\\right)^4\\right]
\\le m \\cdot \\frac{K}{m^2} = \\frac{K}{m} .`}),e.jsx(i.p,{children:`Hier werden die vierten Momente gebraucht: Sie beschränken die Streuung der
Skizze.`})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["Tschebyscheff mit dem in Schritt 2 berechneten Erwartungswert ",e.jsx(n,{children:"1"}),"; einsetzen: ",e.jsx(n,{children:"K/(\\eps^2 m) = K\\delta m/(K m) = \\delta"})]}),children:[e.jsx(i.p,{children:"Die Tschebyscheff-Ungleichung führt von der Varianz zur Wahrscheinlichkeit:"}),e.jsx(l,{children:`\\Pr\\left(\\left| \\left\\|\\cblue{\\bS\\bx}\\right\\|^2 - 1 \\right| > \\corange{\\eps}\\right)
\\le \\frac{\\var\\left[\\left\\|\\cblue{\\bS\\bx}\\right\\|^2\\right]}{\\corange{\\eps}^2}
\\le \\frac{K}{\\corange{\\eps}^2 m} .`}),e.jsxs(i.p,{children:["Die Wahl ",e.jsx(n,{children:"\\corange{\\eps} = \\sqrt{K/(\\delta m)}"}),` macht die rechte Seite zu
`,e.jsx(n,{children:"\\delta"}),`, und das Gegenereignis hat damit Wahrscheinlichkeit mindestens
`,e.jsx(n,{children:"1 - \\delta"}),"."]})]})]}),e.jsxs(g,{kind:"Bemerkung",label:"8.4.7 (Warum die Momentenbedingung an der Projektion ansetzt)",id:"env-warum-die-momentenbedingung-an-der",children:[e.jsxs(i.p,{children:[`Die Varianz in Schritt 3 ließe sich auch einfacher abschätzen, nämlich über die
`,e.jsx(s,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"}),`
`,e.jsx(n,{children:"\\left|\\bs_i^\\top\\bv\\right| \\le \\left\\|\\bs_i\\right\\|\\left\\|\\bv\\right\\|"}),`. Dann
stünde in `,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"}),` die Länge der ganzen Zeile,
`,e.jsx(n,{children:"\\E\\left[\\left\\|\\bs_i\\right\\|^4\\right] \\le K/m^2"}),`. Das wäre richtig, aber
unbrauchbar grob: Für `,e.jsx(n,{children:"\\bs_i \\sim \\Ncal(\\bnull, \\bI_n/m)"})," ist"]}),e.jsx(l,{children:"\\E\\left[\\left\\|\\bs_i\\right\\|^4\\right] = \\frac{n^2 + 2n}{m^2} ,"}),e.jsxs(i.p,{children:["das zugehörige ",e.jsx(n,{children:"K"})," wüchse also wie ",e.jsx(n,{children:"n^2"}),"; bei ",e.jsx(n,{children:"n = 10\\,000"}),` wäre
`,e.jsx(n,{children:"K \\approx 10^8"})," statt ",e.jsx(n,{children:"3"}),", und die Schranke aus ",e.jsx(s,{id:"env:zufaellige-einbettung-eines-festen",href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"}),` wäre wertlos. Der
Unterschied ist gerade der verschenkte Faktor `,e.jsx(n,{children:"(n^2+2n)/3"}),": Die Zeile ",e.jsx(n,{children:"\\bs_i"}),`
ist lang, ihre Projektion auf eine `,e.jsx(i.em,{children:"feste"})," Richtung ",e.jsx(n,{children:"\\bv"}),` aber kurz, und nur
diese Projektion geht in `,e.jsx(n,{children:"\\left\\|\\bS\\bx\\right\\|^2"})," ein. Bedingung ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"}),`
misst deshalb direkt `,e.jsx(n,{children:"\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right]"}),` und ist für
Gauss-Zeilen mit `,e.jsx(n,{children:"K = 3"})," sogar mit Gleichheit erfüllt (",e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.10"}),")."]})]})]}),`
`,e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\bS"})," linear ist, gilt ",e.jsx(n,{children:"\\bS\\bx - \\bS\\by = \\bS(\\bx - \\by)"}),`, und der Satz,
angewandt auf den festen Vektor `,e.jsx(n,{children:"\\cgreen{\\bx} - \\cgreen{\\by}"}),`, liefert die
Abstandsaussage aus `,e.jsx(s,{id:"env:sketching-matrix-und-skizze",href:"#env-sketching-matrix-und-skizze",children:"Definition 8.4.4"}),`. Wurzelziehen
macht aus der Aussage über `,e.jsx(n,{children:"\\left\\|\\cblue{\\bS\\bx}\\right\\|^2"}),` eine über die
Länge selbst: Für `,e.jsx(n,{children:"\\corange{\\eps} \\le 1"}),` ist
`,e.jsx(n,{children:"\\sqrt{1-\\corange{\\eps}} \\le \\left\\|\\cblue{\\bS\\bx}\\right\\|/\\left\\|\\cgreen{\\bx}\\right\\| \\le \\sqrt{1+\\corange{\\eps}}"}),`,
für `,e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"}),` also
`,e.jsx(n,{children:"0{,}949 \\le \\left\\|\\cblue{\\bS\\bx}\\right\\|/\\left\\|\\cgreen{\\bx}\\right\\| \\le 1{,}049"}),`:
Eine Verzerrung von `,e.jsx(n,{children:"10\\,\\%"})," im Quadrat sind rund ",e.jsx(n,{children:"5\\,\\%"})," in der Länge."]}),`
`,e.jsxs(i.p,{children:[`Winkel behandelt der Satz zunächst gar nicht. Sie folgen aber, denn
Skalarprodukte lassen sich über die Polarisationsformel aus Längen
zurückgewinnen; damit ist auch die Winkelaussage aus
`,e.jsx(s,{id:"env:sketching-matrix-und-skizze",href:"#env-sketching-matrix-und-skizze",children:"Definition 8.4.4"})," gerechtfertigt."]}),`
`,e.jsxs(M,{title:"Winkeltreue und viele Paare",children:[e.jsxs(g,{kind:"Korollar",label:"8.4.8 (Skalarprodukte bleiben erhalten)",id:"env-skalarprodukte-bleiben-erhalten",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\R^n"})," fest und ",e.jsx(n,{children:"\\bS"})," wie in ",e.jsx(s,{id:"env:zufaellige-einbettung-eines-festen",href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"}),`. Dann gilt mit
Wahrscheinlichkeit mindestens `,e.jsx(n,{children:"1 - 2\\delta"})]}),e.jsx(l,{children:`\\left| \\cblue{(\\bS\\bx)^\\top(\\bS\\by)} - \\cgreen{\\bx^\\top\\by} \\right|
\\le \\frac{\\corange{\\eps}}{2}\\left(\\left\\|\\cgreen{\\bx}\\right\\|^2 + \\left\\|\\cgreen{\\by}\\right\\|^2\\right) .`})]}),e.jsxs(C,{children:[e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["ausmultiplizieren: ",e.jsx(n,{children:"\\left\\|\\ba+\\bc\\right\\|^2 - \\left\\|\\ba-\\bc\\right\\|^2 = 4\\,\\ba^\\top\\bc"})]}),children:[e.jsxs(i.p,{children:["Für beliebige Vektoren ",e.jsx(n,{children:"\\ba, \\bc"})," gilt die Polarisationsformel"]}),e.jsx(l,{children:"\\ba^\\top\\bc = \\frac{\\left\\|\\ba + \\bc\\right\\|^2 - \\left\\|\\ba - \\bc\\right\\|^2}{4} ."}),e.jsxs(i.p,{children:["Wir wenden sie einmal auf ",e.jsx(n,{children:"\\bS\\bx, \\bS\\by"})," und einmal auf ",e.jsx(n,{children:"\\bx, \\by"}),` an und
nutzen `,e.jsx(n,{children:"\\bS\\bx \\pm \\bS\\by = \\bS(\\bx \\pm \\by)"}),"."]})]}),e.jsxs(w,{why:e.jsxs(e.Fragment,{children:["Vereinigungsschranke für die beiden Ausnahmeereignisse; zuletzt die Parallelogrammgleichung ",e.jsx(n,{children:"\\left\\|\\bx+\\by\\right\\|^2 + \\left\\|\\bx-\\by\\right\\|^2 = 2\\left\\|\\bx\\right\\|^2 + 2\\left\\|\\by\\right\\|^2"})]}),children:[e.jsxs(i.p,{children:[e.jsx(s,{id:"env:zufaellige-einbettung-eines-festen",href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"})," gilt für jeden festen Vektor, insbesondere für ",e.jsx(n,{children:"\\bx + \\by"}),` und für
`,e.jsx(n,{children:"\\bx - \\by"}),`. Jedes der beiden Ereignisse verfehlt die Schranke mit
Wahrscheinlichkeit höchstens `,e.jsx(n,{children:"\\delta"}),", zusammen also höchstens ",e.jsx(n,{children:"2\\delta"}),`.
Treten beide ein, so ist`]}),e.jsx(l,{children:`\\left| \\cblue{(\\bS\\bx)^\\top(\\bS\\by)} - \\cgreen{\\bx^\\top\\by} \\right|
\\le \\frac{\\corange{\\eps}\\left\\|\\bx+\\by\\right\\|^2 + \\corange{\\eps}\\left\\|\\bx-\\by\\right\\|^2}{4}
= \\frac{\\corange{\\eps}}{2}\\left(\\left\\|\\bx\\right\\|^2 + \\left\\|\\by\\right\\|^2\\right) .`})]})]}),e.jsxs(i.p,{children:["Für Einheitsvektoren steht rechts ",e.jsx(n,{children:"\\corange{\\eps}"}),`. Der Kosinus des Winkels
ist das Skalarprodukt der normierten Vektoren, und Zähler wie Nenner werden bis
auf Terme der Ordnung `,e.jsx(n,{children:"\\corange{\\eps}"})," getroffen."]}),e.jsxs(i.p,{children:["Dieselbe Vereinigungsschranke trägt weiter: Für ",e.jsx(n,{children:"N"})," Punkte und ",e.jsx(i.em,{children:"alle"}),` Paare
brauchen wir die Aussage für `,e.jsx(n,{children:"N(N-1)/2"}),` Differenzvektoren gleichzeitig. Das
geht, kostet aber `,e.jsx(n,{children:"\\delta \\to 2\\delta/(N(N-1))"}),` und damit ein deutlich
größeres `,e.jsx(n,{children:"m"}),"."]})]}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.4.9 (Ein fester Vektor ist nicht jeder Vektor)",id:"env-ein-fester-vektor-ist-nicht-jeder-vektor",children:[e.jsxs(i.p,{children:['Das Wort „fest" in ',e.jsx(s,{id:"env:zufaellige-einbettung-eines-festen",href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"}),` ist wesentlich:
`,e.jsx(n,{children:"\\bx"})," wird festgelegt, bevor ",e.jsx(n,{children:"\\bS"}),` gezogen wird, und die Ausnahmemenge darf für
jedes `,e.jsx(n,{children:"\\bx"})," eine andere sein. Für alle ",e.jsx(n,{children:"\\bx \\in \\R^n"}),` zugleich kann die
Aussage nicht gelten. `,e.jsx(n,{children:"\\bS"})," hat höchstens ",e.jsx(s,{id:"rank",children:"Rang"})," ",e.jsx(n,{children:"m < n"}),`, besitzt
also einen nichttrivialen `,e.jsx(s,{id:"kernel",children:"Kern"}),", und für ein ",e.jsx(n,{children:"\\bx \\neq \\bnull"}),` mit
`,e.jsx(n,{children:"\\bS\\bx = \\bnull"})," ist ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"}),` verletzt, wie
auch immer `,e.jsx(n,{children:"\\bS"})," ausgefallen ist."]}),e.jsxs(i.p,{children:[`Gleichmäßige Aussagen sind trotzdem möglich, aber nur auf einem
`,e.jsx(s,{id:"subspace",children:"Unterraum"})," kleiner Dimension und mit etwas größerem ",e.jsx(n,{children:"m"})," (",e.jsx(i.em,{children:`Subspace
Embeddings`}),`): Wir kontrollieren endlich viele Richtungen eines feinen Netzes und
übertragen das Ergebnis per Vereinigungsschranke auf den ganzen Unterraum.
Solche simultanen Garantien braucht etwa das gesketchte
Kleinste-Quadrate-Problem (`,e.jsx(i.a,{href:"#env-sketching-fuer-ein-kq-problem",children:"Algorithmus 8.4.12"}),`). Dort
hängt der Minimierer selbst von `,e.jsx(n,{children:"\\bS"}),` ab, und die Skizze muss alle Vektoren des
von den Spalten von `,e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bb"}),` aufgespannten Unterraums gleichzeitig gut
treffen.`]})]}),`
`,e.jsx(i.h3,{children:"Drei Bauarten von Sketching-Matrizen"}),`
`,e.jsxs(i.p,{children:["Welche Verteilungen erfüllen ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"}),` und
`,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"}),`? In der Praxis sind drei Bauarten
üblich.`]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"8.4.10 (Gauss, Rademacher, Subsampling)",id:"env-gauss-rademacher-subsampling",children:[e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Gauss."})," ",e.jsx(n,{children:"\\bs_i \\iid \\Ncal(\\bnull, \\bI_n/m)"}),". Bedingung ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"}),` ist die
Definition der Kovarianzmatrix. Für einen Einheitsvektor `,e.jsx(n,{children:"\\bv"}),` ist
`,e.jsx(n,{children:"\\bs_i^\\top\\bv \\sim \\Ncal(0, 1/m)"}),`, und das vierte Moment einer
zentrierten Normalverteilung ist das Dreifache des quadrierten zweiten:`]}),e.jsx(l,{children:`\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right] = 3\\left(\\frac{1}{m}\\right)^2 = \\frac{3}{m^2},
\\qquad\\text{also}\\qquad K = 3 .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Rademacher."})," ",e.jsx(n,{children:"s_{ij}"}),` unabhängig mit
`,e.jsx(n,{children:"\\Pr\\left(s_{ij} = 1/\\sqrt{m}\\right) = \\Pr\\left(s_{ij} = -1/\\sqrt{m}\\right) = 1/2"}),`.
Wegen `,e.jsx(n,{children:"\\E\\left[s_{ij}^2\\right] = 1/m"})," und ",e.jsx(n,{children:"\\E\\left[s_{ij}s_{ik}\\right] = 0"}),`
für `,e.jsx(n,{children:"j \\neq k"})," gilt wieder ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"}),`. Ausmultiplizieren der vierten Potenz
liefert für `,e.jsx(n,{children:"\\left\\|\\bv\\right\\| = 1"})]}),e.jsx(l,{children:`\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right]
= \\frac{3 - 2\\sum_{j=1}^n v_j^4}{m^2} \\le \\frac{3}{m^2} ,`}),e.jsxs(i.p,{children:["also ebenfalls ",e.jsx(n,{children:"K = 3"}),`. Der praktische Vorteil gegenüber Gauss liegt im
Erzeugen und Speichern: ein Bit pro Eintrag.`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Subsampling."})," ",e.jsx(n,{children:"\\bs_i = \\sqrt{n/m}\\,\\be_{K_i}"}),` mit
`,e.jsx(n,{children:"K_i \\sim \\unif\\{1, \\dots, n\\}"}),", die Skizze greift also ",e.jsx(n,{children:"m"}),` zufällige
Koordinaten heraus und skaliert sie. Auch hier ist
`,e.jsx(n,{children:"\\E\\left[\\bs_i\\bs_i^\\top\\right] = \\frac{n}{m}\\cdot\\frac{1}{n}\\bI_n = \\bI_n/m"}),`.
Das vierte Moment sieht aber anders aus:`]}),e.jsx(l,{children:`\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right]
= \\left(\\frac{n}{m}\\right)^2 \\frac{1}{n} \\sum_{j=1}^n v_j^4
= \\frac{n \\sum_{j=1}^n v_j^4}{m^2} ,
\\qquad\\text{also}\\qquad K = n\\sum_{j=1}^n v_j^4 .`}),e.jsxs(i.p,{children:["Dieses ",e.jsx(n,{children:"K"}),` hängt von den Daten ab. Für einen gestreuten Vektor mit
`,e.jsx(n,{children:"v_j = \\pm 1/\\sqrt{n}"})," ist ",e.jsx(n,{children:"\\sum_j v_j^4 = 1/n"})," und damit ",e.jsx(n,{children:"K = 1"}),`, besser als
Gauss. Für `,e.jsx(n,{children:"\\bv = \\be_1"})," dagegen ist ",e.jsx(n,{children:"K = n"}),`: Die gesamte Information steckt
in einer Koordinate, und die Stichprobe mit Zurücklegen erwischt sie nur mit
Wahrscheinlichkeit `,e.jsx(n,{children:"1-(1-1/n)^m"}),` überhaupt. Subsampling taugt also, wenn die
Information über viele Koordinaten verteilt ist, und versagt, wenn sie in
wenigen sitzt.`]})]}),`
`,e.jsxs(M,{title:"Vergleich der Sketching-Matrizen",children:[e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Typ"}),e.jsx(i.th,{children:"Speicher"}),e.jsxs(i.th,{children:["Zeit für ",e.jsx(n,{children:"\\bS\\bx"})]}),e.jsx(i.th,{children:"Qualität"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Gauss"}),e.jsx(i.td,{children:e.jsx(n,{children:"O(mn)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(mn)"})}),e.jsx(i.td,{children:"optimal"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Rademacher (",e.jsx(n,{children:"\\pm 1/\\sqrt{m}"}),")"]}),e.jsx(i.td,{children:e.jsx(n,{children:"O(mn)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(mn)"})}),e.jsx(i.td,{children:"optimal"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Subsampling"}),e.jsx(i.td,{children:e.jsx(n,{children:"O(m)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(m)"})}),e.jsx(i.td,{children:"gut bei gestreuten Daten"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"SRHT (Hadamard)"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"O(n+m)"})," oder reproduzierbar erzeugte Vorzeichen"]}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n \\log n)"})}),e.jsx(i.td,{children:"sehr gut"})]})]})]}),e.jsxs(i.p,{children:[`Speicher und Rechenzeit stehen in
`,e.jsx(s,{id:"big-o-notation",children:"Landau-Notation"}),": einmal für das Vorhalten von ",e.jsx(n,{children:"\\bS"}),`,
einmal für ein einzelnes Produkt `,e.jsx(n,{children:"\\bS\\bx"}),"."]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Gauss"})," ist theoretisch optimal, aber teuer: ",e.jsx(n,{children:"mn"}),` Zahlen speichern und
`,e.jsx(n,{children:"mn"})," Multiplikationen je Vektor."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Rademacher"})," ist genauso gut, wie ",e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.10"}),`
mit `,e.jsx(n,{children:"K = 3"}),` zeigt, und einfacher zu erzeugen, weil nur Vorzeichen gewürfelt
werden. Die Schranke wird sogar besser, je stärker `,e.jsx(n,{children:"\\bv"}),` auf wenige
Koordinaten konzentriert ist (für `,e.jsx(n,{children:"\\bv = \\be_1"})," ist ",e.jsx(n,{children:"K = 1"}),`), also gerade
umgekehrt wie beim Subsampling.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Subsampling"})," wählt ",e.jsx(n,{children:"m"}),` zufällige Koordinaten und ist damit extrem
schnell; die Qualität hängt aber an den Daten
(`,e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.10"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"SRHT"}),` verbindet beides. Die Matrix wird nicht explizit gespeichert,
sondern durch eine schnelle Transformation angewendet, daher die
`,e.jsx(n,{children:"O(n \\log n)"})," in der Tabelle. Neben den ",e.jsx(n,{children:"m"})," gezogenen Indizes gehören ",e.jsx(n,{children:"n"}),`
Vorzeichen zur Transformation; sie werden gespeichert oder reproduzierbar
aus einem Seed erzeugt. Die Arbeitskopie des transformierten Vektors benötigt
unabhängig davon `,e.jsx(n,{children:"O(n)"})," Speicher."]}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Anwendungen"}),`
`,e.jsx(g,{kind:"Bemerkung",label:"8.4.11 (Wo Skizzen helfen)",id:"env-wo-skizzen-helfen",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Matrixprodukt."})," Für ",e.jsx(n,{children:"\\bA \\in \\R^{p \\times n}"}),` und
`,e.jsx(n,{children:"\\bB \\in \\R^{n \\times q}"}),` ist
`,e.jsx(n,{children:"\\bA\\bB \\approx \\left(\\bA\\bS^\\top\\right)\\left(\\bS\\bB\\right)"}),`. Der Grund ist
`,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"}),`: Wegen
`,e.jsx(n,{children:"\\E\\left[\\bS^\\top\\bS\\right] = \\sum_{i=1}^m \\E\\left[\\bs_i\\bs_i^\\top\\right] = \\bI_n"}),`
ist die rechte Seite `,e.jsx(s,{id:"unbiased-estimator",children:"erwartungstreu"}),` für
`,e.jsx(n,{children:"\\bA\\bB"}),". Statt ",e.jsx(n,{children:"pnq"}),` kostet das
`,e.jsx(s,{id:"matrix-product",children:"Matrixprodukt"})," dann ",e.jsx(n,{children:"pnm + mnq + pmq"}),` Multiplikationen,
für `,e.jsx(n,{children:"p = q = n"})," also rund ",e.jsx(n,{children:"3n^2m"})," statt ",e.jsx(n,{children:"n^3"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Kleinste Quadrate."}),`
`,e.jsx(n,{children:`\\min_{\\bx}\\left\\|\\bA\\bx - \\bb\\right\\|_2
\\approx \\min_{\\bx}\\left\\|\\bS\\bA\\bx - \\bS\\bb\\right\\|_2`}),`, siehe
`,e.jsx(i.a,{href:"#env-sketching-fuer-ein-kq-problem",children:"Algorithmus 8.4.12"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Approximative Zerlegungen."}),` Auch die randomisierte Näherung einer
`,e.jsx(s,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` aus
`,e.jsx(i.a,{href:"#sec-8.2",children:"Abschnitt 8.2"})," arbeitet mit einer Skizze des Spaltenraums."]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Schneller wird ein Algorithmus allerdings nur, wenn sich ",e.jsx(n,{children:"\\bS\\bx"}),` schnell
berechnen lässt. Bei einer dichten Gauss-Matrix kostet `,e.jsx(n,{children:"\\bS\\bx"})," schon ",e.jsx(n,{children:"O(mn)"}),`
Operationen, und dann kann die Skizze teurer sein als das Problem, das sie
vereinfachen soll. Subsampling zieht nur `,e.jsx(n,{children:"m"})," Komponenten von ",e.jsx(n,{children:"\\bx"}),` heraus und
kostet `,e.jsx(n,{children:"O(m)"}),", taugt nach ",e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.10"}),` aber nur für
gestreute Information. Schnelle Anwendung und sehr gute Qualität verbindet die
`,e.jsx(i.em,{children:"Subsampled Randomized Hadamard Transform"})," (SRHT): ",e.jsx(n,{children:"\\bS"}),` wird nicht
gespeichert, sondern über eine schnelle Transformation angewendet. Die
vollständige Hadamard-Transformation kostet `,e.jsx(n,{children:"O(n\\log n)"}),` Rechenschritte;
beschnittene (pruned) Varianten kommen unter zusätzlichen
Implementationsannahmen mit weniger aus.`]}),`
`,e.jsx(M,{title:"Sketching für ein Kleinste-Quadrate-Problem",children:e.jsxs(g,{kind:"Algorithmus",label:"8.4.12 (Sketching für ein KQ-Problem)",id:"env-sketching-fuer-ein-kq-problem",children:[e.jsxs(i.p,{children:["Gegeben ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times p}"})," mit ",e.jsx(n,{children:"n \\gg p"}),", ",e.jsx(n,{children:"\\bb \\in \\R^n"}),` und eine
Skizzengröße `,e.jsx(n,{children:"m"})," mit ",e.jsx(n,{children:"p < m \\ll n"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Ziehe eine Sketching-Matrix ",e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"}),"."]}),`
`,e.jsxs(i.li,{children:["Berechne ",e.jsx(n,{children:"\\bS\\bA \\in \\R^{m \\times p}"})," und ",e.jsx(n,{children:"\\bS\\bb \\in \\R^m"}),"."]}),`
`,e.jsxs(i.li,{children:[`Löse das kleine Problem
`,e.jsx(n,{children:"\\min_{\\bx}\\left\\|(\\bS\\bA)\\bx - \\bS\\bb\\right\\|_2"}),`, etwa per
`,e.jsx(s,{id:"qr-factorization",children:"QR-Zerlegung"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),")."]}),`
`]}),e.jsxs(i.p,{children:["Schritt 3 kostet ",e.jsx(n,{children:"O(mp^2)"})," statt ",e.jsx(n,{children:"O(np^2)"}),` für das
`,e.jsx(s,{id:"linear-least-squares",children:"Ausgangsproblem"}),`. Ob sich das lohnt, entscheidet
Schritt 2: Eine dichte Gauss-Matrix braucht dort `,e.jsx(n,{children:"O(mnp)"}),` Operationen, und
wegen `,e.jsx(n,{children:"m > p"})," ist das mehr als die ",e.jsx(n,{children:"O(np^2)"}),`, die wir sparen wollten. Erst
mit schnell anwendbaren Skizzen wie der SRHT geht die Rechnung auf.`]})]})}),`
`,e.jsxs(i.h3,{children:["Wie klein darf ",e.jsx(n,{children:"m"})," sein?"]}),`
`,e.jsxs(g,{kind:"Beispiel",label:"8.4.13 (Dimensionsreduktion mit Matrix-Sketching)",id:"env-dimensionsreduktion-mit-matrix-sketching",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"n = 10\\,000"}),` Dimensionen, eine Fehlerwahrscheinlichkeit
`,e.jsx(n,{children:"\\delta = 0{,}05"})," und eine zulässige Verzerrung ",e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"}),`. Wie
klein darf `,e.jsx(n,{children:"m"})," sein? Wir lösen ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"})," nach ",e.jsx(n,{children:"m"}),` auf und setzen für
Gauss-Zeilen `,e.jsx(n,{children:"K = 3"})," ein:"]}),e.jsx(V,{tag:"8.4.5",id:"eq-dimensionsreduktion-mit-matrix-sketching",children:`\\corange{\\eps} = \\sqrt{\\frac{K}{\\delta m}}
\\quad\\Longleftrightarrow\\quad
m = \\frac{K}{\\delta\\,\\corange{\\eps}^2}
= \\frac{3}{0{,}05 \\cdot 0{,}01}
= 6000 .`}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"m = 6000"}),` Dimensionen bleibt der Abstand eines vorher festgelegten
Punktepaares mit Wahrscheinlichkeit `,e.jsx(n,{children:"95\\,\\%"})," auf ",e.jsx(n,{children:"10\\,\\%"}),` genau erhalten,
gemessen im Quadrat der Länge, in der Länge selbst auf rund `,e.jsx(n,{children:"5\\,\\%"}),`. Der
Speicher sinkt von `,e.jsx(n,{children:"10\\,000"})," auf ",e.jsx(n,{children:"6000"}),` Zahlen je Punkt, und eine einzelne
Distanzberechnung kostet statt `,e.jsx(n,{children:"O(n)"})," nur noch ",e.jsx(n,{children:"O(m)"}),` Operationen, beide Male
ein Gewinn um den Faktor `,e.jsx(n,{children:"n/m \\approx 1{,}7"}),`. Typische Anwendungen sind die Suche
nach nächsten Nachbarn und die Clusteranalyse in hohen Dimensionen: Beide
berühren die Daten fast nur über Abstände, und die bleiben unter der Skizze
erhalten.`]}),e.jsxs(i.p,{children:[`Die Schranke ist allerdings sehr konservativ, weil die
Tschebyscheff-Ungleichung nur zwei Momente benutzt. In der Praxis reichen oft
viel kleinere `,e.jsx(n,{children:"m"}),": ",e.jsx(i.a,{href:"#env-sketching-zweier-vektoren-mit-10-000",children:"Beispiel 8.4.5"}),` kam mit
`,e.jsx(n,{children:"m = 50"})," auf rund ",e.jsx(n,{children:"3\\,\\%"})," Abweichung, wenn auch mit einer guten Ziehung."]})]}),`
`,e.jsx(M,{title:"Wie scharf die Schranke ist",children:e.jsxs(i.p,{children:["Umgekehrt gelesen sagt ",e.jsx(i.a,{href:"#eq-dimensionsreduktion-mit-matrix-sketching",children:"(8.4.5)"}),`, was ein
zehnmal kleineres `,e.jsx(n,{children:"m = 600"})," hergibt: bei ",e.jsx(n,{children:"\\delta = 0{,}05"}),` nur
`,e.jsx(n,{children:"\\corange{\\eps} = \\sqrt{3/(0{,}05 \\cdot 600)} = \\sqrt{0{,}1} \\approx 0{,}32"}),`,
und bei `,e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"})," nur ",e.jsx(n,{children:"\\delta = 3/(600 \\cdot 0{,}01) = 0{,}5"}),`,
also die Verlässlichkeit eines Münzwurfs. Für Gauss-Skizzen ist das viel zu
pessimistisch, denn dort lässt sich exakt rechnen. Ist `,e.jsx(n,{children:"\\bz \\in \\R^n"}),` fest, so
sind die `,e.jsx(n,{children:"m"})," Komponenten ",e.jsx(n,{children:"\\bs_i^\\top\\bz"})," von ",e.jsx(n,{children:"\\bS\\bz"}),` unabhängig
`,e.jsx(n,{children:"\\Ncal(0, \\left\\|\\bz\\right\\|^2/m)"}),`-verteilt; damit ist
`,e.jsx(n,{children:"\\left\\|\\bS\\bz\\right\\|^2/\\left\\|\\bz\\right\\|^2"})," genau ",e.jsx(n,{children:"\\chi^2_m/m"}),`-verteilt.
Die Verteilungsfunktion verlangt für `,e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"}),` und
`,e.jsx(n,{children:"\\delta = 0{,}05"})," nur ",e.jsx(n,{children:"m = 768"}),` Zeilen; Tschebyscheff fordert das Achtfache.
Auch die Ziehung aus `,e.jsx(i.a,{href:"#env-sketching-zweier-vektoren-mit-10-000",children:"Beispiel 8.4.5"}),` lässt sich
so einordnen: Bei `,e.jsx(n,{children:"m = 50"}),` hat die relative Abweichung des Abstands die
Standardabweichung `,e.jsx(n,{children:"9{,}97\\,\\%"}),`, praktisch die Faustregel
`,e.jsx(n,{children:"1/\\sqrt{2m} = 10\\,\\%"}),`; nur knapp ein Viertel aller Ziehungen bleibt unter der
`,e.jsx(n,{children:"3\\,\\%"}),"-Marke, und nur knapp ",e.jsx(n,{children:"8\\,\\%"})," landen unter ",e.jsx(n,{children:"1\\,\\%"}),`.
Für andere Verteilungen steht diese exakte Rechnung nicht zur Verfügung,
schärfere Konzentrationsungleichungen dagegen schon: Sie liefern ein `,e.jsx(n,{children:"m"}),` der
Größenordnung `,e.jsx(n,{children:"\\corange{\\eps}^{-2}\\log(1/\\delta)"}),`, also eine logarithmische
statt einer linearen Abhängigkeit von `,e.jsx(n,{children:"1/\\delta"}),`. Dafür brauchen sie deutlich
mehr Voraussetzungen und einen längeren Beweis (Literatur am Ende des
Abschnitts).`]})}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(O,{children:[e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Es gibt eine Matrix ",e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"m < n"}),`, die alle Abstände
exakt erhält.`]}),e.jsxs(i.p,{children:["Eine solche Matrix hat höchstens Rang ",e.jsx(n,{children:"m < n"}),`, also einen nichttrivialen
Kern. Für ein `,e.jsx(n,{children:"\\bx \\neq \\bnull"})," mit ",e.jsx(n,{children:"\\bS\\bx = \\bnull"}),` schrumpft der Abstand
zum Nullpunkt auf `,e.jsx(n,{children:"0"}),`. Sketching kann Abstände nur näherungsweise und nur mit
hoher Wahrscheinlichkeit erhalten (`,e.jsx(i.a,{href:"#env-ein-fester-vektor-ist-nicht-jeder-vektor",children:"Bemerkung 8.4.9"}),")."]})]}),e.jsxs(S,{wahr:!0,children:[e.jsxs(i.p,{children:[e.jsx(s,{id:"env:zufaellige-einbettung-eines-festen",href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"})," macht eine Aussage über einen vorher festgelegten Vektor ",e.jsx(n,{children:"\\bx"}),`,
nicht gleichzeitig über alle `,e.jsx(n,{children:"\\bx \\in \\R^n"}),"."]}),e.jsxs(i.p,{children:["Im Beweis wird ",e.jsx(n,{children:"\\bx"})," fixiert, bevor ",e.jsx(n,{children:"\\bS"}),` gezogen wird; die Ausnahmemenge
darf für jedes `,e.jsx(n,{children:"\\bx"}),` eine andere sein. Gleichmäßige Aussagen über einen
Unterraum brauchen ein Netzargument, eine Vereinigungsschranke und ein etwas
größeres `,e.jsx(n,{children:"m"})," (",e.jsx(i.a,{href:"#env-ein-fester-vektor-ist-nicht-jeder-vektor",children:"Bemerkung 8.4.9"}),")."]})]}),e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Verdoppeln wir ",e.jsx(n,{children:"m"}),`, so halbiert sich die garantierte Verzerrung
`,e.jsx(n,{children:"\\corange{\\eps}"}),"."]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"})," ist ",e.jsx(n,{children:"\\eps = \\sqrt{K/(\\delta m)}"}),`, also proportional zu
`,e.jsx(n,{children:"1/\\sqrt{m}"}),". Verdoppeltes ",e.jsx(n,{children:"m"})," drückt ",e.jsx(n,{children:"\\eps"}),` nur um den Faktor
`,e.jsx(n,{children:"1/\\sqrt{2} \\approx 0{,}71"}),`; für die Halbierung brauchen wir viermal so viele
Zeilen.`]})]}),e.jsxs(S,{wahr:!0,children:[e.jsxs(i.p,{children:["Für Gauss-Zeilen ",e.jsx(n,{children:"\\bs_i \\sim \\Ncal(\\bnull, \\bI_n/m)"}),` gilt
`,e.jsx(n,{children:"\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right] = 3/m^2"})," für jeden Vektor ",e.jsx(n,{children:"\\bv"}),`
mit `,e.jsx(n,{children:"\\left\\|\\bv\\right\\| = 1"}),"."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"\\bs_i^\\top\\bv \\sim \\Ncal(0, 1/m)"}),`, und das vierte Moment einer
zentrierten Normalverteilung ist `,e.jsx(n,{children:"3\\sigma^4"})," (",e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.10"}),`). Damit ist
`,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"})," mit ",e.jsx(n,{children:"K = 3"})," erfüllt, und zwar mit Gleichheit."]})]}),e.jsxs(S,{wahr:!1,children:[e.jsx(i.p,{children:"Subsampling ist für beliebige Daten genauso gut wie eine Gauss-Skizze."}),e.jsxs(i.p,{children:["Für Subsampling ist ",e.jsx(n,{children:"K = n\\sum_j v_j^4"}),` und hängt damit von den Daten ab.
Bei gestreuten Vektoren ist `,e.jsx(n,{children:"K = 1"})," und damit besser als die ",e.jsx(n,{children:"3"}),` der
Gauss-Skizze, beim Standard-Basisvektor `,e.jsx(n,{children:"\\be_1"})," dagegen ",e.jsx(n,{children:"K = n"}),`. Subsampling
taugt deshalb nur, wenn die Information über viele Koordinaten gestreut ist.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Die wahrscheinlichkeitstheoretischen Werkzeuge, also
Zufallsmatrizen und Konzentrationsungleichungen, behandelt R. Vershynin,
High-Dimensional Probability (Cambridge University Press, 2018); die
Sketching-Algorithmen selbst, samt SRHT und gesketchten KQ-Problemen,
P.-G. Martinsson und J. A. Tropp, Randomized numerical linear algebra:
Foundations and algorithms, Acta Numerica 29 (2020).`})})]})}function hi(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ye,{...r})}):Ye(r)}function en(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Bis ",e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"})," lief fast alles über ",e.jsx(i.em,{children:"Zerlegungen"}),`. Sie liefern die Lösung bis auf
Rundungsfehler und kosten rund `,e.jsx(n,{children:"n^3"}),` Operationen, gleich ob wir drei Stellen
brauchen oder fünfzehn. Dieses Kapitel hat zwei Bauprinzipien hinzugefügt, die
diese Kosten senken und dafür Genauigkeit hergeben.`]}),`
`,e.jsx(i.h3,{children:"Die drei Kernideen"}),`
`,e.jsx(g,{kind:"Bemerkung",label:"8.5.1 (Die drei Kernideen)",id:"env-die-drei-kernideen",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Eigenwerte berechnen wir iterativ."}),` Das charakteristische Polynom taugt
nicht als Algorithmus (`,e.jsx(i.a,{href:"#env-warum-das-charakteristische-polynom-kein",children:"Bemerkung 8.1.1"}),`).
Die Potenzmethode (`,e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"}),`) holt mit einem
`,e.jsx(s,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"}),` pro Schritt das
betragsgrößte Eigenpaar, sofern der größte Eigenwert betragsmäßig getrennt
ist (`,e.jsx(s,{id:"env:konvergenz-der-potenzmethode",href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),`). Die QR-Iteration
(`,e.jsx(i.a,{href:"#env-qr-iteration",children:"Algorithmus 8.1.10"}),`) liefert unter den Voraussetzungen von
`,e.jsx(i.a,{href:"#env-wogegen-die-qr-iteration-konvergiert",children:"Bemerkung 8.1.14"}),` alle Eigenwerte auf einmal,
als simultane Potenzmethode
(`,e.jsx(i.a,{href:"#env-die-qr-iteration-ist-eine-simultane",children:"Bemerkung 8.1.13"}),`); jeder ihrer Schritte ist
eine Ähnlichkeitstransformation und erhält deshalb das Spektrum
(`,e.jsx(s,{id:"env:die-iterierten-sind-aehnlich-zu-a",href:"#env-die-iterierten-sind-aehnlich-zu-a",children:"Satz 8.1.11"}),`,
`,e.jsx(s,{id:"env:aehnliche-matrizen-haben-dieselben",href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"}),"). Anwendungen (",e.jsx(i.a,{href:"#sec-8.2",children:"Abschnitt 8.2"}),`)
sind PageRank, eine Potenzmethode auf einer
`,e.jsx(s,{id:"sparse-matrix",children:"dünnbesetzten"})," Matrix mit rund ",e.jsx(n,{children:"10^{10}"}),` Zeilen, die
Hauptkomponentenanalyse als Eigenwertaufgabe für die
`,e.jsx(s,{id:"covariance-matrix",children:"Kovarianzmatrix"}),` und die approximative
`,e.jsx(s,{id:"singular-value-decomposition",children:"SVD"}),", die nur die ",e.jsx(n,{children:"k"}),` größten
`,e.jsx(s,{id:"env:singulaerwerte",children:"Singulärwerte"})," berechnet."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Iterative Löser sind Fixpunktiterationen."})," Aus dem ",e.jsx(s,{id:"env:residuum",children:"Residuum"}),`
`,e.jsx(n,{children:"\\cred{\\br^{(k-1)}} = \\bb - \\bA\\,\\cblue{\\bx^{(k-1)}}"}),` wird eine Korrektur;
ausmultipliziert ergibt das die affine Vorschrift
`,e.jsx(n,{children:"\\cblue{\\bx^{(k)}} = \\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb"}),` mit
`,e.jsx(n,{children:"\\bB = \\bI_n - \\bC\\bA"})," (",e.jsx(i.a,{href:"#env-fixpunktform",children:"Bemerkung 8.3.4"}),`). Hinreichend für
Konvergenz ist `,e.jsx(n,{children:"\\corange{\\rho} = \\left\\|\\bB\\right\\|_2 < 1"}),`: Dann schrumpft
der Fehler in jedem Schritt auf höchstens das `,e.jsx(n,{children:"\\corange{\\rho}"}),`-Fache
(`,e.jsx(s,{id:"env:konvergenz-der-korrekturiteration",href:"#env-konvergenz-der-korrekturiteration",children:"Satz 8.3.5"}),`). Auch die Potenzmethode ist
eine `,e.jsx(s,{id:"fixed-point-iteration",children:"Fixpunktiteration"}),`: Die Abbildung
`,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx/\\left\\|\\bA\\bx\\right\\|"}),` lässt die normierten
`,e.jsx(s,{id:"eigenvalue-eigenvector",children:"Eigenvektoren"})," zu Eigenwerten ",e.jsx(n,{children:"\\lambda \\neq 0"}),`
bis aufs Vorzeichen fest, und ihre Rate ist
`,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:`Probabilistische Verfahren ersetzen ein schweres Problem durch ein
zufälliges, kleineres.`}),` Eine geeignet gezogene Matrix
`,e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"m \\ll n"}),` erhält die Abstände und Winkel
`,e.jsx(i.em,{children:"vorher festgelegter"}),` Punkte mit hoher Wahrscheinlichkeit näherungsweise
(`,e.jsx(s,{id:"env:zufaellige-einbettung-eines-festen",href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"}),`), für alle Vektoren zugleich
aber nicht (`,e.jsx(i.a,{href:"#env-ein-fester-vektor-ist-nicht-jeder-vektor",children:"Bemerkung 8.4.9"}),`). Aus
einem `,e.jsx(n,{children:"n"}),"-dimensionalen Problem wird ein ",e.jsx(n,{children:"m"}),`-dimensionales, und die
Garantie gilt nur mit Wahrscheinlichkeit `,e.jsx(n,{children:"1 - \\delta"}),"."]}),`
`]})}),`
`,e.jsx(i.p,{children:`Die zweite und die dritte Idee laufen auf denselben Tausch hinaus: Wir geben
Genauigkeit her und bekommen Laufzeit zurück. Der Regler sitzt aber an
verschiedenen Stellen.`}),`
`,e.jsx(i.h3,{children:"Laufzeit gegen Genauigkeit"}),`
`,e.jsxs(g,{kind:"Bemerkung",label:"8.5.2 (Zwei Regler und ihre Kosten)",id:"env-zwei-regler-und-ihre-preise",children:[e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Zugang"}),e.jsx(i.th,{children:"Regler"}),e.jsx(i.th,{children:"Kosten"}),e.jsx(i.th,{children:"Was wir bekommen"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Zerlegung (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),", ",e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),")"]}),e.jsx(i.td,{children:"keiner"}),e.jsxs(i.td,{children:["fest, Größenordnung ",e.jsx(n,{children:"n^3"})]}),e.jsx(i.td,{children:"Lösung bis auf Rundungsfehler"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Iteration (",e.jsx(i.a,{href:"#sec-8.1",children:"8.1"}),", ",e.jsx(i.a,{href:"#sec-8.3",children:"8.3"}),")"]}),e.jsxs(i.td,{children:["Iterationszahl ",e.jsx(n,{children:"k"})]}),e.jsxs(i.td,{children:[e.jsx(n,{children:"k"})," mal die Kosten eines Schritts"]}),e.jsxs(i.td,{children:["Fehler höchstens ",e.jsx(n,{children:"\\corange{\\rho}^{\\,k}"})," mal Startfehler"]})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Sketching (",e.jsx(i.a,{href:"#sec-8.4",children:"8.4"}),")"]}),e.jsxs(i.td,{children:["Skizzengröße ",e.jsx(n,{children:"m"})]}),e.jsxs(i.td,{children:["Rechnen in ",e.jsx(n,{children:"\\R^m"})," statt in ",e.jsx(n,{children:"\\R^n"})]}),e.jsxs(i.td,{children:["Verzerrung ",e.jsx(n,{children:"\\eps"})," je festem Paar, mit Wahrscheinlichkeit ",e.jsx(n,{children:"1 - \\delta"})]})]})]})]}),e.jsxs(i.p,{children:[`Die beiden Regler kosten sehr Verschiedenes. Bei der Iteration fällt der
Fehler geometrisch, die Schrittzahl wächst deshalb nur wie `,e.jsx(n,{children:"\\log(1/\\eps)"}),`
(`,e.jsx(s,{id:"env:zahl-der-iterationen",href:"#env-zahl-der-iterationen",children:"Korollar 8.3.6"}),`). Beim Sketching fällt die Verzerrung nur wie
`,e.jsx(n,{children:"1/\\sqrt{m}"}),`: Eine zusätzliche Dezimalstelle verlangt die hundertfache
Skizzengröße.`]}),e.jsxs(i.p,{children:["Ein fairer Vergleich ist das trotzdem nicht, denn die beiden ",e.jsx(n,{children:"\\eps"}),` messen
Verschiedenes: einmal den Abstand zur Lösung, einmal die Verzerrung der
Geometrie. Als Faustregel: Wo hohe Genauigkeit gefragt ist, iterieren wir; wo
eine grobe Antwort genügt und `,e.jsx(n,{children:"n"})," riesig ist, rechnen wir mit einer Skizze."]})]}),`
`,e.jsx(i.h3,{children:"Ausblick"}),`
`,e.jsxs(i.p,{children:[`Das nächste Kapitel schließt den ersten Teil des Skripts, die numerische lineare
Algebra (`,e.jsx(i.a,{href:"?k=01-intro#sec-1.1",children:"Abschnitt 1.1"}),"), mit ",e.jsx(s,{id:"tensor",children:"Tensoren"}),` und Tensorprodukten ab. Ein Tensor ist ein
mehrdimensionales Zahlenfeld, die Matrix also der zweidimensionale Sonderfall.
Wir brauchen Tensoren, sobald wir nach Matrizen ableiten, denn jedes
Differenzieren fügt einen weiteren Index hinzu.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(O,{children:[e.jsxs(S,{wahr:!0,children:[e.jsx(i.p,{children:`Die Eigenwerte einer großen Matrix bestimmen wir besser nicht über die
Nullstellen des charakteristischen Polynoms.`}),e.jsxs(i.p,{children:["Drei Gründe stehen in ",e.jsx(i.a,{href:"#env-warum-das-charakteristische-polynom-kein",children:"Bemerkung 8.1.1"}),". Ab Grad ",e.jsx(n,{children:"5"}),` gibt es keine allgemeine
Lösungsformel mehr, wir müssten die Nullstellen also ohnehin iterativ suchen.
Der Umweg über die Koeffizienten ist schlecht konditioniert. Und schon das
Aufstellen kostet mehr als eine ganze Matrixzerlegung.`]})]}),e.jsxs(S,{wahr:!1,children:[e.jsx(i.p,{children:`Iterative Verfahren liefern grundsätzlich nur Näherungen; die exakte Lösung
erreichen sie nie.`}),e.jsxs(i.p,{children:["In Sonderfällen erreichen sie sie sehr wohl (",e.jsx(i.a,{href:"#env-was-iterative-verfahren-leisten",children:"Bemerkung 8.3.12"}),`). Mit
`,e.jsx(n,{children:"\\bC = \\bA^{-1}"})," ist ",e.jsx(n,{children:"\\corange{\\rho} = 0"}),`, und ein einziger Schritt trifft die
Lösung; Verfahren vom Krylov-Typ wie das der konjugierten Gradienten kommen in
exakter Arithmetik nach höchstens `,e.jsx(n,{children:"n"}),` Schritten an. Der erste Fall ist nur
theoretisch interessant, denn `,e.jsx(n,{children:"\\bA^{-1}"}),` zu kennen wäre teurer als das
Gleichungssystem selbst.`]})]}),e.jsxs(S,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Potenzmethode konvergiert umso schneller, je näher ",e.jsx(n,{children:"|\\lambda_2|"}),` bei
`,e.jsx(n,{children:"|\\lambda_1|"})," liegt."]}),e.jsxs(i.p,{children:["Es ist umgekehrt. Die Rate ist ",e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"}),`
(`,e.jsx(s,{id:"env:konvergenz-der-potenzmethode",href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),"), und die geht gegen ",e.jsx(n,{children:"1"}),`, sobald sich die beiden Eigenwerte
nähern; im Grenzfall `,e.jsx(n,{children:"|\\lambda_2| = |\\lambda_1|"})," trägt ",e.jsx(s,{id:"env:konvergenz-der-potenzmethode",href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),` gar nicht
mehr (`,e.jsx(i.a,{href:"#env-wann-die-potenzmethode-versagt",children:"Bemerkung 8.1.6"}),`). Dieselbe Nähe macht auch die Eigenvektoren schlecht
konditioniert (`,e.jsx(i.a,{href:"#env-kondition-von-eigenwertproblemen",children:"Bemerkung 8.1.16"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §4.5 zu den Eigenwertverfahren, Heath §10.9 zu den
iterativen Lösern für lineare Gleichungssysteme. Die
wahrscheinlichkeitstheoretischen Werkzeuge hinter den Sketching-Schranken
behandelt R. Vershynin, High-Dimensional Probability, Cambridge University
Press 2018.`})})]})}function ai(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(en,{...r})}):en(r)}function nn(r){const i={em:"em",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsx(i.p,{children:`Wer den Stoff dieses Kapitels an weiteren Aufgaben üben möchte, findet sie in
den Lehrbüchern der Vorlesung. Die Tabellen listen passende Aufgaben, die
lohnendsten zuerst. Deutsche Übersetzungen der Aufgabenstellungen und
ausführliche Musterlösungen stehen auf der Kurs-Webseite.`}),`
`,e.jsxs(i.p,{children:[`Die Sterne schätzen ein, wie viel eine Aufgabe für diese Vorlesung bringt.
`,e.jsx(n,{children:"\\bigstar\\bigstar\\bigstar"})," heißt ",e.jsx(i.em,{children:"empfohlen"}),`: zentraler Kursstoff, nah an
Klausuraufgaben. `,e.jsx(n,{children:"\\bigstar\\bigstar"})," heißt ",e.jsx(i.em,{children:"lohnend"}),`: Kursstoff, aber ein
Randthema oder ein anderer Aufgabentyp als in der Klausur. `,e.jsx(n,{children:"\\bigstar"}),` heißt
`,e.jsx(i.em,{children:"Vertiefung"}),`: geht größtenteils über den Kursstoff hinaus oder wiederholt nur
Grundlagen. Der Aufwand ist grob geschätzt, für eine Bearbeitung ohne Blick in
die Lösung.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Empfohlen"})," (",e.jsx(n,{children:"\\bigstar\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 4.3"}),e.jsxs(i.td,{children:["Spektralzerlegung einer ",e.jsx(n,{children:"2 \\times 2"}),"-Matrix – direkt und iterativ"]}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 4.4"}),e.jsx(i.td,{children:"Wann die Potenzmethode versagt"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]})]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Lohnend"})," (",e.jsx(n,{children:"\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 4.17"}),e.jsxs(i.td,{children:["Eigenwerte von ",e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bA^2"})]}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deuflhard/Hohmann Aufgabe 5.1"}),e.jsx(i.td,{children:"Eigenwerte, Eigenvektoren und Determinante einer Householder-Matrix"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 4.5"}),e.jsx(i.td,{children:"Konstante Zeilensummen – Eigenwerte stochastischer Matrizen"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schaback/Wendland Aufgabe 6.2"}),e.jsxs(i.td,{children:["Fixpunktiteration für den Kehrwert ",e.jsx(n,{children:"1/a"})]}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schaback/Wendland Aufgabe 6.9"}),e.jsxs(i.td,{children:["Gesamtschrittverfahren für ",e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bA^T"})]}),e.jsx(i.td,{children:"schwer, ca. 30 Min."})]})]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Vertiefung"})," (",e.jsx(n,{children:"\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deuflhard/Hohmann Aufgabe 5.4"}),e.jsx(i.td,{children:"Pfeilmatrizen – Besetzungsstruktur ausnutzen"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]})})]}),`
`,e.jsxs(i.p,{children:["Bücher: Heath: ",e.jsx(i.em,{children:"Scientific Computing"})," (2. Aufl.); Deuflhard/Hohmann: ",e.jsx(i.em,{children:"Numerische Mathematik 1"})," (4. Aufl.); Schaback/Wendland: ",e.jsx(i.em,{children:"Numerische Mathematik"})," (5. Aufl.)."]})]})}function ci(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(nn,{...r})}):nn(r)}const gi={sections:[{id:"8.1",key:"eigenwerte",title:"Eigenwertprobleme: Potenzmethode und QR-Iteration",C:U(Rn)},{id:"8.2",key:"anwendungen",title:"Anwendungen: PageRank, PCA und approximative SVD",C:U($n)},{id:"8.3",key:"iterative-loeser",title:"Iterative Löser für lineare Gleichungssysteme",C:U(ii)},{id:"8.4",key:"sketching",title:"Probabilistische Methoden: Matrix-Sketching",C:U(hi)},{id:"8.5",key:"zusammenfassung",title:"Zusammenfassung",C:U(ai)},{id:"8.6",key:"uebungen",title:"Übungsempfehlungen",C:U(ci)}]};export{gi as default};
