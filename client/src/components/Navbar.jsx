//import React from "react";
import logo from "../assets/pizza_logo.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="rightSide"></div>
    </div>
  );
}
