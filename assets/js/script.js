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

// ASSIGNMENT CODE

// variable for the API key
var weatherKey = '66b15a5b3951d15de56c5d2c4e2ddcba';

// DATA
var citiesArray = [];

// FUNCTIONS

// init function that displays default city weather forecast
function init() {
  getWeather('New York');
  getCities();
}
// Retrieve search history from local storage on load
function getCities() {
  return JSON.parse(localStorage.getItem("cities"));
}

// Store searched city in local storage
function storeCity(city) {
  var storedCities = getCities();
  if (storedCities !== null) citiesArray = storedCities;

  citiesArray.push(city);
  localStorage.setItem('cities', JSON.stringify(citiesArray));
}

// checkSelection function that handles user input
function checkSelection(e) {
  if (e.target.id === 'submit-btn') {
    var userInput = document.getElementById('search-bar').value;
    getWeather(userInput);
    storeCity(userInput);
  } 
}

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
    renderForecast(forecastData);
  });
}

function getIcon(iconKey) {
  iconString = iconKey.toString();
  // check if weather ID passed to icon key
  if (iconString === '800') return '☀️'; // 800 = clear/sunny
  // other weather IDs in the 800s indicate cloudy
  else if (iconString.startsWith('8') && (iconString !== '800')) return '⛅';
  // weather IDs in the 700s indicate atmospheric conditions such as fog
  else if (iconString.startsWith('7')) return '🌫️';
  // weather IDs in the 600s indicate snow
  else if (iconString.startsWith('6')) return '🌨️';
  // weather IDs in the 500s and 300s indicate heavy and light rain respectively
  else if (iconString.startsWith('5') || iconString.startsWith('3')) return '🌧️';
  // all other weather IDs indicate thunderstorms
  else return '⛈️';
}

// RENDERING FUNCTIONS

// Display todays weather in the DOM
function renderWeather(data) {
  console.log(data);
  var icon = getIcon(data.weather[0].id);
  // display city name in h2 element
  todayContainerEl.children[0].innerHTML = data.name + ' ' + icon;
  // display temperature in p element
  todayContainerEl.children[1].innerHTML = data.main.temp + "&deg; F";
  // display wind speed in p element
  todayContainerEl.children[2].innerHTML = data.wind.speed + " MPH";
  // display humidity in p element
  todayContainerEl.children[3].innerHTML = data.main.humidity + "&#37;";
}

// Display 5 day forecast in the DOM
function renderForecast(data) {
  // store 40 hourly forecast objects only
  var forecastObjects = data.list;
  console.log(forecastObjects);

  // 1 iteration for each day in the forecastObjects
  for (var i = 0; i < (forecastObjects.length / 8); i++) {
    // skip 8 hourly entries to get to next day forecast 
    var dayIdx = i * 8;

    // store formatted date
    var date = moment(forecastObjects[dayIdx].dt_txt).format('MM/DD/YYYY');

    var icon = getIcon(forecastObjects[dayIdx].weather[0].id);

    // display date in h4 element
    forecastCardContainerEl.children[i].children[0].innerHTML = date;
    // display icon in p element
    forecastCardContainerEl.children[i].children[1].innerHTML = icon;
    // display temperature in p element
    forecastCardContainerEl.children[i].children[2].innerHTML = forecastObjects[dayIdx].main.temp + "&deg; F";
    // display wind speed in p element
    forecastCardContainerEl.children[i].children[3].innerHTML = forecastObjects[dayIdx].wind.speed + " MPH";
    // display humidity in p element
    forecastCardContainerEl.children[i].children[4].innerHTML = forecastObjects[dayIdx].main.humidity + "&#37;"
  }
}

// Display previously searched cities


// INITIALIZATION
init();

// EVENT LISTENERS

// click event listener on the search-card element
searchCardEl.addEventListener('click', checkSelection);

