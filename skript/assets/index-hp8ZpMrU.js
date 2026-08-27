import{j as e,C as r,M as i,a as d,E as a,c as x,A as g,F as l,m as h}from"./index-GbyLwDE5.js";import{I as m,E as c}from"./Interaktiv-DHZUUTxv.js";import{C as j}from"./ConceptFlow-CQqTMxA4.js";function s({q:t,children:n}){return e.jsxs("li",{className:"space-y-1",children:[e.jsx("div",{children:t}),e.jsxs("details",{className:"rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300",children:"Lösung anzeigen"}),e.jsx("div",{className:"pt-1.5",children:n})]})]})}function o(t){const n={a:"a",em:"em",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:[`Statistik war einmal Papier-und-Bleistift-Arbeit an kleinen Tabellen. Heute ist sie
(genau wie das maschinelle Lernen) durch und durch `,e.jsx(n.em,{children:"computational"}),`: Jedes Modell,
das wir fitten, jede Prognose, die wir berechnen, entsteht durch einen Algorithmus auf
einem Rechner. In diesem Skript lernen wir die mathematischen Konzepte, mit denen wir
solche Algorithmen entwickeln, verstehen und beurteilen können. Es geht also nicht um
neue Statistik, sondern um die Frage: `,e.jsx(n.em,{children:`Wie rechnet man das eigentlich – schnell,
sparsam und zuverlässig?`})]}),`
`,e.jsx(n.h3,{children:"Warum Numerik?"}),`
`,e.jsxs(n.p,{children:[`Ein Beispiel zeigt, warum die Formeln aus den Statistik-Vorlesungen allein nicht
reichen. Wir wollen ein
`,e.jsx(r,{id:"linear-regression",children:"lineares Regressionsmodell"}),` mit
`,e.jsx(i,{children:"p = 10\\,000"})," Merkmalen auf ",e.jsx(i,{children:"n = 100\\,000"}),` Beobachtungen trainieren,
also das `,e.jsx(r,{id:"linear-least-squares",children:"Kleinste-Quadrate-Problem"})]}),`
`,e.jsx(d,{children:"\\min_{\\bbeta \\in \\R^p} \\left\\| \\bX\\bbeta - \\by \\right\\|_2^2"}),`
`,e.jsxs(n.p,{children:[`lösen. Die Theorie liefert die Formel
`,e.jsx(i,{children:"\\wh{\\bbeta} = (\\bX^\\top\\bX)^{-1}\\bX^\\top\\by"}),`. Wer sie wörtlich in
den Rechner tippt, erlebt gleich drei Überraschungen. Erstens die `,e.jsx(n.em,{children:"Kondition"}),`: Die
Matrix `,e.jsx(i,{children:"\\bX^\\top\\bX"}),` kann so empfindlich sein, dass winzige
`,e.jsx(r,{id:"rounding-error",children:"Rundungsfehler"}),` das Ergebnis komplett
verfälschen. Zweitens die `,e.jsx(n.em,{children:"Komplexität"}),`: Das
`,e.jsx(r,{id:"matrix-inverse",children:"Invertieren"}),` kostet
`,e.jsx(r,{id:"big-o-notation",children:e.jsx(i,{children:"O(p^3)"})}),` Rechenoperationen, für
`,e.jsx(i,{children:"p = 10\\,000"})," rund ",e.jsx(i,{children:"10^{12}"}),` Gleitkommaoperationen. Drittens der
`,e.jsx(n.em,{children:"Speicher"}),": ",e.jsx(i,{children:"\\bX^\\top\\bX"}),` ist eine
`,e.jsx(i,{children:"p \\times p"}),`-Matrix und belegt allein schon etwa 800 MB. Bessere Wege (die
`,e.jsx(r,{id:"qr-factorization",children:"QR-Zerlegung"}),`, die
`,e.jsx(r,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),`,
iterative Verfahren) sind genau der Stoff dieses Skripts.`]}),`
`,e.jsxs(a,{kind:"Beispiel",label:"1.1.1 (Komplexität der Matrixmultiplikation)",id:"env-komplexitaet-matrixmultiplikation",children:[e.jsxs(n.p,{children:["Für zwei ",e.jsx(i,{children:"n \\times n"}),`-Matrizen hängt der Rechenaufwand stark vom gewählten
Algorithmus ab:`]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Algorithmus"}),e.jsxs(n.th,{style:{textAlign:"right"},children:["Rechenoperationen für ",e.jsx(i,{children:"n = 1000"})]}),e.jsx(n.th,{style:{textAlign:"right"},children:"Komplexität"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Naive Methode"}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"\\approx 10^9"})}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"O(n^3)"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Strassen"}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"\\approx 6 \\cdot 10^8"})}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"O(n^{2{,}807})"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Bester bekannter Algorithmus"}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"\\approx 2 \\cdot 10^8"})}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"O(n^{2{,}373})"})})]})]})]}),e.jsx(n.p,{children:`Die Exponenten liegen scheinbar nah beieinander, wirken sich bei großen Matrizen
aber stark aus. Welches Verfahren praktisch gewinnt, hängt zusätzlich von
Konstanten und Speicherzugriffen ab.`}),e.jsxs(n.p,{children:["Für ",e.jsx(i,{children:"n = 10\\,000"})," stehen damit grob ",e.jsx(i,{children:"10^{12}"}),` Operationen der naiven Methode
etwa `,e.jsx(i,{children:"2 \\cdot 10^{10}"}),` Operationen gegenüber. Das ist ein möglicher Faktor
von 50. Für die Statistik ist dieser Unterschied entscheidend, weil
Matrixmultiplikationen etwa beim Schätzen großer Modelle immer wieder anfallen.`]})]}),`
`,e.jsxs(n.p,{children:[`Wie dramatisch das erste Problem werden kann, zeigt schon ein
`,e.jsx(r,{id:"linear-system",children:"Gleichungssystem"})," mit zwei Unbekannten:"]}),`
`,e.jsxs(a,{kind:"Beispiel",label:"1.1.2 (Ein schlecht konditioniertes Problem)",id:"env-ein-schlecht-konditioniertes-problem",children:[e.jsxs(n.p,{children:["Wir lösen ",e.jsx(i,{children:"\\bA\\bx = \\bb"})," mit"]}),e.jsx(d,{children:"\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1{,}0001 \\end{pmatrix}, \\qquad \\bb = \\begin{pmatrix} 2 \\\\ 2{,}0001 \\end{pmatrix}."}),e.jsxs(n.p,{children:[`Subtrahieren wir die erste Zeile von der zweiten, bleibt
`,e.jsx(i,{children:"0{,}0001\\,x_2 = 0{,}0001"}),", also ",e.jsx(i,{children:"x_2 = 1"}),` und damit
`,e.jsx(i,{children:"x_1 = 1"}),`: Die exakte Lösung ist
`,e.jsx(i,{children:"\\cblue{\\bx} = \\cblue{(1, 1)^\\top}"}),`. Nun stören wir die rechte Seite
minimal (etwa so, wie es ein Rundungsfehler täte) im zweiten Eintrag:`]}),e.jsx(d,{children:"\\cred{\\wt{\\bb}} = \\begin{pmatrix} 2 \\\\ \\cred{2{,}0002} \\end{pmatrix} \\quimpl 0{,}0001\\,x_2 = \\cred{0{,}0002} \\quimpl \\cred{\\wt{\\bx}} = \\cred{\\begin{pmatrix} 0 \\\\ 2 \\end{pmatrix}}."}),e.jsxs(n.p,{children:["Die winzige Störung wird bei der Division durch ",e.jsx(i,{children:"0{,}0001"}),` massiv verstärkt:
Aus `,e.jsx(i,{children:"\\cblue{x_2 = 1}"})," wird ",e.jsx(i,{children:"\\cred{\\wt{x}_2 = 2}"}),`, aus
`,e.jsx(i,{children:"\\cblue{x_1 = 1}"})," wird ",e.jsx(i,{children:"\\cred{\\wt{x}_1 = 0}"}),` – ein Fehler von
100 % in der Lösung, ausgelöst durch einen Datenfehler von 0,005 %. Solche Probleme
heißen `,e.jsx(n.em,{children:"schlecht konditioniert"}),`; die
`,e.jsx(r,{id:"condition-number",children:"Konditionszahl"}),` misst das präzise und
begleitet uns durch das ganze erste Drittel des Skripts.`]})]}),`
`,e.jsx(n.h3,{children:"Die drei Themenblöcke"}),`
`,e.jsxs(n.p,{children:[`Das Skript besteht aus drei Blöcken, die aufeinander aufbauen. Der erste Block,
`,e.jsx(n.em,{children:"Numerische Lineare Algebra"}),`, klärt zunächst, was einen guten Algorithmus
ausmacht (Kondition, Stabilität, Komplexität), und entwickelt dann Matrix-Zerlegungen,
mit denen wir Gleichungssysteme und KQ-Probleme `,e.jsx(i,{children:"\\bA\\bx \\approx \\bb"}),`
zuverlässig lösen, statt naiv zu invertieren.`]}),`
`,e.jsxs(n.p,{children:["Der zweite Block, ",e.jsx(n.em,{children:"Analysis und Optimierung"}),`, verallgemeinert die
`,e.jsx(r,{id:"derivative",children:"Ableitung"}),` auf Funktionen mit Vektor-, Matrix-
und Tensor-Argumenten. Wozu? Beim Training
`,e.jsx(r,{id:"neural-network",children:"neuronaler Netze"}),` müssen wir
Verlustfunktionen wie
`,e.jsx(i,{children:"L(\\bW) = \\tfrac{1}{2}\\left\\| \\bX\\bW - \\bY \\right\\|_F^2"}),` nach einer
ganzen Matrix `,e.jsx(i,{children:"\\bW"}),` ableiten. Naiv wären das so viele einzelne
`,e.jsx(r,{id:"partial-derivative",children:"partielle Ableitungen"}),`, wie
`,e.jsx(i,{children:"\\bW"})," Einträge hat, bei ",e.jsx(i,{children:"1000 \\times 10"}),` schon
`,e.jsx(i,{children:"10\\,000"}),`; der
Matrix-Kalkül liefert stattdessen eine einzige Zeile,
`,e.jsx(i,{children:"\\partial L / \\partial \\bW = \\bX^\\top(\\bX\\bW - \\bY)"}),`, und die ist auch
noch effizient implementierbar. Darauf setzt die numerische Optimierung auf:
`,e.jsx(r,{id:"gradient-descent",children:"Gradientenverfahren"}),` und ihre
Verwandten finden Minima von Funktionen, die nicht
`,e.jsx(r,{id:"convexity",children:"konvex"}),`, hochdimensional (GPT-3:
`,e.jsx(i,{children:"1{,}75 \\cdot 10^{11}"})," Parameter!) und nur häppchenweise auswertbar sind."]}),`
`,e.jsxs(n.p,{children:["Der dritte Block, ",e.jsx(n.em,{children:"Funktionsapproximation"}),`, fragt: Wie ersetzen wir eine
komplizierte Funktion durch eine einfache, mit der sich gut rechnen lässt? Das
klassische Werkzeug ist die
`,e.jsx(r,{id:"taylor-series",children:"Taylor-Approximation"}),`: Schon
`,e.jsx(i,{children:"e^x \\approx 1 + x + \\tfrac{x^2}{2}"})," liefert bei ",e.jsx(i,{children:"x = 0{,}5"}),` den
Wert `,e.jsx(i,{children:"1{,}625"})," statt ",e.jsx(i,{children:"e^{0{,}5} = 1{,}6487\\ldots"}),`, ein relativer
Fehler von unter 2 %. Später kommen flexiblere Bausteine wie Splines dazu, mit denen
die Statistik glatte Funktionen aus Daten schätzt.`]}),`
`,e.jsxs(n.p,{children:[`Die drei Blöcke bauen aufeinander auf; welches Kapitel im Einzelnen worauf aufbaut,
zeigt die Landkarte in `,e.jsx(n.a,{href:"#sec-1.2",children:"Abschnitt 1.2"}),"."]}),`
`,e.jsx(n.h3,{children:"Wie dieses Skript funktioniert"}),`
`,e.jsxs(n.p,{children:["Drei Elemente helfen beim Lesen. ",e.jsx(n.em,{children:"Erstens:"}),` Gestrichelt unterstrichene Begriffe
wie `,e.jsx(r,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` öffnen Tooltips,
die das nötige Vorwissen auffrischen, oft mit weiteren Links darin, sodass wir uns bei
Bedarf bis zu den Grundlagen durchhangeln können. `,e.jsx(n.em,{children:"Zweitens:"}),` Blaue
„Interaktiv"-Kästen enthalten Widgets zum Selbst-Ausprobieren, jeweils mit einer
Aufgabe und der Auswertung dazu; sie gehören zum roten Faden. Ausklappbare
„Vertiefung"-Boxen sammeln dagegen Zusatzstoff – Exkurse, längere Beweise,
Übersichten –, den wir beim ersten Lesen überspringen können; die erste steht am Ende
von `,e.jsx(n.a,{href:"#sec-1.2",children:"Abschnitt 1.2"}),". ",e.jsx(n.em,{children:"Drittens:"}),`
Beweise sind als Stepper gebaut: Wir decken sie Schritt für Schritt auf, und jeder
Schritt trägt seine Begründung. Am Ende jedes Abschnitts verweist eine
„Vertiefung:"-Zeile auf Literatur zum Weiterlesen.`]}),`
`,e.jsx(n.h3,{children:"Selbsttest: Reicht das Vorwissen?"}),`
`,e.jsxs(n.p,{children:[`Das Skript setzt Lineare Algebra I, Analysis I und etwas R-Programmierung voraus. Die
folgenden Fragen sollten wir (zumindest nach kurzem Nachdenken) beantworten können.
Wer hängt, klappt die Lösung auf und frischt das Thema per Tooltip auf; sehr zu
empfehlen ist außerdem, die geometrische Intuition mit den Videos von
`,e.jsx(n.em,{children:"3blue1brown"}),' („Essence of Linear Algebra") aufzubauen.']}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Lineare Algebra:"})}),`
`,e.jsxs("ol",{className:"max-w-prose list-decimal space-y-3 pl-5",children:[e.jsx(s,{q:e.jsx(e.Fragment,{children:"Was ist der Rang einer Matrix? Wie berechnen wir ihn?"}),children:e.jsxs(n.p,{children:["Der ",e.jsx(r,{id:"rank",children:"Rang"}),` ist die Anzahl linear unabhängiger
Spalten (gleichwertig: Zeilen), also die Dimension des
`,e.jsx(r,{id:"image",children:"Bildes"}),` der zugehörigen Abbildung. Von Hand
berechnen wir ihn z. B. per
`,e.jsx(r,{id:"gaussian-elimination",children:"Gauß-Elimination"}),`: Rang = Anzahl
der Nichtnullzeilen in der Stufenform.`]})}),e.jsx(s,{q:e.jsxs(e.Fragment,{children:["Was bedeutet es, dass eine Matrix ",e.jsx(i,{children:"\\bA"})," invertierbar ist?"]}),children:e.jsxs(n.p,{children:["Es gibt eine Matrix ",e.jsx(i,{children:"\\bA^{-1}"}),` mit
`,e.jsx(i,{children:"\\bA\\bA^{-1} = \\bA^{-1}\\bA = \\bI"}),`
(`,e.jsx(r,{id:"matrix-inverse",children:"Inverse"}),`). Das setzt voraus, dass
`,e.jsx(i,{children:"\\bA"})," quadratisch ist und vollen Rang hat; gleichwertig: ",e.jsx(i,{children:"0"}),` ist
kein Eigenwert, und `,e.jsx(i,{children:"\\bA\\bx = \\bb"})," hat für jedes ",e.jsx(i,{children:"\\bb"}),` genau
eine Lösung.`]})}),e.jsx(s,{q:e.jsx(e.Fragment,{children:"Was sind Eigenwerte und Eigenvektoren? Wie finden wir sie?"}),children:e.jsxs(n.p,{children:["Ein ",e.jsx(r,{id:"eigenvalue-eigenvector",children:"Eigenvektor"}),`
`,e.jsx(i,{children:"\\bv \\neq \\bnull"})," mit Eigenwert ",e.jsx(i,{children:"\\lambda"}),` erfüllt
`,e.jsx(i,{children:"\\bA\\bv = \\lambda\\bv"}),": Die Matrix skaliert ",e.jsx(i,{children:"\\bv"}),` nur, statt
seine Richtung zu ändern. Von Hand finden wir Eigenwerte als Nullstellen des
charakteristischen Polynoms `,e.jsx(i,{children:"\\det(\\bA - \\lambda\\bI) = 0"}),`; am Rechner mit
numerischen Verfahren.`]})}),e.jsx(s,{q:e.jsxs(e.Fragment,{children:["Was bedeutet das Matrix-Vektor-Produkt ",e.jsx(i,{children:"\\bA\\bx"})," geometrisch?"]}),children:e.jsxs(n.p,{children:[e.jsx(i,{children:"\\bA\\bx"}),` wendet die
`,e.jsx(r,{id:"linear-map",children:"lineare Abbildung"})," ",e.jsx(i,{children:"\\bA"}),` auf den
Vektor `,e.jsx(i,{children:"\\bx"}),` an
(`,e.jsx(r,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"}),`): Je
nach `,e.jsx(i,{children:"\\bA"})," wird ",e.jsx(i,{children:"\\bx"}),` gestreckt, gedreht, gespiegelt, geschert
oder in einen Unterraum projiziert.`]})}),e.jsx(s,{q:e.jsxs(e.Fragment,{children:["Wann bilden Vektoren ",e.jsx(i,{children:"\\bv_1, \\dots, \\bv_n"})," eine Basis des ",e.jsx(i,{children:"\\R^n"}),"? Was ist ihr Span?"]}),children:e.jsxs(n.p,{children:["Die Vektoren bilden eine ",e.jsx(r,{id:"basis",children:"Basis"})," des ",e.jsx(i,{children:"\\R^n"}),`, wenn sie linear
unabhängig sind und den gesamten `,e.jsx(i,{children:"\\R^n"})," aufspannen. Bei ",e.jsx(i,{children:"n"}),` Vektoren im
`,e.jsx(i,{children:"\\R^n"}),` genügt bereits eine dieser beiden Bedingungen. Ihr
`,e.jsx(r,{id:"span",children:"Span"}),` ist die Menge aller Linearkombinationen
`,e.jsx(i,{children:"\\alpha_1\\bv_1 + \\dots + \\alpha_n\\bv_n"}),` mit
`,e.jsx(i,{children:"\\alpha_1, \\dots, \\alpha_n \\in \\R"}),"."]})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Analysis:"})}),`
`,e.jsxs("ol",{className:"max-w-prose list-decimal space-y-3 pl-5",children:[e.jsx(s,{q:e.jsxs(e.Fragment,{children:["Was bedeutet es, dass eine Funktion ",e.jsx(i,{children:"f: \\R \\to \\R"})," stetig ist?"]}),children:e.jsxs(n.p,{children:[`Kleine Änderungen im Argument führen zu kleinen Änderungen im Funktionswert
(`,e.jsx(r,{id:"continuity",children:"Stetigkeit"}),`). Formal: Zu jedem
`,e.jsx(i,{children:"\\eps > 0"})," gibt es ein ",e.jsx(i,{children:"\\delta > 0"}),`, sodass
`,e.jsx(i,{children:"|x - x_0| < \\delta"})," stets ",e.jsx(i,{children:"|f(x) - f(x_0)| < \\eps"})," erzwingt."]})}),e.jsx(s,{q:e.jsxs(e.Fragment,{children:["Was ist die Ableitung ",e.jsx(i,{children:"f'(x_0)"})," geometrisch?"]}),children:e.jsxs(n.p,{children:["Die Steigung der ",e.jsx(r,{id:"tangent-line",children:"Tangente"}),` an den Graphen
von `,e.jsx(i,{children:"f"})," im Punkt ",e.jsx(i,{children:"x_0"}),`, also die momentane Änderungsrate von
`,e.jsx(i,{children:"f"})," an dieser Stelle (",e.jsx(r,{id:"derivative",children:"Ableitung"}),")."]})}),e.jsx(s,{q:e.jsx(e.Fragment,{children:"Was unterscheidet ein lokales von einem globalen Minimum?"}),children:e.jsxs(n.p,{children:["Ein lokales Minimum ",e.jsx(i,{children:"x_0"})," erfüllt ",e.jsx(i,{children:"f(x_0) \\leq f(x)"}),` nur für alle
`,e.jsx(i,{children:"x"})," in einer ",e.jsx(r,{id:"neighborhood",children:"Umgebung"}),` von
`,e.jsx(i,{children:"x_0"}),"; ein globales Minimum für ",e.jsx(n.em,{children:"alle"})," ",e.jsx(i,{children:"x"}),` im
Definitionsbereich.
Bei nichtkonvexen Problemen können `,e.jsx(r,{id:"gradient-descent",children:"Abstiegsverfahren"}),`
an lokalen Minima oder anderen stationären Punkten enden. Bei konvexen
Zielfunktionen ist dagegen jedes lokale Minimum bereits global.`]})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §1 (wissenschaftliches Rechnen: Näherungen, Fehler, Kondition im
Überblick); MML, Vorwort und Teil I als Panorama der Mathematik hinter dem maschinellen
Lernen.`})})]})}function b(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}const p={1:"Worum geht's?",2:"Algorithmen & Komplexität",3:"Spur & Matrixnormen",4:"Fehler, Kondition & Stabilität",5:"Lineare Gleichungssysteme",6:"Singulärwertzerlegung",7:"Kleinste Quadrate",8:"Numerische LA: Iteration & Zufall",9:"Tensoren & Tensorprodukte",10:"Differentialrechnung",11:"Konvexität",12:"Gleichungen & Optimierung",13:"Funktionsapproximation"},f=440,k=128,w=57,v=t=>k+(t-1)*w+(t>=10?18:0)+(t>=13?18:0),z=t=>t<=9?"teil1":t<=12?"teil2":"teil3",A=x.map(t=>({id:String(t.num),label:[p[t.num]],badge:String(t.num),name:`Kap. ${t.num} · ${t.title}`,x:f,y:v(t.num),w:285,h:38,group:z(t.num),href:`?k=${t.id}`})),S=[{id:"LA",label:["Lineare Algebra I"],x:265,y:40,w:150,h:34,group:"vor"},{id:"AN",label:["Analysis I"],x:440,y:40,w:130,h:34,group:"vor"},{id:"R",label:["R-Programmierung"],x:620,y:40,w:155,h:34,group:"vor"}],K=[{from:"LA",to:"1"},{from:"AN",to:"1"},{from:"R",to:"1"},{from:"AN",to:"10",side:"left"},{from:"LA",to:"13",side:"left"},...Array.from({length:11},(t,n)=>({from:String(n+1),to:String(n+2)})),{from:"3",to:"5",side:"right"},{from:"3",to:"6",side:"right"},{from:"4",to:"7",side:"right"},{from:"5",to:"7",side:"right"},{from:"2",to:"8",side:"right"},{from:"6",to:"8",side:"right"},{from:"6",to:"9",side:"right"},{from:"3",to:"10",side:"left"},{from:"4",to:"12",side:"left"},{from:"10",to:"12",side:"right"},{from:"11",to:"13",side:"right"},{from:"1",to:"13",side:"left"},{from:"7",to:"13",side:"left"},{from:"9",to:"13",side:"left"}];function M(){return e.jsxs("div",{children:[e.jsx(g,{children:"Tippen wir ein Kapitel an und verfolgen wir seine direkten Voraussetzungen und Folgen."}),e.jsx(j,{ariaLabel:"Abhängigkeitskarte der 13 Kapitel: Lesereihenfolge von oben nach unten, Bögen zeigen, welche Kapitel über die Reihenfolge hinaus aufeinander aufbauen.",nodes:[...S,...A],edges:K,groups:[{key:"vor",label:"Vorwissen",color:l.grau},{key:"teil1",label:"Teil 1 · Numerische lineare Algebra (Kap. 1–9)",color:l.blau},{key:"teil2",label:"Teil 2 · Analysis & Optimierung (Kap. 10–12)",color:l.orange},{key:"teil3",label:"Teil 3 · Funktionsapproximation (Kap. 13)",color:l.violett}],openLabel:"Kapitel öffnen"})]})}function u(t){const n={a:"a",em:"em",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:`Die dreizehn Kapitel dieses Skripts sind zum Durchlesen von vorne nach hinten
gebaut – aber sie hängen enger zusammen, als eine lineare Reihenfolge zeigen
kann. Manche Kapitel sind Fundament für fast alles Spätere (die Normen aus
Kapitel 3, die Fehleranalyse aus Kapitel 4), andere greifen weit voraus oder
zurück: Die Funktionsapproximation in Teil 3 etwa braucht kein einziges
Ergebnis aus Teil 2, dafür umso mehr aus Teil 1. Die folgende Karte macht
diese Struktur sichtbar.`}),`
`,e.jsxs(m,{title:"Landkarte: worauf ein Kapitel aufbaut und wohin es führt",children:[e.jsx(M,{}),e.jsxs(n.p,{children:[`Die Kästen sind die Kapitel in Lesereihenfolge, die Bögen sind Abhängigkeiten
über Nachbarkapitel hinweg. Wählen wir ein Kapitel aus, hebt die Karte hervor,
worauf es aufbaut und wohin es führt – nützlich vor dem Lesen (`,e.jsx(n.em,{children:`was sollte ich
parat haben?`}),") genauso wie bei der Prüfungsvorbereitung (",e.jsx(n.em,{children:`wofür brauche ich das
noch?`}),")."]})]}),`
`,e.jsxs(c,{title:"Die Kapitel im Detail",children:[e.jsx(n.h3,{children:"Die drei Teile des Skripts"}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Teil 1 – Numerische lineare Algebra (Kapitel 2–9)."})," Die Leitfrage: ",e.jsx(n.em,{children:`Wie
lassen sich Probleme der linearen Algebra auf dem Rechner effizient und genau
lösen?`})," ",e.jsx(n.a,{href:"?k=02-algos",children:"Kapitel 2"}),` stellt dafür die Sprache bereit – was ein
numerisches Problem, ein Algorithmus und sein Aufwand in
`,e.jsx(r,{id:"big-o-notation",children:"Landau-Notation"})," ist. ",e.jsx(n.a,{href:"?k=03-matrix-spur-norm",children:"Kapitel 3"}),`
liefert die Messwerkzeuge (Spur und `,e.jsx(r,{id:"matrix-norm",children:"Matrixnormen"}),`),
`,e.jsx(n.a,{href:"?k=04-fehler",children:"Kapitel 4"}),` die zentrale Unterscheidung des ganzen Skripts:
`,e.jsx(n.em,{children:"Kondition"})," ist eine Eigenschaft des Problems, ",e.jsx(n.em,{children:"Stabilität"}),` eine Eigenschaft
des Algorithmus – nur an letzterer können wir drehen. Darauf bauen die
Rechenkerne auf: `,e.jsx(n.a,{href:"?k=05-lgs",children:"Kapitel 5"}),` löst Gleichungssysteme über
Zerlegungen (`,e.jsx(r,{id:"lu-decomposition",children:"LU"}),` und
`,e.jsx(r,{id:"cholesky-factorization",children:"Cholesky"}),`) statt über die goldene Regel des
Skripts zu verstoßen – `,e.jsx(n.em,{children:"niemals eine Matrix invertieren!"}),` –,
`,e.jsx(n.a,{href:"?k=06-svd",children:"Kapitel 6"}),` entwickelt mit der
`,e.jsx(r,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` die wichtigste
Matrixzerlegung der angewandten Mathematik, und `,e.jsx(n.a,{href:"?k=07-kq",children:"Kapitel 7"}),`
vergleicht drei Lösungswege für das
`,e.jsx(r,{id:"linear-least-squares",children:"Kleinste-Quadrate-Problem"}),` – Normalengleichungen,
`,e.jsx(r,{id:"qr-factorization",children:"QR"}),`, SVD – nach genau den Kriterien aus Kapitel 4.
`,e.jsx(n.a,{href:"?k=08-la-misc",children:"Kapitel 8"}),` tauscht dann Exaktheit gegen Geschwindigkeit
(Iteration und Zufall, von der Potenzmethode bis zum Matrix-Sketching), und
`,e.jsx(n.a,{href:"?k=09-tensoren",children:"Kapitel 9"})," baut mit ",e.jsx(r,{id:"tensor",children:"Tensoren"}),` und
Tensorprodukten multivariate Strukturen aus univariaten Bausteinen.`]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Teil 2 – Analysis & Optimierung (Kapitel 10–12)."})," Die Leitfrage: ",e.jsx(n.em,{children:`Wie
differenziert und optimiert man Funktionen jenseits des Eindimensionalen?`}),`
`,e.jsx(n.a,{href:"?k=10-differentialrechnung",children:"Kapitel 10"}),` verallgemeinert die Ableitung nach dem
Prinzip „Ableitung = lineare Approximation" auf Vektoren und Matrizen
(`,e.jsx(r,{id:"gradient",children:"Gradient"}),`, Jacobi-Matrix) und baut darauf die Rechenregeln,
die `,e.jsx(r,{id:"hessian-matrix",children:"Hesse-Matrix"}),` und die
`,e.jsx(r,{id:"taylor-series",children:"Taylor-Entwicklung"}),` auf; nebenbei fallen die
`,e.jsx(r,{id:"normal-equations",children:"Normalengleichungen"}),` aus Kapitel 7 als Rechnung im
Matrixkalkül ab. `,e.jsx(n.a,{href:"?k=11-konvexitaet",children:"Kapitel 11"}),` behandelt
`,e.jsx(r,{id:"convexity",children:"Konvexität"}),` als das Versprechen, das lokale Verfahren
global macht: Bei konvexen Zielfunktionen ist jedes lokale Minimum bereits
das globale. `,e.jsx(n.a,{href:"?k=12-optim",children:"Kapitel 12"}),` setzt darauf die Verfahren, sortiert
nach der Ordnung der verwendeten Ableitungen: Nelder-Mead (nullte),
`,e.jsx(r,{id:"gradient-descent",children:"Gradientenabstieg"}),` mit Line Search und SGD (erste),
`,e.jsx(r,{id:"newtons-method",children:"Newton"}),` und Quasi-Newton (zweite), dazu Optimierung
unter Nebenbedingungen. Eine feinere Karte dieses Teils – von der
Fréchet-Ableitung bis zu den KKT-Bedingungen – steht am Anfang von
`,e.jsx(n.a,{href:"?k=10-differentialrechnung",children:"Kapitel 10"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Teil 3 – Funktionsapproximation (Kapitel 13)."})," Die Leitfrage: ",e.jsx(n.em,{children:`Wie
ersetzen wir eine komplizierte Funktion durch eine einfache, mit der sich gut
rechnen lässt?`})," ",e.jsx(n.a,{href:"?k=13-funktionsapproximation",children:"Kapitel 13"}),` überträgt zuerst
die Idee der `,e.jsx(r,{id:"basis",children:"Basis"})," aus dem ",e.jsx(i,{children:"\\R^n"}),` auf Funktionenräume, stellt
Funktionen als Linearkombination `,e.jsx(i,{children:"\\wh{f} = \\sum_k a_k \\phi_k"}),` von
Basisfunktionen dar – die Koeffizienten liefert wieder ein Gleichungssystem
oder ein KQ-Problem – und erklärt, warum Polynominterpolation scheitert
(Runge-Phänomen) und B-Splines funktionieren. Die zweite Hälfte des Kapitels
macht daraus Statistik: Glättung verrauschter Daten als Regressionsproblem,
die Bias-Varianz-Abwägung bei der Wahl der Basisgröße und der Fluch der
Dimension im Multivariaten, dem additive Modelle (GAMs) entkommen. Dieser
Teil setzt Teil 2 `,e.jsx(n.em,{children:"nicht"}),` voraus – seine Anker liegen in den Kapiteln 1, 4,
5, 7 und 9; die feinere Karte dazu steht am Anfang von
`,e.jsx(n.a,{href:"?k=13-funktionsapproximation",children:"Kapitel 13"}),"."]})]}),`
`,e.jsxs(c,{title:"Was sich durch das ganze Skript zieht",children:[e.jsx(n.p,{children:`Vier Themen tauchen in allen drei Teilen wieder auf; sie sind das eigentliche
Gerüst des Skripts.`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Stabilität."}),` Wähle Algorithmen, die Fehler nicht verstärken. Die
`,e.jsx(r,{id:"condition-number",children:"Konditionszahl"}),` des Problems ist uns vorgegeben, die
Stabilität des Algorithmus nicht – deshalb Zerlegungen statt Inversion,
`,e.jsx(r,{id:"orthogonal-matrix",children:"orthogonale Matrizen"}),` (perfekt konditioniert,
`,e.jsx(i,{children:"\\kappa = 1"}),`) wo immer möglich, und schlecht konditionierte Schritte so früh
wie möglich.`]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Rechenaufwand."}),` Ein kleines Einmaleins der Komplexitäten, das sich
einzuprägen lohnt: Vektoroperationen `,e.jsx(i,{children:"O(n)"}),`,
`,e.jsx(r,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkte"})," ",e.jsx(i,{children:"O(n^2)"}),`,
Matrixzerlegungen `,e.jsx(i,{children:"O(n^3)"}),`, iterative Verfahren
`,e.jsx(i,{children:"O(n^2 \\log(1/\\eps))"}),` – und als Warnung der Fluch der Dimension mit
`,e.jsx(i,{children:"O(K^p)"}),"."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Matrixzerlegungen."}),` Das Werkzeugregal von Teil 1, auf das alles Spätere
zurückgreift:`]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Zerlegung"}),e.jsx(n.th,{children:"Form"}),e.jsx(n.th,{children:"Kapitel"}),e.jsx(n.th,{children:"typischer Einsatz"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"LU"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bL\\bU"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"?k=05-lgs",children:"5"})}),e.jsx(n.td,{children:"allgemeine Gleichungssysteme"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Cholesky"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bL\\bL^\\top"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"?k=05-lgs",children:"5"})}),e.jsxs(n.td,{children:["SPD-Matrizen, Simulation aus ",e.jsx(i,{children:"\\Ncal(\\bnull, \\bSigma)"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"QR"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bQ\\bR"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"?k=07-kq",children:"7"})}),e.jsx(n.td,{children:"Kleinste Quadrate, stabil"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"SVD"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bU\\bSigma\\bV^\\top"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"?k=06-svd",children:"6"})}),e.jsx(n.td,{children:"universell: Rang, Pseudoinverse, Approximation"})]})]})]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Von exakt zu approximativ."}),` Die Problemklassen des Skripts bilden eine
Treppe wachsender Allgemeinheit – und abnehmender Garantien: lineare Probleme
haben exakte Lösungen per Zerlegung; Kleinste Quadrate lösen wir als
Projektion; nichtlineare Gleichungen nur noch iterativ (Newton); allgemeine
Optimierung mit Gradientenverfahren, die lokal suchen; erst
`,e.jsx(r,{id:"convexity",children:"Konvexität"}),` gibt globale Garantien zurück; und die
Funktionsapproximation handelt schließlich Genauigkeit gegen Aufwand.`]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Die Referenzen des Skripts, nach Teilen sortiert – zu Teil 1
Heath, Scientific Computing, §1–4 (und §11 für die iterativen Verfahren)
sowie MML §2–4; zu Teil 2 MML §5 und §7 und Heath §5–6, für die Konvexität
Boyd & Vandenberghe, Convex Optimization (frei verfügbar); zu Teil 3
Heath §7. Für die geometrische Intuition zur linearen Algebra außerdem die
3blue1brown-Videoreihe „Essence of Linear Algebra".`})})]})}function y(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(u,{...t})}):u(t)}const R={sections:[{id:"1.1",key:"worum",title:"Worum geht es in diesem Skript?",C:h(b)},{id:"1.2",key:"landkarte",title:"Landkarte des Skripts",C:h(y)}]};export{R as default};
