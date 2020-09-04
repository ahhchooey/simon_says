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

  const createSequence = () => {
    const seq = sequence;
    const randIdx = Math.floor(Math.random() * 4);
    seq.push(colors[randIdx]); 
    setSequence(seq);
  }

  const restart = () => {
    setGameOver(false);
    setLevel(1);
    setScore(0);
    setGameRunning(true);
    createSequence();
  }

  const start = () => {
    setGameRunning(true);
    createSequence();
  }

  const nextLevel = () => {
    setLevel(level + 1);
    createSequence();
    setScore(score + 1);
  }

  const endGame = () => {
    setGameOver(true);
    setGameRunning(false);
    setSequence([]);
  }

  return (
    <div className="game">
      <div className="hud">
        {
          (gameOver) ?
            <div>
              <div className="fail">incorrect! would you like to play again?</div>
              <div className="restartButton" onClick={restart}>play again</div>
            </div>
            : (gameRunning) ? 
              <div>
                <div className="display">&nbsp;</div>
                <div className="score">{score}</div>
              </div>
            : <div>
                <div className="display">&nbsp;</div>
                <div className="startButton" onClick={start}>start</div>
              </div>
        }
      </div>
      
      <ButtonContainer 
        gameRunning={gameRunning}
        sequence={sequence}
        nextLevel={nextLevel}
        endGame={endGame}
      />
    </div>
  )
}

export default Game;
