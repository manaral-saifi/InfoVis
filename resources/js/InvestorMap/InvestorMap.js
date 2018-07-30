var d3 = d3 || {};

var InvestorMap = (function(){
    

    var that = {},
        investorMap,
        investorMarkerManagement,
        investorPopUp,
        markersDOMlist;
    
    const investorsURI = "./data/club_investors.csv"
    
    function init(){
        initInvestorMarkerManagement();
        initInvestorPopUp();
        createMapWithMarkers();
        return that;
    }
    
    /*
    fills an array with the important details about the investment deals and passes it to createMap();
    */
    
    function createMapWithMarkers(){
        
            d3.csv(investorsURI, function(invData){
                var list = [];
                for(let j = 0; j < invData.length; j++){
                    list.push({"name":null,"investment":null,"investor":null,"country":null});
                    list[j].name = invData[j].club;
                    list[j].investment = invData[j].investment;
                    list[j].investor = invData[j].investor;
                    list[j].country = invData[j].country;
                }
                createMap(list);
            });
    }
    
    /*
    here the map gets initialized and the modules for markers and popup init their views with the list of investor deals
    (meaning that the markers get placed on the map with lines to their investor countries
    and popups are initialized when clicked on a club logo);
    */
    
    function createMap(list) {
        initMap();
        investorMarkerManagement.addMarkers(investorMap, list);
        markersDOMlist = document.querySelector(".investorMap").children[0].children[1];
        investorPopUp.initPopUps(investorMap, markersDOMlist, list);
    }     
    
    /*
    the map gets initialized (happens at the beginning of the programm) and then set to hidden 
    (because init state of application is rankingMap, not investorMap);
    */
    
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
            overlays: [investorPopUp.getPopUpOverlay()],
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

    /*
    initializes the needed modules for managing the markers and the popups about the investment deals;
    */       
    
   function initInvestorMarkerManagement(){
        investorMarkerManagement = (new InvestorMap.InvestorMarkerManagement()).init();
    }      
    
    function initInvestorPopUp(){
        investorPopUp = (new InvestorMap.InvestorPopUp()).init();
    }   
    
    that.init = init;
   
    return that;
    
    }());