import React from "react";
import "./stylesheets/buttonContainer.css";
import "./stylesheets/button.css";

import Button from "./button.js";


function ButtonContainer({gameRunning, sequence, nextLevel, endGame}) {

  const [playingSequence, setPlayingSequence] = React.useState(false);
  const [playerTurn, setPlayerTurn] = React.useState(false);
  const [playerIndex, setPlayerIndex] = React.useState(0);

  const colors = ["green", "red", "yellow", "blue"]

  React.useEffect(() => {
    if (gameRunning && !playerTurn) {
      console.log(sequence)
      playSequence();
    }
  },[sequence, gameRunning, playerTurn, playerIndex])

  const playSequence = () => {
    setPlayingSequence(true);

    let i = 0;
    let button;
    let interval = setInterval(() => {
      if (i === sequence.length * 2 - 1) {
        setPlayingSequence(false); 
        setPlayerTurn(true);
        clearInterval(interval);
      }
      let realIdx = Math.floor(i/2);
      if (i % 2 === 0) {
        button = document.querySelector(`.${sequence[realIdx]}`);
        button.classList.add(`${sequence[realIdx]}-flash`);
      } else {
        button.classList.remove(`${sequence[realIdx]}-flash`);
      }
      i++;
    }, 650)
  }

  const clickButton = (e) => {
    if (playerTurn) {
      if (sequence[playerIndex] === e.target.getAttribute("data-color")) {
        if (playerIndex === sequence.length - 1) {
          setPlayerIndex(0);
          nextLevel();
          setPlayerTurn(false);
        } else {
          setPlayerIndex(playerIndex + 1);
        }
      } else {
        setPlayerIndex(0);
        setPlayerTurn(false);
        endGame();
      }
    }
  }

  return (
    <div className="buttonContainer">
      {
        colors.map((color) => 
          <div 
            className={`button ${color}`}
            data-color={color}
            key={color}
            onClick={(e) => clickButton(e)}
          />
        )
      }
    </div>
  )
}

export default ButtonContainer;
