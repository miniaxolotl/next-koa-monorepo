import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createContext, useCallback, useContext, useRef } from 'react';

import { cookieStorage } from '@libs/utility/src/cookie-storage';

const key = 'theme';

type ThemeType = 'dark' | 'light';

export interface ThemeState {
  theme: ThemeType;
}

const defaultState: ThemeState = {
  theme: 'light',
};

export const ThemeContext = createContext<ThemeState>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  cookies: string;
  state?: string;
}

export const ThemeProvider = ({ children, cookies, state }: ThemeProviderProps) => {
  const persistedState = cookieStorage.getCookie('theme');
  const _state = JSON.parse(state ?? null) ?? (cookies ? JSON.parse(persistedState) ?? defaultState : defaultState);
  const themeRef = useRef(_state);
  return (
    <ThemeContext.Provider value={themeRef.current}>
      <EmotionThemeProvider theme={{}}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const store = useContext(ThemeContext);
  return store;
};

export const useThemeMode = () => {
  const store = useContext(ThemeContext);

  const setTheme = useCallback(
    (theme: ThemeType) => {
      store.theme = theme;
      cookieStorage.setCookie(key, JSON.stringify(store));
    },
    [store],
  );

  const toggleTheme = useCallback(() => {
    if (store.theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    cookieStorage.setCookie(key, JSON.stringify(store));
  }, [setTheme, store]);

  return { setTheme, toggleTheme };
};
