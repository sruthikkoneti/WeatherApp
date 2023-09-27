import React, { useEffect, useState } from "react";
import axios from "axios";
import Sunny from "../components/Sunny";
import Rainy from "../components/Rainy";
import Loader from "../components/Loader";
import IconButton from "@mui/material/IconButton";

const darkTheme = {
  backgroundColor: "#2B2B2B",
  color: "white",
};
const lightTheme = {
  backgroundColor: "#d8dcff",
  color: "black",
};

const Home = () => {
  const [weatherData, SetWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);

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

  const [condition, setCondition] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b1f51569f3a7bd49f7e8052e31eee12b`;

  const getWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      SetWeatherData(response.data);
      setCondition(response.data.weather[0].main);
      setLoading(false);
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
          />
        </div>
        <div className="search-button">
          <button onClick={getWeather}>Search</button>
        </div>
        <div className="mode">
          <IconButton onClick={themeToggle}>
            {mode === "light" ? (
              <img src="/public/moon.png" />
            ) : (
              <img src="/public/sun.png" />
            )}
          </IconButton>
        </div>
      </div>
      <div
        className="bottom-container"
        style={mode === "light" ? lightTheme : darkTheme}
      >
        {loading===true ? (
          <Loader />
        ) : (
          <>
            {weatherData.weather && (
              <>
                <div className="weather-info">
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
                  <div className="temperature">
                    {weatherData.main ? (
                      <h1>{weatherData.main.temp.toFixed()}°F</h1>
                    ) : null}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
