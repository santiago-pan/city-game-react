export type Action<P = any> = {
  type: string;
  payload: P;
};

export const Type = {
  AddBomb: 'AddBomb',
  RemoveBomb: 'RemoveBomb',
  AddScore: 'AddScore',
};

export type AddBomb = Action<{ id: string; bomb: any }>;
export type RemoveBomb = Action<{ id: string; bombId: string }>;
