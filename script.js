const apiKey = "7a342fa1af52d2f6a40ed1b73b0b8fa2";
const inputCity = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCont = document.getElementById("weather");

searchBtn.addEventListener("click", getWeatherData);

checkLastSerch();

async function getWeatherData() {
  const city = inputCity.value.trim();

  if (!city) {
    weatherCont.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );

    const data = await response.json();

    displayWeather(data);

    localStorage.setItem("city", data.name);

    if (!response.ok) throw new Error("City not found");
  } catch (error) {
    weatherCont.innerHTML = "<p>Smh goes wrong pls try later!</p>";
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;

  setBackground(weather[0].main);

  weatherCont.innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description}</p>
    <p>🌡️ ${main.temp} °C</p>
    <p>Feels like: ${main.feels_like} °C</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
}

function checkLastSerch() {
  const lastSerchedCity = localStorage.getItem("city");

  if (lastSerchedCity !== null) {
    inputCity.value = lastSerchedCity;
    getWeatherData();
  }
}

function setBackground(weatherType) {
  document.body.className = "";

  switch (weatherType) {
    case "Clear":
      document.body.classList.add("sunny");
      break;
    case "Clouds":
      document.body.classList.add("cloudy");
      break;
    case "Rain":
    case "Drizzle":
    case "Thunderstorm":
      document.body.classList.add("rainy");
      break;
    case "Snow":
      document.body.classList.add("snowy");
      break;
    case "Mist":
    case "Fog":
    case "Haze":
      document.body.classList.add("misty");
      break;
    default:
      document.body.classList.add("cloudy");
  }
}
