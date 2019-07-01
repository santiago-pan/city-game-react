import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { GameImages, GameImagesContext } from '../utils/Images';
import { GameProps } from './Game';
import { useStore, StoreContextType } from '../store/store';
import { Type } from '../store/actions';

type ExplosionAreaProps = {
  x: number;
  y: number;
  width: number;
};

const ExplosionImageStyle = styled.div<ExplosionAreaProps>`
  position: absolute;
  width: ${props => props.width}px;
  height: auto;
  object-fit: contain;
  overflow: hidden;
`;

const ExplosionStyle = styled(ExplosionImageStyle).attrs(
  (props: ExplosionAreaProps) => ({
    style: {
      top: `${props.y}px`,
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

export type IExplosion = {
  id: string;
  type: 'explosion1' | 'explosion2' | 'explosion3';
  initX: number;
  initY: number;
};

type ExplosionProps = IExplosion & GameProps;

// TODO: Create type for explosion and set this values
const NUM_FRAMES = 43;

export function Explosion(props: ExplosionProps) {
  const store = useStore();
  const { x, y } = usePosition(
    props.initX,
    props.initY,
    props.cityWidth,
    props.cityHeight,
  );
  const frame = useRef(0);
  const images = useContext<GameImages>(GameImagesContext);

  const explosion = images.explosions.EXPLOSION_1;
  const totalWidth = explosion.width;

  const frames = NUM_FRAMES;
  const width = totalWidth / frames;

  frame.current = updateExplosion(store, props.id, frame.current);

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

function updateExplosion(store: StoreContextType, id: string, frame: number) {
  frame++;
  if (frame > NUM_FRAMES) {    
    store.dispatch({ type: Type.RemoveExplosion, payload: { id } });
  }
  return frame;
}

function usePosition(
  initX: number,
  initY: number,
  cityWidth: number,
  cityHeight: number,
) {
  const cityStartX = useRef(window.innerWidth / 2 - cityWidth / 2);
  const x = useRef(initX);
  const y = useRef(initY);
  return { x, y };
}
