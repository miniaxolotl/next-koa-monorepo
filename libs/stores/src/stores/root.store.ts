import { produce } from 'immer';
import { useMemo } from 'react';
import create, { SetState } from 'zustand';

export enum RootAction {
  SESSION = 'session',
}

export type Action = {
  store: RootAction;
  type: string;
  payload?: unknown;
};

export type RootState = {
  dispatch: (action: Action) => void;
  action?: Action;
  session: SessionState;
};

export type SessionState = {
  sessionId?: string | null;
  userId?: string | null;
};

const defaultState: RootState = {
  dispatch: (action) => ({ action }),
  session: {
    sessionId: null,
    userId: null,
  },
};

const reducer = (
  state: Partial<RootState> = defaultState,
  action: Partial<RootState>,
): { [key: string]: Partial<RootState[keyof RootState]> } => {
  if (action) {
    if (action.action?.store === RootAction.SESSION) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // TODO: do something
      return { session: { sessionId: '------------------' } };
    }
  }
  return state;
};

const createStore = (loadedState = defaultState) => {
  return create<RootState>((set: SetState<RootState>) => ({
    ...defaultState,
    ...loadedState,
    dispatch: (action: Action) => set(produce((state: RootState) => reducer(state, { action }))),
  }));
};

export const useHydrate = (loadedState?: string) => {
  const state = typeof loadedState === 'string' ? JSON.parse(loadedState) : loadedState;
  const store = useMemo(() => createStore(state), [state]);
  return store;
};
