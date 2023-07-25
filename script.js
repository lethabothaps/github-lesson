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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguts",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();
let day = days[now.getDay()];
let hours = now.getHours();
let year = now.getFullYear();
if (hours < 10) hours = `0${hours}`;

let minutes = now.getMinutes();
if (minutes < 10) minutes = `0${minutes}`;

let dateTime = document.getElementById("todaysDate");
dateTime.innerHTML =
  day + "   " + month + " " + date + ", " + year + " " + hours + ":" + minutes;

function displayWeatherCondition(response) {
  //console.log(response.data);
  //console.log(response.data.name);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );

  // let city = document.querySelector("#cityInput").value;
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "a205604123833f7c8576397d580a2bf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  //debugger;
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  //let city = document.querySelector("#city-input").value;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function searchLocation(position) {
  let apiKey = "a205604123833f7c8576397d580a2bf4";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweather.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  console.log(searchLocation);
}

/*
function convertToFah(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", convertToFah);

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", convertToCel);
*/

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener(`submit`, handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener(`click`, getCurrentLocation);

// searchCity("Johannesburg");

//axios.get(`${url}&appid=${apiKey}`).then(showWeather);

/*navigator.geolocation.getCurrentPosition(retrievePosition); */
