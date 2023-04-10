import React, { useState, useEffect } from "react";
import '../app.css';

const AirQuality = ({ data }) => {
  const [aqi, setAqi] = useState("");

  useEffect(() => {
    const fetchAqi = async () => {
      const response = await fetch(
        `{AIR_VISUAL_API_URL}/city?city=${data}&key={AIR_VISUAL_API_KEY}`
      );
      const airData = await response.json();
      setAqi(airData.airData.current.pollution.aqius);
    };
    fetchAqi();
  }, [data]);

  return (
    <div>
      {aqi !== null ? (
        <p>
          Air Quality: {aqi} {getAqiCategory(aqi)}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const getAqiCategory = (aqi) => {
  if (aqi >= 0 && aqi <= 50) {
    return "Good";
  } else if (aqi >= 51 && aqi <= 100) {
    return "Moderate";
  } else if (aqi >= 101 && aqi <= 150) {
    return "Unhealthy for Sensitive Groups";
  } else if (aqi >= 151 && aqi <= 200) {
    return "Unhealthy";
  } else if (aqi >= 201 && aqi <= 300) {
    return "Very Unhealthy";
  } else if (aqi >= 301) {
    return "Hazardous";
  } else {
    return "Unknown";
  }
};

export default AirQuality;
