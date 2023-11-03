/* script.js */

const PLAYER_HEALTH_MAX = 5;
const COMPUTER_HEALTH_MAX = 5;
const CRITICAL_HEALTH_POINT = 0.33;

let gameActive = false;

let playerHealthCurrent = PLAYER_HEALTH_MAX;
let computerHealthCurrent = COMPUTER_HEALTH_MAX;

const selectionContainer = document.querySelector("#select-text-section");
const selectionText = document.createElement("div");

const playerContainer = document.querySelector("#combat-left");
const computerContainer = document.querySelector("#combat-right");
const playerHealthBar = document.createElement("div");
const computerHealthBar = document.createElement("div");
const playerHealthArray = [];
const computerHealthArray = [];

const btnList = document.querySelector("ul");

const gameTextBox = document.querySelector("#combat-mid-textbox");
const gameText = document.createElement("ul");

game();

function generateContent() {

    selectionContainer.appendChild(selectionText);
    gameTextBox.appendChild(gameText);

    generateHealthBars();

    generateSelectionButtons();

    updateSelectionTextSection();

    updateHealthBars();
}

function generateHealthBars() {

    // Add containers with text + health bar underneath
    const playerHealthContainer = document.createElement("div");
    playerHealthContainer.classList.add("health-container");
    playerHealthContainer.textContent = "Health";

    const computerHealthContainer = document.createElement("div");
    computerHealthContainer.classList.add("health-container");
    computerHealthContainer.textContent = "Health";

    playerHealthBar.classList.add("health-bar");
    computerHealthBar.classList.add("health-bar");

    // Add health bar to each container
    playerContainer.appendChild(playerHealthContainer);
    playerHealthContainer.appendChild(playerHealthBar);

    computerContainer.appendChild(computerHealthContainer);
    computerHealthContainer.appendChild(computerHealthBar);

    // Add all necessary health pieces
    for(let i = 0; i < PLAYER_HEALTH_MAX; i++){

        generateHealthPiece(playerHealthBar, playerHealthArray, i);
    }

    for(let i = 0; i < COMPUTER_HEALTH_MAX; i++){

        generateHealthPiece(computerHealthBar, computerHealthArray, i);
    }
}

function generateHealthPiece(barToAddTo, healthArr, healthPos) {

    const healthPiece = document.createElement("div");
    healthPiece.classList.add("health-piece");
    healthPiece.style.backgroundColor = "rgb(0,255,0)";

    // Add to health bar array
    healthArr[healthPos] = healthPiece;

    //healthArr.add(healthPiece);
    barToAddTo.appendChild(healthPiece);
}

function generateSelectionButtons() {

    for(let i = 0; i < 3; i++) {

        const choiceButton = document.createElement("button");

        // Each button plays a different hand
        choiceButton.addEventListener("click", () => {

            if(gameActive){

                let playerChoice = "";

                switch(i) {
                    case 0:
                        playerChoice = "rock";
                        break;
                    case 1:
                        playerChoice = "paper";
                        break;
                    case 2:
                        playerChoice = "scissors";
                        break;
                }
    
                playRound(playerChoice, getComputerChoice());
            }
        });

        btnList.appendChild(choiceButton);
    }
}

function updateSelectionTextSection() {

    if(computerHealthCurrent == 0) {

        selectionText.textContent = "YOU WIN!";
    }
    else if(playerHealthCurrent == 0) {

        selectionText.textContent = "YOU LOSE!";
    }
    else {

        selectionText.textContent = "Choose your weapon!";
    }
}

function updateHealthBars() {

    colorHealthBar(playerHealthCurrent, playerHealthArray);
    colorHealthBar(computerHealthCurrent, computerHealthArray);
}

function colorHealthBar(healthCurrent, healthArr) {
    
    let healthPercentage = healthCurrent / healthArr.length;

    for(let i = 0; i < healthArr.length; i++) {

        if(i >= healthCurrent) {

            healthArr[i].style.backgroundColor = "rgb(50,50,50)";
        }
        else {

            if(healthPercentage == 1) {

                healthArr[i].style.backgroundColor = "rgb(0,255,0)";
            }
            else if(healthPercentage > CRITICAL_HEALTH_POINT) {

                healthArr[i].style.backgroundColor = "rgb(255,255,0)";
            }
            else {

                healthArr[i].style.backgroundColor = "rgb(255,0,0)";
            }
        }
    }
}

function addText(addText) {

    const newTextItem = document.createElement("li");
    newTextItem.classList.add("combat-mid-text-main");
    newTextItem.textContent = addText;

    gameText.insertBefore(newTextItem, gameText.firstChild);

    // Set older text to gray
    if(gameText.childNodes.length > 1) {

        gameText.childNodes[1].classList.remove("combat-mid-text-main");
        gameText.childNodes[1].classList.add("combat-mid-text-secondary");
    }

    // Remove text beyond the 11th
    if(gameText.childNodes.length > 10) {

        gameText.childNodes[gameText.childNodes.length - 1].remove();
    }
}

function colorTextBox() {

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

    let result = "";
    let resultText = playerChoice + " vs " + computerChoice + ", ";

    if(playerChoice == computerChoice) {

        result = "tie";
    }
    else {

        switch(playerChoice){

            case "rock":
                switch(computerChoice){
                    case "paper":
                        result = "computer";
                        break;
                    case "scissors":
                        result = "player";
                        break;
                }
                break;

            case "paper":
                switch(computerChoice){
                    case "scissors":
                        result = "computer";
                        break;
                    case "rock":
                        result = "player";
                        break;
                }
                break;

            case "scissors":
                switch(computerChoice){
                    case "rock":
                        result = "computer";
                        break;
                    case "paper":
                        result = "player";
                        break;
                }
                break;

            default:
                result = "tie";
                break;
        }
    }

    if(result == "player") {

        computerHealthCurrent--;
        resultText += "player wins!";
    }
    else if(result == "computer") {

        playerHealthCurrent--;
        resultText += "computer wins!";
    }
    else {

        resultText += "tie!";
    }

    addText(resultText);

    updateHealthBars();

    if(playerHealthCurrent == 0 ||
        computerHealthCurrent == 0) {

        endGame();
    }
}

function endGame() {

    updateSelectionTextSection();
    gameActive = false;
}

function game() {

    generateContent();
    gameActive = true;
}