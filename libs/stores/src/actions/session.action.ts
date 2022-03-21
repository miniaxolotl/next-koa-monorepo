import { useFetch } from '@libs/hooks';
import { AuthType, CreateUserType, SessionResponse } from '@libs/shared';

import { RootState } from '../stores';

export const useSessionScripts = (state: Partial<RootState>) => {
  const { fetch } = useFetch({ token: state.session?.sessionId ?? undefined });
  return {
    login: async (data: AuthType) => {
      try {
        const response = await fetch('/auth', {
          method: 'post',
          body: JSON.stringify(data),
        });
        if (response.ok) {
          return (await response.json()) as SessionResponse;
        } else {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    register: async (data: CreateUserType) => {
      try {
        const response = await fetch('/user', {
          method: 'post',
          body: JSON.stringify(data),
        });
        if (response.ok) {
          return (await response.json()) as SessionResponse;
        } else {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  };
};
