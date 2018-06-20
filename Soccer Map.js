var d3 = d3 || {};

const globalURI = "./data/transfers_test.csv";
const rankingURI = "./data/spi_global_rankings.csv";
  var lon, 
      lat,
      test = "test",
      map;

function parseToList(csvURI){
    d3.csv(csvURI, function(data){
        var list = [];
        for(let i = 0; i < data.length; i++){
            list.push({"player":null,"from":"null","to":null});
            list[i].player = data[i].player.substring(0, data[i].player.indexOf("(")-1);
            list[i].from = data[i].from.substring(0, data[i].from.indexOf("(")-1);
            list[i].to = data[i].to.substring(0, data[i].to.indexOf("(")-1);
        }
    });
}

function parseRankingsToList(csvURI){
    d3.csv(csvURI, function(data){
        var list = [];
        for(let i = 0; i < data.length; i++){
            list.push({"name":null,"league":null});
            list[i].name = data[i].name;
            list[i].league = data[i].league;
        }
        createMap(list[0]);
        for(let i = 0; i < 50; i++){
            
        }
        console.log(list);
    })
}

parseToList(globalURI);
parseRankingsToList(rankingURI);
var geocoder;

function createMap(centrum) {
    var centerAddress = centrum.name + " stadium " + centrum.league;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': centerAddress}, function(results, status){
        map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([results[0].geometry.viewport.b.f, results[0].geometry.viewport.f.f]),
            zoom: 4
        })
    });
        var pos = ol.proj.fromLonLat([results[0].geometry.viewport.b.f, results[0].geometry.viewport.f.f]);

      // center marker
      var marker = new ol.Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById('marker'),
            stopEvent: false
      });
      map.addOverlay(marker);

      // Bayern label
      var bayern = new ol.Overlay({
        position: pos,
        element: document.getElementById('bayern')
      });
      map.addOverlay(bayern);
    });
}

function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            lat = results[0].geometry.viewport.f.f;
            lon = results[0].geometry.viewport.b.f;
            
            //map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));            
        
            var marker = new google.maps.Marker({
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

console.log(test);
