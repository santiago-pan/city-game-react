import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
import { Type } from '../store/actions';
import { useStore } from '../store/store';
import plane from './../assets/images/ic_plane_f21.png';
import { GameProps } from './Game';

// Plane configuration

const SPEED = 400;
const PLANE_WIDTH = 80;
const DOWN_SPEED = 10;

type PlaneAreaProps = {
  x: number;
  y: number;
};

const PlaneStyle = styled.img<PlaneAreaProps>`
  position: relative;
  width: ${PLANE_WIDTH}px;
  height: auto;
  object-fit: contain;
`;

const PlaneStyleAttr = styled(PlaneStyle).attrs((props: any) => ({
  style: {
    top: `${props.y}px`,
    left: `${props.x}px`,
  },
}))``;

type PlaneProps = GameProps & {
  frameDiff: number;
  cityWidth: number;
};

export function Plane(props: PlaneProps) {
  const store = useStore();

  const { x, y } = usePosition(props);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  });

  function handleKeyPress(event: any) {
    if (event.code === 'Space') {
      store.dispatch({
        type: Type.AddBomb,
        payload: { id: uuidv1(), type: 'bomb1', initX: x, initY: y },
      });
    }
  }

  return <PlaneStyleAttr src={plane} x={x} y={y} />;
}

function usePosition({ cityWidth, frameDiff }: PlaneProps) {
  const x = useRef(-PLANE_WIDTH);
  const y = useRef(0);

  const displacement = (frameDiff / 1000) * SPEED;
  if (x.current > cityWidth + PLANE_WIDTH) {
    y.current = y.current + DOWN_SPEED;
    x.current = -PLANE_WIDTH;
  } else {
    x.current = x.current + displacement;
  }

  return { x: x.current, y: y.current };
}
