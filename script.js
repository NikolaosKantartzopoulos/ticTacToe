//---	DOM    ---
let gameboardDOM = document.getElementById("gameBoard");
let newGameDOM = document.getElementById("newGame");
let c0 = document.getElementById("c0");
let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let c4 = document.getElementById("c4");
let c5 = document.getElementById("c5");
let c6 = document.getElementById("c6");
let c7 = document.getElementById("c7");
let c8 = document.getElementById("c8");

//---	OBJECTS    ---
var createPlayer = (name, marker) => {
  return { name, marker };
};
var gameBoard = {
  theGameboard: ["", "", "", "", "", "", "", "", ""],
  playerO: createPlayer("Player 1", "O"),
  playerX: createPlayer("Player 2", "X"),
};
//--- GLOBAL VARIABLES  ---
let activePlayer = gameBoard.playerO;
let turnCounter = 1;
//---	MODULES    ---

var menu = (() => {
  var newGame = () => {
    console.log("newGame called");
    document.getElementById("win_block").textContent = ``;
    turnCounter = 1;
    domControl.clearScreen();
    gameBoard.theGameboard = ["", "", "", "", "", "", "", "", ""];
    gameboardDOM.style =
      "display: grid; justify-content: center; align-items: center;";
    gameFlow.round(gameBoard.playerO, gameBoard.playerX);
  };
  return { newGame };
})();
var gameFlow = (() => {
  let round = (playerA, playerB) => {
    console.log(`gameFlow turnCounter = ${turnCounter}`);
    if (turnCounter % 2 != 0) {
      activePlayer = playerA;
      console.log(
        `Active player: ${activePlayer.name} --- expected ${activePlayer.marker}`
      );
    } else {
      activePlayer = playerB;
      console.log(
        `Active player: ${activePlayer.name} --- expected ${activePlayer.marker}`
      );
    }
  };
  var isValidPosition = (cellId) => {
    if (document.getElementById(cellId).textContent == "") {
      console.log(`Slotid isValidPosition ${cellId} `);
      return true;
    } else {
      console.log(`Slotid --FAIL-- isValidPosition ${cellId} `);
      return false;
    }
  };
  let win_check = (player) => {
    console.log(`Started win check for ${player}`);
    if (
      (gameBoard.theGameboard[0] == gameBoard.theGameboard[1] &&
        gameBoard.theGameboard[1] == gameBoard.theGameboard[2] &&
        gameBoard.theGameboard[0] != "") ||
      (gameBoard.theGameboard[3] == gameBoard.theGameboard[4] &&
        gameBoard.theGameboard[4] == gameBoard.theGameboard[5] &&
        gameBoard.theGameboard[3] != "") ||
      (gameBoard.theGameboard[6] == gameBoard.theGameboard[7] &&
        gameBoard.theGameboard[7] == gameBoard.theGameboard[8] &&
        gameBoard.theGameboard[6] != "") ||
      (gameBoard.theGameboard[0] == gameBoard.theGameboard[3] &&
        gameBoard.theGameboard[3] == gameBoard.theGameboard[6] &&
        gameBoard.theGameboard[0] != "") ||
      (gameBoard.theGameboard[1] == gameBoard.theGameboard[4] &&
        gameBoard.theGameboard[4] == gameBoard.theGameboard[7] &&
        gameBoard.theGameboard[1] != "") ||
      (gameBoard.theGameboard[2] == gameBoard.theGameboard[5] &&
        gameBoard.theGameboard[5] == gameBoard.theGameboard[8] &&
        gameBoard.theGameboard[2] != "") ||
      (gameBoard.theGameboard[0] == gameBoard.theGameboard[4] &&
        gameBoard.theGameboard[4] == gameBoard.theGameboard[8] &&
        gameBoard.theGameboard[0] != "") ||
      (gameBoard.theGameboard[2] == gameBoard.theGameboard[4] &&
        gameBoard.theGameboard[4] == gameBoard.theGameboard[6] &&
        gameBoard.theGameboard[2] != "")
    ) {
      domControl.endGameFreeze();

      document.getElementById(
        "win_block"
      ).textContent = `${activePlayer.name} wins!`;
    }
  };
  return { round, isValidPosition, win_check };
})();

var domControl = (() => {
  var cells = document.querySelectorAll("#gameBoard>div");
  var clearScreen = () => {
    cells.forEach((element) => {
      element.textContent = "";
    });
  };
  var endGameFreeze = () => {
    gameboardDOM.style.display = "none";
  };
  var addMarker = (player, slotId) => {
    if (!gameFlow.isValidPosition(slotId)) {
      //	Valid position???
      console.log(`Position ${slotId} in not valid. Skipping addMarker`);
    } else {
      document.getElementById(slotId).textContent = player.marker;
      gameBoard.theGameboard[slotId[1]] = player.marker;
      //console.log(gameBoard.theGameboard);
      //console.log(
      //  `addMarker called for player: ${player.name} (ACTIVE PLAYER: ${activePlayer} at ${slotId}`
      //);
      gameFlow.win_check(player);
      turnCounter++;
      if (turnCounter == 11) {
        domControl.endGameFreeze();
        document.getElementById("win_block").textContent = `It's a tie!`;
      }
    }
    gameFlow.round(gameBoard.playerO, gameBoard.playerX);
  };
  return { addMarker, clearScreen, endGameFreeze };
})();

//---	FUNCTIONS    ---

//---   Event Listeners     ---
newGameDOM.addEventListener("click", menu.newGame);
Array.from(document.querySelectorAll(".slot")).forEach((element) => {
  element.addEventListener("click", () => {
    domControl.addMarker(activePlayer, element.getAttribute("id"));
  });
});
