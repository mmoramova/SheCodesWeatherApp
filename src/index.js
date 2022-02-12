/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city").trim().toLowerCase();
let valid = 0;

for (let i in weather) {
  if (i === city) {
    alert(
      `It is currently ${Math.floor(weather[city].temp)}°C (${
        Math.floor(Math.floor(weather[city].temp) * 1.8) + 32
      }°F) in ${city} with a humidity of ${weather[city].humidity}%`
    );
    valid = 1;
  }
}

if (valid === 0) {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
*/

/*-------DATE------*/
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

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

let actDate = document.querySelector("#actual-date");
actDate.innerHTML = `${days[date.getDay()]} ${hours}:${minutes}`;

/*-----------------------------------*/
function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperaturenow");
  let description = document.querySelector("#temperaturedescription");
  let cityNameElement = document.querySelector("#city");
  temperatureElement.innerHTML = response.data.main.temp;
  cityNameElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
}

function fetchactualdata() {
  event.preventDefault();
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let NameOfCity = document.querySelector("#search-input");
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    NameOfCity.value +
    "&appid=" +
    apiKey +
    "&units=metric";

  axios.get(apiUrl).then(showTemperature);

  let changeH1 = document.querySelector("#city");
  changeH1.innerHTML = NameOfCity.value;
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", fetchactualdata);

/*-----------------*/
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperaturenow");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperaturenow");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
/*-----------------*/

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
