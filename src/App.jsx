import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import { useState } from "react";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
