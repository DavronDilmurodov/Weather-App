const API_KEY = "1e67da612fa7609b57a5fa015e2632ad";
const BASE_URL = "https://api.openweathermap.org";

let elForm = selectElement(".form");
let elInput = selectElement(".form__input");
let elLocation = selectElement(".info__location");
let elDate = selectElement(".info__date");
let elDegree = selectElement(".info__degree");
let elWeatherName = selectElement(".info__weather-name");
let elWind = selectElement(".info__weather-between");
let elList = selectElement(".cities_list");

let days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

let months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

let getDate = () => {
  let date = new Date();

  let month = date.getMonth();
  let day = date.getDay();
  let year = date.getFullYear();
  let dates = date.getDate();

  return `${days[day]}, ${months[month]} , ${dates}, ${year}`;
};

let render = (weather) => {
  let degree = Math.round(weather.main.temp - 273.15);

  elDate.textContent = getDate();
  elLocation.textContent = weather.name;
  elDegree.textContent = `${degree} °C`;
  elWeatherName.textContent = weather.weather[0].main;
  elWind.textContent = `Wind: ${weather.wind.speed} km/h`;
};

let getWeather = async (lat, lon) => {
  let path = `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  let weather = await request(path);

  render(weather);
};

let onSearch = debounce(async (event) => {
  if (event.target.value) {
    let path = `/geo/1.0/direct?q=${event.target.value}&limit=5&appid=${API_KEY}`;
    let cities = await request(path);

    elList.innerHTML = null;

    cities.forEach((city) => {
      let elLi = createElement("li");
      elLi.textContent = city.name;
      elLi.dataset.lat = city.lat;
      elLi.dataset.lon = city.lon;

      elList.append(elLi);
    });
  } else {
    elList.innerHTML = null;
  }
}, 500);

let onSelectCity = (event) => {
  let lat = event.target.dataset.lat;
  let lon = event.target.dataset.lon;
  getWeather(lat, lon);
  elList.innerHTML = null;
};

elList.addEventListener("click", onSelectCity);
elInput.addEventListener("input", onSearch);

getWeather("41.311081", "69.240562");
