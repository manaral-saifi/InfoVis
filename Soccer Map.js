var d3 = d3 || {};

const globalURI = "./data/transfers_test.csv";
  var lan;
    var lat;
var test = "test";
/*Only works in firefox so far*/

function parseToList(csvURI){
    d3.csv(csvURI, function(data){
        var list = [];
        for(let i = 0; i < data.length; i++){
            list.push({"player":null,"from":"null","to":null});
            list[i].player = data[i].player.substring(0, data[i].player.indexOf("(")-1);
            list[i].from = data[i].from.substring(0, data[i].from.indexOf("(")-1);
            list[i].to = data[i].to.substring(0, data[i].to.indexOf("(")-1);
        }
        console.log(list);
    });
}

parseToList(globalURI);

 var geocoder;


  function codeAddress() {
        geocoder = new google.maps.Geocoder();
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
          lat = results[0].geometry.viewport.f.f;
          lon = results[0].geometry.viewport.b.f;
          var map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                    source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([lon, lat]),
                    zoom: 15
                })
        });
        var marker = new google.maps.Marker({
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
console.log(test);
