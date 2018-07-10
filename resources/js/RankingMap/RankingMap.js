var d3 = d3 || {};

var RankingMap = (function(){


    var that = {},
        map,
        rankingPopUp,
        rankingZoomManagement,
        rankingMarkerManagement,
        markersDOMlist;
    
    const lonLatURI = "./data/club_lonlat.csv";
    const rankingURI = "./data/spi_global_rankings.csv";

    var myUri = {
        bundesligaURI : "./data/rankings/bundesliga_ranking_1718.csv",
        premierleagueURI : "./data/rankings/premierleague_ranking_1718.csv",
        serieaURI : "./data/rankings/seriea_ranking_1718.csv",
        ligue1URI : "./data/rankings/ligue1_ranking_1718.csv",
        laligaURI : "./data/rankings/laliga_ranking_1718.csv"
    };

    function init(){
        initRankingPopUp();
        initRankingZoomManagement();
        initRankingMarkerManagement();
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
                rankingMarkerManagement.initCenterMarker(map, [Number(data[0].lon),Number(data[0].lat)]);
                markersDOMlist = document.querySelector(".map").children[0].children[1];
                rankingMarkerManagement.addEuropeMarkers(map, list);
                rankingPopUp.initPopUps(map, markersDOMlist, myUri);
                rankingMarkerManagement.attachMarkerListeners(markersDOMlist);
            }
        });
    }
    
    function createLeague(uri){
        rankingZoomManagement.resetMarkerSizes(markersDOMlist);
        if(myUri.hasOwnProperty(uri)){
            d3.csv(myUri[uri],function(data){
                var clubNames = [];
                for(let i = 0; i < data.length; i++){
                    clubNames.push(data[i].name);
                    rankingMarkerManagement.addAnotherMarker(map,[Number(data[i].lon),Number(data[i].lat)],data[i].name,i,myUri[uri]);
                }
                for(let i = 0; i < markersDOMlist.childElementCount; i++){
                    if(clubNames.indexOf(markersDOMlist.children[i].firstChild.getAttribute("id")) == -1){
                        markersDOMlist.children[i].classList.add("hidden");
                    } else if (markersDOMlist.children[i].classList.contains("hidden")){
                        markersDOMlist.children[i].classList.remove("hidden");
                    }
                }
                rankingZoomManagement.setMarkerSizesByLeagueRank(myUri[uri], markersDOMlist);
            });  
        }

    }
    
    function returnToTop50(){
        rankingZoomManagement.resetMarkerSizes(markersDOMlist);
            d3.csv(rankingURI, function(data){
                var clubNames = [];
                for(let i = 0; i < 50; i++){
                    clubNames.push(data[i].name);
                }
                for(let i = 0; i < markersDOMlist.childElementCount; i++){
                    if(clubNames.indexOf(markersDOMlist.children[i].firstChild.getAttribute("id")) == -1){
                        markersDOMlist.children[i].classList.add("hidden");
                    } else if (markersDOMlist.children[i].classList.contains("hidden")){
                        markersDOMlist.children[i].classList.remove("hidden");
                    }
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
        map = new ol.Map({
            target: 'map',
            layers: [vectorLayer],
            view: new ol.View({
                center: ol.proj.fromLonLat(lonLat),
                zoom: 5
            }),
            overlays: [rankingPopUp.getPopUpOverlay()],
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
        rankingZoomManagement.addEventListeners(map);
    
    }
    
    //Following functions initialize modules
        
    function initRankingMarkerManagement(){
        rankingMarkerManagement = (new RankingMap.RankingMarkerManagement()).init();
    }    
        
    function initRankingZoomManagement(){
        rankingZoomManagement = (new RankingMap.RankingZoomManagement({
            map: map,
            buttonsList: document.querySelector("#buttons"),
        })).init();
    }    
    
    function initRankingPopUp(){
        rankingPopUp = (new RankingMap.RankingPopUp()).init();    
    }
    
    that.init = init;
    that.createLeague = createLeague;
    that.returnToTop50 = returnToTop50;
    
    return that;
    
}());