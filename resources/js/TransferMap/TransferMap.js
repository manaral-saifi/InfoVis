var d3 = d3 || {};

TransferMap = (function(){

    const transfersURI = "./data/transfers5000.csv",
          translationURI = "./data/country_translation.csv",
          center = [11.62605618029147, 48.22014868029149];
    
    var that = {},
        vectorArray,
        transferFromMap,
        transferToMap,
        toSelected = false;
    
    function init(){
        initMap();
        return that;
    }
    
    /*
    initially creates transferFromMap and transferToMap and hides them at the start of the program (since rankingMap is first)
    then fills it via coloring with the initial state (the "from" and "to" data)
    */
    
    function initMap(){
        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
                format: new ol.format.GeoJSON()
            }),
        });
        initTransferFromMap(vectorLayer);
        initTransferToMap(vectorLayer);
        document.querySelector("#transferFromMap").classList.add("hidden");
        document.querySelector("#transferToMap").classList.add("hidden");
        initTransferVisualization();
    }
    
    /*following two functions initialize the maps for player departures and player additions*/
    
    function initTransferFromMap(vectorLayer){
        transferFromMap = new ol.Map({
            target: 'transferFromMap',
            layers: [vectorLayer],
            view: new ol.View({
                center: ol.proj.fromLonLat(center),
                zoom: 4.6
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
    }
    
    function initTransferToMap(vectorLayer){
        transferToMap = new ol.Map({
            target: 'transferToMap',
            layers: [vectorLayer],
            view: new ol.View({
                center: ol.proj.fromLonLat(center),
                zoom: 4.6
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
    }
    
    /*
    creates an array with the important information about the transfer dataset
    then creates a prepared countList for "from" and "to" and initially creates the two map views with the "from" and "to" countList
    in the end, the initialization of the button listeners takes place
    */
    
    function initTransferVisualization(){
        d3.csv(transfersURI, function(data){
            var list = [];
            for(let i = 0; i < data.length; i++){
                list.push({"player":null,"from":"null","to":null,"fromCountry":null,"toCountry":null});
                list[i].player = data[i].player.substring(0, data[i].player.indexOf("(")-1);
                list[i].from = data[i].from.substring(0, data[i].from.indexOf("(")-1);
                list[i].to = data[i].to.substring(0, data[i].to.indexOf("(")-1);
                list[i].fromCountry = getCountryOfTransfersDatasetString(data[i].from);
                list[i].toCountry = getCountryOfTransfersDatasetString(data[i].to);
            }
            var countListFrom = createFromCountList(list),
                preparedFromCountList = prepareCountList(countListFrom),
                countListTo = createToCountList(list),
                preparedToCountList = prepareCountList(countListTo);
            createTransferVector(preparedFromCountList, "from");
            createTransferVector(preparedToCountList, "to");
            setButtonListeners();
        });
    }
    
    /*
    sets the listeners for the two main buttons in the transferMap view
    */
    
    function setButtonListeners(){
        document.querySelector("#transferButtons").addEventListener("click", function(event){
            if(event.target.getAttribute("id") == "fromButton" && toSelected){
                handleFromButtonPressed();
            } else if(event.target.getAttribute("id") == "toButton" && !toSelected){
                handleToButtonPressed();
            }
        });
    }
    
    /*
    following two functions define the action of using the "from" and the "to" buttons
    the pressed button gets a black color (showing "currently pressed")
    the current map gets hidden, and the other one gets visible
    */
    
    function handleFromButtonPressed(){
        toSelected = false;
        document.querySelector("#toButton").classList.remove("chosen");
        document.querySelector("#fromButton").classList.add("chosen");
        document.querySelector("#transferToMap").classList.add("hidden");
        document.querySelector("#transferFromMap").classList.remove("hidden");
    }
    
    function handleToButtonPressed(){
        toSelected = true;
        document.querySelector("#fromButton").classList.remove("chosen");
        document.querySelector("#toButton").classList.add("chosen");
        document.querySelector("#transferFromMap").classList.add("hidden");
        document.querySelector("#transferToMap").classList.remove("hidden");
    }
    
    /*
    after the final prepared countList is generated and the vectorArray filled, the map finally receives the colorings
    */
    
    function createTransferVector(countList, type){
        d3.csv(translationURI, function(data){
            var translatedArray = [];
            translatedArray = getTranslatedArray(countList, data);
            fillVectorArray(translatedArray);
            if(type == "from"){
                for(let i = 0; i < vectorArray.length; i++){
                    transferFromMap.addLayer(vectorArray[i]);
                }
            } else if (type == "to"){
                for(let i = 0; i < vectorArray.length; i++){
                    transferToMap.addLayer(vectorArray[i]);
                }
            }
        });
    }
    
    /*
    fills the vector array with the different colorings of the countries
    the algorithm to determine the value (only red value, 0 for yellow and blue) divides the countries count through the highest count
    and multiplies it with 255 -> so the biggest count has the brightest red, and the lowest counts are close to black
    */
    
    function fillVectorArray(translatedArray){
        vectorArray = [];
        for(let i = 0; i < translatedArray.length; i++){
        var vector = new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson'
            }),
            style: function(feature, res){
                if(feature.get("name") == translatedArray[i].country){
                    return new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: [(translatedArray[i].count/getHighestCount(translatedArray))*255,0,0,0.7],
                        })
                    });
                }
            }
        });
            vectorArray.push(vector);
        }
    }
    
    /*
    translates the german country names to the accurate english ones (because countries in openlayers need to be in english)
    also in openlayers some countries are joined to one term (Wales and Scotland are United Kingdom as well)
    in the end, the resulting duplicates are taken out (getDoublesOut())
    returns the final prepared countList
    */
    
    function getTranslatedArray(countList, data){
        var translatedArray = [];
        for(let i = 0; i < countList.length; i++){
            for(let j = 0; j < data.length; j++){
                if(data[j].german == countList[i].country){
                    translatedArray.push({"country":data[j].english,"count":countList[i].count});
                }
            }
        }
        translatedArray = getDoublesOut(translatedArray);
        return translatedArray;
    }
    
    /*
    this function takes the duplicates of countries out and sums up their different count values
    returns updated countList in the end
    */
    
    function getDoublesOut(translatedArray){
        var newTranslatedArray = [],
            namesList = [];
        for(let i = 0; i < translatedArray.length; i++){
            if(namesList.indexOf(translatedArray[i].country) != -1){
                for(let j = 0; j < newTranslatedArray.length; j++){
                    if(namesList[namesList.indexOf(translatedArray[i].country)] == newTranslatedArray[j].country){
                        newTranslatedArray[j].count = newTranslatedArray[j].count + translatedArray[i].count;
                    }
                }
            } else {
                newTranslatedArray.push(translatedArray[i]);
                namesList.push(translatedArray[i].country);
            }
        }
        return newTranslatedArray;
    }
    
    /*
    takes the list with the data of the csv file (as an array) 
    and creates the list of countries with their corresponding counts of new additions
    returns that list of (country, count) pairs
    */
    
    function createFromCountList(list){
        var fromList = [],
            countList = [];
        for(let i = 0; i < 1000; i++){
            if(fromList.indexOf(list[i].fromCountry) == -1){
                countList.push({"country": list[i].fromCountry,"count":1});
                fromList.push(list[i].fromCountry);
            } else {
                for(let j = 0; j < countList.length; j++){
                    if(countList[j].country == list[i].fromCountry){
                        countList[j].count++;
                    }
                }
            }
        }
        return countList;
    }

    /*
    takes the list with the data of the csv file (as an array) 
    and creates the list of countries with their corresponding counts of departures
    returns that list of (country, count) pairs
    */
    
    function createToCountList(list){
        var toList = [],
            countList = [];
        for(let i = 0; i < 1000; i++){
                if(toList.indexOf(list[i].toCountry) == -1){
                    countList.push({"country": list[i].toCountry,"count":1});
                    toList.push(list[i].toCountry);
                } else {
                    for(let j = 0; j < countList.length; j++){
                        if(countList[j].country == list[i].toCountry){
                            countList[j].count++;
                        }
                    }
                }
            }
        return countList;
    }

    /*
    takes out the countries where the count of departures (or new additions) is lower than 5  (of the countList)
    returns the prepared countList; this is for filtering out the less relevant countries and also for taking out the mistakes
    that the getCountryOfTransfersDatasetString brings with it
    */
    
    function prepareCountList(countList){
        var preparedCountList = [];
        for(let i = 0; i < countList.length; i++){
            if(countList[i].count >= 5){
                preparedCountList.push(countList[i]);
            }
        }
        return preparedCountList;
    }

    /*
    gets a "from" or "to" string of the transfers dataset and attempts to filter out the country and return it
    (does it pretty well for a majority of the strings that come in, only little amount of outliers)
    */
    
    function getCountryOfTransfersDatasetString(string){
        var process1 = string.substring(string.indexOf(")") + 1, string.length - 1),
            process2 = process1.substring(process1.indexOf(")") + 1, process1.length - 1),
            process3 = process2.substring(process2.indexOf(")") + 1, process2.length - 1);
        return process3.substring(0, process3.indexOf("(")).trim();
    }
    
    /*
    determines the highest count of the given countList (is needed for the calculation of the color distribution in fillVectorArray())
    */
    
    function getHighestCount(countList){
        highestCount = 0;
        for(let i = 0; i < countList.length; i++){
            if(highestCount < countList[i].count){
                highestCount = countList[i].count;
            }
        }
        return highestCount;
    }
    
    that.init = init;
    
    return that;
    
}());