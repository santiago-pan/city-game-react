import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useStore } from '../store/store';
import Bomb from './Bomb';
import { City } from './City';
import { Explosion } from './Explosion';
import { Plane } from './Plane';

const Area = styled.div`
  height: 100%;
  width: 100%;
  background: orange;
`;

const GameArea = styled.div`
  height: 480px;
  min-width: 800px;
  max-width: 800px;
  background: gray;
  width: 50%;
  margin: 0 auto;
  overflow: hidden;
`;

const TICK_RATE = 100;

type GameState = {
  timestamp: number;
  shots: number;
  points: number;
  totalPoints: number;
  firePowerRelease: number;
  impacts: number;
  currentLevel: number;
  status: GameStatus;
};

enum GameStatus {
  GAME_LOADING = -1,
  GAME_ON = 0,
  GAME_OVER = 1,
  GAME_WIN = 2,
  GAME_PAUSED = 3,
}

export type GameProps = {
  frameRate: number;
  cityWidth: number;
  cityHeight: number;
  difficulty: number;
};

export function Game(props: GameProps) {
  const store = useStore();
  const pauseGame = useRef(false);

  const [gameState, setGameState] = useState<GameState>({
    timestamp: +new Date(),
    shots: 0,
    points: 0,
    totalPoints: 0,
    firePowerRelease: 0,
    impacts: 0,
    currentLevel: 0,
    status: GameStatus.GAME_ON,
  });

  useEffect(() => {
    let interval = 0;

    const onTick = () => {
      if (!pauseGame.current) {
        setGameState({ ...gameState, timestamp: +new Date() });
      }
    };

    interval = setInterval(onTick, TICK_RATE);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  });

  function handleKeyPress(event: any) {
        
    if (event.code === 'KeyP') {
      pauseGame.current = !pauseGame.current;
      console.log(pauseGame.current);
    }
  }

  return (
    <Area>
      <GameArea>
        <Plane {...props} />        
        <City {...props} buildingWidth={42} difficulty={props.difficulty} />
        <Explosion {...props} />
        {Array.from(store.state.bombs.values()).map(bomb => (
          <Bomb {...props} {...bomb} key={bomb.id} />
        ))}
      </GameArea>
    </Area>
  );
}
