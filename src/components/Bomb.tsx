import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { GameImagesContext } from '../utils/Images';
import { GameProps } from './Game';
import { useStore, StoreContextType } from '../store/store';
import { Type } from '../store/actions';
import uuidv1 from 'uuid/v1';

// Style

type BombAreaProps = {
  x: number;
  y: number;
  rotation: number;
  width: number;
};

const BombStyle = styled.img<BombAreaProps>`
  position: absolute;
  width: ${props => props.width}px;
  height: auto;
  object-fit: contain;
  transform: rotate(${props => props.rotation}deg);
`;

const BombStyleAttr = styled(BombStyle).attrs((props: any) => ({
  style: {
    top: `${props.y}px`,
    left: `${props.x}px`,
  },
}))``;

// Bomb configuration
const BOMB_ACCELERATION = 10;
const BOMB_INITIAL_SPEED = 80;

export type IBomb = {
  id: string;
  type: 'bomb1' | 'bomb2' | 'bomb3';
  initX: number;
  initY: number;
};

type BombProps = {} & IBomb & GameProps;

export default function Bomb(props: BombProps) {
  const store = useStore();

  const { x, y, rotation } = usePosition(
    props.initX,
    props.initY,
    props.cityHeight,
    store,
    props.id,
  );

  const images = useContext(GameImagesContext);

  return (
    <BombStyleAttr
      src={images.bombs.BOMB_1.src}
      x={x}
      y={y}
      width={20}
      rotation={rotation}
    />
  );
}

function usePosition(
  initX: number,
  initY: number,
  cityHeight: number,
  store: StoreContextType,
  id: string,
) {
  const timeRef = useRef<number>(+new Date());
  const x = useRef(initX);
  const y = useRef(initY);
  const speed = useRef(BOMB_INITIAL_SPEED);
  const bombTime = useRef(0);
  const rotation = useRef(0);

  const currentTime = +new Date();
  const frameDiff = (currentTime - timeRef.current) / 1000;

  timeRef.current = currentTime;

  rotation.current += 0.5;
  x.current += 5;

  bombTime.current += frameDiff;
  speed.current += (BOMB_ACCELERATION * bombTime.current ** 2) / 2;
  y.current += speed.current * frameDiff;

  if (y.current > cityHeight) {
    removeBoomb(store, id);
    addExplosion(store, x.current, y.current);
  }

  return { x: x.current, y: y.current, rotation: rotation.current };
}

function removeBoomb(store: StoreContextType, id: string) {
  store.dispatch({ type: Type.RemoveBomb, payload: { id } });
}

function addExplosion(store: StoreContextType, initX: number, initY: number) {
  store.dispatch({
    type: Type.AddExplosion,
    payload: {
      id: uuidv1(),
      type: 'explosion1',
      initX,
      initY,
    },
  });
}
