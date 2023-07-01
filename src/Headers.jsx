import React from "react";
import { logo } from "./assets";
import "./Headers.css";

function Headers() {
  return (
    <header className="Headers">
      <img src={logo} alt="logo" className="headimg" />
    </header>
  );
}

export default Headers;
