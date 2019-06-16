import React, { useRef } from 'react';
import styled from 'styled-components';
import { GameProps } from './Game';
import { ImagesType } from '../utils/Images';

type FloorAreaProps = {
  x: number;
  y: number;
  buildingWidth: number;
};

const FloorStyle = styled.img<FloorAreaProps>`
  position: absolute;
  width: ${props => props.buildingWidth}px;
  height: auto;
  object-fit: contain;
`;

const FloorStyleAttr = styled(FloorStyle).attrs((props: FloorAreaProps) => ({
  style: {
    bottom: `${props.y}px`,
    left: `${props.x}px`,
  },
}))``;

type CityProps = GameProps & {
  images: ImagesType;
  buildingWidth: number;
};

export function City(props: CityProps) {
  const factor = useRef(props.buildingWidth / 84);
  const cityStartX = useRef(window.innerWidth / 2 - props.cityWidth / 2);
  const x = useRef(cityStartX.current);
  const y = useRef(window.innerHeight - props.cityHeight);

  const buildingA = getBuilding(props.difficulty, props.images);
  const buildingB = getBuilding(props.difficulty, props.images);
  
  // TODO: Move building to its own component and build city mapping through buildins.
  return (
    <div>
      {buildingA.map((floor, index) => {
        const floorHeight = getFloorHeight(buildingA, index) * factor.current;
        return (
          <FloorStyleAttr
            key={index}
            src={floor.src}
            x={x.current}
            y={y.current + floorHeight}
            buildingWidth={props.buildingWidth}
          />
        );
      })}
      {buildingB.map((floor, index) => {
        const floorHeight = getFloorHeight(buildingB, index) * factor.current;
        return (
          <FloorStyleAttr
            key={index}
            src={floor.src}
            x={x.current + props.buildingWidth}
            y={y.current + floorHeight}
            buildingWidth={props.buildingWidth}
          />
        );
      })}
    </div>
  );
}

const randomItemIndex = (numItems: number) =>
  Math.floor(Math.random() * numItems);

const getRandomItem = (items: { [key: string]: HTMLImageElement }) =>
  Object.values(items)[randomItemIndex(Object.keys(items).length)];

const getBuilding = (
  difficulty: number,
  images: ImagesType,
): HTMLImageElement[] => {
  const roof = getRandomItem(images.roofs);
  const basement = getRandomItem(images.basements);
  const floor = getRandomItem(images.floors);
  const numFloors = randomItemIndex(difficulty) + 1;
  const floors = Array(numFloors).fill(floor);
  return [basement, ...floors, roof];
};

const getFloorHeight = (
  building: HTMLImageElement[],
  index: number,
): number => {
  let height = 0;
  for (let i = 0; i < index; i++) {
    height += building[i].height;
  }
  return height;
};
