import { Action } from './actions';
import * as Actions from './actions';
import { IBomb } from '../components/Bomb';

export type IState = {
  bombs: Map<string, IBomb>;
};

export const InitialState: IState = {
  bombs: new Map<string, IBomb>(),
};

const ReducerMap = {
  [Actions.Type.AddBomb]: addBomb,
  [Actions.Type.RemoveBomb]: removeBomb,
};

export default function Reducer(state: IState = InitialState, action: Action): IState {
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
