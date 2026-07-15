let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let score = 0
 let bestScore = Number(localStorage.getItem("bestScore")) || 0;
function updateScore(){
    if (score > bestScore){
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
    }
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("bestScore").innerText = "Best: " + bestScore;

}
function draw(){
    const field = document.getElementById("board");
    field.innerHTML = "";
    for(let row of board){
        for(let cell of row){
            const div = document.createElement("div");
            div.className = "cell";
            if (cell !== 0) {
                div.textContent = cell;
                div.classList.add("tile-" + cell);
            }
            field.appendChild(div);
        }
    }
}


function addRandomTile() {
    const empty = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if ( board[row][col] === 0){
                empty.push([row, col]);
            }
         }
        }
        if (empty.length === 0) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * empty.length);
        const [r, c] = empty[randomIndex];
        board [r][c] = 2;
    }
document.addEventListener("keydown", function(event){
    if(event.key === "ArrowLeft"){
        moveLeft();
    }
    if(event.key === "ArrowRight"){
        moveRight();
    }
    if(event.key === "ArrowUp"){
        moveUp();
    }
    if(event.key === "ArrowDown"){
        moveDown();
    }
});
function moveLeft() {
    let oldBoard = JSON.stringify(board);
    for (let row = 0; row <4; row++){
        board[row] = slide(board[row]);
    }
    let newBoard = JSON.stringify(board);
    if (oldBoard !== newBoard) {
        addRandomTile();
    }

    draw();
    updateScore();
    if (!canMove()) {
        document.getElementById("gameOver").style.display = "flex";
    }
}
function moveRight() {
    let oldBoard = JSON.stringify(board);
    for(let row = 0; row < 4; row++){
        board[row].reverse();
        board[row] = slide(board[row]);
        board[row].reverse();
    }
    let newBoard = JSON.stringify(board);
    if (oldBoard !== newBoard) {
        addRandomTile();
    }
    draw();
   updateScore();
   if (!canMove()) {
    document.getElementById("gameOver").style.display = "flex";
}
}

function slide(row) {
    let filtered = row.filter(number => number !== 0);
    for (let i=0; i< filtered.length - 1; i++){
        if(filtered[i] === filtered[i + 1]){
            filtered[i] = filtered[i] * 2;
            score += filtered[i]
            filtered.splice(i + 1, 1);
        }
    }
    while (filtered.length <4 ){
        filtered.push(0);
    }
    return filtered;
}
function moveUp(){
   
    let oldBoard = JSON.stringify(board);
    for (let col = 0; col < 4; col++){
    let column = [];
for (let row = 0; row < 4; row++){
            column.push(board[row][col]);
        }
        column = slide(column);
        for (let row = 0; row < 4; row++) {
            board[row][col] = column[row];
     }
    }
    let newBoard = JSON.stringify(board);
    if (oldBoard !== newBoard) {
        addRandomTile();
    
  }
  draw();
  updateScore();
  if (!canMove()) {
    document.getElementById("gameOver").style.display = "flex";
}
}
function moveDown(){
    let oldBoard = JSON.stringify(board);
    for (let col = 0; col < 4; col++){
        let column = [];
        for (let row = 0; row < 4; row++){
            column.push(board[row][col]);
        }
        column.reverse();
        column = slide(column);
        column.reverse()
        for (let row = 0; row < 4; row++){
            board[row][col] = column[row];
        }
    }
        let newBoard = JSON.stringify(board);
        if (oldBoard !== newBoard) {
            addRandomTile();
    }
    draw();
    updateScore();
    if (!canMove()) {
       document.getElementById("gameOver").style.display = "flex";
    }
}
function newGame(){
    document.getElementById("gameOver").style.display = "none";
    board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
    ];
    score = 0;

    addRandomTile();
    addRandomTile();

    draw();
    updateScore();
}
document.getElementById("restart").addEventListener("click", newGame);

function canMove() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                return true;
            }
        }
    }
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === board[row][col + 1]) {
                return true;
            }
        }
    }
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === board[row + 1][col]) {
                return true;
            }
        }
    }
    return false;
}
let startX = 0;
let startY = 0;
document.addEventListener("touchstart", function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});
document.addEventListener("touchend", function(event) {
    let endX = event.changedTouches[0].clientX;
    let endY = event.changedTouches[0].clientY;
    let dx = endX - startX;
    let dy = endY - startY;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) {
            moveRight();
        } else if (dx < -30) {
            moveLeft();
        }
    } else {
        if (dy > 30) {
            moveDown();
        } else if (dy < -30) {
            moveUp();
        }
    }
});
document.addEventListener("touchmove", function(event) {
    event.preventDefault();
}, { passive: false });

addRandomTile();
addRandomTile();
draw();
updateScore();
