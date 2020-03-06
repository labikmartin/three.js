import React, { useEffect, Fragment } from 'react';
import './App.css';

import SceneController from './Game/SceneController';

function App() {
  useEffect(() => {
    const Scene = new SceneController();

    Scene.init();
  }, []);

  return <Fragment />;
}

export default App;
