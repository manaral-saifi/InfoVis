SwitchCommands = (function(){

    const rankingMapDOM = document.querySelector("#map"),
          transferMapDOM = document.querySelector("#transferMap"),
          investorMapDOM = document.querySelector("#investorMap"),
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
    
    /*
    after a select command is selected, this function checks which one it was and if it is already shown or not;
    then it executes the fitting action (or does nothing if selected map is already visible)
    */
    
    function initSwitchCommands(){
        document.querySelector("#switchCommands").addEventListener("click", function(event){
            if(event.target.getAttribute("id") == "transferMapSwitch" && transferMapDOM.classList.contains("hidden")){
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
        if(transferMapDOM.classList.contains("hidden")){
            rankingMapDOM.classList.remove("hidden");                
            rankingButtonsDOM.classList.remove("hidden");
            rankingText.classList.remove("hidden");
            investorMapDOM.classList.add("hidden");
            investorText.classList.add("hidden");
        } else {
            rankingMapDOM.classList.remove("hidden");                
            rankingButtonsDOM.classList.remove("hidden");
            rankingText.classList.remove("hidden");
            transferMapDOM.classList.add("hidden");
            transferText.classList.add("hidden");
            transferButtonsDOM.classList.add("hidden");
        }
    }
    
    function handleTransferChange(){
        if(rankingMapDOM.classList.contains("hidden")){
            transferMapDOM.classList.remove("hidden");                
            transferButtonsDOM.classList.remove("hidden");
            transferText.classList.remove("hidden");
            investorMapDOM.classList.add("hidden");
            investorText.classList.add("hidden");
        } else {
            transferMapDOM.classList.remove("hidden");                
            transferButtonsDOM.classList.remove("hidden");
            transferText.classList.remove("hidden");
            rankingMapDOM.classList.add("hidden");
            rankingButtonsDOM.classList.add("hidden");
            rankingText.classList.add("hidden");
        }
    }
    
    function handleInvestorChange(){
        if(rankingMapDOM.classList.contains("hidden")){
            investorMapDOM.classList.remove("hidden");                
            investorText.classList.remove("hidden");
            transferMapDOM.classList.add("hidden");
            transferButtonsDOM.classList.add("hidden");
            transferText.classList.add("hidden");
        } else {
            investorMapDOM.classList.remove("hidden");                
            investorText.classList.remove("hidden");
            rankingMapDOM.classList.add("hidden");
            rankingButtonsDOM.classList.add("hidden");
            rankingText.classList.add("hidden");
        }
    }
    
    that.init = init;
    
    return that;
    
}());