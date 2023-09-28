import React from "react";

const NoLocation = (props) => {
  return (
    <div
      className="no-location"
      style={props.mode === "light" ? props.lightTheme : props.darkTheme}
    >
      <h1>
        Weather reports not found for this city, Please try something else...
      </h1>
      <img src="/error.svg" alt="" width="50%" />
    </div>
  );
};

export default NoLocation;
