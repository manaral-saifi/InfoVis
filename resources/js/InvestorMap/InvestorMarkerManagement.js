var InvestorMap = InvestorMap || {};

InvestorMap.InvestorMarkerManagement = function() {
    
    const connectionURI = "./data/connection_lonlat.csv";

    var that = {},
        highestInvestment;
    
    function init(){
        return that;
    }

    function addMarkers(map, list){
        highestInvestment = getHighestInvestment(list);
           d3.csv(connectionURI, function(data){
               for(let i = 0; i < data.length; i++){
                   addAnotherMarker(map, [Number(data[i].lonClub),Number(data[i].latClub)],list[i].name);
                   createLineToInvestor(map, data[i], list[i].investment);
               }
           });
    }

    function addAnotherMarker(map, lonLat, id){
        if(document.getElementById(id + "Investor") == undefined){
            var pos = ol.proj.fromLonLat(lonLat),
                newDiv = document.createElement("div");

            newDiv.setAttribute("id", id + "Investor");
            newDiv.className = "marker";
            newDiv.style.height = "33px";
            newDiv.style.width = "33px";
            document.getElementById("markersInvestor").appendChild(newDiv);

            var marker = new ol.Overlay({
                position: pos,
                positioning: 'center-center',
                element: document.getElementById(id + "Investor"),
                stopEvent: false
            });
            
            map.addOverlay(marker);
            
            document.getElementById(id + "Investor").style.backgroundImage = "url('./images/" + id + ".png')";

        }
    }
    
    function createLineToInvestor(map, lonLatInfo, investment){
        var clubLonlat = ol.proj.fromLonLat([Number(lonLatInfo.lonClub), Number(lonLatInfo.latClub)]),
            countryLonLat = ol.proj.fromLonLat([Number(lonLatInfo.lonCountry), Number(lonLatInfo.latCountry)]);
      
        var lineStyle = [
				new ol.style.Style({
				  stroke: new ol.style.Stroke({
					color: [0,0,(investment/highestInvestment) * 255,0.8],
					width: ((investment/highestInvestment) * 2) + 1 
				  })
				})
			  ];
			  			
        var line = new ol.layer.Vector({
                source: new ol.source.Vector({
                features: [new ol.Feature({
                    geometry: new ol.geom.LineString([clubLonlat, countryLonLat]),
                    name: 'Line',
                })]
            })
        });

        line.setStyle(lineStyle);
        map.addLayer(line);
    }
    
    function getHighestInvestment(list){
        var highestInvestment = 0;
        
        for(let i = 0; i < list.length; i++){
            if(highestInvestment < list[i].investment){
                highestInvestment = list[i].investment;
            }
        }
        
        return highestInvestment;
    }
        
    that.init = init;
    that.addMarkers = addMarkers;
    
    return that;
};