// ASSIGNMENT CODE

// variable for the API key
var weatherKey = '66b15a5b3951d15de56c5d2c4e2ddcba';
// variables for the lattitude and longitude
let lat = '';
let lon = '';
var weatherData;


// DEPENDENCIES

// variable for the button elements' container element
var searchCardEl = document.getElementById('search-card');
// variable for the current weather container
var todayContainerEl = document.querySelector('.today-container');
// variables for the 5-day forecast cards
var forecastCardContainerEl = document.getElementById('card-container');
var day1El = document.getElementById('day-1');
var day2El = document.getElementById('day-2');
var day3El = document.getElementById('day-3');
var day4El = document.getElementById('day-4');
var day5El = document.getElementById('day-5');

// FUNCTIONS

// init function that displays default city weather forecast
function init() {
  getWeather('New York');
}
// Retrieve search history from local storage on load

// Store searched city in local storage

// checkSelection function that handles user input

// Get the latitude and longitude for the weather API call
function getWeather(city) {
  // Current Weather API call
  var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey + '&units=imperial';
  fetch(weatherURL).then(weatherResponse => {
    return weatherResponse.json();
  }).then(weatherData => {
    renderWeather(weatherData);
  });

  // 5-day Forecast API call
  var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherKey + '&units=imperial';
  fetch(forecastURL).then(forecastResponse => {
    return forecastResponse.json();
  }).then(forecastData => {
    console.log(forecastData);
    renderForecast(forecastData);
  });
}

// RENDERING FUNCTIONS

function renderWeather(data) {
  todayContainerEl.children[0].innerHTML = data.name;
  todayContainerEl.children[1].innerHTML = data.main.temp + "&deg; F";
  todayContainerEl.children[2].innerHTML = data.wind.speed + " MPH";
  todayContainerEl.children[3].innerHTML = data.main.humidity + "&#37;";
}

function renderForecast(data) {
  console.log(data.list[0].dt_txt);
  var forecastDays = data.list;
  console.log(forecastDays);
for (var i = 0; i < forecastDays.length; i++) {
  var date = forecastDays[i*8].dt_txt;
  forecastCardContainerEl.children[i].children[0].innerHTML = moment(date).format('MM/DD/YYYY');
  forecastCardContainerEl.children[i].children[1].innerHTML = 'icon';
  forecastCardContainerEl.children[i].children[2].innerHTML = forecastDays[i*8].main.temp + "&deg; F";
  forecastCardContainerEl.children[i].children[3].innerHTML = forecastDays[i*8].wind.speed + " MPH";
  forecastCardContainerEl.children[i].children[4].innerHTML = forecastDays[i*8].main.humidity + "&#37;"
}
}

// INITIALIZATION
init();

// EVENT LISTENERS

// click event listener on the search-card element
// searchCardEl.addEventListener('click', checkSelection);

