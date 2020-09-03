import React from 'react';
import './App.css';

import Game from "../src/components/game.js";
import Leaderboard from "../src/components/leaderboard.js";

function App() {
  return (
    <div className="App">
      <h1>Simon Says</h1>

      <Game />
      <Leaderboard />
    </div>
  );
}

export default App;
