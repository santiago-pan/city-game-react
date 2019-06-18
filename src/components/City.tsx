import React, { useRef } from 'react';
import { Building } from './Building';
import { GameProps } from './Game';

type CityProps = GameProps & {
  buildingWidth: number;
};

export function City(props: CityProps) {
  const { x, y } = usePosition(props.cityWidth, props.cityHeight);
  const numberOfBuildings = useRef(
    getNumberOfBuildings(props.cityWidth, props.buildingWidth),
  );
  return (
    <div>
      {numberOfBuildings.current.map((_, index: number) => {
        return (
          <Building
            key={index}
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

function usePosition(cityWidth: number, cityHeight: number) {
  const cityStartX = useRef(window.innerWidth / 2 - cityWidth / 2);
  const x = useRef(cityStartX.current);
  const y = useRef(window.innerHeight - cityHeight);
  return { x, y };
}
