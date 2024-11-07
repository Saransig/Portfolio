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
    document.getElementById("wrongLetters").textContent = '';
    drawHangman(0);
});


//mostrar la palabra
function displayWord(){
    const wordDisplay = document.getElementById("secretWord");
    wordDisplay.innerHTML = selectedWord.split('').map(letter => (
        guessedLetters.includes(letter) ? letter : '_'
    )).join(' ');
}


//detectar teclado
document.addEventListener('keyboard-detect', (event) => {
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
    document.getElementById("wrongLetters").textContent = wrongLetters.join(', ');

    if(lives === 0){
        alert("Has perdido! La palabra era " + selectedWord);
    }else if(selectedWord.split('').every(letter => guessedLetters.includes(letter))){
        alert("¡Enhorabuena! Has ganado.");
    }
}

