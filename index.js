let apiKey = "a8d3eda9e3f10d32351b1929e6eb948b";
// Weather in current location
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentCityWeather);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function displayCurrentCityWeather(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let weatherInCity = document.querySelector("h3#current-city");
  weatherInCity.innerHTML = cityName;
  let weatherDescription = document.querySelector("h6#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("h6#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
}
// Weather in choosen city
function changeCity(event) {
  event.preventDefault();
  let cityEnter = document.querySelector("#enter-city");
  let currentCity = document.querySelector("h3#current-city");
  currentCity.innerHTML = `${cityEnter.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEnter.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let weatherInCity = document.querySelector("#current-temperature");
  weatherInCity.innerHTML = temperature;
  let weatherDescription = document.querySelector("h6#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("h6#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}
// Date
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let today = document.querySelector("h6#current-date");
today.innerHTML = `${day}, ${hour}:${minutes}`;

// Choose any city

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCity);

// Choose current city

let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", showCurrentLocation);
