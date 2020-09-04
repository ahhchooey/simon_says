import React from "react";
import "./stylesheets/button.css";


function Button({color}) {

  return (
    <div 
      className={`button ${color}`}
    >
      {color}
    </div>
  )
}

export default Button;
