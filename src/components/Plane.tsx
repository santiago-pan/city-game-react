import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import planeImage from './../assets/images/ic_plane_f21.png';
import { GameProps } from './Game';

// Config

const SPEED = 400;
const PLANE_WIDTH = 120;
const DOWN_SPEED = 10;

// Styled components

type PlaneAreaProps = {
  x: number;
  y: number;
};

const PlaneStyle = styled.img<PlaneAreaProps>`
  position: relative;
  width: ${PLANE_WIDTH}px;
  height: auto;
  object-fit: contain;
  background: yellow;
`;

const PlaneStyleAttr = styled(PlaneStyle).attrs((props: any) => ({
  style: {
    top: `${props.y}px`,
    left: `${props.x}px`,
  },
}))``;

// Logic

type PlaneProps = GameProps & {
  diff: number;
  stamp: number;
  cityWidth: number;
};

export const Plane = (props: PlaneProps) => {

  const { x, y } = usePosition(props);

  return <PlaneStyleAttr src={planeImage} x={x} y={y} />;
};

function usePosition({ cityWidth, diff, stamp }: PlaneProps) {
  const cityHalfSize = useRef(cityWidth / 2 + PLANE_WIDTH / 2);
  const x = useRef(-cityHalfSize.current);
  const y = useRef(0);

  useEffect(() => {
    const displacement = (diff / 1000) * SPEED;
    if (x.current > cityHalfSize.current) {
      y.current = y.current + DOWN_SPEED;
      x.current = -cityHalfSize.current;
    } else {
      x.current = x.current + displacement;
    }
  }, [stamp, diff]);

  return { x: x.current, y: y.current };
}
