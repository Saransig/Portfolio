// primero crear array para almacenar las peliculas o series
let movies=JSON.parse(localStorage.getItem("movies")) || [];


// lista de peliculas vistas
let watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];


// variables de paginación
let currentPage = 1;
let currentPageWatched = 1;
const itemsPerPage = 4;



// funcion para añadir pelicula 
function addMovie(){
    const movieInput = document.getElementById('movieInput');
    const movieName = movieInput.value.trim();

    // if (movieName){
    //     movies.push(movieName);
    //     movieInput.value= "";
    //     updateLocalStorage();
    //     displayMovies();
    // }else{
    //     alert("No se ha ingresado el nombre de la película. ");
    // }

    if(!movieName){
        alert("No se ha ingresado el nombre de la película.");
        return;
    }

    //Verifico si la película ya existe en la lista se ignora mayúsculas y monúsculas
    const movieExists = movies.find((movie)=>movie.toLowerCase() === movieName.toLowerCase());

    //Verificar si la pelicula ya ha sido vista
    const movieExistWatched = watchedMovies.find((movie)=>movie.toLowerCase() == movieName.toLowerCase());

    if(movieExists){
        alert(`${movieExists} ya está en la lista.`);
        movieInput.value= "";
        return;
    }
    // else{
    //     movies.push(movieName);
    //     movieInput.value= "";
    //     updateLocalStorage();
    //     displayMovies();
    // }

    if(movieExistWatched){
        alert(`${movieExistWatched} ya ha sido vista.`);
        movieInput.value= "";
        return;
    }


    //Si no esta en ninguna lista, añadir a la lista de pendientes
    movies.push(movieName);
    movieInput.value= "";
    updateLocalStorage();
    displayMovies();
}



// funcion para mostrar las peliculas  en la lista
function displayMovies(){
    const movieList = document.getElementById('movieList');
    movieList.innerHTML= "";


     //Calcular el índice de inicio y fin para la página actual
     const start= (currentPage-1)*itemsPerPage;
     const end = start + itemsPerPage;

     //Obtener las peliculas de la página actual
     const moviesToDisplay = movies.slice(start,end);
    
     moviesToDisplay.forEach((movie, index) =>{
        const listItem = document.createElement("li");
        listItem.textContent = movie;
        // movieList.appendChild(listItem);

        const removeMovie = document.createElement("button");
        removeMovie.textContent = "🗑️";
        removeMovie.classList.add("removeMovie-btn");
        removeMovie.addEventListener("click",()=>{
            //Confirmación de eliminar
            const confirmation = confirm(`¿Estás seguro de eliminar ${movie}?`);
            if(confirmation){
                //eliminar película
                movies.splice(start+index,1);
                updateLocalStorage();
                displayMovies();

                //Verificar si la página actual está vacía y retroceder si es necesario
                if(movies.length % itemsPerPage === 0 && currentPage > 1){
                    currentPage--;
                }
                displayMovies();
            }
        });

        listItem.appendChild(removeMovie);
        movieList.appendChild(listItem);

    });

    upgradePagination();
    
}



// función para actualizar los controles de paginación de lista de peliculas
function upgradePagination(){
    const totalPages = Math.ceil(movies.length / itemsPerPage);
    document.getElementById("currentPage").textContent = currentPage;

    //habilitar o deshabilitar botones de paginación
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages|| totalPages === 0;
}


// función para cambiar de pagina lista de peliculas
function changePage(direction){
    currentPage += direction;
    displayMovies();
}

//función para borrar todos los elementos de peliculas pendientes
function clearPendingMovies(){
    //antes de borrar pedimos confirmación
    const confimDeletePendingMovies = confirm("¿Estás seguro de eliminar tadas las películas de esta lista?");

    if(confimDeletePendingMovies){
        movies = [];
        updateLocalStorage();
        displayMovies();
        alert("Todas las películas de esta lista han sido eliminadas")
    }
}

// funcion para mostrar peliculas o series ya vistas
function displayWatchedMovies(){
    const watchedList = document.getElementById("watchedList");
    watchedList.innerHTML = "";


    //Calcular el índice de inicio y fin para la página
    const start = (currentPageWatched -1)*itemsPerPage;
    const end = start+ itemsPerPage;

    //obtener las peliculas de la pagina actual
    const watchedMoviesToDisplay = watchedMovies.slice(start,end);


    watchedMoviesToDisplay.forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.textContent = movie;
        watchedList.appendChild(listItem);
    });

    upgradePaginationWatched();
}


function upgradePaginationWatched(){
    const totalPages=Math.ceil(watchedMovies.length / itemsPerPage);
    document.getElementById("currentPageWatched").textContent = currentPageWatched;

    //habilitar o deshabilitar botones de paginación
    document.getElementById("prevPageWatched").disabled = currentPageWatched === 1;
    document.getElementById("nextPageWatched").disabled = currentPageWatched === totalPages|| totalPages === 0;

}


function changePageWatched(direction){
    currentPageWatched += direction;
    displayWatchedMovies();
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