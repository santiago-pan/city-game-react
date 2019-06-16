import React, { useRef } from 'react';
import { ImagesType } from '../utils/Images';
import { Building } from './Building';
import { GameProps } from './Game';

type CityProps = GameProps & {
  images: ImagesType;
  buildingWidth: number;
};

export function City(props: CityProps) {
  const cityStartX = useRef(window.innerWidth / 2 - props.cityWidth / 2);
  const x = useRef(cityStartX.current);
  const y = useRef(window.innerHeight - props.cityHeight);
  const numberOfBuildings = useRef(
    getNumberOfBuildings(props.cityWidth, props.buildingWidth),
  );
  return (
    <div>
      {numberOfBuildings.current.map((_, index: number) => {
        return (
          <Building
            {...props}
            x={x.current}
            y={y.current}
            buildingIndex={index}
          />
        );
      })}
    </div>
  );
}

const getNumberOfBuildings = (
  cityWidth: number,
  buildingWidth: number,
): number[] => Array(Math.floor(cityWidth / buildingWidth)).fill(0);
