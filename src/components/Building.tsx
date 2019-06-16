import React, { useRef } from 'react';
import styled from 'styled-components';
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

type BuildingProps = {
  x: number;
  y: number;
  buildingWidth: number;
  images: ImagesType;
  buildingIndex: number;
  difficulty: number;
};

export function Building(props: BuildingProps) {
  const factor = useRef(props.buildingWidth / 84);
  const building = useRef(getBuilding(props.difficulty, props.images));

  return (
    <div>
      {building.current.map((floor, index) => {
        const floorHeight =
          getFloorHeight(building.current, index) * factor.current;
        return (
          <FloorStyleAttr
            key={index}
            src={floor.src}
            x={props.x + props.buildingWidth * props.buildingIndex}
            y={props.y + floorHeight}
            buildingWidth={props.buildingWidth}
          />
        );
      })}
    </div>
  );
}

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

const randomItemIndex = (numItems: number) =>
  Math.floor(Math.random() * numItems);

const getRandomItem = (items: { [key: string]: HTMLImageElement }) =>
  Object.values(items)[randomItemIndex(Object.keys(items).length)];
