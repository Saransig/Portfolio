//lista de palabras por categoria
const words = {
    peliculas: ["avatar", "matrix", "venom", "batman", "oppenheimer"],
    animales: ["caballo", "perro", "rinoceronte", "jaguar", "loro"],
    deportes: ["balonmano", "tenis", "rugby", "natacion", "beisbol"],
};

let selectedCategory;
let selectedWord;
let guessedLetters = [];
let wrongLetters = [];
let lives = 6;

document.getElementById('start').addEventListener('click', () => {
    //obtener la categoria seleccionada
    const category = document.getElementById("category-select");
    selectedCategory = category.value;

    //seleccionar una palabra aleatoria de la categoria elegida
    const wordsCategory = words[selectedCategory];
    selectedWord = wordsCategory[Math.floor(Math.random()* wordsCategory.length)];

    //restablecer variables
    guessedLetters = [];
    wrongLetters = [];
    lives = 6;

    displayWord();
    document.getElementById("wrong-letters").textContent = '';
    drawStructure();
});


//mostrar la palabra
function displayWord(){
    const wordDisplay = document.getElementById("secretWord");
    wordDisplay.innerHTML = selectedWord.split('').map(letter => (
        guessedLetters.includes(letter) ? letter : '_'
    )).join(' ');
}


//detectar teclado usando keydown
document.addEventListener('keydown', (event) => {
    const letter = event.key.toLowerCase();

    //validar si la letra coincide y no se ha validado antes
    if(letter.match(/^[a-z]$/) && !guessedLetters.includes(letter) && !wrongLetters.includes(letter)){
        if(selectedWord.includes(letter)){
            guessedLetters.push(letter);
        }else{
            wrongLetters.push(letter);
            lives--;
            drawHangman(6-lives);
        }
        updateGameStatus();
    }
});

//funcion actualizar estado del juego
function updateGameStatus(){
    displayWord();
    document.getElementById("wrong-letters").textContent = wrongLetters.join(', ');

    drawHangman(6-lives);

    if(lives === 0){
        alert("Has perdido! La palabra era " + selectedWord);
    }else if(selectedWord.split('').every(letter => guessedLetters.includes(letter))){
        setTimeout(() => alert("¡Enhorabuena! Has ganado."), 200);
    }
}


//funcion para dibujar la esctructura
function drawStructure(){
    const canvas = document.getElementById("hangman-canvas");
    const contextoDibujo = canvas.getContext("2d");
    contextoDibujo.clearRect(0, 0, canvas.width, canvas.height);
    contextoDibujo.lineWidth = 2;

    //etapa dinujo de la base
    contextoDibujo.beginPath(); 
    contextoDibujo.moveTo(10,190); 
    contextoDibujo.lineTo(190, 190); 
    contextoDibujo.stroke();
    


    //etapa dibujo del poste
    contextoDibujo.beginPath(); 
    contextoDibujo.moveTo(50,190); 
    contextoDibujo.lineTo(50, 20); 
    contextoDibujo.stroke();
    

    //etapa poste superior
    contextoDibujo.beginPath(); 
    contextoDibujo.moveTo(50,20); 
    contextoDibujo.lineTo(150, 20); 
    contextoDibujo.stroke();


    //etapa dibujo cuerda
    contextoDibujo.beginPath(); 
    contextoDibujo.moveTo(150,20); 
    contextoDibujo.lineTo(150, 50); 
    contextoDibujo.stroke();
    
}


//funcion para dibujar el ahorcado
function drawHangman(stage){
    const canvas = document.getElementById("hangman-canvas");
    const contextoDibujo = canvas.getContext("2d");
    

    //ahorcado dibujado de forma basica por etapas
    
    //etapa dibujo de la cabeza
    if(stage === 1){
        contextoDibujo.beginPath();
        contextoDibujo.arc(150, 70, 20, 0, Math.PI * 2); 
        contextoDibujo.stroke();
    }

    //etapa cuerpo
    if(stage === 2){
        contextoDibujo.beginPath(); 
        contextoDibujo.moveTo(150,90); 
        contextoDibujo.lineTo(150, 140); 
        contextoDibujo.stroke();
    }

    //etapa brazo izquierdo
    if(stage === 3){
        contextoDibujo.beginPath(); 
        contextoDibujo.moveTo(150,100); 
        contextoDibujo.lineTo(130, 120); 
        contextoDibujo.stroke();
    }

    //etapa brazo derecho
    if(stage === 4){
        contextoDibujo.beginPath(); 
        contextoDibujo.moveTo(150,100); 
        contextoDibujo.lineTo(170, 120); 
        contextoDibujo.stroke();
    }

    //etapa pierna izquierda
    if(stage === 5){
        contextoDibujo.beginPath(); 
        contextoDibujo.moveTo(150,140); 
        contextoDibujo.lineTo(130, 170); 
        contextoDibujo.stroke();
    }

    //etapa pierna derecha
    if(stage === 6){
        contextoDibujo.beginPath(); 
        contextoDibujo.moveTo(150,140); 
        contextoDibujo.lineTo(170, 170); 
        contextoDibujo.stroke();
    }
}