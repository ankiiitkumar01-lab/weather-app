import SearchBox from "./search";
import Infobox from "./InfoBox";
import "./weatherApp.css"

import { useState } from "react";

export default function WeatherApp() {
  const [WeatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    temp: 24,
    tempMin: 12,
    tempMax: 13,
    humidity: 25,
    feelsLike: 20,
    weather: "Haze",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };
  return (
    <div className="card">
      <h1 style={{ textAlign: "center" }}>Weather APP</h1>
      <SearchBox updateInfo={updateInfo} />
      <Infobox Info={WeatherInfo} />
    </div>
  );
}
