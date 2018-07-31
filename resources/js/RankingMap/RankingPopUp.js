/*
for everything about initializing and creating popups in fitting situations, an example of the openlayers website has helped
(inspirational source: https://openlayers.org/en/latest/examples/popup.html)
*/

var RankingMap = RankingMap || {};

RankingMap.RankingPopUp = function() {
    
    const rankingURI = "./data/spi_global_rankings.csv";
    
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
    
    const overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    
    var that = {};
    
    function init(){
        return that;
    }
    
    /*
    firstly this function finds the coordinates of the users click event;
    after initializing a closer for the popups, the markersList in the DOM gets a onclick listener that initially checks which view is present (top 50 or league view?);
    if it's the top 50 view, initTop50PopUp() gets called;
    if it's the league view, the listener creates a popup that shows the important details of last season's table for the club (which was selected through clicking of the user) and sets it to the saved coordinates of the onclick event;
    */
    
    function initPopUps(map, markersDOMList, uriList){
        var coordinate;
        map.addEventListener("click", function(event){
            coordinate = event.coordinate;
        });
        
        closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
          };
        
        markersDOMList.addEventListener("click", function(event){
            if(isTop50View(markersDOMList)){
                initTop50PopUp(event, coordinate);
            } else {
                for(let i = 0; i < markersDOMList.childElementCount; i++){
                    if(!markersDOMList.children[i].classList.contains("hidden")){
                        d3.csv(rankingURI, function(spiData){
                            var leagueName = getLeagueName(event, spiData),
                                leagueURI = getLeagueURIByEvent(leagueName);
                            d3.csv(uriList[leagueURI], function(leagueData){
                                var listEntry;
                                for(let i = 0; i < leagueData.length; i++){
                                    if(leagueData[i].name == event.target.getAttribute("id")){
                                        listEntry = leagueData[i];
                                    }
                                }
                                content.innerHTML = '<p style="font-size:130%;">Nationale Leistung 2017/2018:</p>' 
                                    + '<p>Team: <code>' + listEntry.name
                                    + '</code></p><p>Endplatzierung: <code>'+ listEntry.place
                                    + '</code></p><p>Sieg/Remis/Niederlage: <code>' + listEntry.wins + '/' + listEntry.draws + '/' + listEntry.losses 
                                    + '</code></p><p>Erzielte Tore: <code>' + listEntry.goals
                                    + '</code></p><p>Gegentore: <code>' + listEntry.conceded  
                                    + '</code></p><p>Tordifferenz: <code>' + listEntry.goaldif  
                                    + '</code></p><p>Gesamtpunktzahl: <code>' + listEntry.points + '</code></p>';
                                overlay.setPosition(coordinate);
                            });
                        });
                        break;
                    }
                }
            }
        
    });
    }
    
    /*
    checks with the given leagueName which URI is needed (for displaying popup stats);
    */
    
    function getLeagueURIByEvent(leagueName){
            if(leagueName == "German Bundesliga"){
                return "bundesligaURI";
            } else if (leagueName == "Spanish Primera Division"){
                return "laligaURI";
            } else if (leagueName == "Barclays Premier League"){
                return "premierleagueURI";
            } else if (leagueName == "French Ligue 1"){
                return "ligue1URI";
            } else if (leagueName == "Italy Serie A"){
                return "serieaURI";
            }
    }
    
    /*
    tries to find out the league name by comparing event's id and all names in the SPI dataset list;
    after retrieving the right listEntry of the spiData array, the name of the league can easily be extracted;
    */
    
    function getLeagueName(event, spiData){
        var leagueName;
        for(let i = 0; i < spiData.length; i++){
            if(spiData[i].name == event.target.getAttribute("id")){
                leagueName = spiData[i].league;
            }
        }
        return leagueName;
    }
    
    /*
    initializes a popup in the top50 view;
    every important information about the clubs SPI stats gets taken in account and is shown in the end via popup;
    */
    
    function initTop50PopUp(event, coordinate){
        d3.csv(rankingURI, function(data){
                    var listEntry;
                    for(let i = 0; i < data.length; i++){
                        if(data[i].name == event.target.getAttribute("id")){
                            listEntry = data[i];
                        }
                    }
                    content.innerHTML = '<p style="font-size:130%;">Soccer Power Index (SPI):</p>' 
                        + '<p>Team: <code>' + listEntry.name
                        + '</code></p><p>Liga: <code>'+ listEntry.league
                        + '</code></p><p>SPI Ranking: <code>' + listEntry.rank 
                        + '</code></p><p>SPI Rating: <code>' + listEntry.spi 
                        + '</code></p><p>SPI Offensiv-Rating: <code>' + listEntry.off 
                        + '</code></p><p>SPI Defensiv-Rating: <code>' + listEntry.def + '</code></p>';
                    overlay.setPosition(coordinate);
                });
    }
    
    /*
    checks if the current state of the map is the top 50 view by controlling if first created 50 markers don't contain class "hidden";
    */
    
    function isTop50View(markersDOMList){
        var markerCount = markersDOMList.childElementCount;
        for(let i = 0; i < 50; i++){
            if(markersDOMList.children[(markerCount - 1) - i].classList.contains("hidden")){
                return false;
            }
        }
        return true;
    }            
    
    /*
    returns the popup overlay for adding it to the (ranking) map in the main map module;
    */
    
    function getPopUpOverlay(){
        return overlay;
    }
    
    that.init = init;
    that.initPopUps = initPopUps;
    that.getPopUpOverlay = getPopUpOverlay;

    return that;
};