//Creacion de variable para el juego
const cells = document.querySelectorAll('.cell');           
const statusText = document.getElementById('status');       //estado del juego


//Inicializar estado del tablero y jugador actual
let currentPlayer = 'X';
let boardStatus = Array(9).fill('');


//variables para las puntuaciones
let scoreX= 0;
let scoreO= 0;


//variable para historial almacenado en almacenamiento local
let gameHistory = JSON.parse(localStorage.getItem('gameHistory1P')) || [];


//variable para controlar no hacer clic en las otras celdas una vez ganado
let gameActive = true;


//Temporizador para borrar el historial despues de un tiempo
let clearHistoryTimeout;

//almacenar turnos de movimineto de la partida actual
let currentMoves=[];



//Función para  IA con algoritmo minmax
function minmaxIA(){
    if(!gameActive)return;          //si el juego ha terminado, no se hace nada

    const bestMove = findBestMove(boardStatus);         //encuentra el mejor movimineto posible
    boardStatus[bestMove] = currentPlayer;              //actualiza el tablero con el movimiento de la IA
    cells[bestMove].textContent = currentPlayer;        //muestra el movimiento
    currentMoves.push(currentPlayer + bestMove);        //guarda el movimiento en el historial


    //verificar si ha ganado la IA
    if(checkWin()){
        statusText.textContent = `¡${currentPlayer} ha ganado! El juego se reiniciara...`;
        updateHistoryGame(currentPlayer);               //actualiza el historial con el ganador
        gameActive = false;
        disableCells();                                 //desactiva los clics en las celdas
        setTimeout(resetGame, 3000);                    //reinicia el juego despues de 3s
        return;
    }



    //verificar si hay empate
    if(isTie()){
        statusText.textContent = `¡Empate! El juego se reiniciará...`;
        updateHistoryGame(null);
        gameActive = false;
        disableCells();
        setTimeout(resetGame, 3000);
        return;
    }

    //cambiar turno jugador (en este caso humano)
    currentPlayer = 'X';
    statusText.textContent = `${currentPlayer} es tu turno`;
    updateShiftTurn();

}

//funcion que encuentra el mejor movimiento usando minmax
function findBestMove(board){
    let bestScore = -Infinity;              //inicia el mejor puntaje en -infinito para maximizar el puntaje
    let move;

    board.forEach((cell, index) => {
        if(cell === ''){                                    //solo considera celdas vacias
            board[index] = currentPlayer;                   //realiza un movimiento temporal
            const score = minmax(board, 0, false);          //evalua el puntaje del movimiento
            board[index] = '';                              //deshace el movimiento
            if(score > bestScore){                          //si el puntaje es mejor, actualiza el mejor movimiento
                bestScore = score;
                move = index;
            }
        }
    });

    return move;            //devulve la posicion del mejor movimiento
}


//implementar minmax
function minmax(board, depth, isMaximize){
    const winner = checkWin();                      //verifica si hay ganador en el estado actual del tablero
    
    if(winner === 'O') return 10 - depth;           //si gana la IA, devulve un puntaje positivo
    if(winner === 'X') return depth -10;            //si gana el jugador, devuelve un puntaje negativo
    if(isTie()) return 0;                           //si es empate, devuelve un puntaje neutro

    if(isMaximize){                                 //la IA intenta maximizar su puntaje
        let bestScore = -Infinity;

        board.forEach((cell, index) => {
            if(cell === ''){                        //solo considera las celdas vacias
                board[index] = 'O';                 //movimiento temporal para la IA
                const score = minmax(board, depth + 1, false);          
                board[index] = '';                  //deshace el movimiento
                bestScore = Math.max(score, bestScore);             //actualiza el mejor puntaje si es mas alto
            }
        });

        return bestScore;
    }else{              //el jugador intenta minimizar el puntaje
        let bestScore = Infinity;

        board.forEach((cell, index) => {
            if(cell === ''){
                board[index] = 'X';
                const score = minmax(board, depth + 1, true);
                board[index] = '';
                bestScore = Math.min(score, bestScore);
            }
        });
        
        return bestScore;
    }
}



//funcion para actualizar el historial 
function updateHistoryGame(winner){
    const result = winner ? `Ganador: ${winner}` : 'Empate';
    // const moves = currentMoves.join(',');
    gameHistory.push(result);

    //Actualizar localStorage
    localStorage.setItem('gameHistory1P', JSON.stringify(gameHistory));

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
    localStorage.removeItem('gameHistory1P');
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


//funcion para Manipular el clic de una celda
function cellClick(index){
    //si la celda ya no tiene valor  o no es el turno del jugador, no hace nada
    if(boardStatus[index] || !gameActive || currentPlayer !== 'X') return;

    boardStatus[index] = currentPlayer;         //actualiza el estado del tablero
    cells[index].textContent = currentPlayer;   //muestra el movimiento

    //Almacenar movimento en el historial
    currentMoves.push(currentPlayer + index);

    //Verificar si hay ganador
    if(checkWin()){
        statusText.textContent = `¡ ${currentPlayer} ha ganado ! El juego se reiniciara...`;
        updateHistoryGame(currentPlayer);           //actualiza el historial con el ganador
        gameActive = false;
        disableCells();                             //desactiva los clics de las celdas
        setTimeout(resetGame, 3000);                //reinicia el juego depsues de 3s
        return;
    }


    //si hay empate
    if(isTie()){
        statusText.textContent = `¡Empate! El juego se reiniciará...`;
        updateHistoryGame(null);
        gameActive = false;
        disableCells();
        setTimeout(resetGame, 3000);
        return;
    }


    //Cambiar turno IA 
    currentPlayer = 'O';

    statusText.textContent = `${currentPlayer} es tu turno`;

    updateShiftTurn();

    //Llamar a la IA para que realice movimeinto
    setTimeout(minmaxIA, 400);
}

//funcion empate
function isTie(){
    return boardStatus.every(cell=>cell);   // Retorna true si todas las celdas están ocupadas
}


//Comprueba si hay una combinacion ganadora
function checkWin(){
    for(const combo of winningCombos){      //Revisa cada combinación ganadora
        const [a, b, c] = combo;
        if(boardStatus[a] && boardStatus[a] === boardStatus[b] && boardStatus[a] === boardStatus[c]){
            return boardStatus[a];          //Devuelve el ganador 'X' o 'O'
        }
    }
    return null;        //Devuelve null si no hay ganador
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