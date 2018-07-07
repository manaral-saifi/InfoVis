var RankingMap = RankingMap || {};

RankingMap.RankingZoomManagement = function(options) {
    
    var that = {},
        buttonsList;
    
    function init(){
        buttonsList = options.buttonsList;
        return that;
    }
    
    function addEventListeners(map){
         buttonsList.querySelector("#top50").addEventListener("click", function(){
            onMapClicked("top50");
            showTop50(map);
        });
        buttonsList.querySelector("#bundesliga").addEventListener("click", function(){
            onMapClicked("bundesligaURI");
            showBundesliga(map);
        });
        buttonsList.querySelector("#laliga").addEventListener("click", function(){
            onMapClicked("laligaURI");
            showLaLiga(map);
        });
        buttonsList.querySelector("#ligue1").addEventListener("click", function(){
            onMapClicked("ligue1URI");
            showLigue1(map);
        });
        buttonsList.querySelector("#premierleague").addEventListener("click", function(){
            onMapClicked("premierleagueURI");
            showPremierLeague(map);
        });
        buttonsList.querySelector("#seriea").addEventListener("click", function(){
            onMapClicked("serieaURI");
            showSerieA(map);
        });
    }
 
    function onMapClicked(uri){
        RankingMap.createLeague(uri);
    }
    
    function showTop50(map){
        var top50 = ol.proj.fromLonLat([11.62605618029147, 48.22014868029149]);
        map.getView().animate(
            {zoom: 5}, {center: top50}, {duration: 2000}
        );
    }
    function showBundesliga(map){
        var germany = ol.proj.fromLonLat([9.9167, 51.5167]);
        map.getView().animate(
            {zoom: 6.5}, {center: germany}, {duration: 2000}
        );
    }

    function showSerieA(map){
        var italy = ol.proj.fromLonLat([12.5673, 41.8719]);
        map.getView().animate(
            {zoom: 6.2}, {center: italy}, {duration: 2000}
        );
    }

    function showLigue1(map){
        var france = ol.proj.fromLonLat([2.2137, 46.2276]);
        map.getView().animate(
            {zoom: 6.5}, {center: france}, {duration: 2000}
        );
    }

    function showLaLiga(map){
        var spain = ol.proj.fromLonLat([-3.7492, 40.4636]);
        map.getView().animate(
            {zoom: 6.6}, {center: spain}, {duration: 2000}
        );
    }

    function showPremierLeague(map){
        var greatBritain = ol.proj.fromLonLat([-2.0727, 53.7190]);
        map.getView().animate(
            {zoom: 6.5}, {center: greatBritain}, {duration: 2000}
        );
    }
    
    that.init = init;
    that.addEventListeners = addEventListeners;
    
    return that;
};