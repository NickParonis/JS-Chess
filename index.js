import { addwhitepieces, addblackpieces, translatePositionToNum, translatePositiontoLetter } from './gameFunctions.js';

$(document).ready(function() {
    let startWhiteTimer 
    let startBlackTimer 

    let gamestate = {
        turnplayer:"white",
        whitetimer:{
            remainingTime: 900,
            addSeconds(seconds){
                gamestate.whitetimer.remainingTime = gamestate.whitetimer.remainingTime + seconds
            }
        },
        blacktimer:{
            remainingTime: 900,
            addSeconds(seconds){
                gamestate.blacktimer.remainingTime = gamestate.whitetimer.remainingTime + seconds
            }
        },

        activePiecePositionX: "x",
        activePiecePositionXnum: 0,
        activePiecePositionY: "y",
        activePiecePositionYnum: 0,

        activePieceType: "none",
        activePieceColor: "none"
    };

    // start button
    $(document.body).on('click', '.start', function(){
        //transformation from startButton to resetButton
        $('.start').html("Clear");
        $('.start').addClass("reset");
        $('.start').removeClass("start");
        addblackpieces();
        addwhitepieces();
        startWhiteTimer = setInterval(function(){
            gamestate.whitetimer.remainingTime = gamestate.whitetimer.remainingTime - 1
            $(".whitesTimeDisplay").empty()
            $(".whitesTimeDisplay").append(gamestate.whitetimer.remainingTime);
        }, 1000);
        $(".whitesTime").children(".red").addClass("opacity100")
    });

    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false
    })

    $(document.body).on('input', '.whitesTimeRange', function(){
        gamestate.whitetimer.remainingTime = $(".whitesTimeRange").val()
        $(".whiteSettings").children(".whitesTime").empty();
        $(".whiteSettings").children(".whitesTime").append(gamestate.whitetimer.remainingTime);
    });
    $(document.body).on('input', '.blacksTimeRange', function(){
        gamestate.blacktimer.remainingTime = $(".blacksTimeRange").val()
        $(".blackSettings").children(".blacksTime").empty()
        $(".blackSettings").children(".blacksTime").append(gamestate.blacktimer.remainingTime);
    });
    $(document.body).on("click", ".modalSaveButton", function(){
        $(".whitesTimeDisplay").empty()
        $(".whitesTimeDisplay").append(gamestate.whitetimer.remainingTime)
        $(".blacksTimeDisplay").empty()
        $(".blacksTimeDisplay").append(gamestate.blacktimer.remainingTime)
    })
    function switchturnplayer(){
        switch(gamestate.turnplayer) {
            case "white":
                $(".whitesTime").children(".red").removeClass("opacity100")
                clearInterval(startWhiteTimer);
                gamestate.turnplayer = "black";
                startBlackTimer = setInterval(function(){
                    gamestate.blacktimer.remainingTime = gamestate.blacktimer.remainingTime - 1
                    $(".blacksTimeDisplay").empty()
                    $(".blacksTimeDisplay").append(gamestate.blacktimer.remainingTime);
                }, 1000);
                $(".blacksTime").children(".red").addClass("opacity100")
            break;
            case "black":
                $(".blacksTime").children(".red").removeClass("opacity100")
                clearInterval(startBlackTimer);
                gamestate.turnplayer = "white";
                startWhiteTimer = setInterval(function(){
                    gamestate.whitetimer.remainingTime = gamestate.whitetimer.remainingTime - 1
                    $(".whitesTimeDisplay").empty()
                    $(".whitesTimeDisplay").append(gamestate.whitetimer.remainingTime);
                }, 1000);
                $(".whitesTime").children(".red").addClass("opacity100")
            break;
        }
    }

    


    // reset button
    $(document.body).on('click', '.reset', function(){
        $('.chesspiece').removeClass('activepiece piece bpiece bpawn brook bknight bbishop bqueen bking wpiece wpawn wrook wknight wbishop wqueen wking');
        $('.reset').html("Start Game");
        $('.reset').addClass("start");
        $('.reset').removeClass("reset");
        $('.chessblock').removeClass("availableSquares");
        gamestate.turnplayer = "white"
        clearInterval(startWhiteTimer);
        clearInterval(startBlackTimer);
        gamestate.whitetimer.remainingTime = 900
        $(".whitesTimeDisplay").empty()
        $(".whitesTimeDisplay").append(gamestate.whitetimer.remainingTime);
        gamestate.blacktimer.remainingTime = 900
        $(".blacksTimeDisplay").empty()
        $(".blacksTimeDisplay").append(gamestate.blacktimer.remainingTime);
    });

    // color changer
    $(document.body).on('click', '.void', function(){
        $('.pagecontainer').removeClass("MediterraneanIsland")
        $('.pagecontainer').addClass("intotheVoid")
        // start countdown
    });
    $(document.body).on('click', '.mediterranean', function(){
        $('.pagecontainer').removeClass("intotheVoid")
        $('.pagecontainer').addClass("MediterraneanIsland")
        // start countdown
    });
});