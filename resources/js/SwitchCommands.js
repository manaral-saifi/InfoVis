SwitchCommands = (function(){

    const rankingMapDOM = document.querySelector("#map"),
          transferFromMapDOM = document.querySelector("#transferFromMap"),
          transferToMapDOM = document.querySelector("#transferToMap"),
          investorMapDOM = document.querySelector("#investorMap"),
          rankingButtonsDOM = document.querySelector("#buttons"),
          transferButtonsDOM = document.querySelector("#transferButtons"),
          rankingText = document.querySelector(".ranking"),
          transferText = document.querySelector(".transfer"),
          investorText = document.querySelector(".investor");
    
    var that = {},
        toSelected = false;
    
    function init(){
        initSwitchCommands();
        return that;
    }
    
    /*
    after a select command is selected, this function checks which one it was and if it is already shown or not;
    then it executes the fitting action (or does nothing if selected map is already visible)
    */
    
    function initSwitchCommands(){
        document.querySelector("#switchCommands").addEventListener("click", function(event){
            if(event.target.getAttribute("id") == "transferMapSwitch" && transferFromMapDOM.classList.contains("hidden") && transferToMapDOM.classList.contains("hidden")){
                handleTransferChange();
            } else if(event.target.getAttribute("id") == "rankingMapSwitch" && rankingMapDOM.classList.contains("hidden")) {
                handleRankingChange();
            } else if(event.target.getAttribute("id") == "investorMapSwitch" && investorMapDOM.classList.contains("hidden")){
                handleInvestorChange();
            }
        });
    }
    
    /*
    following three functions handle the action that fits to the pressed button;
    first it checks which map was selected before, then it sets the views of the previous map to hidden and shows the views
    of the selected map;
    */
    
    function handleRankingChange(){
        if(transferFromMapDOM.classList.contains("hidden") && transferToMapDOM.classList.contains("hidden")){
            makeRankingVisible();
            hideInvestor();
        } else {
            makeRankingVisible();
            hideTransfer();
        }
    }
    
    function handleTransferChange(){
        if(rankingMapDOM.classList.contains("hidden")){
            makeTransferVisible();
            hideInvestor();
        } else {
            makeTransferVisible();
            hideRanking();
        }
    }
    
    function handleInvestorChange(){
        if(rankingMapDOM.classList.contains("hidden")){
            makeInvestorVisible();
            hideTransfer();
        } else {
            makeInvestorVisible();
            hideRanking();
        }
    }
    
    /*
    following three functions define what happens when a certain map gets set visible (ranking, transfer or investor);
    */
    
    function makeRankingVisible(){
        rankingMapDOM.classList.remove("hidden");                
        rankingButtonsDOM.classList.remove("hidden");
        rankingText.classList.remove("hidden");
    }
    
    function makeTransferVisible(){
        if(!toSelected){
            transferFromMapDOM.classList.remove("hidden");  
        } else {
            transferToMapDOM.classList.remove("hidden");
        }
        transferButtonsDOM.classList.remove("hidden");
        transferText.classList.remove("hidden");
    }
    
    function makeInvestorVisible(){
        investorMapDOM.classList.remove("hidden");                
        investorText.classList.remove("hidden");
    }
    
    /*
    following three functions define what happens when a certain map gets set hidden (ranking, transfer or investor);
    */
    
    function hideRanking(){
        rankingMapDOM.classList.add("hidden");
        rankingButtonsDOM.classList.add("hidden");
        rankingText.classList.add("hidden");
    }
    
    function hideTransfer(){
        if(transferFromMapDOM.classList.contains("hidden")){
            transferToMapDOM.classList.add("hidden");
            toSelected = true;
        } else {
            transferFromMapDOM.classList.add("hidden");
            toSelected = false;
        }
        transferText.classList.add("hidden");
        transferButtonsDOM.classList.add("hidden");
    }
    
    function hideInvestor(){
        investorMapDOM.classList.add("hidden");
        investorText.classList.add("hidden");
    }
    
    that.init = init;
    
    return that;
    
}());