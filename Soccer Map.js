var d3 = d3 || {};

const globalURI = "./data/spi_global_rankings.csv";

/*Only works in firefox so far*/

function parseToList(csvURI){
    d3.csv(csvURI, function(data){
        console.log(data);
    });
}

parseToList(globalURI);

var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([12.297383, 49.669448]),
      zoom: 15
    })
  });