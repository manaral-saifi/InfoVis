var d3 = d3 || {};

const transfersURI = "./data/transfers_test.csv";

function parseToList(csvURI){
    d3.csv(csvURI, function(data){
        var list = [];
        for(let i = 0; i < data.length; i++){
            list.push({"player":null,"from":"null","to":null});
            list[i].player = data[i].player.substring(0, data[i].player.indexOf("(")-1);
            list[i].from = data[i].from.substring(0, data[i].from.indexOf("(")-1);
            list[i].to = data[i].to.substring(0, data[i].to.indexOf("(")-1);
        }
    });
}