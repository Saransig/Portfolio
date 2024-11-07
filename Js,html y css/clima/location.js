const apiKey = "9d8ab5b52c38468ca25c983f72156ae0";

document.getElementById("searchButton").addEventListener("click", function (){
    const city = document.getElementById("cityInput").value;
    if(city){
        searchWeather(city);
    }
});


//funcion que busca el clima por ciudad
function searchWeather(city){
    //url de la api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
    //se realiza una solicitud GET a la url (API)
    fetch(url)
        .then(response => response.json())          //convierte la respuesta en un objeto JSON si la solicitud sale bien
        .then(data => displayWeather(data))         //se llama a la funcion displayweather para mostrar los datos
        .catch(error => {
            console.error("Error al obtener los datos climaticos de: ", error);
            document.getElementById("weatherResult").innerHTML = `<p class="weather-info">No se pudo obtener el clima. Intentalo de nuevo.</p>`;
        });
}

//funcion mostrar tiempo
function displayWeather(data){
    //si la ciudad no es encontrada en la API contiene un codigo de error 404
    if(data.cod === "404"){
        //mensaje de error que se mostrara si la ciudad no es encontrada
        document.getElementById("weatherResult").innerHTML = `<p class="weather-info">Ciudad no encontrada. Intentalo de nuevo.</p>`;
    }else{
        //usando desectructuración extrae la informacion de data
        const {main, name, weather, wind} = data;
        const temperature = Math.round(main.temp);              //redondea la temperatura para mejor visualización
        const description = weather[0].description;             
        const windSpeed = wind.speed;

        //se actualiza el contenido del html para mostrar la información del clima
        document.getElementById("weatherResult").innerHTML = `
            <div class="weather-info">
                <h2>${name}</h2>
                <p><strong>Temperatura:</strong> ${temperature}°C</p>
                <p><strong>Condiciones:</strong> ${description}</p>
                <p><strong>Viento:</strong> ${windSpeed} m/s</p>
            </div>
        `;
    }
}