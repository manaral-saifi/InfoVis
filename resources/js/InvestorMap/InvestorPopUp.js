/*
for everything about initializing and creating popups in fitting situations, an example of the openlayers website has helped
(inspirational source: https://openlayers.org/en/latest/examples/popup.html)
*/

var InvestorMap = InvestorMap || {};

InvestorMap.InvestorPopUp = function() {
        
    const container = document.getElementById('popupInvestor');
    const content = document.getElementById('popup-contentInvestor');
    const closer = document.getElementById('popup-closerInvestor');
    
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
    
    /*
    here the popups get initialized;
    first a coordinate according to the click position is calculated, then the closer of the popup gets his onclick functionality;
    in the end, the whole markerList in the DOM gets a clickListener that firstly checks which marker was selected and the creates the
    popup thanks to the given infoList; 
    in the end, the popup gets placed to the map at the position of determined coordinate;
    */
    
    function initPopUps(map, markersDOMList, infoList){
        var coordinate;
        map.addEventListener("click", function(event){
            coordinate = event.coordinate;
        });
        
        closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
          };
        
        markersDOMList.addEventListener("click", function(event){
            for(let i = 0; i < markersDOMList.childElementCount; i++){
                if(event.target.getAttribute("id") == infoList[i].name + "Investor"){
                    var listEntry = infoList[i];
                    content.innerHTML = '<p style="font-size:130%;">Investordeal Details:</p>' 
                        + '<p>Team: <code>' + listEntry.name
                        + '</code></p><p>Name des Investors: <code>' + listEntry.investor  
                        + '</code></p><p>Herkunft des Investors: <code>' + listEntry.country  
                        + '</code></p><p>Investiertes Vermögen: <code>' + listEntry.investment + '</code></p>';
                    overlay.setPosition(coordinate);
                    break;
                }
            }
            
        
    });
    } 
    
    /*
    returns the popup overlay for adding it to the (investor) map in the main map module;
    */
    
    function getPopUpOverlay(){
        return overlay;
    }
    
    that.init = init;
    that.initPopUps = initPopUps;
    that.getPopUpOverlay = getPopUpOverlay;

    return that;
};