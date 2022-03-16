import { produce } from 'immer';
import zustand, { GetState, SetState } from 'zustand';

import { SessionStoreActions } from './actions/session-store.action';

export const Key = 'session';

// NOTE: Change me when creating a new store
type State = {
  userId: string | null;
  sessionId: string | null;
};

// NOTE: Change me when creating a new store
const defaultState: State = {
  userId: null,
  sessionId: null,
};

const reducer = (state: State, action: State & { action: SessionStoreActions }) => {
  console.log(state, action);
  console.log('Hello World!');
  return state;
};

export const useCreateSessionStore = ({ persistedState }: Partial<{ persistedState: State }> = {}) => {
  return zustand((set: SetState<State>, _get: GetState<State>) => ({
    ...defaultState,
    ...persistedState,
    dispatch: (action: SessionStoreActions) => {
      return set((payload: State) => {
        return produce((data) => reducer(data, { ...payload, action }));
      });
    },
  }));
};
