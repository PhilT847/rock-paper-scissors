/* script.js */

game();

function game() {

    let playerPoints = 0;
    let computerPoints = 0;
    let resultMessage = "";

    for(i = 0; i < 5; i++) {

        const playerChoice = prompt("Make your selection.").toLowerCase();

        const result = playRound(playerChoice, getComputerChoice());
        
        console.log("Result: " + result);

        if(result == "player") {
            playerPoints++;
        }
        else if(result == "computer") {
            computerPoints++;
        }
        else { /* Tie or other result; repeat */
            i--;
        }
    }

    if(playerPoints > computerPoints){

        resultMessage += "Player wins, " + playerPoints + "-" + computerPoints + "!";
    }
    else if(playerPoints < computerPoints) {

        resultMessage += "Player loses, " + playerPoints + "-" + computerPoints + "!";
    }
    else {

        resultMessage += "Tied, " + playerPoints + "-" + computerPoints + "!";
    }

    console.log(resultMessage);
}

function getComputerChoice() {

    let rand = Math.floor(Math.random() * 3);

    switch(rand) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function playRound(playerChoice, computerChoice) {

    if(playerChoice === computerChoice) {

        return "tie";
    }
    else {

        switch(playerChoice){
            case "rock":
                switch(computerChoice){
                    case "paper":
                        return "computer";
                    case "scissors":
                        return "player";
                }
            case "paper":
                switch(computerChoice){
                    case "scissors":
                        return "computer";
                    case "rock":
                        return "player";
                }
            case "scissors":
                switch(computerChoice){
                    case "rock":
                        return "computer";
                    case "paper":
                        return "player";
                }
            default:
                return "tie";
        }
    }
}