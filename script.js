const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');
const xScoreElement = document.getElementById('xScore');
const oScoreElement = document.getElementById('oScore');

let oTurn;
let xScore = 0;
let oScore = 0;
const winningScore = 5;

startGame();

restartButton.addEventListener('click', () => {
    resetScores();
    startGame();
});

function startGame() {
    oTurn = false;
    messageElement.innerText = "X's turn";
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerText = ''; // Clear the text content of each cell
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false, currentClass); // Check if there's a winner
    } else if (isDraw()) {
        endGame(true); // Check if it's a draw
    } else {
        swapTurns(); // Switch turns
        setBoardHoverClass(); // Update hover effect
        updateMessage(); // Update message
    }
}

function endGame(draw, winnerClass) {
    if (draw) {
        messageElement.innerText = 'Draw!';
    } else {
        const winner = winnerClass === X_CLASS ? "X" : "O";
        messageElement.innerText = `${winner} wins this round!`;
        updateScore(winnerClass);
    }
    if (xScore >= winningScore || oScore >= winningScore) {
        messageElement.innerText = `${oScore >= winningScore ? "O's" : "X's"} Wins the Game!`;
        setTimeout(() => {
            resetScores();
            startGame();
        }, 1000); // Delay reset to show end message
    } else {
        setTimeout(() => {
            messageElement.innerText += ' Another round?';
            startGame(); // Ask for another round
        }, 1000); // Delay to display who won
    }
}

function updateScore(winnerClass) {
    if (winnerClass === X_CLASS) {
        xScore++;
        xScoreElement.innerText = xScore;
    } else {
        oScore++;
        oScoreElement.innerText = oScore;
    }
}

function resetScores() {
    xScore = 0;
    oScore = 0;
    xScoreElement.innerText = xScore;
    oScoreElement.innerText = oScore;
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass.toUpperCase(); // Display 'X' or 'O'
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function updateMessage() {
    messageElement.innerText = `${oTurn ? "O's" : "X's"} turn`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}



       