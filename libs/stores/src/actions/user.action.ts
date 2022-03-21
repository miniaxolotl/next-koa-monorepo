import { UserType } from '@libs/shared';
import { useFetch } from '@libs/hooks';

import { RootState } from '../stores';

export const useUserScripts = (state: Partial<RootState>) => {
  const { fetch } = useFetch({ token: state.session?.sessionId ?? undefined });
  return {
    getMe: async (token?: string) => {
      try {
        const response = await fetch('/user/me', {
          method: 'get',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (response.ok) {
          return (await response.json()) as UserType;
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
