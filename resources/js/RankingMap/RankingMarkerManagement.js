var RankingMap = RankingMap || {};

RankingMap.RankingMarkerManagement = function() {
    
    const europeNumberOne = "Bayern Munich";
    const rankingURI = "./data/spi_global_rankings.csv";
    const lonLatURI = "./data/club_lonlat.csv";

    var that = {};
    
    function init(){
        return that;
    }
    
    function initCenterMarker(map, lonLat){
         
        var newDiv = document.createElement("div");
        
        newDiv.setAttribute("id", europeNumberOne);
        newDiv.className = "marker";
        document.getElementById("markers").appendChild(newDiv);
    
        var pos = ol.proj.fromLonLat(lonLat),
            marker = new ol.Overlay({
                position: pos,
                positioning: 'center-center',
                element: document.getElementById(europeNumberOne),
                stopEvent: false,
            });
        
        d3.csv(rankingURI, function(data){
            document.getElementById(europeNumberOne).style.backgroundImage = "url('./images/" + data[0].name + ".png')";
        });
    
        map.addOverlay(marker);
    
    }

    function addEuropeMarkers(map, list){        
           d3.csv(lonLatURI, function(data){
               for(let i = 1; i < 50; i++){
                   if(list[i].name == data[i].name){
                       addAnotherMarker(map, [Number(data[i].lon),Number(data[i].lat)],data[i].name,i);
                   }
               }
           });

    }

    function addAnotherMarker(map, lonLat, id, place){

        var pos = ol.proj.fromLonLat(lonLat),
            newDiv = document.createElement("div");

        newDiv.setAttribute("id", id);
        newDiv.className = "marker";
        document.getElementById("markers").appendChild(newDiv);

        var marker = new ol.Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById(id),
            stopEvent: false
        });

        d3.csv(rankingURI, function(data){
            document.getElementById(id).style.backgroundImage = "url('./images/" + data[place].name + ".png')"; 
        });

        map.addOverlay(marker);
    }
    
    that.init = init;
    that.initCenterMarker = initCenterMarker;
    that.addEuropeMarkers = addEuropeMarkers;
    that.addAnotherMarker = addAnotherMarker;
    
    return that;
};