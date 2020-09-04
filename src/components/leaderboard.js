import React from "react";
import "./stylesheets/leaderboard.css";


function Leaderboard({newScore}) {

  const [board, setBoard] = React.useState([]);
  const [size, setSize] = React.useState(0);

  const placings = ["first place", "second place", "third place"];

  React.useEffect(() => {
    if (newScore === undefined) return;
    if (size < 3) {
      let newBoard = board || [];
      newBoard.push(newScore);
      setBoard(newBoard.sort((a, b) => b - a));
      setSize(size + 1);
    } else {
      let newBoard = [];
      let i = 0;
      while (newBoard.length < 3) {
        if (newScore > board[i]) {
          newBoard.push(newScore);
          newScore = -1;
        } else {
          newBoard.push(board[i]);
          i++;
        }
      }
      setBoard(newBoard);
    }
  }, [newScore])

  return (
    <div className="leaderboard">
      High Scores
      <div 
        style={
          {height: 1, width: 100, backgroundColor: "#EEE", margin: "0 auto", marginBottom: 5}
        }
      >
      </div>
      {
        board.map((score, idx) => 
          <div key={idx} className="leaderboardSlot">
            <span>{placings[idx]}:</span>
            <span>{score}</span>
          </div>
        )
      }
    </div>
  )
}

export default Leaderboard;
