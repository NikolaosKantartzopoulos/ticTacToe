//---	DOM    ---
let gameboardDOM = document.getElementById("gameBoard");
let newGameDOM = document.getElementById("newGame");
//let cellsDOM = document.querySelectorAll(".slot");

//---	OBJECTS    ---
var gameBoard = {
  gameboard: [
    { a1: "" },
    { a2: "" },
    { a3: "" },
    { b1: "" },
    { b2: "" },
    { b3: "" },
    { c1: "" },
    { c2: "" },
    { c3: "" },
  ],
};
var createPlayer = (name, marker) => {
  return { name, marker };
};
let player1 = createPlayer("Nikos", "O");
let player2 = createPlayer("Sandra", "X");
let activePlayer = player1;
let turnCounter = 1;
//---	MODULES    ---

var menu = (() => {
  var newGame = () => {
    console.log("newGame called");
    turnCounter = 1;
    domControl.clearScreen();
    gameFlow.round(player1, player2);
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
  var isValidPosition = (cellId) =>
    document.getElementById(cellId).textContent == "" ? true : false;
  return { round, isValidPosition };
})();

var domControl = (() => {
  var cells = document.querySelectorAll("#gameBoard>div");
  var clearScreen = () => {
    cells.forEach((element) => {
      element.textContent = "";
    });
  };
  var addMarker = (player, slotId) => {
    if (!gameFlow.isValidPosition(slotId)) {
      console.log(`Position ${slotId} in not valid. Skipping addMarker`);
    } else {
      document.getElementById(slotId).textContent = player.marker;
      console.log(
        `addMarker called for player: ${player.name} (ACTIVE PLAYER: ${activePlayer} at ${slotId}`
      );
      turnCounter++;
    }

    gameFlow.round(player1, player2);
  };
  var render = () => {
    domControl.clearScreen();
    return {};
  };
  return { addMarker, clearScreen, render };
})();

//---	FUNCTIONS    ---

//---   Event Listeners     ---
newGameDOM.addEventListener("click", menu.newGame);
Array.from(document.querySelectorAll(".slot")).forEach((element) => {
  element.addEventListener("click", () => {
    domControl.addMarker(activePlayer, element.getAttribute("id"));
  });
});
