import{r as w,j as e,M as n,b as A,F as v,A as te,W as Pe,d as xe,S as K,e as G,V as H,f as P,g as Ge,h as ge,C as h,E as x,a as d,Q as le,Z as Q,i as V,k as Ue,l as N,L as me,P as je,n as S,m as Y}from"./index-GbyLwDE5.js";import{I as de,E as L}from"./Interaktiv-DHZUUTxv.js";const ke=v.rot,ye=v.blau,re=v.gruen,be=v.orange,He=20;function fe(r){let i=0;for(const s of r)i+=s;return i/r.length}function Fe(r){const i=Math.abs(r);return!(i>0)||!Number.isFinite(i)?0:2**(Math.floor(Math.log2(i))-52)}const Qe="⁰¹²³⁴⁵⁶⁷⁸⁹";function De(r){const i=Math.abs(r).toString().split("").map(s=>Qe[Number(s)]).join("");return r<0?`⁻${i}`:i}function Ie(r){const i=Math.floor(Math.log10(Math.abs(r)));return`${Ge(r/10**i,1)} · 10${De(i)}`}function O(r){if(!Number.isFinite(r))return"–";if(r===0)return"0";const i=Math.abs(r);if(i>=1e21||i<.001)return Ie(r);if(i>=1e4)return r.toLocaleString("de-DE",{maximumFractionDigits:1}).replace(/^-/,"−");const s=Ge(r,i>=100?1:i>=1?2:4);return s.includes(",")?s.replace(/0+$/,"").replace(/,$/,""):s}function Ce(r){if(!Number.isFinite(r)||r===0)return O(r);const i=Math.abs(r);return i>=1e4||i<.001?Ie(r):O(r)}const oe=-18,Me=22,$=460,ae=104,we=10,qe=10,E=62,ee=r=>we+(Math.min(Me,Math.max(oe,r))-oe)/(Me-oe)*($-we-qe);function Je({aufloesung:r,ziel:i,zielName:s,ariaLabel:c}){const t=r>0?Math.log10(r):oe,_=Math.log10(i),m=ee(t),f=ee(_),p=r>i,u=[-16,-8,0,8,16];return e.jsxs("svg",{viewBox:`0 0 ${$} ${ae}`,className:"h-auto max-w-full rounded border border-slate-300 dark:border-slate-600 [.w-dark_&]:border-slate-600",role:"img","aria-label":c,children:[e.jsx("rect",{width:$,height:ae,fill:"var(--w-bg)"}),p&&e.jsx("rect",{x:f,y:E-10,width:Math.max(0,m-f),height:20,fill:ke,fillOpacity:.14}),e.jsx("line",{x1:we,x2:$-qe,y1:E,y2:E,stroke:"var(--w-axis)",strokeWidth:1.5}),e.jsx("g",{fill:"var(--w-muted)",fontSize:11,fontFamily:"ui-monospace, SFMono-Regular, monospace","aria-hidden":"true",children:u.map(b=>e.jsxs("g",{children:[e.jsx("line",{x1:ee(b),x2:ee(b),y1:E-3,y2:E+3,stroke:"var(--w-axis)",strokeWidth:1}),e.jsxs("text",{x:ee(b),y:E+14,textAnchor:"middle",children:["10",De(b)]})]},b))}),e.jsx("line",{x1:f,x2:f,y1:E,y2:ae-20,stroke:re,strokeWidth:2}),e.jsx("circle",{cx:f,cy:E,r:4,fill:re}),e.jsxs("text",{x:Math.min(f,$-110),y:ae-6,fill:re,fontSize:12,fontFamily:"ui-sans-serif, sans-serif",children:["gesucht: ",s]}),e.jsx("line",{x1:m,x2:m,y1:16,y2:E,stroke:be,strokeWidth:2}),e.jsx("circle",{cx:m,cy:E,r:4,fill:be}),e.jsxs("text",{x:Math.min(Math.max(m-50,2),$-150),y:12,fill:be,fontSize:12,fontFamily:"ui-sans-serif, sans-serif",children:["Auflösung hier: ",Ce(r)]})]})}function Xe({startModus:r="varianz"}={}){const[i,s]=w.useState(r),[c,t]=w.useState(6),_=10**c,m=[4,7,13,16].map(j=>j+_),f=fe(m),p=fe(m.map(j=>(j-f)**2)),u=fe(m.map(j=>j*j)),b=f*f,o=u-b,k=10**c,F=-(10**c),g=k+F+1,D=k+(F+1),z=i==="varianz",y=Fe(z?u:k),M=z?22.5:1,T=z?"die Varianz 22,5":"die 1";let a="ok",Z;if(z){const j=Math.abs(o-22.5);o===22.5?(a="ok",Z=e.jsxs(e.Fragment,{children:["Beide Rechenwege liefern exakt ",e.jsx(n,{children:"22{,}5"}),". Die Auflösung an der Rechenstelle liegt noch weit unter der gesuchten Varianz, die Subtraktion verliert also nichts Wesentliches (",A("beispiel:katastrophale-ausloeschung"),")."]})):o===0?(a="fail",Z=e.jsxs(e.Fragment,{children:["Totalausfall: Beide Terme werden auf dieselbe Maschinenzahl gerundet, ihre Differenz ist exakt ",e.jsx(n,{children:"0"}),". Die gesamte Information über die Streuung ist ausgelöscht — genau der Fall, den ",A("beispiel:katastrophale-ausloeschung")," vorrechnet."]})):o<0?(a="fail",Z=e.jsxs(e.Fragment,{children:["Eine negative Varianz (",O(o),"): Die Rundungsfehler der beiden Riesenterme sind größer als deren wahre Differenz ",e.jsx(n,{children:"22{,}5"}),", das Vorzeichen ist reiner Rundungszufall (",A("beispiel:katastrophale-ausloeschung"),")."]})):j>22.5?(a="fail",Z=e.jsxs(e.Fragment,{children:["Das Ergebnis (",O(o),") ist um Größenordnungen daneben. Übrig geblieben sind nur noch die Rundungsreste der beiden Terme; welcher Wert dabei herauskommt, ist Zufall (",A("beispiel:katastrophale-ausloeschung"),")."]})):(a="warn",Z=e.jsxs(e.Fragment,{children:["Das Ergebnis kippt gerade: ",O(o)," statt ",e.jsx(n,{children:"22{,}5"}),". Von den führenden Ziffern der beiden Terme heben sich fast alle weg, und der Rest trägt bereits einen sichtbaren Rundungsfehler."]}))}else g===D?(a="ok",Z=e.jsxs(e.Fragment,{children:["Beide Klammerungen liefern ",e.jsx(n,{children:"1"}),". Die ",e.jsx(n,{children:"1"})," ist noch größer als der Abstand benachbarter Maschinenzahlen bei ",e.jsx(n,{children:`10^{${c}}`}),", die Zwischensumme"," ",e.jsx(n,{children:"y + z"})," kann sie also festhalten (",A("beispiel:verletzte-assoziativitaet"),")."]})):(a="fail",Z=e.jsxs(e.Fragment,{children:["Die Klammerungen gehen auseinander: links ",e.jsx(n,{children:"1"}),", rechts ",e.jsx(n,{children:"0"}),". Bei"," ",e.jsx(n,{children:`10^{${c}}`})," liegen benachbarte Maschinenzahlen ",O(y)," ","auseinander, ",e.jsx(n,{children:"y + z"})," wird deshalb auf ",e.jsx(n,{children:"y"})," zurückgerundet und die"," ",e.jsx(n,{children:"1"})," verschwindet spurlos (",A("beispiel:verletzte-assoziativitaet"),")."]}));const l=z?[{name:"Mittel der Quadrate",wert:O(u),farbe:ke},{name:"Quadrat des Mittels",wert:O(b),farbe:ye},{name:"Verschiebungsformel",wert:O(o)},{name:"zweistufig",wert:O(p),farbe:re}]:[{name:"(x + y) + z",wert:O(g),farbe:re},{name:"x + (y + z)",wert:O(D)},{name:"Zwischensumme y + z",wert:O(F+1),farbe:ye},{name:"x = 10ᵏ",wert:O(k),farbe:ke}];return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(te,{children:["Schieben wir ",e.jsx(n,{children:"k"})," nach oben und suchen die Stelle, an der die orange Auflösung die grüne gesuchte Größe überholt."]}),e.jsx("div",{className:"flex flex-wrap gap-2",role:"group","aria-label":"Rechenweg",children:[["varianz",`Varianz (${A("beispiel:katastrophale-ausloeschung")})`],["assoziativ",`Assoziativität (${A("beispiel:verletzte-assoziativitaet")})`]].map(([j,W])=>e.jsx("button",{type:"button",className:i===j?Pe:xe,"aria-pressed":i===j,onClick:()=>s(j),children:W},j))}),e.jsx(Je,{aufloesung:y,ziel:M,zielName:z?"22,5":"1",ariaLabel:`Größenordnungsachse: die Auflösung an der Rechenstelle liegt bei ${Ce(y)}, gesucht ist ${T}. `+(y>M?"Die Auflösung ist größer als die gesuchte Größe, das Ergebnis geht verloren.":"Die Auflösung ist kleiner als die gesuchte Größe, das Ergebnis überlebt.")}),e.jsx("div",{className:"max-w-md",children:e.jsx(K,{label:"Exponent k",value:c,onChange:j=>t(Math.round(j)),min:0,max:He,step:1,fmt:j=>`10${De(Math.round(j))}`})}),e.jsx("div",{className:`space-y-1 p-3 font-mono text-xs sm:text-sm ${G}`,children:l.map((j,W)=>e.jsxs("div",{className:`flex flex-wrap items-baseline justify-between gap-x-4 ${W===2?"border-t border-slate-300 pt-1 dark:border-slate-600":""}`,children:[e.jsx("span",{children:j.name}),e.jsx("span",{className:"tabular-nums [overflow-wrap:anywhere]",style:j.farbe?{color:j.farbe}:void 0,children:j.wert})]},j.name))}),e.jsx(H,{kind:a,children:Z}),z&&e.jsxs("p",{className:`max-w-prose text-xs ${P}`,children:["Kleingedrucktes: Das Widget summiert naiv von vorne nach hinten, Rs"," ",e.jsx("code",{children:"mean()"})," hängt einen Korrekturschritt an. Deshalb steht hier bei"," ",e.jsx(n,{children:"k = 9"})," der Wert ",e.jsx(n,{children:"-128"}),", wo ",A("beispiel:katastrophale-ausloeschung")," die R-Ausgabe"," ",e.jsx(n,{children:"0"})," zitiert. Beides ist IEEE-Doppelpräzision."]})]})}const Ye=[{code:"1.0 - 1.0",ausgabe:"0",optionen:[{id:"null",text:"genau 0"},{id:"nicht",text:"etwas knapp neben 0"}],loesung:"null",expl:e.jsxs(e.Fragment,{children:["Hier passiert nichts Böses: ",e.jsx(n,{children:"1{,}0"})," ist als Maschinenzahl exakt darstellbar, die Differenz ist exakt ",e.jsx(n,{children:"0"}),". Entwarnung, aber nur hier."]})},{code:"1.0 - 0.9 - 0.1",ausgabe:"-2.775558e-17",optionen:[{id:"null",text:"genau 0"},{id:"nicht",text:"etwas knapp neben 0"}],loesung:"nicht",expl:e.jsxs(e.Fragment,{children:["Weder ",e.jsx(n,{children:"0{,}9"})," noch ",e.jsx(n,{children:"0{,}1"})," besitzen eine endliche Binärdarstellung; gespeichert werden gerundete Näherungen, und deren Rundungsreste bleiben nach der Subtraktion übrig. Das Ergebnis liegt in der Größenordnung der"," ",e.jsx(h,{id:"machine-epsilon",children:"Maschinengenauigkeit"})," ","(",e.jsx(n,{children:"\\approx 2^{-52} \\approx 2{,}2 \\cdot 10^{-16}"}),")."]})},{code:"100 * 0.58 == 58",ausgabe:"FALSE",optionen:[{id:"true",text:"TRUE"},{id:"false",text:"FALSE"}],loesung:"false",expl:e.jsxs(e.Fragment,{children:["Auch ",e.jsx(n,{children:"0{,}58"})," ist nicht exakt darstellbar: Gespeichert wird eine Zahl knapp daneben, und ",e.jsx(n,{children:"100 \\cdot 0{,}58"})," ergibt ",e.jsx(n,{children:"57{,}99999999999999\\ldots"})," ","statt ",e.jsx(n,{children:"58"}),". Merkregel: Gleitkommazahlen niemals mit ",e.jsx("code",{children:"=="})," auf exakte Gleichheit testen."]})},{code:`x <- seq(1, 2e16, length = 10^5)
sum(x) - sum(rev(x))`,ausgabe:"-262144",optionen:[{id:"null",text:"genau 0"},{id:"klein",text:"eine winzige Zahl"},{id:"gross",text:"eine sechsstellige Zahl"}],loesung:"gross",expl:e.jsxs(e.Fragment,{children:["Dieselben ",e.jsx(n,{children:"10^5"})," Zahlen, nur in umgekehrter Reihenfolge summiert, und die beiden Summen unterscheiden sich um ",e.jsx(n,{children:"262144 = 2^{18}"}),". Bei Zwischensummen der Größenordnung ",e.jsx(n,{children:"10^{21}"})," liegen benachbarte Maschinenzahlen über"," ",e.jsx(n,{children:"10^{5}"})," auseinander; welche Summanden dabei unter die Räder kommen, hängt von der Reihenfolge ab."]})}];function en(){return e.jsx("div",{className:"my-4 max-w-prose space-y-4",children:Ye.map(r=>e.jsx(ge,{variante:"auswahl",frage:"Was gibt R aus?",optionen:r.optionen,loesung:r.loesung,verdeckt:e.jsxs("div",{className:"space-y-1 text-sm",children:[e.jsx("p",{className:"font-mono font-semibold",children:`## [1] ${r.ausgabe}`}),e.jsx("p",{className:P,children:r.expl})]}),children:e.jsx("pre",{className:"overflow-x-auto rounded bg-slate-200/70 p-2 font-mono text-sm dark:bg-slate-900/60",children:e.jsx("code",{children:r.code})})},r.code))})}function Oe(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Mit diesem Kapitel beginnt die eigentliche Numerik. Statistische Methoden sind am
Ende immer Rechenvorschriften, die ein Computer ausführt, und Computer rechnen
anders als die Mathematik auf dem Papier. In diesem Kapitel klären wir zuerst,
was ein `,e.jsx(i.em,{children:"numerisches Problem"})," und was ein ",e.jsx(i.em,{children:"Algorithmus"}),` überhaupt
ist. Dann sehen wir an konkreten Beispielen, warum es entscheidend darauf
ankommt, `,e.jsx(i.em,{children:"wie"}),` wir etwas berechnen: dieselbe Formel kann als
Rechenvorschrift brillant oder katastrophal sein. In den folgenden Abschnitten
fragen wir dann, wie `,e.jsx(i.em,{children:"teuer"}),` ein Algorithmus ist, und entwickeln mit den
Landau-Symbolen die Sprache, um Rechenaufwand zu vergleichen.`]}),`
`,e.jsx(i.h3,{children:"Verwendete Vorkenntnisse"}),`
`,e.jsxs(i.p,{children:[`Wir brauchen in diesem Kapitel nur Grundbegriffe aus dem ersten Semester: aus der
Analysis `,e.jsx(h,{id:"sequence",children:"Folgen"})," und ihre ",e.jsx(h,{id:"limit",children:"Grenzwerte"}),` sowie die Grundidee der
`,e.jsx(h,{id:"convergence",children:"Konvergenz"}),`; aus der linearen Algebra
`,e.jsx(h,{id:"matrix",children:"Matrizen"}),` und ihre Grundoperationen,
insbesondere `,e.jsx(h,{id:"matrix-vector-product",children:"Matrix-Vektor-"}),`
und `,e.jsx(h,{id:"matrix-multiplication",children:"Matrixmultiplikation"}),`;
dazu ein erstes Gespür dafür, wie viele Einzelrechnungen darin stecken.`]}),`
`,e.jsx("h3",{id:"sec-2.1-numerische-probleme",children:"Numerische Probleme"}),`
`,e.jsxs(i.p,{children:[`Was ist ein numerisches Problem? Kurz gesagt: eine Rechenaufgabe, deren Lösung
aus einer oder mehreren Zahlen besteht. Drei typische Beispiele aus der
Statistik: der Wert eines Integrals (etwa eine Wahrscheinlichkeit als Fläche
unter einer Dichte), die Lösung eines
`,e.jsx(h,{id:"linear-system",children:"linearen Gleichungssystems"}),` (etwa
die Koeffizienten einer Regression) oder die
`,e.jsx(h,{id:"basis",children:"Basis"}),`-Koeffizienten einer
Funktionsapproximation. Allgemein fassen wir das so:`]}),`
`,e.jsx(x,{kind:"Definition",label:"2.1.1 (Numerisches Problem)",id:"env-numerisches-problem",children:e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"numerisches Problem"}),` ist eine Aufgabe der Form:
`,e.jsxs(i.em,{children:["Gegeben ein Problem ",e.jsx(n,{children:"f"})," mit Input ",e.jsx(n,{children:"\\bx"}),`, berechne die
Lösung `,e.jsx(n,{children:"f(\\bx)"}),"."]})]})}),`
`,e.jsxs(i.p,{children:["Die Schreibweise ist bewusst abstrakt: ",e.jsx(n,{children:"f"}),` ist die mathematische
Abbildung von den Eingabedaten auf die exakte Lösung; beim Gleichungssystem
`,e.jsx(n,{children:"\\bA\\by = \\bb"})," etwa ",e.jsx(n,{children:"f(\\bA, \\bb) = \\bA^{-1}\\bb"}),`. Ob und
wie wir `,e.jsx(n,{children:"f(\\bx)"}),` tatsächlich ausrechnen können, ist damit noch völlig
offen. Und da beginnen die Schwierigkeiten.`]}),`
`,e.jsx(i.h3,{children:"Zwei grundsätzliche Schwierigkeiten"}),`
`,e.jsx(i.p,{children:`Computer sind so gut wie nie exakt. Das liegt nicht an schlampiger Technik,
sondern an zwei prinzipiellen Beschränkungen jeder endlichen Maschine:`}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.1.2 (Grenzen des Rechnens)",id:"env-grenzen-des-rechnens",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Computer können nur ",e.jsx(i.em,{children:"endlich viele Zahlen mit endlich vielen Stellen"}),`
darstellen. Schon`]}),`
`,e.jsx(d,{children:"\\pi = 3{,}141592653589793238462643383279\\ldots"}),`
`,e.jsx(i.p,{children:`passt in keinen endlichen Speicher. Gespeichert wird immer nur eine
gerundete Näherung.`}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Computer können nur ",e.jsx(i.em,{children:"endlich viele Rechenoperationen"}),` ausführen.
Schon die harmlose Exponentialfunktion ist über eine
`,e.jsx(h,{id:"infinite-series",children:"unendliche Reihe"})," definiert,"]}),`
`,e.jsx(d,{children:"e^x = \\sum_{n = 0}^\\infty \\frac{x^n}{n!},"}),`
`,e.jsx(i.p,{children:`und unendlich viele Summanden kann keine Maschine aufaddieren. Jede
Auswertung bricht irgendwo ab.`}),`
`]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Deshalb ist es wichtig, ",e.jsx(i.em,{children:"wie"}),` wir Dinge berechnen. Wie schlimm kann es schon
sein? Prüfen wir unsere Intuition an vier kurzen R-Ausdrücken.
Tippen wir bei jedem zuerst, was herauskommt, und decken erst dann die Ausgabe
auf:`]}),`
`,e.jsx(en,{}),`
`,e.jsxs(i.p,{children:[`Halten wir die Beobachtungen fest: Computer können nur endlich viele Zahlen
darstellen. Das führt zu `,e.jsx(i.em,{children:"Rundungsfehlern"}),`
(`,e.jsx(h,{id:"rounding-error",children:"Rundungsfehler"}),`; ausführlich in
Kapitel 4, nach den Normen aus Kapitel 3), und diese Fehler können sich `,e.jsx(i.em,{children:"akkumulieren"}),`. Der Fehler einer
einzelnen Operation ist meist vernachlässigbar klein. Gefährlich wird die Summe
vieler kleiner Fehler. Und weil jede Operation frisch rundet, spielt sogar die
`,e.jsx(i.em,{children:"Reihenfolge"}),` unserer Rechenschritte eine Rolle. Eine erste praktische
Empfehlung, die wir gleich zweimal in Aktion sehen: besonders große und
besonders kleine Zahlen im selben Ausdruck vermeiden.`]}),`
`,e.jsx(i.h3,{children:"Zwei warnende Beispiele"}),`
`,e.jsx(i.p,{children:`Die beiden folgenden Beispiele zeigen die zwei wichtigsten Mechanismen, mit
denen Gleitkommarechnung schiefgeht. Beide sehen auf dem Papier völlig harmlos
aus.`}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.1.3 (Katastrophale Auslöschung)",id:"env-katastrophale-ausloeschung",children:[e.jsxs(i.p,{children:["Wir berechnen die Varianz von ",e.jsx(n,{children:"\\bx"}),` mit der bekannten
Verschiebungsformel`]}),e.jsx(d,{children:"\\text{Var}(x) = \\cred{\\frac{1}{n}\\sumin x_i^2} - \\cblue{\\left(\\frac{1}{n}\\sumin x_i\\right)^2}"}),e.jsxs(i.p,{children:["(wir teilen der Einfachheit halber durch ",e.jsx(n,{children:"n"})," statt ",e.jsx(n,{children:"n-1"}),`; am
Phänomen ändert das nichts). Die Daten sind vier kleine Zahlen, verschoben um
eine große Konstante:`]}),e.jsx(d,{children:"\\bx = \\left(4 + 10^9,\\; 7 + 10^9,\\; 13 + 10^9,\\; 16 + 10^9\\right)."}),e.jsxs(i.p,{children:[`Rechnen wir zunächst exakt. Der Mittelwert ist
`,e.jsx(n,{children:"\\bar{x} = 10^9 + 10"}),`, die Abweichungen davon sind
`,e.jsx(n,{children:"-6, -3, 3, 6"}),", also"]}),e.jsx(d,{children:"\\text{Var}(x) = \\frac{36 + 9 + 9 + 36}{4} = \\frac{90}{4} = 22{,}5."}),e.jsx(i.p,{children:"Für die beiden Terme der Verschiebungsformel gilt exakt"}),e.jsx(d,{children:"\\cred{\\frac{1}{n}\\sumin x_i^2} = 10^{18} + 2 \\cdot 10^{10} + 122{,}5, \\qquad \\cblue{\\bar{x}^2} = 10^{18} + 2 \\cdot 10^{10} + 100,"}),e.jsxs(i.p,{children:["und die Differenz ",e.jsx(n,{children:"\\cred{122{,}5} - \\cblue{100} = 22{,}5"}),` stimmt.
Aber: Beide Terme sind riesig (`,e.jsx(n,{children:"\\approx 10^{18}"}),`), und ihre gesamte
Information über die Varianz steckt in den letzten drei Ziffern. Bei der
Größenordnung `,e.jsx(n,{children:"10^{18}"}),` liegen benachbarte
`,e.jsx(h,{id:"floating-point",children:"Gleitkommazahlen"}),` aber schon
`,e.jsx(n,{children:"128"}),` auseinander. Feiner kann die Maschine dort nicht auflösen. In
R (Doppelpräzision) werden deshalb `,e.jsx(i.em,{children:"beide"}),` Terme auf dieselbe
Maschinenzahl gerundet:`]}),e.jsx(d,{children:"\\cred{1\\,000\\,000\\,020\\,000\\,000\\,128} - \\cblue{1\\,000\\,000\\,020\\,000\\,000\\,128} = 0."}),e.jsxs(i.p,{children:['Die berechnete „Varianz" ist ',e.jsx(n,{children:"0"})," statt ",e.jsx(n,{children:"22{,}5"}),` – nicht
ungefähr falsch, sondern komplett informationsfrei. Die zweistufige Rechnung
`,e.jsx(n,{children:"\\frac{1}{n}\\sumin \\left(x_i - \\bar{x}\\right)^2"}),` liefert dagegen
exakt `,e.jsx(n,{children:"22{,}5"}),", denn sie subtrahiert die großen Zahlen, ",e.jsx(i.em,{children:"bevor"}),`
quadriert wird, und arbeitet danach nur noch mit den kleinen Abweichungen.`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Ursache"}),` des Desasters ist die Subtraktion zweier fast gleich
großer Zahlen: Die übereinstimmenden führenden Ziffern heben sich weg, übrig
bleiben nur die (verrauschten) hinteren Stellen. Dieses Phänomen heißt
`,e.jsx(i.em,{children:e.jsx(h,{id:"cancellation",children:"katastrophale Auslöschung"})}),`
(engl. `,e.jsx(i.em,{children:"catastrophic cancellation"}),`) und ist der Klassiker unter den
numerischen Fallen.`]})]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.1.4 (Verletzte Assoziativität)",id:"env-verletzte-assoziativitaet",children:[e.jsxs(i.p,{children:[`Gleitkomma-Addition ist nicht assoziativ! Seien
`,e.jsx(n,{children:"\\cred{x = 10^{30}}"}),", ",e.jsx(n,{children:"\\cblue{y = -10^{30}}"}),` und
`,e.jsx(n,{children:"\\cgreen{z = 1}"}),`. Mathematisch ist
`,e.jsx(n,{children:"x + y + z = 1"}),", egal wie wir klammern. Die Maschine rechnet:"]}),e.jsx(d,{children:"(\\cred{x} + \\cblue{y}) + \\cgreen{z} = (\\cred{10^{30}} + \\cblue{(-10^{30})}) + \\cgreen{1} = 0 + \\cgreen{1} = 1,"}),e.jsx(d,{children:"\\cred{x} + (\\cblue{y} + \\cgreen{z}) = \\cred{10^{30}} + (\\cblue{(-10^{30})} + \\cgreen{1}) \\;\\stackrel{!!}{\\approx}\\; \\cred{10^{30}} + \\cblue{(-10^{30})} = 0."}),e.jsxs(i.p,{children:["Die erste Klammerung ist exakt: ",e.jsx(n,{children:"\\cred{x} + \\cblue{y} = 0"}),` löscht
die riesigen Zahlen sauber aus, danach überlebt die `,e.jsx(n,{children:"\\cgreen{1}"}),`. In
der zweiten Klammerung muss die Maschine
`,e.jsx(n,{children:"\\cblue{-10^{30}} + \\cgreen{1}"}),` als Gleitkommazahl speichern. Aber
bei der Größenordnung `,e.jsx(n,{children:"10^{30}"}),` liegen benachbarte Maschinenzahlen
etwa `,e.jsx(n,{children:"10^{14}"})," auseinander. Die ",e.jsx(n,{children:"\\cgreen{1}"}),` ist viel
kleiner als diese Auflösung, das Zwischenergebnis wird auf
`,e.jsx(n,{children:"\\cblue{-10^{30}}"})," zurückgerundet, und am Ende steht ",e.jsx(n,{children:"0"}),`
statt `,e.jsx(n,{children:"1"}),"."]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\impl"}),` Die Reihenfolge (Klammerung) einer Summe beeinflusst das
Ergebnis. Das haben wir oben im Selbsttest bei
`,e.jsx(i.code,{children:"sum(x) - sum(rev(x))"}),` beobachtet: vorwärts und rückwärts summiert
ergeben dieselben `,e.jsx(n,{children:"10^5"})," Zahlen verschiedene Summen."]})]}),`
`,e.jsx(i.p,{children:`Die beiden Beispiele sehen verschieden aus, aber sie scheitern am selben
Mechanismus: An der Stelle, an der die Maschine rechnet, liegen benachbarte
darstellbare Zahlen weiter auseinander als die Größe, die wir eigentlich
suchen. Wie weit dürfen wir die Verschiebung treiben, bis es so weit ist?
Das lässt sich nicht ansehen, das müssen wir ausprobieren.`}),`
`,e.jsxs(de,{title:"Zwei Gesichter derselben Auslöschung",children:[e.jsx(ge,{variante:"auswahl",frage:"Bei welcher Verschiebung c verliert die Verschiebungsformel die Varianz zum ersten Mal?",optionen:[{id:"e4",text:"c = 10⁴"},{id:"e8",text:"c = 10⁸"},{id:"e12",text:"c = 10¹²"}],loesung:"e8",children:e.jsx(Xe,{})}),e.jsxs(i.p,{children:[`Die Tafel macht das Kriterium sichtbar: Solange die orange Auflösung links von der
grünen Zielgröße steht, überlebt das Ergebnis; sobald sie rechts davon steht, ist es
weg. Die Verschiebungsformel verliert schon bei `,e.jsx(n,{children:"c = 10^8"}),` die erste Nachkommastelle
(`,e.jsx(n,{children:"22"})," statt ",e.jsx(n,{children:"22{,}5"}),") und ab ",e.jsx(n,{children:"c = 10^9"}),` jede Information; die Klammerung der Summe hält
bis `,e.jsx(n,{children:"10^{15}"})," und bricht bei ",e.jsx(n,{children:"10^{16}"}),"."]})]}),`
`,e.jsx("h3",{id:"sec-2.1-algorithmen",children:"Algorithmen"}),`
`,e.jsxs(i.p,{children:["Die Beispiele zeigen: Zum numerischen Problem ",e.jsx(n,{children:"f"}),` gehört immer noch
eine zweite Zutat, nämlich die konkrete Rechenvorschrift, mit der wir `,e.jsx(n,{children:"f(\\bx)"}),`
zu berechnen versuchen. Für dieselbe Varianz gab es zwei Vorschriften mit
drastisch verschiedenem Ausgang. Diese zweite Zutat bekommt jetzt einen Namen:`]}),`
`,e.jsx(x,{kind:"Definition",label:"2.1.5 (Algorithmus)",id:"env-algorithmus",children:e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"Algorithmus"}),` ist ein Verfahren
`,e.jsx(n,{children:"\\wt{f} = \\wt{f}_s \\circ \\cdots \\circ \\wt{f}_1"}),`, das für Inputs
`,e.jsx(n,{children:"\\bx"})," eine mögliche Lösung ",e.jsx(n,{children:"\\wt{f}(\\bx)"})," berechnet."]})}),`
`,e.jsxs(i.p,{children:[`Lesen wir die Definition genau. Ein Algorithmus ist eine
`,e.jsx(h,{id:"function-composition",children:"Verkettung"}),`
`,e.jsx(n,{children:"\\wt{f}_s \\circ \\cdots \\circ \\wt{f}_1"}),` endlich vieler elementarer
Rechenschritte `,e.jsx(n,{children:"\\wt{f}_1, \\ldots, \\wt{f}_s"}),`: erst wird
`,e.jsx(n,{children:"\\wt{f}_1"})," auf den Input angewandt, dann ",e.jsx(n,{children:"\\wt{f}_2"}),` auf
dessen Ergebnis, und so weiter. Die Tilde ist Programm: `,e.jsx(n,{children:"\\wt{f}"}),` ist
nicht dasselbe wie `,e.jsx(n,{children:"f"}),", sondern nur ein Versuch, ",e.jsx(n,{children:"f"}),`
nachzubauen; die Definition verspricht vorsichtig nur eine „mögliche Lösung".
Wie gut `,e.jsx(n,{children:"\\wt{f}(\\bx)"})," die wahre Lösung ",e.jsx(n,{children:"f(\\bx)"}),` trifft, ist
genau die Frage, die uns in Kapitel 4 beschäftigen wird. Zu einem Problem
`,e.jsx(n,{children:"f"}),` gibt es dabei meist viele verschiedene Algorithmen, und sie
unterscheiden sich in Genauigkeit `,e.jsx(i.em,{children:"und"})," Rechenaufwand."]}),`
`,e.jsxs(x,{kind:"Bemerkung",label:"2.1.6 (Arten von Algorithmen)",id:"env-arten-von-algorithmen",children:[e.jsxs(i.p,{children:["Die gebräuchlichen Bezeichnungen beschreiben drei ",e.jsx(i.em,{children:"unabhängige Achsen"}),":"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"exakt oder approximativ"}),`: Trifft das Verfahren die mathematische Lösung in
exakter Arithmetik, oder entsteht bereits durch das Verfahren ein
Approximationsfehler? Eine abgebrochene Reihe für `,e.jsx(n,{children:"e^x"})," ist approximativ."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"direkt oder numerisch iterativ"}),`: Liefert eine vorab endliche Folge von
Rechenschritten die Lösung, oder erzeugt das Verfahren eine Folge von
Näherungen mit Abbruchkriterium? Das Gauß-Verfahren ist direkt; Newton- und
Gradientenverfahren sind iterativ.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"deterministisch oder randomisiert"}),`: Ist das Ergebnis bei gleichem Input
vollständig festgelegt, oder verwendet das Verfahren Zufall? Die
Monte-Carlo-Integration ist randomisiert.`]}),`
`]}),e.jsxs(i.p,{children:["Eine Programmschleife allein macht ein Verfahren noch nicht ",e.jsx(i.em,{children:`numerisch
iterativ`}),`: Auch ein direkter Algorithmus kann Schleifen enthalten. Umgekehrt
können sich die Achsen beliebig kombinieren. Das stochastische
Gradientenverfahren etwa ist numerisch iterativ, approximativ und randomisiert.`]})]}),`
`,e.jsx(i.p,{children:`Im nächsten Abschnitt sehen wir an einem klassischen Beispiel (den
Fibonacci-Zahlen), dass zwei exakte Algorithmen für dasselbe Problem sich im
Rechenaufwand so drastisch unterscheiden können, dass der eine praktisch
unbrauchbar ist.`}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(le,{children:[e.jsxs(Q,{loesung:16,toleranz:0,children:[e.jsxs(i.p,{children:["Ab welchem Exponenten ",e.jsx(n,{children:"k"}),` liefern im Widget oben die beiden Klammerungen von
`,e.jsx(n,{children:"10^k + \\left(-10^k\\right) + 1"})," verschiedene Ergebnisse?"]}),e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"10^{15}"})," liegen benachbarte Maschinenzahlen ",e.jsx(n,{children:"0{,}125"})," auseinander, die ",e.jsx(n,{children:"1"}),`
überlebt also die Zwischensumme. Bei `,e.jsx(n,{children:"10^{16}"})," ist der Abstand bereits ",e.jsx(n,{children:"2"}),`, und
`,e.jsx(n,{children:"-10^{16} + 1"})," wird auf ",e.jsx(n,{children:"-10^{16}"})," zurückgerundet (",e.jsx(i.a,{href:"#env-verletzte-assoziativitaet",children:"Beispiel 2.1.4"}),")."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Die zweistufige Varianzformel ",e.jsx(n,{children:"\\frac{1}{n}\\sumin (x_i - \\bar{x})^2"}),` versagt
bei genügend großer Verschiebung genauso wie die Verschiebungsformel.`]}),e.jsxs(i.p,{children:["Sie liefert im Widget für jedes ",e.jsx(n,{children:"k"})," exakt ",e.jsx(n,{children:"22{,}5"}),`. Sie subtrahiert die großen
Zahlen, `,e.jsx(i.em,{children:"bevor"}),` quadriert wird, und rechnet danach nur noch mit den kleinen
Abweichungen `,e.jsx(n,{children:"-6, -3, 3, 6"}),`; zwei riesige, fast gleiche Zahlen treffen dabei
nie aufeinander.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Ein Rundungsfehler pro Operation ist harmlos, gefährlich ist erst das
Zusammenspiel vieler Operationen.`}),e.jsx(i.p,{children:`Darum ging es in beiden Beispielen: Jede einzelne Rundung ist relativ
winzig, aber eine Subtraktion fast gleich großer Zahlen macht aus diesem
winzigen relativen Fehler einen riesigen relativen Fehler des Ergebnisses.`})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §1.1–1.2 (wissenschaftliches Rechnen, Näherungen und
Fehlerquellen); die Gleitkomma-Arithmetik hinter den Beispielen behandelt
Heath §1.3 sowie unser Kapitel 4, mit Normen aus Kapitel 3.`})})]})}function nn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Oe,{...r})}):Oe(r)}const ie=v.blau,ve=v.gruen,ze=v.orange,ue=v.rot,pe=15;function rn(r){const i=new Array(r).fill(0);i[1]=1;for(let s=2;s<r;s++)i[s]=i[s-1]+i[s-2];return i}function sn(r){const i=new Array(r+1).fill(0),s=new Array(r+1).fill(0);for(let c=1;c<=r;c++)c<=2?(i[c]=1,s[c]=0):(i[c]=1+i[c-1]+i[c-2],s[c]=1+s[c-1]+s[c-2]);return{calls:i,adds:s}}function tn(r){const i=new Array(r+1).fill(0),s=[r];for(;s.length>0;){const c=s.pop();i[c]+=1,c>2&&s.push(c-1,c-2)}return i}function ln(r){const i=[ve,ie,ze,v.violett,ue];return i[r%i.length]+"2e"}function Ae({j:r}){return e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsxs("div",{className:"rounded border border-slate-300 px-1 font-mono text-[11px] dark:border-slate-600",style:{background:ln(r)},children:["x",e.jsx("sub",{children:r})]}),r>2&&e.jsxs("div",{className:"flex gap-1 pt-1",children:[e.jsx(Ae,{j:r-1}),e.jsx(Ae,{j:r-2})]})]})}function dn(){const[r,i]=w.useState(8),[s,c]=w.useState(1),t=Math.min(s,r),_=w.useMemo(()=>rn(pe),[]),{calls:m,adds:f}=w.useMemo(()=>sn(pe),[]),p=w.useMemo(()=>tn(t),[t]),u=Math.max(0,t-2),b=[];for(let g=t-2;g>=1;g--)p[g]>1&&b.push({j:g,c:p[g]});const o=u>0?f[t]/u:0,k=b.reduce((g,D)=>g===null||D.c>g.c?D:g,null),F=t>=3?e.jsxs(e.Fragment,{children:["Schritt ",t,": hänge"," ",e.jsx("span",{style:{color:ze,fontWeight:600},children:_[t-1]})," ="," ",e.jsx("span",{style:{color:ie,fontWeight:600},children:_[t-2]})," +"," ",e.jsx("span",{style:{color:ve,fontWeight:600},children:_[t-3]})," an, eine einzige Addition."]}):t===1?e.jsx(e.Fragment,{children:"Schritt 1: Startwert 0 setzen, noch keine Addition."}):e.jsx(e.Fragment,{children:"Schritt 2: die 1 anhängen, noch keine Addition."});return e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsx(te,{children:"Scrubben wir den Schrittregler nach rechts und vergleichen die beiden Zähler unter den Tafeln."}),e.jsx("div",{className:"max-w-md",children:e.jsx(K,{label:"n (Ziel)",value:r,onChange:g=>i(Math.round(g)),min:3,max:pe,step:1,fmt:g=>String(Math.round(g))})}),e.jsx(Ue,{step:t,setStep:c,min:1,max:r,narration:F}),e.jsxs("div",{className:"grid gap-3 md:grid-cols-2",children:[e.jsxs("div",{className:`p-3 ${G}`,children:[e.jsxs("p",{className:"mb-2 font-semibold",children:["Iterativ (",A("algorithmus:fibonacci-schleifenbasiert"),")"]}),e.jsx("div",{className:"mb-2 flex flex-wrap gap-1",children:_.slice(0,t).map((g,D)=>{const z=D+1,y=t>=3&&z===t,M=t>=3&&z===t-1,T=t>=3&&z===t-2,a=y?ze:M?ie:T?ve:void 0;return e.jsx("span",{className:"rounded border px-1.5 py-0.5 font-mono text-xs",style:a?{borderColor:a,color:a,fontWeight:600}:{borderColor:"var(--w-border)"},title:`x${z}`,children:g},z)})}),e.jsxs("p",{className:"font-mono text-xs",children:["elementare Schritte: ",t,"  |  Additionen insgesamt:"," ",e.jsx("strong",{style:{color:ie},children:u})]})]}),e.jsxs("div",{className:`p-3 ${G}`,children:[e.jsxs("p",{className:"mb-2 font-semibold",children:["Naive Rekursion: nur x",e.jsx("sub",{children:t})]}),e.jsxs("p",{className:"font-mono text-xs",children:["Funktionsaufrufe: ",e.jsx("strong",{style:{color:ue},children:N(m[t])})," "," |  Additionen: ",e.jsx("strong",{style:{color:ue},children:N(f[t])})]}),b.length>0&&e.jsxs("p",{className:`mt-2 text-xs ${P}`,children:["Mehrfach berechnet:"," ",b.slice(0,4).map((g,D)=>e.jsxs("span",{children:[D>0&&", ","x",e.jsx("sub",{children:g.j})," ",g.c,"-mal"]},g.j)),b.length>4&&", …"]})]})]}),t<=8?e.jsxs("div",{className:`overflow-x-auto p-2 ${G}`,children:[e.jsxs("p",{className:`mb-1 text-xs ${P}`,children:["Aufrufbaum der naiven Rekursion für x",e.jsx("sub",{children:t}),"; gleiche Farbe = identische, mehrfach ausgeführte Teilrechnung."]}),e.jsx(Ae,{j:t})]}):e.jsxs("p",{className:`text-xs ${P}`,children:["(Der Aufrufbaum hat jetzt ",N(m[t])," Knoten; zum Anzeigen Schritt ≤ 8 wählen.)"]}),e.jsx(H,{kind:t<3?"neutral":o>=3?"fail":"warn",children:t<3?e.jsx(e.Fragment,{children:"Noch ist nichts passiert: Beide Varianten setzen nur den Startwert. Der Unterschied entsteht erst, sobald etwas addiert wird."}):e.jsxs(e.Fragment,{children:["Bei Schritt ",t," hat die Iteration ",e.jsx("em",{children:"alle"})," Zahlen x",e.jsx("sub",{children:"1"})," bis x",e.jsx("sub",{children:t})," mit"," ",e.jsxs("strong",{style:{color:ie},children:[u," ",u===1?"Addition":"Additionen"]})," ","berechnet; die naive Rekursion braucht für die ",e.jsx("em",{children:"eine"})," Zahl x",e.jsx("sub",{children:t})," ","schon"," ",e.jsxs("strong",{style:{color:ue},children:[N(f[t])," ",f[t]===1?"Addition":"Additionen"]})," ","und ",N(m[t])," Aufrufe",o>=2?e.jsxs(e.Fragment,{children:[", also das ",N(Math.round(o)),"-fache"]}):null,".",k&&e.jsxs(e.Fragment,{children:[" ","Der Grund steht im Aufrufbaum: x",e.jsx("sub",{children:k.j})," wird ",k.c,"-mal von vorn berechnet, weil die Rekursion nichts aufbewahrt."]})," ","Wie schnell diese Schere aufgeht, rechnen wir in"," ",e.jsx("a",{className:"underline",href:"#sec-2.5",children:A("sec:algos/fibonacci-komplexitaet")})," ","nach."]})})]})}function Ne(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-2.1",children:"Abschnitt 2.1"}),` haben wir Algorithmen abstrakt definiert: als Verkettung
`,e.jsx(n,{children:"\\wt{f} = \\wt{f}_s \\circ \\cdots \\circ \\wt{f}_1"}),` elementarer Rechenschritte. Diese
Definition bleibt blass, solange wir sie nicht einmal vollständig durchspielen. Das tun
wir jetzt an einem Problem, das einfach genug ist, um jeden einzelnen Schritt
hinzuschreiben, und trotzdem reich genug, um uns durch das ganze Kapitel zu begleiten:
den Fibonacci-Zahlen. Danach ordnen wir das Beispiel in die Landschaft der
Algorithmenarten ein, die uns in Statistik und Machine Learning begegnen, und überlegen,
was einen `,e.jsx(i.em,{children:"guten"})," Algorithmus eigentlich auszeichnet."]}),`
`,e.jsxs(i.h3,{id:"sec-beispiel-fibonacci-zahlen",children:["2.2.1 ","Beispiel: Fibonacci-Zahlen"]}),`
`,e.jsxs(x,{kind:"Definition",label:"2.2.1 (Fibonacci-Zahlen)",id:"env-fibonacci-zahlen",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Fibonacci-Zahlen"})," sind die ",e.jsx(h,{id:"sequence",children:"Folge"})," ",e.jsx(n,{children:"(x_n)_{n \\in \\N}"})," mit"]}),e.jsx(d,{children:"x_1 = 0, \\quad x_2 = 1, \\quad x_{n+1} = \\cblue{x_n} + \\cgreen{x_{n-1}} \\quad (n \\ge 2)."})]}),`
`,e.jsxs(i.p,{children:[`Jedes Folgenglied ist also die Summe seiner beiden Vorgänger; die Folge beginnt mit
`,e.jsx(n,{children:"0, 1, 1, 2, 3, 5, 8, 13, 21, \\dots"})," (Manche Bücher lassen die Folge bei ",e.jsx(n,{children:"1, 1"}),` oder mit
dem Index `,e.jsx(n,{children:"0"}),` beginnen; wir bleiben bei der obigen Konvention.) Unser numerisches
Problem lautet: `,e.jsxs(i.em,{children:["Berechne die ersten ",e.jsx(n,{children:"n"})," Fibonacci-Zahlen."]}),` In der Sprache von
`,e.jsx(i.a,{href:"#sec-2.1",children:"Abschnitt 2.1"}),": Das Problem ist die Abbildung ",e.jsx(n,{children:"f"})," mit Input ",e.jsx(n,{children:"n"}),` und Lösung
`,e.jsx(n,{children:"f(n) = (x_1, \\dots, x_n)"}),"."]}),`
`,e.jsxs(i.p,{children:[`Wie berechnen wir das? Die Definition selbst gibt den Weg vor: Wir bauen den
Ergebnisvektor von links nach rechts auf und gewinnen jeden neuen Eintrag durch `,e.jsx(i.em,{children:"eine"}),`
Addition aus den beiden zuletzt berechneten. Als Verkettung elementarer Schritte
(`,e.jsx(h,{id:"function-composition",children:"Komposition"})," von Funktionen) aufgeschrieben:"]}),`
`,e.jsxs(x,{kind:"Algorithmus",label:"2.2.2 (Fibonacci, schleifenbasiert)",id:"env-fibonacci-schleifenbasiert",children:[e.jsx(d,{children:`f : \\N \\longrightarrow \\bigcup_{n\\ge 1}\\N_0^n,
\\qquad f(n)=(x_1,\\ldots,x_n).`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n\\ge 1"})," setzt der Algorithmus ",e.jsx(n,{children:"x_1=0"}),", für ",e.jsx(n,{children:"n\\ge2"}),` zusätzlich
`,e.jsx(n,{children:"x_2=1"}),", und führt dann aus:"]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-text",children:`für i = 2, ..., n-1:
    x[i+1] = x[i] + x[i-1]
gib (x[1], ..., x[n]) zurück
`})})]}),`
`,e.jsxs(i.p,{children:[`Jeder Schleifendurchlauf hängt an das bisher berechnete Tupel die Summe aus dem
`,e.jsx(n,{children:"\\cblue{\\text{letzten}}"})," und dem ",e.jsx(n,{children:"\\cgreen{\\text{vorletzten}}"}),` Element als
`,e.jsx(n,{children:"\\corange{\\text{neues Element}}"}),` an. Nach dem letzten Durchlauf steht das vollständige
Ergebnis da. Der Zielraum hängt von der Eingabe `,e.jsx(n,{children:"n"}),` ab; deshalb schreiben wir oben die
disjunkte Vereinigung der möglichen Vektorräume statt des formal unzulässigen
`,e.jsx(n,{children:"\\N_0^n"})," als festen Zielraum."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.2.3 (Die ersten 6 Fibonacci-Zahlen)",id:"env-die-ersten-6-fibonacci-zahlen",children:[e.jsxs(i.p,{children:["Berechnen wir ",e.jsx(n,{children:"\\wt{f}(6)"}),` Schritt für Schritt. Die Farben verfolgen die Rollen aus
`,e.jsx(i.a,{href:"#env-fibonacci-schleifenbasiert",children:"Algorithmus 2.2.2"}),": ",e.jsx(n,{children:"\\cblue{\\text{letztes Element}}"}),`,
`,e.jsx(n,{children:"\\cgreen{\\text{vorletztes Element}}"}),", ",e.jsx(n,{children:"\\corange{\\text{neu berechnete Summe}}"}),"."]}),e.jsx(d,{children:`\\begin{aligned}
\\wt{f}_1(6) &= 0 \\\\
\\wt{f}_2(0) &= (0, 1) \\\\
\\wt{f}_3(\\cgreen{0}, \\cblue{1}) &= (0, 1, \\corange{1}) \\\\
\\wt{f}_4(0, \\cgreen{1}, \\cblue{1}) &= (0, 1, 1, \\corange{2}) \\\\
\\wt{f}_5(0, 1, \\cgreen{1}, \\cblue{2}) &= (0, 1, 1, 2, \\corange{3}) \\\\
\\wt{f}_6(0, 1, 1, \\cgreen{2}, \\cblue{3}) &= (0, 1, 1, 2, 3, \\corange{5})
\\end{aligned}`}),e.jsxs(i.p,{children:["Ergebnis: ",e.jsx(n,{children:"\\wt{f}(6) = (0, 1, 1, 2, 3, 5)"}),` – vier Additionen
(`,e.jsx(n,{children:"\\corange{1}, \\corange{2}, \\corange{3}, \\corange{5}"}),") für sechs Zahlen."]})]}),`
`,e.jsxs(i.h3,{id:"sec-vom-algorithmus-zum-programm",children:["2.2.2 ","Vom Algorithmus zum Programm"]}),`
`,e.jsxs(i.p,{children:[`Der Algorithmus lässt sich fast wörtlich in Code übersetzen. Lege zuerst einen Vektor der
Länge `,e.jsx(n,{children:"n"})," an, mit Nullen vorbelegt; damit ist ",e.jsx(n,{children:"x_1 = 0"}),` bereits erledigt. Setze dann
(falls `,e.jsx(n,{children:"n > 1"}),") das zweite Element auf ",e.jsx(n,{children:"1"}),". Durchlaufe schließlich ",e.jsx(n,{children:"i = 2, \\dots, n-1"}),` und
setze in jedem Durchlauf `,e.jsx(n,{children:"x_{i+1} = \\cblue{x_i} + \\cgreen{x_{i-1}}"}),". In R:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`fibonacci <- function(n) {
  x <- numeric(n)  # Vektor (0, ..., 0) der Länge n
  if (n > 1) {
    x[2] <- 1
  }
  if (n > 2) {
    for (i in 2:(n - 1)) {
      x[i + 1] <- x[i] + x[i - 1]
    }
  }
  x
}
`})}),`
`,e.jsx(i.p,{children:`Eine Schleife, eine Addition pro Durchlauf, und jedes Zwischenergebnis wird genau einmal
berechnet und dann wiederverwendet.`}),`
`,e.jsxs(de,{title:"Wie oft rechnet die Rekursion doppelt?",children:[e.jsxs(i.p,{children:["Dass hier ",e.jsx(i.em,{children:"nichts doppelt"}),` gerechnet wird, ist keine Selbstverständlichkeit. Die
`,e.jsx(i.a,{href:"#env-fibonacci-zahlen",children:"Definition 2.2.1"}),` legt nämlich noch einen zweiten, verführerisch eleganten Weg nahe: Um
`,e.jsx(n,{children:"x_n"})," zu berechnen, rufe dieselbe Rechenvorschrift rekursiv für ",e.jsx(n,{children:"x_{n-1}"})," und ",e.jsx(n,{children:"x_{n-2}"}),`
auf, ohne Zwischenergebnisse zu speichern. Das liefert dieselben Zahlen, aber zu einem
absurden Preis: Beide Teilaufrufe berechnen große Teile der Folge unabhängig voneinander
noch einmal, und deren Teilaufrufe wieder. Wie oft ist „noch einmal" – zweimal, fünfmal,
zwanzigmal? Das ist keine Geschmacksfrage, sondern eine Zählaufgabe.`]}),e.jsx(ge,{frage:"Beim Ziel x₈: wie oft rechnet die naive Rekursion die Zahl x₃ von vorn aus?",loesung:8,toleranz:0,einheit:"mal",children:e.jsx(dn,{})}),e.jsxs(i.p,{children:["Der Stepper zählt es aus. Bis ",e.jsx(n,{children:"x_8"}),` kommt die Iteration mit sechs Additionen aus und hat
dabei `,e.jsx(i.em,{children:"alle"})," acht Zahlen berechnet; die Rekursion braucht für die ",e.jsx(i.em,{children:"eine"})," Zahl ",e.jsx(n,{children:"x_8"}),` schon
`,e.jsx(n,{children:"20"})," Additionen und ",e.jsx(n,{children:"41"})," Aufrufe, weil sie ",e.jsx(n,{children:"x_3"})," achtmal und ",e.jsx(n,{children:"x_2"}),` dreizehnmal von vorn
ausrechnet. Bis `,e.jsx(n,{children:"x_{15}"})," sind es ",e.jsx(n,{children:"609"})," Additionen gegen ",e.jsx(n,{children:"13"}),". Die genaue Analyse, ",e.jsx(i.em,{children:"wie"}),`
schnell die naive Rekursion explodiert, folgt in `,e.jsx(i.a,{href:"#sec-2.5",children:"Abschnitt 2.5"}),"."]})]}),`
`,e.jsxs(i.h3,{id:"sec-fibonacci-selbsttest",children:["2.2.3 ","Selbsttest"]}),`
`,e.jsxs(i.p,{children:["Ordnen wir ",e.jsx(i.a,{href:"#env-fibonacci-schleifenbasiert",children:"Algorithmus 2.2.2"})," in die Arten aus ",e.jsx(i.a,{href:"#sec-2.1",children:"Abschnitt 2.1"}),` ein. Für jede
Aussage: wahr oder falsch?`]}),`
`,e.jsxs(le,{children:[e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Der Algorithmus ist ",e.jsx(i.em,{children:"exakt"}),"."]}),e.jsxs(i.p,{children:["Es gilt ",e.jsx(n,{children:"f(n) = \\wt{f}(n)"}),`: Der Algorithmus liefert genau die definierten
Fibonacci-Zahlen, keine Näherung. (Die Einschränkung „bis auf
`,e.jsx(h,{id:"rounding-error",children:"Rundungsfehler"}),'" aus der Definition greift hier erst, wenn ',e.jsx(n,{children:"x_n"}),` für
sehr großes `,e.jsx(n,{children:"n"}),` den exakt darstellbaren Ganzzahlbereich der
`,e.jsx(h,{id:"floating-point",children:"Gleitkommazahlen"})," verlässt.)"]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Algorithmus ist ",e.jsx(i.em,{children:"approximativ"}),"."]}),e.jsxs(i.p,{children:["Approximativ hieße ",e.jsx(n,{children:"f(n) \\approx \\wt{f}(n)"}),`: der Algorithmus bricht etwa bei einem
Toleranzlevel ab, bevor die exakte Lösung erreicht ist. Hier gibt es nichts zu
approximieren: Nach `,e.jsx(n,{children:"n"})," Schritten steht das exakte Ergebnis fest."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Algorithmus ist ",e.jsx(i.em,{children:"numerisch iterativ"}),"."]}),e.jsxs(i.p,{children:[`Er enthält zwar eine Schleife, erzeugt aber keine Folge von Näherungen mit einem
Abbruchkriterium: Nach einer vorab durch `,e.jsx(n,{children:"n"}),` festgelegten Zahl von Schritten steht das
exakte Ergebnis fest. In der numerischen Terminologie ist er daher `,e.jsx(i.em,{children:"direkt"}),`. Die häufige
Bezeichnung „iterative Fibonacci-Variante" meint hier nur die schleifenbasierte
Implementierung im Gegensatz zur Rekursion.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Algorithmus ist ",e.jsx(i.em,{children:"probabilistisch"}),"."]}),e.jsxs(i.p,{children:[`Es kommt kein Zufall vor: Der Algorithmus ist deterministisch und liefert bei jedem
Aufruf mit demselben `,e.jsx(n,{children:"n"})," exakt dasselbe Ergebnis."]})]}),e.jsxs(Q,{loesung:54,toleranz:0,children:[e.jsxs(i.p,{children:["Wie viele Additionen braucht die naive Rekursion im Stepper oben für die Zahl ",e.jsx(n,{children:"x_{10}"}),"?"]}),e.jsxs(i.p,{children:["Der Zähler steht bei Ziel ",e.jsx(n,{children:"n = 10"})," und Schritt ",e.jsx(n,{children:"10"})," auf ",e.jsx(n,{children:"54"}),`; die Iteration kommt für
dieselben zehn Zahlen mit `,e.jsx(n,{children:"8"})," Additionen aus."]})]})]}),`
`,e.jsxs(i.h3,{id:"sec-algorithmenarten-in-ml-und-statistik",children:["2.2.4 ","Algorithmenarten in ML und Statistik"]}),`
`,e.jsxs(i.p,{children:[`Der Fibonacci-Algorithmus ist also exakt, direkt und deterministisch. Diese drei Angaben
liegen auf den unabhängigen Achsen aus `,e.jsx(i.a,{href:"#sec-2.1",children:"Abschnitt 2.1"}),`. Wo auf diesen Achsen
liegen die Verfahren, mit denen wir in Statistik und Machine Learning tatsächlich
arbeiten?`]}),`
`,e.jsx(x,{kind:"Beispiel",label:"2.2.4 (Algorithmenarten in ML und Statistik)",id:"env-algorithmenarten-in-ml-und-statistik",children:e.jsxs(i.p,{children:[`Matrixmultiplikation und Gauß-Elimination sind wie unser Fibonacci-Algorithmus exakt,
direkt und deterministisch. Gradientenabstieg und Newton-Verfahren erzeugen dagegen
Näherungsfolgen und stoppen nach einem Abbruchkriterium: numerisch iterativ und damit
zugleich approximativ. Monte-Carlo-Integration, MCMC und randomisierte
Quicksort-Varianten verwenden zusätzlich Zufall. Kombiniert sind die Achsen dabei fast
immer (`,e.jsx(i.a,{href:"#env-arten-von-algorithmen",children:"Bemerkung 2.1.6"}),")."]})}),`
`,e.jsxs(i.h3,{id:"sec-was-ist-ein-guter-algorithmus",children:["2.2.5 ","Was ist ein guter Algorithmus?"]}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.2.5 (Eine Analogie)",id:"env-eine-analogie",children:e.jsxs(i.p,{children:["Problem: ",e.jsx(i.em,{children:"Koche Schweinsbraten wie bei Oma."}),` Dann entspricht der Algorithmus dem
Kochrezept, und der Computer dem Koch, der sich zwar an das Rezept hält, dabei aber
Fehler macht.`]})}),`
`,e.jsxs(i.p,{children:[`Die Analogie trägt weiter, als sie zunächst wirkt. Erstens: Für dasselbe Gericht gibt es
viele Rezepte, und sie sind nicht gleich gut, genau wie unsere beiden Fibonacci-Varianten
dasselbe Problem lösen, aber zu drastisch verschiedenen Kosten. Zweitens: Ein gutes
Rezept ist `,e.jsx(i.em,{children:"robust"}),` gegen die kleinen Ungenauigkeiten des Kochs; ein gutes numerisches
Verfahren verstärkt die unvermeidlichen `,e.jsx(h,{id:"rounding-error",children:"Rundungsfehler"}),` des Computers
nicht unnötig. Zusammengefasst wollen wir Algorithmen, die`]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"möglichst exakte Ergebnisse liefern,"}),`
`,e.jsx(i.li,{children:"schnell sind,"}),`
`,e.jsx(i.li,{children:"wenig Speicher brauchen."}),`
`]}),`
`,e.jsxs(i.p,{children:[`Diese drei Wünsche stehen oft in Konkurrenz: Mehr Genauigkeit kostet in der Regel
Rechenzeit oder Speicher, und der schnellste Weg ist nicht immer der stabilste. Um solche
Abwägungen treffen zu können, müssen wir „schnell" und „wenig Speicher" erst einmal
präzise messen. Das ist das Thema des `,e.jsx(i.a,{href:"#sec-2.3",children:"nächsten Abschnitts"}),`. Wie wir „möglichst
exakt" trotz Rundungsfehlern erreichen, beschäftigt uns dann ausführlich in Kapitel 4;
Kapitel 3 stellt dafür zunächst Normen als Fehlermaße bereit.`]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §1.1 (Näherungen und Fehlerquellen im wissenschaftlichen Rechnen);
Cormen, Leiserson, Rivest & Stein, `,e.jsx(i.em,{children:"Introduction to Algorithms"}),`, der Klassiker zu Entwurf
und Analyse von Algorithmen.`]})})]})}function an(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ne,{...r})}):Ne(r)}const U=v.blau,$e=v.rot,se=v.orange;function B({label:r,formula:i,value:s}){return e.jsxs("div",{className:"flex items-baseline justify-between gap-3 text-sm",children:[e.jsxs("span",{children:[r," ",e.jsx(n,{children:i})]}),e.jsx("span",{className:"font-mono tabular-nums",children:N(s)})]})}const I={n:100,d:100,m:100};function cn(){const[r,i]=w.useState(I.n),[s,c]=w.useState(I.d),[t,_]=w.useState(I.m),[m,f]=w.useState(null),p=r*(2*s-1),u=r*s+s+r,b=r*t*(2*s-1),o=r*s+s*t+r*t,k=()=>{f({mv:p,mm:b,n:r,d:s,m:t}),i(Math.min(400,r*2)),c(Math.min(400,s*2)),_(Math.min(400,t*2))},F=()=>{f(null),i(I.n),c(I.d),_(I.m)},g=m!==null&&r===2*m.n&&s===2*m.d&&t===2*m.m,D=m?p/m.mv:0,z=m?b/m.mm:0;let y;return g?y=e.jsxs(e.Fragment,{children:["Alle drei Dimensionen verdoppelt: Das Matrix-Vektor-Produkt kostet jetzt das"," ",e.jsxs("strong",{style:{color:U},children:[D.toFixed(1).replace(".",","),"-fache"]}),", das Matrix-Matrix-Produkt das"," ",e.jsxs("strong",{style:{color:se},children:[z.toFixed(1).replace(".",","),"-fache"]}),". Das sind die Faktoren ",e.jsx(n,{children:"2^2"})," und ",e.jsx(n,{children:"2^3"})," aus ",A("satz:aufwand-der-matrix-vektor-multiplikation"),": In"," ",e.jsx(n,{children:"2nd"})," stecken zwei Dimensionen, in ",e.jsx(n,{children:"2ndm"})," drei."]}):t===1?y=e.jsxs(e.Fragment,{children:["Mit ",e.jsx(n,{children:"m = 1"})," ist ",e.jsx(n,{children:"\\bB"})," ein einspaltiger Vektor, und das Matrix-Matrix-Produkt ",e.jsx("em",{children:"ist"})," das Matrix-Vektor-Produkt: beide Zähler zeigen"," ",N(p)," Operationen. Jede weitere Spalte kostet noch einmal dasselbe."]}):y=e.jsxs(e.Fragment,{children:["Das Matrix-Matrix-Produkt kostet gerade das ",e.jsxs("strong",{children:[N(t),"-fache"]})," des Matrix-Vektor-Produkts, denn es besteht aus ",e.jsx(n,{children:"m"})," Matrix-Vektor-Produkten, eines pro Spalte von ",e.jsx(n,{children:"\\bB"})," (",A("satz:aufwand-der-matrix-vektor-multiplikation"),"). Beim Speicher ist der Abstand viel kleiner (",N(o)," gegen ",N(u)," Zahlen): Rechenzeit und Speicher wachsen nicht im selben Tempo."]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(te,{children:"Verdoppeln wir alle drei Dimensionen und lesen ab, um welchen Faktor die beiden Gesamtzahlen wachsen."}),e.jsxs("div",{className:"max-w-md",children:[e.jsx(K,{label:"n (Zeilen von A)",value:r,onChange:M=>i(Math.round(M)),min:1,max:400,step:1,fmt:N,accent:U}),e.jsx(K,{label:"d (Spalten von A)",value:s,onChange:M=>c(Math.round(M)),min:1,max:400,step:1,fmt:N,accent:U}),e.jsx(K,{label:"m (Spalten von B)",value:t,onChange:M=>_(Math.round(M)),min:1,max:400,step:1,fmt:N,accent:se})]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("button",{type:"button",className:xe,onClick:k,disabled:r>=400&&s>=400&&t>=400,children:"alle Dimensionen verdoppeln"}),e.jsx("button",{type:"button",className:xe,onClick:F,children:"zurücksetzen"})]}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs("div",{className:`space-y-1 p-3 ${G}`,children:[e.jsxs("p",{className:"mb-2 font-medium",style:{color:U},children:["Matrix-Vektor: ",e.jsx(n,{children:"\\by = \\bA\\bx"}),", ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times d}"})]}),e.jsx(B,{label:"Multiplikationen",formula:"nd",value:r*s}),e.jsx(B,{label:"Additionen",formula:"n(d-1)",value:r*(s-1)}),e.jsx(B,{label:"gesamt",formula:"n(2d-1)",value:p}),e.jsx(B,{label:"Näherung",formula:"2nd",value:2*r*s}),e.jsx("div",{className:"my-1 border-t border-slate-300 dark:border-slate-600"}),e.jsx(B,{label:"Speicher (Zahlen)",formula:"nd + d + n",value:u})]}),e.jsxs("div",{className:`space-y-1 p-3 ${G}`,children:[e.jsxs("p",{className:"mb-2 font-medium",style:{color:se},children:["Matrix-Matrix: ",e.jsx(n,{children:"\\bC = \\bA\\bB"}),", ",e.jsx(n,{children:"\\bB \\in \\R^{d \\times m}"})]}),e.jsx(B,{label:"Multiplikationen",formula:"ndm",value:r*s*t}),e.jsx(B,{label:"Additionen",formula:"nm(d-1)",value:r*t*(s-1)}),e.jsx(B,{label:"gesamt",formula:"nm(2d-1)",value:b}),e.jsx(B,{label:"Näherung",formula:"2ndm",value:2*r*s*t}),e.jsx("div",{className:"my-1 border-t border-slate-300 dark:border-slate-600"}),e.jsx(B,{label:"Speicher (Zahlen)",formula:"nd + dm + nm",value:o})]})]}),e.jsx(H,{kind:g?"warn":"neutral",children:y})]})}const Re=[{label:"n",color:U,f:r=>r},{label:"n²",color:se,f:r=>r*r},{label:"2ⁿ",color:$e,f:r=>Math.pow(2,r)}];function hn(){return e.jsxs("div",{className:"my-4 space-y-2",children:[e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx(me,{xLabel:"n",yLabel:"Operationen",series:Re.map(r=>({f:r.f,color:r.color,label:r.label})),xDomain:[1,30],yDomain:[0,1e3],width:300,height:230,ariaLabel:"Lineare Skala: die Kurven n und n Quadrat bleiben flach, 2 hoch n verlässt den Bildausschnitt schon bei n gleich 10 als fast senkrechte Wand."}),e.jsx(me,{xLabel:"n",yLabel:"log₁₀(Operationen)",series:Re.map(r=>({f:i=>i>=1?Math.log10(r.f(i)):NaN,color:r.color,label:r.label})),xDomain:[1,30],yDomain:[0,9.5],width:300,height:230,ariaLabel:"Logarithmische Skala: n und n Quadrat sind flache, immer flacher werdende Kurven, 2 hoch n ist eine Gerade."})]}),e.jsxs("p",{className:`max-w-prose text-xs ${P}`,children:["Dieselben drei Kurven, links auf linearer, rechts auf logarithmischer Skala (",e.jsx("span",{style:{color:U},children:"n"}),", ",e.jsx("span",{style:{color:se},children:"n²"}),","," ",e.jsx("span",{style:{color:$e},children:"2ⁿ"}),"). Eine Einheit nach oben bedeutet rechts den zehnfachen Aufwand."]})]})}function Ve({frage:r,optionen:i,richtig:s,loesung:c}){const[t,_]=w.useState(null),[m,f]=w.useState(!1),p=t!==null,u=p&&t===s;return e.jsxs("div",{className:"my-4 max-w-prose rounded border border-slate-200 p-4 dark:border-slate-700",children:[e.jsx("div",{className:"mb-3",children:r}),e.jsx("div",{className:"flex flex-col gap-2",children:i.map((b,o)=>{const F=t===o?o===s?"border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40":"border-red-600 bg-red-50 dark:bg-red-950/40":"border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800";return e.jsxs("button",{type:"button",className:`rounded border px-3 py-1.5 text-left text-sm ${F}`,onClick:()=>_(o),children:[e.jsxs("span",{className:"mr-2 font-mono text-xs text-slate-500",children:[String.fromCharCode(97+o),")"]}),b]},o)})}),p&&e.jsx("p",{className:`mt-3 text-sm font-medium ${u?"text-emerald-700 dark:text-emerald-400":"text-red-700 dark:text-red-400"}`,children:u?"Richtig!":"Leider nein, noch einmal probieren oder die Lösung ansehen."}),e.jsx("button",{type:"button",className:"mt-3 rounded bg-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600",onClick:()=>f(b=>!b),"aria-expanded":m,children:m?"Lösung verbergen":"Lösung anzeigen"}),m&&e.jsx("div",{className:"mt-3 space-y-2 text-sm",children:c})]})}function Ze(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-2.2",children:"Abschnitt 2.2"}),` haben wir gesehen, dass zwei Algorithmen dasselbe Problem
lösen und sich dabei dramatisch unterschiedlich anfühlen können: Der Aufruf-Zähler der
naiven Fibonacci-Rekursion explodiert schon für kleine `,e.jsx(n,{children:"n"}),`, die iterative Variante ist
sofort fertig. „Fühlt sich langsam an" ist aber kein mathematischer Begriff. In diesem
Abschnitt machen wir daraus eine Größe, die wir `,e.jsx(i.em,{children:"zählen"}),` können (den Aufwand eines
Algorithmus), und lernen dann, wie man Aufwände sinnvoll vergleicht: nicht über exakte
Zahlen, sondern über ihr `,e.jsx(i.em,{children:"Skalierungsverhalten"}),", die Komplexität."]}),`
`,e.jsxs(i.h3,{id:"sec-zeit-und-speicheraufwand",children:["2.3.1 ","Zeit- und Speicheraufwand"]}),`
`,e.jsxs(i.p,{children:[`Was kostet ein Algorithmus? Der Computer führt ihn letztlich als Folge
`,e.jsx(i.em,{children:"elementarer Rechenoperationen"}),` aus: Additionen, Subtraktionen, Multiplikationen und
Divisionen von `,e.jsx(h,{id:"floating-point",children:"Gleitkommazahlen"}),`. Jede dieser Operationen kostet
ungefähr gleich viel Zeit, also ist ihre `,e.jsx(i.em,{children:"Anzahl"}),` ein gutes Maß für die Laufzeit.
Genauso können wir zählen, wie viele Zahlen der Algorithmus unterwegs im Speicher
halten muss.`]}),`
`,e.jsxs(x,{kind:"Definition",label:"2.3.1 (Zeit- und Speicheraufwand)",id:"env-zeit-und-speicheraufwand",children:[e.jsxs(i.p,{children:[`Ein Algorithmus werde durch elementare Operationen ausgeführt: Rechenoperationen
`,e.jsx(n,{children:"f_i \\in \\lbrace +, -, \\cdot, / \\rbrace"}),`, aber auch Vergleiche, Zuweisungen und
Speicherzugriffe, jede mit (etwa) konstantem Aufwand.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Der ",e.jsx(i.em,{children:"Zeitaufwand"}),` des Algorithmus ist die Anzahl dieser elementaren Operationen.
Höherer Zeitaufwand bedeutet (ungefähr) längere Laufzeit.`]}),`
`,e.jsxs(i.li,{children:["Der ",e.jsx(i.em,{children:"Speicheraufwand"}),` ist (in etwa) die Anzahl der gespeicherten und
zwischengespeicherten Zahlen. Höherer Speicheraufwand bedeutet mehr benötigten
Speicherplatz.`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["Elementare Gleitkomma-Operationen heißen in der Numerik-Literatur auch ",e.jsx(i.em,{children:"FLOPs"}),`
(engl. `,e.jsx(i.em,{children:"floating point operations"}),"); „der Algorithmus braucht ",e.jsx(n,{children:"2nd"}),` FLOPs" ist also nur
eine kompakte Sprechweise für unseren Zeitaufwand. Der Zusatz „ungefähr" in der
Definition ist übrigens Absicht: Reale Laufzeiten hängen auch von Speicherzugriffen,
Zwischenspeichern (Caches) und Parallelisierung ab. Für den Vergleich von Algorithmen
ist das Zählen der Operationen trotzdem das richtige Werkzeug, wie wir gleich sehen
werden.`]}),`
`,e.jsxs(i.h3,{id:"sec-beispiel-matrix-vektor-multiplikation",children:["2.3.2 ","Beispiel: Matrix-Vektor-Multiplikation"]}),`
`,e.jsxs(i.p,{children:[`Zählen wir das an einem Arbeitspferd der Statistik konkret durch: dem
`,e.jsx(h,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"})," ",e.jsx(n,{children:"\\by = \\bA\\bx"}),`. Es steckt in jeder
Vorhersage eines linearen Modells und in jeder Schicht eines neuronalen Netzes. Sein
Aufwand ist also alles andere als eine akademische Frage. Wir verfolgen die
`,e.jsx(h,{id:"matrix",children:"Matrix"})," ",e.jsx(n,{children:"\\cbred{\\bA}"})," in Rot und den ",e.jsx(h,{id:"vector",children:"Vektor"})," ",e.jsx(n,{children:"\\cblue{\\bx}"}),` in
Blau durch die Rechnung; das Ergebnis `,e.jsx(n,{children:"\\cbgreen{\\by}"})," erscheint in Grün."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.3.2 (Matrix-Vektor-Multiplikation)",id:"env-matrix-vektor-multiplikation",children:[e.jsxs(i.p,{children:["Berechne ",e.jsx(n,{children:"\\by = \\bA\\bx"})," für ",e.jsx(n,{children:"\\bA \\in \\R^{3 \\times 2}"}),", ",e.jsx(n,{children:"\\bx \\in \\R^2"}),", konkret"]}),e.jsx(d,{children:"\\cbred{\\bA} = \\cbred{\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}}, \\qquad \\cblue{\\bx} = \\cblue{\\begin{pmatrix} 7 \\\\ 8 \\end{pmatrix}}."}),e.jsxs(i.p,{children:["Jede Komponente von ",e.jsx(n,{children:"\\cbgreen{\\by}"}),` ist das Skalarprodukt einer Zeile von
`,e.jsx(n,{children:"\\cbred{\\bA}"})," mit ",e.jsx(n,{children:"\\cblue{\\bx}"}),":"]}),e.jsx(d,{children:"\\begin{aligned} \\cgreen{y_1} &= \\cred{1} \\cdot \\cblue{7} + \\cred{2} \\cdot \\cblue{8} = 7 + 16 = \\cgreen{23} && \\text{(2 Mult., 1 Add.)} \\\\ \\cgreen{y_2} &= \\cred{3} \\cdot \\cblue{7} + \\cred{4} \\cdot \\cblue{8} = 21 + 32 = \\cgreen{53} && \\text{(2 Mult., 1 Add.)} \\\\ \\cgreen{y_3} &= \\cred{5} \\cdot \\cblue{7} + \\cred{6} \\cdot \\cblue{8} = 35 + 48 = \\cgreen{83} && \\text{(2 Mult., 1 Add.)} \\end{aligned}"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Zeitaufwand:"})," ",e.jsx(n,{children:"3 \\cdot 2 = 6"})," Multiplikationen und ",e.jsx(n,{children:"3 \\cdot 1 = 3"}),` Additionen,
zusammen `,e.jsx(n,{children:"9"})," Operationen."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Speicheraufwand:"})," ",e.jsx(n,{children:"6"})," Zahlen für ",e.jsx(n,{children:"\\cbred{\\bA}"}),", ",e.jsx(n,{children:"2"})," für ",e.jsx(n,{children:"\\cblue{\\bx}"}),", ",e.jsx(n,{children:"3"}),` für
`,e.jsx(n,{children:"\\cbgreen{\\by}"}),", zusammen ",e.jsx(n,{children:"11"})," Zahlen."]}),`
`]})]}),`
`,e.jsx(i.p,{children:"Das Muster aus dem Beispiel verallgemeinert sich direkt auf beliebige Dimensionen:"}),`
`,e.jsxs(x,{kind:"Satz",label:"2.3.3 (Aufwand der Matrix-Vektor-Multiplikation)",id:"env-aufwand-der-matrix-vektor-multiplikation",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times d}"})," und ",e.jsx(n,{children:"\\bx \\in \\R^d"}),". Die Berechnung von ",e.jsx(n,{children:"\\by = \\bA\\bx"})," hat"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Zeitaufwand ",e.jsx(n,{children:"nd"})," Multiplikationen ",e.jsx(n,{children:"+\\; n(d-1)"})," Additionen ",e.jsx(n,{children:"= n(2d - 1) \\approx 2nd"}),`
Operationen,`]}),`
`,e.jsxs(i.li,{children:["Speicheraufwand ",e.jsx(n,{children:"nd + d + n"})," Zahlen (für ",e.jsx(n,{children:"\\bA"}),", ",e.jsx(n,{children:"\\bx"})," und ",e.jsx(n,{children:"\\by"}),")."]}),`
`]})]}),`
`,e.jsxs(L,{title:"Beweis durch genaues Zählen der Operationen",children:[e.jsxs(je,{children:[e.jsxs(S,{why:e.jsxs(e.Fragment,{children:["Definition des ",e.jsx(h,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkts"}),", komponentenweise in ",e.jsx(h,{id:"summation-notation",children:"Summenschreibweise"}),": ",e.jsx(n,{children:"d"})," Produkte ",e.jsx(n,{children:"\\cred{a_{ij}}\\,\\cblue{x_j}"}),", und um ",e.jsx(n,{children:"d"})," Summanden aufzuaddieren, braucht es ",e.jsx(n,{children:"d - 1"})," Additionen"]}),children:[e.jsx(d,{children:"\\cgreen{y_i} = \\sum_{j=1}^{d} \\cred{a_{ij}}\\, \\cblue{x_j}, \\qquad i = 1, \\ldots, n"}),e.jsxs(i.p,{children:["Jede Komponente ",e.jsx(n,{children:"\\cgreen{y_i}"})," kostet damit ",e.jsx(n,{children:"d"})," Multiplikationen und ",e.jsx(n,{children:"d - 1"})," Additionen."]})]}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"n"})," Komponenten ",e.jsx(n,{children:"\\cgreen{y_1}, \\ldots, \\cgreen{y_n}"}),", jede gleich teuer; für großes ",e.jsx(n,{children:"d"})," ist der Term ",e.jsx(n,{children:"-n"})," gegenüber ",e.jsx(n,{children:"2nd"})," vernachlässigbar. Den Speicheraufwand erhalten wir, indem wir die beteiligten Objekte zählen: die Eingaben ",e.jsx(n,{children:"\\bA"})," (",e.jsx(n,{children:"nd"})," Einträge) und ",e.jsx(n,{children:"\\bx"})," (",e.jsx(n,{children:"d"})," Einträge) plus das Ergebnis ",e.jsx(n,{children:"\\by"})," (",e.jsx(n,{children:"n"})," Einträge)"]}),children:e.jsx(d,{children:"n \\cdot d + n \\cdot (d - 1) = n(2d - 1) = 2nd - n \\approx 2nd"})})]}),e.jsxs(i.p,{children:["Die Faustregel lautet also: ",e.jsx(i.em,{children:"Matrix-Vektor kostet"})," ",e.jsx(n,{children:"\\approx 2nd"})," ",e.jsx(i.em,{children:"Operationen"}),`, je zwei
pro Matrixeintrag, eine Multiplikation und eine Addition. Dieselbe Zählung funktioniert
für die `,e.jsx(h,{id:"matrix-multiplication",children:"Matrix-Matrix-Multiplikation"})," ",e.jsx(n,{children:"\\bC = \\bA\\bB"}),` mit
`,e.jsx(n,{children:"\\bB \\in \\R^{d \\times m}"}),": Sie besteht aus ",e.jsx(n,{children:"m"}),` Matrix-Vektor-Produkten (eines pro Spalte
von `,e.jsx(n,{children:"\\bB"}),"), kostet also ",e.jsx(n,{children:"\\approx 2ndm"}),` Operationen. Damit stellt sich sofort die Frage, die
uns den Rest des Kapitels beschäftigt: Was passiert mit diesen Zahlen, wenn das Problem
größer wird? Verdoppeln wir alle Dimensionen, verdoppelt sich dann auch der Aufwand?`]})]}),`
`,e.jsxs(de,{title:"FLOP-Zähler: Was kosten Matrix-Vektor- und Matrix-Matrix-Produkt?",children:[e.jsx(cn,{}),e.jsxs(i.p,{children:[`Der Zähler zeigt: Nein. Beim Matrix-Vektor-Produkt stecken zwei Dimensionen im Produkt
`,e.jsx(n,{children:"2nd"}),`, also wird der Aufwand beim Verdoppeln aller Dimensionen viermal so groß; beim
Matrix-Matrix-Produkt sind es drei Dimensionen und damit der Faktor acht. Der Speicher
wächst dabei langsamer als die Rechenzeit.`]})]}),`
`,e.jsx(i.p,{children:`Diese Faktoren, nicht die absoluten Zahlen, sind das, was einen Algorithmus praktisch
brauchbar oder unbrauchbar macht.`}),`
`,e.jsx("h3",{id:"sec-2.3-quiz",children:"Selbsttest: Operationen und Speicher zählen"}),`
`,e.jsxs(i.p,{children:[`Zeit für einen Selbsttest. Versuchen wir uns an zwei Fragen zum Aufwand.
Gegeben sind `,e.jsx(n,{children:"\\bA \\in \\R^{n \\times d}"})," und ",e.jsx(n,{children:"\\bx, \\by \\in \\R^d"}),", und wir wollen"]}),`
`,e.jsx(d,{children:"\\bz = f(\\bA, \\bx, \\by) = \\bA(\\bx - \\by) = \\sum_{i=1}^{d} (x_i - y_i)\\, \\bA_{\\cdot i}"}),`
`,e.jsxs(i.p,{children:["berechnen, also eine ",e.jsx(h,{id:"linear-combination",children:"Linearkombination"}),` der Spalten
`,e.jsx(n,{children:"\\bA_{\\cdot i}"})," von ",e.jsx(n,{children:"\\bA"}),". Der Algorithmus arbeitet die Summe spaltenweise ab:"]}),`
`,e.jsx(x,{kind:"Algorithmus",label:"2.3.4 (Spaltenweise Auswertung)",id:"env-spaltenweise-auswertung",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Initialisiere ",e.jsx(n,{children:"\\bz = \\bnull \\in \\R^n"}),"."]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"i = 1, \\ldots, d"}),": berechne den Skalar ",e.jsx(n,{children:"(x_i - y_i)"}),` und aktualisiere
`,e.jsx(n,{children:"\\bz \\leftarrow \\bz + (x_i - y_i) \\cdot \\bA_{\\cdot i}"}),"."]}),`
`]})}),`
`,e.jsx(Ve,{frage:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Quiz 1."})," Wie viele elementare Rechenoperationen benötigt",A("algorithmus:spaltenweise-auswertung"),"?"]}),optionen:[e.jsx(n,{children:"2n + d"}),e.jsx(n,{children:"2dn + d"}),e.jsx(n,{children:"dn^2"}),e.jsx(n,{children:"2(n + d)"})],richtig:1,loesung:e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Der Zeitaufwand ist ",e.jsx(n,{children:"2nd + d"})," Operationen. Zählen wir eine Iteration"," ",e.jsx(n,{children:"i \\in \\lbrace 1, \\ldots, d \\rbrace"})," der Schleife durch:"]}),e.jsxs(i.ol,{className:"list-decimal space-y-1 pl-5",children:[e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Subtraktion:"})," ",e.jsx(n,{children:"(x_i - y_i)"}),", das ist ",e.jsx(n,{children:"1"})," Operation."]}),e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Skalierung:"})," ",e.jsx(n,{children:"(x_i - y_i) \\cdot \\bA_{\\cdot i}"}),"; der Skalar trifft jeden der ",e.jsx(n,{children:"n"})," Einträge der Spalte, also"," ",e.jsx(n,{children:"n"})," Multiplikationen."]}),e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Aktualisierung:"})," ",e.jsx(n,{children:"\\bz \\leftarrow \\bz + \\ldots"}),", also"," ",e.jsx(n,{children:"n"})," Additionen, eine pro Eintrag."]})]}),e.jsxs(i.p,{children:["Pro Iteration sind das ",e.jsx(n,{children:"1 + n + n = 2n + 1"})," Operationen, und die Schleife läuft ",e.jsx(n,{children:"d"}),"-mal:"]}),e.jsx(d,{children:"d \\cdot (2n + 1) = 2nd + d."}),e.jsxs(i.p,{children:["Zum Vergleich: Das ist bis auf den kleinen Term ",e.jsx(n,{children:"+\\,d"})," dasselbe"," ",e.jsx(n,{children:"\\approx 2nd"})," wie beim gewöhnlichen Matrix-Vektor-Produkt aus"," ",A("satz:aufwand-der-matrix-vektor-multiplikation")," – kein Wunder, denn es"," ",e.jsx(i.em,{children:"ist"})," ein Matrix-Vektor-Produkt, nur spaltenweise organisiert."]})]})}),`
`,e.jsx(Ve,{frage:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Quiz 2."})," Für wie viele Gleitkommazahlen braucht ",A("algorithmus:spaltenweise-auswertung"),"Speicherplatz?"]}),optionen:[e.jsx(n,{children:"3n + d"}),e.jsx(n,{children:"4nd"}),e.jsx(n,{children:"2(n + d)"}),e.jsx(n,{children:"n + nd + 2d"})],richtig:3,loesung:e.jsxs(e.Fragment,{children:[e.jsx(i.p,{children:"Wir zählen einfach alle Objekte, die im Speicher liegen müssen:"}),e.jsxs(i.ul,{className:"list-disc space-y-1 pl-5",children:[e.jsxs(i.li,{children:["das Ergebnis ",e.jsx(n,{children:"\\bz \\in \\R^n"}),": ",e.jsx(n,{children:"n"})," Zahlen,"]}),e.jsxs(i.li,{children:["die Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times d}"}),": ",e.jsx(n,{children:"nd"})," Zahlen,"]}),e.jsxs(i.li,{children:["die Vektoren ",e.jsx(n,{children:"\\bx, \\by \\in \\R^d"}),": je ",e.jsx(n,{children:"d"}),", zusammen"," ",e.jsx(n,{children:"2d"})," Zahlen."]})]}),e.jsxs(i.p,{children:["Insgesamt also ",e.jsx(n,{children:"n + nd + 2d"})," Gleitkommazahlen. (Streng genommen kommt noch der eine Skalar ",e.jsx(n,{children:"(x_i - y_i)"})," als Zwischenergebnis dazu; solche konstanten Zusatzterme spielen keine Rolle, wie der nächste Unterabschnitt zeigt.)"]})]})}),`
`,e.jsxs(i.h3,{id:"sec-komplexitaet-wie-skaliert-der-aufwand",children:["2.3.3 ","Komplexität: Wie skaliert der Aufwand?"]}),`
`,e.jsxs(i.p,{children:["Beim Nachrechnen der Quizfragen ist vielleicht aufgefallen: Ob nun ",e.jsx(n,{children:"2nd + d"}),` oder
`,e.jsx(n,{children:"2nd - n"})," oder ",e.jsx(n,{children:"2nd"}),` herauskommt, hängt von Buchhaltungsdetails ab: zählt man die
Initialisierung mit? Das Zwischenergebnis? Solche Details sind für den Vergleich von
Algorithmen unwichtig. Die `,e.jsx(i.em,{children:"exakte"}),` Anzahl an Operationen und gespeicherten Zahlen
interessiert uns nicht. Was uns interessiert, ist, `,e.jsx(i.em,{children:`wie der Aufwand mit der Größe des
Problems wächst`}),": Was passiert, wenn wir statt ",e.jsx(n,{children:"1000"})," Datenpunkten ",e.jsx(n,{children:"10\\,000"}),` haben?
Statt `,e.jsx(n,{children:"10"})," Kovariablen ",e.jsx(n,{children:"1000"}),"?"]}),`
`,e.jsx(x,{kind:"Definition",label:"2.3.5 (Komplexität)",id:"env-komplexitaet",children:e.jsxs(i.p,{children:[`Wie der Zeit- bzw. Speicheraufwand eines Algorithmus mit der Größe des Problems
`,e.jsx(i.em,{children:"skaliert"}),", nennen wir die ",e.jsx(i.em,{children:"Laufzeitkomplexität"})," bzw. ",e.jsx(i.em,{children:"Speicherkomplexität"}),` des
Algorithmus.`]})}),`
`,e.jsx(x,{kind:"Beispiel",label:"2.3.6",id:"env-beispiel-2-3-6",children:e.jsxs(i.p,{children:["Ein Algorithmus benötige ",e.jsx(n,{children:"4n^3 + 16n^2 + 239"})," Operationen. Für großes ",e.jsx(n,{children:"n"}),` ist
`,e.jsx(n,{children:"16n^2 + 239"})," gegenüber ",e.jsx(n,{children:"4n^3"})," vernachlässigbar: Bei ",e.jsx(n,{children:"n = 100"}),` steuert der kubische
Term `,e.jsx(n,{children:"4 \\cdot 10^6"})," Operationen bei, die restlichen Terme nur ",e.jsx(n,{children:"160\\,239"}),`, rund
`,e.jsx(n,{children:"4\\,\\%"})," des Gesamtaufwands. Bei ",e.jsx(n,{children:"n = 1000"})," sind es nur noch ",e.jsx(n,{children:"0{,}4\\,\\%"}),`. Der
Algorithmus `,e.jsx(i.em,{children:"skaliert"})," also wie ",e.jsx(n,{children:"4n^3"}),`; seine Komplexität ist von
`,e.jsx(i.em,{children:"kubischer Ordnung"}),", und wir schreiben kurz: „",e.jsx(n,{children:"O(n^3)"}),'".']})}),`
`,e.jsxs(i.p,{children:["Die Schreibweise ",e.jsx(n,{children:"O(n^3)"})," lässt dabei bewusst auch den Vorfaktor ",e.jsx(n,{children:"4"}),` weg; es zählt
allein die `,e.jsx(i.em,{children:"Ordnung"})," des Wachstums. Was genau hinter dem großen ",e.jsx(n,{children:"O"}),` steckt, definieren
wir sauber in `,e.jsx(i.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),`; hier genügt uns die Lesart „wächst höchstens
wie".`]}),`
`,e.jsxs(i.h3,{id:"sec-komplexitaetsklassen",children:["2.3.4 ","Komplexitätsklassen"]}),`
`,e.jsxs(i.p,{children:[`Die wichtigsten Wachstumsordnungen haben Namen, und es lohnt sich, für jede ein Gefühl
zu entwickeln. Der Schlüssel dazu ist die Frage: `,e.jsx(i.em,{children:`Was passiert mit dem Aufwand, wenn
sich die Problemgröße verdoppelt?`})]}),`
`,e.jsxs(x,{kind:"Bemerkung",label:"2.3.7 (Interpretation der Komplexitätsklassen)",id:"env-interpretation-der-komplexitaetsklassen",children:[e.jsxs(i.p,{children:[`Die folgenden Namen beschreiben das typische Wachstum eines Aufwands. Sie helfen
uns, die Größenordnungen einzuordnen; eine formale obere Schranke schreiben wir
später mit `,e.jsx(n,{children:"O"}),"."]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Konstant"}),": Die Anzahl der Operationen bleibt von ",e.jsx(n,{children:"n"})," unabhängig."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Logarithmisch"}),": Verdoppelt sich ",e.jsx(n,{children:"n"}),`, kommt im Modell
`,e.jsx(n,{children:"c\\log_2 n"}),` ein konstanter Aufwand hinzu, denn
`,e.jsx(n,{children:"\\log_2(2n) = \\log_2(n) + 1"})," (",e.jsx(h,{id:"logarithm",children:"Logarithmus"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Linear"}),": Verdoppelt sich ",e.jsx(n,{children:"n"}),", verdoppelt sich der führende Aufwand."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Quadratisch"}),": Verdoppelt sich ",e.jsx(n,{children:"n"}),", vervierfacht sich der führende Aufwand."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Exponentiell"}),": Verdoppelt sich ",e.jsx(n,{children:"n"}),", ",e.jsx(i.em,{children:"quadriert"}),` sich die Anzahl der
Operationen, denn `,e.jsx(n,{children:"2^{2n} = \\left(2^n\\right)^2"}),`. Schon ein einziger Schritt
`,e.jsx(n,{children:"n \\to n + 1"})," ",e.jsx(i.em,{children:"verdoppelt"})," den Aufwand."]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Algorithmen mit exponentieller Laufzeit sind damit schon für moderate
Problemgrößen häufig praktisch unbrauchbar. So steht es um die naive Fibonacci-Rekursion
aus `,e.jsx(i.a,{href:"#sec-2.2",children:"Abschnitt 2.2"}),", wie wir in ",e.jsx(i.a,{href:"#sec-2.5",children:"Abschnitt 2.5"}),` genau nachrechnen
werden. In der numerischen linearen Algebra bewegen wir uns dagegen meist
zwischen `,e.jsx(n,{children:"O(n)"})," (Vektoroperationen), ",e.jsx(n,{children:"O(n^2)"})," (Matrix-Vektor-Produkte, siehe ",e.jsx(i.a,{href:"#env-aufwand-der-matrix-vektor-multiplikation",children:"Satz 2.3.3"}),`
mit `,e.jsx(n,{children:"d = n"}),") und ",e.jsx(n,{children:"O(n^3)"})," (Matrix-Zerlegungen, Matrix-Matrix-Produkte)."]}),`
`,e.jsxs(i.p,{children:[`Wie weit diese Klassen auseinanderliegen, zeigt schon ein Bild mit drei Kurven. Auf der
linearen Skala links verlässt `,e.jsx(n,{children:"2^n"})," den Bildausschnitt bereits bei ",e.jsx(n,{children:"n = 10"}),` als fast
senkrechte Wand; alles andere liegt darunter platt am Boden. Erst die logarithmische Skala
rechts macht die Klassen vergleichbar, und dort wird `,e.jsx(n,{children:"2^n"})," zu einer Geraden:"]}),`
`,e.jsx(hn,{}),`
`,e.jsx(L,{title:"Wie groß ist exponentieller Aufwand?",children:e.jsxs(i.p,{children:["An dieser Geraden lässt sich der Preis exponentieller Verfahren ablesen. Bei ",e.jsx(n,{children:"n = 200"}),`
braucht ein `,e.jsx(n,{children:"O(2^n)"}),"-Algorithmus rund ",e.jsx(n,{children:"1{,}6 \\cdot 10^{60}"}),` Operationen. Selbst ein
Superrechner mit `,e.jsx(n,{children:"10^{18}"})," Operationen pro Sekunde rechnete daran ",e.jsx(n,{children:"5 \\cdot 10^{34}"}),` Jahre,
und das Universum ist erst etwa `,e.jsx(n,{children:"10^{10}"}),` Jahre alt. Wer feiner mit den Klassen spielen
will (welche Klassen sichtbar sind, welcher Vorfaktor, welche Skala), findet den
zugehörigen Explorer in `,e.jsx(i.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),"."]})}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.3.8 (Vorsicht: Konstanten!)",id:"env-vorsicht-konstanten",children:e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"O(\\cdot)"}),`-Notation ignoriert konstante Faktoren und Terme niedrigerer Ordnung. Ein
Algorithmus mit `,e.jsx(n,{children:"1000n + 10\\,000"})," Operationen ist ",e.jsx(n,{children:"O(n)"}),", aber trotzdem ",e.jsx(i.em,{children:"langsamer"}),` als
ein `,e.jsx(n,{children:"O(n^2)"}),"-Algorithmus mit ",e.jsx(n,{children:"n^2"})," Operationen, solange ",e.jsx(n,{children:"n^2 < 1000n + 10\\,000"}),` gilt.
Bei `,e.jsx(n,{children:"n = 100"})," etwa stehen ",e.jsx(n,{children:"110\\,000"})," Operationen gegen nur ",e.jsx(n,{children:"10\\,000"}),`. Die
Komplexitätsklasse sagt, wer für `,e.jsx(i.em,{children:"hinreichend große"}),` Probleme gewinnt, nicht, wer bei
`,e.jsx(i.em,{children:"unserem konkreten"})," Problem gewinnt."]})}),`
`,e.jsx(i.h3,{children:"Selbsttest: Aufwand und Ordnung"}),`
`,e.jsxs(le,{children:[e.jsxs(Q,{loesung:1010,toleranz:5,children:[e.jsxs(i.p,{children:["Ab welchem ",e.jsx(n,{children:"n"})," ist ein Algorithmus mit ",e.jsx(n,{children:"n^2"}),` Operationen schneller als einer mit
`,e.jsx(n,{children:"1000n + 10\\,000"})," Operationen?"]}),e.jsxs(i.p,{children:["Der Schnittpunkt liegt bei ",e.jsx(n,{children:"n = 500 + \\sqrt{260\\,000} \\approx 1009{,}9"}),". Für ",e.jsx(n,{children:"n = 1009"}),`
stehen `,e.jsx(n,{children:"1\\,018\\,081"})," gegen ",e.jsx(n,{children:"1\\,019\\,000"})," Operationen, für ",e.jsx(n,{children:"n = 1010"}),` dagegen
`,e.jsx(n,{children:"1\\,020\\,100"})," gegen ",e.jsx(n,{children:"1\\,020\\,000"}),"."]})]}),e.jsxs(Q,{loesung:8,toleranz:0,children:[e.jsxs(i.p,{children:[`Um welchen Faktor wächst der Zeitaufwand des Matrix-Matrix-Produkts, wenn wir im
FLOP-Zähler `,e.jsx(n,{children:"n"}),", ",e.jsx(n,{children:"d"})," und ",e.jsx(n,{children:"m"})," gleichzeitig verdoppeln?"]}),e.jsxs(i.p,{children:["In ",e.jsx(n,{children:"2ndm"})," stecken drei Dimensionen, also ",e.jsx(n,{children:"2^3 = 8"}),`. Beim Matrix-Vektor-Produkt sind es
nur zwei Dimensionen und damit der Faktor `,e.jsx(n,{children:"4"}),"."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein ",e.jsx(n,{children:"O(n)"}),"-Algorithmus ist für jedes ",e.jsx(n,{children:"n"})," schneller als ein ",e.jsx(n,{children:"O(n^2)"}),"-Algorithmus."]}),e.jsxs(i.p,{children:[`Die Landau-Notation ignoriert Vorfaktoren, und die können jede endliche Problemgröße
dominieren (`,e.jsx(i.a,{href:"#env-vorsicht-konstanten",children:"Bemerkung 2.3.8"}),"). Die Aussage gilt nur für ",e.jsx(i.em,{children:"hinreichend große"})," ",e.jsx(n,{children:"n"}),"."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §1.1 (Kosten und Genauigkeit wissenschaftlichen Rechnens);
Heath §2.4.5 (Operationen zählen am Beispiel des Gauß-Verfahrens).`})})]})}function on(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ze,{...r})}):Ze(r)}function ce({nr:r,frage:i,children:s}){return e.jsxs("details",{className:"my-2 max-w-prose rounded-md border border-slate-300 dark:border-slate-600",children:[e.jsxs("summary",{className:"cursor-pointer select-none px-3 py-2",children:[e.jsxs("span",{className:"font-semibold",children:["Frage ",r,"."]})," ",i," ",e.jsx("span",{className:"text-sm text-slate-500 dark:text-slate-400",children:"(Lösung aufklappen)"})]}),e.jsx("div",{className:"space-y-2 border-t border-slate-200 px-3 py-2 dark:border-slate-700",children:s})]})}const _e=[{key:"log",label:"log₂ n",color:v.gruen,f:r=>Math.log2(r)},{key:"lin",label:"n",color:v.blau,f:r=>r},{key:"nlogn",label:"n · log₂ n",color:v.grau,f:r=>r*Math.log2(r)},{key:"quad",label:"c · n²",color:v.orange,f:(r,i)=>i*r*r},{key:"kub",label:"n³",color:v.violett,f:r=>r*r*r},{key:"exp",label:"2ⁿ",color:v.rot,f:r=>Math.pow(2,r)}],un=1e5,C=[{id:"polyexp",name:"polynomial gegen exponentiell",scale:"linear",nMax:30,cExp:0,an:["lin","quad","exp"]},{id:"vorfaktor",name:"Vorfaktor gegen Ordnung",scale:"linear",nMax:200,cExp:2,an:["quad","kub"]},{id:"logskala",name:"log-Skala macht 2ⁿ zur Geraden",scale:"log",nMax:60,cExp:0,an:["log","lin","quad","exp"]}],Ee=r=>Object.fromEntries(_e.map(i=>[i.key,r.includes(i.key)]));function Be(r){if(!Number.isFinite(r))return"∞";if(r>=1e5){const i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i);return e.jsxs(e.Fragment,{children:[s.toFixed(1).replace(".",",")," · 10",e.jsx("sup",{children:i})]})}return r>=100?Math.round(r).toLocaleString("de-DE"):r.toFixed(1).replace(".",",")}function xn(r){let i=0;for(let s=1;s<=2e3;s++)Math.pow(2,s)<=r*s*s&&(i=s);return i+1}function mn(){const[r,i]=w.useState(C[0].id),[s,c]=w.useState(C[0].scale),[t,_]=w.useState(C[0].nMax),[m,f]=w.useState(C[0].cExp),[p,u]=w.useState(Ee(C[0].an)),b=l=>{i(l.id),c(l.scale),_(l.nMax),f(l.cExp),u(Ee(l.an))},o=Math.round(Math.pow(10,m)),k=_e.filter(l=>p[l.key]),{linSeries:F,logSeries:g,linDomain:D,logDomain:z,linLabel:y,capped:M}=w.useMemo(()=>{const l=Math.max(1,...k.map(R=>R.f(t,o))),j=p.exp?un:1/0,W=Math.min(l,j),J=W>1e4?1e3:1;return{linSeries:k.map(R=>({f:X=>X>=1?R.f(X,o)/J:NaN,color:R.color,label:R.label})),logSeries:k.map(R=>({f:X=>X>=1?Math.log10(Math.max(R.f(X,o),1e-12)):NaN,color:R.color,label:R.label})),linDomain:[0,W*1.05/J],logDomain:[-1,Math.max(Math.log10(l)*1.08,1)],linLabel:J===1e3?"f(n) in Tausend":"f(n)",capped:l>j}},[k,t,o,p.exp]),T=w.useMemo(()=>xn(o),[o]);let a,Z="neutral";if(p.exp&&p.quad)Z="warn",a=e.jsxs(e.Fragment,{children:["Mit dem Vorfaktor ",e.jsx(n,{children:`c = ${o}`})," liegt ",e.jsx(n,{children:"c \\cdot n^2"})," bis"," ",e.jsx(n,{children:`n = ${T-1}`})," über ",e.jsx(n,{children:"2^n"}),"; ab ",e.jsx(n,{children:`n = ${T}`})," gilt endgültig ",e.jsx(n,{children:"2^n > c \\cdot n^2"}),". Der Vorfaktor verschiebt die Schwelle also nur, und selbst ",e.jsx(n,{children:"c = 1000"})," kostet die Exponentialfunktion bloß 14 Schritte (von ",e.jsx(n,{children:"n = 5"})," auf ",e.jsx(n,{children:"n = 19"}),"). Nach ",A("beispiel:vereinfachung-eines-aufwandsausdrucks")," verschwindet jeder konstante Faktor in der Landau-Notation, deshalb ist ",e.jsx(n,{children:"c \\cdot n^2 = O(n^2)"})," ","unabhängig von ",e.jsx(n,{children:"c"}),"."]});else if(p.kub&&p.quad)Z="warn",a=e.jsxs(e.Fragment,{children:["Hier stehen zwei polynomiale Klassen gegeneinander: ",e.jsx(n,{children:"n^3 > c \\cdot n^2"})," gilt genau für ",e.jsx(n,{children:`n > c = ${o}`}),". Auch hier entscheidet der Vorfaktor nur, ",e.jsx("em",{children:"wo"})," ","die Kurven sich kreuzen, nicht ",e.jsx("em",{children:"ob"})," (",A("lemma:rechenregeln-fuer-landau-symbole"),", Regel 3, mit"," ",e.jsx(n,{children:"n^2 = O(n^3)"}),")."]});else if(k.length<=1)a=e.jsx(e.Fragment,{children:"Mit einer einzigen Kurve lässt sich nichts vergleichen. Schalten wir mindestens zwei Klassen an; interessant sind Paare, bei denen der Vorfaktor die eine kurzzeitig nach oben schiebt."});else{const l=k[k.length-1];a=e.jsxs(e.Fragment,{children:["Von den gewählten Klassen wächst ",e.jsx("strong",{style:{color:l.color},children:l.label})," ","am schnellsten und liegt bei ",e.jsx(n,{children:`n = ${t}`})," bei"," ",Be(l.f(t,o))," Operationen. Die Kette"," ",e.jsx(n,{children:"\\log n,\\ n,\\ n\\log n,\\ n^2,\\ n^3,\\ 2^n"})," ist strikt: Jede Klasse ist klein-o der nächsten, jede Kurve wird also von jeder weiter rechts stehenden irgendwann endgültig überholt."]})}return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(te,{children:["Wählen wir ein Preset, schieben dann den Vorfaktor ",e.jsx(n,{children:"c"})," nach oben und beobachten, wohin der Schnittpunkt wandert."]}),e.jsx("div",{className:"flex flex-wrap gap-2",role:"group","aria-label":"Presets",children:C.map(l=>e.jsx("button",{type:"button",className:r===l.id?Pe:xe,"aria-pressed":r===l.id,onClick:()=>b(l),children:l.name},l.id))}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]",children:[e.jsx("div",{className:"grid min-w-0",children:[["linear",F,D,y],["log",g,z,"log₁₀ f(n)"]].map(([l,j,W,J])=>{const R=s===l;return e.jsx("div",{"aria-hidden":!R,className:"min-w-0 transition-opacity duration-300 ease-in-out",style:{gridArea:"1 / 1",opacity:R?1:0,pointerEvents:R?void 0:"none"},children:e.jsx(me,{xLabel:"n",yLabel:J,series:j,xDomain:[1,t],yDomain:W,width:360,height:260,ariaLabel:`Komplexitätsklassen auf ${l==="linear"?"linearer":"logarithmischer"} Skala, n bis ${t}.`})},l)})}),e.jsxs("div",{className:"min-w-0 space-y-2 text-sm",children:[e.jsxs("table",{className:"w-full text-right",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-300 dark:border-slate-600",children:[e.jsx("th",{className:"py-1 text-left font-medium",children:"Klasse"}),e.jsxs("th",{className:"py-1 font-medium",children:["f(",t,")"]})]})}),e.jsx("tbody",{children:k.map(l=>e.jsxs("tr",{children:[e.jsx("td",{className:"py-0.5 text-left font-mono",style:{color:l.color},children:l.label}),e.jsx("td",{className:"py-0.5 font-mono",children:Be(l.f(t,o))})]},l.key))})]}),M&&s==="linear"&&e.jsxs("p",{className:`text-xs ${P}`,children:["Die lineare y-Achse ist bei ",e.jsx(n,{children:"10^5"})," gekappt; die schnellsten Kurven verlassen den sichtbaren Bereich als fast senkrechte Wand. Auf der log-Skala werden sie wieder vergleichbar."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4 text-sm",children:[e.jsx("div",{className:"flex overflow-hidden rounded-md border border-slate-300 dark:border-slate-600",children:["linear","log"].map(l=>e.jsx("button",{type:"button",onClick:()=>c(l),"aria-pressed":s===l,className:`px-3 py-1 ${s===l?"bg-sky-600 text-white":"bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`,children:l==="linear"?"lineare Skala":"log-Skala"},l))}),e.jsx("div",{className:"flex flex-wrap gap-3",children:_e.map(l=>e.jsxs("label",{className:"flex cursor-pointer select-none items-center gap-1",children:[e.jsx("input",{type:"checkbox",checked:p[l.key],onChange:()=>{u(j=>({...j,[l.key]:!j[l.key]})),i("")}}),e.jsx("span",{className:"font-mono",style:{color:l.color},children:l.label})]},l.key))})]}),e.jsxs("div",{className:"max-w-md",children:[e.jsx(K,{label:"n bis",value:t,onChange:_,min:10,max:200,step:5,fmt:l=>String(l)}),e.jsx(K,{label:"Vorfaktor c",value:m,onChange:f,min:0,max:3,step:.25,accent:v.orange,fmt:l=>String(Math.round(Math.pow(10,l)))})]}),e.jsx(H,{kind:Z,children:a})]})}function Le(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-2.3",children:"Abschnitt 2.3"}),` haben wir den Aufwand von
Algorithmen gemessen, indem wir elementare Operationen gezählt haben. Das Ergebnis sind
Ausdrücke wie `,e.jsx(n,{children:"4n^3 + 16n^2 + 239"}),`: exakt, aber unhandlich. Für den Vergleich
von Algorithmen interessiert uns fast immer nur eine Frage: Wie schnell wächst der
Aufwand, wenn die Problemgröße `,e.jsx(n,{children:"n"}),` groß wird? Die konkreten Vorfaktoren hängen
ohnehin von Maschine, Programmiersprache und Zählweise ab. Wir brauchen also eine
Notation, die genau das Wachstumsverhalten festhält und alles Unwesentliche wegwirft.
Das leisten die `,e.jsx(i.em,{children:"Landau-Symbole"})," (engl. ",e.jsx(i.em,{children:"big-O notation"}),")."]}),`
`,e.jsxs(i.h3,{id:"sec-klein-o-und-gross-o",children:["2.4.1 ","Klein-o und Groß-O"]}),`
`,e.jsxs(i.p,{children:["Die Idee: Wir vergleichen den Aufwand ",e.jsx(n,{children:"a_n"}),` mit einer möglichst einfachen
Vergleichsfolge `,e.jsx(n,{children:"b_n"})," (etwa ",e.jsx(n,{children:"n^2"})," oder ",e.jsx(n,{children:"2^n"}),`), indem wir den
`,e.jsx(h,{id:"limit",children:"Grenzwert"}),` des Quotienten
`,e.jsx(n,{children:"a_n / b_n"})," betrachten. Bleibt der Quotient beschränkt, wächst ",e.jsx(n,{children:"a_n"}),`
höchstens so schnell wie `,e.jsx(n,{children:"b_n"}),"; verschwindet er sogar, wächst ",e.jsx(n,{children:"a_n"}),`
echt langsamer.`]}),`
`,e.jsxs(x,{kind:"Definition",label:"2.4.1 (Landau-Symbole)",id:"env-landau-symbole",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"a_n, b_n"})," ",e.jsx(h,{id:"sequence",children:"Folgen"}),", wobei ",e.jsx(n,{children:"b_n"}),` ab einem Index
ungleich null ist.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"a_n = o(b_n)"})," („",e.jsx(n,{children:"a_n"})," ",e.jsx(i.em,{children:"ist klein-o von"})," ",e.jsx(n,{children:"b_n"}),`"),
wenn`]}),`
`,e.jsx(d,{children:"\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = 0."}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"a_n = O(b_n)"})," („",e.jsx(n,{children:"a_n"})," ",e.jsx(i.em,{children:"ist groß-O von"})," ",e.jsx(n,{children:"b_n"}),`"),
wenn`]}),`
`,e.jsx(d,{children:"\\limsup_{n \\to \\infty} \\left\\vert \\frac{a_n}{b_n} \\right\\vert < \\infty."}),`
`]}),`
`]})]}),`
`,e.jsx(i.p,{children:"Die Interpretation der Symbole:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"a_n = o(b_n)"}),": ",e.jsx(n,{children:"a_n"})," wächst ",e.jsx(i.em,{children:"langsamer"})," als ",e.jsx(n,{children:"b_n"}),`;
gegenüber `,e.jsx(n,{children:"b_n"})," wird ",e.jsx(n,{children:"a_n"})," vernachlässigbar klein."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"a_n = O(b_n)"}),": ",e.jsx(n,{children:"a_n"})," wächst ",e.jsx(i.em,{children:"höchstens so schnell"}),` wie
`,e.jsx(n,{children:"b_n"}),"; die Vergleichsfolge ",e.jsx(n,{children:"b_n"})," ist gegenüber ",e.jsx(n,{children:"a_n"}),` nicht
vernachlässigbar.`]}),`
`]}),`
`,e.jsx(L,{title:"Technische Feinheiten der Landau-Definition",children:e.jsxs(x,{kind:"Bemerkung",label:"2.4.2 (Zwei Feinheiten der Definition)",id:"env-zwei-feinheiten-der-definition",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum Limes superior statt Grenzwert?"})," Der Quotient ",e.jsx(n,{children:"a_n/b_n"}),` muss
nicht `,e.jsx(h,{id:"convergence",children:"konvergieren"}),`; er darf zum Beispiel
oszillieren. Der Limes superior (der größte Häufungswert, gebildet als Grenzwert der
`,e.jsx(h,{id:"supremum",children:"Suprema"}),` der Restfolgen) existiert dagegen
immer, notfalls als `,e.jsx(n,{children:"\\infty"}),`. Die Bedingung
`,e.jsx(n,{children:"\\limsup_{n \\to \\infty} \\left\\vert a_n / b_n \\right\\vert < \\infty"}),`
bedeutet schlicht: Ab irgendeinem Index gilt
`,e.jsx(n,{children:"\\left\\vert a_n \\right\\vert \\le C \\cdot \\left\\vert b_n \\right\\vert"}),`
für eine Konstante `,e.jsx(n,{children:"C"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Das Gleichheitszeichen ist ein Notationsmissbrauch:"}),`
`,e.jsx(n,{children:"a_n = O(b_n)"})," liest man besser als „",e.jsx(n,{children:"a_n"}),` gehört zur Klasse
`,e.jsx(n,{children:"O(b_n)"}),`". Insbesondere ist die Beziehung nicht symmetrisch: Aus
`,e.jsx(n,{children:"5n = O(n^2)"})," folgt nicht ",e.jsx(n,{children:"n^2 = O(5n)"}),"."]})]})}),`
`,e.jsxs(i.h3,{id:"sec-rechenbeispiele",children:["2.4.2 ","Rechenbeispiele"]}),`
`,e.jsxs(i.p,{children:[`Wie weist man eine Landau-Beziehung konkret nach? Wir bilden den Quotienten und rechnen
seinen Grenzwert aus. In den folgenden drei Beispielen verfolgt
`,e.jsx(n,{children:"\\cred{\\text{Rot}}"})," die untersuchte Folge ",e.jsx(n,{children:"\\cred{a_n}"}),` und
`,e.jsx(n,{children:"\\cblue{\\text{Blau}}"})," die Vergleichsfolge ",e.jsx(n,{children:"\\cblue{b_n}"}),"."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.4.3",id:"env-beispiel-2-4-3",children:[e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"(a)"})," Wir zeigen ",e.jsx(n,{children:"\\cred{3n^2 + 5n} = O(\\cblue{n^2})"}),":"]}),e.jsx(d,{children:"\\lim_{n \\to \\infty} \\frac{\\cred{3n^2 + 5n}}{\\cblue{n^2}} = \\lim_{n \\to \\infty} \\left(3 + \\frac{5}{n}\\right) = 3 < \\infty \\quimpl \\cred{3n^2 + 5n} = O(\\cblue{n^2}). \\quad \\checkmark"}),e.jsxs(i.p,{children:["Der Quotient konvergiert gegen ",e.jsx(n,{children:"3"}),`, also ist auch sein Limes superior
`,e.jsx(n,{children:"3 < \\infty"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"(b)"})," Wir zeigen ",e.jsx(n,{children:"\\cred{5n} = o(\\cblue{n^2})"}),":"]}),e.jsx(d,{children:"\\lim_{n \\to \\infty} \\frac{\\cred{5n}}{\\cblue{n^2}} = \\lim_{n \\to \\infty} \\frac{5}{n} = 0 \\quimpl \\cred{5n} = o(\\cblue{n^2}). \\quad \\checkmark"}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"(c)"})," Gilt ",e.jsx(n,{children:"\\cred{n^2} = O(\\cblue{n})"}),"? ",e.jsx(i.strong,{children:"Nein!"})]}),e.jsx(d,{children:"\\lim_{n \\to \\infty} \\frac{\\cred{n^2}}{\\cblue{n}} = \\lim_{n \\to \\infty} n = \\infty \\quad \\text{(divergiert!)} \\quimpl \\cred{n^2} \\neq O(\\cblue{n})."}),e.jsxs(i.p,{children:["Der Quotient wächst über jede Schranke hinaus; ",e.jsx(n,{children:"\\cred{n^2}"}),` wächst echt
schneller als `,e.jsx(n,{children:"\\cblue{n}"}),"."]})]}),`
`,e.jsxs(L,{title:"Warum manchmal Theta?",children:[e.jsxs(i.p,{children:[`Groß-O ist absichtlich nur eine obere Schranke. Daher heißt „ein
`,e.jsx(n,{children:"O(n^2)"}),`-Algorithmus" nicht, dass seine Laufzeit tatsächlich quadratisch ist.
Ein Sortierverfahren mit Laufzeit `,e.jsx(n,{children:"O(n \\log n)"}),` ist nämlich automatisch auch
`,e.jsx(n,{children:"O(n^2)"}),", weil ",e.jsx(n,{children:"n \\log n"})," für große ",e.jsx(n,{children:"n"})," höchstens so groß wie ",e.jsx(n,{children:"n^2"}),` ist. Die
zweite Aussage ist richtig, unterscheidet das Verfahren aber nicht von einem
tatsächlich quadratischen Verfahren.`]}),e.jsxs(i.p,{children:[`Wollen wir die Ordnung von beiden Seiten festlegen, verwenden wir
`,e.jsx(n,{children:"a_n = \\Theta(b_n)"}),". Das bedeutet zugleich ",e.jsx(n,{children:"a_n = O(b_n)"}),` und
`,e.jsx(n,{children:"b_n = O(a_n)"}),`: Bis auf konstante Faktoren wachsen beide Folgen gleich schnell.
Für `,e.jsx(n,{children:"3n^2 + 5n"})," gilt also ",e.jsx(n,{children:"\\Theta(n^2)"}),"; ",e.jsx(n,{children:"O(n^3)"}),` wäre zwar ebenfalls wahr,
aber als Beschreibung zu grob. Im Hauptstrang genügt uns meist die obere
Schranke `,e.jsx(n,{children:"O"}),`, weil sie für Laufzeit- und Fehlerabschätzungen bereits die
entscheidende Garantie liefert.`]})]}),`
`,e.jsxs(i.h3,{id:"sec-rechenregeln",children:["2.4.3 ","Rechenregeln"]}),`
`,e.jsx(i.p,{children:`Aufwandsausdrücke entstehen durch Hintereinanderausführung (Addition der Kosten) und
Verschachtelung (Multiplikation der Kosten) von Algorithmus-Bausteinen. Praktischerweise
vertragen sich die Landau-Symbole genau mit diesen beiden Operationen, so dass wir die
Grenzwertrechnung nicht jedes Mal neu machen müssen:`}),`
`,e.jsxs(x,{kind:"Lemma",label:"2.4.4 (Rechenregeln für Landau-Symbole)",id:"env-rechenregeln-fuer-landau-symbole",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"a_n, b_n > 0"})," Vergleichsfolgen."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cred{f_n} = O(a_n)"})," und ",e.jsx(n,{children:"\\cgreen{g_n} = O(b_n)"}),". Dann gilt"]}),`
`,e.jsx(d,{children:"\\cred{f_n} + \\cgreen{g_n} = O(a_n + b_n) \\quad\\text{und}\\quad \\cred{f_n} \\cdot \\cgreen{g_n} = O(a_n \\cdot b_n)."}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cred{f_n} = O(a_n)"})," und ",e.jsx(n,{children:"\\cgreen{g_n} = o(b_n)"}),". Dann gilt"]}),`
`,e.jsx(d,{children:"\\cred{f_n} \\cdot \\cgreen{g_n} = o(a_n \\cdot b_n)."}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cred{f_n} = O(a_n + b_n)"})," mit ",e.jsx(n,{children:"a_n = O(b_n)"}),". Dann gilt"]}),`
`,e.jsx(d,{children:"\\cred{f_n} = O(b_n)."}),`
`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Die Positivität der Vergleichsfolgen setzen wir voraus, damit sich in
`,e.jsx(n,{children:"a_n + b_n"}),` nichts wegheben kann. Für Aufwandsvergleiche ist das keine
Einschränkung, denn Operationenzahlen sind positiv. Die Beweise sind kurze
Grenzwertargumente.`]}),`
`,e.jsx(L,{title:"Warum die Rechenregeln gelten",children:e.jsxs(je,{children:[e.jsxs(S,{why:e.jsxs(e.Fragment,{children:["Dreiecksungleichung; danach verkleinern wir die Nenner (",e.jsx(n,{children:"a_n + b_n \\ge a_n"})," bzw. ",e.jsx(n,{children:"\\ge b_n"}),", da beide Folgen positiv sind), was die Brüche höchstens vergrößert"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Regel 1, Addition."})," Wir schätzen den Quotienten ab:"]}),e.jsx(d,{children:"\\frac{\\left\\vert \\cred{f_n} + \\cgreen{g_n} \\right\\vert}{a_n + b_n} \\le \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n + b_n} + \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{a_n + b_n} \\le \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n} + \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{b_n}."})]}),e.jsx(S,{why:e.jsx(e.Fragment,{children:"beide Summanden haben nach Voraussetzung endlichen Limes superior, und der Limes superior einer Summe ist höchstens die Summe der Limites superiores"}),children:e.jsx(d,{children:"\\limsup_{n \\to \\infty} \\frac{\\left\\vert \\cred{f_n} + \\cgreen{g_n} \\right\\vert}{a_n + b_n} < \\infty \\quimpl \\cred{f_n} + \\cgreen{g_n} = O(a_n + b_n)."})}),e.jsxs(S,{why:e.jsx(e.Fragment,{children:"Betrag und Bruch faktorisieren, beide Faktoren kennen wir schon"}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Regel 1, Multiplikation, und Regel 2."})," Der Quotient zerfällt in ein Produkt:"]}),e.jsx(d,{children:"\\frac{\\left\\vert \\cred{f_n} \\cdot \\cgreen{g_n} \\right\\vert}{a_n \\cdot b_n} = \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n} \\cdot \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{b_n}."})]}),e.jsx(S,{why:e.jsx(e.Fragment,{children:"das Produkt zweier beschränkter Folgen ist beschränkt; das Produkt einer beschränkten Folge mit einer Nullfolge ist eine Nullfolge"}),children:e.jsxs(i.p,{children:["Der erste Faktor ist beschränkt (",e.jsx(n,{children:"\\cred{f_n} = O(a_n)"}),`). Ist
`,e.jsx(n,{children:"\\cgreen{g_n} = O(b_n)"}),`, so ist auch der zweite Faktor beschränkt und das
Produkt bleibt beschränkt: `,e.jsx(n,{children:"\\cred{f_n} \\cgreen{g_n} = O(a_n b_n)"}),`. Ist
dagegen `,e.jsx(n,{children:"\\cgreen{g_n} = o(b_n)"}),`, so konvergiert der zweite Faktor gegen
`,e.jsx(n,{children:"0"}),` und damit das ganze Produkt:
`,e.jsx(n,{children:"\\cred{f_n} \\cgreen{g_n} = o(a_n b_n)"}),"."]})}),e.jsxs(S,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"a_n = O(b_n)"})," macht den ersten Summanden beschränkt; die Konstante ",e.jsx(n,{children:"1"})," ist es sowieso"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Regel 3."})," Zuerst zeigen wir ",e.jsx(n,{children:"a_n + b_n = O(b_n)"}),":"]}),e.jsx(d,{children:"\\frac{a_n + b_n}{b_n} = \\frac{a_n}{b_n} + 1 = O(1)."})]}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:["Produkt zweier beschränkter Folgen; das ist gerade Regel 1 (Multiplikation) mit ",e.jsx(n,{children:"b_n \\cdot 1"})," als Vergleichsfolge"]}),children:e.jsx(d,{children:"\\frac{\\left\\vert \\cred{f_n} \\right\\vert}{b_n} = \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n + b_n} \\cdot \\frac{a_n + b_n}{b_n} \\quimpl \\cred{f_n} = O(b_n)."})})]})}),`
`,e.jsxs(i.h3,{id:"sec-anwendung-auf-den-dominanten-term",children:["2.4.4 ","Anwendung: auf den dominanten Term reduzieren"]}),`
`,e.jsxs(i.p,{children:["Sehen wir die Regeln im Einsatz. Wieder verfolgt ",e.jsx(n,{children:"\\cred{\\text{Rot}}"}),` die
Folge `,e.jsx(n,{children:"\\cred{f_n}"})," und ",e.jsx(n,{children:"\\cgreen{\\text{Grün}}"}),` die Folge
`,e.jsx(n,{children:"\\cgreen{g_n}"}),"."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.4.5 (Addition und Multiplikation)",id:"env-addition-und-multiplikation",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"\\cred{f_n} = 3n^2 = O(n^2)"}),` und
`,e.jsx(n,{children:"\\cgreen{g_n} = 5n = O(n)"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Addition"})," (Regel 1, dann Regel 3):"]}),e.jsx(d,{children:"\\cred{f_n} + \\cgreen{g_n} = \\cred{3n^2} + \\cgreen{5n} = O(n^2 + n) = O(n^2), \\quad \\text{denn } n = O(n^2)."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Multiplikation"})," (Regel 1):"]}),e.jsx(d,{children:"\\cred{f_n} \\cdot \\cgreen{g_n} = \\cred{3n^2} \\cdot \\cgreen{5n} = 15n^3 = O(n^2 \\cdot n) = O(n^3)."})]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.4.6 (Vereinfachung eines Aufwandsausdrucks)",id:"env-vereinfachung-eines-aufwandsausdrucks",children:[e.jsxs(i.p,{children:["Ein Algorithmus benötige ",e.jsx(n,{children:"\\cred{4n^3} + 16n^2 + 239"}),` Operationen. Rot
verfolgt jetzt den am schnellsten wachsenden Term:`]}),e.jsx(d,{children:"\\cred{4n^3} + 16n^2 + 239 = O(\\cred{n^3} + n^2 + 1) = O(\\cred{n^3}),"}),e.jsxs(i.p,{children:["denn ",e.jsx(n,{children:"n^2 = O(n^3)"})," und ",e.jsx(n,{children:"1 = O(n^3)"}),`, zweimal Regel 3 angewandt.
Dass auch der Vorfaktor `,e.jsx(n,{children:"4"}),` verschwindet, liegt an der Definition: Für jede
Konstante `,e.jsx(n,{children:"c > 0"}),` ist
`,e.jsx(n,{children:"\\limsup_{n \\to \\infty} \\left\\vert c \\, b_n / b_n \\right\\vert = c < \\infty"}),`,
also `,e.jsx(n,{children:"c \\cdot b_n = O(b_n)"}),"."]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Wir können komplexe Aufwandsausdrücke also auf ihren dominanten Term reduzieren."}),`
Deshalb sprechen wir von einem „`,e.jsx(n,{children:"O(n^3)"}),`-Algorithmus", ohne Vorfaktoren
oder niedrigere Terme zu nennen: Für großes `,e.jsx(n,{children:"n"}),` bestimmt allein der dominante
Term, wie sich die Laufzeit verhält. Und die üblichen Komplexitätsklassen bilden eine
strikte Hierarchie, in der jede klein-o-mäßig langsamer wächst als die nächste:`]}),`
`,e.jsx(d,{children:"\\log n \\,,\\quad n \\,,\\quad n \\log n \\,,\\quad n^2 \\,,\\quad n^3 \\,,\\quad 2^n."}),`
`,e.jsxs(i.p,{children:["Wie drastisch unterscheiden sich diese Klassen tatsächlich, und ab welchem ",e.jsx(n,{children:"n"}),` überholt ein
schneller wachsender Term jeden noch so großen Vorfaktor? Der Explorer unten lässt beides
ausprobieren; der `,e.jsx(h,{id:"logarithm",children:"Logarithmus"}),"-Trick der log-Skala macht dabei aus ",e.jsx(n,{children:"2^n"}),` eine
Gerade.`]}),`
`,e.jsxs(de,{title:"Wachstumsraten-Explorer: wer dominiert wen, und ab wann?",children:[e.jsx(mn,{}),e.jsxs(i.p,{children:['Die Antwort auf das „ab wann" fällt ernüchternd aus. Ohne Vorfaktor überholt ',e.jsx(n,{children:"2^n"}),` die
Kurve `,e.jsx(n,{children:"n^2"})," endgültig ab ",e.jsx(n,{children:"n = 5"}),"; mit dem tausendfachen Vorfaktor ",e.jsx(n,{children:"c = 1000"}),` erst ab
`,e.jsx(n,{children:"n = 19"}),". Vierzehn Schritte, mehr kauft der Faktor ",e.jsx(n,{children:"1000"}),` nicht. Bei den polynomialen
Klassen ist es genauso durchsichtig: `,e.jsx(n,{children:"n^3 > c\\,n^2"})," gilt schlicht ab ",e.jsx(n,{children:"n > c"}),`. Das ist die
praktische Bedeutung von `,e.jsx(n,{children:"c\\,n^2 = O(n^2)"})," und ",e.jsx(n,{children:"n^2 = o(n^3)"}),`: Vorfaktoren verschieben die
Schwelle, die Reihenfolge drehen sie nie um.`]})]}),`
`,e.jsxs(i.h3,{id:"sec-landau-selbsttest",children:["2.4.5 ","Selbsttest"]}),`
`,e.jsx(i.p,{children:`Welche der folgenden Aussagen sind wahr? Erst selbst entscheiden (Quotient bilden!),
dann die Lösung aufklappen.`}),`
`,e.jsx(ce,{nr:1,frage:e.jsx(n,{children:"2n = O(n^2)"}),children:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Wahr."}),`
`,e.jsx(n,{children:"\\lim_{n \\to \\infty} \\frac{2n}{n^2} = \\lim_{n \\to \\infty} \\frac{2}{n} = 0 < \\infty"}),`;
es gilt sogar die stärkere Aussage `,e.jsx(n,{children:"2n = o(n^2)"}),`. Die informativere obere
Schranke ist `,e.jsx(n,{children:"2n = O(n)"}),"."]})}),`
`,e.jsx(ce,{nr:2,frage:e.jsx(n,{children:"7/n = o(1)"}),children:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Wahr."})," Mit ",e.jsx(n,{children:"b_n = 1"}),` ist
`,e.jsx(n,{children:"\\lim_{n \\to \\infty} \\frac{7/n}{1} = 0"}),`. Landau-Symbole beschreiben also
nicht nur Wachstum, sondern auch das Abklingen von Nullfolgen. So werden wir später
Approximations- und Rundungsfehler klassifizieren.`]})}),`
`,e.jsx(ce,{nr:3,frage:e.jsx(n,{children:"8n^3 + 7n^2 + n = O(n)"}),children:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Falsch."}),`
`,e.jsx(n,{children:"\\lim_{n \\to \\infty} \\frac{8n^3 + 7n^2 + n}{n} = \\lim_{n \\to \\infty} \\left(8n^2 + 7n + 1\\right) = \\infty"}),`;
der Quotient divergiert. Richtig wäre `,e.jsx(n,{children:"O(n^3)"}),`: der dominante Term
entscheidet (`,e.jsx(i.a,{href:"#env-vereinfachung-eines-aufwandsausdrucks",children:"Beispiel 2.4.6"}),")."]})}),`
`,e.jsx(ce,{nr:4,frage:e.jsx(n,{children:"n^{-3} + n^{-2} = O(n^{-2})"}),children:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Wahr."}),`
`,e.jsx(n,{children:"\\lim_{n \\to \\infty} \\frac{n^{-3} + n^{-2}}{n^{-2}} = \\lim_{n \\to \\infty} \\left(\\frac{1}{n} + 1\\right) = 1 < \\infty. \\quad \\checkmark"}),`
Auch `,e.jsx(n,{children:"n^{-3} + n^{-2} = o(1)"}),` wäre richtig (die Folge ist eine Nullfolge),
aber `,e.jsx(n,{children:"O(n^{-2})"})," ist die schärfere Aussage: Sie sagt nicht nur ",e.jsx(i.em,{children:"dass"}),`,
sondern `,e.jsx(i.em,{children:"wie schnell"})," die Folge verschwindet."]})}),`
`,e.jsxs(le,{children:[e.jsxs(Q,{loesung:15,toleranz:0,children:[e.jsxs(i.p,{children:["Setzen wir im Explorer oben den Vorfaktor auf ",e.jsx(n,{children:"c = 100"})," und schalten ",e.jsx(n,{children:"c \\cdot n^2"}),` und
`,e.jsx(n,{children:"2^n"})," an: Ab welchem ",e.jsx(n,{children:"n"})," gilt endgültig ",e.jsx(n,{children:"2^n > c \\cdot n^2"}),"?"]}),e.jsxs(i.p,{children:[`Das Verdikt des Widgets nennt die Schwelle; nachrechnen lässt sie sich auch von Hand:
`,e.jsx(n,{children:"2^{14} = 16\\,384"})," liegt noch unter ",e.jsx(n,{children:"100 \\cdot 14^2 = 19\\,600"}),`, aber
`,e.jsx(n,{children:"2^{15} = 32\\,768"})," liegt über ",e.jsx(n,{children:"100 \\cdot 15^2 = 22\\,500"}),`, und danach zieht die
Exponentialfunktion endgültig davon.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"a_n = O(b_n)"})," folgt ",e.jsx(n,{children:"b_n = O(a_n)"}),"."]}),e.jsxs(i.p,{children:["Das Gleichheitszeichen in ",e.jsx(n,{children:"a_n = O(b_n)"}),` bezeichnet keine symmetrische
Beziehung: `,e.jsx(n,{children:"5n = O(n^2)"})," gilt, ",e.jsx(n,{children:"n^2 = O(5n)"})," nicht."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Gilt ",e.jsx(n,{children:"a_n = o(b_n)"}),", so gilt auch ",e.jsx(n,{children:"a_n = O(b_n)"}),"."]}),e.jsxs(i.p,{children:["Konvergiert der Quotient gegen ",e.jsx(n,{children:"0"}),`, so ist er insbesondere beschränkt. Klein-o ist die
stärkere Aussage; eine informative obere Schranke kann aber eine andere
Vergleichsfolge verwenden.`]})]})]}),`
`,e.jsxs(i.p,{children:[`Damit haben wir das Handwerkszeug beisammen. Im
`,e.jsx(i.a,{href:"#sec-2.5",children:"nächsten Abschnitt"}),` setzen wir es ein, um
die Komplexität unserer Fibonacci-Algorithmen aus
`,e.jsx(i.a,{href:"#sec-2.2",children:"Abschnitt 2.2"}),` präzise zu bestimmen – mit
einem drastischen Ergebnis.`]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §1.1 (Aufwand und Genauigkeit numerischer Verfahren); Cormen,
Leiserson, Rivest & Stein, `,e.jsx(i.em,{children:"Introduction to Algorithms"}),`, Kap. 3
(asymptotische Notation, einschließlich scharfer Schranken).`]})})]})}function jn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Le,{...r})}):Le(r)}const gn=(1+Math.sqrt(5))/2,ne=v.rot,he=v.blau,q=10,bn="⁰¹²³⁴⁵⁶⁷⁸⁹";function fn(r){return String(r).split("").map(i=>bn[Number(i)]).join("")}function Se(r){if(r<1e6)return Math.round(r).toLocaleString("de-DE");const i=Math.floor(Math.log10(r));return`${(r/10**i).toFixed(1).replace(".",",")} · 10${fn(i)}`}function Te(r){const i=r/1e9;if(i<1e-6)return`${Math.max(1,Math.round(i*1e9))} ns`;if(i<.001)return`${Math.round(i*1e6)} µs`;if(i<1)return`${(i*1e3).toFixed(1).replace(".",",")} ms`;if(i<120)return`${i.toFixed(1).replace(".",",")} s`;if(i<7200)return`${(i/60).toFixed(0)} min`;if(i<2*86400)return`${(i/3600).toFixed(1).replace(".",",")} h`;const s=i/3156e4;return s<1?`${(i/86400).toFixed(0)} Tage`:`${Se(Math.round(s))} Jahre`}function pn(){const[r,i]=w.useState(30);return e.jsx(ge,{variante:"auswahl",frage:"Die roten Punkte liegen auf einer Geraden. Auf welcher? Erst tippen, dann auflösen.",optionen:[{id:"quad",text:"auf der von n²"},{id:"zwei",text:"auf der von 2ⁿ"},{id:"phi",text:"auf einer dazwischen"}],loesung:"phi",children:({aufgeloest:s})=>e.jsx(kn,{nMax:r,setNMax:i,aufgeloest:s})})}function kn({nMax:r,setNMax:i,aufgeloest:s}){const{T:c,markers:t,series:_,yMax:m}=w.useMemo(()=>{const u=[1,1];for(let a=2;a<=r;a++)u[a]=1+u[a-1]+u[a-2];const b=a=>4*a-6,o=Math.log10(2),k=Math.log10(gn),F=Math.log10(u[q])-q*o,g=Math.log10(u[q])-q*k,D=b(q)/q,z=[],y=r>40?2:1;for(let a=r;a>=2;a-=y)z.push({x:a,y:Math.log10(u[a]),color:ne}),z.push({x:a,y:Math.log10(b(a)),color:he});const M=[{f:a=>F+a*o,color:ne,dash:[3,4],label:"Schranke c · 2ⁿ"},...s?[{f:a=>g+a*k,color:ne,dash:[12,6],label:"scharf: c · φⁿ"}]:[],{f:a=>a>0?Math.log10(D*a):NaN,color:he,dash:[7,4],label:"Vorhersage c · n"}],T=Math.max(F+r*o,Math.log10(u[r]))+.5;return{T:u,markers:z,series:M,yMax:T}},[r,s]),f=c[r],p=4*r-6;return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(te,{children:["Schieben wir ",e.jsx("span",{className:"font-mono",children:"n"})," nach oben und vergleichen die roten Punkte mit der gestrichelten Geraden über ihnen."]}),e.jsx(me,{xLabel:"n",yLabel:"log₁₀(Schritte)",series:_,markers:t,xDomain:[0,r+1],yDomain:[0,m],width:440,height:300,ariaLabel:`Logarithmische Darstellung der gezählten Schrittzahlen bis n gleich ${r}; die roten Punkte der naiven Rekursion liegen auf einer Geraden unterhalb der gestrichelten 2-hoch-n-Geraden, die blauen Punkte der Iteration bleiben nahe der Grundlinie.`}),e.jsx(K,{label:"n (Größe)",value:r,onChange:u=>i(Math.round(u)),min:10,max:80,step:1,fmt:u=>String(Math.round(u))}),e.jsxs("p",{className:`max-w-prose text-xs ${P}`,children:[e.jsx("span",{style:{color:ne},children:"●"})," gezählte Aufrufe der naiven Rekursion  ",e.jsx("span",{style:{color:he},children:"●"})," gezählte Operationen der Iteration   gestrichelt: die Landau-Vorhersagen, bei ",e.jsx("span",{className:"font-mono",children:"n = 10"})," an die Zählungen angeheftet."]}),e.jsxs("div",{className:`max-w-prose p-3 text-sm ${G}`,children:["Bei ",e.jsxs("span",{className:"font-mono",children:["n = ",r]}),": naive Rekursion"," ",e.jsx("span",{className:"font-semibold",style:{color:ne},children:Se(f)})," ","Aufrufe (Modellrechnung bei 10⁹ Schritten/s: ≈ ",Te(f),"), iterative Variante"," ",e.jsx("span",{className:"font-semibold",style:{color:he},children:Se(p)})," ","Operationen (≈ ",Te(p),")."]}),s?e.jsxs(H,{kind:"warn",children:["Die roten Punkte liegen exakt auf einer Geraden, aber auf der flacheren mit Steigung"," ",e.jsx("span",{className:"font-mono",children:"log₁₀ φ ≈ 0,209"}),", nicht auf der 2ⁿ-Geraden mit Steigung ",e.jsx("span",{className:"font-mono",children:"log₁₀ 2 ≈ 0,301"}),". Die Schranke"," ",e.jsx("span",{className:"font-mono",children:"O(2ⁿ)"})," aus ",A("satz:exponentielle-laufzeit-der-naiven")," ist also korrekt, aber nicht scharf; das tatsächliche Wachstum hat die Basis"," ",e.jsx("span",{className:"font-mono",children:"φ ≈ 1,618"})," (",A("bemerkung:wie-schlimm-ist-es-wirklich"),"). Die blauen Punkte bleiben auf dieser Skala fast am Boden: Lineares Wachstum ist hier praktisch unsichtbar."]}):e.jsxs(H,{kind:"neutral",children:["Beide Punktfolgen liegen sauber auf Geraden, die rote steigt deutlich steiler an. Sie verläuft aber sichtbar flacher als die gestrichelte Schranke darüber, und der Abstand zwischen beiden wächst mit ",e.jsx("span",{className:"font-mono",children:"n"}),"."]})]})}const We={color:v.rot,fontWeight:600};function wn(){return e.jsxs("pre",{className:"max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-xs leading-relaxed dark:bg-slate-900/60",role:"img","aria-label":"Aufrufbaum von fib_rek(5) mit 15 Knoten; der Teilbaum fib_rek(3) taucht zweimal auf und ist beide Male rot markiert.",children:[`fib_rek(5)
├── fib_rek(4)
│   ├── `,e.jsx("span",{style:We,children:"fib_rek(3)"}),`          ← 1. Berechnung von F(3)
│   │   ├── fib_rek(2)
│   │   │   ├── fib_rek(1)
│   │   │   └── fib_rek(0)
│   │   └── fib_rek(1)
│   └── fib_rek(2)
│       ├── fib_rek(1)
│       └── fib_rek(0)
└── `,e.jsx("span",{style:We,children:"fib_rek(3)"}),`              ← 2. Berechnung: komplett doppelte Arbeit
    ├── fib_rek(2)
    │   ├── fib_rek(1)
    │   └── fib_rek(0)
    └── fib_rek(1)`]})}function Ke(r){const i={a:"a",code:"code",em:"em",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Jetzt wird geerntet. In ",e.jsx(i.a,{href:"#sec-2.2",children:"Abschnitt 2.2"}),` haben wir zwei Algorithmen für
dasselbe Problem kennengelernt (die ersten `,e.jsx(n,{children:"n"}),` Fibonacci-Zahlen zu berechnen) und im
Widget dort beobachtet, dass die rekursive Variante schon für moderate `,e.jsx(n,{children:"n"}),` unangenehm
viele Aufrufe produziert. In `,e.jsx(i.a,{href:"#sec-2.3",children:"Abschnitt 2.3"}),` haben wir gelernt, Aufwand zu
zählen, und in `,e.jsx(i.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),`, die Zählerei mit Landau-Symbolen auf ihre
Ordnung einzudampfen. Mit diesen Werkzeugen können wir den Unterschied zwischen beiden
Varianten nun präzise machen. Und er ist drastischer, als man zunächst vermuten würde:
Es geht nicht um einen konstanten Faktor, sondern um `,e.jsx(i.em,{children:"linear gegen exponentiell"}),"."]}),`
`,e.jsxs(i.h3,{id:"sec-die-iterative-variante-linearer-aufwand",children:["2.5.1 ","Die iterative Variante: linearer Aufwand"]}),`
`,e.jsxs(i.p,{children:["Erinnern wir uns an den iterativen Algorithmus aus ",e.jsx(i.a,{href:"#sec-2.2",children:"Abschnitt 2.2"}),`: Er legt
einen Ergebnisvektor der Länge `,e.jsx(n,{children:"n"})," an, setzt die Startwerte ",e.jsx(n,{children:"x_1 = 0"})," und ",e.jsx(n,{children:"x_2 = 1"}),` und
füllt dann in einer einzigen Schleife jeden weiteren Eintrag als Summe seiner beiden
Vorgänger: `,e.jsx(n,{children:"x_{i+1} = x_i + x_{i-1}"})," für ",e.jsx(n,{children:"i = 2, \\dots, n-1"}),`. Zählen wir die Schritte, so
wie wir es beim `,e.jsx(h,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"}),` in
`,e.jsx(i.a,{href:"#sec-2.3",children:"Abschnitt 2.3"})," geübt haben."]}),`
`,e.jsx(x,{kind:"Satz",label:"2.5.1 (Komplexität der iterativen Variante)",id:"env-komplexitaet-der-iterativen-variante",children:e.jsxs(i.p,{children:["Der iterative Fibonacci-Algorithmus berechnet die ersten ",e.jsx(n,{children:"n"}),` Fibonacci-Zahlen mit
Zeitkomplexität `,e.jsx(n,{children:"\\cblue{O(n)}"})," und Speicherkomplexität ",e.jsx(n,{children:"O(n)"}),"."]})}),`
`,e.jsx(L,{title:"Beweis der linearen Laufzeit",children:e.jsxs(je,{children:[e.jsx(S,{why:e.jsxs(e.Fragment,{children:["das Anlegen des Ergebnisvektors schreibt ",e.jsx(n,{children:"n"})," Nullen, eine Schreiboperation pro Eintrag"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Initialisierung:"})," ",e.jsx(n,{children:"n"})," Operationen."]})}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:["die Schleife durchläuft ",e.jsx(n,{children:"i = 2, \\dots, n-1"}),", das sind ",e.jsx(n,{children:"(n-1) - 2 + 1 = n-2"})," Durchläufe; pro Durchlauf zählen wir 1 Addition, 1 Zuweisung und 1 Indexrechnung; ob man die Indexrechnungen mitzählt, ist Konvention, für die Ordnung ist es egal (",e.jsx(i.a,{href:"#env-zaehlen-ist-konvention-die-ordnung-nicht",children:"Bemerkung 2.5.2"}),")"]}),children:e.jsx(d,{children:"\\text{Schleife: } (n-2) \\cdot 3 \\text{ Operationen.}"})}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:["Summen- und Dominanzregel aus ",e.jsx(i.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),": mit ",e.jsx(n,{children:"n = O(n)"})," und ",e.jsx(n,{children:"1 = O(n)"})," ist ",e.jsx(n,{children:"O(n) + O(n) + O(1) = O(n)"}),"; die Konstante ",e.jsx(n,{children:"c"})," deckt Funktionsaufruf und die beiden ",e.jsx(n,{children:"\\texttt{if}"}),"-Abfragen ab"]}),children:e.jsx(d,{children:"\\cblue{a_n} = n + 3\\,(n-2) + c = 4n + (c - 6) \\quimpl \\cblue{a_n = O(n)}."})}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:["gespeichert werden der Vektor ",e.jsx(n,{children:"\\bx"})," mit ",e.jsx(n,{children:"n"})," Einträgen und konstant viele Hilfsgrößen (",e.jsx(n,{children:"n"}),", Laufindex ",e.jsx(n,{children:"i"}),")"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Speicher:"})," ",e.jsx(n,{children:"n + O(1) = O(n)"})," Speicherzellen."]})})]})}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.5.2 (Zählen ist Konvention, die Ordnung nicht)",id:"env-zaehlen-ist-konvention-die-ordnung-nicht",children:e.jsxs(i.p,{children:[`Ob wir pro Schleifendurchlauf 3, 5 oder 10 Elementaroperationen ansetzen, ändert am
Ergebnis nichts: Jede konstante Zahl von Operationen pro Durchlauf liefert einen
Gesamtaufwand der Form `,e.jsx(n,{children:"c_1 n + c_2"}),", und der ist immer ",e.jsx(n,{children:"\\cblue{O(n)}"}),`. Genau dafür haben
wir die Landau-Notation in `,e.jsx(i.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),` eingeführt: Sie macht die Analyse
unabhängig von solchen Zählkonventionen. Schneller als linear geht es für dieses Problem
übrigens prinzipiell nicht. Allein das Hinschreiben der `,e.jsx(n,{children:"n"}),` Ergebniszahlen kostet schon
`,e.jsx(n,{children:"n"})," Schritte. Die iterative Variante ist also ordnungsoptimal."]})}),`
`,e.jsxs(i.h3,{id:"sec-die-naive-rekursion-exponentieller",children:["2.5.2 ","Die naive Rekursion: exponentieller Aufwand"]}),`
`,e.jsxs(i.p,{children:["Die zweite Variante aus ",e.jsx(i.a,{href:"#sec-2.2",children:"Abschnitt 2.2"}),` übersetzt die mathematische Definition
wörtlich in Code: Eine Funktion `,e.jsx(n,{children:"\\texttt{fib\\_rek}(n)"})," gibt für ",e.jsx(n,{children:"n \\le 1"})," direkt ",e.jsx(n,{children:"n"}),`
zurück und ruft sich sonst zweimal selbst auf, mit `,e.jsx(n,{children:"n-1"})," und ",e.jsx(n,{children:"n-2"}),`, und addiert die
Ergebnisse. In R:`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`fib_rek <- function(n) {
  if (n <= 1) {
    return(n)
  }
  return(fib_rek(n - 1) + fib_rek(n - 2))
}
`})}),`
`,e.jsxs(i.p,{children:["Das ist verführerisch elegant: der Code ",e.jsx(i.em,{children:"ist"}),` praktisch die Rekursionsformel. Aber die
Eleganz täuscht.`]}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.5.3 (Was wird hier eigentlich berechnet?)",id:"env-was-wird-hier-eigentlich-berechnet",children:e.jsxs(i.p,{children:["Zwei Feinheiten sind dabei wichtig: Erstens berechnet ",e.jsx(n,{children:"\\texttt{fib\\_rek}(n)"}),` nur eine
`,e.jsx(i.em,{children:"einzelne"})," Fibonacci-Zahl ",e.jsx(n,{children:"F_n"})," (mit der Zählung ",e.jsx(n,{children:"F_0 = 0"}),", ",e.jsx(n,{children:"F_1 = 1"}),`,
`,e.jsx(n,{children:"F_n = F_{n-1} + F_{n-2}"}),"), nicht den ganzen Vektor der ersten ",e.jsx(n,{children:"n"}),`
Zahlen; in der Notation aus `,e.jsx(i.a,{href:"#sec-2.2",children:"Abschnitt 2.2"})," gilt ",e.jsx(n,{children:"F_n = x_{n+1}"}),`. Zweitens
macht das den Vergleich nicht etwa unfair, sondern erst recht vernichtend: Die Rekursion
braucht schon für `,e.jsx(i.em,{children:"eine"})," Zahl exponentiell viele Schritte, während die Iteration ",e.jsx(i.em,{children:"alle"}),`
ersten `,e.jsx(n,{children:"n"})," Zahlen in ",e.jsx(n,{children:"\\cblue{O(n)}"})," liefert."]})}),`
`,e.jsxs(i.p,{children:["Was kostet ein Aufruf von ",e.jsx(n,{children:"\\texttt{fib\\_rek}(n)"}),`? Außer den beiden rekursiven Aufrufen
passiert pro Aufruf nur konstant viel (ein Vergleich, eine Addition). Das richtige
Aufwandsmaß ist deshalb die `,e.jsx(i.em,{children:"Gesamtzahl der Funktionsaufrufe"}),`: Nennen wir sie
`,e.jsx(n,{children:"\\cred{T(n)}"}),", den Startaufruf mitgezählt. Diese ",e.jsx(h,{id:"sequence",children:"Folge"}),` erbt die
Fibonacci-Struktur des Algorithmus:`]}),`
`,e.jsxs(x,{kind:"Lemma",label:"2.5.4 (Rekurrenz der Aufrufzahl)",id:"env-rekurrenz-der-aufrufzahl",children:[e.jsxs(i.p,{children:["Die Aufrufzahl ",e.jsx(n,{children:"\\cred{T(n)}"})," von ",e.jsx(n,{children:"\\texttt{fib\\_rek}(n)"})," erfüllt"]}),e.jsx(d,{children:"\\cred{T(0)} = \\cred{T(1)} = 1, \\qquad \\cred{T(n)} = 1 + \\cred{T(n-1)} + \\cred{T(n-2)} \\quad (n \\ge 2)."})]}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n \\le 1"}),` greift die Abbruchbedingung: Die Funktion kehrt sofort zurück, ohne sich
selbst aufzurufen. Für `,e.jsx(n,{children:"n \\ge 2"}),` besteht der Aufrufbaum aus der Wurzel (dem Aufruf selbst)
und den beiden vollständigen Teilbäumen von `,e.jsx(n,{children:"\\texttt{fib\\_rek}(n-1)"}),` und
`,e.jsx(n,{children:"\\texttt{fib\\_rek}(n-2)"}),", zusammen also ",e.jsx(n,{children:"1 + \\cred{T(n-1)} + \\cred{T(n-2)}"})," Aufrufe."]}),`
`,e.jsxs(i.p,{children:["Bevor wir ",e.jsx(n,{children:"\\cred{T(n)}"}),` allgemein abschätzen, sehen wir uns den Aufrufbaum einmal konkret
an. Dann ist auch sofort klar, `,e.jsx(i.em,{children:"woher"})," die Explosion kommt."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.5.5 (Der Aufrufbaum für n = 5)",id:"env-der-aufrufbaum-fuer-n-5",children:[e.jsxs(i.p,{children:["Der Aufruf ",e.jsx(n,{children:"\\texttt{fib\\_rek}(5)"}),` erzeugt den folgenden Baum (jeder Knoten ist ein
Funktionsaufruf):`]}),e.jsx(wn,{}),e.jsxs(i.p,{children:["Zählen wir nach: ",e.jsx(n,{children:"F_5"})," und ",e.jsx(n,{children:"F_4"})," werden je einmal berechnet, ",e.jsx(n,{children:"F_3"})," aber ",e.jsx(n,{children:"\\cred{2}"}),`-mal,
`,e.jsx(n,{children:"F_2"})," schon ",e.jsx(n,{children:"\\cred{3}"}),"-mal, ",e.jsx(n,{children:"F_1"})," sogar ",e.jsx(n,{children:"\\cred{5}"}),"-mal und ",e.jsx(n,{children:"F_0"})," noch ",e.jsx(n,{children:"\\cred{3}"}),`-mal,
zusammen `,e.jsx(n,{children:"1 + 1 + 2 + 3 + 5 + 3 = \\cred{15}"}),` Aufrufe. Das passt zum Lemma: Aus
`,e.jsx(n,{children:"\\cred{T(2)} = 3"})," und ",e.jsx(n,{children:"\\cred{T(3)} = 1 + 3 + 1 = 5"})," folgt ",e.jsx(n,{children:"\\cred{T(4)} = 1 + 5 + 3 = 9"}),`
und `,e.jsx(n,{children:"\\cred{T(5)} = 1 + 9 + 5 = \\cred{15}"}),". ",e.jsx(n,{children:"\\checkmark"})]}),e.jsxs(i.p,{children:[`Die Wurzel des Übels ist rot markiert: Der komplette Teilbaum unter
`,e.jsx(n,{children:"\\texttt{fib\\_rek}(3)"}),` wird zweimal durchgerechnet, denn die Rekursion „vergisst" alles,
was sie schon berechnet hat. Bei größerem `,e.jsx(n,{children:"n"}),` verdoppeln sich diese Dopplungen immer
weiter. Die iterative Variante berechnet dagegen jede Zahl genau einmal, weil sie die
Zwischenergebnisse im Vektor aufbewahrt.`]})]}),`
`,e.jsxs(i.p,{children:[`Jetzt die allgemeine Analyse. Kurz und bündig argumentiert: Jeder Aufruf erzeugt bis zu 2
weitere Aufrufe, diese wieder je 2, und so fort über bis zu `,e.jsx(n,{children:"n"}),` Ebenen, insgesamt
höchstens `,e.jsx(n,{children:"1 + 2 + 4 + \\dots + 2^n"})," Aufrufe, also ",e.jsx(n,{children:"O(2^n)"}),`. Das folgende
Resultat macht dieses Argument präzise und ergänzt die Gegenrichtung: Das Wachstum ist
auch wirklich exponentiell, nicht nur durch eine Exponentialfunktion beschränkt.`]}),`
`,e.jsxs(x,{kind:"Satz",label:"2.5.6 (Exponentielle Laufzeit der naiven Rekursion)",id:"env-exponentielle-laufzeit-der-naiven",children:[e.jsxs(i.p,{children:["Für alle ",e.jsx(n,{children:"n \\ge 0"})," gilt"]}),e.jsx(d,{children:"\\left(\\sqrt{2}\\right)^{n-1} \\;\\le\\; \\cred{T(n)} \\;\\le\\; 2^{n+1} - 1."}),e.jsxs(i.p,{children:["Insbesondere ist ",e.jsx(n,{children:"\\cred{T(n)} = O(2^n)"}),", und für jedes feste ",e.jsx(n,{children:"k \\in \\N"}),` gilt
`,e.jsx(n,{children:"n^k = o\\left(\\cred{T(n)}\\right)"}),`: Die Aufrufzahl wächst exponentiell und überholt jedes
Polynom. Die Speicherkomplexität ist dagegen nur `,e.jsx(n,{children:"O(n)"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Der Speicherbedarf bleibt bescheiden, weil der Aufrufbaum nie ganz gleichzeitig
gespeichert wird: „Offen" ist immer nur der Pfad von der Wurzel zum aktuellen Aufruf, und
der ist höchstens `,e.jsx(n,{children:"n"}),` Aufrufe lang. Auf dem Aufruf-Stapel (call stack) liegen also
höchstens `,e.jsx(n,{children:"n"})," Aufrufe, das sind ",e.jsx(n,{children:"O(n)"})," Speicherzellen."]}),`
`,e.jsx(L,{title:"Woher die beiden Schranken für die Aufrufzahl kommen",children:e.jsxs(je,{children:[e.jsx(S,{why:e.jsxs(e.Fragment,{children:["Induktionsanfang: ",e.jsx(n,{children:"\\cred{T(0)} = \\cred{T(1)} = 1"})," und ",e.jsx(n,{children:"2^1 - 1 = 1"}),", ",e.jsx(n,{children:"2^2 - 1 = 3"})]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Obere Schranke"}),", per vollständiger Induktion: Für ",e.jsx(n,{children:"n \\le 1"}),` gilt
`,e.jsx(n,{children:"\\cred{T(n)} \\le 2^{n+1} - 1"}),"."]})}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:["Rekurrenz aus ",e.jsx(i.a,{href:"#env-rekurrenz-der-aufrufzahl",children:"Lemma 2.5.4"}),", dann Induktionsvoraussetzung für ",e.jsx(n,{children:"n-1"})," und ",e.jsx(n,{children:"n-2"})," einsetzen; zuletzt ",e.jsx(n,{children:"2^n + 2^{n-1} = 3 \\cdot 2^{n-1} \\le 4 \\cdot 2^{n-1} = 2^{n+1}"})]}),children:e.jsx(d,{children:"\\cred{T(n)} = 1 + \\cred{T(n-1)} + \\cred{T(n-2)} \\le 1 + \\left(2^{n} - 1\\right) + \\left(2^{n-1} - 1\\right) = 2^n + 2^{n-1} - 1 \\le 2^{n+1} - 1."})}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:["Definition von ",e.jsx(n,{children:"O"})," aus ",e.jsx(i.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),": ",e.jsx(n,{children:"\\cred{T(n)}/2^n \\le 2"})," für alle ",e.jsx(n,{children:"n"}),", der Limes superior ist also endlich"]}),children:e.jsx(d,{children:"\\cred{T(n)} = O(2^n)."})}),e.jsxs(S,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cred{T}"})," ist monoton wachsend (in der Rekurrenz kommt zu ",e.jsx(n,{children:"\\cred{T(n-1)}"})," nur Positives hinzu), also ",e.jsx(n,{children:"\\cred{T(n-1)} \\ge \\cred{T(n-2)}"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Untere Schranke:"})," Für ",e.jsx(n,{children:"n \\ge 2"})," ist"]}),e.jsx(d,{children:"\\cred{T(n)} \\ge \\cred{T(n-1)} + \\cred{T(n-2)} \\ge 2\\,\\cred{T(n-2)}."})]}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:["die Ungleichung ",e.jsx(n,{children:"\\lfloor n/2 \\rfloor"}),"-mal anwenden; bei jedem Schritt verdoppelt sich der Faktor wie bei einer ",e.jsx(h,{id:"geometric-series",children:"geometrischen Folge"}),", bis das Argument ",e.jsx(n,{children:"0"})," oder ",e.jsx(n,{children:"1"})," erreicht (dort ist ",e.jsx(n,{children:"\\cred{T} = 1"}),"); schließlich ",e.jsx(n,{children:"\\lfloor n/2 \\rfloor \\ge (n-1)/2"})]}),children:e.jsx(d,{children:"\\cred{T(n)} \\ge 2\\,\\cred{T(n-2)} \\ge 4\\,\\cred{T(n-4)} \\ge \\dots \\ge 2^{\\lfloor n/2 \\rfloor} \\ge 2^{(n-1)/2} = \\left(\\sqrt{2}\\right)^{n-1}."})}),e.jsx(S,{why:e.jsxs(e.Fragment,{children:["exponentiell schlägt polynomiell: Der ",e.jsx(h,{id:"limit",children:"Grenzwert"})," ",e.jsx(n,{children:"n^k / q^n \\to 0"})," für jedes ",e.jsx(n,{children:"q > 1"})," ist ein Analysis-Standardresultat, hier mit ",e.jsx(n,{children:"q = \\sqrt{2}"})]}),children:e.jsx(d,{children:"\\frac{n^k}{\\cred{T(n)}} \\le \\frac{n^k}{\\left(\\sqrt{2}\\right)^{n-1}} \\longrightarrow 0 \\quimpl n^k = o\\left(\\cred{T(n)}\\right)."})})]})}),`
`,e.jsxs(i.p,{children:["Damit steht die Ordnung fest, aber nicht die Basis: Zwischen ",e.jsx(n,{children:"\\sqrt{2}"})," und ",e.jsx(n,{children:"2"}),` ist viel
Platz. Zählen wir die Aufrufe für wachsendes `,e.jsx(n,{children:"n"}),` also einfach aus und tragen sie
logarithmisch auf. Dann wird aus jedem exponentiellen Wachstum eine Gerade, und deren
Steigung verrät die Basis.`]}),`
`,e.jsxs(de,{title:"Gezählte Schritte gegen die Landau-Vorhersage",children:[e.jsx(pn,{}),e.jsxs(i.p,{children:["Dass wir dafür die ",e.jsx(h,{id:"logarithm",children:"logarithmische"}),` Skala brauchen, um beide Varianten
überhaupt in ein gemeinsames Bild zu bekommen, ist selbst schon die halbe Pointe. Die
Steigung der roten Punkte liegt dabei sichtbar unter `,e.jsx(n,{children:"\\log_{10} 2 \\approx 0{,}301"}),`. Woran
liegt das?`]})]}),`
`,e.jsx(L,{title:"Die exakte Aufrufzahl",children:e.jsxs(x,{kind:"Bemerkung",label:"2.5.7 (Wie schlimm ist es wirklich?)",id:"env-wie-schlimm-ist-es-wirklich",children:[e.jsxs(i.p,{children:["Zwischen unserer unteren Schranke (Basis ",e.jsx(n,{children:"\\sqrt{2} \\approx 1{,}41"}),`) und der oberen
(Basis `,e.jsx(n,{children:"2"}),") klafft noch eine Lücke: Die Schranke ",e.jsx(n,{children:"O(2^n)"}),` ist zwar korrekt, aber nicht
scharf. Die Aufrufzahl lässt sich sogar exakt angeben, und sie ist selbst fast eine
Fibonacci-Zahl: Aus der Rekurrenz folgt per Induktion `,e.jsx(n,{children:"\\cred{T(n)} = 2 F_{n+1} - 1"}),`. Der
Anfang stimmt wegen `,e.jsx(n,{children:"\\cred{T(0)} = 1 = 2 F_1 - 1"})," und ",e.jsx(n,{children:"\\cred{T(1)} = 1 = 2 F_2 - 1"}),`, und
der Schritt ist`]}),e.jsx(d,{children:"\\cred{T(n)} = 1 + \\left(2 F_n - 1\\right) + \\left(2 F_{n-1} - 1\\right) = 2\\left(F_n + F_{n-1}\\right) - 1 = 2 F_{n+1} - 1."}),e.jsxs(i.p,{children:["Die Fibonacci-Zahlen selbst wachsen wie ",e.jsx(n,{children:"\\varphi^n"}),` mit dem goldenen Schnitt
`,e.jsx(n,{children:"\\varphi = \\left(1 + \\sqrt{5}\\right)/2 \\approx 1{,}618"}),` (Vertiefung unten), also ist
`,e.jsx(n,{children:"\\cred{T(n)} = O\\left(\\varphi^n\\right)"}),`: Der wahre Wachstumsfaktor liegt sauber zwischen
unseren Schranken. Für das Urteil `,e.jsx(i.em,{children:'„katastrophal langsam"'}),` ist das aber einerlei: Jede
Basis `,e.jsx(n,{children:"q > 1"})," bedeutet, dass eine um ",e.jsx(n,{children:"1"})," größere Eingabe den Aufwand um den ",e.jsx(i.em,{children:"Faktor"})," ",e.jsx(n,{children:"q"}),`
vervielfacht.`]})]})}),`
`,e.jsxs(L,{title:"Der goldene Schnitt im Aufrufbaum",children:[e.jsxs(i.p,{children:["Woher kommt die Basis ",e.jsx(n,{children:"\\varphi"}),`? Für die Fibonacci-Zahlen gilt die Binet-Formel
`,e.jsx(n,{children:"F_n = \\left(\\varphi^n - \\psi^n\\right)/\\sqrt{5}"}),` mit
`,e.jsx(n,{children:"\\varphi = \\left(1 + \\sqrt{5}\\right)/2"}),` (dem goldenen Schnitt) und
`,e.jsx(n,{children:"\\psi = 1 - \\varphi \\approx -0{,}618"}),". Weil ",e.jsx(n,{children:"|\\psi| < 1"}),` ist, stirbt der zweite Term aus,
und es bleibt `,e.jsx(n,{children:"F_{n+1} \\approx \\varphi^{n+1}/\\sqrt{5}"}),"; mit ",e.jsx(n,{children:"\\cred{T(n)} = 2 F_{n+1} - 1"}),`
also `,e.jsx(n,{children:"\\cred{T(n)} = O\\left(\\varphi^n\\right)"}),"."]}),e.jsxs(i.p,{children:[`Im Widget oben ist genau das zu sehen: Die gezählten Aufrufe liegen auf einer Geraden mit
Steigung `,e.jsx(n,{children:"\\log_{10} \\varphi \\approx 0{,}209"}),", nicht auf der steileren ",e.jsx(n,{children:"2^n"}),`-Geraden mit
Steigung `,e.jsx(n,{children:"\\log_{10} 2 \\approx 0{,}301"}),"."]})]}),`
`,e.jsxs(i.h3,{id:"sec-der-vergleich-ordnung-schlaegt-konstante",children:["2.5.3 ","Der Vergleich: Ordnung schlägt Konstante"]}),`
`,e.jsxs(i.p,{children:["Was bedeuten ",e.jsx(n,{children:"\\cblue{O(n)}"})," gegen ",e.jsx(n,{children:"\\cred{O(\\varphi^n)}"}),` in echten Zahlen? Setzen wir unsere
gezählten Aufwände ein – iterativ `,e.jsx(n,{children:"\\cblue{4n - 6}"})," Operationen (die additive Konstante ",e.jsx(n,{children:"c"}),`
aus dem Beweis von `,e.jsx(i.a,{href:"#env-komplexitaet-der-iterativen-variante",children:"Satz 2.5.1"}),` lassen wir weg), naiv rekursiv
`,e.jsx(n,{children:"\\cred{T(n) = 2F_{n+1} - 1}"})," Aufrufe – und rechnen als grobes Modell mit ",e.jsx(n,{children:"10^9"}),`
Elementarschritten pro Sekunde (ein realer Funktionsaufruf in R kostet deutlich mehr, das
macht es nur schlimmer):`]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:e.jsx(n,{children:"n"})}),e.jsxs(i.th,{children:["iterativ (",e.jsx(n,{children:"\\cblue{4n-6}"}),")"]}),e.jsxs(i.th,{children:["naiv (",e.jsx(n,{children:"\\cred{T(n)}"}),")"]}),e.jsx(i.th,{children:"Zeit naiv (Modell)"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"20"}),e.jsx(i.td,{children:"74"}),e.jsx(i.td,{children:"21 891"}),e.jsx(i.td,{children:"≈ 22 µs"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"30"}),e.jsx(i.td,{children:"114"}),e.jsx(i.td,{children:"2 692 537"}),e.jsx(i.td,{children:"≈ 2,7 ms"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"50"}),e.jsx(i.td,{children:"194"}),e.jsx(i.td,{children:"≈ 4,1 · 10¹⁰"}),e.jsx(i.td,{children:"≈ 41 s"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"100"}),e.jsx(i.td,{children:"394"}),e.jsx(i.td,{children:"≈ 1,1 · 10²¹"}),e.jsx(i.td,{children:"≈ 36 000 Jahre"})]})]})]}),`
`,e.jsxs(i.p,{children:[`Die iterative Spalte bleibt dabei durchgehend im Nanosekundenbereich. Das ist die zentrale
Botschaft dieses Kapitels: Der Unterschied zwischen den beiden Varianten ist kein
Implementierungsdetail und keine Frage schnellerer Hardware: Ein tausendmal schnellerer
Rechner verschiebt die `,e.jsx(n,{children:"36\\,000"})," Jahre lediglich auf ",e.jsx(n,{children:"36"})," Jahre. Nur ein ",e.jsx(i.em,{children:`besserer
Algorithmus`}),` hilft, und die Landau-Notation ist das Instrument, mit dem wir „besser"
präzise ausdrücken: `,e.jsx(i.em,{children:`Die iterative Lösung ist dramatisch effizienter; sie liegt in einer
anderen Komplexitätsklasse.`})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx(i.p,{children:"Vier Aussagen zu diesem Abschnitt. Welche sind wahr?"}),`
`,e.jsxs(le,{children:[e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Laufzeit der iterativen Variante ist ",e.jsx(n,{children:"O(n^2)"}),"."]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"O"})," ist nur eine ",e.jsx(i.em,{children:"obere"})," Schranke: ",e.jsx(n,{children:"4n - 6"})," wächst höchstens so schnell wie ",e.jsx(n,{children:"n^2"}),`, also
gilt `,e.jsx(n,{children:"O(n^2)"}),`; die Aussage ist wahr, aber wenig informativ. Die scharfe Beschreibung ist
`,e.jsx(n,{children:"O(n)"}),", und mehr noch: ",e.jsx(n,{children:"4n - 6"})," ist sogar ",e.jsx(n,{children:"o(n^2)"}),"."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Die naive Rekursion braucht exponentiell viel ",e.jsx(i.em,{children:"Speicher"}),`, weil ihr Aufrufbaum exponentiell
viele Knoten hat.`]}),e.jsxs(i.p,{children:[`Der Baum wird nie ganz gleichzeitig gespeichert: Auf dem Aufruf-Stapel liegt immer nur der
aktive Pfad von der Wurzel zum aktuellen Aufruf, und der ist höchstens `,e.jsx(n,{children:"n"}),` Aufrufe lang:
Speicherkomplexität `,e.jsx(n,{children:"O(n)"})," (",e.jsx(i.a,{href:"#env-exponentielle-laufzeit-der-naiven",children:"Satz 2.5.6"}),"). Exponentiell ist nur die ",e.jsx(i.em,{children:"Zeit"}),"."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Zählt man pro Schleifendurchlauf 5 statt 3 Operationen, ändert sich die Zeitkomplexität
der iterativen Variante nicht.`}),e.jsxs(i.p,{children:[`Konstante Faktoren und additive Konstanten verschwinden in der Landau-Notation:
`,e.jsx(n,{children:"n + 5(n-2) + c = O(n)"})," genauso wie ",e.jsx(n,{children:"n + 3(n-2) + c"})," (",e.jsx(i.a,{href:"#env-zaehlen-ist-konvention-die-ordnung-nicht",children:"Bemerkung 2.5.2"}),`). Diese Robustheit
gegen Zählkonventionen ist der Zweck der Notation.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"T(n) \\ge 2\\,T(n-2)"})," für alle ",e.jsx(n,{children:"n \\ge 2"})," (mit ",e.jsx(n,{children:"T(0), T(1) \\ge 1"}),`) folgt bereits, dass
`,e.jsx(n,{children:"T"})," mindestens exponentiell wächst."]}),e.jsxs(i.p,{children:[`Wiederholtes Einsetzen liefert
`,e.jsx(n,{children:"T(n) \\ge 2^{\\lfloor n/2 \\rfloor} \\ge \\left(\\sqrt{2}\\right)^{n-1}"}),`, geometrisches Wachstum
mit Basis `,e.jsx(n,{children:"\\sqrt{2} > 1"}),". So haben wir die untere Schranke in ",e.jsx(i.a,{href:"#env-exponentielle-laufzeit-der-naiven",children:"Satz 2.5.6"})," bewiesen."]})]}),e.jsxs(Q,{loesung:2,toleranz:0,children:[e.jsxs(i.p,{children:["Wie viele Jahre rechnet die naive Rekursion im Modell des Widgets oben bei ",e.jsx(n,{children:"n = 80"}),"?"]}),e.jsxs(i.p,{children:["Der Ablesekasten des Widgets nennt bei ",e.jsx(n,{children:"n = 80"})," rund ",e.jsx(n,{children:"7{,}6 \\cdot 10^{16}"}),` Aufrufe; bei
`,e.jsx(n,{children:"10^9"})," Schritten pro Sekunde sind das etwa ",e.jsx(n,{children:"7{,}6 \\cdot 10^7"}),` Sekunden, also gut zwei
Jahre. Die Iteration braucht für dieselbe Zahl `,e.jsx(n,{children:"314"})," Operationen."]})]})]}),`
`,e.jsx(i.h3,{children:"Zusammenfassung des Kapitels"}),`
`,e.jsxs(i.p,{children:["In diesem Kapitel haben wir den Grundwortschatz des Skripts aufgebaut: Ein ",e.jsx(i.em,{children:`numerisches
Problem`})," ist eine Abbildung ",e.jsx(n,{children:"f"}),", die Eingabedaten ",e.jsx(n,{children:"\\bx"})," eine gesuchte Lösung ",e.jsx(n,{children:"f(\\bx)"}),`
zuordnet, und ein `,e.jsx(i.em,{children:"Algorithmus"}),` ist eine endliche Folge elementarer Rechenschritte, die
diese Lösung exakt oder näherungsweise berechnet (Abschnitte `,e.jsx(i.a,{href:"#sec-2.1",children:"2.1"}),"–",e.jsx(i.a,{href:"#sec-2.2",children:"2.2"}),`).
Gute Algorithmen erkennen wir daran, dass sie mit wenig Laufzeit und Speicher auskommen;
beides messen wir als Funktion der Problemgröße `,e.jsx(n,{children:"n"})," (",e.jsx(i.a,{href:"#sec-2.3",children:"Abschnitt 2.3"}),`) und
beschreiben es nur noch durch seine Ordnung, mit Landau-Symbolen und ihren Rechenregeln
(`,e.jsx(i.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),`). Die Fibonacci-Fallstudie dieses Abschnitts hat gezeigt, wie
viel diese komprimierte Sprache leistet: `,e.jsx(n,{children:"\\cblue{O(n)}"}),` gegen
`,e.jsx(n,{children:"\\cred{O(\\varphi^n)}"}),` markiert den
Unterschied zwischen „sofort fertig" und „Jahrtausende". Im nächsten Kapitel kommt die
Sprache für Fehlermaße hinzu: Normen. Kapitel 4 nutzt sie dann, um Rundungsfehler,
Kondition und Stabilität präzise zu behandeln.`]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §1.1 (wissenschaftliches Rechnen: Probleme, Algorithmen und die Rolle
des Aufwands).`})})]})}function vn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ke,{...r})}):Ke(r)}const _n={sections:[{id:"2.1",key:"probleme-algorithmen",title:"Numerische Probleme und Algorithmen",C:Y(nn)},{id:"2.2",key:"fibonacci",title:"Algorithmen konkret: Fibonacci und Verwandte",C:Y(an)},{id:"2.3",key:"aufwand",title:"Aufwand und Komplexität",C:Y(on)},{id:"2.4",key:"landau",title:"Landau-Symbole und Rechenregeln",C:Y(jn)},{id:"2.5",key:"fibonacci-komplexitaet",title:"Fibonacci: Komplexitätsanalyse",C:Y(vn)}]};export{_n as default};
