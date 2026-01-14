const apiKey = "7a342fa1af52d2f6a40ed1b73b0b8fa2";
const inputCity = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCont = document.getElementById("weather");

searchBtn.addEventListener("click", getWeatherData);

async function getWeatherData() {
  const city = inputCity.value.trim();
  console.log("city", city);

  if (!city) {
    weatherCont.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();
    console.log("data", data);
    displayWeather(data);
    if (!response.ok) throw new Error("City not found");
  } catch (error) {
    weatherCont.innerHTML = "<p>Smh goes wrong pls try later!</p>";
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  weatherCont.innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description}</p>
    <p>🌡️ ${main.temp} °C</p>
    <p>Feels like: ${main.feels_like} °C</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
}
