// script.js
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const resultScreen = document.getElementById("result-screen");
  const resultMessage = document.getElementById("result-message");
  const newGameButton = document.getElementById("new-game-button");
  const playAgainButton = document.getElementById("play-again-button");
  const startTimeElement = document.getElementById("start-time");
  const gameTitle = document.getElementById("game-title");
  
  let currentPlayer = "X";
  let gameBoard = Array(9).fill(null);
  let gameOver = false;

  // Show start time
  const startTime = new Date();
  startTimeElement.textContent = `Game started at: ${startTime.toLocaleTimeString()}`;

  // Initialize board
  function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((_, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-index", index);
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    });
  }

  // Handle cell click
  function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    if (gameBoard[index] || gameOver) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    if (checkWinner()) {
      showResult(`Player ${currentPlayer} wins!`);
      gameOver = true;
    } else if (gameBoard.every(cell => cell)) {
      showResult("It's a draw!");
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  // Check for a winner
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],            // Diagonals
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return gameBoard[a] &&
             gameBoard[a] === gameBoard[b] &&
             gameBoard[a] === gameBoard[c];
    });
  }

  // Show result screen
  function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = "block";
  }

  // Start a new game
  function resetGame() {
    gameBoard.fill(null);
    currentPlayer = "X";
    gameOver = false;
    resultScreen.style.display = "none";
    createBoard();
  }

  // Event listeners
  newGameButton.addEventListener("click", resetGame);
  playAgainButton.addEventListener("click", resetGame);

  // Start the game
  createBoard();
});
