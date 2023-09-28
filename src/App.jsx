import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Welcome from "./pages/Welcome";
import NoLocation from "./pages/NoLocation";
import { useState } from "react";
const darkTheme = {
  backgroundColor: "#2B2B2B",
  color: "white",
};
const lightTheme = {
  backgroundColor: "#faf5f5",
  color: "black",
};

function App() {
  const [mode, setMode] = useState("light");
  const themeToggle = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home mode={mode} themeToggle={themeToggle} darkTheme={darkTheme} lightTheme={lightTheme} />} />
          <Route path="*" element={<ErrorPage mode={mode} themeToggle={themeToggle} darkTheme={darkTheme} lightTheme={lightTheme} />} />
          <Route path="/error" element={<ErrorPage mode={mode} themeToggle={themeToggle} darkTheme={darkTheme} lightTheme={lightTheme} />} />
          <Route  element={<NoLocation mode={mode} themeToggle={themeToggle} darkTheme={darkTheme} lightTheme={lightTheme} />} />
          <Route path="/welcome" element={<Welcome mode={mode} themeToggle={themeToggle} darkTheme={darkTheme} lightTheme={lightTheme} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
