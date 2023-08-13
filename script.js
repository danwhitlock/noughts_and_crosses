// Create game board

const gameBoardModule = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    return {
        getGameBoard: () => gameboard,
        updateCell: (index, symbol) => {
            gameboard[index] = symbol;
        },

    }
})();

// Player factory

const playerFactory = (name, symbol) => {
    return {name, symbol};
};

const playerOne = playerFactory('Player One', 'X');
const playerTwo = playerFactory('Player Two', 'O');

// Game player

const gameFlowModule = (() => {
    let currentPlayer = playerOne;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const checkWin = () => {
        const winningCombos = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6] 
        ];

    const gameboard = gameBoardModule.getGameBoard();

    for (const combo of winningCombos) {
        const [a,b,c] = combo;
           if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                return true;
            }
        }

        return false;
    };

    const checkDraw = () => {
        const gameboard = gameBoardModule.getGameBoard();
        return !gameboard.includes("");
    };

    return {
        getCurrentPlayer: () => currentPlayer,
        switchPlayer,
        checkWin,
        checkDraw,
    };

})();

// function to render the board on the page

function renderGameBoard() {
    const gameContainer = document.getElementById('game-container');
    const gameboard = gameBoardModule.getGameBoard();

    // clear any existing content
    gameContainer.innerHTML = '';
    const resultElement = document.getElementById('result');
    resultElement.textContent = '';

    // create game cells
    gameboard.forEach((cellValue, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cellValue;
        cell.addEventListener('click', () => handleCellClick(index)); 
        gameContainer.appendChild(cell);
    });
}

// handling player moves

function handleCellClick(index) {
    const gameboard = gameBoardModule.getGameBoard();
    const currentPlayer = gameFlowModule.getCurrentPlayer();

    if (!gameboard[index]) {
        gameBoardModule.updateCell(index, currentPlayer.symbol);

        renderGameBoard();

        gameFlowModule.switchPlayer();

        if (gameFlowModule.checkWin()) {

        } else if (gameFlowModule.checkDraw()) {

        }
    }

    const resultElement = document.getElementById('result');
    if (gameFlowModule.checkWin()) {
        const currentPlayer = gameFlowModule.getCurrentPlayer();
        resultElement.textContent = `${currentPlayer.name} wins!`;
    } else if (gameFlowModule.checkDraw()) {
        resultElement.textContent = "It's a draw!";
    }
}

renderGameBoard();

