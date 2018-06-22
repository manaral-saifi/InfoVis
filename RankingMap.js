var d3 = d3 || {};

const rankingURI = "./data/spi_global_rankings.csv";

  var lon, 
      lat,
      map,
      geocoder;

function createMapWithMarkers(csvURI){
    
    d3.csv(csvURI, function(data){
        
        var list = [];
        
        for(let i = 0; i < data.length; i++){
            
            list.push({"name":null,"league":null});
            
            list[i].name = data[i].name;
            
            list[i].league = data[i].league;
            
        }
        
        createMap(list[0]);
        
        addNumberOfMarkers(list, 1, 8);
        
        var i = 1;
        
        var intervalId = window.setInterval(function(){
                
            addNumberOfMarkers(list, (i*7) + 1, (i*7) + 8);
            
            i++;
                
            if(((i*7) + 7) > 50){
                
                    window.clearInterval(intervalId);
                
            }
                
        }, 7500);
        
    });
}

function createMap(centrum) {
    
    var centerAddress = centrum.name + " stadium " + centrum.league;
    
    geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({'address': centerAddress}, function(results, status){
        
        initOpenLayersMap([results[0].geometry.viewport.b.f, results[0].geometry.viewport.f.f]);
        
        initCenterMarker([results[0].geometry.viewport.b.f, results[0].geometry.viewport.f.f]);

    });
}

function initOpenLayersMap(lonLat){
    
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat(lonLat),
            zoom: 4
        }),
    });
    
}

function initCenterMarker(lonLat){
    
    var pos = ol.proj.fromLonLat(lonLat),
        marker = new ol.Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById('marker'),
            stopEvent: false
        });
        
    map.addOverlay(marker);
    
}

function addNumberOfMarkers(list, forInit, forEnd){
    
    for(let i = forInit; i < forEnd; i++){
            
            var currentAddress = list[i].name + " stadium " + list[i].league;
            
            geocoder.geocode({'address': currentAddress}, function(results, status){
                
                if(status == "OK"){
                    
                    addAnotherMarker([results[0].geometry.viewport.b.f, results[0].geometry.viewport.f.f]);
                       
                } else if (status == "ZERO_RESULTS"){
                    
                    handleZeroResultsError(list[i]);
                    
                } else {
                    
                    alert('Geocode was not successful for the following reason: ' + status);
                
                }
            });
        }
    
}

function addAnotherMarker(lonLat){
    
    var pos = ol.proj.fromLonLat(lonLat),
        newDiv = document.createElement("div");
    
    newDiv.setAttribute("id", "marker");
    document.querySelector("#markers").appendChild(newDiv);
    
    var marker = new ol.Overlay({
        position: pos,
        positioning: 'center-center',
        element: document.querySelector("#markers").children[0],
        stopEvent: false
    });
    
    map.addOverlay(marker);
}

function handleZeroResultsError(listEntrant){
    
    var currentAddress = listEntrant.name + " stadium";
    
    geocoder.geocode({'address': currentAddress}, function(results, status){
        
        if(status == "OK"){
                    
            addAnotherMarker([results[0].geometry.viewport.b.f, results[0].geometry.viewport.f.f]);
           
        } else {
                    
            alert('Geocode was not successful for the following reason: ' + status);
                
        }
        
    });
    
}

createMapWithMarkers(rankingURI);