import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Game } from './components/Game';
import Images, { GameImages, GameImagesContext } from './utils/Images';

function App() {
  const images = useRef<GameImages>({} as any);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded === false) {
      (async () => {
        images.current = await Images();
        setLoaded(true);
      })();
    }
  });

  return (
    <div className="App">
      {loaded && (
        <GameImagesContext.Provider value={images.current}>
          <Game
            {...{
              frameRate: 25,
              cityWidth: 800,
              cityHeight: 480,
              difficulty: 3,
            }}
          />
        </GameImagesContext.Provider>
      )}
    </div>
  );
}

export default App;
