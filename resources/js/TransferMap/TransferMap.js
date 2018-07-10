var d3 = d3 || {};

const transfersURI = "./data/transfers_test.csv";

function parseToList(csvURI){
    d3.csv(csvURI, function(data){
        var list = [];
        for(let i = 0; i < data.length; i++){
            list.push({"player":null,"from":"null","to":null,"fromCountry":null,"toCountry":null});
            list[i].player = data[i].player.substring(0, data[i].player.indexOf("(")-1);
            list[i].from = data[i].from.substring(0, data[i].from.indexOf("(")-1);
            list[i].to = data[i].to.substring(0, data[i].to.indexOf("(")-1);
            list[i].fromCountry = getCountryOfTransfersDatasetString(data[i].from);
            list[i].toCountry = getCountryOfTransfersDatasetString(data[i].to);
        }
        var fromList = [];
        for(let i = 0; i < 1000; i++){
            if(fromList.indexOf(list[i].fromCountry) == -1){
                fromList.push(list[i].fromCountry);
            }
        }
        console.log(fromList);
    });
}

function getCountryOfTransfersDatasetString(string){
    var process1 = string.substring(string.indexOf(")") + 1, string.length - 1);
    var process2 = process1.substring(process1.indexOf(")") + 1, process1.length - 1);
    var process3 = process2.substring(process2.indexOf(")") + 1, process2.length - 1);
    return process3.substring(0, process3.indexOf("(")).trim();
}
parseToList(transfersURI);