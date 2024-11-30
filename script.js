const apiKey = "2b808067e3f863ed789c46dca2fa9762"; // Substitua por sua chave de API
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");

const locationEl = document.getElementById("location");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const descriptionEl = document.getElementById("description");
const weatherIconEl = document.getElementById("weather-icon");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];

    locationEl.textContent = `Location: ${name}`;
    temperatureEl.textContent = `Temperature: ${temp}°C`;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    descriptionEl.textContent = `Description: ${description}`;
    weatherIconEl.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}
