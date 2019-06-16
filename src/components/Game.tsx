import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Plane } from './Plane';
import { City } from './City';
import { ImagesType } from '../utils/Images';

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

const TICK_RATE = 1000;

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
  images: ImagesType;
  frameRate: number;
  cityWidth: number;
  cityHeight: number;
  difficulty: number;
};

export function Game(props: GameProps) {
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

  const diff = useRef(0);

  useEffect(() => {
    let interval = 0;
    const onTick = () => {
      const timestamp = +new Date();
      diff.current = timestamp - gameState.timestamp;
      setGameState({ ...gameState, timestamp: +new Date() });
    };

    interval = setInterval(onTick, TICK_RATE);

    return () => clearInterval(interval);
  }, [gameState]);

  return (
    <Area>
      <GameArea>
        <Plane {...props} diff={diff.current} stamp={gameState.timestamp} />
        <City
          {...props}
          buildingWidth={72}
          images={props.images}
          difficulty={props.difficulty}
        />
      </GameArea>
    </Area>
  );
}
