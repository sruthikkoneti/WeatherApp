import React, { useEffect, useState } from "react";
import axios from "axios";
import Sunny from "../components/Sunny";
import Rainy from "../components/Rainy";
import Loader from "../components/Loader";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
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
  const [weatherData, SetWeatherData] = useState({});
  const [location, setLocation] = useState("new delhi");
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

  const [noLocation, setNoLocation] = useState(false);

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

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=b1f51569f3a7bd49f7e8052e31eee12b`;

  const getWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      SetWeatherData(response.data);
      console.log(response.data);
      setLoading(false);
      // setLocation("");
    } catch (err) {
      console.log(err);
      setNoLocation(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(weatherData);
    getWeather();
  }, [unit]);

  return (
    <div className="app" style={mode === "light" ? lightTheme : darkTheme}>
      <div
        className="top-container"
        style={mode === "light" ? lightTheme : darkTheme}
      >
        <div className="search">
          <input
            value={location}
            onChange={handleLocation}
            placeholder="Enter Location"
            type="text"
            onKeyDown={handleKeyDown}
          />
          <select onChange={handleUnits}>
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
            <SearchIcon />
          </IconButton>
        </div>
        <div className="mode">
          <IconButton onClick={themeToggle}>
            {mode === "light" ? (
              <img src="/moon.png" />
            ) : (
              <img src="/sun.png" />
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
            {weatherData.weather && (
              <>
                <div className="weather-info">
                  <div className="major-details">
                    <div className="location-name">
                      <h1>{weatherData.name}</h1>
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
                  <div className="wind-speed">{weatherData.wind.speed} MPH</div>
                </div>
              </>
            )}
          </>
        )}
        {location === "" && <NoLocation />}
      </div>
    </div>
  );
};

export default Home;
