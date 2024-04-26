const { cp } = require('fs');
const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {

  r: {
    name: 'Rock',
    winsAgainst: 's'
  },

  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },

  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }

};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/*REFACTOR:

Updated cmd and cpu variable names to userMove and cpuMove to be more readable.

Removed redundat console.log() for invalid command and added getHelp() function instead.

Moved game state update process (wins++, loss++, tie++) to process move to be better inline with function responsability.

 */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  console.log("  Type 'r' for Rock");
  console.log("  Type 'p' for Paper");
  console.log("  Type 's' for Scissors");
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");
}

function getWinner(userMove, cpuMove) {
  if (userMove === cpuMove) { // tie
    return 0;
  }
  else if (VALID_MOVES[userMove].winsAgainst === cpuMove) { // win
    return 1;
  } else { // loss
    return -1;
  }
}

function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  const cpuMove = validMoveKeys[randomIndex];
  return cpuMove;
}

function processMove(userMove, cpuMove) {
  console.log(`You pick ${userMove}, computer picks ${cpuMove}.`);

  const result = getWinner(userMove, cpuMove)
  if (result === 0) {
    console.log("You tie.\n");
    ties++;
  } else if (result === 1) {
    console.log("You win!\n");
    wins++;
  } else {
    console.log("You lose...\n");
    losses++;
  }
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (userMove) => {
    userMove = userMove.toLowerCase();

    if (userMove === 'h') {
      printHelp();
    } else if (userMove === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[userMove]){
      const cpuMove = getCPUMove();
      processMove(userMove, cpuMove);
    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }

    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  console.log("Type 'h' for a list of valid commands\n");

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};
