$(document).ready(function() {
    let availRookPositions = []
    let availBishopPositions = []
    let availNightPositions = []
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
        activePiecePositionXY: ["X", 0],
        activePiecePositionXnumerical: 0,
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
            $(".whitesTime").empty()
            $(".whitesTime").append(gamestate.whitetimer.remainingTime);
        }, 1000);
    });

    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false
    })

    $(document.body).on('input', '.whitesTimeRange', function(){
        gamestate.whitetimer.remainingTime = $(".whitesTimeRange").val()
        $(".whitesTime").empty();
        $(".whitesTime").append(gamestate.whitetimer.remainingTime);
    });
    $(document.body).on('input', '.blacksTimeRange', function(){
        gamestate.blacktimer.remainingTime = $(".blacksTimeRange").val()
        $(".blacksTime").empty()
        $(".blacksTime").append(gamestate.blacktimer.remainingTime);
    });
    function switchturnplayer(){
        switch(gamestate.turnplayer) {
            case "white":
                clearInterval(startWhiteTimer);
                gamestate.turnplayer = "black";
                startBlackTimer = setInterval(function(){
                    gamestate.blacktimer.remainingTime = gamestate.blacktimer.remainingTime - 1
                    $(".blacksTime").empty()
                    $(".blacksTime").append(gamestate.blacktimer.remainingTime);
                }, 1000);
            break;
            case "black":
                clearInterval(startBlackTimer);
                gamestate.turnplayer = "white";
                startWhiteTimer = setInterval(function(){
                    gamestate.whitetimer.remainingTime = gamestate.whitetimer.remainingTime - 1
                    $(".whitesTime").empty()
                    $(".whitesTime").append(gamestate.whitetimer.remainingTime);
                }, 1000);
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
    function createAvailableSquaresForwhite(element){
        if (!element.children().hasClass("wpiece")){
            element.addClass("availableSquares")
        }
    }
    function createAvailableSquaresForblack(element){
        if (!element.children().hasClass("bpiece")){
            element.addClass("availableSquares")
        }
    }
    function whitePawnMovement(){
        // pawn can be moved up to 4 different squares
        // pawn can move 1 up
        let availPosYNum = gamestate.activePiecePositionXY[1] + 1
        let availPosXLetter = gamestate.activePiecePositionXY[0]
        let availableSquareToMoveno1 = $('.' + availPosXLetter + '-' + availPosYNum)
        // pawn can move 2 up
        let availPosYNum2 = gamestate.activePiecePositionXY[1] + 2
        let availPosXLetter2 = gamestate.activePiecePositionXY[0]
        let availableSquareToMoveno2 = $('.' + availPosXLetter2 + '-' + availPosYNum2)
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
            let availPosXLetter = gamestate.activePiecePositionXY[0]
            let availableSquareToMoveno1 = $('.' + availPosXLetter + '-' + availPosYNum)
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
    function blackPawnMovement(){
        // removes other available squares maybe from previous clicked pawns
        $('.chessblock').removeClass('availableSquares')
        // pawn can move 1 down
        let availPosYNum = gamestate.activePiecePositionXY[1] - 1
        let availPosXLetter = gamestate.activePiecePositionXY[0]
        let availableSquareToMoveno1 = $('.' + availPosXLetter + '-' + availPosYNum)
        // pawn can move 2 down
        let availPosYNum2 = gamestate.activePiecePositionXY[1] - 2
        let availPosXLetter2 = gamestate.activePiecePositionXY[0]
        let availableSquareToMoveno2 = $('.' + availPosXLetter2 + '-' + availPosYNum2)
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
    function knightMovement(){
        // knight can be moved up to 8 different squares that will be stored in following array
        availNightPositions = []
        // knight can move to X+1 Y+2
        if ( gamestate.activePiecePositionXnumerical < 8 && gamestate.activePiecePositionXY[1] < 7){
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 1);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 2;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availNightPositions.push(availableSquareToMove);
            console.log("Knight can be moved to 1" + availableSquareToMove);
        }
        // knight can move to X+1 Y-2
        if ( gamestate.activePiecePositionXnumerical < 8 && gamestate.activePiecePositionXY[1] > 2){
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 1)
            let availPosYNum = gamestate.activePiecePositionXY[1] - 2
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum)
            availNightPositions.push(availableSquareToMove);
            console.log("Knight can be moved to 2" + availableSquareToMove)
        }
        // knight can move to X-1 Y+2
        if ( gamestate.activePiecePositionXnumerical > 1 && gamestate.activePiecePositionXY[1] < 7){
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 1)
            let availPosYNum = gamestate.activePiecePositionXY[1] + 2
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum)
            availNightPositions.push(availableSquareToMove);
            console.log("Knight can be moved to 3" + availableSquareToMove)
        }
        // knight can move to X-1 Y-2
        if ( gamestate.activePiecePositionXnumerical > 1 && gamestate.activePiecePositionXY[1] > 2){
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 1)
            let availPosYNum = gamestate.activePiecePositionXY[1] - 2
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum)
            availNightPositions.push(availableSquareToMove);
            console.log("Knight can be moved to 4" + availableSquareToMove)
        }
        // knight can move to X+2 Y+1
        if ( gamestate.activePiecePositionXnumerical < 7 && gamestate.activePiecePositionXY[1] < 8){
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 2);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 1;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availNightPositions.push(availableSquareToMove);
            console.log("Knight can be moved to 5" + availableSquareToMove)
        }
        // knight can move to X+2 Y-1
        if ( gamestate.activePiecePositionXnumerical < 7 && gamestate.activePiecePositionXY[1] > 1){
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 2);
            let availPosYNum = gamestate.activePiecePositionXY[1] - 1;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availNightPositions.push(availableSquareToMove);
            console.log("Knight can be moved to 6" + availableSquareToMove)
        }
        // knight can move to X-2 Y+1
        if ( gamestate.activePiecePositionXnumerical > 2 && gamestate.activePiecePositionXY[1] < 8){
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 2);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 1;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availNightPositions.push(availableSquareToMove);
            console.log("Knight can be moved to 7" + availableSquareToMove)
        }
        // knight can move to X-2 Y-1
        if( gamestate.activePiecePositionXnumerical > 2 && gamestate.activePiecePositionXY[1] > 1){
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 2);
            let availPosYNum = gamestate.activePiecePositionXY[1] - 1;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availNightPositions.push(availableSquareToMove);
            console.log("Knight can be moved to 8" + availableSquareToMove)
        }
         // create available squares the knight can move
         if(gamestate.activePieceType == "wknight"){
            availNightPositions.forEach(createAvailableSquaresForwhite);
        }
        if(gamestate.activePieceType == "bknight"){
            availNightPositions.forEach(createAvailableSquaresForblack);
        }
    }
    function whiteRookMovement(){
        availRookPositions = []
        // moving up rook positions
        for (let i = 0; i < 8 - gamestate.activePiecePositionXY[1]; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 1 + i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availRookPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("wpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("bpiece")){
                availRookPositions.push(availableSquareToMove);
                i = 8
            }
        }
        // moving down rook positions
        for (let i = 0; i < 0 + gamestate.activePiecePositionXY[1]; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical);
            let availPosYNum = gamestate.activePiecePositionXY[1] - 1 - i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availRookPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("wpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("bpiece")){
                availRookPositions.push(availableSquareToMove);
                i = 8
            }
        }
        // moving left rook positions
        for (let i = 0; i < 0 + gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 1 - i);
            let availPosYNum = gamestate.activePiecePositionXY[1];
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availRookPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("wpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("bpiece")){
                availRookPositions.push(availableSquareToMove);
                i = 8
            }
        }
        // moving right rook positions
        for (let i = 0; i < 8 - gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 1 + i) ;
            let availPosYNum = gamestate.activePiecePositionXY[1];
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availRookPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("wpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("bpiece")){
                availRookPositions.push(availableSquareToMove);
                i = 8
            }
        }
    }
    function blackRookMovement(){
        availRookPositions = []
        // moving up rook positions
        for (let i = 0; i < 8 - gamestate.activePiecePositionXY[1]; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 1 + i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availRookPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("bpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("wpiece")){
                availRookPositions.push(availableSquareToMove);
                i = 8
            }
        }
        // moving down rook positions
        for (let i = 0; i < 0 + gamestate.activePiecePositionXY[1]; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical);
            let availPosYNum = gamestate.activePiecePositionXY[1] - 1 - i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availRookPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("bpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("wpiece")){
                availRookPositions.push(availableSquareToMove);
                i = 8
            }
        }
        // moving left rook positions
        for (let i = 0; i < 0 + gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 1 - i);
            let availPosYNum = gamestate.activePiecePositionXY[1];
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availRookPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("bpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("wpiece")){
                availRookPositions.push(availableSquareToMove);
                i = 8
            }
        }
        // moving right rook positions
        for (let i = 0; i < 8 - gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 1 + i) ;
            let availPosYNum = gamestate.activePiecePositionXY[1];
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availRookPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("bpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("wpiece")){
                availRookPositions.push(availableSquareToMove);
                i = 8
            }
        }
    }
    function whiteBishopMovement(){
        availBishopPositions = []
        // moving up-right bishop positions
        for (let i = 0; i < 8 - gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 1 + i);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 1 + i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availBishopPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("wpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("bpiece")){
                availBishopPositions.push(availableSquareToMove);
                i = 8
            }
            availBishopPositions.push(availableSquareToMove);
        }
        // moving up-left bishop positions
        for (let i = 0; i < 0 + gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 1 - i);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 1 + i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availBishopPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("wpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("bpiece")){
                availBishopPositions.push(availableSquareToMove);
                i = 8
            }
            availBishopPositions.push(availableSquareToMove);
        }
        // moving bottom-right bishop positions
        for (let i = 0; i < 8 - gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 1 + i);
            let availPosYNum = gamestate.activePiecePositionXY[1] - 1 - i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availBishopPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("wpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("bpiece")){
                availBishopPositions.push(availableSquareToMove);
                i = 8
            }
            availBishopPositions.push(availableSquareToMove);
        }
        // moving bottom-left bishop positions
        for (let i = 0; i < 0 + gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 1 - i);
            let availPosYNum = gamestate.activePiecePositionXY[1] - 1 - i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availBishopPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("wpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("bpiece")){
                availBishopPositions.push(availableSquareToMove);
                i = 8
            }
            availBishopPositions.push(availableSquareToMove);
        }
    }
    function blackBishopMovement(){
        // bishop can be moved in diagonal lines that will be stored in following array
        availBishopPositions = []
        // moving up-right bishop positions
        for (let i = 0; i < 8 - gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 1 + i);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 1 + i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availBishopPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("bpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("wpiece")){
                availBishopPositions.push(availableSquareToMove);
                i = 8
            }
            availBishopPositions.push(availableSquareToMove);
        }
        // moving up-left bishop positions
        for (let i = 0; i < 0 + gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 1 - i);
            let availPosYNum = gamestate.activePiecePositionXY[1] + 1 + i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availBishopPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("bpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("wpiece")){
                availBishopPositions.push(availableSquareToMove);
                i = 8
            }
            availBishopPositions.push(availableSquareToMove);
        }
        // moving bottom-right bishop positions
        for (let i = 0; i < 8 - gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical + 1 + i);
            let availPosYNum = gamestate.activePiecePositionXY[1] - 1 - i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availBishopPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("bpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("wpiece")){
                availBishopPositions.push(availableSquareToMove);
                i = 8
            }
            availBishopPositions.push(availableSquareToMove);
        }
        // moving bottom-left bishop positions
        for (let i = 0; i < 0 + gamestate.activePiecePositionXnumerical; i++) {
            let availPosXLetter = translateNumpositiontoX(gamestate.activePiecePositionXnumerical - 1 - i);
            let availPosYNum = gamestate.activePiecePositionXY[1] - 1 - i;
            let availableSquareToMove = $('.' + availPosXLetter + '-' + availPosYNum);
            availBishopPositions.push(availableSquareToMove);
            if(availableSquareToMove.children().hasClass("bpiece")){
                i = 8
            }
            if(availableSquareToMove.children().hasClass("wpiece")){
                availBishopPositions.push(availableSquareToMove);
                i = 8
            }
            availBishopPositions.push(availableSquareToMove);
        }
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
                $('.chessblock').removeClass('availableSquares');
                whitePawnMovement();
            }
            // case black pawn is picked
            if(gamestate.activePieceType == "bpawn" ){
                // removes other available squares maybe from previous clicked pawns
                $('.chessblock').removeClass('availableSquares');
                blackPawnMovement();
            }
            // case black or white knight is picked
            if(gamestate.activePieceType == "wknight" || gamestate.activePieceType == "bknight"){
                // removes other available squares from previous clicked pieces
                $('.chessblock').removeClass('availableSquares');
                knightMovement();
            }
            // case white rook is picked
            if(gamestate.activePieceType == "wrook"){
                // removes other available squares from previous clicked pieces
                $('.chessblock').removeClass('availableSquares');
                whiteRookMovement();
                // create available squares the rook can move
                availRookPositions.forEach(createAvailableSquaresForwhite);
            }
            // case black rook is picked
            if(gamestate.activePieceType == "brook"){
                // removes other available squares from previous clicked pieces
                $('.chessblock').removeClass('availableSquares');
                blackRookMovement();
                // create available squares the rook can move
                availRookPositions.forEach(createAvailableSquaresForblack);
            }
            // case white bishop is pipcked
            if(gamestate.activePieceType == "wbishop"){
                // removes other available squares from previous clicked pieces
                $('.chessblock').removeClass('availableSquares')
                whiteBishopMovement();
                availBishopPositions.forEach(createAvailableSquaresForwhite);
            }
            // case black bishop is pipcked
            if(gamestate.activePieceType == "bbishop"){
                // removes other available squares from previous clicked pieces
                $('.chessblock').removeClass('availableSquares')
                blackBishopMovement();
                availBishopPositions.forEach(createAvailableSquaresForblack);
            }
            // case white queen is pipcked
            if(gamestate.activePieceType == "wqueen"){
                // removes other available squares from previous clicked pieces
                $('.chessblock').removeClass('availableSquares')
                whiteBishopMovement();
                whiteRookMovement();
                availBishopPositions.forEach(createAvailableSquaresForwhite);
                availRookPositions.forEach(createAvailableSquaresForwhite);
            }
            // case black queen is pipcked
            if(gamestate.activePieceType == "bqueen"){
                // removes other available squares from previous clicked pieces
                $('.chessblock').removeClass('availableSquares')
                blackBishopMovement();
                blackRookMovement();
                availBishopPositions.forEach(createAvailableSquaresForblack);
                availRookPositions.forEach(createAvailableSquaresForblack);
            }
        }

        // if user clicked on availableSquares for piece to move a.k.a user moved a piece
        if ($(this).hasClass("availableSquares")){
            $('.activepiece').removeClass().addClass('chesspiece');
            $('.chessblock').removeClass('availableSquares');
            $(this).children().removeClass().addClass("piece chesspiece");
            $(this).children().addClass(gamestate.activePieceColor);
            $(this).children().addClass(gamestate.activePieceType);
            switchturnplayer();
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
        clearInterval(startWhiteTimer);
        clearInterval(startBlackTimer);
        gamestate.whitetimer.remainingTime = 900
        $(".whitesTime").empty()
        $(".whitesTime").append(gamestate.whitetimer.remainingTime);
        gamestate.blacktimer.remainingTime = 900
        $(".blacksTime").empty()
        $(".blacksTime").append(gamestate.blacktimer.remainingTime);
    });



    // color changer
    $(document.body).on('click', '.void', function(){
        $('.chessgame').removeClass("MediterraneanIsland")
        $('.chessgame').addClass("intotheVoid")
        // start countdown
    });
    $(document.body).on('click', '.mediterranean', function(){
        $('.chessgame').removeClass("intotheVoid")
        $('.chessgame').addClass("MediterraneanIsland")
        // start countdown
    });
});