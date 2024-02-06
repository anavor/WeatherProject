let apiKey = "a8d3eda9e3f10d32351b1929e6eb948b";
// Define current location and call weather for it
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
// Input city name from the form
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  search(cityInput.value);
}

// Call weather for the city from the form
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

// Display Current Weather
function displayWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let weatherInCity = document.querySelector("#city-name");
  let weatherDescription = document.querySelector("h6#weather-description");
  let humidity = document.querySelector("h6#humidity");
  let currentWind = document.querySelector("#windSpeed");
  let currentDate = document.querySelector("#current-date");
  let currentIcon = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);

  function getForecast(coordinates) {
    console.log(coordinates);
    let apiId = "f3887e262c88d1158f7e2ef4998e234c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely&appid=${apiId}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    console.log(apiUrl);
  }
  let cityName = response.data.name;
  weatherInCity.innerHTML = cityName;
  currentTemperature.innerHTML = temperature;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Вологість: ${response.data.main.humidity}%`;
  currentWind.innerHTML = `Швидкість вітру: ${Math.round(
    response.data.wind.speed
  )} м/с`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  currentIcon.setAttribute("alt", response.data.weather[0].description);
  // Rewrite Celsius Temperature
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

// Date
function formatDate() {
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
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота",
  ];
  let day = days[now.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function formatForecastDates(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = (date = date.getDay());
  let days = ["Нед", "Пон", "Вівт", "Сер", "Чет", "П'ят", "Суб"];
  return days[day];
}

function displayForecast(response) {
  let week = response.data.daily;
  console.log(week);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  week.forEach(function (day, index) {
    if (index >= 1 && index <= 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="card h-100">
              <img src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png" class="card-img-top" alt="Rain" />
              <div class="card-body">
                <h5 class="card-title">${formatForecastDates(day.dt)}</h5>
                <p class="card-text"><span class = "max">  ${Math.round(
                  day.temp.max
                )}°C </span></p>
                 <p class="card-text"><span class="min">${Math.round(
                   day.temp.min
                 )}°C</p>
                   <p class="card-text"><span class="forecastDescription"> Вологість: 
                     ${day.humidity} %
                   </p>
                  
              </div>
            </div>
            </div>
            `;
    }
  });

  // <p class="card-text"><span class="forecastDescription">
  //                  ${day.weather[0].description}
  //                </p>

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Transform temperature units
function celsiusToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function fahrenheitToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
// Set celsiusTemperature
let celsiusTemperature = null;
// Default search
search("Київ");

// OnClick units transform
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", celsiusToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", fahrenheitToCelsius);

//Enter city to the form and call handleSubmit
let form = document.querySelector("#city-input-form");
form.addEventListener("click", handleSubmit);

//Choose current location and call showCurrentLocation
let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", showCurrentLocation);
