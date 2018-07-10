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
    
    function getLeagueName(event, spiData){
        var leagueName;
        for(let i = 0; i < spiData.length; i++){
            if(spiData[i].name == event.target.getAttribute("id")){
                leagueName = spiData[i].league;
            }
        }
        return leagueName;
    }
    
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
    
    function isTop50View(markersDOMList){
        var markerCount = markersDOMList.childElementCount;
        for(let i = 0; i < 50; i++){
            if(markersDOMList.children[(markerCount - 1) - i].classList.contains("hidden")){
                return false;
            }
        }
        return true;
    }            
                
    function getPopUpOverlay(){
        return overlay;
    }
    
    that.init = init;
    that.initPopUps = initPopUps;
    that.getPopUpOverlay = getPopUpOverlay;

    return that;
};