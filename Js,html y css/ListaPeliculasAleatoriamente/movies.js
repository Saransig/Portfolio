// primero crear array para almacenar las peliculas o series
let movies=JSON.parse(localStorage.getItem("movies")) || [];


// lista de peliculas vistas
let watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];



// funcion para añadir pelicula 
function addMovie(){
    const movieInput = document.getElementById('movieInput');
    const movieName = movieInput.value.trim();

    if (movieName){
        movies.push(movieName);
        movieInput.value= "";
        updateLocalStorage();
        displayMovies();
    }else{
        alert("No se ha ingresado el nombre de la película. ");
    }
}



// funcion para mostrar las peliculas  en la lista
function displayMovies(){
    const movieList = document.getElementById('movieList');
    movieList.innerHTML= "";
    
    movies.forEach((movie, index) =>{
        const listItem = document.createElement("li");
        listItem.textContent = movie;
        // movieList.appendChild(listItem);


        const removeMovie = document.createElement("button");
        removeMovie.textContent = "Eliminar";
        removeMovie.classList.add("removeMovie-btn");
        removeMovie.addEventListener("click",()=>{
            movies.splice(index,1);
            updateLocalStorage();
            displayMovies();
        });

        listItem.appendChild(removeMovie);
        movieList.appendChild(listItem);

    });

    
}




// funcion para mostrar peliculas o series ya vistas
function displayWatchedMovies(){
    const watchedList = document.getElementById("watchedList");
    watchedList.innerHTML = "";

    watchedMovies.forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.textContent = movie;
        watchedList.appendChild(listItem);
    });
}




//funcion para seleccionar la pelicula aleatoriamente
function randomMovie(){
    if(movies.length === 0){
        alert("No hay peliculas o series en la lista.");
        return;
    }

    const randomIndex = Math.floor(Math.random()* movies.length);
    const selectedMovie = movies[randomIndex];

    // Mostrar la pelicula seleccionada
    document.getElementById('selectedMovie').textContent = selectedMovie;

    // Eliminar de la lista la pelicula seleccionada
    movies.splice(randomIndex,1);
    watchedMovies.push(selectedMovie);
    updateLocalStorage();
    displayMovies();
    displayWatchedMovies();
}


//eliminar todos los datos almacenados en localStorage
function clearAllData(){
    localStorage.clear();
    alert("Todos los datos seran eliminados.")
    location.reload();
}


// funcion para actualizar el local storage con el array de peliculas "movies"
function updateLocalStorage(){
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));    
}

displayMovies();
displayWatchedMovies();