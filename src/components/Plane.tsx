import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
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
  const { x, y } = usePosition(props);

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