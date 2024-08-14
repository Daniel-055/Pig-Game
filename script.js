'use strict';
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0E1 = document.querySelector("#score--0");
const score1E1 = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceE1 = document.querySelector(".dice"); 
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


let scores, currentScore, activePlayer, playing;
//Starting condition
const initialization = function() {
//To keep the track of currrent player and current player score
    scores = [0,0]; //To store the player 1 & player 2 score
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0E1.textContent = 0;
    score1E1.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceE1.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");

}

initialization();
//This function used to switch the player
const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active"); //toggle method is used to the class exist only one element at once
    player1El.classList.toggle("player--active"); //toggle method is used to the class exist only one element at once
}

//Rolling condition
btnRoll.addEventListener("click", function() {
    if(playing) {
    //1.Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceE1.classList.remove("hidden");
    diceE1.src = `dice-${dice}.png`;

    //3.Check for rolled dice 1:if true swutched to next player
    if(dice !== 1) {
        //Add dice to current score
        currentScore = currentScore + dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } 
    else {
        switchPlayer();
    } 
}
});

btnHold.addEventListener("click", function() {
    if(playing) {
    //1.Add current score to active players
    scores[activePlayer] += currentScore; //scores[activePlayer] = scores[activePlayers] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2.Check if player's sccore is >=100
    if(scores[activePlayer] >= 100) {
        //finish the game
        playing = false;
        diceE1.classList.add("hidden");
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    }
    else {
    //3.Switch to the next player
    switchPlayer();
    }
}
});

btnNew.addEventListener("click", initialization);