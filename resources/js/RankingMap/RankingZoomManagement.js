var RankingMap = RankingMap || {};

RankingMap.RankingZoomManagement = function(options) {
    
    var that = {},
        buttonsList,
        vector;
    
    function init(){
        buttonsList = options.buttonsList;
        return that;
    }
    
    /*
    sets the listeners to the league buttons;
    after checking which kind of URI (league or SPI) is present (in context of the mouse click on a button), the right ranking gets visualized and an animation brings the user to the center of the chosen ranking;
    */
    
    function addEventListeners(map){
         buttonsList.querySelector("#top50").addEventListener("click", function(){
            onMapClicked("rankingURI");
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
 
    /*
    firstly checks which kind of URI (SPI or league) and then creates (or goes back to already created) set of markers that fit
    to the given uri;
    */
    
    function onMapClicked(uri){
        if(uri == "rankingURI"){
            RankingMap.returnToTop50();
        } else {
            RankingMap.createLeague(uri);
        }
    }
    
    /*
    after generating team weights (according to the place of a club in the league ranking) the height and width of the logo
    markers gets modified with those weights, so the difference in the ranking is visible*/
    
    function setMarkerSizesByLeagueRank(leagueURI, markersDOMList){
        d3.csv(leagueURI, function(data){
            var teamWeights = [];
            for(let j = 0; j < data.length; j++){
                teamWeights.push({"name":null,"weight":null});
                teamWeights[j].name = data[j].name;
                teamWeights[j].weight = 1.5 - ((data[j].place - 1) * 1/17);
            }
            for(let i = 0; i < markersDOMList.childElementCount; i++){
                if(!markersDOMList.children[i].classList.contains("hidden")){
                    for(let k = 0; k < teamWeights.length; k++){
                        if(teamWeights[k].name == markersDOMList.children[i].children[0].getAttribute("id")){
                            markersDOMList.children[i].children[0].style.height = "" + 33 * teamWeights[k].weight + "px";
                            markersDOMList.children[i].children[0].style.width = "" + 33 * teamWeights[k].weight + "px";
                            break;
                        }
                    }
                }
            }
        });
    }
    
    /*
    resets the sizes of every visible marker to their initial values;
    */
    
    function resetMarkerSizes(markersDOMList){
        for(let i = 0; i < markersDOMList.childElementCount; i++){
            if(!markersDOMList.children[i].classList.contains("hidden")){
                markersDOMList.children[i].children[0].style.height = "33px";
                markersDOMList.children[i].children[0].style.width = "33px";
            }
        }
    }
    
    /*
    removes (if present) the current coloring of a country and zooms out to the center of the top 50 spi view;
    */
    
    function showTop50(map){
        removeColorVector(map);
        var top50 = ol.proj.fromLonLat([11.62605618029147, 48.22014868029149]);
        map.getView().animate(
            {zoom: 5}, {center: top50}, {duration: 2000}
        );
    }
    
    /*
    following 5 functions firstly remove the coloring of the previously selected country and add the coloring for the new one;
    then an animation is started that brings the user to the center of the selected league (/country);
    */
    function showBundesliga(map){
        removeColorVector(map);
        createColorVector("Germany", map);
        var germany = ol.proj.fromLonLat([9.9167, 51.5167]);
        map.getView().animate(
            {zoom: 6.5}, {center: germany}, {duration: 2000}
        );
    }

    function showSerieA(map){
        removeColorVector(map);
        createColorVector("Italy", map);
        var italy = ol.proj.fromLonLat([12.5673, 41.8719]);
        map.getView().animate(
            {zoom: 6.2}, {center: italy}, {duration: 2000}
        );
    }

    function showLigue1(map){
        removeColorVector(map);
        createColorVector("France", map);
        var france = ol.proj.fromLonLat([2.2137, 46.2276]);
        map.getView().animate(
            {zoom: 6.3}, {center: france}, {duration: 2000}
        );
    }

    function showLaLiga(map){
        removeColorVector(map);
        createColorVector("Spain", map);
        var spain = ol.proj.fromLonLat([-3.7492, 40.4636]);
        map.getView().animate(
            {zoom: 6.6}, {center: spain}, {duration: 2000}
        );
    }

    function showPremierLeague(map){
        removeColorVector(map);
        createColorVector("United Kingdom", map);
        var greatBritain = ol.proj.fromLonLat([-2.0727, 53.7190]);
        map.getView().animate(
            {zoom: 6.5}, {center: greatBritain}, {duration: 2000}
        );
    }
    
    /*
    a color vector of the given country gets created that fills the corresponding country with black color;
    */
    
    function createColorVector(country, map){
        vector = new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson'
            }),
            style: function(feature, res){
                if(feature.get("name") == country){
                    return new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: [0,0,0,0.7],
                        })
                    });
                }
            }
        });
        map.addLayer(vector);
    }
    
    /*
    removes the currently saved color vector of map;
    */
    
    function removeColorVector(map){
        map.removeLayer(vector);
    }
    
    that.init = init;
    that.addEventListeners = addEventListeners;
    that.setMarkerSizesByLeagueRank = setMarkerSizesByLeagueRank;
    that.resetMarkerSizes = resetMarkerSizes;
    
    return that;
};