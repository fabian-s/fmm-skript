import{r as k,j as e,M as i,d as z,F as v,A as te,e as je,f as P,S as K,W as T,V as $,a as L,g as $e,h as le,C as d,E as x,b as c,Q as de,Z as J,i as E,k as Ue,l as O,n as Qe,L as me,P as ke,o as M,m as q}from"./index-BGJgxqST.js";import{I as ce,E as ge}from"./Interaktiv-Bbglsg7Y.js";const we=v.rot,ye=v.blau,ie=v.gruen,be=v.orange,Je=20;function fe(r){let n=0;for(const s of r)n+=s;return n/r.length}function Me(r){const n=Math.abs(r);return!(n>0)||!Number.isFinite(n)?0:2**(Math.floor(Math.log2(n))-52)}const Xe="⁰¹²³⁴⁵⁶⁷⁸⁹";function Se(r){const n=Math.abs(r).toString().split("").map(s=>Xe[Number(s)]).join("");return r<0?`⁻${n}`:n}function qe(r){const n=Math.floor(Math.log10(Math.abs(r)));return`${$e(r/10**n,1)} · 10${Se(n)}`}function N(r){if(!Number.isFinite(r))return"–";if(r===0)return"0";const n=Math.abs(r);if(n>=1e21||n<.001)return qe(r);if(n>=1e4)return r.toLocaleString("de-DE",{maximumFractionDigits:1}).replace(/^-/,"−");const s=$e(r,n>=100?1:n>=1?2:4);return s.includes(",")?s.replace(/0+$/,"").replace(/,$/,""):s}function Ce(r){if(!Number.isFinite(r)||r===0)return N(r);const n=Math.abs(r);return n>=1e4||n<.001?qe(r):N(r)}const ue=-18,De=22,U=460,ae=104,ve=10,Ie=10,B=62,ee=r=>ve+(Math.min(De,Math.max(ue,r))-ue)/(De-ue)*(U-ve-Ie);function Ye({aufloesung:r,ziel:n,zielName:s,ariaLabel:a}){const l=r>0?Math.log10(r):ue,_=Math.log10(n),u=ee(l),b=ee(_),g=r>n,f=[-16,-8,0,8,16];return e.jsxs("svg",{viewBox:`0 0 ${U} ${ae}`,className:"h-auto max-w-full rounded border border-slate-300 dark:border-slate-600 [.w-dark_&]:border-slate-600",role:"img","aria-label":a,children:[e.jsx("rect",{width:U,height:ae,fill:"var(--w-bg)"}),g&&e.jsx("rect",{x:b,y:B-10,width:Math.max(0,u-b),height:20,fill:we,fillOpacity:.14}),e.jsx("line",{x1:ve,x2:U-Ie,y1:B,y2:B,stroke:"var(--w-axis)",strokeWidth:1.5}),e.jsx("g",{fill:"var(--w-muted)",fontSize:11,fontFamily:"ui-monospace, SFMono-Regular, monospace","aria-hidden":"true",children:f.map(o=>e.jsxs("g",{children:[e.jsx("line",{x1:ee(o),x2:ee(o),y1:B-3,y2:B+3,stroke:"var(--w-axis)",strokeWidth:1}),e.jsxs("text",{x:ee(o),y:B+14,textAnchor:"middle",children:["10",Se(o)]})]},o))}),e.jsx("line",{x1:b,x2:b,y1:B,y2:ae-20,stroke:ie,strokeWidth:2}),e.jsx("circle",{cx:b,cy:B,r:4,fill:ie}),e.jsxs("text",{x:Math.min(b,U-110),y:ae-6,fill:ie,fontSize:12,fontFamily:"ui-sans-serif, sans-serif",children:["gesucht: ",s]}),e.jsx("line",{x1:u,x2:u,y1:16,y2:B,stroke:be,strokeWidth:2}),e.jsx("circle",{cx:u,cy:B,r:4,fill:be}),e.jsxs("text",{x:Math.min(Math.max(u-50,2),U-150),y:12,fill:be,fontSize:12,fontFamily:"ui-sans-serif, sans-serif",children:["Auflösung hier: ",Ce(r)]})]})}function en({startModus:r="varianz"}={}){const[n,s]=k.useState(r),[a,l]=k.useState(7),_=10**a,u=[4,7,13,16].map(j=>j+_),b=fe(u),g=fe(u.map(j=>(j-b)**2)),f=fe(u.map(j=>j*j)),o=b*b,h=f-o,p=10**a,R=-(10**a),m=p+R+1,S=p+(R+1),A=n==="varianz",D=Me(A?f:p),y=A?22.5:1,G=A?"die Varianz 22,5":"die 1";let w="ok",F;if(A){const j=Math.abs(h-22.5);g!==22.5?(w="fail",F=e.jsxs(e.Fragment,{children:["Jetzt versagt auch der zweistufige Weg: Er zeigt ",N(g)," statt"," ",e.jsx(i,{children:"22{,}5"}),". Bei ",e.jsx(i,{children:`10^{${a}}`})," liegen benachbarte Maschinenzahlen so weit auseinander, dass schon die Abweichungen ",e.jsx(i,{children:"x_i - \\bar{x}"})," nicht mehr darstellbar sind – die grüne Zeile ist hier keine exakte Referenz mehr, sondern selbst ein Rundungsartefakt. Die Verschiebungsformel ist längst vorher gekippt."]})):h===22.5?(w="ok",F=e.jsxs(e.Fragment,{children:["Beide Rechenwege liefern exakt ",e.jsx(i,{children:"22{,}5"}),". Die Auflösung an der Rechenstelle liegt noch weit unter der gesuchten Varianz, die Subtraktion verliert also nichts Wesentliches (",z("beispiel:katastrophale-ausloeschung"),")."]})):h===0?(w="fail",F=e.jsxs(e.Fragment,{children:["Totalausfall: Beide Terme werden auf dieselbe Maschinenzahl gerundet, ihre Differenz ist exakt ",e.jsx(i,{children:"0"}),". Die gesamte Information über die Streuung ist ausgelöscht – genau der Fall, den ",z("beispiel:katastrophale-ausloeschung")," vorrechnet."]})):h<0?(w="fail",F=e.jsxs(e.Fragment,{children:["Eine negative Varianz (",N(h),"): Die Rundungsfehler der beiden Riesenterme sind größer als deren wahre Differenz ",e.jsx(i,{children:"22{,}5"}),", das Vorzeichen ist reiner Rundungszufall (",z("beispiel:katastrophale-ausloeschung"),")."]})):j>22.5?(w="fail",F=e.jsxs(e.Fragment,{children:["Das Ergebnis (",N(h),") ist um Größenordnungen daneben. Übrig geblieben sind nur noch die Rundungsreste der beiden Terme; welcher Wert dabei herauskommt, ist Zufall (",z("beispiel:katastrophale-ausloeschung"),")."]})):(w="warn",F=e.jsxs(e.Fragment,{children:["Das Ergebnis kippt gerade: ",N(h)," statt ",e.jsx(i,{children:"22{,}5"}),". Von den führenden Ziffern der beiden Terme heben sich fast alle weg, und der Rest trägt bereits einen sichtbaren Rundungsfehler."]}))}else m===S?(w="ok",F=e.jsxs(e.Fragment,{children:["Beide Klammerungen liefern ",e.jsx(i,{children:"1"}),". Die ",e.jsx(i,{children:"1"})," ist noch größer als der Abstand benachbarter Maschinenzahlen bei ",e.jsx(i,{children:`10^{${a}}`}),", die Zwischensumme"," ",e.jsx(i,{children:"y + z"})," kann sie also festhalten (",z("beispiel:verletzte-assoziativitaet"),")."]})):(w="fail",F=e.jsxs(e.Fragment,{children:["Die Klammerungen gehen auseinander: links ",e.jsx(i,{children:"1"}),", rechts ",e.jsx(i,{children:"0"}),". Bei"," ",e.jsx(i,{children:`10^{${a}}`})," liegen benachbarte Maschinenzahlen ",N(D)," ","auseinander, ",e.jsx(i,{children:"y + z"})," wird deshalb auf ",e.jsx(i,{children:"y"})," zurückgerundet und die"," ",e.jsx(i,{children:"1"})," verschwindet spurlos (",z("beispiel:verletzte-assoziativitaet"),")."]}));const t=A?[{name:"Mittel der Quadrate",wert:N(f),farbe:we},{name:"Quadrat des Mittels",wert:N(o),farbe:ye},{name:"Verschiebungsformel",wert:N(h)},{name:"zweistufig",wert:N(g),farbe:ie}]:[{name:"(x + y) + z",wert:N(m),farbe:ie},{name:"x + (y + z)",wert:N(S)},{name:"Zwischensumme y + z",wert:N(R+1),farbe:ye},{name:"x = 10ᵏ",wert:N(p),farbe:we}];return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(te,{children:["Schieben wir ",e.jsx(i,{children:"k"})," nach oben und suchen die Stelle, an der die orange Auflösung die grüne gesuchte Größe überholt."]}),e.jsx("div",{className:"flex flex-wrap gap-2",role:"group","aria-label":"Rechenweg",children:[["varianz",`Varianz (${z("beispiel:katastrophale-ausloeschung")})`],["assoziativ",`Assoziativität (${z("beispiel:verletzte-assoziativitaet")})`]].map(([j,W])=>e.jsx("button",{type:"button",className:n===j?je:P,"aria-pressed":n===j,onClick:()=>s(j),children:W},j))}),e.jsx(Ye,{aufloesung:D,ziel:y,zielName:A?"22,5":"1",ariaLabel:`Größenordnungsachse: die Auflösung an der Rechenstelle liegt bei ${Ce(D)}, gesucht ist ${G}. `+(D>y?"Die Auflösung ist größer als die gesuchte Größe, das Ergebnis geht verloren.":"Die Auflösung ist kleiner als die gesuchte Größe, das Ergebnis überlebt.")}),e.jsx("div",{className:"max-w-md",children:e.jsx(K,{label:"Exponent k",value:a,onChange:j=>l(Math.round(j)),min:0,max:Je,step:1,fmt:j=>`10${Se(Math.round(j))}`})}),e.jsx("div",{className:`space-y-1 p-3 font-mono text-xs sm:text-sm ${T}`,children:t.map((j,W)=>e.jsxs("div",{className:`flex flex-wrap items-baseline justify-between gap-x-4 ${W===2?"border-t border-slate-300 pt-1 dark:border-slate-600":""}`,children:[e.jsx("span",{children:j.name}),e.jsx("span",{className:"tabular-nums [overflow-wrap:anywhere]",style:j.farbe?{color:j.farbe}:void 0,children:j.wert})]},j.name))}),e.jsx($,{kind:w,children:F}),A&&e.jsxs("p",{className:`max-w-prose text-xs ${L}`,children:["Kleingedrucktes: Das Widget summiert naiv von vorne nach hinten, Rs"," ",e.jsx("code",{children:"mean()"})," hängt einen Korrekturschritt an. Deshalb steht hier bei"," ",e.jsx(i,{children:"k = 9"})," der Wert ",e.jsx(i,{children:"-128"}),", wo ",z("beispiel:katastrophale-ausloeschung")," die R-Ausgabe"," ",e.jsx(i,{children:"0"})," zitiert. Beides ist IEEE-Doppelpräzision."]})]})}const nn=[{code:"1.0 - 1.0",ausgabe:"0",optionen:[{id:"null",text:"genau 0"},{id:"nicht",text:"etwas knapp neben 0"}],loesung:"null",expl:e.jsxs(e.Fragment,{children:["Hier passiert nichts Böses: ",e.jsx(i,{children:"1{,}0"})," ist als Maschinenzahl exakt darstellbar, die Differenz ist exakt ",e.jsx(i,{children:"0"}),". Entwarnung, aber nur hier."]})},{code:"1.0 - 0.9 - 0.1",ausgabe:"-2.775558e-17",optionen:[{id:"null",text:"genau 0"},{id:"nicht",text:"etwas knapp neben 0"}],loesung:"nicht",expl:e.jsxs(e.Fragment,{children:["Weder ",e.jsx(i,{children:"0{,}9"})," noch ",e.jsx(i,{children:"0{,}1"})," besitzen eine endliche Binärdarstellung; gespeichert werden gerundete Näherungen, und deren Rundungsreste bleiben nach der Subtraktion übrig. Das Ergebnis liegt in der Größenordnung der"," ",e.jsx(d,{id:"machine-epsilon",children:"Maschinengenauigkeit"})," ","(",e.jsx(i,{children:"\\approx 2^{-52} \\approx 2{,}2 \\cdot 10^{-16}"}),")."]})},{code:"100 * 0.58 == 58",ausgabe:"FALSE",optionen:[{id:"true",text:"TRUE"},{id:"false",text:"FALSE"}],loesung:"false",expl:e.jsxs(e.Fragment,{children:["Auch ",e.jsx(i,{children:"0{,}58"})," ist nicht exakt darstellbar: Gespeichert wird eine Zahl knapp daneben, und ",e.jsx(i,{children:"100 \\cdot 0{,}58"})," ergibt ",e.jsx(i,{children:"57{,}99999999999999\\ldots"})," ","statt ",e.jsx(i,{children:"58"}),". Merkregel: Gleitkommazahlen niemals mit ",e.jsx("code",{children:"=="})," auf exakte Gleichheit testen."]})},{code:`x <- seq(1, 2e16, length = 10^5)
sum(x) - sum(rev(x))`,ausgabe:"-262144",optionen:[{id:"null",text:"genau 0"},{id:"klein",text:"eine winzige Zahl"},{id:"gross",text:"eine sechsstellige Zahl"}],loesung:"gross",expl:e.jsxs(e.Fragment,{children:["Dieselben ",e.jsx(i,{children:"10^5"})," Zahlen, nur in umgekehrter Reihenfolge summiert, und die beiden Summen unterscheiden sich um ",e.jsx(i,{children:"262144 = 2^{18}"}),". Bei Zwischensummen der Größenordnung ",e.jsx(i,{children:"10^{21}"})," liegen benachbarte Maschinenzahlen über"," ",e.jsx(i,{children:"10^{5}"})," auseinander; welche Summanden dabei unter die Räder kommen, hängt von der Reihenfolge ab."]})}];function rn(){return e.jsx("div",{className:"my-4 max-w-prose space-y-4",children:nn.map(r=>e.jsx(le,{variante:"auswahl",frage:"Was gibt R aus?",optionen:r.optionen,loesung:r.loesung,verdeckt:e.jsxs("div",{className:"space-y-1 text-sm",children:[e.jsx("p",{className:"font-mono font-semibold",children:`## [1] ${r.ausgabe}`}),e.jsx("p",{className:L,children:r.expl})]}),children:e.jsx("pre",{className:"overflow-x-auto rounded bg-slate-200/70 p-2 font-mono text-sm dark:bg-slate-900/60",children:e.jsx("code",{children:r.code})})},r.code))})}function Fe(r){const n={a:"a",code:"code",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:[`Statistische Methoden sind am Ende Rechenvorschriften, die ein Computer
ausführt, und Computer rechnen anders als die Mathematik auf dem Papier. Wir
klären zuerst, was ein `,e.jsx(n.em,{children:"numerisches Problem"})," und was ein ",e.jsx(n.em,{children:"Algorithmus"}),` ist, und
sehen an Beispielen, dass dieselbe Formel als Rechenvorschrift gut oder
unbrauchbar sein kann. Danach fragen wir, wie `,e.jsx(n.em,{children:"teuer"}),` ein Algorithmus ist, und
vergleichen Rechenaufwand mit den Landau-Symbolen.`]}),`
`,e.jsx(n.h3,{children:"Verwendete Vorkenntnisse"}),`
`,e.jsxs(n.p,{children:["Aus der Analysis brauchen wir ",e.jsx(d,{id:"sequence",children:"Folgen"}),", ihre ",e.jsx(d,{id:"limit",children:"Grenzwerte"}),` und
die Grundidee der `,e.jsx(d,{id:"convergence",children:"Konvergenz"}),`, aus der linearen Algebra
`,e.jsx(d,{id:"matrix",children:"Matrizen"}),` und ihre Grundoperationen, insbesondere
`,e.jsx(d,{id:"matrix-vector-product",children:"Matrix-Vektor-"}),` und
`,e.jsx(d,{id:"matrix-multiplication",children:"Matrixmultiplikation"}),`, samt einem ersten Gespür dafür, wie
viele Einzelrechnungen darin stecken.`]}),`
`,e.jsx("h3",{id:"sec-2.1-numerische-probleme",children:"Numerische Probleme"}),`
`,e.jsxs(n.p,{children:[`Ein numerisches Problem ist eine Rechenaufgabe, deren Lösung aus einer oder
mehreren Zahlen besteht. Drei typische Beispiele aus der Statistik: der Wert
eines Integrals (etwa eine Wahrscheinlichkeit als Fläche unter einer Dichte),
die Lösung eines `,e.jsx(d,{id:"linear-system",children:"linearen Gleichungssystems"}),` (etwa die
Koeffizienten einer Regression) oder die `,e.jsx(d,{id:"basis",children:"Basis"}),`-Koeffizienten einer
Funktionsapproximation. Allgemein fassen wir das so:`]}),`
`,e.jsx(x,{kind:"Definition",label:"2.1.1 (Numerisches Problem)",id:"env-numerisches-problem",children:e.jsxs(n.p,{children:["Ein ",e.jsx(n.em,{children:"numerisches Problem"}),` ist eine Aufgabe der Form:
`,e.jsxs(n.em,{children:["Gegeben ein Problem ",e.jsx(i,{children:"f"})," mit Input ",e.jsx(i,{children:"\\bx"}),`, berechne die
Lösung `,e.jsx(i,{children:"f(\\bx)"}),"."]})]})}),`
`,e.jsxs(n.p,{children:["Dabei ist ",e.jsx(i,{children:"f"}),` die mathematische Abbildung von den Eingabedaten auf die
exakte Lösung, beim Gleichungssystem `,e.jsx(i,{children:"\\bA\\by = \\bb"}),` etwa
`,e.jsx(i,{children:"f(\\bA, \\bb) = \\bA^{-1}\\bb"}),". Ob und wie wir ",e.jsx(i,{children:"f(\\bx)"}),` tatsächlich
ausrechnen können, ist damit noch offen.`]}),`
`,e.jsx(n.h3,{children:"Zwei grundsätzliche Schwierigkeiten"}),`
`,e.jsx(n.p,{children:`Computer rechnen so gut wie nie exakt. Der Grund sind zwei prinzipielle
Beschränkungen jeder endlichen Maschine:`}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.1.2 (Grenzen des Rechnens)",id:"env-grenzen-des-rechnens",children:e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Computer können nur ",e.jsx(n.em,{children:"endlich viele Zahlen mit endlich vielen Stellen"}),`
darstellen. Schon`]}),`
`,e.jsx(c,{children:"\\pi = 3{,}141592653589793238462643383279\\ldots"}),`
`,e.jsx(n.p,{children:`passt in keinen endlichen Speicher. Gespeichert wird immer nur eine
gerundete Näherung.`}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Computer können nur ",e.jsx(n.em,{children:"endlich viele Rechenoperationen"}),` ausführen.
Schon die Exponentialfunktion ist über eine
`,e.jsx(d,{id:"infinite-series",children:"unendliche Reihe"})," definiert,"]}),`
`,e.jsx(c,{children:"e^x = \\sum_{n = 0}^\\infty \\frac{x^n}{n!},"}),`
`,e.jsx(n.p,{children:`und unendlich viele Summanden kann keine Maschine aufaddieren. Jede
Auswertung bricht irgendwo ab.`}),`
`]}),`
`]})}),`
`,e.jsxs(n.p,{children:["Deshalb kommt es darauf an, ",e.jsx(n.em,{children:"wie"}),` wir etwas berechnen. Was geben die folgenden
vier R-Ausdrücke aus? Erst raten, dann aufdecken:`]}),`
`,e.jsx(rn,{}),`
`,e.jsxs(n.p,{children:[`Weil der Computer nur endlich viele Zahlen darstellen kann, entstehen
`,e.jsx(n.em,{children:e.jsx(d,{id:"rounding-error",children:"Rundungsfehler"})})," (ausführlich in ",e.jsx(n.a,{href:"?k=04-fehler",children:"Kapitel 4"}),`). Der Fehler einer
einzelnen Operation ist meist vernachlässigbar klein, aber die Fehler können sich
`,e.jsx(n.em,{children:"akkumulieren"}),". Und weil jede Operation neu rundet, spielt sogar die ",e.jsx(n.em,{children:"Reihenfolge"}),`
unserer Rechenschritte eine Rolle. Daraus folgt eine erste praktische Empfehlung:
besonders große und besonders kleine Zahlen im selben Ausdruck vermeiden.`]}),`
`,e.jsx(n.h3,{children:"Zwei warnende Beispiele"}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.1.3 (Katastrophale Auslöschung)",id:"env-katastrophale-ausloeschung",children:[e.jsxs(n.p,{children:["Wir berechnen die Varianz von ",e.jsx(i,{children:"\\bx"}),` mit der bekannten
Verschiebungsformel`]}),e.jsx(c,{children:"\\text{Var}(x) = \\cred{\\frac{1}{n}\\sumin x_i^2} - \\cblue{\\left(\\frac{1}{n}\\sumin x_i\\right)^2}"}),e.jsxs(n.p,{children:["(der Einfachheit halber mit ",e.jsx(i,{children:"1/n"})," statt ",e.jsx(i,{children:"1/(n-1)"}),`; am Phänomen ändert das
nichts). Die Daten sind vier kleine Zahlen, verschoben um eine große Konstante:`]}),e.jsx(c,{children:"\\bx = \\left(4 + 10^9,\\; 7 + 10^9,\\; 13 + 10^9,\\; 16 + 10^9\\right)."}),e.jsxs(n.p,{children:[`Rechnen wir zunächst exakt. Der Mittelwert ist
`,e.jsx(i,{children:"\\bar{x} = 10^9 + 10"}),`, die Abweichungen davon sind
`,e.jsx(i,{children:"-6, -3, 3, 6"}),", also"]}),e.jsx(c,{children:"\\text{Var}(x) = \\frac{36 + 9 + 9 + 36}{4} = \\frac{90}{4} = 22{,}5."}),e.jsx(n.p,{children:"Für die beiden Terme der Verschiebungsformel gilt exakt"}),e.jsx(c,{children:"\\cred{\\frac{1}{n}\\sumin x_i^2} = 10^{18} + 2 \\cdot 10^{10} + 122{,}5, \\qquad \\cblue{\\bar{x}^2} = 10^{18} + 2 \\cdot 10^{10} + 100,"}),e.jsxs(n.p,{children:["und die Differenz ",e.jsx(i,{children:"\\cred{122{,}5} - \\cblue{100} = 22{,}5"}),` stimmt.
Beide Terme sind aber riesig (`,e.jsx(i,{children:"\\approx 10^{18}"}),`), und die ganze Information
über die Varianz steckt in ihren letzten drei Ziffern. Bei der Größenordnung
`,e.jsx(i,{children:"10^{18}"})," liegen benachbarte ",e.jsx(d,{id:"floating-point",children:"Gleitkommazahlen"})," schon ",e.jsx(i,{children:"128"}),`
auseinander; feiner kann die Maschine dort nicht auflösen. In R
(Doppelpräzision) werden deshalb `,e.jsx(n.em,{children:"beide"}),` Terme auf dieselbe Maschinenzahl
gerundet:`]}),e.jsx(c,{children:"\\cred{1\\,000\\,000\\,020\\,000\\,000\\,128} - \\cblue{1\\,000\\,000\\,020\\,000\\,000\\,128} = 0."}),e.jsxs(n.p,{children:['Die berechnete „Varianz" ist ',e.jsx(i,{children:"0"})," statt ",e.jsx(i,{children:"22{,}5"}),`. Die zweistufige Rechnung
`,e.jsx(i,{children:"\\frac{1}{n}\\sumin \\left(x_i - \\bar{x}\\right)^2"}),` liefert dagegen
exakt `,e.jsx(i,{children:"22{,}5"}),", denn sie subtrahiert die großen Zahlen, ",e.jsx(n.em,{children:"bevor"}),`
quadriert wird, und arbeitet danach nur noch mit den kleinen Abweichungen.`]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Ursache"}),` ist die Subtraktion zweier fast gleich großer Zahlen: Die
übereinstimmenden führenden Ziffern heben sich weg, übrig bleiben nur die
(verrauschten) hinteren Stellen. Dieses Phänomen heißt
`,e.jsx(n.em,{children:e.jsx(d,{id:"cancellation",children:"katastrophale Auslöschung"})})," (engl. ",e.jsx(n.em,{children:`catastrophic
cancellation`}),") und ist eine der häufigsten numerischen Fehlerquellen."]})]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.1.4 (Verletzte Assoziativität)",id:"env-verletzte-assoziativitaet",children:[e.jsxs(n.p,{children:[`Gleitkomma-Addition ist nicht assoziativ! Seien
`,e.jsx(i,{children:"\\cred{x = 10^{30}}"}),", ",e.jsx(i,{children:"\\cblue{y = -10^{30}}"}),` und
`,e.jsx(i,{children:"\\cgreen{z = 1}"}),`. Mathematisch ist
`,e.jsx(i,{children:"x + y + z = 1"}),", egal wie wir klammern. Die Maschine rechnet:"]}),e.jsx(c,{children:"(\\cred{x} + \\cblue{y}) + \\cgreen{z} = (\\cred{10^{30}} + \\cblue{(-10^{30})}) + \\cgreen{1} = 0 + \\cgreen{1} = 1,"}),e.jsx(c,{children:"\\cred{x} + (\\cblue{y} + \\cgreen{z}) = \\cred{10^{30}} + (\\cblue{(-10^{30})} + \\cgreen{1}) \\;\\stackrel{!!}{\\approx}\\; \\cred{10^{30}} + \\cblue{(-10^{30})} = 0."}),e.jsxs(n.p,{children:["Die erste Klammerung ist exakt: ",e.jsx(i,{children:"\\cred{x} + \\cblue{y} = 0"}),` hebt die großen
Zahlen genau auf, danach überlebt die `,e.jsx(i,{children:"\\cgreen{1}"}),`. In der zweiten Klammerung
muss die Maschine `,e.jsx(i,{children:"\\cblue{-10^{30}} + \\cgreen{1}"}),` als Gleitkommazahl speichern.
Bei der Größenordnung `,e.jsx(i,{children:"10^{30}"}),` liegen benachbarte Maschinenzahlen aber etwa
`,e.jsx(i,{children:"10^{14}"})," auseinander. Die ",e.jsx(i,{children:"\\cgreen{1}"}),` ist viel kleiner als diese Auflösung,
das Zwischenergebnis wird auf `,e.jsx(i,{children:"\\cblue{-10^{30}}"}),` zurückgerundet, und am Ende
steht `,e.jsx(i,{children:"0"})," statt ",e.jsx(i,{children:"1"}),"."]}),e.jsxs(n.p,{children:[e.jsx(i,{children:"\\impl"}),` Die Reihenfolge (Klammerung) einer Summe beeinflusst das
Ergebnis. Das zeigte oben schon `,e.jsx(n.code,{children:"sum(x) - sum(rev(x))"}),`: Vorwärts und
rückwärts summiert ergeben dieselben `,e.jsx(i,{children:"10^5"})," Zahlen verschiedene Summen."]})]}),`
`,e.jsx(n.p,{children:`Beide Beispiele scheitern am selben Mechanismus: An der Stelle, an der die
Maschine rechnet, liegen benachbarte darstellbare Zahlen weiter auseinander als
die Größe, die wir suchen. Wie weit dürfen wir die Verschiebung treiben, bis
das passiert?`}),`
`,e.jsxs(ce,{title:"Varianz und Klammerung bei wachsender Verschiebung",children:[e.jsx(le,{variante:"auswahl",frage:"Im Rechenweg »Varianz«: bei welcher Verschiebung c verliert die Verschiebungsformel die Varianz zum ersten Mal?",optionen:[{id:"e4",text:"c = 10⁴"},{id:"e8",text:"c = 10⁸"},{id:"e12",text:"c = 10¹²"}],loesung:"e8",verdeckt:e.jsxs(n.p,{className:"max-w-prose text-sm",children:["Die Verschiebungsformel verliert schon bei ",e.jsx(i,{children:"c = 10^8"})," die erste Nachkommastelle (",e.jsx(i,{children:"22"})," statt ",e.jsx(i,{children:"22{,}5"}),") und ab ",e.jsx(i,{children:"c = 10^9"})," jede Information; die Klammerung der Summe hält bis ",e.jsx(i,{children:"10^{15}"})," und bricht bei"," ",e.jsx(i,{children:"10^{16}"}),"."]}),children:e.jsx(en,{})}),e.jsx(n.p,{children:`Die Tafel stellt die Auflösung der Maschine an der Rechenstelle (orange) neben die
gesuchte Größe (grün): Solange die Auflösung kleiner ist, überlebt das Ergebnis,
sonst geht es verloren.`})]}),`
`,e.jsx("h3",{id:"sec-2.1-algorithmen",children:"Algorithmen"}),`
`,e.jsxs(n.p,{children:[`Für dieselbe Varianz gab es zwei Rechenvorschriften mit sehr verschiedenem
Ergebnis. Zum numerischen Problem `,e.jsx(i,{children:"f"}),` gehört also eine zweite Zutat: die konkrete
Rechenvorschrift, mit der wir `,e.jsx(i,{children:"f(\\bx)"})," zu berechnen versuchen."]}),`
`,e.jsx(x,{kind:"Definition",label:"2.1.5 (Algorithmus)",id:"env-algorithmus",children:e.jsxs(n.p,{children:["Ein ",e.jsx(n.em,{children:"Algorithmus"}),` ist ein Verfahren
`,e.jsx(i,{children:"\\wt{f} = \\wt{f}_s \\circ \\cdots \\circ \\wt{f}_1"}),`, das für Inputs
`,e.jsx(i,{children:"\\bx"})," eine mögliche Lösung ",e.jsx(i,{children:"\\wt{f}(\\bx)"})," des Problems ",e.jsx(i,{children:"f(\\bx)"})," berechnet."]})}),`
`,e.jsxs(n.p,{children:["Der Algorithmus ist also eine ",e.jsx(d,{id:"function-composition",children:"Verkettung"}),` endlich
vieler elementarer Rechenschritte `,e.jsx(i,{children:"\\wt{f}_1, \\ldots, \\wt{f}_s"}),`: Erst wird
`,e.jsx(i,{children:"\\wt{f}_1"})," auf den Input angewandt, dann ",e.jsx(i,{children:"\\wt{f}_2"}),` auf dessen Ergebnis und so
weiter. Die Tilde markiert, dass `,e.jsx(i,{children:"\\wt{f}"})," nur ein Versuch ist, ",e.jsx(i,{children:"f"}),` nachzubauen;
deshalb verspricht die Definition nur eine „mögliche Lösung". Wie gut
`,e.jsx(i,{children:"\\wt{f}(\\bx)"})," die wahre Lösung ",e.jsx(i,{children:"f(\\bx)"})," trifft, untersuchen wir in ",e.jsx(n.a,{href:"?k=04-fehler",children:"Kapitel 4"}),`.
Zu einem Problem gibt es meist viele Algorithmen, und sie unterscheiden sich in
Genauigkeit `,e.jsx(n.em,{children:"und"})," Rechenaufwand."]}),`
`,e.jsxs(x,{kind:"Bemerkung",label:"2.1.6 (Arten von Algorithmen)",id:"env-arten-von-algorithmen",children:[e.jsxs(n.p,{children:["Die gebräuchlichen Bezeichnungen beschreiben drei ",e.jsx(n.em,{children:"unabhängige Achsen"}),":"]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"exakt"})," (",e.jsx(i,{children:"\\wt{f}(\\bx) = f(\\bx)"})," bis auf Rundungsfehler) oder ",e.jsx(n.em,{children:"approximativ"}),`
(`,e.jsx(i,{children:"\\wt{f}(\\bx) \\approx f(\\bx)"}),`): Trifft das Verfahren die mathematische Lösung
in exakter Arithmetik, oder entsteht schon durch das Verfahren ein
Approximationsfehler, wie bei einer abgebrochenen Reihe für `,e.jsx(i,{children:"e^x"}),"?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"direkt oder numerisch iterativ"}),`: Liefert eine vorab feste, endliche Folge von
Rechenschritten die Lösung, oder erzeugt das Verfahren eine Folge von
Näherungen mit Abbruchkriterium? Eine Programmschleife allein macht ein
Verfahren noch nicht `,e.jsx(n.em,{children:"numerisch"}),` iterativ; auch direkte Algorithmen können
Schleifen enthalten.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"deterministisch oder randomisiert"}),` (probabilistisch): Ist das Ergebnis bei
gleichem Input vollständig festgelegt, oder verwendet das Verfahren Zufall?`]}),`
`]}),e.jsxs(n.p,{children:[`Beispiele für alle drei Achsen und ihre Kombinationen folgen in
`,e.jsx(n.a,{href:"#sec-algorithmenarten-in-ml-und-statistik",children:"Abschnitt 2.2.4"}),"."]})]}),`
`,e.jsx(n.h3,{children:"Selbsttest"}),`
`,e.jsxs(de,{children:[e.jsxs(J,{loesung:16,toleranz:0,children:[e.jsxs(n.p,{children:["Ab welchem Exponenten ",e.jsx(i,{children:"k"}),` liefern im Widget oben die beiden Klammerungen von
`,e.jsx(i,{children:"10^k + \\left(-10^k\\right) + 1"})," verschiedene Ergebnisse?"]}),e.jsxs(n.p,{children:["Bei ",e.jsx(i,{children:"10^{15}"})," liegen benachbarte Maschinenzahlen ",e.jsx(i,{children:"0{,}125"})," auseinander, die ",e.jsx(i,{children:"1"}),`
überlebt also die Zwischensumme. Bei `,e.jsx(i,{children:"10^{16}"})," ist der Abstand bereits ",e.jsx(i,{children:"2"}),`, und
`,e.jsx(i,{children:"-10^{16} + 1"})," wird auf ",e.jsx(i,{children:"-10^{16}"})," zurückgerundet (",e.jsx(n.a,{href:"#env-verletzte-assoziativitaet",children:"Beispiel 2.1.4"}),")."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(n.p,{children:["Auch die zweistufige Varianzformel ",e.jsx(i,{children:"\\frac{1}{n}\\sumin (x_i - \\bar{x})^2"}),` versagt,
wenn wir die Verschiebung im Widget weit genug treiben.`]}),e.jsxs(n.p,{children:["Sie hält viel länger durch als die Verschiebungsformel und liefert bis ",e.jsx(i,{children:"k = 15"}),`
exakt `,e.jsx(i,{children:"22{,}5"}),". Ab ",e.jsx(i,{children:"k = 16"})," sind aber schon die Abweichungen ",e.jsx(i,{children:"-6, -3, 3, 6"}),` nicht mehr
darstellbar: Das Widget zeigt `,e.jsx(i,{children:"20"}),", bei ",e.jsx(i,{children:"k = 17"})," sogar ",e.jsx(i,{children:"128"})," und ab ",e.jsx(i,{children:"k = 18"}),` nur noch
`,e.jsx(i,{children:"0"}),". Robuster heißt nicht immun."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsx(n.p,{children:`Ein Rundungsfehler pro Operation ist meist vernachlässigbar, gefährlich ist erst
das Zusammenspiel vieler Operationen.`}),e.jsxs(n.p,{children:[`Jede einzelne Rundung ist relativ winzig. Folgt aber eine Subtraktion fast gleich
großer Zahlen, wird daraus ein großer relativer Fehler des Ergebnisses, wie in
`,e.jsx(n.a,{href:"#env-katastrophale-ausloeschung",children:"Beispiel 2.1.3"}),"."]})]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §1.1–1.2 (wissenschaftliches Rechnen, Näherungen und
Fehlerquellen); die Gleitkomma-Arithmetik hinter den Beispielen behandelt
Heath §1.3.`})})]})}function sn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Fe,{...r})}):Fe(r)}const he=v.blau,Ne=v.gruen,Oe=v.orange,re=v.rot,pe=15;function tn(r){const n=new Array(r).fill(0);n[1]=1;for(let s=2;s<r;s++)n[s]=n[s-1]+n[s-2];return n}function ln(r){const n=new Array(r+1).fill(0),s=new Array(r+1).fill(0);for(let a=1;a<=r;a++)a<=2?(n[a]=1,s[a]=0):(n[a]=1+n[a-1]+n[a-2],s[a]=1+s[a-1]+s[a-2]);return{calls:n,adds:s}}function dn(r){const n=new Array(r+1).fill(0),s=[r];for(;s.length>0;){const a=s.pop();n[a]+=1,a>2&&s.push(a-1,a-2)}return n}function ze({j:r,counts:n}){const s=(n[r]??0)>1;return e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsxs("div",{className:"rounded border border-slate-300 px-1 font-mono text-[11px] dark:border-slate-600",style:s?{background:re+"2e",borderColor:re}:void 0,children:["x",e.jsx("sub",{children:r})]}),r>2&&e.jsxs("div",{className:"flex gap-1 pt-1",children:[e.jsx(ze,{j:r-1,counts:n}),e.jsx(ze,{j:r-2,counts:n})]})]})}function cn(){const[r,n]=k.useState(8),[s,a]=k.useState(8),l=Math.min(s,r),_=k.useMemo(()=>tn(pe),[]),{calls:u,adds:b}=k.useMemo(()=>ln(pe),[]),g=k.useMemo(()=>dn(l),[l]),f=Math.max(0,l-2),o=[];for(let m=l-2;m>=1;m--)g[m]>1&&o.push({j:m,c:g[m]});const h=f>0?b[l]/f:0,p=o.reduce((m,S)=>m===null||S.c>m.c?S:m,null),R=l>=3?e.jsxs(e.Fragment,{children:["Schritt ",l,": hänge"," ",e.jsx("span",{style:{color:Oe,fontWeight:600},children:_[l-1]})," ="," ",e.jsx("span",{style:{color:he,fontWeight:600},children:_[l-2]})," +"," ",e.jsx("span",{style:{color:Ne,fontWeight:600},children:_[l-3]})," an, eine einzige Addition."]}):l===1?e.jsx(e.Fragment,{children:"Schritt 1: Startwert 0 setzen, noch keine Addition."}):e.jsx(e.Fragment,{children:"Schritt 2: die 1 anhängen, noch keine Addition."});return e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs(te,{children:['Scrubben wir den Schrittregler und vergleichen die beiden Zähler unter den Tafeln; in der Zeile „Mehrfach berechnet" lesen wir ab, wie oft x',e.jsx("sub",{children:"3"})," dabei von vorn berechnet wird."]}),e.jsx("div",{className:"max-w-md",children:e.jsx(K,{label:"n (Ziel)",value:r,onChange:m=>n(Math.round(m)),min:3,max:pe,step:1,fmt:m=>String(Math.round(m))})}),e.jsx(Ue,{step:l,setStep:a,min:1,max:r,narration:R}),e.jsxs("div",{className:"grid gap-3 md:grid-cols-2",children:[e.jsxs("div",{className:`p-3 ${T}`,children:[e.jsxs("p",{className:"mb-2 font-semibold",children:["Iterativ (",z("algorithmus:fibonacci-schleifenbasiert"),")"]}),e.jsx("div",{className:"mb-2 flex flex-wrap gap-1",children:_.slice(0,l).map((m,S)=>{const A=S+1,D=l>=3&&A===l,y=l>=3&&A===l-1,G=l>=3&&A===l-2,w=D?Oe:y?he:G?Ne:void 0;return e.jsx("span",{className:"rounded border px-1.5 py-0.5 font-mono text-xs",style:w?{borderColor:w,color:w,fontWeight:600}:{borderColor:"var(--w-border)"},title:`x${A}`,children:m},A)})}),e.jsxs("p",{className:"font-mono text-xs",children:["elementare Schritte: ",l,"  |  Additionen insgesamt:"," ",e.jsx("strong",{style:{color:he},children:f})]})]}),e.jsxs("div",{className:`p-3 ${T}`,children:[e.jsxs("p",{className:"mb-2 font-semibold",children:["Naive Rekursion: nur x",e.jsx("sub",{children:l})]}),e.jsxs("p",{className:"font-mono text-xs",children:["Funktionsaufrufe: ",e.jsx("strong",{style:{color:re},children:O(u[l])})," "," |  Additionen: ",e.jsx("strong",{style:{color:re},children:O(b[l])})]}),o.length>0&&e.jsxs("p",{className:`mt-2 text-xs ${L}`,children:["Mehrfach berechnet:"," ",o.slice(0,4).map((m,S)=>e.jsxs("span",{children:[S>0&&", ","x",e.jsx("sub",{children:m.j})," ",m.c,"-mal"]},m.j)),o.length>4&&", …"]})]})]}),l<=8?e.jsxs("div",{className:`overflow-x-auto p-2 ${T}`,children:[e.jsxs("p",{className:`mb-1 text-xs ${L}`,children:["Aufrufbaum der naiven Rekursion für x",e.jsx("sub",{children:l}),"; rot hinterlegt sind die Argumente, die der Baum mehrfach von vorn ausrechnet – gleiche Zahl heißt identische Teilrechnung."]}),e.jsx(ze,{j:l,counts:g})]}):e.jsxs("p",{className:`text-xs ${L}`,children:["(Der Aufrufbaum hat jetzt ",O(u[l])," Knoten; zum Anzeigen Schritt ≤ 8 wählen.)"]}),e.jsx($,{kind:l<3?"neutral":h>=3?"fail":"warn",children:l<3?e.jsx(e.Fragment,{children:"Noch ist nichts passiert: Beide Varianten setzen nur den Startwert. Der Unterschied entsteht erst, sobald etwas addiert wird."}):e.jsxs(e.Fragment,{children:["Bei Schritt ",l," hat die Iteration ",e.jsx("em",{children:"alle"})," Zahlen x",e.jsx("sub",{children:"1"})," bis x",e.jsx("sub",{children:l})," mit"," ",e.jsxs("strong",{style:{color:he},children:[f," ",f===1?"Addition":"Additionen"]})," ","berechnet; die naive Rekursion braucht für die ",e.jsx("em",{children:"eine"})," Zahl x",e.jsx("sub",{children:l})," ","schon"," ",e.jsxs("strong",{style:{color:re},children:[O(b[l])," ",b[l]===1?"Addition":"Additionen"]})," ","und ",O(u[l])," Aufrufe",h>=2?e.jsxs(e.Fragment,{children:[", also das ",O(Math.round(h)),"-fache"]}):null,".",p&&e.jsxs(e.Fragment,{children:[" ","Der Grund steht im Aufrufbaum: x",e.jsx("sub",{children:p.j})," wird ",p.c,"-mal von vorn berechnet, weil die Rekursion nichts aufbewahrt."]})," ","Wie schnell diese Schere aufgeht, rechnen wir in"," ",e.jsx("a",{className:"underline",href:`#sec-${Qe("sec:algos/fibonacci-komplexitaet")}`,children:z("sec:algos/fibonacci-komplexitaet")})," ","nach."]})})]})}function Re(r){const n={a:"a",code:"code",em:"em",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Die abstrakte Definition aus ",e.jsx(n.a,{href:"#sec-2.1",children:"Abschnitt 2.1"}),` spielen wir jetzt an einem
Problem vollständig durch, das einfach genug ist, um jeden Schritt hinzuschreiben, und
das uns durch das ganze Kapitel begleitet: den Fibonacci-Zahlen.`]}),`
`,e.jsxs(n.h3,{id:"sec-beispiel-fibonacci-zahlen",children:["2.2.1 ","Beispiel: Fibonacci-Zahlen"]}),`
`,e.jsxs(x,{kind:"Definition",label:"2.2.1 (Fibonacci-Zahlen)",id:"env-fibonacci-zahlen",children:[e.jsxs(n.p,{children:["Die ",e.jsx(n.em,{children:"Fibonacci-Zahlen"})," sind die ",e.jsx(d,{id:"sequence",children:"Folge"})," ",e.jsx(i,{children:"(x_n)_{n \\in \\N}"})," mit"]}),e.jsx(c,{children:"x_1 = 0, \\quad x_2 = 1, \\quad x_{n+1} = \\cblue{x_n} + \\cgreen{x_{n-1}} \\quad (n \\ge 2)."})]}),`
`,e.jsxs(n.p,{children:[`Jedes Folgenglied ist also die Summe seiner beiden Vorgänger; die Folge beginnt mit
`,e.jsx(i,{children:"0, 1, 1, 2, 3, 5, 8, 13, 21, \\dots"})," (Manche Bücher lassen die Folge bei ",e.jsx(i,{children:"1, 1"}),` oder mit
dem Index `,e.jsx(i,{children:"0"}),` beginnen; wir bleiben bei der obigen Konvention.) Unser numerisches
Problem lautet: `,e.jsxs(n.em,{children:["Berechne die ersten ",e.jsx(i,{children:"n"})," Fibonacci-Zahlen."]}),` Es ist also die Abbildung
`,e.jsx(i,{children:"f"})," mit Input ",e.jsx(i,{children:"n"})," und Lösung ",e.jsx(i,{children:"f(n) = (x_1, \\dots, x_n)"}),"."]}),`
`,e.jsxs(n.p,{children:[`Wie berechnen wir das? Die Definition selbst gibt den Weg vor: Wir bauen den
Ergebnisvektor von links nach rechts auf und gewinnen jeden neuen Eintrag durch `,e.jsx(n.em,{children:"eine"}),`
Addition aus den beiden zuletzt berechneten:`]}),`
`,e.jsxs(x,{kind:"Algorithmus",label:"2.2.2 (Fibonacci, schleifenbasiert)",id:"env-fibonacci-schleifenbasiert",children:[e.jsx(c,{children:`\\wt{f} : \\N \\longrightarrow \\bigcup_{n\\ge 1}\\N_0^n,
\\qquad \\wt{f}(n)=(x_1,\\ldots,x_n).`}),e.jsxs(n.p,{children:["Für ",e.jsx(i,{children:"n\\ge 1"})," setzt der Algorithmus ",e.jsx(i,{children:"x_1=0"}),", für ",e.jsx(i,{children:"n\\ge2"}),` zusätzlich
`,e.jsx(i,{children:"x_2=1"}),", und führt dann aus:"]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-text",children:`für i = 2, ..., n-1:
    x[i+1] = x[i] + x[i-1]
gib (x[1], ..., x[n]) zurück
`})})]}),`
`,e.jsxs(n.p,{children:["Als ",e.jsx(d,{id:"function-composition",children:"Komposition"}),`
`,e.jsx(i,{children:"\\wt{f} = \\wt{f}_n \\circ \\cdots \\circ \\wt{f}_1"})," elementarer Schritte geschrieben:"]}),`
`,e.jsx(c,{children:"\\wt{f}_1(n) = 0, \\qquad \\wt{f}_2(x) = (x, 1), \\qquad \\wt{f}_{i+1}(x_1, \\ldots, x_i) = (x_1, \\ldots, x_i, \\cblue{x_i} + \\cgreen{x_{i-1}}) \\quad (i \\ge 2)."}),`
`,e.jsxs(n.p,{children:["Jeder Schritt ab ",e.jsx(i,{children:"\\wt{f}_3"}),` hängt an das bisherige Tupel die Summe aus dem
`,e.jsx(i,{children:"\\cblue{\\text{letzten}}"})," und dem ",e.jsx(i,{children:"\\cgreen{\\text{vorletzten}}"}),` Element als neues
Element an. Weil die Länge des Ergebnisses von `,e.jsx(i,{children:"n"}),` abhängt,
ist der Zielraum die Vereinigung aller `,e.jsx(i,{children:"\\N_0^n"})," und kein fester Raum ",e.jsx(i,{children:"\\N_0^n"}),"."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.2.3 (Die ersten 6 Fibonacci-Zahlen)",id:"env-die-ersten-6-fibonacci-zahlen",children:[e.jsxs(n.p,{children:["Berechnen wir ",e.jsx(i,{children:"\\wt{f}(6)"}),` Schritt für Schritt. Die Farben verfolgen die Rollen aus
`,e.jsx(n.a,{href:"#env-fibonacci-schleifenbasiert",children:"Algorithmus 2.2.2"}),": ",e.jsx(i,{children:"\\cblue{\\text{letztes Element}}"}),`,
`,e.jsx(i,{children:"\\cgreen{\\text{vorletztes Element}}"}),", ",e.jsx(i,{children:"\\corange{\\text{neu berechnete Summe}}"}),"."]}),e.jsx(c,{children:`\\begin{aligned}
\\wt{f}_1(6) &= 0 \\\\
\\wt{f}_2(0) &= (0, 1) \\\\
\\wt{f}_3(\\cgreen{0}, \\cblue{1}) &= (0, 1, \\corange{1}) \\\\
\\wt{f}_4(0, \\cgreen{1}, \\cblue{1}) &= (0, 1, 1, \\corange{2}) \\\\
\\wt{f}_5(0, 1, \\cgreen{1}, \\cblue{2}) &= (0, 1, 1, 2, \\corange{3}) \\\\
\\wt{f}_6(0, 1, 1, \\cgreen{2}, \\cblue{3}) &= (0, 1, 1, 2, 3, \\corange{5})
\\end{aligned}`}),e.jsxs(n.p,{children:["Ergebnis: ",e.jsx(i,{children:"\\wt{f}(6) = (0, 1, 1, 2, 3, 5)"}),`, vier Additionen
(`,e.jsx(i,{children:"\\corange{1}, \\corange{2}, \\corange{3}, \\corange{5}"}),") für sechs Zahlen."]})]}),`
`,e.jsxs(n.h3,{id:"sec-vom-algorithmus-zum-programm",children:["2.2.2 ","Vom Algorithmus zum Programm"]}),`
`,e.jsxs(n.p,{children:["Der Algorithmus lässt sich fast wörtlich in R übersetzen. ",e.jsx(n.code,{children:"numeric(n)"}),` legt einen mit
Nullen gefüllten Vektor der Länge `,e.jsx(i,{children:"n"})," an; damit ist ",e.jsx(i,{children:"x_1 = 0"})," schon erledigt:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-r",children:`fibonacci <- function(n) {
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
`,e.jsx(n.p,{children:`Eine Schleife, eine Addition pro Durchlauf, und jedes Zwischenergebnis wird genau einmal
berechnet und dann wiederverwendet.`}),`
`,e.jsxs(ce,{title:"Wie oft rechnet die Rekursion doppelt?",children:[e.jsxs(n.p,{children:["Dass hier ",e.jsx(n.em,{children:"nichts doppelt"}),` gerechnet wird, ist nicht selbstverständlich. Die
`,e.jsx(d,{id:"env:fibonacci-zahlen",href:"#env-fibonacci-zahlen",children:"Definition 2.2.1"})," legt einen zweiten Weg nahe: Für ",e.jsx(i,{children:"x_n"}),` ruft sich dieselbe
Rechenvorschrift rekursiv für `,e.jsx(i,{children:"x_{n-1}"})," und ",e.jsx(i,{children:"x_{n-2}"}),` auf, ohne Zwischenergebnisse zu
speichern. Das liefert dieselben Zahlen, aber beide Teilaufrufe berechnen große Teile
der Folge unabhängig voneinander noch einmal, und deren Teilaufrufe wieder. Wie oft
ist „noch einmal"?`]}),e.jsx(le,{frage:"Beim Ziel x₈: wie oft rechnet die naive Rekursion die Zahl x₃ von vorn aus?",loesung:8,toleranz:0,einheit:"mal",verdeckt:e.jsxs(n.p,{className:"max-w-prose text-sm",children:["Bis ",e.jsx(i,{children:"x_8"})," kommt die Iteration mit sechs Additionen aus und hat dabei ",e.jsx(n.em,{children:"alle"})," ","acht Zahlen berechnet; die Rekursion braucht für die ",e.jsx(n.em,{children:"eine"})," Zahl ",e.jsx(i,{children:"x_8"})," schon 20 Additionen und 41 Aufrufe, weil sie ",e.jsx(i,{children:"x_3"})," achtmal und ",e.jsx(i,{children:"x_2"})," ","dreizehnmal von vorn ausrechnet."]}),children:e.jsx(cn,{})}),e.jsxs(n.p,{children:["Der Abstand wächst schnell: Für ",e.jsx(i,{children:"x_{15}"})," allein braucht die Rekursion ",e.jsx(i,{children:"609"}),`
Additionen, die Iteration für alle fünfzehn Zahlen `,e.jsx(i,{children:"13"}),`. Wie schnell der Aufwand der
Rekursion wächst, bestimmen wir in `,e.jsx(n.a,{href:"#sec-2.5",children:"Abschnitt 2.5"}),"."]})]}),`
`,e.jsxs(n.h3,{id:"sec-fibonacci-selbsttest",children:["2.2.3 ","Selbsttest"]}),`
`,e.jsxs(n.p,{children:["Wo liegt ",e.jsx(n.a,{href:"#env-fibonacci-schleifenbasiert",children:"Algorithmus 2.2.2"}),` auf den Achsen aus
`,e.jsx(n.a,{href:"#env-arten-von-algorithmen",children:"Bemerkung 2.1.6"}),"?"]}),`
`,e.jsxs(de,{children:[e.jsxs(E,{wahr:!0,children:[e.jsxs(n.p,{children:["Der Algorithmus ist ",e.jsx(n.em,{children:"exakt"}),"."]}),e.jsxs(n.p,{children:["Es gilt ",e.jsx(i,{children:"f(n) = \\wt{f}(n)"}),`: Der Algorithmus liefert genau die definierten
Fibonacci-Zahlen, keine Näherung. Die Einschränkung „bis auf
`,e.jsx(d,{id:"rounding-error",children:"Rundungsfehler"}),'" greift erst, wenn ',e.jsx(i,{children:"x_n"})," für sehr großes ",e.jsx(i,{children:"n"}),` den
exakt darstellbaren Ganzzahlbereich der `,e.jsx(d,{id:"floating-point",children:"Gleitkommazahlen"})," verlässt."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(n.p,{children:["Der Algorithmus ist ",e.jsx(n.em,{children:"numerisch iterativ"}),"."]}),e.jsxs(n.p,{children:[`Er enthält zwar eine Schleife, erzeugt aber keine Folge von Näherungen mit
Abbruchkriterium: Nach einer durch `,e.jsx(i,{children:"n"}),` festgelegten Zahl von Schritten steht das exakte
Ergebnis fest. In der numerischen Terminologie ist er daher `,e.jsx(n.em,{children:"direkt"}),`. Die übliche
Bezeichnung „iterative Fibonacci-Variante" meint nur die Schleife im Gegensatz zur
Rekursion.`]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(n.p,{children:["Der Algorithmus ist ",e.jsx(n.em,{children:"probabilistisch"}),"."]}),e.jsxs(n.p,{children:[`Es kommt kein Zufall vor: Der Algorithmus ist deterministisch und liefert bei jedem
Aufruf mit demselben `,e.jsx(i,{children:"n"})," exakt dasselbe Ergebnis."]})]}),e.jsxs(J,{loesung:54,toleranz:0,children:[e.jsxs(n.p,{children:["Wie viele Additionen braucht die naive Rekursion im Stepper oben für die Zahl ",e.jsx(i,{children:"x_{10}"}),"?"]}),e.jsxs(n.p,{children:["Der Zähler steht bei Ziel ",e.jsx(i,{children:"n = 10"})," und Schritt ",e.jsx(i,{children:"10"})," auf ",e.jsx(i,{children:"54"}),`; die Iteration kommt für
dieselben zehn Zahlen mit `,e.jsx(i,{children:"8"})," Additionen aus."]})]})]}),`
`,e.jsxs(n.h3,{id:"sec-algorithmenarten-in-ml-und-statistik",children:["2.2.4 ","Algorithmenarten in ML und Statistik"]}),`
`,e.jsx(n.p,{children:`Der Fibonacci-Algorithmus ist also exakt, direkt und deterministisch. Wo liegen die
Verfahren, mit denen wir in Statistik und Machine Learning arbeiten?`}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.2.4 (Algorithmenarten in ML und Statistik)",id:"env-algorithmenarten-in-ml-und-statistik",children:[e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Exakt und direkt"}),": Matrixmultiplikation und Gauß-Elimination (",e.jsx(n.a,{href:"?k=05-lgs",children:"Kapitel 5"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Approximativ"}),`: Monte-Carlo-Integration, die Integrale durch Stichproben schätzt, und
das Training neuronaler Netze, das nur bis zu einem Toleranzniveau optimiert.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Numerisch iterativ"}),": Gradientenabstieg und Newton-Verfahren zur Nullstellensuche."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Probabilistisch"}),`: approximative Singulärwertzerlegung durch Matrix Sketching
(`,e.jsx(n.a,{href:"?k=08-la-misc#sec-8.4",children:"Abschnitt 8.4"}),") und MCMC-Verfahren der Bayes-Statistik."]}),`
`]}),e.jsx(n.p,{children:`Oft sind die Achsen kombiniert: Viele ML-Algorithmen, etwa das stochastische
Gradientenverfahren, sind iterativ, approximativ und probabilistisch zugleich.`})]}),`
`,e.jsxs(n.h3,{id:"sec-was-ist-ein-guter-algorithmus",children:["2.2.5 ","Was ist ein guter Algorithmus?"]}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.2.5 (Eine Analogie)",id:"env-eine-analogie",children:e.jsxs(n.p,{children:["Problem: ",e.jsx(n.em,{children:"Koche Schweinsbraten wie bei Oma."}),` Dann entspricht der Algorithmus dem
Kochrezept, und der Computer dem Koch, der sich zwar an das Rezept hält, dabei aber
Fehler macht.`]})}),`
`,e.jsxs(n.p,{children:[`Für dasselbe Gericht gibt es viele Rezepte, und nicht alle sind gleich gut, so wie
unsere beiden Fibonacci-Varianten dasselbe Problem zu sehr verschiedenen Kosten lösen.
Ein gutes Rezept verzeiht außerdem kleine Ungenauigkeiten des Kochs, und ein gutes
numerisches Verfahren verstärkt die unvermeidlichen `,e.jsx(d,{id:"rounding-error",children:"Rundungsfehler"}),`
nicht unnötig. Wir wollen also Algorithmen, die`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"möglichst exakte Ergebnisse liefern,"}),`
`,e.jsx(n.li,{children:"schnell sind,"}),`
`,e.jsx(n.li,{children:"wenig Speicher brauchen."}),`
`]}),`
`,e.jsxs(n.p,{children:[`Die drei Wünsche konkurrieren oft: Mehr Genauigkeit kostet meist Rechenzeit oder
Speicher, und der schnellste Weg ist nicht immer der stabilste. „Schnell" und „wenig
Speicher" machen wir in `,e.jsx(n.a,{href:"#sec-2.3",children:"Abschnitt 2.3"}),` messbar, „möglichst exakt" ist das Thema von
`,e.jsx(n.a,{href:"?k=04-fehler",children:"Kapitel 4"}),"."]}),`
`,e.jsx(n.p,{children:e.jsxs(n.em,{children:[`Vertiefung: Heath §1.1 (Näherungen und Fehlerquellen im wissenschaftlichen Rechnen);
Cormen, Leiserson, Rivest & Stein, `,e.jsx(n.em,{children:"Introduction to Algorithms"}),` (Entwurf und Analyse
von Algorithmen).`]})})]})}function an(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Re,{...r})}):Re(r)}const Q=v.blau,He=v.rot,se=v.orange;function Z({label:r,formula:n,value:s}){return e.jsxs("div",{className:"flex items-baseline justify-between gap-3 text-sm",children:[e.jsxs("span",{children:[r," ",e.jsx(i,{children:n})]}),e.jsx("span",{className:"font-mono tabular-nums",children:O(s)})]})}const C={n:100,d:100,m:100};function hn(){const[r,n]=k.useState(C.n),[s,a]=k.useState(C.d),[l,_]=k.useState(C.m),[u,b]=k.useState(null),g=r*(2*s-1),f=r*s+s+r,o=r*l*(2*s-1),h=r*s+s*l+r*l,p=()=>{b({mv:g,mm:o,n:r,d:s,m:l}),n(Math.min(400,r*2)),a(Math.min(400,s*2)),_(Math.min(400,l*2))},R=()=>{b(null),n(C.n),a(C.d),_(C.m)},m=u!==null&&r===2*u.n&&s===2*u.d&&l===2*u.m,S=u?g/u.mv:0,A=u?o/u.mm:0;let D;return m?D=e.jsxs(e.Fragment,{children:["Alle drei Dimensionen verdoppelt: Das Matrix-Vektor-Produkt kostet jetzt das"," ",e.jsxs("strong",{style:{color:Q},children:[S.toFixed(1).replace(".",","),"-fache"]}),", das Matrix-Matrix-Produkt das"," ",e.jsxs("strong",{style:{color:se},children:[A.toFixed(1).replace(".",","),"-fache"]}),". Das sind die Faktoren ",e.jsx(i,{children:"2^2"})," und ",e.jsx(i,{children:"2^3"})," aus ",z("satz:aufwand-der-matrix-vektor-multiplikation"),": In"," ",e.jsx(i,{children:"2nd"})," stecken zwei Dimensionen, in ",e.jsx(i,{children:"2ndm"})," drei."]}):l===1?D=e.jsxs(e.Fragment,{children:["Mit ",e.jsx(i,{children:"m = 1"})," ist ",e.jsx(i,{children:"\\bB"})," ein einspaltiger Vektor, und das Matrix-Matrix-Produkt ",e.jsx("em",{children:"ist"})," das Matrix-Vektor-Produkt: beide Zähler zeigen"," ",O(g)," Operationen. Jede weitere Spalte kostet noch einmal dasselbe."]}):D=e.jsxs(e.Fragment,{children:["Das Matrix-Matrix-Produkt kostet gerade das ",e.jsxs("strong",{children:[O(l),"-fache"]})," des Matrix-Vektor-Produkts, denn es besteht aus ",e.jsx(i,{children:"m"})," Matrix-Vektor-Produkten, eines pro Spalte von ",e.jsx(i,{children:"\\bB"})," (",z("satz:aufwand-der-matrix-vektor-multiplikation"),"). Beim Speicher ist der Abstand viel kleiner (",O(h)," gegen ",O(f)," Zahlen): Rechenzeit und Speicher wachsen nicht im selben Tempo."]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(te,{children:"Verdoppeln wir alle drei Dimensionen und lesen ab, um welchen Faktor die beiden Gesamtzahlen wachsen."}),e.jsxs("div",{className:"max-w-md",children:[e.jsx(K,{label:"n (Zeilen von A)",value:r,onChange:y=>n(Math.round(y)),min:1,max:400,step:1,fmt:O,accent:Q}),e.jsx(K,{label:"d (Spalten von A)",value:s,onChange:y=>a(Math.round(y)),min:1,max:400,step:1,fmt:O,accent:Q}),e.jsx(K,{label:"m (Spalten von B)",value:l,onChange:y=>_(Math.round(y)),min:1,max:400,step:1,fmt:O,accent:se})]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("button",{type:"button",className:P,onClick:p,disabled:r>=400&&s>=400&&l>=400,children:"alle Dimensionen verdoppeln"}),e.jsx("button",{type:"button",className:P,onClick:R,children:"zurücksetzen"})]}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs("div",{className:`space-y-1 p-3 ${T}`,children:[e.jsxs("p",{className:"mb-2 font-medium",style:{color:Q},children:["Matrix-Vektor: ",e.jsx(i,{children:"\\by = \\bA\\bx"}),", ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times d}"})]}),e.jsx(Z,{label:"Multiplikationen",formula:"nd",value:r*s}),e.jsx(Z,{label:"Additionen",formula:"n(d-1)",value:r*(s-1)}),e.jsx(Z,{label:"gesamt",formula:"n(2d-1)",value:g}),e.jsx(Z,{label:"Näherung",formula:"2nd",value:2*r*s}),e.jsx("div",{className:"my-1 border-t border-slate-300 dark:border-slate-600"}),e.jsx(Z,{label:"Speicher (Zahlen)",formula:"nd + d + n",value:f})]}),e.jsxs("div",{className:`space-y-1 p-3 ${T}`,children:[e.jsxs("p",{className:"mb-2 font-medium",style:{color:se},children:["Matrix-Matrix: ",e.jsx(i,{children:"\\bC = \\bA\\bB"}),", ",e.jsx(i,{children:"\\bB \\in \\R^{d \\times m}"})]}),e.jsx(Z,{label:"Multiplikationen",formula:"ndm",value:r*s*l}),e.jsx(Z,{label:"Additionen",formula:"nm(d-1)",value:r*l*(s-1)}),e.jsx(Z,{label:"gesamt",formula:"nm(2d-1)",value:o}),e.jsx(Z,{label:"Näherung",formula:"2ndm",value:2*r*s*l}),e.jsx("div",{className:"my-1 border-t border-slate-300 dark:border-slate-600"}),e.jsx(Z,{label:"Speicher (Zahlen)",formula:"nd + dm + nm",value:h})]})]}),e.jsx($,{kind:m?"warn":"neutral",children:D})]})}const Ve=[{label:"n",color:Q,f:r=>r},{label:"n²",color:se,f:r=>r*r},{label:"2ⁿ",color:He,f:r=>Math.pow(2,r)}];function on(){return e.jsxs("div",{className:"my-4 space-y-2",children:[e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx(me,{xLabel:"n",yLabel:"Operationen",series:Ve.map(r=>({f:r.f,color:r.color,label:r.label})),xDomain:[1,30],yDomain:[0,1e3],width:300,height:230,ariaLabel:"Lineare Skala: die Kurven n und n Quadrat bleiben flach, 2 hoch n verlässt den Bildausschnitt schon bei n gleich 10 als fast senkrechte Wand."}),e.jsx(me,{xLabel:"n",yLabel:"log₁₀(Operationen)",series:Ve.map(r=>({f:n=>n>=1?Math.log10(r.f(n)):NaN,color:r.color,label:r.label})),xDomain:[1,30],yDomain:[0,9.5],width:300,height:230,ariaLabel:"Logarithmische Skala: n und n Quadrat sind flache, immer flacher werdende Kurven, 2 hoch n ist eine Gerade."})]}),e.jsxs("p",{className:`max-w-prose text-xs ${L}`,children:["Dieselben drei Kurven, links auf linearer, rechts auf logarithmischer Skala (",e.jsx("span",{style:{color:Q},children:"n"}),", ",e.jsx("span",{style:{color:se},children:"n²"}),","," ",e.jsx("span",{style:{color:He},children:"2ⁿ"}),"). Eine Einheit nach oben bedeutet rechts den zehnfachen Aufwand."]})]})}function Ee({frage:r,optionen:n,richtig:s,loesung:a}){const[l,_]=k.useState(null),[u,b]=k.useState(!1),g=l!==null,f=g&&l===s;return e.jsxs("div",{className:`my-4 max-w-prose p-4 ${T}`,children:[e.jsx("div",{className:"mb-3",children:r}),e.jsx("div",{className:"flex flex-col gap-2",role:"radiogroup","aria-label":"Antwortmöglichkeiten",children:n.map((o,h)=>e.jsxs("button",{type:"button",role:"radio","aria-checked":l===h,className:`text-left ${l===h?je:P}`,onClick:()=>_(h),children:[e.jsxs("span",{className:`mr-2 font-mono text-xs ${L}`,children:[String.fromCharCode(97+h),")"]}),o]},h))}),g&&e.jsx("div",{className:"mt-3",children:e.jsx($,{kind:f?"ok":"fail",children:f?"Richtig.":"Leider nein, noch einmal probieren oder die Lösung ansehen."})}),e.jsx("button",{type:"button",className:`mt-3 text-xs ${P}`,onClick:()=>b(o=>!o),"aria-expanded":u,children:u?"Lösung verbergen":"Lösung anzeigen"}),u&&e.jsx("div",{className:"mt-3 space-y-2 text-sm",children:a})]})}function Be(r){const n={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Die beiden Fibonacci-Varianten aus ",e.jsx(n.a,{href:"#sec-2.2",children:"Abschnitt 2.2"}),` lösen dasselbe Problem sehr
verschieden schnell. „Langsam" ist aber kein mathematischer Begriff. Wir machen
daraus eine Größe, die wir `,e.jsx(n.em,{children:"zählen"}),` können, den Aufwand, und vergleichen Aufwände
dann über ihr `,e.jsx(n.em,{children:"Skalierungsverhalten"}),", die Komplexität."]}),`
`,e.jsxs(n.h3,{id:"sec-zeit-und-speicheraufwand",children:["2.3.1 ","Zeit- und Speicheraufwand"]}),`
`,e.jsxs(x,{kind:"Definition",label:"2.3.1 (Zeit- und Speicheraufwand)",id:"env-zeit-und-speicheraufwand",children:[e.jsxs(n.p,{children:[`Ein Algorithmus werde durch elementare Operationen ausgeführt: Rechenoperationen
`,e.jsx(i,{children:"f_i \\in \\lbrace +, -, \\cdot, / \\rbrace"}),`, aber auch Vergleiche, Zuweisungen und
Speicherzugriffe, jede mit (etwa) konstantem Aufwand.`]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Der ",e.jsx(n.em,{children:"Zeitaufwand"}),` des Algorithmus ist die Anzahl dieser elementaren Operationen.
Höherer Zeitaufwand bedeutet (ungefähr) längere Laufzeit.`]}),`
`,e.jsxs(n.li,{children:["Der ",e.jsx(n.em,{children:"Speicheraufwand"}),` ist (in etwa) die Anzahl der gespeicherten und
zwischengespeicherten Zahlen. Höherer Speicheraufwand bedeutet mehr benötigten
Speicherplatz.`]}),`
`]})]}),`
`,e.jsxs(n.p,{children:["Rechenoperationen mit ",e.jsx(d,{id:"floating-point",children:"Gleitkommazahlen"}),` heißen in der
Numerik-Literatur auch `,e.jsx(n.em,{children:"FLOPs"})," (engl. ",e.jsx(n.em,{children:"floating point operations"}),`). Reale Laufzeiten
hängen zusätzlich von Zwischenspeichern (Caches) und Parallelisierung ab, daher das
„ungefähr" in der Definition; für den Vergleich von Algorithmen genügt das Zählen.`]}),`
`,e.jsxs(n.h3,{id:"sec-beispiel-matrix-vektor-multiplikation",children:["2.3.2 ","Beispiel: Matrix-Vektor-Multiplikation"]}),`
`,e.jsxs(n.p,{children:["Das ",e.jsx(d,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"})," ",e.jsx(i,{children:"\\by = \\bA\\bx"}),` steckt in jeder
Vorhersage eines linearen Modells und in jeder Schicht eines neuronalen Netzes. Wir
verfolgen die `,e.jsx(d,{id:"matrix",children:"Matrix"})," ",e.jsx(i,{children:"\\cbred{\\bA}"})," in Rot, den ",e.jsx(d,{id:"vector",children:"Vektor"}),`
`,e.jsx(i,{children:"\\cblue{\\bx}"})," in Blau und das Ergebnis ",e.jsx(i,{children:"\\cbgreen{\\by}"})," in Grün."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.3.2 (Matrix-Vektor-Multiplikation)",id:"env-matrix-vektor-multiplikation",children:[e.jsxs(n.p,{children:["Gesucht ist ",e.jsx(i,{children:"\\by = \\bA\\bx"})," für ",e.jsx(i,{children:"\\bA \\in \\R^{3 \\times 2}"}),", ",e.jsx(i,{children:"\\bx \\in \\R^2"}),", konkret"]}),e.jsx(c,{children:"\\cbred{\\bA} = \\cbred{\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}}, \\qquad \\cblue{\\bx} = \\cblue{\\begin{pmatrix} 7 \\\\ 8 \\end{pmatrix}}."}),e.jsxs(n.p,{children:["Jede Komponente von ",e.jsx(i,{children:"\\cbgreen{\\by}"}),` ist das Skalarprodukt einer Zeile von
`,e.jsx(i,{children:"\\cbred{\\bA}"})," mit ",e.jsx(i,{children:"\\cblue{\\bx}"}),":"]}),e.jsx(c,{children:"\\begin{aligned} \\cgreen{y_1} &= \\cred{1} \\cdot \\cblue{7} + \\cred{2} \\cdot \\cblue{8} = 7 + 16 = \\cgreen{23} && \\text{(2 Mult., 1 Add.)} \\\\ \\cgreen{y_2} &= \\cred{3} \\cdot \\cblue{7} + \\cred{4} \\cdot \\cblue{8} = 21 + 32 = \\cgreen{53} && \\text{(2 Mult., 1 Add.)} \\\\ \\cgreen{y_3} &= \\cred{5} \\cdot \\cblue{7} + \\cred{6} \\cdot \\cblue{8} = 35 + 48 = \\cgreen{83} && \\text{(2 Mult., 1 Add.)} \\end{aligned}"}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Zeitaufwand:"})," ",e.jsx(i,{children:"3 \\cdot 2 = 6"})," Multiplikationen und ",e.jsx(i,{children:"3 \\cdot 1 = 3"}),` Additionen,
zusammen `,e.jsx(i,{children:"9"})," Operationen."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Speicheraufwand:"})," ",e.jsx(i,{children:"6"})," Zahlen für ",e.jsx(i,{children:"\\cbred{\\bA}"}),", ",e.jsx(i,{children:"2"})," für ",e.jsx(i,{children:"\\cblue{\\bx}"}),", ",e.jsx(i,{children:"3"}),` für
`,e.jsx(i,{children:"\\cbgreen{\\by}"}),", zusammen ",e.jsx(i,{children:"11"})," Zahlen."]}),`
`]})]}),`
`,e.jsx(n.p,{children:"Das Muster aus dem Beispiel verallgemeinert sich direkt auf beliebige Dimensionen:"}),`
`,e.jsxs(x,{kind:"Satz",label:"2.3.3 (Aufwand der Matrix-Vektor-Multiplikation)",id:"env-aufwand-der-matrix-vektor-multiplikation",children:[e.jsxs(n.p,{children:["Sei ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times d}"})," und ",e.jsx(i,{children:"\\bx \\in \\R^d"}),". Die Berechnung von ",e.jsx(i,{children:"\\by = \\bA\\bx"})," hat"]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Zeitaufwand ",e.jsx(i,{children:"nd"})," Multiplikationen ",e.jsx(i,{children:"+\\; n(d-1)"})," Additionen ",e.jsx(i,{children:"= n(2d - 1) \\approx 2nd"}),`
Operationen,`]}),`
`,e.jsxs(n.li,{children:["Speicheraufwand ",e.jsx(i,{children:"nd + d + n"})," Zahlen (für ",e.jsx(i,{children:"\\bA"}),", ",e.jsx(i,{children:"\\bx"})," und ",e.jsx(i,{children:"\\by"}),")."]}),`
`]})]}),`
`,e.jsxs(n.p,{children:["Jede der ",e.jsx(i,{children:"n"})," Komponenten ",e.jsx(i,{children:"\\cgreen{y_i} = \\sum_{j=1}^{d} \\cred{a_{ij}}\\, \\cblue{x_j}"}),` (in
`,e.jsx(d,{id:"summation-notation",children:"Summenschreibweise"}),") kostet ",e.jsx(i,{children:"d"})," Multiplikationen und ",e.jsx(i,{children:"d - 1"}),`
Additionen; gespeichert werden die Eingaben und das Ergebnis. Als Faustregel kostet das Matrix-Vektor-Produkt also `,e.jsx(i,{children:"\\approx 2nd"}),` Operationen, je eine
Multiplikation und eine Addition pro Matrixeintrag. Dieselbe Zählung gilt für die
`,e.jsx(d,{id:"matrix-multiplication",children:"Matrix-Matrix-Multiplikation"})," ",e.jsx(i,{children:"\\bC = \\bA\\bB"}),` mit
`,e.jsx(i,{children:"\\bB \\in \\R^{d \\times m}"}),": Sie besteht aus ",e.jsx(i,{children:"m"}),` Matrix-Vektor-Produkten (eines pro Spalte
von `,e.jsx(i,{children:"\\bB"}),") und kostet ",e.jsx(i,{children:"\\approx 2ndm"})," Operationen."]}),`
`,e.jsxs(ce,{title:"FLOP-Zähler: Was kosten Matrix-Vektor- und Matrix-Matrix-Produkt?",children:[e.jsx(n.p,{children:`Verdoppelt sich der Aufwand, wenn wir alle Dimensionen verdoppeln? Um diese Frage nach
dem Wachstum geht es im Rest des Kapitels.`}),e.jsx(le,{variante:"auswahl",frage:"Verdoppeln wir n, d und m: um welchen Faktor wächst der Matrix-Matrix-Aufwand?",optionen:[{id:"zwei",text:"doppelt"},{id:"vier",text:"viermal"},{id:"acht",text:"achtmal"}],loesung:"acht",verdeckt:e.jsxs(n.p,{className:"max-w-prose text-sm",children:["Beim Matrix-Vektor-Produkt stecken zwei Dimensionen im Produkt ",e.jsx(i,{children:"2nd"}),", also wird der Aufwand beim Verdoppeln aller Dimensionen viermal so groß; beim Matrix-Matrix-Produkt sind es drei Dimensionen und damit der Faktor acht."]}),children:e.jsx(hn,{})}),e.jsx(n.p,{children:`Entscheidend ist nicht die absolute Zahl, sondern die Zahl der Dimensionen im Produkt;
der Speicher wächst dabei langsamer als die Rechenzeit.`})]}),`
`,e.jsx("h3",{id:"sec-2.3-quiz",children:"Selbsttest: Operationen und Speicher zählen"}),`
`,e.jsxs(n.p,{children:["Gegeben sind ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times d}"})," und ",e.jsx(i,{children:"\\bx, \\by \\in \\R^d"}),", und wir wollen"]}),`
`,e.jsx(c,{children:"\\bz = f(\\bA, \\bx, \\by) = \\bA(\\bx - \\by) = \\sum_{i=1}^{d} (x_i - y_i)\\, \\bA_{\\cdot i}"}),`
`,e.jsxs(n.p,{children:["berechnen, also eine ",e.jsx(d,{id:"linear-combination",children:"Linearkombination"}),` der Spalten
`,e.jsx(i,{children:"\\bA_{\\cdot i}"})," von ",e.jsx(i,{children:"\\bA"}),". Der Algorithmus arbeitet die Summe spaltenweise ab:"]}),`
`,e.jsx(x,{kind:"Algorithmus",label:"2.3.4 (Spaltenweise Auswertung)",id:"env-spaltenweise-auswertung",children:e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Initialisiere ",e.jsx(i,{children:"\\bz = \\bnull \\in \\R^n"}),"."]}),`
`,e.jsxs(n.li,{children:["Für ",e.jsx(i,{children:"i = 1, \\ldots, d"}),": berechne den Skalar ",e.jsx(i,{children:"(x_i - y_i)"}),` und aktualisiere
`,e.jsx(i,{children:"\\bz \\leftarrow \\bz + (x_i - y_i) \\cdot \\bA_{\\cdot i}"}),"."]}),`
`]})}),`
`,e.jsx(Ee,{frage:e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Quiz 1."})," Wie viele elementare Rechenoperationen benötigt",z("algorithmus:spaltenweise-auswertung"),"?"]}),optionen:[e.jsx(i,{children:"2n + d"}),e.jsx(i,{children:"2dn + d"}),e.jsx(i,{children:"dn^2"}),e.jsx(i,{children:"2(n + d)"})],richtig:1,loesung:e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Der Zeitaufwand ist ",e.jsx(i,{children:"2nd + d"})," Operationen. Zählen wir eine Iteration"," ",e.jsx(i,{children:"i \\in \\lbrace 1, \\ldots, d \\rbrace"})," der Schleife durch:"]}),e.jsxs(n.ol,{className:"list-decimal space-y-1 pl-5",children:[e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Subtraktion:"})," ",e.jsx(i,{children:"(x_i - y_i)"}),", das ist ",e.jsx(i,{children:"1"})," Operation."]}),e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Skalierung:"})," ",e.jsx(i,{children:"(x_i - y_i) \\cdot \\bA_{\\cdot i}"}),"; der Skalar trifft jeden der ",e.jsx(i,{children:"n"})," Einträge der Spalte, also"," ",e.jsx(i,{children:"n"})," Multiplikationen."]}),e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Aktualisierung:"})," ",e.jsx(i,{children:"\\bz \\leftarrow \\bz + \\ldots"}),", also"," ",e.jsx(i,{children:"n"})," Additionen, eine pro Eintrag."]})]}),e.jsxs(n.p,{children:["Pro Iteration sind das ",e.jsx(i,{children:"1 + n + n = 2n + 1"})," Operationen, und die Schleife läuft ",e.jsx(i,{children:"d"}),"-mal:"]}),e.jsx(c,{children:"d \\cdot (2n + 1) = 2nd + d."}),e.jsxs(n.p,{children:["Zum Vergleich: Das ist bis auf den kleinen Term ",e.jsx(i,{children:"+\\,d"})," dasselbe"," ",e.jsx(i,{children:"\\approx 2nd"})," wie beim gewöhnlichen Matrix-Vektor-Produkt aus"," ",z("satz:aufwand-der-matrix-vektor-multiplikation"),", denn es"," ",e.jsx(n.em,{children:"ist"})," ein Matrix-Vektor-Produkt, nur spaltenweise organisiert."]})]})}),`
`,e.jsx(Ee,{frage:e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Quiz 2."})," Für wie viele Gleitkommazahlen braucht ",z("algorithmus:spaltenweise-auswertung"),"Speicherplatz?"]}),optionen:[e.jsx(i,{children:"3n + d"}),e.jsx(i,{children:"4nd"}),e.jsx(i,{children:"2(n + d)"}),e.jsx(i,{children:"n + nd + 2d"})],richtig:3,loesung:e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"Wir zählen alle Objekte, die im Speicher liegen müssen:"}),e.jsxs(n.ul,{className:"list-disc space-y-1 pl-5",children:[e.jsxs(n.li,{children:["das Ergebnis ",e.jsx(i,{children:"\\bz \\in \\R^n"}),": ",e.jsx(i,{children:"n"})," Zahlen,"]}),e.jsxs(n.li,{children:["die Matrix ",e.jsx(i,{children:"\\bA \\in \\R^{n \\times d}"}),": ",e.jsx(i,{children:"nd"})," Zahlen,"]}),e.jsxs(n.li,{children:["die Vektoren ",e.jsx(i,{children:"\\bx, \\by \\in \\R^d"}),": je ",e.jsx(i,{children:"d"}),", zusammen"," ",e.jsx(i,{children:"2d"})," Zahlen."]})]}),e.jsxs(n.p,{children:["Insgesamt also ",e.jsx(i,{children:"n + nd + 2d"})," Gleitkommazahlen. (Streng genommen kommt noch der eine Skalar ",e.jsx(i,{children:"(x_i - y_i)"})," als Zwischenergebnis dazu; solche konstanten Zusatzterme spielen keine Rolle, wie der nächste Unterabschnitt zeigt.)"]})]})}),`
`,e.jsxs(n.h3,{id:"sec-komplexitaet-wie-skaliert-der-aufwand",children:["2.3.3 ","Komplexität: Wie skaliert der Aufwand?"]}),`
`,e.jsxs(n.p,{children:["Ob oben ",e.jsx(i,{children:"2nd + d"}),", ",e.jsx(i,{children:"2nd - n"})," oder ",e.jsx(i,{children:"2nd"}),` herauskommt, hängt von Zählkonventionen ab: Zählt
man die Initialisierung mit, das Zwischenergebnis? Für den Vergleich von Algorithmen ist
die exakte Anzahl unwichtig. Uns interessiert, `,e.jsx(n.em,{children:`wie der Aufwand mit der Größe des
Problems wächst`}),": Was passiert bei ",e.jsx(i,{children:"10\\,000"})," statt ",e.jsx(i,{children:"1000"})," Datenpunkten, bei ",e.jsx(i,{children:"1000"}),` statt
`,e.jsx(i,{children:"10"})," Kovariablen?"]}),`
`,e.jsx(x,{kind:"Definition",label:"2.3.5 (Komplexität)",id:"env-komplexitaet",children:e.jsxs(n.p,{children:[`Wie der Zeit- bzw. Speicheraufwand eines Algorithmus mit der Größe des Problems
`,e.jsx(n.em,{children:"skaliert"}),", nennen wir die ",e.jsx(n.em,{children:"Laufzeitkomplexität"})," bzw. ",e.jsx(n.em,{children:"Speicherkomplexität"}),` des
Algorithmus.`]})}),`
`,e.jsx(x,{kind:"Beispiel",label:"2.3.6",id:"env-beispiel-2-3-6",children:e.jsxs(n.p,{children:["Ein Algorithmus benötige ",e.jsx(i,{children:"4n^3 + 16n^2 + 239"})," Operationen. Für großes ",e.jsx(i,{children:"n"}),` ist
`,e.jsx(i,{children:"16n^2 + 239"})," gegenüber ",e.jsx(i,{children:"4n^3"})," vernachlässigbar: Bei ",e.jsx(i,{children:"n = 100"}),` steuert der kubische
Term `,e.jsx(i,{children:"4 \\cdot 10^6"})," Operationen bei, die restlichen Terme nur ",e.jsx(i,{children:"160\\,239"}),`, rund
`,e.jsx(i,{children:"4\\,\\%"})," des Gesamtaufwands. Bei ",e.jsx(i,{children:"n = 1000"})," sind es nur noch ",e.jsx(i,{children:"0{,}4\\,\\%"}),`. Der
Algorithmus `,e.jsx(n.em,{children:"skaliert"})," also wie ",e.jsx(i,{children:"4n^3"}),`; seine Komplexität ist von
`,e.jsx(n.em,{children:"kubischer Ordnung"}),", und wir schreiben kurz: „",e.jsx(i,{children:"O(n^3)"}),'".']})}),`
`,e.jsxs(n.p,{children:["Die Schreibweise ",e.jsx(i,{children:"O(n^3)"})," lässt auch den Vorfaktor ",e.jsx(i,{children:"4"}),` weg; es zählt allein die
`,e.jsx(n.em,{children:"Ordnung"})," des Wachstums. Präzise definiert wird ",e.jsx(i,{children:"O"})," in ",e.jsx(n.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),`; bis dahin lesen wir
es als „wächst höchstens wie".`]}),`
`,e.jsxs(n.h3,{id:"sec-komplexitaetsklassen",children:["2.3.4 ","Komplexitätsklassen"]}),`
`,e.jsxs(n.p,{children:[`Die wichtigsten Wachstumsordnungen haben Namen. Ein Gefühl für sie bekommen wir über
die Frage: `,e.jsx(n.em,{children:"Was passiert mit dem Aufwand, wenn sich die Problemgröße verdoppelt?"})]}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.3.7 (Interpretation der Komplexitätsklassen)",id:"env-interpretation-der-komplexitaetsklassen",children:e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Konstant"}),", ",e.jsx(i,{children:"O(1)"}),": Die Anzahl der Operationen hängt nicht von ",e.jsx(i,{children:"n"})," ab."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Logarithmisch"}),", ",e.jsx(i,{children:"O(\\log n)"}),": Verdoppelt sich ",e.jsx(i,{children:"n"}),`, kommt im Modell
`,e.jsx(i,{children:"c\\log_2 n"}),` ein konstanter Aufwand hinzu, denn
`,e.jsx(i,{children:"\\log_2(2n) = \\log_2(n) + 1"})," (",e.jsx(d,{id:"logarithm",children:"Logarithmus"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Linear"}),", ",e.jsx(i,{children:"O(n)"}),": Verdoppelt sich ",e.jsx(i,{children:"n"}),", verdoppelt sich der führende Aufwand."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Quadratisch"}),", ",e.jsx(i,{children:"O(n^2)"}),": Verdoppelt sich ",e.jsx(i,{children:"n"}),", vervierfacht sich der führende Aufwand."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"Exponentiell"}),", ",e.jsx(i,{children:"O(2^n)"}),": Verdoppelt sich ",e.jsx(i,{children:"n"}),", ",e.jsx(n.em,{children:"quadriert"}),` sich die Anzahl der
Operationen, denn `,e.jsx(i,{children:"2^{2n} = \\left(2^n\\right)^2"}),`. Schon ein einziger Schritt
`,e.jsx(i,{children:"n \\to n + 1"})," ",e.jsx(n.em,{children:"verdoppelt"})," den Aufwand."]}),`
`]})}),`
`,e.jsxs(n.p,{children:[`Exponentielle Algorithmen sind damit schon für moderate Problemgrößen meist
unbrauchbar; die naive Fibonacci-Rekursion gehört dazu (`,e.jsx(n.a,{href:"#sec-2.5",children:"Abschnitt 2.5"}),`).
In der numerischen linearen Algebra bewegen wir uns dagegen meist zwischen `,e.jsx(i,{children:"O(n)"}),`
(Vektoroperationen), `,e.jsx(i,{children:"O(n^2)"})," (Matrix-Vektor-Produkte, ",e.jsx(d,{id:"env:aufwand-der-matrix-vektor-multiplikation",href:"#env-aufwand-der-matrix-vektor-multiplikation",children:"Satz 2.3.3"}),`
mit `,e.jsx(i,{children:"d = n"}),") und ",e.jsx(i,{children:"O(n^3)"})," (Matrix-Zerlegungen, Matrix-Matrix-Produkte)."]}),`
`,e.jsxs(n.p,{children:[`Wie weit die Klassen auseinanderliegen, zeigt das Bild. Auf der linearen Skala links
verlässt `,e.jsx(i,{children:"2^n"})," den Bildausschnitt schon bei ",e.jsx(i,{children:"n = 10"}),", während ",e.jsx(i,{children:"n"})," und ",e.jsx(i,{children:"n^2"})," bis ",e.jsx(i,{children:"n = 30"}),`
darin bleiben. Auf der logarithmischen Skala rechts wird `,e.jsx(i,{children:"2^n"}),` zu einer Geraden, und
alle drei Klassen passen in ein Bild:`]}),`
`,e.jsx(on,{}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.3.8 (Vorsicht: Konstanten!)",id:"env-vorsicht-konstanten",children:e.jsxs(n.p,{children:["Die ",e.jsx(i,{children:"O(\\cdot)"}),`-Notation ignoriert konstante Faktoren und Terme niedrigerer Ordnung. Ein
Algorithmus mit `,e.jsx(i,{children:"1000n + 10\\,000"})," Operationen ist ",e.jsx(i,{children:"O(n)"}),", aber trotzdem ",e.jsx(n.em,{children:"langsamer"}),` als
ein `,e.jsx(i,{children:"O(n^2)"}),"-Algorithmus mit ",e.jsx(i,{children:"n^2"})," Operationen, solange ",e.jsx(i,{children:"n^2 < 1000n + 10\\,000"}),` gilt.
Bei `,e.jsx(i,{children:"n = 100"})," etwa stehen ",e.jsx(i,{children:"110\\,000"})," Operationen gegen nur ",e.jsx(i,{children:"10\\,000"}),`. Die
Komplexitätsklasse sagt, wer für `,e.jsx(n.em,{children:"hinreichend große"}),` Probleme gewinnt, nicht, wer bei
`,e.jsx(n.em,{children:"unserem konkreten"})," Problem gewinnt."]})}),`
`,e.jsx(n.h3,{children:"Selbsttest: Aufwand und Ordnung"}),`
`,e.jsxs(de,{children:[e.jsxs(J,{loesung:1010,toleranz:5,children:[e.jsxs(n.p,{children:["Ab welchem ",e.jsx(i,{children:"n"})," ist ein Algorithmus mit ",e.jsx(i,{children:"n^2"}),` Operationen schneller als einer mit
`,e.jsx(i,{children:"1000n + 10\\,000"})," Operationen?"]}),e.jsxs(n.p,{children:["Der Schnittpunkt liegt bei ",e.jsx(i,{children:"n = 500 + \\sqrt{260\\,000} \\approx 1009{,}9"}),". Für ",e.jsx(i,{children:"n = 1009"}),`
stehen `,e.jsx(i,{children:"1\\,018\\,081"})," gegen ",e.jsx(i,{children:"1\\,019\\,000"})," Operationen, für ",e.jsx(i,{children:"n = 1010"}),` dagegen
`,e.jsx(i,{children:"1\\,020\\,100"})," gegen ",e.jsx(i,{children:"1\\,020\\,000"}),"."]})]}),e.jsxs(J,{loesung:8,toleranz:0,children:[e.jsxs(n.p,{children:[`Um welchen Faktor wächst der Zeitaufwand des Matrix-Matrix-Produkts, wenn wir im
FLOP-Zähler `,e.jsx(i,{children:"n"}),", ",e.jsx(i,{children:"d"})," und ",e.jsx(i,{children:"m"})," gleichzeitig verdoppeln?"]}),e.jsxs(n.p,{children:["In ",e.jsx(i,{children:"2ndm"})," stecken drei Dimensionen, also ",e.jsx(i,{children:"2^3 = 8"}),`. Beim Matrix-Vektor-Produkt sind es
nur zwei Dimensionen und damit der Faktor `,e.jsx(i,{children:"4"}),"."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(n.p,{children:["Ein ",e.jsx(i,{children:"O(n)"}),"-Algorithmus ist für jedes ",e.jsx(i,{children:"n"})," schneller als ein ",e.jsx(i,{children:"O(n^2)"}),"-Algorithmus."]}),e.jsxs(n.p,{children:[`Die Landau-Notation ignoriert Vorfaktoren, und die können bei jeder endlichen
Problemgröße den Ausschlag geben (`,e.jsx(n.a,{href:"#env-vorsicht-konstanten",children:"Bemerkung 2.3.8"}),`). Die Aussage gilt nur
für `,e.jsx(n.em,{children:"hinreichend große"})," ",e.jsx(i,{children:"n"}),"."]})]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §1.1 (Kosten und Genauigkeit wissenschaftlichen Rechnens);
Heath §2.4.5 (Operationen zählen am Beispiel des Gauß-Verfahrens).`})})]})}function xn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Be,{...r})}):Be(r)}function oe({nr:r,frage:n,children:s}){return e.jsxs("details",{className:`my-2 max-w-prose ${T}`,children:[e.jsxs("summary",{className:"cursor-pointer select-none px-3 py-2",children:[e.jsxs("span",{className:"font-semibold",children:["Frage ",r,"."]})," ",n," ",e.jsx("span",{className:`text-sm ${L}`,children:"(Lösung aufklappen)"})]}),e.jsx("div",{className:"space-y-2 border-t border-slate-200 px-3 py-2 dark:border-slate-700 [.w-dark_&]:border-slate-600",children:s})]})}const _e=[{key:"log",label:"log₂ n",color:v.gruen,f:r=>Math.log2(r)},{key:"lin",label:"n",color:v.blau,f:r=>r},{key:"nlogn",label:"n · log₂ n",color:v.grau,f:r=>r*Math.log2(r)},{key:"quad",label:"c · n²",color:v.orange,f:(r,n)=>n*r*r},{key:"kub",label:"n³",color:v.violett,f:r=>r*r*r},{key:"exp",label:"2ⁿ",color:v.rot,f:r=>Math.pow(2,r)}],un=1e5,I=[{id:"polyexp",name:"polynomial gegen exponentiell",scale:"linear",nMax:30,cExp:0,an:["lin","quad","exp"]},{id:"vorfaktor",name:"Vorfaktor gegen Ordnung",scale:"linear",nMax:200,cExp:2,an:["quad","kub"]},{id:"logskala",name:"log-Skala macht 2ⁿ zur Geraden",scale:"log",nMax:60,cExp:0,an:["log","lin","quad","exp"]}],Ze=r=>Object.fromEntries(_e.map(n=>[n.key,r.includes(n.key)]));function Le(r){if(!Number.isFinite(r))return"∞";if(r>=1e5){const n=Math.floor(Math.log10(r)),s=r/Math.pow(10,n);return e.jsxs(e.Fragment,{children:[s.toFixed(1).replace(".",",")," · 10",e.jsx("sup",{children:n})]})}return r>=100?Math.round(r).toLocaleString("de-DE"):Number.isInteger(r)?String(r).replace(".",","):r.toFixed(1).replace(".",",")}function jn(r){let n=0;for(let s=1;s<=2e3;s++)Math.pow(2,s)<=r*s*s&&(n=s);return n+1}function mn(){const[r,n]=k.useState(I[0].id),[s,a]=k.useState(I[0].scale),[l,_]=k.useState(I[0].nMax),[u,b]=k.useState(I[0].cExp),[g,f]=k.useState(Ze(I[0].an)),o=t=>{n(t.id),a(t.scale),_(t.nMax),b(t.cExp),f(Ze(t.an))},h=Math.round(Math.pow(10,u)),p=_e.filter(t=>g[t.key]),{linSeries:R,logSeries:m,linDomain:S,logDomain:A,linLabel:D,capped:y}=k.useMemo(()=>{const t=Math.max(1,...p.map(V=>V.f(l,h))),j=g.exp?un:1/0,W=Math.min(t,j),X=W>1e4?1e3:1;return{linSeries:p.map(V=>({f:Y=>Y>=1?V.f(Y,h)/X:NaN,color:V.color,label:V.label})),logSeries:p.map(V=>({f:Y=>Y>=1?Math.log10(Math.max(V.f(Y,h),1e-12)):NaN,color:V.color,label:V.label})),linDomain:[0,W*1.05/X],logDomain:[-1,Math.max(Math.log10(t)*1.08,1)],linLabel:X===1e3?"f(n) in Tausend":"f(n)",capped:t>j}},[p,l,h,g.exp]),G=k.useMemo(()=>jn(h),[h]);let w,F="neutral";if(g.exp&&g.quad)F="warn",w=e.jsxs(e.Fragment,{children:["Mit dem Vorfaktor ",e.jsx(i,{children:`c = ${h}`})," zieht ",e.jsx(i,{children:"2^n"})," spätestens ab"," ",e.jsx(i,{children:`n = ${G}`})," endgültig davon; davor können beide Kurven die Rollen mehrfach tauschen. Der Vorfaktor verschiebt die Schwelle also nur, und selbst ",e.jsx(i,{children:"c = 1000"})," kostet die Exponentialfunktion bloß 14 Schritte (von ",e.jsx(i,{children:"n = 5"})," auf ",e.jsx(i,{children:"n = 19"}),"). Nach ",z("beispiel:vereinfachung-eines-aufwandsausdrucks")," verschwindet jeder konstante Faktor in der Landau-Notation, deshalb ist ",e.jsx(i,{children:"c \\cdot n^2 = O(n^2)"})," ","unabhängig von ",e.jsx(i,{children:"c"}),"."]});else if(g.kub&&g.quad)F="warn",w=e.jsxs(e.Fragment,{children:["Hier stehen zwei polynomiale Klassen gegeneinander: ",e.jsx(i,{children:"n^3 > c \\cdot n^2"})," gilt genau für ",e.jsx(i,{children:`n > c = ${h}`}),". Auch hier entscheidet der Vorfaktor nur, ",e.jsx("em",{children:"wo"})," ","die Kurven sich kreuzen, nicht ",e.jsx("em",{children:"ob"})," (",z("lemma:rechenregeln-fuer-landau-symbole"),", Regel 3, mit"," ",e.jsx(i,{children:"n^2 = O(n^3)"}),")."]});else if(p.length<=1)w=e.jsx(e.Fragment,{children:"Mit einer einzigen Kurve lässt sich nichts vergleichen. Schalten wir mindestens zwei Klassen an; interessant sind Paare, bei denen der Vorfaktor die eine kurzzeitig nach oben schiebt."});else{const t=p[p.length-1];w=e.jsxs(e.Fragment,{children:["Von den gewählten Klassen wächst ",e.jsx("strong",{style:{color:t.color},children:t.label})," ","am schnellsten und liegt bei ",e.jsx(i,{children:`n = ${l}`})," bei"," ",Le(t.f(l,h))," Operationen. Die Kette"," ",e.jsx(i,{children:"\\log n,\\ n,\\ n\\log n,\\ n^2,\\ n^3,\\ 2^n"})," ist strikt: Jede Klasse ist klein-o der nächsten, jede Kurve wird also von jeder weiter rechts stehenden irgendwann endgültig überholt."]})}return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(te,{children:["Wählen wir ein Preset, schieben dann den Vorfaktor ",e.jsx(i,{children:"c"})," nach oben und beobachten, wohin der Schnittpunkt wandert."]}),e.jsx("div",{className:"flex flex-wrap gap-2",role:"group","aria-label":"Presets",children:I.map(t=>e.jsx("button",{type:"button",className:r===t.id?je:P,"aria-pressed":r===t.id,onClick:()=>o(t),children:t.name},t.id))}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]",children:[e.jsx("div",{className:"grid min-w-0",children:[["linear",R,S,D],["log",m,A,"log₁₀ f(n)"]].map(([t,j,W,X])=>{const V=s===t;return e.jsx("div",{"aria-hidden":!V,className:"min-w-0 transition-opacity duration-300 ease-in-out",style:{gridArea:"1 / 1",opacity:V?1:0,pointerEvents:V?void 0:"none"},children:e.jsx(me,{xLabel:"n",yLabel:X,series:j,xDomain:[1,l],yDomain:W,width:360,height:260,ariaLabel:`Komplexitätsklassen auf ${t==="linear"?"linearer":"logarithmischer"} Skala, n bis ${l}.`})},t)})}),e.jsxs("div",{className:"min-w-0 space-y-2 text-sm",children:[e.jsxs("table",{className:"w-full text-right",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-300 dark:border-slate-600",children:[e.jsx("th",{className:"py-1 text-left font-medium",children:"Klasse"}),e.jsxs("th",{className:"py-1 font-medium",children:["f(",l,")"]})]})}),e.jsx("tbody",{children:p.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"py-0.5 text-left font-mono",style:{color:t.color},children:t.label}),e.jsx("td",{className:"py-0.5 font-mono",children:Le(t.f(l,h))})]},t.key))})]}),y&&s==="linear"&&e.jsxs("p",{className:`text-xs ${L}`,children:["Die lineare y-Achse ist bei ",e.jsx(i,{children:"10^5"})," gekappt; die schnellsten Kurven verlassen den sichtbaren Bereich als fast senkrechte Wand. Auf der log-Skala werden sie wieder vergleichbar."]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4 text-sm",children:[e.jsx("div",{className:"flex overflow-hidden rounded-md border border-slate-300 dark:border-slate-600",children:["linear","log"].map(t=>e.jsx("button",{type:"button",onClick:()=>a(t),"aria-pressed":s===t,className:`rounded-none border-0 ${s===t?je:P}`,children:t==="linear"?"lineare Skala":"log-Skala"},t))}),e.jsxs("fieldset",{className:"flex flex-wrap gap-3 border-0 p-0",children:[e.jsx("legend",{className:"sr-only",children:"Sichtbare Komplexitätsklassen"}),_e.map(t=>e.jsxs("label",{className:"flex cursor-pointer select-none items-center gap-1",children:[e.jsx("input",{type:"checkbox",checked:g[t.key],onChange:()=>{f(j=>({...j,[t.key]:!j[t.key]})),n("")}}),e.jsx("span",{className:"font-mono",style:{color:t.color},children:t.label})]},t.key))]})]}),e.jsxs("div",{className:"max-w-md",children:[e.jsx(K,{label:"n bis",value:l,onChange:_,min:10,max:200,step:5,fmt:t=>String(t)}),e.jsx(K,{label:"Vorfaktor c",value:u,onChange:b,min:0,max:3,step:.25,accent:v.orange,fmt:t=>String(Math.round(Math.pow(10,t)))})]}),e.jsx($,{kind:F,children:w})]})}function Te(r){const n={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(n.p,{children:["Das Zählen in ",e.jsx(n.a,{href:"#sec-2.3",children:"Abschnitt 2.3"})," liefert Ausdrücke wie ",e.jsx(i,{children:"4n^3 + 16n^2 + 239"}),`: exakt, aber
unhandlich, und die Vorfaktoren hängen ohnehin von Maschine, Programmiersprache und
Zählweise ab. Wir brauchen eine Notation, die nur das Wachstumsverhalten für große `,e.jsx(i,{children:"n"}),`
festhält: die `,e.jsx(n.em,{children:"Landau-Symbole"})," (engl. ",e.jsx(n.em,{children:"big-O notation"}),")."]}),`
`,e.jsxs(n.h3,{id:"sec-klein-o-und-gross-o",children:["2.4.1 ","Klein-o und Groß-O"]}),`
`,e.jsxs(n.p,{children:["Wir vergleichen den Aufwand ",e.jsx(i,{children:"a_n"})," mit einer einfachen Vergleichsfolge ",e.jsx(i,{children:"b_n"}),` (etwa
`,e.jsx(i,{children:"n^2"})," oder ",e.jsx(i,{children:"2^n"}),") über den ",e.jsx(d,{id:"limit",children:"Grenzwert"})," des Quotienten ",e.jsx(i,{children:"a_n / b_n"}),":"]}),`
`,e.jsxs(x,{kind:"Definition",label:"2.4.1 (Landau-Symbole)",id:"env-landau-symbole",children:[e.jsxs(n.p,{children:["Seien ",e.jsx(i,{children:"a_n, b_n"})," ",e.jsx(d,{id:"sequence",children:"Folgen"}),", wobei ",e.jsx(i,{children:"b_n"}),` ab einem Index
ungleich null ist.`]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(i,{children:"a_n = o(b_n)"})," („",e.jsx(i,{children:"a_n"})," ",e.jsx(n.em,{children:"ist klein-o von"})," ",e.jsx(i,{children:"b_n"}),`"),
wenn`]}),`
`,e.jsx(c,{children:"\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = 0."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(i,{children:"a_n = O(b_n)"})," („",e.jsx(i,{children:"a_n"})," ",e.jsx(n.em,{children:"ist groß-O von"})," ",e.jsx(i,{children:"b_n"}),`"),
wenn`]}),`
`,e.jsx(c,{children:"\\limsup_{n \\to \\infty} \\left\\vert \\frac{a_n}{b_n} \\right\\vert < \\infty."}),`
`]}),`
`]})]}),`
`,e.jsx(n.p,{children:"Anschaulich heißt das:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"a_n = o(b_n)"}),": ",e.jsx(i,{children:"a_n"})," wächst ",e.jsx(n.em,{children:"langsamer"})," als ",e.jsx(i,{children:"b_n"}),`;
gegenüber `,e.jsx(i,{children:"b_n"})," wird ",e.jsx(i,{children:"a_n"})," vernachlässigbar klein."]}),`
`,e.jsxs(n.li,{children:[e.jsx(i,{children:"a_n = O(b_n)"}),": ",e.jsx(i,{children:"a_n"})," wächst ",e.jsx(n.em,{children:"höchstens so schnell"}),` wie
`,e.jsx(i,{children:"b_n"}),"; die Vergleichsfolge ",e.jsx(i,{children:"b_n"})," ist gegenüber ",e.jsx(i,{children:"a_n"}),` nicht
vernachlässigbar.`]}),`
`,e.jsxs(n.li,{children:["Zusätzlich schreiben wir ",e.jsx(i,{children:"a_n = \\Theta(b_n)"}),", falls ",e.jsx(i,{children:"a_n = O(b_n)"}),` und
`,e.jsx(i,{children:"b_n = O(a_n)"})," gilt: ",e.jsx(i,{children:"a_n"})," wächst ",e.jsx(n.em,{children:"genauso schnell"})," wie ",e.jsx(i,{children:"b_n"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:[`Bei Groß-O steht der Limes superior statt des Grenzwerts, weil der Quotient
`,e.jsx(i,{children:"a_n/b_n"})," nicht ",e.jsx(d,{id:"convergence",children:"konvergieren"}),` muss; er darf zum Beispiel
oszillieren. Die Bedingung bedeutet: Ab irgendeinem Index gilt
`,e.jsx(i,{children:"\\left\\vert a_n \\right\\vert \\le C \\cdot \\left\\vert b_n \\right\\vert"}),` für eine
Konstante `,e.jsx(i,{children:"C"}),"."]}),`
`,e.jsxs(n.h3,{id:"sec-rechenbeispiele",children:["2.4.2 ","Rechenbeispiele"]}),`
`,e.jsxs(n.p,{children:[`Eine Landau-Beziehung weisen wir meist nach, indem wir den Grenzwert des Quotienten
ausrechnen. In den drei Beispielen verfolgt `,e.jsx(i,{children:"\\cred{\\text{Rot}}"}),` die untersuchte Folge
`,e.jsx(i,{children:"\\cred{a_n}"})," und ",e.jsx(i,{children:"\\cblue{\\text{Blau}}"})," die Vergleichsfolge ",e.jsx(i,{children:"\\cblue{b_n}"}),"."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.4.2",id:"env-beispiel-2-4-3",children:[e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"(a)"})," Wir zeigen ",e.jsx(i,{children:"\\cred{3n^2 + 5n} = O(\\cblue{n^2})"}),":"]}),e.jsx(c,{children:"\\lim_{n \\to \\infty} \\frac{\\cred{3n^2 + 5n}}{\\cblue{n^2}} = \\lim_{n \\to \\infty} \\left(3 + \\frac{5}{n}\\right) = 3 < \\infty \\quimpl \\cred{3n^2 + 5n} = O(\\cblue{n^2}). \\quad \\checkmark"}),e.jsxs(n.p,{children:["Der Quotient konvergiert gegen ",e.jsx(i,{children:"3"}),`, also ist auch sein Limes superior
`,e.jsx(i,{children:"3 < \\infty"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"(b)"})," Wir zeigen ",e.jsx(i,{children:"\\cred{5n} = o(\\cblue{n^2})"}),":"]}),e.jsx(c,{children:"\\lim_{n \\to \\infty} \\frac{\\cred{5n}}{\\cblue{n^2}} = \\lim_{n \\to \\infty} \\frac{5}{n} = 0 \\quimpl \\cred{5n} = o(\\cblue{n^2}). \\quad \\checkmark"}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"(c)"})," Gilt ",e.jsx(i,{children:"\\cred{n^2} = O(\\cblue{n})"}),"? ",e.jsx(n.strong,{children:"Nein!"})]}),e.jsx(c,{children:"\\lim_{n \\to \\infty} \\frac{\\cred{n^2}}{\\cblue{n}} = \\lim_{n \\to \\infty} n = \\infty \\quad \\text{(divergiert!)} \\quimpl \\cred{n^2} \\neq O(\\cblue{n})."}),e.jsxs(n.p,{children:["Der Quotient wächst über jede Schranke hinaus; ",e.jsx(i,{children:"\\cred{n^2}"}),` wächst echt
schneller als `,e.jsx(i,{children:"\\cblue{n}"}),"."]})]}),`
`,e.jsx(ge,{title:"Limes superior, Schreibweise und Theta",children:e.jsxs(x,{kind:"Bemerkung",label:"2.4.3 (Feinheiten der Definition)",id:"env-zwei-feinheiten-der-definition",children:[e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Was ist der Limes superior?"}),` Der größte Häufungswert einer Folge, gebildet als
Grenzwert der `,e.jsx(d,{id:"supremum",children:"Suprema"}),` der Restfolgen. Anders als der Grenzwert
existiert er immer, notfalls als `,e.jsx(i,{children:"\\infty"}),`; deshalb ist die Bedingung
`,e.jsx(i,{children:"\\limsup_{n \\to \\infty} \\left\\vert a_n / b_n \\right\\vert < \\infty"}),` auch für
oszillierende Quotienten definiert.`]}),e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Das Gleichheitszeichen ist ein Notationsmissbrauch:"}),`
`,e.jsx(i,{children:"a_n = O(b_n)"})," liest man besser als „",e.jsx(i,{children:"a_n"}),` gehört zur Klasse
`,e.jsx(i,{children:"O(b_n)"}),`". Insbesondere ist die Beziehung nicht symmetrisch: Aus
`,e.jsx(i,{children:"5n = O(n^2)"})," folgt nicht ",e.jsx(i,{children:"n^2 = O(5n)"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Wozu Theta?"})," Groß-O ist nur eine obere Schranke. „Ein ",e.jsx(i,{children:"O(n^2)"}),`-Algorithmus" heißt
deshalb nicht, dass seine Laufzeit tatsächlich quadratisch wächst: Ein Sortierverfahren
mit Laufzeit `,e.jsx(i,{children:"O(n \\log n)"})," ist automatisch auch ",e.jsx(i,{children:"O(n^2)"}),", weil ",e.jsx(i,{children:"n \\log n"})," für große ",e.jsx(i,{children:"n"}),`
höchstens so groß wie `,e.jsx(i,{children:"n^2"}),` ist. Die zweite Aussage ist richtig, unterscheidet das
Verfahren aber nicht von einem tatsächlich quadratischen. `,e.jsx(i,{children:"\\Theta"}),` legt die Ordnung
von beiden Seiten fest. Im Skript genügt uns meist die obere Schranke `,e.jsx(i,{children:"O"}),`, weil sie für
Laufzeit- und Fehlerabschätzungen die entscheidende Garantie liefert.`]})]})}),`
`,e.jsxs(n.p,{children:["Meist suchen wir eine möglichst einfache Folge ",e.jsx(i,{children:"b_n"})," mit ",e.jsx(i,{children:"a_n = O(b_n)"}),", aber ",e.jsx(n.em,{children:"nicht"}),`
`,e.jsx(i,{children:"a_n = o(b_n)"}),", also eine obere Schranke, die nicht unnötig grob ist. Für ",e.jsx(i,{children:"3n^2 + 5n"}),`
ist das `,e.jsx(i,{children:"b_n = n^2"}),"; auch ",e.jsx(i,{children:"b_n = n^3"}),` wäre eine obere Schranke, aber wegen
`,e.jsx(i,{children:"3n^2 + 5n = o(n^3)"})," eine zu grobe."]}),`
`,e.jsxs(n.h3,{id:"sec-rechenregeln",children:["2.4.3 ","Rechenregeln"]}),`
`,e.jsx(n.p,{children:`Aufwandsausdrücke entstehen durch Hintereinanderausführung (Addition der Kosten) und
Verschachtelung (Multiplikation der Kosten) von Algorithmus-Bausteinen. Die
Landau-Symbole vertragen sich mit beiden Operationen, sodass wir die Grenzwertrechnung
nicht jedes Mal neu machen müssen:`}),`
`,e.jsxs(x,{kind:"Lemma",label:"2.4.4 (Rechenregeln für Landau-Symbole)",id:"env-rechenregeln-fuer-landau-symbole",children:[e.jsxs(n.p,{children:["Seien ",e.jsx(i,{children:"a_n, b_n > 0"})," Vergleichsfolgen."]}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Sei ",e.jsx(i,{children:"\\cred{f_n} = O(a_n)"})," und ",e.jsx(i,{children:"\\cgreen{g_n} = O(b_n)"}),". Dann gilt"]}),`
`,e.jsx(c,{children:"\\cred{f_n} + \\cgreen{g_n} = O(a_n + b_n) \\quad\\text{und}\\quad \\cred{f_n} \\cdot \\cgreen{g_n} = O(a_n \\cdot b_n)."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Sei ",e.jsx(i,{children:"\\cred{f_n} = O(a_n)"})," und ",e.jsx(i,{children:"\\cgreen{g_n} = o(b_n)"}),". Dann gilt"]}),`
`,e.jsx(c,{children:"\\cred{f_n} \\cdot \\cgreen{g_n} = o(a_n \\cdot b_n)."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Sei ",e.jsx(i,{children:"\\cred{f_n} = O(a_n + b_n)"})," mit ",e.jsx(i,{children:"a_n = O(b_n)"}),". Dann gilt"]}),`
`,e.jsx(c,{children:"\\cred{f_n} = O(b_n)."}),`
`]}),`
`]})]}),`
`,e.jsxs(n.p,{children:[`Die Positivität der Vergleichsfolgen setzen wir voraus, damit sich in
`,e.jsx(i,{children:"a_n + b_n"}),` nichts wegheben kann. Für Aufwandsvergleiche ist das keine
Einschränkung, denn Operationenzahlen sind positiv.`]}),`
`,e.jsx(ge,{title:"Warum die Rechenregeln gelten",children:e.jsxs(ke,{children:[e.jsxs(M,{why:e.jsxs(e.Fragment,{children:["Dreiecksungleichung; danach verkleinern wir die Nenner (",e.jsx(i,{children:"a_n + b_n \\ge a_n"})," bzw. ",e.jsx(i,{children:"\\ge b_n"}),", da beide Folgen positiv sind), was die Brüche höchstens vergrößert"]}),children:[e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Regel 1, Addition."})," Wir schätzen den Quotienten ab:"]}),e.jsx(c,{children:"\\frac{\\left\\vert \\cred{f_n} + \\cgreen{g_n} \\right\\vert}{a_n + b_n} \\le \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n + b_n} + \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{a_n + b_n} \\le \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n} + \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{b_n}."})]}),e.jsx(M,{why:e.jsx(e.Fragment,{children:"beide Summanden haben nach Voraussetzung endlichen Limes superior, und der Limes superior einer Summe ist höchstens die Summe der Limites superiores"}),children:e.jsx(c,{children:"\\limsup_{n \\to \\infty} \\frac{\\left\\vert \\cred{f_n} + \\cgreen{g_n} \\right\\vert}{a_n + b_n} < \\infty \\quimpl \\cred{f_n} + \\cgreen{g_n} = O(a_n + b_n)."})}),e.jsxs(M,{why:e.jsx(e.Fragment,{children:"Betrag und Bruch faktorisieren, beide Faktoren kennen wir schon"}),children:[e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Regel 1, Multiplikation, und Regel 2."})," Der Quotient zerfällt in ein Produkt:"]}),e.jsx(c,{children:"\\frac{\\left\\vert \\cred{f_n} \\cdot \\cgreen{g_n} \\right\\vert}{a_n \\cdot b_n} = \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n} \\cdot \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{b_n}."})]}),e.jsx(M,{why:e.jsx(e.Fragment,{children:"das Produkt zweier beschränkter Folgen ist beschränkt; das Produkt einer beschränkten Folge mit einer Nullfolge ist eine Nullfolge"}),children:e.jsxs(n.p,{children:["Der erste Faktor ist beschränkt (",e.jsx(i,{children:"\\cred{f_n} = O(a_n)"}),`). Ist
`,e.jsx(i,{children:"\\cgreen{g_n} = O(b_n)"}),`, so ist auch der zweite Faktor beschränkt und das
Produkt bleibt beschränkt: `,e.jsx(i,{children:"\\cred{f_n} \\cgreen{g_n} = O(a_n b_n)"}),`. Ist
dagegen `,e.jsx(i,{children:"\\cgreen{g_n} = o(b_n)"}),`, so konvergiert der zweite Faktor gegen
`,e.jsx(i,{children:"0"}),` und damit das ganze Produkt:
`,e.jsx(i,{children:"\\cred{f_n} \\cgreen{g_n} = o(a_n b_n)"}),"."]})}),e.jsxs(M,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"a_n = O(b_n)"})," macht den ersten Summanden beschränkt; die Konstante ",e.jsx(i,{children:"1"})," ist es sowieso"]}),children:[e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Regel 3."})," Zuerst zeigen wir ",e.jsx(i,{children:"a_n + b_n = O(b_n)"}),":"]}),e.jsx(c,{children:"\\frac{a_n + b_n}{b_n} = \\frac{a_n}{b_n} + 1 = O(1)."})]}),e.jsx(M,{why:e.jsxs(e.Fragment,{children:["Produkt zweier beschränkter Folgen; das ist gerade Regel 1 (Multiplikation) mit ",e.jsx(i,{children:"b_n \\cdot 1"})," als Vergleichsfolge"]}),children:e.jsx(c,{children:"\\frac{\\left\\vert \\cred{f_n} \\right\\vert}{b_n} = \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n + b_n} \\cdot \\frac{a_n + b_n}{b_n} \\quimpl \\cred{f_n} = O(b_n)."})})]})}),`
`,e.jsxs(n.h3,{id:"sec-anwendung-auf-den-dominanten-term",children:["2.4.4 ","Anwendung: auf den dominanten Term reduzieren"]}),`
`,e.jsxs(n.p,{children:["Wieder verfolgt ",e.jsx(i,{children:"\\cred{\\text{Rot}}"}),` die
Folge `,e.jsx(i,{children:"\\cred{f_n}"})," und ",e.jsx(i,{children:"\\cgreen{\\text{Grün}}"}),` die Folge
`,e.jsx(i,{children:"\\cgreen{g_n}"}),"."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.4.5 (Addition und Multiplikation)",id:"env-addition-und-multiplikation",children:[e.jsxs(n.p,{children:["Gegeben seien ",e.jsx(i,{children:"\\cred{f_n} = 3n^2 = O(n^2)"}),` und
`,e.jsx(i,{children:"\\cgreen{g_n} = 5n = O(n)"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Addition"})," (Regel 1, dann Regel 3):"]}),e.jsx(c,{children:"\\cred{f_n} + \\cgreen{g_n} = \\cred{3n^2} + \\cgreen{5n} = O(n^2 + n) = O(n^2), \\quad \\text{denn } n = O(n^2)."}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Multiplikation"})," (Regel 1):"]}),e.jsx(c,{children:"\\cred{f_n} \\cdot \\cgreen{g_n} = \\cred{3n^2} \\cdot \\cgreen{5n} = 15n^3 = O(n^2 \\cdot n) = O(n^3)."})]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.4.6 (Vereinfachung eines Aufwandsausdrucks)",id:"env-vereinfachung-eines-aufwandsausdrucks",children:[e.jsxs(n.p,{children:["Ein Algorithmus benötige ",e.jsx(i,{children:"\\cred{4n^3} + 16n^2 + 239"}),` Operationen. Rot
verfolgt jetzt den am schnellsten wachsenden Term:`]}),e.jsx(c,{children:"\\cred{4n^3} + 16n^2 + 239 = O(\\cred{n^3} + n^2 + 1) = O(\\cred{n^3}),"}),e.jsxs(n.p,{children:["denn ",e.jsx(i,{children:"n^2 = O(n^3)"})," und ",e.jsx(i,{children:"1 = O(n^3)"}),`, zweimal Regel 3 angewandt.
Dass auch der Vorfaktor `,e.jsx(i,{children:"4"}),` verschwindet, liegt an der Definition: Für jede
Konstante `,e.jsx(i,{children:"c > 0"}),` ist
`,e.jsx(i,{children:"\\limsup_{n \\to \\infty} \\left\\vert c \\, b_n / b_n \\right\\vert = c < \\infty"}),`,
also `,e.jsx(i,{children:"c \\cdot b_n = O(b_n)"}),"."]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Wir können komplexe Aufwandsausdrücke also auf ihren dominanten Term reduzieren."}),`
Deshalb sprechen wir kurz von einem „`,e.jsx(i,{children:"O(n^3)"}),`-Algorithmus". Die üblichen
Komplexitätsklassen bilden dabei eine strikte Hierarchie, jede ist klein-o der
nächsten:`]}),`
`,e.jsx(c,{children:"\\log n \\,,\\quad n \\,,\\quad n \\log n \\,,\\quad n^2 \\,,\\quad n^3 \\,,\\quad 2^n."}),`
`,e.jsxs(n.p,{children:["Ab welchem ",e.jsx(i,{children:"n"}),` überholt ein schneller wachsender Term einen noch so großen
Vorfaktor? Das zeigt der Explorer, wahlweise auf linearer oder
`,e.jsx(d,{id:"logarithm",children:"logarithmischer"})," Skala."]}),`
`,e.jsxs(ce,{title:"Wachstumsraten-Explorer: Klassen und Vorfaktoren",children:[e.jsx(mn,{}),e.jsxs(n.p,{children:["Ohne Vorfaktor überholt ",e.jsx(i,{children:"2^n"})," die Kurve ",e.jsx(i,{children:"n^2"})," endgültig ab ",e.jsx(i,{children:"n = 5"}),`, mit dem
Vorfaktor `,e.jsx(i,{children:"c = 1000"})," erst ab ",e.jsx(i,{children:"n = 19"}),": Der Faktor ",e.jsx(i,{children:"1000"}),` verschiebt die Schwelle nur um
vierzehn Schritte. Bei den polynomialen Klassen gilt `,e.jsx(i,{children:"n^3 > c\\,n^2"})," ab ",e.jsx(i,{children:"n > c"}),`. Das ist
die praktische Bedeutung von `,e.jsx(i,{children:"c\\,n^2 = O(n^2)"})," und ",e.jsx(i,{children:"n^2 = o(n^3)"}),`: Vorfaktoren
verschieben die Schwelle, die Reihenfolge drehen sie nie um.`]})]}),`
`,e.jsxs(n.h3,{id:"sec-landau-selbsttest",children:["2.4.5 ","Selbsttest"]}),`
`,e.jsx(n.p,{children:"Welche Aussagen sind wahr? Den Quotienten bilden, dann aufklappen."}),`
`,e.jsx(oe,{nr:1,frage:e.jsx(i,{children:"2n = O(n^2)"}),children:e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Wahr."}),`
`,e.jsx(i,{children:"\\lim_{n \\to \\infty} \\frac{2n}{n^2} = \\lim_{n \\to \\infty} \\frac{2}{n} = 0 < \\infty"}),`;
es gilt sogar die stärkere Aussage `,e.jsx(i,{children:"2n = o(n^2)"}),`. Die informativere obere
Schranke ist `,e.jsx(i,{children:"2n = O(n)"}),"."]})}),`
`,e.jsx(oe,{nr:2,frage:e.jsx(i,{children:"7/n = o(1)"}),children:e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Wahr."})," Mit ",e.jsx(i,{children:"b_n = 1"}),` ist
`,e.jsx(i,{children:"\\lim_{n \\to \\infty} \\frac{7/n}{1} = 0"}),`. Landau-Symbole beschreiben also auch, wie
schnell Nullfolgen abklingen; so klassifizieren wir später Approximations- und
Rundungsfehler.`]})}),`
`,e.jsx(oe,{nr:3,frage:e.jsx(i,{children:"8n^3 + 7n^2 + n = O(n)"}),children:e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Falsch."}),`
`,e.jsx(i,{children:"\\lim_{n \\to \\infty} \\frac{8n^3 + 7n^2 + n}{n} = \\lim_{n \\to \\infty} \\left(8n^2 + 7n + 1\\right) = \\infty"}),`;
der Quotient divergiert. Richtig wäre `,e.jsx(i,{children:"O(n^3)"}),`: der dominante Term
entscheidet (`,e.jsx(n.a,{href:"#env-vereinfachung-eines-aufwandsausdrucks",children:"Beispiel 2.4.6"}),")."]})}),`
`,e.jsx(oe,{nr:4,frage:e.jsx(i,{children:"n^{-3} + n^{-2} = O(n^{-2})"}),children:e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Wahr."}),`
`,e.jsx(i,{children:"\\lim_{n \\to \\infty} \\frac{n^{-3} + n^{-2}}{n^{-2}} = \\lim_{n \\to \\infty} \\left(\\frac{1}{n} + 1\\right) = 1 < \\infty. \\quad \\checkmark"}),`
Auch `,e.jsx(i,{children:"n^{-3} + n^{-2} = o(1)"}),` wäre richtig (die Folge ist eine Nullfolge),
aber `,e.jsx(i,{children:"O(n^{-2})"})," ist schärfer: Die Aussage sagt auch, ",e.jsx(n.em,{children:"wie schnell"}),` die Folge
verschwindet.`]})}),`
`,e.jsxs(de,{children:[e.jsxs(J,{loesung:15,toleranz:0,children:[e.jsxs(n.p,{children:["Setzen wir im Explorer oben den Vorfaktor auf ",e.jsx(i,{children:"c = 100"})," und schalten ",e.jsx(i,{children:"c \\cdot n^2"}),` und
`,e.jsx(i,{children:"2^n"})," an: Ab welchem ",e.jsx(i,{children:"n"})," gilt endgültig ",e.jsx(i,{children:"2^n > c \\cdot n^2"}),"?"]}),e.jsxs(n.p,{children:["Von Hand nachgerechnet: ",e.jsx(i,{children:"2^{14} = 16\\,384"})," liegt noch unter ",e.jsx(i,{children:"100 \\cdot 14^2 = 19\\,600"}),`, aber
`,e.jsx(i,{children:"2^{15} = 32\\,768"})," liegt über ",e.jsx(i,{children:"100 \\cdot 15^2 = 22\\,500"}),`, und danach bleibt die
Exponentialfunktion vorn.`]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(n.p,{children:["Aus ",e.jsx(i,{children:"a_n = O(b_n)"})," folgt ",e.jsx(i,{children:"b_n = O(a_n)"}),"."]}),e.jsxs(n.p,{children:["Das Gleichheitszeichen in ",e.jsx(i,{children:"a_n = O(b_n)"}),` bezeichnet keine symmetrische
Beziehung: `,e.jsx(i,{children:"5n = O(n^2)"})," gilt, ",e.jsx(i,{children:"n^2 = O(5n)"})," nicht."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(n.p,{children:["Gilt ",e.jsx(i,{children:"a_n = o(b_n)"}),", so gilt auch ",e.jsx(i,{children:"a_n = O(b_n)"}),"."]}),e.jsxs(n.p,{children:["Konvergiert der Quotient gegen ",e.jsx(i,{children:"0"}),`, so ist er insbesondere beschränkt: Klein-o ist die
stärkere Aussage.`]})]})]}),`
`,e.jsx(n.p,{children:e.jsxs(n.em,{children:[`Vertiefung: Heath §1.1 (Aufwand und Genauigkeit numerischer Verfahren); Cormen,
Leiserson, Rivest & Stein, `,e.jsx(n.em,{children:"Introduction to Algorithms"}),`, Kap. 3
(asymptotische Notation, einschließlich scharfer Schranken).`]})})]})}function gn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Te,{...r})}):Te(r)}const bn=(1+Math.sqrt(5))/2,ne=v.rot,xe=v.blau,H=10,fn="⁰¹²³⁴⁵⁶⁷⁸⁹";function pn(r){return String(r).split("").map(n=>fn[Number(n)]).join("")}function Ae(r){const n=typeof r=="bigint"?r.toString():String(Math.round(r));if(n.length<=6)return Number(n).toLocaleString("de-DE");const s=n.length-1;return`${(Number(n.slice(0,4))/1e3).toFixed(1).replace(".",",")} · 10${pn(s)}`}function We(r){const n=r/1e9;if(n<1e-6)return`${Math.max(1,Math.round(n*1e9))} ns`;if(n<.001)return`${Math.round(n*1e6)} µs`;if(n<1)return`${(n*1e3).toFixed(1).replace(".",",")} ms`;if(n<120)return`${n.toFixed(1).replace(".",",")} s`;if(n<7200)return`${(n/60).toFixed(0)} min`;if(n<2*86400)return`${(n/3600).toFixed(1).replace(".",",")} h`;const s=n/3156e4;return s<1?`${(n/86400).toFixed(0)} Tage`:`${Ae(Math.round(s))} Jahre`}function kn(){const[r,n]=k.useState(30);return e.jsx(le,{variante:"auswahl",frage:"Die roten Punkte liegen auf einer Geraden. Auf welcher? Erst tippen, dann auflösen.",optionen:[{id:"quad",text:"auf der von n²"},{id:"zwei",text:"auf der von 2ⁿ"},{id:"phi",text:"auf einer dazwischen"}],loesung:"phi",children:({aufgeloest:s})=>e.jsx(wn,{nMax:r,setNMax:n,aufgeloest:s})})}function wn({nMax:r,setNMax:n,aufgeloest:s}){const{T:a,TExakt:l,markers:_,series:u,yMax:b}=k.useMemo(()=>{const o=[1n,1n];for(let t=2;t<=r;t++)o[t]=1n+o[t-1]+o[t-2];const h=o.map(Number),p=t=>4*t-6,R=Math.log10(2),m=Math.log10(bn),S=Math.log10(h[H])-H*R,A=Math.log10(h[H])-H*m,D=p(H)/H,y=[],G=r>40?2:1;for(let t=r;t>=2;t-=G)y.push({x:t,y:Math.log10(h[t]),color:ne}),y.push({x:t,y:Math.log10(p(t)),color:xe});const w=[{f:t=>S+t*R,color:ne,dash:[3,4],label:"Schranke c · 2ⁿ"},...s?[{f:t=>A+t*m,color:ne,dash:[12,6],label:"scharf: c · φⁿ"}]:[],{f:t=>t>0?Math.log10(D*t):NaN,color:xe,dash:[7,4],label:"Vorhersage c · n"}],F=Math.max(S+r*R,Math.log10(h[r]))+.5;return{T:h,TExakt:o,markers:y,series:w,yMax:F}},[r,s]),g=l[r],f=4*r-6;return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(te,{children:["Schieben wir ",e.jsx("span",{className:"font-mono",children:"n"})," nach oben und vergleichen die roten Punkte mit den gestrichelten Vorhersagen."]}),e.jsx(me,{xLabel:"n",yLabel:"log₁₀(Schritte)",series:u,markers:_,xDomain:[0,r+1],yDomain:[0,b],width:440,height:300,ariaLabel:`Logarithmische Darstellung der gezählten Schrittzahlen bis n gleich ${r}; die roten Punkte der naiven Rekursion liegen auf einer Geraden unterhalb der gestrichelten 2-hoch-n-Geraden, die blauen Punkte der Iteration bleiben nahe der Grundlinie.`}),e.jsx(K,{label:"n (Größe)",value:r,onChange:o=>n(Math.round(o)),min:10,max:80,step:1,fmt:o=>String(Math.round(o))}),e.jsxs("p",{className:`max-w-prose text-xs ${L}`,children:[e.jsx("span",{style:{color:ne},children:"●"})," gezählte Aufrufe der naiven Rekursion  ",e.jsx("span",{style:{color:xe},children:"●"})," gezählte Operationen der Iteration   gestrichelt: die Landau-Vorhersagen, bei ",e.jsx("span",{className:"font-mono",children:"n = 10"})," an die Zählungen angeheftet."]}),e.jsxs("div",{className:`max-w-prose p-3 text-sm ${T}`,children:["Bei ",e.jsxs("span",{className:"font-mono",children:["n = ",r]}),": naive Rekursion"," ",e.jsx("span",{className:"font-semibold",style:{color:ne},children:Ae(g)})," ","Aufrufe (Modellrechnung bei 10⁹ Schritten/s: ≈ ",We(Number(g)),"), iterative Variante"," ",e.jsx("span",{className:"font-semibold",style:{color:xe},children:Ae(f)})," ","Operationen (≈ ",We(f),")."]}),s?e.jsxs($,{kind:"warn",children:["Die roten Punkte liegen exakt auf einer Geraden, aber auf der flacheren mit Steigung"," ",e.jsx("span",{className:"font-mono",children:"log₁₀ φ ≈ 0,209"}),", nicht auf der 2ⁿ-Geraden mit Steigung ",e.jsx("span",{className:"font-mono",children:"log₁₀ 2 ≈ 0,301"}),". Die Schranke"," ",e.jsx("span",{className:"font-mono",children:"O(2ⁿ)"})," aus ",z("satz:exponentielle-laufzeit-der-naiven")," ist also korrekt, aber nicht scharf; das tatsächliche Wachstum hat die Basis"," ",e.jsx("span",{className:"font-mono",children:"φ ≈ 1,618"})," (",z("bemerkung:wie-schlimm-ist-es-wirklich"),"). Die blauen Punkte bleiben auf dieser Skala fast am Boden: Lineares Wachstum ist hier praktisch unsichtbar."]}):e.jsx($,{kind:"neutral",children:"Beide Punktfolgen liegen sauber auf Geraden, die rote steigt deutlich steiler an. Welche Steigung sie hat, entscheidet sich am Vergleich mit den gestrichelten Vorhersagen."})]})}const Ke={color:v.rot,fontWeight:600};function vn(){return e.jsxs("pre",{className:"max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-xs leading-relaxed dark:bg-slate-900/60",role:"img","aria-label":"Aufrufbaum von fib_rek(5) mit 15 Knoten; der Teilbaum fib_rek(3) taucht zweimal auf und ist beide Male rot markiert.",children:[`fib_rek(5)
├── fib_rek(4)
│   ├── `,e.jsx("span",{style:Ke,children:"fib_rek(3)"}),`          ← 1. Berechnung von F(3)
│   │   ├── fib_rek(2)
│   │   │   ├── fib_rek(1)
│   │   │   └── fib_rek(0)
│   │   └── fib_rek(1)
│   └── fib_rek(2)
│       ├── fib_rek(1)
│       └── fib_rek(0)
└── `,e.jsx("span",{style:Ke,children:"fib_rek(3)"}),`              ← 2. Berechnung: komplett doppelte Arbeit
    ├── fib_rek(2)
    │   ├── fib_rek(1)
    │   └── fib_rek(0)
    └── fib_rek(1)`]})}function Ge(r){const n={a:"a",code:"code",em:"em",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Mit den Werkzeugen aus ",e.jsx(n.a,{href:"#sec-2.3",children:"Abschnitt 2.3"})," und ",e.jsx(n.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),` machen wir jetzt präzise, wie
verschieden die beiden Fibonacci-Varianten aus `,e.jsx(n.a,{href:"#sec-2.2",children:"Abschnitt 2.2"}),` sind. Es geht nicht um
einen konstanten Faktor, sondern um `,e.jsx(n.em,{children:"linear gegen exponentiell"}),"."]}),`
`,e.jsxs(n.h3,{id:"sec-die-iterative-variante-linearer-aufwand",children:["2.5.1 ","Die iterative Variante: linearer Aufwand"]}),`
`,e.jsxs(n.p,{children:["Die iterative Variante, die R-Funktion ",e.jsx(n.code,{children:"fibonacci"})," aus ",e.jsx(n.a,{href:"#sec-vom-algorithmus-zum-programm",children:"Abschnitt 2.2.2"}),`,
legt einen Ergebnisvektor der Länge `,e.jsx(i,{children:"n"})," an, setzt ",e.jsx(i,{children:"x_2 = 1"}),` und füllt in einer Schleife
jeden weiteren Eintrag als Summe seiner beiden Vorgänger:
`,e.jsx(i,{children:"x_{i+1} = x_i + x_{i-1}"})," für ",e.jsx(i,{children:"i = 2, \\dots, n-1"}),`. Wir zählen die Schritte wie beim
`,e.jsx(d,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"}),"."]}),`
`,e.jsx(x,{kind:"Satz",label:"2.5.1 (Komplexität der iterativen Variante)",id:"env-komplexitaet-der-iterativen-variante",children:e.jsxs(n.p,{children:["Der iterative Fibonacci-Algorithmus berechnet die ersten ",e.jsx(i,{children:"n"}),` Fibonacci-Zahlen mit
Zeitkomplexität `,e.jsx(i,{children:"\\cblue{O(n)}"})," und Speicherkomplexität ",e.jsx(i,{children:"O(n)"}),"."]})}),`
`,e.jsxs(ke,{children:[e.jsx(M,{why:e.jsxs(e.Fragment,{children:["das Anlegen des Vektors schreibt ",e.jsx(i,{children:"n"})," Nullen, eine Schreiboperation pro Eintrag"]}),children:e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Initialisierung:"})," ",e.jsx(i,{children:"n"})," Operationen."]})}),e.jsx(M,{why:e.jsxs(e.Fragment,{children:["die Schleife durchläuft ",e.jsx(i,{children:"i = 2, \\dots, n-1"}),", also ",e.jsx(i,{children:"n-2"})," Durchläufe; pro Durchlauf zählen wir 1 Addition, 1 Zuweisung und 1 Indexrechnung; ob man die Indexrechnungen mitzählt, ist Konvention (",e.jsx(n.a,{href:"#env-zaehlen-ist-konvention-die-ordnung-nicht",children:"Bemerkung 2.5.2"}),")"]}),children:e.jsx(c,{children:"\\text{Schleife: } (n-2) \\cdot 3 \\text{ Operationen.}"})}),e.jsx(M,{why:e.jsxs(e.Fragment,{children:["Summen- und Dominanzregel aus ",e.jsx(n.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),": mit ",e.jsx(i,{children:"n = O(n)"})," und ",e.jsx(i,{children:"1 = O(n)"})," ist ",e.jsx(i,{children:"O(n) + O(n) + O(1) = O(n)"}),"; die Konstante ",e.jsx(i,{children:"c"})," deckt Funktionsaufruf und die beiden ",e.jsx(i,{children:"\\texttt{if}"}),"-Abfragen ab"]}),children:e.jsx(c,{children:"\\cblue{a_n} = n + 3\\,(n-2) + c = 4n + (c - 6) \\quimpl \\cblue{a_n = O(n)}."})}),e.jsx(M,{why:e.jsxs(e.Fragment,{children:["gespeichert werden der Vektor ",e.jsx(i,{children:"\\bx"})," mit ",e.jsx(i,{children:"n"})," Einträgen und konstant viele Hilfsgrößen (",e.jsx(i,{children:"n"}),", Laufindex ",e.jsx(i,{children:"i"}),")"]}),children:e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Speicher:"})," ",e.jsx(i,{children:"n + O(1) = O(n)"})," Speicherzellen."]})})]}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.5.2 (Zählen ist Konvention, die Ordnung nicht)",id:"env-zaehlen-ist-konvention-die-ordnung-nicht",children:e.jsxs(n.p,{children:[`Ob wir pro Schleifendurchlauf 3, 5 oder 10 Elementaroperationen ansetzen, ändert am
Ergebnis nichts: Jede konstante Zahl von Operationen pro Durchlauf liefert einen
Gesamtaufwand der Form `,e.jsx(i,{children:"c_1 n + c_2"}),", und der ist immer ",e.jsx(i,{children:"\\cblue{O(n)}"}),`. Die
Landau-Notation macht die Analyse unabhängig von solchen Zählkonventionen. Schneller als
linear geht es für dieses Problem nicht, denn schon das Hinschreiben der `,e.jsx(i,{children:"n"}),`
Ergebniszahlen kostet `,e.jsx(i,{children:"n"})," Schritte: Die iterative Variante ist ordnungsoptimal."]})}),`
`,e.jsxs(n.h3,{id:"sec-die-naive-rekursion-exponentieller",children:["2.5.2 ","Die naive Rekursion: exponentieller Aufwand"]}),`
`,e.jsxs(n.p,{children:[`Die zweite Variante übersetzt die Rekursionsformel wörtlich in Code:
`,e.jsx(i,{children:"\\texttt{fib\\_rek}(n)"})," gibt für ",e.jsx(i,{children:"n \\le 1"})," direkt ",e.jsx(i,{children:"n"})," zurück, ruft sich sonst für ",e.jsx(i,{children:"n-1"}),`
und `,e.jsx(i,{children:"n-2"})," selbst auf und addiert die Ergebnisse:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-r",children:`fib_rek <- function(n) {
  if (n <= 1) {
    return(n)
  }
  return(fib_rek(n - 1) + fib_rek(n - 2))
}
`})}),`
`,e.jsx(x,{kind:"Bemerkung",label:"2.5.3 (Was die Rekursion berechnet)",id:"env-was-wird-hier-eigentlich-berechnet",children:e.jsxs(n.p,{children:[e.jsx(i,{children:"\\texttt{fib\\_rek}(n)"})," berechnet nur eine ",e.jsx(n.em,{children:"einzelne"})," Fibonacci-Zahl ",e.jsx(i,{children:"F_n"}),` (mit der
Zählung `,e.jsx(i,{children:"F_0 = 0"}),", ",e.jsx(i,{children:"F_1 = 1"}),", ",e.jsx(i,{children:"F_n = F_{n-1} + F_{n-2}"}),`), nicht den ganzen Vektor der
ersten `,e.jsx(i,{children:"n"})," Zahlen; in der Notation aus ",e.jsx(n.a,{href:"#sec-2.2",children:"Abschnitt 2.2"})," gilt ",e.jsx(i,{children:"F_n = x_{n+1}"}),`. Das macht
den Vergleich nicht unfair, im Gegenteil: Die Rekursion braucht schon für `,e.jsx(n.em,{children:"eine"}),` Zahl
exponentiell viele Schritte, während die Iteration `,e.jsx(n.em,{children:"alle"})," ersten ",e.jsx(i,{children:"n"}),` Zahlen in
`,e.jsx(i,{children:"\\cblue{O(n)}"})," liefert."]})}),`
`,e.jsxs(n.p,{children:[`Außer den beiden rekursiven Aufrufen passiert in einem Aufruf von
`,e.jsx(i,{children:"\\texttt{fib\\_rek}(n)"}),` nur konstant viel (ein Vergleich, eine Addition). Als
Aufwandsmaß zählen wir deshalb die `,e.jsx(n.em,{children:"Funktionsaufrufe"}),": ",e.jsx(i,{children:"\\cred{T(n)}"}),` sei ihre
Gesamtzahl, den Startaufruf mitgezählt. Diese `,e.jsx(d,{id:"sequence",children:"Folge"}),` erbt die
Fibonacci-Struktur des Algorithmus:`]}),`
`,e.jsxs(x,{kind:"Lemma",label:"2.5.4 (Rekurrenz der Aufrufzahl)",id:"env-rekurrenz-der-aufrufzahl",children:[e.jsxs(n.p,{children:["Die Aufrufzahl ",e.jsx(i,{children:"\\cred{T(n)}"})," von ",e.jsx(i,{children:"\\texttt{fib\\_rek}(n)"})," erfüllt"]}),e.jsx(c,{children:"\\cred{T(0)} = \\cred{T(1)} = 1, \\qquad \\cred{T(n)} = 1 + \\cred{T(n-1)} + \\cred{T(n-2)} \\quad (n \\ge 2)."})]}),`
`,e.jsxs(n.p,{children:["Denn für ",e.jsx(i,{children:"n \\le 1"})," kehrt die Funktion sofort zurück, und für ",e.jsx(i,{children:"n \\ge 2"}),` besteht der
Aufrufbaum aus der Wurzel und den vollständigen Teilbäumen von
`,e.jsx(i,{children:"\\texttt{fib\\_rek}(n-1)"})," und ",e.jsx(i,{children:"\\texttt{fib\\_rek}(n-2)"}),"."]}),`
`,e.jsxs(x,{kind:"Beispiel",label:"2.5.5 (Der Aufrufbaum für n = 5)",id:"env-der-aufrufbaum-fuer-n-5",children:[e.jsxs(n.p,{children:["Der Aufruf ",e.jsx(i,{children:"\\texttt{fib\\_rek}(5)"}),` erzeugt den folgenden Baum (jeder Knoten ist ein
Funktionsaufruf):`]}),e.jsx(vn,{}),e.jsxs(n.p,{children:["Zählen wir nach: ",e.jsx(i,{children:"F_5"})," und ",e.jsx(i,{children:"F_4"})," werden je einmal berechnet, ",e.jsx(i,{children:"F_3"})," aber ",e.jsx(i,{children:"\\cred{2}"}),`-mal,
`,e.jsx(i,{children:"F_2"})," schon ",e.jsx(i,{children:"\\cred{3}"}),"-mal, ",e.jsx(i,{children:"F_1"})," sogar ",e.jsx(i,{children:"\\cred{5}"}),"-mal und ",e.jsx(i,{children:"F_0"})," noch ",e.jsx(i,{children:"\\cred{3}"}),`-mal,
zusammen `,e.jsx(i,{children:"1 + 1 + 2 + 3 + 5 + 3 = \\cred{15}"}),` Aufrufe. Das passt zum Lemma: Aus
`,e.jsx(i,{children:"\\cred{T(2)} = 3"})," und ",e.jsx(i,{children:"\\cred{T(3)} = 1 + 3 + 1 = 5"})," folgt ",e.jsx(i,{children:"\\cred{T(4)} = 1 + 5 + 3 = 9"}),`
und `,e.jsx(i,{children:"\\cred{T(5)} = 1 + 9 + 5 = \\cred{15}"}),". ",e.jsx(i,{children:"\\checkmark"})]}),e.jsxs(n.p,{children:["Rot markiert ist die Ursache: Der komplette Teilbaum unter ",e.jsx(i,{children:"\\texttt{fib\\_rek}(3)"}),`
wird zweimal durchgerechnet, weil die Rekursion keine Zwischenergebnisse aufbewahrt.
Bei größerem `,e.jsx(i,{children:"n"}),` vervielfachen sich solche Wiederholungen. Die iterative Variante
berechnet jede Zahl genau einmal.`]})]}),`
`,e.jsxs(n.p,{children:[`Allgemein erzeugt jeder Aufruf bis zu 2 weitere Aufrufe, diese wieder je 2, und so fort
über bis zu `,e.jsx(i,{children:"n"})," Ebenen, insgesamt höchstens ",e.jsx(i,{children:"1 + 2 + 4 + \\dots + 2^n"}),` Aufrufe, also
`,e.jsx(i,{children:"O(2^n)"}),`. Der folgende Satz macht das
präzise und zeigt auch die Gegenrichtung: Das Wachstum ist tatsächlich exponentiell und
nicht nur nach oben durch eine Exponentialfunktion beschränkt.`]}),`
`,e.jsxs(x,{kind:"Satz",label:"2.5.6 (Exponentielle Laufzeit der naiven Rekursion)",id:"env-exponentielle-laufzeit-der-naiven",children:[e.jsxs(n.p,{children:["Für alle ",e.jsx(i,{children:"n \\ge 0"})," gilt"]}),e.jsx(c,{children:"\\left(\\sqrt{2}\\right)^{n-1} \\;\\le\\; \\cred{T(n)} \\;\\le\\; 2^{n+1} - 1."}),e.jsxs(n.p,{children:["Insbesondere ist ",e.jsx(i,{children:"\\cred{T(n)} = O(2^n)"}),", und für jedes feste ",e.jsx(i,{children:"k \\in \\N"}),` gilt
`,e.jsx(i,{children:"n^k = o\\left(\\cred{T(n)}\\right)"}),`: Die Aufrufzahl wächst exponentiell und überholt jedes
Polynom. Die Speicherkomplexität ist dagegen nur `,e.jsx(i,{children:"O(n)"}),"."]})]}),`
`,e.jsxs(n.p,{children:[`Der Speicherbedarf bleibt klein, weil der Aufrufbaum nie ganz gleichzeitig gespeichert
wird: „Offen" ist immer nur der Pfad von der Wurzel zum aktuellen Aufruf, und der ist
höchstens `,e.jsx(i,{children:"n"})," Aufrufe lang. Der Aufruf-Stapel (call stack) braucht also ",e.jsx(i,{children:"O(n)"}),`
Speicherzellen.`]}),`
`,e.jsx(ge,{title:"Beweis der Schranken für die Aufrufzahl",children:e.jsxs(ke,{children:[e.jsx(M,{why:e.jsxs(e.Fragment,{children:["Induktionsanfang: ",e.jsx(i,{children:"\\cred{T(0)} = \\cred{T(1)} = 1"})," und ",e.jsx(i,{children:"2^1 - 1 = 1"}),", ",e.jsx(i,{children:"2^2 - 1 = 3"})]}),children:e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Obere Schranke"}),", per vollständiger Induktion: Für ",e.jsx(i,{children:"n \\le 1"}),` gilt
`,e.jsx(i,{children:"\\cred{T(n)} \\le 2^{n+1} - 1"}),"."]})}),e.jsx(M,{why:e.jsxs(e.Fragment,{children:["Rekurrenz aus ",e.jsx(d,{id:"env:rekurrenz-der-aufrufzahl",href:"#env-rekurrenz-der-aufrufzahl",children:"Lemma 2.5.4"}),", dann Induktionsvoraussetzung für ",e.jsx(i,{children:"n-1"})," und ",e.jsx(i,{children:"n-2"})," einsetzen; zuletzt ",e.jsx(i,{children:"2^n + 2^{n-1} = 3 \\cdot 2^{n-1} \\le 4 \\cdot 2^{n-1} = 2^{n+1}"})]}),children:e.jsx(c,{children:"\\cred{T(n)} = 1 + \\cred{T(n-1)} + \\cred{T(n-2)} \\le 1 + \\left(2^{n} - 1\\right) + \\left(2^{n-1} - 1\\right) = 2^n + 2^{n-1} - 1 \\le 2^{n+1} - 1."})}),e.jsx(M,{why:e.jsxs(e.Fragment,{children:["Definition von ",e.jsx(i,{children:"O"})," aus ",e.jsx(n.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),": ",e.jsx(i,{children:"\\cred{T(n)}/2^n \\le 2"})," für alle ",e.jsx(i,{children:"n"}),", der Limes superior ist also endlich"]}),children:e.jsx(c,{children:"\\cred{T(n)} = O(2^n)."})}),e.jsxs(M,{why:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"\\cred{T}"})," ist monoton wachsend (in der Rekurrenz kommt zu ",e.jsx(i,{children:"\\cred{T(n-1)}"})," nur Positives hinzu), also ",e.jsx(i,{children:"\\cred{T(n-1)} \\ge \\cred{T(n-2)}"})]}),children:[e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Untere Schranke:"})," Für ",e.jsx(i,{children:"n \\ge 2"})," ist"]}),e.jsx(c,{children:"\\cred{T(n)} \\ge \\cred{T(n-1)} + \\cred{T(n-2)} \\ge 2\\,\\cred{T(n-2)}."})]}),e.jsx(M,{why:e.jsxs(e.Fragment,{children:["die Ungleichung ",e.jsx(i,{children:"\\lfloor n/2 \\rfloor"}),"-mal anwenden; bei jedem Schritt verdoppelt sich der Faktor wie bei einer ",e.jsx(d,{id:"geometric-series",children:"geometrischen Folge"}),", bis das Argument ",e.jsx(i,{children:"0"})," oder ",e.jsx(i,{children:"1"})," erreicht (dort ist ",e.jsx(i,{children:"\\cred{T} = 1"}),"); schließlich ",e.jsx(i,{children:"\\lfloor n/2 \\rfloor \\ge (n-1)/2"})]}),children:e.jsx(c,{children:"\\cred{T(n)} \\ge 2\\,\\cred{T(n-2)} \\ge 4\\,\\cred{T(n-4)} \\ge \\dots \\ge 2^{\\lfloor n/2 \\rfloor} \\ge 2^{(n-1)/2} = \\left(\\sqrt{2}\\right)^{n-1}."})}),e.jsx(M,{why:e.jsxs(e.Fragment,{children:["exponentiell schlägt polynomiell: Der ",e.jsx(d,{id:"limit",children:"Grenzwert"})," ",e.jsx(i,{children:"n^k / q^n \\to 0"})," für jedes ",e.jsx(i,{children:"q > 1"})," ist ein Analysis-Standardresultat, hier mit ",e.jsx(i,{children:"q = \\sqrt{2}"})]}),children:e.jsx(c,{children:"\\frac{n^k}{\\cred{T(n)}} \\le \\frac{n^k}{\\left(\\sqrt{2}\\right)^{n-1}} \\longrightarrow 0 \\quimpl n^k = o\\left(\\cred{T(n)}\\right)."})})]})}),`
`,e.jsxs(n.p,{children:["Die Basis des exponentiellen Wachstums liegt damit zwischen ",e.jsx(i,{children:"\\sqrt{2}"})," und ",e.jsx(i,{children:"2"}),`. Welche
es ist, zeigt eine logarithmische Auftragung der gezählten Aufrufe: Dort wird jedes
exponentielle Wachstum zu einer Geraden, und deren Steigung verrät die Basis.`]}),`
`,e.jsxs(ce,{title:"Gezählte Schritte gegen die Landau-Vorhersage",children:[e.jsx(kn,{}),e.jsxs(n.p,{children:["Nur auf der ",e.jsx(d,{id:"logarithm",children:"logarithmischen"}),` Skala passen beide Varianten in ein
gemeinsames Bild; die Iteration bleibt dort fast am Boden. Welche Basis die rote Gerade
hat und woher sie kommt, rechnet die folgende Vertiefung nach.`]})]}),`
`,e.jsx(ge,{title:"Exakte Aufrufzahl und goldener Schnitt",children:e.jsxs(x,{kind:"Bemerkung",label:"2.5.7 (Die exakte Aufrufzahl)",id:"env-wie-schlimm-ist-es-wirklich",children:[e.jsxs(n.p,{children:["Zwischen der unteren Schranke (Basis ",e.jsx(i,{children:"\\sqrt{2} \\approx 1{,}41"}),`) und der oberen
(Basis `,e.jsx(i,{children:"2"}),`) klafft eine Lücke. Die Aufrufzahl lässt sich aber exakt angeben, und sie ist
selbst fast eine Fibonacci-Zahl: Aus der Rekurrenz folgt per Induktion
`,e.jsx(i,{children:"\\cred{T(n)} = 2 F_{n+1} - 1"}),". Der Anfang stimmt wegen ",e.jsx(i,{children:"\\cred{T(0)} = 1 = 2 F_1 - 1"}),` und
`,e.jsx(i,{children:"\\cred{T(1)} = 1 = 2 F_2 - 1"}),", und der Schritt ist"]}),e.jsx(c,{children:"\\cred{T(n)} = 1 + \\left(2 F_n - 1\\right) + \\left(2 F_{n-1} - 1\\right) = 2\\left(F_n + F_{n-1}\\right) - 1 = 2 F_{n+1} - 1."}),e.jsxs(n.p,{children:["Die Fibonacci-Zahlen selbst wachsen wie ",e.jsx(i,{children:"\\varphi^n"}),`: Nach der Binet-Formel ist
`,e.jsx(i,{children:"F_n = \\left(\\varphi^n - \\psi^n\\right)/\\sqrt{5}"}),` mit dem goldenen Schnitt
`,e.jsx(i,{children:"\\varphi = \\left(1 + \\sqrt{5}\\right)/2 \\approx 1{,}618"}),` und
`,e.jsx(i,{children:"\\psi = 1 - \\varphi \\approx -0{,}618"}),". Weil ",e.jsx(i,{children:"|\\psi| < 1"}),` ist, verschwindet der zweite
Term, und es bleibt `,e.jsx(i,{children:"F_{n+1} \\approx \\varphi^{n+1}/\\sqrt{5}"}),`, also
`,e.jsx(i,{children:"\\cred{T(n)} = O\\left(\\varphi^n\\right)"}),`. Der wahre Wachstumsfaktor liegt zwischen unseren
Schranken; im Widget liegen die gezählten Aufrufe deshalb auf einer Geraden mit Steigung
`,e.jsx(i,{children:"\\log_{10} \\varphi \\approx 0{,}209"}),", nicht auf der steileren ",e.jsx(i,{children:"2^n"}),`-Geraden mit Steigung
`,e.jsx(i,{children:"\\log_{10} 2 \\approx 0{,}301"}),". Am Urteil ändert das nichts: Jede Basis ",e.jsx(i,{children:"q > 1"}),` bedeutet,
dass eine um `,e.jsx(i,{children:"1"})," größere Eingabe den Aufwand um den ",e.jsx(n.em,{children:"Faktor"})," ",e.jsx(i,{children:"q"})," vervielfacht."]})]})}),`
`,e.jsxs(n.h3,{id:"sec-der-vergleich-ordnung-schlaegt-konstante",children:["2.5.3 ","Der Vergleich: Ordnung schlägt Konstante"]}),`
`,e.jsxs(n.p,{children:[`Was bedeutet linear gegen exponentiell in echten Zahlen? Wir setzen die gezählten
Aufwände ein, iterativ `,e.jsx(i,{children:"\\cblue{4n - 6}"})," Operationen (ohne die Konstante ",e.jsx(i,{children:"c"}),` aus dem
Beweis von `,e.jsx(d,{id:"env:komplexitaet-der-iterativen-variante",href:"#env-komplexitaet-der-iterativen-variante",children:"Satz 2.5.1"}),`), naiv rekursiv die exakte
Aufrufzahl `,e.jsx(i,{children:"\\cred{T(n)}"})," aus ",e.jsx(d,{id:"env:rekurrenz-der-aufrufzahl",href:"#env-rekurrenz-der-aufrufzahl",children:"Lemma 2.5.4"}),`, und rechnen als grobes
Modell mit `,e.jsx(i,{children:"10^9"}),` Elementarschritten pro Sekunde. Ein realer Funktionsaufruf in R kostet
deutlich mehr, das Modell ist also optimistisch:`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:e.jsx(i,{children:"n"})}),e.jsxs(n.th,{children:["iterativ (",e.jsx(i,{children:"\\cblue{4n-6}"}),")"]}),e.jsxs(n.th,{children:["naiv (",e.jsx(i,{children:"\\cred{T(n)}"}),")"]}),e.jsx(n.th,{children:"Zeit naiv (Modell)"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"20"}),e.jsx(n.td,{children:"74"}),e.jsx(n.td,{children:"21 891"}),e.jsx(n.td,{children:"≈ 22 µs"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"30"}),e.jsx(n.td,{children:"114"}),e.jsx(n.td,{children:"2 692 537"}),e.jsx(n.td,{children:"≈ 2,7 ms"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"50"}),e.jsx(n.td,{children:"194"}),e.jsx(n.td,{children:"≈ 4,1 · 10¹⁰"}),e.jsx(n.td,{children:"≈ 41 s"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"100"}),e.jsx(n.td,{children:"394"}),e.jsx(n.td,{children:"≈ 1,1 · 10²¹"}),e.jsx(n.td,{children:"≈ 36 000 Jahre"})]})]})]}),`
`,e.jsxs(n.p,{children:[`Die iterative Variante bleibt durchgehend unter einer Mikrosekunde. Am Abstand ändert
schnellere Hardware wenig: Ein tausendmal schnellerer Rechner verkürzt die `,e.jsx(i,{children:"36\\,000"}),`
Jahre der Rekursion auf `,e.jsx(i,{children:"36"})," Jahre. Helfen kann nur ein ",e.jsx(n.em,{children:"besserer Algorithmus"}),`, und die
Landau-Notation drückt „besser" präzise aus: `,e.jsx(n.em,{children:"Die iterative Lösung liegt in einer anderen Komplexitätsklasse."})]}),`
`,e.jsx(n.h3,{children:"Selbsttest"}),`
`,e.jsxs(de,{children:[e.jsxs(E,{wahr:!0,children:[e.jsxs(n.p,{children:["Die Laufzeit der iterativen Variante ist ",e.jsx(i,{children:"O(n^2)"}),"."]}),e.jsxs(n.p,{children:[e.jsx(i,{children:"O"})," ist nur eine ",e.jsx(n.em,{children:"obere"})," Schranke: ",e.jsx(i,{children:"4n - 6"})," wächst höchstens so schnell wie ",e.jsx(i,{children:"n^2"}),`, also
gilt `,e.jsx(i,{children:"O(n^2)"}),", wenn auch wenig informativ. Scharf ist ",e.jsx(i,{children:"O(n)"}),"; ",e.jsx(i,{children:"4n - 6"}),` ist sogar
`,e.jsx(i,{children:"o(n^2)"}),"."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(n.p,{children:["Die naive Rekursion braucht exponentiell viel ",e.jsx(n.em,{children:"Speicher"}),`, weil ihr Aufrufbaum exponentiell
viele Knoten hat.`]}),e.jsxs(n.p,{children:[`Der Baum wird nie ganz gleichzeitig gespeichert: Auf dem Aufruf-Stapel liegt immer nur der
aktive Pfad von der Wurzel zum aktuellen Aufruf, und der ist höchstens `,e.jsx(i,{children:"n"}),` Aufrufe lang.
Die Speicherkomplexität ist also `,e.jsx(i,{children:"O(n)"})," (",e.jsx(d,{id:"env:exponentielle-laufzeit-der-naiven",href:"#env-exponentielle-laufzeit-der-naiven",children:"Satz 2.5.6"}),`);
exponentiell ist nur die `,e.jsx(n.em,{children:"Zeit"}),"."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsx(n.p,{children:`Zählt man pro Schleifendurchlauf 5 statt 3 Operationen, ändert sich die Zeitkomplexität
der iterativen Variante nicht.`}),e.jsxs(n.p,{children:[`Konstante Faktoren und additive Konstanten verschwinden in der Landau-Notation:
`,e.jsx(i,{children:"n + 5(n-2) + c = O(n)"})," genauso wie ",e.jsx(i,{children:"n + 3(n-2) + c"})," (",e.jsx(n.a,{href:"#env-zaehlen-ist-konvention-die-ordnung-nicht",children:"Bemerkung 2.5.2"}),`). Diese Robustheit
gegen Zählkonventionen ist der Zweck der Notation.`]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(n.p,{children:["Aus ",e.jsx(i,{children:"T(n) \\ge 2\\,T(n-2)"})," für alle ",e.jsx(i,{children:"n \\ge 2"})," (mit ",e.jsx(i,{children:"T(0), T(1) \\ge 1"}),`) folgt bereits, dass
`,e.jsx(i,{children:"T"})," mindestens exponentiell wächst."]}),e.jsxs(n.p,{children:[`Wiederholtes Einsetzen liefert
`,e.jsx(i,{children:"T(n) \\ge 2^{\\lfloor n/2 \\rfloor} \\ge \\left(\\sqrt{2}\\right)^{n-1}"}),`, geometrisches Wachstum
mit Basis `,e.jsx(i,{children:"\\sqrt{2} > 1"}),`. Das ist das Argument für die untere Schranke in
`,e.jsx(d,{id:"env:exponentielle-laufzeit-der-naiven",href:"#env-exponentielle-laufzeit-der-naiven",children:"Satz 2.5.6"}),"."]})]}),e.jsxs(J,{loesung:2,toleranz:0,children:[e.jsxs(n.p,{children:["Wie viele Jahre rechnet die naive Rekursion im Modell des Widgets oben bei ",e.jsx(i,{children:"n = 80"}),"?"]}),e.jsxs(n.p,{children:["Der Ablesekasten des Widgets nennt bei ",e.jsx(i,{children:"n = 80"})," rund ",e.jsx(i,{children:"7{,}6 \\cdot 10^{16}"}),` Aufrufe; bei
`,e.jsx(i,{children:"10^9"})," Schritten pro Sekunde sind das etwa ",e.jsx(i,{children:"7{,}6 \\cdot 10^7"}),` Sekunden, also gut zwei
Jahre. Die Iteration braucht für dieselbe Zahl `,e.jsx(i,{children:"314"})," Operationen."]})]})]}),`
`,e.jsx(n.h3,{children:"Zusammenfassung des Kapitels"}),`
`,e.jsxs(n.p,{children:["Ein ",e.jsx(d,{id:"env:numerisches-problem",children:e.jsx(n.em,{children:"numerisches Problem"})})," ist eine Abbildung ",e.jsx(i,{children:"f"}),", die Eingabedaten ",e.jsx(i,{children:"\\bx"}),` eine gesuchte
Lösung `,e.jsx(i,{children:"f(\\bx)"})," zuordnet; ein ",e.jsx(n.em,{children:"Algorithmus"}),` ist eine endliche Folge elementarer
Rechenschritte, die diese Lösung exakt oder näherungsweise berechnet (Abschnitte
`,e.jsx(n.a,{href:"#sec-2.1",children:"2.1"}),"–",e.jsx(n.a,{href:"#sec-2.2",children:"2.2"}),`). Gute Algorithmen kommen mit wenig
Laufzeit und Speicher aus. Beides messen wir als Funktion der Problemgröße `,e.jsx(i,{children:"n"}),`
(`,e.jsx(n.a,{href:"#sec-2.3",children:"Abschnitt 2.3"}),") und beschreiben es durch seine Ordnung, mit ",e.jsx(d,{id:"env:landau-symbole",children:"Landau-Symbolen"}),` und ihren
Rechenregeln (`,e.jsx(n.a,{href:"#sec-2.4",children:"Abschnitt 2.4"}),`). Die Fibonacci-Fallstudie zeigt, was diese Sprache leistet:
Linear gegen exponentiell ist der Unterschied zwischen „sofort fertig" und
„Jahrtausende". Als Nächstes kommen Normen als Fehlermaße hinzu (`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm",children:"Kapitel 3"}),`);
mit ihnen behandelt `,e.jsx(n.a,{href:"?k=04-fehler",children:"Kapitel 4"})," Rundungsfehler, Kondition und Stabilität."]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §1.1 (wissenschaftliches Rechnen: Probleme, Algorithmen und die Rolle
des Aufwands).`})})]})}function zn(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Ge,{...r})}):Ge(r)}function Pe(r){const n={em:"em",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[`
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
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Aufgabe"}),e.jsx(n.th,{children:"Thema"}),e.jsx(n.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Schaback/Wendland Aufgabe 1.10"}),e.jsx(n.td,{children:"Komplexität von Vektor- und Matrixoperationen"}),e.jsx(n.td,{children:"leicht, ca. 15 Min."})]})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Lohnend"})," (",e.jsx(i,{children:"\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Aufgabe"}),e.jsx(n.th,{children:"Thema"}),e.jsx(n.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Schaback/Wendland Aufgabe 1.11"}),e.jsx(n.td,{children:"Rechenregeln für Landau-Symbole"}),e.jsx(n.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Review Question 1.45"}),e.jsx(n.td,{children:"Optimale Summationsreihenfolge"}),e.jsx(n.td,{children:"mittel, ca. 15 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Deuflhard/Hohmann Aufgabe 2.1"}),e.jsx(n.td,{children:"Gleitkomma-Addition ist nicht assoziativ"}),e.jsx(n.td,{children:"leicht, ca. 15 Min."})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Vertiefung"})," (",e.jsx(i,{children:"\\bigstar"}),")"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Aufgabe"}),e.jsx(n.th,{children:"Thema"}),e.jsx(n.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Exercise 1.8"}),e.jsx(n.td,{children:"Signifikante Stellen und Exponentenbereich bei Auslöschung"}),e.jsx(n.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Heath Exercise 1.16"}),e.jsxs(n.td,{children:["Drei Definitionen der Maschinengenauigkeit ",e.jsx(i,{children:"\\eps_{\\text{mach}}"})]}),e.jsx(n.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Schaback/Wendland Aufgabe 1.6"}),e.jsx(n.td,{children:"Dezimal exakt, binär nie exakt"}),e.jsx(n.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Schaback/Wendland Aufgabe 1.7"}),e.jsxs(n.td,{children:["Basisumrechnung von ",e.jsx(i,{children:"(3417)_{10}"})]}),e.jsx(n.td,{children:"leicht, ca. 15 Min."})]})]})]}),`
`,e.jsxs(n.p,{children:["Bücher: Heath: ",e.jsx(n.em,{children:"Scientific Computing"})," (2. Aufl.); Deuflhard/Hohmann: ",e.jsx(n.em,{children:"Numerische Mathematik 1"})," (4. Aufl.); Schaback/Wendland: ",e.jsx(n.em,{children:"Numerische Mathematik"})," (5. Aufl.)."]})]})}function _n(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(Pe,{...r})}):Pe(r)}const yn={sections:[{id:"2.1",key:"probleme-algorithmen",title:"Numerische Probleme und Algorithmen",C:q(sn)},{id:"2.2",key:"fibonacci",title:"Algorithmen konkret: Fibonacci und Verwandte",C:q(an)},{id:"2.3",key:"aufwand",title:"Aufwand und Komplexität",C:q(xn)},{id:"2.4",key:"landau",title:"Landau-Symbole und Rechenregeln",C:q(gn)},{id:"2.5",key:"fibonacci-komplexitaet",title:"Fibonacci: Komplexitätsanalyse",C:q(zn)},{id:"2.6",key:"uebungen",title:"Übungsempfehlungen",C:q(_n)}]};export{yn as default};
