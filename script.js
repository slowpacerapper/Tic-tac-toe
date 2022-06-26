const cells = document.querySelectorAll("[data-cells]");
const board = document.querySelector("[data-board]");
const winningMessageContainer = document.querySelector(
  "#winning-message-container"
);
const winningTextMessage = document.querySelector("#winning-text-message");
const restartButton = document.querySelector("#restart-btn");

let circleTurn;
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let currentClass = X_CLASS;
setBoardHoverMarker();

const WINNING_COMBO = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

cells.forEach((cell) => {
  cell.addEventListener(
    "click",
    (e) => {
      e.target.classList.add(currentClass);
      if (checkForWins(currentClass)) {
        winningMessageContainer.classList.add("show");
        winningTextMessage.innerText = `${currentClass.toUpperCase()} WINS`;
        return;
      }
      if (!checkForWins(currentClass) && !checkForDraws()) {
        swap();
        setBoardHoverMarker();
        return;
      }
      if (checkForDraws()) winningMessageContainer.classList.add("show");
      winningTextMessage.innerText = "Draw";
    },
    { once: true }
  );
});

// This restart button's function could be
// changed to something else if you wanna.
// That is if you wanna implement a score counter or something..
restartButton.addEventListener("click", () => {
  window.document.location = "/";
});

function setBoardHoverMarker() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  currentClass = circleTurn === true ? CIRCLE_CLASS : X_CLASS;
  board.classList.add(currentClass);
}

function swap() {
  circleTurn = !circleTurn;
}

function checkForWins(currentClass) {
  return WINNING_COMBO.some((combination) => {
    return combination.every((index) => {
      const cellElements = [...cells];
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function checkForDraws() {
  return WINNING_COMBO.every((combination) => {
    return combination.every((index) => {
      return (
        [...cells][index].classList.contains(X_CLASS) ||
        [...cells][index].classList.contains(CIRCLE_CLASS)
      );
    });
  });
}
