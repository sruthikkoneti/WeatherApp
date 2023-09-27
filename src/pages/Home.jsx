import React, { useEffect, useState } from "react";
import axios from "axios";
import Sunny from "../components/Sunny";
import Rainy from "../components/Rainy";

const Home = () => {
  const [weatherData, SetWeatherData] = useState({});
  const [location, setLocation] = useState("");

  const handleLocation = (event) => {
    console.log(event.target.value);
    setLocation(event.target.value);
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b1f51569f3a7bd49f7e8052e31eee12b`;

  const getWeather = async () => {
    try {
      const response = await axios.get(url);
      SetWeatherData(response.data);
      console.log(response.data);
      setLocation("");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(()=>{
  //   getWeather()
  // },[])

  return (
    <div className="app">
      <div className="top-container">
        <div className="search">
          <input
            value={location}
            onChange={handleLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>
        <div className="search-button">
          <button onClick={getWeather}>Search</button>
        </div>
        <div className="mode">
          <button>Mode</button>
        </div>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData.main ? (
              <h1>{weatherData.main.temp.toFixed()}°F</h1>
            ) : null}
          </div>
          <div className="description">
            {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
          </div>
        </div>
        {/* {weatherData.name===undefined && (
          <h3>search for any location</h3>
        )}  */}   {/* Test case to display something when data is not there*/}

        {weatherData.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {weatherData.main ? (
                <p className="bold">
                  {weatherData.main.feels_like.toFixed()}°F
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {weatherData.main ? (
                <p className="bold">{weatherData.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData.wind ? (
                <p className="bold">{weatherData.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
