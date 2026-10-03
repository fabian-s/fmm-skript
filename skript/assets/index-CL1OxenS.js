import{j as e,W as u,a as g,C as r,M as i,b as d,E as a,c as m,A as j,F as l,Q as b,Z as p,m as h}from"./index-BGJgxqST.js";import{I as f,E as c}from"./Interaktiv-Bbglsg7Y.js";import{C as k}from"./ConceptFlow-DHzg4T41.js";function s({q:t,children:n}){return e.jsxs("li",{className:"space-y-1",children:[e.jsx("div",{children:t}),e.jsxs("details",{className:`px-3 py-1.5 text-sm ${u}`,children:[e.jsx("summary",{className:`cursor-pointer select-none font-medium ${g}`,children:"Lösung anzeigen"}),e.jsx("div",{className:"pt-1.5",children:n})]})]})}function o(t){const n={a:"a",em:"em",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:[`Statistik ist heute, wie das maschinelle Lernen, Rechnerarbeit: Jedes Modell, das
wir fitten, und jede Prognose, die wir berechnen, entsteht durch einen Algorithmus
auf einem Rechner. In diesem Skript lernen wir die mathematischen Konzepte, mit
denen wir solche Algorithmen entwickeln, verstehen und beurteilen können. Die
Leitfrage lautet: `,e.jsx(n.em,{children:"Wie berechnen wir das schnell, speichersparend und zuverlässig?"})]}),`
`,e.jsx(n.h3,{children:"Warum Numerik?"}),`
`,e.jsxs(n.p,{children:[`Ein Beispiel zeigt, warum die Formeln aus den Statistik-Vorlesungen allein nicht
reichen. Wir wollen ein
`,e.jsx(r,{id:"linear-regression",children:"lineares Regressionsmodell"}),` mit
`,e.jsx(i,{children:"p = 10\\,000"})," Merkmalen auf ",e.jsx(i,{children:"n = 100\\,000"}),` Beobachtungen trainieren,
also das `,e.jsx(r,{id:"linear-least-squares",children:"Kleinste-Quadrate-Problem"})]}),`
`,e.jsx(d,{children:"\\min_{\\bbeta \\in \\R^p} \\left\\| \\bX\\bbeta - \\by \\right\\|_2^2"}),`
`,e.jsxs(n.p,{children:["lösen. Hat ",e.jsx(i,{children:"\\bX"}),` vollen Spaltenrang, liefert die Theorie die Formel
`,e.jsx(i,{children:"\\wh{\\bbeta} = (\\bX^\\top\\bX)^{-1}\\bX^\\top\\by"}),`. Wer sie wörtlich in
den Rechner tippt, bekommt drei Probleme. Das erste ist die `,e.jsx(n.em,{children:"Kondition"}),`: Die
Matrix `,e.jsx(i,{children:"\\bX^\\top\\bX"}),` kann so empfindlich sein, dass winzige
`,e.jsx(r,{id:"rounding-error",children:"Rundungsfehler"}),` das Ergebnis komplett
verfälschen. Das zweite ist die `,e.jsx(n.em,{children:"Komplexität"}),`: Das
`,e.jsx(r,{id:"matrix-inverse",children:"Invertieren"}),` kostet
`,e.jsx(r,{id:"big-o-notation",children:e.jsx(i,{children:"O(p^3)"})}),` Rechenoperationen, für
`,e.jsx(i,{children:"p = 10\\,000"})," rund ",e.jsx(i,{children:"10^{12}"}),` Gleitkommaoperationen. Das dritte ist der
`,e.jsx(n.em,{children:"Speicher"}),": ",e.jsx(i,{children:"\\bX^\\top\\bX"}),` ist eine
`,e.jsx(i,{children:"p \\times p"}),`-Matrix und belegt allein schon etwa 800 MB. Wie es besser geht (mit der
`,e.jsx(r,{id:"qr-factorization",children:"QR-Zerlegung"}),`, der
`,e.jsx(r,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` oder
iterativen Verfahren), ist der Stoff dieses Skripts.`]}),`
`,e.jsxs(n.p,{children:[`Wie stark das erste Problem ins Gewicht fallen kann, zeigt schon ein
`,e.jsx(r,{id:"linear-system",children:"Gleichungssystem"})," mit zwei Unbekannten:"]}),`
`,e.jsxs(a,{kind:"Beispiel",label:"1.1.1 (Ein schlecht konditioniertes Problem)",id:"env-ein-schlecht-konditioniertes-problem",children:[e.jsxs(n.p,{children:["Wir lösen ",e.jsx(i,{children:"\\bA\\bx = \\bb"})," mit"]}),e.jsx(d,{children:"\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1{,}0001 \\end{pmatrix}, \\qquad \\bb = \\begin{pmatrix} 2 \\\\ 2{,}0001 \\end{pmatrix}."}),e.jsxs(n.p,{children:[`Subtrahieren wir die erste Zeile von der zweiten, bleibt
`,e.jsx(i,{children:"0{,}0001\\,x_2 = 0{,}0001"}),", also ",e.jsx(i,{children:"x_2 = 1"}),` und damit
`,e.jsx(i,{children:"x_1 = 1"}),`: Die exakte Lösung ist
`,e.jsx(i,{children:"\\cblue{\\bx} = \\cblue{(1, 1)^\\top}"}),`. Nun stören wir die rechte Seite
minimal im zweiten Eintrag, etwa so, wie es ein Rundungsfehler täte:`]}),e.jsx(d,{children:"\\cred{\\wt{\\bb}} = \\begin{pmatrix} 2 \\\\ \\cred{2{,}0002} \\end{pmatrix} \\quimpl 0{,}0001\\,x_2 = \\cred{0{,}0002} \\quimpl \\cred{\\wt{\\bx}} = \\cred{\\begin{pmatrix} 0 \\\\ 2 \\end{pmatrix}}."}),e.jsxs(n.p,{children:["Die Division durch ",e.jsx(i,{children:"0{,}0001"}),` verstärkt die winzige Störung um das Zehntausendfache:
Aus `,e.jsx(i,{children:"\\cblue{x_2 = 1}"})," wird ",e.jsx(i,{children:"\\cred{\\wt{x}_2 = 2}"}),`, aus
`,e.jsx(i,{children:"\\cblue{x_1 = 1}"})," wird ",e.jsx(i,{children:"\\cred{\\wt{x}_1 = 0}"}),`. Ein Datenfehler von 0,005 % erzeugt
einen Fehler von 100 % in der Lösung. Solche Probleme heißen
`,e.jsx(n.em,{children:"schlecht konditioniert"}),`. Die
`,e.jsx(r,{id:"condition-number",children:"Konditionszahl"})," misst das präzise."]})]}),`
`,e.jsx(n.p,{children:"Beim zweiten Problem, dem Rechenaufwand, kommt es auf den Algorithmus an:"}),`
`,e.jsxs(a,{kind:"Beispiel",label:"1.1.2 (Komplexität der Matrixmultiplikation)",id:"env-komplexitaet-matrixmultiplikation",children:[e.jsxs(n.p,{children:["Wir multiplizieren zwei ",e.jsx(i,{children:"n \\times n"}),"-Matrizen."]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Algorithmus"}),e.jsxs(n.th,{style:{textAlign:"right"},children:["Rechenoperationen für ",e.jsx(i,{children:"n = 1000"})]}),e.jsx(n.th,{style:{textAlign:"right"},children:"Komplexität"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Naive Methode"}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"\\approx 10^9"})}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"O(n^3)"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Strassen"}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"\\approx 6 \\cdot 10^8"})}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"O(n^{2{,}807})"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Asymptotisch schnellere Verfahren"}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"\\approx 2 \\cdot 10^8"})}),e.jsx(n.td,{style:{textAlign:"right"},children:e.jsx(i,{children:"O(n^{2{,}373})"})})]})]})]}),e.jsxs(n.p,{children:[`Die Exponenten liegen nah beieinander, machen bei großen Matrizen aber viel aus.
Für `,e.jsx(i,{children:"n = 10\\,000"})," stehen grob ",e.jsx(i,{children:"10^{12}"}),` Operationen der naiven Methode
etwa `,e.jsx(i,{children:"2 \\cdot 10^{10}"}),` der schnellsten Verfahren gegenüber, ein Faktor 50. Welches Verfahren
in der Praxis gewinnt, hängt allerdings auch von Konstanten und Speicherzugriffen ab.
Beim Schätzen großer Modelle fallen solche Produkte ständig an.`]})]}),`
`,e.jsx(n.h3,{children:"Die drei Teile des Skripts"}),`
`,e.jsxs(n.p,{children:["Der erste Teil, ",e.jsx(n.em,{children:"Numerische Lineare Algebra"}),`, klärt zunächst, wie empfindlich
ein Problem auf Störungen reagiert (Kondition) und was einen guten Algorithmus
ausmacht (Stabilität, Komplexität). Dann entwickelt er Matrixzerlegungen, mit
denen wir Gleichungssysteme und KQ-Probleme `,e.jsx(i,{children:"\\bA\\bx \\approx \\bb"}),` zuverlässig
lösen, statt naiv zu invertieren; zum Schluss kommen `,e.jsx(r,{id:"tensor",children:"Tensoren"})," dazu."]}),`
`,e.jsxs(n.p,{children:["Der zweite Teil, ",e.jsx(n.em,{children:"Analysis und Optimierung"}),`, verallgemeinert die
`,e.jsx(r,{id:"derivative",children:"Ableitung"}),` auf Funktionen mit Vektor-, Matrix-
und Tensor-Argumenten. Wozu? Beim Training
`,e.jsx(r,{id:"neural-network",children:"neuronaler Netze"}),` müssen wir
Verlustfunktionen wie
`,e.jsx(i,{children:"L(\\bW) = \\tfrac{1}{2}\\left\\| \\bX\\bW - \\bY \\right\\|_F^2"}),` nach einer
ganzen Matrix `,e.jsx(i,{children:"\\bW"}),` ableiten. Naiv wären das so viele einzelne
`,e.jsx(r,{id:"partial-derivative",children:"partielle Ableitungen"}),`, wie
`,e.jsx(i,{children:"\\bW"})," Einträge hat, bei ",e.jsx(i,{children:"1000 \\times 10"}),` schon
`,e.jsx(i,{children:"10\\,000"}),`. Der Matrixkalkül liefert stattdessen eine einzige Zeile,
`,e.jsx(i,{children:"\\partial L / \\partial \\bW = \\bX^\\top(\\bX\\bW - \\bY)"}),`, und die lässt sich auch
effizient implementieren. Darauf baut die numerische Optimierung auf. Die
Verlustfunktionen neuronaler Netze sind meist nicht `,e.jsx(r,{id:"convexity",children:"konvex"}),`, hängen
von sehr vielen Parametern ab (GPT-3 hat `,e.jsx(i,{children:"1{,}75 \\cdot 10^{11}"}),`) und werden pro
Schritt nur auf einem kleinen Teil der Daten ausgewertet, einem Minibatch.
Minima solcher Funktionen suchen wir mit
`,e.jsx(r,{id:"gradient-descent",children:"Gradientenverfahren"})," und ihren Verwandten wie SGD."]}),`
`,e.jsxs(n.p,{children:["Der dritte Teil, ",e.jsx(n.em,{children:"Funktionsapproximation"}),`, fragt: Wie ersetzen wir eine
komplizierte Funktion durch eine einfache, mit der sich gut rechnen lässt? Das
klassische Werkzeug ist die
`,e.jsx(r,{id:"taylor-series",children:"Taylor-Approximation"}),`: Schon die Näherung zweiter Ordnung um
`,e.jsx(i,{children:"x_0 = 0"}),", ",e.jsx(i,{children:"e^x \\approx 1 + x + \\tfrac{x^2}{2}"}),", liefert bei ",e.jsx(i,{children:"x = 0{,}5"}),` den
Wert `,e.jsx(i,{children:"1{,}625"})," statt ",e.jsx(i,{children:"e^{0{,}5} = 1{,}6487\\ldots"}),`, ein relativer
Fehler von unter 2 %. Später kommen flexiblere Bausteine wie Splines dazu, mit denen
die Statistik glatte Funktionen aus Daten schätzt.`]}),`
`,e.jsxs(n.p,{children:["Welches Kapitel im Einzelnen worauf aufbaut, zeigt die Landkarte in ",e.jsx(n.a,{href:"#sec-1.2",children:"Abschnitt 1.2"}),"."]}),`
`,e.jsx(n.h3,{children:"Wie dieses Skript funktioniert"}),`
`,e.jsxs(n.p,{children:[`Der Haupttext deckt den Stoff der Vorlesung vollständig ab. Die gelben Boxen
mit der Marke „Vertiefung · optional" gehen darüber hinaus (weitere Beweise,
Exkurse, Übersichten) und lassen sich überspringen; die ersten beiden stehen in
`,e.jsx(n.a,{href:"#sec-1.2",children:"Abschnitt 1.2"}),"."]}),`
`,e.jsxs(n.p,{children:["Gepunktet unterstrichene Begriffe wie ",e.jsx(r,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),`
öffnen Tooltips, die das nötige Vorwissen auffrischen, oft mit weiteren Links
bis zu den Grundlagen. Blaue „Interaktiv"-Kästen gehören zum Haupttext; sie
enthalten Widgets mit einer Aufgabe und ihrer Auswertung.
Beweise lassen sich Schritt für Schritt aufdecken, jeder nichttriviale Schritt
trägt seine Begründung. Die kursive Zeile „Vertiefung: …" am Ende eines
Abschnitts nennt Literatur zum Weiterlesen.`]}),`
`,e.jsx(n.h3,{children:"Selbsttest: Reicht das Vorwissen?"}),`
`,e.jsxs(n.p,{children:[`Das Skript setzt Lineare Algebra I, Analysis I und etwas R-Programmierung voraus. Die
folgenden Fragen sollten wir nach kurzem Nachdenken beantworten können.
Wer hängen bleibt, klappt die Lösung auf und frischt das Thema per Tooltip auf. Für die
geometrische Intuition empfehlen sich außerdem die Videos von
`,e.jsx(n.em,{children:"3blue1brown"}),' („Essence of Linear Algebra").']}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Lineare Algebra:"})}),`
`,e.jsxs("ol",{className:"max-w-prose list-decimal space-y-3 pl-5",children:[e.jsx(s,{q:e.jsx(e.Fragment,{children:"Was ist der Rang einer Matrix? Wie berechnen wir ihn?"}),children:e.jsxs(n.p,{children:["Der ",e.jsx(r,{id:"rank",children:"Rang"}),` ist die Anzahl linear unabhängiger
Spalten (gleichwertig: Zeilen), also die Dimension des
`,e.jsx(r,{id:"image",children:"Bildes"}),` der zugehörigen Abbildung. Von Hand
berechnen wir ihn z. B. per
`,e.jsx(r,{id:"gaussian-elimination",children:"Gauß-Elimination"}),`: Rang = Anzahl
der Nichtnullzeilen in der Stufenform.`]})}),e.jsx(s,{q:e.jsxs(e.Fragment,{children:["Was bedeutet es, dass eine Matrix ",e.jsx(i,{children:"\\bA"})," invertierbar ist?"]}),children:e.jsxs(n.p,{children:["Es gibt eine Matrix ",e.jsx(i,{children:"\\bA^{-1}"}),` mit
`,e.jsx(i,{children:"\\bA\\bA^{-1} = \\bA^{-1}\\bA = \\bI"}),`
(`,e.jsx(r,{id:"matrix-inverse",children:"Inverse"}),`). Das geht nur für quadratisches
`,e.jsx(i,{children:"\\bA"}),", und zwar genau dann, wenn ",e.jsx(i,{children:"\\bA"}),` vollen Rang hat. Gleichwertig:
`,e.jsx(i,{children:"\\det(\\bA) \\neq 0"}),", ",e.jsx(i,{children:"0"})," ist kein Eigenwert, und ",e.jsx(i,{children:"\\bA\\bx = \\bb"}),` hat
für jedes `,e.jsx(i,{children:"\\bb"})," genau eine Lösung."]})}),e.jsx(s,{q:e.jsx(e.Fragment,{children:"Was sind Eigenwerte und Eigenvektoren? Wie finden wir sie?"}),children:e.jsxs(n.p,{children:["Ein ",e.jsx(r,{id:"eigenvalue-eigenvector",children:"Eigenvektor"}),`
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
(`,e.jsx(r,{id:"continuity",children:"Stetigkeit"}),"). Formal, in jedem Punkt ",e.jsx(i,{children:"x_0"}),`: Zu jedem
`,e.jsx(i,{children:"\\eps > 0"})," gibt es ein ",e.jsx(i,{children:"\\delta > 0"}),`, sodass
`,e.jsx(i,{children:"|x - x_0| < \\delta"})," stets ",e.jsx(i,{children:"|f(x) - f(x_0)| < \\eps"})," erzwingt."]})}),e.jsx(s,{q:e.jsxs(e.Fragment,{children:["Was ist die Ableitung ",e.jsx(i,{children:"f'(x_0)"})," geometrisch?"]}),children:e.jsxs(n.p,{children:["Die Steigung der ",e.jsx(r,{id:"tangent-line",children:"Tangente"}),` an den Graphen
von `,e.jsx(i,{children:"f"})," im Punkt ",e.jsx(i,{children:"x_0"}),`, also die momentane Änderungsrate von
`,e.jsx(i,{children:"f"})," an dieser Stelle (",e.jsx(r,{id:"derivative",children:"Ableitung"}),")."]})}),e.jsx(s,{q:e.jsx(e.Fragment,{children:"Was unterscheidet ein lokales von einem globalen Minimum?"}),children:e.jsxs(n.p,{children:["Ein lokales Minimum ",e.jsx(i,{children:"x_0"})," erfüllt ",e.jsx(i,{children:"f(x_0) \\leq f(x)"}),` nur für alle
`,e.jsx(i,{children:"x"})," in einer ",e.jsx(r,{id:"neighborhood",children:"Umgebung"}),` von
`,e.jsx(i,{children:"x_0"}),"; ein globales Minimum für ",e.jsx(n.em,{children:"alle"})," ",e.jsx(i,{children:"x"}),` im
Definitionsbereich. Bei nichtkonvexen Zielfunktionen können
`,e.jsx(r,{id:"gradient-descent",children:"Abstiegsverfahren"}),` an lokalen Minima oder anderen
stationären Punkten enden, bei konvexen ist jedes lokale Minimum global.`]})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Heath §1 (wissenschaftliches Rechnen: Näherungen, Fehler, Kondition im
Überblick); MML, Vorwort und Teil I als Panorama der Mathematik hinter dem maschinellen
Lernen.`})})]})}function w(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}const v={1:"Worum geht's?",2:"Algorithmen & Komplexität",3:"Spur & Matrixnormen",4:"Fehler, Kondition & Stabilität",5:"Lineare Gleichungssysteme",6:"Singulärwertzerlegung",7:"Kleinste Quadrate",8:"Numerische LA: Iteration & Zufall",9:"Tensoren & Tensorprodukte",10:"Differentialrechnung",11:"Konvexität",12:"Gleichungen & Optimierung",13:"Funktionsapproximation"},z=440,A=128,K=62,S=44,M=t=>A+(t-1)*K+(t>=10?18:0)+(t>=13?18:0),y=t=>t<=9?"teil1":t<=12?"teil2":"teil3",D=m.map(t=>({id:String(t.num),label:[v[t.num]],badge:String(t.num),name:`Kap. ${t.num} · ${t.title}`,x:z,y:M(t.num),w:285,h:S,group:y(t.num),href:`?k=${t.id}`})),R=[{id:"LA",label:["Lineare Algebra I"],x:265,y:40,w:150,h:34,group:"vor"},{id:"AN",label:["Analysis I"],x:440,y:40,w:130,h:34,group:"vor"},{id:"R",label:["R-Programmierung"],x:620,y:40,w:155,h:34,group:"vor"}],L=[{from:"LA",to:"1"},{from:"AN",to:"1"},{from:"R",to:"1"},{from:"AN",to:"10",side:"left"},{from:"LA",to:"13",side:"left"},...Array.from({length:11},(t,n)=>({from:String(n+1),to:String(n+2)})),{from:"3",to:"5",side:"right"},{from:"3",to:"6",side:"right"},{from:"4",to:"7",side:"right"},{from:"5",to:"7",side:"right"},{from:"2",to:"8",side:"right"},{from:"6",to:"8",side:"right"},{from:"6",to:"9",side:"right"},{from:"3",to:"10",side:"left"},{from:"4",to:"12",side:"left"},{from:"10",to:"12",side:"right"},{from:"11",to:"13",side:"right"},{from:"1",to:"13",side:"left"},{from:"7",to:"13",side:"left"},{from:"9",to:"13",side:"left"}];function F(){return e.jsxs("div",{children:[e.jsx(j,{children:"Tippen wir ein Kapitel an und verfolgen wir seine direkten Voraussetzungen und Folgen."}),e.jsx("div",{className:"[&>div]:overflow-x-auto [&_svg]:min-w-[680px] lg:[&_svg]:min-w-0",children:e.jsx(k,{ariaLabel:"Abhängigkeitskarte der 13 Kapitel: Lesereihenfolge von oben nach unten, Bögen zeigen, welche Kapitel über die Reihenfolge hinaus aufeinander aufbauen.",nodes:[...R,...D],edges:L,groups:[{key:"vor",label:"Vorwissen",color:l.grau},{key:"teil1",label:"Einführung und Teil 1 · Numerische lineare Algebra (Kap. 1–9)",color:l.blau},{key:"teil2",label:"Teil 2 · Analysis & Optimierung (Kap. 10–12)",color:l.orange},{key:"teil3",label:"Teil 3 · Funktionsapproximation (Kap. 13)",color:l.violett}],openLabel:"Kapitel öffnen"})})]})}function x(t){const n={a:"a",em:"em",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:[`Die dreizehn Kapitel dieses Skripts sind zum Lesen von vorne nach hinten
gebaut, ihre Abhängigkeiten folgen dieser Reihenfolge aber nur zum Teil. Manche
Kapitel sind Fundament für fast alles Spätere (die Normen aus
`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm",children:"Kapitel 3"}),", die Fehleranalyse aus ",e.jsx(n.a,{href:"?k=04-fehler",children:"Kapitel 4"}),`), andere stützen sich
auf weit zurückliegende Kapitel: Die Funktionsapproximation in Teil 3 etwa
braucht aus Teil 2 wenig, aus Teil 1 dafür umso mehr.`]}),`
`,e.jsxs(f,{title:"Landkarte: worauf ein Kapitel aufbaut und wohin es führt",children:[e.jsx(F,{}),e.jsx(n.p,{children:`Die Kästen sind die Kapitel in Lesereihenfolge, die Bögen Abhängigkeiten über
Nachbarkapitel hinweg. Wählen wir ein Kapitel aus, hebt die Karte hervor, worauf
es aufbaut und wohin es führt. Das hilft vor dem Lesen (was sollten wir parat
haben?) und bei der Prüfungsvorbereitung (wofür brauchen wir das noch?).`})]}),`
`,e.jsxs(c,{title:"Die Kapitel im Detail",children:[e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Teil 1: Numerische lineare Algebra (Kapitel ",e.jsx(n.a,{href:"?k=02-algos",children:"2"})," bis ",e.jsx(n.a,{href:"?k=09-tensoren",children:"9"}),")."]}),`
`,e.jsx(n.a,{href:"?k=02-algos",children:"Kapitel 2"}),` stellt die Sprache bereit: was ein numerisches Problem, ein
Algorithmus und sein Aufwand in `,e.jsx(r,{id:"big-o-notation",children:"Landau-Notation"}),` ist.
`,e.jsx(n.a,{href:"?k=03-matrix-spur-norm",children:"Kapitel 3"}),` liefert die Messwerkzeuge (Spur und
`,e.jsx(r,{id:"matrix-norm",children:"Matrixnormen"}),"), ",e.jsx(n.a,{href:"?k=04-fehler",children:"Kapitel 4"}),` die zentrale Unterscheidung des
Skripts: `,e.jsx(n.em,{children:"Kondition"})," ist eine Eigenschaft des Problems, ",e.jsx(n.em,{children:"Stabilität"}),` eine
Eigenschaft des Algorithmus, und nur an letzterer können wir drehen. Darauf
bauen die Rechenkerne auf: `,e.jsx(n.a,{href:"?k=05-lgs",children:"Kapitel 5"}),` löst Gleichungssysteme über
Zerlegungen (`,e.jsx(r,{id:"lu-decomposition",children:"LU"}),` und
`,e.jsx(r,{id:"cholesky-factorization",children:"Cholesky"}),`) und hält sich damit an die goldene
Regel, `,e.jsx(n.em,{children:"niemals eine Matrix zu invertieren"}),`.
`,e.jsx(n.a,{href:"?k=06-svd",children:"Kapitel 6"}),` entwickelt mit der
`,e.jsx(r,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` die vielseitigste
Matrixzerlegung, und `,e.jsx(n.a,{href:"?k=07-kq",children:"Kapitel 7"}),`
vergleicht drei Lösungswege für das
`,e.jsx(r,{id:"linear-least-squares",children:"Kleinste-Quadrate-Problem"}),` (Normalengleichungen,
`,e.jsx(r,{id:"qr-factorization",children:"QR"}),", SVD) nach den Kriterien aus ",e.jsx(n.a,{href:"?k=04-fehler",children:"Kapitel 4"}),`.
`,e.jsx(n.a,{href:"?k=08-la-misc",children:"Kapitel 8"}),` tauscht dann Exaktheit gegen Geschwindigkeit
(Iteration und Zufall, von der Potenzmethode bis zum Matrix-Sketching), und
`,e.jsx(n.a,{href:"?k=09-tensoren",children:"Kapitel 9"})," baut mit ",e.jsx(r,{id:"tensor",children:"Tensoren"}),` und
Tensorprodukten multivariate Strukturen aus univariaten Bausteinen.`]}),e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Teil 2: Analysis & Optimierung (Kapitel ",e.jsx(n.a,{href:"?k=10-differentialrechnung",children:"10"}),` bis
`,e.jsx(n.a,{href:"?k=12-optim",children:"12"}),")."]})," ",e.jsx(n.a,{href:"?k=10-differentialrechnung",children:"Kapitel 10"}),` verallgemeinert die Ableitung nach dem
Prinzip „Ableitung = lineare Approximation" auf Vektoren und Matrizen
(`,e.jsx(r,{id:"gradient",children:"Gradient"}),`, Jacobi-Matrix) und baut darauf die Rechenregeln,
die `,e.jsx(r,{id:"hessian-matrix",children:"Hesse-Matrix"}),` und die
`,e.jsx(r,{id:"taylor-series",children:"Taylor-Entwicklung"}),` auf; nebenbei ergeben sich die
`,e.jsx(r,{id:"normal-equations",children:"Normalengleichungen"})," aus ",e.jsx(n.a,{href:"?k=07-kq",children:"Kapitel 7"}),` als kurze Rechnung im
Matrixkalkül. `,e.jsx(n.a,{href:"?k=11-konvexitaet",children:"Kapitel 11"}),` behandelt
`,e.jsx(r,{id:"convexity",children:"Konvexität"}),`, die Eigenschaft, die aus lokalen Verfahren
globale macht: Bei konvexen Zielfunktionen ist jedes lokale Minimum bereits
das globale. `,e.jsx(n.a,{href:"?k=12-optim",children:"Kapitel 12"}),` sortiert die Verfahren dann nach der Ordnung der
verwendeten Ableitungen: Nelder-Mead (nullte),
`,e.jsx(r,{id:"gradient-descent",children:"Gradientenabstieg"}),` mit Line Search und SGD (erste),
`,e.jsx(r,{id:"newtons-method",children:"Newton"}),` und Quasi-Newton (zweite), dazu Optimierung
unter Nebenbedingungen. Eine feinere Karte dieses Teils, von der
Fréchet-Ableitung bis zu den KKT-Bedingungen, steht am Anfang von
`,e.jsx(n.a,{href:"?k=10-differentialrechnung",children:"Kapitel 10"}),"."]}),e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Teil 3: Funktionsapproximation (Kapitel ",e.jsx(n.a,{href:"?k=13-funktionsapproximation",children:"13"}),")."]}),`
`,e.jsx(n.a,{href:"?k=13-funktionsapproximation",children:"Kapitel 13"}),` überträgt zuerst
die Idee der `,e.jsx(r,{id:"basis",children:"Basis"})," aus dem ",e.jsx(i,{children:"\\R^n"}),` auf Funktionenräume, stellt
Funktionen als Linearkombination `,e.jsx(i,{children:"\\wh{f} = \\sum_k a_k \\phi_k"}),` von
Basisfunktionen dar (die Koeffizienten liefert wieder ein Gleichungssystem
oder ein KQ-Problem) und erklärt, warum Polynominterpolation mit hohem Grad
scheitern kann (Runge-Phänomen) und B-Splines funktionieren. Die zweite Hälfte
des Kapitels macht daraus Statistik: Glättung verrauschter Daten als Regressionsproblem,
die Bias-Varianz-Abwägung bei der Wahl der Basisgröße und der Fluch der
Dimension im Multivariaten, den additive Modelle (GAMs) umgehen. Aus Teil 2
braucht dieser Teil wenig; er stützt sich vor allem auf die Kapitel
`,e.jsx(n.a,{href:"?k=01-intro",children:"1"}),", ",e.jsx(n.a,{href:"?k=04-fehler",children:"4"}),", ",e.jsx(n.a,{href:"?k=05-lgs",children:"5"}),", ",e.jsx(n.a,{href:"?k=07-kq",children:"7"})," und ",e.jsx(n.a,{href:"?k=09-tensoren",children:"9"}),`. Die feinere Karte
dazu steht am Anfang von `,e.jsx(n.a,{href:"?k=13-funktionsapproximation",children:"Kapitel 13"}),"."]})]}),`
`,e.jsxs(c,{title:"Was sich durch das ganze Skript zieht",children:[e.jsx(n.p,{children:"Vier Themen kehren im ganzen Skript wieder."}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Stabilität."})," Die ",e.jsx(r,{id:"condition-number",children:"Konditionszahl"}),` gibt das Problem vor,
die Stabilität wählen wir mit dem Algorithmus: Er soll Fehler nicht zusätzlich
verstärken. Deshalb lösen wir mit Zerlegungen statt per Inversion, arbeiten wo
immer möglich mit `,e.jsx(r,{id:"orthogonal-matrix",children:"orthogonalen Matrizen"}),` (perfekt
konditioniert, `,e.jsx(i,{children:"\\kappa = 1"}),`) und führen schlecht konditionierte Teilschritte
möglichst früh aus.`]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Rechenaufwand."})," Die typischen Größenordnungen: Vektoroperationen ",e.jsx(i,{children:"O(n)"}),`,
`,e.jsx(r,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkte"})," ",e.jsx(i,{children:"O(n^2)"}),`,
Matrixzerlegungen `,e.jsx(i,{children:"O(n^3)"}),", iterative Verfahren ",e.jsx(i,{children:"O(n^2 \\log(1/\\eps))"}),` bis
zur Genauigkeit `,e.jsx(i,{children:"\\eps"}),` und, als Warnung, der Fluch der Dimension:
`,e.jsx(i,{children:"O(K^p)"})," bei ",e.jsx(i,{children:"K"})," Basisfunktionen je Richtung in ",e.jsx(i,{children:"p"})," Dimensionen."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Matrixzerlegungen."}),` Die Zerlegungen aus Teil 1, auf die alles Spätere
zurückgreift:`]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Zerlegung"}),e.jsx(n.th,{children:"Form"}),e.jsx(n.th,{children:"Kapitel"}),e.jsx(n.th,{children:"typischer Einsatz"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"LU"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bL\\bU"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"?k=05-lgs",children:"5"})}),e.jsx(n.td,{children:"allgemeine Gleichungssysteme"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Cholesky"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bL\\bL^\\top"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"?k=05-lgs",children:"5"})}),e.jsxs(n.td,{children:["SPD-Matrizen, Simulation aus ",e.jsx(i,{children:"\\Ncal(\\bnull, \\bSigma)"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"QR"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bQ\\bR"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"?k=07-kq",children:"7"})}),e.jsx(n.td,{children:"Kleinste Quadrate, stabil"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"SVD"}),e.jsx(n.td,{children:e.jsx(i,{children:"\\bA = \\bU\\bSigma\\bV^\\top"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"?k=06-svd",children:"6"})}),e.jsx(n.td,{children:"universell: Rang, Pseudoinverse, Approximation"})]})]})]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Von exakt zu approximativ."}),` Je allgemeiner die Problemklasse, desto
schwächer die Garantien: Lineare Gleichungssysteme lösen wir mit Zerlegungen
in endlich vielen Schritten exakt (bis auf Rundungsfehler),
Kleinste-Quadrate-Probleme als Projektion. Nichtlineare Gleichungen lösen wir
nur noch iterativ (Newton), allgemeine Optimierungsprobleme mit
Gradientenverfahren, die lokal suchen. Erst `,e.jsx(r,{id:"convexity",children:"Konvexität"}),` gibt
globale Garantien zurück. Die
Funktionsapproximation schließlich tauscht Genauigkeit gegen Aufwand.`]})]}),`
`,e.jsx(n.h3,{children:"Selbsttest"}),`
`,e.jsx(b,{children:e.jsxs(p,{loesung:3,toleranz:0,children:[e.jsxs(n.p,{children:["Wie viele Kapitel bauen laut der Karte direkt auf ",e.jsx(n.a,{href:"?k=06-svd",children:"Kapitel 6"})," auf?"]}),e.jsxs(n.p,{children:["Drei ausgehende Pfeile: ",e.jsx(n.a,{href:"?k=07-kq",children:"7"}),", ",e.jsx(n.a,{href:"?k=08-la-misc",children:"8"})," und ",e.jsx(n.a,{href:"?k=09-tensoren",children:"9"}),"."]})]})}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:`Vertiefung: Die Referenzen des Skripts, nach Teilen sortiert. Zu Teil 1
Heath, Scientific Computing, §1–4 (und §11 für die iterativen Verfahren)
sowie MML §2–4; zu Teil 2 MML §5 und §7 und Heath §5–6, für die Konvexität
Boyd & Vandenberghe, Convex Optimization (frei verfügbar); zu Teil 3
Heath §7.`})})]})}function T(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(x,{...t})}):x(t)}const _={sections:[{id:"1.1",key:"worum",title:"Worum geht es in diesem Skript?",C:h(w)},{id:"1.2",key:"landkarte",title:"Landkarte des Skripts",C:h(T)}]};export{_ as default};
