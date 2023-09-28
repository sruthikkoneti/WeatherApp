import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const ErrorPage = (props) => {
  return (
    <div className="error" style={props.mode === "light" ? props.lightTheme : props.darkTheme}>
      <Link to="/">
        <h1>Redirect to main page....</h1>
      </Link>
      <img src="/error.svg" alt="" width="50%" />
    </div>
  );
};

export default ErrorPage;
