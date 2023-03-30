import { useState } from "react";
import './app.css';
import Search from "./components/search";
import CurrentWeather from "./components/current-weather";
import Forecast from "./components/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";


function App() {
  // hook for the current weather
  const [currentWeather, setCurrentWeather] = useState(null);

  // hook for the forecast
  const [forecast, setForecast] = useState(null);

  // search
  const handleOnSearchChange = (searchData) => {
    // split the two values into latitude and longitude
    const [lat, lon] = searchData.value.split(" ");
    // get base url/weather/lat and lon and app
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    // same as the other url, except it looks at url/forecast not weather
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    // getting all the response for the weather and forecast in an array
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        // mapping the response to corresponding variables
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        // Extending the GEO city result from the search to the weather and forecast
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      // error handling
      .catch(console.log);
  };


  return (
    <div className="app">
      {/* search for a city */}
      <div className="search-bar">
        <Search onSearchChange={handleOnSearchChange} />
      </div>

      {/* current weather for searched city */}
      <div className="current-weather-section">
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>

      {/* forecast for the searched city */}
      <div className="forecast-section">
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
