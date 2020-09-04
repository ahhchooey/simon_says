import React from "react";
import "./stylesheets/buttonContainer.css";
import "./stylesheets/button.css";


function ButtonContainer({gameRunning, sequence, nextLevel, endGame}) {

  const [playerTurn, setPlayerTurn] = React.useState(false);
  const [playerIndex, setPlayerIndex] = React.useState(0);

  const colorsTop = ["green", "red"], colorsBottom = ["yellow", "blue"];

  React.useEffect(() => {
    const display = document.querySelector(".display");
    const playSequence = () => {
      display.innerHTML = "simon is moving";

      let i = 0;
      let button;
      let interval = setInterval(() => {
        if (i === sequence.length * 2 - 1) {
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
      }, 500)
    }

    if (gameRunning && !playerTurn) {
      setTimeout(() => {
        playSequence();
      }, 650)
    }
    if (playerTurn) {
      display.innerHTML = "copy simon";
    }
  },[sequence, gameRunning, playerTurn])

  const clickButton = (e) => {
    if (playerTurn) {
      if (sequence[playerIndex] === e.target.getAttribute("data-color")) {
        if (playerIndex === sequence.length - 1) {
          const display = document.querySelector(".display");
          display.innerHTML = "correct!";
          setPlayerTurn(false);
          setTimeout(() => {
            setPlayerIndex(0);
            nextLevel();
          }, 650)
        } else {
          setPlayerIndex(playerIndex + 1);
        }
      } else {
        endGame();
        setTimeout(() => {
          setPlayerIndex(0);
          setPlayerTurn(false);
          const display = document.querySelector(".display");
          display.innerHTML = "incorrect! game over! play again?";
        }, 100)
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
      <br/>
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
