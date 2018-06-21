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
        
        for(let i = 1; i < 50; i++){
            
            var currentAddress = list[i].name + " stadium " + list[i].league;
            
            geocoder = new google.maps.Geocoder();
            
            geocoder.geocode({'address': currentAddress}, function(results, status){
                
                if(status == "OK"){
                    
                    addAnotherMarker([results[0].geometry.viewport.b.f, results[0].geometry.viewport.f.f]);
                    
                } else {
                    
                    alert('Geocode was not successful for the following reason: ' + status);
                
                }
            });
        }
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
        })
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

createMapWithMarkers(rankingURI);