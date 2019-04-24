import React, { useState, useEffect } from "react";
import styled from "styled-components";
import planeImage from "./../assets/images/ic_plane_f21.png";
import { GameProps } from "./Game";

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
    left: `${props.x}px`
  }
}))``;

// Logic

type PlaneProps = GameProps & {
  diff: number;
  stamp: number;
};

export const Plane = (props: PlaneProps) => {
  
  const { x, y } = usePosition(props);

  return <PlaneStyleAttr src={planeImage} x={x} y={y} />;
};

const usePosition = (props: PlaneProps) => {
  const cityHalfSize = props.cityWidth / 2 + PLANE_WIDTH / 2;
  const [x, setX] = useState(-cityHalfSize);
  const [y, setY] = useState(0);

  useEffect(() => {
    const displacement = (props.diff / 1000) * SPEED;

    setX(x + displacement);
    if (x > cityHalfSize) {
      setX(-cityHalfSize);
      setY(y + DOWN_SPEED);
    }
  }, [props.stamp]);
  return { x, y };
};
