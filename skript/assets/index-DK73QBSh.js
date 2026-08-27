import{r as y,b as O,g as _,j as e,A as U,T as rn,F as M,S as ce,k as _e,V as X,q as sn,L as De,C as l,M as n,E as b,a as t,P as K,n as f,G as P,Q as N,Z as ye,i as z,u as tn,D as ln,o as Re,h as dn,x as an,N as hn,y as cn,m as J}from"./index-GbyLwDE5.js";import{E as q,I as T}from"./Interaktiv-DHZUUTxv.js";const $=[-1/Math.sqrt(5),2/Math.sqrt(5)],xe=[2/Math.sqrt(5),1/Math.sqrt(5)],on=4/9,Xe=18,be=(r,i)=>r[0]*i[0]+r[1]*i[1],Je=r=>[5*r[0]-2*r[1],-2*r[0]+8*r[1]],xn=r=>{const i=Math.hypot(...r);return[r[0]/i,r[1]/i]},bn=r=>[Math.cos(r*Math.PI/180),Math.sin(r*Math.PI/180)],ge=r=>Math.atan2(r[1],r[0])*180/Math.PI;function gn(r){const i=[r];for(let s=1;s<=Xe;s+=1)i.push(xn(Je(i[s-1])));return i}function un(){const[r,i]=y.useState(33),[s,c]=y.useState(0),h=bn(r),x=y.useMemo(()=>gn(h),[r]),d=x[s],o=be(h,$),a=be(h,xe),u=Math.abs(d[0]*$[1]-d[1]*$[0]),v=s?Math.abs(x[s-1][0]*$[1]-x[s-1][1]*$[0]):NaN,A=be(d,Je(d)),k=s&&v>1e-12?u/v:NaN,j=Math.abs(o)<1e-8,w=Math.abs(a)<1e-8,E=p=>{i(ge(p)),c(0)},D=j?`Der Start liegt auf v₂. Sein v₁-Anteil ist null; die Potenzmethode bleibt bei λ₂ = 4 stehen. Das ist der Ausnahmfall aus ${O("bemerkung:wann-die-potenzmethode-versagt")}.`:w?`Der Start liegt bereits auf v₁. Die Normierung hebt die Streckung mit λ₁ = 9 auf; mehr Konvergenz ist nicht zu sehen. ${O("satz:konvergenz-der-potenzmethode")} ist sofort erfüllt.`:s===0?`Noch sehen wir nur den Start. Sein von null verschiedener v₁-Anteil erfüllt die Voraussetzung von ${O("satz:konvergenz-der-potenzmethode")}.`:`Der Winkelrest beträgt ${_(u,4)}; die beobachtete Rate ${_(k,3)} nähert sich der Rate |λ₂/λ₁| = ${_(on,3)} aus ${O("satz:konvergenz-der-potenzmethode")}. Der Rayleigh-Quotient ist ${_(A,4)}.`;return e.jsxs("div",{className:"space-y-2",children:[e.jsx(U,{children:"Ziehen wir den blauen Startvektor auf dem Kreis und verfolgen wir anschließend die Schritte."}),e.jsx(rn,{matrix:[[1,0],[0,1]],size:300,worldHalf:1.3,showGrid:!1,vectors:[{v:$,color:M.gruen,label:"v₁"},{v:xe,color:M.grau,label:"v₂"},...x.slice(0,s+1).map((p,m)=>({v:p,color:M.blau,label:m===s?`x⁽${s}⁾`:void 0,draggable:m===0,dragConstraint:"unitCircle"}))],onVectorChange:(p,m)=>{p===2&&E(m)},ariaLabel:`Potenzmethode im Schritt ${s}; der blaue Vektor ist auf dem Einheitskreis ziehbar.`}),e.jsx(ce,{label:"Winkel von x⁽⁰⁾",value:r,onChange:p=>{i(p),c(0)},min:-180,max:180,step:1,unit:"°",accent:M.blau}),e.jsx("div",{className:"flex flex-wrap gap-2",children:[{text:"Beispiel aus dem Text",value:33},{text:"Versagensfall v₂",value:ge(xe)},{text:"Volltreffer v₁",value:ge($)}].map(({text:p,value:m})=>e.jsx("button",{type:"button",className:"rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600",onClick:()=>{i(m),c(0)},children:p},p))}),e.jsx(_e,{step:s,setStep:c,max:Xe,narration:`x⁽${s}⁾ = (${_(d[0],3)}; ${_(d[1],3)}), c₁ = ${_(o,3)}, c₂ = ${_(a,3)}.`}),e.jsx(X,{kind:j?"warn":w||s>0?"ok":"neutral",children:D})]})}const{blau:jn,gruen:mn,orange:ue,rot:je,grau:Y}=M,Ye=20,Me=(r,i)=>[[r[0][0]*i[0][0]+r[0][1]*i[1][0],r[0][0]*i[0][1]+r[0][1]*i[1][1]],[r[1][0]*i[0][0]+r[1][1]*i[1][0],r[1][0]*i[0][1]+r[1][1]*i[1][1]]];function fn(r){const i=[r[0][0],r[1][0]],s=[r[0][1],r[1][1]],c=Math.hypot(i[0],i[1]),h=c>1e-14?[i[0]/c,i[1]/c]:[1,0],x=h[0]*s[0]+h[1]*s[1],d=[s[0]-x*h[0],s[1]-x*h[1]],o=Math.hypot(d[0],d[1]),a=o>1e-14?[d[0]/o,d[1]/o]:[-h[1],h[0]];return{Q:[[h[0],a[0]],[h[1],a[1]]],R:[[c,x],[0,o]]}}function kn(r){const i=[];let s=r.map(h=>[...h]),c=[[1,0],[0,1]];i.push({A:s,Q:c,R:c,Qacc:c});for(let h=1;h<=Ye&&s.every(o=>o.every(a=>Number.isFinite(a)));h++){const{Q:x,R:d}=fn(s);s=Me(d,x),c=Me(c,x),i.push({A:s,Q:x,R:d,Qacc:c})}return i}const Z=r=>_(r,3);function pn(r){const i=r[0][0]+r[1][1],s=r[0][0]*r[1][1]-r[0][1]*r[1][0],c=i*i-4*s;if(c<0)return{reell:!1,l1:i/2,l2:i/2,im:Math.sqrt(-c)/2};const h=Math.sqrt(c),x=(i+h)/2,d=(i-h)/2;return Math.abs(x)>=Math.abs(d)?{reell:!0,l1:x,l2:d,im:0}:{reell:!0,l1:d,l2:x,im:0}}function de({m:r,farbe:i}){return e.jsx("span",{className:"inline-grid grid-cols-2 gap-px rounded border-x-2 border-slate-500 px-1.5 py-1 align-middle",children:r.map((s,c)=>s.map((h,x)=>e.jsx("span",{className:"px-1 text-center font-mono text-xs",style:{color:i==null?void 0:i(c,x)},children:Z(h)},`${c}-${x}`)))})}function zn(){const[r,i]=y.useState([[5,-2],[-2,8]]),[s,c]=y.useState(0),h=y.useMemo(()=>kn(r),[r]),x=Math.max(0,h.length-1),d=Math.min(s,x),o=h[d],a=pn(r),u=a.reell&&Math.abs(a.l1)>1e-12?Math.abs(a.l2/a.l1):NaN,v=R=>Math.abs(R.A[1][0]),A=v(o),k=d>0?v(h[d-1]):NaN,j=k>0?A/k:NaN,w=d===0?"erst ab k = 1":k>0?Z(j):"nicht definiert, die Nebendiagonale war schon null",E=Math.abs(r[0][1]-r[1][0])<1e-12,p=Math.abs(o.A[0][0])>=Math.abs(o.A[1][1])?"Sie stehen absteigend nach Betrag.":"Sie stehen hier aufsteigend nach Betrag: Eine Matrix in Dreiecksgestalt ist ein Fixpunkt der Iteration, umsortiert wird nichts.",m=y.useMemo(()=>h.map((R,le)=>({x:le,y:Math.log10(v(R)),color:je})).filter(R=>Number.isFinite(R.y)&&R.y>-17),[h]),C=v(h[0]),g=y.useMemo(()=>Number.isFinite(u)&&u>0&&C>0?[{f:R=>Math.log10(C)+R*Math.log10(u),color:ue,dash:[5,4]}]:[],[u,C]),S=R=>{i(R),c(0)};return e.jsxs("div",{children:[e.jsx(U,{children:"Wählen wir eine Matrix und verfolgen wir, ob der rote Eintrag unter der Diagonale verschwindet."}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-3 text-sm",children:[e.jsx("span",{children:"A ="}),e.jsx(sn,{value:r,onChange:S,step:1}),e.jsx("button",{type:"button",className:"rounded border border-slate-400 px-2 py-0.5 text-xs",onClick:()=>S([[5,-2],[-2,8]]),children:"symmetrisches Beispiel"}),e.jsx("button",{type:"button",className:"rounded border border-slate-400 px-2 py-0.5 text-xs",onClick:()=>S([[2,3],[1,4]]),children:"unsymmetrisch"}),e.jsx("button",{type:"button",className:"rounded border border-slate-400 px-2 py-0.5 text-xs",onClick:()=>S([[0,-1],[1,0]]),children:"Drehung um 90°"})]}),e.jsx("div",{className:"my-2",children:e.jsx(_e,{step:d,setStep:c,max:x,narration:"Ein QR-Schritt vertauscht RQ nach der Zerlegung A = QR."})}),e.jsxs("div",{className:"my-2 flex flex-wrap items-start gap-6",children:[e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{children:["A",e.jsxs("sup",{children:["(",d,")"]})," ="]}),e.jsx(de,{m:o.A,farbe:(R,le)=>R===le?mn:R>le?je:void 0})]}),d>0?e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{children:["aus Q",e.jsxs("sup",{children:["(",d,")"]})," ="]}),e.jsx(de,{m:o.Q}),e.jsxs("span",{children:["und R",e.jsxs("sup",{children:["(",d,")"]})," ="]}),e.jsx(de,{m:o.R})]}):e.jsx("p",{style:{color:Y},children:"Noch nicht iteriert: A⁽⁰⁾ ist die Ausgangsmatrix."}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("span",{children:["Q",e.jsx("sub",{children:d})," ="," ",d===0?"I, noch ist kein Faktor aufgesammelt:":e.jsxs(e.Fragment,{children:["Q",e.jsx("sup",{children:"(1)"}),"⋯Q",e.jsxs("sup",{children:["(",d,")"]})," ="]})]}),e.jsx(de,{m:o.Qacc,farbe:()=>jn})]}),e.jsx("p",{style:{color:Y},children:"Grün: die Diagonale, auf der die Eigenwerte erscheinen. Rot: der Eintrag unter der Diagonalen, der verschwinden soll. Blau: das aufgesammelte Produkt der Orthogonalmatrizen, dessen Spalten im symmetrischen Fall gegen die Eigenvektoren laufen."}),e.jsxs("div",{children:[e.jsxs("span",{style:{color:je},children:["|a₂₁| = ",Z(A)]}),e.jsx("span",{style:{color:Y},children:" , Schrumpffaktor gegenüber dem Vorschritt: "}),e.jsx("span",{style:{color:ue},children:w})]}),e.jsx("div",{style:{color:Y},children:a.reell?e.jsxs(e.Fragment,{children:["exakte Eigenwerte: λ₁ = ",Z(a.l1),", λ₂ = ",Z(a.l2),"; vorhergesagte Rate |λ₂/λ₁| = ",e.jsx("span",{style:{color:ue},children:Z(u)})]}):e.jsxs(e.Fragment,{children:["exakte Eigenwerte: ",Z(a.l1)," ± ",Z(a.im),"·i, also komplex und betragsgleich"]})})]}),e.jsxs("div",{children:[e.jsx(De,{xLabel:"Iteration k",yLabel:"log₁₀ |a₂₁|",series:g,markers:m,xDomain:[0,Ye],yDomain:[-16,2],width:300,height:200}),e.jsx("p",{className:"mt-1 max-w-[19rem] text-xs",style:{color:Y},children:"Rote Punkte: der Betrag der Nebendiagonalen, logarithmisch aufgetragen. Die orange Gerade ist die Vorhersage aus der Rate |λ₂/λ₁|; eine Gerade im Log-Bild bedeutet lineare Konvergenz."})]})]}),e.jsx(X,{kind:!a.reell||Math.abs(u-1)<1e-9?"warn":A<1e-9?"ok":"neutral",children:a.reell?Math.abs(u-1)<1e-9?"Beide Eigenwerte haben denselben Betrag. Die Rate ist 1, die Nebendiagonale schrumpft nicht mehr, und die Voraussetzung der Konvergenzaussage ist verletzt.":A<1e-9?E?`Die Nebendiagonale ist auf Rechengenauigkeit verschwunden: A⁽ᵏ⁾ ist diagonal, auf der Diagonalen stehen die Eigenwerte. ${p} Weil A symmetrisch ist, sind die Spalten von Q_k jetzt Eigenvektoren, bis aufs Vorzeichen.`:`Die Nebendiagonale ist auf Rechengenauigkeit verschwunden: A⁽ᵏ⁾ ist obere Dreiecksmatrix mit den Eigenwerten auf der Diagonalen. ${p} Der Eintrag rechts oben bleibt stehen, denn eine unsymmetrische Matrix wird nur dreieckig, nicht diagonal.`:"Der rote Eintrag schrumpft in jedem Schritt ungefähr um den Faktor |λ₂/λ₁|, die Diagonale wandert dabei auf die Eigenwerte zu. Klicken wir uns weiter, bis der Schrumpffaktor die vorhergesagte Rate trifft.":"Diese Matrix hat komplexe Eigenwerte gleichen Betrags. Eine reelle obere Dreiecksmatrix müsste die Eigenwerte auf der Diagonalen zeigen, also reelle Eigenwerte haben. Die Iteration kann deshalb nicht konvergieren: Q ist hier die Drehung selbst, R die Einheitsmatrix, und A⁽ᵏ⁾ bleibt stehen, wo es war."})]})}function qe(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Die numerische lineare Algebra ist ein großes Feld, und bislang haben wir vor
allem eine ihrer Kernideen ausgereizt: die `,e.jsx(i.em,{children:"Matrixzerlegung"}),`. LU, Cholesky, QR
und die SVD lösen ihr Problem, indem sie die Matrix in Faktoren mit handlicher
Struktur schreiben und die eigentliche Rechnung in diesen Faktoren erledigen.
In diesem Kapitel kommen zwei weitere Kernideen dazu:`]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Iterative Methoden"}),` erzeugen eine Folge von Näherungen und brechen ab,
sobald eine davon genau genug ist. Sie tauschen Genauigkeit gegen Laufzeit.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Probabilistische Methoden"}),` ersetzen ein großes Problem durch ein kleineres,
dessen Lösung der gesuchten mit hoher Wahrscheinlichkeit sehr nahe kommt.`]}),`
`]}),`
`,e.jsxs(i.p,{children:[`An beiden wird aktiv geforscht. Dieser Abschnitt und
`,e.jsx(i.a,{href:"#sec-8.2",children:"Abschnitt 8.2"}),` behandeln die iterative Idee am Eigenwertproblem,
`,e.jsx(i.a,{href:"#sec-8.3",children:"Abschnitt 8.3"}),` an linearen Gleichungssystemen; die probabilistische
Idee kommt in `,e.jsx(i.a,{href:"#sec-8.4",children:"Abschnitt 8.4"})," an die Reihe."]}),`
`,e.jsx(i.h3,{children:"Was wir mitbringen"}),`
`,e.jsx(i.p,{children:"Dieses Kapitel greift auf fast alles zurück, was wir bisher aufgebaut haben:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["die ",e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Komplexitätsanalyse"}),` mit der
`,e.jsxs(l,{id:"big-o-notation",children:[e.jsx(n,{children:"O"}),"-Notation"]}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Kondition"})," und ",e.jsx(i.a,{href:"?k=04-fehler#sec-4.3",children:"Stabilität"}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(l,{id:"orthogonal-matrix",children:"Orthogonalmatrizen"}),`
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.4",children:"Abschnitt 3.4"}),`) und die
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Spektralnorm"})," ",e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_2"}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"lineare Gleichungssysteme"}),` samt ihrer direkten
Lösungsverfahren und die `,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"QR-Zerlegung"}),"."]}),`
`]}),`
`,e.jsxs(i.p,{children:[`Dazu kommt Grundwissen aus der linearen Algebra:
`,e.jsx(l,{id:"eigenvalue-eigenvector",children:"Eigenwerte und Eigenvektoren"}),` und
`,e.jsx(l,{id:"similar-matrices",children:"Ähnlichkeitstransformationen"})," ",e.jsx(n,{children:"\\bB = \\bQ\\bA\\bQ^{-1}"}),`.
Aus der Analysis brauchen wir die `,e.jsx(l,{id:"convergence",children:"Konvergenz von Folgen"}),` und
die `,e.jsx(l,{id:"geometric-series",children:"geometrische Reihe"})," ",e.jsx(n,{children:"\\sum_k p^k"})," für ",e.jsx(n,{children:"|p| < 1"}),`, aus
der Wahrscheinlichkeitsrechnung Zufallsvektoren, Letztere aber erst in
`,e.jsx(i.a,{href:"#sec-8.4",children:"Abschnitt 8.4"}),"."]}),`
`,e.jsx(i.h3,{children:"Eigenwerte ohne charakteristisches Polynom"}),`
`,e.jsxs(i.p,{children:["Gesucht sind Paare aus Eigenwert und Eigenvektor, also ",e.jsx(n,{children:"\\lambda"}),` und
`,e.jsx(n,{children:"\\bv \\neq \\bnull"})," mit ",e.jsx(n,{children:"\\bA\\bv = \\lambda\\bv"}),`. Ein direktes Verfahren dafür
kennen wir aus der linearen Algebra: die Nullstellen des charakteristischen
Polynoms `,e.jsx(n,{children:"\\det(\\bA - \\lambda\\bI) = 0"}),`. Als Algorithmus taugt dieser Weg
allerdings wenig.`]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.1.1 (Warum das charakteristische Polynom kein Algorithmus ist)",id:"env-warum-das-charakteristische-polynom-kein",children:[e.jsxs(i.p,{children:["Für eine ",e.jsx(n,{children:"n \\times n"}),`-Matrix hat das
`,e.jsx(l,{id:"characteristic-polynomial",children:"charakteristische Polynom"})," den Grad ",e.jsx(n,{children:"n"}),`. Daran
hängen gleich drei Probleme:`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Ab ",e.jsx(n,{children:"n \\geq 5"}),` gibt es keine allgemeine Lösungsformel für
`,e.jsx(l,{id:"polynomial-roots",children:"Polynomnullstellen"}),` mehr. Wir müssten die Nullstellen
also ohnehin iterativ suchen und hätten nichts gewonnen.`]}),`
`,e.jsxs(i.li,{children:[`Der Umweg über die Koeffizienten ist numerisch instabil: Winzige Störungen
der Koeffizienten können die Nullstellen weit verschieben, das Problem ist
also `,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"schlecht konditioniert"}),"."]}),`
`,e.jsxs(i.li,{children:["Er ist teuer. Schon das Aufstellen der Koeffizienten kostet ",e.jsx(n,{children:"O(n^4)"}),` oder
mehr, während wir für eine ganze Matrixzerlegung mit `,e.jsx(n,{children:"O(n^3)"})," auskommen."]}),`
`]})]}),`
`,e.jsx(i.p,{children:`Bleiben wir also bei den Verfahren der numerischen linearen Algebra. Auch dort
gibt es direkte Methoden, doch spätestens in drei Situationen wollen wir lieber
iterieren:`}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["bei großen Matrizen (",e.jsx(n,{children:"n > 1000"}),"), wo schon ",e.jsx(n,{children:"O(n^3)"})," wehtut,"]}),`
`,e.jsxs(i.li,{children:["bei ",e.jsx(l,{id:"sparse-matrix",children:"dünnbesetzten Matrizen"}),`, deren Struktur direkte
Verfahren zerstören, weil sie die Nullen mit Zwischenergebnissen auffüllen,`]}),`
`,e.jsxs(i.li,{children:[`wenn wir gar nicht alle Eigenwerte brauchen, sondern nur wenige, etwa die
`,e.jsx(n,{children:"k \\ll n"})," größten."]}),`
`]}),`
`,e.jsxs(i.p,{children:[`Iterative Verfahren spielen hier ihre Stärken aus. Sie kommen oft mit
`,e.jsx(l,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkten"}),` als einziger Operation an
`,e.jsx(n,{children:"\\bA"}),` aus, nutzen also die Dünnbesetztheit unverändert weiter, und der
Kompromiss zwischen Genauigkeit und Laufzeit ist über die Abbruchbedingung
steuerbar.`]}),`
`,e.jsx(i.h3,{children:"Die Potenzmethode"}),`
`,e.jsxs(i.p,{children:[`Das einfachste iterative Verfahren ist zugleich das anschaulichste. Die
`,e.jsx(i.em,{children:"Potenzmethode"}),` (power iteration, nach von Mises) berechnet den betragsgrößten
Eigenwert `,e.jsx(n,{children:"\\cgreen{\\lambda_1}"}),` und einen zugehörigen Eigenvektor
`,e.jsx(n,{children:"\\cgreen{\\bv_1}"}),`, vorausgesetzt, dieser Eigenwert ist von den übrigen getrennt.
Die Idee besteht aus einer einzigen Zeile: Wir wenden `,e.jsx(n,{children:"\\bA"}),` immer wieder an und
normieren nach jedem Schritt.`]}),`
`,e.jsxs(b,{kind:"Algorithmus",label:"8.1.2 (Potenzmethode)",id:"env-potenzmethode",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` und ein Startvektor
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
ungleich null hat. Zerlegt wird nichts, umgeformt wird nichts, `,e.jsx(n,{children:"\\bA"}),` selbst
bleibt unangetastet.`]}),`
`,e.jsx(b,{kind:"Bemerkung",label:"8.1.3 (Zwei Schätzungen für den Eigenwert)",id:"env-zwei-schaetzungen-fuer-den-eigenwert",children:e.jsxs(i.p,{children:[`Wie man den Eigenwert abliest, hängt daran, ob unterwegs normiert wird. Ohne
Normierung, also für die rohe Iteration `,e.jsx(n,{children:"\\bz^{(k)} = \\bA\\bz^{(k-1)}"}),`, wächst
die Länge in jedem Schritt um ungefähr den Faktor `,e.jsx(n,{children:"|\\lambda_1|"}),`, und der
Quotient `,e.jsx(n,{children:"\\left\\|\\bz^{(k)}\\right\\|/\\left\\|\\bz^{(k-1)}\\right\\|"}),` strebt gegen
`,e.jsx(n,{children:"|\\lambda_1|"}),". Normieren wir dagegen wie in ",e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"}),` nach jedem
Schritt, so taugt derselbe Quotient nichts mehr: Zähler und Nenner haben
denselben Grenzwert, er läuft also gegen `,e.jsx(n,{children:"1"}),`. Mit Normierung lautet die
Schätzung schlicht
`,e.jsx(n,{children:"\\cblue{\\lambda^{(k)}} = \\left\\|\\bA\\,\\cblue{\\bx^{(k-1)}}\\right\\|"}),`, und weil eine
Länge kein Vorzeichen liefern kann, konvergiert sie gegen
`,e.jsx(n,{children:"|\\cgreen{\\lambda_1}|"}),"."]})}),`
`,e.jsxs(q,{title:"Der Rayleigh-Quotient als zweite Schätzung",children:[e.jsxs(i.p,{children:[`Wer das Vorzeichen mitnehmen will, verwendet den
`,e.jsx(i.em,{children:"Rayleigh-Quotienten"})]}),e.jsx(t,{children:`\\cblue{\\rho^{(k)}} = \\frac{\\cblue{\\bx^{(k)}}^\\top \\bA\\, \\cblue{\\bx^{(k)}}}{\\cblue{\\bx^{(k)}}^\\top \\cblue{\\bx^{(k)}}}
= \\cblue{\\bx^{(k)}}^\\top \\bA\\, \\cblue{\\bx^{(k)}} ,`}),e.jsxs(i.p,{children:["wobei der Nenner wegen der Normierung gleich ",e.jsx(n,{children:"1"}),` ist. Für
`,e.jsx(l,{id:"symmetric-matrix",children:"symmetrische"})," ",e.jsx(n,{children:"\\bA"}),` ist er die bessere Wahl. Beide
Schätzungen sind dort quadratische Ausdrücke im Winkel zwischen
`,e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"})," und ",e.jsx(n,{children:"\\cgreen{\\bv_1}"}),`, ihr Fehler fällt also mit
`,e.jsx(n,{children:"\\corange{(\\lambda_2/\\lambda_1)}^{2k}"}),` und damit doppelt so schnell wie der
Winkel selbst; der Rayleigh-Quotient liegt dabei um einen konstanten Faktor
näher dran und bringt das Vorzeichen mit. Ist `,e.jsx(n,{children:"\\bA"}),` nicht symmetrisch, stehen
die Eigenvektoren nicht mehr senkrecht aufeinander und beide Schätzungen sind
nur noch linear genau.`]}),e.jsxs(i.p,{children:["Ein Wort noch zum Abbruchkriterium aus ",e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"}),`: Auch dort gehört
`,e.jsx(n,{children:"\\cblue{\\rho^{(k)}}"})," hin, sobald ",e.jsx(n,{children:"\\cgreen{\\lambda_1}"}),` negativ sein kann. Für
`,e.jsx(n,{children:"\\cgreen{\\lambda_1} < 0"})," wechselt ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"}),` nämlich in jedem Schritt
das Vorzeichen, und das Residuum mit
`,e.jsx(n,{children:"\\cblue{\\lambda^{(k)}} = |\\cgreen{\\lambda_1}|"}),` bliebe bei ungefähr
`,e.jsx(n,{children:"2|\\cgreen{\\lambda_1}|"})," hängen, statt gegen null zu gehen."]})]}),`
`,e.jsxs(i.p,{children:["Warum funktioniert das? Weil jede Anwendung von ",e.jsx(n,{children:"\\bA"}),` die Komponente in
Richtung `,e.jsx(n,{children:"\\cgreen{\\bv_1}"})," stärker verstärkt als alle anderen."]}),`
`,e.jsxs(b,{kind:"Satz",label:"8.1.4 (Konvergenz der Potenzmethode)",id:"env-konvergenz-der-potenzmethode",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` diagonalisierbar mit einer Basis aus normierten
Eigenvektoren `,e.jsx(n,{children:"\\bv_1, \\dots, \\bv_n"}),` und Eigenwerten
`,e.jsx(n,{children:"|\\cgreen{\\lambda_1}| > |\\lambda_2| \\geq \\cdots \\geq |\\lambda_n|"}),`. Der
Startvektor habe die Darstellung `,e.jsx(n,{children:"\\bx^{(0)} = \\sum_{i=1}^n c_i \\bv_i"}),` mit
`,e.jsx(n,{children:"c_1 \\neq 0"}),". Dann gilt für die Iterierten aus ",e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"})]}),e.jsx(t,{children:`\\cblue{\\bx^{(k)}} = \\pm\\cgreen{\\bv_1} + \\cred{\\br_k}
\\quad\\text{mit}\\quad
\\left\\|\\cred{\\br_k}\\right\\| \\leq C \\left(\\corange{\\left|\\tfrac{\\lambda_2}{\\lambda_1}\\right|}\\right)^k
\\quad\\text{für alle hinreichend großen } k`}),e.jsxs(i.p,{children:["und einer von ",e.jsx(n,{children:"k"})," unabhängigen Konstanten ",e.jsx(n,{children:"C"}),`, sowie
`,e.jsx(n,{children:"\\cblue{\\lambda^{(k)}} \\to |\\cgreen{\\lambda_1}|"}),`. Für
`,e.jsx(n,{children:"\\cgreen{\\lambda_1} > 0"})," ist das Vorzeichen dabei für alle ",e.jsx(n,{children:"k"}),` dasselbe, für
`,e.jsx(n,{children:"\\cgreen{\\lambda_1} < 0"})," wechselt es in jedem Schritt."]})]}),`
`,e.jsx(q,{title:"Beweis der Konvergenz der Potenzmethode",children:e.jsxs(K,{children:[e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["Induktion über ",e.jsx(n,{children:"k"}),": aus ",e.jsx(n,{children:"\\bA^{k}\\bv_i = \\lambda_i^{k}\\bv_i"})," folgt ",e.jsx(n,{children:"\\bA^{k+1}\\bv_i = \\bA(\\lambda_i^{k}\\bv_i) = \\lambda_i^{k}\\bA\\bv_i = \\lambda_i^{k+1}\\bv_i"}),"; anschließend die Linearität von ",e.jsx(n,{children:"\\bA^k"})]}),children:[e.jsxs(i.p,{children:["Wegen ",e.jsx(n,{children:"\\bA\\bv_i = \\lambda_i\\bv_i"})," ist ",e.jsx(n,{children:"\\bA^k\\bv_i = \\lambda_i^k\\bv_i"}),`. Die
Basisdarstellung des Startvektors überträgt sich damit auf jede Potenz von
`,e.jsx(n,{children:"\\bA"}),":"]}),e.jsx(t,{children:"\\bA^k \\bx^{(0)} = \\sum_{i=1}^n c_i \\lambda_i^k \\bv_i ."})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\lambda_i^k = \\lambda_1^k (\\lambda_i/\\lambda_1)^k"}),"; das geht, weil ",e.jsx(n,{children:"|\\lambda_1| > |\\lambda_2| \\ge 0"})," und damit ",e.jsx(n,{children:"\\lambda_1 \\neq 0"})," ist"]}),children:[e.jsx(i.p,{children:"Jetzt klammern wir den größten Faktor aus:"}),e.jsx(P,{tag:"8.1.1",id:"eq-eq-8-1-1",children:`\\bA^k \\bx^{(0)}
= \\cgreen{\\lambda_1}^k \\Biggl( c_1 \\cgreen{\\bv_1}
+ \\underbrace{\\sum_{i=2}^n c_i \\Bigl(\\corange{\\tfrac{\\lambda_i}{\\lambda_1}}\\Bigr)^k \\bv_i}_{=\\ \\cred{\\bs_k}} \\Biggr) .`})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["Dreiecksungleichung und ",e.jsx(n,{children:"\\left\\|\\bv_i\\right\\| = 1"}),"; danach ",e.jsx(n,{children:"|\\lambda_i| \\leq |\\lambda_2|"})," für alle ",e.jsx(n,{children:"i \\geq 2"}),". Die Potenzen einer Zahl mit Betrag kleiner als ",e.jsx(n,{children:"1"})," bilden eine Nullfolge"]}),children:[e.jsx(i.p,{children:"Der rote Restterm verschwindet, und zwar mit einer geometrischen Rate:"}),e.jsx(t,{children:`\\left\\|\\cred{\\bs_k}\\right\\|
\\leq \\sum_{i=2}^n |c_i| \\left(\\corange{\\left|\\tfrac{\\lambda_i}{\\lambda_1}\\right|}\\right)^k
\\leq \\Bigl(\\sum_{i=2}^n |c_i|\\Bigr) \\left(\\corange{\\left|\\tfrac{\\lambda_2}{\\lambda_1}\\right|}\\right)^k
\\longrightarrow 0 .`}),e.jsxs(i.p,{children:["Übrig bleibt in der Klammer von ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"})," nur ",e.jsx(n,{children:"c_1\\cgreen{\\bv_1}"}),`. Das ist die
Intuition hinter der Methode: Jede Anwendung von `,e.jsx(n,{children:"\\bA"}),` dämpft die
`,e.jsx(n,{children:"i"}),`-te Komponente gegenüber der ersten um den Faktor
`,e.jsx(n,{children:"\\corange{|\\lambda_i/\\lambda_1|} < 1"}),"."]})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["für ",e.jsx(n,{children:"k = 1"})," ist das die Vorschrift selbst; und ist ",e.jsx(n,{children:"\\bx^{(k-1)}"})," das normierte ",e.jsx(n,{children:"\\bA^{k-1}\\bx^{(0)}"}),", so ist ",e.jsx(n,{children:"\\bA\\bx^{(k-1)}"})," ein positives Vielfaches von ",e.jsx(n,{children:"\\bA^{k}\\bx^{(0)}"}),", und Normieren löscht diesen Faktor wieder aus"]}),children:[e.jsxs(i.p,{children:["Die Normierung in ",e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"})," ändert an der ",e.jsx(i.em,{children:"Richtung"}),` nichts. Per
Induktion gilt`]}),e.jsx(t,{children:"\\cblue{\\bx^{(k)}} = \\frac{\\bA^k \\bx^{(0)}}{\\left\\|\\bA^k \\bx^{(0)}\\right\\|} ."})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["Normieren ist stetig, solange der Nenner nicht gegen null geht, und ",e.jsx(n,{children:"\\left\\|\\bw_k\\right\\| \\to |c_1| > 0"})]}),children:[e.jsxs(i.p,{children:["Einsetzen von ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"}),` liefert die Behauptung: Mit
`,e.jsx(n,{children:"\\bw_k = c_1\\cgreen{\\bv_1} + \\cred{\\bs_k}"})," ist"]}),e.jsx(t,{children:`\\cblue{\\bx^{(k)}}
= \\frac{\\cgreen{\\lambda_1}^k \\bw_k}{\\left|\\cgreen{\\lambda_1}\\right|^k \\left\\|\\bw_k\\right\\|}
= \\sign(\\cgreen{\\lambda_1})^k \\cdot \\frac{\\bw_k}{\\left\\|\\bw_k\\right\\|}
\\longrightarrow \\pm \\cgreen{\\bv_1} ,`}),e.jsxs(i.p,{children:["denn ",e.jsx(n,{children:"\\bw_k \\to c_1\\cgreen{\\bv_1}"})," und ",e.jsx(n,{children:"c_1 \\neq 0"}),`. Das verbleibende
Vorzeichen ist das von `,e.jsx(n,{children:"c_1"}),`, multipliziert mit
`,e.jsx(n,{children:"\\sign(\\cgreen{\\lambda_1})^k"}),". Weil der Fehler in ",e.jsx(n,{children:"\\bw_k"}),` nach
Schritt 3 wie `,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}^k"}),` fällt, tut es der Fehler des
normierten Vektors ebenso. Für die Eigenwertschätzung folgt schließlich`]}),e.jsx(t,{children:`\\cblue{\\lambda^{(k)}} = \\left\\|\\bA\\,\\cblue{\\bx^{(k-1)}}\\right\\|
\\longrightarrow \\left\\|\\bA(\\pm\\cgreen{\\bv_1})\\right\\| = |\\cgreen{\\lambda_1}| .`})]})]})}),`
`,e.jsx(i.p,{children:"Rechnen wir das an der Beispielmatrix durch."}),`
`,e.jsxs(b,{kind:"Beispiel",label:"8.1.5 (Potenzmethode an einer 2×2-Matrix)",id:"env-potenzmethode-an-einer-2-2-matrix",children:[e.jsx(i.p,{children:"Sei"}),e.jsx(t,{children:"\\bA = \\begin{pmatrix} 5 & -2 \\\\ -2 & 8 \\end{pmatrix} ."}),e.jsx(i.p,{children:"Das charakteristische Polynom ist"}),e.jsx(t,{children:`\\det(\\bA - \\lambda\\bI) = (5-\\lambda)(8-\\lambda) - 4 = \\lambda^2 - 13\\lambda + 36
= (\\lambda - 9)(\\lambda - 4) ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"\\cgreen{\\lambda_1} = 9"})," und ",e.jsx(n,{children:"\\lambda_2 = 4"}),`. Die Eigenvektoren lesen wir
aus `,e.jsx(n,{children:"(\\bA - \\lambda\\bI)\\bv = \\bnull"})," mit ",e.jsx(n,{children:"\\bv = (a, b)^\\top"}),` ab: Für
`,e.jsx(n,{children:"\\lambda = 9"})," heißt die erste Zeile ",e.jsx(n,{children:"-4a - 2b = 0"}),", also ",e.jsx(n,{children:"b = -2a"}),`; für
`,e.jsx(n,{children:"\\lambda = 4"})," heißt sie ",e.jsx(n,{children:"a - 2b = 0"}),", also ",e.jsx(n,{children:"a = 2b"}),". Normiert ergibt das"]}),e.jsx(t,{children:`\\cgreen{\\bv_1} = \\tfrac{1}{\\sqrt{5}}\\begin{pmatrix} -1 \\\\ 2 \\end{pmatrix}
\\approx \\begin{pmatrix} -0{,}447 \\\\ 0{,}894 \\end{pmatrix} ,
\\qquad
\\bv_2 = \\tfrac{1}{\\sqrt{5}}\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[`Die beiden stehen senkrecht aufeinander, wie es der
`,e.jsx(l,{id:"spectral-theorem",children:"Spektralsatz"}),` für symmetrische Matrizen verlangt. Die zu
erwartende Konvergenzrate ist `,e.jsx(n,{children:`\\corange{\\lambda_2/\\lambda_1} = 4/9 \\approx
\\corange{0{,}444}`}),"."]}),e.jsxs(i.p,{children:["Wir starten mit ",e.jsx(n,{children:"\\bx^{(0)} = (2;\\ 1{,}3)^\\top"}),`. Weil die Eigenvektoren eine
Orthonormalbasis bilden, sind die Koeffizienten der Basisdarstellung einfach
die Skalarprodukte:`]}),e.jsx(t,{children:`c_1 = \\cgreen{\\bv_1}^\\top\\bx^{(0)} = \\frac{-2 + 2{,}6}{\\sqrt{5}} \\approx 0{,}268 ,
\\qquad
c_2 = \\bv_2^\\top\\bx^{(0)} = \\frac{4 + 1{,}3}{\\sqrt{5}} \\approx 2{,}370 .`}),e.jsxs(i.p,{children:["Der Start liegt also fast in Richtung ",e.jsx(n,{children:"\\bv_2"}),", und ",e.jsx(n,{children:"c_1"}),` ist knapp neunmal
kleiner als `,e.jsx(n,{children:"c_2"}),". Nach ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"}),` muss die Iteration diesen Rückstand erst
aufholen, und genau das zeigen die ersten Schritte:`]}),e.jsx(t,{children:`\\begin{array}{c|c|c|c|c}
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
\\end{array}`}),e.jsxs(i.p,{children:[`Drei Beobachtungen. Erstens dauert es vier Schritte, bis die Iterierte
überhaupt in den richtigen Quadranten wandert; solange dominiert der
`,e.jsx(n,{children:"\\bv_2"}),`-Anteil. Zweitens schrumpft der Winkel zur grünen Richtung ab dann in
jedem Schritt um ungefähr `,e.jsx(n,{children:"\\corange{0{,}444}"}),", die Rate aus ",e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),`:
`,e.jsx(n,{children:"0{,}151/0{,}326 \\approx 0{,}46"})," und ",e.jsx(n,{children:"0{,}068/0{,}151 \\approx 0{,}45"}),`.
Drittens sind beide Eigenwertschätzungen schneller am Ziel als die Richtung:
Ihr Fehler fällt pro Schritt um ungefähr
`,e.jsx(n,{children:"\\corange{(\\lambda_2/\\lambda_1)^2} \\approx 0{,}198"}),`, also quadratisch in der
Rate.`]}),e.jsx(q,{title:"Der Genauigkeitsvorsprung des Rayleigh-Quotienten",children:e.jsxs(i.p,{children:["Von ",e.jsx(n,{children:"k = 8"})," auf ",e.jsx(n,{children:"k = 10"}),` geht der Fehler des Rayleigh-Quotienten von
`,e.jsx(n,{children:"-9{,}0 \\cdot 10^{-4}"})," auf ",e.jsx(n,{children:"-3{,}5 \\cdot 10^{-5}"}),` zurück, der Fehler der
Normschätzung von `,e.jsx(n,{children:"-3{,}3 \\cdot 10^{-3}"})," auf ",e.jsx(n,{children:"-1{,}3 \\cdot 10^{-4}"}),`. Der
Rayleigh-Quotient ist also nicht schneller, aber asymptotisch um den
Faktor `,e.jsx(n,{children:"3{,}7"})," genauer."]})})]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.1.6 (Wann die Potenzmethode versagt)",id:"env-wann-die-potenzmethode-versagt",children:[e.jsxs(i.p,{children:["Zwei Voraussetzungen von ",e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),` sind verletzbar, und beide Male bricht die
Konvergenz zusammen.`]}),e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Kein Anteil in Richtung ",e.jsx(n,{children:"\\cgreen{\\bv_1}"}),"."]})," Ist ",e.jsx(n,{children:"c_1 = 0"}),`, so fehlt in
`,e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"}),` der grüne Term. Die Iteration läuft dann gegen die Eigenrichtung mit
dem größten Eigenwert, der im Startvektor überhaupt vertreten ist. Für symmetrisches `,e.jsx(n,{children:"\\bA"}),`
sind die Eigenvektoren orthogonal, dort heißt `,e.jsx(n,{children:"c_1 = \\cgreen{\\bv_1}^\\top\\bx^{(0)} = 0"}),`
also schlicht: Der Startvektor steht senkrecht auf dem gesuchten Eigenvektor.
In `,e.jsx(i.a,{href:"#env-potenzmethode-an-einer-2-2-matrix",children:"Beispiel 8.1.5"})," trifft das auf ",e.jsx(n,{children:"\\bx^{(0)} = c\\,\\bv_2"}),` zu. Dann ist
`,e.jsx(n,{children:"\\bA\\bx^{(0)} = 4\\,\\bx^{(0)}"}),`, die normierte Iterierte bleibt für immer stehen,
und beide Schätzungen liefern hartnäckig `,e.jsx(n,{children:"4"})," statt ",e.jsx(n,{children:"9"}),`. In der Praxis ist das
weniger dramatisch, als es klingt: Ein zufällig gewählter Startvektor erfüllt
`,e.jsx(n,{children:"c_1 \\neq 0"})," mit Wahrscheinlichkeit ",e.jsx(n,{children:"1"}),`, und Rundungsfehler schmuggeln beim
Rechnen ohnehin einen kleinen `,e.jsx(n,{children:"\\cgreen{\\bv_1}"}),`-Anteil hinein, den die Iteration
dann geduldig aufbläst.`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Kein separierter größter Eigenwert."})," Gilt ",e.jsx(n,{children:"|\\lambda_1| = |\\lambda_2|"}),`, etwa
bei `,e.jsx(n,{children:"\\lambda_2 = -\\lambda_1"}),` oder bei einem komplexen Eigenwertpaar, so ist die
Rate `,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|} = 1"}),` und nichts konvergiert mehr. Und
selbst wenn die beiden nur `,e.jsx(i.em,{children:"nahe"}),` beieinanderliegen, wird die Methode quälend
langsam. Beide Male brauchen wir andere Verfahren.`]})]}),`
`,e.jsxs(T,{title:"Die Potenzmethode Schritt für Schritt",children:[e.jsx(i.p,{children:`Was geschieht, wenn der Start genau auf der zweiten Eigenrichtung liegt?
Ziehen wir den Start auf dem Einheitskreis und testen wir diese Vermutung.`}),e.jsx(un,{})]}),`
`,e.jsx(N,{children:e.jsxs(ye,{loesung:.4444444444,toleranz:.01,children:[e.jsx(i.p,{children:"Welche Rate zeigt der Potenzmethoden-Stepper für die Beispielmatrix langfristig an?"}),e.jsx(i.p,{children:"Der orange Wert nähert sich dem Verhältnis der beiden Eigenwertbeträge."})]})}),`
`,e.jsx(i.h3,{children:"Ähnliche Matrizen als Werkzeug"}),`
`,e.jsxs(i.p,{children:[`Die Potenzmethode liefert einen Eigenwert. Wollen wir alle, brauchen wir eine
andere Idee: Wir überführen `,e.jsx(n,{children:"\\bA"})," in eine Matrix ",e.jsx(n,{children:"\\bB"}),`, der wir die Eigenwerte
ansehen können, ohne sie dabei zu verändern. Genau das leisten
Ähnlichkeitstransformationen.`]}),`
`,e.jsxs(b,{kind:"Satz",label:"8.1.7 (Ähnliche Matrizen haben dieselben Eigenwerte)",id:"env-aehnliche-matrizen-haben-dieselben",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bB = \\bQ\\bA\\bQ^{-1}"})," mit invertierbarem ",e.jsx(n,{children:"\\bQ \\in \\R^{n \\times n}"}),`, also
`,e.jsx(n,{children:"\\bB"})," ",e.jsx(l,{id:"similar-matrices",children:"ähnlich"})," zu ",e.jsx(n,{children:"\\bA"}),". Dann gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bB"}),` haben dasselbe charakteristische Polynom, insbesondere
dieselben Eigenwerte mit denselben Vielfachheiten, dieselbe
`,e.jsx(l,{id:"determinant",children:"Determinante"})," und dieselbe ",e.jsx(l,{id:"trace",children:"Spur"}),"."]}),`
`,e.jsxs(i.li,{children:["Ist ",e.jsx(n,{children:"\\by"})," Eigenvektor von ",e.jsx(n,{children:"\\bB"})," zum Eigenwert ",e.jsx(n,{children:"\\lambda"}),`, so ist
`,e.jsx(n,{children:"\\bx = \\bQ^{-1}\\by"})," Eigenvektor von ",e.jsx(n,{children:"\\bA"})," zum selben Eigenwert."]}),`
`]})]}),`
`,e.jsx(q,{title:"Rechnung zur Ähnlichkeit",children:e.jsxs(K,{children:[e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["Multiplikation von links mit ",e.jsx(n,{children:"\\bQ^{-1}"}),"; und ",e.jsx(n,{children:"\\bx = \\bQ^{-1}\\by \\neq \\bnull"}),", weil ",e.jsx(n,{children:"\\bQ^{-1}"})," invertierbar ist und ",e.jsx(n,{children:"\\by \\neq \\bnull"})]}),children:[e.jsxs(i.p,{children:["Zu (2): Aus ",e.jsx(n,{children:"\\bB\\by = \\lambda\\by"}),` wird durch Einsetzen der Definition von
`,e.jsx(n,{children:"\\bB"})]}),e.jsx(t,{children:`\\bQ\\bA\\bQ^{-1}\\by = \\lambda\\by
\\;\\implies\\;
\\bA\\bQ^{-1}\\by = \\lambda\\bQ^{-1}\\by
\\;\\implies\\;
\\bA\\bx = \\lambda\\bx .`})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bQ\\bA\\bQ^{-1} - \\lambda\\bQ\\bI\\bQ^{-1} = \\bQ(\\bA - \\lambda\\bI)\\bQ^{-1}"}),", und ",e.jsx(n,{children:"\\det(\\bQ)^{-1} = \\det(\\bQ^{-1})"})," ist wegen der Invertierbarkeit definiert"]}),children:[e.jsxs(i.p,{children:["Zu (1): Wir schieben ",e.jsx(n,{children:"\\bI = \\bQ\\bQ^{-1}"}),` in den zweiten Summanden und
verwenden die Multiplikativität der Determinante:`]}),e.jsx(t,{children:`\\det(\\bB - \\lambda\\bI)
= \\det\\bigl(\\bQ(\\bA - \\lambda\\bI)\\bQ^{-1}\\bigr)
= \\det(\\bQ)\\det(\\bA - \\lambda\\bI)\\det(\\bQ)^{-1}
= \\det(\\bA - \\lambda\\bI) .`}),e.jsx(i.p,{children:`Beide Matrizen haben also dasselbe charakteristische Polynom und damit
dieselben Eigenwerte samt Vielfachheiten.`})]}),e.jsx(f,{why:e.jsx(e.Fragment,{children:"alternativ über das charakteristische Polynom: Spur und Determinante sind bis aufs Vorzeichen zwei seiner Koeffizienten, und die stimmen nach Schritt 2 überein"}),children:e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\lambda = 0"})," liefert das ",e.jsx(n,{children:"\\det(\\bB) = \\det(\\bA)"}),`. Die Gleichheit der
Spuren steht schon in
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),`: Die Spur ist zyklisch, also
`,e.jsx(n,{children:"\\tr(\\bQ\\bA\\bQ^{-1}) = \\tr(\\bA\\bQ^{-1}\\bQ) = \\tr(\\bA)"}),"."]})})]})}),`
`,e.jsxs(i.p,{children:["Besonders bequem wird es, wenn ",e.jsx(n,{children:"\\bB"}),` diagonal ist: Dann stehen die Eigenwerte
einfach da.`]}),`
`,e.jsxs(b,{kind:"Beispiel",label:"8.1.8 (Diagonalisierung durch eine Orthogonalmatrix)",id:"env-diagonalisierung-durch-eine",children:[e.jsxs(i.p,{children:["Wir bleiben bei ",e.jsx(n,{children:"\\bA"})," aus ",e.jsx(i.a,{href:"#env-potenzmethode-an-einer-2-2-matrix",children:"Beispiel 8.1.5"})," und wählen"]}),e.jsx(t,{children:`\\bQ = \\frac{1}{\\sqrt{5}} \\begin{pmatrix} 2 & 1 \\\\ 1 & -2 \\end{pmatrix}
\\qquad\\text{mit}\\qquad
\\bQ^\\top\\bQ = \\bI .`}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bQ"})," ist orthogonal, also ist ",e.jsx(n,{children:"\\bQ^{-1} = \\bQ^\\top"}),` und die
Ähnlichkeitstransformation `,e.jsx(n,{children:"\\bB = \\bQ\\bA\\bQ^\\top"}),` kommt ohne jede Inversion
aus. Rechnen wir sie in zwei Etappen aus. Zuerst`]}),e.jsx(t,{children:`\\bA\\bQ^\\top = \\frac{1}{\\sqrt{5}} \\begin{pmatrix} 5 & -2 \\\\ -2 & 8 \\end{pmatrix}
\\begin{pmatrix} 2 & 1 \\\\ 1 & -2 \\end{pmatrix}
= \\frac{1}{\\sqrt{5}} \\begin{pmatrix} 8 & 9 \\\\ 4 & -18 \\end{pmatrix} ,`}),e.jsxs(i.p,{children:["denn etwa der Eintrag links oben ist ",e.jsx(n,{children:"5 \\cdot 2 + (-2) \\cdot 1 = 8"}),". Dann"]}),e.jsx(t,{children:`\\bB = \\bQ\\bigl(\\bA\\bQ^\\top\\bigr)
= \\frac{1}{5} \\begin{pmatrix} 2 & 1 \\\\ 1 & -2 \\end{pmatrix}
\\begin{pmatrix} 8 & 9 \\\\ 4 & -18 \\end{pmatrix}
= \\frac{1}{5} \\begin{pmatrix} 20 & 0 \\\\ 0 & 45 \\end{pmatrix}
= \\begin{pmatrix} \\cgreen{4} & 0 \\\\ 0 & \\cgreen{9} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Die beiden Nullen sind kein Zufall: Die Zeilen von ",e.jsx(n,{children:"\\bQ"}),` sind gerade die
Eigenvektoren von `,e.jsx(n,{children:"\\bA"}),`. Auf der Diagonalen stehen deshalb die Eigenwerte, und
sie stimmen mit den Nullstellen des charakteristischen Polynoms aus
`,e.jsx(i.a,{href:"#env-potenzmethode-an-einer-2-2-matrix",children:"Beispiel 8.1.5"})," überein."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Zur Reihenfolge."})," Auf der Diagonalen steht ",e.jsx(n,{children:"(4, 9)"})," und nicht ",e.jsx(n,{children:"(9, 4)"}),`. Das
ist keine Eigenschaft von `,e.jsx(n,{children:"\\bA"}),", sondern eine der Spaltenwahl von ",e.jsx(n,{children:"\\bQ^\\top"}),`:
Die erste Spalte von `,e.jsx(n,{children:"\\bQ^\\top"})," ist ",e.jsx(n,{children:"\\bv_2"}),", die zweite ist ",e.jsx(n,{children:"-\\cgreen{\\bv_1}"}),`,
und in dieser Reihenfolge landen die zugehörigen Eigenwerte auf der Diagonalen.
Hätten wir die Spalten getauscht, stünde dort `,e.jsx(n,{children:"(9, 4)"}),`. Wir bleiben im ganzen
Kapitel bei der absteigenden Sortierung `,e.jsx(n,{children:"\\cgreen{\\lambda_1} = 9 \\geq \\lambda_2 = 4"}),`,
so wie bei der Potenzmethode.`]}),e.jsxs(i.p,{children:["Auch ",e.jsx(i.a,{href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"}),"(2) lässt sich hier ablesen: ",e.jsx(n,{children:"\\by = \\be_2"}),` ist Eigenvektor von
`,e.jsx(n,{children:"\\bB"})," zum Eigenwert ",e.jsx(n,{children:"9"}),`, und
`,e.jsx(n,{children:"\\bx = \\bQ^{-1}\\be_2 = \\bQ^\\top\\be_2 = \\tfrac{1}{\\sqrt{5}}(1, -2)^\\top = -\\cgreen{\\bv_1}"}),`
ist tatsächlich Eigenvektor von `,e.jsx(n,{children:"\\bA"})," zu demselben Eigenwert."]})]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.1.9 (Welche Zielgestalt, welches Verfahren)",id:"env-welche-zielgestalt-welches-verfahren",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-diagonalisierung-durch-eine",children:"Beispiel 8.1.8"}),` hat geschummelt: Wir kannten die Eigenvektoren schon und haben
`,e.jsx(n,{children:"\\bQ"})," daraus gebaut. Ein Algorithmus muss ein passendes ",e.jsx(n,{children:"\\bQ"}),` erst finden, und
zwar iterativ. Er erzeugt eine Folge `,e.jsx(n,{children:"\\bB^{(k)}"})," von zu ",e.jsx(n,{children:"\\bA"}),` ähnlichen
Matrizen, die einer Zielgestalt immer näher kommt. Welche Zielgestalt, das
unterscheidet die Verfahren:`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Die ",e.jsx(i.em,{children:"QR-Iteration"})," strebt eine obere ",e.jsx(l,{id:"triangular-matrix",children:"Dreiecksmatrix"}),`
an, die `,e.jsx(i.em,{children:"Schur-Zerlegung"}),`; auf ihrer Diagonalen stehen die Eigenwerte.
Analog gibt es LU- und Cholesky-Iterationen.`]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(i.em,{children:"Lanczos-Iteration"}),` strebt eine Tridiagonalmatrix an, also
`,e.jsx(n,{children:"b_{ij} = 0"})," für ",e.jsx(n,{children:"|i - j| > 1"}),`, und lässt sich auf die wichtigsten
Eigenwerte einschränken. Für große dünnbesetzte Matrizen ist sie deutlich
effizienter.`]}),`
`]}),e.jsxs(i.p,{children:[`In der Praxis kommen zu beiden noch numerische Kniffe hinzu, die sie stabil und
schnell genug machen: `,e.jsx(i.em,{children:"Shifted QR"})," und ",e.jsx(i.em,{children:"Implicitly Restarted Lanczos"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Die QR-Iteration"}),`
`,e.jsxs(i.p,{children:[`Die QR-Iteration ist von verblüffender Schlichtheit. Wir zerlegen die aktuelle
Matrix in `,e.jsx(n,{children:"\\bQ\\bR"}),` und multiplizieren die beiden Faktoren in der falschen
Reihenfolge wieder zusammen.`]}),`
`,e.jsxs(b,{kind:"Algorithmus",label:"8.1.10 (QR-Iteration)",id:"env-qr-iteration",children:[e.jsxs(i.p,{children:["Gegeben sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Starte mit ",e.jsx(n,{children:"\\bA^{(0)} = \\bA"}),"."]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"k = 1, 2, \\dots"}),":",`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Berechne die ",e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"QR-Zerlegung"}),`
`,e.jsx(n,{children:"\\bA^{(k-1)} = \\bQ^{(k)}\\bR^{(k)}"}),"."]}),`
`,e.jsxs(i.li,{children:[`Setze
`,e.jsx(n,{children:"\\cblue{\\bA^{(k)}} = \\bR^{(k)}\\bQ^{(k)}"}),"."]}),`
`]}),`
`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Der zweite Schritt sieht willkürlich aus, ist aber genau die
Ähnlichkeitstransformation aus dem letzten Abschnitt. Wegen
`,e.jsx(n,{children:"\\bR^{(k)} = (\\bQ^{(k)})^\\top\\bA^{(k-1)}"})," ist nämlich"]}),`
`,e.jsx(t,{children:"\\cblue{\\bA^{(k)}} = \\bR^{(k)}\\bQ^{(k)} = (\\bQ^{(k)})^\\top \\bA^{(k-1)} \\bQ^{(k)} ."}),`
`,e.jsxs(b,{kind:"Satz",label:"8.1.11 (Die Iterierten sind ähnlich zu A)",id:"env-die-iterierten-sind-aehnlich-zu-a",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bQ_k := \\bQ^{(1)}\\bQ^{(2)}\\cdots\\bQ^{(k)}"}),` gilt für die Iterierten aus
`,e.jsx(i.a,{href:"#env-qr-iteration",children:"Algorithmus 8.1.10"})]}),e.jsx(P,{tag:"8.1.2",id:"eq-die-iterierten-sind-aehnlich-zu-a",children:"\\cblue{\\bA^{(k)}} = \\bQ_k^\\top\\, \\bA\\, \\bQ_k ."}),e.jsxs(i.p,{children:["Insbesondere ist jedes ",e.jsx(n,{children:"\\cblue{\\bA^{(k)}}"})," ähnlich zu ",e.jsx(n,{children:"\\bA"}),` und hat nach
`,e.jsx(i.a,{href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"})," dieselben Eigenwerte."]})]}),`
`,e.jsx(q,{title:"Beweis der Ähnlichkeit aller QR-Iterierten",children:e.jsxs(K,{children:[e.jsx(f,{why:e.jsxs(e.Fragment,{children:["Produkte von Orthogonalmatrizen sind orthogonal: ",e.jsx(n,{children:"(\\bQ\\bP)^\\top(\\bQ\\bP) = \\bP^\\top\\bQ^\\top\\bQ\\bP = \\bP^\\top\\bP = \\bI"})]}),children:e.jsxs(i.p,{children:["Jedes ",e.jsx(n,{children:"\\bQ^{(j)}"})," ist orthogonal, also ist auch das Produkt ",e.jsx(n,{children:"\\bQ_k"}),`
orthogonal und es gilt `,e.jsx(n,{children:"\\bQ_k^{-1} = \\bQ_k^\\top"}),"."]})}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bQ_{k-1}\\bQ^{(k)} = \\bQ_k"})," nach Definition, und ",e.jsx(n,{children:"(\\bQ_{k-1}\\bQ^{(k)})^\\top = (\\bQ^{(k)})^\\top\\bQ_{k-1}^\\top"})]}),children:[e.jsxs(i.p,{children:["Die Behauptung folgt per Induktion. Für ",e.jsx(n,{children:"k = 1"}),` ist
`,e.jsx(n,{children:"\\bA^{(1)} = (\\bQ^{(1)})^\\top\\bA\\bQ^{(1)} = \\bQ_1^\\top\\bA\\bQ_1"}),`. Gilt sie für
`,e.jsx(n,{children:"k - 1"}),", so ist"]}),e.jsx(t,{children:`\\cblue{\\bA^{(k)}} = (\\bQ^{(k)})^\\top \\bA^{(k-1)} \\bQ^{(k)}
= (\\bQ^{(k)})^\\top \\bQ_{k-1}^\\top\\, \\bA\\, \\bQ_{k-1} \\bQ^{(k)}
= \\bQ_k^\\top\\, \\bA\\, \\bQ_k .`})]})]})}),`
`,e.jsx(i.p,{children:`Damit ist klar, dass die Iteration nichts kaputt macht. Warum sie aber
überhaupt irgendwohin läuft, verrät erst der folgende Satz. Er ist der
eigentliche Grund, warum das Verfahren funktioniert.`}),`
`,e.jsxs(b,{kind:"Satz",label:"8.1.12 (Die QR-Iteration zerlegt die Potenzen von A)",id:"env-die-qr-iteration-zerlegt-die-potenzen",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bQ_k := \\bQ^{(1)}\\bQ^{(2)}\\cdots\\bQ^{(k)}"}),` und
`,e.jsx(n,{children:"\\bR_k := \\bR^{(k)}\\bR^{(k-1)}\\cdots\\bR^{(1)}"})," gilt für alle ",e.jsx(n,{children:"k \\geq 1"})]}),e.jsx(P,{tag:"8.1.3",id:"eq-die-qr-iteration-zerlegt-die-potenzen",children:"\\bA^k = \\bQ_k \\bR_k ."}),e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"k"}),`-te Iterierte trägt also, versteckt in ihren Faktoren, die
QR-Zerlegung der `,e.jsx(n,{children:"k"}),"-ten Potenz von ",e.jsx(n,{children:"\\bA"}),"."]})]}),`
`,e.jsx(q,{title:"Wie sich die Potenzzerlegung induktiv ergibt",children:e.jsxs(K,{children:[e.jsx(f,{why:e.jsxs(e.Fragment,{children:["für ",e.jsx(n,{children:"k = 1"})," sind ",e.jsx(n,{children:"\\bQ_1 = \\bQ^{(1)}"})," und ",e.jsx(n,{children:"\\bR_1 = \\bR^{(1)}"})," genau die Faktoren des ersten Iterationsschritts"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Induktionsanfang"})," ",e.jsx(n,{children:"k = 1"}),`: Der erste Schritt zerlegt
`,e.jsx(n,{children:"\\bA = \\bA^{(0)} = \\bQ^{(1)}\\bR^{(1)} = \\bQ_1\\bR_1"}),"."]})}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["dieselbe Matrix ",e.jsx(n,{children:"\\bA^{(i)}"}),", einmal als Ergebnis von Schritt ",e.jsx(n,{children:"i"})," und einmal als Eingang von Schritt ",e.jsx(n,{children:"i+1"})," gelesen"]}),children:[e.jsxs(i.p,{children:["Wir notieren die Rechenregel, die den Schritt trägt. Für jedes ",e.jsx(n,{children:"i"}),` ist
`,e.jsx(n,{children:"\\bA^{(i)} = \\bR^{(i)}\\bQ^{(i)}"})," nach ",e.jsx(i.a,{href:"#env-qr-iteration",children:"Algorithmus 8.1.10"}),` und
`,e.jsx(n,{children:"\\bA^{(i)} = \\bQ^{(i+1)}\\bR^{(i+1)}"}),` nach der Zerlegung im nächsten Schritt,
also`]}),e.jsx(t,{children:"\\bR^{(i)}\\bQ^{(i)} = \\bQ^{(i+1)}\\bR^{(i+1)} . \\qquad (\\star)"})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["in der zweiten Zeile ist ",e.jsx(n,{children:"\\bQ_k\\bR_k"})," ausgeschrieben; jede Anwendung von ",e.jsx(n,{children:"(\\star)"})," tauscht ein ",e.jsx(n,{children:"\\bR^{(i)}\\bQ^{(i)}"})," gegen ",e.jsx(n,{children:"\\bQ^{(i+1)}\\bR^{(i+1)}"})," und schiebt so ein weiteres ",e.jsx(n,{children:"\\bQ"})," nach vorn"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Induktionsschritt"})," ",e.jsx(n,{children:"k \\to k+1"}),`: Wir setzen die Induktionsvoraussetzung ein
und schieben dann `,e.jsx(n,{children:"k"}),"-mal ",e.jsx(n,{children:"(\\star)"})," von links nach rechts durch das Produkt."]}),e.jsx(t,{children:`\\begin{aligned}
\\bA^{k+1} &= \\bA\\,\\bA^k = \\bigl(\\bQ^{(1)}\\bR^{(1)}\\bigr)\\bigl(\\bQ_k\\bR_k\\bigr) \\\\
&= \\bQ^{(1)}\\underbrace{\\bigl(\\bR^{(1)}\\bQ^{(1)}\\bigr)}_{= \\,\\bQ^{(2)}\\bR^{(2)}}
   \\bQ^{(2)}\\cdots\\bQ^{(k)}\\,\\bR^{(k)}\\cdots\\bR^{(1)} \\\\
&= \\bQ^{(1)}\\bQ^{(2)}\\underbrace{\\bigl(\\bR^{(2)}\\bQ^{(2)}\\bigr)}_{= \\,\\bQ^{(3)}\\bR^{(3)}}
   \\bQ^{(3)}\\cdots\\bQ^{(k)}\\,\\bR^{(k)}\\cdots\\bR^{(1)} \\\\
&= \\cdots = \\bQ^{(1)}\\bQ^{(2)}\\cdots\\bQ^{(k+1)}\\,\\bR^{(k+1)}\\bR^{(k)}\\cdots\\bR^{(1)} \\\\
&= \\bQ_{k+1}\\bR_{k+1} .
\\end{aligned}`})]})]})}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.1.13 (Die QR-Iteration ist eine simultane Potenzmethode)",id:"env-die-qr-iteration-ist-eine-simultane",children:[e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-die-qr-iteration-zerlegt-die-potenzen",children:"(8.1.3)"}),` macht das Verfahren durchschaubar. Bei der üblichen
Normierung mit positiven Diagonaleinträgen in `,e.jsx(n,{children:"\\bR"}),` ist die QR-Zerlegung
gerade das `,e.jsx(l,{id:"gram-schmidt",children:"Gram-Schmidt-Verfahren"}),` auf den Spalten. Die
Spalten von `,e.jsx(n,{children:"\\bQ_k"})," sind demnach die orthonormalisierten Versionen von"]}),e.jsx(t,{children:"\\bA^k\\be_1, \\quad \\bA^k\\be_2, \\quad \\dots, \\quad \\bA^k\\be_n ."}),e.jsxs(i.p,{children:[`Jede einzelne dieser Spalten ist eine unnormierte Iterierte der Potenzmethode,
gestartet in einem Einheitsvektor. Die QR-Iteration ist also eine `,e.jsx(i.em,{children:"simultane"}),`
Potenzmethode auf allen `,e.jsx(n,{children:"n"}),` Einheitsvektoren zugleich, mit einer
Orthonormalisierung nach jedem Schritt. Diese Orthonormalisierung ist der ganze
Trick: Ohne sie würden alle `,e.jsx(n,{children:"n"}),` Spalten in dieselbe Richtung
`,e.jsx(n,{children:"\\cgreen{\\bv_1}"}),` kippen und die Information über die übrigen Eigenrichtungen
ginge verloren.`]})]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.1.14 (Wogegen die QR-Iteration konvergiert)",id:"env-wogegen-die-qr-iteration-konvergiert",children:[e.jsxs(i.p,{children:[`Bei der Konvergenz ist Vorsicht geboten, denn sie gilt nicht ohne
Voraussetzungen. Ein Gegenbeispiel liefert die Drehung um `,e.jsx(n,{children:"90^\\circ"}),`,
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 0 & -1 \\\\ 1 & 0 \\end{smallmatrix}\\bigr)"}),`: Hier
ist `,e.jsx(n,{children:"\\bQ^{(1)} = \\bA"})," und ",e.jsx(n,{children:"\\bR^{(1)} = \\bI"}),", also ",e.jsx(n,{children:"\\bA^{(1)} = \\bA"}),`, und die
Iteration steht für immer still. Ihre Eigenwerte `,e.jsx(n,{children:"\\pm i"}),` sind komplex und
betragsgleich.`]}),e.jsx(i.p,{children:"Sind dagegen alle Eigenwerte reell und betragsmäßig getrennt,"}),e.jsx(t,{children:"|\\lambda_1| > |\\lambda_2| > \\cdots > |\\lambda_n| > 0 ,"}),e.jsxs(i.p,{children:["so konvergiert ",e.jsx(n,{children:"\\cblue{\\bA^{(k)}}"}),` gegen eine obere Dreiecksmatrix mit den
Eigenwerten auf der Diagonalen. Das ist die `,e.jsx(i.em,{children:"Schur-Zerlegung"})," von ",e.jsx(n,{children:"\\bA"}),`. Die
Einträge unterhalb der Diagonalen fallen dabei linear, der Eintrag an der
Stelle `,e.jsx(n,{children:"(i, j)"})," mit ",e.jsx(n,{children:"i > j"})," wie ",e.jsx(n,{children:"\\corange{|\\lambda_i/\\lambda_j|}^k"}),`; die
langsamste dieser Raten gehört zum engsten Paar benachbarter Eigenwerte.`]}),e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\bA"})," zusätzlich ",e.jsx(i.strong,{children:"symmetrisch"}),", so ist wegen ",e.jsx(i.a,{href:"#eq-die-iterierten-sind-aehnlich-zu-a",children:"(8.1.2)"}),` auch jedes
`,e.jsx(n,{children:"\\cblue{\\bA^{(k)}} = \\bQ_k^\\top\\bA\\bQ_k"}),` symmetrisch, und eine symmetrische
obere Dreiecksmatrix ist diagonal. In diesem Fall gilt außerdem
`,e.jsx(n,{children:"\\bA = \\cgreen{\\bV}\\bLambda\\cgreen{\\bV}^\\top"})," mit orthogonalem ",e.jsx(n,{children:"\\cgreen{\\bV}"}),`
aus Eigenvektoren, und mit `,e.jsx(n,{children:"\\bQ_k \\to \\cgreen{\\bV}"})," folgt"]}),e.jsx(t,{children:`\\bQ_k^\\top\\bA\\bQ_k \\longrightarrow \\cgreen{\\bV}^\\top\\bA\\cgreen{\\bV}
= \\cgreen{\\bV}^\\top\\cgreen{\\bV}\\bLambda\\cgreen{\\bV}^\\top\\cgreen{\\bV} = \\bLambda .`}),e.jsxs(i.p,{children:[`Diese Rechnung hängt ganz am
`,e.jsx(l,{id:"spectral-theorem",children:"Spektralsatz"}),": Nur für symmetrisches ",e.jsx(n,{children:"\\bA"}),` gibt es die
Zerlegung `,e.jsx(n,{children:"\\bA = \\cgreen{\\bV}\\bLambda\\cgreen{\\bV}^\\top"})," mit ",e.jsx(i.em,{children:"orthogonalem"}),`
`,e.jsx(n,{children:"\\cgreen{\\bV}"}),", und nur deshalb kürzt sich ",e.jsx(n,{children:"\\cgreen{\\bV}^\\top\\cgreen{\\bV}"}),` in
der Kette zweimal zur Einheitsmatrix weg. Im allgemeinen Fall ist der Grenzwert
von `,e.jsx(n,{children:"\\bQ_k"}),` der Orthogonalfaktor der Schur-Zerlegung, und von dessen Spalten
ist nur die erste ein Eigenvektor. Die übrigen Eigenvektoren rechnen wir uns
dort aus der Dreiecksmatrix zurück.`]})]}),`
`,e.jsxs(b,{kind:"Beispiel",label:"8.1.15 (QR-Iteration an der Beispielmatrix)",id:"env-qr-iteration-an-der-beispielmatrix",children:[e.jsxs(i.p,{children:["Wir nehmen wieder ",e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 5 & -2 \\\\ -2 & 8 \\end{smallmatrix}\\bigr)"}),`
und rechnen den ersten Schritt von Hand. Gram-Schmidt auf den Spalten
`,e.jsx(n,{children:"\\ba_1 = (5, -2)^\\top"})," und ",e.jsx(n,{children:"\\ba_2 = (-2, 8)^\\top"})," liefert"]}),e.jsx(t,{children:`r_{11} = \\left\\|\\ba_1\\right\\| = \\sqrt{29} , \\qquad
\\bq_1 = \\tfrac{1}{\\sqrt{29}}\\begin{pmatrix} 5 \\\\ -2 \\end{pmatrix} , \\qquad
r_{12} = \\bq_1^\\top\\ba_2 = \\frac{-10 - 16}{\\sqrt{29}} = \\frac{-26}{\\sqrt{29}} ,`}),e.jsxs(i.p,{children:[`und nach Abzug der Projektion bleibt
`,e.jsx(n,{children:"\\bw = \\ba_2 - r_{12}\\bq_1 = \\tfrac{36}{29}(2, 5)^\\top"}),` mit
`,e.jsx(n,{children:"r_{22} = \\left\\|\\bw\\right\\| = 36/\\sqrt{29}"}),". Zusammen also"]}),e.jsx(t,{children:`\\bQ^{(1)} = \\frac{1}{\\sqrt{29}}\\begin{pmatrix} 5 & 2 \\\\ -2 & 5 \\end{pmatrix} ,
\\qquad
\\bR^{(1)} = \\frac{1}{\\sqrt{29}}\\begin{pmatrix} 29 & -26 \\\\ 0 & 36 \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Eine schnelle Probe: ",e.jsx(n,{children:"r_{11} r_{22} = \\sqrt{29} \\cdot 36/\\sqrt{29} = 36 = \\det(\\bA)"}),`.
Nun die Vertauschung:`]}),e.jsx(t,{children:`\\cblue{\\bA^{(1)}} = \\bR^{(1)}\\bQ^{(1)}
= \\frac{1}{29}\\begin{pmatrix} 29 & -26 \\\\ 0 & 36 \\end{pmatrix}
\\begin{pmatrix} 5 & 2 \\\\ -2 & 5 \\end{pmatrix}
= \\frac{1}{29}\\begin{pmatrix} 197 & -72 \\\\ -72 & 180 \\end{pmatrix}
\\approx \\begin{pmatrix} 6{,}793 & -2{,}483 \\\\ -2{,}483 & 6{,}207 \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Spur und Determinante sind unverändert ",e.jsx(n,{children:"13"})," und ",e.jsx(n,{children:"36"}),": ",e.jsx(i.a,{href:"#env-die-iterierten-sind-aehnlich-zu-a",children:"Satz 8.1.11"}),` macht
`,e.jsx(n,{children:"\\cblue{\\bA^{(1)}}"})," ähnlich zu ",e.jsx(n,{children:"\\bA"}),", und ",e.jsx(i.a,{href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"}),`(1) hält beide Größen unter
Ähnlichkeit fest. Weiter iteriert ergibt sich (die Matrizen bleiben symmetrisch, also
genügen drei Zahlen pro Zeile):`]}),e.jsx(t,{children:`\\begin{array}{c|c|c|c|c}
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
nähert sich `,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|} = \\corange{0{,}444}"}),` an, derselben
Rate wie bei der Potenzmethode; im ersten Schritt wächst er sogar noch, die
Rate ist eben eine asymptotische Aussage. Das aufgesammelte Produkt
`,e.jsx(n,{children:"\\bQ_9"})," hat die Spalten ",e.jsx(n,{children:"(0{,}448;\\ -0{,}894)^\\top"}),` und
`,e.jsx(n,{children:"(0{,}894;\\ 0{,}448)^\\top"}),", also ",e.jsx(n,{children:"-\\cgreen{\\bv_1}"})," und ",e.jsx(n,{children:"\\bv_2"}),` bis auf
Rundung. Ein Vergleich mit `,e.jsx(i.a,{href:"#env-diagonalisierung-durch-eine",children:"Beispiel 8.1.8"}),` lohnt sich: Dort haben wir dieselbe
Diagonalisierung in einem Schritt hingeschrieben, weil wir die Eigenvektoren
schon kannten. Die QR-Iteration findet sie selbst.`]})]}),`
`,e.jsxs(T,{title:"Die QR-Iteration zum Durchklicken",children:[e.jsxs(i.p,{children:["Links stehen die Einträge von ",e.jsx(n,{children:"\\bA^{(k)}"}),`, dazu die Faktoren des letzten
Schritts und das
aufgesammelte Produkt `,e.jsx(n,{children:"\\bQ_k"}),`; rechts fällt der Betrag der Nebendiagonalen auf
logarithmischer Skala, wo lineare Konvergenz als Gerade erscheint. Neben der
Beispielmatrix lohnen sich zwei weitere Eingaben: die unsymmetrische Matrix
`,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix} 2 & 3 \\\\ 1 & 4 \\end{smallmatrix}\\bigr)"}),`, bei der der
Grenzwert dreieckig und nicht diagonal ist, und die Drehung aus
`,e.jsx(i.a,{href:"#env-wogegen-die-qr-iteration-konvergiert",children:"Bemerkung 8.1.14"}),", bei der gar nichts passiert."]}),e.jsx(zn,{})]}),`
`,e.jsx(i.h3,{children:"Kondition und Aufwand"}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.1.16 (Kondition von Eigenwertproblemen)",id:"env-kondition-von-eigenwertproblemen",children:[e.jsxs(i.p,{children:["Wie ",e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"gut konditioniert"}),` ein Eigenwertproblem ist, hängt
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
`]}),e.jsxs(i.p,{children:[`Das passt zu dem, was wir an beiden Verfahren gesehen haben: Die Rate
`,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"})," geht gegen ",e.jsx(n,{children:"1"}),`, sobald sich die Eigenwerte
nähern. Schlechte Kondition und langsame Konvergenz haben hier dieselbe
Ursache.`]})]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.1.17 (Aufwand)",id:"env-eigenwerte-aufwand",children:[e.jsxs(i.p,{children:[`Der praktische QR-Eigenwertalgorithmus reduziert eine volle Matrix einmalig in
`,e.jsx(n,{children:"O(n^3)"})," auf Hessenbergform. Danach kostet ein QR-Sweep ",e.jsx(n,{children:"O(n^2)"}),`; bei einer
symmetrischen Matrix reduziert man zunächst auf Tridiagonalform, sodass ein
impliziter Sweep sogar `,e.jsx(n,{children:"O(n)"}),` kostet. Wie viele Sweeps nötig sind, hängt von
Shifts, Deflation und Eigenwertverteilung ab. Ein Schritt der
Potenzmethode ist mit einem Matrix-Vektor-Produkt dagegen konkurrenzlos
billig, liefert aber eben auch nur einen Eigenwert.`]}),e.jsxs(i.p,{children:[`Was sich mit der Potenzmethode allein alles anstellen lässt, sehen wir in
`,e.jsx(i.a,{href:"#sec-8.2",children:"Abschnitt 8.2"}),` am PageRank-Algorithmus; für große dünnbesetzte Matrizen
kommt dort auch die Lanczos-Iteration aus
`,e.jsx(i.a,{href:"#env-welche-zielgestalt-welches-verfahren",children:"Bemerkung 8.1.9"})," wieder vor."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(N,{children:[e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bx^{(0)} = c\\,\\bv_1"})," mit ",e.jsx(n,{children:"c \\neq 0"})," versagt die Potenzmethode."]}),e.jsxs(i.p,{children:[`Im Gegenteil, das ist der bequemste aller Startvektoren: Er hat
`,e.jsx(n,{children:"c_1 = c \\neq 0"}),`, und die Iteration ist bereits im ersten Schritt am Ziel, denn
`,e.jsx(n,{children:"\\bA\\bv_1 = \\lambda_1\\bv_1"})," ändert die Richtung nicht."]})]}),e.jsxs(z,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bx^{(0)} = c\\,\\bv_2"})," mit ",e.jsx(n,{children:"c \\neq 0"})," versagt die Potenzmethode."]}),e.jsxs(i.p,{children:["Hier ist ",e.jsx(n,{children:"c_1 = 0"}),", in ",e.jsx(i.a,{href:"#eq-eq-8-1-1",children:"(8.1.1)"})," fehlt also der Term mit ",e.jsx(n,{children:"\\bv_1"}),`. Bei
symmetrischem `,e.jsx(n,{children:"\\bA"}),` heißt das anschaulich: Der Startvektor steht senkrecht auf
dem gesuchten Eigenvektor. Die Iterierte bleibt in Richtung `,e.jsx(n,{children:"\\bv_2"}),` stehen und
die Schätzung liefert `,e.jsx(n,{children:"\\lambda_2"})," statt ",e.jsx(n,{children:"\\lambda_1"})," (",e.jsx(i.a,{href:"#env-wann-die-potenzmethode-versagt",children:"Bemerkung 8.1.6"}),")."]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bx^{(0)} = c\\,(\\bv_1 + \\bv_2)"})," mit ",e.jsx(n,{children:"c \\neq 0"})," versagt die Potenzmethode."]}),e.jsxs(i.p,{children:["Dieser Start hat ",e.jsx(n,{children:"c_1 = c \\neq 0"}),", damit ist die Voraussetzung von ",e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),`
erfüllt. Die Methode konvergiert mit der üblichen Rate
`,e.jsx(n,{children:"|\\lambda_2/\\lambda_1|"}),"."]})]}),e.jsxs(z,{wahr:!0,children:[e.jsx(i.p,{children:"Ähnliche Matrizen haben dasselbe charakteristische Polynom."}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"}),`(1), bewiesen über
`,e.jsx(n,{children:"\\det(\\bQ(\\bA - \\lambda\\bI)\\bQ^{-1}) = \\det(\\bA - \\lambda\\bI)"}),`. Daraus folgen
gleiche Eigenwerte samt Vielfachheiten und damit auch gleiche Spur und
Determinante. Die Eigen`,e.jsx(i.em,{children:"vektoren"}),` sind dagegen verschieden, sie gehen über
`,e.jsx(n,{children:"\\bx = \\bQ^{-1}\\by"})," auseinander hervor."]})]}),e.jsxs(z,{wahr:!1,children:[e.jsx(i.p,{children:`Die QR-Iteration konvergiert für jede reelle Matrix gegen eine obere
Dreiecksmatrix.`}),e.jsxs(i.p,{children:["Die Drehung um ",e.jsx(n,{children:"90^\\circ"})," ist ein Gegenbeispiel: Dort ist ",e.jsx(n,{children:"\\bQ^{(1)} = \\bA"}),`
und `,e.jsx(n,{children:"\\bR^{(1)} = \\bI"}),", die Iteration bleibt also für immer bei ",e.jsx(n,{children:"\\bA"}),` stehen
(`,e.jsx(i.a,{href:"#env-wogegen-die-qr-iteration-konvergiert",children:"Bemerkung 8.1.14"}),"). Ihre Eigenwerte ",e.jsx(n,{children:"\\pm i"}),` sind komplex und betragsgleich. Für
die Konvergenz gegen die Schur-Form brauchen wir reelle, betragsmäßig
getrennte Eigenwerte.`]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Schritt der Potenzmethode kostet ",e.jsx(n,{children:"O(n^3)"})," Operationen."]}),e.jsxs(i.p,{children:[`Ein Schritt besteht aus einem Matrix-Vektor-Produkt und einer Normierung, das
sind `,e.jsx(n,{children:"O(n^2)"}),` Operationen für eine volle Matrix und noch weniger für eine
dünnbesetzte. `,e.jsx(n,{children:"O(n^3)"}),` kostet dagegen jede einzelne QR-Iteration, weil dort in
jedem Schritt eine ganze Matrix zerlegt wird (`,e.jsx(i.a,{href:"#env-eigenwerte-aufwand",children:"Bemerkung 8.1.17"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §4.5 zu Potenzmethode, Ähnlichkeitstransformationen und
QR-Iteration.`})})]})}function wn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(qe,{...r})}):qe(r)}const vn=[[0,0,.5,1],[.5,0,0,0],[.5,1,0,0],[0,0,.5,0]],Ie=["a","b","c","d"],Fe=[.25,.25,.25,.25],Sn=[1/3,1/6,1/3,1/6],{blau:Ve,gruen:me}=M,Pe=_,An=r=>vn.map(i=>i.reduce((s,c,h)=>s+c*r[h],0)),we=[[70,50],[230,50],[230,150],[70,150]],_n=[[0,1],[0,2],[1,2],[2,0],[2,3],[3,0]];function Dn([r,i]){const[s,c]=we[r],[h,x]=we[i],d=h-s,o=x-c,a=Math.hypot(d,o),u=d/a,v=o/a,A=22,k=s+u*A,j=c+v*A,w=h-u*A,E=x-v*A,D=(k+w)/2-v*14,p=(j+E)/2+u*14;return`M ${k} ${j} Q ${D} ${p} ${w} ${E}`}function yn(){const[r,i]=y.useState(Fe),[s,c]=y.useState(0),h=o=>{let a=r;for(let u=0;u<o;u++)a=An(a);i(a),c(s+o)},x=Math.max(...r.map((o,a)=>Math.abs(o-Sn[a]))),d=x<5e-4;return e.jsxs("div",{className:"my-2",children:[e.jsx(U,{children:"Wenden wir die Linkmatrix an und vergleichen die vier Scores nach jedem Schritt."}),e.jsxs("p",{className:"mb-2 text-sm sr-only",children:["Vier Seiten, sechs Links. Spalte ",e.jsx(n,{children:"j"})," von ",e.jsx(n,{children:"\\bA"})," hält fest, wie Seite ",e.jsx(n,{children:"j"})," ihren Score weitergibt: zu gleichen Teilen an jede Seite, auf die sie zeigt. Jede Spalte summiert sich damit zu ",e.jsx(n,{children:"1"}),", und weil die Startscores zusammen ",e.jsx(n,{children:"1"})," ergeben, bleibt diese Summe erhalten. Wir wenden ",e.jsx(n,{children:"\\bA"})," deshalb einfach an, ohne zu normieren; die Folge ",e.jsx(n,{children:"\\bx, \\bA\\bx, \\bA^2\\bx, \\dots"})," läuft dann auf den Fixvektor ",e.jsx(n,{children:"\\bx^*"})," mit ",e.jsx(n,{children:"\\bA\\bx^* = \\bx^*"})," zu, und die Kreise wachsen mit dem Score ihrer Seite. Im Grenzwert bekommen"," ",e.jsx(n,{children:"a"})," und ",e.jsx(n,{children:"c"})," doppelt so viel wie ",e.jsx(n,{children:"b"})," und ",e.jsx(n,{children:"d"}),": Auf die ersten beiden zeigen je zwei Links, auf die anderen nur einer."]}),e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsxs("svg",{width:300,height:200,className:"rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("defs",{children:e.jsx("marker",{id:"arrPR8",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:"var(--w-muted)"})})}),_n.map((o,a)=>e.jsx("path",{d:Dn(o),fill:"none",stroke:"var(--w-muted)",strokeWidth:1.5,markerEnd:"url(#arrPR8)"},a)),we.map(([o,a],u)=>{const v=10+40*r[u];return e.jsxs("g",{children:[e.jsx("circle",{cx:o,cy:a,r:v,fill:d?me:Ve,opacity:.75}),e.jsx("text",{x:o,y:a+4,fontSize:13,textAnchor:"middle",fill:"white",fontStyle:"italic",children:Ie[u]})]},u)})]}),e.jsxs("div",{className:"min-w-60 grow text-sm",children:[e.jsxs("div",{className:"mb-2 flex flex-wrap gap-2",children:[e.jsx("button",{type:"button",onClick:()=>h(1),className:"rounded border border-slate-400 bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800",children:"A anwenden"}),e.jsx("button",{type:"button",onClick:()=>h(10),className:"rounded border border-slate-400 bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800",children:"× 10"}),e.jsx("button",{type:"button",onClick:()=>{i(Fe),c(0)},className:"rounded border border-slate-400 px-3 py-1",children:"zurücksetzen"})]}),r.map((o,a)=>e.jsxs("div",{className:"my-1 flex items-center gap-2",children:[e.jsxs("span",{className:"w-20 font-mono text-xs",children:["x_",Ie[a]," = ",Pe(o)]}),e.jsx("div",{className:"h-3 grow rounded bg-slate-200 dark:bg-slate-700",children:e.jsx("div",{className:"h-3 rounded transition-all duration-300",style:{width:`${100*o}%`,background:d?me:Ve}})})]},a)),e.jsxs(X,{kind:d?"ok":"neutral",children:["Iteration ",s,d?e.jsxs(e.Fragment,{children:[":"," ",e.jsx("span",{style:{color:me,fontWeight:600},children:"Der Abstand zu x* ist unter 5 · 10⁻⁴ gefallen. Erreicht ist x* = (1/3, 1/6, 1/3, 1/6), der auf Summe 1 normierte Eigenvektor von A zum Eigenwert 1."})]}):e.jsxs(e.Fragment,{children:["; größter Abstand zu x*: ",Pe(x,4),". Er halbiert sich in jedem Schritt, und die Scores nähern sich x* nicht von einer Seite, sondern pendeln um ihre Grenzwerte."]})]})]})]})]})}const ve=[[3,1],[-3,-1],[2,.4],[-2,-.4],[1,.7],[-1,-.7],[.4,-.4],[-.4,.4]],En=ve.length,I=[[4.0457142857,1.24],[1.24,.5171428571]],ee=.5*Math.atan2(2*I[0][1],I[0][0]-I[1][1])*180/Math.PI,fe=(I[0][0]+I[1][1]+Math.hypot(I[0][0]-I[1][1],2*I[0][1]))/2,Rn=(I[0][0]+I[1][1]-Math.hypot(I[0][0]-I[1][1],2*I[0][1]))/2,Mn=360,qn=260,ie=150,re=125,Ee=33,B=r=>ie+Ee*r,Q=r=>re-Ee*r,In=r=>[Math.cos(r*Math.PI/180),Math.sin(r*Math.PI/180)],Fn=(r,i)=>{const s=r[0]*i[0]+r[1]*i[1];return[s*i[0],s*i[1]]};function Vn(){const[r,i]=y.useState(0),s=In(r),c=y.useMemo(()=>ve.reduce((d,o)=>d+(o[0]*s[0]+o[1]*s[1])**2,0)/(En-1),[r,s]),h=tn({feld:{x0:18,y0:12,w:264,h:226},welt:{x0:-4,x1:4,y0:-3.4,y1:3.4},greifPosition:()=>[s[0]*3,s[1]*3],clamp:([d,o])=>{const a=Math.hypot(d,o);return a<1e-8?[3,0]:[3*d/a,3*o/a]},onDrag:([d,o])=>i(Math.atan2(o,d)*180/Math.PI)}),x=Math.abs(Math.sin((r-ee)*Math.PI/180))<.035;return e.jsxs("div",{className:"space-y-2",children:[e.jsx(U,{children:"Ziehen wir die blaue Richtung auf dem Kreis und vergleichen wir die Länge der Projektionen."}),e.jsxs("svg",{viewBox:`0 0 ${Mn} ${qn}`,className:"max-w-full h-auto",role:"img","aria-label":`PCA-Punktwolke mit Richtung ${_(r,1)} Grad und Projektionsvarianz ${_(c,3)}.`,...h.svgProps,children:[e.jsx("rect",{x:"18",y:"12",width:"264",height:"226",fill:"var(--w-bg)",stroke:"var(--w-border)",rx:"4"}),e.jsx("line",{x1:"18",x2:"282",y1:re,y2:re,stroke:"var(--w-axis)"}),e.jsx("line",{x1:ie,x2:ie,y1:"12",y2:"238",stroke:"var(--w-axis)"}),e.jsx("circle",{cx:ie,cy:re,r:3*Ee,fill:"none",stroke:"var(--w-grid-strong)",strokeDasharray:"4 3"}),ve.map((d,o)=>{const a=Fn(d,s);return e.jsxs("g",{children:[e.jsx("line",{x1:B(d[0]),y1:Q(d[1]),x2:B(a[0]),y2:Q(a[1]),stroke:M.rot,strokeOpacity:".45"}),e.jsx("circle",{cx:B(d[0]),cy:Q(d[1]),r:"4",fill:M.grau}),e.jsx("circle",{cx:B(a[0]),cy:Q(a[1]),r:"3",fill:M.blau})]},o)}),e.jsx("line",{x1:B(-3*s[0]),y1:Q(-3*s[1]),x2:B(3*s[0]),y2:Q(3*s[1]),stroke:M.blau,strokeWidth:"2.5"}),e.jsx("line",{x1:ie,y1:re,x2:B(3*s[0]),y2:Q(3*s[1]),stroke:M.blau,strokeWidth:"3"}),e.jsx(ln,{x:B(3*s[0]),y:Q(3*s[1]),farbe:M.blau,aktiv:h.dragging==="v",...h.handleProps("v")}),e.jsx("line",{x1:B(-3*Math.cos(ee*Math.PI/180)),y1:Q(-3*Math.sin(ee*Math.PI/180)),x2:B(3*Math.cos(ee*Math.PI/180)),y2:Q(3*Math.sin(ee*Math.PI/180)),stroke:M.gruen,strokeDasharray:"5 4"}),e.jsx("text",{x:"300",y:"38",fill:"var(--w-text)",fontSize:"12",children:"Varianz"}),e.jsx("rect",{x:"302",y:"48",width:"28",height:"160",fill:"var(--w-grid)",rx:"3"}),e.jsx("rect",{x:"302",y:208-160*c/fe,width:"28",height:160*c/fe,fill:M.blau,rx:"3"}),e.jsx("text",{x:"316",y:"224",textAnchor:"middle",fill:"var(--w-text)",fontSize:"11",children:_(c,2)})]}),e.jsx(ce,{label:"Richtung θ",value:r,onChange:d=>i(d),min:-180,max:180,step:1,unit:"°",accent:M.blau}),e.jsx(X,{kind:x?"ok":"neutral",children:x?e.jsxs(e.Fragment,{children:["Bei θ = ",_(r,1),"° liegt das Maximum mit Varianz ",_(c,3),": Das ist v₁ von Σ. Die grün gestrichelte Richtung gehört zu λ₁ = ",_(fe,3),"; λ₂ = ",_(Rn,3)," gehört zur senkrechten Richtung, wie in ",O("sec:svd/motivation"),"."]}):e.jsxs(e.Fragment,{children:["Bei θ = ",_(r,1),"° beträgt die Projektionsvarianz ",_(c,3),". Drehen wir zur grün gestrichelten Richtung: Dort maximiert der Rayleigh-Quotient vᵀΣv die Varianz."]})})]})}function Be(r){const i={a:"a",code:"code",em:"em",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Warum lohnt sich der Aufwand aus ",e.jsx(i.a,{href:"#sec-8.1",children:"Abschnitt 8.1"}),`? Weil einige der
größten Rechenprobleme der Praxis Eigenwertprobleme sind, und zwar solche,
bei denen direkte Verfahren keine Chance haben. Drei Beispiele aus Suche,
Statistik und Bildverarbeitung.`]}),`
`,e.jsx(i.h3,{children:"Google PageRank"}),`
`,e.jsxs(i.p,{children:["Das Problem: eine Rangordnung für ",e.jsx(n,{children:"n \\approx 10^{10}"}),` Webseiten. Das Modell
dahinter passt in eine Zeile. Jede Seite `,e.jsx(n,{children:"i"}),` bekommt einen
Wichtigkeits-Score `,e.jsx(n,{children:"x_i"}),`, und wichtig ist, wer von wichtigen Seiten
verlinkt wird:`]}),`
`,e.jsx(t,{children:"x_i = \\sum_{j\\colon j \\to i} \\frac{x_j}{d_j} ,"}),`
`,e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"j \\to i"})," bedeutet, dass Seite ",e.jsx(n,{children:"j"})," auf Seite ",e.jsx(n,{children:"i"})," verlinkt, und ",e.jsx(n,{children:"d_j"}),`
die Anzahl der ausgehenden Links von `,e.jsx(n,{children:"j"}),` ist: Jede Seite vererbt ihren
Score gleichmäßig an alle Seiten, auf die sie zeigt. In Matrixform, mit
`,e.jsx(n,{children:"\\bA = \\bigl[\\tfrac{I(j \\to i)}{d_j}\\bigr]_{i,j}"}),", heißt das"]}),`
`,e.jsx(t,{children:"\\bx = \\bA\\bx ,"}),`
`,e.jsxs(i.p,{children:["ein ",e.jsx(l,{id:"eigenvalue-eigenvector",children:"Eigenwertproblem"})," zum Eigenwert ",e.jsx(n,{children:"1"}),"."]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.2.1 (Warum ausgerechnet der Eigenwert 1?)",id:"env-warum-ausgerechnet-der-eigenwert-1",children:[e.jsxs(i.p,{children:[`Hat jede Seite mindestens einen ausgehenden Link, so summiert sich jede
Spalte von `,e.jsx(n,{children:"\\bA"})," zu ",e.jsx(n,{children:"1"}),`: Eine Seite verteilt ihren ganzen Score und behält
nichts zurück. Solche Matrizen heißen `,e.jsx(i.em,{children:"spaltenstochastisch"}),", und für sie ist ",e.jsx(n,{children:"1"}),` der
betragsgrößte Eigenwert; der zugehörige Eigenvektor lässt sich nichtnegativ
wählen und taugt damit überhaupt erst als Score-Verteilung.`]}),e.jsxs(i.p,{children:["Für die ",e.jsx(i.a,{href:"#sec-8.1",children:"Potenzmethode"})," reicht das noch nicht ganz: ",e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),`
verlangt einen `,e.jsx(i.em,{children:"einsamen"}),` betragsgrößten Eigenwert, und daran hakt es beim
rohen Web-Graphen zweimal. Seiten ohne ausgehende Links liefern gar keine
Spaltensumme `,e.jsx(n,{children:"1"}),`, und zerfällt das Netz in mehrere Teile, so gehören zu
jedem Teil eigene Eigenvektoren zum Eigenwert `,e.jsx(n,{children:"1"}),`. Beides lässt sich
reparieren. Leere Spalten füllen wir gleichverteilt auf: Wer nirgendwohin
verlinkt, gibt seinen Score eben an alle weiter. Und gegen die restlichen
Eigenwerte vom Betrag `,e.jsx(n,{children:"1"})," hilft ein ",e.jsx(i.em,{children:"Dämpfungsfaktor"})," ",e.jsx(n,{children:"\\alpha"}),` mit
`,e.jsx(n,{children:"0 < \\alpha < 1"}),`, mit dem wir zu
`,e.jsx(n,{children:"\\alpha\\bA + \\tfrac{1-\\alpha}{n}\\bE"})," übergehen, wobei ",e.jsx(n,{children:"\\bE"}),` nur Einsen
enthält. Der Surfer springt damit mit Wahrscheinlichkeit `,e.jsx(n,{children:"1-\\alpha"}),` auf eine
zufällige Seite statt einem Link zu folgen. Die neue Matrix ist strikt
positiv, ihr Eigenwert `,e.jsx(n,{children:"1"}),` ist einfach, und alle übrigen Eigenwerte liegen
betragsmäßig bei höchstens `,e.jsx(n,{children:"\\alpha"}),`. Erst damit ist der PageRank-Vektor der
dominante Eigenvektor, nach dem die Potenzmethode sucht, und die Rate aus
`,e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"})," ist durch ",e.jsx(n,{children:"\\corange{\\alpha}"})," gedeckelt."]})]}),`
`,e.jsx(q,{title:"Woher der Eigenwert 1 kommt",children:e.jsxs(i.p,{children:[`Beide Aussagen folgen aus zwei Beobachtungen, die wir schon kennen.
Erstens hat `,e.jsx(n,{children:"\\bA^\\top"})," lauter Zeilensummen ",e.jsx(n,{children:"1"}),` und hält damit den Vektor aus
lauter Einsen fest; Transponieren ändert das charakteristische Polynom
nicht, also ist `,e.jsx(n,{children:"1"})," auch Eigenwert von ",e.jsx(n,{children:"\\bA"}),`. Zweitens liegt kein Eigenwert
betragsmäßig darüber, denn die
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Spaltensummennorm"}),` ist
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_1 = 1"}),", und der ",e.jsx(l,{id:"spectral-radius",children:"Spektralradius"}),`
bleibt unter jeder submultiplikativen Norm
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),`). Dass sich der zugehörige
Eigenvektor nichtnegativ wählen lässt, liefert die Perron-Frobenius-Theorie
für nichtnegative Matrizen.`]})}),`
`,e.jsxs(i.p,{children:["Und warum iterativ? Direkte Verfahren an einer Matrix mit ",e.jsx(n,{children:"10^{10}"}),` Zeilen
sind aussichtslos. Aber `,e.jsx(n,{children:"\\bA"}),` ist extrem
`,e.jsx(l,{id:"sparse-matrix",children:"dünn besetzt"}),": Eine typische Seite hat nur etwa ",e.jsx(n,{children:"10"}),`
ausgehende Links, der Speicherbedarf ist also `,e.jsx(n,{children:"O(n)"})," statt ",e.jsx(n,{children:"O(n^2)"}),`. Die
Potenz-Iteration `,e.jsx(n,{children:"\\bx^{(k+1)} = \\bA\\bx^{(k)} / \\|\\bA\\bx^{(k)}\\|"}),` braucht
pro Schritt nur ein Matrix-Vektor-Produkt mit dieser dünnen Matrix, also
`,e.jsx(n,{children:"O(n)"})," Operationen, und der Web-Graph ist so strukturiert, dass rund ",e.jsx(n,{children:"50"}),`
Iterationen reichen. Zum klassischen Dämpfungsfaktor `,e.jsx(n,{children:"\\alpha = 0{,}85"}),` aus
`,e.jsx(i.a,{href:"#env-warum-ausgerechnet-der-eigenwert-1",children:"Bemerkung 8.2.1"}),` passt diese Zahl gut, denn
`,e.jsx(n,{children:"\\corange{0{,}85}^{50} \\approx 3 \\cdot 10^{-4}"}),". Insgesamt ",e.jsx(n,{children:"O(n)"}),` statt
`,e.jsx(n,{children:"O(n^3)"}),": Dieser Unterschied macht eine Websuche überhaupt erst möglich."]}),`
`,e.jsxs(T,{title:"PageRank auf einem Vier-Seiten-Netz",children:[e.jsx(i.p,{children:`Welche Seite erhält langfristig den größten Score? Verfolgen wir dafür die
Potenziteration auf dem kleinen Netz.`}),e.jsx(yn,{})]}),`
`,e.jsx(N,{children:e.jsxs(z,{wahr:!0,children:[e.jsx(i.p,{children:"Im PageRank-Widget bleibt die Summe der vier Scores bei jedem Schritt gleich."}),e.jsx(i.p,{children:"Die Linkmatrix ist spaltenstochastisch. Daher erhält die Iteration die Summe."})]})}),`
`,e.jsx(i.h3,{children:"Hauptkomponentenanalyse (PCA)"}),`
`,e.jsxs(i.p,{children:[`Auch die Datenanalyse rechnet ständig Eigenwerte. Gegeben ist eine
mittelwert-zentrierte Datenmatrix `,e.jsx(n,{children:"\\bX \\in \\R^{n \\times p}"})," (",e.jsx(n,{children:"n"}),`
Beobachtungen, `,e.jsx(n,{children:"p"}),` Variablen); gesucht sind die Richtungen maximaler
Varianz, um die Daten auf wenige Dimensionen zu verdichten. Die Antwort
steckt in der `,e.jsx(l,{id:"covariance-matrix",children:"Kovarianzmatrix"}),":"]}),`
`,e.jsx(t,{children:"\\bSigma = \\frac{1}{n-1}\\,\\bX^\\top\\bX \\in \\R^{p \\times p} ."}),`
`,e.jsxs(i.p,{children:["Ihre Eigenvektoren sind die ",e.jsx(i.em,{children:"Hauptrichtungen"})," oder ",e.jsx(i.em,{children:"Loading-Vektoren"}),` in
`,e.jsx(n,{children:"\\R^p"}),`; die zugehörigen Eigenwerte geben an, wie viel Varianz jede Richtung
erklärt. Die eigentlichen Hauptkomponenten-`,e.jsx(i.em,{children:"Scores"}),` der Beobachtungen sind
`,e.jsx(n,{children:"\\bX\\bv_j"}),`. In der Praxis rechnen wir noch schneller
direkt mit der `,e.jsx(i.a,{href:"?k=06-svd#sec-6.2",children:"Singulärwertzerlegung"})," von ",e.jsx(n,{children:"\\bX"}),`, ohne
`,e.jsx(n,{children:"\\bX^\\top\\bX"}),` je zu bilden (warum das auch numerisch klüger ist, haben wir
in `,e.jsx(i.a,{href:"?k=06-svd#sec-6.5",children:"Kapitel 6"})," gesehen)."]}),`
`,e.jsxs(T,{title:"PCA: Welche Richtung erklärt am meisten?",children:[e.jsx(i.p,{children:`Die Kovarianzmatrix gibt eine Formel vor. Aber wie sieht die dazugehörige
Richtung in einer Punktwolke aus? Drehen wir eine Projektion durch die Daten.`}),e.jsx(Vn,{})]}),`
`,e.jsx(N,{children:e.jsxs(ye,{loesung:4.43,toleranz:.05,children:[e.jsx(i.p,{children:`Stellen wir im PCA-Widget die blaue Richtung auf die grün gestrichelte Achse:
Wie groß ist die dort angezeigte maximale Projektionsvarianz ungefähr?`}),e.jsxs(i.p,{children:["Die Anzeige erreicht dort den ersten Eigenwert von ",e.jsx(n,{children:"\\bSigma"}),`, also ungefähr
`,e.jsx(n,{children:"4{,}43"}),". In jeder anderen Richtung ist ",e.jsx(n,{children:"\\bv^\\top\\bSigma\\bv"})," kleiner."]})]})}),`
`,e.jsx(q,{title:"Lanczos für sehr große PCA-Probleme",children:e.jsx(b,{kind:"Bemerkung",label:"8.2.2 (Warum iterativ? Die Lanczos-Abkürzung)",id:"env-warum-iterativ-die-lanczos-abkuerzung",children:e.jsxs(i.p,{children:["Moderne Anwendungen haben ",e.jsx(n,{children:"p = 10^4"})," bis ",e.jsx(n,{children:"10^6"}),` Variablen
(Gen-Expression, Bildanalyse), gebraucht werden aber fast immer nur die
`,e.jsx(n,{children:"k"})," größten Eigenwerte mit ",e.jsx(n,{children:"k \\ll p"}),`. Die
`,e.jsx(i.a,{href:"#sec-8.1",children:"Lanczos-Iteration"}),` kann genau diese approximieren. Arbeitet sie
direkt mit `,e.jsx(n,{children:"\\bX"}),`, kostet ein Matrix-Vektor-Paar
`,e.jsx(n,{children:"O(\\operatorname{nnz}(\\bX))"}),`; hinzu kommen Orthogonalisierung und eine von
Spektrallücken und Toleranz abhängige Iterationszahl. Ein pauschaler Faktor
`,e.jsx(n,{children:"p/k"})," folgt daraus nicht. Warum wir ",e.jsx(n,{children:"\\bSigma"}),` besser gar nicht erst aufstellen,
zeigt dennoch ihre Größe:
`,e.jsx(n,{children:"100\\,000^2 = 10^{10}"}),` Einträge sind in doppelter Genauigkeit rund
`,e.jsx(n,{children:"80"})," Gigabyte. In R übernimmt das zum Beispiel ",e.jsx(i.code,{children:"irlba::irlba()"}),` (iterativ)
oder `,e.jsx(i.code,{children:"irlba::svdr()"}),` (iterativ und probabilistisch, ein Vorgeschmack auf
`,e.jsx(i.a,{href:"#sec-8.4",children:"Abschnitt 8.4"}),")."]})})}),`
`,e.jsx(i.h3,{children:"Approximative SVD in der Praxis"}),`
`,e.jsxs(i.p,{children:[`Wie groß der Unterschied ist, zeigt ein Experiment:
eine `,e.jsx(l,{id:"low-rank-approximation",children:"Rang-k-Approximation"}),` an einem
Graustufen-Foto (2500 × 3300 Pixel), einmal mit der vollen SVD und
zweimal iterativ mit `,e.jsx(i.code,{children:"irlba"}),":"]}),`
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
`,e.jsxs(i.p,{children:["Die vollständige SVD berechnet alle ",e.jsx(n,{children:"2500"})," Singulärwerte, obwohl nur ",e.jsx(n,{children:"50"}),`
gebraucht werden. `,e.jsx(i.code,{children:"irlba"})," und ",e.jsx(i.code,{children:"svdr"}),` tasten die Matrix stattdessen nur über
Matrix-Vektor-Produkte ab und arbeiten in einem Unterraum der Dimension
`,e.jsx(n,{children:"50"}),`; wie viel Rechenzeit das spart, misst der Vergleich oben. Und die
Qualität? Dafür stellen wir die drei Rang-50-Rekonstruktionen gegenüber:`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`r <- 50
X_r <- with(svd(X, nu = r, nv = r), u %*% diag(d[1:r]) %*% t(v))
X_irlba <- with(irlba::irlba(X, nu = r, nv = r), u %*% diag(d) %*% t(v))
X_svdr <- with(irlba::svdr(X, k = r), u %*% diag(d) %*% t(v))
norm(X - X_r, "F") / norm(X, "F")
c(norm(X_r - X_irlba, "F"), norm(X_r - X_svdr, "F")) / norm(X_r, "F")
`})}),`
`,e.jsxs(i.p,{children:[`Die beiden Zeilen messen Verschiedenes. Die erste ist der relative
Frobenius-Fehler der exakten Rang-50-Approximation, also genau die Größe,
die der `,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Satz von Eckart und Young"}),` minimiert. Die
zweite hält die beiden iterativen Rekonstruktionen gegen eben diese exakte
Lösung. Fällt sie deutlich kleiner aus als die erste, kostet die Abkürzung
nichts, was neben dem Approximationsfehler ins Gewicht fiele. Genau das ist
zu erwarten: `,e.jsx(i.code,{children:"irlba"}),` rechnet dieselbe Rang-50-Zerlegung bis auf eine
einstellbare Toleranz aus, während `,e.jsx(i.code,{children:"svdr"}),` bewusst etwas Genauigkeit gegen
Tempo tauscht. Zum Selbst-Ausprobieren: das
`,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Rang-k-Widget in Kapitel 6"}),` und die
`,e.jsx(i.a,{href:"https://fabian-s.shinyapps.io/truncatedSVD-shiny/",children:"Shiny-App zur Bildkompression"}),"."]}),`
`,e.jsx(i.h3,{children:"Die Verfahren im Vergleich"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Methode"}),e.jsx(i.th,{children:"Komplexität / Iteration"}),e.jsx(i.th,{children:"Anwendung"}),e.jsx(i.th,{children:"Output"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Potenzmethode"}),e.jsx(i.td,{children:e.jsx(n,{children:"O(\\operatorname{nnz}(\\bA))"})}),e.jsx(i.td,{children:"größter Eigenwert/-vektor"}),e.jsx(i.td,{children:"1 Eigenpaar"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"(shifted) QR"}),e.jsxs(i.td,{children:["einmalig ",e.jsx(n,{children:"O(n^3)"}),"; danach ",e.jsx(n,{children:"O(n^2)"})," je Hessenberg-Sweep"]}),e.jsx(i.td,{children:"alle Eigenwerte"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"n"})," Eigenwerte"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Lanczos"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"O(m\\operatorname{nnz}(\\bA)+nm^2)"})," für ",e.jsx(n,{children:"m"})," Schritte mit voller Reorthogonalisierung"]}),e.jsxs(i.td,{children:["wenige Extremal-Eigenwerte, ",e.jsx(i.em,{children:"sparse"})," ",e.jsx(n,{children:"\\bA"})]}),e.jsxs(i.td,{children:["bis zu ",e.jsx(n,{children:"m \\ll n"})," Eigenpaare"]})]})]})]}),`
`,e.jsxs(i.p,{children:["Dabei zählt ",e.jsx(n,{children:"\\operatorname{nnz}(\\cdot)"}),` die Nicht-Null-Einträge. Zur
Einordnung: Die `,e.jsx(i.a,{href:"#sec-8.1",children:"Potenzmethode"}),` konvergiert mit der Rate
`,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"}),`, die QR-Iteration (mit Shifts) oft
quadratisch und am stabilsten. Als Faustregeln: Für `,e.jsx(i.em,{children:"sparse"}),` Matrizen ist
Lanczos klar überlegen; wer alle Eigenwerte braucht und Speicher übrig
hat, nimmt die (shifted) QR-Iteration; für wenige Eigenpaare reichen
Potenzmethode (eines) oder Lanczos (`,e.jsx(n,{children:"m \\ll n"}),")."]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §4.5 (iterative Eigenwertverfahren: Potenzmethode,
QR-Iteration, Lanczos); zur PCA-über-SVD-Verbindung noch einmal
`,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),"."]})})]})}function Pn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Be,{...r})}):Be(r)}const{gruen:ke,blau:Qe,rot:se,orange:We}=M,ae=[[4,1],[1,3]],Ne=[1,2],F=[1/11,7/11],Bn=(7+Math.sqrt(5))/2,Qn=(7-Math.sqrt(5))/2,ne=12;function Wn(r){return[Ne[0]-(ae[0][0]*r[0]+ae[0][1]*r[1]),Ne[1]-(ae[1][0]*r[0]+ae[1][1]*r[1])]}function Nn(r){return Math.hypot(r[0]-F[0],r[1]-F[1])}function Kn(r){return Math.max(Math.abs(1-r*Bn),Math.abs(1-r*Qn))}const Gn="⁰¹²³⁴⁵⁶⁷⁸⁹";function pe(r){return String(r).split("").map(i=>Gn[Number(i)]).join("")}const V=_,G=30,Zn=16,W=288;function Ln({punkte:r,naechster:i}){const s=i?[...r,F,i]:[...r,F],c=s.map(g=>g[0]),h=s.map(g=>g[1]),x=(Math.min(...c)+Math.max(...c))/2,d=(Math.min(...h)+Math.max(...h))/2,o=Math.max(Math.max(...c)-Math.min(...c),Math.max(...h)-Math.min(...h)),a=o*1.25>8,u=a?F[0]:x,v=a?F[1]:d,A=Math.min(8,Math.max(1.1,o*1.25)),k=u-A/2,j=u+A/2,w=v-A/2,E=v+A/2,D=g=>G+(g-k)/(j-k)*W,p=g=>W-(g-w)/(E-w)*W,m=g=>g[0]>=k&&g[0]<=j&&g[1]>=w&&g[1]<=E,C=r.map(g=>`${D(g[0])},${p(g[1])}`).join(" ");return e.jsxs("div",{className:"inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:G},children:"x₂ ↑"}),e.jsxs("svg",{width:G+W+6,height:W+Zn,className:"rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:"s83-clip",children:e.jsx("rect",{x:G,y:0,width:W,height:W})}),e.jsx("marker",{id:"s83-pfeil",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:se})})]}),Re(w,E).map(g=>e.jsxs("g",{children:[e.jsx("line",{x1:G,x2:G+W,y1:p(g),y2:p(g),stroke:"var(--w-grid-strong)",strokeWidth:g===0?1.4:.6}),e.jsx("text",{x:G-4,y:p(g)+3,textAnchor:"end",fill:"var(--w-muted)",fontSize:10,children:V(g,Math.abs(g)>=1?0:1)})]},`y${g}`)),Re(k,j).map(g=>e.jsxs("g",{children:[e.jsx("line",{y1:0,y2:W,x1:D(g),x2:D(g),stroke:"var(--w-grid-strong)",strokeWidth:g===0?1.4:.6}),e.jsx("text",{x:D(g),y:W+12,textAnchor:"middle",fill:"var(--w-muted)",fontSize:10,children:V(g,Math.abs(g)>=1?0:1)})]},`x${g}`)),e.jsxs("g",{clipPath:"url(#s83-clip)",children:[r.length>1&&e.jsx("polyline",{points:C,fill:"none",stroke:Qe,strokeWidth:1.5,opacity:.75}),i&&m(r[r.length-1])&&e.jsx("line",{x1:D(r[r.length-1][0]),y1:p(r[r.length-1][1]),x2:D(i[0]),y2:p(i[1]),stroke:se,strokeWidth:2,markerEnd:"url(#s83-pfeil)"}),e.jsx("circle",{cx:D(F[0]),cy:p(F[1]),r:6,fill:"none",stroke:ke,strokeWidth:2}),e.jsx("circle",{cx:D(F[0]),cy:p(F[1]),r:2.5,fill:ke}),r.map((g,S)=>m(g)?e.jsx("circle",{cx:D(g[0]),cy:p(g[1]),r:S===r.length-1?4.5:2.5,fill:Qe,opacity:S===r.length-1?1:.55},S):null),e.jsx("text",{x:D(F[0])+9,y:p(F[1])-7,fill:ke,fontSize:11,children:"x"})]})]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:G},children:"x₁ →"})]})}function On(){const[r,i]=y.useState(.25),[s,c]=y.useState(1),{schritte:h,rho:x}=y.useMemo(()=>{const k=[];let j=[0,0];for(let w=0;w<=ne;w++){const E=Wn(j);k.push({x:j,r:E,err:Nn(j)}),j=[j[0]+r*E[0],j[1]+r*E[1]]}return{schritte:k,rho:Kn(r)}},[r]),d=h[s],o=s>0?h[s-1]:null,a=o?d.err/o.err:NaN,{series:u,markers:v,yDomain:A}=y.useMemo(()=>{const k=h[0].err,j=S=>S>0?Math.log10(S):NaN,w=S=>{const R=Math.log10(k)+S*Math.log10(x);return Number.isFinite(R)?R:NaN},D=[...h.map(S=>j(S.err)).filter(S=>Number.isFinite(S)),w(0),w(ne)].filter(S=>Number.isFinite(S)),p=Math.min(...D)-.4,m=Math.max(...D)+.4,C=h.slice(0,s+1).map((S,R)=>({x:R,y:j(S.err),color:se})).filter(S=>Number.isFinite(S.y));return{series:[{f:w,color:We,dash:[7,4]}],markers:C,yDomain:[p,m]}},[h,x,s]);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(U,{children:"Wählen wir eine Schrittweite, schätzen die Kippgrenze und verfolgen dann die Fehlerkurve."}),e.jsx(ce,{label:"γ (Schrittweite)",value:r,onChange:k=>i(Math.round(k*200)/200),min:.05,max:.55,step:.005,fmt:k=>V(k,3)}),e.jsx(_e,{step:s,setStep:c,max:ne,narration:"Ein Schritt wendet die aktuelle Residuumskorrektur an."}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsx(Ln,{punkte:h.slice(0,s+1).map(k=>k.x),naechster:s<ne?h[s+1].x:null}),e.jsx(De,{xLabel:"k",yLabel:"log₁₀ ‖x⁽ᵏ⁾ − x‖",series:u,markers:v,xDomain:[0,ne],yDomain:A,width:300,height:288})]}),e.jsxs("div",{className:"max-w-prose space-y-1 text-sm",children:[e.jsxs("p",{children:[e.jsxs("span",{className:"font-mono",children:["x⁽",pe(s),"⁾ = (",V(d.x[0],4),"; ",V(d.x[1],4),")"]}),", Residuum"," ",e.jsxs("span",{className:"font-mono",style:{color:se},children:["r⁽",pe(s),"⁾ = (",V(d.r[0],4),"; ",V(d.r[1],4),")"]})]}),e.jsxs("p",{children:["Fehler"," ",e.jsxs("span",{className:"font-mono",style:{color:se},children:["‖x⁽",pe(s),"⁾ − x‖ = ",V(d.err,4)]}),", Verhältnis zum Vorschritt"," ",e.jsx("span",{className:"font-mono",children:V(a,3)}),", Vorhersage"," ",e.jsxs("span",{className:"font-mono",style:{color:We},children:["ρ = ",V(x,3)]})]}),e.jsx(X,{kind:x<.999?"ok":x<=1.001?"warn":"fail",children:x<.999?`ρ < 1: ${O("satz:konvergenz-der-korrekturiteration")} greift, und der Fehler fällt auf Dauer je Schritt auf etwa das ${V(x,2)}-fache.`:x<=1.001?"ρ ≈ 1: der Grenzfall. Die Schranke des Satzes verspricht nichts mehr, die Iterierten kommen kaum noch voran.":`ρ > 1: die Voraussetzung von ${O("satz:konvergenz-der-korrekturiteration")} ist verletzt, und hier läuft die Iteration tatsächlich davon (auf Dauer das ${V(x,2)}-fache je Schritt).`})]})]})}function Ke(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Für ",e.jsx(l,{id:"linear-system",children:"lineare Gleichungssysteme"})," ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),` und für
Kleinste-Quadrate-Probleme kennen wir bisher nur `,e.jsx(i.em,{children:"direkte"}),` Verfahren. Die
LU-Zerlegung aus `,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),` und die QR-Zerlegung aus
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),` zerlegen die Matrix einmal vollständig und
liefern danach die Lösung bis auf Rundungsfehler exakt. Der Preis steht dabei
von vornherein fest, nämlich eine Operationszahl der Größenordnung `,e.jsx(n,{children:"n^3"}),`, ganz
unabhängig davon, wie genau wir die Lösung überhaupt brauchen.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Iterative Verfahren"}),` drehen dieses Verhältnis um. Sie erzeugen eine Folge von
Näherungen `,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}, \\cblue{\\bx^{(1)}}, \\cblue{\\bx^{(2)}}, \\dots"}),`, die
gegen die Lösung `,e.jsx(n,{children:"\\cgreen{\\bx}"}),` strebt, und wir hören auf, sobald uns die
erreichte Genauigkeit genügt. Fast alle folgen dabei demselben Bauplan, einer
`,e.jsx(l,{id:"fixed-point-iteration",children:e.jsx(i.em,{children:"Fixpunktiteration"})}),` (fixed point iteration): Eine
Vorschrift wird immer wieder auf ihr eigenes Ergebnis angewendet, und die
gesuchte Lösung ist gerade der Punkt, den diese Vorschrift nicht mehr bewegt.
Bei großen oder `,e.jsx(l,{id:"sparse-matrix",children:"dünnbesetzten"}),` Matrizen lohnt sich dieser
Handel fast immer: etwas Genauigkeit gegen viel Rechenzeit.`]}),`
`,e.jsx(i.h3,{children:"Residuum und Korrekturschritt"}),`
`,e.jsxs(i.p,{children:[`Wie nähern wir uns der Lösung überhaupt schrittweise an? Dazu brauchen wir
zuerst ein Maß dafür, wie gut eine Näherung ist. Die Lösung `,e.jsx(n,{children:"\\cgreen{\\bx}"}),`
kennen wir ja nicht, sonst wären wir fertig; einsetzen können wir aber immer.`]}),`
`,e.jsxs(b,{kind:"Definition",label:"8.3.1 (Residuum)",id:"env-residuum",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),", ",e.jsx(n,{children:"\\bb \\in \\R^n"})," und ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}} \\in \\R^n"}),`
eine Näherung der Lösung von `,e.jsx(n,{children:"\\bA\\bx = \\bb"}),". Der Vektor"]}),e.jsx(t,{children:"\\cred{\\br^{(k)}} = \\bb - \\bA\\,\\cblue{\\bx^{(k)}}"}),e.jsxs(i.p,{children:["heißt ",e.jsx(i.em,{children:"Residuum"})," (residual) von ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Das Residuum misst, wie weit die Näherung davon entfernt ist, die Gleichung zu
erfüllen. Ist `,e.jsx(n,{children:"\\cred{\\br^{(k)}} = \\bnull"}),`, so gilt
`,e.jsx(n,{children:"\\bA\\cblue{\\bx^{(k)}} = \\bb"}),`, und wir haben die Lösung gefunden. Solange das
Residuum nicht verschwindet, korrigieren wir unsere Schätzung:`]}),`
`,e.jsx(t,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\underbrace{\\bC\\,\\cred{\\br^{(k)}}}_{\\text{Korrekturschritt}} ."}),`
`,e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bC \\in \\R^{n \\times n}"}),` entscheidet, wie stark und in welche
Richtung wir korrigieren. Sie ist der einzige Entwurfsspielraum des Verfahrens,
und wir werden ihn weiter unten ausnutzen.`]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.3.2 (Verwandtschaft mit dem Gradientenabstieg)",id:"env-verwandtschaft-mit-dem-gradientenabstieg",children:[e.jsxs(i.p,{children:["Für den einfachsten Fall ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"}),` lautet der Schritt
`,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\gamma\\,\\cred{\\br^{(k)}}"}),`, wir gehen
also ein Stück in Richtung des Residuums. Das ist wörtlich ein
`,e.jsx(l,{id:"gradient-descent",children:"Gradientenabstieg"})," mit Schrittweite ",e.jsx(n,{children:"\\gamma"}),": Ist ",e.jsx(n,{children:"\\bA"}),`
`,e.jsx(l,{id:"symmetric-matrix",children:"symmetrisch"})," und ",e.jsx(l,{id:"positive-definite",children:"positiv definit"}),`,
so hat die `,e.jsx(l,{id:"quadratic-form",children:"quadratische Form"})]}),e.jsx(t,{children:"f(\\bx) = \\tfrac{1}{2}\\bx^\\top\\bA\\bx - \\bb^\\top\\bx"}),e.jsxs(i.p,{children:["den ",e.jsx(l,{id:"gradient",children:"Gradienten"})," ",e.jsx(n,{children:"\\nabla f(\\bx) = \\bA\\bx - \\bb = -\\cred{\\br}"}),`, und
ihr Minimum liegt genau bei `,e.jsx(n,{children:"\\bA\\bx = \\bb"}),`. Das Residuum zeigt also in Richtung
des steilsten Abstiegs, und `,e.jsx(n,{children:"\\gamma"}),` ist die Schrittweite. Wie beim
Gradientenabstieg gilt: zu kleine Schritte kriechen, zu große schießen über das
Ziel hinaus.`]})]}),`
`,e.jsxs(i.p,{children:[`Warum sollten wir uns überhaupt mit Näherungen zufriedengeben, wo doch
`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Kapitel 5"}),` ein exaktes Verfahren bereithält? Weil ein
Iterationsschritt viel billiger ist als eine ganze Zerlegung. Für sehr große und
für dünnbesetzte Systeme, wie sie in der Statistik etwa bei Netzwerkdaten oder
Glättungsproblemen auftreten, sind iterative Verfahren deshalb oft um
Größenordnungen schneller.`]}),`
`,e.jsx(i.h3,{children:"Die Iteration und ihr Konvergenzsatz"}),`
`,e.jsx(i.p,{children:"Halten wir die Vorschrift fest, diesmal mit Laufindex."}),`
`,e.jsxs(b,{kind:"Definition",label:"8.3.3 (Korrekturiteration)",id:"env-korrekturiteration",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),", ",e.jsx(n,{children:"\\bb \\in \\R^n"})," und ",e.jsx(n,{children:"\\bx"}),` die Lösung von
`,e.jsx(n,{children:"\\bA\\bx = \\bb"}),". Für einen beliebigen Startwert ",e.jsx(n,{children:"\\cblue{\\bx^{(0)}} \\in \\R^n"}),` und
eine Matrix `,e.jsx(n,{children:"\\bC \\in \\R^{n \\times n}"})," heißt"]}),e.jsx(P,{tag:"8.3.1",id:"eq-korrekturiteration",children:`\\cblue{\\bx^{(k)}} = \\cblue{\\bx^{(k-1)}} + \\bC\\bigl(\\bb - \\bA\\,\\cblue{\\bx^{(k-1)}}\\bigr) ,
\\qquad k = 1, 2, \\dots`}),e.jsxs(i.p,{children:["die von ",e.jsx(n,{children:"\\bC"})," erzeugte ",e.jsx(i.em,{children:"Korrekturiteration"}),"."]})]}),`
`,e.jsx(i.p,{children:"Multiplizieren wir die Klammer aus, so zeigt sich die Fixpunktstruktur."}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.3.4 (Fixpunktform)",id:"env-fixpunktform",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bB = \\bI_n - \\bC\\bA"})," ist ",e.jsx(i.a,{href:"#eq-korrekturiteration",children:"(8.3.1)"})," gleichwertig zu"]}),e.jsx(P,{tag:"8.3.2",id:"eq-fixpunktform",children:`\\cblue{\\bx^{(k)}} = \\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb ,
\\qquad k = 1, 2, \\dots`}),e.jsxs(i.p,{children:[`Jeder Schritt besteht also aus einer festen affinen Abbildung, angewandt auf das
Ergebnis des vorigen Schritts. Die Matrix `,e.jsx(n,{children:"\\bB"})," heißt ",e.jsx(i.em,{children:"Iterationsmatrix"}),`; sie
allein entscheidet, ob die Folge zusammenläuft.`]})]}),`
`,e.jsxs(i.p,{children:["Und tatsächlich braucht es nur eine Bedingung an ",e.jsx(n,{children:"\\bB"}),", damit alles funktioniert."]}),`
`,e.jsxs(b,{kind:"Satz",label:"8.3.5 (Konvergenz der Korrekturiteration)",id:"env-konvergenz-der-korrekturiteration",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cgreen{\\bx}"})," die eindeutige Lösung von ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),`. Gilt für die
`,e.jsx(l,{id:"matrix-norm",children:"Spektralnorm"})]}),e.jsx(t,{children:"\\corange{\\rho} := \\left\\|\\bI_n - \\bC\\bA\\right\\|_2 < 1 ,"}),e.jsxs(i.p,{children:["so folgt für alle ",e.jsx(n,{children:"k \\ge 1"})]}),e.jsx(P,{tag:"8.3.3",id:"eq-konvergenz-der-korrekturiteration",children:`\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\corange{\\rho}^{\\,k} \\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx}\\right\\|_2 .`}),e.jsxs(i.p,{children:["Insbesondere ist ",e.jsx(n,{children:"\\lim_{k \\to \\infty} \\cblue{\\bx^{(k)}} = \\cgreen{\\bx}"}),`, und
zwar für jeden Startwert.`]})]}),`
`,e.jsxs(i.p,{children:["Zur Notation: Das ",e.jsx(n,{children:"\\corange{\\rho}"})," hier ist die ",e.jsx(i.em,{children:"Konvergenzrate"}),` der
Iteration; mit dem Rayleigh-Quotienten `,e.jsx(n,{children:"\\cblue{\\rho^{(k)}}"}),` aus
`,e.jsx(i.a,{href:"#sec-8.1",children:"Abschnitt 8.1"})," hat es nur den Buchstaben gemeinsam."]}),`
`,e.jsx(q,{title:"Beweis des Konvergenzsatzes",children:e.jsxs(K,{children:[e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["Ausmultiplizieren von ",e.jsx(i.a,{href:"#eq-korrekturiteration",children:"(8.3.1)"}),": ",e.jsx(n,{children:"\\bx + \\bC(\\bb - \\bA\\bx) = (\\bI_n - \\bC\\bA)\\bx + \\bC\\bb"})]}),children:[e.jsxs(i.p,{children:["Wir schreiben ",e.jsx(n,{children:"\\bB = \\bI_n - \\bC\\bA"}),`, also
`,e.jsx(n,{children:"\\left\\|\\bB\\right\\|_2 = \\corange{\\rho}"}),`, und bringen die Iteration nach
`,e.jsx(i.a,{href:"#eq-fixpunktform",children:"(8.3.2)"})," in die Form"]}),e.jsx(t,{children:"\\cblue{\\bx^{(k)}} = \\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb , \\qquad k = 1, 2, \\dots"})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{\\bx}"})," löst ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),", die Klammer ist also der Nullvektor"]}),children:[e.jsxs(i.p,{children:["Die Lösung ",e.jsx(n,{children:"\\cgreen{\\bx}"})," ist ein ",e.jsx(i.em,{children:"Fixpunkt"})," dieser Abbildung:"]}),e.jsx(t,{children:`\\bB\\,\\cgreen{\\bx} + \\bC\\bb
= (\\bI_n - \\bC\\bA)\\,\\cgreen{\\bx} + \\bC\\bb
= \\cgreen{\\bx} - \\bC\\underbrace{(\\bA\\,\\cgreen{\\bx} - \\bb)}_{=\\,\\bnull}
= \\cgreen{\\bx} .`})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["in Zeile 2 ersetzen wir ",e.jsx(n,{children:"\\cgreen{\\bx}"})," durch ",e.jsx(n,{children:"\\bB\\cgreen{\\bx} + \\bC\\bb"})," (Schritt 2), die Terme ",e.jsx(n,{children:"\\bC\\bb"})," heben sich weg; in der letzten Zeile nutzen wir die definierende Eigenschaft der Operatornorm, ",e.jsx(n,{children:"\\left\\|\\bB\\bv\\right\\|_2 \\le \\left\\|\\bB\\right\\|_2\\left\\|\\bv\\right\\|_2"})]}),children:[e.jsx(i.p,{children:`Damit lässt sich der Fehler nach einem Schritt abschätzen. Wir ziehen die
Fixpunktgleichung von der Iterationsvorschrift ab:`}),e.jsx(t,{children:`\\begin{aligned}
\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2
&= \\left\\|\\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb - \\cgreen{\\bx}\\right\\|_2 \\\\
&= \\left\\|\\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb - \\bigl(\\bB\\,\\cgreen{\\bx} + \\bC\\bb\\bigr)\\right\\|_2 \\\\
&= \\left\\|\\bB\\bigl(\\cblue{\\bx^{(k-1)}} - \\cgreen{\\bx}\\bigr)\\right\\|_2 \\\\
&\\le \\corange{\\rho} \\left\\|\\cblue{\\bx^{(k-1)}} - \\cgreen{\\bx}\\right\\|_2 .
\\end{aligned}`})]}),e.jsxs(f,{children:[e.jsxs(i.p,{children:[`Jeder Schritt drückt den Fehler also auf höchstens das
`,e.jsx(n,{children:"\\corange{\\rho}"}),"-fache. Iterieren wir die Ungleichung, so erhalten wir"]}),e.jsx(t,{children:`\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\corange{\\rho} \\left\\|\\cblue{\\bx^{(k-1)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\corange{\\rho}^{\\,2} \\left\\|\\cblue{\\bx^{(k-2)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\cdots
\\le \\corange{\\rho}^{\\,k} \\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx}\\right\\|_2 ,`}),e.jsxs(i.p,{children:["und wegen ",e.jsx(n,{children:"\\corange{\\rho} < 1"})," geht die rechte Seite gegen null."]}),e.jsxs(i.p,{children:["::why[formal eine Induktion über ",e.jsx(n,{children:"k"}),": Schritt 3 liefert den Induktionsschritt, der Fall ",e.jsx(n,{children:"k = 1"})," ist genau Schritt 3 selbst; ",e.jsx(n,{children:"\\corange{\\rho}^{\\,k} \\to 0"})," gilt für jedes ",e.jsx(n,{children:"\\corange{\\rho} \\in [0, 1)"}),"]"]})]})]})}),`
`,e.jsxs(i.p,{children:["Die Schranke ",e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"})," beschreibt ",e.jsx(l,{id:"rate-of-convergence",children:"lineare Konvergenz"}),`:
Der Fehler schrumpft pro Schritt auf einen festen Bruchteil, nicht um eine feste
Differenz. Auf logarithmischer Skala aufgetragen bleibt er damit unterhalb einer
Geraden mit Steigung `,e.jsx(n,{children:"\\log \\corange{\\rho}"}),"."]}),`
`,e.jsxs(i.p,{children:["Die Voraussetzung des Satzes ist übrigens stärker, als sie aussieht. Wäre ",e.jsx(n,{children:"\\bA"}),`
singulär, so gäbe es ein `,e.jsx(n,{children:"\\bv \\neq \\bnull"})," mit ",e.jsx(n,{children:"\\bA\\bv = \\bnull"}),`, also
`,e.jsx(n,{children:"(\\bI_n - \\bC\\bA)\\bv = \\bv"})," und damit ",e.jsx(n,{children:"\\corange{\\rho} \\ge 1"}),`. Aus
`,e.jsx(n,{children:"\\corange{\\rho} < 1"})," folgt somit von selbst, dass ",e.jsx(n,{children:"\\bA"}),` invertierbar ist und die
Lösung eindeutig.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest: Was kostet ein Schritt?"}),`
`,e.jsxs(i.p,{children:["Bevor wir über die Wahl von ",e.jsx(n,{children:"\\bC"}),` nachdenken, zwei Fragen zum Aufwand. Zur
Erinnerung an die `,e.jsx(l,{id:"big-o-notation",children:"Landau-Notation"}),` siehe
`,e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),"."]}),`
`,e.jsxs(N,{children:[e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"})," kostet ein Iterationsschritt ",e.jsx(n,{children:"O(1)"})," Operationen."]}),e.jsxs(i.p,{children:["Schon das Ergebnis hat ",e.jsx(n,{children:"n"}),` Komponenten, und jede muss geschrieben werden. Unter
`,e.jsx(n,{children:"O(n)"})," geht es also gar nicht."]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"})," kostet ein Iterationsschritt ",e.jsx(n,{children:"O(n)"})," Operationen."]}),e.jsxs(i.p,{children:[`Das gilt nur für die billigen Teile. Der Schritt lautet ausgeschrieben
`,e.jsx(n,{children:"\\bx^{(k)} = \\bx^{(k-1)} - \\gamma\\bigl(\\bA\\bx^{(k-1)}\\bigr) + \\gamma\\bb"}),`: Das
Skalieren mit `,e.jsx(n,{children:"\\gamma"})," und die beiden Vektoradditionen kosten ",e.jsx(n,{children:"O(n)"}),`, das
`,e.jsx(l,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"})," ",e.jsx(n,{children:"\\bA\\bx^{(k-1)}"})," aber mehr."]})]}),e.jsxs(z,{wahr:!0,children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"})," kostet ein Iterationsschritt ",e.jsx(n,{children:"O(n^2)"})," Operationen."]}),e.jsxs(i.p,{children:["Der teuerste Posten ist das Matrix-Vektor-Produkt ",e.jsx(n,{children:"\\bA\\bx^{(k-1)}"}),": ",e.jsx(n,{children:"n"}),`
Komponenten mit je `,e.jsx(n,{children:"n"})," Multiplikationen und ",e.jsx(n,{children:"n-1"}),` Additionen, zusammen
`,e.jsx(n,{children:"O(n^2)"}),". Alles Übrige ist ",e.jsx(n,{children:"O(n)"}),". Ist ",e.jsx(n,{children:"\\bA"}),` dünnbesetzt, sinkt der Aufwand
sogar auf `,e.jsx(n,{children:"O(\\operatorname{nnz}(\\bA))"}),", wobei ",e.jsx(n,{children:"\\operatorname{nnz}"}),` die Zahl der
Einträge ungleich null zählt.`]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"})," kostet ein Iterationsschritt ",e.jsx(n,{children:"O(n^3)"})," Operationen."]}),e.jsxs(i.p,{children:[`So teuer würde es nur, wenn wir die Iterationsmatrix
`,e.jsx(n,{children:"\\bB = \\bI_n - \\gamma\\bA"}),` in jedem Schritt neu als Matrixprodukt aufbauten.
Das tut niemand: `,e.jsx(n,{children:"\\bB"})," wird gar nicht gebildet, wir wenden ",e.jsx(n,{children:"\\bA"}),` direkt auf den
aktuellen Vektor an. Wäre ein Schritt so teuer wie eine LU-Zerlegung, hätte das
ganze Verfahren keinen Zweck.`]})]})]}),`
`,e.jsx(i.h3,{children:"Wie viele Schritte bis zur Genauigkeit ε?"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-konvergenz-der-korrekturiteration",children:"Satz 8.3.5"}),` verspricht einen Fehler, der geometrisch fällt. Übersetzen wir das
in die Frage, die uns beim Rechnen wirklich beschäftigt: Wie oft müssen wir
iterieren, bis eine vorgegebene Toleranz `,e.jsx(n,{children:"\\eps"})," unterschritten ist?"]}),`
`,e.jsxs(N,{children:[e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\| \\le \\eps"}),` genügen
`,e.jsx(n,{children:"k = O(1)"})," Schritte."]}),e.jsxs(i.p,{children:["Eine feste Schrittzahl liefert eine feste Genauigkeit, mehr nicht. Wer ",e.jsx(n,{children:"\\eps"}),`
verkleinert, muss weiter iterieren.`]})]}),e.jsxs(z,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\| \\le \\eps"}),` genügen
`,e.jsx(n,{children:"k = O(\\log(1/\\eps))"})," Schritte."]}),e.jsxs(i.p,{children:[`Der Fehler fällt geometrisch, also braucht jede weitere Dezimalstelle
Genauigkeit gleich viele zusätzliche Schritte. Die Herleitung steht direkt im
Anschluss als `,e.jsx(i.a,{href:"#env-zahl-der-iterationen",children:"Korollar 8.3.6"}),"."]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\| \\le \\eps"}),` brauchen wir
`,e.jsx(n,{children:"k = O(1/\\eps)"})," Schritte."]}),e.jsxs(i.p,{children:["Das wäre die Schrittzahl bei einem Fehler, der nur wie ",e.jsx(n,{children:"1/k"}),` fällt. Hier fällt
er wie `,e.jsx(n,{children:"\\corange{\\rho}^{\\,k}"}),`, und das ist ungleich schneller: Für
`,e.jsx(n,{children:"\\eps = 10^{-6}"}),` stünden hier eine Million Schritte statt der 15, die für das
System aus `,e.jsx(i.a,{href:"#env-richardson-iteration",children:"Beispiel 8.3.11"})," genügen."]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\| \\le \\eps"}),` brauchen wir
`,e.jsx(n,{children:"k = O(1/\\eps^k)"})," Schritte."]}),e.jsxs(i.p,{children:["Diese Antwort kann schon formal nicht stimmen, denn das gesuchte ",e.jsx(n,{children:"k"}),` steht auf
beiden Seiten. Eine Schranke für `,e.jsx(n,{children:"k"})," darf nur von ",e.jsx(n,{children:"\\eps"}),`, von
`,e.jsx(n,{children:"\\corange{\\rho}"})," und vom Startfehler abhängen."]})]})]}),`
`,e.jsxs(i.p,{children:["Rechnen wir die Antwort nach. Sie folgt allein aus der Schranke ",e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"}),"."]}),`
`,e.jsxs(b,{kind:"Korollar",label:"8.3.6 (Zahl der Iterationen)",id:"env-zahl-der-iterationen",children:[e.jsxs(i.p,{children:["Es gelte ",e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"})," mit ",e.jsx(n,{children:"\\corange{\\rho} \\in (0, 1)"}),`, und sei
`,e.jsx(n,{children:"\\cred{e_0} = \\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx}\\right\\|_2 > 0"}),` der
Startfehler. Für `,e.jsx(n,{children:"\\eps > 0"}),` ist
`,e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2 \\le \\eps"})," garantiert, sobald"]}),e.jsx(P,{tag:"8.3.4",id:"eq-zahl-der-iterationen",children:`k \\ge \\max\\left\\{0,\\left\\lceil
\\frac{\\log(\\cred{e_0}/\\eps)}{-\\log \\corange{\\rho}}
\\right\\rceil\\right\\}.`}),e.jsxs(i.p,{children:["Insbesondere ist ",e.jsx(n,{children:"k = O(\\log(1/\\eps))"}),"."]})]}),`
`,e.jsx(q,{title:"Herleitung der exakten Iterationszahl",children:e.jsxs(K,{children:[e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"})," schätzt den Fehler nach oben ab; wer die obere Schranke unter ",e.jsx(n,{children:"\\eps"})," drückt, drückt den Fehler mit"]}),children:[e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-konvergenz-der-korrekturiteration",children:"(8.3.3)"})," genügt es, ",e.jsx(n,{children:"\\corange{\\rho}^{\\,k}\\,\\cred{e_0} \\le \\eps"}),` zu
erzwingen, also`]}),e.jsx(t,{children:"\\corange{\\rho}^{\\,k} \\le \\frac{\\eps}{\\cred{e_0}} ."})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\log"})," ist streng monoton wachsend, und ",e.jsx(n,{children:"\\log(\\eps/\\cred{e_0}) = -\\log(\\cred{e_0}/\\eps)"})]}),children:[e.jsxs(i.p,{children:["Beide Seiten sind positiv, wir dürfen also ",e.jsx(l,{id:"logarithm",children:"logarithmieren"}),`. Wegen
`,e.jsx(n,{children:"0 < \\corange{\\rho} < 1"})," ist ",e.jsx(n,{children:"\\log \\corange{\\rho} < 0"}),`, und beim Teilen durch
diese negative Zahl dreht sich das Ungleichheitszeichen um:`]}),e.jsx(t,{children:`k \\log \\corange{\\rho} \\le \\log\\frac{\\eps}{\\cred{e_0}}
\\qquad\\Longleftrightarrow\\qquad
k \\ge \\frac{\\log(\\eps/\\cred{e_0})}{\\log \\corange{\\rho}}
= \\frac{\\log(\\cred{e_0}/\\eps)}{-\\log \\corange{\\rho}} .`})]}),e.jsx(f,{why:e.jsxs(e.Fragment,{children:["in der Landau-Notation zählt allein das Wachstum in ",e.jsx(n,{children:"\\eps"}),"; ",e.jsx(n,{children:"\\cred{e_0}"})," und ",e.jsx(n,{children:"\\corange{\\rho}"})," hängen nicht von ",e.jsx(n,{children:"\\eps"})," ab"]}),children:e.jsxs(i.p,{children:["Falls ",e.jsx(n,{children:"\\eps\\ge \\cred{e_0}"}),", genügt bereits ",e.jsx(n,{children:"k=0"}),`; andernfalls ist das kleinste
ganzzahlige `,e.jsx(n,{children:"k"})," die Aufrundung. Beides zusammen ergibt ",e.jsx(i.a,{href:"#eq-zahl-der-iterationen",children:"(8.3.4)"}),`. Wegen
`,e.jsx(n,{children:"\\log(\\cred{e_0}/\\eps) = \\log \\cred{e_0} + \\log(1/\\eps)"}),` hängt die Schrittzahl
von der geforderten Genauigkeit nur über `,e.jsx(n,{children:"\\log(1/\\eps)"}),` ab; der Startfehler und
der Faktor `,e.jsx(n,{children:"1/(-\\log \\corange{\\rho})"}),` sind Konstanten. Damit ist
`,e.jsx(n,{children:"k = O(\\log(1/\\eps))"}),"."]})})]})}),`
`,e.jsxs(i.p,{children:[`Wie freundlich diese Schranke ist, zeigen ein paar Zahlen. Für das Beispiel
weiter unten ist `,e.jsx(n,{children:"\\corange{\\rho} \\approx \\corange{0{,}405}"}),` und
`,e.jsx(n,{children:"\\cred{e_0} \\approx \\cred{0{,}643}"}),"; ",e.jsx(i.a,{href:"#eq-zahl-der-iterationen",children:"(8.3.4)"})," verlangt dann ",e.jsx(n,{children:"8"}),` Schritte für
`,e.jsx(n,{children:"\\eps = 10^{-3}"}),", ",e.jsx(n,{children:"15"})," Schritte für ",e.jsx(n,{children:"\\eps = 10^{-6}"})," und ",e.jsx(n,{children:"23"}),` Schritte für
`,e.jsx(n,{children:"\\eps = 10^{-9}"}),`. Drei zusätzliche Dezimalstellen kosten also jedes Mal rund
sieben bis acht weitere Schritte, und jeder davon kostet `,e.jsx(n,{children:"O(n^2)"}),"."]}),`
`,e.jsx(i.h3,{children:"Die Wahl von C"}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.3.7 (Zwei Anforderungen an C)",id:"env-zwei-anforderungen-an-c",children:[e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bC"})," soll gleichzeitig zwei Dinge leisten:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\corange{\\rho} = \\left\\|\\bI_n - \\bC\\bA\\right\\|_2 < 1"}),` soll möglichst klein
sein, damit wenige Schritte reichen. Optimal wäre `,e.jsx(n,{children:"\\bC \\approx \\bA^{-1}"}),"."]}),`
`,e.jsxs(i.li,{children:["Der Schritt ",e.jsx(i.a,{href:"#eq-fixpunktform",children:"(8.3.2)"}),` soll billig auszuwerten sein, also möglichst in
`,e.jsx(n,{children:"O(n^2)"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Die beiden Wünsche ziehen in verschiedene Richtungen. Mit ",e.jsx(n,{children:"\\bC = \\bA^{-1}"}),` wäre
`,e.jsx(n,{children:"\\corange{\\rho} = 0"}),`, und ein einziger Schritt träfe die Lösung exakt. Nur
müssten wir dafür `,e.jsx(n,{children:"\\bA^{-1}"}),` kennen, und das ist teurer als das
`,e.jsx(l,{id:"linear-system",children:"Gleichungssystem"}),` selbst. Brauchbare Wahlen sind deshalb
grobe, billige Näherungen der Inversen.`]})]}),`
`,e.jsxs(b,{kind:"Algorithmus",label:"8.3.8 (Drei klassische Wahlen von C)",id:"env-drei-klassische-wahlen-von-c",children:[e.jsxs(i.p,{children:["Für eine dichte Matrix kosten alle drei pro Schritt ",e.jsx(n,{children:"O(n^2)"}),`. Die folgenden
Angaben definieren zunächst nur die Iterationen; Konvergenz braucht jeweils
zusätzliche Voraussetzungen:`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Richardson-Iteration:"})," ",e.jsx(n,{children:"\\bC = \\gamma\\bI_n"}),". Ist ",e.jsx(n,{children:"\\bA"}),` SPD, so garantiert
`,e.jsx(n,{children:"0<\\gamma<2/\\lambda_{\\max}(\\bA)"}),` Konvergenz. Für eine beliebige Matrix
existiert nicht notwendig ein geeignetes positives `,e.jsx(n,{children:"\\gamma"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Jacobi-Iteration:"}),`
`,e.jsx(n,{children:"\\bC = \\diag(\\bA_{11}, \\dots, \\bA_{nn})^{-1}"}),`, die Inverse der
`,e.jsx(l,{id:"diagonal-matrix",children:"Diagonalen"})," von ",e.jsx(n,{children:"\\bA"}),`. Dafür müssen alle
Diagonaleinträge von null verschieden sein. Die Korrektur teilt jede
Residuumskomponente durch das zugehörige Diagonalelement, zusätzlicher
Aufwand `,e.jsx(n,{children:"n"}),` Divisionen. Konvergenz gilt, wenn der Spektralradius der
Iterationsmatrix kleiner als `,e.jsx(n,{children:"1"}),` ist; strikte Diagonaldominanz ist eine
verbreitete hinreichende Bedingung.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Gauss-Seidel-Iteration:"})," ",e.jsx(n,{children:"\\bC^{-1}"}),` ist das untere
`,e.jsx(l,{id:"triangular-matrix",children:"Dreieck"})," von ",e.jsx(n,{children:"\\bA"}),`, also die Diagonale samt allem
darunter. Invertiert wird nichts: Die Korrektur
`,e.jsx(n,{children:"\\bd = \\bC\\,\\cred{\\br^{(k)}}"}),` ist die Lösung des Dreieckssystems
`,e.jsx(n,{children:"\\bC^{-1}\\bd = \\cred{\\br^{(k)}}"}),`, und die liefert die
`,e.jsx(l,{id:"triangular-solve",children:"Vorwärtssubstitution"})," in ",e.jsx(n,{children:"O(n^2)"}),` Operationen.
Auch hier müssen die Diagonaleinträge ungleich null sein. Konvergenz ist
eine zusätzliche Eigenschaft; für SPD-Matrizen ist sie garantiert.`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["Alle drei nehmen einen leicht zugänglichen Teil von ",e.jsx(n,{children:"\\bA"}),` und tun so, als wäre
er die ganze Matrix. Wie gut das gelingt, hängt von `,e.jsx(n,{children:"\\bA"})," ab."]}),`
`,e.jsxs(b,{kind:"Beispiel",label:"8.3.9 (Die drei Wahlen an einem 2×2-System)",id:"env-die-drei-wahlen-an-einem-2-2-system",children:[e.jsx(i.p,{children:"Für"}),e.jsx(t,{children:"\\bA = \\begin{pmatrix} 4 & 1 \\\\ 1 & 3 \\end{pmatrix}"}),e.jsx(i.p,{children:"liefern die drei Rezepte die Iterationsmatrizen"}),e.jsx(t,{children:`\\begin{aligned}
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
für die Jacobi konvergiert und Gauss-Seidel nicht, und ebenso umgekehrt.`]}),e.jsxs(i.p,{children:["Ein Detail zum Mitnehmen: ",e.jsx(n,{children:"\\corange{\\rho}"})," ist die ",e.jsx(i.em,{children:"Norm"}),` der Iterationsmatrix,
und die ist nur ein hinreichendes Kriterium. Die Gauss-Seidel-Matrix hier hat
die `,e.jsx(l,{id:"eigenvalue-eigenvector",children:"Eigenwerte"})," ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"\\tfrac{1}{12}"}),`, ihr
`,e.jsx(l,{id:"spectral-radius",children:"Spektralradius"})," ist also ",e.jsx(n,{children:"0{,}083"}),`, und mit diesem Faktor
schrumpft der Fehler auf lange Sicht. Die Norm `,e.jsx(n,{children:"0{,}264"}),` ist die Garantie, die
schon ab dem ersten Schritt gilt.`]})]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.3.10 (Gesamtaufwand)",id:"env-gesamtaufwand",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"c_{Schritt}"}),` der Aufwand einer Iteration und
`,e.jsx(n,{children:"\\corange{\\rho}=\\|\\bI-\\bC\\bA\\|_2<1"}),". Dann liefert ",e.jsx(i.a,{href:"#env-zahl-der-iterationen",children:"Korollar 8.3.6"})," den Aufwand"]}),e.jsx(t,{children:`O\\!\\left(
c_{Schritt}\\,
\\max\\left\\{1,\\frac{\\log(\\cred{e_0}/\\eps)}{-\\log\\corange{\\rho}}\\right\\}
\\right).`}),e.jsxs(i.p,{children:["Nur wenn ",e.jsx(n,{children:"\\corange{\\rho}\\le\\rho_0<1"}),` unabhängig von der Problemgröße bleibt,
vereinfacht sich das bei dichter `,e.jsx(n,{children:"\\bA"}),` zu
`,e.jsx(n,{children:"O(n^2\\log(\\cred{e_0}/\\eps))"}),". In Problemfolgen nähert sich ",e.jsx(n,{children:"\\rho"}),` häufig der
`,e.jsx(n,{children:"1"}),"; dann wächst die Iterationszahl mit ",e.jsx(n,{children:"n"}),` und der Kondition. Deshalb spart ein
iteratives Verfahren nicht automatisch einen Faktor `,e.jsx(n,{children:"n"}),`. Präconditionierung soll
gerade `,e.jsx(n,{children:"\\rho"})," von ",e.jsx(n,{children:"1"})," fernhalten. Bei dünnbesetztem ",e.jsx(n,{children:"\\bA"}),` kann ein Schritt
`,e.jsx(n,{children:"O(\\operatorname{nnz}(\\bA))"}),` kosten, während direkte Löser bei Band- oder anderer
Struktur ebenfalls deutlich billiger als `,e.jsx(n,{children:"O(n^3)"})," sein können."]})]}),`
`,e.jsx(i.h3,{children:"Ein Beispiel Schritt für Schritt"}),`
`,e.jsxs(b,{kind:"Beispiel",label:"8.3.11 (Richardson-Iteration)",id:"env-richardson-iteration",children:[e.jsx(i.p,{children:"Gegeben seien"}),e.jsx(t,{children:`\\bA = \\begin{pmatrix} 4 & 1 \\\\ 1 & 3 \\end{pmatrix} , \\qquad
\\bb = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} ,
\\qquad\\text{also}\\qquad
\\cgreen{\\bx} = \\bA^{-1}\\bb = \\frac{1}{11}\\begin{pmatrix} 1 \\\\ 7 \\end{pmatrix}
\\approx \\begin{pmatrix} \\cgreen{0{,}091} \\\\ \\cgreen{0{,}636} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Wir iterieren mit ",e.jsx(n,{children:"\\gamma = 0{,}25"}),` und starten in
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}} = (0, 0)^\\top"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 1:"}),`
`,e.jsx(n,{children:"\\cred{\\br^{(0)}} = \\bb - \\bA\\cblue{\\bx^{(0)}} = (1, 2)^\\top"}),", also"]}),e.jsx(t,{children:`\\cblue{\\bx^{(1)}} = \\cblue{\\bx^{(0)}} + 0{,}25\\,\\cred{\\br^{(0)}}
= \\begin{pmatrix} \\cblue{0{,}25} \\\\ \\cblue{0{,}5} \\end{pmatrix} .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 2:"})," ",e.jsx(n,{children:"\\bA\\cblue{\\bx^{(1)}} = (1{,}5,\\; 1{,}75)^\\top"}),`,
`,e.jsx(n,{children:"\\cred{\\br^{(1)}} = (\\cred{-0{,}5},\\; \\cred{0{,}25})^\\top"}),", also"]}),e.jsx(t,{children:"\\cblue{\\bx^{(2)}} = \\begin{pmatrix} \\cblue{0{,}125} \\\\ \\cblue{0{,}563} \\end{pmatrix} ."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 3:"})," ",e.jsx(n,{children:"\\bA\\cblue{\\bx^{(2)}} = (1{,}063,\\; 1{,}813)^\\top"}),`,
`,e.jsx(n,{children:"\\cred{\\br^{(2)}} = (\\cred{-0{,}063},\\; \\cred{0{,}188})^\\top"}),", also"]}),e.jsx(t,{children:`\\cblue{\\bx^{(3)}} = \\begin{pmatrix} \\cblue{0{,}109} \\\\ \\cblue{0{,}609} \\end{pmatrix}
\\qquad\\Bigl(\\text{exakt } \\tfrac{1}{64}(7, 39)^\\top\\Bigr) .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 4:"})," ",e.jsx(n,{children:"\\bA\\cblue{\\bx^{(3)}} = (1{,}047,\\; 1{,}938)^\\top"}),`,
`,e.jsx(n,{children:"\\cred{\\br^{(3)}} = (\\cred{-0{,}047},\\; \\cred{0{,}063})^\\top"}),", also"]}),e.jsx(t,{children:`\\cblue{\\bx^{(4)}} = \\begin{pmatrix} \\cblue{0{,}098} \\\\ \\cblue{0{,}625} \\end{pmatrix}
\\qquad\\Bigl(\\text{exakt } \\tfrac{1}{256}(25, 160)^\\top\\Bigr) .`}),e.jsxs(i.p,{children:["Die Fehler ",e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2"})," lauten"]}),e.jsx(t,{children:`\\cred{0{,}643} \\;\\to\\; \\cred{0{,}210} \\;\\to\\; \\cred{0{,}081}
\\;\\to\\; \\cred{0{,}033} \\;\\to\\; \\cred{0{,}013} \\;\\to\\; \\cdots`}),e.jsxs(i.p,{children:[`Passt das zur Theorie? Die Iterationsmatrix
`,e.jsx(n,{children:"\\bI - \\gamma\\bA"}),` ist symmetrisch, ihre Norm also der größte Eigenwertbetrag.
Aus den Eigenwerten `,e.jsx(n,{children:"\\tfrac{1}{2}(7 \\pm \\sqrt{5}) \\approx 4{,}618"}),` und
`,e.jsx(n,{children:"2{,}382"})," von ",e.jsx(n,{children:"\\bA"})," werden die Eigenwerte ",e.jsx(n,{children:`1 - 0{,}25 \\cdot 4{,}618 =
-0{,}155`})," und ",e.jsx(n,{children:"1 - 0{,}25 \\cdot 2{,}382 = 0{,}405"}),", also"]}),e.jsx(t,{children:"\\corange{\\rho} = \\left\\|\\bI - \\gamma\\bA\\right\\|_2 \\approx \\corange{0{,}405} ."}),e.jsxs(i.p,{children:[`Der Fehler sollte demnach je Schritt etwa auf das
`,e.jsx(n,{children:"0{,}405"}),"-fache fallen, das heißt um den Faktor ",e.jsx(n,{children:"1/0{,}405 \\approx 2{,}5"}),`
sinken. Die beobachteten Quotienten `,e.jsx(n,{children:"0{,}33"}),", ",e.jsx(n,{children:"0{,}39"}),", ",e.jsx(n,{children:"0{,}40"}),", ",e.jsx(n,{children:"0{,}40"}),`
bestätigen das und nähern sich von unten der Vorhersage an.`]})]}),`
`,e.jsxs(T,{title:"Richardson Schritt für Schritt, mit einstellbarem γ",children:[e.jsx(i.p,{children:`Bei welcher Schrittweite kippt diese Iteration? Schätzen wir die Grenze, bevor
wir den Verlauf untersuchen.`}),e.jsx(dn,{frage:"Ab welchem γ beginnt diese Richardson-Iteration zu divergieren?",loesung:.4330847293182009,toleranz:.02,einheit:"γ",min:.05,max:.55,schritt:.005,children:e.jsx(On,{})}),e.jsxs(i.p,{children:["Die Auflösung markiert die Grenze der Konvergenz. ",e.jsx(i.a,{href:"#env-konvergenz-der-korrekturiteration",children:"Satz 8.3.5"}),` erklärt den
Wechsel: Auf der einen Seite fällt der Fehler geometrisch, auf der anderen
verfehlt die Iterationsmatrix die Kontraktionsbedingung.`]})]}),`
`,e.jsx(N,{children:e.jsxs(z,{wahr:!0,children:[e.jsxs(i.p,{children:["Zeigt das Richardson-Widget für eine Schrittweite eine Rate ",e.jsx(n,{children:"\\rho>1"}),", dann erfüllt diese Wahl die Konvergenzvoraussetzung von ",e.jsx(i.a,{href:"#env-konvergenz-der-korrekturiteration",children:"Satz 8.3.5"})," nicht."]}),e.jsxs(i.p,{children:["Die Kontraktionsschranke verlangt ",e.jsx(n,{children:"\\rho<1"}),"."]})]})}),`
`,e.jsx(i.h3,{children:"Einordnung"}),`
`,e.jsx(b,{kind:"Bemerkung",label:"8.3.12 (Was iterative Verfahren leisten)",id:"env-was-iterative-verfahren-leisten",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`Iterative Verfahren gibt es nicht nur für lineare Gleichungssysteme und für
Eigenwertprobleme (`,e.jsx(i.a,{href:"#sec-8.1",children:"Abschnitt 8.1"}),`), sondern ebenso für
Kleinste-Quadrate-Probleme (`,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),")."]}),`
`,e.jsxs(i.li,{children:["In Sonderfällen sind sie ",e.jsx(i.em,{children:"exakt"}),". Mit ",e.jsx(n,{children:"\\bC = \\bA^{-1}"}),` etwa ist
`,e.jsx(n,{children:"\\corange{\\rho} = 0"}),`, und ein Schritt genügt; auch Verfahren vom Krylov-Typ
wie das der konjugierten Gradienten erreichen die Lösung in exakter
Arithmetik nach höchstens `,e.jsx(n,{children:"n"})," Schritten."]}),`
`,e.jsx(i.li,{children:`Meistens ergibt sich ein Handel zwischen Laufzeit und Genauigkeit, und die
Iterationszahl ist der Regler dafür. Wo die Laufzeit wichtiger ist als die
letzte Stelle, sind Iterationen die Methode der Wahl.`}),`
`]})}),`
`,e.jsxs(i.p,{children:[`Ein praktischer Punkt bleibt offen: Den Fehler
`,e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|"}),` können wir nicht messen, denn
dazu müssten wir `,e.jsx(n,{children:"\\cgreen{\\bx}"}),` kennen. Abgebrochen wird deshalb nach dem
Residuum, das jederzeit verfügbar ist. Wegen
`,e.jsx(n,{children:"\\cblue{\\bx^{(k)}} - \\cgreen{\\bx} = -\\bA^{-1}\\cred{\\br^{(k)}}"})," gilt"]}),`
`,e.jsx(t,{children:`\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx}\\right\\|_2
\\le \\left\\|\\bA^{-1}\\right\\|_2 \\left\\|\\cred{\\br^{(k)}}\\right\\|_2 ,`}),`
`,e.jsxs(i.p,{children:[`ein kleines Residuum bürgt also nur bei gutartiger Matrix für einen kleinen
Fehler. Das ist dieselbe Warnung wie bei der
`,e.jsx(l,{id:"condition-number",children:"Konditionszahl"}),` in
`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),", diesmal als Abbruchkriterium."]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §10.9 (iterative Verfahren für lineare Gleichungssysteme,
inklusive Jacobi, Gauss-Seidel und konjugierten Gradienten); für die
Eigenwert-Iterationen aus `,e.jsx(i.a,{href:"#sec-8.1",children:"Abschnitt 8.1"})," siehe Heath §4.5."]})})]})}function Cn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ke,{...r})}):Ke(r)}const{gruen:Ge,blau:Ze,rot:Le,orange:Oe,violett:Ce,grau:$n}=M,H=[.791,.486,.999,.08,.216,.082,.885,.405,.088,.313,.205,.645,.935,.517,.676,.98,.815,.153,.756,.113,.523,.727,.617,.91,.538,.839,.051,.694,.918,.976,.647,.451,.577,.949,.803,.468,.681,.113,.406,.166,.075,.753,.261,.148,.979,.294,.6,.72,.384,.207,.231,.412,.868,.762,.186,.248,.763,.021,.914,.799,.905,.697,.366,.272,.388,.789,.554,.158,.059,.12,.391,.194,.673,.173,.909,.67,.941,.866,.181,.337,.905,.157,.515,.427,.346,.616,.759,.565,.192,.363,.785,.573,.104,.996,.494,.449,.722,.426,.902,.012,.248,.729,.155,.009,.337,.434,.533,.673,.491,.863,.784,.011,.414,.432,.358,.34,.021,.047,.375,.826,.068,.982,.404,.048,.598,.883,.371,.857,.655,.794,.196,.034,.975,.331,.965,.524,.6,.414,.724,.256,.626,.179,.227,.813,.529,.975,.212,.475,.783,.578,.029,.388,.715,.014,.709,.894,.797,.637,.792,.263,.843,.346,.492,.366,.796,.082,.042,.039,.075,.004,.274,.161,.669,.975,.782,.706,.442,.246,.233,.295,.353,.498,.667,.999,.534,.609,.847,.422,.441,.8,.005,.324,.518,.047,.547,.294,.095,.904,.56,.248],te=[.452,.115,.18,.77,.274,.676,.172,.542,.926,.218,.28,.405,.277,.862,.189,.795,.005,.934,.163,.586,.596,.181,.71,.589,.492,.382,.821,.241,.082,.484,.643,.233,.499,.668,.639,.105,.422,.974,.575,.064,.331,.383,.916,.55,.931,.491,.448,.306,.684,.17,.209,.978,.658,.855,.062,.496,.154,.347,.479,.775,.798,.276,.374,.469,.062,.604,.054,.83,.422,.827,.621,.907,.585,.746,.406,.617,.519,.97,.251,.451,.206,.514,.738,.831,.349,.16,.667,.374,.471,.458,.386,.6,.11,.499,.783,.819,.066,.879,.029,.249,.911,.456,.394,.594,.196,.83,.717,.631,.073,.652,.357,.539,.286,.18,.707,.019,.722,.704,.586,.444,.99,.742,.113,.564,.714,.138,.858,.539,.513,.462,.374,.305,.856,.351,.431,.542,.247,.67,.522,.76,.452,.653,.479,.271,.714,.396,.274,.059,.156,.357,.332,.815,.833,.746,.934,.653,.134,.941,.537,.274,.484,.341,.099,.585,.549,.265,.722,.055,.401,.821,.195,.311,.345,.857,.282,.737,.361,.406,.805,.104,.358,.256,.872,.488,.702,.529,.823,.997,.723,.426,.712,.06,.138,.517,.42,.313,.612,.218,.709,.331],Se=H.length,Ae=100,ze=118;function oe(r,i){let s=0;for(let c=0;c<r.length;c++)s+=r[c]*i[c];return s}const Tn=Math.sqrt(oe(H,H)),Hn=Math.sqrt(oe(te,te)),$e=H.map((r,i)=>r-te[i]),en=Math.sqrt(oe($e,$e)),nn=Math.acos(oe(H,te)/(Tn*Hn));function Un(r){const i=cn(r),s=[];let c=0,h=0,x=0,d=0;for(let o=1;o<=Ae;o++){let a=0,u=0;for(let j=0;j<Se;j++){const w=hn(i);a+=w*H[j],u+=w*te[j]}c+=a*a,h+=u*u,x+=a*u,d+=(a-u)*(a-u);const v=Math.sqrt(d/o),A=Math.max(-1,Math.min(1,x/Math.sqrt(c*h))),k=Math.acos(A);s.push({m:o,dist:v,winkel:k,distAbw:(v/en-1)*100,winkelAbw:(k/nn-1)*100})}return s}const L=_;function he(r){return Number.isFinite(r)?(r>0?"+":"")+L(r,2)+" %":L(r)}const Te=r=>r*180/Math.PI;function Xn(){const[r,i]=y.useState(25),[s,c]=y.useState(!1),{seed:h,neueStichprobe:x,setSeed:d}=an(ze),o=y.useMemo(()=>Un(h),[h]),a=o[r-1],u=100/Math.sqrt(2*r),{series:v,markers:A,yDomain:k}=y.useMemo(()=>{const j=o.filter(m=>m.m>=2&&(m.m%2===0||m.m===r)),w=Math.max(20,...j.map(m=>Math.min(60,Math.max(Math.abs(m.distAbw),Math.abs(m.winkelAbw))))),E=Math.min(60,w*1.15),D=[...j.map(m=>({x:m.m,y:m.distAbw,color:Le,label:m.m===r?`m = ${r}`:void 0})),...j.map(m=>({x:m.m,y:m.winkelAbw,color:Ce}))];return{series:[...s?[{f:m=>m>0?100/Math.sqrt(2*m):NaN,color:Oe,dash:[6,4],label:"Faustregel"},{f:m=>m>0?-100/Math.sqrt(2*m):NaN,color:Oe,dash:[6,4]}]:[],{f:()=>0,color:$n,label:"keine Abweichung"}],markers:D,yDomain:[-E,E]}},[o,r,s]);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(U,{children:"Verändern wir m und ziehen wir mehrere Skizzen derselben beiden Vektoren."}),e.jsx(ce,{label:"m (Zeilen von S)",value:r,onChange:j=>i(Math.round(j)),min:2,max:Ae,step:1,fmt:j=>String(Math.round(j))}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("button",{type:"button",className:"rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700",onClick:x,children:"neue Sketchmatrix ziehen"}),e.jsx("button",{type:"button",className:"rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700",onClick:()=>d(ze),disabled:h===ze,children:"zurücksetzen"}),e.jsxs("span",{className:"font-mono",children:["Seed ",h]}),e.jsx("button",{type:"button",className:"rounded border border-slate-300 px-3 py-1 dark:border-slate-600","aria-pressed":s,onClick:()=>c(j=>!j),children:s?"Faustregel ausblenden":"Faustregel einblenden"})]}),e.jsx(De,{xLabel:"m",yLabel:"relative Abweichung in %",series:v,markers:A,xDomain:[2,Ae],yDomain:k,width:460,height:260}),e.jsxs("div",{className:"max-w-prose space-y-1 text-sm",children:[e.jsxs("p",{className:"font-mono",children:["n = ",Se,", m = ",r,", Kompression ",L(Se/r,1),"×"]}),e.jsxs("p",{children:["Abstand"," ",e.jsxs("span",{className:"font-mono",style:{color:Ge},children:["‖x − y‖ = ",L(en,4)]})," ","gegen"," ",e.jsxs("span",{className:"font-mono",style:{color:Ze},children:["‖Sx − Sy‖ = ",L(a.dist,4)]}),", Abweichung"," ",e.jsx("span",{className:"font-mono",style:{color:Le},children:he(a.distAbw)})]}),e.jsxs("p",{children:["Winkel"," ",e.jsxs("span",{className:"font-mono",style:{color:Ge},children:["∠(x, y) = ",L(Te(nn),2),"°"]})," ","gegen"," ",e.jsxs("span",{className:"font-mono",style:{color:Ze},children:["∠(Sx, Sy) = ",L(Te(a.winkel),2),"°"]}),", Abweichung"," ",e.jsx("span",{className:"font-mono",style:{color:Ce},children:he(a.winkelAbw)})]})]}),e.jsx(X,{kind:Math.abs(a.distAbw)<=u?"ok":"warn",children:s?e.jsxs(e.Fragment,{children:["Die Distanzabweichung beträgt ",he(a.distAbw),"; das Band ±",L(u,2)," % aus der Faustregel enthält diese Ziehung ",Math.abs(a.distAbw)<=u?"noch":"nicht",". ",O("satz:zufaellige-einbettung-eines-festen")," erklärt die verwandte Wurzelrate der Garantie."]}):e.jsxs(e.Fragment,{children:["Die aktuelle Distanzabweichung beträgt ",he(a.distAbw),". Blenden wir die Faustregel ein, um sie mit der typischen Größenordnung zu vergleichen."]})})]})}function He(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Die iterativen Verfahren der Abschnitte ",e.jsx(i.a,{href:"#sec-8.1",children:"8.1"}),` und
`,e.jsx(i.a,{href:"#sec-8.3",children:"8.3"}),` handeln Genauigkeit gegen Laufzeit: Wir brechen ab, sobald
uns das Erreichte genügt. Dieser Abschnitt zieht einen anderen Hebel. Wir
verkleinern nicht die Zahl der Schritte, sondern das Problem selbst, und das
Werkzeug dafür ist Zufall.`]}),`
`,e.jsx(i.h3,{children:"Zufall mit Absicht"}),`
`,e.jsxs(i.p,{children:[`Oft sind Probleme so groß, dass wir Genauigkeit gern gegen bessere
Komplexität tauschen. Zunehmend geschieht das durch `,e.jsx(i.em,{children:"Randomisierung"}),`
(randomization): Statt sorgfältig auszuwählen, welchen Teil der Daten wir
wegwerfen, würfeln wir ihn aus.`]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.4.1 (Hauptidee der Randomisierung)",id:"env-hauptidee-der-randomisierung",children:[e.jsx(i.p,{children:`Wir ersetzen ein großes Problem durch ein zufällig erzeugtes, kleines
Problem, das höchstwahrscheinlich eine ähnliche Lösung hat.`}),e.jsxs(i.p,{children:[`Das Wort „höchstwahrscheinlich" ist dabei wörtlich gemeint. Ein
randomisiertes Verfahren darf danebenliegen, und die Fehlerwahrscheinlichkeit
`,e.jsx(n,{children:"\\delta"}),` ist ein Parameter, den wir einstellen. Wir kaufen uns Rechenzeit,
indem wir ein kontrolliertes Risiko eingehen.`]})]}),`
`,e.jsxs(i.p,{children:["Warum sollte das gutgehen? Wer eine Punktwolke im ",e.jsx(n,{children:"\\R^{10\\,000}"}),` auf ein paar
hundert Koordinaten eindampft, wirft weit über 90 % der Koordinaten weg. Dass
die Wolke danach noch dieselbe Form hat, klingt zunächst absurd. Der Grund
liegt in einer Eigenart hochdimensionaler Räume, die wir uns zuerst ansehen.`]}),`
`,e.jsx(i.h3,{children:"Fast orthogonale Zufallsvektoren"}),`
`,e.jsxs(i.p,{children:[`In der Ebene sind zwei zufällige Richtungen selten senkrecht: Der Winkel
zwischen ihnen ist gleichverteilt, jeder Wert ist so gut wie jeder andere. Im
`,e.jsx(n,{children:"\\R^n"})," mit großem ",e.jsx(n,{children:"n"})," ändert sich das Bild vollständig."]}),`
`,e.jsxs(b,{kind:"Satz",label:"8.4.2 (Zufallsrichtungen stehen fast senkrecht aufeinander)",id:"env-zufallsrichtungen-stehen-fast-senkrecht",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bs_1, \\bs_2 \\in \\R^n"})," unabhängig und je ",e.jsx(n,{children:"\\Ncal(\\bnull, \\bI_n)"}),`-verteilt,
und sei `,e.jsx(n,{children:"\\theta"})," der Winkel zwischen ihnen. Dann gilt"]}),e.jsx(t,{children:"\\E[\\cos\\theta] = 0, \\qquad \\var[\\cos\\theta] = \\frac{1}{n},"}),e.jsxs(i.p,{children:["und für jedes ",e.jsx(n,{children:"t > 0"})," folgt"]}),e.jsx(t,{children:"\\Pr\\left(\\left|\\cos\\theta\\right| \\ge \\frac{t}{\\sqrt{n}}\\right) \\le \\frac{1}{t^2} ."})]}),`
`,e.jsxs(i.p,{children:["Der Satz sagt: Die Streuung des Kosinus schrumpft wie ",e.jsx(n,{children:"1/\\sqrt{n}"}),`. In hohen
Dimensionen drängt sich die Verteilung des Winkels also um `,e.jsx(n,{children:"90^\\circ"}),`
zusammen, zufällige Richtungen sind praktisch
`,e.jsx(l,{id:"orthogonality",children:"orthogonal"}),"."]}),`
`,e.jsxs(q,{title:"Woher die Streuung des Kosinus kommt",children:[e.jsxs(K,{children:[e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["der Winkel zwischen zwei Vektoren hängt nur von ihren Richtungen ab; ",e.jsx(n,{children:"\\bs_i = \\bnull"})," tritt mit Wahrscheinlichkeit ",e.jsx(n,{children:"0"})," ein und stört deshalb nicht"]}),children:[e.jsxs(i.p,{children:["Wir normieren beide Vektoren, ",e.jsx(n,{children:"\\bu = \\bs_1/\\left\\|\\bs_1\\right\\|"}),` und
`,e.jsx(n,{children:"\\bv = \\bs_2/\\left\\|\\bs_2\\right\\|"}),`, und schreiben den Kosinus als
`,e.jsx(l,{id:"dot-product",children:"Skalarprodukt"})]}),e.jsx(t,{children:"\\cos\\theta = \\bu^\\top\\bv ."})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bu"})," und ",e.jsx(n,{children:"-\\bu"})," sind gleich verteilt, also ist der Erwartungswert null; die Matrix ",e.jsx(n,{children:"\\E[\\bu\\bu^\\top]"})," ändert sich unter Drehungen nicht und ist deshalb ein Vielfaches der ",e.jsx(l,{id:"identity-matrix",children:"Einheitsmatrix"}),", und der Faktor folgt aus ",e.jsx(n,{children:"\\tr \\E[\\bu\\bu^\\top] = \\E\\left[\\left\\|\\bu\\right\\|^2\\right] = 1"})]}),children:[e.jsxs(i.p,{children:["Die Standardnormalverteilung ist drehinvariant, also ist ",e.jsx(n,{children:"\\bu"}),` gleichverteilt
auf der Einheitssphäre. Daraus folgt`]}),e.jsx(P,{tag:"8.4.1",id:"eq-eq-8-4-1",children:"\\E[\\bu] = \\bnull, \\qquad \\E\\left[\\bu\\bu^\\top\\right] = \\frac{1}{n}\\,\\bI_n ."})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-eq-8-4-1",children:"(8.4.1)"})," mit ",e.jsx(n,{children:"\\left(\\bu^\\top\\bv\\right)^2 = \\bv^\\top\\bu\\bu^\\top\\bv"}),"; ",e.jsx(n,{children:"\\left\\|\\bv\\right\\| = 1"})," nach Konstruktion"]}),children:[e.jsxs(i.p,{children:["Jetzt bedingen wir auf ",e.jsx(n,{children:"\\bv"})," und nutzen die Unabhängigkeit:"]}),e.jsx(t,{children:`\\E\\left[\\bu^\\top\\bv \\mid \\bv\\right] = \\E[\\bu]^\\top\\bv = 0,
\\qquad
\\E\\left[\\left(\\bu^\\top\\bv\\right)^2 \\mid \\bv\\right]
= \\bv^\\top\\E\\left[\\bu\\bu^\\top\\right]\\bv
= \\frac{\\left\\|\\bv\\right\\|^2}{n} = \\frac{1}{n} .`}),e.jsxs(i.p,{children:["Beide Werte hängen nicht mehr von ",e.jsx(n,{children:"\\bv"})," ab, gelten also auch unbedingt."]})]}),e.jsxs(f,{why:e.jsx(e.Fragment,{children:"Tschebyscheff ist die Markov-Ungleichung, angewandt auf die quadrierte Abweichung vom Erwartungswert"}),children:[e.jsxs(i.p,{children:["Wegen ",e.jsx(n,{children:"\\E[\\cos\\theta] = 0"})," ist ",e.jsx(n,{children:"\\var[\\cos\\theta] = \\E\\left[\\cos^2\\theta\\right] = 1/n"}),`,
und die Tschebyscheff-Ungleichung liefert`]}),e.jsx(t,{children:`\\Pr\\left(\\left|\\cos\\theta\\right| \\ge \\frac{t}{\\sqrt{n}}\\right)
\\le \\frac{\\var[\\cos\\theta]}{t^2/n} = \\frac{1}{t^2} .`})]})]}),e.jsxs(b,{kind:"Beispiel",label:"8.4.3 (Wie senkrecht ist fast senkrecht?)",id:"env-wie-senkrecht-ist-fast-senkrecht",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n = 10\\,000"})," ist ",e.jsx(n,{children:"\\var[\\cos\\theta] = 10^{-4}"}),`, die Standardabweichung
also `,e.jsx(n,{children:"0{,}01"}),". Mit ",e.jsx(n,{children:"t = 5"})," liefert ",e.jsx(i.a,{href:"#env-zufallsrichtungen-stehen-fast-senkrecht",children:"Satz 8.4.2"})]}),e.jsx(t,{children:"\\Pr\\left(\\left|\\cos\\theta\\right| \\ge 0{,}05\\right) \\le \\frac{1}{25} = 0{,}04 ,"}),e.jsxs(i.p,{children:["mit Wahrscheinlichkeit mindestens ",e.jsx(n,{children:"96\\,\\%"}),` liegt der Winkel also zwischen
`,e.jsx(n,{children:"87{,}1^\\circ"})," und ",e.jsx(n,{children:"92{,}9^\\circ"}),". Zum Vergleich: Für ",e.jsx(n,{children:"n = 100"}),` erlaubt
dieselbe Schranke noch `,e.jsx(n,{children:"\\left|\\cos\\theta\\right| \\le 0{,}5"}),`, also jeden Winkel
zwischen `,e.jsx(n,{children:"60^\\circ"})," und ",e.jsx(n,{children:"120^\\circ"}),". Die Aussage lebt von großem ",e.jsx(n,{children:"n"}),"."]})]})]}),`
`,e.jsxs(i.p,{children:["Damit wird plausibel, was wir eigentlich vorhaben. Ziehen wir ",e.jsx(n,{children:"m"}),` solcher
Richtungen und schreiben sie als Zeilen in eine Matrix, so stehen je zwei
dieser Zeilen fast senkrecht aufeinander. Ein Orthonormalsystem sind sie
deshalb noch lange nicht: Für eine Gauss-Zeile
`,e.jsx(n,{children:"\\bs_i \\sim \\Ncal(\\bnull, \\bI_n/m)"}),` ist
`,e.jsx(n,{children:"\\E\\left[\\left\\|\\bs_i\\right\\|^2\\right] = n/m"}),", bei ",e.jsx(n,{children:"n = 10\\,000"}),` und
`,e.jsx(n,{children:"m = 50"})," also ",e.jsx(n,{children:"200"}),`. Um die Richtungen kümmert sich die hohe Dimension, um
die Längen der Vorfaktor in der Verteilung. Die Abbildung
`,e.jsx(n,{children:"\\bx \\mapsto \\bS\\bx"})," misst die Länge von ",e.jsx(n,{children:"\\bx"})," dann entlang ",e.jsx(n,{children:"m"}),` zufälliger,
fast senkrechter Achsen, und das reicht überraschend weit.`]}),`
`,e.jsxs(b,{kind:"Definition",label:"8.4.4 (Sketching-Matrix und Skizze)",id:"env-sketching-matrix-und-skizze",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"m < n"}),". Eine Zufallsmatrix ",e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"}),` heißt
`,e.jsx(i.em,{children:"Sketching-Matrix"})," (sketching matrix), und für ",e.jsx(n,{children:"\\bx \\in \\R^n"}),` heißt
`,e.jsx(n,{children:"\\cblue{\\bS\\bx} \\in \\R^m"})," die ",e.jsx(i.em,{children:"Skizze"})," (sketch) von ",e.jsx(n,{children:"\\bx"}),`. Gesucht sind
Verteilungen für `,e.jsx(n,{children:"\\bS"}),", unter denen mit hoher Wahrscheinlichkeit"]}),e.jsx(t,{children:`\\left\\|\\cblue{\\bS\\bx} - \\cblue{\\bS\\by}\\right\\|
\\approx \\left\\|\\cgreen{\\bx} - \\cgreen{\\by}\\right\\|
\\qquad\\text{und}\\qquad
\\angle\\left(\\cblue{\\bS\\bx}, \\cblue{\\bS\\by}\\right)
\\approx \\angle\\left(\\cgreen{\\bx}, \\cgreen{\\by}\\right)`}),e.jsxs(i.p,{children:[`gilt, die Skizze also Abstände und Winkel der Originaldaten erbt. Wie im
ganzen Kapitel ist `,e.jsx(n,{children:"\\left\\|\\cdot\\right\\|"}),` die
`,e.jsx(l,{id:"euclidean-norm",children:"euklidische Norm"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Häufig heißt ",e.jsx(n,{children:"\\bS"}),` eine zufällige „Projektion". Das Wort ist mit Vorsicht zu
lesen: Eine `,e.jsx(l,{id:"projection",children:"Projektion"}),` bildet einen Raum in sich ab und ist
idempotent, `,e.jsx(n,{children:"\\bS"})," dagegen führt vom ",e.jsx(n,{children:"\\R^n"})," in den kleineren ",e.jsx(n,{children:"\\R^m"}),`. Gemeint
ist nur, dass das Bild in `,e.jsx(n,{children:"m"})," statt in ",e.jsx(n,{children:"n"})," Dimensionen lebt."]}),`
`,e.jsx(i.h3,{children:"Ein Zahlenbeispiel"}),`
`,e.jsxs(b,{kind:"Beispiel",label:"8.4.5 (Sketching zweier Vektoren mit 10 000 Komponenten)",id:"env-sketching-zweier-vektoren-mit-10-000",children:[e.jsxs(i.p,{children:["Ziehen wir zwei beliebige Vektoren ",e.jsx(n,{children:"\\bx, \\by \\in \\R^{10\\,000}"}),` und eine
Gauss-Sketchmatrix mit `,e.jsx(n,{children:"m = 50"}),", also einen Faktor ",e.jsx(n,{children:"200"})," kleiner:"]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`set.seed(1312)
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
`,e.jsx(n,{children:"3\\,\\%"})," ab, der Winkel um rund ",e.jsx(n,{children:"1\\,\\%"})," – und das, obwohl ",e.jsx(n,{children:"99{,}5\\,\\%"}),` der
Dimensionen wegfallen.`]}),e.jsxs(i.p,{children:[`Diese Zahlen sind eine gute Ziehung, und wie gut, lässt sich für
eine Gauss-Skizze exakt beziffern. Ist `,e.jsx(n,{children:"\\bz \\in \\R^n"})," fest, so sind die ",e.jsx(n,{children:"m"}),`
Komponenten `,e.jsx(n,{children:"\\bs_i^\\top\\bz"})," von ",e.jsx(n,{children:"\\bS\\bz"}),` unabhängig
`,e.jsx(n,{children:"\\Ncal(0, \\left\\|\\bz\\right\\|^2/m)"}),`-verteilt; damit ist
`,e.jsx(n,{children:"\\left\\|\\bS\\bz\\right\\|^2/\\left\\|\\bz\\right\\|^2"})," genau ",e.jsx(n,{children:"\\chi^2_m/m"}),`-verteilt.
Bei `,e.jsx(n,{children:"m = 50"}),` hat die relative Abweichung des Abstands damit die
Standardabweichung `,e.jsx(n,{children:"9{,}97\\,\\%"}),`, praktisch die Faustregel
`,e.jsx(n,{children:"1/\\sqrt{2m} = 10\\,\\%"}),`; nur knapp ein Viertel aller Ziehungen bleibt unter
der `,e.jsx(n,{children:"3\\,\\%"}),"-Marke, und nur knapp ",e.jsx(n,{children:"8\\,\\%"})," landen unter ",e.jsx(n,{children:"1\\,\\%"}),`. Das Verfahren
funktioniert, aber einzelne Ziehungen streuen erheblich. Das Widget unten
führt beides vor.`]})]}),`
`,e.jsxs(T,{title:"Sketching mit verstellbarem m",children:[e.jsx(i.p,{children:`Wie weit eine einzelne Ziehung danebenliegen kann, führt das Widget vor.
Verändern wir die Zeilenzahl und vergleichen wir mehrere Ziehungen.`}),e.jsx(Xn,{})]}),`
`,e.jsx(N,{children:e.jsxs(ye,{loesung:10,toleranz:.2,children:[e.jsxs(i.p,{children:["Wie groß ist im Sketching-Widget die eingeblendete Faustregel in Prozent bei ",e.jsx(n,{children:"m=50"}),"?"]}),e.jsxs(i.p,{children:["Nach dem Einblenden zeigt das orange Band ",e.jsx(n,{children:"1/\\sqrt{2m} = 10\\,\\%"}),"."]})]})}),`
`,e.jsx(i.h3,{children:"Der Einbettungssatz"}),`
`,e.jsx(i.p,{children:`Bisher haben wir plausibel gemacht, dass Sketching funktionieren kann. Jetzt
beweisen wir es, und zwar mit erstaunlich wenig Aufwand: Erwartungswert,
Varianz und die Tschebyscheff-Ungleichung genügen.`}),`
`,e.jsxs(b,{kind:"Satz",label:"8.4.6 (Zufällige Einbettung eines festen Vektors)",id:"env-zufaellige-einbettung-eines-festen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"}),` eine Zufallsmatrix, deren Zeilen
`,e.jsx(n,{children:"\\bs_1^\\top, \\dots, \\bs_m^\\top"})," unabhängig und identisch verteilt sind und"]}),e.jsx(P,{tag:"8.4.2",id:"eq-zufaellige-einbettung-eines-festen",children:"\\E\\left[\\bs_i\\bs_i^\\top\\right] = \\frac{1}{m}\\,\\bI_n"}),e.jsxs(i.p,{children:["erfüllen, sowie für ein ",e.jsx(n,{children:"K > 0"})]}),e.jsx(P,{tag:"8.4.3",id:"eq-zufaellige-einbettung-eines-festen-2",children:`\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right] \\le \\frac{K}{m^2}
\\qquad \\text{für alle } \\bv \\in \\R^n \\text{ mit } \\left\\|\\bv\\right\\| = 1 .`}),e.jsxs(i.p,{children:["Seien weiter ",e.jsx(n,{children:"\\bx \\in \\R^n"})," ",e.jsx(i.em,{children:"fest"})," und ",e.jsx(n,{children:"\\delta > 0"}),`. Dann gilt mit
Wahrscheinlichkeit mindestens `,e.jsx(n,{children:"1 - \\delta"})]}),e.jsx(P,{tag:"8.4.4",id:"eq-zufaellige-einbettung-eines-festen-3",children:`(1 - \\corange{\\eps})\\left\\|\\cgreen{\\bx}\\right\\|^2
\\le \\left\\|\\cblue{\\bS\\bx}\\right\\|^2
\\le (1 + \\corange{\\eps})\\left\\|\\cgreen{\\bx}\\right\\|^2 ,
\\qquad
\\corange{\\eps} = \\sqrt{\\frac{K}{\\delta m}} .`})]}),`
`,e.jsx(q,{title:"Beweis des Einbettungssatzes",children:e.jsxs(K,{children:[e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["mit ",e.jsx(n,{children:"\\bx"})," erfüllt auch ",e.jsx(n,{children:"\\bx/\\left\\|\\bx\\right\\|"})," die Voraussetzungen, und ",e.jsx(n,{children:"\\left\\|\\bS(\\bx/\\left\\|\\bx\\right\\|)\\right\\|^2 = \\left\\|\\bS\\bx\\right\\|^2/\\left\\|\\bx\\right\\|^2"})]}),children:[e.jsxs(i.p,{children:["Wir dürfen ",e.jsx(n,{children:"\\left\\|\\cgreen{\\bx}\\right\\| = 1"}),` annehmen. Beide Seiten von
`,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"})," sind homogen vom Grad ",e.jsx(n,{children:"2"})," in ",e.jsx(n,{children:"\\cgreen{\\bx}"}),`; für
`,e.jsx(n,{children:"\\cgreen{\\bx} \\neq \\bnull"}),` teilen wir die Ungleichung durch
`,e.jsx(n,{children:"\\left\\|\\cgreen{\\bx}\\right\\|^2"}),", und für ",e.jsx(n,{children:"\\cgreen{\\bx} = \\bnull"}),` ist nichts zu
zeigen. Zu beweisen bleibt`]}),e.jsx(t,{children:"\\Pr\\left(\\left| \\left\\|\\cblue{\\bS\\bx}\\right\\|^2 - 1 \\right| \\le \\corange{\\eps}\\right) \\ge 1 - \\delta ."})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left(\\bs_i^\\top\\bx\\right)^2 = \\bx^\\top\\bs_i\\bs_i^\\top\\bx"}),", dann die Linearität des ",e.jsx(l,{id:"expected-value",children:"Erwartungswerts"})," und Bedingung ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"})]}),children:[e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"i"}),"-te Komponente von ",e.jsx(n,{children:"\\bS\\bx"})," ist ",e.jsx(n,{children:"\\bs_i^\\top\\bx"}),", also"]}),e.jsx(t,{children:`\\left\\|\\cblue{\\bS\\bx}\\right\\|^2 = \\sum_{i=1}^m \\left(\\bs_i^\\top\\cgreen{\\bx}\\right)^2
\\qquad\\text{und}\\qquad
\\E\\left[\\left\\|\\cblue{\\bS\\bx}\\right\\|^2\\right]
= \\sum_{i=1}^m \\cgreen{\\bx}^\\top \\E\\left[\\bs_i\\bs_i^\\top\\right] \\cgreen{\\bx}
= m\\,\\cgreen{\\bx}^\\top \\frac{\\bI_n}{m} \\cgreen{\\bx}
= \\left\\|\\cgreen{\\bx}\\right\\|^2 = 1 .`}),e.jsx(i.p,{children:"Im Erwartungswert trifft die Skizze die Länge also exakt."})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\var[Z] = \\E\\left[Z^2\\right] - \\E[Z]^2 \\le \\E\\left[Z^2\\right]"})," mit ",e.jsx(n,{children:"Z = \\left(\\bs_i^\\top\\bx\\right)^2"}),", danach Bedingung ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"})," mit ",e.jsx(n,{children:"\\bv = \\bx"})]}),children:[e.jsx(i.p,{children:"Die Summanden sind unabhängig, also addieren sich die Varianzen:"}),e.jsx(t,{children:`\\var\\left[\\left\\|\\cblue{\\bS\\bx}\\right\\|^2\\right]
= \\sum_{i=1}^m \\var\\left[\\left(\\bs_i^\\top\\cgreen{\\bx}\\right)^2\\right]
\\le \\sum_{i=1}^m \\E\\left[\\left(\\bs_i^\\top\\cgreen{\\bx}\\right)^4\\right]
\\le m \\cdot \\frac{K}{m^2} = \\frac{K}{m} .`}),e.jsx(i.p,{children:`Hier steckt die ganze Arbeit der vierten Momente: Sie beschränken die
Streuung der Skizze.`})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["Tschebyscheff mit dem in Schritt 2 berechneten Erwartungswert ",e.jsx(n,{children:"1"}),"; einsetzen: ",e.jsx(n,{children:"K/(\\eps^2 m) = K\\delta m/(K m) = \\delta"})]}),children:[e.jsx(i.p,{children:`Die Tschebyscheff-Ungleichung schlägt die Brücke von der Varianz zur
Wahrscheinlichkeit:`}),e.jsx(t,{children:`\\Pr\\left(\\left| \\left\\|\\cblue{\\bS\\bx}\\right\\|^2 - 1 \\right| > \\corange{\\eps}\\right)
\\le \\frac{\\var\\left[\\left\\|\\cblue{\\bS\\bx}\\right\\|^2\\right]}{\\corange{\\eps}^2}
\\le \\frac{K}{\\corange{\\eps}^2 m} .`}),e.jsxs(i.p,{children:["Die Wahl ",e.jsx(n,{children:"\\corange{\\eps} = \\sqrt{K/(\\delta m)}"}),` macht die rechte Seite zu
`,e.jsx(n,{children:"\\delta"}),`, und das Gegenereignis hat damit Wahrscheinlichkeit mindestens
`,e.jsx(n,{children:"1 - \\delta"}),"."]})]})]})}),`
`,e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\bS"})," linear ist, gilt ",e.jsx(i.a,{href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"}),` mit
`,e.jsx(n,{children:"\\cgreen{\\bx} - \\cgreen{\\by}"}),` sofort auch für Abstände, und Wurzelziehen macht
aus der Aussage über `,e.jsx(n,{children:"\\left\\|\\cblue{\\bS\\bx}\\right\\|^2"}),` eine über die Länge
selbst: Aus `,e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"})," im Quadrat werden rund ",e.jsx(n,{children:"5\\,\\%"}),` in der
Länge. Damit gilt die Abstandsaussage aus
`,e.jsx(i.a,{href:"#env-sketching-matrix-und-skizze",children:"Definition 8.4.4"}),"."]}),`
`,e.jsxs(q,{title:"Warum Cauchy-Schwarz zu grob ist und wie aus Quadraten Längen werden",children:[e.jsxs(b,{kind:"Bemerkung",label:"8.4.7 (Warum die Momentenbedingung an der Projektion ansetzt)",id:"env-warum-die-momentenbedingung-an-der",children:[e.jsxs(i.p,{children:[`Die Varianz in Schritt 3 ließe sich auch bequemer abschätzen, nämlich über die
`,e.jsx(l,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"}),`
`,e.jsx(n,{children:"\\left|\\bs_i^\\top\\bv\\right| \\le \\left\\|\\bs_i\\right\\|\\left\\|\\bv\\right\\|"}),`. Dann
stünde in `,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"}),` die Länge der ganzen Zeile,
`,e.jsx(n,{children:"\\E\\left[\\left\\|\\bs_i\\right\\|^4\\right] \\le K/m^2"}),`. Das wäre richtig, aber
unbrauchbar grob: Für `,e.jsx(n,{children:"\\bs_i \\sim \\Ncal(\\bnull, \\bI_n/m)"})," ist"]}),e.jsx(t,{children:"\\E\\left[\\left\\|\\bs_i\\right\\|^4\\right] = \\frac{n^2 + 2n}{m^2} ,"}),e.jsxs(i.p,{children:["das zugehörige ",e.jsx(n,{children:"K"})," wüchse also wie ",e.jsx(n,{children:"n^2"})," – bei ",e.jsx(n,{children:"n = 10\\,000"}),` wäre
`,e.jsx(n,{children:"K \\approx 10^8"})," statt ",e.jsx(n,{children:"3"}),", und die Schranke aus ",e.jsx(i.a,{href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"}),` wäre wertlos. Der
Unterschied ist gerade der verschenkte Faktor `,e.jsx(n,{children:"(n^2+2n)/3"}),": Die Zeile ",e.jsx(n,{children:"\\bs_i"}),`
ist lang, ihre Projektion auf eine `,e.jsx(i.em,{children:"feste"})," Richtung ",e.jsx(n,{children:"\\bv"}),` aber kurz, und nur
diese Projektion geht in `,e.jsx(n,{children:"\\left\\|\\bS\\bx\\right\\|^2"})," ein. Bedingung ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"}),`
misst deshalb direkt `,e.jsx(n,{children:"\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right]"}),` und ist für
Gauss-Zeilen mit `,e.jsx(n,{children:"K = 3"})," sogar mit Gleichheit erfüllt (",e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.11"}),")."]})]}),e.jsxs(b,{kind:"Bemerkung",label:"8.4.8 (Von Quadraten zu Längen und Abständen)",id:"env-von-quadraten-zu-laengen-und-abstaenden",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"})," spricht über ",e.jsx(n,{children:"\\left\\|\\bS\\bx\\right\\|^2"}),`, interessant sind aber
Längen und Abstände.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Wurzelziehen."})," Für ",e.jsx(n,{children:"\\corange{\\eps} \\le 1"})," folgt aus ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"}),`
`,e.jsx(n,{children:"\\sqrt{1-\\corange{\\eps}} \\le \\left\\|\\cblue{\\bS\\bx}\\right\\|/\\left\\|\\cgreen{\\bx}\\right\\| \\le \\sqrt{1+\\corange{\\eps}}"}),`.
Für `,e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"})," heißt das ",e.jsx(n,{children:"0{,}949 \\le \\left\\|\\cblue{\\bS\\bx}\\right\\|/\\left\\|\\cgreen{\\bx}\\right\\| \\le 1{,}049"}),`:
Eine Verzerrung von `,e.jsx(n,{children:"10\\,\\%"})," im Quadrat sind rund ",e.jsx(n,{children:"5\\,\\%"})," in der Länge."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Von der Länge zum Abstand."})," ",e.jsx(n,{children:"\\bS"}),` ist linear, also ist
`,e.jsx(n,{children:"\\bS\\bx - \\bS\\by = \\bS(\\bx - \\by)"}),`. Wenden wir den Satz auf den festen
Vektor `,e.jsx(n,{children:"\\bx - \\by"}),` an, so erhalten wir die Abstandsaussage aus
`,e.jsx(i.a,{href:"#env-sketching-matrix-und-skizze",children:"Definition 8.4.4"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Mehrere Paare."})," Für ",e.jsx(n,{children:"N"})," Punkte und ",e.jsx(i.em,{children:"alle"}),` Paare brauchen wir die
Aussage für `,e.jsx(n,{children:"N(N-1)/2"}),` Differenzvektoren gleichzeitig. Über eine
Vereinigungsschranke geht das, kostet aber `,e.jsx(n,{children:"\\delta \\to 2\\delta/(N(N-1))"}),`
und damit ein deutlich größeres `,e.jsx(n,{children:"m"}),"."]}),`
`]})]})]}),`
`,e.jsxs(i.p,{children:[`Winkel behandelt der Satz zunächst gar nicht. Sie folgen aber, denn
Skalarprodukte lassen sich über die Polarisationsformel aus Längen
zurückgewinnen; damit ist auch die Winkelaussage aus
`,e.jsx(i.a,{href:"#env-sketching-matrix-und-skizze",children:"Definition 8.4.4"})," gerechtfertigt."]}),`
`,e.jsxs(q,{title:"Wie die Winkeltreue aus der Längentreue folgt",children:[e.jsxs(b,{kind:"Korollar",label:"8.4.9 (Skalarprodukte bleiben erhalten)",id:"env-skalarprodukte-bleiben-erhalten",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\R^n"})," fest und ",e.jsx(n,{children:"\\bS"})," wie in ",e.jsx(i.a,{href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"}),`. Dann gilt mit
Wahrscheinlichkeit mindestens `,e.jsx(n,{children:"1 - 2\\delta"})]}),e.jsx(t,{children:`\\left| \\cblue{(\\bS\\bx)^\\top(\\bS\\by)} - \\cgreen{\\bx^\\top\\by} \\right|
\\le \\frac{\\corange{\\eps}}{2}\\left(\\left\\|\\cgreen{\\bx}\\right\\|^2 + \\left\\|\\cgreen{\\by}\\right\\|^2\\right) .`})]}),e.jsxs(K,{children:[e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["ausmultiplizieren: ",e.jsx(n,{children:"\\left\\|\\ba+\\bc\\right\\|^2 - \\left\\|\\ba-\\bc\\right\\|^2 = 4\\,\\ba^\\top\\bc"})]}),children:[e.jsxs(i.p,{children:["Für beliebige Vektoren ",e.jsx(n,{children:"\\ba, \\bc"})," gilt die Polarisationsformel"]}),e.jsx(t,{children:"\\ba^\\top\\bc = \\frac{\\left\\|\\ba + \\bc\\right\\|^2 - \\left\\|\\ba - \\bc\\right\\|^2}{4} ."}),e.jsxs(i.p,{children:["Wir wenden sie einmal auf ",e.jsx(n,{children:"\\bS\\bx, \\bS\\by"})," und einmal auf ",e.jsx(n,{children:"\\bx, \\by"}),` an und
nutzen `,e.jsx(n,{children:"\\bS\\bx \\pm \\bS\\by = \\bS(\\bx \\pm \\by)"}),"."]})]}),e.jsxs(f,{why:e.jsxs(e.Fragment,{children:["Vereinigungsschranke für die beiden Ausnahmeereignisse; zuletzt die Parallelogrammgleichung ",e.jsx(n,{children:"\\left\\|\\bx+\\by\\right\\|^2 + \\left\\|\\bx-\\by\\right\\|^2 = 2\\left\\|\\bx\\right\\|^2 + 2\\left\\|\\by\\right\\|^2"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"})," gilt für jeden festen Vektor, insbesondere für ",e.jsx(n,{children:"\\bx + \\by"}),` und für
`,e.jsx(n,{children:"\\bx - \\by"}),`. Jedes der beiden Ereignisse verfehlt die Schranke mit
Wahrscheinlichkeit höchstens `,e.jsx(n,{children:"\\delta"}),", zusammen also höchstens ",e.jsx(n,{children:"2\\delta"}),`.
Treten beide ein, so ist`]}),e.jsx(t,{children:`\\left| \\cblue{(\\bS\\bx)^\\top(\\bS\\by)} - \\cgreen{\\bx^\\top\\by} \\right|
\\le \\frac{\\corange{\\eps}\\left\\|\\bx+\\by\\right\\|^2 + \\corange{\\eps}\\left\\|\\bx-\\by\\right\\|^2}{4}
= \\frac{\\corange{\\eps}}{2}\\left(\\left\\|\\bx\\right\\|^2 + \\left\\|\\by\\right\\|^2\\right) .`})]})]}),e.jsxs(i.p,{children:["Für Einheitsvektoren steht rechts schlicht ",e.jsx(n,{children:"\\corange{\\eps}"}),`. Der Kosinus des
Winkels ist das Skalarprodukt der normierten Vektoren, und Zähler wie Nenner
werden bis auf Terme der Ordnung `,e.jsx(n,{children:"\\corange{\\eps}"})," getroffen."]})]}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.4.10 (Ein fester Vektor ist nicht jeder Vektor)",id:"env-ein-fester-vektor-ist-nicht-jeder-vektor",children:[e.jsxs(i.p,{children:['Das Wort „fest" in ',e.jsx(i.a,{href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"}),` trägt Gewicht. Verschöbe man den Quantor „für
alle `,e.jsx(n,{children:"\\bx \\in \\R^n"}),'" ',e.jsx(i.em,{children:"innerhalb"}),` der Wahrscheinlichkeit, so wäre die Aussage
schlicht falsch: Unser Beweis fixiert `,e.jsx(n,{children:"\\bx"}),", bevor ",e.jsx(n,{children:"\\bS"}),` gezogen wird, und die
Ausnahmemenge darf für jedes `,e.jsx(n,{children:"\\bx"}),` eine andere sein. Ein Gegenargument in
einer Zeile: `,e.jsx(n,{children:"\\bS"}),` hat höchstens
`,e.jsx(l,{id:"rank",children:"Rang"})," ",e.jsx(n,{children:"m < n"}),`, besitzt also einen nichttrivialen
`,e.jsx(l,{id:"kernel",children:"Kern"}),". Für ein ",e.jsx(n,{children:"\\bx \\neq \\bnull"})," mit ",e.jsx(n,{children:"\\bS\\bx = \\bnull"}),` ist
`,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"})," verletzt, ganz gleich wie ",e.jsx(n,{children:"\\bS"})," ausgefallen ist."]}),e.jsxs(i.p,{children:[`Gleichmäßige Aussagen sind trotzdem möglich, aber nur auf einem
`,e.jsx(l,{id:"subspace",children:"Unterraum"}),` kleiner Dimension und mit Zusatzarbeit: Man
kontrolliert endlich viele Richtungen eines feinen Netzes und überträgt das
Ergebnis per Vereinigungsschranke auf den ganzen Unterraum. Daher rührt der
Name „Einbetten von Unterräumen", und daher stammt die Rechtfertigung für das
gesketchte Kleinste-Quadrate-Problem weiter unten: Dort muss die Skizze alle
Vektoren des von den Spalten von `,e.jsx(n,{children:"\\bA"})," und ",e.jsx(n,{children:"\\bb"}),` aufgespannten Unterraums
gleichzeitig gut treffen.`]})]}),`
`,e.jsx(i.h3,{children:"Drei Bauarten von Sketching-Matrizen"}),`
`,e.jsxs(i.p,{children:["Welche Verteilungen erfüllen ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"})," und ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"}),`? Drei Bauarten sind in
der Praxis üblich, und alle drei lassen sich direkt nachrechnen.`]}),`
`,e.jsxs(b,{kind:"Beispiel",label:"8.4.11 (Gauss, Rademacher, Subsampling)",id:"env-gauss-rademacher-subsampling",children:[e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Gauss."})," ",e.jsx(n,{children:"\\bs_i \\iid \\Ncal(\\bnull, \\bI_n/m)"}),". Bedingung ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"}),` ist die
Definition der Kovarianzmatrix. Für einen Einheitsvektor `,e.jsx(n,{children:"\\bv"}),` ist
`,e.jsx(n,{children:"\\bs_i^\\top\\bv \\sim \\Ncal(0, 1/m)"}),`, und das vierte Moment einer
zentrierten Normalverteilung ist das Dreifache des quadrierten zweiten:`]}),e.jsx(t,{children:`\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right] = 3\\left(\\frac{1}{m}\\right)^2 = \\frac{3}{m^2},
\\qquad\\text{also}\\qquad K = 3 .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Rademacher."})," ",e.jsx(n,{children:"s_{ij}"}),` unabhängig mit
`,e.jsx(n,{children:"\\Pr\\left(s_{ij} = 1/\\sqrt{m}\\right) = \\Pr\\left(s_{ij} = -1/\\sqrt{m}\\right) = 1/2"}),`.
Wegen `,e.jsx(n,{children:"\\E\\left[s_{ij}^2\\right] = 1/m"})," und ",e.jsx(n,{children:"\\E\\left[s_{ij}s_{ik}\\right] = 0"}),`
für `,e.jsx(n,{children:"j \\neq k"})," gilt wieder ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"}),`. Ausmultiplizieren der vierten Potenz
liefert für `,e.jsx(n,{children:"\\left\\|\\bv\\right\\| = 1"})]}),e.jsx(t,{children:`\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right]
= \\frac{3 - 2\\sum_{j=1}^n v_j^4}{m^2} \\le \\frac{3}{m^2} ,`}),e.jsxs(i.p,{children:["also ebenfalls ",e.jsx(n,{children:"K = 3"}),". Besser wird die Schranke, je stärker ",e.jsx(n,{children:"\\bv"}),` auf
wenige Koordinaten konzentriert ist: Für `,e.jsx(n,{children:"\\bv = \\be_1"}),` ist
`,e.jsx(n,{children:"\\sum_j v_j^4 = 1"})," und damit ",e.jsx(n,{children:"K = 1"}),`, für einen gestreuten Vektor dagegen
`,e.jsx(n,{children:"\\sum_j v_j^4 = 1/n"}),", also so gut wie die ",e.jsx(n,{children:"3"}),` des Gauss-Falls. Der
praktische Vorteil liegt ohnehin woanders, im Erzeugen und Speichern: ein
Bit pro Eintrag.`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Subsampling."})," ",e.jsx(n,{children:"\\bs_i = \\sqrt{n/m}\\,\\be_{K_i}"}),` mit
`,e.jsx(n,{children:"K_i \\sim \\unif\\{1, \\dots, n\\}"}),", die Skizze greift also ",e.jsx(n,{children:"m"}),` zufällige
Koordinaten heraus und skaliert sie. Auch hier ist
`,e.jsx(n,{children:"\\E\\left[\\bs_i\\bs_i^\\top\\right] = \\frac{n}{m}\\cdot\\frac{1}{n}\\bI_n = \\bI_n/m"}),`.
Das vierte Moment sieht aber anders aus:`]}),e.jsx(t,{children:`\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right]
= \\left(\\frac{n}{m}\\right)^2 \\frac{1}{n} \\sum_{j=1}^n v_j^4
= \\frac{n \\sum_{j=1}^n v_j^4}{m^2} ,
\\qquad\\text{also}\\qquad K = n\\sum_{j=1}^n v_j^4 .`}),e.jsxs(i.p,{children:["Dieses ",e.jsx(n,{children:"K"}),` hängt von den Daten ab. Für einen gestreuten Vektor mit
`,e.jsx(n,{children:"v_j = \\pm 1/\\sqrt{n}"})," ist ",e.jsx(n,{children:"\\sum_j v_j^4 = 1/n"})," und damit ",e.jsx(n,{children:"K = 1"}),`, besser als
Gauss. Für `,e.jsx(n,{children:"\\bv = \\be_1"})," dagegen ist ",e.jsx(n,{children:"K = n"}),`: Die gesamte Information steckt
in einer Koordinate, und die Stichprobe mit Zurücklegen erwischt sie mindestens
einmal nur mit Wahrscheinlichkeit`]}),e.jsx(t,{children:"1-\\left(1-\\frac1n\\right)^m,"}),e.jsxs(i.p,{children:["nicht mit ",e.jsx(n,{children:"m/n"}),`. Subsampling taugt also, wenn die Information über viele
Koordinaten verteilt ist, und versagt, wenn sie in wenigen sitzt. Der
Merksatz, Subsampling sei „nur gut für spezielle Daten", ist genau in dieser
Richtung zu lesen: Verteilte Information ist der gute Fall, wenige dominante
Koordinaten der schlechte.`]})]}),`
`,e.jsx(i.h3,{children:"Anwendungen"}),`
`,e.jsx(b,{kind:"Bemerkung",label:"8.4.12 (Wo Skizzen helfen)",id:"env-wo-skizzen-helfen",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Matrixprodukt."})," Für ",e.jsx(n,{children:"\\bA \\in \\R^{p \\times n}"}),` und
`,e.jsx(n,{children:"\\bB \\in \\R^{n \\times q}"}),` ist
`,e.jsx(n,{children:"\\bA\\bB \\approx \\left(\\bA\\bS^\\top\\right)\\left(\\bS\\bB\\right)"}),`. Der Grund ist
`,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen",children:"(8.4.2)"}),`: Wegen
`,e.jsx(n,{children:"\\E\\left[\\bS^\\top\\bS\\right] = \\sum_{i=1}^m \\E\\left[\\bs_i\\bs_i^\\top\\right] = \\bI_n"}),`
ist die rechte Seite `,e.jsx(l,{id:"unbiased-estimator",children:"erwartungstreu"}),` für
`,e.jsx(n,{children:"\\bA\\bB"}),". Statt ",e.jsx(n,{children:"pnq"}),` kostet das
`,e.jsx(l,{id:"matrix-product",children:"Matrixprodukt"})," dann ",e.jsx(n,{children:"pnm + mnq + pmq"}),` Multiplikationen,
für `,e.jsx(n,{children:"p = q = n"})," also rund ",e.jsx(n,{children:"3n^2m"})," statt ",e.jsx(n,{children:"n^3"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Kleinste Quadrate."}),`
`,e.jsx(n,{children:`\\min_{\\bx}\\left\\|\\bA\\bx - \\bb\\right\\|_2
\\approx \\min_{\\bx}\\left\\|\\bS\\bA\\bx - \\bS\\bb\\right\\|_2`}),`, siehe
`,e.jsx(i.a,{href:"#env-sketching-fuer-ein-kq-problem",children:"Algorithmus 8.4.13"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Approximative Zerlegungen."}),` Auch die randomisierte Näherung einer
`,e.jsx(l,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` aus
`,e.jsx(i.a,{href:"#sec-8.2",children:"Abschnitt 8.2"})," arbeitet mit einer Skizze des Spaltenraums."]}),`
`]})}),`
`,e.jsxs(i.p,{children:[`Ein Vorbehalt gilt für alle drei Punkte: Schneller wird ein Algorithmus nur,
wenn sich `,e.jsx(n,{children:"\\bS\\bx"})," schnell berechnen lässt. Zieht ",e.jsx(n,{children:"\\bS"})," nur ",e.jsx(n,{children:"m"}),` Komponenten
von `,e.jsx(n,{children:"\\bx"})," heraus, kostet das ",e.jsx(n,{children:"O(m)"}),` Operationen. Eine klassische schnelle Wahl
ist die `,e.jsx(i.em,{children:"Subsampled Randomized Hadamard Transform"}),` (SRHT). Ihre vollständige
Hadamard-Transformation kostet `,e.jsx(n,{children:"O(n\\log n)"}),` Rechenschritte; speziell geprunte
Varianten können unter zusätzlichen Implementationsannahmen weniger benötigen.
Bei einer dichten Gauss-Matrix dagegen kostet
`,e.jsx(n,{children:"\\bS\\bx"})," schon ",e.jsx(n,{children:"O(mn)"}),` Operationen, und dann kann die Skizze teurer sein als
das Problem, das sie vereinfachen soll.`]}),`
`,e.jsxs(b,{kind:"Algorithmus",label:"8.4.13 (Sketching für ein KQ-Problem)",id:"env-sketching-fuer-ein-kq-problem",children:[e.jsxs(i.p,{children:["Gegeben ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times p}"})," mit ",e.jsx(n,{children:"n \\gg p"}),", ",e.jsx(n,{children:"\\bb \\in \\R^n"}),` und eine
Skizzengröße `,e.jsx(n,{children:"m"})," mit ",e.jsx(n,{children:"p < m \\ll n"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Ziehe eine Sketching-Matrix ",e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"}),"."]}),`
`,e.jsxs(i.li,{children:["Berechne ",e.jsx(n,{children:"\\bS\\bA \\in \\R^{m \\times p}"})," und ",e.jsx(n,{children:"\\bS\\bb \\in \\R^m"}),"."]}),`
`,e.jsxs(i.li,{children:[`Löse das kleine Problem
`,e.jsx(n,{children:"\\min_{\\bx}\\left\\|(\\bS\\bA)\\bx - \\bS\\bb\\right\\|_2"}),`, etwa per
`,e.jsx(l,{id:"qr-factorization",children:"QR-Zerlegung"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),")."]}),`
`]}),e.jsxs(i.p,{children:["Schritt 3 kostet ",e.jsx(n,{children:"O(mp^2)"})," statt ",e.jsx(n,{children:"O(np^2)"}),` für das
`,e.jsx(l,{id:"linear-least-squares",children:"Ausgangsproblem"}),`. Ob sich das lohnt, entscheidet
Schritt 2: Eine dichte Gauss-Matrix braucht dort `,e.jsx(n,{children:"O(mnp)"}),` Operationen, und
wegen `,e.jsx(n,{children:"m > p"})," ist das mehr als die ",e.jsx(n,{children:"O(np^2)"}),`, die wir sparen wollten. Erst
mit schnell anwendbaren Skizzen wie der SRHT geht die Rechnung auf.`]})]}),`
`,e.jsxs(i.h3,{children:["Wie klein darf ",e.jsx(n,{children:"m"})," sein?"]}),`
`,e.jsxs(b,{kind:"Beispiel",label:"8.4.14 (Dimensionsreduktion mit Matrix-Sketching)",id:"env-dimensionsreduktion-mit-matrix-sketching",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"n = 10\\,000"}),` Dimensionen, eine Fehlerwahrscheinlichkeit
`,e.jsx(n,{children:"\\delta = 0{,}05"})," und eine zulässige Verzerrung ",e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"}),`. Wie
klein darf `,e.jsx(n,{children:"m"})," sein? Wir lösen ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"})," nach ",e.jsx(n,{children:"m"}),` auf und setzen für
Gauss-Zeilen `,e.jsx(n,{children:"K = 3"})," ein:"]}),e.jsx(P,{tag:"8.4.5",id:"eq-dimensionsreduktion-mit-matrix-sketching",children:`\\corange{\\eps} = \\sqrt{\\frac{K}{\\delta m}}
\\quad\\Longleftrightarrow\\quad
m = \\frac{K}{\\delta\\,\\corange{\\eps}^2}
= \\frac{3}{0{,}05 \\cdot 0{,}01}
= 6000 .`}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"m = 6000"}),` Dimensionen bleibt der Abstand eines vorher festgelegten
Punktepaares mit Wahrscheinlichkeit `,e.jsx(n,{children:"95\\,\\%"})," auf ",e.jsx(n,{children:"10\\,\\%"}),` genau erhalten,
gemessen im Quadrat der Länge, in der Länge selbst auf rund `,e.jsx(n,{children:"5\\,\\%"}),`, denn
`,e.jsx(n,{children:"\\sqrt{1 \\pm 0{,}1}"})," weicht von ",e.jsx(n,{children:"1"})," nur um rund ",e.jsx(n,{children:"5\\,\\%"}),` ab. Der Speicher sinkt
von `,e.jsx(n,{children:"10\\,000"})," auf ",e.jsx(n,{children:"6000"})," Zahlen je Punkt, ein Faktor ",e.jsx(n,{children:"n/m \\approx 1{,}7"}),`, und
eine einzelne Distanzberechnung kostet statt `,e.jsx(n,{children:"O(n)"})," nur noch ",e.jsx(n,{children:"O(m)"}),`
Operationen, ebenfalls ein Faktor `,e.jsx(n,{children:"n/m"}),`. Davon leben die typischen
Anwendungen: die Suche nach nächsten Nachbarn und die Clusteranalyse
in hohen Dimensionen. Beide berühren die Daten fast nur über Abstände, und
die bleiben unter der Skizze erhalten.`]}),e.jsxs(i.p,{children:["Umgekehrt gelesen sagt ",e.jsx(i.a,{href:"#eq-dimensionsreduktion-mit-matrix-sketching",children:"(8.4.5)"}),` auch, was ein zehnmal kleineres
`,e.jsx(n,{children:"m = 600"}),` hergibt: bei
`,e.jsx(n,{children:"\\delta = 0{,}05"})," nur ",e.jsx(n,{children:"\\corange{\\eps} = \\sqrt{3/(0{,}05 \\cdot 600)} = \\sqrt{0{,}1} \\approx 0{,}32"}),`,
und bei `,e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"})," nur ",e.jsx(n,{children:"\\delta = 3/(600 \\cdot 0{,}01) = 0{,}5"}),`,
also die Verlässlichkeit eines Münzwurfs.`]})]}),`
`,e.jsx(b,{kind:"Bemerkung",label:"8.4.15 (Was der Gewinn wirklich ist)",id:"env-zwei-nachtraege-zur-rechnung",children:e.jsxs(i.p,{children:[`Ein Nachtrag zu dieser Rechnung, und dabei lohnt der Blick darauf, was genau
gerechnet wird: Eine einzelne euklidische
Distanz kostet `,e.jsx(n,{children:"O(n)"}),` Operationen, der Gewinn ist deshalb der Faktor
`,e.jsx(n,{children:"n/m \\approx 1{,}7"}),` und nicht sein Quadrat. Quadratisch in der Dimension sind
nur bestimmte Verfahren, etwa das Aufstellen einer
`,e.jsx(l,{id:"covariance-matrix",children:"Kovarianzmatrix"}),", und nur dort schlägt ",e.jsx(n,{children:"(n/m)^2"}),` zu
Buche.`]})}),`
`,e.jsx(q,{title:"Warum in der Praxis viel kleinere Skizzen genügen",children:e.jsxs(i.p,{children:[`Warum wird in der Praxis mit Skizzengrößen in der Größenordnung einiger
hundert gearbeitet, wo die Rechnung oben `,e.jsx(n,{children:"m = 6000"}),` verlangt? Der Grund ist
unser Werkzeug: Tschebyscheff benutzt nur zwei Momente und ist entsprechend
grob.
Wie grob, lässt sich für Gauss-Skizzen ausnahmsweise exakt sagen. Nach `,e.jsx(i.a,{href:"#env-sketching-zweier-vektoren-mit-10-000",children:"Beispiel 8.4.5"}),` ist
`,e.jsx(n,{children:"\\left\\|\\bS\\bx\\right\\|^2/\\left\\|\\bx\\right\\|^2"})," dort ",e.jsx(n,{children:"\\chi^2_m/m"}),`-verteilt,
und deren Verteilungsfunktion verlangt für `,e.jsx(n,{children:"\\corange{\\eps} = 0{,}1"}),` und
`,e.jsx(n,{children:"\\delta = 0{,}05"})," nur ",e.jsx(n,{children:"m = 768"}),` Zeilen. Tschebyscheff fordert das Achtfache.
Für andere Verteilungen steht diese exakte Rechnung nicht zur Verfügung,
schärfere Konzentrationsungleichungen dagegen schon: Sie liefern ein `,e.jsx(n,{children:"m"}),` der
Größenordnung `,e.jsx(n,{children:"\\corange{\\eps}^{-2}\\log(1/\\delta)"}),`, also eine logarithmische
statt einer linearen Abhängigkeit von `,e.jsx(n,{children:"1/\\delta"}),`. Der Preis dafür sind
deutlich mehr Voraussetzungen und ein längerer Beweis (Literatur am Ende des
Abschnitts).`]})}),`
`,e.jsxs(q,{title:"Vergleich weiterer Sketching-Matrizen",children:[e.jsx(i.h3,{children:"Vergleich der Sketching-Matrizen"}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Typ"}),e.jsx(i.th,{children:"Speicher"}),e.jsxs(i.th,{children:["Zeit für ",e.jsx(n,{children:"\\bS\\bx"})]}),e.jsx(i.th,{children:"Qualität"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Gauss"}),e.jsx(i.td,{children:e.jsx(n,{children:"O(mn)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(mn)"})}),e.jsx(i.td,{children:"optimal"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Rademacher (",e.jsx(n,{children:"\\pm 1/\\sqrt{m}"}),")"]}),e.jsx(i.td,{children:e.jsx(n,{children:"O(mn)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(mn)"})}),e.jsx(i.td,{children:"optimal"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Subsampling"}),e.jsx(i.td,{children:e.jsx(n,{children:"O(m)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(m)"})}),e.jsx(i.td,{children:"gut bei gestreuten Daten"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"SRHT (Hadamard)"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"O(n+m)"})," oder reproduzierbar erzeugte Vorzeichen"]}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n \\log n)"})}),e.jsx(i.td,{children:"sehr gut"})]})]})]}),e.jsxs(i.p,{children:[`Speicher und Rechenzeit stehen in
`,e.jsx(l,{id:"big-o-notation",children:"Landau-Notation"}),": einmal für das Vorhalten von ",e.jsx(n,{children:"\\bS"}),`,
einmal für ein einzelnes Produkt `,e.jsx(n,{children:"\\bS\\bx"}),"."]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Gauss"})," ist theoretisch optimal, aber teuer: ",e.jsx(n,{children:"mn"}),` Zahlen speichern und
`,e.jsx(n,{children:"mn"})," Multiplikationen je Vektor."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Rademacher"})," ist genauso gut, wie ",e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.11"})," mit ",e.jsx(n,{children:"K = 3"}),` zeigt, und
einfacher zu erzeugen, weil nur Vorzeichen gewürfelt werden.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Subsampling"})," wählt ",e.jsx(n,{children:"m"}),` zufällige Koordinaten und ist damit extrem
schnell. Die Qualität hängt allerdings an den Daten: Nach `,e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.11"}),`
ist `,e.jsx(n,{children:"K = n\\sum_j v_j^4"}),`, für gestreute Vektoren klein und für konzentrierte
Vektoren so groß wie `,e.jsx(n,{children:"n"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"SRHT"}),` verbindet beides. Die Matrix wird nicht explizit gespeichert,
sondern durch eine schnelle Transformation angewendet, daher die
`,e.jsx(n,{children:"O(n \\log n)"})," in der Tabelle. Neben den ",e.jsx(n,{children:"m"})," gezogenen Indizes gehören ",e.jsx(n,{children:"n"}),`
Vorzeichen zur Transformation; sie werden gespeichert oder reproduzierbar
aus einem Seed erzeugt. Die Arbeitskopie des transformierten Vektors benötigt
unabhängig davon `,e.jsx(n,{children:"O(n)"})," Speicher."]}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(N,{children:[e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Es gibt eine Matrix ",e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"m < n"}),`, die alle Abstände
exakt erhält.`]}),e.jsxs(i.p,{children:["Eine solche Matrix hat höchstens Rang ",e.jsx(n,{children:"m < n"}),`, also einen nichttrivialen
Kern. Für ein `,e.jsx(n,{children:"\\bx \\neq \\bnull"})," mit ",e.jsx(n,{children:"\\bS\\bx = \\bnull"}),` schrumpft der Abstand
zum Nullpunkt auf `,e.jsx(n,{children:"0"}),`. Sketching kann Abstände nur näherungsweise und nur mit
hoher Wahrscheinlichkeit erhalten (`,e.jsx(i.a,{href:"#env-ein-fester-vektor-ist-nicht-jeder-vektor",children:"Bemerkung 8.4.10"}),")."]})]}),e.jsxs(z,{wahr:!0,children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-zufaellige-einbettung-eines-festen",children:"Satz 8.4.6"})," macht eine Aussage über einen vorher festgelegten Vektor ",e.jsx(n,{children:"\\bx"}),`,
nicht gleichzeitig über alle `,e.jsx(n,{children:"\\bx \\in \\R^n"}),"."]}),e.jsxs(i.p,{children:["Im Beweis wird ",e.jsx(n,{children:"\\bx"})," fixiert, bevor ",e.jsx(n,{children:"\\bS"}),` gezogen wird; die Ausnahmemenge
darf für jedes `,e.jsx(n,{children:"\\bx"}),` eine andere sein. Gleichmäßige Aussagen über einen ganzen
Unterraum brauchen ein Netzargument und eine Vereinigungsschranke
(`,e.jsx(i.a,{href:"#env-ein-fester-vektor-ist-nicht-jeder-vektor",children:"Bemerkung 8.4.10"}),")."]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Verdoppeln wir ",e.jsx(n,{children:"m"}),`, so halbiert sich die garantierte Verzerrung
`,e.jsx(n,{children:"\\corange{\\eps}"}),"."]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-3",children:"(8.4.4)"})," ist ",e.jsx(n,{children:"\\eps = \\sqrt{K/(\\delta m)}"}),`, also proportional zu
`,e.jsx(n,{children:"1/\\sqrt{m}"}),". Verdoppeltes ",e.jsx(n,{children:"m"})," drückt ",e.jsx(n,{children:"\\eps"}),` nur um den Faktor
`,e.jsx(n,{children:"1/\\sqrt{2} \\approx 0{,}71"}),`; für die Halbierung brauchen wir viermal so viele
Zeilen.`]})]}),e.jsxs(z,{wahr:!0,children:[e.jsxs(i.p,{children:["Für Gauss-Zeilen ",e.jsx(n,{children:"\\bs_i \\sim \\Ncal(\\bnull, \\bI_n/m)"}),` gilt
`,e.jsx(n,{children:"\\E\\left[\\left(\\bs_i^\\top\\bv\\right)^4\\right] = 3/m^2"})," für jeden Vektor ",e.jsx(n,{children:"\\bv"}),`
mit `,e.jsx(n,{children:"\\left\\|\\bv\\right\\| = 1"}),"."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"\\bs_i^\\top\\bv \\sim \\Ncal(0, 1/m)"}),`, und das vierte Moment einer
zentrierten Normalverteilung ist `,e.jsx(n,{children:"3\\sigma^4"})," (",e.jsx(i.a,{href:"#env-gauss-rademacher-subsampling",children:"Beispiel 8.4.11"}),`). Damit ist
`,e.jsx(i.a,{href:"#eq-zufaellige-einbettung-eines-festen-2",children:"(8.4.3)"})," mit ",e.jsx(n,{children:"K = 3"})," erfüllt, und zwar mit Gleichheit."]})]}),e.jsxs(z,{wahr:!1,children:[e.jsx(i.p,{children:"Subsampling ist für beliebige Daten genauso gut wie eine Gauss-Skizze."}),e.jsxs(i.p,{children:["Für Subsampling ist ",e.jsx(n,{children:"K = n\\sum_j v_j^4"}),` und hängt damit von den Daten ab.
Bei gestreuten Vektoren ist `,e.jsx(n,{children:"K = 1"})," und damit besser als die ",e.jsx(n,{children:"3"}),` der
Gauss-Skizze, beim Standard-Basisvektor `,e.jsx(n,{children:"\\be_1"})," dagegen ",e.jsx(n,{children:"K = n"}),`. Die Tabelle oben
schreibt deshalb „gut bei gestreuten Daten" und nicht „optimal".`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Die wahrscheinlichkeitstheoretischen Werkzeuge, also
Zufallsmatrizen und Konzentrationsungleichungen, behandelt R. Vershynin,
High-Dimensional Probability (Cambridge University Press, 2018); die
Sketching-Algorithmen selbst, samt SRHT und gesketchten KQ-Problemen,
P.-G. Martinsson und J. A. Tropp, Randomized numerical linear algebra:
Foundations and algorithms, Acta Numerica 29 (2020).`})})]})}function Jn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(He,{...r})}):He(r)}function Ue(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Bis Kapitel 7 lief fast alles über ",e.jsx(i.em,{children:"Zerlegungen"}),`. LU, Cholesky, QR und die SVD
schreiben eine Matrix als Produkt handlicher Faktoren, und die eigentliche
Rechnung findet danach in diesen Faktoren statt. Das ist exakt bis auf
Rundungsfehler, und es kostet, was es kostet: rund `,e.jsx(n,{children:"n^3"}),` Operationen, gleich ob
wir drei Stellen brauchen oder fünfzehn. In diesem Kapitel sind zwei
Bauprinzipien dazugekommen, die diesen festen Preis drücken, indem sie etwas
anderes dafür hergeben.`]}),`
`,e.jsx(i.h3,{children:"Die drei Kernideen"}),`
`,e.jsx(b,{kind:"Bemerkung",label:"8.5.1 (Die drei Kernideen)",id:"env-die-drei-kernideen",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Eigenwerte berechnen wir iterativ."}),` Das charakteristische Polynom
beschreibt die `,e.jsx(l,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` zwar vollständig,
taugt aber nicht als Algorithmus (`,e.jsx(i.a,{href:"#env-warum-das-charakteristische-polynom-kein",children:"Bemerkung 8.1.1"}),`). Stattdessen wenden wir
die Matrix immer wieder an. Die Potenzmethode (`,e.jsx(i.a,{href:"#env-potenzmethode",children:"Algorithmus 8.1.2"}),`) holt mit
einem `,e.jsx(l,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"}),` pro Schritt das
betragsgrößte Eigenpaar, sofern der größte Eigenwert einsam an der Spitze
steht (`,e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),"); die QR-Iteration (",e.jsx(i.a,{href:"#env-qr-iteration",children:"Algorithmus 8.1.10"}),`) liefert unter den
Voraussetzungen von `,e.jsx(i.a,{href:"#env-wogegen-die-qr-iteration-konvergiert",children:"Bemerkung 8.1.14"}),` alle Eigenwerte auf einmal, im Grunde
als simultane Potenzmethode auf allen Koordinatenachsen (`,e.jsx(i.a,{href:"#env-die-qr-iteration-ist-eine-simultane",children:"Bemerkung 8.1.13"}),`).
Getragen wird die QR-Iteration von der Ähnlichkeit: Jeder Schritt ersetzt
`,e.jsx(n,{children:"\\bA^{(k-1)}"})," durch eine ähnliche Matrix (",e.jsx(i.a,{href:"#env-die-iterierten-sind-aehnlich-zu-a",children:"Satz 8.1.11"}),`), und
`,e.jsx(l,{id:"similar-matrices",children:"ähnliche Matrizen"}),` haben dasselbe Spektrum
(`,e.jsx(i.a,{href:"#env-aehnliche-matrizen-haben-dieselben",children:"Satz 8.1.7"}),"). Wie weit das trägt, zeigt ",e.jsx(i.a,{href:"#sec-8.2",children:"Abschnitt 8.2"}),`: PageRank
ist eine Potenzmethode auf einer `,e.jsx(l,{id:"sparse-matrix",children:"dünnbesetzten"}),` Matrix mit
rund `,e.jsx(n,{children:"10^{10}"}),` Zeilen, die Hauptkomponentenanalyse eine Eigenwertaufgabe für
die `,e.jsx(l,{id:"covariance-matrix",children:"Kovarianzmatrix"}),`, und die approximative
`,e.jsx(l,{id:"singular-value-decomposition",children:"SVD"})," liefert die ",e.jsx(n,{children:"k"}),` größten Singulärwerte,
ohne die Matrix je vollständig zu zerlegen.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Iterative Verfahren sind Fixpunktiterationen."}),` Aus dem Residuum
`,e.jsx(n,{children:"\\cred{\\br^{(k-1)}} = \\bb - \\bA\\,\\cblue{\\bx^{(k-1)}}"}),` wird eine Korrektur,
und ausmultipliziert steht dort die affine Vorschrift
`,e.jsx(n,{children:"\\cblue{\\bx^{(k)}} = \\bB\\,\\cblue{\\bx^{(k-1)}} + \\bC\\bb"}),` mit
`,e.jsx(n,{children:"\\bB = \\bI_n - \\bC\\bA"})," (",e.jsx(i.a,{href:"#env-fixpunktform",children:"Bemerkung 8.3.4"}),`). Ob die Folge zusammenläuft,
entscheidet allein die Iterationsmatrix `,e.jsx(n,{children:"\\bB"}),`. Hinreichend dafür ist
`,e.jsx(n,{children:"\\corange{\\rho} = \\left\\|\\bB\\right\\|_2 < 1"}),`: Dann schrumpft der Fehler in
jedem Schritt auf höchstens das `,e.jsx(n,{children:"\\corange{\\rho}"}),"-Fache (",e.jsx(i.a,{href:"#env-konvergenz-der-korrekturiteration",children:"Satz 8.3.5"}),`). Notwendig ist die
kleine Norm nicht, auf lange Sicht zählt der
`,e.jsx(l,{id:"spectral-radius",children:"Spektralradius"})," (",e.jsx(i.a,{href:"#env-die-drei-wahlen-an-einem-2-2-system",children:"Beispiel 8.3.9"}),`). Diese
`,e.jsx(l,{id:"fixed-point-iteration",children:"Fixpunktstruktur"}),` verbindet beide Hälften des
Kapitels. Auch die Potenzmethode ist eine: Die Abbildung
`,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx/\\left\\|\\bA\\bx\\right\\|"}),` lässt genau die normierten
`,e.jsx(l,{id:"eigenvalue-eigenvector",children:"Eigenvektoren"}),` zu Eigenwerten
`,e.jsx(n,{children:"\\lambda \\neq 0"}),` fest, bis auf ihr Vorzeichen, und
die Rate heißt dort `,e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"}),` statt
`,e.jsx(n,{children:"\\corange{\\rho}"})," (",e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:`Probabilistische Verfahren ersetzen ein schweres Problem durch ein
zufälliges, kleineres.`}),` Eine geeignet gezogene Matrix
`,e.jsx(n,{children:"\\bS \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"m \\ll n"}),` erhält die Abstände und Winkel
`,e.jsx(i.em,{children:"vorher festgelegter"}),` Punkte mit hoher Wahrscheinlichkeit näherungsweise
(`,e.jsx(i.a,{href:"#sec-8.4",children:"Abschnitt 8.4"}),`). Für alle Vektoren zugleich gilt das nicht,
schon weil `,e.jsx(n,{children:"\\bS"})," einen nichttrivialen Kern hat (",e.jsx(i.a,{href:"#env-ein-fester-vektor-ist-nicht-jeder-vektor",children:"Bemerkung 8.4.10"}),`). Statt mit
`,e.jsx(n,{children:"\\bA"})," rechnen wir mit der Skizze ",e.jsx(n,{children:"\\bS\\bA"}),` weiter, und aus einem
`,e.jsx(n,{children:"n"}),"-dimensionalen Problem wird ein ",e.jsx(n,{children:"m"}),`-dimensionales. Die Garantie ist dafür
von anderer Art als bisher: Sie gilt nur mit Wahrscheinlichkeit
`,e.jsx(n,{children:"1 - \\delta"}),"."]}),`
`]})}),`
`,e.jsx(i.p,{children:`Die zweite und die dritte Idee laufen auf dasselbe Geschäft hinaus: Wir geben
Genauigkeit her und bekommen Laufzeit zurück. Nur sitzt der Regler an
verschiedenen Stellen.`}),`
`,e.jsx(i.h3,{children:"Laufzeit gegen Genauigkeit"}),`
`,e.jsxs(b,{kind:"Bemerkung",label:"8.5.2 (Zwei Regler und ihre Preise)",id:"env-zwei-regler-und-ihre-preise",children:[e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Zugang"}),e.jsx(i.th,{children:"Regler"}),e.jsx(i.th,{children:"Kosten"}),e.jsx(i.th,{children:"Was wir bekommen"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Zerlegung (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Kapitel 5"}),", ",e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Kapitel 7"}),")"]}),e.jsx(i.td,{children:"keiner"}),e.jsxs(i.td,{children:["fest, Größenordnung ",e.jsx(n,{children:"n^3"})]}),e.jsx(i.td,{children:"Lösung bis auf Rundungsfehler"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Iteration (",e.jsx(i.a,{href:"#sec-8.1",children:"8.1"}),", ",e.jsx(i.a,{href:"#sec-8.3",children:"8.3"}),")"]}),e.jsxs(i.td,{children:["Iterationszahl ",e.jsx(n,{children:"k"})]}),e.jsxs(i.td,{children:[e.jsx(n,{children:"k"})," mal die Kosten eines Schritts"]}),e.jsxs(i.td,{children:["Fehler höchstens ",e.jsx(n,{children:"\\corange{\\rho}^{\\,k}"})," mal Startfehler"]})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Sketching (",e.jsx(i.a,{href:"#sec-8.4",children:"8.4"}),")"]}),e.jsxs(i.td,{children:["Skizzengröße ",e.jsx(n,{children:"m"})]}),e.jsxs(i.td,{children:["Rechnen in ",e.jsx(n,{children:"\\R^m"})," statt in ",e.jsx(n,{children:"\\R^n"})]}),e.jsxs(i.td,{children:["Verzerrung ",e.jsx(n,{children:"\\eps"})," je festem Paar, mit Wahrscheinlichkeit ",e.jsx(n,{children:"1 - \\delta"})]})]})]})]}),e.jsxs(i.p,{children:[`Die beiden Regler haben sehr verschiedene Preisschilder. Bei der Iteration
fällt der Fehler geometrisch, die Schrittzahl wächst deshalb nur wie
`,e.jsx(n,{children:"\\log(1/\\eps)"})," (",e.jsx(i.a,{href:"#env-zahl-der-iterationen",children:"Korollar 8.3.6"}),`); die Zahlen dazu stehen bei
`,e.jsx(i.a,{href:"#env-richardson-iteration",children:"Beispiel 8.3.11"}),`. Beim Sketching fällt die Verzerrung dagegen
nur wie `,e.jsx(n,{children:"1/\\sqrt{m}"}),`: Wer
doppelt so viele Zeilen zieht, drückt sie auf das `,e.jsx(n,{children:"1/\\sqrt{2} \\approx 0{,}71"}),`-fache,
und eine zusätzliche Dezimalstelle verlangt die hundertfache Skizzengröße.`]}),e.jsxs(i.p,{children:["Ein fairer Vergleich ist das trotzdem nicht, denn die beiden ",e.jsx(n,{children:"\\eps"}),` messen
Verschiedenes: einmal den Abstand zur Lösung, einmal die Verzerrung der
Geometrie. Die Faustregel, die bleibt: Wo hohe Genauigkeit gefragt ist,
iterieren wir; wo eine grobe Antwort genügt und `,e.jsx(n,{children:"n"})," riesig ist, würfeln wir."]})]}),`
`,e.jsx(i.h3,{children:"Ausblick"}),`
`,e.jsxs(i.p,{children:[`Mit diesem Kapitel endet der erste Block des Skripts, die numerische lineare
Algebra (`,e.jsx(i.a,{href:"?k=01-intro#sec-1.1",children:"Abschnitt 1.1"}),`). Das nächste Kapitel beginnt
mit `,e.jsx(l,{id:"tensor",children:"Tensoren"}),` und Tensorprodukten. Ein Tensor ist ein
mehrdimensionales Zahlenfeld, die Matrix also der zweidimensionale Sonderfall.
Gebraucht werden sie, sobald wir nach Matrizen ableiten wollen, denn jedes
Differenzieren hängt der Buchführung eine weitere Dimension an. Die Fragen
bleiben dabei dieselben wie hier: zerlegen, approximieren, iterieren.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx(i.p,{children:"Fünf Aussagen zu den Kernideen dieses Kapitels. Welche stimmen?"}),`
`,e.jsxs(N,{children:[e.jsxs(z,{wahr:!0,children:[e.jsx(i.p,{children:`Die Eigenwerte einer großen Matrix bestimmen wir besser nicht über die
Nullstellen des charakteristischen Polynoms.`}),e.jsxs(i.p,{children:["Drei Gründe stehen in ",e.jsx(i.a,{href:"#env-warum-das-charakteristische-polynom-kein",children:"Bemerkung 8.1.1"}),". Ab Grad ",e.jsx(n,{children:"5"}),` gibt es keine allgemeine
Lösungsformel mehr, wir müssten die Nullstellen also ohnehin iterativ suchen.
Der Umweg über die Koeffizienten ist schlecht konditioniert. Und schon das
Aufstellen kostet mehr als eine ganze Matrixzerlegung.`]})]}),e.jsxs(z,{wahr:!1,children:[e.jsx(i.p,{children:`Iterative Verfahren liefern grundsätzlich nur Näherungen; die exakte Lösung
erreichen sie nie.`}),e.jsxs(i.p,{children:["In Sonderfällen erreichen sie sie sehr wohl (",e.jsx(i.a,{href:"#env-was-iterative-verfahren-leisten",children:"Bemerkung 8.3.12"}),`). Mit
`,e.jsx(n,{children:"\\bC = \\bA^{-1}"})," ist ",e.jsx(n,{children:"\\corange{\\rho} = 0"}),`, und ein einziger Schritt trifft die
Lösung; Verfahren vom Krylov-Typ wie das der konjugierten Gradienten kommen in
exakter Arithmetik nach höchstens `,e.jsx(n,{children:"n"}),` Schritten an. Nützlich ist das selten,
denn `,e.jsx(n,{children:"\\bA^{-1}"})," zu kennen wäre teurer als das Gleichungssystem selbst."]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Potenzmethode konvergiert umso schneller, je näher ",e.jsx(n,{children:"|\\lambda_2|"}),` bei
`,e.jsx(n,{children:"|\\lambda_1|"})," liegt."]}),e.jsxs(i.p,{children:["Es ist genau umgekehrt. Die Rate ist ",e.jsx(n,{children:"\\corange{|\\lambda_2/\\lambda_1|}"}),`
(`,e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),"), und die geht gegen ",e.jsx(n,{children:"1"}),`, sobald sich die beiden Eigenwerte
nähern; im Grenzfall `,e.jsx(n,{children:"|\\lambda_2| = |\\lambda_1|"})," trägt ",e.jsx(i.a,{href:"#env-konvergenz-der-potenzmethode",children:"Satz 8.1.4"}),` gar nicht
mehr (`,e.jsx(i.a,{href:"#env-wann-die-potenzmethode-versagt",children:"Bemerkung 8.1.6"}),`). Dieselbe Nähe macht auch die Eigenvektoren schlecht
konditioniert (`,e.jsx(i.a,{href:"#env-kondition-von-eigenwertproblemen",children:"Bemerkung 8.1.16"}),")."]})]}),e.jsxs(z,{wahr:!0,children:[e.jsx(i.p,{children:`Verschärfen wir bei der Korrekturiteration die geforderte Genauigkeit, so
wächst die nötige Schrittzahl nur logarithmisch.`}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-zahl-der-iterationen",children:"Korollar 8.3.6"}),": ",e.jsx(n,{children:"k = O(\\log(1/\\eps))"}),`, weil der Fehler in jedem
Schritt auf höchstens das `,e.jsx(n,{children:"\\corange{\\rho}"}),`-Fache schrumpft. Bei
`,e.jsx(n,{children:"\\corange{\\rho} \\approx \\corange{0{,}405}"}),` sind das rund zweieinhalb Schritte
je Dezimalstelle, unabhängig davon, bei welcher Stelle wir gerade sind.`]})]}),e.jsxs(z,{wahr:!1,children:[e.jsxs(i.p,{children:["Verdoppeln wir beim Sketching die Zeilenzahl ",e.jsx(n,{children:"m"}),`, so halbiert sich die
Verzerrung.`]}),e.jsxs(i.p,{children:["Die Schranke aus ",e.jsx(i.a,{href:"#sec-8.4",children:"Abschnitt 8.4"})," fällt wie ",e.jsx(n,{children:"1/\\sqrt{m}"}),`, nicht wie
`,e.jsx(n,{children:"1/m"}),`. Doppelt so viele Zeilen drücken die Verzerrung deshalb nur auf das
`,e.jsx(n,{children:"1/\\sqrt{2} \\approx 0{,}71"}),`-fache; halbieren lässt sie sich erst mit der
vierfachen Skizzengröße. Genauigkeit ist bei zufälligen Verfahren der teure
Teil, Dimensionsreduktion der billige.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §4.5 zu den Eigenwertverfahren, Heath §10.9 zu den
iterativen Lösern für lineare Gleichungssysteme. Die
wahrscheinlichkeitstheoretischen Werkzeuge hinter den Sketching-Schranken
behandelt R. Vershynin, High-Dimensional Probability, Cambridge University
Press 2018.`})})]})}function Yn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ue,{...r})}):Ue(r)}const ii={sections:[{id:"8.1",key:"eigenwerte",title:"Eigenwertprobleme: Potenzmethode und QR-Iteration",C:J(wn)},{id:"8.2",key:"anwendungen",title:"Anwendungen: PageRank, PCA und approximative SVD",C:J(Pn)},{id:"8.3",key:"iterative-loeser",title:"Iterative Löser für lineare Gleichungssysteme",C:J(Cn)},{id:"8.4",key:"sketching",title:"Probabilistische Methoden: Matrix-Sketching",C:J(Jn)},{id:"8.5",key:"zusammenfassung",title:"Zusammenfassung",C:J(Yn)}]};export{ii as default};
