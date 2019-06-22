import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { GameImages, GameImagesContext } from '../utils/Images';
import { GameProps } from './Game';

type ExplosionAreaProps = {
  x: number;
  y: number;
  width: number;
};

const ExplosionImageStyle = styled.div<ExplosionAreaProps>`
  position: fixed;
  width: ${props => props.width}px;
  height: auto;
  object-fit: contain;
  overflow: hidden;
`;

const ExplosionStyle = styled(ExplosionImageStyle).attrs(
  (props: ExplosionAreaProps) => ({
    style: {
      bottom: `${props.y}px`,
      left: `${props.x}px`,
    },
  }),
)``;

type ExplostionFrameProps = {
  frame: number;
  totalWidth: number;
  width: number;
};

const ExplosionFrame = styled.img<ExplostionFrameProps>`
  width: ${props => props.totalWidth}px;
  transform: translate(${props => -1 * props.frame * props.width}px);
`;

type ExplosionProps = GameProps;

// TODO: Create type for explosion and set this values
const NUM_FRAMES = 43;

export function Explosion(props: ExplosionProps) {
  const { x, y } = usePosition(props.cityWidth, props.cityHeight);
  const frame = useRef(0);
  const images = useContext<GameImages>(GameImagesContext);

  const explosion = images.explosions.EXPLOSION_1;
  const totalWidth = explosion.width;

  const frames = NUM_FRAMES;
  const width = totalWidth / frames;

  frame.current = updateExplosion(frame.current);

  return (
    <ExplosionStyle x={x.current} y={y.current} width={width}>
      <ExplosionFrame
        src={explosion.src}
        frame={frame.current}
        totalWidth={totalWidth}
        width={width}
      />
    </ExplosionStyle>
  );
}

function updateExplosion(frame: number) {
  frame++;
  if (frame > NUM_FRAMES) {
    frame = 0;
  }
  return frame;
}

function usePosition(cityWidth: number, cityHeight: number) {
  const cityStartX = useRef(window.innerWidth / 2 - cityWidth / 2);
  const x = useRef(cityStartX.current);
  const y = useRef(window.innerHeight - cityHeight);
  return { x, y };
}
