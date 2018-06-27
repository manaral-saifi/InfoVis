var d3 = d3 || {};

const rankingURI = "./data/spi_global_rankings.csv";
const lonLatURI = "./data/club_lonlat.csv";
const bundesligaURI = "./data/rankings/bundesliga_ranking_1718.csv";
const premierleagueURI = "./data/rankings/premierleague_ranking_1718.csv";
const serieaURI = "./data/rankings/seriea_ranking_1718.csv";
const ligue1URI = "./data/rankings/ligue1_ranking_1718.csv";
const laligaURI = "./data/rankings/laliga_ranking_1718.csv";

  var lon, 
      lat,
      map;

function createMapWithMarkers(csvURI){

    d3.csv(csvURI, function(data){
        
        var list = [];
        
        for(let i = 0; i < data.length; i++){
            
            list.push({"name":null,"league":null});
            
            list[i].name = data[i].name;
            
            list[i].league = data[i].league;
            
        }
        
        createMap(list[0]);
        
        addEuropeMarkers(list);
        
    });
}

function createMap(centrum) {
    
    var centerAddress = centrum.name + " stadium " + centrum.league;
  
    d3.csv(lonLatURI, function(data){
            
        if(centrum.name == data[0].name){
                
            initOpenLayersMap([Number(data[0].lon),Number(data[0].lat)]);
                
            initCenterMarker([Number(data[0].lon),Number(data[0].lat)]);
                
        }
    });
}

function initOpenLayersMap(lonLat){

    var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
            format: new ol.format.GeoJSON()
        }),
    });
    
    map = new ol.Map({
        target: 'map',
        layers: [vectorLayer],
        view: new ol.View({
            center: ol.proj.fromLonLat(lonLat),
            zoom: 5
        }),
    });
    
}

function initCenterMarker(lonLat){
         
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "Bayern Munich");
    newDiv.className = "marker";
    
    document.getElementById("markers").appendChild(newDiv);
    
    var pos = ol.proj.fromLonLat(lonLat),
        marker = new ol.Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById("Bayern Munich"),
            stopEvent: false,
        });
        
    d3.csv(rankingURI, function(data){
        document.getElementById("Bayern Munich").style.backgroundImage = "url('./images/" + data[0].name + ".png')";
    });
    
    map.addOverlay(marker);
    
}

function addEuropeMarkers(list){
    
       d3.csv(lonLatURI, function(data){
           
           for(let i = 1; i < 50; i++){
               
               if(list[i].name == data[i].name){
                   
                   addAnotherMarker([Number(data[i].lon),Number(data[i].lat)],data[i].name,i);
               
               }
           
           }
       
       });

}

function addAnotherMarker(lonLat, id, place){
    
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

function showBundesliga(){
    var germany = ol.proj.fromLonLat([9.9167, 51.5167]);
    map.getView().animate(
        {zoom: 6.5}, {center: germany}, {duration: 2000}
    );
}

function showSerieA(){
    var italy = ol.proj.fromLonLat([12.5673, 41.8719]);
    map.getView().animate(
        {zoom: 6.5}, {center: italy}, {duration: 2000}
    );
}

function showLigue1(){
    var france = ol.proj.fromLonLat([2.2137, 46.2276]);
    map.getView().animate(
        {zoom: 6.5}, {center: france}, {duration: 2000}
    );
}

function showLaLiga(){
    var spain = ol.proj.fromLonLat([-3.7492, 40.4636]);
    map.getView().animate(
        {zoom: 6.5}, {center: spain}, {duration: 2000}
    );
}

function showPremierLeague(){
    var greatBritain = ol.proj.fromLonLat([-2.0727, 53.7190]);
    map.getView().animate(
        {zoom: 6.5}, {center: greatBritain}, {duration: 2000}
    );
}

function addLeagueMarkers(list){
    
}

createMapWithMarkers(rankingURI);