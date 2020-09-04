import React from 'react';

import Game from "../src/components/game.js";
import Leaderboard from "../src/components/leaderboard.js";

function App() {
  return (
    <div className="App">
      <div className="title">Simon Says</div>

      <Game />
    </div>
  );
}

export default App;
