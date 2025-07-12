const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  
  if (boardState[index] !== '' || !gameActive) return;
  
  boardState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  
  if (checkWinner()) {
    gameStatus.textContent = `🎉 ${currentPlayer} Wins! 🎉`;
    gameActive = false;
  } else if (boardState.every(cell => cell !== '')) {
    gameStatus.textContent = '😊 It\'s a Tie! 😊';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameStatus.textContent = '';
  
  cells.forEach(cell => {
    cell.textContent = '';
  });
}
board.addEventListener('click', handleCellClick);
restartBtn.addEventListener('click', restartGame);

