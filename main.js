$(document).ready(function() {

    let gamestate = {
        turnplayer:"white",
        whitetimer:300,
        blacktimer:300,
        activePiecePositionXY: ["X", 0],
        activePiecePositionXnumerical: 0,
        activePieceType: "none",
        activePieceColor: "none"
    };

    function switchturnplayer(){
        switch(gamestate.turnplayer) {
            case "white":
                gamestate.turnplayer = "black"
                break;
            case "black":
                gamestate.turnplayer = "white"
                break;
        }
    }

    function translateXpositiontoNum(Xpos){
        switch(Xpos) {
            case "a":
                return 1
            case "b":
                return 2
            case "c":
                return 3
            case "d":
                return 4
            case "e":
                return 5
            case "f":
                return 6
            case "g":
                return 7
            case "h":
                return 8
        }
    }

    function addwhitepieces(){
        $('.a-1,.h-1').children().addClass("piece wpiece wrook")
        $('.b-1,.g-1').children().addClass("piece wpiece wknight")
        $('.c-1,.f-1').children().addClass("piece wpiece wbishop")
        $('.d-1').children().addClass("piece wpiece wqueen")
        $('.e-1').children().addClass("piece wpiece wking")
        $('.a-2,.b-2,.c-2,.d-2,.e-2,.f-2,.g-2,.h-2').children().addClass("piece wpiece wpawn")
    }

    function addblackpieces(){
        $('.a-8,.h-8').children().addClass("piece bpiece brook")
        $('.b-8,.g-8').children().addClass("piece bpiece bknight")
        $('.c-8,.f-8').children().addClass("piece bpiece bbishop")
        $('.d-8').children().addClass("piece bpiece bqueen")
        $('.e-8').children().addClass("piece bpiece bking")
        $('.a-7,.b-7,.c-7,.d-7,.e-7,.f-7,.g-7,.h-7').children().addClass("piece bpiece bpawn")
    }


    // Clicking on square functionality
    $('.chessblock').on('click', function(){

        // if User clicked on HIS piece during HIS turn
        if ( ($(this).children().hasClass("wpiece") && gamestate.turnplayer == "white") || ($(this).children().hasClass("bpiece") && gamestate.turnplayer == "black") ){
            $('.chesspiece').removeClass('activepiece')
            $(this).children().addClass('activepiece')

            // update gamestate
            gamestate.activePieceType = $(this).children('div')[0].className.split(' ')[3]
            gamestate.activePieceColor = $(this).children('div')[0].className.split(' ')[2]
            gamestate.activePiecePositionXY[0] = this.className.split(' ')[1].split('-')[0];
            gamestate.activePiecePositionXnumerical = translateXpositiontoNum(gamestate.activePiecePositionXY[0])
            gamestate.activePiecePositionXY[1] = parseInt(this.className.split(' ')[1].split('-')[1]);
            console.log("You picked a " + gamestate.activePieceType + " at position " + gamestate.activePiecePositionXY[0] + "-" + gamestate.activePiecePositionXY[1])
            console.log("The color of the piece is " + gamestate.activePieceColor)
            console.log("The letter " + gamestate.activePiecePositionXY[0] + " is equal to numer " + gamestate.activePiecePositionXnumerical)
            
            
            // case white pawn is picked
            if(gamestate.activePieceType == "wpawn" ){

                // removes other available squares maybe from previous clicked pawns
                $('.chessblock').removeClass('availableSquares')
                
                
                // if white pawn hasnt moved at all
                if(gamestate.activePiecePositionXY[1] == 2 ){
                    let availablePosNumToMove = gamestate.activePiecePositionXY[1] + 1
                    let availablePosNumToMove2 = gamestate.activePiecePositionXY[1] + 2
                    let availableSquareToMoveno1 = $('.' + gamestate.activePiecePositionXY[0] + '-' + availablePosNumToMove)
                    let availableSquareToMoveno2 = $('.' + gamestate.activePiecePositionXY[0] + '-' + availablePosNumToMove2)
                    console.log("pawn can be moved to " + availableSquareToMoveno1 + " or to " + availableSquareToMoveno2)

                    // if both next 2 squares are free for the pawn
                    if (!availableSquareToMoveno1.children().hasClass("piece") && !availableSquareToMoveno2.children().hasClass("piece")){
                        // then both next 2 squares are becoming available
                        availableSquareToMoveno1.addClass("availableSquares")
                        availableSquareToMoveno2.addClass("availableSquares")
                    }
                    // else if only on the second square there is a piece
                    else if (!availableSquareToMoveno1.children().hasClass("piece") && availableSquareToMoveno2.children().hasClass("piece")){
                        // then the pawn can only move up one position, the next square is becoming available
                        availableSquareToMoveno1.addClass("availableSquares")
                    }
                }
                // else if pawn has moved so it can me moved up to 1 square up
                else {
                    let availablePosNumToMove = gamestate.activePiecePositionXY[1] + 1
                    let availableSquareToMoveno1 = $('.' + gamestate.activePiecePositionXY[0] + '-' + availablePosNumToMove)
                    if (!availableSquareToMoveno1.children().hasClass("piece")){
                        availableSquareToMoveno1.addClass("availableSquares")
                    }
                }
                // if white pawn has enemy pieces in position he can "kill"
                if(true){
                    console.log("works")
                }

                // if pawn has enemy pieces it can capture
                // to build
            }


            // case black pawn is picked INCOMPLETE
            if(gamestate.activePieceType == "bpawn" ){
                $('.chessblock').removeClass('availableSquares')
                // case pawn hasnt moved at all
                if(gamestate.activePiecePositionXY[1] == 7 ){
                    let availablePosNumToMove = gamestate.activePiecePositionXY[1] - 1
                    let availablePosNumToMove2 = gamestate.activePiecePositionXY[1] - 2
                    // show availableSquares squares for the pawn to move
                    $('.' + gamestate.activePiecePositionXY[0] + '-' + availablePosNumToMove).addClass("availableSquares")
                    $('.' + gamestate.activePiecePositionXY[0] + '-' + availablePosNumToMove2).addClass("availableSquares")
                }
                else {
                    let availablePosNumToMove = gamestate.activePiecePositionXY[1] - 1
                    // show availableSquares squares for the pawn to move
                    $('.' + gamestate.activePiecePositionXY[0] + '-' + availablePosNumToMove).addClass("availableSquares")
                }
            }
        }

        // if User clicked on availableSquares for piece to move
        if ($(this).hasClass("availableSquares")){
            console.log(gamestate.activePieceType)
            $('.activepiece').removeClass().addClass('chesspiece')
            $('.chessblock').removeClass('availableSquares')
            $(this).children().addClass("piece")
            $(this).children().addClass(gamestate.activePieceColor)
            $(this).children().addClass(gamestate.activePieceType)
            switchturnplayer()
        }
    });

    // reset button
    $(document.body).on('click', '.reset', function(){
        $('.chesspiece').removeClass('activepiece piece bpiece bpawn brook bknight bbishop bqueen bking wpiece wpawn wrook wknight wbishop wqueen wking');
        $('.reset').html("Start Game");
        $('.reset').addClass("start");
        $('.reset').removeClass("reset");
        $('.chessblock').removeClass("availableSquares");
        gamestate.turnplayer = "white"
    });

    // start button
    $(document.body).on('click', '.start', function(){
        //transformation from startButton to resetButton
        $('.start').html("Clear")
        $('.start').addClass("reset")
        $('.start').removeClass("start")

        addblackpieces();
        addwhitepieces();

        // start countdown
        let minute = 4;
        let sec = 59;
        setInterval(function() {
            document.getElementById("wtimer").innerHTML = minute + " : " + sec;
            sec--;
            if (sec == 00) {
                minute --;
                sec = 59;
                if (minute == 0) {
                    minute = 5;
                }
            }
        }, 1000);
    });
});