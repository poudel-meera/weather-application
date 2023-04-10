import React from "react";
import AirQuality from "./air-quality";
import "../app.css";

const CurrentWeather = ({ data }) => {
  // If there is no data yet, return null
  if (!data) {
    return null;
  }
  // Destruct the properties we need from the data object
  const { city, weather, main, wind, clouds } = data;

  return (
    <section className="weather">
      <div className="main-description">
        <div>
          <h2 className="city">{city}</h2>
          <p className="weather-description">{weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${weather[0].icon}.png`}
        />
      </div>

      <div className="rest-of-the-descriptions">
        <h3 className="temperature">{Math.round(main.temp)}°F</h3>
        <div className="details">
          <div className="row">
            <span className="label">Humidity:</span>
            <span className="value">{main.humidity}%</span>
          </div>
          <div className="row">
            <span className="label">Wind:</span>
            <span className="value">{wind.speed} mph</span>
          </div>
          <div className="row">
            <span className="label">Clouds:</span>
            <span className="value">{clouds.all}%</span>
          </div>
          <div className="row">
            <span className="label">Feels Like:</span>
            <span className="value">{Math.round(main.feels_like)}°F</span>
          </div>

          {/* AirQuality component */}
          <div className="air-quality-info">
            <AirQuality data={city} />
          </div>

        </div>

      </div>

    </section>
  );
};

export default CurrentWeather;
