# InfoVis

# 16. MAI (Pascal): 

Erste Tests mit OpenLayers, habe mal probehalber eine Test-Map erstellt, um die Darstellung der Map zu prüfen. Dazu habe ich noch eine Funktion geschrieben, die mal den Rankings Datensatz ausliest in eine List aus Arrays. Funktioniert aber nur im Firefox oder der Brackets Vorschau, in Chrome liest er die Daten nicht aus.
D3 libraries habe ich auch direkt mit in den Ordner und im Projekt eingebunden.

# 18. MAI (Pascal): 

Habe mal anhand von einer Top 20 Website einen Investoren Datensatz erstellt. Werde den im Laufe des Tages eventuell dann noch erweitern. (http://www.handelsblatt.com/sport/fussball/ranking-der-investoren-der-club-der-fussball-milliardaere/19389036.html)

# 25. MAI (Pascal): 

Top 6000 Transfers wurden gescrapt von transfermarkt.de und in CSV File gespeichert - zudem wurde die Liste komplett als Array eingelesen und die Links in Klammern hinter den Daten jeweils programmatisch entfernt.

# 20. JUNI (Manar):

Ein Google Geocoder wurde erfolgreich eingebunden, auch der Test (Textbox und Button zum generieren von LonLat) war erfolgreich. Lediglich Darstellungsprobleme treten auf.

# 20. JUNI (Pascal):

Darstellung funktioniert nun - durch ständiges Überschreiben einer gespeicherten Map Variable wurde das Problem behoben.

# 20. JUNI (Manar, Fabian, Pascal):

Erstplatzierter des Europa Rankings nun im Zentrum der Karten-Darstellung und mit einem Marker versehen.

# 21. JUNI (Pascal):

Es wurde programmatisch gelöst allen Top 50 Clubs einen Marker zuzuweisen, in der Darstellung und Verarbeitung ergeben sich jedoch folgende Probleme:

-> "google is not defined" Error tritt regelmäßg auf (bei jedem zweiten Versuch)
-> "OVER_QUERY_LIMIT" Error verhindert mehrere Anfragen an die API in wenigen Sekunden (funktioniert für circa 20, nicht mehr bisher)
-> "ZERO-RESULTS" Error erscheint offensichtlich für einen Club (noch nicht festgestellt welcher)