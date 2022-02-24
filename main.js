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

    function translateNumpositiontoX(Num){
        switch(Num) {
            case 1:
                return "a"
            case 2:
                return "b"
            case 3:
                return "c"
            case 4:
                return "d"
            case 5:
                return "e"
            case 6:
                return "f"
            case 7:
                return "g"
            case 8:
                return "h"
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
            // clear other active piece and make ths clicked piece, active
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
                // pawn can move 1 up
                let availPosYNum = gamestate.activePiecePositionXY[1] + 1
                let availPosYLetter = gamestate.activePiecePositionXY[0]
                let availableSquareToMoveno1 = $('.' + availPosYLetter + '-' + availPosYNum)
                // pawn can move 2 up
                let availPosYNum2 = gamestate.activePiecePositionXY[1] + 2
                let availPosYLetter2 = gamestate.activePiecePositionXY[0]
                let availableSquareToMoveno2 = $('.' + availPosYLetter2 + '-' + availPosYNum2)
                // pawn can move 1 diagonal right towards topside
                // gets X pos square (g for example) and return the previous one (f for example)
                let availPosXLetter3 = translateNumpositiontoX(translateXpositiontoNum(gamestate.activePiecePositionXY[0]) - 1)
                let availPosYNum3 = gamestate.activePiecePositionXY[1] + 1
                let availableSquareToMoveno3 = $('.' + availPosXLetter3 + '-' + availPosYNum3)
                // pawn can move 1 diagonal left towards topside
                let availPosXLetter4 = translateNumpositiontoX(translateXpositiontoNum(gamestate.activePiecePositionXY[0]) + 1)
                let availPosYNum4 = gamestate.activePiecePositionXY[1] + 1
                let availableSquareToMoveno4 = $('.' + availPosXLetter4 + '-' + availPosYNum4)
                // if white pawn hasnt moved at all
                if(gamestate.activePiecePositionXY[1] == 2 ){
                    console.log("but it can also move to " + availableSquareToMoveno2)
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
                // else if pawn has moved before, it can me moved only 1 square up
                else {
                    let availPosYNum = gamestate.activePiecePositionXY[1] + 1
                    let availPosYLetter = gamestate.activePiecePositionXY[0]
                    let availableSquareToMoveno1 = $('.' + availPosYLetter + '-' + availPosYNum)
                    // if next square is free for the pawn to move
                    if (!availableSquareToMoveno1.children().hasClass("piece")){
                        availableSquareToMoveno1.addClass("availableSquares")
                    }
                }
                // if white pawn has enemy pieces in position he can "kill"
                if (availableSquareToMoveno3.children().hasClass("bpiece")){
                    availableSquareToMoveno3.addClass("availableSquares")
                }
                // if white pawn has enemy pieces in position he can "kill"
                if (availableSquareToMoveno4.children().hasClass("bpiece")){
                    availableSquareToMoveno4.addClass("availableSquares")
                }
            }
            // case black pawn is picked
            if(gamestate.activePieceType == "bpawn" ){
                // removes other available squares maybe from previous clicked pawns
                $('.chessblock').removeClass('availableSquares')
                // pawn can move 1 down
                let availPosYNum = gamestate.activePiecePositionXY[1] - 1
                let availPosYLetter = gamestate.activePiecePositionXY[0]
                let availableSquareToMoveno1 = $('.' + availPosYLetter + '-' + availPosYNum)
                // pawn can move 2 down
                let availPosYNum2 = gamestate.activePiecePositionXY[1] - 2
                let availPosYLetter2 = gamestate.activePiecePositionXY[0]
                let availableSquareToMoveno2 = $('.' + availPosYLetter2 + '-' + availPosYNum2)
                // pawn can move 1 diagonal right towards bottomside
                // gets X pos square (g for example) and return the previous one (f for example)
                let availPosXLetter3 = translateNumpositiontoX(translateXpositiontoNum(gamestate.activePiecePositionXY[0]) - 1)
                let availPosYNum3 = gamestate.activePiecePositionXY[1] - 1
                let availableSquareToMoveno3 = $('.' + availPosXLetter3 + '-' + availPosYNum3)
                // // pawn can move 1 diagonal left towards bottomside
                let availPosXLetter4 = translateNumpositiontoX(translateXpositiontoNum(gamestate.activePiecePositionXY[0]) + 1)
                let availPosYNum4 = gamestate.activePiecePositionXY[1] - 1
                let availableSquareToMoveno4 = $('.' + availPosXLetter4 + '-' + availPosYNum4)
                console.log("pawn can be moved to " + availableSquareToMoveno1)
                // if black pawn hasnt moved at all
                if(gamestate.activePiecePositionXY[1] == 7 ){
                    console.log("but it can also move to " + availableSquareToMoveno2)
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
                    let availPosYNum = gamestate.activePiecePositionXY[1] - 1
                    let availableSquareToMoveno1 = $('.' + gamestate.activePiecePositionXY[0] + '-' + availPosYNum)
                    // if next square is free for the pawn to move
                    if (!availableSquareToMoveno1.children().hasClass("piece")){
                        availableSquareToMoveno1.addClass("availableSquares")
                    }
                }
                // if white pawn has enemy pieces in position he can "kill"
                if (availableSquareToMoveno3.children().hasClass("wpiece")){
                    availableSquareToMoveno3.addClass("availableSquares")
                }
                // if white pawn has enemy pieces in position he can "kill"
                if (availableSquareToMoveno4.children().hasClass("wpiece")){
                    availableSquareToMoveno4.addClass("availableSquares")
                }
            }
        }
        // if User clicked on availableSquares for piece to move a.k.a moved a piece
        if ($(this).hasClass("availableSquares")){
            console.log(gamestate.activePieceType)
            $('.activepiece').removeClass().addClass('chesspiece')
            $('.chessblock').removeClass('availableSquares')
            $(this).children().removeClass().addClass("piece chesspiece")
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