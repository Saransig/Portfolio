//Creacion de variable para el juego
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let boardStatus = Array(9).fill('');


//variables para las puntuaciones
let scoreX= 0;
let scoreO= 0;


//variable para historial y almacenamiento local
let gameHistory = JSON.parse(localStorage.getItem('gameHistory2P')) || [];


//variable para controlar no hacer clic en las otras celdas una vez ganado
let gameActive = true;


//Temporizador para borrar el historial despues de un tiempo
let clearHistoryTimeout;

//almacenar turnos de movimineto
let currentMoves=[];



//funcion para actualizar el historial 
function updateHistoryGame(winner){
    const result = winner ? `Ganador: ${winner}` : 'Empate';
    const moves = currentMoves.join(',');
    gameHistory.push(result);

    //Actualizar localStorage
    localStorage.setItem('gameHistory2P', JSON.stringify(gameHistory));

    //Mostrar historial
    showHistoryGame();
    resetClearHistoryTimeout();

}

//funcion para mostrar el historial
function showHistoryGame(){
    const historyList = document.getElementById('history-cell');
    historyList.innerHTML = '';

    gameHistory.forEach((result, index)=>{
        const listItem = document.createElement('li');
        listItem.textContent = `Ronda ${index + 1}: ${result} `;
        historyList.appendChild(listItem);
    });
}


//función para resetear el temporizador marcado para borrar el historial
function resetClearHistoryTimeout(){
    if(clearHistoryTimeout){
        clearTimeout(clearHistoryTimeout);
    }

    //configurar temporizador de 10min
    clearHistoryTimeout = setTimeout(resetHistoryGame, 60000);
}


//funcion para reiniciar historial
function resetHistoryGame(){
    gameHistory =[];
    localStorage.removeItem('gameHistory2P');
    scoreX = 0;
    scoreO = 0;
    updateScoreBoard();
    showHistoryGame();
}


//funcion para actualizar las puntuaciones
function updateScoreBoard(){
    document.getElementById('score-x').textContent = scoreX;
    document.getElementById('score-o').textContent = scoreO;
}


//Combinar las posibles lineas ganadoras
const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],       //Filas
    [0,3,6], [1,4,7], [2,5,8],     //Columnas
    [0,4,8], [2,4,6]          //Diagnales
];


//Añadir evento clic a cada celda
cells.forEach((cell, index)=>{
    cell.addEventListener('click', () => cellClick(index));
});


//funcion actualizar indicador de turno
function updateShiftTurn(){
    const symbolTurn = document.getElementById('symbol-turn');
    symbolTurn.textContent = currentPlayer;

    //Efecto para resaltar el cambio de turno
    symbolTurn.style.transform ='scale(1.2)';
    setTimeout(()=>{
        symbolTurn.style.transform = 'scale(1)';
    }, 200);
}

showHistoryGame();


//Manipular el clic de una celda
function cellClick(index){
    //Evita sobrescribir o segir si ya hay ganador
    if(boardStatus[index] || !gameActive) return;

    boardStatus[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    //Almacenar movimento
    currentMoves.push(currentPlayer + index);

    //Verificar si hay ganador
    if(checkWin()){
        statusText.textContent = `¡ ${currentPlayer} ha ganado ! El juego se reiniciara...`;
        updateHistoryGame(currentPlayer);
        gameActive = false;
        disableCells();
        setTimeout(resetGame, 3000);
        return;
    }

    //Verifica si hay empate
    // if(boardStatus.every(cell=>cell)){
    //     statusText.textContent = `¡Es un empate! El juego se reiniciara...`;
    //     updateHistoryGame(null);
    //     setTimeout(resetGame, 3000);
    //     return;
    // }

    //si hay empate
    if(isTie()){
        statusText.textContent = `¡Empate! El juego se reiniciará...`;
        updateHistoryGame(null);
        gameActive = false;
        disableCells();
        setTimeout(resetGame, 3000);
        return;
    }

    //Cambia el jugador
    currentPlayer = currentPlayer === 'X'?'O':'X';

    statusText.textContent = `${currentPlayer} es tu turno`;

    updateShiftTurn();
}

//funcion empate
function isTie(){
    return boardStatus.every(cell=>cell);   // Retorna true si todas las celdas están ocupadas
}


//Comprueba si hay una combinacion ganadora
function checkWin(){
    const winningLine = winningCombos.find(combo=>{
        const [a,b,c]  = combo;
        return boardStatus[a] && boardStatus[a] === boardStatus[b] && boardStatus[a] === boardStatus[c];
    });

    if(winningLine){
        //Resaltar celdas ganadoras
        winningLine.forEach(index=>{
            cells[index].classList.add('winner-cell');
        });

        //Incrementar la puntuacion
        if(currentPlayer === 'X'){
            scoreX++;
        }else{
            scoreO++;
        }
        updateScoreBoard();
        return true;
    }
    return false;

    
}


//funcion deshabilitar clics en las celdas
function disableCells(){
    cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
    })
}

//Restablece el juego
function resetGame(){
    // //limpiar historial cuando se reinicia el juego
    // gameHistory = [];
    // localStorage.removeItem('gameHistory');
    // showHistoryGame();
    
    //Reinicia el estado del tablero
    boardStatus = Array(9).fill('');
    gameActive = true;
    currentMoves = [];

    // cells.forEach(cell => (cell.textContent = ''));
    
    //Reinicia color resaltado del ganador
    cells.forEach(cell=>{
        cell.textContent= '';
        cell.classList.remove('winner-cell');
    });

    //Restablecer el jugador actual
    currentPlayer = 'X';
    statusText.textContent = 'Comienza el jugador X';

    updateShiftTurn();
    updateScoreBoard();

    //evento click para cada celda al inicio
    cells.forEach((cell, index)=>{
         cell.style.pointerEvents = 'auto';
     });
    
}




//Agregar boton de reinicio en el HTML
//document.body.insertAdjacentHTML('beforeend', '<button onclick="resetGame()">Volver a jugar</button>');