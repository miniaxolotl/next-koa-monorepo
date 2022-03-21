import { produce } from 'immer';
import { useMemo } from 'react';
import create, { SetState } from 'zustand';

import { SessionAction, UserAction, UserState, useUserReducer } from './';
import { SessionState, useSessionReducer } from './';

export enum RootAction {
  SESSION,
  USER,
}

export type Action<T = RootAction> = {
  store: T;
  type: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

export type RootState<T = RootAction> = {
  dispatch: (action: Action<T>) => void;
  action?: Action<T>;
  user: UserState;
  session: SessionState;
};

export const defaultRootState: Partial<RootState> = {
  session: {
    sessionId: null,
    userId: null,
  },
  user: {
    email: null,
    userId: null,
  },
};

const useReducer = async (
  state: Partial<RootState> = defaultRootState,
  action: Partial<RootState>,
): Promise<{ [key: string]: Partial<RootState[keyof RootState]> }> => {
  switch (action.action?.store) {
    case RootAction.SESSION:
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return await useSessionReducer(state, action as unknown as RootState<SessionAction>);
    case RootAction.USER:
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return await useUserReducer(state, action as unknown as RootState<UserAction>);
    default:
      return state;
  }
};

const createStore = (loadedState: RootState = defaultRootState as RootState) => {
  return create<RootState>((set: SetState<RootState>) => ({
    ...defaultRootState,
    ...loadedState,
    dispatch: (action: Action) => set(produce(async (state: RootState) => await useReducer(state, { action }))),
  }));
};

export const useHydrate = (loadedState?: string) => {
  const state = typeof loadedState === 'string' ? JSON.parse(loadedState) : loadedState;
  const store = useMemo(() => createStore(state), [state]);
  return store;
};
