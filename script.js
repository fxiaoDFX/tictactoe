const gameController = (() => {
    const cells = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');
    let xTurn;
    const x = 'x';
    const circle = 'circle';

    /**
     * Set up cells an enable hover
     */
    function startGame() {
        cells.forEach(cell => {
            cell.addEventListener('click', handleClick, {once: true});
        });
        xTurn = true;
        setBoardClassHover();
    }

    function handleClick(e) {
        const cell = e.target;
        const currentMark = xTurn ? x : circle;
        // placeMark
        displayController.placeMark(cell, currentMark);
        // check for win
        // check for draw
        // switch turns
        switchTurns();
        setBoardClassHover();  
    }

    /**
     * Get list of cells
     * @return {NodeList} a list of cells
     */
    function getCells() {
        return cells;
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

    startGame();

    return { getCells };
})();

const displayController = (() => {
    // place mark of current player when cell is clicked
    const placeMark = (cell, currentMark) => {
        cell.classList.add(currentMark);
    }
    // reset board when game over or click reset button
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', resetGame);

    /**
     * Hide winner screen and clear the board
     */
    function resetGame() {
        const displayWinnerScreen = document.getElementById('displayWinner');
        displayWinnerScreen.classList.remove('show');

        const cells = gameController.getCells();
        removeMark(cells);
    }

    /**
     * Remove all marks on the board
     * @param {NodeList} list of cells
     */
    function removeMark(list) {
        list.forEach(cell => {
            cell.className = 'cell';
        })
    }

    return { placeMark, resetGame };
})();
