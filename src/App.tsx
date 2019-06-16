import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Game } from './components/Game';
import Images, { ImagesType } from './utils/Images';

function App() {
  const images = useRef<ImagesType | undefined>(undefined);
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
        <Game
          {...{
            images: images.current as ImagesType,
            frameRate: 25,
            cityWidth: 800,
            cityHeight: 480,
            difficulty: 3,
          }}
        />
      )}
    </div>
  );
}

export default App;
