let playerTxt = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle (document.body).getPropertyValue('--winning-blocks')

const O = "O";
const X = "X";
let currentPlayer = X;
let board = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if (!board[id]) {
        board[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerTxt.innerText = `Player ${currentPlayer} has won!`;
            let winningBlocks = playerHasWon();

            winningBlocks.map( box => boxes [box].style.backgroundColor = winnerIndicator)
            return
        }

        currentPlayer = currentPlayer === X ? O : X;
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a,b,c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener("click", () => {
    board = Array(9).fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerTxt.innerText = "Tic Tac Toe";
    currentPlayer = X;
});

startGame();