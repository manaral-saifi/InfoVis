var d3 = d3 || {};

var InvestorMap = (function(){
    

    var that = {},
        investorMap,
        selectedWidth,
        investorMarkerManagement,
        markersDOMlist;
    
    const investorsURI = "./data/club_investors.csv"
    const lonLatURI = "./data/club_lonlat.csv"
    const rankingURI = "./data/spi_global_rankings.csv";
    const connectionURI = "./data/connection_lonlat.csv"
    
    function init(){
        initInvestorMarkerManagement()
        createMapWithMarkers();
    }
    
function createMapWithMarkers(){
        
        d3.csv(rankingURI, function(data){
            var list = [];
            for(let i = 0; i < data.length; i++){
                list.push({"name":null,"league":null});
                list[i].name = data[i].name;
                list[i].league = data[i].league;
            }
            createMap(list);
        });
    }
    
    function createMap(list) {
        d3.csv(lonLatURI, function(data){
            if(list[0].name == data[0].name){
                initMap([Number(data[0].lon),Number(data[0].lat)]);
                investorMarkerManagement.initCenterMarker(investorMap, [Number(data[0].lon),Number(data[0].lat)]);
                markersDOMlist = document.querySelector(".investorMap").children[0].children[1];
                investorMarkerManagement.addEuropeMarkers(investorMap, list);
                investorMarkerManagement.attachMarkerListeners(markersDOMlist);
            }
        });
    }     
    
  function initMap(lonLat){
        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
                format: new ol.format.GeoJSON()
            }),
        });
        investorMap = new ol.Map({
            target: 'investorMap',
            layers: [vectorLayer],
            view: new ol.View({
                center: ol.proj.fromLonLat(lonLat),
                zoom: 2.5
            }),
            interactions: new ol.interaction.defaults({
                doubleClickZoom :false,
                dragAndDrop: false,
                keyboardPan: false,
                keyboardZoom: false,
                mouseWheelZoom: false,
                pointer: false,
                select: false
            })
        });
      document.querySelector("#investorMap").classList.add("hidden");

    } 

           
    
   function initInvestorMarkerManagement(){
        investorMarkerManagement = (new InvestorMap.InvestorMarkerManagement()).init();
    }      
    
    that.init = init;
   
    return that;
    
    }());