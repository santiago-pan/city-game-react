import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";
import { Plane } from "./Plane";

const Area = styled.div`
  height: 100%;
  width: 100%;
  background: orange;
`;

const GameArea = styled.div`
  height: 480px;
  min-width: 800px;
  max-width: 800px;
  background: gray;
  width: 50%;
  margin: 0 auto;
  overflow: hidden;
`;

const TICK_RATE = 20;

type GameState = {
  timestamp: number;
  shots: number;
  points: number;
  totalPoints: number;
  firePowerRelease: number;
  impacts: number;
  currentLevel: number;
  difficulty: number;
  gameStatus: GameStatus;
};

enum GameStatus {
  GAME_ON = 0,
  GAME_OVER = 1,
  GAME_WIN = 2,
  GAME_PAUSED = 3
}

export type GameProps = {
  frameRate: number;
  cityWidth: number;
  cityHeight: number;
};

export class Game extends Component<GameProps, GameState> {
  constructor(props: any) {
    super(props);

    this.state = {
      timestamp: +new Date(),
      shots: 0,
      points: 0,
      totalPoints: 0,
      firePowerRelease: 0,
      impacts: 0,
      currentLevel: 0,
      difficulty: 0,
      gameStatus: GameStatus.GAME_ON
    };
  }
  interval = 0;
  diff = 0;
  onTick = () => {
    const timestamp = +new Date();
    this.diff = timestamp - this.state.timestamp;
    this.setState({ timestamp: +new Date() });
  };

  componentDidMount() {
    this.interval = setInterval(this.onTick, TICK_RATE);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Area>
        <GameArea>
          <Plane {...this.props} diff={this.diff} stamp={this.state.timestamp} />
        </GameArea>
      </Area>
    );
  }
}
