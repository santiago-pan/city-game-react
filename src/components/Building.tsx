import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { GameImages, GameImagesContext } from '../utils/Images';

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
  buildingIndex: number;
  difficulty: number;
};

type Floor = {
  img: HTMLImageElement;
  height: number;
  type: string;
};

export function Building(props: BuildingProps) {
  const images = useContext<GameImages>(GameImagesContext);
  const factor = useRef(props.buildingWidth / 84);
  const building = useRef(getBuilding(props.difficulty));

  function getBuilding(difficulty: number): Floor[] {
    const roof = getRandomFloor(images.roofs);
    const basement = getRandomFloor(images.basements);
    const floor = getRandomFloor(images.floors);
    const numFloors = randomFloorIndex(difficulty) + 1;
    const floors = Array(numFloors).fill(floor);
    return [basement, ...floors, roof];
  }

  function getRandomFloor(floors: { [key: string]: HTMLImageElement }): Floor {
    const floorIndex = randomFloorIndex(Object.keys(floors).length);
    const img = Object.values(floors)[floorIndex];
    const type = Object.keys(floors)[floorIndex];
    return {
      img,
      height: img.height * factor.current,
      type,
    };
  }

  function randomFloorIndex(numFloors: number) {
    return Math.floor(Math.random() * numFloors);
  }

  function getFloorHeight(building: Floor[], index: number): number {
    let height = 0;
    for (let i = 0; i < index; i++) {
      height += building[i].height;
    }
    return height;
  }

  return (
    <div>
      {building.current.map((floor, index) => {
        const floorHeight = getFloorHeight(building.current, index);
        return (
          <FloorStyleAttr
            key={index}
            src={floor.img.src}
            x={props.x + props.buildingWidth * props.buildingIndex}
            y={props.y + floorHeight}
            buildingWidth={props.buildingWidth}
          />
        );
      })}
    </div>
  );
}
