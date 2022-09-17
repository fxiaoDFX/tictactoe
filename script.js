const gameController = (() => {
    const cells = document.querySelectorAll('[data-cell]');
    const winnerText = document.querySelector('[data-winner-text]');
    const board = document.getElementById('board');
    const x = 'x';
    const circle = 'circle';
    let currentMark = null;
    let xTurn = null;
    const WinningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    /**
     * Set up cells an enable hover
     */
    function startGame() {
        cells.forEach(cell => {
            cell.addEventListener('click', handleClick, { once: true });
        });
        xTurn = true;
        setBoardClassHover();
    }

    function handleClick(e) {
        const cell = e.target;
        currentMark = xTurn ? x : circle;
        // placeMark
        displayController.placeMark(cell, currentMark);

        // check for win
        if (checkWin(currentMark)) {
            endGame(false);
            // check for draw
        } else if (isDraw()) {
            endGame(true);
        }
        else {
            // switch turns
            switchTurns();
            setBoardClassHover();
        }
    }

    function switchTurns() {
        xTurn = !xTurn;
    }

    function setBoardClassHover() {
        board.className = 'board';
        if (xTurn) {
            board.classList.add(x);
        } else {
            board.classList.add(circle);
        }
    }

    /**
     * 
     * @param {string} currentMark current player 
     * @returns boolean of whether current player has 3 marks in a row
     */
    function checkWin(currentMark) {
        let count = 0;
        for (let i = 0; i < WinningCombinations.length; i++) {
            for (let j = 0; j < WinningCombinations[0].length; j++) {
                if (cells[WinningCombinations[i][j]].classList.contains(currentMark)) {
                    if (j === 2) {
                        return true;
                    } else {
                        continue;
                    }
                } else {
                    break;
                }
            }
        }
        return false;
    }

    /**
     * Checks if all cells are filled with an 'x' or 'circle' marker
     * @returns boolean
     */
    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(x) || cell.classList.contains(circle);
        });
    }

    /**
     * 
     * @param {boolean} draw is true or false
     */
    function endGame(draw) {
        if (draw) {
            winnerText.textContent = 'It\'s a draw';
            displayController.showGameResult();
        } else {
            let winner = currentMark === 'x' ? 'X' : 'O';
            winnerText.innerHTML = `<h1>${winner}</h1>is the winner!`;
            displayController.showGameResult();
        }
    }

    /**
     * Clear values and reset board. Hide game result screen.
     */
    function resetGame() {
        cells.forEach(cell => cell.className = 'cell');
        displayController.hideScreen();
        xTurn = null;
        currentMark = null;
        startGame();
    }

    // restart game button
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', resetGame);

    startGame();
})();

const displayController = (() => {
    const gameResultScreen = document.getElementById('displayWinner');

    // place mark of current player when cell is clicked
    const placeMark = (cell, currentMark) => {
        cell.classList.add(currentMark);
    }

    function showGameResult() {
        gameResultScreen.classList.add('show');
    }

    /**
     * Hide winner screen
     */
    function hideScreen() {
        gameResultScreen.classList.remove('show');
    }

    return { placeMark, hideScreen, showGameResult };
})();
