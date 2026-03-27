import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ title }) {
  return (
    <div className="navbar">
      <h3>{title}</h3>
    </div>
  );
}

export default Navbar;
