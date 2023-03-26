'use strict';

//selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//starting conditions
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, scores, activePlayer, playing;
// initializing function
const init = () => {
    currentScore = 0;
    scores = [0, 0];
    playing = true;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player1El.classList.remove('player--active')
    player0El.classList.add('player--active')
}

init();
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}
// let heldScore = 0;
// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  //generate a random dice roll
  if(playing) {
  const dice = Math.trunc(Math.random() * 6) + 1; //will give us a number btn 1 and 5, so add 1
  //display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  //check for a roled one
  //if one is true, switch to next player
  if (dice !== 1) {
    //add score to current player
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch to next player
    switchPlayer();
  }
}
});


btnHold.addEventListener('click', () => {
    // 1. Add current score to active player's score
    if(playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
 
    // 2. check score is atleast 100
    if(scores[activePlayer] >= 10) {
        playing = false;
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).
        classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).
        classList.remove('player--active')
    } else {
        switchPlayer();
    }
}
})

    btnNew.addEventListener('click', () => {
        init();
    })