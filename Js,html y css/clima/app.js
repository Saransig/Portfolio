//apiKey de OpenWeather
const apiKey = '9d8ab5b52c38468ca25c983f72156ae0';
const weatherInfo = document.getElementById("weather-info");
const loadingMessage = document.getElementById("loading");
const errorMessage = document.getElementById("error");
const locationDisplay = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");


//funcion para obtener el clima
function getWeather(latitude, longitude){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //verifica si la respuesta es existosa
            if(data.cod === 200){
                //ocultar el mensaje de carga y mostrar los datos del clima
                loadingMessage.style.display =`none`;
                locationDisplay.textContent = `Ubicación: ${data.name}, ${data.sys.country}`;
                temperature.textContent = `Temperatura: ${data.main.temp} ºC`;
                description.textContent = `Condición: ${data.weather[0].description}`;
            }else{
                //si hay error en la respuesta, se muestra un mensaje
                showError(`Error al obtener el clima: ${data.message}`);
            }
        })
        .catch(error => {
            //mostrar mensaje de error si la solicitud falla
            showError(`No se ha podido conectar con el servidor de clima.`);
            console.error(error);
        });
}


//funcion para mostrar el mensaje de error
function showError(message){
    loadingMessage.style.display = `none`;
    errorMessage.style.display = `block`;
    errorMessage.textContent = message;
}


//funciona para obtener la ubicacion del usuario
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                getWeather(latitude, longitude);
            },
            () => showError(`No se pudo obtener la ubicación.`)
        );
    }else{
        showError('Geolocalización no es soportada en este navegador.');
    }
}

getLocation();
