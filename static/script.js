const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            status.innerText = `Player ${currentPlayer} Wins!`;
            return;
        }
    }

    if (!boardState.includes("")) {
        gameActive = false;
        status.innerText = "It's a Draw!";
    }
}

function handleClick(event) {
    const index = event.target.dataset.index;
    
    if (!gameActive || boardState[index] !== "") return;
    
    boardState[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.classList.add('taken');

    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) {
        status.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';
    status.innerText = `Player X's Turn`;
    
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('taken');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
