$(document).ready(function() {

    let gamestate = {
        turnplayer:"white",
        whitetimer:300,
        blacktimer:300,
        activePiecePosition: ["noneX", "noneY"],
        activePieceType: "none"
    };


    // click on a piece and make it active
    $('.chessblock').on('click', function(){

        if ( ($(this).children().hasClass("wpiece") && gamestate.turnplayer == "white") || ($(this).children().hasClass("bpiece") && gamestate.turnplayer == "black") ){
            $('.chesspiece').removeClass('activepiece')
            $(this).children().addClass('activepiece')
            gamestate.activePieceType = $(this).children('div')[0].className.split(' ')[3]
            gamestate.activePiecePosition[0] = this.className.split(' ')[1].split('-')[0]
            gamestate.activePiecePosition[1] = this.className.split(' ')[1].split('-')[1]
            console.log("You picked a " + gamestate.activePieceType + " at position " + gamestate.activePiecePosition[0] + "-" + gamestate.activePiecePosition[1])
            // if(gamestate.activePieceType == wpawn ){
                
            // }

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
        $('.start').html("Resign")
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