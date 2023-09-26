import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [mode, setMode] = useState("light");
  const lightMode = mode === "light";

  const handleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <p>hello</p>
        </div>
        <div className="title">
          <h3>WeatherForecast</h3>
        </div>
        <div className="search">
          <input type="text" placeholder="location...." />
          Search
        </div>
        <div className="mode">
          <button onClick={handleMode}>Mode</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
