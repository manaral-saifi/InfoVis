var RankingMap = RankingMap || {};

RankingMap.RankingMarkerManagement = function() {
    
    const europeNumberOne = "Bayern Munich";
    const rankingURI = "./data/spi_global_rankings.csv";
    const lonLatURI = "./data/club_lonlat.csv";

    var that = {},
        selectedHeight,
        selectedWidth;
    
    function init(){
        return that;
    }
    
    function initCenterMarker(map, lonLat){
         
        var newDiv = document.createElement("div");
        
        newDiv.setAttribute("id", europeNumberOne);
        newDiv.className = "marker";
        newDiv.style.height = "33px";
        newDiv.style.width = "33px";
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
            document.getElementById(europeNumberOne).innerHTML = 1;
        });
    
        map.addOverlay(marker);
    
    }

    function addEuropeMarkers(map, list){        
           d3.csv(lonLatURI, function(data){
               for(let i = 1; i < 50; i++){
                   if(list[i].name == data[i].name){
                       addAnotherMarker(map, [Number(data[i].lon),Number(data[i].lat)],data[i].name,i,rankingURI);
                       document.getElementById(data[i].name).innerHTML = i+1;
                   }
               }
           });
    }

    function addAnotherMarker(map, lonLat, id, place, uri){
        if(document.getElementById(id) == undefined){
            var pos = ol.proj.fromLonLat(lonLat),
                newDiv = document.createElement("div");

            newDiv.setAttribute("id", id);
            newDiv.className = "marker";
            newDiv.style.height = "33px";
            newDiv.style.width = "33px";
            document.getElementById("markers").appendChild(newDiv);

            var marker = new ol.Overlay({
                position: pos,
                positioning: 'center-center',
                element: document.getElementById(id),
                stopEvent: false
            });

            d3.csv(uri, function(data){
                document.getElementById(id).style.backgroundImage = "url('./images/" + data[place].name + ".png')"; 
            });

            map.addOverlay(marker);
        }
    }
    
    function attachMarkerListeners(markersDOMList){
        markersDOMList.addEventListener("mouseover", function(event){
            selectedHeight = event.target.style.height;
            selectedWidth = event.target.style.width;
            event.target.style.height = increaseMarkerSize()[0];
            event.target.style.width = increaseMarkerSize()[1];
            event.target.style.position = "relative";
            event.target.style.zIndex = 1;
        });
        markersDOMList.addEventListener("mouseout", function(event){
            event.target.style.height = selectedHeight;
            event.target.style.width = selectedWidth;
            event.target.style.zIndex = 0;
        });
    }
    
    function increaseMarkerSize(){
        var currentHeight = Number(selectedHeight.substring(0, selectedHeight.indexOf('p'))),
            currentWidth = Number(selectedHeight.substring(0, selectedWidth.indexOf('p')));
        return [(currentHeight + 7) + "px",(currentWidth + 7) + "px"];
    }
        
    that.init = init;
    that.initCenterMarker = initCenterMarker;
    that.addEuropeMarkers = addEuropeMarkers;
    that.addAnotherMarker = addAnotherMarker;
    that.attachMarkerListeners = attachMarkerListeners;
    
    return that;
};