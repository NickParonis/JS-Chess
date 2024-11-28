export function addwhitepieces(){
    $('.a-1,.h-1').children().addClass("piece wpiece wrook")
    $('.b-1,.g-1').children().addClass("piece wpiece wknight")
    $('.c-1,.f-1').children().addClass("piece wpiece wbishop")
    $('.d-1').children().addClass("piece wpiece wqueen")
    $('.e-1').children().addClass("piece wpiece wking")
    $('.a-2,.b-2,.c-2,.d-2,.e-2,.f-2,.g-2,.h-2').children().addClass("piece wpiece wpawn")
}
export function addblackpieces(){
    $('.a-8,.h-8').children().addClass("piece bpiece brook")
    $('.b-8,.g-8').children().addClass("piece bpiece bknight")
    $('.c-8,.f-8').children().addClass("piece bpiece bbishop")
    $('.d-8').children().addClass("piece bpiece bqueen")
    $('.e-8').children().addClass("piece bpiece bking")
    $('.a-7,.b-7,.c-7,.d-7,.e-7,.f-7,.g-7,.h-7').children().addClass("piece bpiece bpawn")
}

export function translatePositionToNum(letter){
    switch(letter) {
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
export function translatePositiontoLetter(number){
    switch(number) {
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