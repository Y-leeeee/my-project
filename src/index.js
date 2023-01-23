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
currentTime.innerHTML = `${day} ${hour}:${minut}`;

//Feature #2
function displayNewData(response) {
  console.log(response.data);
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function search(city) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
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
