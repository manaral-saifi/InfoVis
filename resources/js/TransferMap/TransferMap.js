var d3 = d3 || {};

RankingMap.TransferMap = function(){

    const transfersURI = "./data/transfers_test.csv",
          translationURI = "./data/country_translation.csv";
    
    var that = {},
        vectorArray;
    
    function init(){
        return that;
    }
    
    function parseToList(map){
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
            createTransferVector(preparedFromCountList, map);
            console.log(preparedFromCountList)
        });
    }
    
    function createTransferVector(countList, map){
        d3.csv(translationURI, function(data){
            var translatedArray = [];
            for(let i = 0; i < countList.length; i++){
                for(let j = 0; j < data.length; j++){
                    if(data[j].german == countList[i].country){
                        translatedArray.push({"country":data[j].english,"count":countList[i].count});
                    }
                }
            }
            translatedArray = getDoublesOut(translatedArray);
            console.log(translatedArray)
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
                                color: [translatedArray[i].count,0,0,1],
                            })
                        });
                    }
                }
            });
                vectorArray.push(vector);
            }
            for(let i = 0; i < vectorArray.length; i++){
                map.addLayer(vectorArray[i]);
            }
        });
    }
    
    function getDoublesOut(translatedArray){
        var newTranslatedArray = [],
            namesList = [];
        for(let i = 0; i < translatedArray.length; i++){
            if(namesList.indexOf(translatedArray[i].country) != -1){
                for(let j = 0; j < newTranslatedArray.length; j++){
                    if(namesList.indexOf(translatedArray[i]) == newTranslatedArray[j]){
                        translatedArray.count = translatedArray.count + translatedArray[i].count;
                    }
                }
            } else {
                newTranslatedArray.push(translatedArray[i]);
                namesList.push(translatedArray[i].country);
            }
        }
        return newTranslatedArray;
    }
    
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

    function prepareCountList(countList){
        var preparedCountList = [];
        for(let i = 0; i < countList.length; i++){
            if(countList[i].count >= 5){
                preparedCountList.push(countList[i]);
            }
        }
        return preparedCountList;
    }

    function getCountryOfTransfersDatasetString(string){
        var process1 = string.substring(string.indexOf(")") + 1, string.length - 1),
            process2 = process1.substring(process1.indexOf(")") + 1, process1.length - 1),
            process3 = process2.substring(process2.indexOf(")") + 1, process2.length - 1);
        return process3.substring(0, process3.indexOf("(")).trim();
    }
    
    that.init = init;
    that.parseToList = parseToList;
    
    return that;
    
};