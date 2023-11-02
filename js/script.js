/* script.js */

let playerHealth = 5;
let computerHealth = 5;

const selectionContainer = document.querySelector("#select-text-section");
const selectionText = document.createElement("div");

const playerContainer = document.querySelector("#combat-left");
const computerContainer = document.querySelector("#combat-right");
const playerHealthBar = document.createElement("div");
const computerHealthBar = document.createElement("div");

generateContent();

function generateContent() {

    selectionContainer.appendChild(selectionText);

    generateHealthBars();

    updateSelectionTextSection();
}

function generateHealthBars() {

    playerHealthBar.style.display = "flex";
    playerHealthBar.style.padding = "10px";
    playerHealthBar.style.flexBasis = "50px";
    playerHealthBar.style.width = "200px";

    computerHealthBar.style.display = "flex";
    computerHealthBar.style.padding = "10px";
    computerHealthBar.style.flexBasis = "50px";
    computerHealthBar.style.width = "200px";

    // Add health bar to each container
    playerContainer.appendChild(playerHealthBar);
    computerContainer.appendChild(computerHealthBar);

    // Create health bars from health pieces = total health
    for(let i = 0; i < (playerHealth + computerHealth); i++) {

        const healthPiece = document.createElement("div");
        healthPiece.classList.add("health-piece");
        healthPiece.style.backgroundColor = "rgb(0,255,0)";
        healthPiece.style.border = "2px solid black";
        healthPiece.style.flex = "1";

        // Add to both player and computer sides
        if(i < playerHealth){

            playerHealthBar.appendChild(healthPiece);
        }
        else {

            computerHealthBar.appendChild(healthPiece);
        }
    }
}

function updateSelectionTextSection() {

    if(playerHealth == 0) {

        selectionText.textContent = "YOU WIN!";
    }
    else if(computerHealth == 0) {

        selectionText.textContent = "YOU LOSE!";
    }
    else {

        selectionText.textContent = "Choose your weapon!";
    }
}

function updateHealthBars() {


}

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
        else { // Tie or other result; repeat
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