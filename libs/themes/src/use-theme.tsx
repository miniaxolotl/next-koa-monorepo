import { Theme as EmotionTheme, ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';
import { createContext, useCallback, useContext, useState } from 'react';

import { cookieStorage } from '@libs/utility';

import { baseTheme } from '../../themes/src/base.theme';
import { darkTheme } from '../../themes/src/dark.theme';

const key = 'theme';

export type ThemeType = 'dark' | 'light';

type ThemeList = {
  [key in ThemeType]: Theme;
};

// NOTE: When you add a new theme, you must add it to the theme list.
const theme_list: ThemeList = {
  light: baseTheme,
  dark: darkTheme,
};

const defaultState: ThemeType = 'dark';

export interface ThemeContextProps {
  theme: ThemeType;
  useTheme: (theme: ThemeType) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultState,
  useTheme: (_theme: ThemeType) => undefined,
});

interface ThemeProviderProps {
  children: React.ReactNode;
  cookies: string;
  state?: string;
}

export type Theme = EmotionTheme & typeof baseTheme;

export const ThemeProvider = ({ children, cookies, state }: ThemeProviderProps) => {
  const persistedState = cookieStorage.getCookie('theme');
  const _state: ThemeType = state
    ? state
    : cookies
    ? persistedState
      ? JSON.parse(persistedState)
      : defaultState
    : defaultState;
  const [theme, useTheme] = useState(_state);
  return (
    <ThemeContext.Provider value={{ theme, useTheme } as ThemeContextProps}>
      <EmotionThemeProvider theme={theme ? theme_list[theme] : baseTheme}>
        <Global
          styles={(_theme) => {
            const theme: Theme = _theme as Theme;
            return {
              html: {
                backgroundColor: theme.colors.bg.base,
                color: theme.colors.primary.base,
              },
              body: {
                fontFamily: `'Fira Sans', sans-serif`,
                fontsize: baseTheme.fontSizes['md'],
                backgroundColor: theme.colors.bg.base,
                color: theme.colors.primary.base,
              },
            };
          }}
        />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext).theme;
};

export const useThemeMode = () => {
  const store = useContext(ThemeContext);
  const setTheme = useCallback(
    (theme: ThemeType) => {
      store.useTheme(theme);
      cookieStorage.setCookie(key, theme);
    },
    [store],
  );

  const toggleTheme = useCallback(() => {
    if (store.theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [setTheme, store]);

  return { setTheme, toggleTheme };
};
