let currentTime = document.querySelector(".current-time");
let now = new Date();
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
let hour = now.getHours();
let minut = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}
if (minut < 10) {
  minut = `0${minut}`;
}
currentTime.innerHTML = `Last update at 
${day} ${hour}:${minut}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElemnet = document.querySelector("#forecast");
  let forecastHTML = "";

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
            <div class="col">
              <div class="weatherforecast-date">${formatDay(
                forecastDay.time
              )}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png"
                alt=""
                class="weather-forecast-icon"
                width="42"
              />
              <div class="weatherforecast-temp">
                <span class="max-temp"> ${Math.round(
                  forecastDay.temperature.maximum
                )}°</span
                ><span class="min-temp">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
            </div>
            </div>
  
          `;
    }
  });

  forecastElemnet.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bdb603847ff33c6odd47b612a380tf56";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayNewData(response) {
  console.log(response.data);
  document.querySelector(".city").innerHTML = response.data.city;
  document.querySelector(".temperature-now").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(".description").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector(".icon-element");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  ctemp = response.data.temperature.current;
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "bdb603847ff33c6odd47b612a380tf56";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayNewData);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector(".city-name");
  search(city.value);
}

function changeCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}
function searchCurrent(position) {
  let apiKey = "bdb603847ff33c6odd47b612a380tf56";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayNewData);
}

function displayFtemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature-now");
  let ftemp = (ctemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(ftemp);
}

function displayCtemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature-now");
  temperatureElement.innerHTML = Math.round(ctemp);
}
let ctemp = null;
let searchCity = document.querySelector(".change-city");
searchCity.addEventListener("submit", changeCity);

let currentButton = document.querySelector("#current-city-btn");
currentButton.addEventListener("click", changeCurrent);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFtemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCtemp);

search("jeju");
