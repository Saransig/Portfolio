// primero crear array para almacenar las peliculas o series
let movie=[];

// funcion para añadir pelicula o seria
function addMovie(){
    const movieInput = document.getElementById('movieInput');
    const movieName = movieInput.value.trim();

    if (movieName){
        movies.push(movieName);
        movieInput.value= "";
        displayMovies();
    }else{
        alert("No se ha ingresado el nombre de una película o serie");
    }
}


// funcion para mostrar las peliculas o series en la lista
function displayMovies(){
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = "";

    movies.forEach((movie, index) =>{
        const listItem = document.createElement("li");
        listItem.textContent = movie;
        movieList.appendChild(listItem);
    });
}


//funcion para seleccionar la pelicula o serie aleatoriamente
