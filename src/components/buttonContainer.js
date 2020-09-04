import React from "react";
import "./stylesheets/buttonContainer.css";

import Button from "./button.js";


function ButtonContainer({gameRunning, sequence}) {

  const [playingSequence, setPlayingSequence] = React.useState(false);
  const [playerTurn, setPlayerTurn] = React.useState(false);
  const [playerIndex, setPlayerIndex] = React.useState(0);

  const colors = ["green", "red", "yellow", "blue"]

  React.useEffect(() => {
    if (gameRunning && !playerTurn) {
      playSequence();
    }
    if (playerTurn) {
      console.log("its ur turn bb")
    }
  },[gameRunning, playerTurn, playerIndex])

  const playSequence = () => {
    setPlayingSequence(true);

    let i = 0;
    let interval = setInterval(() => {
      if (i === sequence.length - 1) {
        setPlayingSequence(false); 
        setPlayerTurn(true);
        clearInterval(interval);
      }
      console.log(sequence[i]);
      i++;
    }, 700)
  }

  const clickButton = (e) => {
    console.log(e.target);
  }

  return (
    <div className="buttonContainer">
      {
        colors.map((color) => 
          <Button 
            key={color}
            color={color} 
            onClick={(e) => clickButton(e)}
          />
        )
      }
    </div>
  )
}

export default ButtonContainer;
