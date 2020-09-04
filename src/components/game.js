import React from "react";
import "./stylesheets/game.css";

import ButtonContainer from "./buttonContainer.js";


function Game() {

  const [level, setLevel] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const [sequence, setSequence] = React.useState([]);
  const [gameRunning, setGameRunning] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);

  const colors = ["green", "red", "yellow", "blue"]

  const createSequence = (level) => {
    const seq = [];
    for (let i = 0; i < level; i++) {
      const randIdx = Math.floor(Math.random() * 4);
      seq.push(colors[randIdx]); 
    }
    setSequence(seq);
  }

  const restart = () => {
    setLevel(1);
    setScore(0);
    setSequence([]);
  }
  
  const getIsRunning = () => {
    return gameRunning;
  }

  const getSequence = () => {
    return sequence;
  }

  const start = () => {
    setGameRunning(true);

    createSequence(level);
  }

  return (
    <div className="game">
      <div className="display">
        {
          (gameOver) ?
            <div className="restartButton" onClick={restart}>restart</div>
            : (gameRunning) ? 
            <div className="score">{score}</div>
            : <div className="startButton" onClick={start}>start</div>
        }
      </div>
      
      <ButtonContainer 
        gameRunning={gameRunning}
        sequence={sequence}
      />
    </div>
  )
}

export default Game;
