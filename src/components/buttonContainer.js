import React from "react";
import "./stylesheets/buttonContainer.css";
import "./stylesheets/button.css";

import Button from "./button.js";


function ButtonContainer({gameRunning, sequence, nextLevel, endGame}) {

  const [playingSequence, setPlayingSequence] = React.useState(false);
  const [playerTurn, setPlayerTurn] = React.useState(false);
  const [playerIndex, setPlayerIndex] = React.useState(0);

  const colorsTop = ["green", "red"], colorsBottom = ["yellow", "blue"];
  const display = document.querySelector(".display");

  React.useEffect(() => {
    if (gameRunning && !playerTurn) {
      console.log(sequence)
      playSequence();
    }
    if (playerTurn) {
      display.innerHTML = "copy simon";
    }
  },[sequence, gameRunning, playerTurn])

  const playSequence = () => {
    setPlayingSequence(true);
      display.innerHTML = "simon is moving";

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
        button.classList.add(`flash`);
      } else {
        button.classList.remove(`flash`);
      }
      i++;
    }, 650)
  }

  const clickButton = (e) => {
    if (playerTurn) {
      if (sequence[playerIndex] === e.target.getAttribute("data-color")) {
        if (playerIndex === sequence.length - 1) {
          display.innerHTML = "correct!";
          setTimeout(() => {
            setPlayerIndex(0);
            nextLevel();
            setPlayerTurn(false);
          }, 500)
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
        colorsTop.map((color) => 
          <button 
            className={`button ${color}${(playerTurn) ? ` hov` : ``}`}
            data-color={color}
            key={color}
            onClick={(e) => clickButton(e)}
          />
        )
      }
      <div></div>
      {
        colorsBottom.map((color) => 
          <button 
            className={`button ${color}${(playerTurn) ? ` hov` : ``}`}
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
