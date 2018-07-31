/*
for everything about setting markers and their visualization, and example of the openlayers website has helped
(inspirational source: https://openlayers.org/en/latest/examples/overlay.html)
*/

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
    
    /*
    sets the center marker to its right position on the map after creating it and adding it to the DOM;
    before it gets added to the map, the logo of the club is drawn over the marker and its rank number (1) gets added
    */
    
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

    /*
    here the other top 50 spi markers get added to the map with their logo and place number;
    */
    
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

    /*
    one marker gets created and added to the DOM;
    it gets a logo and in the end finally added to the given (ranking) map;
    */
    
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
    
    /*
    handles two possible interactions:
    first: the user navigates the cursor over a logo -> as long as the cursor is above it, the logo has increased size and is taken to the foreground;
    second: the user moves away from the logo -> logo decreases to initial size and if it was initially behind another logo, it now moves back behind that one again;
    */
    
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
    
    /*
    gets the currently saved height and width and creates an array with increased pixel values (by 7);
    this is used for handling the situation when the cursor hits a logo;
    */
    
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