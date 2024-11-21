import React from "react";
import "./ToggleButton.css";

const ToggleButton = ({ onClick }) => {
  return (
    <button className="toggle-button" onClick={onClick}>
      ☰
    </button>
  );
};

export default ToggleButton;
