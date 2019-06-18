import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import plane from './../assets/images/ic_plane_f21.png';
import { GameProps } from './Game';

// Config

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
  diff: number;
  stamp: number;
  cityWidth: number;
};

export function Plane(props: PlaneProps) {
  const { x, y } = useDraw(props);

  return <PlaneStyleAttr src={plane} x={x} y={y} />;
}

function useDraw({ cityWidth, diff, stamp }: PlaneProps) {
  const { x, y, cityHalfSize } = usePosition(cityWidth);

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

function usePosition(cityWidth: number) {
  const cityHalfSize = useRef(cityWidth / 2 + PLANE_WIDTH / 2);
  const x = useRef(-cityHalfSize.current);
  const y = useRef(0);
  return { x, y, cityHalfSize };
}
