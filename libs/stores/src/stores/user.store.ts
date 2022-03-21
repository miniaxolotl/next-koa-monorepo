import { RootState, defaultRootState } from '.';

export enum UserAction {
  SET_USER,
}

export type UserState = {
  email?: string | null;
  userId?: string | null;
};

export const useUserReducer = async (
  state: Partial<RootState> = defaultRootState,
  action: Partial<RootState<UserAction>>,
): Promise<Partial<RootState>> => {
  switch (action.action?.store) {
    case UserAction.SET_USER:
      return {
        user: {
          ...state.user,
          email: '------------',
        },
      };
    default:
      return state;
  }
};
