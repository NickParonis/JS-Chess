$(document).ready(function() {

    let gamestate = {
        turnplayer:"white",
        whitetimer:300,
        blacktimer:300,
        activePiecePosition: ["X", 0],
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

    // Clicking on square functionality
    $('.chessblock').on('click', function(){

        // if User clicked on piece during its turn
        if ( ($(this).children().hasClass("wpiece") && gamestate.turnplayer == "white") || ($(this).children().hasClass("bpiece") && gamestate.turnplayer == "black") ){
            $('.chesspiece').removeClass('activepiece')
            $(this).children().addClass('activepiece')

            // sets gamestate active piece type and position
            gamestate.activePieceType = $(this).children('div')[0].className.split(' ')[3]
            gamestate.activePieceColor = $(this).children('div')[0].className.split(' ')[2]
            gamestate.activePiecePosition[0] = this.className.split(' ')[1].split('-')[0]
            gamestate.activePiecePosition[1] = parseInt(this.className.split(' ')[1].split('-')[1]);
            console.log("You picked a " + gamestate.activePieceType + " at position " + gamestate.activePiecePosition[0] + "-" + gamestate.activePiecePosition[1])
            console.log("The color of the piece is " + gamestate.activePieceColor)


            // case white pawn is picked
            if(gamestate.activePieceType == "wpawn" ){
                $('.chessblock').removeClass('available')
                // case white pawn hasnt moved at all
                if(gamestate.activePiecePosition[1] == 2 ){
                    let Ypos = gamestate.activePiecePosition[1] + 1
                    let Ypos2 = gamestate.activePiecePosition[1] + 2
                    // show available squares for the pawn to move
                    $('.' + gamestate.activePiecePosition[0] + '-' + Ypos).addClass("available")
                    $('.' + gamestate.activePiecePosition[0] + '-' + Ypos2).addClass("available")
                }
                else {
                    let Ypos = gamestate.activePiecePosition[1] + 1
                    // show available squares for the pawn to move
                    $('.' + gamestate.activePiecePosition[0] + '-' + Ypos).addClass("available")
                }
            }

            // case black pawn is picked
            if(gamestate.activePieceType == "bpawn" ){
                $('.chessblock').removeClass('available')
                // case pawn hasnt moved at all
                if(gamestate.activePiecePosition[1] == 7 ){
                    let Ypos = gamestate.activePiecePosition[1] - 1
                    let Ypos2 = gamestate.activePiecePosition[1] - 2
                    // show available squares for the pawn to move
                    $('.' + gamestate.activePiecePosition[0] + '-' + Ypos).addClass("available")
                    $('.' + gamestate.activePiecePosition[0] + '-' + Ypos2).addClass("available")
                }
                else {
                    let Ypos = gamestate.activePiecePosition[1] - 1
                    // show available squares for the pawn to move
                    $('.' + gamestate.activePiecePosition[0] + '-' + Ypos).addClass("available")
                }


            }
        }

        // if User clicked on available square for piece to move
        if ($(this).hasClass("available")){
            console.log(gamestate.activePieceType)
            $('.activepiece').removeClass().addClass('activepiece')
            $('.chessblock').removeClass('available')
            $(this).children().addClass("piece")
            $(this).children().addClass(gamestate.activePieceColor)
            $(this).children().addClass(gamestate.activePieceType)
            switchturnplayer()
        }
    });

    // resign button
    $(document.body).on('click', '.resign', function(){
        $('.chesspiece').removeClass('piece bpiece bpawn brook bknight bbishop bqueen bking wpiece wpawn wrook wknight wbishop wqueen wking')
        $('.resign').html("Start Game")
        $('.resign').addClass("start")
        $('.resign').removeClass("resign")
    });

    // start button
    $(document.body).on('click', '.start', function(){
        // button transform to resign
        $('.start').html("Clear")
        $('.start').addClass("resign")
        $('.start').removeClass("start")

        // Black pieces added
        $('.a-8,.h-8').children().addClass("piece bpiece brook")
        $('.b-8,.g-8').children().addClass("piece bpiece bknight")
        $('.c-8,.f-8').children().addClass("piece bpiece bbishop")
        $('.d-8').children().addClass("piece bpiece bqueen")
        $('.e-8').children().addClass("piece bpiece bking")
        $('.a-7,.b-7,.c-7,.d-7,.e-7,.f-7,.g-7,.h-7').children().addClass("piece bpiece bpawn")

        // White pieces added
        $('.a-1,.h-1').children().addClass("piece wpiece wrook")
        $('.b-1,.g-1').children().addClass("piece wpiece wknight")
        $('.c-1,.f-1').children().addClass("piece wpiece wbishop")
        $('.d-1').children().addClass("piece wpiece wqueen")
        $('.e-1').children().addClass("piece wpiece wking")
        $('.a-2,.b-2,.c-2,.d-2,.e-2,.f-2,.g-2,.h-2').children().addClass("piece wpiece wpawn")

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