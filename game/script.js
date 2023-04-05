var cards = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
var gameBoard = document.querySelector(".game-board");
var tries = document.querySelector(".tries");
var timer = document.querySelector(".timer");
var remainingTries = 3;
var timeLimit = 10;
var currentTimer = timeLimit;
var isTimerRunning = false;
var isGameFinished = false;

function shuffleCards() {
    for(var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}

function createGameBoard() {
    for(var i = 0; i < cards.length; i++) {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = "?";
        card.setAttribute("data-value", cards[i]);
        card.addEventListener("click", function() {
            if(isGameFinished) {
                return;
            }
            if(!isTimerRunning) {
                startTimer();
            }
            if(this.innerHTML !== "?") {
                return;
            }
            this.innerHTML = this.getAttribute("data-value");
            var selectedCards = document.querySelectorAll(".card[disabled!=disabled]:not([innerHTML='?'])");
            if(selectedCards.length === 2) {
                if(selectedCards[0].innerHTML === selectedCards[1].innerHTML) {
                    selectedCards[0].setAttribute("disabled", "disabled");
                    selectedCards[1].setAttribute("disabled", "disabled");
                    checkIfGameFinished();
                } else {
                    remainingTries--;
                    tries.innerHTML = "Remaining Tries: " + remainingTries;
                    if(remainingTries === 0) {
                        endGame(false);
                    }
                    setTimeout(function() {
                        selectedCards[0].innerHTML = "?";
                        selectedCards[1].innerHTML = "?";
                    }, 1000);
                }
            }
        });
        gameBoard.appendChild(card);
    }
}

function startTimer() {
    isTimerRunning = true;
    var intervalId = setInterval(function() {
        currentTimer--;
        timer.innerHTML = "Time Remaining: " + currentTimer;
        if(currentTimer === 0) {
            clearInterval(intervalId);
            endGame(false);
        }
    }, 1000);
}

function checkIfGameFinished() {
    var disabledCards = document.querySelectorAll(".card[disabled=disabled]");
    if(disabledCards.length === cards.length) {
        endGame(true);
    }
}

function endGame(hasWon) {
    isGameFinished = true;
    var message = hasWon ? "Congratulations, you won!" : "Game over, you lost!";
    alert(message);
}

shuffleCards();
createGameBoard();
tries.innerHTML = "Remaining Tries: " + remainingTries;
timer.innerHTML = "Time Remaining: " + currentTimer;