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
currentTime.innerHTML = `Last update : 
${day} ${hour}:${minut}`;

function displayForcast(response) {
  console.log(response.data);
  let forcastElemnet = document.querySelector("#forcast");
  let forcastHTML = "";
  let days = ["Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `<div class="row">
            <div class="col">
              <div class="weatherforcast-date">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/50d@2x.png"
                alt=""
                class="weather-forcast-icon"
                width="42"
              />
              <div class="weatherforcast-temp">
                <span class="max-temp"> -8</span
                ><span class="min-temp"> 0</span>
              </div>
            </div>
            </div>
  
          `;
  });

  forcastElemnet.innerHTML = forcastHTML;
}

function getForcast(coordinates) {
  let apiKey = "bdb603847ff33c6odd47b612a380tf56";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
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
  getForcast(response.data.coordinates);
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
