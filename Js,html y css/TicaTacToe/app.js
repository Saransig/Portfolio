//Creacion de variable para el juego
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let boardStatus = Array(9).fill('');


//Combinar las posibles lineas ganadoras
const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],       //Filas
    [0,3,6], [1,4,7], [2,5,8],     //Columnas
    [0,4,8], [2,4,6]          //Diagnales
];


//Añadir evento clic a cada celda
cells.forEach((cell, index)=>{
    cell.addEventListener('click', ()=>cellClick(index));
});


//Manipular el clic de una celda
function cellClick(index){
    //Evita sobrescribir o segir si ya hay ganador
    if(boardStatus[index] || checkWin()) return;
    boardStatus[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    //Verificar si hay ganador
    if(checkWin()){
        statusText.textContent = `¡ ${currentPlayer} ha ganado !`;
        return;
    }

    //Verifica si hay empate
    if(boardStatus.every(cell=>cell)){
        statusText.textContent = `¡Es un empate!`;
        return;
    }

    //Cambia el jugador
    currentPlayer = currentPlayer === 'X'?'O':'X';
    statusText.textContent = `${currentPlayer} es tu turno`;
}


//Comprueba si hay una combinacion ganadora
function checkWin(){
    const winningLine = winningCombos.find(combo=>{
        const [a,b,c]  = combo;
        return boardStatus[a] && boardStatus[a] === boardStatus[b] && boardStatus[a] === boardStatus[c];
    });

    if(winningLine){
        //Resaltar celdas ganadoras
        winningLine.forEach(index=> cells[index].classList.add('highlight'));
        return true;
    }
    return false;

    
    // return winningCombos.some(combo=>{
    //     const[a,b,c]= combo;
    //     return boardStatus[a] && boardStatus[a] === boardStatus[b] && boardStatus[a] === boardStatus[c];
    // });
}


//Reset el juego
function resetGame(){
    boardStatus = Array(9).fill('');
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    statusText.textContent = 'Comienza el jugador X';
}

//Agregar boton de reinicio en el HTML
document.body.insertAdjacentHTML('beforeend', '<button onclick="resetGame()">Reiniciar juego</button>');