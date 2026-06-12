const apiKey = "bdafb61e7e6906adbeb072812e8367b0";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const tempEl = document.getElementById("temperature");
const cityEl = document.getElementById("city");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("icon");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        fetchWeatherByCity(city);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByLocation(lat, lon);
        }, () => {
            alert("Unable to access location");
        });
    }
});

function fetchWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => updateUI(data))
        .catch(() => alert("Error fetching weather data"));
}

function fetchWeatherByLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => updateUI(data))
        .catch(() => alert("Error fetching weather data"));
}

function updateUI(data) {
    if (data.cod === "404") {
    alert("City not found. Please enter a valid city name.");
    return;
}

    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    cityEl.textContent = data.name;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
