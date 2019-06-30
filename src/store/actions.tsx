import { IBomb } from "../components/Bomb";

export type Action<P = any> = {
  type: string;
  payload: P;
};

export const Type = {
  AddBomb: 'AddBomb',
  RemoveBomb: 'RemoveBomb',
  AddScore: 'AddScore',
};

export type AddBomb = Action<IBomb>;
export type RemoveBomb = Action<{ id: string }>;
