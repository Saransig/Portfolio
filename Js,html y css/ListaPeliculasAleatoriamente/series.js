// primero crear array para almacenar las peliculas o series
let tvSeries = JSON.parse(localStorage.getItem("tvSeries")) || [];


// lista de peliculas vistas
let watchedTvSeries = JSON.parse(localStorage.getItem("watchedTvSeries")) || [];


//TVSeries

//funcion añadir serie
function addTvSerie(){
    const tvSeriesInput = document.getElementById("tvSeriesInput");
    const tvSerieName = tvSeriesInput.value.trim();

    if(tvSerieName){
        tvSeries.push(tvSerieName);
        tvSeriesInput.value="";
        updateLocalStorage();
        displayTvSerie();
    }else{
        alert("No se ha ingresado el nombre de la serie.")
    }
}

//funcion para ver lista series
function displayTvSerie(){
    const tvSerieList= document.getElementById("tvSerieList");
    tvSerieList.innerHTML= "";

    tvSeries.forEach((tvSerie, index)=>{
        const listItemTvSerie = document.createElement("li");
        listItemTvSerie.textContent = tvSerie;

        const removeTvSerie = document.createElement("button");
        removeTvSerie.textContent = "Eliminar";
        removeTvSerie.classList.add("removeTvSerie-btn");
        removeTvSerie.addEventListener("click",()=>{
            tvSeries.splice(index,1);
            updateLocalStorage();
            displayTvSerie();
        });

        listItemTvSerie.appendChild(removeTvSerie);
        tvSerieList.appendChild(listItemTvSerie);
    });
}


//función series vistas
function displayWatchedTvSeries(){
    const watchedTvSerieList= document.getElementById("watchedTvSerieList");
    watchedTvSerieList.innerHTML = "";

    watchedTvSeries.forEach((watchedTvSerie)=>{
        const listItem = document.createElement("li");
        listItem.textContent = watchedTvSerie;
        watchedTvSerieList.appendChild(listItem);
    });
}



//función elegir serie de forma aleatoria
function randomTvSerie(){
    if(tvSeries.length === 0){
        alert("No hay series en la lista.");
        return;
    }else{
        const randomIndex = Math.floor(Math.random()*tvSeries.length);
        selectedTvSerie = tvSeries[randomIndex];


        //Mostrar serie seleccionada
        document.getElementById("selectedTvSerie").textContent = selectedTvSerie;


        //Eliminar de la lista de series
        tvSeries.splice(randomIndex,1);
        watchedTvSeries.push(selectedTvSerie);
        updateLocalStorage();
        displayTvSerie();
        displayWatchedTvSeries();
        
    }

}




// funcion para actualizar el local storage con el array de peliculas "movies"
function updateLocalStorage(){   
    localStorage.setItem("tvSeries", JSON.stringify(tvSeries));
    localStorage.setItem("watchedTvSeries", JSON.stringify(watchedTvSeries));
}

displayTvSerie();
displayWatchedTvSeries();
