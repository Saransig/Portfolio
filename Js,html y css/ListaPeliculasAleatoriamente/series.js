// primero crear array para almacenar las peliculas o series
let tvSeries = JSON.parse(localStorage.getItem("tvSeries")) || [];


// lista de peliculas vistas
let watchedTvSeries = JSON.parse(localStorage.getItem("watchedTvSeries")) || [];



//variables paginación
let currentPage=1;
let currentPageWatched = 1;
const itemsPerPage = 4;


//funcion añadir serie
function addTvSerie(){
    const tvSeriesInput = document.getElementById("tvSeriesInput");
    const tvSerieName = tvSeriesInput.value.trim();

    // if(tvSerieName){
    //     tvSeries.push(tvSerieName);
    //     tvSeriesInput.value="";
    //     updateLocalStorage();
    //     displayTvSerie();
    // }else{
    //     alert("No se ha ingresado el nombre de la serie.")
    // }

    if(!tvSerieName){
        alert("No se ha ingresado el nombre de la serie.");
        return;
    }

    //Verifico si la serie ya existe
    const tvSerieExists = tvSeries.find((tvSerie)=>tvSerie.toLowerCase()=== tvSerieName.toLowerCase());

    //Verificar si la serie ya ha sido vista
    const tvSerieExistsWatched = watchedTvSeries.find((tvSerie)=>tvSerie.toLowerCase() === tvSerieName.toLowerCase());


    if(tvSerieExists){
        alert(`${tvSerieExists} ya está en la lista.`);
        tvSeriesInput.value="";
        return;
    }
    // else{
    //     tvSeries.push(tvSerieName);
    //     tvSeriesInput.value="";
    //     updateLocalStorage();
    //     displayTvSerie();
    // }

    if(tvSerieExistsWatched){
        alert(`${tvSerieExistsWatched} ya ha sido vista`);
        tvSeriesInput.value="";
        return;
    }

    //Si no esta en ninguna lista, añadir a pendientes
    tvSeries.push(tvSerieName);
    tvSeriesInput.value="";
    updateLocalStorage();
    displayTvSerie();
}

//funcion para ver lista series
function displayTvSerie(){
    const tvSerieList= document.getElementById("tvSerieList");
    tvSerieList.innerHTML= "";


    const start = (currentPage-1)*itemsPerPage;
    const end = start + itemsPerPage;

    //obtener las series de la página actual
    const tvSeriesToDisplay = tvSeries.slice(start,end);


    tvSeriesToDisplay.forEach((tvSerie, index)=>{
        const listItemTvSerie = document.createElement("li");
        listItemTvSerie.textContent = tvSerie;

        const removeTvSerie = document.createElement("button");
        removeTvSerie.textContent = "🗑️";
        removeTvSerie.classList.add("removeTvSerie-btn");
        removeTvSerie.addEventListener("click",()=>{
            //Confirmacion al eliminar elemento
            const confirmation = confirm(`¿Estás seguro de eliminar ${tvSerie}?`);
            if(confirmation){
                //eliminar elemento serie
                tvSeries.splice(start+index,1);
                updateLocalStorage();
                displayTvSerie();

                if(tvSeries.length % itemsPerPage === 0 && currentPage > 1){
                    currentPage--;
                }

                displayTvSerie();
            }

        });

        listItemTvSerie.appendChild(removeTvSerie);
        tvSerieList.appendChild(listItemTvSerie);
    });

    upgradePagination();
}


//funciona para actualizar controles de paginacion
function upgradePagination(){
    const totalPages = Math.ceil(tvSeries.length/ itemsPerPage);
    document.getElementById("currentPage").textContent = currentPage;

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages || totalPages === 0;

}

function changePage(direction){
    currentPage += direction;
    displayTvSerie();
}


//función para borrar todos los elementos de peliculas pendientes
function clearPendingTvSeries(){
    //antes de borrar pedimos confirmación
    const confimDeletePendingTvSeries = confirm("¿Estás seguro de eliminar tadas las series de esta lista?");

    if(confimDeletePendingTvSeries){
        tvSeries = [];
        updateLocalStorage();
        displayTvSerie();
        alert("Todas las series de esta lista han sido eliminadas")
    }
}


//función series vistas
function displayWatchedTvSeries(){
    const watchedTvSerieList= document.getElementById("watchedTvSerieList");
    watchedTvSerieList.innerHTML = "";

    const start = (currentPageWatched - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const watchedTvSeriesToDisplay = watchedTvSeries.slice(start, end);


    watchedTvSeriesToDisplay.forEach((watchedTvSerie)=>{
        const listItem = document.createElement("li");
        listItem.textContent = watchedTvSerie;
        watchedTvSerieList.appendChild(listItem);
    });

    upgradePaginationWatched();
}


function upgradePaginationWatched(){
    const totalPages=Math.ceil(watchedTvSeries.length / itemsPerPage);
    document.getElementById("currentPageWatched").textContent = currentPageWatched;

    //habilitar o deshabilitar botones de paginación
    document.getElementById("prevPageWatched").disabled = currentPageWatched === 1;
    document.getElementById("nextPageWatched").disabled = currentPageWatched === totalPages|| totalPages === 0;

}


function changePageWatched(direction){
    currentPageWatched += direction;
    displayWatchedTvSeries();
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


//eliminar todos los datos almacenados en localStorage
function clearAllData(){
    localStorage.clear();
    alert("Todos los datos seran eliminados.")
    location.reload();
}

// funcion para actualizar el local storage con el array de series
function updateLocalStorage(){   
    localStorage.setItem("tvSeries", JSON.stringify(tvSeries));
    localStorage.setItem("watchedTvSeries", JSON.stringify(watchedTvSeries));
}

displayTvSerie();
displayWatchedTvSeries();
