import { RootState, defaultRootState } from './';
import { useSessionScripts, useUserScripts } from '../actions';

export enum SessionAction {
  LOGIN,
  REGISTER,
}

export type SessionState = {
  sessionId?: string | null;
  userId?: string | null;
};

export const useSessionReducer = async (
  state: Partial<RootState> = defaultRootState,
  action: Partial<RootState<SessionAction>>,
): Promise<Partial<RootState>> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { login, register } = useSessionScripts(state);
  const { getMe } = useUserScripts(state);

  if (action.action?.store == SessionAction.LOGIN) {
    const session = await login(action.action.payload);
    const user = await getMe(session?.sessionId);
    return {
      session: {
        ...state.session,
        ...session,
      },
      user: {
        ...state.user,
        ...user,
      },
    };
  }

  if (action.action?.store == SessionAction.REGISTER) {
    const session = await register(action.action.payload);
    const user = await getMe();
    return {
      session: {
        ...state.session,
        ...session,
      },
      user: {
        ...state.user,
        ...user,
      },
    };
  }

  return state;
};
