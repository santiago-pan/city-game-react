import { IBomb } from '../components/Bomb';
import { IExplosion } from '../components/Explosion';

export type Action<P = any> = {
  type: string;
  payload: P;
};

export const Type = {
  AddBomb: 'AddBomb',
  RemoveBomb: 'RemoveBomb',
  AddExplosion: 'AddExplosion',
  RemoveExplosion: 'RemoveExplosion',
  AddScore: 'AddScore',
};

export type AddBomb = Action<IBomb>;
export type RemoveBomb = Action<{ id: string }>;
export type AddExplosion = Action<IExplosion>;
export type RemoveExplosion = Action<{ id: string }>;
