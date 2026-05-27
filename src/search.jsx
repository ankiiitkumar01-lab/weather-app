import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./search.css"
import { useState } from 'react';


export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, seterror] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "b345e7539fb4a9cfe61929f52c0c424b";

  let getWeatherInfo = async () => {
    try {
      let res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonres = await res.json();
       console.log(jsonres);

      if (jsonres.cod !== 200) {
        throw new Error("City not found");
      }

      return {
        city: city,
        temp: jsonres.main.temp,
        tempMin: jsonres.main.temp_min,
        tempMax: jsonres.main.temp_max,
        humidity: jsonres.main.humidity,
        feelsLike: jsonres.main.feels_like,
        weather: jsonres.weather[0].description,
        icon:jsonres.weather[0].icon
      };
    } catch (err) {
      throw err;
    }
  };
  let getWeatherByLocation = async (lat, lon) => {
  let res = await fetch(
    `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  let jsonres = await res.json();

  return {
    city: jsonres.name,
    temp: jsonres.main.temp,
    tempMin: jsonres.main.temp_min,
    tempMax: jsonres.main.temp_max,
    humidity: jsonres.main.humidity,
    feelsLike: jsonres.main.feels_like,
    weather: jsonres.weather[0].description,
    icon: jsonres.weather[0].icon
  };
};
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        let newInfo = await getWeatherByLocation(lat, lon);
        updateInfo(newInfo);
      } catch (err) {
        console.log(err);
      }
    },

    (error) => {
      console.log(error);
    }
  );
};

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      seterror(false);
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
    } catch (err) {
      seterror(true);
    }
  };

  return (
    <div className='SearchBox'>
    <form onSubmit={handleSubmit} className="SearchBar">
  <TextField
    required
    label="Search City"
    value={city}
    onChange={handleChange}
  />

  <Button
    variant="contained"
    type="submit"
    className="SearchBtn"
  >
    <i className="fa-solid fa-magnifying-glass"></i>
  </Button>

  <button
    type="button"
    className="locationBtn"
    onClick={getLocation}
  >
    Use My Location
  </button>

  {error && (
    <p className="errorMsg">
      No such place exists!
    </p>
  )}
</form>
    </div>
  );
}