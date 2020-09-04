import React from "react";
import "./stylesheets/game.css";

import ButtonContainer from "./buttonContainer.js";
import Leaderboard from "./leaderboard.js";


function Game() {

  const [score, setScore] = React.useState(0);
  const [sequence, setSequence] = React.useState([]);
  const [gameRunning, setGameRunning] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [toLeaderboard, setToLeaderboard] = React.useState();

  const colors = ["green", "red", "yellow", "blue"]

  React.useEffect(() => {
    if (!gameRunning) {
      document.addEventListener("keydown", startOnSpace);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const startOnSpace = (e) => {
      if (e.code === "Space") {
        start();
      }
  }

  const createSequence = () => {
    const seq = sequence;
    const randIdx = Math.floor(Math.random() * 4);
    seq.push(colors[randIdx]); 
    setSequence(seq);
  }

  const restart = () => {
    setGameOver(false);
    setScore(0);

    setGameRunning(true);
    createSequence();
  }

  const start = () => {
    setGameRunning(true);
    createSequence();
    document.removeEventListener("keydown", startOnSpace);
  }

  const nextLevel = () => {
    createSequence();
    setScore(score + 1);
  }

  const endGame = () => {
    setGameOver(true);
    setGameRunning(false);
    setSequence([]);
    setToLeaderboard(score);
  }

  return (
    <div className="game">
      <div className="hud">
        <div className="display">&nbsp;</div>
        {
          (gameOver) ?
            <button className="displayButton" onClick={restart}>play again</button>
            : (gameRunning) ? 
              <div className="score">score: {score}</div>
            : <button className="displayButton" onClick={start}>start</button>
        }
      </div>
      
      <ButtonContainer 
        gameRunning={gameRunning}
        sequence={sequence}
        nextLevel={nextLevel}
        endGame={endGame}
      />

      <Leaderboard newScore={toLeaderboard}/>
    </div>
  )
}

export default Game;
