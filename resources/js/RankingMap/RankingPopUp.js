var RankingMap = RankingMap || {};

RankingMap.RankingPopUp = function() {
    
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
    
    const overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    
    var that = {};
    
    function init(){
        return that;
    }
    
    function initPopUps(map){
        closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
          };
        
        map.on('singleclick', function(evt) {
                const coordinate = evt.coordinate;
                content.innerHTML = '<p>Sport:</p><code>' + "Football" + '</code>';
                overlay.setPosition(coordinate);
        });        
    }
    
    function getPopUpOverlay(){
        return overlay;
    }
    
    that.init = init;
    that.initPopUps = initPopUps;
    that.getPopUpOverlay = getPopUpOverlay;

    return that;
};