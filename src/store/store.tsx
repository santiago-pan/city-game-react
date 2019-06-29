import React, { useContext, useReducer } from 'react';
import reducer, { InitialState, IState } from './reducer';
import { Action } from './actions';

type StoreContextType = {
  state: IState;
  dispatch: React.Dispatch<Action<any>>;
};

export const StoreContext = React.createContext<StoreContextType>({} as any);

export const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const contextValue = useContext(StoreContext);
  return contextValue;
};
