//Feature #1
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

//Feature #2
function displayNewData(response) {
  document.querySelector(".city").innerHTML = response.data.city;
  document.querySelector(".temperature-now").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector(
    ".humidity"
  ).innerHTML = `${response.data.temperature.humidity}%`;
  document.querySelector(".wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(".description").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector(".icon-element");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function search(city) {
  let apiKey = "bdb603847ff33c6odd47b612a380tf56";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayNewData);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector(".city-name").value;
  search(city);
}

function changeCurrent(event) {
  navigator.geolocation.getCurrentPosition(searchCurrent);
}
function searchCurrent(position) {
  let apiKey = "bdb603847ff33c6odd47b612a380tf56";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coordinates.longitude}&lat=${position.coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayNewData);
}

let searchCity = document.querySelector(".change-city");
searchCity.addEventListener("submit", changeCity);

let currentButton = document.querySelector("#current-city-btn");
currentButton.addEventListener("click", changeCurrent);

search("jeju");

//Bonus feature

/*function changeTempC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".temperature-now");
  currentTemp.innerHTML = -10;
}
let tempC = document.querySelector("#celsius");
tempC.addEventListener("click", changeTempC);

function changeTempF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".temperature-now");
  currentTemp.innerHTML = 4;
}

let tempF = document.querySelector("#fahrenheit");
tempF.addEventListener("click", changeTempF);*/
