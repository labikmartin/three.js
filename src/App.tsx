import React, { useEffect } from 'react';
import './App.css';

import GameController from './Game/Game';

function App() {
  const Game = new GameController();

  useEffect(() => {
    Game.init();
  }, [Game]);

  return <div className="App">This is Game Biatch!</div>;
}

export default App;
