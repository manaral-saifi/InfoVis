SwitchCommands = (function(){

    const rankingMapDOM = document.querySelector("#map"),
          transferMapDOM = document.querySelector("#transferMap"),
          rankingButtonsDOM = document.querySelector("#buttons"),
          transferButtonsDOM = document.querySelector("#transferButtons"),
          rankingText = document.querySelector(".ranking"),
          transferText = document.querySelector(".transfer"),
          investorText = document.querySelector(".investor");
    
    var that = {};
    
    function init(){
        initSwitchCommands();
        return that;
    }
    
    function initSwitchCommands(){
        document.querySelector("#switchCommands").addEventListener("click", function(event){
            if(event.target.getAttribute("id") == "transferMapSwitch" && transferMapDOM.classList.contains("hidden")){
                handleTransferChange();
            } else if(event.target.getAttribute("id") == "rankingMapSwitch" && rankingMapDOM.classList.contains("hidden")) {
                handleRankingChange();
            } else if(event.target.getAttribute("id") == "investorMapSwitch"){
                handleInvestorChange();
            }
        });
    }
    
    function handleRankingChange(){
        rankingMapDOM.classList.remove("hidden");
        transferMapDOM.classList.add("hidden");                
        rankingButtonsDOM.classList.remove("hidden");
        transferButtonsDOM.classList.add("hidden");
        if(investorText.classList.contains("hidden")){
            transferText.classList.add("hidden");
        } else {
            investorText.classList.add("hidden");
        }
        rankingText.classList.remove("hidden");
    }
    
    function handleTransferChange(){
        rankingMapDOM.classList.add("hidden");
        transferMapDOM.classList.remove("hidden");
        rankingButtonsDOM.classList.add("hidden");
        transferButtonsDOM.classList.remove("hidden");
        if(investorText.classList.contains("hidden")){
            rankingText.classList.add("hidden");
        } else {
            investorText.classList.add("hidden");
        }
        transferText.classList.remove("hidden");
    }
    
    function handleInvestorChange(){
        rankingMapDOM.classList.add("hidden");
        transferMapDOM.classList.add("hidden");
        rankingButtonsDOM.classList.add("hidden");
        transferButtonsDOM.classList.add("hidden");
        investorMapDOM.classList.remove("hidden");
         if(investorText.classList.contains("hidden")){
            rankingText.classList.add("hidden");
        } else {
             transferText.classList.add("hidden");
        }
        investorText.classList.remove("hidden");
    }
    
    that.init = init;
    
    return that;
    
}());