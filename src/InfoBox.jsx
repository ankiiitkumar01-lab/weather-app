
import "./InfoBox.css";
import sun from "./assets/images/sun.png";
import cold from "./assets/images/cold.png";
import rain from "./assets/images/rain.png";




export default function Infobox({ Info }) {
  return (
      <div className="weatherCard">
    <img
  className="weatherIcon"
  src={
    Info.temp < 17
      ? cold
      : Info.temp > 29
      ? sun
      : Info.humidity > 80
      ? rain
      : sun
  }
  alt="weather icon"
/>
  
   <div className="main-details">
  <h1>{Info.temp}°C</h1>
  <h2>{Info.city}</h2>
  </div>

  <div className="details">
     <h3>
        <i className="fa-solid fa-droplet"></i>&nbsp;
           {Info.humidity}%<br />
      </h3>
    <div  className="other-details">
      <p>Max Temp = {Info.tempMax}°C</p>
       <p>Weather = {Info.weather}</p>
    </div>
  </div>

</div>

  );
}
