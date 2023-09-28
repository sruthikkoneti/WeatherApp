import React, { useEffect, useState } from "react";
import axios from "axios";
import Sunny from "../components/Sunny";
import Rainy from "../components/Rainy";
import Loader from "../components/Loader";
import IconButton from "@mui/material/IconButton";

import Welcome from "./Welcome";
import { useNavigate } from "react-router";
import { Icon } from '@iconify/react';
import NoLocation from "./NoLocation";
const darkTheme = {
  backgroundColor: "#2B2B2B",
  color: "white",
};
const lightTheme = {
  backgroundColor: "#faf5f5",
  color: "black",
};

const Home = () => {
  const navigate = useNavigate();
  const [weatherData, SetWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("imperial");
  const options = ["imperial", "metric"];
  const handleUnits = (event) => {
    console.log(event.target.value);
    console.log(unit);
    setUnit(event.target.value);
    console.log(unit);
  };
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [noLocation,setNoLocation]=useState(false);

  const themeToggle = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const handleLocation = (event) => {
    console.log(event.target.value);
    setLocation(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      getWeather();
    }
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=b1f51569f3a7bd49f7e8052e31eee12b
  `;

  const getWeather = async () => {
    try {
      setWelcome(false);
      setLoading(true);
      const response = await axios.get(url);
      SetWeatherData(response.data);
      console.log(response.data);
      setLoading(false);
      setNoLocation(false)
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
      if (err.response.data.message === "city not found") {
        // navigate("/error");
        setNoLocation(true)
        setWelcome(false)
      }
      if (err.response.data.message === "Nothing to geocode") {
        setWelcome(true);
      }
    }
  };

  useEffect(() => {
    getWeather();
    console.log(weatherData);
  }, [unit]);

  return (
    <div className="app" style={mode === "light" ? lightTheme : darkTheme}>
      <div
        className="top-container"
        style={mode === "light" ? lightTheme : darkTheme}
      >
        <div className="search" style={mode === "light" ? lightTheme : darkTheme}>
          <input
            value={location}
            onChange={handleLocation}
            placeholder="Enter Location"
            type="text"
            onKeyDown={handleKeyDown}
            style={mode === "light" ? lightTheme : darkTheme}
          />
          <select onChange={handleUnits} style={mode === "light" ? lightTheme : darkTheme}>
            {options.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option === "imperial" ? "Fahrenheit" : "Celsius"}
                </option>
              );
            })}
          </select>
        </div>
        <div className="search-button">
          <IconButton onClick={getWeather}>
            {mode==="light"? <Icon icon="material-symbols:search" color="black" /> : <Icon icon="material-symbols:search" color="white" />}
          </IconButton>
        </div>
        <div className="mode">
          <IconButton onClick={themeToggle}>
            {mode === "light" ? (
              <Icon icon="fluent-emoji:new-moon" color="gray" width="48" height="48" />
            ) : (
              <Icon icon="fluent-emoji:sun-behind-small-cloud" color="gray" width="48" height="48" />
            )}
          </IconButton>

        </div>
      </div>
      <div
        className="bottom-container"
        style={mode === "light" ? lightTheme : darkTheme}
      >
        {loading === true ? (
          <Loader />
        ) : (
          <>
            {weatherData.cod ? (
              <>
                <div className="weather-info">
                  <div className="major-details">
                    <div className="location-name">
                      <h1>{weatherData.name}</h1>
                      <h4>{weatherData.sys.country}</h4>
                    </div>
                    <div className="weather-image">
                      {weatherData.weather[0].main === "Clear" ? (
                        <Sunny />
                      ) : (
                        <Rainy />
                      )}
                    </div>
                  </div>
                  <div className="temperature">
                    {weatherData.main ? (
                      <h1>
                        {weatherData.main.temp.toFixed()}
                        {unit === "imperial" ? "°F" : "°C"}
                      </h1>
                    ) : null}
                  </div>
                  <div className="wind-speed">Wind Speed: {weatherData.wind.speed} MPH</div>
                  <div className="coordinates">
                    <p>{Math.abs(Number(weatherData.coord.lon))} {weatherData.coord.lon<0 ? "°West" : "°East"}</p>
                    <p>{Math.abs(Number(weatherData.coord.lat))} {weatherData.coord.lat<0 ? "°South" : "°North"}</p>
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
        {/* {weatherData === "" && <Welcome />} */}
        {/* {status === 404 && <Navigate to="/error" />} */}
        {welcome === true && <Welcome />}
        {noLocation === true && <NoLocation/>}
      </div>
    </div>
  );
};

export default Home;
