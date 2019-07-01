import { Action } from './actions';
import * as Actions from './actions';
import { IBomb } from '../components/Bomb';
import { IExplosion } from '../components/Explosion';

export type IState = {
  bombs: Map<string, IBomb>;
  explosions: Map<string, IExplosion>;
};

export const InitialState: IState = {
  bombs: new Map<string, IBomb>(),
  explosions: new Map<string, IExplosion>(),
};

const ReducerMap = {
  [Actions.Type.AddBomb]: addBomb,
  [Actions.Type.RemoveBomb]: removeBomb,
  [Actions.Type.AddExplosion]: addExplosion,
  [Actions.Type.RemoveExplosion]: removeExplosion,
};

export default function Reducer(
  state: IState = InitialState,
  action: Action,
): IState {
  const reducer = ReducerMap[action.type];
  return reducer(state, action);
}

function addBomb(state: IState, { payload }: Actions.AddBomb) {
  const bombs = new Map(state.bombs);
  bombs.set(payload.id, payload);
  return { ...state, bombs };
}

function removeBomb(state: IState, { payload }: Actions.RemoveBomb) {
  const bombs = new Map(state.bombs);
  bombs.delete(payload.id);
  return { ...state, bombs };
}

function addExplosion(state: IState, { payload }: Actions.AddExplosion) {
  const explosions = new Map(state.explosions);
  explosions.set(payload.id, payload);
  return { ...state, explosions };
}

function removeExplosion(state: IState, { payload }: Actions.RemoveExplosion) {
  const explosions = new Map(state.explosions);
  explosions.delete(payload.id);
  return { ...state, explosions };
}
