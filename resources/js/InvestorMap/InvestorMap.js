var d3 = d3 || {};

var InvestorMap = (function(){
    

    var that = {},
        investorMap,
        investorMarkerManagement;
    
    const investorsURI = "./data/club_investors.csv"
    
    function init(){
        initInvestorMarkerManagement()
        createMapWithMarkers();
        return that;
    }
    
    function createMapWithMarkers(){
        
            d3.csv(investorsURI, function(invData){
                var list = [];
                for(let j = 0; j < invData.length; j++){
                            list.push({"name":null,"investment":null,"investor":null});
                            list[j].name = invData[j].club;
                            list[j].investment = invData[j].investment;
                            list[j].investor = invData[j].investor;
                }
                createMap(list);
            });
    }
    
    function createMap(list) {
            initMap();
            investorMarkerManagement.addMarkers(investorMap, list);
    }     
    
  function initMap(){
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
                center: ol.proj.fromLonLat([11.62605618029147, 48.22014868029149]),
                zoom: 4.8
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